import { useState, useEffect } from 'react';
import { Plus, X, Edit2, Check } from 'lucide-react';

export interface Dish {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  description?: string;
}

interface DishLibraryProps {
  onDishesChange?: (dishes: Dish[]) => void;
}

export function DishLibrary({ onDishesChange }: DishLibraryProps) {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'breakfast' as Dish['category'],
    description: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('dishes');
    if (saved) {
      const loadedDishes = JSON.parse(saved);
      setDishes(loadedDishes);
      onDishesChange?.(loadedDishes);
    }
  }, []);

  const saveDishes = (updatedDishes: Dish[]) => {
    setDishes(updatedDishes);
    localStorage.setItem('dishes', JSON.stringify(updatedDishes));
    onDishesChange?.(updatedDishes);
  };

  const addDish = () => {
    if (!formData.name.trim()) return;

    const newDish: Dish = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      description: formData.description || undefined,
    };

    saveDishes([...dishes, newDish]);
    setFormData({ name: '', category: 'breakfast', description: '' });
    setIsAdding(false);
  };

  const updateDish = () => {
    if (!formData.name.trim() || !editingId) return;

    const updated = dishes.map(d =>
      d.id === editingId
        ? { ...d, name: formData.name, category: formData.category, description: formData.description || undefined }
        : d
    );

    saveDishes(updated);
    setFormData({ name: '', category: 'breakfast', description: '' });
    setEditingId(null);
  };

  const deleteDish = (id: string) => {
    saveDishes(dishes.filter(d => d.id !== id));
  };

  const startEdit = (dish: Dish) => {
    setEditingId(dish.id);
    setFormData({
      name: dish.name,
      category: dish.category,
      description: dish.description || '',
    });
    setIsAdding(false);
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '', category: 'breakfast', description: '' });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'breakfast': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30';
      case 'lunch': return 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30';
      case 'dinner': return 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30';
      case 'snack': return 'bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/30';
    }
  };

  const dishesByCategory = {
    breakfast: dishes.filter(d => d.category === 'breakfast'),
    lunch: dishes.filter(d => d.category === 'lunch'),
    dinner: dishes.filter(d => d.category === 'dinner'),
    snack: dishes.filter(d => d.category === 'snack'),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-stone-800 dark:text-stone-200">Your Dish Library</h2>
          <p className="text-stone-600 dark:text-stone-400 mt-1">
            Manage your favorite dishes ({dishes.length} total)
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-700 dark:to-red-700 text-white rounded-lg hover:from-orange-700 hover:to-red-700 dark:hover:from-orange-600 dark:hover:to-red-600 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          Add Dish
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="backdrop-blur-lg bg-white/60 dark:bg-stone-900/60 rounded-xl p-6 border border-white/70 dark:border-stone-700/70 shadow-lg">
          <h3 className="mb-4 text-stone-800 dark:text-stone-200">
            {editingId ? 'Edit Dish' : 'New Dish'}
          </h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm mb-2 text-stone-700 dark:text-stone-300">Dish Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Avocado Toast"
                className="w-full px-4 py-2.5 rounded-lg bg-white/50 dark:bg-stone-800/50 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-600"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-stone-700 dark:text-stone-300">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Dish['category'] })}
                className="w-full px-4 py-2.5 rounded-lg bg-white/50 dark:bg-stone-800/50 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-600"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2 text-stone-700 dark:text-stone-300">Description (optional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description..."
                className="w-full px-4 py-2.5 rounded-lg bg-white/50 dark:bg-stone-800/50 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-600 resize-none"
                rows={2}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={editingId ? updateDish : addDish}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 dark:bg-orange-700 text-white rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors"
              >
                <Check className="w-4 h-4" />
                {editingId ? 'Update' : 'Add'}
              </button>
              <button
                onClick={cancelForm}
                className="px-4 py-2 bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dishes Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(dishesByCategory).map(([category, categoryDishes]) => (
          <div key={category} className="backdrop-blur-lg bg-white/50 dark:bg-stone-900/50 rounded-xl p-5 border border-white/60 dark:border-stone-700/60 shadow-md">
            <h3 className="mb-3 capitalize text-stone-800 dark:text-stone-200 flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs border ${getCategoryColor(category)}`}>
                {category}
              </span>
              <span className="text-sm text-stone-500 dark:text-stone-500">({categoryDishes.length})</span>
            </h3>

            {categoryDishes.length === 0 ? (
              <p className="text-sm text-stone-500 dark:text-stone-500 italic">No dishes yet</p>
            ) : (
              <div className="space-y-2">
                {categoryDishes.map(dish => (
                  <div
                    key={dish.id}
                    className="group bg-white/60 dark:bg-stone-800/60 rounded-lg p-3 border border-stone-200/50 dark:border-stone-700/50 hover:border-orange-400 dark:hover:border-orange-600 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-stone-900 dark:text-stone-100 truncate">{dish.name}</p>
                        {dish.description && (
                          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">{dish.description}</p>
                        )}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEdit(dish)}
                          className="p-1.5 hover:bg-stone-200 dark:hover:bg-stone-700 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
                        </button>
                        <button
                          onClick={() => deleteDish(dish.id)}
                          className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                          title="Delete"
                        >
                          <X className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
