'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { Spray } from '@/types';
import { AlertTriangle, Lightbulb, Clock } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { shouldUseDarkText } from '@/utils/gradientUtils';

interface SprayModalProps {
  spray: Spray;
  onClose: () => void;
}

export const SprayModal = ({ spray, onClose }: SprayModalProps) => {
  const { theme, darkMode } = useTheme();

  // Détermine si le texte du header doit être sombre (pour les gradients clairs)
  const useDarkHeaderText = shouldUseDarkText(spray.gradient);

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      headerGradient={spray.gradient}
      useDarkHeaderText={useDarkHeaderText}
      headerContent={
        <>
          {spray.imageUrl && (
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={spray.imageUrl}
                alt={spray.nom}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            </div>
          )}
          <div
            className={spray.imageUrl ? 'relative z-10 flex flex-col justify-end' : ''}
            style={spray.imageUrl ? { minHeight: 168 } : undefined}
          >
            <span
              className="inline-block self-start text-xs px-3 py-1 rounded-full font-semibold mb-3"
              style={{
                background: spray.imageUrl ? 'rgba(255,255,255,0.85)' : (useDarkHeaderText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.3)'),
                color: spray.imageUrl ? '#2D1F3D' : (useDarkHeaderText ? '#374151' : '#FFFFFF')
              }}
            >
              {spray.badge}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-5xl" style={spray.imageUrl ? { filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))' } : undefined}>{spray.emoji}</span>
              <h2
                className="text-2xl font-bold"
                style={{
                  color: spray.imageUrl ? '#FFFFFF' : (useDarkHeaderText ? '#1F2937' : '#FFFFFF'),
                  textShadow: spray.imageUrl ? '0 2px 12px rgba(0,0,0,0.5)' : undefined,
                }}
              >
                {spray.nom}
              </h2>
            </div>
          </div>
        </>
      }
    >
      {/* Ingredients & Dosages */}
      <div className="mb-5">
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
          <span className="text-base">🧪</span> Ingrédients &amp; Dosages
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
      <div className="mb-5">
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
      <div className="mb-5">
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
      <div className="mb-5">
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
          <AlertTriangle className="w-4 h-4 text-amber-500" /> Précautions
        </h3>
        <div
          className="p-3 rounded-xl space-y-2"
          style={{
            background: darkMode ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.1)'
          }}
        >
          {spray.precautions.map((precaution, index) => (
            <div
              key={index}
              className="flex items-baseline gap-2"
            >
              <span className="text-amber-500 text-sm leading-none">•</span>
              <span className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{precaution}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Astuces Pro */}
      <div className="mb-5">
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
          <Lightbulb className="w-4 h-4 text-violet-500" /> Astuces pro
        </h3>
        <div
          className="p-3 rounded-xl space-y-2"
          style={{
            background: darkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)'
          }}
        >
          {spray.astuces.map((astuce, index) => (
            <div
              key={index}
              className="flex items-baseline gap-2"
            >
              <span className="text-base leading-none">💡</span>
              <span className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{astuce}</span>
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
    </Modal>
  );
};
