import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Props {
  onAddFanfic: () => void;
}

export default function Header({ onAddFanfic }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b ${
      isDark
        ? 'bg-dark-900/90 border-purple-800/30'
        : 'bg-white/90 border-purple-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-3xl">📚</span>
            <h1 className={`text-xl font-bold ${isDark ? 'text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'text-purple-700'}`}>
              FanFic World
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#fandoms" className={`transition-colors duration-200 font-medium ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'}`}>
              Фандомы
            </a>
            <a href="#works" className={`transition-colors duration-200 font-medium ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'}`}>
              Работы
            </a>
            <a href="#authors" className={`transition-colors duration-200 font-medium ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'}`}>
              Авторы
            </a>
            <a href="#community" className={`transition-colors duration-200 font-medium ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'}`}>
              Сообщества
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onAddFanfic}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-lg hover:from-purple-500 hover:to-violet-500 transition-all text-sm"
            >
              <span>✍️</span>
              <span>Написать</span>
            </button>

            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                isDark
                  ? 'bg-dark-700 border border-purple-700/50 hover:bg-purple-800/30'
                  : 'bg-gray-100 border border-purple-200 hover:bg-purple-50'
              }`}
              aria-label="Переключить тему"
            >
              {isDark ? '🌙' : '☀️'}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center ${
                isDark
                  ? 'bg-dark-700 border border-purple-700/50 text-gray-300'
                  : 'bg-gray-100 border border-purple-200 text-gray-700'
              }`}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className={`md:hidden pb-4 border-t pt-4 ${isDark ? 'border-purple-800/30' : 'border-purple-200'}`}>
            <div className="flex flex-col gap-3">
              <a href="#fandoms" className={`py-2 ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'}`}>Фандомы</a>
              <a href="#works" className={`py-2 ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'}`}>Работы</a>
              <a href="#authors" className={`py-2 ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'}`}>Авторы</a>
              <a href="#community" className={`py-2 ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'}`}>Сообщества</a>
              <button
                onClick={onAddFanfic}
                className="sm:hidden mt-2 py-2 px-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-lg"
              >
                ✍️ Написать фанфик
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
