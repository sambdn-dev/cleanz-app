/**
 * Retours haptiques légers via l'API Vibration.
 *
 * - SSR-safe : ne touche `navigator` que côté client.
 * - iOS Safari ne supporte pas `navigator.vibrate` → no-op silencieux (acceptable).
 * - Ne jamais conditionner l'UI au succès de la vibration.
 */

export type HapticIntensity =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'selection'
  | 'success'
  | 'warning';

const PATTERNS: Record<HapticIntensity, number | number[]> = {
  light: 8,
  medium: 15,
  heavy: 25,
  selection: 5,
  success: [10, 40, 20],
  warning: [20, 60, 20],
};

const canVibrate = (): boolean =>
  typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

export function haptic(intensity: HapticIntensity = 'light'): void {
  if (!canVibrate()) return;
  try {
    navigator.vibrate(PATTERNS[intensity]);
  } catch {
    /* no-op */
  }
}
