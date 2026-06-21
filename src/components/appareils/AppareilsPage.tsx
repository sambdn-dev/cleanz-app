'use client';

import { useState, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ELECTROMENAGERS, PIECES, ENERGY_TIPS, EnergyTip, Piece } from '@/data/electromenager';
import { Electromenager } from '@/types';
import { ApplianceIcon } from '@/components/appareils/ApplianceIcons';
import { Zap, Home, ChevronLeft, ChevronRight } from 'lucide-react';

// Couleur pleine (trait des icônes) pour chaque classe Tailwind d'appareil
const SOLID_COLOR: Record<string, string> = {
  'bg-blue-500': '#3B82F6', 'bg-blue-400': '#60A5FA', 'bg-blue-600': '#2563EB',
  'bg-cyan-500': '#06B6D4', 'bg-cyan-400': '#22D3EE',
  'bg-emerald-500': '#10B981', 'bg-emerald-400': '#34D399',
  'bg-orange-500': '#F97316', 'bg-orange-400': '#FB923C',
  'bg-violet-500': '#8B5CF6', 'bg-purple-500': '#A855F7', 'bg-fuchsia-500': '#D946EF',
  'bg-amber-700': '#B45309', 'bg-amber-500': '#F59E0B',
  'bg-red-500': '#EF4444', 'bg-rose-500': '#F43F5E',
  'bg-sky-500': '#0EA5E9', 'bg-sky-600': '#0284C7',
  'bg-gray-500': '#6B7280', 'bg-slate-500': '#64748B',
  'bg-teal-500': '#14B8A6', 'bg-teal-600': '#0D9488',
  'bg-indigo-500': '#6366F1', 'bg-indigo-400': '#818CF8',
};

interface AppareilsPageProps {
  onApplianceClick: (appliance: Electromenager) => void;
}

