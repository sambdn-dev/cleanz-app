import { DARK_LOGO_MATERIAL, LIGHT_LOGO_MATERIAL, WORDMARK_STYLES } from './brand-styles';

// Critical launch CSS is in the document head, before app content can paint.
export const LAUNCH_STYLES = `
${WORDMARK_STYLES}
.splash-screen{--splash-background:#fafafc;--logo-material:${LIGHT_LOGO_MATERIAL};--logo-glow:0;position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:var(--splash-background);transition:none;touch-action:none;animation:launch-fallback 450ms ease 6500ms forwards}
@media(prefers-color-scheme:dark){.splash-screen{--splash-background:#0d0c13;--logo-material:${DARK_LOGO_MATERIAL};--logo-glow:.35}}
html[data-splash-theme=light] .splash-screen{--splash-background:#fafafc;--logo-material:${LIGHT_LOGO_MATERIAL};--logo-glow:0}
html[data-splash-theme=dark] .splash-screen{--splash-background:#0d0c13;--logo-material:${DARK_LOGO_MATERIAL};--logo-glow:.35}
html[data-cleanz-launch=pending]{background:#fafafc}
html[data-cleanz-launch=pending][data-splash-theme=dark]{background:#0d0c13}
.splash-wordmark{width:clamp(206px,57vw,274px);background-position:0% 50%;animation:cleanz-color-flow 4200ms cubic-bezier(.4,0,.2,1) infinite alternate,cleanz-logo-arrive 450ms ease-out both}
.splash-wordmark .cleanz-wordmark-glow{filter:blur(8px)}
@keyframes cleanz-color-flow{from{background-position:0% 50%}to{background-position:100% 50%}}
@keyframes cleanz-logo-arrive{from{opacity:0}to{opacity:1}}
@keyframes splash-auto-out{to{opacity:0;visibility:hidden;pointer-events:none}}
@keyframes launch-fallback{to{opacity:0;visibility:hidden;pointer-events:none}}
.splash-screen[data-leaving=true]{animation:splash-auto-out 500ms cubic-bezier(.4,0,.2,1) forwards}
@media(prefers-reduced-motion:reduce){.splash-wordmark{animation:none;background-position:35% 50%}.splash-screen[data-leaving=true]{animation-duration:1ms}}
`;

export const THEME_BOOTSTRAP = `(function(){var mode;try{mode=localStorage.getItem('cleanz-theme-mode')}catch(e){}var dark=mode==='dark'||(mode!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches),root=document.documentElement;root.dataset.splashTheme=dark?'dark':'light';root.dataset.cleanzLaunch='pending';root.classList.toggle('dark',dark);root.style.colorScheme=dark?'dark':'light';document.querySelectorAll('meta[name="theme-color"]').forEach(function(meta){meta.content=dark?'#0d0c13':'#fafafc'})})()`;
