/**
 * Régressions métier du lot « publication cohérente ».
 * Lancer depuis le dépôt : npx tsx scripts/test-publication.mts
 *
 * Les attentes viennent du CSV d'audit (150 fiches) et des quatre suspensions
 * documentaires décidées pour ce lot. Elles ne valident aucune formulation.
 * Les mutations du registre restent en mémoire et sont toujours restaurées.
 * Le rendu serveur contrôle le contenu émis, pas l'hydratation ni le hors ligne.
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createElement, type ComponentProps } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RECETTES, RECETTES_PAR_SURFACE } from '../src/data/recettes.ts';
import { SURFACES } from '../src/data/surfaces.ts';
import {
  getRecipeAccess,
  getRecipeSummary,
  getPublishedRecipes,
  SPRAY_RECIPE_IDS,
} from '../src/data/publication.ts';
import { REVUE, getStatutRecette, resoudreRecetteId, type FicheRevue } from '../src/data/revue.ts';
import { searchAll } from '../src/utils/search.ts';
import { ThemeProvider } from '../src/contexts/ThemeContext.tsx';
import { RecipeInteractionsProvider } from '../src/contexts/RecipeInteractionsContext.tsx';

// Hors du bundler Next, Node ESM reçoit l'enveloppe CommonJS de next/image.
// Reproduire son interop default avant l'import de la modale : on conserve le
// vrai composant Image (aucun faux rendu ni remplacement de la règle métier).
const require = createRequire(import.meta.url);
const imageExports = require('next/image');
if (imageExports.default?.$$typeof && !imageExports.$$typeof) {
  Object.assign(imageExports, imageExports.default);
}
const { RecipeModal } = await import('../src/components/modals/RecipeModal.tsx');

const waiting = new Set([
  2, 6, 8, 14, 23, 25, 27, 35, 46, 47, 62, 66, 71, 72, 78, 87, 88, 89,
  92, 96, 99, 100, 102, 112, 115, 116, 117, 118, 121, 125, 132, 135, 138,
  143, 144, 145, 146, 150,
]);
const withdrawn = new Set([28, 50, 53, 67, 69, 70, 74, 76, 77, 80, 93, 120, 122, 124, 126, 131]);
const suspended = new Set([13, 30, 97, 107]);
const merges = new Map([
  [7, 34], [17, 5], [22, 6], [26, 24], [29, 3], [31, 34],
  [32, 34], [33, 13], [81, 65], [84, 64], [129, 107],
]);
const allIds = Array.from({ length: 150 }, (_, i) => i + 1);
const expectedPublished = allIds.filter(id =>
  !waiting.has(id) && !withdrawn.has(id) && !suspended.has(id) && !merges.has(id),
);
const publishedSet = new Set(expectedPublished);
const expectedDestination = (id: number): number | null => {
  const target = merges.get(id) ?? id;
  return publishedSet.has(target) ? target : null;
};
const expectedList = (ids: readonly number[]) =>
  [...new Set(ids.map(expectedDestination).filter((id): id is number => id !== null))].sort((a, b) => a - b);
const sortedIds = (recipes: readonly { id: number }[]) => recipes.map(r => r.id).sort((a, b) => a - b);

let passed = 0;
let failed = 0;
const test = (name: string, run: () => void) => {
  try {
    run();
    passed++;
    console.log(`✓ ${name}`);
  } catch (error) {
    failed++;
    console.error(`✗ ${name}`);
    console.error(error instanceof Error ? error.message : error);
  }
};

// Un historique éditorial peut lui aussi contenir des dosages. Il ne doit pas
// rejoindre les métadonnées destinées aux écrans de blocage ou aux flacons.
const instructionKeys = new Set([
  'ingredients', 'instructions', 'preparation', 'etapes', 'astuces',
  'conservation', 'motif', 'materiel', 'quantite', 'dosage',
]);
const assertMetadataOnly = (value: unknown, path = 'réponse') => {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    assert(!instructionKeys.has(key), `${path}.${key} expose des instructions historiques`);
    assertMetadataOnly(child, `${path}.${key}`);
  }
};
const assertBlocked = (id: number, type: 'spray' | 'recette' = 'recette') => {
  const access = getRecipeAccess(id, type);
  assert.equal(access.available, false, `${type}-${id} doit être indisponible`);
  if (access.available) return;
  assert.equal('recipe' in access, false, `${type}-${id} retourne encore la formule`);
  assert(access.message.trim().length > 0, `${type}-${id} doit expliquer le blocage`);
  assertMetadataOnly(access);
};

test('Le catalogue contient les 81 fiches publiées attendues, sans doublon ni recette en attente', () => {
  assert.equal(RECETTES.length, 150, 'Le périmètre audité a changé : réexaminer les attentes');
  assert.equal(expectedPublished.length, 81);
  assert.deepEqual(sortedIds(getPublishedRecipes()), expectedPublished);
});

test('Les 150 anciens identifiants suivent les statuts et fusions explicites de l’audit', () => {
  for (const id of allIds) {
    const expectedStatus = waiting.has(id) ? 'en_attente'
      : withdrawn.has(id) ? 'retiree'
      : suspended.has(id) ? 'suspendue'
      : merges.has(id) ? 'fusionnee' : 'publiee';
    assert.equal(getStatutRecette(id), expectedStatus, `Statut #${id}`);
    const destination = expectedDestination(id);
    assert.equal(resoudreRecetteId(id), destination, `Résolution #${id}`);
    const access = getRecipeAccess(id);
    assert.equal(access.available, destination !== null, `Accès #${id}`);
    if (!access.available) {
      assertBlocked(id);
      continue;
    }
    assert.equal(access.recipe.id, destination, `Destination #${id}`);
    assert.equal(access.redirected, destination !== id, `Redirection #${id}`);
    assert.equal(access.status, 'publiee');
    const canonical = RECETTES.find(recipe => recipe.id === destination)!;
    assert.deepEqual(access.recipe.ingredients, canonical.ingredients, `Formule canonique #${id}`);
    assert.deepEqual(access.recipe.instructions, canonical.instructions, `Étapes canoniques #${id}`);
  }
});

test('Les résumés des 150 fiches conservent leur identité sans formule ni diagnostic avec dosages', () => {
  for (const id of allIds) {
    const summary = getRecipeSummary(id);
    assert(summary, `Résumé manquant #${id}`);
    assert.equal(summary.id, id, `L’identité historique #${id} a changé`);
    assertMetadataOnly(summary, `résumé #${id}`);
  }
});

for (const [id, label] of [
  [2, 'dégraissant en attente'], [6, 'nettoyant en attente'], [28, 'recette retirée'],
  [13, 'déboucheur suspendu'], [30, 'sols suspendus'], [97, 'tapis vapeur suspendu'],
  [107, 'pommeau suspendu'], [22, 'fusion vers #6 en attente'],
  [33, 'fusion vers #13 suspendue'], [129, 'fusion vers #107 suspendue'],
] as const) {
  test(`L’ancien accès #${id} (${label}) ne donne aucune instruction`, () => assertBlocked(id));
}

test('La fusion #29 utilise seulement les doses et étapes de #3', () => {
  const access = getRecipeAccess(29);
  assert(access.available);
  assert.equal(access.recipe.id, 3);
  assert.equal(access.requested?.id, 29);
  assert.equal(access.redirected, true);
  const oldRecipe = RECETTES.find(recipe => recipe.id === 29)!;
  assert.notDeepEqual(access.recipe.ingredients, oldRecipe.ingredients);
  assert.notDeepEqual(access.recipe.instructions, oldRecipe.instructions);
});

test('Une sélection mêlant doublons, fusions et fiches bloquées ne contient que #3 et #34', () => {
  const recipes = getPublishedRecipes([2, 29, 3, 29, 22, 33, 129, 13, 28, 99999, 7, 34, 31]);
  assert.deepEqual(sortedIds(recipes), [3, 34]);
  assert.deepEqual(getPublishedRecipes([]), []);
});

test('Les six anciens identifiants spray gardent leur correspondance ; #2 et #6 restent bloqués', () => {
  assert.deepEqual(Object.entries(SPRAY_RECIPE_IDS).map(([id, target]) => [Number(id), target]),
    [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]]);
  for (let id = 1; id <= 6; id++) {
    const access = getRecipeAccess(id, 'spray');
    const recipeAccess = getRecipeAccess(id, 'recette');
    assert.equal(access.available, id !== 2 && id !== 6, `spray-${id}`);
    assert.deepEqual(access, recipeAccess, `Les parcours spray et recette divergent pour #${id}`);
    assertMetadataOnly(getRecipeSummary(id, 'spray'));
    if (!access.available) assertBlocked(id, 'spray');
  }
});

test('Un spray hors correspondance ne se rabat pas sur une recette pourtant publiée (#20)', () => {
  assert(getRecipeAccess(20).available, 'Le témoin recette #20 doit être publié');
  assertBlocked(20, 'spray');
  assert.equal(getRecipeSummary(20, 'spray'), null);
});

test('Les identifiants inconnus, fractionnaires, non sûrs ou non finis échouent sans publication par défaut', () => {
  for (const id of [0, -1, 99999, 1.5, Number.MAX_SAFE_INTEGER + 1, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.equal(getStatutRecette(id), 'en_attente', `Statut inconnu ${id}`);
    assert.equal(resoudreRecetteId(id), null, `Résolution inconnue ${id}`);
    assertBlocked(id);
    assert.equal(getRecipeSummary(id), null);
  }
});

test('Un namespace inconnu ne peut pas ouvrir une recette publiée', () => {
  const invalidType = 'flacon' as Parameters<typeof getRecipeAccess>[1];
  const access = getRecipeAccess(3, invalidType);
  assert.equal(access.available, false);
  assertMetadataOnly(access);
  assert.equal(getRecipeSummary(3, invalidType), null);
});

const withRevue = (entries: Record<number, FicheRevue | undefined>, run: () => void) => {
  const snapshots = Object.keys(entries).map(Number).map(id => ({ id, value: REVUE[id], existed: Object.hasOwn(REVUE, id) }));
  try {
    for (const [key, value] of Object.entries(entries)) {
      if (value === undefined) delete REVUE[Number(key)];
      else REVUE[Number(key)] = value;
    }
    run();
  } finally {
    for (const { id, value, existed } of snapshots) {
      if (existed) REVUE[id] = value;
      else delete REVUE[id];
    }
  }
};

test('Une fiche réelle sans décision éditoriale explicite est bloquée', () => {
  withRevue({ 1: undefined }, () => {
    assert.equal(getStatutRecette(1), 'en_attente');
    assert.equal(resoudreRecetteId(1), null);
    assertBlocked(1);
    assert.equal(getPublishedRecipes([1]).length, 0);
  });
});

for (const [name, destination] of [
  ['sans destination explicite', undefined],
  ['vers une fiche absente', 99999],
  ['vers une fiche retirée', 28],
] as const) {
  test(`Une fusion ${name} ne revient jamais à ses propres instructions`, () => {
    withRevue({ 29: { ...REVUE[29], fusionDans: destination } }, () => {
      assert.equal(resoudreRecetteId(29), null);
      assertBlocked(29);
      assert.deepEqual(getPublishedRecipes([29]), []);
    });
  });
}

test('Une boucle de fusions est refusée et ne révèle aucune des deux anciennes formules', () => {
  withRevue({ 29: { ...REVUE[29], fusionDans: 7 }, 7: { ...REVUE[7], fusionDans: 29 } }, () => {
    for (const id of [29, 7]) {
      assert.equal(resoudreRecetteId(id), null);
      assertBlocked(id);
    }
    assert.deepEqual(getPublishedRecipes([29, 7]), []);
  });
});

test('Une fusion vers elle-même est refusée', () => {
  withRevue({ 29: { ...REVUE[29], fusionDans: 29 } }, () => {
    assert.equal(resoudreRecetteId(29), null);
    assertBlocked(29);
  });
});

test('Une chaîne de fusions explicites aboutit seulement à la destination publiée finale', () => {
  withRevue({ 29: { ...REVUE[29], fusionDans: 7 } }, () => {
    assert.equal(resoudreRecetteId(29), 34);
    const access = getRecipeAccess(29);
    assert(access.available);
    assert.equal(access.recipe.id, 34);
    assert.deepEqual(sortedIds(getPublishedRecipes([29, 7, 34])), [34]);
  });
});

test('Une entrée de revue sans fiche source ne suffit pas à ouvrir des instructions', () => {
  withRevue({ 99999: { ...REVUE[1] } }, () => assertBlocked(99999));
});

test('Toutes les associations de surfaces filtrent et dédupliquent les destinations admissibles', () => {
  for (const [surfaceId, ids] of Object.entries(RECETTES_PAR_SURFACE)) {
    assert.deepEqual(sortedIds(getPublishedRecipes(ids)), expectedList(ids), `Surface #${surfaceId}`);
  }
  assert.deepEqual(getPublishedRecipes(RECETTES_PAR_SURFACE[5]), [], 'Friteuse : #2 est en attente');
  assert.deepEqual(getPublishedRecipes(RECETTES_PAR_SURFACE[15]), [], 'Pommeau : #107 et #129 sont bloquées');
  assert.deepEqual(sortedIds(getPublishedRecipes(RECETTES_PAR_SURFACE[17])), [34, 101], 'WC : les trois fusions vers #34 sont dédupliquées');
});

test('La recherche sur les 150 noms et toutes les surfaces ne recommande jamais une fiche bloquée', () => {
  const queries = new Set([...RECETTES.map(recipe => recipe.nom), ...SURFACES.map(surface => surface.nom)]);
  for (const query of queries) {
    const results = searchAll(query);
    const ids = results.recipes.map(result => result.recipe.id);
    assert.equal(ids.length, new Set(ids).size, `Doublon pour « ${query} »`);
    for (const id of ids) assert(publishedSet.has(id), `La recherche « ${query} » recommande #${id}`);
    for (const { surface, recipeCount } of results.surfaces) {
      assert.equal(recipeCount, expectedList(RECETTES_PAR_SURFACE[surface.id] || []).length,
        `Compteur de la surface ${surface.nom} pour « ${query} »`);
    }
  }
  assert(searchAll('Anti-traces Vitres').recipes.some(result => result.recipe.id === 3), 'Le résultat publié exact doit rester trouvable');
  assert(!searchAll('Dégraissant Puissant').recipes.some(result => result.recipe.id === 2));
});

const decodeHtml = (html: string) => html.replace(/<[^>]*>/g, '').replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (_, entity: string) => {
  if (entity.startsWith('#x')) return String.fromCodePoint(parseInt(entity.slice(2), 16));
  if (entity.startsWith('#')) return String.fromCodePoint(parseInt(entity.slice(1), 10));
  return ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" } as Record<string, string>)[entity] ?? entity;
});
const renderRecipe = (id: number, type: 'spray' | 'recette' = 'recette', extra: Record<string, unknown> = {}) => {
  const props = { recipeId: id, recipeType: type, onClose: () => {}, ...extra } as ComponentProps<typeof RecipeModal>;
  return decodeHtml(renderToStaticMarkup(createElement(ThemeProvider, null,
    createElement(RecipeInteractionsProvider, null, createElement(RecipeModal, props)),
  )));
};
const assertNoHistoricalInstructions = (text: string, id: number) => {
  const source = RECETTES.find(recipe => recipe.id === id)!;
  for (const ingredient of source.ingredients) {
    if (ingredient.nom.length > 3) assert(!text.includes(ingredient.nom), `#${id} révèle l’ingrédient ${ingredient.nom}`);
    if (ingredient.quantite.length > 3) assert(!text.includes(ingredient.quantite), `#${id} révèle le dosage ${ingredient.quantite}`);
  }
  for (const instruction of [...source.instructions, ...source.astuces, source.conservation, REVUE[id]?.motif].filter(Boolean)) {
    assert(!text.includes(instruction!), `#${id} révèle : ${instruction}`);
  }
  assert(!text.includes('Ingrédients & dosages'), `#${id} affiche encore sa liste de préparation`);
};

for (const id of [2, 6, 28, 13, 30, 97, 107, 22, 33, 129]) {
  test(`Rendu de l’ancien lien recette-${id} : explication visible, sans anciennes instructions`, () => {
    const text = renderRecipe(id);
    const access = getRecipeAccess(id);
    assert(!access.available);
    assert(text.includes(access.message), `Le message de blocage #${id} manque au rendu`);
    assertNoHistoricalInstructions(text, id);
  });
}

test('Le rendu de l’ancien spray #2 porte le même blocage que sa recette', () => {
  const text = renderRecipe(2, 'spray');
  const access = getRecipeAccess(2);
  assert(!access.available);
  assert(text.includes(access.message));
  assertNoHistoricalInstructions(text, 2);
});

test('Le rendu d’un identifiant inconnu explique le lien indisponible', () => {
  const access = getRecipeAccess(99999);
  assert(!access.available);
  assert(renderRecipe(99999).includes(access.message));
});

test('Le rendu de la fusion #29 montre seulement la préparation canonique #3', () => {
  const text = renderRecipe(29);
  const canonical = RECETTES.find(recipe => recipe.id === 3)!;
  const old = RECETTES.find(recipe => recipe.id === 29)!;
  assert(text.includes(canonical.nom));
  assert(text.includes(canonical.instructions[0]));
  for (const instruction of old.instructions.filter(item => !canonical.instructions.includes(item))) {
    assert(!text.includes(instruction), `L’ancienne préparation de #29 demeure visible : ${instruction}`);
  }
  assert(!text.includes(REVUE[29].motif!), 'Le diagnostic de fusion réintroduit les anciennes doses');
});

test('Un objet recette falsifié passé au rendu ne remplace pas la source canonique', () => {
  const canonical = RECETTES.find(recipe => recipe.id === 3)!;
  const marker = 'FORMULE_FALSIFIEE_NE_DOIT_JAMAIS_ETRE_AFFICHEE';
  const forged = { ...canonical, ingredients: [{ nom: marker, quantite: '999 litres' }], instructions: [marker], astuces: [marker] };
  const text = renderRecipe(3, 'recette', { recipe: forged });
  assert(!text.includes(marker));
  assert(text.includes(canonical.instructions[0]));
  const blockedText = renderRecipe(2, 'recette', { recipe: { ...forged, id: 2 } });
  assert(!blockedText.includes(marker));
  assert(!blockedText.includes(canonical.instructions[0]));
  assertNoHistoricalInstructions(blockedText, 2);
});

test('Les scénarios de mutations n’ont pas altéré le registre utilisé par les autres contrôles', () => {
  assert.deepEqual(sortedIds(getPublishedRecipes()), expectedPublished);
  assert.equal(resoudreRecetteId(29), 3);
  assert.equal(resoudreRecetteId(7), 34);
  assert.equal(Object.hasOwn(REVUE, 99999), false);
});

console.log(`\nPublication : ${passed} scénarios réussis, ${failed} échoués.`);
console.log('Périmètre : 150 fiches, 6 anciens sprays, associations surfaces, recherche et rendu serveur.');
console.log('Limites : pas de validation de formulation, de test physique QR, ni de preuve navigateur/hors ligne dans ce script.');
if (failed > 0) process.exitCode = 1;
