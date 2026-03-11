// Module 4 Assessment: Functions
// Tests: defining functions, parameters, return values, scope, built-in functions

import type { Assessment } from '@types';

export const module7Assessment: Assessment = {
  id: 'assessment-module-7',
  moduleId: 'module-7',
  courseId: 'beginner',
  title: 'Module 4 Assessment: Functions',
  description: 'Test your knowledge of Python functions including definition, parameters, return values, and scope.',
  totalPoints: 100,
  passingScore: 80,
  timeLimit: 25,
  questions: [
    // Question 1 - Function return value
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What does this print?\n\ndef double(x):\n    return x * 2\n\nresult = double(5)\nprint(result)',
      options: [
        '5',
        '10',
        '25',
        'None'
      ],
      correctAnswer: 1,
      explanation: 'Function returns 5 * 2 = 10',
      points: 5,
      concepts: ['functions', 'return', 'output']
    },

    // Question 2 - Function without return
    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'What prints?\n\ndef greet(name):\n    print(f"Hello {name}")\n\nresult = greet("Alice")\nprint(result)',
      options: [
        'Hello Alice',
        'None',
        'Hello Alice\\nNone',
        'Error'
      ],
      correctAnswer: 2,
      explanation: 'Function prints "Hello Alice" then result is None (printed on next line)',
      points: 5,
      concepts: ['return', 'None', 'print vs return']
    },

    // Question 3 - Multiple parameters
    {
      id: 'q3',
      type: 'multiple-choice',
      question: 'What is the output?\n\ndef calc(a, b, c):\n    return a + b * c\n\nprint(calc(2, 3, 4))',
      options: [
        '20',
        '24',
        '14',
        '9'
      ],
      correctAnswer: 2,
      explanation: '2 + (3 * 4) = 2 + 12 = 14 (multiplication first)',
      points: 5,
      concepts: ['parameters', 'order of operations', 'return']
    },

    // Question 4 - Default parameter usage
    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'What prints?\n\ndef power(base, exp=2):\n    return base ** exp\n\nprint(power(3))',
      options: [
        '3',
        '6',
        '9',
        'Error'
      ],
      correctAnswer: 2,
      explanation: 'Uses default exp=2, so 3**2 = 9',
      points: 5,
      concepts: ['default parameters', 'exponentiation', 'function calls']
    },

    // Question 5 - Overriding defaults
    {
      id: 'q5',
      type: 'multiple-choice',
      question: 'What is the result?\n\ndef greet(name, greeting="Hello"):\n    return f"{greeting} {name}"\n\nprint(greet("Bob", "Hi"))',
      options: [
        'Hello Bob',
        'Hi Bob',
        'Bob Hi',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'Second argument "Hi" overrides default greeting',
      points: 5,
      concepts: ['default parameters', 'argument order', 'override']
    },

    // Question 6 - Local vs global scope
    {
      id: 'q6',
      type: 'multiple-choice',
      question: 'What prints?\n\nx = 10\ndef change():\n    x = 20\n    print(x)\n\nchange()\nprint(x)',
      options: [
        '20\\n20',
        '10\\n10',
        '20\\n10',
        'Error'
      ],
      correctAnswer: 2,
      explanation: 'Function creates local x=20, global x remains 10',
      points: 5,
      concepts: ['scope', 'local variables', 'global variables']
    },

    // Question 7 - Return exits function
    {
      id: 'q7',
      type: 'multiple-choice',
      question: 'What prints?\n\ndef test():\n    print("A")\n    return\n    print("B")\n\ntest()',
      options: [
        'A',
        'B',
        'A\\nB',
        'Nothing'
      ],
      correctAnswer: 0,
      explanation: 'return exits function, so "B" never prints',
      points: 5,
      concepts: ['return', 'function flow', 'early exit']
    },

    // Question 8 - Multiple returns
    {
      id: 'q8',
      type: 'multiple-choice',
      question: 'What does this return?\n\ndef check(n):\n    if n > 0:\n        return "Positive"\n    return "Not positive"\n\nprint(check(-5))',
      options: [
        'Positive',
        'Not positive',
        'None',
        'Error'
      ],
      correctAnswer: 1,
      explanation: '-5 > 0 is False, so second return executes',
      points: 5,
      concepts: ['conditional return', 'if statements', 'function flow']
    },

    // Question 9 - Function calling function
    {
      id: 'q9',
      type: 'multiple-choice',
      question: 'What is the output?\n\ndef add(a, b):\n    return a + b\n\ndef calc():\n    return add(3, 4) * 2\n\nprint(calc())',
      options: [
        '7',
        '9',
        '14',
        'Error'
      ],
      correctAnswer: 2,
      explanation: 'add(3, 4) returns 7, then 7 * 2 = 14',
      points: 5,
      concepts: ['nested calls', 'return values', 'function composition']
    },

    // Question 10 - Parameter order matters
    {
      id: 'q10',
      type: 'multiple-choice',
      question: 'What prints?\n\ndef divide(a, b):\n    return a / b\n\nprint(divide(10, 2))',
      options: [
        '0.2',
        '2.0',
        '5.0',
        'Error'
      ],
      correctAnswer: 2,
      explanation: '10 / 2 = 5.0 (parameter order matters)',
      points: 5,
      concepts: ['parameter order', 'division', 'arguments']
    },

    // Question 11 - Modifying mutable parameter
    {
      id: 'q11',
      type: 'multiple-choice',
      question: 'What happens?\n\ndef modify(lst):\n    lst.append(4)\n\ndata = [1, 2, 3]\nmodify(data)\nprint(len(data))',
      options: [
        '3',
        '4',
        '5',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'Lists are mutable, function modifies original list',
      points: 5,
      concepts: ['mutable parameters', 'lists', 'side effects']
    },

    // Question 12 - Return multiple values
    {
      id: 'q12',
      type: 'multiple-choice',
      question: 'What type is returned?\n\ndef get_coords():\n    return 10, 20\n\nresult = get_coords()\nprint(type(result).__name__)',
      options: [
        'list',
        'tuple',
        'dict',
        'int'
      ],
      correctAnswer: 1,
      explanation: 'Multiple returns create a tuple',
      points: 5,
      concepts: ['multiple returns', 'tuples', 'unpacking']
    },

    // Question 13 - Variable scope error
    {
      id: 'q13',
      type: 'multiple-choice',
      question: 'What happens?\n\ndef test():\n    result = 100\n\ntest()\nprint(result)',
      options: [
        'Prints 100',
        'Prints None',
        'NameError',
        'Prints 0'
      ],
      correctAnswer: 2,
      explanation: 'result is local to function, not accessible outside',
      points: 5,
      concepts: ['scope', 'local variables', 'NameError']
    },

    // Question 14 - Built-in function behavior
    {
      id: 'q14',
      type: 'multiple-choice',
      question: 'What prints?\n\nnums = [3, 1, 4, 1, 5]\nprint(sum(nums))',
      options: [
        '5',
        '14',
        '15',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'sum() adds all elements: 3+1+4+1+5 = 14',
      points: 5,
      concepts: ['built-in functions', 'sum', 'lists']
    },

    // Question 15 - Type conversion chain
    {
      id: 'q15',
      type: 'multiple-choice',
      question: 'What is the output?\n\nresult = str(int(7.9))\nprint(result)',
      options: [
        '7',
        '"7"',
        '7.9',
        '8'
      ],
      correctAnswer: 0,
      explanation: 'int(7.9) = 7, then str(7) = "7" (prints as 7)',
      points: 5,
      concepts: ['type conversion', 'chaining', 'int', 'str']
    },

    // Question 16 - Function with conditional logic
    {
      id: 'q16',
      type: 'multiple-choice',
      question: 'What does this return?\n\ndef max_of_two(a, b):\n    if a > b:\n        return a\n    else:\n        return b\n\nprint(max_of_two(3, 7))',
      options: [
        '3',
        '7',
        '10',
        'None'
      ],
      correctAnswer: 1,
      explanation: '3 > 7 is False, so else returns b=7',
      points: 5,
      concepts: ['conditional logic', 'comparison', 'return']
    },

    // Question 17 - Global keyword
    {
      id: 'q17',
      type: 'multiple-choice',
      question: 'What is the final value of count?\n\ncount = 0\ndef increment():\n    global count\n    count += 1\n\nincrement()\nincrement()\nprint(count)',
      options: [
        '0',
        '1',
        '2',
        'Error'
      ],
      correctAnswer: 2,
      explanation: 'global keyword allows modifying global variable',
      points: 5,
      concepts: ['global keyword', 'scope', 'modification']
    },

    // Question 18 - Function with no parameters
    {
      id: 'q18',
      type: 'multiple-choice',
      question: 'What prints?\n\ndef get_pi():\n    return 3.14159\n\nvalue = get_pi\nprint(type(value).__name__)',
      options: [
        'float',
        'function',
        'int',
        'str'
      ],
      correctAnswer: 1,
      explanation: 'Without (), assigns the function itself (not calling it)',
      points: 5,
      concepts: ['function objects', 'calling vs referencing', 'type']
    },

    // Question 19 - Early return pattern
    {
      id: 'q19',
      type: 'multiple-choice',
      question: 'What does this return?\n\ndef is_adult(age):\n    if age < 18:\n        return False\n    return True\n\nprint(is_adult(20))',
      options: [
        'True',
        'False',
        'None',
        'Error'
      ],
      correctAnswer: 0,
      explanation: '20 < 18 is False, so skips first return and returns True',
      points: 5,
      concepts: ['early return', 'boolean logic', 'guard clauses']
    },

    // Question 20 - Parameter vs argument mismatch
    {
      id: 'q20',
      type: 'multiple-choice',
      question: 'What happens?\n\ndef add(x, y):\n    return x + y\n\nprint(add(5))',
      options: [
        'Prints 5',
        'Prints 10',
        'TypeError',
        'Prints None'
      ],
      correctAnswer: 2,
      explanation: 'Function expects 2 arguments but only 1 provided',
      points: 5,
      concepts: ['arguments', 'TypeError', 'function calls']
    }
  ]
};
