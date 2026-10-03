/** Slow-start rendering checks with isolated Chromium profiles and fictitious data. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const origin = process.env.CLEANZ_BASE_URL || 'http://127.0.0.1:3009';
const output = process.env.CLEANZ_CAPTURE_DIR || '/tmp/cleanz-launch-continuity';
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true });
try {
  for (const saved of ['dark', 'light']) {
    const context = await browser.newContext({ viewport: { width: 402, height: 874 }, colorScheme: saved === 'dark' ? 'light' : 'dark', serviceWorkers: 'block' });
    try {
      await context.addInitScript(({ saved }) => {
        localStorage.setItem('cleanz-theme-mode', saved);
        localStorage.setItem('cleanz-seen-nouveautes', '999999');
        localStorage.setItem('pwa-prompt-dismissed', 'true');
        window.__launchFrames = [];
        const sample = () => {
          const root = document.documentElement;
          const splash = document.querySelector('.splash-screen');
          if (splash) {
            const css = getComputedStyle(splash), box = splash.getBoundingClientRect();
            window.__launchFrames.push({ time: performance.now(), leaving: splash.dataset.leaving === 'true', theme: root.dataset.splashTheme, dark: root.classList.contains('dark'), opacity: Number(css.opacity), visibility: css.visibility, background: css.backgroundColor, covers: box.x === 0 && box.y === 0 && box.width >= innerWidth && box.height >= innerHeight });
          }
          if (root?.dataset.cleanzLaunch !== 'complete') requestAnimationFrame(sample);
        };
        requestAnimationFrame(sample);
      }, { saved });
      // Slow JS and fonts reproduce a cold phone launch. CSS is delayed too.
      await context.route('**/*', async route => {
        const url = route.request().url();
        const delay = /\.js(?:\?|$)/.test(url) ? 1100 : /\.woff2(?:\?|$)/.test(url) ? 1400 : /\.css(?:\?|$)/.test(url) ? 400 : 0;
        if (delay) await new Promise(resolve => setTimeout(resolve, delay));
        await route.continue();
      });
      const page = await context.newPage();
      page.setDefaultTimeout(12000);
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const cdp = await context.newCDPSession(page);
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      await page.goto(origin, { waitUntil: 'domcontentloaded' });
      const splash = page.locator('.splash-screen');
      // Logo outlines are visible while the text font and JS are still pending.
      if (await splash.isVisible()) await page.screenshot({ path: `${output}/startup-${saved}.png` });
      await splash.waitFor({ state: 'hidden' });
      await page.waitForLoadState('networkidle');
      const frames = await page.evaluate(() => window.__launchFrames);
      assert.ok(frames.length > 5, 'Plusieurs images du démarrage doivent être observées');
      assert.ok(frames.every(f => f.theme === saved && f.dark === (saved === 'dark')), 'Le thème ne bascule jamais pendant le lancement');
      assert.ok(frames.every(f => f.covers), 'Aucun bord de l’accueil ne dépasse du splash');
      assert.ok(frames.filter(f => !f.leaving).every(f => f.opacity === 1), 'Le chargement reste opaque avant la préparation de l’accueil');
      const exit = frames.filter(f => f.leaving && f.visibility !== 'hidden');
      assert.ok(exit.length > 3, 'Le fondu comporte plusieurs images intermédiaires');
      assert.ok(exit.some(f => f.opacity > 0.1 && f.opacity < 0.9));
      for (let i = 1; i < exit.length; i++) assert.ok(exit[i].opacity <= exit[i - 1].opacity + 0.005, 'La transition ne clignote pas');
      assert.equal(await page.locator('html').getAttribute('data-cleanz-launch'), 'complete');
      assert.equal(await page.locator('html').evaluate(el => el.classList.contains('dark')), saved === 'dark');
      assert.deepEqual(errors, []);
      const nav = page.getByRole('navigation', { name: 'Navigation principale' });
      await nav.getByRole('button', { name: 'Appareils', exact: true }).click();
      const add = page.getByRole('button', { name: 'Ajouter mes appareils', exact: true });
      await add.waitFor();
      assert.match(await add.evaluate(el => getComputedStyle(el).backgroundImage), /linear-gradient.*linear-gradient/);
      const style = await add.evaluate(el => { const s = getComputedStyle(el); return { color: s.color, border: s.borderTopColor }; });
      assert.equal(style.border, 'rgba(0, 0, 0, 0)');
      assert.equal(style.color, saved === 'dark' ? 'rgb(248, 241, 255)' : 'rgb(76, 37, 94)');
      await add.click();
      await page.getByRole('button', { name: 'Terminer', exact: true }).waitFor();
      await page.getByRole('button', { name: 'Terminer', exact: true }).click();
      await nav.getByRole('button', { name: 'Planning', exact: true }).click();
      await page.getByRole('button', { name: 'Créer mon planning', exact: true }).waitFor();
      await page.screenshot({ path: `${output}/buttons-planning-${saved}.png` });
      await nav.getByRole('button', { name: 'Accueil', exact: true }).click();
      await page.getByRole('button', { name: 'Mon compte', exact: true }).click();
      await page.getByRole('button', { name: saved === 'dark' ? /Clair/ : /Sombre/ }).click();
      await page.waitForFunction(expected => document.documentElement.classList.contains('dark') === expected, saved === 'light');
      assert.equal(await page.evaluate(() => localStorage.getItem('cleanz-theme-mode')), saved === 'dark' ? 'light' : 'dark');
      console.log(`PASS ${saved}: cold start at 4× CPU, no theme flash, full cover, progressive fade, gradient buttons and live appearance switch (${frames.length} frames)`);
      fs.writeFileSync(`${output}/timeline-${saved}.json`, JSON.stringify(frames));
    } finally { await context.close(); }
  }
  const late = await browser.newContext({ viewport: { width: 393, height: 852 }, colorScheme: 'dark', serviceWorkers: 'block' });
  try {
    const started = Date.now();
    await late.addInitScript(() => {
      localStorage.setItem('cleanz-theme-mode', 'dark');
      localStorage.setItem('cleanz-seen-nouveautes', '999999');
      localStorage.setItem('pwa-prompt-dismissed', 'true');
      window.__launchReappeared = false;
      let wasHidden = false;
      const sample = () => {
        const splash = document.querySelector('.splash-screen');
        if (splash) {
          const hidden = getComputedStyle(splash).visibility === 'hidden';
          if (wasHidden && !hidden) window.__launchReappeared = true;
          wasHidden ||= hidden;
        }
        if (document.documentElement?.dataset.cleanzLaunch !== 'complete') requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    await late.route('**/*.js*', async route => {
      const remaining = 8200 - (Date.now() - started);
      if (remaining > 0) await new Promise(resolve => setTimeout(resolve, remaining));
      await route.continue();
    });
    const page = await late.newPage();
    await page.goto(origin, { waitUntil: 'domcontentloaded' });
    await page.locator('.splash-screen').waitFor({ state: 'hidden', timeout: 12000 });
    await page.waitForFunction(() => document.documentElement.dataset.cleanzLaunch === 'complete', { timeout: 15000 });
    assert.equal(await page.evaluate(() => window.__launchReappeared), false, 'Le splash ne réapparaît pas après une hydratation tardive');
    assert.equal(await page.locator('.splash-screen').count(), 0);
    console.log('PASS hydratation après le délai de secours : aucune réapparition du splash');
  } finally { await late.close(); }
} finally { await browser.close(); }
