import { Recipe } from '@/types/recipe';
import { Clock, ChefHat, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const difficultyColors = {
  easy: 'bg-accent/20 text-accent border-accent/30',
  medium: 'bg-primary/20 text-primary border-primary/30',
  hard: 'bg-destructive/20 text-destructive border-destructive/30',
};

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.imageUrl || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800'}
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          {recipe.isVegetarian && (
            <span className="bg-accent text-accent-foreground p-1.5 rounded-full">
              <Leaf className="h-4 w-4" />
            </span>
          )}
        </div>
        
        <div className="absolute bottom-3 left-3 right-3">
          <Badge variant="secondary" className={cn('text-xs', difficultyColors[recipe.difficulty])}>
            {recipe.difficulty}
          </Badge>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {recipe.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4">{recipe.cuisine} Cuisine</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {recipe.prepTimeMinutes} min
          </span>
          <span className="flex items-center gap-1.5">
            <ChefHat className="h-4 w-4" />
            {recipe.ingredients.length} ingredients
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mt-4">
          {recipe.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
