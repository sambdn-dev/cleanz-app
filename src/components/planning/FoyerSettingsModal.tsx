'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Modal } from '@/components/ui/Modal';
import { Membre, formatDuree } from '@/utils/repartition';
import { TACHES, PIECES, EMOJI_PIECE, chargeTache, libelleFrequence, Piece } from '@/data/taches';
import { nouveauMembre, EMOJIS_MEMBRES } from '@/hooks/useFoyer';
import { haptic } from '@/utils/haptics';
import { Plus, X, Scale, ListChecks, Flame, RotateCcw, ChevronDown } from 'lucide-react';

interface FoyerSettingsModalProps {
  membres: Membre[];
  tachesActives: string[];
  onMembres: (m: Membre[]) => void;
  onTaches: (ids: string[]) => void;
  onReset: () => void;
  onClose: () => void;
}

export const FoyerSettingsModal = ({
  membres,
  tachesActives,
  onMembres,
  onTaches,
  onReset,
  onClose,
}: FoyerSettingsModalProps) => {
  const { theme, darkMode } = useTheme();
  const [pieceOuverte, setPieceOuverte] = useState<Piece | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  // La page est enveloppée dans un conteneur `transform` (PageTransition), ce qui
  // piégerait une modale `position: fixed`. On la sort donc via un portail.
  const [monte, setMonte] = useState(false);
  useEffect(() => setMonte(true), []);

  const totalParts = membres.reduce((s, m) => s + Math.max(1, m.part), 0) || 1;
  const pct = (m: Membre) => Math.round((Math.max(1, m.part) / totalParts) * 100);

  const majMembre = (id: string, patch: Partial<Membre>) =>
    onMembres(membres.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const cyclerEmoji = (m: Membre) => {
    const i = EMOJIS_MEMBRES.indexOf(m.emoji);
    majMembre(m.id, { emoji: EMOJIS_MEMBRES[(i + 1) % EMOJIS_MEMBRES.length] });
  };

  const egaliser = () => {
    haptic('light');
    onMembres(membres.map((m) => ({ ...m, part: 50 })));
  };

  const basculerExclusion = (membreId: string, tacheId: string) => {
    haptic('light');
    onMembres(
      membres.map((m) => {
        if (m.id !== membreId) return m;
        const ex = m.exclusions ?? [];
        return {
          ...m,
          exclusions: ex.includes(tacheId) ? ex.filter((t) => t !== tacheId) : [...ex, tacheId],
        };
      })
    );
  };

  const basculerTache = (id: string) => {
    haptic('light');
    onTaches(
      tachesActives.includes(id) ? tachesActives.filter((t) => t !== id) : [...tachesActives, id]
    );
  };

  if (!monte) return null;

  return createPortal(
    <Modal
      isOpen
      onClose={onClose}
      headerGradient="linear-gradient(135deg, #FF69B4 0%, #A78BFA 55%, #4FD1C5 100%)"
      headerContent={
        <div className="text-center text-white">
          <div className="text-4xl mb-2">⚖️</div>
          <h2 className="font-display text-xl font-extrabold">Réglages du foyer</h2>
          <p className="text-sm opacity-90 mt-0.5">Qui fait quoi, et dans quelle proportion</p>
        </div>
      }
    >
      {/* ------------------------------ MEMBRES ----------------------------- */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="w-4 h-4" style={{ color: theme.accentPink }} />
          <h3 className="font-display text-[15px] font-extrabold" style={{ color: theme.textPrimary }}>
            Répartition de la charge
          </h3>
          {membres.length > 1 && (
            <button
              onClick={egaliser}
              className="ml-auto flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full active:scale-95 transition-transform"
              style={{ background: `${theme.accentPink}14`, color: theme.accentPink }}
            >
              <RotateCcw className="w-3 h-3" />
              Égaliser
            </button>
          )}
        </div>

        <p className="text-[12px] leading-snug mb-3" style={{ color: theme.textMuted }}>
          Par défaut chacun fournit le même effort. Déplacez un curseur si votre
          foyer a convenu d&apos;une répartition différente (60 / 40, par exemple).
        </p>

        <div className="space-y-3">
          {membres.map((m) => (
            <div
              key={m.id}
              className="p-3 rounded-2xl"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
                border: `1px solid ${m.couleur}33`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => cyclerEmoji(m)}
                  aria-label="Changer l'avatar"
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 active:scale-95 transition-transform"
                  style={{ background: `${m.couleur}22`, border: `2px solid ${m.couleur}` }}
                >
                  {m.emoji}
                </button>
                <input
                  value={m.prenom}
                  onChange={(e) => majMembre(m.id, { prenom: e.target.value })}
                  maxLength={14}
                  className="flex-1 min-w-0 h-10 px-3 rounded-xl text-[14px] font-bold outline-none"
                  style={{
                    background: theme.bgInput,
                    color: theme.textPrimary,
                    border: `1px solid ${theme.borderLight}`,
                  }}
                />
                {membres.length > 1 && (
                  <>
                    <span
                      className="text-[15px] font-black tabular-nums w-[46px] text-right"
                      style={{ color: m.couleur }}
                    >
                      {pct(m)} %
                    </span>
                    <button
                      onClick={() => onMembres(membres.filter((x) => x.id !== m.id))}
                      aria-label={`Retirer ${m.prenom}`}
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform"
                      style={{ background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)' }}
                    >
                      <X className="w-3.5 h-3.5" style={{ color: theme.textMuted }} />
                    </button>
                  </>
                )}
              </div>

              {membres.length > 1 && (
                <input
                  type="range"
                  min={10}
                  max={90}
                  step={1}
                  value={m.part}
                  onChange={(e) => majMembre(m.id, { part: Number(e.target.value) })}
                  aria-label={`Part de ${m.prenom}`}
                  className="w-full h-6 cursor-pointer"
                  style={{ accentColor: m.couleur }}
                />
              )}

              {/* Exclusions actives */}
              {(m.exclusions?.length ?? 0) > 0 && (
                <div className="flex flex-wrap items-center gap-1 mt-1.5">
                  <span className="text-[10px] font-semibold" style={{ color: theme.textMuted }}>
                    Ne fait pas :
                  </span>
                  {m.exclusions!.map((tid) => {
                    const t = TACHES.find((x) => x.id === tid);
                    if (!t) return null;
                    return (
                      <button
                        key={tid}
                        onClick={() => basculerExclusion(m.id, tid)}
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-1"
                        style={{ background: 'rgba(239,68,68,0.12)', color: '#DC2626' }}
                      >
                        {t.emoji} {t.nom}
                        <X className="w-2.5 h-2.5" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {membres.length < 6 && (
          <button
            onClick={() => onMembres([...membres, nouveauMembre(membres.length, '')])}
            className="w-full mt-3 h-11 rounded-2xl flex items-center justify-center gap-1.5 text-[14px] font-bold active:scale-[0.98] transition-transform"
            style={{
              background: `${theme.accentPink}14`,
              color: theme.accentPink,
              border: `1px dashed ${theme.accentPink}55`,
            }}
          >
            <Plus className="w-4 h-4" />
            Ajouter une personne
          </button>
        )}
      </div>

      {/* ------------------------------- TÂCHES ----------------------------- */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <ListChecks className="w-4 h-4" style={{ color: theme.accentCyan }} />
          <h3 className="font-display text-[15px] font-extrabold" style={{ color: theme.textPrimary }}>
            Tâches suivies
          </h3>
          <span className="text-[11px] ml-auto" style={{ color: theme.textMuted }}>
            {tachesActives.length} / {TACHES.length}
          </span>
        </div>

        <div className="space-y-1.5">
          {PIECES.map((piece) => {
            const taches = TACHES.filter((t) => t.piece === piece);
            if (taches.length === 0) return null;
            const actives = taches.filter((t) => tachesActives.includes(t.id)).length;
            const ouverte = pieceOuverte === piece;

            return (
              <div
                key={piece}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.65)',
                  border: `1px solid ${theme.borderCard}`,
                }}
              >
                <button
                  onClick={() => setPieceOuverte(ouverte ? null : piece)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-left"
                >
                  <span className="text-base" aria-hidden>
                    {EMOJI_PIECE[piece]}
                  </span>
                  <span className="text-[14px] font-bold flex-1" style={{ color: theme.textPrimary }}>
                    {piece}
                  </span>
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: actives > 0 ? `${theme.accentCyan}22` : 'transparent',
                      color: actives > 0 ? theme.accentCyan : theme.textMuted,
                    }}
                  >
                    {actives}/{taches.length}
                  </span>
                  <ChevronDown
                    className="w-4 h-4 transition-transform"
                    style={{
                      color: theme.textMuted,
                      transform: ouverte ? 'rotate(180deg)' : 'none',
                    }}
                  />
                </button>

                {ouverte && (
                  <div className="px-3 pb-3 space-y-2">
                    {taches.map((t) => {
                      const active = tachesActives.includes(t.id);
                      return (
                        <div key={t.id}>
                          <button
                            onClick={() => basculerTache(t.id)}
                            className="w-full flex items-center gap-2.5 py-1.5 text-left"
                          >
                            <span
                              className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
                              style={{
                                background: active ? theme.accentCyan : 'transparent',
                                border: `1.5px solid ${active ? theme.accentCyan : theme.textMuted}`,
                              }}
                            >
                              {active && (
                                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                  <path
                                    d="M2.5 6.5l2.5 2.5 4.5-5"
                                    stroke="#fff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </span>
                            <span className="text-base" aria-hidden>
                              {t.emoji}
                            </span>
                            <span className="flex-1 min-w-0">
                              <span
                                className="block text-[13px] font-semibold leading-tight truncate"
                                style={{ color: active ? theme.textPrimary : theme.textMuted }}
                              >
                                {t.nom}
                              </span>
                              <span className="block text-[10px]" style={{ color: theme.textMuted }}>
                                {libelleFrequence(t)} · {formatDuree(t.dureeMin)} ·{' '}
                                {chargeTache(t)} pts
                              </span>
                            </span>
                            <span className="flex gap-0.5 flex-shrink-0" aria-label={`Pénibilité ${t.penibilite}/3`}>
                              {[1, 2, 3].map((n) => (
                                <Flame
                                  key={n}
                                  className="w-3 h-3"
                                  style={{
                                    color: n <= t.penibilite ? '#F97316' : 'transparent',
                                    fill: n <= t.penibilite ? '#F97316' : 'transparent',
                                    opacity: n <= t.penibilite ? 1 : 0.15,
                                    stroke: n <= t.penibilite ? '#F97316' : theme.textMuted,
                                  }}
                                />
                              ))}
                            </span>
                          </button>

                          {/* Exclusions (foyer à plusieurs) */}
                          {active && membres.length > 1 && (
                            <div className="flex flex-wrap items-center gap-1 pl-[30px] pb-1">
                              <span className="text-[9px]" style={{ color: theme.textMuted }}>
                                Ne fait pas :
                              </span>
                              {membres.map((m) => {
                                const exclu = m.exclusions?.includes(t.id);
                                return (
                                  <button
                                    key={m.id}
                                    onClick={() => basculerExclusion(m.id, t.id)}
                                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-all"
                                    style={{
                                      background: exclu ? 'rgba(239,68,68,0.15)' : 'transparent',
                                      color: exclu ? '#DC2626' : theme.textMuted,
                                      border: `1px solid ${exclu ? 'rgba(239,68,68,0.35)' : theme.borderLight}`,
                                      textDecoration: exclu ? 'line-through' : 'none',
                                    }}
                                  >
                                    {m.emoji} {m.prenom}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ----------------------------- RÉINIT ------------------------------- */}
      <button
        onClick={() => {
          if (confirmReset) {
            haptic('warning');
            onReset();
            onClose();
          } else {
            setConfirmReset(true);
          }
        }}
        className="w-full h-11 rounded-2xl text-[13px] font-bold active:scale-[0.98] transition-transform"
        style={{
          background: confirmReset ? 'rgba(239,68,68,0.15)' : 'transparent',
          color: confirmReset ? '#DC2626' : theme.textMuted,
          border: `1px solid ${confirmReset ? 'rgba(239,68,68,0.35)' : theme.borderLight}`,
        }}
      >
        {confirmReset ? 'Confirmer : tout effacer ?' : 'Réinitialiser le foyer'}
      </button>
    </Modal>,
    document.body
  );
};
