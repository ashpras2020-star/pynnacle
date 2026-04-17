// Module 9: Error Handling Basics
// 5 lessons covering Python errors, exceptions, try/except, and debugging

import type { Lesson } from '@/types/lesson';

export const module9Lessons: Lesson[] = [
  // Lesson 9-1: Common Python Errors
  {
    id: 'lesson-9-1',
    moduleId: 'module-9',
    courseId: 'beginner',
    title: 'Common Python Errors',
    content: {
      explanation: `Understanding Python Errors 🐛

Welcome to error handling! Here's a secret: EVERY programmer encounters errors daily - even experts with decades of experience! Errors aren't signs of failure; they're Python's way of communicating with you, explaining what went wrong so you can fix it. Learning to read and understand errors is one of the most valuable programming skills you'll develop!

<strong>The three categories of errors you'll encounter:</strong>

<strong>1. Syntax Errors - "You broke Python's grammar rules!"</strong>

Syntax errors are like grammatical mistakes in writing. Python has strict rules about how code must be structured, and syntax errors mean you violated these rules. The good news? Python catches these BEFORE your code runs, pointing directly to the problem!

Common syntax errors include:
• Forgetting colons after if, for, while, def statements
• Mismatched parentheses, brackets, or quotes
• Incorrect indentation (Python is VERY picky about indentation!)
• Using reserved keywords as variable names

Example:
\`\`\`python
if x > 5  # SyntaxError: missing colon!
    print(x)
\`\`\`

When you see a syntax error, Python won't even try to run your code. Look at the line number in the error message and check for missing colons, unmatched quotes, or indentation problems.

<strong>2. Runtime Errors (Exceptions) - "Your code ran but something went wrong!"</strong>

Runtime errors (also called exceptions) happen when Python encounters a problem while executing valid code. The syntax is perfect, but the operation you're trying to perform is impossible or invalid. These are the errors you'll handle with try-except blocks!

Runtime errors include:
• Dividing by zero
• Accessing an invalid list index
• Opening a file that doesn't exist
• Converting invalid data types
• Using an undefined variable

Example:
\`\`\`python
numbers = [1, 2, 3]
print(numbers[10])  # IndexError: list index out of range
\`\`\`

The code is grammatically correct, but you can't access index 10 in a 3-item list!

<strong>3. Logic Errors - "Your code runs but gives wrong results!"</strong>

Logic errors are the sneakiest! Your code runs without crashes, but it doesn't do what you intended. Python can't help you with these - only careful testing and debugging will find them.

Examples:
• Using < instead of > in a comparison
• Calculating average but forgetting to divide
• Processing data in the wrong order
• Off-by-one errors in loops

\`\`\`python
# Bug: prints 0-9 instead of 1-10
for i in range(10):  # Should be range(1, 11)
    print(i)
\`\`\`

Logic errors require detective work - add print statements, test edge cases, and verify your assumptions!

<strong>The exception types you'll see most often:</strong>

<strong>ValueError - "The value is wrong!"</strong>

Raised when you pass a value of the right type but with an invalid value:
\`\`\`python
int("hello")  # ValueError: can't convert 'hello' to integer
int("25")     # Works fine - valid integer string
\`\`\`

Common causes:
• Converting non-numeric strings to numbers
• Passing numbers outside valid ranges
• Invalid values in function parameters

<strong>TypeError - "You're using the wrong type!"</strong>

Raised when you perform an operation on incompatible types:
\`\`\`python
"5" + 5        # TypeError: can't add string and integer
len(123)       # TypeError: len() needs a sequence, not int
"hello"[1.5]   # TypeError: indices must be integers
\`\`\`

Common causes:
• Mixing strings and numbers in operations
• Using wrong type for function arguments
• Forgetting to convert types before operations

<strong>IndexError - "That list position doesn't exist!"</strong>

Raised when you try to access an invalid position in a list or sequence:
\`\`\`python
my_list = [1, 2, 3]
my_list[0]   # Fine - valid index
my_list[3]   # IndexError - list has indices 0, 1, 2 only!
my_list[-1]  # Fine - negative indices work from the end
\`\`\`

Remember: Python lists are zero-indexed! A list with 3 items has indices 0, 1, and 2.

<strong>KeyError - "That dictionary key doesn't exist!"</strong>

Raised when you try to access a non-existent dictionary key:
\`\`\`python
user = {'name': 'Alice', 'age': 25}
print(user['name'])   # Fine
print(user['email'])  # KeyError: 'email' doesn't exist
\`\`\`

Safer alternatives:
• Use \`.get()\`: user.get('email', 'no email')
• Check first: if 'email' in user:
• Use try-except for error handling

<strong>FileNotFoundError - "That file doesn't exist!"</strong>

Raised when you try to open a file that Python can't find:
\`\`\`python
open('missing.txt', 'r')  # FileNotFoundError
\`\`\`

Common causes:
• Wrong filename or path
• File in different directory than expected
• Typo in filename
• File actually doesn't exist

<strong>ZeroDivisionError - "You can't divide by zero!"</strong>

Raised when the denominator in division is zero:
\`\`\`python
10 / 0    # ZeroDivisionError
10 / 2    # Fine - returns 5.0
\`\`\`

This often happens with dynamic calculations where you don't realize the divisor can be zero!

<strong>NameError - "That variable doesn't exist!"</strong>

Raised when you use a variable that hasn't been defined:
\`\`\`python
print(my_variable)  # NameError: name 'my_variable' is not defined
\`\`\`

Common causes:
• Typos in variable names (remember: Python is case-sensitive!)
• Using variables before defining them
• Scope issues (using variables outside where they're defined)

<strong>How to read Python error messages like a pro:</strong>

When Python shows an error, it provides incredibly valuable information if you know how to read it:

\`\`\`
Traceback (most recent call last):
  File "main.py", line 10, in <module>
    result = calculate(numbers)
  File "main.py", line 5, in calculate
    return sum(values) / len(values)
ZeroDivisionError: division by zero
\`\`\`

Reading from bottom to top:
1. <strong>Error Type:</strong> ZeroDivisionError - tells you what went wrong
2. <strong>Error Description:</strong> "division by zero" - explains the specific problem
3. <strong>Location:</strong> Line 5 in the calculate function - where the error happened
4. <strong>Traceback:</strong> Shows the call stack - how you got there (line 10 called calculate)

<strong>The traceback is your friend!</strong> It shows the sequence of function calls that led to the error, helping you understand the context.

<strong>Best practices for dealing with errors:</strong>

✅ <strong>Read the error message carefully</strong> - It tells you exactly what's wrong
✅ <strong>Check the line number</strong> - But sometimes the real problem is on the line before!
✅ <strong>Look at the error type</strong> - Each type suggests specific solutions
✅ <strong>Use the traceback</strong> - It shows the sequence of events leading to the error
✅ <strong>Search error messages</strong> - Copy-pasting error messages into Google often finds solutions
✅ <strong>Don't panic</strong> - Errors are normal and fixable!

<strong>Common patterns that cause errors:</strong>

⚠️ Off-by-one errors: \`for i in range(len(list)):\` then accessing \`list[i+1]\`
⚠️ Forgetting to convert types: \`int_value = "5" + 10\` instead of \`int("5") + 10\`
⚠️ Empty containers: \`max([])\` fails because you can't find the max of nothing
⚠️ Case sensitivity: \`Age\` and \`age\` are different variables
⚠️ Integer division confusion: \`5 / 2\` gives 2.5, while \`5 // 2\` gives 2

<strong>Developing an error-handling mindset:</strong>

Professional programmers don't avoid errors - they anticipate them! When you write code, think about:
• What could go wrong?
• What if the user enters invalid input?
• What if the file doesn't exist?
• What if the list is empty?
• What if the number is zero?

This mindset leads to robust, professional code that handles edge cases gracefully!

Remember: Every error message is Python teaching you something. Don't get frustrated - get curious! Read the message, understand what it's telling you, and learn from it. Soon you'll recognize errors instantly and know exactly how to fix them!
`,
      codeExamples: [
        {
          title: 'ValueError Examples',
          code: `# Invalid conversions
try:
    age = int("twenty")  # ValueError
except ValueError:
    print("Cannot convert 'twenty' to integer")

try:
    number = float("abc")  # ValueError
except ValueError:
    print("Cannot convert 'abc' to float")

# Valid conversions
age = int("25")  # Works fine
print(age)`,
          explanation: 'ValueError occurs when value is wrong type for conversion'
        },
        {
          title: 'TypeError Examples',
          code: `# Type mismatches
try:
    result = "5" + 5  # TypeError: can't add string and int
except TypeError:
    print("Cannot add string and number")
    result = int("5") + 5  # Convert first
    print(f"Result: {result}")

try:
    length = len(123)  # TypeError: len() needs sequence
except TypeError:
    print("len() requires a sequence, not integer")`,
          explanation: 'TypeError occurs when operation is invalid for the type'
        },
        {
          title: 'IndexError Examples',
          code: `my_list = [10, 20, 30]

# Valid access
print(my_list[0])  # 10
print(my_list[2])  # 30

# Invalid access
try:
    print(my_list[5])  # IndexError
except IndexError:
    print("Index out of range")
    print(f"List has {len(my_list)} items")

# Negative indices work differently
print(my_list[-1])  # Last item: 30`,
          explanation: 'IndexError occurs when accessing invalid list index'
        },
        {
          title: 'KeyError Examples',
          code: `user = {
    'name': 'Alice',
    'age': 25,
    'city': 'Boston'
}

# Valid access
print(user['name'])  # Alice

# Invalid access
try:
    print(user['email'])  # KeyError
except KeyError:
    print("Email key doesn't exist")

# Safe access with get()
email = user.get('email', 'No email')
print(email)  # "No email"

# Check if key exists
if 'email' in user:
    print(user['email'])
else:
    print("Email not found")`,
          explanation: 'KeyError occurs when dictionary key doesn\'t exist'
        },
        {
          title: 'Understanding Error Messages',
          code: `# Example error message:
"""
Traceback (most recent call last):
  File "main.py", line 10, in <module>
    result = calculate_average(scores)
  File "main.py", line 5, in calculate_average
    return sum(values) / len(values)
ZeroDivisionError: division by zero
"""

# Reading it:
# 1. Error type: ZeroDivisionError
# 2. Location: line 5 in calculate_average function
# 3. Problem: division by zero (empty list)
# 4. Call stack: main.py line 10 called the function

def calculate_average(values):
    if not values:  # Fix: check for empty list
        return 0
    return sum(values) / len(values)`,
          explanation: 'Error messages show where and why code failed'
        }
      ],
      concepts: ['errors', 'exceptions', 'ValueError', 'TypeError', 'IndexError', 'KeyError', 'error messages', 'traceback']
    },
    starterCode: `# TODO: Try to convert the string "abc" to an integer
# TODO: This will cause a ValueError - that's expected!
# TODO: Run the code and read the error message
# TODO: Then comment out that line and try a valid conversion

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Demonstrates understanding of errors'
      }
    ],
    hints: [
      'Try: number = int("abc")',
      'Read the error message that appears',
      'Comment it out with #',
      'Try valid: number = int("123")'
    ],
    challenge: {
      prompt: `Identify different error types:
1. Try to access index 10 in a list [1, 2, 3]
2. Comment that line and note the error type
3. Try to divide 10 by 0
4. Comment that and note the error type
5. Print what you learned about error messages`,
      starterCode: '# Write your solution here\n',
      solution: '# numbers = [1, 2, 3]\n# print(numbers[10])  # IndexError\n\n# result = 10 / 0  # ZeroDivisionError\n\nprint("IndexError happens when accessing invalid index")\nprint("ZeroDivisionError happens when dividing by zero")',
      tests: [],
      explanation: 'Each error type has a specific name! Reading error messages helps you understand what went wrong.',
      hints: [
        'Try: numbers[10] for IndexError',
        'Try: 10 / 0 for ZeroDivisionError',
        'Comment out errors with #'
      ],
      xpReward: 500,
    },
    xpReward: 100,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 9-2: Try and Except Blocks
  {
    id: 'lesson-9-2',
    moduleId: 'module-9',
    courseId: 'beginner',
    title: 'Try and Except Blocks',
    content: {
      explanation: `Mastering Try-Except Blocks 🛡️

Try-except blocks are Python's way of saying "attempt this, and if it fails, I've got a backup plan!" They transform your programs from fragile code that crashes at the first problem into robust applications that handle errors gracefully. This is THE difference between code that works in your controlled environment and code that survives in the real world!

<strong>Understanding the basic try-except structure:</strong>

The syntax is beautifully simple and reads like plain English:

\`\`\`python
try:
    # Code that might cause an error
    risky_operation()
except:
    # Code to run if an error occurs
    print("Oops! Something went wrong")
\`\`\`

Think of it like a safety net when walking a tightrope. The try block is you attempting the risky walk, and the except block is the net that catches you if you fall. Either way, the show continues!

<strong>How Python executes try-except - Step by step:</strong>

1. <strong>Python enters the try block</strong> and starts executing code line by line
2. <strong>If everything goes smoothly:</strong> Python skips the except block entirely and continues after the try-except
3. <strong>If an error occurs:</strong> Python IMMEDIATELY jumps to the except block, skipping any remaining code in the try block
4. <strong>After handling the exception:</strong> The program continues normally - no crash!

\`\`\`python
try:
    print("Starting...")
    x = int("hello")  # Error occurs here!
    print("This never prints")  # Skipped!
except:
    print("Error handled!")  # Jumps here
print("Program continues...")  # Still runs!
\`\`\`

<strong>Why exception handling is absolutely critical:</strong>

<strong>1. Prevents catastrophic crashes</strong>

Without try-except, a single error crashes your entire program:
\`\`\`python
# Without exception handling - CRASH!
age = int(input("Enter age: "))  # User types "twenty" - program dies!
print(f"You are {age}")  # Never runs

# With exception handling - GRACEFUL!
try:
    age = int(input("Enter age: "))
    print(f"You are {age}")
except:
    print("Please enter a number!")
# Program continues happily
\`\`\`

<strong>2. Creates professional, user-friendly applications</strong>

Users don't want to see scary tracebacks! Compare these experiences:

Bad (no error handling):
\`\`\`
Traceback (most recent call last):
  File "program.py", line 3, in <module>
    age = int(input("Enter age: "))
ValueError: invalid literal for int() with base 10: 'twenty'
\`\`\`

Good (with error handling):
\`\`\`
Please enter a valid number for your age.
\`\`\`

Which would you rather see as a user?

<strong>3. Enables graceful degradation</strong>

When things go wrong, good programs have fallback strategies:
\`\`\`python
try:
    with open('settings.txt', 'r') as file:
        settings = file.read()
except FileNotFoundError:
    print("Using default settings")
    settings = "default configuration"
\`\`\`

The program works even when the settings file is missing!

<strong>4. Validates user input robustly</strong>

Users make mistakes! They type letters instead of numbers, leave fields blank, enter negative ages, or do completely unexpected things. Exception handling lets you validate input without complex if-statements:

\`\`\`python
while True:
    try:
        age = int(input("Enter your age: "))
        if age < 0:
            print("Age can't be negative!")
            continue
        break  # Valid input, exit loop
    except ValueError:
        print("Please enter a number!")

print(f"Age entered: {age}")
\`\`\`

This loops until the user provides valid input - robust and user-friendly!

<strong>When to use try-except - The essential scenarios:</strong>

✅ <strong>User input validation:</strong> Any time users enter data that needs conversion or validation
✅ <strong>File operations:</strong> Files might not exist, be inaccessible, or be corrupted
✅ <strong>Network requests:</strong> Network connections fail, timeout, or return unexpected data
✅ <strong>Type conversions:</strong> Converting strings to numbers, parsing dates, etc.
✅ <strong>Division operations:</strong> The denominator might be zero
✅ <strong>Dictionary/list access:</strong> Keys or indices might not exist
✅ <strong>External resource access:</strong> Databases, APIs, hardware devices can fail

<strong>Best practices for effective exception handling:</strong>

<strong>1. Keep try blocks small and focused</strong>

Don't wrap your entire program in one giant try-except! Only wrap code that might actually fail:

❌ Bad (too broad):
\`\`\`python
try:
    # 100 lines of code
    # Hard to know what failed!
except:
    print("Something went wrong somewhere!")
\`\`\`

✅ Good (focused):
\`\`\`python
name = input("Name: ")  # This can't fail
try:
    age = int(input("Age: "))  # This can fail
except ValueError:
    print("Age must be a number")
    age = 0
\`\`\`

<strong>2. Provide helpful, specific error messages</strong>

Tell users what went wrong AND what to do about it:

❌ Bad:
\`\`\`python
except:
    print("Error!")  # What error? What should I do?
\`\`\`

✅ Good:
\`\`\`python
except ValueError:
    print("Invalid input! Please enter a whole number for age.")
    print("Example: 25")
\`\`\`

<strong>3. Don't hide errors silently</strong>

Never use empty except blocks - you'll have no idea when things fail!

❌ <strong>Really bad</strong> (silent failures):
\`\`\`python
try:
    risky_operation()
except:
    pass  # Silently ignores all errors - debugging nightmare!
\`\`\`

✅ Good (at minimum, log errors):
\`\`\`python
try:
    risky_operation()
except Exception as e:
    print(f"Operation failed: {e}")
\`\`\`

<strong>4. Use for expected errors, not bugs</strong>

Try-except is for handling expected problems in the real world, NOT for hiding bugs in your code!

Wrong use (hiding bugs):
\`\`\`python
try:
    result = calculate_complex_thing()
except:
    result = 0  # Hiding calculation bugs!
\`\`\`

Right use (handling expected issues):
\`\`\`python
try:
    with open('user_data.txt', 'r') as file:
        data = file.read()
except FileNotFoundError:
    # Expected scenario - file might not exist yet
    data = create_default_data()
\`\`\`

<strong>5. Don't catch exceptions you can't handle</strong>

If you don't know how to handle an error, let it crash! The traceback helps debugging:

\`\`\`python
try:
    critical_database_operation()
except:
    pass  # BAD - Database errors need attention!
\`\`\`

<strong>Common patterns you'll use constantly:</strong>

<strong>Safe type conversion:</strong>
\`\`\`python
try:
    number = int(user_input)
except ValueError:
    print("Invalid number, using default")
    number = 0
\`\`\`

<strong>Safe file reading:</strong>
\`\`\`python
try:
    with open('data.txt', 'r') as file:
        content = file.read()
except FileNotFoundError:
    print("File not found, creating new one")
    content = ""
\`\`\`

<strong>Input validation loop:</strong>
\`\`\`python
while True:
    try:
        value = int(input("Enter number: "))
        break
    except ValueError:
        print("Invalid! Try again.")
\`\`\`

<strong>Safe function calls:</strong>
\`\`\`python
def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None
\`\`\`

<strong>What NOT to do - Common anti-patterns:</strong>

⚠️ <strong>Bare except:</strong> (catches everything, even KeyboardInterrupt!)
\`\`\`python
try:
    code()
except:  # BAD - too broad!
    pass
\`\`\`

⚠️ <strong>Silent failures:</strong>
\`\`\`python
try:
    important_operation()
except:
    pass  # BAD - hiding errors!
\`\`\`

⚠️ <strong>Too broad try blocks:</strong>
\`\`\`python
try:
    # Hundreds of lines
    # Which line failed?
except:
    print("Error somewhere!")
\`\`\`

⚠️ <strong>Using exceptions for control flow:</strong>
\`\`\`python
try:
    value = my_dict[key]  # DON'T do this
except:
    value = default

# Better:
value = my_dict.get(key, default)
\`\`\`

<strong>The mental model - When to use try-except:</strong>

Ask yourself:
1. <strong>Can this fail for reasons beyond my control?</strong> (user input, files, network) → Use try-except
2. <strong>Is this a bug in my code?</strong> (logic error, wrong algorithm) → Fix it, don't catch it
3. <strong>Am I prepared to handle this failure meaningfully?</strong> → If no, let it crash with a clear error

Exception handling is about being prepared for the unpredictable real world while letting genuine bugs surface clearly. Master this balance, and you'll write code that's both robust and debuggable!

Remember: Try-except is your safety net, not a bandaid for buggy code. Use it wisely to handle expected failures gracefully while letting unexpected issues crash with helpful error messages!
`,
      codeExamples: [
        {
          title: 'Basic Try-Except',
          code: `# Without exception handling (crashes)
# age = int(input("Enter age: "))  # Crashes on "twenty"

# With exception handling (graceful)
try:
    age = int(input("Enter age: "))
    print(f"You are {age} years old")
except:
    print("Please enter a valid number")

print("Program continues...")`,
          explanation: 'try-except prevents program crashes'
        },
        {
          title: 'Handling Division by Zero',
          code: `def safe_divide(a, b):
    """Divide two numbers safely"""
    try:
        result = a / b
        return result
    except:
        print("Error: Cannot divide by zero")
        return None

# Test it
print(safe_divide(10, 2))   # 5.0
print(safe_divide(10, 0))   # Error message, returns None
print(safe_divide(15, 3))   # 5.0`,
          explanation: 'Handle division by zero gracefully'
        },
        {
          title: 'Input Validation Loop',
          code: `# Keep asking until valid input
while True:
    try:
        age = int(input("Enter your age: "))
        if age < 0:
            print("Age cannot be negative")
            continue
        break  # Valid input, exit loop
    except:
        print("Please enter a number")

print(f"Age entered: {age}")`,
          explanation: 'Use try-except in loops for input validation'
        },
        {
          title: 'Multiple Operations',
          code: `def process_data(numbers, index):
    """Process data with error handling"""
    try:
        # Multiple things that could fail
        value = numbers[index]
        doubled = value * 2
        as_string = str(doubled)
        return as_string
    except:
        print("Something went wrong")
        return "Error"

# Test cases
nums = [10, 20, 30]
print(process_data(nums, 0))   # "20"
print(process_data(nums, 10))  # "Error" (IndexError)`,
          explanation: 'try-except can handle multiple potential errors'
        },
        {
          title: 'File Operations',
          code: `def read_file_safe(filename):
    """Read file with error handling"""
    try:
        with open(filename, 'r') as file:
            content = file.read()
            return content
    except:
        print(f"Could not read file: {filename}")
        return None

# Usage
content = read_file_safe('data.txt')
if content:
    print(content)
else:
    print("Using default data instead")
    content = "Default content"`,
          explanation: 'Handle file errors gracefully'
        }
      ],
      concepts: ['try', 'except', 'exception handling', 'error handling', 'input validation', 'graceful degradation']
    },
    starterCode: `# TODO: Write a function safe_square_root(n) that:
# TODO: 1. Tries to calculate and return the square root (n ** 0.5)
# TODO: 2. If error occurs, prints error message and returns 0
# TODO: 3. Test with both valid numbers and invalid inputs

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Uses try-except to handle potential errors'
      }
    ],
    hints: [
      'Define: def safe_square_root(n):',
      'Put calculation in try block: result = n ** 0.5',
      'Add except block to catch errors',
      'Test with safe_square_root(16) and safe_square_root("hello")'
    ],
    challenge: {
      prompt: `Create a safe division function:
1. Write safe_divide(a, b) function
2. Use try to attempt: result = a / b
3. Use except to catch errors and return 0
4. Return the result if successful
5. Test with safe_divide(10, 2) and safe_divide(10, 0)`,
      starterCode: '# Write your solution here\n',
      solution: 'def safe_divide(a, b):\n    try:\n        result = a / b\n        return result\n    except:\n        print("Error: Cannot divide")\n        return 0\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))',
      tests: [],
      explanation: 'Try-except prevents crashes! Put risky code in try, handle errors in except.',
      hints: [
        'Structure: try: ... except: ...',
        'Put division in try block',
        'Return 0 in except block'
      ],
      xpReward: 500,
    },
    xpReward: 100,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 9-3: Catching Specific Exceptions
  {
    id: 'lesson-9-3',
    moduleId: 'module-9',
    courseId: 'beginner',
    title: 'Catching Specific Exceptions',
    content: {
      explanation: `Catching Specific Exceptions - The Professional Approach 🎯

While bare \`except:\` blocks catch any error, professional Python code uses SPECIFIC exception types. This is one of those "beginner vs. professional" distinctions - it's the difference between code that "works" and code that's robust, debuggable, and maintainable!

<strong>The syntax for catching specific exceptions:</strong>

Instead of catching everything, specify which exception types you expect:

\`\`\`python
try:
    age = int(user_input)
except ValueError:
    print("Please enter a number!")
except TypeError:
    print("Wrong data type provided!")
\`\`\`

Notice we tell Python EXACTLY which errors we're prepared to handle. Any other error (like NameError or AttributeError) will still crash - and that's a good thing!

<strong>Why specific exception handling is crucial - The five critical reasons:</strong>

<strong>1. Different errors need different responses</strong>

A missing file and an invalid number are completely different problems requiring different solutions:

\`\`\`python
try:
    with open(filename, 'r') as file:
        data = file.read()
        value = int(data)
except FileNotFoundError:
    print(f"File '{filename}' doesn't exist - creating new one")
    create_default_file(filename)
except ValueError:
    print("File contains invalid number format")
    value = 0
\`\`\`

With specific exceptions, you handle each case appropriately!

<strong>2. Provide precise, helpful error messages</strong>

Specific exceptions let you tell users exactly what went wrong:

❌ Generic (unhelpful):
\`\`\`python
except:
    print("Error!")  # What error?? What do I do??
\`\`\`

✅ Specific (helpful):
\`\`\`python
except ValueError:
    print("Invalid number format. Please enter digits only (e.g., 25)")
except FileNotFoundError:
    print(f"Cannot find '{filename}'. Check the path and try again.")
\`\`\`

<strong>3. Don't accidentally hide bugs</strong>

Bare \`except:\` catches EVERYTHING - including bugs you didn't anticipate! This makes debugging nightmarish:

\`\`\`python
try:
    result = calculate_complex_value(data)
    prosess_result(result)  # Typo: "prosess" instead of "process"
except:
    print("Calculation failed")  # Hides the NameError from typo!
\`\`\`

With specific exceptions, only EXPECTED errors are caught. The typo would crash with a clear NameError, letting you fix it immediately!

<strong>4. Makes code self-documenting</strong>

When someone reads your code, specific exceptions show what problems you anticipated:

\`\`\`python
try:
    with open(config_file, 'r') as f:
        config = json.load(f)
except FileNotFoundError:
    # Reader knows: "Ah, they expected the file might be missing"
    config = default_config()
except json.JSONDecodeError:
    # Reader knows: "They expected the JSON might be malformed"
    config = default_config()
\`\`\`

This is self-documenting code that explains your thinking!

<strong>5. Unexpected errors crash loudly during development</strong>

When developing, you WANT unexpected errors to crash with full tracebacks - that's how you find bugs! Specific exceptions let expected errors pass gracefully while unexpected ones crash informatively.

<strong>Multiple except blocks - Handling different errors differently:</strong>

You can chain multiple except blocks to handle each error type uniquely:

\`\`\`python
try:
    user_input = input("Enter a number: ")
    number = int(user_input)
    result = 100 / number
    print(f"Result: {result}")
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except KeyboardInterrupt:
    print("\\nOperation cancelled by user")
\`\`\`

Python checks each except block in order until it finds a match!

<strong>Catching multiple exception types together - Group similar handling:</strong>

Sometimes different exceptions need the same response. Group them together:

\`\`\`python
try:
    result = perform_calculation(a, b, operation)
except (ValueError, TypeError):
    # Both indicate invalid input - handle the same way
    print("Invalid input for calculation")
except (FileNotFoundError, PermissionError):
    # Both are file access issues
    print("Cannot access required files")
\`\`\`

This is cleaner than repeating the same handling code in multiple except blocks!

<strong>Accessing error details with 'as' - Get the exception object:</strong>

Use \`as\` to capture the exception object and access its information:

\`\`\`python
try:
    value = int(user_input)
except ValueError as e:
    print(f"Conversion failed: {e}")
    print(f"You entered: {user_input}")
\`\`\`

The exception object contains:
• A description of what went wrong
• Sometimes suggestions for fixing it
• Details about the invalid value
• The exception type

This is invaluable for debugging and providing detailed error messages!

<strong>Real-world example - Comprehensive error handling:</strong>

\`\`\`python
def load_user_data(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            data = json.load(file)
            age = int(data['age'])
            return data
    except FileNotFoundError as e:
        print(f"User file not found: {e}")
        print("Creating new user profile...")
        return create_new_user()
    except json.JSONDecodeError as e:
        print(f"Corrupted user file: {e}")
        print("Please restore from backup")
        return None
    except KeyError as e:
        print(f"Missing required field: {e}")
        print("User data incomplete")
        return None
    except ValueError as e:
        print(f"Invalid data type: {e}")
        return None
    except PermissionError:
        print("No permission to read user file")
        return None
\`\`\`

Each error is handled specifically with appropriate messages and actions!

<strong>Exception hierarchy - Order matters!</strong>

Python exceptions follow a hierarchy. More specific exceptions must come BEFORE more general ones:

✅ Correct order:
\`\`\`python
try:
    risky_code()
except ValueError:        # Specific
    handle_value_error()
except TypeError:         # Specific
    handle_type_error()
except Exception:         # General (catches anything not caught above)
    handle_other_errors()
\`\`\`

❌ Wrong order (ValueError never caught!):
\`\`\`python
try:
    risky_code()
except Exception:         # Catches everything - too early!
    handle_any_error()
except ValueError:        # Never reached!
    handle_value_error()
\`\`\`

<strong>The exception hierarchy - Know your family tree:</strong>

All exceptions inherit from BaseException:
• BaseException (don't catch this!)
  • SystemExit (don't catch this!)
  • KeyboardInterrupt (don't catch this!)
  • Exception (THIS is what you should catch for "any error")
    • ValueError
    • TypeError
    • IndexError
    • KeyError
    • FileNotFoundError
    • ... and many more

<strong>Never catch BaseException</strong> - it includes KeyboardInterrupt (Ctrl+C) and SystemExit, which should always work!

<strong>Best practices for specific exception handling:</strong>

✅ <strong>Catch only exceptions you can handle meaningfully</strong>
If you don't know what to do with an error, let it crash!

✅ <strong>Order from specific to general</strong>
Put specific exceptions first, general ones last

✅ <strong>Use 'as' to get error details</strong>
Provide informative messages with actual error information

✅ <strong>Group similar exceptions when appropriate</strong>
\`except (TypeError, ValueError):\` for similar handling

✅ <strong>Let unexpected exceptions crash</strong>
During development, see all the tracebacks!

✅ <strong>Document why you're catching each exception</strong>
Comments explaining what could cause each error help maintainability

<strong>Common patterns you'll use:</strong>

<strong>Safe type conversion:</strong>
\`\`\`python
try:
    return int(value)
except ValueError:
    return default_value
except TypeError:
    return default_value
\`\`\`

<strong>File operations:</strong>
\`\`\`python
try:
    with open(filename) as f:
        return f.read()
except FileNotFoundError:
    return None
except PermissionError:
    print("Access denied")
    return None
\`\`\`

<strong>API calls:</strong>
\`\`\`python
try:
    response = api_call()
    return response.json()
except ConnectionError:
    print("Network error")
    return None
except TimeoutError:
    print("Request timed out")
    return None
except json.JSONDecodeError:
    print("Invalid response format")
    return None
\`\`\`

<strong>What NOT to do - Common mistakes:</strong>

⚠️ <strong>Using bare except:</strong>
\`\`\`python
except:  # Catches EVERYTHING including Ctrl+C!
\`\`\`

⚠️ <strong>Catching Exception too broadly:</strong>
\`\`\`python
except Exception:  # Better than bare except, but still very broad
\`\`\`
Use this only as a last resort after specific exceptions!

⚠️ <strong>Wrong order:</strong>
\`\`\`python
except Exception:  # Too general first
except ValueError: # Never reached!
\`\`\`

⚠️ <strong>Ignoring exception details:</strong>
\`\`\`python
except ValueError:
    print("Error")  # No details - hard to debug!
# Better:
except ValueError as e:
    print(f"Invalid value: {e}")
\`\`\`

<strong>Developing the right mindset:</strong>

When writing try-except blocks, ask yourself:
1. "What specific errors could this code raise?"
2. "How should I handle each one?"
3. "What unexpected errors should I NOT catch?"

This leads to robust code that handles expected problems gracefully while letting bugs surface clearly!

Specific exception handling is the mark of professional Python code. It makes your programs more reliable, debuggable, and maintainable. Always prefer specific exceptions over catching everything!
`,
      codeExamples: [
        {
          title: 'Catching Specific Exceptions',
          code: `def convert_to_number(value):
    """Convert value to number with specific error handling"""
    try:
        return int(value)
    except ValueError:
        print(f"'{value}' is not a valid number")
        return 0
    except TypeError:
        print(f"Cannot convert {type(value)} to integer")
        return 0

# Test cases
print(convert_to_number("42"))     # 42
print(convert_to_number("hello"))  # ValueError message, returns 0
print(convert_to_number([1, 2]))   # TypeError message, returns 0`,
          explanation: 'Different exceptions get different handling'
        },
        {
          title: 'Multiple Exception Handlers',
          code: `def access_list_item(my_list, index):
    """Access list with detailed error handling"""
    try:
        return my_list[index]
    except IndexError:
        print(f"Index {index} is out of range")
        print(f"List has {len(my_list)} items (0 to {len(my_list)-1})")
        return None
    except TypeError:
        print("Index must be an integer")
        return None

# Test cases
numbers = [10, 20, 30]
print(access_list_item(numbers, 1))      # 20
print(access_list_item(numbers, 10))     # IndexError message
print(access_list_item(numbers, "two"))  # TypeError message`,
          explanation: 'Each exception type gets appropriate handling'
        },
        {
          title: 'Grouping Similar Exceptions',
          code: `def calculate(a, b, operation):
    """Perform calculation with grouped error handling"""
    try:
        if operation == 'add':
            return a + b
        elif operation == 'subtract':
            return a - b
        elif operation == 'multiply':
            return a * b
        elif operation == 'divide':
            return a / b
    except (TypeError, ValueError):
        print("Invalid input types or values")
        return None
    except ZeroDivisionError:
        print("Cannot divide by zero")
        return None

# Test cases
print(calculate(10, 5, 'add'))        # 15
print(calculate("10", 5, 'add'))      # TypeError message
print(calculate(10, 0, 'divide'))     # ZeroDivisionError message`,
          explanation: 'Group related exceptions together'
        },
        {
          title: 'Accessing Error Details',
          code: `def open_and_read(filename):
    """Open file with detailed error information"""
    try:
        with open(filename, 'r') as file:
            return file.read()
    except FileNotFoundError as e:
        print(f"Error details: {e}")
        print(f"File '{filename}' does not exist")
        return None
    except PermissionError as e:
        print(f"Error details: {e}")
        print(f"No permission to read '{filename}'")
        return None

# Usage
content = open_and_read('missing.txt')
# Error details: [Errno 2] No such file or directory: 'missing.txt'
# File 'missing.txt' does not exist`,
          explanation: 'Use as to get error details'
        },
        {
          title: 'Comprehensive Example: User Input',
          code: `def get_valid_age():
    """Get age from user with comprehensive error handling"""
    while True:
        try:
            age_input = input("Enter your age: ")

            # Convert to integer
            age = int(age_input)

            # Validate range
            if age < 0:
                raise ValueError("Age cannot be negative")
            if age > 150:
                raise ValueError("Age seems unrealistic")

            return age

        except ValueError as e:
            # Catches both int() conversion and our custom raises
            print(f"Invalid age: {e}")
        except KeyboardInterrupt:
            # User pressed Ctrl+C
            print("\\nInput cancelled")
            return None
        except Exception as e:
            # Catch unexpected errors
            print(f"Unexpected error: {e}")
            return None

# Usage
age = get_valid_age()
if age:
    print(f"Age recorded: {age}")`,
          explanation: 'Combine multiple specific exception handlers'
        }
      ],
      concepts: ['specific exceptions', 'multiple except blocks', 'exception grouping', 'as keyword', 'error details', 'ValueError', 'TypeError', 'ZeroDivisionError']
    },
    starterCode: `# TODO: Write a function divide_numbers(a, b) that:
# TODO: 1. Tries to divide a by b
# TODO: 2. Catches ZeroDivisionError specifically and prints "Cannot divide by zero"
# TODO: 3. Catches TypeError specifically and prints "Both inputs must be numbers"
# TODO: 4. Returns the result or None on error

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Catches specific exception types'
      }
    ],
    hints: [
      'Use except ZeroDivisionError: for division by zero',
      'Use except TypeError: for type errors',
      'Return result on success, None on error'
    ],
    challenge: {
      prompt: `Handle specific errors:
