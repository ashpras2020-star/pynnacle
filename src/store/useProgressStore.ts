// Progress Store - Tracks lesson completions, XP, streaks with optional cloud sync

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LessonCompletion } from '@types';

interface ShopItem {
  id: string;
  quantity: number;
}

interface AssessmentCompletion {
  moduleId: string;
  score: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
}

interface ProgressState {
  completedLessons: LessonCompletion[];
  completedAssessments: AssessmentCompletion[];  // Track assessment completions
  totalXP: number;
  spentXP: number;  // XP spent on unlocking lessons and items
  currentStreak: number;
  lastActiveDate: string | null;
  unlockedLessons: string[];  // Array of unlocked lesson IDs
  purchasedItems: ShopItem[];  // Items purchased from shop
  activeXPBoost: boolean;  // Whether XP boost is currently active
  streakFreezeActive: boolean;  // Whether a streak freeze was auto-used

  // Actions
  addCompletedLesson: (completion: LessonCompletion) => void;
  addCompletedAssessment: (completion: AssessmentCompletion) => void;  // New action
  addXP: (amount: number) => void;
  unlockLesson: (lessonId: string, cost: number) => boolean;
  updateStreak: () => void;
  resetProgress: () => void;
  purchaseItem: (itemId: string, cost: number) => boolean;
  useItem: (itemId: string) => boolean;
  activateXPBoost: () => boolean;
  skipChallenge: (lessonId: string) => boolean;

  // Helper functions
  isLessonCompleted: (lessonId: string) => boolean;
  isLessonUnlocked: (lessonId: string) => boolean;
  canUnlockLesson: (lessonId: string, cost: number) => boolean;
  getAvailableXP: () => number;
  isModuleCompleted: (moduleId: string) => boolean;
  isAssessmentPassed: (moduleId: string) => boolean;  // New helper
  getItemQuantity: (itemId: string) => number;
  hasActiveXPBoost: () => boolean;

  // Optional cloud sync
  syncToCloud: (userId?: string) => Promise<void>;
  loadFromCloud: (data: any) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      completedAssessments: [],  // No assessments completed initially
      totalXP: 0,
      spentXP: 0,
      currentStreak: 0,
      lastActiveDate: null,
      unlockedLessons: ['lesson-1-1'],  // First lesson is free
      purchasedItems: [],  // No items purchased initially
      activeXPBoost: false,  // No active boost initially
      streakFreezeActive: false,  // No active streak freeze

      addCompletedLesson: async (completion) => {
        set((state) => {
          // Check if lesson already completed
          const exists = state.completedLessons.some(
            (c) => c.lessonId === completion.lessonId
          );

          if (exists) {
            return state; // Don't add duplicate
          }

          // Apply XP boost if active (double XP)
          const xpToAdd = state.activeXPBoost
            ? completion.xpEarned * 2
            : completion.xpEarned;

          return {
            completedLessons: [...state.completedLessons, completion],
            totalXP: state.totalXP + xpToAdd,
            activeXPBoost: false,  // Deactivate boost after use
          };
        });

        // Sync to cloud after completing lesson
        const { syncToCloud } = get();
        import('@store/useUserStore').then(({ useUserStore }) => {
          const userId = useUserStore.getState().user?.uid;
          if (userId) {
            syncToCloud(userId).catch(err => console.warn('Progress sync failed:', err));
          }
        });
      },

      addXP: (amount) => {
        set((state) => ({
          totalXP: state.totalXP + amount,
        }));

        // Sync to cloud after adding XP
        const { syncToCloud } = get();
        import('@store/useUserStore').then(({ useUserStore }) => {
          const userId = useUserStore.getState().user?.uid;
          if (userId) {
            syncToCloud(userId).catch(err => console.warn('Progress sync failed:', err));
          }
        });
      },

      // Unlock a lesson by spending XP
      unlockLesson: (lessonId: string, cost: number) => {
        const state = get();
        const availableXP = state.totalXP - state.spentXP;

        if (availableXP >= cost && !state.unlockedLessons.includes(lessonId)) {
          set({
            spentXP: state.spentXP + cost,
            unlockedLessons: [...state.unlockedLessons, lessonId],
          });

          // Sync to cloud after unlocking lesson
          const { syncToCloud } = get();
          import('@store/useUserStore').then(({ useUserStore }) => {
            const userId = useUserStore.getState().user?.uid;
            if (userId) {
              syncToCloud(userId).catch(err => console.warn('Unlock sync failed:', err));
            }
          });

          return true;
        }
        return false;
      },

