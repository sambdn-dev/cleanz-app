'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRecipeInteractionsContext } from '@/contexts/RecipeInteractionsContext';
import { Astuce } from '@/types';
import { Star, Heart, Share2, MessageCircle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { SectionTitle, Steps, Chip, Callout, MetaBar, ACCENT } from '@/components/ui/ModalParts';
import { shouldUseDarkText } from '@/utils/gradientUtils';
import { haptic } from '@/utils/haptics';

interface AstuceModalProps {
  astuce: Astuce;
  onClose: () => void;
}

export const AstuceModal = ({ astuce, onClose }: AstuceModalProps) => {
  const { theme, darkMode } = useTheme();
  const useDarkHeaderText = shouldUseDarkText(astuce.gradient);
  const { isFavorite, toggleFavorite, getRating, setRating } = useRecipeInteractionsContext();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');

  // Use astuce ID with offset to differentiate from recipes (10000+)
  const astuceId = 10000 + astuce.id;
  const favorite = isFavorite(astuceId);
  const userRating = getRating(astuceId);

  const handleRatingClick = (rating: number) => {
    haptic('selection');
    setRating(astuceId, rating);
  };

  const generateSlug = (name: string): string =>
    name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleShare = async () => {
    haptic('light');
    const shareUrl = `${window.location.origin}/?astuce=${generateSlug(astuce.titre)}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: astuce.titre, text: `Découvre cette astuce de nettoyage naturel : ${astuce.titre}`, url: shareUrl });
      } catch {
        /* annulé */
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  const instructionSteps = astuce.instructions
    .split(/\.\s+/)
    .filter((step) => step.trim().length > 0)
    .map((step) => (step.endsWith('.') ? step : step + '.'));

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      headerGradient={astuce.gradient}
      useDarkHeaderText={useDarkHeaderText}
      headerContent={
        <div className="flex items-center gap-4">
          <span className="text-5xl">{astuce.emoji}</span>
          <div className="flex-1">
            <h2 className="font-display text-2xl font-extrabold leading-tight" style={{ color: useDarkHeaderText ? '#1F2937' : '#FFFFFF' }}>
              {astuce.titre}
            </h2>
            <span
              className="inline-block mt-2 text-xs px-2.5 py-0.5 rounded-full"
              style={{
                background: useDarkHeaderText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)',
                color: useDarkHeaderText ? '#374151' : '#FFFFFF',
              }}
            >
              {astuce.surface}
            </span>
          </div>
        </div>
      }
    >
      {/* Meta inline */}
      <MetaBar
        items={[
          { label: 'Temps', value: astuce.duree },
          {
            label: 'Note',
            value: (
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {astuce.note}
              </span>
            ),
          },
        ]}
      />

      {/* Résumé */}
      <p className="text-[15px] leading-[1.65] mb-6" style={{ color: theme.textSecondary }}>
        {astuce.resume}
      </p>

      {/* Ingrédients */}
      <div className="mb-6">
        <SectionTitle accent={ACCENT.sage}>Ingrédients nécessaires</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {astuce.ingredients.map((ing, index) => (
            <Chip key={index} tone="sage">{ing}</Chip>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-6">
        <SectionTitle accent={ACCENT.brand}>Étapes</SectionTitle>
        <Steps items={instructionSteps} />
      </div>

      {/* Conseil pro */}
      <div className="mb-6">
        <Callout accent={ACCENT.sage} icon={<span className="text-base leading-none">💡</span>} title="Conseil pro">
          <span className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{astuce.conseil}</span>
        </Callout>
      </div>

      {/* Actions : favori, note, partage */}
      <div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => { haptic('light'); toggleFavorite(astuceId); }}
            aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all active:scale-95"
            style={{ background: favorite ? 'rgba(236,72,153,0.12)' : (darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)') }}
          >
            <Heart className="w-5 h-5" style={{ color: favorite ? '#EC4899' : theme.textMuted, fill: favorite ? '#EC4899' : 'transparent' }} />
            <span className="text-xs font-medium" style={{ color: favorite ? '#EC4899' : theme.textMuted }}>
              {favorite ? 'Favori' : 'Ajouter'}
            </span>
          </button>

          <div className="flex items-center gap-1" role="group" aria-label="Noter l'astuce">
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

        {/* Commentaire */}
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
                placeholder="Partagez votre expérience avec cette astuce…"
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
                💡 Les commentaires seront disponibles prochainement
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
