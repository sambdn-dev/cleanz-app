'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useUserSprays } from '@/contexts/UserSpraysContext';
import { SPRAYS_INDISPENSABLES } from '@/data/sprays';
import { RECETTES } from '@/data/recettes';
import { UserSpray, Spray, RecetteComplete } from '@/types';
import { QRCode } from '@/components/ui/QRCode';
import { Plus, Trash2, Calendar, AlertTriangle, QrCode, ChevronDown, Check } from 'lucide-react';

interface MySpraysSectionProps {
  onSprayClick: (spray: Spray) => void;
  onRecipeClick: (recipe: RecetteComplete) => void;
}

export const MySpraysSection = ({ onSprayClick, onRecipeClick }: MySpraysSectionProps) => {
  const { theme, darkMode } = useTheme();
  const { sprays, addSpray, removeSpray, getNextNumber } = useUserSprays();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<'spray' | 'recette'>('spray');
  const [showQR, setShowQR] = useState<string | null>(null);

  // Combine sprays and recipes for selection
  const allRecipes = [
    ...SPRAYS_INDISPENSABLES.map(s => ({ ...s, type: 'spray' as const })),
    ...RECETTES.map(r => ({ ...r, type: 'recette' as const })),
  ];

  // Get recipe info from UserSpray
  const getRecipeInfo = (userSpray: UserSpray) => {
    if (userSpray.recipeType === 'spray') {
      return SPRAYS_INDISPENSABLES.find(s => s.id === userSpray.recipeId);
    }
    return RECETTES.find(r => r.id === userSpray.recipeId);
  };

  // Calculate days until expiration
  const getDaysUntilExpiry = (expiresAt: string) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = Math.ceil((expires.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  // Handle adding a new spray
  const handleAdd = () => {
    if (!selectedRecipeId) return;
    const recipe = allRecipes.find(r => r.id === selectedRecipeId && r.type === selectedType);
    if (!recipe) return;

    addSpray(
      selectedRecipeId,
      selectedType,
      recipe.nom,
      recipe.conservation
    );

    setShowAddModal(false);
    setSelectedRecipeId(null);
  };

  // Handle clicking on a spray card
  const handleSprayCardClick = (userSpray: UserSpray) => {
    const recipe = getRecipeInfo(userSpray);
    if (!recipe) return;
    if (userSpray.recipeType === 'spray') {
      onSprayClick(recipe as Spray);
    } else {
      onRecipeClick(recipe as RecetteComplete);
    }
  };

  // Generate QR URL
  const getQRUrl = (userSpray: UserSpray) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/?spray=${userSpray.id}`;
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧴</span>
          <h2 className="text-lg font-bold" style={{ color: theme.textPrimary }}>
            Mes Sprays
          </h2>
          {sprays.length > 0 && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                background: darkMode ? 'rgba(79,209,197,0.2)' : 'rgba(79,209,197,0.15)',
                color: '#14B8A6'
              }}
            >
              {sprays.length}
            </span>
          )}
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
            color: 'white',
            boxShadow: '0 4px 12px rgba(20,184,166,0.3)'
          }}
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      {/* Empty state */}
      {sprays.length === 0 ? (
        <div
          className="p-6 rounded-2xl text-center"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)',
            border: `1px dashed ${darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`
          }}
        >
          <span className="text-4xl block mb-3">🏷️</span>
          <p className="text-sm font-medium mb-1" style={{ color: theme.textPrimary }}>
            Aucun spray enregistré
          </p>
          <p className="text-xs mb-4" style={{ color: theme.textMuted }}>
            Numérotez vos flacons et scannez le QR code pour retrouver la recette !
          </p>
        </div>
      ) : (
        /* Spray list */
        <div className="space-y-3">
          {sprays.map((userSpray) => {
            const recipe = getRecipeInfo(userSpray);
            if (!recipe) return null;
            const daysLeft = getDaysUntilExpiry(userSpray.expiresAt);
            const isExpired = daysLeft <= 0;
            const isExpiringSoon = daysLeft > 0 && daysLeft <= 7;

            return (
              <div
                key={userSpray.id}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                  border: `1px solid ${isExpired ? 'rgba(239,68,68,0.3)' : isExpiringSoon ? 'rgba(245,158,11,0.3)' : (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)')}`
                }}
              >
                <div className="p-4 flex gap-3">
                  {/* Number badge */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: recipe.gradient }}
                  >
                    <span className="text-white font-black text-lg">#{userSpray.number}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0" onClick={() => handleSprayCardClick(userSpray)}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{recipe.emoji}</span>
                      <h3 className="font-bold text-sm truncate" style={{ color: theme.textPrimary }}>
                        {recipe.nom}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" style={{ color: theme.textMuted }} />
                        <span className="text-[10px]" style={{ color: theme.textMuted }}>
                          {new Date(userSpray.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium"
                        style={{
                          background: isExpired
                            ? 'rgba(239,68,68,0.15)'
                            : isExpiringSoon
                              ? 'rgba(245,158,11,0.15)'
                              : 'rgba(34,197,94,0.15)',
                          color: isExpired ? '#EF4444' : isExpiringSoon ? '#F59E0B' : '#22C55E'
                        }}
                      >
                        {isExpired ? (
                          <><AlertTriangle className="w-3 h-3" /> Périmé</>
                        ) : (
                          <>{daysLeft}j restants</>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowQR(showQR === userSpray.id ? null : userSpray.id)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
                      style={{
                        background: showQR === userSpray.id
                          ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)'
                          : (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)')
                      }}
                    >
                      <QrCode className="w-4 h-4" style={{ color: showQR === userSpray.id ? 'white' : theme.textSecondary }} />
                    </button>
                    <button
                      onClick={() => removeSpray(userSpray.id)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
                      style={{ background: darkMode ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.1)' }}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* QR Code panel */}
                {showQR === userSpray.id && (
                  <div
                    className="p-4 border-t flex flex-col items-center gap-3"
                    style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}
                  >
                    <QRCode
                      data={getQRUrl(userSpray)}
                      size={140}
                      fgColor={darkMode ? '#F5E6FF' : '#2D1F3D'}
                      bgColor={darkMode ? '#2D1B4E' : '#FFFFFF'}
                    />
                    <p className="text-[10px] text-center" style={{ color: theme.textMuted }}>
                      Imprimez et collez sur le flacon #{userSpray.number}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowAddModal(false)}
          />
          <div
            className="relative w-full max-w-md rounded-t-3xl p-5 pb-8 animate-slide-up"
            style={{
              background: darkMode ? '#2D1B4E' : 'white',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-1" style={{ color: theme.textPrimary }}>
              Nouveau spray
            </h3>
            <p className="text-sm mb-4" style={{ color: theme.textMuted }}>
              Flacon #{getNextNumber()} — Choisissez la recette
            </p>

            {/* Type selector */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => { setSelectedType('spray'); setSelectedRecipeId(null); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: selectedType === 'spray'
                    ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)'
                    : (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'),
                  color: selectedType === 'spray' ? 'white' : theme.textSecondary
                }}
              >
                🧴 Indispensables
              </button>
              <button
                onClick={() => { setSelectedType('recette'); setSelectedRecipeId(null); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: selectedType === 'recette'
                    ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)'
                    : (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'),
                  color: selectedType === 'recette' ? 'white' : theme.textSecondary
                }}
              >
                📋 Recettes
              </button>
            </div>

            {/* Recipe list */}
            <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
              {(selectedType === 'spray' ? SPRAYS_INDISPENSABLES : RECETTES).map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => setSelectedRecipeId(recipe.id)}
                  className="w-full p-3 rounded-xl flex items-center gap-3 text-left transition-all"
                  style={{
                    background: selectedRecipeId === recipe.id
                      ? (darkMode ? 'rgba(20,184,166,0.2)' : 'rgba(20,184,166,0.1)')
                      : (darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'),
                    border: `1.5px solid ${selectedRecipeId === recipe.id ? '#14B8A6' : 'transparent'}`
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: recipe.gradient }}
                  >
                    <span className="text-lg">{recipe.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: theme.textPrimary }}>
                      {recipe.nom}
                    </p>
                    <p className="text-[10px]" style={{ color: theme.textMuted }}>
                      Conservation : {recipe.conservation}
                    </p>
                  </div>
                  {selectedRecipeId === recipe.id && (
                    <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {/* Confirm button */}
            <button
              onClick={handleAdd}
              disabled={!selectedRecipeId}
              className="w-full py-3.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
              style={{
                background: selectedRecipeId
                  ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)'
                  : (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
                color: selectedRecipeId ? 'white' : theme.textMuted
              }}
            >
              Créer le spray #{getNextNumber()}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
