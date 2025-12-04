export interface Tip {
  id: number;
  titre: string;
  contenu: string;
  emoji: string;
  categorie: 'eco' | 'astuce' | 'sante' | 'economie';
}

export const TIPS: Tip[] = [
  {
    id: 1,
    titre: 'Le vinaigre blanc',
    contenu: 'Le vinaigre blanc détartre, désinfecte et fait briller. Il remplace 5 produits ménagers chimiques !',
    emoji: '🧴',
    categorie: 'eco'
  },
  {
    id: 2,
    titre: 'Économies garanties',
    contenu: 'Passer au ménage naturel permet d\'économiser en moyenne 150€ par an en produits ménagers.',
    emoji: '💰',
    categorie: 'economie'
  },
  {
    id: 3,
    titre: 'Bicarbonate polyvalent',
    contenu: 'Le bicarbonate absorbe les odeurs, récure en douceur et blanchit le linge. Un vrai couteau suisse !',
    emoji: '⚪',
    categorie: 'astuce'
  },
  {
    id: 4,
    titre: 'Moins de plastique',
    contenu: 'Fabriquer ses produits ménagers réduit de 80% les emballages plastiques dans votre poubelle.',
    emoji: '🌍',
    categorie: 'eco'
  },
  {
    id: 5,
    titre: 'Air intérieur sain',
    contenu: 'Les produits naturels ne dégagent pas de COV, contrairement aux sprays industriels qui polluent l\'air.',
    emoji: '🌬️',
    categorie: 'sante'
  },
  {
    id: 6,
    titre: 'Le savon noir',
    contenu: 'Une cuillère de savon noir dilué nettoie tous les sols. Plus besoin de 10 produits différents !',
    emoji: '⚫',
    categorie: 'astuce'
  },
  {
    id: 7,
    titre: 'Conservation optimale',
    contenu: 'Vos sprays maison se conservent 2-3 mois. Notez la date de fabrication sur le flacon !',
    emoji: '📅',
    categorie: 'astuce'
  },
  {
    id: 8,
    titre: 'Citron détachant',
    contenu: 'Le jus de citron élimine les taches de rouille et fait briller le cuivre. 100% naturel !',
    emoji: '🍋',
    categorie: 'astuce'
  },
  {
    id: 9,
    titre: 'Allergies réduites',
    contenu: '30% des allergies domestiques sont liées aux produits ménagers industriels. Passez au naturel !',
    emoji: '🤧',
    categorie: 'sante'
  },
  {
    id: 10,
    titre: 'Eau chaude = efficacité',
    contenu: 'L\'eau chaude active les propriétés nettoyantes du bicarbonate et des cristaux de soude.',
    emoji: '🌡️',
    categorie: 'astuce'
  }
];
