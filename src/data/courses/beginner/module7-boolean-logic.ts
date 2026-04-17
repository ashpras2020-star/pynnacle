// Module 7: Boolean Logic & Comparisons
// 5 lessons covering boolean operations, comparison operators, and logical expressions

import type { Lesson } from '@/types/lesson';

export const module7Lessons: Lesson[] = [
  // Lesson 7-1: Boolean Basics and Comparison Operators
  {
    id: 'lesson-4-1',
    moduleId: 'module-4',
    courseId: 'beginner',
    title: 'Boolean Basics and Comparison Operators',
    content: {
      explanation: `Boolean Basics and Comparison Operators - The Foundation of Logic ✅❌

Booleans are the simplest yet most powerful data type in programming! Every decision your program makes, every condition it checks, every loop it controls - all come down to booleans: True or False. Understanding booleans is like learning the yes/no questions that drive all program logic!

<strong>What Are Boolean Values?</strong>

A boolean (named after mathematician George Boole) can only be one of two values:
• True - Represents yes, correct, success, on, 1
• False - Represents no, incorrect, failure, off, 0

⚠️ <strong>Important:</strong> In Python, True and False are capitalized! true and false won't work.

These simple values control everything: if statements, while loops, game logic, user permissions, data validation - everything that makes decisions uses booleans!

<strong>Comparison Operators - Asking Questions About Data:</strong>

Comparison operators compare two values and return True or False. They're how your program "asks questions" about data!

<strong>Equality Comparisons - Are They The Same?</strong>

== (Equal to) - Checks if two values are exactly the same:
• 5 == 5 returns True (yes, they're equal!)
• 5 == 3 returns False (nope, different)
• "hello" == "hello" returns True (strings match!)
• "Hello" == "hello" returns False (case-sensitive!)

!= (Not equal to) - Checks if two values are different:
• 5 != 3 returns True (yes, they're different!)
• 5 != 5 returns False (nope, they're the same)
• "cat" != "dog" returns True (different strings)

💡 <strong>Critical distinction:</strong> Use == for comparison, = for assignment!
• x = 5 assigns 5 to x (assignment)
• x == 5 checks if x equals 5 (comparison)

Confusing these is one of the most common beginner mistakes!

<strong>Ordering Comparisons - Which Is Bigger?</strong>

> (Greater than) - Is left side bigger than right side?
• 10 > 5 returns True
• 3 > 8 returns False
• 5 > 5 returns False (not bigger, they're equal)

< (Less than) - Is left side smaller than right side?
• 3 < 8 returns True
• 10 < 5 returns False
• 5 < 5 returns False

>= (Greater than or equal to) - Is left side bigger OR equal?
• 10 >= 5 returns True (bigger)
• 5 >= 5 returns True (equal counts!)
• 3 >= 8 returns False

<= (Less than or equal to) - Is left side smaller OR equal?
• 3 <= 8 returns True (smaller)
• 5 <= 5 returns True (equal counts!)
• 10 <= 5 returns False

✅ <strong>Real-world uses:</strong>
• Check voting age: age >= 18
• Validate password length: len(password) >= 8
• Check if temperature is freezing: temp <= 32
• Ensure score is in range: 0 <= score <= 100

<strong>Comparing Different Data Types:</strong>

Numbers - Straightforward comparisons:
• 42 > 30 (integers)
• 3.14 < 3.15 (floats)
• -5 < 0 (negative numbers)

Strings - Alphabetical and case-sensitive:
• "apple" < "banana" returns True (alphabetical order!)
• "A" < "a" returns True (capitals come before lowercase)
• "Python" == "python" returns False (case matters!)
• "10" < "9" returns True (string comparison, not numeric!)

⚠️ <strong>String gotcha:</strong> Comparing string numbers isn't the same as comparing actual numbers!
• "10" < "9" is True (string comparison: "1" < "9")
• 10 < 9 is False (numeric comparison)

<strong>How Comparison Operators Are Used:</strong>

In if statements - Making decisions:
if age >= 18:
    print("You can vote!")

In while loops - Controlling repetition:
while score < 100:
    score += 10  # Keep going until score reaches 100

In variables - Storing results:
is_adult = age >= 18  # Store True or False in a variable
can_drive = age >= 16 and has_license

In expressions - Complex conditions:
if temperature > 90 or temperature < 32:
    print("Extreme temperature!")

<strong>Common Patterns You'll See Everywhere:</strong>

Age verification:
if age >= 21:
    print("Can purchase alcohol")

Range checking:
if 0 <= score <= 100:
    print("Valid score")

String validation:
if len(password) >= 8:
    print("Password is long enough")

Equality checking:
if user_input == "yes":
    proceed = True

<strong>Understanding Return Values:</strong>

Comparison operators ALWAYS return either True or False - nothing else!

result = 5 > 3  # result is True (a boolean)
print(type(result))  # <class 'bool'>

You can use this directly:
print(5 > 3)  # Prints: True
print(10 == 5)  # Prints: False

<strong>Case Sensitivity in String Comparisons:</strong>

Strings are compared character by character using ASCII/Unicode values:
• "A" < "B" (True - alphabetical)
• "a" < "b" (True - alphabetical)
• "A" < "a" (True - capital letters come first!)
• "hello" == "Hello" (False - different cases)

💡 <strong>For case-insensitive comparisons:</strong>
name.lower() == "alice"  # Convert to lowercase first!

⚠️ <strong>Common Mistakes to Avoid:</strong>

• Using = instead of ==: if x = 5 gives syntax error! Use ==
• Forgetting parentheses in complex conditions: and/or precedence
• Comparing different types without converting: "5" == 5 is False
• Case sensitivity: "Hello" != "hello"
• Chaining incorrectly: if x == 3 or 4 doesn't work! Use if x == 3 or x == 4

<strong>Best Practices:</strong>

✅ Use descriptive variable names for boolean results: is_valid, has_permission, can_access
✅ Put simpler comparisons first: if x > 0 is clearer than if 0 < x
✅ Use parentheses for clarity in complex conditions: (a > 5) and (b < 10)
✅ Compare types carefully: convert when needed
✅ Remember == checks equality, = assigns values!

💡 <strong>Pro tip:</strong> Comparison operators can be chained in Python! Instead of:
if x > 0 and x < 10:

You can write:
if 0 < x < 10:

This is more readable and Pythonic!

Boolean values and comparison operators are the building blocks of program logic. Every if statement, every while loop, every decision your program makes starts here. Master comparisons, and you're ready to make your programs smart and responsive!
`,
      codeExamples: [
        {
          title: 'Basic Boolean Values',
          code: `# Boolean variables
is_student = True
is_teacher = False

print(is_student)  # True
print(is_teacher)  # False

# Type checking
print(type(is_student))  # <class 'bool'>`,
          explanation: 'Boolean variables can only hold True or False (note the capital letters)'
        },
        {
          title: 'Equality Comparisons',
          code: `age = 18
voting_age = 18

# Check if equal
can_vote = age == voting_age
print(can_vote)  # True

# Check if not equal
age = 16
cannot_vote = age != voting_age
print(cannot_vote)  # True`,
          explanation: 'Use == to check equality and != to check inequality'
        },
        {
          title: 'Ordering Comparisons',
          code: `score = 85

print(score > 90)   # False
print(score < 100)  # True
print(score >= 85)  # True
print(score <= 80)  # False`,
          explanation: 'Ordering operators compare numerical values'
        },
        {
          title: 'String Comparisons',
          code: `name1 = "Alice"
name2 = "Bob"

print(name1 == name2)  # False
print(name1 != name2)  # True

# Alphabetical comparison
print(name1 < name2)   # True (A comes before B)

# Case sensitivity
print("hello" == "Hello")  # False`,
          explanation: 'Strings are compared alphabetically and are case-sensitive'
        }
      ],
      concepts: ['booleans', 'True', 'False', 'comparison operators', '==', '!=', '>', '<', '>=', '<=']
    },
    starterCode: `# TODO: Create two variables with your age and legal driving age
# TODO: Use comparison operators to check if you can drive
# TODO: Print the result

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Uses comparison operators correctly'
      }
    ],
    hints: [
      'Define age = your_age and driving_age = 16',
      'Use >= to check if age is greater than or equal to driving_age',
      'Store the result in a variable like can_drive'
    ],
    challenge: {
      prompt: `Compare two numbers:
1. Create two variables: score = 85 and passing_score = 70
2. Check if score is greater than or equal to passing_score
3. Store the result in a variable called passed
4. Print the value of passed
5. Print whether score equals 100 (perfect score check)`,
      starterCode: '# Write your solution here\n',
      solution: 'score = 85\npassing_score = 70\npassed = score >= passing_score\nprint(passed)\nprint(score == 100)',
      tests: [],
      explanation: 'Comparison operators like >=, ==, and != return True or False. You can store these boolean results in variables!',
      hints: [
        'Use >= to compare: score >= passing_score',
        'Store the result: passed = score >= passing_score',
        'Use == to check equality: score == 100'
      ],
      xpReward: 500,
    },
    xpReward: 100,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 7-2: Logical Operators (and, or, not)
  {
    id: 'lesson-4-2',
    moduleId: 'module-4',
    courseId: 'beginner',
    title: 'Logical Operators (and, or, not)',
    content: {
      explanation: `Logical Operators - Combining Conditions Like a Pro 🧠⚡

Single comparisons are useful, but real programs need complex logic! Logical operators let you combine multiple conditions, making your programs smart enough to handle real-world scenarios. Whether checking multiple requirements, validating forms, or implementing game logic, logical operators are essential!

<strong>The Three Logical Operators:</strong>

Python gives you three powerful tools to combine boolean values: and, or, and not. These simple words unlock sophisticated decision-making in your code!

<strong>The AND Operator - ALL Conditions Must Be True:</strong>

and requires EVERY condition to be True for the result to be True. Think of it as "must satisfy ALL requirements!"

Truth table for and:
• True and True → True (both True? Yes! → True)
• True and False → False (both True? No! → False)
• False and True → False (both True? No! → False)
• False and False → False (both True? No! → False)

Only when BOTH are True do you get True!

Real-world examples:
• Can rent a car: age >= 21 and has_license
• Valid password: len(password) >= 8 and has_number
• Can enter ride: height >= 48 and has_ticket
• Grant access: is_logged_in and has_permission

💡 <strong>Think of AND as a stricter, more demanding check:</strong> Everything must be perfect!

Example in action:
age = 25
has_license = True
can_rent_car = age >= 21 and has_license  # True (both conditions met!)

age = 18
can_rent_car = age >= 21 and has_license  # False (age fails!)

<strong>The OR Operator - AT LEAST ONE Condition Must Be True:</strong>

or requires ONLY ONE (or more) condition to be True. Think of it as "satisfy ANY requirement!"

Truth table for or:
• True or True → True (at least one True? Yes! → True)
• True or False → True (at least one True? Yes! → True)
• False or True → True (at least one True? Yes! → True)
• False or False → False (at least one True? No! → False)

Only when BOTH are False do you get False!

Real-world examples:
• Can skip school: is_weekend or is_holiday
• Apply discount: is_student or is_senior
• Send alert: temperature > 90 or temperature < 32
• Grant access: is_admin or is_owner

💡 <strong>Think of OR as flexible:</strong> Any one qualification works!

Example in action:
is_weekend = False
is_holiday = True
can_sleep_in = is_weekend or is_holiday  # True (holiday counts!)

is_weekend = False
is_holiday = False
can_sleep_in = is_weekend or is_holiday  # False (neither applies!)

<strong>The NOT Operator - Flip The Boolean Value:</strong>

not reverses True to False and False to True. It's like asking "is this NOT true?"

Truth table for not:
• not True → False (reverse True)
• not False → True (reverse False)

Real-world examples:
• if not is_raining: go_outside()
• if not is_logged_in: show_login_page()
• while not game_over: play_turn()
• if not in_stock: order_more()

💡 <strong>NOT is useful for:</strong>
• Inverting conditions: not is_valid
• Checking absence: not in_list
• Negating flags: not is_complete
• Readability: not is_closed is clearer than is_closed == False

Example in action:
is_raining = False
should_go_outside = not is_raining  # True (not raining = good time!)

<strong>Combining Multiple Logical Operators:</strong>

You can chain logical operators to create sophisticated conditions!

Example: Student discount eligibility
age = 20
has_student_id = True
gpa = 3.5

eligible = (age < 25 and has_student_id) and gpa >= 3.0
# Must be under 25 AND have ID AND have good GPA

Example: Emergency alert system
temperature = 95
air_quality = "poor"

send_alert = temperature > 90 or air_quality == "poor" or air_quality == "hazardous"
# Alert if ANY condition is met

Example: Access control
is_admin = False
is_owner = True
is_banned = False

can_access = (is_admin or is_owner) and not is_banned
# Must be admin OR owner, AND not banned

<strong>Order of Operations - Precedence Matters!</strong>

When mixing logical operators, Python evaluates in this order:
1. not (first - highest priority)
2. and (second - middle priority)
3. or (last - lowest priority)

Without parentheses:
not True or False and True
# Evaluates as: (not True) or (False and True)
# Result: False or False = False

With parentheses for clarity:
(not True) or (False and True)  # More explicit!

💡 <strong>Best practice:</strong> Use parentheses even when not required! They make your intent crystal clear and prevent bugs.

Good: (age >= 18) and (has_permission)
Better than: age >= 18 and has_permission

<strong>Short-Circuit Evaluation - Python's Efficiency Trick:</strong>

Python stops evaluating as soon as it knows the answer! This is called "short-circuit evaluation."

With AND:
False and anything  # Python stops at False, doesn't check "anything"!
x != 0 and 10/x > 1  # Safe! Won't divide by zero if x is 0

With OR:
True or anything  # Python stops at True, doesn't check "anything"!
is_admin or expensive_check()  # Skips expensive_check() if is_admin is True

✅ <strong>Use cases:</strong>
• Avoiding errors: x != 0 and 10/x > 1 (prevents division by zero!)
• Performance: cache_available or expensive_calculation()
• Default values: user_name or "Guest" (if user_name is empty, use "Guest")

<strong>Complex Real-World Conditions:</strong>

Form validation:
has_username = len(username) > 0
has_password = len(password) >= 8
has_email = "@" in email and "." in email

form_valid = has_username and has_password and has_email

Game mechanics:
can_attack = not is_stunned and has_ammo and target_in_range
can_collect = item_nearby and inventory_not_full and not in_combat

Permission system:
is_public = resource.public
is_author = user.id == resource.author_id
is_collaborator = user.id in resource.collaborators

can_view = is_public or is_author or is_collaborator
can_edit = is_author or is_collaborator
can_delete = is_author

⚠️ <strong>Common Mistakes:</strong>

• Wrong: if x == 3 or 4: (always True! 4 is truthy)
  Right: if x == 3 or x == 4:

• Wrong: if not x > 5: (confusing!)
  Better: if x <= 5: (clearer!)

• Wrong: missing parentheses in complex conditions
  Right: use () to make intent clear!

• Wrong: if is_valid == True: (redundant!)
  Right: if is_valid: (cleaner!)

<strong>Best Practices:</strong>

✅ Use descriptive boolean variables:
  instead of: if age >= 21 and license and not drunk:
  better: has_valid_license = age >= 21 and has_license
         is_sober = not drunk
         can_drive = has_valid_license and is_sober

✅ Break complex conditions into parts:
  eligible = (age >= 18) and (has_id) and (not is_banned)

✅ Use parentheses for readability:
  (condition1 and condition2) or (condition3 and condition4)

✅ Put simpler checks first (for short-circuit efficiency):
  if cached and expensive_check():  # Check cache first!

💡 <strong>Pro tip:</strong> When debugging, print intermediate boolean values!
print(f"Age check: {age >= 18}")
print(f"License check: {has_license}")
print(f"Final: {age >= 18 and has_license}")

Logical operators are the glue that connects simple comparisons into intelligent decision-making. Master and, or, and not, and you can express any logical condition your program needs!
`,
      codeExamples: [
        {
          title: 'Using and',
          code: `age = 25
has_license = True

# Both conditions must be true
can_rent_car = age >= 21 and has_license
print(can_rent_car)  # True

# If one is false
age = 18
can_rent_car = age >= 21 and has_license
print(can_rent_car)  # False`,
          explanation: 'and requires BOTH conditions to be True'
        },
        {
          title: 'Using or',
          code: `is_weekend = True
is_holiday = False

# At least one must be true
can_sleep_in = is_weekend or is_holiday
print(can_sleep_in)  # True

# Both false
is_weekend = False
can_sleep_in = is_weekend or is_holiday
print(can_sleep_in)  # False`,
          explanation: 'or requires AT LEAST ONE condition to be True'
        },
        {
          title: 'Using not',
          code: `is_raining = False

# Reverse the value
is_sunny = not is_raining
print(is_sunny)  # True

# Use in conditions
if not is_raining:
    print("Let's go outside!")`,
          explanation: 'not flips True to False and False to True'
        },
        {
          title: 'Combining Multiple Operators',
          code: `age = 15
has_permission = True
has_ticket = True

# Complex condition
can_enter = (age >= 13 and has_permission) and has_ticket
print(can_enter)  # True

# Another example
is_student = True
is_senior = False
has_coupon = True

gets_discount = (is_student or is_senior) and has_coupon
print(gets_discount)  # True`,
          explanation: 'Combine operators with parentheses for complex logic'
        }
      ],
      concepts: ['logical operators', 'and', 'or', 'not', 'boolean logic', 'compound conditions']
    },
    starterCode: `# TODO: Create variables for temperature and weather conditions
# TODO: Use logical operators to determine if it's good weather for a picnic
# TODO: Good weather: temperature between 70-85 AND not raining

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Uses and, or, or not operators correctly'
      }
    ],
    hints: [
      'Define temperature, is_raining variables',
      'Check if temperature >= 70 and temperature <= 85',
      'Use and with not is_raining to combine conditions'
    ],
    challenge: {
      prompt: `Check movie theater admission:
