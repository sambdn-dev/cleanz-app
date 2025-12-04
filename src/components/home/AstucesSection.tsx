'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ASTUCES_DU_JOUR } from '@/data/astuces';
import { Astuce } from '@/types';
import { Star, Clock } from 'lucide-react';

interface AstucesSectionProps {
  onAstuceClick: (astuce: Astuce) => void;
}

export const AstucesSection = ({ onAstuceClick }: AstucesSectionProps) => {
  const { theme, darkMode } = useTheme();

  return (
    <div className="mb-5">
      <SectionTitle
        badge="Recettes express"
      >
        <span className="text-base mr-2">✨</span>Astuces du jour
      </SectionTitle>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {ASTUCES_DU_JOUR.map((astuce) => (
          <button
            key={astuce.id}
            onClick={() => onAstuceClick(astuce)}
            className="flex-shrink-0 w-44 rounded-2xl overflow-hidden text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
          >
            {/* Gradient header */}
            <div
              className="p-4 pb-3"
              style={{ background: astuce.gradient }}
            >
              <span className="text-3xl block mb-1">{astuce.emoji}</span>
              <h4 className="text-sm font-bold text-white">{astuce.titre}</h4>
            </div>

            {/* Content */}
            <div
              className="p-3"
              style={{ background: theme.bgCard }}
            >
              {/* Rating and time */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-semibold" style={{ color: theme.textPrimary }}>
                    {astuce.note}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" style={{ color: theme.textMuted }} />
                  <span className="text-[10px]" style={{ color: theme.textMuted }}>
                    {astuce.duree}
                  </span>
                </div>
              </div>

              {/* Resume */}
              <p
                className="text-[10px] leading-snug line-clamp-2"
                style={{ color: theme.textSecondary }}
              >
                {astuce.resume}
              </p>

              {/* Ingredients preview */}
              <div className="flex gap-1 mt-2 flex-wrap">
                {astuce.ingredients.slice(0, 2).map((ing, i) => (
                  <span
                    key={i}
                    className="text-[8px] px-1.5 py-0.5 rounded-full"
                    style={{
                      background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      color: theme.textMuted
                    }}
                  >
                    {ing}
                  </span>
                ))}
                {astuce.ingredients.length > 2 && (
                  <span
                    className="text-[8px] px-1.5 py-0.5 rounded-full"
                    style={{
                      background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      color: theme.textMuted
                    }}
                  >
                    +{astuce.ingredients.length - 2}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
