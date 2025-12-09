import { ANIMALS, Card } from './types';

export const generateDeck = (): Card[] => {
  const cards: Card[] = [];
  let idCounter = 1;

  // We have 6 animal types, making 12 cards (6 pairs)
  ANIMALS.forEach((animalData) => {
    // Add pair 1
    cards.push({
      id: idCounter++,
      animal: animalData.emoji,
      color: animalData.color,
      isFlipped: false,
      isMatched: false,
    });
    // Add pair 2
    cards.push({
      id: idCounter++,
      animal: animalData.emoji,
      color: animalData.color,
      isFlipped: false,
      isMatched: false,
    });
  });

  return shuffle(cards);
};

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}