1. Create variables: age = 25, is_student = True, has_id = True
2. Check if can get discount: (age < 18 or age > 65) or is_student
3. Check if can enter: age >= 13 and has_id
4. Print both results`,
      starterCode: '# Write your solution here\n',
      solution: 'age = 25\nis_student = True\nhas_id = True\ngets_discount = (age < 18 or age > 65) or is_student\ncan_enter = age >= 13 and has_id\nprint(f"Gets discount: {gets_discount}")\nprint(f"Can enter: {can_enter}")',
      tests: [],
      explanation: 'Use "or" when any condition can be true. Use "and" when all conditions must be true. Combine them for complex logic.',
      hints: [
        'Discount: (age < 18 or age > 65) or is_student',
        'Entry: age >= 13 and has_id',
        'Both conditions can use logical operators'
      ],
      xpReward: 500,
    },
    xpReward: 100,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 7-3: Truthiness and Falsiness
  {
    id: 'lesson-4-3',
    moduleId: 'module-4',
    courseId: 'beginner',
    title: 'Truthiness and Falsiness',
    content: {
      explanation: `Truthiness and Falsiness - Python's Flexible Truth 🎭

Here's a mind-blowing Python feature: EVERY value in Python has an inherent "truth value!" Not just True and False - numbers, strings, lists, everything can be evaluated as True or False in conditions. This concept, called "truthiness" and "falsiness," makes Python code incredibly concise and Pythonic!

