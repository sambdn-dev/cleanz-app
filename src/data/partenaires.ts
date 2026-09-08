/**
 * Partenariats & affiliation — infrastructure centralisée.
 *
 * ⚠️ Aucun lien n'est actif tant que `AFFILIATION_ACTIVE` est à false :
 * les cartes produit affichent « Bientôt disponible ». Le jour où le compte
 * Amazon Partenaires (ou un partenariat direct) est validé :
 *   1. passer AFFILIATION_ACTIVE à true
 *   2. renseigner AMAZON_PARTNER_TAG (ex. 'cleanz-21')
 * Rien d'autre à toucher.
 */

export const AFFILIATION_ACTIVE = false;
export const AMAZON_PARTNER_TAG = ''; // ex. 'cleanz-21'

export type CategorieProduit =
  | 'vapeur'
  | 'aspiration'
  | 'injecteur-extracteur'
  | 'piscine-spa'
  | 'auto'
  | 'produits';

export interface ProduitPartenaire {
  id: string;
  nom: string;
  marque: string;
  emoji: string;
  description: string;
  categorie: CategorieProduit;
  prixIndicatif?: string;
  /** Terme de recherche Amazon (transformé en lien affilié quand actif) */
  rechercheAmazon?: string;
  /** Lien direct marque (partenariat direct, prioritaire sur Amazon) */
  lienMarque?: string;
}

/** Lien sortant d'un produit — null tant que l'affiliation n'est pas activée. */
export const getLienProduit = (p: ProduitPartenaire): string | null => {
  if (!AFFILIATION_ACTIVE) return null;
  if (p.lienMarque) return p.lienMarque;
  if (p.rechercheAmazon) {
    const tag = AMAZON_PARTNER_TAG ? `&tag=${AMAZON_PARTNER_TAG}` : '';
    return `https://www.amazon.fr/s?k=${encodeURIComponent(p.rechercheAmazon)}${tag}`;
  }
  return null;
};

