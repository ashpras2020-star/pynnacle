// Activity Feed Service
// Posts and fetches activity events for the friends feed

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@config/firebase';

export type ActivityType =
  | 'lesson_completed'
  | 'assessment_passed'
  | 'streak_milestone'
  | 'xp_milestone'
  | 'xp_gift_sent'
  | 'xp_gift_received'
  | 'challenge_won'
  | 'challenge_lost'
  | 'quiz_game_won';

export interface ActivityData {
  lessonId?: string;
  moduleId?: string;
  xpEarned?: number;
  score?: number;
  percentage?: number;
  streakCount?: number;
  totalXP?: number;
  giftAmount?: number;
  fromUserName?: string;
  fromUserId?: string;
  toUserName?: string;
  processed?: boolean;
  challengeType?: string;
  opponentName?: string;
  wager?: number;
  quizScore?: number;
}

export interface ActivityFeedItem {
  id: string;
  userId: string;
  type: ActivityType;
  timestamp: Timestamp;
  data: ActivityData;
  // Populated client-side from userProfiles
  userName?: string;
  userPhoto?: string | null;
}

// XP milestones to track
const XP_MILESTONES = [500, 1000, 2500, 5000, 10000];

// Streak milestones to track
const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100];

// Module name lookup
const MODULE_NAMES: Record<string, string> = {
  'module-1': 'Basics & Syntax',
  'module-2': 'Working with Numbers & Math',
  'module-3': 'String Manipulation',
  'module-4': 'Boolean Logic',
  'module-5': 'Control Flow',
  'module-6': 'Collections',
  'module-7': 'Functions',
  'module-8': 'List Comprehensions',
  'module-9': 'Error Handling',
  'module-10': 'File I/O',
};

class ActivityService {
  /**
   * Post a new activity for the current user
   */
  async postActivity(
    userId: string,
    type: ActivityType,
    data: ActivityData
  ): Promise<void> {
    try {
      const feedRef = collection(db, 'activities', userId, 'feed');
      await addDoc(feedRef, {
        type,
        data,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.warn('Failed to post activity:', error);
    }
  }

  /**
   * Fetch recent activities for a list of friend IDs
   */
  async getFriendActivities(
    friendIds: string[],
    maxItems: number = 50
  ): Promise<ActivityFeedItem[]> {
    if (friendIds.length === 0) return [];

    const allActivities: ActivityFeedItem[] = [];

    // Query each friend's feed (Firestore doesn't support cross-collection queries)
    for (const friendId of friendIds) {
      try {
        const feedRef = collection(db, 'activities', friendId, 'feed');
        const q = query(feedRef, orderBy('timestamp', 'desc'), limit(20));
        const snapshot = await getDocs(q);

        for (const doc of snapshot.docs) {
          const docData = doc.data();
          allActivities.push({
            id: doc.id,
            userId: friendId,
            type: docData.type,
            timestamp: docData.timestamp,
            data: docData.data || {},
          });
        }
      } catch (error) {
        console.warn(`Failed to fetch activities for ${friendId}:`, error);
      }
    }

    // Sort all activities by timestamp descending and take top N
    allActivities.sort((a, b) => {
      const aTime = a.timestamp?.toMillis?.() || 0;
      const bTime = b.timestamp?.toMillis?.() || 0;
      return bTime - aTime;
    });

    return allActivities.slice(0, maxItems);
  }

  /**
   * Check if a new XP total crosses a milestone
   */
  getXPMilestone(previousXP: number, newXP: number): number | null {
    for (const milestone of XP_MILESTONES) {
      if (previousXP < milestone && newXP >= milestone) {
        return milestone;
      }
    }
    return null;
  }

  /**
   * Check if a streak count is a milestone
   */
  isStreakMilestone(streakCount: number): boolean {
    return STREAK_MILESTONES.includes(streakCount);
  }

  /**
   * Get a human-readable description for an activity
   */
  getActivityDescription(type: ActivityType, data: ActivityData): string {
    switch (type) {
      case 'lesson_completed': {
        const lessonLabel = data.lessonId || 'a lesson';
        const xp = data.xpEarned ? ` (+${data.xpEarned} XP)` : '';
        return `completed ${lessonLabel}${xp}`;
      }
      case 'assessment_passed': {
        const moduleName = data.moduleId
          ? MODULE_NAMES[data.moduleId] || data.moduleId
          : 'a module';
        const pct = data.percentage ? ` with ${data.percentage}%` : '';
        return `passed the ${moduleName} assessment${pct}`;
      }
      case 'streak_milestone':
        return `reached a ${data.streakCount}-day streak!`;
      case 'xp_milestone':
        return `earned ${data.totalXP?.toLocaleString()} total XP!`;
      case 'xp_gift_sent':
        return `sent ${data.giftAmount} XP to ${data.toUserName || 'a friend'}`;
      case 'xp_gift_received':
        return `received ${data.giftAmount} XP from ${data.fromUserName || 'a friend'}`;
      case 'challenge_won':
        return `won a ${data.challengeType || 'challenge'} vs ${data.opponentName || 'a friend'} (+${data.wager?.toLocaleString() || 0} XP)`;
      case 'challenge_lost':
        return `lost a ${data.challengeType || 'challenge'} vs ${data.opponentName || 'a friend'}`;
      case 'quiz_game_won':
        return `won a live quiz with ${data.quizScore?.toLocaleString() || 0} points!`;
      default:
        return 'did something awesome';
    }
  }

  /**
   * Get module name from ID
   */
  getModuleName(moduleId: string): string {
    return MODULE_NAMES[moduleId] || moduleId;
  }

  /**
   * Get unprocessed gift XP items from the user's own feed
   */
  async getUnprocessedGifts(userId: string): Promise<{ id: string; amount: number; fromName: string }[]> {
    const feedRef = collection(db, 'activities', userId, 'feed');
    const q = query(feedRef, where('type', '==', 'xp_gift_received'));
    const snapshot = await getDocs(q);
    const gifts: { id: string; amount: number; fromName: string }[] = [];
    for (const d of snapshot.docs) {
      const data = d.data();
      if (data.data?.processed === false && data.data?.giftAmount > 0) {
        gifts.push({ id: d.id, amount: data.data.giftAmount, fromName: data.data?.fromUserName || 'A friend' });
      }
    }
    return gifts;
  }

  /**
   * Mark a gift activity as processed
   */
  async markGiftProcessed(userId: string, activityId: string): Promise<void> {
    const activityRef = doc(db, 'activities', userId, 'feed', activityId);
    await updateDoc(activityRef, { 'data.processed': true });
  }
}

export const activityService = new ActivityService();
export { STREAK_MILESTONES, XP_MILESTONES, MODULE_NAMES };
