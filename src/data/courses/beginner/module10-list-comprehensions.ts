// Module 10: List Comprehensions & Advanced Lists
// 5 lessons covering list comprehensions, nested lists, advanced list operations

import type { Lesson } from '@/types/lesson';

export const module10Lessons: Lesson[] = [
  // Lesson 10-1: Introduction to List Comprehensions
  {
    id: 'lesson-8-1',
    moduleId: 'module-8',
    courseId: 'beginner',
    title: 'Introduction to List Comprehensions',
    content: {
      explanation: `Welcome to List Comprehensions! 🚀

List comprehensions are one of Python's most elegant features - a powerful, concise way to create and transform lists. Once you master them, you'll wonder how you ever lived without them! They're the hallmark of "Pythonic" code - the kind of code that makes Python developers smile and say "That's beautiful!"

<strong>Traditional loops vs. List comprehensions - A revelation:</strong>

Let's start with a common task: creating a list of squares. Here's the traditional approach:

\`\`\`python
# Traditional loop (4 lines, lots of ceremony)
squares = []  # Create empty list
for x in range(10):  # Loop through numbers
    squares.append(x ** 2)  # Calculate and append
# Result: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
\`\`\`

Now watch the magic of list comprehensions:

\`\`\`python
# List comprehension (1 line, crystal clear intent!)
squares = [x ** 2 for x in range(10)]
# Result: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
\`\`\`

Same result, but SO much cleaner! The list comprehension reads almost like English: "Create a list of x squared for each x in range 10."

<strong>Understanding the syntax - Breaking it down:</strong>

List comprehensions follow this pattern:

\`\`\`python
[expression for item in iterable]
\`\`\`

Let's dissect each component:

<strong>1. Square brackets \`[]\`:</strong> Tell Python "I'm creating a new list"
<strong>2. Expression</strong> (x ** 2): What to DO with each item - this becomes each element in the new list
<strong>3. for item in iterable</strong> (for x in range(10)): The loop that provides items to process

Think of it as a blueprint: "For each item, apply this expression, and collect all the results into a new list."

Real example: Double every number
\`\`\`python
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
# Result: [2, 4, 6, 8, 10]

# Read it as: "Create a list of n * 2 for each n in numbers"
\`\`\`

<strong>Why list comprehensions are so powerful - Five compelling reasons:</strong>

<strong>1. Incredibly concise - One line does it all</strong>

Compare these equivalent pieces of code:

Traditional (6 lines):
\`\`\`python
result = []
for name in names:
    uppercase = name.upper()
    result.append(uppercase)
\`\`\`

Comprehension (1 line):
\`\`\`python
result = [name.upper() for name in names]
\`\`\`

Less typing, less room for mistakes, clearer intent!

<strong>2. More readable (once you know the pattern)</strong>

List comprehensions eliminate boilerplate code, leaving only the essential logic. After you've seen a few, the pattern becomes instantly recognizable:

\`\`\`python
lengths = [len(word) for word in words]
# Instantly clear: "Get the length of each word"

squares = [n ** 2 for n in range(20)]
# Instantly clear: "Create squares from 0 to 19"
\`\`\`

<strong>3. Actually faster - Python optimizes them internally</strong>

List comprehensions are implemented in C internally and run faster than equivalent for loops! For large datasets, this difference is noticeable:

\`\`\`python
# Traditional loop: ~0.5 seconds for 1 million items
result = []
for i in range(1000000):
    result.append(i * 2)

# Comprehension: ~0.3 seconds for same operation
result = [i * 2 for i in range(1000000)]
\`\`\`

<strong>4. Pythonic - The preferred professional style</strong>

When Python developers see:
\`\`\`python
result = []
for item in items:
    result.append(item.upper())
\`\`\`

They immediately think: "This should be a list comprehension!" Professional Python code uses comprehensions whenever appropriate:

\`\`\`python
result = [item.upper() for item in items]  # ✅ Pythonic!
\`\`\`

<strong>5. Functional programming style - Declarative, not imperative</strong>

List comprehensions let you say WHAT you want, not HOW to do it:

Imperative (how): "Create an empty list, then for each item, calculate something and append it"
Declarative (what): "Give me a list of calculated values from these items"

This functional style is often easier to understand and less error-prone!

<strong>When to use list comprehensions:</strong>

✅ <strong>Creating new lists from existing data</strong>
\`\`\`python
prices_with_tax = [price * 1.08 for price in prices]
\`\`\`

✅ <strong>Transforming every element</strong>
\`\`\`python
uppercase_names = [name.upper() for name in names]
\`\`\`

✅ <strong>Simple mapping operations</strong>
\`\`\`python
string_numbers = [str(n) for n in numbers]
\`\`\`

✅ <strong>Generating sequences based on patterns</strong>
\`\`\`python
first_ten_squares = [n ** 2 for n in range(1, 11)]
\`\`\`

<strong>When NOT to use list comprehensions:</strong>

❌ <strong>Complex logic with multiple operations</strong>
\`\`\`python
# Hard to read - use regular loop instead!
result = [expensive_function(complex_transform(item.method1().method2())) for item in items]
\`\`\`

❌ <strong>When you need intermediate variables or multiple steps</strong>
\`\`\`python
# Too complex for comprehension:
for item in items:
    temp1 = process_step1(item)
    temp2 = process_step2(temp1)
    if validate(temp2):
        result.append(temp2)
\`\`\`

❌ <strong>When the comprehension becomes hard to read</strong>

If it's confusing, use a regular loop! Readability beats conciseness.

<strong>Common patterns you'll use constantly:</strong>

<strong>Pattern 1: Transform every element</strong>
\`\`\`python
# Make all strings uppercase
names = ['alice', 'bob', 'charlie']
upper = [name.upper() for name in names]
# ['ALICE', 'BOB', 'CHARLIE']
\`\`\`

<strong>Pattern 2: Apply a function to each element</strong>
\`\`\`python
# Get length of each word
words = ['python', 'is', 'awesome']
lengths = [len(word) for word in words]
# [6, 2, 7]
\`\`\`

<strong>Pattern 3: Extract a property from each object</strong>
\`\`\`python
# Get first character of each string
first_letters = [word[0] for word in words]
# ['p', 'i', 'a']
\`\`\`

<strong>Pattern 4: Generate sequences with math</strong>
\`\`\`python
# Celsius to Fahrenheit conversion
celsius = [0, 10, 20, 30, 40]
fahrenheit = [c * 9/5 + 32 for c in celsius]
# [32.0, 50.0, 68.0, 86.0, 104.0]
\`\`\`

<strong>Pattern 5: Create formatted strings</strong>
\`\`\`python
# Create greetings
names = ['Alice', 'Bob', 'Charlie']
greetings = [f"Hello, {name}!" for name in names]
# ['Hello, Alice!', 'Hello, Bob!', 'Hello, Charlie!']
\`\`\`

<strong>Pattern 6: Iterate over characters in strings</strong>
\`\`\`python
# Get each character from a word
word = "Python"
chars = [c for c in word]
# ['P', 'y', 't', 'h', 'o', 'n']

# Uppercase each character
upper_chars = [c.upper() for c in word]
# ['P', 'Y', 'T', 'H', 'O', 'N']
\`\`\`

<strong>Understanding the flow - What actually happens:</strong>

When Python sees a list comprehension, here's the step-by-step process:

\`\`\`python
squares = [x ** 2 for x in range(5)]
\`\`\`

1. Creates a new empty list (internally)
2. Loops through range(5): 0, 1, 2, 3, 4
3. For each value, evaluates the expression (x ** 2)
4. Adds the result to the list
5. Returns the completed list

Result: [0, 1, 4, 9, 16]

<strong>Pro tips for writing great list comprehensions:</strong>

✅ <strong>Keep them short and sweet</strong> - One line, easy to read at a glance
✅ <strong>Use descriptive variable names</strong> - Even in comprehensions!
\`\`\`python
areas = [width * height for width, height in dimensions]  # Clear!
\`\`\`

✅ <strong>Add parentheses for complex expressions</strong>
\`\`\`python
results = [(x + y) * 2 for x, y in pairs]  # Clear grouping
\`\`\`

✅ <strong>Use comprehensions for list creation, regular loops for other side effects</strong>
\`\`\`python
# Good - creating a list:
doubled = [n * 2 for n in numbers]

# Bad - just printing (use regular loop):
[print(n) for n in numbers]  # Don't do this!
\`\`\`

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Using comprehensions when a regular loop is clearer</strong>
Readability first! If the comprehension is confusing, use a loop.

⚠️ <strong>Trying to do too much in one comprehension</strong>
Complex transformations deserve regular loops with intermediate variables.

⚠️ <strong>Forgetting the square brackets</strong>
\`\`\`python
doubled = n * 2 for n in numbers  # SyntaxError!
doubled = [n * 2 for n in numbers]  # Correct!
\`\`\`

⚠️ <strong>Using comprehensions for side effects</strong>
\`\`\`python
# Don't use comprehensions just to print or modify things
[print(x) for x in items]  # Bad - use regular for loop

# Comprehensions are for CREATING LISTS
numbers = [int(x) for x in string_numbers]  # Good!
\`\`\`

<strong>Real-world applications:</strong>

Data transformation is everywhere in programming:

<strong>Data cleaning:</strong>
\`\`\`python
messy_data = ["  alice  ", " bob", "charlie  "]
clean = [name.strip() for name in messy_data]
\`\`\`

<strong>Data preparation:</strong>
\`\`\`python
temperatures = [72, 68, 75, 71]
in_celsius = [(f - 32) * 5/9 for f in temperatures]
\`\`\`

<strong>Creating UI elements:</strong>
\`\`\`python
numbers = range(1, 6)
buttons = [f"Button {n}" for n in numbers]
\`\`\`

<strong>Processing API responses:</strong>
\`\`\`python
user_data = [user['name'] for user in api_response]
\`\`\`

List comprehensions are a gateway to more advanced Python programming. They embody the Python philosophy: "There should be one - and preferably only one - obvious way to do it." Once you internalize the pattern, they become second nature, and your code becomes cleaner, faster, and more Pythonic!

Practice using list comprehensions for simple transformations, and soon they'll feel as natural as writing regular for loops. That's when you know you're thinking like a Python programmer!
`,
      codeExamples: [
        {
          title: 'Basic List Comprehension',
          code: `# Traditional loop
squares_loop = []
for x in range(5):
    squares_loop.append(x ** 2)

print(squares_loop)  # [0, 1, 4, 9, 16]

# List comprehension (same result, one line)
squares_comp = [x ** 2 for x in range(5)]
print(squares_comp)  # [0, 1, 4, 9, 16]

# More examples
doubles = [x * 2 for x in range(6)]
print(doubles)  # [0, 2, 4, 6, 8, 10]

cubes = [x ** 3 for x in range(4)]
print(cubes)  # [0, 1, 8, 27]`,
          explanation: 'List comprehensions replace simple for loops'
        },
        {
          title: 'String Transformations',
          code: `names = ['alice', 'bob', 'charlie']

# Convert to uppercase
upper_names = [name.upper() for name in names]
print(upper_names)  # ['ALICE', 'BOB', 'CHARLIE']

# Capitalize first letter
cap_names = [name.capitalize() for name in names]
print(cap_names)  # ['Alice', 'Bob', 'Charlie']

# Get lengths
lengths = [len(name) for name in names]
print(lengths)  # [5, 3, 7]

# Create greetings
greetings = [f"Hello, {name}!" for name in names]
print(greetings)
# ['Hello, alice!', 'Hello, bob!', 'Hello, charlie!']`,
          explanation: 'Transform strings with list comprehensions'
        },
        {
          title: 'Working with Numbers',
          code: `numbers = [1, 2, 3, 4, 5]

# Square each number
squares = [n ** 2 for n in numbers]
print(squares)  # [1, 4, 9, 16, 25]

# Convert to strings
str_nums = [str(n) for n in numbers]
print(str_nums)  # ['1', '2', '3', '4', '5']

# Calculate percentages
scores = [85, 92, 78, 95]
percentages = [f"{score}%" for score in scores]
print(percentages)  # ['85%', '92%', '78%', '95%']

# Apply formula
celsius = [0, 10, 20, 30, 40]
fahrenheit = [(c * 9/5) + 32 for c in celsius]
print(fahrenheit)  # [32.0, 50.0, 68.0, 86.0, 104.0]`,
          explanation: 'Perform calculations on all elements'
        },
        {
          title: 'Iterating Over Strings',
          code: `# Get each character
word = "Python"
chars = [char for char in word]
print(chars)  # ['P', 'y', 't', 'h', 'o', 'n']

# Convert to uppercase
upper_chars = [char.upper() for char in word]
print(upper_chars)  # ['P', 'Y', 'T', 'H', 'O', 'N']

# Get ASCII codes
codes = [ord(char) for char in word]
print(codes)  # [80, 121, 116, 104, 111, 110]

# Create repeated pattern
pattern = [char * 3 for char in "ABC"]
print(pattern)  # ['AAA', 'BBB', 'CCC']`,
          explanation: 'Iterate over strings character by character'
        },
        {
          title: 'Calling Methods',
          code: `# Strip whitespace from all strings
messy = ["  hello  ", " world ", "python  "]
clean = [text.strip() for text in messy]
print(clean)  # ['hello', 'world', 'python']

# Split strings
sentences = ["Hello world", "Python programming", "List comprehension"]
word_lists = [sentence.split() for sentence in sentences]
print(word_lists)
# [['Hello', 'world'], ['Python', 'programming'], ['List', 'comprehension']]

# Replace text
phrases = ["I like cats", "cats are cute", "my cat"]
dog_phrases = [phrase.replace("cat", "dog") for phrase in phrases]
print(dog_phrases)
# ['I like dogs', 'dogs are cute', 'my dog']`,
          explanation: 'Call methods on each element'
        }
      ],
      concepts: ['list comprehensions', 'syntax', 'transformation', 'iteration', 'pythonic code']
    },
    starterCode: `# TODO: Create a list of numbers from 1 to 10
# TODO: Use a list comprehension to create a new list with each number tripled
# TODO: Print the result

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Uses list comprehension to transform data'
      }
    ],
    hints: [
      'Start with: numbers = list(range(1, 11))',
      'List comprehension: [n * 3 for n in numbers]',
      'Or in one line: [n * 3 for n in range(1, 11)]'
    ],
    challenge: {
      prompt: `Create a list using comprehension:
1. Create a list of squares from 1 to 10
2. Use list comprehension: [n**2 for n in range(1, 11)]
3. Print the result
4. Compare with traditional loop approach`,
      starterCode: '# Write your solution here\n',
      solution: 'squares = [n**2 for n in range(1, 11)]\nprint(squares)',
      tests: [],
      explanation: 'List comprehensions are concise! Format: [expression for item in iterable]. Much shorter than loops!',
      hints: [
        'Use range(1, 11) for numbers 1-10',
        'Expression: n**2 for square',
        'Format: [n**2 for n in range(1, 11)]'
      ],
      xpReward: 500,
    },
    xpReward: 100,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 10-2: List Comprehensions with Conditions
  {
    id: 'lesson-8-2',
    moduleId: 'module-8',
    courseId: 'beginner',
    title: 'List Comprehensions with Conditions',
    content: {
      explanation: `List Comprehensions with Conditions - Supercharge Your Lists! ⚡

Now that you understand basic list comprehensions, it's time to unlock their TRUE power - adding conditions! This lets you filter data, transform elements selectively, and build incredibly expressive one-liners that would take many lines of traditional code. Conditional comprehensions are where list comprehensions go from useful to indispensable!

<strong>Two ways to use conditions - Understanding the critical difference:</strong>

There are TWO completely different ways to add conditions to list comprehensions, and confusing them is one of the most common beginner mistakes. Let's clarify them once and for all:

<strong>Way 1: Filtering (if at the END) - "Only include items that match"</strong>

\`\`\`python
[expression for item in iterable if condition]
\`\`\`

This FILTERS the list - only items where the condition is True make it into the result. Think of it as a bouncer at a club: "You can only come in if you meet this requirement."

Example - Get only even numbers:
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [x for x in numbers if x % 2 == 0]
# Result: [2, 4, 6, 8, 10]
# Notice: Only 5 items (the even ones)
\`\`\`

The \`if\` at the end acts as a filter - numbers failing the test are excluded completely!

<strong>Way 2: Conditional expression (if-else at the START) - "Transform items differently based on condition"</strong>

\`\`\`python
[expr_if_true if condition else expr_if_false for item in iterable]
\`\`\`

This transforms EVERY item, but differently based on the condition. Think of it as sorting items into categories: "If this, do that; otherwise, do something else."

Example - Label numbers as even or odd:
\`\`\`python
numbers = [1, 2, 3, 4, 5]
labels = ['even' if x % 2 == 0 else 'odd' for x in numbers]
# Result: ['odd', 'even', 'odd', 'even', 'odd']
# Notice: Still 5 items, but transformed based on condition
\`\`\`

The \`if-else\` at the start transforms each item into one of two values!

<strong>The key difference - This is crucial:</strong>

<strong>Filtering (if at end):</strong>
• Excludes items that don't match
• Results in FEWER items (or same number if all match)
• Produces items of the SAME type as original
• Used when you want to select a subset

<strong>Conditional expression (if-else at start):</strong>
• Transforms ALL items (nothing excluded)
• Results in SAME number of items
• Can produce items of DIFFERENT type
• Used when you want to process items differently

Visual comparison:
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]

# Filtering - get only large numbers (3 items)
large = [x for x in numbers if x > 3]
# [4, 5, 6]

# Conditional expression - label all numbers (6 items)
labels = ['large' if x > 3 else 'small' for x in numbers]
# ['small', 'small', 'small', 'large', 'large', 'large']
\`\`\`

<strong>Filtering examples - Selecting subsets:</strong>

<strong>Filter by numeric conditions:</strong>
\`\`\`python
numbers = [-5, -2, 0, 3, 7, -8, 12]

# Only positive numbers
positives = [n for n in numbers if n > 0]
# [3, 7, 12]

# Only numbers in a range
mid_range = [n for n in numbers if 0 <= n <= 10]
# [0, 3, 7]

# Only negative numbers
negatives = [n for n in numbers if n < 0]
# [-5, -2, -8]
\`\`\`

<strong>Filter strings by properties:</strong>
\`\`\`python
words = ['cat', 'elephant', 'dog', 'rhinoceros', 'ant']

# Only long words
long_words = [word for word in words if len(word) > 3]
# ['elephant', 'rhinoceros']

# Only words starting with specific letter
a_words = [word for word in words if word.startswith('a')]
# ['ant']

# Only words containing specific character
o_words = [word for word in words if 'o' in word]
# ['dog', 'rhinoceros']
\`\`\`

<strong>Filter by type or validity:</strong>
\`\`\`python
mixed_data = [1, 'hello', 3.14, None, 'world', 42, '', 0]

# Only numbers (int or float)
numbers_only = [x for x in mixed_data if isinstance(x, (int, float)) and x is not None]
# [1, 3.14, 42, 0]

# Only non-empty strings
strings_only = [x for x in mixed_data if isinstance(x, str) and x]
# ['hello', 'world']

# Only truthy values (excludes None, 0, '', False)
truthy_only = [x for x in mixed_data if x]
# [1, 'hello', 3.14, 'world', 42]
\`\`\`

<strong>Conditional expressions - Transforming based on conditions:</strong>

<strong>Simple if-else transformations:</strong>
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Label as even/odd
labels = ['even' if n % 2 == 0 else 'odd' for n in numbers]
# ['odd', 'even', 'odd', 'even', 'odd', 'even', 'odd', 'even', 'odd', 'even']

# Cap values at maximum
capped = [n if n <= 5 else 5 for n in numbers]
# [1, 2, 3, 4, 5, 5, 5, 5, 5, 5]

# Convert negative to zero, keep positive
non_negative = [n if n >= 0 else 0 for n in [-3, -1, 0, 2, 5]]
# [0, 0, 0, 2, 5]
\`\`\`

<strong>Practical transformations:</strong>
\`\`\`python
# Pass/fail grading
scores = [45, 67, 89, 92, 55, 38, 78]
results = ['Pass' if s >= 60 else 'Fail' for s in scores]
# ['Fail', 'Pass', 'Pass', 'Pass', 'Fail', 'Fail', 'Pass']

# Apply discount to expensive items
prices = [10.99, 25.50, 5.00, 100.00, 15.75]
final_prices = [p * 0.9 if p > 20 else p for p in prices]
# [10.99, 22.95, 5.0, 90.0, 15.75]

# Pluralize based on count
counts = [0, 1, 2, 5, 1, 3]
items = [f"{c} item" if c == 1 else f"{c} items" for c in counts]
# ['0 items', '1 item', '2 items', '5 items', '1 item', '3 items']
\`\`\`

<strong>Multiple conditions - Combining filters with and/or:</strong>

<strong>Using AND - Both conditions must be true:</strong>
\`\`\`python
numbers = range(1, 31)

# Divisible by BOTH 2 AND 3
div_both = [n for n in numbers if n % 2 == 0 and n % 3 == 0]
# [6, 12, 18, 24, 30]

# In range AND even
filtered = [n for n in numbers if 10 <= n <= 20 and n % 2 == 0]
# [10, 12, 14, 16, 18, 20]
\`\`\`

<strong>Using OR - Either condition can be true:</strong>
\`\`\`python
# Divisible by 2 OR 3
div_either = [n for n in range(1, 16) if n % 2 == 0 or n % 3 == 0]
# [2, 3, 4, 6, 8, 9, 10, 12, 14, 15]
\`\`\`

<strong>Complex conditions:</strong>
\`\`\`python
words = ['Python', 'is', 'awesome', 'and', 'powerful']

# Long words OR words starting with 'a'
selected = [w for w in words if len(w) > 5 or w.startswith('a')]
# ['Python', 'awesome', 'and']

# Words that are NOT short AND NOT single letter
filtered = [w for w in words if len(w) > 2 and len(w) <= 8]
# ['Python', 'awesome', 'and']
\`\`\`

<strong>Chained if-elif-else (multiple conditions):</strong>

You can chain multiple conditions for complex transformations:

\`\`\`python
scores = [55, 72, 68, 91, 45, 88, 76]

# Grade assignment with multiple thresholds
grades = ['A' if s >= 90
          else 'B' if s >= 80
          else 'C' if s >= 70
          else 'D' if s >= 60
          else 'F'
          for s in scores]
# ['F', 'C', 'D', 'A', 'F', 'B', 'C']
\`\`\`

This reads as: "If >= 90: A, else if >= 80: B, else if >= 70: C, etc."

<strong>Real-world patterns you'll use constantly:</strong>

<strong>Data validation and cleaning:</strong>
\`\`\`python
user_inputs = ['25', '  ', 'abc', '30', '', '42']

# Convert valid numbers, skip invalid
valid_numbers = [int(x) for x in user_inputs
                 if x.strip() and x.strip().isdigit()]
# [25, 30, 42]
\`\`\`

<strong>Processing emails:</strong>
\`\`\`python
emails = ['alice@example.com', 'invalid', 'bob@test.com', 'bad-email']

# Only valid emails (contain @ and .)
valid = [email for email in emails if '@' in email and '.' in email]
# ['alice@example.com', 'bob@test.com']
\`\`\`

<strong>Categorizing data:</strong>
\`\`\`python
ages = [12, 25, 17, 45, 8, 35, 19, 60]

# Categorize as child/teen/adult/senior
categories = ['child' if age < 13
              else 'teen' if age < 18
              else 'adult' if age < 60
              else 'senior'
              for age in ages]
# ['child', 'adult', 'teen', 'adult', 'child', 'adult', 'adult', 'senior']
\`\`\`

<strong>Extracting specific data:</strong>
\`\`\`python
users = [
    {'name': 'Alice', 'active': True, 'score': 85},
    {'name': 'Bob', 'active': False, 'score': 92},
    {'name': 'Charlie', 'active': True, 'score': 78}
]

# Names of active users only
active_names = [user['name'] for user in users if user['active']]
# ['Alice', 'Charlie']

# High scores from active users
high_scores = [user['score'] for user in users
               if user['active'] and user['score'] >= 80]
# [85]
\`\`\`

<strong>Common mistakes to avoid:</strong>

⚠️ <strong>Confusing filter (if) with conditional expression (if-else):</strong>
\`\`\`python
# Wrong - SyntaxError (if without else at start)
bad = ['even' if x % 2 == 0 for x in numbers]

# Correct - Use else or move if to end
good = ['even' if x % 2 == 0 else 'odd' for x in numbers]
# or
good = [x for x in numbers if x % 2 == 0]
\`\`\`

⚠️ <strong>Too complex conditions hurting readability:</strong>
\`\`\`python
# Hard to read - use regular loop instead!
result = [complex_transform(x) for x in data
          if condition1(x) and (condition2(x) or condition3(x))
          and not condition4(x) and x.property > threshold]
\`\`\`

⚠️ <strong>Forgetting parentheses in complex expressions:</strong>
\`\`\`python
# Ambiguous - use parentheses!
result = [x * 2 + 3 if x > 5 else x - 1 for x in numbers]

# Clear:
result = [(x * 2 + 3) if x > 5 else (x - 1) for x in numbers]
\`\`\`

<strong>Best practices:</strong>

✅ Use filtering (if at end) when you want to select a subset
✅ Use conditional expression (if-else at start) when you want to transform all items
✅ Keep conditions simple and readable
✅ Use parentheses to clarify complex expressions
✅ If the comprehension is too complex, use a regular for loop
✅ Add comments for non-obvious filtering logic

Conditional list comprehensions are incredibly powerful for data processing, filtering, and transformation. They're a fundamental tool for writing clean, efficient Python code. Practice both filtering and conditional expressions until you can recognize which one you need at a glance!
`,
      codeExamples: [
        {
          title: 'Filtering with if',
          code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Get only even numbers
evens = [n for n in numbers if n % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]

# Get only odd numbers
odds = [n for n in numbers if n % 2 != 0]
print(odds)  # [1, 3, 5, 7, 9]

# Get numbers greater than 5
big = [n for n in numbers if n > 5]
print(big)  # [6, 7, 8, 9, 10]

# Get numbers in range
mid_range = [n for n in numbers if 3 <= n <= 7]
print(mid_range)  # [3, 4, 5, 6, 7]`,
          explanation: 'if at end filters out items'
        },
        {
          title: 'Filtering Strings',
          code: `words = ['cat', 'elephant', 'dog', 'hippopotamus', 'ant']

# Words longer than 3 characters
long_words = [word for word in words if len(word) > 3]
print(long_words)  # ['elephant', 'hippopotamus']

# Words starting with specific letter
a_words = [word for word in words if word.startswith('a')]
print(a_words)  # ['ant']

# Words containing 'o'
o_words = [word for word in words if 'o' in word]
print(o_words)  # ['dog', 'hippopotamus']

names = ['Alice', 'bob', 'Charlie', 'david']
# Capitalized names only
cap_names = [name for name in names if name[0].isupper()]
print(cap_names)  # ['Alice', 'Charlie']`,
          explanation: 'Filter strings based on conditions'
        },
        {
          title: 'Conditional Expressions (if-else)',
          code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Label as even or odd
labels = ['even' if n % 2 == 0 else 'odd' for n in numbers]
print(labels)
# ['odd', 'even', 'odd', 'even', 'odd', 'even', 'odd', 'even', 'odd', 'even']

# Cap values at 5
capped = [n if n <= 5 else 5 for n in numbers]
print(capped)  # [1, 2, 3, 4, 5, 5, 5, 5, 5, 5]

# Absolute values
nums = [-5, -2, 0, 3, -8, 7]
abs_nums = [n if n >= 0 else -n for n in nums]
print(abs_nums)  # [5, 2, 0, 3, 8, 7]

# Replace negative with zero
fixed = [n if n > 0 else 0 for n in nums]
print(fixed)  # [0, 0, 0, 3, 0, 7]`,
          explanation: 'if-else transforms items conditionally'
        },
        {
          title: 'Multiple Conditions',
          code: `numbers = range(1, 31)

# Divisible by both 2 and 3
div_both = [n for n in numbers if n % 2 == 0 and n % 3 == 0]
print(div_both)  # [6, 12, 18, 24, 30]

# Divisible by 2 or 3
div_either = [n for n in numbers if n % 2 == 0 or n % 3 == 0]
print(div_either)  # [2, 3, 4, 6, 8, 9, 10, 12, 14, 15, 18, 20, 21, 24, 26, 27, 30]

# In specific range and even
filtered = [n for n in numbers if 10 <= n <= 20 and n % 2 == 0]
print(filtered)  # [10, 12, 14, 16, 18, 20]

scores = [45, 67, 89, 92, 55, 38, 78]
# Passing scores (>= 60) that are also above 70
good_scores = [s for s in scores if s >= 60 and s >= 70]
print(good_scores)  # [67, 89, 92, 78]`,
          explanation: 'Combine multiple conditions with and/or'
        },
        {
          title: 'Practical Examples',
          code: `# Filter and transform emails
emails = ['alice@example.com', 'invalid', 'bob@test.com', 'bad-email']
valid_emails = [email.lower() for email in emails if '@' in email and '.' in email]
print(valid_emails)  # ['alice@example.com', 'bob@test.com']

# Process prices with discount
prices = [10.99, 25.50, 5.00, 100.00, 15.75]
# Apply 10% discount to items over $20
discounted = [p * 0.9 if p > 20 else p for p in prices]
print(discounted)  # [10.99, 22.95, 5.0, 90.0, 15.75]

# Extract numbers from mixed list
mixed = [1, 'hello', 3.14, 'world', 42, None, 7]
nums_only = [x for x in mixed if isinstance(x, (int, float))]
print(nums_only)  # [1, 3.14, 42, 7]

# Grade categories
scores = [55, 72, 68, 91, 45, 88, 76]
grades = ['A' if s >= 90 else 'B' if s >= 80 else 'C' if s >= 70 else 'D' if s >= 60 else 'F'
          for s in scores]
print(grades)  # ['F', 'C', 'D', 'A', 'F', 'B', 'C']`,
          explanation: 'Real-world filtering and transformation'
        }
      ],
      concepts: ['conditional comprehensions', 'filtering', 'if conditions', 'if-else expressions', 'multiple conditions']
    },
    starterCode: `# TODO: Create a list of numbers from 1 to 20
# TODO: Use a list comprehension to get only numbers divisible by 3
# TODO: Print the result

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Uses list comprehension with if condition to filter'
      }
    ],
    hints: [
      'Numbers 1-20: range(1, 21)',
      'Divisible by 3: n % 3 == 0',
      'Syntax: [n for n in range(1, 21) if n % 3 == 0]'
    ],
    challenge: {
      prompt: `Filter with list comprehension:
1. Create a list: words = ["apple", "banana", "kiwi", "strawberry"]
2. Use comprehension to get only words with length > 5
3. Use: [word for word in words if len(word) > 5]
4. Print the result`,
      starterCode: '# Write your solution here\n',
      solution: 'words = ["apple", "banana", "kiwi", "strawberry"]\nlong_words = [word for word in words if len(word) > 5]\nprint(long_words)',
      tests: [],
      explanation: 'Add if condition at the end to filter! Only items that meet the condition are included.',
      hints: [
        'Filter with: if len(word) > 5',
        'Place condition after the for clause',
        'Format: [word for word in words if condition]'
      ],
      xpReward: 500,
    },
    xpReward: 100,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 10-3: Nested Lists and 2D Data
  {
    id: 'lesson-8-3',
    moduleId: 'module-8',
    courseId: 'beginner',
    title: 'Nested Lists and 2D Data',
    content: {
      explanation: `Nested Lists and 2D Data - Building Multi-Dimensional Structures! 🏗️

Nested lists are lists that contain other lists as elements, creating multi-dimensional data structures. They're incredibly useful for representing tables, grids, matrices, game boards, spreadsheets, and any data that naturally fits into rows and columns. Understanding nested lists unlocks powerful data organization patterns you'll use throughout your programming career!

<strong>What are nested lists? The fundamental concept:</strong>

A nested list is simply a list where each element is itself another list. Think of it like a filing cabinet: the outer list is the cabinet with drawers, and each drawer (inner list) contains multiple items.

\`\`\`python
# Simple nested list
matrix = [
    [1, 2, 3],      # Row 0
    [4, 5, 6],      # Row 1
    [7, 8, 9]       # Row 2
]
\`\`\`

This creates a 3x3 grid structure. The outer list has 3 elements, and each element is a list of 3 numbers. This is also called a "2D list" or "matrix" because it has two dimensions: rows and columns.

<strong>Accessing nested list elements - The double index:</strong>

To access elements in nested lists, you need TWO indices: one for the row and one for the column:

\`\`\`python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# First index gets the row (the inner list)
matrix[0]       # [1, 2, 3] - entire first row

# Second index gets the element within that row
matrix[0][0]    # 1 - row 0, column 0 (top-left)
matrix[0][1]    # 2 - row 0, column 1
matrix[1][2]    # 6 - row 1, column 2
matrix[2][2]    # 9 - row 2, column 2 (bottom-right)
\`\`\`

Think of it as: \`matrix[row][column]\`

The first index \`[row]\` selects which inner list, and the second index \`[column]\` selects which element within that list.

<strong>Visual representation:</strong>
\`\`\`
matrix[row][column]

       Column 0  Column 1  Column 2
Row 0:    1         2         3
Row 1:    4         5         6
Row 2:    7         8         9

matrix[1][2] = 6  (row 1, column 2)
\`\`\`

<strong>Real-world use cases - Where nested lists shine:</strong>

<strong>1. Tables and Spreadsheets:</strong>

Nested lists are perfect for representing tabular data like spreadsheets or database tables:

\`\`\`python
# Student records: [name, age, grade, score]
students = [
    ['Alice', 20, 'A', 95],
    ['Bob', 19, 'B', 87],
    ['Charlie', 21, 'A', 92],
    ['Diana', 20, 'C', 78]
]

# Access specific data
print(students[0][0])  # 'Alice' - first student's name
print(students[1][3])  # 87 - Bob's score

# Process all records
for student in students:
    name = student[0]
    score = student[3]
    print(f"{name}: {score}")
\`\`\`

<strong>2. Game Boards:</strong>

Grid-based games use nested lists naturally:

\`\`\`python
# Tic-tac-toe board
board = [
    ['X', 'O', 'X'],
    ['O', 'X', 'O'],
    [' ', 'X', ' ']
]

# Check center square
if board[1][1] == 'X':
    print("X is in the center!")

# Chess board (8x8)
chess_board = [[' ' for _ in range(8)] for _ in range(8)]
chess_board[0][0] = 'R'  # Rook in corner
\`\`\`

<strong>3. Coordinate Systems:</strong>

Points in 2D/3D space:

\`\`\`python
# 2D points [x, y]
points = [[0, 0], [1, 2], [3, 4], [5, 1]]

# 3D points [x, y, z]
points_3d = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# Calculate distances, transformations, etc.
\`\`\`

<strong>4. Pixel Data:</strong>

Images are 2D grids of pixels:

\`\`\`python
# Simple 5x5 image (0=black, 1=white)
image = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
]
\`\`\`

<strong>5. Calendar/Schedule Data:</strong>

Weeks of days, days of hours:

\`\`\`python
# Week schedule: [day][hour]
schedule = [
    ['work', 'work', 'work', 'lunch', 'work'],  # Monday
    ['work', 'work', 'work', 'lunch', 'work'],  # Tuesday
    ['work', 'work', 'work', 'lunch', 'free'],  # Wednesday
    # ... more days
]
\`\`\`

<strong>Creating nested lists with comprehensions - The power move:</strong>

You can create nested lists using nested list comprehensions! The syntax reads from outer to inner:

\`\`\`python
# Create 3x3 matrix of zeros
matrix = [[0 for _ in range(3)] for _ in range(3)]
# Result: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
\`\`\`

Reading this comprehension:
- Outer loop: \`for _ in range(3)\` creates 3 rows
- Inner loop: \`[0 for _ in range(3)]\` creates each row with 3 zeros

<strong>More examples:</strong>

\`\`\`python
# Create 4x5 matrix (4 rows, 5 columns)
matrix = [[0 for _ in range(5)] for _ in range(4)]

# Create identity matrix (1s on diagonal)
size = 4
identity = [[1 if i == j else 0 for j in range(size)] for i in range(size)]
# [[1, 0, 0, 0],
#  [0, 1, 0, 0],
#  [0, 0, 1, 0],
#  [0, 0, 0, 1]]

# Create multiplication table
mult_table = [[i * j for j in range(1, 11)] for i in range(1, 11)]
\`\`\`

<strong>Understanding the syntax order - Critical for reading comprehensions:</strong>

The order in nested comprehensions can be confusing at first:

\`\`\`python
[[expression for col in range(cols)] for row in range(rows)]
#  ^^^^^^^^^  ^^^^^^^^^^^^^^^^^^^^    ^^^^^^^^^^^^^^^^^^^^^^
#  What to     Inner loop (columns)    Outer loop (rows)
#  create      (comes first visually)  (comes last visually)
\`\`\`

Read it right-to-left for the loop order:
1. \`for row in range(rows)\` - outer loop runs first
2. \`for col in range(cols)\` - inner loop runs for each outer iteration
3. \`expression\` - what to put in each position

<strong>Flattening nested lists - Converting 2D to 1D:</strong>

Sometimes you need to convert a nested list into a single flat list:

\`\`\`python
nested = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]

# Flatten using nested comprehension
flat = [item for sublist in nested for item in sublist]
# Result: [1, 2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

Reading the flattening comprehension:
1. \`for sublist in nested\` - iterate through each inner list
2. \`for item in sublist\` - iterate through each item in that inner list
3. \`item\` - collect each individual item

This is equivalent to:
\`\`\`python
flat = []
for sublist in nested:
    for item in sublist:
        flat.append(item)
\`\`\`

<strong>Real-world flattening example:</strong>
\`\`\`python
# Combine all test scores from multiple students
all_scores = [
    [85, 90, 88],  # Alice's scores
    [92, 89, 95],  # Bob's scores
    [78, 82, 80]   # Charlie's scores
]

all_flat = [score for student in all_scores for score in student]
# [85, 90, 88, 92, 89, 95, 78, 82, 80]

class_average = sum(all_flat) / len(all_flat)
print(f"Class average: {class_average:.2f}")
\`\`\`

<strong>Iterating over nested lists - Three powerful approaches:</strong>

<strong>Approach 1: Nested for loops (most explicit)</strong>
\`\`\`python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for row in matrix:
    for element in row:
        print(element, end=' ')
    print()  # New line after each row

# Output:
# 1 2 3
# 4 5 6
# 7 8 9
\`\`\`

<strong>Approach 2: With indices (when you need positions)</strong>
\`\`\`python
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        print(f"matrix[{i}][{j}] = {matrix[i][j]}")

# Useful for updating values:
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        matrix[i][j] *= 2  # Double all values
\`\`\`

<strong>Approach 3: With enumerate (best of both worlds)</strong>
\`\`\`python
for row_idx, row in enumerate(matrix):
    for col_idx, value in enumerate(row):
        print(f"[{row_idx},{col_idx}]: {value}")
\`\`\`

<strong>Modifying nested lists - Important patterns:</strong>

<strong>Update individual elements:</strong>
\`\`\`python
board = [
    ['O', 'X', 'O'],
    ['X', 'O', 'X'],
    ['O', 'X', 'O']
]

# Change center element
board[1][1] = 'X'

# Update entire row
board[0] = ['X', 'X', 'X']
\`\`\`

<strong>Transform all elements:</strong>
\`\`\`python
# Double all values
matrix = [[1, 2], [3, 4], [5, 6]]
doubled = [[x * 2 for x in row] for row in matrix]
# [[2, 4], [6, 8], [10, 12]]
\`\`\`

<strong>Common operations on matrices:</strong>

<strong>Get specific column:</strong>
\`\`\`python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Get column 1 (all middle elements)
column_1 = [row[1] for row in matrix]
# [2, 5, 8]
\`\`\`

<strong>Transpose (swap rows and columns):</strong>
\`\`\`python
transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]
# Original:     Transposed:
# [1, 2, 3]     [1, 4, 7]
# [4, 5, 6]  →  [2, 5, 8]
# [7, 8, 9]     [3, 6, 9]
\`\`\`

<strong>Find specific value:</strong>
\`\`\`python
# Find position of value 5
for i, row in enumerate(matrix):
    for j, value in enumerate(row):
        if value == 5:
            print(f"Found at [{i}][{j}]")
\`\`\`

<strong>Common pitfalls to avoid:</strong>

⚠️ <strong>Shallow copy problem with list multiplication:</strong>
\`\`\`python
# WRONG - Creates references to same list!
matrix = [[0] * 3] * 3
matrix[0][0] = 1
# Result: [[1, 0, 0], [1, 0, 0], [1, 0, 0]]  # All rows change!

# CORRECT - Creates independent lists
matrix = [[0 for _ in range(3)] for _ in range(3)]
matrix[0][0] = 1
# Result: [[1, 0, 0], [0, 0, 0], [0, 0, 0]]  # Only first row changes
\`\`\`

⚠️ <strong>Index out of range errors:</strong>
\`\`\`python
matrix = [[1, 2], [3, 4]]
# matrix[0][2]  # IndexError - row has only 2 columns!
# matrix[2][0]  # IndexError - only 2 rows!
\`\`\`

⚠️ <strong>Confusing row/column order:</strong>
\`\`\`python
# Remember: matrix[row][column], not matrix[x][y]!
value = matrix[2][1]  # Row 2, Column 1
\`\`\`

<strong>Best practices for nested lists:</strong>

✅ Use descriptive variable names: \`board[row][col]\` not \`data[i][j]\`
✅ Keep nesting shallow (2-3 levels max) for readability
✅ Use comprehensions for creation, but regular loops for complex logic
✅ Add comments showing dimensions: \`# 3x3 matrix\`
✅ Consider using NumPy for heavy mathematical matrix operations
✅ Always check dimensions before accessing elements
✅ Use enumerate when you need both index and value

<strong>Real-world example - Process student grades:</strong>
\`\`\`python
# Student data: [name, [test1, test2, test3]]
students = [
    ['Alice', [85, 90, 88]],
    ['Bob', [92, 89, 95]],
    ['Charlie', [78, 82, 80]]
]

# Calculate averages
for student in students:
    name = student[0]
    scores = student[1]
    average = sum(scores) / len(scores)
    print(f"{name}: {average:.1f}")

# Get all scores for test 1
test1_scores = [student[1][0] for student in students]
print(f"Test 1 average: {sum(test1_scores) / len(test1_scores):.1f}")
\`\`\`

Nested lists are fundamental data structures in Python. They let you organize complex data in intuitive, grid-like structures. Whether you're building games, processing data, or working with mathematical matrices, nested lists provide the foundation you need!
`,
      codeExamples: [
        {
          title: 'Creating and Accessing Nested Lists',
          code: `# Create 2D list (matrix)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(matrix)  # Entire matrix

# Access rows
print(matrix[0])  # [1, 2, 3]
print(matrix[1])  # [4, 5, 6]

# Access individual elements
print(matrix[0][0])  # 1 (row 0, col 0)
print(matrix[1][2])  # 6 (row 1, col 2)
print(matrix[2][1])  # 8 (row 2, col 1)

# Modify elements
matrix[0][0] = 10
print(matrix[0])  # [10, 2, 3]`,
          explanation: 'Access nested lists with double indexing [row][col]'
        },
        {
          title: 'Practical Example: Student Data',
          code: `# Student records [name, math_score, english_score]
students = [
    ['Alice', 85, 90],
    ['Bob', 92, 88],
    ['Charlie', 78, 85],
    ['Diana', 95, 92]
]

# Access student data
print(f"First student: {students[0][0]}")  # Alice
print(f"Bob's math score: {students[1][1]}")  # 92

# Iterate through all students
for student in students:
    name = student[0]
    math = student[1]
    english = student[2]
    average = (math + english) / 2
    print(f"{name}: Math={math}, English={english}, Avg={average}")

# Get all names
names = [student[0] for student in students]
print(names)  # ['Alice', 'Bob', 'Charlie', 'Diana']`,
          explanation: 'Store and process tabular data with nested lists'
        },
        {
          title: 'Creating Matrix with Comprehension',
          code: `# Create 3x3 matrix of zeros
zeros = [[0 for _ in range(3)] for _ in range(3)]
print(zeros)
# [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

# Create 4x4 identity matrix
identity = [[1 if i == j else 0 for j in range(4)] for i in range(4)]
print(identity)
# [[1, 0, 0, 0],
#  [0, 1, 0, 0],
#  [0, 0, 1, 0],
#  [0, 0, 0, 1]]

# Create multiplication table
mult_table = [[i * j for j in range(1, 6)] for i in range(1, 6)]
for row in mult_table:
    print(row)
# [1, 2, 3, 4, 5]
# [2, 4, 6, 8, 10]
# [3, 6, 9, 12, 15]
# [4, 8, 12, 16, 20]
# [5, 10, 15, 20, 25]`,
          explanation: 'Generate matrices using nested comprehensions'
        },
        {
          title: 'Flattening Nested Lists',
          code: `# Nested list
nested = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]

# Flatten to single list
flat = [item for sublist in nested for item in sublist]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# How it works:
# for sublist in nested:     # [1,2,3], then [4,5], then [6,7,8,9]
#     for item in sublist:   # each number in sublist
#         add to new list

# Practical example: flatten scores
all_scores = [
    [85, 90, 88],  # Alice's scores
    [92, 89, 95],  # Bob's scores
    [78, 82, 80]   # Charlie's scores
]

all_flat = [score for student in all_scores for score in student]
print(f"All scores: {all_flat}")
print(f"Class average: {sum(all_flat) / len(all_flat)}")`,
          explanation: 'Flatten nested lists into single list'
        },
        {
          title: 'Iterating Over 2D Lists',
          code: `grid = [
    ['A', 'B', 'C'],
    ['D', 'E', 'F'],
    ['G', 'H', 'I']
]

# Method 1: Nested for loops
print("Method 1:")
for row in grid:
    for cell in row:
        print(cell, end=' ')
    print()  # New line after each row

# Method 2: With indices
print("\\nMethod 2:")
for i in range(len(grid)):
    for j in range(len(grid[i])):
        print(f"grid[{i}][{j}] = {grid[i][j]}")

# Method 3: With enumerate
print("\\nMethod 3:")
for row_idx, row in enumerate(grid):
    for col_idx, value in enumerate(row):
        print(f"Position ({row_idx},{col_idx}): {value}")`,
          explanation: 'Different ways to iterate over 2D structures'
        }
      ],
      concepts: ['nested lists', '2D lists', 'matrices', 'double indexing', 'nested comprehensions', 'flattening']
    },
    starterCode: `# TODO: Create a 3x3 nested list representing a tic-tac-toe board
# TODO: Use nested list comprehension to create it with all cells as "-"
# TODO: Print the board
# TODO: Access and change the center cell to "X"
# TODO: Print the board again

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Creates and manipulates nested lists'
      }
    ],
    hints: [
      'Create board: [["-" for _ in range(3)] for _ in range(3)]',
      'Center cell is board[1][1]',
      'Change with: board[1][1] = "X"',
      'Print each row with: for row in board: print(row)'
    ],
    challenge: {
      prompt: `Work with nested lists:
