import { useState } from 'react';
import { Link } from 'react-router';
import { Home } from 'lucide-react';
import { DishLibrary, type Dish } from '../components/DishLibrary';
import { WeeklyPlanner } from '../components/WeeklyPlanner';

export function PlannerPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/40 dark:bg-stone-900/40 border-b border-white/50 dark:border-stone-800/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-stone-800/50 transition-colors"
                title="Back to home"
              >
                <Home className="w-5 h-5 text-stone-600 dark:text-stone-400" />
              </Link>
              <div>
                <h1 className="text-2xl bg-gradient-to-r from-orange-700 via-red-600 to-orange-800 dark:from-orange-400 dark:via-red-400 dark:to-orange-500 bg-clip-text text-transparent">
                  Meal Planner
                </h1>
                <p className="text-sm text-stone-600 dark:text-stone-400">Organize your meals for the week</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          {/* Dish Library Section */}
          <DishLibrary onDishesChange={setDishes} />

          {/* Weekly Planner Section */}
          <WeeklyPlanner availableDishes={dishes} />
        </div>
      </main>
    </div>
  );
}
