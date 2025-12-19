import { Recipe } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ChefHat, Leaf, ArrowLeft, Sparkles, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onSimplify: () => void;
  isSimplifying: boolean;
  simplifiedInstructions: string | null;
}

const difficultyColors = {
  easy: 'bg-accent/20 text-accent border-accent/30',
  medium: 'bg-primary/20 text-primary border-primary/30',
  hard: 'bg-destructive/20 text-destructive border-destructive/30',
};

export function RecipeDetail({
  recipe,
  onBack,
  onSimplify,
  isSimplifying,
  simplifiedInstructions,
}: RecipeDetailProps) {
  const instructions = recipe.instructions.split(/Step \d+:/).filter(Boolean);

  return (
    <div className="animate-fade-in">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-4 gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Recipes
      </Button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative">
          <img
            src={recipe.imageUrl || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800'}
            alt={recipe.name}
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {recipe.isVegetarian && (
              <span className="bg-accent text-accent-foreground p-2 rounded-full shadow-md">
                <Leaf className="h-5 w-5" />
              </span>
            )}
            <Badge className={cn('shadow-md', difficultyColors[recipe.difficulty])}>
              {recipe.difficulty}
            </Badge>
          </div>
        </div>

        {/* Info Section */}
        <div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">{recipe.name}</h1>
          <p className="text-xl text-muted-foreground mb-6">{recipe.cuisine} Cuisine</p>

          <div className="flex items-center gap-6 text-muted-foreground mb-6">
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium">{recipe.prepTimeMinutes} minutes</span>
            </span>
            <span className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              <span className="font-medium">{recipe.ingredients.length} ingredients</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Ingredients */}
          <div className="bg-card rounded-xl p-6 shadow-card mb-6">
            <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">🥘</span> Ingredients
            </h2>
            <ul className="grid grid-cols-2 gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="capitalize">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="mt-8 bg-card rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2">
            <span className="text-2xl">📋</span> Instructions
          </h2>
          <Button
            variant="ai"
            onClick={onSimplify}
            disabled={isSimplifying}
            className="gap-2"
          >
            {isSimplifying ? (
              <>
                <Sparkles className="h-4 w-4 animate-pulse" />
                Simplifying...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Simplify with AI
              </>
            )}
          </Button>
        </div>

        {simplifiedInstructions ? (
          <div className="space-y-4">
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <div className="flex items-center gap-2 mb-3 text-primary font-medium">
                <Sparkles className="h-4 w-4" />
                AI Simplified Version
              </div>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">{simplifiedInstructions}</p>
            </div>
            <details className="text-muted-foreground">
              <summary className="cursor-pointer hover:text-foreground transition-colors">
                View original instructions
              </summary>
              <div className="mt-4 space-y-3">
                {instructions.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary flex items-center justify-center font-medium text-secondary-foreground">
                      {index + 1}
                    </span>
                    <p className="pt-1">{step.trim()}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        ) : (
          <div className="space-y-4">
            {instructions.map((step, index) => (
              <div key={index} className="flex gap-4">
                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center font-medium text-primary-foreground">
                  {index + 1}
                </span>
                <p className="text-muted-foreground pt-1">{step.trim()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
