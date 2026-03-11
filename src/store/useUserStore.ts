// User Store - Manages user goals and settings with Firebase cloud sync

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
          set({
            isAuthenticated: true,
            user: {
              uid: authUser.uid,
              email: authUser.email,
              // Preserve custom profile name/picture if already set (e.g. from ProfileSetup)
              // Only fall back to Google auth data if no custom profile exists
              name: currentUser?.name || authUser.displayName,
              picture: currentUser?.picture || authUser.photoURL,
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
        console.log('🔄 Starting Google sign-in...');
        set({ isLoading: true });

        // Safety timeout - reset loading after 30 seconds
        const timeout = setTimeout(() => {
          console.warn('⚠️ Sign-in timeout - resetting loading state');
          set({ isLoading: false });
        }, 30000);

        try {
          const user = await authService.signInWithGoogle();
          console.log('📝 User data received:', user.email);
          get().setUser(user);

          // Sync progress after successful sign-in (don't block on sync errors)
          try {
            // Reset local progress before syncing so stale guest/other-user data
            // doesn't get merged into this user's cloud data
            const { useProgressStore } = await import('@store/useProgressStore');
            useProgressStore.getState().resetProgress();

            console.log('🔄 Starting cloud sync...');
            await get().syncToCloud();
            console.log('✅ Cloud sync completed');

            // Start real-time sync listener
            const { syncService } = await import('@services/syncService');
            syncService.startRealtimeSync(user.uid);
          } catch (syncError) {
            console.warn('⚠️ Cloud sync failed after sign-in:', syncError);
            // Don't throw - user is still signed in, just sync failed
          }

          console.log('✅ Signed in successfully:', user.email);
        } catch (error: any) {
          console.error('❌ Sign-in failed:', error);
          // Reset state to ensure app isn't in broken state
          set({
            isAuthenticated: false,
            user: null,
            isLoading: false,
          });
          throw error;
        } finally {
          clearTimeout(timeout);
          console.log('🔄 Resetting loading state...');
          set({ isLoading: false });
          console.log('✅ Loading state reset');
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

        // Update local state
        set({
          user: {
            ...state.user,
            name: updates.name ?? state.user.name,
            picture: updates.picture ?? state.user.picture,
          },
        });

        // Sync to cloud
        try {
          await get().syncToCloud();
          console.log('✅ Profile updated and synced to cloud');
        } catch (error) {
          console.warn('⚠️ Failed to sync profile to cloud:', error);
        }
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
    }
  )
);

// Initialize auth state listener
authService.onAuthStateChange((user) => {
  try {
    useUserStore.getState().setUser(user);
    if (user) {
      // Reset progress before syncing so stale data doesn't merge into this user's cloud
      import('@store/useProgressStore').then(({ useProgressStore }) => {
        useProgressStore.getState().resetProgress();
        // Auto-sync when auth state changes (don't await to avoid blocking)
        useUserStore.getState().syncToCloud().catch((err) => {
          console.warn('⚠️ Auto-sync failed:', err);
        });
      });

      // Start real-time sync for this user
      import('@services/syncService').then(({ syncService }) => {
        syncService.startRealtimeSync(user.uid);
      });
    } else {
      // Stop real-time sync when user signs out
      import('@services/syncService').then(({ syncService }) => {
        syncService.stopRealtimeSync();
      });
      // Clear progress when user signs out
      import('@store/useProgressStore').then(({ useProgressStore }) => {
        useProgressStore.getState().resetProgress();
      });
    }
  } catch (error) {
    console.error('❌ Error in auth state listener:', error);
  }
});
