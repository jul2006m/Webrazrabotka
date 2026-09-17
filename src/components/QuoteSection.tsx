import { useState } from 'react';
import { quotes } from '../data/fanFics';

export default function QuoteSection() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const showRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-dark-700 to-purple-900/30 rounded-2xl p-8 sm:p-12 border border-purple-700/30 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl" />
          
          <div className="relative text-center">
            <blockquote className="text-xl sm:text-2xl italic text-purple-200 mb-6 leading-relaxed">
              "{currentQuote}"
            </blockquote>
            <button
              onClick={showRandomQuote}
              className="px-6 py-3 bg-dark-600 border border-purple-600/50 text-purple-300 rounded-lg hover:bg-purple-800/30 hover:border-purple-500 transition-all duration-200"
            >
              🎲 Случайная цитата
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
