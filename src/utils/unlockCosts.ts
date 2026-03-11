// Unlock cost calculator
// Each lesson costs 800 XP (except the first lesson which is free)

// Max XP per lesson = lesson XP (50-200) + max game XP (~500)
// For simplicity, we'll use fixed max XP values per lesson

export const LESSON_XP_REWARDS: Record<string, number> = {
  'lesson-1-1': 50,
  'lesson-1-2': 75,
  'lesson-1-3': 75,
  'lesson-1-4': 50,
  'lesson-1-5': 100,
  // Module 2 (Numbers & Math)
  'lesson-2-1': 100,
  'lesson-2-2': 100,
  'lesson-2-3': 125,
  'lesson-2-4': 125,
  'lesson-2-5': 150,
  // Module 3 (String Manipulation)
  'lesson-3-1': 150,
  'lesson-3-2': 150,
  'lesson-3-3': 150,
  'lesson-3-4': 150,
  'lesson-3-5': 200,
  // Module 4 (Boolean Logic)
  'lesson-4-1': 100,
  'lesson-4-2': 100,
  'lesson-4-3': 125,
  'lesson-4-4': 125,
  'lesson-4-5': 150,
  // Module 5 (Control Flow)
  'lesson-5-1': 75,
  'lesson-5-2': 75,
  'lesson-5-3': 100,
  'lesson-5-4': 100,
  'lesson-5-5': 100,
  // Module 6 (Collections)
  'lesson-6-1': 100,
  'lesson-6-2': 100,
  'lesson-6-3': 125,
  'lesson-6-4': 100,
  'lesson-6-5': 125,
  // Module 7 (Functions)
  'lesson-7-1': 125,
  'lesson-7-2': 125,
  'lesson-7-3': 125,
  'lesson-7-4': 150,
  'lesson-7-5': 150,
  // Module 8 (List Comprehensions)
  'lesson-8-1': 100,
  'lesson-8-2': 100,
  'lesson-8-3': 125,
  'lesson-8-4': 125,
  'lesson-8-5': 150,
  // Module 9
  'lesson-9-1': 100,
  'lesson-9-2': 100,
  'lesson-9-3': 125,
  'lesson-9-4': 125,
  'lesson-9-5': 150,
  // Module 10 (File I/O)
  'lesson-10-1': 100,
  'lesson-10-2': 100,
  'lesson-10-3': 125,
  'lesson-10-4': 125,
  'lesson-10-5': 150,
};

// Max game bonus XP (perfect score with all lives)
const MAX_GAME_BONUS = 500;

/**
 * The actual display/learning order of modules.
 * Module IDs now match the display order.
 */
const MODULE_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * Ordered list of all lesson IDs in learning sequence.
 * 5 lessons per module, 10 modules = 50 lessons total.
 */
const LESSON_ORDER: string[] = MODULE_ORDER.flatMap((mod) =>
  [1, 2, 3, 4, 5].map((l) => `lesson-${mod}-${l}`)
);

/**
 * Calculate max XP possible from a lesson (lesson XP + perfect game)
 */
export function getMaxLessonXP(lessonId: string): number {
  const lessonXP = LESSON_XP_REWARDS[lessonId] || 100;
  return lessonXP + MAX_GAME_BONUS;
}

/**
 * Calculate unlock cost for a lesson (flat 1000 XP per lesson)
 * First lesson in the course is always free
 */
export function getUnlockCost(lessonId: string): number {
  // First lesson in the learning order is free
  if (lessonId === LESSON_ORDER[0]) return 0;

  return 1000;
}

/**
 * Get lesson order/sequence number (1-50 for beginner course)
 */
export function getLessonOrder(lessonId: string): number {
  const idx = LESSON_ORDER.indexOf(lessonId);
  return idx >= 0 ? idx + 1 : 0;
}

/**
 * Check if a lesson is available to purchase
 * (previous lesson in learning order must be completed)
 */
export function isLessonAvailableToPurchase(
  lessonId: string,
  completedLessons: string[]
): boolean {
  const idx = LESSON_ORDER.indexOf(lessonId);
  if (idx < 0) return false;

  // First lesson is always available
  if (idx === 0) return true;

  // Previous lesson in learning order must be completed
  const prevLessonId = LESSON_ORDER[idx - 1];
  return completedLessons.includes(prevLessonId);
}
