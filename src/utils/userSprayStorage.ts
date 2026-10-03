import type { UserSpray } from '@/types';

export const USER_SPRAYS_STORAGE_KEY = 'cleanz-user-sprays';

type SprayStorage = Pick<Storage, 'getItem' | 'setItem'>;

export interface UserSprayStorageState {
  sprays: UserSpray[];
  /** Keep unknown records and additional fields, without a destructive migration. */
  entries: unknown[];
  raw: string | null;
  isLoaded: boolean;
  canWrite: boolean;
  error: string | null;
  warning: string | null;
}

export const initialUserSprayStorage: UserSprayStorageState = {
  sprays: [], entries: [], raw: null, isLoaded: false, canWrite: false, error: null, warning: null,
};

export const isUserSpray = (value: unknown): value is UserSpray => {
  if (!value || typeof value !== 'object') return false;
  const spray = value as Record<string, unknown>;
  return typeof spray.id === 'string' && spray.id.length > 0
    && typeof spray.number === 'number' && Number.isSafeInteger(spray.number) && spray.number > 0
    && typeof spray.recipeId === 'number' && Number.isSafeInteger(spray.recipeId) && spray.recipeId > 0
    && (spray.recipeType === 'spray' || spray.recipeType === 'recette')
    && typeof spray.name === 'string'
    && typeof spray.createdAt === 'string'
    && (spray.expiresAt === null || typeof spray.expiresAt === 'string');
};

const arrayState = (entries: unknown[], raw: string | null): UserSprayStorageState => {
  const sprays = entries.filter(isUserSpray);
  const unknownCount = entries.length - sprays.length;
  return {
    entries, sprays, raw, isLoaded: true, canWrite: true, error: null,
    warning: unknownCount > 0
      ? `${unknownCount} enregistrement(s) incomplet(s) conservé(s), mais non affichable(s). Téléchargez une copie pour les récupérer.`
      : null,
  };
};

/** Loading is read-only, including empty, incomplete and malformed storage. */
export const readUserSprayStorage = (storage: SprayStorage): UserSprayStorageState => {
  let raw: string | null = null;
  try {
    raw = storage.getItem(USER_SPRAYS_STORAGE_KEY);
    if (raw === null) return arrayState([], null);
    const entries: unknown = JSON.parse(raw);
    if (Array.isArray(entries)) return arrayState(entries, raw);
  } catch {
    // Keep the exact bytes when JSON is malformed; an unreadable store is never reset.
  }
  return {
    ...initialUserSprayStorage, raw, isLoaded: true,
    error: raw === null
      ? 'Les flacons enregistrés sont inaccessibles. Aucune donnée ne sera écrasée. Rétablissez le stockage du navigateur puis rechargez la page.'
      : 'Les données des flacons sont illisibles. Elles sont conservées : téléchargez une copie avant toute récupération.',
  };
};

/** Write only after a successful read; detect a newer write from another tab. */
export const writeUserSprayStorage = (
  storage: SprayStorage,
  previous: UserSprayStorageState,
  entries: unknown[],
): UserSprayStorageState => {
  if (!previous.isLoaded || !previous.canWrite) return previous;
  try {
    if (storage.getItem(USER_SPRAYS_STORAGE_KEY) !== previous.raw) {
      return {
        ...previous, canWrite: false,
        error: 'Les flacons ont été modifiés dans un autre onglet. Rechargez la page pour retrouver la dernière version ; aucune donnée n’a été écrasée.',
      };
    }
    const raw = JSON.stringify(entries);
    storage.setItem(USER_SPRAYS_STORAGE_KEY, raw);
    return arrayState(entries, raw);
  } catch {
    return {
      ...previous,
      error: 'L’enregistrement a échoué. Les flacons précédents sont conservés. Vérifiez l’espace disponible et l’accès au stockage, puis réessayez.',
    };
  }
};

export const nextUserSprayNumber = (entries: readonly unknown[]): number => (
  entries.reduce<number>((highest, entry) => {
    if (!entry || typeof entry !== 'object') return highest;
    const number = (entry as Record<string, unknown>).number;
    // Reserve recognizable numbers even when another field needs recovery.
    return typeof number === 'number' && Number.isSafeInteger(number)
      ? Math.max(highest, number) : highest;
  }, 0) + 1
);

/** One controller per provider, with a stable server snapshot for hydration. */
export const createUserSprayStorageController = (getStorage: () => SprayStorage) => {
  let state = initialUserSprayStorage;
  const listeners = new Set<() => void>();
  const update = (next: UserSprayStorageState) => {
    state = next;
    listeners.forEach(listener => listener());
  };
  return {
    getSnapshot: () => state,
    update,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      if (!state.isLoaded) {
        try {
          update(readUserSprayStorage(getStorage()));
        } catch {
          // The localStorage property itself can throw in restricted browsers.
          update({ ...initialUserSprayStorage, isLoaded: true, error: 'Le stockage des flacons est inaccessible. Aucune donnée ne sera écrasée.' });
        }
      }
      return () => { listeners.delete(listener); };
    },
    persist: (entries: unknown[]): boolean => {
      if (!state.isLoaded || !state.canWrite) return false;
      try {
        const next = writeUserSprayStorage(getStorage(), state, entries);
        update(next);
        return next.canWrite && next.error === null;
      } catch {
        update({ ...state, error: 'L’enregistrement a échoué. Les flacons précédents sont conservés.' });
        return false;
      }
    },
  };
};
