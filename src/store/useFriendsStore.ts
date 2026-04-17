// Friends Store — manages friends, requests, and presence
// No persistence — always fresh from Firestore

import { create } from 'zustand';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
} from 'firebase/firestore';
import { db } from '@config/firebase';
import { friendsService } from '@services/friendsService';
import { activityService } from '@services/activityService';
import type { FriendProfile, FriendRequest } from '@services/friendsService';
import type { ActivityFeedItem } from '@services/activityService';

interface QuizInviteItem {
  gameId: string;
  hostName: string;
  maxModule: number;
}

interface FriendsState {
  friends: FriendProfile[];
  incomingRequests: FriendRequest[];
  sentRequests: FriendRequest[];
  isLoading: boolean;
  activityFeed: ActivityFeedItem[];
  feedLoading: boolean;
  quizInvites: QuizInviteItem[];

  // Actions
  sendRequest: (email: string) => Promise<void>;
  acceptRequest: (requestId: string) => Promise<void>;
  rejectRequest: (requestId: string) => Promise<void>;
  removeFriend: (friendId: string) => Promise<void>;
  loadActivityFeed: () => Promise<void>;
  clearActivityFeed: () => Promise<void>;
  giftXP: (friendId: string, amount: number) => Promise<void>;
  processIncomingGifts: (userId: string) => Promise<void>;
  loadQuizInvites: () => Promise<void>;

  // Listeners
  startListening: (userId: string) => void;
  stopListening: () => void;

  // Presence
  startPresenceUpdater: (userId: string) => void;
  stopPresenceUpdater: () => void;
}

// Store listener unsubscribe functions outside Zustand (non-serializable)
let unsubFriendsList: (() => void) | null = null;
let unsubIncoming: (() => void) | null = null;
let unsubSent: (() => void) | null = null;
let invitePollInterval: ReturnType<typeof setInterval> | null = null;
let giftPollInterval: ReturnType<typeof setInterval> | null = null;
let presenceInterval: ReturnType<typeof setInterval> | null = null;
let profileRefreshInterval: ReturnType<typeof setInterval> | null = null;
let beforeUnloadHandler: (() => void) | null = null;
let currentFriendIds: string[] = [];

