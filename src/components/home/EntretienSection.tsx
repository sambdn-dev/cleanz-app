'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { ELECTROMENAGERS } from '@/data/electromenager';
import { Electromenager } from '@/types';

interface EntretienSectionProps {
  onApplianceClick: (appliance: Electromenager) => void;
}

// Couleurs pour le style Stories (bordure dégradée)
const STORY_COLORS: Record<string, string> = {
  'Lave-linge': '#FF69B4',
  'Réfrigérateur': '#4FD1C5',
  'Chaudière': '#F59E0B',
  'Lave-vaisselle': '#8B5CF6',
  'Four': '#EC4899',
  'Climatisation': '#06B6D4',
  'Sèche-linge': '#A855F7',
  'Micro-ondes': '#F97316',
  'Aspirateur': '#10B981',
  'Cafetière': '#78350F',
  'Hotte': '#6B7280',
  'Chauffe-eau': '#3B82F6',
};

export const EntretienSection = ({ onApplianceClick }: EntretienSectionProps) => {
  const { theme, darkMode } = useTheme();

  return (
    <div className="mb-5">
      {/* Titre de la section */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🔌</span>
        <h2 className="text-sm font-bold" style={{ color: theme.textPrimary }}>
          Entretien électroménager
        </h2>
      </div>

      {/* Stories horizontales */}
      <div
        className="flex gap-4 overflow-x-auto pt-1 pb-4 -mx-4 px-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {ELECTROMENAGERS.map((appliance) => {
          const color = STORY_COLORS[appliance.nom] || '#FF69B4';

          return (
            <button
              key={appliance.id}
              onClick={() => onApplianceClick(appliance)}
              className="flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 flex-shrink-0"
            >
              {/* Cercle avec bordure dégradée (style Story) */}
              <div
                className="w-16 h-16 rounded-full p-0.5"
                style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}60 100%)` }}
              >
                {/* Cercle intérieur avec emoji */}
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{ background: darkMode ? '#1a0a2e' : 'white' }}
                >
                  <span className="text-2xl">{appliance.emoji}</span>
                </div>
              </div>
              {/* Nom en dessous */}
              <span
                className="text-[10px] font-semibold text-center leading-tight w-16"
                style={{ color: theme.textSecondary }}
              >
                {appliance.nom}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
