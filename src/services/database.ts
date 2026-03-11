// IndexedDB setup using Dexie

import Dexie, { type EntityTable } from 'dexie';
import type { UserGoal, LessonCompletion, Achievement, CodeSubmission, AssessmentAttempt } from '@types';

// Database schema
export interface UserGoalDB extends Omit<UserGoal, 'startDate'> {
  id?: number;
  startDate: number;  // Store as timestamp
}

export interface LessonCompletionDB extends Omit<LessonCompletion, 'completedAt'> {
  id?: number;
  completedAt: number;  // Store as timestamp
}

export interface AchievementDB extends Omit<Achievement, 'unlockedAt'> {
  id?: number;
  unlockedAt: number;  // Store as timestamp
}

export interface CodeSubmissionDB extends Omit<CodeSubmission, 'submittedAt'> {
  id?: number;
  submittedAt: number;  // Store as timestamp
}

export interface AssessmentAttemptDB extends Omit<AssessmentAttempt, 'attemptedAt' | 'completedAt'> {
  id?: number;
  attemptedAt: number;  // Store as timestamp
  completedAt?: number;  // Store as timestamp
}

// Dexie database class
class AppDatabase extends Dexie {
  goals!: EntityTable<UserGoalDB, 'id'>;
  completions!: EntityTable<LessonCompletionDB, 'id'>;
  achievements!: EntityTable<AchievementDB, 'id'>;
  submissions!: EntityTable<CodeSubmissionDB, 'id'>;
  assessments!: EntityTable<AssessmentAttemptDB, 'id'>;

  constructor() {
    super('PythonLearningApp');

    this.version(1).stores({
      goals: '++id, startDate',
      completions: '++id, lessonId, completedAt',
      achievements: '++id, unlockedAt',
      submissions: '++id, lessonId, submittedAt, passed',
      assessments: '++id, assessmentId, attemptedAt, passed'
    });
  }
}

// Create and export database instance
export const db = new AppDatabase();

// Helper functions to convert between Date and timestamp

export function goalToDb(goal: UserGoal): Omit<UserGoalDB, 'id'> {
  return {
    ...goal,
    startDate: goal.startDate.getTime(),
  };
}

export function goalFromDb(goalDb: UserGoalDB): UserGoal {
  return {
    ...goalDb,
    startDate: new Date(goalDb.startDate),
  };
}

export function completionToDb(completion: LessonCompletion): Omit<LessonCompletionDB, 'id'> {
  return {
    ...completion,
    completedAt: completion.completedAt.getTime(),
  };
}

export function completionFromDb(completionDb: LessonCompletionDB): LessonCompletion {
  return {
    ...completionDb,
    completedAt: new Date(completionDb.completedAt),
  };
}

export function achievementToDb(achievement: Achievement): Omit<AchievementDB, 'id'> {
  return {
    ...achievement,
    unlockedAt: achievement.unlockedAt.getTime(),
  };
}

export function achievementFromDb(achievementDb: AchievementDB): Achievement {
  return {
    ...achievementDb,
    unlockedAt: new Date(achievementDb.unlockedAt),
  };
}
