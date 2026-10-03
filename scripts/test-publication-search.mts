/** Vérifie la publication dans l'index de recherche et ses accès par surface.
 * Lancer : npx tsx scripts/test-publication-search.mts
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { RECETTES } from '../src/data/recettes.ts';
import { SURFACES } from '../src/data/surfaces.ts';
import { SURFACE_ALIASES } from '../src/data/searchAliases.ts';
import { getStatutRecette } from '../src/data/revue.ts';
import { searchAll } from '../src/utils/search.ts';

test('aucune recherche par titre, surface ou alias ne propose de recette indisponible', () => {
  const queries = new Set([
    ...RECETTES.map((r) => r.nom),
    ...SURFACES.map((s) => s.nom),
    ...Object.values(SURFACE_ALIASES).flat(),
  ]);
  for (const query of queries) {
    const results = searchAll(query).recipes;
    for (const { recipe } of results) {
      assert.equal(getStatutRecette(recipe.id), 'publiee', `${query} propose #${recipe.id}`);
    }
    assert.equal(new Set(results.map(({ recipe }) => recipe.id)).size, results.length, `Doublon pour ${query}`);
  }
});

test('une surface dont la seule recette est en attente ne propose pas de préparation', () => {
  const results = searchAll('friteuse');
  assert.equal(results.surfaces.find(({ surface }) => surface.id === 5)?.recipeCount, 0);
  assert(!results.recipes.some(({ recipe }) => recipe.id === 2));
});

test('une fusion vers une fiche suspendue ne réactive pas la méthode du pommeau', () => {
  const results = searchAll('pommeau');
  assert.equal(results.surfaces.find(({ surface }) => surface.id === 15)?.recipeCount, 0);
  assert(!results.recipes.some(({ recipe }) => recipe.id === 107 || recipe.id === 129));
});

test('les fusions WC aboutissent une seule fois à la fiche publiée', () => {
  const results = searchAll('WC');
  assert.equal(results.recipes.filter(({ recipe }) => recipe.id === 34).length, 1);
  assert(!results.recipes.some(({ recipe }) => [6, 7, 31, 32, 35, 96].includes(recipe.id)));
  assert.equal(results.surfaces.find(({ surface }) => surface.id === 17)?.recipeCount, 2);
});

test('les quatre suspensions supplémentaires disparaissent des résultats directs', () => {
  for (const id of [13, 30, 97, 107]) {
    const recipe = RECETTES.find((r) => r.id === id)!;
    assert(!searchAll(recipe.nom).recipes.some((result) => result.recipe.id === id));
  }
});
