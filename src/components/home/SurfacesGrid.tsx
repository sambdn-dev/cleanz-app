'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { EmptyState } from '@/components/ui/EmptyState';
import { Surface } from '@/types';
import { getSurfaceImage } from '@/data/scenes';
import { getBlur } from '@/data/imageBlur';

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

  // Tuile photo (repli emoji + fond carte si pas de photo)
  const SurfaceTile = ({ surface }: { surface: Surface }) => {
    const img = getSurfaceImage(surface);
    const [err, setErr] = useState(false);
    const showPhoto = !!img && !err;

    return (
      <button
        onClick={() => onSurfaceClick(surface)}
        className="relative rounded-2xl overflow-hidden aspect-square text-left transition-transform duration-200 hover:scale-[1.02] active:scale-95"
        style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.10)' }}
        aria-label={surface.nom}
      >
        {showPhoto ? (
          <>
            <Image
              src={img!}
              alt={surface.nom}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 160px"
              placeholder={getBlur(img!) ? 'blur' : 'empty'}
              blurDataURL={getBlur(img!)}
              onError={() => setErr(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <span className="absolute top-1.5 left-2 text-base" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
              {surface.emoji}
            </span>
            <span
              className="absolute inset-x-0 bottom-0 p-2 text-[11px] font-bold text-white leading-tight line-clamp-2"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
            >
              {surface.nom}
            </span>
          </>
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-2"
            style={{ background: theme.bgCardSolid }}
          >
            <span className="text-2xl block mb-1">{surface.emoji}</span>
            <span className="text-[11px] font-semibold leading-tight text-center" style={{ color: theme.textPrimary }}>
              {surface.nom}
            </span>
          </div>
        )}
      </button>
    );
  };

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
          <SurfaceTile key={surface.id} surface={surface} />
        ))}
      </div>
    </div>
  );
};
