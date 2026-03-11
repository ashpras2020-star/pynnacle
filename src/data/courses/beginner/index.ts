// Beginner Course - All Lessons
// Export all lessons from all modules

import { module1Lessons } from './module1-basics';
import { module2Lessons } from './module2-control-flow';
import { module3Lessons } from './module3-collections';
import { module4Lessons } from './module4-functions';
import { module5Lessons } from './module5-strings';
import { module6Lessons } from './module6-numbers';
import { module7Lessons } from './module7-boolean-logic';
import { module8Lessons } from './module8-file-io';
import { module9Lessons } from './module9-error-handling';
import { module10Lessons } from './module10-list-comprehensions';
import type { Lesson } from '@types';

// Combine all module lessons in learning order (50 total lessons)
// 1. Basics → 2. Numbers → 3. Strings → 4. Booleans → 5. Control Flow
// → 6. Collections → 7. Functions → 8. List Comprehensions → 9. Error Handling → 10. File I/O
export const beginnerLessons: Lesson[] = [
  ...module1Lessons,
  ...module6Lessons,
  ...module5Lessons,
  ...module7Lessons,
  ...module2Lessons,
  ...module3Lessons,
  ...module4Lessons,
  ...module10Lessons,
  ...module9Lessons,
  ...module8Lessons,
];

// Helper function to get a lesson by ID
export function getLessonById(lessonId: string): Lesson | undefined {
  return beginnerLessons.find(lesson => lesson.id === lessonId);
}

// Helper function to get all lessons for a module
export function getLessonsByModule(moduleId: string): Lesson[] {
  return beginnerLessons.filter(lesson => lesson.moduleId === moduleId);
}

// Export individual modules for direct access
export {
  module1Lessons,
  module2Lessons,
  module3Lessons,
  module4Lessons,
  module5Lessons,
  module6Lessons,
  module7Lessons,
  module8Lessons,
  module9Lessons,
  module10Lessons,
};
