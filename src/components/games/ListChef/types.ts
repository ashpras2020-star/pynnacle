export interface Recipe {
  name: string;
  ingredients: string[];
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type Ingredient = string;
