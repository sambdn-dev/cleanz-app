'use client';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { SPRAYS_INDISPENSABLES } from '@/data/sprays';
import { Spray } from '@/types';

interface SpraysSectionProps {
  onSprayClick: (spray: Spray) => void;
}

export const SpraysSection = ({ onSprayClick }: SpraysSectionProps) => {
  return (
    <div className="mb-5">
      <SectionTitle badge="Recettes maison">
        <span className="text-base mr-2">🧴</span>Les Indispensables
      </SectionTitle>
      <div className="flex gap-2.5 overflow-x-auto pt-1 pb-5 -mx-4 px-4 scrollbar-hide">
        {SPRAYS_INDISPENSABLES.map((spray) => (
          <button
            key={spray.id}
            onClick={() => onSprayClick(spray)}
            className="flex-shrink-0 w-28 p-3 rounded-2xl text-center transition-all hover:scale-105 active:scale-95 relative overflow-hidden"
            style={{ background: spray.gradient, boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }}
          >
            <span className="absolute top-1.5 right-1.5 text-[8px] bg-white/30 text-white px-1.5 py-0.5 rounded-full font-semibold">
              {spray.badge}
            </span>
            <span className="text-2xl block mb-1">{spray.emoji}</span>
            <span className="text-[10px] font-bold text-white leading-tight line-clamp-2">{spray.nom}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
