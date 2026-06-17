'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useInView } from '@/hooks/useInView';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';

interface Stat {
  emoji: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
  tintLight: string;
  tintDark: string;
  accent: string;
}

const STATS: Stat[] = [
  { emoji: '💰', numericValue: 280, suffix: '€', label: 'économisés / an', tintLight: 'rgba(16,185,129,0.10)', tintDark: 'rgba(16,185,129,0.16)', accent: '#10B981' },
  { emoji: '🌍', numericValue: 85, prefix: '-', suffix: '%', label: 'de plastique', tintLight: 'rgba(59,130,246,0.10)', tintDark: 'rgba(59,130,246,0.16)', accent: '#3B82F6' },
  { emoji: '🌿', numericValue: 0, label: 'produit toxique', tintLight: 'rgba(236,72,153,0.10)', tintDark: 'rgba(236,72,153,0.16)', accent: '#EC4899' },
  { emoji: '✨', numericValue: 7, label: 'essentiels suffisent', tintLight: 'rgba(245,158,11,0.10)', tintDark: 'rgba(245,158,11,0.16)', accent: '#F59E0B' },
];

const AnimatedStat = ({ stat, start }: { stat: Stat; start: boolean }) => {
  const { theme, darkMode } = useTheme();
  const value = useAnimatedNumber(stat.numericValue, { start });
  return (
    <div
      className="rounded-2xl p-3.5 flex items-center gap-3"
      style={{
        background: darkMode ? stat.tintDark : stat.tintLight,
        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
      }}
    >
      <span
        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)' }}
      >
        {stat.emoji}
      </span>
      <div className="min-w-0">
        <p className="text-lg font-black leading-none tabular-nums" style={{ color: stat.accent }}>
          {stat.prefix || ''}{Math.round(value)}{stat.suffix || ''}
        </p>
        <p className="text-[10.5px] font-medium leading-tight mt-1 truncate" style={{ color: theme.textSecondary }}>
          {stat.label}
        </p>
      </div>
    </div>
  );
};

export const ImpactStrip = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🌱</span>
        <h2 className="font-display text-[16px] font-bold" style={{ color: theme.textPrimary }}>
          Pourquoi passer au naturel ?
        </h2>
      </div>

      <div ref={ref} className="grid grid-cols-2 gap-2.5">
        {STATS.map((s) => (
          <AnimatedStat key={s.label} stat={s} start={inView} />
        ))}
      </div>
    </div>
  );
};
