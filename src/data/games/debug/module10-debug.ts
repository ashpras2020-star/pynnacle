import type { DebugGame } from '../../../types/game';

export const module8DebugGame: DebugGame = {
  id: 'debug-module8',
  moduleId: 'module-8',
  title: 'Debug Detective: List Comprehensions',
  description: 'Find and fix bugs in list comprehensions, nested lists, enumerate, and zip.',
  baseXP: 100,
  bonusXP: 50,
  challenges: [
    {
      id: 'module8-debug-1',
      title: 'List Comprehension Syntax',
      code: `# Square all numbers
numbers = [1, 2, 3, 4, 5]
squared = [x * x for x in numbers
print(squared)`,
      bugLines: [3],
      bugDescriptions: [
        'Missing closing bracket ] for the list comprehension'
      ],
      fixes: [
        'Add closing bracket: squared = [x * x for x in numbers]'
      ],
      correctCode: `# Square all numbers
numbers = [1, 2, 3, 4, 5]
squared = [x * x for x in numbers]
print(squared)`,
      explanation: 'List comprehensions must be enclosed in square brackets []. The opening [ must have a matching closing ].',
      hints: [
        'Count the brackets - do they match?',
        'What\'s missing from the end of line 3?',
        'List comprehensions need to be closed'
      ],
      difficulty: 'easy',
      concepts: ['list comprehension', 'syntax', 'brackets']
    },
    {
      id: 'module8-debug-2',
      title: 'Enumerate Index Misunderstanding',
      code: `# Print items with their position
fruits = ["apple", "banana", "cherry"]
for i in enumerate(fruits):
    print(f"{i}. {fruits[i]}")`,
      bugLines: [3, 4],
      bugDescriptions: [
        'enumerate() returns tuples of (index, value) but code treats it as just index',
        'Should unpack: for i, fruit in enumerate(fruits):'
      ],
      fixes: [
        'Unpack the tuple: for i, fruit in enumerate(fruits): then print(f"{i}. {fruit}")'
      ],
      correctCode: `# Print items with their position
fruits = ["apple", "banana", "cherry"]
for i, fruit in enumerate(fruits):
    print(f"{i}. {fruit}")`,
      explanation: 'enumerate() returns tuples of (index, value). You need to unpack both: for i, item in enumerate(list). Using just one variable gives you the whole tuple, not the index.',
      hints: [
        'What does enumerate() return?',
        'How many variables should you unpack?',
        'enumerate gives you both index and value'
      ],
      difficulty: 'easy',
      concepts: ['enumerate', 'unpacking', 'tuples']
    },
    {
      id: 'module8-debug-3',
      title: 'List Comprehension Condition',
      code: `# Get even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [x for x in numbers if x % 2]
print(evens)`,
      bugLines: [3],
      bugDescriptions: [
        'Condition "if x % 2" is truthy for odd numbers (remainder 1), not even - should be "if x % 2 == 0"'
      ],
      fixes: [
        'Change condition to: if x % 2 == 0 or if not x % 2'
      ],
      correctCode: `# Get even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [x for x in numbers if x % 2 == 0]
print(evens)`,
      explanation: 'x % 2 returns 0 for even numbers (falsy) and 1 for odd numbers (truthy). To get evens, use "if x % 2 == 0" or "if not x % 2". Just "if x % 2" gives odd numbers.',
      hints: [
        'What does x % 2 return for even vs odd?',
        'Is 0 truthy or falsy?',
        'The condition is backwards'
      ],
      difficulty: 'medium',
      concepts: ['list comprehension', 'conditions', 'modulo', 'truthiness']
    },
    {
      id: 'module8-debug-4',
      title: 'Zip Length Mismatch',
      code: `# Combine names and scores
names = ["Alice", "Bob", "Charlie"]
scores = [95, 87]
results = list(zip(names, scores))
print(results)
print(f"Total students: {len(results)}")`,
      bugLines: [4],
      bugDescriptions: [
        'zip() stops at shortest list - Charlie is excluded because scores only has 2 elements'
      ],
      fixes: [
        'Ensure lists are same length, or use itertools.zip_longest() for mismatched lengths'
      ],
      correctCode: `# Combine names and scores
names = ["Alice", "Bob", "Charlie"]
scores = [95, 87, 92]
results = list(zip(names, scores))
print(results)
print(f"Total students: {len(results)}")`,
      explanation: 'zip() stops when the shortest iterable is exhausted. If lists have different lengths, some elements will be excluded. Ensure lists are the same length or use itertools.zip_longest().',
      hints: [
        'How many names vs scores are there?',
        'What happens when zip gets unequal lists?',
        'Will all students appear in results?'
      ],
      difficulty: 'medium',
      concepts: ['zip', 'lists', 'length', 'pairing']
    },
    {
      id: 'module8-debug-5',
      title: 'Nested List Comprehension Order',
      code: `# Flatten a 2D list
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
print(flat)`,
      bugLines: [3],
      bugDescriptions: [
        'This is actually correct! The order is right: outer loop first, then inner loop'
      ],
      fixes: [
        'No fix needed - this code is correct. It properly flattens the matrix.'
      ],
      correctCode: `# Flatten a 2D list
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
print(flat)`,
      explanation: 'This is a trick question! The code is correct. In nested list comprehensions, the order is the same as nested for loops: [item for outer in outer_list for inner in inner_list] equals for outer... for inner...',
      hints: [
        'Is there actually a bug here?',
        'What order should nested comprehensions use?',
        'Read it like nested for loops'
      ],
      difficulty: 'hard',
      concepts: ['list comprehension', 'nested', 'order', 'flattening']
    }
  ]
};
