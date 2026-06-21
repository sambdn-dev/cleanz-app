import { haptic } from './haptics';

/** Slug URL-safe (minuscules, sans accents) — sert aux liens profonds ?recette= / ?astuce=. */
export const slugify = (name: string): string =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

interface ShareTextInput {
  title: string;
  emoji?: string;
  /** Libellé du type de contenu (défaut : « recette de ménage naturel »). */
  kindLabel?: string;
  /** Courte accroche (temps/difficulté, résumé…). */
  tagline?: string;
  /** Points clés (ex. ingrédients) affichés sur une ligne. */
  bullets?: string[];
  url: string;
}

/**
 * Construit un message de partage prérempli, prêt à coller dans Messages,
 * WhatsApp, Mail… L'URL N'est PAS incluse ici (elle part dans le champ `url`
 * du partage natif, qui génère l'aperçu de lien) ; elle est ajoutée au texte
 * uniquement pour le repli « copier ».
 */
export function buildShareText({ title, emoji, kindLabel = 'recette de ménage naturel', tagline, bullets }: ShareTextInput): string {
  const lines: string[] = [];
  lines.push(`${emoji ? emoji + ' ' : ''}${title} — ${kindLabel}`);
  if (tagline) lines.push('', tagline);
  if (bullets && bullets.length) lines.push('', '🧴 ' + bullets.join(' · '));
  lines.push('', '🌿 Découvre la recette sur Cleanz, l’entretien naturel simplifié :');
  return lines.join('\n');
}

export type ShareResult = 'shared' | 'copied' | 'error';

/**
 * Partage natif (Web Share API) si disponible, sinon copie le message + le lien
 * dans le presse-papier. Une annulation utilisateur est traitée comme un succès.
 */
export async function shareOrCopy(data: { title: string; text: string; url: string }): Promise<ShareResult> {
  haptic('light');
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title: data.title, text: data.text, url: data.url });
      return 'shared';
    } catch (e) {
      if ((e as Error)?.name === 'AbortError') return 'shared'; // annulé : on s'arrête là
      // autre erreur → repli sur la copie
    }
  }
  try {
    await navigator.clipboard.writeText(`${data.text}\n${data.url}`);
    return 'copied';
  } catch {
    return 'error';
  }
}
