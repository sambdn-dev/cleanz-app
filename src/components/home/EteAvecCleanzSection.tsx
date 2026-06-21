'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { getBlur } from '@/data/imageBlur';
import { haptic } from '@/utils/haptics';
import { Sun, ChevronRight, Wind, Moon, Droplets, ThermometerSnowflake, GlassWater, Dumbbell, ShowerHead, Clock, Brush } from 'lucide-react';

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
  schema?: React.ReactNode;
  important?: boolean;
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

// Schémas SVG
const VentilationSchema = () => (
  <svg viewBox="0 0 120 50" className="w-full h-10">
    <rect x="5" y="10" width="28" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <rect x="87" y="10" width="28" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <path d="M 36 25 Q 60 12 84 25" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
    <polygon points="80,21 86,25 80,29" fill="currentColor" />
    <path d="M 36 32 Q 60 45 84 32" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
    <polygon points="40,36 34,32 40,28" fill="currentColor" />
    <text x="60" y="48" textAnchor="middle" fontSize="6" fill="currentColor" opacity="0.7">courant d&apos;air</text>
  </svg>
);

const HorairesSchema = () => (
  <svg viewBox="0 0 120 50" className="w-full h-10">
    <circle cx="30" cy="22" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <line x1="30" y1="22" x2="30" y2="14" stroke="currentColor" strokeWidth="1.5" />
    <line x1="30" y1="22" x2="37" y2="22" stroke="currentColor" strokeWidth="1.5" />
    <text x="30" y="44" textAnchor="middle" fontSize="6" fill="currentColor" opacity="0.7">6h-9h</text>
    <rect x="55" y="15" width="15" height="18" rx="1" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1" />
    <line x1="60" y1="15" x2="60" y2="33" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <line x1="65" y1="15" x2="65" y2="33" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <text x="62" y="44" textAnchor="middle" fontSize="6" fill="currentColor" opacity="0.7">fermé</text>
    <circle cx="95" cy="22" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <line x1="95" y1="22" x2="95" y2="14" stroke="currentColor" strokeWidth="1.5" />
    <line x1="95" y1="22" x2="88" y2="26" stroke="currentColor" strokeWidth="1.5" />
    <text x="95" y="44" textAnchor="middle" fontSize="6" fill="currentColor" opacity="0.7">21h-6h</text>
  </svg>
);

const BleuMeudonSchema = () => (
  <svg viewBox="0 0 120 50" className="w-full h-10">
    <rect x="10" y="5" width="45" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <circle cx="20" cy="15" r="4" fill="currentColor" opacity="0.2" />
    <circle cx="30" cy="22" r="5" fill="currentColor" opacity="0.15" />
    <circle cx="42" cy="12" r="3" fill="currentColor" opacity="0.2" />
    <circle cx="25" cy="32" r="4" fill="currentColor" opacity="0.18" />
    <circle cx="40" cy="28" r="6" fill="currentColor" opacity="0.12" />
    <circle cx="18" cy="38" r="3" fill="currentColor" opacity="0.15" />
    <path d="M 70 25 L 85 25" stroke="currentColor" strokeWidth="2" />
    <polygon points="82,21 90,25 82,29" fill="currentColor" />
    <circle cx="103" cy="15" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
    <line x1="103" y1="7" x2="103" y2="3" stroke="currentColor" strokeWidth="1.5" />
    <line x1="111" y1="15" x2="115" y2="15" stroke="currentColor" strokeWidth="1.5" />
    <line x1="95" y1="15" x2="91" y2="15" stroke="currentColor" strokeWidth="1.5" />
    <text x="103" y="44" textAnchor="middle" fontSize="6" fill="currentColor" opacity="0.7">-chaleur</text>
  </svg>
);

