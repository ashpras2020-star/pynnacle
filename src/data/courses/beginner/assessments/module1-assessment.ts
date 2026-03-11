// Module 1 Assessment: Basics & Syntax
// Tests: print(), variables, data types, operators, comments, input/output

import type { Assessment } from '@types';

export const module1Assessment: Assessment = {
  id: 'assessment-module-1',
  moduleId: 'module-1',
  courseId: 'beginner',
  title: 'Module 1 Assessment: Python Basics & Syntax',
  description: 'Test your knowledge of Python fundamentals including print statements, variables, data types, operators, comments, and input/output.',
  totalPoints: 100,
  passingScore: 80,
  timeLimit: 20,
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What will be the output of: print("5" + "3")',
      options: [
        '8',
        '53',
        '5 3',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'String concatenation joins the strings together to make "53", not addition',
      points: 5,
      concepts: ['print', 'strings', 'operators']
    },

    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'Which line correctly assigns the value 100 to a variable named score?',
      options: [
        'score == 100',
        '100 = score',
        'score = 100',
        'var score = 100'
      ],
      correctAnswer: 2,
      explanation: 'Use single = for assignment. == is for comparison, not assignment',
      points: 5,
      concepts: ['variables', 'assignment']
    },

    {
      id: 'q3',
      type: 'multiple-choice',
      question: 'What is the data type of the result: 10 / 2',
      options: [
        'int',
        'float',
        'string',
        'boolean'
      ],
      correctAnswer: 1,
      explanation: 'Division (/) always returns a float in Python, even if result is whole number (5.0)',
      points: 5,
      concepts: ['data types', 'operators']
    },

    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'What does this code output? x = 10; x = x + 5; print(x)',
      options: [
        '10',
        '15',
        'x + 5',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'x starts at 10, then is reassigned to 15 (10 + 5)',
      points: 5,
      concepts: ['variables', 'operators', 'reassignment']
    },

    {
      id: 'q5',
      type: 'multiple-choice',
      question: 'Which operator gives the remainder after division?',
      options: [
        '/',
        '//',
        '%',
        'rem'
      ],
      correctAnswer: 2,
      explanation: 'The modulus operator (%) returns the remainder: 17 % 5 = 2',
      points: 5,
      concepts: ['operators', 'modulus']
    },

    {
      id: 'q6',
      type: 'multiple-choice',
      question: 'What is True about Python comments?',
      options: [
        'They affect program execution',
        'They must be at the start of a line',
        'They are ignored by Python',
        'They must use double quotes'
      ],
      correctAnswer: 2,
      explanation: 'Comments (starting with #) are completely ignored during execution',
      points: 5,
      concepts: ['comments', 'syntax']
    },

    {
      id: 'q7',
      type: 'multiple-choice',
      question: 'After running: name = input("Enter name: "), what type is name?',
      options: [
        'It depends on what user types',
        'string',
        'integer',
        'None'
      ],
      correctAnswer: 1,
      explanation: 'input() always returns a string, regardless of what the user types',
      points: 5,
      concepts: ['input', 'data types']
    },

    {
      id: 'q8',
      type: 'multiple-choice',
      question: 'What will print(5 + 3 * 2) output?',
      options: [
        '16',
        '11',
        '13',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'Multiplication happens first (3*2=6), then addition (5+6=11) due to order of operations',
      points: 5,
      concepts: ['operators', 'precedence']
    },

    {
      id: 'q9',
      type: 'multiple-choice',
      question: 'Which creates an integer variable with value 7?',
      options: [
        'x = "7"',
        'x = 7.0',
        'x = 7',
        'x = (7)'
      ],
      correctAnswer: 2,
      explanation: 'Just the number without quotes or decimal creates an int',
      points: 5,
      concepts: ['variables', 'data types', 'integers']
    },

    {
      id: 'q10',
      type: 'multiple-choice',
      question: 'What does // operator do?',
      options: [
        'Comments out code',
        'Regular division',
        'Integer division (rounds down)',
        'Modulus'
      ],
      correctAnswer: 2,
      explanation: '// performs integer division: 17 // 5 = 3 (discards remainder)',
      points: 5,
      concepts: ['operators', 'division']
    },

    {
      id: 'q11',
      type: 'multiple-choice',
      question: 'What is the output of: print(type(3.0))',
      options: [
        '<class \'int\'>',
        '<class \'float\'>',
        '3.0',
        'float'
      ],
      correctAnswer: 1,
      explanation: 'type() returns the data type, and 3.0 is a float',
      points: 5,
      concepts: ['data types', 'float', 'type function']
    },

    {
      id: 'q12',
      type: 'multiple-choice',
      question: 'Which variable name would cause an error?',
      options: [
        'user_name',
        '_private',
        'firstName',
        '1st_place'
      ],
      correctAnswer: 3,
      explanation: 'Variable names cannot start with a number',
      points: 5,
      concepts: ['variables', 'naming rules']
    },

    {
      id: 'q13',
      type: 'multiple-choice',
      question: 'What does print("Hello", "World") output?',
      options: [
        'HelloWorld',
        'Hello World',
        'Hello, World',
        'Hello\\nWorld'
      ],
      correctAnswer: 1,
      explanation: 'Multiple arguments in print() are separated by a space by default',
      points: 5,
      concepts: ['print', 'output']
    },

    {
      id: 'q14',
      type: 'multiple-choice',
      question: 'If x = 5 and y = 2, what is x ** y?',
      options: [
        '10',
        '7',
        '25',
        '5.2'
      ],
      correctAnswer: 2,
      explanation: '** is exponentiation: 5 ** 2 = 5 × 5 = 25',
      points: 5,
      concepts: ['operators', 'exponents']
    },

    {
      id: 'q15',
      type: 'multiple-choice',
      question: 'What makes a good variable name in Python?',
      options: [
        'Short single letters',
        'Descriptive and meaningful',
        'Using spaces for readability',
        'All uppercase'
      ],
      correctAnswer: 1,
      explanation: 'Good variable names are descriptive (e.g., student_age vs x)',
      points: 5,
      concepts: ['variables', 'best practices']
    },

    {
      id: 'q16',
      type: 'multiple-choice',
      question: 'What will this code do? # print("Hello")',
      options: [
        'Print "Hello"',
        'Print "# Hello"',
        'Do nothing (commented out)',
        'Cause an error'
      ],
      correctAnswer: 2,
      explanation: 'The # at the start makes the entire line a comment',
      points: 5,
      concepts: ['comments', 'syntax']
    },

    {
      id: 'q17',
      type: 'multiple-choice',
      question: 'To get user input as an integer, you should:',
      options: [
        'Use input(int)',
        'Use int(input())',
        'Input is always an integer',
        'Use integer(input())'
      ],
      correctAnswer: 1,
      explanation: 'input() returns string, so wrap it with int() to convert',
      points: 5,
      concepts: ['input', 'type conversion']
    },

    {
      id: 'q18',
      type: 'multiple-choice',
      question: 'What is 10 // 3 in Python?',
      options: [
        '3.33',
        '3',
        '4',
        '1'
      ],
      correctAnswer: 1,
      explanation: 'Integer division // gives quotient without remainder: 3',
      points: 5,
      concepts: ['operators', 'integer division']
    },

    {
      id: 'q19',
      type: 'multiple-choice',
      question: 'Which is NOT a valid Python data type?',
      options: [
        'str',
        'int',
        'decimal',
        'bool'
      ],
      correctAnswer: 2,
      explanation: 'Python uses float for decimals, not "decimal"',
      points: 5,
      concepts: ['data types']
    },

    {
      id: 'q20',
      type: 'multiple-choice',
      question: 'What does print(10 % 3) output?',
      options: [
        '3',
        '0',
        '1',
        '3.33'
      ],
      correctAnswer: 2,
      explanation: '10 divided by 3 is 3 remainder 1, so 10 % 3 = 1',
      points: 5,
      concepts: ['operators', 'modulus']
    }
  ]
};
