'use client';

import { useState, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { IngredientComplet } from '@/types';
import { INGREDIENTS_COMPLETS } from '@/data/ingredientsComplets';
import { Search, X } from 'lucide-react';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { EmptyState } from '@/components/ui/EmptyState';

// 15 fonctions principales uniquement
const MAIN_FUNCTIONS = [
  'Détartrant', 'Désinfectant', 'Dégraissant', 'Nettoyant', 'Détachant',
  'Désodorisant', 'Blanchissant', 'Antibactérien', 'Antifongique', 'Polissant',
  'Absorbant', 'Insecticide', 'Déboucheur', 'Parfumant', 'Purifiant'
];

interface IngredientsPageProps {
  onIngredientClick: (ingredient: IngredientComplet) => void;
}

export const IngredientsPage = ({ onIngredientClick }: IngredientsPageProps) => {
  const { theme, darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Toggle filter
  const toggleFilter = (func: string) => {
    setActiveFilters(prev =>
      prev.includes(func)
        ? prev.filter(f => f !== func)
        : [...prev, func]
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

  // Compteur par fonction
  const getCountForFunction = (func: string) => {
    return INGREDIENTS_COMPLETS.filter(ing => ing.fonctions.includes(func)).length;
  };

  // Filtrage des ingrédients (multi-sélection OR)
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
      <h1
        className="text-2xl font-bold mb-4"
        style={{ color: theme.textPrimary }}
      >
        Ingrédients
      </h1>

      {/* Barre de recherche */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-4"
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

      {/* Filtres par fonction */}
      <div className="py-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Filtrer par fonction
          </p>
          {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              className="text-purple-400 text-xs"
            >
              ✕ Effacer ({activeFilters.length})
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {MAIN_FUNCTIONS.map(func => {
            const count = getCountForFunction(func);
            const isActive = activeFilters.includes(func);
            return (
              <button
                key={func}
                onClick={() => toggleFilter(func)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/60'
                }`}
              >
                {func}
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Compteur de résultats */}
      <div className="mb-4">
        <p style={{ color: 'rgba(255,255,255,0.5)' }} className="text-sm">
          {filteredIngredients.length} ingrédient{filteredIngredients.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Grille d'ingrédients */}
      {filteredIngredients.length === 0 ? (
        <EmptyState
          title="Aucun ingrédient trouvé"
          message="Essayez avec d'autres mots-clés ou changez de filtres"
          emoji="🧪"
          searchQuery={searchQuery}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredIngredients.map(ingredient => (
            <div
              key={ingredient.id}
              onClick={() => onIngredientClick(ingredient)}
              className="relative bg-white/5 rounded-2xl p-4 border border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/[0.08] active:scale-[0.98]"
            >
              {/* Ligne du haut : Badges + Favori */}
              <div className="flex items-start justify-between mb-3">
                {/* Badges à gauche */}
                <div className="flex flex-wrap gap-1">
                  {ingredient.essentiel && (
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-1 rounded-md flex items-center gap-1">
                      <span>⭐</span> Essentiel
                    </span>
                  )}
                  {ingredient.badge && ingredient.badge !== 'Incontournable' && (
                    <span className="text-[10px] bg-orange-400/20 text-orange-300 px-2 py-1 rounded-md flex items-center gap-1">
                      <span>🔥</span> {ingredient.badge}
                    </span>
                  )}
                </div>

                {/* Favori à droite */}
                <button
                  onClick={(e) => toggleFavorite(ingredient.id, e)}
                  className="p-1"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={favorites.includes(ingredient.id) ? "#a855f7" : "none"}
                    stroke={favorites.includes(ingredient.id) ? "#a855f7" : "#6b7280"}
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>

              {/* Emoji centré */}
              <div className="flex justify-center mb-4">
                <span className="text-5xl">{ingredient.emoji}</span>
              </div>

              {/* Nom */}
              <h3 className="text-white font-semibold text-sm mb-3">
                {ingredient.nom}
              </h3>

              {/* Tags (4 max) */}
              <div className="flex flex-wrap gap-1 mb-3">
                {ingredient.fonctions.slice(0, 4).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-white/10 text-white/50 px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Nombre de recettes */}
              <div className="flex items-center gap-1.5 text-white/40 text-xs">
                <span>📖</span>
                <span>{ingredient.recettesIds.length} recette{ingredient.recettesIds.length > 1 ? 's' : ''}</span>
              </div>
            </div>
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
