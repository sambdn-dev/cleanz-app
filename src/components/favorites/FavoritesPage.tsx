'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { useRecipeInteractionsContext } from '@/contexts/RecipeInteractionsContext';
import { useIngredientFavoritesContext } from '@/contexts/IngredientFavoritesContext';
import { RecetteComplete, IngredientComplet } from '@/types';
import { getRecipeAccess, getPublishedRecipes } from '@/data/publication';
import { PreuveChip } from '@/components/ui/PreuveChip';
import { INGREDIENTS_COMPLETS } from '@/data/ingredientsComplets';
import { getRecetteImage } from '@/data/scenes';
import { getBlur } from '@/data/imageBlur';
import { Heart, Clock, Star, Sparkles, ListChecks, FlaskConical } from 'lucide-react';
import { MySpraysSection } from './MySpraysSection';
import { IngredientCard } from '@/components/ingredients/IngredientCard';
import { DifficultyBadge } from '@/components/ui/DifficultyBadge';
import { haptic } from '@/utils/haptics';

interface FavoritesPageProps {
  onRecipeClick: (recipe: RecetteComplete) => void;
  onRecipeReference: (reference: { id: number; type: 'spray' | 'recette' }) => void;
  onIngredientClick: (ingredient: IngredientComplet) => void;
  /** Navigation vers l'onglet Recettes (CTA de l'état vide) */
  onExploreRecipes?: () => void;
}

