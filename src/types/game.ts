// Game-related type definitions

export interface PlatformerLevel {
  id: string;
  title: string;
  description: string;
  map: string[];  // ASCII map or level data
  startPosition: { x: number; y: number };
  goalPosition: { x: number; y: number };
  coins: { x: number; y: number }[];
  obstacles: { x: number; y: number; type: string }[];
  requiredCommands: string[];  // Commands student must use
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;  // Index of correct option
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  concepts: string[];  // Tags
}

export interface GameScore {
  score: number;
  timeElapsed: number;
  perfect: boolean;  // All coins collected / all questions correct
  bonusXP: number;
}

export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  lives: number;
  level: number;
}

// Debug Detective Game
export interface DebugChallenge {
  id: string;
  title: string;
  code: string; // Broken code with bugs
  bugLines: number[]; // Line numbers with bugs (1-indexed to match display)
  bugDescriptions: string[]; // What's wrong with each bug line
  fixes: string[]; // How to fix each bug
  correctCode: string; // Fixed code for reference
  explanation: string; // Overall explanation
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  concepts: string[]; // What concepts this tests
}

export interface DebugGame {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  challenges: DebugChallenge[];
  baseXP: number; // Base XP for completing
  bonusXP: number; // Bonus for perfect score
}

// List Chef Game
export interface ListChefRecipe {
  name: string;
  ingredients: string[]; // Array of emoji ingredients
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ListChefGame {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  recipes: ListChefRecipe[];
  timeLimit: number; // Seconds
  goalPoints: number; // Points needed to win
  baseXP: number;
  bonusXP: number;
}

// Guard Gate Game
export interface GuardGateValue {
  display: string;       // What's shown to the player (e.g., "7")
  numericValue: number;  // The actual numeric value for evaluation
  correctGate: 'A' | 'B'; // Which gate this value should go to
}

export interface GuardGateRound {
  id: string;
  title: string;
  description: string;   // The sorting rule (e.g., "Send even numbers to Gate A")
  hint: string;           // Hint for writing the condition
  values: GuardGateValue[];
  exampleAnswer?: string; // Optional example answer shown after failing
  difficulty: 'easy' | 'medium' | 'hard';
  concepts: string[];
}

export interface GuardGateGame {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  rounds: GuardGateRound[];
  baseXP: number;
  bonusXP: number;
}

// Math Quest Game
export interface MathQuestFloorChallenge {
  id: number;
  floorName: string;
  description: string;
  targetValue: number;
  hint: string;
  requiredConcepts: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  forbiddenLiterals?: number[];
}

export interface MathQuestFloor {
  challenge: MathQuestFloorChallenge;
  flavorText: string;
  emoji: string;
}

export interface MathQuestGame {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  floors: MathQuestFloor[];
  pointsPerFloor: number;
  timeBonusMax: number;
  timeLimitSeconds: number;
  comboMultipliers: number[];
  startingLives: number;
  hintPenalty: number;
  baseXP: number;
  bonusXP: number;
}

// Cipher Cracker Game
export interface CipherCrackerMission {
  id: number;
  codeName: string;
  briefing: string;
  encodedMessage: string;
  expectedOutput: string;
  hint: string;
  variableName: string;
  extraVariables?: Record<string, any>;
  difficulty: 'easy' | 'medium' | 'hard';
  concepts: string[];
}

export interface CipherCrackerGame {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  missions: CipherCrackerMission[];
  pointsPerMission: number;
  timeBonusMax: number;
  timeLimitSeconds: number;
  comboMultipliers: number[];
  startingLives: number;
  hintPenalty: number;
  baseXP: number;
  bonusXP: number;
}

// Robot Commander Game
export interface RobotCommanderTestCase {
  call: string;
  args: any[];
  expected: any;
  expectedDisplay: string;
}

export interface RobotCommanderModule {
  id: number;
  partName: string;
  partEmoji: string;
  description: string;
  functionName: string;
  params: string;
  difficulty: 'easy' | 'medium' | 'hard';
  concepts: string[];
  testCases: RobotCommanderTestCase[];
  hint: string;
  starterCode: string;
  exampleAnswer: string;
  specs: string[];
}

export interface RobotCommanderGame {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  modules: RobotCommanderModule[];
  pointsPerModule: number;
  timeBonusMax: number;
  timeLimitSeconds: number;
  comboMultipliers: number[];
  startingLives: number;
  hintPenalty: number;
  baseXP: number;
  bonusXP: number;
}

// Boolean Bouncer Game
export interface BooleanBouncerGuest {
  name: string;
  age: number;
  vip: boolean;
  dress?: string;
}

export interface BooleanBouncerRound {
  id: number;
  title: string;
  rule: string;
  guests: BooleanBouncerGuest[];
  expectedResults: boolean[];
  hint: string;
  exampleAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  concepts: string[];
}

export interface BooleanBouncerGame {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  rounds: BooleanBouncerRound[];
  pointsPerRound: number;
  timeBonusMax: number;
  timeLimitSeconds: number;
  comboMultipliers: number[];
  startingLives: number;
  hintPenalty: number;
  baseXP: number;
  bonusXP: number;
}

// Conveyor Crafter Game
export interface ConveyorCrafterStation {
  id: number;
  name: string;
  emoji: string;
  difficulty: 'easy' | 'medium' | 'hard';
  inputItems: any[];
  expectedOutput: any[];
  inputVariableName: string;
  expressionOptions: string[];
  correctExpression: string;
  filterOptions: string[] | null;
  correctFilter: string | null;
  variableOptions?: string[];
  iterableOptions?: string[];
  hint: string;
}

export interface ConveyorCrafterGame {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  stations: ConveyorCrafterStation[];
  baseXP: number;
  bonusXP: number;
  maxStarsPerStation: number;
}

// Code Rescue Game
export interface CodeRescueLine {
  id: number;
  content: string;       // The code text (empty string for slots)
  indentLevel: number;   // Base indent (0, 1, 2...)
  isSlot: boolean;       // If true, this is an empty insertion slot
  correctBlock?: string; // Block ID that should go here (for slots)
}

export interface RescueBlock {
  id: string;
  label: string;         // e.g. "try:", "except ValueError:"
  color: string;         // Tailwind color key: "red", "amber", "emerald", "blue"
}

export interface CodeRescueMission {
  id: number;
  name: string;
  briefing: string;
  difficulty: 'easy' | 'medium' | 'hard';
  codeLines: CodeRescueLine[];
  availableBlocks: RescueBlock[];
}

export interface CodeRescueGame {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  missions: CodeRescueMission[];
  goalStars: number;
  baseXP: number;
  bonusXP: number;
}

// ── File Sorter (Module 10: File I/O) ──

export interface FileSorterOption {
  id: string;
  label: string;
}

export interface FileSorterCard {
  id: number;
  prompt: string;
  difficulty: 'easy' | 'medium' | 'hard';
  options: FileSorterOption[];
  correctOptionId: string;
}

export interface FileSorterGame {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  cards: FileSorterCard[];
  baseXP: number;
  bonusXP: number;
}
