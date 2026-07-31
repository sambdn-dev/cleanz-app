'use client';

import { useMemo, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useFoyer } from '@/hooks/useFoyer';
import { FoyerOnboarding } from './FoyerOnboarding';
import { EquilibreCard } from './EquilibreCard';
import { FoyerSettingsModal } from './FoyerSettingsModal';
import {
  genererPlanning,
  bilan,
  indexSemaine,
  lundiDe,
  jourDeLaSemaine,
  formatDuree,
  JOURS,
  Occurrence,
  Membre,
} from '@/utils/repartition';
import { SURFACES } from '@/data/surfaces';
import { Surface } from '@/types';
import { haptic } from '@/utils/haptics';
import { ChevronLeft, ChevronRight, Settings2, Flame, BookOpen, Sparkles } from 'lucide-react';

interface PlanningPageProps {
  onSurfaceClick: (surface: Surface) => void;
}

const surfaceParId = new Map(SURFACES.map((s) => [s.id, s]));

/* ------------------------------------------------------------------ */
/*  Ligne de tâche                                                     */
/* ------------------------------------------------------------------ */
const LigneTache = ({
  occ,
  membre,
  faite,
  afficherMembre,
  onBasculer,
  onFiche,
}: {
  occ: Occurrence;
  membre?: Membre;
  faite: boolean;
  afficherMembre: boolean;
  onBasculer: () => void;
  onFiche?: () => void;
}) => {
  const { theme, darkMode } = useTheme();
  const couleur = membre?.couleur ?? theme.accentPink;

  return (
    <div
      className="flex items-center gap-2.5 py-2 px-2.5 rounded-2xl transition-all"
      style={{
        background: faite
          ? darkMode
            ? 'rgba(255,255,255,0.03)'
            : 'rgba(0,0,0,0.025)'
          : darkMode
            ? 'rgba(255,255,255,0.05)'
            : 'rgba(255,255,255,0.75)',
        border: `1px solid ${faite ? 'transparent' : theme.borderCard}`,
        opacity: faite ? 0.55 : 1,
      }}
    >
      {/* Case à cocher */}
      <button
        onClick={() => {
          haptic(faite ? 'light' : 'success');
          onBasculer();
        }}
        aria-label={faite ? `Annuler ${occ.tache.nom}` : `Marquer ${occ.tache.nom} comme faite`}
        aria-pressed={faite}
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform"
        style={{
          background: faite ? couleur : 'transparent',
          border: `2px solid ${faite ? couleur : theme.textMuted}`,
        }}
      >
        {faite && (
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.3l2.4 2.4 4.6-5"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <span className="text-lg flex-shrink-0" aria-hidden>
        {occ.tache.emoji}
      </span>

      <div className="flex-1 min-w-0">
        <p
          className="text-[13.5px] font-semibold leading-tight truncate"
          style={{
            color: theme.textPrimary,
            textDecoration: faite ? 'line-through' : 'none',
          }}
        >
          {occ.tache.nom}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10.5px]" style={{ color: theme.textMuted }}>
            {formatDuree(occ.tache.dureeMin)}
          </span>
          <span className="flex gap-px" aria-label={`Pénibilité ${occ.tache.penibilite} sur 3`}>
            {Array.from({ length: occ.tache.penibilite }).map((_, i) => (
              <Flame key={i} className="w-2.5 h-2.5" style={{ color: '#F97316', fill: '#F97316' }} />
            ))}
          </span>
          <span className="text-[10.5px] font-semibold" style={{ color: theme.textMuted }}>
            · {occ.charge} pts
          </span>
        </div>
      </div>

      {/* Fiche Cleanz */}
      {onFiche && (
        <button
          onClick={() => {
            haptic('light');
            onFiche();
          }}
          aria-label={`Voir la méthode pour ${occ.tache.nom}`}
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform"
          style={{ background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.045)' }}
        >
          <BookOpen className="w-3.5 h-3.5" style={{ color: theme.textSecondary }} />
        </button>
      )}

      {/* Membre assigné */}
      {afficherMembre && membre && (
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
          style={{ background: `${membre.couleur}22`, border: `1.5px solid ${membre.couleur}` }}
          title={membre.prenom}
        >
          {membre.emoji}
        </span>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export const PlanningPage = ({ onSurfaceClick }: PlanningPageProps) => {
  const { theme, darkMode } = useTheme();
  const {
    foyer,
    isLoaded,
    creerFoyer,
    setMembres,
    setTachesActives,
    basculerFait,
    estFaite,
    faitesSet,
    cumulParMembre,
    reinitialiser,
  } = useFoyer();

  const [offset, setOffset] = useState(0);
  const [filtre, setFiltre] = useState<string | null>(null);
  const [reglages, setReglages] = useState(false);

  const aujourdhui = new Date();
  const semaine = indexSemaine(aujourdhui) + offset;

  const lundi = useMemo(() => {
    const d = lundiDe(aujourdhui);
    d.setDate(d.getDate() + offset * 7);
    return d;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const occurrences = useMemo(
    () => genererPlanning(foyer.tachesActives, foyer.membres, semaine),
    [foyer.tachesActives, foyer.membres, semaine]
  );

  const bilanSemaine = useMemo(
    () => bilan(occurrences, foyer.membres, faitesSet),
    [occurrences, foyer.membres, faitesSet]
  );

  const visibles = filtre ? occurrences.filter((o) => o.membreId === filtre) : occurrences;
  const nbFaites = visibles.filter((o) => faitesSet.has(o.id)).length;
  const progression = visibles.length > 0 ? Math.round((nbFaites / visibles.length) * 100) : 0;

  if (!isLoaded) return <div className="pt-2 pb-4" style={{ minHeight: 320 }} />;
  if (!foyer.configure) return <FoyerOnboarding onCreer={creerFoyer} />;

  const membreParId = new Map(foyer.membres.map((m) => [m.id, m]));
  const plusieurs = foyer.membres.length > 1;

  const finSemaine = new Date(lundi);
  finSemaine.setDate(finSemaine.getDate() + 6);
  const fmt = (d: Date) => d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

  return (
    <div className="pt-2 pb-4">
      {/* En-tête */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-2xl font-extrabold" style={{ color: theme.textPrimary }}>
            Le planning
          </h1>
          <p className="text-sm" style={{ color: theme.textMuted }}>
            {plusieurs
              ? `${foyer.membres.length} personnes · charge répartie équitablement`
              : 'Votre semaine de ménage, organisée'}
          </p>
        </div>
        <button
          onClick={() => {
            haptic('light');
            setReglages(true);
          }}
          aria-label="Réglages du foyer"
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.8)',
            border: `1px solid ${theme.borderCard}`,
          }}
        >
          <Settings2 className="w-5 h-5" style={{ color: theme.textSecondary }} />
        </button>
      </div>

      {/* Équilibre */}
      <EquilibreCard membres={foyer.membres} cumul={cumulParMembre} bilanSemaine={bilanSemaine} />

      {/* Navigation de semaine */}
      <div
        className="flex items-center gap-2 mb-3 p-1.5 rounded-2xl"
        style={{
          background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.75)',
          border: `1px solid ${theme.borderCard}`,
        }}
      >
        <button
          onClick={() => {
            haptic('selection');
            setOffset((o) => o - 1);
          }}
          aria-label="Semaine précédente"
          className="w-9 h-9 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
          style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}
        >
          <ChevronLeft className="w-4 h-4" style={{ color: theme.textSecondary }} />
        </button>

        <div className="flex-1 text-center min-w-0">
          <p className="text-[13px] font-bold truncate" style={{ color: theme.textPrimary }}>
            {fmt(lundi)} – {fmt(finSemaine)}
          </p>
          <p className="text-[10.5px]" style={{ color: theme.textMuted }}>
            {offset === 0
              ? 'Cette semaine'
              : offset === 1
                ? 'Semaine prochaine'
                : offset === -1
                  ? 'Semaine dernière'
                  : `${offset > 0 ? '+' : ''}${offset} semaines`}
            {' · '}
            {nbFaites}/{visibles.length} faites
          </p>
        </div>

        {offset !== 0 && (
          <button
            onClick={() => {
              haptic('selection');
              setOffset(0);
            }}
            className="text-[11px] font-bold px-2 py-1 rounded-full"
            style={{ background: `${theme.accentPink}18`, color: theme.accentPink }}
          >
            Auj.
          </button>
        )}

        <button
          onClick={() => {
            haptic('selection');
            setOffset((o) => o + 1);
          }}
          aria-label="Semaine suivante"
          className="w-9 h-9 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
          style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}
        >
          <ChevronRight className="w-4 h-4" style={{ color: theme.textSecondary }} />
        </button>
      </div>

      {/* Progression */}
      <div
        className="h-1.5 rounded-full overflow-hidden mb-4"
        style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progression}%`,
            background: 'linear-gradient(90deg, #FF69B4 0%, #A78BFA 55%, #4FD1C5 100%)',
          }}
        />
      </div>

      {/* Filtre par membre */}
      {plusieurs && (
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1 mb-3">
          <button
            onClick={() => {
              haptic('selection');
              setFiltre(null);
            }}
            className="flex items-center gap-1.5 px-3 min-h-[38px] rounded-full text-[13px] font-bold whitespace-nowrap flex-shrink-0 transition-all active:scale-95"
            style={{
              background: !filtre ? theme.accentPink : darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.8)',
              color: !filtre ? '#fff' : theme.textSecondary,
              border: `1px solid ${!filtre ? theme.accentPink : theme.borderCard}`,
            }}
          >
            Tout le monde
          </button>
          {foyer.membres.map((m) => {
            const actif = filtre === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  haptic('selection');
                  setFiltre(actif ? null : m.id);
                }}
                className="flex items-center gap-1.5 px-3 min-h-[38px] rounded-full text-[13px] font-bold whitespace-nowrap flex-shrink-0 transition-all active:scale-95"
                style={{
                  background: actif ? m.couleur : darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.8)',
                  color: actif ? '#fff' : theme.textSecondary,
                  border: `1px solid ${actif ? m.couleur : theme.borderCard}`,
                }}
              >
                <span aria-hidden>{m.emoji}</span>
                {m.prenom}
              </button>
            );
          })}
        </div>
      )}

      {/* Les 7 jours */}
      <div className="space-y-3">
        {JOURS.map((nomJour, index) => {
          const duJour = visibles.filter((o) => o.jour === index);
          const date = new Date(lundi);
          date.setDate(date.getDate() + index);
          const estAujourdhui = offset === 0 && index === jourDeLaSemaine(aujourdhui);
          const faitesJour = duJour.filter((o) => faitesSet.has(o.id)).length;
          const minutesJour = duJour.reduce((s, o) => s + o.tache.dureeMin, 0);

          return (
            <div key={nomJour}>
              <div className="flex items-baseline gap-2 mb-1.5 px-0.5">
                <h3
                  className="font-display text-[15px] font-extrabold"
                  style={{ color: estAujourdhui ? theme.accentPink : theme.textPrimary }}
                >
                  {nomJour}
                </h3>
                <span className="text-[11px]" style={{ color: theme.textMuted }}>
                  {date.getDate()}
                </span>
                {estAujourdhui && (
                  <span
                    className="text-[9px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded-full"
                    style={{ background: `${theme.accentPink}1f`, color: theme.accentPink }}
                  >
                    Aujourd&apos;hui
                  </span>
                )}
                {duJour.length > 0 && (
                  <span className="text-[11px] ml-auto" style={{ color: theme.textMuted }}>
                    {faitesJour}/{duJour.length} · {formatDuree(minutesJour)}
                  </span>
                )}
              </div>

              {duJour.length === 0 ? (
                <div
                  className="flex items-center gap-2 py-2.5 px-3 rounded-2xl"
                  style={{
                    background: darkMode ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.4)',
                    border: `1px dashed ${theme.borderLight}`,
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" style={{ color: theme.accentCyan }} />
                  <span className="text-[12px]" style={{ color: theme.textMuted }}>
                    Rien de prévu — journée libre
                  </span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {duJour
                    .slice()
                    .sort((a, b) => b.charge - a.charge)
                    .map((occ) => {
                      const surface = occ.tache.surfaceId
                        ? surfaceParId.get(occ.tache.surfaceId)
                        : undefined;
                      return (
                        <LigneTache
                          key={occ.id}
                          occ={occ}
                          membre={membreParId.get(occ.membreId)}
                          faite={estFaite(occ.id)}
                          afficherMembre={plusieurs}
                          onBasculer={() => basculerFait(occ, semaine)}
                          onFiche={surface ? () => onSurfaceClick(surface) : undefined}
                        />
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Note de bas de page */}
      <p className="mt-5 text-[11.5px] leading-relaxed text-center px-4" style={{ color: theme.textMuted }}>
        Charge = durée × pénibilité. Les tâches ingrates tournent chaque semaine
        et le planning s&apos;ajuste automatiquement à vos réglages.
      </p>

      {reglages && (
        <FoyerSettingsModal
          membres={foyer.membres}
          tachesActives={foyer.tachesActives}
          onMembres={setMembres}
          onTaches={setTachesActives}
          onReset={reinitialiser}
          onClose={() => setReglages(false)}
        />
      )}
    </div>
  );
};
