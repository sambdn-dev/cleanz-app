import { RecetteComplete } from '@/types';

export const RECETTES: RecetteComplete[] = [
  // === LES INDISPENSABLES (6 recettes de base) ===
  {
    id: 1,
    nom: 'Spray Multi-usage',
    emoji: '✨',
    categorie: 'Indispensable',
    badge: 'Kit de base',
    gradient: 'linear-gradient(135deg, #FF69B4 0%, #DDA0DD 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau tiède', quantite: '400ml', emoji: '💧' },
      { nom: 'Vinaigre blanc', quantite: '100ml', emoji: '🧴' },
      { nom: 'Savon noir liquide', quantite: '1 c.à.c', emoji: '⚫' },
      { nom: 'HE citron (optionnel)', quantite: '10 gouttes', emoji: '🍋' }
    ],
    materiel: ['Flacon spray 500ml', 'Entonnoir'],
    instructions: [
      'Versez l\'eau tiède dans le flacon spray',
      'Ajoutez le vinaigre blanc',
      'Incorporez le savon noir liquide',
      'Ajoutez les gouttes d\'huile essentielle si désiré',
      'Fermez et secouez vigoureusement avant chaque utilisation'
    ],
    surfaces: ['Plan de travail', 'Électroménager', 'Placards', 'Tables', 'Poignées'],
    precautions: ['Éviter marbre et pierre naturelle', 'Ne pas utiliser sur le bois brut', 'Rincer les surfaces alimentaires'],
    astuces: ['Laissez agir 2-3 min sur les taches tenaces', 'Idéal pour le nettoyage quotidien'],
    conservation: '3 mois à l\'abri de la lumière'
  },
  {
    id: 2,
    nom: 'Dégraissant Puissant',
    emoji: '💪',
    categorie: 'Indispensable',
    badge: 'Kit de base',
    gradient: 'linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau chaude', quantite: '300ml', emoji: '💧' },
      { nom: 'Cristaux de soude', quantite: '2 c.à.s', emoji: '💎' },
      { nom: 'Savon noir', quantite: '2 c.à.s', emoji: '⚫' },
      { nom: 'Vinaigre blanc', quantite: '100ml', emoji: '🧴' }
    ],
    materiel: ['Flacon spray 500ml', 'Récipient pour mélange', 'Gants'],
    instructions: [
      'Faites chauffer l\'eau (pas bouillante)',
      'Dissolvez les cristaux de soude dans l\'eau chaude',
      'Ajoutez le savon noir et mélangez bien',
      'Laissez tiédir puis ajoutez le vinaigre',
      'Transvasez dans le flacon spray une fois refroidi'
    ],
    surfaces: ['Hotte', 'Four', 'Friteuse', 'Plaques', 'Grilles BBQ', 'Poêles encrassées'],
    precautions: ['Porter des gants obligatoirement', 'Bien rincer après usage', 'Ne pas utiliser sur aluminium'],
    astuces: ['Chauffez légèrement le spray pour plus d\'efficacité', 'Laissez agir 15-30min sur les graisses cuites'],
    conservation: '2 mois'
  },
  {
    id: 3,
    nom: 'Anti-traces Vitres',
    emoji: '🪟',
    categorie: 'Indispensable',
    badge: 'Kit de base',
    gradient: 'linear-gradient(135deg, #B794F4 0%, #9F7AEA 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau déminéralisée', quantite: '250ml', emoji: '💧' },
      { nom: 'Vinaigre blanc', quantite: '250ml', emoji: '🧴' },
      { nom: 'Alcool ménager', quantite: '1 c.à.s', emoji: '🔬' }
    ],
    materiel: ['Flacon spray 500ml', 'Chiffon microfibre', 'Raclette (optionnel)'],
    instructions: [
      'Versez l\'eau déminéralisée dans le flacon',
      'Ajoutez le vinaigre blanc',
      'Incorporez l\'alcool ménager',
      'Secouez pour bien mélanger',
      'C\'est prêt !'
    ],
    surfaces: ['Vitres', 'Miroirs', 'Écrans (version diluée)', 'Inox', 'Parois de douche'],
    precautions: ['Nettoyer par temps nuageux de préférence', 'Éviter en plein soleil (traces)', 'Ne pas utiliser sur écrans tactiles'],
    astuces: ['Essuyez en S ou en zigzag', 'Finissez avec du papier journal froissé', 'Travaillez de haut en bas'],
    conservation: '6 mois'
  },
  {
    id: 4,
    nom: 'Détachant Textile',
    emoji: '👕',
    categorie: 'Indispensable',
    badge: 'Essentiel',
    gradient: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau tiède', quantite: '200ml', emoji: '💧' },
      { nom: 'Percarbonate de soude', quantite: '2 c.à.s', emoji: '✨' },
      { nom: 'Savon de Marseille râpé', quantite: '1 c.à.s', emoji: '🧼' }
    ],
    materiel: ['Récipient', 'Brosse à linge', 'Gants'],
    instructions: [
      'Faites chauffer l\'eau à minimum 40°C',
      'Dissolvez le percarbonate dans l\'eau chaude',
      'Ajoutez le savon de Marseille râpé',
      'Mélangez jusqu\'à dissolution complète',
      'Appliquez sur la tache et laissez agir'
    ],
    surfaces: ['Vêtements blancs', 'Linge de maison', 'Tapis', 'Rideaux', 'Nappes'],
    precautions: ['Testez sur zone cachée d\'abord', 'Pas sur soie ni laine', 'Éviter les tissus délicats colorés'],
    astuces: ['Laissez agir 30min à 2h selon la tache', 'Pour les taches tenaces, répétez le traitement'],
    conservation: 'Préparer à chaque usage'
  },
  {
    id: 5,
    nom: 'Répulsif Poussière',
    emoji: '🛋️',
    categorie: 'Indispensable',
    badge: 'Malin',
    gradient: 'linear-gradient(135deg, #98D8C8 0%, #7FC9B9 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau', quantite: '400ml', emoji: '💧' },
      { nom: 'Glycérine végétale', quantite: '2 c.à.s', emoji: '🌿' },
      { nom: 'Huile d\'olive', quantite: '1 c.à.c', emoji: '🫒' },
      { nom: 'HE lavande', quantite: '10 gouttes', emoji: '💜' }
    ],
    materiel: ['Flacon spray 500ml', 'Chiffon microfibre'],
    instructions: [
      'Versez l\'eau dans le flacon',
      'Ajoutez la glycérine végétale',
      'Incorporez l\'huile d\'olive',
      'Ajoutez les gouttes d\'huile essentielle',
      'Secouez vigoureusement avant chaque usage'
    ],
    surfaces: ['Meubles en bois', 'Écrans TV', 'Bibliothèques', 'Bibelots', 'Cadres'],
    precautions: ['Bien secouer avant usage', 'Appliquer sur chiffon, jamais directement', 'Éviter les surfaces laquées brillantes'],
    astuces: ['La glycérine crée un film antistatique', 'Parfait pour espacer les dépoussiérages'],
    conservation: '2 mois'
  },
  {
    id: 6,
    nom: 'Désinfectant Naturel',
    emoji: '🦠',
    categorie: 'Indispensable',
    badge: 'Santé',
    gradient: 'linear-gradient(135deg, #B0E0E6 0%, #ADD8E6 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau', quantite: '300ml', emoji: '💧' },
      { nom: 'Vinaigre blanc', quantite: '200ml', emoji: '🧴' },
      { nom: 'HE tea tree', quantite: '20 gouttes', emoji: '🌿' },
      { nom: 'HE eucalyptus', quantite: '10 gouttes', emoji: '🍃' }
    ],
    materiel: ['Flacon spray 500ml'],
    instructions: [
      'Versez l\'eau dans le flacon spray',
      'Ajoutez le vinaigre blanc',
      'Incorporez l\'huile essentielle de tea tree',
      'Ajoutez l\'huile essentielle d\'eucalyptus',
      'Secouez bien avant chaque utilisation'
    ],
    surfaces: ['Poignées', 'Interrupteurs', 'WC', 'Téléphones', 'Claviers', 'Télécommandes'],
    precautions: ['Éviter chez femmes enceintes et enfants -3ans (HE)', 'Aérer après usage', 'Ne pas ingérer'],
    astuces: ['Le tea tree est un antibactérien naturel puissant', 'Idéal en période de maladie'],
    conservation: '3 mois'
  },

  // === NOUVELLES RECETTES (15 recettes supplémentaires) ===
  {
    id: 7,
    nom: 'Mousse Active WC',
    emoji: '🚽',
    categorie: 'Salle de bain',
    badge: 'Populaire',
    gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Acide citrique', quantite: '100g', emoji: '🍋' },
      { nom: 'Bicarbonate de soude', quantite: '200g', emoji: '⚪' },
      { nom: 'Savon noir liquide', quantite: '2 c.à.s', emoji: '⚫' },
      { nom: 'HE tea tree', quantite: '15 gouttes', emoji: '🌿' }
    ],
    materiel: ['Moules en silicone', 'Saladier', 'Flacon spray avec eau'],
    instructions: [
      'Mélangez le bicarbonate et l\'acide citrique dans un saladier sec',
      'Ajoutez le savon noir progressivement en mélangeant',
      'Incorporez l\'huile essentielle',
      'Tassez dans des moules en silicone',
      'Laissez sécher 24h avant démoulage',
      'Pour utiliser : déposez une pastille dans la cuvette, vaporisez un peu d\'eau et laissez mousser'
    ],
    surfaces: ['Cuvette WC', 'Urinoir'],
    precautions: ['Conserver au sec', 'Ne pas mélanger avec de la javel', 'Éviter contact avec les yeux'],
    astuces: ['La réaction effervescente décolle le calcaire', 'Frottez avec la brosse pour plus d\'efficacité', 'Utilisez 1 à 2 fois par semaine'],
    conservation: '6 mois dans une boîte hermétique'
  },
  {
    id: 8,
    nom: 'Spray Anti-Calcaire',
    emoji: '💎',
    categorie: 'Salle de bain',
    badge: 'Efficace',
    gradient: 'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau', quantite: '200ml', emoji: '💧' },
      { nom: 'Acide citrique', quantite: '4 c.à.s', emoji: '🍋' },
      { nom: 'Liquide vaisselle écologique', quantite: '1 c.à.c', emoji: '🫧' }
    ],
    materiel: ['Flacon spray 250ml', 'Entonnoir'],
    instructions: [
      'Faites tiédir l\'eau (pas bouillante)',
      'Dissolvez l\'acide citrique dans l\'eau tiède',
      'Ajoutez le liquide vaisselle',
      'Transvasez dans le flacon spray',
      'Secouez avant utilisation'
    ],
    surfaces: ['Robinetterie', 'Parois de douche', 'Carrelage salle de bain', 'Pomme de douche', 'Baignoire'],
    precautions: ['Ne pas utiliser sur marbre', 'Éviter les surfaces en pierre naturelle', 'Rincer après 10min de pose'],
    astuces: ['Laissez agir 10-15min sur le calcaire incrusté', 'Enroulez du film alimentaire autour des robinets pour maintenir le produit'],
    conservation: '2 mois'
  },
  {
    id: 9,
    nom: 'Nettoyant Sol Carrelage',
    emoji: '🧹',
    categorie: 'Sol',
    badge: 'Économique',
    gradient: 'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau chaude', quantite: '5L (seau)', emoji: '💧' },
      { nom: 'Savon noir liquide', quantite: '2 c.à.s', emoji: '⚫' },
      { nom: 'Vinaigre blanc', quantite: '50ml', emoji: '🧴' },
      { nom: 'HE citron', quantite: '10 gouttes', emoji: '🍋' }
    ],
    materiel: ['Seau', 'Serpillière ou balai microfibre'],
    instructions: [
      'Remplissez un seau d\'eau chaude',
      'Ajoutez le savon noir et mélangez',
      'Incorporez le vinaigre blanc',
      'Ajoutez l\'huile essentielle',
      'Trempez la serpillière, essorez et passez sur le sol'
    ],
    surfaces: ['Carrelage', 'Lino', 'Vinyle', 'Tomettes', 'Pierre reconstituée'],
    precautions: ['Ne pas utiliser sur parquet ciré', 'Éviter sur marbre', 'Tester sur une zone cachée d\'abord'],
    astuces: ['Pas besoin de rincer', 'Laisse un film protecteur sur le sol', 'Le savon noir nourrit les tomettes'],
    conservation: 'Préparer à chaque usage'
  },
  {
    id: 10,
    nom: 'Poudre Lave-Vaisselle',
    emoji: '🍽️',
    categorie: 'Cuisine',
    badge: 'Zéro déchet',
    gradient: 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)',
    temps: '15min',
    difficulte: 'Moyen',
    efficacite: 4,
    ingredients: [
      { nom: 'Cristaux de soude', quantite: '200g', emoji: '💎' },
      { nom: 'Acide citrique', quantite: '200g', emoji: '🍋' },
      { nom: 'Gros sel', quantite: '100g', emoji: '🧂' },
      { nom: 'Percarbonate de soude', quantite: '100g', emoji: '✨' }
    ],
    materiel: ['Bocal hermétique 750ml', 'Saladier', 'Cuillère en bois'],
    instructions: [
      'Versez tous les ingrédients dans un saladier sec',
      'Mélangez soigneusement avec une cuillère en bois',
      'Transvasez dans un bocal hermétique',
      'Utilisez 1 c.à.s par lavage dans le compartiment poudre',
      'Ajoutez du vinaigre blanc dans le compartiment rinçage'
    ],
    surfaces: ['Lave-vaisselle'],
    precautions: ['Stocker au sec impérativement', 'Ne pas utiliser pour la vaisselle à la main', 'Peut ne pas convenir aux eaux très calcaires'],
    astuces: ['Ajustez la quantité selon la dureté de votre eau', 'Le vinaigre en rinçage évite les traces'],
    conservation: '6 mois au sec'
  },
  {
    id: 11,
    nom: 'Lessive Maison',
    emoji: '🧺',
    categorie: 'Linge',
    badge: 'Classique',
    gradient: 'linear-gradient(135deg, #FA709A 0%, #FEE140 100%)',
    temps: '30min',
    difficulte: 'Moyen',
    efficacite: 5,
    ingredients: [
      { nom: 'Savon de Marseille', quantite: '50g', emoji: '🧼' },
      { nom: 'Bicarbonate de soude', quantite: '1 c.à.s', emoji: '⚪' },
      { nom: 'Cristaux de soude', quantite: '1 c.à.s', emoji: '💎' },
      { nom: 'Eau', quantite: '1L', emoji: '💧' }
    ],
    materiel: ['Casserole', 'Râpe', 'Bidon 1L', 'Fouet'],
    instructions: [
      'Râpez finement le savon de Marseille',
      'Faites chauffer l\'eau sans la faire bouillir',
      'Ajoutez les copeaux de savon et remuez jusqu\'à dissolution',
      'Hors du feu, incorporez le bicarbonate et les cristaux',
      'Laissez refroidir en remuant de temps en temps',
      'Transvasez dans le bidon (secouez avant chaque usage)'
    ],
    surfaces: ['Lave-linge', 'Lavage main'],
    precautions: ['La lessive peut épaissir : secouez bien', 'Ne pas utiliser sur soie et laine', 'Attention aux tissus très colorés'],
    astuces: ['Utilisez 1/2 verre par machine', 'Ajoutez du percarbonate pour le linge blanc', 'Quelques gouttes d\'HE pour le parfum'],
    conservation: '1 mois'
  },
  {
    id: 12,
    nom: 'Nettoyant Inox Brillant',
    emoji: '✨',
    categorie: 'Cuisine',
    badge: 'Sans traces',
    gradient: 'linear-gradient(135deg, #C9D6FF 0%, #E2E2E2 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Vinaigre blanc', quantite: '100ml', emoji: '🧴' },
      { nom: 'Huile d\'olive', quantite: '50ml', emoji: '🫒' },
      { nom: 'Jus de citron', quantite: '2 c.à.s', emoji: '🍋' }
    ],
    materiel: ['Petit récipient', 'Chiffon microfibre', 'Chiffon doux pour lustrer'],
    instructions: [
      'Mélangez le vinaigre et le jus de citron',
      'Ajoutez l\'huile d\'olive et émulsionnez',
      'Appliquez sur un chiffon microfibre',
      'Frottez l\'inox dans le sens du brossage',
      'Lustrez avec un chiffon doux et sec'
    ],
    surfaces: ['Réfrigérateur inox', 'Four inox', 'Hotte', 'Évier inox', 'Crédence'],
    precautions: ['Toujours frotter dans le sens du grain', 'Éviter sur inox brossé mat', 'Ne pas utiliser sur aluminium'],
    astuces: ['L\'huile d\'olive fait briller et protège', 'Le citron dégraisse naturellement'],
    conservation: 'Préparer à chaque usage'
  },
  {
    id: 13,
    nom: 'Déboucheur Naturel',
    emoji: '🔧',
    categorie: 'Entretien',
    badge: 'Urgence',
    gradient: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)',
    temps: '20min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '100g', emoji: '⚪' },
      { nom: 'Vinaigre blanc', quantite: '200ml', emoji: '🧴' },
      { nom: 'Eau bouillante', quantite: '1L', emoji: '💧' },
      { nom: 'Gros sel', quantite: '50g', emoji: '🧂' }
    ],
    materiel: ['Bouilloire', 'Ventouse (optionnel)'],
    instructions: [
      'Versez le bicarbonate dans la canalisation',
      'Ajoutez le gros sel',
      'Versez doucement le vinaigre (ça mousse !)',
      'Laissez agir 15-20 minutes',
      'Versez l\'eau bouillante pour rincer',
      'Répétez si nécessaire'
    ],
    surfaces: ['Évier', 'Lavabo', 'Douche', 'Baignoire'],
    precautions: ['Ne jamais mélanger avec des produits chimiques', 'Attention aux projections de vinaigre', 'Ne pas utiliser sur canalisations fragiles'],
    astuces: ['En prévention, faites-le une fois par mois', 'La réaction effervescente décolle les dépôts'],
    conservation: 'Préparer à chaque usage'
  },
  {
    id: 14,
    nom: 'Anti-Moisissures',
    emoji: '🧫',
    categorie: 'Salle de bain',
    badge: 'Puissant',
    gradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Vinaigre blanc', quantite: '200ml', emoji: '🧴' },
      { nom: 'HE tea tree', quantite: '30 gouttes', emoji: '🌿' },
      { nom: 'Bicarbonate', quantite: '2 c.à.s', emoji: '⚪' }
    ],
    materiel: ['Flacon spray 250ml', 'Vieille brosse à dents', 'Masque (recommandé)'],
    instructions: [
      'Versez le vinaigre dans le flacon spray',
      'Ajoutez l\'huile essentielle de tea tree',
      'Secouez bien',
      'Vaporisez généreusement sur les moisissures',
      'Saupoudrez de bicarbonate et frottez',
      'Laissez agir 1h puis rincez'
    ],
    surfaces: ['Joints de carrelage', 'Joints de douche', 'Rideaux de douche', 'Murs humides'],
    precautions: ['Portez un masque pour les grandes surfaces', 'Aérez bien la pièce', 'Éviter contact avec les yeux'],
    astuces: ['Le tea tree est antifongique', 'Renouvelez chaque semaine jusqu\'à disparition', 'Traitez la cause de l\'humidité'],
    conservation: '3 mois'
  },
  {
    id: 15,
    nom: 'Pâte Nettoyante Four',
    emoji: '🔥',
    categorie: 'Cuisine',
    badge: 'Miracle',
    gradient: 'linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%)',
    temps: '15min + pose',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '6 c.à.s', emoji: '⚪' },
      { nom: 'Savon noir liquide', quantite: '2 c.à.s', emoji: '⚫' },
      { nom: 'Eau', quantite: '3 c.à.s', emoji: '💧' }
    ],
    materiel: ['Bol', 'Spatule ou pinceau', 'Éponge', 'Gants'],
    instructions: [
      'Mélangez le bicarbonate et le savon noir dans un bol',
      'Ajoutez l\'eau progressivement pour obtenir une pâte',
      'Appliquez généreusement sur les parois du four froid',
      'Insistez sur les zones encrassées',
      'Laissez agir minimum 2h (idéalement toute une nuit)',
      'Frottez avec une éponge humide et rincez'
    ],
    surfaces: ['Four', 'Grilles de four', 'Plaques de cuisson', 'Lèchefrite'],
    precautions: ['Portez des gants', 'Ne pas appliquer sur les résistances', 'Four éteint et froid obligatoirement'],
    astuces: ['Plus la pâte reste longtemps, plus c\'est efficace', 'Pour les grilles : faites-les tremper dans une baignoire avec la même recette'],
    conservation: 'Préparer à chaque usage'
  },
  {
    id: 16,
    nom: 'Liquide Vaisselle Maison',
    emoji: '🫧',
    categorie: 'Cuisine',
    badge: 'Quotidien',
    gradient: 'linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Savon noir liquide', quantite: '200ml', emoji: '⚫' },
      { nom: 'Bicarbonate de soude', quantite: '1 c.à.s', emoji: '⚪' },
      { nom: 'Eau chaude', quantite: '300ml', emoji: '💧' },
      { nom: 'HE citron', quantite: '20 gouttes', emoji: '🍋' }
    ],
    materiel: ['Flacon pompe 500ml', 'Bol pour mélanger'],
    instructions: [
      'Faites chauffer l\'eau sans la faire bouillir',
      'Dissolvez le bicarbonate dans l\'eau chaude',
      'Ajoutez le savon noir et mélangez doucement',
      'Laissez tiédir puis ajoutez l\'huile essentielle',
      'Transvasez dans le flacon pompe'
    ],
    surfaces: ['Vaisselle', 'Poêles', 'Casseroles', 'Ustensiles'],
    precautions: ['Moins moussant que l\'industriel mais aussi efficace', 'Bien rincer la vaisselle', 'Secouer avant usage'],
    astuces: ['Le savon noir est un excellent dégraissant', 'Ajoutez une goutte de vinaigre pour le brillant'],
    conservation: '1 mois'
  },
  {
    id: 17,
    nom: 'Spray Anti-Poussière Meubles',
    emoji: '🪑',
    categorie: 'Multi-usage',
    badge: 'Protecteur',
    gradient: 'linear-gradient(135deg, #D299C2 0%, #FEF9D7 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Huile d\'olive', quantite: '1 c.à.s', emoji: '🫒' },
      { nom: 'Vinaigre blanc', quantite: '2 c.à.s', emoji: '🧴' },
      { nom: 'Eau', quantite: '250ml', emoji: '💧' },
      { nom: 'HE citron', quantite: '10 gouttes', emoji: '🍋' }
    ],
    materiel: ['Flacon spray 300ml', 'Chiffon microfibre'],
    instructions: [
      'Versez l\'eau dans le flacon spray',
      'Ajoutez le vinaigre blanc',
      'Incorporez l\'huile d\'olive',
      'Ajoutez l\'huile essentielle',
      'Secouez vigoureusement avant chaque usage',
      'Vaporisez sur le chiffon, pas sur le meuble'
    ],
    surfaces: ['Meubles en bois', 'Meubles laqués', 'Étagères', 'Tables basses'],
    precautions: ['Toujours secouer avant usage', 'Ne pas appliquer en excès', 'Éviter sur bois brut non traité'],
    astuces: ['L\'huile d\'olive nourrit le bois', 'L\'effet antistatique repousse la poussière plus longtemps'],
    conservation: '2 mois'
  },
  {
    id: 18,
    nom: 'Assouplissant Naturel',
    emoji: '🌸',
    categorie: 'Linge',
    badge: 'Doux',
    gradient: 'linear-gradient(135deg, #FFECD2 0%, #FCB69F 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Vinaigre blanc', quantite: '500ml', emoji: '🧴' },
      { nom: 'HE lavande', quantite: '30 gouttes', emoji: '💜' },
      { nom: 'HE ylang-ylang', quantite: '10 gouttes', emoji: '🌺' }
    ],
    materiel: ['Bouteille 500ml'],
    instructions: [
      'Versez le vinaigre blanc dans la bouteille',
      'Ajoutez les huiles essentielles',
      'Secouez pour bien mélanger',
      'C\'est prêt !',
      'Utilisez 2-3 c.à.s dans le bac assouplissant'
    ],
    surfaces: ['Lave-linge'],
    precautions: ['L\'odeur de vinaigre disparaît au séchage', 'Ne pas utiliser sur soie et laine délicate', 'HE à éviter pour le linge de bébé'],
    astuces: ['Adoucit le linge naturellement', 'Élimine les résidus de lessive', 'Préserve les couleurs'],
    conservation: '6 mois'
  },
  {
    id: 19,
    nom: 'Détachant Tapis & Tissus',
    emoji: '🛋️',
    categorie: 'Linge',
    badge: 'SOS taches',
    gradient: 'linear-gradient(135deg, #ED4264 0%, #FFEDBC 100%)',
    temps: '10min + pose',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Savon de Marseille', quantite: '2 c.à.s râpées', emoji: '🧼' },
      { nom: 'Percarbonate de soude', quantite: '1 c.à.s', emoji: '✨' },
      { nom: 'Eau chaude', quantite: '100ml', emoji: '💧' }
    ],
    materiel: ['Bol', 'Brosse douce', 'Chiffon propre'],
    instructions: [
      'Dissolvez le savon de Marseille râpé dans l\'eau chaude',
      'Ajoutez le percarbonate et mélangez',
      'Appliquez sur la tache avec la brosse',
      'Frottez délicatement en cercles',
      'Laissez agir 30 minutes',
      'Rincez avec un chiffon humide'
    ],
    surfaces: ['Tapis', 'Moquette', 'Canapé tissu', 'Matelas', 'Sièges voiture'],
    precautions: ['Testez toujours sur une zone cachée', 'Ne pas utiliser sur tissus délicats', 'Bien rincer pour éviter les auréoles'],
    astuces: ['Agir vite sur les taches fraîches', 'Pour les taches anciennes, répétez le traitement'],
    conservation: 'Préparer à chaque usage'
  },
  {
    id: 20,
    nom: 'Nettoyant Joints Carrelage',
    emoji: '🔲',
    categorie: 'Salle de bain',
    badge: 'Blanchisseur',
    gradient: 'linear-gradient(135deg, #E8E8E8 0%, #F5F5F5 50%, #A0A0A0 100%)',
    temps: '15min + pose',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '4 c.à.s', emoji: '⚪' },
      { nom: 'Eau oxygénée 10 vol', quantite: '2 c.à.s', emoji: '💧' },
      { nom: 'Liquide vaisselle', quantite: '1 c.à.c', emoji: '🫧' }
    ],
    materiel: ['Petit bol', 'Vieille brosse à dents', 'Chiffon'],
    instructions: [
      'Mélangez le bicarbonate et l\'eau oxygénée',
      'Ajoutez le liquide vaisselle',
      'Vous obtenez une pâte légère',
      'Appliquez sur les joints avec la brosse à dents',
      'Frottez en faisant des allers-retours',
      'Laissez agir 15 minutes puis rincez'
    ],
    surfaces: ['Joints de carrelage', 'Joints de salle de bain', 'Joints de cuisine'],
    precautions: ['Bien aérer la pièce', 'Porter des gants recommandé', 'Ne pas utiliser sur joints colorés'],
    astuces: ['L\'eau oxygénée blanchit naturellement', 'Pour joints très sales, laissez poser 1h'],
    conservation: 'Préparer à chaque usage'
  },
  {
    id: 21,
    nom: 'Crème à Récurer',
    emoji: '🫗',
    categorie: 'Multi-usage',
    badge: 'Abrasif doux',
    gradient: 'linear-gradient(135deg, #89F7FE 0%, #66A6FF 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '100g', emoji: '⚪' },
      { nom: 'Savon noir liquide', quantite: '3 c.à.s', emoji: '⚫' },
      { nom: 'HE citron', quantite: '15 gouttes', emoji: '🍋' }
    ],
    materiel: ['Pot hermétique', 'Cuillère', 'Éponge'],
    instructions: [
      'Versez le bicarbonate dans le pot',
      'Ajoutez le savon noir progressivement',
      'Mélangez jusqu\'à obtenir une pâte crémeuse',
      'Incorporez l\'huile essentielle',
      'Prélevez avec une éponge humide et frottez'
    ],
    surfaces: ['Évier', 'Baignoire', 'Plaques de cuisson', 'Casseroles brûlées', 'Plan de travail'],
    precautions: ['Ne pas utiliser sur surfaces fragiles', 'Éviter sur inox brossé', 'Rincer abondamment'],
    astuces: ['Le bicarbonate est un abrasif doux qui ne raye pas', 'Idéal pour faire briller l\'évier'],
    conservation: '3 mois en pot fermé'
  }
];

