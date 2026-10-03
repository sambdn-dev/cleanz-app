/** Run: node --experimental-strip-types scripts/test-user-spray-storage.mts */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  USER_SPRAYS_STORAGE_KEY, initialUserSprayStorage, readUserSprayStorage,
  writeUserSprayStorage, nextUserSprayNumber, isUserSpray,
  createUserSprayStorageController,
} from '../src/utils/userSprayStorage.ts';
import {
  buildFicheUrl, getHistoricalExpiryLabel, parseConservationToDays, escapeLabelHtml,
} from '../src/utils/sprayUtils.ts';

const oldBottle = {
  id: 'old-42', number: 42, recipeId: 13, recipeType: 'recette' as const,
  name: 'Mon flacon historique', createdAt: '2026-01-01T00:00:00.000Z',
  expiresAt: '2026-04-01T00:00:00.000Z', customLegacyField: { mustRemain: true },
};
const memoryStore = (initial: string | null) => {
  let value = initial;
  let writes = 0;
  return {
    getItem(key: string) { assert.equal(key, USER_SPRAYS_STORAGE_KEY); return value; },
    setItem(key: string, next: string) { assert.equal(key, USER_SPRAYS_STORAGE_KEY); value = next; writes++; },
    get writes() { return writes; },
  };
};

test('initial and repeated reads never overwrite existing bottle data', () => {
  const raw = JSON.stringify([oldBottle], null, 2);
  const storage = memoryStore(raw);
  assert.deepEqual(readUserSprayStorage(storage).sprays, [oldBottle]);
  assert.deepEqual(readUserSprayStorage(storage).sprays, [oldBottle]);
  assert.equal(storage.getItem(USER_SPRAYS_STORAGE_KEY), raw);
  assert.equal(storage.writes, 0);
});

test('writes before initial read are refused', () => {
  const storage = memoryStore(JSON.stringify([oldBottle]));
  assert.equal(writeUserSprayStorage(storage, initialUserSprayStorage, []), initialUserSprayStorage);
  assert.equal(storage.writes, 0);
});

test('provider subscription reads before writes and resubscription preserves the saved state', () => {
  const raw = JSON.stringify([oldBottle], null, 2);
  const storage = memoryStore(raw);
  const store = createUserSprayStorageController(() => storage);
  let notifications = 0;
  assert.equal(store.persist([]), false);
  assert.equal(storage.writes, 0);
  const unsubscribe = store.subscribe(() => notifications++);
  assert.deepEqual(store.getSnapshot().sprays, [oldBottle]);
  assert.equal(storage.writes, 0);
  unsubscribe();
  const unsubscribeAgain = store.subscribe(() => notifications++);
  assert.equal(storage.getItem(USER_SPRAYS_STORAGE_KEY), raw);
  const added = { ...oldBottle, id: 'new', number: 43, expiresAt: null };
  assert.equal(store.persist([...store.getSnapshot().entries, added]), true);
  assert.equal(nextUserSprayNumber(store.getSnapshot().entries), 44);
  assert.deepEqual(store.getSnapshot().sprays, [oldBottle, added]);
  assert.equal(notifications, 2);
  unsubscribeAgain();
});

test('a denied localStorage property leaves provider writes disabled', () => {
  const store = createUserSprayStorageController(() => { throw new Error('Storage denied'); });
  const unsubscribe = store.subscribe(() => {});
  assert.equal(store.getSnapshot().isLoaded, true);
  assert.equal(store.getSnapshot().canWrite, false);
  assert.ok(store.getSnapshot().error);
  assert.equal(store.persist([]), false);
  unsubscribe();
});

test('missing, blocked and merged source references remain intact across edits', () => {
  const records = [oldBottle,
    { ...oldBottle, id: 'missing', number: 67, recipeId: 99999 },
    { ...oldBottle, id: 'old-spray', number: 81, recipeType: 'spray' as const, recipeId: 2 },
  ];
  const storage = memoryStore(JSON.stringify(records));
  const before = readUserSprayStorage(storage);
  assert.deepEqual(before.sprays, records);
  assert.equal(nextUserSprayNumber(before.sprays), 82);
  const added = { ...oldBottle, id: 'new', number: 82, recipeId: 3, expiresAt: null };
  const after = writeUserSprayStorage(storage, before, [...before.entries, added]);
  assert.equal(after.error, null);
  assert.deepEqual(JSON.parse(storage.getItem(USER_SPRAYS_STORAGE_KEY)!).slice(0, 3), records);
  assert.equal(buildFicheUrl('https://cleanz.app', after.sprays[2].recipeType, after.sprays[2].recipeId), 'https://cleanz.app/?fiche=spray-2');
});