<strong>The Big Idea - Everything Has a Boolean Context:</strong>

In Python, when you use any value in a condition (like an if statement), Python automatically asks: "Is this truthy or falsy?" You don't need to explicitly compare to True or False!

Instead of this:
if len(my_list) > 0:  # Checking if list has items
    print("List has items")

You can write this:
if my_list:  # Simpler! Same meaning!
    print("List has items")

<strong>Falsy Values - The "False-Like" Club:</strong>

Only a small, specific set of values are considered falsy (evaluate to False). Here's the complete list:

1. False - The boolean value itself
2. None - Python's "nothing" value
3. 0 - Zero in any numeric type (0, 0.0, 0j)
4. "" - Empty string (also '' or """""")
5. [] - Empty list
6. () - Empty tuple
7. {} - Empty dictionary
8. set() - Empty set

That's it! Everything else is truthy!

💡 <strong>Key insight:</strong> These are the "absence of value" items - empty collections, zero, nothing, false.

<strong>Truthy Values - Everything Else!</strong>

If it's not in the falsy list above, it's truthy! Here are common truthy values:

Numbers (except zero):
• 1, -1, 42, 3.14, -0.5 (any non-zero number)
• 0.0001 (even tiny numbers!)
• -999 (negative numbers too!)

Strings (except empty):
• "hello", "False", "0", " " (space is not empty!)
• "False" is truthy! (it's a string, not the boolean False)
• "0" is truthy! (string "0" is not the number 0)

Collections (except empty):
• [1, 2, 3], [0], [False] (any list with items)
• {"key": "value"} (any dictionary with entries)
• (1,) (any tuple with items)

⚠️ <strong>Surprising truthy values:</strong>
• " " (single space - not empty!)
• [0] (list with zero - not empty list!)
• [False] (list with False - still a list with an item!)
• "False" (the string "False" is truthy!)

<strong>The bool() Function - Explicitly Check Truthiness:</strong>

bool() converts any value to its boolean equivalent:

Falsy examples:
• bool(False) → False
• bool(None) → False
• bool(0) → False
• bool("") → False
• bool([]) → False
• bool({}) → False

Truthy examples:
• bool(True) → True
• bool(1) → True
• bool(-42) → True
• bool("hello") → True
• bool([1, 2]) → True
• bool(" ") → True (space!)

💡 <strong>Use bool() for debugging:</strong> When unsure if something is truthy, test it!
print(bool(" "))  # True - space is not empty!

<strong>Common Patterns - Pythonic Truthiness Usage:</strong>

<strong>Checking if a list/collection has items:</strong>
Less Pythonic:
if len(my_list) > 0:
    process(my_list)

More Pythonic:
if my_list:  # Cleaner! Empty list is falsy
    process(my_list)

<strong>Checking if a string has content:</strong>
Less Pythonic:
if len(username) > 0:
    greet(username)

More Pythonic:
if username:  # Empty string is falsy
    greet(username)

<strong>Providing default values:</strong>
display_name = user_name or "Guest"
# If user_name is empty (""), use "Guest" instead!

age = user_age or 0
# If user_age is None or 0, default to 0

<strong>Validating form inputs:</strong>
if not username:  # Check if username is empty
    print("Username required!")

if email and password:  # Check if both have values
    login(email, password)

<strong>Loop until condition:</strong>
while not user_input:  # Keep asking until we get input
    user_input = input("Enter something: ")

<strong>Real-World Applications:</strong>

Form validation:
username = input("Username: ")
if not username:  # Empty username (falsy)
    print("Username cannot be empty!")

Processing optional data:
results = get_search_results()
if results:  # If we got results (non-empty list)
    display(results)
else:  # Empty list (falsy)
    print("No results found")

API responses:
user_data = fetch_user(user_id)
if user_data:  # If we got data (not None)
    render_profile(user_data)
else:  # Got None (falsy)
    print("User not found")

Configuration defaults:
config = load_config() or default_config
# If load_config() returns None or {}, use default_config

<strong>The Truthy/Falsy Decision Tree:</strong>

When evaluating a value:
1. Is it explicitly False? → Falsy
2. Is it None? → Falsy
3. Is it zero (0, 0.0, 0j)? → Falsy
4. Is it an empty collection ("", [], {}, (), set())? → Falsy
5. Everything else? → Truthy!

<strong>Combining Truthiness with Logical Operators:</strong>

and returns first falsy value or last value:
• "hello" and "world" → "world" (both truthy, return last)
• "" and "world" → "" (first is falsy, return it)
• 0 and 42 → 0 (first is falsy, return it)

or returns first truthy value or last value:
• "hello" or "world" → "hello" (first is truthy, return it)
• "" or "world" → "world" (first is falsy, try next)
• 0 or 42 → 42 (first is falsy, try next)
• 0 or None → None (both falsy, return last)

💡 <strong>Practical use:</strong> Default values with or:
name = user_input or "Anonymous"  # If input empty, use "Anonymous"

⚠️ <strong>Common Mistakes and Gotchas:</strong>

• Checking "if x == True:" is redundant and wrong!
  Wrong: if is_valid == True:
  Right: if is_valid:

• String "False" is truthy!
  value = "False"
  if value:  # This is True! "False" is a non-empty string!
      print("This runs!")

• Space is not empty:
  text = " "  # Single space
  if text:  # True! Not an empty string!
      print("Has content")

• Zero in a list is not empty list:
  numbers = [0]
  if numbers:  # True! List has an item (even though it's 0)
      print("List has items")

• Don't confuse with "==" checks:
  x = []
  if x:  # False (empty list)
  if x == False:  # Also False, but different check!

<strong>Best Practices:</strong>

✅ Use truthiness for checking collections:
  if my_list: instead of if len(my_list) > 0:

✅ Use truthiness for optional values:
  if user_data: instead of if user_data is not None:

✅ Use "is" for None checks (more specific):
  if value is None: instead of if not value:

✅ Use explicit comparisons when clarity matters:
  if count == 0: is clearer than if not count: (0 vs None vs []?)

✅ Be explicit with numbers if 0 is valid:
  if score is not None: instead of if score: (0 is valid score!)

⚠️ <strong>When NOT to rely on truthiness:</strong>
• When 0 is a valid value (use "is not None" instead)
• When empty string is different from None (be explicit)
• When clarity is more important than brevity
• When working with booleans that might be None

💡 <strong>Pro tip:</strong> Truthiness makes Python code concise and elegant, but don't sacrifice clarity! When in doubt, be explicit.

# Good (clear intent):
if user_input is None:
    handle_missing_input()

# Also good (Pythonic):
if not user_input:
    handle_empty_input()

Truthiness and falsiness are what make Python feel natural and intuitive. Once you internalize which values are falsy (empty, zero, None, False), you can write cleaner, more Pythonic code that reads like English!
`,
      codeExamples: [
        {
          title: 'Falsy Values',
          code: `# All of these are falsy
print(bool(False))  # False
print(bool(None))   # False
print(bool(0))      # False
print(bool(""))     # False
print(bool([]))     # False
print(bool({}))     # False

# Using in conditions
empty_list = []
if not empty_list:
    print("List is empty")  # This prints`,
          explanation: 'These values all evaluate to False in boolean contexts'
        },
        {
          title: 'Truthy Values',
          code: `# All of these are truthy
print(bool(True))       # True
print(bool(1))          # True
print(bool(-5))         # True
print(bool("hello"))    # True
print(bool([1, 2, 3]))  # True
print(bool({"a": 1}))   # True

# Using in conditions
name = "Alice"
if name:
    print(f"Hello, {name}!")  # This prints`,
          explanation: 'Non-zero numbers and non-empty collections are truthy'
        },
        {
          title: 'Practical Example: Input Validation',
          code: `username = input("Enter username: ")

# Check if username was entered
if username:
    print(f"Welcome, {username}!")
else:
    print("Username cannot be empty")

# Instead of writing:
# if len(username) > 0:`,
          explanation: 'Truthiness makes code more concise and Pythonic'
        },
        {
          title: 'Checking Lists and Collections',
          code: `scores = [95, 87, 92]

# Check if list has items
if scores:
    average = sum(scores) / len(scores)
    print(f"Average: {average}")
else:
    print("No scores to average")

# Works with dictionaries too
user_data = {}
if not user_data:
    print("No user data available")`,
          explanation: 'Empty collections are falsy, non-empty collections are truthy'
        }
      ],
      concepts: ['truthiness', 'falsiness', 'bool()', 'None', 'implicit boolean conversion', 'empty collections']
    },
    starterCode: `# TODO: Create a list of items
# TODO: Use truthiness to check if the list has items
# TODO: If it has items, print the first item
# TODO: If empty, print "List is empty"

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Uses truthiness to check for empty/non-empty values'
      }
    ],
    hints: [
      'Create items = [some values] or items = []',
      'Use if items: to check truthiness',
      'Access first item with items[0]'
    ],
    challenge: {
      prompt: `Validate user input using truthiness:
