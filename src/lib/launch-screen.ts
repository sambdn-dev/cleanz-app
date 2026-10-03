import { WORDMARK_MASK, WORDMARK_RATIO } from './cleanz-wordmark';

// Critical launch CSS is in the document head, before app content can paint.
export const LAUNCH_STYLES = `
.splash-screen{--splash-background:#fafafc;--brand-text:linear-gradient(110deg,#cc56bd 0%,#835aeb 24%,#249cce 46%,#39af94 64%,#a5a53b 79%,#cc56bd 100%);--splash-glow-opacity:.18;position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:var(--splash-background);transition:none;touch-action:none;animation:launch-fallback 450ms ease 6500ms forwards}
@media(prefers-color-scheme:dark){.splash-screen{--splash-background:#0d0c13;--brand-text:linear-gradient(110deg,#ff9de3 0%,#c8b9ff 24%,#a5e6ff 46%,#bdfbc9 64%,#f3f7a3 79%,#ff9de3 100%);--splash-glow-opacity:.5}}
html[data-splash-theme=light] .splash-screen{--splash-background:#fafafc;--brand-text:linear-gradient(110deg,#cc56bd 0%,#835aeb 24%,#249cce 46%,#39af94 64%,#a5a53b 79%,#cc56bd 100%);--splash-glow-opacity:.18}
html[data-splash-theme=dark] .splash-screen{--splash-background:#0d0c13;--brand-text:linear-gradient(110deg,#ff9de3 0%,#c8b9ff 24%,#a5e6ff 46%,#bdfbc9 64%,#f3f7a3 79%,#ff9de3 100%);--splash-glow-opacity:.5}
html[data-cleanz-launch=pending]{background:#fafafc}
html[data-cleanz-launch=pending][data-splash-theme=dark]{background:#0d0c13}
.splash-wordmark{--wordmark-mask:${WORDMARK_MASK};position:relative;isolation:isolate;width:clamp(206px,57vw,274px);aspect-ratio:${WORDMARK_RATIO};font-size:0;color:transparent;background-position:0% 50%;animation:cleanz-color-flow 3200ms cubic-bezier(.4,0,.2,1) infinite alternate,cleanz-logo-arrive 450ms ease-out both;transition:none}
.splash-wordmark::after,.splash-wordmark-glow::after{content:'';position:absolute;inset:0;background-image:var(--brand-text);background-size:220% 100%;background-position:inherit;mask-image:var(--wordmark-mask);-webkit-mask-image:var(--wordmark-mask);mask-size:100% 100%;-webkit-mask-size:100% 100%;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat;pointer-events:none}
.splash-wordmark-glow{position:absolute;inset:0;z-index:-1;background-position:inherit;filter:blur(9px) saturate(1.5);opacity:var(--splash-glow-opacity);pointer-events:none}
@keyframes cleanz-color-flow{from{background-position:0% 50%}to{background-position:100% 50%}}
@keyframes cleanz-logo-arrive{from{opacity:0}to{opacity:1}}
@keyframes splash-auto-out{to{opacity:0;visibility:hidden;pointer-events:none}}
@keyframes launch-fallback{to{opacity:0;visibility:hidden;pointer-events:none}}
.splash-screen[data-leaving=true]{animation:splash-auto-out 500ms cubic-bezier(.4,0,.2,1) forwards}
@media(prefers-reduced-motion:reduce){.splash-wordmark{animation:none;background-position:35% 50%}.splash-screen[data-leaving=true]{animation-duration:1ms}}
`;

export const THEME_BOOTSTRAP = `(function(){var mode;try{mode=localStorage.getItem('cleanz-theme-mode')}catch(e){}var dark=mode==='dark'||(mode!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches),root=document.documentElement;root.dataset.splashTheme=dark?'dark':'light';root.dataset.cleanzLaunch='pending';root.classList.toggle('dark',dark);root.style.colorScheme=dark?'dark':'light';document.querySelectorAll('meta[name="theme-color"]').forEach(function(meta){meta.content=dark?'#0d0c13':'#fafafc'})})()`;
