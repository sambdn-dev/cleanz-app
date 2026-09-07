# Photos de surfaces — lots 2 à 8 (74 images)

Lot 1 (Cuisine, 10 images) est intégré et la DA est validée. Ce document contient
les prompts ChatGPT des lots suivants. Chaque prompt se termine par le nom de
fichier à donner au téléchargement : c'est ce nom qui permet l'intégration
automatique.

## Intégration d'un lot

1. Générer les images avec le **bloc de style** + le prompt de la surface.
2. Renommer chaque fichier comme indiqué (`surface-<slug>.png`).
3. Déposer le dossier, puis :

```
node scripts/ingest-surfaces.mjs <dossier>
npm run build
```

Le script redimensionne en 1200×800, génère le flou de chargement, ajoute
l'entrée dans `SURFACE_PHOTOS` et signale tout nom qui ne correspond à aucune
surface ou appareil.

## Bloc de style (à coller avant chaque prompt)

> Photo réaliste, format paysage 3:2 (1536×1024). Intérieur scandinave chaleureux :
> bois clair, blanc cassé, plantes vertes, textiles en lin. Lumière naturelle douce
> venant d'une fenêtre, tons chauds légèrement désaturés, faible profondeur de
> champ (sujet net, arrière-plan doucement flou). Le sujet occupe le centre et
> les deux tiers inférieurs de l'image. Un ou deux accessoires naturels discrets
> (citron, éponge végétale, bocal de bicarbonate, vinaigre blanc, chiffon en
> coton). Surface propre et fraîchement entretenue. Aucune personne, aucun texte,
> aucun logo, aucune marque, aucun produit chimique du commerce.

Les surfaces « Véhicule » et « Extérieur » gardent la même lumière et la même
palette, mais en extérieur : allée pavée claire, garage lumineux, jardin
verdoyant en fin d'après-midi.

---

## Lot 2 — Cuisine (2/2) & petit entretien · 10 images

1. **Torchons** — Pile de torchons en lin propres, pliés sur un plan de travail en bois clair, un torchon rayé suspendu à une barre en laiton, citron coupé à côté. → `surface-torchons.png`
2. **Tasses & Mugs** — Trois mugs en céramique claire alignés sur une étagère en bois, l'un retourné et étincelant, cuillère de bicarbonate dans une coupelle. → `surface-tasses-mugs.png`
3. **Vaisselle** — Assiettes blanches et verres qui sèchent sur un égouttoir en bois à côté d'un évier, mousse légère, éponge végétale. → `surface-vaisselle.png`
4. **Casseroles & poêles inox** — Casserole en inox brillant qui reflète la fenêtre, posée sur un plan de travail en pierre claire, demi-citron et gros sel. → `surface-casseroles-poeles-inox.png`
5. **Bouilloire** — Bouilloire en inox brossé sur un plan en bois, intérieur visible sans calcaire, bouteille de vinaigre blanc en verre floue derrière. → `surface-bouilloire.png`
6. **Cafetière** — Cafetière filtre en verre et machine expresso compacte sur un plan de travail, tasse fumante, grains de café dans un bocal. → `surface-cafetiere.png`
7. **Planches à découper** — Planche à découper en bois massif huilée, demi-citron et gros sel posés dessus, herbes fraîches en arrière-plan. → `surface-planches-a-decouper.png`
8. **Argenterie** — Couverts en argent brillants posés sur une serviette en lin, bol de bicarbonate et feuille d'aluminium froissée en arrière-plan flou. → `surface-argenterie.png`
9. **Microfibres** — Chiffons en microfibre colorés (pastel) pliés en pile sur une machine à laver blanche, lumière douce. → `surface-microfibres.png`
10. **Fer à repasser** — Fer à repasser à semelle brillante posé sur une planche recouverte de lin clair, chemise blanche repassée, vapeur légère. → `surface-fer-a-repasser.png`

## Lot 3 — Salle de bain & corps · 10 images

