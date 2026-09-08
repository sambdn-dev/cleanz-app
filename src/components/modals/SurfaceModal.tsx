'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Surface, RecetteComplete } from '@/types';
import { ChevronRight, Droplets, Flame, Sparkles, Wind } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { SectionTitle, MetaBar, ACCENT } from '@/components/ui/ModalParts';
import { RECETTES, RECETTES_PAR_SURFACE } from '@/data/recettes';
import { estListable } from '@/data/revue';
import { PreuveChip } from '@/components/ui/PreuveChip';
import { getSurfaceImage } from '@/data/scenes';

interface SurfaceModalProps {
  surface: Surface;
  onClose: () => void;
  onRecipeClick?: (recipe: RecetteComplete) => void;
}

const getRecettesForSurface = (surfaceId: number): RecetteComplete[] => {
  const recipeIds = RECETTES_PAR_SURFACE[surfaceId] || [];
  // Les fiches retirées ou fusionnées ne sont plus proposées depuis une surface.
  return recipeIds.filter(estListable).map((id) => RECETTES.find((r) => r.id === id)).filter(Boolean) as RecetteComplete[];
};

// Ingrédients recommandés par catégorie
const INGREDIENTS_RECOMMANDES: Record<string, { nom: string; emoji: string }[]> = {
  Cuisine: [
    { nom: 'Bicarbonate', emoji: '⚪' },
    { nom: 'Vinaigre blanc', emoji: '🧴' },
    { nom: 'Savon noir', emoji: '⚫' },
    { nom: 'Cristaux de soude', emoji: '💎' },
  ],
  'Salle de bain': [
    { nom: 'Acide citrique', emoji: '🍋' },
    { nom: 'Vinaigre blanc', emoji: '🧴' },
    { nom: 'Bicarbonate', emoji: '⚪' },
    { nom: 'Percarbonate', emoji: '✨' },
  ],
  Chambre: [
    { nom: 'Bicarbonate', emoji: '⚪' },
    { nom: 'Savon de Marseille', emoji: '🧼' },
    { nom: 'Percarbonate', emoji: '✨' },
  ],
  Salon: [
    { nom: 'Vinaigre blanc', emoji: '🧴' },
    { nom: 'Bicarbonate', emoji: '⚪' },
    { nom: 'Savon noir', emoji: '⚫' },
  ],
  Buanderie: [
    { nom: 'Percarbonate', emoji: '✨' },
    { nom: 'Vinaigre blanc', emoji: '🧴' },
    { nom: 'Savon de Marseille', emoji: '🧼' },
  ],
  Électronique: [
    { nom: 'Vinaigre blanc', emoji: '🧴' },
    { nom: 'Alcool ménager', emoji: '🔬' },
  ],
  Véhicule: [
    { nom: 'Savon noir', emoji: '⚫' },
    { nom: 'Vinaigre blanc', emoji: '🧴' },
    { nom: 'Bicarbonate', emoji: '⚪' },
  ],
  Extérieur: [
    { nom: 'Savon noir', emoji: '⚫' },
    { nom: 'Bicarbonate', emoji: '⚪' },
    { nom: 'Cristaux de soude', emoji: '💎' },
  ],
  Corps: [
    { nom: 'Savon de Marseille', emoji: '🧼' },
    { nom: 'Bicarbonate', emoji: '⚪' },
  ],
};

const getIngredientsFromRecettes = (recettes: RecetteComplete[]): { nom: string; emoji: string }[] => {
  const ingredientsMap = new Map<string, string>();
  recettes.forEach((recette) => {
    recette.ingredients.forEach((ing) => {
      if (!ingredientsMap.has(ing.nom) && ing.emoji) {
        ingredientsMap.set(ing.nom, ing.emoji);
      }
    });
  });
  return Array.from(ingredientsMap.entries()).map(([nom, emoji]) => ({ nom, emoji }));
};

