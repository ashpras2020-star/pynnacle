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

export interface ChallengeResult {
  challengeId: string;
  won: boolean;
  xpToAward: number;   // 0 for loser
  opponentName: string;
  wager: number;
  type: ChallengeType;
}

const CLAIMED_KEY = 'pynnacle_claimed_challenges';
function getClaimedIds(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(CLAIMED_KEY) || '[]')); }
  catch { return new Set(); }
}
function markClaimed(challengeId: string) {
  const ids = getClaimedIds();
  ids.add(challengeId);
  try { localStorage.setItem(CLAIMED_KEY, JSON.stringify([...ids])); } catch {}
}

interface ChallengeState {
  challenges: Challenge[];
  isLoading: boolean;
  challengeResultData: ChallengeResult | null;

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
  claimChallengeReward: () => Promise<void>;
  dismissChallengeResult: () => void;

  // Listeners
  startListening: (userId: string) => void;
  stopListening: () => void;
}

let unsubChallenges: (() => void) | null = null;
// Track previous challenge states to detect active→completed transitions for loser
const prevChallengeMap: Record<string, { status: string; winner: string | null }> = {};
let listeningUserId: string | null = null;

export const useChallengeStore = create<ChallengeState>()((set, get) => ({
  challenges: [],
  isLoading: false,
  challengeResultData: null,

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
    const claimedIds = getClaimedIds();

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
        if (result.completed && result.winner === user.uid && !claimedIds.has(challenge.id)) {
          const opponentId = challenge.participants.find((p) => p !== user.uid) || '';
          const opponentName = challenge.participantNames[opponentId] || 'Your opponent';
          // Show win animation — XP awarded when user clicks "Claim"
          set({
            challengeResultData: {
              challengeId: challenge.id,
              won: true,
              xpToAward: challenge.wager * 2,
              opponentName,
              wager: challenge.wager,
              type: challenge.type,
            },
          });
        }
      }
    }
  },

  claimChallengeReward: async () => {
    const result = get().challengeResultData;
    if (!result || !result.won || result.xpToAward <= 0) {
      set({ challengeResultData: null });
      return;
    }
    markClaimed(result.challengeId);
    const { useProgressStore } = await import('@store/useProgressStore');
    const { useUserStore } = await import('@store/useUserStore');
    // Reduce spentXP by 2x wager (refund creator + transfer opponent's wager)
    useProgressStore.setState((state) => ({
      spentXP: Math.max(0, state.spentXP - result.xpToAward),
    }));
    const userId = useUserStore.getState().user?.uid;
    if (userId) {
      useProgressStore.getState().syncToCloud(userId).catch(() => {});
    }
    set({ challengeResultData: null });
  },

  dismissChallengeResult: () => {
    set({ challengeResultData: null });
  },

  startListening: (userId: string) => {
    get().stopListening();
    listeningUserId = userId;
    set({ isLoading: true });

    const q = query(
      collection(db, 'challenges'),
      where('participants', 'array-contains', userId)
    );

    let firstSnapshot = true;

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

      const claimedIds = getClaimedIds();

      if (firstSnapshot) {
        firstSnapshot = false;
        // Seed prevChallengeMap — don't fire animations for existing state
        for (const c of challenges) {
          prevChallengeMap[c.id] = { status: c.status, winner: c.winner };
        }
        // Re-trigger unclaimed win animation if a completed+won challenge wasn't claimed yet
        if (!get().challengeResultData) {
          for (const c of challenges) {
            if (c.status === 'completed' && c.winner === userId && !claimedIds.has(c.id)) {
              const opponentId = c.participants.find((p) => p !== userId) || '';
              set({
                challengeResultData: {
                  challengeId: c.id,
                  won: true,
                  xpToAward: c.wager * 2,
                  opponentName: c.participantNames[opponentId] || 'Your opponent',
                  wager: c.wager,
                  type: c.type,
                },
              });
              break; // Show one at a time
            }
          }
        }
      } else {
        // Detect transitions for loser: active → completed by someone else
        if (!get().challengeResultData) {
          for (const c of challenges) {
            const prev = prevChallengeMap[c.id];
            if (
              prev &&
              prev.status === 'active' &&
              c.status === 'completed' &&
              c.winner &&
              c.winner !== userId
            ) {
              const opponentId = c.winner;
              set({
                challengeResultData: {
                  challengeId: c.id,
                  won: false,
                  xpToAward: 0,
                  opponentName: c.participantNames[opponentId] || 'Your opponent',
                  wager: c.wager,
                  type: c.type,
                },
              });
              break;
            }
          }
        }
        // Update prevChallengeMap
        for (const c of challenges) {
          prevChallengeMap[c.id] = { status: c.status, winner: c.winner };
        }
      }

      set({ challenges, isLoading: false });
    }, (error) => {
      console.warn('Challenges listener failed:', error);
      set({ isLoading: false });
    });
  },

  stopListening: () => {
    unsubChallenges?.();
    unsubChallenges = null;
    listeningUserId = null;
    for (const key in prevChallengeMap) delete prevChallengeMap[key];
    set({ challenges: [] });
  },
}));
