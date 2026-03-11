import type { ListChefGame } from '../../../types/game';

export const module6ListChefGame: ListChefGame = {
  id: 'listchef-module6',
  moduleId: 'module-6',
  title: 'List Chef: Collections Kitchen',
  description: 'Master Python list methods by cooking up delicious recipes! Use .append(), .remove(), .insert(), and more to create the perfect dishes.',
  timeLimit: 300, // 5 minutes
  goalPoints: 2000,
  baseXP: 100,
  bonusXP: 50,
  recipes: [
    {
      name: 'Simple Salad',
      ingredients: ['🥬', '🍅', '🥒'],
      points: 300,
      difficulty: 'easy'
    },
    {
      name: 'Cheese Pizza',
      ingredients: ['🍞', '🍅', '🧀'],
      points: 300,
      difficulty: 'easy'
    },
    {
      name: 'Burger',
      ingredients: ['🍞', '🥩', '🧀', '🥬', '🍅', '🍞'],
      points: 400,
      difficulty: 'medium'
    },
    {
      name: 'Fruit Smoothie',
      ingredients: ['🍓', '🍌', '🥤'],
      points: 300,
      difficulty: 'easy'
    },
    {
      name: 'Taco',
      ingredients: ['🌮', '🥩', '🧀', '🥬', '🍅'],
      points: 400,
      difficulty: 'medium'
    },
    {
      name: 'Sushi Roll',
      ingredients: ['🍚', '🐟', '🥒', '🥑'],
      points: 500,
      difficulty: 'hard'
    },
    {
      name: 'Pasta',
      ingredients: ['🍝', '🍅', '🧀', '🌿'],
      points: 400,
      difficulty: 'medium'
    },
    {
      name: 'Sandwich',
      ingredients: ['🍞', '🥓', '🥬', '🍅', '🍞'],
      points: 300,
      difficulty: 'easy'
    }
  ]
};
