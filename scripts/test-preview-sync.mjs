/** Vrais dépôts Git locaux et serveurs HTTP : aucune publication GitHub. */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { createPreview, freePort, PREVIEW_BRANCH } from './preview-sync.mjs';

const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
async function fixture() {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'cleanz-sync-test-'));
  const remote = path.join(directory, 'remote.git');
  const publisher = path.join(directory, 'publisher');
  const client = path.join(directory, 'client');
  await mkdir(publisher);
  git(directory, 'init', '--bare', remote);
  git(publisher, 'init', '-b', PREVIEW_BRANCH);
  git(publisher, 'config', 'user.name', 'Test Cleanz');
  git(publisher, 'config', 'user.email', 'test@example.invalid');
  git(publisher, 'remote', 'add', 'origin', remote);
  const publish = async value => {
    await writeFile(path.join(publisher, 'screen.txt'), value);
    git(publisher, 'add', 'screen.txt');
    git(publisher, 'commit', '-m', value);
    git(publisher, 'push', 'origin', PREVIEW_BRANCH);
    return git(publisher, 'rev-parse', 'HEAD');
  };
  await publish('initial');
  git(directory, 'clone', '--branch', PREVIEW_BRANCH, remote, client);
  let builds = 0;
  const builder = async (root, revision) => {
    builds++;
    const text = await readFile(path.join(root, 'screen.txt'), 'utf8');
    if (text === 'invalide') throw new Error('Build de test volontairement invalide');
    const output = await mkdtemp(path.join(directory, 'build-'));
    const entry = path.join(output, 'server.cjs');
    await writeFile(entry, `require('node:http').createServer((req,res)=>{
      res.setHeader('Content-Type',req.url==='/preview-version.json'?'application/json':'text/html');
      res.end(req.url==='/preview-version.json'?${JSON.stringify(JSON.stringify({ version: revision }))}:${JSON.stringify(`<h1>Cleanz ${text}</h1>`)});
    }).listen(Number(process.argv[2]),'127.0.0.1');`);
    return { directory: output, entry, args: [] };
  };
  const port = await freePort();
  const messages = [];
  const preview = createPreview({ root: client, port, builder, log: message => messages.push(message) });
  return { directory, remote, publisher, client, publish, preview, messages, port, get builds() { return builds; } };
}
async function runFixture(fn) {
  const f = await fixture();
  try { await f.preview.start(3600000); await fn(f); }
  finally { await f.preview.stop(); await rm(f.directory, { recursive: true, force: true }); }
}

test('une révision distante remplace la version ouverte sur la même adresse après vérification du serveur', async () => {
  await runFixture(async f => {
    const initial = f.preview.revision;
    const next = await f.publish('nouvelle-version');
    await f.preview.update();
    assert.notEqual(next, initial);
    assert.equal(f.preview.revision, next);
    const response = await fetch(`http://127.0.0.1:${f.port}/preview-version.json`);
    assert.deepEqual(await response.json(), { version: next });
    assert.match(await (await fetch(`http://127.0.0.1:${f.port}/simulateur.html`)).text(), /nouvelle-version/);
  });
});

test('un build invalide conserve le serveur fonctionnel, puis une nouvelle révision peut réparer la mise à jour', async () => {
  await runFixture(async f => {
    const initial = f.preview.revision;
    await f.publish('invalide');
    await f.preview.update();
    assert.equal(f.preview.revision, initial);
    assert.match(await (await fetch(`http://127.0.0.1:${f.port}/simulateur.html`)).text(), /initial/);
    const count = f.builds;
    await f.preview.update();
    assert.equal(f.builds, count, 'Le même build invalide n’est pas relancé en boucle');
    const fixed = await f.publish('reparee');
    await f.preview.update();
    assert.equal(f.preview.revision, fixed);
  });
});

test('les changements locaux et une interruption Git ne détruisent pas la copie ni l’aperçu ouvert', async () => {
  await runFixture(async f => {
    const initial = f.preview.revision;
    await writeFile(path.join(f.client, 'screen.txt'), 'modification-personnelle');
    await f.publish('distante');
    await f.preview.update();
    assert.equal(await readFile(path.join(f.client, 'screen.txt'), 'utf8'), 'modification-personnelle');
    assert.equal(f.preview.revision, initial);
    git(f.client, 'restore', 'screen.txt');
    git(f.client, 'remote', 'set-url', 'origin', path.join(f.directory, 'indisponible.git'));
    await f.preview.update();
    assert.equal(f.preview.revision, initial);
    assert.match(await (await fetch(`http://127.0.0.1:${f.port}/simulateur.html`)).text(), /initial/);
    git(f.client, 'remote', 'set-url', 'origin', f.remote);
    await f.preview.update();
    assert.match(await (await fetch(`http://127.0.0.1:${f.port}/simulateur.html`)).text(), /distante/);
  });
});
