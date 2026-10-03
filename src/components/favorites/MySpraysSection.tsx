'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useUserSprays } from '@/contexts/UserSpraysContext';
import { SPRAYS_INDISPENSABLES } from '@/data/sprays';
import { getPublishedRecipes, getRecipeAccess } from '@/data/publication';
import type { UserSpray } from '@/types';
import { QRCode, generateQRDataUrl } from '@/components/ui/QRCode';
import { buildFicheUrl, getHistoricalExpiryLabel, escapeLabelHtml } from '@/utils/sprayUtils';
import { Confetti } from '@/components/ui/Confetti';
import { haptic } from '@/utils/haptics';
import { Plus, Trash2, Calendar, QrCode, Check, Printer, X, Download } from 'lucide-react';

interface MySpraysSectionProps {
  onRecipeReference: (reference: { id: number; type: 'spray' | 'recette' }) => void;
}

export const MySpraysSection = ({ onRecipeReference }: MySpraysSectionProps) => {
  const { theme, darkMode } = useTheme();
  const { sprays, addSpray, removeSpray, getNextNumber, isLoaded, canWrite, storageError, storageWarning, recoveryData } = useUserSprays();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<'spray' | 'recette'>('spray');
  const [customName, setCustomName] = useState('');
  const [showQR, setShowQR] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Bloque le scroll de fond quand la modale est ouverte
  useEffect(() => {
    if (showAddModal) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [showAddModal]);

  const currentList = selectedType === 'spray' ? SPRAYS_INDISPENSABLES : getPublishedRecipes();
  const selectedRecipe = currentList.find(r => r.id === selectedRecipeId);

  const openAddModal = () => {
    setSelectedType('spray');
    setSelectedRecipeId(null);
    setCustomName('');
    setShowAddModal(true);
  };

  const handleSelectRecipe = (id: number) => {
    setSelectedRecipeId(id);
    const recipe = currentList.find(r => r.id === id);
    setCustomName(recipe?.nom ?? '');
  };

  const handleAdd = () => {
    if (!selectedRecipe) return;
    const name = customName.trim() || selectedRecipe.nom;
    const newSpray = addSpray(selectedRecipe.id, selectedType, name);
    if (!newSpray) return;
    setShowAddModal(false);
    setSelectedRecipeId(null);
    setCustomName('');
    // Effet wow : confettis + retour haptique
    haptic('success');
    setShowConfetti(true);
    // Affiche directement le QR du flacon créé
    setShowQR(newSpray.id);
  };

  const handleSprayCardClick = (userSpray: UserSpray) => {
    onRecipeReference({ id: userSpray.recipeId, type: userSpray.recipeType });
  };

  const downloadRecovery = () => {
    if (recoveryData === null) return;
    const url = URL.createObjectURL(new Blob([recoveryData], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cleanz-flacons-recuperation.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const getQRUrl = (userSpray: UserSpray) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return buildFicheUrl(origin, userSpray.recipeType, userSpray.recipeId);
  };

  // Impression d'une étiquette autocollante pour le flacon
  const handlePrint = async (userSpray: UserSpray) => {
    const access = getRecipeAccess(userSpray.recipeId, userSpray.recipeType);
    const status = access.available
      ? (access.redirected ? `Fiche fusionnée — destination actuelle : ${access.recipe.nom}` : 'Fiche actuelle publiée')
      : access.message;
    const url = getQRUrl(userSpray);
    const qr = await generateQRDataUrl(url, '#2D1F3D', '#FFFFFF');
    const expiry = getHistoricalExpiryLabel(userSpray.expiresAt);
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html><html><head><meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Étiquette #${userSpray.number}</title>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; font-family: -apple-system, system-ui, sans-serif; }
        body { display:flex; flex-direction:column; align-items:center; min-height:100vh; padding:80px 16px 16px; background:#F6F2F9; }
        .bar { position:fixed; top:0; left:0; right:0; height:60px; display:flex; align-items:center; justify-content:space-between; padding:0 16px; background:#fff; border-bottom:1px solid #eee; }
        .bar button { border:none; border-radius:12px; padding:10px 16px; font-size:14px; font-weight:700; cursor:pointer; }
        .close { background:#F0EBF5; color:#2D1F3D; }
        .print { background:linear-gradient(135deg,#14B8A6,#06B6D4); color:#fff; }
        .label { width:300px; border:2px solid #2D1F3D; border-radius:18px; padding:20px; text-align:center; background:#fff; }
        .brand { font-size:13px; font-weight:800; color:#FF69B4; letter-spacing:1px; }
        .num { font-size:54px; font-weight:900; color:#2D1F3D; line-height:1; margin:6px 0; }
        .name { font-size:18px; font-weight:700; color:#2D1F3D; margin-bottom:4px; }
        .meta { font-size:12px; color:#5A4A6A; margin-bottom:14px; }
        .qr { display:flex; justify-content:center; margin-bottom:8px; }
        .qr img { width:170px; height:170px; }
        .scan { font-size:11px; color:#9B8AAB; }
        @media print { .bar { display:none; } body { padding:16px; background:#fff; } }
      </style></head><body>
        <div class="bar">
          <button class="close" onclick="window.close()">✕ Fermer</button>
          <button class="print" onclick="window.print()">🖨️ Imprimer</button>
        </div>
        <div class="label">
          <div class="brand">🧴 CLEANZ</div>
          <div class="num">#${userSpray.number}</div>
          <div class="name">${escapeLabelHtml(userSpray.name)}</div>
          <div class="meta">${escapeLabelHtml(expiry)}</div>
          <div class="meta">${escapeLabelHtml(status)}</div>
          <div class="meta">Composition historique non enregistrée. La fiche actuelle ne permet pas d’identifier le contenu de ce flacon.</div>
          <div class="qr"><img src="${qr}" alt="QR"/></div>
          <div class="scan">Scannez pour consulter le statut et la fiche actuelle</div>
        </div>
      </body></html>
    `);
    win.document.close();
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧴</span>
          <h2 className="font-display text-lg font-bold" style={{ color: theme.textPrimary }}>Mes Sprays</h2>
          {sprays.length > 0 && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: darkMode ? 'rgba(79,209,197,0.2)' : 'rgba(79,209,197,0.15)', color: '#14B8A6' }}
            >
              {sprays.length}
            </span>
          )}
        </div>
        <button
          onClick={openAddModal}
          disabled={!isLoaded || !canWrite}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)', color: 'white', boxShadow: '0 4px 12px rgba(20,184,166,0.3)' }}
        >
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>
      <p className="text-xs mb-4" style={{ color: theme.textMuted }}>
        Conservez le nom et le numéro de vos flacons. Le QR ouvre le statut actuel de leur fiche.
      </p>

      {(storageError || storageWarning) && (
        <div className="mb-4 rounded-xl p-3 text-xs" style={{ background: 'rgba(245,158,11,0.12)', color: theme.textPrimary }}>
          {storageError && <p role="alert">{storageError}</p>}
          {storageWarning && <p role="status">{storageWarning}</p>}
          {recoveryData !== null && (
            <button onClick={downloadRecovery} className="mt-2 inline-flex items-center gap-1.5 font-semibold underline">
              <Download className="h-3.5 w-3.5" /> Télécharger une copie des données
            </button>
          )}
        </div>
      )}

      {/* Empty state */}
      {!isLoaded ? (
        <p role="status" className="py-4 text-sm" style={{ color: theme.textMuted }}>Chargement des flacons…</p>
      ) : sprays.length === 0 && !canWrite ? (
        <p className="py-4 text-sm" style={{ color: theme.textMuted }}>Vos données restent conservées dans ce navigateur.</p>
      ) : sprays.length === 0 ? (
        <div
          className="p-6 rounded-2xl text-center"
          style={{ background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)', border: `1px dashed ${darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}` }}
        >
          <span className="text-4xl block mb-3">🏷️</span>
          <p className="text-sm font-medium mb-1" style={{ color: theme.textPrimary }}>Aucun flacon enregistré</p>
          <p className="text-xs mb-4" style={{ color: theme.textMuted }}>
            Appuyez sur « Ajouter » pour créer votre premier flacon numéroté.
          </p>
          <button
            onClick={openAddModal}
            disabled={!canWrite}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)', color: 'white' }}
          >
            <Plus className="w-4 h-4" /> Créer mon flacon #1
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sprays.map((userSpray, index) => {
            const access = getRecipeAccess(userSpray.recipeId, userSpray.recipeType);
            // The source summary describes the reference, never the bottle's physical contents.
            const source = access.requested;
            const status = access.available
              ? (access.redirected ? 'Fiche fusionnée — destination publiée' : 'Fiche actuelle publiée')
              : access.message;

            return (
              <div
                key={`${userSpray.id}-${index}`}
                className="rounded-2xl overflow-hidden"
                style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)', border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'}` }}
              >
                <div className="p-4 flex gap-3">
                  {/* Number badge */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: source?.gradient ?? 'linear-gradient(135deg, #64748B, #475569)' }}>
                    <span className="text-white font-black text-lg">#{userSpray.number}</span>
                  </div>

                  {/* Info (clickable -> recipe) */}
                  <button className="flex-1 min-w-0 text-left" onClick={() => handleSprayCardClick(userSpray)}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{source?.emoji ?? '🧴'}</span>
                      <h3 className="font-bold text-sm truncate" style={{ color: theme.textPrimary }}>{userSpray.name}</h3>
                    </div>
                    <p className="text-[11px] mt-1" style={{ color: access.available ? theme.textSecondary : '#D97706' }}>{status}</p>
                    {access.available && access.redirected && (
                      <p className="text-[11px] mt-1" style={{ color: theme.textMuted }}>Fiche actuelle : « {access.recipe.nom} ».</p>
                    )}
                    <p className="text-[11px] mt-1" style={{ color: theme.textMuted }}>Composition historique non enregistrée. La fiche actuelle ne permet pas d’identifier le contenu de ce flacon.</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" style={{ color: theme.textMuted }} />
                        <span className="text-[10px]" style={{ color: theme.textMuted }}>{new Date(userSpray.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <span className="text-[10px]" style={{ color: theme.textSecondary }}>
                        {getHistoricalExpiryLabel(userSpray.expiresAt)}
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] font-semibold underline" style={{ color: theme.textSecondary }}>Voir le statut et la fiche actuelle</p>
                  </button>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowQR(showQR === userSpray.id ? null : userSpray.id)}
                      aria-label="Afficher le QR code"
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
                      style={{ background: showQR === userSpray.id ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)' : (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)') }}
                    >
                      <QrCode className="w-4 h-4" style={{ color: showQR === userSpray.id ? 'white' : theme.textSecondary }} />
                    </button>
                    <button
                      onClick={() => removeSpray(userSpray.id)}
                      disabled={!canWrite}
                      aria-label={`Supprimer le flacon ${userSpray.number}`}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
                      style={{ background: darkMode ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.1)' }}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* QR Code panel */}
                {showQR === userSpray.id && (
                  <div className="px-4 pb-4 pt-2 border-t flex flex-col items-center gap-3" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}>
                    <div className="p-2.5 rounded-xl bg-white">
                      <QRCode data={getQRUrl(userSpray)} size={140} fgColor="#2D1F3D" bgColor="#FFFFFF" />
                    </div>
                    <p className="text-[11px] text-center" style={{ color: theme.textMuted }}>
                      Collez ce QR sur le flacon <span className="font-bold">#{userSpray.number}</span>.<br />
                      Scannez-le pour consulter le statut et la fiche actuelle. Ce lien ne permet pas d’identifier la composition du flacon.
                    </p>
                    <button
                      onClick={() => handlePrint(userSpray)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95"
                      style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', color: theme.textPrimary }}
                    >
                      <Printer className="w-4 h-4" /> Imprimer l’étiquette
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Modal — rendu via portal pour passer AU-DESSUS de la nav pill */}
      {showAddModal && createPortal(
        <div className="fixed inset-0 z-[200] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)} />
          <div
            className="relative w-full max-w-md rounded-t-3xl p-5 animate-slide-up"
            style={{
              background: darkMode ? '#2D1B4E' : 'white',
              maxHeight: '88vh',
              overflowY: 'auto',
              paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))',
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>Nouveau flacon</h3>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}>
                <X className="w-4 h-4" style={{ color: theme.textSecondary }} />
              </button>
            </div>
            <p className="text-sm mb-4" style={{ color: theme.textMuted }}>
              Ce sera le flacon <span className="font-bold" style={{ color: '#14B8A6' }}>#{getNextNumber()}</span>
            </p>

            {/* Type selector */}
            <div className="flex gap-2 mb-4">
              {(['spray', 'recette'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => { setSelectedType(type); setSelectedRecipeId(null); setCustomName(''); }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: selectedType === type ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)' : (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'), color: selectedType === type ? 'white' : theme.textSecondary }}
                >
                  {type === 'spray' ? '🧴 Indispensables' : '📋 Recettes'}
                </button>
              ))}
            </div>

            {/* Recipe list */}
            <p className="text-xs font-semibold mb-2" style={{ color: theme.textSecondary }}>1. Choisissez la recette</p>
            <div className="space-y-2 max-h-56 overflow-y-auto mb-4 -mx-1 px-1">
              {currentList.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => handleSelectRecipe(recipe.id)}
                  className="w-full p-3 rounded-xl flex items-center gap-3 text-left transition-all"
                  style={{ background: selectedRecipeId === recipe.id ? (darkMode ? 'rgba(20,184,166,0.2)' : 'rgba(20,184,166,0.1)') : (darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'), border: `1.5px solid ${selectedRecipeId === recipe.id ? '#14B8A6' : 'transparent'}` }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: recipe.gradient }}>
                    <span className="text-lg">{recipe.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: theme.textPrimary }}>{recipe.nom}</p>
                    <p className="text-[10px]" style={{ color: theme.textMuted }}>Durée de conservation non validée</p>
                  </div>
                  {selectedRecipeId === recipe.id && <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />}
                </button>
              ))}
            </div>

            {/* Custom name */}
            {selectedRecipe && (
              <div className="mb-4">
                <p className="text-xs font-semibold mb-2" style={{ color: theme.textSecondary }}>2. Nom du flacon (optionnel)</p>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder={selectedRecipe.nom}
                  maxLength={40}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', color: theme.textPrimary, border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}` }}
                />
              </div>
            )}

            <p className="mb-3 text-xs" style={{ color: theme.textMuted }}>La publication d’une fiche ne valide ni son efficacité ni sa conservation. Aucune date de validité ne sera calculée.</p>
            {storageError && <p role="alert" className="mb-3 text-sm" style={{ color: theme.textPrimary }}>{storageError}</p>}
            {/* Confirm */}
            <button
              onClick={handleAdd}
              disabled={!selectedRecipe || !canWrite}
              className="w-full py-3.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
              style={{ background: selectedRecipe ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)' : (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'), color: selectedRecipe ? 'white' : theme.textMuted }}
            >
              Créer le flacon #{getNextNumber()}
            </button>
          </div>
        </div>,
        document.body
      )}

      {showConfetti && <Confetti onDone={() => setShowConfetti(false)} />}
    </div>
  );
};
