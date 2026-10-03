'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'cleanz-my-devices';
const CHANGE_EVENT = 'cleanz:devices-changed';

type Snapshot = {
  ids: number[];
  status: 'ready' | 'invalid' | 'unavailable';
};

/** Read the existing inventory without migrating or rewriting it. */
const readInventory = (): Snapshot => {
  if (typeof window === 'undefined') return { ids: [], status: 'ready' };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return { ids: [], status: 'ready' };
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value) || !value.every((id) => typeof id === 'number' && Number.isFinite(id))) {
      return { ids: [], status: 'invalid' };
    }
    return { ids: value, status: 'ready' };
  } catch (error) {
    return { ids: [], status: error instanceof SyntaxError ? 'invalid' : 'unavailable' };
  }
};

export function useOwnedDevices() {
  const [snapshot, setSnapshot] = useState<Snapshot>(readInventory);

  useEffect(() => {
    const refresh = () => setSnapshot(readInventory());
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) refresh();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener(CHANGE_EVENT, refresh);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(CHANGE_EVENT, refresh);
    };
  }, []);

  const toggle = useCallback((id: number) => {
    // A different tab may have changed the inventory since this screen opened.
    // Only the selected identifier changes; unknown identifiers remain intact.
    const latest = readInventory();
    if (latest.status !== 'ready') {
      setSnapshot(latest);
      return false;
    }
    const next = latest.ids.includes(id)
      ? latest.ids.filter((existing) => existing !== id)
      : [...latest.ids, id];
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSnapshot({ ids: next, status: 'ready' });
      window.dispatchEvent(new Event(CHANGE_EVENT));
      return true;
    } catch {
      setSnapshot({ ids: latest.ids, status: 'unavailable' });
      return false;
    }
  }, []);

  return { owned: snapshot.ids, storageStatus: snapshot.status, toggle };
}
