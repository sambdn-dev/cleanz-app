'use client';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { INGREDIENTS } from '@/data/ingredients';
import { Ingredient } from '@/types';
import { Sparkles } from 'lucide-react';

interface EssentielsSectionProps {
  onIngredientClick: (ingredient: Ingredient) => void;
  onViewAll: () => void;
}

const bgColors = [
  'bg-rose-400',
  'bg-sky-400',
  'bg-amber-400',
  'bg-violet-500',
  'bg-emerald-400',
  'bg-pink-400',
  'bg-cyan-500'
];

export const EssentielsSection = ({ onIngredientClick, onViewAll }: EssentielsSectionProps) => {
  const essentiels = INGREDIENTS.filter(i => i.essentiel);

  return (
    <div className="mb-5">
      <SectionTitle
        icon={Sparkles}
        iconColor="text-amber-500"
        action="Tout voir →"
        onAction={onViewAll}
      >
        Les 7 essentiels
      </SectionTitle>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {essentiels.map((ing, index) => (
          <button
            key={ing.id}
            onClick={() => onIngredientClick(ing)}
            className={`flex-shrink-0 w-20 p-3 rounded-2xl text-center transition-all hover:scale-105 ${bgColors[index]}`}
          >
            <span className="text-2xl block mb-1">{ing.emoji}</span>
            <span className="text-[9px] font-semibold text-white leading-tight line-clamp-2">{ing.nom}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
