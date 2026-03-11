// Module 7 Assessment: Boolean Logic & Comparisons
// Tests: comparison operators, logical operators, truthiness, boolean expressions, best practices

import type { Assessment } from '@types';

export const module4Assessment: Assessment = {
  id: 'assessment-module-4',
  moduleId: 'module-4',
  courseId: 'beginner',
  title: 'Module 7 Assessment: Boolean Logic & Comparisons',
  description: 'Test your knowledge of Python boolean operations, comparisons, and logical thinking.',
  totalPoints: 100,
  passingScore: 80,
  timeLimit: 25,
  questions: [
    // Question 1 - Comparison chain
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What prints?\n\nx = 15\nprint(10 < x < 20)',
      options: [
        'True',
        'False',
        'Error',
        '15'
      ],
      correctAnswer: 0,
      explanation: 'Chained comparison: both 10 < 15 and 15 < 20 are True',
      points: 5,
      concepts: ['chained comparisons', 'boolean', 'range checking']
    },

    // Question 2 - Comparison precedence
    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'What is the result?\n\nresult = 5 > 3 > 1\nprint(result)',
      options: [
        'True',
        'False',
        'Error',
        'None'
      ],
      correctAnswer: 0,
      explanation: 'Chains as: (5 > 3) and (3 > 1), both True',
      points: 5,
      concepts: ['chained comparisons', 'evaluation', 'and']
    },

    // Question 3 - And operator short circuit
    {
      id: 'q3',
      type: 'multiple-choice',
      question: 'What prints?\n\nx = 5\ny = 0\nprint(y != 0 and x / y > 2)',
      options: [
        'True',
        'False',
        'Error',
        'None'
      ],
      correctAnswer: 1,
      explanation: 'Short-circuits: y != 0 is False, so x/y never evaluated (no error)',
      points: 5,
      concepts: ['short-circuit', 'and operator', 'evaluation']
    },

    // Question 4 - Or operator short circuit
    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'What happens?\n\nx = 10\nresult = x > 5 or print("Hello")\nprint(result)',
      options: [
        'Prints Hello then True',
        'Prints True only',
        'Prints Hello then None',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'x > 5 is True, so or short-circuits (print not called)',
      points: 5,
      concepts: ['short-circuit', 'or operator', 'side effects']
    },

    // Question 5 - Not operator precedence
    {
      id: 'q5',
      type: 'multiple-choice',
      question: 'What prints?\n\nresult = not True and False\nprint(result)',
      options: [
        'True',
        'False',
        'Error',
        'None'
      ],
      correctAnswer: 1,
      explanation: 'not has higher precedence: (not True) and False = False and False = False',
      points: 5,
      concepts: ['not operator', 'precedence', 'and']
    },

    // Question 6 - Truthiness of collections
    {
      id: 'q6',
      type: 'multiple-choice',
      question: 'What prints?\n\ndata = []\nif not data:\n    print("Empty")\nelse:\n    print("Has data")',
      options: [
        'Empty',
        'Has data',
        'Error',
        'Nothing'
      ],
      correctAnswer: 0,
      explanation: 'Empty list is falsy, not [] is True',
      points: 5,
      concepts: ['truthiness', 'empty lists', 'not operator']
    },

    // Question 7 - Truthiness of numbers
    {
      id: 'q7',
      type: 'multiple-choice',
      question: 'Which value is truthy?\n\n1) 0\n2) 0.0\n3) -1\n4) ""',
      options: [
        '0',
        '0.0',
        '-1',
        'All falsy'
      ],
      correctAnswer: 2,
      explanation: 'Only non-zero numbers are truthy; -1 is truthy',
      points: 5,
      concepts: ['truthiness', 'numbers', 'falsy values']
    },

    // Question 8 - Boolean vs comparison
    {
      id: 'q8',
      type: 'multiple-choice',
      question: 'What prints?\n\nx = True\nprint(x == True, x is True)',
      options: [
        'True True',
        'True False',
        'False True',
        'False False'
      ],
      correctAnswer: 0,
      explanation: 'Both are True: == compares value, is checks identity (True is singleton)',
      points: 5,
      concepts: ['==', 'is', 'identity vs equality']
    },

    // Question 9 - String comparison
    {
      id: 'q9',
      type: 'multiple-choice',
      question: 'What prints?\n\nprint("apple" < "banana")',
      options: [
        'True',
        'False',
        'Error',
        'None'
      ],
      correctAnswer: 0,
      explanation: 'Lexicographic comparison: "a" comes before "b"',
      points: 5,
      concepts: ['string comparison', 'lexicographic', 'ordering']
    },

    // Question 10 - Mixed type comparison
    {
      id: 'q10',
      type: 'multiple-choice',
      question: 'What prints?\n\nprint(5 == 5.0)',
      options: [
        'True',
        'False',
        'Error',
        'None'
      ],
      correctAnswer: 0,
      explanation: '== compares values (5 equals 5.0), not types',
      points: 5,
      concepts: ['equality', 'int vs float', 'type coercion']
    },

    // Question 11 - Logical operators returning values
    {
      id: 'q11',
      type: 'multiple-choice',
      question: 'What prints?\n\nresult = "hello" or "world"\nprint(result)',
      options: [
        'True',
        'hello',
        'world',
        'helloworld'
      ],
      correctAnswer: 1,
      explanation: 'or returns first truthy value: "hello"',
      points: 5,
      concepts: ['or operator', 'return values', 'truthiness']
    },

    // Question 12 - And returning values
    {
      id: 'q12',
      type: 'multiple-choice',
      question: 'What prints?\n\nresult = "hello" and "world"\nprint(result)',
      options: [
        'True',
        'hello',
        'world',
        'False'
      ],
      correctAnswer: 2,
      explanation: 'and returns last evaluated value if all truthy: "world"',
      points: 5,
      concepts: ['and operator', 'return values', 'truthiness']
    },

    // Question 13 - None comparison
    {
      id: 'q13',
      type: 'multiple-choice',
      question: 'What is the correct way to check for None?\n\nx = None',
      options: [
        'if x == None:',
        'if x is None:',
        'if not x:',
        'All equivalent'
      ],
      correctAnswer: 1,
      explanation: 'Best practice: use "is None" for None checks',
      points: 5,
      concepts: ['None', 'is operator', 'best practices']
    },

    // Question 14 - De Morgan's Law
    {
      id: 'q14',
      type: 'multiple-choice',
      question: 'Which is equivalent to: not (a and b)?',
      options: [
        'not a and not b',
        'not a or not b',
        'a or b',
        'a and b'
      ],
      correctAnswer: 1,
      explanation: 'De Morgan\'s law: not (a and b) = not a or not b',
      points: 5,
      concepts: ['De Morgan', 'logical equivalence', 'not']
    },

    // Question 15 - Boolean arithmetic
    {
      id: 'q15',
      type: 'multiple-choice',
      question: 'What prints?\n\nresult = True + True + False\nprint(result)',
      options: [
        '2',
        'True',
        'False',
        'Error'
      ],
      correctAnswer: 0,
      explanation: 'True=1, False=0: 1+1+0=2',
      points: 5,
      concepts: ['boolean arithmetic', 'True as 1', 'False as 0']
    },

    // Question 16 - Complex boolean expression
    {
      id: 'q16',
      type: 'multiple-choice',
      question: 'What prints?\n\nx = 5\nprint(x > 3 and x < 10 or x == 15)',
      options: [
        'True',
        'False',
        'Error',
        '5'
      ],
      correctAnswer: 0,
      explanation: '(5>3 and 5<10) is True, or short-circuits',
      points: 5,
      concepts: ['compound conditions', 'precedence', 'evaluation']
    },

    // Question 17 - In operator with string
    {
      id: 'q17',
      type: 'multiple-choice',
      question: 'What prints?\n\nprint("cat" in "catastrophe")',
      options: [
        'True',
        'False',
        'Error',
        '0'
      ],
      correctAnswer: 0,
      explanation: '"cat" is a substring of "catastrophe"',
      points: 5,
      concepts: ['in operator', 'substrings', 'membership']
    },

    // Question 18 - Multiple conditions
    {
      id: 'q18',
      type: 'multiple-choice',
      question: 'What prints?\n\nage = 25\nmember = False\nif age >= 18 and (age < 65 or member):\n    print("Discount")\nelse:\n    print("Full")',
      options: [
        'Discount',
        'Full',
        'Error',
        'Nothing'
      ],
      correctAnswer: 0,
      explanation: 'age>=18 is True, age<65 is True, so overall True',
      points: 5,
      concepts: ['multiple conditions', 'parentheses', 'or precedence']
    },

    // Question 19 - Comparing None
    {
      id: 'q19',
      type: 'multiple-choice',
      question: 'What prints?\n\nx = None\nprint(bool(x))',
      options: [
        'True',
        'False',
        'None',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'None is falsy: bool(None) = False',
      points: 5,
      concepts: ['None', 'bool()', 'truthiness']
    },

    // Question 20 - XOR-like behavior
    {
      id: 'q20',
      type: 'multiple-choice',
      question: 'What prints?\n\na = True\nb = False\nresult = (a or b) and not (a and b)\nprint(result)',
      options: [
        'True',
        'False',
        'Error',
        'None'
      ],
      correctAnswer: 0,
      explanation: 'XOR pattern: (True or False) and not (True and False) = True and True = True',
      points: 5,
      concepts: ['XOR pattern', 'compound logic', 'boolean algebra']
    }
  ]
};
