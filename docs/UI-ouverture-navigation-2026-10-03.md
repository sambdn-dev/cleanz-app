# Ouverture et navigation — 3 octobre 2026

L’ouverture affiche seulement le mot « cleanz » au centre d’un fond uni clair ou sombre.
Les lettres se révèlent de gauche à droite, puis l’écran se fond dans l’accueil :
environ 1,3 seconde au total. La préférence enregistrée est lue avant la peinture ;
sans préférence, le thème du système est utilisé. Avec les animations réduites,
le logo est fixe et l’écran disparaît après 250 ms. La sortie CSS fonctionne même
avant l’hydratation ; aucune photo de démarrage n’est chargée.

La barre principale contient cinq destinations : Accueil, Planning, Appareils,
Recettes et Matériel. Ses boutons mesurent 60 px de haut, ses libellés restent
visibles pendant le défilement et elle se place au-dessus de la zone sûre inférieure.
Le contenu et l’invitation à installer l’app réservent la hauteur correspondante.

Mes favoris se trouve dans le menu Mon compte et dans la page du compte.
Le bouton « Retour à Mon compte » permet de revenir au compte en conservant
l’onglet principal d’origine. Recettes, ingrédients et flacons utilisent leurs clés
et règles de publication existantes ; aucune migration du stockage.

Validation sur le build de production local dans Chromium :

- `npm run build` et TypeScript réussis.
- Lint ciblé SplashScreen, layout, BottomNav, AccountPage et scripts réussis.
  Les diagnostics préexistants de page.tsx (alerte canicule) et PWAInstallPrompt
  subsistent ; aucun nouveau diagnostic ajouté dans ces fichiers.
- `scripts/test-splash-navigation.mjs` : quatre groupes réussis, couvrant le thème
  avant hydratation, l’absence de photo, la révélation progressive, la sortie sans
  JavaScript, les animations réduites, huit combinaisons de largeur/thème
  (320, 375, 402, 430 px) et les deux accès aux favoris avec retour et conservation
  exacte des favoris et flacons fictifs.
- `scripts/test-publication-browser.mjs` : cinq groupes réussis, dont les anciens
  favoris, la création des flacons, QR/étiquettes, données malformées et courses.
- `scripts/test-iphone-preview.mjs` : cinq groupes réussis, dont les sept profils
  iPhone, Dynamic Island, zones sûres, navigation et mises à jour automatiques.

Captures inspectées dans `/workspace/cleanz-delivery/ouverture-navigation/` et
`/tmp/cleanz-iphone-dynamic-island.png`. Les contrôles utilisent des profils isolés
avec des données fictives ; aucun essai Safari/iOS réel n’est revendiqué.

Livraison sur `codex/apercu-iphone`, via l’intégration Git/Vercel existante :
<https://cleanz-app-git-codex-apercu-iphone-sams-projects-67e025cc.vercel.app/>.
