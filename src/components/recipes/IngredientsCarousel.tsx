'use client';

import { useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { IngredientComplet } from '@/types';
import { INGREDIENTS_COMPLETS } from '@/data/ingredientsComplets';
import { haptic } from '@/utils/haptics';
import { FlaskConical } from 'lucide-react';

interface IngredientsCarouselProps {
  onIngredientClick: (ingredient: IngredientComplet) => void;
}

/** Libellé compact pour les tuiles : évite la troncature des noms longs.
 *  « HE » est la convention déjà utilisée dans les fiches recettes. */
const shortName = (nom: string): string =>
  nom
    .replace(/^Huile essentielle d[e']\s*/i, 'HE ')
    .replace(/\s*écologique$/i, '');

/**
 * Le garde-manger du ménage : les 28 ingrédients en carrousel compact en tête
 * de la page Recettes (remplace l'ancien onglet Ingrédients).
 * Essentiels d'abord, tap → fiche complète de l'ingrédient.
 */
export const IngredientsCarousel = ({ onIngredientClick }: IngredientsCarouselProps) => {
  const { theme, darkMode } = useTheme();

  // Les 8 essentiels d'abord, puis le reste (ordre du catalogue)
  const ingredients = useMemo(() => {
    const essentiels = INGREDIENTS_COMPLETS.filter((i) => i.essentiel);
    const autres = INGREDIENTS_COMPLETS.filter((i) => !i.essentiel);
    return [...essentiels, ...autres];
  }, []);

  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-3">
        <FlaskConical className="w-5 h-5" style={{ color: theme.accentPink }} />
        <h2 className="font-display font-bold text-[17px]" style={{ color: theme.textPrimary }}>
          Les ingrédients
        </h2>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            background: darkMode ? 'rgba(255,133,192,0.15)' : 'rgba(255,105,180,0.12)',
            color: theme.accentPink,
          }}
        >
          {ingredients.length}
        </span>
        <span className="text-xs ml-auto" style={{ color: theme.textMuted }}>
          Glissez →
        </span>
      </div>

      <div className="flex gap-2.5 overflow-x-auto scrollbar-hide edge-fade-x -mx-4 px-4 pb-1">
        {ingredients.map((ing) => (
          <button
            key={ing.id}
            onClick={() => { haptic('light'); onIngredientClick(ing); }}
            className="w-[84px] flex-shrink-0 flex flex-col items-center gap-1.5 transition-transform active:scale-95"
            aria-label={ing.essentiel ? `${ing.nom} — essentiel` : ing.nom}
          >
            <span
              className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{
                background: ing.gradient,
                boxShadow: darkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.12)',
              }}
            >
              <span aria-hidden>{ing.emoji}</span>
              {ing.essentiel && (
                <span
                  className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px]"
                  style={{
                    background: darkMode ? '#FBBF24' : '#F59E0B',
                    border: `2px solid ${darkMode ? '#241838' : '#fff'}`,
                  }}
                  aria-hidden
                >
                  ⭐
                </span>
              )}
            </span>
            <span
              className="text-xs font-semibold leading-tight text-center line-clamp-2 w-full"
              style={{ color: theme.textSecondary }}
            >
              {shortName(ing.nom)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
