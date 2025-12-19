import { Recipe } from '@/types/recipe';

export const recipes: Recipe[] = [
  {
    id: "rec_101",
    name: "Paneer Butter Masala",
    cuisine: "Indian",
    isVegetarian: true,
    prepTimeMinutes: 40,
    ingredients: ["paneer", "tomato", "cream", "butter", "spices", "onion", "garlic", "ginger"],
    difficulty: "medium",
    instructions: "Step 1: Cut paneer into cubes and lightly fry until golden. Step 2: Blend tomatoes, onion, and cashews into a smooth paste. Step 3: Heat butter in a pan, add the paste and cook for 10 minutes. Step 4: Add spices (garam masala, turmeric, red chili powder). Step 5: Add cream and mix well. Step 6: Add paneer cubes and simmer for 5 minutes. Step 7: Garnish with fresh cream and coriander leaves.",
    tags: ["dinner", "rich", "party", "comfort food"],
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800"
  },
  {
    id: "rec_102",
    name: "Mediterranean Quinoa Bowl",
    cuisine: "Mediterranean",
    isVegetarian: true,
    prepTimeMinutes: 25,
    ingredients: ["quinoa", "cucumber", "tomato", "feta cheese", "olives", "olive oil", "lemon", "herbs"],
    difficulty: "easy",
    instructions: "Step 1: Cook quinoa according to package instructions. Step 2: Dice cucumber and tomatoes. Step 3: Mix cooled quinoa with vegetables. Step 4: Add crumbled feta and olives. Step 5: Dress with olive oil and lemon juice. Step 6: Season with salt, pepper, and fresh herbs.",
    tags: ["lunch", "healthy", "quick", "summer"],
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800"
  },
  {
    id: "rec_103",
    name: "Classic Beef Tacos",
    cuisine: "Mexican",
    isVegetarian: false,
    prepTimeMinutes: 30,
    ingredients: ["ground beef", "taco shells", "lettuce", "tomato", "cheese", "sour cream", "taco seasoning", "onion"],
    difficulty: "easy",
    instructions: "Step 1: Brown ground beef with diced onion. Step 2: Add taco seasoning and water, simmer until thickened. Step 3: Warm taco shells. Step 4: Shred lettuce and dice tomatoes. Step 5: Assemble tacos with meat, lettuce, tomato, cheese, and sour cream.",
    tags: ["dinner", "quick", "family favorite", "weeknight"],
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800"
  },
  {
    id: "rec_104",
    name: "Thai Green Curry",
    cuisine: "Thai",
    isVegetarian: false,
    prepTimeMinutes: 45,
    ingredients: ["chicken", "coconut milk", "green curry paste", "bamboo shoots", "thai basil", "fish sauce", "vegetables"],
    difficulty: "medium",
    instructions: "Step 1: Cut chicken into bite-sized pieces. Step 2: Heat oil in a wok and fry curry paste until fragrant. Step 3: Add chicken and cook until white. Step 4: Pour in coconut milk and bring to simmer. Step 5: Add vegetables and bamboo shoots. Step 6: Season with fish sauce and sugar. Step 7: Garnish with Thai basil.",
    tags: ["dinner", "spicy", "aromatic"],
    imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800"
  },
  {
    id: "rec_105",
    name: "Margherita Pizza",
    cuisine: "Italian",
    isVegetarian: true,
    prepTimeMinutes: 60,
    ingredients: ["pizza dough", "tomato sauce", "mozzarella", "fresh basil", "olive oil", "garlic"],
    difficulty: "medium",
    instructions: "Step 1: Preheat oven to 450°F (230°C). Step 2: Stretch pizza dough on floured surface. Step 3: Spread tomato sauce evenly. Step 4: Add sliced mozzarella. Step 5: Drizzle with olive oil. Step 6: Bake for 12-15 minutes until crust is golden. Step 7: Top with fresh basil leaves.",
    tags: ["dinner", "classic", "comfort food", "party"],
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800"
  },
  {
    id: "rec_106",
    name: "Japanese Miso Soup",
    cuisine: "Japanese",
    isVegetarian: true,
    prepTimeMinutes: 15,
    ingredients: ["miso paste", "tofu", "wakame seaweed", "green onion", "dashi stock"],
    difficulty: "easy",
    instructions: "Step 1: Bring dashi stock to a gentle simmer. Step 2: Add cubed tofu and rehydrated wakame. Step 3: Remove from heat. Step 4: Dissolve miso paste in a small amount of broth, then add to soup. Step 5: Garnish with sliced green onions. Step 6: Serve immediately.",
    tags: ["breakfast", "light", "healthy", "quick"],
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800"
  },
  {
    id: "rec_107",
    name: "French Onion Soup",
    cuisine: "French",
    isVegetarian: true,
    prepTimeMinutes: 90,
    ingredients: ["onions", "beef broth", "butter", "gruyere cheese", "baguette", "thyme", "white wine"],
    difficulty: "hard",
    instructions: "Step 1: Slice onions thinly. Step 2: Caramelize onions in butter for 45 minutes over low heat. Step 3: Deglaze with white wine. Step 4: Add beef broth and thyme, simmer 20 minutes. Step 5: Ladle into oven-safe bowls. Step 6: Top with toasted baguette slices and gruyere. Step 7: Broil until cheese is bubbly and golden.",
    tags: ["dinner", "winter", "comfort food", "elegant"],
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800"
  },
  {
    id: "rec_108",
    name: "Chickpea Curry",
    cuisine: "Indian",
    isVegetarian: true,
    prepTimeMinutes: 35,
    ingredients: ["chickpeas", "tomato", "onion", "garlic", "ginger", "coconut milk", "curry powder", "cilantro"],
    difficulty: "easy",
    instructions: "Step 1: Sauté onion, garlic, and ginger until fragrant. Step 2: Add curry powder and cook for 1 minute. Step 3: Add diced tomatoes and cook down. Step 4: Add chickpeas and coconut milk. Step 5: Simmer for 15-20 minutes. Step 6: Season with salt and garnish with fresh cilantro.",
    tags: ["dinner", "healthy", "vegan", "protein-rich"],
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800"
  },
  {
    id: "rec_109",
    name: "Grilled Salmon",
    cuisine: "American",
    isVegetarian: false,
    prepTimeMinutes: 20,
    ingredients: ["salmon fillet", "lemon", "garlic", "olive oil", "dill", "salt", "pepper"],
    difficulty: "easy",
    instructions: "Step 1: Preheat grill to medium-high. Step 2: Mix olive oil, minced garlic, lemon juice, and dill. Step 3: Brush salmon with marinade. Step 4: Season with salt and pepper. Step 5: Grill skin-side down for 4-5 minutes. Step 6: Flip and cook 3-4 more minutes. Step 7: Serve with lemon wedges.",
    tags: ["dinner", "healthy", "quick", "protein"],
    imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800"
  },
  {
    id: "rec_110",
    name: "Vegetable Stir Fry",
    cuisine: "Chinese", 
    isVegetarian: true,
    prepTimeMinutes: 20,
    ingredients: ["broccoli", "bell pepper", "carrot", "snap peas", "soy sauce", "garlic", "ginger", "sesame oil"],
    difficulty: "easy",
    instructions: "Step 1: Cut all vegetables into bite-sized pieces. Step 2: Heat wok over high heat with sesame oil. Step 3: Add garlic and ginger, stir for 30 seconds. Step 4: Add vegetables starting with carrots. Step 5: Stir fry for 5-7 minutes. Step 6: Add soy sauce and toss to coat. Step 7: Serve over rice.",
    tags: ["dinner", "healthy", "quick", "weeknight"],
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800"
  }
];

export const cuisines = [...new Set(recipes.map(r => r.cuisine))];
export const allTags = [...new Set(recipes.flatMap(r => r.tags))];
export const difficulties = ['easy', 'medium', 'hard'];
