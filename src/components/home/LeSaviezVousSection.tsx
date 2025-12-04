'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { TIPS, Tip } from '@/data/tips';
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';

export const LeSaviezVousSection = () => {
  const { theme, darkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTip = () => {
    setCurrentIndex((prev) => (prev + 1) % TIPS.length);
  };

  const prevTip = () => {
    setCurrentIndex((prev) => (prev - 1 + TIPS.length) % TIPS.length);
  };

  const currentTip = TIPS[currentIndex];

  const categoryColors: Record<Tip['categorie'], string> = {
    eco: darkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.15)',
    astuce: darkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)',
    sante: darkMode ? 'rgba(236, 72, 153, 0.2)' : 'rgba(236, 72, 153, 0.15)',
    economie: darkMode ? 'rgba(251, 191, 36, 0.2)' : 'rgba(251, 191, 36, 0.15)'
  };

  const categoryTextColors: Record<Tip['categorie'], string> = {
    eco: '#22C55E',
    astuce: '#8B5CF6',
    sante: '#EC4899',
    economie: '#FBBF24'
  };

  const categoryLabels: Record<Tip['categorie'], string> = {
    eco: 'Écologie',
    astuce: 'Astuce',
    sante: 'Santé',
    economie: 'Économie'
  };

  return (
    <div className="mb-5">
      <SectionTitle
        icon={Lightbulb}
        iconColor="text-amber-500"
      >
        Le saviez-vous ?
      </SectionTitle>

      {/* Card */}
      <div
        className="relative p-5 rounded-2xl overflow-hidden"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'
        }}
      >
        {/* Category badge */}
        <span
          className="inline-block text-[10px] px-2.5 py-1 rounded-full font-semibold mb-3"
          style={{
            background: categoryColors[currentTip.categorie],
            color: categoryTextColors[currentTip.categorie]
          }}
        >
          {categoryLabels[currentTip.categorie]}
        </span>

        {/* Content */}
        <div className="flex items-start gap-3 mb-4">
          <span className="text-3xl">{currentTip.emoji}</span>
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-1" style={{ color: theme.textPrimary }}>
              {currentTip.titre}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
              {currentTip.contenu}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevTip}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }}
          >
            <ChevronLeft className="w-4 h-4" style={{ color: theme.textMuted }} />
          </button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {TIPS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-4' : ''
                }`}
                style={{
                  background: index === currentIndex
                    ? 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)'
                    : darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
                }}
              />
            ))}
          </div>

          <button
            onClick={nextTip}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }}
          >
            <ChevronRight className="w-4 h-4" style={{ color: theme.textMuted }} />
          </button>
        </div>
      </div>
    </div>
  );
};
