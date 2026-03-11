import type { CipherCrackerGame } from '../../../types/game';
import { module3CipherCrackerGame } from './module5-ciphercracker';

export { module3CipherCrackerGame };

export const allCipherCrackerGames: CipherCrackerGame[] = [
  module3CipherCrackerGame,
];

export function getCipherCrackerGameByModuleId(moduleId: string): CipherCrackerGame | undefined {
  return allCipherCrackerGames.find(game => game.moduleId === moduleId);
}

export function getCipherCrackerGameById(gameId: string): CipherCrackerGame | undefined {
  return allCipherCrackerGames.find(game => game.id === gameId);
}
