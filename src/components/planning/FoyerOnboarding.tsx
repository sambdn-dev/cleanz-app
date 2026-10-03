'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Membre } from '@/utils/repartition';
import { nouveauMembre, EMOJIS_MEMBRES } from '@/hooks/useFoyer';
import { haptic } from '@/utils/haptics';
import { Plus, X, Scale, CalendarDays, Repeat, ArrowRight, Users } from 'lucide-react';

interface FoyerOnboardingProps {
  onCreer: (membres: Membre[]) => void;
}

export const FoyerOnboarding = ({ onCreer }: FoyerOnboardingProps) => {
  const { theme, darkMode } = useTheme();
  const [membres, setMembres] = useState<Membre[]>([nouveauMembre(0)]);
  const accent = darkMode ? '#D8B4FE' : '#6D28D9';

  const majPrenom = (id: string, prenom: string) => setMembres((prev) => prev.map((m) => m.id === id ? { ...m, prenom } : m));
  const majEmoji = (id: string) => setMembres((prev) => prev.map((m) => {
    if (m.id !== id) return m;
    const i = EMOJIS_MEMBRES.indexOf(m.emoji);
    return { ...m, emoji: EMOJIS_MEMBRES[(i + 1) % EMOJIS_MEMBRES.length] };
  }));
  const ajouter = () => {
    if (membres.length >= 6) return;
    haptic('light');
    setMembres((prev) => [...prev, nouveauMembre(prev.length)]);
  };
  const retirer = (id: string) => { haptic('light'); setMembres((prev) => prev.length > 1 ? prev.filter((m) => m.id !== id) : prev); };
  const valider = () => {
    const propres = membres.map((m, i) => ({ ...m, prenom: m.prenom.trim() || `Membre ${i + 1}`, part: 50 })).filter((_, i) => i < 6);
    haptic('success');
    onCreer(propres);
  };

  return (
    <div className="pt-2 pb-5">
      <div className="mb-5">
        <div className="mb-3 flex items-center gap-2 text-xs font-bold" style={{ color: accent }}><CalendarDays className="h-4 w-4" />VOTRE PLANNING</div>
        <h1 className="font-display text-[28px] font-extrabold leading-tight" style={{ color: theme.textPrimary }}>Une maison à vivre.<br />Une semaine à partager.</h1>
        <p className="mt-3 text-sm leading-6" style={{ color: theme.textSecondary }}>Les tâches sont organisées pour vous, en solo ou à plusieurs.</p>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-2 rounded-3xl p-3" style={{ background: darkMode ? 'rgba(39,25,65,0.94)' : 'rgba(255,255,255,0.82)', border: `1px solid ${theme.borderCard}` }}>
        {([{ icon: CalendarDays, nom: '7 jours', detail: 'bien organisés' }, { icon: Scale, nom: 'Un effort', detail: 'réparti' }, { icon: Repeat, nom: 'Des tâches', detail: 'qui tournent' }]).map(({ icon: Icon, nom, detail }) => (
          <div key={nom} className="flex flex-col items-center py-1 text-center">
            <Icon className="mb-2 h-5 w-5" style={{ color: accent }} />
            <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{nom}</p>
            <p className="mt-0.5 text-[11px] leading-4" style={{ color: theme.textSecondary }}>{detail}</p>
          </div>
        ))}
      </div>

      <form onSubmit={(event) => { event.preventDefault(); valider(); }}>
        <section className="mb-4 rounded-3xl p-4" aria-label="Personnes du foyer" style={{ background: darkMode ? 'rgba(39,25,65,0.94)' : 'rgba(255,255,255,0.94)', border: `1px solid ${theme.borderCard}`, boxShadow: theme.shadowCard }}>
          <div className="mb-1 flex items-center gap-2">
            <Users className="h-4 w-4" style={{ color: accent }} />
            <h2 className="font-display text-lg font-extrabold" style={{ color: theme.textPrimary }}>Qui participe ?</h2>
            <span className="ml-auto text-xs" style={{ color: theme.textSecondary }}>{membres.length} / 6</span>
          </div>
          <p className="mb-4 text-xs leading-5" style={{ color: theme.textSecondary }}>Ajoutez un prénom. Le reste se règle ensuite.</p>
          <div className="space-y-3">
            {membres.map((m, i) => (
              <div key={m.id}>
                <label htmlFor={`planning-membre-${m.id}`} className="mb-1.5 block text-xs font-semibold" style={{ color: theme.textSecondary }}>{i === 0 ? 'Votre prénom' : `Prénom de la personne ${i + 1}`}</label>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => majEmoji(m.id)} aria-label={`Changer l’avatar de la personne ${i + 1}`} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl active:scale-95" style={{ background: `${m.couleur}18`, border: `1px solid ${m.couleur}55` }}>{m.emoji}</button>
                  <input id={`planning-membre-${m.id}`} value={m.prenom} onChange={(e) => majPrenom(m.id, e.target.value)} placeholder={i === 0 ? 'Ex. Sami' : 'Ex. Alex'} maxLength={14} autoComplete="given-name" className="h-12 min-w-0 flex-1 rounded-2xl px-3 text-[16px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-violet-500" style={{ background: theme.bgInput, color: theme.textPrimary, border: `1px solid ${theme.borderLight}` }} />
                  {membres.length > 1 && <button type="button" onClick={() => retirer(m.id)} aria-label={`Retirer ${m.prenom || `la personne ${i + 1}`}`} className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl" style={{ color: theme.textSecondary }}><X className="h-4 w-4" /></button>}
                </div>
              </div>
            ))}
          </div>
          {membres.length < 6 && <button type="button" onClick={ajouter} className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold" style={{ background: darkMode ? 'rgba(216,180,254,0.1)' : '#F4EFFB', color: accent }}><Plus className="h-4 w-4" />Ajouter une personne</button>}
        </section>
        <button type="submit" className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl font-display text-[16px] font-extrabold active:scale-[0.98] transition-transform" style={{ background: darkMode ? '#D8B4FE' : '#6D28D9', color: darkMode ? '#26143E' : '#fff', boxShadow: darkMode ? undefined : '0 8px 20px rgba(109,40,217,0.18)' }}>Créer mon planning<ArrowRight className="h-5 w-5" /></button>
      </form>
      <p className="mt-3 px-2 text-center text-xs leading-5" style={{ color: theme.textSecondary }}>Votre foyer reste enregistré sur ce téléphone.<br />Personnes et tâches modifiables à tout moment.</p>
    </div>
  );
};
