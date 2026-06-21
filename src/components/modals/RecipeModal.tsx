'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRecipeInteractionsContext } from '@/contexts/RecipeInteractionsContext';
import { RecetteComplete } from '@/types';
import { getSceneImage } from '@/data/scenes';
import { getImageColor } from '@/data/imageColors';
import { Star, AlertTriangle, Archive, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { SectionTitle, Steps, Chip, Callout, MetaBar, ACCENT } from '@/components/ui/ModalParts';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { deriveAccent } from '@/utils/accentFromColor';
import { shouldUseDarkText } from '@/utils/gradientUtils';
import { haptic } from '@/utils/haptics';
import { slugify, buildShareText, shareOrCopy } from '@/utils/share';

interface RecipeModalProps {
  recipe: RecetteComplete;
  onClose: () => void;
}

export const RecipeModal = ({ recipe, onClose }: RecipeModalProps) => {
  const { theme, darkMode } = useTheme();
  const { isFavorite, toggleFavorite, getRating, setRating } = useRecipeInteractionsContext();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');

  // Photo dédiée si elle existe, sinon photo-scène générique de la catégorie.
  const headerImageUrl = recipe.imageUrl ?? getSceneImage(recipe);
  const hasImage = !!headerImageUrl;
  // Gardé pour le repli dégradé (en-tête sans photo / image manquante).
  const useDarkHeaderText = shouldUseDarkText(recipe.gradient);

  // Accent de la modale dérivé de la couleur « n°1 » de la photo affichée.
  const colorSource = darkMode && recipe.imageUrlDark ? recipe.imageUrlDark : headerImageUrl;
  const accent = deriveAccent(getImageColor(colorSource), darkMode);

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

  const [shareMsg, setShareMsg] = useState<string | null>(null);
  const showShareConfirm = (msg: string) => {
    setShareMsg(msg);
    window.setTimeout(() => setShareMsg(null), 2200);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/?recette=${slugify(recipe.nom)}`;
    const text = buildShareText({
      title: recipe.nom,
      emoji: recipe.emoji,
      tagline: `⏱️ ${recipe.temps} · ${recipe.difficulte} · efficacité ${recipe.efficacite}/5`,
      bullets: recipe.ingredients.slice(0, 4).map((i) => i.nom),
      url,
    });
    const res = await shareOrCopy({ title: recipe.nom, text, url });
    if (res === 'copied') showShareConfirm('Lien copié ✓');
    else if (res === 'shared') showShareConfirm('Partagé ✓');
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
      headerImageUrl={headerImageUrl}
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
        <SectionTitle accent={accent.bar}>Ingrédients &amp; dosages</SectionTitle>
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
          <SectionTitle accent={accent.bar}>Matériel</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {recipe.materiel.map((item, index) => (
              <Chip key={index} bg={accent.chipBg} color={accent.chipText}>{item}</Chip>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mb-6">
        <SectionTitle accent={accent.bar}>Préparation</SectionTitle>
        <Steps items={recipe.instructions} />
      </div>

      {/* Surfaces compatibles */}
      <div className="mb-6">
        <SectionTitle accent={accent.bar}>Surfaces compatibles</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {recipe.surfaces.map((surface, index) => (
            <Chip key={index} bg={accent.chipBg} color={accent.chipText}>{surface}</Chip>
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
          <Callout accent={accent.bar} icon={<span className="text-base leading-none">💡</span>} title="Le geste en plus">
            {recipe.astuces.map((astuce, index) => (
              <div key={index} className="flex items-baseline gap-2">
                <span className="text-sm leading-none" style={{ color: accent.bar }}>•</span>
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
        <Archive className="w-4 h-4 flex-shrink-0" style={{ color: accent.bar }} />
        <span className="text-xs" style={{ color: theme.textMuted }}>Se conserve</span>
        <span className="text-sm font-medium ml-auto" style={{ color: theme.textPrimary }}>{recipe.conservation}</span>
      </div>

      {/* Actions : favori, note, partage */}
      <div className="mb-5">
        {/* Notation + actions */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)',
            border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`,
          }}
        >
          {/* Ligne de notation */}
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-semibold" style={{ color: userRating ? ACCENT.brand : theme.textSecondary }}>
              {userRating ? `Merci pour ta note ! · ${userRating}/5` : 'Tu valides cette recette ?'}
            </span>
            <div className="flex items-center gap-1" role="group" aria-label="Noter la recette">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
                  className="transition-transform duration-150 hover:scale-110 active:scale-90"
                >
                  <Star
                    className="w-6 h-6 transition-colors"
                    style={{
                      color: userRating && star <= userRating ? '#FBBF24' : (darkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)'),
                      fill: userRating && star <= userRating ? '#FBBF24' : 'transparent',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Boutons Favori + Partager */}
          <div className="flex gap-2.5">
            <button
              onClick={() => { haptic('light'); toggleFavorite(recipe.id); }}
              aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              aria-pressed={favorite}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.97]"
              style={{
                background: favorite ? 'rgba(236,72,153,0.12)' : (darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'),
                color: favorite ? '#EC4899' : theme.textSecondary,
              }}
            >
              <Heart className="w-[18px] h-[18px]" style={{ fill: favorite ? '#EC4899' : 'transparent' }} />
              {favorite ? 'Favori' : 'Ajouter'}
            </button>
            <button
              onClick={handleShare}
              aria-label="Partager la recette"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.97]"
              style={{
                background: shareMsg ? 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)' : 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                boxShadow: '0 4px 14px rgba(236,72,153,0.30)',
              }}
            >
              <Share2 className="w-[18px] h-[18px]" />
              {shareMsg ?? 'Partager'}
            </button>
          </div>
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
