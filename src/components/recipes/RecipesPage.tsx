'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { RecetteComplete } from '@/types';
import { RECETTES, CATEGORIES_RECETTES } from '@/data/recettes';
import { Clock, Star, Search, ChevronRight, Sparkles } from 'lucide-react';
import { Disclaimer } from '@/components/ui/Disclaimer';

interface RecipesPageProps {
  onRecipeClick: (recipe: RecetteComplete) => void;
}

export const RecipesPage = ({ onRecipeClick }: RecipesPageProps) => {
  const { theme, darkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrage des recettes
  const getFilteredRecipes = () => {
    let recipes = RECETTES;

    if (activeCategory !== 'all') {
      recipes = recipes.filter(r => r.categorie === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      recipes = recipes.filter(r =>
        r.nom.toLowerCase().includes(query) ||
        r.ingredients.some(ing => ing.nom.toLowerCase().includes(query)) ||
        r.surfaces.some(s => s.toLowerCase().includes(query))
      );
    }

    return recipes;
  };

  const filteredRecipes = getFilteredRecipes();

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
  const RecipeCard = ({ recipe }: { recipe: RecetteComplete }) => (
    <div
      onClick={() => onRecipeClick(recipe)}
      className="p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
        boxShadow: darkMode
          ? '0 4px 15px rgba(0,0,0,0.2)'
          : '0 4px 15px rgba(0,0,0,0.05)'
      }}
    >
      <div className="flex items-start gap-3">
        {/* Emoji avec gradient */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: recipe.gradient }}
        >
          <span className="text-2xl">{recipe.emoji}</span>
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-sm leading-tight" style={{ color: theme.textPrimary }}>
              {recipe.nom}
            </h3>
            <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: theme.textMuted }} />
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
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" style={{ color: theme.textMuted }} />
              <span className="text-[10px]" style={{ color: theme.textMuted }}>{recipe.temps}</span>
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

  return (
    <div className="pt-2 pb-4">
      {/* Search Bar */}
      <div className="mb-4">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
            border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`
          }}
        >
          <Search className="w-5 h-5" style={{ color: theme.textMuted }} />
          <input
            type="text"
            placeholder="Rechercher une recette, ingrédient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: theme.textPrimary }}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-5 overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-2">
          {CATEGORIES_RECETTES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all"
                style={{
                  background: isActive
                    ? darkMode
                      ? 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)'
                      : 'linear-gradient(135deg, #A78BFA 0%, #F472B6 100%)'
                    : darkMode
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(255,255,255,0.7)',
                  color: isActive ? 'white' : theme.textSecondary,
                  border: isActive ? 'none' : `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`
                }}
              >
                <span className="text-sm">{cat.emoji}</span>
                <span className="text-xs font-medium">{cat.nom}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Résultats */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-4xl block mb-3">🔍</span>
          <p className="text-sm" style={{ color: theme.textMuted }}>
            Aucune recette trouvée
          </p>
        </div>
      ) : (
        <>
          {/* Section Les Indispensables */}
          {(activeCategory === 'all' || activeCategory === 'Indispensable') && indispensables.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <h2 className="font-bold" style={{ color: theme.textPrimary }}>
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
              {(activeCategory === 'all' || activeCategory === 'Indispensable') && indispensables.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base">🧪</span>
                  <h2 className="font-bold" style={{ color: theme.textPrimary }}>
                    Autres recettes
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

          {/* Si on n'affiche que les autres (pas les indispensables) */}
          {activeCategory !== 'all' && activeCategory !== 'Indispensable' && (
            <div className="text-center mt-6 pt-4" style={{ borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}` }}>
              <p className="text-xs" style={{ color: theme.textMuted }}>
                {filteredRecipes.length} recette{filteredRecipes.length > 1 ? 's' : ''} dans cette catégorie
              </p>
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
