// Export all beginner course assessments

import { module1Assessment } from './module1-assessment';
import { module5Assessment } from './module2-assessment';
import { module6Assessment } from './module3-assessment';
import { module7Assessment } from './module4-assessment';
import { module3Assessment } from './module5-assessment';
import { module2Assessment } from './module6-assessment';
import { module4Assessment } from './module7-assessment';
import { module10Assessment } from './module8-assessment';
import { module9Assessment } from './module9-assessment';
import { module8Assessment } from './module10-assessment';
import type { Assessment } from '@types';

// Array of all beginner assessments
export const beginnerAssessments: Assessment[] = [
  module1Assessment,
  module2Assessment,
  module3Assessment,
  module4Assessment,
  module5Assessment,
  module6Assessment,
  module7Assessment,
  module8Assessment,
  module9Assessment,
  module10Assessment,
];

// Get assessment by module ID
export function getAssessmentByModule(moduleId: string): Assessment | undefined {
  return beginnerAssessments.find(assessment => assessment.moduleId === moduleId);
}

// Get assessment by ID
export function getAssessmentById(assessmentId: string): Assessment | undefined {
  return beginnerAssessments.find(assessment => assessment.id === assessmentId);
}

// Export individual assessments
export {
  module1Assessment,
  module2Assessment,
  module3Assessment,
  module4Assessment,
  module5Assessment,
  module6Assessment,
  module7Assessment,
  module8Assessment,
  module9Assessment,
  module10Assessment,
};
