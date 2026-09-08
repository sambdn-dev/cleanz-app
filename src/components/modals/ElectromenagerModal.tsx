'use client';

import { getPhotoBySlug } from '@/data/scenes';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Electromenager } from '@/types';
import { Zap, MapPin, Sparkles, Wrench, CheckCircle2, Lightbulb } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { SectionTitle, Steps, Chip, Callout, ACCENT } from '@/components/ui/ModalParts';

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
    'bg-blue-400': 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
    'bg-blue-600': 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    'bg-cyan-500': 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
    'bg-cyan-400': 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
    'bg-emerald-500': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    'bg-emerald-400': 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
    'bg-orange-500': 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    'bg-orange-400': 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)',
    'bg-violet-500': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    'bg-amber-500': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    'bg-amber-700': 'linear-gradient(135deg, #B45309 0%, #92400E 100%)',
    'bg-red-500': 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    'bg-sky-500': 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    'bg-purple-500': 'linear-gradient(135deg, #A855F7 0%, #9333EA 100%)',
    'bg-gray-500': 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
    'bg-slate-500': 'linear-gradient(135deg, #64748B 0%, #475569 100%)',
    'bg-teal-500': 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
    'bg-indigo-500': 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
    'bg-indigo-400': 'linear-gradient(135deg, #818CF8 0%, #6366F1 100%)',
    'bg-rose-500': 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)',
  };

  const headerGradient = colorMap[appliance.color] || colorMap['bg-blue-500'];
  // Photo de la surface homonyme (Lave-vaisselle, Hotte, Airfryer…) si elle existe.
  const headerImageUrl = getPhotoBySlug(appliance.nom);
  const hasImage = !!headerImageUrl;
  // Les photos Matériel sont en portrait : on vise le corps de l'appareil, pas le haut de la scène.
  const headerImagePosition = headerImageUrl?.includes('/materiel/') ? 'center 62%' : undefined;

  const getConsoColor = (pct: number) => {
    if (pct >= 20) return { bg: 'rgba(239, 68, 68, 0.12)', text: '#EF4444', label: 'Élevée' };
    if (pct >= 10) return { bg: 'rgba(217, 164, 65, 0.14)', text: '#B97A33', label: 'Moyenne' };
    if (pct >= 5) return { bg: 'rgba(127, 168, 201, 0.14)', text: '#5E84A8', label: 'Modérée' };
    return { bg: 'rgba(139, 168, 136, 0.14)', text: '#4B5D3F', label: 'Faible' };
  };

  const consoStyle = getConsoColor(appliance.consoPct);

  // Découpe les instructions (chaîne unique) en étapes.
  const nettoyerSteps = appliance.nettoyer.instructions
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.endsWith('.') ? s : s + '.'));

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      headerGradient={headerGradient}
      headerImageUrl={headerImageUrl}
      headerImagePosition={headerImagePosition}
      headerContent={
        <div
          className={hasImage ? 'flex flex-col justify-end' : 'flex items-center gap-4'}
          style={hasImage ? { minHeight: 130 } : undefined}
        >
          {!hasImage && <span className="text-5xl">{appliance.emoji}</span>}
          <div className="flex-1">
            <h2
              className="font-display text-xl font-extrabold text-white"
              style={hasImage ? { textShadow: '0 1px 3px rgba(0,0,0,0.45)' } : undefined}
            >
              {hasImage && <span className="mr-2">{appliance.emoji}</span>}{appliance.nom}
            </h2>
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
      {/* Consommation */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl mb-5" style={{ background: consoStyle.bg, borderLeft: `3px solid ${consoStyle.text}` }}>
        <div className="flex items-center gap-2.5">
          <Zap className="w-5 h-5" style={{ color: consoStyle.text }} />
          <div>
            <span className="text-[10px] block" style={{ color: theme.textMuted }}>Part de votre facture</span>
            <span className="text-sm font-bold" style={{ color: consoStyle.text }}>{appliance.consoPct}% de la consommation</span>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)', color: consoStyle.text }}>
          {consoStyle.label}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('nettoyer')}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all"
          style={{
            background: activeTab === 'nettoyer' ? 'linear-gradient(135deg, #FF69B4 0%, #B794F4 100%)' : darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)',
            color: activeTab === 'nettoyer' ? 'white' : theme.textSecondary,
            boxShadow: activeTab === 'nettoyer' ? '0 4px 14px rgba(255,105,180,0.3)' : 'none',
          }}
        >
          <Sparkles className="w-4 h-4" />
          Nettoyer
        </button>
        <button
          onClick={() => setActiveTab('entretien')}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all"
          style={{
            background: activeTab === 'entretien' ? 'linear-gradient(135deg, #4FD1C5 0%, #3B82F6 100%)' : darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)',
            color: activeTab === 'entretien' ? 'white' : theme.textSecondary,
            boxShadow: activeTab === 'entretien' ? '0 4px 14px rgba(79,209,197,0.3)' : 'none',
          }}
        >
          <Wrench className="w-4 h-4" />
          Entretien
        </button>
      </div>

      {activeTab === 'nettoyer' && (
        <div className="space-y-6">
          {/* Les conseils de Cleanz */}
          {appliance.conseils && (
            <Callout accent={ACCENT.brand} icon={<Lightbulb className="w-4 h-4" style={{ color: ACCENT.brand }} />} title={appliance.conseils.titre}>
              {appliance.conseils.items.map((item, index) => (
                <div key={index} className="flex items-baseline gap-2">
                  <span className="text-sm leading-none" style={{ color: ACCENT.brand }}>•</span>
                  <span className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{item}</span>
                </div>
              ))}
            </Callout>
          )}

          {/* Titre + meta */}
          <div>
            <SectionTitle accent={ACCENT.brand}>{appliance.nettoyer.titre}</SectionTitle>
            <div className="flex gap-4 mb-4 text-xs" style={{ color: theme.textMuted }}>
              <span>⏱️ {appliance.nettoyer.duree}</span>
              <span>🔁 {appliance.nettoyer.frequence}</span>
            </div>

            {/* Ingrédients */}
            <div className="flex flex-wrap gap-2 mb-5">
              {appliance.nettoyer.ingredients.map((ing, index) => (
                <Chip key={index} tone="sage">{ing}</Chip>
              ))}
            </div>

            {/* Instructions */}
            {nettoyerSteps.length > 1 ? (
              <Steps items={nettoyerSteps} />
            ) : (
              <p className="text-[15px] leading-[1.65]" style={{ color: theme.textSecondary }}>{appliance.nettoyer.instructions}</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'entretien' && (
        <div className="space-y-6">
          {/* Calendrier */}
          <div>
            <SectionTitle accent={ACCENT.blue}>Calendrier d&apos;entretien</SectionTitle>
            <div className="space-y-2">
              {appliance.entretien.calendrier.map((item, index) => (
                <div key={index} className="p-3.5 rounded-2xl" style={{ background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)', border: `1px solid ${darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'}` }}>
                  <span className="text-[11px] font-bold uppercase tracking-wide block mb-2" style={{ color: ACCENT.brand }}>{item.periode}</span>
                  <ul className="space-y-1.5">
                    {item.taches.map((tache, i) => (
                      <li key={i} className="text-sm flex items-center gap-2" style={{ color: theme.textSecondary }}>
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: ACCENT.sage }} />
                        {tache}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Économies */}
          <Callout accent={ACCENT.sage} icon={<span className="text-base leading-none">💰</span>} title="Économies possibles">
            <span className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{appliance.entretien.economies}</span>
          </Callout>

          {/* Alertes */}
          <div>
            <SectionTitle accent={ACCENT.clay}>Signes d&apos;alerte</SectionTitle>
            <Callout accent={ACCENT.clay}>
              {appliance.entretien.alertes.map((alerte, index) => (
                <div key={index} className="flex items-baseline gap-2">
                  <span className="text-sm leading-none" style={{ color: ACCENT.clay }}>•</span>
                  <span className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{alerte}</span>
                </div>
              ))}
            </Callout>
          </div>
        </div>
      )}
    </Modal>
  );
};
