'use client';

import { useMemo, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useFoyer } from '@/hooks/useFoyer';
import { FoyerOnboarding } from './FoyerOnboarding';
import { EquilibreCard } from './EquilibreCard';
import { FoyerSettingsModal } from './FoyerSettingsModal';
import {
  genererPlanning, bilan, indexSemaine, lundiDe, jourDeLaSemaine, formatDuree,
  JOURS, JOURS_COURTS, Occurrence, Membre,
} from '@/utils/repartition';
import { SURFACES } from '@/data/surfaces';
import { Surface } from '@/types';
import { haptic } from '@/utils/haptics';
import { ChevronLeft, ChevronRight, Settings2, BookOpen, Sparkles, Check, Clock3 } from 'lucide-react';

interface PlanningPageProps {
  onSurfaceClick: (surface: Surface) => void;
}

const surfaceParId = new Map(SURFACES.map((s) => [s.id, s]));

const LigneTache = ({ occ, membre, faite, afficherMembre, onBasculer, onFiche }: {
  occ: Occurrence;
  membre?: Membre;
  faite: boolean;
  afficherMembre: boolean;
  onBasculer: () => void;
  onFiche?: () => void;
}) => {
  const { theme, darkMode } = useTheme();
  const accent = darkMode ? '#D8B4FE' : '#6D28D9';

  return (
    <div
      className="flex items-center gap-1 rounded-2xl p-2 transition-colors"
      style={{
        background: darkMode ? (faite ? 'rgba(35,24,57,0.72)' : 'rgba(45,29,72,0.94)') : (faite ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.94)'),
        border: `1px solid ${theme.borderCard}`,
      }}
    >
      <button
        onClick={() => { haptic(faite ? 'light' : 'success'); onBasculer(); }}
        aria-label={faite ? `Annuler ${occ.tache.nom}` : `Marquer ${occ.tache.nom} comme faite`}
        aria-pressed={faite}
        className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl active:scale-95 transition-transform"
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full"
          style={{ background: faite ? accent : 'transparent', border: `2px solid ${faite ? accent : (darkMode ? '#A88DC8' : '#867299')}` }}
        >
          {faite && <Check className="h-4 w-4" strokeWidth={3} style={{ color: darkMode ? '#26143E' : '#fff' }} />}
        </span>
      </button>
      <div className="min-w-0 flex-1 py-1.5">
        <div className="flex items-start gap-2">
          <span className="text-lg leading-6 shrink-0" aria-hidden>{occ.tache.emoji}</span>
          <p
            className="text-[15px] font-bold leading-6 break-words"
            style={{ color: faite ? theme.textSecondary : theme.textPrimary, textDecoration: faite ? 'line-through' : undefined }}
          >
            {occ.tache.nom}
          </p>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-5" style={{ color: theme.textSecondary }}>
          <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" aria-hidden />{formatDuree(occ.tache.dureeMin)}</span>
          {afficherMembre && membre && (
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <span aria-hidden>{membre.emoji}</span>{membre.prenom || 'Membre du foyer'}
            </span>
          )}
          {faite && <span className="font-semibold" style={{ color: darkMode ? '#6EE7C1' : '#047857' }}>Fait</span>}
        </div>
      </div>
      {onFiche && (
        <button
          onClick={() => { haptic('light'); onFiche(); }}
          aria-label={`Voir la méthode pour ${occ.tache.nom}`}
          className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl active:scale-95 transition-transform"
          style={{ color: accent, background: darkMode ? 'rgba(216,180,254,0.08)' : 'rgba(109,40,217,0.06)' }}
        >
          <BookOpen className="h-[18px] w-[18px]" />
        </button>
      )}
    </div>
  );
};

