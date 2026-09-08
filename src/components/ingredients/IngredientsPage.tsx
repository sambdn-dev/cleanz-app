'use client';

import { useState, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useIngredientFavoritesContext } from '@/contexts/IngredientFavoritesContext';
import { IngredientComplet, Surface, RecetteComplete } from '@/types';
import { INGREDIENTS_COMPLETS } from '@/data/ingredientsComplets';
import { LayoutGrid, List, Sparkles } from 'lucide-react';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { EmptyState } from '@/components/ui/EmptyState';
import { IngredientCard } from './IngredientCard';
import { IngredientRowSkeleton } from '@/components/ui/Skeleton';
import { SmartSearch } from '@/components/layout/SmartSearch';
import { haptic } from '@/utils/haptics';

// 15 fonctions principales uniquement
const MAIN_FUNCTIONS = [
  'Détartrant', 'Dégraissant', 'Nettoyant', 'Détachant',
  'Désodorisant', 'Blanchissant', 'Polissant',
  'Absorbant', 'Insecticide', 'Déboucheur', 'Parfumant'
];

interface IngredientsPageProps {
  onIngredientClick: (ingredient: IngredientComplet) => void;
  onSurfaceClick: (surface: Surface) => void;
  onRecipeClick: (recipe: RecetteComplete) => void;
}

type ViewMode = 'grid' | 'list';

