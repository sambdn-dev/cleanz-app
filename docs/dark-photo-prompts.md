# Prompts — versions sombres & cosy des photos de recettes

Objectif : générer une variante **sombre, chaleureuse et cosy** de chacune des 6 photos
de recettes, pour le **mode sombre** de l'app. La composition doit rester **identique**
à la photo claire (mêmes objets, produits regroupés à **droite**, large espace négatif à
**gauche** pour le voile dégradé + le titre de la modale).

L'app est déjà câblée : le composant `Modal` accepte `headerImageUrlDark` et l'utilise
automatiquement en mode sombre (repli sur la photo claire si absente). Voir
« Intégration » en bas.

---

## Direction artistique commune (à coller au début de chaque prompt)

> Moody low-key product photography, cozy evening atmosphere. Deep dark background in
> midnight plum and dark teal-blue tones (#1A0A2E, #2D1B4E, #1E3A5F, #0D2137), softly
> graded. Warm golden side light / candle-glow from the right, gentle rim light catching
> the edges of the glass bottles, soft falloff into shadow on the left. Subtle warm bokeh
> highlights. Photorealistic, 50mm, shallow depth of field, fine film grain. Products
> grouped on the RIGHT third of the frame, large empty negative space on the LEFT.
> Landscape 3:2, horizontal. Calm, premium, serene mood.

**Negative prompt (commun)** :
`text, watermark, logo, label text, brand name, cluttered, harsh flash, oversaturated,
neon, cold clinical lighting, busy background, people, hands, plastic look, low quality,
blurry product, tilted horizon`

**Réglages conseillés** : ratio `3:2` (≈ 1500×1000 px), un seul sujet net, fond doux.
Midjourney : ajouter `--ar 3:2 --style raw --q 2`. Flux/DALL·E : préciser « horizontal 3:2 ».

---

## 1. Spray Multi-usage → `multi-usage-dark.jpg`

> [Direction artistique commune] +
> On the right: a clear glass cork-topped bottle of water, a small clip-top jar of dark
> black soap (savon noir), a tall amber-tinted trigger spray bottle of golden liquid, a
> bunch of dried lavender in a stone pot, and a halved lemon glowing warmly. Warm candle
> light grazes the lemon and the amber liquid. Deep plum background fading to black on the
> left.

## 2. Dégraissant Puissant → `degraissant-dark.jpg`

> [Direction artistique commune] +
> On the right: a clear glass cork-topped bottle of vinegar, a clip-top jar of white
> powder (washing soda crystals), a small clip-top jar of dark black soap, a frosted white
> trigger spray bottle, a draped natural linen cloth, a sprig of eucalyptus in the upper
> right catching the warm rim light. Dark teal-blue background, cozy and moody.

## 3. Anti-traces Vitres → `vitres-dark.jpg`

> [Direction artistique commune] +
> On the right, resting on a dark polished surface: a clear glass cork-topped bottle of
> clear liquid and a clear glass trigger spray bottle, with a small stack of folded soft
> microfiber cloths. Faint warm window-blind light stripes on the deep plum wall behind.
> Reflections glowing on the dark countertop. Intimate evening mood.

## 4. Détachant Textile → `textile-dark.jpg`

> [Direction artistique commune] +
> On the right: a clear glass trigger spray bottle of milky liquid, a cube of natural
> Marseille soap, a small glass bowl of white powder (percarbonate), and a neat stack of
> white folded towels glowing softly in warm light. A delicate baby's-breath shadow on the
> deep midnight-plum background. Soft, tender, cozy.

## 5. Répulsif Poussière → `poussiere-dark.jpg`

> [Direction artistique commune] +
> On the right: a clear glass cork-topped bottle, a tall amber trigger spray bottle of
> golden olive-oil-based liquid, a small glass dropper bottle of essential oil, a tiny
> cork jar of golden oil, fresh lavender sprigs and an olive branch, with a woven natural
> cloth. Warm honey-gold light through the oils. Dark sage-into-charcoal background.

## 6. Désinfectant Naturel → `desinfectant-dark.jpg`

> [Direction artistique commune] +
> On the right: a clear glass cork-topped bottle of clear liquid, a clear glass trigger
> spray bottle, a small amber essential-oil bottle with a black dropper cap, a sprig of
> tea tree and a trailing eucalyptus branch catching cool-warm rim light. Deep midnight
> teal-blue background fading to black on the left. Clean, fresh yet cozy.

---

## Conseils pour garder la cohérence avec la version claire

- **Même cadrage et mêmes objets** : on garde la "famille" de produits de chaque recette,
  on ne change que l'ambiance lumineuse et le fond.
- **Espace négatif à gauche** : indispensable, le titre de la recette s'affiche en bas et
  un voile dégradé noir monte depuis le bas. Un fond trop chargé à gauche nuirait à la
  lisibilité.
- **Chaleur > froideur** : l'app sombre tire sur le violet/bleu nuit ; une lumière chaude
  (bougie/lampe) qui réchauffe les verres évite l'effet "labo froid".
- Générer en **3:2 horizontal**, puis exporter en JPG qualité ~80 et largeur 1500 px.

## Intégration dans l'app (déjà préparée)

1. Déposer les fichiers dans `public/images/sprays/` avec le suffixe `-dark.jpg`
   (ex. `multi-usage-dark.jpg`).
2. Dans `src/data/recettes.ts`, ajouter `imageUrlDark` à chaque recette concernée, ex. :
   ```ts
   imageUrl: '/images/sprays/multi-usage.jpg',
   imageUrlDark: '/images/sprays/multi-usage-dark.jpg',
   ```
   (Le champ `imageUrlDark` existe déjà sur `RecetteComplete` **et** `Spray`.)
3. Optionnel : générer un placeholder blur (LQIP) pour chaque nouvelle image, comme pour
   les photos claires (cf. `src/data/imageBlur.ts`).
4. C'est tout — `Modal` bascule automatiquement sur la photo sombre quand le thème sombre
   est actif, et retombe sur la photo claire si la variante n'existe pas.
