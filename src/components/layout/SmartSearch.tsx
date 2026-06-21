'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Search, X, ChevronRight, Layers, FlaskConical, Sparkles } from 'lucide-react';
import { haptic } from '@/utils/haptics';
import { searchAll, splitHighlight } from '@/utils/search';
import { Surface, RecetteComplete, IngredientComplet } from '@/types';

interface SmartSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSelectSurface: (surface: Surface) => void;
  onSelectRecipe: (recipe: RecetteComplete) => void;
  onSelectIngredient: (ingredient: IngredientComplet) => void;
  placeholder?: string;
}

// Surligne la portion de texte correspondant à la requête
const Highlight = ({ label, query, color }: { label: string; query: string; color: string }) => (
  <>
    {splitHighlight(label, query).map((seg, i) =>
      seg.hit ? (
        <mark key={i} style={{ background: 'transparent', color, fontWeight: 800 }}>
          {seg.text}
        </mark>
      ) : (
        <span key={i}>{seg.text}</span>
      )
    )}
  </>
);

export const SmartSearch = ({
  value,
  onChange,
  onSelectSurface,
  onSelectRecipe,
  onSelectIngredient,
  placeholder = 'Que voulez-vous nettoyer ?',
}: SmartSearchProps) => {
  const { theme, darkMode } = useTheme();
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchAll(value), [value]);
  const open = focused && value.trim().length >= 2;

  // Ferme le dropdown au tap en dehors
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const accentPink = theme.accentPink;
  const accent = darkMode ? '#FF85C0' : accentPink;

  const close = () => {
    setFocused(false);
    inputRef.current?.blur();
  };

  const pickSurface = (s: Surface) => { haptic('light'); onChange(''); close(); onSelectSurface(s); };
  const pickRecipe = (r: RecetteComplete) => { haptic('light'); onChange(''); close(); onSelectRecipe(r); };
  const pickIngredient = (i: IngredientComplet) => { haptic('light'); onChange(''); close(); onSelectIngredient(i); };

  const rowStyle = {
    background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
  };

  const GroupHeader = ({ icon, label, count }: { icon: React.ReactNode; label: string; count: number }) => (
    <div className="flex items-center gap-2 px-3 pt-3 pb-1.5">
      <span style={{ color: theme.textMuted }}>{icon}</span>
      <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>
        {label}
      </span>
      <span className="text-[10px] font-semibold" style={{ color: theme.textMuted, opacity: 0.7 }}>
        {count}
      </span>
    </div>
  );

  return (
    <div ref={wrapRef} className="relative z-[60]">
      {/* Champ */}
      <div
        className="relative"
        style={{
          background: theme.bgInput,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '16px',
          boxShadow: darkMode ? 'none' : theme.shadowCard,
          border: open
            ? `1.5px solid ${accent}`
            : darkMode ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
          transition: 'border-color 0.2s',
        }}
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: open ? accent : theme.textMuted }} />
        <input
          ref={inputRef}
          type="text"
          inputMode="search"
          enterKeyHint="search"
          aria-label="Rechercher une surface, une recette ou un ingrédient"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          className={`w-full py-3.5 pl-12 pr-10 bg-transparent outline-none text-sm font-medium ${
            darkMode ? 'placeholder:text-gray-400' : 'placeholder:text-gray-500'
          }`}
          style={{ color: theme.textPrimary }}
        />
        {value && (
          <button
            onClick={() => { onChange(''); inputRef.current?.blur(); setFocused(false); }}
            aria-label="Effacer la recherche"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
            style={{ background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
          >
            <X className="w-4 h-4" style={{ color: theme.textMuted }} />
          </button>
        )}
      </div>

      {/* Dropdown de résultats — ancré sous la barre, donc au-dessus du clavier */}
      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 rounded-2xl overflow-hidden animate-slideDown"
          style={{
            background: darkMode ? 'rgba(30,24,46,0.98)' : 'rgba(255,255,255,0.99)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: `1px solid ${darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)'}`,
            boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
            maxHeight: '60vh',
            overflowY: 'auto',
          }}
        >
          {results.total === 0 ? (
            <div className="px-4 py-8 text-center">
              <span className="text-3xl block mb-2">🔍</span>
              <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                Aucun résultat pour « {value.trim()} »
              </p>
              <p className="text-xs mt-1" style={{ color: theme.textMuted }}>
                Essayez « WC », « frigo », « baskets », « vitres »…
              </p>
            </div>
          ) : (
            <div className="pb-2">
              {/* Surfaces */}
              {results.surfaces.length > 0 && (
                <>
                  <GroupHeader icon={<Layers className="w-3.5 h-3.5" />} label="Surfaces" count={results.surfaces.length} />
                  <div className="px-2 space-y-1">
                    {results.surfaces.map(({ surface, recipeCount }) => (
                      <button
                        key={`s-${surface.id}`}
                        role="option"
                        aria-selected={false}
                        onClick={() => pickSurface(surface)}
                        className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-left transition-all active:scale-[0.99]"
                        style={rowStyle}
                      >
                        <span className="text-xl flex-shrink-0">{surface.emoji}</span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold truncate" style={{ color: theme.textPrimary }}>
                            <Highlight label={surface.nom} query={value} color={accent} />
                          </span>
                          <span className="block text-[11px] truncate" style={{ color: theme.textMuted }}>
                            {surface.piece} · {recipeCount} recette{recipeCount > 1 ? 's' : ''}
                          </span>
                        </span>
                        <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: theme.textMuted }} />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Recettes */}
              {results.recipes.length > 0 && (
                <>
                  <GroupHeader icon={<Sparkles className="w-3.5 h-3.5" />} label="Recettes" count={results.recipes.length} />
                  <div className="px-2 space-y-1">
                    {results.recipes.map(({ recipe }) => (
                      <button
                        key={`r-${recipe.id}`}
                        role="option"
                        aria-selected={false}
                        onClick={() => pickRecipe(recipe)}
                        className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-left transition-all active:scale-[0.99]"
                        style={rowStyle}
                      >
                        <span className="text-xl flex-shrink-0">{recipe.emoji}</span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold truncate" style={{ color: theme.textPrimary }}>
                            <Highlight label={recipe.nom} query={value} color={accent} />
                          </span>
                          <span className="block text-[11px] truncate" style={{ color: theme.textMuted }}>
                            {recipe.categorie} · {recipe.temps} · {recipe.difficulte}
                          </span>
                        </span>
                        <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: theme.textMuted }} />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Ingrédients */}
              {results.ingredients.length > 0 && (
                <>
                  <GroupHeader icon={<FlaskConical className="w-3.5 h-3.5" />} label="Ingrédients" count={results.ingredients.length} />
                  <div className="px-2 space-y-1">
                    {results.ingredients.map(({ ingredient }) => (
                      <button
                        key={`i-${ingredient.id}`}
                        role="option"
                        aria-selected={false}
                        onClick={() => pickIngredient(ingredient)}
                        className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-left transition-all active:scale-[0.99]"
                        style={rowStyle}
                      >
                        <span className="text-xl flex-shrink-0">{ingredient.emoji}</span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold truncate" style={{ color: theme.textPrimary }}>
                            <Highlight label={ingredient.nom} query={value} color={accent} />
                          </span>
                          {ingredient.fonctions?.[0] && (
                            <span className="block text-[11px] truncate" style={{ color: theme.textMuted }}>
                              {ingredient.fonctions.slice(0, 2).join(' · ')}
                            </span>
                          )}
                        </span>
                        <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: theme.textMuted }} />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