1. Create a variable name = "" (empty string)
2. Use truthiness to check if name has a value
3. If truthy, print "Hello, [name]!"
4. If falsy, print "Name is required"
5. Test with both empty and filled names`,
      starterCode: '# Write your solution here\n',
      solution: 'name = ""\nif name:\n    print(f"Hello, {name}!")\nelse:\n    print("Name is required")',
      tests: [],
      explanation: 'Empty strings are falsy! Use truthiness instead of checking len(name) > 0. It\'s more Pythonic.',
      hints: [
        'Just use: if name:',
        'Empty strings evaluate to False',
        'Non-empty strings evaluate to True'
      ],
      xpReward: 500,
    },
    xpReward: 125,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 7-4: Boolean Expressions in Depth
  {
    id: 'lesson-4-4',
    moduleId: 'module-4',
    courseId: 'beginner',
    title: 'Boolean Expressions in Depth',
    content: {
      explanation: `Boolean Expressions in Depth - Advanced Comparison Techniques 🎯

Beyond basic comparisons, Python offers elegant and powerful ways to write complex boolean expressions. These advanced techniques make your code more readable, efficient, and Pythonic. Let's explore the tools that separate beginner code from professional-quality logic!

<strong>Chained Comparisons - Python's Beautiful Range Checks:</strong>

