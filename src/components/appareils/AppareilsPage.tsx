'use client';

import { useState, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ELECTROMENAGERS, PIECES, ENERGY_TIPS, EnergyTip, Piece } from '@/data/electromenager';
import { Electromenager } from '@/types';
import { Zap, Sparkles, Home, ChevronLeft, ChevronRight, TrendingDown, Clock } from 'lucide-react';

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

  // Mapping des couleurs de fond pour chaque appareil
  const colorMap: Record<string, string> = {
    'bg-blue-500': darkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)',
    'bg-cyan-500': darkMode ? 'rgba(6, 182, 212, 0.15)' : 'rgba(6, 182, 212, 0.1)',
    'bg-emerald-500': darkMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)',
    'bg-orange-500': darkMode ? 'rgba(249, 115, 22, 0.15)' : 'rgba(249, 115, 22, 0.1)',
    'bg-violet-500': darkMode ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.1)',
    'bg-amber-700': darkMode ? 'rgba(180, 83, 9, 0.15)' : 'rgba(180, 83, 9, 0.1)',
    'bg-red-500': darkMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
    'bg-sky-500': darkMode ? 'rgba(14, 165, 233, 0.15)' : 'rgba(14, 165, 233, 0.1)',
    'bg-purple-500': darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(168, 85, 247, 0.1)',
    'bg-gray-500': darkMode ? 'rgba(107, 114, 128, 0.15)' : 'rgba(107, 114, 128, 0.1)',
    'bg-slate-500': darkMode ? 'rgba(100, 116, 139, 0.15)' : 'rgba(100, 116, 139, 0.1)',
    'bg-teal-500': darkMode ? 'rgba(20, 184, 166, 0.15)' : 'rgba(20, 184, 166, 0.1)',
  };

  return (
    <Card
      hoverable
      onClick={onClick}
      className="p-4 relative overflow-hidden"
    >
      {/* Decorative gradient background */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: colorMap[appliance.color] || colorMap['bg-blue-500']
        }}
      />

      <div className="relative z-10">
        {/* Emoji and name */}
        <div className="text-center">
          <span className="text-3xl block mb-2">{appliance.emoji}</span>
          <span
            className="text-xs font-semibold line-clamp-1"
            style={{ color: theme.textPrimary }}
          >
            {appliance.nom}
          </span>
        </div>
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

  // Calculer les stats
  const totalConso = useMemo(() => {
    return ELECTROMENAGERS.reduce((acc, a) => acc + a.consoPct, 0);
  }, []);

  const topConsumer = useMemo(() => {
    return ELECTROMENAGERS.reduce((max, a) => a.consoPct > max.consoPct ? a : max);
  }, []);

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
      {/* Hero section with stats */}
      <div
        className="relative p-5 rounded-2xl mb-6 overflow-hidden"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, rgba(255, 105, 180, 0.15) 0%, rgba(79, 209, 197, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(255, 105, 180, 0.2) 0%, rgba(79, 209, 197, 0.2) 100%)',
          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-pink-400/20 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-cyan-400/20 blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #FF69B4 0%, #4FD1C5 100%)'
              }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold" style={{ color: theme.textPrimary }}>
                Vos appareils
              </h2>
              <p className="text-xs" style={{ color: theme.textSecondary }}>
                12 appareils à entretenir
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="p-3 rounded-xl"
              style={{ background: darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-medium" style={{ color: theme.textMuted }}>
                  Plus gros poste
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{topConsumer.emoji}</span>
                <div>
                  <span className="text-sm font-bold block" style={{ color: theme.textPrimary }}>
                    {topConsumer.nom}
                  </span>
                  <span className="text-xs text-red-500 font-semibold">
                    {topConsumer.consoPct}% de la conso
                  </span>
                </div>
              </div>
            </div>

            <div
              className="p-3 rounded-xl"
              style={{ background: darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-violet-500" />
                <span className="text-[10px] font-medium" style={{ color: theme.textMuted }}>
                  Conseil du jour
                </span>
              </div>
              <p className="text-xs" style={{ color: theme.textPrimary }}>
                <span className="font-semibold">Nettoyez vos filtres</span> pour économiser jusqu'à <span className="text-emerald-500 font-bold">30%</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Room filter tabs */}
      <div className="mb-4">
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
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
