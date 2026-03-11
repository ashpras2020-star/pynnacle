import type { DebugGame } from '../../../types/game';

export const module9DebugGame: DebugGame = {
  id: 'debug-module9',
  moduleId: 'module-9',
  title: 'Debug Detective: Error Handling',
  description: 'Find and fix bugs in try/except blocks, exception handling, and debugging techniques.',
  baseXP: 100,
  bonusXP: 50,
  challenges: [
    {
      id: 'module9-debug-1',
      title: 'Missing Except Block',
      code: `# Handle division
try:
    result = 10 / 0
    print(result)`,
      bugLines: [2, 3, 4],
      bugDescriptions: [
        'Try block without except - every try must have at least one except or finally'
      ],
      fixes: [
        'Add except block: except ZeroDivisionError: print("Cannot divide by zero")'
      ],
      correctCode: `# Handle division
try:
    result = 10 / 0
    print(result)
except ZeroDivisionError:
    print("Cannot divide by zero")`,
      explanation: 'A try block must be followed by at least one except block or a finally block. The except block catches and handles errors that occur in the try block.',
      hints: [
        'What comes after a try block?',
        'How do you catch errors?',
        'Try needs a partner...'
      ],
      difficulty: 'easy',
      concepts: ['try', 'except', 'errors', 'syntax']
    },
    {
      id: 'module9-debug-2',
      title: 'Catching Wrong Exception',
      code: `# Convert string to integer
user_input = "abc"
try:
    number = int(user_input)
    print(number)
except ZeroDivisionError:
    print("Invalid input")`,
      bugLines: [6],
      bugDescriptions: [
        'Catching ZeroDivisionError but int() raises ValueError for invalid strings'
      ],
      fixes: [
        'Change to: except ValueError: or except Exception: to catch the actual error'
      ],
      correctCode: `# Convert string to integer
user_input = "abc"
try:
    number = int(user_input)
    print(number)
except ValueError:
    print("Invalid input")`,
      explanation: 'Each operation can raise specific exceptions. int() raises ValueError for invalid strings, not ZeroDivisionError. Catch the correct exception type or use a general Exception.',
      hints: [
        'What error does int("abc") raise?',
        'Is ZeroDivisionError the right exception?',
        'Think about what operation is being performed'
      ],
      difficulty: 'easy',
      concepts: ['except', 'exceptions', 'ValueError']
    },
    {
      id: 'module9-debug-3',
      title: 'Bare Except',
      code: `# Read file safely
try:
    with open("data.txt", "r") as file:
        content = file.read()
        print(content)
except:
    print("An error occurred")`,
      bugLines: [6],
      bugDescriptions: [
        'Bare except catches all exceptions including system exits and keyboard interrupts - should specify exception types'
      ],
      fixes: [
        'Specify exception: except FileNotFoundError: or except Exception: (but not bare except:)'
      ],
      correctCode: `# Read file safely
try:
    with open("data.txt", "r") as file:
        content = file.read()
        print(content)
except FileNotFoundError:
    print("File not found")
except Exception as e:
    print(f"An error occurred: {e}")`,
      explanation: 'Bare except: catches everything, including KeyboardInterrupt and SystemExit, making it hard to stop your program. Always specify exception types or use except Exception: as a minimum.',
      hints: [
        'What\'s wrong with catching all exceptions?',
        'Should you catch KeyboardInterrupt?',
        'Be specific about what errors you expect'
      ],
      difficulty: 'medium',
      concepts: ['except', 'exceptions', 'best practices']
    },
    {
      id: 'module9-debug-4',
      title: 'Exception Order Error',
      code: `# Handle file operations
try:
    with open("data.txt", "r") as file:
        content = file.read()
except Exception as e:
    print(f"General error: {e}")
except FileNotFoundError:
    print("File not found")`,
      bugLines: [5, 7],
      bugDescriptions: [
        'More specific exception (FileNotFoundError) comes after general exception (Exception) - it will never be reached'
      ],
      fixes: [
        'Reorder: put FileNotFoundError before Exception, or remove the general Exception'
      ],
      correctCode: `# Handle file operations
try:
    with open("data.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("File not found")
except Exception as e:
    print(f"General error: {e}")`,
      explanation: 'Exception handlers are checked in order. Since FileNotFoundError is a subclass of Exception, the general Exception catch-all must come last. Order from specific to general.',
      hints: [
        'Which except block runs first?',
        'Can the second except ever execute?',
        'Order matters - specific exceptions should come...'
      ],
      difficulty: 'medium',
      concepts: ['except', 'exceptions', 'order', 'hierarchy']
    },
    {
      id: 'module9-debug-5',
      title: 'Finally Block Misuse',
      code: `# Ensure cleanup happens
file = None
try:
    file = open("data.txt", "r")
    content = file.read()
    print(content)
except FileNotFoundError:
    print("File not found")
finally:
    file.close()`,
      bugLines: [10],
      bugDescriptions: [
        'If FileNotFoundError occurs, file is None and calling .close() will raise AttributeError'
      ],
      fixes: [
        'Check if file exists: if file: file.close() or better: use with statement which handles this automatically'
      ],
      correctCode: `# Ensure cleanup happens
file = None
try:
    file = open("data.txt", "r")
    content = file.read()
    print(content)
except FileNotFoundError:
    print("File not found")
finally:
    if file:
        file.close()`,
      explanation: 'The finally block always executes, even after exceptions. If the file never opened successfully (file is None), calling .close() will fail. Always check or use "with" statement for automatic cleanup.',
      hints: [
        'What if the file never opened?',
        'Can you call .close() on None?',
        'The finally block runs even when...'
      ],
      difficulty: 'hard',
      concepts: ['finally', 'exceptions', 'cleanup', 'try']
    }
  ]
};
