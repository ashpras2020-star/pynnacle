import type { DebugGame } from '../../../types/game';

export const module7DebugGame: DebugGame = {
  id: 'debug-module7',
  moduleId: 'module-7',
  title: 'Debug Detective: Functions',
  description: 'Find and fix bugs in function definitions, parameters, return statements, and scope.',
  baseXP: 100,
  bonusXP: 50,
  challenges: [
    {
      id: 'module7-debug-1',
      title: 'Missing Return Statement',
      code: `# Calculate square of a number
def square(num):
    result = num * num

answer = square(5)
print("The square is:", answer)`,
      bugLines: [3],
      bugDescriptions: [
        'Function calculates result but doesn\'t return it'
      ],
      fixes: [
        'Add return statement: return result'
      ],
      correctCode: `# Calculate square of a number
def square(num):
    result = num * num
    return result

answer = square(5)
print("The square is:", answer)`,
      explanation: 'Functions need to return values using the return statement. Without it, the function returns None by default, and the result is lost.',
      hints: [
        'What does the function give back?',
        'How do you send a value back from a function?',
        'The function calculates but doesn\'t...'
      ],
      difficulty: 'easy',
      concepts: ['functions', 'return', 'def']
    },
    {
      id: 'module7-debug-2',
      title: 'Function Definition Syntax',
      code: `# Greet a user
def greet(name)
    print("Hello,", name)
    print("Welcome!")

greet("Alice")`,
      bugLines: [2],
      bugDescriptions: [
        'Missing colon at the end of function definition'
      ],
      fixes: [
        'Add colon at the end: def greet(name):'
      ],
      correctCode: `# Greet a user
def greet(name):
    print("Hello,", name)
    print("Welcome!")

greet("Alice")`,
      explanation: 'Function definitions in Python must end with a colon (:), just like if statements and loops. The colon indicates the start of the function body.',
      hints: [
        'What punctuation is missing from the function definition?',
        'Function definitions need the same symbol as if statements',
        'Check the end of line 2'
      ],
      difficulty: 'easy',
      concepts: ['functions', 'def', 'syntax', 'colons']
    },
    {
      id: 'module7-debug-3',
      title: 'Wrong Number of Arguments',
      code: `# Add three numbers
def add_three(a, b, c):
    return a + b + c

result = add_three(5, 10)
print("Sum:", result)`,
      bugLines: [5],
      bugDescriptions: [
        'Function expects 3 arguments but only 2 are provided'
      ],
      fixes: [
        'Provide all 3 arguments: result = add_three(5, 10, 15)'
      ],
      correctCode: `# Add three numbers
def add_three(a, b, c):
    return a + b + c

result = add_three(5, 10, 15)
print("Sum:", result)`,
      explanation: 'When calling a function, you must provide the correct number of arguments that match the function\'s parameters. Missing arguments will cause a TypeError.',
      hints: [
        'How many parameters does the function expect?',
        'Count the arguments in the function call',
        'What\'s missing from line 5?'
      ],
      difficulty: 'medium',
      concepts: ['functions', 'parameters', 'arguments', 'errors']
    },
    {
      id: 'module7-debug-4',
      title: 'Variable Scope Error',
      code: `# Update counter
def increment():
    counter = counter + 1
    return counter

counter = 0
result = increment()
print("Counter:", result)`,
      bugLines: [3],
      bugDescriptions: [
        'Trying to modify local variable before assignment - need to use global keyword or pass as parameter'
      ],
      fixes: [
        'Add global keyword before modifying: global counter, or pass counter as parameter and return new value'
      ],
      correctCode: `# Update counter
def increment():
    global counter
    counter = counter + 1
    return counter

counter = 0
result = increment()
print("Counter:", result)`,
      explanation: 'Variables defined outside a function are in global scope. To modify them inside a function, use the global keyword. Otherwise, Python creates a new local variable with the same name.',
      hints: [
        'Can the function access the outer counter variable?',
        'What keyword allows modifying global variables?',
        'There\'s a scope issue with the counter variable'
      ],
      difficulty: 'medium',
      concepts: ['functions', 'scope', 'global', 'variables']
    },
    {
      id: 'module7-debug-5',
      title: 'Default Parameter Mistake',
      code: `# Create greeting with optional title
def greet(name, title="Mr."):
    return title + " " + name

print(greet("Smith"))
print(greet("Dr.", "Jones"))`,
      bugLines: [6],
      bugDescriptions: [
        'Arguments are in wrong order - "Dr." is assigned to name and "Jones" to title'
      ],
      fixes: [
        'Use correct order: greet("Jones", "Dr.") or use keyword argument: greet(name="Jones", title="Dr.")'
      ],
      correctCode: `# Create greeting with optional title
def greet(name, title="Mr."):
    return title + " " + name

print(greet("Smith"))
print(greet("Jones", "Dr."))`,
      explanation: 'Function arguments are matched by position unless you use keyword arguments. When using default parameters, provide arguments in the correct order or use name=value syntax.',
      hints: [
        'What order are the arguments expected?',
        'Which parameter is name and which is title?',
        'Are the arguments in the right positions?'
      ],
      difficulty: 'hard',
      concepts: ['functions', 'parameters', 'default', 'arguments', 'order']
    }
  ]
};
