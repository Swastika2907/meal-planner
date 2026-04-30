import { useState, useEffect } from 'react';
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Dish } from './DishLibrary';

interface ScheduledMeal {
  id: string;
  dishId: string;
  dishName: string;
}

interface DayMeals {
  [key: string]: ScheduledMeal[];
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

interface WeeklyPlannerProps {
  availableDishes: Dish[];
}

export function WeeklyPlanner({ availableDishes }: WeeklyPlannerProps) {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [meals, setMeals] = useState<DayMeals>({});
  const [addingMeal, setAddingMeal] = useState<{ day: string; type: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('weeklyMeals');
    if (saved) {
      setMeals(JSON.parse(saved));
    }
  }, []);

  const saveMeals = (updatedMeals: DayMeals) => {
    setMeals(updatedMeals);
    localStorage.setItem('weeklyMeals', JSON.stringify(updatedMeals));
  };

  const addMealFromLibrary = (day: string, type: string, dish: Dish) => {
    const newMeal: ScheduledMeal = {
      id: Date.now().toString(),
      dishId: dish.id,
      dishName: dish.name,
    };

    saveMeals({
      ...meals,
      [day]: [...(meals[day] || []), newMeal],
    });

    setAddingMeal(null);
  };

  const removeMeal = (day: string, mealId: string) => {
    saveMeals({
      ...meals,
      [day]: (meals[day] || []).filter(m => m.id !== mealId),
    });
  };

  const getMealsForDay = (day: string, type: string) => {
    const dayMeals = meals[day] || [];
    return dayMeals.filter(m => {
      const dish = availableDishes.find(d => d.id === m.dishId);
      return dish?.category === type;
    });
  };

  const getAvailableDishesForType = (type: string) => {
    return availableDishes.filter(d => d.category === type);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'breakfast': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400';
      case 'lunch': return 'bg-green-500/20 text-green-700 dark:text-green-400';
      case 'dinner': return 'bg-blue-500/20 text-blue-700 dark:text-blue-400';
      case 'snack': return 'bg-purple-500/20 text-purple-700 dark:text-purple-400';
      default: return 'bg-stone-500/20 text-stone-700 dark:text-stone-400';
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl text-stone-800 dark:text-stone-200">Weekly Menu</h2>
          <p className="text-stone-600 dark:text-stone-400 mt-1">
            Select dishes from your library to plan your week
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentWeek(prev => prev - 1)}
            className="p-2 rounded-lg backdrop-blur-md bg-white/50 dark:bg-stone-800/50 border border-white/60 dark:border-stone-700/60 hover:bg-white/70 dark:hover:bg-stone-800/70 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-stone-600 dark:text-stone-400 min-w-[100px] text-center">
            Week {currentWeek === 0 ? 'Current' : currentWeek > 0 ? `+${currentWeek}` : currentWeek}
          </span>
          <button
            onClick={() => setCurrentWeek(prev => prev + 1)}
            className="p-2 rounded-lg backdrop-blur-md bg-white/50 dark:bg-stone-800/50 border border-white/60 dark:border-stone-700/60 hover:bg-white/70 dark:hover:bg-stone-800/70 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {DAYS.map(day => (
          <div
            key={day}
            className="backdrop-blur-lg bg-white/50 dark:bg-stone-900/50 rounded-xl p-4 border border-white/60 dark:border-stone-700/60 shadow-md"
          >
            <h3 className="mb-4 text-center text-stone-800 dark:text-stone-200">{day}</h3>

            <div className="space-y-4">
              {MEAL_TYPES.map(type => (
                <div key={type}>
                  <p className={`text-xs uppercase tracking-wide mb-2 px-2 py-1 rounded ${getCategoryColor(type)}`}>
                    {type}
                  </p>

                  {getMealsForDay(day, type).map(meal => (
                    <div
                      key={meal.id}
                      className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-lg p-2.5 mb-2 flex items-center justify-between group border border-stone-200/50 dark:border-stone-700/50"
                    >
                      <span className="text-sm text-stone-900 dark:text-stone-100">{meal.dishName}</span>
                      <button
                        onClick={() => removeMeal(day, meal.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                      >
                        <X className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  ))}

                  {addingMeal?.day === day && addingMeal?.type === type ? (
                    <div className="bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm rounded-lg p-3 border border-orange-300 dark:border-orange-700 shadow-lg">
                      <p className="text-xs mb-2 text-stone-600 dark:text-stone-400">Select a dish:</p>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto">
                        {getAvailableDishesForType(type).length === 0 ? (
                          <p className="text-xs text-stone-500 dark:text-stone-500 italic py-2">
                            No {type} dishes in library
                          </p>
                        ) : (
                          getAvailableDishesForType(type).map(dish => (
                            <button
                              key={dish.id}
                              onClick={() => addMealFromLibrary(day, type, dish)}
                              className="w-full text-left px-3 py-2 text-sm bg-white dark:bg-stone-700 rounded hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors text-stone-900 dark:text-stone-100"
                            >
                              {dish.name}
                            </button>
                          ))
                        )}
                      </div>
                      <button
                        onClick={() => setAddingMeal(null)}
                        className="mt-2 w-full text-xs px-2 py-1.5 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAddingMeal({ day, type })}
                      className="w-full py-2 border border-dashed border-stone-300 dark:border-stone-700 rounded-lg hover:border-orange-500 dark:hover:border-orange-600 hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-3.5 h-3.5 text-stone-500 dark:text-stone-500" />
                      <span className="text-xs text-stone-600 dark:text-stone-400">Add {type}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
