'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useIngredientFavorites } from '@/hooks/useIngredientFavorites';

interface IngredientFavoritesContextType {
  favorites: number[];
  isLoaded: boolean;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const IngredientFavoritesContext = createContext<IngredientFavoritesContextType | undefined>(
  undefined
);

export function IngredientFavoritesProvider({ children }: { children: ReactNode }) {
  const value = useIngredientFavorites();
  return (
    <IngredientFavoritesContext.Provider value={value}>
      {children}
    </IngredientFavoritesContext.Provider>
  );
}

export function useIngredientFavoritesContext() {
  const context = useContext(IngredientFavoritesContext);
  if (context === undefined) {
    throw new Error(
      'useIngredientFavoritesContext must be used within an IngredientFavoritesProvider'
    );
  }
  return context;
}