One of Python's most elegant features! You can chain comparison operators just like mathematical notation:

Instead of this (verbose):
if x > 0 and x < 10:
    print("x is between 0 and 10")

Write this (Pythonic!):
if 0 < x < 10:
    print("x is between 0 and 10")

<strong>Common chaining patterns:</strong>
• 18 <= age <= 65 (working age range)
• 0 <= score <= 100 (valid score)
• min_value < x < max_value (bounds checking)
• a == b == c (all three equal!)
• 1 < x <= 10 (between 1 and 10 inclusive)

✅ <strong>Why this is amazing:</strong>
• More readable: Reads like math notation!
• Less error-prone: Can't accidentally type wrong variable
• More efficient: Python optimizes it internally
• Cleaner: No repeated variables or redundant 'and'

<strong>Membership Testing - Checking if Values Exist:</strong>

The in and not in operators test membership in collections, strings, and sequences!

<strong>in operator - Is this value present?</strong>

Lists and collections:
• "Alice" in names_list (is Alice in the list?)
• 5 in [1, 2, 3, 4, 5] → True
• "cat" in ["dog", "bird"] → False

Strings (substring check!):
• "world" in "Hello, world!" → True
• "Python" in "I love Python" → True
• "x" in "hello" → False

Dictionaries (checks keys!):
• "name" in user_dict (is 'name' a key?)
• "email" in {"name": "Alice", "age": 25} → False

Tuples and sets:
• 3 in (1, 2, 3, 4) → True
• "a" in {"a", "b", "c"} → True

<strong>not in operator - Is this value absent?</strong>

• "Bob" not in names_list (Bob is NOT in list)
• "Z" not in "alphabet" → True
• 10 not in [1, 2, 3] → True

✅ <strong>Real-world uses:</strong>
• Input validation: if input_char not in "0123456789":
• Permissions: if user not in banned_users:
• String validation: if "@" in email and "." in email:
• Filtering: if item not in processed_items:

<strong>Identity Testing - Same Object or Different Objects?</strong>

The is and is not operators check if two variables refer to the EXACT SAME object in memory (not just equal values!).

<strong>is operator - Same object?</strong>

Most important use - checking for None:
• if result is None: (ALWAYS use 'is' for None!)
• if data is not None: (more explicit than 'if data:')

Comparing object identity:
• list1 is list2 (are they the same list object?)
• x is y (same object or different?)

<strong>Key difference: is vs ==</strong>

== checks if values are equal:
• [1, 2] == [1, 2] → True (same contents)

is checks if same object:
• [1, 2] is [1, 2] → False (different objects!)

list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1

• list1 == list2 → True (same values)
• list1 is list2 → False (different objects)
• list1 is list3 → True (same object!)

⚠️ <strong>Critical rule:</strong> Always use is/is not for None checks!
Right: if value is None:
Wrong: if value == None: (works but not Pythonic)

<strong>Short-Circuit Evaluation - Python's Smart Optimization:</strong>

Python stops evaluating as soon as it knows the final result! This prevents errors and improves performance.

<strong>and short-circuits:</strong>

False and anything → stops at False, doesn't evaluate 'anything'!

Safe division check:
if x != 0 and 10/x > 1:  # If x is 0, never tries division!
    print("x is less than 10")

Efficient checking:
if cache_available and expensive_database_query():
    # Only runs expensive query if cache not available!

<strong>or short-circuits:</strong>

True or anything → stops at True, doesn't evaluate 'anything'!

Default values:
name = user_name or "Guest"  # If user_name is truthy, stop there!

Efficient fallbacks:
if is_admin or check_special_permission():
    # Only checks special permission if not admin!

