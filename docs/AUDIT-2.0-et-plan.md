# 🔍 Audit Cleanz 2.0 & plan des 2 prochaines semaines

> Rédigé le 2026-06-21, fin de la grosse session de refonte.
> Objectif fixé : en **1–2 semaines**, faire avancer fort l'app et **surtout la
> génération de revenus / business model**, et **publier sur App Store + Google Play**.
> Référence V1 figée : commit **`beb21e4`** (sur `origin`).

---

## 1. Résumé exécutif

**Verdict : produit solide côté contenu & UX, mais "app vitrine" — il manque toute
la couche qui permet de gagner de l'argent et de durer.**

- ✅ Très bon : contenu riche (~131 recettes, 82 surfaces, 24 appareils), UX 2026
  soignée (photos, modales teintées, saisons, PWA installable).
- ⚠️ Bloquant pour le business : **pas de comptes, pas d'analytics, aucune brique
  de monétisation, pas sur les stores, état stocké uniquement en localStorage.**

Autrement dit : on a fini une **excellente V1 produit**. Les 2 prochaines semaines
doivent être **80 % "business/infra", 20 % "polish visuel"**.

---

## 2. Stack & métriques (réelles)

| Élément | Valeur |
|---|---|
| Framework | Next.js (App Router) + React + TypeScript |
| Style | Tailwind v4 |
| Dépendances | `lucide-react`, `qrcode` (très léger, sain) |
| Code | ~16 260 lignes · 53 composants · 14 fichiers de données |
| Plus gros fichier | `recettes.ts` (3 826 l.) |
| Contenu | ~131 recettes · 82 surfaces (+6 populaires) · 24 appareils |
| Persistance | **localStorage uniquement** (9 fichiers) — pas de backend |
| Appels réseau | 1 seul (quasi aucun backend) |
| PWA | ✅ manifest + service worker (`/sw.js`) + prompt de mise à jour |
| Tests | ❌ aucun |
| Images | 4,1 Mo (optimisées, LQIP en place) |
| a11y | 38 `aria-label`, 10 `alt` — correct, non exhaustif |

---

## 3. Forces

- 🎨 Identité visuelle forte et cohérente (dégradé rose→violet→cyan, line-art, photos).
- 📚 Contenu dense et de qualité — c'est le vrai actif difficile à copier vite.
- ⚡ Très léger (peu de dépendances) → rapide, peu de surface de bug.
- 📱 PWA installable, mise à jour auto, mode sombre, haptique, partage OG.

---

## 4. Points faibles / dette / risques (priorisés)

### 🔴 P0 — bloquant pour le business
1. **Pas de comptes utilisateurs.** → impossible de : faire payer, synchroniser,
   mesurer une rétention nominative, faire l'import Instagram. *(Supabase prévu.)*
2. **Aucune brique de monétisation** (ni premium, ni affiliation, ni placement marque).
3. **Pas sur les stores.** Uniquement PWA → invisible sur App Store / Play Store.
4. **État 100 % localStorage** : favoris/notes perdus si l'utilisateur change de
   téléphone ou vide son cache. Risque réel de perte de données utilisateur.

### 🟠 P1 — important
5. **Pas d'analytics.** On ne mesure rien (rétention, recettes vues, intention
   d'achat). Or "prouver la traction" est le préalable à toute monétisation/vente.
6. **Pas de tests** ni de CI. À ce volume ça passe, mais chaque refonte risque une régression silencieuse.
7. **Conformité produits ménagers** si vente en propre (règlement **CLP** UE :
   classification, étiquetage, fiches sécurité). → démarrer en **affiliation** pour éviter ce poids.
8. **Responsabilité éditoriale** : recettes DIY = bien garder les avertissements
   (ne jamais mélanger vinaigre + javel, HE & animaux/bébés…). Le `Disclaimer` existe, à maintenir.

### 🟡 P2 — qualité / nettoyage
9. **Code mort** : `EconomiesWidget.tsx` et `SpraysSwipeDeck.tsx` (0 référence) → supprimer.
10. **Couleurs/dégradés codés en dur** dans beaucoup de composants → centraliser dans le thème.
11. **`page.tsx`** un peu gros (380 l.) → extraire un `HomeTab`.
12. **a11y** : vérifier focus visibles + contrastes AA en mode sombre.
13. **SEO/partage** : vérifier les `og:image` dynamiques par recette (déjà amorcé).

