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

/** « Poêles & casseroles » → « poeles-casseroles » (clé des photos dédiées). */
export const slugSurface = (nom: string) =>
  norm(nom).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/**
 * Photos DÉDIÉES par surface (une vraie photo du sujet, pas une scène
 * générique partagée). Clé = slug du nom de la surface. Une entrée ici a
 * priorité sur la scène de repli dans `getSurfaceImage`.
 *
 * Même format que les scènes : paysage 3:2, servi en 1200×800. Les appareils
 * (Électroménager) et les recettes réutilisent ces photos via `getPhotoBySlug`
 * et l'héritage surface → recette.
 */
export const SURFACE_PHOTOS: Record<string, string> = {
  // Lot 1 — Cuisine (1/2)
  'lave-vaisselle': '/images/surfaces/surface-lave-vaisselle.jpg',
  'refrigerateur': '/images/surfaces/surface-refrigerateur.jpg',
  'micro-ondes': '/images/surfaces/surface-micro-ondes.jpg',
  'evier': '/images/surfaces/surface-evier.jpg',
  'poubelles': '/images/surfaces/surface-poubelles.jpg',
  'plaques-vitroceramique': '/images/surfaces/surface-plaques-vitroceramique.jpg',
  'hotte': '/images/surfaces/surface-hotte.jpg',
  'friteuse': '/images/surfaces/surface-friteuse.jpg',
  'airfryer': '/images/surfaces/surface-airfryer.jpg',
  'poeles-casseroles': '/images/surfaces/surface-poeles-casseroles.jpg',
  'argenterie': '/images/surfaces/surface-argenterie.jpg',
  'bouilloire': '/images/surfaces/surface-bouilloire.jpg',
  'cafetiere': '/images/surfaces/surface-cafetiere.jpg',
  'casseroles-poeles-inox': '/images/surfaces/surface-casseroles-poeles-inox.jpg',
  'fer-a-repasser': '/images/surfaces/surface-fer-a-repasser.jpg',
  'microfibres': '/images/surfaces/surface-microfibres.jpg',
  'planches-a-decouper': '/images/surfaces/surface-planches-a-decouper.jpg',
  'tasses-mugs': '/images/surfaces/surface-tasses-mugs.jpg',
  'torchons': '/images/surfaces/surface-torchons.jpg',
  'vaisselle': '/images/surfaces/surface-vaisselle.jpg',
  'baignoire': '/images/surfaces/surface-baignoire.jpg',
  'bijoux': '/images/surfaces/surface-bijoux.jpg',
  'canalisations': '/images/surfaces/surface-canalisations.jpg',
  'carrelage': '/images/surfaces/surface-carrelage.jpg',
  'joints': '/images/surfaces/surface-joints.jpg',
  'lavabo': '/images/surfaces/surface-lavabo.jpg',
  'linge': '/images/surfaces/surface-linge.jpg',
  'mains': '/images/surfaces/surface-mains.jpg',
  'pommeau': '/images/surfaces/surface-pommeau.jpg',
  'robinetterie': '/images/surfaces/surface-robinetterie.jpg',
  'baskets': '/images/surfaces/surface-baskets.jpg',
  'chaussures': '/images/surfaces/surface-chaussures.jpg',
  'cuir': '/images/surfaces/surface-cuir.jpg',
  'doudounes': '/images/surfaces/surface-doudounes.jpg',
  'draps-lit': '/images/surfaces/surface-draps-lit.jpg',
  'gourdes': '/images/surfaces/surface-gourdes.jpg',
  'jouets': '/images/surfaces/surface-jouets.jpg',
  'matelas-sommier': '/images/surfaces/surface-matelas-sommier.jpg',
  'nuisibles': '/images/surfaces/surface-nuisibles.jpg',
  'rideaux': '/images/surfaces/surface-rideaux.jpg',
  'autocollants': '/images/surfaces/surface-autocollants.jpg',
  'canape': '/images/surfaces/surface-canape.jpg',
  'cuivre-laiton': '/images/surfaces/surface-cuivre-laiton.jpg',
  'interrupteurs': '/images/surfaces/surface-interrupteurs.jpg',
  'meubles-en-bois': '/images/surfaces/surface-meubles-en-bois.jpg',
  'moquette': '/images/surfaces/surface-moquette.jpg',
  'parquet': '/images/surfaces/surface-parquet.jpg',
  'poignees': '/images/surfaces/surface-poignees.jpg',
  'portes': '/images/surfaces/surface-portes.jpg',
  'tapis': '/images/surfaces/surface-tapis.jpg',
  'aspirateur': '/images/surfaces/surface-aspirateur.jpg',
  'chaudiere': '/images/surfaces/surface-chaudiere.jpg',
  'chauffe-eau': '/images/surfaces/surface-chauffe-eau.jpg',
  'climatisation': '/images/surfaces/surface-climatisation.jpg',
  'congelateur': '/images/surfaces/surface-congelateur.jpg',
  'murs-papier-peint': '/images/surfaces/surface-murs-papier-peint.jpg',
  'ordinateur': '/images/surfaces/surface-ordinateur.jpg',
  'radiateurs': '/images/surfaces/surface-radiateurs.jpg',
  'seche-linge': '/images/surfaces/surface-seche-linge.jpg',
  'telephone': '/images/surfaces/surface-telephone.jpg',
  'aspirateur-eau-poussiere': '/images/surfaces/surface-aspirateur-eau-poussiere.jpg',
  'carrosserie': '/images/surfaces/surface-carrosserie.jpg',
  'casque-moto': '/images/surfaces/surface-casque-moto.jpg',
  'ceintures': '/images/surfaces/surface-ceintures.jpg',
  'centrale-vapeur': '/images/surfaces/surface-centrale-vapeur.jpg',
  'jantes': '/images/surfaces/surface-jantes.jpg',
  'phares': '/images/surfaces/surface-phares.jpg',
  'plastiques': '/images/surfaces/surface-plastiques.jpg',
  'pneus': '/images/surfaces/surface-pneus.jpg',
  'purificateur-d-air': '/images/surfaces/surface-purificateur-d-air.jpg',
  'selle-moto': '/images/surfaces/surface-selle-moto.jpg',
  'sieges-auto': '/images/surfaces/surface-sieges-auto.jpg',
  'vitres-auto': '/images/surfaces/surface-vitres-auto.jpg',
  'barbecue': '/images/surfaces/surface-barbecue.jpg',
  'canalisations-ext': '/images/surfaces/surface-canalisations-ext.jpg',
  'mauvaises-herbes': '/images/surfaces/surface-mauvaises-herbes.jpg',
  'mobilier-de-jardin': '/images/surfaces/surface-mobilier-de-jardin.jpg',
  'outils-de-jardin': '/images/surfaces/surface-outils-de-jardin.jpg',
  'piscine': '/images/surfaces/surface-piscine.jpg',
  'plantes-fleurs': '/images/surfaces/surface-plantes-fleurs.jpg',
  'terrasse': '/images/surfaces/surface-terrasse.jpg',
  'toiture': '/images/surfaces/surface-toiture.jpg',
  'tondeuse': '/images/surfaces/surface-tondeuse.jpg',
  'ecrans': '/images/surfaces/surface-ecrans.jpg',
  'engrais': '/images/surfaces/surface-engrais.jpg',
  'four': '/images/surfaces/surface-four.jpg',
  'lave-linge': '/images/surfaces/surface-lave-linge.jpg',
  'parois-de-douche': '/images/surfaces/surface-parois-de-douche.jpg',
  'vitres-miroirs': '/images/surfaces/surface-vitres-miroirs.jpg',
  'wc': '/images/surfaces/surface-wc.jpg',
  // Appareils homonymes des familles Matériel (photos portrait 3:4, cadrées en cover)
  'nettoyeur-vapeur': '/images/materiel/materiel-vapeur.jpg',
  'aspirateur-balai': '/images/materiel/materiel-aspirateur.jpg',
  'robot-aspirateur-laveur': '/images/materiel/materiel-robot.jpg',
  'injecteur-extracteur': '/images/materiel/materiel-injecteur.jpg',
  'nettoyeur-haute-pression': '/images/materiel/materiel-haute-pression.jpg',
};

