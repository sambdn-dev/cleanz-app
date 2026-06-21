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
    imageUrl: '/images/sprays/multi-usage.jpg',
    // Prompt version sombre (ChatGPT/DALL·E) : « Moody product photography, dark plum background fading to black on the left. On the right: a glass cork bottle of water, a small jar of dark soap, an amber spray bottle with golden liquid, dried lavender in a pot, a halved lemon. Warm candlelight from the right, soft rim lighting on glass edges. Cozy evening atmosphere. Horizontal 3:2 ratio, photorealistic, 50mm lens, shallow depth of field. »
    imageUrlDark: '/images/sprays/multi-usage-dark.jpg',
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
    imageUrl: '/images/sprays/degraissant.jpg',
    // Prompt version sombre (ChatGPT/DALL·E) : « Moody product photography, dark teal-blue background fading to black on the left. On the right: a glass cork bottle, a jar of white powder, a small jar of dark soap, a frosted white spray bottle, a linen cloth, eucalyptus sprig. Warm golden side light, soft shadows. Cozy evening atmosphere. Horizontal 3:2 ratio, photorealistic, 50mm lens. »
    imageUrlDark: '/images/sprays/degraissant-dark.jpg',
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
    imageUrl: '/images/sprays/vitres.jpg',
    // Prompt version sombre (ChatGPT/DALL·E) : « Moody product photography, deep purple background with faint window blind shadows. On the right on a dark reflective surface: a glass cork bottle, a clear spray bottle, folded purple microfiber cloths. Warm rim light on glass. Intimate evening mood. Horizontal 3:2 ratio, photorealistic, 50mm lens. »
    imageUrlDark: '/images/sprays/vitres-dark.jpg',
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
    imageUrl: '/images/sprays/textile.jpg',
    // Prompt version sombre (ChatGPT/DALL·E) : « Moody product photography, midnight plum background fading to black on the left. On the right: a glass spray bottle with milky liquid, a cube of natural soap, a glass bowl of white powder, folded white towels. Warm golden light, soft baby breath shadows. Cozy atmosphere. Horizontal 3:2 ratio, photorealistic. »
    imageUrlDark: '/images/sprays/textile-dark.jpg',
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
    imageUrl: '/images/sprays/poussiere.jpg',
    // Prompt version sombre (ChatGPT/DALL·E) : « Moody product photography, dark sage green background fading to charcoal on the left. On the right: glass cork bottles, an amber spray bottle with golden oil, small dropper bottles, lavender sprigs, olive branch, woven cloth. Warm honey-gold light through the oils. Cozy evening mood. Horizontal 3:2 ratio, photorealistic. »
    imageUrlDark: '/images/sprays/poussiere-dark.jpg',
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
    imageUrl: '/images/sprays/desinfectant.jpg',
    // Prompt version sombre (ChatGPT/DALL·E) : « Moody product photography, midnight teal-blue background fading to black on the left. On the right: a glass cork bottle, a clear spray bottle, a small amber essential oil bottle, tea tree sprig, eucalyptus branch. Cool-warm rim lighting. Clean yet cozy atmosphere. Horizontal 3:2 ratio, photorealistic. »
    imageUrlDark: '/images/sprays/desinfectant-dark.jpg',
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
    surfaces: ['Cuvette WC', 'Urinoir', 'Siphons', 'Canalisations'],
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
    surfaces: ['Lave-vaisselle', 'Vaisselle', 'Couverts', 'Verres'],
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
    surfaces: ['Lave-linge', 'Lavage main', 'Vêtements', 'Linge de maison', 'Draps'],
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
    surfaces: ['Lave-linge', 'Serviettes', 'Draps', 'Vêtements', 'Linge délicat'],
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
  },
  {
    id: 22,
    nom: 'Spray Désinfectant Express',
    emoji: '🧴',
    categorie: 'Multi-usage',
    badge: 'Rapide',
    gradient: 'linear-gradient(135deg, #4DD0E1 0%, #26C6DA 100%)',
    temps: '2min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Alcool ménager', quantite: '250ml', emoji: '🔬' },
      { nom: 'Eau', quantite: '250ml', emoji: '💧' },
      { nom: 'HE tea tree', quantite: '15 gouttes', emoji: '🌿' }
    ],
    materiel: ['Flacon spray 500ml'],
    instructions: [
      'Versez l\'alcool ménager dans le flacon spray',
      'Ajoutez l\'eau',
      'Incorporez l\'huile essentielle de tea tree',
      'Secouez bien avant chaque utilisation',
      'Vaporisez et laissez sécher (pas besoin de rincer)'
    ],
    surfaces: ['Poignées de porte', 'Interrupteurs', 'Téléphones', 'Claviers', 'Télécommandes', 'Plans de travail'],
    precautions: ['Très inflammable - éloigner des flammes', 'Bien aérer la pièce', 'Ne pas utiliser sur écrans'],
    astuces: ['Sèche très vite sans laisser de traces', 'Idéal en période de grippe/gastro', 'L\'alcool tue 99.9% des germes'],
    conservation: '6 mois'
  },
  {
    id: 23,
    nom: 'Nettoyant Écrans & Électronique',
    emoji: '📱',
    categorie: 'Multi-usage',
    badge: 'High-tech',
    gradient: 'linear-gradient(135deg, #90CAF9 0%, #42A5F5 100%)',
    temps: '2min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau déminéralisée', quantite: '100ml', emoji: '💧' },
      { nom: 'Alcool ménager', quantite: '100ml', emoji: '🔬' }
    ],
    materiel: ['Petit flacon spray 200ml', 'Chiffon microfibre doux'],
    instructions: [
      'Mélangez l\'eau déminéralisée et l\'alcool ménager',
      'Versez dans le flacon spray',
      'Vaporisez sur le chiffon microfibre (JAMAIS sur l\'écran)',
      'Essuyez délicatement l\'écran en mouvements circulaires',
      'Laissez sécher quelques secondes'
    ],
    surfaces: ['Écrans TV', 'Écrans ordinateur', 'Tablettes', 'Smartphones', 'Lunettes'],
    precautions: ['Ne JAMAIS vaporiser directement sur l\'écran', 'Éteindre l\'appareil avant nettoyage', 'Éviter l\'excès de produit'],
    astuces: ['L\'eau déminéralisée évite les traces de calcaire', 'Le mélange 50/50 est idéal pour les écrans', 'Utiliser un chiffon très doux pour ne pas rayer'],
    conservation: '1 an'
  },

  // === RECETTES VOITURE ===
  {
    id: 24,
    nom: 'Lave-Glace Été',
    emoji: '☀️',
    categorie: 'Voiture',
    badge: 'Anti-insectes',
    gradient: 'linear-gradient(135deg, #FFD93D 0%, #FF9A3C 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau déminéralisée', quantite: '3L', emoji: '💧' },
      { nom: 'Vinaigre blanc', quantite: '500ml', emoji: '🧴' },
      { nom: 'Liquide vaisselle écologique', quantite: '1 c.à.s', emoji: '🫧' },
      { nom: 'Alcool ménager', quantite: '50ml', emoji: '🔬' }
    ],
    materiel: ['Bidon 5L propre', 'Entonnoir'],
    instructions: [
      'Versez l\'eau déminéralisée dans le bidon',
      'Ajoutez le vinaigre blanc',
      'Incorporez l\'alcool ménager (aide au séchage)',
      'Ajoutez le liquide vaisselle (très peu !)',
      'Fermez et secouez doucement pour mélanger',
      'Versez dans le réservoir de lave-glace'
    ],
    surfaces: ['Pare-brise', 'Vitres voiture', 'Rétroviseurs', 'Phares'],
    precautions: ['Ne pas utiliser en hiver (peut geler)', 'Très peu de liquide vaisselle pour éviter la mousse', 'Utiliser de l\'eau déminéralisée pour éviter le calcaire'],
    astuces: ['Le vinaigre dissout les insectes écrasés', 'L\'alcool aide le séchage rapide sans traces', 'Idéal de mai à septembre'],
    conservation: '6 mois'
  },
  {
    id: 25,
    nom: 'Lave-Glace Hiver',
    emoji: '❄️',
    categorie: 'Voiture',
    badge: 'Anti-gel -20°C',
    gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau déminéralisée', quantite: '2L', emoji: '💧' },
      { nom: 'Alcool ménager 90°', quantite: '1L', emoji: '🔬' },
      { nom: 'Liquide vaisselle écologique', quantite: '1 c.à.c', emoji: '🫧' }
    ],
    materiel: ['Bidon 5L propre', 'Entonnoir'],
    instructions: [
      'Versez l\'eau déminéralisée dans le bidon',
      'Ajoutez l\'alcool ménager (1/3 du volume = -20°C)',
      'Incorporez une goutte de liquide vaisselle',
      'Fermez et secouez doucement',
      'Versez dans le réservoir vide (ne pas mélanger avec l\'ancien)',
      'Testez les gicleurs avant de prendre la route'
    ],
    surfaces: ['Pare-brise', 'Vitres voiture', 'Rétroviseurs'],
    precautions: ['L\'alcool est inflammable - stocker à l\'abri de la chaleur', 'Plus il fait froid, plus il faut d\'alcool (jusqu\'à 50%)', 'Videz l\'ancien lave-glace été avant remplissage'],
    astuces: ['1/3 alcool = -20°C, 1/2 alcool = -30°C', 'L\'alcool ménager 90° est plus efficace que le 70°', 'Fonctionne aussi pour dégivrer le pare-brise'],
    conservation: '1 an'
  },
  {
    id: 26,
    nom: 'Lave-Glace 4 Saisons',
    emoji: '🚗',
    categorie: 'Voiture',
    badge: 'Toute l\'année',
    gradient: 'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau déminéralisée', quantite: '2.5L', emoji: '💧' },
      { nom: 'Alcool ménager 90°', quantite: '500ml', emoji: '🔬' },
      { nom: 'Vinaigre blanc', quantite: '200ml', emoji: '🧴' },
      { nom: 'Liquide vaisselle écologique', quantite: '1 c.à.c', emoji: '🫧' }
    ],
    materiel: ['Bidon 5L propre', 'Entonnoir'],
    instructions: [
      'Versez l\'eau déminéralisée dans le bidon',
      'Ajoutez l\'alcool ménager',
      'Incorporez le vinaigre blanc',
      'Ajoutez très peu de liquide vaisselle',
      'Fermez et secouez pour bien mélanger',
      'Versez dans le réservoir de lave-glace'
    ],
    surfaces: ['Pare-brise', 'Vitres voiture', 'Rétroviseurs', 'Phares'],
    precautions: ['Résiste jusqu\'à -10°C environ', 'Pour grand froid, augmentez la proportion d\'alcool', 'Stockez à l\'abri de la chaleur (alcool inflammable)'],
    astuces: ['Le vinaigre nettoie insectes et résidus', 'L\'alcool assure l\'anti-gel et le séchage rapide', 'Formule équilibrée pour usage toute l\'année'],
    conservation: '1 an'
  },
  {
    id: 27,
    nom: 'Spray Dégivrant Auto',
    emoji: '🧊',
    categorie: 'Voiture',
    badge: 'Hiver',
    gradient: 'linear-gradient(135deg, #74EBD5 0%, #9FACE6 100%)',
    temps: '2min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Vinaigre blanc', quantite: '200ml (2 parts)', emoji: '🧴' },
      { nom: 'Alcool ménager', quantite: '100ml (1 part)', emoji: '🔬' },
      { nom: 'Eau froide ou tiède', quantite: '100ml (1 part)', emoji: '💧' }
    ],
    materiel: ['Flacon spray 500ml', 'Entonnoir'],
    instructions: [
      'Versez le vinaigre blanc dans le flacon spray',
      'Ajoutez l\'alcool ménager',
      'Complétez avec l\'eau FROIDE ou légèrement tiède',
      'Fermez et secouez pour bien mélanger',
      'Vaporisez généreusement sur le pare-brise givré',
      'Attendez 30 secondes puis essuyez avec un chiffon ou la raclette'
    ],
    surfaces: ['Pare-brise givré', 'Vitres voiture', 'Rétroviseurs', 'Serrures gelées'],
    precautions: ['JAMAIS d\'eau chaude sur un pare-brise froid = risque de fissures !', 'Utiliser uniquement de l\'eau froide ou tiède', 'L\'alcool est inflammable - éloigner des flammes', 'Ne pas utiliser sur plastiques sensibles'],
    astuces: ['L\'alcool abaisse le point de congélation et fait fondre le givre', 'Le vinaigre empêche la reformation du givre', 'Vaporisez la veille au soir sur le pare-brise pour éviter le givre du matin'],
    conservation: '1 an'
  },
  {
    id: 28,
    nom: 'Spray Parois de Douche',
    emoji: '🚿',
    categorie: 'Salle de bain',
    badge: 'Ultra-puissant',
    gradient: 'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau chaude', quantite: '500ml', emoji: '💧' },
      { nom: 'Sel d\'oseille (acide oxalique)', quantite: '1 c.à.s', emoji: '🧪' },
      { nom: 'Liquide vaisselle', quantite: '1 c.à.s', emoji: '🫧' }
    ],
    materiel: ['Flacon spray 500ml', 'Éponge inoxydable', 'Raclette', 'Gants'],
    instructions: [
      'Versez l\'eau chaude dans le flacon spray',
      'Ajoutez le sel d\'oseille et secouez jusqu\'à dissolution',
      'Incorporez le liquide vaisselle',
      'Vaporisez généreusement sur les parois de douche',
      'Laissez agir 1 minute',
      'Frottez avec une éponge inoxydable',
      'Rincez abondamment à l\'eau froide',
      'Passez un coup de raclette pour un résultat impeccable'
    ],
    surfaces: ['Parois de douche', 'Carrelage salle de bain', 'Baignoire', 'Faïence'],
    precautions: ['Porter des gants obligatoirement', 'Ne pas utiliser sur marbre ou pierre naturelle', 'Bien ventiler la pièce', 'Rincer abondamment après usage', 'Éviter le contact avec les yeux'],
    astuces: ['Le sel d\'oseille est un acide beaucoup plus puissant que le vinaigre ou l\'acide citrique', 'Élimine calcaire et traces de savon en profondeur', 'L\'éponge inoxydable ne raye pas le verre'],
    conservation: '3 mois'
  },
  // === NOUVELLES RECETTES ===
  {
    id: 29,
    nom: 'Nettoyant Vitres & Miroirs',
    emoji: '🪟',
    categorie: 'Multi-usage',
    badge: 'Sans traces',
    gradient: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau déminéralisée', quantite: '250ml', emoji: '💧' },
      { nom: 'Vinaigre blanc', quantite: '250ml', emoji: '🧴' },
      { nom: 'Liquide vaisselle', quantite: '1 c.à.s', emoji: '🫧' },
      { nom: 'Alcool ménager (optionnel)', quantite: '1 c.à.s', emoji: '🔬' }
    ],
    materiel: ['Flacon pulvérisateur', 'Chiffon microfibre propre'],
    instructions: [
      'Mélangez tous les ingrédients dans un flacon pulvérisateur',
      'Agitez doucement pour éviter la formation excessive de mousse',
      'Pulvérisez sur les surfaces vitrées ou brillantes',
      'Essuyez immédiatement avec un chiffon en microfibre propre pour éviter les traces'
    ],
    surfaces: ['Vitres', 'Miroirs', 'Surfaces brillantes'],
    precautions: ['Préférer le liquide vaisselle écologique et sans colorant pour éviter les traces'],
    astuces: ['Utiliser le mouilleur et le nettoyeur de vitres Karcher pour un résultat rapide et sans traces', 'L\'alcool ménager accélère le séchage'],
    conservation: '6 mois'
  },
  {
    id: 30,
    nom: 'Nettoyant Sols Universel',
    emoji: '🧹',
    categorie: 'Sol',
    badge: 'Multi-surfaces',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau chaude', quantite: '3 litres', emoji: '💧' },
      { nom: 'Savon noir liquide', quantite: '2 c.à.s', emoji: '⚫' },
      { nom: 'Bicarbonate de soude', quantite: '1 c.à.s', emoji: '⚪' },
      { nom: 'Huiles essentielles (optionnel)', quantite: 'Quelques gouttes', emoji: '🌿' }
    ],
    materiel: ['Seau', 'Serpillière ou balai microfibre'],
    instructions: [
      'Versez l\'eau chaude dans un seau',
      'Ajoutez le savon noir et le bicarbonate',
      'Agitez doucement pour mélanger',
      'Pulvérisez ou appliquez au sol',
      'Laissez agir 10 minutes',
      'Rincez si nécessaire'
    ],
    surfaces: ['Carrelage', 'Lino', 'Sols stratifiés'],
    precautions: ['Pas adapté au bois brut'],
    astuces: ['Une fois tous les 15 jours, passer le Nettoyeur vapeur Karcher afin de désincruster en profondeur les sols', 'Les huiles essentielles apportent une odeur agréable et un pouvoir désinfectant'],
    conservation: 'À utiliser immédiatement'
  },
  {
    id: 31,
    nom: 'Poudre Effervescente WC',
    emoji: '🚽',
    categorie: 'Salle de bain',
    badge: 'Entretien hebdo',
    gradient: 'linear-gradient(135deg, #34D399 0%, #6EE7B7 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '100g', emoji: '⚪' },
      { nom: 'Acide citrique', quantite: '280g', emoji: '🍋' },
      { nom: 'Cristaux de soude', quantite: '100g', emoji: '💎' }
    ],
    materiel: ['Bocal en verre hermétique', 'Cuillère à soupe'],
    instructions: [
      'Mettre les ingrédients dans un bocal en verre',
      'Mélanger soigneusement',
      '2 cuillères à soupe dans les WC toutes les semaines en entretien',
      'Laisser poser toute une nuit',
      'Frotter avec la brosse',
      'Tirer la chasse'
    ],
    surfaces: ['Cuvette des toilettes'],
    precautions: ['Conserver au sec dans un bocal hermétique', 'Ne pas mélanger avec du vinaigre dans un contenant fermé'],
    astuces: ['Répéter l\'opération si le tartre ne part pas totalement', 'La réaction effervescente décolle le tartre'],
    conservation: '1 an au sec'
  },
  {
    id: 32,
    nom: 'Nettoyant WC Spray',
    emoji: '🚽',
    categorie: 'Salle de bain',
    badge: 'Détartrant',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Acide citrique', quantite: '3 c.à.s', emoji: '🍋' },
      { nom: 'Eau chaude', quantite: '500ml', emoji: '💧' },
      { nom: 'Savon noir (optionnel)', quantite: '1 c.à.s', emoji: '⚫' }
    ],
    materiel: ['Flacon spray', 'Brosse WC'],
    instructions: [
      'Ajouter l\'acide citrique dans l\'eau chaude',
      'Mélanger dans un spray jusqu\'à dissolution',
      'Frotter les parois avec la brosse',
      'Tirer la chasse',
      'Verser le mélange',
      'Laisser agir 30 minutes',
      'Frotter avec la brosse et tirer de nouveau la chasse d\'eau'
    ],
    surfaces: ['WC', 'Évier', 'Lavabo', 'Baignoire', 'Carrelage'],
    precautions: ['Bien ventiler la pièce', 'Éviter le contact avec les yeux'],
    astuces: ['Si la cuvette est trop encrassée, laisser agir le mélange une heure, voire toute la nuit et brosser'],
    conservation: '3 mois'
  },
  {
    id: 33,
    nom: 'Déboucheur Canalisations',
    emoji: '🔧',
    categorie: 'Entretien',
    badge: 'Naturel',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
    temps: '35min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '1/2 tasse', emoji: '⚪' },
      { nom: 'Vinaigre blanc', quantite: '1/2 tasse', emoji: '🧴' }
    ],
    materiel: ['Rien de spécial'],
    instructions: [
      'Versez le bicarbonate de soude dans la canalisation',
      'Versez ensuite le vinaigre blanc',
      'Les deux produits créent une réaction chimique et mécanique qui décolle les saletés',
      'Laisser agir 30 minutes',
      'Rincer à l\'eau très chaude (⚠️ pas bouillante pour les canalisations en PVC)'
    ],
    surfaces: ['Lavabo', 'Douche', 'Évier'],
    precautions: ['JAMAIS d\'eau bouillante sur des canalisations en PVC - risque de déformation', 'Utiliser uniquement de l\'eau très chaude'],
    astuces: ['Si les odeurs persistent, mélangez 1/4 tasse de sel fin au bicarbonate avant de l\'ajouter à la canalisation. Le sel agit comme un abrasif doux pour éliminer les dépôts.', 'Cette recette désodorisante est naturelle, efficace, et laisse une agréable sensation de fraîcheur dans vos canalisations !'],
    conservation: 'À utiliser immédiatement'
  },
  {
    id: 34,
    nom: 'Détartrant WC Express',
    emoji: '⚡',
    categorie: 'Salle de bain',
    badge: 'Rapide',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
    temps: '2h',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Acide citrique', quantite: '3 c.à.s', emoji: '🍋' },
      { nom: 'Eau chaude', quantite: '500ml', emoji: '💧' }
    ],
    materiel: ['Brosse WC'],
    instructions: [
      'Dissoudre l\'acide citrique dans l\'eau chaude',
      'Verser dans la cuvette des WC',
      'Laisser agir 2 heures minimum',
      'Frotter avec la brosse',
      'Tirer la chasse'
    ],
    surfaces: ['WC'],
    precautions: ['Ne pas mélanger avec de l\'eau de javel', 'Bien aérer la pièce'],
    astuces: ['Pour un tartre très incrusté, laisser agir toute la nuit', 'L\'acide citrique est un détartrant naturel très efficace'],
    conservation: 'À utiliser immédiatement'
  },
  {
    id: 35,
    nom: 'Spray Alcool Ménager 70°',
    emoji: '✨',
    categorie: 'Multi-usage',
    badge: 'Tout-terrain',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
    temps: '1min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Alcool ménager 70°', quantite: '500ml', emoji: '🔬' }
    ],
    materiel: ['Flacon spray 500ml'],
    instructions: [
      'Versez l\'alcool ménager directement dans un flacon spray',
      'C\'est prêt à l\'emploi !',
      'Vaporisez sur la surface ou sur une lavette/microfibre',
      'Essuyez simplement - pas besoin de rincer',
      'Laissez sécher quelques secondes'
    ],
    surfaces: ['Robinetterie', 'Vitres', 'Miroirs', 'Interrupteurs', 'Poignées', 'WC', 'Parois de douche', 'Téléphone', 'Écrans', 'Plastiques voiture'],
    precautions: ['Très inflammable - éloigner des flammes et sources de chaleur', 'Utiliser dans un endroit ventilé', 'Ne pas utiliser sur bois vernis ou laqué', 'Éviter le contact prolongé avec les plastiques sensibles'],
    astuces: ['Idéal pour détruire les mauvaises odeurs sur les textiles (vaporiser à 30cm)', 'Fait briller la robinetterie et les parois de douche sans traces', 'Désinfecte télécommandes, claviers et poignées en quelques secondes', 'Parfait pour nettoyer les ampoules (éteintes et froides !)', 'Excellent pour l\'habitacle de voiture et les bacs de rangement'],
    conservation: '2 ans (garder le flacon bien fermé)'
  },
  {
    id: 36,
    nom: 'Pierre Blanche de Nettoyage',
    emoji: '⚪',
    categorie: 'Indispensable',
    badge: 'L\'indispensable',
    gradient: 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 50%, #DEE2E6 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Pierre blanche (ou pierre d\'argile)', quantite: '1 pot', emoji: '⚪' },
      { nom: 'Chiffon microfibre', quantite: '1', emoji: '🧽' }
    ],
    materiel: ['Chiffon microfibre ou éponge douce', 'Eau claire pour rinçage'],
    instructions: [
      'Humidifiez légèrement un chiffon ou une microfibre',
      'Prélevez un peu de pierre blanche avec le chiffon',
      'Frottez la surface par mouvements circulaires',
      'Insistez sur les zones encrassées ou tachées',
      'Rincez à l\'eau claire si nécessaire',
      'Essuyez avec un chiffon sec pour faire briller'
    ],
    surfaces: ['Vaisselle', 'Tasses', 'Mugs', 'Assiettes', 'Casseroles', 'Poêles', 'Inox', 'Évier', 'Robinetterie', 'Plaques', 'Four'],
    precautions: ['Ne pas utiliser sur surfaces fragiles ou rayables', 'Rincer les surfaces alimentaires', 'Tester sur une zone discrète d\'abord'],
    astuces: ['La pierre blanche est un abrasif doux ultra-polyvalent', 'Idéale pour récupérer la vaisselle incrustée', 'Fait briller l\'inox sans le rayer', 'Parfaite pour les fonds de casseroles brûlés'],
    conservation: '2-3 ans (produit sec)'
  },
  {
    id: 37,
    nom: 'Vaisselle Impeccable',
    emoji: '🍽️',
    categorie: 'Cuisine',
    badge: 'L\'astuce flemme',
    gradient: 'linear-gradient(135deg, #FDE68A 0%, #FCD34D 100%)',
    temps: '30min + repos',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau bien chaude', quantite: 'Pour recouvrir', emoji: '💧' },
      { nom: 'Percarbonate de soude', quantite: '2 c.à.s', emoji: '✨' },
      { nom: 'Savon de Marseille', quantite: '1 bloc', emoji: '🧼' }
    ],
    materiel: ['Évier ou récipient', 'Éponge'],
    instructions: [
      'Versez de l\'eau bien chaude pour recouvrir la zone incrustée',
      'Ajoutez le percarbonate de soude et mélangez',
      'Laissez refroidir complètement (30min à 1h)',
      'Vous verrez déjà le résultat : les incrustations se décollent',
      'Savonnez avec le savon de Marseille',
      'Rincez à l\'eau claire - c\'est tout !'
    ],
    surfaces: ['Vaisselle incrustée', 'Tasses tachées', 'Mugs', 'Assiettes', 'Plats à gratin', 'Fonds de casseroles'],
    precautions: ['Ne pas utiliser sur aluminium', 'Tester sur les surfaces délicates', 'Eau chaude, pas bouillante'],
    astuces: ['L\'astuce de la flemme : zéro effort, résultat garanti !', 'Le percarbonate libère de l\'oxygène actif qui décolle les incrustations', 'Idéal pour les taches de thé ou café dans les tasses', 'Fonctionne aussi sur les plats à gratin très encrassés'],
    conservation: 'À préparer à chaque usage'
  },
  {
    id: 38,
    nom: 'Casseroles Inox Brillantes',
    emoji: '🥘',
    categorie: 'Cuisine',
    badge: 'Inox pro',
    gradient: 'linear-gradient(135deg, #94A3B8 0%, #CBD5E1 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Vinaigre blanc', quantite: '50ml', emoji: '🧴' },
      { nom: 'Bicarbonate de soude', quantite: '2 c.à.s', emoji: '⚪' },
      { nom: 'Eau chaude', quantite: 'Pour couvrir le fond', emoji: '💧' }
    ],
    materiel: ['Éponge douce', 'Chiffon microfibre'],
    instructions: [
      'Versez de l\'eau chaude pour couvrir le fond de la casserole',
      'Ajoutez le vinaigre blanc',
      'Saupoudrez le bicarbonate (ça va mousser !)',
      'Laissez agir 10 minutes',
      'Frottez avec une éponge douce',
      'Rincez et séchez avec un chiffon microfibre pour faire briller'
    ],
    surfaces: ['Casseroles inox', 'Poêles inox', 'Faitouts inox', 'Marmites inox'],
    precautions: ['Ne pas utiliser d\'éponge abrasive sur l\'inox', 'Frotter dans le sens du brossage de l\'inox', 'Bien sécher pour éviter les traces d\'eau'],
    astuces: ['Le vinaigre dissout le calcaire et les traces blanches', 'Le bicarbonate décolle les résidus brûlés', 'Pour les traces arc-en-ciel : frotter avec du vinaigre pur'],
    conservation: 'À préparer à chaque usage'
  },
  {
    id: 39,
    nom: 'Poêle Antiadhésive Récupérée',
    emoji: '🍳',
    categorie: 'Cuisine',
    badge: 'Sauvetage',
    gradient: 'linear-gradient(135deg, #374151 0%, #6B7280 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau chaude', quantite: '500ml', emoji: '💧' },
      { nom: 'Bicarbonate de soude', quantite: '3 c.à.s', emoji: '⚪' },
      { nom: 'Savon noir liquide', quantite: '1 c.à.s', emoji: '⚫' }
    ],
    materiel: ['Éponge très douce', 'Cuillère en bois'],
    instructions: [
      'Versez l\'eau chaude dans la poêle',
      'Ajoutez le bicarbonate et le savon noir',
      'Portez à frémissement (pas ébullition)',
      'Laissez refroidir 10 minutes',
      'Frottez délicatement avec une éponge très douce',
      'Rincez abondamment à l\'eau claire'
    ],
    surfaces: ['Poêles antiadhésives', 'Casseroles antiadhésives', 'Woks'],
    precautions: ['JAMAIS d\'éponge abrasive sur le revêtement antiadhésif', 'Ne pas utiliser de sel ou de produit abrasif', 'Ne pas surchauffer la poêle vide'],
    astuces: ['Le bicarbonate décolle les résidus sans rayer', 'Pour entretenir : huiler légèrement après chaque lavage', 'Éviter les ustensiles métalliques pour préserver le revêtement'],
    conservation: 'À préparer à chaque usage'
  },
  // === NOUVELLES ASTUCES - BICARBONATE ===
  {
    id: 40,
    nom: 'Désodorisant Frigo',
    emoji: '🧊',
    categorie: 'Cuisine',
    badge: 'Anti-odeurs',
    gradient: 'linear-gradient(135deg, #B2EBF2 0%, #80DEEA 100%)',
    temps: '1min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '3 c.à.s', emoji: '⚪' }
    ],
    materiel: ['Petit bol ou boîte ouverte'],
    instructions: [
      'Versez le bicarbonate dans un petit bol ou une boîte ouverte',
      'Placez-le au fond du réfrigérateur',
      'Remplacez tous les 2-3 mois',
      'Le bicarbonate usagé peut servir pour le ménage'
    ],
    surfaces: ['Réfrigérateur', 'Congélateur'],
    precautions: ['Ne pas renverser dans les aliments', 'Éloigner des aliments sensibles'],
    astuces: ['Le bicarbonate absorbe les odeurs et l\'humidité', 'Prolonge la fraîcheur des aliments', 'Fonctionne aussi dans le congélateur'],
    conservation: 'À renouveler tous les 2-3 mois'
  },
  {
    id: 41,
    nom: 'Désodorisant Poubelle',
    emoji: '🗑️',
    categorie: 'Cuisine',
    badge: 'Anti-odeurs',
    gradient: 'linear-gradient(135deg, #A5D6A7 0%, #81C784 100%)',
    temps: '1min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '2 c.à.s', emoji: '⚪' }
    ],
    materiel: ['Aucun'],
    instructions: [
      'Saupoudrez le bicarbonate au fond de la poubelle propre',
      'Ajoutez le sac poubelle par-dessus',
      'Renouvelez à chaque changement de sac',
      'Vous pouvez ajouter quelques gouttes d\'HE menthe'
    ],
    surfaces: ['Poubelles'],
    precautions: ['Nettoyer régulièrement la poubelle elle-même'],
    astuces: ['Élimine les odeurs à la source', 'Fonctionne aussi pour les poubelles de salle de bain', 'Ajoutez de la menthe poivrée pour un effet répulsif insectes'],
    conservation: 'À renouveler à chaque vidage'
  },
  {
    id: 42,
    nom: 'Désodorisant Tapis',
    emoji: '🧶',
    categorie: 'Multi-usage',
    badge: 'Rafraîchissant',
    gradient: 'linear-gradient(135deg, #CE93D8 0%, #BA68C8 100%)',
    temps: '30min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '200g', emoji: '⚪' },
      { nom: 'HE lavande (optionnel)', quantite: '10 gouttes', emoji: '💜' }
    ],
    materiel: ['Aspirateur'],
    instructions: [
      'Mélangez le bicarbonate avec l\'HE si désirée',
      'Saupoudrez généreusement sur le tapis',
      'Laissez agir 30 minutes minimum (idéalement 2h)',
      'Aspirez soigneusement',
      'Le tapis est désodorisé et rafraîchi'
    ],
    surfaces: ['Tapis', 'Moquette', 'Matelas'],
    precautions: ['Tester sur une zone cachée d\'abord', 'Bien aspirer pour éviter les résidus'],
    astuces: ['Idéal après une fête ou en présence d\'animaux', 'La lavande repousse les mites', 'Fonctionne aussi sur les canapés en tissu'],
    conservation: 'À préparer à chaque usage'
  },
  // === CRISTAUX DE SOUDE ===
  {
    id: 43,
    nom: 'Dégraissant Hotte',
    emoji: '🌀',
    categorie: 'Cuisine',
    badge: 'Ultra-dégraissant',
    gradient: 'linear-gradient(135deg, #90CAF9 0%, #64B5F6 100%)',
    temps: '20min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Cristaux de soude', quantite: '3 c.à.s', emoji: '💎' },
      { nom: 'Eau chaude', quantite: '1L', emoji: '💧' }
    ],
    materiel: ['Éponge', 'Gants', 'Bassine'],
    instructions: [
      'Portez des gants de protection',
      'Dissolvez les cristaux dans l\'eau chaude',
      'Démontez les filtres de la hotte si possible',
      'Faites tremper les filtres dans la solution',
      'Nettoyez la hotte avec l\'éponge imbibée',
      'Rincez abondamment et séchez'
    ],
    surfaces: ['Hotte', 'Filtres de hotte', 'Grilles BBQ'],
    precautions: ['Toujours porter des gants', 'Ne pas utiliser sur aluminium', 'Bien rincer'],
    astuces: ['Les cristaux dissolvent les graisses cuites', 'Idéal pour les filtres très encrassés', 'Fonctionne aussi sur les grilles de barbecue'],
    conservation: 'À préparer à chaque usage'
  },
  {
    id: 44,
    nom: 'Nettoyant Jantes Auto',
    emoji: '⭕',
    categorie: 'Voiture',
    badge: 'Brillant',
    gradient: 'linear-gradient(135deg, #78909C 0%, #546E7A 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Cristaux de soude', quantite: '2 c.à.s', emoji: '💎' },
      { nom: 'Eau chaude', quantite: '500ml', emoji: '💧' },
      { nom: 'Savon noir', quantite: '1 c.à.s', emoji: '⚫' }
    ],
    materiel: ['Brosse', 'Éponge', 'Gants'],
    instructions: [
      'Mélangez les cristaux et le savon noir dans l\'eau chaude',
      'Appliquez sur les jantes avec une brosse',
      'Frottez pour décoller la poussière de frein',
      'Rincez abondamment à l\'eau claire',
      'Séchez avec un chiffon pour éviter les traces'
    ],
    surfaces: ['Jantes'],
    precautions: ['Porter des gants', 'Tester sur une petite zone d\'abord', 'Rincer abondamment'],
    astuces: ['Élimine la poussière de frein incrustée', 'La pierre blanche peut compléter pour faire briller', 'À faire avant le lavage complet'],
    conservation: 'À préparer à chaque usage'
  },
  // === PERCARBONATE ===
  {
    id: 45,
    nom: 'Blanchisseur Linge',
    emoji: '🧺',
    categorie: 'Linge',
    badge: 'Éclat blanc',
    gradient: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
    temps: '2h trempage',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Percarbonate de soude', quantite: '2 c.à.s', emoji: '✨' },
      { nom: 'Eau chaude (+40°C)', quantite: '5L', emoji: '💧' }
    ],
    materiel: ['Bassine ou évier'],
    instructions: [
      'Remplissez une bassine d\'eau chaude (minimum 40°C)',
      'Dissolvez le percarbonate dans l\'eau',
      'Plongez le linge blanc ou terne',
      'Laissez tremper 2 à 4 heures',
      'Lavez ensuite normalement en machine'
    ],
    surfaces: ['Linge blanc', 'Serviettes', 'Draps', 'Chaussettes'],
    precautions: ['Eau minimum 40°C obligatoire', 'Ne pas utiliser sur soie, laine, tissus colorés', 'Porter des gants si manipulation prolongée'],
    astuces: ['Ravive les blancs grisaillés', 'Élimine les taches de transpiration jaunes', 'Ajoutez directement dans le tambour pour un boost'],
    conservation: 'À préparer à chaque usage'
  },
  {
    id: 46,
    nom: 'Anti-Mousses Terrasse',
    emoji: '🏠',
    categorie: 'Entretien',
    badge: 'Extérieur',
    gradient: 'linear-gradient(135deg, #A5D6A7 0%, #66BB6A 100%)',
    temps: '30min + repos',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Percarbonate de soude', quantite: '100g', emoji: '✨' },
      { nom: 'Eau chaude', quantite: '5L', emoji: '💧' }
    ],
    materiel: ['Arrosoir ou pulvérisateur', 'Brosse dure'],
    instructions: [
      'Dissolvez le percarbonate dans l\'eau chaude',
      'Arrosez généreusement la terrasse',
      'Laissez agir 30 minutes',
      'Frottez avec une brosse dure',
      'Rincez au jet d\'eau',
      'Renouvelez si nécessaire'
    ],
    surfaces: ['Terrasse', 'Toiture', 'Mobilier jardin'],
    precautions: ['Protéger les plantes à proximité', 'Éviter par temps de pluie', 'Porter des gants'],
    astuces: ['Élimine mousses et lichens naturellement', 'Effet préventif sur plusieurs mois', 'Fonctionne aussi sur les murs extérieurs'],
    conservation: 'À préparer à chaque usage'
  },
  {
    id: 47,
    nom: 'Nettoyant Sièges Auto Tissu',
    emoji: '💺',
    categorie: 'Voiture',
    badge: 'Détachant',
    gradient: 'linear-gradient(135deg, #B0BEC5 0%, #90A4AE 100%)',
    temps: '30min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Percarbonate de soude', quantite: '1 c.à.s', emoji: '✨' },
      { nom: 'Eau chaude', quantite: '500ml', emoji: '💧' },
      { nom: 'Savon de Marseille', quantite: '1 c.à.c râpé', emoji: '🧼' }
    ],
    materiel: ['Brosse douce', 'Chiffon microfibre', 'Pulvérisateur'],
    instructions: [
      'Dissolvez le percarbonate et le savon dans l\'eau chaude',
      'Vaporisez sur les taches ou toute la surface',
      'Frottez doucement avec la brosse',
      'Laissez agir 15 minutes',
      'Essuyez avec un chiffon humide',
      'Laissez sécher portes ouvertes'
    ],
    surfaces: ['Sièges auto tissu', 'Tapis voiture', 'Moquette auto'],
    precautions: ['Tester sur zone cachée', 'Ne pas détremper', 'Bien faire sécher'],
    astuces: ['Élimine les taches et les odeurs', 'Le percarbonate désinfecte en profondeur', 'Idéal au changement de saison'],
    conservation: 'À préparer à chaque usage'
  },
  // === VINAIGRE BLANC ===
  {
    id: 48,
    nom: 'Détartrant Bouilloire',
    emoji: '🫖',
    categorie: 'Cuisine',
    badge: 'Anti-calcaire',
    gradient: 'linear-gradient(135deg, #FFCC80 0%, #FFB74D 100%)',
    temps: '30min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Vinaigre blanc', quantite: '250ml', emoji: '🧴' },
      { nom: 'Eau', quantite: '250ml', emoji: '💧' }
    ],
    materiel: ['Aucun'],
    instructions: [
      'Mélangez le vinaigre et l\'eau dans la bouilloire',
      'Portez à ébullition',
      'Laissez agir 30 minutes hors tension',
      'Videz et rincez plusieurs fois',
      'Faites bouillir une eau claire avant utilisation'
    ],
    surfaces: ['Bouilloire', 'Cafetière'],
    precautions: ['Bien rincer avant réutilisation', 'Aérer pendant l\'opération'],
    astuces: ['À faire une fois par mois en zone calcaire', 'Le vinaigre dissout le tartre rapidement', 'Fonctionne aussi pour la cafetière'],
    conservation: 'À préparer à chaque usage'
  },
  {
    id: 49,
    nom: 'Nettoyant Micro-ondes',
    emoji: '📺',
    categorie: 'Cuisine',
    badge: 'Vapeur magique',
    gradient: 'linear-gradient(135deg, #FFF59D 0%, #FFF176 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Vinaigre blanc', quantite: '100ml', emoji: '🧴' },
      { nom: 'Eau', quantite: '200ml', emoji: '💧' },
      { nom: 'Jus de citron (optionnel)', quantite: '1 c.à.s', emoji: '🍋' }
    ],
    materiel: ['Bol compatible micro-ondes', 'Éponge'],
    instructions: [
      'Versez l\'eau et le vinaigre dans un bol',
      'Ajoutez le jus de citron si désiré',
      'Faites chauffer 3-4 minutes puissance max',
      'Laissez reposer 5 minutes porte fermée',
      'Essuyez facilement avec une éponge'
    ],
    surfaces: ['Micro-ondes'],
    precautions: ['Attention au bol chaud', 'Ne pas ouvrir tout de suite'],
    astuces: ['La vapeur ramollit toutes les projections', 'Le citron neutralise les odeurs', 'Méthode sans effort qui fonctionne à tous les coups'],
    conservation: 'À préparer à chaque usage'
  },
  {
    id: 50,
    nom: 'Désherbant Naturel',
    emoji: '🌿',
    categorie: 'Entretien',
    badge: 'Écologique',
    gradient: 'linear-gradient(135deg, #C5E1A5 0%, #AED581 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Vinaigre blanc', quantite: '1L', emoji: '🧴' },
      { nom: 'Gros sel', quantite: '100g', emoji: '🧂' }
    ],
    materiel: ['Pulvérisateur'],
    instructions: [
      'Mélangez le vinaigre et le sel',
      'Versez dans un pulvérisateur',
      'Vaporisez directement sur les mauvaises herbes',
      'Appliquez par temps sec et ensoleillé',
      'Effet visible en 24-48h'
    ],
    surfaces: ['Mauvaises herbes', 'Allées', 'Terrasse'],
    precautions: ['Ne pas utiliser sur pelouse ou plantes désirées', 'Éviter les jours de pluie', 'Le sel peut stériliser le sol'],
    astuces: ['Plus efficace par temps chaud', 'Alternative écologique au glyphosate', 'L\'eau bouillante seule fonctionne aussi'],
    conservation: '1 mois'
  },
  // === ACIDE CITRIQUE ===
  {
    id: 51,
    nom: 'Détartrant Cafetière',
    emoji: '☕',
    categorie: 'Cuisine',
    badge: 'Anti-calcaire',
    gradient: 'linear-gradient(135deg, #BCAAA4 0%, #A1887F 100%)',
    temps: '20min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Acide citrique', quantite: '2 c.à.s', emoji: '🍋' },
      { nom: 'Eau', quantite: '1L', emoji: '💧' }
    ],
    materiel: ['Aucun'],
    instructions: [
      'Dissolvez l\'acide citrique dans l\'eau',
      'Versez dans le réservoir de la cafetière',
      'Lancez un cycle complet',
      'Laissez reposer 10 minutes',
      'Faites 2-3 cycles à l\'eau claire pour rincer'
    ],
    surfaces: ['Cafetière', 'Machine à café', 'Bouilloire'],
    precautions: ['Bien rincer plusieurs fois', 'Ne pas boire l\'eau de rinçage'],
    astuces: ['Plus efficace que le vinaigre contre le calcaire', 'Sans odeur résiduelle', 'À faire tous les 2 mois'],
    conservation: 'À préparer à chaque usage'
  },
  {
    id: 52,
    nom: 'Anti-Rouille Naturel',
    emoji: '🔧',
    categorie: 'Entretien',
    badge: 'Rénovateur',
    gradient: 'linear-gradient(135deg, #FFAB91 0%, #FF8A65 100%)',
    temps: '1h trempage',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Acide citrique', quantite: '4 c.à.s', emoji: '🍋' },
      { nom: 'Eau chaude', quantite: '500ml', emoji: '💧' }
    ],
    materiel: ['Récipient', 'Brosse métallique', 'Chiffon'],
    instructions: [
      'Dissolvez l\'acide citrique dans l\'eau chaude',
      'Immergez l\'objet rouillé ou appliquez en pâte',
      'Laissez agir 1 heure minimum',
      'Frottez avec une brosse métallique',
      'Rincez et séchez immédiatement',
      'Protégez avec de l\'huile pour éviter la réoxydation'
    ],
    surfaces: ['Outils de jardin', 'Objets métalliques', 'Robinetterie'],
    precautions: ['Sécher immédiatement après rinçage', 'Protéger ensuite avec de l\'huile', 'Porter des gants'],
    astuces: ['L\'acide citrique dissout l\'oxyde de fer', 'Fonctionne sur la rouille légère à moyenne', 'L\'huile de lin protège durablement'],
    conservation: 'À préparer à chaque usage'
  },
  // === SAVON NOIR ===
  {
    id: 53,
    nom: 'Insecticide Plantes',
    emoji: '🌱',
    categorie: 'Entretien',
    badge: 'Bio',
    gradient: 'linear-gradient(135deg, #81C784 0%, #66BB6A 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Savon noir', quantite: '2 c.à.s', emoji: '⚫' },
      { nom: 'Eau tiède', quantite: '1L', emoji: '💧' }
    ],
    materiel: ['Pulvérisateur'],
    instructions: [
      'Diluez le savon noir dans l\'eau tiède',
      'Versez dans un pulvérisateur',
      'Vaporisez sur les plantes infestées',
      'Insistez sous les feuilles',
      'Renouvelez tous les 3-4 jours si nécessaire'
    ],
    surfaces: ['Plantes', 'Rosiers', 'Arbres fruitiers'],
    precautions: ['Éviter de traiter en plein soleil', 'Ne pas surdoser', 'Rincer les fruits/légumes avant consommation'],
    astuces: ['Élimine pucerons, cochenilles et acariens', 'Le savon noir bouche les voies respiratoires des insectes', 'Respectueux des abeilles'],
    conservation: '1 semaine'
  },
  {
    id: 54,
    nom: 'Nettoyant Carrosserie',
    emoji: '🚗',
    categorie: 'Voiture',
    badge: 'Brillance',
    gradient: 'linear-gradient(135deg, #90CAF9 0%, #64B5F6 100%)',
    temps: '30min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Savon noir', quantite: '2 c.à.s', emoji: '⚫' },
      { nom: 'Eau tiède', quantite: '5L', emoji: '💧' }
    ],
    materiel: ['Seau', 'Éponge douce', 'Chiffon microfibre'],
    instructions: [
      'Diluez le savon noir dans l\'eau tiède',
      'Rincez d\'abord la voiture au jet',
      'Lavez avec l\'éponge imbibée',
      'Procédez du haut vers le bas',
      'Rincez abondamment',
      'Séchez avec le chiffon microfibre'
    ],
    surfaces: ['Carrosserie', 'Jantes', 'Vitres auto'],
    precautions: ['Éviter le plein soleil', 'Ne pas laisser sécher le produit', 'Bien rincer'],
    astuces: ['Le savon noir ne raye pas et fait briller', 'Économique et écologique', 'Laisse un film protecteur'],
    conservation: 'À préparer à chaque usage'
  },
  // === BLANC DE MEUDON ===
  {
    id: 55,
    nom: 'Polish Argenterie',
    emoji: '🥄',
    categorie: 'Multi-usage',
    badge: 'Éclat',
    gradient: 'linear-gradient(135deg, #CFD8DC 0%, #B0BEC5 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Blanc de Meudon', quantite: '3 c.à.s', emoji: '⚪' },
      { nom: 'Eau', quantite: '2 c.à.s', emoji: '💧' }
    ],
    materiel: ['Chiffon doux', 'Brosse à dents souple (optionnel)'],
    instructions: [
      'Mélangez le blanc de Meudon et l\'eau pour former une pâte',
      'Appliquez sur l\'argenterie avec un chiffon',
      'Frottez délicatement en mouvements circulaires',
      'Utilisez une brosse à dents pour les détails',
      'Rincez à l\'eau claire',
      'Lustrez avec un chiffon sec'
    ],
    surfaces: ['Argenterie', 'Cuivre', 'Laiton', 'Inox'],
    precautions: ['Ne pas utiliser sur surfaces peintes ou vernies', 'Rincer soigneusement'],
    astuces: ['Le blanc de Meudon ne raye pas', 'Redonne l\'éclat d\'origine', 'Fonctionne aussi sur le cuivre et le laiton'],
    conservation: 'La pâte sèche rapidement, préparer à chaque usage'
  },
  {
    id: 56,
    nom: 'Polish Meubles Bois',
    emoji: '🪑',
    categorie: 'Multi-usage',
    badge: 'Nourrissant',
    gradient: 'linear-gradient(135deg, #D7CCC8 0%, #BCAAA4 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Blanc de Meudon', quantite: '2 c.à.s', emoji: '⚪' },
      { nom: 'Huile d\'olive', quantite: '2 c.à.s', emoji: '🫒' }
    ],
    materiel: ['Chiffon doux', 'Chiffon de lustrage'],
    instructions: [
      'Mélangez le blanc de Meudon et l\'huile d\'olive',
      'Appliquez une fine couche sur le meuble',
      'Frottez dans le sens du bois',
      'Laissez pénétrer 5 minutes',
      'Lustrez avec un chiffon propre et sec'
    ],
    surfaces: ['Meubles en bois', 'Parquet'],
    precautions: ['Tester sur zone cachée', 'Utiliser avec parcimonie'],
    astuces: ['L\'huile nourrit le bois', 'Le blanc de Meudon nettoie et fait briller', 'Parfait pour raviver les meubles anciens'],
    conservation: 'À préparer à chaque usage'
  },
  // === MARC DE CAFÉ ===
  {
    id: 57,
    nom: 'Désodorisant Placards',
    emoji: '☕',
    categorie: 'Multi-usage',
    badge: 'Anti-odeurs',
    gradient: 'linear-gradient(135deg, #8D6E63 0%, #6D4C41 100%)',
    temps: '2min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Marc de café sec', quantite: '3 c.à.s', emoji: '☕' }
    ],
    materiel: ['Petit bol ou coupelle', 'Tissu fin (optionnel)'],
    instructions: [
      'Laissez sécher le marc de café complètement',
      'Placez-le dans un petit bol',
      'Disposez dans le placard, frigo ou congélateur',
      'Remplacez toutes les 2 semaines'
    ],
    surfaces: ['Placards', 'Réfrigérateur', 'Congélateur'],
    precautions: ['Le marc doit être bien sec pour éviter les moisissures', 'Ne pas mettre en contact avec les aliments'],
    astuces: ['Le café absorbe les mauvaises odeurs', 'Récupérez le marc de votre cafetière', 'Utilisable aussi contre les odeurs de peinture'],
    conservation: 'À renouveler toutes les 2 semaines'
  },
  {
    id: 58,
    nom: 'Récurant Casseroles',
    emoji: '🍳',
    categorie: 'Cuisine',
    badge: 'Abrasif doux',
    gradient: 'linear-gradient(135deg, #A1887F 0%, #8D6E63 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Marc de café', quantite: '2 c.à.s', emoji: '☕' },
      { nom: 'Savon noir', quantite: '1 c.à.c', emoji: '⚫' }
    ],
    materiel: ['Éponge'],
    instructions: [
      'Mélangez le marc de café et le savon noir',
      'Appliquez sur la casserole encrassée',
      'Frottez en mouvements circulaires',
      'Le marc agit comme un abrasif doux',
      'Rincez abondamment'
    ],
    surfaces: ['Casseroles', 'Poêles', 'Évier'],
    precautions: ['Ne pas utiliser sur surfaces antiadhésives', 'Bien rincer pour éviter les dépôts'],
    astuces: ['Le marc est légèrement abrasif sans rayer', 'Le savon noir dégraisse', 'Recyclez votre marc du matin !'],
    conservation: 'À préparer à chaque usage'
  },
  // === TERRE DE SOMMIÈRES ===
  {
    id: 59,
    nom: 'Détachant Gras Textile',
    emoji: '👕',
    categorie: 'Linge',
    badge: 'Détachant sec',
    gradient: 'linear-gradient(135deg, #D7CCC8 0%, #A1887F 100%)',
    temps: '4h minimum',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Terre de Sommières', quantite: 'Selon tache', emoji: '🟤' }
    ],
    materiel: ['Brosse douce', 'Aspirateur (optionnel)'],
    instructions: [
      'Saupoudrez généreusement sur la tache de gras',
      'Tapotez légèrement pour faire pénétrer',
      'Laissez agir 4 heures minimum (idéalement une nuit)',
      'Brossez délicatement pour retirer la poudre',
      'Aspirez les résidus',
      'Lavez normalement si nécessaire'
    ],
    surfaces: ['Textile', 'Cuir', 'Daim', 'Canapé tissu', 'Tapis'],
    precautions: ['Ne pas frotter au début', 'Tester sur zone cachée pour les tissus délicats', 'Ne pas mouiller avant traitement'],
    astuces: ['Absorbe le gras sans eau ni frottement', 'Plus la tache est fraîche, plus c\'est efficace', 'Fonctionne sur huile, beurre, sauce, maquillage'],
    conservation: 'Produit sec, conservation illimitée'
  },
  // === HUILE DE COCO ===
  {
    id: 60,
    nom: 'Lubrifiant Charnières',
    emoji: '🚪',
    categorie: 'Entretien',
    badge: 'Anti-grincement',
    gradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Huile de coco', quantite: '1 c.à.c', emoji: '🥥' }
    ],
    materiel: ['Chiffon', 'Coton-tige (optionnel)'],
    instructions: [
      'Faites légèrement tiédir l\'huile si elle est solide',
      'Appliquez une petite quantité sur la charnière',
      'Utilisez un coton-tige pour les endroits difficiles',
      'Actionnez la porte plusieurs fois',
      'Essuyez l\'excédent'
    ],
    surfaces: ['Charnières', 'Serrures', 'Tiroirs'],
    precautions: ['Éviter le surdosage', 'Essuyer l\'excédent pour éviter les taches'],
    astuces: ['L\'huile de coco ne rancit pas', 'Alternative naturelle au WD-40', 'Fonctionne aussi sur les tiroirs qui coincent'],
    conservation: '2 ans'
  },
  {
    id: 61,
    nom: 'Décollant Autocollants',
    emoji: '🏷️',
    categorie: 'Multi-usage',
    badge: 'Décollant',
    gradient: 'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Huile de coco', quantite: '1 c.à.s', emoji: '🥥' }
    ],
    materiel: ['Chiffon', 'Carte plastique (optionnel)'],
    instructions: [
      'Appliquez l\'huile sur l\'autocollant',
      'Laissez agir 10-15 minutes',
      'L\'huile pénètre et ramollit la colle',
      'Décollez délicatement ou grattez avec une carte',
      'Nettoyez les résidus avec un chiffon',
      'Lavez la surface si nécessaire'
    ],
    surfaces: ['Verre', 'Plastique', 'Métal', 'Bois vernis'],
    precautions: ['Tester sur bois brut avant', 'Bien nettoyer après pour éviter les traces grasses'],
    astuces: ['L\'huile dissout la colle naturellement', 'Fonctionne aussi avec l\'huile d\'olive', 'Idéal pour les étiquettes de prix'],
    conservation: '2 ans'
  },
  // === HUILE DE LIN ===
  {
    id: 62,
    nom: 'Soin Meubles Bois',
    emoji: '🪵',
    categorie: 'Multi-usage',
    badge: 'Nourrissant',
    gradient: 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)',
    temps: '30min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Huile de lin', quantite: '3 c.à.s', emoji: '🌾' },
      { nom: 'Essence de térébenthine', quantite: '1 c.à.s', emoji: '🧪' }
    ],
    materiel: ['Chiffon doux', 'Chiffon de lustrage'],
    instructions: [
      'Mélangez l\'huile de lin et l\'essence de térébenthine',
      'Appliquez en fine couche dans le sens du bois',
      'Laissez pénétrer 20-30 minutes',
      'Essuyez l\'excédent',
      'Lustrez avec un chiffon propre',
      'Laissez sécher 24h avant utilisation'
    ],
    surfaces: ['Meubles en bois', 'Parquet', 'Boiseries', 'Poutres'],
    precautions: ['Bien aérer pendant l\'application', 'Attention aux chiffons imbibés (risque d\'auto-combustion)', 'Jeter les chiffons dans l\'eau après usage'],
    astuces: ['Nourrit le bois en profondeur', 'Fait ressortir les veines du bois', 'Protection durable et aspect satiné'],
    conservation: '1 an'
  },
  {
    id: 63,
    nom: 'Protection Outils Jardin',
    emoji: '🧑‍🌾',
    categorie: 'Entretien',
    badge: 'Anti-rouille',
    gradient: 'linear-gradient(135deg, #C8E6C9 0%, #A5D6A7 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Huile de lin', quantite: '2 c.à.s', emoji: '🌾' }
    ],
    materiel: ['Chiffon'],
    instructions: [
      'Nettoyez les outils de la terre et des résidus',
      'Séchez-les complètement',
      'Appliquez une fine couche d\'huile de lin',
      'Insistez sur les parties métalliques',
      'Essuyez l\'excédent',
      'Laissez sécher avant rangement'
    ],
    surfaces: ['Outils de jardin', 'Lames', 'Sécateurs'],
    precautions: ['Les outils doivent être propres et secs', 'Stocker dans un endroit sec'],
    astuces: ['Protège de la rouille durablement', 'Nourrit aussi les manches en bois', 'Idéal avant l\'hivernage'],
    conservation: '1 an'
  },
  // === SAVON AU FIEL DE BŒUF ===
  {
    id: 64,
    nom: 'Détachant Cuir',
    emoji: '👜',
    categorie: 'Multi-usage',
    badge: 'Spécial cuir',
    gradient: 'linear-gradient(135deg, #A1887F 0%, #8D6E63 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Savon au fiel de bœuf', quantite: '1 bloc', emoji: '🧼' },
      { nom: 'Eau tiède', quantite: 'Un peu', emoji: '💧' }
    ],
    materiel: ['Chiffon doux', 'Éponge'],
    instructions: [
      'Humidifiez légèrement le savon',
      'Frottez sur la tache jusqu\'à former une mousse',
      'Laissez agir 5-10 minutes',
      'Essuyez avec un chiffon humide',
      'Séchez avec un chiffon sec',
      'Nourrissez le cuir après séchage'
    ],
    surfaces: ['Cuir', 'Sièges auto cuir', 'Sacs', 'Chaussures cuir'],
    precautions: ['Tester sur zone cachée', 'Ne pas détremper le cuir', 'Nourrir après le nettoyage'],
    astuces: ['Le fiel de bœuf dissout les graisses naturellement', 'Efficace sur les taches tenaces', 'Respecte le cuir'],
    conservation: 'Plusieurs années si gardé au sec'
  },
  {
    id: 65,
    nom: 'Détachant Sang',
    emoji: '🩸',
    categorie: 'Linge',
    badge: 'SOS taches',
    gradient: 'linear-gradient(135deg, #FFCDD2 0%, #EF9A9A 100%)',
    temps: '30min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Savon au fiel de bœuf', quantite: '1 bloc', emoji: '🧼' },
      { nom: 'Eau FROIDE', quantite: 'Un peu', emoji: '💧' }
    ],
    materiel: ['Bassine'],
    instructions: [
      'Rincez immédiatement à l\'eau FROIDE',
      'Ne jamais utiliser d\'eau chaude (fixe la tache)',
      'Humidifiez le savon et frottez sur la tache',
      'Laissez agir 15-30 minutes',
      'Rincez à l\'eau froide',
      'Lavez normalement en machine'
    ],
    surfaces: ['Vêtements', 'Draps', 'Textile'],
    precautions: ['JAMAIS d\'eau chaude sur le sang', 'Traiter le plus vite possible'],
    astuces: ['Le fiel de bœuf est le meilleur détachant naturel pour le sang', 'L\'eau oxygénée fonctionne aussi', 'Plus la tache est fraîche, plus c\'est facile'],
    conservation: 'Plusieurs années'
  },
  // === SEL D'OSEILLE ===
  {
    id: 66,
    nom: 'Raviveur Bois',
    emoji: '🪵',
    categorie: 'Multi-usage',
    badge: 'Rénovateur',
    gradient: 'linear-gradient(135deg, #D7CCC8 0%, #BCAAA4 100%)',
    temps: '30min',
    difficulte: 'Moyen',
    efficacite: 5,
    ingredients: [
      { nom: 'Sel d\'oseille', quantite: '150g', emoji: '🧂' },
      { nom: 'Eau chaude', quantite: '1L', emoji: '💧' }
    ],
    materiel: ['Pinceau', 'Gants', 'Lunettes de protection'],
    instructions: [
      'Portez gants et lunettes de protection',
      'Dissolvez le sel d\'oseille dans l\'eau chaude',
      'Appliquez au pinceau sur le bois',
      'Laissez agir 30 minutes',
      'Les résultats sont visibles progressivement',
      'Rincez à l\'eau claire et laissez sécher'
    ],
    surfaces: ['Bois', 'Terrasse bois', 'Parquet', 'Meubles bois'],
    precautions: ['Produit irritant - porter des protections', 'Bien rincer', 'Ne pas inhaler'],
    astuces: ['Ravive la couleur naturelle du bois grisé', 'Élimine les taches noires', 'Idéal pour les terrasses en bois'],
    conservation: 'À préparer à chaque usage'
  },
  {
    id: 67,
    nom: 'Blanchisseur Textiles',
    emoji: '👔',
    categorie: 'Linge',
    badge: 'Blanchisseur',
    gradient: 'linear-gradient(135deg, #F5F5F5 0%, #EEEEEE 100%)',
    temps: '1h trempage',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Sel d\'oseille', quantite: '30g', emoji: '🧂' }
    ],
    materiel: ['Machine à laver'],
    instructions: [
      'Mettez le sel d\'oseille dans le compartiment lessive',
      'Ou ajoutez-le directement dans le tambour',
      'Lancez un cycle normal',
      'Le sel d\'oseille blanchit en douceur'
    ],
    surfaces: ['Linge blanc', 'Textiles ternis'],
    precautions: ['Uniquement pour le blanc', 'Tester sur un vêtement d\'abord'],
    astuces: ['Redonne de l\'éclat aux blancs jaunis ou gris', 'Alternative au percarbonate', 'Utilisable comme le percarbonate de soude'],
    conservation: 'À préparer à chaque usage'
  },
  // === CENDRE DE BOIS ===
  {
    id: 68,
    nom: 'Nettoyant Vitres Cendre',
    emoji: '🪟',
    categorie: 'Multi-usage',
    badge: 'Ancestral',
    gradient: 'linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Cendre de bois tamisée', quantite: '2 c.à.s', emoji: '🔥' },
      { nom: 'Eau', quantite: '500ml', emoji: '💧' }
    ],
    materiel: ['Chiffon', 'Papier journal'],
    instructions: [
      'Tamisez la cendre pour éliminer les gros morceaux',
      'Humidifiez un chiffon',
      'Trempez-le dans la cendre fine',
      'Frottez les vitres en mouvements circulaires',
      'Essuyez avec un chiffon propre',
      'Lustrez avec du papier journal'
    ],
    surfaces: ['Vitres', 'Miroirs', 'Insert cheminée'],
    precautions: ['Utiliser uniquement de la cendre de bois non traité', 'Bien tamiser pour éviter les rayures'],
    astuces: ['Méthode ancestrale très efficace', 'La potasse de la cendre dissout les graisses', 'Parfait pour les vitres d\'insert'],
    conservation: 'Conserver la cendre au sec'
  },
  {
    id: 69,
    nom: 'Dégivrant Écologique',
    emoji: '❄️',
    categorie: 'Entretien',
    badge: 'Hiver',
    gradient: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Cendre de bois', quantite: 'Selon surface', emoji: '🔥' }
    ],
    materiel: ['Pelle'],
    instructions: [
      'Récupérez la cendre de votre cheminée ou poêle',
      'Saupoudrez sur les surfaces verglacées',
      'La cendre offre de l\'adhérence',
      'Elle aide aussi à faire fondre le verglas'
    ],
    surfaces: ['Allées', 'Escaliers', 'Terrasse'],
    precautions: ['Utiliser de la cendre de bois non traité uniquement', 'Peut salir, prévoir un nettoyage au printemps'],
    astuces: ['Alternative écologique au sel de déneigement', 'N\'abîme pas les plantes', 'La cendre enrichit ensuite le sol au printemps'],
    conservation: 'Conserver au sec'
  },
  // === TERRE DE DIATOMÉES ===
  {
    id: 70,
    nom: 'Anti-Insectes Naturel',
    emoji: '🐜',
    categorie: 'Entretien',
    badge: 'Anti-nuisibles',
    gradient: 'linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Terre de diatomées', quantite: 'Selon surface', emoji: '🪨' }
    ],
    materiel: ['Aucun'],
    instructions: [
      'Identifiez les zones de passage des insectes',
      'Saupoudrez une fine couche de terre de diatomées',
      'Appliquez le long des plinthes, sous les meubles',
      'Laissez agir plusieurs jours',
      'Renouvelez après le ménage'
    ],
    surfaces: ['Sols', 'Plinthes', 'Placards'],
    precautions: ['Ne pas inhaler la poudre', 'Tenir éloigné des animaux et enfants', 'Utiliser la qualité alimentaire'],
    astuces: ['Efficace contre fourmis, cafards, puces, punaises', 'La poudre déshydrate les insectes', 'Action mécanique, pas d\'accoutumance'],
    conservation: 'Illimitée au sec'
  },
  // === HUILES ESSENTIELLES ===
  {
    id: 71,
    nom: 'Spray Désinfectant Tea Tree',
    emoji: '🌿',
    categorie: 'Multi-usage',
    badge: 'Antibactérien',
    gradient: 'linear-gradient(135deg, #A5D6A7 0%, #81C784 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau', quantite: '500ml', emoji: '💧' },
      { nom: 'Vinaigre blanc', quantite: '2 c.à.s', emoji: '🧴' },
      { nom: 'HE tea tree', quantite: '20 gouttes', emoji: '🌿' }
    ],
    materiel: ['Flacon spray'],
    instructions: [
      'Versez l\'eau dans le flacon spray',
      'Ajoutez le vinaigre blanc',
      'Incorporez l\'huile essentielle de tea tree',
      'Secouez avant chaque utilisation',
      'Vaporisez sur les surfaces et essuyez'
    ],
    surfaces: ['Plans de travail', 'Poignées', 'Interrupteurs', 'Sanitaires'],
    precautions: ['Éviter le contact avec les yeux', 'Déconseillé femmes enceintes et enfants -3 ans', 'Ne pas utiliser sur surfaces alimentaires sans rinçage'],
    astuces: ['Le tea tree est un puissant antibactérien naturel', 'Efficace contre les bactéries et virus', 'Idéal en période de maladie'],
    conservation: '3 mois'
  },
  {
    id: 72,
    nom: 'Anti-Moisissures Tea Tree',
    emoji: '🧫',
    categorie: 'Salle de bain',
    badge: 'Antifongique',
    gradient: 'linear-gradient(135deg, #80CBC4 0%, #4DB6AC 100%)',
    temps: '30min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau', quantite: '200ml', emoji: '💧' },
      { nom: 'Vinaigre blanc', quantite: '100ml', emoji: '🧴' },
      { nom: 'HE tea tree', quantite: '30 gouttes', emoji: '🌿' }
    ],
    materiel: ['Flacon spray', 'Brosse'],
    instructions: [
      'Mélangez tous les ingrédients dans un flacon spray',
      'Vaporisez généreusement sur les zones moisies',
      'Laissez agir 30 minutes',
      'Frottez avec une brosse',
      'Rincez à l\'eau claire'
    ],
    surfaces: ['Joints carrelage', 'Parois de douche', 'Rideaux de douche', 'Murs humides'],
    precautions: ['Bien aérer', 'Porter un masque pour les grandes surfaces', 'Renouveler régulièrement en prévention'],
    astuces: ['Le tea tree est antifongique puissant', 'Élimine les moisissures en profondeur', 'Traiter la cause de l\'humidité pour éviter le retour'],
    conservation: '3 mois'
  },
  {
    id: 73,
    nom: 'Spray Textile Lavande',
    emoji: '💜',
    categorie: 'Multi-usage',
    badge: 'Désodorisant',
    gradient: 'linear-gradient(135deg, #E1BEE7 0%, #CE93D8 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau distillée', quantite: '100ml', emoji: '💧' },
      { nom: 'Alcool ménager', quantite: '50ml', emoji: '🔬' },
      { nom: 'HE lavande', quantite: '25 gouttes', emoji: '💜' }
    ],
    materiel: ['Flacon spray'],
    instructions: [
      'Versez l\'eau et l\'alcool dans le flacon',
      'Ajoutez l\'huile essentielle de lavande',
      'Secouez bien',
      'Vaporisez sur les canapés, rideaux, tapis',
      'Laissez sécher naturellement'
    ],
    surfaces: ['Canapé', 'Rideaux', 'Tapis', 'Matelas'],
    precautions: ['Tester sur zone cachée', 'Éviter les tissus délicats', 'Déconseillé aux personnes asthmatiques'],
    astuces: ['La lavande est antibactérienne et apaisante', 'Repousse les mites naturellement', 'Idéal pour rafraîchir la literie'],
    conservation: '6 mois'
  },
  {
    id: 74,
    nom: 'Répulsif Souris Menthe',
    emoji: '🐭',
    categorie: 'Entretien',
    badge: 'Répulsif',
    gradient: 'linear-gradient(135deg, #A5D6A7 0%, #81C784 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'HE menthe poivrée', quantite: '10 gouttes', emoji: '🌿' },
      { nom: 'Cotons', quantite: 'Plusieurs', emoji: '⚪' }
    ],
    materiel: ['Aucun'],
    instructions: [
      'Imbibez les cotons de 5-10 gouttes de menthe poivrée',
      'Placez-les aux endroits stratégiques',
      'Entrées, placards, sous l\'évier, garage',
      'Renouvelez toutes les 2 semaines'
    ],
    surfaces: ['Placards', 'Entrées', 'Garage'],
    precautions: ['Tenir éloigné des animaux (toxique pour les chats)', 'Ne pas mettre en contact avec la nourriture'],
    astuces: ['L\'odeur puissante repousse souris et araignées', 'Fonctionne aussi contre les fourmis', 'Renouvelez régulièrement pour maintenir l\'efficacité'],
    conservation: 'Renouveler toutes les 2 semaines'
  },
  {
    id: 75,
    nom: 'Nettoyant Sol Pin',
    emoji: '🌲',
    categorie: 'Sol',
    badge: 'Forêt',
    gradient: 'linear-gradient(135deg, #A5D6A7 0%, #66BB6A 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau chaude', quantite: '5L', emoji: '💧' },
      { nom: 'Savon noir', quantite: '3 c.à.s', emoji: '⚫' },
      { nom: 'HE pin sylvestre', quantite: '15 gouttes', emoji: '🌲' }
    ],
    materiel: ['Seau', 'Serpillière'],
    instructions: [
      'Remplissez le seau d\'eau chaude',
      'Ajoutez le savon noir et mélangez',
      'Incorporez l\'huile essentielle de pin',
      'Lavez les sols comme d\'habitude',
      'Pas besoin de rincer'
    ],
    surfaces: ['Carrelage', 'Lino', 'Sols durs'],
    precautions: ['Ne pas utiliser sur parquet ciré', 'Éviter le surdosage d\'HE'],
    astuces: ['Le pin sylvestre assainit et parfume', 'Propriétés antiseptiques reconnues', 'Laisse une odeur de forêt fraîche'],
    conservation: 'À préparer à chaque usage'
  },
  {
    id: 76,
    nom: 'Spray Purifiant Hiver',
    emoji: '🌡️',
    categorie: 'Multi-usage',
    badge: 'Antiviral',
    gradient: 'linear-gradient(135deg, #B2DFDB 0%, #80CBC4 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau', quantite: '200ml', emoji: '💧' },
      { nom: 'Alcool ménager', quantite: '50ml', emoji: '🔬' },
      { nom: 'HE ravintsara', quantite: '25 gouttes', emoji: '🌿' }
    ],
    materiel: ['Flacon spray'],
    instructions: [
      'Mélangez l\'eau et l\'alcool dans le flacon',
      'Ajoutez l\'huile essentielle de ravintsara',
      'Secouez bien avant usage',
      'Vaporisez dans les pièces de vie',
      'Idéal quand quelqu\'un est malade'
    ],
    surfaces: ['Air ambiant', 'Chambres', 'Salon'],
    precautions: ['Éviter chez les femmes enceintes et enfants -3 ans', 'Ne pas vaporiser sur les personnes'],
    astuces: ['Le ravintsara est l\'HE antivirale par excellence', 'Booste l\'immunité', 'Idéal en période de grippe ou rhume'],
    conservation: '6 mois'
  },
  {
    id: 77,
    nom: 'Anti-Moustiques Citronnelle',
    emoji: '🦟',
    categorie: 'Entretien',
    badge: 'Répulsif',
    gradient: 'linear-gradient(135deg, #FFF59D 0%, #FFF176 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau', quantite: '100ml', emoji: '💧' },
      { nom: 'Alcool ménager', quantite: '50ml', emoji: '🔬' },
      { nom: 'HE citronnelle', quantite: '40 gouttes', emoji: '🍋' }
    ],
    materiel: ['Flacon spray'],
    instructions: [
      'Mélangez tous les ingrédients',
      'Versez dans un flacon spray',
      'Vaporisez autour des fenêtres et portes',
      'Appliquez sur les rideaux',
      'Renouvelez régulièrement'
    ],
    surfaces: ['Fenêtres', 'Rideaux', 'Terrasse'],
    precautions: ['Ne pas appliquer pur sur la peau', 'Éviter les yeux', 'Renouveler après la pluie en extérieur'],
    astuces: ['La citronnelle repousse les moustiques naturellement', 'Fonctionne aussi en diffusion', 'Combinez avec la lavande pour plus d\'efficacité'],
    conservation: '3 mois'
  },
  // === NETTOYEUR VAPEUR ===
  {
    id: 78,
    nom: 'Nettoyage Matelas Vapeur',
    emoji: '🛏️',
    categorie: 'Multi-usage',
    badge: 'Anti-acariens',
    gradient: 'linear-gradient(135deg, #B3E5FC 0%, #81D4FA 100%)',
    temps: '30min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau (pour le nettoyeur)', quantite: 'Selon appareil', emoji: '💧' }
    ],
    materiel: ['Nettoyeur vapeur'],
    instructions: [
      'Aspirez le matelas au préalable',
      'Passez le nettoyeur vapeur lentement sur toute la surface',
      'Insistez sur les zones tachées',
      'La vapeur (+60°C) tue les acariens',
      'Laissez bien sécher avant de refaire le lit',
      'Idéalement, laissez les fenêtres ouvertes'
    ],
    surfaces: ['Matelas', 'Oreillers', 'Canapé'],
    precautions: ['Laisser sécher complètement', 'Ne pas utiliser sur matelas à mémoire de forme sensibles'],
    astuces: ['Élimine 99% des acariens', 'Idéal pour les allergiques', 'À faire 2 fois par an minimum'],
    conservation: 'Méthode sans produit'
  },
  {
    id: 79,
    nom: 'Défroissage Vapeur',
    emoji: '👔',
    categorie: 'Linge',
    badge: 'Sans fer',
    gradient: 'linear-gradient(135deg, #E1BEE7 0%, #CE93D8 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau (pour le nettoyeur)', quantite: 'Selon appareil', emoji: '💧' }
    ],
    materiel: ['Nettoyeur vapeur avec buse adaptée'],
    instructions: [
      'Suspendez le vêtement ou le rideau',
      'Passez la vapeur à quelques centimètres du tissu',
      'Procédez de haut en bas',
      'La vapeur détend les fibres et élimine les plis',
      'Plus doux qu\'un fer à repasser'
    ],
    surfaces: ['Vêtements', 'Rideaux', 'Nappes'],
    precautions: ['Tester sur zone cachée pour tissus délicats', 'Attention aux brûlures'],
    astuces: ['Idéal pour les tissus délicats', 'Pas besoin de table à repasser', 'Rafraîchit et désodorise en même temps'],
    conservation: 'Méthode sans produit'
  },
  // === EAU BOUILLANTE ===
  {
    id: 80,
    nom: 'Désherbage Eau Bouillante',
    emoji: '🌿',
    categorie: 'Entretien',
    badge: 'Écologique',
    gradient: 'linear-gradient(135deg, #FFCC80 0%, #FFB74D 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau bouillante', quantite: 'Selon surface', emoji: '💧' }
    ],
    materiel: ['Bouilloire ou casserole'],
    instructions: [
      'Faites bouillir de l\'eau',
      'Versez directement sur les mauvaises herbes',
      'Ciblez la base de la plante',
      'L\'eau bouillante détruit les cellules',
      'Effet visible en quelques heures'
    ],
    surfaces: ['Mauvaises herbes', 'Allées', 'Joints de terrasse'],
    precautions: ['Attention aux projections', 'Éviter les plantes désirées à proximité', 'Ne pas utiliser sur pelouse'],
    astuces: ['Méthode 100% naturelle et gratuite', 'Très efficace sur jeunes pousses', 'L\'eau de cuisson des pâtes est parfaite'],
    conservation: 'À utiliser immédiatement'
  },
  // === EAU OXYGÉNÉE ===
  {
    id: 81,
    nom: 'Détachant Sang Textile',
    emoji: '🩸',
    categorie: 'Linge',
    badge: 'SOS taches',
    gradient: 'linear-gradient(135deg, #F8BBD9 0%, #F48FB1 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau oxygénée 10 vol', quantite: 'Selon tache', emoji: '💧' }
    ],
    materiel: ['Chiffon propre'],
    instructions: [
      'Rincez d\'abord à l\'eau FROIDE',
      'Versez l\'eau oxygénée sur la tache',
      'Laissez agir et mousser (c\'est normal)',
      'Tamponnez avec un chiffon propre',
      'Rincez à l\'eau froide',
      'Lavez normalement en machine'
    ],
    surfaces: ['Vêtements blancs', 'Draps', 'Textile clair'],
    precautions: ['Uniquement sur textiles blancs ou très clairs', 'Tester sur zone cachée', 'JAMAIS d\'eau chaude sur le sang'],
    astuces: ['L\'eau oxygénée décompose l\'hémoglobine', 'Très efficace sur taches fraîches', 'Alternative : savon au fiel de bœuf'],
    conservation: '6 mois après ouverture'
  },
  // === PIERRE BLANCHE - RECETTES SPÉCIFIQUES ===
  {
    id: 82,
    nom: 'Vitrocéramique Pierre Blanche',
    emoji: '🔥',
    categorie: 'Cuisine',
    badge: 'Sans rayure',
    gradient: 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Pierre blanche', quantite: '1 noisette', emoji: '⚪' }
    ],
    materiel: ['Chiffon microfibre', 'Éponge douce'],
    instructions: [
      'Attendez que la plaque soit froide',
      'Prélevez une noisette de pierre blanche',
      'Étalez sur la surface avec l\'éponge humide',
      'Frottez délicatement en mouvements circulaires',
      'Laissez sécher quelques minutes',
      'Lustrez avec un chiffon microfibre sec'
    ],
    surfaces: ['Plaques vitrocéramique', 'Plaques induction'],
    precautions: ['Ne jamais utiliser sur plaque chaude', 'Ne pas frotter trop fort', 'Éviter les éponges abrasives'],
    astuces: ['La pierre blanche ne raye pas le verre', 'Élimine les traces de brûlé', 'Fait briller comme au premier jour'],
    conservation: 'Plusieurs années'
  },
  {
    id: 83,
    nom: 'Semelle Fer à Repasser',
    emoji: '👔',
    categorie: 'Entretien',
    badge: 'Rénovation',
    gradient: 'linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Pierre blanche', quantite: '1 noisette', emoji: '⚪' }
    ],
    materiel: ['Chiffon doux'],
    instructions: [
      'Débranchez le fer et laissez-le tiédir (pas froid)',
      'Appliquez la pierre blanche sur la semelle',
      'Frottez délicatement sur toute la surface',
      'Insistez sur les zones encrassées',
      'Essuyez avec un chiffon humide',
      'Lustrez avec un chiffon sec'
    ],
    surfaces: ['Fer à repasser', 'Centrale vapeur'],
    precautions: ['Fer tiède, pas brûlant ni froid', 'Ne pas obstruer les trous vapeur', 'Bien essuyer avant réutilisation'],
    astuces: ['Élimine les dépôts de calcaire et de tissu brûlé', 'Redonne la glisse à la semelle', 'À faire régulièrement'],
    conservation: 'Plusieurs années'
  },
  {
    id: 84,
    nom: 'Chaussures Blanches Cuir',
    emoji: '👟',
    categorie: 'Multi-usage',
    badge: 'Blancheur',
    gradient: 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Pierre blanche', quantite: '1 noisette', emoji: '⚪' }
    ],
    materiel: ['Chiffon doux', 'Brosse douce'],
    instructions: [
      'Dépoussiérez les chaussures avec la brosse',
      'Prélevez une noisette de pierre blanche',
      'Appliquez sur le cuir blanc avec le chiffon',
      'Frottez délicatement en mouvements circulaires',
      'Laissez sécher',
      'Lustrez avec un chiffon propre'
    ],
    surfaces: ['Chaussures cuir blanc', 'Baskets blanches', 'Sacs blancs'],
    precautions: ['Tester sur zone cachée', 'Ne pas détremper le cuir', 'Éviter les coutures colorées'],
    astuces: ['Redonne l\'éclat du blanc', 'N\'altère pas le cuir', 'Idéal pour les sneakers blanches'],
    conservation: 'Plusieurs années'
  },
  {
    id: 85,
    nom: 'Baignoire & Lavabo Pierre Blanche',
    emoji: '🛁',
    categorie: 'Salle de bain',
    badge: 'Éclat',
    gradient: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Pierre blanche', quantite: '2 noisettes', emoji: '⚪' }
    ],
    materiel: ['Éponge', 'Chiffon microfibre'],
    instructions: [
      'Mouillez légèrement la surface',
      'Prélevez de la pierre blanche avec l\'éponge humide',
      'Frottez la baignoire ou le lavabo',
      'Insistez sur les traces de calcaire',
      'Rincez abondamment',
      'Séchez avec le chiffon microfibre'
    ],
    surfaces: ['Baignoire', 'Lavabo', 'Évier céramique', 'Douche'],
    precautions: ['Ne raye pas l\'émail ni l\'acrylique', 'Bien rincer', 'Éviter sur surfaces peintes'],
    astuces: ['Élimine calcaire et savon', 'Fait briller sans rayer', 'Alternative douce aux produits chimiques'],
    conservation: 'Plusieurs années'
  },
  {
    id: 86,
    nom: 'Joints Carrelage Pierre Blanche',
    emoji: '⬜',
    categorie: 'Salle de bain',
    badge: 'Blancheur',
    gradient: 'linear-gradient(135deg, #EEEEEE 0%, #E0E0E0 100%)',
    temps: '20min',
    difficulte: 'Moyen',
    efficacite: 4,
    ingredients: [
      { nom: 'Pierre blanche', quantite: '2 noisettes', emoji: '⚪' }
    ],
    materiel: ['Brosse à dents', 'Chiffon'],
    instructions: [
      'Mouillez les joints',
      'Appliquez la pierre blanche sur la brosse à dents',
      'Frottez les joints en longueur',
      'Insistez sur les zones noircies',
      'Laissez agir 5 minutes',
      'Rincez et essuyez'
    ],
    surfaces: ['Joints carrelage', 'Joints salle de bain', 'Joints cuisine'],
    precautions: ['Frotter dans le sens du joint', 'Ne pas utiliser sur joints colorés', 'Rincer abondamment'],
    astuces: ['Redonne la blancheur aux joints ternis', 'Action mécanique douce', 'Compléter avec anti-moisissures si besoin'],
    conservation: 'Plusieurs années'
  },
  {
    id: 87,
    nom: 'Plastiques Jaunis',
    emoji: '🔌',
    categorie: 'Entretien',
    badge: 'Rénovation',
    gradient: 'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Pierre blanche', quantite: '1 noisette', emoji: '⚪' }
    ],
    materiel: ['Éponge douce', 'Chiffon microfibre'],
    instructions: [
      'Nettoyez d\'abord la surface à l\'eau savonneuse',
      'Appliquez la pierre blanche avec l\'éponge humide',
      'Frottez délicatement les zones jaunies',
      'Laissez agir quelques minutes',
      'Rincez à l\'eau claire',
      'Séchez avec le chiffon'
    ],
    surfaces: ['Interrupteurs', 'Prises électriques', 'Électroménager blanc', 'Plastiques'],
    precautions: ['Débrancher les appareils électriques', 'Ne pas mouiller les parties électriques', 'Tester sur zone cachée'],
    astuces: ['Atténue le jaunissement du plastique', 'Pour jaunissement intense, préférer l\'eau oxygénée + soleil', 'Entretien régulier = meilleur résultat'],
    conservation: 'Plusieurs années'
  },
  // === VAPEUR - RECETTES SPÉCIFIQUES ===
  {
    id: 88,
    nom: 'Four Vapeur Sans Produit',
    emoji: '🔥',
    categorie: 'Cuisine',
    badge: 'Zéro produit',
    gradient: 'linear-gradient(135deg, #FFCCBC 0%, #FFAB91 100%)',
    temps: '45min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau (pour le nettoyeur)', quantite: 'Selon appareil', emoji: '💧' }
    ],
    materiel: ['Nettoyeur vapeur', 'Chiffon microfibre'],
    instructions: [
      'Préchauffez légèrement le four (tiède)',
      'Passez le nettoyeur vapeur sur les parois',
      'La vapeur ramollit les graisses cuites',
      'Insistez sur les zones encrassées',
      'Essuyez avec le chiffon microfibre',
      'Répétez si nécessaire sur les zones tenaces'
    ],
    surfaces: ['Four', 'Parois four', 'Grilles four'],
    precautions: ['Four tiède, pas brûlant', 'Attention aux brûlures vapeur', 'Bien aérer'],
    astuces: ['Aucun produit chimique nécessaire', 'La chaleur + vapeur = dégraissage naturel', 'Idéal pour entretien régulier'],
    conservation: 'Méthode sans produit'
  },
  {
    id: 89,
    nom: 'Joints Carrelage Vapeur',
    emoji: '⬜',
    categorie: 'Salle de bain',
    badge: 'Désinfectant',
    gradient: 'linear-gradient(135deg, #B3E5FC 0%, #81D4FA 100%)',
    temps: '20min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau (pour le nettoyeur)', quantite: 'Selon appareil', emoji: '💧' }
    ],
    materiel: ['Nettoyeur vapeur avec buse fine', 'Brosse (optionnel)'],
    instructions: [
      'Utilisez la buse fine du nettoyeur vapeur',
      'Passez lentement sur les joints',
      'La vapeur haute température tue moisissures et bactéries',
      'Brossez les joints pendant le passage vapeur',
      'Essuyez l\'excédent d\'eau',
      'Laissez sécher, aérez la pièce'
    ],
    surfaces: ['Joints carrelage', 'Joints salle de bain', 'Joints douche'],
    precautions: ['Ne pas rester trop longtemps au même endroit', 'Attention aux projections chaudes', 'Laisser sécher pour éviter moisissures'],
    astuces: ['Tue 99% des germes sans produit', 'Idéal contre moisissures naissantes', 'Combiner avec traitement anti-moisissures si tenace'],
    conservation: 'Méthode sans produit'
  },
  {
    id: 90,
    nom: 'Décoller Papier Peint',
    emoji: '🏠',
    categorie: 'Entretien',
    badge: 'Rénovation',
    gradient: 'linear-gradient(135deg, #D7CCC8 0%, #BCAAA4 100%)',
    temps: '30min/m²',
    difficulte: 'Moyen',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau (pour le nettoyeur)', quantite: 'Selon appareil', emoji: '💧' }
    ],
    materiel: ['Nettoyeur vapeur', 'Spatule large', 'Bâche de protection'],
    instructions: [
      'Protégez le sol avec une bâche',
      'Passez la vapeur sur une zone du papier peint',
      'Maintenez quelques secondes pour bien humidifier',
      'La vapeur pénètre et ramollit la colle',
      'Décollez immédiatement avec la spatule',
      'Procédez zone par zone'
    ],
    surfaces: ['Murs', 'Papier peint'],
    precautions: ['Protéger les prises électriques', 'Attention aux murs en plâtre fragiles', 'Travailler par petites zones'],
    astuces: ['Beaucoup plus rapide que la décolleuse traditionnelle', 'Pas besoin de produit décolleur', 'Fonctionne sur tous types de papiers peints'],
    conservation: 'Méthode sans produit'
  },
  {
    id: 91,
    nom: 'Vitres Vapeur Sans Traces',
    emoji: '🪟',
    categorie: 'Multi-usage',
    badge: 'Zéro trace',
    gradient: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau (pour le nettoyeur)', quantite: 'Selon appareil', emoji: '💧' }
    ],
    materiel: ['Nettoyeur vapeur avec raclette', 'Chiffon microfibre'],
    instructions: [
      'Utilisez l\'embout raclette du nettoyeur vapeur',
      'Passez la vapeur sur la vitre de haut en bas',
      'La raclette évacue l\'eau immédiatement',
      'Essuyez les bords avec le chiffon microfibre',
      'Aucun produit nécessaire',
      'Résultat sans traces garanti'
    ],
    surfaces: ['Vitres', 'Miroirs', 'Parois de douche', 'Baies vitrées'],
    precautions: ['Ne pas utiliser sur vitres fissurées (choc thermique)', 'Éviter par temps très froid', 'Bien essuyer les bords'],
    astuces: ['La vapeur dissout les graisses et saletés', 'Aucun produit = aucune trace', 'Plus rapide que le nettoyage classique'],
    conservation: 'Méthode sans produit'
  },
  {
    id: 92,
    nom: 'Jouets Enfants Vapeur',
    emoji: '🧸',
    categorie: 'Entretien',
    badge: 'Hygiène bébé',
    gradient: 'linear-gradient(135deg, #F8BBD9 0%, #F48FB1 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau (pour le nettoyeur)', quantite: 'Selon appareil', emoji: '💧' }
    ],
    materiel: ['Nettoyeur vapeur avec petite buse', 'Chiffon propre'],
    instructions: [
      'Sélectionnez les jouets résistants à la chaleur',
      'Passez la vapeur sur toutes les surfaces',
      'Insistez sur les zones de préhension',
      'La vapeur désinfecte sans produit chimique',
      'Essuyez immédiatement',
      'Laissez sécher complètement avant usage'
    ],
    surfaces: ['Jouets plastique', 'Jouets bois verni', 'Hochets', 'Jouets de bain'],
    precautions: ['Pas sur jouets électroniques', 'Pas sur peluches (lavage machine)', 'Vérifier résistance à la chaleur', 'Laisser refroidir avant de donner à l\'enfant'],
    astuces: ['Élimine 99,9% des bactéries', 'Aucun résidu chimique', 'Idéal pour bébés qui mettent tout à la bouche'],
    conservation: 'Méthode sans produit'
  },
  {
    id: 93,
    nom: 'Anti-Punaises de Lit Vapeur',
    emoji: '🛏️',
    categorie: 'Entretien',
    badge: 'Anti-nuisibles',
    gradient: 'linear-gradient(135deg, #FFCDD2 0%, #EF9A9A 100%)',
    temps: '1h+',
    difficulte: 'Avancé',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau (pour le nettoyeur)', quantite: 'Selon appareil', emoji: '💧' }
    ],
    materiel: ['Nettoyeur vapeur puissant (+100°C)', 'Aspirateur'],
    instructions: [
      'Aspirez d\'abord matelas, sommier et alentours',
      'Réglez le nettoyeur sur température maximale',
      'Passez lentement sur toutes les coutures du matelas',
      'Traitez le sommier, les lattes, la tête de lit',
      'Insistez sur les recoins et coutures',
      'Passez également les plinthes et prises proches',
      'Répétez le traitement après 10 jours'
    ],
    surfaces: ['Matelas', 'Sommier', 'Tête de lit', 'Plinthes chambre'],
    precautions: ['La vapeur doit dépasser 60°C pour tuer les punaises', 'Passer lentement (3-4 sec/zone)', 'Traitement à répéter', 'Consulter un professionnel si infestation importante'],
    astuces: ['La chaleur tue punaises et œufs instantanément', 'Méthode 100% naturelle', 'Combiner avec housse anti-punaises'],
    conservation: 'Méthode sans produit'
  },
  {
    id: 94,
    nom: 'Canapé Tissu Vapeur',
    emoji: '🛋️',
    categorie: 'Multi-usage',
    badge: 'Rafraîchissant',
    gradient: 'linear-gradient(135deg, #D1C4E9 0%, #B39DDB 100%)',
    temps: '30min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau (pour le nettoyeur)', quantite: 'Selon appareil', emoji: '💧' }
    ],
    materiel: ['Nettoyeur vapeur avec embout tissu', 'Chiffon microfibre'],
    instructions: [
      'Aspirez le canapé au préalable',
      'Testez sur une zone cachée',
      'Passez la vapeur sur le tissu en mouvements réguliers',
      'N\'insistez pas trop au même endroit',
      'Essuyez l\'humidité excédentaire',
      'Laissez sécher fenêtres ouvertes'
    ],
    surfaces: ['Canapé tissu', 'Fauteuils', 'Chaises rembourrées', 'Poufs'],
    precautions: ['Tester d\'abord sur zone cachée', 'Ne pas détremper', 'Certains tissus délicats à éviter', 'Bien laisser sécher'],
    astuces: ['Élimine odeurs et acariens', 'Rafraîchit les couleurs', 'Désinfecte en profondeur'],
    conservation: 'Méthode sans produit'
  },
  {
    id: 95,
    nom: 'Poubelles Vapeur',
    emoji: '🗑️',
    categorie: 'Entretien',
    badge: 'Désodorisant',
    gradient: 'linear-gradient(135deg, #C8E6C9 0%, #A5D6A7 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau (pour le nettoyeur)', quantite: 'Selon appareil', emoji: '💧' }
    ],
    materiel: ['Nettoyeur vapeur'],
    instructions: [
      'Videz complètement la poubelle',
      'Sortez-la à l\'extérieur ou dans la douche',
      'Passez la vapeur sur toutes les parois intérieures',
      'Insistez sur le fond et les recoins',
      'La vapeur tue les bactéries responsables des odeurs',
      'Laissez sécher complètement avant utilisation'
    ],
    surfaces: ['Poubelles cuisine', 'Poubelles salle de bain', 'Bacs de tri'],
    precautions: ['Bien laisser sécher', 'Ne pas refermer le couvercle tant qu\'humide'],
    astuces: ['Élimine 100% des odeurs', 'Tue les bactéries sans produit', 'À faire 1x/mois'],
    conservation: 'Méthode sans produit'
  },
  {
    id: 96,
    nom: 'WC Vapeur Désinfection',
    emoji: '🚽',
    categorie: 'Salle de bain',
    badge: 'Hygiène totale',
    gradient: 'linear-gradient(135deg, #B2EBF2 0%, #80DEEA 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau (pour le nettoyeur)', quantite: 'Selon appareil', emoji: '💧' }
    ],
    materiel: ['Nettoyeur vapeur avec différentes buses'],
    instructions: [
      'Commencez par la cuvette intérieure',
      'Passez sous les rebords avec la buse fine',
      'Nettoyez l\'abattant dessus et dessous',
      'Traitez le réservoir et la chasse d\'eau',
      'Passez la vapeur sur le sol autour des WC',
      'Essuyez les surfaces avec un chiffon'
    ],
    surfaces: ['WC', 'Cuvette', 'Abattant', 'Sol WC'],
    precautions: ['Attention aux projections d\'eau chaude', 'Bien aérer après'],
    astuces: ['Désinfection totale sans produit chimique', 'Élimine calcaire léger', 'La vapeur atteint les zones inaccessibles'],
    conservation: 'Méthode sans produit'
  },
  {
    id: 97,
    nom: 'Tapis & Moquette Vapeur',
    emoji: '🧶',
    categorie: 'Multi-usage',
    badge: 'Anti-acariens',
    gradient: 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)',
    temps: '30min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau (pour le nettoyeur)', quantite: 'Selon appareil', emoji: '💧' }
    ],
    materiel: ['Nettoyeur vapeur avec embout sol/moquette'],
    instructions: [
      'Aspirez soigneusement le tapis ou la moquette',
      'Passez le nettoyeur vapeur lentement',
      'Procédez par bandes parallèles',
      'N\'insistez pas trop au même endroit',
      'La vapeur tue acariens et bactéries',
      'Laissez sécher complètement (ouvrez les fenêtres)'
    ],
    surfaces: ['Tapis', 'Moquette', 'Descentes de lit'],
    precautions: ['Tester sur zone cachée', 'Ne pas détremper', 'Certaines fibres délicates à éviter', 'Bien laisser sécher'],
    astuces: ['Élimine 90% des acariens', 'Ravive les couleurs', 'Idéal pour les allergiques'],
    conservation: 'Méthode sans produit'
  },
  // === EAU CHAUDE/BOUILLANTE - RECETTES SPÉCIFIQUES ===
  {
    id: 98,
    nom: 'Détachant Graisse Eau Chaude',
    emoji: '👕',
    categorie: 'Linge',
    badge: 'SOS taches',
    gradient: 'linear-gradient(135deg, #FFECB3 0%, #FFE082 100%)',
    temps: '30min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau très chaude', quantite: '1L', emoji: '💧' },
      { nom: 'Liquide vaisselle', quantite: '1 c.à.s', emoji: '🫧' }
    ],
    materiel: ['Bassine', 'Brosse douce'],
    instructions: [
      'Agissez le plus vite possible sur la tache fraîche',
      'Faites chauffer l\'eau (pas bouillante pour les textiles)',
      'Ajoutez le liquide vaisselle dégraissant',
      'Immergez la partie tachée',
      'Frottez délicatement avec la brosse',
      'Laissez tremper 30 minutes',
      'Lavez normalement en machine'
    ],
    surfaces: ['Vêtements', 'Nappes', 'Torchons', 'Textiles'],
    precautions: ['Vérifier l\'étiquette du textile', 'Pas d\'eau bouillante sur tissus délicats', 'Traiter rapidement pour meilleur résultat'],
    astuces: ['La chaleur liquéfie les graisses', 'Le liquide vaisselle est un excellent dégraissant', 'Plus la tache est fraîche, plus c\'est efficace'],
    conservation: 'À préparer à chaque usage'
  },
  {
    id: 99,
    nom: 'Planches à Découper Eau Bouillante',
    emoji: '🪵',
    categorie: 'Cuisine',
    badge: 'Désinfectant',
    gradient: 'linear-gradient(135deg, #D7CCC8 0%, #BCAAA4 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau bouillante', quantite: '1L', emoji: '💧' },
      { nom: 'Gros sel', quantite: '2 c.à.s', emoji: '🧂' },
      { nom: 'Citron', quantite: '1/2', emoji: '🍋' }
    ],
    materiel: ['Bouilloire'],
    instructions: [
      'Saupoudrez le gros sel sur la planche',
      'Frottez avec le demi-citron (côté chair)',
      'Le sel agit comme abrasif doux, le citron désodorise',
      'Versez l\'eau bouillante sur toute la surface',
      'Laissez agir 2-3 minutes',
      'Rincez et laissez sécher à la verticale'
    ],
    surfaces: ['Planches à découper bois', 'Planches à découper plastique'],
    precautions: ['Attention aux éclaboussures d\'eau bouillante', 'Ne pas laisser tremper les planches en bois', 'Sécher à la verticale'],
    astuces: ['L\'eau bouillante tue les bactéries', 'Le citron neutralise les odeurs (poisson, oignon)', 'Le sel nettoie les fibres du bois'],
    conservation: 'À faire après chaque usage viande/poisson'
  },
  {
    id: 100,
    nom: 'Débouchage Express Eau Bouillante',
    emoji: '🚿',
    categorie: 'Entretien',
    badge: 'SOS',
    gradient: 'linear-gradient(135deg, #B3E5FC 0%, #81D4FA 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau bouillante', quantite: '2L', emoji: '💧' },
      { nom: 'Liquide vaisselle', quantite: '2 c.à.s', emoji: '🫧' }
    ],
    materiel: ['Grande casserole ou bouilloire'],
    instructions: [
      'Faites bouillir 2 litres d\'eau',
      'Versez le liquide vaisselle dans la canalisation',
      'Attendez 5 minutes',
      'Versez l\'eau bouillante en une seule fois',
      'L\'eau chaude dissout les graisses, le savon les émulsionne',
      'Répétez si nécessaire'
    ],
    surfaces: ['Évier', 'Lavabo', 'Douche', 'Baignoire'],
    precautions: ['Ne pas utiliser sur canalisations PVC fragiles', 'Attention aux éclaboussures', 'Pour bouchons légers uniquement'],
    astuces: ['Méthode préventive hebdomadaire idéale', 'Pour bouchons importants, ajouter bicarbonate + vinaigre avant', 'L\'eau bouillante seule fonctionne sur bouchons de graisse'],
    conservation: 'À préparer à chaque usage'
  },
  // === LOT v1.1 — 30 nouvelles recettes (validées + couverture des surfaces) ===
  {
    id: 101,
    nom: 'Détartrant WC Moussant',
    emoji: '🚽',
    categorie: 'Salle de bain',
    badge: 'Effervescent',
    gradient: 'linear-gradient(135deg, #81D4FA 0%, #4FC3F7 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '100g', emoji: '⚪' },
      { nom: 'Acide citrique', quantite: '50g', emoji: '🍋' },
      { nom: 'HE tea tree', quantite: '15 gouttes', emoji: '🌿' }
    ],
    materiel: ['Bol sec', 'Brosse WC'],
    instructions: [
      'Mélangez le bicarbonate et l\'acide citrique dans un bol bien sec',
      'Ajoutez l\'huile essentielle goutte à goutte',
      'Versez le mélange directement dans la cuvette',
      'Laissez mousser et agir 30 minutes (ou toute la nuit)',
      'Frottez avec la brosse puis tirez la chasse'
    ],
    surfaces: ['WC', 'Cuvette', 'Fond de cuvette'],
    precautions: ['Ne jamais mélanger avec de l\'eau de javel', 'Garder le mélange au sec avant usage', 'Tenir hors de portée des enfants'],
    astuces: ['Préparez le mélange sec à l\'avance en pot hermétique', 'L\'effervescence décolle le tartre sans frotter', 'Action de nuit = résultat optimal'],
    conservation: 'Mélange sec : 6 mois en pot hermétique'
  },
  {
    id: 102,
    nom: 'Spray Anti-moisissures Naturel',
    emoji: '🍃',
    categorie: 'Salle de bain',
    badge: 'Anti-moisissures',
    gradient: 'linear-gradient(135deg, #A5D6A7 0%, #66BB6A 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau', quantite: '200ml', emoji: '💧' },
      { nom: 'Vinaigre blanc', quantite: '200ml', emoji: '🧴' },
      { nom: 'Bicarbonate de soude', quantite: '2 c.à.c', emoji: '⚪' },
      { nom: 'HE arbre à thé', quantite: '20 gouttes', emoji: '🌿' }
    ],
    materiel: ['Flacon spray 500ml', 'Brosse à dents usagée'],
    instructions: [
      'Versez le vinaigre dans le flacon spray',
      'Ajoutez l\'eau puis le bicarbonate (attention à la mousse)',
      'Incorporez l\'huile essentielle et secouez',
      'Vaporisez généreusement sur les moisissures',
      'Laissez agir 1 heure, frottez les joints puis rincez'
    ],
    surfaces: ['Joints', 'Joints de carrelage', 'Parois de douche', 'Rideau de douche', 'Murs humides'],
    precautions: ['Aérer la pièce pendant l\'action', 'Tester sur une zone discrète', 'Porter des gants sur grandes surfaces'],
    astuces: ['Le tea tree est un antifongique naturel puissant', 'Ventilez la salle de bain après chaque douche en prévention', 'Renouvelez 1x/semaine sur joints récidivants'],
    conservation: '1 mois à l\'abri de la lumière'
  },
  {
    id: 103,
    nom: 'Nettoyant Parquet Bois Naturel',
    emoji: '🟫',
    categorie: 'Sol',
    badge: 'Spécial bois',
    gradient: 'linear-gradient(135deg, #D7CCC8 0%, #A1887F 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau tiède', quantite: '1L', emoji: '💧' },
      { nom: 'Savon noir liquide', quantite: '2 c.à.s', emoji: '⚫' },
      { nom: 'Vinaigre blanc', quantite: '1 c.à.s', emoji: '🧴' },
      { nom: 'HE citron (optionnel)', quantite: '5 gouttes', emoji: '🍋' }
    ],
    materiel: ['Seau', 'Serpillière microfibre'],
    instructions: [
      'Remplissez un seau d\'eau tiède',
      'Ajoutez le savon noir et mélangez',
      'Incorporez le vinaigre et l\'huile essentielle',
      'Trempez la serpillière et essorez-la à fond',
      'Passez en suivant le fil du bois, sans jamais détremper'
    ],
    surfaces: ['Parquet', 'Parquet vitrifié', 'Parquet stratifié', 'Meubles en bois'],
    precautions: ['Ne jamais détremper le bois', 'Serpillière bien essorée (presque sèche)', 'Éviter sur parquet huilé non protégé'],
    astuces: ['Le savon noir nourrit et fait briller', 'Séchez avec un chiffon sec pour zéro trace', 'Une noisette d\'huile de lin 2x/an pour nourrir'],
    conservation: 'Usage immédiat (préparer à chaque lavage)'
  },
  {
    id: 104,
    nom: 'Désodorisant Textile & Canapé',
    emoji: '🛋️',
    categorie: 'Multi-usage',
    badge: 'Anti-odeurs',
    gradient: 'linear-gradient(135deg, #CE93D8 0%, #BA68C8 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau', quantite: '400ml', emoji: '💧' },
      { nom: 'Alcool ménager', quantite: '50ml', emoji: '🔬' },
      { nom: 'Bicarbonate de soude', quantite: '1 c.à.c', emoji: '⚪' },
      { nom: 'HE lavande', quantite: '15 gouttes', emoji: '💜' }
    ],
    materiel: ['Flacon spray 500ml'],
    instructions: [
      'Versez l\'eau dans le flacon spray',
      'Ajoutez l\'alcool ménager (fixe et élimine les odeurs)',
      'Incorporez le bicarbonate, secouez pour dissoudre',
      'Ajoutez l\'huile essentielle de lavande',
      'Vaporisez à 30 cm des textiles, laissez sécher à l\'air'
    ],
    surfaces: ['Canapé', 'Canapé tissu', 'Rideaux', 'Matelas', 'Tapis', 'Coussins'],
    precautions: ['Tester sur une zone cachée', 'Éviter la soie et le cuir', 'Ne pas détremper, vaporiser en brume légère'],
    astuces: ['L\'alcool s\'évapore vite et n\'auréole pas', 'Idéal après réception ou pour textiles non lavables', 'Parfumez selon l\'envie (eucalyptus, citron…)'],
    conservation: '2 mois'
  },
  {
    id: 105,
    nom: 'Crème à Récurer Douce',
    emoji: '🧽',
    categorie: 'Cuisine',
    badge: 'Multi-surfaces',
    gradient: 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '100g', emoji: '⚪' },
      { nom: 'Savon de Marseille râpé', quantite: '50g', emoji: '🧼' },
      { nom: 'Eau chaude', quantite: '100ml', emoji: '💧' },
      { nom: 'HE citron', quantite: '10 gouttes', emoji: '🍋' }
    ],
    materiel: ['Pot hermétique', 'Éponge'],
    instructions: [
      'Faites fondre le savon râpé dans l\'eau chaude',
      'Laissez tiédir puis ajoutez le bicarbonate progressivement',
      'Mélangez jusqu\'à obtenir une pâte crémeuse homogène',
      'Incorporez l\'huile essentielle de citron',
      'Conservez dans un pot hermétique, appliquez à l\'éponge humide'
    ],
    surfaces: ['Évier', 'Baignoire', 'Plaques vitrocéramique', 'Casseroles', 'Inox', 'Lavabo'],
    precautions: ['Rincer abondamment après usage', 'Tester sur surfaces fragiles', 'Ne pas utiliser sur marbre'],
    astuces: ['Ajustez l\'eau pour une texture crème', 'Abrasif doux qui ne raye pas l\'inox', 'Redoutable sur les traces d\'eau et le calcaire léger'],
    conservation: '3 mois en pot fermé'
  },
  {
    id: 106,
    nom: 'Blanchisseur Torchons & Linge de Cuisine',
    emoji: '🧻',
    categorie: 'Linge',
    badge: 'Blanchit',
    gradient: 'linear-gradient(135deg, #E1F5FE 0%, #B3E5FC 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau très chaude', quantite: '3L', emoji: '💧' },
      { nom: 'Percarbonate de soude', quantite: '3 c.à.s', emoji: '✨' },
      { nom: 'Cristaux de soude', quantite: '1 c.à.s', emoji: '💎' },
      { nom: 'Citron', quantite: '1/2', emoji: '🍋' }
    ],
    materiel: ['Bassine', 'Gants'],
    instructions: [
      'Remplissez une bassine d\'eau très chaude',
      'Dissolvez le percarbonate et les cristaux de soude',
      'Pressez le demi-citron dans le bain',
      'Plongez les torchons et laissez tremper 1 à 2 heures',
      'Lavez ensuite en machine à 60°C comme d\'habitude'
    ],
    surfaces: ['Torchons', 'Serviettes', 'Linge de cuisine', 'Bavoirs'],
    precautions: ['Porter des gants', 'Réservé au linge blanc ou résistant', 'Pas sur la soie ni la laine'],
    astuces: ['Le percarbonate ravive le blanc sans javel', 'Idéal contre les taches de graisse et d\'aliments', 'Séchage au soleil = effet blanchissant bonus'],
    conservation: 'Préparer au moment du trempage'
  },
  {
    id: 107,
    nom: 'Détartrant Pommeau de Douche',
    emoji: '🚿',
    categorie: 'Salle de bain',
    badge: 'Anti-calcaire',
    gradient: 'linear-gradient(135deg, #B2EBF2 0%, #80DEEA 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Vinaigre blanc', quantite: '500ml', emoji: '🧴' },
      { nom: 'Eau chaude', quantite: '250ml', emoji: '💧' },
      { nom: 'Bicarbonate de soude', quantite: '1 c.à.s', emoji: '⚪' }
    ],
    materiel: ['Sac congélation ou bol', 'Élastique', 'Brosse à dents usagée'],
    instructions: [
      'Mélangez vinaigre et eau chaude dans un sac congélation',
      'Plongez le pommeau dans le sac et fixez avec un élastique',
      'Laissez tremper 1 à 2 heures (toute la nuit si très entartré)',
      'Retirez, frottez les buses avec la brosse',
      'Saupoudrez un peu de bicarbonate, rincez et faites couler l\'eau chaude'
    ],
    surfaces: ['Pommeau', 'Pommeau de douche', 'Flexible de douche', 'Buses'],
    precautions: ['Démontez le pommeau si possible pour un trempage complet', 'Rincer abondamment avant réutilisation', 'Éviter sur finitions dorées fragiles'],
    astuces: ['Le vinaigre dissout le calcaire des buses bouchées', 'Un cure-dent débouche les trous récalcitrants', 'À faire 1x/mois en zone d\'eau dure'],
    conservation: 'Solution à préparer à chaque détartrage'
  },
  {
    id: 108,
    nom: 'Nettoyant Chaussures en Toile',
    emoji: '👟',
    categorie: 'Entretien',
    badge: 'Ravive le blanc',
    gradient: 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '2 c.à.s', emoji: '⚪' },
      { nom: 'Savon de Marseille', quantite: '1 c.à.s', emoji: '🧼' },
      { nom: 'Eau tiède', quantite: '100ml', emoji: '💧' },
      { nom: 'Vinaigre blanc', quantite: '1 c.à.s', emoji: '🧴' }
    ],
    materiel: ['Vieille brosse à dents', 'Chiffon'],
    instructions: [
      'Mélangez bicarbonate, savon et eau tiède en pâte',
      'Ajoutez le vinaigre (la pâte va légèrement mousser)',
      'Appliquez sur la toile avec la brosse, en mouvements circulaires',
      'Insistez sur les semelles et les zones jaunies',
      'Laissez agir 15 min, essuyez et laissez sécher à l\'ombre'
    ],
    surfaces: ['Chaussures', 'Baskets', 'Chaussures en toile', 'Semelles'],
    precautions: ['Séchage à l\'ombre (le soleil jaunit le blanc)', 'Pas sur le cuir ni le daim', 'Retirer les lacets pour les laver à part'],
    astuces: ['Lacets blancs : trempage dans eau + percarbonate', 'Bourrez de papier journal pour garder la forme', 'Vinaigre = ravive, bicarbonate = désodorise'],
    conservation: 'Pâte à utiliser immédiatement'
  },
  {
    id: 109,
    nom: 'Lavage Doudoune & Manteaux',
    emoji: '🧥',
    categorie: 'Linge',
    badge: 'Plumes & synthétique',
    gradient: 'linear-gradient(135deg, #BBDEFB 0%, #90CAF9 100%)',
    temps: '10min',
    difficulte: 'Moyen',
    efficacite: 4,
    ingredients: [
      { nom: 'Savon de Marseille liquide', quantite: '2 c.à.s', emoji: '🧼' },
      { nom: 'Vinaigre blanc', quantite: '100ml', emoji: '🧴' },
      { nom: 'Balles de lavage ou de tennis', quantite: '2-3', emoji: '🎾' }
    ],
    materiel: ['Lave-linge', 'Sèche-linge (recommandé)'],
    instructions: [
      'Fermez la doudoune et retournez-la sur l\'envers',
      'Lavez à 30°C, cycle délicat, avec le savon liquide',
      'Ajoutez le vinaigre dans le bac assouplissant',
      'Lancez un double rinçage pour tout éliminer',
      'Séchez au sèche-linge avec les balles pour regonfler le garnissage'
    ],
    surfaces: ['Doudounes', 'Manteaux', 'Vestes', 'Couettes'],
    precautions: ['Vérifier l\'étiquette d\'entretien', 'Jamais d\'assouplissant chimique (colmate les plumes)', 'Bien sécher pour éviter les moisissures'],
    astuces: ['Les balles cassent les paquets de plumes', 'Séchage long à basse température', 'Le vinaigre remplace l\'assouplissant et ravive'],
    conservation: 'Usage immédiat'
  },
  {
    id: 110,
    nom: 'Nettoyant Portes & Plinthes',
    emoji: '🚪',
    categorie: 'Multi-usage',
    badge: 'Anti-traces',
    gradient: 'linear-gradient(135deg, #D7CCC8 0%, #BCAAA4 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau tiède', quantite: '400ml', emoji: '💧' },
      { nom: 'Savon noir liquide', quantite: '1 c.à.s', emoji: '⚫' },
      { nom: 'Vinaigre blanc', quantite: '2 c.à.s', emoji: '🧴' },
      { nom: 'HE citron', quantite: '5 gouttes', emoji: '🍋' }
    ],
    materiel: ['Flacon spray', 'Chiffon microfibre'],
    instructions: [
      'Mélangez tous les ingrédients dans le flacon spray',
      'Secouez et vaporisez sur le chiffon (pas directement sur le bois)',
      'Essuyez portes, encadrements et plinthes de haut en bas',
      'Insistez sur les traces de doigts autour des poignées',
      'Séchez avec un chiffon propre'
    ],
    surfaces: ['Portes', 'Plinthes', 'Encadrements', 'Poignées', 'Interrupteurs'],
    precautions: ['Vaporiser sur le chiffon, pas sur le bois brut', 'Bien essorer pour ne pas gorger le bois', 'Tester sur surfaces laquées'],
    astuces: ['Les plinthes accrochent la poussière : passez-les 1x/mois', 'Le savon noir nettoie sans laisser de film', 'Un chiffon microfibre humide suffit en entretien'],
    conservation: '2 mois'
  },
  {
    id: 111,
    nom: 'Lavage Chiffons Microfibres',
    emoji: '🧽',
    categorie: 'Linge',
    badge: 'Entretien matériel',
    gradient: 'linear-gradient(135deg, #C5CAE9 0%, #9FA8DA 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau chaude', quantite: '2L', emoji: '💧' },
      { nom: 'Bicarbonate de soude', quantite: '2 c.à.s', emoji: '⚪' },
      { nom: 'Vinaigre blanc', quantite: '100ml', emoji: '🧴' }
    ],
    materiel: ['Bassine', 'Lave-linge'],
    instructions: [
      'Faites tremper les microfibres dans l\'eau chaude + bicarbonate 30 min',
      'Rincez pour décrocher les saletés et résidus gras',
      'Lavez en machine à 40-60°C SANS assouplissant',
      'Ajoutez le vinaigre dans le bac assouplissant',
      'Séchage à l\'air libre, jamais sur radiateur'
    ],
    surfaces: ['Microfibres', 'Chiffons', 'Serpillières microfibre'],
    precautions: ['Jamais d\'assouplissant (bouche les fibres)', 'Laver séparément du coton qui peluche', 'Pas de sèche-linge trop chaud'],
    astuces: ['Une microfibre entretenue dure des années', 'Le vinaigre réactive le pouvoir absorbant', 'Lavez-les après chaque grosse session de ménage'],
    conservation: 'Usage immédiat'
  },
  {
    id: 112,
    nom: 'Entretien Filtre d\'Aspirateur',
    emoji: '🧹',
    categorie: 'Entretien',
    badge: 'Restaure l\'aspiration',
    gradient: 'linear-gradient(135deg, #CFD8DC 0%, #B0BEC5 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau froide', quantite: '2L', emoji: '💧' },
      { nom: 'Vinaigre blanc', quantite: '100ml', emoji: '🧴' },
      { nom: 'Bicarbonate de soude', quantite: '1 c.à.s', emoji: '⚪' }
    ],
    materiel: ['Bassine', 'Brosse souple'],
    instructions: [
      'Retirez le bac et le filtre selon la notice',
      'Videz et tapotez le filtre pour ôter le gros de la poussière',
      'Faites tremper le filtre lavable dans eau + vinaigre 15 min',
      'Brossez doucement, saupoudrez un peu de bicarbonate pour les odeurs',
      'Rincez à l\'eau claire et laissez sécher 24h complètement'
    ],
    surfaces: ['Aspirateur', 'Filtre HEPA lavable', 'Bac à poussière'],
    precautions: ['Vérifier que le filtre est lavable (sinon le remplacer)', 'Sécher 24h AVANT de remonter (risque moisissure/panne)', 'Ne pas frotter agressivement un filtre HEPA'],
    astuces: ['Un filtre propre restaure jusqu\'à 50% d\'aspiration', 'Le vinaigre neutralise les odeurs de poussière', 'Entretien mensuel = aspirateur qui dure'],
    conservation: 'Filtre sec à remonter après 24h'
  },
  {
    id: 113,
    nom: 'Dépoussiérant Radiateurs',
    emoji: '🌡️',
    categorie: 'Entretien',
    badge: 'Avant l\'hiver',
    gradient: 'linear-gradient(135deg, #FFCCBC 0%, #FFAB91 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau tiède', quantite: '500ml', emoji: '💧' },
      { nom: 'Vinaigre blanc', quantite: '2 c.à.s', emoji: '🧴' },
      { nom: 'Savon noir', quantite: '1 c.à.c', emoji: '⚫' }
    ],
    materiel: ['Sèche-cheveux ou goupillon', 'Serviette', 'Chiffon microfibre'],
    instructions: [
      'Radiateur froid : placez une serviette humide au sol derrière lui',
      'Soufflez la poussière vers le bas au sèche-cheveux (ou goupillon)',
      'Mélangez eau, vinaigre et savon noir dans un spray',
      'Vaporisez le chiffon et essuyez les ailettes accessibles',
      'Passez le goupillon entre les lames pour les zones profondes'
    ],
    surfaces: ['Radiateurs', 'Radiateurs fonte', 'Sèche-serviettes', 'Convecteurs'],
    precautions: ['Toujours intervenir radiateur éteint et froid', 'Ne pas mouiller les parties électriques', 'Couper le chauffage électrique avant'],
    astuces: ['Un radiateur dépoussiéré chauffe jusqu\'à 10% mieux', 'À faire chaque automne avant la saison de chauffe', 'La serviette au sol récupère la poussière qui tombe'],
    conservation: 'Solution : 1 mois'
  },
  {
    id: 114,
    nom: 'Rénovateur Phares Jaunis',
    emoji: '💡',
    categorie: 'Voiture',
    badge: 'Effet neuf',
    gradient: 'linear-gradient(135deg, #FFF9C4 0%, #FFF176 100%)',
    temps: '15min',
    difficulte: 'Moyen',
    efficacite: 4,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '3 c.à.s', emoji: '⚪' },
      { nom: 'Vinaigre blanc', quantite: '2 c.à.s', emoji: '🧴' },
      { nom: 'Dentifrice blanc', quantite: '1 noisette', emoji: '🦷' }
    ],
    materiel: ['Chiffon microfibre', 'Eau', 'Ruban de masquage'],
    instructions: [
      'Nettoyez et séchez le phare, masquez la carrosserie autour',
      'Mélangez bicarbonate et vinaigre en pâte',
      'Frottez le phare en cercles avec le chiffon pendant 5 min',
      'Reprenez avec un peu de dentifrice pour le polissage final',
      'Rincez abondamment et séchez : le plastique retrouve sa transparence'
    ],
    surfaces: ['Phares', 'Optiques', 'Feux arrière', 'Plastiques transparents'],
    precautions: ['Masquer la peinture (le bicarbonate peut ternir)', 'Ne pas frotter à sec', 'Appliquer une cire de protection après pour durer'],
    astuces: ['Le dentifrice contient un abrasif doux idéal', 'Résultat durable avec une couche de cire ou vernis', 'Des phares clairs = meilleure visibilité et contrôle technique'],
    conservation: 'Pâte à préparer à chaque usage'
  },
  {
    id: 115,
    nom: 'Brillance Pneus Naturelle',
    emoji: '🛞',
    categorie: 'Voiture',
    badge: 'Aspect neuf',
    gradient: 'linear-gradient(135deg, #424242 0%, #212121 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau', quantite: '500ml', emoji: '💧' },
      { nom: 'Savon noir', quantite: '2 c.à.s', emoji: '⚫' },
      { nom: 'Huile de lin', quantite: '1 c.à.s', emoji: '🪔' }
    ],
    materiel: ['Brosse', 'Éponge', 'Chiffon'],
    instructions: [
      'Mélangez eau et savon noir, brossez les pneus pour les dégraisser',
      'Rincez et laissez sécher complètement',
      'Imbibez un chiffon d\'un peu d\'huile de lin',
      'Passez une fine couche sur le flanc des pneus',
      'Lustrez avec un chiffon sec pour un noir profond'
    ],
    surfaces: ['Pneus', 'Flancs de pneus', 'Plastiques extérieurs'],
    precautions: ['Ne jamais mettre d\'huile sur la bande de roulement', 'Appliquer en très fine couche', 'Éviter le contact avec les freins'],
    astuces: ['L\'huile de lin nourrit et fait briller le caoutchouc', 'Une fine couche suffit, sinon ça colle la poussière', 'Idéal avant une revente ou un contrôle'],
    conservation: 'Solution savon : 2 mois'
  },
  {
    id: 116,
    nom: 'Nettoyant Ceintures de Sécurité',
    emoji: '🔒',
    categorie: 'Voiture',
    badge: 'Sangles',
    gradient: 'linear-gradient(135deg, #90A4AE 0%, #607D8B 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau tiède', quantite: '300ml', emoji: '💧' },
      { nom: 'Savon de Marseille', quantite: '1 c.à.s', emoji: '🧼' },
      { nom: 'Bicarbonate de soude', quantite: '1 c.à.c', emoji: '⚪' }
    ],
    materiel: ['Pince ou pince à linge', 'Brosse à poils doux', 'Chiffon'],
    instructions: [
      'Déroulez la ceinture au maximum et bloquez-la avec une pince',
      'Mélangez eau tiède, savon et bicarbonate',
      'Frottez la sangle avec la brosse imbibée, des deux côtés',
      'Essuyez avec un chiffon humide propre',
      'Laissez sécher complètement AVANT de relâcher l\'enrouleur'
    ],
    surfaces: ['Ceintures', 'Sangles', 'Ceintures de sécurité'],
    precautions: ['Ne pas détremper la sangle (risque pour l\'enrouleur)', 'Sécher totalement avant de réenrouler', 'Pas de produit agressif qui fragilise les fibres'],
    astuces: ['La pince empêche la ceinture de se rétracter', 'Bicarbonate = anti-odeur et anti-bactérien', 'Sangle sèche = sécurité préservée'],
    conservation: 'Usage immédiat'
  },
  {
    id: 117,
    nom: 'Nettoyant Casque Moto',
    emoji: '⛑️',
    categorie: 'Voiture',
    badge: 'Intérieur & visière',
    gradient: 'linear-gradient(135deg, #B0BEC5 0%, #78909C 100%)',
    temps: '15min',
    difficulte: 'Moyen',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau tiède', quantite: '500ml', emoji: '💧' },
      { nom: 'Savon de Marseille liquide', quantite: '1 c.à.s', emoji: '🧼' },
      { nom: 'Bicarbonate de soude', quantite: '1 c.à.c', emoji: '⚪' }
    ],
    materiel: ['Chiffon microfibre doux', 'Brosse souple'],
    instructions: [
      'Retirez les mousses intérieures amovibles si possible',
      'Lavez les mousses à la main dans l\'eau savonneuse tiède, rincez, séchez à l\'air',
      'Nettoyez la coque extérieure au chiffon microfibre humide',
      'Pour la visière : eau tiède + savon doux uniquement, sans frotter à sec',
      'Saupoudrez un peu de bicarbonate dans le casque sec pour les odeurs, aspirez après 1h'
    ],
    surfaces: ['Casque moto', 'Visière', 'Mousses de casque'],
    precautions: ['JAMAIS de produit alcoolisé ou solvant sur la visière (la fragilise)', 'Ne pas frotter la visière à sec (micro-rayures)', 'Séchage à l\'air, loin d\'une source de chaleur'],
    astuces: ['Microfibre + eau savonneuse = visière sans traces', 'Le bicarbonate neutralise les odeurs de transpiration', 'Mousses propres = casque plus sain et durable'],
    conservation: 'Usage immédiat'
  },
  {
    id: 118,
    nom: 'Entretien Selle Moto & Cuir',
    emoji: '🪑',
    categorie: 'Voiture',
    badge: 'Nourrit le cuir',
    gradient: 'linear-gradient(135deg, #8D6E63 0%, #5D4037 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Savon de Marseille', quantite: '1 c.à.c', emoji: '🧼' },
      { nom: 'Eau tiède', quantite: '250ml', emoji: '💧' },
      { nom: 'Huile de lin ou cire d\'abeille', quantite: '1 c.à.c', emoji: '🐝' }
    ],
    materiel: ['2 chiffons doux'],
    instructions: [
      'Dépoussiérez la selle avec un chiffon sec',
      'Nettoyez avec un chiffon à peine humide d\'eau savonneuse',
      'Essuyez aussitôt, ne laissez pas l\'eau stagner',
      'Une fois sèche, appliquez une fine couche d\'huile de lin ou de cire',
      'Lustrez avec un chiffon propre pour nourrir et imperméabiliser'
    ],
    surfaces: ['Selle moto', 'Cuir', 'Sièges cuir', 'Selle vinyle'],
    precautions: ['Ne pas détremper le cuir', 'Tester la cire sur une zone cachée', 'Pas de chaleur directe pour sécher (le cuir craquelle)'],
    astuces: ['La cire imperméabilise contre la pluie', 'Un cuir nourri ne craquelle pas', 'Entretien 1x/mois en saison de roulage'],
    conservation: 'Usage immédiat'
  },
  {
    id: 119,
    nom: 'Dégraissant Grille de Barbecue',
    emoji: '🍖',
    categorie: 'Entretien',
    badge: 'Graisses cuites',
    gradient: 'linear-gradient(135deg, #6D4C41 0%, #4E342E 100%)',
    temps: '20min',
    difficulte: 'Moyen',
    efficacite: 5,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '4 c.à.s', emoji: '⚪' },
      { nom: 'Vinaigre blanc', quantite: '200ml', emoji: '🧴' },
      { nom: 'Savon noir', quantite: '2 c.à.s', emoji: '⚫' },
      { nom: 'Gros sel', quantite: '2 c.à.s', emoji: '🧂' }
    ],
    materiel: ['Sac poubelle solide', 'Brosse métallique', 'Gants'],
    instructions: [
      'Saupoudrez la grille de bicarbonate et de gros sel',
      'Vaporisez le vinaigre dessus (réaction effervescente)',
      'Glissez la grille dans un sac avec le savon noir et un peu d\'eau chaude',
      'Laissez agir 1 à 2 heures (la nuit pour les grilles très grasses)',
      'Brossez, rincez au jet : la graisse cuite se décolle'
    ],
    surfaces: ['Barbecue', 'Grille de barbecue', 'Grille de four', 'Plancha'],
    precautions: ['Porter des gants (graisse + abrasif)', 'Barbecue froid uniquement', 'Bien rincer avant la prochaine cuisson'],
    astuces: ['Frotter à chaud avec un demi-oignon en prévention', 'Le gros sel agit comme abrasif naturel', 'Une feuille de papier alu froissée remplace la brosse'],
    conservation: 'Solution à préparer à chaque usage'
  },
  {
    id: 120,
    nom: 'Équilibrage Eau de Piscine',
    emoji: '🏊',
    categorie: 'Entretien',
    badge: 'pH naturel',
    gradient: 'linear-gradient(135deg, #4FC3F7 0%, #0288D1 100%)',
    temps: '10min',
    difficulte: 'Moyen',
    efficacite: 4,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: 'selon volume', emoji: '⚪' },
      { nom: 'Eau de la piscine', quantite: '1 seau', emoji: '💧' }
    ],
    materiel: ['Bandelettes de test pH/TAC', 'Seau', 'Gants'],
    instructions: [
      'Testez le pH et le TAC (alcalinité) avec les bandelettes',
      'Si le TAC est bas, dissolvez le bicarbonate dans un seau d\'eau de piscine',
      'Comptez environ 150 g de bicarbonate par 10 m³ pour +10 ppm de TAC',
      'Versez la solution dissoute devant les buses de refoulement, pompe en marche',
      'Attendez 6h puis retestez et ajustez si besoin'
    ],
    surfaces: ['Piscine', 'Eau de piscine', 'Spa'],
    precautions: ['Toujours dissoudre avant de verser (jamais en poudre directe)', 'Ajuster par petites doses et retester', 'Le bicarbonate stabilise le TAC, pas la désinfection'],
    astuces: ['Un TAC stable = pH stable = eau claire', 'Le bicarbonate adoucit aussi l\'eau', 'Complète le traitement, ne remplace pas le chlore/sel'],
    conservation: 'Bicarbonate : se conserve des années au sec'
  },
  {
    id: 121,
    nom: 'Nettoyant Carter de Tondeuse',
    emoji: '🌿',
    categorie: 'Entretien',
    badge: 'Anti-herbe collée',
    gradient: 'linear-gradient(135deg, #AED581 0%, #7CB342 100%)',
    temps: '15min',
    difficulte: 'Moyen',
    efficacite: 4,
    ingredients: [
      { nom: 'Savon noir', quantite: '3 c.à.s', emoji: '⚫' },
      { nom: 'Eau chaude', quantite: '1L', emoji: '💧' },
      { nom: 'Vinaigre blanc', quantite: '100ml', emoji: '🧴' },
      { nom: 'Huile végétale', quantite: '1 c.à.s', emoji: '🪔' }
    ],
    materiel: ['Spatule en bois', 'Brosse', 'Gants épais'],
    instructions: [
      'Débranchez la bougie (ou la batterie) et videz le réservoir, tondeuse sur le côté',
      'Grattez l\'herbe collée sous le carter à la spatule',
      'Brossez avec le mélange eau chaude + savon noir + vinaigre',
      'Rincez et séchez soigneusement pour éviter la rouille',
      'Passez un voile d\'huile végétale sous le carter : l\'herbe colle moins ensuite'
    ],
    surfaces: ['Tondeuse', 'Carter de tondeuse', 'Lame', 'Outils de jardin'],
    precautions: ['TOUJOURS débrancher la bougie/batterie avant (risque de démarrage)', 'Porter des gants épais près de la lame', 'Ne pas mouiller le moteur ni le filtre à air'],
    astuces: ['Le voile d\'huile empêche l\'herbe d\'adhérer', 'Nettoyez après chaque tonte humide', 'Carter propre = meilleure éjection et coupe nette'],
    conservation: 'Solution : usage immédiat'
  },
  {
    id: 122,
    nom: 'Anti-Mousse Toiture & Façade',
    emoji: '🏠',
    categorie: 'Entretien',
    badge: 'Extérieur',
    gradient: 'linear-gradient(135deg, #A1887F 0%, #6D4C41 100%)',
    temps: '15min',
    difficulte: 'Avancé',
    efficacite: 4,
    ingredients: [
      { nom: 'Cristaux de soude', quantite: '300g', emoji: '💎' },
      { nom: 'Eau chaude', quantite: '5L', emoji: '💧' },
      { nom: 'Savon noir', quantite: '3 c.à.s', emoji: '⚫' }
    ],
    materiel: ['Pulvérisateur de jardin', 'Brosse télescopique', 'Équipement de sécurité'],
    instructions: [
      'Dissolvez les cristaux de soude dans l\'eau chaude, ajoutez le savon noir',
      'Par temps sec et couvert, pulvérisez sur les mousses et lichens',
      'Laissez agir plusieurs jours : la mousse brunit et se détache',
      'Brossez les zones accessibles à la brosse télescopique',
      'La pluie rince ensuite naturellement les résidus'
    ],
    surfaces: ['Toiture', 'Façade', 'Murs extérieurs', 'Terrasse'],
    precautions: ['Sécurité hauteur : harnais, ou faire appel à un pro pour les toits', 'Protéger les plantes en contrebas (rincer le feuillage)', 'Ne jamais marcher sur une toiture mouillée'],
    astuces: ['Appliquer à l\'automne ou au printemps', 'Ne pas utiliser de Karcher sur les tuiles (les fragilise)', 'Pour les grandes hauteurs, privilégier un professionnel'],
    conservation: 'Solution à préparer à chaque traitement'
  },
  {
    id: 123,
    nom: 'Conservateur pour Fleurs Coupées',
    emoji: '🌺',
    categorie: 'Entretien',
    badge: 'Bouquets durables',
    gradient: 'linear-gradient(135deg, #F48FB1 0%, #F06292 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau du robinet', quantite: '1L', emoji: '💧' },
      { nom: 'Sucre', quantite: '1 c.à.s', emoji: '🍚' },
      { nom: 'Vinaigre blanc', quantite: '2 c.à.s', emoji: '🧴' }
    ],
    materiel: ['Vase propre', 'Ciseaux ou sécateur'],
    instructions: [
      'Mélangez le sucre et le vinaigre dans l\'eau du vase',
      'Recoupez les tiges en biseau sous l\'eau de 2-3 cm',
      'Retirez les feuilles qui tremperaient dans l\'eau',
      'Disposez le bouquet à l\'abri du soleil direct et des courants d\'air',
      'Changez l\'eau et recoupez les tiges tous les 2 jours'
    ],
    surfaces: ['Fleurs', 'Fleurs coupées', 'Bouquets'],
    precautions: ['Vase parfaitement propre (les bactéries tuent les fleurs)', 'Pas de fruits à proximité (l\'éthylène les fane)', 'Éviter la chaleur et le soleil direct'],
    astuces: ['Le sucre nourrit, le vinaigre limite les bactéries', 'Recouper en biseau améliore l\'absorption d\'eau', 'Bouquet la nuit au frais = tenue prolongée'],
    conservation: 'Renouveler l\'eau tous les 2 jours'
  },
  {
    id: 124,
    nom: 'Engrais Naturel pour Plantes',
    emoji: '🌱',
    categorie: 'Entretien',
    badge: 'Zéro déchet',
    gradient: 'linear-gradient(135deg, #C5E1A5 0%, #9CCC65 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Marc de café', quantite: '2 c.à.s', emoji: '☕' },
      { nom: 'Coquilles d\'œuf broyées', quantite: '2-3', emoji: '🥚' },
      { nom: 'Eau de cuisson (sans sel) refroidie', quantite: '1L', emoji: '💧' },
      { nom: 'Peau de banane', quantite: '1', emoji: '🍌' }
    ],
    materiel: ['Bocal', 'Tamis'],
    instructions: [
      'Récupérez l\'eau de cuisson des légumes (non salée) et laissez-la refroidir',
      'Faites infuser la peau de banane coupée dans cette eau 24-48h',
      'Filtrez : cette eau riche en potassium s\'utilise à l\'arrosage',
      'Mélangez le marc de café séché à la terre en surface (azote)',
      'Saupoudrez les coquilles broyées au pied (calcium, anti-limaces)'
    ],
    surfaces: ['Engrais', 'Plantes', 'Plantes d\'intérieur', 'Potager'],
    precautions: ['Eau de cuisson SANS sel uniquement', 'Marc de café avec modération (acidifie le sol)', 'Ne pas détremper les plantes grasses'],
    astuces: ['La peau de banane = potassium pour la floraison', 'Le marc éloigne aussi certains nuisibles', 'Alternez avec de l\'eau claire une fois sur deux'],
    conservation: 'Eau d\'engrais : 1 semaine au frais'
  },
  {
    id: 125,
    nom: 'Déboucheur Canalisations Extérieures',
    emoji: '🔧',
    categorie: 'Entretien',
    badge: 'SOS extérieur',
    gradient: 'linear-gradient(135deg, #90A4AE 0%, #546E7A 100%)',
    temps: '15min',
    difficulte: 'Moyen',
    efficacite: 4,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '200g', emoji: '⚪' },
      { nom: 'Vinaigre blanc', quantite: '250ml', emoji: '🧴' },
      { nom: 'Gros sel', quantite: '100g', emoji: '🧂' },
      { nom: 'Eau bouillante', quantite: '3L', emoji: '💧' }
    ],
    materiel: ['Gants', 'Ventouse'],
    instructions: [
      'Retirez les feuilles et débris visibles de la grille d\'évacuation',
      'Versez le bicarbonate puis le gros sel dans la canalisation',
      'Ajoutez le vinaigre : laissez l\'effervescence agir 30 min',
      'Versez l\'eau bouillante en une fois pour entraîner les résidus',
      'Utilisez la ventouse si le bouchon résiste, répétez si besoin'
    ],
    surfaces: ['Canalisations ext.', 'Évacuations extérieures', 'Regards', 'Gouttières'],
    precautions: ['Porter des gants', 'Pas sur canalisations PVC anciennes fragiles', 'Ne pas mélanger avec un déboucheur chimique résiduel'],
    astuces: ['Entretien préventif mensuel évite les gros bouchons', 'Une grille anti-feuilles limite l\'encrassement', 'Le sel renforce l\'action dégraissante'],
    conservation: 'À préparer à chaque usage'
  },
  {
    id: 126,
    nom: 'Nettoyant Mains Dégraissant',
    emoji: '✋',
    categorie: 'Multi-usage',
    badge: 'Anti-odeurs',
    gradient: 'linear-gradient(135deg, #FFE0B2 0%, #FFB74D 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Marc de café ou bicarbonate', quantite: '1 c.à.s', emoji: '☕' },
      { nom: 'Savon de Marseille', quantite: '1 noisette', emoji: '🧼' },
      { nom: 'Citron', quantite: '1/2', emoji: '🍋' },
      { nom: 'Huile d\'olive', quantite: '1 c.à.c', emoji: '🫒' }
    ],
    materiel: [],
    instructions: [
      'Pour les mains très sales : frottez avec marc de café + savon',
      'Le marc agit comme exfoliant et décrasse les pores',
      'Frottez les odeurs tenaces (ail, poisson) avec le demi-citron',
      'Rincez à l\'eau tiède',
      'Massez une goutte d\'huile d\'olive pour nourrir les mains sèches'
    ],
    surfaces: ['Mains', 'Peau', 'Ongles'],
    precautions: ['Éviter le citron sur peau abîmée ou coupée', 'Rincer si sensation d\'irritation', 'Pas d\'exposition au soleil juste après le citron'],
    astuces: ['Le marc de café neutralise les odeurs et exfolie', 'Frotter de l\'inox sous l\'eau enlève aussi l\'odeur d\'ail', 'L\'huile d\'olive répare les mains du jardinier'],
    conservation: 'Usage immédiat'
  },
  {
    id: 127,
    nom: 'Nettoyant Bijoux Éclat',
    emoji: '💍',
    categorie: 'Entretien',
    badge: 'Or & argent',
    gradient: 'linear-gradient(135deg, #FFF59D 0%, #FFD54F 100%)',
    temps: '10min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '1 c.à.s', emoji: '⚪' },
      { nom: 'Eau chaude', quantite: '250ml', emoji: '💧' },
      { nom: 'Feuille d\'aluminium', quantite: '1', emoji: '🪙' },
      { nom: 'Gros sel', quantite: '1 c.à.c', emoji: '🧂' }
    ],
    materiel: ['Bol', 'Chiffon doux', 'Brosse à dents souple'],
    instructions: [
      'Tapissez un bol de papier aluminium (face brillante vers le haut)',
      'Versez l\'eau chaude, le bicarbonate et le gros sel',
      'Déposez les bijoux en argent dans le bain 5-10 min : la réaction décolle l\'oxydation',
      'Pour l\'or et les pierres : eau tiède + savon doux, brossez délicatement',
      'Rincez à l\'eau claire et séchez avec un chiffon doux'
    ],
    surfaces: ['Bijoux', 'Argenterie', 'Or', 'Argent'],
    precautions: ['Pas pour les perles, l\'opale ni les pierres poreuses', 'Vérifier les sertissages avant le bain', 'Pas de bicarbonate sur les pierres tendres'],
    astuces: ['La réaction alu + bicarbonate dé-noircit l\'argent sans frotter', 'Un chiffon microfibre lustre l\'éclat final', 'Pour les diamants : brosse souple et savon suffisent'],
    conservation: 'Bain à préparer à chaque usage'
  },
  {
    id: 128,
    nom: 'Nettoyant Mobilier de Jardin',
    emoji: '🪴',
    categorie: 'Entretien',
    badge: 'Plastique, résine, bois',
    gradient: 'linear-gradient(135deg, #80CBC4 0%, #4DB6AC 100%)',
    temps: '15min',
    difficulte: 'Facile',
    efficacite: 4,
    ingredients: [
      { nom: 'Eau chaude', quantite: '2L', emoji: '💧' },
      { nom: 'Savon noir', quantite: '3 c.à.s', emoji: '⚫' },
      { nom: 'Bicarbonate de soude', quantite: '2 c.à.s', emoji: '⚪' },
      { nom: 'Vinaigre blanc', quantite: '100ml', emoji: '🧴' }
    ],
    materiel: ['Éponge', 'Brosse souple', 'Jet d\'eau'],
    instructions: [
      'Mélangez eau chaude, savon noir et bicarbonate dans un seau',
      'Pour le plastique/résine blanc jauni : ajoutez le vinaigre',
      'Frottez le mobilier à l\'éponge ou à la brosse souple',
      'Insistez sur les nervures et les pieds où la crasse s\'accumule',
      'Rincez au jet et laissez sécher au soleil'
    ],
    surfaces: ['Mobilier de jardin', 'Salon de jardin', 'Chaises plastique', 'Table résine', 'Bois de jardin'],
    precautions: ['Tester le vinaigre sur le bois peint', 'Pas de brosse dure sur la résine (raye)', 'Protéger le bois ensuite avec une huile adaptée'],
    astuces: ['Le bicarbonate ravive le plastique blanc', 'Une housse l\'hiver évite ce gros nettoyage', 'Savon noir = nettoie sans agresser les surfaces'],
    conservation: 'Solution : usage immédiat'
  },
  {
    id: 129,
    nom: 'Spray Anti-Calcaire Express',
    emoji: '💧',
    categorie: 'Salle de bain',
    badge: 'Quotidien',
    gradient: 'linear-gradient(135deg, #B3E5FC 0%, #4FC3F7 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Eau', quantite: '250ml', emoji: '💧' },
      { nom: 'Vinaigre blanc', quantite: '250ml', emoji: '🧴' },
      { nom: 'Acide citrique', quantite: '1 c.à.c', emoji: '🍋' },
      { nom: 'HE menthe poivrée', quantite: '8 gouttes', emoji: '🌿' }
    ],
    materiel: ['Flacon spray 500ml'],
    instructions: [
      'Mélangez l\'eau et le vinaigre dans le flacon',
      'Ajoutez l\'acide citrique et secouez pour dissoudre',
      'Incorporez l\'huile essentielle de menthe',
      'Vaporisez sur les surfaces entartrées après la douche',
      'Laissez agir 5 min puis essuyez ou rincez'
    ],
    surfaces: ['Robinetterie', 'Gourdes', 'Lavabo', 'Parois de douche', 'Inox'],
    precautions: ['Éviter le marbre et la pierre naturelle', 'Pas sur joints en mauvais état', 'Rincer les gourdes alimentaires'],
    astuces: ['Un coup de spray quotidien après la douche = zéro calcaire', 'L\'acide citrique renforce l\'action du vinaigre', 'La menthe masque l\'odeur du vinaigre'],
    conservation: '6 mois'
  },
  {
    id: 130,
    nom: 'Désodorisant Baskets en Poudre',
    emoji: '👟',
    categorie: 'Entretien',
    badge: 'Anti-odeurs',
    gradient: 'linear-gradient(135deg, #E1BEE7 0%, #CE93D8 100%)',
    temps: '5min',
    difficulte: 'Facile',
    efficacite: 5,
    ingredients: [
      { nom: 'Bicarbonate de soude', quantite: '4 c.à.s', emoji: '⚪' },
      { nom: 'Maïzena', quantite: '2 c.à.s', emoji: '🌽' },
      { nom: 'HE tea tree', quantite: '10 gouttes', emoji: '🌿' },
      { nom: 'HE lavande', quantite: '5 gouttes', emoji: '💜' }
    ],
    materiel: ['Pot hermétique', 'Cuillère'],
    instructions: [
      'Mélangez le bicarbonate et la maïzena dans un pot',
      'Ajoutez les huiles essentielles et mélangez bien',
      'Le soir, saupoudrez une cuillère de poudre dans chaque chaussure',
      'Laissez agir toute la nuit (le bicarbonate absorbe l\'humidité et les odeurs)',
      'Le matin, tapotez pour vider l\'excédent de poudre'
    ],
    surfaces: ['Baskets', 'Chaussures', 'Bottes', 'Chaussons'],
    precautions: ['Bien tapoter pour retirer la poudre avant de porter', 'Tea tree : éviter le contact prolongé peau nue', 'Conserver le pot au sec'],
    astuces: ['Le tea tree est antibactérien et anti-mycose', 'La maïzena absorbe l\'humidité, source des odeurs', 'Glissez un sachet de la poudre dans les chaussures rangées'],
    conservation: 'Poudre : 6 mois en pot hermétique'
  },
  {
    id: 131,
    nom: 'Entretien Préventif Chaudière',
    emoji: '🔥',
    categorie: 'Entretien',
    badge: 'Avant l\'hiver',
    gradient: 'linear-gradient(135deg, #FF7043 0%, #E64A19 100%)',
    temps: '30min',
    difficulte: 'Moyen',
    efficacite: 4,
    ingredients: [
      { nom: 'Chiffon sec', quantite: '1', emoji: '🧽' },
      { nom: 'Aspirateur avec embout fin', quantite: '1', emoji: '🧹' },
      { nom: 'Clé de purge', quantite: '1', emoji: '🔧' },
      { nom: 'Récipient', quantite: '1', emoji: '🥣' }
    ],
    materiel: ['Aspirateur', 'Clé de purge (ou tournevis plat)', 'Récipient pour l\'eau de purge'],
    instructions: [
      'Coupez la chaudière et attendez qu\'elle soit froide',
      'Dépoussiérez les grilles d\'aération et le capot avec un chiffon sec',
      'Aspirez les poussières autour de la chaudière (jamais à l\'intérieur du brûleur)',
      'Vérifiez que la pression du circuit est entre 1 et 1,5 bar (manomètre)',
      'Purgez les radiateurs : ouvrez la vis de purge, laissez sortir l\'air jusqu\'à ce que l\'eau coule, refermez',
      'Après purge, contrôlez à nouveau la pression et ré-remplissez le circuit si besoin (robinet de remplissage)',
      'Rallumez la chaudière et vérifiez qu\'elle démarre normalement'
    ],
    surfaces: ['Chaudière', 'Radiateurs', 'Circuit de chauffage'],
    precautions: ['NE JAMAIS toucher au brûleur ni aux pièces internes', 'Ne jamais intervenir sur le gaz', 'L\'entretien annuel obligatoire reste du ressort d\'un professionnel', 'En cas de doute ou d\'anomalie, couper et appeler un chauffagiste'],
    astuces: ['Faites ce check-up chaque automne avant la saison de chauffe', 'Une purge annuelle évite les bruits dans les radiateurs', 'Une chaudière dépoussiérée = meilleur rendement et moins de pannes'],
    conservation: 'À faire 1x/an, avant l\'hiver'
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
  { id: 'Entretien', nom: 'Entretien', emoji: '🔧' },
  { id: 'Voiture', nom: 'Voiture', emoji: '🚗' }
];

