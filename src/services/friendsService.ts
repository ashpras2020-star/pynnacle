// Friends Service
// Handles friend requests, friend lists, public profiles, and presence

import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  query,
  where,
  addDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@config/firebase';
import { useUserStore } from '@store/useUserStore';
import { useProgressStore } from '@store/useProgressStore';

export interface PublicProfile {
  email: string;
  displayName: string | null;
  photoURL: string | null;
  totalXP: number;
  currentStreak: number;
  completedLessons: number;
  completedModuleCount: number;
  completedAssessmentCount: number;
  perfectAssessments: number;
  purchasedItemCount: number;
  pinnedBadges: string[];
  lastSeen: Timestamp | null;
}

export interface FriendRequest {
  id: string;
  from: string;
  fromEmail: string;
  fromName: string;
  fromPhoto: string | null;
  to: string;
  toEmail: string;
  createdAt: Timestamp;
}

export interface FriendProfile extends PublicProfile {
  isOnline: boolean;
  uid: string;
}

class FriendsService {
  /**
   * Sync current user's public profile to userProfiles collection
   */
  async syncPublicProfile(userId: string): Promise<void> {
    const userState = useUserStore.getState();
    const progressState = useProgressStore.getState();

    if (!userState.user?.email) return;

    // Count completed modules (all 5 lessons done)
    let completedModuleCount = 0;
    for (let m = 1; m <= 10; m++) {
      const allDone = [1, 2, 3, 4, 5].every((l) =>
        progressState.completedLessons.some((c) => c.lessonId === `lesson-${m}-${l}`)
      );
      if (allDone) completedModuleCount++;
    }

    const profileRef = doc(db, 'userProfiles', userId);
    await setDoc(profileRef, {
      email: userState.user.email,
      displayName: userState.user.name,
      photoURL: userState.user.picture,
      totalXP: progressState.totalXP,
      currentStreak: progressState.currentStreak,
      completedLessons: progressState.completedLessons.length,
      completedModuleCount,
      completedAssessmentCount: progressState.completedAssessments.filter((a) => a.passed).length,
      perfectAssessments: progressState.completedAssessments.filter((a) => a.percentage === 100).length,
      purchasedItemCount: progressState.purchasedItems.reduce((sum, i) => sum + i.quantity, 0),
      lastSeen: serverTimestamp(),
    }, { merge: true });
  }

  /**
   * Update lastSeen timestamp (presence heartbeat)
   */
  async updatePresence(userId: string): Promise<void> {
    const profileRef = doc(db, 'userProfiles', userId);
    await setDoc(profileRef, { lastSeen: serverTimestamp() }, { merge: true });
  }

  /**
   * Mark user as offline by setting lastSeen to a past time
   */
  async markOffline(userId: string): Promise<void> {
    const profileRef = doc(db, 'userProfiles', userId);
    // Set lastSeen to 10 minutes ago so isOnline check immediately returns false
    const pastTime = Timestamp.fromMillis(Date.now() - 10 * 60 * 1000);
    await setDoc(profileRef, { lastSeen: pastTime }, { merge: true });
  }