export const PlanningPage = ({ onSurfaceClick }: PlanningPageProps) => {
  const { theme, darkMode } = useTheme();
  const {
    foyer, isLoaded, creerFoyer, setMembres, setTachesActives, basculerFait,
    estFaite, faitesSet, cumulParMembre, reinitialiser,
  } = useFoyer();
  const [offset, setOffset] = useState(0);
  const [filtre, setFiltre] = useState<string | null>(null);
  const [reglages, setReglages] = useState(false);
  const [jourSelectionne, setJourSelectionne] = useState(() => jourDeLaSemaine(new Date()));
  const [vue, setVue] = useState<'jour' | 'semaine'>('jour');
  const aujourdhui = new Date();
  const semaine = indexSemaine(aujourdhui) + offset;
  const accent = darkMode ? '#D8B4FE' : '#6D28D9';
  const carte = darkMode ? 'rgba(39,25,65,0.94)' : 'rgba(255,255,255,0.9)';

  const lundi = useMemo(() => {
    const d = lundiDe(new Date());
    d.setDate(d.getDate() + offset * 7);
    return d;
  }, [offset]);
  const occurrences = useMemo(() => genererPlanning(foyer.tachesActives, foyer.membres, semaine), [foyer.tachesActives, foyer.membres, semaine]);
  const bilanSemaine = useMemo(() => bilan(occurrences, foyer.membres, faitesSet), [occurrences, foyer.membres, faitesSet]);
  // Un membre retiré des réglages ne doit pas laisser un filtre désormais vide.
  const membreFiltre = foyer.membres.find((m) => m.id === filtre);
  const visibles = membreFiltre ? occurrences.filter((o) => o.membreId === membreFiltre.id) : occurrences;
  const nbFaites = visibles.filter((o) => faitesSet.has(o.id)).length;
  const progression = visibles.length > 0 ? Math.round((nbFaites / visibles.length) * 100) : 0;

  if (!isLoaded) return <div className="pt-2 pb-4" style={{ minHeight: 320 }} aria-label="Chargement du planning" />;
  if (!foyer.configure) return <FoyerOnboarding onCreer={creerFoyer} />;

  const membreParId = new Map(foyer.membres.map((m) => [m.id, m]));
  const plusieurs = foyer.membres.length > 1;
  const finSemaine = new Date(lundi);
  finSemaine.setDate(finSemaine.getDate() + 6);
  const fmt = (d: Date) => d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  const jourDate = (index: number) => { const d = new Date(lundi); d.setDate(d.getDate() + index); return d; };
  const changerSemaine = (delta: number) => { haptic('selection'); setOffset((o) => o + delta); };
  const joursAffiches = vue === 'jour' ? [jourSelectionne] : [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className="pt-2 pb-5">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-[28px] leading-tight font-extrabold" style={{ color: theme.textPrimary }}>Planning</h1>
          <p className="mt-1 text-sm" style={{ color: theme.textSecondary }}>Un jour à la fois, ensemble.</p>
        </div>
        <button
          onClick={() => { haptic('light'); setReglages(true); }} aria-label="Réglages du foyer"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl active:scale-95 transition-transform"
          style={{ background: carte, border: `1px solid ${theme.borderCard}`, color: theme.textPrimary }}
        ><Settings2 className="h-5 w-5" /></button>
      </header>

      <section className="mb-4 rounded-3xl p-4" aria-label="Progression de la semaine" style={{ background: carte, border: `1px solid ${theme.borderCard}`, boxShadow: theme.shadowCard }}>
        <div className="mb-3 flex items-center gap-2">
          <button onClick={() => changerSemaine(-1)} aria-label="Semaine précédente" className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl" style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : '#F4EFFB', color: theme.textPrimary }}><ChevronLeft className="h-5 w-5" /></button>
          <div className="min-w-0 flex-1 text-center">
            <p className="text-xs font-medium" style={{ color: theme.textSecondary }}>{offset === 0 ? 'Cette semaine' : offset === 1 ? 'Semaine prochaine' : offset === -1 ? 'Semaine dernière' : `Semaine du ${fmt(lundi)}`}</p>
            <p className="mt-0.5 text-sm font-bold" style={{ color: theme.textPrimary }}>{fmt(lundi)} — {fmt(finSemaine)}</p>
          </div>
          <button onClick={() => changerSemaine(1)} aria-label="Semaine suivante" className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl" style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : '#F4EFFB', color: theme.textPrimary }}><ChevronRight className="h-5 w-5" /></button>
        </div>
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}><span className="text-xl font-extrabold tabular-nums">{nbFaites}</span><span style={{ color: theme.textSecondary }}> / {visibles.length} tâches faites</span></p>
          <span className="text-xs font-bold tabular-nums" style={{ color: accent }}>{progression} %</span>
        </div>
        <div role="progressbar" aria-label={membreFiltre ? `Progression de ${membreFiltre.prenom}` : 'Progression du foyer'} aria-valuenow={progression} aria-valuemin={0} aria-valuemax={100} className="h-2 overflow-hidden rounded-full" style={{ background: darkMode ? 'rgba(255,255,255,0.1)' : '#EEE6F8' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progression}%`, background: darkMode ? 'linear-gradient(90deg, #D8B4FE, #5EEAD4)' : 'linear-gradient(90deg, #7C3AED, #B866C8)' }} />
        </div>
        {offset !== 0 && <button onClick={() => { haptic('selection'); setOffset(0); setJourSelectionne(jourDeLaSemaine(new Date())); }} className="mt-2 min-h-[44px] w-full rounded-xl text-sm font-bold" style={{ color: accent }}>Revenir à aujourd&apos;hui</button>}
      </section>

      <div className="mb-4 grid gap-1 overflow-x-auto scrollbar-hide pb-1" aria-label="Choisir un jour" style={{ gridTemplateColumns: 'repeat(7, minmax(44px, 1fr))' }}>
        {JOURS_COURTS.map((nom, index) => {
          const date = jourDate(index);
          const actif = jourSelectionne === index;
          const estAuj = offset === 0 && index === jourDeLaSemaine(aujourdhui);
          const tachesJour = visibles.filter((o) => o.jour === index);
          const termine = tachesJour.length > 0 && tachesJour.every((o) => faitesSet.has(o.id));
          return (
            <button
              key={nom}
              onClick={() => { haptic('selection'); setJourSelectionne(index); setVue('jour'); }}
              aria-label={`${JOURS[index]} ${date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}${estAuj ? ', aujourd’hui' : ''}, ${tachesJour.length} tâches`}
              aria-pressed={actif}
              className="flex min-h-[76px] min-w-0 flex-col items-center justify-center rounded-2xl transition-colors"
              style={{ background: actif ? (darkMode ? '#D8B4FE' : '#6D28D9') : carte, color: actif ? (darkMode ? '#26143E' : '#fff') : theme.textSecondary, border: `1px solid ${actif ? 'transparent' : theme.borderCard}` }}
            >
              <span className="text-[10px] font-semibold">{nom}</span>
              <span className="mt-1 text-lg font-extrabold tabular-nums">{date.getDate()}</span>
              <span className="mt-1 flex h-2 items-center" aria-hidden>{termine ? <Check className="h-3 w-3" strokeWidth={3} /> : <span className="h-1 w-1 rounded-full" style={{ background: estAuj ? (actif ? 'currentColor' : accent) : 'transparent' }} />}</span>
            </button>
          );
        })}
      </div>

      <div className="mb-4 flex rounded-2xl p-1" aria-label="Affichage du planning" style={{ background: darkMode ? 'rgba(27,16,47,0.65)' : 'rgba(255,255,255,0.6)', border: `1px solid ${theme.borderCard}` }}>
        {([{ id: 'jour', nom: 'Journée' }, { id: 'semaine', nom: 'Semaine' }] as const).map(({ id, nom }) => <button key={id} onClick={() => { haptic('selection'); setVue(id); }} aria-pressed={vue === id} className="min-h-[44px] flex-1 rounded-xl text-sm font-bold transition-colors" style={{ background: vue === id ? carte : 'transparent', color: vue === id ? accent : theme.textSecondary, boxShadow: vue === id ? '0 2px 8px rgba(44,20,74,0.06)' : undefined }}>{nom}</button>)}
      </div>

      {plusieurs && (
        <div className="mb-5 flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4" aria-label="Filtrer par membre du foyer">
          <button onClick={() => { haptic('selection'); setFiltre(null); }} aria-pressed={!membreFiltre} className="min-h-[44px] shrink-0 rounded-full px-4 text-sm font-bold" style={{ background: !membreFiltre ? (darkMode ? '#D8B4FE' : '#6D28D9') : carte, color: !membreFiltre ? (darkMode ? '#26143E' : '#fff') : theme.textSecondary, border: `1px solid ${theme.borderCard}` }}>Tout le monde</button>
          {foyer.membres.map((m) => <button key={m.id} onClick={() => { haptic('selection'); setFiltre(membreFiltre?.id === m.id ? null : m.id); }} aria-pressed={membreFiltre?.id === m.id} className="min-h-[44px] shrink-0 rounded-full px-4 text-sm font-bold" style={{ background: membreFiltre?.id === m.id ? (darkMode ? '#D8B4FE' : '#6D28D9') : carte, color: membreFiltre?.id === m.id ? (darkMode ? '#26143E' : '#fff') : theme.textSecondary, border: `1px solid ${theme.borderCard}` }}><span className="mr-1.5" aria-hidden>{m.emoji}</span>{m.prenom || 'Membre du foyer'}</button>)}
        </div>
      )}

      <div className="space-y-6">
        {joursAffiches.map((index) => {
          const duJour = visibles.filter((o) => o.jour === index);
          const estAujourdhui = offset === 0 && index === jourDeLaSemaine(aujourdhui);
          const faitesJour = duJour.filter((o) => faitesSet.has(o.id)).length;
          const minutesRestantes = duJour.filter((o) => !faitesSet.has(o.id)).reduce((s, o) => s + o.tache.dureeMin, 0);
          return (
            <section key={index} aria-label={`Tâches du ${JOURS[index].toLowerCase()}`}>
              <div className="mb-3 flex items-end justify-between gap-2">
                <div>
                  <p className="mb-0.5 text-xs font-semibold" style={{ color: theme.textSecondary }}>{estAujourdhui ? 'Aujourd’hui' : jourDate(index).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</p>
                  <h2 className="font-display text-xl font-extrabold" style={{ color: theme.textPrimary }}>{JOURS[index]}</h2>
                </div>
                <div className="text-right text-xs leading-5" style={{ color: theme.textSecondary }}><p>{faitesJour} / {duJour.length} faites</p>{minutesRestantes > 0 && <p className="font-semibold">{formatDuree(minutesRestantes)} restantes</p>}</div>
              </div>
              {duJour.length === 0 ? (
                <div className="rounded-3xl px-5 py-7 text-center" style={{ background: carte, border: `1px solid ${theme.borderCard}` }}>
                  <Sparkles className="mx-auto mb-3 h-7 w-7" style={{ color: darkMode ? '#5EEAD4' : '#0F766E' }} />
                  <p className="text-[16px] font-bold" style={{ color: theme.textPrimary }}>Une journée plus légère</p>
                  <p className="mt-1 text-sm" style={{ color: theme.textSecondary }}>{membreFiltre ? `Aucune tâche prévue pour ${membreFiltre.prenom}.` : 'Aucune tâche prévue ce jour.'}</p>
                  {occurrences.length === 0 && <button onClick={() => setReglages(true)} className="mt-3 min-h-[44px] rounded-xl px-4 text-sm font-bold" style={{ background: darkMode ? 'rgba(216,180,254,0.1)' : '#F4EFFB', color: accent }}>Choisir les tâches à suivre</button>}
                </div>
              ) : (
                <div className="space-y-2">
                  {duJour.slice().sort((a, b) => b.charge - a.charge).map((occ) => {
                    const surface = occ.tache.surfaceId ? surfaceParId.get(occ.tache.surfaceId) : undefined;
                    return <LigneTache key={occ.id} occ={occ} membre={membreParId.get(occ.membreId)} faite={estFaite(occ.id)} afficherMembre={plusieurs} onBasculer={() => basculerFait(occ, semaine)} onFiche={surface ? () => onSurfaceClick(surface) : undefined} />;
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <div className="mt-6"><EquilibreCard membres={foyer.membres} cumul={cumulParMembre} bilanSemaine={bilanSemaine} /></div>
      {reglages && <FoyerSettingsModal membres={foyer.membres} tachesActives={foyer.tachesActives} onMembres={setMembres} onTaches={setTachesActives} onReset={reinitialiser} onClose={() => setReglages(false)} />}
    </div>
  );
};
