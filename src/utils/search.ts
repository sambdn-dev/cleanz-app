import { SURFACES } from '@/data/surfaces';
import { RECETTES, RECETTES_PAR_SURFACE } from '@/data/recettes';
import { INGREDIENTS_COMPLETS } from '@/data/ingredientsComplets';
import { SURFACE_ALIASES } from '@/data/searchAliases';
import { Surface, RecetteComplete, IngredientComplet } from '@/types';

/** minuscules + suppression des accents */
export const normalize = (s: string): string =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

/** Score 0–100 du meilleur match d'une requête contre une liste de chaînes candidates. */
const scoreHaystack = (q: string, haystacks: string[]): number => {
  let best = 0;
  for (const h of haystacks) {
    const n = normalize(h);
    if (!n) continue;
    if (n === q) return 100;                 // match exact : score max immédiat
    if (n.startsWith(q)) { best = Math.max(best, 85); continue; }
    if (n.split(/[\s\-&/]+/).some((w) => w.startsWith(q))) { best = Math.max(best, 65); continue; }
    if (n.includes(q)) { best = Math.max(best, 45); continue; }
  }
  return best;
};

const RECIPE_BY_ID = new Map(RECETTES.map((r) => [r.id, r]));

export interface SurfaceResult { surface: Surface; score: number; recipeCount: number; }
export interface RecipeResult { recipe: RecetteComplete; score: number; }
export interface IngredientResult { ingredient: IngredientComplet; score: number; }
export interface SearchResults {
  surfaces: SurfaceResult[];
  recipes: RecipeResult[];
  ingredients: IngredientResult[];
  total: number;
}

const MIN_LEN = 2;
const EMPTY: SearchResults = { surfaces: [], recipes: [], ingredients: [], total: 0 };

export const searchAll = (raw: string): SearchResults => {
  const q = normalize(raw);
  if (q.length < MIN_LEN) return EMPTY;

  const surfaceResults: SurfaceResult[] = [];
  const recipeScore = new Map<number, number>();

  // 1) Surfaces (nom + pièce + alias) — propage le score à leurs recettes
  for (const surface of SURFACES) {
    const aliases = SURFACE_ALIASES[surface.id] || [];
    const score = scoreHaystack(q, [surface.nom, surface.piece, ...aliases]);
    if (score > 0) {
      const recipeIds = RECETTES_PAR_SURFACE[surface.id] || [];
      surfaceResults.push({ surface, score, recipeCount: recipeIds.length });
      for (const id of recipeIds) {
        recipeScore.set(id, Math.max(recipeScore.get(id) || 0, score - 10));
      }
    }
  }

  // 2) Recettes en direct (nom + catégorie + badge + surfaces compatibles)
  for (const r of RECETTES) {
    const score = scoreHaystack(q, [r.nom, r.categorie, r.badge || '', ...r.surfaces]);
    if (score > 0) recipeScore.set(r.id, Math.max(recipeScore.get(r.id) || 0, score));
  }

  const recipeResults: RecipeResult[] = [];
  for (const [id, score] of recipeScore) {
    const recipe = RECIPE_BY_ID.get(id);
    if (recipe) recipeResults.push({ recipe, score });
  }

  // 3) Ingrédients (nom + fonctions)
  const ingredientResults: IngredientResult[] = [];
  for (const ing of INGREDIENTS_COMPLETS) {
    const score = scoreHaystack(q, [ing.nom, ...(ing.fonctions || [])]);
    if (score > 0) ingredientResults.push({ ingredient: ing, score });
  }

  surfaceResults.sort((a, b) => b.score - a.score || a.surface.nom.localeCompare(b.surface.nom));
  recipeResults.sort((a, b) => b.score - a.score || a.recipe.nom.localeCompare(b.recipe.nom));
  ingredientResults.sort((a, b) => b.score - a.score || a.ingredient.nom.localeCompare(b.ingredient.nom));

  const surfaces = surfaceResults.slice(0, 8);
  const recipes = recipeResults.slice(0, 8);
  const ingredients = ingredientResults.slice(0, 6);
  return { surfaces, recipes, ingredients, total: surfaces.length + recipes.length + ingredients.length };
};

/** Découpe un libellé en segments [normal, match, normal] pour surligner la partie trouvée. */
export const splitHighlight = (label: string, raw: string): { text: string; hit: boolean }[] => {
  const q = normalize(raw);
  if (!q) return [{ text: label, hit: false }];
  const nLabel = normalize(label);
  const idx = nLabel.indexOf(q);
  if (idx < 0) return [{ text: label, hit: false }];
  // Les longueurs sont préservées par normalize (NFD enlève des diacritiques mais on
  // reste sur des index 1:1 pour l'usage courant FR) → fallback sûr si décalage.
  if (nLabel.length !== label.length) {
    return [{ text: label, hit: false }];
  }
  return [
    { text: label.slice(0, idx), hit: false },
    { text: label.slice(idx, idx + q.length), hit: true },
    { text: label.slice(idx + q.length), hit: false },
  ].filter((s) => s.text.length > 0);
};
