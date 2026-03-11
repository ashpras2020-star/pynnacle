// Debug Detective game data for all beginner modules
import type { DebugGame } from '../../../types/game';
import { module1DebugGame } from './module1-debug';
import { module2DebugGame } from './module6-debug';
import { module3DebugGame } from './module5-debug';
import { module4DebugGame } from './module7-debug';
import { module6DebugGame } from './module3-debug';
import { module7DebugGame } from './module4-debug';
import { module8DebugGame } from './module10-debug';
import { module9DebugGame } from './module9-debug';
import { module10DebugGame } from './module8-debug';

// Export individual debug games
export {
  module1DebugGame,
  module2DebugGame,
  module3DebugGame,
  module4DebugGame,
  module6DebugGame,
  module7DebugGame,
  module8DebugGame,
  module9DebugGame,
  module10DebugGame
};

// Export all debug games as an array
export const allDebugGames: DebugGame[] = [
  module1DebugGame,
  module2DebugGame,
  module3DebugGame,
  module4DebugGame,
  module6DebugGame,
  module7DebugGame,
  module8DebugGame,
  module9DebugGame,
  module10DebugGame
];

// Helper function to get debug game by module ID
export function getDebugGameByModuleId(moduleId: string): DebugGame | undefined {
  return allDebugGames.find(game => game.moduleId === moduleId);
}

// Helper function to get debug game by game ID
export function getDebugGameById(gameId: string): DebugGame | undefined {
  return allDebugGames.find(game => game.id === gameId);
}
