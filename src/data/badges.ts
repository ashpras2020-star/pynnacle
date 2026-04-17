// Badge Definitions - All possible badges in the platform

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji icon for owned badges
  category: 'streak' | 'xp' | 'lessons' | 'modules' | 'assessments' | 'special';
  /** Criteria function receives progress state and returns true if earned */
  criteria: (progress: BadgeProgress) => boolean;
}

/** Flattened progress data passed to badge criteria checks */
export interface BadgeProgress {
  currentStreak: number;
  totalXP: number;
  completedLessonCount: number;
  completedModuleCount: number;
  completedAssessmentCount: number;
  perfectAssessments: number; // assessments scored 100%
  purchasedItemCount: number;
}

export const ALL_BADGES: Badge[] = [
  // --- Streak Badges ---
  {
    id: 'streak-3',
    name: 'Getting Started',
    description: '3-day learning streak',
    icon: '🔥',
    category: 'streak',
    criteria: (p) => p.currentStreak >= 3,
  },
  {
    id: 'streak-5',
    name: 'On Fire',
    description: '5-day learning streak',
    icon: '🔥',
    category: 'streak',
    criteria: (p) => p.currentStreak >= 5,
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: '7-day learning streak',
    icon: '⚔️',
    category: 'streak',
    criteria: (p) => p.currentStreak >= 7,
  },
  {
    id: 'streak-10',
    name: 'Unstoppable',
    description: '10-day learning streak',
    icon: '⚡',
    category: 'streak',
    criteria: (p) => p.currentStreak >= 10,
  },
  {
    id: 'streak-14',
    name: 'Iron Will',
    description: '14-day learning streak',
    icon: '🛡️',
    category: 'streak',
    criteria: (p) => p.currentStreak >= 14,
  },
  {
    id: 'streak-30',
    name: 'Dedicated Learner',
    description: '30-day learning streak',
    icon: '💎',
    category: 'streak',
    criteria: (p) => p.currentStreak >= 30,
  },
  {
    id: 'streak-60',
    name: 'Two Months Strong',
    description: '60-day learning streak',
    icon: '🌋',
    category: 'streak',
    criteria: (p) => p.currentStreak >= 60,
  },
  {
    id: 'streak-100',
    name: 'Centurion',
    description: '100-day learning streak',
    icon: '🏛️',
    category: 'streak',
    criteria: (p) => p.currentStreak >= 100,
  },

  // --- XP Badges ---
  {
    id: 'xp-100',
    name: 'First Steps',
    description: 'Earn 100 total XP',
    icon: '⭐',
    category: 'xp',
    criteria: (p) => p.totalXP >= 100,
  },
  {
    id: 'xp-250',
    name: 'XP Rookie',
    description: 'Earn 250 total XP',
    icon: '🌠',
    category: 'xp',
    criteria: (p) => p.totalXP >= 250,
  },
  {
    id: 'xp-500',
    name: 'Rising Star',
    description: 'Earn 500 total XP',
    icon: '🌟',
    category: 'xp',
    criteria: (p) => p.totalXP >= 500,
  },
  {
    id: 'xp-1000',
    name: 'XP Collector',
    description: 'Earn 1,000 total XP',
    icon: '💫',
    category: 'xp',
    criteria: (p) => p.totalXP >= 1000,
  },
  {
    id: 'xp-2500',
    name: 'XP Veteran',
    description: 'Earn 2,500 total XP',
    icon: '🔮',
    category: 'xp',
    criteria: (p) => p.totalXP >= 2500,
  },
  {
    id: 'xp-5000',
    name: 'XP Master',
    description: 'Earn 5,000 total XP',
    icon: '🏆',
    category: 'xp',
    criteria: (p) => p.totalXP >= 5000,
  },
  {
    id: 'xp-7500',
    name: 'XP Elite',
    description: 'Earn 7,500 total XP',
    icon: '💠',
    category: 'xp',
    criteria: (p) => p.totalXP >= 7500,
  },
  {
    id: 'xp-10000',
    name: 'XP Legend',
    description: 'Earn 10,000 total XP',
    icon: '👑',
    category: 'xp',
    criteria: (p) => p.totalXP >= 10000,
  },
  {
    id: 'xp-25000',
    name: 'XP Overlord',
    description: 'Earn 25,000 total XP',
    icon: '🌌',
    category: 'xp',
    criteria: (p) => p.totalXP >= 25000,
  },

  // --- Lesson Badges ---
  {
    id: 'lessons-1',
    name: 'Hello World',
    description: 'Complete your first lesson',
    icon: '📝',
    category: 'lessons',
    criteria: (p) => p.completedLessonCount >= 1,
  },
  {
    id: 'lessons-3',
    name: 'Triple Play',
    description: 'Complete 3 lessons',
    icon: '📓',
    category: 'lessons',
    criteria: (p) => p.completedLessonCount >= 3,
  },
  {
    id: 'lessons-5',
    name: 'Quick Learner',
    description: 'Complete 5 lessons',
    icon: '📚',
    category: 'lessons',
    criteria: (p) => p.completedLessonCount >= 5,
  },
  {
    id: 'lessons-10',
    name: 'Knowledge Seeker',
    description: 'Complete 10 lessons',
    icon: '🎓',
    category: 'lessons',
    criteria: (p) => p.completedLessonCount >= 10,
  },
  {
    id: 'lessons-15',
    name: 'Deep Diver',
    description: 'Complete 15 lessons',
    icon: '🤿',
    category: 'lessons',
    criteria: (p) => p.completedLessonCount >= 15,
  },
  {
    id: 'lessons-25',
    name: 'Halfway Hero',
    description: 'Complete 25 lessons',
    icon: '🦸',
    category: 'lessons',
    criteria: (p) => p.completedLessonCount >= 25,
  },
  {
    id: 'lessons-35',
    name: 'Almost Legendary',
    description: 'Complete 35 lessons',
    icon: '🦁',
    category: 'lessons',
    criteria: (p) => p.completedLessonCount >= 35,
  },
  {
    id: 'lessons-50',
    name: 'Course Conqueror',
    description: 'Complete all 50 lessons',
    icon: '🏅',
    category: 'lessons',
    criteria: (p) => p.completedLessonCount >= 50,
  },

  // --- Module Badges ---
  {
    id: 'module-1',
    name: 'Module Master',
    description: 'Complete your first module',
    icon: '📦',
    category: 'modules',
    criteria: (p) => p.completedModuleCount >= 1,
  },
  {
    id: 'module-3',
    name: 'Hat Trick',
    description: 'Complete 3 modules',
    icon: '🎩',
    category: 'modules',
    criteria: (p) => p.completedModuleCount >= 3,
  },
  {
    id: 'module-5',
    name: 'Five Down',
    description: 'Complete 5 modules',
    icon: '🗂️',
    category: 'modules',
    criteria: (p) => p.completedModuleCount >= 5,
  },
  {
    id: 'module-7',
    name: 'Lucky Seven',
    description: 'Complete 7 modules',
    icon: '🍀',
    category: 'modules',
    criteria: (p) => p.completedModuleCount >= 7,
  },
  {
    id: 'module-10',
    name: 'Module Legend',
    description: 'Complete all 10 modules',
    icon: '🌐',
    category: 'modules',
    criteria: (p) => p.completedModuleCount >= 10,
  },

  // --- Assessment Badges ---
  {
    id: 'assessment-1',
    name: 'Test Taker',
    description: 'Pass your first assessment',
    icon: '✅',
    category: 'assessments',
    criteria: (p) => p.completedAssessmentCount >= 1,
  },
  {
    id: 'assessment-3',
    name: 'Quiz Whiz',
    description: 'Pass 3 assessments',
    icon: '🧠',
    category: 'assessments',
    criteria: (p) => p.completedAssessmentCount >= 3,
  },
  {
    id: 'assessment-5',
    name: 'Exam Expert',
    description: 'Pass 5 assessments',
    icon: '🎯',
    category: 'assessments',
    criteria: (p) => p.completedAssessmentCount >= 5,
  },
  {
    id: 'assessment-10',
    name: 'Grand Scholar',
    description: 'Pass all 10 assessments',
    icon: '🎖️',
    category: 'assessments',
    criteria: (p) => p.completedAssessmentCount >= 10,
  },
  {
    id: 'assessment-perfect',
    name: 'Perfectionist',
    description: 'Score 100% on an assessment',
    icon: '💯',
    category: 'assessments',
    criteria: (p) => p.perfectAssessments >= 1,
  },
  {
    id: 'assessment-perfect-3',
    name: 'Overachiever',
    description: 'Score 100% on 3 assessments',
    icon: '🌟',
    category: 'assessments',
    criteria: (p) => p.perfectAssessments >= 3,
  },
  {
    id: 'assessment-perfect-all',
    name: 'Flawless',
    description: 'Score 100% on all 10 assessments',
    icon: '✨',
    category: 'assessments',
    criteria: (p) => p.perfectAssessments >= 10,
  },

  // --- Special Badges ---
  {
    id: 'special-shopper',
    name: 'Smart Shopper',
    description: 'Purchase your first shop item',
    icon: '🛒',
    category: 'special',
    criteria: (p) => p.purchasedItemCount >= 1,
  },
  {
    id: 'special-shopping-spree',
    name: 'Shopping Spree',
    description: 'Purchase 5 shop items',
    icon: '🛍️',
    category: 'special',
    criteria: (p) => p.purchasedItemCount >= 5,
  },
  {
    id: 'special-triple-threat',
    name: 'Triple Threat',
    description: 'Complete 10+ lessons, pass 3+ assessments, and earn 1,000+ XP',
    icon: '⚡',
    category: 'special',
    criteria: (p) => p.completedLessonCount >= 10 && p.completedAssessmentCount >= 3 && p.totalXP >= 1000,
  },
  {
    id: 'special-python-pro',
    name: 'Python Pro',
    description: 'Complete all 50 lessons and all 10 modules',
    icon: '🐍',
    category: 'special',
    criteria: (p) => p.completedLessonCount >= 50 && p.completedModuleCount >= 10,
  },
  {
    id: 'special-grandmaster',
    name: 'Grand Master',
    description: 'Complete all modules, all assessments, and hold a 7-day streak',
    icon: '🧙',
    category: 'special',
    criteria: (p) => p.completedModuleCount >= 10 && p.completedAssessmentCount >= 10 && p.currentStreak >= 7,
  },
  {
    id: 'special-consistent',
    name: 'Consistent',
    description: 'Hold a 7-day streak and complete 25+ lessons',
    icon: '⏰',
    category: 'special',
    criteria: (p) => p.currentStreak >= 7 && p.completedLessonCount >= 25,
  },
  {
    id: 'special-all-badges',
    name: 'Badge Collector',
    description: 'Earn every other badge',
    icon: '🏆',
    category: 'special',
    // This is checked separately - needs all other badges to be earned first
    criteria: () => false, // Special handling in the check function
  },
];

/** Check which badges the user has earned based on their progress */
export function getEarnedBadgeIds(progress: BadgeProgress): string[] {
  const earned: string[] = [];

  for (const badge of ALL_BADGES) {
    if (badge.id === 'special-all-badges') continue; // Check last
    if (badge.criteria(progress)) {
      earned.push(badge.id);
    }
  }

  // Check "Badge Collector" - earned all other badges
  const otherBadges = ALL_BADGES.filter((b) => b.id !== 'special-all-badges');
  if (earned.length >= otherBadges.length) {
    earned.push('special-all-badges');
  }

  return earned;
}
