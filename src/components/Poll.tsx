import { useState } from 'react';

export default function Poll() {
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [voted, setVoted] = useState(false);
  const [results, setResults] = useState({
    hermione: 156,
    draco: 203,
    harry: 178,
    snape: 134
  });

  const characters = [
    { value: 'hermione', label: '🧙‍♀️ Гермиона', emoji: '🧙‍♀️' },
    { value: 'draco', label: '🐍 Драко', emoji: '🐍' },
    { value: 'harry', label: '⚡ Гарри', emoji: '⚡' },
    { value: 'snape', label: '🖤 Снейп', emoji: '🖤' },
  ];

  const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);

  const handleVote = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCharacter) {
      setResults(prev => ({
        ...prev,
        [selectedCharacter]: prev[selectedCharacter as keyof typeof prev] + 1
      }));
      setVoted(true);
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-dark-700/50 border border-purple-800/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-purple-200 mb-6 text-center">
            📊 Опрос: Кто ваш любимый персонаж?
          </h3>

          {!voted ? (
            <form onSubmit={handleVote}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {characters.map(char => (
                  <label
                    key={char.value}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedCharacter === char.value
                        ? 'bg-purple-800/40 border-purple-500 text-purple-200'
                        : 'bg-dark-600/50 border-purple-700/30 text-gray-400 hover:border-purple-600/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="character"
                      value={char.value}
                      checked={selectedCharacter === char.value}
                      onChange={(e) => setSelectedCharacter(e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-2xl">{char.emoji}</span>
                    <span className="font-medium">{char.label.split(' ')[1]}</span>
                  </label>
                ))}
              </div>
              <button
                type="submit"
                disabled={!selectedCharacter}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-violet-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Голосовать
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-green-400 mb-4">✅ Спасибо за ваш голос!</p>
              {characters.map(char => {
                const count = results[char.value as keyof typeof results];
                const percentage = Math.round((count / totalVotes) * 100);
                return (
                  <div key={char.value} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{char.label}</span>
                      <span className="text-purple-300">{percentage}% ({count})</span>
                    </div>
                    <div className="h-3 bg-dark-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-violet-500 rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <p className="text-center text-gray-500 text-sm mt-4">
                Всего голосов: {totalVotes}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
