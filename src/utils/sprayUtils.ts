/**
 * Utilitaires pour la feature "Mes Sprays"
 * Fonctions pures, testables indépendamment de React.
 */

/**
 * Convertit une durée de conservation en nombre de jours, ou `null` quand
 * aucune date ne peut être calculée honnêtement :
 *  - méthode immédiate / sans préparation (« à chaque usage », « aussitôt »…) ;
 *  - texte libre sans durée explicite.
 * Ex: "3 mois" -> 90, "6 semaines" -> 42, "1 an" -> 365, "Usage immédiat" -> null.
 *
 * Revue éditoriale : une date de péremption ne doit jamais être inventée depuis
 * du texte libre (l'ancien défaut de 90 jours a été retiré).
 */
export const parseConservationToDays = (conservation: string): number | null => {
  const lower = conservation.toLowerCase();
  if (/usage|imm[ée]diat|aussit[ôo]t|chaque|sans pr[ée]paration|ne se conserve pas|ne pas conserver/.test(lower)) return null;
  const m = lower.match(/(\d+)\s*(jour|semaine|mois|an)/);
  if (!m) return null;
  const num = parseInt(m[1], 10);
  const unite = m[2];
  if (unite === 'jour') return num;
  if (unite === 'semaine') return num * 7;
  if (unite === 'mois') return num * 30;
  return num * 365;
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