1. Write get_list_item(items, index) function
2. Try to return items[index]
3. Catch IndexError with message "Index out of range"
4. Catch TypeError with message "Invalid index type"
5. Test with different inputs`,
      starterCode: '# Write your solution here\n',
      solution: 'def get_list_item(items, index):\n    try:\n        return items[index]\n    except IndexError:\n        print("Index out of range")\n        return None\n    except TypeError:\n        print("Invalid index type")\n        return None\n\nitems = [1, 2, 3]\nprint(get_list_item(items, 1))\nprint(get_list_item(items, 10))\nprint(get_list_item(items, "hello"))',
      tests: [],
      explanation: 'Catch specific exceptions to handle different errors differently! IndexError for bad index, TypeError for wrong types.',
      hints: [
        'Multiple except blocks for different errors',
        'except IndexError: for out of range',
        'except TypeError: for wrong type'
      ],
      xpReward: 500,
    },
    xpReward: 125,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 9-4: Finally and Else in Exception Handling
  {
    id: 'lesson-9-4',
    moduleId: 'module-9',
    courseId: 'beginner',
    title: 'Finally and Else in Exception Handling',
    content: {
      explanation: `Finally and Else - Advanced Exception Control 🎭

You've mastered try and except - now let's add two powerful features that give you even more control over error handling: \`else\` and \`finally\`. These clauses let you specify code that runs only on success, code that ALWAYS runs regardless of errors, or both! Understanding these takes your exception handling from good to professional-grade.

<strong>The else clause - "Run this only if nothing went wrong"</strong>

The \`else\` clause executes only when the try block completes WITHOUT raising an exception. It's Python's way of saying "if everything succeeded, do this extra step":

\`\`\`python
try:
    value = int(user_input)
except ValueError:
    print("Invalid number!")
else:
    print(f"Success! You entered {value}")
    # Do additional processing only if conversion worked
    result = value * 2
    print(f"Doubled: {result}")
\`\`\`

<strong>Why use else instead of putting code in the try block?</strong>

Great question! Three important reasons:

<strong>1. Keeps the try block minimal</strong>
Only code that can raise the exception should go in try. This makes it crystal clear what might fail:

❌ Confusing (what could fail here?):
\`\`\`python
try:
    value = int(user_input)
    result = value * 2  # Can this fail?
    print(f"Result: {result}")  # Or this?
    save_to_database(result)  # Or this??
except ValueError:
    print("Invalid input")
\`\`\`

✅ Clear (only conversion can raise ValueError):
\`\`\`python
try:
    value = int(user_input)
except ValueError:
    print("Invalid input")
else:
    # These only run if conversion succeeded
    result = value * 2
    print(f"Result: {result}")
    save_to_database(result)
\`\`\`

<strong>2. Makes the success path explicit</strong>
The else clause clearly signals "this is what happens when everything works":

\`\`\`python
try:
    with open('data.txt', 'r') as file:
        data = file.read()
except FileNotFoundError:
    print("File missing - using defaults")
    data = "default data"
else:
    print(f"Successfully loaded {len(data)} characters")
    validate_data(data)  # Only validate if file was read
\`\`\`

<strong>3. Prevents catching unintended exceptions</strong>
Code in else won't trigger the except block even if it raises the same exception type!

\`\`\`python
try:
    value = int(user_input)  # Might raise ValueError
except ValueError:
    print("Bad input")
else:
    # If this raises ValueError, it WON'T be caught above!
    other_value = int(some_other_input)  # Crashes if invalid
\`\`\`

<strong>The finally clause - "Run this no matter what"</strong>

The \`finally\` clause is the most powerful part of exception handling - it ALWAYS executes, whether an exception occurred or not, whether it was caught or not, even if there's a return statement!

\`\`\`python
try:
    file = open('data.txt', 'r')
    risky_operation(file)
except FileNotFoundError:
    print("File not found")
except PermissionError:
    print("Access denied")
finally:
    # This ALWAYS runs - even if exception or return!
    print("Cleanup complete")
\`\`\`

<strong>Why finally is absolutely critical - Guaranteed cleanup:</strong>

Finally ensures resources are properly released, no matter what happens:

<strong>1. Closing files and connections</strong>

Without finally (BAD - file might not close):
\`\`\`python
file = open('data.txt', 'r')
try:
    data = file.read()
    process(data)  # If this crashes, file never closes!
except:
    print("Error")
file.close()  # Never reached if exception!
\`\`\`

With finally (GOOD - file always closes):
\`\`\`python
file = open('data.txt', 'r')
try:
    data = file.read()
    process(data)
except:
    print("Error")
finally:
    file.close()  # ALWAYS runs!
\`\`\`

<strong>2. Releasing locks and resources</strong>

\`\`\`python
lock.acquire()  # Acquire resource
try:
    critical_section()
finally:
    lock.release()  # ALWAYS release!
\`\`\`

<strong>3. Logging and cleanup</strong>

\`\`\`python
print("Starting operation...")
try:
    perform_operation()
except Exception as e:
    print(f"Operation failed: {e}")
finally:
    print("Operation completed (success or failure)")
    log_completion()
\`\`\`

<strong>The complete try-except-else-finally structure:</strong>

You can combine all components for maximum control:

\`\`\`python
try:
    # Code that might fail
    result = risky_operation()
except ValueError:
    # Handle specific error
    print("ValueError occurred")
except TypeError:
    # Handle another specific error
    print("TypeError occurred")
else:
    # Only runs if NO exception
    print(f"Success! Result: {result}")
    process_result(result)
finally:
    # ALWAYS runs
    print("Cleanup complete")
    release_resources()
\`\`\`

<strong>Understanding the execution order - Step by step:</strong>

Here's exactly how Python processes this structure:

<strong>Scenario 1: No exception</strong>
1. try block executes completely ✅
2. except blocks are skipped ⏭️
3. else block executes ✅
4. finally block executes ✅
5. Program continues

<strong>Scenario 2: Exception is caught</strong>
1. try block starts, exception occurs ⚠️
2. Matching except block executes ✅
3. else block is skipped (exception occurred) ⏭️
4. finally block executes ✅
5. Program continues

<strong>Scenario 3: Exception not caught</strong>
1. try block starts, exception occurs ⚠️
2. No matching except block ❌
3. else block is skipped ⏭️
4. finally block executes (even though exception will crash!) ✅
5. Program crashes with exception

<strong>Finally runs even with return statements!</strong>

This behavior can surprise beginners:

\`\`\`python
def test():
    try:
        return "try block"
    finally:
        print("Finally still runs!")  # Prints even though we returned!

result = test()
# Prints: "Finally still runs!"
# Returns: "try block"
\`\`\`

Finally executes before the function actually returns!

<strong>When to use each clause - Decision guide:</strong>

<strong>Use try:</strong>
Always - to wrap risky operations

<strong>Use except:</strong>
Always - to handle expected errors

<strong>Use else:</strong>
• When you have code that should only run on success
• To keep try blocks minimal
• To make the success path explicit
• When subsequent operations depend on try block success

<strong>Use finally:</strong>
• For cleanup that MUST happen (closing files, releasing locks)
• For logging that should always occur
• For resource management
• For operations that must run regardless of success or failure

<strong>Real-world example - Database connection:</strong>

\`\`\`python
def query_database(sql):
    connection = None
    try:
        # Attempt connection
        connection = database.connect()
        cursor = connection.cursor()

        # Execute query
        cursor.execute(sql)

    except database.ConnectionError:
        print("Could not connect to database")
        return None
    except database.QueryError as e:
        print(f"Query failed: {e}")
        return None
    else:
        # Only runs if connection AND query succeeded
        results = cursor.fetchall()
        print(f"Query successful: {len(results)} rows")
        return results
    finally:
        # ALWAYS close connection (if it was opened)
        if connection:
            connection.close()
            print("Database connection closed")
\`\`\`

<strong>Comparing with the with statement:</strong>

For files, the \`with\` statement is actually better than try-finally:

Using finally:
\`\`\`python
file = open('data.txt', 'r')
try:
    content = file.read()
finally:
    file.close()
\`\`\`

Using with (cleaner):
\`\`\`python
with open('data.txt', 'r') as file:
    content = file.read()
# File automatically closed!
\`\`\`

The \`with\` statement handles try-finally automatically! Use it for files and other context managers.

<strong>However, finally is still needed for:</strong>
• Custom resources without context manager support
• Multiple cleanup operations
• Cleanup involving multiple resources
• Logging and notifications that must occur

<strong>Common patterns using else and finally:</strong>

<strong>Transactional operations:</strong>
\`\`\`python
try:
    begin_transaction()
    perform_operations()
except DatabaseError:
    rollback_transaction()
    raise
else:
    commit_transaction()
finally:
    close_connection()
\`\`\`

<strong>Resource acquisition:</strong>
\`\`\`python
resource = acquire_resource()
try:
    use_resource(resource)
except ResourceError:
    handle_error()
else:
    log_success()
finally:
    release_resource(resource)  # MUST release
\`\`\`

<strong>File processing with logging:</strong>
\`\`\`python
log("Starting file processing")
try:
    with open('input.txt') as f:
        data = f.read()
    processed = process(data)
except FileNotFoundError:
    log("ERROR: File not found")
    return None
except ProcessingError:
    log("ERROR: Processing failed")
    return None
else:
    log(f"SUCCESS: Processed {len(processed)} items")
    return processed
finally:
    log("Processing attempt completed")
\`\`\`

<strong>Common mistakes to avoid:</strong>

⚠️ <strong>Putting too much code in try block:</strong>
\`\`\`python
try:
    value = int(input())
    result = value * 2  # Put this in else instead!
    print(result)       # Put this in else instead!
except ValueError:
    pass
\`\`\`

⚠️ <strong>Forgetting cleanup in finally:</strong>
\`\`\`python
try:
    resource = acquire()
    use(resource)
except:
    pass
# If exception occurred, resource never released!

# Better:
try:
    resource = acquire()
    use(resource)
except:
    pass
finally:
    release(resource)
\`\`\`

⚠️ <strong>Using return in finally (confusing!):</strong>
\`\`\`python
def confusing():
    try:
        return "try"
    finally:
        return "finally"  # Overrides try's return!

result = confusing()  # Returns "finally", not "try"!
\`\`\`

<strong>Best practices:</strong>

✅ Use else to keep try blocks focused on what can fail
✅ Use finally for cleanup that MUST happen
✅ Prefer \`with\` statement over try-finally for files
✅ Don't put return statements in finally (confusing!)
✅ Document why finally is needed for complex cleanup
✅ Test both success and failure paths to ensure finally works correctly

The combination of try-except-else-finally gives you complete control over error handling and resource management. Master these clauses, and you'll write professional-grade Python code that handles errors gracefully and manages resources reliably!
`,
      codeExamples: [
        {
          title: 'Using else Clause',
          code: `def read_number_from_user():
    """Get number from user with else clause"""
    try:
        user_input = input("Enter a number: ")
        number = int(user_input)
    except ValueError:
        print("That's not a valid number")
        return None
    else:
        # Only runs if conversion succeeded
        print(f"Successfully got number: {number}")
        squared = number ** 2
        print(f"Square: {squared}")
        return number

# Usage
result = read_number_from_user()`,
          explanation: 'else runs only when no exception occurs'
        },
        {
          title: 'Using finally Clause',
          code: `def process_file(filename):
    """Process file with guaranteed cleanup"""
    print(f"Opening {filename}...")

    try:
        file = open(filename, 'r')
        content = file.read()
        print(f"Read {len(content)} characters")
        # Simulate error
        result = 10 / 0  # ZeroDivisionError
    except FileNotFoundError:
        print("File not found")
    except ZeroDivisionError:
        print("Math error occurred")
    finally:
        # ALWAYS runs, even if error occurred
        print("Closing file...")
        try:
            file.close()
        except:
            pass  # File might not have been opened

process_file('data.txt')
# "Closing file..." prints even when error occurs`,
          explanation: 'finally always runs for cleanup'
        },
        {
          title: 'Complete Structure Example',
          code: `def divide_and_log(a, b):
    """Demonstrate all try-except components"""
    print("Starting division...")

    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: Cannot divide by zero")
        return None
    except TypeError:
        print("Error: Invalid types")
        return None
    else:
        # Only runs if no error
        print(f"Division successful: {a} / {b} = {result}")
        return result
    finally:
        # Always runs
        print("Operation completed")
        print("-" * 30)

# Test cases
divide_and_log(10, 2)
# Prints: success message + "Operation completed"

divide_and_log(10, 0)
# Prints: error message + "Operation completed"`,
          explanation: 'All components work together'
        },
        {
          title: 'Resource Management',
          code: `class DatabaseConnection:
    """Simulated database connection"""

    def __init__(self, name):
        self.name = name
        self.connected = False

    def connect(self):
        print(f"Connecting to {self.name}...")
        self.connected = True

    def query(self, sql):
        if not self.connected:
            raise RuntimeError("Not connected")
        print(f"Executing: {sql}")
        return "Result"

    def close(self):
        print(f"Closing connection to {self.name}")
        self.connected = False

def run_query(sql):
    """Run database query with proper cleanup"""
    db = DatabaseConnection("mydb")

    try:
        db.connect()
        result = db.query(sql)
    except RuntimeError as e:
        print(f"Database error: {e}")
        return None
    else:
        print("Query executed successfully")
        return result
    finally:
        # Ensure connection is closed
        db.close()

# Usage
run_query("SELECT * FROM users")`,
          explanation: 'finally ensures resources are cleaned up'
        },
        {
          title: 'Practical Example: File Processor',
          code: `def process_numbers_file(input_file, output_file):
    """Process numbers with complete error handling"""
    in_file = None
    out_file = None

    try:
        # Open files
        in_file = open(input_file, 'r')
        out_file = open(output_file, 'w')

        # Process data
        total = 0
        count = 0

        for line in in_file:
            try:
                number = float(line.strip())
                total += number
                count += 1
            except ValueError:
                print(f"Skipping invalid line: {line.strip()}")
                continue

    except FileNotFoundError as e:
        print(f"File error: {e}")
        return False
    else:
        # Only runs if no file errors
        if count > 0:
            average = total / count
            out_file.write(f"Total: {total}\\n")
            out_file.write(f"Count: {count}\\n")
            out_file.write(f"Average: {average:.2f}\\n")
            print(f"Processed {count} numbers successfully")
            return True
        return False
    finally:
        # Always close files
        if in_file:
            in_file.close()
        if out_file:
            out_file.close()
        print("Files closed")

# Usage
process_numbers_file('numbers.txt', 'results.txt')`,
          explanation: 'Complete example with all exception handling features'
        }
      ],
      concepts: ['else clause', 'finally clause', 'resource cleanup', 'exception flow', 'guaranteed execution']
    },
    starterCode: `# TODO: Write a function that:
# TODO: 1. Tries to convert input to integer
# TODO: 2. In except: print "Invalid number"
# TODO: 3. In else: print "Conversion successful"
# TODO: 4. In finally: print "Done"
# TODO: Test with both valid and invalid inputs

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Uses try, except, else, and finally clauses'
      }
    ],
    hints: [
      'Structure: try, except ValueError, else, finally',
      'try: number = int(value)',
      'else runs only on success',
      'finally always runs'
    ],
    challenge: {
      prompt: `Use all exception handling parts:
