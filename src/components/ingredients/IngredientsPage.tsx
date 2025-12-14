'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { IngredientComplet } from '@/types';
import { INGREDIENTS_COMPLETS, CATEGORIES_INGREDIENTS } from '@/data/ingredientsComplets';
import { Search, Sparkles, X } from 'lucide-react';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { EmptyState } from '@/components/ui/EmptyState';

interface IngredientsPageProps {
  onIngredientClick: (ingredient: IngredientComplet) => void;
}

export const IngredientsPage = ({ onIngredientClick }: IngredientsPageProps) => {
  const { theme, darkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrage des ingrédients
  const getFilteredIngredients = () => {
    let ingredients = INGREDIENTS_COMPLETS;

    if (activeCategory === 'essentiel') {
      ingredients = ingredients.filter(i => i.essentiel);
    } else if (activeCategory === 'detartrant') {
      ingredients = ingredients.filter(i =>
        i.fonctions.some(f => f.toLowerCase().includes('détartrant') || f.toLowerCase().includes('anti-calcaire'))
      );
    } else if (activeCategory === 'degraissant') {
      ingredients = ingredients.filter(i =>
        i.fonctions.some(f => f.toLowerCase().includes('dégraissant'))
      );
    } else if (activeCategory === 'desinfectant') {
      ingredients = ingredients.filter(i =>
        i.fonctions.some(f => f.toLowerCase().includes('désinfectant') || f.toLowerCase().includes('antibactérien') || f.toLowerCase().includes('antiseptique'))
      );
    } else if (activeCategory === 'abrasif') {
      ingredients = ingredients.filter(i =>
        i.fonctions.some(f => f.toLowerCase().includes('abrasif') || f.toLowerCase().includes('polissant'))
      );
    } else if (activeCategory === 'blanchissant') {
      ingredients = ingredients.filter(i =>
        i.fonctions.some(f => f.toLowerCase().includes('blanchissant') || f.toLowerCase().includes('détachant'))
      );
    } else if (activeCategory === 'parfumant') {
      ingredients = ingredients.filter(i =>
        i.fonctions.some(f => f.toLowerCase().includes('parfumant') || f.toLowerCase().includes('assainissant'))
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      ingredients = ingredients.filter(i =>
        i.nom.toLowerCase().includes(query) ||
        i.fonctions.some(f => f.toLowerCase().includes(query)) ||
        i.surfaces.some(s => s.toLowerCase().includes(query))
      );
    }

    return ingredients;
  };

  const filteredIngredients = getFilteredIngredients();

  // Séparer les essentiels du reste
  const essentiels = filteredIngredients.filter(i => i.essentiel);
  const autres = filteredIngredients.filter(i => !i.essentiel);

  // Carte d'ingrédient (compacte, 2 par ligne)
  const IngredientCard = ({ ingredient }: { ingredient: IngredientComplet }) => (
    <div
      onClick={() => onIngredientClick(ingredient)}
      className="p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
        boxShadow: darkMode
          ? '0 4px 15px rgba(0,0,0,0.2)'
          : '0 4px 15px rgba(0,0,0,0.05)'
      }}
    >
      {/* Emoji avec gradient */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2"
        style={{ background: ingredient.gradient }}
      >
        <span className="text-xl">{ingredient.emoji}</span>
      </div>

      {/* Nom */}
      <h3 className="font-bold text-xs leading-tight text-center line-clamp-2 mb-1" style={{ color: theme.textPrimary }}>
        {ingredient.nom}
      </h3>

      {/* Tags fonctions */}
      <div className="flex flex-wrap justify-center gap-1">
        {ingredient.fonctions.slice(0, 4).map((fonction, index) => (
          <span
            key={index}
            className="text-[8px] px-1.5 py-0.5 rounded-full"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              color: theme.textMuted
            }}
          >
            {fonction}
          </span>
        ))}
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
            placeholder="Rechercher un ingrédient, fonction..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: theme.textPrimary }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full transition-colors"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
              }}
            >
              <X className="w-4 h-4" style={{ color: theme.textMuted }} />
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-5 overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-2">
          {CATEGORIES_INGREDIENTS.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all"
                style={{
                  background: isActive
                    ? darkMode
                      ? 'linear-gradient(135deg, #22C55E 0%, #10B981 100%)'
                      : 'linear-gradient(135deg, #34D399 0%, #10B981 100%)'
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
      {filteredIngredients.length === 0 ? (
        <EmptyState
          title="Aucun ingrédient trouvé"
          message="Essayez avec d'autres mots-clés ou changez de catégorie"
          emoji="🧪"
          searchQuery={searchQuery}
        />
      ) : (
        <>
          {/* Mode catégorie spécifique (pas "all" ni "essentiel") - afficher tous les résultats */}
          {activeCategory !== 'all' && activeCategory !== 'essentiel' ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">
                  {CATEGORIES_INGREDIENTS.find(c => c.id === activeCategory)?.emoji || '📋'}
                </span>
                <h2 className="font-bold" style={{ color: theme.textPrimary }}>
                  {CATEGORIES_INGREDIENTS.find(c => c.id === activeCategory)?.nom || 'Résultats'}
                </h2>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: darkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.15)',
                    color: darkMode ? '#4ADE80' : '#16A34A'
                  }}
                >
                  {filteredIngredients.length} ingrédient{filteredIngredients.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {filteredIngredients.map((ingredient) => (
                  <IngredientCard key={ingredient.id} ingredient={ingredient} />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Section Les Essentiels */}
              {essentiels.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    <h2 className="font-bold" style={{ color: theme.textPrimary }}>
                      Les Essentiels
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
                  <div className="grid grid-cols-2 gap-3">
                    {essentiels.map((ingredient) => (
                      <IngredientCard key={ingredient.id} ingredient={ingredient} />
                    ))}
                  </div>
                </div>
              )}

              {/* Autres ingrédients */}
              {autres.length > 0 && (
                <div>
                  {essentiels.length > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">🧪</span>
                      <h2 className="font-bold" style={{ color: theme.textPrimary }}>
                        Autres ingrédients
                      </h2>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: darkMode ? 'rgba(79, 209, 197, 0.2)' : 'rgba(79, 209, 197, 0.15)',
                          color: darkMode ? '#5EEAD4' : '#14B8A6'
                        }}
                      >
                        {autres.length} ingrédients
                      </span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    {autres.map((ingredient) => (
                      <IngredientCard key={ingredient.id} ingredient={ingredient} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Footer info */}
      <div
        className="mt-8 p-4 rounded-2xl text-center"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)'
        }}
      >
        <span className="text-2xl block mb-2">🌱</span>
        <p className="text-xs font-medium" style={{ color: theme.textPrimary }}>
          {INGREDIENTS_COMPLETS.length} ingrédients 100% naturels
        </p>
        <p className="text-[10px] mt-1" style={{ color: theme.textMuted }}>
          Pour un ménage écologique et économique
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mt-4">
        <Disclaimer variant="compact" />
      </div>
    </div>
  );
};
