'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRecipeInteractionsContext } from '@/contexts/RecipeInteractionsContext';
import { RecetteComplete } from '@/types';
import { Clock, ChefHat, Star, AlertTriangle, Lightbulb, Archive, CheckCircle2, Beaker, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Disclaimer } from '@/components/ui/Disclaimer';

interface RecipeModalProps {
  recipe: RecetteComplete;
  onClose: () => void;
}

export const RecipeModal = ({ recipe, onClose }: RecipeModalProps) => {
  const { theme, darkMode } = useTheme();
  const { isFavorite, toggleFavorite, getRating, setRating } = useRecipeInteractionsContext();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');

  const favorite = isFavorite(recipe.id);
  const userRating = getRating(recipe.id);

  const handleRatingClick = (rating: number) => {
    setRating(recipe.id, rating);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.nom,
          text: `Découvre cette recette de nettoyage naturel : ${recipe.nom}`,
          url: window.location.href,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${recipe.nom} - Recette de nettoyage naturel sur Cleanz`);
    }
  };

  // Générer les étoiles d'efficacité
  const renderEfficacite = (note: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= note ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const getDifficulteColor = (difficulte: string) => {
    switch (difficulte) {
      case 'Facile':
        return darkMode ? '#4ADE80' : '#22C55E';
      case 'Moyen':
        return darkMode ? '#FBBF24' : '#F59E0B';
      case 'Avancé':
        return darkMode ? '#F87171' : '#EF4444';
      default:
        return theme.textSecondary;
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      headerGradient={recipe.gradient}
      headerContent={
        <div className="flex items-center gap-4">
          <span className="text-5xl">{recipe.emoji}</span>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white leading-tight">{recipe.nom}</h2>
            {recipe.badge && (
              <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-white/20 text-white">
                {recipe.badge}
              </span>
            )}
          </div>
        </div>
      }
    >
      {/* Actions utilisateur : Favori, Note, Partage */}
      <div
        className="mb-5 p-4 rounded-2xl"
        style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
      >
        <div className="flex items-center justify-between">
          {/* Favori */}
          <button
            onClick={() => toggleFavorite(recipe.id)}
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
            <span className="text-[10px] mr-1" style={{ color: theme.textMuted }}>Ma note:</span>
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

        {/* Zone commentaire (optionnel) */}
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
                placeholder="Partagez votre expérience avec cette recette..."
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
                    // TODO: Save comment when Supabase is integrated
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
                💡 Les commentaires seront disponibles prochainement avec la version collaborative
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <div
          className="p-3 rounded-2xl text-center"
          style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
        >
          <Clock className="w-4 h-4 mx-auto mb-1 text-pink-500" />
          <span className="text-[10px] block" style={{ color: theme.textMuted }}>Temps</span>
          <span className="text-xs font-bold" style={{ color: theme.textPrimary }}>{recipe.temps}</span>
        </div>
        <div
          className="p-3 rounded-2xl text-center"
          style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
        >
          <ChefHat className="w-4 h-4 mx-auto mb-1 text-cyan-500" />
          <span className="text-[10px] block" style={{ color: theme.textMuted }}>Difficulté</span>
          <span className="text-xs font-bold" style={{ color: getDifficulteColor(recipe.difficulte) }}>
            {recipe.difficulte}
          </span>
        </div>
        <div
          className="p-3 rounded-2xl text-center"
          style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
        >
          <Star className="w-4 h-4 mx-auto mb-1 text-yellow-500" />
          <span className="text-[10px] block" style={{ color: theme.textMuted }}>Efficacité</span>
          <div className="flex justify-center mt-0.5">
            {renderEfficacite(recipe.efficacite)}
          </div>
        </div>
      </div>

      {/* Ingrédients avec dosages */}
      <div className="mb-5">
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
          <Beaker className="w-4 h-4 text-purple-500" /> Ingrédients & Dosages
        </h3>
        <div
          className="p-4 rounded-2xl space-y-2"
          style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
        >
          {recipe.ingredients.map((ing, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-0"
              style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{ing.emoji || '•'}</span>
                <span className="text-sm font-medium" style={{ color: theme.textPrimary }}>{ing.nom}</span>
              </div>
              <span
                className="text-xs px-2 py-1 rounded-full font-semibold"
                style={{
                  background: darkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
                  color: darkMode ? '#A78BFA' : '#7C3AED'
                }}
              >
                {ing.quantite}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Matériel nécessaire */}
      {recipe.materiel && recipe.materiel.length > 0 && (
        <div className="mb-5">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
            <span className="text-base">🧰</span> Matériel nécessaire
          </h3>
          <div className="flex flex-wrap gap-2">
            {recipe.materiel.map((item, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                  color: theme.textSecondary
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Instructions étape par étape */}
      <div className="mb-5">
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
          <CheckCircle2 className="w-4 h-4 text-green-500" /> Instructions
        </h3>
        <div className="space-y-3">
          {recipe.instructions.map((instruction, index) => (
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

      {/* Surfaces compatibles */}
      <div className="mb-5">
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
          <span className="text-base">🎯</span> Surfaces compatibles
        </h3>
        <div className="flex flex-wrap gap-2">
          {recipe.surfaces.map((surface, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{
                background: darkMode ? 'rgba(79, 209, 197, 0.2)' : 'rgba(79, 209, 197, 0.15)',
                color: darkMode ? '#5EEAD4' : '#14B8A6'
              }}
            >
              {surface}
            </span>
          ))}
        </div>
      </div>

      {/* Précautions */}
      {recipe.precautions.length > 0 && (
        <div className="mb-5">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Précautions
          </h3>
          <div
            className="p-4 rounded-2xl space-y-2"
            style={{
              background: darkMode ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.08)'
            }}
          >
            {recipe.precautions.map((precaution, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-amber-500">•</span>
                <p className="text-xs" style={{ color: theme.textSecondary }}>{precaution}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Astuces */}
      {recipe.astuces.length > 0 && (
        <div className="mb-5">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
            <Lightbulb className="w-4 h-4 text-yellow-500" /> Astuces pro
          </h3>
          <div
            className="p-4 rounded-2xl space-y-2"
            style={{
              background: darkMode
                ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)'
                : 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%)'
            }}
          >
            {recipe.astuces.map((astuce, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-purple-500">💡</span>
                <p className="text-xs" style={{ color: theme.textSecondary }}>{astuce}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conservation */}
      <div
        className="p-4 rounded-2xl flex items-center gap-3"
        style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
      >
        <Archive className="w-5 h-5 text-blue-500" />
        <div>
          <span className="text-xs font-semibold block" style={{ color: theme.textMuted }}>Conservation</span>
          <span className="text-sm font-medium" style={{ color: theme.textPrimary }}>{recipe.conservation}</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4">
        <Disclaimer variant="compact" />
      </div>
    </Modal>
  );
};
