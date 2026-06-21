import { RecetteComplete, Surface } from '@/types';

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
  | 'multiUsage2'
  | 'multiUsage3'
  | 'entretien'
  | 'entretien2'
  | 'entretien3'
  | 'jardin'
  | 'vitres'
  | 'ecrans';

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
  multiUsage2: '/images/scenes/scene-multi-usage-2.jpg',
  multiUsage3: '/images/scenes/scene-multi-usage-3.jpg',
  entretien: '/images/scenes/scene-entretien.jpg',
  entretien2: '/images/scenes/scene-entretien-2.jpg',
  entretien3: '/images/scenes/scene-entretien-3.jpg',
  jardin: '/images/scenes/scene-jardin.jpg',
  vitres: '/images/scenes/scene-vitres.jpg',
  ecrans: '/images/scenes/scene-ecrans.jpg',
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
  'indispensables',
  'cuisinePlan',
  'cuisineFour',
  'sdbDouche',
  'sdbWc',
  'sol',
  'lingeMachine',
  'lingeDetachant',
  'voitureInt',
  'voitureExt',
  'multiUsage',
  'multiUsage2',
  'multiUsage3',
  'entretien',
  'entretien2',
  'entretien3',
  'jardin', // surfaces Extérieur (terrasse, plantes…)
  'vitres', // Vitres / Miroirs
  'ecrans', // Électronique (écrans, ordi, téléphone)
]);

// Déclinaisons d'une scène (la 1re = scène d'origine). Les recettes/surfaces
// d'une même catégorie sont réparties sur les variantes DISPONIBLES → moins de
// répétition. Tant qu'une variante n'est pas activée, elle est simplement ignorée.
const SCENE_VARIANTS: Partial<Record<SceneKey, SceneKey[]>> = {
  multiUsage: ['multiUsage', 'multiUsage2', 'multiUsage3'],
  entretien: ['entretien', 'entretien2', 'entretien3'],
};

/** Choisit une variante disponible de façon déterministe (par id). */
function pickVariant(key: SceneKey, id: number): SceneKey {
  const variants = (SCENE_VARIANTS[key] ?? [key]).filter((k) => SCENES_DISPONIBLES.has(k));
  return variants.length ? variants[id % variants.length] : key;
}

/** Renvoie `key` si la scène est activée, sinon `fallback` (garantit la couverture). */
const opt = (key: SceneKey, fallback: SceneKey): SceneKey =>
  SCENES_DISPONIBLES.has(key) ? key : fallback;

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
  const key = pickVariant(getSceneKey(recette), recette.id);
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

/** Clé de scène pour une surface (mots-clés du nom, puis pièce). */
export function getSurfaceSceneKey(surface: Surface): SceneKey {
  const hay = norm(surface.nom + ' ' + surface.piece);
  const has = (...kw: string[]) => kw.some((k) => hay.includes(k));

  // Mots-clés prioritaires (le nom prime sur la pièce)
  if (has('wc', 'toilette', 'cuvette')) return 'sdbWc';
  if (has('four', 'friteuse', 'airfryer', 'hotte', 'vitroceram', 'plaque', 'barbecue', 'casserol', 'poel'))
    return 'cuisineFour';
  if (has('carross', 'jante', 'pneu', 'phare', 'vitres auto', 'voiture')) return 'voitureExt';
  if (has('siege', 'ceinture', 'casque moto', 'selle', 'cuir', 'habitacle')) return 'voitureInt';
  if (has('vitre', 'miroir')) return opt('vitres', 'multiUsage');
  if (has('ecran', 'ordinateur', 'telephone', 'tablette', 'clavier')) return opt('ecrans', 'multiUsage');
  if (has('terrasse', 'toiture', 'jardin', 'plante', 'fleur', 'mobilier', 'piscine', 'engrais', 'herbe', 'tondeuse'))
    return opt('jardin', 'multiUsage');
  if (has('tapis', 'moquette', 'parquet')) return 'sol';
  if (has('linge', 'lessive', 'draps', 'torchon', 'microfibre', 'doudoune', 'matelas', 'sommier', 'rideau', 'lit'))
    return 'lingeMachine';

  // Repli par pièce
  switch (surface.piece) {
    case 'Cuisine': return 'cuisinePlan';
    case 'Salle de bain': return 'sdbDouche';
    case 'Buanderie': return 'lingeMachine';
    case 'Véhicule': return 'voitureInt';
    case 'Garage': return 'entretien';
    case 'Électronique': return opt('ecrans', 'multiUsage');
    case 'Extérieur': return opt('jardin', 'multiUsage');
    default: return 'multiUsage'; // Salon, Chambre, Corps…
  }
}

/** Photo-scène générique d'une surface, si disponible (sinon undefined → emoji). */
export function getSurfaceImage(surface: Surface): string | undefined {
  const key = pickVariant(getSurfaceSceneKey(surface), surface.id);
  return SCENES_DISPONIBLES.has(key) ? SCENE_FILES[key] : undefined;
}
