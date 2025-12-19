import { ChefHat } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl gradient-warm shadow-md">
            <ChefHat className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Smart Recipe Explorer
            </h1>
            <p className="text-sm text-muted-foreground">
              Discover delicious recipes with AI assistance
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
