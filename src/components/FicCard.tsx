import { useState } from 'react';
import { FanFic } from '../data/fanFics';

interface FicCardProps {
  fic: FanFic;
}

export default function FicCard({ fic }: FicCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(fic.likes);

  const toggleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'G': return 'bg-green-900/50 text-green-300 border-green-700/50';
      case 'PG-13': return 'bg-yellow-900/50 text-yellow-300 border-yellow-700/50';
      case 'R': return 'bg-orange-900/50 text-orange-300 border-orange-700/50';
      case 'NC-17': return 'bg-red-900/50 text-red-300 border-red-700/50';
      default: return 'bg-gray-900/50 text-gray-300 border-gray-700/50';
    }
  };

  return (
    <article className="group bg-dark-700/80 border border-purple-800/30 rounded-2xl overflow-hidden hover:border-purple-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20 hover:-translate-y-1">
      {/* Cover */}
      <div className={`h-48 bg-gradient-to-br ${fic.coverColor} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
        <span className="text-5xl opacity-60 group-hover:opacity-80 transition-opacity">📖</span>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-bold rounded-md border ${getRatingColor(fic.rating)}`}>
            {fic.rating}
          </span>
        </div>
        {fic.status === 'process' && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-bold rounded-md bg-blue-900/50 text-blue-300 border border-blue-700/50">
              В процессе
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-purple-100 mb-1 group-hover:text-purple-300 transition-colors">
          {fic.title}
        </h3>
        <p className="text-sm text-gray-400 mb-3">
          Автор: <span className="text-purple-400">{fic.author}</span>
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 text-xs rounded-full bg-purple-800/40 text-purple-300 border border-purple-700/30">
            {fic.genre}
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-violet-800/40 text-violet-300 border border-violet-700/30">
            {fic.size}
          </span>
        </div>

        {/* Annotation */}
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {fic.annotation}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span>⭐ {likeCount}</span>
          <span>💬 {fic.comments}</span>
          <span>👁 {fic.views}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={toggleLike}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              liked
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                : 'bg-dark-600 border border-purple-700/50 text-purple-300 hover:bg-purple-800/30'
            }`}
          >
            {liked ? '❤️ Лайкнуто' : '🤍 Лайк'}
          </button>
          <button className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-500 hover:to-violet-500 transition-all duration-200">
            📖 Читать
          </button>
        </div>
      </div>
    </article>
  );
}
