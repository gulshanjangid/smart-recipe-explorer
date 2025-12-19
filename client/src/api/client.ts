
export const API_BASE_URL = 'http://localhost:5000/api';

export const fetchRecipes = async (filters: any) => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.cuisine) params.append('cuisine', filters.cuisine);
    if (filters.isVegetarian !== null) params.append('isVegetarian', String(filters.isVegetarian));
    if (filters.maxPrepTime) params.append('maxPrepTime', String(filters.maxPrepTime));
    if (filters.difficulty) params.append('difficulty', filters.difficulty);
    if (filters.tags && filters.tags.length > 0) params.append('tags', filters.tags.join(','));

    const response = await fetch(`${API_BASE_URL}/recipes?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch recipes');
    }
    return response.json();
};

export const fetchRecipeById = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch recipe');
    }
    return response.json();
};

export const suggestRecipes = async (ingredients: string[]) => {
    const response = await fetch(`${API_BASE_URL}/ai/suggest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
    });
    if (!response.ok) {
        throw new Error('Failed to get suggestions');
    }
    return response.json();
};

export const simplifyInstructions = async (recipeName: string, instructions: string) => {
    const response = await fetch(`${API_BASE_URL}/ai/simplify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipeName, instructions }),
    });
    if (!response.ok) {
        throw new Error('Failed to simplify instructions');
    }
    return response.json();
};
