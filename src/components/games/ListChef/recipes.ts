import type { Recipe } from './types';

export const recipes: Recipe[] = [
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
];
