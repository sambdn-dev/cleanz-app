'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Ingredient } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { SectionTitle, Chip, Callout, MetaBar, ACCENT } from '@/components/ui/ModalParts';
import { shouldUseDarkText } from '@/utils/gradientUtils';

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
  10: ['Tapis', 'Canapé', 'Matelas', 'Vêtements', 'Cuir'], // Terre de Sommières
};

// Score écologique par ingrédient (1-5)
const ECO_SCORES: Record<number, number> = {
  1: 5, 2: 5, 3: 5, 4: 5, 5: 4, 6: 5, 7: 4, 8: 4, 9: 3, 10: 5,
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
  10: "Laissez agir plusieurs heures pour les taches grasses.",
};

export const IngredientModal = ({ ingredient, onClose }: IngredientModalProps) => {
  const { theme } = useTheme();
  const surfaces = SURFACES_PAR_INGREDIENT[ingredient.id] || [];
  const ecoScore = ECO_SCORES[ingredient.id] || 4;
  const astuce = ASTUCES[ingredient.id] || "Conservez à l'abri de l'humidité.";

  const gradients: Record<number, string> = {
    1: 'linear-gradient(135deg, #F472B6 0%, #FB7185 100%)',
    2: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
    3: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
    4: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    5: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
    6: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
    7: 'linear-gradient(135deg, #E5E7EB 0%, #9CA3AF 100%)',
    8: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
    9: 'linear-gradient(135deg, #F472B6 0%, #EC4899 100%)',
    10: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
  };

  const headerGradient = gradients[ingredient.id] || gradients[1];
  const useDarkHeaderText = shouldUseDarkText(headerGradient);

  const ecoDots = (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="text-base leading-none" style={{ color: i <= ecoScore ? ACCENT.sage : 'rgba(120,113,108,0.3)' }}>●</span>
      ))}
    </span>
  );

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      headerGradient={headerGradient}
      useDarkHeaderText={useDarkHeaderText}
      headerContent={
        <>
          {ingredient.essentiel && (
            <span
              className="inline-block text-xs px-3 py-1 rounded-full font-semibold mb-3"
              style={{
                background: useDarkHeaderText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.3)',
                color: useDarkHeaderText ? '#374151' : '#FFFFFF',
              }}
            >
              Essentiel
            </span>
          )}
          <div className="flex items-center gap-4">
            <span className="text-5xl">{ingredient.emoji}</span>
            <h2 className="font-display text-xl font-extrabold" style={{ color: useDarkHeaderText ? '#1F2937' : '#FFFFFF' }}>
              {ingredient.nom}
            </h2>
          </div>
        </>
      }
    >
      {/* Description */}
      <p className="text-[15px] leading-[1.65] mb-5" style={{ color: theme.textSecondary }}>
        {ingredient.description}
      </p>

      {/* Meta inline */}
      <MetaBar
        items={[
          { label: 'Prix moyen', value: ingredient.prix },
          { label: 'Score éco', value: ecoDots },
        ]}
      />

      {/* Pouvoirs */}
      <div className="mb-6">
        <SectionTitle accent={ACCENT.amber}>Pouvoirs</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {ingredient.fonctions.map((fonction, index) => (
            <Chip key={index} tone="neutral">{fonction}</Chip>
          ))}
        </div>
      </div>

      {/* Surfaces compatibles */}
      {surfaces.length > 0 && (
        <div className="mb-6">
          <SectionTitle accent={ACCENT.sage}>Surfaces compatibles</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {surfaces.map((surface, index) => (
              <Chip key={index} tone="sage">{surface}</Chip>
            ))}
          </div>
        </div>
      )}

      {/* Astuce */}
      <Callout accent={ACCENT.sage} icon={<span className="text-base leading-none">💡</span>} title="Astuce">
        <span className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{astuce}</span>
      </Callout>
    </Modal>
  );
};
