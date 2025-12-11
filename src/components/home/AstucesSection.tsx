'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ASTUCES_DU_JOUR } from '@/data/astuces';
import { Astuce } from '@/types';
import { Star, Clock, ChevronRight } from 'lucide-react';

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

      <div className="space-y-3">
        {ASTUCES_DU_JOUR.map((astuce) => (
          <button
            key={astuce.id}
            onClick={() => onAstuceClick(astuce)}
            className="w-full rounded-2xl overflow-hidden text-left transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
              border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
              boxShadow: darkMode
                ? '0 4px 15px rgba(0,0,0,0.2)'
                : '0 4px 15px rgba(0,0,0,0.05)'
            }}
          >
            <div className="flex items-stretch">
              {/* Gradient accent bar */}
              <div
                className="w-2 flex-shrink-0"
                style={{ background: astuce.gradient }}
              />

              {/* Content */}
              <div className="flex-1 p-4">
                <div className="flex items-start gap-3">
                  {/* Emoji with gradient background */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: astuce.gradient }}
                  >
                    <span className="text-2xl">{astuce.emoji}</span>
                  </div>

                  {/* Text content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm mb-1" style={{ color: theme.textPrimary }}>
                      {astuce.titre}
                    </h4>
                    <p
                      className="text-xs leading-relaxed line-clamp-2"
                      style={{ color: theme.textSecondary }}
                    >
                      {astuce.resume}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold" style={{ color: theme.textPrimary }}>
                          {astuce.note}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" style={{ color: theme.textMuted }} />
                        <span className="text-xs" style={{ color: theme.textMuted }}>
                          {astuce.duree}
                        </span>
                      </div>
                      {/* Ingredients tags */}
                      <div className="flex gap-1 flex-wrap">
                        {astuce.ingredients.slice(0, 2).map((ing, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{
                              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                              color: theme.textMuted
                            }}
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    className="w-5 h-5 flex-shrink-0 self-center"
                    style={{ color: theme.textMuted }}
                  />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
