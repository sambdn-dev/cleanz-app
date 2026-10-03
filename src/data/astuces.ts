import { Astuce } from '@/types';
import { getRecipeAccess } from '@/data/publication';
import { slugify } from '@/utils/share';

/**
 * Raccourcis d'usage vers les fiches du catalogue : leurs anciennes formules
 * divergentes sont supprimées, pas fusionnées avec les ingrédients du catalogue.
 * Ces correspondances ne constituent pas une validation des formulations.
 * Baskets (5) reste sans cible : l'ancienne astuce ne distinguait ni cuir ni toile,
 * contrairement aux recettes 84 et 108. La raclette (7) est un conseil mécanique.
 */
export const ASTUCE_RECETTE_IDS: Readonly<Record<number, number | null>> = {
  1: 15, // Nettoyage du four.
  2: 3, // Nettoyage des vitres.
  3: 34, // Détartrage des WC.
  4: 49, // Nettoyage du micro-ondes.
  5: null, // Aucune correspondance suffisamment précise.
  6: 20, // Nettoyage des joints de carrelage.
};

// Compatibilité des liens déjà partagés ; ces libellés ne sont plus affichés.
const ANCIENS_SLUGS: Readonly<Record<string, number>> = {
  'four-eclatant': 1,
  'vitres-sans-traces': 2,
  'wc-etincelants': 3,
  'micro-ondes-propre': 4,
  'baskets-blanches': 5,
  'joints-blanchis': 6,
  'poils-d-animaux-envoles': 7,
};

const raccourci = (
  id: number, titre: string, emoji: string, surface: string, gradient: string,
): Astuce => ({
  id, titre, emoji, surface, gradient,
  duree: '',
  note: 0,
  ingredients: [],
  resume: 'Consultez la fiche actuelle et ses précautions avant de commencer.',
  instructions: '',
  conseil: '',
});

export const ASTUCES_DU_JOUR: Astuce[] = [
  raccourci(1, 'Nettoyer le four', '🔥', 'Four', 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'),
  raccourci(2, 'Nettoyer les vitres', '🪟', 'Vitres', 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)'),
  raccourci(3, 'Détartrer les WC', '🚽', 'WC', 'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)'),
  raccourci(4, 'Nettoyer le micro-ondes', '📺', 'Micro-ondes', 'linear-gradient(135deg, #FA709A 0%, #FEE140 100%)'),
  raccourci(5, 'Nettoyer les baskets', '👟', 'Baskets', 'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)'),
  raccourci(6, 'Nettoyer les joints', '⬜', 'Joints', 'linear-gradient(135deg, #89F7FE 0%, #66A6FF 100%)'),
  {
    id: 7,
    titre: 'Retirer les poils d’animaux',
    emoji: '🐾',
    duree: '5min',
    note: 4.8,
    ingredients: ['Raclette à douche'],
    resume: 'Un geste mécanique pour ramasser les poils sur les textiles compatibles.',
    instructions: 'Passez la raclette à douche en caoutchouc sur le tapis, le canapé ou les sièges de voiture, toujours dans le même sens. Ramassez les amas formés, puis aspirez ou retirez-les à la main.',
    conseil: 'Vérifiez les consignes d’entretien du textile et essayez d’abord sur une zone discrète.',
    surface: 'Tapis & sièges',
    gradient: 'linear-gradient(135deg, #D4A373 0%, #BC8A5F 100%)',
  },
];

/** Les aperçus reprennent seulement les métadonnées de la fiche admissible. */
export function getPublishedAstuces(): Astuce[] {
  return ASTUCES_DU_JOUR.flatMap((astuce) => {
    if (astuce.id === 7) return [astuce];
    const recipeId = ASTUCE_RECETTE_IDS[astuce.id];
    if (typeof recipeId !== 'number') return [];
    const access = getRecipeAccess(recipeId);
    if (!access.available) return [];
    return [{
      ...astuce,
      titre: access.recipe.nom,
      duree: access.recipe.temps,
      ingredients: access.recipe.ingredients.map(({ nom }) => nom),
    }];
  });
}

/** Un ancien lien garde une entrée, même si sa recette est désormais bloquée. */
export function findAstuceBySlug(slug: string): Astuce | undefined {
  const legacyId = ANCIENS_SLUGS[slug];
  return ASTUCES_DU_JOUR.find((astuce) => astuce.id === legacyId || slugify(astuce.titre) === slug)
    ?? ASTUCES_DU_JOUR.find((astuce) => {
      const recipeId = ASTUCE_RECETTE_IDS[astuce.id];
      if (typeof recipeId !== 'number') return false;
      const access = getRecipeAccess(recipeId);
      const titre = access.available ? access.recipe.nom : access.requested?.nom;
      return titre !== undefined && slugify(titre) === slug;
    });
}
