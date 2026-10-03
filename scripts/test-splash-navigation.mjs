/** Launch appearance before hydration, reduced motion, and the account/favorites journey. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const origin = process.env.CLEANZ_BASE_URL || 'http://127.0.0.1:3007';
const output = process.env.CLEANZ_CAPTURE_DIR || '/tmp/cleanz-splash-navigation';
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true });
let passed = 0;
const tabs = ['Accueil', 'Planning', 'Appareils', 'Recettes', 'Matériel'];
const favoriteRaw = '[29,13,999]';
const bottleRaw = '[{"id":"preserved","number":7,"recipeId":29,"recipeType":"recette","name":"Mon flacon","createdAt":"2026-06-14T12:00:00.000Z","expiresAt":null}]';
async function open({ system = 'light', saved, width = 393, reduced = false, blockJS = false, denied = false } = {}) {
  const context = await browser.newContext({ viewport: { width, height: 852 }, colorScheme: system, reducedMotion: reduced ? 'reduce' : 'no-preference', serviceWorkers: 'block' });
  await context.addInitScript(({ saved, denied, favoriteRaw, bottleRaw }) => {
    localStorage.setItem('cleanz-seen-nouveautes', '99999');
    localStorage.setItem('pwa-prompt-dismissed', 'true');
    localStorage.setItem('cleanz-favorites', favoriteRaw);
    localStorage.setItem('cleanz-user-sprays', bottleRaw);
    if (saved) localStorage.setItem('cleanz-theme-mode', saved);
    if (denied) Storage.prototype.getItem = () => { throw new DOMException('Denied', 'SecurityError'); };
  }, { saved, denied, favoriteRaw, bottleRaw });
  if (blockJS) await context.route('**/*.js*', route => route.abort());
  const page = await context.newPage();
  const requests = [];
  const errors = [];
  page.on('request', request => requests.push(request.url()));
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(origin, { waitUntil: 'domcontentloaded' });
  return { context, page, requests, errors };
}
async function check(name, fn) {
  await fn(); passed++; console.log('PASS', name);
}
try {
  await check('Logo seul : thèmes système et préférences sauvegardées, avant hydratation', async () => {
    for (const test of [
      { system: 'light', expected: 'light' }, { system: 'dark', expected: 'dark' },
      { system: 'light', saved: 'dark', expected: 'dark' }, { system: 'dark', saved: 'light', expected: 'light' },
      { system: 'dark', denied: true, expected: 'dark' },
    ]) {
      const { context, page, requests } = await open({ ...test, blockJS: true });
      try {
        const splash = page.locator('.splash-screen');
        await splash.evaluate(el => {
          for (const animation of el.getAnimations({ subtree: true })) { animation.pause(); animation.currentTime = 0; }
        });
        assert.equal(await page.locator('html').getAttribute('data-splash-theme'), test.expected);
        assert.equal(await splash.evaluate(el => getComputedStyle(el).backgroundColor), test.expected === 'dark' ? 'rgb(13, 12, 19)' : 'rgb(250, 250, 252)');
        assert.equal(await splash.innerText(), 'cleanz');
        assert.equal(await splash.locator('img').count(), 0);
        assert.equal(requests.some(url => url.includes('splash-bg')), false);
        const mark = page.locator('.splash-wordmark');
        const before = await mark.boundingBox();
        await mark.evaluate(el => {
          for (const animation of el.getAnimations()) animation.currentTime = 200;
        });
        const startColor = await mark.evaluate(el => getComputedStyle(el, '::after').backgroundPosition);
        await mark.evaluate(el => {
          for (const animation of el.getAnimations()) animation.currentTime = 1300;
        });
        const endColor = await mark.evaluate(el => getComputedStyle(el, '::after').backgroundPosition);
        assert.notEqual(startColor, endColor, 'Le dégradé se déplace dans le logo entier');
        assert.deepEqual(await mark.boundingBox(), before, 'Les lettres restent immobiles');
        assert.equal(await mark.locator('.splash-letter').count(), 0, 'Aucune découpe des lettres');
        assert.notEqual(await mark.evaluate(el => getComputedStyle(el, '::after').maskImage), 'none');
        await page.evaluate(() => document.fonts.ready);
        if (!test.saved && !test.denied) await page.screenshot({ path: `${output}/logo-${test.expected}.png` });
        await splash.evaluate(el => { for (const animation of el.getAnimations()) animation.finish(); });
        await splash.waitFor({ state: 'hidden', timeout: 1000 });
        assert.notEqual(await page.evaluate(() => document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.closest('.splash-screen')?.className || null), 'splash-auto-out splash-screen');
      } finally { await context.close(); }
    }
  });
  await check('Animations réduites : logo immédiatement lisible et sortie sans JavaScript', async () => {
    const { context, page } = await open({ reduced: true, blockJS: true });
    try {
      assert.equal(await page.locator('.splash-wordmark').evaluate(el => getComputedStyle(el).animationName), 'none');
      await page.locator('.splash-screen').waitFor({ state: 'hidden', timeout: 7500 });
    } finally { await context.close(); }
  });
  await check('Barre compacte à la descente, titres à la remontée : quatre tailles et deux thèmes', async () => {
    for (const width of [320, 375, 402, 430]) for (const saved of ['light', 'dark']) {
      const { context, page, errors } = await open({ width, saved, reduced: true });
      try {
        await page.locator('.splash-screen').waitFor({ state: 'hidden' });
        const nav = page.getByRole('navigation', { name: 'Navigation principale' });
        assert.deepEqual(await nav.getByRole('button').allTextContents(), tabs);
        const initial = await nav.boundingBox();
        assert.equal(initial.height, 64);
        for (const button of await nav.getByRole('button').all()) {
          const rect = await button.boundingBox();
          assert.ok(rect.width >= 44 && rect.height >= 44);
          assert.ok(rect.x >= 0 && rect.x + rect.width <= width);
          assert.equal(await button.locator('span').last().evaluate(el => el.scrollWidth <= el.clientWidth), true, 'Libellé entier');
        }
        await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
        await page.waitForTimeout(200);
        assert.equal((await nav.boundingBox()).height, 54);
        for (const button of await nav.getByRole('button').all()) {
          assert.ok((await button.boundingBox()).height >= 44, 'Cible tactile conservée');
          assert.equal(await button.locator('.cleanz-nav-label').evaluate(el => getComputedStyle(el).opacity), '0');
        }
        if (width === 402) await page.screenshot({ path: `${output}/menu-compact-${saved}.png` });
        await page.evaluate(() => scrollBy(0, -8));
        await page.waitForTimeout(100);
        assert.equal((await nav.boundingBox()).height, 54, 'Un petit mouvement ne fait pas clignoter les titres');
        await page.evaluate(() => scrollBy(0, -24));
        await page.waitForTimeout(100);
        assert.equal((await nav.boundingBox()).height, 64, 'Les titres reviennent à la remontée');
        await page.evaluate(() => scrollTo(0, 0));
        await page.waitForTimeout(100);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
        assert.equal(await nav.getByRole('button', { name: 'Favoris', exact: true }).count(), 0);
        if (width === 402) await page.screenshot({ path: `${output}/menu-${saved}.png` });
        assert.deepEqual(errors, []);
      } finally { await context.close(); }
    }
  });
  await check('Transition continue, sans saut du contenu ; clavier et changement d’onglet', async () => {
    const { context, page } = await open();
    try {
      await page.locator('.splash-screen').waitFor({ state: 'hidden' });
      await page.getByRole('navigation').getByRole('button', { name: 'Recettes', exact: true }).click();
      await page.getByText('Spray Multi-usage', { exact: true }).first().waitFor();
      await page.waitForLoadState('networkidle');
      const sample = async (destination) => page.evaluate(async destination => {
        const nav = document.querySelector('nav[aria-label="Navigation principale"]');
        const heights = [nav.getBoundingClientRect().height];
        const pageHeight = document.documentElement.scrollHeight;
        scrollTo(0, destination);
        const started = performance.now();
        while (performance.now() - started < 450) {
          await new Promise(requestAnimationFrame);
          heights.push(nav.getBoundingClientRect().height);
          if (document.documentElement.scrollHeight !== pageHeight) throw new Error('Le contenu change de hauteur');
        }
        return { heights, scroll: scrollY };
      }, destination);
      const down = await sample(350);
      assert.equal(down.scroll, 350);
      assert.equal(down.heights.at(-1), 54);
      assert.ok(down.heights.some(height => height > 54 && height < 64), 'Tailles intermédiaires pendant la transition');
      assert.ok(down.heights.every((height, index) => index === 0 || height <= down.heights[index - 1] + .01), 'Réduction progressive');
      const up = await sample(300);
      assert.equal(up.scroll, 300);
      assert.equal(up.heights.at(-1), 64);
      assert.ok(up.heights.every((height, index) => index === 0 || height >= up.heights[index - 1] - .01), 'Ouverture progressive');
      await page.evaluate(() => {
        const placeholder = document.createElement('div');
        placeholder.id = 'loading-section-fixture';
        placeholder.style.height = '240px';
        document.body.append(placeholder);
        scrollTo(0, document.documentElement.scrollHeight);
      });
      await page.waitForTimeout(400);
      assert.equal((await page.getByRole('navigation').boundingBox()).height, 54);
      await page.evaluate(() => document.getElementById('loading-section-fixture').remove());
      await page.waitForTimeout(350);
      assert.equal((await page.getByRole('navigation').boundingBox()).height, 54, 'L’ancrage du navigateur après chargement ne rouvre pas la barre');
      await page.keyboard.press('Tab');
      await page.getByRole('navigation').getByRole('button', { name: 'Planning' }).focus();
      await page.waitForTimeout(350);
      assert.equal((await page.getByRole('navigation').boundingBox()).height, 64, 'Noms visibles au clavier');
      await page.keyboard.press('Enter');
      assert.equal(await page.getByRole('navigation').getByRole('button', { name: 'Planning' }).getAttribute('aria-current'), 'page');
      assert.equal(await page.evaluate(() => scrollY), 0);
    } finally { await context.close(); }
  });
  await check('Favoris depuis Mon compte : raccourci, retour, recettes et données conservées', async () => {
    const { context, page, errors } = await open({ reduced: true });
    try {
      await page.locator('.splash-screen').waitFor({ state: 'hidden' });
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'Mon compte', exact: true }).click();
      await page.getByRole('button', { name: /Mes favoris/ }).click();
      await page.getByRole('heading', { name: 'Mes Favoris', exact: true }).waitFor();
      await page.getByRole('heading', { name: 'Mon flacon', exact: true }).waitFor();
      await page.getByRole('button', { name: 'Retour à Mon compte', exact: true }).click();
      await page.getByRole('heading', { name: /Mon compte/ }).waitFor();
      await page.getByRole('button', { name: /Mes favoris/ }).click();
      await page.getByRole('heading', { name: 'Mes Favoris', exact: true }).waitFor();
      assert.equal(await page.evaluate(() => localStorage.getItem('cleanz-favorites')), favoriteRaw);
      assert.equal(await page.evaluate(() => localStorage.getItem('cleanz-user-sprays')), bottleRaw);
      await page.getByRole('navigation').getByRole('button', { name: 'Recettes', exact: true }).click();
      await page.getByText('Spray Multi-usage', { exact: true }).first().waitFor();
      assert.equal(await page.getByRole('navigation').getByRole('button', { name: 'Recettes' }).getAttribute('aria-current'), 'page');
      assert.deepEqual(errors, []);
      assert.equal(await page.locator('.splash-screen').count(), 0, 'Nettoyage de l’écran après animation');
    } finally { await context.close(); }
  });
} finally { await browser.close(); }
console.log(`${passed} groupes de contrôles réussis`);
