'use client';

import { useState, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { IngredientComplet } from '@/types';
import { INGREDIENTS_COMPLETS } from '@/data/ingredientsComplets';
import { Search, X, Grid3X3, List, Heart, ChevronRight, Sparkles } from 'lucide-react';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { EmptyState } from '@/components/ui/EmptyState';

interface IngredientsPageProps {
  onIngredientClick: (ingredient: IngredientComplet) => void;
}

export const IngredientsPage = ({ onIngredientClick }: IngredientsPageProps) => {
  const { theme, darkMode } = useTheme();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Extraire toutes les fonctions uniques des ingrédients
  const allFunctions = useMemo(() => {
    const functionsSet = new Set<string>();
    INGREDIENTS_COMPLETS.forEach(ing => {
      ing.fonctions.forEach(f => functionsSet.add(f));
    });
    return Array.from(functionsSet).sort();
  }, []);

  // Toggle fonction filter
  const toggleFunction = (fn: string) => {
    setSelectedFunctions(prev =>
      prev.includes(fn)
        ? prev.filter(f => f !== fn)
        : [...prev, fn]
    );
  };

  // Toggle favoris
  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(fid => fid !== id)
        : [...prev, id]
    );
  };

  // Filtrage des ingrédients
  const filteredIngredients = useMemo(() => {
    let ingredients = INGREDIENTS_COMPLETS;

    // Filtrage par fonctions sélectionnées (OR logic)
    if (selectedFunctions.length > 0) {
      ingredients = ingredients.filter(ing =>
        ing.fonctions.some(f => selectedFunctions.includes(f))
      );
    }

    // Recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      ingredients = ingredients.filter(ing =>
        ing.nom.toLowerCase().includes(query) ||
        ing.fonctions.some(f => f.toLowerCase().includes(query)) ||
        ing.surfaces.some(s => s.toLowerCase().includes(query))
      );
    }

    return ingredients;
  }, [selectedFunctions, searchQuery]);

  // Kit de base (essentiels) - visible uniquement sans filtres ni recherche
  const kitDeBase = useMemo(() => {
    return INGREDIENTS_COMPLETS.filter(ing => ing.essentiel);
  }, []);

  const showKitDeBase = selectedFunctions.length === 0 && !searchQuery;

  // Carte Ingrédient - Vue Grille
  const GridCard = ({ ingredient }: { ingredient: IngredientComplet }) => (
    <div
      onClick={() => onIngredientClick(ingredient)}
      className="p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] relative"
      style={{
        background: darkMode
          ? 'rgba(255,255,255,0.05)'
          : 'rgba(255,255,255,0.9)',
        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`,
        boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)'
      }}
    >
      {/* Badge en haut à gauche */}
      {ingredient.badge && (
        <span
          className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full font-semibold"
          style={{
            background: darkMode ? 'rgba(251, 191, 36, 0.3)' : 'rgba(251, 191, 36, 0.2)',
            color: darkMode ? '#FCD34D' : '#D97706'
          }}
        >
          {ingredient.badge}
        </span>
      )}

      {/* Bouton favoris en haut à droite */}
      <button
        onClick={(e) => toggleFavorite(ingredient.id, e)}
        className="absolute top-2 right-2 p-1.5 rounded-full transition-colors"
        style={{
          background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
        }}
      >
        <Heart
          className="w-4 h-4"
          fill={favorites.includes(ingredient.id) ? '#ef4444' : 'none'}
          stroke={favorites.includes(ingredient.id) ? '#ef4444' : theme.textMuted}
        />
      </button>

      {/* Grande zone emoji avec gradient */}
      <div
        className="w-full aspect-square rounded-xl flex items-center justify-center mb-3 mt-4"
        style={{
          background: ingredient.gradient,
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}
      >
        <span className="text-4xl">{ingredient.emoji}</span>
      </div>

      {/* Nom du produit */}
      <h3
        className="font-bold text-sm mb-2 line-clamp-2"
        style={{ color: theme.textPrimary }}
      >
        {ingredient.nom}
      </h3>

      {/* Tags fonctions (max 4) */}
      <div className="flex flex-wrap gap-1">
        {ingredient.fonctions.slice(0, 4).map((fonction, index) => (
          <span
            key={index}
            className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
              color: theme.textMuted
            }}
          >
            {fonction}
          </span>
        ))}
      </div>

      {/* Compteur de recettes */}
      {ingredient.recettesIds.length > 0 && (
        <div className="mt-2 flex items-center gap-1">
          <span
            className="text-[10px] font-medium"
            style={{ color: theme.textMuted }}
          >
            {ingredient.recettesIds.length} recette{ingredient.recettesIds.length > 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );

  // Carte Ingrédient - Vue Liste
  const ListCard = ({ ingredient }: { ingredient: IngredientComplet }) => (
    <div
      onClick={() => onIngredientClick(ingredient)}
      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
      style={{
        background: darkMode
          ? 'rgba(255,255,255,0.05)'
          : 'rgba(255,255,255,0.9)',
        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`,
        boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)'
      }}
    >
      {/* Emoji avec gradient */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: ingredient.gradient,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <span className="text-2xl">{ingredient.emoji}</span>
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3
            className="font-bold text-sm truncate"
            style={{ color: theme.textPrimary }}
          >
            {ingredient.nom}
          </h3>
          {ingredient.badge && (
            <span
              className="text-[9px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
              style={{
                background: darkMode ? 'rgba(251, 191, 36, 0.3)' : 'rgba(251, 191, 36, 0.2)',
                color: darkMode ? '#FCD34D' : '#D97706'
              }}
            >
              {ingredient.badge}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {ingredient.fonctions.slice(0, 3).map((fonction, index) => (
            <span
              key={index}
              className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                color: theme.textMuted
              }}
            >
              {fonction}
            </span>
          ))}
        </div>
      </div>

      {/* Actions à droite */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {ingredient.recettesIds.length > 0 && (
          <span
            className="text-[10px] font-medium"
            style={{ color: theme.textMuted }}
          >
            {ingredient.recettesIds.length}
          </span>
        )}
        <button
          onClick={(e) => toggleFavorite(ingredient.id, e)}
          className="p-1.5 rounded-full transition-colors"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
          }}
        >
          <Heart
            className="w-4 h-4"
            fill={favorites.includes(ingredient.id) ? '#ef4444' : 'none'}
            stroke={favorites.includes(ingredient.id) ? '#ef4444' : theme.textMuted}
          />
        </button>
        <ChevronRight className="w-4 h-4" style={{ color: theme.textMuted }} />
      </div>
    </div>
  );

  // Carte Kit de Base (horizontale)
  const KitDeBaseCard = ({ ingredient }: { ingredient: IngredientComplet }) => (
    <div
      onClick={() => onIngredientClick(ingredient)}
      className="flex-shrink-0 w-28 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        background: darkMode
          ? 'rgba(255,255,255,0.08)'
          : 'rgba(255,255,255,0.95)',
        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
        boxShadow: darkMode ? 'none' : '0 2px 10px rgba(0,0,0,0.06)'
      }}
    >
      <div
        className="w-full aspect-square rounded-lg flex items-center justify-center mb-2"
        style={{
          background: ingredient.gradient,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <span className="text-2xl">{ingredient.emoji}</span>
      </div>
      <h4
        className="font-semibold text-xs text-center line-clamp-2"
        style={{ color: theme.textPrimary }}
      >
        {ingredient.nom}
      </h4>
    </div>
  );

  return (
    <div className="pb-4">
      {/* Titre */}
      <h1
        className="text-2xl font-bold mb-4"
        style={{ color: theme.textPrimary }}
      >
        Ingrédients
      </h1>

      {/* Barre de recherche avec toggle vue */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
            border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`
          }}
        >
          <Search className="w-5 h-5" style={{ color: theme.textMuted }} />
          <input
            type="text"
            placeholder="Rechercher un ingrédient..."
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

        {/* Toggle Vue */}
        <div
          className="flex items-center gap-1 p-1 rounded-xl"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
            border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`
          }}
        >
          <button
            onClick={() => setViewMode('grid')}
            className="p-2 rounded-lg transition-all"
            style={{
              background: viewMode === 'grid'
                ? darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'
                : 'transparent',
              color: viewMode === 'grid' ? theme.textPrimary : theme.textMuted
            }}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className="p-2 rounded-lg transition-all"
            style={{
              background: viewMode === 'list'
                ? darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'
                : 'transparent',
              color: viewMode === 'list' ? theme.textPrimary : theme.textMuted
            }}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filtres par fonction (multi-select) */}
      <div className="mb-5">
        <div className="flex flex-wrap gap-2">
          {allFunctions.map((fn) => {
            const isSelected = selectedFunctions.includes(fn);
            return (
              <button
                key={fn}
                onClick={() => toggleFunction(fn)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                style={{
                  background: isSelected
                    ? darkMode ? 'rgba(255,255,255,0.9)' : '#1a1a2e'
                    : darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.8)',
                  color: isSelected
                    ? darkMode ? '#1a1a2e' : 'white'
                    : theme.textSecondary,
                  border: `1px solid ${isSelected ? 'transparent' : darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`
                }}
              >
                {fn}
              </button>
            );
          })}
          {selectedFunctions.length > 0 && (
            <button
              onClick={() => setSelectedFunctions([])}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: darkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                border: `1px solid ${darkMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)'}`
              }}
            >
              Effacer filtres
            </button>
          )}
        </div>
      </div>

      {/* Section Kit de Base */}
      {showKitDeBase && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <h2 className="font-bold" style={{ color: theme.textPrimary }}>
              Kit de Base
            </h2>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                background: darkMode ? 'rgba(251, 191, 36, 0.2)' : 'rgba(251, 191, 36, 0.15)',
                color: darkMode ? '#FCD34D' : '#D97706'
              }}
            >
              {kitDeBase.length} essentiels
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
            {kitDeBase.map((ingredient) => (
              <KitDeBaseCard key={ingredient.id} ingredient={ingredient} />
            ))}
          </div>
        </div>
      )}

      {/* Section titre avec compteur */}
      {!showKitDeBase && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold" style={{ color: theme.textPrimary }}>
            {selectedFunctions.length > 0 ? 'Résultats' : 'Tous les ingrédients'}
          </h2>
        </div>
      )}

      {/* Résultats */}
      {filteredIngredients.length === 0 ? (
        <EmptyState
          title="Aucun ingrédient trouvé"
          message="Essayez avec d'autres mots-clés ou changez de filtres"
          emoji="🧪"
          searchQuery={searchQuery}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredIngredients.map((ingredient) => (
            <GridCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredIngredients.map((ingredient) => (
            <ListCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      )}

      {/* Compteur total */}
      <div className="mt-6 flex justify-center">
        <span
          className="text-sm px-4 py-2 rounded-full font-medium"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
            color: theme.textMuted
          }}
        >
          {filteredIngredients.length} ingrédient{filteredIngredients.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Disclaimer */}
      <div className="mt-6">
        <Disclaimer variant="compact" />
      </div>
    </div>
  );
};
