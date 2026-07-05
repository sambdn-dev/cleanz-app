/**
 * Les indispensables du nettoyage — familles de matériel (onglet Matériel).
 *
 * Chaque famille liste ses 5 meilleures références du marché français (2025-2026,
 * marques FR mises en avant) et les surfaces de l'app où elle excelle (deep-link).
 *
 * ⚠️ Sélection indépendante. Les liens produits restent des placeholders tant que
 * l'affiliation n'est pas activée (data/partenaires.ts → AFFILIATION_ACTIVE).
 * Le champ `image` est un slot : il reste vide tant qu'on n'a pas de visuel
 * sous licence (API Amazon Partenaires, kit presse marque, ou photo maison).
 */

import { AFFILIATION_ACTIVE, AMAZON_PARTNER_TAG } from './partenaires';

export interface Reference {
  marque: string;
  modele: string;
  /** Pourquoi ce choix, en une ligne */
  argument: string;
  /** Prix indicatif (fluctue — toujours « ~ » ou fourchette) */
  prix: string;
  /** Mention courte : « Le n°1 », « Meilleur Q/P », « Made in France »… */
  note?: string;
  /** true = marque française (badge 🇫🇷) */
  francaise?: boolean;
  /** Terme de recherche Amazon (devient lien affilié quand actif) */
  rechercheAmazon: string;
  /** Slot image (/images/materiel/xxx.jpg) — vide tant qu'aucun visuel sous licence */
  image?: string;
}

export interface FamilleMateriel {
  id: string;
  nom: string;
  emoji: string;
  tagline: string;
  description: string;
  /** 3 arguments courts « pourquoi on l'aime » */
  avantages: string[];
  /** Ids de surfaces (data/surfaces.ts) où cette machine excelle */
  surfaceIds: number[];
  /** Les 5 meilleures références du marché français */
  references: Reference[];
  budget: string;
  gradient: string;
  /** Accent clair / sombre */
  accent: string;
  accentDark: string;
}

/** Lien sortant d'une référence — null tant que l'affiliation est inactive. */
export const getLienReference = (ref: Reference): string | null => {
  if (!AFFILIATION_ACTIVE) return null;
  const tag = AMAZON_PARTNER_TAG ? `&tag=${AMAZON_PARTNER_TAG}` : '';
  return `https://www.amazon.fr/s?k=${encodeURIComponent(ref.rechercheAmazon)}${tag}`;
};

