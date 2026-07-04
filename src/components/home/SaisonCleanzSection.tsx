'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { getBlur } from '@/data/imageBlur';
import { haptic } from '@/utils/haptics';
import {
  Sun, Leaf, Snowflake, Flower2, ChevronRight, Wind, Moon, ThermometerSnowflake,
  GlassWater, Dumbbell, ShowerHead, Clock, Brush, Droplets, Sparkles, Wand2,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Détection de la saison en cours (hémisphère nord)                  */
/* ------------------------------------------------------------------ */
export type SaisonKey = 'printemps' | 'ete' | 'automne' | 'hiver';

export const getSaison = (d: Date = new Date()): SaisonKey => {
  const md = (d.getMonth() + 1) * 100 + d.getDate(); // ex : 21 juin -> 621
  if (md >= 320 && md <= 620) return 'printemps';
  if (md >= 621 && md <= 922) return 'ete';
  if (md >= 923 && md <= 1220) return 'automne';
  return 'hiver';
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Tip {
  emoji?: string;
  icon?: React.ReactNode;
  titre: string;
  texte: string;
  schema?: React.ReactNode;
  important?: boolean;
}
interface SaisonTab { label: string; tips: Tip[]; }
interface Saison {
  key: SaisonKey;
  label: string;
  emoji: string;
  titre: string;
  icon: React.ReactNode;
  heroGradient: string;
  heroImage?: string;
  badgeGradient: string;
  accent: string;      // mode clair
  accentDark: string;  // mode sombre
  tabs: SaisonTab[];
}

/* ------------------------------------------------------------------ */
/*  Schémas animés (été / canicule)                                    */
/* ------------------------------------------------------------------ */
const HorairesSchema = () => (
  <svg viewBox="0 0 220 100" className="w-full h-auto" role="img" aria-label="Aération selon l'heure de la journée">
    <line x1="16" y1="66" x2="204" y2="66" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
    <path d="M 24 66 Q 110 6 196 66" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.4" />
    <line x1="80" y1="60" x2="80" y2="72" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
    <line x1="140" y1="60" x2="140" y2="72" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
    <g>
      <animateMotion dur="7s" repeatCount="indefinite" path="M 24 66 Q 110 6 196 66" />
      <animate attributeName="opacity" values="0.15;1;1;1;0.15" keyTimes="0;0.18;0.5;0.82;1" dur="7s" repeatCount="indefinite" />
      <circle r="12" fill="currentColor" opacity="0.18" />
      <circle r="7" fill="currentColor" opacity="0.95" />
    </g>
    <text x="48" y="84" textAnchor="middle" fontSize="11" fill="currentColor">🌅</text>
    <text x="48" y="96" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.85">6-9h ouvrir</text>
    <text x="110" y="84" textAnchor="middle" fontSize="11" fill="currentColor">🔒</text>
    <text x="110" y="96" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.85">10-21h fermer</text>
    <text x="172" y="84" textAnchor="middle" fontSize="11" fill="currentColor">🌙</text>
    <text x="172" y="96" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.85">21-6h ouvrir</text>
  </svg>
);

const VentilationSchema = () => (
  <svg viewBox="0 0 220 122" className="w-full h-auto" role="img" aria-label="Un ventilateur face à la fenêtre ouverte pousse l'air chaud dehors">
    <polygon points="32,52 110,16 188,52" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="44" y="52" width="128" height="54" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
    <line x1="36" y1="106" x2="184" y2="106" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <rect x="54" y="82" width="15" height="24" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
    <rect x="160" y="60" width="14" height="34" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.4" />
    <line x1="167" y1="60" x2="167" y2="94" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    <path d="M 174 62 L 188 56 L 188 90 L 174 92" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.38" />
    <circle cx="116" cy="78" r="15" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
    <g>
      <animateTransform attributeName="transform" type="rotate" from="0 116 78" to="360 116 78" dur="0.9s" repeatCount="indefinite" />
      <ellipse cx="116" cy="70" rx="3" ry="7.5" fill="currentColor" opacity="0.8" />
      <ellipse cx="124" cy="78" rx="7.5" ry="3" fill="currentColor" opacity="0.8" />
      <ellipse cx="116" cy="86" rx="3" ry="7.5" fill="currentColor" opacity="0.8" />
      <ellipse cx="108" cy="78" rx="7.5" ry="3" fill="currentColor" opacity="0.8" />
    </g>
    <circle cx="116" cy="78" r="3" fill="currentColor" />
    <line x1="116" y1="93" x2="116" y2="104" stroke="currentColor" strokeWidth="1.6" opacity="0.6" />
    <line x1="108" y1="104" x2="124" y2="104" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    <path d="M 133 73 Q 158 71 196 70" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="9 7" opacity="0.85">
      <animate attributeName="stroke-dashoffset" from="32" to="0" dur="0.8s" repeatCount="indefinite" />
    </path>
    <path d="M 133 83 Q 158 85 196 86" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="9 7" opacity="0.6">
      <animate attributeName="stroke-dashoffset" from="32" to="0" dur="1.1s" repeatCount="indefinite" />
    </path>
    <polygon points="196,74 207,78 196,82" fill="currentColor" opacity="0.85" />
    {[0, 0.6].map((delay, i) => (
      <circle key={i} r="2.6" fill="currentColor">
        <animateMotion dur="1.4s" begin={`${delay}s`} repeatCount="indefinite" path="M 133 78 Q 165 78 205 78" />
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.2;0.8;1" dur="1.4s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
    ))}
    <text x="116" y="118" textAnchor="middle" fontSize="8.5" fill="currentColor" opacity="0.85">ventilateur</text>
    <text x="206" y="62" textAnchor="end" fontSize="8.5" fill="currentColor" opacity="0.85">air chaud 🔥</text>
  </svg>
);

const BlancMeudonSchema = () => (
  <svg viewBox="0 0 220 100" className="w-full h-auto" role="img" aria-label="Le blanc de Meudon sur la vitre réfléchit la chaleur du soleil">
    <circle cx="32" cy="30" r="11" fill="currentColor" opacity="0.9" />
    <g opacity="0.7">
      <animate attributeName="opacity" values="0.3;0.85;0.3" dur="2.4s" repeatCount="indefinite" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const r = (a * Math.PI) / 180;
        return (
          <line key={i} x1={32 + 14 * Math.cos(r)} y1={30 + 14 * Math.sin(r)} x2={32 + 19 * Math.cos(r)} y2={30 + 19 * Math.sin(r)} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        );
      })}
    </g>
    <rect x="120" y="20" width="54" height="56" rx="3" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <line x1="147" y1="20" x2="147" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="120" y1="48" x2="174" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <g opacity="0.5" fill="currentColor">
      <circle cx="132" cy="34" r="3" /><circle cx="160" cy="38" r="2.4" /><circle cx="138" cy="61" r="2.6" /><circle cx="162" cy="62" r="3" /><circle cx="150" cy="30" r="2" />
    </g>
    <path d="M 45 31 L 116 37" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="7 6" opacity="0.85">
      <animate attributeName="stroke-dashoffset" from="26" to="0" dur="1s" repeatCount="indefinite" />
    </path>
    <path d="M 116 45 L 50 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="7 6" opacity="0.85">
      <animate attributeName="stroke-dashoffset" from="0" to="26" dur="1s" repeatCount="indefinite" />
    </path>
    <polygon points="56,59 46,65 55,69" fill="currentColor" />
    <path d="M 174 48 L 202 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 5" opacity="0.3">
      <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.4s" repeatCount="indefinite" />
    </path>
    <text x="86" y="88" textAnchor="middle" fontSize="8.5" fill="currentColor" opacity="0.9">chaleur réfléchie</text>
    <text x="188" y="42" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.55">lumière</text>
  </svg>
);