1. Create a 2D list: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
2. Access and print the middle element (5)
3. Use nested comprehension to create a list of all elements
4. Print the flattened list`,
      starterCode: '# Write your solution here\n',
      solution: 'matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nprint(matrix[1][1])\nflat = [num for row in matrix for num in row]\nprint(flat)',
      tests: [],
      explanation: 'Access nested lists with [row][col]. Flatten with nested comprehension: [item for row in matrix for item in row].',
      hints: [
        'Middle element: matrix[1][1]',
        'Flatten: [num for row in matrix for num in row]',
        'Outer loop goes through rows, inner through items'
      ],
      xpReward: 500,
    },
    xpReward: 125,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 10-4: Advanced List Methods and Operations
  {
    id: 'lesson-8-4',
    moduleId: 'module-8',
    courseId: 'beginner',
    title: 'Advanced List Methods and Operations',
    content: {
      explanation: `Advanced List Methods and Operations - Mastering List Manipulation! ⚙️

Beyond the basics, Python lists come packed with powerful built-in methods for sorting, searching, counting, reversing, and manipulating data in sophisticated ways. These methods are optimized, battle-tested, and essential for writing professional Python code. Master these tools, and you'll handle list operations with elegance and efficiency!

<strong>Sorting lists - The art of ordering data:</strong>