1. **Carrelage** — Carrelage blanc brillant type métro d'une salle de bain, joints nets, plante verte et serviette en lin, reflet de fenêtre. → `surface-carrelage.png`
2. **Lavabo** — Lavabo en céramique blanche immaculé avec robinet chromé, savon solide sur une coupelle en bois, miroir rond flou derrière. → `surface-lavabo.png`
3. **Pommeau** — Pommeau de douche chromé sans trace de calcaire, gouttelettes d'eau, sachet transparent de vinaigre blanc noué autour, carrelage clair. → `surface-pommeau.png`
4. **Robinetterie** — Robinet mitigeur chromé étincelant en gros plan, gouttes d'eau, demi-citron posé sur le rebord du lavabo. → `surface-robinetterie.png`
5. **Joints** — Gros plan sur des joints de carrelage blancs impeccables, vieille brosse à dents en bois et petit bol de pâte au bicarbonate. → `surface-joints.png`
6. **Canalisations** — Bonde de lavabo chromée en gros plan, effervescence blanche du bicarbonate et vinaigre qui mousse doucement, lumière claire. → `surface-canalisations.png`
7. **Baignoire** — Baignoire blanche immaculée près d'une fenêtre, tabouret en bois avec serviette pliée et éponge végétale, plante verte. → `surface-baignoire.png`
8. **Linge** — Linge blanc et pastel plié sur un lit en lin, panier en osier, bouteille de lessive maison en verre ambré. → `surface-linge.png`
9. **Mains** — Deux mains propres (cadrées sur les mains uniquement) sous un filet d'eau claire au-dessus d'un lavabo, savon de Marseille en cube. → `surface-mains.png`
10. **Bijoux** — Bagues et chaîne en or et argent qui brillent sur un lin clair, petite coupelle de bicarbonate, brosse douce. → `surface-bijoux.png`

## Lot 4 — Chambre, linge & textiles · 10 images

1. **Draps & lit** — Lit fait avec draps en lin blanc cassé froissés, lumière matinale, brin de lavande sur l'oreiller. → `surface-draps-lit.png`
2. **Rideaux** — Rideaux en lin clair qui filtrent la lumière du matin, tringle en bois, plante verte au pied de la fenêtre. → `surface-rideaux.png`
3. **Gourdes** — Gourdes en inox et en verre ouvertes sur un plan en bois, goupillon en bois, bocal de bicarbonate. → `surface-gourdes.png`
4. **Chaussures** — Chaussures en cuir marron cirées sur un banc en bois d'entrée, brosse en crin et chiffon en coton. → `surface-chaussures.png`
5. **Doudounes** — Doudoune beige propre et gonflante suspendue à un cintre en bois près d'une fenêtre, balles de tennis dans un panier flou. → `surface-doudounes.png`
6. **Baskets** — Paire de baskets blanches immaculées sur un sol en bois clair, brosse douce et bol de pâte au bicarbonate, plante verte. → `surface-baskets.png`
7. **Cuir** — Fauteuil en cuir cognac en gros plan, chiffon en coton et petit flacon d'huile, lumière chaude. → `surface-cuir.png`
8. **Matelas & sommier** — Matelas nu sur un sommier en bois, draps retirés, bicarbonate saupoudré en fine couche, fenêtre ouverte. → `surface-matelas-sommier.png`
9. **Jouets** — Jouets en bois et peluches propres alignés sur une étagère de chambre d'enfant, lumière douce, bassine d'eau savonneuse floue. → `surface-jouets.png`
10. **Nuisibles** — Rebord de fenêtre en bois propre avec coupelle de vinaigre blanc et brins de menthe et lavande, aucun insecte visible, jardin flou. → `surface-nuisibles.png`

## Lot 5 — Salon & pièces de vie · 11 images

1. **Tapis** — Tapis en laine crème à motifs discrets sur un parquet, bicarbonate saupoudré, brosse en bois, canapé flou. → `surface-tapis.png`
2. **Moquette** — Moquette gris clair propre en gros plan à ras du sol, éponge végétale et bol d'eau vinaigrée, pied de fauteuil flou. → `surface-moquette.png`
3. **Canapé** — Canapé en tissu beige aux coussins en lin, chiffon en coton et bol de mousse au savon, lumière de fin d'après-midi. → `surface-canape.png`
4. **Interrupteurs** — Interrupteur blanc immaculé sur un mur blanc cassé, chiffon microfibre pastel, plante verte floue. → `surface-interrupteurs.png`
5. **Portes** — Porte intérieure blanche à panneaux avec poignée en laiton, parquet clair, chiffon en coton sur la poignée. → `surface-portes.png`
6. **Poignées** — Gros plan sur une poignée de porte en laiton brossé qui brille, chiffon en coton, citron coupé sur une console floue. → `surface-poignees.png`
7. **Meubles en bois** — Buffet en chêne clair huilé, chiffon en coton et petit flacon d'huile d'olive, vase en céramique avec eucalyptus. → `surface-meubles-en-bois.png`
8. **Parquet** — Parquet en chêne clair qui reflète la fenêtre, serpillière en microfibre et seau en bois, plante verte. → `surface-parquet.png`
9. **Cuivre & Laiton** — Casserole en cuivre et bougeoir en laiton étincelants sur une table en bois, demi-citron et gros sel. → `surface-cuivre-laiton.png`
10. **Autocollants** — Bocal en verre dont on retire une étiquette, résidu de colle et flacon d'huile, plan de travail clair. → `surface-autocollants.png`
11. **Murs & Papier peint** — Mur peint blanc cassé et pan de papier peint à motifs délicats, éponge végétale et bol d'eau savonneuse, plante verte. → `surface-murs-papier-peint.png`

