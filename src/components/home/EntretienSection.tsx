'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ELECTROMENAGERS } from '@/data/electromenager';
import { Electromenager } from '@/types';
import { Wrench } from 'lucide-react';

interface EntretienSectionProps {
  onApplianceClick: (appliance: Electromenager) => void;
}

export const EntretienSection = ({ onApplianceClick }: EntretienSectionProps) => {
  const { theme, darkMode } = useTheme();

  return (
    <div className="mb-5">
      <SectionTitle
        icon={Wrench}
        iconColor="text-blue-500"
      >
        Entretien &eacute;lectrom&eacute;nager
      </SectionTitle>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {ELECTROMENAGERS.map((appliance) => (
          <button
            key={appliance.id}
            onClick={() => onApplianceClick(appliance)}
            className={`flex-shrink-0 w-24 p-4 rounded-2xl text-center transition-all hover:scale-105 active:scale-95 ${appliance.color}`}
            style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }}
          >
            <span className="text-3xl block mb-2">{appliance.emoji}</span>
            <span className="text-[10px] font-bold text-white leading-tight line-clamp-2">{appliance.nom}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