---

## 5. 🎯 Plan sur 2 semaines (cœur de la demande)

> Fil rouge : **rendre l'app "monétisable et mesurable", puis la publier.**
> Le visuel (photos appareils/ingrédients) s'intercale en respiration.

### Semaine 1 — Fondations revenus
- **J1–2 · Auth Supabase** (session d'apprentissage) : email + Google, migration
  des favoris/notes localStorage → compte (avec repli hors-ligne). *(P0 #1, #4)*
- **J3 · Analytics** (léger, type Plausible/PostHog ou Vercel Analytics) :
  événements clés = recette ouverte, favori, "voir produit", install PWA. *(P1 #5)*
- **J4 · Affiliation "Acheter les ingrédients"** : bouton sur recette → lien
  affilié (Amazon/Starwax…). Zéro stock, mesure l'intention d'achat. *(P0 #2)*
- **J5 · Cleanz+ (fake-door)** : marquer du contenu "premium" + paywall + bouton
  "Ça m'intéresse" qui enregistre l'intention (sans facturer encore). *(P0 #2)*

### Semaine 2 — Distribution & monétisation
- **J6 · Google Play via TWA** (PWABuilder/Bubblewrap) : présence store rapide. *(P0 #3)*
- **J7 · Import Instagram** (`share_target` PWA Android) : "Partager une vidéo →
  l'enregistrer dans mes recettes" (s'appuie sur les comptes). Argument béton influenceur.
- **J8 · Placements marques (MVP)** : encart "marque partenaire" sponsorisé,
  transparent, sur fiches pertinentes (INGA, etc.). *(business)*
- **J9 · iOS** : wrapper Capacitor (Apple refuse les PWA nues) — cadrer le chantier.
- **J10 · Polish & mesure** : nettoyage code mort, contrôle analytics, page produit propre.

**Visuel (en //, quand pause)** : photos appareils (texte centré gras + blur dosé),
modale appareil avec photo, page Ingrédients (1×1 / 3×2).

---

## 6. 💰 Business model — ordre de test recommandé

1. **Affiliation d'abord** (semaine 1) : prouve la demande produit sans logistique ni CLP.
2. **Cleanz+ fake-door** : prouve la volonté de payer avant d'intégrer Stripe/RevenueCat.
3. **Placements marques payants** : revenu sans stock (INGA, Starwax, Kärcher, WD-40* …).
4. **Produits en propre** (sprays, pastilles, doseurs, microfibres) : seulement
   une fois la demande prouvée + cadre réglementaire géré (idéalement via l'influenceur-partenaire).
5. **Distribution influenceur clean** : rev-share plutôt que vente sèche pré-traction.

\* WD-40 = catégorie "non-naturel mais efficace" clairement séparée (cf. ROADMAP).

---

## 7. 🏪 Stores — plan concret

- **Google Play (rapide)** : ta PWA → **TWA** via **PWABuilder.com** (génère l'AAB
  signé en quelques étapes). Pré-requis : manifest complet ✅, icônes ✅, HTTPS ✅,
  `assetlinks.json` (Digital Asset Links) à publier. Compte développeur : 25 $ une fois.
- **App Store (plus lent)** : Apple refuse les wrappers web "vides" → il faut
  **Capacitor** + un peu de valeur native (extension de partage, notifications).
  Compte développeur : 99 $/an. À faire en semaine 2+.
- ⚠️ Si on vend de l'abonnement **dans** l'app iOS/Android, Apple/Google prennent
  **15–30 %** → privilégier l'abonnement **via le web** (Stripe) quand c'est permis.

---

## 8. ⚡ Quick wins (à grignoter)
- Supprimer `EconomiesWidget.tsx` + `SpraysSwipeDeck.tsx` (code mort).
- Centraliser dégradés/couleurs récurrents dans le thème.
- Extraire `HomeTab` de `page.tsx`.
- Passe a11y (focus visibles, contrastes sombres).

---

## 9. 👉 Demain — top 3
1. **Supabase / Auth** (session d'apprentissage) — débloque tout le reste.
2. Décider l'outil **d'analytics** et l'installer (5 min de valeur immense).
3. Brancher un premier **bouton d'affiliation** sur une recette pour tester l'intention d'achat.

> Tout le reste (photos appareils/ingrédients, schémas, fusions optionnelles,
> WD-40, multilingue) est consigné dans `ROADMAP.md`.
