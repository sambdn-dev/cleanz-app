'use client';

import { useState, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useIngredientFavoritesContext } from '@/contexts/IngredientFavoritesContext';
import { IngredientComplet } from '@/types';
import { INGREDIENTS_COMPLETS } from '@/data/ingredientsComplets';
import { Search, X, LayoutGrid, List } from 'lucide-react';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { EmptyState } from '@/components/ui/EmptyState';
import { IngredientCard } from './IngredientCard';
import { IngredientRowSkeleton } from '@/components/ui/Skeleton';
import { haptic } from '@/utils/haptics';

// 15 fonctions principales uniquement
const MAIN_FUNCTIONS = [
  'Détartrant', 'Désinfectant', 'Dégraissant', 'Nettoyant', 'Détachant',
  'Désodorisant', 'Blanchissant', 'Antibactérien', 'Antifongique', 'Polissant',
  'Absorbant', 'Insecticide', 'Déboucheur', 'Parfumant', 'Purifiant'
];

interface IngredientsPageProps {
  onIngredientClick: (ingredient: IngredientComplet) => void;
}

type ViewMode = 'grid' | 'list';

export const IngredientsPage = ({ onIngredientClick }: IngredientsPageProps) => {
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

  return (
    <div className="pb-4">
      {/* Titre */}
      <h1 className="font-display text-2xl font-extrabold mb-4" style={{ color: theme.textPrimary }}>
        Ingrédients
      </h1>

      {/* Barre de recherche + Toggle vue */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
            border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`
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
              aria-label="Effacer la recherche"
              className="p-1 rounded-full transition-colors"
              style={{ background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
            >
              <X className="w-4 h-4" style={{ color: theme.textMuted }} />
            </button>
          )}
        </div>

        {/* Toggle grille/liste */}
        <div
          className="flex items-center rounded-xl overflow-hidden"
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

      {/* Compteur de résultats */}
      <div className="mb-4">
        <p style={{ color: theme.textMuted }} className="text-sm">
          {filteredIngredients.length} ingrédient{filteredIngredients.length > 1 ? 's' : ''}
        </p>
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
      ) : viewMode === 'list' ? (
        <div className="space-y-3">
          {filteredIngredients.map(ingredient => (
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
        <div className="grid grid-cols-2 gap-4">
          {filteredIngredients.map(ingredient => (
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

      {/* Disclaimer */}
      <div className="mt-6">
        <Disclaimer variant="compact" />
      </div>
    </div>
  );
};
