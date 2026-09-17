import { useState, useMemo } from 'react';
import { fanFics } from '../data/fanFics';
import FicCard from './FicCard';

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'likes' | 'comments' | 'views'>('likes');

  const filteredFics = useMemo(() => {
    let filtered = fanFics.filter(fic => {
      const search = searchTerm.toLowerCase();
      return (
        fic.title.toLowerCase().includes(search) ||
        fic.author.toLowerCase().includes(search) ||
        fic.annotation.toLowerCase().includes(search) ||
        fic.genre.toLowerCase().includes(search)
      );
    });

    filtered.sort((a, b) => {
      if (sortBy === 'likes') return b.likes - a.likes;
      if (sortBy === 'comments') return b.comments - a.comments;
      return parseFloat(b.views) - parseFloat(a.views);
    });

    return filtered;
  }, [searchTerm, sortBy]);

  return (
    <section id="works" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
            Популярные работы
          </span>
        </h2>
        <p className="text-center text-gray-500 mb-8">Лучшие фанфики от нашего сообщества</p>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Поиск по названию, автору или меткам..."
              className="w-full px-5 py-3 bg-dark-700 border border-purple-700/30 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'likes' | 'comments' | 'views')}
            className="px-4 py-3 bg-dark-700 border border-purple-700/30 rounded-xl text-gray-200 focus:outline-none focus:border-purple-500 transition-all"
          >
            <option value="likes">⭐ По лайкам</option>
            <option value="comments">💬 По комментариям</option>
            <option value="views">👁 По просмотрам</option>
          </select>
        </div>

        {/* Grid */}
        {filteredFics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFics.map(fic => (
              <FicCard key={fic.id} fic={fic} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-gray-400 text-lg">Ничего не найдено</p>
            <p className="text-gray-500 text-sm mt-2">Попробуйте изменить поисковый запрос</p>
          </div>
        )}
      </div>
    </section>
  );
}