const ToitFraisSchema = () => (
  <svg viewBox="0 0 220 116" className="w-full h-auto" role="img" aria-label="Arroser le toit le soir : l'eau s'évapore et emporte la chaleur stockée dans les tuiles">
    {/* Soleil couchant en haut à gauche : la chaleur stockée la journée */}
    <circle cx="30" cy="26" r="10" fill="currentColor" opacity="0.9" />
    <g opacity="0.7">
      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.6s" repeatCount="indefinite" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const r = (a * Math.PI) / 180;
        return (
          <line key={i} x1={30 + 13 * Math.cos(r)} y1={26 + 13 * Math.sin(r)} x2={30 + 17 * Math.cos(r)} y2={26 + 17 * Math.sin(r)} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        );
      })}
    </g>

    {/* Toit en pente vu de côté (parallélogramme) */}
    <polygon points="48,92 132,38 200,38 116,92" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Faîtage et avant-toit renforcés */}
    <line x1="132" y1="38" x2="200" y2="38" stroke="currentColor" strokeWidth="1.6" opacity="0.6" />
    <line x1="48" y1="92" x2="116" y2="92" stroke="currentColor" strokeWidth="1.6" opacity="0.6" />

    {/* Divisions des tuiles le long de la pente */}
    {[0, 1, 2, 3].map((k, i) => {
      const t = (k + 1) / 5;
      const x1 = 132 - 84 * t;
      const x2 = 200 - 84 * t;
      return (
        <line key={`row${i}`} x1={x1} y1={38 + 54 * t} x2={x2} y2={38 + 54 * t} stroke="currentColor" strokeWidth="1" opacity="0.4" />
      );
    })}
    {/* Joints transversaux suivant la pente, pour la texture */}
    {[0.28, 0.62].map((u, i) => {
      const xTop = 132 + (200 - 132) * u;
      const xBot = 48 + (116 - 48) * u;
      return (
        <line key={`col${i}`} x1={xTop} y1="38" x2={xBot} y2="92" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      );
    })}

    {/* Petit jet d'eau BLEU, diffus en fines gouttelettes, qui arrose les tuiles */}
    {/* Buse */}
    <circle cx="56" cy="64" r="1.8" fill="#0EA5E9" opacity="0.85" />
    {/* Éventail de fines gouttelettes : chaque goutte suit un arc légèrement différent */}
    {[
      { lx: 118, ly: 79, peak: 40, r: 1.3, dur: 1.25, delay: 0.0 },
      { lx: 130, ly: 74, peak: 34, r: 1.0, dur: 1.35, delay: 0.18 },
      { lx: 140, ly: 70, peak: 30, r: 1.35, dur: 1.2, delay: 0.45 },
      { lx: 150, ly: 66, peak: 28, r: 1.05, dur: 1.4, delay: 0.62 },
      { lx: 159, ly: 63, peak: 29, r: 0.85, dur: 1.28, delay: 0.3 },
      { lx: 168, ly: 60, peak: 32, r: 1.2, dur: 1.32, delay: 0.78 },
      { lx: 146, ly: 67, peak: 25, r: 0.8, dur: 1.45, delay: 0.95 },
      { lx: 134, ly: 72, peak: 33, r: 0.95, dur: 1.22, delay: 0.55 },
    ].map((d, i) => (
      <circle key={`spray${i}`} r={d.r} fill="#38BDF8">
        <animateMotion dur={`${d.dur}s`} begin={`${d.delay}s`} repeatCount="indefinite" path={`M 56 64 Q ${Math.round((56 + d.lx) / 2)} ${d.peak} ${d.lx} ${d.ly}`} />
        <animate attributeName="opacity" values="0;0.95;0.8;0" keyTimes="0;0.18;0.8;1" dur={`${d.dur}s`} begin={`${d.delay}s`} repeatCount="indefinite" />
      </circle>
    ))}
    {/* Voile de micro-gouttelettes qui scintille au point de chute (effet brume) */}
    {[
      { x: 150, y: 65, delay: 0.2 },
      { x: 160, y: 62, delay: 0.5 },
      { x: 142, y: 69, delay: 0.8 },
      { x: 168, y: 60, delay: 1.0 },
    ].map((m, i) => (
      <circle key={`mist${i}`} cx={m.x} cy={m.y} r="0.7" fill="#7DD3FC">
        <animate attributeName="opacity" values="0;0.7;0" keyTimes="0;0.5;1" dur="1.3s" begin={`${m.delay}s`} repeatCount="indefinite" />
      </circle>
    ))}

    {/* Vapeur ondulée qui s'élève des tuiles mouillées */}
    {[
      { x: 144, delay: 0 },
      { x: 168, delay: 0.7 },
    ].map((v, i) => (
      <path
        key={`vap${i}`}
        d={`M ${v.x} 62 q 6 -8 0 -16 q -6 -8 0 -16 q 6 -8 0 -16`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="7 7"
        opacity="0.7"
      >
        <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.4s" begin={`${v.delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.15;0.75;0.15" dur="2.8s" begin={`${v.delay}s`} repeatCount="indefinite" />
      </path>
    ))}

    {/* Marqueur de chaleur 🔥 emporté vers le haut par la vapeur */}
    <g>
      <animateMotion dur="3.2s" repeatCount="indefinite" path="M 158 58 Q 168 24 176 4" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.7;1" dur="3.2s" repeatCount="indefinite" />
      <text x="0" y="0" textAnchor="middle" fontSize="13" fill="currentColor">🔥</text>
    </g>

    {/* Étiquettes */}
    <text x="76" y="108" textAnchor="middle" fontSize="8.5" fill="currentColor" opacity="0.85">💧 arroser souvent</text>
    <text x="170" y="108" textAnchor="middle" fontSize="8.5" fill="currentColor" opacity="0.85">chaleur évacuée 🔥</text>
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Données des 4 saisons                                              */
/* ------------------------------------------------------------------ */
const SAISONS: Record<SaisonKey, Saison> = {
  ete: {
    key: 'ete',
    label: 'Été',
    emoji: '☀️',
    titre: "L'été avec Cleanz",
    icon: <Sun className="w-4 h-4 text-white" />,
    heroGradient: 'linear-gradient(135deg, #FDBA74 0%, #FB7185 45%, #38BDF8 100%)',
    heroImage: '/images/sections/ete-cleanz.jpg',
    badgeGradient: 'linear-gradient(135deg, #FBBF24 0%, #FB923C 100%)',
    accent: '#EA580C',
    accentDark: '#FB923C',
    tabs: [
      {
        label: '🧹 Ménage',
        tips: [
          { emoji: '🍖', titre: 'Barbecue impeccable', texte: 'Frottez la grille encore tiède avec un demi-oignon, puis bicarbonate + vinaigre pour décoller les graisses cuites.' },
          { emoji: '🦟', titre: 'Anti-moustiques naturel', texte: 'Spray eau + vinaigre + HE citronnelle sur les rebords de fenêtres. Efficace et sans chimie.' },
          { emoji: '🏖️', titre: 'Terrasse & salon de jardin', texte: 'Savon noir + cristaux de soude redonnent vie au plastique jauni et au bois grisé.' },
          { emoji: '🧊', titre: 'Glacière sans odeurs', texte: 'Bicarbonate + jus de citron pour désinfecter avant les pique-niques.' },
          { emoji: '👟', titre: 'Baskets fraîches', texte: 'Poudre bicarbonate + maïzena + tea tree la nuit : adieu odeurs de transpiration.' },
        ],
      },
      {
        label: '🌡️ Canicule',
        tips: [
          { icon: <Clock className="w-5 h-5" />, titre: 'Quand ouvrir les fenêtres', texte: '🌅 Matin 6h-9h : ouvrir en grand (air frais)\n☀️ 10h-21h : tout fermer (volets, rideaux)\n🌙 Soir 21h-6h : rouvrir pour la nuit\nBloquer la chaleur AVANT qu\'elle n\'entre = -5°C !', schema: <HorairesSchema />, important: true },
          { icon: <Wind className="w-5 h-5" />, titre: 'Créer un courant d\'air', texte: 'Ouvrez 2 fenêtres opposées (nord-sud ou est-ouest) pour créer un courant d\'air traversant.\n💨 Astuce : placez un ventilateur juste devant une fenêtre, tourné vers l\'extérieur, pour chasser l\'air chaud plus vite.\n🌙 Le soir et la nuit = le moment idéal pour évacuer la chaleur accumulée.', schema: <VentilationSchema /> },
          { icon: <Brush className="w-5 h-5" />, titre: 'Blanc de Meudon sur vitres', texte: 'Mélangez Blanc de Meudon + eau jusqu\'à obtenir une pâte liquide. Tapotez avec une éponge sur toutes les vitres exposées au soleil. La couche blanche laisse passer la lumière mais réfléchit la chaleur. Pour nettoyer : un coup d\'éponge et d\'eau, ça part tout seul !', schema: <BlancMeudonSchema /> },
          { icon: <Droplets className="w-5 h-5" />, titre: 'Rafraîchir toits & terrasses', texte: '💧 Arrosez les tuiles, dalles et murs encore brûlants — plusieurs fois par jour, même en plein soleil.\n🌡️ Au contact des surfaces chaudes, l\'eau s\'évapore aussitôt et emporte la chaleur : la surface, l\'air autour et les pièces situées sous un toit plein sud se rafraîchissent d\'un coup.\n🔁 À renouveler dès que le soleil tape fort, et le soir pour faire retomber la chaleur emmagasinée dans la journée.', schema: <ToitFraisSchema /> },
          { icon: <GlassWater className="w-5 h-5" />, titre: 'S\'hydrater correctement', texte: '💧 Boire 1,5 à 2L par jour, AVANT d\'avoir soif\n🚫 Éviter l\'eau GLACÉE (choc thermique)\n✅ Eau fraîche ou température ambiante\n🍉 Manger des fruits d\'eau (pastèque, melon, concombre)', important: true },
          { icon: <Dumbbell className="w-5 h-5" />, titre: 'Sport & efforts physiques', texte: '⚠️ En canicule : ÉVITER tout effort entre 11h et 21h\n✅ Si sport : tôt le matin (avant 8h) ou tard le soir\n💧 S\'hydrater toutes les 15 min\n🏠 Privilégier des activités calmes à l\'ombre' },
          { icon: <ShowerHead className="w-5 h-5" />, titre: 'Douches rafraîchissantes', texte: '✅ Douche TIÈDE ou FRAÎCHE (pas froide !)\n🚫 L\'eau froide fait frissonner → le corps se réchauffe pour compenser\n💡 Mouiller nuque, poignets et chevilles\n🛁 Plusieurs douches courtes > 1 longue' },
          { icon: <ThermometerSnowflake className="w-5 h-5" />, titre: 'Astuces rafraîchissantes', texte: '🧊 Ventilateur + bol de glaçons devant = effet clim\n🧺 Drap humide devant fenêtre ouverte la nuit\n🧴 Brumisateur d\'eau au frigo\n🛏️ Oreiller au congélateur 30 min avant de dormir' },
          { icon: <Moon className="w-5 h-5" />, titre: 'Bien dormir par forte chaleur', texte: '🌙 Linge de lit en coton ou lin (respire)\n💧 Brumiser les draps légèrement\n🚫 Éviter l\'alcool le soir (déshydrate)\n🍽️ Dîner léger (la digestion réchauffe)' },
        ],
      },
    ],
  },

  automne: {
    key: 'automne',
    label: 'Automne',
    emoji: '🍂',
    titre: "L'automne avec Cleanz",
    icon: <Leaf className="w-4 h-4 text-white" />,
    heroGradient: 'linear-gradient(135deg, #FBBF24 0%, #B45309 50%, #7C2D12 100%)',
    badgeGradient: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)',
    accent: '#B45309',
    accentDark: '#F59E0B',
    tabs: [
      {
        label: '🍂 Ménage',
        tips: [
          { emoji: '🍂', titre: 'Feuilles & terrasse', texte: 'Ramassez les feuilles mortes régulièrement : mouillées, elles deviennent glissantes et tachent les dalles. Brossez ensuite au savon noir.' },
          { emoji: '🪟', titre: 'Vitres avant l\'hiver', texte: 'Profitez des derniers jours doux pour faire les vitres au vinaigre blanc — on en profitera tout l\'hiver quand la lumière se fait rare.' },
          { emoji: '🧥', titre: 'Ranger les vêtements d\'été', texte: 'Lavez tout AVANT de ranger (les taches invisibles attirent les mites). Glissez des sachets de lavande ou des blocs de cèdre dans les placards.' },
          { emoji: '🛋️', titre: 'Grand nettoyage intérieur', texte: 'Tapis, rideaux et canapé : un nettoyage en profondeur avant de fermer les fenêtres pour l\'hiver = un air intérieur plus sain.' },
          { emoji: '🔥', titre: 'Préparer le chauffage', texte: 'Dépoussiérez radiateurs et grilles, et faites vérifier la chaudière avant les premiers froids (entretien annuel obligatoire).' },
        ],
      },
      {
        label: '🌧️ Humidité',
        tips: [
          { icon: <Droplets className="w-5 h-5" />, titre: 'Lutter contre l\'humidité', texte: '💨 Aérez 10 min/jour même quand il pleut (l\'air extérieur est moins humide que l\'air confiné).\n🌫️ Un absorbeur d\'humidité dans les pièces sans fenêtre.', important: true },
          { icon: <Wind className="w-5 h-5" />, titre: 'Anti-condensation', texte: '🪟 Essuyez la condensation sur les vitres le matin pour éviter moisissures et bois gonflé.\n🍳 Couvrez les casseroles et activez la hotte en cuisinant.' },
          { icon: <Sparkles className="w-5 h-5" />, titre: 'Anti-moisissures', texte: '🍄 Dès les premiers points noirs sur les joints ou les angles : vinaigre blanc pur, on laisse agir 30 min, on frotte.\n🌬️ Décollez les meubles des murs froids pour laisser l\'air circuler.' },
          { icon: <Moon className="w-5 h-5" />, titre: 'Acariens & literie', texte: '🛏️ Lavez draps et housses à 60°C, aérez la literie.\n☀️ Profitez des éclaircies pour sortir oreillers et couettes.' },
        ],
      },
    ],
  },

  hiver: {
    key: 'hiver',
    label: 'Hiver',
    emoji: '❄️',
    titre: "L'hiver avec Cleanz",
    icon: <Snowflake className="w-4 h-4 text-white" />,
    heroGradient: 'linear-gradient(135deg, #38BDF8 0%, #6366F1 55%, #1E293B 100%)',
    badgeGradient: 'linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)',
    accent: '#0284C7',
    accentDark: '#38BDF8',
    tabs: [
      {
        label: '❄️ Ménage',
        tips: [
          { emoji: '🧤', titre: 'Sols & boue', texte: 'Un paillasson efficace + nettoyage fréquent : le sel de déneigement et la boue abîment les sols. Sur le parquet, essuyez vite (le sel laisse des traces blanches).' },
          { emoji: '🪟', titre: 'Vitres embuées', texte: 'Vinaigre blanc + une pointe de liquide vaisselle : nettoie ET laisse un léger film anti-buée naturel.' },
          { emoji: '🔥', titre: 'Radiateurs propres', texte: 'Un radiateur dépoussiéré diffuse mieux la chaleur (et consomme moins). Passez un goupillon ou un sèche-cheveux derrière les ailettes.' },
          { emoji: '🎄', titre: 'Après les fêtes', texte: 'Taches de bougie : grattez le surplus, posez un papier absorbant et passez le fer tiède dessus. Aiguilles de sapin : aspirez, puis ruban adhésif pour les dernières.' },
          { emoji: '🧥', titre: 'Doudounes & plaids', texte: 'Lavage doux + 2-3 balles de tennis dans le sèche-linge pour regonfler le duvet. Évitez l\'adoucissant (il écrase les plumes).' },
        ],
      },
      {
        label: '🌡️ Air & confort',
        tips: [
          { icon: <Wind className="w-5 h-5" />, titre: 'Aérer même en hiver', texte: '💨 10 min/jour fenêtres grandes ouvertes (chauffage coupé) : on renouvelle l\'air sans refroidir les murs.\n🦠 Indispensable contre l\'humidité et les virus de l\'air confiné.', schema: <HorairesSchema />, important: true },
          { icon: <Droplets className="w-5 h-5" />, titre: 'Air trop sec', texte: '💧 Le chauffage assèche l\'air : posez un récipient d\'eau sur le radiateur, ajoutez des plantes, et hydratez-vous.\n🌿 Un linge humide sur le radiateur fait office d\'humidificateur.' },
          { icon: <Sparkles className="w-5 h-5" />, titre: 'Saison des virus', texte: '🦠 Désinfectez les points de contact (poignées, interrupteurs, télécommandes) au vinaigre + HE tea tree.\n🤧 Lavez plus souvent torchons et essuie-mains.' },
          { icon: <ThermometerSnowflake className="w-5 h-5" />, titre: 'Chauffage malin', texte: '🌡️ 19°C le jour, 17°C la nuit : confort + économies.\n🚪 Fermez les pièces inutilisées et baissez les volets la nuit pour garder la chaleur.' },
        ],
      },
    ],
  },

  printemps: {
    key: 'printemps',
    label: 'Printemps',
    emoji: '🌸',
    titre: "Le printemps avec Cleanz",
    icon: <Flower2 className="w-4 h-4 text-white" />,
    heroGradient: 'linear-gradient(135deg, #86EFAC 0%, #34D399 50%, #22D3EE 100%)',
    badgeGradient: 'linear-gradient(135deg, #34D399 0%, #22D3EE 100%)',
    accent: '#16A34A',
    accentDark: '#34D399',
    tabs: [
      {
        label: '🌸 Grand ménage',
        tips: [
          { emoji: '🪟', titre: 'Vitres impeccables', texte: 'Choisissez un jour nuageux (le soleil sèche trop vite et laisse des traces). Vinaigre blanc + microfibre ou raclette.' },
          { emoji: '🧺', titre: 'Rideaux & textiles', texte: 'Après l\'hiver, lavez rideaux, voilages, housses de coussin et plaids : ils ont accumulé poussière et air confiné.' },
          { emoji: '🛋️', titre: 'Désencombrer', texte: 'Le grand tri de printemps : on vide, on trie, on donne. Plus facile de nettoyer en profondeur quand c\'est dégagé.' },
          { emoji: '🌿', titre: 'Aérer à fond', texte: 'Ouvrez tout en grand plusieurs fois par jour pour renouveler l\'air après des mois fenêtres fermées.' },
          { emoji: '✨', titre: 'Les recoins oubliés', texte: 'Plinthes, dessus d\'armoires, derrière l\'électroménager, grilles d\'aération : les zones qu\'on ne fait qu\'1 à 2 fois par an.' },
        ],
      },
      {
        label: '🤧 Pollen & allergies',
        tips: [
          { icon: <Flower2 className="w-5 h-5" />, titre: 'Limiter le pollen', texte: '🌼 Aérez tôt le matin ou tard le soir (pics de pollen en milieu de journée).\n🪟 Fenêtres fermées aux heures chaudes et venteuses.', important: true },
          { icon: <Wand2 className="w-5 h-5" />, titre: 'Capter le pollen', texte: '🧹 Microfibre HUMIDE (jamais à sec : ça fait voler les particules).\n🌀 Aspirateur avec filtre HEPA pour ne pas le recracher.' },
          { icon: <ShowerHead className="w-5 h-5" />, titre: 'Vêtements & cheveux', texte: '👕 Changez-vous en rentrant et ne séchez pas le linge dehors en pleine saison.\n🚿 Une douche le soir évite de ramener le pollen dans le lit.' },
          { icon: <Moon className="w-5 h-5" />, titre: 'Literie & air sain', texte: '🛏️ Lavez la literie plus souvent (le pollen s\'y dépose).\n🌿 Plantes dépolluantes et aération aux bonnes heures.' },
        ],
      },
    ],
  },
};