      // Get available XP (total - spent)
      getAvailableXP: () => {
        const state = get();
        return state.totalXP - state.spentXP;
      },

      // Check if user can afford to unlock a lesson
      canUnlockLesson: (lessonId: string, cost: number) => {
        const state = get();
        const availableXP = state.totalXP - state.spentXP;
        return availableXP >= cost;
      },

      updateStreak: () =>
        set((state) => {
          const today = new Date().toDateString();
          const lastActive = state.lastActiveDate
            ? new Date(state.lastActiveDate).toDateString()
            : null;

          // If already active today, no change
          if (lastActive === today) {
            return state;
          }

          // Check if yesterday
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toDateString();

          let newStreak = 1;
          let updatedItems = state.purchasedItems;
          let freezeUsed = false;

          if (lastActive === yesterdayStr) {
            // Continue streak
            newStreak = state.currentStreak + 1;
          } else if (lastActive && state.currentStreak > 0) {
            // Streak would be lost - check for streak freeze
            const freezeItem = state.purchasedItems.find((i) => i.id === 'streak-freeze');
            if (freezeItem && freezeItem.quantity > 0) {
              // Use streak freeze automatically
              newStreak = state.currentStreak; // Keep current streak
              freezeUsed = true;
              updatedItems = state.purchasedItems.map((i) =>
                i.id === 'streak-freeze'
                  ? { ...i, quantity: i.quantity - 1 }
                  : i
              ).filter((i) => i.quantity > 0);
            }
          }

          return {
            currentStreak: newStreak,
            lastActiveDate: new Date().toISOString(),
            purchasedItems: updatedItems,
            streakFreezeActive: freezeUsed,
          };
        }),

