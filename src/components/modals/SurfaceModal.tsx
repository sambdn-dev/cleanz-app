'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Surface, RecetteComplete } from '@/types';
import { Clock, FolderOpen, Sparkles, ChevronRight, Star } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { RECETTES, RECETTES_PAR_SURFACE } from '@/data/recettes';

interface SurfaceModalProps {
  surface: Surface;
  onClose: () => void;
  onRecipeClick?: (recipe: RecetteComplete) => void;
}

// Fonction helper pour obtenir les recettes d'une surface
const getRecettesForSurface = (surfaceId: number): RecetteComplete[] => {
  const recipeIds = RECETTES_PAR_SURFACE[surfaceId] || [];
  return recipeIds.map(id => RECETTES.find(r => r.id === id)).filter(Boolean) as RecetteComplete[];
};

// Ingrédients recommandés par catégorie
const INGREDIENTS_RECOMMANDES: Record<string, { nom: string; emoji: string }[]> = {
  'Cuisine': [
    { nom: 'Bicarbonate', emoji: '⚪' },
    { nom: 'Vinaigre blanc', emoji: '🧴' },
    { nom: 'Savon noir', emoji: '⚫' },
    { nom: 'Cristaux de soude', emoji: '💎' }
  ],
  'Salle de bain': [
    { nom: 'Acide citrique', emoji: '🍋' },
    { nom: 'Vinaigre blanc', emoji: '🧴' },
    { nom: 'Bicarbonate', emoji: '⚪' },
    { nom: 'Percarbonate', emoji: '✨' }
  ],
  'Chambre': [
    { nom: 'Bicarbonate', emoji: '⚪' },
    { nom: 'Savon de Marseille', emoji: '🧼' },
    { nom: 'Percarbonate', emoji: '✨' }
  ],
  'Salon': [
    { nom: 'Vinaigre blanc', emoji: '🧴' },
    { nom: 'Bicarbonate', emoji: '⚪' },
    { nom: 'Savon noir', emoji: '⚫' }
  ],
  'Buanderie': [
    { nom: 'Percarbonate', emoji: '✨' },
    { nom: 'Vinaigre blanc', emoji: '🧴' },
    { nom: 'Savon de Marseille', emoji: '🧼' }
  ],
  'Électronique': [
    { nom: 'Vinaigre blanc', emoji: '🧴' },
    { nom: 'Alcool ménager', emoji: '🔬' }
  ],
  'Véhicule': [
    { nom: 'Savon noir', emoji: '⚫' },
    { nom: 'Vinaigre blanc', emoji: '🧴' },
    { nom: 'Bicarbonate', emoji: '⚪' }
  ],
  'Extérieur': [
    { nom: 'Savon noir', emoji: '⚫' },
    { nom: 'Bicarbonate', emoji: '⚪' },
    { nom: 'Cristaux de soude', emoji: '💎' }
  ],
  'Corps': [
    { nom: 'Savon de Marseille', emoji: '🧼' },
    { nom: 'Bicarbonate', emoji: '⚪' }
  ]
};

export const SurfaceModal = ({ surface, onClose, onRecipeClick }: SurfaceModalProps) => {
  const { theme, darkMode } = useTheme();
  const recettes = getRecettesForSurface(surface.id);
  const ingredients = INGREDIENTS_RECOMMANDES[surface.piece] || INGREDIENTS_RECOMMANDES['Cuisine'];

  // Rendu des étoiles d'efficacité
  const renderEfficacite = (note: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${star <= note ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

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
            <h2 className="text-2xl font-bold text-white">{surface.nom}</h2>
            <p className="text-white/80 text-sm">{surface.piece}</p>
          </div>
        </div>
      }
    >
      {/* Info cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div
          className="p-4 rounded-2xl"
          style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-pink-500" />
            <span className="text-xs font-semibold" style={{ color: theme.textMuted }}>Fréquence</span>
          </div>
          <span className="text-sm font-bold" style={{ color: theme.textPrimary }}>{surface.frequence}</span>
        </div>
        <div
          className="p-4 rounded-2xl"
          style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <FolderOpen className="w-4 h-4 text-cyan-500" />
            <span className="text-xs font-semibold" style={{ color: theme.textMuted }}>Catégorie</span>
          </div>
          <span className="text-sm font-bold" style={{ color: theme.textPrimary }}>{surface.categorie}</span>
        </div>
      </div>

      {/* Recettes maison */}
      {recettes.length > 0 ? (
        <div className="mb-5">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
            <span className="text-base">🧪</span> Recettes maison
          </h3>
          <div className="space-y-3">
            {recettes.map((recette) => (
              <div
                key={recette.id}
                onClick={() => onRecipeClick?.(recette)}
                className={`p-4 rounded-2xl transition-all duration-200 ${onRecipeClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''}`}
                style={{
                  background: darkMode
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)'
                    : 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{recette.emoji}</span>
                    <h4 className="font-bold text-sm" style={{ color: theme.textPrimary }}>{recette.nom}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/50 font-medium" style={{ color: theme.textSecondary }}>
                      {recette.temps}
                    </span>
                    {onRecipeClick && (
                      <ChevronRight className="w-4 h-4" style={{ color: theme.textMuted }} />
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {recette.ingredients.slice(0, 4).map((ing, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        color: theme.textSecondary
                      }}
                    >
                      {ing.nom}
                    </span>
                  ))}
                  {recette.ingredients.length > 4 && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        color: theme.textSecondary
                      }}
                    >
                      +{recette.ingredients.length - 4}
                    </span>
                  )}
                </div>
                <p className="text-xs line-clamp-2" style={{ color: theme.textMuted }}>
                  {recette.instructions[0]}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]" style={{ color: theme.textMuted }}>Efficacité:</span>
                    {renderEfficacite(recette.efficacite)}
                  </div>
                  {onRecipeClick && (
                    <span className="text-[10px] font-medium" style={{ color: theme.accentPink }}>
                      Voir détails
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-5">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
            <span className="text-base">🧪</span> Recettes maison
          </h3>
          <div
            className="p-4 rounded-2xl text-center"
            style={{
              background: darkMode
                ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
              border: `1px dashed ${darkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)'}`
            }}
          >
            <span className="text-3xl mb-2 block">🌱</span>
            <p className="text-sm font-medium mb-1" style={{ color: theme.textPrimary }}>
              Recettes en préparation
            </p>
            <p className="text-xs" style={{ color: theme.textMuted }}>
              L'équipe Cleanz ajoute de nouvelles recettes naturelles régulièrement. De nouvelles recettes pour cette surface arrivent très bientôt !
            </p>
          </div>
        </div>
      )}

      {/* Ingrédients recommandés */}
      <div>
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
          <Sparkles className="w-4 h-4 text-amber-500" /> Ingrédients recommandés
        </h3>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ing, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
              }}
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
