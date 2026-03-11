// Lesson Store - Manages current lesson state during learning

import { create } from 'zustand';
import type { Lesson } from '@types';

interface LessonState {
  currentLesson: Lesson | null;
  currentCode: string;
  isValidated: boolean;
  validationResults: ValidationResult | null;

  // Actions
  setCurrentLesson: (lesson: Lesson) => void;
  setCurrentCode: (code: string) => void;
  setValidated: (isValid: boolean) => void;
  setValidationResults: (results: ValidationResult | null) => void;
  resetLesson: () => void;
}

interface ValidationResult {
  passed: boolean;
  testsRun: number;
  testsPassed: number;
  errors: string[];
}

export const useLessonStore = create<LessonState>((set) => ({
  currentLesson: null,
  currentCode: '',
  isValidated: false,
  validationResults: null,

  setCurrentLesson: (lesson) =>
    set({
      currentLesson: lesson,
      currentCode: lesson.starterCode,
      isValidated: false,
      validationResults: null,
    }),

  setCurrentCode: (code) =>
    set({
      currentCode: code,
    }),

  setValidated: (isValid) =>
    set({
      isValidated: isValid,
    }),

  setValidationResults: (results) =>
    set({
      validationResults: results,
      isValidated: results?.passed ?? false,
    }),

  resetLesson: () =>
    set({
      currentLesson: null,
      currentCode: '',
      isValidated: false,
      validationResults: null,
    }),
}));
