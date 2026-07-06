'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ASTUCES_DU_JOUR } from '@/data/astuces';
import { Astuce } from '@/types';
import { shouldUseDarkText } from '@/utils/gradientUtils';
import { haptic } from '@/utils/haptics';
import { Star, Clock, ChevronRight } from 'lucide-react';

interface AstucesSectionProps {
  onAstuceClick: (astuce: Astuce) => void;
}

const AstuceCard = ({ astuce, onClick }: { astuce: Astuce; onClick: () => void }) => {
  const { theme, darkMode } = useTheme();
  const darkText = shouldUseDarkText(astuce.gradient);
  const headText = darkText ? '#1F2937' : '#FFFFFF';
  const chipBg = darkText ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.22)';

  return (
    <button
      onClick={() => { haptic('light'); onClick(); }}
      className="flex-shrink-0 w-[188px] rounded-3xl overflow-hidden text-left transition-transform active:scale-[0.98]"
      style={{
        background: darkMode ? 'rgba(255,255,255,0.05)' : '#fff',
        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`,
        boxShadow: darkMode ? '0 8px 20px rgba(0,0,0,0.28)' : '0 8px 20px rgba(80,60,120,0.12)',
      }}
    >
      {/* En-tête coloré */}
      <div className="relative h-[70px] px-3 pt-3" style={{ background: astuce.gradient }}>
        {/* Emoji décoratif géant en filigrane */}
        <span
          className="absolute -bottom-3 -right-2 text-6xl opacity-20 pointer-events-none select-none"
          style={{ color: headText }}
          aria-hidden
        >
          {astuce.emoji}
        </span>

        <div className="relative flex items-start justify-between">
          <span
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: chipBg, backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
            aria-hidden
          >
            {astuce.emoji}
          </span>
          {/* Note */}
          <span
            className="flex items-center gap-1 px-2 py-1 rounded-full"
            style={{ background: chipBg, backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
          >
            <Star className="w-3 h-3" style={{ color: darkText ? '#B45309' : '#FDE047', fill: darkText ? '#B45309' : '#FDE047' }} />
            <span className="text-[11px] font-bold" style={{ color: headText }}>{astuce.note}</span>
          </span>
        </div>
      </div>

      {/* Corps */}
      <div className="p-3">
        <h4 className="font-display font-extrabold text-[15px] leading-tight mb-1" style={{ color: theme.textPrimary }}>
          {astuce.titre}
        </h4>
        <p className="text-[11px] leading-snug line-clamp-2 mb-2.5" style={{ color: theme.textSecondary }}>
          {astuce.resume}
        </p>

        {/* Ingrédients clés */}
        <div className="flex flex-wrap gap-1 mb-2.5">
          {astuce.ingredients.slice(0, 2).map((ing, i) => (
            <span
              key={i}
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
              style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', color: theme.textMuted }}
            >
              {ing}
            </span>
          ))}
          {astuce.ingredients.length > 2 && (
            <span
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
              style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', color: theme.textMuted }}
            >
              +{astuce.ingredients.length - 2}
            </span>
          )}
        </div>

        {/* Méta : durée + CTA */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" style={{ color: theme.textMuted }} />
            <span className="text-[11px] font-medium" style={{ color: theme.textMuted }}>{astuce.duree}</span>
          </span>
          <span className="flex items-center gap-0.5 text-[11px] font-bold" style={{ color: theme.accentPink }}>
            Voir <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </button>
  );
};

export const AstucesSection = ({ onAstuceClick }: AstucesSectionProps) => {
  return (
    <div className="mb-5">
      <SectionTitle badge="Recettes express">
        <span className="text-base mr-2">✨</span>Astuces du jour
      </SectionTitle>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide edge-fade-x -mx-4 px-4 pt-1 pb-3 snap-x snap-mandatory">
        {ASTUCES_DU_JOUR.map((astuce) => (
          <div key={astuce.id} className="snap-start">
            <AstuceCard astuce={astuce} onClick={() => onAstuceClick(astuce)} />
          </div>
        ))}
      </div>
    </div>
  );
};