// Catégories pour filtrage
export const CATEGORIES_RECETTES = [
  { id: 'all', nom: 'Toutes', emoji: '📋' },
  { id: 'Indispensable', nom: 'Indispensables', emoji: '⭐' },
  { id: 'Salle de bain', nom: 'Salle de bain', emoji: '🚿' },
  { id: 'Cuisine', nom: 'Cuisine', emoji: '🍳' },
  { id: 'Linge', nom: 'Linge', emoji: '🧺' },
  { id: 'Multi-usage', nom: 'Multi-usage', emoji: '✨' },
  { id: 'Sol', nom: 'Sols', emoji: '🧹' },
  { id: 'Entretien', nom: 'Entretien', emoji: '🔧' }
];

// Mapping des recettes par surface pour le modal surface
export const RECETTES_PAR_SURFACE: Record<number, number[]> = {
  1: [2, 15],      // Four -> Dégraissant Puissant, Pâte Nettoyante Four
  2: [9],          // Carrelage cuisine -> Nettoyant Sol Carrelage
  3: [1],          // Plan de travail -> Spray Multi-usage
  4: [8],          // Robinetterie -> Spray Anti-Calcaire
  5: [2],          // Hotte -> Dégraissant Puissant
  6: [2],          // Plaques -> Dégraissant Puissant
  7: [10],         // Lave-vaisselle -> Poudre Lave-Vaisselle
  8: [12],         // Frigo -> Nettoyant Inox
  17: [7, 6],      // WC -> Mousse Active WC, Désinfectant Naturel
  18: [8],         // Lavabo sdb -> Spray Anti-Calcaire
  19: [8, 14],     // Douche -> Spray Anti-Calcaire, Anti-Moisissures
  20: [8],         // Baignoire -> Spray Anti-Calcaire
  21: [20],        // Carrelage sdb -> Nettoyant Joints
  22: [3, 8],      // Miroir -> Anti-traces Vitres, Spray Anti-Calcaire
  30: [11],        // Lave-linge -> Lessive Maison
  58: [3],         // Vitres -> Anti-traces Vitres
  59: [1],         // Meubles -> Spray Multi-usage
  60: [3],         // Écrans -> Anti-traces Vitres (dilué)
  62: [4, 19],     // Baskets -> Détachant Textile, Détachant Tapis
};
