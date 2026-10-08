import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdOtQ2jHBdgdQqZo6nvbTuSm7tCWlv-sec-i9exS8KopWgtfQ/viewform?embedded=true';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className={`rounded-2xl w-full max-w-2xl border overflow-hidden flex flex-col ${
        isDark ? 'bg-dark-700 border-purple-800/30' : 'bg-white border-purple-200'
      }`} style={{ maxHeight: '90vh' }}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 sm:p-6 border-b ${
          isDark ? 'border-purple-800/30' : 'border-purple-200'
        }`}>
          <h2 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
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

        {/* Google Form iframe */}
        <div className="relative flex-1 min-h-0">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-inherit">
              <div className="text-center">
                <div className="inline-block w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Загрузка формы...</p>
              </div>
            </div>
          )}
          <iframe
            src={formUrl}
            className="w-full border-0"
            style={{ height: '70vh', minHeight: '500px' }}
            onLoad={() => setIsLoading(false)}
            title="Форма обратной связи"
          >
            Загрузка...
          </iframe>
        </div>
      </div>
    </div>
  );
}
