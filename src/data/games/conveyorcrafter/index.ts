import type { ConveyorCrafterGame } from '../../../types/game';
import { module8ConveyorCrafterGame } from './module8-conveyorcrafter';

export { module8ConveyorCrafterGame };

export const allConveyorCrafterGames: ConveyorCrafterGame[] = [
  module8ConveyorCrafterGame,
];

export function getConveyorCrafterGameByModuleId(moduleId: string): ConveyorCrafterGame | undefined {
  return allConveyorCrafterGames.find(game => game.moduleId === moduleId);
}

export function getConveyorCrafterGameById(gameId: string): ConveyorCrafterGame | undefined {
  return allConveyorCrafterGames.find(game => game.id === gameId);
}
