// Module 1: Basics & Syntax
// 5 lessons covering Python fundamentals

import type { Lesson } from '@types';

export const module1Lessons: Lesson[] = [
  {
    id: 'lesson-1-1',
    moduleId: 'module-1',
    courseId: 'beginner',
    title: 'Your First Python Program',
    content: {
      explanation: `Welcome to Python! 🐍

Let's start with the most important function you'll use throughout your programming journey: print()

The print() function is how you display text, numbers, and other information on the screen. Think of it as Python's way of talking to you - it shows you what's happening in your program. Every programmer uses print() constantly, from beginners learning the basics to professionals debugging complex applications!

<strong>How to use print():</strong>
Just write print() and put what you want to show inside the parentheses:
print("Hello, World!")

When you run this code, you'll see "Hello, World!" appear in the output area. It's that simple!

<strong>Important things to remember:</strong>
• Text (called strings) must be wrapped in quotes - you can use single ' or double " quotes, both work the same
• Numbers don't need quotes - print(42) works perfectly
• Each print() statement creates a new line automatically, so print("Line 1") followed by print("Line 2") will show them on separate lines
• You can print multiple things at once by separating them with commas: print("Age:", 25)

<strong>Common beginner mistakes to avoid:</strong>
⚠️ Forgetting quotes around text will cause an error: print(Hello) doesn't work, but print("Hello") does
⚠️ Mixing up quote types can be confusing - pick one style and stick with it (most Python developers prefer double quotes)
⚠️ Don't put quotes around numbers if you want to do math with them later

<strong>Why is print() so important?</strong>
As you learn programming, print() helps you see what your code is doing. It's your main debugging tool - if something isn't working, add print() statements to check your variables and understand where things go wrong!

Try running the code in the editor. Then experiment by changing the message, adding more print() statements, or printing numbers. The best way to learn is by trying things out!`,
      codeExamples: [
        {
          code: 'print("Hello, World!")\nprint("Python is fun!")\nprint(42)',
          explanation: 'Multiple print statements',
        },
      ],
      concepts: ['print function', 'strings', 'basic output'],
    },
    starterCode: '# Write your first Python program\nprint("Hello, World!")',
    validationTests: [
      {
        description: 'Should print "Hello, World!"',
        code: 'print("Hello, World!")',
        expectedOutput: 'Hello, World!',
      },
    ],
    hints: [
      'Make sure to use quotes around text',
      'Try changing the message inside the quotes',
      "You can use both single (') or double (\") quotes",
    ],
    challenge: {
      prompt: `Write a program that prints three things:
1. A person's name (e.g., "Alice")
2. A programming language (e.g., "Python")
3. The number 2024

Each should be on a separate line.`,
      starterCode: '# Write your solution here\n',
      solution: 'print("Alice")\nprint("Python")\nprint(2024)',
      tests: [],
      explanation: 'Remember to use quotes for text (strings) but not for numbers! Each print() statement creates a new line automatically.',
      hints: [
        'You need three print() statements',
        'Text needs quotes, numbers don\'t',
        'Example: print("Hello") and print(42)'
      ],
      xpReward: 500,
    },
    xpReward: 50,
    gameType: 'quiz',
  },

  {
    id: 'lesson-1-2',
    moduleId: 'module-1',
    courseId: 'beginner',
    title: 'Variables and Types',
    content: {
      explanation: `Variables in Python 📦

Think of variables as labeled containers where you store information that your program needs to remember. Just like you might label a box "Winter Clothes" or "Kitchen Supplies," you give each variable a descriptive name and store data inside it.

<strong>Creating variables is incredibly easy in Python:</strong>
Just pick a name, use an equals sign (=), and assign a value. Python figures out what type of data you're storing automatically!

name = "Alice"      # Stores text
age = 25           # Stores a number
height = 5.6       # Stores a decimal number
is_student = True  # Stores True or False

<strong>The four basic data types you'll use constantly:</strong>

1. <strong>Strings (text):</strong> Any text wrapped in quotes - "Hello", "Alice", "123 Main St"
2. <strong>Integers (whole numbers):</strong> Numbers without decimals - 42, -17, 1000
3. <strong>Floats (decimal numbers):</strong> Numbers with decimal points - 3.14, -0.5, 99.99
4. <strong>Booleans (True/False):</strong> Only two values: True or False (note the capital letters!)

<strong>Variable naming rules (Python will give an error if you break these!):</strong>
• Must start with a letter (a-z, A-Z) or underscore (_)
• Can contain letters, numbers, and underscores only - no spaces or special characters
• Cannot use Python's reserved words like print, if, for, while, def, class
• Python is case-sensitive: age, Age, and AGE are three different variables!

<strong>Best practices for naming variables:</strong>
✅ Use descriptive names that explain what the variable holds: user_age instead of x or num
✅ Use lowercase with underscores for regular variables: first_name, total_score, is_valid
✅ Keep names concise but clear: num_students is better than number_of_students_in_the_class
✅ Avoid single letters except in math formulas or very short loops

<strong>Common beginner mistakes:</strong>
⚠️ Using spaces in names: user name causes an error, use user_name instead
⚠️ Starting with a number: 1st_place is invalid, use first_place
⚠️ Forgetting that variables are case-sensitive: Age = 25 and age = 25 create two different variables
⚠️ Using Python keywords: class = "Math 101" will cause an error because class is a reserved word

Variables are fundamental to programming - they let your program remember information, make calculations, and respond to user input. Think of every program as a recipe, and variables are where you store the ingredients!`,
      codeExamples: [
        {
          code: 'name = "Bob"\nage = 30\nprint(name)\nprint(age)',
          explanation: 'Creating and printing variables',
        },
      ],
      concepts: ['variables', 'data types', 'assignment'],
    },
    starterCode: '# Create variables for example information\nname = "Alice"\nage = 25\n\n# Print them\nprint(name)\nprint(age)',
    validationTests: [
      {
        description: 'Should create and print variables',
        code: 'name = "Alice"\nage = 25\nprint(name)\nprint(age)',
        expectedOutput: 'Alice\n25',
      },
    ],
    hints: [
      'Use = to assign a value to a variable',
      'Strings need quotes, numbers do not',
      'Variable names should be descriptive',
    ],
    challenge: {
      prompt: `Create a program that stores information about a book:
1. Create a variable for the book title (string) - use any book you like
2. Create a variable for the number of pages (number)
3. Create a variable for whether it's been read (True or False)
4. Print all three variables`,
      starterCode: '# Write your solution here\n',
      solution: 'title = "Harry Potter"\npages = 500\nread = True\nprint(title)\nprint(pages)\nprint(read)',
      tests: [],
      explanation: 'Variables can hold different types of data: strings (text in quotes), integers (whole numbers), and booleans (True/False).',
      hints: [
        'Use descriptive variable names like title, pages, read',
        'Remember: strings need quotes, numbers and booleans don\'t'
      ],
      xpReward: 500,
    },
    xpReward: 75,
    gameType: 'quiz',
  },

  {
    id: 'lesson-1-3',
    moduleId: 'module-1',
    courseId: 'beginner',
    title: 'Basic Math Operations',
    content: {
      explanation: `Math in Python 🔢

Python is basically a super-powered calculator that can handle everything from simple arithmetic to complex mathematical operations. Whether you're calculating grades, managing finances, or building games, you'll use these math operators constantly!

<strong>The basic operators you already know:</strong>

<strong>Addition (+):</strong> 5 + 3 gives you 8
Use it for: Adding numbers, combining totals, counting up

<strong>Subtraction (-):</strong> 10 - 4 gives you 6
Use it for: Finding differences, calculating change, counting down

<strong>Multiplication (*):</strong> 6 * 7 gives you 42
Use it for: Scaling values, finding areas, repeated addition

<strong>Division (/):</strong> 15 / 3 gives you 5.0
Important: Regular division ALWAYS returns a decimal (float), even if the answer is a whole number!

<strong>Special operators that make Python powerful:</strong>

<strong>Integer division (//):</strong> 15 // 4 gives you 3
This divides and drops everything after the decimal point. Super useful when you need whole numbers!
Real-world example: If you have 15 cookies and 4 people, each person gets 15 // 4 = 3 cookies.

<strong>Modulus (%):</strong> 17 % 5 gives you 2
This gives you the remainder after division. It's incredibly useful for patterns and checking divisibility!
Real-world examples:
• Check if a number is even: number % 2 == 0
• Wrap around in a circle: position % 360 keeps angles between 0-359
• Every 10th item: if count % 10 == 0

<strong>Exponent/Power (**):</strong> 2 ** 3 gives you 8
This means "2 to the power of 3" or 2 × 2 × 2 = 8
Use it for: Calculating compound interest, exponential growth, area/volume formulas

<strong>Order of operations matters!</strong>
Python follows PEMDAS (Parentheses, Exponents, Multiplication/Division, Addition/Subtraction):
• 2 + 3 * 4 = 14 (multiplication first: 2 + 12)
• (2 + 3) * 4 = 20 (parentheses first: 5 * 4)

<strong>Pro tips:</strong>
✅ Use parentheses to make your intentions clear, even when not strictly necessary
✅ Remember / gives floats, // gives integers - choose based on what you need
✅ The modulus operator % is your friend for repeating patterns and cycles
✅ You can chain operations: result = (10 + 5) * 2 ** 3

<strong>Common mistakes beginners make:</strong>
⚠️ Forgetting that / always returns a float: 10 / 5 gives 2.0, not 2
⚠️ Confusing ** (power) with ^ (which is something completely different in Python!)
⚠️ Ignoring order of operations and getting unexpected results
⚠️ Not using parentheses when mixing multiple operations

Python makes math easy and intuitive. Practice combining these operators to solve real problems - that's when programming becomes truly useful!`,
      codeExamples: [
        {
          code: 'x = 10\ny = 3\nprint(x + y)\nprint(x * y)\nprint(x ** y)',
          explanation: 'Using operators with variables',
        },
      ],
      concepts: ['arithmetic operators', 'math operations', 'order of operations'],
    },
    starterCode: '# Try some math operations\nx = 15\ny = 4\n\n# Calculate and print results\nprint(x + y)\nprint(x - y)\nprint(x * y)\nprint(x / y)',
    validationTests: [
      {
        description: 'Should perform basic math operations',
        code: 'a = 10\nb = 5\nprint(a + b)\nprint(a * b)',
        expectedOutput: '15\n50',
      },
    ],
    hints: [
      'Division (/) always returns a decimal (float)',
      'Use // for integer division',
      'Remember order of operations (PEMDAS)',
    ],
    challenge: {
      prompt: `Write a program that calculates the area and perimeter of a rectangle:
1. Create variables for length (10) and width (5)
2. Calculate the area (length × width)
3. Calculate the perimeter (2 × (length + width))
4. Print both results with labels`,
      starterCode: '# Write your solution here\n',
      solution: 'length = 10\nwidth = 5\narea = length * width\nperimeter = 2 * (length + width)\nprint("Area:", area)\nprint("Perimeter:", perimeter)',
      tests: [],
      explanation: 'Use * for multiplication. Use parentheses to control order of operations. You can print multiple values separated by commas.',
      hints: [
        'Area = length × width',
        'Perimeter = 2 × (length + width)',
        'Use parentheses to calculate (length + width) first'
      ],
      xpReward: 500,
    },
    xpReward: 75,
    gameType: 'quiz',
  },

  {
    id: 'lesson-1-4',
    moduleId: 'module-1',
    courseId: 'beginner',
    title: 'Comments and Documentation',
    content: {
      explanation: `Comments in Python 💬

Comments are notes you write in your code that Python completely ignores when running your program. They're written by programmers, for programmers - a way to explain your thinking, leave reminders, or help others understand your code.

<strong>Single-line comments with #:</strong>
Any text after a # symbol is ignored by Python until the end of that line:

# This entire line is a comment
print("Hello")  # This part is a comment too!

You can put comments on their own line or at the end of a code line. Both work perfectly!

<strong>Multi-line comments with triple quotes:</strong>
For longer explanations, use three quotes (""" or ''') to write comments across multiple lines:

"""
This is a longer comment that spans multiple lines.
You can write detailed explanations here.
Perfect for describing what a function does or
explaining complex logic in your program.
"""

<strong>Why are comments so important?</strong>

1. <strong>Future you will thank present you:</strong> Code that seems obvious now will be mysterious in a week. Comments help you remember your reasoning!

2. <strong>Help other developers:</strong> If someone else reads your code (teachers, coworkers, or collaborators), comments explain what you're doing and why.

3. <strong>Debugging aid:</strong> When troubleshooting, you can temporarily "comment out" lines of code to test different scenarios:
   # print("Debug info")  # Temporarily disabled

4. <strong>Documentation:</strong> Good comments explain the "why," not just the "what" - they provide context that code alone can't convey.

<strong>Best practices for writing great comments:</strong>

✅ <strong>Explain WHY, not WHAT:</strong> Bad: "# add 5 to x" Good: "# Add bonus points for completing all levels"
✅ <strong>Keep them concise:</strong> One clear sentence is better than a paragraph
✅ <strong>Update them when code changes:</strong> Outdated comments are worse than no comments!
✅ <strong>Use them for complex logic:</strong> If it took you a while to figure out, future you will need the explanation
✅ <strong>Mark TODOs:</strong> # TODO: Add input validation here
✅ <strong>Explain weird or clever tricks:</strong> If you use an unusual solution, explain why

<strong>What NOT to comment:</strong>

❌ Don't state the obvious: # Store 5 in variable x for x = 5
❌ Don't write novels: Keep it brief and relevant
❌ Don't use comments instead of clear code: Good variable names often eliminate the need for comments
❌ Don't leave commented-out code in production: Remove it or use version control

<strong>Real-world example of good commenting:</strong>

# Calculate discount based on membership tier
# Gold members get 20%, Silver get 10%, Bronze get 5%
if membership == "gold":
    discount = 0.20  # 20% discount for gold tier

<strong>Common beginner mistakes:</strong>
⚠️ Writing too many obvious comments that just repeat what the code does
⚠️ Never updating comments when code changes (leading to confusing mismatches)
⚠️ Using comments to "save" old code instead of deleting it (use version control like Git instead!)
⚠️ Forgetting the # symbol and creating syntax errors

Think of comments as notes to your future self and teammates. Write the comments you'd want to read when coming back to this code in six months!`,
      codeExamples: [
        {
          code: '# Calculate area of a rectangle\nlength = 5\nwidth = 3\narea = length * width  # Formula: length × width\nprint(area)',
          explanation: 'Using comments to explain code',
        },
      ],
      concepts: ['comments', 'documentation', 'code readability'],
    },
    starterCode: '# Add comments to explain this code\nx = 10\ny = 20\nresult = x + y\nprint(result)',
    validationTests: [
      {
        description: 'Should use comments properly',
        code: '# This is a comment\nx = 5\nprint(x)  # Print x',
        expectedOutput: '5',
      },
    ],
    hints: [
      'Use # for single-line comments',
      'Comments are ignored by Python',
      'Good comments explain WHY, not just WHAT',
    ],
    challenge: {
      prompt: `Write a program that calculates the total cost of items:
1. Create a variable for item price (25.99)
2. Create a variable for quantity (3)
3. Calculate the total
4. Print the total
5. Add comments explaining what each line does`,
      starterCode: '# Write your solution here\n',
      solution: '# Set the price of one item\nprice = 25.99\n\n# Set how many items to buy\nquantity = 3\n\n# Calculate the total cost\ntotal = price * quantity\n\n# Display the result\nprint(total)',
      tests: [],
      explanation: 'Comments start with #. Good comments explain the purpose of code, making it easier to understand later.',
      hints: [
        'Start comments with #',
        'Add comments above or next to code lines',
        'Explain WHAT the code is calculating'
      ],
      xpReward: 500,
    },
    xpReward: 50,
    gameType: 'quiz',
  },

  {
    id: 'lesson-1-5',
    moduleId: 'module-1',
    courseId: 'beginner',
    title: 'Input and Output',
    content: {
      explanation: `Getting User Input 💬

Want your programs to be interactive? The input() function lets you ask users questions and get their responses, turning your static code into dynamic, personalized experiences!

<strong>How input() works:</strong>

The input() function does three things:
1. Displays a message (prompt) to the user
2. Pauses your program and waits for the user to type something
3. Returns whatever the user typed as text when they press Enter

name = input("What is your name? ")
print("Hello, " + name + "!")

When this runs, the user sees "What is your name? " and can type their response. The program then uses their answer!

<strong>Critical fact: input() ALWAYS returns text (a string)!</strong>

Even if someone types a number, Python treats it as text:
age = input("How old are you? ")  # User types: 25
# age now holds the STRING "25", not the NUMBER 25

This matters when you want to do math! You can't add 1 to "25" - you need to convert it to a real number first:

age = int(input("How old are you? "))  # Converts input to integer
next_year = age + 1  # Now this works! 25 + 1 = 26

<strong>Converting user input:</strong>
• int() - Converts to whole numbers: int("25") gives you 25
• float() - Converts to decimals: float("3.14") gives you 3.14
• str() - Converts back to text: str(25) gives you "25"

<strong>Important: Handle conversion errors!</strong>
If a user types "hello" when you expect a number, int("hello") will crash your program. We'll learn to handle this safely in later lessons!

<strong>F-strings: The modern way to format output 🎨</strong>

Instead of using + to stick strings together (called concatenation), use f-strings - they're cleaner, easier to read, and more powerful:

<strong>Old way (still works but messy):</strong>
print("Hello, " + name + "! You are " + str(age) + " years old.")

<strong>Modern way with f-strings:</strong>
print(f"Hello, {name}! You are {age} years old.")

Just put an f before the opening quote and use {variable_name} to insert variables. Python handles the conversion automatically!

<strong>F-string benefits:</strong>
✅ More readable and easier to write
✅ Automatically converts numbers to strings
✅ Can include expressions: print(f"Next year you'll be {age + 1}")
✅ Supports formatting: print(f"Price: \${price:.2f}") for 2 decimal places

<strong>Real-world examples:</strong>

# Simple questionnaire
name = input("Enter your name: ")
age = int(input("Enter your age: "))
city = input("Enter your city: ")

print(f"Hello {name}! You're {age} years old and live in {city}.")
print(f"In 10 years, you'll be {age + 10} years old!")

# Calculator
num1 = float(input("First number: "))
num2 = float(input("Second number: "))
print(f"{num1} + {num2} = {num1 + num2}")

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Forgetting to convert input:</strong> Trying to do math with input() without int() or float()
⚠️ <strong>Using input() without storing it:</strong> input("Name? ") by itself throws away the answer!
⚠️ <strong>Forgetting the f in f-strings:</strong> print("Hello {name}") prints literally "{name}" instead of the value
⚠️ <strong>Not including a clear prompt:</strong> input() with no message leaves users confused about what to enter

<strong>Pro tips:</strong>
✅ Always include a clear prompt that tells users exactly what to enter
✅ Add a space at the end of your prompt: input("Name: ") looks better than input("Name:")
✅ Validate input when possible (check if age is reasonable, name isn't empty, etc.)
✅ Give examples in your prompts: input("Enter date (YYYY-MM-DD): ")

Input and output are what make your programs come alive - they transform code from a passive script into an interactive experience. Master these fundamentals, and you're on your way to building useful, user-friendly programs!`,
      codeExamples: [
        {
          code: 'name = input("Enter your name: ")\nage = int(input("Enter your age: "))\nprint(f"Hello {name}, you are {age} years old!")',
          explanation: 'Getting and using user input',
        },
      ],
      concepts: ['input function', 'string concatenation', 'type conversion', 'f-strings'],
    },
    starterCode: '# Get user input\nname = input("What is your name? ")\nage = input("How old are you? ")\n\n# Print a personalized message\nprint(f"Hello {name}! You are {age} years old.")',
    validationTests: [
      {
        description: 'Should handle input and output',
        code: 'x = "Alice"\nprint(f"Hello {x}!")',
        expectedOutput: 'Hello Alice!',
      },
    ],
    hints: [
      'input() always returns a string',
      'Use int() to convert strings to numbers',
      'F-strings make formatting easier',
      'Put f before the opening quote for f-strings',
    ],
    challenge: {
      prompt: `Create a simple calculator that:
1. Asks the user for a name
2. Asks for a number (convert to integer)
3. Calculates that number times 10
4. Prints a message: "Hi [name], [number] times 10 equals [result]!"

Use f-strings for the output.`,
      starterCode: '# Write your solution here\n',
      solution: 'name = input("Enter a name: ")\nnumber = int(input("Enter a number: "))\nresult = number * 10\nprint(f"Hi {name}, {number} times 10 equals {result}!")',
      tests: [],
      explanation: 'Remember: input() returns strings. Use int() to convert to a number before math. F-strings (with f before quotes) let you embed variables using {}.',
      hints: [
        'Use int() to convert the number input',
        'Start the print with f" to make an f-string',
        'Put variables inside {} in the f-string'
      ],
      xpReward: 500,
    },
    xpReward: 100,
  },
];