## Lot 6 — Technique, électronique & appareils uniques · 12 images

Les sept appareils sans surface homonyme (climatisation, sèche-linge, chauffe-eau,
congélateur, centrale vapeur, aspirateur eau/poussière, purificateur d'air) sont
intégrés par le même script : leur photo s'affiche dans la fiche Électroménager.

1. **Téléphone** — Smartphone sombre sans logo posé écran vers le haut sur un bureau en bois, chiffon microfibre gris, plante verte. → `surface-telephone.png`
2. **Ordinateur** — Ordinateur portable ouvert écran éteint et propre sur un bureau en bois clair, chiffon microfibre, tasse de thé. → `surface-ordinateur.png`
3. **Aspirateur** — Aspirateur traîneau sans logo, filtre et bac retirés et propres posés à côté sur un sol en bois, lumière de garage claire. → `surface-aspirateur.png`
4. **Chaudière** — Chaudière murale blanche sans logo dans une buanderie propre et lumineuse, tuyaux en cuivre, étagère en bois. → `surface-chaudiere.png`
5. **Radiateurs** — Radiateur en fonte blanc sous une fenêtre lumineuse, plumeau en bois et chiffon en coton, plante verte. → `surface-radiateurs.png`
6. **Climatisation** — Unité de climatisation murale blanche sans logo, capot ouvert avec filtre propre sorti, mur blanc cassé, plante verte. → `surface-climatisation.png`
7. **Sèche-linge** — Sèche-linge blanc sans logo à hublot ouvert, filtre à peluches propre tenu devant, buanderie lumineuse. → `surface-seche-linge.png`
8. **Chauffe-eau** — Chauffe-eau cylindrique blanc sans logo dans une buanderie claire, tuyaux en cuivre, bouteille de vinaigre blanc en verre. → `surface-chauffe-eau.png`
9. **Congélateur** — Congélateur armoire blanc ouvert, tiroirs vides et propres sans givre, chiffon en coton, cuisine claire. → `surface-congelateur.png`
10. **Centrale vapeur** — Centrale vapeur sans logo sur une planche à repasser en lin, filet de vapeur, chemise blanche, lumière douce. → `surface-centrale-vapeur.png`
11. **Aspirateur eau/poussière** — Aspirateur cuve inox sans logo dans un garage lumineux et rangé, sol en béton clair propre, tuyau enroulé. → `surface-aspirateur-eau-poussiere.png`
12. **Purificateur d'air** — Purificateur d'air cylindrique blanc sans logo dans un salon clair, filtre propre posé à côté, plante verte, lumière de fenêtre. → `surface-purificateur-d-air.png`

## Lot 7 — Voiture & moto · 10 images

1. **Carrosserie** — Carrosserie blanc nacré d'une voiture sans logo, gouttes d'eau perlées, gant microfibre et seau, allée pavée claire. → `surface-carrosserie.png`
2. **Jantes** — Jante alu brillante en gros plan, brosse à jantes en bois et seau d'eau mousseuse, sol pavé clair. → `surface-jantes.png`
3. **Phares** — Phare de voiture transparent et limpide en gros plan, chiffon microfibre et tube de dentifrice blanc uni, reflet du ciel. → `surface-phares.png`
4. **Vitres auto** — Pare-brise propre reflétant des arbres, raclette et vaporisateur en verre d'eau vinaigrée sur le capot. → `surface-vitres-auto.png`
5. **Sièges auto** — Siège de voiture en tissu gris propre, portière ouverte, brosse douce et bol de mousse au savon, lumière naturelle. → `surface-sieges-auto.png`
6. **Plastiques** — Tableau de bord en plastique noir mat propre et sans reflet gras, chiffon microfibre, lumière douce par le pare-brise. → `surface-plastiques.png`
7. **Pneus** — Pneu noir profond et propre en gros plan, brosse et éponge, gouttes d'eau, sol pavé clair. → `surface-pneus.png`
8. **Ceintures** — Ceinture de sécurité déroulée et maintenue par une pince, chiffon en coton, siège en tissu clair. → `surface-ceintures.png`
9. **Casque moto** — Casque de moto intégral noir mat sans logo, visière ouverte et mousses intérieures sorties, table en bois dans un garage clair. → `surface-casque-moto.png`
10. **Selle moto** — Selle de moto en cuir noir brillante en gros plan, chiffon en coton et flacon d'huile, garage lumineux. → `surface-selle-moto.png`

## Lot 8 — Extérieur & jardin · 11 images

1. **Terrasse** — Terrasse en lames de bois claires fraîchement nettoyées, moitié encore humide, brosse-balai en bois, jardin verdoyant. → `surface-terrasse.png`
2. **Barbecue** — Grille de barbecue en inox propre posée sur une table de jardin en bois, demi-oignon sur une fourchette, bol de bicarbonate. → `surface-barbecue.png`
3. **Piscine** — Bord de piscine à l'eau limpide, épuisette en bois posée sur la margelle en pierre claire, transats en lin, fin d'après-midi. → `surface-piscine.png`
4. **Tondeuse** — Tondeuse sans logo propre sur une pelouse tondue, lame et carter nettoyés, brosse en bois, lumière rasante. → `surface-tondeuse.png`
5. **Toiture** — Toit en tuiles terre cuite propres et sans mousse vu de près, ciel doux, brosse-balai posée contre la cheminée. → `surface-toiture.png`
6. **Engrais** — Marc de café et coquilles d'œuf écrasées dans un bol en terre cuite, pied de plante en pot, terreau, main de jardinage floue. → `surface-engrais.png`
7. **Canalisations ext.** — Grille d'évacuation en fonte dans une allée pavée, feuilles retirées en tas, seau d'eau et bouteille de vinaigre. → `surface-canalisations-ext.png`
8. **Mobilier de jardin** — Chaise et table de jardin en teck propres sur une terrasse, seau d'eau savonneuse et brosse, plantes en pot. → `surface-mobilier-de-jardin.png`
9. **Plantes & fleurs** — Plantes vertes en pot aux feuilles brillantes sur un rebord extérieur, vaporisateur en verre, chiffon en coton. → `surface-plantes-fleurs.png`
10. **Mauvaises herbes** — Allée pavée propre sans herbe entre les dalles, bouilloire posée à côté et bouteille de vinaigre blanc, jardin flou. → `surface-mauvaises-herbes.png`
11. **Outils de jardin** — Sécateur, bêche et truelle propres et huilés alignés sur un établi en bois, chiffon en coton, lumière d'abri de jardin. → `surface-outils-de-jardin.png`

---

## Rappel des surfaces déjà couvertes

Lot 1 (photos dédiées) : Lave-vaisselle, Réfrigérateur, Micro-ondes, Évier,
Poubelles, Plaques vitrocéramique, Hotte, Friteuse, Airfryer, Poêles & casseroles.

Scènes génériques conservées : Four, WC, Vitres & miroirs, Écrans, Parois de
douche, Lave-linge. Elles peuvent recevoir une photo dédiée plus tard avec le
même script (`surface-four.png`, `surface-wc.png`, `surface-vitres-miroirs.png`,
`surface-ecrans.png`, `surface-parois-de-douche.png`, `surface-lave-linge.png`).

## Visuels produits du Top 5 (onglet Matériel)

Les images officielles ne peuvent pas être téléchargées depuis l'environnement
de développement. Nomenclature pour les déposer manuellement :

`ref-<famille>-<rang>.png` (PNG détouré de préférence, fond transparent)

| Famille | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| vapeur | Kärcher SC 5 EasyFix | Rowenta Clean & Steam Revolution | Polti Vaporetto Smart 100_T | Kärcher SC 3 Deluxe EasyFix | Polti Vaporetto SV440_Double |
| aspirateur | Rowenta X-Force Flex 14.60 Aqua | Dyson V15 Detect | Dreame R20 / Z30 | Dyson Gen5detect | Samsung Bespoke Jet AI |
| robot | Roborock S8 Pro Ultra | Dreame L40 Ultra | Ecovacs Deebot T30 Omni | Roborock Saros 10R | iRobot Roomba Combo j7+ |
| injecteur | Bissell SpotClean Pet Pro | Kärcher SE 4 Plus | Bissell Little Green | Vax Platinum SmartWash | Hoover CleanSlate |
| haute-pression | Kärcher K5 Power Control | Nilfisk Core 130 | Kärcher K7 Premium Flex | Bosch EasyAquatak 120 | Nilfisk Premium 200 |

Puis `node scripts/ingest-refs.mjs <dossier>` : les visuels sont réduits à
640×400 max et reliés automatiquement à la bonne référence.
