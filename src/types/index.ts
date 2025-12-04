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
