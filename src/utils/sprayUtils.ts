/**
 * Utilitaires pour la feature "Mes Sprays"
 * Fonctions pures, testables indépendamment de React.
 */

/**
 * Convertit une durée de conservation en nombre de jours.
 * Ex: "3 mois" -> 90, "6 semaines" -> 42, "1 an" -> 365
 */
export const parseConservationToDays = (conservation: string): number => {
  const lower = conservation.toLowerCase();
  const num = parseInt(lower) || 1;
  if (lower.includes('semaine')) return num * 7;
  if (lower.includes('mois')) return num * 30;
  if (lower.includes('an')) return num * 365;
  if (lower.includes('jour')) return num;
  // "Préparer à chaque usage" / "immédiat" => usage unique
  if (lower.includes('usage') || lower.includes('immédiat') || lower.includes('chaque')) return 1;
  return 90; // Défaut : 3 mois
};

export type FicheType = 'spray' | 'recette';

export interface ParsedFiche {
  type: FicheType;
  id: number;
}

/**
 * Parse le paramètre d'URL `fiche` encodé dans le QR code.
 * Format: "spray-3" ou "recette-12"
 */
export const parseFicheParam = (fiche: string | null | undefined): ParsedFiche | null => {
  if (!fiche) return null;
  const match = fiche.match(/^(spray|recette)-(\d+)$/);
  if (!match) return null;
  return { type: match[1] as FicheType, id: parseInt(match[2], 10) };
};

/**
 * Construit l'URL encodée dans le QR code d'un flacon.
 */
export const buildFicheUrl = (origin: string, type: FicheType, recipeId: number): string => {
  return `${origin}/?fiche=${type}-${recipeId}`;
};

/**
 * Nombre de jours restants avant péremption (peut être négatif si périmé).
 */
export const getDaysUntilExpiry = (expiresAt: string, now: Date = new Date()): number => {
  const expires = new Date(expiresAt);
  return Math.ceil((expires.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};
