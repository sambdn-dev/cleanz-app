/** Accès aux anciens raccourcis et absence de formule parallèle.
 * Lancer : npx tsx scripts/test-publication-astuces.mts
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ASTUCES_DU_JOUR, ASTUCE_RECETTE_IDS, findAstuceBySlug, getPublishedAstuces } from '../src/data/astuces.ts';
import { getRecipeAccess } from '../src/data/publication.ts';
import { REVUE } from '../src/data/revue.ts';
import { slugify } from '../src/utils/share.ts';

test('les sept anciens liens restent identifiables sans réintroduire leur formule', () => {
  const slugs = ['four-eclatant', 'vitres-sans-traces', 'wc-etincelants', 'micro-ondes-propre', 'baskets-blanches', 'joints-blanchis', 'poils-d-animaux-envoles'];
  slugs.forEach((slug, i) => assert.equal(findAstuceBySlug(slug)?.id, i + 1));
  assert.equal(findAstuceBySlug('lien-inexistant'), undefined);
  for (const astuce of ASTUCES_DU_JOUR.filter(({ id }) => id <= 6)) {
    assert.deepEqual(astuce.ingredients, [], `Ingrédients parallèles de l'astuce ${astuce.id}`);
    assert.equal(astuce.instructions, '');
    assert.equal(astuce.conseil, '');
  }
});

test('les aperçus reflètent les fiches admissibles ; les baskets sans matériau sont exclues', () => {
  const apercus = getPublishedAstuces();
  assert(!apercus.some(({ id }) => id === 5));
  assert(apercus.some(({ id }) => id === 7));
  assert.equal(ASTUCE_RECETTE_IDS[5], null);
  for (const astuce of apercus.filter(({ id }) => id !== 7)) {
    const access = getRecipeAccess(ASTUCE_RECETTE_IDS[astuce.id]!);
    assert(access.available);
    assert.equal(astuce.titre, access.recipe.nom);
    assert.equal(astuce.duree, access.recipe.temps);
    assert.deepEqual(astuce.ingredients, access.recipe.ingredients.map(({ nom }) => nom));
    assert.equal(astuce.instructions, '');
  }
});

test('une mise en attente retire immédiatement chaque raccourci mais conserve ses liens', () => {
  for (const [astuceId, recetteId] of Object.entries(ASTUCE_RECETTE_IDS)) {
    if (recetteId === null) continue;
    const before = getRecipeAccess(recetteId);
    assert(before.available);
    const titreSlug = slugify(before.recipe.nom);
    const original = REVUE[recetteId];
    try {
      REVUE[recetteId] = { ...original, priorite: 'P0' };
      assert(!getRecipeAccess(recetteId).available);
      assert(!getPublishedAstuces().some(({ id }) => id === Number(astuceId)));
      assert.equal(findAstuceBySlug(titreSlug)?.id, Number(astuceId));
    } finally {
      REVUE[recetteId] = original;
    }
  }
});

test('une fusion vers une destination suspendue ne recommande pas l’ancienne astuce', () => {
  const original = REVUE[15];
  try {
    REVUE[15] = { ...original, decision: 'fusionner', fusionDans: 13 };
    assert(!getRecipeAccess(15).available);
    assert(!getPublishedAstuces().some(({ id }) => id === 1));
    assert.equal(findAstuceBySlug('four-eclatant')?.id, 1);
  } finally {
    REVUE[15] = original;
  }
});