export const FAMILLES_MATERIEL: FamilleMateriel[] = [
  {
    id: 'vapeur',
    nom: 'Nettoyeur vapeur',
    emoji: '💨',
    tagline: 'Désinfecte tout, sans aucun produit',
    description:
      "De l'eau chauffée à 100 °C, rien d'autre. La vapeur dissout le gras, décolle le calcaire et élimine 99,9 % des bactéries — idéal avec des enfants ou des animaux à la maison.",
    avantages: [
      'Zéro produit, zéro résidu : juste de l\'eau',
      'Rentabilisé en quelques mois face aux sprays jetables',
      '12 surfaces de l\'app affichent « la vapeur suffit »',
    ],
    surfaceIds: [1, 17, 18, 82, 27, 58],
    references: [
      { marque: 'Kärcher', modele: 'SC 5 EasyFix', argument: 'La référence tout-terrain, vapeur continue et grande autonomie.', prix: '~290 €', note: 'Le n°1', rechercheAmazon: 'Kärcher SC 5 EasyFix nettoyeur vapeur' },
      { marque: 'Rowenta', modele: 'Clean & Steam Revolution', argument: 'Aspire ET lave à la vapeur en un passage — la marque française.', prix: '~330 €', note: 'Made in France', francaise: true, rechercheAmazon: 'Rowenta Clean & Steam Revolution' },
      { marque: 'Polti', modele: 'Vaporetto Smart 100_T', argument: '4 bars de pression, l\'expert italien de la vapeur.', prix: '~200 €', note: 'Puissance pro', rechercheAmazon: 'Polti Vaporetto Smart 100_T' },
      { marque: 'Kärcher', modele: 'SC 3 Deluxe EasyFix', argument: 'Prêt en 30 secondes, compact et facile à ranger.', prix: '~200 €', note: 'Meilleur Q/P', rechercheAmazon: 'Kärcher SC 3 Deluxe EasyFix' },
      { marque: 'Polti', modele: 'Vaporetto SV440_Double', argument: 'Balai vapeur léger et maniable, petit budget.', prix: '~90 €', note: 'Petit prix', rechercheAmazon: 'Polti Vaporetto SV440 balai vapeur' },
    ],
    budget: 'dès ~90 €',
    gradient: 'linear-gradient(135deg, #2DD4BF 0%, #0D9488 100%)',
    accent: '#115E59',
    accentDark: '#5EEAD4',
  },
  {
    id: 'aspirateur',
    nom: 'Aspirateur balai',
    emoji: '🌀',
    tagline: 'Le quotidien sans la corvée',
    description:
      "Sans fil, toujours à portée de main : on s'en sert 3 fois plus souvent qu'un traîneau. Les modèles récents révèlent même la poussière invisible au laser.",
    avantages: [
      'Sans fil : un sol propre en 5 minutes chrono',
      'Poils d\'animaux et miettes du quotidien',
      'Brosses dédiées parquet, tapis et matelas',
    ],
    surfaceIds: [74, 25, 26, 82],
    references: [
      { marque: 'Rowenta', modele: 'X-Force Flex 14.60 Aqua', argument: 'Fabriqué en France, brosse anti-emmêlement et lavage intégré.', prix: '~400 €', note: 'Made in France', francaise: true, rechercheAmazon: 'Rowenta X-Force Flex 14.60 Aqua' },
      { marque: 'Dyson', modele: 'V15 Detect', argument: 'Laser révélateur de poussière, la référence absolue.', prix: '~650 €', note: 'Le haut de gamme', rechercheAmazon: 'Dyson V15 Detect' },
      { marque: 'Dreame', modele: 'R20 / Z30', argument: 'Une puissance d\'aspiration folle au meilleur prix.', prix: '~400 €', note: 'Champion Q/P', rechercheAmazon: 'Dreame R20 aspirateur balai' },
      { marque: 'Dyson', modele: 'Gen5detect', argument: 'Le plus puissant des Dyson, filtration HEPA intégrale.', prix: '~800 €', note: 'Ultra premium', rechercheAmazon: 'Dyson Gen5detect' },
      { marque: 'Samsung', modele: 'Bespoke Jet AI', argument: 'Station qui auto-vide le bac, design et silencieux.', prix: '~600 €', note: 'Le plus complet', rechercheAmazon: 'Samsung Bespoke Jet AI aspirateur balai' },
    ],
    budget: '400 à 800 €',
    gradient: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
    accent: '#6D28D9',
    accentDark: '#C4B5FD',
  },
  {
    id: 'robot',
    nom: 'Robot aspirateur-laveur',
    emoji: '🤖',
    tagline: 'Il travaille, vous vivez',
    description:
      "Aspire ET lave les sols en autonomie, pièce par pièce, pendant que vous faites autre chose. L'entretien quotidien disparaît de votre charge mentale.",
    avantages: [
      'Sols impeccables tous les jours, sans y penser',
      'Aspire et lave en un seul passage',
      'Cartographie : il connaît votre maison par cœur',
    ],
    surfaceIds: [74, 11, 26],
    references: [
      { marque: 'Roborock', modele: 'S8 Pro Ultra', argument: 'Station tout-en-un et vibration sonique qui décolle les taches.', prix: '~1200 €', note: 'Le n°1', rechercheAmazon: 'Roborock S8 Pro Ultra' },
      { marque: 'Dreame', modele: 'L40 Ultra', argument: 'Presque tout du très haut de gamme, pour bien moins cher.', prix: '~900 €', note: 'Meilleur Q/P', rechercheAmazon: 'Dreame L40 Ultra robot' },
      { marque: 'Ecovacs', modele: 'Deebot T30 Omni', argument: 'Serpillière rotative chauffante, lavage impeccable.', prix: '~800 €', note: 'Excellent lavage', rechercheAmazon: 'Ecovacs Deebot T30 Omni' },
      { marque: 'Roborock', modele: 'Saros 10R', argument: 'Ultra-plat, navigation 3D de pointe pour passer partout.', prix: '~1500 €', note: 'Le plus techno', rechercheAmazon: 'Roborock Saros 10R' },
      { marque: 'iRobot', modele: 'Roomba Combo j7+', argument: 'La marque historique, fiable et bien suivie en SAV.', prix: '~600 €', note: 'Valeur sûre', rechercheAmazon: 'iRobot Roomba Combo j7+' },
    ],
    budget: '600 à 1500 €',
    gradient: 'linear-gradient(135deg, #38BDF8 0%, #1D4ED8 100%)',
    accent: '#1D4ED8',
    accentDark: '#7DD3FC',
  },
  {
    id: 'injecteur',
    nom: 'Injecteur-extracteur',
    emoji: '🛋️',
    tagline: 'La renaissance des tissus',
    description:
      "Il injecte une solution dans la fibre, brosse, puis aspire la saleté dissoute. Le canapé « bon à jeter » ressort comme neuf — les avant/après les plus spectaculaires du ménage.",
    avantages: [
      'Ressuscite canapés, tapis et sièges auto',
      'Aspire la saleté EN PROFONDEUR, pas en surface',
      'L\'eau sale qui ressort vaut tous les discours 😅',
    ],
    surfaceIds: [27, 25, 82, 42],
    references: [
      { marque: 'Bissell', modele: 'SpotClean Pet Pro', argument: 'Le best-seller anti-taches, redoutable avec les animaux.', prix: '~180 €', note: 'Best-seller', rechercheAmazon: 'Bissell SpotClean Pet Pro' },
      { marque: 'Kärcher', modele: 'SE 4 Plus', argument: 'Format traîneau, grande capacité pour canapé + tapis + moquette.', prix: '~250 €', note: 'Le plus complet', rechercheAmazon: 'Kärcher SE 4 Plus injecteur extracteur' },
      { marque: 'Bissell', modele: 'Little Green', argument: 'Ultra-compact, parfait taches ponctuelles et voiture.', prix: '~130 €', note: 'Compact', rechercheAmazon: 'Bissell Little Green' },
      { marque: 'Vax', modele: 'Platinum SmartWash', argument: 'Grandes surfaces de moquette, autopropulsé.', prix: '~300 €', note: 'Grandes surfaces', rechercheAmazon: 'Vax Platinum SmartWash' },
      { marque: 'Hoover', modele: 'CleanSlate', argument: 'Alternative fiable, bon débit d\'injection.', prix: '~160 €', note: 'Bon rapport', rechercheAmazon: 'Hoover CleanSlate nettoyeur textile' },
    ],
    budget: '130 à 300 €',
    gradient: 'linear-gradient(135deg, #F472B6 0%, #DB2777 100%)',
    accent: '#9D174D',
    accentDark: '#F9A8D4',
  },
  {
    id: 'haute-pression',
    nom: 'Nettoyeur haute pression',
    emoji: '💦',
    tagline: 'Terrasse, façade, voiture',
    description:
      "L'arme lourde de l'extérieur : terrasse verdie, jantes encrassées, mobilier de jardin… Ce qui prenait une après-midi prend 30 minutes. Avec le canon à mousse, il devient une station de lavage auto.",
    avantages: [
      'Décrasse 10x plus vite que la brosse',
      'Canon à mousse : lavage auto niveau pro',
      'Anti-mousse terrasse sans aucun produit',
    ],
    surfaceIds: [48, 38, 39, 78],
    references: [
      { marque: 'Kärcher', modele: 'K5 Power Control', argument: 'Le meilleur équilibre puissance / polyvalence, la référence.', prix: '~330 €', note: 'Le n°1', rechercheAmazon: 'Kärcher K5 Power Control' },
      { marque: 'Nilfisk', modele: 'Core 130', argument: '130 bars pour un prix serré — l\'expert venu du pro.', prix: '~130 €', note: 'Meilleur Q/P', rechercheAmazon: 'Nilfisk Core 130' },
      { marque: 'Kärcher', modele: 'K7 Premium Flex', argument: '180 bars, 600 l/h : pour les grosses surfaces et l\'encrassé.', prix: '~450 €', note: 'Le plus puissant', rechercheAmazon: 'Kärcher K7 Premium Power Control Flex' },
      { marque: 'Bosch', modele: 'EasyAquatak 120', argument: 'Léger, compact et abordable pour un usage occasionnel.', prix: '~90 €', note: 'Petit prix', rechercheAmazon: 'Bosch EasyAquatak 120' },
      { marque: 'Nilfisk', modele: 'Premium 200', argument: '200 bars, le plus musclé de la marque pour les pros du dimanche.', prix: '~400 €', note: 'Haut de gamme', rechercheAmazon: 'Nilfisk Premium 200-15' },
    ],
    budget: '90 à 450 €',
    gradient: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
    accent: '#92400E',
    accentDark: '#FCD34D',
  },
];