export const PRODUITS_PARTENAIRES: ProduitPartenaire[] = [
  /* ---------------- Vapeur ---------------- */
  {
    id: 'karcher-sc3',
    nom: 'Nettoyeur vapeur SC 3 EasyFix',
    marque: 'Kärcher',
    emoji: '💨',
    description: 'Nettoie sols, joints et sanitaires sans aucun produit. Prêt en 30 secondes.',
    categorie: 'vapeur',
    prixIndicatif: '≈ 160 €',
    rechercheAmazon: 'Kärcher SC 3 EasyFix nettoyeur vapeur',
  },
  {
    id: 'polti-vaporetto',
    nom: 'Vaporetto Smart',
    marque: 'Polti',
    emoji: '♨️',
    description: "L'alternative italienne réputée, idéale matelas et textiles.",
    categorie: 'vapeur',
    prixIndicatif: '≈ 120 €',
    rechercheAmazon: 'Polti Vaporetto nettoyeur vapeur',
  },
  /* ---------------- Aspiration & sols ---------------- */
  {
    id: 'bissell-spotclean',
    nom: 'SpotClean Pro (injecteur-extracteur)',
    marque: 'Bissell',
    emoji: '🛋️',
    description: 'Ravive canapés, tapis, sièges auto : injecte, brosse, aspire la saleté dissoute.',
    categorie: 'injecteur-extracteur',
    prixIndicatif: '≈ 150 €',
    rechercheAmazon: 'Bissell SpotClean Pro',
  },
  {
    id: 'dyson-v15',
    nom: 'Aspirateur balai V15 Detect',
    marque: 'Dyson',
    emoji: '🌀',
    description: 'Laser révélateur de poussière, idéal poils d’animaux et parquets.',
    categorie: 'aspiration',
    prixIndicatif: '≈ 650 €',
    rechercheAmazon: 'Dyson V15 Detect',
  },
  {
    id: 'robot-laveur',
    nom: 'Robot aspirateur-laveur',
    marque: 'Roborock',
    emoji: '🤖',
    description: 'Aspire et lave en autonomie — l’entretien quotidien pendant que vous vivez.',
    categorie: 'aspiration',
    prixIndicatif: 'dès 300 €',
    rechercheAmazon: 'Roborock robot aspirateur laveur',
  },
  /* ---------------- Produits ménagers ---------------- */
  {
    id: 'pink-stuff',
    nom: 'The Pink Stuff — pâte miracle',
    marque: 'Stardrops',
    emoji: '🩷',
    description: 'La pâte rose culte des réseaux : brûlé, semelles, joints… avec modération.',
    categorie: 'produits',
    prixIndicatif: '≈ 6 €',
    rechercheAmazon: 'The Pink Stuff pâte nettoyante',
  },
  /* ---------------- Detailing Auto ---------------- */
  {
    id: 'karcher-k5',
    nom: 'Nettoyeur haute pression K 5',
    marque: 'Kärcher',
    emoji: '💦',
    description: 'La référence du lavage auto à domicile — puissance réglable, idéal carrosserie.',
    categorie: 'auto',
    prixIndicatif: '≈ 330 €',
    rechercheAmazon: 'Kärcher K5 nettoyeur haute pression',
  },
  {
    id: 'karcher-foam',
    nom: 'Canon à mousse FJ 10 C',
    marque: 'Kärcher',
    emoji: '🫧',
    description: 'La neige de mousse qui décolle la saleté avant même de frotter.',
    categorie: 'auto',
    prixIndicatif: '≈ 30 €',
    rechercheAmazon: 'Kärcher FJ 10 C canon à mousse',
  },
  {
    id: 'karcher-shampoo',
    nom: 'Shampoing auto 3-en-1',
    marque: 'Kärcher',
    emoji: '🚙',
    description: 'Le fameux produit bleu : nettoie, protège et fait briller en un passage.',
    categorie: 'auto',
    prixIndicatif: '≈ 12 €',
    rechercheAmazon: 'Kärcher shampoing auto 3 en 1 RM 610',
  },
  {
    id: 'cleanz-car-brushes',
    nom: 'Kit pinceaux detailing',
    marque: 'Cleanz Car',
    emoji: '🖌️',
    description: '3 pinceaux à poils souples (large, moyen, fin) pour grilles, boutons et interstices.',
    categorie: 'auto',
    prixIndicatif: 'bientôt',
  },
  {
    id: 'gant-lavage',
    nom: 'Gant de lavage microfibre',
    marque: 'Accessoire',
    emoji: '🧤',
    description: 'Indispensable de la méthode des 2 seaux — zéro micro-rayure.',
    categorie: 'auto',
    prixIndicatif: '≈ 10 €',
    rechercheAmazon: 'gant lavage auto microfibre',
  },
  /* ---------------- Piscine & Spa ---------------- */
  {
    id: 'bayrol-ph-minus',
    nom: 'pH-Minus granulés',
    marque: 'Bayrol',
    emoji: '🧪',
    description: 'Corrige un pH trop élevé — la base d’une eau saine et d’un chlore efficace.',
    categorie: 'piscine-spa',
    prixIndicatif: '≈ 15 €',
    rechercheAmazon: 'Bayrol pH minus piscine',
  },
  {
    id: 'hth-chlore',
    nom: 'Chlore multifonctions galets',
    marque: 'HTH',
    emoji: '🫧',
    description: 'Traitement 5-en-1 longue durée pour le skimmer.',
    categorie: 'piscine-spa',
    prixIndicatif: '≈ 40 €',
    rechercheAmazon: 'HTH chlore multifonction galets 250g',
  },
  {
    id: 'bandelettes-test',
    nom: 'Bandelettes d’analyse 6-en-1',
    marque: 'Bayrol',
    emoji: '📊',
    description: 'pH, chlore, TAC en 15 secondes — l’analyse hebdo indispensable.',
    categorie: 'piscine-spa',
    prixIndicatif: '≈ 12 €',
    rechercheAmazon: 'Bayrol bandelettes test piscine',
  },
  {
    id: 'spa-clarifiant',
    nom: 'SpaTime — entretien spa',
    marque: 'Bayrol',
    emoji: '🛁',
    description: 'Gamme dédiée spas : eau claire même à 37 °C.',
    categorie: 'piscine-spa',
    prixIndicatif: '≈ 20 €',
    rechercheAmazon: 'Bayrol SpaTime',
  },
];

export const getProduitsParCategorie = (cat: CategorieProduit): ProduitPartenaire[] =>
  PRODUITS_PARTENAIRES.filter((p) => p.categorie === cat);

export const getProduitById = (id: string): ProduitPartenaire | undefined =>
  PRODUITS_PARTENAIRES.find((p) => p.id === id);
