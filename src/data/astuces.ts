import { Astuce } from '@/types';

export const ASTUCES_DU_JOUR: Astuce[] = [
  {
    id: 1,
    titre: 'Four éclatant',
    emoji: '🔥',
    duree: '2h',
    note: 4.8,
    ingredients: ['Bicarbonate', 'Vinaigre', 'Eau'],
    resume: 'Dégraissez votre four naturellement sans effort',
    instructions: 'Mélangez bicarbonate + eau pour faire une pâte. Appliquez sur les parois du four. Laissez agir 2h. Vaporisez du vinaigre et essuyez avec une éponge humide.',
    conseil: 'Pour les taches tenaces, laissez agir toute la nuit !',
    surface: 'Four',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'
  },
  {
    id: 2,
    titre: 'Vitres sans traces',
    emoji: '🪟',
    duree: '10min',
    note: 4.9,
    ingredients: ['Vinaigre blanc', 'Eau', 'Journal'],
    resume: 'Des vitres cristallines comme chez le pro',
    instructions: 'Mélangez 1/3 vinaigre + 2/3 eau dans un spray. Vaporisez sur la vitre. Essuyez avec du papier journal froissé en mouvements circulaires.',
    conseil: 'Nettoyez par temps nuageux pour éviter les traces de séchage rapide.',
    surface: 'Vitres',
    gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)'
  },
  {
    id: 3,
    titre: 'WC étincelants',
    emoji: '🚽',
    duree: '15min',
    note: 4.7,
    ingredients: ['Acide citrique', 'Bicarbonate', 'HE tea tree'],
    resume: 'Détartrez en un geste',
    instructions: 'Saupoudrez 2 c.à.s de bicarbonate puis 2 c.à.s d\'acide citrique. Ajoutez quelques gouttes de tea tree. Laissez mousser 10min puis frottez.',
    conseil: 'Faites-le le soir et laissez agir toute la nuit pour un résultat optimal.',
    surface: 'WC',
    gradient: 'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)'
  },
  {
    id: 4,
    titre: 'Micro-ondes propre',
    emoji: '📺',
    duree: '5min',
    note: 4.6,
    ingredients: ['Citron', 'Eau'],
    resume: 'Nettoyage vapeur express sans frotter',
    instructions: 'Coupez un citron en deux dans un bol d\'eau. Faites chauffer 5 minutes à puissance max. La vapeur décolle les saletés, il ne reste qu\'à essuyer !',
    conseil: 'Gardez la porte fermée 2 minutes après pour que la vapeur agisse bien.',
    surface: 'Micro-ondes',
    gradient: 'linear-gradient(135deg, #FA709A 0%, #FEE140 100%)'
  },
  {
    id: 5,
    titre: 'Baskets blanches',
    emoji: '👟',
    duree: '1h',
    note: 4.9,
    ingredients: ['Bicarbonate', 'Eau oxygénée', 'Liquide vaisselle'],
    resume: 'Rendez leur éclat à vos baskets',
    instructions: 'Mélangez 1 c.à.s de bicarbonate + 1/2 c.à.s d\'eau oxygénée + 1/2 c.à.s de liquide vaisselle. Appliquez à la brosse à dents. Laissez sécher au soleil.',
    conseil: 'Le soleil active le blanchiment, c\'est magique !',
    surface: 'Baskets',
    gradient: 'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)'
  },
  {
    id: 6,
    titre: 'Joints blanchis',
    emoji: '⬜',
    duree: '30min',
    note: 4.5,
    ingredients: ['Percarbonate', 'Eau chaude', 'Brosse'],
    resume: 'Retrouvez des joints comme neufs',
    instructions: 'Dissolvez 2 c.à.s de percarbonate dans 1L d\'eau chaude. Appliquez sur les joints avec une brosse. Laissez agir 20min puis rincez.',
    conseil: 'L\'eau doit être à minimum 40°C pour activer le percarbonate.',
    surface: 'Joints',
    gradient: 'linear-gradient(135deg, #89F7FE 0%, #66A6FF 100%)'
  },
  {
    id: 7,
    titre: 'Poils d\'animaux envolés',
    emoji: '🐾',
    duree: '5min',
    note: 4.8,
    ingredients: ['Raclette à douche'],
    resume: 'Décollez les poils de chien et de chat des tapis, canapés et sièges auto, sans aspirateur',
    instructions: 'Passez la raclette à douche en caoutchouc sur le tapis, le canapé ou les sièges de voiture, toujours dans le même sens. Le caoutchouc crée une charge statique qui agglomère les poils en petits tas. Ramassez les amas formés, puis aspirez ou retirez-les à la main.',
    conseil: 'Sur les sièges de voiture, humidifiez très légèrement la raclette : les poils incrustés remontent d\'un seul coup. Tellement plus simple et efficace !',
    surface: 'Tapis & sièges',
    gradient: 'linear-gradient(135deg, #D4A373 0%, #BC8A5F 100%)'
  }
];
