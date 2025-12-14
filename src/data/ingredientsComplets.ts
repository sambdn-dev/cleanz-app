import { IngredientComplet } from '@/types';

export const INGREDIENTS_COMPLETS: IngredientComplet[] = [
  {
    id: 1,
    nom: 'Vinaigre blanc',
    emoji: '🧴',
    gradient: 'linear-gradient(135deg, #A8E6CF 0%, #88D8B0 100%)',
    badge: 'Incontournable',
    fonctions: ['Détartrant', 'Désinfectant', 'Dégraissant', 'Assouplissant'],
    description: 'Le champion incontesté du ménage naturel ! Acide acétique dilué à 8-14%, il dissout le calcaire et désinfecte naturellement.',
    bienfaits: [
      'Élimine 99% des bactéries',
      'Dissout le calcaire efficacement',
      'Neutralise les mauvaises odeurs',
      'Alternative écologique à la javel'
    ],
    utilisations: [
      'Détartrage robinetterie et bouilloire',
      'Nettoyage des vitres sans traces',
      'Assouplissant naturel pour le linge',
      'Désinfection des surfaces'
    ],
    surfaces: ['Carrelage', 'Vitres', 'Robinetterie', 'Électroménager', 'Joints'],
    recettesIds: [1, 2, 3, 6, 9, 12, 13, 14, 17, 18, 24, 26, 27, 29, 33, 38, 48, 49, 50, 71, 72],
    prix: '€',
    prixMoyen: '~0.50€/L',
    scoreEcologique: 5,
    conservation: '2 ans à l\'abri de la lumière',
    precautions: [
      'Ne pas utiliser sur le marbre et pierre naturelle',
      'Éviter le contact avec les yeux',
      'Ne jamais mélanger avec la javel (gaz toxiques)'
    ],
    origineNaturelle: 'Fermentation de l\'alcool de betterave ou de maïs',
    essentiel: true
  },
  {
    id: 2,
    nom: 'Bicarbonate de soude',
    emoji: '⚪',
    gradient: 'linear-gradient(135deg, #E8E8E8 0%, #D4D4D4 100%)',
    badge: 'Polyvalent',
    fonctions: ['Abrasif doux', 'Désodorisant', 'Fongicide', 'Nettoyant'],
    description: 'Poudre blanche miracle aux mille usages ! Légèrement abrasif, il nettoie en douceur sans rayer.',
    bienfaits: [
      'Nettoie sans rayer les surfaces',
      'Absorbe et neutralise les odeurs',
      'Action fongicide naturelle',
      'Régule le pH'
    ],
    utilisations: [
      'Poudre à récurer douce',
      'Désodorisant frigo et poubelle',
      'Blanchisseur de joints',
      'Nettoyant pour four'
    ],
    surfaces: ['Évier', 'Four', 'Joints', 'Tapis', 'Matelas', 'Frigo'],
    recettesIds: [7, 11, 13, 15, 16, 20, 21, 30, 31, 33, 38, 39, 40, 41, 42],
    prix: '€',
    prixMoyen: '~3€/kg',
    scoreEcologique: 5,
    conservation: '3 ans dans un récipient hermétique',
    precautions: [
      'Éviter le contact prolongé avec la peau',
      'Ne pas utiliser sur aluminium',
      'Rincer abondamment après usage'
    ],
    origineNaturelle: 'Minéral naturel (natron) ou synthèse du sel',
    essentiel: true
  },
  {
    id: 3,
    nom: 'Savon noir',
    emoji: '⚫',
    gradient: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
    badge: 'Multi-usage',
    fonctions: ['Dégraissant', 'Détachant', 'Insecticide', 'Nourrissant'],
    description: 'Savon ancestral à base d\'huile d\'olive ou de lin, il dégraisse puissamment tout en étant doux pour les surfaces.',
    bienfaits: [
      'Dégraisse efficacement',
      'Nourrit et fait briller le bois',
      'Biodégradable à 100%',
      'Insecticide naturel au jardin'
    ],
    utilisations: [
      'Nettoyant sol carrelage et tomettes',
      'Dégraissant cuisine',
      'Détachant textile',
      'Entretien du bois'
    ],
    surfaces: ['Sols', 'Cuisine', 'Bois', 'Cuir', 'Terrasse', 'Textile'],
    recettesIds: [1, 2, 7, 9, 15, 16, 21, 30, 39, 44, 53, 54, 58, 75],
    prix: '€€',
    prixMoyen: '~8€/L',
    scoreEcologique: 5,
    conservation: '2 ans',
    precautions: [
      'Bien diluer avant usage',
      'Éviter sur pierre poreuse non traitée',
      'Peut foncer certains bois clairs'
    ],
    origineNaturelle: 'Saponification d\'huile d\'olive ou de lin',
    essentiel: true
  },
  {
    id: 4,
    nom: 'Savon de Marseille',
    emoji: '🧼',
    gradient: 'linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%)',
    badge: 'Traditionnel',
    fonctions: ['Nettoyant', 'Détachant', 'Antibactérien', 'Hypoallergénique'],
    description: 'Le savon traditionnel par excellence ! Fabriqué à partir d\'huiles végétales, il est ultra-doux et hypoallergénique.',
    bienfaits: [
      'Hypoallergénique',
      'Sans parfum synthétique',
      'Très économique à l\'usage',
      'Convient aux peaux sensibles'
    ],
    utilisations: [
      'Lessive maison',
      'Détachant pré-lavage',
      'Savon ménager multi-usage',
      'Nettoyant pinceaux et brosses'
    ],
    surfaces: ['Textile', 'Brosses', 'Outils', 'Sol'],
    recettesIds: [4, 11, 19, 37, 47],
    prix: '€',
    prixMoyen: '~6€/400g',
    scoreEcologique: 5,
    conservation: 'Indéfinie si gardé au sec',
    precautions: [
      'Vérifier la composition (72% huile végétale min)',
      'Éviter les contrefaçons à l\'huile de palme',
      'Peut laisser un voile sur surfaces sombres'
    ],
    origineNaturelle: 'Saponification d\'huiles végétales (olive, coprah)',
    essentiel: true
  },
  {
    id: 5,
    nom: 'Cristaux de soude',
    emoji: '💎',
    gradient: 'linear-gradient(135deg, #87CEEB 0%, #4169E1 100%)',
    badge: 'Puissant',
    fonctions: ['Dégraissant puissant', 'Déboucheur', 'Décapant', 'Adoucisseur d\'eau'],
    description: 'Version plus concentrée du bicarbonate, les cristaux de soude sont redoutables contre les graisses cuites.',
    bienfaits: [
      'Dégraisse les surfaces très encrassées',
      'Débouche les canalisations',
      'Adoucit l\'eau calcaire',
      'Ravive les couleurs du linge'
    ],
    utilisations: [
      'Dégraissant four et hotte',
      'Entretien des canalisations',
      'Lessive renforcée',
      'Décrassage poêles et casseroles'
    ],
    surfaces: ['Four', 'Hotte', 'Casseroles', 'Canalisations', 'BBQ'],
    recettesIds: [2, 10, 11, 31, 43, 44],
    prix: '€',
    prixMoyen: '~4€/kg',
    scoreEcologique: 5,
    conservation: '5 ans au sec',
    precautions: [
      'Toujours porter des gants',
      'Ne pas utiliser sur aluminium',
      'Éviter contact avec la peau et les yeux'
    ],
    origineNaturelle: 'Extraction du natron ou synthèse du sel',
    essentiel: true
  },
  {
    id: 6,
    nom: 'Acide citrique',
    emoji: '🍋',
    gradient: 'linear-gradient(135deg, #FFF176 0%, #FFEB3B 100%)',
    badge: 'Anti-calcaire',
    fonctions: ['Détartrant', 'Antirouille', 'Conservateur', 'Nettoyant'],
    description: 'Acide naturel extrait des agrumes, c\'est le roi du détartrage ! Plus puissant que le vinaigre sur le calcaire.',
    bienfaits: [
      'Détartre plus efficacement que le vinaigre',
      'Élimine les traces de rouille',
      'Fait briller la robinetterie',
      'Sans odeur persistante'
    ],
    utilisations: [
      'Détartrage bouilloire et cafetière',
      'Anti-calcaire salle de bain',
      'Nettoyant WC',
      'Raviveur d\'inox'
    ],
    surfaces: ['Robinetterie', 'Bouilloire', 'Cafetière', 'WC', 'Inox', 'Parois douche'],
    recettesIds: [7, 8, 10, 31, 32, 34, 51, 52],
    prix: '€€',
    prixMoyen: '~8€/kg',
    scoreEcologique: 5,
    conservation: '5 ans au sec et à l\'abri de l\'humidité',
    precautions: [
      'Éviter le contact avec les yeux',
      'Ne pas utiliser sur marbre et pierre calcaire',
      'Rincer abondamment après usage'
    ],
    origineNaturelle: 'Fermentation de mélasse de betterave ou d\'agrumes',
    essentiel: true
  },
  {
    id: 7,
    nom: 'Percarbonate de soude',
    emoji: '✨',
    gradient: 'linear-gradient(135deg, #E1F5FE 0%, #81D4FA 100%)',
    badge: 'Blanchisseur',
    fonctions: ['Blanchissant', 'Détachant', 'Désinfectant', 'Désodorisant'],
    description: 'La « javel écologique » ! Il libère de l\'oxygène actif au contact de l\'eau chaude pour blanchir et désinfecter.',
    bienfaits: [
      'Blanchit le linge sans chlore',
      'Détache les taches organiques',
      'Désinfecte naturellement',
      'Respecte les fibres textiles'
    ],
    utilisations: [
      'Blanchiment du linge',
      'Détachant avant lavage',
      'Nettoyage des joints',
      'Désinfection des surfaces'
    ],
    surfaces: ['Textile blanc', 'Joints', 'Terrasse', 'Mobilier jardin'],
    recettesIds: [4, 10, 19, 37, 45, 46, 47],
    prix: '€€',
    prixMoyen: '~6€/kg',
    scoreEcologique: 5,
    conservation: '2 ans au sec dans emballage hermétique',
    precautions: [
      'Utiliser uniquement avec eau chaude (+40°C)',
      'Ne pas utiliser sur soie, laine, tissus colorés fragiles',
      'Porter des gants pour les fortes concentrations'
    ],
    origineNaturelle: 'Association de carbonate de sodium et peroxyde d\'hydrogène',
    essentiel: true
  },
  {
    id: 8,
    nom: 'Huile essentielle de citron',
    emoji: '🍋',
    gradient: 'linear-gradient(135deg, #FFF9C4 0%, #FDD835 100%)',
    badge: 'Assainissant',
    fonctions: ['Parfumant', 'Antibactérien', 'Dégraissant', 'Assainissant'],
    description: 'Extraite du zeste de citron, cette HE apporte fraîcheur et propriétés antibactériennes à vos produits.',
    bienfaits: [
      'Parfum frais et énergisant',
      'Propriétés antibactériennes',
      'Aide au dégraissage',
      'Purifie l\'air ambiant'
    ],
    utilisations: [
      'Parfumer les produits ménagers',
      'Assainir l\'air',
      'Renforcer l\'action dégraissante',
      'Désodoriser naturellement'
    ],
    surfaces: ['Toutes surfaces', 'Air ambiant'],
    recettesIds: [9, 16, 17, 21],
    prix: '€€',
    prixMoyen: '~5€/10ml',
    scoreEcologique: 4,
    conservation: '3 ans à l\'abri de la lumière',
    precautions: [
      'Photosensibilisant : éviter l\'exposition au soleil',
      'Diluer impérativement',
      'Déconseillé femmes enceintes et enfants -3 ans'
    ],
    origineNaturelle: 'Expression à froid du zeste de citron',
    essentiel: false
  },
  {
    id: 9,
    nom: 'Huile essentielle de tea tree',
    emoji: '🌿',
    gradient: 'linear-gradient(135deg, #A5D6A7 0%, #66BB6A 100%)',
    badge: 'Désinfectant',
    fonctions: ['Antifongique', 'Antibactérien', 'Antiviral', 'Purifiant'],
    description: 'L\'HE aux propriétés antibactériennes les plus puissantes ! Idéale pour désinfecter et lutter contre les moisissures.',
    bienfaits: [
      'Puissant antibactérien naturel',
      'Efficace contre les moisissures',
      'Action antivirale reconnue',
      'Assainit les surfaces'
    ],
    utilisations: [
      'Désinfectant surfaces sanitaires',
      'Anti-moisissures',
      'Nettoyant WC',
      'Assainisseur d\'air'
    ],
    surfaces: ['WC', 'Salle de bain', 'Joints', 'Poubelle'],
    recettesIds: [6, 7, 14, 22, 71, 72],
    prix: '€€',
    prixMoyen: '~7€/10ml',
    scoreEcologique: 4,
    conservation: '5 ans',
    precautions: [
      'Ne pas ingérer',
      'Éviter contact peau pure',
      'Déconseillé femmes enceintes et enfants -3 ans'
    ],
    origineNaturelle: 'Distillation des feuilles de Melaleuca alternifolia (Australie)',
    essentiel: false
  },
  {
    id: 10,
    nom: 'Huile essentielle de lavande',
    emoji: '💜',
    gradient: 'linear-gradient(135deg, #E1BEE7 0%, #CE93D8 100%)',
    badge: 'Apaisant',
    fonctions: ['Parfumant', 'Antiseptique', 'Répulsif insectes', 'Relaxant'],
    description: 'L\'HE la plus polyvalente ! Parfum agréable, propriétés antiseptiques et action répulsive contre les mites.',
    bienfaits: [
      'Parfum relaxant et agréable',
      'Propriétés antiseptiques',
      'Repousse naturellement les mites',
      'Assainit le linge'
    ],
    utilisations: [
      'Assouplissant parfumé',
      'Anti-mites naturel',
      'Parfum d\'ambiance',
      'Nettoyant multi-surface'
    ],
    surfaces: ['Linge', 'Armoires', 'Toutes surfaces'],
    recettesIds: [5, 18, 73],
    prix: '€€',
    prixMoyen: '~6€/10ml',
    scoreEcologique: 4,
    conservation: '5 ans',
    precautions: [
      'Diluer avant usage',
      'Prudence chez les asthmatiques',
      'Éviter au 1er trimestre de grossesse'
    ],
    origineNaturelle: 'Distillation des fleurs de lavande vraie',
    essentiel: false
  },
  {
    id: 11,
    nom: 'Alcool ménager',
    emoji: '🔬',
    gradient: 'linear-gradient(135deg, #B2EBF2 0%, #4DD0E1 100%)',
    badge: 'Désinfectant',
    fonctions: ['Désinfectant', 'Dégraissant', 'Nettoyant', 'Sèche vite'],
    description: 'Alcool dénaturé puissant pour désinfecter et faire briller. Sèche sans laisser de traces.',
    bienfaits: [
      'Sèche très rapidement',
      'Ne laisse pas de traces',
      'Puissant désinfectant',
      'Dégraisse efficacement'
    ],
    utilisations: [
      'Nettoyant vitres sans traces',
      'Désinfectant surfaces',
      'Dégraissant rapide',
      'Nettoyant électronique (dilué)'
    ],
    surfaces: ['Vitres', 'Miroirs', 'Inox', 'Surfaces lisses', 'Écrans', 'Électronique'],
    recettesIds: [3, 22, 23, 24, 25, 26, 27, 73, 76, 77],
    prix: '€',
    prixMoyen: '~3€/L',
    scoreEcologique: 3,
    conservation: 'Indéfinie si bien fermé',
    precautions: [
      'Très inflammable',
      'Utiliser dans un endroit aéré',
      'Tenir éloigné des flammes'
    ],
    origineNaturelle: 'Distillation et dénaturation d\'alcool de betterave',
    essentiel: true
  },
  {
    id: 12,
    nom: 'Terre de Sommières',
    emoji: '🏜️',
    gradient: 'linear-gradient(135deg, #D7CCC8 0%, #BCAAA4 100%)',
    badge: 'Détachant sec',
    fonctions: ['Absorbant', 'Détachant', 'Désodorisant', 'Dégraissant à sec'],
    description: 'Argile naturelle ultra-absorbante, elle détache à sec les taches de gras sans eau ni frottement.',
    bienfaits: [
      'Absorbe les taches grasses à sec',
      'Ne nécessite pas d\'eau',
      'Préserve les tissus délicats',
      'Élimine les odeurs'
    ],
    utilisations: [
      'Détachant taches de gras',
      'Nettoyant cuir et daim',
      'Absorbant litières',
      'Désodorisant tapis'
    ],
    surfaces: ['Textile', 'Cuir', 'Daim', 'Tapis', 'Matelas'],
    recettesIds: [],
    prix: '€€',
    prixMoyen: '~8€/kg',
    scoreEcologique: 5,
    conservation: 'Indéfinie au sec',
    precautions: [
      'Ne pas inhaler la poudre',
      'Tester sur zone cachée',
      'Laisser agir plusieurs heures'
    ],
    origineNaturelle: 'Argile smectique extraite à Sommières (Gard)',
    essentiel: false
  },
  {
    id: 13,
    nom: 'Blanc de Meudon',
    emoji: '🪨',
    gradient: 'linear-gradient(135deg, #FAFAFA 0%, #E0E0E0 100%)',
    badge: 'Polissant',
    fonctions: ['Polissant', 'Nettoyant', 'Anti-traces', 'Abrasif doux'],
    description: 'Craie naturelle finement broyée, idéale pour faire briller l\'argenterie et nettoyer les vitres.',
    bienfaits: [
      'Fait briller l\'argenterie',
      'Nettoie les vitres sans traces',
      'Polit les métaux',
      'Très doux, ne raye pas'
    ],
    utilisations: [
      'Nettoyant argenterie',
      'Polissant cuivre et laiton',
      'Nettoyant vitres',
      'Pâte à polir'
    ],
    surfaces: ['Argenterie', 'Cuivre', 'Laiton', 'Vitres', 'Inox'],
    recettesIds: [],
    prix: '€',
    prixMoyen: '~5€/kg',
    scoreEcologique: 5,
    conservation: 'Indéfinie au sec',
    precautions: [
      'Ne pas inhaler',
      'Bien rincer après usage',
      'Éviter sur surfaces peintes'
    ],
    origineNaturelle: 'Carbonate de calcium extrait des carrières de Meudon',
    essentiel: false
  },
  {
    id: 14,
    nom: 'Glycérine végétale',
    emoji: '🌿',
    gradient: 'linear-gradient(135deg, #DCEDC8 0%, #AED581 100%)',
    badge: 'Assouplissant',
    fonctions: ['Assouplissant', 'Antistatique', 'Hydratant', 'Lubrifiant'],
    description: 'Liquide sirupeux d\'origine végétale, elle assouplit les fibres et crée un film antistatique.',
    bienfaits: [
      'Assouplit les textiles',
      'Effet antistatique',
      'Attire et retient la poussière',
      'Lubrifie les mécanismes'
    ],
    utilisations: [
      'Spray anti-poussière',
      'Assouplissant linge',
      'Produit pour vitres',
      'Entretien cuir'
    ],
    surfaces: ['Meubles', 'Linge', 'Cuir', 'Vitres'],
    recettesIds: [5],
    prix: '€€',
    prixMoyen: '~10€/L',
    scoreEcologique: 4,
    conservation: '2 ans',
    precautions: [
      'Utiliser avec parcimonie',
      'Peut laisser un film si surdosée',
      'Bien secouer les mélanges'
    ],
    origineNaturelle: 'Sous-produit de la saponification d\'huiles végétales',
    essentiel: false
  },
  {
    id: 15,
    nom: 'Huile d\'olive',
    emoji: '🫒',
    gradient: 'linear-gradient(135deg, #C5E1A5 0%, #9CCC65 100%)',
    badge: 'Nourrissant',
    fonctions: ['Nourrissant', 'Lustrant', 'Protecteur', 'Nettoyant'],
    description: 'Pas seulement pour la cuisine ! Elle nourrit le bois, fait briller l\'inox et entretient le cuir.',
    bienfaits: [
      'Nourrit et protège le bois',
      'Fait briller l\'inox',
      'Entretient le cuir naturellement',
      'Élimine les autocollants'
    ],
    utilisations: [
      'Entretien meubles en bois',
      'Lustrant inox',
      'Soin du cuir',
      'Décollant étiquettes'
    ],
    surfaces: ['Bois', 'Inox', 'Cuir', 'Surfaces collantes'],
    recettesIds: [5, 12, 17],
    prix: '€€',
    prixMoyen: '~8€/L',
    scoreEcologique: 4,
    conservation: '18 mois',
    precautions: [
      'Utiliser avec parcimonie',
      'Essuyer l\'excédent',
      'Peut rancir sur le long terme'
    ],
    origineNaturelle: 'Pression à froid des olives',
    essentiel: false
  },
  {
    id: 16,
    nom: 'Sel',
    emoji: '🧂',
    gradient: 'linear-gradient(135deg, #F5F5F5 0%, #EEEEEE 100%)',
    badge: 'Abrasif',
    fonctions: ['Abrasif', 'Absorbant', 'Fixateur', 'Dégivrant'],
    description: 'Le sel de cuisine est un allié ménager sous-estimé ! Abrasif naturel et excellent absorbant.',
    bienfaits: [
      'Abrasif naturel économique',
      'Absorbe les liquides renversés',
      'Fixe les couleurs au lavage',
      'Débouche les canalisations'
    ],
    utilisations: [
      'Gommage des casseroles',
      'Absorbant vin renversé',
      'Fixateur couleurs textiles',
      'Débouchage canalisations'
    ],
    surfaces: ['Casseroles', 'Planches à découper', 'Canalisations', 'Textile'],
    recettesIds: [10, 13],
    prix: '€',
    prixMoyen: '~0.50€/kg',
    scoreEcologique: 5,
    conservation: 'Indéfinie au sec',
    precautions: [
      'Rincer abondamment après usage',
      'Ne pas utiliser sur surfaces sensibles à la corrosion',
      'Le gros sel est plus efficace comme abrasif'
    ],
    origineNaturelle: 'Évaporation de l\'eau de mer ou extraction minière',
    essentiel: false
  },
  {
    id: 17,
    nom: 'Eau oxygénée',
    emoji: '💧',
    gradient: 'linear-gradient(135deg, #E3F2FD 0%, #90CAF9 100%)',
    badge: 'Blanchissant',
    fonctions: ['Blanchissant', 'Désinfectant', 'Détachant', 'Désodorisant'],
    description: 'Peroxyde d\'hydrogène dilué (10-12 vol), il blanchit et désinfecte en libérant de l\'oxygène.',
    bienfaits: [
      'Blanchit les joints et textiles',
      'Désinfecte naturellement',
      'Élimine les taches organiques',
      'Se décompose en eau et oxygène'
    ],
    utilisations: [
      'Blanchiment des joints',
      'Détachant sang et vin',
      'Désinfectant planches à découper',
      'Nettoyant WC'
    ],
    surfaces: ['Joints', 'Textile blanc', 'Planches à découper', 'WC'],
    recettesIds: [20, 81],
    prix: '€',
    prixMoyen: '~3€/L',
    scoreEcologique: 5,
    conservation: '6 mois après ouverture',
    precautions: [
      'Utiliser des gants',
      'Peut décolorer les textiles colorés',
      'Conserver au frais et à l\'abri de la lumière'
    ],
    origineNaturelle: 'Synthèse chimique (électrolyse ou anthraquinone)',
    essentiel: false
  },
  {
    id: 18,
    nom: 'Huile essentielle d\'eucalyptus',
    emoji: '🍃',
    gradient: 'linear-gradient(135deg, #C8E6C9 0%, #81C784 100%)',
    badge: 'Purifiant',
    fonctions: ['Antiseptique', 'Décongestionnant', 'Répulsif', 'Parfumant'],
    description: 'HE aux propriétés antiseptiques puissantes, elle purifie l\'air et éloigne les insectes.',
    bienfaits: [
      'Purifie et assainit l\'air',
      'Propriétés antiseptiques',
      'Repousse les insectes',
      'Parfum frais et vivifiant'
    ],
    utilisations: [
      'Désinfectant surfaces',
      'Assainisseur d\'air',
      'Répulsif insectes',
      'Nettoyant sanitaires'
    ],
    surfaces: ['Air ambiant', 'Sanitaires', 'Toutes surfaces'],
    recettesIds: [6],
    prix: '€€',
    prixMoyen: '~5€/10ml',
    scoreEcologique: 4,
    conservation: '5 ans',
    precautions: [
      'Contre-indiqué aux asthmatiques',
      'Éviter chez les enfants -6 ans',
      'Ne pas diffuser en présence d\'animaux'
    ],
    origineNaturelle: 'Distillation des feuilles d\'eucalyptus globulus',
    essentiel: false
  },
  {
    id: 19,
    nom: 'Liquide vaisselle écologique',
    emoji: '🫧',
    gradient: 'linear-gradient(135deg, #B3E5FC 0%, #4FC3F7 100%)',
    badge: 'Tensioactif',
    fonctions: ['Dégraissant', 'Moussant', 'Émulsifiant', 'Nettoyant'],
    description: 'Version écologique du liquide vaisselle, il apporte le pouvoir moussant et dégraissant aux recettes.',
    bienfaits: [
      'Apporte le pouvoir moussant',
      'Émulsionne huile et eau',
      'Dégraisse efficacement',
      'Améliore l\'adhérence des mélanges'
    ],
    utilisations: [
      'Ajout dans les sprays nettoyants',
      'Émulsifiant pour mélanges',
      'Nettoyant renforcé',
      'Détachant textile'
    ],
    surfaces: ['Toutes surfaces', 'Vaisselle', 'Textile'],
    recettesIds: [8, 20, 24, 25, 26, 28, 29, 98, 100],
    prix: '€€',
    prixMoyen: '~5€/L',
    scoreEcologique: 4,
    conservation: '1 an',
    precautions: [
      'Choisir un label écologique (Ecocert, Ecolabel)',
      'Doser avec parcimonie',
      'Bien rincer après usage'
    ],
    origineNaturelle: 'Tensioactifs d\'origine végétale',
    essentiel: false
  },
  {
    id: 20,
    nom: 'Cire d\'abeille',
    emoji: '🐝',
    gradient: 'linear-gradient(135deg, #FFE082 0%, #FFD54F 100%)',
    badge: 'Protecteur',
    fonctions: ['Protecteur', 'Lustrant', 'Imperméabilisant', 'Nourrissant'],
    description: 'Cire naturelle aux propriétés protectrices et lustrantes, idéale pour le bois et le cuir.',
    bienfaits: [
      'Protège et imperméabilise',
      'Nourrit le bois en profondeur',
      'Fait briller naturellement',
      'Parfum naturel agréable'
    ],
    utilisations: [
      'Cire pour meubles',
      'Protection du bois',
      'Entretien du cuir',
      'Fabrication d\'emballages réutilisables'
    ],
    surfaces: ['Bois', 'Cuir', 'Parquet', 'Meubles'],
    recettesIds: [],
    prix: '€€€',
    prixMoyen: '~25€/kg',
    scoreEcologique: 5,
    conservation: 'Indéfinie',
    precautions: [
      'Appliquer en fine couche',
      'Lustrer après application',
      'Éviter près des sources de chaleur'
    ],
    origineNaturelle: 'Sécrétée par les abeilles pour construire les rayons',
    essentiel: false
  }
];

// Catégories pour filtrage des ingrédients
export const CATEGORIES_INGREDIENTS = [
  { id: 'all', nom: 'Tous', emoji: '📋' },
  { id: 'essentiel', nom: 'Essentiels', emoji: '⭐' },
  { id: 'detartrant', nom: 'Détartrants', emoji: '💎' },
  { id: 'degraissant', nom: 'Dégraissants', emoji: '💪' },
  { id: 'desinfectant', nom: 'Désinfectants', emoji: '🦠' },
  { id: 'abrasif', nom: 'Abrasifs', emoji: '✨' },
  { id: 'blanchissant', nom: 'Blanchissants', emoji: '🤍' },
  { id: 'parfumant', nom: 'Parfumants', emoji: '🌸' }
];
