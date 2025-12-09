import React, { useEffect, useState } from 'react';
import { Player } from '../types';
import { PartyPopper } from 'lucide-react';

interface CelebrationOverlayProps {
  player: Player;
  onDismiss: () => void;
}

interface ConfettiParticleProps {
  delay: number;
  left: number;
}

const ConfettiParticle: React.FC<ConfettiParticleProps> = ({ delay, left }) => {
    const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return (
        <div 
            className="absolute top-0 w-4 h-4 rounded-full animate-bounce"
            style={{
                backgroundColor: color,
                left: `${left}%`,
                top: '-20px',
                animation: `fall ${2 + Math.random()}s linear ${delay}s infinite`,
            }}
        />
    );
}

const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({ player, onDismiss }) => {
  const [particles] = useState(() => Array.from({ length: 50 }, () => ({
      delay: Math.random() * 0.5,
      left: Math.random() * 100
  })));

  // Auto dismiss after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-pop">
      {/* CSS for falling confetti */}
      <style>{`
        @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      
      {particles.map((p, i) => (
          <ConfettiParticle key={i} delay={p.delay} left={p.left} />
      ))}

      <div className={`bg-white rounded-3xl p-8 max-w-sm w-[90%] text-center shadow-2xl border-8 border-${player.color}-400`}>
        <div className={`mx-auto w-24 h-24 rounded-full bg-${player.color}-100 flex items-center justify-center mb-4`}>
            <PartyPopper className={`w-14 h-14 text-${player.color}-500`} />
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Aeeeee!</h2>
        <p className="text-2xl text-gray-600">
          Muito bem, <span className={`font-bold text-${player.color}-500`}>{player.name}</span>!
        </p>
        <p className="text-lg mt-4 text-gray-400">Você achou o par!</p>

        <button 
            onClick={onDismiss}
            className={`mt-6 w-full py-4 bg-${player.color}-500 text-white rounded-xl text-xl font-bold hover:bg-${player.color}-600 transition-colors`}
        >
            Continuar
        </button>
      </div>
    </div>
  );
};

export default CelebrationOverlay;