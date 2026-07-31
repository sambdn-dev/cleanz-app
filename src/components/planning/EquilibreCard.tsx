'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Membre, BilanMembre, formatDuree } from '@/utils/repartition';
import { Scale, CheckCircle2, AlertTriangle } from 'lucide-react';

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
  // Sous ce seuil (≈ une demi-journée de ménage), le réalisé n'est pas encore
  // représentatif : afficher « 100 % / 0 % » après une seule tâche cochée
  // serait alarmiste. On continue donc de montrer la répartition prévue.
  const SEUIL_FIABLE = 250;
  const aDesDonnees = totalCumul >= SEUIL_FIABLE;

  // Tant que rien n'est coché, on montre la répartition PRÉVUE de la semaine.
  const lignes: Ligne[] = aDesDonnees
    ? membres.map((m) => ({
        membre: m,
        points: cumul.get(m.id) ?? 0,
        partReelle: Math.round(((cumul.get(m.id) ?? 0) / totalCumul) * 100),
        partVisee: Math.round((Math.max(0, m.part) / totalParts) * 100),
      }))
    : bilanSemaine.map((b) => ({
        membre: b.membre,
        points: b.charge,
        partReelle: b.partReelle,
        partVisee: b.partVisee,
      }));

  const ecartMax = Math.max(0, ...lignes.map((l) => l.partReelle - l.partVisee));
  const enTete = lignes.find((l) => l.partReelle - l.partVisee === ecartMax);

  const solo = membres.length === 1;
  const parfait = ecartMax <= 2;
  const correct = ecartMax <= 6;

  const minutesSemaine = bilanSemaine.reduce((s, b) => s + b.minutes, 0);

  return (
    <div
      className="rounded-3xl p-4 mb-4"
      style={{
        background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
        border: `1px solid ${theme.borderCard}`,
        boxShadow: theme.shadowCard,
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Scale className="w-4 h-4" style={{ color: theme.accentPink }} />
        <h2 className="font-display text-base font-extrabold" style={{ color: theme.textPrimary }}>
          {solo ? 'Ma charge' : 'Équilibre du foyer'}
        </h2>
        <span className="text-[11px] ml-auto" style={{ color: theme.textMuted }}>
          {aDesDonnees ? 'Travail réalisé' : 'Prévu cette semaine'}
        </span>
      </div>

      {/* Barre segmentée */}
      {!solo && (
        <div
          className="flex h-3 rounded-full overflow-hidden mb-3"
          style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
        >
          {lignes.map((l) => (
            <div
              key={l.membre.id}
              className="h-full transition-all duration-500"
              style={{
                width: `${Math.max(2, l.partReelle)}%`,
                background: l.membre.couleur,
              }}
              title={`${l.membre.prenom} · ${l.partReelle}%`}
            />
          ))}
        </div>
      )}

      {/* Détail par membre */}
      <div className="space-y-2">
        {lignes.map((l) => {
          const ecart = l.partReelle - l.partVisee;
          return (
            <div key={l.membre.id} className="flex items-center gap-2.5">
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                style={{ background: `${l.membre.couleur}22`, border: `1.5px solid ${l.membre.couleur}` }}
                aria-hidden
              >
                {l.membre.emoji}
              </span>
              <span
                className="text-[14px] font-bold flex-1 min-w-0 truncate"
                style={{ color: theme.textPrimary }}
              >
                {l.membre.prenom}
              </span>
              <span className="text-[12px] font-medium" style={{ color: theme.textMuted }}>
                {l.points} pts
              </span>
              {!solo && (
                <span
                  className="text-[12px] font-black tabular-nums w-[42px] text-right"
                  style={{ color: l.membre.couleur }}
                >
                  {l.partReelle}%
                </span>
              )}
              {!solo && (
                <span
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full w-[46px] text-center"
                  style={{
                    background:
                      Math.abs(ecart) <= 2
                        ? 'rgba(52,211,153,0.16)'
                        : darkMode
                          ? 'rgba(255,255,255,0.07)'
                          : 'rgba(0,0,0,0.05)',
                    color: Math.abs(ecart) <= 2 ? '#059669' : theme.textMuted,
                  }}
                >
                  {ecart > 0 ? `+${ecart}` : ecart}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Verdict */}
      <div
        className="flex items-center gap-2 mt-3 pt-3"
        style={{ borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}` }}
      >
        {solo ? (
          <>
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#10B981' }} />
            <p className="text-[12px] leading-snug" style={{ color: theme.textSecondary }}>
              <strong style={{ color: theme.textPrimary }}>{formatDuree(minutesSemaine)}</strong> de
              ménage prévues cette semaine.
            </p>
          </>
        ) : parfait ? (
          <>
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#10B981' }} />
            <p className="text-[12px] leading-snug" style={{ color: theme.textSecondary }}>
              <strong style={{ color: theme.textPrimary }}>Parfaitement équilibré.</strong> Chacun
              est sur son objectif.
            </p>
          </>
        ) : (
          <>
            <AlertTriangle
              className="w-4 h-4 flex-shrink-0"
              style={{ color: correct ? '#F59E0B' : '#EF4444' }}
            />
            <p className="text-[12px] leading-snug" style={{ color: theme.textSecondary }}>
              <strong style={{ color: theme.textPrimary }}>{enTete?.membre.prenom}</strong> a{' '}
              {ecartMax} % de charge de plus que son objectif
              {aDesDonnees ? '' : ' cette semaine'}.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
