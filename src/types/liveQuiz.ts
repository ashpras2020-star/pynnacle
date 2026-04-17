import type { Timestamp } from 'firebase/firestore';
import type { QuizQuestion } from '@data/gameConfigs/quizQuestions';

export type QuizStatus = 'lobby' | 'playing' | 'showing_scores' | 'completed';

export interface QuizParticipant {
  displayName: string;
  photoURL: string | null;
  ready: boolean;
}

export interface QuizAnswer {
  answerIndex: number;
  submittedAt: number; // timestamp ms
  timeToAnswer: number; // ms
}

export interface QuizScore {
  total: number;
  correct: number;
}

export interface LiveQuiz {
  id: string;
  hostId: string;
  hostName: string;
  hostPhoto: string | null;
  status: QuizStatus;
  maxModule: number;
  questionCount: number;
  timePerQuestion: number;
  questions: QuizQuestion[];
  participants: Record<string, QuizParticipant>;
  currentQuestionIndex: number;
  questionStartedAt: Timestamp | null;
  answers: Record<string, QuizAnswer>;
  readyForNext: Record<string, boolean>;
  scores: Record<string, QuizScore>;
  winner: string | null;
  createdAt: Timestamp;
  completedAt: Timestamp | null;
}

export interface QuizInvite {
  gameId: string;
  hostName: string;
  maxModule: number;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Timestamp;
}
