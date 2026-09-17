import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('light-mode');
  };

  return (
    <header className="sticky top-0 z-50 bg-dark-900/90 backdrop-blur-md border-b border-purple-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-3xl">📚</span>
            <h1 className="text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
              FanFic World
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#fandoms" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium">
              Фандомы
            </a>
            <a href="#works" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium">
              Работы
            </a>
            <a href="#authors" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium">
              Авторы
            </a>
            <a href="#community" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium">
              Сообщества
            </a>
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-dark-700 border border-purple-700/50 flex items-center justify-center hover:bg-purple-800/30 transition-all duration-200"
              aria-label="Переключить тему"
            >
              {isDark ? '🌙' : '☀️'}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-dark-700 border border-purple-700/50 flex items-center justify-center"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-purple-800/30 pt-4">
            <div className="flex flex-col gap-3">
              <a href="#fandoms" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Фандомы</a>
              <a href="#works" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Работы</a>
              <a href="#authors" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Авторы</a>
              <a href="#community" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Сообщества</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