export const FavoritesPage = ({ onRecipeClick, onRecipeReference, onIngredientClick, onExploreRecipes }: FavoritesPageProps) => {
  const { theme, darkMode } = useTheme();
  const { favorites, toggleFavorite, getRating } = useRecipeInteractionsContext();
  const ingFav = useIngredientFavoritesContext();

  // Les IDs des favoris restent inchangés, même après retrait ou fusion.
  // Le namespace 10000+ est réservé aux astuces dans le stockage historique.
  const favoriteRecipes = favorites.filter((id) => id < 10000).map((id) => ({ id, access: getRecipeAccess(id) }));
  const availableFavorites = favoriteRecipes.flatMap(({ id, access }) =>
    access.available ? [{ id, recipe: access.recipe, originalName: access.redirected ? access.requested?.nom : undefined }] : []
  );
  const unavailableFavorites = favoriteRecipes.flatMap(({ id, access }) =>
    access.available ? [] : [{ id, access }]
  );
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
  const FavoriteCard = ({ recipe, favoriteId, originalName }: { recipe: RecetteComplete; favoriteId: number; originalName?: string }) => {
    // Une note donnée à l'ancienne fiche ne valide pas sa remplaçante.
    const userRating = originalName ? null : getRating(favoriteId);
    const [imgError, setImgError] = useState(false);
    // Photo dédiée si elle existe, sinon photo-scène de la catégorie (repli emoji)
    const heroImg = getRecetteImage(recipe, darkMode);

    const handleFavoriteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      haptic('light');
      toggleFavorite(favoriteId);
    };

    return (
      <div
        onClick={() => { haptic('light'); onRecipeReference({ id: favoriteId, type: 'recette' }); }}
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
          {heroImg && !imgError ? (
            <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 relative" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
              <Image
                src={heroImg}
                alt={recipe.nom}
                fill
                className="object-cover object-right"
                sizes="56px"
                placeholder={getBlur(heroImg) ? 'blur' : 'empty'}
                blurDataURL={getBlur(heroImg)}
                onError={() => setImgError(true)}
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
            {originalName && (
              <p className="text-xs mt-1" style={{ color: theme.textMuted }}>
                Le favori « {originalName} » a été fusionné avec cette fiche.
              </p>
            )}

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
                <PreuveChip id={recipe.id} compact />
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
      <MySpraysSection onRecipeReference={onRecipeReference} />

      {/* Header Favoris */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
          <h1 className="font-display text-2xl font-extrabold" style={{ color: theme.textPrimary }}>
            Mes Favoris
          </h1>
        </div>
        {favoriteRecipes.length + favoriteIngredients.length > 0 && (
          <p className="text-sm" style={{ color: theme.textMuted }}>
            {favoriteRecipes.length} recette{favoriteRecipes.length > 1 ? 's' : ''} · {favoriteIngredients.length} ingrédient{favoriteIngredients.length > 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* État vide global */}
      {favoriteRecipes.length === 0 && favoriteIngredients.length === 0 ? (
        <div className="py-6">
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce-gentle"
              style={{
                background: darkMode
                  ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
                  : 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)'
              }}
            >
              <Heart className="w-10 h-10 text-pink-400" />
            </div>
            <h3 className="font-bold text-lg mb-2" style={{ color: theme.textPrimary }}>
              Aucun favori pour le moment
            </h3>
            <p className="text-sm mb-5 max-w-xs mx-auto" style={{ color: theme.textMuted }}>
              Appuie sur le <Heart className="w-3.5 h-3.5 inline text-pink-400 fill-pink-400 -mt-0.5" /> d&apos;une
              recette ou d&apos;un ingrédient pour le retrouver ici.
            </p>
            <button
              onClick={() => { haptic('light'); onExploreRecipes?.(); }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white transition-all active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #FF69B4 0%, #8B5CF6 100%)',
                boxShadow: '0 8px 22px rgba(139,92,246,0.35)',
              }}
            >
              <Sparkles className="w-4 h-4" />
              Découvrir les recettes
            </button>
          </div>

          {/* Suggestions pour démarrer */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest mb-2.5" style={{ color: theme.textMuted }}>
              Nos coups de cœur pour démarrer
            </p>
            <div className="space-y-2.5">
              {getPublishedRecipes().filter((r) => r.categorie === 'Indispensable').slice(0, 3).map((r) => (
                <button
                  key={r.id}
                  onClick={() => { haptic('light'); onRecipeClick(r); }}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all active:scale-[0.99]"
                  style={{
                    background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
                    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: r.gradient }}
                  >
                    <span className="text-xl" aria-hidden>{r.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: theme.textPrimary }}>{r.nom}</p>
                    <p className="text-[11px]" style={{ color: theme.textMuted }}>
                      {r.temps} · {r.difficulte} · {r.ingredients.length} ingrédients
                    </p>
                  </div>
                  <Heart className="w-4 h-4 flex-shrink-0" style={{ color: theme.textMuted }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Recettes favorites */}
          {availableFavorites.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <h2 className="font-bold text-sm" style={{ color: theme.textPrimary }}>Recettes disponibles</h2>
                <span className="text-xs" style={{ color: theme.textMuted }}>{availableFavorites.length}</span>
              </div>
              <div className="space-y-3">
                {availableFavorites.map(({ id, recipe, originalName }) => (
                  <FavoriteCard key={id} recipe={recipe} favoriteId={id} originalName={originalName} />
                ))}
              </div>
            </div>
          )}

          {unavailableFavorites.length > 0 && (
            <section className="mb-6" aria-label="Favoris indisponibles">
              <h2 className="font-bold text-sm mb-2" style={{ color: theme.textPrimary }}>
                Favoris indisponibles · {unavailableFavorites.length}
              </h2>
              <p className="text-xs mb-3" style={{ color: theme.textMuted }}>
                Vos favoris sont conservés. Leurs anciennes instructions ne sont plus proposées.
              </p>
              <div className="space-y-3">
                {unavailableFavorites.map(({ id, access }) => (
                  <div key={id} className="p-4 rounded-2xl" style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)', border: `1px solid ${theme.borderLight}` }}>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-sm" style={{ color: theme.textPrimary }}>
                        {access.requested?.emoji ?? '📄'} {access.requested?.nom ?? `Recette #${id}`}
                      </h3>
                      <button
                        onClick={() => toggleFavorite(id)}
                        aria-label={`Retirer ${access.requested?.nom ?? `la recette #${id}`} des favoris`}
                        className="p-1.5 rounded-full"
                      >
                        <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                      </button>
                    </div>
                    {access.requested && <PreuveChip id={id} compact />}
                    <p className="text-xs mt-2" style={{ color: theme.textSecondary }}>{access.message}</p>
                    <button
                      onClick={() => onRecipeReference({ id, type: 'recette' })}
                      className="text-xs font-semibold mt-3 underline underline-offset-2"
                      style={{ color: theme.textPrimary }}
                    >
                      Consulter le statut
                    </button>
                  </div>
                ))}
              </div>
            </section>
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
