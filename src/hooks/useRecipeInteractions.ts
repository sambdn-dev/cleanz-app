'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'cleanz-favorites';
const RATINGS_KEY = 'cleanz-ratings';

export interface UserRating {
  recipeId: number;
  rating: number;
  date: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger les favoris depuis localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(FAVORITES_KEY);
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

  // Sauvegarder les favoris
  const saveFavorites = useCallback((newFavorites: number[]) => {
    setFavorites(newFavorites);
    if (typeof window !== 'undefined') {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    }
  }, []);

  // Toggle favori
  const toggleFavorite = useCallback((recipeId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId];

      if (typeof window !== 'undefined') {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      }
      return newFavorites;
    });
  }, []);

  // Vérifier si une recette est en favori
  const isFavorite = useCallback((recipeId: number) => {
    return favorites.includes(recipeId);
  }, [favorites]);

  return {
    favorites,
    isLoaded,
    toggleFavorite,
    isFavorite,
    saveFavorites
  };
}

export function useRatings() {
  const [ratings, setRatings] = useState<UserRating[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger les notes depuis localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(RATINGS_KEY);
      if (stored) {
        try {
          setRatings(JSON.parse(stored));
        } catch {
          setRatings([]);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Ajouter ou mettre à jour une note
  const setRating = useCallback((recipeId: number, rating: number) => {
    setRatings(prev => {
      const existing = prev.findIndex(r => r.recipeId === recipeId);
      let newRatings: UserRating[];

      if (existing >= 0) {
        newRatings = [...prev];
        newRatings[existing] = {
          recipeId,
          rating,
          date: new Date().toISOString()
        };
      } else {
        newRatings = [...prev, {
          recipeId,
          rating,
          date: new Date().toISOString()
        }];
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(RATINGS_KEY, JSON.stringify(newRatings));
      }
      return newRatings;
    });
  }, []);

  // Obtenir la note d'une recette
  const getRating = useCallback((recipeId: number): number | null => {
    const found = ratings.find(r => r.recipeId === recipeId);
    return found ? found.rating : null;
  }, [ratings]);

  return {
    ratings,
    isLoaded,
    setRating,
    getRating
  };
}

// Hook combiné pour faciliter l'usage
export function useRecipeInteractions() {
  const { favorites, toggleFavorite, isFavorite, isLoaded: favoritesLoaded } = useFavorites();
  const { ratings, setRating, getRating, isLoaded: ratingsLoaded } = useRatings();

  return {
    favorites,
    ratings,
    toggleFavorite,
    isFavorite,
    setRating,
    getRating,
    isLoaded: favoritesLoaded && ratingsLoaded
  };
}
