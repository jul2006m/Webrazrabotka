import { useState } from 'react';
import { FanFic } from '../contexts/FanFicsContext';
import { useFanFics } from '../contexts/FanFicsContext';
import { useTheme } from '../contexts/ThemeContext';

interface FicCardProps {
  fic: FanFic;
  onRead: (fic: FanFic) => void;
}

export default function FicCard({ fic, onRead }: FicCardProps) {
  const { toggleLike } = useFanFics();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    toggleLike(fic.id);
    setLiked(!liked);
  };

  const getRatingColor = (rating: string) => {
    if (isDark) {
      switch (rating) {
        case 'G': return 'bg-green-900/50 text-green-300 border-green-700/50';
        case 'PG-13': return 'bg-yellow-900/50 text-yellow-300 border-yellow-700/50';
        case 'R': return 'bg-orange-900/50 text-orange-300 border-orange-700/50';
        case 'NC-17': return 'bg-red-900/50 text-red-300 border-red-700/50';
        default: return 'bg-gray-900/50 text-gray-300 border-gray-700/50';
      }
    } else {
      switch (rating) {
        case 'G': return 'bg-green-100 text-green-700 border-green-200';
        case 'PG-13': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case 'R': return 'bg-orange-100 text-orange-700 border-orange-200';
        case 'NC-17': return 'bg-red-100 text-red-700 border-red-200';
        default: return 'bg-gray-100 text-gray-700 border-gray-200';
      }
    }
  };

  return (
    <article className={`group border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
      isDark
        ? 'bg-dark-700/80 border-purple-800/30 hover:border-purple-600/50 hover:shadow-xl hover:shadow-purple-900/20'
        : 'bg-white border-purple-200 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50'
    }`}>
      {/* Cover */}
      <div className={`h-48 bg-gradient-to-br ${fic.coverColor} flex items-center justify-center relative overflow-hidden cursor-pointer`}
           onClick={() => onRead(fic)}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
        <span className="text-5xl opacity-60 group-hover:opacity-80 transition-opacity">📖</span>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-bold rounded-md border ${getRatingColor(fic.rating)}`}>
            {fic.rating}
          </span>
        </div>
        {fic.status === 'process' && (
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-bold rounded-md border ${
              isDark
                ? 'bg-blue-900/50 text-blue-300 border-blue-700/50'
                : 'bg-blue-100 text-blue-700 border-blue-200'
            }`}>
              В процессе
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={`text-lg font-bold mb-1 group-hover:text-purple-400 transition-colors cursor-pointer ${
          isDark ? 'text-purple-100' : 'text-gray-900'
        }`} onClick={() => onRead(fic)}>
          {fic.title}
        </h3>
        <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Автор: <span className="text-purple-500">{fic.author}</span>
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-1 text-xs rounded-full border ${
            isDark ? 'bg-purple-800/40 text-purple-300 border-purple-700/30' : 'bg-purple-100 text-purple-700 border-purple-200'
          }`}>
            {fic.genre}
          </span>
          <span className={`px-2 py-1 text-xs rounded-full border ${
            isDark ? 'bg-violet-800/40 text-violet-300 border-violet-700/30' : 'bg-violet-100 text-violet-700 border-violet-200'
          }`}>
            {fic.size}
          </span>
        </div>

        {/* Annotation */}
        <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {fic.annotation}
        </p>

        {/* Stats */}
        <div className={`flex items-center gap-4 text-sm mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          <span>⭐ {fic.likes}</span>
          <span>💬 {fic.comments}</span>
          <span>👁 {fic.views}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleLike}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              liked
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                : isDark
                  ? 'bg-dark-600 border border-purple-700/50 text-purple-300 hover:bg-purple-800/30'
                  : 'bg-gray-50 border border-purple-200 text-purple-700 hover:bg-purple-50'
            }`}
          >
            {liked ? '❤️ Лайкнуто' : '🤍 Лайк'}
          </button>
          <button
            onClick={() => onRead(fic)}
            className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-500 hover:to-violet-500 transition-all duration-200"
          >
            📖 Читать
          </button>
        </div>
      </div>
    </article>
  );
}