export const useFriendsStore = create<FriendsState>()((set, get) => ({
  friends: [],
  incomingRequests: [],
  sentRequests: [],
  isLoading: false,
  activityFeed: [],
  feedLoading: false,
  quizInvites: [],

  sendRequest: async (email: string) => {
    const { useUserStore } = await import('@store/useUserStore');
    const userId = useUserStore.getState().user?.uid;
    if (!userId) throw new Error('Not signed in');

    // Find user by email
    const found = await friendsService.findUserByEmail(email);
    if (!found) throw new Error('No user found with that email');

    await friendsService.sendFriendRequest(userId, found.uid);
  },

  acceptRequest: async (requestId: string) => {
    const { useUserStore } = await import('@store/useUserStore');
    const userId = useUserStore.getState().user?.uid;
    if (!userId) throw new Error('Not signed in');

    await friendsService.acceptRequest(requestId, userId);
    // Optimistic: remove from incoming requests immediately
    set((state) => ({
      incomingRequests: state.incomingRequests.filter((r) => r.id !== requestId),
    }));
  },

  rejectRequest: async (requestId: string) => {
    await friendsService.rejectRequest(requestId);
    // Optimistic: remove from incoming requests immediately
    set((state) => ({
      incomingRequests: state.incomingRequests.filter((r) => r.id !== requestId),
    }));
  },

  loadActivityFeed: async () => {
    const friends = get().friends;
    if (friends.length === 0) {
      set({ activityFeed: [], feedLoading: false });
      return;
    }

    set({ feedLoading: true });
    try {
      const friendIds = friends.map((f) => f.uid);
      const activities = await activityService.getFriendActivities(friendIds);

      // Attach friend name/photo to each activity
      const friendMap = new Map(friends.map((f) => [f.uid, f]));
      const enriched = activities.map((a) => {
        const friend = friendMap.get(a.userId);
        return {
          ...a,
          userName: friend?.displayName || 'A friend',
          userPhoto: friend?.photoURL || null,
        };
      });

      set({ activityFeed: enriched, feedLoading: false });
    } catch (error) {
      console.warn('Failed to load activity feed:', error);
      set({ feedLoading: false });
    }
  },

  removeFriend: async (friendId: string) => {
    const { useUserStore } = await import('@store/useUserStore');
    const userId = useUserStore.getState().user?.uid;
    if (!userId) throw new Error('Not signed in');

    await friendsService.removeFriend(userId, friendId);
    // Remove from local state immediately
    set((state) => ({
      friends: state.friends.filter((f) => f.uid !== friendId),
    }));
  },

  giftXP: async (friendId: string, amount: number) => {
    const { useUserStore } = await import('@store/useUserStore');
    const { useProgressStore } = await import('@store/useProgressStore');
    const user = useUserStore.getState().user;
    if (!user?.uid) throw new Error('Not signed in');

    const available = useProgressStore.getState().getAvailableXP();
    if (amount <= 0 || amount > available) throw new Error('Invalid gift amount');

    const friend = get().friends.find((f) => f.uid === friendId);
    const toName = friend?.displayName || 'a friend';

    await friendsService.giftXP(user.uid, friendId, amount, user.name || 'Someone', toName);

    // Deduct from local state
    useProgressStore.setState((state) => ({
      spentXP: state.spentXP + amount,
    }));

    // Sync to cloud
    useProgressStore.getState().syncToCloud(user.uid).catch(() => {});
  },

  clearActivityFeed: async () => {
    set({ activityFeed: [] });
  },

  loadQuizInvites: async () => {
    try {
      const { useUserStore } = await import('@store/useUserStore');
      const userId = useUserStore.getState().user?.uid;
      if (!userId) return;

      const { liveQuizService } = await import('@services/liveQuizService');
      const invites = await liveQuizService.getInvites(userId);
      set({ quizInvites: invites });
    } catch (error) {
      console.warn('Failed to load quiz invites:', error);
    }
  },

  processIncomingGifts: async (userId: string) => {
    try {
      const gifts = await activityService.getUnprocessedGifts(userId);
      if (gifts.length === 0) return;

      const totalGifted = gifts.reduce((sum, g) => sum + g.amount, 0);

      // Add gifted XP to the user's progress (local state)
      const { useProgressStore } = await import('@store/useProgressStore');
      useProgressStore.setState((state) => ({
        totalXP: state.totalXP + totalGifted,
      }));

      // Mark all gifts as processed
      for (const gift of gifts) {
        await activityService.markGiftProcessed(userId, gift.id).catch(() => {});
      }

      // Also update cloud directly so sync merges (Math.max) pick up the new value
      const { doc: fbDoc, getDoc: fbGetDoc, setDoc: fbSetDoc } = await import('firebase/firestore');
      try {
        const userDocRef = fbDoc(db, 'users', userId);
        const userDoc = await fbGetDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          const cloudXP = data?.progress?.totalXP || 0;
          await fbSetDoc(userDocRef, {
            progress: {
              totalXP: cloudXP + totalGifted,
            },
            updatedAt: new Date().toISOString(),
          }, { merge: true });
        }
      } catch {
        // Fall back to normal sync
        useProgressStore.getState().syncToCloud(userId).catch(() => {});
      }
    } catch (error) {
      console.warn('Failed to process incoming gifts:', error);
    }
  },

  startListening: (userId: string) => {
    // Stop existing listeners
    get().stopListening();
    set({ isLoading: true });

    // Process any pending gift XP on startup
    get().processIncomingGifts(userId);

    // Start challenge listener
    import('@store/useChallengeStore').then(({ useChallengeStore }) => {
      useChallengeStore.getState().startListening(userId);
    }).catch(() => {});

    // Listen to friends list
    const friendsRef = collection(db, 'friends', userId, 'list');
    unsubFriendsList = onSnapshot(friendsRef, async (snapshot) => {
      const friendIds = snapshot.docs.map((d) => d.id);

      // Fetch profiles for all friends
      const profiles: FriendProfile[] = [];
      for (const fid of friendIds) {
        const profile = await friendsService.getFriendProfile(fid);
        if (profile) profiles.push(profile);
      }

      currentFriendIds = friendIds;
      set({ friends: profiles, isLoading: false });

      // Load activity feed and quiz invites after friends are loaded
      if (profiles.length > 0) {
        get().loadActivityFeed();
      }
      get().loadQuizInvites();
    }, (error) => {
      console.warn('Friends list listener failed:', error);
      set({ isLoading: false });
    });

    // Poll quiz invites every 10 seconds so new invites appear without a refresh
    if (invitePollInterval) clearInterval(invitePollInterval);
    invitePollInterval = setInterval(() => {
      get().loadQuizInvites();
    }, 10000);

    // Poll for incoming XP gifts every 30 seconds so gifted XP appears without refresh
    if (giftPollInterval) clearInterval(giftPollInterval);
    giftPollInterval = setInterval(() => {
      get().processIncomingGifts(userId);
    }, 30000);

    // Listen to incoming requests
    const incomingQuery = query(
      collection(db, 'friendRequests'),
      where('to', '==', userId)
    );
    unsubIncoming = onSnapshot(incomingQuery, (snapshot) => {
      const requests = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as FriendRequest[];
      set({ incomingRequests: requests });
    }, (error) => {
      console.warn('Incoming requests listener failed:', error);
    });

    // Listen to sent requests
    const sentQuery = query(
      collection(db, 'friendRequests'),
      where('from', '==', userId)
    );
    unsubSent = onSnapshot(sentQuery, (snapshot) => {
      const requests = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as FriendRequest[];
      set({ sentRequests: requests });
    }, (error) => {
      console.warn('Sent requests listener failed:', error);
    });
  },

  stopListening: () => {
    unsubFriendsList?.();
    unsubIncoming?.();
    unsubSent?.();
    unsubFriendsList = null;
    unsubIncoming = null;
    unsubSent = null;
    if (invitePollInterval) { clearInterval(invitePollInterval); invitePollInterval = null; }
    if (giftPollInterval) { clearInterval(giftPollInterval); giftPollInterval = null; }

    // Stop challenge listener
    import('@store/useChallengeStore').then(({ useChallengeStore }) => {
      useChallengeStore.getState().stopListening();
    }).catch(() => {});

    set({ friends: [], incomingRequests: [], sentRequests: [], activityFeed: [], quizInvites: [] });
  },

  startPresenceUpdater: (userId: string) => {
    // Stop existing
    get().stopPresenceUpdater();

    // Update immediately
    friendsService.updatePresence(userId).catch(() => {});

    // Update every 60 seconds
    presenceInterval = setInterval(() => {
      friendsService.updatePresence(userId).catch(() => {});
    }, 60 * 1000);

    // Refresh friend profiles every 60 seconds to update online status
    profileRefreshInterval = setInterval(async () => {
      if (currentFriendIds.length === 0) return;
      try {
        const profiles: FriendProfile[] = [];
        for (const fid of currentFriendIds) {
          const profile = await friendsService.getFriendProfile(fid);
          if (profile) profiles.push(profile);
        }
        set({ friends: profiles });
      } catch {
        // non-critical
      }
    }, 60 * 1000);

    // Mark offline when tab closes
    beforeUnloadHandler = () => {
      // Use sendBeacon-style: fire and forget since page is closing
      friendsService.markOffline(userId).catch(() => {});
    };
    window.addEventListener('beforeunload', beforeUnloadHandler);
  },

  stopPresenceUpdater: () => {
    if (presenceInterval) {
      clearInterval(presenceInterval);
      presenceInterval = null;
    }
    if (profileRefreshInterval) {
      clearInterval(profileRefreshInterval);
      profileRefreshInterval = null;
    }
    if (beforeUnloadHandler) {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      beforeUnloadHandler = null;
    }
    currentFriendIds = [];
  },
}));
