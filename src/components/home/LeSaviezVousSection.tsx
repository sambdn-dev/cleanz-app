'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { haptic } from '@/utils/haptics';

const TIPS_DATA = [
  "Votre frigo représente 20% de votre facture électrique. Un entretien régulier peut réduire sa consommation de 30% !",
  "Un lave-linge mal entretenu consomme jusqu'à 25% d'énergie en plus et dure 3 ans de moins.",
  "Saviez-vous ? Un filtre de climatisation sale augmente la consommation de 15%.",
  "La chaudière représente 60% de votre facture énergétique. L'entretien annuel est obligatoire ET économique !",
  "Un lave-vaisselle bien entretenu consomme moins d'eau qu'une vaisselle à la main.",
  "Le calcaire peut réduire l'efficacité de votre chauffe-eau de 40%. Détartrez-le une fois par an !",
  "Un four encrassé consomme jusqu'à 10% d'énergie en plus pour atteindre la même température.",
  "Les joints de votre frigo usés ? Jusqu'à 20% d'énergie gaspillée par les fuites d'air froid.",
  "Faire tourner votre lave-linge à 30°C au lieu de 60°C économise 60% d'électricité par cycle.",
  "Un micro-ondes sale met plus de temps à chauffer vos plats et consomme donc plus.",
  "Dégivrer votre congélateur quand le givre atteint 3mm peut économiser jusqu'à 30% d'énergie.",
  "Les filtres de hotte graisseux réduisent l'aspiration de 50%. Nettoyez-les chaque mois !",
  "Un radiateur poussiéreux perd jusqu'à 10% de son efficacité de chauffe.",
  "Le vinaigre blanc détartre aussi bien que les produits chimiques, pour 10x moins cher.",
  "Nettoyer la résistance de votre bouilloire prolonge sa durée de vie de 2 à 3 ans.",
  "Un sèche-linge avec un filtre encrassé consomme 30% d'énergie supplémentaire.",
  "Les appareils en veille représentent jusqu'à 10% de votre facture d'électricité annuelle.",
  "Un lave-vaisselle plein consomme autant qu'un lave-vaisselle à moitié vide. Optimisez !",
  "Le bicarbonate absorbe les odeurs du frigo pendant 3 mois. Changez-le régulièrement.",
  "Purger vos radiateurs chaque automne peut réduire votre facture de chauffage de 15%.",
];

export const LeSaviezVousSection = () => {
  const { theme, darkMode } = useTheme();
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Auto-rotation calme (9 secondes) pour réduire le bruit visuel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex(prev => (prev + 1) % TIPS_DATA.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const nextTip = () => { haptic('selection'); setCurrentTipIndex(prev => (prev + 1) % TIPS_DATA.length); };
  const prevTip = () => { haptic('selection'); setCurrentTipIndex(prev => (prev - 1 + TIPS_DATA.length) % TIPS_DATA.length); };

  return (
    <div className="mb-5">
      <div
        className="p-5 rounded-3xl relative overflow-hidden text-center"
        style={{
          // Fond blanc (feedback utilisateurs) — carte solide en mode sombre
          background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.95)',
          border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.05)',
          boxShadow: darkMode ? 'none' : '0 6px 24px rgba(149,108,180,0.14)',
        }}
      >
        {/* Header centré */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: darkMode
                ? 'rgba(255,133,192,0.18)'
                : 'linear-gradient(135deg, #FF69B4 0%, #DDA0DD 100%)',
              boxShadow: darkMode ? 'none' : '0 2px 8px rgba(255,105,180,0.3)',
            }}
          >
            <span className="text-base" aria-hidden>💡</span>
          </div>
          <span
            className="text-[11px] font-black uppercase tracking-widest"
            style={{ color: darkMode ? '#FF85C0' : '#FF69B4' }}
          >
            Le saviez-vous ?
          </span>
        </div>

        {/* Texte : grand, centré, lisible */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevTip}
            aria-label="Astuce précédente"
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
            style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,105,180,0.1)' }}
          >
            <ChevronLeft className="w-4 h-4" style={{ color: darkMode ? '#FF85C0' : '#FF69B4' }} />
          </button>

          <p
            className="flex-1 text-[17px] leading-snug font-semibold min-h-[76px] flex items-center justify-center"
            style={{ color: theme.textPrimary }}
          >
            {TIPS_DATA[currentTipIndex]}
          </p>

          <button
            onClick={nextTip}
            aria-label="Astuce suivante"
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
            style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,105,180,0.1)' }}
          >
            <ChevronRight className="w-4 h-4" style={{ color: darkMode ? '#FF85C0' : '#FF69B4' }} />
          </button>
        </div>

        {/* 4 points : indiquent le défilement (le point actif tourne) */}
        <div className="flex items-center justify-center gap-1.5 mt-3.5" aria-hidden>
          {[0, 1, 2, 3].map((i) => {
            const active = currentTipIndex % 4 === i;
            return (
              <span
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: active ? 18 : 6,
                  height: 6,
                  background: active
                    ? (darkMode ? '#FF85C0' : '#FF69B4')
                    : (darkMode ? 'rgba(255,133,192,0.25)' : 'rgba(255,105,180,0.25)'),
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
