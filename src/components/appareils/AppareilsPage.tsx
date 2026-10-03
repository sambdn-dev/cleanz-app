'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Check, ChevronRight, House, Plus, Search, SlidersHorizontal, Sparkles, Wrench, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { ELECTROMENAGERS, PIECES, type Piece } from '@/data/electromenager';
import { APPAREIL_RECETTE_IDS } from '@/data/publication-appareils';
import { getRecipeAccess } from '@/data/publication';
import { getPhotoBySlug } from '@/data/scenes';
import type { Electromenager } from '@/types';
import { haptic } from '@/utils/haptics';
import { ApplianceIcon } from './ApplianceIcons';
import { useOwnedDevices } from './useOwnedDevices';

const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500';
const normalise = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');

interface AppareilsPageProps {
  onApplianceClick: (appliance: Electromenager) => void;
}

const ApplianceCard = ({
  appliance, owned, editing, selectionDisabled, onOpen, onToggle,
}: {
  appliance: Electromenager;
  owned: boolean;
  editing: boolean;
  selectionDisabled: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) => {
  const { theme, darkMode } = useTheme();
  const photo = getPhotoBySlug(appliance.nom);
  const recipeId = APPAREIL_RECETTE_IDS[appliance.id];
  const unavailable = recipeId !== undefined && !getRecipeAccess(recipeId).available;
  const accent = darkMode ? '#C4B5FD' : '#6D28D9';

  return (
    <article
      className="relative min-w-0 overflow-hidden rounded-[22px] transition-shadow"
      style={{ background: theme.bgCardSolid, border: `1px solid ${theme.borderCard}`, boxShadow: theme.shadowCard }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${unavailable ? 'Voir le statut' : 'Voir la fiche'} de ${appliance.nom}`}
        className="block h-full w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-violet-500"
      >
        <div className="relative h-[122px] overflow-hidden" style={{ background: darkMode ? '#34204E' : '#EEE7FA' }}>
          {photo ? (
            <Image
              src={photo}
              alt=""
              fill
              sizes="(max-width: 640px) 45vw, 220px"
              className="object-cover"
              style={{ objectPosition: photo.includes('/materiel/') ? 'center 62%' : 'center' }}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ApplianceIcon id={appliance.id} color={accent} size={68} />
            </div>
          )}
          {owned && !editing && (
            <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold"
              style={{ color: '#FFFFFF', background: '#5B21B6' }}>
              <Check size={11} aria-hidden="true" /> Chez moi
            </span>
          )}
        </div>
        <div className="px-3 pb-3 pt-3">
          <span className="mb-1 block text-[11px] font-medium" style={{ color: theme.textSecondary }}>{appliance.piece}</span>
          <h3 className="min-h-[42px] break-words font-bold leading-[1.4]" style={{ color: theme.textPrimary, fontSize: 15 }}>{appliance.nom}</h3>
          <span className="mt-3 flex min-h-[28px] items-center justify-between gap-1 border-t pt-2 text-[11px] font-semibold"
            style={{ color: accent, borderColor: theme.borderLight }}>
            {unavailable ? 'Voir le statut' : 'Voir la fiche'}
            <ChevronRight size={15} aria-hidden="true" className="shrink-0" />
          </span>
        </div>
      </button>
      {editing && (
        <button
          type="button"
          onClick={onToggle}
          aria-label={`${owned ? 'Retirer' : 'Ajouter'} ${appliance.nom} ${owned ? 'de' : 'à'} mes appareils`}
          aria-pressed={owned}
          disabled={selectionDisabled}
          className={`absolute right-2 top-2 flex h-[44px] w-[44px] items-center justify-center rounded-full border-2 shadow-md disabled:opacity-50 ${FOCUS}`}
          style={{ color: owned ? '#FFFFFF' : '#5B21B6', background: owned ? '#6D28D9' : '#FFFFFF', borderColor: '#FFFFFF' }}
        >
          {owned ? <Check size={20} aria-hidden="true" /> : <Plus size={20} aria-hidden="true" />}
        </button>
      )}
    </article>
  );
};

export const AppareilsPage = ({ onApplianceClick }: AppareilsPageProps) => {
  const { theme, darkMode } = useTheme();
  const { owned, storageStatus, toggle } = useOwnedDevices();
  const [view, setView] = useState<'mine' | 'catalog'>(() => ELECTROMENAGERS.some((a) => owned.includes(a.id)) ? 'mine' : 'catalog');
  const [selectedPiece, setSelectedPiece] = useState<Piece>('Toutes');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(false);
  const accent = darkMode ? '#C4B5FD' : '#6D28D9';
  const subtle = darkMode ? 'rgba(196,181,253,0.09)' : 'rgba(109,40,217,0.06)';
  const mine = ELECTROMENAGERS.filter((a) => owned.includes(a.id));
  const base = view === 'mine' ? mine : ELECTROMENAGERS;
  const emptyInventory = view === 'mine' && mine.length === 0 && !query.trim() && selectedPiece === 'Toutes';
  const filtered = useMemo(() => {
    const term = normalise(query.trim());
    return ELECTROMENAGERS.filter((appliance) => (
      (view === 'catalog' || owned.includes(appliance.id)) &&
      (selectedPiece === 'Toutes' || appliance.piece === selectedPiece) &&
      (!term || normalise(`${appliance.nom} ${appliance.piece}`).includes(term))
    ));
  }, [owned, query, selectedPiece, view]);

  const beginSelection = () => {
    setEditing(true);
    setView('catalog');
    setQuery('');
    setSelectedPiece('Toutes');
  };

  const switchView = (next: 'mine' | 'catalog') => {
    setView(next);
    setSelectedPiece('Toutes');
    setEditing(false);
  };

  return (
    <section className="pb-3 pt-3" aria-labelledby="appareils-title">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>Prendre soin de la maison</p>
          <h2 id="appareils-title" className="font-display font-extrabold tracking-tight" style={{ color: theme.textPrimary, fontSize: 29 }}>Appareils</h2>
          <p className="mt-1 max-w-[260px] text-[13px] leading-relaxed" style={{ color: theme.textSecondary }}>Les bons gestes pour les faire durer.</p>
        </div>
        <div className="mt-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: subtle, color: accent }}>
          <Wrench size={24} strokeWidth={1.7} aria-hidden="true" />
        </div>
      </div>

      <div className="relative mb-4 flex min-h-[50px] items-center rounded-2xl border" style={{ background: theme.bgInput, borderColor: theme.borderLight }}>
        <Search size={19} className="ml-4 shrink-0" style={{ color: theme.textSecondary }} aria-hidden="true" />
        <label htmlFor="appareils-search" className="sr-only">Rechercher un appareil</label>
        <input
          id="appareils-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher un appareil"
          autoComplete="off"
          className={`min-w-0 flex-1 rounded-2xl bg-transparent px-3 py-3 [&::-webkit-search-cancel-button]:hidden ${FOCUS}`}
          style={{ color: theme.textPrimary, fontSize: 16 }}
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} aria-label="Effacer la recherche" className={`mr-1 flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl ${FOCUS}`} style={{ color: theme.textSecondary }}>
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="mb-4 flex gap-1 rounded-2xl p-1" role="group" aria-label="Afficher les appareils" style={{ background: darkMode ? 'rgba(15,8,30,0.32)' : 'rgba(255,255,255,0.45)' }}>
        {(['mine', 'catalog'] as const).map((tab) => (
          <button
            type="button"
            key={tab}
            aria-pressed={view === tab}
            onClick={() => switchView(tab)}
            className={`flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl px-2 text-[12px] font-bold transition-colors ${FOCUS}`}
            style={{ background: view === tab ? (darkMode ? '#58407F' : '#FFFFFF') : 'transparent', color: view === tab ? accent : theme.textSecondary, boxShadow: view === tab ? '0 2px 8px rgba(45,20,70,0.08)' : 'none' }}
          >
            {tab === 'mine' ? 'Mes appareils' : 'Tout explorer'}
            <span className="rounded-full px-1.5 py-0.5 text-[10px]" style={{ background: view === tab ? subtle : 'transparent' }}>{tab === 'mine' ? mine.length : ELECTROMENAGERS.length}</span>
          </button>
        ))}
      </div>

      {storageStatus !== 'ready' && (
        <p role="status" className="mb-4 rounded-2xl border p-3 text-[12px] leading-relaxed" style={{ color: theme.textSecondary, background: theme.bgCard, borderColor: theme.borderLight }}>
          {storageStatus === 'invalid'
            ? 'Votre sélection enregistrée ne peut pas être lue. Elle a été conservée ; vous pouvez toujours consulter les fiches.'
            : 'La sélection ne peut pas être enregistrée sur cet appareil pour le moment. Vous pouvez toujours consulter les fiches.'}
        </p>
      )}

      {!editing && view === 'catalog' && mine.length === 0 && storageStatus === 'ready' && (
        <div className="mb-4 flex items-center justify-between gap-2 rounded-2xl border px-3 py-2" style={{ background: subtle, borderColor: theme.borderLight }}>
          <h3 className="text-[12px] font-bold" style={{ color: theme.textPrimary }}>Et chez vous ?</h3>
          <button type="button" onClick={beginSelection} className={`flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-xl px-3 text-[11px] font-bold cleanz-gradient-button ${FOCUS}`}>
            Ajouter mes appareils <Plus size={15} aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="mb-3 flex min-h-[44px] items-center justify-between gap-2">
        <div>
          <h3 className="text-[14px] font-bold" style={{ color: theme.textPrimary }}>{editing ? 'Votre équipement' : view === 'mine' ? 'Chez vous' : 'Les fiches appareils'}</h3>
          <p className="mt-0.5 text-[11px]" style={{ color: theme.textSecondary }}>{editing ? `${mine.length} appareil${mine.length !== 1 ? 's' : ''} sélectionné${mine.length !== 1 ? 's' : ''}` : `${filtered.length} fiche${filtered.length !== 1 ? 's' : ''}${query || selectedPiece !== 'Toutes' ? ' trouvée' + (filtered.length !== 1 ? 's' : '') : ' à découvrir'}`}</p>
        </div>
        {editing ? (
          <button type="button" onClick={() => { setEditing(false); if (mine.length > 0) setView('mine'); }} className={`min-h-[44px] shrink-0 rounded-xl px-4 text-[12px] font-bold cleanz-gradient-button ${FOCUS}`}>
            Terminer
          </button>
        ) : (mine.length > 0 || view === 'mine') && storageStatus === 'ready' ? (
          <button type="button" onClick={beginSelection} className={`flex min-h-[44px] items-center gap-1.5 rounded-xl px-2 text-[11px] font-semibold ${FOCUS}`} style={{ color: accent }}>
            <SlidersHorizontal size={15} aria-hidden="true" /> {mine.length ? 'Modifier mes appareils' : 'Ajouter mes appareils'}
          </button>
        ) : null}
      </div>

      <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 py-2 scrollbar-hide" role="group" aria-label="Filtrer par pièce">
        {PIECES.filter((piece) => piece === 'Toutes' || base.some((a) => a.piece === piece)).map((piece) => (
          <button
            type="button"
            key={piece}
            aria-label={`Pièce : ${piece}`}
            aria-pressed={selectedPiece === piece}
            onClick={() => setSelectedPiece(piece)}
            className={`min-h-[44px] shrink-0 rounded-full border px-4 text-[12px] font-semibold transition-colors ${FOCUS}`}
            style={{ background: selectedPiece === piece ? '#6D28D9' : theme.bgCard, color: selectedPiece === piece ? '#FFFFFF' : theme.textSecondary, borderColor: selectedPiece === piece ? '#6D28D9' : theme.borderLight }}
          >
            {piece === 'Toutes' ? 'Toutes les pièces' : piece}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 items-stretch gap-3">
          {filtered.map((appliance) => (
            <ApplianceCard
              key={appliance.id}
              appliance={appliance}
              owned={owned.includes(appliance.id)}
              editing={editing}
              selectionDisabled={storageStatus !== 'ready'}
              onOpen={() => onApplianceClick(appliance)}
              onToggle={() => { if (toggle(appliance.id)) haptic('selection'); }}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] border px-5 py-8 text-center" style={{ background: theme.bgCard, borderColor: theme.borderLight }}>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: subtle, color: accent }}>
            {emptyInventory ? <House size={26} aria-hidden="true" /> : <Search size={26} aria-hidden="true" />}
          </div>
          <h3 className="text-[15px] font-bold" style={{ color: theme.textPrimary }}>{emptyInventory ? 'Votre maison, vos appareils' : 'Aucun appareil trouvé'}</h3>
          <p className="mx-auto mt-2 max-w-[260px] text-[12px] leading-relaxed" style={{ color: theme.textSecondary }}>{emptyInventory ? 'Ajoutez votre équipement pour retrouver ici les fiches qui vous sont utiles.' : 'Essayez un autre nom ou une autre pièce.'}</p>
          <button type="button" onClick={emptyInventory ? beginSelection : () => { setQuery(''); setSelectedPiece('Toutes'); }} disabled={emptyInventory && storageStatus !== 'ready'} className={`mt-5 min-h-[44px] rounded-xl px-5 text-[12px] font-bold cleanz-gradient-button disabled:opacity-50 ${FOCUS}`}>
            {emptyInventory ? 'Choisir mes appareils' : 'Réinitialiser les filtres'}
          </button>
        </div>
      )}

      <div className="mt-5 flex items-start gap-2 px-1 text-[11px] leading-relaxed" style={{ color: theme.textSecondary }}>
        <Sparkles size={14} className="mt-0.5 shrink-0" style={{ color: accent }} aria-hidden="true" />
        <p>Chaque modèle a ses particularités. Consultez aussi la notice de votre appareil.</p>
      </div>
    </section>
  );
};
