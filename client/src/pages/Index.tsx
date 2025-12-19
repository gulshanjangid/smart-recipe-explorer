import { useState, useEffect } from 'react';
import { Recipe, RecipeFilters } from '@/types/recipe';
import { Header } from '@/components/Header';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeFiltersPanel } from '@/components/RecipeFilters';
import { RecipeDetail } from '@/components/RecipeDetail';
import { AISuggestionPanel } from '@/components/AISuggestionPanel';
import { useToast } from '@/hooks/use-toast';
import { fetchRecipes, simplifyInstructions, suggestRecipes } from '@/api/client';

const Index = () => {
  const { toast } = useToast();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [filters, setFilters] = useState<RecipeFilters>({
    search: '',
    cuisine: '',
    isVegetarian: null,
    maxPrepTime: null,
    difficulty: '',
    tags: [],
  });

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // AI states
  const [isSimplifying, setIsSimplifying] = useState(false);
  const [simplifiedInstructions, setSimplifiedInstructions] = useState<string | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [aiSuggestions, setAISuggestions] = useState<Recipe[] | null>(null); // Note: The AI might return text, not Recipe objects directly for suggestions unless we parse it. The prompt asks for text suggestions.
  const [aiResponse, setAIResponse] = useState<string | null>(null);

  // Fetch recipes on filter change
  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRecipes(filters);
        setRecipes(data);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Failed to load recipes. Please make sure the backend is running.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(() => {
      loadRecipes();
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, toast]);

  // AI: Simplify instructions
  const handleSimplify = async () => {
    if (!selectedRecipe) return;

    setIsSimplifying(true);
    setSimplifiedInstructions(null);

    try {
      const data = await simplifyInstructions(selectedRecipe.name, selectedRecipe.instructions);
      setSimplifiedInstructions(data.simplified);
      toast({
        title: 'Instructions Simplified!',
        description: 'AI has created a simpler version of the recipe.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to simplify instructions. Ensure Backend has API Key.',
        variant: 'destructive',
      });
    } finally {
      setIsSimplifying(false);
    }
  };

  // AI: Suggest recipes based on ingredients
  const handleSuggest = async (ingredients: string[]) => {
    setIsSuggesting(true);
    setAISuggestions(null);
    setAIResponse(null);

    try {
      const data = await suggestRecipes(ingredients);
      // The backend returns { suggestion: string }
      setAIResponse(data.suggestion);

      // Previously we filtered local recipes. Now we just show the AI text response.
      // If we wanted to map back to local recipes, we'd need more logic, but the requirement is "Suggest a recipe...". Text is fine.

      toast({
        title: 'Suggestions Ready!',
        description: `Here are some ideas based on your ingredients.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get suggestions. Ensure Backend has API Key.',
        variant: 'destructive',
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setSimplifiedInstructions(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedRecipe(null);
    setSimplifiedInstructions(null);
  };

  const hasActiveFilters =
    filters.search ||
    filters.cuisine ||
    filters.isVegetarian !== null ||
    filters.maxPrepTime ||
    filters.difficulty ||
    filters.tags.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {selectedRecipe ? (
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={handleBack}
            onSimplify={handleSimplify}
            isSimplifying={isSimplifying}
            simplifiedInstructions={simplifiedInstructions}
          />
        ) : (
          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            {/* Main Content */}
            <div className="space-y-6">
              <RecipeFiltersPanel filters={filters} onFiltersChange={setFilters} />

              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  {isLoading ? 'Loading...' : `${recipes.length} Recipe${recipes.length !== 1 ? 's' : ''} Found`}
                </h2>
              </div>

              {isLoading ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-96 bg-muted animate-pulse rounded-xl" />
                  ))}
                </div>
              ) : recipes.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recipes.map((recipe, index) => (
                    <div
                      key={recipe.id}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <RecipeCard recipe={recipe} onClick={() => handleSelectRecipe(recipe)} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No recipes match your filters.</p>
                  <p className="text-muted-foreground">
                    {hasActiveFilters ? 'Try adjusting your search criteria.' : 'No recipes found in database.'}
                  </p>
                </div>
              )}
            </div>

            {/* AI Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <AISuggestionPanel
                onSuggest={handleSuggest}
                isLoading={isSuggesting}
                suggestions={aiSuggestions}
                aiResponse={aiResponse}
                onSelectRecipe={handleSelectRecipe}
              />
            </aside>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>Smart Recipe Explorer — MERN Stack + GenAI Integration Assignment</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
