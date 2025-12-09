import React, { useState, useEffect } from 'react';
import { GameState, Player, Card } from './types';
import { generateDeck } from './utils';
import SetupScreen from './components/SetupScreen';
import CardItem from './components/CardItem';
import CelebrationOverlay from './components/CelebrationOverlay';
import WinScreen from './components/WinScreen';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const startGame = (name1: string, name2: string) => {
    setPlayers([
      { id: 1, name: name1, score: 0, color: 'pink' },
      { id: 2, name: name2, score: 0, color: 'blue' },
    ]);
    setCards(generateDeck());
    setCurrentPlayerIdx(0);
    setGameState('playing');
    setFlippedCards([]);
    setIsProcessing(false);
  };

  const restartGame = () => {
    setCards(generateDeck());
    setPlayers(players.map(p => ({ ...p, score: 0 })));
    setCurrentPlayerIdx(0);
    setGameState('playing');
    setFlippedCards([]);
    setIsProcessing(false);
  };

  const handleCardClick = (clickedCard: Card) => {
    // Logic guards
    if (gameState !== 'playing') return;
    if (isProcessing) return;
    if (flippedCards.length >= 2) return;
    if (clickedCard.isMatched || clickedCard.isFlipped) return;

    // Flip the card
    const newCards = cards.map(c => 
      c.id === clickedCard.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    // Check for match if 2 cards are flipped
    if (newFlipped.length === 2) {
      setIsProcessing(true);
      checkForMatch(newFlipped[0], newFlipped[1], newCards);
    }
  };

  const checkForMatch = (card1: Card, card2: Card, currentCards: Card[]) => {
    if (card1.animal === card2.animal) {
      // MATCH!
      setTimeout(() => {
        const matchedCards = currentCards.map(c => 
          (c.id === card1.id || c.id === card2.id) 
            ? { ...c, isMatched: true, isFlipped: true } 
            : c
        );
        setCards(matchedCards);
        
        // Update score
        const newPlayers = [...players];
        newPlayers[currentPlayerIdx].score += 1;
        setPlayers(newPlayers);
        
        // Show celebration
        setGameState('celebration');
        setFlippedCards([]);
        setIsProcessing(false);

        // Check for game over (all matched)
        if (matchedCards.every(c => c.isMatched)) {
           // Wait a bit after celebration to show win screen
           // But actually, we need to let the celebration happen first.
           // The celebration dismiss will handle the win check logic.
        }

      }, 500);
    } else {
      // NO MATCH
      setTimeout(() => {
        const resetCards = currentCards.map(c => 
          (c.id === card1.id || c.id === card2.id) 
            ? { ...c, isFlipped: false } 
            : c
        );
        setCards(resetCards);
        setFlippedCards([]);
        setCurrentPlayerIdx(prev => (prev === 0 ? 1 : 0)); // Switch turn
        setIsProcessing(false);
      }, 1500); // 1.5s delay so kids can see what they missed
    }
  };

  const handleCelebrationDismiss = () => {
    const allMatched = cards.every(c => c.isMatched);
    if (allMatched) {
      setGameState('finished');
    } else {
      setGameState('playing');
    }
  };

  if (gameState === 'setup') {
    return <SetupScreen onStart={startGame} />;
  }

  const currentPlayer = players[currentPlayerIdx];
  const waitingPlayer = players[currentPlayerIdx === 0 ? 1 : 0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Header / Scoreboard */}
      <header className="bg-white p-4 shadow-sm border-b-2 border-slate-100">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="hidden sm:block text-xl font-bold text-slate-400">Bichinhos da Memória</h1>
            
            <div className="flex gap-4 w-full sm:w-auto justify-center">
                {players.map((p, idx) => {
                    const isActive = idx === currentPlayerIdx;
                    return (
                        <div 
                            key={p.id}
                            className={`
                                flex flex-col items-center px-6 py-2 rounded-2xl transition-all duration-500
                                ${isActive 
                                    ? `bg-${p.color}-100 ring-4 ring-${p.color}-300 scale-110 shadow-lg z-10` 
                                    : 'bg-slate-100 opacity-60 scale-90 grayscale-[0.5]'
                                }
                            `}
                        >
                            <span className={`text-sm font-bold text-${p.color}-500 uppercase tracking-wider mb-1`}>
                                {isActive ? 'Vez de' : ''}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-slate-700">{p.name}</span>
                                <span className={`flex items-center justify-center w-8 h-8 bg-white rounded-full font-black text-${p.color}-500 shadow-sm`}>
                                    {p.score}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 max-w-2xl mx-auto w-full p-4 flex flex-col items-center justify-center">
        
        {/* Turn Indicator Message */}
        <div className="mb-6 flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm">
            <Sparkles className={`text-${currentPlayer.color}-400 w-5 h-5 animate-pulse`} />
            <p className="text-lg text-slate-600">
                Agora é a vez da <strong className={`text-${currentPlayer.color}-500 text-xl`}>{currentPlayer.name}</strong>
            </p>
            <Sparkles className={`text-${currentPlayer.color}-400 w-5 h-5 animate-pulse`} />
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
            {cards.map(card => (
                <CardItem 
                    key={card.id} 
                    card={card} 
                    onClick={handleCardClick} 
                    disabled={gameState !== 'playing' || isProcessing}
                />
            ))}
        </div>
      </main>

      {/* Overlays */}
      {gameState === 'celebration' && (
        <CelebrationOverlay 
            player={currentPlayer} 
            onDismiss={handleCelebrationDismiss} 
        />
      )}

      {gameState === 'finished' && (
        <WinScreen 
            players={players} 
            onRestart={restartGame} 
        />
      )}
    </div>
  );
};

export default App;