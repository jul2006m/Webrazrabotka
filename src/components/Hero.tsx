import { useTheme } from '../contexts/ThemeContext';

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background effects */}
      <div className={`absolute inset-0 ${
        isDark
          ? 'bg-gradient-to-br from-dark-900 via-purple-900/20 to-dark-900'
          : 'bg-gradient-to-br from-purple-50 via-violet-50 to-purple-50'
      }`} />
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
        isDark ? 'bg-purple-600/10' : 'bg-purple-300/30'
      }`} />
      <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl ${
        isDark ? 'bg-violet-600/10' : 'bg-violet-300/30'
      }`} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span className={
            isDark
              ? 'text-white drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]'
              : 'text-purple-800'
          }>
            Добро пожаловать в мир фанфиков
          </span>
        </h2>
        <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Читай, обсуждай, делись своими историями по любимым фандомам
        </p>
      </div>
    </section>
  );
}
