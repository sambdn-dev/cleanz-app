# Livraison — Lot 1 : supprimer les risques établis dans le contenu

Date : 8 septembre 2026. Périmètre : `Transmission_Claude_Code.md`, « Premier lot ».
Aucune formule proposée par la revue n'a été importée. Aucun essai physique n'a été réalisé.

## Décisions de contenu appliquées

| Consigne du dossier | Application |
| --- | --- |
| Retirer les promesses de désinfection, de santé et d'efficacité absolue | 60 occurrences réécrites ou supprimées dans les recettes, sprays, ingrédients, astuces, matériel, partenaires, tâches et sections saisonnières (« désinfecte », « 99,9 % des bactéries », « antibactérien », « antiviral », « assainit », « garanti », « 0 produit toxique », badges « Miracle », « Zéro risque », « Efficace », « Hygiène totale »…). Les avertissements de sécurité (javel, HE et chats, mélanges) sont conservés. |
| Fiches prioritaires en attente ou remplacées par une orientation utile | Registre `src/data/revue.ts` généré depuis `recettes-revues.json` (150 entrées, sans formule). Statuts : 16 retirées, 11 fusionnées, 38 en attente (P0 restantes), 85 publiées. |
| Ne pas publier les propositions comme « testées » | Étoiles d'efficacité retirées de toutes les listes et fiches. À la place : statut de preuve (« À tester », « Notice fabricant », « Hors périmètre », « Non revue ») et mention explicite « revue éditoriale, sans essai physique ». |
| Ne pas extrapoler une notice fabricant | Aucun nouveau protocole fabricant ajouté. |
| Stockage structuré et anciens flacons | La date de péremption d'un flacon n'est plus calculée par défaut (90 jours) depuis un texte libre : usage immédiat, « à chaque usage » ou durée absente donnent « Validité non confirmée ». Les anciens flacons sont réévalués depuis la conservation actuelle de leur recette. |
| Conserver les anciens IDs, rediriger les fusions, expliquer les retraits partout | Les identifiants sont inchangés. Une fiche fusionnée ouvre sa fiche canonique avec un encart explicite (favoris, QR, liens partagés). Une fiche retirée affiche le motif et l'orientation ; ingrédients, préparation, astuces, badge, conservation et notation ne sont plus affichés ; les précautions restent. Listes, recherche, surfaces et création de flacon n'exposent plus les fiches retirées ou fusionnées. |
| Libellés du calendrier | « 1× / mois » pour 4 semaines, « 1× / trimestre » pour 12 semaines et « tous les 15 jours » remplacés par la période réelle en semaines. « Désinfecter » et « assainir » retirés des intitulés de tâches. |

## Fichiers changés

- Données : `src/data/revue.ts` (nouveau), `recettes.ts`, `sprays.ts`, `ingredients.ts`, `ingredientsComplets.ts`, `taches.ts`, `tips.ts`, `astuces.ts`, `nouveautes.ts`, `materiel.ts`, `partenaires.ts`.
- Interface : `components/ui/PreuveChip.tsx` (nouveau), `modals/RecipeModal.tsx`, `modals/SurfaceModal.tsx`, `recipes/RecipesPage.tsx`, `favorites/FavoritesPage.tsx`, `favorites/MySpraysSection.tsx`, `ingredients/IngredientsPage.tsx`, `home/SaisonCleanzSection.tsx`, `home/ImpactStrip.tsx`, `home/EconomiesWidget.tsx`.
- Logique : `utils/search.ts`, `utils/sprayUtils.ts`, `contexts/UserSpraysContext.tsx`, `types/index.ts`.

## Tests effectivement exécutés

- Compilation TypeScript et build de production : sans erreur.
- Vérification du registre : 150 identifiants couverts une fois ; les 11 cibles de fusion existent et aucune ne pointe vers une fiche retirée (une cible, l'id 6, est elle-même en attente).
- Parcours vérifiés en navigateur (captures) : fiche retirée (id 28), fiche fusionnée ouverte par son ancien lien (id 22 → 6), fiche en attente (id 6), fiche publiée (id 3), liste du catalogue.
- Non exécuté : aucun test unitaire n'existe encore pour `revue.ts` et `sprayUtils.ts` ; à ajouter au lot 2 avec le nouveau modèle de données.

## Essais qui restent à réaliser

Tous : aucune méthode n'a été validée. Les statuts « À tester » et « En revue » restent affichés tant que le programme d'essais du dossier (`Principes_chimiques_et_validation.md`) n'a pas produit de résultats.

## Limites connues, à traiter au lot 2

- Les notes `efficacite` restent dans les données (archive) ; elles ne sont plus affichées ni utilisées.
- `sprays.ts` reste une copie séparée de certaines recettes ; unification prévue au lot 2.
- Le tri des listes est inchangé (pas encore alphabétique stable) ; prévu au lot 2.
