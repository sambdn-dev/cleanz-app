import type { Spray } from '@/types';
import { getRecipeAccess, SPRAY_RECIPE_IDS } from '@/data/publication';

/**
 * Présentation des indispensables issue des fiches canoniques uniquement.
 * Les six anciens IDs restent résolvables par getRecipeAccess(id, 'spray') ;
 * masquer une fiche ici ne supprime ni un flacon ni son QR historique.
 */
export const SPRAYS_INDISPENSABLES: Spray[] = Object.keys(SPRAY_RECIPE_IDS).flatMap((key) => {
  const id = Number(key);
  const access = getRecipeAccess(id, 'spray');
  if (!access.available) return [];
  const recipe = access.recipe;
  return [{
    ...recipe,
    id,
    badge: recipe.badge ?? 'Fiche disponible',
    instructions: recipe.instructions.join('\n'),
  }];
});