1. Create convert_to_int(value) function
2. Try: result = int(value)
3. Except ValueError: print "Not a valid number"
4. Else: print "Success! Value is [result]"
5. Finally: print "Conversion attempt complete"`,
      starterCode: '# Write your solution here\n',
      solution: 'def convert_to_int(value):\n    try:\n        result = int(value)\n    except ValueError:\n        print("Not a valid number")\n    else:\n        print(f"Success! Value is {result}")\n    finally:\n        print("Conversion attempt complete")\n\nconvert_to_int("42")\nconvert_to_int("hello")',
      tests: [],
      explanation: 'Try for attempt, except for errors, else for success, finally for cleanup. Each part has a specific purpose!',
      hints: [
        'Else only runs if no exception occurred',
        'Finally always runs, even after errors',
        'Structure: try, except, else, finally'
      ],
      xpReward: 500,
    },
    xpReward: 125,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 9-5: Debugging Strategies and Best Practices
  {
    id: 'lesson-9-5',
    moduleId: 'module-9',
    courseId: 'beginner',
    title: 'Debugging Strategies and Best Practices',
    content: {
      explanation: `Debugging Strategies and Best Practices 🔍

Here's the truth that no one tells beginners: Professional programmers spend MORE time debugging than writing new code! Debugging isn't a sign of failure - it's a fundamental skill that separates hobbyists from professionals. The best programmers aren't those who write bug-free code (no one does!); they're the ones who find and fix bugs quickly and efficiently.

