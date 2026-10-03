/** Build de la branche Vercel d'aperçu déjà démarré ; navigateur mobile Chromium. */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const { chromium, devices } = createRequire(import.meta.url)('playwright');
const origin = process.env.CLEANZ_BASE_URL || 'http://127.0.0.1:3004';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true });
const context = await browser.newContext({ ...devices['iPhone 16 Pro'], defaultBrowserType: undefined });
const deployed = await fetch(origin + '/api/preview-version');
assert(deployed.ok);
assert.match(deployed.headers.get('cache-control'), /no-store/);
const originalVersion = (await deployed.json()).version;
let version = originalVersion;
let mode = 'json';
let polls = 0;
await context.route('**/api/preview-version', async route => {
  polls++;
  if (mode === 'outage') return route.abort();
  if (mode === 'html') return route.fulfill({ contentType: 'text/html', body: '<h1>Connexion</h1>' });
  return route.fulfill({ json: { version } });
});
await context.addInitScript(() => {
  localStorage.setItem('cleanz-seen-nouveautes', '999999');
  localStorage.setItem('pwa-prompt-dismissed', 'true');
  if (!localStorage.getItem('__phone_seeded')) {
    localStorage.setItem('cleanz-favorites', '[13,29]');
    localStorage.setItem('cleanz-user-sprays', '[{"id":"ancien-flacon","createdAt":"2025-04-01","extra":"à conserver"}]');
    localStorage.setItem('__phone_seeded', 'true');
  }
});
const page = await context.newPage();
page.setDefaultTimeout(20000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
let navigations = 0;
page.on('domcontentloaded', () => navigations++);
const triggerCheck = async () => {
  const before = polls;
  await page.evaluate(() => window.dispatchEvent(new Event('online')));
  for (let i = 0; polls === before && i < 100; i++) await new Promise(resolve => setTimeout(resolve, 50));
  assert(polls > before, 'Une vérification de version doit être déclenchée');
  await new Promise(resolve => setTimeout(resolve, 250));
};
try {
  // / est aussi l'URL de lancement du manifeste : aucun paramètre requis dans la PWA.
  await page.goto(origin + '/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Mon compte', exact: true }).waitFor();
  assert(polls > 0, 'La branche Vercel doit activer les mises à jour sans ?apercu=1');
  const initial = navigations;
  for (const failure of ['outage', 'html']) {
    mode = failure;
    await triggerCheck();
    assert.equal(navigations, initial, 'Une coupure ou une page de connexion ne doit pas recharger');
  }
  mode = 'json';
  await triggerCheck();
  assert.equal(navigations, initial, 'La même révision ne doit pas recharger');
  console.log('PASS racine mobile/PWA : vérification active, réseau indisponible et réponse invalide sans rechargement');

  const input = page.locator('input').first();
  await input.fill('four');
  const beforeEditingUpdate = navigations;
  version = 'nouvelle-version';
  await triggerCheck();
  assert.equal(navigations, beforeEditingUpdate, 'La saisie doit rester ouverte');
  assert.equal(await input.inputValue(), 'four');
  const favorites = await page.evaluate(() => localStorage.getItem('cleanz-favorites'));
  const bottles = await page.evaluate(() => localStorage.getItem('cleanz-user-sprays'));
  const reloaded = page.waitForEvent('domcontentloaded');
  await input.evaluate(element => element.blur());
  await reloaded;
  version = originalVersion;
  await page.getByRole('button', { name: 'Mon compte', exact: true }).waitFor();
  assert.equal(new URL(page.url()).origin, origin);
  assert.equal(await page.evaluate(() => localStorage.getItem('cleanz-favorites')), favorites);
  assert.equal(await page.evaluate(() => localStorage.getItem('cleanz-user-sprays')), bottles);
  console.log('PASS nouvelle version différée pendant la saisie, puis actualisation sur la même origine sans perte de données');
  assert.deepEqual(errors, []);
} finally { await browser.close(); }
