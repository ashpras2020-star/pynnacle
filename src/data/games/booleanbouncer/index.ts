import type { BooleanBouncerGame } from '../../../types/game';
import { module4BooleanBouncerGame } from './module4-booleanbouncer';

export { module4BooleanBouncerGame };

export const allBooleanBouncerGames: BooleanBouncerGame[] = [
  module4BooleanBouncerGame,
];

export function getBooleanBouncerGameByModuleId(moduleId: string): BooleanBouncerGame | undefined {
  return allBooleanBouncerGames.find(game => game.moduleId === moduleId);
}

export function getBooleanBouncerGameById(gameId: string): BooleanBouncerGame | undefined {
  return allBooleanBouncerGames.find(game => game.id === gameId);
}
