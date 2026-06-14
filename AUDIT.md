# 🔍 Audit Cleanz — vers la V1 (juin 2026)

Audit complet de l'app + chantier de redesign. Objectif : une UX **plus épurée**,
un design **plus 2026**, et une page d'accueil **moins chargée**.

---

## 🩺 Diagnostic : pourquoi la page d'accueil semblait « trop chargée »

L'accueil empilait **11 sections** d'affilée, dont :

- **5 carrousels horizontaux** (Indispensables, Surfaces, Électroménager, Essentiels, Astuces)
- **2 carrousels en rotation automatique** (« Le saviez-vous » toutes les 5 s + le gros widget Économies toutes les 4 s)
- **1 widget Économies de ~250 lignes** : carrousel animé + compteurs + particules flottantes + mini-stats + message de conclusion
- **1 bouton CTA** « Voir toutes les astuces » qui **doublonnait** l'onglet Astuces de la barre de menu

➡️ Résultat : **trop de mouvements simultanés**, **trop de dégradés** (chaque carte a le sien),
**aucune hiérarchie claire**, et **des redondances**.

---

## ✅ Ce qui a été fait sur cette branche (`claude/v1-redesign-…`)

### Barre de menu (demande directe)
- État **agrandi** : la pilule est plus grande et **affiche les titres** (Accueil, Appareils, Astuces, Ingrédients, Favoris).
- Au **scroll vers le bas** : les titres disparaissent et la pilule revient à sa taille compacte (taille compacte **inchangée**).
- Animation basée sur la **physique de ressort** (spring) pour un rendu fluide façon Instagram.

### Orientation
- **Verrouillage portrait** partout (overlay CSS en paysage), pas seulement dans la PWA installée.

### Accueil — désencombrement
- 🆕 **Header « greeting »** : salutation selon l'heure (Bonjour / Bonsoir…) + wordmark `cleanz` aligné à gauche + avatar. Plus moderne, plus aéré.
- 🗑️ **Suppression du bouton CTA redondant** « Voir toutes les astuces ».
- 🔄 **Remplacement du gros widget Économies** par un **bandeau « Impact » compact** (bento 2×2, sans rotation auto, sans particules).
- 🤫 **« Le saviez-vous »** : rotation auto ralentie (5 s → 9 s) pour calmer le mouvement.
- 🎨 **`SectionTitle` unifié** : titres un peu plus grands, badges plus discrets, lien d'action à l'accent rose. Toutes les sections respirent le même rythme.

> L'ancien `EconomiesWidget.tsx` est conservé dans le repo (non utilisé) au cas où tu veux y revenir.

---

## 💡 Propositions suivantes (à valider — non encore faites)

### A. Hiérarchie & contenu de l'accueil
1. **Regrouper l'éducatif** : « Le saviez-vous » + « Impact » pourraient vivre dans un seul bloc « Découvrir » repliable, ou être déplacés plus bas / dans un onglet dédié.
2. **Section héro unique** en haut : une grande carte « recette du jour » ou « surface populaire » mise en avant, au lieu d'empiler plusieurs carrousels.
3. **Lazy reveal** : n'afficher que 3-4 sections au chargement, le reste apparaît au scroll (réduit la charge perçue).
4. **Limiter les dégradés** : garder le rose comme **accent unique fort**, rendre les cartes plus neutres/verre. Aujourd'hui tout est coloré → rien ne ressort.

### B. Design system 2026
5. **Palette plus sobre** : tokens de surface plus neutres, 1 accent dominant, dégradés réservés aux moments clés (héro, CTA).
6. **Typographie** : adopter une police variable (ex. *Inter*, *Geist*) plutôt que `system-ui`, avec une échelle typographique nette.
7. **Rayons & ombres cohérents** : `rounded-3xl` pour les grands blocs, `rounded-2xl` pour les petits, ombres douces unifiées (déjà commencé).
8. **Mode sombre** : revoir les contrastes (certains textes muets sont un peu faibles).

### C. Micro-interactions & finitions
9. **Haptique** (vibration légère) sur swipe/ouverture de modal en PWA.
10. **Skeletons** au chargement plutôt qu'un simple « Chargement… ».
11. **Transitions de page** entre onglets (fondu/slide) pour un effet plus « app native ».
12. **Pull-to-refresh** custom avec animation maison.

### D. Architecture / qualité de code
13. **Centraliser les dégradés & couleurs** dans les tokens du thème (beaucoup sont codés en dur dans les composants).
14. **Supprimer les composants morts** (`SpraysSection` remplacé par `SpraysSwipeDeck`, `EconomiesWidget` non utilisé).
15. **Découper `page.tsx`** : extraire le contenu de l'accueil dans un `HomeTab` dédié.
16. **Accessibilité** : `aria-label` sur tous les boutons-icônes, focus visibles, contrastes AA.

---

## 🧪 Comment prévisualiser
Cette branche est **séparée** (branche de test). Une **PR** est ouverte → Vercel génère
une **URL de preview** dédiée. Tu peux comparer côte à côte avec la prod, puis on
mergera (ou pas) selon ton retour.
