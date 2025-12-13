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
      <SectionTitle badge="Recettes express">
        <span className="text-base mr-2">✨</span>Astuces du jour
      </SectionTitle>

      {/* Horizontal scroll container - 2 cards visible at a time */}
      <div className="flex gap-3 overflow-x-auto py-1 -mx-4 px-4 scrollbar-hide">
        {ASTUCES_DU_JOUR.map((astuce) => (
          <button
            key={astuce.id}
            onClick={() => onAstuceClick(astuce)}
            className="flex-shrink-0 w-[calc(50%-6px)] rounded-2xl p-[2px] text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: astuce.gradient,
            }}
          >
            {/* Inner card */}
            <div
              className="rounded-[14px] p-3 h-full"
              style={{
                background: darkMode ? 'rgba(26,10,46,0.95)' : 'rgba(255,255,255,0.95)',
              }}
            >
              {/* Header with emoji and title */}
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: astuce.gradient }}
                >
                  <span className="text-lg">{astuce.emoji}</span>
                </div>
                <h4 className="font-bold text-xs leading-tight line-clamp-2" style={{ color: theme.textPrimary }}>
                  {astuce.titre}
                </h4>
              </div>

              {/* Description */}
              <p
                className="text-[10px] leading-relaxed line-clamp-2 mb-2"
                style={{ color: theme.textSecondary }}
              >
                {astuce.resume}
              </p>

              {/* Meta info */}
              <div className="flex items-center gap-2">
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
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
