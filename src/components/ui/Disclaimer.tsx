'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { AlertTriangle } from 'lucide-react';

interface DisclaimerProps {
  variant?: 'compact' | 'full';
}

export const Disclaimer = ({ variant = 'compact' }: DisclaimerProps) => {
  const { theme, darkMode } = useTheme();

  if (variant === 'compact') {
    return (
      <div
        className="flex items-start gap-2 p-3 rounded-xl text-[10px]"
        style={{
          background: darkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.08)',
          color: darkMode ? '#FCD34D' : '#B45309'
        }}
      >
        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Attention :</strong> Testez toujours sur une petite zone. Cleanz ne peut être tenu responsable en cas de mauvaise utilisation.
        </p>
      </div>
    );
  }

  return (
    <div
      className="p-4 rounded-xl"
      style={{
        background: darkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.08)'
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-4 h-4" style={{ color: darkMode ? '#FCD34D' : '#D97706' }} />
        <h4 className="font-bold text-xs" style={{ color: darkMode ? '#FCD34D' : '#B45309' }}>
          Conseils de sécurité
        </h4>
      </div>
      <ul className="space-y-1.5 text-[11px]" style={{ color: darkMode ? '#FDE68A' : '#92400E' }}>
        <li className="flex items-start gap-2">
          <span>!</span>
          <span>Toujours lire les notices avant utilisation pour éviter les erreurs de dosage</span>
        </li>
        <li className="flex items-start gap-2">
          <span>!</span>
          <span>Tester sur une petite zone cachée avant de nettoyer une grande surface</span>
        </li>
        <li className="flex items-start gap-2">
          <span>!</span>
          <span>Ne jamais mélanger vinaigre et javel (gaz toxiques)</span>
        </li>
        <li className="flex items-start gap-2">
          <span>!</span>
          <span>Porter des gants pour les produits concentrés</span>
        </li>
      </ul>
      <p className="mt-3 text-[9px] italic" style={{ color: theme.textMuted }}>
        Cleanz ne peut être tenu responsable en cas de mauvaise utilisation des recettes et conseils proposés.
      </p>
    </div>
  );
};