// Mapping des recettes par surface pour le modal surface
export const RECETTES_PAR_SURFACE: Record<number, number[]> = {
  1: [2, 15, 88],  // Four -> Dégraissant Puissant, Pâte Nettoyante Four, Four Vapeur
  2: [9],          // Lave-vaisselle -> Nettoyant Sol Carrelage
  3: [1, 40, 57, 71], // Réfrigérateur -> Spray Multi-usage, Désodorisant Frigo, Désodorisant Placards, Spray Désinfectant Tea Tree
  4: [49],         // Micro-ondes -> Nettoyant Micro-ondes
  5: [2],          // Friteuse -> Dégraissant Puissant
  6: [2],          // Airfryer -> Dégraissant Puissant
  7: [36, 39, 58], // Poêles & casseroles -> Pierre Blanche, Poêle Antiadhésive Récupérée, Récurant Casseroles
  8: [35, 12, 32, 33, 105], // Évier -> Spray Alcool Ménager, Nettoyant Inox, Nettoyant WC Spray, Déboucheur Canalisations, Crème à Récurer
  9: [41, 95],     // Poubelles -> Désodorisant Poubelle, Poubelles Vapeur
  10: [106],       // Torchons -> Blanchisseur Torchons & Linge de Cuisine
  11: [9, 30, 32, 75], // Carrelage sdb -> Nettoyant Sol Carrelage, Nettoyant Sols Universel, Nettoyant WC Spray, Nettoyant Sol Pin
  13: [8, 32, 33, 85], // Lavabo sdb -> + Baignoire Pierre Blanche
  14: [35, 8, 28, 33, 72, 91, 102], // Parois de douche -> + Spray Anti-moisissures
  15: [107, 129],  // Pommeau -> Détartrant Pommeau de Douche, Spray Anti-Calcaire Express
  16: [35, 8, 129], // Robinetterie sdb -> Spray Alcool Ménager, Spray Anti-Calcaire, Spray Anti-Calcaire Express
  17: [35, 7, 6, 31, 32, 34, 96, 101], // WC -> + Détartrant WC Moussant
  18: [8, 20, 72, 86, 89, 102], // Joints -> + Spray Anti-moisissures
  20: [11, 45, 65, 81, 4, 19], // Draps & lit -> Lessive, Blanchisseur, Détachant Sang (+ Détachant Textile/Tapis du lit)
  21: [4, 73, 79, 104], // Rideaux -> + Désodorisant Textile & Canapé
  22: [3, 8, 129], // Gourdes -> Anti-traces Vitres, Spray Anti-Calcaire, Spray Anti-Calcaire Express
  23: [108, 130],  // Chaussures -> Nettoyant Chaussures Toile, Désodorisant Baskets Poudre
  24: [109],       // Doudounes -> Lavage Doudoune & Manteaux
  25: [42, 59, 73, 97], // Tapis -> + Tapis Vapeur
  26: [42, 59, 97], // Moquette -> + Tapis Vapeur
  27: [59, 73, 78, 94, 104], // Canapé -> + Désodorisant Textile & Canapé
  28: [35, 6, 71], // Interrupteurs -> Spray Alcool Ménager, Désinfectant Naturel, Spray Désinfectant Tea Tree
  29: [35, 110, 71, 60], // Portes (+ charnières) -> Spray Alcool, Nettoyant Portes & Plinthes, Tea Tree, Lubrifiant Charnières
  30: [11],        // Lave-linge -> Lessive Maison
  31: [111],       // Microfibres -> Lavage Chiffons Microfibres
  32: [35, 11, 45, 59, 65, 67, 79, 81, 98], // Linge -> + Détachant Graisse Eau Chaude
  33: [35, 22],    // Téléphone -> Spray Alcool Ménager, Spray Désinfectant Express
  34: [35, 23],    // Ordinateur -> Spray Alcool Ménager, Nettoyant Écrans
  35: [112],       // Aspirateur -> Entretien Filtre d'Aspirateur
  36: [131],       // Chaudière -> Entretien Préventif Chaudière
  37: [113, 131],  // Radiateurs -> Dépoussiérant Radiateurs, Entretien Préventif Chaudière
  38: [54],        // Carrosserie -> Nettoyant Carrosserie
  39: [44],        // Jantes -> Nettoyant Jantes Auto
  40: [114],       // Phares -> Rénovateur Phares Jaunis
  42: [47, 64, 118], // Sièges auto -> Nettoyant Sièges Auto Tissu, Détachant Cuir, Entretien Selle Moto & Cuir
  43: [35],        // Plastiques voiture -> Spray Alcool Ménager
  44: [115],       // Pneus -> Brillance Pneus Naturelle
  45: [116],       // Ceintures -> Nettoyant Ceintures de Sécurité
  46: [117],       // Casque moto -> Nettoyant Casque Moto
  47: [118],       // Selle moto -> Entretien Selle Moto & Cuir
  48: [46, 66, 69, 122], // Terrasse -> + Anti-Mousse Toiture & Façade
  49: [119, 2],    // Barbecue -> Dégraissant Grille de Barbecue, Dégraissant Puissant
  50: [120],       // Piscine -> Équilibrage Eau de Piscine
  51: [121],       // Tondeuse -> Nettoyant Carter de Tondeuse
  52: [122],       // Toiture -> Anti-Mousse Toiture & Façade
  54: [124],       // Engrais -> Engrais Naturel pour Plantes
  55: [125, 100],  // Canalisations ext. -> Déboucheur Canalisations Extérieures, Débouchage Express
  56: [126],       // Mains -> Nettoyant Mains Dégraissant
  57: [127, 55],   // Bijoux -> Nettoyant Bijoux Éclat, Polish Argenterie
  58: [35, 3, 29, 68, 91], // Vitres & miroirs -> Spray Alcool, Anti-traces Vitres, ..., Vitres Vapeur
  59: [35, 1, 71], // Poignées -> + Spray Désinfectant Tea Tree
  60: [35, 3, 23], // Écrans -> Spray Alcool Ménager, Anti-traces Vitres (dilué), Nettoyant Écrans
  61: [13, 33, 100], // Canalisations -> + Débouchage Express Eau Bouillante
  62: [4, 19, 84, 108, 130], // Baskets -> + Nettoyant Chaussures Toile, Désodorisant Baskets Poudre
  41: [3, 24, 25, 26, 27], // Vitres auto -> Anti-traces Vitres, Lave-Glace Été/Hiver/4 Saisons, Spray Dégivrant
  // Porcelaine / Vaisselle
  63: [36, 37],    // Tasses & Mugs -> Pierre Blanche, Vaisselle Impeccable
  65: [36, 37],    // Vaisselle (+ assiettes) -> Pierre Blanche, Vaisselle Impeccable
  // Casseroles & Poêles (inox)
  67: [36, 38, 58], // Casseroles & poêles inox -> Pierre Blanche, Casseroles Inox Brillantes, Récurant Casseroles
  // Électroménager supplémentaire
  69: [48],        // Bouilloire -> Détartrant Bouilloire
  70: [51],        // Cafetière -> Détartrant Cafetière
  71: [2, 43],     // Hotte -> Dégraissant Puissant, Dégraissant Hotte
  72: [37, 99],    // Planches à découper -> + Planches Eau Bouillante
  // Meubles et bois
  73: [56, 62, 66, 103], // Meubles en bois -> + Nettoyant Parquet Bois Naturel
  74: [56, 62, 66, 103], // Parquet -> + Nettoyant Parquet Bois Naturel
  // Cuir
  75: [59, 64],    // Cuir -> Détachant Gras Textile, Détachant Cuir
  // Métaux précieux
  76: [55],        // Argenterie -> Polish Argenterie
  77: [55],        // Cuivre & Laiton -> Polish Argenterie
  // Jardin & Extérieur
  78: [128],       // Mobilier de jardin -> Nettoyant Mobilier de Jardin
  79: [53, 124, 123], // Plantes & fleurs -> Insecticide Plantes, Engrais Naturel, Conservateur Fleurs Coupées
  80: [50, 80],    // Mauvaises herbes -> Désherbant Naturel, Désherbage Eau Bouillante
  81: [52, 63],    // Outils de jardin -> Anti-Rouille Naturel, Protection Outils Jardin
  // Autres
  82: [73, 78, 93, 104], // Matelas & sommier -> Désodorisant, Anti-Punaises Vapeur, ...
  83: [92],        // Jouets -> Jouets Enfants Vapeur
  84: [61],        // Autocollants -> Décollant Autocollants
  // Surfaces supplémentaires
  86: [82, 105],   // Plaques vitrocéramique -> Vitrocéramique Pierre Blanche, Crème à Récurer
  87: [83],        // Fer à repasser -> Semelle Fer à Repasser
  88: [85, 105],   // Baignoire -> Baignoire Pierre Blanche, Crème à Récurer
  90: [90],        // Murs & Papier peint -> Décoller Papier Peint
};
