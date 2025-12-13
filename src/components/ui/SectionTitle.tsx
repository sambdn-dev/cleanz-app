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
      <h2 className="text-sm font-bold flex items-center gap-2" style={{ color: theme.textPrimary }}>
        {Icon && <Icon className={`w-4 h-4 ${iconColor}`} />}
        {children}
        {badge && (
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{
              background: darkMode ? 'rgba(236, 72, 153, 0.25)' : 'rgba(236, 72, 153, 0.15)',
              color: darkMode ? '#F472B6' : '#DB2777'
            }}
          >
            {badge}
          </span>
        )}
      </h2>
      {action && (
        <button
          onClick={onAction}
          className="text-xs font-semibold text-violet-500 hover:text-violet-600 transition-colors"
        >
          {action}
        </button>
      )}
    </div>
  );
};
