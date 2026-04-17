// Module 3: Collections
// 5 lessons covering lists, dictionaries, tuples, and sets

import type { Lesson } from '@types';

export const module3Lessons: Lesson[] = [
  {
    id: 'lesson-6-1',
    moduleId: 'module-6',
    courseId: 'beginner',
    title: 'Lists Basics',
    content: {
      explanation: `Working with Lists 📝

Lists are one of Python's most powerful and frequently used data structures. Think of them as ordered containers that hold multiple items - like a shopping list, a playlist, or a to-do list. Unlike variables that hold single values, lists let you manage entire collections of data efficiently!

<strong>Why lists are essential:</strong>
• Store related items together: all your user's scores, a collection of names, a series of temperatures
• Keep data organized and in order: the first item stays first, the second stays second
• Make your code more efficient: instead of score1, score2, score3... you just use scores[0], scores[1], scores[2]
• Enable powerful operations: sort items, find the largest value, count occurrences, and much more!

<strong>Creating lists is beautifully simple:</strong>
Just use square brackets [ ] with items separated by commas:

fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True, 3.14]
empty = []  # Start with an empty list

Lists are incredibly flexible - they can hold any type of data, and you can even mix different types in the same list! You can have strings, numbers, booleans, or even other lists inside a list.

<strong>Understanding list indexing (position numbers):</strong>

Python starts counting from 0, not 1. This confuses beginners at first, but you'll get used to it quickly!

fruits = ["apple", "banana", "cherry"]
#         0         1          2

print(fruits[0])  # apple (first item)
print(fruits[1])  # banana (second item)
print(fruits[2])  # cherry (third item)

Think of the index as the number of steps from the start. The first item is 0 steps away, the second is 1 step away, and so on.

<strong>Essential list operations you'll use constantly:</strong>

<strong>len(list)</strong> - Get the number of items:
scores = [85, 92, 78, 95]
print(len(scores))  # 4

<strong>list.append(item)</strong> - Add an item to the end:
fruits = ["apple", "banana"]
fruits.append("cherry")
print(fruits)  # ["apple", "banana", "cherry"]

<strong>list.remove(item)</strong> - Remove the first occurrence of an item:
fruits = ["apple", "banana", "cherry"]
fruits.remove("banana")
print(fruits)  # ["apple", "cherry"]

<strong>item in list</strong> - Check if an item exists (returns True or False):
fruits = ["apple", "banana", "cherry"]
print("apple" in fruits)  # True
print("grape" in fruits)  # False

<strong>list.insert(index, item)</strong> - Add item at specific position:
fruits = ["apple", "cherry"]
fruits.insert(1, "banana")  # Insert at index 1
print(fruits)  # ["apple", "banana", "cherry"]

<strong>list.pop()</strong> - Remove and return last item (or item at index):
fruits = ["apple", "banana", "cherry"]
last = fruits.pop()  # Removes and returns "cherry"
print(last)  # cherry
print(fruits)  # ["apple", "banana"]

<strong>Common beginner mistakes to avoid:</strong>

⚠️ <strong>Forgetting indexes start at 0:</strong> Thinking the first item is [1] instead of [0]
⚠️ <strong>Index out of range:</strong> Trying to access fruits[5] when the list only has 3 items causes an error
⚠️ <strong>Using remove() with non-existent items:</strong> If the item isn't in the list, remove() crashes your program
⚠️ <strong>Modifying lists while looping over them:</strong> This can cause unexpected behavior - be careful!

<strong>Real-world use cases:</strong>

• <strong>Student grades:</strong> scores = [85, 92, 78, 95] - easily calculate averages, find highest score
• <strong>Shopping cart:</strong> items = ["milk", "eggs", "bread"] - add/remove items dynamically
• <strong>Game inventory:</strong> inventory = ["sword", "shield", "potion"] - manage player items
• <strong>Temperature readings:</strong> temps = [72, 75, 68, 71] - track and analyze data over time

<strong>Pro tips:</strong>

✅ Use descriptive names: students instead of list1
✅ Keep related data together: all scores in one list, all names in another
✅ Check list length before accessing: if len(fruits) > 0: print(fruits[0])
✅ Use in to avoid errors: if "apple" in fruits: fruits.remove("apple")

Lists are mutable, meaning they can be changed after creation. This makes them incredibly flexible but also means you need to be careful when modifying them. As you progress, you'll discover even more powerful list operations like slicing, sorting, and comprehensions!`,
      codeExamples: [
        {
          code: 'colors = ["red", "blue", "green"]\ncolors.append("yellow")\nprint(colors)\nprint(len(colors))',
          explanation: 'Creating and modifying lists',
        },
      ],
      concepts: ['lists', 'indexing', 'list methods', 'mutable collections'],
    },
    starterCode: '# Create a list of your favorite foods\nfoods = ["pizza", "tacos", "ice cream"]\n\n# Print the first item\nprint(foods[0])\n\n# Add a new food\nfoods.append("burger")\nprint(foods)',
    validationTests: [
      {
        description: 'Should create and use lists',
        code: 'items = [1, 2, 3]\nprint(items[0])',
        expectedOutput: '1',
      },
    ],
    hints: [
      'Lists use square brackets []',
      'Indexing starts at 0',
      'Use .append() to add items',
    ],
    challenge: {
      prompt: `Create a shopping list program:
1. Create a list with 3 items: "milk", "eggs", "bread"
2. Print the first item (index 0)
3. Add "butter" to the list using .append()
4. Print the length of the list
5. Print the entire list`,
      starterCode: '# Write your solution here\n',
      solution: 'shopping = ["milk", "eggs", "bread"]\nprint(shopping[0])\nshopping.append("butter")\nprint(len(shopping))\nprint(shopping)',
      tests: [],
      explanation: 'Lists use []. Access items with [0] for first, [1] for second, etc. Use .append() to add items to the end.',
      hints: [
        'Create list with square brackets: ["item1", "item2"]',
        'Access first item with [0]',
        'Use shopping.append("butter") to add'
      ],
      xpReward: 500,
    },
    xpReward: 100,
    gameType: 'quiz',
  },

  {
    id: 'lesson-6-2',
    moduleId: 'module-6',
    courseId: 'beginner',
    title: 'List Indexing and Slicing',
    content: {
      explanation: `Advanced List Access 🎯

Now that you know basic list indexing, let's unlock some powerful techniques that will make you look like a Python pro! These features make Python's lists incredibly flexible and expressive.

<strong>Negative indexing - counting from the end:</strong>

Sometimes you want the last item, or second-to-last, without knowing the exact length of the list. Python's negative indexing makes this super easy!

letters = ["a", "b", "c", "d"]
#          0    1    2    3     (positive indices)
#         -4   -3   -2   -1     (negative indices)

print(letters[-1])   # "d" (last item)
print(letters[-2])   # "c" (second to last)
print(letters[-3])   # "b" (third from end)

Think of negative indices as counting backwards: -1 is the last item, -2 is one before that, and so on. This is incredibly useful when you don't know the list's length or want code that works with any-sized list!

<strong>Real-world example:</strong>
scores = [85, 92, 78, 95, 88]
latest_score = scores[-1]  # Get the most recent score
previous_score = scores[-2]  # Get the score before that

<strong>List slicing - extracting portions of lists:</strong>

Slicing is one of Python's most elegant features. It lets you grab a "slice" of a list - a continuous portion of items - in one clean operation.

<strong>Basic slicing syntax: [start:stop]</strong>

numbers = [0, 1, 2, 3, 4, 5]
print(numbers[1:4])   # [1, 2, 3] - items from index 1 up to (but not including) 4
print(numbers[:3])    # [0, 1, 2] - from start to index 3
print(numbers[3:])    # [3, 4, 5] - from index 3 to end
print(numbers[:])     # [0, 1, 2, 3, 4, 5] - entire list (creates a copy!)

<strong>Key insight: The stop index is exclusive!</strong>
numbers[1:4] gives you indices 1, 2, and 3 - it stops BEFORE index 4. This trips up beginners constantly!

<strong>Advanced slicing with step: [start:stop:step]</strong>

The third parameter controls how many items to skip:

numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(numbers[::2])    # [0, 2, 4, 6, 8] - every 2nd item
print(numbers[1::2])   # [1, 3, 5, 7, 9] - every 2nd item starting from index 1
print(numbers[::3])    # [0, 3, 6, 9] - every 3rd item
print(numbers[::-1])   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] - reverse the list!

<strong>Understanding the slice notation: [start:stop:step]</strong>
• <strong>start:</strong> Where to begin (inclusive) - defaults to 0 if omitted
• <strong>stop:</strong> Where to end (exclusive) - defaults to end of list if omitted
• <strong>step:</strong> How many to skip (default is 1) - negative values go backwards!

<strong>Practical slicing examples:</strong>

# Get first 3 items
top_three = scores[:3]

# Get last 2 items
recent_two = scores[-2:]

# Get all except first and last (remove outliers)
middle_values = scores[1:-1]

# Reverse a list
reversed_list = numbers[::-1]

# Get every other item
even_indices = items[::2]
odd_indices = items[1::2]

<strong>Modifying lists by index:</strong>

Unlike strings (which are immutable), lists can be changed after creation. You can replace individual items or entire slices!

numbers = [0, 1, 2, 3, 4]
numbers[0] = 10          # Change first item
print(numbers)           # [10, 1, 2, 3, 4]

numbers[1:3] = [20, 30]  # Replace indices 1 and 2
print(numbers)           # [10, 20, 30, 3, 4]

fruits = ["apple", "banana", "cherry"]
fruits[0] = "apricot"    # Replace first fruit
print(fruits)            # ["apricot", "banana", "cherry"]

<strong>Combining negative indexing and slicing:</strong>

data = [10, 20, 30, 40, 50, 60, 70, 80, 90]
print(data[-5:-2])   # [50, 60, 70] - from 5th-to-last to 2nd-to-last
print(data[-3:])     # [70, 80, 90] - last 3 items
print(data[:-3])     # [10, 20, 30, 40, 50, 60] - all except last 3

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Forgetting stop is exclusive:</strong> numbers[1:4] gets indices 1, 2, 3 - not 1, 2, 3, 4!
⚠️ <strong>Confusing positive and negative indices:</strong> numbers[-1:] gets the last item onwards, not backwards
⚠️ <strong>Index errors with slicing:</strong> Good news - slicing doesn't crash on out-of-range indices! numbers[10:20] on a 5-item list just returns []
⚠️ <strong>Expecting slices to modify the original list:</strong> result = numbers[1:3] creates a NEW list

<strong>Why this matters:</strong>

Slicing is incredibly powerful for:
• <strong>Data processing:</strong> Get the first N items, last N items, or middle portion
• <strong>Pagination:</strong> Display items 10-20, then 20-30, etc.
• <strong>String reversal:</strong> Since strings support slicing too! word[::-1]
• <strong>Copying lists:</strong> new_list = old_list[:] creates a separate copy
• <strong>Removing outliers:</strong> middle = data[1:-1] excludes first and last

<strong>Pro tips:</strong>

✅ Use [:] to create a copy of a list that won't affect the original
✅ Remember [::-1] as the "reverse trick" - works on strings and lists!
✅ Negative indices are your friend when you need items from the end
✅ Slicing never raises IndexError - it just returns fewer items if range is too large

Master slicing and negative indexing, and you'll write cleaner, more Pythonic code. These features are what make Python feel elegant and powerful!`,
      codeExamples: [
        {
          code: 'nums = [10, 20, 30, 40, 50]\nprint(nums[1:4])  # [20, 30, 40]\nprint(nums[-2:])  # [40, 50]\nnums[0] = 100\nprint(nums)  # [100, 20, 30, 40, 50]',
          explanation: 'Slicing and modifying lists',
        },
      ],
      concepts: ['negative indexing', 'list slicing', 'list modification'],
    },
    starterCode: '# Practice slicing\nfruits = ["apple", "banana", "cherry", "date", "elderberry"]\n\n# Get first 3 fruits\nprint(fruits[:3])\n\n# Get last 2 fruits\nprint(fruits[-2:])\n\n# Change first fruit\nfruits[0] = "apricot"\nprint(fruits)',
    validationTests: [
      {
        description: 'Should use slicing',
        code: 'nums = [1, 2, 3, 4, 5]\nprint(nums[1:3])',
        expectedOutput: '[2, 3]',
      },
    ],
    hints: [
      'Negative indices count from the end',
      'Slicing: [start:stop:step]',
      'stop index is exclusive',
    ],
    challenge: {
      prompt: `Work with a list of numbers [10, 20, 30, 40, 50]:
1. Print the last item using negative indexing
2. Print the first 3 items using slicing
3. Print every other item (every 2nd item)
4. Print the list in reverse using slicing`,
      starterCode: '# Write your solution here\n',
      solution: 'numbers = [10, 20, 30, 40, 50]\nprint(numbers[-1])\nprint(numbers[:3])\nprint(numbers[::2])\nprint(numbers[::-1])',
      tests: [],
      explanation: 'Use [-1] for last item, [:3] for first 3, [::2] for every 2nd, and [::-1] to reverse!',
      hints: [
        'Last item: numbers[-1]',
        'First 3: numbers[:3]',
        'Every 2nd: numbers[::2]',
        'Reverse: numbers[::-1]'
      ],
      xpReward: 500,
    },
    xpReward: 100,
    gameType: 'quiz',
  },

  {
    id: 'lesson-6-3',
    moduleId: 'module-6',
    courseId: 'beginner',
    title: 'Dictionaries',
    content: {
      explanation: `Key-Value Pairs 🗂️

Dictionaries are one of Python's most powerful and versatile data structures. While lists organize data by position (first, second, third...), dictionaries organize data by meaningful names called keys. Think of them as labeled storage containers where each piece of data has a descriptive label!

<strong>The real-world analogy:</strong>

A dictionary is exactly like a real dictionary where you look up a word (the key) to find its definition (the value). Or think of it like a contact list: you look up a person's name to find their phone number, email, and address.

<strong>Why dictionaries are essential:</strong>

• <strong>Meaningful access:</strong> person["name"] is clearer than person[0]
• <strong>Flexible structure:</strong> Add, modify, or remove data without affecting other items
• <strong>Fast lookups:</strong> Finding a value by key is super fast, even with thousands of items
• <strong>Perfect for structured data:</strong> User profiles, configuration settings, JSON data, database records
• <strong>No duplicate keys:</strong> Each key is unique, preventing accidental data duplication

<strong>Creating dictionaries with curly braces { }:</strong>

person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

# Access values using their keys
print(person["name"])  # Alice
print(person["age"])   # 25
print(person["city"])  # New York

<strong>Keys and values can be different types:</strong>

# Keys are usually strings, but can be numbers or tuples
mixed_dict = {
    "username": "alice123",
    "score": 1500,
    "is_active": True,
    "tags": ["python", "coding"],
    42: "answer"
}

Values can be anything: strings, numbers, booleans, lists, even other dictionaries!

<strong>Adding and modifying dictionary data:</strong>

Dictionaries are mutable - you can change them after creation!

person = {"name": "Alice", "age": 25}

# Add a new key-value pair
person["job"] = "Engineer"
print(person)  # {"name": "Alice", "age": 25, "job": "Engineer"}

# Update an existing value
person["age"] = 26
print(person)  # {"name": "Alice", "age": 26, "job": "Engineer"}

# Multiple updates at once
person.update({"city": "Boston", "salary": 80000})

If a key already exists, assigning to it updates the value. If it doesn't exist, it creates a new key-value pair!

<strong>Removing items from dictionaries:</strong>

# Delete a specific key
del person["city"]

# Remove and return a value
job = person.pop("job")  # Returns "Engineer" and removes it

# Remove all items
person.clear()

<strong>Essential dictionary methods:</strong>

<strong>.keys()</strong> - Get all keys (useful for checking what data exists):
person = {"name": "Alice", "age": 25, "city": "New York"}
print(person.keys())  # dict_keys(['name', 'age', 'city'])
for key in person.keys():
    print(key)

<strong>.values()</strong> - Get all values (useful for calculations or analysis):
print(person.values())  # dict_values(['Alice', 25, 'New York'])
ages = [25, 30, 35]
average = sum(ages) / len(ages)

<strong>.items()</strong> - Get all key-value pairs together:
for key, value in person.items():
    print(f"{key}: {value}")
# Output:
# name: Alice
# age: 25
# city: New York

<strong>.get(key, default)</strong> - Safely get a value (doesn't crash if key doesn't exist!):
age = person.get("age")           # Returns 25
job = person.get("job")           # Returns None (key doesn't exist)
job = person.get("job", "Unknown") # Returns "Unknown" if key not found

# Why .get() is better than []:
print(person["job"])     # ERROR! KeyError if key doesn't exist
print(person.get("job")) # Returns None safely

<strong>key in dictionary</strong> - Check if a key exists before accessing:
if "age" in person:
    print(person["age"])
else:
    print("Age not available")

<strong>Real-world use cases:</strong>

<strong>User profile:</strong>
user = {
    "username": "alice123",
    "email": "alice@example.com",
    "age": 25,
    "premium": True,
    "last_login": "2024-12-25"
}

<strong>Configuration settings:</strong>
config = {
    "theme": "dark",
    "language": "en",
    "notifications": True,
    "volume": 75
}

<strong>Product inventory:</strong>
product = {
    "id": 12345,
    "name": "Laptop",
    "price": 999.99,
    "in_stock": True,
    "quantity": 15
}

<strong>Counting occurrences (super common pattern!):</strong>
votes = ["Alice", "Bob", "Alice", "Charlie", "Alice", "Bob"]
vote_count = {}
for name in votes:
    vote_count[name] = vote_count.get(name, 0) + 1
print(vote_count)  # {"Alice": 3, "Bob": 2, "Charlie": 1}

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Using [key] on non-existent keys:</strong> Causes KeyError - use .get() instead!
⚠️ <strong>Forgetting quotes around string keys:</strong> person[name] looks for variable, person["name"] uses the string "name"
⚠️ <strong>Trying to use lists as keys:</strong> Only immutable types (strings, numbers, tuples) can be keys
⚠️ <strong>Expecting dictionaries to maintain insertion order:</strong> They do in Python 3.7+, but don't rely on it in other versions
⚠️ <strong>Confusing dictionaries with sets:</strong> Both use { }, but dictionaries have key:value pairs

<strong>Dictionary comprehensions (bonus advanced technique):</strong>

Create dictionaries quickly from sequences:

# Square numbers
squares = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

<strong>Pro tips:</strong>

✅ Use .get() with defaults to avoid KeyError crashes
✅ Check key existence with in before accessing: if "age" in person:
✅ Use meaningful key names: "user_email" is better than "ue"
✅ Keep keys consistent: all strings or all numbers, not mixed
✅ Use dictionaries for structured data, lists for sequences

<strong>Why dictionaries matter:</strong>

Dictionaries are fundamental to modern programming. JSON (the universal data format for web APIs) is essentially dictionaries and lists! When you interact with web services, databases, or configuration files, you're almost always working with dictionary-like structures.

They're also incredibly fast. Python uses hash tables internally, so looking up a value by key takes the same time whether your dictionary has 10 items or 10 million items!

Master dictionaries, and you'll be able to organize and access data efficiently in any Python program you write!`,
      codeExamples: [
        {
          code: 'student = {"name": "Bob", "grade": 90}\nprint(student["name"])\nstudent["grade"] = 95\nstudent["school"] = "MIT"\nprint(student)',
          explanation: 'Creating and modifying dictionaries',
        },
      ],
      concepts: ['dictionaries', 'key-value pairs', 'dict methods'],
    },
    starterCode: '# Create a dictionary for a book\nbook = {\n    "title": "Python Basics",\n    "author": "John Doe",\n    "pages": 200\n}\n\n# Print the title\nprint(book["title"])\n\n# Add a new key\nbook["year"] = 2024\nprint(book)',
    validationTests: [
      {
        description: 'Should create and use dictionaries',
        code: 'car = {"brand": "Toyota", "year": 2020}\nprint(car["brand"])',
        expectedOutput: 'Toyota',
      },
    ],
    hints: [
      'Dictionaries use curly braces {}',
      'Access values using keys: dict[key]',
      'Keys must be unique',
    ],
    challenge: {
      prompt: `Create a student record:
1. Create a dictionary with: name="Alice", age=20, grade="A"
2. Print the student's name
3. Add a new key "school" with value "MIT"
4. Change the grade to "A+"
5. Print the entire dictionary`,
      starterCode: '# Write your solution here\n',
      solution: 'student = {"name": "Alice", "age": 20, "grade": "A"}\nprint(student["name"])\nstudent["school"] = "MIT"\nstudent["grade"] = "A+"\nprint(student)',
      tests: [],
      explanation: 'Dictionaries use {}. Access with ["key"]. Add or modify entries with dict["key"] = value.',
      hints: [
        'Create dict: {"key": value, "key2": value2}',
        'Access: student["name"]',
        'Add/modify: student["key"] = new_value'
      ],
      xpReward: 500,
    },
    xpReward: 125,
    gameType: 'quiz',
  },

  {
    id: 'lesson-6-4',
    moduleId: 'module-6',
    courseId: 'beginner',
    title: 'Tuples',
    content: {
      explanation: `Immutable Lists 🔒

Tuples are Python's "locked" version of lists. Once you create a tuple, it stays exactly the same forever - no adding, removing, or changing items. This immutability might seem limiting at first, but it's actually incredibly powerful and useful!

<strong>What makes tuples different from lists:</strong>

Lists are mutable (changeable):
shopping = ["milk", "eggs"]
shopping.append("bread")  # Works fine!
shopping[0] = "cheese"    # Can modify items

Tuples are immutable (unchangeable):
coordinates = (10, 20)
coordinates.append(30)    # ERROR! Tuples have no append method
coordinates[0] = 5        # ERROR! Can't modify tuple items

<strong>Creating tuples with parentheses ( ):</strong>

coordinates = (10, 20)
rgb_color = (255, 0, 128)
date = (2024, 12, 25)
person_info = ("Alice", 25, "Engineer")

# Empty tuple
empty = ()

# Single-item tuple - MUST include a comma!
single = (42,)      # This is a tuple
not_tuple = (42)    # This is just the number 42 in parentheses!

<strong>Why the comma is needed for single-item tuples:</strong>
Python uses parentheses for many things (grouping, function calls, etc.). The comma tells Python "this is definitely a tuple!"

x = (5)      # This is just the integer 5
x = (5,)     # This is a tuple containing 5
print(type(x))  # <class 'tuple'>

<strong>Accessing tuple items (just like lists):</strong>

point = (3, 7, 2)
print(point[0])   # 3
print(point[1])   # 7
print(point[-1])  # 2 (last item)
print(point[1:])  # (7, 2) (slicing works!)

print(len(point)) # 3

All the reading operations from lists work on tuples: indexing, slicing, len(), in, count(), index()

<strong>What you CAN'T do with tuples:</strong>

point = (3, 7)
point[0] = 5          # ERROR! Can't change items
point.append(2)       # ERROR! No append method
point.remove(3)       # ERROR! No remove method
del point[0]          # ERROR! Can't delete items

<strong>Tuple unpacking - one of Python's best features:</strong>

Unpacking lets you assign tuple items to multiple variables in one clean line:

# Instead of this:
point = (10, 20)
x = point[0]
y = point[1]

# Do this:
x, y = (10, 20)
print(x)  # 10
print(y)  # 20

<strong>Unpacking works with any tuple:</strong>

# RGB color
r, g, b = (255, 128, 0)
print(f"Red: {r}, Green: {g}, Blue: {b}")

# Date
year, month, day = (2024, 12, 25)
print(f"{year}-{month}-{day}")

# Person data
name, age, job = ("Alice", 25, "Engineer")

# Can even ignore values you don't need using _
name, _, job = ("Alice", 25, "Engineer")  # Ignore age

<strong>Multiple return values from functions:</strong>

Tuples enable functions to return multiple values elegantly:

def get_user_info():
    return ("Alice", 25, "alice@email.com")

name, age, email = get_user_info()

<strong>Why use tuples instead of lists?</strong>

<strong>1. Performance - tuples are faster:</strong>
Tuples use less memory and are quicker to create and iterate over. If your data won't change, use a tuple!

<strong>2. Data protection - prevent accidental changes:</strong>
coordinates = (40.7128, -74.0060)  # NYC latitude/longitude
# These values should never change - tuple prevents mistakes!

<strong>3. Dictionary keys - tuples can be keys, lists can't:</strong>
locations = {
    (40.7128, -74.0060): "New York",
    (51.5074, -0.1278): "London"
}
print(locations[(40.7128, -74.0060)])  # "New York"

# This would ERROR:
# locations[[40.7128, -74.0060]] = "New York"  # Can't use list as key!

<strong>4. Data integrity - signal that data shouldn't change:</strong>
When you use a tuple, you're telling other programmers "this data is fixed and intentional."

<strong>Real-world use cases:</strong>

<strong>Geographic coordinates (latitude, longitude):</strong>
nyc = (40.7128, -74.0060)
la = (34.0522, -118.2437)

<strong>RGB/RGBA colors:</strong>
red = (255, 0, 0)
transparent_blue = (0, 0, 255, 128)

<strong>Database records:</strong>
user = (1, "alice123", "alice@example.com", "2024-01-15")

<strong>Dates and times:</strong>
birthday = (1995, 7, 15)  # Year, month, day
timestamp = (14, 30, 0)   # Hour, minute, second

<strong>Return multiple values:</strong>
def get_min_max(numbers):
    return (min(numbers), max(numbers))

minimum, maximum = get_min_max([3, 7, 2, 9, 1])

<strong>Configuration data that shouldn't change:</strong>
SCREEN_SIZE = (1920, 1080)
VERSION = (1, 2, 3)  # Major, minor, patch

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Forgetting the comma in single-item tuples:</strong> (42) is not a tuple, (42,) is!
⚠️ <strong>Trying to modify tuples:</strong> They're immutable - create a new tuple instead
⚠️ <strong>Using tuples when you need to change data:</strong> If you need to add/remove items, use a list!
⚠️ <strong>Unpacking mismatch:</strong> a, b = (1, 2, 3) causes an error - number of variables must match tuple length

<strong>Converting between lists and tuples:</strong>

# List to tuple
my_list = [1, 2, 3]
my_tuple = tuple(my_list)

# Tuple to list (if you need to modify it)
my_tuple = (1, 2, 3)
my_list = list(my_tuple)
my_list.append(4)  # Now we can modify it

<strong>Tuple operations that DO work:</strong>

colors = ("red", "blue", "green")
print("red" in colors)       # True (membership testing)
print(colors.count("red"))   # 1 (count occurrences)
print(colors.index("blue"))  # 1 (find index)
print(len(colors))           # 3 (get length)

combined = colors + ("yellow", "purple")  # Concatenation creates new tuple
repeated = colors * 2  # Repetition creates new tuple

<strong>Pro tips:</strong>

✅ Use tuples for fixed data that represents a single entity: coordinates, RGB colors, dates
✅ Use lists for collections that will grow or shrink: shopping lists, user inputs, scores
✅ Tuples are perfect for function return values when returning multiple related pieces of data
✅ Use tuple unpacking to make your code cleaner and more readable
✅ Tuples can be nested: location = ("NYC", (40.7128, -74.0060))
✅ Choose tuples over lists when data integrity matters more than flexibility

<strong>When to use tuples vs lists:</strong>

<strong>Use tuples when:</strong>
• Data represents a single structure (coordinates, date, record)
• Values shouldn't change after creation
• You need to use the data as a dictionary key
• Performance is critical for large datasets

<strong>Use lists when:</strong>
• Collection size will change (items added/removed)
• Items need to be sorted or modified
• You're building a collection incrementally
• Order matters but content is dynamic

Tuples might seem simple, but they're a fundamental part of writing clean, efficient, and safe Python code. They protect your data, improve performance, and signal your intentions to other developers!`,
      codeExamples: [
        {
          code: 'location = (40.7128, -74.0060)  # NYC coordinates\nlat, lon = location\nprint(f"Latitude: {lat}, Longitude: {lon}")',
          explanation: 'Using tuples and unpacking',
        },
      ],
      concepts: ['tuples', 'immutability', 'tuple unpacking'],
    },
    starterCode: '# Create a tuple for a date\ndate = (2024, 12, 25)\n\n# Access elements\nprint(date[0])  # Year\nprint(date[1])  # Month\n\n# Unpack the tuple\nyear, month, day = date\nprint(f"{year}-{month}-{day}")',
    validationTests: [
      {
        description: 'Should create and use tuples',
        code: 'nums = (1, 2, 3)\nprint(nums[0])',
        expectedOutput: '1',
      },
    ],
    hints: [
      'Tuples use parentheses ()',
      'Tuples cannot be changed after creation',
      'Use tuples when data shouldn\'t change',
    ],
    challenge: {
      prompt: `Work with coordinates:
1. Create a tuple called point with values (10, 20)
2. Unpack the tuple into variables x and y
3. Print x and y separately
4. Create a new tuple with (x * 2, y * 2)
5. Print the new tuple`,
      starterCode: '# Write your solution here\n',
      solution: 'point = (10, 20)\nx, y = point\nprint(x)\nprint(y)\nnew_point = (x * 2, y * 2)\nprint(new_point)',
      tests: [],
      explanation: 'Tuples use (). Unpack with: x, y = tuple. Create new tuples since they can\'t be modified.',
      hints: [
        'Create tuple: point = (10, 20)',
        'Unpack: x, y = point',
        'Create new tuple with calculated values'
      ],
      xpReward: 500,
    },
    xpReward: 100,
    gameType: 'quiz',
  },

  {
    id: 'lesson-6-5',
    moduleId: 'module-6',
    courseId: 'beginner',
    title: 'Sets',
    content: {
      explanation: `Unique Collections 🎲

Sets are Python's way of storing collections where each item appears only once - no duplicates allowed! Think of them like a bag of unique items where adding the same thing twice doesn't create a second copy. Sets are also unordered, meaning items don't have a specific position like they do in lists.

<strong>What makes sets special:</strong>

• <strong>Automatic duplicate removal:</strong> Add "apple" 10 times, it only appears once
• <strong>Super fast membership testing:</strong> Checking if an item exists is lightning-fast, even with thousands of items
• <strong>Mathematical set operations:</strong> Union, intersection, difference - just like in math class!
• <strong>Unordered:</strong> Items aren't stored in any particular order (you can't rely on the order you see)

<strong>Creating sets with curly braces { } (without key:value pairs):</strong>

fruits = {"apple", "banana", "cherry"}
numbers = {1, 2, 3, 4, 5}
mixed = {1, "hello", 3.14, True}

# Empty set - MUST use set(), not {}
empty = set()      # Correct way to create empty set
not_empty = {}     # This creates an empty DICTIONARY!

<strong>The magic of automatic duplicate removal:</strong>

numbers = {1, 2, 2, 3, 3, 3, 4, 4, 4, 4}
print(numbers)  # {1, 2, 3, 4} - duplicates automatically removed!

votes = {"Alice", "Bob", "Alice", "Charlie", "Bob", "Alice"}
unique_voters = set(votes)
print(unique_voters)  # {"Alice", "Bob", "Charlie"}

This is one of the most common uses of sets - cleaning duplicate data!

<strong>Why sets don't support indexing:</strong>

Since sets are unordered, there's no concept of "first" or "last" item:

fruits = {"apple", "banana", "cherry"}
print(fruits[0])  # ERROR! 'set' object is not subscriptable

The order you see when you print a set might change between runs or Python versions. Never rely on set order!

<strong>Adding items to sets:</strong>

<strong>.add(item)</strong> - Add a single item:
fruits = {"apple", "banana"}
fruits.add("cherry")
print(fruits)  # {"apple", "banana", "cherry"}

fruits.add("apple")  # Adding existing item does nothing
print(fruits)  # Still {"apple", "banana", "cherry"}

<strong>.update(iterable)</strong> - Add multiple items at once:
fruits.update(["mango", "grape"])
fruits.update({"kiwi", "orange"})
print(fruits)  # All fruits added (duplicates ignored)

<strong>Removing items from sets:</strong>

<strong>.remove(item)</strong> - Remove item (ERROR if not found):
fruits = {"apple", "banana", "cherry"}
fruits.remove("banana")
print(fruits)  # {"apple", "cherry"}

fruits.remove("grape")  # ERROR! KeyError because grape doesn't exist

<strong>.discard(item)</strong> - Remove item safely (no error if not found):
fruits.discard("apple")   # Removes apple
fruits.discard("grape")   # Does nothing, no error!

<strong>.pop()</strong> - Remove and return a random item:
item = fruits.pop()  # Removes and returns some item
print(item)

<strong>.clear()</strong> - Remove all items:
fruits.clear()  # Now fruits is an empty set

<strong>Membership testing - super fast:</strong>

fruits = {"apple", "banana", "cherry", "mango", "grape"}

print("apple" in fruits)      # True
print("watermelon" in fruits) # False

# This is MUCH faster than checking in a list when you have lots of items!
# For 1 million items, set lookup is instant, list lookup takes seconds!

<strong>Real-world use case - removing duplicates from a list:</strong>

# Student IDs with duplicates (maybe from multiple data sources)
student_ids = [101, 102, 103, 102, 104, 101, 105, 103]

# Remove duplicates
unique_ids = set(student_ids)
print(unique_ids)  # {101, 102, 103, 104, 105}

# Convert back to list if needed
unique_ids_list = list(unique_ids)

<strong>Mathematical set operations (powerful!):</strong>

set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

<strong>Union (|) - All items from both sets:</strong>
print(set1 | set2)  # {1, 2, 3, 4, 5, 6, 7, 8}
print(set1.union(set2))  # Same result

<strong>Intersection (&) - Items in BOTH sets:</strong>
print(set1 & set2)  # {4, 5}
print(set1.intersection(set2))  # Same result

<strong>Difference (-) - Items in first set but not second:</strong>
print(set1 - set2)  # {1, 2, 3}
print(set1.difference(set2))  # Same result

<strong>Symmetric Difference (^) - Items in either set but not both:</strong>
print(set1 ^ set2)  # {1, 2, 3, 6, 7, 8}
print(set1.symmetric_difference(set2))  # Same result

<strong>Real-world set operations examples:</strong>

<strong>Find common interests:</strong>
alice_hobbies = {"reading", "coding", "gaming", "cooking"}
bob_hobbies = {"gaming", "cooking", "sports", "music"}
common = alice_hobbies & bob_hobbies
print(common)  # {"gaming", "cooking"}

<strong>Find unique skills:</strong>
team1_skills = {"Python", "JavaScript", "SQL"}
team2_skills = {"Python", "Java", "C++"}
unique_to_team1 = team1_skills - team2_skills
print(unique_to_team1)  # {"JavaScript", "SQL"}

<strong>Combine mailing lists without duplicates:</strong>
list1 = {"alice@email.com", "bob@email.com"}
list2 = {"bob@email.com", "charlie@email.com"}
all_emails = list1 | list2
print(all_emails)  # All emails, no duplicates

<strong>Check subset/superset relationships:</strong>

small_set = {1, 2}
large_set = {1, 2, 3, 4, 5}

print(small_set.issubset(large_set))    # True - small_set is contained in large_set
print(large_set.issuperset(small_set))  # True - large_set contains all of small_set
print(small_set.isdisjoint(large_set))  # False - they share common elements

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Using {} to create empty set:</strong> {} creates an empty dictionary! Use set() instead
⚠️ <strong>Expecting sets to maintain order:</strong> Sets are unordered - don't rely on item order
⚠️ <strong>Using remove() without checking:</strong> If item doesn't exist, you get an error - use discard() for safety
⚠️ <strong>Trying to add lists or dictionaries to sets:</strong> Only immutable types (strings, numbers, tuples) can be in sets
⚠️ <strong>Confusing set operations:</strong> | is union (OR), & is intersection (AND)

<strong>Converting between types:</strong>

# List to set (remove duplicates)
my_list = [1, 2, 2, 3, 3, 3]
my_set = set(my_list)  # {1, 2, 3}

# Set to list (if you need indexing/order)
my_set = {1, 2, 3}
my_list = list(my_set)

# String to set (unique characters)
text = "hello"
unique_letters = set(text)  # {'h', 'e', 'l', 'o'}

<strong>When to use sets vs lists:</strong>

<strong>Use sets when:</strong>
• You need to remove duplicates
• You need to check membership frequently (is this item in the collection?)
• You need mathematical set operations (union, intersection, etc.)
• Order doesn't matter
• Items are unique by nature (user IDs, email addresses, tags)

<strong>Use lists when:</strong>
• Order matters
• You need duplicate items
• You need to access items by position/index
• You need to sort the collection

<strong>Performance benefits of sets:</strong>

Sets are implemented using hash tables (same as dictionaries), making them incredibly fast:

• <strong>Membership testing:</strong> O(1) - instant, even with millions of items!
• <strong>Add/remove:</strong> O(1) - instant operations
• <strong>Lists are O(n):</strong> Checking if item exists requires checking every item!

For large datasets, sets are dramatically faster than lists for checking membership!

<strong>Pro tips:</strong>

✅ Use sets to remove duplicates: unique = list(set(my_list))
✅ Use sets for fast membership testing: if email in valid_emails_set:
✅ Prefer discard() over remove() to avoid errors
✅ Use set operations for cleaner logic: common = set1 & set2
✅ Convert to list when you need to sort: sorted(my_set)
✅ Sets are great for tracking "seen" items when processing data

<strong>Frozen sets (bonus advanced concept):</strong>

Frozen sets are immutable versions of sets (like tuples are to lists):

frozen = frozenset([1, 2, 3])
frozen.add(4)  # ERROR! Frozen sets can't be modified

# But they CAN be used as dictionary keys or set members!
nested = {frozenset([1, 2]), frozenset([3, 4])}

Sets are powerful tools for data cleaning, fast lookups, and elegant solutions to many programming problems. Master them, and you'll write more efficient and cleaner code!`,
      codeExamples: [
        {
          code: '# Remove duplicates from list\nnums = [1, 2, 2, 3, 3, 3, 4]\nunique = set(nums)\nprint(unique)  # {1, 2, 3, 4}\n\n# Check membership\ncolors = {"red", "blue", "green"}\nprint("red" in colors)  # True',
          explanation: 'Using sets to remove duplicates',
        },
      ],
      concepts: ['sets', 'unique values', 'set operations', 'membership testing'],
    },
    starterCode: '# Create a set of unique numbers\nnumbers = {5, 2, 8, 2, 5, 1}\nprint(numbers)  # Duplicates removed\n\n# Add a new number\nnumbers.add(10)\nprint(numbers)\n\n# Check if 5 is in the set\nprint(5 in numbers)',
    validationTests: [
      {
        description: 'Should create and use sets',
        code: 'items = {1, 2, 3, 2, 1}\nprint(len(items))',
        expectedOutput: '3',
      },
    ],
    hints: [
      'Sets use curly braces {} but no key-value pairs',
      'Sets automatically remove duplicates',
      'Sets are unordered - no indexing',
    ],
    challenge: {
      prompt: `Remove duplicates from a list:
1. Create a list: [1, 2, 2, 3, 3, 3, 4, 4, 5]
2. Convert it to a set to remove duplicates
3. Print the set
4. Add the number 6 to the set
5. Check if 3 is in the set and print True/False`,
      starterCode: '# Write your solution here\n',
      solution: 'numbers = [1, 2, 2, 3, 3, 3, 4, 4, 5]\nunique = set(numbers)\nprint(unique)\nunique.add(6)\nprint(3 in unique)',
      tests: [],
      explanation: 'Convert lists to sets with set(). Sets automatically remove duplicates. Use .add() to add items and in to check membership.',
      hints: [
        'Convert to set: unique = set(numbers)',
        'Add item: unique.add(6)',
        'Check membership: 3 in unique'
      ],
      xpReward: 500,
    },
    xpReward: 125,
    gameType: 'quiz',
  },
];
