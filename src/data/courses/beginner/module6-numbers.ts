// Module 6: Working with Numbers & Math
// Lessons on math operations, the math module, random numbers, type conversion, and formatting

import type { Lesson } from '@/types/lesson';

export const module6Lessons: Lesson[] = [
  {
    id: 'lesson-2-1',
    moduleId: 'module-2',
    courseId: 'beginner',
    title: 'Advanced Math Operations',
    content: {
      explanation: `Advanced Math Operations in Python 🔢✨

Beyond basic addition and subtraction, Python gives you powerful mathematical tools that you'll use constantly in real programming projects. Whether you're calculating compound interest, checking if a number is even, or working with powers and roots, these operations are essential!

<strong>Exponents and Powers - Raising Numbers to Powers:</strong>

You've already seen basic math, but what if you need to calculate 2 to the power of 10? Python has two ways to do this:

The ** operator: This is Python's exponent operator, and it's super intuitive!
• 2 ** 3 = 8 (2 × 2 × 2)
• 10 ** 2 = 100 (10 × 10)
• 5 ** 0 = 1 (anything to the power of 0 is 1)
• 2 ** -1 = 0.5 (negative exponents give you fractions)

The pow() function: Does the same thing as **, but with a bonus feature!
• pow(2, 3) = 8 (exactly like 2 ** 3)
• pow(2, 3, 5) = 3 (this calculates 2^3 mod 5 - useful in cryptography and advanced math!)

💡 <strong>When to use which:</strong> For most cases, use ** because it's simpler and more readable. Use pow() when you need the modulus feature or when calling it makes your code clearer.

<strong>Integer Division and Modulus - Breaking Numbers Apart:</strong>

Sometimes you don't want decimal results - you want to know "how many times does this number go in?" and "what's left over?" That's where integer division and modulus come in!

Floor Division (//) - Divides and drops the remainder:
• 17 // 5 = 3 (5 goes into 17 three complete times)
• 20 // 6 = 3 (6 goes into 20 three times)
• 10 // 3 = 3 (even though 10 ÷ 3 = 3.333...)

Modulus (%) - Gives you only the remainder:
• 17 % 5 = 2 (17 divided by 5 leaves a remainder of 2)
• 20 % 6 = 2 (20 divided by 6 leaves a remainder of 2)
• 10 % 3 = 1 (10 divided by 3 leaves a remainder of 1)

<strong>Real-world uses:</strong>
✅ Converting minutes to hours and minutes: 125 minutes = 125 // 60 hours and 125 % 60 minutes
✅ Checking if numbers are even or odd: if x % 2 == 0, it's even!
✅ Finding every nth item: if index % 3 == 0, it's every third item
✅ Creating patterns that repeat: use modulus to cycle through values

<strong>Absolute Value - Distance from Zero:</strong>

The abs() function gives you the absolute value - essentially removing any negative sign:
• abs(-5) = 5 (make negative numbers positive)
• abs(5) = 5 (positive stays positive)
• abs(-3.14) = 3.14 (works with decimals too)
• abs(0) = 0 (zero stays zero)

💡 <strong>Why is this useful?</strong> When you care about magnitude but not direction! Examples:
• Temperature differences: abs(72 - 45) = 27 degrees difference
• Distance between points: always positive!
• Error margins: checking if two numbers are "close enough"

<strong>Common Patterns You'll Use:</strong>

Checking even or odd:
• if number % 2 == 0: it's even
• if number % 2 == 1: it's odd

Breaking down time:
• hours = total_minutes // 60
• minutes = total_minutes % 60

Finding patterns:
• if index % 10 == 0: every tenth item
• if day % 7 == 0: every seventh day (weekly)

⚠️ <strong>Common mistakes to avoid:</strong>
• Confusing // with / - Use // when you want whole numbers, / when you want decimals
• Forgetting that modulus gives the remainder, not the quotient
• Using abs() on comparisons incorrectly - abs(a - b) gives distance, not whether a equals b
• Assuming negative modulus works the same in all languages (Python's behavior is consistent but check your math!)

These operations are the building blocks of more complex calculations. Master them now, and you'll use them in almost every program you write!
      `,
      codeExamples: [
        {
          title: 'Using Exponents',
          code: `# Different ways to calculate powers
base = 2
exponent = 10

result1 = base ** exponent
result2 = pow(base, exponent)

print(f"{base} to the power of {exponent} = {result1}")
# Output: 2 to the power of 10 = 1024`,
          explanation: 'Both ** and pow() calculate exponents'
        },
        {
          title: 'Integer Division in Practice',
          code: `# Converting minutes to hours and minutes
total_minutes = 125

hours = total_minutes // 60
minutes = total_minutes % 60

print(f"{total_minutes} minutes = {hours}h {minutes}m")
# Output: 125 minutes = 2h 5m`,
          explanation: 'Use // and % together to break down quantities'
        },
        {
          title: 'Checking Even or Odd',
          code: `number = 17

if number % 2 == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")
# Output: 17 is odd`,
          explanation: 'Modulus operator helps check divisibility'
        }
      ],
      concepts: ['exponents', 'pow()', 'integer division', 'modulus', 'absolute value']
    },
    starterCode: `# Calculate compound interest
# Formula: A = P(1 + r)^t
# A = final amount, P = principal, r = rate, t = time

principal = 1000
rate = 0.05  # 5% interest
time = 10  # years

# Calculate final amount (use ** or pow())
final_amount =

print(f"Initial: \${principal}")
print(f"After {time} years: \${final_amount:.2f}")`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        testLogic: (code: string, output: string) => {
          return code.includes('**') || code.includes('pow');
        }
      }
    ],
    hints: [
      'Use the formula A = P * (1 + r) ** t',
      'Multiply principal by (1 + rate) raised to the power of time',
      'Try: final_amount = principal * (1 + rate) ** time'
    ],
    challenge: {
      prompt: `Convert minutes to hours and minutes:
1. Create a variable total_minutes = 135
2. Calculate hours using integer division (//)
3. Calculate remaining minutes using modulus (%)
4. Print: "135 minutes = 2 hours and 15 minutes"`,
      starterCode: '# Write your solution here\n',
      solution: 'total_minutes = 135\nhours = total_minutes // 60\nminutes = total_minutes % 60\nprint(f"{total_minutes} minutes = {hours} hours and {minutes} minutes")',
      tests: [],
      explanation: 'Use // to get how many complete hours fit into the minutes. Use % to get the leftover minutes.',
      hints: [
        'Integer division: hours = total_minutes // 60',
        'Modulus for remainder: minutes = total_minutes % 60',
        'Use an f-string to format the output'
      ],
      xpReward: 150,
    },
    xpReward: 100,
    activityType: 'game',
    gameType: 'quiz'
  },

  {
    id: 'lesson-2-2',
    moduleId: 'module-2',
    courseId: 'beginner',
    title: 'The Math Module',
    content: {
      explanation: `The Math Module - Python's Mathematical Toolkit 📐🧮

Python's built-in math module is like having a scientific calculator right in your code! While basic operations like +, -, *, and / are built into Python, the math module gives you access to advanced mathematical functions that you'll use all the time in real projects.

<strong>How to Import and Use the Math Module:</strong>

Before you can use any math module functions, you need to import it at the top of your code:
import math

Once imported, you access functions using the format math.function_name(). For example, math.sqrt(16) calculates the square root of 16.

<strong>Essential Math Functions You'll Use Constantly:</strong>

<strong>Square Root - math.sqrt(x):</strong>
Calculates the square root (√) of any number:
• math.sqrt(16) = 4.0 (because 4 × 4 = 16)
• math.sqrt(25) = 5.0 (because 5 × 5 = 25)
• math.sqrt(2) = 1.414... (works with any positive number)

💡 <strong>Real uses:</strong> Distance calculations, statistical formulas, physics equations, normalizing data

<strong>Rounding Functions - Ceil and Floor:</strong>

Sometimes regular rounding isn't enough - you need to always round up or always round down:

math.ceil(x) - Ceiling, always rounds UP to nearest integer:
• math.ceil(4.1) = 5 (rounds up)
• math.ceil(4.9) = 5 (still rounds up)
• math.ceil(4.0) = 4 (already whole, stays same)
• math.ceil(-4.1) = -4 (rounds toward positive infinity)

math.floor(x) - Floor, always rounds DOWN to nearest integer:
• math.floor(4.9) = 4 (rounds down)
• math.floor(4.1) = 4 (still rounds down)
• math.floor(4.0) = 4 (already whole, stays same)
• math.floor(-4.1) = -5 (rounds toward negative infinity)

✅ <strong>Practical uses:</strong>
• Prices: math.ceil(19.01) = 20 (round up to nearest dollar)
• Pagination: math.ceil(total_items / items_per_page) = number of pages needed
• Inventory: math.floor(quantity / package_size) = complete packages available

<strong>Mathematical Constants - Pre-calculated Values:</strong>

The math module includes precise values for important mathematical constants:

math.pi - The value of π (pi):
• math.pi = 3.141592653589793
• Use for circle calculations: area = math.pi * radius ** 2
• Circumference: 2 * math.pi * radius

math.e - Euler's number:
• math.e = 2.718281828459045
• Used in exponential growth, logarithms, and calculus
• Compound interest, population growth, decay calculations

<strong>Other Useful Math Functions:</strong>

math.pow(x, y) - Raise x to power y (similar to ** operator):
• math.pow(2, 3) = 8.0 (note: returns float, while ** can return int)
• Useful when working with the math module functions

math.fabs(x) - Floating-point absolute value:
• math.fabs(-5.5) = 5.5 (like abs() but always returns float)

<strong>Trigonometry Functions (For When You Need Them):</strong>

If you're working with angles, waves, or circular motion:
• math.sin(x), math.cos(x), math.tan(x) - Basic trig functions
• ⚠️ Important: These expect angles in RADIANS, not degrees!
• Convert degrees to radians: math.radians(90) = 1.5707... (which is π/2)
• Convert radians to degrees: math.degrees(math.pi) = 180.0

<strong>Real-World Applications:</strong>

Calculate distance between two points:
distance = math.sqrt((x2-x1)<strong>2 + (y2-y1)</strong>2)

Calculate area of a circle:
area = math.pi * radius ** 2

Round up for pagination:
pages = math.ceil(total_items / items_per_page)

⚠️ <strong>Common mistakes:</strong>
• Forgetting to import math before using it - you'll get "NameError: name 'math' is not defined"
• Using degrees with trig functions instead of radians - convert first!
• Confusing math.sqrt() with ** 0.5 (they do the same thing, but sqrt is clearer)
• Using math.ceil() when you meant round() - ceil ALWAYS rounds up, even 0.01 → 1

💡 <strong>Pro tip:</strong> For most projects, you'll primarily use sqrt(), ceil(), floor(), and pi. The other functions are there when you need them for specialized calculations!

The math module makes Python powerful enough for scientific computing, game development, data analysis, and any project involving calculations beyond basic arithmetic. Import it, explore it, and let Python do the heavy math lifting for you!
      `,
      codeExamples: [
        {
          title: 'Using Math Functions',
          code: `import math

# Square root
number = 16
square_root = math.sqrt(number)
print(f"Square root of {number} = {square_root}")
# Output: Square root of 16 = 4.0`,
          explanation: 'Import math to access mathematical functions'
        },
        {
          title: 'Rounding with Ceil and Floor',
          code: `import math

price = 19.99

# Round up for customer to pay
pay = math.ceil(price)  # 20

# Round down for budget
budget = math.floor(price)  # 19

print(f"Price: \${price}, Pay: \${pay}, Budget: \${budget}")`,
          explanation: 'ceil() rounds up, floor() rounds down'
        },
        {
          title: 'Circle Calculations',
          code: `import math

radius = 5

# Calculate area and circumference
area = math.pi * radius ** 2
circumference = 2 * math.pi * radius

print(f"Circle with radius {radius}:")
print(f"Area: {area:.2f}")
print(f"Circumference: {circumference:.2f}")`,
          explanation: 'Use math.pi for accurate π value'
        }
      ],
      concepts: ['math module', 'import', 'sqrt', 'ceil', 'floor', 'pi']
    },
    starterCode: `import math

# Calculate the distance between two points
# Formula: distance = sqrt((x2-x1)^2 + (y2-y1)^2)

x1, y1 = 0, 0  # Point 1
x2, y2 = 3, 4  # Point 2

# Calculate distance using math.sqrt()
distance =

print(f"Distance from ({x1}, {y1}) to ({x2}, {y2}): {distance}")`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        testLogic: (code: string, output: string) => {
          return code.includes('math.sqrt') && output.includes('5');
        }
      }
    ],
    hints: [
      'Use the Pythagorean theorem: a² + b² = c²',
      'Calculate (x2-x1)<strong>2 + (y2-y1)</strong>2 first',
      'Then take the square root: math.sqrt((x2-x1)<strong>2 + (y2-y1)</strong>2)'
    ],
    challenge: {
      prompt: `Calculate the area of a circle:
1. Import the math module
2. Create a variable radius = 7
3. Calculate area using formula: π × radius²
4. Use math.pi for π
5. Print the area with 2 decimal places`,
      starterCode: '# Write your solution here\n',
      solution: 'import math\n\nradius = 7\narea = math.pi * radius ** 2\nprint(f"Area: {area:.2f}")',
      tests: [],
      explanation: 'Import math to access math.pi. The formula for circle area is π × r². Use ** for the exponent.',
      hints: [
        'Import at the top: import math',
        'Formula: area = math.pi * radius ** 2',
        'Format with :.2f for 2 decimals'
      ],
      xpReward: 150,
    },
    xpReward: 100,
    activityType: 'game',
    gameType: 'quiz'
  },

  {
    id: 'lesson-2-3',
    moduleId: 'module-2',
    courseId: 'beginner',
    title: 'Random Numbers',
    content: {
      explanation: `Random Numbers - Adding Unpredictability to Your Code 🎲🎰

Randomness is essential in programming! From games and simulations to testing and security, the random module lets you generate unpredictable values. Whether you're building a dice game, shuffling a playlist, or selecting random quiz questions, Python's random module has you covered!

<strong>Getting Started with Randomness:</strong>

First, import the random module at the top of your code:
import random

Now you have access to all the randomness functions Python offers. Each time you run your code, you'll get different results - that's the magic of random!

<strong>Generating Random Integers - Whole Numbers:</strong>

<strong>random.randint(a, b) - Random integer from a to b (inclusive on both ends):</strong>

This is probably the most-used random function! It gives you a random whole number between your min and max values, including both endpoints.

• random.randint(1, 6) = Roll a six-sided die (1, 2, 3, 4, 5, or 6)
• random.randint(1, 100) = Pick a number from 1 to 100
• random.randint(0, 1) = Flip a coin (0 or 1)
• random.randint(-10, 10) = Any integer from -10 to 10

✅ <strong>Perfect for:</strong>
• Dice rolls in games: random.randint(1, 20) for a 20-sided die
• Random scores: random.randint(60, 100) for test scores
• Random IDs: random.randint(1000, 9999) for 4-digit codes
• Game mechanics: random.randint(1, 3) to pick from 3 options

<strong>Generating Random Floating-Point Numbers - Decimals:</strong>

<strong>random.random() - Random float between 0.0 and 1.0:</strong>

This gives you a decimal number greater than or equal to 0 and less than 1:
• random.random() might give 0.7453829...
• Multiply it to scale: random.random() * 100 gives 0-100
• Perfect for percentages: if random.random() < 0.5 means 50% chance

<strong>random.uniform(a, b) - Random float between a and b:</strong>

Like randint() but for decimal numbers:
• random.uniform(1.5, 5.5) = Any decimal from 1.5 to 5.5
• random.uniform(0, 1) = Same as random.random()
• random.uniform(10, 50) = Random price between $10 and $50

💡 <strong>Use cases:</strong>
• Random prices: random.uniform(9.99, 99.99)
• Physics simulations: random.uniform(-1.0, 1.0) for velocity
• Probabilities: random.random() < 0.3 for 30% chance

<strong>Choosing Random Items from Lists:</strong>

<strong>random.choice(sequence) - Pick one random element from a list:</strong>

This is incredibly useful for selecting random items:
• random.choice(['rock', 'paper', 'scissors']) = Computer's move
• random.choice([1, 2, 3, 4, 5]) = Pick a random number
• random.choice(['Alice', 'Bob', 'Charlie']) = Random name
• random.choice('ABCDEFG') = Random letter (strings are sequences too!)

✅ <strong>Common uses:</strong>
• Computer opponents: random.choice(possible_moves)
• Random selection: random.choice(student_list) to pick who presents
• Quiz questions: random.choice(question_bank)
• Random messages: random.choice(greeting_messages)

<strong>Shuffling Lists - Randomize Order:</strong>

<strong>random.shuffle(my_list) - Randomizes the order of items in a list:</strong>

⚠️ <strong>Important:</strong> This modifies the original list! It doesn't return a new list.

deck = [1, 2, 3, 4, 5]
random.shuffle(deck)
print(deck)  # Might be [3, 1, 5, 2, 4] - completely random order!

Perfect for:
• Shuffling a deck of cards before dealing
• Randomizing quiz question order
• Creating random playlists
• Generating random seating arrangements

<strong>Creating Random Patterns and Behaviors:</strong>

You can combine random functions to create interesting behaviors:

Random probability checks:
if random.random() < 0.1:  # 10% chance
    print("Rare event happened!")

Random range with step:
random.choice(range(0, 101, 5))  # Random number: 0, 5, 10, ..., 95, 100

Multiple random values:
rolls = [random.randint(1, 6) for _ in range(10)]  # Roll die 10 times

<strong>Important Concepts to Understand:</strong>

🎲 <strong>Randomness is different every time:</strong> Each time you run your code, you'll get different random values. That's the point!

🎲 <strong>Seeding for reproducibility:</strong> In testing, you might want the same "random" values every time. Use random.seed(42) at the start to make randomness reproducible.

🎲 <strong>Inclusive vs Exclusive:</strong> random.randint(1, 10) includes both 1 AND 10. Some languages don't include the upper bound!

⚠️ <strong>Common mistakes:</strong>
• Forgetting parentheses: random.choice instead of random.choice() - you need the ()!
• Using shuffle() expecting a return value - it modifies in place and returns None
• Confusing randint() (integers) with uniform() (floats)
• Not importing random - you'll get "NameError: name 'random' is not defined"

<strong>Real-World Applications:</strong>

Games: Dice rolls, card shuffling, enemy behavior, loot drops
Testing: Generate random test data, simulate user behavior
Simulations: Random events, weather, population dynamics
Security: Generate random passwords, tokens (though use secrets module for real security)
Education: Random quiz questions, flashcard order, practice problems

💡 <strong>Pro tip:</strong> For games, randomness makes them fun and replayable! For simulations, it makes them realistic. For testing, it helps you find edge cases. Random numbers are one of the most powerful tools in programming!

The random module turns your programs from predictable scripts into dynamic, engaging experiences. Experiment with it, combine different functions, and watch your programs come alive with unpredictability!
      `,
      codeExamples: [
        {
          title: 'Rolling Dice',
          code: `import random

# Roll a six-sided die
die = random.randint(1, 6)
print(f"You rolled a {die}")

# Roll two dice
die1 = random.randint(1, 6)
die2 = random.randint(1, 6)
total = die1 + die2
print(f"Rolled {die1} and {die2}, total: {total}")`,
          explanation: 'Use randint() to simulate dice rolls'
        },
        {
          title: 'Random Choice',
          code: `import random

# Rock, paper, scissors
choices = ['rock', 'paper', 'scissors']
computer = random.choice(choices)
print(f"Computer chose: {computer}")

# Pick random fruit
fruits = ['apple', 'banana', 'orange', 'grape']
random_fruit = random.choice(fruits)
print(f"Random fruit: {random_fruit}")`,
          explanation: 'Use choice() to pick randomly from a list'
        },
        {
          title: 'Random Float',
          code: `import random

# Random percentage
percentage = random.random() * 100
print(f"Random percentage: {percentage:.1f}%")

# Random price between $10 and $50
price = random.uniform(10, 50)
print(f"Random price: \${price:.2f}")`,
          explanation: 'Use random() or uniform() for decimal numbers'
        }
      ],
      concepts: ['random module', 'randint', 'choice', 'random', 'uniform', 'shuffle']
    },
    starterCode: `import random

# Create a simple number guessing game
secret = random.randint(1, 10)

print("Guess the number between 1 and 10!")

# Simulate a guess (normally you'd use input())
guess = random.randint(1, 10)  # Random guess for testing

if guess == secret:
    print(f"Correct! The number was {secret}")
elif guess < secret:
    print(f"Too low! The number was {secret}")
else:
    print(f"Too high! The number was {secret}")`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        testLogic: (code: string, output: string) => {
          return code.includes('random.randint') && code.includes('if');
        }
      }
    ],
    hints: [
      'Generate secret number with random.randint(1, 10)',
      'Compare guess with secret using if/elif/else',
      'The code is already complete - just run it to see how it works!'
    ],
    challenge: {
      prompt: `Create a dice roller:
1. Import the random module
2. Roll two dice using random.randint(1, 6)
3. Store them in variables die1 and die2
4. Calculate the total
5. Print: "You rolled: 3 and 5 = 8"`,
      starterCode: '# Write your solution here\n',
      solution: 'import random\n\ndie1 = random.randint(1, 6)\ndie2 = random.randint(1, 6)\ntotal = die1 + die2\nprint(f"You rolled: {die1} and {die2} = {total}")',
      tests: [],
      explanation: 'random.randint(1, 6) generates a random number from 1 to 6 (inclusive), just like a real die!',
      hints: [
        'Import random first',
        'Use random.randint(1, 6) for each die',
        'Add them together for the total'
      ],
      xpReward: 150,
    },
    xpReward: 100,
    activityType: 'game',
    gameType: 'quiz'
  },

  {
    id: 'lesson-2-4',
    moduleId: 'module-2',
    courseId: 'beginner',
    title: 'Type Conversion In Depth',
    content: {
      explanation: `Type Conversion - Transforming Data Between Types 🔄

Understanding type conversion (also called type casting) is crucial in Python! Different operations require different data types, and you'll constantly need to convert between them. Whether you're processing user input, reading files, or formatting output, knowing how to convert between strings, integers, and floats is essential!

<strong>The Big Picture - Why Type Conversion Matters:</strong>

Python has strict type rules - you can't add a string to a number, multiply text by a decimal, or use text in mathematical calculations. When you get input from users, files, or web APIs, everything usually comes as strings. You need to convert them to numbers before doing math!

<strong>Converting Strings to Numbers - The Most Common Need:</strong>

<strong>int() - Convert to Integer (Whole Number):</strong>

Turns strings or floats into whole numbers:
• int("42") = 42 (string "42" becomes number 42)
• int("100") = 100 (now you can do math with it!)
• int(3.14) = 3 (cuts off decimal part - doesn't round!)
• int(3.99) = 3 (still just drops the decimal)

⚠️ <strong>Common errors with int():</strong>
• int("3.14") = ERROR! Can't convert decimal strings directly
• int("hello") = ERROR! Can't convert non-numeric text
• int("42.0") = ERROR! Must be a whole number string
• int("") = ERROR! Can't convert empty strings

💡 <strong>Fix for decimal strings:</strong> Convert to float first: int(float("3.14"))

<strong>float() - Convert to Decimal Number:</strong>

Turns strings or integers into decimal numbers:
• float("3.14") = 3.14 (string to decimal)
• float("42") = 42.0 (adds decimal point)
• float(42) = 42.0 (integer to float)
• float("inf") = inf (infinity - special float value!)

✅ <strong>When to use float():</strong>
• User enters a price: float(input("Enter price: "))
• Reading decimal numbers from files
• Precise calculations that need decimals
• Scientific or statistical computations

<strong>Converting Numbers to Strings - For Display and Concatenation:</strong>

<strong>str() - Convert Anything to String:</strong>

Turns numbers (or almost anything) into text:
• str(42) = "42" (number to string)
• str(3.14) = "3.14" (float to string)
• str(True) = "True" (even booleans work!)

✅ <strong>Why you need this:</strong>
• Concatenation: "Age: " + str(25) = "Age: 25"
• Cannot do "Age: " + 25 - this gives TypeError!
• Formatting output: "Score: " + str(score)
• Writing to files: file.write(str(number))

💡 <strong>Modern alternative:</strong> Use f-strings instead! f"Age: {25}" automatically converts for you!

<strong>Float to Integer - Removing Decimals:</strong>

<strong>int() on floats - Truncates (Cuts Off) Decimals:</strong>

⚠️ <strong>Important:</strong> int() doesn't round - it just removes everything after the decimal point!
• int(3.14) = 3 (not 3 rounded, just 3!)
• int(3.99) = 3 (yes, even 3.99 becomes 3!)
• int(7.5) = 7
• int(-3.9) = -3 (truncates toward zero)

<strong>Proper rounding:</strong> Use round() first, then int():
• int(round(3.14)) = 3 (rounds to 3, then converts)
• int(round(3.99)) = 4 (rounds to 4, then converts)
• int(round(7.5)) = 8 (rounds up at .5)

Or just use round() alone:
• round(3.14) = 3 (returns integer automatically)
• round(3.14, 2) = 3.14 (specify decimal places)

<strong>Integer to Float - Adding Decimal Point:</strong>

<strong>float() on integers - Makes Whole Numbers into Decimals:</strong>

Sometimes you need decimal precision even with whole numbers:
• float(42) = 42.0
• float(0) = 0.0
• float(-17) = -17.0

✅ <strong>When you need this:</strong>
• Precise division: float(5) / 2 = 2.5 (instead of 2)
• Scientific calculations requiring decimal precision
• Interfacing with code that expects floats

<strong>Checking Types - Know What You're Working With:</strong>

<strong>type() - See What Type a Variable Is:</strong>

Returns the type of any value:
• type(42) = <class 'int'>
• type(3.14) = <class 'float'>
• type("hello") = <class 'str'>
• type(True) = <class 'bool'>

💡 <strong>Useful for debugging:</strong> When something isn't working, check types!
print(f"age is {type(age)}")

<strong>isinstance() - Check If Value Is a Specific Type:</strong>

Returns True or False:
• isinstance(42, int) = True
• isinstance(3.14, int) = False
• isinstance(3.14, float) = True
• isinstance("hello", str) = True

✅ <strong>Use for validation:</strong>
if not isinstance(age, int):
    print("Age must be a whole number!")

<strong>Real-World Type Conversion Scenarios:</strong>

User Input - Always Comes as Strings:
age_str = input("Enter your age: ")  # Returns string!
age = int(age_str)  # Convert to use in calculations

File Reading - Numbers Are Read as Strings:
data = file.readline()  # "42\\n"
number = int(data.strip())  # Remove whitespace, convert

Mixed Operations - Can't Mix Types:
# Wrong: "Score: " + 95  # TypeError!
# Right: "Score: " + str(95)  # "Score: 95"
# Better: f"Score: {95}"  # Automatic conversion!

Proper Rounding for Currency:
price = 19.99
rounded = int(round(price))  # 20 (proper rounding)
truncated = int(price)  # 19 (just cuts off decimal)

⚠️ <strong>Common Mistakes to Avoid:</strong>

• Forgetting to convert input(): Always comes as string!
• Using int() on decimal strings directly: Convert to float first
• Expecting int() to round: It truncates! Use round() for rounding
• Concatenating strings with numbers without str(): Will error!
• Forgetting type() and isinstance() for debugging: They're your friends!

<strong>Type Conversion Best Practices:</strong>

✅ Convert early: As soon as you get input, convert it
✅ Validate first: Check if conversion will work before doing it
✅ Use try-except: Handle conversion errors gracefully
✅ Use f-strings: Avoid manual str() conversion when printing
✅ Be explicit: Don't rely on implicit conversions, be clear

💡 <strong>Pro tip for safe conversion:</strong>
try:
    age = int(input("Enter age: "))
except ValueError:
    print("That's not a valid number!")
    age = 0

Type conversion is something you'll do in almost every program. Master these conversions, and you'll handle data smoothly no matter what form it comes in!
      `,
      codeExamples: [
        {
          title: 'Converting User Input',
          code: `# User input is always a string
age_str = "25"
age_int = int(age_str)

print(f"Next year you'll be {age_int + 1}")
# Output: Next year you'll be 26

# Can't do math with strings
# "25" + 1  # Error!
# int("25") + 1  # Works! = 26`,
          explanation: 'Convert input strings to numbers for calculations'
        },
        {
          title: 'Float vs Int Conversion',
          code: `number = 3.7

# Different ways to convert to int
truncated = int(number)  # Drops decimal: 3
rounded = int(round(number))  # Rounds first: 4

print(f"Original: {number}")
print(f"Truncated: {truncated}")
print(f"Rounded: {rounded}")`,
          explanation: 'int() truncates, round() then int() rounds properly'
        },
        {
          title: 'Checking Types',
          code: `x = 42
y = 3.14
z = "100"

print(f"x is int: {isinstance(x, int)}")  # True
print(f"y is int: {isinstance(y, int)}")  # False
print(f"z is int: {isinstance(z, int)}")  # False

print(f"Type of x: {type(x)}")  # <class 'int'>
print(f"Type of y: {type(y)}")  # <class 'float'>
print(f"Type of z: {type(z)}")  # <class 'str'>`,
          explanation: 'Use isinstance() or type() to check variable types'
        }
      ],
      concepts: ['type conversion', 'int()', 'float()', 'str()', 'round()', 'isinstance()']
    },
    starterCode: `# Calculate average from string inputs
scores_str = "85,92,78,95,88"  # Comma-separated scores

# Split into list of strings
score_list = scores_str.split(",")

# Convert each string to int and calculate average
total = 0
for score_str in score_list:
    # Convert to int and add to total


# Calculate and print average
average =
print(f"Average score: {average}")`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        testLogic: (code: string, output: string) => {
          return code.includes('int(') && output.includes('87');
        }
      }
    ],
    hints: [
      'Inside the loop, convert score_str to int with int(score_str)',
      'Add the converted score to total',
      'Calculate average as total / len(score_list)'
    ],
    challenge: {
      prompt: `Convert and calculate:
1. Create a string variable: price_str = "29.99"
2. Convert it to a float
3. Create an int variable: quantity = 3
4. Calculate total cost (price × quantity)
5. Print the total with 2 decimal places`,
      starterCode: '# Write your solution here\n',
      solution: 'price_str = "29.99"\nprice = float(price_str)\nquantity = 3\ntotal = price * quantity\nprint(f"Total: ${total:.2f}")',
      tests: [],
      explanation: 'Use float() to convert strings to decimal numbers. int() for whole numbers. Always convert before doing math!',
      hints: [
        'Convert string to float: price = float(price_str)',
        'Multiply: total = price * quantity',
        'Format with :.2f for money'
      ],
      xpReward: 150,
    },
    xpReward: 125,
    activityType: 'game',
    gameType: 'quiz'
  },

  {
    id: 'lesson-2-5',
    moduleId: 'module-2',
    courseId: 'beginner',
    title: 'Number Formatting',
    content: {
      explanation: `Number Formatting - Making Numbers Look Professional 💰📊

Raw numbers are great for calculations, but terrible for humans to read! Number formatting transforms ugly decimals and large numbers into clean, professional-looking output. Whether you're displaying prices, percentages, statistics, or scientific data, proper formatting makes your programs look polished and professional!

<strong>F-Strings with Format Specifiers - The Modern Way:</strong>

Python's f-strings (formatted string literals) let you embed expressions and format them beautifully in one line. The syntax is: f"{value:format_specifier}"

<strong>Controlling Decimal Places - Precise Number Display:</strong>

The .Nf specifier controls decimal places (N = number of decimals, f = fixed-point):

<strong>Two Decimal Places (Perfect for Money):</strong>
• f"{price:.2f}" - Shows exactly 2 decimals
• 19.5 → "19.50" (adds trailing zero)
• 19.999 → "20.00" (rounds!)
• 5 → "5.00" (adds decimal point)

✅ <strong>Use for:</strong> Prices, money, measurements, grades

<strong>No Decimal Places (Whole Numbers):</strong>
• f"{value:.0f}" - Rounds to nearest integer
• 19.7 → "20" (rounds up)
• 19.4 → "19" (rounds down)
• 19.5 → "20" (rounds to even)

<strong>Custom Decimal Places:</strong>
• f"{pi:.4f}" - 3.14159 → "3.1416" (4 decimals)
• f"{pi:.10f}" - 3.14159 → "3.1415900000" (10 decimals)

💡 <strong>Important:</strong> Format specifiers ROUND, they don't truncate!

<strong>Thousands Separator - Making Large Numbers Readable:</strong>

The comma separator makes big numbers easy to read at a glance:

<strong>Add Commas to Integers:</strong>
• f"{number:,}"
• 1000000 → "1,000,000"
• 1234567 → "1,234,567"
• 999 → "999" (no comma needed)

<strong>Combine Commas with Decimals:</strong>
• f"{price:,.2f}"
• 1234.5 → "1,234.50"
• 1000000.99 → "1,000,000.99"
• 42.7 → "42.70"

✅ <strong>Use for:</strong> Salaries, populations, distances, large statistics, inventory counts

<strong>Percentage Formatting - Automatic Conversion:</strong>

The % format specifier multiplies by 100 and adds percent sign:

• f"{rate:.1%}" - One decimal place
• 0.5 → "50.0%" (0.5 * 100)
• 0.856 → "85.6%"
• 1.0 → "100.0%"

• f"{rate:.2%}" - Two decimal places
• 0.12345 → "12.35%"
• 0.05 → "5.00%"

• f"{rate:.0%}" - No decimals
• 0.856 → "86%"

✅ <strong>Perfect for:</strong> Test scores, completion rates, discounts, statistics, probabilities

<strong>Padding and Alignment - Creating Neat Columns:</strong>

Format specifiers control spacing and alignment for tables and reports:

<strong>Width and Alignment:</strong>
• f"{num:5}" - Right-align in 5 spaces: "   42"
• f"{num:<5}" - Left-align in 5 spaces: "42   "
• f"{num:^5}" - Center in 5 spaces: " 42  "
• f"{num:>5}" - Right-align (explicit): "   42"

<strong>Zero Padding - Leading Zeros:</strong>
• f"{num:05}" - Pad with zeros to width 5
• 42 → "00042"
• 7 → "00007"
• 12345 → "12345" (already 5 digits)

✅ <strong>Use zero padding for:</strong> ID numbers, file names, sorted lists

<strong>Combining Format Specifiers:</strong>

You can combine multiple formatting options:

Money with commas and alignment:
• f"{price:>10,.2f}" - Right-align, width 10, commas, 2 decimals
• 1234.5 → " 1,234.50"

Percentage with padding:
• f"{rate:>6.1%}" - Right-align, width 6, 1 decimal
• 0.5 → " 50.0%"

<strong>Scientific Notation - For Very Large or Small Numbers:</strong>

The e or E specifier uses scientific notation:

• f"{big_num:e}" - Lowercase e
• 1000000 → "1.000000e+06"
• 0.00001 → "1.000000e-05"

• f"{big_num:.2e}" - Control decimal places
• 1000000 → "1.00e+06"

• f"{big_num:E}" - Uppercase E
• 1000000 → "1.000000E+06"

✅ <strong>Use for:</strong> Scientific data, very large numbers, very small numbers

<strong>Real-World Formatting Examples:</strong>

<strong>Financial Report:</strong>
revenue = 1234567.89
expenses = 987654.32
profit = revenue - expenses

print(f"Revenue:  \${revenue:>12,.2f}")
print(f"Expenses: \${expenses:>12,.2f}")
print(f"Profit:   \${profit:>12,.2f}")

Output:
Revenue:  $1,234,567.89
Expenses:   $987,654.32
Profit:     $246,913.57

<strong>Progress Bar:</strong>
completed = 0.73
print(f"Progress: {completed:>5.1%} complete")
Output: Progress:  73.0% complete

<strong>Table of Data:</strong>
for i, score in enumerate([85, 92, 78], 1):
    print(f"{i:2}. Score: {score:3} ({score/100:5.1%})")

Output:
 1. Score:  85 ( 85.0%)
 2. Score:  92 ( 92.0%)
 3. Score:  78 ( 78.0%)

<strong>Format Specifier Cheat Sheet:</strong>

• :.2f - Two decimal places: 3.14159 → "3.14"
• :,  - Thousands separator: 1000000 → "1,000,000"
• :,.2f - Both: 1234.5 → "1,234.50"
• :.1% - Percentage: 0.5 → "50.0%"
• :5 - Width 5, right-align: 42 → "   42"
• :<5 - Width 5, left-align: 42 → "42   "
• :^5 - Width 5, center: 42 → " 42  "
• :05 - Zero padding: 42 → "00042"
• :e - Scientific: 1000000 → "1.000000e+06"

⚠️ <strong>Common Mistakes:</strong>

• Forgetting the colon: f"{value.2f}" doesn't work - needs f"{value:.2f}"
• Confusing .2f (decimals) with :2 (width): Different things!
• Using % without the f: f"{0.5}%" = "0.5%" but f"{0.5:.0%}" = "50%"
• Forgetting f before the string: "{value:.2f}" won't format - needs f"{value:.2f}"

<strong>Best Practices:</strong>

✅ Money: Always use .2f with optional commas: f"\${price:,.2f}"
✅ Percentages: Use % format for automatic conversion: f"{rate:.1%}"
✅ Large numbers: Add commas for readability: f"{population:,}"
✅ Tables: Use alignment and padding for neat columns
✅ Consistency: Pick a format style and use it throughout your project

💡 <strong>Pro tip:</strong> F-strings can include expressions: f"{(x + y) / 2:.2f}" calculates AND formats in one line!

Number formatting transforms your output from amateur to professional. Well-formatted numbers are easier to read, understand, and compare. Master these format specifiers, and your programs will look polished and production-ready!
      `,
      codeExamples: [
        {
          title: 'Formatting Prices',
          code: `price = 1234.5

# Different formats
basic = f"\${price}"
decimals = f"\${price:.2f}"
with_commas = f"\${price:,.2f}"

print(basic)        # $1234.5
print(decimals)     # $1234.50
print(with_commas)  # $1,234.50`,
          explanation: 'Combine format specifiers for professional output'
        },
        {
          title: 'Percentage Display',
          code: `# Test scores as decimals
score1 = 0.85
score2 = 0.923
score3 = 1.0

print(f"Score 1: {score1:.1%}")  # 85.0%
print(f"Score 2: {score2:.1%}")  # 92.3%
print(f"Score 3: {score3:.1%}")  # 100.0%`,
          explanation: 'Use % format to display as percentages'
        },
        {
          title: 'Aligned Numbers',
          code: `# Display a table of numbers
numbers = [1, 42, 999]

print("Number | Padded")
print("-------|-------")
for num in numbers:
    print(f"{num:6} | {num:05}")

# Output:
#      1 | 00001
#     42 | 00042
#    999 | 00999`,
          explanation: 'Use padding for aligned columns'
        }
      ],
      concepts: ['f-strings', 'number formatting', 'decimal places', 'thousands separator', 'percentages', 'padding']
    },
    starterCode: `# Format a financial report
revenue = 1234567.89
expenses = 987654.32
profit = revenue - expenses
margin = profit / revenue

print("FINANCIAL REPORT")
print("=" * 30)

# Format revenue with commas and 2 decimals
print(f"Revenue:  $___")

# Format expenses with commas and 2 decimals
print(f"Expenses: $___")

# Format profit with commas and 2 decimals
print(f"Profit:   $___")

# Format margin as percentage with 1 decimal
print(f"Margin:   ___")`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        testLogic: (code: string, output: string) => {
          return output.includes('1,234,567.89') && output.includes('%');
        }
      }
    ],
    hints: [
      'Use {revenue:,.2f} for commas and 2 decimals',
      'Use {margin:.1%} for percentage with 1 decimal',
      'Pattern: f"Revenue: \\${revenue:,.2f}"'
    ],
    challenge: {
      prompt: `Create a price comparison:
1. Variables: price1 = 49.99, price2 = 129.50, discount = 0.20
2. Calculate discount_amount = price2 * discount
3. Calculate final_price = price2 - discount_amount
4. Print price1 with 2 decimals
5. Print discount as percentage
6. Print final_price with 2 decimals`,
      starterCode: '# Write your solution here\n',
      solution: 'price1 = 49.99\nprice2 = 129.50\ndiscount = 0.20\ndiscount_amount = price2 * discount\nfinal_price = price2 - discount_amount\nprint(f"Original: ${price1:.2f}")\nprint(f"Discount: {discount:.0%}")\nprint(f"Final: ${final_price:.2f}")',
      tests: [],
      explanation: 'Use :.2f for prices to show exactly 2 decimal places. Use :.0% to show percentages without decimals.',
      hints: [
        'Format prices: ${price:.2f}',
        'Format percentage: {discount:.0%}',
        'Calculate final: price2 - (price2 * discount)'
      ],
      xpReward: 150,
    },
    xpReward: 125,
    activityType: 'game',
    gameType: 'quiz'
  }
];

export default module6Lessons;

