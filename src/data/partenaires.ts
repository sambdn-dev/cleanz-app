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
    description: 'Désinfecte sols, joints et sanitaires sans aucun produit. Prêt en 30 secondes.',
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
    description: 'Désinfection longue durée 5-en-1 pour le skimmer.',
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
