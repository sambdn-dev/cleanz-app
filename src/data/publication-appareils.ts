/**
 * Doublons d'usage identifiés dans les fiches appareils pendant le lot publication.
 * Ces liens gouvernent aussi les conseils/calendriers dupliquant la méthode.
 * Ils ne certifient pas la formulation ni une compatibilité avec tous les modèles.
 * Aucun rapprochement n'est déduit du seul nom pour les autres appareils.
 */
export const APPAREIL_RECETTE_IDS: Readonly<Record<number, number>> = {
  1: 132, // Lave-linge : nettoyage du tambour au vinaigre/bicarbonate, cycle à chaud.
  3: 131, // Chaudière : entretien, pression et purge génériques retirés du catalogue.
};
