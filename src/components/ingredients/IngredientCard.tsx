'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { IngredientComplet } from '@/types';
import { EcoScore } from '@/components/ui/EcoScore';
import { HeartBurst } from '@/components/ui/HeartBurst';
import { haptic } from '@/utils/haptics';

interface IngredientCardProps {
  ingredient: IngredientComplet;
  view: 'list' | 'grid';
  favorite: boolean;
  onClick: () => void;
  onToggleFavorite: () => void;
}

export const IngredientCard = ({
  ingredient,
  view,
  favorite,
  onClick,
  onToggleFavorite,
}: IngredientCardProps) => {
  const { theme, darkMode } = useTheme();
  const [burst, setBurst] = useState(0);

  const cardBg = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)';
  const cardBorder = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  const chipBg = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!favorite) setBurst((b) => b + 1);
    haptic('light');
    onToggleFavorite();
  };

  const handleClick = () => {
    haptic('light');
    onClick();
  };

  // Pastille prix
  const PricePill = () => (
    <span
      className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
      style={{ background: chipBg, color: theme.textSecondary }}
    >
      {ingredient.prixMoyen}
    </span>
  );

  const FavButton = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => (
    <button
      onClick={handleFavorite}
      aria-label={favorite ? `Retirer ${ingredient.nom} des favoris` : `Ajouter ${ingredient.nom} aux favoris`}
      aria-pressed={favorite}
      className="relative p-1.5 rounded-full transition-all active:scale-90 flex-shrink-0"
      style={{
        background: favorite ? 'rgba(236, 72, 153, 0.15)' : darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
      }}
    >
      <Heart
        className={`${size === 'md' ? 'w-5 h-5' : 'w-4 h-4'} transition-colors ${favorite ? 'fill-pink-500' : ''}`}
        style={{ color: favorite ? '#EC4899' : theme.textMuted }}
      />
      <HeartBurst trigger={burst} />
    </button>
  );

  if (view === 'list') {
    return (
      <div
        onClick={handleClick}
        className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 active:scale-[0.99] active:brightness-95"
        style={{
          background: cardBg,
          border: `1px solid ${cardBorder}`,
          boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        {/* Emoji + dégradé */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: ingredient.gradient }}
        >
          <span className="text-2xl" aria-hidden>{ingredient.emoji}</span>
        </div>

        {/* Contenu central */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-sm" style={{ color: theme.textPrimary }}>
              {ingredient.nom}
            </h3>
            {ingredient.essentiel && (
              <span
                className="text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5 font-medium"
                style={{
                  background: darkMode ? 'rgba(251, 191, 36, 0.25)' : 'rgba(251, 191, 36, 0.2)',
                  color: darkMode ? '#fcd34d' : '#b45309',
                }}
              >
                <span aria-hidden>⭐</span> Essentiel
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-1.5">
            {ingredient.fonctions.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[10px]" style={{ color: theme.textMuted }}>
                {tag}{i < Math.min(ingredient.fonctions.length, 3) - 1 && ' • '}
              </span>
            ))}
          </div>

          {/* Eco-score + prix */}
          <div className="flex items-center gap-2">
            <EcoScore score={ingredient.scoreEcologique} />
            <PricePill />
          </div>
        </div>

        {/* Recettes + favori */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <FavButton size="md" />
          <span className="text-[11px] whitespace-nowrap" style={{ color: theme.textMuted }}>
            {ingredient.recettesIds.length} recette{ingredient.recettesIds.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>
    );
  }

  // Vue grille
  return (
    <div
      onClick={handleClick}
      className="relative rounded-2xl p-4 cursor-pointer transition-all duration-200 active:scale-[0.98] active:brightness-95"
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* Badges + favori */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-wrap gap-1">
          {ingredient.essentiel && (
            <span
              className="text-[10px] px-2 py-1 rounded-md flex items-center gap-1 font-medium"
              style={{
                background: darkMode ? 'rgba(251, 191, 36, 0.25)' : 'rgba(251, 191, 36, 0.2)',
                color: darkMode ? '#fcd34d' : '#b45309',
              }}
            >
              <span aria-hidden>⭐</span> Essentiel
            </span>
          )}
          {ingredient.badge && (
            <span
              className="text-[10px] px-2 py-1 rounded-md flex items-center gap-1 font-medium"
              style={{
                background: darkMode ? 'rgba(251, 146, 60, 0.25)' : 'rgba(251, 146, 60, 0.2)',
                color: darkMode ? '#fdba74' : '#c2410c',
              }}
            >
              <span aria-hidden>🔥</span> {ingredient.badge}
            </span>
          )}
        </div>
        <FavButton />
      </div>

      {/* Emoji */}
      <div className="mb-2">
        <span className="text-4xl" aria-hidden>{ingredient.emoji}</span>
      </div>

      {/* Nom */}
      <h3 className="font-semibold text-sm mb-2" style={{ color: theme.textPrimary }}>
        {ingredient.nom}
      </h3>

      {/* Eco-score + prix */}
      <div className="flex items-center gap-2 mb-3">
        <EcoScore score={ingredient.scoreEcologique} />
        <PricePill />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {ingredient.fonctions.slice(0, 3).map((tag, i) => (
          <span
            key={i}
            className="text-[10px] px-2 py-1 rounded-md"
            style={{ background: chipBg, color: theme.textMuted }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Recettes */}
      <div className="text-xs" style={{ color: theme.textMuted }}>
        {ingredient.recettesIds.length} recette{ingredient.recettesIds.length > 1 ? 's' : ''}
      </div>
    </div>
  );
};
