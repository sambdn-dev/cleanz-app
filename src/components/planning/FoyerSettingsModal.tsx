'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Modal } from '@/components/ui/Modal';
import { Membre, formatDuree } from '@/utils/repartition';
import { TACHES, PIECES, EMOJI_PIECE, chargeTache, libelleFrequence, Piece } from '@/data/taches';
import { nouveauMembre, EMOJIS_MEMBRES } from '@/hooks/useFoyer';
import { haptic } from '@/utils/haptics';
import { Plus, X, Scale, ListChecks, RotateCcw, ChevronDown, Check } from 'lucide-react';

interface FoyerSettingsModalProps {
  membres: Membre[];
  tachesActives: string[];
  onMembres: (m: Membre[]) => void;
  onTaches: (ids: string[]) => void;
  onReset: () => void;
  onClose: () => void;
}

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export const FoyerSettingsModal = ({ membres, tachesActives, onMembres, onTaches, onReset, onClose }: FoyerSettingsModalProps) => {
  const { theme, darkMode } = useTheme();
  const [section, setSection] = useState<'foyer' | 'taches'>('foyer');
  const [pieceOuverte, setPieceOuverte] = useState<Piece | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  // Le portail évite le conteneur transformé des transitions de page ; son
  // rendu attend le navigateur pour rester compatible avec l'hydratation.
  const monte = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  useEffect(() => {
    if (!monte) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const precedent = document.querySelector<HTMLButtonElement>('button[aria-label="Réglages du foyer"]')
      ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    const controlesVisibles = () => Array.from(dialog.querySelectorAll<HTMLElement>(
      'button, a[href], input, select, textarea, [tabindex]'
    )).filter((element) => element.tabIndex >= 0 && !element.matches(':disabled')
      && element.getAttribute('aria-disabled') !== 'true' && element.getClientRects().length > 0);

    const fermer = dialog.querySelector<HTMLButtonElement>('button[aria-label="Fermer"]');
    (fermer ?? controlesVisibles()[0] ?? dialog).focus();

    const confinerTabulation = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const controles = controlesVisibles();
      if (controles.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const actif = document.activeElement;
      const premier = controles[0];
      const dernier = controles[controles.length - 1];
      if (event.shiftKey && (actif === premier || !dialog.contains(actif))) {
        event.preventDefault();
        dernier.focus();
      } else if (!event.shiftKey && (actif === dernier || !dialog.contains(actif))) {
        event.preventDefault();
        premier.focus();
      }
    };
    document.addEventListener('keydown', confinerTabulation);
    return () => {
      document.removeEventListener('keydown', confinerTabulation);
      if (precedent?.isConnected) precedent.focus();
    };
  }, [monte]);
  const accent = darkMode ? '#D8B4FE' : '#6D28D9';
  const carte = darkMode ? 'rgba(27,16,47,0.6)' : '#F9F6FD';
  const totalParts = membres.reduce((s, m) => s + Math.max(1, m.part), 0) || 1;
  const pct = (m: Membre) => Math.round((Math.max(1, m.part) / totalParts) * 100);
  const majMembre = (id: string, patch: Partial<Membre>) => onMembres(membres.map((m) => m.id === id ? { ...m, ...patch } : m));
  const cyclerEmoji = (m: Membre) => { const i = EMOJIS_MEMBRES.indexOf(m.emoji); majMembre(m.id, { emoji: EMOJIS_MEMBRES[(i + 1) % EMOJIS_MEMBRES.length] }); };
  const egaliser = () => { haptic('light'); onMembres(membres.map((m) => ({ ...m, part: 50 }))); };
  const basculerExclusion = (membreId: string, tacheId: string) => {
    haptic('light');
    onMembres(membres.map((m) => {
      if (m.id !== membreId) return m;
      const ex = m.exclusions ?? [];
      return { ...m, exclusions: ex.includes(tacheId) ? ex.filter((t) => t !== tacheId) : [...ex, tacheId] };
    }));
  };
  const basculerTache = (id: string) => { haptic('light'); onTaches(tachesActives.includes(id) ? tachesActives.filter((t) => t !== id) : [...tachesActives, id]); };
  if (!monte) return null;

  return createPortal(
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="foyer-reglages-titre" tabIndex={-1} className="fixed inset-0 z-[60]" onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onClose(); } }}>
      <Modal isOpen onClose={onClose} headerGradient="linear-gradient(135deg, #6D28D9, #4C1D95)" headerContent={<div className="text-white"><h2 id="foyer-reglages-titre" className="font-display text-xl font-extrabold">Réglages du foyer</h2><p className="mt-1 text-sm leading-5 text-violet-100">Un planning qui suit votre quotidien.</p></div>}>
        <div className="mb-5 flex rounded-2xl p-1" aria-label="Sections des réglages" style={{ background: carte, border: `1px solid ${theme.borderLight}` }}>
          {([{ id: 'foyer', nom: 'Foyer', icon: Scale }, { id: 'taches', nom: 'Tâches', icon: ListChecks }] as const).map(({ id, nom, icon: Icon }) => <button key={id} onClick={() => setSection(id)} aria-pressed={section === id} className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl text-sm font-bold" style={{ background: section === id ? (darkMode ? '#D8B4FE' : '#6D28D9') : 'transparent', color: section === id ? (darkMode ? '#26143E' : '#fff') : theme.textSecondary }}><Icon className="h-4 w-4" />{nom}</button>)}
        </div>

        {section === 'foyer' ? (
          <section aria-label="Personnes et répartition du foyer">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-[16px] font-extrabold" style={{ color: theme.textPrimary }}>Personnes & répartition</h3>
              {membres.length > 1 && <button onClick={egaliser} className="flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-xs font-bold" style={{ color: accent, background: carte }}><RotateCcw className="h-3.5 w-3.5" />Égaliser</button>}
            </div>
            <p className="mb-4 text-xs leading-5" style={{ color: theme.textSecondary }}>La charge tient compte de la durée et de la pénibilité. Ajustez les parts selon l&apos;accord de votre foyer.</p>
            <div className="space-y-3">
              {membres.map((m, index) => (
                <div key={m.id} className="rounded-2xl p-3" style={{ background: carte, border: `1px solid ${theme.borderLight}` }}>
                  <label htmlFor={`reglages-membre-${m.id}`} className="mb-2 block text-xs font-semibold" style={{ color: theme.textSecondary }}>Prénom de la personne {index + 1}</label>
                  <div className="flex items-center gap-2">
                    <button onClick={() => cyclerEmoji(m)} aria-label={`Changer l’avatar de ${m.prenom || `la personne ${index + 1}`}`} className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl text-xl" style={{ background: `${m.couleur}18`, border: `1px solid ${m.couleur}55` }}>{m.emoji}</button>
                    <input id={`reglages-membre-${m.id}`} value={m.prenom} onChange={(e) => majMembre(m.id, { prenom: e.target.value })} maxLength={14} autoComplete="given-name" className="h-[44px] min-w-0 flex-1 rounded-xl px-2.5 text-[16px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-violet-500" style={{ background: theme.bgInput, color: theme.textPrimary, border: `1px solid ${theme.borderLight}` }} />
                    {membres.length > 1 && <button onClick={() => onMembres(membres.filter((x) => x.id !== m.id))} aria-label={`Retirer ${m.prenom || `la personne ${index + 1}`}`} className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl" style={{ color: theme.textSecondary }}><X className="h-4 w-4" /></button>}
                  </div>
                  {membres.length > 1 && <div className="mt-3"><div className="flex justify-between gap-2 text-xs" style={{ color: theme.textSecondary }}><label htmlFor={`reglages-part-${m.id}`}>Part de l&apos;effort</label><span className="font-bold tabular-nums" style={{ color: accent }}>{pct(m)} %</span></div><input id={`reglages-part-${m.id}`} type="range" min={10} max={90} step={1} value={m.part} onChange={(e) => majMembre(m.id, { part: Number(e.target.value) })} aria-label={`Part de ${m.prenom || `la personne ${index + 1}`}`} className="h-[44px] w-full cursor-pointer" style={{ accentColor: accent }} /></div>}
                  {(m.exclusions?.length ?? 0) > 0 && <div className="mt-2"><p className="mb-2 text-xs font-semibold" style={{ color: theme.textSecondary }}>Tâches exclues</p><div className="flex flex-wrap gap-2">{m.exclusions!.map((tid) => { const t = TACHES.find((x) => x.id === tid); if (!t) return null; return <button key={tid} onClick={() => basculerExclusion(m.id, tid)} aria-label={`Autoriser ${m.prenom || 'ce membre'} à faire ${t.nom}`} className="flex min-h-[44px] items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold" style={{ background: darkMode ? 'rgba(253,164,175,0.1)' : '#FFF1F2', color: darkMode ? '#FDA4AF' : '#9F1239' }}><span className="break-words">{t.emoji} {t.nom}</span><X className="h-3.5 w-3.5 shrink-0" /></button>; })}</div></div>}
                </div>
              ))}
            </div>
            {membres.length < 6 && <button onClick={() => onMembres([...membres, nouveauMembre(membres.length, '')])} className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold" style={{ background: carte, color: accent }}><Plus className="h-4 w-4" />Ajouter une personne</button>}
            <div className="mt-6 border-t pt-4" style={{ borderColor: theme.borderLight }}>
              {!confirmReset ? <button onClick={() => setConfirmReset(true)} className="min-h-[44px] w-full rounded-xl text-sm font-semibold" style={{ color: darkMode ? '#FDA4AF' : '#9F1239' }}>Réinitialiser le foyer</button> : <div className="rounded-2xl p-3" style={{ background: darkMode ? 'rgba(253,164,175,0.1)' : '#FFF1F2' }}><p className="text-sm font-bold" style={{ color: theme.textPrimary }}>Effacer le foyer et les tâches cochées ?</p><p className="mt-1 text-xs leading-5" style={{ color: theme.textSecondary }}>Cette action réinitialise le planning et son historique.</p><div className="mt-3 flex gap-2"><button onClick={() => setConfirmReset(false)} className="min-h-[44px] flex-1 rounded-xl text-sm font-bold" style={{ background: carte, color: theme.textPrimary }}>Annuler</button><button onClick={() => { haptic('warning'); onReset(); onClose(); }} className="min-h-[44px] flex-1 rounded-xl text-sm font-bold text-white" style={{ background: '#BE123C' }}>Tout effacer</button></div></div>}
            </div>
          </section>
        ) : (
          <section aria-label="Tâches suivies">
            <div className="mb-2 flex items-baseline justify-between gap-2"><h3 className="font-display text-[16px] font-extrabold" style={{ color: theme.textPrimary }}>Tâches à suivre</h3><span className="text-xs font-semibold" style={{ color: accent }}>{tachesActives.length} / {TACHES.length}</span></div>
            <p className="mb-4 text-xs leading-5" style={{ color: theme.textSecondary }}>Choisissez les tâches de votre foyer. Leur fréquence reste automatique.{membres.length > 1 && ' Vous pouvez aussi exclure une personne pour une tâche.'}</p>
            <div className="space-y-2">
              {PIECES.map((piece) => {
                const taches = TACHES.filter((t) => t.piece === piece);
                if (taches.length === 0) return null;
                const actives = taches.filter((t) => tachesActives.includes(t.id)).length;
                const ouverte = pieceOuverte === piece;
                return (
                  <div key={piece} className="overflow-hidden rounded-2xl" style={{ background: carte, border: `1px solid ${theme.borderLight}` }}>
                    <button onClick={() => setPieceOuverte(ouverte ? null : piece)} aria-expanded={ouverte} aria-controls={`taches-piece-${piece.replaceAll(' ', '-')}`} className="flex min-h-14 w-full items-center gap-2 px-3 text-left"><span className="text-lg" aria-hidden>{EMOJI_PIECE[piece]}</span><span className="flex-1 text-sm font-bold" style={{ color: theme.textPrimary }}>{piece}</span><span className="text-xs font-semibold" style={{ color: theme.textSecondary }}>{actives} / {taches.length}</span><ChevronDown className="h-4 w-4 transition-transform" style={{ color: theme.textSecondary, transform: ouverte ? 'rotate(180deg)' : undefined }} /></button>
                    <div id={`taches-piece-${piece.replaceAll(' ', '-')}`} hidden={!ouverte} className="px-3 pb-3">
                      {taches.map((t) => {
                        const active = tachesActives.includes(t.id);
                        return (
                          <div key={t.id} className="border-t py-3" style={{ borderColor: theme.borderLight }}>
                            <button onClick={() => basculerTache(t.id)} aria-label={`Suivre ${t.nom}`} aria-pressed={active} className="flex min-h-[44px] w-full items-start gap-2 text-left">
                              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ background: active ? accent : 'transparent', border: `1.5px solid ${active ? accent : theme.textSecondary}` }}>{active && <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: darkMode ? '#26143E' : '#fff' }} />}</span>
                              <span className="min-w-0 flex-1"><span className="block break-words text-sm font-bold leading-5" style={{ color: theme.textPrimary }}>{t.emoji} {t.nom}</span><span className="mt-1 block text-xs leading-5" style={{ color: theme.textSecondary }}>{libelleFrequence(t)} · {formatDuree(t.dureeMin)}<br />{chargeTache(t)} points · pénibilité {t.penibilite} / 3</span></span>
                            </button>
                            {active && membres.length > 1 && <div className="mt-2"><p className="mb-1 text-xs" style={{ color: theme.textSecondary }}>Exclure de cette tâche :</p><div className="flex flex-wrap gap-1.5">{membres.map((m, index) => { const exclu = m.exclusions?.includes(t.id) ?? false; return <button key={m.id} onClick={() => basculerExclusion(m.id, t.id)} aria-label={`Exclure ${m.prenom || `la personne ${index + 1}`} de ${t.nom}`} aria-pressed={exclu} className="min-h-[44px] rounded-xl px-2.5 py-1.5 text-xs font-semibold" style={{ background: exclu ? (darkMode ? 'rgba(253,164,175,0.1)' : '#FFF1F2') : (darkMode ? 'rgba(255,255,255,0.04)' : '#fff'), color: exclu ? (darkMode ? '#FDA4AF' : '#9F1239') : theme.textSecondary, border: `1px solid ${exclu ? (darkMode ? 'rgba(253,164,175,0.4)' : '#FECDD3') : theme.borderLight}` }}><span aria-hidden>{m.emoji} </span>{m.prenom || `Personne ${index + 1}`}{exclu && <span className="ml-1">· exclu·e</span>}</button>; })}</div></div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
        <p className="mt-5 text-center text-xs leading-5" style={{ color: theme.textSecondary }}>Vos modifications sont enregistrées au fur et à mesure.</p>
      </Modal>
    </div>,
    document.body
  );
};
