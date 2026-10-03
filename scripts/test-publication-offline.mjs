/**
 * Contrôle Chromium sur une app déjà construite et démarrée.
 * Nécessite Playwright (fourni par l’environnement cloud), sans profil utilisateur.
 * CLEANZ_BASE_URL et CHROMIUM_PATH permettent de modifier les valeurs locales.
 * Données fictives dans des contextes isolés ; captures et résultats dans /tmp.
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const requireDependency = createRequire(import.meta.url);
const { chromium } = requireDependency('playwright');
const origin = process.env.CLEANZ_BASE_URL || 'http://127.0.0.1:3000';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true});
 try{
 const context=await browser.newContext({viewport:{width:390,height:844}});
 const page=await context.newPage();page.setDefaultTimeout(10000);
 await page.goto(origin+'/icons/icon.svg');
 await page.evaluate(async()=>{
  const old=await caches.open('cleanz-runtime-ancien');await old.put('/',new Response('ANCIENNE PREPARATION INTERDITE'));
  const foreign=await caches.open('autre-produit');await foreign.put('/independant',new Response('A conserver'));
  localStorage.setItem('cleanz-seen-nouveautes','99999');localStorage.setItem('pwa-prompt-dismissed','true');
  localStorage.setItem('cleanz-user-sprays','[{"id":"conserver-hors-ligne"}]');
 });
 await page.goto(origin+'/?fiche=spray-2',{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'Revenir à l’application'}).waitFor();
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));});
 const cachesOnline=await page.evaluate(()=>caches.keys());
 assert(!cachesOnline.includes('cleanz-runtime-ancien'));assert(cachesOnline.includes('autre-produit'));
 assert(cachesOnline.some(k=>k.startsWith('cleanz-runtime-2026-10-03.1-')));
 console.log('PASS activation : ancien cache Cleanz purgé, cache étranger conservé');
 await context.setOffline(true);const response=await page.reload({waitUntil:'domcontentloaded'});
 assert.equal(response.status(),503);await page.getByRole('heading',{name:'Une connexion est nécessaire'}).waitFor();
 assert.doesNotMatch(await page.locator('body').innerText(),/ANCIENNE PREPARATION|Dégraissant Puissant|300ml/);
 assert.equal(await page.evaluate(()=>localStorage.getItem('cleanz-user-sprays')),'[{"id":"conserver-hors-ligne"}]');
 await page.screenshot({path:'/tmp/cleanz-publication-hors-ligne.png'});
 console.log('PASS réseau coupé : 503 explicatif, pas d’ancienne recette, stockage intact');
 await context.setOffline(false);await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'Revenir à l’application'}).waitFor();
 assert.match(await page.locator('div.fixed.inset-0.z-50').last().innerText(),/en cours de revue/);
 assert.equal(await page.evaluate(()=>localStorage.getItem('cleanz-user-sprays')),'[{"id":"conserver-hors-ligne"}]');
 console.log('PASS reconnexion : statut de publication restauré, stockage inchangé');
 await context.close();
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
