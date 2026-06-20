'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRecipeInteractionsContext } from '@/contexts/RecipeInteractionsContext';
import { RecetteComplete } from '@/types';
import { Star, AlertTriangle, Archive, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { SectionTitle, Steps, Chip, Callout, MetaBar, ACCENT } from '@/components/ui/ModalParts';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { shouldUseDarkText } from '@/utils/gradientUtils';
import { haptic } from '@/utils/haptics';

interface RecipeModalProps {
  recipe: RecetteComplete;
  onClose: () => void;
}

export const RecipeModal = ({ recipe, onClose }: RecipeModalProps) => {
  const { theme, darkMode } = useTheme();
  const { isFavorite, toggleFavorite, getRating, setRating } = useRecipeInteractionsContext();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');

  const hasImage = !!recipe.imageUrl;
  const useDarkHeaderText = !hasImage && shouldUseDarkText(recipe.gradient);

  const favorite = isFavorite(recipe.id);
  const userRating = getRating(recipe.id);

  const difficultyColor =
    recipe.difficulte === 'Facile' ? (darkMode ? '#86C99A' : '#3F8F5B')
    : recipe.difficulte === 'Moyen' ? (darkMode ? '#E0B088' : '#B97A33')
    : (darkMode ? '#E69191' : '#C2585B');

  const handleRatingClick = (rating: number) => {
    haptic('selection');
    setRating(recipe.id, rating);
  };

  const generateSlug = (name: string): string =>
    name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleShare = async () => {
    haptic('light');
    const shareUrl = `${window.location.origin}/?recette=${generateSlug(recipe.nom)}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: recipe.nom, text: `Découvre cette recette de nettoyage naturel : ${recipe.nom}`, url: shareUrl });
      } catch {
        /* annulé */
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  const renderEfficacite = (note: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-3.5 h-3.5 ${star <= note ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      headerGradient={recipe.gradient}
      headerImageUrl={recipe.imageUrl}
      headerImageUrlDark={recipe.imageUrlDark}
      useDarkHeaderText={useDarkHeaderText}
      headerContent={
        <div
          className={hasImage ? 'flex flex-col justify-end' : 'flex items-center gap-4'}
          style={hasImage ? { minHeight: 140 } : undefined}
        >
          {!hasImage && <span className="text-5xl">{recipe.emoji}</span>}
          <div className="flex-1">
            <h2
              className="font-display text-xl font-extrabold leading-tight line-clamp-3"
              style={{
                color: hasImage ? '#FFFFFF' : (useDarkHeaderText ? '#1F2937' : '#FFFFFF'),
                textShadow: hasImage ? '0 2px 14px rgba(0,0,0,0.55)' : undefined,
              }}
            >
              {hasImage && <span className="mr-2">{recipe.emoji}</span>}
              {recipe.nom}
            </h2>
            {recipe.badge && (
              <span
                className="inline-block mt-2 text-xs px-2.5 py-0.5 rounded-full font-medium"
                style={{
                  background: hasImage ? 'rgba(255,255,255,0.92)' : (useDarkHeaderText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)'),
                  color: hasImage ? '#2D1F3D' : (useDarkHeaderText ? '#374151' : '#FFFFFF'),
                }}
              >
                {recipe.badge}
              </span>
            )}
          </div>
        </div>
      }
    >
      {/* Meta inline (un seul bloc, plus de grille de 3 cartes) */}
      <MetaBar
        items={[
          { label: 'Temps', value: recipe.temps },
          { label: 'Difficulté', value: recipe.difficulte, color: difficultyColor },
          { label: 'Efficacité', value: renderEfficacite(recipe.efficacite) },
        ]}
      />

      {/* Ingrédients & dosages */}
      <div className="mb-6">
        <SectionTitle accent={ACCENT.sage}>Ingrédients &amp; dosages</SectionTitle>
        <div className="space-y-0">
          {recipe.ingredients.map((ing, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2.5 border-b last:border-0"
              style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{ing.emoji || '•'}</span>
                <span className="text-[15px]" style={{ color: theme.textPrimary }}>{ing.nom}</span>
              </div>
              <span className="text-sm font-semibold tabular-nums" style={{ color: theme.textSecondary }}>
                {ing.quantite}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Matériel nécessaire */}
      {recipe.materiel && recipe.materiel.length > 0 && (
        <div className="mb-6">
          <SectionTitle accent={ACCENT.neutral}>Matériel</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {recipe.materiel.map((item, index) => (
              <Chip key={index} tone="neutral">{item}</Chip>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mb-6">
        <SectionTitle accent={ACCENT.brand}>Préparation</SectionTitle>
        <Steps items={recipe.instructions} />
      </div>

      {/* Surfaces compatibles */}
      <div className="mb-6">
        <SectionTitle accent={ACCENT.sage}>Surfaces compatibles</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {recipe.surfaces.map((surface, index) => (
            <Chip key={index} tone="sage">{surface}</Chip>
          ))}
        </div>
      </div>

      {/* Précautions */}
      {recipe.precautions.length > 0 && (
        <div className="mb-6">
          <Callout accent={ACCENT.clay} icon={<AlertTriangle className="w-4 h-4" style={{ color: ACCENT.clay }} />} title="Précautions">
            {recipe.precautions.map((precaution, index) => (
              <div key={index} className="flex items-baseline gap-2">
                <span className="text-sm leading-none" style={{ color: ACCENT.clay }}>•</span>
                <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{precaution}</p>
              </div>
            ))}
          </Callout>
        </div>
      )}

      {/* Astuces */}
      {recipe.astuces.length > 0 && (
        <div className="mb-6">
          <Callout accent={ACCENT.sage} icon={<span className="text-base leading-none">💡</span>} title="Le geste en plus">
            {recipe.astuces.map((astuce, index) => (
              <div key={index} className="flex items-baseline gap-2">
                <span className="text-sm leading-none" style={{ color: ACCENT.sage }}>•</span>
                <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{astuce}</p>
              </div>
            ))}
          </Callout>
        </div>
      )}

      {/* Conservation */}
      <div
        className="flex items-center gap-3 mb-6 py-3 border-y"
        style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
      >
        <Archive className="w-4 h-4 flex-shrink-0" style={{ color: ACCENT.blue }} />
        <span className="text-xs" style={{ color: theme.textMuted }}>Se conserve</span>
        <span className="text-sm font-medium ml-auto" style={{ color: theme.textPrimary }}>{recipe.conservation}</span>
      </div>

      {/* Actions : favori, note, partage */}
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => { haptic('light'); toggleFavorite(recipe.id); }}
            aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all active:scale-95"
            style={{ background: favorite ? 'rgba(236,72,153,0.12)' : (darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)') }}
          >
            <Heart className="w-5 h-5" style={{ color: favorite ? '#EC4899' : theme.textMuted, fill: favorite ? '#EC4899' : 'transparent' }} />
            <span className="text-xs font-medium" style={{ color: favorite ? '#EC4899' : theme.textMuted }}>
              {favorite ? 'Favori' : 'Ajouter'}
            </span>
          </button>

          <div className="flex items-center gap-1" role="group" aria-label="Noter la recette">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => handleRatingClick(star)} aria-label={`${star} étoile${star > 1 ? 's' : ''}`} className="transition-transform active:scale-90">
                <Star className={`w-5 h-5 ${userRating && star <= userRating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
              </button>
            ))}
          </div>

          <button
            onClick={handleShare}
            aria-label="Partager"
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all active:scale-95"
            style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}
          >
            <Share2 className="w-4 h-4" style={{ color: theme.textMuted }} />
            <span className="text-xs font-medium" style={{ color: theme.textMuted }}>Partager</span>
          </button>
        </div>

        {/* Commentaire (à venir) */}
        <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}` }}>
          {!showCommentInput ? (
            <button onClick={() => setShowCommentInput(true)} className="flex items-center gap-2 text-xs" style={{ color: theme.textMuted }}>
              <MessageCircle className="w-4 h-4" />
              <span>Ajouter un commentaire…</span>
            </button>
          ) : (
            <div className="space-y-2">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Partagez votre expérience avec cette recette…"
                className="w-full p-3 rounded-xl text-sm resize-none outline-none"
                style={{
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                  color: theme.textPrimary,
                  border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                }}
                rows={3}
              />
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowCommentInput(false)} className="px-3 py-1.5 text-xs rounded-lg" style={{ color: theme.textMuted }}>
                  Annuler
                </button>
                <button
                  onClick={() => { setShowCommentInput(false); setComment(''); }}
                  className="px-3 py-1.5 text-xs rounded-lg text-white"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' }}
                >
                  Publier
                </button>
              </div>
              <p className="text-[10px]" style={{ color: theme.textMuted }}>
                💡 Les commentaires seront disponibles prochainement avec la version collaborative
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Disclaimer variant="compact" />
      </div>
    </Modal>
  );
};
