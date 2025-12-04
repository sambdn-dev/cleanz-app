import { Electromenager } from '@/types';

export const ELECTROMENAGERS: Electromenager[] = [
  {
    id: 1,
    nom: 'Lave-linge',
    emoji: '🧺',
    conso: '150-200 kWh/an',
    color: 'bg-blue-500',
    nettoyer: {
      titre: 'Nettoyage tambour',
      ingredients: ['Vinaigre blanc', 'Bicarbonate de soude'],
      instructions: 'Versez 1L de vinaigre blanc + 100g de bicarbonate dans le tambour. Lancez un cycle à 90°C à vide.',
      duree: '1h30',
      frequence: '1x/mois'
    },
    entretien: {
      calendrier: [
        { periode: 'Après chaque lavage', taches: ['Laisser la porte ouverte', 'Essuyer le joint'] },
        { periode: '1x/semaine', taches: ['Nettoyer le bac à lessive', 'Vérifier le filtre'] },
        { periode: '1x/mois', taches: ['Cycle à vide 90°C', 'Détartrage complet'] }
      ],
      economies: 'Un lave-linge entretenu consomme 15% moins',
      alertes: ['Mauvaises odeurs = nettoyage urgent', 'Linge mal essoré = filtre bouché']
    }
  },
  {
    id: 2,
    nom: 'Lave-vaisselle',
    emoji: '🍽️',
    conso: '250 kWh/an',
    color: 'bg-cyan-500',
    nettoyer: {
      titre: 'Nettoyage complet',
      ingredients: ['Vinaigre blanc', 'Bicarbonate'],
      instructions: 'Placez un bol de vinaigre en haut, saupoudrez bicarbonate en bas. Cycle court à chaud.',
      duree: '45min',
      frequence: '1x/mois'
    },
    entretien: {
      calendrier: [
        { periode: '1x/semaine', taches: ['Nettoyer le filtre', 'Vérifier les bras'] },
        { periode: '1x/mois', taches: ['Cycle à vide avec vinaigre', 'Nettoyer les joints'] }
      ],
      economies: 'Utilisez le mode éco pour économiser 30%',
      alertes: ['Vaisselle sale = bras bouchés', 'Odeurs = filtre à nettoyer']
    }
  },
  {
    id: 3,
    nom: 'Réfrigérateur',
    emoji: '🧊',
    conso: '150-400 kWh/an',
    color: 'bg-emerald-500',
    nettoyer: {
      titre: 'Nettoyage intérieur',
      ingredients: ['Eau tiède', 'Bicarbonate', 'Vinaigre blanc'],
      instructions: 'Videz le frigo. Nettoyez avec eau + bicarbonate. Rincez au vinaigre dilué.',
      duree: '30min',
      frequence: '1x/mois'
    },
    entretien: {
      calendrier: [
        { periode: '1x/semaine', taches: ['Vérifier les dates', 'Essuyer les coulures'] },
        { periode: '1x/mois', taches: ['Nettoyage complet', 'Vérifier la température'] },
        { periode: '2x/an', taches: ['Nettoyer la grille arrière', 'Dégivrer si nécessaire'] }
      ],
      economies: 'Une grille propre = 30% d\'économie',
      alertes: ['Givre excessif = joint défaillant', 'Moteur chaud = grille à nettoyer']
    }
  },
  {
    id: 4,
    nom: 'Four',
    emoji: '🔥',
    conso: '100-150 kWh/an',
    color: 'bg-orange-500',
    nettoyer: {
      titre: 'Dégraissage naturel',
      ingredients: ['Bicarbonate', 'Eau', 'Vinaigre blanc'],
      instructions: 'Faites une pâte bicarbonate + eau. Appliquez, laissez 2h. Vaporisez vinaigre et essuyez.',
      duree: '2h30',
      frequence: '1x/mois'
    },
    entretien: {
      calendrier: [
        { periode: 'Après utilisation', taches: ['Essuyer les projections'] },
        { periode: '1x/mois', taches: ['Nettoyage complet', 'Nettoyer la vitre'] },
        { periode: '1x/an', taches: ['Vérifier les résistances'] }
      ],
      economies: 'Four propre = meilleure diffusion chaleur',
      alertes: ['Fumée = graisse brûlée', 'Odeurs = résidus à nettoyer']
    }
  },
  {
    id: 5,
    nom: 'Micro-ondes',
    emoji: '📺',
    conso: '50-100 kWh/an',
    color: 'bg-violet-500',
    nettoyer: {
      titre: 'Nettoyage vapeur',
      ingredients: ['Eau', 'Citron ou vinaigre'],
      instructions: 'Bol d\'eau + jus de citron. Chauffez 5min puissance max. Laissez reposer 2min. Essuyez.',
      duree: '10min',
      frequence: '1x/semaine'
    },
    entretien: {
      calendrier: [
        { periode: 'Après utilisation', taches: ['Essuyer les projections', 'Couvrir les plats'] },
        { periode: '1x/semaine', taches: ['Nettoyage vapeur', 'Nettoyer le plateau'] }
      ],
      economies: 'Couvrir les plats = moins de nettoyage',
      alertes: ['Étincelles = métal à l\'intérieur', 'Odeurs = résidus brûlés']
    }
  },
  {
    id: 6,
    nom: 'Cafetière',
    emoji: '☕',
    conso: '50-100 kWh/an',
    color: 'bg-amber-700',
    nettoyer: {
      titre: 'Détartrage',
      ingredients: ['Vinaigre blanc', 'Eau'],
      instructions: 'Remplissez de moitié eau + moitié vinaigre. Lancez un cycle. Rincez 2x à l\'eau claire.',
      duree: '30min',
      frequence: '1x/mois'
    },
    entretien: {
      calendrier: [
        { periode: 'Quotidien', taches: ['Rincer le réservoir', 'Vider le marc'] },
        { periode: '1x/semaine', taches: ['Nettoyer le bac à capsules/marc'] },
        { periode: '1x/mois', taches: ['Détartrage complet'] }
      ],
      economies: 'Une cafetière détartrée consomme 25% moins',
      alertes: ['Café coule lentement = calcaire', 'Goût altéré = nettoyage urgent']
    }
  }
];