// Composant isolé pour les tips (évite re-renders)
const EnergyTipsCarousel = () => {
  const { theme, darkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTip = () => {
    setCurrentIndex((prev) => (prev + 1) % ENERGY_TIPS.length);
  };

  const prevTip = () => {
    setCurrentIndex((prev) => (prev - 1 + ENERGY_TIPS.length) % ENERGY_TIPS.length);
  };

  const currentTip = ENERGY_TIPS[currentIndex];

  const categoryColors: Record<EnergyTip['categorie'], string> = {
    eco: darkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.15)',
    astuce: darkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)',
    sante: darkMode ? 'rgba(236, 72, 153, 0.2)' : 'rgba(236, 72, 153, 0.15)',
    economie: darkMode ? 'rgba(251, 191, 36, 0.2)' : 'rgba(251, 191, 36, 0.15)'
  };

  const categoryTextColors: Record<EnergyTip['categorie'], string> = {
    eco: '#22C55E',
    astuce: '#8B5CF6',
    sante: '#EC4899',
    economie: '#FBBF24'
  };

  const categoryLabels: Record<EnergyTip['categorie'], string> = {
    eco: 'Écologie',
    astuce: 'Astuce',
    sante: 'Santé',
    economie: 'Économie'
  };

  return (
    <div className="mb-6">
      <SectionTitle icon={Zap} iconColor="text-amber-500">
        Le saviez-vous ?
      </SectionTitle>

      <div
        className="relative p-5 rounded-2xl overflow-hidden"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'
        }}
      >
        {/* Category badge */}
        <span
          className="inline-block text-[10px] px-2.5 py-1 rounded-full font-semibold mb-3"
          style={{
            background: categoryColors[currentTip.categorie],
            color: categoryTextColors[currentTip.categorie]
          }}
        >
          {categoryLabels[currentTip.categorie]}
        </span>

        {/* Content */}
        <div className="flex items-start gap-3 mb-4">
          <span className="text-3xl">{currentTip.emoji}</span>
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-1" style={{ color: theme.textPrimary }}>
              {currentTip.titre}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
              {currentTip.contenu}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevTip}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }}
          >
            <ChevronLeft className="w-4 h-4" style={{ color: theme.textMuted }} />
          </button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {ENERGY_TIPS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-4' : ''
                }`}
                style={{
                  background: index === currentIndex
                    ? 'linear-gradient(135deg, #FBBF24 0%, #22C55E 100%)'
                    : darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
                }}
              />
            ))}
          </div>

          <button
            onClick={nextTip}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }}
          >
            <ChevronRight className="w-4 h-4" style={{ color: theme.textMuted }} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant carte appareil
const ApplianceCard = ({
  appliance,
  onClick
}: {
  appliance: Electromenager;
  onClick: () => void;
}) => {
  const { theme, darkMode } = useTheme();

  const solid = SOLID_COLOR[appliance.color] || '#3B82F6';
  // Voile de fond teinté dérivé de la couleur de l'appareil (~15% sombre / ~10% clair)
  const tint = solid + (darkMode ? '26' : '1A');

  return (
    <Card
      hoverable
      onClick={onClick}
      className="p-4 relative overflow-hidden"
    >
      {/* Voile décoratif teinté */}
      <div className="absolute inset-0 opacity-60" style={{ background: tint }} />

      {/* Emoji discret dans le coin */}
      <span className="absolute top-2 right-2.5 text-sm leading-none opacity-70 z-10" aria-hidden>
        {appliance.emoji}
      </span>

      <div className="relative z-10 flex flex-col items-center">
        <ApplianceIcon id={appliance.id} color={solid} size={44} className="mb-2" />
        <span
          className="text-xs font-semibold line-clamp-1 text-center"
          style={{ color: theme.textPrimary }}
        >
          {appliance.nom}
        </span>
      </div>
    </Card>
  );
};

// Page principale
export const AppareilsPage = ({ onApplianceClick }: AppareilsPageProps) => {
  const { theme, darkMode } = useTheme();
  const [selectedPiece, setSelectedPiece] = useState<Piece>('Toutes');

  // Filtrer les appareils par pièce
  const filteredAppliances = useMemo(() => {
    if (selectedPiece === 'Toutes') return ELECTROMENAGERS;
    return ELECTROMENAGERS.filter(a => a.piece === selectedPiece);
  }, [selectedPiece]);

  // Emojis pour les pièces
  const pieceEmojis: Record<string, string> = {
    'Toutes': '🏠',
    'Cuisine': '🍳',
    'Buanderie': '🧺',
    'Salon': '🛋️',
    'Salle de bain': '🚿',
    'Garage': '🚗',
    'Rangement': '📦'
  };

  return (
    <div className="pt-2">
      {/* Room filter tabs */}
      <div className="mb-4">
        <div className="flex gap-2 overflow-x-auto py-2 -mx-4 px-4 scrollbar-hide">
          {PIECES.map((piece) => {
            const isActive = selectedPiece === piece;
            const count = piece === 'Toutes'
              ? ELECTROMENAGERS.length
              : ELECTROMENAGERS.filter(a => a.piece === piece).length;

            return (
              <button
                key={piece}
                onClick={() => setSelectedPiece(piece)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all ${
                  isActive ? 'shadow-sm' : ''
                }`}
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, #FF69B4 0%, #B794F4 50%, #4FD1C5 100%)'
                    : darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                  color: isActive ? 'white' : theme.textSecondary,
                  border: isActive ? 'none' : darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'
                }}
              >
                <span className="text-base">{pieceEmojis[piece]}</span>
                <span className="text-sm font-medium">{piece}</span>
                {count > 0 && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.3)' : darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
                      color: isActive ? 'white' : theme.textMuted
                    }}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Appliances grid */}
      <div className="mb-6">
        <SectionTitle icon={Home} iconColor="text-pink-500">
          {selectedPiece === 'Toutes' ? 'Tous les appareils' : selectedPiece}
        </SectionTitle>

        <div className="grid grid-cols-3 gap-3">
          {filteredAppliances.map((appliance) => (
            <ApplianceCard
              key={appliance.id}
              appliance={appliance}
              onClick={() => onApplianceClick(appliance)}
            />
          ))}
        </div>

        {filteredAppliances.length === 0 && (
          <div
            className="text-center py-8"
            style={{ color: theme.textMuted }}
          >
            <span className="text-4xl block mb-2">🔍</span>
            <p className="text-sm">Aucun appareil dans cette pièce</p>
          </div>
        )}
      </div>

      {/* Energy consumption overview */}
      <div className="mb-6">
        <SectionTitle icon={Zap} iconColor="text-amber-500">
          Répartition énergétique
        </SectionTitle>

        <div
          className="p-4 rounded-2xl"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'
          }}
        >
          {/* Stacked bar */}
          <div className="h-4 rounded-full overflow-hidden flex mb-4">
            {ELECTROMENAGERS.sort((a, b) => b.consoPct - a.consoPct).map((appliance, index) => {
              const colors = [
                '#EF4444', '#F97316', '#FBBF24', '#84CC16',
                '#22C55E', '#14B8A6', '#06B6D4', '#3B82F6',
                '#6366F1', '#8B5CF6', '#A855F7', '#EC4899'
              ];
              return (
                <div
                  key={appliance.id}
                  style={{
                    width: `${appliance.consoPct}%`,
                    background: colors[index % colors.length],
                    minWidth: appliance.consoPct > 0 ? '4px' : '0'
                  }}
                  title={`${appliance.nom}: ${appliance.consoPct}%`}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2">
            {ELECTROMENAGERS
              .sort((a, b) => b.consoPct - a.consoPct)
              .slice(0, 6)
              .map((appliance, index) => {
                const colors = [
                  '#EF4444', '#F97316', '#FBBF24', '#84CC16',
                  '#22C55E', '#14B8A6'
                ];
                return (
                  <div key={appliance.id} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: colors[index] }}
                    />
                    <span className="text-[10px]" style={{ color: theme.textSecondary }}>
                      {appliance.emoji} {appliance.nom}
                    </span>
                    <span className="text-[10px] font-bold ml-auto" style={{ color: theme.textPrimary }}>
                      {appliance.consoPct}%
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Energy tips carousel */}
      <EnergyTipsCarousel />
    </div>
  );
};
