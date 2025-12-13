'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder = "Que voulez-vous nettoyer ?" }: SearchBarProps) => {
  const { theme, darkMode } = useTheme();

  return (
    <div
      className="relative"
      style={{
        background: theme.bgInput,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '16px',
        boxShadow: theme.shadowCard
      }}
    >
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: theme.textMuted }} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full py-3.5 pl-12 pr-4 bg-transparent outline-none text-sm font-medium ${
          darkMode ? 'placeholder:text-gray-400' : 'placeholder:text-gray-500'
        }`}
        style={{ color: theme.textPrimary }}
      />
    </div>
  );
};
