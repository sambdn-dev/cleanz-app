'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Ingredient } from '@/types';
import { Leaf, Euro, Sparkles } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

interface IngredientModalProps {
  ingredient: Ingredient;
  onClose: () => void;
}

// Surfaces compatibles par ingrédient
const SURFACES_PAR_INGREDIENT: Record<number, string[]> = {
  1: ['Four', 'Plaques', 'Évier', 'Tapis', 'Canapé', 'Frigo', 'Matelas'], // Bicarbonate
  2: ['Vitres', 'Robinetterie', 'WC', 'Lave-linge', 'Carrelage', 'Miroirs'], // Vinaigre
  3: ['Bouilloire', 'Cafetière', 'Robinetterie', 'WC', 'Pommeau'], // Acide citrique
  4: ['Sols', 'Plans de travail', 'Hotte', 'BBQ', 'Terrasse', 'Carrosserie'], // Savon noir
  5: ['Linge blanc', 'Rideaux', 'Joints', 'Terrasse', 'Plastique jauni'], // Percarbonate
  6: ['Vêtements', 'Mains', 'Pinceaux', 'Cuir', 'Tapis'], // Savon de Marseille
  7: ['Inox', 'Céramique', 'Vitrocéramique', 'Évier', 'Baignoire'], // Pierre blanche
  8: ['Four', 'Hotte', 'Friteuse', 'Canalisations', 'Poubelles'], // Cristaux de soude
  9: ['Vitres', 'Miroirs', 'Écrans', 'Surfaces brillantes'], // Alcool ménager
  10: ['Tapis', 'Canapé', 'Matelas', 'Vêtements', 'Cuir'] // Terre de Sommières
};

// Score écologique par ingrédient (1-5)
const ECO_SCORES: Record<number, number> = {
  1: 5, // Bicarbonate - excellent
  2: 5, // Vinaigre - excellent
  3: 5, // Acide citrique - excellent
  4: 5, // Savon noir - excellent
  5: 4, // Percarbonate - très bien
  6: 5, // Savon de Marseille - excellent
  7: 4, // Pierre blanche - très bien
  8: 4, // Cristaux de soude - très bien
  9: 3, // Alcool ménager - bien
  10: 5 // Terre de Sommières - excellent
};

// Astuces par ingrédient
const ASTUCES: Record<number, string> = {
  1: "Ne jamais mélanger avec le vinaigre sur l'aluminium !",
  2: "Chauffez-le légèrement pour plus d'efficacité sur le calcaire.",
  3: "Plus efficace que le vinaigre sur le calcaire incrusté.",
  4: "Vérifiez qu'il est à base d'huile d'olive ou de lin.",
  5: "Actif uniquement dans l'eau à 40°C minimum.",
  6: "Choisissez-le sans huile de palme et avec 72% d'huile.",
  7: "Testez toujours sur une zone cachée d'abord.",
  8: "Portez des gants, plus caustique que le bicarbonate.",
  9: "Parfait pour les surfaces qui craignent l'eau.",
  10: "Laissez agir plusieurs heures pour les taches grasses."
};

export const IngredientModal = ({ ingredient, onClose }: IngredientModalProps) => {
  const { theme, darkMode } = useTheme();
  const surfaces = SURFACES_PAR_INGREDIENT[ingredient.id] || [];
  const ecoScore = ECO_SCORES[ingredient.id] || 4;
  const astuce = ASTUCES[ingredient.id] || "Conservez à l'abri de l'humidité.";

  // Gradient colors based on ingredient
  const gradients: Record<number, string> = {
    1: 'linear-gradient(135deg, #F472B6 0%, #FB7185 100%)', // Rose
    2: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)', // Vert
    3: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)', // Jaune
    4: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', // Violet
    5: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)', // Bleu
    6: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)', // Lavande
    7: 'linear-gradient(135deg, #E5E7EB 0%, #9CA3AF 100%)', // Gris
    8: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)', // Teal
    9: 'linear-gradient(135deg, #F472B6 0%, #EC4899 100%)', // Pink
    10: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' // Amber
  };

  const headerGradient = gradients[ingredient.id] || gradients[1];

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      headerGradient={headerGradient}
      headerContent={
        <>
          {ingredient.essentiel && (
            <span className="inline-block text-xs bg-white/30 text-white px-3 py-1 rounded-full font-semibold mb-3">
              Essentiel
            </span>
          )}
          <div className="flex items-center gap-4">
            <span className="text-5xl">{ingredient.emoji}</span>
            <h2 className="text-2xl font-bold text-white">{ingredient.nom}</h2>
          </div>
        </>
      }
    >
      {/* Description */}
      <div className="mb-5">
        <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
          {ingredient.description}
        </p>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Price */}
        <div
          className="p-4 rounded-2xl"
          style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Euro className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-semibold" style={{ color: theme.textMuted }}>Prix moyen</span>
          </div>
          <span className="text-sm font-bold" style={{ color: theme.textPrimary }}>{ingredient.prix}</span>
        </div>

        {/* Eco Score */}
        <div
          className="p-4 rounded-2xl"
          style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="w-4 h-4 text-green-500" />
            <span className="text-xs font-semibold" style={{ color: theme.textMuted }}>Score éco</span>
          </div>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={`text-sm ${i <= ecoScore ? 'text-green-500' : 'text-gray-300'}`}
              >
                ●
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pouvoirs / Functions */}
      <div className="mb-5">
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
          <Sparkles className="w-4 h-4 text-amber-500" /> Pouvoirs
        </h3>
        <div className="flex flex-wrap gap-2">
          {ingredient.fonctions.map((fonction, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{
                background: darkMode
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)'
                  : 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
                color: darkMode ? '#A78BFA' : '#7C3AED'
              }}
            >
              {fonction}
            </span>
          ))}
        </div>
      </div>

      {/* Surfaces compatibles */}
      {surfaces.length > 0 && (
        <div className="mb-5">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
            <span className="text-base">✅</span> Surfaces compatibles
          </h3>
          <div className="flex flex-wrap gap-2">
            {surfaces.map((surface, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1.5 rounded-full font-medium"
                style={{
                  background: darkMode ? 'rgba(79, 209, 197, 0.2)' : 'rgba(79, 209, 197, 0.15)',
                  color: '#4FD1C5'
                }}
              >
                {surface}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Astuce */}
      <div
        className="p-4 rounded-2xl"
        style={{
          background: darkMode ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.08)'
        }}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div>
            <span className="text-xs font-bold block mb-1" style={{ color: theme.textPrimary }}>Astuce</span>
            <span className="text-xs" style={{ color: theme.textSecondary }}>
              {astuce}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
