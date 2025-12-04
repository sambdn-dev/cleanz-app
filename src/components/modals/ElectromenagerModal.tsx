'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Electromenager } from '@/types';
import { Clock, Zap, AlertCircle, Calendar, PiggyBank } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

interface ElectromenagerModalProps {
  appliance: Electromenager;
  onClose: () => void;
}

export const ElectromenagerModal = ({ appliance, onClose }: ElectromenagerModalProps) => {
  const { theme, darkMode } = useTheme();

  const colorMap: Record<string, string> = {
    'bg-blue-500': 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    'bg-cyan-500': 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
    'bg-emerald-500': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    'bg-orange-500': 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    'bg-violet-500': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    'bg-amber-700': 'linear-gradient(135deg, #B45309 0%, #92400E 100%)'
  };

  const headerGradient = colorMap[appliance.color] || colorMap['bg-blue-500'];

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      headerGradient={headerGradient}
      headerContent={
        <div className="flex items-center gap-4">
          <span className="text-5xl">{appliance.emoji}</span>
          <div>
            <h2 className="text-2xl font-bold text-white">{appliance.nom}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Zap className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm">{appliance.conso}</span>
            </div>
          </div>
        </div>
      }
    >
      {/* Nettoyage section */}
      <div className="mb-5">
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
          <span className="text-base">🧹</span> {appliance.nettoyer.titre}
        </h3>

        {/* Info row */}
        <div className="flex gap-3 mb-3">
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
        <div className="flex flex-wrap gap-2 mb-3">
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

        {/* Instructions */}
        <p
          className="text-sm leading-relaxed p-3 rounded-xl"
          style={{
            color: theme.textSecondary,
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
          }}
        >
          {appliance.nettoyer.instructions}
        </p>
      </div>

      {/* Entretien calendrier */}
      <div className="mb-5">
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
                className="text-[10px] font-bold block mb-1"
                style={{ color: theme.accentPink }}
              >
                {item.periode}
              </span>
              <ul className="space-y-0.5">
                {item.taches.map((tache, i) => (
                  <li key={i} className="text-xs flex items-center gap-2" style={{ color: theme.textSecondary }}>
                    <span className="text-emerald-500">•</span> {tache}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Économies */}
      <div
        className="p-4 rounded-2xl mb-5"
        style={{
          background: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.08)'
        }}
      >
        <div className="flex items-start gap-3">
          <PiggyBank className="w-5 h-5 text-emerald-500 mt-0.5" />
          <div>
            <span className="text-xs font-bold block mb-1" style={{ color: theme.textPrimary }}>Économies</span>
            <span className="text-xs" style={{ color: theme.textSecondary }}>
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
              <span className="text-amber-500 text-xs mt-0.5">⚠️</span>
              <span className="text-xs" style={{ color: theme.textSecondary }}>{alerte}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
