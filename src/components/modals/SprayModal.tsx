'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Spray } from '@/types';
import { AlertTriangle, Clock } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { SectionTitle, Steps, Chip, Callout, ACCENT } from '@/components/ui/ModalParts';
import { shouldUseDarkText } from '@/utils/gradientUtils';

interface SprayModalProps {
  spray: Spray;
  onClose: () => void;
}

export const SprayModal = ({ spray, onClose }: SprayModalProps) => {
  const { theme, darkMode } = useTheme();
  const hasImage = !!spray.imageUrl;
  const useDarkHeaderText = !hasImage && shouldUseDarkText(spray.gradient);

  // Découpe les instructions (chaîne unique) en étapes courtes.
  const steps = spray.instructions
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.endsWith('.') ? s : s + '.'));

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      headerGradient={spray.gradient}
      headerImageUrl={spray.imageUrl}
      headerImageUrlDark={spray.imageUrlDark}
      useDarkHeaderText={useDarkHeaderText}
      headerContent={
        <div
          className={hasImage ? 'flex flex-col justify-end' : ''}
          style={hasImage ? { minHeight: 140 } : undefined}
        >
          <span
            className="inline-block self-start text-xs px-3 py-1 rounded-full font-semibold mb-3"
            style={{
              background: hasImage ? 'rgba(255,255,255,0.92)' : (useDarkHeaderText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.3)'),
              color: hasImage ? '#2D1F3D' : (useDarkHeaderText ? '#374151' : '#FFFFFF'),
            }}
          >
            {spray.badge}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-5xl" style={hasImage ? { filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' } : undefined}>
              {spray.emoji}
            </span>
            <h2
              className="font-display text-xl font-extrabold"
              style={{
                color: hasImage ? '#FFFFFF' : (useDarkHeaderText ? '#1F2937' : '#FFFFFF'),
                textShadow: hasImage ? '0 2px 14px rgba(0,0,0,0.55)' : undefined,
              }}
            >
              {spray.nom}
            </h2>
          </div>
        </div>
      }
    >
      {/* Ingrédients & dosages */}
      <div className="mb-6">
        <SectionTitle accent={ACCENT.sage}>Ingrédients &amp; dosages</SectionTitle>
        <div className="space-y-0">
          {spray.ingredients.map((ing, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2.5 border-b last:border-0"
              style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
            >
              <span className="text-[15px]" style={{ color: theme.textPrimary }}>{ing.nom}</span>
              <span className="text-sm font-semibold tabular-nums" style={{ color: theme.textSecondary }}>{ing.quantite}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Préparation */}
      <div className="mb-6">
        <SectionTitle accent={ACCENT.brand}>Préparation</SectionTitle>
        {steps.length > 1 ? (
          <Steps items={steps} />
        ) : (
          <p className="text-[15px] leading-[1.65]" style={{ color: theme.textSecondary }}>{spray.instructions}</p>
        )}
      </div>

      {/* Surfaces compatibles */}
      <div className="mb-6">
        <SectionTitle accent={ACCENT.sage}>Surfaces compatibles</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {spray.surfaces.map((surface, index) => (
            <Chip key={index} tone="sage">{surface}</Chip>
          ))}
        </div>
      </div>

      {/* Précautions */}
      <div className="mb-6">
        <Callout accent={ACCENT.clay} icon={<AlertTriangle className="w-4 h-4" style={{ color: ACCENT.clay }} />} title="Précautions">
          {spray.precautions.map((precaution, index) => (
            <div key={index} className="flex items-baseline gap-2">
              <span className="text-sm leading-none" style={{ color: ACCENT.clay }}>•</span>
              <span className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{precaution}</span>
            </div>
          ))}
        </Callout>
      </div>

      {/* Astuces pro */}
      <div className="mb-6">
        <Callout accent={ACCENT.sage} icon={<span className="text-base leading-none">💡</span>} title="Le geste en plus">
          {spray.astuces.map((astuce, index) => (
            <div key={index} className="flex items-baseline gap-2">
              <span className="text-sm leading-none" style={{ color: ACCENT.sage }}>•</span>
              <span className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{astuce}</span>
            </div>
          ))}
        </Callout>
      </div>

      {/* Conservation */}
      <div
        className="flex items-center gap-3 py-3 border-y"
        style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
      >
        <Clock className="w-4 h-4 flex-shrink-0" style={{ color: ACCENT.blue }} />
        <span className="text-xs" style={{ color: theme.textMuted }}>Se conserve</span>
        <span className="text-sm font-medium ml-auto" style={{ color: theme.textPrimary }}>{spray.conservation}</span>
      </div>
    </Modal>
  );
};
