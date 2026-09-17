export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-purple-800/30 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📚</span>
              <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
                FanFic World
              </h3>
            </div>
            <p className="text-gray-500 text-sm">
              Платформа для любителей фанфиков. Читайте, пишите, делитесь своими историями.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-purple-300 mb-4">Навигация</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">О проекте</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Правила</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Контакты</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Помощь</a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-purple-300 mb-4">Сообщество</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-700 border border-purple-700/30 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-600/50 transition-all">
                💬
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-700 border border-purple-700/30 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-600/50 transition-all">
                📱
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-700 border border-purple-700/30 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-600/50 transition-all">
                ✉️
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-800/30 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            &copy; 2024 FanFic World. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
