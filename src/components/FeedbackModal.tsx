import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь можно добавить отправку данных на сервер
    console.log('Feedback:', { name, email, message });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2000);
  };

  const inputClass = `w-full px-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-1 focus:ring-purple-500 ${
    isDark
      ? 'bg-dark-600 border-purple-700/30 text-gray-200 placeholder-gray-500 focus:border-purple-500'
      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
  }`;

  const labelClass = `block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className={`rounded-2xl p-6 sm:p-8 max-w-md w-full border ${
        isDark ? 'bg-dark-700 border-purple-800/30' : 'bg-white border-purple-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            💬 Обратная связь
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

        {submitted ? (
          <div className="text-center py-8">
            <span className="text-6xl block mb-4">✅</span>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Спасибо за отзыв!
            </h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Ваше сообщение успешно отправлено.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Ваше имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как к вам обращаться?"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Сообщение</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Расскажите, что вы думаете о сайте..."
                rows={4}
                required
                className={`${inputClass} resize-none`}
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
                Отправить
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
