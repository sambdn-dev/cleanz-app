'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { IngredientComplet, RecetteComplete } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { SectionTitle, Chip, Callout, MetaBar, ACCENT } from '@/components/ui/ModalParts';
import { RECETTES } from '@/data/recettes';
import { shouldUseDarkText } from '@/utils/gradientUtils';
import { Leaf, Euro, AlertTriangle, ChevronRight, ChevronDown } from 'lucide-react';

interface IngredientDetailModalProps {
  ingredient: IngredientComplet;
  onClose: () => void;
  onRecipeClick?: (recipe: RecetteComplete) => void;
}

export function IngredientDetailModal({ ingredient, onClose, onRecipeClick }: IngredientDetailModalProps) {
  const { theme, darkMode } = useTheme();
  const [showAllRecipes, setShowAllRecipes] = useState(false);

  const useDarkHeaderText = shouldUseDarkText(ingredient.gradient);
  const hasImage = !!ingredient.imageUrl;
  const recettesAssociees = RECETTES.filter((r) => ingredient.recettesIds.includes(r.id));

  const ecoLeaves = (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((leaf) => (
        <Leaf key={leaf} className={`w-3.5 h-3.5 ${leaf <= ingredient.scoreEcologique ? 'fill-current' : ''}`} style={{ color: leaf <= ingredient.scoreEcologique ? ACCENT.sage : 'rgba(120,113,108,0.3)' }} />
      ))}
    </span>
  );

  const prixEuros = (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3].map((euro) => (
        <Euro key={euro} className="w-3.5 h-3.5" style={{ color: euro <= ingredient.prix.length ? ACCENT.clay : 'rgba(120,113,108,0.3)' }} />
      ))}
    </span>
  );

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      headerGradient={ingredient.gradient}
      headerImageUrl={ingredient.imageUrl}
      useDarkHeaderText={useDarkHeaderText}
      headerContent={
        hasImage ? (
          <div className="flex flex-col justify-end" style={{ minHeight: 130 }}>
            <h2 className="font-display text-2xl font-extrabold text-white" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
              <span className="mr-2">{ingredient.emoji}</span>{ingredient.nom}
            </h2>
            {ingredient.badge && (
              <span
                className="inline-block mt-1.5 self-start px-3 py-1 rounded-full text-sm font-semibold text-white"
                style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
              >
                {ingredient.badge}
              </span>
            )}
          </div>
        ) : (
          <div className="text-center" style={{ color: useDarkHeaderText ? '#1F2937' : '#FFFFFF' }}>
            <div className="text-5xl mb-3">{ingredient.emoji}</div>
            <h2 className="font-display text-xl font-extrabold mb-1">{ingredient.nom}</h2>
            {ingredient.badge && (
              <span
                className="inline-block px-3 py-1 rounded-full text-sm"
                style={{
                  background: useDarkHeaderText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)',
                  color: useDarkHeaderText ? '#374151' : '#FFFFFF',
                }}
              >
                {ingredient.badge}
              </span>
            )}
          </div>
        )
      }
    >
      {/* Description */}
      <p className="text-[15px] leading-[1.65] mb-5" style={{ color: theme.textSecondary }}>
        {ingredient.description}
      </p>

      {/* Meta inline */}
      <MetaBar
        items={[
          { label: 'Prix', value: prixEuros },
          { label: 'Score éco', value: ecoLeaves },
          { label: 'Conservation', value: <span className="text-xs">{ingredient.conservation.split(' ').slice(0, 2).join(' ')}</span> },
        ]}
      />

      {/* Fonctionnalités */}
      <div className="mb-6">
        <SectionTitle accent={ACCENT.amber}>Fonctionnalités</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {ingredient.fonctions.map((fonction, index) => (
            <Chip key={index} tone="neutral">{fonction}</Chip>
          ))}
        </div>
      </div>

      {/* Bienfaits */}
      <div className="mb-6">
        <SectionTitle accent={ACCENT.sage}>Bienfaits</SectionTitle>
        <div className="space-y-2">
          {ingredient.bienfaits.map((bienfait, index) => (
            <div key={index} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: ACCENT.sage }} />
              <span className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{bienfait}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Surfaces compatibles */}
      <div className="mb-6">
        <SectionTitle accent={ACCENT.sage}>Surfaces compatibles</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {ingredient.surfaces.map((surface, index) => (
            <Chip key={index} tone="sage">{surface}</Chip>
          ))}
        </div>
      </div>

      {/* Recettes associées */}
      {recettesAssociees.length > 0 && (
        <div className="mb-6">
          <SectionTitle accent={ACCENT.brand}>
            Recettes populaires
            <span className="ml-1 text-xs font-medium" style={{ color: theme.textMuted }}>
              · {recettesAssociees.length}
            </span>
          </SectionTitle>
          <div className="space-y-2">
            {(showAllRecipes ? recettesAssociees : recettesAssociees.slice(0, 5)).map((recette) => (
              <div
                key={recette.id}
                onClick={() => onRecipeClick?.(recette)}
                className="flex items-center gap-3 py-2.5 border-b last:border-0 cursor-pointer transition-opacity hover:opacity-70 active:opacity-50"
                style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: recette.gradient }}>
                  <span className="text-lg">{recette.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate" style={{ color: theme.textPrimary }}>{recette.nom}</h4>
                  <p className="text-[11px]" style={{ color: theme.textMuted }}>{recette.temps} · {recette.difficulte}</p>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: theme.textMuted }} />
              </div>
            ))}
            {recettesAssociees.length > 5 && !showAllRecipes && (
              <button
                onClick={() => setShowAllRecipes(true)}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-opacity hover:opacity-70"
                style={{ color: ACCENT.brand }}
              >
                <span>Voir les {recettesAssociees.length - 5} autres recettes</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Précautions */}
      <div className="mb-6">
        <Callout accent={ACCENT.clay} icon={<AlertTriangle className="w-4 h-4" style={{ color: ACCENT.clay }} />} title="Précautions">
          {ingredient.precautions.map((precaution, index) => (
            <div key={index} className="flex items-baseline gap-2">
              <span className="text-sm leading-none" style={{ color: ACCENT.clay }}>•</span>
              <span className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{precaution}</span>
            </div>
          ))}
        </Callout>
      </div>

      {/* Origine naturelle */}
      <Callout accent={ACCENT.sage} icon={<Leaf className="w-4 h-4" style={{ color: ACCENT.sage }} />} title="Origine naturelle">
        <span className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{ingredient.origineNaturelle}</span>
      </Callout>
    </Modal>
  );
}
