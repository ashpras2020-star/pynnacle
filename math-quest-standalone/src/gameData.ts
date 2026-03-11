// Math Quest: Wizard's Tower - Game Data
// Each floor is a challenge where the player must write a Python math expression

export interface FloorChallenge {
  id: number;
  floorName: string;
  description: string;
  targetValue: number;
  hint: string;
  requiredConcepts: string[]; // e.g., ['addition', 'multiplication']
  difficulty: 'easy' | 'medium' | 'hard';
  // Acceptable expressions (for validation — we check the result, not the expression)
  forbiddenLiterals?: number[]; // Can't just type the answer directly
}

export interface Floor {
  challenge: FloorChallenge;
  flavorText: string; // Wizard story text
  emoji: string;
}

export const FLOORS: Floor[] = [
  {
    challenge: {
      id: 1,
      floorName: 'The Entry Hall',
      description: 'The door demands a number. Write a Python expression that equals 42.',
      targetValue: 42,
      hint: 'Try multiplying two numbers, like 6 * 7',
      requiredConcepts: ['multiplication'],
      difficulty: 'easy',
      forbiddenLiterals: [42],
    },
    flavorText: 'You enter the ancient tower. Runes glow on the first door...',
    emoji: '🚪',
  },
  {
    challenge: {
      id: 2,
      floorName: 'The Potion Room',
      description: 'Mix a potion! Write an expression using + and * that equals 100.',
      targetValue: 100,
      hint: 'Try something like 10 * 10 or 25 * 4',
      requiredConcepts: ['addition', 'multiplication'],
      difficulty: 'easy',
      forbiddenLiterals: [100],
    },
    flavorText: 'Bubbling cauldrons line the walls. A recipe demands a precise measure...',
    emoji: '🧪',
  },
  {
    challenge: {
      id: 3,
      floorName: 'The Crystal Chamber',
      description: 'The crystal vibrates at frequency 256. Write an expression using ** (exponentiation) that equals 256.',
      targetValue: 256,
      hint: 'Think powers of 2: 2 ** 8',
      requiredConcepts: ['exponentiation'],
      difficulty: 'easy',
      forbiddenLiterals: [256],
    },
    flavorText: 'A massive crystal hovers in mid-air, humming with power...',
    emoji: '🔮',
  },
  {
    challenge: {
      id: 4,
      floorName: 'The Library',
      description: 'The ancient book opens at page 17. Write an expression using // (floor division) and % (modulo) that equals 17. Example: (a // b) + (c % d)',
      targetValue: 17,
      hint: 'Try 100 // 6 + 100 % 6 or 35 // 2',
      requiredConcepts: ['floor_division', 'modulo'],
      difficulty: 'medium',
      forbiddenLiterals: [17],
    },
    flavorText: 'Dusty tomes float between shelves. One book glows, waiting...',
    emoji: '📚',
  },
  {
    challenge: {
      id: 5,
      floorName: 'The Alchemy Lab',
      description: 'Write an expression that equals 3.14159 (pi to 5 decimal places). Use math operations, not the literal!',
      targetValue: 3.14159,
      hint: 'Try 355 / 113 (close!) or use round() with a division',
      requiredConcepts: ['division', 'precision'],
      difficulty: 'medium',
      forbiddenLiterals: [3.14159],
    },
    flavorText: 'Strange instruments measure cosmic constants...',
    emoji: '⚗️',
  },
  {
    challenge: {
      id: 6,
      floorName: 'The Rune Workshop',
      description: 'The rune needs exactly 729 power. Write an expression using ** that equals 729.',
      targetValue: 729,
      hint: 'What is 3 to the 6th power? Or 9 ** 3?',
      requiredConcepts: ['exponentiation'],
      difficulty: 'medium',
      forbiddenLiterals: [729],
    },
    flavorText: 'Glowing runes carved into stone await the right magical charge...',
    emoji: '🪄',
  },
  {
    challenge: {
      id: 7,
      floorName: 'The Treasure Vault',
      description: 'The vault lock requires the value 1000000. Write it using ** (no commas allowed in Python numbers, but you can use exponents!).',
      targetValue: 1000000,
      hint: 'Try 10 ** 6 or 1000 * 1000',
      requiredConcepts: ['exponentiation', 'multiplication'],
      difficulty: 'medium',
      forbiddenLiterals: [1000000],
    },
    flavorText: 'Gold gleams through the cracks of a sealed vault door...',
    emoji: '💰',
  },
  {
    challenge: {
      id: 8,
      floorName: 'The Star Observatory',
      description: 'The telescope needs calibration to -273.15 (absolute zero in Celsius). Write an expression that equals -273.15.',
      targetValue: -273.15,
      hint: 'Try -(200 + 73.15) or -27315 / 100',
      requiredConcepts: ['negative_numbers', 'division'],
      difficulty: 'medium',
      forbiddenLiterals: [-273.15, 273.15],
    },
    flavorText: 'The observatory dome opens to reveal infinite stars...',
    emoji: '🔭',
  },
  {
    challenge: {
      id: 9,
      floorName: 'The Dragon\'s Lair',
      description: 'The dragon demands tribute of exactly 1597 (a Fibonacci number). Use only +, -, *, and small numbers (under 50).',
      targetValue: 1597,
      hint: 'Try 40 * 40 - 3 or 33 * 48 + 13',
      requiredConcepts: ['arithmetic', 'problem_solving'],
      difficulty: 'hard',
      forbiddenLiterals: [1597],
    },
    flavorText: 'Heat blasts from the chamber ahead. A dragon\'s eye peers at you...',
    emoji: '🐉',
  },
  {
    challenge: {
      id: 10,
      floorName: 'The Wizard\'s Summit',
      description: 'The final spell requires the magic number 2025 (this year!). Combine at least 3 different operators (+, -, *, /, //, %, **).',
      targetValue: 2025,
      hint: 'Try 45 ** 2 or 5 ** 3 * 81 / 10 ... get creative!',
      requiredConcepts: ['mixed_operations'],
      difficulty: 'hard',
      forbiddenLiterals: [2025],
    },
    flavorText: 'You reach the summit! The sky swirls with arcane energy. One final spell...',
    emoji: '🏰',
  },
];

// Scoring
export const POINTS_PER_FLOOR = 100;
export const TIME_BONUS_MAX = 50; // Max bonus for fast answers
export const TIME_LIMIT_SECONDS = 60; // Seconds per floor before time bonus hits 0
export const COMBO_MULTIPLIERS = [1, 1.5, 2, 2.5, 3]; // Combo streak multipliers
export const STARTING_LIVES = 3;
export const HINT_PENALTY = 25; // Points lost for using a hint