Sorting is one of the most common operations you'll perform. Python gives you two approaches, each with its own purpose:

<strong>Method 1: sort() - Sorts the list in-place (modifies the original)</strong>

The \`.sort()\` method modifies the original list directly and returns None:

\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5]
numbers.sort()  # Modifies numbers directly
print(numbers)  # [1, 1, 2, 3, 4, 5, 5, 6, 9]
\`\`\`

Key characteristics:
• Modifies the original list (destructive)
• Returns None (not a new list!)
• Most memory-efficient (no copy made)
• Use when you don't need the original order

Reverse sorting:
\`\`\`python
numbers.sort(reverse=True)  # Descending order
print(numbers)  # [9, 6, 5, 5, 4, 3, 2, 1, 1]
\`\`\`

<strong>Method 2: sorted() - Returns a new sorted list (preserves original)</strong>

The \`sorted()\` function creates and returns a new sorted list, leaving the original unchanged:

\`\`\`python
original = [3, 1, 4, 1, 5, 9, 2, 6, 5]
sorted_copy = sorted(original)

print(original)      # [3, 1, 4, 1, 5, 9, 2, 6, 5] - unchanged!
print(sorted_copy)   # [1, 1, 2, 3, 4, 5, 5, 6, 9] - sorted!
\`\`\`

Key characteristics:
• Preserves the original list (non-destructive)
• Returns a new list
• Uses more memory (creates a copy)
• Use when you need both sorted and original versions

<strong>When to use which:</strong>
- Use \`.sort()\` when you want to modify the list in place and don't need the original order
- Use \`sorted()\` when you want to keep the original list unchanged

<strong>The key parameter - Custom sorting logic:</strong>

Both \`sort()\` and \`sorted()\` accept a \`key\` parameter that lets you define custom sorting logic. This is incredibly powerful!

<strong>Sort by length:</strong>
\`\`\`python
words = ['python', 'is', 'awesome', 'programming', 'fun']
words.sort(key=len)
print(words)  # ['is', 'fun', 'python', 'awesome', 'programming']
\`\`\`

The \`key=len\` tells Python: "For each element, call len() on it, and sort by that value."

<strong>Case-insensitive string sorting:</strong>
\`\`\`python
names = ['alice', 'Bob', 'CHARLIE', 'diana']
names.sort()  # Case-sensitive: ['Bob', 'CHARLIE', 'alice', 'diana']

names.sort(key=str.lower)  # Case-insensitive
print(names)  # ['alice', 'Bob', 'CHARLIE', 'diana']
\`\`\`

<strong>Sort by specific element in nested lists:</strong>
\`\`\`python
students = [
    ['Alice', 85],
    ['Bob', 92],
    ['Charlie', 78],
    ['Diana', 95]
]

# Sort by score (second element)
students.sort(key=lambda student: student[1])
# Result: [['Charlie', 78], ['Alice', 85], ['Bob', 92], ['Diana', 95]]

# Sort by score descending
students.sort(key=lambda student: student[1], reverse=True)
# Result: [['Diana', 95], ['Bob', 92], ['Alice', 85], ['Charlie', 78]]
\`\`\`

The \`lambda\` keyword creates a small anonymous function. \`lambda student: student[1]\` means "take each student and return their score (index 1)."

<strong>Reversing lists - Three different approaches:</strong>

<strong>Method 1: reverse() - Reverses in-place</strong>
\`\`\`python
numbers = [1, 2, 3, 4, 5]
numbers.reverse()  # Modifies the list
print(numbers)  # [5, 4, 3, 2, 1]
\`\`\`

<strong>Method 2: Slicing with [::-1] - Creates a reversed copy</strong>
\`\`\`python
original = [1, 2, 3, 4, 5]
reversed_copy = original[::-1]

print(original)        # [1, 2, 3, 4, 5] - unchanged
print(reversed_copy)   # [5, 4, 3, 2, 1] - reversed
\`\`\`

<strong>Method 3: reversed() function - Returns an iterator</strong>
\`\`\`python
original = [1, 2, 3, 4, 5]
rev_iterator = reversed(original)
reversed_list = list(rev_iterator)
print(reversed_list)  # [5, 4, 3, 2, 1]
\`\`\`

<strong>List copying - Understanding shallow vs. deep copies:</strong>

When working with lists, understanding copying is crucial to avoid unexpected behavior:

<strong>Three ways to create shallow copies:</strong>
\`\`\`python
original = [1, 2, 3, 4, 5]

copy1 = original.copy()     # Method 1: .copy() method
copy2 = original[:]         # Method 2: full slice
copy3 = list(original)      # Method 3: list() constructor

# All are independent copies
copy1.append(6)
print(original)  # [1, 2, 3, 4, 5] - unchanged
print(copy1)     # [1, 2, 3, 4, 5, 6]
\`\`\`

⚠️ <strong>Critical warning about references:</strong>
\`\`\`python
# This does NOT create a copy!
original = [1, 2, 3]
not_a_copy = original  # Just another name for the same list!

not_a_copy.append(4)
print(original)     # [1, 2, 3, 4] - MODIFIED!
print(not_a_copy)   # [1, 2, 3, 4] - Same list!
\`\`\`

Both variables point to the same list in memory. Changes to one affect the other!

<strong>Counting and finding - Search operations:</strong>

<strong>count() - Count occurrences</strong>
\`\`\`python
numbers = [1, 2, 3, 2, 4, 2, 5, 2]

count_2 = numbers.count(2)
print(f"2 appears {count_2} times")  # 4 times

# Count multiple values
values_to_count = [1, 2, 3]
for value in values_to_count:
    print(f"{value} appears {numbers.count(value)} times")
\`\`\`

<strong>index() - Find position of first occurrence</strong>
\`\`\`python
fruits = ['apple', 'banana', 'cherry', 'banana', 'date']

# Find first banana
idx = fruits.index('banana')
print(f"First banana at index {idx}")  # 1

# Find banana after index 2
idx = fruits.index('banana', 2)  # Start searching from index 2
print(f"Next banana at index {idx}")  # 3

# Handle value not found
try:
    idx = fruits.index('grape')
except ValueError:
    print("Grape not found in list")
\`\`\`

<strong>Pro tip - Find all indices:</strong>
\`\`\`python
numbers = [1, 2, 3, 2, 4, 2, 5]
# Find all positions of 2
all_indices = [i for i, x in enumerate(numbers) if x == 2]
print(f"2 appears at indices: {all_indices}")  # [1, 3, 5]
\`\`\`

<strong>List concatenation and repetition:</strong>

<strong>Concatenation with + operator:</strong>
\`\`\`python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

combined = list1 + list2
print(combined)  # [1, 2, 3, 4, 5, 6]

# Multiple lists
result = [1, 2] + [3, 4] + [5, 6]
print(result)  # [1, 2, 3, 4, 5, 6]
\`\`\`

<strong>extend() - Add all elements from another list:</strong>
\`\`\`python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

list1.extend(list2)  # Modifies list1
print(list1)  # [1, 2, 3, 4, 5, 6]
print(list2)  # [4, 5, 6] - unchanged
\`\`\`

<strong>Difference between extend() and append():</strong>
\`\`\`python
numbers = [1, 2, 3]

# extend() adds each element individually
numbers.extend([4, 5, 6])
print(numbers)  # [1, 2, 3, 4, 5, 6]

# append() adds the entire list as one element
numbers = [1, 2, 3]
numbers.append([4, 5, 6])
print(numbers)  # [1, 2, 3, [4, 5, 6]] - nested list!
\`\`\`

<strong>List repetition with * operator:</strong>
\`\`\`python
# Create repeated elements
zeros = [0] * 10
print(zeros)  # [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

# Repeat patterns
pattern = [1, 2, 3] * 3
print(pattern)  # [1, 2, 3, 1, 2, 3, 1, 2, 3]

# Initialize game board
row = ['-'] * 3
# But be careful with nested lists (use comprehensions)!
\`\`\`

<strong>Removing and clearing:</strong>

<strong>clear() - Remove all elements:</strong>
\`\`\`python
numbers = [1, 2, 3, 4, 5]
numbers.clear()
print(numbers)  # []
\`\`\`

<strong>Practical patterns - Real-world usage:</strong>

<strong>Find min/max with their indices:</strong>
\`\`\`python
scores = [85, 92, 78, 95, 88, 91]

highest = max(scores)
lowest = min(scores)

highest_idx = scores.index(highest)
lowest_idx = scores.index(lowest)

print(f"Highest score: {highest} at position {highest_idx}")
print(f"Lowest score: {lowest} at position {lowest_idx}")
\`\`\`

<strong>Remove duplicates while preserving order:</strong>
\`\`\`python
# Using a comprehension with seen set
def remove_duplicates(items):
    seen = set()
    return [x for x in items if not (x in seen or seen.add(x))]

numbers = [1, 2, 2, 3, 1, 4, 3, 5]
unique = remove_duplicates(numbers)
print(unique)  # [1, 2, 3, 4, 5]
\`\`\`

<strong>Calculate statistics:</strong>
\`\`\`python
scores = [85, 92, 78, 90, 88, 95, 82, 87]

# Sort for easier analysis
sorted_scores = sorted(scores)

# Calculate statistics
average = sum(scores) / len(scores)
median = sorted_scores[len(sorted_scores) // 2]
highest = max(scores)
lowest = min(scores)
range_val = highest - lowest

print(f"Average: {average:.2f}")
print(f"Median: {median}")
print(f"Range: {range_val}")
\`\`\`

<strong>Best practices for list operations:</strong>

✅ Use \`sorted()\` to preserve original data
✅ Use \`key\` parameter for custom sorting instead of complex comparisons
✅ Always create proper copies (not references) when you need independent lists
✅ Use \`.count()\` and \`.index()\` for searching instead of manual loops
✅ Remember \`.extend()\` vs \`.append()\` - one adds elements, one adds a list
✅ Use list comprehensions for filtering/transforming instead of manual loops
✅ Check if element exists before calling \`.index()\` to avoid exceptions

<strong>Common mistakes to avoid:</strong>

⚠️ Using \`.sort()\` and expecting it to return the sorted list (it returns None!)
⚠️ Forgetting that \`list2 = list1\` creates a reference, not a copy
⚠️ Using \`*\` operator with mutable objects in nested lists
⚠️ Not handling ValueError when using \`.index()\` on non-existent values
⚠️ Confusing \`.extend()\` with \`.append()\`

<strong>Performance considerations:</strong>

• \`.sort()\` is O(n log n) - very efficient
• \`.index()\` is O(n) - searches from beginning
• \`.count()\` is O(n) - must check every element
• \`.reverse()\` is O(n) - but very fast in practice
• Use sets for frequent membership testing (O(1) instead of O(n))

These list methods are workhorses of Python programming. Master them, and you'll write cleaner, more efficient code that handles data manipulation with elegance!
`,
      codeExamples: [
        {
          title: 'Sorting Lists',
          code: `numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5]

# sort() - modifies original
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 5, 6, 9]

# Descending order
numbers.sort(reverse=True)
print(numbers)  # [9, 6, 5, 5, 4, 3, 2, 1, 1]

# sorted() - returns new list
original = [3, 1, 4, 1, 5]
sorted_nums = sorted(original)
print(f"Original: {original}")  # [3, 1, 4, 1, 5]
print(f"Sorted: {sorted_nums}")  # [1, 1, 3, 4, 5]

# Sort strings
words = ['banana', 'Apple', 'cherry', 'date']
words.sort()  # Case-sensitive
print(words)  # ['Apple', 'banana', 'cherry', 'date']

words.sort(key=str.lower)  # Case-insensitive
print(words)  # ['Apple', 'banana', 'cherry', 'date']`,
          explanation: 'Different ways to sort lists'
        },
        {
          title: 'Custom Sorting with key',
          code: `# Sort by length
words = ['python', 'is', 'awesome', 'programming']
words.sort(key=len)
print(words)  # ['is', 'python', 'awesome', 'programming']

# Sort by last character
words.sort(key=lambda x: x[-1])
print(words)  # ['awesome', 'is', 'programming', 'python']

# Sort students by score
students = [
    ['Alice', 85],
    ['Bob', 92],
    ['Charlie', 78],
    ['Diana', 95]
]

# Sort by score (second element)
students.sort(key=lambda student: student[1])
for student in students:
    print(f"{student[0]}: {student[1]}")
# Charlie: 78, Alice: 85, Bob: 92, Diana: 95

# Sort by score descending
students.sort(key=lambda student: student[1], reverse=True)
for student in students:
    print(f"{student[0]}: {student[1]}")
# Diana: 95, Bob: 92, Alice: 85, Charlie: 78`,
          explanation: 'Use key parameter for custom sorting logic'
        },
        {
          title: 'Reversing Lists',
          code: `numbers = [1, 2, 3, 4, 5]

# reverse() - modifies original
numbers.reverse()
print(numbers)  # [5, 4, 3, 2, 1]

# Slicing [::-1] - creates copy
original = [1, 2, 3, 4, 5]
reversed_copy = original[::-1]
print(f"Original: {original}")  # [1, 2, 3, 4, 5]
print(f"Reversed: {reversed_copy}")  # [5, 4, 3, 2, 1]

# reversed() - returns iterator
original = [1, 2, 3, 4, 5]
rev_iter = reversed(original)
rev_list = list(rev_iter)
print(rev_list)  # [5, 4, 3, 2, 1]`,
          explanation: 'Different methods to reverse lists'
        },
        {
          title: 'count() and index()',
          code: `numbers = [1, 2, 3, 2, 4, 2, 5, 2]

# Count occurrences
count_2 = numbers.count(2)
print(f"2 appears {count_2} times")  # 4 times

# Find index of first occurrence
index_2 = numbers.index(2)
print(f"First 2 is at index {index_2}")  # 1

# index() with start position
index_2_after_2 = numbers.index(2, 2)  # Start search at index 2
print(f"Next 2 is at index {index_2_after_2}")  # 3

# Find all indices
all_indices = [i for i, x in enumerate(numbers) if x == 2]
print(f"All positions of 2: {all_indices}")  # [1, 3, 5, 7]

# Check if item exists before using index
value = 10
if value in numbers:
    print(f"Index: {numbers.index(value)}")
else:
    print(f"{value} not in list")`,
          explanation: 'Search and count with count() and index()'
        },
        {
          title: 'List Copying and Concatenation',
          code: `# Shallow copy methods
original = [1, 2, 3, 4, 5]

copy1 = original.copy()
copy2 = original[:]
copy3 = list(original)

# All are independent copies
copy1.append(6)
print(f"Original: {original}")  # [1, 2, 3, 4, 5]
print(f"Copy1: {copy1}")        # [1, 2, 3, 4, 5, 6]

# Concatenation with +
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list1 + list2
print(combined)  # [1, 2, 3, 4, 5, 6]

# extend() - modifies original
list1.extend(list2)
print(list1)  # [1, 2, 3, 4, 5, 6]

# List multiplication
zeros = [0] * 5
print(zeros)  # [0, 0, 0, 0, 0]

pattern = [1, 2, 3] * 2
print(pattern)  # [1, 2, 3, 1, 2, 3]`,
          explanation: 'Copy, concatenate, and multiply lists'
        },
        {
          title: 'Practical Example: Data Processing',
          code: `# Process and analyze test scores
scores = [85, 92, 78, 90, 88, 76, 95, 89, 84, 91]

# Sort for analysis
sorted_scores = sorted(scores)
print(f"Sorted: {sorted_scores}")

# Find highest and lowest
highest = max(scores)
lowest = min(scores)
print(f"Highest: {highest}, Lowest: {lowest}")

# Count perfect scores
perfect = scores.count(100)
print(f"Perfect scores: {perfect}")

# Remove outliers (below 75)
filtered = [s for s in scores if s >= 75]
print(f"Filtered: {filtered}")

# Calculate statistics
average = sum(scores) / len(scores)
print(f"Average: {average:.2f}")

# Find median
sorted_scores = sorted(scores)
n = len(sorted_scores)
median = sorted_scores[n//2] if n % 2 == 1 else (sorted_scores[n//2-1] + sorted_scores[n//2]) / 2
print(f"Median: {median}")

# Group by grade
a_grades = [s for s in scores if s >= 90]
b_grades = [s for s in scores if 80 <= s < 90]
c_grades = [s for s in scores if 70 <= s < 80]

print(f"A grades: {len(a_grades)}")
print(f"B grades: {len(b_grades)}")
print(f"C grades: {len(c_grades)}")`,
          explanation: 'Combine methods for real data analysis'
        }
      ],
      concepts: ['sort()', 'sorted()', 'reverse()', 'count()', 'index()', 'key parameter', 'list copying', 'concatenation']
    },
    starterCode: `# TODO: Create a list of names in random order
# TODO: Sort the list alphabetically (case-insensitive)
# TODO: Print the sorted list
# TODO: Count how many names start with a specific letter
# TODO: Find the index of a specific name

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Uses sorting and list methods effectively'
      }
    ],
    hints: [
      'Create names = ["Charlie", "alice", "Bob", "diana"]',
      'Sort with names.sort(key=str.lower)',
      'Count with: sum(1 for name in names if name.lower().startswith("a"))',
      'Find with: names.index("alice")'
    ],
    challenge: {
      prompt: `Use advanced list methods:
