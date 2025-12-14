'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRecipeInteractionsContext } from '@/contexts/RecipeInteractionsContext';
import { Astuce } from '@/types';
import { Clock, Star, Lightbulb, Heart, Share2, MessageCircle, CheckCircle2, Beaker } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

interface AstuceModalProps {
  astuce: Astuce;
  onClose: () => void;
}

export const AstuceModal = ({ astuce, onClose }: AstuceModalProps) => {
  const { theme, darkMode } = useTheme();
  const { isFavorite, toggleFavorite, getRating, setRating } = useRecipeInteractionsContext();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');

  // Use astuce ID with offset to differentiate from recipes (10000+)
  const astuceId = 10000 + astuce.id;
  const favorite = isFavorite(astuceId);
  const userRating = getRating(astuceId);

  const handleRatingClick = (rating: number) => {
    setRating(astuceId, rating);
  };

  // Génère un slug URL-friendly à partir du titre
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleShare = async () => {
    const baseUrl = window.location.origin;
    const slug = generateSlug(astuce.titre);
    const shareUrl = `${baseUrl}/?astuce=${slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: astuce.titre,
          text: `Découvre cette astuce de nettoyage naturel : ${astuce.titre}`,
          url: shareUrl,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  // Split instructions into steps (by periods followed by space)
  const instructionSteps = astuce.instructions
    .split(/\.\s+/)
    .filter(step => step.trim().length > 0)
    .map(step => step.endsWith('.') ? step : step + '.');

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      headerGradient={astuce.gradient}
      headerContent={
        <div className="flex items-center gap-4">
          <span className="text-5xl">{astuce.emoji}</span>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white leading-tight">{astuce.titre}</h2>
            <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-white/20 text-white">
              {astuce.surface}
            </span>
          </div>
        </div>
      }
    >
      {/* Info cards */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <div
          className="p-3 rounded-2xl text-center"
          style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
        >
          <Clock className="w-4 h-4 mx-auto mb-1 text-pink-500" />
          <span className="text-[10px] block" style={{ color: theme.textMuted }}>Temps</span>
          <span className="text-xs font-bold" style={{ color: theme.textPrimary }}>{astuce.duree}</span>
        </div>
        <div
          className="p-3 rounded-2xl text-center"
          style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
        >
          <Star className="w-4 h-4 mx-auto mb-1 text-yellow-500" />
          <span className="text-[10px] block" style={{ color: theme.textMuted }}>Note</span>
          <div className="flex justify-center items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold" style={{ color: theme.textPrimary }}>{astuce.note}</span>
          </div>
        </div>
      </div>

      {/* Résumé */}
      <p className="text-sm leading-relaxed mb-5" style={{ color: theme.textSecondary }}>
        {astuce.resume}
      </p>

      {/* Ingrédients */}
      <div className="mb-5">
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
          <Beaker className="w-4 h-4 text-purple-500" /> Ingrédients nécessaires
        </h3>
        <div className="flex flex-wrap gap-2">
          {astuce.ingredients.map((ing, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{
                background: darkMode ? 'rgba(79, 209, 197, 0.2)' : 'rgba(79, 209, 197, 0.15)',
                color: darkMode ? '#5EEAD4' : '#14B8A6'
              }}
            >
              {ing}
            </span>
          ))}
        </div>
      </div>

      {/* Instructions étape par étape */}
      <div className="mb-5">
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
          <CheckCircle2 className="w-4 h-4 text-green-500" /> Instructions
        </h3>
        <div className="space-y-3">
          {instructionSteps.map((instruction, index) => (
            <div
              key={index}
              className="flex gap-3 items-start"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                style={{
                  background: darkMode
                    ? 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)'
                    : 'linear-gradient(135deg, #A78BFA 0%, #F472B6 100%)',
                  color: 'white'
                }}
              >
                {index + 1}
              </div>
              <p className="text-sm flex-1 pt-0.5" style={{ color: theme.textSecondary }}>
                {instruction}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Conseil Pro */}
      <div
        className="p-4 rounded-2xl mb-5"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%)'
        }}
      >
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-violet-500 flex-shrink-0" />
          <div>
            <span className="text-xs font-bold block mb-1" style={{ color: theme.textPrimary }}>Conseil Pro</span>
            <span className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
              {astuce.conseil}
            </span>
          </div>
        </div>
      </div>

      {/* Actions utilisateur : Favori, Note, Partage */}
      <div
        className="p-4 rounded-2xl"
        style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
      >
        <div className="flex items-center justify-between">
          {/* Favori */}
          <button
            onClick={() => toggleFavorite(astuceId)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:scale-105 active:scale-95"
            style={{
              background: favorite
                ? 'rgba(236, 72, 153, 0.15)'
                : darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${favorite ? 'text-pink-500 fill-pink-500' : ''}`}
              style={{ color: favorite ? '#EC4899' : theme.textMuted }}
            />
            <span className="text-xs font-medium" style={{ color: favorite ? '#EC4899' : theme.textMuted }}>
              {favorite ? 'Favori' : 'Ajouter'}
            </span>
          </button>

          {/* Note utilisateur */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingClick(star)}
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  className={`w-5 h-5 ${
                    userRating && star <= userRating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Partager */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:scale-105 active:scale-95"
            style={{ background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
          >
            <Share2 className="w-4 h-4" style={{ color: theme.textMuted }} />
            <span className="text-xs font-medium" style={{ color: theme.textMuted }}>Partager</span>
          </button>
        </div>

        {/* Zone commentaire */}
        <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}` }}>
          {!showCommentInput ? (
            <button
              onClick={() => setShowCommentInput(true)}
              className="flex items-center gap-2 text-xs"
              style={{ color: theme.textMuted }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ajouter un commentaire...</span>
            </button>
          ) : (
            <div className="space-y-2">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Partagez votre expérience avec cette astuce..."
                className="w-full p-3 rounded-xl text-sm resize-none outline-none"
                style={{
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                  color: theme.textPrimary,
                  border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                }}
                rows={3}
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowCommentInput(false)}
                  className="px-3 py-1.5 text-xs rounded-lg"
                  style={{ color: theme.textMuted }}
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    setShowCommentInput(false);
                    setComment('');
                  }}
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
