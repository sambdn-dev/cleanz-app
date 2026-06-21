import { RecetteComplete } from '@/types';

/**
 * Photos-scènes génériques (stratégie « 12 scènes » plutôt qu'une photo par recette).
 *
 * Plutôt que 131 photos uniques, on couvre les 8 catégories avec 12 scènes.
 * Chaque recette est mappée automatiquement à la bonne scène selon sa
 * catégorie (+ quelques variantes détectées par mots-clés : four, WC,
 * détachant, extérieur voiture).
 *
 * Format des fichiers : 1792×1024 (paysage 3:2), style cosy/naturel.
 * Voir docs/scene-photos-prompts.md pour les prompts et le détail.
 */
export type SceneKey =
  | 'indispensables'
  | 'cuisinePlan'
  | 'cuisineFour'
  | 'sdbDouche'
  | 'sdbWc'
  | 'sol'
  | 'lingeMachine'
  | 'lingeDetachant'
  | 'voitureInt'
  | 'voitureExt'
  | 'multiUsage'
  | 'entretien';

/** Chemin public de chaque photo-scène. */
export const SCENE_FILES: Record<SceneKey, string> = {
  indispensables: '/images/scenes/scene-indispensables.jpg',
  cuisinePlan: '/images/scenes/scene-cuisine-plan.jpg',
  cuisineFour: '/images/scenes/scene-cuisine-four.jpg',
  sdbDouche: '/images/scenes/scene-sdb-douche.jpg',
  sdbWc: '/images/scenes/scene-sdb-wc.jpg',
  sol: '/images/scenes/scene-sol.jpg',
  lingeMachine: '/images/scenes/scene-linge-machine.jpg',
  lingeDetachant: '/images/scenes/scene-linge-detachant.jpg',
  voitureInt: '/images/scenes/scene-voiture-int.jpg',
  voitureExt: '/images/scenes/scene-voiture-ext.jpg',
  multiUsage: '/images/scenes/scene-multi-usage.jpg',
  entretien: '/images/scenes/scene-entretien.jpg',
};

/**
 * 👉 Scènes déjà déposées dans /public/images/scenes.
 *
 * Décommente une clé DÈS QUE le fichier .jpg correspondant est ajouté.
 * Tant qu'une scène n'est pas listée ici, les recettes de cette catégorie
 * gardent leur emoji (aucune image cassée, aucune requête 404).
 *
 * Les images peuvent être générées une par une (DALL·E n'en produit qu'une à
 * la fois) : ajoute la clé au fur et à mesure que tu intègres chaque photo.
 */
export const SCENES_DISPONIBLES = new Set<SceneKey>([
  // 'indispensables',
  // 'cuisinePlan',
  // 'cuisineFour',
  // 'sdbDouche',
  // 'sdbWc',
  // 'sol',
  // 'lingeMachine',
  // 'lingeDetachant',
  // 'voitureInt',
  // 'voitureExt',
  // 'multiUsage',
  // 'entretien',
]);

// Minuscules + suppression des accents pour la détection par mots-clés.
const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Clé de scène correspondant à une recette (catégorie + variantes par mots-clés). */
export function getSceneKey(recette: RecetteComplete): SceneKey {
  const hay = norm([recette.nom, ...(recette.surfaces ?? [])].join(' '));
  const has = (...kw: string[]) => kw.some((k) => hay.includes(k));

  switch (recette.categorie) {
    case 'Indispensable':
      return 'indispensables';
    case 'Cuisine':
      return has('four', 'hotte', 'vitroceram', 'plaque', 'grill', 'bbq')
        ? 'cuisineFour'
        : 'cuisinePlan';
    case 'Salle de bain':
      return has('wc', 'toilette', 'cuvette', 'urinoir')
        ? 'sdbWc'
        : 'sdbDouche';
    case 'Sol':
      return 'sol';
    case 'Linge':
      return has('detach', 'tache', 'aureole')
        ? 'lingeDetachant'
        : 'lingeMachine';
    case 'Voiture':
      return has('carross', 'jante', 'pneu', 'phare', 'lave-glace', 'degivr', 'pare-brise', 'lustr')
        ? 'voitureExt'
        : 'voitureInt';
    case 'Multi-usage':
      return 'multiUsage';
    case 'Entretien':
      return 'entretien';
    default:
      return 'multiUsage';
  }
}

/** Photo-scène générique d'une recette, si elle est disponible (sinon undefined). */
export function getSceneImage(recette: RecetteComplete): string | undefined {
  const key = getSceneKey(recette);
  return SCENES_DISPONIBLES.has(key) ? SCENE_FILES[key] : undefined;
}

/**
 * Image d'en-tête / vignette d'une recette, dans l'ordre de priorité :
 *  1. sa photo dédiée si elle existe (les sprays indispensables),
 *     avec sa variante sombre en mode sombre ;
 *  2. sinon la photo-scène générique de sa catégorie, si disponible ;
 *  3. sinon undefined → l'UI affiche l'emoji.
 */
export function getRecetteImage(
  recette: RecetteComplete,
  darkMode = false
): string | undefined {
  if (darkMode && recette.imageUrlDark) return recette.imageUrlDark;
  if (recette.imageUrl) return recette.imageUrl;
  return getSceneImage(recette);
}
