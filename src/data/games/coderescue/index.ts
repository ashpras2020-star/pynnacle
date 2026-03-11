import type { CodeRescueGame } from '../../../types/game';
import { module9CodeRescueGame } from './module9-coderescue';

export { module9CodeRescueGame };

export const allCodeRescueGames: CodeRescueGame[] = [
  module9CodeRescueGame,
];

export function getCodeRescueGameByModuleId(moduleId: string): CodeRescueGame | undefined {
  return allCodeRescueGames.find(game => game.moduleId === moduleId);
}

export function getCodeRescueGameById(gameId: string): CodeRescueGame | undefined {
  return allCodeRescueGames.find(game => game.id === gameId);
}
