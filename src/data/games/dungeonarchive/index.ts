import type { FileSorterGame } from '../../../types/game';
import { module10DungeonArchiveGame } from './module10-dungeonarchive';

export { module10DungeonArchiveGame };

export const allDungeonArchiveGames: FileSorterGame[] = [
  module10DungeonArchiveGame,
];

export function getDungeonArchiveGameByModuleId(moduleId: string): FileSorterGame | undefined {
  return allDungeonArchiveGames.find(game => game.moduleId === moduleId);
}

export function getDungeonArchiveGameById(gameId: string): FileSorterGame | undefined {
  return allDungeonArchiveGames.find(game => game.id === gameId);
}
