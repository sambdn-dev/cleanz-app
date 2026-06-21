'use client';

import { Heart, LogIn } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRecipeInteractionsContext } from '@/contexts/RecipeInteractionsContext';
import { useIngredientFavoritesContext } from '@/contexts/IngredientFavoritesContext';
import { useUserSprays } from '@/contexts/UserSpraysContext';
import { haptic } from '@/utils/haptics';
import { SubPageShell } from './SubPageShell';

interface AccountPageProps {
  onClose: () => void;
  onOpenFavoris: () => void;
}

const THEME_OPTIONS = [
  { mode: 'system', label: 'Système', icon: '💻' },
  { mode: 'light', label: 'Clair', icon: '☀️' },
  { mode: 'dark', label: 'Sombre', icon: '🌙' },
] as const;

export const AccountPage = ({ onClose, onOpenFavoris }: AccountPageProps) => {
  const { theme, darkMode, themeMode, setThemeMode } = useTheme();
  const { favorites, ratings } = useRecipeInteractionsContext();
  const { favorites: ingredientFavorites } = useIngredientFavoritesContext();
  const { sprays } = useUserSprays();

  const stats = [
    { icon: '❤️', label: 'Favoris', value: favorites.length + ingredientFavorites.length },
    { icon: '🧴', label: 'Mes flacons', value: sprays.length },
    { icon: '⭐', label: 'Notes', value: ratings.length },
  ];

  return (
    <SubPageShell title="Mon compte" emoji="👤" onClose={onClose}>
      {/* Carte profil */}
      <div
        className="rounded-3xl p-6 mb-5 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(255,105,180,0.14) 0%, rgba(79,209,197,0.14) 100%)',
          border: `1px solid ${theme.borderLight}`,
        }}
      >
        <div
          className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #FF69B4 0%, #4FD1C5 100%)' }}
        >
          <span className="text-4xl">👋</span>
        </div>
        <h2 className="font-display text-xl font-extrabold" style={{ color: theme.textPrimary }}>Invité</h2>
        <p className="text-sm" style={{ color: theme.textMuted }}>Bienvenue sur Cleanz</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-3 text-center"
            style={{ background: theme.bgCardSolid, border: `1px solid ${theme.borderLight}` }}
          >
            <span className="text-2xl block mb-0.5">{s.icon}</span>
            <span className="block text-lg font-extrabold tabular-nums" style={{ color: theme.textPrimary }}>{s.value}</span>
            <span className="block text-[11px]" style={{ color: theme.textMuted }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Connexion (prépare l'authentification) */}
      <div
        className="rounded-2xl p-4 mb-6"
        style={{ background: darkMode ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.07)', border: `1px solid ${theme.borderLight}` }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <LogIn className="w-4 h-4" style={{ color: '#8B5CF6' }} />
          <span className="font-bold text-sm" style={{ color: theme.textPrimary }}>Connexion &amp; synchronisation</span>
          <span
            className="ml-auto text-[9px] px-2 py-0.5 rounded-full font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #FFB6C1 0%, #DDA0DD 100%)' }}
          >
            Bientôt
          </span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
          Crée un compte pour synchroniser tes favoris, tes flacons et ta liste de courses sur tous tes appareils.
        </p>
      </div>

      {/* Apparence */}
      <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>Apparence</p>
      <div className="flex rounded-xl p-1 gap-1 mb-6" style={{ background: darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)' }}>
        {THEME_OPTIONS.map(({ mode, label, icon }) => (
          <button
            key={mode}
            onClick={() => { haptic('selection'); setThemeMode(mode); }}
            className="flex-1 py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
            style={{
              background: themeMode === mode ? (darkMode ? 'rgba(79,209,197,0.3)' : '#fff') : 'transparent',
              color: themeMode === mode ? theme.textPrimary : theme.textMuted,
              boxShadow: themeMode === mode ? (darkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)') : 'none',
            }}
          >
            <span className="text-sm">{icon}</span>{label}
          </button>
        ))}
      </div>

      {/* Raccourci favoris */}
      <button
        onClick={onOpenFavoris}
        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-transform active:scale-[0.98]"
        style={{ background: theme.bgCardSolid, border: `1px solid ${theme.borderLight}` }}
      >
        <Heart className="w-5 h-5" style={{ color: '#EC4899', fill: '#EC4899' }} />
        <span className="text-sm font-semibold" style={{ color: theme.textPrimary }}>Mes favoris</span>
      </button>
    </SubPageShell>
  );
};
