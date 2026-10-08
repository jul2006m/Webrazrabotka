import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function Filters() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatus(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const genres = [
    { value: 'humor', label: '😂 Юмор' },
    { value: 'drama', label: '🎭 Драма' },
    { value: 'romance', label: '💕 Романтика' },
    { value: 'adventure', label: '⚔️ Приключения' },
  ];

  const ratings = [
    { value: 'G', label: 'G' },
    { value: 'PG-13', label: 'PG-13' },
    { value: 'R', label: 'R' },
    { value: 'NC-17', label: 'NC-17' },
  ];

  const sizes = [
    { value: 'mini', label: 'Мини' },
    { value: 'midi', label: 'Миди' },
    { value: 'maxi', label: 'Макси' },
  ];

  const chipBase = `px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
    isDark ? 'bg-dark-600 border-purple-700/30 text-gray-400 hover:border-purple-600/50' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-purple-400'
  }`;

  const chipActive = isDark
    ? 'bg-purple-600 border-purple-500 text-white'
    : 'bg-purple-600 border-purple-500 text-white';

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`border rounded-2xl p-6 ${
          isDark ? 'bg-dark-700/50 border-purple-800/30' : 'bg-white border-purple-200 shadow-sm'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-purple-200' : 'text-purple-800'}`}>
            🎛️ Фильтры
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Genres */}
            <div>
              <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Жанры</h4>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <button
                    key={genre.value}
                    onClick={() => toggleGenre(genre.value)}
                    className={selectedGenres.includes(genre.value) ? chipActive : chipBase}
                  >
                    {genre.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Рейтинг</h4>
              <div className="flex flex-wrap gap-2">
                {ratings.map(rating => (
                  <button
                    key={rating.value}
                    onClick={() => setSelectedRating(selectedRating === rating.value ? '' : rating.value)}
                    className={selectedRating === rating.value ? chipActive : chipBase}
                  >
                    {rating.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Размер</h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(selectedSize === size.value ? '' : size.value)}
                    className={selectedSize === size.value ? chipActive : chipBase}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Статус</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => toggleStatus('completed')}
                  className={selectedStatus.includes('completed')
                    ? (isDark ? 'bg-green-700 border-green-600 text-white' : 'bg-green-600 border-green-500 text-white')
                    : chipBase
                  }
                >
                  ✅ Завершён
                </button>
                <button
                  onClick={() => toggleStatus('process')}
                  className={selectedStatus.includes('process')
                    ? (isDark ? 'bg-blue-700 border-blue-600 text-white' : 'bg-blue-600 border-blue-500 text-white')
                    : chipBase
                  }
                >
                  🔄 В процессе
                </button>
              </div>
            </div>
          </div>

          {(selectedGenres.length > 0 || selectedRating || selectedSize || selectedStatus.length > 0) && (
            <div className={`mt-4 pt-4 border-t flex items-center gap-2 flex-wrap ${isDark ? 'border-purple-800/30' : 'border-purple-200'}`}>
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Активные фильтры:</span>
              <button
                onClick={() => {
                  setSelectedGenres([]);
                  setSelectedRating('');
                  setSelectedSize('');
                  setSelectedStatus([]);
                }}
                className="text-xs text-purple-500 hover:text-purple-400 underline"
              >
                Сбросить все
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