      // Purchase an item from the shop
      purchaseItem: (itemId: string, cost: number) => {
        const state = get();
        const availableXP = state.totalXP - state.spentXP;

        if (availableXP >= cost) {
          const existingItem = state.purchasedItems.find((item) => item.id === itemId);

          if (existingItem) {
            // Increment quantity
            set({
              spentXP: state.spentXP + cost,
              purchasedItems: state.purchasedItems.map((item) =>
                item.id === itemId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            });
          } else {
            // Add new item
            set({
              spentXP: state.spentXP + cost,
              purchasedItems: [...state.purchasedItems, { id: itemId, quantity: 1 }],
            });
          }

          // Sync to cloud after purchasing item
          const { syncToCloud } = get();
          import('@store/useUserStore').then(({ useUserStore }) => {
            const userId = useUserStore.getState().user?.uid;
            if (userId) {
              syncToCloud(userId).catch(err => console.warn('Purchase sync failed:', err));
            }
          });

          return true;
        }
        return false;
      },

      // Use an item (decrements quantity)
      useItem: (itemId: string) => {
        const state = get();
        const item = state.purchasedItems.find((i) => i.id === itemId);

        if (item && item.quantity > 0) {
          set({
            purchasedItems: state.purchasedItems.map((i) =>
              i.id === itemId
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          });

          // Sync to cloud after using item
          const { syncToCloud } = get();
          import('@store/useUserStore').then(({ useUserStore }) => {
            const userId = useUserStore.getState().user?.uid;
            if (userId) {
              syncToCloud(userId).catch(err => console.warn('Item usage sync failed:', err));
            }
          });

          return true;
        }
        return false;
      },

      // Get quantity of an item
      getItemQuantity: (itemId: string) => {
        const state = get();
        const item = state.purchasedItems.find((i) => i.id === itemId);
        return item ? item.quantity : 0;
      },

      // Activate XP boost (consumes one boost item)
      activateXPBoost: () => {
        const state = get();
        if (state.activeXPBoost) {
          return false; // Already have an active boost
        }

        const boostItem = state.purchasedItems.find((i) => i.id === 'xp-boost');
        if (boostItem && boostItem.quantity > 0) {
          set({
            activeXPBoost: true,
            purchasedItems: state.purchasedItems.map((i) =>
              i.id === 'xp-boost'
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          });

          // Sync to cloud after activating XP boost
          const { syncToCloud } = get();
          import('@store/useUserStore').then(({ useUserStore }) => {
            const userId = useUserStore.getState().user?.uid;
            if (userId) {
              syncToCloud(userId).catch(err => console.warn('XP boost activation sync failed:', err));
            }
          });

          return true;
        }
        return false;
      },

      // Skip challenge (marks lesson complete without XP)
      skipChallenge: (lessonId: string) => {
        const state = get();
        const skipItem = state.purchasedItems.find((i) => i.id === 'skip-token');

        if (skipItem && skipItem.quantity > 0) {
          // Use skip token
          set({
            purchasedItems: state.purchasedItems.map((i) =>
              i.id === 'skip-token'
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          });

          // Sync to cloud after using skip token
          const { syncToCloud } = get();
          import('@store/useUserStore').then(({ useUserStore }) => {
            const userId = useUserStore.getState().user?.uid;
            if (userId) {
              syncToCloud(userId).catch(err => console.warn('Skip token usage sync failed:', err));
            }
          });

          // Don't mark lesson as completed - user still needs to complete the quiz/game
          // The game completion handler will mark it as complete with proper XP

          return true;
        }
        return false;
      },

      // Check if XP boost is active
      hasActiveXPBoost: () => {
        const state = get();
        return state.activeXPBoost;
      },

      resetProgress: () =>
        set({
          completedLessons: [],
          completedAssessments: [],
          totalXP: 0,
          spentXP: 0,
          currentStreak: 0,
          lastActiveDate: null,
          unlockedLessons: ['lesson-1-1'],
          purchasedItems: [],
          activeXPBoost: false,
          streakFreezeActive: false,
        }),

      // Check if a lesson is completed
      isLessonCompleted: (lessonId: string) => {
        const state = get();
        return state.completedLessons.some((c) => c.lessonId === lessonId);
      },

      // Check if a lesson is unlocked (purchased with XP)
      isLessonUnlocked: (_lessonId: string) => {
        return true; // TODO: revert — was: get().unlockedLessons.includes(lessonId);
      },

      // Check if all lessons in a module are completed
      isModuleCompleted: (moduleId: string) => {
        const state = get();

        // Parse module ID to get module number
        const match = moduleId.match(/module-(\d+)/);
        if (!match) return false;

        const moduleNum = parseInt(match[1]);

        // Check if all 5 lessons in the module are completed
        for (let i = 1; i <= 5; i++) {
          const lessonId = `lesson-${moduleNum}-${i}`;
          if (!state.completedLessons.some((c) => c.lessonId === lessonId)) {
            return false;
          }
        }

        return true;
      },

      // Add completed assessment
      addCompletedAssessment: (completion) => {
        set((state) => {
          // Check if assessment already exists
          const exists = state.completedAssessments.some(
            (a) => a.moduleId === completion.moduleId
          );

          if (exists) {
            // Update existing assessment
            return {
              completedAssessments: state.completedAssessments.map((a) =>
                a.moduleId === completion.moduleId ? completion : a
              ),
            };
          }

          // Add new assessment
          return {
            completedAssessments: [...state.completedAssessments, completion],
          };
        });

        // Sync to cloud after completing assessment
        const { syncToCloud } = get();
        import('@store/useUserStore').then(({ useUserStore }) => {
          const userId = useUserStore.getState().user?.uid;
          if (userId) {
            syncToCloud(userId).catch(err => console.warn('Assessment sync failed:', err));
          }
        });
      },

      // Check if assessment was passed (80% or higher)
      isAssessmentPassed: (moduleId: string) => {
        const state = get();
        const assessment = state.completedAssessments.find(
          (a) => a.moduleId === moduleId
        );
        return assessment ? assessment.passed && assessment.percentage >= 80 : false;
      },

      // Sync progress to cloud (optional - only if user has Firebase UID)
      syncToCloud: async (userId?: string) => {
        if (!userId) {
          // No user ID, skip cloud sync
          return;
        }

        try {
          // Dynamically import sync service to avoid blocking app startup
          const { syncService } = await import('@services/syncService');
          await syncService.syncUserData(userId);
        } catch (error) {
          // Silently fail - app works without cloud sync
          console.warn('Cloud sync skipped:', error);
        }
      },

      // Load progress from cloud data
      loadFromCloud: (data: any) => {
        if (!data) return;

        try {
          set({
            totalXP: data.totalXP || 0,
            spentXP: data.spentXP || 0,
            currentStreak: data.currentStreak || 0,
            lastActiveDate: data.lastActivityDate || null,
            completedLessons: (data.completedLessons || []).map((lessonId: string) => ({
              lessonId,
              completedAt: new Date().toISOString(),
              xpEarned: 0,
              codeSubmitted: '',
            })),
            purchasedItems: Object.entries(data.inventory || {}).map(([id, quantity]) => ({
              id,
              quantity: quantity as number,
            })),
          });
        } catch (error) {
          console.warn('Failed to load cloud data:', error);
        }
      },
    }),
    {
      name: 'python-learning-progress',
    }
  )
);
