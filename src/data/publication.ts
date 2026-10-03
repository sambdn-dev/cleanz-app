import { RECETTES } from '@/data/recettes';
import {
  getStatutRecette, resoudreRecetteId, SUSPENSIONS_RECETTES,
  type StatutRecette,
} from '@/data/revue';
import type { RecetteComplete } from '@/types';
import type { FicheType } from '@/utils/sprayUtils';

export { PUBLICATION_VERSION } from '@/data/publication-version';

/** Les identifiants des six anciens QR spray sont stables, jamais réindexés. */
export const SPRAY_RECIPE_IDS: Readonly<Record<number, number>> = {
  1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6,
};

export type RecipeSummary = Pick<RecetteComplete,
  'id' | 'nom' | 'emoji' | 'gradient' | 'imageUrl' | 'imageUrlDark'>;

export type RecipeAccess = {
  available: true;
  status: 'publiee';
  requested: RecipeSummary;
  recipe: RecetteComplete;
  redirected: boolean;
} | {
  available: false;
  status: StatutRecette | 'introuvable';
  requested: RecipeSummary | null;
  message: string;
  canonicalId: number | null;
};

const sourceId = (id: number, type: FicheType): number | undefined => {
  if (!Number.isSafeInteger(id) || id <= 0) return undefined;
  return type === 'spray' ? SPRAY_RECIPE_IDS[id] : type === 'recette' ? id : undefined;
};

/** Métadonnées seulement : les anciennes formules ne sortent pas de cette API. */
export const getRecipeSummary = (id: number, type: FicheType = 'recette'): RecipeSummary | null => {
  const recipe = RECETTES.find((r) => r.id === sourceId(id, type));
  if (!recipe) return null;
  const { nom, emoji, gradient, imageUrl, imageUrlDark } = recipe;
  return { id: recipe.id, nom, emoji, gradient, imageUrl, imageUrlDark };
};

/**
 * Point d'accès aux instructions, y compris depuis favoris et anciens QR.
 * Aucune formule fournie par un appelant et aucun repli sur la source fusionnée.
 * Le registre autorise la diffusion documentaire, pas une validation d'efficacité.
 */
export const getRecipeAccess = (id: number, type: FicheType = 'recette'): RecipeAccess => {
  const requested = getRecipeSummary(id, type);
  if (!requested) {
    return {
      available: false, status: 'introuvable', requested: null, canonicalId: null,
      message: 'Cette fiche est introuvable dans la version actuelle. Les données de vos flacons restent conservées, mais aucune préparation ne peut être proposée depuis ce lien.',
    };
  }

  const status = getStatutRecette(requested.id);
  const canonicalId = resoudreRecetteId(requested.id);
  const recipe = canonicalId === null ? undefined : RECETTES.find((r) => r.id === canonicalId);
  if (recipe && getStatutRecette(recipe.id) === 'publiee') {
    return { available: true, status: 'publiee', requested, recipe, redirected: recipe.id !== requested.id };
  }

  const messages: Record<StatutRecette, string> = {
    publiee: 'La fiche de référence est introuvable. La préparation est indisponible.',
    en_attente: 'Cette méthode est en cours de revue. Ses ingrédients, dosages et instructions ne sont plus proposés pour préparer ou utiliser un mélange.',
    suspendue: `${SUSPENSIONS_RECETTES[requested.id] ?? 'Cette méthode nécessite une nouvelle revue.'} Sa préparation et ses recommandations sont suspendues.`,
    retiree: 'Cette méthode a été retirée du catalogue. Ses ingrédients, dosages et instructions ne sont plus proposés.',
    fusionnee: 'Cette ancienne fiche a été fusionnée, mais sa destination ne dispose pas actuellement d’une méthode publiée accessible. Les anciennes instructions ne sont pas proposées en remplacement.',
  };
  return { available: false, status, requested, canonicalId, message: messages[status] };
};

/** Sélections et associations : destinations admissibles uniquement, sans doublon. */
export const getPublishedRecipes = (ids?: readonly number[]): RecetteComplete[] => {
  const references = ids ?? RECETTES.filter((r) => getStatutRecette(r.id) === 'publiee').map((r) => r.id);
  const results = new Map<number, RecetteComplete>();
  for (const id of references) {
    const access = getRecipeAccess(id);
    if (access.available) results.set(access.recipe.id, access.recipe);
  }
  return [...results.values()];
};
