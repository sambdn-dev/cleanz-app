'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Spray } from '@/types';
import { X, AlertTriangle, Lightbulb, Clock } from 'lucide-react';

interface SprayModalProps {
  spray: Spray;
  onClose: () => void;
}

export const SprayModal = ({ spray, onClose }: SprayModalProps) => {
  const { theme, darkMode } = useTheme();

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-3xl animate-slide-up"
        style={{ background: theme.bgModal }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div
          className="relative p-6 pb-8 rounded-t-3xl"
          style={{ background: spray.gradient }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Badge */}
          <span className="inline-block text-xs bg-white/30 text-white px-3 py-1 rounded-full font-semibold mb-3">
            {spray.badge}
          </span>

          {/* Emoji and title */}
          <div className="flex items-center gap-3">
            <span className="text-5xl">{spray.emoji}</span>
            <h2 className="text-2xl font-bold text-white">{spray.nom}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Ingredients & Dosages */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
              <span className="text-base">🧪</span> Ingr&eacute;dients &amp; Dosages
            </h3>
            <div className="space-y-2">
              {spray.ingredients.map((ing, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
                >
                  <span className="text-sm" style={{ color: theme.textPrimary }}>{ing.nom}</span>
                  <span className="text-sm font-semibold text-emerald-500">{ing.quantite}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
              <span className="text-base">📝</span> Instructions
            </h3>
            <p
              className="text-sm leading-relaxed p-3 rounded-xl"
              style={{
                color: theme.textSecondary,
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
              }}
            >
              {spray.instructions}
            </p>
          </div>

          {/* Surfaces compatibles */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
              <span className="text-base">✅</span> Surfaces compatibles
            </h3>
            <div className="flex flex-wrap gap-2">
              {spray.surfaces.map((surface, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{
                    background: darkMode ? 'rgba(79, 209, 197, 0.2)' : 'rgba(79, 209, 197, 0.15)',
                    color: '#4FD1C5'
                  }}
                >
                  {surface}
                </span>
              ))}
            </div>
          </div>

          {/* Precautions */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Pr&eacute;cautions
            </h3>
            <div className="space-y-2">
              {spray.precautions.map((precaution, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 rounded-xl"
                  style={{
                    background: darkMode ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.1)'
                  }}
                >
                  <span className="text-amber-500 text-xs mt-0.5">⚠️</span>
                  <span className="text-sm" style={{ color: theme.textSecondary }}>{precaution}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Astuces Pro */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
              <Lightbulb className="w-4 h-4 text-violet-500" /> Astuces Pro
            </h3>
            <div className="space-y-2">
              {spray.astuces.map((astuce, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 rounded-xl"
                  style={{
                    background: darkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)'
                  }}
                >
                  <span className="text-violet-500 text-xs mt-0.5">💡</span>
                  <span className="text-sm" style={{ color: theme.textSecondary }}>{astuce}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conservation */}
          <div
            className="flex items-center gap-3 p-4 rounded-xl"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
            }}
          >
            <Clock className="w-5 h-5 text-pink-500" />
            <div>
              <span className="text-xs font-semibold block" style={{ color: theme.textMuted }}>Conservation</span>
              <span className="text-sm font-medium" style={{ color: theme.textPrimary }}>{spray.conservation}</span>
            </div>
          </div>
        </div>

        {/* Bottom padding for safe area */}
        <div className="h-6" />
      </div>
    </div>
  );
};
