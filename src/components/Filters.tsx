import { useState } from 'react';

export default function Filters() {
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

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-dark-700/50 border border-purple-800/30 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-purple-200 mb-4">🎛️ Фильтры</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Genres */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-3">Жанры</h4>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <button
                    key={genre.value}
                    onClick={() => toggleGenre(genre.value)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                      selectedGenres.includes(genre.value)
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-dark-600 border-purple-700/30 text-gray-400 hover:border-purple-600/50'
                    }`}
                  >
                    {genre.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-3">Рейтинг</h4>
              <div className="flex flex-wrap gap-2">
                {ratings.map(rating => (
                  <button
                    key={rating.value}
                    onClick={() => setSelectedRating(selectedRating === rating.value ? '' : rating.value)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                      selectedRating === rating.value
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-dark-600 border-purple-700/30 text-gray-400 hover:border-purple-600/50'
                    }`}
                  >
                    {rating.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-3">Размер</h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(selectedSize === size.value ? '' : size.value)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                      selectedSize === size.value
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-dark-600 border-purple-700/30 text-gray-400 hover:border-purple-600/50'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-3">Статус</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => toggleStatus('completed')}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                    selectedStatus.includes('completed')
                      ? 'bg-green-700 border-green-600 text-white'
                      : 'bg-dark-600 border-purple-700/30 text-gray-400 hover:border-purple-600/50'
                  }`}
                >
                  ✅ Завершён
                </button>
                <button
                  onClick={() => toggleStatus('process')}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                    selectedStatus.includes('process')
                      ? 'bg-blue-700 border-blue-600 text-white'
                      : 'bg-dark-600 border-purple-700/30 text-gray-400 hover:border-purple-600/50'
                  }`}
                >
                  🔄 В процессе
                </button>
              </div>
            </div>
          </div>

          {/* Active filters */}
          {(selectedGenres.length > 0 || selectedRating || selectedSize || selectedStatus.length > 0) && (
            <div className="mt-4 pt-4 border-t border-purple-800/30 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-500">Активные фильтры:</span>
              <button
                onClick={() => {
                  setSelectedGenres([]);
                  setSelectedRating('');
                  setSelectedSize('');
                  setSelectedStatus([]);
                }}
                className="text-xs text-purple-400 hover:text-purple-300 underline"
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
