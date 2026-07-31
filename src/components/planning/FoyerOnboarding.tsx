'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Membre } from '@/utils/repartition';
import { nouveauMembre, EMOJIS_MEMBRES } from '@/hooks/useFoyer';
import { haptic } from '@/utils/haptics';
import { Plus, X, Scale, CalendarDays, Repeat, ArrowRight, User } from 'lucide-react';

interface FoyerOnboardingProps {
  onCreer: (membres: Membre[]) => void;
}

const ARGUMENTS = [
  {
    icon: Scale,
    titre: 'Une charge, pas un compte de tâches',
    texte: 'Chaque tâche pèse sa durée × sa pénibilité. 10 min de WC valent 30 min de rangement — c\'est ça, l\'équité.',
  },
  {
    icon: CalendarDays,
    titre: 'Un planning qui se remplit tout seul',
    texte: 'Quotidien, hebdo, mensuel : tout est déjà calibré et réparti sur la semaine, sans journée surchargée.',
  },
  {
    icon: Repeat,
    titre: 'Les corvées tournent',
    texte: 'Personne n\'hérite des toilettes toutes les semaines : les tâches ingrates changent de main.',
  },
];

export const FoyerOnboarding = ({ onCreer }: FoyerOnboardingProps) => {
  const { theme, darkMode } = useTheme();
  const [membres, setMembres] = useState<Membre[]>([nouveauMembre(0)]);

  const majPrenom = (id: string, prenom: string) =>
    setMembres((prev) => prev.map((m) => (m.id === id ? { ...m, prenom } : m)));

  const majEmoji = (id: string) =>
    setMembres((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const i = EMOJIS_MEMBRES.indexOf(m.emoji);
        return { ...m, emoji: EMOJIS_MEMBRES[(i + 1) % EMOJIS_MEMBRES.length] };
      })
    );

  const ajouter = () => {
    if (membres.length >= 6) return;
    haptic('light');
    setMembres((prev) => [...prev, nouveauMembre(prev.length)]);
  };

  const retirer = (id: string) => {
    haptic('light');
    setMembres((prev) => (prev.length > 1 ? prev.filter((m) => m.id !== id) : prev));
  };

  const valider = () => {
    const propres = membres
      .map((m, i) => ({ ...m, prenom: m.prenom.trim() || `Membre ${i + 1}`, part: 50 }))
      .filter((_, i) => i < 6);
    haptic('success');
    onCreer(propres);
  };

  return (
    <div className="pt-2 pb-4">
      {/* Manifeste */}
      <div className="mb-5">
        <h1 className="font-display text-2xl font-extrabold mb-1.5" style={{ color: theme.textPrimary }}>
          Le ménage, réparti pour de vrai
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
          Cleanz construit votre planning et distribue les tâches pour que chacun
          fournisse exactement le même effort. Vous pouvez aussi choisir une
          répartition volontairement inégale.
        </p>
      </div>

      {/* Les 3 principes */}
      <div className="space-y-2 mb-6">
        {ARGUMENTS.map(({ icon: Icon, titre, texte }) => (
          <div
            key={titre}
            className="flex items-start gap-3 p-3 rounded-2xl"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
              border: `1px solid ${theme.borderCard}`,
            }}
          >
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${theme.accentPink}1a` }}
            >
              <Icon className="w-[18px] h-[18px]" style={{ color: theme.accentPink }} />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-bold leading-tight mb-0.5" style={{ color: theme.textPrimary }}>
                {titre}
              </p>
              <p className="text-[12px] leading-snug" style={{ color: theme.textSecondary }}>
                {texte}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Qui vit ici ? */}
      <div
        className="rounded-3xl p-4 mb-4"
        style={{
          background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
          border: `1px solid ${theme.borderCard}`,
          boxShadow: theme.shadowCard,
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <User className="w-4 h-4" style={{ color: theme.accentPink }} />
          <h2 className="font-display text-base font-extrabold" style={{ color: theme.textPrimary }}>
            Qui vit ici ?
          </h2>
          <span className="text-[11px] ml-auto" style={{ color: theme.textMuted }}>
            {membres.length === 1 ? 'Seul·e' : `${membres.length} personnes`}
          </span>
        </div>

        <div className="space-y-2">
          {membres.map((m, i) => (
            <div key={m.id} className="flex items-center gap-2">
              <button
                onClick={() => majEmoji(m.id)}
                aria-label="Changer l'avatar"
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 active:scale-95 transition-transform"
                style={{ background: `${m.couleur}22`, border: `2px solid ${m.couleur}` }}
              >
                {m.emoji}
              </button>
              <input
                value={m.prenom}
                onChange={(e) => majPrenom(m.id, e.target.value)}
                placeholder={`Prénom ${i + 1}`}
                maxLength={14}
                className="flex-1 min-w-0 h-11 px-3 rounded-2xl text-[15px] font-semibold outline-none"
                style={{
                  background: theme.bgInput,
                  color: theme.textPrimary,
                  border: `1px solid ${theme.borderLight}`,
                }}
              />
              {membres.length > 1 && (
                <button
                  onClick={() => retirer(m.id)}
                  aria-label={`Retirer ${m.prenom || 'ce membre'}`}
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform"
                  style={{ background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)' }}
                >
                  <X className="w-4 h-4" style={{ color: theme.textMuted }} />
                </button>
              )}
            </div>
          ))}
        </div>

        {membres.length < 6 && (
          <button
            onClick={ajouter}
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

      {/* CTA */}
      <button
        onClick={valider}
        className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-display text-[16px] font-extrabold text-white active:scale-[0.98] transition-transform"
        style={{
          background: 'linear-gradient(135deg, #FF69B4 0%, #A78BFA 55%, #4FD1C5 100%)',
          boxShadow: '0 10px 26px rgba(255,105,180,0.35)',
        }}
      >
        Créer mon planning
        <ArrowRight className="w-5 h-5" />
      </button>

      <p className="text-[11px] text-center mt-3 px-4" style={{ color: theme.textMuted }}>
        Tout reste sur votre téléphone. Les tâches suivies et la répartition se
        modifient à tout moment dans les réglages.
      </p>
    </div>
  );
};
