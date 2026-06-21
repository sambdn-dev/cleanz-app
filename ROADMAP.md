# 🗺️ Roadmap Cleanz

Suivi des grandes étapes du produit. Le détail technique de la V1 (redesign,
désencombrement de l'accueil, design system) vit dans [`AUDIT.md`](./AUDIT.md).

---

## ✅ V1 — l'app (figée)

App de ménage écolo : recettes, ingrédients, surfaces & appareils, astuces, favoris.
Refonte 2026 terminée (voir `AUDIT.md`).
🔖 **Snapshot figé dans le tag git `cleanz-v1`** (référence avant 2.0).

---

## 🎉 Cleanz 2.0 — en cours

> La refonte justifie un vrai changement de version. App passée en **v2.0.0**.

### Fait
- Accueil photo-first, modales teintées par la couleur n°1 de la photo.
- Surfaces fusionnées (90 → 82), 24 appareils avec icônes SVG.
- ✅ **Conseils saisonniers autonomes** : la section « Spécial saison » détecte la
  saison en cours et l'affiche par défaut ; l'utilisateur peut parcourir les 4
  saisons (été/automne/hiver/printemps). Fonctionne tout seul même sans maintenance.

### 🎨 Chantiers visuels (passer aux vraies photos)
- 🖼️ **Appareils** : remplacer les icônes SVG par de **vraies photos** (texte centré,
  gras, **blur dosé** derrière le texte). Idem pour la **modale d'un appareil**
  (actuellement dégradé + emoji → fait « V1 »).
- 🧪 **Page Ingrédients** : photos en formats **1×1 et 3×2** —
  - Poudres
  - Huiles essentielles (par huile : un **flacon** + les **fruits/fleurs** concernés)
  - Liquides en bouteille
  - Savon noir · Savon de Marseille · Huile d'olive verte
- 🌗 Conserver l'identité Cleanz (cohérence dégradé rose→violet→cyan, ambiance naturelle).

---

## 🚀 V2 — Branding & shop Cleanz

> 💡 Idée à creuser : transformer Cleanz en **marque**, pas seulement une app.

- 🛒 **Shop Cleanz** : une vraie boutique liée à l'app.
- 🧴 **Produits envisagés** :
  - **Sprays** prêts à l'emploi (recettes signature Cleanz).
  - **Pastilles concentrées** (à diluer soi-même → moins de plastique, recharge
    des flacons réutilisables, cohérent avec l'angle écolo/zéro-déchet).
- 🎨 **Branding** : identité visuelle de la gamme (flacons en verre, étiquettes
  minimalistes, ambiance naturelle — cf. moodboard du prompt : flacons spray en
  verre, citron, lavande, eucalyptus, bocaux).
- 🔗 **Lien app ↔ shop** : depuis une recette, proposer le produit Cleanz
  correspondant (le spray déjà fait OU les ingrédients/pastilles pour le faire soi-même).

### À creuser plus tard
- Modèle (vente directe, recharge sur abonnement, kit de démarrage flacons + pastilles).
- Logistique / fournisseur / contraintes réglementaires produits ménagers.
- Intégration paiement & tunnel d'achat dans la PWA.

---

## 💰 Business model — pistes de monétisation

> Principe directeur : **l'app est le tunnel, pas le produit.** Prouver l'engagement
> (rétention, favoris, intention d'achat) AVANT de monétiser/vendre.

### 1. Contenu → commerce (gros potentiel)
- 🧴 **Produits Cleanz** : sprays prêts à l'emploi, **pastilles concentrées** (à diluer),
  **flacons réutilisables**, **verres/doseurs gradués**, **éponges & microfibres**.
- 🔗 Depuis une recette : bouton **« Acheter les ingrédients »** (affiliation d'abord,
  zéro stock → prouve la demande ; marque propre ensuite).
- 🛒 **Amazon Store Pro / affiliation** avec commissions (test sans logistique).

### 2. Premium — Cleanz+ (freemium)
- Recettes exclusives, planificateur/rappels, favoris illimités, import Instagram, sans pub.
- Démarrer en **fake-door** (mesurer la volonté de payer) avant Stripe/RevenueCat.

### 3. Mises en avant payantes pour les marques 💸
- **Placements sponsorisés** : une marque paie pour être recommandée (ingrédient,
  éponge, appareil…) dans les recettes/fiches pertinentes.
- Encadré « marque partenaire » sur une fiche surface/appareil.
- Toujours signalé comme sponsorisé (transparence) + garder la cohérence du positionnement.

### Marques / partenaires potentiels
- **Entretien & accessoires** : INGA (éponges & microfibres), Starwax, La Droguerie
  Écologique, Briochin…
- **Appareils** : Kärcher (haute pression / vapeur), Bissell (injecteur-extracteur),
  Dyson (aspirateur balai), Ecovacs / Dreame / Roborock (robots).
- **Hors « naturel » mais utile** : **WD-40** (grincements, entretien outils de
  jardinage, dégrippage…). ⚠️ À cadrer : créer une catégorie « non-naturel mais
  efficace » clairement distincte pour ne pas brouiller le positionnement écolo.

### 4. Distribution
- Partenariat / licence avec un **influenceur clean** (rev-share plutôt que vente sèche
  pré-traction) : eux l'audience, nous le produit + la tech + le moteur de recettes.

---

## 🧩 Fonctionnalités liées (dépendent des comptes)

- 🔐 **Auth (Supabase)** — fondation (session d'apprentissage prévue). Débloque le reste.
- 📲 **Import Instagram** : « Partager une vidéo → l'enregistrer dans mes recettes »
  (Android : `share_target` PWA ; iOS : extension via Capacitor).
- 📊 **Analytics** : rétention, favoris, taps « acheter » → mesurer la traction.
- 🛡️ **Cleanz+** : grille gratuit/premium + paywall.
- 🤖 **Stores** : Google Play via TWA (rapide), iOS plus tard (Capacitor).

---

## 🔌 Appareils — à compléter

- ✅ Ajoutés : Nettoyeur haute pression (Kärcher), Injecteur-extracteur (Bissell),
  Aspirateur balai (Dyson).
- 🎨 Icônes SVG sur-mesure pour les 24 appareils (set line-art duotone cohérent).
- 🔜 À enrichir si besoin : variantes par marque, robots (Ecovacs/Dreame/Roborock) déjà
  couverts par « Robot aspirateur laveur ».
