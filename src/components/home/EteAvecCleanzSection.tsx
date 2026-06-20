'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { getBlur } from '@/data/imageBlur';
import { haptic } from '@/utils/haptics';
import { Sun, ChevronRight, Wind, Moon, Droplets, ThermometerSnowflake } from 'lucide-react';

const HERO_IMAGE = '/images/sections/ete-cleanz.jpg';

interface EteTip {
  emoji: string;
  titre: string;
  texte: string;
}

interface FraicheurTip {
  icon: React.ReactNode;
  titre: string;
  texte: string;
  schema: React.ReactNode;
}

const ETE_TIPS: EteTip[] = [
  {
    emoji: '🍖',
    titre: 'Barbecue impeccable',
    texte: 'Frottez la grille encore tiède avec un demi-oignon, puis bicarbonate + vinaigre pour décoller les graisses cuites.',
  },
  {
    emoji: '🦟',
    titre: 'Anti-moustiques naturel',
    texte: 'Spray eau + vinaigre + HE citronnelle sur les rebords de fenêtres. Efficace et sans chimie.',
  },
  {
    emoji: '🏖️',
    titre: 'Terrasse & salon de jardin',
    texte: 'Savon noir + cristaux de soude redonnent vie au plastique jauni et au bois grisé.',
  },
  {
    emoji: '🧊',
    titre: 'Glacière sans odeurs',
    texte: 'Bicarbonate + jus de citron pour désinfecter avant les pique-niques.',
  },
  {
    emoji: '👟',
    titre: 'Baskets fraîches',
    texte: 'Poudre bicarbonate + maïzena + tea tree la nuit : adieu odeurs de transpiration.',
  },
];

// Schémas SVG pour les astuces fraîcheur
const VentilationSchema = () => (
  <svg viewBox="0 0 120 60" className="w-full h-12">
    <rect x="5" y="15" width="30" height="35" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <rect x="85" y="15" width="30" height="35" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <path d="M 38 32 Q 60 20 82 32" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
    <polygon points="78,28 84,32 78,36" fill="currentColor" />
    <path d="M 38 38 Q 60 50 82 38" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
    <polygon points="42,42 36,38 42,34" fill="currentColor" />
    <text x="60" y="58" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.7">courant d'air</text>
  </svg>
);

const VoletsSchema = () => (
  <svg viewBox="0 0 120 60" className="w-full h-12">
    <rect x="20" y="10" width="35" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <line x1="25" y1="10" x2="25" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="30" y1="10" x2="30" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="35" y1="10" x2="35" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="75" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
    <line x1="75" y1="10" x2="75" y2="8" stroke="currentColor" strokeWidth="1.5" />
    <line x1="85" y1="20" x2="87" y2="20" stroke="currentColor" strokeWidth="1.5" />
    <line x1="65" y1="20" x2="63" y2="20" stroke="currentColor" strokeWidth="1.5" />
    <text x="37" y="58" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.7">fermés</text>
    <text x="85" y="58" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.7">journée</text>
  </svg>
);

const DrapHumideSchema = () => (
  <svg viewBox="0 0 120 60" className="w-full h-12">
    <rect x="35" y="5" width="50" height="35" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <path d="M 40 40 Q 45 48 50 40 Q 55 32 60 40 Q 65 48 70 40 Q 75 32 80 40" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
    <circle cx="50" cy="52" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="60" cy="55" r="1.5" fill="currentColor" opacity="0.4" />
    <circle cx="70" cy="53" r="2" fill="currentColor" opacity="0.5" />
    <text x="60" y="8" textAnchor="middle" fontSize="6" fill="currentColor" opacity="0.6">fenêtre</text>
  </svg>
);

const VentiloSchema = () => (
  <svg viewBox="0 0 120 60" className="w-full h-12">
    <circle cx="40" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <circle cx="40" cy="30" r="4" fill="currentColor" opacity="0.4" />
    <path d="M 40 26 Q 48 20 40 12" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M 44 30 Q 50 38 58 30" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M 40 34 Q 32 40 40 48" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M 36 30 Q 30 22 22 30" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="70" y="20" width="25" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <rect x="75" y="25" width="5" height="10" rx="1" fill="currentColor" opacity="0.3" />
    <rect x="82" y="25" width="5" height="10" rx="1" fill="currentColor" opacity="0.3" />
    <text x="82" y="55" textAnchor="middle" fontSize="6" fill="currentColor" opacity="0.6">glaçons</text>
  </svg>
);

const FRAICHEUR_TIPS: FraicheurTip[] = [
  {
    icon: <Wind className="w-5 h-5" />,
    titre: 'Ventilation croisée',
    texte: 'Ouvrez 2 fenêtres opposées tôt le matin (6h-8h) et tard le soir. L\'air circule et rafraîchit toute la maison.',
    schema: <VentilationSchema />,
  },
  {
    icon: <Moon className="w-5 h-5" />,
    titre: 'Volets fermés en journée',
    texte: 'Fermez volets et rideaux côté soleil dès 10h. Bloquer la chaleur avant qu\'elle n\'entre = -5°C intérieur.',
    schema: <VoletsSchema />,
  },
  {
    icon: <Droplets className="w-5 h-5" />,
    titre: 'Drap humide à la fenêtre',
    texte: 'Suspendez un drap mouillé devant une fenêtre ouverte. L\'évaporation rafraîchit l\'air entrant naturellement.',
    schema: <DrapHumideSchema />,
  },
  {
    icon: <ThermometerSnowflake className="w-5 h-5" />,
    titre: 'Ventilateur + glaçons',
    texte: 'Placez un bol de glaçons ou bouteilles congelées devant le ventilateur. Effet climatisation sans électricité.',
    schema: <VentiloSchema />,
  },
];

