// Module 6 Assessment: Working with Numbers & Math
// Tests: advanced math, math module, random, type conversion, number formatting

import type { Assessment } from '@types';

export const module2Assessment: Assessment = {
  id: 'assessment-module-2',
  moduleId: 'module-2',
  courseId: 'beginner',
  title: 'Module 6 Assessment: Working with Numbers & Math',
  description: 'Test your knowledge of Python number operations, math functions, and number formatting.',
  totalPoints: 100,
  passingScore: 80,
  timeLimit: 25,
  questions: [
    // Question 1 - Division types output
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What are the values?\n\na = 17 / 5\nb = 17 // 5\nprint(a, b)',
      options: [
        '3.4 3',
        '3 3.4',
        '3.4 3.0',
        '3 3'
      ],
      correctAnswer: 0,
      explanation: '/ gives float division (3.4), // gives integer division (3)',
      points: 5,
      concepts: ['division', 'integer division', 'operators']
    },

    // Question 2 - Modulus application
    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'What prints?\n\nfor i in range(10, 15):\n    if i % 3 == 0:\n        print(i)',
      options: [
        '10 11 12 13 14',
        '12',
        '9 12',
        '12 15'
      ],
      correctAnswer: 1,
      explanation: 'Only 12 is divisible by 3 in range 10-14',
      points: 5,
      concepts: ['modulus', 'divisibility', 'filtering']
    },

    // Question 3 - Exponentiation output
    {
      id: 'q3',
      type: 'multiple-choice',
      question: 'What is the result?\n\nresult = 2 ** 3 ** 2\nprint(result)',
      options: [
        '64',
        '512',
        '36',
        '256'
      ],
      correctAnswer: 1,
      explanation: 'Exponentiation is right-associative: 2**(3**2) = 2**9 = 512',
      points: 5,
      concepts: ['exponentiation', 'operator precedence', 'associativity']
    },

    // Question 4 - Abs with negative
    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'What prints?\n\nx = -10\ny = 5\nprint(abs(x - y))',
      options: [
        '-15',
        '15',
        '-5',
        '5'
      ],
      correctAnswer: 1,
      explanation: 'x - y = -15, abs(-15) = 15',
      points: 5,
      concepts: ['abs', 'subtraction', 'absolute value']
    },

    // Question 5 - Round behavior
    {
      id: 'q5',
      type: 'multiple-choice',
      question: 'What are the results?\n\nprint(round(2.5), round(3.5))',
      options: [
        '2 3',
        '3 4',
        '2 4',
        '3 3'
      ],
      correctAnswer: 2,
      explanation: 'Python uses banker\'s rounding (rounds to nearest even): 2.5→2, 3.5→4',
      points: 5,
      concepts: ['round', 'rounding rules', 'edge cases']
    },

    // Question 6 - Math.ceil and floor
    {
      id: 'q6',
      type: 'multiple-choice',
      question: 'What prints?\n\nimport math\nprint(math.ceil(3.1), math.floor(3.9))',
      options: [
        '3 3',
        '4 4',
        '4 3',
        '3 4'
      ],
      correctAnswer: 2,
      explanation: 'ceil rounds UP (4), floor rounds DOWN (3)',
      points: 5,
      concepts: ['ceil', 'floor', 'math module']
    },

    // Question 7 - Math.sqrt output
    {
      id: 'q7',
      type: 'multiple-choice',
      question: 'What is the result?\n\nimport math\nresult = math.sqrt(16) + math.sqrt(9)\nprint(result)',
      options: [
        '5.0',
        '7.0',
        '25',
        '5'
      ],
      correctAnswer: 1,
      explanation: 'sqrt(16)=4.0, sqrt(9)=3.0, total=7.0',
      points: 5,
      concepts: ['sqrt', 'math module', 'addition']
    },

    // Question 8 - Power function equivalence
    {
      id: 'q8',
      type: 'multiple-choice',
      question: 'Which expressions give the same result?\n\n1) 5 ** 3\n2) pow(5, 3)\n3) math.pow(5, 3)',
      options: [
        'Only 1 and 2',
        'Only 1 and 3',
        'All three',
        'None match'
      ],
      correctAnswer: 2,
      explanation: 'All calculate 5³ = 125 (though math.pow returns float)',
      points: 5,
      concepts: ['exponentiation', 'pow', 'equivalence']
    },

    // Question 9 - Random.randint bounds
    {
      id: 'q9',
      type: 'multiple-choice',
      question: 'Which values CAN random.randint(5, 8) produce?',
      options: [
        '5, 6, 7',
        '5, 6, 7, 8',
        '6, 7, 8',
        '5, 6, 7, 8, 9'
      ],
      correctAnswer: 1,
      explanation: 'randint is inclusive on both ends: 5, 6, 7, or 8',
      points: 5,
      concepts: ['random', 'randint', 'inclusive range']
    },

    // Question 10 - Type conversion truncation
    {
      id: 'q10',
      type: 'multiple-choice',
      question: 'What prints?\n\nvalues = [int(7.9), int(-7.9)]\nprint(values)',
      options: [
        '[7, -7]',
        '[8, -8]',
        '[7, -8]',
        '[8, -7]'
      ],
      correctAnswer: 0,
      explanation: 'int() truncates towards zero: 7.9→7, -7.9→-7',
      points: 5,
      concepts: ['int', 'truncation', 'type conversion']
    },

    // Question 11 - Float precision issue
    {
      id: 'q11',
      type: 'multiple-choice',
      question: 'What prints?\n\nresult = 0.1 + 0.1 + 0.1\nprint(result == 0.3)',
      options: [
        'True',
        'False',
        'Error',
        'None'
      ],
      correctAnswer: 1,
      explanation: 'Floating point precision: 0.1+0.1+0.1 ≈ 0.30000000000000004',
      points: 5,
      concepts: ['float precision', 'equality', 'common pitfalls']
    },

    // Question 12 - Number formatting output
    {
      id: 'q12',
      type: 'multiple-choice',
      question: 'What prints?\n\npi = 3.14159\nprint(f"{pi:.3f}")',
      options: [
        '3.14159',
        '3.14',
        '3.141',
        '3.142'
      ],
      correctAnswer: 3,
      explanation: ':.3f formats to 3 decimal places with rounding: 3.142',
      points: 5,
      concepts: ['f-strings', 'formatting', 'rounding']
    },

    // Question 13 - Comma separator formatting
    {
      id: 'q13',
      type: 'multiple-choice',
      question: 'What is the output?\n\nvalue = 1234567\nprint(f"{value:,}")',
      options: [
        '1234567',
        '1,234,567',
        '1.234.567',
        '123,4567'
      ],
      correctAnswer: 1,
      explanation: ':, adds thousand separators',
      points: 5,
      concepts: ['formatting', 'comma separator', 'readability']
    },

    // Question 14 - Percentage formatting
    {
      id: 'q14',
      type: 'multiple-choice',
      question: 'What prints?\n\nratio = 0.875\nprint(f"{ratio:.1%}")',
      options: [
        '0.875',
        '0.9',
        '87.5%',
        '88%'
      ],
      correctAnswer: 2,
      explanation: ':.1% converts to percentage with 1 decimal: 87.5%',
      points: 5,
      concepts: ['percentage formatting', 'f-strings', 'conversion']
    },

    // Question 15 - Min/max with multiple args
    {
      id: 'q15',
      type: 'multiple-choice',
      question: 'What prints?\n\nprint(min(5, 2, 9, 1, 7))',
      options: [
        '5',
        '2',
        '1',
        '9'
      ],
      correctAnswer: 2,
      explanation: 'min() returns smallest value: 1',
      points: 5,
      concepts: ['min', 'multiple arguments', 'comparison']
    },

    // Question 16 - Order of operations
    {
      id: 'q16',
      type: 'multiple-choice',
      question: 'What is the result?\n\nresult = 10 + 5 * 2 ** 2\nprint(result)',
      options: [
        '30',
        '80',
        '100',
        '90'
      ],
      correctAnswer: 0,
      explanation: 'Order: 2**2=4, 5*4=20, 10+20=30 (exponent, multiply, add)',
      points: 5,
      concepts: ['order of operations', 'PEMDAS', 'precedence']
    },

    // Question 17 - Negative modulus
    {
      id: 'q17',
      type: 'multiple-choice',
      question: 'What prints?\n\nprint(-17 % 5)',
      options: [
        '-2',
        '2',
        '3',
        '-3'
      ],
      correctAnswer: 2,
      explanation: 'Python modulus always returns non-negative: -17 % 5 = 3',
      points: 5,
      concepts: ['modulus', 'negative numbers', 'edge cases']
    },

    // Question 18 - Math.pi usage
    {
      id: 'q18',
      type: 'multiple-choice',
      question: 'What prints?\n\nimport math\narea = math.pi * (5 ** 2)\nprint(round(area))',
      options: [
        '78',
        '79',
        '80',
        '157'
      ],
      correctAnswer: 1,
      explanation: 'π * 25 ≈ 78.54, rounded = 79',
      points: 5,
      concepts: ['math.pi', 'area calculation', 'round']
    },

    // Question 19 - Type checking
    {
      id: 'q19',
      type: 'multiple-choice',
      question: 'What prints?\n\na = 5\nb = 5.0\nprint(type(a) == type(b))',
      options: [
        'True',
        'False',
        'Error',
        'None'
      ],
      correctAnswer: 1,
      explanation: 'a is int, b is float - different types',
      points: 5,
      concepts: ['type', 'int vs float', 'equality']
    },

    // Question 20 - Complex calculation
    {
      id: 'q20',
      type: 'multiple-choice',
      question: 'What is the final value?\n\nx = 100\nx = x // 3\nx = x * 2\nx = x % 50\nprint(x)',
      options: [
        '16',
        '32',
        '66',
        '33'
      ],
      correctAnswer: 0,
      explanation: '100//3=33, 33*2=66, 66%50=16',
      points: 5,
      concepts: ['multiple operations', 'step-by-step', 'reassignment']
    }
  ]
};
