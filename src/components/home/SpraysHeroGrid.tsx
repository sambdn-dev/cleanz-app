'use client';

import { useState, useEffect } from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SPRAYS_INDISPENSABLES } from '@/data/sprays';
import { Spray } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronRight } from 'lucide-react';

interface SpraysHeroGridProps {
  onSprayClick: (spray: Spray) => void;
}

export const SpraysHeroGrid = ({ onSprayClick }: SpraysHeroGridProps) => {
  const { theme, darkMode } = useTheme();
  const [heroIndex, setHeroIndex] = useState(0);

  const hero = SPRAYS_INDISPENSABLES[heroIndex];
  const others = SPRAYS_INDISPENSABLES.filter((_, i) => i !== heroIndex);

  // Auto-rotate hero toutes les 6s
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % SPRAYS_INDISPENSABLES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-5">
      <SectionTitle badge="Recettes maison">
        <span className="text-base mr-2">🧴</span>Les Indispensables
      </SectionTitle>

      {/* Hero card */}
      <button
        onClick={() => onSprayClick(hero)}
        className="w-full rounded-3xl p-5 mb-3 text-left relative overflow-hidden transition-all active:scale-[0.98]"
        style={{
          background: hero.gradient,
          boxShadow: '0 8px 28px rgba(0,0,0,0.15)',
        }}
      >
        {/* Badge */}
        <span className="absolute top-4 left-4 text-[10px] bg-white/30 text-white px-2.5 py-1 rounded-full font-semibold backdrop-blur-sm">
          {hero.badge}
        </span>

        {/* Emoji large */}
        <span className="absolute top-3 right-4 text-5xl opacity-90">{hero.emoji}</span>

        {/* Content */}
        <div className="mt-10">
          <h3 className="text-white font-bold text-xl leading-tight mb-2">{hero.nom}</h3>
          <p className="text-white/80 text-xs leading-relaxed mb-3 line-clamp-2">
            {hero.ingredients.slice(0, 3).map(i => i.nom).join(' · ')}
          </p>
          <div className="flex items-center gap-1 text-white/90 text-xs font-medium">
            Voir la recette <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {SPRAYS_INDISPENSABLES.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i === heroIndex ? 14 : 5,
                height: 5,
                background: i === heroIndex ? 'white' : 'rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </div>
      </button>

      {/* Mini grid (5 autres) */}
      <div className="grid grid-cols-5 gap-2">
        {others.map((spray) => (
          <button
            key={spray.id}
            onClick={() => {
              setHeroIndex(SPRAYS_INDISPENSABLES.findIndex(s => s.id === spray.id));
              onSprayClick(spray);
            }}
            className="rounded-2xl p-2.5 flex flex-col items-center transition-all active:scale-95"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)',
              border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'}`,
              backdropFilter: 'blur(10px)',
            }}
          >
            <span className="text-xl mb-1">{spray.emoji}</span>
            <span
              className="text-[8px] font-semibold leading-tight text-center line-clamp-2"
              style={{ color: theme.textSecondary }}
            >
              {spray.nom.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
