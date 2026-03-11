// Cloud Sync Service
// Syncs user progress between IndexedDB (local) and Firestore (cloud)

import { doc, setDoc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@config/firebase';
import { useProgressStore } from '@store/useProgressStore';
import { useUserStore } from '@store/useUserStore';

interface CloudProgressData {
  completedLessons: Array<{
    lessonId: string;
    completedAt: string;
    xpEarned: number;
  }>;
  completedAssessments: Array<{
    moduleId: string;
    score: number;
    percentage: number;
    passed: boolean;
    completedAt: string;
  }>;
  totalXP: number;
  spentXP: number;  // Add spentXP to cloud sync
  unlockedLessons: string[];  // Add unlocked lessons to cloud sync
  purchasedItems: Array<{
    id: string;
    quantity: number;
  }>;  // Add purchased shop items to cloud sync
  lastSyncedAt: string;
}

interface CloudUserData {
  goal: any;
  hasCompletedGoalSetting: boolean;
  profile: {
    name: string | null;
    picture: string | null;
  };
  progress: CloudProgressData;
  updatedAt: string;
}

class SyncService {
  private isSyncing = false;
  private unsubscribe: (() => void) | null = null;
  private lastCloudUpdate = 0; // Track last cloud update timestamp to avoid loops

  /**
   * Sync all user data to cloud
   */
  async syncUserData(userId: string): Promise<void> {
    if (this.isSyncing) {
      console.log('⏸️ Sync already in progress, skipping...');
      return;
    }

    this.isSyncing = true;

    try {
      console.log('🔄 Starting cloud sync for user:', userId);

      // Get current local data
      const userState = useUserStore.getState();
      const progressState = useProgressStore.getState();

      // Fetch cloud data
      const cloudData = await this.fetchCloudData(userId);

      if (cloudData) {
        // Cloud data exists - merge with local
        await this.mergeData(userId, cloudData, userState, progressState);
      } else {
        // No cloud data - push local data to cloud
        await this.pushLocalToCloud(userId, userState, progressState);
      }

      console.log('✅ Cloud sync completed successfully');
    } catch (error) {
      console.error('❌ Cloud sync failed:', error);
      throw error;
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Fetch data from Firestore
   */
  private async fetchCloudData(userId: string): Promise<CloudUserData | null> {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        return userDoc.data() as CloudUserData;
      }

      return null;
    } catch (error) {
      console.error('Error fetching cloud data:', error);
      return null;
    }
  }

  /**
   * Push local data to cloud (first time sync)
   */
  private async pushLocalToCloud(
    userId: string,
    userState: any,
    progressState: any
  ): Promise<void> {
    const cloudData: CloudUserData = {
      goal: userState.goal,
      hasCompletedGoalSetting: userState.hasCompletedGoalSetting,
      profile: {
        name: userState.user?.name ?? null,
        picture: userState.user?.picture ?? null,
      },
      progress: {
        completedLessons: progressState.completedLessons,
        completedAssessments: progressState.completedAssessments || [],
        totalXP: progressState.totalXP || 0,
        spentXP: progressState.spentXP || 0,
        unlockedLessons: progressState.unlockedLessons || ['lesson-1-1'],
        purchasedItems: progressState.purchasedItems || [],
        lastSyncedAt: new Date().toISOString(),
      },
      updatedAt: new Date().toISOString(),
    };

    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, cloudData);

    console.log('📤 Pushed local data to cloud');
  }

  /**
   * Merge cloud and local data (conflict resolution)
   */
  private async mergeData(
    userId: string,
    cloudData: CloudUserData,
    userState: any,
    progressState: any
  ): Promise<void> {
    console.log('🔀 Merging cloud and local data...');

    // Strategy: Use cloud data as source of truth, but merge lessons/assessments
    // If local has newer data, prioritize local

    const localLastUpdate = progressState.lastSyncedAt || new Date(0).toISOString();
    const cloudLastUpdate = cloudData.progress?.lastSyncedAt || new Date(0).toISOString();

    let mergedLessons = [...(cloudData.progress?.completedLessons || [])];
    let mergedAssessments = [...(cloudData.progress?.completedAssessments || [])];
    let mergedXP = cloudData.progress?.totalXP || 0;

    // Merge completed lessons (union of both)
    for (const localLesson of progressState.completedLessons) {
      const existsInCloud = mergedLessons.some(
        (cl) => cl.lessonId === localLesson.lessonId
      );
      if (!existsInCloud) {
        mergedLessons.push(localLesson);
      }
    }

    // Merge assessments (use higher score if duplicate)
    for (const localAssessment of progressState.completedAssessments || []) {
      const cloudAssessmentIndex = mergedAssessments.findIndex(
        (ca) => ca.moduleId === localAssessment.moduleId
      );

      if (cloudAssessmentIndex === -1) {
        // Assessment doesn't exist in cloud, add it
        mergedAssessments.push(localAssessment);
      } else {
        // Use higher score
        if (localAssessment.score > mergedAssessments[cloudAssessmentIndex].score) {
          mergedAssessments[cloudAssessmentIndex] = localAssessment;
        }
      }
    }

    // Merge total XP (take maximum - preserves game bonuses and other XP sources)
    // Don't recalculate from lessons as this loses game bonus XP!
    mergedXP = Math.max(
      cloudData.progress?.totalXP || 0,
      progressState.totalXP || 0
    );

    // Merge unlocked lessons (union of both)
    let mergedUnlockedLessons = [...(cloudData.progress?.unlockedLessons || ['lesson-1-1'])];
    for (const localUnlocked of progressState.unlockedLessons || ['lesson-1-1']) {
      if (!mergedUnlockedLessons.includes(localUnlocked)) {
        mergedUnlockedLessons.push(localUnlocked);
      }
    }

    // Merge spent XP (take maximum - represents actual spending)
    let mergedSpentXP = Math.max(
      cloudData.progress?.spentXP || 0,
      progressState.spentXP || 0
    );

    // Safety check: Ensure spentXP doesn't exceed totalXP (prevent negative available XP)
    if (mergedSpentXP > mergedXP) {
      console.warn(`⚠️ spentXP (${mergedSpentXP}) exceeds totalXP (${mergedXP}), capping to totalXP`);
      mergedSpentXP = mergedXP;
    }

    // Merge purchased items — local is source of truth (single-device app)
    // Use local quantities, but include any cloud-only items as fallback
    const itemMap = new Map<string, number>();

    // Seed with cloud items (fallback for items not yet in local)
    for (const item of cloudData.progress?.purchasedItems || []) {
      itemMap.set(item.id, item.quantity);
    }

    // Override with local items (local is always most up-to-date)
    for (const item of progressState.purchasedItems || []) {
      itemMap.set(item.id, item.quantity);
    }

    const mergedPurchasedItems = Array.from(itemMap.entries()).map(([id, quantity]) => ({
      id,
      quantity
    }));

    console.log('📊 Merge results:', {
      lessons: mergedLessons.length,
      totalXP: mergedXP,
      spentXP: mergedSpentXP,
      availableXP: mergedXP - mergedSpentXP,
      unlockedLessons: mergedUnlockedLessons.length,
      purchasedItems: mergedPurchasedItems.length
    });

    // Update local store with merged data
    const progressStore = useProgressStore.getState();

    // Directly set the state to avoid double-counting XP
    useProgressStore.setState({
      completedLessons: mergedLessons,
      completedAssessments: mergedAssessments,
      totalXP: mergedXP,
      spentXP: mergedSpentXP,
      unlockedLessons: mergedUnlockedLessons,
      purchasedItems: mergedPurchasedItems,
    });

    // Merge profile — prefer LOCAL (just saved by user) over cloud (stale)
    // Cloud profile is only used as fallback when local has no custom profile
    const mergedProfile = {
      name: userState.user?.name ?? cloudData.profile?.name ?? null,
      picture: userState.user?.picture ?? cloudData.profile?.picture ?? null,
    };

    // Merge goal and hasCompletedGoalSetting (prefer whichever is set)
    const mergedGoal = userState.goal ?? cloudData.goal;
    const mergedHasCompletedGoalSetting = userState.hasCompletedGoalSetting || cloudData.hasCompletedGoalSetting;

    // Update cloud with merged data
    const updatedCloudData: CloudUserData = {
      goal: mergedGoal,
      hasCompletedGoalSetting: mergedHasCompletedGoalSetting,
      profile: mergedProfile,
      progress: {
        completedLessons: mergedLessons,
        completedAssessments: mergedAssessments,
        totalXP: mergedXP,
        spentXP: mergedSpentXP,
        unlockedLessons: mergedUnlockedLessons,
        purchasedItems: mergedPurchasedItems,
        lastSyncedAt: new Date().toISOString(),
      },
      updatedAt: new Date().toISOString(),
    };

    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, updatedCloudData);

    // Restore goal setting state from cloud if local hasn't completed it
    if (mergedGoal && !userState.goal) {
      useUserStore.getState().setGoal(mergedGoal);
    }
    if (mergedHasCompletedGoalSetting && !userState.hasCompletedGoalSetting) {
      useUserStore.setState({ hasCompletedGoalSetting: true });
    }

    console.log('✅ Data merged successfully');
    console.log(`📊 Total lessons: ${mergedLessons.length}, Total XP: ${mergedXP}`);
  }

  /**
   * Manual sync trigger
   */
  async syncNow(): Promise<void> {
    const userId = useUserStore.getState().user?.uid;
    if (!userId) {
      console.warn('No user logged in, cannot sync');
      return;
    }

    await this.syncUserData(userId);
  }

  /**
   * Start real-time sync listener
   * Automatically updates local state when cloud data changes
   */
  startRealtimeSync(userId: string): void {
    // Stop existing listener if any
    this.stopRealtimeSync();

    const userDocRef = doc(db, 'users', userId);

    console.log('🔄 Starting real-time sync for user:', userId);

    this.unsubscribe = onSnapshot(
      userDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const cloudData = docSnapshot.data() as CloudUserData;
          const cloudTimestamp = new Date(cloudData.updatedAt).getTime();

          // Skip if this is the same update we just saw (prevent duplicate processing)
          if (cloudTimestamp === this.lastCloudUpdate) {
            console.log('📡 Skipping duplicate cloud update');
            return;
          }

          // Skip if we're currently syncing (this update is from us)
          if (this.isSyncing) {
            console.log('📡 Skipping update during active sync');
            this.lastCloudUpdate = cloudTimestamp;
            return;
          }

          console.log('📡 Cloud data changed, updating local state...');
          this.lastCloudUpdate = cloudTimestamp;

          // Get current local state
          const userState = useUserStore.getState();
          const progressState = useProgressStore.getState();

          // Always apply cloud changes when onSnapshot fires (it only fires on real changes)
          this.applyCloudData(cloudData, userState, progressState);
        }
      },
      (error) => {
        console.error('❌ Real-time sync error:', error);
      }
    );
  }

  /**
   * Stop real-time sync listener
   */
  stopRealtimeSync(): void {
    if (this.unsubscribe) {
      console.log('⏹️ Stopping real-time sync');
      this.unsubscribe();
      this.unsubscribe = null;
      this.lastCloudUpdate = 0; // Reset tracker
    }
  }

  /**
   * Apply cloud data to local state (used by real-time listener)
   */
  private applyCloudData(
    cloudData: CloudUserData,
    userState: any,
    progressState: any
  ): void {
    // Merge lessons (union of both)
    let mergedLessons = [...(cloudData.progress?.completedLessons || [])];
    for (const localLesson of progressState.completedLessons) {
      const existsInCloud = mergedLessons.some(
        (cl) => cl.lessonId === localLesson.lessonId
      );
      if (!existsInCloud) {
        mergedLessons.push(localLesson);
      }
    }

    // Merge assessments (use higher score)
    let mergedAssessments = [...(cloudData.progress?.completedAssessments || [])];
    for (const localAssessment of progressState.completedAssessments || []) {
      const cloudAssessmentIndex = mergedAssessments.findIndex(
        (ca) => ca.moduleId === localAssessment.moduleId
      );

      if (cloudAssessmentIndex === -1) {
        mergedAssessments.push(localAssessment);
      } else if (localAssessment.score > mergedAssessments[cloudAssessmentIndex].score) {
        mergedAssessments[cloudAssessmentIndex] = localAssessment;
      }
    }

    // Merge XP (take maximum)
    const mergedXP = Math.max(
      cloudData.progress?.totalXP || 0,
      progressState.totalXP || 0
    );

    // Merge unlocked lessons (union)
    let mergedUnlockedLessons = [...(cloudData.progress?.unlockedLessons || ['lesson-1-1'])];
    for (const localUnlocked of progressState.unlockedLessons || ['lesson-1-1']) {
      if (!mergedUnlockedLessons.includes(localUnlocked)) {
        mergedUnlockedLessons.push(localUnlocked);
      }
    }

    // Merge spent XP (take maximum)
    let mergedSpentXP = Math.max(
      cloudData.progress?.spentXP || 0,
      progressState.spentXP || 0
    );

    // Safety check
    if (mergedSpentXP > mergedXP) {
      mergedSpentXP = mergedXP;
    }

    // Merge purchased items — local is source of truth (single-device app)
    const itemMap = new Map<string, number>();
    for (const item of cloudData.progress?.purchasedItems || []) {
      itemMap.set(item.id, item.quantity);
    }
    // Override with local items (local is always most up-to-date)
    for (const item of progressState.purchasedItems || []) {
      itemMap.set(item.id, item.quantity);
    }
    const mergedPurchasedItems = Array.from(itemMap.entries()).map(([id, quantity]) => ({
      id,
      quantity
    }));

    // Update local state
    useProgressStore.setState({
      completedLessons: mergedLessons,
      completedAssessments: mergedAssessments,
      totalXP: mergedXP,
      spentXP: mergedSpentXP,
      unlockedLessons: mergedUnlockedLessons,
      purchasedItems: mergedPurchasedItems,
    });

    // Restore goal, hasCompletedGoalSetting, and profile from cloud
    if (cloudData?.goal && !userState.goal) {
      useUserStore.getState().setGoal(cloudData.goal);
    }
    if (cloudData?.hasCompletedGoalSetting && !userState.hasCompletedGoalSetting) {
      useUserStore.setState({ hasCompletedGoalSetting: true });
    }
    // Restore profile name/picture from cloud
    if (userState.user && cloudData.profile) {
      const currentUser = userState.user;
      const cloudProfile = cloudData.profile;
      if (cloudProfile.name || cloudProfile.picture) {
        useUserStore.setState({
          user: {
            ...currentUser,
            name: cloudProfile.name ?? currentUser.name,
            picture: cloudProfile.picture ?? currentUser.picture,
          },
        });
      }
    }

    console.log('✅ Real-time sync applied:', {
      lessons: mergedLessons.length,
      totalXP: mergedXP,
      spentXP: mergedSpentXP,
    });
  }
}

export const syncService = new SyncService();
