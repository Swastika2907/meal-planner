import { Link } from 'react-router';
import { ChefHat, Calendar, BookOpen, Sparkles } from 'lucide-react';

export function LandingPage() {
  const quotes = [
    "Good food is the foundation of genuine happiness.",
    "Cooking is love made visible.",
    "Life is too short for bad meals.",
    "The secret ingredient is always planning.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-red-100 dark:from-stone-900 dark:via-orange-950 dark:to-red-950 opacity-50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(251 146 60 / 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>

        {/* Glass morphism card */}
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-white/40 dark:bg-stone-900/40 rounded-3xl p-12 md:p-16 border border-white/50 dark:border-stone-700/50 shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 mb-6 shadow-lg">
              <ChefHat className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-orange-700 via-red-600 to-orange-800 dark:from-orange-400 dark:via-red-400 dark:to-orange-500 bg-clip-text text-transparent">
              Meal Planner
            </h1>

            <p className="text-xl md:text-2xl text-stone-700 dark:text-stone-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Plan your perfect week of meals with ease. Create your personal dish library and organize your menu effortlessly.
            </p>

            {/* Quote section */}
            <div className="mb-10 p-6 rounded-2xl bg-white/30 dark:bg-stone-800/30 backdrop-blur-sm border border-orange-200/30 dark:border-orange-800/30">
              <Sparkles className="w-6 h-6 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
              <p className="text-lg italic text-stone-700 dark:text-stone-300">
                "{randomQuote}"
              </p>
            </div>

            <Link
              to="/planner"
              className="inline-flex items-center gap-3 px-8 py-4 text-lg bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-700 dark:to-red-700 text-white rounded-full hover:from-orange-700 hover:to-red-700 dark:hover:from-orange-600 dark:hover:to-red-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              Let's Get Started
              <span className="text-2xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-center mb-16 text-stone-800 dark:text-stone-200">
            Why You'll Love It
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="backdrop-blur-lg bg-white/50 dark:bg-stone-900/50 rounded-2xl p-8 border border-white/60 dark:border-stone-700/60 shadow-xl hover:scale-105 transition-transform">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 flex items-center justify-center mb-4">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl mb-3 text-stone-800 dark:text-stone-200">Personal Dish Library</h3>
              <p className="text-stone-600 dark:text-stone-400">
                Create and save your favorite dishes. Build your own collection that you can use again and again.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/50 dark:bg-stone-900/50 rounded-2xl p-8 border border-white/60 dark:border-stone-700/60 shadow-xl hover:scale-105 transition-transform">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 flex items-center justify-center mb-4">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl mb-3 text-stone-800 dark:text-stone-200">Weekly Planning</h3>
              <p className="text-stone-600 dark:text-stone-400">
                Organize your meals for the entire week. Drag and drop dishes from your library to plan effortlessly.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/50 dark:bg-stone-900/50 rounded-2xl p-8 border border-white/60 dark:border-stone-700/60 shadow-xl hover:scale-105 transition-transform">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl mb-3 text-stone-800 dark:text-stone-200">Simple & Beautiful</h3>
              <p className="text-stone-600 dark:text-stone-400">
                Clean, intuitive interface with dark mode support. Plan your meals without the complexity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
