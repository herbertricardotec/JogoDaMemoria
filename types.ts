export interface Card {
  id: number;
  animal: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Player {
  id: number;
  name: string;
  score: number;
  color: string; // Tailwind color class prefix (e.g., 'pink', 'blue')
}

export type GameState = 'setup' | 'playing' | 'celebration' | 'finished';

export const ANIMALS = [
  { emoji: '🐶', color: 'bg-red-200' },
  { emoji: '🐱', color: 'bg-blue-200' },
  { emoji: '🦁', color: 'bg-yellow-200' },
  { emoji: '🐸', color: 'bg-green-200' },
  { emoji: '🐵', color: 'bg-orange-200' },
  { emoji: '🐘', color: 'bg-purple-200' },
];