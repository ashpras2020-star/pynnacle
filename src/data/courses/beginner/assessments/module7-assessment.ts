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
    },

    // Question 21 - Function definition basics
    {
      id: 'q21',
      type: 'multiple-choice' as const,
      question: 'What is the output?\n\ndef greet(name):\n    return "Hello, " + name\n\nresult = greet("Alice")\nprint(result)',
      options: [
        'Hello, Alice',
        'Hello, name',
        'None',
        'Error'
      ],
      correctAnswer: 0,
      explanation: 'The function takes "Alice" as the name parameter and returns the concatenated string "Hello, Alice".',
      points: 5,
    },

    // Question 22 - Default parameters
    {
      id: 'q22',
      type: 'multiple-choice' as const,
      question: 'What does this print?\n\ndef power(base, exp=2):\n    return base ** exp\n\nprint(power(3))\nprint(power(2, 3))',
      options: [
        '9\\n8',
        '6\\n8',
        '9\\n6',
        'Error'
      ],
      correctAnswer: 0,
      explanation: 'power(3) uses default exp=2, so 3**2=9. power(2,3) overrides exp to 3, so 2**3=8.',
      points: 5,
    },

    // Question 23 - Return value when no return statement
    {
      id: 'q23',
      type: 'multiple-choice' as const,
      question: 'What is printed?\n\ndef add(a, b):\n    total = a + b\n\nresult = add(3, 4)\nprint(result)',
      options: [
        '7',
        '0',
        'None',
        'Error'
      ],
      correctAnswer: 2,
      explanation: 'The function calculates total but never returns it. Functions without a return statement implicitly return None.',
      points: 5,
    },

    // Question 24 - Variable scope (local vs global)
    {
      id: 'q24',
      type: 'multiple-choice' as const,
      question: 'What is the output?\n\nx = 10\n\ndef change():\n    x = 20\n    return x\n\nchange()\nprint(x)',
      options: [
        '10',
        '20',
        'None',
        'Error'
      ],
      correctAnswer: 0,
      explanation: 'The x inside change() is a local variable. It does not modify the global x, which remains 10.',
      points: 5,
    },

    // Question 25 - *args
    {
      id: 'q25',
      type: 'multiple-choice' as const,
      question: 'What does this print?\n\ndef total(*args):\n    return sum(args)\n\nprint(total(1, 2, 3, 4))',
      options: [
        '10',
        '[1, 2, 3, 4]',
        'Error',
        '4'
      ],
      correctAnswer: 0,
      explanation: '*args collects all positional arguments into a tuple (1, 2, 3, 4). sum() adds them to get 10.',
      points: 5,
    },

    // Question 26 - Keyword arguments
    {
      id: 'q26',
      type: 'multiple-choice' as const,
      question: 'What is the output?\n\ndef info(name, age):\n    return f"{name} is {age}"\n\nprint(info(age=25, name="Bob"))',
      options: [
        'Bob is 25',
        '25 is Bob',
        'Error',
        'name is age'
      ],
      correctAnswer: 0,
      explanation: 'Keyword arguments can be passed in any order. name gets "Bob" and age gets 25.',
      points: 5,
    },

    // Question 27 - LEGB scope rule
    {
      id: 'q27',
      type: 'multiple-choice' as const,
      question: 'What does this print?\n\nx = "global"\n\ndef outer():\n    x = "enclosing"\n    def inner():\n        print(x)\n    inner()\n\nouter()',
      options: [
        'global',
        'enclosing',
        'None',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'Python follows the LEGB rule. inner() has no local x, so it looks in the enclosing scope and finds "enclosing".',
      points: 5,
    },

    // Question 28 - Multiple return values
    {
      id: 'q28',
      type: 'multiple-choice' as const,
      question: 'What is printed?\n\ndef min_max(numbers):\n    return min(numbers), max(numbers)\n\nresult = min_max([5, 2, 8, 1, 9])\nprint(type(result).__name__)',
      options: [
        'list',
        'tuple',
        'int',
        'dict'
      ],
      correctAnswer: 1,
      explanation: 'Returning multiple values with commas creates a tuple. The result is (1, 9), which is a tuple.',
      points: 5,
    },

    // Question 29 - Mutable default argument pitfall
    {
      id: 'q29',
      type: 'multiple-choice' as const,
      question: 'What does this print?\n\ndef add_item(item, lst=[]):\n    lst.append(item)\n    return lst\n\nprint(add_item(1))\nprint(add_item(2))',
      options: [
        '[1]\\n[2]',
        '[1]\\n[1, 2]',
        '[1, 2]\\n[1, 2]',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'Mutable default arguments are shared across calls. The default list persists, so the second call appends to [1], giving [1, 2].',
      points: 5,
    },

    // Question 30 - Built-in functions and lambda
    {
      id: 'q30',
      type: 'multiple-choice' as const,
      question: 'What is the output?\n\nnums = [3, 1, 4, 1, 5]\nresult = sorted(nums, key=lambda x: -x)\nprint(result[:3])',
      options: [
        '[1, 1, 3]',
        '[5, 4, 3]',
        '[3, 1, 4]',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'The lambda negates each value for sorting, producing descending order [5, 4, 3, 1, 1]. The first 3 elements are [5, 4, 3].',
      points: 5,
    }
  ]
};
