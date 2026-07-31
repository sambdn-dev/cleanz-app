/**
 * Catalogue des tâches ménagères — moteur du Planning du foyer.
 *
 * Chaque tâche porte trois informations qui rendent la répartition équitable :
 *   - `dureeMin`   : le temps moyen réellement passé ;
 *   - `penibilite` : 1 = facile / agréable, 2 = normal, 3 = ingrat ;
 *   - la fréquence : `foisParSemaine` (récurrentes) ou `periodeSemaines` (espacées).
 *
 * ⚖️ CHARGE = dureeMin × penibilite (en points).
 * C'est l'unité d'équité : 10 min de WC (10 × 3 = 30) « pèsent » autant que
 * 30 min de rangement (30 × 1 = 30). Deux personnes qui terminent la semaine
 * avec le même nombre de points ont fourni le même effort — pas juste le même
 * nombre de tâches.
 *
 * `surfaceId` relie la tâche à sa fiche Cleanz (recettes + méthode).
 */

export type Piece =
  | 'Cuisine'
  | 'Salle de bain'
  | 'WC'
  | 'Chambre'
  | 'Salon'
  | 'Linge'
  | 'Commun'
  | 'Extérieur';

export interface Tache {
  id: string;
  nom: string;
  emoji: string;
  piece: Piece;
  /** Durée moyenne en minutes */
  dureeMin: number;
  /** 1 = facile · 2 = normal · 3 = ingrat */
  penibilite: 1 | 2 | 3;
  /** Nombre de fois par semaine (tâches récurrentes) */
  foisParSemaine?: number;
  /** Périodicité en semaines (4 = une fois par mois) */
  periodeSemaines?: number;
  /** Fiche surface Cleanz associée (data/surfaces.ts) */
  surfaceId?: number;
  /** Cochée par défaut à la création du foyer */
  pardefaut?: boolean;
  /** Plutôt le week-end (grosses tâches) */
  weekend?: boolean;
}

/** Charge d'une tâche, en points d'effort. */
export const chargeTache = (t: Tache): number => t.dureeMin * t.penibilite;

/** Libellé lisible de la fréquence. */
export const libelleFrequence = (t: Tache): string => {
  if (t.foisParSemaine) {
    if (t.foisParSemaine >= 7) return 'Tous les jours';
    if (t.foisParSemaine === 1) return '1× / semaine';
    return `${t.foisParSemaine}× / semaine`;
  }
  const p = t.periodeSemaines ?? 1;
  if (p === 2) return 'Tous les 15 jours';
  if (p === 4) return '1× / mois';
  if (p === 8) return 'Tous les 2 mois';
  if (p >= 12) return '1× / trimestre';
  return `Toutes les ${p} semaines`;
};

export const TACHES: Tache[] = [
  /* ---------------------------- QUOTIDIEN ---------------------------- */
  { id: 'vaisselle', nom: 'Vaisselle / lave-vaisselle', emoji: '🍽️', piece: 'Cuisine', dureeMin: 15, penibilite: 2, foisParSemaine: 7, surfaceId: 65, pardefaut: true },
  { id: 'repas', nom: 'Préparer le repas', emoji: '🍳', piece: 'Cuisine', dureeMin: 35, penibilite: 1, foisParSemaine: 7, pardefaut: true },
  { id: 'plan-travail', nom: 'Essuyer le plan de travail', emoji: '🧽', piece: 'Cuisine', dureeMin: 5, penibilite: 1, foisParSemaine: 7, pardefaut: true },
  { id: 'rangement', nom: 'Ranger les pièces de vie', emoji: '🧺', piece: 'Salon', dureeMin: 10, penibilite: 1, foisParSemaine: 7, pardefaut: true },
  { id: 'lit', nom: 'Faire le lit', emoji: '🛏️', piece: 'Chambre', dureeMin: 3, penibilite: 1, foisParSemaine: 7, surfaceId: 20 },
  { id: 'poubelles', nom: 'Sortir les poubelles', emoji: '🗑️', piece: 'Commun', dureeMin: 5, penibilite: 2, foisParSemaine: 3, surfaceId: 9, pardefaut: true },
  { id: 'animaux', nom: 'S\'occuper des animaux', emoji: '🐾', piece: 'Commun', dureeMin: 20, penibilite: 1, foisParSemaine: 7 },

  /* --------------------------- HEBDOMADAIRE -------------------------- */
  { id: 'aspirateur', nom: 'Passer l\'aspirateur', emoji: '🌀', piece: 'Commun', dureeMin: 25, penibilite: 2, foisParSemaine: 2, surfaceId: 74, pardefaut: true },
  { id: 'sols', nom: 'Laver les sols', emoji: '🧹', piece: 'Commun', dureeMin: 25, penibilite: 3, foisParSemaine: 1, surfaceId: 11, pardefaut: true },
  { id: 'sdb', nom: 'Nettoyer la salle de bain', emoji: '🚿', piece: 'Salle de bain', dureeMin: 25, penibilite: 3, foisParSemaine: 1, surfaceId: 14, pardefaut: true },
  { id: 'wc', nom: 'Nettoyer les WC', emoji: '🚽', piece: 'WC', dureeMin: 10, penibilite: 3, foisParSemaine: 2, surfaceId: 17, pardefaut: true },
  { id: 'lessive', nom: 'Lancer et étendre une lessive', emoji: '🫧', piece: 'Linge', dureeMin: 20, penibilite: 2, foisParSemaine: 2, surfaceId: 32, pardefaut: true },
  { id: 'plier-linge', nom: 'Plier et ranger le linge', emoji: '👕', piece: 'Linge', dureeMin: 25, penibilite: 2, foisParSemaine: 2, pardefaut: true },
  { id: 'repassage', nom: 'Repasser', emoji: '👔', piece: 'Linge', dureeMin: 30, penibilite: 3, foisParSemaine: 1, surfaceId: 87 },
  { id: 'draps', nom: 'Changer les draps', emoji: '🛌', piece: 'Chambre', dureeMin: 12, penibilite: 2, foisParSemaine: 1, surfaceId: 20, pardefaut: true },
  { id: 'courses', nom: 'Faire les courses', emoji: '🛒', piece: 'Commun', dureeMin: 60, penibilite: 2, foisParSemaine: 1, pardefaut: true, weekend: true },
  { id: 'cuisine-fond', nom: 'Nettoyer la cuisine à fond', emoji: '✨', piece: 'Cuisine', dureeMin: 30, penibilite: 3, foisParSemaine: 1, surfaceId: 86, pardefaut: true },
  { id: 'evier', nom: 'Détartrer l\'évier', emoji: '🚰', piece: 'Cuisine', dureeMin: 10, penibilite: 2, foisParSemaine: 1, surfaceId: 8 },
  { id: 'poussiere', nom: 'Dépoussiérer les meubles', emoji: '🪶', piece: 'Salon', dureeMin: 18, penibilite: 1, foisParSemaine: 1, surfaceId: 73, pardefaut: true },
  { id: 'frigo-tri', nom: 'Trier le frigo', emoji: '🧊', piece: 'Cuisine', dureeMin: 10, penibilite: 2, foisParSemaine: 1, surfaceId: 3 },
  { id: 'miroirs', nom: 'Nettoyer les miroirs', emoji: '🪞', piece: 'Salle de bain', dureeMin: 10, penibilite: 1, foisParSemaine: 1, surfaceId: 58 },

  /* --------------------- TOUS LES 15 JOURS / MOIS -------------------- */
  { id: 'four', nom: 'Nettoyer le four', emoji: '🔥', piece: 'Cuisine', dureeMin: 45, penibilite: 3, periodeSemaines: 4, surfaceId: 1, pardefaut: true, weekend: true },
  { id: 'micro-ondes', nom: 'Nettoyer le micro-ondes', emoji: '📻', piece: 'Cuisine', dureeMin: 10, penibilite: 1, periodeSemaines: 2, surfaceId: 4, pardefaut: true },
  { id: 'hotte', nom: 'Dégraisser la hotte', emoji: '💨', piece: 'Cuisine', dureeMin: 25, penibilite: 3, periodeSemaines: 4, surfaceId: 71 },
  { id: 'vitres', nom: 'Laver les vitres', emoji: '🪟', piece: 'Commun', dureeMin: 40, penibilite: 3, periodeSemaines: 4, surfaceId: 58, pardefaut: true, weekend: true },
  { id: 'detartrage-douche', nom: 'Détartrer douche et robinetterie', emoji: '💧', piece: 'Salle de bain', dureeMin: 25, penibilite: 3, periodeSemaines: 2, surfaceId: 16, pardefaut: true },
  { id: 'joints', nom: 'Blanchir les joints', emoji: '⬜', piece: 'Salle de bain', dureeMin: 20, penibilite: 3, periodeSemaines: 4, surfaceId: 18 },
  { id: 'sous-meubles', nom: 'Aspirer sous les meubles', emoji: '🛋️', piece: 'Salon', dureeMin: 30, penibilite: 3, periodeSemaines: 4, surfaceId: 27, weekend: true },
  { id: 'plinthes', nom: 'Laver les plinthes', emoji: '📏', piece: 'Commun', dureeMin: 25, penibilite: 3, periodeSemaines: 4 },
  { id: 'lave-linge', nom: 'Entretenir le lave-linge', emoji: '🌀', piece: 'Linge', dureeMin: 15, penibilite: 2, periodeSemaines: 4, surfaceId: 30, pardefaut: true },
  { id: 'lave-vaisselle', nom: 'Nettoyer le filtre du lave-vaisselle', emoji: '🧼', piece: 'Cuisine', dureeMin: 10, penibilite: 3, periodeSemaines: 4, surfaceId: 2 },
  { id: 'poubelle-fond', nom: 'Laver les poubelles', emoji: '♻️', piece: 'Commun', dureeMin: 15, penibilite: 3, periodeSemaines: 4, surfaceId: 9 },
  { id: 'interrupteurs', nom: 'Désinfecter poignées et interrupteurs', emoji: '🔘', piece: 'Commun', dureeMin: 12, penibilite: 1, periodeSemaines: 2, surfaceId: 28 },
  { id: 'papiers', nom: 'Trier les papiers et le courrier', emoji: '📬', piece: 'Commun', dureeMin: 20, penibilite: 2, periodeSemaines: 2 },
  { id: 'cafetiere', nom: 'Détartrer la cafetière', emoji: '☕', piece: 'Cuisine', dureeMin: 15, penibilite: 2, periodeSemaines: 4, surfaceId: 70 },
  { id: 'tapis', nom: 'Nettoyer les tapis', emoji: '🧶', piece: 'Salon', dureeMin: 30, penibilite: 3, periodeSemaines: 8, surfaceId: 25, weekend: true },
  { id: 'canalisations', nom: 'Déboucher et assainir les canalisations', emoji: '🚿', piece: 'Salle de bain', dureeMin: 15, penibilite: 2, periodeSemaines: 8, surfaceId: 61 },

  /* --------------------------- TRIMESTRIEL --------------------------- */
  { id: 'matelas', nom: 'Aspirer et assainir le matelas', emoji: '🛏️', piece: 'Chambre', dureeMin: 25, penibilite: 2, periodeSemaines: 12, surfaceId: 82, weekend: true },
  { id: 'rideaux', nom: 'Laver les rideaux', emoji: '🪟', piece: 'Salon', dureeMin: 30, penibilite: 2, periodeSemaines: 12, surfaceId: 21 },
  { id: 'radiateurs', nom: 'Nettoyer les radiateurs', emoji: '♨️', piece: 'Commun', dureeMin: 25, penibilite: 3, periodeSemaines: 12, surfaceId: 37 },
  { id: 'placards', nom: 'Trier et nettoyer les placards', emoji: '🗄️', piece: 'Commun', dureeMin: 60, penibilite: 2, periodeSemaines: 12, weekend: true },
  { id: 'luminaires', nom: 'Dépoussiérer les luminaires', emoji: '💡', piece: 'Commun', dureeMin: 20, penibilite: 2, periodeSemaines: 12 },
  { id: 'murs', nom: 'Nettoyer les traces sur les murs', emoji: '🖼️', piece: 'Commun', dureeMin: 30, penibilite: 3, periodeSemaines: 12, surfaceId: 90 },

  /* ---------------------------- EXTÉRIEUR ---------------------------- */
  { id: 'terrasse', nom: 'Nettoyer la terrasse', emoji: '🌿', piece: 'Extérieur', dureeMin: 45, penibilite: 3, periodeSemaines: 8, surfaceId: 48, weekend: true },
  { id: 'mobilier-jardin', nom: 'Nettoyer le mobilier de jardin', emoji: '🪑', piece: 'Extérieur', dureeMin: 30, penibilite: 2, periodeSemaines: 12, surfaceId: 78, weekend: true },
  { id: 'voiture', nom: 'Laver la voiture', emoji: '🚗', piece: 'Extérieur', dureeMin: 45, penibilite: 2, periodeSemaines: 4, surfaceId: 38, weekend: true },
  { id: 'plantes', nom: 'Arroser et entretenir les plantes', emoji: '🪴', piece: 'Extérieur', dureeMin: 15, penibilite: 1, foisParSemaine: 2, surfaceId: 79 },
];

export const TACHES_PAR_ID = new Map(TACHES.map((t) => [t.id, t]));

/** Ids des tâches proposées par défaut à la création du foyer. */
export const TACHES_DEFAUT = TACHES.filter((t) => t.pardefaut).map((t) => t.id);

export const PIECES: Piece[] = [
  'Cuisine',
  'Salle de bain',
  'WC',
  'Chambre',
  'Salon',
  'Linge',
  'Commun',
  'Extérieur',
];

export const EMOJI_PIECE: Record<Piece, string> = {
  Cuisine: '🍳',
  'Salle de bain': '🛁',
  WC: '🚽',
  Chambre: '🛏️',
  Salon: '🛋️',
  Linge: '👕',
  Commun: '🏠',
  Extérieur: '🌿',
};
