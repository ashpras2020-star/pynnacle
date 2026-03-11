import type { GuardGateGame } from '../../../types/game';
import { module5GuardGateGame } from './module2-guardgate';

export { module5GuardGateGame };

export const allGuardGateGames: GuardGateGame[] = [
  module5GuardGateGame,
];

export function getGuardGateGameByModuleId(moduleId: string): GuardGateGame | undefined {
  return allGuardGateGames.find(game => game.moduleId === moduleId);
}

export function getGuardGateGameById(gameId: string): GuardGateGame | undefined {
  return allGuardGateGames.find(game => game.id === gameId);
}
