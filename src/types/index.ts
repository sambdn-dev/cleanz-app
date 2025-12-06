export interface Category {
  id: number;
  nom: string;
  emoji: string;
  couleur: string;
  count: number;
}

export interface Surface {
  id: number;
  nom: string;
  emoji: string;
  piece: string;
  categorie: string;
  frequence: string;
}

export interface Ingredient {
  id: number;
  nom: string;
  emoji: string;
  fonctions: string[];
  essentiel: boolean;
  prix: string;
  description: string;
}

export interface IngredientComplet {
  id: number;
  nom: string;
  emoji: string;
  gradient: string;
  badge?: string;
  fonctions: string[];
  description: string;
  bienfaits: string[];
  utilisations: string[];
  surfaces: string[];
  recettesIds: number[]; // IDs des recettes associées
  prix: string;
  prixMoyen: string; // Ex: "~2€/kg"
  scoreEcologique: number; // 1 à 5
  conservation: string;
  precautions: string[];
  origineNaturelle: string;
  essentiel: boolean;
}

export interface SprayIngredient {
  nom: string;
  quantite: string;
}

export interface Spray {
  id: number;
  nom: string;
  emoji: string;
  badge: string;
  gradient: string;
  ingredients: SprayIngredient[];
  instructions: string;
  surfaces: string[];
  precautions: string[];
  astuces: string[];
  conservation: string;
}

export interface ElectromenagerNettoyage {
  titre: string;
  ingredients: string[];
  instructions: string;
  duree: string;
  frequence: string;
}

export interface ElectromenagerEntretien {
  calendrier: { periode: string; taches: string[] }[];
  economies: string;
  alertes: string[];
}

export interface Electromenager {
  id: number;
  nom: string;
  emoji: string;
  conso: string;
  consoPct: number; // Pourcentage de la consommation électrique du foyer
  piece: string;
  color: string;
  nettoyer: ElectromenagerNettoyage;
  entretien: ElectromenagerEntretien;
}

export interface Astuce {
  id: number;
  titre: string;
  emoji: string;
  duree: string;
  note: number;
  ingredients: string[];
  resume: string;
  instructions: string;
  conseil: string;
  surface: string;
  gradient: string;
}

export interface Recette {
  nom: string;
  ingredients: string[];
  instructions: string;
  temps: string;
  efficacite: string;
}

export interface RecetteIngredient {
  nom: string;
  quantite: string;
  emoji?: string;
}

export interface RecetteComplete {
  id: number;
  nom: string;
  emoji: string;
  categorie: 'Indispensable' | 'Salle de bain' | 'Cuisine' | 'Linge' | 'Multi-usage' | 'Sol' | 'Entretien';
  badge?: string;
  gradient: string;
  temps: string;
  difficulte: 'Facile' | 'Moyen' | 'Avancé';
  efficacite: number; // 1 à 5
  ingredients: RecetteIngredient[];
  materiel?: string[];
  instructions: string[];
  surfaces: string[];
  precautions: string[];
  astuces: string[];
  conservation: string;
}

export interface Theme {
  bgPrimary: string;
  bgCard: string;
  bgCardSolid: string;
  bgInput: string;
  bgNav: string;
  bgModal: string;
  bgHover: string;
  bgSection: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderLight: string;
  borderCard: string;
  accentPink: string;
  accentCyan: string;
  shadowCard: string;
}
