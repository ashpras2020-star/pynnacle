// Challenge Store — manages friend challenges with real-time listeners

import { create } from 'zustand';
import {
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@config/firebase';
import { challengeService } from '@services/challengeService';
import type { Challenge, ChallengeType } from '@types/challenge';

interface ChallengeState {
  challenges: Challenge[];
  isLoading: boolean;

  // Actions
  createChallenge: (params: {
    type: ChallengeType;
    targetValue: number;
    targetModuleId?: string;
    wager: number;
    opponentId: string;
    opponentName: string;
    opponentPhoto: string | null;
  }) => Promise<string>;
  acceptChallenge: (challengeId: string) => Promise<void>;
  declineChallenge: (challengeId: string) => Promise<void>;
  cancelChallenge: (challengeId: string) => Promise<void>;
  refreshProgress: () => Promise<void>;

  // Listeners
  startListening: (userId: string) => void;
  stopListening: () => void;
}

let unsubChallenges: (() => void) | null = null;

export const useChallengeStore = create<ChallengeState>()((set, get) => ({
  challenges: [],
  isLoading: false,

  createChallenge: async (params) => {
    const { useUserStore } = await import('@store/useUserStore');
    const { useProgressStore } = await import('@store/useProgressStore');
    const user = useUserStore.getState().user;
    if (!user?.uid) throw new Error('Not signed in');

    const available = useProgressStore.getState().getAvailableXP();
    if (params.wager > available) throw new Error('Not enough XP for wager');

    // Capture creator's current value so start baseline is accurate when opponent accepts
    const progressState = useProgressStore.getState();
    const creatorStartValue = challengeService.getCurrentValue(
      params.type,
      progressState,
      params.targetModuleId
    );

    const challengeId = await challengeService.createChallenge({
      ...params,
      creatorId: user.uid,
      creatorName: user.name || 'Unknown',
      creatorPhoto: user.picture || null,
      creatorStartValue,
    });

    // Deduct wager
    useProgressStore.setState((state) => ({
      spentXP: state.spentXP + params.wager,
    }));
    useProgressStore.getState().syncToCloud(user.uid).catch(() => {});

    return challengeId;
  },

  acceptChallenge: async (challengeId: string) => {
    const { useUserStore } = await import('@store/useUserStore');
    const { useProgressStore } = await import('@store/useProgressStore');
    const user = useUserStore.getState().user;
    if (!user?.uid) throw new Error('Not signed in');

    const challenge = get().challenges.find((c) => c.id === challengeId);
    if (!challenge) throw new Error('Challenge not found');

    const available = useProgressStore.getState().getAvailableXP();
    if (challenge.wager > available) throw new Error('Not enough XP for wager');

    // Get start values for both participants
    const progressState = useProgressStore.getState();
    const startValues: Record<string, number> = {};
    for (const pid of challenge.participants) {
      if (pid === user.uid) {
        // Acceptor: capture current value now
        startValues[pid] = challengeService.getCurrentValue(
          challenge.type,
          progressState,
          challenge.targetModuleId
        );
      } else {
        // Creator: use the startValue they stored when creating the challenge
        startValues[pid] = challenge.progress[pid]?.startValue ?? challenge.progress[pid]?.currentValue ?? 0;
      }
    }

    await challengeService.acceptChallenge(challengeId, user.uid, startValues);

    // Deduct wager
    useProgressStore.setState((state) => ({
      spentXP: state.spentXP + challenge.wager,
    }));
    useProgressStore.getState().syncToCloud(user.uid).catch(() => {});
  },

  declineChallenge: async (challengeId: string) => {
    await challengeService.cancelChallenge(challengeId);
  },

  cancelChallenge: async (challengeId: string) => {
    const { useUserStore } = await import('@store/useUserStore');
    const { useProgressStore } = await import('@store/useProgressStore');
    const user = useUserStore.getState().user;
    if (!user?.uid) throw new Error('Not signed in');

    const challenge = get().challenges.find((c) => c.id === challengeId);
    if (!challenge) throw new Error('Challenge not found');

    await challengeService.cancelChallenge(challengeId);

    // Refund wager to creator
    if (challenge.createdBy === user.uid) {
      useProgressStore.setState((state) => ({
        spentXP: Math.max(0, state.spentXP - challenge.wager),
      }));
      useProgressStore.getState().syncToCloud(user.uid).catch(() => {});
    }
  },

  refreshProgress: async () => {
    const { useUserStore } = await import('@store/useUserStore');
    const { useProgressStore } = await import('@store/useProgressStore');
    const user = useUserStore.getState().user;
    if (!user?.uid) return;

    const progressState = useProgressStore.getState();
    const activeChallenges = get().challenges.filter((c) => c.status === 'active');

    for (const challenge of activeChallenges) {
      const currentValue = challengeService.getCurrentValue(
        challenge.type,
        progressState,
        challenge.targetModuleId
      );

      const existing = challenge.progress[user.uid];
      if (existing && currentValue !== existing.currentValue) {
        await challengeService.updateProgress(challenge.id, user.uid, currentValue);
        // Check if challenge is now complete
        const updated = {
          ...challenge,
          progress: {
            ...challenge.progress,
            [user.uid]: { ...existing, currentValue },
          },
        };
        const result = await challengeService.checkCompletion(updated);
        if (result.completed && result.winner) {
          // Winner gets 2x wager (their refund + opponent's wager)
          if (result.winner === user.uid) {
            useProgressStore.setState((state) => ({
              spentXP: Math.max(0, state.spentXP - challenge.wager * 2),
            }));
            useProgressStore.getState().syncToCloud(user.uid).catch(() => {});
          }
        }
      }
    }
  },

  startListening: (userId: string) => {
    get().stopListening();
    set({ isLoading: true });

    const q = query(
      collection(db, 'challenges'),
      where('participants', 'array-contains', userId)
    );

    unsubChallenges = onSnapshot(q, (snapshot) => {
      const challenges = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Challenge[];

      // Sort: active first, then pending, then completed
      challenges.sort((a, b) => {
        const order: Record<string, number> = { active: 0, pending: 1, completed: 2, cancelled: 3 };
        return (order[a.status] ?? 4) - (order[b.status] ?? 4);
      });

      set({ challenges, isLoading: false });
    }, (error) => {
      console.warn('Challenges listener failed:', error);
      set({ isLoading: false });
    });
  },

  stopListening: () => {
    unsubChallenges?.();
    unsubChallenges = null;
    set({ challenges: [] });
  },
}));
