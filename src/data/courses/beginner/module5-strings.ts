// Module 5: String Manipulation
// 5 lessons covering string methods, formatting, and text processing

import type { Lesson } from '@types';

export const module5Lessons: Lesson[] = [
  {
    id: 'lesson-3-1',
    moduleId: 'module-3',
    courseId: 'beginner',
    title: 'String Methods',
    content: {
      explanation: `Manipulating Text 📝

Strings are everywhere in programming - user input, file names, messages, data from websites, and much more. Python makes working with text incredibly easy through built-in string methods. These are special functions that "belong" to strings and let you transform, clean, and manipulate text with just a single line of code!

<strong>What are string methods?</strong>

Methods are functions that belong to a specific type of data. String methods are called using dot notation:

text = "hello world"
result = text.upper()  # Calling the upper() method on text

You write the variable name, a dot, then the method name with parentheses. The method operates on that specific string!

<strong>Why string methods are essential:</strong>

• <strong>Clean user input:</strong> Remove extra spaces, fix capitalization
• <strong>Process data:</strong> Parse names, emails, addresses
• <strong>Format output:</strong> Make text look professional and consistent
• <strong>Validate input:</strong> Check if text meets requirements
• <strong>Search and replace:</strong> Find and modify specific parts of text

<strong>Critical concept - strings are immutable:</strong>

This is one of the most important things to understand about strings:

text = "hello"
text.upper()  # This creates "HELLO" but doesn't change text!
print(text)   # Still "hello"!

String methods return a NEW string - they never modify the original! If you want to keep the result, save it:

text = "hello"
text = text.upper()  # Save the result back
print(text)  # Now it's "HELLO"

<strong>Case conversion methods:</strong>

<strong>text.upper() - Convert everything to UPPERCASE:</strong>
text = "hello world"
print(text.upper())  # "HELLO WORLD"

Real-world use:
username = input("Username: ")
if username.upper() == "ADMIN":  # Case-insensitive comparison
    print("Admin access granted")

<strong>text.lower() - Convert everything to lowercase:</strong>
text = "HELLO WORLD"
print(text.lower())  # "hello world"

Real-world use:
email = input("Email: ")
email = email.lower()  # Normalize email to lowercase
print(f"Saved: {email}")

<strong>text.capitalize() - Capitalize only the first letter:</strong>
text = "hello world"
print(text.capitalize())  # "Hello world"

# Only the very first character is capitalized!
text = "HELLO WORLD"
print(text.capitalize())  # "Hello world" (rest becomes lowercase!)

<strong>text.title() - Capitalize The First Letter Of Each Word:</strong>
text = "hello world"
print(text.title())  # "Hello World"

name = "alice smith"
print(name.title())  # "Alice Smith"

Real-world use:
name = input("Enter your name: ").title()  # Automatically format names nicely

<strong>text.swapcase() - Swap uppercase and lowercase:</strong>
text = "Hello World"
print(text.swapcase())  # "hELLO wORLD"

<strong>Whitespace removal methods:</strong>

<strong>text.strip() - Remove spaces from both ends:</strong>
messy = "   hello   "
clean = messy.strip()
print(f"'{clean}'")  # 'hello'

Real-world use (cleaning user input):
name = input("Enter name: ").strip()  # Remove accidental spaces
if not name:  # Check if empty after stripping
    print("Name cannot be empty!")

<strong>text.lstrip() - Remove spaces from left (start):</strong>
text = "   hello   "
print(text.lstrip())  # "hello   "

<strong>text.rstrip() - Remove spaces from right (end):</strong>
text = "   hello   "
print(text.rstrip())  # "   hello"

<strong>You can also strip specific characters:</strong>
text = "###hello###"
print(text.strip('#'))  # "hello"

url = "https://example.com/"
print(url.rstrip('/'))  # "https://example.com"

<strong>Text replacement methods:</strong>

<strong>text.replace(old, new) - Replace all occurrences:</strong>
text = "hello world"
new_text = text.replace("world", "Python")
print(new_text)  # "hello Python"

# Replace multiple occurrences
text = "one two one three one"
new_text = text.replace("one", "ONE")
print(new_text)  # "ONE two ONE three ONE"

# Limit replacements with third parameter
text = "one two one three one"
new_text = text.replace("one", "ONE", 2)  # Replace only first 2
print(new_text)  # "ONE two ONE three one"

Real-world use:
message = "Hello {name}, welcome to {site}!"
message = message.replace("{name}", "Alice")
message = message.replace("{site}", "Python World")
print(message)  # "Hello Alice, welcome to Python World!"

<strong>Powerful validation methods:</strong>

<strong>text.startswith(prefix) - Check if string starts with something:</strong>
filename = "report.pdf"
if filename.startswith("report"):
    print("This is a report file")

email = "admin@example.com"
if email.startswith("admin"):
    print("Admin email detected")

<strong>text.endswith(suffix) - Check if string ends with something:</strong>
filename = "document.pdf"
if filename.endswith(".pdf"):
    print("PDF file")
elif filename.endswith(".txt"):
    print("Text file")

<strong>text.isalpha() - Check if all characters are letters:</strong>
text = "hello"
print(text.isalpha())  # True

text = "hello123"
print(text.isalpha())  # False (has numbers)

text = "hello world"
print(text.isalpha())  # False (has space!)

<strong>text.isdigit() - Check if all characters are digits:</strong>
text = "12345"
print(text.isdigit())  # True

text = "123abc"
print(text.isdigit())  # False

Real-world use:
age = input("Enter age: ")
if not age.isdigit():
    print("Please enter numbers only!")
else:
    age = int(age)

<strong>text.isalnum() - Check if alphanumeric (letters or numbers):</strong>
text = "Hello123"
print(text.isalnum())  # True

text = "Hello 123"
print(text.isalnum())  # False (space isn't alphanumeric)

<strong>text.isspace() - Check if only whitespace:</strong>
text = "   "
print(text.isspace())  # True

text = "  hello  "
print(text.isspace())  # False

<strong>text.isupper() / text.islower() - Check case:</strong>
print("HELLO".isupper())  # True
print("hello".islower())  # True
print("Hello".isupper())  # False

<strong>Finding and counting methods:</strong>

<strong>text.find(substring) - Find position of substring:</strong>
text = "hello world"
position = text.find("world")
print(position)  # 6 (starts at index 6)

position = text.find("python")
print(position)  # -1 (not found!)

Real-world use:
email = "user@example.com"
at_position = email.find("@")
if at_position != -1:
    username = email[:at_position]
    domain = email[at_position+1:]
    print(f"Username: {username}, Domain: {domain}")

<strong>text.index(substring) - Like find(), but raises error if not found:</strong>
text = "hello world"
print(text.index("world"))  # 6
# print(text.index("python"))  # ERROR! ValueError

Use find() when you're not sure if substring exists, index() when you're certain!

<strong>text.count(substring) - Count occurrences:</strong>
text = "hello hello world hello"
count = text.count("hello")
print(count)  # 3

text = "banana"
print(text.count("a"))  # 3

Real-world use:
password = input("Enter password: ")
if password.count(" ") > 0:
    print("Password cannot contain spaces!")

<strong>Chaining methods - combine multiple operations:</strong>

Since methods return strings, you can chain them together!

text = "  HELLO WORLD  "
result = text.strip().lower().title()
print(result)  # "Hello World"

# Step by step:
# "  HELLO WORLD  ".strip() -> "HELLO WORLD"
# "HELLO WORLD".lower() -> "hello world"
# "hello world".title() -> "Hello World"

Real-world use (clean and format names):
name = input("Enter name: ").strip().title()
print(f"Welcome, {name}!")

<strong>Common string method patterns:</strong>

<strong>Clean user input:</strong>
user_input = input("Enter data: ").strip().lower()

<strong>Format names properly:</strong>
name = "alice SMITH"
formatted_name = name.title()  # "Alice Smith"

<strong>Case-insensitive comparison:</strong>
if password.lower() == stored_password.lower():
    print("Match!")

<strong>Remove file extension:</strong>
filename = "document.pdf"
name_only = filename.replace(".pdf", "")

<strong>Validate email has @ and domain:</strong>
email = input("Email: ")
if "@" in email and email.count("@") == 1 and "." in email:
    print("Valid format")

<strong>Real-world example - processing form input:</strong>

def clean_user_data(name, email, phone):
    """Clean and format user input."""
    # Clean name: remove extra spaces, capitalize properly
    name = name.strip().title()

    # Clean email: remove spaces, convert to lowercase
    email = email.strip().lower()

    # Clean phone: remove spaces and dashes
    phone = phone.strip().replace(" ", "").replace("-", "")

    return name, email, phone

# Messy input
messy_name = "  alice  SMITH  "
messy_email = "  Alice@Example.COM  "
messy_phone = "555 - 123 - 4567"

# Clean it!
clean_name, clean_email, clean_phone = clean_user_data(
    messy_name, messy_email, messy_phone
)

print(f"Name: {clean_name}")      # Name: Alice Smith
print(f"Email: {clean_email}")    # Email: alice@example.com
print(f"Phone: {clean_phone}")    # Phone: 5551234567

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Forgetting strings are immutable:</strong>
text = "hello"
text.upper()  # Doesn't change text!
print(text)   # Still "hello"

<strong>Fix:</strong> text = text.upper()

⚠️ <strong>Using replace() for single character replacement:</strong>
text = "hello"
text.replace("l", "")  # Creates new string, doesn't modify text

<strong>Fix:</strong> text = text.replace("l", "")

⚠️ <strong>Forgetting to save the result:</strong>
name = "alice"
name.title()  # Result is lost!

<strong>Fix:</strong> name = name.title()

⚠️ <strong>Case-sensitive comparisons:</strong>
if name == "Alice":  # Won't match "alice" or "ALICE"

<strong>Fix:</strong> if name.lower() == "alice":

<strong>Pro tips:</strong>

✅ <strong>Always strip() user input:</strong> Prevents accidental spaces from breaking logic
✅ <strong>Use lower() for case-insensitive comparisons:</strong> More reliable than exact matches
✅ <strong>Chain methods for clean code:</strong> text.strip().lower().replace()
✅ <strong>Use is* methods for validation:</strong> isalpha(), isdigit(), etc.
✅ <strong>Remember strings are immutable:</strong> Always save method results!
✅ <strong>Check before assuming:</strong> Use find() instead of index() to avoid errors

<strong>When to use each method:</strong>

<strong>Use upper()/lower() for:</strong>
• Case-insensitive comparisons
• Normalizing data for storage
• Creating consistent formatting

<strong>Use strip() for:</strong>
• Cleaning user input (ALWAYS!)
• Processing file data
• Removing unwanted whitespace

<strong>Use replace() for:</strong>
• Find-and-replace operations
• Removing characters (replace with "")
• Template filling

<strong>Use title()/capitalize() for:</strong>
• Formatting names
• Creating headers
• Professional-looking output

String methods are fundamental to text processing. Whether you're building a web application, processing data files, or creating a chatbot, you'll use these methods constantly. Master them, and text manipulation becomes effortless!`,
      codeExamples: [
        {
          code: 'name = "alice johnson"\nprint(name.title())  # Alice Johnson\nprint(name.upper())  # ALICE JOHNSON\n\nemail = "  user@example.com  "\nprint(email.strip())  # Remove spaces',
          explanation: 'Using string methods',
        },
      ],
      concepts: ['string methods', 'upper', 'lower', 'strip', 'replace', 'immutability'],
    },
    starterCode: '# Practice string methods\nmessage = "python is awesome"\n\n# Make it uppercase\nprint(message.upper())\n\n# Capitalize each word\nprint(message.title())\n\n# Replace a word\nprint(message.replace("awesome", "amazing"))',
    validationTests: [
      {
        description: 'Should use string methods',
        code: 'text = "hello"\nprint(text.upper())',
        expectedOutput: 'HELLO',
      },
    ],
    hints: [
      'String methods are called with dot notation',
      'Methods return new strings, don\'t modify original',
      'Chain methods: text.strip().upper()',
    ],
    challenge: {
      prompt: `Clean and format user input:
1. Create a variable: messy_name = "  alice johnson  "
2. Remove whitespace using .strip()
3. Convert to title case using .title()
4. Print the result
5. Do it all in one line using method chaining`,
      starterCode: '# Write your solution here\n',
      solution: 'messy_name = "  alice johnson  "\nclean_name = messy_name.strip().title()\nprint(clean_name)',
      tests: [],
      explanation: 'String methods can be chained! .strip() removes spaces, then .title() capitalizes each word.',
      hints: [
        'Chain methods: messy_name.strip().title()',
        'Remember strings are immutable - save the result!',
        'Result should be "Alice Johnson"'
      ],
      xpReward: 150,
    },
    xpReward: 150,
    gameType: 'quiz',
  },

  {
    id: 'lesson-3-2',
    moduleId: 'module-3',
    courseId: 'beginner',
    title: 'String Concatenation',
    content: {
      explanation: `Combining Strings 🔗

Strings rarely exist in isolation - you'll constantly need to combine them, split them apart, and transform them. Python provides multiple elegant ways to work with text, from simple concatenation to powerful join and split operations. Understanding these techniques is essential for any text processing task!

<strong>What is concatenation?</strong>

Concatenation is the fancy programming word for "sticking strings together" or "joining strings end-to-end." If you have "Hello" and "World", concatenation gives you "HelloWorld" or "Hello World" (depending on whether you add a space).

<strong>The + operator - simple and intuitive:</strong>

Just use + to stick strings together!

first = "Hello"
last = "World"
full = first + " " + last
print(full)  # "Hello World"

greeting = "Hi"
name = "Alice"
message = greeting + ", " + name + "!"
print(message)  # "Hi, Alice!"

<strong>Building strings piece by piece:</strong>
result = "Python"
result = result + " is"
result = result + " awesome"
print(result)  # "Python is awesome"

<strong>The += operator - add and assign:</strong>

The += operator is shorthand for adding to an existing string:

message = "Hello"
message += " World"  # Same as: message = message + " World"
print(message)  # "Hello World"

<strong>Building strings in loops:</strong>
sentence = ""
words = ["Python", "is", "very", "powerful"]
for word in words:
    sentence += word + " "
print(sentence)  # "Python is very powerful "

Note: For large-scale string building, join() is more efficient (we'll see it soon!)

<strong>The * operator - repeat strings:</strong>

Multiply a string by a number to repeat it!

laugh = "ha" * 3
print(laugh)  # "hahaha"

separator = "=" * 40
print(separator)  # ========================================

border = "*" * 20
print(border)
print("Important Message")
print(border)

Real-world uses:
# Create a line separator
print("-" * 50)

# Indent text
indent = " " * 4  # 4 spaces
print(indent + "Indented text")

# Repeat patterns
pattern = "abc" * 5
print(pattern)  # "abcabcabcabcabc"

<strong>Concatenation with different types (careful!):</strong>

You can ONLY concatenate strings with strings! Mixing types causes errors:

name = "Alice"
age = 25
# message = "Hello, " + name + ", age " + age  # ERROR! Can't concatenate str and int

<strong>Solutions:</strong>

<strong>Option 1: Convert to string:</strong>
message = "Hello, " + name + ", age " + str(age)
print(message)  # "Hello, Alice, age 25"

<strong>Option 2: Use f-strings (better!):</strong>
message = f"Hello, {name}, age {age}"
print(message)  # "Hello, Alice, age 25"

F-strings automatically convert types and are much cleaner!

<strong>The join() method - combine list items into a string:</strong>

join() is one of the most powerful string methods. It takes a list of strings and joins them with a separator:

words = ["Python", "is", "fun"]
sentence = " ".join(words)  # Join with space
print(sentence)  # "Python is fun"

<strong>Syntax: separator.join(list_of_strings)</strong>

The separator (what goes between items) comes FIRST, then .join(), then the list!

<strong>Different separators:</strong>

# Join with comma
items = ["apples", "bananas", "oranges"]
result = ", ".join(items)
print(result)  # "apples, bananas, oranges"

# Join with no separator
letters = ["H", "e", "l", "l", "o"]
word = "".join(letters)
print(word)  # "Hello"

# Join with newline
lines = ["First line", "Second line", "Third line"]
text = "\n".join(lines)
print(text)
# Output:
# First line
# Second line
# Third line

# Join with custom separator
parts = ["2024", "12", "25"]
date = "-".join(parts)
print(date)  # "2024-12-25"

<strong>Why join() is better than + in loops:</strong>

# Slow way (creates many intermediate strings):
result = ""
for word in words:
    result += word + " "

# Fast way (efficient, one operation):
result = " ".join(words)

For small strings it doesn't matter, but for thousands of items, join() is MUCH faster!

<strong>Real-world join() examples:</strong>

<strong>Create CSV (Comma-Separated Values):</strong>
data = ["Alice", "25", "Engineer"]
csv_line = ",".join(data)
print(csv_line)  # "Alice,25,Engineer"

<strong>Build file paths:</strong>
path_parts = ["home", "user", "documents", "file.txt"]
path = "/".join(path_parts)
print(path)  # "home/user/documents/file.txt"

<strong>Create HTML lists:</strong>
items = ["Python", "JavaScript", "Java"]
html_items = ["<li>" + item + "</li>" for item in items]
html = "\n".join(html_items)
print(html)

<strong>The split() method - break strings into lists:</strong>

split() is the opposite of join() - it breaks a string into a list of pieces!

sentence = "Python is fun"
words = sentence.split()  # Split on spaces (default)
print(words)  # ['Python', 'is', 'fun']

<strong>split() with no arguments splits on whitespace (spaces, tabs, newlines):</strong>

text = "Python    is    awesome"  # Multiple spaces
words = text.split()
print(words)  # ['Python', 'is', 'awesome'] (spaces removed!)

This is VERY useful because it handles messy spacing automatically!

<strong>split(separator) - split on specific character:</strong>

<strong>Split on comma:</strong>
csv = "Alice,25,Engineer"
data = csv.split(",")
print(data)  # ['Alice', '25', 'Engineer']

<strong>Split on pipe:</strong>
data = "name|age|city"
fields = data.split("|")
print(fields)  # ['name', 'age', 'city']

<strong>Split on newline:</strong>
text = "Line 1\nLine 2\nLine 3"
lines = text.split("\n")
print(lines)  # ['Line 1', 'Line 2', 'Line 3']

<strong>Split on colon:</strong>
time = "14:30:45"
parts = time.split(":")
print(parts)  # ['14', '30', '45']

<strong>split(separator, maxsplit) - limit number of splits:</strong>

text = "one:two:three:four"
parts = text.split(":", 2)  # Split only twice
print(parts)  # ['one', 'two', 'three:four']

This keeps the last piece intact after maxsplit splits!

<strong>Real-world split() examples:</strong>

<strong>Parse email address:</strong>
email = "alice@example.com"
parts = email.split("@")
username = parts[0]  # "alice"
domain = parts[1]    # "example.com"
print(f"Username: {username}, Domain: {domain}")

<strong>Process CSV data:</strong>
csv_line = "Alice,25,Engineer,Boston"
name, age, job, city = csv_line.split(",")
print(f"{name} is a {age}-year-old {job} in {city}")

<strong>Parse file paths:</strong>
path = "home/user/documents/file.txt"
parts = path.split("/")
filename = parts[-1]  # "file.txt" (last element)
print(f"Filename: {filename}")

<strong>Extract data from URLs:</strong>
url = "https://example.com/products/laptop"
parts = url.split("/")
product = parts[-1]  # "laptop"
print(f"Product: {product}")

<strong>Combining split() and join() - text processing power:</strong>

<strong>Remove extra spaces:</strong>
messy = "Python    is    awesome"
clean = " ".join(messy.split())
print(clean)  # "Python is awesome"

How it works:
1. split() breaks into ['Python', 'is', 'awesome'] (ignoring extra spaces)
2. join() reassembles with single spaces

<strong>Replace separator:</strong>
data = "one,two,three"
new_data = " | ".join(data.split(","))
print(new_data)  # "one | two | three"

<strong>Reverse word order:</strong>
sentence = "Python is awesome"
words = sentence.split()
reversed_words = words[::-1]
reversed_sentence = " ".join(reversed_words)
print(reversed_sentence)  # "awesome is Python"

<strong>splitlines() - split on line breaks:</strong>

Special method for splitting multi-line text:

text = "Line 1\nLine 2\nLine 3"
lines = text.splitlines()
print(lines)  # ['Line 1', 'Line 2', 'Line 3']

Works with different line ending styles (\n, \r\n, \r)!

<strong>Real-world complete example - processing user input:</strong>

def parse_contact_info(input_str):
    """
    Parse contact info in format: 'Name, Email, Phone'
    """
    # Split on comma
    parts = input_str.split(",")

    # Clean each part (remove extra spaces)
    parts = [part.strip() for part in parts]

    if len(parts) != 3:
        return None

    name, email, phone = parts
    return {
        "name": name.title(),
        "email": email.lower(),
        "phone": phone.replace(" ", "").replace("-", "")
    }

# Test it
contact = "  alice smith  , Alice@Example.COM , 555 - 123 - 4567  "
info = parse_contact_info(contact)
print(info)
# {'name': 'Alice Smith', 'email': 'alice@example.com', 'phone': '5551234567'}

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Concatenating string and number:</strong>
age = 25
message = "Age: " + age  # ERROR!

<strong>Fix:</strong> message = "Age: " + str(age) or message = f"Age: {age}"

⚠️ <strong>Wrong join() syntax:</strong>
words = ["Python", "is", "fun"]
sentence = words.join(" ")  # ERROR! Backwards!

<strong>Fix:</strong> sentence = " ".join(words)

⚠️ <strong>Forgetting split() returns a list:</strong>
text = "one,two,three"
result = text.split(",")
print(result[0])  # Need to index into list!

⚠️ <strong>Using + in big loops instead of join():</strong>
# Inefficient for large data
result = ""
for word in huge_list:
    result += word

# Efficient
result = "".join(huge_list)

⚠️ <strong>Not handling empty splits:</strong>
text = "one,,three"
parts = text.split(",")
print(parts)  # ['one', '', 'three'] - empty string in middle!

<strong>Pro tips:</strong>

✅ <strong>Use join() for building strings from lists:</strong> Much faster than +=
✅ <strong>Use split() without arguments to handle messy spacing:</strong> It's smart about whitespace
✅ <strong>Clean data after splitting:</strong> words = [w.strip() for w in text.split(",")]
✅ <strong>Use f-strings instead of + for readability:</strong> f"Hello {name}" beats "Hello " + name
✅ <strong>Remember split() and join() are opposites:</strong> One breaks strings, one builds them
✅ <strong>Strip whitespace from split results:</strong> parts = [p.strip() for p in text.split(",")]

<strong>When to use each technique:</strong>

<strong>Use + for:</strong>
• Simple concatenation of 2-3 strings
• Adding single items to strings
• When readability is most important

<strong>Use join() for:</strong>
• Combining many strings efficiently
• Building strings from lists
• Creating CSV, HTML, or formatted data

<strong>Use split() for:</strong>
• Parsing structured data (CSV, logs, etc.)
• Breaking sentences into words
• Extracting data from formatted strings

<strong>Use f-strings for:</strong>
• Embedding variables in strings
• Complex formatting with calculations
• Most string building tasks!

String concatenation, joining, and splitting are fundamental skills for text processing. Whether you're parsing files, processing user input, or generating output, these techniques are essential. Master them, and you'll handle any text processing task with ease!`,
      codeExamples: [
        {
          code: 'name = "John"\ngreeting = "Hello " + name + "!"\nprint(greeting)\n\ndata = "apple,banana,cherry"\nfruits = data.split(",")\nprint(fruits)',
          explanation: 'Concatenation and splitting',
        },
      ],
      concepts: ['concatenation', 'join', 'split', 'string operators'],
    },
    starterCode: '# Combining strings\nfirst_name = "John"\nlast_name = "Doe"\n\n# Method 1: + operator\nfull_name = first_name + " " + last_name\nprint(full_name)\n\n# Method 2: join\nparts = [first_name, last_name]\nfull_name2 = " ".join(parts)\nprint(full_name2)',
    validationTests: [
      {
        description: 'Should concatenate strings',
        code: 'a = "Hello"\nb = "World"\nprint(a + " " + b)',
        expectedOutput: 'Hello World',
      },
    ],
    hints: [
      'Use + to combine strings',
      'join() combines list items into a string',
      'split() breaks a string into a list',
    ],
    challenge: {
      prompt: `Practice string methods:
1. Create: message = "  hello world  "
2. Remove whitespace with .strip() and save to cleaned
3. Capitalize the first letter with .capitalize()
4. Replace "world" with "python" using .replace()
5. Print each result`,
      starterCode: '# Write your solution here\n',
      solution: 'message = "  hello world  "\ncleaned = message.strip()\ncapitalized = cleaned.capitalize()\nreplaced = cleaned.replace("world", "python")\nprint(cleaned)\nprint(capitalized)\nprint(replaced)',
      tests: [],
      explanation: 'String methods return new strings. .strip() removes whitespace, .capitalize() uppercases first letter, .replace() swaps text.',
      hints: [
        'Strip: cleaned = message.strip()',
        'Capitalize: cleaned.capitalize()',
        'Replace: cleaned.replace("world", "python")'
      ],
      xpReward: 150,
    },
    xpReward: 150,
    gameType: 'quiz',
  },

  {
    id: 'lesson-3-3',
    moduleId: 'module-3',
    courseId: 'beginner',
    title: 'F-Strings',
    content: {
      explanation: `Modern String Formatting 🎨

F-strings (formatted string literals) are one of Python's most elegant features, introduced in Python 3.6. They revolutionized how we build strings by making it incredibly easy, readable, and fast to embed variables and expressions directly into text. Once you learn f-strings, you'll never want to go back to older methods!

<strong>What are f-strings?</strong>

F-strings let you embed variables and expressions directly inside strings by putting an f before the opening quote and wrapping variables in curly braces {}:

name = "Alice"
age = 25
print(f"My name is {name} and I'm {age} years old")
# Output: My name is Alice and I'm 25 years old

The f tells Python "this is a formatted string literal" - process the {} parts as code!

<strong>Why f-strings are amazing:</strong>

• <strong>Readable:</strong> See the final output format clearly
• <strong>Concise:</strong> No more .format() or % operator complexity
• <strong>Fast:</strong> Actually faster than other formatting methods
• <strong>Powerful:</strong> Can include expressions, function calls, even complex calculations
• <strong>Type-friendly:</strong> Automatically converts numbers to strings

<strong>Basic f-string usage:</strong>

name = "Alice"
age = 25
city = "Boston"

# Old way (hard to read):
message = "Hello, " + name + "! You are " + str(age) + " years old and live in " + city + "."

# F-string way (clean and clear!):
message = f"Hello, {name}! You are {age} years old and live in {city}."

print(message)
# Hello, Alice! You are 25 years old and live in Boston.

<strong>Expressions inside f-strings - full Python power!</strong>

You can put ANY valid Python expression inside the curly braces!

<strong>Math operations:</strong>
x = 10
y = 5
print(f"{x} + {y} = {x + y}")     # 10 + 5 = 15
print(f"{x} × {y} = {x * y}")     # 10 × 5 = 50
print(f"{x} to the power of 2 = {x**2}")  # 10 to the power of 2 = 100

<strong>Calling functions:</strong>
name = "alice"
print(f"Hello, {name.title()}!")  # Hello, Alice!

numbers = [1, 2, 3, 4, 5]
print(f"Sum: {sum(numbers)}")     # Sum: 15
print(f"Max: {max(numbers)}")     # Max: 5

<strong>Conditionals (ternary operator):</strong>
age = 25
print(f"You are {'an adult' if age >= 18 else 'a minor'}")
# You are an adult

score = 85
print(f"Grade: {'Pass' if score >= 60 else 'Fail'}")
# Grade: Pass

<strong>Accessing lists and dictionaries:</strong>
colors = ["red", "blue", "green"]
print(f"First color: {colors[0]}")  # First color: red

person = {"name": "Alice", "age": 25}
print(f"Name: {person['name']}, Age: {person['age']}")
# Name: Alice, Age: 25

<strong>Complex expressions:</strong>
price = 19.99
quantity = 3
tax_rate = 0.08
total = (price * quantity) * (1 + tax_rate)
print(f"Total: \${total:.2f}")  # Total: $64.77

<strong>Number formatting - making output look professional:</strong>

<strong>Controlling decimal places with :.Nf</strong>

The format {value:.2f} means "format as a float with 2 decimal places":

price = 19.99
print(f"Price: \${price:.2f}")  # Price: $19.99

pi = 3.14159265359
print(f"Pi to 2 decimals: {pi:.2f}")   # Pi to 2 decimals: 3.14
print(f"Pi to 4 decimals: {pi:.4f}")   # Pi to 4 decimals: 3.1416
print(f"Pi to 6 decimals: {pi:.6f}")   # Pi to 6 decimals: 3.141593

<strong>Adding thousands separators with :,</strong>

large_number = 1234567
print(f"Population: {large_number:,}")  # Population: 1,234,567

price = 1999.99
print(f"Price: \${price:,.2f}")  # Price: $1,999.99

<strong>Formatting as percentage with :.N%</strong>

ratio = 0.857
print(f"Success rate: {ratio:.1%}")  # Success rate: 85.7%

score = 0.95
print(f"Score: {score:.0%}")  # Score: 95% (no decimals)

accuracy = 0.8752
print(f"Accuracy: {accuracy:.2%}")  # Accuracy: 87.52%

<strong>Padding and alignment:</strong>

<strong>Right-align with :>N</strong>
name = "Alice"
print(f"|{name:>10}|")  # |     Alice| (right-aligned in 10 chars)

<strong>Left-align with :<N</strong>
print(f"|{name:<10}|")  # |Alice     | (left-aligned in 10 chars)

<strong>Center with :^N</strong>
print(f"|{name:^10}|")  # |  Alice   | (centered in 10 chars)

<strong>Padding with zeros:</strong>
number = 7
print(f"File {number:03}.txt")  # File 007.txt

order_num = 42
print(f"Order #{order_num:05}")  # Order #00042

<strong>Creating formatted tables:</strong>

# Product inventory table
products = [
    ("Laptop", 999.99, 5),
    ("Mouse", 24.99, 50),
    ("Keyboard", 79.99, 20)
]

print(f"{'Product':<10} {'Price':>8} {'Stock':>6}")
print("-" * 26)
for name, price, stock in products:
    print(f"{name:<10} \${price:>7.2f} {stock:>6}")

Output:
Product       Price  Stock
--------------------------
Laptop      $999.99      5
Mouse        $24.99     50
Keyboard     $79.99     20

<strong>Real-world f-string examples:</strong>

<strong>User greeting:</strong>
username = "Alice"
points = 1500
print(f"Welcome back, {username}! You have {points:,} points.")
# Welcome back, Alice! You have 1,500 points.

<strong>Progress indicator:</strong>
completed = 45
total = 100
percentage = completed / total
print(f"Progress: {completed}/{total} ({percentage:.1%})")
# Progress: 45/100 (45.0%)

<strong>Financial report:</strong>
revenue = 125000.50
expenses = 87500.25
profit = revenue - expenses
print(f"Revenue: \${revenue:,.2f}")
print(f"Expenses: \${expenses:,.2f}")
print(f"Profit: \${profit:,.2f}")
# Revenue: $125,000.50
# Expenses: $87,500.25
# Profit: $37,500.25

<strong>Formatted date/time:</strong>
year = 2024
month = 12
day = 25
print(f"Date: {year}-{month:02d}-{day:02d}")
# Date: 2024-12-25 (month and day padded with zeros)

<strong>Multi-line f-strings:</strong>

You can create multi-line formatted strings:

name = "Alice"
age = 25
city = "Boston"

message = f"""
Dear {name},

We're pleased to inform you that your application has been approved.

User Details:
- Name: {name}
- Age: {age}
- City: {city}

Thank you!
"""

print(message)

<strong>Debugging with f-strings - the = specifier:</strong>

Python 3.8+ added a super useful debugging feature:

x = 10
y = 20
result = x + y

# Old way:
print(f"result: {result}")

# New way (shows variable name AND value):
print(f"{result=}")  # result=30

# Works with expressions too!
print(f"{x + y=}")     # x + y=30
print(f"{len('hello')=}")  # len('hello')=5

This is AMAZING for debugging!

<strong>Calling methods inside f-strings:</strong>

text = "hello world"
print(f"Uppercase: {text.upper()}")  # Uppercase: HELLO WORLD
print(f"Title case: {text.title()}")  # Title case: Hello World

email = "  Alice@Example.COM  "
print(f"Clean email: {email.strip().lower()}")
# Clean email: alice@example.com

<strong>Nested f-strings (advanced):</strong>

You can even nest f-strings!

value = 42
width = 10
print(f"{value:>{width}}")  # Right-align with variable width

<strong>Old formatting methods (for reference):</strong>

<strong>% operator (old style, avoid):</strong>
name = "Alice"
age = 25
print("Name: %s, Age: %d" % (name, age))  # Confusing syntax!

<strong>str.format() (still works but verbose):</strong>
print("Name: {}, Age: {}".format(name, age))
print("Name: {n}, Age: {a}".format(n=name, a=age))

<strong>F-strings are better than both!</strong>

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Forgetting the f:</strong>
name = "Alice"
print("Hello {name}")  # Prints literally: Hello {name}

<strong>Fix:</strong> print(f"Hello {name}")

⚠️ <strong>Using quotes inside curly braces incorrectly:</strong>
data = {"name": "Alice"}
print(f"{data["name"]}")  # ERROR! Quote confusion

<strong>Fix:</strong> Use different quote types: print(f"{data['name']}")

⚠️ <strong>Trying to use f-strings in Python < 3.6:</strong>
They won't work in older Python versions!

⚠️ <strong>Forgetting .2f for currency:</strong>
price = 19.9
print(f"\${price}")  # $19.9 (missing trailing zero!)

<strong>Fix:</strong> print(f"\${price:.2f}")  # $19.90

<strong>Pro tips:</strong>

✅ <strong>Always use f-strings for string formatting:</strong> They're the best choice
✅ <strong>Use :.2f for money:</strong> Always show 2 decimals for currency
✅ <strong>Use :, for large numbers:</strong> Makes them readable (1,000,000 vs 1000000)
✅ <strong>Use the = debug operator:</strong> print(f"{variable=}") for quick debugging
✅ <strong>Align numbers in tables:</strong> Use :> for right-align, :< for left-align
✅ <strong>Chain methods inside {}:</strong> {text.strip().lower().title()}

<strong>When to use f-strings vs other methods:</strong>

<strong>Use f-strings for:</strong>
• Almost everything! (They're the best choice 99% of the time)
• Embedding variables
• Complex expressions
• Readable, maintainable code

<strong>Use .format() when:</strong>
• You need to reuse a template many times
• Working with legacy code

<strong>Use % operator when:</strong>
• Never! (It's outdated, avoid it)

<strong>Comparison of all methods:</strong>

name = "Alice"
age = 25

# F-string (BEST!)
print(f"Name: {name}, Age: {age}")

# .format() (verbose)
print("Name: {}, Age: {}".format(name, age))

# % operator (outdated)
print("Name: %s, Age: %d" % (name, age))

# Concatenation (messy)
print("Name: " + name + ", Age: " + str(age))

F-strings win in every category: readability, speed, and features!

<strong>Key takeaways:</strong>

🔑 F-strings are the modern, best way to format strings in Python
🔑 Put f before the quote and variables in {}
🔑 You can use any expression inside {} - full Python power!
🔑 Use :.2f for currency, :, for thousands, :.1% for percentages
🔑 The = operator is amazing for debugging: print(f"{variable=}")
🔑 F-strings are faster and more readable than old methods

F-strings make string formatting elegant and intuitive. They're powerful enough for complex formatting yet simple enough for beginners. Master f-strings, and you'll create beautiful, professional output with minimal code!`,
      codeExamples: [
        {
          code: 'product = "Laptop"\nprice = 999.50\nquantity = 2\n\ntotal = price * quantity\nprint(f"{quantity} {product}s cost \\${total:.2f}")',
          explanation: 'Using f-strings with calculations',
        },
      ],
      concepts: ['f-strings', 'string formatting', 'string interpolation'],
    },
    starterCode: '# Using f-strings\nname = "Bob"\nage = 30\ncity = "Boston"\n\n# Create a formatted message\nmessage = f"Hi, I\'m {name}. I\'m {age} years old and live in {city}."\nprint(message)\n\n# Use expressions\nprint(f"In 5 years, I\'ll be {age + 5} years old")',
    validationTests: [
      {
        description: 'Should use f-strings',
        code: 'x = 5\nprint(f"Value: {x}")',
        expectedOutput: 'Value: 5',
      },
    ],
    hints: [
      'Put f before the opening quote',
      'Use {} to embed variables',
      'You can use expressions inside {}',
    ],
    challenge: {
      prompt: `Create a product display:
1. Variables: product = "Laptop", price = 999.99, quantity = 2
2. Calculate total = price * quantity
3. Use an f-string to print: "Product: Laptop"
4. Print: "Price: $999.99 each"
5. Print: "Total for 2: $1999.98"`,
      starterCode: '# Write your solution here\n',
      solution: 'product = "Laptop"\nprice = 999.99\nquantity = 2\ntotal = price * quantity\nprint(f"Product: {product}")\nprint(f"Price: ${price} each")\nprint(f"Total for {quantity}: ${total}")',
      tests: [],
      explanation: 'F-strings let you embed variables using {}. They automatically convert numbers to strings!',
      hints: [
        'Start with f" to make an f-string',
        'Embed variables: {product}, {price}',
        'Can calculate inside: {price * quantity}'
      ],
      xpReward: 150,
    },
    xpReward: 150,
    gameType: 'quiz',
  },

  {
    id: 'lesson-3-4',
    moduleId: 'module-3',
    courseId: 'beginner',
    title: 'String Formatting Techniques',
    content: {
      explanation: `Advanced String Formatting 💅

Now that you know the basics of f-strings, let's unlock their full power! Advanced formatting lets you control exactly how data appears - alignment, padding, number bases, precision, and more. These techniques transform raw data into beautiful, professional-looking output that's easy to read and perfectly formatted!

<strong>Why advanced formatting matters:</strong>

• <strong>Professionalism:</strong> Well-formatted output looks polished and intentional
• <strong>Readability:</strong> Aligned columns and proper spacing make data easy to scan
• <strong>Standards compliance:</strong> Financial data needs 2 decimals, IDs need zero-padding
• <strong>User experience:</strong> Clear, consistent formatting improves usability
• <strong>Reports and logs:</strong> Creating readable tables, reports, and structured output

<strong>Text alignment - making columns line up:</strong>

Alignment uses format specifiers: {value:alignment width}

name = "Alice"

<strong>Right-align with :>N:</strong>
print(f"|{name:>10}|")  # |     Alice| (10 characters total, right-aligned)

<strong>Left-align with :<N:</strong>
print(f"|{name:<10}|")  # |Alice     | (10 characters total, left-aligned)

<strong>Center-align with :^N:</strong>
print(f"|{name:^10}|")  # |  Alice   | (10 characters total, centered)

<strong>Real-world alignment - creating tables:</strong>

# Product listing with aligned columns
items = [
    ("Laptop", 999.99),
    ("Mouse", 24.99),
    ("Keyboard", 79.99),
    ("Monitor", 349.99)
]

print(f"{'Item':<12} {'Price':>10}")
print("-" * 23)
for item, price in items:
    print(f"{item:<12} \${price:>9.2f}")

Output:
Item            Price
-----------------------
Laptop        $ 999.99
Mouse         $  24.99
Keyboard      $  79.99
Monitor       $ 349.99

<strong>Number formatting - making data readable:</strong>

<strong>Thousands separators with :,</strong>

Makes large numbers readable at a glance:

population = 8500000
print(f"Population: {population:,}")  # Population: 8,500,000

revenue = 1234567.89
print(f"Revenue: \${revenue:,.2f}")  # Revenue: $1,234,567.89

budget = 5000000
print(f"Budget: \${budget:,}")  # Budget: $5,000,000

<strong>Decimal precision with :.Nf</strong>

Control exactly how many decimal places to show:

pi = 3.14159265359
print(f"Pi (2 decimals): {pi:.2f}")   # Pi (2 decimals): 3.14
print(f"Pi (4 decimals): {pi:.4f}")   # Pi (4 decimals): 3.1416
print(f"Pi (0 decimals): {pi:.0f}")   # Pi (0 decimals): 3

price = 19.5
print(f"\${price:.2f}")  # $19.50 (fills in trailing zero)

<strong>Percentage formatting with :.N%</strong>

Automatically multiplies by 100 and adds % symbol:

success_rate = 0.857
print(f"Success: {success_rate:.1%}")  # Success: 85.7%

completion = 0.45
print(f"Complete: {completion:.0%}")  # Complete: 45%

accuracy = 0.98765
print(f"Accuracy: {accuracy:.2%}")  # Accuracy: 98.77% (rounds!)

conversion_rate = 0.0325
print(f"Conversion: {conversion_rate:.2%}")  # Conversion: 3.25%

<strong>Scientific notation with :e or :E</strong>

For very large or very small numbers:

big = 1234567890
print(f"{big:e}")  # 1.234568e+09 (lowercase e)
print(f"{big:E}")  # 1.234568E+09 (uppercase E)

small = 0.000000123
print(f"{small:.2e}")  # 1.23e-07 (2 decimal places)

<strong>Padding with zeros - perfect for IDs and codes:</strong>

<strong>Zero-padding integers with :0N</strong>

order_id = 42
print(f"Order #{order_id:05}")  # Order #00042

file_num = 7
print(f"file_{file_num:03}.txt")  # file_007.txt

user_id = 123
print(f"USER-{user_id:06}")  # USER-000123

<strong>Date formatting with zero-padding:</strong>

year = 2024
month = 3
day = 5

print(f"{year}-{month:02}-{day:02}")  # 2024-03-05 (not 2024-3-5)

hour = 9
minute = 5
second = 3
print(f"{hour:02}:{minute:02}:{second:02}")  # 09:05:03

<strong>Number base formatting - binary, octal, hexadecimal:</strong>

<strong>Binary with :b</strong>
num = 255
print(f"{num:b}")  # 11111111

num = 10
print(f"{num:b}")  # 1010

<strong>Octal with :o</strong>
num = 64
print(f"{num:o}")  # 100

<strong>Hexadecimal with :x (lowercase) or :X (uppercase)</strong>
num = 255
print(f"{num:x}")  # ff (lowercase)
print(f"{num:X}")  # FF (uppercase)

color_value = 16711680  # Red in RGB
print(f"Color: #{color_value:06X}")  # Color: #FF0000

<strong>With base prefix :#x, :#o, :#b</strong>
num = 255
print(f"{num:#x}")  # 0xff (includes 0x prefix)
print(f"{num:#b}")  # 0b11111111 (includes 0b prefix)
print(f"{num:#o}")  # 0o377 (includes 0o prefix)

<strong>Combining format specifiers - ultimate control:</strong>

You can combine multiple specifiers!

<strong>Align, pad, and format decimals:</strong>
value = 42.7
print(f"{value:>10.2f}")  # Right-align in 10 chars with 2 decimals
#      42.70

<strong>Thousands separator with decimals:</strong>
money = 1234567.89
print(f"\${money:>15,.2f}")  # Right-aligned with commas and 2 decimals
#   $ 1,234,567.89

<strong>Zero-pad with sign:</strong>
temp = 5
print(f"{temp:+04}")  # +005 (+ forces sign, 04 zero-pads to 4 chars)

temp = -5
print(f"{temp:+04}")  # -005

<strong>Creating professional reports:</strong>

# Financial statement
items = [
    ("Revenue", 125000.50),
    ("Expenses", -87500.25),
    ("Profit", 37500.25)
]

print(f"{'Description':<15} {'Amount':>15}")
print("=" * 30)
for desc, amount in items:
    sign = "+" if amount >= 0 else ""
    print(f"{desc:<15} \${amount:>+14,.2f}")
print("=" * 30)

Output:
Description           Amount
==============================
Revenue           +$125,000.50
Expenses           -$87,500.25
Profit             +$37,500.25
==============================

<strong>Advanced alignment with fill characters:</strong>

You can specify a custom fill character before the alignment:

name = "VIP"
print(f"{name:*^20}")  # *******<strong>VIP</strong>****** (centered with asterisks)

status = "ALERT"
print(f"{status:!^30}")  # !!!!!!!!!!!!ALERT!!!!!!!!!!! (centered with !)

label = "ERROR"
print(f"{label:=>15}")  # ==========ERROR (right-aligned with =)

<strong>Width from variables:</strong>

Sometimes you need dynamic width:

width = 20
name = "Alice"
print(f"{name:^{width}}")  # Center with variable width

# Or with expressions
max_width = 30
padding = 5
print(f"{name:^{max_width - padding}}")

<strong>Sign formatting options:</strong>

<strong>Force sign with +:</strong>
num = 42
print(f"{num:+}")   # +42
print(f"{-num:+}")  # -42

<strong>Space for positive, minus for negative:</strong>
num = 42
print(f"{num: }")   #  42 (space before positive)
print(f"{-num: }")  # -42 (minus for negative)

<strong>Formatting types quick reference:</strong>

<strong>String alignment:</strong>
• {:>10} - Right-align in 10 spaces
• {:<10} - Left-align in 10 spaces
• {:^10} - Center in 10 spaces
• {:*^10} - Center with * as fill char

<strong>Number formatting:</strong>
• {:.2f} - 2 decimal places
• {:,} - Thousands separators
• {:,.2f} - Commas and 2 decimals
• {:.1%} - Percentage with 1 decimal
• {:0>5} - Zero-pad to 5 digits
• {:+} - Show sign (+ or -)

<strong>Number bases:</strong>
• {:b} - Binary
• {:o} - Octal
• {:x} - Hexadecimal (lowercase)
• {:X} - Hexadecimal (uppercase)
• {:#x} - Hex with 0x prefix

<strong>Real-world advanced examples:</strong>

<strong>Invoice generator:</strong>
def print_invoice(items):
    print(f"{'Item':<20} {'Qty':>5} {'Price':>10} {'Total':>12}")
    print("-" * 50)

    grand_total = 0
    for item, qty, price in items:
        total = qty * price
        grand_total += total
        print(f"{item:<20} {qty:>5} \${price:>9.2f} \${total:>11.2f}")

    print("-" * 50)
    print(f"{'GRAND TOTAL':>38} \${grand_total:>11.2f}")

invoice_items = [
    ("Widget Pro", 3, 29.99),
    ("Gadget Ultra", 1, 149.99),
    ("Tool Set", 2, 59.99)
]

print_invoice(invoice_items)

<strong>Progress bar:</strong>
def show_progress(completed, total):
    percentage = completed / total
    bar_length = 40
    filled = int(bar_length * percentage)
    bar = "█" * filled + "░" * (bar_length - filled)
    print(f"Progress: [{bar}] {percentage:>5.1%} ({completed}/{total})")

show_progress(45, 100)
show_progress(78, 100)
show_progress(100, 100)

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Confusing alignment symbols:</strong>
{:<10} vs {:>10} - remember < points left, > points right!

⚠️ <strong>Forgetting width in alignment:</strong>
{:>} doesn't work - need {:>10} with a width number!

⚠️ <strong>Wrong order of format specifiers:</strong>
{:.2f,} is wrong - comma goes first: {:,.2f}

⚠️ <strong>Using percentage without decimal places:</strong>
{:%} shows weird output - use {:.1%} or {:.2%}

⚠️ <strong>Padding confusion:</strong>
{:5} pads with spaces, {:05} pads with zeros!

<strong>Pro tips:</strong>

✅ <strong>Use alignment for readable tables:</strong> Makes data scannable at a glance
✅ <strong>Always format money with :.2f:</strong> Shows cents even when zero
✅ <strong>Use thousands separators for large numbers:</strong> {:,} improves readability dramatically
✅ <strong>Zero-pad IDs and codes:</strong> {:03} makes ID 7 become 007
✅ <strong>Percentage formatting is automatic:</strong> {:.1%} multiplies by 100 for you
✅ <strong>Test your formatting:</strong> Print sample data to verify alignment works

<strong>Format specifier template:</strong>

Full syntax (all parts optional except value):
{value:fill align sign # 0 width , . precision type}

<strong>Examples:</strong>
• {x:>10} - Right-align in 10 spaces
• {x:0>10} - Right-align, pad with zeros
• {x:*^20} - Center in 20 spaces, fill with *
• {x:+10,.2f} - Sign, 10 width, commas, 2 decimals

<strong>When to use advanced formatting:</strong>

<strong>Use alignment for:</strong>
• Tables and columns
• Logs and reports
• Any data that needs to line up

<strong>Use number formatting for:</strong>
• Financial data (always :.2f)
• Percentages (:.1% or :.2%)
• Large numbers (:,)
• IDs and codes (:03, :05)

<strong>Use base formatting for:</strong>
• Color codes (hex)
• Network programming (binary, hex)
• Low-level debugging
• Protocol implementation

Advanced string formatting is what separates amateur-looking output from professional, polished results. Whether you're creating reports, logs, invoices, or dashboards, these techniques ensure your data looks clean, aligned, and easy to read. Master them, and your programs will not only work well but look amazing too!`,
      codeExamples: [
        {
          code: 'score = 0.95\nprint(f"Score: {score:.1%}")\n\nprice = 1234.5\nprint(f"Total: \\${price:,.2f}")\n\ncount = 5\nprint(f"Item {count:03}")',
          explanation: 'Advanced formatting examples',
        },
      ],
      concepts: ['string formatting', 'number formatting', 'text alignment'],
    },
    starterCode: '# Advanced formatting\nscore = 0.875\nprice = 1999.99\nitem_num = 7\n\n# Format as percentage\nprint(f"Success rate: {score:.1%}")\n\n# Format with commas\nprint(f"Price: \\${price:,.2f}")\n\n# Pad with zeros\nprint(f"Item number: {item_num:04}")',
    validationTests: [
      {
        description: 'Should format numbers',
        code: 'x = 0.5\nprint(f"{x:.0%}")',
        expectedOutput: '50%',
      },
    ],
    hints: [
      'Use :>10 for right-align, :<10 for left-align',
      'Use :,.2f for thousands separator and 2 decimals',
      'Use :.1% for percentage with 1 decimal',
    ],
    challenge: {
      prompt: `Format financial data:
1. Create: revenue = 125000, rate = 0.15
2. Print revenue with thousands separator and 2 decimals
3. Print rate as a percentage with 1 decimal place
4. Use format: "Revenue: $125,000.00"
5. Use format: "Growth: 15.0%"`,
      starterCode: '# Write your solution here\n',
      solution: 'revenue = 125000\nrate = 0.15\nprint(f"Revenue: ${revenue:,.2f}")\nprint(f"Growth: {rate:.1%}")',
      tests: [],
      explanation: 'Use :,.2f for money (commas and 2 decimals). Use :.1% for percentages (automatically multiplies by 100).',
      hints: [
        'Money format: {revenue:,.2f}',
        'Percentage format: {rate:.1%}',
        'The .2f means 2 decimal places'
      ],
      xpReward: 150,
    },
    xpReward: 150,
    gameType: 'quiz',
  },

  {
    id: 'lesson-3-5',
    moduleId: 'module-3',
    courseId: 'beginner',
    title: 'Working with Text',
    content: {
      explanation: `Practical String Operations 🔍

Now let's bring everything together and explore the practical string operations you'll use constantly in real programming! These techniques are essential for validating user input, searching text, extracting data, and solving everyday programming challenges. Master these patterns, and you'll handle any text processing task with confidence!

<strong>String validation methods - checking content:</strong>

These methods return True or False, making them perfect for validation logic!

<strong>text.isalpha() - Check if all characters are letters:</strong>

text = "Python"
print(text.isalpha())  # True (only letters)

text = "Python123"
print(text.isalpha())  # False (has numbers)

text = "Hello World"
print(text.isalpha())  # False (space isn't a letter!)

text = ""
print(text.isalpha())  # False (empty string)

Real-world use - validate names:
name = input("Enter name: ")
if name.isalpha():
    print("Valid name!")
else:
    print("Name should only contain letters!")

<strong>text.isdigit() - Check if all characters are digits:</strong>

text = "12345"
print(text.isdigit())  # True

text = "123abc"
print(text.isdigit())  # False (has letters)

text = "12.34"
print(text.isdigit())  # False (decimal point isn't a digit!)

Real-world use - validate numeric input:
age = input("Enter age: ")
if age.isdigit():
    age = int(age)
    print(f"You are {age} years old")
else:
    print("Please enter numbers only!")

<strong>text.isalnum() - Check if alphanumeric (letters OR numbers):</strong>

text = "Python3"
print(text.isalnum())  # True (letters and numbers)

text = "User123"
print(text.isalnum())  # True

text = "Hello World"
print(text.isalnum())  # False (space isn't alphanumeric)

text = "Test@123"
print(text.isalnum())  # False (@ isn't alphanumeric)

Real-world use - validate usernames:
username = input("Choose username: ")
if username.isalnum() and len(username) >= 5:
    print("Username accepted!")
else:
    print("Username must be 5+ characters, letters/numbers only!")

<strong>text.isspace() - Check if only whitespace:</strong>

text = "   "
print(text.isspace())  # True

text = "  \n\t  "
print(text.isspace())  # True (all whitespace chars)

text = "  hello  "
print(text.isspace())  # False (contains non-whitespace)

Real-world use - check if input is empty after stripping:
user_input = input("Enter text: ")
if user_input.isspace() or user_input == "":
    print("Input cannot be empty!")

<strong>text.isupper() / text.islower() - Check case:</strong>

text = "HELLO"
print(text.isupper())  # True

text = "hello"
print(text.islower())  # True

text = "Hello"
print(text.isupper())  # False
print(text.islower())  # False

text = "HELLO123"
print(text.isupper())  # True (numbers don't affect it)

<strong>Finding and searching - locate substrings:</strong>

<strong>The in operator - check if substring exists:</strong>

sentence = "Python is awesome"
print("Python" in sentence)     # True
print("awesome" in sentence)    # True
print("Java" in sentence)       # False
print("python" in sentence)     # False (case-sensitive!)

Real-world use - validate email:
email = input("Enter email: ")
if "@" in email and "." in email:
    print("Email format looks valid")
else:
    print("Invalid email format")

<strong>text.find(substring) - get position of substring:</strong>

Returns the index where substring starts, or -1 if not found:

text = "Python is awesome"
print(text.find("is"))       # 7 (starts at index 7)
print(text.find("awesome"))  # 10 (starts at index 10)
print(text.find("Java"))     # -1 (not found)

# Find from specific position
print(text.find("o"))        # 4 (first 'o')
print(text.find("o", 5))     # 16 (first 'o' after index 5)

Real-world use - extract username from email:
email = "alice@example.com"
at_pos = email.find("@")
if at_pos != -1:
    username = email[:at_pos]
    print(f"Username: {username}")  # Username: alice

<strong>text.rfind(substring) - find from right (last occurrence):</strong>

text = "Python is awesome and Python is great"
print(text.find("Python"))   # 0 (first occurrence)
print(text.rfind("Python"))  # 22 (last occurrence)

<strong>text.index(substring) - like find() but raises error if not found:</strong>

text = "Python is awesome"
print(text.index("is"))  # 7

# print(text.index("Java"))  # ValueError: substring not found

Use find() when substring might not exist, index() when you're certain it does!

<strong>text.count(substring) - count how many times substring appears:</strong>

text = "Python is awesome and Python is great"
print(text.count("Python"))  # 2
print(text.count("is"))      # 2
print(text.count("o"))       # 3

# Case-sensitive!
print(text.count("python"))  # 0 (lowercase not found)

Real-world use - analyze passwords:
password = input("Enter password: ")
if password.count(" ") > 0:
    print("Passwords cannot contain spaces!")

# Check for special characters
special_chars = "!@#$%^&*"
special_count = sum(password.count(char) for char in special_chars)
if special_count < 1:
    print("Password must contain at least 1 special character!")

<strong>String slicing - extracting parts:</strong>

Strings support the same slicing as lists!

word = "Python"

<strong>Basic indexing:</strong>
print(word[0])    # 'P' (first character)
print(word[1])    # 'y' (second character)
print(word[-1])   # 'n' (last character)
print(word[-2])   # 'o' (second-to-last)

<strong>Slicing [start:stop]:</strong>
print(word[0:3])  # 'Pyt' (indices 0, 1, 2)
print(word[:3])   # 'Pyt' (from start to index 3)
print(word[3:])   # 'hon' (from index 3 to end)
print(word[:])    # 'Python' (entire string)

<strong>Slicing with step [start:stop:step]:</strong>
print(word[::2])   # 'Pto' (every 2nd character)
print(word[1::2])  # 'yhn' (every 2nd, starting at index 1)
print(word[::-1])  # 'nohtyP' (reverse string!)

Real-world use - extract parts of data:

# Extract date components
date = "2024-12-25"
year = date[:4]      # "2024"
month = date[5:7]    # "12"
day = date[8:10]     # "25"
print(f"Year: {year}, Month: {month}, Day: {day}")

# Get file extension
filename = "document.pdf"
extension = filename[-3:]  # "pdf"
print(f"File type: {extension}")

# Extract domain from email
email = "alice@example.com"
at_pos = email.find("@")
domain = email[at_pos+1:]  # "example.com"
print(f"Domain: {domain}")

<strong>Reversing strings - the [::-1] trick:</strong>

text = "Python"
reversed_text = text[::-1]
print(reversed_text)  # "nohtyP"

# Check if palindrome
word = "radar"
if word == word[::-1]:
    print(f"{word} is a palindrome!")

<strong>Practical data cleaning patterns:</strong>

<strong>Clean and validate email:</strong>
def validate_email(email):
    # Remove whitespace and convert to lowercase
    email = email.strip().lower()

    # Check basic format
    if "@" not in email or "." not in email:
        return None

    # Count @ symbols (should be exactly 1)
    if email.count("@") != 1:
        return None

    # Split into username and domain
    at_pos = email.find("@")
    username = email[:at_pos]
    domain = email[at_pos+1:]

    # Validate username and domain aren't empty
    if not username or not domain:
        return None

    # Check domain has extension
    if "." not in domain:
        return None

    return email

# Test it
emails = ["  Alice@Example.COM  ", "invalid", "test@domain.com"]
for email in emails:
    result = validate_email(email)
    print(f"{email} -> {result}")

<strong>Extract and format phone numbers:</strong>
def clean_phone(phone):
    # Remove common separators
    phone = phone.replace(" ", "")
    phone = phone.replace("-", "")
    phone = phone.replace("(", "")
    phone = phone.replace(")", "")
    phone = phone.replace(".", "")

    # Check if only digits remain
    if phone.isdigit() and len(phone) == 10:
        # Format as (XXX) XXX-XXXX
        return f"({phone[:3]}) {phone[3:6]}-{phone[6:]}"

    return None

# Test it
phones = ["555-123-4567", "(555) 123 4567", "555.123.4567"]
for phone in phones:
    result = clean_phone(phone)
    print(f"{phone} -> {result}")

<strong>Parse CSV-style data:</strong>
def parse_csv_line(line):
    # Split on comma
    fields = line.split(",")

    # Strip whitespace from each field
    fields = [field.strip() for field in fields]

    return fields

data = "Alice Smith, 25, Engineer, Boston"
parsed = parse_csv_line(data)
print(parsed)  # ['Alice Smith', '25', 'Engineer', 'Boston']

<strong>Extract hashtags from text:</strong>
def extract_hashtags(text):
    words = text.split()
    hashtags = []

    for word in words:
        if word.startswith("#") and len(word) > 1:
            # Remove punctuation from end
            cleaned = word.rstrip(".,!?;")
            hashtags.append(cleaned)

    return hashtags

post = "Loving #Python and #coding! Best #community ever."
tags = extract_hashtags(post)
print(tags)  # ['#Python', '#coding', '#community']

<strong>Real-world text processing examples:</strong>

<strong>Validate strong password:</strong>
def is_strong_password(password):
    if len(password) < 8:
        return False, "Too short (minimum 8 characters)"

    if not any(c.isupper() for c in password):
        return False, "Must contain uppercase letter"

    if not any(c.islower() for c in password):
        return False, "Must contain lowercase letter"

    if not any(c.isdigit() for c in password):
        return False, "Must contain digit"

    special_chars = "!@#$%^&*"
    if not any(c in special_chars for c in password):
        return False, "Must contain special character"

    return True, "Strong password!"

password = "MyP@ss123"
valid, message = is_strong_password(password)
print(f"{password}: {message}")

<strong>Censor profanity:</strong>
def censor_text(text, bad_words):
    words = text.split()
    censored = []

    for word in words:
        # Check if word (case-insensitive) is in bad words list
        if word.lower() in [bw.lower() for bw in bad_words]:
            censored.append("*" * len(word))
        else:
            censored.append(word)

    return " ".join(censored)

text = "This is a bad example of bad text"
bad_words = ["bad"]
clean = censor_text(text, bad_words)
print(clean)  # "This is a *<strong> example of </strong>* text"

<strong>Common beginner mistakes:</strong>

⚠️ <strong>Forgetting strings are case-sensitive:</strong>
if "Python" in "python is awesome":  # False!

<strong>Fix:</strong> Convert to same case: if "Python".lower() in "python is awesome".lower():

⚠️ <strong>Not handling -1 from find():</strong>
text = "hello"
pos = text.find("x")
print(text[pos])  # Accesses text[-1] if not found!

<strong>Fix:</strong> Check first: if pos != -1: print(text[pos])

⚠️ <strong>Forgetting to strip user input:</strong>
name = input("Name: ")  # User types "  Alice  "
if name == "Alice":  # False because of spaces!

<strong>Fix:</strong> name = input("Name: ").strip()

⚠️ <strong>Slicing past string length:</strong>
text = "hi"
print(text[0:100])  # "hi" (Python handles it gracefully!)

Actually this DOESN'T error - Python is forgiving with slices!

<strong>Pro tips:</strong>

✅ <strong>Always strip() user input:</strong> Remove accidental whitespace
✅ <strong>Use lower() for case-insensitive comparisons:</strong> More robust
✅ <strong>Check substring existence with in before using index():</strong> Prevents errors
✅ <strong>Use isdigit() before int():</strong> Avoid conversion errors
✅ <strong>Combine validation methods:</strong> is_alpha() + length checks + more
✅ <strong>The [::-1] trick reverses strings:</strong> Super useful pattern
✅ <strong>Use find() instead of index() when substring might not exist:</strong> Safer

<strong>String operation cheat sheet:</strong>

<strong>Validation:</strong>
• .isalpha() - Only letters?
• .isdigit() - Only numbers?
• .isalnum() - Letters or numbers?
• .isspace() - Only whitespace?
• .isupper() / .islower() - Check case

<strong>Searching:</strong>
• in - Check if substring exists
• .find(sub) - Get position (or -1)
• .count(sub) - Count occurrences
• .startswith(pre) - Check prefix
• .endswith(suf) - Check suffix

<strong>Slicing:</strong>
• [0] - First character
• [-1] - Last character
• [:3] - First 3 characters
• [3:] - From index 3 onwards
• [::-1] - Reverse string

These practical string operations are the bread and butter of text processing. Whether you're validating forms, parsing data files, cleaning datasets, or building text-based applications, you'll use these patterns constantly. Practice combining them creatively to solve real-world problems!`,
      codeExamples: [
        {
          code: '# Email validation\nemail = "user@example.com"\nif "@" in email and "." in email:\n    print("Valid email format")\n\n# Clean and format name\nname = "  john DOE  "\nclean_name = name.strip().title()\nprint(clean_name)  # John Doe',
          explanation: 'Practical string operations',
        },
      ],
      concepts: ['string validation', 'substring search', 'string slicing', 'text processing'],
    },
    starterCode: '# Working with text\nuser_input = "  Hello@Python.org  "\n\n# Clean the input\ncleaned = user_input.strip().lower()\nprint(cleaned)\n\n# Check if it contains @\nif "@" in cleaned:\n    print("Looks like an email!")\n\n# Count characters\nprint(f"Length: {len(cleaned)}")\nprint(f"Vowels: {cleaned.count(\'a\') + cleaned.count(\'e\') + cleaned.count(\'i\') + cleaned.count(\'o\') + cleaned.count(\'u\')}")',
    validationTests: [
      {
        description: 'Should work with text',
        code: 'text = "hello"\nprint(text[0])',
        expectedOutput: 'h',
      },
    ],
    hints: [
      'Use in to check if substring exists',
      'Use .find() to get position of substring',
      'String slicing works like list slicing',
    ],
    challenge: {
      prompt: `Practice string searching and checking:
1. Create: sentence = "The quick brown fox jumps over the lazy dog"
2. Check if "fox" is in the sentence using "in" and print the result
3. Find the position of "brown" using .find() and print it
4. Count how many times "the" appears using .count() (case-sensitive!) and print it
5. Check if the sentence starts with "The" using .startswith() and print it`,
      starterCode: '# Write your solution here\n',
      solution: 'sentence = "The quick brown fox jumps over the lazy dog"\nprint("fox" in sentence)\nprint(sentence.find("brown"))\nprint(sentence.count("the"))\nprint(sentence.startswith("The"))',
      tests: [],
      explanation: 'Use "in" to check if a substring exists. .find() returns the index position. .count() counts occurrences. .startswith() checks the beginning.',
      hints: [
        'Check membership: "fox" in sentence',
        'Find position: sentence.find("brown")',
        'Count: sentence.count("the")'
      ],
      xpReward: 150,
    },
    xpReward: 200,
    gameType: 'quiz',
  },
];