const ORDER: SaisonKey[] = ['printemps', 'ete', 'automne', 'hiver'];

/* ------------------------------------------------------------------ */
/*  Composant                                                          */
/* ------------------------------------------------------------------ */
interface SaisonCleanzSectionProps {
  /** Période de chaleur détectée : met l'Été + l'onglet Canicule en avant. */
  heatActive?: boolean;
  /** Affiché dans la feuille plein écran : masque la bannière hero + le chrome de carte. */
  embedded?: boolean;
}

export const SaisonCleanzSection = ({ heatActive = false, embedded = false }: SaisonCleanzSectionProps) => {
  const { theme, darkMode } = useTheme();
  const saisonActuelle = getSaison();
  const [selected, setSelected] = useState<SaisonKey>(heatActive ? 'ete' : saisonActuelle);
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState<number | null>(0);

  // En période de chaleur : bascule auto sur Été + onglet Canicule (même hors plein été).
  useEffect(() => {
    if (heatActive) {
      setSelected('ete');
      setActiveTab(0);
      setOpen(0);
      setImgError(false);
    }
  }, [heatActive]);

  const saison = SAISONS[selected];
  const accent = darkMode ? saison.accentDark : saison.accent;

  // « Canicule » est TOUJOURS l'onglet prioritaire (premier + sélectionné par défaut)
  // dans l'été — indépendamment de la météo.
  let displayTabs = saison.tabs;
  if (saison.key === 'ete') {
    const idx = saison.tabs.findIndex((t) => /canicule/i.test(t.label));
    if (idx > 0) {
      displayTabs = [...saison.tabs];
      displayTabs.unshift(displayTabs.splice(idx, 1)[0]);
    }
  }

  const tab = displayTabs[activeTab] ?? displayTabs[0];

  const pickSaison = (k: SaisonKey) => {
    if (k === selected) return;
    haptic('selection');
    setSelected(k);
    setActiveTab(0);
    setOpen(0);
    setImgError(false);
  };
  const switchTab = (i: number) => {
    if (i === activeTab) return;
    haptic('selection');
    setActiveTab(i);
    setOpen(0);
  };
  const toggle = (i: number) => {
    haptic('selection');
    setOpen((p) => (p === i ? null : i));
  };

  return (
    <div className={embedded ? '' : 'mb-5'} id="saison-cleanz">
      {/* Sélecteur de saison (par défaut : saison en cours) */}
      <div className="flex gap-1.5 mb-2.5 overflow-x-auto scrollbar-hide -mx-1 px-1">
        {ORDER.map((k) => {
          const s = SAISONS[k];
          const active = k === selected;
          const isNow = k === saisonActuelle;
          return (
            <button
              key={k}
              onClick={() => pickSaison(k)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all active:scale-95 flex-shrink-0"
              style={{
                background: active ? s.badgeGradient : (darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                color: active ? '#fff' : theme.textMuted,
                border: active ? 'none' : `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`,
              }}
            >
              <span>{s.emoji}</span>
              {s.label}
              {isNow && (
                <span
                  className="text-[8px] px-1 py-0.5 rounded-full font-bold uppercase tracking-wide"
                  style={{ background: active ? 'rgba(255,255,255,0.25)' : (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)') }}
                >
                  actuelle
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        className="rounded-3xl overflow-hidden relative"
        style={{
          background: embedded ? 'transparent' : darkMode ? 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)' : 'rgba(255,255,255,0.55)',
          border: embedded ? 'none' : `1px solid ${accent}38`,
          boxShadow: embedded ? 'none' : darkMode ? 'none' : `0 8px 28px ${accent}24`,
        }}
      >
        {/* Bannière (masquée en mode embedded : la feuille a déjà sa bannière photo) */}
        {!embedded && (
        <div className="relative h-32 w-full overflow-hidden">
          {saison.heroImage && !imgError ? (
            <Image
              src={saison.heroImage}
              alt={saison.titre}
              fill
              sizes="(max-width: 480px) 100vw, 480px"
              className="object-cover"
              placeholder={getBlur(saison.heroImage) ? 'blur' : 'empty'}
              blurDataURL={getBlur(saison.heroImage)}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0" style={{ background: saison.heroGradient }} />
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
          <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: saison.badgeGradient }}>
              {saison.icon}
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/70">Spécial saison</p>
              <h3 className="font-display text-lg font-extrabold text-white leading-tight">{saison.titre}</h3>
            </div>
          </div>
        </div>
        )}

        {/* Onglets */}
        <div className="flex gap-1.5 px-3 pt-3">
          {displayTabs.map((t, i) => (
            <button
              key={i}
              onClick={() => switchTab(i)}
              className="flex-1 py-2 px-3 rounded-xl text-[13px] font-bold transition-all"
              style={{
                background: activeTab === i ? `${accent}26` : 'transparent',
                color: activeTab === i ? accent : theme.textMuted,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Contenu */}
        <div className="p-3 space-y-1.5">
          {tab.tips.map((tip, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                className="w-full text-left rounded-xl transition-all active:scale-[0.99]"
                style={{
                  background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
                  border: tip.important
                    ? `1.5px solid ${accent}66`
                    : `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : `${accent}26`}`,
                }}
              >
                <div className="flex items-center gap-2.5 py-2.5 px-3">
                  {tip.icon ? (
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${accent}1f`, color: accent }}
                    >
                      {tip.icon}
                    </div>
                  ) : (
                    <span className="text-lg flex-shrink-0">{tip.emoji}</span>
                  )}
                  <span className="flex-1 text-[15px] font-semibold" style={{ color: theme.textPrimary }}>
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
                      <div className="mx-3 mb-2 p-3 rounded-xl" style={{ background: `${accent}12`, color: accent }}>
                        {tip.schema}
                      </div>
                    )}
                    <p className="px-3 pb-2.5 text-[14px] leading-relaxed whitespace-pre-line" style={{ color: theme.textSecondary }}>
                      {tip.texte}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
