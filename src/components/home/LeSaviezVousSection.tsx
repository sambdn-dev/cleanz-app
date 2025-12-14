'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const { darkMode } = useTheme();
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Auto-rotation toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex(prev => (prev + 1) % TIPS_DATA.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTip = () => setCurrentTipIndex(prev => (prev + 1) % TIPS_DATA.length);
  const prevTip = () => setCurrentTipIndex(prev => (prev - 1 + TIPS_DATA.length) % TIPS_DATA.length);

  return (
    <div className="mb-5">
      <div
        className="p-4 rounded-3xl relative overflow-hidden"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, rgba(255,105,180,0.15) 0%, rgba(221,160,221,0.1) 50%, rgba(79,209,197,0.1) 100%)'
            : 'linear-gradient(135deg, #FFF0F5 0%, #FFE4EC 50%, #F8E1F4 100%)',
          border: darkMode
            ? '1px solid rgba(255,105,180,0.25)'
            : '1px solid rgba(255,182,193,0.4)',
          boxShadow: darkMode
            ? 'none'
            : '0 4px 20px rgba(255,105,180,0.12), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
      >
        {/* Cercles décoratifs en fond */}
        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(255,182,193,0.5) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(221,160,221,0.5) 0%, transparent 70%)' }}
        />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              {/* Icône ampoule */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: darkMode
                    ? 'linear-gradient(135deg, rgba(255,105,180,0.3) 0%, rgba(221,160,221,0.2) 100%)'
                    : 'linear-gradient(135deg, #FF69B4 0%, #DDA0DD 100%)',
                  boxShadow: darkMode ? 'none' : '0 2px 8px rgba(255,105,180,0.3)'
                }}
              >
                <span className="text-lg">💡</span>
              </div>
              {/* Titre */}
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: darkMode ? '#FF85C0' : '#FF69B4' }}
              >
                Le saviez-vous ?
              </span>
            </div>
            {/* Compteur */}
            <span
              className="text-[10px] font-semibold px-2 py-1 rounded-full"
              style={{
                background: darkMode ? 'rgba(255,105,180,0.15)' : 'rgba(255,105,180,0.15)',
                color: darkMode ? 'rgba(255,133,192,0.8)' : 'rgba(255,105,180,0.7)'
              }}
            >
              {currentTipIndex + 1}/{TIPS_DATA.length}
            </span>
          </div>

          {/* Texte du tip */}
          <p
            className="text-[15px] leading-relaxed font-medium mb-4"
            style={{ color: darkMode ? '#F5E6FF' : '#5A4A6A' }}
          >
            {TIPS_DATA[currentTipIndex]}
          </p>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {/* Flèche gauche */}
            <button
              onClick={prevTip}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90"
              style={{ background: darkMode ? 'rgba(255,105,180,0.15)' : 'rgba(255,105,180,0.15)' }}
            >
              <ChevronLeft className="w-4 h-4" style={{ color: darkMode ? '#FF85C0' : '#FF69B4' }} />
            </button>

            {/* Dots */}
            <div className="flex gap-1.5">
              {TIPS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTipIndex(idx)}
                  className="transition-all duration-300"
                  style={{
                    width: idx === currentTipIndex ? '16px' : '5px',
                    height: '5px',
                    borderRadius: '3px',
                    background: idx === currentTipIndex
                      ? (darkMode ? '#FF85C0' : '#FF69B4')
                      : (darkMode ? 'rgba(255,105,180,0.25)' : 'rgba(255,105,180,0.3)')
                  }}
                />
              ))}
            </div>

            {/* Flèche droite */}
            <button
              onClick={nextTip}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90"
              style={{ background: darkMode ? 'rgba(255,105,180,0.15)' : 'rgba(255,105,180,0.15)' }}
            >
              <ChevronRight className="w-4 h-4" style={{ color: darkMode ? '#FF85C0' : '#FF69B4' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