  /**
   * Find a user by email address
   */
  async findUserByEmail(email: string): Promise<{ uid: string; profile: PublicProfile } | null> {
    const q = query(
      collection(db, 'userProfiles'),
      where('email', '==', email.toLowerCase().trim())
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    return {
      uid: docSnap.id,
      profile: docSnap.data() as PublicProfile,
    };
  }

  /**
   * Send a friend request
   */
  async sendFriendRequest(fromUserId: string, toUserId: string): Promise<void> {
    const fromUser = useUserStore.getState().user;
    if (!fromUser) throw new Error('Not signed in');

    // Check not sending to self
    if (fromUserId === toUserId) {
      throw new Error("You can't add yourself as a friend");
    }

    // Check not already friends
    const friendDoc = await getDoc(doc(db, 'friends', fromUserId, 'list', toUserId));
    if (friendDoc.exists()) {
      throw new Error('Already friends with this user');
    }

    // Check no existing pending request in either direction
    const existingOutgoing = query(
      collection(db, 'friendRequests'),
      where('from', '==', fromUserId),
      where('to', '==', toUserId)
    );
    const outgoingSnap = await getDocs(existingOutgoing);
    if (!outgoingSnap.empty) {
      throw new Error('Friend request already sent');
    }

    const existingIncoming = query(
      collection(db, 'friendRequests'),
      where('from', '==', toUserId),
      where('to', '==', fromUserId)
    );
    const incomingSnap = await getDocs(existingIncoming);
    if (!incomingSnap.empty) {
      throw new Error('This user already sent you a request — check your requests');
    }

    // Get target user's email
    const toProfile = await getDoc(doc(db, 'userProfiles', toUserId));
    const toEmail = toProfile.exists() ? (toProfile.data() as PublicProfile).email : '';

    await addDoc(collection(db, 'friendRequests'), {
      from: fromUserId,
      fromEmail: fromUser.email || '',
      fromName: fromUser.name || 'Unknown',
      fromPhoto: fromUser.picture || null,
      to: toUserId,
      toEmail,
      createdAt: serverTimestamp(),
    });
  }

  /**
   * Accept a friend request — creates bidirectional friendship
   */
  async acceptRequest(requestId: string, currentUserId: string): Promise<void> {
    const requestRef = doc(db, 'friendRequests', requestId);
    const requestSnap = await getDoc(requestRef);

    if (!requestSnap.exists()) throw new Error('Request not found');

    const request = requestSnap.data() as Omit<FriendRequest, 'id'>;

    // Verify current user is the recipient
    if (request.to !== currentUserId) {
      throw new Error('Not authorized to accept this request');
    }

    // Create bidirectional friendship
    const now = serverTimestamp();
    await setDoc(doc(db, 'friends', request.to, 'list', request.from), { addedAt: now });
    await setDoc(doc(db, 'friends', request.from, 'list', request.to), { addedAt: now });

    // Delete the request
    await deleteDoc(requestRef);
  }

  /**
   * Reject/cancel a friend request
   */
  async rejectRequest(requestId: string): Promise<void> {
    await deleteDoc(doc(db, 'friendRequests', requestId));
  }

  /**
   * Remove a friend (bidirectional)
   */
  async removeFriend(userId: string, friendId: string): Promise<void> {
    await deleteDoc(doc(db, 'friends', userId, 'list', friendId));
    await deleteDoc(doc(db, 'friends', friendId, 'list', userId));
  }

  /**
   * Get a friend's public profile
   */
  async getFriendProfile(friendId: string): Promise<FriendProfile | null> {
    const profileSnap = await getDoc(doc(db, 'userProfiles', friendId));
    if (!profileSnap.exists()) return null;

    const data = profileSnap.data();
    const lastSeen = data.lastSeen as Timestamp | null;
    const isOnline = lastSeen
      ? Date.now() - lastSeen.toMillis() < 2 * 60 * 1000
      : false;

    return {
      email: data.email || '',
      displayName: data.displayName || null,
      photoURL: data.photoURL || null,
      totalXP: data.totalXP || 0,
      currentStreak: data.currentStreak || 0,
      completedLessons: data.completedLessons || 0,
      completedModuleCount: data.completedModuleCount || 0,
      completedAssessmentCount: data.completedAssessmentCount || 0,
      perfectAssessments: data.perfectAssessments || 0,
      purchasedItemCount: data.purchasedItemCount || 0,
      pinnedBadges: data.pinnedBadges || [],
      lastSeen,
      uid: friendId,
      isOnline,
    };
  }

  /**
   * Fetch the current user's own pinned badges
   */
  async getPinnedBadges(userId: string): Promise<string[]> {
    const profileRef = doc(db, 'userProfiles', userId);
    const snap = await getDoc(profileRef);
    if (!snap.exists()) return [];
    return snap.data().pinnedBadges || [];
  }

  /**
   * Update pinned badges for the user's public profile
   */
  async updatePinnedBadges(userId: string, badgeIds: string[]): Promise<void> {
    const profileRef = doc(db, 'userProfiles', userId);
    await setDoc(profileRef, { pinnedBadges: badgeIds.slice(0, 3) }, { merge: true });
  }

  /**
   * Gift XP to a friend by posting activity entries and updating receiver's XP
   */
  async giftXP(
    fromUserId: string,
    toUserId: string,
    amount: number,
    fromName: string,
    toName: string
  ): Promise<void> {
    const { activityService } = await import('@services/activityService');

    // Post to sender's feed
    await activityService.postActivity(fromUserId, 'xp_gift_sent', {
      giftAmount: amount,
      toUserName: toName,
    });

    // Post to receiver's feed
    const feedRef = collection(db, 'activities', toUserId, 'feed');
    await addDoc(feedRef, {
      type: 'xp_gift_received',
      data: {
        giftAmount: amount,
        fromUserName: fromName,
        fromUserId,
        processed: false,
      },
      timestamp: serverTimestamp(),
    });

    // Receiver's app will detect unprocessed gifts and apply XP on next load
  }
}

export const friendsService = new FriendsService();
