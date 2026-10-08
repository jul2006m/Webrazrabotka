import { useState, useEffect } from 'react';
import { useFanFics, FanFic, Chapter } from '../contexts/FanFicsContext';
import { useTheme } from '../contexts/ThemeContext';

interface Props {
  onClose: () => void;
  editFic?: FanFic | null;
}

export default function AddFanficForm({ onClose, editFic }: Props) {
  const { addFanFic, updateFanFic } = useFanFics();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('Драма');
  const [rating, setRating] = useState('PG-13');
  const [size, setSize] = useState('Мини');
  const [annotation, setAnnotation] = useState('');
  const [status, setStatus] = useState('process');
  const [coverColor, setCoverColor] = useState('from-purple-900 to-indigo-900');
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: Date.now(), title: 'Глава 1', content: '' }
  ]);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (editFic) {
      setTitle(editFic.title);
      setAuthor(editFic.author);
      setGenre(editFic.genre);
      setRating(editFic.rating);
      setSize(editFic.size);
      setAnnotation(editFic.annotation);
      setStatus(editFic.status);
      setCoverColor(editFic.coverColor);
      setChapters(editFic.chapters.length > 0 ? editFic.chapters : [{ id: Date.now(), title: 'Глава 1', content: '' }]);
    }
  }, [editFic]);

  const coverOptions = [
    { value: 'from-purple-900 to-indigo-900', label: '🟣 Фиолетовый' },
    { value: 'from-violet-900 to-purple-900', label: '💜 Лиловый' },
    { value: 'from-indigo-900 to-purple-800', label: '🔵 Индиго' },
    { value: 'from-fuchsia-900 to-purple-900', label: '🌸 Фуксия' },
    { value: 'from-purple-950 to-violet-900', label: '🌑 Тёмный' },
  ];

  const addChapter = () => {
    const newChapter: Chapter = {
      id: Date.now(),
      title: `Глава ${chapters.length + 1}`,
      content: ''
    };
    setChapters([...chapters, newChapter]);
    setActiveChapterIdx(chapters.length);
  };

  const removeChapter = (idx: number) => {
    if (chapters.length <= 1) return;
    const newChapters = chapters.filter((_, i) => i !== idx);
    setChapters(newChapters);
    if (activeChapterIdx >= newChapters.length) {
      setActiveChapterIdx(newChapters.length - 1);
    }
  };

  const updateChapterTitle = (idx: number, newTitle: string) => {
    setChapters(chapters.map((ch, i) => i === idx ? { ...ch, title: newTitle } : ch));
  };

  const updateChapterContent = (idx: number, newContent: string) => {
    setChapters(chapters.map((ch, i) => i === idx ? { ...ch, content: newContent } : ch));
  };

  const handleSave = (asDraft: boolean) => {
    if (!title || !author || !annotation) return;
    const hasContent = chapters.some(ch => ch.content.trim().length > 0);
    if (!hasContent && !asDraft) return;

    const ficData = {
      title, author, genre, rating, size, annotation,
      chapters, status, coverColor, isDraft: asDraft,
      pollQuestion: editFic?.pollQuestion || 'Кто ваш любимый персонаж?',
      pollOptions: editFic?.pollOptions || [
        { id: 'a', label: 'Персонаж А', emoji: '✨' },
        { id: 'b', label: 'Персонаж Б', emoji: '⭐' },
        { id: 'c', label: 'Персонаж В', emoji: '🌟' },
        { id: 'd', label: 'Персонаж Г', emoji: '💫' },
      ],
    };

    if (editFic) {
      updateFanFic(editFic.id, ficData);
    } else {
      addFanFic(ficData);
    }

    setSubmitted(true);
    setTimeout(() => onClose(), 1500);
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
            Сохранено!
          </h3>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Ваша работа сохранена.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className={`rounded-2xl p-6 sm:p-8 max-w-3xl w-full border my-8 ${
        isDark ? 'bg-dark-700 border-purple-800/30' : 'bg-white border-purple-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {editFic ? '✏️ Редактировать фанфик' : '✍️ Новый фанфик'}
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

        <div className="space-y-4">
          {/* Basic info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Название *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="Название вашего фанфика" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Автор *</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ваш никнейм" required className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Аннотация *</label>
            <input type="text" value={annotation} onChange={(e) => setAnnotation(e.target.value)}
              placeholder="Краткое описание работы" required className={inputClass} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className={labelClass}>Жанр</label>
              <select value={genre} onChange={(e) => setGenre(e.target.value)} className={inputClass}>
                <option>Драма</option><option>Юмор</option><option>Романтика</option>
                <option>Приключения</option><option>Фэнтези</option><option>Детектив</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Рейтинг</label>
              <select value={rating} onChange={(e) => setRating(e.target.value)} className={inputClass}>
                <option>G</option><option>PG-13</option><option>R</option><option>NC-17</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Размер</label>
              <select value={size} onChange={(e) => setSize(e.target.value)} className={inputClass}>
                <option>Мини</option><option>Миди</option><option>Макси</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Статус</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
                <option value="process">В процессе</option>
                <option value="completed">Завершён</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Обложка</label>
            <div className="flex flex-wrap gap-2">
              {coverOptions.map(opt => (
                <button key={opt.value} type="button" onClick={() => setCoverColor(opt.value)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                    coverColor === opt.value
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : isDark
                        ? 'bg-dark-600 border-purple-700/30 text-gray-400 hover:border-purple-600/50'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-purple-400'
                  }`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chapters */}
          <div className={`border rounded-xl p-4 ${isDark ? 'border-purple-800/30 bg-dark-800/50' : 'border-purple-200 bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-purple-200' : 'text-purple-800'}`}>
                📑 Главы ({chapters.length})
              </h3>
              <button
                type="button"
                onClick={addChapter}
                className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
              >
                + Добавить главу
              </button>
            </div>

            {/* Chapter tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {chapters.map((ch, idx) => (
                <div key={ch.id} className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveChapterIdx(idx)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                      activeChapterIdx === idx
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : isDark
                          ? 'bg-dark-600 border-purple-700/30 text-gray-400 hover:border-purple-600/50'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-purple-400'
                    }`}
                  >
                    {ch.title || `Глава ${idx + 1}`}
                  </button>
                  {chapters.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChapter(idx)}
                      className={`w-5 h-5 rounded text-xs flex items-center justify-center ${
                        isDark ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Active chapter editor */}
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Название главы</label>
                <input
                  type="text"
                  value={chapters[activeChapterIdx]?.title || ''}
                  onChange={(e) => updateChapterTitle(activeChapterIdx, e.target.value)}
                  placeholder="Например: Глава 1. Начало пути"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Текст главы</label>
                <textarea
                  value={chapters[activeChapterIdx]?.content || ''}
                  onChange={(e) => updateChapterContent(activeChapterIdx, e.target.value)}
                  placeholder="Начните писать свою историю..."
                  rows={10}
                  className={`${inputClass} resize-none`}
                  style={{ fontFamily: 'Georgia, serif' }}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button type="button" onClick={onClose}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                isDark
                  ? 'bg-dark-600 border border-purple-700/30 text-gray-300 hover:bg-dark-500'
                  : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200'
              }`}>
              Отмена
            </button>
            <button type="button" onClick={() => handleSave(true)}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                isDark
                  ? 'bg-dark-600 border border-purple-700/30 text-purple-300 hover:bg-purple-800/30'
                  : 'bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100'
              }`}>
              💾 Сохранить черновик
            </button>
            <button type="button" onClick={() => handleSave(false)}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-violet-500 transition-all shadow-lg shadow-purple-600/20">
              🚀 Опубликовать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
