import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

interface Props {
  onAddFanfic: () => void;
}

export default function Header({ onAddFanfic }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, profile, signOut, isDemo } = useAuth();
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

            {/* Auth button / Profile */}
            {user && profile ? (
              <div className="relative group">
                <button className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-dark-700' : 'hover:bg-gray-100'
                }`}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                    {profile.username.charAt(0).toUpperCase()}
                  </div>
                  <span className={`hidden sm:inline text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    {profile.username}
                  </span>
                  {isDemo && (
                    <span className="text-xs text-yellow-400">👤</span>
                  )}
                </button>
                <div className={`absolute right-0 top-full mt-2 w-48 rounded-lg border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all ${
                  isDark ? 'bg-dark-700 border-purple-800/30' : 'bg-white border-purple-200'
                }`}>
                  <div className={`p-3 border-b ${isDark ? 'border-purple-800/30' : 'border-purple-200'}`}>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                      {profile.username}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {isDemo ? 'Демо-режим' : user.email}
                    </p>
                  </div>
                  <button
                    onClick={signOut}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      isDark ? 'text-gray-300 hover:bg-dark-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    🚪 Выйти
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  isDark
                    ? 'bg-dark-700 border border-purple-700/50 text-purple-300 hover:bg-purple-800/30'
                    : 'bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100'
                }`}
              >
                🔐 Войти
              </button>
            )}

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
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}