test('unrecognized records and additional legacy fields survive add and removal', () => {
  const unknown = { id: oldBottle.id, number: 100, name: 'Recoverable incomplete bottle', additional: ['keep'] };
  const entries = [null, unknown, oldBottle, 'unrecognized'];
  const storage = memoryStore(JSON.stringify(entries));
  const before = readUserSprayStorage(storage);
  assert.ok(before.warning);
  assert.deepEqual(before.sprays, [oldBottle]);
  assert.equal(nextUserSprayNumber(before.entries), 101);
  const added = { ...oldBottle, id: 'new', number: 43 };
  const afterAdd = writeUserSprayStorage(storage, before, [...before.entries, added]);
  assert.deepEqual(JSON.parse(storage.getItem(USER_SPRAYS_STORAGE_KEY)!).slice(0, 4), entries);
  const remaining = afterAdd.entries.filter(entry => !isUserSpray(entry) || entry.id !== oldBottle.id);
  writeUserSprayStorage(storage, afterAdd, remaining);
  assert.deepEqual(JSON.parse(storage.getItem(USER_SPRAYS_STORAGE_KEY)!), [null, unknown, 'unrecognized', added]);
});

for (const raw of ['[{"id":"recoverable"}', '{"bottles":[]}', 'null', '']) {
  test(`malformed or unsupported storage is kept byte for byte: ${JSON.stringify(raw)}`, () => {
    const storage = memoryStore(raw);
    const state = readUserSprayStorage(storage);
    assert.equal(state.raw, raw);
    assert.equal(state.canWrite, false);
    assert.ok(state.error);
    writeUserSprayStorage(storage, state, []);
    assert.equal(storage.writes, 0);
    assert.equal(storage.getItem(USER_SPRAYS_STORAGE_KEY), raw);
  });
}

test('blocked storage reads cannot lead to an empty overwrite', () => {
  let writes = 0;
  const storage = {
    getItem() { throw new Error('Access denied'); },
    setItem() { writes++; },
  };
  const state = readUserSprayStorage(storage);
  assert.ok(state.error);
  writeUserSprayStorage(storage, state, []);
  assert.equal(writes, 0);
});

test('quota or write errors retain the previous state and remain retryable', () => {
  const raw = JSON.stringify([oldBottle]);
  let denyWrite = true;
  const underlying = memoryStore(raw);
  const storage = {
    getItem: underlying.getItem,
    setItem(key: string, value: string) {
      if (denyWrite) throw new Error('Quota exceeded');
      underlying.setItem(key, value);
    },
  };
  const before = readUserSprayStorage(storage);
  const failed = writeUserSprayStorage(storage, before, []);
  assert.ok(failed.error);
  assert.deepEqual(failed.sprays, [oldBottle]);
  assert.equal(underlying.getItem(USER_SPRAYS_STORAGE_KEY), raw);
  denyWrite = false;
  const retried = writeUserSprayStorage(storage, failed, []);
  assert.equal(retried.error, null);
  assert.equal(underlying.getItem(USER_SPRAYS_STORAGE_KEY), '[]');
});

test('a newer save from another tab is not overwritten', () => {
  const storage = memoryStore(JSON.stringify([oldBottle]));
  const before = readUserSprayStorage(storage);
  const newer = JSON.stringify([oldBottle, { ...oldBottle, id: 'other-tab', number: 43 }]);
  storage.setItem(USER_SPRAYS_STORAGE_KEY, newer);
  const after = writeUserSprayStorage(storage, before, []);
  assert.ok(after.error);
  assert.equal(after.canWrite, false);
  assert.equal(storage.writes, 1);
  assert.equal(storage.getItem(USER_SPRAYS_STORAGE_KEY), newer);
});

test('legacy dates are explicitly unvalidated and text never supplies shelf life', () => {
  assert.match(getHistoricalExpiryLabel(oldBottle.expiresAt), /^Ancienne estimation non validée : /);
  assert.equal(getHistoricalExpiryLabel('broken'), 'Ancienne estimation non validée : date non reconnue');
  assert.equal(getHistoricalExpiryLabel(null), 'Durée de conservation non validée');
  for (const text of ['3 mois', '1 an', '6 semaines', 'Préparer à chaque usage', '']) {
    assert.equal(parseConservationToDays(text), null);
  }
});

test('a bottle label name cannot inject HTML into its print window', () => {
  assert.equal(escapeLabelHtml('<img src=x onerror="alert(1)"> & \'test\''), '&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; &#39;test&#39;');
});
