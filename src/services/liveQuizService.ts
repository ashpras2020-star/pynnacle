// Live Quiz Service — Kahoot-style multiplayer quiz games

import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@config/firebase';
import { quizQuestionsByLesson } from '@data/gameConfigs/quizQuestions';
import type { QuizQuestion } from '@data/gameConfigs/quizQuestions';
import type { QuizAnswer, QuizScore } from '@types/liveQuiz';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class LiveQuizService {
  /**
   * Gather questions from modules 1 through maxModule
   */
  getQuestionsForModules(maxModule: number, count: number): QuizQuestion[] {
    const allQuestions: QuizQuestion[] = [];
    for (let m = 1; m <= maxModule; m++) {
      for (let l = 1; l <= 5; l++) {
        const lessonId = `lesson-${m}-${l}`;
        const questions = quizQuestionsByLesson[lessonId];
        if (questions) {
          allQuestions.push(...questions);
        }
      }
    }
    return shuffle(allQuestions).slice(0, count);
  }

  /**
   * Create a new game lobby
   */
  async createGame(params: {
    hostId: string;
    hostName: string;
    hostPhoto: string | null;
    maxModule: number;
    questionCount: number;
    timePerQuestion: number;
  }): Promise<string> {
    const questions = this.getQuestionsForModules(params.maxModule, params.questionCount);
    if (questions.length === 0) throw new Error('No questions available for selected modules');

    const gameData = {
      hostId: params.hostId,
      hostName: params.hostName,
      hostPhoto: params.hostPhoto,
      status: 'lobby',
      maxModule: params.maxModule,
      questionCount: questions.length,
      timePerQuestion: params.timePerQuestion,
      questions,
      participants: {
        [params.hostId]: {
          displayName: params.hostName,
          photoURL: params.hostPhoto,
          ready: true,
        },
      },
      currentQuestionIndex: -1,
      questionStartedAt: null,
      answers: {},
      readyForNext: {},
      scores: {
        [params.hostId]: { total: 0, correct: 0 },
      },
      winner: null,
      createdAt: serverTimestamp(),
      completedAt: null,
    };

    const ref = await addDoc(collection(db, 'liveQuizzes'), gameData);
    return ref.id;
  }

  /**
   * Send invites to friends
   */
  async inviteFriends(
    gameId: string,
    hostName: string,
    maxModule: number,
    friendIds: string[]
  ): Promise<void> {
    for (const fid of friendIds) {
      const inviteRef = doc(db, 'liveQuizzes', gameId, 'invites', fid);
      await setDoc(inviteRef, {
        hostName,
        maxModule,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
    }
  }

  /**
   * Join a game
   */
  async joinGame(
    gameId: string,
    userId: string,
    displayName: string,
    photoURL: string | null
  ): Promise<void> {
    const gameRef = doc(db, 'liveQuizzes', gameId);
    await updateDoc(gameRef, {
      [`participants.${userId}`]: {
        displayName,
        photoURL,
        ready: false,
      },
      [`scores.${userId}`]: { total: 0, correct: 0 },
    });
  }

  /**
   * Leave a game
   */
  async leaveGame(gameId: string, userId: string): Promise<void> {
    const gameRef = doc(db, 'liveQuizzes', gameId);
    const snap = await getDoc(gameRef);
    if (!snap.exists()) return;

    const data = snap.data();
    const participants = { ...data.participants };
    delete participants[userId];
    const scores = { ...data.scores };
    delete scores[userId];

    await updateDoc(gameRef, { participants, scores });
  }

  /**
   * Toggle ready status
   */
  async toggleReady(gameId: string, userId: string, ready: boolean): Promise<void> {
    const gameRef = doc(db, 'liveQuizzes', gameId);
    await updateDoc(gameRef, {
      [`participants.${userId}.ready`]: ready,
    });
  }

  /**
   * Start the game (host only)
   */
  async startGame(gameId: string): Promise<void> {
    const gameRef = doc(db, 'liveQuizzes', gameId);
    await updateDoc(gameRef, {
      status: 'playing',
      currentQuestionIndex: 0,
      questionStartedAt: serverTimestamp(),
      answers: {},
      readyForNext: {},
    });
  }

  /**
   * Submit an answer
   */
  async submitAnswer(
    gameId: string,
    userId: string,
    answerIndex: number,
    timeToAnswer: number
  ): Promise<void> {
    const gameRef = doc(db, 'liveQuizzes', gameId);
    await updateDoc(gameRef, {
      [`answers.${userId}`]: {
        answerIndex,
        submittedAt: Date.now(),
        timeToAnswer,
      },
    });
  }

  /**
   * Calculate and write scores for the current question (host only).
   * Called immediately when the question ends so players see updated scores.
   */
  async scoreCurrentQuestion(gameId: string): Promise<void> {
    const gameRef = doc(db, 'liveQuizzes', gameId);
    const snap = await getDoc(gameRef);
    if (!snap.exists()) return;

    const data = snap.data();
    const currentIdx = data.currentQuestionIndex;
    const question = data.questions[currentIdx];
    const answers: Record<string, QuizAnswer> = data.answers || {};
    const scores: Record<string, QuizScore> = { ...data.scores };
    const timeLimit = data.timePerQuestion * 1000;

    for (const [userId, answer] of Object.entries(answers)) {
      const correct = answer.answerIndex === question.correctIndex;
      if (!scores[userId]) scores[userId] = { total: 0, correct: 0 };
      if (correct) {
        const timeBonus = Math.floor(500 * Math.max(0, (timeLimit - answer.timeToAnswer) / timeLimit));
        scores[userId].total += 1000 + timeBonus;
        scores[userId].correct += 1;
      }
    }

    await updateDoc(gameRef, { scores });
  }

  /**
   * Advance to next question or complete game (host only).
   * Scores should already be calculated via scoreCurrentQuestion.
   * Returns true if game is completed.
   */
  async advanceQuestion(gameId: string): Promise<boolean> {
    const gameRef = doc(db, 'liveQuizzes', gameId);
    const snap = await getDoc(gameRef);
    if (!snap.exists()) return true;

    const data = snap.data();
    const nextIdx = data.currentQuestionIndex + 1;
    const isLastQuestion = nextIdx >= data.questions.length;

    if (isLastQuestion) {
      const scores: Record<string, QuizScore> = data.scores || {};
      let winnerId: string | null = null;
      let maxScore = -1;
      for (const [uid, score] of Object.entries(scores)) {
        if (score.total > maxScore) {
          maxScore = score.total;
          winnerId = uid;
        }
      }

      await updateDoc(gameRef, {
        status: 'completed',
        winner: winnerId,
        completedAt: serverTimestamp(),
        answers: {},
        readyForNext: {},
      });
      return true;
    }

    await updateDoc(gameRef, {
      currentQuestionIndex: nextIdx,
      questionStartedAt: serverTimestamp(),
      answers: {},
      readyForNext: {},
      status: 'playing',
    });
    return false;
  }

  /**
   * Mark a player as ready for the next question
   */
  async readyForNext(gameId: string, userId: string): Promise<void> {
    const gameRef = doc(db, 'liveQuizzes', gameId);
    await updateDoc(gameRef, {
      [`readyForNext.${userId}`]: true,
    });
  }

  /**
   * Get pending invites for a user
   */
  async getInvites(userId: string): Promise<{ gameId: string; hostName: string; maxModule: number }[]> {
    // Query all liveQuizzes where this user has a pending invite
    const gamesSnap = await getDocs(collection(db, 'liveQuizzes'));
    const invites: { gameId: string; hostName: string; maxModule: number }[] = [];

    for (const gameDoc of gamesSnap.docs) {
      if (gameDoc.data().status !== 'lobby') continue;
      const inviteRef = doc(db, 'liveQuizzes', gameDoc.id, 'invites', userId);
      const inviteSnap = await getDoc(inviteRef);
      if (inviteSnap.exists() && inviteSnap.data().status === 'pending') {
        invites.push({
          gameId: gameDoc.id,
          hostName: inviteSnap.data().hostName,
          maxModule: inviteSnap.data().maxModule,
        });
      }
    }
    return invites;
  }

  /**
   * Accept an invite
   */
  async acceptInvite(gameId: string, userId: string): Promise<void> {
    const inviteRef = doc(db, 'liveQuizzes', gameId, 'invites', userId);
    await updateDoc(inviteRef, { status: 'accepted' });
  }

  /**
   * Decline an invite
   */
  async declineInvite(gameId: string, userId: string): Promise<void> {
    const inviteRef = doc(db, 'liveQuizzes', gameId, 'invites', userId);
    await updateDoc(inviteRef, { status: 'declined' });
  }
}

export const liveQuizService = new LiveQuizService();
