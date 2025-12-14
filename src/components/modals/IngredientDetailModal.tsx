'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { IngredientComplet, RecetteComplete } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { RECETTES } from '@/data/recettes';
import { shouldUseDarkText } from '@/utils/gradientUtils';
import {
  Leaf,
  Euro,
  Clock,
  AlertTriangle,
  Sparkles,
  FlaskConical,
  ChefHat,
  Home,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface IngredientDetailModalProps {
  ingredient: IngredientComplet;
  onClose: () => void;
  onRecipeClick?: (recipe: RecetteComplete) => void;
}

export function IngredientDetailModal({ ingredient, onClose, onRecipeClick }: IngredientDetailModalProps) {
  const { theme, darkMode } = useTheme();
  const [showAllRecipes, setShowAllRecipes] = useState(false);

  // Détermine si le texte du header doit être sombre (pour les gradients clairs)
  const useDarkHeaderText = shouldUseDarkText(ingredient.gradient);

  // Récupérer les recettes associées
  const recettesAssociees = RECETTES.filter(r => ingredient.recettesIds.includes(r.id));

  // Rendu du score écologique
  const renderEcoScore = (score: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((leaf) => (
          <Leaf
            key={leaf}
            className={`w-4 h-4 ${leaf <= score ? 'text-green-500 fill-green-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  // Rendu du prix
  const renderPrix = (prix: string) => {
    const count = prix.length;
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3].map((euro) => (
          <Euro
            key={euro}
            className={`w-4 h-4 ${euro <= count ? 'text-amber-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const headerContent = (
    <div className="text-center" style={{ color: useDarkHeaderText ? '#1F2937' : '#FFFFFF' }}>
      <div className="text-5xl mb-3">{ingredient.emoji}</div>
      <h2 className="text-2xl font-bold mb-1">{ingredient.nom}</h2>
      {ingredient.badge && (
        <span
          className="inline-block px-3 py-1 rounded-full text-sm"
          style={{
            background: useDarkHeaderText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)',
            color: useDarkHeaderText ? '#374151' : '#FFFFFF'
          }}
        >
          {ingredient.badge}
        </span>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      headerGradient={ingredient.gradient}
      useDarkHeaderText={useDarkHeaderText}
      headerContent={headerContent}
    >
      <div className="space-y-5">
        {/* Description */}
        <div>
          <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
            {ingredient.description}
          </p>
        </div>

        {/* Infos rapides */}
        <div className="grid grid-cols-3 gap-3">
          {/* Prix */}
          <div
            className="p-3 rounded-xl text-center"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
            }}
          >
            <Euro className="w-5 h-5 mx-auto mb-1" style={{ color: theme.accentPink }} />
            <div className="text-[10px] mb-1" style={{ color: theme.textMuted }}>Prix</div>
            {renderPrix(ingredient.prix)}
            <div className="text-[9px] mt-1" style={{ color: theme.textMuted }}>
              {ingredient.prixMoyen}
            </div>
          </div>

          {/* Score écologique */}
          <div
            className="p-3 rounded-xl text-center"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
            }}
          >
            <Leaf className="w-5 h-5 mx-auto mb-1" style={{ color: '#22C55E' }} />
            <div className="text-[10px] mb-1" style={{ color: theme.textMuted }}>Score éco</div>
            {renderEcoScore(ingredient.scoreEcologique)}
            <div className="text-[9px] mt-1" style={{ color: theme.textMuted }}>
              {ingredient.scoreEcologique}/5
            </div>
          </div>

          {/* Conservation */}
          <div
            className="p-3 rounded-xl text-center"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
            }}
          >
            <Clock className="w-5 h-5 mx-auto mb-1" style={{ color: theme.accentCyan }} />
            <div className="text-[10px] mb-1" style={{ color: theme.textMuted }}>Conservation</div>
            <div className="text-[10px] font-medium" style={{ color: theme.textPrimary }}>
              {ingredient.conservation.split(' ').slice(0, 2).join(' ')}
            </div>
          </div>
        </div>

        {/* Fonctionnalités */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical className="w-5 h-5" style={{ color: theme.accentPink }} />
            <h3 className="font-bold text-sm" style={{ color: theme.textPrimary }}>
              Fonctionnalités
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {ingredient.fonctions.map((fonction, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: darkMode
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)'
                    : 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                  color: darkMode ? '#E9D5FF' : '#7C3AED'
                }}
              >
                {fonction}
              </span>
            ))}
          </div>
        </div>

        {/* Bienfaits */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <h3 className="font-bold text-sm" style={{ color: theme.textPrimary }}>
              Bienfaits
            </h3>
          </div>
          <div className="space-y-2">
            {ingredient.bienfaits.map((bienfait, index) => (
              <div key={index} className="flex items-start gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #22C55E, #10B981)' }}
                />
                <span className="text-xs" style={{ color: theme.textSecondary }}>
                  {bienfait}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Surfaces compatibles */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Home className="w-5 h-5" style={{ color: theme.accentCyan }} />
            <h3 className="font-bold text-sm" style={{ color: theme.textPrimary }}>
              Surfaces compatibles
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {ingredient.surfaces.map((surface, index) => (
              <span
                key={index}
                className="px-2.5 py-1 rounded-lg text-[10px]"
                style={{
                  background: darkMode ? 'rgba(79, 209, 197, 0.15)' : 'rgba(79, 209, 197, 0.1)',
                  color: darkMode ? '#5EEAD4' : '#0D9488'
                }}
              >
                {surface}
              </span>
            ))}
          </div>
        </div>

        {/* Astuces populaires */}
        {recettesAssociees.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ChefHat className="w-5 h-5" style={{ color: theme.accentPink }} />
              <h3 className="font-bold text-sm" style={{ color: theme.textPrimary }}>
                Astuces populaires
              </h3>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  background: darkMode ? 'rgba(236, 72, 153, 0.2)' : 'rgba(236, 72, 153, 0.1)',
                  color: darkMode ? '#F9A8D4' : '#DB2777'
                }}
              >
                {recettesAssociees.length} astuce{recettesAssociees.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="space-y-2">
              {(showAllRecipes ? recettesAssociees : recettesAssociees.slice(0, 5)).map((recette) => (
                <div
                  key={recette.id}
                  onClick={() => onRecipeClick?.(recette)}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: recette.gradient }}
                  >
                    <span className="text-lg">{recette.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-xs truncate" style={{ color: theme.textPrimary }}>
                      {recette.nom}
                    </h4>
                    <p className="text-[10px]" style={{ color: theme.textMuted }}>
                      {recette.temps} - {recette.difficulte}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: theme.textMuted }} />
                </div>
              ))}
              {recettesAssociees.length > 5 && !showAllRecipes && (
                <button
                  onClick={() => setShowAllRecipes(true)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80"
                  style={{
                    background: darkMode ? 'rgba(236, 72, 153, 0.15)' : 'rgba(236, 72, 153, 0.1)',
                    color: darkMode ? '#F9A8D4' : '#DB2777'
                  }}
                >
                  <span>Voir les autres astuces</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Précautions */}
        <div
          className="p-4 rounded-xl"
          style={{
            background: darkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.08)'
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-xs text-amber-600">Précautions</h3>
          </div>
          <ul className="space-y-1.5">
            {ingredient.precautions.map((precaution, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-amber-500 text-xs">!</span>
                <span className="text-[11px] text-amber-700">{precaution}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Origine naturelle */}
        <div
          className="p-4 rounded-xl text-center"
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)'
          }}
        >
          <Leaf className="w-6 h-6 mx-auto mb-2 text-green-500" />
          <h4 className="text-xs font-medium mb-1" style={{ color: theme.textPrimary }}>
            Origine naturelle
          </h4>
          <p className="text-[11px]" style={{ color: theme.textSecondary }}>
            {ingredient.origineNaturelle}
          </p>
        </div>
      </div>
    </Modal>
  );
}
