// Module 4: Functions
// 5 lessons covering function basics, parameters, return values, scope

import type { Lesson } from '@types';

export const module4Lessons: Lesson[] = [
  {
    id: 'lesson-7-1',
    moduleId: 'module-7',
    courseId: 'beginner',
    title: 'Defining Functions',
    content: {
      explanation: `Creating Your Own Functions 🔧

Functions are one of the most important concepts in programming. They're reusable blocks of code that perform a specific task. Instead of writing the same code over and over, you write it once in a function and call it whenever you need it! Functions are how professional programmers organize code, eliminate repetition, and build complex programs from simple pieces.

<strong>Think of functions like recipes:</strong>
A recipe has a name ("Chocolate Chip Cookies"), steps to follow, and produces a result. Once you've written the recipe, anyone can follow it to make cookies - you don't need to rewrite the instructions each time!

<strong>Why functions are essential:</strong>

• <strong>Code reuse:</strong> Write once, use everywhere - eliminates copy-paste code
• <strong>Organization:</strong> Break large problems into small, manageable pieces
• <strong>Readability:</strong> calculate_tax() is clearer than seeing the tax calculation every time
• <strong>Testing:</strong> Easier to test and debug small functions than huge blocks of code
• <strong>Maintenance:</strong> Fix a bug once in the function, it's fixed everywhere
• <strong>Abstraction:</strong> Hide complex details behind simple, descriptive names

<strong>The anatomy of a function:</strong>

def greet():
    print("Hello!")
    print("Welcome to Python!")

Let's break down each part:

• <strong>def</strong> - The keyword that tells Python "I'm defining a function"
• <strong>greet</strong> - The function name (follows same rules as variable names)
• <strong>()</strong> - Parentheses that hold parameters (empty here, we'll add parameters soon!)
• <strong>:</strong> - Colon that starts the function body
• <strong>Indented code</strong> - Everything indented under def is part of the function

<strong>Calling (using) a function:</strong>

After defining a function, you call it by writing its name followed by parentheses:

greet()  # Runs the function
greet()  # Can call it as many times as you want!

Output:
Hello!
Welcome to Python!
Hello!
Welcome to Python!

<strong>Function naming rules (same as variables):</strong>

✅ <strong>Good names:</strong>
• calculate_total()
• send_email()
• get_user_age()
• is_valid_password()

❌ <strong>Bad names:</strong>
• func() - not descriptive
• calculateTotal() - Python convention is snake_case, not camelCase
• send-email() - hyphens not allowed
• 2nd_function() - can't start with number

<strong>Best practices for function names:</strong>

✅ Use verbs that describe what the function does: calculate, get, send, check, validate
✅ Be specific: get_user_email() is better than get_data()
✅ Use snake_case: my_function not myFunction
✅ Boolean functions (return True/False) should ask questions: is_valid(), has_permission()

<strong>Before and after - see the difference:</strong>

<strong>Without functions (repetitive, hard to maintain):</strong>
print("=====")
print("Welcome to our site!")
print("=====")

# ... 100 lines later ...

print("=====")
print("Welcome to our site!")
print("=====")

# ... 100 lines later ...

print("=====")
print("Welcome to our site!")
print("=====")

<strong>With functions (clean, maintainable):</strong>
def show_welcome():
    print("=====")
    print("Welcome to our site!")
    print("=====")

show_welcome()
# ... 100 lines later ...
show_welcome()
# ... 100 lines later ...
show_welcome()

Now if you want to change the welcome message, you change it in ONE place!

<strong>Real-world function examples:</strong>

<strong>Displaying formatted messages:</strong>
def print_header():
    print("=" * 40)
    print("STUDENT GRADE CALCULATOR")
    print("=" * 40)

print_header()
# Now your program looks professional!

<strong>Performing calculations:</strong>
def calculate_area_rectangle():
    length = 5
    width = 3
    area = length * width
    print(f"Area: {area}")

calculate_area_rectangle()

<strong>Separating concerns:</strong>
def initialize_game():
    print("Loading game assets...")
    print("Setting up player...")
    print("Game ready!")

def show_menu():
    print("1. Start Game")
    print("2. Options")
    print("3. Quit")

initialize_game()
show_menu()

<strong>How Python executes functions:</strong>

When Python sees a function definition, it remembers it but doesn't run the code inside yet:

def say_hello():          # Python: "Okay, I'll remember this"
    print("Hello!")

print("Starting program") # This runs immediately
say_hello()              # NOW the function code runs
print("Ending program")  # This runs after the function finishes

Output:
Starting program
Hello!
Ending program

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Forgetting parentheses when calling:</strong> say_hello by itself doesn't run the function, you need say_hello()
⚠️ <strong>Forgetting the colon:</strong> def greet() - missing the : will cause a syntax error
⚠️ <strong>Not indenting the function body:</strong> Python uses indentation to know what's inside the function
⚠️ <strong>Calling before defining:</strong> You must define a function before you can call it
⚠️ <strong>Defining but never calling:</strong> Functions don't run automatically - you must call them!

<strong>Example of a mistake:</strong>

say_hello()  # ERROR! Function not defined yet

def say_hello():
    print("Hello!")

<strong>Correct version:</strong>

def say_hello():
    print("Hello!")

say_hello()  # Works! Function is defined before being called

<strong>Indentation matters!</strong>

def my_function():
    print("Inside function")  # Indented - part of function
    print("Still inside")     # Indented - part of function
print("Outside function")     # Not indented - NOT part of function

<strong>Functions can call other functions:</strong>

def print_line():
    print("-" * 30)

def print_header(title):
    print_line()
    print(title)
    print_line()

print_header("Welcome")

Output:
------------------------------
Welcome
------------------------------

<strong>Why break code into functions:</strong>

Imagine building a game without functions:

# Everything in one big block - nightmare!
print("Starting game...")
# 500 lines of game initialization
print("Player health: 100")
# 300 lines of player setup
print("Enemy spawned")
# 400 lines of enemy logic
# ... thousands of lines later ...

<strong>With functions - organized and maintainable:</strong>

def initialize_game():
    # Game setup code here
    pass

def create_player():
    # Player setup code here
    pass

def spawn_enemy():
    # Enemy logic here
    pass

# Main program is clean and readable!
initialize_game()
create_player()
spawn_enemy()

<strong>Pro tips:</strong>

✅ <strong>Keep functions short and focused:</strong> Each function should do ONE thing well
✅ <strong>Use descriptive names:</strong> Good names eliminate the need for comments
✅ <strong>Define functions at the top of your file:</strong> Makes them easy to find
✅ <strong>Don't repeat yourself (DRY):</strong> If you're copying code, make it a function!
✅ <strong>Functions should be independent:</strong> They shouldn't rely on lots of external variables

<strong>The power of abstraction:</strong>

Functions let you hide complexity behind simple names:

# Without seeing the implementation, you understand what this does:
validate_email()
send_confirmation_email()
add_to_database()
log_user_action()

This is called abstraction - hiding complex details behind simple interfaces!

<strong>What's coming next:</strong>

So far, our functions are static - they do the same thing every time. Next, you'll learn about parameters, which let you pass data into functions, making them flexible and powerful!

Functions are the building blocks of all software. Master them, and you'll be able to build anything you can imagine! Every complex program is just a collection of well-organized functions working together.`,
      codeExamples: [
        {
          code: 'def say_hello():\n    print("Hello, World!")\n    print("Nice to meet you!")\n\nsay_hello()\nsay_hello()  # Can call multiple times',
          explanation: 'Defining and calling functions',
        },
      ],
      concepts: ['functions', 'def keyword', 'function calls', 'code reuse'],
    },
    starterCode: '# Define a function that prints a name\ndef introduce():\n    print("My name is Python")\n    print("I love to code!")\n\n# Call the function\nintroduce()',
    validationTests: [
      {
        description: 'Should define and call function',
        code: 'def test():\n    print("works")\ntest()',
        expectedOutput: 'works',
      },
    ],
    hints: [
      'Use def keyword to define functions',
      'Indent the function body',
      'Call functions with parentheses ()',
    ],
    challenge: {
      prompt: `Create a greeting function:
1. Define a function called greet_user
2. Inside the function, print "Welcome to Python!"
3. Call the function three times`,
      starterCode: '# Write your solution here\n',
      solution: 'def greet_user():\n    print("Welcome to Python!")\n\ngreet_user()\ngreet_user()\ngreet_user()',
      tests: [],
      explanation: 'Functions let you reuse code! Define once with def, then call it as many times as needed.',
      hints: [
        'Define: def greet_user():',
        'Indent the print statement',
        'Call with: greet_user()'
      ],
      xpReward: 150,
    },
    xpReward: 125,
    gameType: 'quiz',
  },

  {
    id: 'lesson-7-2',
    moduleId: 'module-7',
    courseId: 'beginner',
    title: 'Function Parameters',
    content: {
      explanation: `Passing Data to Functions 📥

Now that you can create functions, let's make them truly powerful! Parameters transform functions from static, one-trick ponies into flexible, reusable tools that can work with different data every time you call them. This is where functions become incredibly useful!

<strong>What are parameters?</strong>

Parameters are variables that let you pass information into functions. They're like input slots where you plug in values each time you call the function. Think of them as the "ingredients" in a recipe - the recipe stays the same, but you can use different ingredients!

<strong>Simple example - one parameter:</strong>

def greet(name):
    print(f"Hello, {name}!")
    print("Welcome to Python!")

greet("Alice")  # Hello, Alice!
greet("Bob")    # Hello, Bob!
greet("Charlie")  # Hello, Charlie!

The same function works for anyone! The parameter name acts as a placeholder that gets filled in with whatever value you pass.

<strong>Important terminology:</strong>

• <strong>Parameter:</strong> The variable in the function definition (name in def greet(name):)
• <strong>Argument:</strong> The actual value you pass when calling (Alice in greet("Alice"))

People often use these terms interchangeably, but technically:
- Parameters are the placeholders (in the definition)
- Arguments are the actual values (in the call)

<strong>Multiple parameters - unlimited flexibility:</strong>

def introduce(name, age, city):
    print(f"I'm {name}")
    print(f"I'm {age} years old")
    print(f"I live in {city}")

introduce("Alice", 25, "New York")
introduce("Bob", 30, "Los Angeles")
introduce("Charlie", 35, "Chicago")

Each parameter becomes a variable you can use inside the function!

<strong>How parameters work internally:</strong>

When you call introduce("Alice", 25, "New York"), Python does this:

def introduce(name, age, city):  # name="Alice", age=25, city="New York"
    print(f"I'm {name}")         # Uses "Alice"
    print(f"I'm {age} years old")    # Uses 25
    print(f"I live in {city}")   # Uses "New York"

The parameters are just regular variables inside the function!

<strong>Positional arguments - order matters:</strong>

When you pass arguments, they match parameters by position:

def describe_pet(animal, name):
    print(f"I have a {animal} named {name}")

describe_pet("dog", "Buddy")   # animal="dog", name="Buddy"
describe_pet("Buddy", "dog")   # animal="Buddy", name="dog" - WRONG!

The order you pass arguments determines which parameter gets which value!

<strong>Keyword arguments - explicit and clear:</strong>

Instead of relying on position, you can specify parameter names:

describe_pet(animal="dog", name="Buddy")
describe_pet(name="Buddy", animal="dog")  # Same result! Order doesn't matter

Keyword arguments are clearer and prevent mistakes, especially with many parameters!

<strong>Mixing positional and keyword arguments:</strong>

def make_profile(username, email, age, premium=False):
    print(f"User: {username}")
    print(f"Email: {email}")
    print(f"Age: {age}")
    print(f"Premium: {premium}")

# Positional then keyword
make_profile("alice123", "alice@email.com", 25, premium=True)

# All keyword
make_profile(email="bob@email.com", username="bob456", age=30, premium=False)

<strong>Rule: Positional arguments must come before keyword arguments!</strong>

<strong>Default parameter values - optional arguments:</strong>

You can give parameters default values, making them optional:

def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Uses default: "Hello, Alice!"
greet("Bob", "Hi")          # Custom greeting: "Hi, Bob!"
greet("Charlie", "Hey")     # Custom greeting: "Hey, Charlie!"

If an argument isn't provided, the default is used!

<strong>More default value examples:</strong>

def create_user(username, role="user", active=True):
    print(f"Creating {role}: {username} (active: {active})")

create_user("alice")                           # Uses both defaults
create_user("bob", "admin")                    # Custom role, default active
create_user("charlie", "moderator", False)     # All custom values
create_user("david", active=False)             # Use keyword to skip middle param

<strong>Parameters make functions incredibly flexible:</strong>

<strong>Without parameters (limited):</strong>
def calculate_area_fixed():
    length = 5
    width = 3
    area = length * width
    print(area)

calculate_area_fixed()  # Always calculates 5 * 3

<strong>With parameters (powerful!):</strong>
def calculate_area(length, width):
    area = length * width
    print(f"Area of {length} x {width} = {area}")

calculate_area(5, 3)    # 15
calculate_area(10, 20)  # 200
calculate_area(7, 7)    # 49

One function works for ANY rectangle!

<strong>Real-world examples:</strong>

<strong>Send emails with different content:</strong>
def send_email(recipient, subject, body):
    print(f"To: {recipient}")
    print(f"Subject: {subject}")
    print(f"Message: {body}")
    print("Email sent!")

send_email("alice@email.com", "Welcome!", "Thanks for signing up!")
send_email("bob@email.com", "Password Reset", "Click here to reset...")

<strong>Calculate discounts for different amounts:</strong>
def calculate_discount(price, discount_percent=10):
    discount = price * (discount_percent / 100)
    final_price = price - discount
    print(f"Original: \${price}")
    print(f"Discount: {discount_percent}%")
    print(f"Final: \${final_price}")

calculate_discount(100)        # 10% discount (default)
calculate_discount(100, 20)    # 20% discount
calculate_discount(50, 15)     # 15% discount

<strong>Format text in different ways:</strong>
def format_message(text, uppercase=False, add_border=False):
    result = text.upper() if uppercase else text

    if add_border:
        print("=" * len(result))
        print(result)
        print("=" * len(result))
    else:
        print(result)

format_message("Hello")                          # hello
format_message("Hello", uppercase=True)          # HELLO
format_message("Hello", add_border=True)         # With border
format_message("Hello", True, True)              # Uppercase with border

<strong>Parameters enable different function behaviors:</strong>

def print_separator(char="-", length=30):
    print(char * length)

print_separator()           # ------------------------------
print_separator("=")        # ==============================
print_separator("*", 50)    # **************************************************
print_separator(char="~", length=20)  # ~~~~~~~~~~~~~~~~~~~~

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Wrong number of arguments:</strong>
def greet(name, age):
    print(f"Hello {name}, age {age}")

greet("Alice")        # ERROR! Missing age argument
greet("Alice", 25, "NYC")  # ERROR! Too many arguments

⚠️ <strong>Wrong order with positional arguments:</strong>
def calculate_discount(price, discount):
    return price * (discount / 100)

calculate_discount(20, 100)  # Calculates 100 * (20/100) - BACKWARDS!

⚠️ <strong>Keyword argument before positional:</strong>
greet(name="Alice", 25)  # ERROR! Positional after keyword

⚠️ <strong>Typo in keyword argument:</strong>
greet(nane="Alice", age=25)  # ERROR! 'nane' is not a parameter

⚠️ <strong>Using mutable defaults (advanced pitfall):</strong>
# DON'T do this (we'll learn why in advanced lessons)
def add_item(item, list=[]):  # Dangerous!
    list.append(item)
    return list

<strong>Parameters vs local variables:</strong>

Parameters are just variables that get their initial values from arguments:

def example(x, y):  # x and y are parameters (also local variables)
    z = x + y       # z is a regular local variable
    print(z)

example(5, 3)

Inside the function, x, y, and z are all local variables!

<strong>Pro tips:</strong>

✅ <strong>Use descriptive parameter names:</strong> calculate_area(length, width) not calculate_area(a, b)
✅ <strong>Order parameters logically:</strong> Most important first, optional with defaults last
✅ <strong>Use keyword arguments for clarity:</strong> create_user(name="alice", role="admin") is very clear
✅ <strong>Give defaults to optional parameters:</strong> Let users omit arguments they don't care about
✅ <strong>Limit parameter count:</strong> More than 3-4 parameters? Consider using a dictionary or object
✅ <strong>Document complex functions:</strong> Add comments explaining what each parameter does

<strong>Docstrings - document your parameters:</strong>

def calculate_total(price, tax_rate, discount=0):
    """
    Calculate total price including tax and discount.

    price: Original price before tax/discount
    tax_rate: Tax as a decimal (0.08 for 8%)
    discount: Discount amount to subtract (default: 0)
    """
    subtotal = price - discount
    total = subtotal * (1 + tax_rate)
    return total

<strong>When to use parameters vs when not to:</strong>

<strong>Use parameters when:</strong>
• Values change between function calls
• You want the function to be reusable
• Different users/scenarios need different values

<strong>Don't use parameters when:</strong>
• Values are truly constant (use constants instead)
• The function should always use the same values

Parameters are what make functions powerful and reusable. Master parameters, and you'll be able to build flexible, maintainable code that adapts to any situation!`,
      codeExamples: [
        {
          code: 'def add_numbers(a, b):\n    result = a + b\n    print(f"{a} + {b} = {result}")\n\nadd_numbers(5, 3)\nadd_numbers(10, 20)',
          explanation: 'Functions with multiple parameters',
        },
      ],
      concepts: ['parameters', 'arguments', 'function inputs'],
    },
    starterCode: '# Function with parameters\ndef greet_person(name, age):\n    print(f"Hello {name}!")\n    print(f"You are {age} years old")\n\n# Call with different arguments\ngreet_person("Alice", 25)\ngreet_person("Bob", 30)',
    validationTests: [
      {
        description: 'Should use parameters',
        code: 'def show(x):\n    print(x)\nshow(42)',
        expectedOutput: '42',
      },
    ],
    hints: [
      'Parameters go inside the parentheses',
      'Separate multiple parameters with commas',
      'Arguments are the actual values you pass',
    ],
    challenge: {
      prompt: `Create a personalized greeting:
1. Define a function greet that takes name and age as parameters
2. Print: "Hello [name], you are [age] years old!"
3. Call it with different names and ages`,
      starterCode: '# Write your solution here\n',
      solution: 'def greet(name, age):\n    print(f"Hello {name}, you are {age} years old!")\n\ngreet("Alice", 25)\ngreet("Bob", 30)',
      tests: [],
      explanation: 'Parameters let functions work with different data each time. Pass values when calling the function.',
      hints: [
        'Define: def greet(name, age):',
        'Use f-string to include variables',
        'Call with actual values: greet("Alice", 25)'
      ],
      xpReward: 150,
    },
    xpReward: 125,
    gameType: 'quiz',
  },

  {
    id: 'lesson-7-3',
    moduleId: 'module-7',
    courseId: 'beginner',
    title: 'Return Values',
    content: {
      explanation: `Getting Results from Functions 📤

So far, our functions have just printed things or performed actions. But functions become exponentially more powerful when they can send data back to whoever called them! This is what the return statement does - it lets functions calculate, process, or create something and give it back for use in your program.

<strong>The magic of return:</strong>

def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8

The function add() calculates 5 + 3 and sends back 8. We can save that value, print it, use it in other calculations - anything!

<strong>Return does two critical things:</strong>

1. <strong>Sends a value back</strong> to the code that called the function
2. <strong>Immediately exits the function</strong> - no code after return runs!

def example():
    print("Before return")
    return 42
    print("After return")  # This NEVER runs!

result = example()
print(result)

Output:
Before return
42

The second print inside the function never executes because return exits immediately!

<strong>Why return is so powerful:</strong>

<strong>Without return (limited):</strong>
def calculate_tax(price):
    tax = price * 0.08
    print(tax)  # Just prints, can't use the value!

calculate_tax(100)  # Prints 8.0
# But I can't use that value in my program!

<strong>With return (powerful!):</strong>
def calculate_tax(price):
    tax = price * 0.08
    return tax  # Send the value back!

tax_amount = calculate_tax(100)
total = 100 + tax_amount
print(f"Total with tax: \${total}")

# Can use the returned value anywhere!
if calculate_tax(100) > 5:
    print("High tax!")

<strong>Using returned values in different ways:</strong>

def multiply(x, y):
    return x * y

# Save to variable
result = multiply(6, 7)
print(result)  # 42

# Use directly in print
print(multiply(5, 5))  # 25

# Use in calculations
bigger = multiply(3, 4) * 2  # (3*4)*2 = 24
total = multiply(10, 5) + multiply(2, 3)  # 50 + 6 = 56

# Use in conditionals
if multiply(4, 5) > 15:
    print("Result is large!")

# Chain function calls
def square(n):
    return n * n

print(square(multiply(2, 3)))  # square(6) = 36

<strong>Functions without return automatically return None:</strong>

def just_print():
    print("Hello!")
    # No return statement

result = just_print()
print(result)  # None

Output:
Hello!
None

None is Python's way of saying "no value" or "nothing." If you forget return, your function returns None by default!

<strong>You can return any data type:</strong>

<strong>Return a number:</strong>
def get_age():
    return 25

<strong>Return a string:</strong>
def get_name():
    return "Alice"

<strong>Return a boolean:</strong>
def is_adult(age):
    return age >= 18

<strong>Return a list:</strong>
def get_scores():
    return [85, 92, 78, 95]

<strong>Return a dictionary:</strong>
def get_user():
    return {"name": "Alice", "age": 25}

<strong>Return multiple values (as a tuple):</strong>
def get_dimensions():
    return 1920, 1080  # Returns (1920, 1080)

width, height = get_dimensions()
print(width)   # 1920
print(height)  # 1080

<strong>Early returns - exit function based on conditions:</strong>

def get_grade(score):
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    if score >= 70:
        return "C"
    if score >= 60:
        return "D"
    return "F"

grade = get_grade(85)
print(grade)  # B

Once a return is hit, the function exits immediately. No need for else statements!

<strong>Returning from multiple paths:</strong>

def absolute_value(n):
    if n < 0:
        return -n  # Return positive version
    else:
        return n   # Already positive

print(absolute_value(-5))  # 5
print(absolute_value(3))   # 3

Different paths through the function can return different values!

<strong>Return in loops - exit early:</strong>

def find_first_negative(numbers):
    for num in numbers:
        if num < 0:
            return num  # Found it, return immediately!
    return None  # No negative found

result = find_first_negative([5, 3, -2, 8, -1])
print(result)  # -2

The function stops searching as soon as it finds a negative number!

<strong>Void functions vs value-returning functions:</strong>

<strong>Void functions (perform actions):</strong>
def print_welcome(name):
    print(f"Welcome, {name}!")
    # No return - just does something

print_welcome("Alice")  # Displays message, returns None

<strong>Value-returning functions (calculate/create something):</strong>
def calculate_welcome_length(name):
    message = f"Welcome, {name}!"
    return len(message)

length = calculate_welcome_length("Alice")  # Returns 15

Most useful functions return values!

<strong>Real-world return examples:</strong>

<strong>Calculate discount:</strong>
def calculate_discount(price, percent):
    discount_amount = price * (percent / 100)
    return discount_amount

discount = calculate_discount(100, 20)
final_price = 100 - discount
print(f"You save \${discount}!")

<strong>Validate input:</strong>
def is_valid_email(email):
    return "@" in email and "." in email

email = input("Enter email: ")
if is_valid_email(email):
    print("Valid email!")
else:
    print("Invalid email!")

<strong>Process data:</strong>
def get_even_numbers(numbers):
    evens = []
    for num in numbers:
        if num % 2 == 0:
            evens.append(num)
    return evens

data = [1, 2, 3, 4, 5, 6, 7, 8]
even_data = get_even_numbers(data)
print(even_data)  # [2, 4, 6, 8]

<strong>Build strings:</strong>
def format_name(first, last):
    return f"{last}, {first}"

full_name = format_name("Alice", "Smith")
print(full_name)  # Smith, Alice

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Printing instead of returning:</strong>
def add(a, b):
    print(a + b)  # Prints but doesn't return!

result = add(5, 3)  # result is None, not 8!
total = result + 10  # ERROR! Can't add None + 10

<strong>Fix:</strong> Use return, not print!

⚠️ <strong>Forgetting to use the returned value:</strong>
def calculate_tax(price):
    return price * 0.08

calculate_tax(100)  # Returns 8.0 but you don't use it!

<strong>Fix:</strong> Save it in a variable or use it directly!

⚠️ <strong>Code after return (dead code):</strong>
def example():
    return 42
    print("This never runs!")  # Unreachable!

<strong>Fix:</strong> Put all necessary code before return!

⚠️ <strong>Return in wrong indentation:</strong>
def bad_loop(numbers):
    for num in numbers:
        result = num * 2
    return result  # Only returns last value!

def good_loop(numbers):
    results = []
    for num in numbers:
        results.append(num * 2)
    return results  # Returns all values!

<strong>The power of composition - using functions together:</strong>

Functions that return values can be combined in powerful ways:

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

def calculate_total(price, quantity, tax_rate):
    subtotal = multiply(price, quantity)
    tax = multiply(subtotal, tax_rate)
    total = add(subtotal, tax)
    return total

final = calculate_total(10, 3, 0.08)
print(f"Total: \${final}")

Each function does one thing well, and they work together!

<strong>Return vs print - when to use each:</strong>

<strong>Use print when:</strong>
• Displaying output to users
• Debugging (showing intermediate values)
• Creating reports or formatted output

<strong>Use return when:</strong>
• Calculating values for further use
• Extracting/processing data
• Building components that other functions use
• Testing (easier to test returned values than printed output!)

<strong>Pro tips:</strong>

✅ <strong>Return early for clarity:</strong> Check edge cases first and return immediately
✅ <strong>Be consistent:</strong> Don't sometimes return a value and sometimes return None
✅ <strong>Return meaningful values:</strong> Don't return arbitrary status codes when True/False is clearer
✅ <strong>Document return values:</strong> Comment what the function returns and what it means
✅ <strong>One responsibility:</strong> Functions should calculate/return ONE thing
✅ <strong>Avoid side effects:</strong> Functions that return values shouldn't also modify global state or print things

<strong>Type hints (modern Python best practice):</strong>

You can document what a function returns:

def add(a: int, b: int) -> int:
    return a + b

The -> int tells readers the function returns an integer!

<strong>Return makes functions composable:</strong>

def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    return (fahrenheit - 32) * 5/9

# Can chain conversions!
temp_c = 20
temp_f = celsius_to_fahrenheit(temp_c)
back_to_c = fahrenheit_to_celsius(temp_f)
print(back_to_c)  # 20 (back to original!)

Return is what makes functions building blocks. Functions that return values can be combined, chained, and composed into complex programs. They're testable, reusable, and reliable. Master return, and you'll write professional, maintainable code!`,
      codeExamples: [
        {
          code: 'def multiply(x, y):\n    return x * y\n\nanswer = multiply(6, 7)\nprint(answer)  # 42\n\n# Chain functions\nresult = multiply(2, 3) + multiply(4, 5)\nprint(result)  # 26',
          explanation: 'Using return values',
        },
      ],
      concepts: ['return statement', 'function output', 'return values'],
    },
    starterCode: '# Function that returns a value\ndef square(number):\n    return number * number\n\n# Use the returned value\nresult = square(5)\nprint(result)\n\n# Use in expression\nprint(square(3) + square(4))',
    validationTests: [
      {
        description: 'Should return a value',
        code: 'def double(x):\n    return x * 2\nprint(double(5))',
        expectedOutput: '10',
      },
    ],
    hints: [
      'Use return to send a value back',
      'return exits the function immediately',
      'Save returned values in variables',
    ],
    challenge: {
      prompt: `Create a calculator function:
1. Define a function multiply that takes two parameters
2. Return the product of the two numbers
3. Call it with 6 and 7, save result in a variable
4. Print the result`,
      starterCode: '# Write your solution here\n',
      solution: 'def multiply(a, b):\n    return a * b\n\nresult = multiply(6, 7)\nprint(result)',
      tests: [],
      explanation: 'return sends a value back to whoever called the function. Save it in a variable to use it!',
      hints: [
        'Define: def multiply(a, b):',
        'Return the product: return a * b',
        'Save result: result = multiply(6, 7)'
      ],
      xpReward: 150,
    },
    xpReward: 125,
    gameType: 'quiz',
  },

  {
    id: 'lesson-7-4',
    moduleId: 'module-7',
    courseId: 'beginner',
    title: 'Scope',
    content: {
      explanation: `Where Variables Live 🌍

Scope is one of the most important concepts to understand in programming, yet it confuses many beginners. Scope determines where a variable exists and where it can be used. Understanding scope prevents mysterious bugs and helps you write clean, maintainable code!

<strong>What is scope?</strong>

Scope is like a variable's "home address" - it defines where a variable lives and where it can be accessed. Python has clear rules about which code can see which variables, and these rules prevent chaos in your programs!

<strong>Local scope - variables trapped inside functions:</strong>

def my_function():
    x = 10  # Local variable - only exists inside this function
    print(x)

my_function()  # Prints 10
print(x)  # ERROR! NameError: name 'x' is not defined

When you create a variable inside a function, it only exists inside that function. It's born when the function starts and dies when the function ends. Outside code can't see it or use it!

<strong>Why local variables disappear:</strong>

Think of a function as a sealed box. Variables created inside the box stay inside the box and disappear when the function completes:

def calculate():
    result = 42  # Created
    print(result)  # Used
    # Function ends, result is destroyed!

calculate()
print(result)  # ERROR! result doesn't exist anymore

This is actually a GOOD thing! It keeps variables from different functions from interfering with each other.

<strong>Each function call gets its own local variables:</strong>

def count():
    x = 0
    x = x + 1
    print(x)

count()  # Prints 1
count()  # Prints 1 (not 2!)
count()  # Prints 1 (not 3!)

Each call creates a brand new x that starts at 0, increments to 1, then disappears!

<strong>Global scope - variables accessible everywhere:</strong>

name = "Alice"  # Global variable - created outside any function

def greet():
    print(name)  # Can READ global variable

def farewell():
    print(f"Goodbye, {name}!")  # Can READ global variable here too

greet()      # Alice
farewell()   # Goodbye, Alice!
print(name)  # Alice

Global variables are created outside all functions and can be read from anywhere in your code!

<strong>Reading vs modifying - the crucial distinction:</strong>

<strong>You CAN read global variables from inside functions:</strong>

score = 100  # Global

def show_score():
    print(score)  # Reading is fine!

show_score()  # 100

<strong>You CANNOT modify global variables without the global keyword:</strong>

score = 100

def add_points():
    score = score + 10  # ERROR! UnboundLocalError!
    print(score)

add_points()

Why the error? Python sees you assigning to score, so it thinks you want a LOCAL variable called score. But you're trying to read the local score before it exists!

<strong>The global keyword - modify global variables:</strong>

To modify a global variable from inside a function, you must declare it global:

score = 100

def add_points():
    global score  # "I want to use the global score, not create a local one"
    score = score + 10
    print(score)

add_points()  # 110
print(score)  # 110 (global score was modified!)

<strong>How scope resolution works - LEGB rule:</strong>

Python searches for variables in this order:

1. <strong>Local:</strong> Inside the current function
2. <strong>Enclosing:</strong> In any containing functions (nested functions)
3. <strong>Global:</strong> At the module level (outside all functions)
4. <strong>Built-in:</strong> Python's built-in namespace (print, len, etc.)

def outer():
    x = "outer"

    def inner():
        x = "inner"
        print(x)  # Finds "inner" in local scope

    inner()
    print(x)  # Finds "outer" in this function's scope

x = "global"
outer()
print(x)  # Finds "global" in global scope

Output:
inner
outer
global

<strong>Shadowing - local variables hide global ones:</strong>

x = 100  # Global

def my_function():
    x = 50  # Local - shadows the global x
    print(x)  # Prints 50 (local x)

my_function()  # 50
print(x)  # 100 (global x unchanged)

The local x "shadows" (hides) the global x inside the function. They're completely separate variables!

<strong>Why local scope is good - avoiding chaos:</strong>

<strong>Without local scope (chaos!):</strong>
Imagine if all variables were global:

x = 10

def function1():
    x = 20  # Modifies global x!

def function2():
    x = 30  # Modifies global x!

function1()
function2()
print(x)  # No idea what x is anymore!

<strong>With local scope (organized):</strong>

x = 10

def function1():
    x = 20  # Local to function1
    print(x)

def function2():
    x = 30  # Local to function2
    print(x)

function1()  # 20
function2()  # 30
print(x)  # 10 (global x untouched!)

Each function has its own space!

<strong>Parameters are local variables:</strong>

Parameters behave exactly like local variables:

def greet(name):  # name is a local variable
    message = f"Hello, {name}"  # message is also local
    print(message)

greet("Alice")
print(name)  # ERROR! name doesn't exist outside the function

<strong>Real-world example - why local scope matters:</strong>

def calculate_discount(price):
    discount_rate = 0.10  # Local
    discount = price * discount_rate  # Local
    return price - discount

def calculate_tax(price):
    tax_rate = 0.08  # Local (doesn't conflict with discount_rate!)
    tax = price * tax_rate  # Local (doesn't conflict with discount!)
    return price + tax

# Both functions use similar variable names but don't interfere!
discounted = calculate_discount(100)
taxed = calculate_tax(100)

<strong>When to use global variables (rarely!):</strong>

<strong>Good use cases:</strong>
• Configuration constants: MAX_USERS = 1000
• Application-wide state: current_user = None
• Flags that need to be checked everywhere: DEBUG = True

<strong>Bad use cases (use parameters instead!):</strong>
• Sharing data between functions - use return values and parameters!
• Avoiding passing parameters - this makes code hard to understand
• Temporary calculations - use local variables

<strong>The global keyword in practice:</strong>

# Game score example
score = 0

def add_points(points):
    global score
    score += points  # Modify global score
    print(f"Score: {score}")

def reset_game():
    global score
    score = 0  # Reset global score
    print("Score reset!")

add_points(10)  # Score: 10
add_points(25)  # Score: 35
reset_game()    # Score reset!

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Forgetting global keyword when modifying:</strong>
count = 0

def increment():
    count = count + 1  # ERROR! UnboundLocalError

<strong>Fix:</strong> Add global count

⚠️ <strong>Overusing global variables:</strong>
Makes code hard to test, debug, and understand. Use parameters and return values instead!

⚠️ <strong>Thinking local variables persist between calls:</strong>
def counter():
    count = 0  # New variable each call!
    count += 1
    return count

print(counter())  # 1
print(counter())  # 1 (not 2!)

⚠️ <strong>Shadowing by accident:</strong>
name = "Alice"  # Global

def greet():
    name = "Bob"  # Creates local, doesn't modify global
    print(name)

greet()      # Bob
print(name)  # Alice (global unchanged!)

<strong>Better alternatives to global variables:</strong>

<strong>Instead of globals, use return values:</strong>

# Bad - using global
total = 0

def add_to_total(n):
    global total
    total += n

add_to_total(10)
add_to_total(20)

# Good - using return
def add_numbers(current, n):
    return current + n

total = 0
total = add_numbers(total, 10)
total = add_numbers(total, 20)

<strong>Or use classes (you'll learn these later):</strong>

class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1

counter = Counter()
counter.increment()

<strong>Nested functions and closures (preview of advanced concept):</strong>

def outer():
    x = "outer variable"

    def inner():
        print(x)  # Can access outer function's variables!

    inner()

outer()  # Prints "outer variable"

Inner functions can see variables from outer functions!

<strong>Pro tips:</strong>

✅ <strong>Minimize global variables:</strong> They make code hard to test and debug
✅ <strong>Use parameters and return values:</strong> Much cleaner than global variables
✅ <strong>Keep scope as narrow as possible:</strong> Create variables where you need them
✅ <strong>Use descriptive names:</strong> Even in local scope, clarity matters
✅ <strong>Constants can be global:</strong> ALL_CAPS names signal they won't change
✅ <strong>Document globals:</strong> If you must use them, comment why they're global

<strong>Constants as globals (good practice):</strong>

# Configuration constants (global is okay here)
MAX_USERS = 100
API_KEY = "abc123"
DEBUG_MODE = True

def check_user_limit(current_users):
    if current_users >= MAX_USERS:
        return False
    return True

Constants (values that never change) are acceptable as globals!

<strong>Testing functions with proper scope:</strong>

Functions with local scope are easier to test:

def calculate_area(length, width):  # Takes parameters, returns value
    return length * width

# Easy to test!
assert calculate_area(5, 3) == 15
assert calculate_area(10, 10) == 100

Functions using global variables are harder to test:

total = 0

def add_to_total(n):  # Modifies global
    global total
    total += n

# Hard to test - need to manage global state!

<strong>Key takeaways:</strong>

🔑 <strong>Local variables</strong> only exist inside their function - isolated and safe
🔑 <strong>Global variables</strong> exist everywhere - use sparingly
🔑 <strong>Reading globals is fine,</strong> modifying them requires global keyword
🔑 <strong>Parameters and return values</strong> are better than global variables
🔑 <strong>Scope prevents conflicts</strong> between functions using similar variable names

Understanding scope is crucial for writing bug-free code. It keeps your functions independent, predictable, and testable. When in doubt, keep variables local and pass data through parameters and return values!`,
      codeExamples: [
        {
          code: 'total = 0  # Global\n\ndef add_score(points):\n    global total\n    total = total + points\n\nadd_score(10)\nadd_score(20)\nprint(total)  # 30',
          explanation: 'Global and local scope',
        },
      ],
      concepts: ['scope', 'local variables', 'global variables', 'global keyword'],
    },
    starterCode: '# Understanding scope\nmessage = "Hello"  # Global\n\ndef show_message():\n    print(message)  # Can read global\n\ndef create_message():\n    local_msg = "Hi"  # Local\n    print(local_msg)\n\nshow_message()\ncreate_message()',
    validationTests: [
      {
        description: 'Should understand scope',
        code: 'x = 5\ndef test():\n    print(x)\ntest()',
        expectedOutput: '5',
      },
    ],
    hints: [
      'Variables inside functions are local',
      'Local variables disappear when function ends',
      'Use global keyword to modify global variables',
    ],
    challenge: {
      prompt: `Understand scope:
1. Create a global variable score = 0
2. Define a function add_points that takes points parameter
3. Use global keyword to modify score
4. Add points to score
5. Call the function twice and print score`,
      starterCode: '# Write your solution here\n',
      solution: 'score = 0\n\ndef add_points(points):\n    global score\n    score = score + points\n\nadd_points(10)\nadd_points(5)\nprint(score)',
      tests: [],
      explanation: 'Use global keyword to modify global variables from inside functions. Without it, you create a local variable instead.',
      hints: [
        'Declare: global score',
        'Then you can modify it: score = score + points',
        'Or use: score += points'
      ],
      xpReward: 150,
    },
    xpReward: 150,
    gameType: 'quiz',
  },

  {
    id: 'lesson-7-5',
    moduleId: 'module-7',
    courseId: 'beginner',
    title: 'Built-in Functions',
    content: {
      explanation: `Python's Ready-Made Tools 🧰

Python comes with a rich library of built-in functions that are ready to use immediately - no imports, no setup, just call them! These functions are the Swiss Army knife of Python programming. You've already been using print(), but there are dozens more that will make your coding life dramatically easier!

<strong>Why built-in functions are amazing:</strong>

• <strong>Save time:</strong> Don't reinvent the wheel - use tested, optimized code
• <strong>Always available:</strong> No need to import anything, they're always ready
• <strong>Fast:</strong> Written in C and highly optimized for performance
• <strong>Reliable:</strong> Used by millions of developers, thoroughly tested
• <strong>Readable:</strong> max(numbers) is clearer than writing a loop to find the maximum

<strong>Essential built-in functions you'll use constantly:</strong>

<strong>len() - Get the length of anything:</strong>

Works with strings, lists, dictionaries, tuples, sets, and more!

print(len("hello"))        # 5 (characters in string)
print(len([1, 2, 3, 4]))   # 4 (items in list)
print(len({"a": 1, "b": 2}))  # 2 (key-value pairs)
print(len((1, 2, 3)))      # 3 (items in tuple)

Real-world use:
password = input("Enter password: ")
if len(password) < 8:
    print("Password must be at least 8 characters!")

<strong>type() - Check what type of data you have:</strong>

Essential for debugging and understanding what you're working with!

print(type(42))         # <class 'int'>
print(type(3.14))       # <class 'float'>
print(type("hello"))    # <class 'str'>
print(type([1, 2, 3]))  # <class 'list'>
print(type(True))       # <class 'bool'>
print(type({"a": 1}))   # <class 'dict'>

Real-world use:
def process_data(data):
    if type(data) != list:
        print("Error: Expected a list!")
        return
    # Process the list...

<strong>input() - Get user input:</strong>

Displays a prompt and waits for user to type something:

name = input("What's your name? ")
print(f"Hello, {name}!")

age = input("How old are you? ")
age = int(age)  # Convert to integer for calculations

Remember: input() always returns a string! Convert it if you need a number.

Real-world use:
choice = input("Do you want to continue? (y/n): ")
if choice.lower() == 'y':
    print("Continuing...")
else:
    print("Exiting...")

<strong>Type conversion functions:</strong>

<strong>int() - Convert to integer:</strong>
num = int("42")        # String to int: 42
num = int(3.9)         # Float to int: 3 (truncates!)
num = int(True)        # Bool to int: 1
num = int(False)       # Bool to int: 0

age = input("Enter age: ")  # Returns string
age = int(age)  # Convert to integer for math

<strong>float() - Convert to decimal:</strong>
num = float("3.14")    # String to float: 3.14
num = float(42)        # Int to float: 42.0
num = float("10")      # String to float: 10.0

price = input("Enter price: ")
price = float(price)  # Now we can do math!

<strong>str() - Convert to string:</strong>
text = str(42)         # Int to string: "42"
text = str(3.14)       # Float to string: "3.14"
text = str(True)       # Bool to string: "True"

score = 95
print("Your score is " + str(score))  # Need str() to concatenate!
# Or use f-strings: print(f"Your score is {score}")

<strong>bool() - Convert to boolean:</strong>
print(bool(1))         # True
print(bool(0))         # False
print(bool("hello"))   # True (non-empty string)
print(bool(""))        # False (empty string)
print(bool([1, 2]))    # True (non-empty list)
print(bool([]))        # False (empty list)

<strong>range() - Generate sequences of numbers:</strong>

range() is perfect for loops when you need a sequence of numbers:

# range(stop) - from 0 to stop-1
for i in range(5):  # 0, 1, 2, 3, 4
    print(i)

# range(start, stop) - from start to stop-1
for i in range(2, 7):  # 2, 3, 4, 5, 6
    print(i)

# range(start, stop, step) - custom increment
for i in range(0, 10, 2):  # 0, 2, 4, 6, 8
    print(i)

# Counting backwards
for i in range(10, 0, -1):  # 10, 9, 8, ..., 1
    print(i)

Convert range to list to see all values:
print(list(range(5)))  # [0, 1, 2, 3, 4]

Real-world use:
# Print multiplication table
for i in range(1, 11):
    print(f"5 × {i} = {5 * i}")

<strong>Math functions for lists:</strong>

<strong>sum() - Add all numbers in a sequence:</strong>
numbers = [1, 2, 3, 4, 5]
print(sum(numbers))  # 15

scores = [85, 92, 78, 95, 88]
average = sum(scores) / len(scores)
print(f"Average: {average}")

<strong>max() - Find the largest value:</strong>
numbers = [1, 5, 3, 9, 2, 7]
print(max(numbers))  # 9

scores = [85, 92, 78, 95, 88]
highest = max(scores)
print(f"Highest score: {highest}")

# Works with strings too (lexicographic order)!
names = ["Alice", "Zoe", "Bob"]
print(max(names))  # "Zoe"

<strong>min() - Find the smallest value:</strong>
numbers = [1, 5, 3, 9, 2, 7]
print(min(numbers))  # 1

prices = [19.99, 29.99, 15.99, 24.99]
cheapest = min(prices)
print(f"Lowest price: \${cheapest}")

<strong>sorted() - Return a sorted copy:</strong>
numbers = [5, 2, 8, 1, 9]
sorted_numbers = sorted(numbers)
print(sorted_numbers)  # [1, 2, 5, 8, 9]
print(numbers)  # [5, 2, 8, 1, 9] (original unchanged!)

# Sort in reverse
print(sorted(numbers, reverse=True))  # [9, 8, 5, 2, 1]

# Sort strings
words = ["banana", "apple", "cherry"]
print(sorted(words))  # ["apple", "banana", "cherry"]

<strong>More useful built-in functions:</strong>

<strong>abs() - Absolute value (remove negative sign):</strong>
print(abs(-10))    # 10
print(abs(10))     # 10
print(abs(-3.14))  # 3.14

Real-world use:
difference = abs(price1 - price2)  # Always positive

<strong>round() - Round decimal numbers:</strong>
print(round(3.7))      # 4
print(round(3.4))      # 3
print(round(3.14159, 2))  # 3.14 (2 decimal places)

price = 19.9873
print(f"\${round(price, 2)}")  # $19.99

<strong>pow() - Raise to a power:</strong>
print(pow(2, 3))   # 8 (2^3)
print(pow(5, 2))   # 25 (5^2)
# Same as: 2 ** 3

<strong>divmod() - Get quotient and remainder:</strong>
quotient, remainder = divmod(17, 5)
print(quotient)   # 3
print(remainder)  # 2

<strong>all() - Check if all items are True:</strong>
values = [True, True, True]
print(all(values))  # True

values = [True, False, True]
print(all(values))  # False

# Check if all numbers are positive
numbers = [1, 5, 3, 8]
print(all(n > 0 for n in numbers))  # True

<strong>any() - Check if any item is True:</strong>
values = [False, False, True]
print(any(values))  # True (at least one is True)

values = [False, False, False]
print(any(values))  # False

<strong>enumerate() - Get index and value in loops:</strong>
fruits = ["apple", "banana", "cherry"]
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

Output:
0: apple
1: banana
2: cherry

# Start counting from 1 instead of 0
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")

<strong>zip() - Combine multiple sequences:</strong>
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

for name, age in zip(names, ages):
    print(f"{name} is {age} years old")

Output:
Alice is 25 years old
Bob is 30 years old
Charlie is 35 years old

<strong>Real-world application - grading system:</strong>

def calculate_grade_statistics(scores):
    """Calculate various statistics for a list of scores."""
    total_students = len(scores)
    average_score = sum(scores) / len(scores)
    highest_score = max(scores)
    lowest_score = min(scores)

    print(f"Total students: {total_students}")
    print(f"Average score: {round(average_score, 2)}")
    print(f"Highest score: {highest_score}")
    print(f"Lowest score: {lowest_score}")

    # Count passing students (>= 60)
    passing = sum(1 for score in scores if score >= 60)
    print(f"Passing students: {passing}")

scores = [85, 92, 78, 95, 88, 56, 73, 91]
calculate_grade_statistics(scores)

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Forgetting input() returns strings:</strong>
age = input("Age: ")
next_year = age + 1  # ERROR! Can't add string + int

<strong>Fix:</strong> age = int(input("Age: "))

⚠️ <strong>Using len() on integers:</strong>
num = 42
print(len(num))  # ERROR! int has no length

<strong>Fix:</strong> Convert to string first: len(str(num))

⚠️ <strong>Confusing sum() with addition:</strong>
print(sum(1, 2, 3))  # ERROR! sum() takes an iterable

<strong>Fix:</strong> print(sum([1, 2, 3]))

⚠️ <strong>Assuming max()/min() work on empty lists:</strong>
print(max([]))  # ERROR! ValueError: max() arg is an empty sequence

<strong>Fix:</strong> Check if list is not empty first!

<strong>Pro tips:</strong>

✅ <strong>Chain built-in functions:</strong> sorted(set(numbers)) removes duplicates and sorts
✅ <strong>Use sum() with len() for averages:</strong> sum(scores) / len(scores)
✅ <strong>Remember input() returns strings:</strong> Always convert for math!
✅ <strong>Read the docs:</strong> Use help(function_name) to learn about any function
✅ <strong>Combine with comprehensions:</strong> sum(x**2 for x in range(10))

<strong>Getting help on built-in functions:</strong>

help(len)     # Shows documentation for len()
help(max)     # Shows documentation for max()
dir()         # Lists all available built-in functions

<strong>Why built-in functions are better than writing your own:</strong>

<strong>Manual maximum finder (error-prone, slow):</strong>
def find_max(numbers):
    maximum = numbers[0]
    for num in numbers:
        if num > maximum:
            maximum = num
    return maximum

<strong>Built-in max() (tested, fast, clear):</strong>
maximum = max(numbers)

The built-in version is shorter, faster, and less likely to have bugs!

<strong>Key takeaways:</strong>

🔑 Built-in functions are always available - use them!
🔑 They're optimized, tested, and reliable
🔑 Don't reinvent the wheel - max() beats manual loops
🔑 Remember type conversions: int(), float(), str()
🔑 input() always returns strings - convert as needed
🔑 Math functions (sum, max, min) work on any sequence

Built-in functions are like having expert programmers write code for you. They handle edge cases, are optimized for performance, and make your code cleaner and more readable. Use them liberally!`,
      codeExamples: [
        {
          code: 'numbers = [10, 25, 30, 15]\nprint(f"Count: {len(numbers)}")\nprint(f"Total: {sum(numbers)}")\nprint(f"Largest: {max(numbers)}")\nprint(f"Smallest: {min(numbers)}")',
          explanation: 'Using built-in functions',
        },
      ],
      concepts: ['built-in functions', 'len', 'type', 'sum', 'max', 'min'],
    },
    starterCode: '# Using built-in functions\nscores = [85, 92, 78, 95, 88]\n\n# Get statistics\nprint(f"Number of scores: {len(scores)}")\nprint(f"Total: {sum(scores)}")\nprint(f"Highest: {max(scores)}")\nprint(f"Lowest: {min(scores)}")\nprint(f"Average: {sum(scores) / len(scores)}")',
    validationTests: [
      {
        description: 'Should use built-in functions',
        code: 'nums = [1, 2, 3]\nprint(len(nums))',
        expectedOutput: '3',
      },
    ],
    hints: [
      'len() works on strings, lists, dictionaries, etc.',
      'type() tells you what kind of data you have',
      'sum(), max(), min() work on lists of numbers',
    ],
    challenge: {
      prompt: `Use built-in functions to analyze data:
1. Create a list of test scores: [85, 92, 78, 95, 88]
2. Print the total number of scores (use len)
3. Print the sum of all scores (use sum)
4. Print the highest score (use max)
5. Calculate and print the average`,
      starterCode: '# Write your solution here\n',
      solution: 'scores = [85, 92, 78, 95, 88]\nprint(len(scores))\nprint(sum(scores))\nprint(max(scores))\naverage = sum(scores) / len(scores)\nprint(average)',
      tests: [],
      explanation: 'Built-in functions save time! len() counts items, sum() adds them, max() finds the largest. Combine them for calculations!',
      hints: [
        'Count: len(scores)',
        'Total: sum(scores)',
        'Average: sum(scores) / len(scores)'
      ],
      xpReward: 150,
    },
    xpReward: 150,
    gameType: 'quiz',
  },
];