<strong>The essential debugging strategies - Your debugging toolkit:</strong>

<strong>Strategy 1: Read the error message carefully (and completely!)</strong>

This sounds obvious, but most beginners panic and skip this step! Python's error messages are incredibly informative if you actually read them:

\`\`\`
Traceback (most recent call last):
  File "calculator.py", line 23, in <module>
    result = calculate_average(scores)
  File "calculator.py", line 18, in calculate_average
    return total / count
ZeroDivisionError: division by zero
\`\`\`

What it tells you:
• <strong>Error type:</strong> ZeroDivisionError - you divided by zero
• <strong>Where:</strong> Line 18 in calculate_average function
• <strong>How you got there:</strong> Called from line 23 in main program
• <strong>What:</strong> Specifically the "total / count" line

Don't panic! Read bottom to top:
1. What type of error? (ZeroDivisionError)
2. What's the message? (division by zero)
3. Where exactly? (Line 18, total / count)
4. How did we get there? (Called from line 23)

This tells you count is zero - now you know exactly what to fix!

<strong>Strategy 2: Print debugging - The programmer's best friend</strong>

Print statements are simple, but they're often the fastest way to debug:

\`\`\`python
def calculate_average(numbers):
    print(f"DEBUG: Input = {numbers}")  # What came in?
    print(f"DEBUG: Type = {type(numbers)}")  # Is it what we expected?
    print(f"DEBUG: Length = {len(numbers)}")  # How many items?

    total = sum(numbers)
    print(f"DEBUG: Total = {total}")  # Did sum work correctly?

    average = total / len(numbers)
    print(f"DEBUG: Average = {average}")  # What's the result?

    return average
\`\`\`

Strategic print placement shows you:
• What values variables actually contain (vs. what you think they contain!)
• The flow of execution (which code paths run)
• When variables change
• What type of data you're working with

<strong>Pro tip:</strong> Add "DEBUG:" prefix to easily find and remove debug prints later!

<strong>Strategy 3: Divide and conquer - Binary search for bugs</strong>

When you have a large chunk of code that's failing, isolate the problem:

\`\`\`python
# If this fails somewhere:
def complex_operation():
    step1()  # Comment these out one by one
    step2()  # to find which one fails
    step3()
    step4()
    step5()

# Start by commenting out half:
def complex_operation():
    step1()
    step2()
    # step3()  # Commented out
    # step4()
    # step5()

# Does it work now? Then the bug is in step 3, 4, or 5!
# Repeat until you find the exact problematic line
\`\`\`

This binary search approach finds bugs in O(log n) time instead of O(n)!

<strong>Strategy 4: Rubber duck debugging - Explaining forces understanding</strong>

This technique is SO effective that many professional developers keep an actual rubber duck on their desk! Here's how it works:

1. Get a rubber duck (or any object, or even a patient friend)
2. Explain your code line-by-line: "First, I create a variable called count. Then I loop through..."
3. When explaining, you often realize: "Wait, I'm incrementing count INSIDE the if statement - it should be outside!"

Why this works:
• Forces you to slow down and think clearly
• Makes implicit assumptions explicit
• Reveals logic you "assumed" would work but doesn't
• Creates mental distance from your code

Don't have a rubber duck? Explain to:
• A pet, plant, or stuffed animal
• A patient friend or colleague
• An imaginary person
• The rubber duck exists in your mind!

<strong>Strategy 5: Take breaks - Your brain needs rest</strong>

Staring at the same broken code for hours makes you blind to obvious bugs:

<strong>The 20-minute rule:</strong>
If you're stuck for 20 minutes with no progress:
1. Stand up and walk away
2. Do something completely different for 5-10 minutes
3. Come back with fresh eyes

You'll be AMAZED how often the bug becomes obvious after a break! Your subconscious keeps working on the problem while you're away.

<strong>Common debugging tools you should master:</strong>

<strong>Tool 1: Strategic print statements</strong>

Print everything you're uncertain about:
\`\`\`python
print(f"Variable name: {var}, Type: {type(var)}, Value: {repr(var)}")
print(f"Length: {len(container) if hasattr(container, '__len__') else 'N/A'}")
print(f"Is None?: {var is None}")
\`\`\`

<strong>Tool 2: Type and value inspection</strong>

\`\`\`python
print(f"Type of x: {type(x)}")  # <class 'str'>
print(f"Is x an integer?: {isinstance(x, int)}")  # False
print(f"Is x a string?: {isinstance(x, str)}")  # True
\`\`\`

<strong>Tool 3: Container inspection</strong>

\`\`\`python
print(f"List length: {len(my_list)}")
print(f"First item: {my_list[0] if my_list else 'Empty'}")
print(f"Last item: {my_list[-1] if my_list else 'Empty'}")
print(f"Full contents: {my_list}")
\`\`\`

<strong>Tool 4: Conditional breakpoints with assert</strong>

\`\`\`python
assert len(items) > 0, f"Items is empty! Items = {items}"
assert age >= 0, f"Age can't be negative! Age = {age}"
assert file_path.exists(), f"File doesn't exist: {file_path}"
\`\`\`

Assertions crash LOUDLY when assumptions are violated - perfect for catching bugs early!

<strong>Error prevention - Write less buggy code from the start:</strong>

<strong>1. Use descriptive, meaningful variable names</strong>

❌ Bad (what are these?):
\`\`\`python
x = 10
y = 5
z = x + y
data = process(z)
result = do_thing(data)
\`\`\`

✅ Good (self-documenting):
\`\`\`python
width = 10
height = 5
area = width + height  # BUG OBVIOUS: Should be width * height!
processed_data = process(area)
final_result = calculate_result(processed_data)
\`\`\`

With good names, bugs become obvious!

<strong>2. Write small, focused functions</strong>

Instead of one 200-line function, write 10 functions of 20 lines each. Benefits:
• Easier to test each piece independently
• Bugs are isolated to specific functions
• Easier to understand and debug
• Can reuse tested components

<strong>3. Test as you go - Don't write 100 lines before testing!</strong>

Write a function → Test it → Write the next function

\`\`\`python
def calculate_total(prices):
    """Calculate total price"""
    return sum(prices)

# Test it NOW before moving on!
test_prices = [10, 20, 30]
print(calculate_total(test_prices))  # Should be 60
# THEN write the next function
\`\`\`

<strong>4. Validate input aggressively</strong>

Check everything at the start of functions:
\`\`\`python
def calculate_average(numbers):
    # Validate input immediately!
    if not numbers:
        raise ValueError("Cannot calculate average of empty list")
    if not all(isinstance(n, (int, float)) for n in numbers):
        raise TypeError("All elements must be numbers")

    # Now we KNOW numbers is valid
    return sum(numbers) / len(numbers)
\`\`\`

Fail fast with clear messages!

<strong>5. Use type hints for clarity (Python 3.5+)</strong>

\`\`\`python
def greet(name: str, age: int) -> str:
    return f"Hello {name}, you are {age} years old"

# Many editors highlight type mismatches!
greet("Alice", "25")  # Editor warns: "25" should be int!
\`\`\`

<strong>Best practices for error handling - Do's and Don'ts:</strong>

<strong>DO:</strong> ✅

✅ <strong>Catch specific exceptions</strong> - Not bare \`except:\`
✅ <strong>Provide helpful error messages</strong> - Tell users what and why
✅ <strong>Log errors for debugging</strong> - Keep track of what went wrong
✅ <strong>Clean up resources</strong> - Close files, release locks
✅ <strong>Validate input early</strong> - Fail fast at the boundary
✅ <strong>Test error cases</strong> - Don't just test the happy path!
✅ <strong>Document expected exceptions</strong> - Help future maintainers

<strong>DON'T:</strong> ❌

❌ <strong>Use bare except:</strong> - Catches KeyboardInterrupt and system errors!
❌ <strong>Hide errors silently</strong> - \`except: pass\` creates debugging nightmares
❌ <strong>Catch exceptions you can't handle</strong> - Let them crash with info
❌ <strong>Use exceptions for control flow</strong> - They're for errors, not logic
❌ <strong>Catch Exception without good reason</strong> - Too broad, masks bugs
❌ <strong>Assume input is valid</strong> - Always validate!
❌ <strong>Write code without error handling</strong> - Consider what can go wrong

<strong>When to let errors crash vs. when to catch them:</strong>

<strong>Let it crash when:</strong>
• It's a bug in your code (you need to see and fix it!)
• It's an unexpected error (you need to investigate!)
• You're in development/testing (full tracebacks help debugging)
• You don't know how to handle it meaningfully
• It indicates a serious problem that requires attention

<strong>Catch errors when:</strong>
• They're expected user input issues (invalid numbers, etc.)
• External resources might fail (files, network, databases)
• You can provide a graceful fallback (defaults, retries)
• The application is user-facing (clean error messages)
• You can handle it meaningfully

<strong>Real-world debugging workflow:</strong>

1. <strong>Reproduce the bug reliably:</strong> Find the exact steps that cause it
2. <strong>Read the error message carefully:</strong> What type? Where? Why?
3. <strong>Form a hypothesis:</strong> "I think the bug is caused by X"
4. <strong>Test your hypothesis:</strong> Add prints, change code, try different inputs
5. <strong>If hypothesis is wrong:</strong> Form a new one and repeat
6. <strong>If hypothesis is right:</strong> Fix the bug
7. <strong>Verify the fix:</strong> Test thoroughly, including edge cases
8. <strong>Clean up:</strong> Remove debug prints, add comments if needed

<strong>Common debugging patterns:</strong>

<strong>Check assumptions:</strong>
\`\`\`python
# Is the data what I think it is?
print(f"Data: {data}, Type: {type(data)}, Length: {len(data)}")
\`\`\`

<strong>Trace execution flow:</strong>
\`\`\`python
print("Entering function")
# ... code ...
print("Checkpoint 1")
# ... code ...
print("Checkpoint 2")
\`\`\`

<strong>Inspect state changes:</strong>
\`\`\`python
print(f"Before: {variable}")
complex_operation(variable)
print(f"After: {variable}")
\`\`\`

<strong>Test edge cases:</strong>
\`\`\`python
# Test with: empty list, single item, many items, negative numbers, zero, etc.
test_cases = [[], [1], [1,2,3], [-5], [0]]
for test in test_cases:
    print(f"Testing {test}: {my_function(test)}")
\`\`\`

<strong>The debugging mindset:</strong>

Good debuggers are:
• <strong>Patient</strong> - Debugging takes time, don't rush
• <strong>Systematic</strong> - Test hypotheses methodically
• <strong>Curious</strong> - Want to understand WHY it broke
• <strong>Humble</strong> - Assume your code has bugs (it does!)
• <strong>Persistent</strong> - Every bug is solvable

Bad debuggers are:
• Panicking instead of reading error messages
• Making random changes hoping something works
• Not testing their fixes
• Blaming Python, the computer, or cosmic rays
• Giving up too quickly

Debugging is a skill that improves with practice. Every bug you fix teaches you something. Embrace errors as learning opportunities, develop systematic debugging strategies, and you'll become increasingly effective at finding and fixing problems. Remember: The best programmers aren't those who write bug-free code - they're the ones who debug efficiently!
`,
      codeExamples: [
        {
          title: 'Effective Print Debugging',
          code: `def calculate_average(numbers):
    """Calculate average with debug prints"""
    print(f"DEBUG: Input = {numbers}")
    print(f"DEBUG: Type = {type(numbers)}")
    print(f"DEBUG: Length = {len(numbers)}")

    if not numbers:
        print("DEBUG: Empty list detected")
        return 0

    total = sum(numbers)
    print(f"DEBUG: Total = {total}")

    average = total / len(numbers)
    print(f"DEBUG: Average = {average}")

    return average

# Test
result = calculate_average([10, 20, 30])
print(f"Result: {result}")

# Remove DEBUG prints after fixing`,
          explanation: 'Use strategic print statements to track values'
        },
        {
          title: 'Input Validation',
          code: `def divide_safely(a, b):
    """Divide with comprehensive validation"""
    # Validate types
    if not isinstance(a, (int, float)):
        raise TypeError(f"First argument must be number, got {type(a)}")
    if not isinstance(b, (int, float)):
        raise TypeError(f"Second argument must be number, got {type(b)}")

    # Validate values
    if b == 0:
        raise ValueError("Cannot divide by zero")

    # All checks passed
    return a / b

# Usage
try:
    result = divide_safely(10, 2)
    print(f"Result: {result}")

    # These will raise clear errors:
    # result = divide_safely("10", 2)  # TypeError
    # result = divide_safely(10, 0)    # ValueError
except (TypeError, ValueError) as e:
    print(f"Error: {e}")`,
          explanation: 'Validate input and fail with clear messages'
        },
        {
          title: 'Defensive Programming',
          code: `def get_user_info(user_dict, key):
    """Safely get user info with defensive checks"""
    # Check if argument is dict
    if not isinstance(user_dict, dict):
        print(f"Error: Expected dict, got {type(user_dict)}")
        return None

    # Check if key exists
    if key not in user_dict:
        print(f"Warning: Key '{key}' not found in user data")
        return None

    # Check if value is valid
    value = user_dict[key]
    if value is None or value == "":
        print(f"Warning: Empty value for key '{key}'")
        return None

    return value

# Safe usage
user = {'name': 'Alice', 'age': 25}
name = get_user_info(user, 'name')      # 'Alice'
email = get_user_info(user, 'email')    # None (warning printed)
invalid = get_user_info("not a dict", 'name')  # None (error printed)`,
          explanation: 'Check assumptions and handle edge cases'
        },
        {
          title: 'Debugging Complex Functions',
          code: `def process_scores(scores):
    """Process exam scores with debugging"""
    print("=== Starting process_scores ===")

    # Validate input
    if not isinstance(scores, list):
        print(f"ERROR: Expected list, got {type(scores)}")
        return None

    print(f"Processing {len(scores)} scores")

    # Filter valid scores
    valid_scores = []
    for i, score in enumerate(scores):
        print(f"Checking score #{i}: {score}")

        if not isinstance(score, (int, float)):
            print(f"  SKIP: Not a number")
            continue

        if score < 0 or score > 100:
            print(f"  SKIP: Out of range")
            continue

        valid_scores.append(score)
        print(f"  VALID: Added to list")

    print(f"Found {len(valid_scores)} valid scores")

    # Calculate statistics
    if not valid_scores:
        print("No valid scores to process")
        return None

    result = {
        'count': len(valid_scores),
        'average': sum(valid_scores) / len(valid_scores),
        'highest': max(valid_scores),
        'lowest': min(valid_scores)
    }

    print(f"Results: {result}")
    print("=== Finished process_scores ===")
    return result

# Test with various inputs
scores = [85, 92, -5, 78, 105, "ninety", 88]
result = process_scores(scores)`,
          explanation: 'Add detailed logging for complex logic'
        },
        {
          title: 'Testing Edge Cases',
          code: `def safe_list_access(my_list, index, default=None):
    """Access list element safely with edge case handling"""
    # Edge case: empty list
    if not my_list:
        print("Warning: List is empty")
        return default

    # Edge case: invalid index type
    if not isinstance(index, int):
        print(f"Error: Index must be integer, got {type(index)}")
        return default

    # Edge case: negative index (Python allows, but let's be explicit)
    if index < 0:
        print("Info: Using negative index (from end)")

    # Edge case: index out of range
    if index >= len(my_list) or index < -len(my_list):
        print(f"Error: Index {index} out of range for list of length {len(my_list)}")
        return default

    # Normal case
    return my_list[index]

# Test all edge cases
numbers = [10, 20, 30]
print(safe_list_access(numbers, 1))      # 20 (normal)
print(safe_list_access(numbers, 10))     # None (out of range)
print(safe_list_access(numbers, -1))     # 30 (negative index)
print(safe_list_access([], 0))           # None (empty list)
print(safe_list_access(numbers, "2"))    # None (wrong type)`,
          explanation: 'Test and handle all edge cases'
        }
      ],
      concepts: ['debugging', 'print debugging', 'error prevention', 'input validation', 'defensive programming', 'edge cases', 'best practices']
    },
    starterCode: `# TODO: Write a function calculate_discount(price, discount_percent) that:
# TODO: 1. Validates that price is a positive number
# TODO: 2. Validates that discount_percent is between 0 and 100
# TODO: 3. Calculates and returns the discounted price
# TODO: 4. Raises ValueError with clear message if validation fails
# TODO: Add print statements to show your validation steps

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Implements proper validation and error handling'
      }
    ],
    hints: [
      'Check if price > 0',
      'Check if 0 <= discount_percent <= 100',
      'raise ValueError("message") if invalid',
      'Calculate: price - (price * discount_percent / 100)'
    ],
    challenge: {
      prompt: `Validate input with error handling:
1. Write validate_age(age) function
2. Check if age is a number (try int(age))
3. Check if age is between 0 and 120
4. Return the validated age
5. Print helpful messages for errors`,
      starterCode: '# Write your solution here\n',
      solution: 'def validate_age(age):\n    try:\n        age_int = int(age)\n        if age_int < 0 or age_int > 120:\n            print("Age must be between 0 and 120")\n            return None\n        print("Age is valid")\n        return age_int\n    except ValueError:\n        print("Age must be a number")\n        return None\n\nprint(validate_age("25"))\nprint(validate_age("abc"))\nprint(validate_age("150"))',
      tests: [],
      explanation: 'Validate input in steps: try to convert, then check range. Give clear error messages to help users.',
      hints: [
        'Try to convert first: age_int = int(age)',
        'Then check: 0 <= age_int <= 120',
        'Return None if validation fails'
      ],
      xpReward: 500,
    },
    xpReward: 500,
    activityType: 'game',
    gameType: 'quiz'
  }
];
