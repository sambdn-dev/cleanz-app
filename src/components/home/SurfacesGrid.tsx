'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Surface } from '@/types';

interface SurfacesGridProps {
  surfaces: Surface[];
  showAll: boolean;
  onToggleShowAll: () => void;
  onSurfaceClick: (surface: Surface) => void;
  searchQuery?: string;
}

export const SurfacesGrid = ({ surfaces, showAll, onToggleShowAll, onSurfaceClick, searchQuery }: SurfacesGridProps) => {
  const { theme } = useTheme();

  // Show empty state if no results and there's a search query
  if (surfaces.length === 0 && searchQuery) {
    return (
      <div className="mb-5">
        <EmptyState
          title="Aucune surface trouvée"
          message="Essayez avec d'autres mots-clés ou explorez nos catégories"
          emoji="🧹"
          searchQuery={searchQuery}
        />
      </div>
    );
  }

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold" style={{ color: theme.textPrimary }}>
          {showAll ? `Surfaces (${surfaces.length})` : 'Surfaces populaires'}
        </h2>
        <button
          onClick={onToggleShowAll}
          className="text-xs font-semibold text-violet-500 hover:text-violet-600 transition-colors"
        >
          {showAll ? '← Retour' : 'Tout voir →'}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {surfaces.map((surface) => (
          <Card
            key={surface.id}
            onClick={() => onSurfaceClick(surface)}
            hoverable
            className="p-3 text-center"
          >
            <span className="text-2xl block mb-1">{surface.emoji}</span>
            <span className="text-[11px] font-semibold leading-tight" style={{ color: theme.textPrimary }}>
              {surface.nom}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
};
