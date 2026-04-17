// User Store - Manages user goals and settings with Firebase cloud sync

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserGoal } from '@types';
import { authService } from '@services/authService';
import type { AuthUser } from '@services/authService';

interface UserProfile {
  uid: string; // Firebase user ID
  email: string | null;
  name: string | null;
  picture: string | null;
}

interface UserState {
  goal: UserGoal | null;
  hasCompletedGoalSetting: boolean;
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;

  // Actions
  setGoal: (goal: UserGoal) => void;
  clearGoal: () => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  updateUserProfile: (updates: { name?: string; picture?: string }) => Promise<void>;
  syncToCloud: () => Promise<void>; // Cloud sync
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      goal: null,
      hasCompletedGoalSetting: false,
      isAuthenticated: false,
      user: null,
      isLoading: false,

      setGoal: (goal) => {
        set({
          goal,
          hasCompletedGoalSetting: true,
        });
        // Sync goal to cloud
        get().syncToCloud();
      },

      clearGoal: () =>
        set({
          goal: null,
          hasCompletedGoalSetting: false,
        }),

      setUser: (authUser: AuthUser | null) => {
        if (authUser) {
          const currentUser = get().user;
          const defaultAvatar = `${import.meta.env.BASE_URL}avatars/avatar-1.png`;
          set({
            isAuthenticated: true,
            user: {
              uid: authUser.uid,
              email: authUser.email,
              name: currentUser?.name || authUser.displayName,
              picture: currentUser?.picture || authUser.photoURL || defaultAvatar,
            },
          });
        } else {
          set({
            isAuthenticated: false,
            user: null,
          });
        }
      },