export const SurfaceModal = ({ surface, onClose, onRecipeClick }: SurfaceModalProps) => {
  const { theme, darkMode } = useTheme();
  const recettes = getRecettesForSurface(surface.id);
  const vapeurRecette = surface.vapeurRecetteId
    ? RECETTES.find((r) => r.id === surface.vapeurRecetteId)
    : undefined;
  // Identité teal de la vapeur, réutilisée partout dans la carte (icône, pastilles, séparateur).
  const vapeurAccent = darkMode ? '#5EEAD4' : '#0D9488';
  // Verre dépoli translucide (effet « Liquid Glass ») pour les pastilles et le bouton recette.
  const vapeurGlass = darkMode ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.55)';
  const vapeurGlassBorder = darkMode ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.75)';
  // Photo-scène de la surface (repli emoji + dégradé géré par <Modal />)
  const headerImageUrl = getSurfaceImage(surface);
  const hasImage = !!headerImageUrl;

  const ingredients = recettes.length > 0
    ? getIngredientsFromRecettes(recettes)
    : INGREDIENTS_RECOMMANDES[surface.piece] || INGREDIENTS_RECOMMANDES['Cuisine'];

  const headerGradient = darkMode
    ? 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)'
    : 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)';

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      headerGradient={headerGradient}
      headerImageUrl={headerImageUrl}
      headerContent={
        <div
          className={hasImage ? 'flex flex-col justify-end' : 'flex items-center gap-4'}
          style={hasImage ? { minHeight: 130 } : undefined}
        >
          {!hasImage && <span className="text-5xl">{surface.emoji}</span>}
          <div>
            <h2
              className="font-display text-xl font-extrabold text-white"
              style={hasImage ? { textShadow: '0 1px 3px rgba(0,0,0,0.45)' } : undefined}
            >
              {hasImage && <span className="mr-2">{surface.emoji}</span>}{surface.nom}
            </h2>
            <p
              className="text-white/85 text-sm"
              style={hasImage ? { textShadow: '0 1px 8px rgba(0,0,0,0.5)' } : undefined}
            >
              {surface.piece}
            </p>
          </div>
        </div>
      }
    >
      {/* Meta inline */}
      <MetaBar
        items={[
          { label: 'Fréquence', value: <span className="text-xs">{surface.frequence}</span> },
          { label: 'Catégorie', value: <span className="text-xs">{surface.categorie}</span> },
        ]}
      />

      {/* La vapeur suffit — mise en avant du nettoyage 100% eau */}
      {surface.vapeurOk && (
        <div className="mb-6">
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{
              background: darkMode
                ? 'linear-gradient(135deg, rgba(94,234,212,0.14) 0%, rgba(56,189,248,0.10) 100%)'
                : 'linear-gradient(135deg, rgba(94,234,212,0.18) 0%, rgba(56,189,248,0.13) 100%)',
              border: `1.5px solid ${darkMode ? 'rgba(94,234,212,0.30)' : 'rgba(20,184,166,0.30)'}`,
              boxShadow: darkMode
                ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(20,184,166,0.10)'
                : 'inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 24px rgba(20,184,166,0.12)',
            }}
          >
            {/* Reflet « verre » diagonal, purement décoratif */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: darkMode
                  ? 'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, transparent 35%)'
                  : 'linear-gradient(115deg, rgba(255,255,255,0.55) 0%, transparent 40%)',
              }}
              aria-hidden
            />

            <div className="relative p-4">
              {/* Icône agrandie + titre + pastilles stats en verre dépoli */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: vapeurGlass,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: `inset 0 1px 0 ${vapeurGlassBorder}, inset 0 0 0 1px ${darkMode ? 'rgba(94,234,212,0.25)' : 'rgba(20,184,166,0.22)'}`,
                  }}
                >
                  <Wind className="w-5 h-5" style={{ color: vapeurAccent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-display text-[14px] font-extrabold leading-tight mb-1.5"
                    style={{ color: theme.textPrimary }}
                  >
                    Ici, la vapeur suffit ✨
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { Icon: Droplets, label: '0 produit' },
                      { Icon: Sparkles, label: '0 résidu' },
                      { Icon: Flame, label: '100 °C' },
                    ].map(({ Icon, label }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{
                          background: vapeurGlass,
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          color: vapeurAccent,
                          boxShadow: `inset 0 1px 0 ${vapeurGlassBorder}`,
                        }}
                      >
                        <Icon className="w-3 h-3" />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {vapeurRecette && onRecipeClick && (
                <button
                  onClick={() => onRecipeClick(vapeurRecette)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all active:scale-[0.98]"
                  style={{
                    background: vapeurGlass,
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: `inset 0 1px 0 ${vapeurGlassBorder}`,
                  }}
                >
                  <span className="text-xs font-semibold" style={{ color: theme.textPrimary }}>
                    {vapeurRecette.emoji} {vapeurRecette.nom}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: theme.textMuted }} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recettes maison */}
      {recettes.length > 0 ? (
        <div className="mb-6">
          <SectionTitle accent={ACCENT.sage}>Astuces maison</SectionTitle>
          <div className="space-y-2">
            {recettes.map((recette) => (
              <div
                key={recette.id}
                onClick={() => onRecipeClick?.(recette)}
                className={`p-3.5 rounded-2xl transition-all duration-200 ${onRecipeClick ? 'cursor-pointer active:scale-[0.98]' : ''}`}
                style={{
                  background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)',
                  border: `1px solid ${darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'}`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{recette.emoji}</span>
                    <h4 className="font-bold text-sm" style={{ color: theme.textPrimary }}>{recette.nom}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', color: theme.textSecondary }}>
                      {recette.temps}
                    </span>
                    {onRecipeClick && <ChevronRight className="w-4 h-4" style={{ color: theme.textMuted }} />}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {recette.ingredients.slice(0, 4).map((ing, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)', color: theme.textSecondary }}>
                      {ing.nom}
                    </span>
                  ))}
                  {recette.ingredients.length > 4 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)', color: theme.textSecondary }}>
                      +{recette.ingredients.length - 4}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <PreuveChip id={recette.id} compact />
                  {onRecipeClick && <span className="text-[10px] font-medium" style={{ color: ACCENT.brand }}>Voir détails</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <SectionTitle accent={ACCENT.sage}>Astuces maison</SectionTitle>
          <div
            className="p-4 rounded-2xl text-center"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              border: `1px dashed ${darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
            }}
          >
            <span className="text-3xl mb-2 block">🌱</span>
            <p className="text-sm font-medium mb-1" style={{ color: theme.textPrimary }}>Astuces en préparation</p>
            <p className="text-xs" style={{ color: theme.textMuted }}>
              L&apos;équipe Cleanz ajoute de nouvelles astuces naturelles régulièrement. De nouvelles astuces pour cette surface arrivent très bientôt !
            </p>
          </div>
        </div>
      )}

      {/* Ingrédients recommandés */}
      <div>
        <SectionTitle accent={ACCENT.amber}>Ingrédients recommandés</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ing, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
            >
              <span className="text-lg">{ing.emoji}</span>
              <span className="text-xs font-medium" style={{ color: theme.textPrimary }}>{ing.nom}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
