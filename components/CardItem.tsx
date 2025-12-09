import React from 'react';
import { Card } from '../types';
import { Star } from 'lucide-react';

interface CardItemProps {
  card: Card;
  onClick: (card: Card) => void;
  disabled: boolean;
}

const CardItem: React.FC<CardItemProps> = ({ card, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        aspect-square rounded-2xl cursor-pointer shadow-lg transition-all duration-300 transform
        ${card.isFlipped || card.isMatched ? 'rotate-y-180' : 'hover:scale-105 active:scale-95'}
        ${card.isMatched ? 'opacity-50 scale-95' : 'opacity-100'}
        relative
      `}
    >
      <div className="w-full h-full relative">
        {/* Card Back (Hidden state) */}
        <div
          className={`
            absolute inset-0 w-full h-full rounded-2xl flex items-center justify-center
            bg-indigo-400 border-4 border-indigo-200
            transition-all duration-300 backface-hidden
            ${card.isFlipped || card.isMatched ? 'opacity-0 z-0' : 'opacity-100 z-10'}
          `}
        >
           <Star className="text-indigo-200 w-12 h-12" fill="currentColor" />
        </div>

        {/* Card Front (Revealed state) */}
        <div
          className={`
            absolute inset-0 w-full h-full rounded-2xl flex items-center justify-center
            ${card.color} border-4 border-white
            text-6xl select-none
            transition-all duration-300 backface-hidden
            ${card.isFlipped || card.isMatched ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-90'}
          `}
        >
          {card.animal}
        </div>
      </div>
    </div>
  );
};

export default CardItem;