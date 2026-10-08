import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-30 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      } ${
        isDark
          ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-purple-600/30 hover:from-purple-500 hover:to-violet-500'
          : 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-purple-400/30 hover:from-purple-400 hover:to-violet-400'
      }`}
      aria-label="Наверх"
    >
      ⬆️
    </button>
  );
}
