import { Electromenager } from '@/types';

export const ELECTROMENAGERS: Electromenager[] = [
  {
    id: 1,
    nom: 'Lave-linge',
    emoji: '🧺',
    conso: '150-200 kWh/an',
    consoPct: 5,
    piece: 'Buanderie',
    color: 'bg-blue-500',
    nettoyer: {
      titre: 'Nettoyage tambour',
      ingredients: ['Vinaigre blanc', 'Bicarbonate de soude'],
      instructions: 'Versez 100g de bicarbonate dans le tambour et 1L de vinaigre blanc dans le bac à lessive. Lancez un cycle à 90°C à vide. Essuyez le joint et laissez la porte ouverte pour aérer.',
      duree: '2h',
      frequence: '1x/mois'
    },
    entretien: {
      calendrier: [
        { periode: 'Après chaque lavage', taches: ['Laisser la porte ouverte', 'Essuyer le joint'] },
        { periode: '1x/semaine', taches: ['Nettoyer le bac à lessive', 'Vérifier le filtre de vidange'] },
        { periode: '1x/mois', taches: ['Cycle à vide 90°C avec vinaigre', 'Détartrage complet'] },
        { periode: '1x/an', taches: ['Vérifier les tuyaux', 'Nettoyer le tambour en profondeur'] }
      ],
      economies: '15-20% sur la facture électrique avec un entretien régulier',
      alertes: ['Odeurs persistantes même après nettoyage', 'Linge mal essoré ou humide', 'Bruits anormaux pendant l\'essorage', 'Machine qui vibre excessivement']
    }
  },
  {
    id: 2,
    nom: 'Réfrigérateur',
    emoji: '🧊',
    conso: '150-400 kWh/an',
    consoPct: 20,
    piece: 'Cuisine',
    color: 'bg-emerald-500',
    conseils: {
      titre: 'Les conseils de Cleanz',
      items: [
        'Température idéale : entre 3°C et 4°C pour une conservation optimale',
        'Rangez les aliments crus en bas (viande, poisson) et les aliments cuits en haut',
        'Ne surchargez pas votre frigo : l\'air doit circuler librement',
        'Attendez que les plats refroidissent avant de les mettre au frigo',
        'Respectez la règle FIFO : First In, First Out (premier entré, premier sorti)',
        'Conservez les œufs dans leur boîte d\'origine, pas dans la porte'
      ]
    },
    nettoyer: {
      titre: 'Nettoyage intérieur',
      ingredients: ['Eau tiède', 'Bicarbonate de soude', 'Vinaigre blanc'],
      instructions: 'Videz le réfrigérateur. Mélangez 1L d\'eau tiède avec 2 c.à.s de bicarbonate. Nettoyez toutes les surfaces. Rincez avec un chiffon imbibé de vinaigre dilué. Séchez avant de remettre les aliments.',
      duree: '45min',
      frequence: '1x/mois'
    },
    entretien: {
      calendrier: [
        { periode: '1x/semaine', taches: ['Vérifier les dates de péremption', 'Essuyer les coulures'] },
        { periode: '1x/mois', taches: ['Nettoyage complet intérieur', 'Vérifier la température (3-4°C)'] },
        { periode: '1x/trimestre', taches: ['Nettoyer les joints de porte', 'Vérifier l\'étanchéité'] },
        { periode: '2x/an', taches: ['Nettoyer la grille arrière', 'Dégivrer le congélateur si nécessaire'] }
      ],
      economies: '20-30% d\'économie avec une grille arrière propre et des joints étanches',
      alertes: ['Givre excessif (>3mm)', 'Moteur qui tourne en continu', 'Joints abîmés ou décollés', 'Température instable']
    }
  },
  {
    id: 3,
    nom: 'Chaudière',
    emoji: '🔥',
    conso: '12000-20000 kWh/an',
    consoPct: 60,
    piece: 'Garage',
    color: 'bg-red-500',
    nettoyer: {
      titre: 'Entretien annuel',
      ingredients: ['Brosse métallique', 'Aspirateur'],
      instructions: 'L\'entretien annuel par un professionnel est obligatoire. Entre les visites : dépoussiérez les grilles d\'aération, vérifiez la pression (1-1,5 bar), purgez les radiateurs si nécessaire.',
      duree: '1h (par un pro)',
      frequence: '1x/an obligatoire'
    },
    entretien: {
      calendrier: [
        { periode: '1x/mois', taches: ['Vérifier la pression', 'Contrôler le voyant de fonctionnement'] },
        { periode: '1x/trimestre', taches: ['Purger les radiateurs', 'Dépoussiérer les grilles'] },
        { periode: '1x/an', taches: ['Entretien obligatoire par un pro', 'Ramonage si nécessaire'] }
      ],
      economies: '10-15% d\'économie avec un réglage optimal et une purge régulière',
      alertes: ['Pression anormale (<1 ou >2 bar)', 'Bruits de bouillonnement', 'Fumée ou odeur suspecte', 'Radiateurs froids en haut']
    }
  },
  {
    id: 4,
    nom: 'Lave-vaisselle',
    emoji: '🍽️',
    conso: '250 kWh/an',
    consoPct: 4,
    piece: 'Cuisine',
    color: 'bg-cyan-500',
    nettoyer: {
      titre: 'Nettoyage complet',
      ingredients: ['Vinaigre blanc', 'Bicarbonate de soude'],
      instructions: 'Placez un bol rempli de vinaigre blanc sur le panier supérieur. Saupoudrez du bicarbonate sur le fond. Lancez un cycle court à haute température. Nettoyez les joints avec une brosse.',
      duree: '1h',
      frequence: '1x/mois'
    },
    entretien: {
      calendrier: [
        { periode: '1x/semaine', taches: ['Nettoyer le filtre', 'Vérifier les bras de lavage'] },
        { periode: '1x/mois', taches: ['Cycle à vide avec vinaigre', 'Nettoyer les joints de porte'] },
        { periode: '1x/trimestre', taches: ['Détartrer les bras', 'Vérifier le sel et liquide de rinçage'] }
      ],
      economies: '15-20% d\'économie en utilisant le mode éco et en remplissant bien',
      alertes: ['Vaisselle encore sale après lavage', 'Odeurs désagréables', 'Eau stagnante au fond', 'Traces blanches sur la vaisselle']
    }
  },
  {
    id: 5,
    nom: 'Four',
    emoji: '♨️',
    conso: '100-150 kWh/an',
    consoPct: 3,
    piece: 'Cuisine',
    color: 'bg-orange-500',
    nettoyer: {
      titre: 'Dégraissage naturel',
      ingredients: ['Bicarbonate de soude', 'Eau', 'Vinaigre blanc'],
      instructions: 'Faites une pâte avec 3 c.à.s de bicarbonate et un peu d\'eau. Étalez sur les parois (évitez les résistances). Laissez agir 2h minimum. Vaporisez du vinaigre, frottez et essuyez.',
      duree: '2h30',
      frequence: '1x/mois'
    },
    entretien: {
      calendrier: [
        { periode: 'Après chaque utilisation', taches: ['Essuyer les projections quand tiède'] },
        { periode: '1x/mois', taches: ['Nettoyage complet', 'Nettoyer la vitre intérieure'] },
        { periode: '1x/an', taches: ['Vérifier les joints', 'Contrôler les résistances'] }
      ],
      economies: '10-15% d\'économie avec un four propre (meilleure diffusion de chaleur)',
      alertes: ['Fumée pendant la cuisson', 'Odeurs de brûlé persistantes', 'Porte qui ferme mal', 'Température inégale']
    }
  },
  {
    id: 6,
    nom: 'Climatisation',
    emoji: '❄️',
    conso: '500-1500 kWh/an',
    consoPct: 15,
    piece: 'Salon',
    color: 'bg-sky-500',
    nettoyer: {
      titre: 'Nettoyage filtres',
      ingredients: ['Eau savonneuse', 'Chiffon microfibre'],
      instructions: 'Éteignez l\'appareil. Retirez les filtres. Lavez-les à l\'eau savonneuse tiède. Laissez sécher complètement. Aspirez la poussière des grilles. Remettez les filtres en place.',
      duree: '30min',
      frequence: '1x/2 semaines en été'
    },
    entretien: {
      calendrier: [
        { periode: '1x/2 semaines (été)', taches: ['Nettoyer ou aspirer les filtres'] },
        { periode: '1x/mois', taches: ['Vérifier l\'évacuation des condensats', 'Nettoyer les grilles'] },
        { periode: '1x/an', taches: ['Entretien par un pro (obligatoire si >2kg de fluide)', 'Vérifier le gaz'] }
      ],
      economies: '15-25% d\'économie avec des filtres propres et une température de 26°C',
      alertes: ['Air moins frais qu\'avant', 'Bruits inhabituels', 'Mauvaises odeurs', 'Fuites d\'eau']
    }
  },
  {
    id: 7,
    nom: 'Sèche-linge',
    emoji: '🌀',
    conso: '300-500 kWh/an',
    consoPct: 8,
    piece: 'Buanderie',
    color: 'bg-violet-500',
    nettoyer: {
      titre: 'Nettoyage complet',
      ingredients: ['Aspirateur', 'Chiffon humide'],
      instructions: 'Nettoyez le filtre à peluches après CHAQUE cycle. Aspirez le conduit d\'évacuation mensuellement. Nettoyez les capteurs d\'humidité avec un chiffon humide. Videz le bac à eau si condensation.',
      duree: '20min',
      frequence: 'Filtre: après chaque usage / Complet: 1x/mois'
    },
    entretien: {
      calendrier: [
        { periode: 'Après chaque cycle', taches: ['Vider le filtre à peluches', 'Vider le bac à condensats'] },
        { periode: '1x/mois', taches: ['Aspirer le conduit d\'évacuation', 'Nettoyer les capteurs'] },
        { periode: '1x/trimestre', taches: ['Nettoyer le tambour', 'Vérifier la gaine d\'évacuation'] }
      ],
      economies: '25-30% d\'économie avec un filtre propre et un essorage optimal au préalable',
      alertes: ['Temps de séchage rallongé', 'Linge encore humide', 'Surchauffe de l\'appareil', 'Peluches excessives sur le linge']
    }
  },
  {
    id: 8,
    nom: 'Micro-ondes',
    emoji: '📺',
    conso: '50-100 kWh/an',
    consoPct: 2,
    piece: 'Cuisine',
    color: 'bg-purple-500',
    nettoyer: {
      titre: 'Nettoyage vapeur',
      ingredients: ['Eau', 'Citron ou vinaigre blanc'],
      instructions: 'Remplissez un bol d\'eau avec le jus d\'un citron ou 2 c.à.s de vinaigre. Chauffez 3-5min à pleine puissance. Laissez reposer 5min porte fermée. La vapeur décolle tout : essuyez simplement.',
      duree: '10min',
      frequence: '1x/semaine'
    },
    entretien: {
      calendrier: [
        { periode: 'Après chaque utilisation', taches: ['Couvrir les plats', 'Essuyer les projections'] },
        { periode: '1x/semaine', taches: ['Nettoyage vapeur', 'Nettoyer le plateau tournant'] },
        { periode: '1x/mois', taches: ['Nettoyer les grilles de ventilation'] }
      ],
      economies: '5-10% d\'économie en gardant l\'intérieur propre et en utilisant des couvercles',
      alertes: ['Étincelles à l\'intérieur', 'Odeurs de brûlé', 'Porte qui ferme mal', 'Plateau qui ne tourne plus']
    }
  },
  {
    id: 9,
    nom: 'Aspirateur',
    emoji: '🧹',
    conso: '20-50 kWh/an',
    consoPct: 1,
    piece: 'Rangement',
    color: 'bg-gray-500',
    nettoyer: {
      titre: 'Entretien complet',
      ingredients: ['Eau tiède', 'Brosse', 'Ciseaux'],
      instructions: 'Videz le sac ou bac à poussière quand il est aux 2/3 plein. Lavez les filtres à l\'eau tiède tous les mois. Retirez les cheveux et fils de la brosse rotative avec des ciseaux. Vérifiez le tuyau.',
      duree: '15min',
      frequence: '1x/mois'
    },
    entretien: {
      calendrier: [
        { periode: 'Après chaque utilisation', taches: ['Vérifier le niveau du sac/bac'] },
        { periode: '1x/mois', taches: ['Laver les filtres', 'Nettoyer la brosse rotative'] },
        { periode: '1x/trimestre', taches: ['Vérifier le tuyau', 'Contrôler les accessoires'] },
        { periode: '1x/an', taches: ['Remplacer les filtres HEPA', 'Vérifier le cordon'] }
      ],
      economies: '20-30% d\'efficacité en plus avec des filtres propres',
      alertes: ['Perte d\'aspiration', 'Surchauffe du moteur', 'Bruit anormal', 'Odeur de brûlé']
    }
  },
  {
    id: 10,
    nom: 'Cafetière',
    emoji: '☕',
    conso: '50-100 kWh/an',
    consoPct: 1,
    piece: 'Cuisine',
    color: 'bg-amber-700',
    nettoyer: {
      titre: 'Détartrage',
      ingredients: ['Vinaigre blanc', 'Eau'],
      instructions: 'Remplissez le réservoir avec moitié eau, moitié vinaigre blanc. Lancez un cycle complet. Rincez avec 2-3 cycles d\'eau claire. Pour les cafetières à dosettes : utilisez les pastilles détartrantes.',
      duree: '30min',
      frequence: '1x/mois'
    },
    entretien: {
      calendrier: [
        { periode: 'Quotidien', taches: ['Rincer le réservoir', 'Vider le marc/les capsules'] },
        { periode: '1x/semaine', taches: ['Nettoyer le bac récupérateur', 'Laver le porte-filtre'] },
        { periode: '1x/mois', taches: ['Détartrage complet', 'Nettoyer la buse vapeur'] }
      ],
      economies: '10-15% de consommation en moins avec une machine détartrée',
      alertes: ['Café qui coule lentement', 'Goût altéré ou amer', 'Dépôts blancs visibles', 'Machine bruyante']
    }
  },
  {
    id: 11,
    nom: 'Hotte',
    emoji: '💨',
    conso: '20-50 kWh/an',
    consoPct: 1,
    piece: 'Cuisine',
    color: 'bg-slate-500',
    nettoyer: {
      titre: 'Nettoyage filtres',
      ingredients: ['Cristaux de soude', 'Eau chaude', 'Liquide vaisselle'],
      instructions: 'Retirez les filtres métalliques. Trempez-les 30min dans de l\'eau chaude avec 2 c.à.s de cristaux de soude. Frottez avec une brosse, rincez et séchez. Pour les filtres à charbon : remplacez-les (non lavables).',
      duree: '45min',
      frequence: '1x/mois'
    },
    entretien: {
      calendrier: [
        { periode: '1x/semaine', taches: ['Essuyer l\'extérieur', 'Vérifier l\'état des filtres'] },
        { periode: '1x/mois', taches: ['Nettoyer les filtres métalliques'] },
        { periode: '1x/trimestre', taches: ['Remplacer le filtre à charbon (si recyclage)'] },
        { periode: '1x/an', taches: ['Vérifier le moteur', 'Nettoyer le conduit'] }
      ],
      economies: '15-20% d\'efficacité en plus avec des filtres propres',
      alertes: ['Aspiration faible', 'Bruits anormaux du moteur', 'Odeurs de cuisine persistantes', 'Graisse qui coule']
    }
  },
  {
    id: 12,
    nom: 'Chauffe-eau',
    emoji: '🚿',
    conso: '1500-3000 kWh/an',
    consoPct: 12,
    piece: 'Salle de bain',
    color: 'bg-teal-500',
    nettoyer: {
      titre: 'Détartrage',
      ingredients: ['Vinaigre blanc', 'Clé à molette'],
      instructions: 'Coupez l\'alimentation électrique. Vidangez le ballon. Détartrez la résistance (par un pro recommandé). Vérifiez l\'anode de magnésium. Réglez le thermostat à 55-60°C maximum.',
      duree: '1h (par un pro recommandé)',
      frequence: '1x/an'
    },
    entretien: {
      calendrier: [
        { periode: '1x/mois', taches: ['Vérifier qu\'il n\'y a pas de fuite', 'Contrôler le groupe de sécurité'] },
        { periode: '1x/trimestre', taches: ['Actionner la soupape de sécurité'] },
        { periode: '1x/an', taches: ['Vidange et détartrage', 'Vérifier l\'anode sacrificielle'] },
        { periode: 'Tous les 5 ans', taches: ['Remplacer l\'anode si nécessaire'] }
      ],
      economies: '15-20% d\'économie en réglant à 55-60°C et avec un détartrage régulier',
      alertes: ['Eau tiède seulement', 'Bruits de bouillonnement', 'Fuites au niveau du groupe', 'Consommation électrique anormale']
    }
  },
  // === NOUVEAUX APPAREILS ===
  {
    id: 13,
    nom: 'Bouilloire',
    emoji: '🫖',
    conso: '50-100 kWh/an',
    consoPct: 1,
    piece: 'Cuisine',
    color: 'bg-amber-500',
    nettoyer: {
      titre: 'Détartrage',
      ingredients: ['Acide citrique', 'Eau'],
      instructions: 'Remplissez la bouilloire d\'eau froide aux 3/4. Ajoutez 2 c.à.s d\'acide citrique. Faites bouillir et laissez agir 30 minutes. Videz et rincez plusieurs fois à l\'eau claire avant utilisation.',
      duree: '45min',
      frequence: '1x/mois (ou dès apparition de dépôts)'
    },
    entretien: {
      calendrier: [
        { periode: '1x/semaine', taches: ['Vider l\'eau stagnante', 'Rincer l\'intérieur'] },
        { periode: '1x/mois', taches: ['Détartrage complet à l\'acide citrique'] },
        { periode: '1x/trimestre', taches: ['Nettoyer l\'extérieur', 'Vérifier le filtre anti-calcaire'] }
      ],
      economies: '10-15% d\'économie avec une bouilloire détartrée (chauffe plus vite)',
      alertes: ['Temps de chauffe rallongé', 'Dépôts blancs visibles', 'Goût altéré de l\'eau', 'Bruits inhabituels']
    }
  },
  {
    id: 14,
    nom: 'Congélateur',
    emoji: '🧊',
    conso: '200-400 kWh/an',
    consoPct: 8,
    piece: 'Cuisine',
    color: 'bg-blue-400',
    conseils: {
      titre: 'Les conseils de Cleanz',
      items: [
        'Température idéale : -18°C pour une congélation optimale',
        'Étiquetez tous vos aliments avec la date de congélation',
        'Ne recongelez jamais un produit décongelé (sauf si cuit entre-temps)',
        'Laissez refroidir les plats avant de les congeler',
        'Respectez les durées de conservation : viande 6-12 mois, légumes 8-12 mois, plats cuisinés 2-3 mois',
        'Dégivrez dès que le givre atteint 3mm d\'épaisseur'
      ]
    },
    nettoyer: {
      titre: 'Dégivrage et nettoyage',
      ingredients: ['Eau tiède', 'Bicarbonate de soude', 'Chiffon microfibre'],
      instructions: 'Débranchez l\'appareil. Sortez tous les aliments (placez-les dans une glacière). Laissez la porte ouverte pour le dégivrage. Nettoyez avec 1L d\'eau + 2 c.à.s de bicarbonate. Séchez bien avant de rebrancher.',
      duree: '2-4h',
      frequence: '2x/an (ou quand givre >3mm)'
    },
    entretien: {
      calendrier: [
        { periode: '1x/mois', taches: ['Vérifier la température (-18°C)', 'Organiser et trier les aliments'] },
        { periode: '1x/trimestre', taches: ['Vérifier les dates de congélation', 'Nettoyer les joints'] },
        { periode: '2x/an', taches: ['Dégivrage complet', 'Nettoyage intérieur'] }
      ],
      economies: '30% d\'économie avec un dégivrage régulier et une température stable',
      alertes: ['Givre excessif (>3mm)', 'Aliments qui décongèlent', 'Température instable', 'Moteur bruyant']
    }
  },
  {
    id: 15,
    nom: 'Airfryer',
    emoji: '🍟',
    conso: '50-100 kWh/an',
    consoPct: 1,
    piece: 'Cuisine',
    color: 'bg-orange-400',
    nettoyer: {
      titre: 'Nettoyage complet',
      ingredients: ['Liquide vaisselle', 'Bicarbonate de soude', 'Éponge non abrasive'],
      instructions: 'Débranchez et laissez refroidir. Retirez le panier et le bac. Lavez-les à l\'eau chaude savonneuse. Pour les graisses incrustées, faites tremper avec du bicarbonate. Essuyez l\'intérieur avec un chiffon humide. Nettoyez la résistance du haut avec une brosse douce.',
      duree: '20min',
      frequence: 'Après chaque utilisation'
    },
    entretien: {
      calendrier: [
        { periode: 'Après chaque utilisation', taches: ['Laver le panier et le bac', 'Essuyer l\'intérieur'] },
        { periode: '1x/semaine', taches: ['Nettoyer la résistance du haut', 'Vérifier les grilles'] },
        { periode: '1x/mois', taches: ['Dégraissage complet', 'Nettoyer les entrées d\'air'] }
      ],
      economies: '70% d\'économie vs un four traditionnel pour les petites quantités',
      alertes: ['Odeurs de brûlé', 'Fumée pendant la cuisson', 'Aliments mal cuits', 'Ventilateur bruyant']
    }
  },
  {
    id: 16,
    nom: 'Fer à repasser',
    emoji: '👔',
    conso: '30-50 kWh/an',
    consoPct: 1,
    piece: 'Buanderie',
    color: 'bg-indigo-500',
    nettoyer: {
      titre: 'Détartrage semelle',
      ingredients: ['Vinaigre blanc', 'Bicarbonate de soude', 'Chiffon doux'],
      instructions: 'Semelle froide : frottez avec un chiffon imbibé de vinaigre blanc. Pour les trous vapeur bouchés, utilisez un coton-tige trempé dans le vinaigre. Remplissez le réservoir de vinaigre dilué (50/50 eau), faites chauffer et utilisez la vapeur sur un vieux tissu.',
      duree: '30min',
      frequence: '1x/mois'
    },
    entretien: {
      calendrier: [
        { periode: 'Après chaque utilisation', taches: ['Vider le réservoir d\'eau', 'Ranger à la verticale'] },
        { periode: '1x/mois', taches: ['Détartrer le réservoir', 'Nettoyer la semelle'] },
        { periode: '1x/trimestre', taches: ['Vérifier le câble', 'Nettoyer les trous vapeur'] }
      ],
      economies: 'Une semelle propre glisse mieux et réduit le temps de repassage de 20%',
      alertes: ['Traces sur les vêtements', 'Vapeur faible ou irrégulière', 'Eau qui coule', 'Semelle qui accroche']
    }
  },
  {
    id: 17,
    nom: 'Centrale vapeur',
    emoji: '💨',
    conso: '100-200 kWh/an',
    consoPct: 2,
    piece: 'Buanderie',
    color: 'bg-indigo-400',
    nettoyer: {
      titre: 'Détartrage réservoir',
      ingredients: ['Vinaigre blanc', 'Eau déminéralisée'],
      instructions: 'Videz le réservoir. Remplissez avec 1/3 vinaigre blanc et 2/3 eau. Laissez agir 2h. Faites fonctionner la vapeur sur un vieux tissu. Rincez plusieurs fois à l\'eau claire. Utilisez toujours de l\'eau déminéralisée ensuite.',
      duree: '2h30',
      frequence: '1x/mois'
    },
    entretien: {
      calendrier: [
        { periode: 'Après chaque utilisation', taches: ['Vider le réservoir', 'Laisser refroidir avant rangement'] },
        { periode: '1x/mois', taches: ['Détartrage complet', 'Nettoyer la semelle'] },
        { periode: '1x/trimestre', taches: ['Vérifier les joints', 'Nettoyer le collecteur de calcaire'] }
      ],
      economies: 'Une centrale détartrée consomme 15% d\'énergie en moins',
      alertes: ['Vapeur faible', 'Dépôts calcaires qui tachent', 'Bruit de pompe anormal', 'Fuites d\'eau']
    }
  },
  {
    id: 18,
    nom: 'Aspirateur eau/poussière',
    emoji: '💦',
    conso: '50-100 kWh/an',
    consoPct: 1,
    piece: 'Buanderie',
    color: 'bg-blue-600',
    nettoyer: {
      titre: 'Nettoyage cuve et filtres',
      ingredients: ['Eau claire', 'Liquide vaisselle', 'Brosse'],
      instructions: 'Videz la cuve après chaque utilisation. Lavez-la à l\'eau savonneuse et séchez bien. Rincez les filtres à l\'eau claire (vérifiez s\'ils sont lavables). Laissez sécher 24h avant remontage. Vérifiez l\'état des joints.',
      duree: '30min',
      frequence: 'Après chaque utilisation eau / 1x/semaine poussière'
    },
    entretien: {
      calendrier: [
        { periode: 'Après utilisation eau', taches: ['Vider et sécher la cuve', 'Rincer le tuyau'] },
        { periode: '1x/semaine', taches: ['Nettoyer les filtres', 'Vérifier le flotteur'] },
        { periode: '1x/mois', taches: ['Nettoyer la cuve en profondeur', 'Vérifier les accessoires'] },
        { periode: '1x/an', taches: ['Remplacer les filtres si nécessaire', 'Vérifier le moteur'] }
      ],
      economies: 'Des filtres propres maintiennent 100% de la puissance d\'aspiration',
      alertes: ['Perte d\'aspiration', 'Mauvaises odeurs', 'Moteur qui surchauffe', 'Eau qui remonte']
    }
  },
  {
    id: 19,
    nom: 'Robot aspirateur laveur',
    emoji: '🤖',
    conso: '20-40 kWh/an',
    consoPct: 1,
    piece: 'Buanderie',
    color: 'bg-emerald-400',
    nettoyer: {
      titre: 'Entretien complet',
      ingredients: ['Chiffon microfibre', 'Brosse de nettoyage', 'Eau claire'],
      instructions: 'Videz le bac à poussière après chaque cycle. Nettoyez les brosses rotatives (retirez cheveux et fils). Essuyez les capteurs avec un chiffon sec. Lavez les serpillières à 40°C. Nettoyez la station de vidage/lavage si équipé.',
      duree: '15min',
      frequence: 'Bac: quotidien / Complet: 1x/semaine'
    },
    entretien: {
      calendrier: [
        { periode: 'Après chaque cycle', taches: ['Vider le bac à poussière', 'Vérifier les roues'] },
        { periode: '1x/semaine', taches: ['Nettoyer les brosses', 'Laver les serpillières', 'Essuyer les capteurs'] },
        { periode: '1x/mois', taches: ['Nettoyer les filtres', 'Vérifier l\'usure des brosses', 'Nettoyer la station'] },
        { periode: '1x/an', taches: ['Remplacer les filtres et brosses usés'] }
      ],
      economies: 'Un robot bien entretenu conserve son efficacité et sa batterie plus longtemps',
      alertes: ['Robot qui tourne en rond', 'Aspiration faible', 'Serpillières qui sentent', 'Batterie qui ne tient plus']
    }
  },
  {
    id: 20,
    nom: 'Nettoyeur vapeur',
    emoji: '♨️',
    conso: '30-60 kWh/an',
    consoPct: 1,
    piece: 'Buanderie',
    color: 'bg-rose-500',
    nettoyer: {
      titre: 'Détartrage',
      ingredients: ['Vinaigre blanc', 'Eau déminéralisée'],
      instructions: 'Videz complètement le réservoir. Remplissez avec 1/2 vinaigre blanc et 1/2 eau. Laissez agir 2h sans allumer. Faites fonctionner la vapeur sur un vieux tissu. Rincez 2-3 fois à l\'eau claire avant utilisation normale.',
      duree: '2h30',
      frequence: '1x/mois (ou selon dureté de l\'eau)'
    },
    entretien: {
      calendrier: [
        { periode: 'Après chaque utilisation', taches: ['Vider le réservoir', 'Ranger les accessoires secs'] },
        { periode: '1x/mois', taches: ['Détartrage complet', 'Nettoyer les bonnettes/brosses'] },
        { periode: '1x/trimestre', taches: ['Vérifier les joints', 'Contrôler le câble'] }
      ],
      economies: 'Un nettoyeur vapeur détartré chauffe 30% plus vite',
      alertes: ['Vapeur faible', 'Dépôts blancs qui sortent', 'Temps de chauffe rallongé', 'Fuites']
    }
  },
  {
    id: 21,
    nom: 'Purificateur d\'air',
    emoji: '🌬️',
    conso: '20-50 kWh/an',
    consoPct: 1,
    piece: 'Salon',
    color: 'bg-cyan-400',
    nettoyer: {
      titre: 'Entretien filtres',
      ingredients: ['Aspirateur', 'Chiffon humide'],
      instructions: 'Éteignez l\'appareil. Retirez le pré-filtre et aspirez-le ou lavez-le (si lavable). Le filtre HEPA ne se lave pas : remplacez-le selon les indications. Essuyez l\'extérieur avec un chiffon humide. Nettoyez les grilles d\'entrée/sortie d\'air.',
      duree: '15min',
      frequence: 'Pré-filtre: 1x/2 semaines / HEPA: selon indicateur'
    },
    entretien: {
      calendrier: [
        { periode: '1x/2 semaines', taches: ['Aspirer ou laver le pré-filtre'] },
        { periode: '1x/mois', taches: ['Nettoyer les grilles', 'Essuyer l\'extérieur'] },
        { periode: 'Selon indicateur', taches: ['Remplacer le filtre HEPA', 'Remplacer le filtre charbon'] }
      ],
      economies: 'Un filtre propre consomme 20% d\'énergie en moins et purifie mieux l\'air',
      alertes: ['Indicateur de remplacement', 'Bruit de ventilation', 'Odeurs persistantes', 'Débit d\'air faible']
    }
  }
];

