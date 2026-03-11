// Assessment and remediation types

export type QuestionType = 'multiple-choice' | 'code-completion' | 'debugging' | 'true-false';

export interface AssessmentQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];  // For multiple choice
  correctAnswer: string | number;
  codeTemplate?: string;  // For code questions
  expectedOutput?: string;  // For code questions
  explanation: string;
  points: number;
  concepts: string[];  // Which concepts this tests
}

export interface Assessment {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  totalPoints: number;
  passingScore: number;  // Percentage
  timeLimit?: number;  // Minutes (optional)
}

export interface AssessmentAttempt {
  id?: number;
  assessmentId: string;
  attemptedAt: Date;
  completedAt?: Date;
  answers: Record<string, string | number>;  // questionId -> answer
  score: number;
  passed: boolean;
  weakConcepts: string[];
  recommendedLessons: string[];
}

export interface RemediationSuggestion {
  concept: string;
  lessonIds: string[];
  explanation: string;
}
