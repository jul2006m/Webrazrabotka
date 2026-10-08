import { useState } from 'react';
import { FanFic } from '../contexts/FanFicsContext';
import { useFanFics } from '../contexts/FanFicsContext';
import { useTheme } from '../contexts/ThemeContext';

interface Props {
  fic: FanFic;
  onBack: () => void;
  onEdit: (fic: FanFic) => void;
}

export default function FanficReader({ fic, onBack, onEdit }: Props) {
  const { addReview, voteCharacter } = useFanFics();
  const { theme } = useTheme();
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [votedCharacter, setVotedCharacter] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);
  const [activeTab, setActiveTab] = useState<'chapters' | 'reviews' | 'poll'>('chapters');
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);

  const isDark = theme === 'dark';

  const currentChapter = fic.chapters[currentChapterIdx];

  const goToPrevChapter = () => {
    if (currentChapterIdx > 0) {
      setCurrentChapterIdx(currentChapterIdx - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextChapter = () => {
    if (currentChapterIdx < fic.chapters.length - 1) {
      setCurrentChapterIdx(currentChapterIdx + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName && reviewText) {
      addReview(fic.id, { author: reviewName, text: reviewText });
      setReviewName('');
      setReviewText('');
      setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 2500);
    }
  };

  const handleVote = (characterId: string) => {
    if (!voted) {
      voteCharacter(fic.id, characterId);
      setVotedCharacter(characterId);
      setVoted(true);
    }
  };

  const totalVotes = Object.values(fic.pollResults).reduce((a, b) => a + b, 0);

  const characters = fic.pollOptions;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-900 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isDark ? 'text-purple-300 hover:bg-dark-700' : 'text-purple-700 hover:bg-purple-50'
            }`}
          >
            ← Назад к каталогу
          </button>
          {fic.isDraft && (
            <button
              onClick={() => onEdit(fic)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg hover:from-purple-500 hover:to-violet-500 transition-all text-sm"
            >
              ✏️ Редактировать
            </button>
          )}
        </div>

        {/* Title block */}
        <div className={`rounded-2xl p-6 sm:p-8 mb-6 border ${
          isDark ? 'bg-dark-700/80 border-purple-800/30' : 'bg-white border-purple-200 shadow-sm'
        }`}>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className={`w-full sm:w-40 h-48 rounded-xl bg-gradient-to-br ${fic.coverColor} flex items-center justify-center flex-shrink-0 relative`}>
              <span className="text-5xl opacity-70">📖</span>
              {fic.isDraft && (
                <span className="absolute top-2 left-2 px-2 py-1 text-xs bg-yellow-600 text-white rounded-md font-bold">
                  📝 Черновик
                </span>
              )}
            </div>
            <div className="flex-1">
              <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {fic.title}
              </h1>
              <p className={`mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Автор: <span className="text-purple-500 font-medium">{fic.author}</span>
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-2 py-1 text-xs rounded-full ${isDark ? 'bg-purple-800/40 text-purple-300 border border-purple-700/30' : 'bg-purple-100 text-purple-700'}`}>
                  {fic.genre}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${isDark ? 'bg-violet-800/40 text-violet-300 border border-violet-700/30' : 'bg-violet-100 text-violet-700'}`}>
                  {fic.rating}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${isDark ? 'bg-indigo-800/40 text-indigo-300 border border-indigo-700/30' : 'bg-indigo-100 text-indigo-700'}`}>
                  {fic.size}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${isDark ? 'bg-gray-800/40 text-gray-300 border border-gray-700/30' : 'bg-gray-100 text-gray-700'}`}>
                  📑 {fic.chapters.length} {fic.chapters.length === 1 ? 'глава' : 'глав'}
                </span>
              </div>
              <p className={`text-sm italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {fic.annotation}
              </p>
              <div className={`flex gap-4 mt-4 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                <span>⭐ {fic.likes}</span>
                <span>💬 {fic.comments}</span>
                <span>👁 {fic.views}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex gap-1 mb-6 p-1 rounded-xl ${isDark ? 'bg-dark-700/50' : 'bg-gray-100'}`}>
          <button
            onClick={() => setActiveTab('chapters')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'chapters'
                ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md'
                : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📖 Главы
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'reviews'
                ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md'
                : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            💬 Отзывы ({fic.reviews.length})
          </button>
          <button
            onClick={() => setActiveTab('poll')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'poll'
                ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md'
                : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📊 Опрос
          </button>
        </div>

        {/* Chapters Tab */}
        {activeTab === 'chapters' && (
          <div className="space-y-4">
            {/* Chapter list */}
            <div className={`rounded-2xl p-6 border ${
              isDark ? 'bg-dark-700/80 border-purple-800/30' : 'bg-white border-purple-200 shadow-sm'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-purple-200' : 'text-purple-800'}`}>
                📑 Выберите главу
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fic.chapters.map((chapter, idx) => (
                  <button
                    key={chapter.id}
                    onClick={() => setCurrentChapterIdx(idx)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      currentChapterIdx === idx
                        ? isDark
                          ? 'bg-purple-800/40 border-purple-500 text-purple-200'
                          : 'bg-purple-50 border-purple-400 text-purple-800'
                        : isDark
                          ? 'bg-dark-600/50 border-purple-700/30 text-gray-300 hover:border-purple-600/50'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-purple-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-2xl font-bold ${
                        currentChapterIdx === idx ? 'text-purple-400' : isDark ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="font-medium">{chapter.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Current chapter content */}
            {currentChapter && (
              <div className={`rounded-2xl p-6 sm:p-8 border ${
                isDark ? 'bg-dark-700/80 border-purple-800/30' : 'bg-white border-purple-200 shadow-sm'
              }`}>
                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {currentChapter.title}
                </h2>
                <div className={`prose max-w-none whitespace-pre-line leading-relaxed ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`} style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem' }}>
                  {currentChapter.content}
                </div>

                {/* Navigation */}
                <div className={`flex items-center justify-between mt-8 pt-6 border-t ${
                  isDark ? 'border-purple-800/30' : 'border-purple-200'
                }`}>
                  <button
                    onClick={goToPrevChapter}
                    disabled={currentChapterIdx === 0}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      currentChapterIdx === 0
                        ? 'opacity-50 cursor-not-allowed'
                        : isDark
                          ? 'bg-dark-600 text-purple-300 hover:bg-purple-800/30'
                          : 'bg-gray-100 text-purple-700 hover:bg-purple-50'
                    }`}
                  >
                    ← Предыдущая
                  </button>
                  <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {currentChapterIdx + 1} из {fic.chapters.length}
                  </span>
                  <button
                    onClick={goToNextChapter}
                    disabled={currentChapterIdx === fic.chapters.length - 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      currentChapterIdx === fic.chapters.length - 1
                        ? 'opacity-50 cursor-not-allowed'
                        : isDark
                          ? 'bg-dark-600 text-purple-300 hover:bg-purple-800/30'
                          : 'bg-gray-100 text-purple-700 hover:bg-purple-50'
                    }`}
                  >
                    Следующая →
                  </button>
                </div>

                {/* Next chapters list */}
                {currentChapterIdx < fic.chapters.length - 1 && (
                  <div className={`mt-6 pt-6 border-t ${isDark ? 'border-purple-800/30' : 'border-purple-200'}`}>
                    <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Следующие главы:
                    </h4>
                    <div className="space-y-2">
                      {fic.chapters.slice(currentChapterIdx + 1).map((chapter, idx) => {
                        const actualIdx = currentChapterIdx + 1 + idx;
                        return (
                          <button
                            key={chapter.id}
                            onClick={() => {
                              setCurrentChapterIdx(actualIdx);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${
                              isDark
                                ? 'bg-dark-600/50 border-purple-700/30 text-gray-300 hover:border-purple-600/50 hover:bg-purple-800/20'
                                : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                            }`}
                          >
                            <span className="text-purple-400 font-medium mr-2">{actualIdx + 1}.</span>
                            {chapter.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className={`rounded-2xl p-6 border ${
              isDark ? 'bg-dark-700/80 border-purple-800/30' : 'bg-white border-purple-200 shadow-sm'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-purple-200' : 'text-purple-800'}`}>
                ✍️ Оставить отзыв
              </h3>
              {reviewSubmitted ? (
                <div className="text-center py-4">
                  <span className="text-3xl block mb-2">🎉</span>
                  <p className="text-green-500 font-medium">Спасибо за отзыв!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-3">
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Ваше имя"
                    required
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      isDark
                        ? 'bg-dark-600 border-purple-700/30 text-gray-200 placeholder-gray-500 focus:border-purple-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                    } focus:outline-none focus:ring-1 focus:ring-purple-500`}
                  />
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Ваш отзыв..."
                    rows={3}
                    required
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all resize-none ${
                      isDark
                        ? 'bg-dark-600 border-purple-700/30 text-gray-200 placeholder-gray-500 focus:border-purple-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                    } focus:outline-none focus:ring-1 focus:ring-purple-500`}
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-violet-500 transition-all"
                  >
                    Отправить
                  </button>
                </form>
              )}
            </div>

            {fic.reviews.length > 0 ? (
              fic.reviews.map(review => (
                <div
                  key={review.id}
                  className={`rounded-2xl p-5 border ${
                    isDark ? 'bg-dark-700/80 border-purple-800/30' : 'bg-white border-purple-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                      {review.author}
                    </span>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {review.date}
                    </span>
                  </div>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>{review.text}</p>
                </div>
              ))
            ) : (
              <div className={`text-center py-8 rounded-2xl border ${
                isDark ? 'bg-dark-700/50 border-purple-800/30' : 'bg-white border-purple-200'
              }`}>
                <p className={isDark ? 'text-gray-500' : 'text-gray-400'}>Пока нет отзывов. Будьте первым!</p>
              </div>
            )}
          </div>
        )}

        {/* Poll Tab */}
        {activeTab === 'poll' && (
          <div className={`rounded-2xl p-6 border ${
            isDark ? 'bg-dark-700/80 border-purple-800/30' : 'bg-white border-purple-200 shadow-sm'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-purple-200' : 'text-purple-800'}`}>
              📊 {fic.pollQuestion}
            </h3>

            {!voted ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {characters.map(char => (
                  <button
                    key={char.id}
                    onClick={() => handleVote(char.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      isDark
                        ? 'bg-dark-600/50 border-purple-700/30 text-gray-300 hover:border-purple-500 hover:bg-purple-800/30'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                  >
                    <span className="text-2xl">{char.emoji}</span>
                    <span className="font-medium">{char.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-green-500 text-center mb-4">✅ Спасибо за ваш голос!</p>
                {characters.map(char => {
                  const count = fic.pollResults[char.id] || 0;
                  const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                  return (
                    <div key={char.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {char.emoji} {char.label}
                        </span>
                        <span className="text-purple-400">{percentage}% ({count})</span>
                      </div>
                      <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-dark-600' : 'bg-gray-200'}`}>
                        <div
                          className="h-full bg-gradient-to-r from-purple-600 to-violet-500 rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                <p className={`text-center text-sm mt-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Всего голосов: {totalVotes}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
