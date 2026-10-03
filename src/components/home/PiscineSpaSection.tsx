'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { haptic } from '@/utils/haptics';
import { getProduitsParCategorie } from '@/data/partenaires';
import { PartnerProductCard } from '@/components/ui/PartnerProductCard';
import { RecipeModal } from '@/components/modals/RecipeModal';
import { getRecipeAccess } from '@/data/publication';
import { ChevronRight, Waves, Droplets, TestTube2, LifeBuoy } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Contenu éditorial                                                  */
/* ------------------------------------------------------------------ */
type Tip = {
  emoji: string;
  titre: string;
  important?: boolean;
} & (
  | { recipeId: number; texte?: never }
  | { recipeId?: never; texte: string }
);

const TABS: { label: string; icon: React.ReactNode; tips: Tip[] }[] = [
  {
    label: 'Piscine',
    icon: <Waves className="w-3.5 h-3.5" />,
    tips: [
      {
        emoji: '🧪',
        titre: "Analyse de l’eau",
        important: true,
        texte:
          "Les seuils et corrections dépendent du bassin et de son traitement. Aucune procédure de traitement publiée n’est disponible ici. Consultez les consignes du fabricant ou de votre pisciniste.",
      },
      {
        emoji: '⏱️',
        titre: 'Filtration : la règle température ÷ 2',
        texte:
          "Le temps de filtration quotidien = température de l'eau divisée par 2.\nEau à 26 °C → 13 h de filtration par jour, en journée (quand les algues se développent).\n\n80 % de la qualité de l'eau vient de la filtration, pas des produits.",
      },
      {
        emoji: '🧼',
        titre: "Nettoyer la ligne d’eau",
        recipeId: 143,
      },
      {
        emoji: '🍂',
        titre: 'Skimmer & panier : le réflexe 2 minutes',
        texte:
          "Panier de skimmer vidé 1×/semaine (feuilles, insectes), préfiltre de pompe vérifié 1×/mois. Un panier plein = débit divisé par deux = eau qui tourne.",
      },
      {
        emoji: '❄️',
        titre: "Préparer l’hivernage",
        texte:
          "L’hivernage dépend du bassin, de ses équipements et des conditions locales. Aucune procédure publiée n’est disponible ici. Consultez les consignes du fabricant ou de votre pisciniste.",
      },
    ],
  },
  {
    label: 'Spa',
    icon: <Droplets className="w-3.5 h-3.5" />,
    tips: [
      {
        emoji: '🔄',
        titre: "Renouveler l'eau : la formule simple",
        important: true,
        texte:
          "Volume du spa (L) ÷ 3 ÷ nombre de baigneurs par jour = nombre de jours entre deux vidanges.\nSpa 1000 L, 2 baigneurs/jour → eau changée tous les ~166 jours… en théorie. En pratique : toutes les 6 à 8 semaines pour un usage régulier.",
      },
      {
        emoji: '🌡️',
        titre: "À 37 °C, tout va plus vite",
        texte:
          "La température fait partie des paramètres à prendre en compte pour l’entretien du spa. Aucune procédure de désinfection publiée n’est disponible ici. Consultez la notice de votre spa et les consignes du produit de traitement.",
      },
      {
        emoji: '🧽',
        titre: 'Entretenir le filtre',
        recipeId: 144,
      },
      {
        emoji: '🫧',
        titre: 'La ligne de mousse',
        texte:
          "Des résidus de savon ou de cosmétiques peuvent être présents dans l’eau. Aucun traitement anti-mousse publié n’est disponible ici. Consultez les consignes d’entretien de votre spa.",
      },
    ],
  },
  {
    label: 'SOS',
    icon: <LifeBuoy className="w-3.5 h-3.5" />,
    tips: [
      {
        emoji: '🟢',
        titre: 'Eau verte (algues)',
        important: true,
        texte:
          "Aucune procédure de traitement de l’eau verte publiée n’est disponible ici. Faites identifier la cause et le traitement adapté à votre installation par votre pisciniste.",
      },
      {
        emoji: '🌫️',
        titre: 'Eau trouble ou laiteuse',
        texte:
          "Aucune procédure de traitement de l’eau trouble publiée n’est disponible ici. La cause doit être identifiée avant de choisir un traitement adapté au bassin et au filtre.",
      },
      {
        emoji: '👃',
        titre: "Forte odeur de chlore",
        texte:
          "Une odeur ne suffit pas à déterminer le traitement à appliquer. Aucune procédure publiée n’est disponible ici. Consultez votre pisciniste pour interpréter les mesures de l’eau.",
      },
      {
        emoji: '🟤',
        titre: 'Dépôts marron sur les parois',
        texte:
          "Aucune méthode publiée n’est disponible ici pour traiter ces dépôts. Faites identifier leur nature et le revêtement avant de choisir une intervention avec votre pisciniste.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export const PiscineSpaSection = ({ embedded = false }: { embedded?: boolean }) => {
  const { theme, darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  const accent = darkMode ? '#5EEAD4' : '#0891B2';
  const tab = TABS[activeTab];
  const produits = getProduitsParCategorie('piscine-spa');

  const switchTab = (i: number) => {
    if (i === activeTab) return;
    haptic('selection');
    setActiveTab(i);
    setOpen(0);
  };
  const toggle = (i: number) => {
    haptic('selection');
    setOpen((p) => (p === i ? null : i));
  };

  return (
    <div className={embedded ? '' : 'mb-5'} id="piscine-spa">
      <div
        className="rounded-3xl overflow-hidden relative"
        style={{
          background: embedded ? 'transparent' : darkMode ? 'linear-gradient(135deg, #0E2A3F 0%, #0A1A2E 100%)' : 'rgba(255,255,255,0.55)',
          border: embedded ? 'none' : `1px solid ${accent}38`,
          boxShadow: embedded ? 'none' : darkMode ? 'none' : `0 8px 28px ${accent}22`,
        }}
      >
        {/* Bannière (masquée en mode embedded : la feuille a déjà sa bannière photo) */}
        {!embedded && (
        <div
          className="relative h-24 w-full overflow-hidden"
          style={{
            background: darkMode
              ? 'linear-gradient(120deg, #155E75 0%, #0E7490 45%, #164E63 100%)'
              : 'linear-gradient(120deg, #22D3EE 0%, #06B6D4 45%, #0891B2 100%)',
          }}
        >
          {/* Vaguelettes décoratives */}
          <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden>
            <path d="M0 25 Q 50 12 100 25 T 200 25 T 300 25 T 400 25 V 40 H 0 Z" fill="rgba(255,255,255,0.14)" />
            <path d="M0 32 Q 50 22 100 32 T 200 32 T 300 32 T 400 32 V 40 H 0 Z" fill="rgba(255,255,255,0.18)" />
          </svg>
          <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.22)' }}>
              <Waves className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/75">Extérieur</p>
              <h3 className="font-display text-lg font-extrabold text-white leading-tight">Piscine & Spa</h3>
            </div>
          </div>
          <span className="absolute top-2.5 right-3 text-2xl" aria-hidden>🏊</span>
        </div>
        )}

        {/* Onglets */}
        <div className="flex gap-1.5 px-3 pt-3">
          {TABS.map((t, i) => (
            <button
              key={i}
              onClick={() => switchTab(i)}
              className="flex-1 py-2 px-3 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-1.5"
              style={{
                background: activeTab === i ? `${accent}26` : 'transparent',
                color: activeTab === i ? accent : theme.textMuted,
              }}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Conseils */}
        <div className="p-3 space-y-1.5">
          {tab.tips.map((tip, i) => {
            const isOpen = open === i;
            const access = typeof tip.recipeId === 'number' ? getRecipeAccess(tip.recipeId) : null;
            return (
              <div
                key={`${activeTab}-${i}`}
                className="w-full text-left rounded-xl"
                style={{
                  background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
                  border: tip.important
                    ? `1.5px solid ${accent}66`
                    : `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : `${accent}26`}`,
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full text-left flex items-center gap-2.5 py-2.5 px-3 transition-all active:scale-[0.99]"
                >
                  <span className="text-lg flex-shrink-0" aria-hidden>{tip.emoji}</span>
                  <span className="flex-1 text-[15px] font-semibold" style={{ color: theme.textPrimary }}>
                    {tip.titre}
                    {tip.important && <span className="ml-1.5 text-[10px] opacity-60">⭐</span>}
                  </span>
                  <ChevronRight
                    className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200"
                    style={{ color: theme.textMuted, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  />
                </button>
                {isOpen && (
                  <div className="animate-accordion-in">
                    <p className="px-3 pb-2.5 text-[14px] leading-relaxed whitespace-pre-line" style={{ color: theme.textSecondary }}>
                      {access
                        ? access.available
                          ? 'Consultez la fiche actuelle et ses précautions avant de commencer.'
                          : access.message
                        : tip.texte}
                    </p>
                    {access?.available && typeof tip.recipeId === 'number' && (
                      <button
                        type="button"
                        onClick={() => { haptic('light'); setSelectedRecipeId(tip.recipeId); }}
                        className="mx-3 mb-3 px-3 py-2 rounded-xl text-sm font-semibold"
                        style={{ background: `${accent}20`, color: accent }}
                      >
                        Consulter la fiche
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Produits & matériel (partenaires — placeholders) */}
        <div className="px-3 pb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <TestTube2 className="w-3.5 h-3.5" style={{ color: accent }} />
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>
              Produits & matériel conseillés
            </p>
          </div>
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-3 px-3">
            {produits.map((p) => (
              <PartnerProductCard key={p.id} produit={p} compact accent={accent} />
            ))}
          </div>
        </div>
      </div>
      {selectedRecipeId !== null && (
        <RecipeModal recipeId={selectedRecipeId} onClose={() => setSelectedRecipeId(null)} />
      )}
    </div>
  );
};
