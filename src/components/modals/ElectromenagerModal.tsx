'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Electromenager } from '@/types';
import { Clock, Zap, AlertCircle, Calendar, PiggyBank, Sparkles, Wrench, MapPin, CheckCircle2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

interface ElectromenagerModalProps {
  appliance: Electromenager;
  onClose: () => void;
}

type TabType = 'nettoyer' | 'entretien';

export const ElectromenagerModal = ({ appliance, onClose }: ElectromenagerModalProps) => {
  const { theme, darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('nettoyer');

  const colorMap: Record<string, string> = {
    'bg-blue-500': 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    'bg-cyan-500': 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
    'bg-emerald-500': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    'bg-orange-500': 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    'bg-violet-500': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    'bg-amber-700': 'linear-gradient(135deg, #B45309 0%, #92400E 100%)',
    'bg-red-500': 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    'bg-sky-500': 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    'bg-purple-500': 'linear-gradient(135deg, #A855F7 0%, #9333EA 100%)',
    'bg-gray-500': 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
    'bg-slate-500': 'linear-gradient(135deg, #64748B 0%, #475569 100%)',
    'bg-teal-500': 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)'
  };

  const headerGradient = colorMap[appliance.color] || colorMap['bg-blue-500'];

  // Couleur pour l'indicateur de consommation
  const getConsoColor = (pct: number) => {
    if (pct >= 20) return { bg: 'rgba(239, 68, 68, 0.15)', text: '#EF4444', label: 'Élevée' };
    if (pct >= 10) return { bg: 'rgba(251, 191, 36, 0.15)', text: '#FBBF24', label: 'Moyenne' };
    if (pct >= 5) return { bg: 'rgba(59, 130, 246, 0.15)', text: '#3B82F6', label: 'Modérée' };
    return { bg: 'rgba(34, 197, 94, 0.15)', text: '#22C55E', label: 'Faible' };
  };

  const consoStyle = getConsoColor(appliance.consoPct);

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      headerGradient={headerGradient}
      headerContent={
        <div className="flex items-center gap-4">
          <span className="text-5xl">{appliance.emoji}</span>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{appliance.nom}</h2>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/20">
                <Zap className="w-3.5 h-3.5 text-white" />
                <span className="text-white text-xs font-medium">{appliance.conso}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/20">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span className="text-white text-xs font-medium">{appliance.piece}</span>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* Energy consumption indicator */}
      <div
        className="flex items-center justify-between p-3 rounded-xl mb-4"
        style={{ background: consoStyle.bg }}
      >
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5" style={{ color: consoStyle.text }} />
          <div>
            <span className="text-[10px] block" style={{ color: theme.textMuted }}>
              Part de votre facture
            </span>
            <span className="text-sm font-bold" style={{ color: consoStyle.text }}>
              {appliance.consoPct}% de la consommation
            </span>
          </div>
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-semibold"
          style={{ background: consoStyle.bg, color: consoStyle.text }}
        >
          {consoStyle.label}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setActiveTab('nettoyer')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'nettoyer' ? 'shadow-lg' : ''
          }`}
          style={{
            background: activeTab === 'nettoyer'
              ? 'linear-gradient(135deg, #FF69B4 0%, #B794F4 100%)'
              : darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
            color: activeTab === 'nettoyer' ? 'white' : theme.textSecondary
          }}
        >
          <Sparkles className="w-4 h-4" />
          Nettoyer
        </button>
        <button
          onClick={() => setActiveTab('entretien')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'entretien' ? 'shadow-lg' : ''
          }`}
          style={{
            background: activeTab === 'entretien'
              ? 'linear-gradient(135deg, #4FD1C5 0%, #3B82F6 100%)'
              : darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
            color: activeTab === 'entretien' ? 'white' : theme.textSecondary
          }}
        >
          <Wrench className="w-4 h-4" />
          Entretien
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'nettoyer' && (
        <div className="space-y-4">
          {/* Title */}
          <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: theme.textPrimary }}>
            <span className="text-base">🧹</span> {appliance.nettoyer.titre}
          </h3>

          {/* Info row */}
          <div className="flex gap-3">
            <div
              className="flex-1 p-3 rounded-xl flex items-center gap-2"
              style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
            >
              <Clock className="w-4 h-4 text-pink-500" />
              <div>
                <span className="text-[10px] block" style={{ color: theme.textMuted }}>Durée</span>
                <span className="text-xs font-semibold" style={{ color: theme.textPrimary }}>{appliance.nettoyer.duree}</span>
              </div>
            </div>
            <div
              className="flex-1 p-3 rounded-xl flex items-center gap-2"
              style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
            >
              <Calendar className="w-4 h-4 text-cyan-500" />
              <div>
                <span className="text-[10px] block" style={{ color: theme.textMuted }}>Fréquence</span>
                <span className="text-xs font-semibold" style={{ color: theme.textPrimary }}>{appliance.nettoyer.frequence}</span>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h4 className="text-xs font-semibold mb-2" style={{ color: theme.textMuted }}>
              Ingrédients nécessaires
            </h4>
            <div className="flex flex-wrap gap-2">
              {appliance.nettoyer.ingredients.map((ing, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{
                    background: darkMode ? 'rgba(79, 209, 197, 0.2)' : 'rgba(79, 209, 197, 0.15)',
                    color: '#4FD1C5'
                  }}
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h4 className="text-xs font-semibold mb-2" style={{ color: theme.textMuted }}>
              Instructions
            </h4>
            <div
              className="p-4 rounded-xl"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
              }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: theme.textSecondary }}
              >
                {appliance.nettoyer.instructions}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'entretien' && (
        <div className="space-y-4">
          {/* Calendrier */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
              <Calendar className="w-4 h-4 text-violet-500" /> Calendrier d'entretien
            </h3>
            <div className="space-y-2">
              {appliance.entretien.calendrier.map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl"
                  style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
                >
                  <span
                    className="text-[10px] font-bold block mb-1.5"
                    style={{ color: theme.accentPink }}
                  >
                    {item.periode}
                  </span>
                  <ul className="space-y-1">
                    {item.taches.map((tache, i) => (
                      <li key={i} className="text-xs flex items-center gap-2" style={{ color: theme.textSecondary }}>
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                        {tache}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Économies */}
          <div
            className="p-4 rounded-2xl"
            style={{
              background: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.08)'
            }}
          >
            <div className="flex items-start gap-3">
              <PiggyBank className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold block mb-1" style={{ color: theme.textPrimary }}>
                  💰 Économies possibles
                </span>
                <span className="text-sm" style={{ color: theme.textSecondary }}>
                  {appliance.entretien.economies}
                </span>
              </div>
            </div>
          </div>

          {/* Alertes */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
              <AlertCircle className="w-4 h-4 text-amber-500" /> Signes d'alerte
            </h3>
            <div className="space-y-2">
              {appliance.entretien.alertes.map((alerte, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 rounded-xl"
                  style={{
                    background: darkMode ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.08)'
                  }}
                >
                  <span className="text-amber-500 text-sm mt-0.5">⚠️</span>
                  <span className="text-xs" style={{ color: theme.textSecondary }}>{alerte}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
