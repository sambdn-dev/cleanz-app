'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { haptic } from '@/utils/haptics';
import { getProduitsParCategorie } from '@/data/partenaires';
import { PartnerProductCard } from '@/components/ui/PartnerProductCard';
import { ChevronRight, Car, Droplets, Brush, Wrench } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Contenu éditorial — lavage pro à la maison                         */
/* ------------------------------------------------------------------ */
interface Tip {
  emoji: string;
  titre: string;
  texte: string;
  important?: boolean;
}

const TABS: { label: string; icon: React.ReactNode; tips: Tip[] }[] = [
  {
    label: 'Haute pression',
    icon: <Droplets className="w-3.5 h-3.5" />,
    tips: [
      {
        emoji: '📏',
        titre: 'La règle d\'or : 30 cm minimum',
        important: true,
        texte:
          "Jamais le jet à moins de 30 cm de la carrosserie (50 cm sur une peinture ancienne ou reprise). Trop près, la haute pression peut cloquer le vernis, décoller un covering ou marquer définitivement la peinture.\n\nTravaillez en biais (45°), jamais perpendiculaire au même endroit plusieurs secondes.",
      },
      {
        emoji: '🚫',
        titre: 'Les zones interdites au jet',
        texte:
          "• Joints de portes et de vitres (l'eau s'infiltre)\n• Autocollants et baguettes collées\n• Roulements de roues et étriers de frein\n• Compartiment moteur (électronique)\n• Radiateur (les ailettes se plient)\n\nCes zones : éponge et chiffon uniquement.",
      },
      {
        emoji: '🔄',
        titre: 'L\'ordre qui change tout',
        texte:
          "1. Prélavage : jet large sur toute la caisse pour évacuer sable et gravillons (ce sont eux qui rayent)\n2. Bas de caisse et passages de roues en premier (le plus sale)\n3. Puis de HAUT en BAS : toit → vitres → capot → portières → bas de caisse\n4. Jamais en plein soleil ni sur carrosserie chaude.",
      },
      {
        emoji: '❄️',
        titre: 'L\'hiver : le sel, ennemi n°1',
        texte:
          "Après une période de routes salées, insistez sur les passages de roues et le bas de caisse : le sel ronge les soubassements en silence. Un rinçage haute pression par mois d'hiver prolonge la carrosserie de plusieurs années.",
      },
    ],
  },
  {
    label: 'Mousse',
    icon: <Car className="w-3.5 h-3.5" />,
    tips: [
      {
        emoji: '🫧',
        titre: 'Le canon à mousse, mode d\'emploi',
        important: true,
        texte:
          "Le canon (ou lance) à mousse se fixe sur le nettoyeur haute pression et enrobe la voiture d'une neige épaisse.\n\n1. Diluez le shampoing auto dans le réservoir du canon (dosage du flacon)\n2. Mousse sur voiture SÈCHE, de bas en haut\n3. Laissez agir 3 à 5 min — sans jamais laisser sécher\n4. Rincez de haut en bas.\n\nLa mousse décolle 80 % de la saleté sans contact : moins de frottement = moins de micro-rayures.",
      },
      {
        emoji: '🔵',
        titre: 'Le « produit bleu » : shampoing 3-en-1',
        texte:
          "Le shampoing auto 3-en-1 (le fameux bleu) nettoie, dépose une cire de protection et active le déperlant. C'est LE produit à mettre dans le canon à mousse.\n\nDosage : ne surdosez pas, plus de mousse ≠ plus propre. Un bouchon suffit généralement pour une citadine.",
      },
      {
        emoji: '🪣',
        titre: 'La méthode des 2 seaux',
        texte:
          "Après la mousse, pour le lavage contact :\n• Seau 1 : eau + shampoing\n• Seau 2 : eau claire de rinçage\n\nGant microfibre : je trempe dans le 1, je lave UN panneau, je rince le gant dans le 2, je recommence. Le sable reste au fond du seau 2 au lieu de rayer la peinture.",
      },
      {
        emoji: '🧴',
        titre: 'Et la version 100% naturelle ?',
        texte:
          "Notre recette Nettoyant Carrosserie au savon noir fait très bien le travail en lavage courant. Le duo canon à mousse + shampoing dédié apporte le confort et la protection cire en plus — les deux se complètent.",
      },
    ],
  },
  {
    label: 'Interstices',
    icon: <Brush className="w-3.5 h-3.5" />,
    tips: [
      {
        emoji: '🖌️',
        titre: 'Le pinceau, l\'arme secrète du detailing',
        important: true,
        texte:
          "Grilles d'aération, contours de boutons, rainures du levier de vitesse : impossible au chiffon, 30 secondes au pinceau souple.\n\n3 tailles suffisent : large (aérations, console), moyen (commandes, poignées), fin (contours de compteurs, coutures).\n\nGeste : pinceau SEC d'abord pour la poussière, puis à peine humide (eau + goutte de savon noir) pour les traces.",
      },
      {
        emoji: '🧠',
        titre: 'Les zones qu\'on oublie toujours',
        texte:
          "• Rails de sièges (miettes incrustées)\n• Joints de portes (poussière noire)\n• Boucles de ceintures\n• Contours des poignées intérieures\n• Trappe à carburant\n• Seuils de portes\n\nUn passage par mois et l'habitacle reste « sortie de concession ».",
      },
      {
        emoji: '⚠️',
        titre: 'Près de l\'électronique : la prudence',
        texte:
          "Autour des écrans, boutons de warning et commandes au volant : pinceau sec ou à peine humide, jamais de spray directement. L'écran tactile lui-même : microfibre sèche, point final.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export const DetailingAutoSection = () => {
  const { theme, darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState<number | null>(0);

  const accent = darkMode ? '#FBBF24' : '#D97706';
  const tab = TABS[activeTab];
  const produits = getProduitsParCategorie('auto');

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
    <div className="mb-5" id="detailing-auto">
      <div
        className="rounded-3xl overflow-hidden relative"
        style={{
          background: darkMode ? 'linear-gradient(135deg, #292018 0%, #171310 100%)' : 'rgba(255,255,255,0.55)',
          border: `1px solid ${accent}38`,
          boxShadow: darkMode ? 'none' : `0 8px 28px ${accent}22`,
        }}
      >
        {/* Bannière */}
        <div
          className="relative h-24 w-full overflow-hidden"
          style={{
            background: darkMode
              ? 'linear-gradient(120deg, #78350F 0%, #92400E 45%, #451A03 100%)'
              : 'linear-gradient(120deg, #FBBF24 0%, #F59E0B 45%, #D97706 100%)',
          }}
        >
          {/* Traits de vitesse décoratifs */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 96" preserveAspectRatio="none" aria-hidden>
            <line x1="230" y1="22" x2="330" y2="22" stroke="rgba(255,255,255,0.25)" strokeWidth="3" strokeLinecap="round" />
            <line x1="255" y1="38" x2="370" y2="38" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
            <line x1="240" y1="54" x2="345" y2="54" stroke="rgba(255,255,255,0.12)" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.22)' }}>
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/75">Lavage pro à la maison</p>
              <h3 className="font-display text-lg font-extrabold text-white leading-tight">Detailing Auto</h3>
            </div>
          </div>
          <span className="absolute top-2.5 right-3 text-2xl" aria-hidden>🚗</span>
        </div>

        {/* Onglets */}
        <div className="flex gap-1.5 px-3 pt-3">
          {TABS.map((t, i) => (
            <button
              key={i}
              onClick={() => switchTab(i)}
              className="flex-1 py-2 px-2 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-1.5"
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
                  <span className="flex-1 text-[15px] font-semibold" style={{ color: theme.textPrimary }}>
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
                    <p className="px-3 pb-2.5 text-[14px] leading-relaxed whitespace-pre-line" style={{ color: theme.textSecondary }}>
                      {tip.texte}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Matériel & produits (partenaires — placeholders) */}
        <div className="px-3 pb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Car className="w-3.5 h-3.5" style={{ color: accent }} />
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>
              L&apos;équipement du detailer
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
