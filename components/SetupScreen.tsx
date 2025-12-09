import React, { useState } from 'react';
import { Gamepad2, User } from 'lucide-react';

interface SetupScreenProps {
  onStart: (name1: string, name2: string) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [p1Name, setP1Name] = useState('');
  const [p2Name, setP2Name] = useState('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (p1Name.trim() && p2Name.trim()) {
      onStart(p1Name, p2Name);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border-b-8 border-purple-300">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-purple-100 mb-4 animate-bounce">
             <Gamepad2 className="w-12 h-12 text-purple-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quem vai jogar?</h1>
          <p className="text-gray-500">Digite o nome das jogadoras</p>
        </div>

        <form onSubmit={handleStart} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-pink-500 uppercase tracking-wide">Jogadora 1 (Rosa)</label>
            <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 group-focus-within:text-pink-500 transition-colors" />
                <input
                type="text"
                value={p1Name}
                onChange={(e) => setP1Name(e.target.value)}
                placeholder="Nome..."
                autoComplete="off"
                className="w-full pl-12 pr-4 py-4 bg-pink-50 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-0 text-xl text-gray-700 placeholder-pink-200 outline-none transition-all"
                required
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-500 uppercase tracking-wide">Jogadora 2 (Azul)</label>
            <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 group-focus-within:text-blue-500 transition-colors" />
                <input
                type="text"
                value={p2Name}
                onChange={(e) => setP2Name(e.target.value)}
                placeholder="Nome..."
                autoComplete="off"
                className="w-full pl-12 pr-4 py-4 bg-blue-50 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-0 text-xl text-gray-700 placeholder-blue-200 outline-none transition-all"
                required
                />
            </div>
          </div>

          <button
            type="submit"
            disabled={!p1Name.trim() || !p2Name.trim()}
            className="w-full py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-xl font-bold shadow-lg shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4 transform active:scale-95"
          >
            Começar Festa!
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupScreen;