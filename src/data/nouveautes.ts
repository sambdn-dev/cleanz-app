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
