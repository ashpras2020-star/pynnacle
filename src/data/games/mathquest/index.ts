import type { MathQuestGame } from '../../../types/game';
import { module2MathQuestGame } from './module6-mathquest';

export { module2MathQuestGame };

export const allMathQuestGames: MathQuestGame[] = [
  module2MathQuestGame,
];

export function getMathQuestGameByModuleId(moduleId: string): MathQuestGame | undefined {
  return allMathQuestGames.find(game => game.moduleId === moduleId);
}

export function getMathQuestGameById(gameId: string): MathQuestGame | undefined {
  return allMathQuestGames.find(game => game.id === gameId);
}