/** Photo dédiée d'un sujet désigné par son nom (surface ou appareil homonyme). */
export const getPhotoBySlug = (nom: string): string | undefined =>
  SURFACE_PHOTOS[slugSurface(nom)];

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
  return getSurfacePhotoForRecette(recette) ?? getSceneImage(recette);
}

/**
 * Héritage surface → recette : une recette dont l'une des surfaces déclarées
 * (« Évier », « Lavabo »…) possède une photo dédiée l'affiche en en-tête, au
 * lieu de la scène générique. Aucune photo par recette à produire.
 */
export function getSurfacePhotoForRecette(recette: RecetteComplete): string | undefined {
  for (const nom of recette.surfaces ?? []) {
    const photo = getPhotoBySlug(nom);
    if (photo) return photo;
  }
  return undefined;
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
  if (has('siege', 'ceinture', 'casque moto', 'selle moto', 'habitacle')) return 'voitureInt';
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

/** Photo d'une surface : sa photo dédiée si elle existe, sinon la scène générique (sinon undefined → emoji). */
export function getSurfaceImage(surface: Surface): string | undefined {
  const dediee = getPhotoBySlug(surface.nom);
  if (dediee) return dediee;
  const key = pickVariant(getSurfaceSceneKey(surface), surface.id);
  return SCENES_DISPONIBLES.has(key) ? SCENE_FILES[key] : undefined;
}
