/**
 * Journal des nouveautés de l'app (changelog visible par l'utilisateur).
 *
 * 👉 À CHAQUE NOUVELLE FEATURE : ajoutez une entrée avec un `id` incrémenté.
 * Les utilisateurs verront automatiquement, au lancement, les nouveautés
 * qu'ils n'ont pas encore vues (suivi via localStorage).
 */

export interface Nouveaute {
  id: number;
  date: string;
  emoji: string;
  title: string;
  description: string;
  steps?: string[]; // Mini-tuto optionnel
}

export const NOUVEAUTES: Nouveaute[] = [
  {
    id: 14,
    date: '2026-06-21',
    emoji: '📸',
    title: 'Des photos pour tout',
    description: 'Chaque recette ET chaque surface a désormais sa photo cosy — fini les emojis tout seuls, l\'app est bien plus visuelle.',
  },
  {
    id: 13,
    date: '2026-06-21',
    emoji: '🛒',
    title: 'Ma liste de courses',
    description: 'Prépare tes courses en un geste : ajoute des articles à la main ou importe les ingrédients de tes recettes favorites, et coche-les en magasin.',
    steps: [
      'Menu (en haut à droite) → « Ma liste de courses »',
      'Touche « Ajouter les ingrédients de mes recettes favorites »',
      'Coche les articles au fur et à mesure',
    ],
  },
  {
    id: 12,
    date: '2026-06-21',
    emoji: '📱',
    title: 'Mon compte & Mes appareils',
    description: 'Deux nouvelles pages dans le menu : un espace « Mon compte » avec tes stats, et « Mes appareils » pour suivre l\'entretien de ton électroménager.',
  },
  {
    id: 11,
    date: '2026-06-21',
    emoji: '🔗',
    title: 'Partage repensé',
    description: 'Quand tu partages une recette, le message est prérempli (ingrédients, durée…) et le lien affiche un bel aperçu.',
  },
  {
    id: 10,
    date: '2026-06-21',
    emoji: '🔍',
    title: 'Recherche intelligente',
    description: 'Trouvez tout en un instant ! La recherche comprend les synonymes et l\'anglais, et propose surfaces, recettes et ingrédients dans un menu déroulant.',
    steps: [
      'Tapez « WC », « frigo » ou « baskets »',
      'Les résultats apparaissent juste sous la barre',
      'Touchez un résultat pour ouvrir sa fiche',
    ],
  },
  {
    id: 9,
    date: '2026-06-21',
    emoji: '🧪',
    title: '+30 nouvelles recettes',
    description: '130 recettes au total ! Chaque surface de la maison a désormais au moins une recette naturelle dédiée.',
  },
  {
    id: 8,
    date: '2026-06-21',
    emoji: '☀️',
    title: 'L\'été avec Cleanz',
    description: 'Un encart saisonnier avec nos meilleures astuces de ménage d\'été et un guide complet anti-canicule (courants d\'air, hydratation, fraîcheur…).',
  },
  {
    id: 7,
    date: '2026-06-21',
    emoji: '🖼️',
    title: 'Écran de chargement cosy',
    description: 'Un nouvel écran d\'accueil chaleureux, en version claire et sombre, avec une apparition tout en douceur.',
  },
  {
    id: 6,
    date: '2026-06-21',
    emoji: '🔤',
    title: 'Typographie unifiée',
    description: 'Une police cohérente et lisible sur toute l\'application pour une expérience plus soignée.',
  },
  {
    id: 5,
    date: '2026-06-16',
    emoji: '📸',
    title: 'Photos des recettes',
    description: 'Les sprays et recettes s\'habillent de photos réalistes pour une expérience plus immersive.',
  },
  {
    id: 4,
    date: '2026-06-14',
    emoji: '🏷️',
    title: 'Mes Sprays + QR codes',
    description: 'Numérotez vos flacons maison et ne les confondez plus jamais !',
    steps: [
      'Onglet Favoris → section « Mes Sprays »',
      'Appuyez sur « Ajouter » et choisissez la recette',
      'Imprimez le QR code et collez-le sur le flacon',
      "Scannez-le plus tard pour retrouver la recette",
    ],
  },
  {
    id: 3,
    date: '2026-06-14',
    emoji: '🧴',
    title: 'Les Indispensables en flacon',
    description: 'Chaque recette de spray est illustrée par un flacon montrant les proportions de chaque ingrédient.',
    steps: [
      'Glissez la carte pour parcourir les recettes',
      'Touchez-la pour voir la recette complète',
    ],
  },
  {
    id: 2,
    date: '2026-06-14',
    emoji: '✨',
    title: 'Accueil épuré',
    description: 'Une page d\'accueil plus claire, un écran de lancement animé et une navigation repensée.',
  },
  {
    id: 1,
    date: '2026-06-14',
    emoji: '🧭',
    title: 'Nouveau menu flottant',
    description: 'La barre de menu est désormais une pilule flottante qui affiche les titres et se réduit au défilement.',
  },
];
