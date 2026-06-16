import { Spray } from '@/types';

export const SPRAYS_INDISPENSABLES: Spray[] = [
  {
    id: 1,
    nom: 'Spray Multi-usage',
    emoji: '✨',
    badge: 'Kit de base',
    gradient: 'linear-gradient(135deg, #FF69B4 0%, #DDA0DD 100%)',
    imageUrl: '/images/sprays/multi-usage.jpg',
    ingredients: [
      { nom: 'Eau tiède', quantite: '400ml' },
      { nom: 'Vinaigre blanc', quantite: '100ml' },
      { nom: 'Savon noir liquide', quantite: '1 c.à.c' },
      { nom: 'HE citron (optionnel)', quantite: '10 gouttes' }
    ],
    instructions: 'Mélangez tous les ingrédients dans un flacon spray de 500ml. Secouez avant chaque utilisation.',
    surfaces: ['Plan de travail', 'Électroménager', 'Placards', 'Tables'],
    precautions: ['Éviter marbre et pierre naturelle', 'Ne pas utiliser sur le bois brut'],
    astuces: ['Laissez agir 2-3 min sur les taches'],
    conservation: '3 mois à l\'abri de la lumière'
  },
  {
    id: 2,
    nom: 'Dégraissant Puissant',
    emoji: '💪',
    badge: 'Kit de base',
    gradient: 'linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%)',
    imageUrl: '/images/sprays/degraissant.jpg',
    ingredients: [
      { nom: 'Eau chaude', quantite: '300ml' },
      { nom: 'Cristaux de soude', quantite: '2 c.à.s' },
      { nom: 'Savon noir', quantite: '2 c.à.s' },
      { nom: 'Vinaigre blanc', quantite: '100ml' }
    ],
    instructions: 'Dissolvez les cristaux dans l\'eau chaude. Ajoutez savon noir puis vinaigre. Transvasez une fois refroidi.',
    surfaces: ['Hotte', 'Four', 'Friteuse', 'Plaques', 'Grilles BBQ'],
    precautions: ['Porter des gants', 'Bien rincer après usage'],
    astuces: ['Chauffez légèrement le spray pour plus d\'efficacité'],
    conservation: '2 mois'
  },
  {
    id: 3,
    nom: 'Anti-traces Vitres',
    emoji: '🪟',
    badge: 'Kit de base',
    gradient: 'linear-gradient(135deg, #B794F4 0%, #9F7AEA 100%)',
    imageUrl: '/images/sprays/vitres.jpg',
    ingredients: [
      { nom: 'Eau déminéralisée', quantite: '250ml' },
      { nom: 'Vinaigre blanc', quantite: '250ml' },
      { nom: 'Alcool ménager', quantite: '1 c.à.s' }
    ],
    instructions: 'Mélangez simplement les 3 ingrédients dans un spray. C\'est prêt !',
    surfaces: ['Vitres', 'Miroirs', 'Écrans (dilué)', 'Inox'],
    precautions: ['Nettoyer par temps nuageux', 'Éviter en plein soleil'],
    astuces: ['Essuyez en S ou en zigzag', 'Finissez avec du papier journal'],
    conservation: '6 mois'
  },
  {
    id: 4,
    nom: 'Détachant Textile',
    emoji: '👕',
    badge: 'Essentiel',
    gradient: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%)',
    ingredients: [
      { nom: 'Eau tiède', quantite: '200ml' },
      { nom: 'Percarbonate de soude', quantite: '2 c.à.s' },
      { nom: 'Savon de Marseille râpé', quantite: '1 c.à.s' }
    ],
    instructions: 'Dissolvez le percarbonate dans l\'eau chaude (min 40°C). Ajoutez le savon râpé. Mélangez bien.',
    surfaces: ['Vêtements blancs', 'Linge de maison', 'Tapis', 'Rideaux'],
    precautions: ['Testez sur zone cachée', 'Pas sur soie ni laine'],
    astuces: ['Laissez agir 30min à 2h selon la tache'],
    conservation: 'Préparer à chaque usage'
  },
  {
    id: 5,
    nom: 'Répulsif Poussière',
    emoji: '🛋️',
    badge: 'Malin',
    gradient: 'linear-gradient(135deg, #98D8C8 0%, #7FC9B9 100%)',
    ingredients: [
      { nom: 'Eau', quantite: '400ml' },
      { nom: 'Glycérine végétale', quantite: '2 c.à.s' },
      { nom: 'Huile d\'olive', quantite: '1 c.à.c' },
      { nom: 'HE lavande', quantite: '10 gouttes' }
    ],
    instructions: 'Mélangez eau et glycérine. Ajoutez l\'huile et les HE. Secouez vigoureusement avant usage.',
    surfaces: ['Meubles en bois', 'Écrans TV', 'Bibliothèques'],
    precautions: ['Bien secouer avant usage', 'Appliquer sur chiffon, pas directement'],
    astuces: ['La glycérine crée un film antistatique'],
    conservation: '2 mois'
  },
  {
    id: 6,
    nom: 'Désinfectant Naturel',
    emoji: '🦠',
    badge: 'Santé',
    gradient: 'linear-gradient(135deg, #B0E0E6 0%, #ADD8E6 100%)',
    ingredients: [
      { nom: 'Eau', quantite: '300ml' },
      { nom: 'Vinaigre blanc', quantite: '200ml' },
      { nom: 'HE tea tree', quantite: '20 gouttes' },
      { nom: 'HE eucalyptus', quantite: '10 gouttes' }
    ],
    instructions: 'Mélangez l\'eau et le vinaigre. Ajoutez les huiles essentielles. Secouez bien.',
    surfaces: ['Poignées', 'Interrupteurs', 'WC', 'Téléphones'],
    precautions: ['Éviter femmes enceintes/enfants -3ans (HE)', 'Aérer après usage'],
    astuces: ['Le tea tree est antibactérien naturel'],
    conservation: '3 mois'
  },
];
