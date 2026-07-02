# 🔬 Audit des recettes Cleanz — pertinence, manques & propositions

> **Statut : à valider avant intégration.** Rien n'est encore modifié dans l'app.
> Périmètre : 131 recettes · 82 surfaces · mapping `RECETTES_PAR_SURFACE`.
> Une fois validé, l'intégration = corriger le mapping, réordonner chaque liste
> par pertinence, ajouter les ~13 nouvelles recettes.

---

## 1. Synthèse

| Constat | Volume | Gravité |
|---|---|---|
| Erreurs de mapping (recette hors-sujet sur une surface) | 7 surfaces | 🔴 haute |
| Recettes **orphelines** (reliées à aucune surface) | 12 recettes | 🟠 moyenne |
| Surfaces avec **1 seule** recette | 27 surfaces | 🟠 moyenne |
| Recettes génériques affichées **avant** les recettes dédiées | ~15 surfaces | 🟠 moyenne |
| Recettes **risquées** pour la surface recommandée | 4 cas | 🔴 haute |
| Doublons réels | 0 (bon point ✅) | — |

Le fond du catalogue est **solide** (recettes justes chimiquement, doses cohérentes,
précautions présentes). Le problème n° 1 n'est pas la qualité des recettes mais leur
**distribution** : le mapping surface→recettes contient des erreurs, ignore 12 recettes,
et n'est pas trié par pertinence.

---

## 2. 🔴 Erreurs à corriger en priorité

### 2.1 Mappings faux ou risqués

