/**
 * Contrôles métier de Planning et Appareils sur une app déjà construite/démarrée.
 * Données fictives dans des contextes Chromium isolés ; aucun profil utilisateur.
 * CLEANZ_BASE_URL / CHROMIUM_PATH permettent de choisir le serveur et le navigateur.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const { transpileModule, ModuleKind } = require('typescript');
const origin = process.env.CLEANZ_BASE_URL || 'http://127.0.0.1:3006';
const DEVICE_KEY = 'cleanz-my-devices';
const FOYER_KEY = 'cleanz-foyer-v1';
const DONE_KEY = 'cleanz-planning-faites-v1';
const data = {};
new Function('exports', transpileModule(fs.readFileSync(new URL('../src/data/electromenager.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ModuleKind.CommonJS },
}).outputText)(data);
const appliances = data.ELECTROMENAGERS;
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true });
const failures = [];

async function scenario(name, test) {
  const contexts = [];
  const errors = [];
  const open = async (seed = {}, options = {}) => {
    const context = await browser.newContext({ viewport: { width: 393, height: 852 }, reducedMotion: 'reduce', serviceWorkers: 'block' });
    contexts.push(context);
    await context.addInitScript(({ seed, origin, options }) => {
      if (location.origin !== origin) return;
      if (!localStorage.getItem('__ui_seeded')) {
        localStorage.setItem('cleanz-seen-nouveautes', '999999');
        localStorage.setItem('pwa-prompt-dismissed', 'true');
        localStorage.setItem('cleanz-theme-mode', options.theme || 'light');
        for (const [key, value] of Object.entries(seed)) localStorage.setItem(key, value);
        localStorage.setItem('__ui_seeded', 'true');
      }
      const setItem = Storage.prototype.setItem;
      window.__deviceWrites = [];
      window.__refuseDeviceWrites = Boolean(options.quota);
      Storage.prototype.setItem = function (key, value) {
        if (key === 'cleanz-my-devices') {
          window.__deviceWrites.push(String(value));
          if (window.__refuseDeviceWrites) throw new DOMException('Quota fictif du test', 'QuotaExceededError');
        }
        return setItem.call(this, key, value);
      };
    }, { seed, origin, options });
    const page = await context.newPage();
    page.setDefaultTimeout(12000);
    page.on('pageerror', error => errors.push(error.message));
    await ready(page);
    return page;
  };
  try {
    await test(open);
    assert.deepEqual(errors, [], 'Aucune erreur JavaScript navigateur');
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push({ name, error: error.stack });
    console.error(`FAIL ${name}: ${error.message}`);
  } finally {
    await Promise.all(contexts.map(context => context.close()));
  }
}

async function ready(page) {
  const response = await page.goto(origin, { waitUntil: 'networkidle', timeout: 60000 });
  assert.equal(response.status(), 200, 'App accessible');
  await page.getByRole('button', { name: 'Mon compte', exact: true }).waitFor();
  await page.locator('.splash-auto-out').waitFor({ state: 'hidden' });
}
async function tab(page, name) {
  await page.getByRole('button', { name, exact: true }).click();
}
const readRaw = (page, key) => page.evaluate(key => localStorage.getItem(key), key);
const readJSON = async (page, key) => JSON.parse(await readRaw(page, key));
const deviceCards = page => page.getByRole('button', { name: /^Voir (?:la fiche|le statut) de / });
async function expectCards(page, expected) {
  await page.waitForFunction(count => [...document.querySelectorAll('button')].filter(button => /^Voir (?:la fiche|le statut) de /.test(button.getAttribute('aria-label') || '')).length === count, expected.length);
  const labels = await deviceCards(page).evaluateAll(buttons => buttons.map(button => button.getAttribute('aria-label').replace(/^Voir (?:la fiche|le statut) de /, '')).sort());
  assert.deepEqual(labels, expected.map(appliance => appliance.nom).sort(), 'Les appareils visibles correspondent réellement au filtre');
}
async function devices(page) {
  await tab(page, 'Appareils');
  await page.getByRole('searchbox', { name: 'Rechercher un appareil' }).waitFor();
}
async function planning(page) {
  await tab(page, 'Planning');
  await page.getByRole('heading', { level: 1 }).waitFor();
}
const taskRegion = (page, day) => page.getByRole('region', { name: `Tâches du ${day}`, exact: true });
const settingsModal = page => page.locator('div.fixed.inset-0.z-50').last();
async function selectDay(page, day) {
  await page.getByRole('button', { name: new RegExp(`^${day} \\d`) }).click();
  await taskRegion(page, day.toLowerCase()).waitFor();
}

try {
  await scenario('Appareils : recherche sans accents, filtres par pièce et compteurs exacts', async open => {
    const page = await open();
    await devices(page);
    await expectCards(page, appliances);
    assert.match(await page.getByRole('button', { name: /^Tout explorer/ }).innerText(), new RegExp(`\\b${appliances.length}\\b`));
    const search = page.getByRole('searchbox', { name: 'Rechercher un appareil' });
    for (const query of ['refrigerateur', 'RÉFRIGÉRATEUR', 'lave', 'buanderie', 'appareil-absent']) {
      await search.fill(query);
      await expectCards(page, appliances.filter(appliance => normalize(`${appliance.nom} ${appliance.piece}`).includes(normalize(query))));
    }
    await search.fill('lave');
    await page.getByRole('button', { name: 'Pièce : Cuisine', exact: true }).click();
    await expectCards(page, appliances.filter(appliance => appliance.piece === 'Cuisine' && normalize(appliance.nom).includes('lave')));
    await search.fill('');
    for (const piece of [...new Set(appliances.map(appliance => appliance.piece))]) {
      await page.getByRole('button', { name: `Pièce : ${piece}`, exact: true }).click();
      await expectCards(page, appliances.filter(appliance => appliance.piece === piece));
    }
    await page.getByRole('button', { name: 'Pièce : Toutes', exact: true }).click();
    await expectCards(page, appliances);
    assert.equal(await readRaw(page, DEVICE_KEY), null, 'Explorer ne crée pas de sélection');
  });

  await scenario('Appareils : chargement sans écriture, inconnus conservés, sélection persistée et concurrence', async open => {
    const initial = '[1,  999999, 2]';
    const page = await open({ [DEVICE_KEY]: initial }, { theme: 'dark' });
    await devices(page);
    await expectCards(page, appliances.filter(appliance => [1, 2].includes(appliance.id)));
    assert.equal(await readRaw(page, DEVICE_KEY), initial, 'La lecture conserve les octets existants');
    assert.deepEqual(await page.evaluate(() => window.__deviceWrites), [], 'Aucune écriture au montage');
    assert.match(await page.getByRole('button', { name: /^Mes appareils/ }).innerText(), /\b2\b/, 'Seuls les IDs connus comptent');
    await page.getByRole('button', { name: 'Modifier mes appareils', exact: true }).click();
    // Une autre fenêtre ajoute un ancien ID juste avant notre action : il doit rester.
    await page.evaluate(key => localStorage.setItem(key, '[1,999999,2,999998]'), DEVICE_KEY);
    const added = appliances.find(appliance => appliance.id === 4);
    await page.getByRole('button', { name: `Ajouter ${added.nom} à mes appareils`, exact: true }).click();
    assert.deepEqual((await readJSON(page, DEVICE_KEY)).sort((a, b) => a - b), [1, 2, 4, 999998, 999999]);
    await page.getByRole('button', { name: 'Retirer Lave-linge de mes appareils', exact: true }).click();
    assert.deepEqual((await readJSON(page, DEVICE_KEY)).sort((a, b) => a - b), [2, 4, 999998, 999999]);
    await page.getByRole('button', { name: 'Terminer', exact: true }).click();
    await ready(page);
    await devices(page);
    await expectCards(page, appliances.filter(appliance => [2, 4].includes(appliance.id)));
    assert.deepEqual(await page.evaluate(() => window.__deviceWrites), [], 'Recharger ne réécrit pas les IDs inconnus');
  });

  await scenario('Appareils : stockage malformé récupérable et quota refusé sans faux enregistrement', async open => {
    for (const malformed of ['{ancienne-selection-a-recuperer', '{"ids":[2]}', '[2,"999"]']) {
      const corrupt = await open({ [DEVICE_KEY]: malformed });
      await devices(corrupt);
      await expectCards(corrupt, appliances);
      assert.equal(await corrupt.getByRole('button', { name: 'Ajouter mes appareils', exact: true }).count(), 0, 'La sélection illisible ne propose pas de remplacement');
      await corrupt.getByRole('button', { name: /^Mes appareils/ }).click();
      assert.equal(await corrupt.getByRole('button', { name: 'Choisir mes appareils', exact: true }).isEnabled(), false);
      assert.equal(await readRaw(corrupt, DEVICE_KEY), malformed, 'Le JSON cassé reste récupérable');
      assert.deepEqual(await corrupt.evaluate(() => window.__deviceWrites), [], 'Le JSON cassé interdit de remplacer la sélection');
      await corrupt.getByRole('status').filter({ hasText: /stockage|sauvegard|sélection|enregistr|illisible/i }).first().waitFor();
    }
    const initial = '[2, 999999]';
    const quota = await open({ [DEVICE_KEY]: initial }, { quota: true });
    await devices(quota);
    await quota.getByRole('button', { name: 'Modifier mes appareils', exact: true }).click();
    await quota.getByRole('button', { name: 'Ajouter Lave-vaisselle à mes appareils', exact: true }).click();
    assert.equal(await readRaw(quota, DEVICE_KEY), initial, 'Échec de quota : sélection persistée intacte');
    assert.equal(await quota.getByRole('button', { name: 'Ajouter Lave-vaisselle à mes appareils', exact: true }).getAttribute('aria-pressed'), 'false', 'La carte n’affiche pas une sélection non sauvegardée');
    await quota.getByRole('status').filter({ hasText: /sauvegard|enregistr|stockage|espace/i }).first().waitFor();
  });

  await scenario('Planning : foyer solo, tâches cochées persistées, jour/semaine et lien méthode', async open => {
    const page = await open();
    await planning(page);
    await page.getByLabel('Votre prénom', { exact: true }).fill('  Sami  ');
    await page.getByRole('button', { name: 'Changer l’avatar de la personne 1', exact: true }).click();
    await page.getByRole('button', { name: 'Créer mon planning', exact: true }).click();
    await page.getByRole('heading', { name: 'Planning', exact: true }).waitFor();
    const foyer = await readJSON(page, FOYER_KEY);
    assert.equal(foyer.configure, true);
    assert.equal(foyer.membres.length, 1);
    assert.equal(foyer.membres[0].prenom, 'Sami');
    assert.notEqual(foyer.membres[0].emoji, '🦊', 'Le choix d’avatar est conservé');
    await selectDay(page, 'Lundi');
    const monday = taskRegion(page, 'lundi');
    const task = monday.getByRole('button', { name: /^Marquer .* comme faite$/ }).first();
    const taskName = (await task.getAttribute('aria-label')).replace(/^Marquer /, '').replace(/ comme faite$/, '');
    await task.click();
    await monday.getByRole('button', { name: `Annuler ${taskName}`, exact: true }).waitFor();
    const done = await readRaw(page, DONE_KEY);
    const entries = JSON.parse(done);
    assert.equal(Object.keys(entries).length, 1);
    assert.equal(Object.values(entries)[0].m, foyer.membres[0].id);
    assert(Number(await page.getByRole('progressbar', { name: 'Progression du foyer' }).getAttribute('aria-valuenow')) > 0);
    await page.getByRole('button', { name: 'Semaine', exact: true }).click();
    assert.equal(await page.getByRole('region', { name: /^Tâches du / }).count(), 7, 'Vue semaine : les sept jours');
    await selectDay(page, 'Mardi');
    assert.equal(await page.getByRole('region', { name: /^Tâches du / }).count(), 1, 'Choisir un jour revient à la journée');
    await page.getByRole('button', { name: 'Semaine suivante', exact: true }).click();
    assert.equal(await readRaw(page, DONE_KEY), done, 'Changer de semaine ne touche pas aux cases');
    assert.equal(await page.getByRole('button', { name: /^Annuler / }).count(), 0, 'La semaine suivante ne réutilise pas les tâches cochées');
    await page.getByRole('button', { name: /^Revenir à aujourd.hui$/ }).click();
    await selectDay(page, 'Lundi');
    assert.equal(await monday.getByRole('button', { name: `Annuler ${taskName}`, exact: true }).getAttribute('aria-pressed'), 'true');
    await ready(page);
    await planning(page);
    await selectDay(page, 'Lundi');
    assert.equal(await readRaw(page, DONE_KEY), done, 'L’historique est persisté après rechargement');
    await monday.getByRole('button', { name: `Annuler ${taskName}`, exact: true }).click();
    assert.deepEqual(await readJSON(page, DONE_KEY), {}, 'Décocher retire cette occurrence');
    const method = monday.getByRole('button', { name: /^Voir la méthode pour / }).first();
    await method.click();
    await settingsModal(page).getByRole('button', { name: 'Fermer', exact: true }).waitFor();
    assert(await settingsModal(page).getByRole('heading').count(), 'Le lien méthode ouvre une fiche');
    await settingsModal(page).getByRole('button', { name: 'Fermer', exact: true }).click();
  });

  await scenario('Planning : ajout jusqu’à six personnes, retrait et foyer à deux avec filtres', async open => {
    const page = await open({}, { theme: 'dark' });
    await planning(page);
    const people = page.getByRole('region', { name: 'Personnes du foyer', exact: true });
    await page.getByLabel('Votre prénom', { exact: true }).fill('Sami');
    for (let count = 2; count <= 6; count++) {
      await people.getByRole('button', { name: 'Ajouter une personne', exact: true }).click();
      await page.getByLabel(`Prénom de la personne ${count}`, { exact: true }).fill(count === 2 ? 'Alex' : `Test ${count}`);
      assert.equal(await people.getByRole('textbox').count(), count);
    }
    assert.equal(await people.getByRole('button', { name: 'Ajouter une personne', exact: true }).count(), 0, 'Six personnes maximum');
    for (let count = 6; count >= 3; count--) await people.getByRole('button', { name: `Retirer Test ${count}`, exact: true }).click();
    assert.equal(await people.getByRole('textbox').count(), 2);
    await page.getByRole('button', { name: 'Créer mon planning', exact: true }).click();
    await page.getByRole('heading', { name: 'Planning', exact: true }).waitFor();
    const foyer = await readJSON(page, FOYER_KEY);
    assert.deepEqual(foyer.membres.map(member => member.prenom), ['Sami', 'Alex']);
    await selectDay(page, 'Lundi');
    await taskRegion(page, 'lundi').getByRole('button', { name: /^Marquer .* comme faite$/ }).first().click();
    const done = await readRaw(page, DONE_KEY);
    const owner = foyer.membres.find(member => member.id === Object.values(JSON.parse(done))[0].m);
    await page.getByRole('button', { name: 'Semaine', exact: true }).click();
    for (const member of foyer.membres) {
      await page.getByRole('button', { name: member.prenom, exact: true }).click();
      assert.equal(await page.getByRole('button', { name: member.prenom, exact: true }).getAttribute('aria-pressed'), 'true');
      assert.equal(await page.getByRole('button', { name: /^Annuler / }).count(), member.id === owner.id ? 1 : 0, 'Une tâche cochée reste rattachée à son membre');
      assert.equal(await readRaw(page, DONE_KEY), done, 'Le filtre ne modifie pas l’historique');
    }
    await page.getByRole('button', { name: 'Tout le monde', exact: true }).click();
    assert.equal(await page.getByRole('button', { name: /^Annuler / }).count(), 1);
    await page.getByRole('button', { name: 'Semaine suivante', exact: true }).click();
    await page.getByRole('button', { name: 'Semaine précédente', exact: true }).click();
    assert.equal(await readRaw(page, DONE_KEY), done);
  });

  await scenario('Planning : réglages du foyer, quotas, exclusions, tâches et confirmation de réinitialisation', async open => {
    const fixture = {
      configure: true,
      tachesActives: ['vaisselle', 'repas'],
      membres: [
        { id: 'test-sami', prenom: 'Sami', couleur: '#EC4899', emoji: '🦊', part: 50, exclusions: [] },
        { id: 'test-alex', prenom: 'Alex', couleur: '#38BDF8', emoji: '🐨', part: 50, exclusions: [] },
        { id: 'test-jo', prenom: 'Jo', couleur: '#FBBF24', emoji: '🐯', part: 50, exclusions: [] },
      ],
    };
    const page = await open({ [FOYER_KEY]: JSON.stringify(fixture) });
    await planning(page);
    await selectDay(page, 'Lundi');
    await taskRegion(page, 'lundi').getByRole('button', { name: /^Marquer .* comme faite$/ }).first().click();
    const done = await readRaw(page, DONE_KEY);
    await page.getByRole('button', { name: 'Réglages du foyer', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Réglages du foyer', exact: true });
    await dialog.getByRole('heading', { name: 'Réglages du foyer', exact: true }).waitFor();
    const slider = dialog.getByRole('slider', { name: 'Part de Sami', exact: true });
    await slider.focus();
    await slider.press('ArrowRight');
    assert.equal((await readJSON(page, FOYER_KEY)).membres[0].part, 51, 'Le quota modifié est enregistré');
    await dialog.getByRole('button', { name: 'Égaliser', exact: true }).click();
    assert((await readJSON(page, FOYER_KEY)).membres.every(member => member.part === 50));
    await dialog.getByRole('button', { name: 'Changer l’avatar de Sami', exact: true }).click();
    await dialog.getByLabel('Prénom de la personne 3', { exact: true }).fill('Noé');
    for (let count = 4; count <= 6; count++) {
      await dialog.getByRole('button', { name: 'Ajouter une personne', exact: true }).click();
      await dialog.getByLabel(`Prénom de la personne ${count}`, { exact: true }).fill(`Test ${count}`);
      assert.equal((await readJSON(page, FOYER_KEY)).membres.length, count);
    }
    assert.equal(await dialog.getByRole('button', { name: 'Ajouter une personne', exact: true }).count(), 0);
    for (let count = 6; count >= 4; count--) await dialog.getByRole('button', { name: `Retirer Test ${count}`, exact: true }).click();
    await dialog.getByRole('button', { name: 'Tâches', exact: true }).click();
    await dialog.getByRole('button', { name: /^Cuisine/ }).click();
    const exclusion = dialog.getByRole('button', { name: 'Exclure Sami de Vaisselle / lave-vaisselle', exact: true });
    await exclusion.click();
    assert.equal(await exclusion.getAttribute('aria-pressed'), 'true');
    assert.deepEqual((await readJSON(page, FOYER_KEY)).membres[0].exclusions, ['vaisselle']);
    await dialog.getByRole('button', { name: 'Suivre Préparer le repas', exact: true }).click();
    await dialog.getByRole('button', { name: /^Suivre Détartrer l.évier$/ }).click();
    const saved = await readRaw(page, FOYER_KEY);
    assert.deepEqual(JSON.parse(saved).tachesActives.sort(), ['evier', 'vaisselle']);
    assert.equal(await readRaw(page, DONE_KEY), done, 'Modifier le foyer ne supprime pas les tâches déjà accomplies');
    await dialog.getByRole('button', { name: 'Fermer', exact: true }).click();
    await ready(page);
    await planning(page);
    assert.equal(await readRaw(page, FOYER_KEY), saved, 'Les paramètres persistent après rechargement');
    assert.equal(await readRaw(page, DONE_KEY), done);
    await page.getByRole('button', { name: 'Alex', exact: true }).click();
    await page.getByRole('button', { name: 'Réglages du foyer', exact: true }).click();
    await dialog.getByRole('button', { name: 'Retirer Alex', exact: true }).click();
    await dialog.getByRole('button', { name: 'Fermer', exact: true }).click();
    assert.equal(await page.getByRole('button', { name: 'Tout le monde', exact: true }).getAttribute('aria-pressed'), 'true', 'Un membre filtré retiré revient au foyer');
    await page.getByRole('progressbar', { name: 'Progression du foyer', exact: true }).waitFor();
    assert.equal(await readRaw(page, DONE_KEY), done, 'Retirer un membre conserve l’historique existant');
    await page.getByRole('button', { name: 'Réglages du foyer', exact: true }).click();
    const beforeReset = await readRaw(page, FOYER_KEY);
    await dialog.getByRole('button', { name: 'Réinitialiser le foyer', exact: true }).click();
    assert.equal(await readRaw(page, FOYER_KEY), beforeReset, 'Demander une réinitialisation ne suffit pas');
    await dialog.getByRole('button', { name: 'Annuler', exact: true }).click();
    assert.equal(await readRaw(page, FOYER_KEY), beforeReset);
    assert.equal(await readRaw(page, DONE_KEY), done, 'Annuler conserve le foyer et son historique');
    await dialog.getByRole('button', { name: 'Réinitialiser le foyer', exact: true }).click();
    await dialog.getByRole('button', { name: 'Tout effacer', exact: true }).click();
    await page.getByLabel('Votre prénom', { exact: true }).waitFor();
    assert.equal((await readJSON(page, FOYER_KEY)).configure, false);
    assert.deepEqual((await readJSON(page, FOYER_KEY)).membres, []);
    assert.deepEqual(await readJSON(page, DONE_KEY), {});
  });

  await scenario('Planning : réglages au clavier, focus confiné, accordéons masqués ignorés et retour après Échap', async open => {
    const fixture = { configure: true, tachesActives: ['vaisselle', 'repas'], membres: [
      { id: 'test-clavier', prenom: 'Sami', couleur: '#EC4899', emoji: '🦊', part: 50, exclusions: [] },
    ] };
    const page = await open({ [FOYER_KEY]: JSON.stringify(fixture) });
    await planning(page);
    const trigger = page.getByRole('button', { name: 'Réglages du foyer', exact: true });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'Réglages du foyer', exact: true });
    const close = dialog.getByRole('button', { name: 'Fermer', exact: true });
    await close.waitFor();
    assert(await close.evaluate(button => button === document.activeElement), 'Le focus initial va sur Fermer');
    await page.keyboard.press('Shift+Tab');
    assert(await dialog.getByRole('button', { name: 'Réinitialiser le foyer', exact: true }).evaluate(button => button === document.activeElement), 'Maj+Tab boucle sur le dernier contrôle');
    await page.keyboard.press('Tab');
    assert(await close.evaluate(button => button === document.activeElement), 'Tab revient au premier contrôle');
    await dialog.getByRole('button', { name: 'Tâches', exact: true }).click();
    for (const openCuisine of [false, true]) {
      if (openCuisine) await dialog.getByRole('button', { name: /^Cuisine/ }).click();
      await close.focus();
      const visibleButtons = await dialog.getByRole('button').count();
      const visited = new Set();
      for (let index = 0; index < visibleButtons; index++) {
        const focused = await page.evaluate(() => {
          const element = document.activeElement;
          return { inside: Boolean(element?.closest('[role="dialog"]')), hidden: Boolean(element?.closest('[hidden]')), label: element?.getAttribute('aria-label') || element?.textContent };
        });
        assert(focused.inside, 'La tabulation reste dans les réglages');
        assert.equal(focused.hidden, false, 'Les tâches des accordéons fermés ne prennent pas le focus');
        visited.add(focused.label);
        await page.keyboard.press('Tab');
      }
      assert.equal(visited.size, visibleButtons, 'Chaque contrôle visible est joignable une fois');
      assert(await close.evaluate(button => button === document.activeElement), 'Le cycle de tabulation revient à Fermer');
    }
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'detached' });
    assert(await trigger.evaluate(button => button === document.activeElement), 'Échap ferme les réglages et rend le focus au bouton d’origine');
  });
} finally {
  await browser.close();
}
if (failures.length) {
  for (const { name, error } of failures) console.error(`\n${name}\n${error}`);
  process.exitCode = 1;
}