export const IngredientsPage = ({ onIngredientClick, onSurfaceClick, onRecipeClick }: IngredientsPageProps) => {
  const { theme, darkMode } = useTheme();
  const { isFavorite, toggleFavorite, isLoaded } = useIngredientFavoritesContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const toggleFilter = (func: string) => {
    haptic('selection');
    setActiveFilters(prev =>
      prev.includes(func) ? prev.filter(f => f !== func) : [...prev, func]
    );
  };

  const setView = (v: ViewMode) => {
    haptic('selection');
    setViewMode(v);
  };

  const getCountForFunction = (func: string) =>
    INGREDIENTS_COMPLETS.filter(ing => ing.fonctions.includes(func)).length;

  const filteredIngredients = useMemo(() => {
    return INGREDIENTS_COMPLETS.filter(ing => {
      const matchesSearch = ing.nom.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilters = activeFilters.length === 0 ||
        activeFilters.some(f => ing.fonctions.includes(f));
      return matchesSearch && matchesFilters;
    });
  }, [activeFilters, searchQuery]);

  // Séparer les essentiels
  const essentiels = filteredIngredients.filter(i => i.essentiel);
  const autres = filteredIngredients.filter(i => !i.essentiel);
  const showSections = !searchQuery && activeFilters.length === 0;

  return (
    <div className="pb-4">
      {/* En-tête éditorial */}
      <div className="mb-5">
        <h1 className="font-display text-2xl font-extrabold mb-1" style={{ color: theme.textPrimary }}>
          Ingrédients naturels
        </h1>
        <p className="text-sm" style={{ color: theme.textMuted }}>
          {INGREDIENTS_COMPLETS.length} ingrédients pour un ménage 100% écologique
        </p>
      </div>

      {/* Recherche intelligente + Toggle vue */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 relative z-[60]">
          <SmartSearch
            value={searchQuery}
            onChange={setSearchQuery}
            onSelectSurface={onSurfaceClick}
            onSelectRecipe={onRecipeClick}
            onSelectIngredient={onIngredientClick}
            placeholder="Rechercher un ingrédient, recette, surface..."
          />
        </div>

        {/* Toggle grille/liste */}
        <div
          className="flex items-center rounded-xl overflow-hidden flex-shrink-0"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
            border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`
          }}
        >
          <button
            onClick={() => setView('list')}
            aria-label="Vue liste"
            aria-pressed={viewMode === 'list'}
            className="p-3 transition-colors"
            style={{
              background: viewMode === 'list' ? 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' : 'transparent',
              color: viewMode === 'list' ? 'white' : theme.textMuted
            }}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView('grid')}
            aria-label="Vue grille"
            aria-pressed={viewMode === 'grid'}
            className="p-3 transition-colors"
            style={{
              background: viewMode === 'grid' ? 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' : 'transparent',
              color: viewMode === 'grid' ? 'white' : theme.textMuted
            }}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filtres par fonction */}
      <div className="py-2 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-wider" style={{ color: theme.textMuted }}>
            Filtrer par fonction
          </p>
          {activeFilters.length > 0 && (
            <button onClick={() => { haptic('selection'); setActiveFilters([]); }} className="text-purple-400 text-xs">
              ✕ Effacer ({activeFilters.length})
            </button>
          )}
        </div>
        <div className="overflow-x-auto scrollbar-hide edge-fade-x -mx-4 px-4">
          <div className="flex gap-2 w-max pb-1">
            {MAIN_FUNCTIONS.map(func => {
              const count = getCountForFunction(func);
              const active = activeFilters.includes(func);
              return (
                <button
                  key={func}
                  onClick={() => toggleFilter(func)}
                  aria-pressed={active}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
                  style={{
                    background: active ? '#a855f7' : darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                    color: active ? 'white' : theme.textSecondary
                  }}
                >
                  {func}
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{
                      background: active ? 'rgba(255,255,255,0.2)' : darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                      color: active ? 'white' : theme.textMuted
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contenu */}
      {!isLoaded ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => <IngredientRowSkeleton key={i} />)}
        </div>
      ) : filteredIngredients.length === 0 ? (
        <EmptyState
          title="Aucun ingrédient trouvé"
          message="Essayez avec d'autres mots-clés ou changez de filtres"
          emoji="🧪"
          searchQuery={searchQuery}
        />
      ) : (
        <>
          {/* Section Essentiels */}
          {showSections && essentiels.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <h2 className="font-display font-bold text-[17px]" style={{ color: theme.textPrimary }}>
                  Les 8 Essentiels
                </h2>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: darkMode ? 'rgba(251, 191, 36, 0.2)' : 'rgba(251, 191, 36, 0.15)',
                    color: darkMode ? '#FCD34D' : '#D97706'
                  }}
                >
                  Indispensables
                </span>
              </div>
              {viewMode === 'list' ? (
                <div className="space-y-3">
                  {essentiels.map(ingredient => (
                    <IngredientCard
                      key={ingredient.id}
                      ingredient={ingredient}
                      view="list"
                      favorite={isFavorite(ingredient.id)}
                      onClick={() => onIngredientClick(ingredient)}
                      onToggleFavorite={() => toggleFavorite(ingredient.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {essentiels.map(ingredient => (
                    <IngredientCard
                      key={ingredient.id}
                      ingredient={ingredient}
                      view="grid"
                      favorite={isFavorite(ingredient.id)}
                      onClick={() => onIngredientClick(ingredient)}
                      onToggleFavorite={() => toggleFavorite(ingredient.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Section Autres ingrédients */}
          {(showSections ? autres : filteredIngredients).length > 0 && (
            <div>
              {showSections && autres.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base">🧪</span>
                  <h2 className="font-display font-bold text-[17px]" style={{ color: theme.textPrimary }}>
                    Tous les ingrédients
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
              {viewMode === 'list' ? (
                <div className="space-y-3">
                  {(showSections ? autres : filteredIngredients).map(ingredient => (
                    <IngredientCard
                      key={ingredient.id}
                      ingredient={ingredient}
                      view="list"
                      favorite={isFavorite(ingredient.id)}
                      onClick={() => onIngredientClick(ingredient)}
                      onToggleFavorite={() => toggleFavorite(ingredient.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {(showSections ? autres : filteredIngredients).map(ingredient => (
                    <IngredientCard
                      key={ingredient.id}
                      ingredient={ingredient}
                      view="grid"
                      favorite={isFavorite(ingredient.id)}
                      onClick={() => onIngredientClick(ingredient)}
                      onToggleFavorite={() => toggleFavorite(ingredient.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Disclaimer */}
      <div className="mt-6">
        <Disclaimer variant="compact" />
      </div>
    </div>
  );
};
