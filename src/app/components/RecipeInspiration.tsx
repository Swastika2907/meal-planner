import { useState } from 'react';
import { Heart, Clock, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Recipe {
  id: number;
  name: string;
  image: string;
  cookTime: string;
  servings: number;
  category: string;
  description: string;
}

const RECIPES: Recipe[] = [
  {
    id: 1,
    name: 'Avocado Toast Supreme',
    image: 'https://images.unsplash.com/photo-1722169474560-fa64674f17c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    cookTime: '10 min',
    servings: 2,
    category: 'Breakfast',
    description: 'Fresh avocado on toasted sourdough with lime and seasoning',
  },
  {
    id: 2,
    name: 'Fluffy Pancake Stack',
    image: 'https://images.unsplash.com/photo-1722169474498-eb7fe1f59694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    cookTime: '20 min',
    servings: 4,
    category: 'Breakfast',
    description: 'Light and fluffy pancakes with maple syrup and berries',
  },
  {
    id: 3,
    name: 'Fresh Veggie Wrap',
    image: 'https://images.unsplash.com/photo-1722169474569-8876de544175?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    cookTime: '15 min',
    servings: 2,
    category: 'Lunch',
    description: 'Crisp vegetables and cheese in a soft tortilla wrap',
  },
  {
    id: 4,
    name: 'Cheese Danish Pastry',
    image: 'https://images.unsplash.com/photo-1722169474606-7293caf7e0af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    cookTime: '30 min',
    servings: 6,
    category: 'Breakfast',
    description: 'Buttery pastry with sweet cream cheese filling',
  },
  {
    id: 5,
    name: 'Roasted Vegetable Medley',
    image: 'https://images.unsplash.com/photo-1722169474498-ab6ecbc9eae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    cookTime: '35 min',
    servings: 4,
    category: 'Dinner',
    description: 'Colorful roasted vegetables with herbs and olive oil',
  },
  {
    id: 6,
    name: 'Apple & Cheese Platter',
    image: 'https://images.unsplash.com/photo-1722169474560-64d984d206ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    cookTime: '5 min',
    servings: 2,
    category: 'Snack',
    description: 'Fresh apple slices with artisan cheese and crackers',
  },
  {
    id: 7,
    name: 'Gourmet Burger & Fries',
    image: 'https://images.unsplash.com/photo-1708989175846-db13f1bed353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    cookTime: '25 min',
    servings: 2,
    category: 'Dinner',
    description: 'Juicy burger with crispy golden fries',
  },
  {
    id: 8,
    name: 'Club Sandwich Deluxe',
    image: 'https://images.unsplash.com/photo-1708989176531-c5cbe0215d1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    cookTime: '15 min',
    servings: 2,
    category: 'Lunch',
    description: 'Triple-decker sandwich with fresh ingredients',
  },
];

export function RecipeInspiration() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(RECIPES.map(r => r.category)))];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const filteredRecipes = selectedCategory === 'All'
    ? RECIPES
    : RECIPES.filter(r => r.category === selectedCategory);

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl mb-4">Recipe Inspiration</h2>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRecipes.map(recipe => (
          <div
            key={recipe.id}
            className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
              <ImageWithFallback
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleFavorite(recipe.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.has(recipe.id)
                      ? 'fill-red-500 stroke-red-500'
                      : 'stroke-gray-600 dark:stroke-gray-400'
                  }`}
                />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="px-2.5 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full text-xs">
                  {recipe.category}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="mb-2">{recipe.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{recipe.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.cookTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
