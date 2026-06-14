'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  icon?: LucideIcon;
  iconColor?: string;
  badge?: string;
  action?: string;
  onAction?: () => void;
}

export const SectionTitle = ({
  children,
  icon: Icon,
  iconColor = 'text-amber-500',
  badge,
  action,
  onAction
}: SectionTitleProps) => {
  const { theme, darkMode } = useTheme();

  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-[15px] font-bold flex items-center gap-2" style={{ color: theme.textPrimary }}>
        {Icon && <Icon className={`w-4 h-4 ${iconColor}`} />}
        {children}
        {badge && (
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(45,31,61,0.06)',
              color: theme.textMuted,
            }}
          >
            {badge}
          </span>
        )}
      </h2>
      {action && (
        <button
          onClick={onAction}
          className="text-xs font-semibold transition-colors"
          style={{ color: theme.accentPink }}
        >
          {action}
        </button>
      )}
    </div>
  );
};
