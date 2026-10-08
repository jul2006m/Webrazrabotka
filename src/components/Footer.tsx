import { useTheme } from '../contexts/ThemeContext';
import FeedbackButton from './FeedbackButton';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`border-t py-12 mt-12 ${
      isDark ? 'bg-dark-800 border-purple-800/30' : 'bg-purple-50 border-purple-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📚</span>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'text-purple-700'}`}>
                FanFic World
              </h3>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              Платформа для любителей фанфиков. Читайте, пишите, делитесь своими историями.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>Навигация</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className={`transition-colors text-sm ${isDark ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'}`}>О проекте</a>
              <a href="#" className={`transition-colors text-sm ${isDark ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'}`}>Правила</a>
              <a href="#" className={`transition-colors text-sm ${isDark ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'}`}>Контакты</a>
              <a href="#" className={`transition-colors text-sm ${isDark ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'}`}>Помощь</a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>Сообщество</h4>
            <div className="flex gap-3">
              <a href="#" className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                isDark
                  ? 'bg-dark-700 border border-purple-700/30 text-gray-400 hover:text-purple-400 hover:border-purple-600/50'
                  : 'bg-white border border-purple-200 text-gray-600 hover:text-purple-600 hover:border-purple-400'
              }`}>
                💬
              </a>
              <a href="#" className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                isDark
                  ? 'bg-dark-700 border border-purple-700/30 text-gray-400 hover:text-purple-400 hover:border-purple-600/50'
                  : 'bg-white border border-purple-200 text-gray-600 hover:text-purple-600 hover:border-purple-400'
              }`}>
                📱
              </a>
              <a href="#" className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                isDark
                  ? 'bg-dark-700 border border-purple-700/30 text-gray-400 hover:text-purple-400 hover:border-purple-600/50'
                  : 'bg-white border border-purple-200 text-gray-600 hover:text-purple-600 hover:border-purple-400'
              }`}>
                ✉️
              </a>
            </div>
          </div>
        </div>

        <FeedbackButton />

        <div className={`border-t pt-6 text-center ${isDark ? 'border-purple-800/30' : 'border-purple-200'}`}>
          <p className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
            &copy; 2024 FanFic World. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