✅ <strong>Practical uses:</strong>
• Preventing errors: value != "" and int(value) > 0
• Performance: fast_check() or slow_check()
• Safe navigation: obj and obj.property and obj.property.method()
• Default values: config_value or default_value

<strong>Complex Boolean Expressions - Putting It All Together:</strong>

Combining techniques for sophisticated logic:

User permissions:
can_edit = (
    (is_author or is_admin) and
    not is_banned and
    status in ["active", "pending"]
)

Form validation with chaining and membership:
valid_age = 13 <= age <= 120
valid_email = "@" in email and "." in email
valid_username = len(username) >= 3 and username not in taken_names
form_valid = valid_age and valid_email and valid_username

Range and membership combined:
if 0 <= score <= 100 and grade in ["A", "B", "C"]:
    record_grade(score, grade)

<strong>De Morgan's Laws - Logical Equivalences:</strong>

These mathematical laws help simplify complex negations:

Law 1: not (A and B) equals not A or not B
• not (is_sunny and is_warm) ≡ not is_sunny or not is_warm

Law 2: not (A or B) equals not A and not B
• not (is_weekend or is_holiday) ≡ not is_weekend and not is_holiday

💡 <strong>Use to simplify:</strong> Sometimes one form is clearer than the other!

Instead of: if not (age < 18 or age > 65):
Simplify to: if age >= 18 and age <= 65:
Or even: if 18 <= age <= 65: (chained!)

⚠️ <strong>Common Mistakes:</strong>

• Using == for None: Use 'is None' instead!
• Forgetting membership check: "x" or "y" in string checks only "y"!
• Wrong chained comparison order: 10 < x < 5 is always False!
• Confusing is with ==: Use 'is' only for identity (None, True, False)
• Not using parentheses: (a or b) and c vs a or (b and c) are different!

<strong>Best Practices:</strong>

✅ Chained comparisons for ranges: 0 < x < 10
✅ in for membership: if item in collection:
✅ is for None checks: if value is None:
✅ Short-circuit for safety: x != 0 and 10/x > 1
✅ Parentheses for clarity: (a or b) and (c or d)
✅ Break complex logic into named variables for readability

💡 <strong>Pro tip:</strong> Name complex boolean expressions!

Instead of:
if (age >= 18 and has_license and not is_suspended) or is_instructor:

Better:
can_drive = age >= 18 and has_license and not is_suspended
if can_drive or is_instructor:

This makes code self-documenting and easier to debug!

These advanced boolean techniques make Python code elegant and expressive. Chain comparisons, check membership, use identity testing, and leverage short-circuits to write professional, Pythonic code that's both efficient and readable!
`,
      codeExamples: [
        {
          title: 'Chained Comparisons',
          code: `age = 25

# Traditional way
if age >= 18 and age <= 65:
    print("Working age")

# Pythonic way (chained)
if 18 <= age <= 65:
    print("Working age")

# More examples
score = 85
if 80 <= score < 90:
    print("Grade: B")

temperature = 72
if 60 < temperature < 80:
    print("Perfect weather!")`,
          explanation: 'Chained comparisons are more readable and Pythonic'
        },
        {
          title: 'Membership Testing',
          code: `vowels = ['a', 'e', 'i', 'o', 'u']
letter = 'e'

# Check if in list
if letter in vowels:
    print(f"{letter} is a vowel")

# Check if not in list
consonants = 'bcdfg'
if letter not in consonants:
    print(f"{letter} is not a consonant")

# Works with strings
sentence = "Hello, World!"
if 'World' in sentence:
    print("Found 'World'")

# Works with dictionaries (checks keys)
user = {'name': 'Alice', 'age': 25}
if 'name' in user:
    print(f"Name: {user['name']}")`,
          explanation: 'in and not in work with lists, strings, dictionaries, and other collections'
        },
        {
          title: 'Identity Testing with is',
          code: `# Checking for None
result = None

if result is None:
    print("No result yet")

# Not recommended for None
if result == None:  # Works but not Pythonic
    print("No result yet")

# Identity vs Equality
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1

print(list1 == list2)  # True (same contents)
print(list1 is list2)  # False (different objects)
print(list1 is list3)  # True (same object)`,
          explanation: 'Use is for None checks and identity testing'
        },
        {
          title: 'Short-Circuit Evaluation',
          code: `# Prevent division by zero
x = 0
if x != 0 and 10/x > 1:
    print("x is less than 10")
# 10/x is never evaluated when x is 0

# Efficient checking
scores = []
if scores and sum(scores) > 100:
    print("High total score")
# sum(scores) is never called if scores is empty

# Default values with or
name = ""
display_name = name or "Guest"
print(display_name)  # "Guest"

username = "Alice"
display_name = username or "Guest"
print(display_name)  # "Alice"`,
          explanation: 'Short-circuit evaluation prevents errors and improves efficiency'
        }
      ],
      concepts: ['chained comparisons', 'in operator', 'not in', 'is operator', 'identity testing', 'short-circuit evaluation', 'membership testing']
    },
    starterCode: `# TODO: Create a list of valid usernames
# TODO: Get a username from user (or set a variable)
# TODO: Check if username is in the valid list AND has length between 3-15
# TODO: Print appropriate message

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Uses advanced boolean expressions like in, chained comparisons'
      }
    ],
    hints: [
      'Create valid_users = ["alice", "bob", "charlie"]',
      'Use in to check membership',
      'Use chained comparison: 3 <= len(username) <= 15'
    ],
    challenge: {
      prompt: `Check if a number is in range using chained comparisons:
1. Create a variable score = 85
2. Check if score is between 0 and 100 (inclusive) using chained comparison
3. Check if score is above 60 (passing threshold)
4. If in range AND passing, print "Valid passing score"
5. Otherwise print "Invalid or failing score"`,
      starterCode: '# Write your solution here\n',
      solution: 'score = 85\nin_range = 0 <= score <= 100\nis_passing = score > 60\nif in_range and is_passing:\n    print("Valid passing score")\nelse:\n    print("Invalid or failing score")',
      tests: [],
      explanation: 'Chained comparisons let you write: 0 <= score <= 100 instead of score >= 0 and score <= 100. Combine conditions with "and".',
      hints: [
        'Chained: 0 <= score <= 100',
        'Passing check: score > 60',
        'Combine with and'
      ],
      xpReward: 500,
    },
    xpReward: 125,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 7-5: Boolean Functions and Best Practices
  {
    id: 'lesson-4-5',
    moduleId: 'module-4',
    courseId: 'beginner',
    title: 'Boolean Functions and Best Practices',
    content: {
      explanation: `Boolean Functions and Best Practices - Writing Clean, Professional Code ✨📏

Boolean functions and well-written boolean logic are hallmarks of professional code. They make your programs readable, maintainable, and elegant. Let's learn the conventions and best practices that separate amateur code from production-quality software!

