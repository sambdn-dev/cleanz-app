import { spawn } from 'node:child_process';
import { cp, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PREVIEW_BRANCH = 'codex/apercu-iphone';
export const PREVIEW_PORT = 55355;

async function command(program, args, cwd, silent = false, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(program, args, {
      cwd, env: { ...process.env, ...extraEnv, GIT_TERMINAL_PROMPT: '0', NEXT_TELEMETRY_DISABLED: '1' },
      stdio: silent ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    });
    let output = '';
    child.stdout?.on('data', data => { output += data; });
    child.on('error', reject);
    child.on('exit', code => code === 0 ? resolve(output.trim()) : reject(new Error(`${program} a échoué (code ${code}).`)));
  });
}
const git = (root, args) => command('git', args, root, true);

export async function synchronize(root, branch = PREVIEW_BRANCH) {
  await git(root, ['check-ref-format', '--branch', branch]);
  if (await git(root, ['branch', '--show-current']) !== branch) {
    throw new Error('Ce dossier utilise une autre branche. Aucune modification locale n’a été remplacée.');
  }
  if (await git(root, ['status', '--porcelain', '--untracked-files=no'])) {
    throw new Error('Modifications locales détectées : synchronisation suspendue pour les préserver.');
  }
  await git(root, ['fetch', '--quiet', 'origin', branch]);
  await git(root, ['merge-base', '--is-ancestor', 'HEAD', 'FETCH_HEAD']);
  await git(root, ['merge', '--ff-only', 'FETCH_HEAD']);
  return git(root, ['rev-parse', 'HEAD']);
}

export async function freePort(port = 0) {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once('error', () => reject(new Error(`Le port ${port} est occupé. Ferme l’ancien terminal Cleanz puis relance ce lanceur.`)));
    server.listen(port, '127.0.0.1', () => {
      const assigned = server.address().port;
      server.close(() => resolve(assigned));
    });
  });
}

export async function buildCandidate(root, revision) {
  const runtime = path.join(root, '.cleanz-preview');
  await mkdir(runtime, { recursive: true });
  const directory = await mkdtemp(path.join(runtime, 'build-'));
  try {
    // Uniquement les fichiers suivis : pas de secrets locaux ni de données du navigateur.
    const files = (await git(root, ['ls-files', '-z'])).split('\0').filter(Boolean);
    for (const relative of files) {
      if (relative.split('/').some(part => part.startsWith('.env'))) continue;
      const destination = path.join(directory, relative);
      await mkdir(path.dirname(destination), { recursive: true });
      await cp(path.join(root, relative), destination);
    }
    await command('npm', ['ci', '--no-audit', '--no-fund'], directory);
    await command('npm', ['run', 'build'], directory, false, { NEXT_PUBLIC_BUILD_ID: revision });
    await writeFile(path.join(directory, 'public/preview-version.json'), JSON.stringify({ version: revision }));
    return { directory, revision, entry: path.join(directory, 'node_modules/next/dist/bin/next'), args: ['start', '--hostname', '127.0.0.1', '--port'] };
  } catch (error) {
    await rm(directory, { recursive: true, force: true });
    throw error;
  }
}

async function stopChild(child) {
  if (!child || child.exitCode !== null || child.signalCode !== null) return;
  await new Promise(resolve => {
    const timeout = setTimeout(() => child.kill('SIGKILL'), 5000);
    child.once('exit', () => { clearTimeout(timeout); resolve(); });
    child.kill('SIGTERM');
  });
}

async function startCandidate(candidate, port) {
  const child = spawn(process.execPath, [candidate.entry, ...candidate.args, String(port)], {
    cwd: candidate.directory, env: { ...process.env, NEXT_PUBLIC_BUILD_ID: candidate.revision || 'dev', NEXT_TELEMETRY_DISABLED: '1' }, stdio: 'inherit',
  });
  let spawnError;
  child.on('error', error => { spawnError = error; });
  try {
    for (let attempt = 0; attempt < 100; attempt++) {
      if (spawnError || child.exitCode !== null) throw spawnError ?? new Error('Le serveur de l’aperçu s’est arrêté.');
      try {
        const response = await fetch(`http://127.0.0.1:${port}/simulateur.html`, { signal: AbortSignal.timeout(1000) });
        if (response.ok && (await response.text()).includes('Cleanz')) {
          const app = await fetch(`http://127.0.0.1:${port}/`, { signal: AbortSignal.timeout(3000) });
          if (app.ok) return child;
        }
      } catch { /* Attendre que notre serveur démarre, pendant dix secondes au maximum. */ }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error('L’aperçu n’a pas répondu.');
  } catch (error) { await stopChild(child); throw error; }
}

export function createPreview({ root, port = PREVIEW_PORT, branch = PREVIEW_BRANCH, sync = true, builder = buildCandidate, log = console.log }) {
  let active;
  let servedRevision;
  let failedRevision;
  let server;
  let busy = false;
  let stopped = false;
  let lastError;
  let timer;
  let updating;
  const update = async () => {
    if (busy || stopped) return;
    busy = true;
    let revision;
    let candidate;
    try {
      revision = sync ? await synchronize(root, branch) : await git(root, ['rev-parse', 'HEAD']);
      if (revision === servedRevision || revision === failedRevision) return;
      log('Préparation de la mise à jour. La version ouverte reste disponible.');
      candidate = await builder(root, revision);
      // Le nouveau build doit démarrer avant de remplacer la version ouverte.
      const probe = await startCandidate(candidate, await freePort());
      await stopChild(probe);
      if (stopped) return;
      const previous = active;
      await stopChild(server);
      try { server = await startCandidate(candidate, port); }
      catch (error) {
        if (previous) server = await startCandidate(previous, port);
        throw error;
      }
      active = candidate;
      servedRevision = revision;
      lastError = null;
      log(`Aperçu à jour : http://127.0.0.1:${port}/simulateur.html`);
      if (previous) await rm(previous.directory, { recursive: true, force: true });
    } catch (error) {
      if (revision && revision !== servedRevision) failedRevision = revision;
      if (error.message !== lastError) log(`Mise à jour interrompue : ${error.message} La dernière version fonctionnelle est conservée.`);
      lastError = error.message;
      if (!server) throw error;
    } finally {
      if (candidate && candidate !== active) await rm(candidate.directory, { recursive: true, force: true });
      busy = false;
    }
  };
  const tick = () => {
    if (busy || stopped) return updating ?? Promise.resolve();
    updating = update();
    return updating;
  };
  return {
    update: tick,
    async start(interval = 30000) {
      await freePort(port);
      await tick();
      if (sync) timer = setInterval(() => { tick().catch(error => log(error.message)); }, interval);
    },
    async stop() {
      stopped = true;
      clearInterval(timer);
      await updating?.catch(() => {});
      await stopChild(server);
      if (active) await rm(active.directory, { recursive: true, force: true });
    },
    get revision() { return servedRevision; },
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
  const port = Number(process.env.CLEANZ_PREVIEW_PORT || PREVIEW_PORT);
  if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Port invalide.');
  const preview = createPreview({ root, port, sync: !process.argv.includes('--no-sync') });
  const shutdown = async () => { await preview.stop(); process.exit(); };
  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
  try {
    await preview.start();
    if (process.platform === 'darwin' && !process.env.CLEANZ_NO_OPEN) spawn('open', [`http://127.0.0.1:${port}/simulateur.html`]);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