1. Create numbers = [5, 2, 8, 1, 9, 3]
2. Sort the list (modify in place)
3. Find the max and min values
4. Count how many numbers are > 5
5. Print all results`,
      starterCode: '# Write your solution here\n',
      solution: 'numbers = [5, 2, 8, 1, 9, 3]\nnumbers.sort()\nprint(f"Sorted: {numbers}")\nprint(f"Max: {max(numbers)}")\nprint(f"Min: {min(numbers)}")\ncount = sum(1 for n in numbers if n > 5)\nprint(f"Numbers > 5: {count}")',
      tests: [],
      explanation: 'sort() modifies in place. max/min find extremes. Use comprehension with sum to count.',
      hints: [
        'Sort: numbers.sort()',
        'Max/Min: max(numbers), min(numbers)',
        'Count: sum(1 for n in numbers if n > 5)'
      ],
      xpReward: 500,
    },
    xpReward: 125,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 10-5: enumerate, zip, and Advanced Iteration
  {
    id: 'lesson-8-5',
    moduleId: 'module-8',
    courseId: 'beginner',
    title: 'enumerate, zip, and Advanced Iteration',
    content: {
      explanation: `enumerate, zip, and Advanced Iteration - Elegant Ways to Loop! 🔄

Python provides powerful built-in functions that make iterating over data more elegant, readable, and Pythonic. \`enumerate()\` and \`zip()\` are two functions that transform clunky iteration code into clean, professional patterns. These tools are hallmarks of experienced Python programmers - master them, and your code will instantly level up!

<strong>enumerate() - Track position while iterating:</strong>

How many times have you needed both the index AND the value while looping? The traditional approach uses \`range(len())\`, but it's verbose and un-Pythonic:

❌ <strong>The old, clunky way:</strong>
\`\`\`python
fruits = ['apple', 'banana', 'cherry']

# Awkward and hard to read
for i in range(len(fruits)):
    print(f"Index {i}: {fruits[i]}")
\`\`\`

✅ <strong>The Pythonic way with enumerate():</strong>
\`\`\`python
fruits = ['apple', 'banana', 'cherry']

# Clear, elegant, professional
for index, fruit in enumerate(fruits):
    print(f"Index {index}: {fruit}")

# Output:
# Index 0: apple
# Index 1: banana
# Index 2: cherry
\`\`\`

<strong>How enumerate() works:</strong>

\`enumerate()\` takes an iterable and returns an iterator of tuples, where each tuple contains (index, value):

\`\`\`python
fruits = ['apple', 'banana', 'cherry']
enumerated = list(enumerate(fruits))
print(enumerated)
# [(0, 'apple'), (1, 'banana'), (2, 'cherry')]
\`\`\`

When you use \`for index, fruit in enumerate(fruits)\`, Python automatically unpacks each tuple into the two variables!

<strong>The start parameter - Custom numbering:</strong>

By default, \`enumerate()\` starts counting from 0. But you can specify a different starting number:

\`\`\`python
fruits = ['apple', 'banana', 'cherry']

# Start numbering from 1 (human-friendly)
for num, fruit in enumerate(fruits, start=1):
    print(f"#{num}: {fruit}")

# Output:
# #1: apple
# #2: banana
# #3: cherry
\`\`\`

This is perfect for:
• Creating numbered lists for users
• Processing line numbers in files (lines typically start at 1)
• Displaying rankings or positions
• Any scenario where human-readable numbering matters

<strong>Why enumerate() is better than range(len()):</strong>

<strong>Reason 1: More readable</strong>
\`\`\`python
# Hard to understand at a glance
for i in range(len(items)):
    item = items[i]
    process(item, i)

# Immediately clear what's happening
for i, item in enumerate(items):
    process(item, i)
\`\`\`

<strong>Reason 2: Works with any iterable</strong>
\`\`\`python
# enumerate() works with generators, files, etc.
with open('data.txt') as file:
    for line_num, line in enumerate(file, start=1):
        if 'ERROR' in line:
            print(f"Error on line {line_num}: {line}")

# range(len()) only works with things that have len()!
\`\`\`

<strong>Reason 3: Less error-prone</strong>
\`\`\`python
# Easy to make off-by-one errors
for i in range(len(items)):
    # What if you accidentally type items[i+1]?

# enumerate() gives you the correct pairing automatically
for i, item in enumerate(items):
    # item is guaranteed to be items[i]
\`\`\`

<strong>Practical enumerate() patterns:</strong>

<strong>Process specific positions:</strong>
\`\`\`python
scores = [85, 92, 78, 88, 95, 76, 89]

# Process only even indices
for i, score in enumerate(scores):
    if i % 2 == 0:
        print(f"Even index {i}: {score}")

# Find positions of high scores
for i, score in enumerate(scores):
    if score >= 90:
        print(f"High score at position {i}: {score}")
\`\`\`

<strong>Create dictionaries from lists:</strong>
\`\`\`python
fruits = ['apple', 'banana', 'cherry']

# Create index -> value dictionary
fruit_dict = {i: fruit for i, fruit in enumerate(fruits)}
print(fruit_dict)  # {0: 'apple', 1: 'banana', 2: 'cherry'}
\`\`\`

<strong>Track progress in long operations:</strong>
\`\`\`python
large_dataset = get_large_dataset()  # Thousands of items

for i, item in enumerate(large_dataset, start=1):
    process(item)
    if i % 100 == 0:
        print(f"Processed {i} items...")
\`\`\`

<strong>zip() - Combine multiple iterables:</strong>

\`zip()\` is like a zipper for lists - it takes multiple iterables and combines them element-by-element into tuples:

\`\`\`python
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
cities = ['Boston', 'NYC', 'LA']

# Combine three lists
for name, age, city in zip(names, ages, cities):
    print(f"{name} is {age} years old and lives in {city}")

# Output:
# Alice is 25 years old and lives in Boston
# Bob is 30 years old and lives in NYC
# Charlie is 35 years old and lives in LA
\`\`\`

<strong>How zip() works:</strong>

\`zip()\` creates tuples by taking one element from each iterable:

\`\`\`python
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]

zipped = list(zip(names, ages))
print(zipped)
# [('Alice', 25), ('Bob', 30), ('Charlie', 35)]
\`\`\`

<strong>Handling different lengths - zip() stops at the shortest:</strong>

\`\`\`python
list1 = [1, 2, 3, 4, 5]
list2 = ['a', 'b', 'c']

result = list(zip(list1, list2))
print(result)
# [(1, 'a'), (2, 'b'), (3, 'c')]
# 4 and 5 are ignored because list2 is shorter
\`\`\`

This behavior prevents index errors but can silently skip data! Always ensure your lists are the expected length, or use \`itertools.zip_longest()\` if you need to handle different lengths.

<strong>Creating dictionaries with zip() - A powerful pattern:</strong>

\`zip()\` is perfect for creating dictionaries from two lists:

\`\`\`python
keys = ['name', 'age', 'city']
values = ['Alice', 25, 'Boston']

# Create dictionary in one line!
user = dict(zip(keys, values))
print(user)
# {'name': 'Alice', 'age': 25, 'city': 'Boston'}
\`\`\`

This pattern appears constantly in data processing:

\`\`\`python
# Parse CSV header and data
header = ['name', 'email', 'score']
row = ['Alice', 'alice@email.com', '95']

record = dict(zip(header, row))
# {'name': 'Alice', 'email': 'alice@email.com', 'score': '95'}
\`\`\`

<strong>Unzipping with zip(*) - The reverse operation:</strong>

Use the \`*\` operator with \`zip()\` to "unzip" - separating combined data back into individual lists:

\`\`\`python
# List of coordinate pairs
points = [(1, 2), (3, 4), (5, 6), (7, 8)]

# Unzip into separate lists
x_coords, y_coords = zip(*points)

print(f"X coordinates: {list(x_coords)}")  # [1, 3, 5, 7]
print(f"Y coordinates: {list(y_coords)}")  # [2, 4, 6, 8]
\`\`\`

How it works:
• \`*points\` unpacks the list into separate arguments: \`(1,2), (3,4), (5,6), (7,8)\`
• \`zip((1,2), (3,4), (5,6), (7,8))\` then combines by position
• Result: \`(1,3,5,7)\` and \`(2,4,6,8)\`

<strong>Practical example - Unzip student data:</strong>
\`\`\`python
students = [
    ('Alice', 85, 'A'),
    ('Bob', 92, 'A'),
    ('Charlie', 78, 'B')
]

# Separate into individual lists
names, scores, grades = zip(*students)

print(f"Names: {list(names)}")      # ['Alice', 'Bob', 'Charlie']
print(f"Scores: {list(scores)}")    # [85, 92, 78]
print(f"Grades: {list(grades)}")    # ['A', 'A', 'B']

# Now you can easily calculate statistics
average_score = sum(scores) / len(scores)
print(f"Class average: {average_score:.2f}")  # 85.00
\`\`\`

<strong>Combining enumerate() and zip() - Maximum power:</strong>

You can combine these functions for even more sophisticated iteration:

\`\`\`python
names = ['Alice', 'Bob', 'Charlie']
scores = [85, 92, 78]

# Get index, name, and score all at once!
for i, (name, score) in enumerate(zip(names, scores), start=1):
    print(f"#{i}: {name} scored {score}")

# Output:
# #1: Alice scored 85
# #2: Bob scored 92
# #3: Charlie scored 78
\`\`\`

<strong>Real-world patterns you'll use constantly:</strong>

<strong>Pattern 1: Parallel list processing</strong>
\`\`\`python
products = ['Laptop', 'Mouse', 'Keyboard']
prices = [999.99, 29.99, 79.99]
quantities = [5, 20, 15]

print("Inventory Report:")
print("-" * 50)

total = 0
for product, price, qty in zip(products, prices, quantities):
    value = price * qty
    total += value
    print(f"{product:12} \${price:7.2f} x {qty:2} = \${value:8.2f}")

print("-" * 50)
print(f"{'Total Value:':27} \${total:8.2f}")
\`\`\`

<strong>Pattern 2: Create structured data</strong>
\`\`\`python
usernames = ['alice', 'bob', 'charlie']
emails = ['alice@email.com', 'bob@email.com', 'charlie@email.com']
scores = [85, 92, 78]

# Create list of user dictionaries
users = []
for name, email, score in zip(usernames, emails, scores):
    user = {
        'username': name,
        'email': email,
        'score': score
    }
    users.append(user)

# Or with comprehension:
users = [
    {'username': name, 'email': email, 'score': score}
    for name, email, score in zip(usernames, emails, scores)
]
\`\`\`

<strong>Pattern 3: Find element with specific property</strong>
\`\`\`python
names = ['Alice', 'Bob', 'Charlie', 'Diana']
scores = [85, 92, 78, 95]

# Find person with highest score
highest_score = max(scores)
for name, score in zip(names, scores):
    if score == highest_score:
        print(f"{name} has the highest score: {score}")
        break
\`\`\`

<strong>Pattern 4: Pairwise iteration</strong>
\`\`\`python
numbers = [1, 2, 3, 4, 5]

# Process each pair of consecutive numbers
for current, next_val in zip(numbers, numbers[1:]):
    difference = next_val - current
    print(f"{current} -> {next_val}: difference = {difference}")
\`\`\`

<strong>Best practices for enumerate() and zip():</strong>

✅ Use \`enumerate()\` instead of \`range(len())\` - always more Pythonic
✅ Use \`start\` parameter for human-friendly numbering
✅ Use \`zip()\` for parallel iteration over multiple lists
✅ Create dictionaries with \`dict(zip(keys, values))\`
✅ Unzip with \`zip(*items)\` when you need to separate data
✅ Combine \`enumerate()\` and \`zip()\` for maximum expressiveness
✅ Check list lengths before zipping to avoid silent data loss

<strong>Common mistakes to avoid:</strong>

⚠️ Using \`range(len())\` when \`enumerate()\` is clearer
⚠️ Not realizing \`zip()\` stops at the shortest iterable
⚠️ Forgetting that \`enumerate()\` returns tuples (need to unpack!)
⚠️ Using manual indexing when \`zip()\` would be cleaner
⚠️ Not using \`start\` parameter when displaying to users

<strong>Performance notes:</strong>

• Both \`enumerate()\` and \`zip()\` are lazy iterators - memory efficient!
• They process elements one at a time, not creating intermediate lists
• Perfect for large datasets or streaming data
• Use \`list(enumerate(...))\` or \`list(zip(...))\` only when you need the full result

<strong>Why these functions matter:</strong>

Professional Python code uses \`enumerate()\` and \`zip()\` extensively because they:
• Make code more readable and self-documenting
• Reduce bugs (no manual index management)
• Are more Pythonic (idiomatic Python style)
• Work with any iterable (not just lists)
• Are memory-efficient (lazy evaluation)

Once you internalize these patterns, you'll find them everywhere in professional Python code. They're not just convenient - they're the Pythonic way to iterate!
`,
      codeExamples: [
        {
          title: 'Using enumerate()',
          code: `fruits = ['apple', 'banana', 'cherry', 'date']

# Traditional way (less Pythonic)
for i in range(len(fruits)):
    print(f"Index {i}: {fruits[i]}")

# Pythonic way with enumerate
print("\\nWith enumerate:")
for index, fruit in enumerate(fruits):
    print(f"Index {index}: {fruit}")

# Start numbering at 1
print("\\nStarting at 1:")
for num, fruit in enumerate(fruits, start=1):
    print(f"#{num}: {fruit}")

# Use in list comprehension
indexed = [(i, fruit) for i, fruit in enumerate(fruits)]
print(f"\\nIndexed list: {indexed}")
# [(0, 'apple'), (1, 'banana'), (2, 'cherry'), (3, 'date')]`,
          explanation: 'enumerate() provides index and value together'
        },
        {
          title: 'Using zip()',
          code: `names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
cities = ['Boston', 'NYC', 'LA']

# Combine three lists
for name, age, city in zip(names, ages, cities):
    print(f"{name} is {age} years old and lives in {city}")

# Create list of tuples
combined = list(zip(names, ages, cities))
print(f"\\nCombined: {combined}")
# [('Alice', 25, 'Boston'), ('Bob', 30, 'NYC'), ('Charlie', 35, 'LA')]

# Create dictionary from two lists
user_dict = dict(zip(['name', 'age', 'city'], ['Alice', 25, 'Boston']))
print(f"\\nDictionary: {user_dict}")
# {'name': 'Alice', 'age': 25, 'city': 'Boston'}`,
          explanation: 'zip() combines multiple lists element-by-element'
        },
        {
          title: 'enumerate() with Conditions',
          code: `scores = [85, 92, 78, 88, 95, 76, 89]

# Process only specific positions
print("Scores at even indices:")
for i, score in enumerate(scores):
    if i % 2 == 0:
        print(f"Position {i}: {score}")

# Find positions of high scores
print("\\nHigh scores (>= 90):")
for i, score in enumerate(scores):
    if score >= 90:
        print(f"Position {i}: {score}")

# Update values based on position
modified = [score + 5 if i % 2 == 0 else score
            for i, score in enumerate(scores)]
print(f"\\nModified: {modified}")`,
          explanation: 'Combine enumerate with conditional logic'
        },
        {
          title: 'Parallel List Processing',
          code: `# Process multiple related lists
products = ['Laptop', 'Mouse', 'Keyboard', 'Monitor']
prices = [999.99, 29.99, 79.99, 299.99]
quantities = [5, 20, 15, 8]

print("Inventory Report:")
print("-" * 50)

for product, price, qty in zip(products, prices, quantities):
    total_value = price * qty
    print(f"{product:12} \${price:7.2f} x {qty:2} = \${total_value:8.2f}")

# Calculate total inventory value
total = sum(p * q for p, q in zip(prices, quantities))
print("-" * 50)
print(f"{'Total Value:':27} \${total:8.2f}")

# Find product with highest value
max_index = max(enumerate(zip(prices, quantities)),
                key=lambda x: x[1][0] * x[1][1])[0]
print(f"\\nHighest value item: {products[max_index]}")`,
          explanation: 'Process related data from multiple lists together'
        },
        {
          title: 'Unzipping with zip(*)',
          code: `# List of coordinate pairs
points = [(1, 2), (3, 4), (5, 6), (7, 8)]

# Unzip into separate lists
x_coords, y_coords = zip(*points)

print(f"X coordinates: {list(x_coords)}")  # [1, 3, 5, 7]
print(f"Y coordinates: {list(y_coords)}")  # [2, 4, 6, 8]

# Practical example: student data
students = [
    ('Alice', 85, 'A'),
    ('Bob', 92, 'A'),
    ('Charlie', 78, 'B')
]

names, scores, grades = zip(*students)

print(f"\\nNames: {list(names)}")
print(f"Scores: {list(scores)}")
print(f"Grades: {list(grades)}")

print(f"\\nAverage score: {sum(scores) / len(scores):.2f}")`,
          explanation: 'Unzip separates combined data back into lists'
        },
        {
          title: 'Practical Example: Data Alignment',
          code: `# Align and process data from multiple sources
usernames = ['alice', 'bob', 'charlie', 'diana']
emails = ['alice@email.com', 'bob@email.com', 'charlie@email.com']
scores = [85, 92, 78, 88]

# Note: emails list is shorter (only 3 items)

# Safe iteration (stops at shortest)
print("Safe iteration with zip:")
for i, (user, email, score) in enumerate(zip(usernames, emails, scores), 1):
    print(f"{i}. {user:10} {email:20} Score: {score}")
# Diana is not printed (emails is shorter)

# Create user database
print("\\nCreating user database:")
users = []
for username, email, score in zip(usernames, emails, scores):
    user = {
        'username': username,
        'email': email,
        'score': score
    }
    users.append(user)

for user in users:
    print(user)

# Find user with highest score
best_user_idx = scores.index(max(scores))
print(f"\\nHighest score: {usernames[best_user_idx]} with {scores[best_user_idx]}")`,
          explanation: 'Handle real-world data alignment scenarios'
        }
      ],
      concepts: ['enumerate()', 'zip()', 'parallel iteration', 'unzipping', 'list alignment', 'advanced iteration']
    },
    starterCode: `# TODO: Create two lists: student names and their test scores
# TODO: Use zip() to iterate through both lists together
# TODO: For each student, print their name and score
# TODO: Use enumerate() to number each student (starting at 1)

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Uses both enumerate() and zip() for iteration'
      }
    ],
    hints: [
      'Create names = ["Alice", "Bob", "Charlie"]',
      'Create scores = [85, 92, 78]',
      'Use: for i, (name, score) in enumerate(zip(names, scores), 1):',
      'Print: print(f"#{i}: {name} - {score}")'
    ],
    challenge: {
      prompt: `Combine enumerate and zip:
1. Create names = ["Alice", "Bob", "Charlie"]
2. Create ages = [25, 30, 28]
3. Use enumerate and zip to print numbered list
4. Format: "1. Alice (25 years old)"
5. Start numbering at 1`,
      starterCode: '# Write your solution here\n',
      solution: 'names = ["Alice", "Bob", "Charlie"]\nages = [25, 30, 28]\n\nfor i, (name, age) in enumerate(zip(names, ages), 1):\n    print(f"{i}. {name} ({age} years old)")',
      tests: [],
      explanation: 'enumerate adds index, zip combines lists. Use enumerate(zip(...), 1) to start at 1!',
      hints: [
        'Combine: enumerate(zip(names, ages), 1)',
        'Unpack: for i, (name, age) in ...',
        'Format with f-string'
      ],
      xpReward: 500,
    },
    xpReward: 500,
    activityType: 'game',
    gameType: 'quiz'
  }
];
