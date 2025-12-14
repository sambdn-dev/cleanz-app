'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { IngredientComplet } from '@/types';
import { INGREDIENTS_COMPLETS } from '@/data/ingredientsComplets';
import { Search, X, Sparkles } from 'lucide-react';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { EmptyState } from '@/components/ui/EmptyState';

interface IngredientsPageProps {
  onIngredientClick: (ingredient: IngredientComplet) => void;
}

// Catégories simplifiées avec filtrage par fonction
const FILTER_CATEGORIES = [
  { id: 'all', nom: 'Tous', emoji: '✨' },
  { id: 'essentiel', nom: 'Essentiels', emoji: '⭐' },
  { id: 'huiles', nom: 'Huiles', emoji: '🌿' },
  { id: 'autres', nom: 'Autres', emoji: '🧪' },
];

export const IngredientsPage = ({ onIngredientClick }: IngredientsPageProps) => {
  const { theme, darkMode } = useTheme();
  // Par défaut : Essentiels
  const [activeFilter, setActiveFilter] = useState('essentiel');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrage des ingrédients
  const getFilteredIngredients = () => {
    let ingredients = INGREDIENTS_COMPLETS;

    // Filtrage par catégorie
    if (activeFilter === 'essentiel') {
      ingredients = ingredients.filter(i => i.essentiel);
    } else if (activeFilter === 'huiles') {
      ingredients = ingredients.filter(i =>
        i.nom.toLowerCase().includes('huile') ||
        i.nom.toLowerCase().includes('tea tree') ||
        i.nom.toLowerCase().includes('lavande') ||
        i.nom.toLowerCase().includes('citron') && i.fonctions.some(f => f.toLowerCase().includes('parfumant'))
      );
    } else if (activeFilter === 'autres') {
      ingredients = ingredients.filter(i =>
        !i.essentiel &&
        !i.nom.toLowerCase().includes('huile') &&
        !i.nom.toLowerCase().includes('tea tree') &&
        !i.nom.toLowerCase().includes('lavande')
      );
    }

    // Recherche
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

  // Carte d'ingrédient style épuré
  const IngredientCard = ({ ingredient }: { ingredient: IngredientComplet }) => (
    <div
      onClick={() => onIngredientClick(ingredient)}
      className="p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        background: darkMode
          ? 'rgba(255,255,255,0.05)'
          : 'rgba(255,255,255,0.8)',
        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`,
      }}
    >
      {/* Grande zone emoji avec gradient */}
      <div
        className="w-full aspect-square rounded-xl flex items-center justify-center mb-3"
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

      {/* Tags fonctions (max 2) */}
      <div className="flex flex-wrap gap-1.5">
        {ingredient.fonctions.slice(0, 2).map((fonction, index) => (
          <span
            key={index}
            className="text-[10px] px-2 py-1 rounded-full font-medium"
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

      {/* Filtres */}
      <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide -mx-4 px-4">
        {FILTER_CATEGORIES.map((cat) => {
          const isActive = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full whitespace-nowrap transition-all"
              style={{
                background: isActive
                  ? darkMode
                    ? 'rgba(255,255,255,0.95)'
                    : '#1a1a2e'
                  : darkMode
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(255,255,255,0.8)',
                color: isActive
                  ? darkMode ? '#1a1a2e' : 'white'
                  : theme.textSecondary,
                border: `1px solid ${isActive ? 'transparent' : darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                fontWeight: isActive ? '600' : '500'
              }}
            >
              <span className="text-sm">{cat.emoji}</span>
              <span className="text-sm">{cat.nom}</span>
            </button>
          );
        })}
      </div>

      {/* Barre de recherche */}
      <div className="mb-5">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
            border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`
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

      {/* Section titre avec compteur */}
      {activeFilter === 'essentiel' && !searchQuery && (
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <h2 className="font-bold" style={{ color: theme.textPrimary }}>
            Les Essentiels
          </h2>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              background: darkMode ? 'rgba(251, 191, 36, 0.2)' : 'rgba(251, 191, 36, 0.15)',
              color: darkMode ? '#FCD34D' : '#D97706'
            }}
          >
            Kit de base
          </span>
        </div>
      )}

      {/* Résultats */}
      {filteredIngredients.length === 0 ? (
        <EmptyState
          title="Aucun ingrédient trouvé"
          message="Essayez avec d'autres mots-clés ou changez de catégorie"
          emoji="🧪"
          searchQuery={searchQuery}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredIngredients.map((ingredient) => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
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
