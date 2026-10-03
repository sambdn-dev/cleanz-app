/**
 * Contrôle Chromium sur une app déjà construite et démarrée.
 * Nécessite Playwright (fourni par l’environnement cloud), sans profil utilisateur.
 * CLEANZ_BASE_URL et CHROMIUM_PATH permettent de modifier les valeurs locales.
 * Données fictives dans des contextes isolés ; captures et résultats dans /tmp.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const requireDependency = createRequire(import.meta.url);
const { chromium } = requireDependency('playwright');
const origin = process.env.CLEANZ_BASE_URL || 'http://127.0.0.1:3000';
const legacy = [
 {id:'legacy-wait',number:7,recipeId:2,recipeType:'spray',name:'Mon ancien dégraissant',createdAt:'2026-06-14T12:00:00.000Z',expiresAt:'2026-08-14T12:00:00.000Z'},
 {id:'legacy-removed',number:8,recipeId:28,recipeType:'recette',name:'Ancienne fiche retirée',createdAt:'2026-06-14T12:00:00.000Z',expiresAt:null},
 {id:'legacy-merged',number:9,recipeId:29,recipeType:'recette',name:'Mon ancien mélange vitres',createdAt:'2026-06-14T12:00:00.000Z',expiresAt:'2026-12-14T12:00:00.000Z'},
 {id:'legacy-suspended',number:10,recipeId:13,recipeType:'recette',name:'Ancien déboucheur',createdAt:'2026-06-14T12:00:00.000Z',expiresAt:null},
 {id:'legacy-missing',number:11,recipeId:99999,recipeType:'recette',name:'Source inconnue conservée',createdAt:'2026-06-14T12:00:00.000Z',expiresAt:null,extra:'champ ancien'},
 {id:'legacy-incomplete',number:42,name:'Enregistrement à récupérer'}
];
const legacyRaw=JSON.stringify(legacy,null,2);
const favorites=[2,28,29,13,999];
const results=[];
let browser;
async function setup(seed={}) {
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await context.addInitScript(({seed, origin})=>{
  if(location.origin===origin && !localStorage.getItem('__publication_seeded')){
   localStorage.setItem('cleanz-seen-nouveautes','99999');
   localStorage.setItem('pwa-prompt-dismissed','true');
   for(const [k,v] of Object.entries(seed))localStorage.setItem(k,v);
   localStorage.setItem('__publication_seeded','true');
  }
 },{seed,origin});
 const page=await context.newPage(); page.setDefaultTimeout(10000); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 return {context,page,errors};
}
const modal=page=>page.locator('div.fixed.inset-0.z-50').last();
async function ready(page,path='/'){
 const response=await page.goto(origin+path,{waitUntil:'networkidle',timeout:30000}); assert.equal(response.status(),200);
 await page.locator('.splash-auto-out').waitFor({state:'hidden'});
}
async function run(name,fn){try{await fn();results.push({name,passed:true});console.log('PASS',name)}catch(e){results.push({name,passed:false,error:e.message});console.error('FAIL',name,e.message);}}
(async()=>{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true});
 await run('Anciens QR/liens : refus sans préparation, fusions admissibles et inconnus',async()=>{
  const {context,page,errors}=await setup();
  try{
   for(const query of ['spray-2','spray-6','recette-2','recette-6','recette-13','recette-30','recette-97','recette-107','recette-28','recette-22','recette-33','recette-129','recette-99999','spray-99999']){
    await ready(page,'/?fiche='+query); await modal(page).getByRole('button',{name:'Revenir à l’application'}).waitFor();
    const text=await modal(page).innerText();
    assert.doesNotMatch(text,/Ingrédients & dosages|\nPréparation\n|\nMatériel\n|300ml|100ml|2 c\.à\.s|Se conserve/);
    if(query==='spray-2')await page.screenshot({path:'/tmp/cleanz-publication-suspendue.png'});
   }
   for(const query of ['/?recette=degraissant-puissant','/?recette=desinfectant-naturel','/?recette=absente','/?fiche=invalide','/?astuce=baskets-blanches']){
    await ready(page,query); await modal(page).getByRole('heading').first().waitFor();
    assert.doesNotMatch(await modal(page).innerText(),/Ingrédients & dosages|\nPréparation\n|300ml|100ml/);
   }
   await ready(page,'/?fiche=recette-29'); await modal(page).getByRole('heading',{name:/Anti-traces Vitres/}).waitFor();
   assert.match(await modal(page).innerText(),/Fiche fusionnée/); assert.match(await modal(page).innerText(),/Conservation non établie/);
   assert.doesNotMatch(await modal(page).innerText(),/Liquide vaisselle/);
   await ready(page,'/?fiche=spray-3'); await modal(page).getByRole('heading',{name:/Anti-traces Vitres/}).waitFor();
   assert.match(await modal(page).innerText(),/Ingrédients & dosages/);
   assert.deepEqual(errors,[]);
  }finally{await context.close()}
 });
 await run('Accueil, catalogue, recherche et surfaces respectent la publication',async()=>{
  const {context,page,errors}=await setup();
  try{
   await ready(page);
   assert.equal(await page.getByText('Dégraissant Puissant',{exact:true}).count(),0);
   await page.getByRole('button',{name:'Recettes',exact:true}).click();
   await page.getByText('Spray Multi-usage',{exact:true}).first().waitFor();
   assert.equal(await page.getByText('Dégraissant Puissant',{exact:true}).count(),0);
   await page.getByRole('button',{name:'Accueil',exact:true}).click();
   const search=page.getByRole('textbox',{name:'Rechercher une surface, une recette ou un ingrédient'});
   await search.fill('friteuse');await page.getByRole('option').filter({hasText:'Friteuse'}).first().click();
   await modal(page).getByRole('heading',{name:/Friteuse/}).waitFor();
   const friteuse=await modal(page).innerText();assert.doesNotMatch(friteuse,/Ingrédients recommandés|Cristaux de soude|Dégraissant Puissant/);assert.match(friteuse,/revue|disponible/i);
   await modal(page).getByRole('button',{name:'Fermer',exact:true}).click();
   await search.fill('WC');await page.getByRole('option').filter({hasText:'WC'}).first().click();
   await modal(page).getByRole('heading',{name:/WC/,level:2}).waitFor();
   assert.equal(await modal(page).getByText('Détartrant WC Express',{exact:true}).count(),1);
   assert.equal(await modal(page).getByText('Mousse Active WC',{exact:true}).count(),0);
   await modal(page).getByRole('button',{name:'Fermer',exact:true}).click();
   await search.fill('four');await page.getByRole('option').filter({hasText:'Four'}).first().click();
   await modal(page).getByRole('heading',{name:/Four/,level:2}).waitFor();
   assert.doesNotMatch(await modal(page).innerText(),/Vapeur Four|La vapeur suffit/);
   assert.deepEqual(errors,[]);
  }finally{await context.close()}
 });
 await run('Flacons/favoris historiques, création sans validité, QR et étiquette',async()=>{
  const {context,page,errors}=await setup({'cleanz-user-sprays':legacyRaw,'cleanz-favorites':JSON.stringify(favorites)});
  try{
   await ready(page);await page.getByRole('button',{name:'Favoris',exact:true}).click();
   await page.getByRole('heading',{name:'Mes Sprays'}).waitFor();
   for(const item of legacy.slice(0,5))await page.getByRole('heading',{name:item.name,exact:true}).waitFor();
   assert.equal(await page.evaluate(()=>localStorage.getItem('cleanz-user-sprays')),legacyRaw);
   assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('cleanz-favorites'))),favorites);
   assert.match(await page.locator('body').innerText(),/Ancienne estimation non validée/);
   assert.match(await page.locator('body').innerText(),/enregistrement\(s\) incomplet/);
   await page.getByRole('button',{name:/Source inconnue conservée/}).click();
   await modal(page).getByText('Fiche introuvable',{exact:true}).waitFor();
   await modal(page).getByRole('button',{name:'Revenir à l’application'}).click();
   await page.getByRole('button',{name:'Afficher le QR code',exact:true}).first().click();
   const popupPromise=context.waitForEvent('page');
   await page.getByRole('button',{name:/Imprimer/}).first().click();
   const popup=await popupPromise;await popup.waitForLoadState();
   assert.match(await popup.locator('body').innerText(),/Mon ancien dégraissant/);
   assert.match(await popup.locator('body').innerText(),/Ancienne estimation non validée/);
   assert.doesNotMatch(await popup.locator('body').innerText(),/À utiliser avant|jours restants|300ml/);
   assert.match(await popup.locator('body').innerText(),/en cours de revue/);
   const {PNG}=requireDependency('pngjs');
   const jsQR=requireDependency('jsqr');
   const qrImage=await popup.locator('.qr img').getAttribute('src');
   const png=PNG.sync.read(Buffer.from(qrImage.split(',')[1],'base64'));
   const decoded=jsQR(new Uint8ClampedArray(png.data),png.width,png.height);
   assert.equal(decoded.data,origin+'/?fiche=spray-2');
   await popup.close();
   await page.getByRole('button',{name:'Ajouter',exact:true}).click();
   const add=page.locator('div.fixed.inset-0').filter({has:page.getByRole('heading',{name:'Nouveau flacon'})}).last();
   await add.waitFor();assert.equal(await add.getByText('Dégraissant Puissant',{exact:true}).count(),0);
   await add.getByRole('button',{name:/Anti-traces Vitres/}).click();
   await add.getByRole('textbox').fill('Nouveau flacon vérifié');
   await add.getByRole('button',{name:'Créer le flacon #43',exact:true}).click();
   await page.getByRole('heading',{name:'Nouveau flacon vérifié'}).waitFor();
   const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('cleanz-user-sprays')));
   assert.deepEqual(after.slice(0,legacy.length),legacy);assert.equal(after.at(-1).expiresAt,null);assert.equal(after.at(-1).number,43);
   await page.reload({waitUntil:'networkidle'});await page.locator('.splash-auto-out').waitFor({state:'hidden'});
   await page.getByRole('button',{name:'Favoris',exact:true}).click();await page.getByRole('heading',{name:'Nouveau flacon vérifié'}).waitFor();
   assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('cleanz-user-sprays'))),after);
   await page.screenshot({path:'/tmp/cleanz-publication-flacons.png'});
   assert.deepEqual(errors,[]);
  }finally{await context.close()}
 });
 await run('Stockage malformé conservé et téléchargeable, aucune création destructive',async()=>{
  const raw='[{"id":"ancien-flacon"}';
  const {context,page}=await setup({'cleanz-user-sprays':raw});
  try{
   await ready(page);await page.getByRole('button',{name:'Favoris',exact:true}).click();
   await page.getByRole('alert').filter({hasText:'illisibles'}).waitFor();
   assert.equal(await page.getByRole('button',{name:'Ajouter',exact:true}).isDisabled(),true);
   const promise=page.waitForEvent('download');await page.getByRole('button',{name:'Télécharger une copie des données'}).click();const download=await promise;
   assert.equal(fs.readFileSync(await download.path(),'utf8'),raw);
   assert.equal(await page.evaluate(()=>localStorage.getItem('cleanz-user-sprays')),raw);
  }finally{await context.close()}
 });
 await run('Courses importées uniquement depuis la destination publiée des favoris',async()=>{
  const {context,page}=await setup({'cleanz-favorites':JSON.stringify(favorites)});
  try{
   await ready(page);await page.getByRole('button',{name:'Mon compte',exact:true}).click();
   await page.getByText('Ma liste de courses',{exact:true}).click();
   await page.getByRole('button',{name:'Importer depuis mes recettes favorites disponibles',exact:true}).click();
   await page.waitForFunction(()=>JSON.parse(localStorage.getItem('cleanz-shopping-list')||'[]').length>0);
   const items=await page.evaluate(()=>JSON.parse(localStorage.getItem('cleanz-shopping-list')));
   assert.deepEqual(items.map(x=>x.label).sort(),['Eau déminéralisée','Vinaigre blanc','Alcool ménager'].sort());
  }finally{await context.close()}
 });
 await browser.close();fs.writeFileSync('/tmp/cleanz-publication-browser-results.json',JSON.stringify(results,null,2));
 if(results.some(r=>!r.passed))process.exitCode=1;
})().catch(async e=>{console.error(e);if(browser)await browser.close();process.exitCode=1});
