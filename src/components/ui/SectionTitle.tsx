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
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-sm font-bold flex items-center gap-2" style={{ color: theme.textPrimary }}>
        {Icon && <Icon className={`w-4 h-4 ${iconColor}`} />}
        {children}
        {badge && (
          <span className="text-[10px] px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full font-medium">
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
