import type { RobotCommanderGame } from '../../../types/game';
import { module7RobotCommanderGame } from './module7-robotcommander';

export { module7RobotCommanderGame };

export const allRobotCommanderGames: RobotCommanderGame[] = [
  module7RobotCommanderGame,
];

export function getRobotCommanderGameByModuleId(moduleId: string): RobotCommanderGame | undefined {
  return allRobotCommanderGames.find(game => game.moduleId === moduleId);
}

export function getRobotCommanderGameById(gameId: string): RobotCommanderGame | undefined {
  return allRobotCommanderGames.find(game => game.id === gameId);
}
