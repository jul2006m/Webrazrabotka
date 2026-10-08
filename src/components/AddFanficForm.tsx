import { useState } from 'react';
import { useFanFics } from '../contexts/FanFicsContext';
import { useTheme } from '../contexts/ThemeContext';

interface Props {
  onClose: () => void;
}

export default function AddFanficForm({ onClose }: Props) {
  const { addFanFic } = useFanFics();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('Драма');
  const [rating, setRating] = useState('PG-13');
  const [size, setSize] = useState('Мини');
  const [annotation, setAnnotation] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('process');
  const [coverColor, setCoverColor] = useState('from-purple-900 to-indigo-900');
  const [submitted, setSubmitted] = useState(false);

  const coverOptions = [
    { value: 'from-purple-900 to-indigo-900', label: '🟣 Фиолетовый' },
    { value: 'from-violet-900 to-purple-900', label: '💜 Лиловый' },
    { value: 'from-indigo-900 to-purple-800', label: '🔵 Индиго' },
    { value: 'from-fuchsia-900 to-purple-900', label: '🌸 Фуксия' },
    { value: 'from-purple-950 to-violet-900', label: '🌑 Тёмный' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && author && annotation && content) {
      addFanFic({
        title,
        author,
        genre,
        rating,
        size,
        annotation,
        content,
        status,
        coverColor,
      });
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  const inputClass = `w-full px-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-1 focus:ring-purple-500 ${
    isDark
      ? 'bg-dark-600 border-purple-700/30 text-gray-200 placeholder-gray-500 focus:border-purple-500'
      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
  }`;

  const labelClass = `block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className={`rounded-2xl p-8 max-w-md w-full text-center border ${
          isDark ? 'bg-dark-700 border-purple-800/30' : 'bg-white border-purple-200'
        }`}>
          <span className="text-6xl block mb-4">🎉</span>
          <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Фанфик добавлен!
          </h3>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Ваша работа теперь доступна в каталоге.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className={`rounded-2xl p-6 sm:p-8 max-w-2xl w-full border my-8 ${
        isDark ? 'bg-dark-700 border-purple-800/30' : 'bg-white border-purple-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            ✍️ Добавить фанфик
          </h2>
          <button
            onClick={onClose}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              isDark ? 'hover:bg-dark-600 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Название *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название вашего фанфика"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Автор *</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ваш никнейм"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Аннотация *</label>
            <input
              type="text"
              value={annotation}
              onChange={(e) => setAnnotation(e.target.value)}
              placeholder="Краткое описание работы"
              required
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className={labelClass}>Жанр</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className={inputClass}
              >
                <option>Драма</option>
                <option>Юмор</option>
                <option>Романтика</option>
                <option>Приключения</option>
                <option>Фэнтези</option>
                <option>Детектив</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Рейтинг</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className={inputClass}
              >
                <option>G</option>
                <option>PG-13</option>
                <option>R</option>
                <option>NC-17</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Размер</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className={inputClass}
              >
                <option>Мини</option>
                <option>Миди</option>
                <option>Макси</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Статус</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={inputClass}
              >
                <option value="process">В процессе</option>
                <option value="completed">Завершён</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Обложка</label>
            <div className="flex flex-wrap gap-2">
              {coverOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCoverColor(opt.value)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                    coverColor === opt.value
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : isDark
                        ? 'bg-dark-600 border-purple-700/30 text-gray-400 hover:border-purple-600/50'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-purple-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Текст фанфика *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Начните писать свою историю..."
              rows={10}
              required
              className={`${inputClass} resize-none`}
              style={{ fontFamily: 'Georgia, serif' }}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                isDark
                  ? 'bg-dark-600 border border-purple-700/30 text-gray-300 hover:bg-dark-500'
                  : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-violet-500 transition-all shadow-lg shadow-purple-600/20"
            >
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
