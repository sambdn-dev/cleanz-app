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

// Schémas SVG — uniquement quand un visuel aide vraiment (temporel / spatial), animés
const HorairesSchema = () => (
  <svg viewBox="0 0 220 100" className="w-full h-auto" role="img" aria-label="Aération selon l'heure de la journée">
    {/* sol */}
    <line x1="16" y1="66" x2="204" y2="66" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
    {/* trajet du soleil */}
    <path d="M 24 66 Q 110 6 196 66" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.4" />
    {/* séparateurs de phases */}
    <line x1="80" y1="60" x2="80" y2="72" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
    <line x1="140" y1="60" x2="140" y2="72" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
    {/* soleil animé qui se lève puis se couche */}
    <g>
      <animateMotion dur="7s" repeatCount="indefinite" path="M 24 66 Q 110 6 196 66" />
      <animate attributeName="opacity" values="0.15;1;1;1;0.15" keyTimes="0;0.18;0.5;0.82;1" dur="7s" repeatCount="indefinite" />
      <circle r="12" fill="currentColor" opacity="0.18" />
      <circle r="7" fill="currentColor" opacity="0.95" />
    </g>
    {/* libellés de phases */}
    <text x="48" y="84" textAnchor="middle" fontSize="11" fill="currentColor">🌅</text>
    <text x="48" y="96" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.85">6-9h ouvrir</text>
    <text x="110" y="84" textAnchor="middle" fontSize="11" fill="currentColor">🔒</text>
    <text x="110" y="96" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.85">10-21h fermer</text>
    <text x="172" y="84" textAnchor="middle" fontSize="11" fill="currentColor">🌙</text>
    <text x="172" y="96" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.85">21-6h ouvrir</text>
  </svg>
);

const VentilationSchema = () => (
  <svg viewBox="0 0 220 100" className="w-full h-auto" role="img" aria-label="Courant d'air traversant entre deux fenêtres opposées">
    {/* pièce */}
    <rect x="22" y="12" width="176" height="62" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    {/* fenêtre gauche ouverte (frais) */}
    <rect x="10" y="24" width="14" height="40" rx="2" fill="currentColor" opacity="0.14" stroke="currentColor" strokeWidth="1.3" />
    <line x1="17" y1="24" x2="17" y2="64" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
    {/* fenêtre droite ouverte (chaud) */}
    <rect x="196" y="24" width="14" height="40" rx="2" fill="currentColor" opacity="0.14" stroke="currentColor" strokeWidth="1.3" />
    <line x1="203" y1="24" x2="203" y2="64" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
    {/* trajectoire de l'air (guide pointillé léger qui défile) */}
    <path d="M 26 52 C 80 66, 140 30, 196 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 7" opacity="0.35">
      <animate attributeName="stroke-dashoffset" from="36" to="0" dur="1.4s" repeatCount="indefinite" />
    </path>
    {/* flèche de sortie */}
    <polygon points="189,34 200,40 189,46" fill="currentColor" opacity="0.85" />
    {/* particules d'air qui traversent réellement la pièce */}
    {[0, 0.7, 1.4].map((delay, i) => (
      <circle key={i} r={i === 1 ? 3.4 : 2.5} fill="currentColor">
        <animateMotion dur="2.1s" begin={`${delay}s`} repeatCount="indefinite" path="M 26 52 C 80 66, 140 30, 196 40" />
        <animate attributeName="opacity" values="0;0.95;0.95;0" keyTimes="0;0.15;0.8;1" dur="2.1s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
    ))}
    {/* libellés */}
    <text x="8" y="92" textAnchor="start" fontSize="9" fill="currentColor" opacity="0.9">❄️ frais</text>
    <text x="212" y="92" textAnchor="end" fontSize="9" fill="currentColor" opacity="0.9">chaud 🔥</text>
  </svg>
);

const BlancMeudonSchema = () => (
  <svg viewBox="0 0 220 100" className="w-full h-auto" role="img" aria-label="Le blanc de Meudon sur la vitre réfléchit la chaleur du soleil">
    {/* soleil avec rayons pulsés */}
    <circle cx="32" cy="30" r="11" fill="currentColor" opacity="0.9" />
    <g opacity="0.7">
      <animate attributeName="opacity" values="0.3;0.85;0.3" dur="2.4s" repeatCount="indefinite" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const r = (a * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={32 + 14 * Math.cos(r)}
            y1={30 + 14 * Math.sin(r)}
            x2={32 + 19 * Math.cos(r)}
            y2={30 + 19 * Math.sin(r)}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        );
      })}
    </g>
    {/* fenêtre enduite de blanc de Meudon */}
    <rect x="120" y="20" width="54" height="56" rx="3" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <line x1="147" y1="20" x2="147" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="120" y1="48" x2="174" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    {/* dépôt blanc (taches d'éponge) */}
    <g opacity="0.5" fill="currentColor">
      <circle cx="132" cy="34" r="3" />
      <circle cx="160" cy="38" r="2.4" />
      <circle cx="138" cy="61" r="2.6" />
      <circle cx="162" cy="62" r="3" />
      <circle cx="150" cy="30" r="2" />
    </g>
    {/* rayon entrant (soleil -> vitre) */}
    <path d="M 45 31 L 116 37" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="7 6" opacity="0.85">
      <animate attributeName="stroke-dashoffset" from="26" to="0" dur="1s" repeatCount="indefinite" />
    </path>
    {/* rayon réfléchi (chaleur renvoyée) */}
    <path d="M 116 45 L 50 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="7 6" opacity="0.85">
      <animate attributeName="stroke-dashoffset" from="0" to="26" dur="1s" repeatCount="indefinite" />
    </path>
    <polygon points="56,59 46,65 55,69" fill="currentColor" />
    {/* lumière douce qui passe (atténuée) */}
    <path d="M 174 48 L 202 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 5" opacity="0.3">
      <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.4s" repeatCount="indefinite" />
    </path>
    {/* libellés */}
    <text x="86" y="88" textAnchor="middle" fontSize="8.5" fill="currentColor" opacity="0.9">chaleur réfléchie</text>
    <text x="188" y="42" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.55">lumière</text>
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
    titre: 'Blanc de Meudon sur vitres',
    texte: 'Mélangez Blanc de Meudon + eau jusqu\'à obtenir une pâte liquide. Tapotez avec une éponge sur toutes les vitres exposées au soleil. La couche blanche laisse passer la lumière mais réfléchit la chaleur. Pour nettoyer : un coup d\'éponge et d\'eau, ça part tout seul !',
    schema: <BlancMeudonSchema />,
  },
  {
    icon: <GlassWater className="w-5 h-5" />,
    titre: 'S\'hydrater correctement',
    texte: '💧 Boire 1,5 à 2L par jour, AVANT d\'avoir soif\n🚫 Éviter l\'eau GLACÉE (choc thermique, le corps chauffe pour compenser)\n✅ Eau fraîche ou température ambiante\n🍉 Manger des fruits d\'eau (pastèque, melon, concombre)',
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
                            className="mx-3 mb-2 p-3 rounded-xl"
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
