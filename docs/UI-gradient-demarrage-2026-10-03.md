# Dégradés et continuité du démarrage — 3 octobre 2026

L’enregistrement fourni montre une barre claire brièvement visible avant le splash
sombre, une écriture coupée lettre par lettre, puis l’arrivée de l’accueil. Le
nouveau logo reste entier : son dégradé se déplace dans des contours fixes, avec
une lueur colorée douce en sombre et plus discrète en clair. La palette reprend
l’idée des accents lumineux de la référence Dots tout en gardant le mot Cleanz.

## Ouverture

- Le splash est le premier élément du layout, avec ses styles critiques dans le
  head. Il couvre l’écran avant l’arrivée du contenu de l’application.
- Le mot est vectorisé depuis la police existante Plus Jakarta Sans 800, avec
  l’espacement du logo. Le masque est intégré aux styles : aucun téléchargement
  de photo, de logo ou de police nécessaire pour dessiner ces contours.
- Le thème enregistré et la classe dark sont définis avant la peinture, puis
  conservés lors de l’hydratation. Le fournisseur de thème observe les préférences
  du système et les modifications de stockage, sans revenir temporairement au clair.
- La transition attend le premier rendu de l’app, ses polices et le décodage de la
  première image du carrousel, avec une attente bornée pour une ressource lente.
  Le fondu dure 500 ms ; l’accueil n’ajoute plus un second fondu/glissement.
- Sans JavaScript, CSS retire le splash après environ sept secondes. Une hydratation
  tardive ne le réaffiche pas. Les animations réduites affichent le logo fixe.

## Boutons

Une classe partagée associe un fond uni à une bordure dégradée, un texte contrasté
et un halo discret au survol/focus. Elle est utilisée pour la destination active
de la navigation, la catégorie active, Mes favoris dans le compte, la création du
planning et les actions principales de sélection des appareils. Le logo de l’en-tête
reprend les couleurs avec un dégradé fixe. Les destinations et les données du foyer,
des appareils, des favoris et des flacons conservent leur stockage et leurs fonctions.

## Vérifications

- Build de production et TypeScript réussis ; lint ciblé des nouveaux composants,
  du fournisseur de thème, des styles intégrés et des scripts réussi. Les erreurs
  préexistantes des autres fichiers ne sont pas présentées comme corrigées.
- `test-launch-continuity.mjs` : modes clair/sombre enregistrés opposés au système,
  CPU ralenti quatre fois, JS/polices/CSS retardés ; couverture complète, thème
  stable, plusieurs images intermédiaires du fondu et opacité décroissante.
  Boutons et changement de thème en direct vérifiés. Chargement JS différé au-delà
  du délai de secours : aucun retour du splash après sa disparition.
- `test-splash-navigation.mjs` : quatre groupes réussis ; couleurs animées dans un
  logo immobile, thèmes avant hydratation, sortie sans JS, animations réduites,
  huit combinaisons de largeur/thème et parcours du compte/favoris.
- `test-planning-devices-ui.mjs` : sept groupes réussis (recherche, filtres, sélection,
  persistance, quotas, tâches, réglages et clavier).
- `test-iphone-preview.mjs` : cinq groupes réussis (profils, Dynamic Island, zones
  sûres, navigation et mises à jour automatiques).

Les captures et relevés sont dans `/workspace/cleanz-delivery/gradient-demarrage/`.
L’enregistrement utilisateur a été examiné ; les nouveaux contrôles utilisent
Chromium avec des profils et données fictifs. Safari/iOS réel et l’animation native
ou l’image de reprise conservée par iOS ne sont pas validés par ces essais.

La livraison utilise la branche `codex/apercu-iphone` et son intégration Vercel
existante, sans changement des règles de cache du service worker ou de publication.
