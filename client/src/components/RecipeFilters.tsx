import { useState } from 'react';
import { RecipeFilters } from '@/types/recipe';
import { cuisines, allTags, difficulties } from '@/data/recipes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Leaf, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecipeFiltersProps {
  filters: RecipeFilters;
  onFiltersChange: (filters: RecipeFilters) => void;
}

export function RecipeFiltersPanel({ filters, onFiltersChange }: RecipeFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = <K extends keyof RecipeFilters>(key: K, value: RecipeFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      cuisine: '',
      isVegetarian: null,
      maxPrepTime: null,
      difficulty: '',
      tags: [],
    });
  };

  const hasActiveFilters =
    filters.cuisine ||
    filters.isVegetarian !== null ||
    filters.maxPrepTime !== null ||
    filters.difficulty ||
    filters.tags.length > 0;

  return (
    <div className="bg-card rounded-xl shadow-card p-4 md:p-6 animate-fade-in">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search recipes by name or ingredients..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-11"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </Button>
        
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2 text-muted-foreground">
            <X className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="mt-4 space-y-6 border-t border-border pt-4 animate-fade-in">
          {/* Cuisine */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Cuisine</label>
            <div className="flex flex-wrap gap-2">
              {cuisines.map((cuisine) => (
                <Badge
                  key={cuisine}
                  variant={filters.cuisine === cuisine ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer transition-all',
                    filters.cuisine === cuisine && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => updateFilter('cuisine', filters.cuisine === cuisine ? '' : cuisine)}
                >
                  {cuisine}
                </Badge>
              ))}
            </div>
          </div>

          {/* Dietary */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Dietary</label>
            <Button
              variant={filters.isVegetarian === true ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateFilter('isVegetarian', filters.isVegetarian === true ? null : true)}
              className="gap-2"
            >
              <Leaf className="h-4 w-4" />
              Vegetarian Only
            </Button>
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Difficulty</label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((diff) => (
                <Badge
                  key={diff}
                  variant={filters.difficulty === diff ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer capitalize transition-all',
                    filters.difficulty === diff && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => updateFilter('difficulty', filters.difficulty === diff ? '' : diff)}
                >
                  {diff}
                </Badge>
              ))}
            </div>
          </div>

          {/* Prep Time */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Max Prep Time</label>
            <div className="flex flex-wrap gap-2">
              {[15, 30, 45, 60, 90].map((time) => (
                <Badge
                  key={time}
                  variant={filters.maxPrepTime === time ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer transition-all',
                    filters.maxPrepTime === time && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => updateFilter('maxPrepTime', filters.maxPrepTime === time ? null : time)}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {time} min
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Tags</label>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={filters.tags.includes(tag) ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer transition-all',
                    filters.tags.includes(tag) && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() =>
                    updateFilter(
                      'tags',
                      filters.tags.includes(tag)
                        ? filters.tags.filter((t) => t !== tag)
                        : [...filters.tags, tag]
                    )
                  }
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
