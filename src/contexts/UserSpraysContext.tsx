'use client';

import { createContext, useContext, useState, useSyncExternalStore, ReactNode, useCallback } from 'react';
import type { UserSpray } from '@/types';
import { getRecipeAccess } from '@/data/publication';
import {
  initialUserSprayStorage, isUserSpray, nextUserSprayNumber,
  createUserSprayStorageController,
} from '@/utils/userSprayStorage';

interface UserSpraysContextType {
  sprays: UserSpray[];
  addSpray: (recipeId: number, recipeType: 'spray' | 'recette', name: string) => UserSpray | null;
  removeSpray: (id: string) => void;
  getNextNumber: () => number;
  isLoaded: boolean;
  canWrite: boolean;
  storageError: string | null;
  storageWarning: string | null;
  recoveryData: string | null;
}

const UserSpraysContext = createContext<UserSpraysContextType | null>(null);

const generateSprayId = () => (
  globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36)
);

export const useUserSprays = () => {
  const ctx = useContext(UserSpraysContext);
  if (!ctx) throw new Error('useUserSprays must be used within UserSpraysProvider');
  return ctx;
};

export const UserSpraysProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => createUserSprayStorageController(() => window.localStorage));
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, () => initialUserSprayStorage);
  const getNextNumber = useCallback(() => nextUserSprayNumber(store.getSnapshot().entries), [store]);

  const addSpray = useCallback((
    recipeId: number,
    recipeType: 'spray' | 'recette',
    name: string,
  ): UserSpray | null => {
    const current = store.getSnapshot();
    if (!current.isLoaded || !current.canWrite) return null;
    // The write boundary enforces publication, even for callers outside the picker.
    const access = getRecipeAccess(recipeId, recipeType);
    if (!access.available) {
      store.update({ ...current, error: access.message });
      return null;
    }
    const number = getNextNumber();
    if (!Number.isSafeInteger(number)) {
      store.update({ ...current, error: 'Aucun numéro de flacon supplémentaire ne peut être attribué.' });
      return null;
    }
    const newSpray: UserSpray = {
      id: generateSprayId(), number, recipeId, recipeType,
      name: name.trim() || access.recipe.nom,
      createdAt: new Date().toISOString(),
      // Editorial free text cannot establish the lifetime of a physical mixture.
      expiresAt: null,
    };
    return store.persist([...current.entries, newSpray]) ? newSpray : null;
  }, [getNextNumber, store]);

  const removeSpray = useCallback((id: string) => {
    const current = store.getSnapshot();
    if (!current.isLoaded || !current.canWrite) return;
    if (current.sprays.filter(spray => spray.id === id).length > 1) {
      store.update({ ...current, error: 'Plusieurs flacons portent le même identifiant. Téléchargez une copie pour les récupérer avant de les supprimer.' });
      return;
    }
    // Unknown entries are always retained, including ones with a similar id.
    store.persist(current.entries.filter(entry => !isUserSpray(entry) || entry.id !== id));
  }, [store]);

  return (
    <UserSpraysContext.Provider value={{
      sprays: state.sprays, addSpray, removeSpray, getNextNumber,
      isLoaded: state.isLoaded, canWrite: state.canWrite, storageError: state.error,
      storageWarning: state.warning, recoveryData: state.raw,
    }}>
      {children}
    </UserSpraysContext.Provider>
  );
};
