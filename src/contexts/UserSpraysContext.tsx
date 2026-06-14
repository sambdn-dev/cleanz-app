'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { UserSpray } from '@/types';

interface UserSpraysContextType {
  sprays: UserSpray[];
  addSpray: (recipeId: number, recipeType: 'spray' | 'recette', name: string, conservation: string) => UserSpray;
  removeSpray: (id: string) => void;
  getNextNumber: () => number;
}

const UserSpraysContext = createContext<UserSpraysContextType | null>(null);

export const useUserSprays = () => {
  const ctx = useContext(UserSpraysContext);
  if (!ctx) throw new Error('useUserSprays must be used within UserSpraysProvider');
  return ctx;
};

// Parse conservation string to days
const parseConservation = (conservation: string): number => {
  const lower = conservation.toLowerCase();
  const num = parseInt(lower) || 1;
  if (lower.includes('semaine')) return num * 7;
  if (lower.includes('mois')) return num * 30;
  if (lower.includes('an')) return num * 365;
  if (lower.includes('jour')) return num;
  if (lower.includes('usage') || lower.includes('immédiat')) return 1;
  return 90; // Default 3 mois
};

const genId = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

export const UserSpraysProvider = ({ children }: { children: ReactNode }) => {
  const [sprays, setSprays] = useState<UserSpray[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cleanz-user-sprays');
      if (stored) setSprays(JSON.parse(stored));
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('cleanz-user-sprays', JSON.stringify(sprays));
  }, [sprays]);

  const getNextNumber = useCallback(() => {
    if (sprays.length === 0) return 1;
    return Math.max(...sprays.map(s => s.number)) + 1;
  }, [sprays]);

  const addSpray = useCallback((
    recipeId: number,
    recipeType: 'spray' | 'recette',
    name: string,
    conservation: string
  ): UserSpray => {
    const now = new Date();
    const days = parseConservation(conservation);
    const expires = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const newSpray: UserSpray = {
      id: genId(),
      number: getNextNumber(),
      recipeId,
      recipeType,
      name,
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
    };

    setSprays(prev => [...prev, newSpray]);
    return newSpray;
  }, [getNextNumber]);

  const removeSpray = useCallback((id: string) => {
    setSprays(prev => prev.filter(s => s.id !== id));
  }, []);

  return (
    <UserSpraysContext.Provider value={{ sprays, addSpray, removeSpray, getNextNumber }}>
      {children}
    </UserSpraysContext.Provider>
  );
};
