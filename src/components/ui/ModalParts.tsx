'use client';

import { ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Vocabulaire de design partagé pour les modales.
 * Objectif : un rendu « éditorial / artisanal » plutôt que « template IA ».
 * - titres avec fine barre d'accent (au lieu d'une icône sur chaque section)
 * - étapes reliées par un fil conducteur, numéros neutres (pas de dégradé)
 * - pastilles aux tons naturels (sauge, argile, neutre chaud) plutôt que violet/rose saturé
 */

// Tons naturels et sourds, déclinés clair / sombre
export const TONES = {
  neutral: { l: 'rgba(120,113,108,0.10)', d: 'rgba(255,255,255,0.07)', fl: '#57534E', fd: '#D6D3D1' },
  sage: { l: 'rgba(122,140,110,0.16)', d: 'rgba(140,168,136,0.18)', fl: '#4B5D3F', fd: '#B8CBAE' },
  clay: { l: 'rgba(192,133,82,0.15)', d: 'rgba(200,150,100,0.18)', fl: '#9A5B2E', fd: '#E0B088' },
  brand: { l: 'rgba(255,105,180,0.12)', d: 'rgba(255,133,192,0.18)', fl: '#BE185D', fd: '#F9A8D4' },
} as const;

export type Tone = keyof typeof TONES;

// Couleurs des barres d'accent des titres de section
export const ACCENT: Record<string, string> = {
  sage: '#8BA888',
  clay: '#C08552',
  brand: '#FF69B4',
  blue: '#7FA8C9',
  amber: '#D9A441',
  neutral: '#A8A29E',
};

/** Titre de section éditorial : fine barre d'accent + typo display, icône optionnelle pour les sections sensibles. */
export const SectionTitle = ({
  children,
  accent = ACCENT.neutral,
  icon,
}: {
  children: ReactNode;
  accent?: string;
  icon?: ReactNode;
}) => {
  const { theme } = useTheme();
  return (
    <h3
      className="font-display text-[15px] font-bold mb-3 flex items-center gap-2.5"
      style={{ color: theme.textPrimary }}
    >
      <span
        className="inline-block w-[3px] h-[14px] rounded-full flex-shrink-0"
        style={{ background: accent }}
        aria-hidden
      />
      {icon}
      {children}
    </h3>
  );
};

/** Pastille / tag aux tons naturels. */
export const Chip = ({ children, tone = 'neutral' }: { children: ReactNode; tone?: Tone }) => {
  const { darkMode } = useTheme();
  const t = TONES[tone];
  return (
    <span
      className="text-xs px-3 py-1.5 rounded-full font-medium"
      style={{ background: darkMode ? t.d : t.l, color: darkMode ? t.fd : t.fl }}
    >
      {children}
    </span>
  );
};

/** Liste d'étapes reliées par un fil conducteur, numéros sobres. */
export const Steps = ({ items }: { items: string[] }) => {
  const { theme, darkMode } = useTheme();
  const line = darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.09)';
  return (
    <ol className="relative ml-0.5">
      {items.map((step, i) => (
        <li key={i} className="relative flex gap-4 pb-5 last:pb-0">
          {i < items.length - 1 && (
            <span className="absolute left-[13px] top-8 bottom-0 w-px" style={{ background: line }} aria-hidden />
          )}
          <span
            className="relative z-10 flex-shrink-0 grid place-items-center w-[27px] h-[27px] rounded-full text-[13px] font-bold tabular-nums"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)',
              color: theme.textSecondary,
              border: `1px solid ${darkMode ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.08)'}`,
            }}
          >
            {i + 1}
          </span>
          <p className="flex-1 pt-[3px] text-[15px] leading-[1.65]" style={{ color: theme.textSecondary }}>
            {step}
          </p>
        </li>
      ))}
    </ol>
  );
};

/** Encadré discret avec liseré d'accent à gauche (précautions, astuces, conservation…). */
export const Callout = ({
  children,
  accent = ACCENT.amber,
  icon,
  title,
}: {
  children: ReactNode;
  accent?: string;
  icon?: ReactNode;
  title?: string;
}) => {
  const { theme, darkMode } = useTheme();
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: darkMode ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.025)',
        borderLeft: `3px solid ${accent}`,
      }}
    >
      {(icon || title) && (
        <div className="flex items-center gap-2 mb-2">
          {icon}
          {title && (
            <span className="text-xs font-bold" style={{ color: theme.textPrimary }}>
              {title}
            </span>
          )}
        </div>
      )}
      <div className="space-y-1.5">{children}</div>
    </div>
  );
};

/** Ligne meta inline compacte (un seul bloc avec séparateurs, pas une grille de cartes). */
export const MetaBar = ({ items }: { items: { label: string; value: ReactNode; color?: string }[] }) => {
  const { theme, darkMode } = useTheme();
  return (
    <div
      className="flex items-stretch rounded-2xl overflow-hidden mb-5"
      style={{
        background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)',
        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'}`,
      }}
    >
      {items.map((it, i) => (
        <div
          key={i}
          className="flex-1 px-3 py-3 text-center"
          style={{ borderLeft: i === 0 ? 'none' : `1px solid ${darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'}` }}
        >
          <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color: theme.textMuted }}>
            {it.label}
          </p>
          <div className="text-sm font-bold flex items-center justify-center" style={{ color: it.color || theme.textPrimary }}>
            {it.value}
          </div>
        </div>
      ))}
    </div>
  );
};
