// User progress and profile types

export interface UserGoal {
  targetDays: number;
  startDate: Date;
  lessonsPerDay: number;
}

export interface LessonCompletion {
  lessonId: string;
  completedAt: Date;
  attempts: number;
  gameScore?: number;
  xpEarned?: number;  // XP earned from this lesson
  codeSubmitted: string;
  timeSpent: number;  // seconds
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt: Date;
  icon: string;
}

export interface UserProgress {
  userId: string;
  goal: UserGoal;
  completedLessons: LessonCompletion[];
  currentStreak: number;
  totalXP: number;
  achievements: Achievement[];
  hasCompletedGoalSetting: boolean;
}

export interface CodeSubmission {
  id?: number;
  lessonId: string;
  code: string;
  submittedAt: Date;
  passed: boolean;
}
