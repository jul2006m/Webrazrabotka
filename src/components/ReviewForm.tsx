import { useState } from 'react';

export default function ReviewForm() {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && review) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setReview('');
      }, 3000);
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-dark-700/50 border border-purple-800/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-purple-200 mb-6 text-center">
            ✍️ Оставить отзыв
          </h3>

          {submitted ? (
            <div className="text-center py-8">
              <span className="text-5xl block mb-4">🎉</span>
              <p className="text-green-400 text-lg font-medium">Спасибо за ваш отзыв!</p>
              <p className="text-gray-500 text-sm mt-2">Он будет опубликован после модерации.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Ваше имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите ваше имя..."
                  required
                  className="w-full px-4 py-3 bg-dark-600 border border-purple-700/30 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Ваш отзыв</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Расскажите о своих впечатлениях..."
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-dark-600 border border-purple-700/30 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-purple-600/20"
              >
                Отправить отзыв 📨
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
