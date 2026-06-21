'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRecipeInteractionsContext } from '@/contexts/RecipeInteractionsContext';
import { RECETTES } from '@/data/recettes';
import { haptic } from '@/utils/haptics';
import { SubPageShell } from './SubPageShell';

interface Item {
  id: string;
  label: string;
  done: boolean;
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

export const ShoppingListPage = ({ onClose }: { onClose: () => void }) => {
  const { theme, darkMode } = useTheme();
  const { favorites } = useRecipeInteractionsContext();
  const [items, setItems] = useState<Item[]>(() => (typeof window !== 'undefined' ? loadItems() : []));
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add = (label: string) => {
    const l = label.trim();
    if (!l) return;
    if (items.some((i) => i.label.toLowerCase() === l.toLowerCase())) return;
    haptic('light');
    setItems((p) => [{ id: newId(), label: l, done: false }, ...p]);
  };

  const addFromFavorites = () => {
    haptic('light');
    const favRecipes = RECETTES.filter((r) => favorites.includes(r.id));
    const known = new Set(items.map((i) => i.label.toLowerCase()));
    const toAdd: Item[] = [];
    favRecipes.forEach((r) =>
      r.ingredients.forEach((ing) => {
        const name = ing.nom.replace(/\s*\(.*?\)\s*/g, '').trim(); // retire « (optionnel) » etc.
        if (name && !known.has(name.toLowerCase())) {
          known.add(name.toLowerCase());
          toAdd.push({ id: newId(), label: name, done: false });
        }
      })
    );
    if (toAdd.length) setItems((p) => [...toAdd, ...p]);
  };

  const toggle = (id: string) => {
    haptic('selection');
    setItems((p) => p.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  };
  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));
  const clearDone = () => setItems((p) => p.filter((i) => !i.done));

  const todo = items.filter((i) => !i.done);
  const done = items.filter((i) => i.done);

  return (
    <SubPageShell title="Ma liste de courses" emoji="🛒" onClose={onClose}>
      {/* Ajout manuel */}
      <form
        onSubmit={(e) => { e.preventDefault(); add(input); setInput(''); }}
        className="flex gap-2 mb-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ajouter un article (ex. Vinaigre blanc)"
          className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: theme.bgInput, color: theme.textPrimary, border: `1px solid ${theme.borderLight}` }}
        />
        <button
          type="submit"
          aria-label="Ajouter"
          className="px-4 rounded-xl text-white flex items-center justify-center transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' }}
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      {/* Générer depuis les favoris */}
      <button
        onClick={addFromFavorites}
        disabled={favorites.length === 0}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold mb-5 transition-transform active:scale-[0.98] disabled:opacity-40"
        style={{ background: darkMode ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.08)', color: '#8B5CF6', border: `1px solid ${theme.borderLight}` }}
      >
        <Sparkles className="w-4 h-4" />
        Ajouter les ingrédients de mes recettes favorites
      </button>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-5xl block mb-3">🧺</span>
          <p className="text-sm font-semibold mb-1" style={{ color: theme.textPrimary }}>Ta liste est vide</p>
          <p className="text-xs" style={{ color: theme.textMuted }}>Ajoute des articles ou importe-les depuis tes recettes favorites.</p>
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
    className="flex items-center gap-3 px-3.5 py-3 rounded-xl"
    style={{ background: theme.bgCardSolid, border: `1px solid ${theme.borderLight}` }}
  >
    <button
      onClick={() => onToggle(item.id)}
      aria-label={item.done ? 'Décocher' : 'Cocher'}
      aria-pressed={item.done}
      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
      style={{
        background: item.done ? '#10B981' : 'transparent',
        border: `2px solid ${item.done ? '#10B981' : (darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)')}`,
      }}
    >
      {item.done && <span className="text-white text-xs font-bold">✓</span>}
    </button>
    <span
      className="flex-1 text-sm"
      style={{ color: item.done ? theme.textMuted : theme.textPrimary, textDecoration: item.done ? 'line-through' : 'none' }}
    >
      {item.label}
    </span>
    <button onClick={() => onRemove(item.id)} aria-label="Supprimer" className="p-1 transition-transform active:scale-90">
      <Trash2 className="w-4 h-4" style={{ color: theme.textMuted }} />
    </button>
  </div>
);
