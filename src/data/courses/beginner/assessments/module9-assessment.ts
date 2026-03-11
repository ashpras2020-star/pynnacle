// Module 9 Assessment: Error Handling Basics
// Tests: error types, try/except, specific exceptions, finally/else, debugging strategies

import type { Assessment } from '@types';

export const module9Assessment: Assessment = {
  id: 'assessment-module-9',
  moduleId: 'module-9',
  courseId: 'beginner',
  title: 'Module 9 Assessment: Error Handling Basics',
  description: 'Test your knowledge of Python error handling, exceptions, and debugging strategies.',
  totalPoints: 100,
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What will this code output?\n\ntry:\n    result = 10 / 2\n    print("Success")\nexcept ZeroDivisionError:\n    print("Error")',
      options: [
        'Success',
        'Error',
        'Success\\nError',
        'Nothing'
      ],
      correctAnswer: 0,
      explanation: 'No error occurs (10/2 is valid), so except block is skipped',
      points: 5,
      concepts: ['try', 'except', 'normal execution']
    },

    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'What happens with this code?\n\ntry:\n    x = int("hello")\nexcept ValueError:\n    x = 0\nfinally:\n    print("Done")\n\nprint(x)',
      options: [
        'Prints: Done\\n0',
        'Prints: 0\\nDone',
        'Prints: Done only',
        'Error'
      ],
      correctAnswer: 0,
      explanation: 'finally runs first, then x is printed (set to 0 in except)',
      points: 5,
      concepts: ['finally', 'except', 'execution order']
    },

    {
      id: 'q3',
      type: 'multiple-choice',
      question: 'What is the output?\n\ntry:\n    result = 5 / 0\nexcept ZeroDivisionError:\n    result = "Error"\nexcept ValueError:\n    result = "Wrong"\n\nprint(result)',
      options: [
        'Error',
        'Wrong',
        'Error\\nWrong',
        'None'
      ],
      correctAnswer: 0,
      explanation: 'Only first matching except block runs (ZeroDivisionError)',
      points: 5,
      concepts: ['multiple except', 'error matching', 'first match']
    },

    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'What will happen?\n\ntry:\n    data = [1, 2, 3]\n    print(data[5])\nexcept IndexError:\n    print("Out of range")\nexcept:\n    print("Other error")',
      options: [
        'Out of range',
        'Other error',
        'Out of range\\nOther error',
        'Error'
      ],
      correctAnswer: 0,
      explanation: 'IndexError is caught by first except, second is not executed',
      points: 5,
      concepts: ['IndexError', 'multiple except', 'specific handling']
    },

    {
      id: 'q5',
      type: 'multiple-choice',
      question: 'What does this print?\n\ntry:\n    result = 10 / 2\nexcept ZeroDivisionError:\n    print("A")\nelse:\n    print("B")\nfinally:\n    print("C")',
      options: [
        'A\\nC',
        'B\\nC',
        'C',
        'A\\nB\\nC'
      ],
      correctAnswer: 1,
      explanation: 'No error: else runs (B), finally always runs (C)',
      points: 5,
      concepts: ['else', 'finally', 'no exception']
    },

    {
      id: 'q6',
      type: 'multiple-choice',
      question: 'What is printed?\n\ntry:\n    nums = {"a": 1}\n    print(nums["b"])\nexcept KeyError as e:\n    print(f"Missing: {e}")',
      options: [
        'Missing: b',
        'Missing: "b"',
        'KeyError',
        'None'
      ],
      correctAnswer: 1,
      explanation: 'e contains the key with quotes: Missing: "b"',
      points: 5,
      concepts: ['KeyError', 'as keyword', 'error messages']
    },

    {
      id: 'q7',
      type: 'multiple-choice',
      question: 'What happens?\n\ntry:\n    x = 5 + "5"\nexcept ValueError:\n    print("Value")\nexcept TypeError:\n    print("Type")',
      options: [
        'Value',
        'Type',
        'Value\\nType',
        'Error (uncaught)'
      ],
      correctAnswer: 1,
      explanation: 'Adding int and string raises TypeError (not ValueError)',
      points: 5,
      concepts: ['TypeError', 'exception types', 'correct handling']
    },

    {
      id: 'q8',
      type: 'multiple-choice',
      question: 'What is the output?\n\ncount = 0\ntry:\n    count += 1\n    raise ValueError("Test")\nexcept ValueError:\n    count += 1\nfinally:\n    count += 1\n\nprint(count)',
      options: [
        '1',
        '2',
        '3',
        '0'
      ],
      correctAnswer: 2,
      explanation: 'try increments (1), except increments (2), finally increments (3)',
      points: 5,
      concepts: ['finally', 'execution flow', 'all blocks']
    },

    {
      id: 'q9',
      type: 'multiple-choice',
      question: 'What happens with this code?\n\ntry:\n    result = int(input())\nexcept:\n    result = 0\n\n# User enters "abc":',
      options: [
        'result = "abc"',
        'result = 0',
        'result = None',
        'Uncaught error'
      ],
      correctAnswer: 1,
      explanation: 'int("abc") raises ValueError, caught by bare except, result=0',
      points: 5,
      concepts: ['bare except', 'input', 'default values']
    },

    {
      id: 'q10',
      type: 'multiple-choice',
      question: 'What is printed?\n\ntry:\n    data = []\n    print(data[0])\nexcept IndexError:\n    print("Empty")\nelse:\n    print("Found")',
      options: [
        'Empty',
        'Found',
        'Empty\\nFound',
        'None'
      ],
      correctAnswer: 0,
      explanation: 'IndexError occurs, except runs, else is skipped',
      points: 5,
      concepts: ['else', 'IndexError', 'conditional flow']
    },

    {
      id: 'q11',
      type: 'multiple-choice',
      question: 'What does this output?\n\ntry:\n    value = 10 / 2\nexcept ZeroDivisionError:\n    value = -1\n\nprint(value)',
      options: [
        '5.0',
        '5',
        '-1',
        'Error'
      ],
      correctAnswer: 0,
      explanation: 'No exception, value = 10 / 2 = 5.0 (division returns float)',
      points: 5,
      concepts: ['no exception', 'division', 'float result']
    },

    {
      id: 'q12',
      type: 'multiple-choice',
      question: 'What happens?\n\ntry:\n    x = 5\n    y = x + 10\nexcept:\n    print("Error")\nelse:\n    print("Success")\nfinally:\n    print("End")',
      options: [
        'Success\\nEnd',
        'Error\\nEnd',
        'End',
        'Success'
      ],
      correctAnswer: 0,
      explanation: 'No error: else runs (Success), finally runs (End)',
      points: 5,
      concepts: ['else', 'finally', 'complete flow']
    },

    {
      id: 'q13',
      type: 'multiple-choice',
      question: 'What is the result?\n\ntry:\n    items = [1, 2, 3]\n    items.remove(5)\nexcept ValueError:\n    print("Not found")\nexcept IndexError:\n    print("Bad index")',
      options: [
        'Not found',
        'Bad index',
        'Both print',
        'Error (uncaught)'
      ],
      correctAnswer: 0,
      explanation: 'remove() raises ValueError when item not in list',
      points: 5,
      concepts: ['ValueError', 'list.remove', 'exception matching']
    },

    {
      id: 'q14',
      type: 'multiple-choice',
      question: 'What prints?\n\ntry:\n    result = "5" + 5\nexcept TypeError:\n    result = "Error"\nexcept ValueError:\n    result = "Wrong"\n\nprint(result)',
      options: [
        'Error',
        'Wrong',
        '55',
        'Uncaught error'
      ],
      correctAnswer: 0,
      explanation: 'String + int raises TypeError, caught and result="Error"',
      points: 5,
      concepts: ['TypeError', 'exception handling', 'type operations']
    },

    {
      id: 'q15',
      type: 'multiple-choice',
      question: 'What is the output?\n\nfor i in range(3):\n    try:\n        if i == 1:\n            raise ValueError()\n    except ValueError:\n        continue\n    print(i)',
      options: [
        '0 1 2',
        '0 2',
        '1',
        '0'
      ],
      correctAnswer: 1,
      explanation: 'i=0 prints, i=1 raises exception and continues (skips print), i=2 prints',
      points: 5,
      concepts: ['loops', 'exceptions', 'continue']
    },

    {
      id: 'q16',
      type: 'multiple-choice',
      question: 'What happens with nested try blocks?\n\ntry:\n    try:\n        x = 1 / 0\n    except ValueError:\n        print("Inner")\nexcept ZeroDivisionError:\n    print("Outer")',
      options: [
        'Inner',
        'Outer',
        'Inner\\nOuter',
        'Error (uncaught)'
      ],
      correctAnswer: 1,
      explanation: 'Inner except doesn\'t match, outer except catches ZeroDivisionError',
      points: 5,
      concepts: ['nested try', 'exception propagation', 'matching']
    },

    {
      id: 'q17',
      type: 'multiple-choice',
      question: 'What is printed?\n\ntry:\n    d = {"a": 1}\n    value = d.get("b", 0)\n    print(value)\nexcept KeyError:\n    print("Error")',
      options: [
        '0',
        'Error',
        'None',
        '1'
      ],
      correctAnswer: 0,
      explanation: 'get() returns default (0) instead of raising KeyError',
      points: 5,
      concepts: ['dict.get', 'no exception', 'default values']
    },

    {
      id: 'q18',
      type: 'multiple-choice',
      question: 'What does this output?\n\ntry:\n    nums = [1, 2, 3]\n    print(nums[3])\nexcept (IndexError, KeyError):\n    print("Out of bounds")',
      options: [
        'Out of bounds',
        'Error',
        '3',
        'None'
      ],
      correctAnswer: 0,
      explanation: 'IndexError is caught by tuple of exception types',
      points: 5,
      concepts: ['multiple exceptions', 'tuple syntax', 'IndexError']
    },

    {
      id: 'q19',
      type: 'multiple-choice',
      question: 'What happens?\n\ndef divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n    finally:\n        print("Cleanup")\n\nresult = divide(10, 0)\nprint(result)',
      options: [
        'Cleanup\\nNone',
        'None\\nCleanup',
        'Cleanup',
        'Error'
      ],
      correctAnswer: 0,
      explanation: 'finally runs before return, prints "Cleanup" then result is None',
      points: 5,
      concepts: ['finally', 'return', 'function flow']
    },

    {
      id: 'q20',
      type: 'multiple-choice',
      question: 'What is the result?\n\ntry:\n    data = {}\n    data["key"] = data["missing"] + 1\nexcept KeyError:\n    data["key"] = 1\n\nprint(data["key"])',
      options: [
        '1',
        '2',
        'Error',
        'None'
      ],
      correctAnswer: 0,
      explanation: 'Accessing data["missing"] raises KeyError, except sets key to 1',
      points: 5,
      concepts: ['KeyError', 'assignment', 'exception handling']
    }
  ]
};
