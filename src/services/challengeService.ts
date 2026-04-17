// Challenge Service — CRUD for friend challenges with XP wagers

import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@config/firebase';
import type { Challenge, ChallengeType } from '@types/challenge';

class ChallengeService {
  /**
   * Create a new challenge and deduct wager from creator
   */
  async createChallenge(params: {
    type: ChallengeType;
    targetValue: number;
    targetModuleId?: string;
    wager: number;
    creatorId: string;
    creatorName: string;
    creatorPhoto: string | null;
    opponentId: string;
    opponentName: string;
    opponentPhoto: string | null;
    creatorStartValue?: number;
  }): Promise<string> {
    const creatorBase = params.creatorStartValue ?? 0;
    const challengeData = {
      createdBy: params.creatorId,
      participants: [params.creatorId, params.opponentId],
      participantNames: {
        [params.creatorId]: params.creatorName,
        [params.opponentId]: params.opponentName,
      },
      participantPhotos: {
        [params.creatorId]: params.creatorPhoto,
        [params.opponentId]: params.opponentPhoto,
      },
      status: 'pending',
      type: params.type,
      targetValue: params.targetValue,
      ...(params.targetModuleId && { targetModuleId: params.targetModuleId }),
      wager: params.wager,
      progress: {
        [params.creatorId]: { startValue: creatorBase, currentValue: creatorBase },
        [params.opponentId]: { startValue: 0, currentValue: 0 },
      },
      winner: null,
      createdAt: serverTimestamp(),
      completedAt: null,
    };

    const ref = await addDoc(collection(db, 'challenges'), challengeData);
    return ref.id;
  }

  /**
   * Accept a challenge — record start values from both users' progress
   */
  async acceptChallenge(
    challengeId: string,
    userId: string,
    startValues: Record<string, number>
  ): Promise<void> {
    const challengeRef = doc(db, 'challenges', challengeId);
    const snap = await getDoc(challengeRef);
    if (!snap.exists()) throw new Error('Challenge not found');

    const data = snap.data();
    const progress: Record<string, { startValue: number; currentValue: number }> = {};
    for (const pid of data.participants) {
      progress[pid] = {
        startValue: startValues[pid] || 0,
        currentValue: startValues[pid] || 0,
      };
    }

    await updateDoc(challengeRef, {
      status: 'active',
      progress,
    });
  }

  /**
   * Decline/cancel a challenge
   */
  async cancelChallenge(challengeId: string): Promise<void> {
    const challengeRef = doc(db, 'challenges', challengeId);
    await updateDoc(challengeRef, { status: 'cancelled' });
  }

  /**
   * Update progress for a user in a challenge
   */
  async updateProgress(
    challengeId: string,
    userId: string,
    currentValue: number
  ): Promise<void> {
    const challengeRef = doc(db, 'challenges', challengeId);
    await updateDoc(challengeRef, {
      [`progress.${userId}.currentValue`]: currentValue,
    });
  }

  /**
   * Check if a challenge is completed and set winner
   */
  async checkCompletion(challenge: Challenge): Promise<{ winner: string | null; completed: boolean }> {
    for (const pid of challenge.participants) {
      const prog = challenge.progress[pid];
      if (!prog) continue;
      const delta = prog.currentValue - prog.startValue;
      if (delta >= challenge.targetValue) {
        // This participant won
        const challengeRef = doc(db, 'challenges', challenge.id);
        await updateDoc(challengeRef, {
          status: 'completed',
          winner: pid,
          completedAt: serverTimestamp(),
        });
        return { winner: pid, completed: true };
      }
    }
    return { winner: null, completed: false };
  }

  /**
   * Get all challenges for a user
   */
  async getUserChallenges(userId: string): Promise<Challenge[]> {
    const q = query(
      collection(db, 'challenges'),
      where('participants', 'array-contains', userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Challenge[];
  }

  /**
   * Get current progress value for a challenge type from progress store
   */
  getCurrentValue(
    type: ChallengeType,
    progressState: any,
    targetModuleId?: string
  ): number {
    switch (type) {
      case 'xp_race':
        return progressState.totalXP || 0;
      case 'lesson_count':
        return progressState.completedLessons?.length || 0;
      case 'streak':
        return progressState.currentStreak || 0;
      case 'module_completion': {
        if (!targetModuleId) return 0;
        const passed = progressState.completedAssessments?.find(
          (a: any) => a.moduleId === targetModuleId && a.passed
        );
        return passed ? 1 : 0;
      }
      default:
        return 0;
    }
  }
}

export const challengeService = new ChallengeService();
