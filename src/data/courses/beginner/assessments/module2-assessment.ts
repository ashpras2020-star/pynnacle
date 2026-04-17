// Module 2 Assessment: Control Flow
// Tests: if/elif/else, while loops, for loops, break/continue

import type { Assessment } from '@types';

export const module5Assessment: Assessment = {
  id: 'assessment-module-5',
  moduleId: 'module-5',
  courseId: 'beginner',
  title: 'Module 2 Assessment: Control Flow',
  description: 'Test your understanding of conditional statements, loops, and control flow in Python.',
  totalPoints: 100,
  passingScore: 80,
  timeLimit: 20,
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What will this code output? x = 10; if x > 5: print("A"); elif x > 15: print("B"); else: print("C")',
      options: [
        'A',
        'B',
        'C',
        'A and B'
      ],
      correctAnswer: 0,
      explanation: 'First condition (x > 5) is True, so it prints "A" and skips the rest',
      points: 5,
      concepts: ['if', 'elif', 'else']
    },

    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'How many times will "Hello" be printed? for i in range(3): print("Hello")',
      options: [
        '0',
        '2',
        '3',
        '4'
      ],
      correctAnswer: 2,
      explanation: 'range(3) generates 0, 1, 2 - that\'s 3 numbers, so prints 3 times',
      points: 5,
      concepts: ['for loop', 'range']
    },

    {
      id: 'q3',
      type: 'multiple-choice',
      question: 'What does this loop do? while True: break',
      options: [
        'Runs forever',
        'Runs once then stops',
        'Causes an error',
        'Does nothing'
      ],
      correctAnswer: 1,
      explanation: 'Loop starts, immediately hits break, and exits after one iteration',
      points: 5,
      concepts: ['while', 'break']
    },

    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'What is the output? for i in range(5): if i == 2: continue; print(i)',
      options: [
        '0 1 3 4',
        '0 1 2 3 4',
        '2',
        '0 1'
      ],
      correctAnswer: 0,
      explanation: 'continue skips printing when i==2, so prints 0, 1, 3, 4',
      points: 5,
      concepts: ['for loop', 'continue']
    },

    {
      id: 'q5',
      type: 'multiple-choice',
      question: 'Which loop structure checks the condition BEFORE running the code inside?',
      options: [
        'do-while loop',
        'for loop',
        'while loop',
        'Both for and while'
      ],
      correctAnswer: 3,
      explanation: 'Both for and while loops check their condition before executing',
      points: 5,
      concepts: ['loops', 'control flow']
    },

    {
      id: 'q6',
      type: 'multiple-choice',
      question: 'What will print? x = 7; if x % 2 == 0: print("Even"); else: print("Odd")',
      options: [
        'Even',
        'Odd',
        'Nothing',
        'Error'
      ],
      correctAnswer: 1,
      explanation: '7 % 2 = 1 (not 0), so condition is False, prints "Odd"',
      points: 5,
      concepts: ['if', 'else', 'modulus']
    },

    {
      id: 'q7',
      type: 'multiple-choice',
      question: 'How do you create an infinite loop in Python?',
      options: [
        'for i in infinite:',
        'while True:',
        'loop forever:',
        'repeat:'
      ],
      correctAnswer: 1,
      explanation: 'while True: creates an infinite loop since True is always true',
      points: 5,
      concepts: ['while', 'infinite loop']
    },

    {
      id: 'q8',
      type: 'multiple-choice',
      question: 'What does range(2, 8, 2) generate?',
      options: [
        '2, 4, 6',
        '2, 4, 6, 8',
        '2, 3, 4, 5, 6, 7',
        '2, 8'
      ],
      correctAnswer: 0,
      explanation: 'range(start, stop, step): starts at 2, stops before 8, steps by 2',
      points: 5,
      concepts: ['range', 'for loop']
    },

    {
      id: 'q9',
      type: 'multiple-choice',
      question: 'What happens with nested if statements? if True: if False: print("A"); print("B")',
      options: [
        'Prints A and B',
        'Prints only B',
        'Prints only A',
        'Prints nothing'
      ],
      correctAnswer: 1,
      explanation: 'Outer if is True, inner if is False (skips "A"), but "B" is in outer if',
      points: 5,
      concepts: ['nested if', 'indentation']
    },

    {
      id: 'q10',
      type: 'multiple-choice',
      question: 'What does break do in a loop?',
      options: [
        'Skips to next iteration',
        'Exits the loop entirely',
        'Pauses the loop',
        'Restarts the loop'
      ],
      correctAnswer: 1,
      explanation: 'break exits the loop completely, not just the current iteration',
      points: 5,
      concepts: ['break', 'control flow']
    },

    {
      id: 'q11',
      type: 'multiple-choice',
      question: 'What is the output? for i in range(3): for j in range(2): print("*", end="")',
      options: [
        '**',
        '******',
        '***',
        '*****'
      ],
      correctAnswer: 1,
      explanation: 'Outer loop runs 3 times, inner loop runs 2 times each: 3×2 = 6 stars',
      points: 5,
      concepts: ['nested loops', 'for loop']
    },

    {
      id: 'q12',
      type: 'multiple-choice',
      question: 'When does a while loop stop running?',
      options: [
        'After 10 iterations',
        'When condition becomes False',
        'When break is called',
        'Both B and C'
      ],
      correctAnswer: 3,
      explanation: 'while loop stops when condition is False OR when break is executed',
      points: 5,
      concepts: ['while', 'loop control']
    },

    {
      id: 'q13',
      type: 'multiple-choice',
      question: 'What will this output? x = 0; while x < 3: x += 1; print(x)',
      options: [
        '0 1 2',
        '1 2 3',
        '0 1 2 3',
        '3'
      ],
      correctAnswer: 3,
      explanation: 'Loop runs 3 times incrementing x, then prints final value: 3',
      points: 5,
      concepts: ['while', 'increment']
    },

    {
      id: 'q14',
      type: 'multiple-choice',
      question: 'What is the difference between break and continue?',
      options: [
        'No difference',
        'break exits loop, continue skips to next iteration',
        'continue exits loop, break skips iteration',
        'break is faster'
      ],
      correctAnswer: 1,
      explanation: 'break exits the entire loop, continue skips rest of current iteration',
      points: 5,
      concepts: ['break', 'continue']
    },

    {
      id: 'q15',
      type: 'multiple-choice',
      question: 'What does elif stand for and do?',
      options: [
        '"else if" - checks another condition',
        '"else integer" - for numbers',
        '"elif" is a loop',
        '"else if" - runs always'
      ],
      correctAnswer: 0,
      explanation: 'elif means "else if" - checks another condition if previous was False',
      points: 5,
      concepts: ['elif', 'conditionals']
    },

    {
      id: 'q16',
      type: 'multiple-choice',
      question: 'How many elif statements can you have?',
      options: [
        'Only 1',
        'Maximum 5',
        'As many as you want',
        'None, only if and else'
      ],
      correctAnswer: 2,
      explanation: 'You can chain as many elif statements as needed',
      points: 5,
      concepts: ['elif', 'conditionals']
    },

    {
      id: 'q17',
      type: 'multiple-choice',
      question: 'What happens if no condition in if/elif/else is True?',
      options: [
        'Error occurs',
        'else block runs',
        'Nothing happens',
        'First if runs anyway'
      ],
      correctAnswer: 1,
      explanation: 'If all if/elif are False, the else block executes (if present)',
      points: 5,
      concepts: ['else', 'conditionals']
    },

    {
      id: 'q18',
      type: 'multiple-choice',
      question: 'What does range(5) generate?',
      options: [
        '1, 2, 3, 4, 5',
        '0, 1, 2, 3, 4',
        '0, 1, 2, 3, 4, 5',
        '1, 2, 3, 4'
      ],
      correctAnswer: 1,
      explanation: 'range(n) generates numbers from 0 to n-1: 0, 1, 2, 3, 4',
      points: 5,
      concepts: ['range', 'for loop']
    },

    {
      id: 'q19',
      type: 'multiple-choice',
      question: 'Can you use break in an if statement outside a loop?',
      options: [
        'Yes, always',
        'No, break only works in loops',
        'Yes, but only once',
        'Only in functions'
      ],
      correctAnswer: 1,
      explanation: 'break is only valid inside loops (for/while), not in if statements alone',
      points: 5,
      concepts: ['break', 'loops']
    },

    {
      id: 'q20',
      type: 'multiple-choice',
      question: 'What is the output? for i in "abc": print(i)',
      options: [
        'abc',
        'a b c (on separate lines)',
        '0 1 2',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'for loop iterates through each character in the string, printing each on new line',
      points: 5,
      concepts: ['for loop', 'strings']
    },

    {
      id: 'q21',
      type: 'multiple-choice' as const,
      question: 'What is the output of: print(2 ** 10)',
      options: [
        '20',
        '1024',
        '100',
        '512'
      ],
      correctAnswer: 1,
      explanation: '2 ** 10 means 2 to the power of 10, which is 1024.',
      points: 5,
    },

    {
      id: 'q22',
      type: 'multiple-choice' as const,
      question: 'What does math.sqrt(144) return?',
      options: [
        '12',
        '12.0',
        '144',
        '72'
      ],
      correctAnswer: 1,
      explanation: 'math.sqrt() returns a float, so math.sqrt(144) returns 12.0, not the integer 12.',
      points: 5,
    },

    {
      id: 'q23',
      type: 'multiple-choice' as const,
      question: 'What is the result of: -7 % 3 in Python?',
      options: [
        '-1',
        '1',
        '2',
        '-2'
      ],
      correctAnswer: 2,
      explanation: 'Python modulo always returns a result with the same sign as the divisor. -7 % 3 = 2 because -7 = (-3)*3 + 2.',
      points: 5,
    },

    {
      id: 'q24',
      type: 'multiple-choice' as const,
      question: 'What does round(3.14159, 2) return?',
      options: [
        '3.14',
        '3.15',
        '3.1',
        '3.14159'
      ],
      correctAnswer: 0,
      explanation: 'round(number, 2) rounds to 2 decimal places. 3.14159 rounded to 2 decimals is 3.14.',
      points: 5,
    },

    {
      id: 'q25',
      type: 'multiple-choice' as const,
      question: 'What is the output of: print(-7 // 2)',
      options: [
        '-3',
        '-4',
        '-3.5',
        '3'
      ],
      correctAnswer: 1,
      explanation: 'Floor division always rounds DOWN (toward negative infinity). -7 / 2 = -3.5, floored to -4.',
      points: 5,
    },

    {
      id: 'q26',
      type: 'multiple-choice' as const,
      question: 'Which import statement is needed to use randint(1, 6)?',
      options: [
        'import math',
        'from random import randint',
        'import randint',
        'from math import randint'
      ],
      correctAnswer: 1,
      explanation: 'randint is part of the random module. You import it with: from random import randint.',
      points: 5,
    },

    {
      id: 'q27',
      type: 'multiple-choice' as const,
      question: 'What is the result of: int(7.9) + int("3")',
      options: [
        '10.9',
        '10',
        '11',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'int(7.9) truncates to 7 (does not round), and int("3") converts string to 3. 7 + 3 = 10.',
      points: 5,
    },

    {
      id: 'q28',
      type: 'multiple-choice' as const,
      question: 'What does format(1234567.89, ",.2f") produce?',
      options: [
        '"1234567.89"',
        '"1,234,567.89"',
        '"1234567.890"',
        '"1.234.567,89"'
      ],
      correctAnswer: 1,
      explanation: 'The "," adds thousand separators and ".2f" formats to 2 decimal places, giving "1,234,567.89".',
      points: 5,
    },

    {
      id: 'q29',
      type: 'multiple-choice' as const,
      question: 'What is the output of: print(abs(-15), abs(15))',
      options: [
        '-15 15',
        '15 -15',
        '15 15',
        '0 30'
      ],
      correctAnswer: 2,
      explanation: 'abs() returns the absolute (positive) value. abs(-15) is 15, and abs(15) is already 15.',
      points: 5,
    },

    {
      id: 'q30',
      type: 'multiple-choice' as const,
      question: 'What does math.ceil(4.1) return compared to math.floor(4.9)?',
      options: [
        '5 and 5',
        '4 and 4',
        '5 and 4',
        '4 and 5'
      ],
      correctAnswer: 2,
      explanation: 'math.ceil() rounds UP to the nearest integer (4.1 -> 5), math.floor() rounds DOWN (4.9 -> 4).',
      points: 5,
    }
  ]
};
