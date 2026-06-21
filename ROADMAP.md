# 🗺️ Roadmap Cleanz

Suivi des grandes étapes du produit. Le détail technique de la V1 (redesign,
désencombrement de l'accueil, design system) vit dans [`AUDIT.md`](./AUDIT.md).

---

## ✅ V1 — l'app (en cours)

App de ménage écolo : recettes, ingrédients, surfaces & appareils, astuces, favoris.
Redesign 2026 en cours (voir `AUDIT.md`).

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
