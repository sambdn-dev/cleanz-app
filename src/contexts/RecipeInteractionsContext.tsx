'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useRecipeInteractions } from '@/hooks/useRecipeInteractions';

interface RecipeInteractionsContextType {
  favorites: number[];
  ratings: { recipeId: number; rating: number; date: string }[];
  toggleFavorite: (recipeId: number) => void;
  isFavorite: (recipeId: number) => boolean;
  setRating: (recipeId: number, rating: number) => void;
  getRating: (recipeId: number) => number | null;
  isLoaded: boolean;
}

const RecipeInteractionsContext = createContext<RecipeInteractionsContextType | undefined>(undefined);

export function RecipeInteractionsProvider({ children }: { children: ReactNode }) {
  const interactions = useRecipeInteractions();

  return (
    <RecipeInteractionsContext.Provider value={interactions}>
      {children}
    </RecipeInteractionsContext.Provider>
  );
}

export function useRecipeInteractionsContext() {
  const context = useContext(RecipeInteractionsContext);
  if (context === undefined) {
    throw new Error('useRecipeInteractionsContext must be used within a RecipeInteractionsProvider');
  }
  return context;
}
