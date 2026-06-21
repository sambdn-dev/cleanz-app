# 📸 Photos-scènes des recettes — stratégie « 12 scènes »

Plutôt que **131 photos uniques** (une par recette), on couvre les **8 catégories**
avec **12 photos-scènes** génériques. Chaque recette est **mappée automatiquement**
à la bonne scène selon sa catégorie (le code fait tout, voir
[`src/data/scenes.ts`](../src/data/scenes.ts)).

- **Format** : `1792×1024` (paysage **3:2**).
- **Style** : photo produit **cosy / naturel**, tons beige / vert / lavande,
  lumière douce latérale.
- **Emplacement** : déposer les `.jpg` dans `public/images/scenes/`.

---

## 🔌 Comment activer une scène

1. Génère l'image (prompt ci-dessous), exporte-la en `1792×1024`.
2. Dépose-la dans `public/images/scenes/` avec **exactement** le nom de fichier indiqué.
3. Dans [`src/data/scenes.ts`](../src/data/scenes.ts), **décommente la clé**
   correspondante dans `SCENES_DISPONIBLES`.

> Les images peuvent être ajoutées **une par une** (DALL·E n'en génère qu'une à la
> fois). Tant qu'une scène n'est pas listée dans `SCENES_DISPONIBLES`, les recettes
> de cette catégorie gardent leur **emoji** — aucune image cassée, aucune requête 404.

*(Optionnel) Pour le blur-up progressif, ajouter le placeholder LQIP de chaque
scène dans `src/data/imageBlur.ts`.*

---

## 🗂️ Mapping catégorie → scène

| Clé (`SceneKey`) | Fichier | Catégorie(s) | Variante détectée par mots-clés |
|---|---|---|---|
| `indispensables` | `scene-indispensables.jpg` | Indispensable | — |
| `cuisinePlan` | `scene-cuisine-plan.jpg` | Cuisine (défaut) | — |
| `cuisineFour` | `scene-cuisine-four.jpg` | Cuisine | four, hotte, vitrocéram., plaque, grill, bbq |
| `sdbDouche` | `scene-sdb-douche.jpg` | Salle de bain (défaut) | — |
| `sdbWc` | `scene-sdb-wc.jpg` | Salle de bain | wc, toilette, cuvette, urinoir |
| `sol` | `scene-sol.jpg` | Sol | — |
| `lingeMachine` | `scene-linge-machine.jpg` | Linge (défaut) | — |
| `lingeDetachant` | `scene-linge-detachant.jpg` | Linge | détach, tache, auréole |
| `voitureInt` | `scene-voiture-int.jpg` | Voiture (défaut) | — |
| `voitureExt` | `scene-voiture-ext.jpg` | Voiture | carross., jante, pneu, phare, lave-glace, dégivr, pare-brise, lustr |
| `multiUsage` | `scene-multi-usage.jpg` | Multi-usage | — |
| `entretien` | `scene-entretien.jpg` | Entretien | — |

> Les **6 sprays indispensables** gardent leurs photos dédiées
> (`/images/sprays/…`) — la scène n'est utilisée qu'en repli quand une recette
> n'a pas de photo propre.

---

## 🎨 Prompts (DALL·E) — style Cleanz cosy / naturel

### 1. Kit Indispensables — `scene-indispensables.jpg`
> Cozy product photography on a light wooden shelf. Six elegant glass spray bottles with pastel labels (pink, mint, lavender) arranged in a row. Around them: mason jars with white powder and dried herbs, halved lemons, eucalyptus sprigs, small potted plant. Soft morning light from the left, warm bokeh background. Horizontal 3:2, photorealistic, 35mm lens.

### 2. Cuisine — Plan de travail — `scene-cuisine-plan.jpg`
> Bright modern kitchen scene. White marble countertop with a clear glass spray bottle, folded sage green microfiber cloth, small bowl of baking soda, fresh lemon halves. Stainless steel sink in background. Natural daylight from window, airy and clean. Horizontal 3:2, photorealistic, 50mm lens.

### 3. Cuisine — Four — `scene-cuisine-four.jpg`
> Opened stainless steel oven door revealing spotless interior. On the counter: amber glass spray bottle, rubber gloves (mint green), wire brush, small jar of cream-colored paste. Warm kitchen lighting, slight steam effect. Horizontal 3:2, photorealistic.

### 4. Salle de bain — Douche — `scene-sdb-douche.jpg`
> Sparkling clean walk-in shower with white subway tiles. Glass partition with water droplets catching light. On shelf: frosted glass spray bottle, natural loofah, dried lavender bundle, small succulent plant. Soft diffused light, spa-like atmosphere. Horizontal 3:2, photorealistic.

### 5. Salle de bain — WC — `scene-sdb-wc.jpg`
> Modern minimalist bathroom corner. White ceramic toilet with wooden seat. Beside it: amber glass spray bottle, natural bristle brush in ceramic holder, small eucalyptus sprig in vase. Clean, fresh, calming tones. Horizontal 3:2, photorealistic.

### 6. Sol — Parquet — `scene-sol.jpg`
> Beautiful honey oak hardwood floor reflecting soft light. In frame: traditional wooden mop leaning against wall, metal bucket with soapy water, folded beige linen cloth, small glass jar. Warm afternoon sunlight streaming across floor. Horizontal 3:2, photorealistic.

### 7. Linge — Machine à laver — `scene-linge-machine.jpg`
> Front-loading washing machine with door open showing fluffy white towels. On top: glass jar of washing powder, dried lavender in small vase, wicker basket with folded linens. Laundry room with natural light, cozy atmosphere. Horizontal 3:2, photorealistic.

### 8. Linge — Détachant — `scene-linge-detachant.jpg`
> Close-up of hands holding white cotton t-shirt. Split composition: left side shows red wine stain, right side shows same area completely clean. Background: wooden table with spray bottle, baking soda box. Before/after concept. Horizontal 3:2, photorealistic.

### 9. Voiture — Intérieur — `scene-voiture-int.jpg`
> Car interior dashboard and steering wheel gleaming clean. On passenger seat: small amber spray bottle, microfiber cloth, natural air freshener sachet with dried herbs. Warm sunset light through windshield. Horizontal 3:2, photorealistic.

### 10. Voiture — Extérieur — `scene-voiture-ext.jpg`
> Close-up of glossy dark car hood reflecting sky. Hand with natural sea sponge. Beside car: wooden bucket with soapy water, glass spray bottle, chamois cloth. Driveway setting, golden hour light. Horizontal 3:2, photorealistic.

### 11. Multi-usage — `scene-multi-usage.jpg`
> Elegant clear glass spray bottle as hero product on light marble surface. Surrounded by: whole lemons, rosemary sprigs, small jar of white vinegar, sea salt in wooden bowl. Soft window light, minimalist composition. Horizontal 3:2, photorealistic, 85mm lens.

### 12. Entretien général — `scene-entretien.jpg`
> Organized cleaning station on wooden pegboard wall. Hanging: natural bristle brushes, linen apron, copper dustpan. On shelf below: row of labeled glass jars (baking soda, crystals, citric acid), spray bottles, folded cloths. Warm organized aesthetic. Horizontal 3:2, photorealistic.
