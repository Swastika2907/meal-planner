import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Sun, Moon } from 'lucide-react';

export function RootLayout() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/20 dark:bg-stone-800/20 backdrop-blur-md border border-white/30 dark:border-stone-700/30 hover:bg-white/30 dark:hover:bg-stone-800/30 transition-all shadow-lg"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon className="w-5 h-5 text-stone-700" /> : <Sun className="w-5 h-5 text-amber-400" />}
      </button>
      <Outlet />
    </div>
  );
}
