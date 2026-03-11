import type { DebugGame } from '../../../types/game';

export const module2DebugGame: DebugGame = {
  id: 'debug-module2',
  moduleId: 'module-2',
  title: 'Debug Detective: Numbers & Math',
  description: 'Find and fix bugs in arithmetic operations, math module, random numbers, type conversion, and number formatting.',
  baseXP: 100,
  bonusXP: 50,
  challenges: [
    {
      id: 'module2-debug-1',
      title: 'Integer Division Mistake',
      code: `# Calculate average
total = 100
count = 3
average = total / count
print(f"Average: {average:.0f}")`,
      bugLines: [4],
      bugDescriptions: [
        'Using / gives float division (33.333...) when integer division // might be intended, or this might be correct depending on requirements'
      ],
      fixes: [
        'This is actually not a bug if you want the precise average. However, if you want integer division, use //. The real bug is more subtle - this code is actually fine!'
      ],
      correctCode: `# Calculate average
total = 100
count = 3
average = total / count
print(f"Average: {average:.1f}")`,
      explanation: 'This is a trick question! The code works correctly. / gives true division (33.333...) and :.0f rounds it for display. If you want integer division, use //. Always consider whether you need exact or integer division.',
      hints: [
        'Is there actually a bug here?',
        'What\'s the difference between / and //?',
        'Does the output meet the requirement?'
      ],
      difficulty: 'easy',
      concepts: ['division', 'operators', 'formatting']
    },
    {
      id: 'module2-debug-2',
      title: 'Import Statement Missing',
      code: `# Calculate square root
number = 16
result = math.sqrt(number)
print(f"Square root: {result}")`,
      bugLines: [2],
      bugDescriptions: [
        'Using math.sqrt() without importing the math module'
      ],
      fixes: [
        'Add import statement at the beginning: import math'
      ],
      correctCode: `# Calculate square root
import math
number = 16
result = math.sqrt(number)
print(f"Square root: {result}")`,
      explanation: 'Before using functions from the math module (or any module), you must import it with an import statement. Place imports at the top of your file.',
      hints: [
        'Where does sqrt() come from?',
        'Is the math module available automatically?',
        'What statement is missing from the top of the code?'
      ],
      difficulty: 'easy',
      concepts: ['math', 'import', 'modules']
    },
    {
      id: 'module2-debug-3',
      title: 'Random Range Error',
      code: `# Roll a dice (1-6)
import random
result = random.randint(1, 5)
print(f"You rolled: {result}")`,
      bugLines: [3],
      bugDescriptions: [
        'randint(1, 5) generates numbers 1-5, but a dice should be 1-6'
      ],
      fixes: [
        'Change to: result = random.randint(1, 6) - randint is inclusive on both ends'
      ],
      correctCode: `# Roll a dice (1-6)
import random
result = random.randint(1, 6)
print(f"You rolled: {result}")`,
      explanation: 'random.randint(a, b) returns a random integer between a and b, inclusive on both ends. For a dice (1-6), use randint(1, 6). This is different from range() which is exclusive on the upper bound.',
      hints: [
        'What numbers can a dice show?',
        'Is the upper bound of randint inclusive or exclusive?',
        'Will this code ever produce a 6?'
      ],
      difficulty: 'medium',
      concepts: ['random', 'randint', 'ranges']
    },
    {
      id: 'module2-debug-4',
      title: 'Type Conversion Error',
      code: `# Convert user input to number
user_input = "42.5"
number = int(user_input)
doubled = number * 2
print(f"Doubled: {doubled}")`,
      bugLines: [3],
      bugDescriptions: [
        'Using int() to convert a decimal string - should use float()'
      ],
      fixes: [
        'Change to: number = float(user_input) to properly convert decimal strings'
      ],
      correctCode: `# Convert user input to number
user_input = "42.5"
number = float(user_input)
doubled = number * 2
print(f"Doubled: {doubled}")`,
      explanation: 'int() can only convert strings that represent whole numbers. For decimal numbers, use float(). Trying to convert "42.5" with int() raises a ValueError.',
      hints: [
        'What type is "42.5"?',
        'Can int() handle decimal points?',
        'What function converts strings to decimal numbers?'
      ],
      difficulty: 'medium',
      concepts: ['conversion', 'int', 'float', 'types']
    },
    {
      id: 'module2-debug-5',
      title: 'Operator Precedence Problem',
      code: `# Calculate compound interest
principal = 1000
rate = 0.05  # 5%
time = 2
# Formula: A = P(1 + r)^t
amount = principal * 1 + rate ** time
print(f"Final amount: \${amount:.2f}")`,
      bugLines: [6],
      bugDescriptions: [
        'Missing parentheses - operator precedence causes wrong calculation: should be principal * (1 + rate) ** time'
      ],
      fixes: [
        'Add parentheses: amount = principal * ((1 + rate) ** time)'
      ],
      correctCode: `# Calculate compound interest
principal = 1000
rate = 0.05  # 5%
time = 2
# Formula: A = P(1 + r)^t
amount = principal * ((1 + rate) ** time)
print(f"Final amount: \${amount:.2f}")`,
      explanation: 'Operator precedence: ** (exponentiation) has higher precedence than * (multiplication) and + (addition). Without parentheses, the calculation is wrong. Use parentheses to control order of operations: PEMDAS.',
      hints: [
        'What order are the operations performed in?',
        'Does the formula match the implementation?',
        'Operator precedence: which happens first, ** or +?'
      ],
      difficulty: 'hard',
      concepts: ['operators', 'precedence', 'math', 'parentheses']
    }
  ]
};
