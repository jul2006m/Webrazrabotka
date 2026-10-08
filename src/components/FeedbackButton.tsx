import { useTheme } from '../contexts/ThemeContext';

export default function FeedbackButton() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdOtQ2jHBdgdQqZo6nvbTuSm7tCWlv-sec-i9exS8KopWgtfQ/viewform?usp=publish-editor';

  const handleClick = () => {
    window.open(formUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`text-center py-8 border-t mb-8 ${isDark ? 'border-purple-800/30' : 'border-purple-200'}`}>
      <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Есть вопросы или предложения?</p>
      <button
        onClick={handleClick}
        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-purple-600/25 hover:shadow-purple-500/40 hover:scale-105 inline-flex items-center gap-2"
      >
        <span>💬</span>
        <span>Обратная связь</span>
      </button>
    </div>
  );
}
