'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { useRecipeInteractionsContext } from '@/contexts/RecipeInteractionsContext';
import { RecetteComplete, Surface, IngredientComplet } from '@/types';
import { RECETTES } from '@/data/recettes';
import { getBlur } from '@/data/imageBlur';
import { Clock, Star, Sparkles, Heart, ListChecks } from 'lucide-react';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { EmptyState } from '@/components/ui/EmptyState';
import { DifficultyBadge } from '@/components/ui/DifficultyBadge';
import { HeartBurst } from '@/components/ui/HeartBurst';
import { SmartSearch } from '@/components/layout/SmartSearch';
import { haptic } from '@/utils/haptics';

interface RecipesPageProps {
  onRecipeClick: (recipe: RecetteComplete) => void;
  onSurfaceClick: (surface: Surface) => void;
  onIngredientClick: (ingredient: IngredientComplet) => void;
}

export const RecipesPage = ({ onRecipeClick, onSurfaceClick, onIngredientClick }: RecipesPageProps) => {
  const { theme, darkMode } = useTheme();
  const { isFavorite, toggleFavorite, getRating } = useRecipeInteractionsContext();
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrage des recettes par recherche texte
  const filteredRecipes = searchQuery
    ? RECETTES.filter(r => {
        const query = searchQuery.toLowerCase();
        return r.nom.toLowerCase().includes(query) ||
          r.ingredients.some(ing => ing.nom.toLowerCase().includes(query)) ||
          r.surfaces.some(s => s.toLowerCase().includes(query));
      })
    : RECETTES;

  // Séparer les indispensables du reste
  const indispensables = filteredRecipes.filter(r => r.categorie === 'Indispensable');
  const autresRecettes = filteredRecipes.filter(r => r.categorie !== 'Indispensable');

  // Rendu des étoiles d'efficacité
  const renderEfficacite = (note: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${star <= note ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  // Carte de recette
  const RecipeCard = ({ recipe }: { recipe: RecetteComplete }) => {
    const favorite = isFavorite(recipe.id);
    const userRating = getRating(recipe.id);
    const [burst, setBurst] = useState(0);
    // Photo cosy en mode sombre (repli sur la photo claire)
    const heroImg = (darkMode && recipe.imageUrlDark) ? recipe.imageUrlDark : recipe.imageUrl;

    const handleFavoriteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!favorite) setBurst((b) => b + 1);
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
        {/* Bouton favori */}
        <button
          onClick={handleFavoriteClick}
          aria-label={favorite ? `Retirer ${recipe.nom} des favoris` : `Ajouter ${recipe.nom} aux favoris`}
          aria-pressed={favorite}
          className="absolute top-3 right-3 p-1.5 rounded-full transition-all hover:scale-110 active:scale-95"
          style={{
            background: favorite
              ? 'rgba(236, 72, 153, 0.15)'
              : darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
          }}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${favorite ? 'text-pink-500 fill-pink-500' : ''}`}
            style={{ color: favorite ? '#EC4899' : theme.textMuted }}
          />
          <HeartBurst trigger={burst} />
        </button>

        <div className="flex items-start gap-3">
          {/* Vignette photo (ou emoji par défaut) */}
          {heroImg ? (
            <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 relative" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
              <Image
                src={heroImg}
                alt={recipe.nom}
                fill
                className="object-cover object-right"
                sizes="56px"
                placeholder={getBlur(heroImg) ? 'blur' : 'empty'}
                blurDataURL={getBlur(heroImg)}
              />
            </div>
          ) : (
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
              <span className="text-4xl">{recipe.emoji}</span>
            </div>
          )}

          {/* Contenu */}
          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-sm leading-tight" style={{ color: theme.textPrimary }}>
                {recipe.nom}
              </h3>
            </div>

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
            {renderEfficacite(recipe.efficacite)}
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
      {/* Recherche intelligente */}
      <div className="relative z-[60] mb-4">
        <SmartSearch
          value={searchQuery}
          onChange={setSearchQuery}
          onSelectSurface={onSurfaceClick}
          onSelectRecipe={onRecipeClick}
          onSelectIngredient={onIngredientClick}
          placeholder="Rechercher une recette, surface, ingrédient..."
        />
      </div>

      {/* Résultats */}
      {filteredRecipes.length === 0 ? (
        <EmptyState
          title="Aucune recette trouvée"
          message="Essayez avec d'autres mots-clés"
          emoji="📋"
          searchQuery={searchQuery}
        />
      ) : (
        <>
          {/* Section Les Indispensables */}
          {indispensables.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <h2 className="font-display font-bold text-[17px]" style={{ color: theme.textPrimary }}>
                  Les Indispensables
                </h2>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: darkMode ? 'rgba(251, 191, 36, 0.2)' : 'rgba(251, 191, 36, 0.15)',
                    color: darkMode ? '#FCD34D' : '#D97706'
                  }}
                >
                  Kit de base
                </span>
              </div>
              <div className="space-y-3">
                {indispensables.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          )}

          {/* Autres recettes */}
          {autresRecettes.length > 0 && (
            <div>
              {indispensables.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base">🧪</span>
                  <h2 className="font-display font-bold text-[17px]" style={{ color: theme.textPrimary }}>
                    Toutes les recettes
                  </h2>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: darkMode ? 'rgba(79, 209, 197, 0.2)' : 'rgba(79, 209, 197, 0.15)',
                      color: darkMode ? '#5EEAD4' : '#14B8A6'
                    }}
                  >
                    {autresRecettes.length} recettes
                  </span>
                </div>
              )}
              <div className="space-y-3">
                {autresRecettes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Footer info */}
      <div
        className="mt-8 p-4 rounded-2xl text-center"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%)'
        }}
      >
        <span className="text-2xl block mb-2">🌿</span>
        <p className="text-xs font-medium" style={{ color: theme.textPrimary }}>
          {RECETTES.length} recettes 100% naturelles
        </p>
        <p className="text-[10px] mt-1" style={{ color: theme.textMuted }}>
          Sans produits chimiques nocifs
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mt-4">
        <Disclaimer variant="compact" />
      </div>
    </div>
  );
};
