import React from 'react';
import { Player } from '../types';
import { Trophy, RefreshCcw } from 'lucide-react';

interface WinScreenProps {
  players: Player[];
  onRestart: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({ players, onRestart }) => {
  const winner = [...players].sort((a, b) => b.score - a.score)[0];
  const isDraw = players[0].score === players[1].score;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-pop border-8 border-yellow-300">
        <div className="mx-auto w-32 h-32 rounded-full bg-yellow-100 flex items-center justify-center mb-6 relative">
          <Trophy className="w-16 h-16 text-yellow-500" />
          <div className="absolute top-0 right-0 text-4xl animate-bounce">✨</div>
          <div className="absolute bottom-0 left-0 text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</div>
        </div>

        {isDraw ? (
           <h2 className="text-4xl font-bold text-gray-800 mb-2">Empate!</h2>
        ) : (
            <>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Parabéns!</h2>
                <p className="text-2xl text-gray-600 mb-6">
                A vencedora é <span className={`font-bold text-${winner.color}-500 text-3xl block mt-2`}>{winner.name}</span>
                </p>
            </>
        )}

        <div className="grid grid-cols-2 gap-4 mb-8">
            {players.map(p => (
                <div key={p.id} className={`bg-${p.color}-50 p-4 rounded-xl border-2 border-${p.color}-200`}>
                    <div className="text-sm text-gray-500">{p.name}</div>
                    <div className={`text-3xl font-bold text-${p.color}-500`}>{p.score}</div>
                </div>
            ))}
        </div>

        <button
          onClick={onRestart}
          className="w-full py-4 bg-green-500 text-white rounded-xl text-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200"
        >
          <RefreshCcw className="w-6 h-6" />
          Jogar de Novo
        </button>
      </div>
    </div>
  );
};

export default WinScreen;