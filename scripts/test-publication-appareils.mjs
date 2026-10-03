/**
 * Contrôle Chromium sur une app déjà construite et démarrée.
 * Nécessite Playwright (fourni par l’environnement cloud), sans profil utilisateur.
 * CLEANZ_BASE_URL et CHROMIUM_PATH permettent de modifier les valeurs locales.
 * Données fictives dans des contextes isolés ; captures et résultats dans /tmp.
 */
import { createRequire } from 'node:module';
const requireDependency = createRequire(import.meta.url);
const { chromium } = requireDependency('playwright');
import assert from 'node:assert/strict';

const origin = process.env.CLEANZ_BASE_URL || 'http://127.0.0.1:3000';
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    localStorage.setItem('cleanz-seen-nouveautes', '9999');
    localStorage.setItem('pwa-prompt-dismissed', 'true');
    localStorage.setItem('cleanz_canicule_seen', new Date().toISOString().slice(0, 10));
  });
  await page.goto(origin, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Appareils', exact: true }).click();
  for (const [name, status] of [['Lave-linge', 'Fiche en cours de revue'], ['Chaudière', 'Méthode retirée du catalogue']]) {
    await page.getByText(name, { exact: true }).first().click();
    const modal = page.locator('div.fixed.inset-0.z-50');
    await modal.getByRole('heading', { name: new RegExp(name) }).waitFor();
    for (const tab of ['Nettoyer', 'Entretien']) {
      await modal.getByRole('button', { name: tab, exact: true }).click();
      const text = await modal.innerText();
      assert(text.includes('Méthode indisponible'), `${name}/${tab}: notice absente`);
      assert(!/100\s*g|1\s*L\b|90\s*°|1[-–]1[,.]5|purge|purger|purgez|Calendrier d.entretien/i.test(text), `${name}/${tab}: ancienne méthode exposée`);
      console.log(`PASS ${name} / ${tab}: notice sans ancienne préparation/calendrier`);
    }
    await page.screenshot({ path: `/tmp/cleanz-appareil-${name === 'Lave-linge' ? 'lave-linge' : 'chaudiere'}.png`, fullPage: false, animations: 'disabled' });
    await modal.getByRole('button', { name: 'Consulter le statut de la fiche' }).click();
    await page.getByText(status, { exact: true }).waitFor();
    const statusText = await modal.innerText();
    assert(!/100\s*g|1\s*L\b|90\s*°|1[-–]1[,.]5|purge|purger|purgez/i.test(statusText), `${name}: ancienne méthode dans fiche statut`);
    console.log(`PASS ${name} / statut: ${status}`);
    await page.getByRole('button', { name: 'Revenir à l’application' }).click();
    await modal.getByRole('heading', { name: new RegExp(name) }).waitFor();
    await modal.getByRole('button', { name: 'Fermer', exact: true }).click();
  }
  assert.deepEqual(errors, [], 'Erreurs JavaScript navigateur');
  console.log('PASS aucun pageerror navigateur');
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
