// Module 2: Control Flow
// 5 lessons covering if/elif/else, while loops, for loops

import type { Lesson } from '@types';

export const module2Lessons: Lesson[] = [
  {
    id: 'lesson-5-1',
    moduleId: 'module-5',
    courseId: 'beginner',
    title: 'If Statements',
    content: {
      explanation: `Making Decisions in Python 🤔

Programs need to make decisions based on different situations - that's what makes them intelligent and useful! The if statement is Python's way of letting your code choose what to do based on conditions.

<strong>Think of an if statement like a gatekeeper at a club:</strong>
The gatekeeper checks your ID (the condition). If you're old enough (condition is True), you get in (code runs). If not (condition is False), you're turned away (code is skipped).

<strong>Basic if statement structure:</strong>

if condition:
    # This code runs ONLY if condition is True
    print("Condition was true!")

If the condition is False, Python just skips over the indented block and continues with the rest of your program.

<strong>Comparison operators - Tools for making conditions:</strong>

Python provides six comparison operators that create True/False conditions:

• <strong>== (equals):</strong> Checks if two values are the same - age == 18
• <strong>!= (not equals):</strong> Checks if two values are different - name != "Guest"
• <strong>> (greater than):</strong> score > 90
• <strong>< (less than):</strong> temperature < 32
• <strong>>= (greater than or equal):</strong> age >= 21
• <strong><= (less than or equal):</strong> price <= 100

<strong>Real-world examples:</strong>

if age >= 18:
    print("You can vote!")

if temperature > 80:
    print("It's hot! Stay hydrated.")

if password == "secret123":
    print("Access granted")

<strong>Two CRITICAL Python syntax rules for if statements:</strong>

1. <strong>The colon (:)</strong> - You MUST put a colon at the end of the if line. Forgetting it causes a syntax error!

2. <strong>Indentation (4 spaces)</strong> - Python uses indentation to know which code belongs to the if statement. Other languages use {}, but Python uses indentation. This makes Python code clean and readable, but you must be consistent!

Correct:
if age >= 18:
    print("Adult")  # 4 spaces indent
    print("Can vote")  # 4 spaces indent

Incorrect:
if age >= 18:
print("Adult")  # ERROR: No indent!

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Using = instead of ==:</strong> if age = 18 tries to assign 18 to age (wrong!). Use if age == 18 to compare.
⚠️ <strong>Forgetting the colon:</strong> if age >= 18 without : causes an error
⚠️ <strong>Inconsistent indentation:</strong> Mixing tabs and spaces or using different numbers of spaces causes errors
⚠️ <strong>Comparing different types:</strong> Comparing "18" (string) and 18 (number) can give unexpected results

<strong>Why indentation matters:</strong>

Python knows what code belongs to the if statement by looking at indentation:

if age >= 18:
    print("Adult")          # Inside if (runs only if True)
    print("Can drive")      # Inside if (runs only if True)
print("Have a nice day!")   # Outside if (ALWAYS runs)

The last line has no indentation, so it runs whether the if condition is True or False!

<strong>Pro tips:</strong>
✅ Use descriptive variable names in conditions: if is_logged_in: reads better than if x:
✅ Most code editors auto-indent after you type the colon
✅ Keep conditions simple and readable - if the condition is complex, break it into smaller parts
✅ Test both True and False cases to make sure your if statement works correctly

If statements are the foundation of program logic. Almost every useful program makes decisions, and if statements are how you give your code the power to choose!`,
      codeExamples: [
        {
          code: 'age = 18\nif age >= 18:\n    print("You can vote!")\n\ntemperature = 75\nif temperature > 80:\n    print("It\'s hot outside!")',
          explanation: 'Using if statements with comparisons',
        },
      ],
      concepts: ['if statements', 'conditions', 'comparison operators', 'indentation'],
    },
    starterCode: '# Check if a number is positive\nnumber = 10\n\nif number > 0:\n    print("The number is positive")',
    validationTests: [
      {
        description: 'Should check if number is positive',
        code: 'x = 5\nif x > 0:\n    print("positive")',
        expectedOutput: 'positive',
      },
    ],
    hints: [
      'Use comparison operators like >, <, ==, !=',
      'Don\'t forget the colon : after the condition',
      'Indent the code inside the if statement with 4 spaces',
    ],
    challenge: {
      prompt: `Write a program that checks if a person can vote:
1. Create a variable called age with a value
2. Use an if statement to check if age is >= 18
3. If true, print "You can vote!"
4. Test with different ages`,
      starterCode: '# Write your solution here\n',
      solution: 'age = 20\nif age >= 18:\n    print("You can vote!")',
      tests: [],
      explanation: 'The >= operator checks if the left value is greater than or equal to the right value. Don\'t forget the colon : after the condition!',
      hints: [
        'Use the >= operator to check if age is at least 18',
        'Remember the colon : at the end of the if line',
        'Indent the print statement with 4 spaces'
      ],
      xpReward: 500,
    },
    xpReward: 75,
    gameType: 'quiz',
  },

  {
    id: 'lesson-5-2',
    moduleId: 'module-5',
    courseId: 'beginner',
    title: 'Else and Elif',
    content: {
      explanation: `Handling Multiple Conditions 🚦

Real-world decisions often have more than two outcomes. That's where else and elif come in - they let your programs handle multiple scenarios elegantly!

<strong>The else clause - Handling the "otherwise" case:</strong>

What if you want to do something when the condition is false? Add an else block:

if condition:
    print("Condition is true")
else:
    print("Condition is false")

The else block catches everything that didn't match the if condition. It's like saying "if this happens, do this; otherwise, do that."

<strong>Real example:</strong>
if age >= 18:
    print("You can vote!")
else:
    print("Too young to vote yet")

<strong>The elif clause - Checking multiple conditions:</strong>

Often you need to check several conditions in sequence. That's where elif (short for "else if") shines:

age = 16
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")

<strong>How Python processes if/elif/else:</strong>

1. Python starts at the top and checks the first if condition
2. If True, it runs that block and skips ALL the rest (even if other conditions would also be True!)
3. If False, it moves to the elif and checks that condition
4. This continues for each elif until one is True or until there are no more to check
5. If nothing matches, the else block runs (if you included one)

Think of it like a flowchart or a series of doors - Python opens the first door it can and ignores the rest!

<strong>You can have as many elif blocks as needed:</strong>

score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

Python checks them in order until it finds a match. Once it finds one, it skips all the remaining conditions.

<strong>Important: Order matters!</strong>

# WRONG - This doesn't work as expected:
if score >= 60:
    grade = "D"  # This runs for 85, gives wrong grade!
elif score >= 90:
    grade = "A"  # Never checked because 85 >= 60 was true

# RIGHT - Start with most specific condition:
if score >= 90:
    grade = "A"  # Check highest first
elif score >= 60:
    grade = "D"  # Check lower ranges after

Always put your most specific or highest conditions first!

<strong>The else clause is optional:</strong>

You don't need to include else if you don't want a "catch-all" case:

if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
# If age is less than 13, nothing happens

But including else often makes your code clearer and helps handle unexpected cases!

<strong>Real-world example - Discount calculator:</strong>

total = 250

if total >= 200:
    discount = 0.20  # 20% off for big orders
    print("Big spender! 20% discount!")
elif total >= 100:
    discount = 0.10  # 10% off for medium orders
    print("Thanks! 10% discount!")
elif total >= 50:
    discount = 0.05  # 5% off for small orders
    print("5% discount applied")
else:
    discount = 0  # No discount for small orders
    print("No discount, but thanks for shopping!")

final_price = total * (1 - discount)
print(f"Total: \${final_price:.2f}")

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Using multiple if statements instead of elif:</strong>
This checks ALL conditions separately (inefficient and can cause bugs):

if score >= 90:
    grade = "A"
if score >= 80:  # This ALSO checks, even if score was 95
    grade = "B"  # This would overwrite the "A"!

Use elif so Python stops after the first match!

⚠️ <strong>Forgetting the colon:</strong> elif age >= 13 needs a colon at the end!
⚠️ <strong>Wrong indentation:</strong> All your if/elif/else must have the same indentation level
⚠️ <strong>Conditions in wrong order:</strong> Most specific conditions should come first

<strong>Pro tips:</strong>
✅ Start with the most specific or restrictive condition
✅ Use else to handle unexpected cases or provide a default
✅ Keep your conditions simple - if they're complex, consider breaking them into variables
✅ Test all possible paths through your if/elif/else chain

If/elif/else is like giving your program a decision tree. Master this pattern, and you can handle any multi-way decision your program needs to make!`,
      codeExamples: [
        {
          code: 'score = 85\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelif score >= 70:\n    print("C")\nelse:\n    print("Need to study more")',
          explanation: 'Multiple conditions with if/elif/else',
        },
      ],
      concepts: ['else statement', 'elif statement', 'multiple conditions'],
    },
    starterCode: '# Grade calculator\nscore = 75\n\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelse:\n    print("Grade: C or lower")',
    validationTests: [
      {
        description: 'Should handle multiple conditions',
        code: 'x = 85\nif x >= 90:\n    print("A")\nelif x >= 80:\n    print("B")\nelse:\n    print("C")',
        expectedOutput: 'B',
      },
    ],
    hints: [
      'elif comes between if and else',
      'You can have multiple elif statements',
      'else catches everything that didn\'t match',
    ],
    challenge: {
      prompt: `Create a temperature checker:
1. Create a variable called temp (temperature in Fahrenheit)
2. If temp > 85, print "It's hot!"
3. Elif temp > 65, print "It's nice!"
4. Elif temp > 45, print "It's cool!"
5. Else, print "It's cold!"`,
      starterCode: '# Write your solution here\n',
      solution: 'temp = 75\nif temp > 85:\n    print("It\'s hot!")\nelif temp > 65:\n    print("It\'s nice!")\nelif temp > 45:\n    print("It\'s cool!")\nelse:\n    print("It\'s cold!")',
      tests: [],
      explanation: 'Order matters! Python checks conditions from top to bottom and stops at the first True condition. Start with the highest value.',
      hints: [
        'Start with the highest temperature check (> 85)',
        'Use elif for the middle conditions',
        'Use else for the final case'
      ],
      xpReward: 500,
    },
    xpReward: 75,
    gameType: 'quiz',
  },

  {
    id: 'lesson-5-3',
    moduleId: 'module-5',
    courseId: 'beginner',
    title: 'While Loops',
    content: {
      explanation: `Repeating Actions 🔁

While loops let you repeat code automatically - essential for tasks like counting, processing lists, or waiting for user input. Instead of copying and pasting the same code 100 times, you write it once and let the loop do the work!

<strong>What is a while loop?</strong>
A while loop keeps running the same code over and over, as long as a condition stays true. It's like telling Python: "While this is true, keep doing this."

count = 1
while count <= 5:
    print(count)
    count = count + 1

<strong>How it works:</strong>
1. Python checks the condition (count <= 5)
2. If True, run the indented code block
3. Go back to step 1 and check again
4. If False, stop the loop and continue with code after the loop

This loop prints: 1, 2, 3, 4, 5
When count becomes 6, the condition (count <= 5) is False, so the loop stops.

<strong>The anatomy of a while loop:</strong>

while condition:     # 1. Check condition
    # Do something   # 2. Execute block
    # Update variable # 3. Change something so condition eventually becomes False

<strong>Common while loop patterns:</strong>

<strong>Counting up:</strong>
i = 1
while i <= 10:
    print(i)
    i = i + 1  # or i += 1

<strong>Counting down (countdown):</strong>
countdown = 10
while countdown > 0:
    print(countdown)
    countdown -= 1
print("Blast off!")

<strong>Processing until done:</strong>
answer = ""
while answer != "quit":
    answer = input("Enter command (or 'quit'): ")
    print(f"You entered: {answer}")

<strong>Danger: Infinite loops! ⚠️</strong>

If the condition NEVER becomes False, your loop runs forever:

# BAD - Infinite loop!
count = 1
while count <= 5:
    print(count)
    # Forgot to update count! It's always 1, always <= 5

This will print "1" forever until you force-stop the program (usually Ctrl+C). Always make sure something in your loop changes the condition!

<strong>How to avoid infinite loops:</strong>
✅ Always modify the variable used in the condition
✅ Make sure the modification moves toward making the condition False
✅ If using user input, ensure there's a way to exit
✅ Test your loop with small numbers first

<strong>While loops vs. specific counts:</strong>

While loops are best when you don't know how many times you need to loop:
- Waiting for correct user input
- Reading until end of file
- Continuing until a condition is met
- Game loops (run until game over)

If you know exactly how many times to loop, for loops (next lesson!) are usually better.

<strong>Real-world examples:</strong>

<strong>Password validator:</strong>
password = ""
while len(password) < 8:
    password = input("Enter password (min 8 characters): ")
    if len(password) < 8:
        print("Too short! Try again.")
print("Password accepted!")

<strong>Simple game loop:</strong>
playing = True
score = 0
while playing:
    print(f"Score: {score}")
    action = input("Continue playing? (yes/no): ")
    if action == "yes":
        score += 10
    else:
        playing = False
print(f"Game over! Final score: {score}")

<strong>Sum numbers until zero:</strong>
total = 0
number = int(input("Enter number (0 to stop): "))
while number != 0:
    total += number
    number = int(input("Enter number (0 to stop): "))
print(f"Total: {total}")

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Forgetting to update the loop variable:</strong> Results in infinite loop
⚠️ <strong>Wrong indentation:</strong> Code you want to repeat must be indented
⚠️ <strong>Using = instead of ==:</strong> while x = 5 is an error, use while x == 5
⚠️ <strong>Off-by-one errors:</strong> Loop runs one too many or too few times due to <= vs < confusion

<strong>Pro tips:</strong>
✅ Initialize your loop variable before the while statement
✅ Make sure the variable changes inside the loop
✅ Use while for unknown iterations, for for known iterations
✅ Add print statements while debugging to see what's happening
✅ Consider whether you need the check at the start (while) or end (do-while pattern)

While loops give your programs the power of repetition - essential for automation, user interaction, and processing data. Master them, and you can handle tasks that would be impossible to code manually!`,
      codeExamples: [
        {
          code: 'countdown = 3\nwhile countdown > 0:\n    print(countdown)\n    countdown = countdown - 1\nprint("Blast off!")',
          explanation: 'Countdown using while loop',
        },
      ],
      concepts: ['while loops', 'loop conditions', 'infinite loops', 'loop counter'],
    },
    starterCode: '# Print numbers 1 to 5\ncount = 1\n\nwhile count <= 5:\n    print(count)\n    count = count + 1',
    validationTests: [
      {
        description: 'Should use while loop',
        code: 'i = 1\nwhile i <= 3:\n    print(i)\n    i = i + 1',
        expectedOutput: '1\n2\n3',
      },
    ],
    hints: [
      'Check the condition before each loop iteration',
      'Update the counter inside the loop',
      'Make sure the condition will eventually become false',
    ],
    challenge: {
      prompt: `Create a countdown timer:
1. Start with count = 5
2. Use a while loop that runs while count > 0
3. Print the current count
4. Decrease count by 1 each time
5. After the loop, print "Blast off!"`,
      starterCode: '# Write your solution here\n',
      solution: 'count = 5\nwhile count > 0:\n    print(count)\n    count = count - 1\nprint("Blast off!")',
      tests: [],
      explanation: 'While loops repeat as long as the condition is True. Make sure to update the variable (count = count - 1) or the loop will run forever!',
      hints: [
        'Initialize count before the loop',
        'The condition is: count > 0',
        'Don\'t forget to decrease count inside the loop!'
      ],
      xpReward: 500,
    },
    xpReward: 100,
    gameType: 'quiz',
  },

  {
    id: 'lesson-5-4',
    moduleId: 'module-5',
    courseId: 'beginner',
    title: 'For Loops',
    content: {
      explanation: `Looping Through Collections 🔄

For loops are one of the most useful tools in programming - they let you repeat code a specific number of times or process each item in a collection. Unlike while loops that continue until a condition changes, for loops have a built-in endpoint.

<strong>The basic for loop with range():</strong>

The most common pattern uses range() to repeat code a specific number of times:

for i in range(5):
    print(i)

<strong>Output:</strong> 0, 1, 2, 3, 4

<strong>Important:</strong> Python counts from 0! range(5) gives you 5 numbers: 0, 1, 2, 3, 4 (it stops BEFORE 5).

<strong>Why start at 0?</strong>
Computer science tradition! Lists and strings also start at index 0, so range() matches this pattern. You'll get used to it quickly!

<strong>Three ways to use range():</strong>

<strong>1. range(stop)</strong> - Start at 0, go up to (not including) stop:
for i in range(3):
    print(i)  # Prints: 0, 1, 2

<strong>2. range(start, stop)</strong> - Specify where to start:
for i in range(1, 6):
    print(i)  # Prints: 1, 2, 3, 4, 5

<strong>3. range(start, stop, step)</strong> - Control the increment:
for i in range(0, 10, 2):
    print(i)  # Prints: 0, 2, 4, 6, 8 (every 2nd number)

<strong>Understanding the step parameter:</strong>

The step tells Python how much to increase each time:

# Count by 2s:
for i in range(0, 11, 2):
    print(i)  # 0, 2, 4, 6, 8, 10

# Count by 5s:
for i in range(0, 26, 5):
    print(i)  # 0, 5, 10, 15, 20, 25

# Count backwards:
for i in range(10, 0, -1):
    print(i)  # 10, 9, 8, 7, 6, 5, 4, 3, 2, 1

<strong>For loops vs. While loops:</strong>

Use <strong>for</strong> when:
✅ You know how many times to loop
✅ You're iterating through a collection (list, string, etc.)
✅ You want cleaner, more readable code
✅ You want to avoid infinite loop risks

Use <strong>while</strong> when:
✅ You don't know how many times to loop
✅ You're waiting for a condition to change
✅ You're processing user input until they quit

<strong>Real-world examples:</strong>

<strong>Print a multiplication table:</strong>
number = 5
for i in range(1, 11):
    print(f"{number} x {i} = {number * i}")

<strong>Calculate total:</strong>
total = 0
for i in range(1, 101):
    total += i
print(f"Sum of 1-100: {total}")  # 5050

<strong>Repeat a pattern:</strong>
for i in range(3):
    print("*" * (i + 1))
# Prints:
# *
# **
# ***

<strong>Password attempts:</strong>
max_attempts = 3
for attempt in range(1, max_attempts + 1):
    password = input(f"Attempt {attempt}/{max_attempts} - Enter password: ")
    if password == "secret":
        print("Access granted!")
        break
    elif attempt == max_attempts:
        print("Too many failed attempts!")

<strong>Why for loops are better for counting:</strong>

Compare these equivalent loops:

<strong>While loop (more code, more error-prone):</strong>
i = 0
while i < 5:
    print(i)
    i += 1  # Easy to forget!

<strong>For loop (cleaner, safer):</strong>
for i in range(5):
    print(i)

The for loop is shorter, clearer, and impossible to create an infinite loop!

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Forgetting range() stops before the end:</strong> range(5) gives 0-4, not 0-5
⚠️ <strong>Off-by-one errors:</strong> Want 1-10? Use range(1, 11), not range(1, 10)
⚠️ <strong>Trying to use i outside the loop:</strong> The loop variable only exists inside the loop (technically it does exist after, but don't rely on it!)
⚠️ <strong>Modifying the loop variable:</strong> for i in range(5): i = 10 doesn't change the loop!

<strong>Loop variable naming:</strong>
- Common practice: i, j, k for simple counters
- Better practice: Use descriptive names when it helps readability
  - for attempt in range(3) is clearer than for i in range(3) in a password checker
  - for row in range(10) is clearer than for i in range(10) when building a grid

<strong>Pro tips:</strong>
✅ If you need 1-10, use range(1, 11) - add 1 to your end number
✅ For counting backwards, use a negative step: range(10, 0, -1)
✅ You don't always need to use the loop variable - for _ in range(5): is fine if you just want to repeat something
✅ For loops are great with lists (covered in next module!): for item in my_list:

<strong>Advanced preview:</strong>
Soon you'll learn that for loops can iterate directly over lists, strings, and other collections:

for letter in "Python":
    print(letter)  # Prints each letter

for item in [1, 2, 3, 4, 5]:
    print(item)  # Prints each number

This makes for loops incredibly powerful for data processing!

For loops are essential for any repetitive task with a known count. Master range(), and you'll have a powerful tool for automation, calculations, and data processing!`,
      codeExamples: [
        {
          code: 'for i in range(3):\n    print(f"Loop number {i}")\n\nfor num in range(2, 11, 2):\n    print(num)  # Even numbers',
          explanation: 'Different ways to use for loops',
        },
      ],
      concepts: ['for loops', 'range function', 'iteration', 'loop variables'],
    },
    starterCode: '# Print numbers 1 to 5 using for loop\nfor i in range(1, 6):\n    print(i)',
    validationTests: [
      {
        description: 'Should use for loop',
        code: 'for i in range(3):\n    print("hi")',
        expectedOutput: 'hi\nhi\nhi',
      },
    ],
    hints: [
      'range(5) gives you 0, 1, 2, 3, 4',
      'range(1, 6) gives you 1, 2, 3, 4, 5',
      'range(0, 10, 2) gives you 0, 2, 4, 6, 8',
    ],
    challenge: {
      prompt: `Create a multiplication table for 7:
1. Use a for loop with range(1, 11)
2. For each number, print: "7 x [number] = [result]"
3. Calculate the result inside the loop

Example output:
7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70`,
      starterCode: '# Write your solution here\n',
      solution: 'for i in range(1, 11):\n    result = 7 * i\n    print(f"7 x {i} = {result}")',
      tests: [],
      explanation: 'range(1, 11) gives you numbers 1 through 10. You can calculate the result inside the loop using the loop variable.',
      hints: [
        'Use range(1, 11) to get 1-10',
        'Calculate result = 7 * i inside the loop',
        'Use an f-string to format the output nicely'
      ],
      xpReward: 500,
    },
    xpReward: 100,
    gameType: 'quiz',
  },

  {
    id: 'lesson-5-5',
    moduleId: 'module-5',
    courseId: 'beginner',
    title: 'Break and Continue',
    content: {
      explanation: `Controlling Loops 🛑⏭️

Sometimes you need more control over your loops than just running them start to finish. Maybe you found what you're looking for and want to stop early, or you want to skip certain items. That's where break and continue become essential tools!

<strong>The break statement - Exit the loop immediately:</strong>

break stops the loop entirely and jumps to the code after the loop. It's like an emergency exit - when you hit break, the loop is over, no matter what.

for i in range(10):
    if i == 5:
        break  # Stop immediately when i equals 5
    print(i)
# Prints: 0, 1, 2, 3, 4
# Loop stops at 5, never prints 5 or continues to 9

<strong>When to use break:</strong>
✅ Found what you're searching for (exit early, don't waste time)
✅ Error or invalid condition detected (stop processing)
✅ User wants to quit (exit game loop or menu)
✅ Limit reached (stop after 3 failed attempts)

<strong>Real-world break examples:</strong>

<strong>Search for a number:</strong>
numbers = [10, 25, 30, 45, 50, 60]
target = 45

for num in numbers:
    if num == target:
        print(f"Found {target}!")
        break  # Found it! No need to keep searching
else:
    print(f"{target} not found")  # Only runs if break never happened

<strong>Password checker with limited attempts:</strong>
max_attempts = 3
for attempt in range(1, max_attempts + 1):
    password = input("Enter password: ")
    if password == "secret123":
        print("Access granted!")
        break  # Correct password, stop asking
    print(f"Wrong! {max_attempts - attempt} attempts left")
else:
    print("Access denied! Too many failed attempts.")

<strong>The continue statement - Skip to next iteration:</strong>

continue skips the rest of the current iteration and moves immediately to the next one. It's like saying "skip this one, move to the next."

for i in range(5):
    if i == 2:
        continue  # Skip when i equals 2
    print(i)
# Prints: 0, 1, 3, 4 (2 is skipped)

<strong>How continue works:</strong>
1. Loop starts normally
2. Hits continue statement
3. Skips all remaining code in that iteration
4. Jumps back to the top to start the next iteration

<strong>When to use continue:</strong>
✅ Skip invalid or unwanted values
✅ Filter out data you don't need
✅ Avoid complex nested if statements
✅ Process only specific items in a collection

<strong>Real-world continue examples:</strong>

<strong>Skip odd numbers, process only evens:</strong>
for num in range(10):
    if num % 2 != 0:
        continue  # Skip odd numbers
    print(f"{num} is even")
# Prints: 0, 2, 4, 6, 8

<strong>Process only valid scores:</strong>
scores = [85, -5, 92, 150, 78, 88]  # Some invalid scores
for score in scores:
    if score < 0 or score > 100:
        print(f"Skipping invalid score: {score}")
        continue  # Skip invalid scores
    print(f"Valid score: {score}")

<strong>Skip empty lines when reading data:</strong>
lines = ["Hello", "", "World", "", "Python"]
for line in lines:
    if line == "":
        continue  # Skip empty lines
    print(line.upper())

<strong>Break vs. Continue - Understanding the difference:</strong>

<strong>break</strong> = "I'm done with this loop, exit completely"
<strong>continue</strong> = "Skip this one item, but keep looping"

Think of shopping:
- <strong>break</strong>: "Found what I need, leaving the store now"
- <strong>continue</strong>: "Not interested in this item, moving to the next one"

<strong>Using break and continue together:</strong>

You can use both in the same loop for complex logic:

for num in range(1, 100):
    if num > 50:
        break  # Stop completely after 50
    if num % 2 == 0:
        continue  # Skip even numbers
    if num % 3 == 0:
        continue  # Skip multiples of 3
    print(num)  # Print only odd numbers not divisible by 3
# Prints: 1, 5, 7, 11, 13, 17, 19, 23, 25...

<strong>Works in while loops too:</strong>

# Menu system with break
while True:  # Infinite loop!
    choice = input("Enter command (or 'quit'): ")
    if choice == "quit":
        break  # Exit the infinite loop
    print(f"You chose: {choice}")

# Skip bad input with continue
count = 0
while count < 10:
    user_input = input("Enter a positive number: ")
    number = int(user_input)
    if number < 0:
        print("That's negative! Try again.")
        continue  # Skip this iteration, don't increment count
    count += 1
    print(f"Good! {count}/10")

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Using break/continue outside a loop:</strong> They only work inside for or while loops!
⚠️ <strong>Forgetting break in infinite loops:</strong> while True without break runs forever
⚠️ <strong>Using break when you mean continue:</strong> They do very different things!
⚠️ <strong>Overusing break/continue:</strong> Sometimes clearer to use better conditions instead

<strong>When NOT to use break/continue:</strong>

Sometimes simple if statements are clearer:

# Instead of this:
for num in numbers:
    if num % 2 == 0:
        continue
    print(num)

# Consider this (more explicit):
for num in numbers:
    if num % 2 != 0:  # If odd
        print(num)

Both work, choose what's clearest for your situation!

<strong>Pro tips:</strong>
✅ Use break to avoid unnecessary iterations - efficiency!
✅ Use continue to avoid deeply nested if statements
✅ These work in both for and while loops identically
✅ You can use break in nested loops, but it only breaks the innermost loop
✅ The else clause on loops (for/else, while/else) only runs if the loop completes normally (no break)

<strong>Advanced pattern - Search with else:</strong>

for item in collection:
    if item == target:
        print("Found it!")
        break
else:
    # This runs ONLY if break never executed
    print("Not found!")

This elegant pattern lets you handle the "not found" case cleanly!

Break and continue give you fine-grained control over loop execution. They're powerful tools for writing efficient, clear code that handles real-world complexity. Use them when they make your code clearer, but don't overuse them - sometimes simple conditions are better!`,
      codeExamples: [
        {
          code: '# Find first even number\nfor num in range(1, 10):\n    if num % 2 == 0:\n        print(f"Found it: {num}")\n        break\n\n# Skip odd numbers\nfor num in range(10):\n    if num % 2 != 0:\n        continue\n    print(num)  # Only evens',
          explanation: 'Using break and continue',
        },
      ],
      concepts: ['break statement', 'continue statement', 'loop control'],
    },
    starterCode: '# Skip number 3\nfor i in range(1, 6):\n    if i == 3:\n        continue\n    print(i)',
    validationTests: [
      {
        description: 'Should use continue',
        code: 'for i in range(5):\n    if i == 2:\n        continue\n    print(i)',
        expectedOutput: '0\n1\n3\n4',
      },
    ],
    hints: [
      'break exits the loop completely',
      'continue skips to the next iteration',
      'Both work in for and while loops',
    ],
    challenge: {
      prompt: `Write a program that prints numbers 1-10 but:
1. Skip the number 5 (use continue)
2. Stop completely when you reach 8 (use break)

Expected output: 1, 2, 3, 4, 6, 7`,
      starterCode: '# Write your solution here\n',
      solution: 'for i in range(1, 11):\n    if i == 5:\n        continue\n    if i == 8:\n        break\n    print(i)',
      tests: [],
      explanation: 'continue skips the current iteration (so 5 won\'t print), and break exits the loop entirely (so we stop before 8).',
      hints: [
        'Use continue when i equals 5',
        'Use break when i equals 8',
        'Check conditions before printing'
      ],
      xpReward: 500,
    },
    xpReward: 100,
    gameType: 'quiz',
  },
];
