/**
 * Les indispensables du nettoyage — familles de matériel (onglet Matériel).
 *
 * Chaque famille référence ses produits partenaires (data/partenaires.ts) et
 * les surfaces de l'app où elle excelle (deep-link vers la fiche surface).
 * Sélection indépendante : les liens produits restent des placeholders tant
 * que l'affiliation n'est pas activée.
 */

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
  /** Ids de produits partenaires (data/partenaires.ts) */
  produitIds: string[];
  budget: string;
  gradient: string;
  /** Accent clair / sombre */
  accent: string;
  accentDark: string;
}

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
    produitIds: ['karcher-sc3', 'polti-vaporetto'],
    budget: 'dès ~120 €',
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
    produitIds: ['dyson-v15'],
    budget: '200 à 650 €',
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
    produitIds: ['robot-laveur'],
    budget: 'dès ~300 €',
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
    produitIds: ['bissell-spotclean'],
    budget: '~150 €',
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
    produitIds: ['karcher-k5', 'karcher-foam', 'karcher-shampoo'],
    budget: '100 à 400 €',
    gradient: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
    accent: '#92400E',
    accentDark: '#FCD34D',
  },
];
