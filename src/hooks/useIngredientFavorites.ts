'use client';

import { useState, useEffect, useCallback } from 'react';

const KEY = 'cleanz-ingredient-favorites';

/**
 * Favoris d'ingrédients persistés en localStorage.
 * Même convention que useFavorites (recettes) : persistance synchrone dans
 * le callback, garde `typeof window`, flag `isLoaded`.
 */
export function useIngredientFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(KEY);
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
        } catch {
          setFavorites([]);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      if (typeof window !== 'undefined') {
        localStorage.setItem(KEY, JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);

  return { favorites, isLoaded, toggleFavorite, isFavorite };
}