<strong>Boolean Functions - Functions That Return True or False:</strong>

Boolean functions (also called predicate functions) are functions designed to answer yes/no questions. They return True or False and make your code read like natural English!

<strong>Naming Conventions - Make Intent Crystal Clear:</strong>

Boolean functions should start with verbs that indicate they return a boolean:
• is_ - State checking: is_valid(), is_empty(), is_adult()
• has_ - Possession checking: has_permission(), has_items(), has_errors()
• can_ - Capability checking: can_access(), can_vote(), can_edit()
• should_ - Recommendation: should_refresh(), should_notify()

✅ <strong>Good names (clear boolean intent):</strong>
• is_valid_email(email)
• has_admin_rights(user)
• can_withdraw(amount, balance)
• is_weekend(date)
• has_special_characters(password)
• can_rent_car(age, license)

❌ <strong>Bad names (unclear, not boolean-like):</strong>
• check_email(email) - Check what about it?
• validate(data) - Returns boolean or throws error?
• permission(user) - What about permission?
• flag() - What does this mean?
• status() - What kind of status?

💡 <strong>The naming test:</strong> If you can put "Is it..." or "Does it have..." before the name, it's a good boolean function name!

<strong>Best Practice 1: Return the Boolean Expression Directly:</strong>

A common beginner mistake is using unnecessary if-else statements:

❌ <strong>Verbose and redundant:</strong>
def is_adult(age):
    if age >= 18:
        return True
    else:
        return False

✅ <strong>Clean and direct:</strong>
def is_adult(age):
    return age >= 18  # The expression IS a boolean!

Same result, clearer code! The comparison age >= 18 already returns True or False, so just return it directly!

<strong>More examples:</strong>

❌ <strong>Redundant:</strong>
def is_even(number):
    if number % 2 == 0:
        return True
    return False

✅ <strong>Direct:</strong>
def is_even(number):
    return number % 2 == 0

❌ <strong>Redundant:</strong>
def has_discount(is_student, is_senior):
    if is_student or is_senior:
        return True
    else:
        return False

✅ <strong>Direct:</strong>
def has_discount(is_student, is_senior):
    return is_student or is_senior

<strong>Best Practice 2: Avoid Redundant Comparisons:</strong>

Never compare boolean variables to True or False explicitly!

