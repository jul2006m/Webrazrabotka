import { useState, useMemo } from 'react';
import { useFanFics, FanFic } from '../contexts/FanFicsContext';
import { useTheme } from '../contexts/ThemeContext';
import FicCard from './FicCard';

interface Props {
  onRead: (fic: FanFic) => void;
}

export default function Catalog({ onRead }: Props) {
  const { fanFics } = useFanFics();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
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
  }, [fanFics, searchTerm, sortBy]);

  const inputClass = `px-5 py-3 border rounded-xl transition-all focus:outline-none focus:ring-1 focus:ring-purple-500 ${
    isDark
      ? 'bg-dark-700 border-purple-700/30 text-gray-200 placeholder-gray-500 focus:border-purple-500'
      : 'bg-white border-purple-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
  }`;

  return (
    <section id="works" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-2">
          <span className={
            isDark
              ? 'text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]'
              : 'text-purple-800'
          }>
            Популярные работы
          </span>
        </h2>
        <p className={`text-center mb-8 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
          Лучшие фанфики от нашего сообщества
        </p>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Поиск по названию, автору или меткам..."
              className={`${inputClass} w-full`}
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'likes' | 'comments' | 'views')}
            className={inputClass}
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
              <FicCard key={fic.id} fic={fic} onRead={onRead} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className={isDark ? 'text-gray-400 text-lg' : 'text-gray-600 text-lg'}>Ничего не найдено</p>
            <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Попробуйте изменить поисковый запрос
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
