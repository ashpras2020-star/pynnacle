// Question pool randomization utilities
// Prevents answer memorization by selecting random subsets and shuffling options

import type { QuizQuestion } from '@data/gameConfigs/quizQuestions';
import type { AssessmentQuestion } from '@types';

/** Fisher-Yates shuffle — returns a new shuffled copy */
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Select `count` random quiz questions from pool, shuffle option order.
 * If pool has fewer than `count`, returns all (shuffled).
 */
export function selectQuizQuestions(pool: QuizQuestion[], count: number): QuizQuestion[] {
  const selected = shuffleArray(pool).slice(0, count);

  return selected.map((q) => {
    const correctOption = q.options[q.correctIndex];
    const shuffledOptions = shuffleArray(q.options);
    return {
      ...q,
      options: shuffledOptions,
      correctIndex: shuffledOptions.indexOf(correctOption),
    };
  });
}

/**
 * Select `count` random assessment questions from pool, shuffle option order.
 * If pool has fewer than `count`, returns all (shuffled).
 */
export function selectAssessmentQuestions(
  pool: AssessmentQuestion[],
  count: number,
): AssessmentQuestion[] {
  const selected = shuffleArray(pool).slice(0, count);

  return selected.map((q, idx) => {
    if (!q.options || q.options.length === 0) return { ...q, id: `q${idx + 1}` };

    const correctOption = q.options[q.correctAnswer as number];
    const shuffledOptions = shuffleArray(q.options);
    return {
      ...q,
      id: `q${idx + 1}`,
      options: shuffledOptions,
      correctAnswer: shuffledOptions.indexOf(correctOption),
    };
  });
}
