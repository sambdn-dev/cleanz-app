# Logo fourni et navigation dynamique — 3 octobre 2026

La demande porte sur l’intégration du nouveau logo, ses deux modes, et une barre
plus fine qui masque ses titres à la descente et les retrouve à la remontée.
Le pack joint fournit la référence graphique. Sa maquette d’accueil non validée
et ses propositions de parcours ne servent pas de cible à ce lot.

## Identité

- Le PNG original est conservé dans `docs/assets/cleanz-logo-reference.png`.
  Les contours des lettres sont extraits de cette image, avec ses proportions,
  son « a » à deux étages et son espacement ; aucune police de remplacement.
  `scripts/prepare-brand-wordmark.py` régénère le SVG et le masque intégré.
  Cette préparation requiert Pillow, NumPy et SciPy, pas le build de l’app.
- `BrandLogo` partage cette silhouette entre l’en-tête, le démarrage et la fenêtre
  de mise à jour. En sombre : blanc doux, reflets rose/lavande et halo léger.
  En clair : matière aubergine avec reflets rose/lavande, sans halo, pour préserver
  la lisibilité. Ces déclinaisons web sont des adaptations de la référence fournie.
- Les couleurs bougent uniquement dans le logo de démarrage ; l’en-tête reste
  stable. Les styles et contours critiques restent dans le head : le premier
  affichage du logo ne dépend d’aucun téléchargement de PNG ou de police.
- Les bordures de marque des commandes utilisent désormais rose et lavande.
  Les autres surfaces et couleurs fonctionnelles existantes restent à traiter
  dans un éventuel lot de direction artistique. L’icône d’installation PWA
  n’est pas redessinée dans cette livraison.

## Navigation

- Cinq destinations conservées ; Favoris reste dans Mon compte.
- Hauteur totale : 64 px avec les titres, 54 px avec les seules icônes, contre
  78 px précédemment. Chaque cible tactile garde au moins 44 × 44 px.
- Défilement de 28 px vers le bas pour compacter ; 18 px vers le haut pour ouvrir.
  Les petites inversions de direction ne font pas clignoter les libellés.
- Transition de taille de 320 ms avec décélération, accompagnée d’un fondu des
  titres. L’état React change uniquement aux seuils ; le suivi utilise un écouteur
  passif et requestAnimationFrame, sans moteur physique permanent.
- Les rebonds hors des limites sont ignorés. Le haut de page, la sélection d’un
  onglet et le focus clavier restaurent les titres. Les boutons gardent leur nom
  accessible et l’indication de la destination active même en mode compact.
- Les déplacements dus à l’ancrage du navigateur lorsque les sections différées
  changent de hauteur ne sont pas interprétés comme une remontée volontaire.
- La marge de contenu est constante : aucune variation de hauteur de la page
  lorsque la barre se replie. Zones sûres et affichage du cadre iPhone conservés.
  Avec la réduction des animations, le changement d’état est immédiat.

## Vérifications

Build de production/TypeScript, lint ciblé et contrôle du diff. Tests Chromium :

- Cinq groupes dans `test-splash-navigation.mjs` : apparition/thèmes, secours sans
  JS, animations réduites, quatre largeurs dans les deux modes, toucher/clavier,
  retour des titres, petits mouvements, progression de taille sans saut du contenu,
  parcours compte/favoris et conservation des données.
- Continuité du démarrage : CPU ralenti, ressources retardées, thème stable,
  fondu progressif et absence de réapparition du splash après une hydratation tardive.
- Aperçu iPhone : sept profils, Dynamic Island, zones sûres, défilement, modales,
  modes et actualisation automatique préservant le stockage.

Captures : `/workspace/cleanz-delivery/logo-menu/`. Les essais utilisent Chromium ;
ils ne constituent pas une validation Safari/iOS réel. Aucune conformité à des
spécifications « iOS 27 » n’est revendiquée.

Publication sur l’aperçu Vercel de `codex/apercu-iphone` par l’intégration Git
existante. Les règles de synchronisation, de cache et de service worker ne changent pas.
