# Reprise — publication cohérente — 3 octobre 2026

Premier lot réalisé localement sur `codex/publication-coherente`, depuis le commit audité `a34bfe061bd0ebfdf0bedc84b77d922356e628c6` de `claude/v1-redesign-019MxTqprijt8RSd8uq6cEMH`.
Références : `Cleanz_Audit_150_Recettes.csv` et `Cleanz_Audit_Business_Produit_2026-10-02.pdf`.
La demande de travail provient du texte de passation joint ; les audits documentent les décisions.
Aucun push, merge ou déploiement ; aucune modification des dépendances ni des documents sources.

## Décisions et point d’entrée

`src/data/publication.ts` fournit les listes admissibles et l’accès aux instructions canoniques.
Le registre `revue.ts` autorise explicitement **81 fiches publiées** ; les autres sont réparties en **38 en attente, 4 suspendues, 11 fusionnées et 16 retirées** (150 au total).
Les suspensions **13, 30, 97 et 107** sont des décisions documentaires de ce lot, issues du CSV.
Une entrée absente ou nouvellement ajoutée ne devient jamais publiée par défaut.
« Publiée » désigne une autorisation éditoriale ; aucune efficacité, innocuité ou formulation n’a été validée physiquement dans ce travail.

Une fiche bloquée affiche son identité et son statut sans ingrédients, dosage ni préparation.
Les motifs d’audit contenant d’anciennes formules ne sont pas repris dans ces notices.
Les fusions utilisent uniquement la destination explicite, publiée, existante et sans cycle.
Exemple : 29 ouvre la fiche 3 avec explication ; 22→6, 33→13 et 129→107 restent indisponibles.
Les six identifiants historiques de sprays restent stables ; seuls 1, 3, 4 et 5 sont proposés.

## Chemins contrôlés

| Chemin | Comportement |
| --- | --- |
| Catalogue, recherche, accueil, sprays | Sélections publiées et instructions canoniques. |
| Surfaces, vapeur, ingrédients | Associations admissibles dédoublonnées ; aucun repli générique si elles sont absentes. |
| Favoris et liste de courses | Identités historiques conservées ; import des ingrédients depuis les seules destinations publiées. |
| Flacons, étiquettes, QR, liens et anciens slugs | Statut actuel visible ; fusion expliquée ou notice d’indisponibilité. |
| Astuces, conseils saisonniers | Formules parallèles supprimées ou reliées à leur fiche ; pas de correspondance inventée. |
| Piscine/spa et appareils | Doublons identifiés reliés aux fiches 143/144 et 131/132 ; instructions bloquées masquées, y compris les onglets entretien. |

Les autres conseils autonomes n’ont pas tous fait l’objet d’un nouvel audit scientifique.
Les archives restent dans les sources : ce contrôle de l’interface n’est pas un contrôle d’accès serveur et ne prétend pas rendre les anciennes formules confidentielles.

## Données locales et hors ligne

Les flacons gardent leurs identifiants, numéros, références, dates et champs supplémentaires.
La lecture initiale n’écrit pas dans le stockage ; les entrées incomplètes sont préservées.
Un JSON malformé reste intact et téléchargeable ; une écriture destructive est refusée.
Les erreurs de quota et les modifications concurrentes sont traitées sans écrasement silencieux.
Aucun instantané de composition n’existait : une fiche actuelle ne prouve pas le contenu d’un ancien flacon.
Les anciennes dates sont des estimations historiques ; les nouveaux flacons ont `expiresAt: null`.
L’interface et les étiquettes indiquent que la conservation n’est pas établie.

Version de publication : **`2026-10-03.1`**, à incrémenter lors de toute modification des règles/statuts.
Le service worker ne cache que les ressources statiques Next admissibles, jamais HTML, RSC ou API.
Il purge uniquement les anciens caches `cleanz-runtime-*` et ne touche pas au `localStorage`.
Une navigation hors ligne renvoie une page explicative HTTP 503, sans ancienne recette en secours.
Un onglet déjà chargé ou un ancien client resté hors ligne ne peut pas être révoqué à distance : la nouvelle règle s’applique après réception de la mise à jour et rechargement.

## Vérification

Build de production et TypeScript réussis sur Node 24.19.0 / npm 11.9.0.
Tests réussis : publication **44**, sprays/QR **26**, recherche **5**, astuces **4**, stockage **15**,
plus exécution simulée du véritable service worker et parcours Chromium piscine/spa.
Chromium sur build de production : **5/5 groupes** (liens, recherche/surfaces, flacons/favoris,
récupération JSON et courses), plus **6 assertions appareils** et **3 étapes hors ligne** réussis.
La fenêtre d’impression s’ouvre et son QR PNG est décodé avec l’identité historique attendue.
Rechargement, création sans date limite, import canonique des courses et deux onglets appareils vérifiés.
Réseau réellement coupé puis rétabli : page 503, purge ciblée du cache et données locales préservées.
Le lint reste en échec : **36 erreurs / 7 avertissements**, contre **41 / 10** sur la base ; aucun nouveau diagnostic après comparaison par fichier, règle, gravité et première ligne du message.
Pas d’essais physiques, d’impression papier, de scan sur téléphone ni de validation Safari/iOS.

Depuis le dépôt, reproduire les tests métier avec les dépendances installées :

```bash
for suite in publication sprays publication-search publication-astuces; do
  npm exec --yes --cache /workspace/.cache/npm --package=tsx@4.21.0 -- tsx "scripts/test-$suite.mts" || exit
done
node --experimental-strip-types scripts/test-user-spray-storage.mts
node --experimental-strip-types scripts/test-publication-cache.mts
npx tsc --noEmit
npm run build
npm run lint
# Dans un autre terminal : npm run start -- --hostname 127.0.0.1 --port 3000
for suite in browser offline appareils; do node "scripts/test-publication-$suite.mjs" || exit; done
python3 scripts/test-publication-piscine.py # Playwright Python et Chromium requis
```

Les scripts navigateur demandent Playwright/Chromium dans l’environnement, sans ajout au manifeste.

## Priorité identifiée à la clôture de ce lot

Préparer une mise à jour de sécurité ciblée de Next avant diffusion : l’audit des dépendances signale **14 paquets** (1 critique, 9 élevés, 3 modérés, 1 faible), dont Next `16.0.7` directement.
La cible proposée par npm est `16.3.8` ; vérifier les avis applicables et refaire build/parcours avant livraison.
Références officielles : [Next AVIF](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4), [Next Windows](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36), [Next Server Actions](https://github.com/vercel/next.js/security/advisories/GHSA-m99w-x7hq-7vfj), [React RSC](https://github.com/react/react/security/advisories/GHSA-wx67-qw84-cm4g).
L’applicabilité dépend des fonctionnalités et de la plateforme ; mettre à jour React seul ne suffit pas pour le RSC embarqué par Next.

Suite réalisée sur demande : Next 16.3.8 et React/React DOM 19.3.0 installés ;
audit npm à zéro vulnérabilité signalée, build/types et parcours réussis à nouveau.
Le lint avec la nouvelle configuration signale 38 erreurs / 7 avertissements.
Voir [l’aperçu iPhone et les preuves de cette mise à jour](APERCU-IPHONE.md).
