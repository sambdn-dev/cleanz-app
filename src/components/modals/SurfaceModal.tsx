'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Surface, RecetteComplete } from '@/types';
import { ChevronRight, Star } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { SectionTitle, MetaBar, ACCENT } from '@/components/ui/ModalParts';
import { RECETTES, RECETTES_PAR_SURFACE } from '@/data/recettes';

interface SurfaceModalProps {
  surface: Surface;
  onClose: () => void;
  onRecipeClick?: (recipe: RecetteComplete) => void;
}

const getRecettesForSurface = (surfaceId: number): RecetteComplete[] => {
  const recipeIds = RECETTES_PAR_SURFACE[surfaceId] || [];
  return recipeIds.map((id) => RECETTES.find((r) => r.id === id)).filter(Boolean) as RecetteComplete[];
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

  const ingredients = recettes.length > 0
    ? getIngredientsFromRecettes(recettes)
    : INGREDIENTS_RECOMMANDES[surface.piece] || INGREDIENTS_RECOMMANDES['Cuisine'];

  const renderEfficacite = (note: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-3 h-3 ${star <= note ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );

  const headerGradient = darkMode
    ? 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)'
    : 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)';

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      headerGradient={headerGradient}
      headerContent={
        <div className="flex items-center gap-4">
          <span className="text-5xl">{surface.emoji}</span>
          <div>
            <h2 className="font-display text-xl font-extrabold text-white">{surface.nom}</h2>
            <p className="text-white/80 text-sm">{surface.piece}</p>
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
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]" style={{ color: theme.textMuted }}>Efficacité :</span>
                    {renderEfficacite(recette.efficacite)}
                  </div>
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
