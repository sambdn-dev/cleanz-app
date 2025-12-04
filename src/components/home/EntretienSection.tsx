'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ELECTROMENAGERS } from '@/data/electromenager';
import { Electromenager } from '@/types';
import { Plug } from 'lucide-react';

interface EntretienSectionProps {
  onApplianceClick: (appliance: Electromenager) => void;
}

// Gradient ring colors for each appliance (Stories style)
const RING_GRADIENTS: Record<number, string> = {
  1: 'linear-gradient(135deg, #FF69B4 0%, #FFB6C1 100%)', // Lave-linge - Pink
  2: 'linear-gradient(135deg, #06B6D4 0%, #67E8F9 100%)', // Lave-vaisselle - Cyan
  3: 'linear-gradient(135deg, #F97316 0%, #FDBA74 100%)', // Réfrigérateur - Orange
  4: 'linear-gradient(135deg, #A855F7 0%, #D8B4FE 100%)', // Four - Violet
  5: 'linear-gradient(135deg, #10B981 0%, #6EE7B7 100%)', // Micro-ondes - Emerald
  6: 'linear-gradient(135deg, #EAB308 0%, #FDE047 100%)', // Cafetière - Amber
};

export const EntretienSection = ({ onApplianceClick }: EntretienSectionProps) => {
  const { theme, darkMode } = useTheme();

  return (
    <div className="mb-6">
      <SectionTitle
        icon={Plug}
        iconColor="text-violet-500"
      >
        Entretien électroménager
      </SectionTitle>

      {/* Stories-style horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {ELECTROMENAGERS.map((appliance) => (
          <button
            key={appliance.id}
            onClick={() => onApplianceClick(appliance)}
            className="flex-shrink-0 flex flex-col items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            {/* Ring container */}
            <div
              className="p-[3px] rounded-full"
              style={{ background: RING_GRADIENTS[appliance.id] || RING_GRADIENTS[1] }}
            >
              {/* White inner ring */}
              <div
                className="p-[3px] rounded-full"
                style={{ background: darkMode ? '#1A0A2E' : '#FFFFFF' }}
              >
                {/* Icon circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: darkMode
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                      : 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)'
                  }}
                >
                  <span className="text-2xl">{appliance.emoji}</span>
                </div>
              </div>
            </div>

            {/* Label */}
            <span
              className="text-[11px] font-medium text-center max-w-[70px] leading-tight"
              style={{ color: theme.textPrimary }}
            >
              {appliance.nom}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
