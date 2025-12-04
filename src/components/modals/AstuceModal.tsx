'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Astuce } from '@/types';
import { X, Clock, Star, Lightbulb } from 'lucide-react';

interface AstuceModalProps {
  astuce: Astuce;
  onClose: () => void;
}

export const AstuceModal = ({ astuce, onClose }: AstuceModalProps) => {
  const { theme, darkMode } = useTheme();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md max-h-[85vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col animate-slideUp"
        style={{ background: theme.bgModal }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div
          className="relative p-6 pb-8 rounded-t-3xl flex-shrink-0"
          style={{ background: astuce.gradient }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Surface badge */}
          <span className="inline-block text-xs bg-white/30 text-white px-3 py-1 rounded-full font-semibold mb-3">
            {astuce.surface}
          </span>

          {/* Emoji and title */}
          <div className="flex items-center gap-4">
            <span className="text-5xl">{astuce.emoji}</span>
            <div>
              <h2 className="text-2xl font-bold text-white">{astuce.titre}</h2>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span className="text-white/90 text-sm font-semibold">{astuce.note}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-white/80" />
                  <span className="text-white/80 text-sm">{astuce.duree}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-5">
          {/* Resume */}
          <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
            {astuce.resume}
          </p>

          {/* Ingrédients */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
              <span className="text-base">🧪</span> Ingr&eacute;dients n&eacute;cessaires
            </h3>
            <div className="flex flex-wrap gap-2">
              {astuce.ingredients.map((ing, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{
                    background: darkMode ? 'rgba(79, 209, 197, 0.2)' : 'rgba(79, 209, 197, 0.15)',
                    color: '#4FD1C5'
                  }}
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
              <span className="text-base">📝</span> Instructions
            </h3>
            <div
              className="p-4 rounded-xl"
              style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
            >
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                {astuce.instructions}
              </p>
            </div>
          </div>

          {/* Conseil Pro */}
          <div
            className="p-4 rounded-2xl"
            style={{
              background: darkMode
                ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)'
                : 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
            }}
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-violet-500 mt-0.5" />
              <div>
                <span className="text-xs font-bold block mb-1" style={{ color: theme.textPrimary }}>Conseil Pro</span>
                <span className="text-xs" style={{ color: theme.textSecondary }}>
                  {astuce.conseil}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
