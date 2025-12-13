import { Ingredient } from '@/types';

export const INGREDIENTS: Ingredient[] = [
  { id: 1, nom: 'Bicarbonate de soude', emoji: '⚪', fonctions: ['Dégraissant', 'Désodorisant', 'Abrasif doux'], essentiel: true, prix: '2-4€/kg', description: 'Le bicarbonate de soude est un indispensable du ménage naturel.' },
  { id: 2, nom: 'Vinaigre blanc', emoji: '🧴', fonctions: ['Détartrant', 'Désinfectant', 'Anti-calcaire'], essentiel: true, prix: '0.50€/L', description: 'Le vinaigre blanc est le champion anti-calcaire.' },
  { id: 3, nom: 'Acide citrique', emoji: '🍋', fonctions: ['Détartrant', 'Anti-calcaire', 'Anti-rouille'], essentiel: true, prix: '5-8€/kg', description: "L'acide citrique est le détartrant naturel par excellence." },
  { id: 4, nom: 'Savon noir', emoji: '⚫', fonctions: ['Dégraissant', 'Insecticide', 'Multi-surfaces'], essentiel: true, prix: '5-10€/L', description: "Le savon noir à l'huile d'olive est un dégraissant puissant." },
  { id: 5, nom: 'Percarbonate', emoji: '✨', fonctions: ['Blanchissant', 'Détachant', 'Désinfectant'], essentiel: true, prix: '4-6€/kg', description: "Le percarbonate de soude est l'eau oxygénée en poudre." },
  { id: 6, nom: 'Savon de Marseille', emoji: '🧼', fonctions: ['Détachant', 'Hypoallergénique', 'Lessive'], essentiel: true, prix: '5-10€', description: 'Trésor de Provence, le savon de Marseille authentique est hypoallergénique.' },
  { id: 7, nom: 'Pierre blanche', emoji: '🪨', fonctions: ['Désincrustant', 'Polissant', 'Protecteur'], essentiel: true, prix: '8-15€', description: 'La pierre blanche nettoie, dégraisse, polit et protège.' },
  { id: 8, nom: 'Cristaux de soude', emoji: '💎', fonctions: ['Dégraissant puissant', 'Déboucheur'], essentiel: false, prix: '3-5€/kg', description: 'Les cristaux de soude sont le dégraissant ultime.' },
  { id: 9, nom: 'Alcool ménager', emoji: '🔬', fonctions: ['Désinfectant', 'Vitres', 'Anti-traces'], essentiel: true, prix: '3-5€/L', description: "L'alcool ménager désinfecte et s'évapore sans traces." },
  { id: 10, nom: 'Terre de Sommières', emoji: '🟤', fonctions: ['Absorbant', 'Détachant sec'], essentiel: false, prix: '6-10€/kg', description: 'Cette argile naturelle absorbe les taches grasses sans eau.' },
];
