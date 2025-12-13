'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Search } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  emoji?: string;
  searchQuery?: string;
}

export const EmptyState = ({
  title = 'Aucun résultat',
  message = 'Essayez avec d\'autres mots-clés',
  emoji = '🔍',
  searchQuery,
}: EmptyStateProps) => {
  const { theme, darkMode } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Animated icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)'
            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
        }}
      >
        <span className="text-4xl">{emoji}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-2" style={{ color: theme.textPrimary }}>
        {title}
      </h3>

      {/* Search query display */}
      {searchQuery && (
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
          }}
        >
          <Search className="w-3.5 h-3.5" style={{ color: theme.textMuted }} />
          <span className="text-sm" style={{ color: theme.textSecondary }}>
            "{searchQuery}"
          </span>
        </div>
      )}

      {/* Message */}
      <p className="text-sm text-center max-w-xs" style={{ color: theme.textMuted }}>
        {message}
      </p>

      {/* Suggestions */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {['Four', 'Vitres', 'WC', 'Calcaire'].map((suggestion) => (
          <span
            key={suggestion}
            className="text-xs px-3 py-1.5 rounded-full"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,105,180,0.1)',
              color: darkMode ? theme.textSecondary : '#FF69B4',
            }}
          >
            {suggestion}
          </span>
        ))}
      </div>
    </div>
  );
};
