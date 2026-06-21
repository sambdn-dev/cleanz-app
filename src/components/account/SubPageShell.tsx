'use client';

import { ReactNode, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { haptic } from '@/utils/haptics';

interface SubPageShellProps {
  title: string;
  emoji?: string;
  onClose: () => void;
  children: ReactNode;
}

/** Page plein écran (overlay) avec en-tête + bouton retour, pour les pages du menu. */
export const SubPageShell = ({ title, emoji, onClose, children }: SubPageShellProps) => {
  const { theme, darkMode } = useTheme();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col animate-slideUp" style={{ background: theme.bgPrimary }}>
      <div
        className="flex items-center gap-3 px-4 border-b"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)',
          paddingBottom: 12,
          borderColor: theme.borderLight,
          background: theme.bgNav,
        }}
      >
        <button
          onClick={() => { haptic('light'); onClose(); }}
          aria-label="Retour"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90"
          style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: theme.textPrimary }} />
        </button>
        <h1 className="font-display text-lg font-extrabold" style={{ color: theme.textPrimary }}>
          {emoji && <span className="mr-2">{emoji}</span>}{title}
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain w-full max-w-md mx-auto px-4 py-5 pb-28">
        {children}
      </div>
    </div>
  );
};
