import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, X, ChefHat, Loader2 } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import { cn } from '@/lib/utils';

interface AISuggestionPanelProps {
  onSuggest: (ingredients: string[]) => void;
  isLoading: boolean;
  suggestions: Recipe[] | null;
  aiResponse: string | null;
  onSelectRecipe: (recipe: Recipe) => void;
}

const commonIngredients = [
  'chicken', 'beef', 'tofu', 'rice', 'pasta', 'tomato', 'onion', 'garlic',
  'cheese', 'eggs', 'mushrooms', 'bell pepper', 'broccoli', 'potatoes'
];

export function AISuggestionPanel({
  onSuggest,
  isLoading,
  suggestions,
  aiResponse,
  onSelectRecipe,
}: AISuggestionPanelProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addIngredient = (ingredient: string) => {
    const trimmed = ingredient.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInputValue('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const handleSubmit = () => {
    if (ingredients.length > 0) {
      onSuggest(ingredients);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 to-warm-amber/5 rounded-2xl p-6 border border-primary/20 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground">AI Recipe Suggestions</h2>
          <p className="text-sm text-muted-foreground">Tell us what ingredients you have</p>
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Add an ingredient..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addIngredient(inputValue);
            }
          }}
          className="flex-1"
        />
        <Button onClick={() => addIngredient(inputValue)} disabled={!inputValue.trim()}>
          Add
        </Button>
      </div>

      {/* Quick add */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">Quick add:</p>
        <div className="flex flex-wrap gap-1.5">
          {commonIngredients
            .filter((i) => !ingredients.includes(i))
            .slice(0, 8)
            .map((ingredient) => (
              <Badge
                key={ingredient}
                variant="outline"
                className="cursor-pointer hover:bg-secondary transition-colors text-xs"
                onClick={() => addIngredient(ingredient)}
              >
                + {ingredient}
              </Badge>
            ))}
        </div>
      </div>

      {/* Selected ingredients */}
      {ingredients.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-foreground mb-2">Your ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient) => (
              <Badge key={ingredient} variant="default" className="gap-1.5 pr-1.5">
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      <Button
        variant="ai"
        className="w-full"
        onClick={handleSubmit}
        disabled={ingredients.length === 0 || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Finding recipes...
          </>
        ) : (
          <>
            <ChefHat className="h-4 w-4" />
            Get AI Suggestions
          </>
        )}
      </Button>

      {/* AI Response */}
      {aiResponse && (
        <div className="mt-4 p-4 bg-card rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2 text-primary font-medium text-sm">
            <Sparkles className="h-4 w-4" />
            AI Recommendation
          </div>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{aiResponse}</p>
        </div>
      )}

      {/* Matching Recipes */}
      {suggestions && suggestions.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-foreground mb-3">Matching recipes in our collection:</p>
          <div className="space-y-2">
            {suggestions.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className={cn(
                  "w-full p-3 rounded-lg border border-border bg-card",
                  "hover:border-primary/50 hover:shadow-sm transition-all text-left",
                  "flex items-center gap-3"
                )}
              >
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{recipe.name}</p>
                  <p className="text-xs text-muted-foreground">{recipe.cuisine} • {recipe.prepTimeMinutes} min</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