      signInWithGoogle: async () => {
        // Don't start if already loading
        if (get().isLoading) {
          return;
        }

        set({ isLoading: true });

        try {
          const user = await authService.signInWithGoogle();
          get().setUser(user);

          // Fire-and-forget cloud sync — don't block the UI
          // Do NOT reset progress here — syncToCloud merges cloud + local properly
          (async () => {
            try {
              await get().syncToCloud();
              const { syncService } = await import('@services/syncService');
              syncService.startRealtimeSync(user.uid);
            } catch (syncError) {
              console.warn('Cloud sync failed after sign-in:', syncError);
            }
          })();
        } catch (error: any) {
          // If user closed the popup, silently reset — not an error
          const silentCodes = ['auth/popup-closed-by-user', 'auth/cancelled-popup-request', 'auth/already-in-progress'];
          if (!silentCodes.includes(error.code)) {
            console.error('Sign-in failed:', error);
          }
          set({ isAuthenticated: false, user: null });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      signOut: async () => {
        console.log('🔄 UserStore signOut called');
        set({ isLoading: true });
        try {
          // Stop real-time sync listener
          const { syncService } = await import('@services/syncService');
          syncService.stopRealtimeSync();

          console.log('Calling authService.signOut...');
          await authService.signOut();
          console.log('Auth service signed out, updating state...');

          // Clear progress store so stale data doesn't persist for next user
          const { useProgressStore } = await import('@store/useProgressStore');
          useProgressStore.getState().resetProgress();

          set({
            isAuthenticated: false,
            user: null,
          });
          console.log('✅ Signed out successfully - state and progress cleared');
        } catch (error: any) {
          console.error('❌ Sign-out failed:', error);
          set({ isLoading: false });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      updateUserProfile: async (updates: { name?: string; picture?: string }) => {
        const state = get();
        if (!state.user) {
          console.warn('⚠️ No user logged in, cannot update profile');
          return;
        }

        const newUser = {
          ...state.user,
          name: updates.name ?? state.user.name,
          picture: updates.picture ?? state.user.picture,
        };

        // Update local state first
        set({ user: newUser });

        // Write profile directly to cloud — bypasses merge so the new values
        // become authoritative immediately (merge always prefers cloud).
        try {
          const { syncService } = await import('@services/syncService');
          await syncService.syncProfileOnly(newUser.uid, newUser.name, newUser.picture);
          console.log('✅ Profile updated and synced to cloud');
        } catch (error) {
          console.warn('⚠️ Failed to sync profile to cloud:', error);
        }

        // Also update the public profile (friends list, leaderboard, etc.)
        try {
          const { friendsService } = await import('@services/friendsService');
          await friendsService.syncPublicProfile(newUser.uid);
        } catch {}
      },

      syncToCloud: async () => {
        try {
          const state = get();
          if (!state.user?.uid) {
            console.log('⚠️ No user logged in, skipping cloud sync');
            return;
          }

          // Dynamically import sync service to avoid blocking app startup
          const { syncService } = await import('@services/syncService');
          await syncService.syncUserData(state.user.uid);

          console.log('✅ Cloud sync completed');
        } catch (error) {
          // Silently fail - app works without cloud sync
          console.warn('⚠️ Cloud sync failed:', error);
        }
      },
    }),
    {
      name: 'python-learning-user',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        goal: state.goal,
        hasCompletedGoalSetting: state.hasCompletedGoalSetting,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);

// Track whether a user was previously signed in, so we only reset progress
// on actual sign-out transitions (not on initial page load with no user).
let previouslySignedIn = false;

// Helper: wait for both stores to finish rehydrating from localStorage.
// Without this, the auth listener can fire before persist middleware loads
// saved state, causing syncUserData to read empty (initial) state and
// overwrite real progress in the cloud.
async function waitForHydration(): Promise<void> {
  const { useProgressStore } = await import('@store/useProgressStore');

  const waitStore = (store: { persist: { hasHydrated: () => boolean; onFinishHydration: (fn: () => void) => () => void } }) =>
    store.persist.hasHydrated()
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          const unsub = store.persist.onFinishHydration(() => { unsub(); resolve(); });
        });

  await Promise.all([
    waitStore(useUserStore),
    waitStore(useProgressStore),
  ]);
}

// Initialize auth state listener
authService.onAuthStateChange((user) => {
  try {
    useUserStore.getState().setUser(user);
    if (user) {
      previouslySignedIn = true;

      // Wait for stores to rehydrate from localStorage before syncing.
      // This prevents reading empty initial state during cloud sync.
      waitForHydration().then(() => {
        useUserStore.getState().syncToCloud().catch((err) => {
          console.warn('⚠️ Auto-sync failed:', err);
        });

        // Start real-time sync for this user
        import('@services/syncService').then(({ syncService }) => {
          syncService.startRealtimeSync(user.uid);
        }).catch(() => {});

        // Start friends listeners and presence
        import('@store/useFriendsStore').then(({ useFriendsStore }) => {
          useFriendsStore.getState().startListening(user.uid);
          useFriendsStore.getState().startPresenceUpdater(user.uid);
        }).catch(() => {});
      });
    } else {
      // Stop real-time sync
      import('@services/syncService').then(({ syncService }) => {
        syncService.stopRealtimeSync();
      }).catch(() => {});

      // Stop friends listeners and presence
      import('@store/useFriendsStore').then(({ useFriendsStore }) => {
        useFriendsStore.getState().stopListening();
        useFriendsStore.getState().stopPresenceUpdater();
      }).catch(() => {});

      // Only reset progress on actual sign-out (was signed in → now null).
      // Do NOT reset when auth listener fires with null on initial page load,
      // as that would wipe localStorage progress for non-authenticated users.
      if (previouslySignedIn) {
        previouslySignedIn = false;
        waitForHydration().then(() => {
          import('@store/useProgressStore').then(({ useProgressStore }) => {
            useProgressStore.getState().resetProgress();
          }).catch(() => {});
        }).catch(() => {});
      }
    }
  } catch (error) {
    console.error('❌ Error in auth state listener:', error);
  }
});
