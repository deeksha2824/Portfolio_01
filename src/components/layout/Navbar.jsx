import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile } from '../../data/portfolio';
import { useTheme } from '../../hooks/useTheme';
import { navItems, scrollToSection } from '../../utils/routes';

export function Navbar({ activeSection, setActiveSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const observers = navItems.map((item) => {
      const element = document.getElementById(item.id);
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(item.id);
        },
        { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 }
      );
      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [setActiveSection]);

  function handleNavigate(id) {
    scrollToSection(id);
    setIsOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-lg px-4 py-3">
        <button className="focus-ring flex items-center gap-3 rounded-lg text-left" onClick={() => handleNavigate('home')} type="button">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">
            DG
          </span>
          <span className="hidden leading-tight sm:block">
            <strong className="block text-sm font-black">{profile.name}</strong>
            <small className="text-xs font-bold text-slate-500 dark:text-slate-400">Portfolio</small>
          </span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={`focus-ring rounded-lg px-3 py-2 text-sm font-extrabold transition ${
                activeSection === item.id
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                  : 'text-slate-600 hover:bg-slate-950/5 dark:text-slate-300 dark:hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="icon-btn focus-ring h-11 w-11 border border-slate-300/60 bg-white/70 text-slate-800 dark:border-white/10 dark:bg-white/10 dark:text-white"
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark and light mode"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="icon-btn focus-ring h-11 w-11 border border-slate-300/60 bg-white/70 text-slate-800 dark:border-white/10 dark:bg-white/10 dark:text-white lg:hidden"
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="glass mx-auto mt-3 grid max-w-6xl gap-1 rounded-lg p-3 lg:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className="focus-ring rounded-lg px-4 py-3 text-left text-sm font-extrabold text-slate-700 hover:bg-slate-950/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