// Regroupement par pièce
export const PIECES = ['Toutes', 'Cuisine', 'Buanderie', 'Salon', 'Salle de bain', 'Garage', 'Rangement'] as const;
export type Piece = typeof PIECES[number];

// Tips sur l'énergie
export interface EnergyTip {
  id: number;
  emoji: string;
  titre: string;
  contenu: string;
  categorie: 'eco' | 'astuce' | 'economie' | 'sante';
}

export const ENERGY_TIPS: EnergyTip[] = [
  {
    id: 1,
    emoji: '💡',
    titre: 'Le réfrigérateur, champion de la conso',
    contenu: 'Votre frigo représente 20% de votre facture ! Nettoyez la grille arrière 2x/an pour réduire sa consommation de 30%.',
    categorie: 'economie'
  },
  {
    id: 2,
    emoji: '🧊',
    titre: '3mm de givre = 30% de plus',
    contenu: 'Une couche de givre de 3mm dans votre congélateur augmente la consommation de 30%. Dégivrez régulièrement !',
    categorie: 'eco'
  },
  {
    id: 3,
    emoji: '🧺',
    titre: 'Lavage à 30°C = 70% d\'économie',
    contenu: 'Laver à 30°C au lieu de 60°C consomme 70% d\'électricité en moins. Le linge sera tout aussi propre !',
    categorie: 'economie'
  },
  {
    id: 4,
    emoji: '🌀',
    titre: 'Essorage max avant séchage',
    contenu: 'Un bon essorage (1200+ tours) avant le sèche-linge réduit le temps de séchage de 25% !',
    categorie: 'astuce'
  },
  {
    id: 5,
    emoji: '♨️',
    titre: 'Four propre = chaleur optimale',
    contenu: 'Un four encrassé consomme jusqu\'à 15% de plus. Les résidus absorbent la chaleur au lieu de la diffuser.',
    categorie: 'eco'
  },
  {
    id: 6,
    emoji: '❄️',
    titre: '1°C de moins = 7% d\'économie',
    contenu: 'Chaque degré en moins sur la clim représente 7% d\'économie. Préférez 26°C plutôt que 23°C !',
    categorie: 'economie'
  },
  {
    id: 7,
    emoji: '🔥',
    titre: 'Chaudière : l\'entretien obligatoire',
    contenu: 'L\'entretien annuel de votre chaudière est obligatoire et peut vous faire économiser 10-15% sur votre facture.',
    categorie: 'sante'
  },
  {
    id: 8,
    emoji: '☕',
    titre: 'Calcaire = surconsommation',
    contenu: 'Une cafetière entartrée consomme jusqu\'à 25% de plus et abîme la machine. Détartrez tous les mois !',
    categorie: 'astuce'
  }
];
