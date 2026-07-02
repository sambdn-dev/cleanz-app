'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Plus, Trash2, Sparkles, Search, ShoppingBag } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRecipeInteractionsContext } from '@/contexts/RecipeInteractionsContext';
import { RECETTES } from '@/data/recettes';
import { INGREDIENTS_COMPLETS } from '@/data/ingredientsComplets';
import { normalize, splitHighlight } from '@/utils/search';
import { haptic } from '@/utils/haptics';
import { SubPageShell } from './SubPageShell';

interface Item {
  id: string;
  label: string;
  done: boolean;
  emoji?: string;
}

const KEY = 'cleanz-shopping-list';
const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const loadItems = (): Item[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Item[]) : [];
  } catch {
    return [];
  }
};

/** Emoji d'un article à partir du catalogue d'ingrédients (repli 🧴). */
const emojiFor = (label: string): string => {
  const n = normalize(label);
  const hit = INGREDIENTS_COMPLETS.find(
    (i) => normalize(i.nom) === n || normalize(i.nom).startsWith(n) || n.startsWith(normalize(i.nom))
  );
  return hit?.emoji || '🧴';
};

export const ShoppingListPage = ({ onClose }: { onClose: () => void }) => {
  const { theme, darkMode } = useTheme();
  const { favorites } = useRecipeInteractionsContext();
  const [items, setItems] = useState<Item[]>(() => (typeof window !== 'undefined' ? loadItems() : []));
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  // Ferme le dropdown au tap en dehors
  useEffect(() => {
    if (!focused) return;
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [focused]);

  const inList = (label: string) => items.some((i) => normalize(i.label) === normalize(label));

  const add = (label: string, emoji?: string) => {
    const l = label.trim();
    if (!l || inList(l)) return;
    haptic('light');
    setItems((p) => [{ id: newId(), label: l, done: false, emoji: emoji || emojiFor(l) }, ...p]);
  };

  const submitInput = () => {
    add(input);
    setInput('');
    inputRef.current?.focus();
  };

  const pickSuggestion = (label: string, emoji: string) => {
    add(label, emoji);
    setInput('');
    inputRef.current?.focus();
  };

  /* ----- Suggestions intelligentes ----- */
  // En tapant : ingrédients du catalogue qui matchent (accents ignorés)
  const matches = useMemo(() => {
    const q = normalize(input.trim());
    if (q.length < 1) return [];
    return INGREDIENTS_COMPLETS
      .filter((i) => normalize(i.nom).includes(q) && !inList(i.nom))
      .slice(0, 6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, items]);

  // Champ vide + focus : les essentiels pas encore dans la liste, en accès direct
  const quickPicks = useMemo(
    () => INGREDIENTS_COMPLETS.filter((i) => i.essentiel && !inList(i.nom)).slice(0, 8),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items]
  );

  const showDropdown = focused && matches.length > 0;

  const addFromFavorites = () => {
    haptic('light');
    const favRecipes = RECETTES.filter((r) => favorites.includes(r.id));
    const known = new Set(items.map((i) => normalize(i.label)));
    const toAdd: Item[] = [];
    favRecipes.forEach((r) =>
      r.ingredients.forEach((ing) => {
        const name = ing.nom.replace(/\s*\(.*?\)\s*/g, '').trim(); // retire « (optionnel) » etc.
        if (name && !known.has(normalize(name))) {
          known.add(normalize(name));
          toAdd.push({ id: newId(), label: name, done: false, emoji: ing.emoji || emojiFor(name) });
        }
      })
    );
    if (toAdd.length) setItems((p) => [...toAdd, ...p]);
  };

  const toggle = (id: string) => {
    haptic('selection');
    setItems((p) => p.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  };
  const remove = (id: string) => {
    haptic('light');
    setItems((p) => p.filter((i) => i.id !== id));
  };
  const clearDone = () => {
    haptic('selection');
    setItems((p) => p.filter((i) => !i.done));
  };

  const todo = items.filter((i) => !i.done);
  const done = items.filter((i) => i.done);
  const progress = items.length ? done.length / items.length : 0;

  const accent = theme.accentPink;

  return (
    <SubPageShell title="Ma liste de courses" emoji="🛒" onClose={onClose}>
      {/* Barre de progression (visible dès qu'il y a des articles) */}
      {items.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold" style={{ color: theme.textSecondary }}>
              {todo.length > 0
                ? `${todo.length} article${todo.length > 1 ? 's' : ''} à acheter`
                : 'Courses terminées 🎉'}
            </span>
            <span className="text-[11px] font-semibold" style={{ color: theme.textMuted }}>
              {done.length}/{items.length}
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.round(progress * 100)}%`,
                background: 'linear-gradient(90deg, #10B981 0%, #5EEAD4 100%)',
              }}
            />
          </div>
        </div>
      )}

      {/* Recherche intelligente + ajout */}
      <div ref={wrapRef} className="relative z-[60] mb-3">
        <form
          onSubmit={(e) => { e.preventDefault(); submitInput(); }}
          className="flex gap-2"
        >
          <div
            className="flex-1 flex items-center gap-2.5 px-3.5 rounded-2xl"
            style={{
              background: theme.bgInput,
              border: `1.5px solid ${showDropdown ? accent : theme.borderLight}`,
              transition: 'border-color 0.2s',
            }}
          >
            <Search className="w-4 h-4 flex-shrink-0" style={{ color: showDropdown ? accent : theme.textMuted }} />
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              enterKeyHint="done"
              placeholder="Vinaigre, bicarbonate, savon…"
              className="flex-1 py-3 bg-transparent text-sm outline-none min-w-0"
              style={{ color: theme.textPrimary }}
            />
          </div>
          <button
            type="submit"
            aria-label="Ajouter"
            disabled={!input.trim()}
            className="px-4 rounded-2xl text-white flex items-center justify-center transition-transform active:scale-95 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' }}
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        {/* Dropdown de suggestions (catalogue d'ingrédients) */}
        {showDropdown && (
          <div
            role="listbox"
            className="absolute left-0 right-0 top-full mt-2 rounded-2xl overflow-hidden animate-slideDown"
            style={{
              background: darkMode ? 'rgba(38,28,62,0.98)' : 'rgba(255,255,255,0.99)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: `1px solid ${darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)'}`,
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
            }}
          >
            <div className="p-1.5 space-y-0.5">
              {matches.map((ing) => (
                <button
                  key={ing.id}
                  role="option"
                  aria-selected={false}
                  onClick={() => pickSuggestion(ing.nom, ing.emoji)}
                  className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-left transition-all active:scale-[0.99]"
                  style={{ background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}
                >
                  <span className="text-lg flex-shrink-0" aria-hidden>{ing.emoji}</span>
                  <span className="flex-1 min-w-0 text-sm font-semibold truncate" style={{ color: theme.textPrimary }}>
                    {splitHighlight(ing.nom, input).map((seg, i) =>
                      seg.hit ? (
                        <mark key={i} style={{ background: 'transparent', color: accent, fontWeight: 800 }}>{seg.text}</mark>
                      ) : (
                        <span key={i}>{seg.text}</span>
                      )
                    )}
                  </span>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}
                  >
                    <Plus className="w-3.5 h-3.5" style={{ color: accent }} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Accès rapide : les essentiels en un tap */}
      {quickPicks.length > 0 && !input && (
        <div className="mb-4">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: theme.textMuted }}>
            Ajout rapide
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickPicks.map((ing) => (
              <button
                key={ing.id}
                onClick={() => add(ing.nom, ing.emoji)}
                className="flex items-center gap-1.5 pl-2 pr-2.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95"
                style={{
                  background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.8)',
                  border: `1px solid ${theme.borderLight}`,
                  color: theme.textSecondary,
                }}
              >
                <span aria-hidden>{ing.emoji}</span>
                {ing.nom}
                <Plus className="w-3 h-3" style={{ color: accent }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Générer depuis les favoris */}
      <button
        onClick={addFromFavorites}
        disabled={favorites.length === 0}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold mb-5 transition-transform active:scale-[0.98] disabled:opacity-40"
        style={{ background: darkMode ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.08)', color: '#A78BFA', border: `1px solid ${theme.borderLight}` }}
      >
        <Sparkles className="w-4 h-4" />
        Importer depuis mes recettes favorites
      </button>

      {items.length === 0 ? (
        <div className="text-center py-10">
          <div
            className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ background: darkMode ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.08)' }}
          >
            <ShoppingBag className="w-9 h-9" style={{ color: '#A78BFA' }} />
          </div>
          <p className="text-sm font-bold mb-1" style={{ color: theme.textPrimary }}>Ta liste est vide</p>
          <p className="text-xs max-w-[240px] mx-auto" style={{ color: theme.textMuted }}>
            Tape un ingrédient, pioche dans l&apos;ajout rapide ou importe depuis tes recettes favorites.
          </p>
        </div>
      ) : (
        <>
          {/* À acheter */}
          {todo.length > 0 && (
            <div className="space-y-2 mb-5">
              {todo.map((i) => (
                <ItemRow key={i.id} item={i} onToggle={toggle} onRemove={remove} theme={theme} darkMode={darkMode} />
              ))}
            </div>
          )}

          {/* Dans le panier */}
          {done.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: theme.textMuted }}>
                  Dans le panier ({done.length})
                </span>
                <button onClick={clearDone} className="text-xs font-semibold" style={{ color: '#EC4899' }}>
                  Tout retirer
                </button>
              </div>
              <div className="space-y-2">
                {done.map((i) => (
                  <ItemRow key={i.id} item={i} onToggle={toggle} onRemove={remove} theme={theme} darkMode={darkMode} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </SubPageShell>
  );
};

interface ItemRowProps {
  item: Item;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  theme: ReturnType<typeof useTheme>['theme'];
  darkMode: boolean;
}

const ItemRow = ({ item, onToggle, onRemove, theme, darkMode }: ItemRowProps) => (
  <div
    className="flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all"
    style={{
      background: theme.bgCardSolid,
      border: `1px solid ${theme.borderLight}`,
      opacity: item.done ? 0.65 : 1,
    }}
  >
    <button
      onClick={() => onToggle(item.id)}
      aria-label={item.done ? 'Décocher' : 'Cocher'}
      aria-pressed={item.done}
      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
      style={{
        background: item.done ? '#10B981' : 'transparent',
        border: `2px solid ${item.done ? '#10B981' : (darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)')}`,
      }}
    >
      {item.done && <span className="text-white text-xs font-bold">✓</span>}
    </button>
    <span className="text-lg flex-shrink-0" aria-hidden>{item.emoji || '🧴'}</span>
    <span
      className="flex-1 text-sm font-medium min-w-0 truncate"
      style={{ color: item.done ? theme.textMuted : theme.textPrimary, textDecoration: item.done ? 'line-through' : 'none' }}
    >
      {item.label}
    </span>
    <button onClick={() => onRemove(item.id)} aria-label="Supprimer" className="p-1.5 transition-transform active:scale-90">
      <Trash2 className="w-4 h-4" style={{ color: theme.textMuted }} />
    </button>
  </div>
);
