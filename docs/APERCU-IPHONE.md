# Aperçu iPhone sur ordinateur

L’aperçu `/simulateur.html` affiche la vraie application dans un cadre iPhone.
Sept profils iPhone 16/17 sont proposés, avec Dynamic Island, barre d’état,
indicateur d’accueil et zones réservées de 62 px en haut / 34 px en bas.
Les barres de scroll sont masquées dans le cadre et dans l’app ; le défilement reste actif.
Les données restent dans le navigateur utilisé. Le cadre ne simule pas Safari/iOS.

Dimensions plein écran CSS reprises des profils Playwright 1.62.1 :

| Profils | Écran |
| --- | --- |
| iPhone 16 | 393 × 852 |
| iPhone 16 Plus | 430 × 932 |
| iPhone 16 Pro, iPhone 17, iPhone 17 Pro | 402 × 874 |
| iPhone 16 Pro Max, iPhone 17 Pro Max | 440 × 956 |

Les profils 18 et Duo sont exploratoires, avec dimensions ajustables : aucun matériel
officiel n’est affirmé. Les 62/34 px sont des repères visuels du cadre, pas une certification
de toutes les variantes d’iOS. Les sources Apple n’ont pas pu être consultées depuis le cloud.

## Mises à jour automatiques — branche préparée, publication à autoriser

Branche dédiée : `codex/apercu-iphone`. Elle n’est pas encore poussée sur GitHub.
Après publication autorisée, `scripts/installer-preview.command` installe une copie Git
dans `~/Library/Application Support/Cleanz/apercu`, sans modifier l’ancien ZIP.
Si le dépôt est privé, son accès GitHub doit être configuré localement sur le Mac.
Le lanceur garde une adresse fixe : `http://127.0.0.1:55355/simulateur.html`.
Fermer une fois l’ancien terminal Cleanz pour libérer ce port avant la première installation.

`scripts/preview-sync.mjs` vérifie la branche toutes les 30 secondes, sans reset forcé.
Des changements locaux ou une divergence interrompent la synchronisation et sont préservés.
Les fichiers suivis sont copiés dans un build isolé sous `.cleanz-preview/`, puis `npm ci`
et le build sont exécutés. Le nouveau serveur doit démarrer avant de remplacer le précédent.
En cas d’échec, la dernière version ouverte reste disponible ; le même build invalide
n’est pas relancé en boucle. Une nouvelle révision peut corriger l’échec.
Le cadre vérifie la version toutes les 3 secondes et recharge après un build réussi.
Le modèle choisi est conservé dans la session ; aucune donnée de flacon/favori n’est effacée.
L’adresse fixe utilise la même origine que la première installation sur ce Mac.
Garder le terminal ouvert ; fermer le lanceur arrête son serveur.

Un push sur cette branche reste nécessaire pour transmettre chaque lot depuis le cloud.
Aucun push ni déploiement n’est effectué sans autorisation. Les mises à jour de l’app
arrivent automatiquement ; une modification du lanceur lui-même peut demander son redémarrage.

## Simulateur iOS réel (Mac avec Xcode)

`scripts/iphone-ios.command` propose uniquement les iPhone disponibles dans les runtimes
iOS installés de Xcode. Il ouvre la vraie application dans Safari du Simulateur d’Apple,
avec `?apercu=1` pour recharger après une mise à jour réussie. Aucun modèle fictif n’est ajouté
à Xcode. Safari du Simulateur a son propre stockage ; les données du navigateur Mac y restent.
Ce parcours nécessite Xcode complet et un runtime iOS ; il n’a pas été exécuté dans le cloud Linux.

## Sur Mac

Avec Node.js 24 LTS installé, double-cliquer sur `scripts/iphone.command` depuis le Finder.
Le script installe les dépendances si nécessaire, construit l’app si aucun build n’existe,
puis ouvre l’aperçu dans le navigateur. Garder le terminal ouvert pendant la visite.
Fermer le terminal arrête le serveur lancé par ce script.

## Sur Windows, Linux ou depuis un terminal

Depuis le dossier du projet :

```bash
npm ci
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
```

Ouvrir ensuite `http://localhost:3000/simulateur.html` sur cet ordinateur.
Si un build est déjà fourni, `npm run build` peut être omis.
Un serveur lancé dans l’environnement cloud n’est pas le serveur local de l’ordinateur.

## Vérifications du 3 octobre 2026

Next.js et eslint-config-next : 16.3.8 ; React et React DOM : 19.3.0.
Versions stables courantes du registre npm, épinglées dans le manifeste et le lockfile.
Les dépendances compatibles ont été actualisées sans changement forcé de version majeure.
L’option expérimentale `turbopackUseSystemTlsCerts`, supprimée par Next, a été retirée.
Le build récupère les polices et compile sans désactiver la vérification TLS.

Audit npm complet : **0 vulnérabilité signalée** (contre 14 avant ce lot).
Build et types réussis. Tests publication 44, sprays 26, recherche 5, astuces 4,
stockage 15 et service worker réussis. Parcours Chromium : liens, flacons, récupération,
courses, appareils et coupure réseau vérifiés à nouveau après mise à jour.
L’aperçu est vérifié dans Chromium : navigation de la vraie app, changement de dimensions
390×844 / 430×932, rechargement et absence d’erreur JavaScript.
Lint toujours en échec : 38 erreurs et 7 avertissements avec la nouvelle configuration.
Ces erreurs concernent les composants existants ; le lint n’est pas présenté comme réussi.
La validation ne couvre pas Safari/iOS ni les formulations des conseils.

Aucun push, merge ou déploiement réalisé.

Contrôles du lot suivant : `node --test scripts/test-preview-sync.mjs` (3 scénarios,
vrais dépôts Git locaux et serveurs HTTP : succès, build invalide, changements locaux/coupure).
`node scripts/test-iphone-preview.mjs` vérifie les sept profils, les profils exploratoires,
le défilement, les modales, le thème et le rechargement automatique sans perte du stockage.
Les 3 scénarios Git/serveurs et les 5 groupes navigateur réussissent : dimensions et
zones réservées, défilement/modales/thème, concepts ajustables, actualisation du cadre
avec modèle/données conservés, actualisation de la vraie app avec `?apercu=1`.
Le nouveau composant et les scripts passent leur lint ciblé et les types ; le build réussit.
