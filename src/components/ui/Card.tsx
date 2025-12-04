'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card = ({ children, className = '', style = {}, onClick, hoverable = false }: CardProps) => {
  const { theme } = useTheme();

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl transition-all ${hoverable ? 'hover:scale-105 active:scale-95 cursor-pointer' : ''} ${className}`}
      style={{
        background: theme.bgCard,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: theme.shadowCard,
        ...style
      }}
    >
      {children}
    </div>
  );
};
