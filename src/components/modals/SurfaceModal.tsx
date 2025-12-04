'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Surface, Recette } from '@/types';
import { X, Clock, FolderOpen, Sparkles } from 'lucide-react';

interface SurfaceModalProps {
  surface: Surface;
  onClose: () => void;
}

// Recettes par surface (à enrichir)
const RECETTES_PAR_SURFACE: Record<number, Recette[]> = {
  1: [ // Four
    {
      nom: 'Pâte dégraissante',
      ingredients: ['Bicarbonate', 'Eau', 'Savon noir'],
      instructions: 'Mélanger pour obtenir une pâte, appliquer et laisser agir 2h',
      temps: '2h',
      efficacite: '⭐⭐⭐⭐⭐'
    },
    {
      nom: 'Spray dégraissant',
      ingredients: ['Vinaigre', 'Cristaux de soude', 'Eau chaude'],
      instructions: 'Pulvériser, laisser agir 30min, frotter et rincer',
      temps: '30min',
      efficacite: '⭐⭐⭐⭐'
    }
  ],
  17: [ // WC
    {
      nom: 'Gel WC maison',
      ingredients: ['Acide citrique', 'Eau', 'HE tea tree'],
      instructions: 'Dissoudre acide citrique dans eau chaude, ajouter HE',
      temps: '15min',
      efficacite: '⭐⭐⭐⭐⭐'
    }
  ],
  30: [ // Lave-linge
    {
      nom: 'Nettoyage tambour',
      ingredients: ['Vinaigre blanc', 'Bicarbonate'],
      instructions: 'Verser 1L vinaigre + 100g bicarbonate, cycle 90°C à vide',
      temps: '1h30',
      efficacite: '⭐⭐⭐⭐⭐'
    }
  ],
  58: [ // Vitres
    {
      nom: 'Spray vitres',
      ingredients: ['Vinaigre', 'Eau', 'Alcool ménager'],
      instructions: 'Mélanger à parts égales, vaporiser et essuyer en S',
      temps: '5min',
      efficacite: '⭐⭐⭐⭐⭐'
    }
  ],
  60: [ // Écrans
    {
      nom: 'Lingette écran',
      ingredients: ['Eau déminéralisée', 'Vinaigre blanc'],
      instructions: 'Mélanger 70% eau + 30% vinaigre, imbiber microfibre',
      temps: '2min',
      efficacite: '⭐⭐⭐⭐'
    }
  ],
  62: [ // Baskets
    {
      nom: 'Pâte blanchissante',
      ingredients: ['Bicarbonate', 'Eau oxygénée', 'Liquide vaisselle'],
      instructions: 'Mélanger, appliquer à la brosse, laisser sécher au soleil',
      temps: '1h',
      efficacite: '⭐⭐⭐⭐⭐'
    }
  ]
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

export const SurfaceModal = ({ surface, onClose }: SurfaceModalProps) => {
  const { theme, darkMode } = useTheme();
  const recettes = RECETTES_PAR_SURFACE[surface.id] || [];
  const ingredients = INGREDIENTS_RECOMMANDES[surface.piece] || INGREDIENTS_RECOMMANDES['Cuisine'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-3xl animate-slide-up"
        style={{ background: theme.bgModal }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="relative p-6 pb-8 rounded-t-3xl"
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)'
              : 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)'
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Emoji and title */}
          <div className="flex items-center gap-4">
            <span className="text-5xl">{surface.emoji}</span>
            <div>
              <h2 className="text-2xl font-bold text-white">{surface.nom}</h2>
              <p className="text-white/80 text-sm">{surface.piece}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Info cards */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="p-4 rounded-2xl"
              style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-pink-500" />
                <span className="text-xs font-semibold" style={{ color: theme.textMuted }}>Fr&eacute;quence</span>
              </div>
              <span className="text-sm font-bold" style={{ color: theme.textPrimary }}>{surface.frequence}</span>
            </div>
            <div
              className="p-4 rounded-2xl"
              style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <FolderOpen className="w-4 h-4 text-cyan-500" />
                <span className="text-xs font-semibold" style={{ color: theme.textMuted }}>Cat&eacute;gorie</span>
              </div>
              <span className="text-sm font-bold" style={{ color: theme.textPrimary }}>{surface.categorie}</span>
            </div>
          </div>

          {/* Recettes maison */}
          {recettes.length > 0 && (
            <div>
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
                <span className="text-base">🧪</span> Recettes maison
              </h3>
              <div className="space-y-3">
                {recettes.map((recette, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl"
                    style={{
                      background: darkMode
                        ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)'
                        : 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm" style={{ color: theme.textPrimary }}>{recette.nom}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/50 font-medium" style={{ color: theme.textSecondary }}>
                        {recette.temps}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {recette.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{
                            background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                            color: theme.textSecondary
                          }}
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: theme.textMuted }}>{recette.instructions}</p>
                    <div className="mt-2 text-xs" style={{ color: theme.textSecondary }}>
                      Efficacit&eacute;: {recette.efficacite}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ingrédients recommandés */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
              <Sparkles className="w-4 h-4 text-amber-500" /> Ingr&eacute;dients recommand&eacute;s
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
        </div>

        {/* Bottom padding for safe area */}
        <div className="h-6" />
      </div>
    </div>
  );
};
