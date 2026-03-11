// List Chef game data for all beginner modules
import type { ListChefGame } from '../../../types/game';
import { module6ListChefGame } from './module3-listchef';

// Export individual List Chef games
export {
  module6ListChefGame
};

// Export all List Chef games as an array
export const allListChefGames: ListChefGame[] = [
  module6ListChefGame
];

// Helper function to get List Chef game by module ID
export function getListChefGameByModuleId(moduleId: string): ListChefGame | undefined {
  return allListChefGames.find(game => game.moduleId === moduleId);
}

// Helper function to get List Chef game by game ID
export function getListChefGameById(gameId: string): ListChefGame | undefined {
  return allListChefGames.find(game => game.id === gameId);
}
