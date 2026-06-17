'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Gauge } from 'lucide-react';

type Difficulte = 'Facile' | 'Moyen' | 'Avancé';

const COLORS: Record<Difficulte, { light: string; dark: string; fg: string; fgDark: string }> = {
  Facile: { light: 'rgba(34,197,94,0.15)', dark: 'rgba(34,197,94,0.22)', fg: '#15803D', fgDark: '#4ADE80' },
  Moyen: { light: 'rgba(245,158,11,0.15)', dark: 'rgba(245,158,11,0.22)', fg: '#B45309', fgDark: '#FBBF24' },
  Avancé: { light: 'rgba(244,63,94,0.15)', dark: 'rgba(244,63,94,0.22)', fg: '#BE123C', fgDark: '#FB7185' },
};

export const DifficultyBadge = ({ value, showIcon = true }: { value: Difficulte; showIcon?: boolean }) => {
  const { darkMode } = useTheme();
  const c = COLORS[value] ?? COLORS.Facile;
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold"
      style={{ background: darkMode ? c.dark : c.light, color: darkMode ? c.fgDark : c.fg }}
      aria-label={`Difficulté : ${value}`}
    >
      {showIcon && <Gauge className="w-3 h-3" aria-hidden />}
      {value}
    </span>
  );
};
