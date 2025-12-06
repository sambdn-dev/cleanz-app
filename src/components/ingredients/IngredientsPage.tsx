'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { IngredientComplet } from '@/types';
import { INGREDIENTS_COMPLETS, CATEGORIES_INGREDIENTS } from '@/data/ingredientsComplets';
import { Search, ChevronRight, Leaf, Euro, Sparkles } from 'lucide-react';

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
    } else if (activeCategory === 'parfumant') {
      ingredients = ingredients.filter(i =>
        i.fonctions.some(f => f.toLowerCase().includes('parfumant'))
      );
    } else if (activeCategory === 'abrasif') {
      ingredients = ingredients.filter(i =>
        i.fonctions.some(f => f.toLowerCase().includes('abrasif'))
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

  // Rendu du score écologique
  const renderEcoScore = (score: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((leaf) => (
          <Leaf
            key={leaf}
            className={`w-2.5 h-2.5 ${leaf <= score ? 'text-green-500 fill-green-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  // Rendu du prix
  const renderPrix = (prix: string) => {
    const count = prix.length;
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3].map((euro) => (
          <Euro
            key={euro}
            className={`w-2.5 h-2.5 ${euro <= count ? 'text-amber-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  // Carte d'ingrédient
  const IngredientCard = ({ ingredient }: { ingredient: IngredientComplet }) => (
    <div
      onClick={() => onIngredientClick(ingredient)}
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
          style={{ background: ingredient.gradient }}
        >
          <span className="text-2xl">{ingredient.emoji}</span>
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-sm leading-tight" style={{ color: theme.textPrimary }}>
              {ingredient.nom}
            </h3>
            <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: theme.textMuted }} />
          </div>

          {/* Badge */}
          {ingredient.badge && (
            <span
              className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{
                background: darkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)',
                color: darkMode ? '#A78BFA' : '#7C3AED'
              }}
            >
              {ingredient.badge}
            </span>
          )}

          {/* Infos */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <span className="text-[9px]" style={{ color: theme.textMuted }}>Prix:</span>
              {renderPrix(ingredient.prix)}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[9px]" style={{ color: theme.textMuted }}>Éco:</span>
              {renderEcoScore(ingredient.scoreEcologique)}
            </div>
          </div>

          {/* Fonctions preview */}
          <div className="flex flex-wrap gap-1 mt-2">
            {ingredient.fonctions.slice(0, 3).map((fonction, index) => (
              <span
                key={index}
                className="text-[9px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  color: theme.textMuted
                }}
              >
                {fonction}
              </span>
            ))}
            {ingredient.fonctions.length > 3 && (
              <span
                className="text-[9px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  color: theme.textMuted
                }}
              >
                +{ingredient.fonctions.length - 3}
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
            placeholder="Rechercher un ingrédient, fonction..."
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
        <div className="text-center py-12">
          <span className="text-4xl block mb-3">🔍</span>
          <p className="text-sm" style={{ color: theme.textMuted }}>
            Aucun ingrédient trouvé
          </p>
        </div>
      ) : (
        <>
          {/* Section Les Essentiels */}
          {(activeCategory === 'all' || activeCategory === 'essentiel') && essentiels.length > 0 && (
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
              <div className="space-y-3">
                {essentiels.map((ingredient) => (
                  <IngredientCard key={ingredient.id} ingredient={ingredient} />
                ))}
              </div>
            </div>
          )}

          {/* Autres ingrédients */}
          {autres.length > 0 && (
            <div>
              {(activeCategory === 'all' || activeCategory === 'essentiel') && essentiels.length > 0 && (
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
              <div className="space-y-3">
                {autres.map((ingredient) => (
                  <IngredientCard key={ingredient.id} ingredient={ingredient} />
                ))}
              </div>
            </div>
          )}

          {/* Si on n'affiche que les autres (pas les essentiels) */}
          {activeCategory !== 'all' && activeCategory !== 'essentiel' && (
            <div className="text-center mt-6 pt-4" style={{ borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}` }}>
              <p className="text-xs" style={{ color: theme.textMuted }}>
                {filteredIngredients.length} ingrédient{filteredIngredients.length > 1 ? 's' : ''} dans cette catégorie
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
    </div>
  );
};