const HydratationSchema = () => (
  <svg viewBox="0 0 120 50" className="w-full h-10">
    <path d="M 25 40 L 25 15 Q 25 10 30 10 L 40 10 Q 45 10 45 15 L 45 40 Q 45 45 40 45 L 30 45 Q 25 45 25 40" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <path d="M 28 38 L 28 20 L 42 20 L 42 38" fill="currentColor" opacity="0.15" />
    <text x="35" y="34" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">💧</text>
    <text x="35" y="8" textAnchor="middle" fontSize="5" fill="currentColor" opacity="0.6">1.5-2L/j</text>
    <line x1="55" y1="25" x2="70" y2="25" stroke="currentColor" strokeWidth="2" />
    <line x1="67" y1="22" x2="70" y2="25" stroke="currentColor" strokeWidth="2" />
    <line x1="67" y1="28" x2="70" y2="25" stroke="currentColor" strokeWidth="2" />
    <circle cx="95" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5" />
    <text x="95" y="29" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.6">≠🧊</text>
    <text x="95" y="46" textAnchor="middle" fontSize="5" fill="currentColor" opacity="0.6">pas glacée</text>
  </svg>
);

const DoucheSchema = () => (
  <svg viewBox="0 0 120 50" className="w-full h-10">
    <circle cx="35" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <line x1="35" y1="20" x2="35" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <circle cx="32" cy="28" r="1" fill="currentColor" opacity="0.4" />
    <circle cx="35" cy="30" r="1" fill="currentColor" opacity="0.4" />
    <circle cx="38" cy="28" r="1" fill="currentColor" opacity="0.4" />
    <circle cx="33" cy="33" r="1" fill="currentColor" opacity="0.3" />
    <circle cx="37" cy="34" r="1" fill="currentColor" opacity="0.3" />
    <text x="35" y="46" textAnchor="middle" fontSize="5" fill="currentColor" opacity="0.6">tiède/fraîche</text>
    <line x1="55" y1="25" x2="70" y2="25" stroke="currentColor" strokeWidth="2" />
    <circle cx="95" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5" />
    <text x="95" y="29" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.6">≠❄️</text>
    <text x="95" y="46" textAnchor="middle" fontSize="5" fill="currentColor" opacity="0.6">pas froide</text>
  </svg>
);

