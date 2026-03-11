import type { DebugGame } from '../../../types/game';

export const module6DebugGame: DebugGame = {
  id: 'debug-module6',
  moduleId: 'module-6',
  title: 'Debug Detective: Collections',
  description: 'Find and fix bugs in lists, dictionaries, tuples, and sets.',
  baseXP: 100,
  bonusXP: 50,
  challenges: [
    {
      id: 'module6-debug-1',
      title: 'List Index Error',
      code: `# Access list elements
fruits = ["apple", "banana", "cherry"]
print(fruits[1])
print(fruits[3])`,
      bugLines: [4],
      bugDescriptions: [
        'Index 3 is out of range - list has only 3 elements (indices 0, 1, 2)'
      ],
      fixes: [
        'Change to a valid index like fruits[2] or fruits[-1] for the last element'
      ],
      correctCode: `# Access list elements
fruits = ["apple", "banana", "cherry"]
print(fruits[1])
print(fruits[2])`,
      explanation: 'List indices start at 0, so a list with 3 elements has indices 0, 1, and 2. Trying to access index 3 causes an IndexError.',
      hints: [
        'How many items are in the list?',
        'What is the index of the last item?',
        'Remember: indices start at 0!'
      ],
      difficulty: 'easy',
      concepts: ['lists', 'indexing', 'errors']
    },
    {
      id: 'module6-debug-2',
      title: 'Dictionary Key Error',
      code: `# Student grades
grades = {"Alice": 95, "Bob": 87, "Charlie": 92}
print(grades["Alice"])
print(grades["David"])`,
      bugLines: [4],
      bugDescriptions: [
        'Key "David" does not exist in the dictionary'
      ],
      fixes: [
        'Either add "David" to the dictionary or use grades.get("David", 0) to safely access with a default value'
      ],
      correctCode: `# Student grades
grades = {"Alice": 95, "Bob": 87, "Charlie": 92}
print(grades["Alice"])
print(grades.get("David", 0))`,
      explanation: 'Accessing a dictionary key that doesn\'t exist raises a KeyError. Use the .get() method with a default value to safely access keys that might not exist.',
      hints: [
        'Is "David" in the dictionary?',
        'What happens when you access a non-existent key?',
        'There\'s a safer method to access dictionary values...'
      ],
      difficulty: 'easy',
      concepts: ['dictionaries', 'keys', 'errors', 'methods']
    },
    {
      id: 'module6-debug-3',
      title: 'Tuple Modification',
      code: `# Coordinates
position = (10, 20)
print("Starting position:", position)
position[0] = 15
print("New position:", position)`,
      bugLines: [4],
      bugDescriptions: [
        'Tuples are immutable - you cannot modify their elements'
      ],
      fixes: [
        'Create a new tuple: position = (15, 20) or use a list instead if you need to modify: position = [10, 20]'
      ],
      correctCode: `# Coordinates
position = (10, 20)
print("Starting position:", position)
position = (15, 20)
print("New position:", position)`,
      explanation: 'Tuples are immutable, meaning their values cannot be changed after creation. To change a value, create a new tuple or use a list instead.',
      hints: [
        'Can tuples be modified?',
        'What\'s the difference between tuples and lists?',
        'How do you change an immutable object?'
      ],
      difficulty: 'medium',
      concepts: ['tuples', 'immutability', 'errors']
    },
    {
      id: 'module6-debug-4',
      title: 'List Append vs Extend',
      code: `# Combine lists
numbers = [1, 2, 3]
more_numbers = [4, 5, 6]
numbers.append(more_numbers)
print(numbers)
print("Length:", len(numbers))`,
      bugLines: [4],
      bugDescriptions: [
        'append() adds the entire list as a single element instead of adding individual elements'
      ],
      fixes: [
        'Use extend() instead: numbers.extend(more_numbers) or use += operator'
      ],
      correctCode: `# Combine lists
numbers = [1, 2, 3]
more_numbers = [4, 5, 6]
numbers.extend(more_numbers)
print(numbers)
print("Length:", len(numbers))`,
      explanation: 'append() adds its argument as a single element, while extend() adds each element from an iterable individually. To combine lists, use extend() or the += operator.',
      hints: [
        'What does append() do with a list?',
        'How many elements should the final list have?',
        'Is there a method that adds multiple elements?'
      ],
      difficulty: 'medium',
      concepts: ['lists', 'methods', 'append', 'extend']
    },
    {
      id: 'module6-debug-5',
      title: 'Set Operations Mix-up',
      code: `# Find common elements
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}
# Should find common elements: {4, 5}
common = set1 - set2
print("Common elements:", common)`,
      bugLines: [5],
      bugDescriptions: [
        'Using subtraction (-) instead of intersection (&) - this gives elements in set1 but not in set2'
      ],
      fixes: [
        'Use intersection: common = set1 & set2 or common = set1.intersection(set2)'
      ],
      correctCode: `# Find common elements
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}
# Should find common elements: {4, 5}
common = set1 & set2
print("Common elements:", common)`,
      explanation: 'Set operations: & (intersection) finds common elements, - (difference) finds elements in first set but not second, | (union) combines sets, ^ (symmetric difference) finds elements in either set but not both.',
      hints: [
        'What does the minus operator do with sets?',
        'Which operator finds elements in both sets?',
        'Think about set theory - what operation finds the intersection?'
      ],
      difficulty: 'hard',
      concepts: ['sets', 'operations', 'intersection', 'difference']
    }
  ]
};
