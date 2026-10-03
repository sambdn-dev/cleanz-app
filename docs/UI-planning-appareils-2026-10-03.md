# Refonte Planning et Appareils — 3 octobre 2026

Objectif : permettre de voir rapidement les tâches du jour et de retrouver l’entretien
des appareils du foyer, dans l’identité visuelle et les thèmes existants de Cleanz.
Le travail concerne l’application existante, sur la branche d’aperçu `codex/apercu-iphone`.

## Constat sur les écrans initiaux

Captures réalisées sur le build courant dans Chromium, au format 402 × 874 px.
Les captures sont conservées dans `/workspace/cleanz-delivery/refonte-planning-appareils/`.

| Étape | État initial | Observation et conséquence |
| --- | --- | --- |
| 1. Créer un planning | Fonctionnel, très explicatif | Un manifeste et trois blocs précèdent le formulaire. Réduire cette introduction pour rapprocher la saisie des membres et la création du planning. |
| 2. Consulter les tâches | Fonctionnel, difficile à parcourir | L’équilibre et les sept journées sont empilés. Les tâches du jour arrivent loin dans la page ; titres tronqués, attribution par emoji et boutons de 28/32 px. Donner accès à une journée choisie, tout en conservant une vue semaine. |
| 3. Régler le foyer | Fonctionnel, chargé | Membres, quotas et tâches partagent une longue fenêtre défilante. Séparer Foyer et Tâches et conserver exclusions et confirmation de réinitialisation. |
| 4. Retrouver un appareil | Fonctionnel, peu orienté vers le foyer | Grille de trois colonnes, noms tronqués, aucune recherche et sélection personnelle accessible ailleurs seulement. Le graphique énergétique dépasse 100 % et ne décrit pas les appareils possédés : le retirer. |

La capture vérifie l’apparence et les actions observables ; elle ne constitue ni une
certification d’accessibilité, ni un essai sur Safari/iOS réel. Les parcours sont testés
séparément sur des données fictives dans des contextes de navigateur isolés.

## Direction de la refonte

- Planning : journée actuelle prioritaire, sélection de date, vue semaine disponible,
  attribution et durée lisibles, suivi des tâches et équilibre du foyer accessibles.
- Création et réglages : saisie des personnes prioritaire, paramètres organisés et
  commandes tactiles plus grandes.
- Appareils : recherche, filtres par pièce, fiches lisibles et sélection du foyer avec
  la même clé de stockage que la sélection déjà existante.

Les clés du foyer et des tâches accomplies, le moteur de répartition et les règles de
publication restent les références existantes. Aucun historique d’entretien d’appareil,
retard ou échéance n’est inventé. Les méthodes indisponibles gardent leur notice de statut.

## Validation et livraison

Build de production et types réussis. Les dépendances ont été réinstallées depuis le
lockfile existant pour réparer une installation locale incomplète ; aucune version de
paquet n’a changé dans ce lot.

Sept groupes de tests navigateur réussis avec `scripts/test-planning-devices-ui.mjs` :

1. Catalogue Appareils : recherche sans accents, pièces, états vides et nombres exacts.
2. Inventaire : lecture sans réécriture, identifiants inconnus conservés, ajout/retrait et
   relecture des modifications effectuées depuis un autre onglet.
3. Échecs du stockage : sélection illisible ou quota refusé, sans écrasement des données.
4. Planning solo : création, tâches cochées, changement de jour/semaine et persistance.
5. Planning partagé : deux à six personnes, filtres et accès aux méthodes.
6. Réglages : quotas, exclusions, tâches suivies, retrait d’un membre et réinitialisation
   avec annulation ou confirmation.
7. Clavier des réglages : focus initial, boucle Tab/Maj+Tab, contrôles masqués ignorés,
   fermeture Échap et restitution du focus au déclencheur.

Le test existant `scripts/test-publication-appareils.mjs` réussit aussi : lave-linge et
chaudière affichent leurs notices dans Nettoyer, Entretien et la fiche de statut, sans
réintroduire les préparations ou calendriers indisponibles.

Captures finales acceptées dans le dossier de livraison cité plus haut : journée,
réglages, catalogue et appareils personnels en clair/sombre ; création du planning en
clair. Contrôles supplémentaires à 320, 375, 402 et 430 px, dans les deux thèmes : aucun
débordement horizontal de la page, commandes d’au moins 44 px dans les onglets refondus,
photos visibles chargées et aucune erreur JavaScript.

Le lint ciblé des composants et du script réussit. Le lint global conserve **37 erreurs
et 7 avertissements** dans les autres fichiers existants ; aucun diagnostic dans les
fichiers de cette refonte. Le lot précédent en comptait 38 et 7.

Les essais utilisent Chromium et des données fictives. Les thèmes et parcours ne sont
pas présentés comme une certification Safari/iOS ou d’accessibilité complète. Les
équations de répartition, clés de stockage et règles de publication n’ont pas changé.

La livraison se fait par push de `codex/apercu-iphone`, sur l’adresse de branche Vercel
déjà utilisée :
<https://cleanz-app-git-codex-apercu-iphone-sams-projects-67e025cc.vercel.app/>.
La détection automatique de version existante reçoit ce lot après un déploiement réussi.
