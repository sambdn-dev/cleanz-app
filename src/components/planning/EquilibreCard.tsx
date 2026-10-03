'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Membre, BilanMembre, formatDuree } from '@/utils/repartition';
import { Scale, CheckCircle2, AlertTriangle, ChevronDown } from 'lucide-react';

interface EquilibreCardProps {
  membres: Membre[];
  /** Charge réellement effectuée par membre (points), tout l'historique */
  cumul: Map<string, number>;
  /** Bilan de la semaine affichée */
  bilanSemaine: BilanMembre[];
}

interface Ligne {
  membre: Membre;
  points: number;
  partReelle: number;
  partVisee: number;
}

export const EquilibreCard = ({ membres, cumul, bilanSemaine }: EquilibreCardProps) => {
  const { theme, darkMode } = useTheme();
  const totalCumul = membres.reduce((s, m) => s + (cumul.get(m.id) ?? 0), 0);
  const totalParts = membres.reduce((s, m) => s + Math.max(0, m.part), 0) || membres.length;
  // En dessous de ce seuil, le réalisé n'est pas assez représentatif : on
  // conserve la répartition prévue plutôt qu'un déséquilibre après une tâche.
  const SEUIL_FIABLE = 250;
  const aDesDonnees = totalCumul >= SEUIL_FIABLE;
  const lignes: Ligne[] = aDesDonnees
    ? membres.map((m) => ({ membre: m, points: cumul.get(m.id) ?? 0, partReelle: Math.round(((cumul.get(m.id) ?? 0) / totalCumul) * 100), partVisee: Math.round((Math.max(0, m.part) / totalParts) * 100) }))
    : bilanSemaine.map((b) => ({ membre: b.membre, points: b.charge, partReelle: b.partReelle, partVisee: b.partVisee }));
  const ecartMax = Math.max(0, ...lignes.map((l) => l.partReelle - l.partVisee));
  const enTete = lignes.find((l) => l.partReelle - l.partVisee === ecartMax);
  const solo = membres.length === 1;
  const parfait = ecartMax <= 2;
  const correct = ecartMax <= 6;
  const minutesSemaine = bilanSemaine.reduce((s, b) => s + b.minutes, 0);
  const accent = darkMode ? '#D8B4FE' : '#6D28D9';

  return (
    <details className="group overflow-hidden rounded-3xl" style={{ background: darkMode ? 'rgba(39,25,65,0.94)' : 'rgba(255,255,255,0.9)', border: `1px solid ${theme.borderCard}` }}>
      <summary className="flex min-h-[76px] cursor-pointer list-none items-center gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl" style={{ background: darkMode ? 'rgba(216,180,254,0.1)' : '#F4EFFB', color: accent }}><Scale className="h-5 w-5" /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold" style={{ color: theme.textPrimary }}>{solo ? 'Ma charge' : 'Équilibre du foyer'}</span>
          <span className="mt-0.5 block text-xs leading-5" style={{ color: theme.textSecondary }}>{solo ? `${formatDuree(minutesSemaine)} prévues cette semaine` : aDesDonnees ? 'Consulter les efforts réalisés' : 'Voir la répartition de la semaine'}</span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" style={{ color: theme.textSecondary }} />
      </summary>
      <div className="px-4 pb-4">
        <p className="mb-3 text-xs font-semibold" style={{ color: theme.textSecondary }}>{aDesDonnees ? 'Effort réalisé · historique des tâches cochées' : 'Effort prévu · semaine affichée'}</p>
        {!solo && <div className="mb-4 flex h-2.5 overflow-hidden rounded-full" style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : '#EEE6F8' }} aria-hidden>{lignes.map((l) => <div key={l.membre.id} className="h-full transition-all duration-500" style={{ width: `${Math.max(2, l.partReelle)}%`, background: l.membre.couleur }} />)}</div>}
        <div className="space-y-3">
          {lignes.map((l) => {
            const ecart = l.partReelle - l.partVisee;
            return (
              <div key={l.membre.id} className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-lg" style={{ background: `${l.membre.couleur}18`, border: `1px solid ${l.membre.couleur}55` }} aria-hidden>{l.membre.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="break-words text-sm font-bold" style={{ color: theme.textPrimary }}>{l.membre.prenom || 'Membre du foyer'}</p>
                  <p className="mt-0.5 text-xs" style={{ color: theme.textSecondary }}>{l.points} points d&apos;effort{!solo && ` · objectif ${l.partVisee} %`}</p>
                </div>
                {!solo && <div className="shrink-0 text-right"><p className="text-sm font-extrabold tabular-nums" style={{ color: accent }}>{l.partReelle} %</p><p className="mt-0.5 text-[11px]" style={{ color: Math.abs(ecart) <= 2 ? (darkMode ? '#6EE7C1' : '#047857') : theme.textSecondary }}>{Math.abs(ecart) <= 2 ? 'À l’équilibre' : `${ecart > 0 ? '+' : ''}${ecart} pts d’écart`}</p></div>}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-start gap-2 border-t pt-3" style={{ borderColor: theme.borderLight }}>
          {solo || parfait ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: darkMode ? '#6EE7C1' : '#047857' }} /> : <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: correct ? (darkMode ? '#FCD34D' : '#92400E') : (darkMode ? '#FDA4AF' : '#BE123C') }} />}
          <p className="text-xs leading-5" style={{ color: theme.textSecondary }}>{solo ? 'Avancez à votre rythme : chaque tâche cochée compte.' : parfait ? 'La charge est équilibrée par rapport aux objectifs du foyer.' : `${enTete?.membre.prenom || 'Un membre'} dépasse son objectif de ${ecartMax} points de pourcentage${aDesDonnees ? ' dans l’historique réalisé' : ' cette semaine'}.`}</p>
        </div>
        <p className="mt-3 text-xs leading-5" style={{ color: theme.textSecondary }}>L&apos;effort tient compte du temps et de la pénibilité : durée × pénibilité = points. Les tâches les plus contraignantes tournent chaque semaine.</p>
      </div>
    </details>
  );
};
