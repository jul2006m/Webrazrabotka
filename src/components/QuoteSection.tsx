import { useState } from 'react';
import { quotes } from '../data/fanFics';
import { useTheme } from '../contexts/ThemeContext';

export default function QuoteSection() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const showRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative rounded-2xl p-8 sm:p-12 border overflow-hidden ${
          isDark
            ? 'bg-gradient-to-r from-dark-700 to-purple-900/30 border-purple-700/30'
            : 'bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200'
        }`}>
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl ${isDark ? 'bg-purple-500/10' : 'bg-purple-300/30'}`} />
          <div className={`absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl ${isDark ? 'bg-violet-500/10' : 'bg-violet-300/30'}`} />
          
          <div className="relative text-center">
            <blockquote className={`text-xl sm:text-2xl italic mb-6 leading-relaxed ${
              isDark ? 'text-purple-200' : 'text-purple-800'
            }`}>
              "{currentQuote}"
            </blockquote>
            <button
              onClick={showRandomQuote}
              className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'bg-dark-600 border border-purple-600/50 text-purple-300 hover:bg-purple-800/30 hover:border-purple-500'
                  : 'bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-400'
              }`}
            >
              🎲 Случайная цитата
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
