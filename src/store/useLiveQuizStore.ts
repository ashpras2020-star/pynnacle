// Live Quiz Store — manages Kahoot-style quiz games with polling fallback
// Uses getDoc polling instead of onSnapshot to avoid ad-blocker issues

import { create } from 'zustand';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@config/firebase';
import { liveQuizService } from '@services/liveQuizService';
import type { LiveQuiz } from '@types/liveQuiz';

interface LiveQuizState {
  currentGame: LiveQuiz | null;
  isLoading: boolean;

  // Host actions
  createGame: (params: {
    maxModule: number;
    questionCount: number;
    timePerQuestion: number;
    friendIds: string[];
  }) => Promise<string>;
  startGame: () => Promise<void>;
  scoreCurrentQuestion: () => Promise<void>;
  advanceQuestion: () => Promise<boolean>;

  // Player actions
  joinGame: (gameId: string) => Promise<void>;
  leaveGame: () => Promise<void>;
  toggleReady: (ready: boolean) => Promise<void>;
  submitAnswer: (answerIndex: number, timeToAnswer: number) => Promise<void>;
  readyForNext: () => Promise<void>;

  // Listener
  startGameListener: (gameId: string) => void;
  stopGameListener: () => void;
  fetchGame: (gameId: string) => Promise<void>;
}

let unsubGame: (() => void) | null = null;
let pollInterval: ReturnType<typeof setInterval> | null = null;
let activeGameId: string | null = null;

export const useLiveQuizStore = create<LiveQuizState>()((set, get) => ({
  currentGame: null,
  isLoading: false,

  createGame: async (params) => {
    const { useUserStore } = await import('@store/useUserStore');
    const user = useUserStore.getState().user;
    if (!user?.uid) throw new Error('Not signed in');

    set({ isLoading: true });
    try {
      const gameId = await liveQuizService.createGame({
        hostId: user.uid,
        hostName: user.name || 'Host',
        hostPhoto: user.picture || null,
        maxModule: params.maxModule,
        questionCount: params.questionCount,
        timePerQuestion: params.timePerQuestion,
      });

      // Invite friends
      if (params.friendIds.length > 0) {
        await liveQuizService.inviteFriends(
          gameId,
          user.name || 'Host',
          params.maxModule,
          params.friendIds
        );
      }

      // Start listening to game updates
      get().startGameListener(gameId);

      return gameId;
    } finally {
      set({ isLoading: false });
    }
  },

  startGame: async () => {
    const game = get().currentGame;
    if (!game) throw new Error('No active game');
    await liveQuizService.startGame(game.id);
    // Immediately fetch updated state
    await get().fetchGame(game.id);
  },

  scoreCurrentQuestion: async () => {
    const game = get().currentGame;
    if (!game) throw new Error('No active game');
    await liveQuizService.scoreCurrentQuestion(game.id);
    await get().fetchGame(game.id);
  },

  advanceQuestion: async () => {
    const game = get().currentGame;
    if (!game) throw new Error('No active game');
    const result = await liveQuizService.advanceQuestion(game.id);
    await get().fetchGame(game.id);
    return result;
  },

  joinGame: async (gameId: string) => {
    const { useUserStore } = await import('@store/useUserStore');
    const user = useUserStore.getState().user;
    if (!user?.uid) throw new Error('Not signed in');

    await liveQuizService.joinGame(
      gameId,
      user.uid,
      user.name || 'Player',
      user.picture || null
    );

    // Start listening
    get().startGameListener(gameId);
  },

  leaveGame: async () => {
    const { useUserStore } = await import('@store/useUserStore');
    const user = useUserStore.getState().user;
    const game = get().currentGame;
    if (!user?.uid || !game) return;

    await liveQuizService.leaveGame(game.id, user.uid);
    get().stopGameListener();
  },

  toggleReady: async (ready: boolean) => {
    const { useUserStore } = await import('@store/useUserStore');
    const user = useUserStore.getState().user;
    const game = get().currentGame;
    if (!user?.uid || !game) return;

    await liveQuizService.toggleReady(game.id, user.uid, ready);
    // Immediately fetch updated state
    await get().fetchGame(game.id);
  },

  submitAnswer: async (answerIndex: number, timeToAnswer: number) => {
    const { useUserStore } = await import('@store/useUserStore');
    const user = useUserStore.getState().user;
    const game = get().currentGame;
    if (!user?.uid || !game) return;

    await liveQuizService.submitAnswer(game.id, user.uid, answerIndex, timeToAnswer);
    // Immediately fetch updated state
    await get().fetchGame(game.id);
  },

  readyForNext: async () => {
    const { useUserStore } = await import('@store/useUserStore');
    const user = useUserStore.getState().user;
    const game = get().currentGame;
    if (!user?.uid || !game) return;

    await liveQuizService.readyForNext(game.id, user.uid);
    await get().fetchGame(game.id);
  },

  fetchGame: async (gameId: string) => {
    try {
      const gameRef = doc(db, 'liveQuizzes', gameId);
      const snap = await getDoc(gameRef);
      if (!snap.exists()) {
        set({ currentGame: null });
        return;
      }
      set({
        currentGame: {
          id: snap.id,
          ...snap.data(),
        } as LiveQuiz,
      });
    } catch (error) {
      console.warn('Failed to fetch game:', error);
    }
  },

  startGameListener: (gameId: string) => {
    get().stopGameListener();
    activeGameId = gameId;

    // Immediately fetch the game doc
    get().fetchGame(gameId);

    // Try onSnapshot first (works if no ad blocker)
    try {
      const gameRef = doc(db, 'liveQuizzes', gameId);
      unsubGame = onSnapshot(gameRef, (snap) => {
        if (activeGameId !== gameId) return;
        if (!snap.exists()) {
          set({ currentGame: null });
          return;
        }
        set({
          currentGame: {
            id: snap.id,
            ...snap.data(),
          } as LiveQuiz,
        });
      }, (error) => {
        console.warn('Quiz listener blocked, using polling:', error);
      });
    } catch {
      // onSnapshot failed entirely
    }

    // Also poll every 2 seconds as fallback (handles ad blockers)
    pollInterval = setInterval(() => {
      if (activeGameId === gameId) {
        get().fetchGame(gameId);
      }
    }, 2000);
  },

  stopGameListener: () => {
    unsubGame?.();
    unsubGame = null;
    activeGameId = null;
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
    set({ currentGame: null });
  },
}));