export const EteAvecCleanzSection = () => {
  const { theme, darkMode } = useTheme();
  const [imgError, setImgError] = useState(false);
  const [openTip, setOpenTip] = useState<number | null>(0);
  const [openFraicheur, setOpenFraicheur] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'menage' | 'fraicheur'>('menage');

  const toggle = (i: number) => {
    haptic('selection');
    setOpenTip((prev) => (prev === i ? null : i));
  };

  const toggleFraicheur = (i: number) => {
    haptic('selection');
    setOpenFraicheur((prev) => (prev === i ? null : i));
  };

  const switchTab = (tab: 'menage' | 'fraicheur') => {
    haptic('selection');
    setActiveTab(tab);
  };

  return (
    <div className="mb-5">
      <div
        className="rounded-3xl overflow-hidden relative"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)'
            : 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
          border: darkMode ? '1px solid rgba(251,191,36,0.18)' : '1px solid rgba(251,146,60,0.25)',
          boxShadow: darkMode ? 'none' : '0 8px 28px rgba(251,146,60,0.14)',
        }}
      >
        {/* Bannière image */}
        <div className="relative h-32 w-full overflow-hidden">
          {!imgError ? (
            <Image
              src={HERO_IMAGE}
              alt="L'été avec Cleanz"
              fill
              sizes="(max-width: 480px) 100vw, 480px"
              className="object-cover"
              placeholder={getBlur(HERO_IMAGE) ? 'blur' : 'empty'}
              blurDataURL={getBlur(HERO_IMAGE)}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #FDBA74 0%, #FB7185 45%, #38BDF8 100%)' }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }}
          />
          <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FBBF24 0%, #FB923C 100%)' }}
            >
              <Sun className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/70">Spécial saison</p>
              <h3 className="font-display text-lg font-extrabold text-white leading-tight">L&apos;été avec Cleanz</h3>
            </div>
          </div>
        </div>

        {/* Onglets */}
        <div className="flex gap-1.5 px-3 pt-3">
          <button
            onClick={() => switchTab('menage')}
            className="flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all"
            style={{
              background: activeTab === 'menage'
                ? (darkMode ? 'rgba(251,191,36,0.2)' : 'rgba(251,146,60,0.15)')
                : 'transparent',
              color: activeTab === 'menage'
                ? (darkMode ? '#FBBF24' : '#EA580C')
                : theme.textMuted,
            }}
          >
            🧹 Ménage d&apos;été
          </button>
          <button
            onClick={() => switchTab('fraicheur')}
            className="flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all"
            style={{
              background: activeTab === 'fraicheur'
                ? (darkMode ? 'rgba(56,189,248,0.2)' : 'rgba(14,165,233,0.12)')
                : 'transparent',
              color: activeTab === 'fraicheur'
                ? (darkMode ? '#38BDF8' : '#0284C7')
                : theme.textMuted,
            }}
          >
            ❄️ Garder le frais
          </button>
        </div>

        {/* Contenu */}
        <div className="p-3">
          {activeTab === 'menage' && (
            <div className="space-y-1.5">
              {ETE_TIPS.map((tip, i) => {
                const isOpen = openTip === i;
                return (
                  <button
                    key={i}
                    onClick={() => toggle(i)}
                    className="w-full text-left rounded-xl transition-all active:scale-[0.99]"
                    style={{
                      background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
                      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(251,146,60,0.15)'}`,
                    }}
                  >
                    <div className="flex items-center gap-2.5 py-2.5 px-3">
                      <span className="text-lg flex-shrink-0">{tip.emoji}</span>
                      <span className="flex-1 text-[13px] font-semibold" style={{ color: theme.textPrimary }}>
                        {tip.titre}
                      </span>
                      <ChevronRight
                        className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200"
                        style={{ color: theme.textMuted, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                      />
                    </div>
                    <div
                      className="grid transition-all duration-200"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-3 pb-2.5 text-[12px] leading-relaxed" style={{ color: theme.textSecondary }}>
                          {tip.texte}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'fraicheur' && (
            <div className="space-y-1.5">
              {FRAICHEUR_TIPS.map((tip, i) => {
                const isOpen = openFraicheur === i;
                return (
                  <button
                    key={i}
                    onClick={() => toggleFraicheur(i)}
                    className="w-full text-left rounded-xl transition-all active:scale-[0.99]"
                    style={{
                      background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
                      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(14,165,233,0.15)'}`,
                    }}
                  >
                    <div className="flex items-center gap-2.5 py-2.5 px-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: darkMode ? 'rgba(56,189,248,0.15)' : 'rgba(14,165,233,0.1)',
                          color: darkMode ? '#38BDF8' : '#0284C7',
                        }}
                      >
                        {tip.icon}
                      </div>
                      <span className="flex-1 text-[13px] font-semibold" style={{ color: theme.textPrimary }}>
                        {tip.titre}
                      </span>
                      <ChevronRight
                        className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200"
                        style={{ color: theme.textMuted, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                      />
                    </div>
                    <div
                      className="grid transition-all duration-200"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        {/* Schéma visuel */}
                        <div
                          className="mx-3 mb-2 p-2 rounded-lg"
                          style={{
                            background: darkMode ? 'rgba(56,189,248,0.08)' : 'rgba(14,165,233,0.06)',
                            color: darkMode ? '#38BDF8' : '#0284C7',
                          }}
                        >
                          {tip.schema}
                        </div>
                        <p className="px-3 pb-2.5 text-[12px] leading-relaxed" style={{ color: theme.textSecondary }}>
                          {tip.texte}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
