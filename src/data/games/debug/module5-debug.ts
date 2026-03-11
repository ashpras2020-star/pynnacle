import type { DebugGame } from '../../../types/game';

export const module3DebugGame: DebugGame = {
  id: 'debug-module3',
  moduleId: 'module-3',
  title: 'Debug Detective: Strings',
  description: 'Find and fix bugs in string methods, concatenation, f-strings, and formatting.',
  baseXP: 100,
  bonusXP: 50,
  challenges: [
    {
      id: 'module3-debug-1',
      title: 'String Method Misuse',
      code: `# Convert to uppercase
message = "hello world"
message.upper()
print(message)`,
      bugLines: [3],
      bugDescriptions: [
        'String method upper() returns a new string but result is not stored'
      ],
      fixes: [
        'Assign the result: message = message.upper()'
      ],
      correctCode: `# Convert to uppercase
message = "hello world"
message = message.upper()
print(message)`,
      explanation: 'Strings are immutable in Python. String methods like upper(), lower(), and replace() return a new string - they don\'t modify the original. You must assign the result to a variable.',
      hints: [
        'Are strings mutable or immutable?',
        'What happens to the return value of upper()?',
        'The method returns something - where does it go?'
      ],
      difficulty: 'easy',
      concepts: ['strings', 'methods', 'immutability']
    },
    {
      id: 'module3-debug-2',
      title: 'F-String Syntax Error',
      code: `# Display user info
name = "Alice"
age = 25
print(f"Name: {name}, Age: age")`,
      bugLines: [4],
      bugDescriptions: [
        'Variable age is not wrapped in curly braces in the f-string'
      ],
      fixes: [
        'Wrap age in curly braces: print(f"Name: {name}, Age: {age}")'
      ],
      correctCode: `# Display user info
name = "Alice"
age = 25
print(f"Name: {name}, Age: {age}")`,
      explanation: 'In f-strings (formatted string literals), variables and expressions must be wrapped in curly braces {}. Without braces, the variable name is treated as literal text.',
      hints: [
        'How do you insert variables in f-strings?',
        'Compare how name and age are used',
        'What symbols are needed around variables in f-strings?'
      ],
      difficulty: 'easy',
      concepts: ['strings', 'f-strings', 'formatting']
    },
    {
      id: 'module3-debug-3',
      title: 'String Concatenation Type Error',
      code: `# Build message
name = "Bob"
score = 95
message = "Player " + name + " scored " + score + " points"
print(message)`,
      bugLines: [4],
      bugDescriptions: [
        'Cannot concatenate string and integer - score needs to be converted to string'
      ],
      fixes: [
        'Convert score to string: message = "Player " + name + " scored " + str(score) + " points"'
      ],
      correctCode: `# Build message
name = "Bob"
score = 95
message = "Player " + name + " scored " + str(score) + " points"
print(message)`,
      explanation: 'You cannot concatenate strings and numbers directly with the + operator. Convert numbers to strings using str() or use f-strings for easier formatting.',
      hints: [
        'Can you add a string and a number?',
        'What type is score?',
        'How do you convert a number to a string?'
      ],
      difficulty: 'medium',
      concepts: ['strings', 'concatenation', 'types', 'conversion']
    },
    {
      id: 'module3-debug-4',
      title: 'String Indexing Mistake',
      code: `# Get first and last character
word = "Python"
first = word[1]
last = word[6]
print(f"First: {first}, Last: {last}")`,
      bugLines: [3, 4],
      bugDescriptions: [
        'Index 1 gets second character, not first (should be 0)',
        'Index 6 is out of range (should be 5 or -1)'
      ],
      fixes: [
        'Change to: first = word[0] and last = word[5] or last = word[-1]'
      ],
      correctCode: `# Get first and last character
word = "Python"
first = word[0]
last = word[-1]
print(f"First: {first}, Last: {last}")`,
      explanation: 'String indices start at 0, so the first character is at index 0. For a 6-character string, valid indices are 0-5. Use negative indices to count from the end: -1 is the last character.',
      hints: [
        'What index is the first character?',
        'How long is the string "Python"?',
        'Remember: indices start at 0!'
      ],
      difficulty: 'medium',
      concepts: ['strings', 'indexing', 'slicing']
    },
    {
      id: 'module3-debug-5',
      title: 'String Format Specification',
      code: `# Format decimal number
price = 19.5
tax = 1.575
total = price + tax
print(f"Total: \${total:.2}")`,
      bugLines: [5],
      bugDescriptions: [
        'Incorrect format specification - missing "f" for floating point formatting'
      ],
      fixes: [
        'Add "f" after the colon: print(f"Total: \\${total:.2f}")'
      ],
      correctCode: `# Format decimal number
price = 19.5
tax = 1.575
total = price + tax
print(f"Total: \${total:.2f}")`,
      explanation: 'In f-string formatting, :.2f means format as float with 2 decimal places. The "f" is required - without it, :.2 is invalid. Format specifiers: d for integer, f for float, s for string.',
      hints: [
        'What does :.2 mean without a letter after it?',
        'What letter indicates floating-point formatting?',
        'The format specifier is incomplete'
      ],
      difficulty: 'hard',
      concepts: ['strings', 'f-strings', 'formatting', 'decimals']
    }
  ]
};
