import type { Timestamp } from 'firebase/firestore';

export type ChallengeType = 'xp_race' | 'lesson_count' | 'streak' | 'module_completion';

export type ChallengeStatus = 'pending' | 'active' | 'completed' | 'cancelled';

export interface ChallengeProgress {
  startValue: number;
  currentValue: number;
}

export interface Challenge {
  id: string;
  createdBy: string;
  participants: string[];
  participantNames: Record<string, string>;
  participantPhotos: Record<string, string | null>;
  status: ChallengeStatus;
  type: ChallengeType;
  targetValue: number;
  targetModuleId?: string;
  wager: number;
  progress: Record<string, ChallengeProgress>;
  winner: string | null;
  createdAt: Timestamp;
  completedAt: Timestamp | null;
}

export function getChallengeTypeLabel(type: ChallengeType): string {
  switch (type) {
    case 'xp_race': return 'XP Race';
    case 'lesson_count': return 'Lesson Count';
    case 'streak': return 'Streak';
    case 'module_completion': return 'Module Completion';
  }
}

export function getChallengeDescription(type: ChallengeType, targetValue: number, targetModuleId?: string): string {
  switch (type) {
    case 'xp_race': return `First to earn ${targetValue.toLocaleString()} XP`;
    case 'lesson_count': return `First to complete ${targetValue} lessons`;
    case 'streak': return `First to reach a ${targetValue}-day streak`;
    case 'module_completion': return `Complete module ${targetModuleId?.replace('module-', '') || '?'}`;
  }
}
