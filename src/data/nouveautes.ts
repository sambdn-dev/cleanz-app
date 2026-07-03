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
    id: 22,
    date: '2026-07-03',
    emoji: '🧭',
    title: 'Accueil allégé, lecture facilitée',
    description: 'Grâce à vos retours : les guides Saison, Piscine & Spa et Detailing Auto sont maintenant 3 cartes à faire glisser (le détail s\'ouvre en plein écran), les textes sont plus grands, et « Le saviez-vous ? » fait peau neuve.',
  },
  {
    id: 21,
    date: '2026-07-02',
    emoji: '🚗',
    title: 'Detailing Auto',
    description: 'Lave ta voiture comme un pro : les bons gestes au nettoyeur haute pression (distance, zones interdites), le canon à mousse, la méthode des 2 seaux et le nettoyage des interstices au pinceau. + 3 nouvelles recettes auto (cuir, plastiques, interstices).',
    steps: [
      'Sur l\'accueil, descends jusqu\'à « Detailing Auto »',
      'Trois onglets : Haute pression, Mousse, Interstices',
      'Les recettes auto sont aussi dans les fiches surfaces Véhicule',
    ],
  },
  {
    id: 20,
    date: '2026-07-02',
    emoji: '🐜',
    title: 'SOS Nuisibles',
    description: 'Fourmis, moucherons, mites, souris, moustiques : une nouvelle carte « Nuisibles » regroupe 6 solutions naturelles, sans insecticide chimique. Cherche « fourmis » ou « moucherons » dans la recherche !',
  },
  {
    id: 19,
    date: '2026-07-02',
    emoji: '🏊',
    title: 'Piscine & Spa',
    description: 'Nouvelle section complète sur l\'accueil : équilibre de l\'eau, filtration, ligne d\'eau à la pierre d\'argile, entretien du spa, et les solutions SOS (eau verte, eau trouble…).',
    steps: [
      'Sur l\'accueil, descends jusqu\'à l\'encart « Piscine & Spa »',
      'Trois onglets : Piscine, Spa et SOS',
      'Touche un conseil pour voir le détail',
    ],
  },
  {
    id: 18,
    date: '2026-07-02',
    emoji: '💨',
    title: 'La vapeur suffit !',
    description: 'Sur 12 surfaces (four, WC, joints, matelas, canapé…), le nettoyage vapeur seul désinfecte sans aucun produit. Repère le badge « vapeur » sur les surfaces et l\'encart dédié dans leur fiche.',
  },
  {
    id: 17,
    date: '2026-07-02',
    emoji: '⭐',
    title: 'Les stars du clean',
    description: 'Begin Clean, L\'Homme de Ménage, Jonathan Coni… Retrouve nos créateurs ménage préférés sur l\'accueil, avec leurs boutiques et leur livre. Sélection 100% indépendante.',
  },
  {
    id: 16,
    date: '2026-06-21',
    emoji: '🎉',
    title: 'Cleanz 2.0',
    description: 'Une vraie refonte : accueil plus visuel, modales qui prennent les couleurs de leurs photos, surfaces simplifiées, appareils illustrés, et des conseils qui s\'adaptent à la saison.',
  },
  {
    id: 15,
    date: '2026-06-21',
    emoji: '🍂',
    title: 'Des conseils pour chaque saison',
    description: 'La section spéciale saison affiche automatiquement les bons conseils du moment (été, automne, hiver, printemps). Tu peux aussi parcourir les autres saisons quand tu veux.',
    steps: [
      'Sur l\'accueil, repère l\'encart « Spécial saison »',
      'La saison en cours est sélectionnée automatiquement',
      'Touche une autre saison pour voir ses astuces',
    ],
  },
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
