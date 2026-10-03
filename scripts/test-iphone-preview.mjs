/** App déjà construite/démarrée ; Playwright et Chromium fournis par l’environnement. */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const { chromium, devices } = createRequire(import.meta.url)('playwright');
const origin = process.env.CLEANZ_BASE_URL || 'http://127.0.0.1:3000';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', serviceWorkers: 'block' });
const response = await fetch(origin + '/api/preview-version');
assert(response.ok);
assert.match(response.headers.get('cache-control'), /no-store/);
const deployedVersion = (await response.json()).version;
let version = deployedVersion;
await context.route('**/api/preview-version', route => route.fulfill({ json: { version } }));
await context.addInitScript(() => {
  if (!localStorage.getItem('__preview_seeded')) {
    localStorage.setItem('cleanz-seen-nouveautes', '999999');
    localStorage.setItem('pwa-prompt-dismissed', 'true');
    localStorage.setItem('cleanz-theme-mode', 'light');
    localStorage.setItem('cleanz-favorites', '[13,29]');
    localStorage.setItem('cleanz-user-sprays', '[{"id":"a-recuperer"}]');
    localStorage.setItem('__preview_seeded', 'true');
  }
});
const page = await context.newPage();
page.setDefaultTimeout(10000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  await page.goto(origin + '/simulateur.html', { waitUntil: 'networkidle' });
  const frame = page.frameLocator('iframe');
  await frame.getByRole('button', { name: 'Mon compte', exact: true }).waitFor();
  const app = () => page.frames().find(f => f.parentFrame() === page.mainFrame());
  const known = { '16': 'iPhone 16', '16-plus': 'iPhone 16 Plus', '16-pro': 'iPhone 16 Pro', '16-pro-max': 'iPhone 16 Pro Max', '17': 'iPhone 17', '17-pro': 'iPhone 17 Pro', '17-pro-max': 'iPhone 17 Pro Max' };
  for (const [id, name] of Object.entries(known)) {
    await page.getByLabel('Modèle d’iPhone').selectOption(id);
    const { width, height } = devices[name].screen;
    await page.waitForFunction(({ width, height }) => {
      const app = document.querySelector('iframe').contentWindow;
      return app.innerWidth === width && app.innerHeight === height;
    }, { width, height });
    const metrics = await app().evaluate(() => ({
      width: innerWidth, clientWidth: document.documentElement.clientWidth,
      scrollbar: getComputedStyle(document.documentElement).scrollbarWidth,
      top: getComputedStyle(document.querySelector('.relative.z-10.max-w-md')).paddingTop,
    }));
    assert.equal(metrics.clientWidth, width, `${name} : la barre de scroll occupe de la place`);
    assert.equal(metrics.scrollbar, 'none');
    assert.equal(metrics.top, '62px');
    const account = await app().getByRole('button', { name: 'Mon compte', exact: true }).boundingBox();
    assert(account.y >= 62, `${name} : le bouton est sous la Dynamic Island`);
  }
  console.log('PASS sept profils iPhone : tailles des écrans Playwright, zones réservées et scrollbars masquées');
  await page.getByLabel('Modèle d’iPhone').selectOption('16-pro');
  await app().evaluate(() => scrollTo(0, 400));
  assert((await app().evaluate(() => scrollY)) > 0, 'Le défilement doit rester possible');
  await app().evaluate(() => scrollTo(0, 0));
  await frame.getByRole('button', { name: 'Recettes', exact: true }).click();
  await frame.getByText('Spray Multi-usage', { exact: true }).first().click();
  await frame.getByRole('heading', { name: /Spray Multi-usage/ }).waitFor();
  const close = await app().getByRole('button', { name: 'Fermer', exact: true }).boundingBox();
  assert(close.y >= 48, 'La fermeture ne doit pas se retrouver derrière la Dynamic Island');
  await frame.getByRole('button', { name: 'Fermer', exact: true }).click();
  await frame.getByRole('button', { name: 'Accueil', exact: true }).click();
  await frame.getByRole('button', { name: 'Mon compte', exact: true }).click();
  await frame.getByRole('button', { name: /Sombre/ }).click();
  await page.waitForFunction(() => document.querySelector('.screen').style.getPropertyValue('--ink') === '#fff');
  await frame.locator('body').press('Escape');
  await page.screenshot({ path: '/tmp/cleanz-iphone-dynamic-island.png', animations: 'disabled' });
  console.log('PASS défilement, navigation, modale et adaptation de la barre d’état au thème sombre');
  for (const id of ['18', 'duo-closed', 'duo-open']) {
    await page.getByLabel('Modèle d’iPhone').selectOption(id);
    assert(await page.locator('#badge').isVisible());
    await page.getByLabel('Largeur (px)').fill('420');
    await page.getByLabel('Hauteur (px)').fill('912');
    await page.waitForFunction(() => document.querySelector('iframe').contentWindow.innerWidth === 420);
  }
  console.log('PASS trois profils exploratoires explicitement indiqués et dimensions ajustables');
  // Même origine HTTP avant/après ; les données de favoris et de flacons restent intactes.
  const favorites = await page.evaluate(() => localStorage.getItem('cleanz-favorites'));
  const bottles = await page.evaluate(() => localStorage.getItem('cleanz-user-sprays'));
  const reloaded = page.waitForEvent('domcontentloaded');
  version = 'mise-a-jour';
  await reloaded;
  assert.equal(await page.evaluate(() => localStorage.getItem('cleanz-favorites')), favorites);
  assert.equal(await page.evaluate(() => localStorage.getItem('cleanz-user-sprays')), bottles);
  assert.equal(await page.getByLabel('Modèle d’iPhone').inputValue(), 'duo-open');
  assert.equal(await page.getByLabel('Largeur (px)').inputValue(), '420');
  console.log('PASS actualisation automatique du cadre, modèle choisi et données locales conservés');
  const native = await context.newPage();
  version = deployedVersion;
  native.setDefaultTimeout(10000);
  native.on('pageerror', error => errors.push(error.message));
  await native.goto(origin + '/?apercu=1', { waitUntil: 'networkidle' });
  const nativeReloaded = native.waitForEvent('domcontentloaded');
  version = 'autre-mise-a-jour';
  await nativeReloaded;
  assert.equal(await native.evaluate(() => localStorage.getItem('cleanz-user-sprays')), bottles);
  console.log('PASS actualisation de la vraie app via ?apercu=1, sans toucher au stockage');
  assert.deepEqual(errors, []);
} finally { await browser.close(); }
