'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { haptic } from '@/utils/haptics';
import { getProduitsParCategorie } from '@/data/partenaires';
import { PartnerProductCard } from '@/components/ui/PartnerProductCard';
import { ChevronRight, Waves, Droplets, TestTube2, LifeBuoy } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Contenu éditorial                                                  */
/* ------------------------------------------------------------------ */
interface Tip {
  emoji: string;
  titre: string;
  texte: string;
  important?: boolean;
}

const TABS: { label: string; icon: React.ReactNode; tips: Tip[] }[] = [
  {
    label: 'Piscine',
    icon: <Waves className="w-3.5 h-3.5" />,
    tips: [
      {
        emoji: '🧪',
        titre: "L'analyse hebdo, la base de tout",
        important: true,
        texte:
          "1 bandelette par semaine (15 secondes) et vous évitez 90 % des problèmes.\n\n• pH idéal : entre 7,0 et 7,4 — en dessous l'eau irrite, au-dessus le chlore ne sert plus à rien.\n• Chlore libre : 1 à 2 mg/L.\n• TAC (alcalinité) : 80 à 120 mg/L — c'est lui qui stabilise le pH, corrigez-le en premier.",
      },
      {
        emoji: '⏱️',
        titre: 'Filtration : la règle température ÷ 2',
        texte:
          "Le temps de filtration quotidien = température de l'eau divisée par 2.\nEau à 26 °C → 13 h de filtration par jour, en journée (quand les algues se développent).\n\n80 % de la qualité de l'eau vient de la filtration, pas des produits.",
      },
      {
        emoji: '🧼',
        titre: "Ligne d'eau : pierre d'argile, pas de chimie",
        texte:
          "La trace grasse à la ligne d'eau (crèmes solaires, pollens) part très bien à la pierre d'argile ou au bicarbonate en pâte sur une éponge. Sans vider un litre d'eau, sans produit dédié.",
      },
      {
        emoji: '🍂',
        titre: 'Skimmer & panier : le réflexe 2 minutes',
        texte:
          "Panier de skimmer vidé 1×/semaine (feuilles, insectes), préfiltre de pompe vérifié 1×/mois. Un panier plein = débit divisé par deux = eau qui tourne.",
      },
      {
        emoji: '❄️',
        titre: "Hivernage : ne videz jamais complètement",
        texte:
          "Sous 12 °C d'eau : nettoyage complet, pH équilibré, produit d'hivernage, niveau d'eau abaissé sous les buses, flotteurs antigel. Une piscine vidée l'hiver risque de se soulever avec la pression du sol.",
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
          "La chaleur accélère la prolifération des bactéries ET la consommation de désinfectant. Analysez 2×/semaine (contre 1× pour une piscine), et privilégiez le brome ou l'oxygène actif, plus stables que le chlore à haute température.",
      },
      {
        emoji: '🧽',
        titre: 'Filtre rincé chaque semaine',
        texte:
          "Le filtre cartouche se rince au jet 1×/semaine et trempe dans du vinaigre blanc dilué 1×/mois (calcaire + corps gras). Remplacement : 1×/an.",
      },
      {
        emoji: '🫧',
        titre: 'La ligne de mousse',
        texte:
          "De la mousse en surface = résidus de savon et cosmétiques. Douche savonneuse AVANT le spa (et pas après 😉), et un anti-mousse spa en dépannage seulement.",
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
          "1. Brossez parois et fond.\n2. Vérifiez puis corrigez le pH (7,0–7,4).\n3. Traitement choc (chlore ou oxygène actif).\n4. Filtration 24h/24 pendant 48 h.\n5. Floculant si l'eau reste trouble, puis aspirez le dépôt.",
      },
      {
        emoji: '🌫️',
        titre: 'Eau trouble ou laiteuse',
        texte:
          "Souvent un pH trop haut ou une filtration insuffisante. Corrigez le pH, filtrez en continu 24 h, nettoyez le filtre. Persistant → floculant adapté à votre filtre.",
      },
      {
        emoji: '👃',
        titre: "Forte odeur de chlore = manque de chlore",
        texte:
          "Contre-intuitif : l'odeur vient des chloramines, du chlore « usé » saturé de matières organiques. La solution n'est pas d'arrêter le chlore mais de faire un traitement choc pour tout oxyder, puis de laisser filtrer.",
      },
      {
        emoji: '🟤',
        titre: 'Dépôts marron sur les parois',
        texte:
          "Probables métaux (fer, cuivre) apportés par l'eau de remplissage. Un séquestrant métaux les neutralise. Ne frottez pas au chlore pur : ça fixe la tache.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export const PiscineSpaSection = () => {
  const { theme, darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState<number | null>(0);

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
    <div className="mb-5" id="piscine-spa">
      <div
        className="rounded-3xl overflow-hidden relative"
        style={{
          background: darkMode ? 'linear-gradient(135deg, #0E2A3F 0%, #0A1A2E 100%)' : 'rgba(255,255,255,0.55)',
          border: `1px solid ${accent}38`,
          boxShadow: darkMode ? 'none' : `0 8px 28px ${accent}22`,
        }}
      >
        {/* Bannière */}
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

        {/* Onglets */}
        <div className="flex gap-1.5 px-3 pt-3">
          {TABS.map((t, i) => (
            <button
              key={i}
              onClick={() => switchTab(i)}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
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
            return (
              <button
                key={`${activeTab}-${i}`}
                onClick={() => toggle(i)}
                className="w-full text-left rounded-xl transition-all active:scale-[0.99]"
                style={{
                  background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
                  border: tip.important
                    ? `1.5px solid ${accent}66`
                    : `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : `${accent}26`}`,
                }}
              >
                <div className="flex items-center gap-2.5 py-2.5 px-3">
                  <span className="text-lg flex-shrink-0" aria-hidden>{tip.emoji}</span>
                  <span className="flex-1 text-[13px] font-semibold" style={{ color: theme.textPrimary }}>
                    {tip.titre}
                    {tip.important && <span className="ml-1.5 text-[10px] opacity-60">⭐</span>}
                  </span>
                  <ChevronRight
                    className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200"
                    style={{ color: theme.textMuted, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  />
                </div>
                {isOpen && (
                  <div className="animate-accordion-in">
                    <p className="px-3 pb-2.5 text-[12px] leading-relaxed whitespace-pre-line" style={{ color: theme.textSecondary }}>
                      {tip.texte}
                    </p>
                  </div>
                )}
              </button>
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
    </div>
  );
};
