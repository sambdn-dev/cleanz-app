'use client';

import { useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { ELECTROMENAGERS } from '@/data/electromenager';
import { Electromenager } from '@/types';
import { haptic } from '@/utils/haptics';
import { SubPageShell } from './SubPageShell';

interface MyDevicesPageProps {
  onClose: () => void;
  onApplianceClick: (a: Electromenager) => void;
}

const KEY = 'cleanz-my-devices';
const loadOwned = (): number[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
};

export const MyDevicesPage = ({ onClose, onApplianceClick }: MyDevicesPageProps) => {
  const { theme, darkMode } = useTheme();
  const [owned, setOwned] = useState<number[]>(() => (typeof window !== 'undefined' ? loadOwned() : []));

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(owned));
  }, [owned]);

  const toggle = (id: number) => {
    haptic('selection');
    setOwned((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  const mine = ELECTROMENAGERS.filter((a) => owned.includes(a.id));
  const others = ELECTROMENAGERS.filter((a) => !owned.includes(a.id));

  return (
    <SubPageShell title="Mes appareils" emoji="📱" onClose={onClose}>
      {mine.length === 0 ? (
        <div className="text-center py-8 mb-2">
          <span className="text-5xl block mb-3">🔌</span>
          <p className="text-sm font-semibold mb-1" style={{ color: theme.textPrimary }}>Sélectionne tes appareils</p>
          <p className="text-xs" style={{ color: theme.textMuted }}>
            Ajoute ceux que tu possèdes pour retrouver vite leur entretien et leur fréquence de nettoyage.
          </p>
        </div>
      ) : (
        <>
          <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
            Mes appareils ({mine.length})
          </p>
          <div className="space-y-2 mb-6">
            {mine.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-3 px-3.5 py-3 rounded-2xl"
                style={{ background: theme.bgCardSolid, border: `1px solid ${theme.borderLight}` }}
              >
                <button onClick={() => onApplianceClick(a)} className="flex items-center gap-3 flex-1 text-left">
                  <span className="text-2xl">{a.emoji}</span>
                  <span>
                    <span className="block text-sm font-bold" style={{ color: theme.textPrimary }}>{a.nom}</span>
                    <span className="block text-[11px]" style={{ color: theme.textMuted }}>
                      Nettoyage : {a.nettoyer.frequence} · {a.piece}
                    </span>
                  </span>
                </button>
                <button
                  onClick={() => toggle(a.id)}
                  aria-label={`Retirer ${a.nom}`}
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: '#10B981' }}
                >
                  <Check className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Ajouter un appareil */}
      <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
        {mine.length === 0 ? 'Choisis dans la liste' : 'Ajouter un appareil'}
      </p>
      <div className="grid grid-cols-3 gap-2.5">
        {others.map((a) => (
          <button
            key={a.id}
            onClick={() => toggle(a.id)}
            className="relative rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-transform active:scale-95"
            style={{ background: theme.bgCardSolid, border: `1px solid ${theme.borderLight}` }}
          >
            <span
              className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}
            >
              <Plus className="w-3.5 h-3.5" style={{ color: theme.textMuted }} />
            </span>
            <span className="text-2xl block mb-1">{a.emoji}</span>
            <span className="text-[11px] font-semibold leading-tight" style={{ color: theme.textPrimary }}>{a.nom}</span>
          </button>
        ))}
      </div>
    </SubPageShell>
  );
};
