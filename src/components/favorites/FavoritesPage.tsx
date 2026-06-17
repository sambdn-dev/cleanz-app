'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { useRecipeInteractionsContext } from '@/contexts/RecipeInteractionsContext';
import { useIngredientFavoritesContext } from '@/contexts/IngredientFavoritesContext';
import { RecetteComplete, Spray, IngredientComplet } from '@/types';
import { RECETTES } from '@/data/recettes';
import { INGREDIENTS_COMPLETS } from '@/data/ingredientsComplets';
import { getBlur } from '@/data/imageBlur';
import { Heart, Clock, Star, Sparkles, ListChecks, FlaskConical } from 'lucide-react';
import { MySpraysSection } from './MySpraysSection';
import { IngredientCard } from '@/components/ingredients/IngredientCard';
import { DifficultyBadge } from '@/components/ui/DifficultyBadge';
import { haptic } from '@/utils/haptics';

interface FavoritesPageProps {
  onRecipeClick: (recipe: RecetteComplete) => void;
  onSprayClick: (spray: Spray) => void;
  onIngredientClick: (ingredient: IngredientComplet) => void;
}

export const FavoritesPage = ({ onRecipeClick, onSprayClick, onIngredientClick }: FavoritesPageProps) => {
  const { theme, darkMode } = useTheme();
  const { favorites, toggleFavorite, getRating } = useRecipeInteractionsContext();
  const ingFav = useIngredientFavoritesContext();

  // Récupérer les recettes favorites
  const favoriteRecipes = RECETTES.filter(recipe => favorites.includes(recipe.id));
  // Récupérer les ingrédients favoris
  const favoriteIngredients = INGREDIENTS_COMPLETS.filter(ing => ingFav.isFavorite(ing.id));

  // Rendu des étoiles
  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

  // Carte de recette favorite
  const FavoriteCard = ({ recipe }: { recipe: RecetteComplete }) => {
    const userRating = getRating(recipe.id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      haptic('light');
      toggleFavorite(recipe.id);
    };

    return (
      <div
        onClick={() => { haptic('light'); onRecipeClick(recipe); }}
        className="p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] active:brightness-95 relative"
        style={{
          background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
          border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
          boxShadow: darkMode
            ? '0 4px 15px rgba(0,0,0,0.2)'
            : '0 4px 15px rgba(0,0,0,0.05)'
        }}
      >
        {/* Bouton retirer des favoris */}
        <button
          onClick={handleFavoriteClick}
          aria-label={`Retirer ${recipe.nom} des favoris`}
          className="absolute top-3 right-3 p-1.5 rounded-full transition-all hover:scale-110 active:scale-95"
          style={{ background: 'rgba(236, 72, 153, 0.15)' }}
        >
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
        </button>

        <div className="flex items-start gap-3">
          {/* Vignette photo (ou emoji + dégradé en repli) */}
          {recipe.imageUrl ? (
            <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 relative" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
              <Image
                src={recipe.imageUrl}
                alt={recipe.nom}
                fill
                className="object-cover object-right"
                sizes="56px"
                placeholder={getBlur(recipe.imageUrl) ? 'blur' : 'empty'}
                blurDataURL={getBlur(recipe.imageUrl)}
              />
            </div>
          ) : (
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: recipe.gradient }}
            >
              <span className="text-2xl">{recipe.emoji}</span>
            </div>
          )}

          {/* Contenu */}
          <div className="flex-1 min-w-0 pr-6">
            <h3 className="font-bold text-sm leading-tight" style={{ color: theme.textPrimary }}>
              {recipe.nom}
            </h3>

            {/* Badge */}
            {recipe.badge && (
              <span
                className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: darkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)',
                  color: darkMode ? '#A78BFA' : '#7C3AED'
                }}
              >
                {recipe.badge}
              </span>
            )}

            {/* Infos */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <DifficultyBadge value={recipe.difficulte} />
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" style={{ color: theme.textMuted }} />
                <span className="text-[10px]" style={{ color: theme.textMuted }}>{recipe.temps}</span>
              </div>
              <div className="flex items-center gap-1">
                <ListChecks className="w-3 h-3" style={{ color: theme.textMuted }} />
                <span className="text-[10px]" style={{ color: theme.textMuted }}>{recipe.instructions.length} étapes</span>
              </div>
              {userRating ? (
                <div className="flex items-center gap-1">
                  <span className="text-[10px]" style={{ color: theme.textMuted }}>Ma note:</span>
                  {renderStars(userRating)}
                </div>
              ) : (
                renderStars(recipe.efficacite)
              )}
            </div>

            {/* Ingrédients preview */}
            <div className="flex flex-wrap gap-1 mt-2">
              {recipe.ingredients.slice(0, 3).map((ing, index) => (
                <span
                  key={index}
                  className="text-[9px] px-1.5 py-0.5 rounded-full"
                  style={{
                    background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    color: theme.textMuted
                  }}
                >
                  {ing.nom}
                </span>
              ))}
              {recipe.ingredients.length > 3 && (
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-full"
                  style={{
                    background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    color: theme.textMuted
                  }}
                >
                  +{recipe.ingredients.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-2 pb-4">
      {/* Section Mes Sprays */}
      <MySpraysSection onSprayClick={onSprayClick} onRecipeClick={onRecipeClick} />

      {/* Header Favoris */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
          <h1 className="font-display text-2xl font-extrabold" style={{ color: theme.textPrimary }}>
            Mes Favoris
          </h1>
        </div>
        <p className="text-sm" style={{ color: theme.textMuted }}>
          {favoriteRecipes.length + favoriteIngredients.length > 0
            ? `${favoriteRecipes.length} recette${favoriteRecipes.length > 1 ? 's' : ''} · ${favoriteIngredients.length} ingrédient${favoriteIngredients.length > 1 ? 's' : ''}`
            : 'Aucun favori pour le moment'
          }
        </p>
      </div>

      {/* État vide global */}
      {favoriteRecipes.length === 0 && favoriteIngredients.length === 0 ? (
        <div className="text-center py-16">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{
              background: darkMode
                ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
                : 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)'
            }}
          >
            <Heart className="w-10 h-10 text-pink-400" />
          </div>
          <h3 className="font-bold text-lg mb-2" style={{ color: theme.textPrimary }}>
            Aucun favori
          </h3>
          <p className="text-sm mb-6 max-w-xs mx-auto" style={{ color: theme.textMuted }}>
            Appuie sur le cœur d’une recette ou d’un ingrédient pour le sauvegarder ici et y accéder rapidement.
          </p>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              color: theme.textMuted
            }}
          >
            <Sparkles className="w-4 h-4" />
            Découvre nos recettes
          </div>
        </div>
      ) : (
        <>
          {/* Recettes favorites */}
          {favoriteRecipes.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <h2 className="font-bold text-sm" style={{ color: theme.textPrimary }}>Recettes</h2>
                <span className="text-xs" style={{ color: theme.textMuted }}>{favoriteRecipes.length}</span>
              </div>
              <div className="space-y-3">
                {favoriteRecipes.map((recipe) => (
                  <FavoriteCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          )}

          {/* Ingrédients favoris */}
          {favoriteIngredients.length > 0 && (
            <div className="mb-2">
              <div className="flex items-center gap-2 mb-3">
                <FlaskConical className="w-4 h-4 text-purple-500" />
                <h2 className="font-bold text-sm" style={{ color: theme.textPrimary }}>Ingrédients</h2>
                <span className="text-xs" style={{ color: theme.textMuted }}>{favoriteIngredients.length}</span>
              </div>
              <div className="space-y-3">
                {favoriteIngredients.map((ing) => (
                  <IngredientCard
                    key={ing.id}
                    ingredient={ing}
                    view="list"
                    favorite={ingFav.isFavorite(ing.id)}
                    onClick={() => onIngredientClick(ing)}
                    onToggleFavorite={() => ingFav.toggleFavorite(ing.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Footer stats */}
      {favoriteRecipes.length + favoriteIngredients.length > 0 && (
        <div
          className="mt-8 p-4 rounded-2xl text-center"
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)'
          }}
        >
          <Heart className="w-6 h-6 text-pink-500 mx-auto mb-2" />
          <p className="text-xs font-medium" style={{ color: theme.textPrimary }}>
            {favoriteRecipes.length} recette{favoriteRecipes.length > 1 ? 's' : ''} · {favoriteIngredients.length} ingrédient{favoriteIngredients.length > 1 ? 's' : ''} dans tes favoris
          </p>
          <p className="text-[10px] mt-1" style={{ color: theme.textMuted }}>
            Tes préférences sont sauvegardées localement
          </p>
        </div>
      )}
    </div>
  );
};