❌ <strong>Redundant (DON'T DO THIS):</strong>
if is_logged_in == True:
    print("Welcome!")

if is_active == False:
    print("Inactive user")

if has_permission != False:
    allow_access()

✅ <strong>Clean and Pythonic:</strong>
if is_logged_in:  # Already a boolean!
    print("Welcome!")

if not is_active:  # Clearer!
    print("Inactive user")

if has_permission:  # Simpler!
    allow_access()

💡 <strong>Why?</strong> Boolean variables ARE True or False. Comparing them to True/False is like asking "Is this 'true' value equal to true?"

<strong>Best Practice 3: Use Positive Names (Avoid Double Negatives):</strong>

Name boolean variables and functions with positive phrasing to avoid confusing double negatives!

❌ <strong>Confusing (double negative):</strong>
if not is_not_valid:  # Brain hurts!
    process()

if not is_disabled:  # Hard to read
    enable_feature()

✅ <strong>Clear (positive phrasing):</strong>
if is_valid:  # Easy to understand!
    process()

if is_enabled:  # Crystal clear!
    enable_feature()

<strong>However,</strong> sometimes negative names make sense in context:
• is_banned (clearer than not is_allowed in ban context)
• is_invalid (clearer than not is_valid when reporting errors)
• has_errors (clearer than not is_error_free)

💡 <strong>The clarity test:</strong> If you find yourself using 'not' frequently with a variable, rename it to positive form!

<strong>Best Practice 4: Break Complex Conditions into Named Variables:</strong>

Long, complex boolean expressions are hard to read and debug. Break them into well-named intermediate variables!

❌ <strong>Hard to read monolith:</strong>
if (age >= 18 and age <= 65 and has_license and not has_violations
    and insurance_valid and not is_suspended) or is_instructor:
    allow_rental()

✅ <strong>Clear with named steps:</strong>
is_adult = age >= 18
is_working_age = age <= 65
is_qualified_driver = has_license and not has_violations
has_valid_insurance = insurance_valid and not is_suspended

can_rent = is_adult and is_working_age and is_qualified_driver and has_valid_insurance

if can_rent or is_instructor:
    allow_rental()

<strong>Benefits:</strong>
• Self-documenting: Names explain what conditions mean
• Easier to debug: Can print intermediate values
• Easier to modify: Change one condition without touching others
• More testable: Can test each condition separately

<strong>Best Practice 5: Encapsulate Logic in Boolean Functions:</strong>

Instead of repeating complex conditions, create reusable boolean functions!

❌ <strong>Repeated logic (hard to maintain):</strong>
if age >= 18 and has_id and not is_banned:
    allow_entry()

if age >= 18 and has_id and not is_banned:
    sell_ticket()

if age >= 18 and has_id and not is_banned:
    show_adult_content()

✅ <strong>Encapsulated in function (DRY principle):</strong>
def is_verified_adult(age, has_id, is_banned):
    return age >= 18 and has_id and not is_banned

if is_verified_adult(age, has_id, is_banned):
    allow_entry()

if is_verified_adult(age, has_id, is_banned):
    sell_ticket()

if is_verified_adult(age, has_id, is_banned):
    show_adult_content()

<strong>Real-World Boolean Function Examples:</strong>

<strong>Input validation:</strong>
def is_valid_email(email):
    return '@' in email and '.' in email and len(email) >= 5

def is_valid_password(password):
    has_length = len(password) >= 8
    has_digit = any(char.isdigit() for char in password)
    has_letter = any(char.isalpha() for char in password)
    return has_length and has_digit and has_letter

<strong>Permission checking:</strong>
def can_edit_post(user, post):
    is_author = user.id == post.author_id
    is_admin = user.role == "admin"
    is_moderator = user.role == "moderator"
    return is_author or is_admin or is_moderator

<strong>Business logic:</strong>
def qualifies_for_discount(customer):
    is_student = customer.is_student
    is_senior = customer.age >= 65
    is_military = customer.is_military
    return is_student or is_senior or is_military

<strong>State checking:</strong>
def is_game_over(lives, time_left):
    return lives <= 0 or time_left <= 0

def should_send_reminder(last_login_days, is_premium):
    if is_premium:
        return last_login_days > 30
    return last_login_days > 7

<strong>Code Readability Comparison:</strong>

❌ <strong>Beginner style (hard to read):</strong>
if ((user.age >= 18 and user.has_id == True) or user.is_vip == True) and user.is_banned == False:
    grant_access(user)

✅ <strong>Professional style (self-documenting):</strong>
def can_access_venue(user):
    is_verified = user.age >= 18 and user.has_id
    return (is_verified or user.is_vip) and not user.is_banned

if can_access_venue(user):
    grant_access(user)

<strong>Testing Boolean Functions:</strong>

Boolean functions are easy to test with clear inputs and expected outputs:

def test_is_valid_password():
    assert is_valid_password("abc") == False  # Too short
    assert is_valid_password("abcd1234") == True  # Valid
    assert is_valid_password("abcdefgh") == False  # No digit
    assert is_valid_password("12345678") == False  # No letter

⚠️ <strong>Common Mistakes:</strong>

• Comparing to True/False: if flag == True: (redundant!)
• Using confusing double negatives: if not is_not_ready:
• Writing if-else to return boolean: Just return the expression!
• Not encapsulating repeated logic: Copy-paste same condition everywhere
• Vague function names: check(), validate(), test() - Be specific!
• Using "get_" or "fetch_" for boolean functions: These suggest returning data, not True/False

<strong>Boolean Function Best Practices Summary:</strong>

✅ <strong>Do this:</strong>
• Start names with is_, has_, can_, should_
• Return boolean expression directly (no if-else needed)
• Use positive phrasing when possible
• Break complex conditions into named variables
• Encapsulate repeated logic in functions
• Make functions pure (same inputs = same output)
• Write self-documenting names

❌ <strong>Don't do this:</strong>
• Compare booleans to True/False explicitly
• Use vague names like check(), flag(), test()
• Nest if-else to return boolean
• Write long, complex inline conditions
• Use double negatives unnecessarily
• Create boolean functions with side effects

💡 <strong>The ultimate test:</strong> Can someone read your boolean function call like an English sentence?
• if can_access_database(user): ✅ Reads naturally!
• if check_db(u): ❌ Unclear!

Professional code uses boolean functions liberally. They make code self-documenting, testable, reusable, and maintainable. Master these practices, and your code will be clean, readable, and professional!
`,
      codeExamples: [
        {
          title: 'Boolean Functions',
          code: `def is_even(number):
    """Check if a number is even"""
    return number % 2 == 0

def is_valid_email(email):
    """Basic email validation"""
    return '@' in email and '.' in email

def can_vote(age):
    """Check if person is old enough to vote"""
    return age >= 18

# Using the functions
print(is_even(4))  # True
print(is_valid_email("user@example.com"))  # True
print(can_vote(16))  # False`,
          explanation: 'Boolean functions return True or False based on conditions'
        },
        {
          title: 'Avoiding Redundant Comparisons',
          code: `is_logged_in = True

# Bad - redundant
if is_logged_in == True:
    print("Welcome back!")

# Good - direct
if is_logged_in:
    print("Welcome back!")

# Bad - double negative
if is_logged_in != False:
    print("Welcome back!")

# Good - simple and clear
if is_logged_in:
    print("Welcome back!")`,
          explanation: 'Don\'t compare boolean variables to True or False'
        },
        {
          title: 'Simplifying Complex Conditions',
          code: `# Bad - hard to read
if age >= 18 and age <= 65 and has_license and not has_violations and insurance_valid:
    print("Can rent car")

# Good - use descriptive variables
is_adult = age >= 18
is_working_age = age <= 65
is_qualified = has_license and not has_violations
can_rent = is_adult and is_working_age and is_qualified and insurance_valid

if can_rent:
    print("Can rent car")

# Even better - use a function
def can_rent_car(age, has_license, has_violations, insurance_valid):
    is_adult = age >= 18
    is_working_age = age <= 65
    is_qualified = has_license and not has_violations
    return is_adult and is_working_age and is_qualified and insurance_valid`,
          explanation: 'Break complex conditions into readable parts'
        },
        {
          title: 'Returning Booleans Directly',
          code: `# Bad - unnecessary if/else
def is_passing(score):
    if score >= 60:
        return True
    else:
        return False

# Good - return the expression directly
def is_passing(score):
    return score >= 60

# Another example
def is_in_range(value, min_val, max_val):
    return min_val <= value <= max_val

# Usage
print(is_passing(75))  # True
print(is_in_range(5, 1, 10))  # True`,
          explanation: 'Return boolean expressions directly instead of if/else'
        },
        {
          title: 'Practical Example: Form Validation',
          code: `def is_valid_username(username):
    """Check if username meets requirements"""
    has_length = 3 <= len(username) <= 20
    is_alphanumeric = username.isalnum()
    return has_length and is_alphanumeric

def is_valid_password(password):
    """Check if password is strong enough"""
    has_length = len(password) >= 8
    has_digit = any(char.isdigit() for char in password)
    has_letter = any(char.isalpha() for char in password)
    return has_length and has_digit and has_letter

def can_register(username, password):
    """Check if user can register"""
    return is_valid_username(username) and is_valid_password(password)

# Test the functions
user = "alice123"
pwd = "password1"

if can_register(user, pwd):
    print("Registration successful!")
else:
    print("Invalid username or password")`,
          explanation: 'Combine boolean functions for complex validation logic'
        }
      ],
      concepts: ['boolean functions', 'predicate functions', 'code readability', 'best practices', 'returning booleans', 'simplifying conditions']
    },
    starterCode: `# TODO: Write a function is_valid_age(age) that checks if age is between 0 and 120
# TODO: Write a function is_teenager(age) that checks if age is between 13 and 19
# TODO: Test both functions with different ages

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Defines boolean functions that return True or False'
      }
    ],
    hints: [
      'Use return 0 <= age <= 120 for is_valid_age',
      'Use return 13 <= age <= 19 for is_teenager',
      'Don\'t use if/else, return the expression directly'
    ],
    challenge: {
      prompt: `Build a complete validation check using boolean expressions:
1. Create variables: email = "user@example.com", password = "mypass123"
2. Check if email is valid: has "@" and has "."
3. Check if password is strong: length >= 8
4. Store both results in boolean variables
5. Print whether BOTH checks pass (use and)`,
      starterCode: '# Write your solution here\n',
      solution: 'email = "user@example.com"\npassword = "mypass123"\nvalid_email = "@" in email and "." in email\nstrong_password = len(password) >= 8\nprint(f"Valid email: {valid_email}")\nprint(f"Strong password: {strong_password}")\nprint(f"All checks pass: {valid_email and strong_password}")',
      tests: [],
      explanation: 'Boolean expressions with "in" check membership in strings. Combine results with "and" to require all conditions!',
      hints: [
        'Check email: "@" in email and "." in email',
        'Check password: len(password) >= 8',
        'Combine: valid_email and strong_password'
      ],
      xpReward: 500,
    },
    xpReward: 500,
    activityType: 'game',
    gameType: 'quiz'
  }
];