| Surface | Problème | Correction proposée |
|---|---|---|
| **Lave-vaisselle** (2) | L'unique recette proposée est… « Nettoyant Sol Carrelage » (#9). Erreur pure. | Remplacer par **#10 Poudre Lave-Vaisselle** (orpheline !) + nouvelle recette « Entretien Lave-vaisselle » (§5.2) |
| **Gourdes** (22) | Propose « Anti-traces Vitres » (#3) → contient de l'**alcool ménager, non alimentaire**. Même problème d'esprit avec les anti-calcaires à liquide vaisselle. | Nouvelle recette dédiée « Gourdes & Bouteilles » sans alcool ni HE (§5.4). Garder #129 en 2ᵉ (rinçage abondant mentionné) |
| **Écrans** (60) | « Spray Alcool 70° » (#35) proposé **en premier** → l'alcool pur dégrade le revêtement oléophobe des écrans. | Retirer #35 des écrans. Nouvelle recette douce « Écrans Ultra-doux » (§5.5) en n° 1, #23 en n° 2 |
| **Plastiques auto** (43) | Unique reco = alcool 70° → **blanchit et ternit** les plastiques intérieurs à la longue. | Nouvelle recette « Plastiques Intérieurs Auto » (§5.6), alcool retiré |
| **Évier** (8) | « Nettoyant WC Spray » (#32) recommandé pour l'évier de cuisine → chimiquement OK, **psychologiquement rédhibitoire**. | Retirer #32 de l'évier. Ajouter **#21 Crème à Récurer** (orpheline) et **#16 Liquide Vaisselle Maison** |
| **Carrelage SdB** (11) | Même problème : #32 « Nettoyant WC Spray ». | Retirer. Le carrelage a déjà 3 bonnes recettes |
| **Parois de douche** (14) | « Déboucheur Canalisations » (#33) → concerne la bonde, pas la paroi. | Retirer (reste 6 recettes, très bonne couverture) |

### 2.2 Recettes pertinentes non reliées (gains immédiats)

| Surface | Recette existante à ajouter | Pourquoi |
|---|---|---|
| Toiture (52) | **#46 Anti-Mousses Terrasse** | Sa fiche mentionne déjà « Toiture » ! |
| Torchons (10) | **#98 Détachant Graisse** + **#45 Blanchisseur Linge** | Fiches mentionnent déjà les torchons |
| Interrupteurs (28) | **#87 Plastiques Jaunis** (orpheline) | Fiche mentionne « Interrupteurs, Prises » |
| Baignoire (88) | **#8 Spray Anti-Calcaire**, **#28 Spray Parois de Douche**, **#13 Déboucheur Naturel** | Les 3 fiches mentionnent la baignoire |
| Lave-linge (30) | **#18 Assouplissant Naturel** (orpheline) | Fiche mentionne « Lave-linge » |
| Vaisselle (65) | **#10 Poudre Lave-Vaisselle** + **#16 Liquide Vaisselle Maison** (orphelines) | Évidents |
| Joints (18) | **#14 Anti-Moisissures** (orpheline) | La recette anti-moisissures historique n'est reliée nulle part |
| Meubles en bois (73) | **#5 Répulsif Poussière** + **#17 Spray Anti-Poussière** (orphelines) | Fiches dédiées aux meubles |
| Draps & lit (20) | **#18 Assouplissant Naturel** | Fiche mentionne les draps |
| Rideaux (21) | **#77 Anti-Moustiques Citronnelle** (orpheline) | Fiche mentionne fenêtres/rideaux |
| Terrasse (48) | **#77 Anti-Moustiques**, **#80 Désherbage Eau Bouillante** (joints de terrasse) | Cohérence été |

### 2.3 Recettes orphelines restantes (sans surface naturelle)

- **#70 Anti-Insectes** (terre de diatomées), **#74 Répulsif Souris**, **#76 Spray
  Purifiant Hiver** → aucune surface ne correspond (« air ambiant », « nuisibles »).
  **Proposition** : les rattacher à la section saisonnière (hiver pour #76) et créer
  à terme une carte « Nuisibles » dans Astuces. Elles restent trouvables par la
  recherche intelligente en attendant.

---

## 3. 📐 Règles de classement par pertinence (proposées)

Ordre d'affichage des recettes sur chaque fiche surface :

1. **La recette dédiée d'abord** — conçue pour cette surface précise
   (ex. WC → « Mousse Active WC », pas « Spray Alcool 70° »).
2. **Puis les spécialistes du problème** de la surface (détartrant sur robinetterie,
   anti-moisissures sur joints, dégraissant sur hotte).
3. **Vapeur juste après les dédiées** quand la surface est « vapeur-compatible »
   (mise en avant visuelle séparée, cf. chantier vapeur).
4. **Les généralistes en dernier** (#1 Multi-usage, #35 Alcool 70°, #22 Désinfectant
   Express) — utiles mais jamais en tête.
5. À spécificité égale : **efficacité 5 avant 4**, puis temps le plus court.
6. Une recette **risquée** pour la surface → retirée (pas rétrogradée).

> Aujourd'hui #35 « Spray Alcool 70° » apparaît sur 10 surfaces, souvent **en
> premier**. C'est l'anti-pertinence : l'utilisateur qui ouvre « WC » doit voir
> une solution WC, pas un généraliste.

---

## 4. 📋 Classement proposé, surface par surface

Ordre final proposé (⭐ = nouvelle recette à créer, §5). Seules les surfaces dont
l'ordre ou le contenu change sont listées ; les autres sont déjà correctes.

| Surface | Ordre proposé |
|---|---|
| **Four** (1) | 15 Pâte Four → 88 Four Vapeur → 2 Dégraissant Puissant |
| **Lave-vaisselle** (2) | 10 Poudre LV → ⭐ Entretien Lave-vaisselle |
| **Réfrigérateur** (3) | 40 Désodorisant Frigo → ⭐ Joints & Moisissures Frigo → 1 Multi-usage → 71 Tea Tree → 57 Marc de café |
| **Airfryer** (6) | ⭐ Airfryer Doux → 2 Dégraissant (cuve inox uniquement, avec avertissement) |
| **Évier** (8) | 105 Crème à Récurer Douce → 12 Inox Brillant → 21 Crème à Récurer → 13 Déboucheur Naturel → 35 Alcool 70° |
| **Torchons** (10) | 106 Blanchisseur Torchons → 98 Détachant Graisse → 45 Blanchisseur Linge |
| **Carrelage SdB** (11) | 75 Sol Pin → 9 Sol Carrelage → 30 Sols Universel |
| **Lavabo** (13) | 85 Pierre Blanche → 8 Anti-Calcaire → 13 Déboucheur → 33 Déboucheur bicarbonate |
| **Parois douche** (14) | 28 Spray Parois → 8 Anti-Calcaire → 91 Vitres Vapeur → 72 Anti-Moisissures TT → 102 Anti-moisissures → 14 Anti-Moisissures → 35 Alcool |
| **WC** (17) | 7 Mousse Active → 34 Détartrant Express → 101 Détartrant Moussant → 31 Poudre Effervescente → 96 WC Vapeur → 32 WC Spray → 6 Désinfectant → 35 Alcool |
| **Joints** (18) | 20 Joints Carrelage → 89 Joints Vapeur → 72 Anti-Moisissures TT → 14 Anti-Moisissures → 86 Pierre Blanche → 102 Spray anti-moisissures → 8 Anti-Calcaire |
| **Draps & lit** (20) | 11 Lessive → 18 Assouplissant → 45 Blanchisseur → 81 Sang (eau oxygénée) → 65 Sang (fiel) → 4 Détachant Textile |
| **Gourdes** (22) | ⭐ Gourdes & Bouteilles → 129 Anti-Calcaire Express (rinçage ++) |
| **Tapis** (25) | 97 Tapis Vapeur → 42 Désodorisant Tapis → 19 Détachant Tapis & Tissus → 59 Terre de Sommières → 73 Spray Lavande |
| **Canapé** (27) | 94 Canapé Vapeur → 104 Désodorisant Textile → 59 Terre de Sommières → 19 Détachant → 73 Lavande |
| **Interrupteurs** (28) | 22 Désinfectant Express → 87 Plastiques Jaunis → 6 Désinfectant → 35 Alcool |
| **Lave-linge** (30) | ⭐ Entretien Lave-linge → 11 Lessive Maison → 18 Assouplissant |
| **Linge** (32) | 11 Lessive → 18 Assouplissant → 45 Blanchisseur → 4 Détachant → 67 Blanchisseur Sel d'oseille → 65/81 Sang → 98 Graisse → 79 Défroissage Vapeur → 35 Alcool ~~retiré~~ |
| **Téléphone** (33) | 22 Désinfectant Express → 35 Alcool 70° |
| **Ordinateur** (34) | 23 Écrans & Électronique → ⭐ Écrans Ultra-doux |
| **Plastiques auto** (43) | ⭐ Plastiques Intérieurs Auto |
| **Piscine** (50) | 120 Équilibrage Eau → ⭐ Ligne d'Eau → ⭐ Filtre (renvoie vers la nouvelle section Piscine & Spa) |
| **Toiture** (52) | 122 Anti-Mousse Toiture → 46 Anti-Mousses (percarbonate) |
| **Vitres & miroirs** (58) | 29 Vitres & Miroirs → 3 Anti-traces → 91 Vitres Vapeur → 68 Cendre → 35 Alcool |
| **Écrans** (60) | ⭐ Écrans Ultra-doux → 23 Écrans & Électronique (~~35 Alcool retiré~~) |
| **Baskets** (62) | 108 Chaussures en Toile → 130 Désodorisant Baskets → 84 Cuir Blanc → 19 Détachant → 4 Textile |
| **Vaisselle** (65) | 37 Vaisselle Impeccable → 16 Liquide Vaisselle → 10 Poudre LV → 36 Pierre Blanche |
| **Meubles bois** (73) | 62 Soin Meubles → 17 Anti-Poussière → 5 Répulsif Poussière → 56 Polish → 66 Raviveur → 103 Parquet |
| **Cuivre & Laiton** (77) | ⭐ Pâte Cuivre & Laiton → 55 Polish Argenterie |
| **Matelas** (82) | 78 Matelas Vapeur → ⭐ Détachant Urine & Auréoles → 42 Désodorisant → 93 Anti-Punaises Vapeur → 104 Désodorisant Textile → 73 Lavande |
| **Baignoire** (88) | 85 Pierre Blanche → 105 Crème Douce → 8 Anti-Calcaire → 28 Parois → 13 Déboucheur |
| **Murs** (90) | ⭐ Murs Peints & Traces → 90 Décoller Papier Peint |

*(Les surfaces non listées gardent leur contenu actuel, éventuellement réordonné
selon les règles du §3 à l'intégration.)*

---

## 5. ⭐ Nouvelles recettes proposées (13)

Chaque fiche sera rédigée au format complet de l'app (instructions pas-à-pas,
précautions, conservation, astuces). Résumé pour validation :

### 5.1 Entretien Lave-linge 🧺
**La** recherche n° 1 du ménage naturel, absente de l'app.
Vinaigre blanc 500 ml dans le tambour + cycle 90° à vide · bac à lessive démonté
trempé dans eau chaude + cristaux · joint de hublot : bicarbonate + tea tree.
Surfaces : Lave-linge. *Fréquence : 1×/mois.*

### 5.2 Entretien Lave-vaisselle 🍽️
Filtre rincé + brossé au liquide vaisselle · 250 ml de vinaigre blanc dans un bol
en haut + cycle chaud à vide · joints au bicarbonate. Acide citrique 2 c.à.s si
calcaire installé. Surfaces : Lave-vaisselle.

### 5.3 Nettoyant Airfryer Doux 🍤
Cuve et panier : eau chaude + liquide vaisselle + bicarbonate 1 c.à.s (pâte douce
sur résidus). **Jamais de cristaux de soude ni d'abrasif** (revêtement antiadhésif).
Surfaces : Airfryer. *Corrige le mapping risqué actuel.*

### 5.4 Gourdes & Bouteilles 🧴
Bicarbonate 1 c.à.s + eau chaude, agiter, goupillon · odeurs tenaces : vinaigre
blanc pur une nuit · rinçage triple. **Sans alcool, sans HE** (contact alimentaire).
Surfaces : Gourdes. *Corrige le mapping risqué actuel.*

### 5.5 Écrans Ultra-doux 🖥️
Microfibre à peine humide (eau déminéralisée seule) · traces grasses : 1 goutte de
vinaigre blanc dans 100 ml d'eau démin, sur le chiffon **jamais sur l'écran**.
Surfaces : Écrans, Ordinateur, Téléphone. *Corrige le mapping risqué actuel.*

### 5.6 Plastiques Intérieurs Auto 🎛️
Eau tiède 500 ml + savon noir 1 c.à.c, microfibre essorée · finition mate :
1 goutte d'huile de lin sur chiffon sec (anti-poussière, non gras).
Surfaces : Plastiques auto. *Corrige le mapping risqué actuel.*

### 5.7 Détachant Urine & Auréoles Matelas 🛏️
Vinaigre blanc 200 ml + eau 200 ml en spray, tamponner · bicarbonate généreux
6 h → aspirer. Très forte demande (enfants, animaux).
Surfaces : Matelas & sommier, Canapé.

### 5.8 Murs Peints & Traces de Doigts 🏠
Eau tiède + savon noir (peintures lessivables), éponge essorée de bas en haut ·
traces de crayon : gomme au bicarbonate. Test discret obligatoire (peintures mates).
Surfaces : Murs & Papier peint, Portes.

### 5.9 Pâte Cuivre & Laiton 🔔
La vraie recette de grand-mère : farine 1 c.à.s + gros sel 1 c.à.s + vinaigre
blanc (pâte), poser 15 min, rincer, lustrer. Surfaces : Cuivre & Laiton.

### 5.10 Joints & Moisissures Frigo 🧊
Joint de porte : bicarbonate + eau tiède, brosse à dents · points noirs :
vinaigre + tea tree 5 gouttes · essuyage sec (la moisissure aime l'humidité).
Surfaces : Réfrigérateur.

### 5.11 Anti-Insectes Carrosserie 🚗
Avant lavage : bicarbonate 2 c.à.s + eau tiède 500 ml, pulvériser sur impacts,
5 min, microfibre. Ne raye pas le vernis. Surfaces : Carrosserie, Phares.

### 5.12 Ligne d'Eau Piscine 🏊
Pierre d'argile (ou bicarbonate en pâte) sur éponge, frotter la ligne d'eau,
sans vider ni produit chimique. Surfaces : Piscine. *Fait le pont avec la
nouvelle section Piscine & Spa.*

### 5.13 Nettoyage Filtre Piscine 🌀
Cartouche : rinçage jet + bain vinaigre blanc 50/50 une nuit (calcaire) ·
sable : contre-lavage guidé. Surfaces : Piscine.

---

## 6. Mise en œuvre (après validation)

1. **Corriger `RECETTES_PAR_SURFACE`** : erreurs §2.1, ajouts §2.2, ordres §4.
2. **Ajouter les 13 recettes** (ids 132–144) au format complet.
3. Les nouvelles recettes « correctives » (Airfryer, Gourdes, Écrans, Plastiques
   auto) **remplacent** les mappings risqués le même jour — pas d'étape intermédiaire.
4. Recherche intelligente : ajouter les alias (« machine à laver », « hublot »,
   « ligne d'eau », « cafetière italienne »…).
5. Aucun changement de schéma nécessaire : le tri = ordre des tableaux existants.

**Reste ouvert à ta décision :**
- Faut-il retirer #35 « Alcool 70° » de toutes les surfaces où il est générique
  (le garder uniquement sur Téléphone/Poignées/Interrupteurs) ?
- Les 3 orphelines « nuisibles/air » (#70, #74, #76) : section dédiée plus tard,
  ou on les mappe quand même quelque part ?
