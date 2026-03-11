// Lesson, Module, and Course type definitions

export interface CodeExample {
  code: string;
  explanation: string;
  runnable?: boolean;  // Optional - whether code can be run
  title?: string;  // Optional title for code examples
}

export interface ValidationTest {
  input?: string;
  expectedOutput?: string;
  description?: string;
  hidden?: boolean;  // Don't show test to user
  code?: string;  // Alternative: code to validate
  testLogic?: (code: string, output: string) => boolean;  // Custom validation function
}

export interface GameConfig {
  // For Platformer
  levelId?: string;
  apiCommands?: string[];  // e.g., ['move_forward', 'jump']
  successCondition?: string;

  // For Quiz
  questionCount?: number;
  timePerQuestion?: number;
  questionsFrom?: string;  // Question bank ID
}

export interface LessonChallenge {
  prompt: string;                    // Problem description
  starterCode?: string;              // Optional starter code
  solution?: string;                 // Example solution (for reference)
  tests: ValidationTest[];           // Validation tests
  explanation: string;               // Explanation shown on failure
  hints?: string[];                  // Optional hints
  xpReward: number;                  // XP awarded (typically 150)
}

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  order?: number;
  title: string;
  description?: string;

  // Content
  content: {
    explanation: string;          // Markdown supported
    codeExamples: CodeExample[];
    concepts: string[];            // Tags
  };

  // Practice
  starterCode: string;
  validationTests: ValidationTest[];
  hints: string[];

  // End-of-lesson challenge
  challenge?: LessonChallenge;

  // Gamification (Beginner only)
  xpReward: number;
  activityType?: 'game' | 'task' | 'project';  // Beginner=game, Intermediate=task, Expert=project
  gameType?: 'platformer' | 'quiz' | 'debug' | 'listchef' | 'guardgate' | 'mathquest';  // Only for beginner course
  gameConfig?: GameConfig;

  // Metadata
  estimatedMinutes?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Module {
  id: string;
  courseId: string;
  order: number;
  title: string;
  description: string;
  lessons: Lesson[];
  assessmentId?: string;  // Link to assessment
}

export interface Course {
  id: 'beginner' | 'intermediate' | 'expert';
  title: string;
  description: string;
  modules: Module[];
  unlocked: boolean;
  prerequisite?: string;  // Course ID that must be completed first
}

export interface ExecutionResult {
  output: string;
  error?: string;
  executionTime: number;
}

export interface ValidationResult {
  allPassed: boolean;
  results: {
    test: ValidationTest;
    passed: boolean;
    actualOutput: string;
  }[];
}
