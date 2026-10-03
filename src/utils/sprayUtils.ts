/**
 * Utilitaires pour la feature "Mes Sprays"
 * Fonctions pures, testables indépendamment de React.
 */

/**
 * @deprecated Free text is not validated shelf-life data. Kept for compatibility;
 * no wording or numeric duration is sufficient to calculate an expiry date.
 */
export const parseConservationToDays = (conservation: string): null => {
  void conservation;
  return null;
};

/** Old estimates remain stored but never become a guarantee or a countdown. */
export const getHistoricalExpiryLabel = (expiresAt: string | null): string => {
  if (expiresAt === null) return 'Durée de conservation non validée';
  const date = new Date(expiresAt);
  const displayed = Number.isNaN(date.getTime()) ? 'date non reconnue' : date.toLocaleDateString('fr-FR');
  return `Ancienne estimation non validée : ${displayed}`;
};

/** Bottle names are user input; never interpolate them as markup in labels. */
export const escapeLabelHtml = (value: string): string => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]!);

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
