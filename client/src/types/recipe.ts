export interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  isVegetarian: boolean;
  prepTimeMinutes: number;
  ingredients: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  instructions: string;
  tags: string[];
  imageUrl?: string;
}

export interface RecipeFilters {
  search: string;
  cuisine: string;
  isVegetarian: boolean | null;
  maxPrepTime: number | null;
  difficulty: string;
  tags: string[];
}
