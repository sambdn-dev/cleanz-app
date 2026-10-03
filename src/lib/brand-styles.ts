import { WORDMARK_MASK, WORDMARK_RATIO } from './cleanz-wordmark';

export const LIGHT_LOGO_MATERIAL = 'radial-gradient(ellipse at 18% 78%,#92527f 0%,transparent 34%),radial-gradient(ellipse at 56% 16%,#735199 0%,transparent 35%),linear-gradient(105deg,#35263e 8%,#493153 42%,#895176 64%,#35263e 86%)';
export const DARK_LOGO_MATERIAL = 'radial-gradient(ellipse at 18% 78%,#f4bedf 0%,transparent 34%),radial-gradient(ellipse at 56% 16%,#dbc9f6 0%,transparent 35%),linear-gradient(105deg,#fdfbff 8%,#f9f6fc 42%,#f9cee4 64%,#fdfbff 86%)';

// Inline with the launch styles: the same logo is present at the first paint,
// without fetching a font, an image, or an additional stylesheet.
export const WORDMARK_STYLES = `
:root{--logo-material:${LIGHT_LOGO_MATERIAL};--logo-glow:0}
.dark{--logo-material:${DARK_LOGO_MATERIAL};--logo-glow:.28}
.cleanz-wordmark{--wordmark-mask:${WORDMARK_MASK};position:relative;display:block;isolation:isolate;width:120px;aspect-ratio:${WORDMARK_RATIO};font-size:0;color:transparent;background-position:35% 50%;transition:none}
.cleanz-wordmark::after,.cleanz-wordmark-glow::after{content:'';position:absolute;inset:0;background-image:var(--logo-material);background-size:220% 100%;background-position:inherit;mask-image:var(--wordmark-mask);-webkit-mask-image:var(--wordmark-mask);mask-size:100% 100%;-webkit-mask-size:100% 100%;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat;pointer-events:none}
.cleanz-wordmark-glow{position:absolute;inset:0;z-index:-1;background-position:inherit;filter:blur(3px);opacity:var(--logo-glow);pointer-events:none}
`;
