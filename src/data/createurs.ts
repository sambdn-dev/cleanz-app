/**
 * Créateurs cleantok/cleantech mis en avant dans l'app (vitrine simple).
 *
 * ⚠️ Sélection indépendante : aucun partenariat signé à ce jour.
 * Le jour où un partenariat existe, passer `partenaire: true` sur la fiche —
 * le badge « Partenaire » s'affichera automatiquement (transparence).
 */

export interface LienCreateur {
  label: string;
  url: string;
  type: 'boutique' | 'livre' | 'site';
}

export interface Createur {
  id: string;
  nom: string;
  pseudo: string;
  emoji: string;
  gradient: string;
  /** Photo du créateur (carré). Repli sur l'emoji + dégradé si absente. */
  photo?: string;
  bio: string;
  specialites: string[];
  liens: LienCreateur[];
  /** Partenariat signé → badge « Partenaire » + contenus exclusifs à venir */
  partenaire: boolean;
}

export const CREATEURS: Createur[] = [
  {
    id: 'bgin',
    nom: 'Bruno',
    pseudo: 'Begin Clean',
    emoji: '🧤',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
    photo: '/images/creators/bgin.jpg',
    bio: "Le pro du nettoyage devenu référence des réseaux : des millions de vues sur ses transformations avant/après et ses tests de produits sans langue de bois. Il a lancé sa propre gamme B'GIN.",
    specialites: ['Avant/après', 'Tests produits', 'Sa marque B’GIN'],
    liens: [
      { label: 'Boutique bgin.fr', url: 'https://www.bgin.fr/', type: 'boutique' },
    ],
    partenaire: false,
  },
  {
    id: 'homme-de-menage',
    nom: "L'Homme de Ménage",
    pseudo: '@lhommedemenage',
    emoji: '🧹',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    photo: '/images/creators/homme-de-menage.jpg',
    bio: "Astuces de ménage efficaces et sans chichis, testées en conditions réelles. Il a développé sa propre gamme de produits d'entretien.",
    specialites: ['Astuces quotidien', 'Organisation', 'Sa gamme de produits'],
    liens: [
      { label: 'lhomme-de-menage.com', url: 'https://www.lhomme-de-menage.com/', type: 'boutique' },
    ],
    partenaire: false,
  },
  {
    id: 'jonathan-coni',
    nom: 'Jonathan Coni',
    pseudo: 'Coni Astuces',
    emoji: '💡',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
    photo: '/images/creators/jonathan-coni.jpg',
    bio: "Le roi de l'astuce maligne : ménage sain, économique et écologique. Son livre « Astuces de génie » compile ses meilleures recettes détaillées.",
    specialites: ['Astuces de génie', 'Écolo & éco', 'Auteur'],
    liens: [
      {
        label: 'Livre « Astuces de génie »',
        url: 'https://www.amazon.fr/dp/2266350005',
        type: 'livre',
      },
    ],
    partenaire: false,
  },
];
