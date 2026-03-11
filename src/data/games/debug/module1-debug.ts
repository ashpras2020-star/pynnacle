import type { DebugGame } from '../../../types/game';

export const module1DebugGame: DebugGame = {
  id: 'debug-module1',
  moduleId: 'module-1',
  title: 'Debug Detective: Basics & Syntax',
  description: 'Find and fix bugs in Python basics: print statements, variables, data types, comments, and operators.',
  baseXP: 100,
  bonusXP: 50,
  challenges: [
    {
      id: 'module1-debug-1',
      title: 'Hello World Gone Wrong',
      code: `# My first Python program
print("Hello, World!")
print(Hello, Python)
name = "Alex"
print("My name is", name)`,
      bugLines: [3],
      bugDescriptions: [
        'Missing quotes around the string "Hello, Python"'
      ],
      fixes: [
        'Add quotes around "Hello, Python" to make it a string: print("Hello, Python")'
      ],
      correctCode: `# My first Python program
print("Hello, World!")
print("Hello, Python")
name = "Alex"
print("My name is", name)`,
      explanation: 'In Python, all text strings must be enclosed in quotes (single or double). Without quotes, Python thinks you\'re referring to a variable name.',
      hints: [
        'Look at the print statements - what\'s different about line 3?',
        'Text values need to be wrapped in something...',
        'Compare line 2 and line 3 - what\'s missing?'
      ],
      difficulty: 'easy',
      concepts: ['print', 'strings', 'syntax']
    },
    {
      id: 'module1-debug-2',
      title: 'Variable Assignment Mix-up',
      code: `# Calculate rectangle area
length = 10
width == 5
area = length * width
print("The area is:", area)`,
      bugLines: [3],
      bugDescriptions: [
        'Using comparison operator == instead of assignment operator ='
      ],
      fixes: [
        'Change == to = for variable assignment: width = 5'
      ],
      correctCode: `# Calculate rectangle area
length = 10
width = 5
area = length * width
print("The area is:", area)`,
      explanation: 'The = operator is used for assignment (storing a value), while == is used for comparison (checking if values are equal). To assign a value to a variable, use a single equals sign.',
      hints: [
        'Check how the variables are being assigned',
        'Is width being assigned or compared?',
        'One equals sign or two - which one assigns a value?'
      ],
      difficulty: 'easy',
      concepts: ['variables', 'assignment', 'operators']
    },
    {
      id: 'module1-debug-3',
      title: 'Type Troubles',
      code: `# User age calculator
birth_year = "2010"
current_year = 2024
age = current_year - birth_year
print("You are", age, "years old")`,
      bugLines: [2],
      bugDescriptions: [
        'birth_year is a string but should be an integer for arithmetic operations'
      ],
      fixes: [
        'Remove quotes from birth_year to make it an integer: birth_year = 2010'
      ],
      correctCode: `# User age calculator
birth_year = 2010
current_year = 2024
age = current_year - birth_year
print("You are", age, "years old")`,
      explanation: 'Arithmetic operations like subtraction require numbers, not strings. When a number has quotes around it, Python treats it as text rather than a numeric value.',
      hints: [
        'What type of data is birth_year?',
        'Can you subtract text from a number?',
        'Look at the difference between birth_year and current_year'
      ],
      difficulty: 'medium',
      concepts: ['types', 'integers', 'strings', 'arithmetic']
    },
    {
      id: 'module1-debug-4',
      title: 'Comment Confusion',
      code: `# Temperature converter
fahrenheit = 68
# Convert to Celsius
celsius = (fahrenheit - 32) * 5/9
This is the formula: C = (F - 32) * 5/9
print("Temperature:", celsius, "°C")`,
      bugLines: [5],
      bugDescriptions: [
        'Text that should be a comment is not marked with #'
      ],
      fixes: [
        'Add # at the beginning to make it a comment: # This is the formula: C = (F - 32) * 5/9'
      ],
      correctCode: `# Temperature converter
fahrenheit = 68
# Convert to Celsius
celsius = (fahrenheit - 32) * 5/9
# This is the formula: C = (F - 32) * 5/9
print("Temperature:", celsius, "°C")`,
      explanation: 'Comments in Python must start with #. Any text without # will be interpreted as code, causing a syntax error.',
      hints: [
        'Line 5 looks like it should be documentation, not code',
        'How do you tell Python to ignore a line?',
        'What symbol starts a comment?'
      ],
      difficulty: 'medium',
      concepts: ['comments', 'syntax']
    },
    {
      id: 'module1-debug-5',
      title: 'Operator Overload',
      code: `# Shopping calculator
item_price = 25.50
quantity = 3
discount = 10  # 10% discount
total = item_price * quantity
discounted_price = total - total * discount
print("Final price: $", discounted_price)`,
      bugLines: [6],
      bugDescriptions: [
        'Discount calculation is wrong - should divide by 100 to convert percentage to decimal'
      ],
      fixes: [
        'Change to: discounted_price = total - total * (discount / 100) or discounted_price = total - total * 0.10'
      ],
      correctCode: `# Shopping calculator
item_price = 25.50
quantity = 3
discount = 10  # 10% discount
total = item_price * quantity
discounted_price = total - total * (discount / 100)
print("Final price: $", discounted_price)`,
      explanation: 'When working with percentages, you need to convert them to decimals by dividing by 100. Using the percentage value directly (10 instead of 0.10) will give incorrect results.',
      hints: [
        'How do you convert a percentage to a decimal?',
        'Is 10% the same as multiplying by 10?',
        'What should 10% be as a decimal?'
      ],
      difficulty: 'hard',
      concepts: ['operators', 'arithmetic', 'math', 'logic']
    }
  ]
};