const FRAICHEUR_TIPS: FraicheurTip[] = [
  {
    icon: <Clock className="w-5 h-5" />,
    titre: 'Quand ouvrir les fenêtres',
    texte: '🌅 Matin 6h-9h : ouvrir en grand (air frais)\n☀️ 10h-21h : tout fermer (volets, rideaux)\n🌙 Soir 21h-6h : rouvrir pour la nuit\nBloquer la chaleur AVANT qu\'elle n\'entre = -5°C !',
    schema: <HorairesSchema />,
    important: true,
  },
  {
    icon: <Wind className="w-5 h-5" />,
    titre: 'Créer un courant d\'air',
    texte: 'Ouvrez 2 fenêtres opposées (nord-sud ou est-ouest). L\'air chaud monte : si possible, ouvrez en bas côté frais et en haut côté chaud. Le courant d\'air naturel rafraîchit sans clim.',
    schema: <VentilationSchema />,
  },
  {
    icon: <Brush className="w-5 h-5" />,
    titre: 'Bleu de Meudon sur vitres',
    texte: 'Mélangez Bleu de Meudon + eau jusqu\'à obtenir une pâte liquide. Tapotez avec une éponge sur toutes les vitres exposées au soleil. La couleur blanche laisse passer la lumière mais réfléchit la chaleur. Pour nettoyer : un coup d\'éponge et d\'eau, ça part tout seul !',
    schema: <BleuMeudonSchema />,
  },
  {
    icon: <GlassWater className="w-5 h-5" />,
    titre: 'S\'hydrater correctement',
    texte: '💧 Boire 1,5 à 2L par jour, AVANT d\'avoir soif\n🚫 Éviter l\'eau GLACÉE (choc thermique, le corps chauffe pour compenser)\n✅ Eau fraîche ou température ambiante\n🍉 Manger des fruits d\'eau (pastèque, melon, concombre)',
    schema: <HydratationSchema />,
    important: true,
  },
  {
    icon: <Dumbbell className="w-5 h-5" />,
    titre: 'Sport & efforts physiques',
    texte: '⚠️ En canicule : ÉVITER tout effort entre 11h et 21h\n✅ Si sport : tôt le matin (avant 8h) ou tard le soir\n💧 S\'hydrater toutes les 15 min pendant l\'effort\n🏠 Privilégier des activités calmes à l\'ombre',
  },
  {
    icon: <ShowerHead className="w-5 h-5" />,
    titre: 'Douches rafraîchissantes',
    texte: '✅ Douche TIÈDE ou FRAÎCHE (pas froide !)\n🚫 L\'eau froide fait frissonner → le corps se réchauffe pour compenser\n💡 Mouiller nuque, poignets et chevilles = zones qui refroidissent vite\n🛁 Plusieurs douches courtes > 1 longue',
    schema: <DoucheSchema />,
  },
  {
    icon: <ThermometerSnowflake className="w-5 h-5" />,
    titre: 'Astuces rafraîchissantes',
    texte: '🧊 Ventilateur + bol de glaçons devant = effet clim\n🧺 Drap humide devant fenêtre ouverte la nuit\n🧴 Brumisateur d\'eau au frigo\n🛏️ Oreiller au congélateur 30 min avant de dormir\n💡 Éteindre les appareils (ils chauffent !)',
  },
  {
    icon: <Moon className="w-5 h-5" />,
    titre: 'Bien dormir par forte chaleur',
    texte: '🌙 Linge de lit en coton ou lin (respire)\n💧 Brumiser les draps légèrement\n🚫 Éviter l\'alcool le soir (déshydrate)\n🍽️ Dîner léger (la digestion réchauffe)\n💡 Dormir au rez-de-chaussée si possible (la chaleur monte)',
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
            🧹 Ménage
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
            🌡️ Canicule
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
                    {isOpen && (
                      <div className="animate-accordion-in">
                        <p className="px-3 pb-2.5 text-[12px] leading-relaxed" style={{ color: theme.textSecondary }}>
                          {tip.texte}
                        </p>
                      </div>
                    )}
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
                      border: tip.important
                        ? `1.5px solid ${darkMode ? 'rgba(251,146,60,0.4)' : 'rgba(234,88,12,0.3)'}`
                        : `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(14,165,233,0.15)'}`,
                    }}
                  >
                    <div className="flex items-center gap-2.5 py-2.5 px-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: tip.important
                            ? (darkMode ? 'rgba(251,146,60,0.2)' : 'rgba(234,88,12,0.12)')
                            : (darkMode ? 'rgba(56,189,248,0.15)' : 'rgba(14,165,233,0.1)'),
                          color: tip.important
                            ? (darkMode ? '#FB923C' : '#EA580C')
                            : (darkMode ? '#38BDF8' : '#0284C7'),
                        }}
                      >
                        {tip.icon}
                      </div>
                      <span className="flex-1 text-[13px] font-semibold" style={{ color: theme.textPrimary }}>
                        {tip.titre}
                        {tip.important && <span className="ml-1.5 text-[10px] opacity-60">⚠️</span>}
                      </span>
                      <ChevronRight
                        className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200"
                        style={{ color: theme.textMuted, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                      />
                    </div>
                    {isOpen && (
                      <div className="animate-accordion-in">
                        {tip.schema && (
                          <div
                            className="mx-3 mb-2 p-2 rounded-lg"
                            style={{
                              background: tip.important
                                ? (darkMode ? 'rgba(251,146,60,0.1)' : 'rgba(234,88,12,0.06)')
                                : (darkMode ? 'rgba(56,189,248,0.08)' : 'rgba(14,165,233,0.06)'),
                              color: tip.important
                                ? (darkMode ? '#FB923C' : '#EA580C')
                                : (darkMode ? '#38BDF8' : '#0284C7'),
                            }}
                          >
                            {tip.schema}
                          </div>
                        )}
                        <p
                          className="px-3 pb-2.5 text-[12px] leading-relaxed whitespace-pre-line"
                          style={{ color: theme.textSecondary }}
                        >
                          {tip.texte}
                        </p>
                      </div>
                    )}
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
