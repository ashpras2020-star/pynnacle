// Module 8: File Input/Output
// 5 lessons covering file operations, reading, writing, and text file handling

import type { Lesson } from '@/types/lesson';

export const module8Lessons: Lesson[] = [
  // Lesson 8-1: Opening and Closing Files
  {
    id: 'lesson-10-1',
    moduleId: 'module-10',
    courseId: 'beginner',
    title: 'Opening and Closing Files',
    content: {
      explanation: `Welcome to File I/O! 📁

Files are how programs save and retrieve data permanently. Think of files as your program's long-term memory - while variables forget everything when your program ends, files remember data forever! Whether you're building a game that saves progress, an app that stores user settings, or a data analysis tool that processes information, you'll work with files constantly.

<strong>Understanding the open() function:</strong>

Python's built-in \`open()\` function is your gateway to working with files. It's like unlocking a door - you specify which file you want to access and what you want to do with it. The basic syntax is beautifully simple:

open(filename, mode)

The filename is the path to your file, and the mode tells Python what you're planning to do. Here are the modes you'll use most often:

<strong>The four essential file modes:</strong>

<strong>\`'r'\` - Read mode (the default):</strong> Opens an existing file to read its contents. If the file doesn't exist, Python raises a FileNotFoundError. Use this when you want to look at data without changing it - perfect for loading configuration files, reading user data, or processing information.

<strong>\`'w'\` - Write mode (use with caution!):</strong> Opens a file for writing. Here's the important part: if the file exists, Python COMPLETELY ERASES IT and starts fresh! If it doesn't exist, Python creates a new file. Use this when you want to save brand new data or intentionally overwrite old data.

<strong>\`'a'\` - Append mode (safer for adding data):</strong> Opens a file and lets you add new content to the end without erasing what's already there. If the file doesn't exist, Python creates it. Perfect for log files, adding entries to a list, or any situation where you want to preserve existing content.

<strong>\`'x'\` - Exclusive creation mode:</strong> Creates a NEW file but fails if the file already exists. This is a safety feature - use it when you absolutely don't want to accidentally overwrite existing files.

<strong>Why you must close files properly:</strong>

When you open a file, your operating system allocates resources to manage it. If you don't close files, you create several problems:

• <strong>Resource leaks:</strong> Your computer has a limit on open files. Leave too many open and your program (or even your computer!) might crash.
• <strong>Data loss:</strong> Python buffers (temporarily stores) data before writing to disk for efficiency. If you don't close properly, this buffered data might never actually get saved!
• <strong>File corruption:</strong> Other programs might not be able to access files you've left open.
• <strong>Professional code quality:</strong> Properly managing resources is a hallmark of good programming.

<strong>The with statement - your new best friend:</strong>

The \`with\` statement is Python's elegant solution to file management. It automatically closes files for you, even if an error occurs! Here's how it works:

\`\`\`python
with open('data.txt', 'r') as file:
    content = file.read()
    # Do whatever you need with the content
# File is automatically closed here - no file.close() needed!
\`\`\`

The magic word \`with\` creates a "context manager" that handles cleanup automatically. This is the Pythonic way to work with files - professional developers use \`with\` almost exclusively because it prevents bugs and makes code cleaner.

<strong>How file objects work:</strong>

When you open a file, Python gives you a file object packed with useful methods:

• \`.read()\` - Reads the entire file into one string
• \`.readline()\` - Reads just one line at a time
• \`.readlines()\` - Reads all lines into a list
• \`.write()\` - Writes data to the file

You'll learn to use each of these strategically based on your needs!

<strong>Common beginner mistakes to avoid:</strong>

⚠️ Forgetting to close files when not using \`with\` - always use \`with\` to avoid this entirely!
⚠️ Using write mode ('w') when you meant append ('a') - goodbye data!
⚠️ Trying to read from a file that doesn't exist without handling the error
⚠️ Opening too many files simultaneously - close what you're not actively using

<strong>Real-world applications:</strong>

Understanding file I/O unlocks so many possibilities: saving game progress, storing user preferences, logging application events, processing data files, creating reports, backing up information, and much more. Every substantial program you build will likely need to save and load data!

The key principle to remember: Always use the \`with\` statement. It's safer, cleaner, and the professional standard. Let's practice opening and working with files!
`,
      codeExamples: [
        {
          title: 'Basic File Opening',
          code: `# Manual open and close
file = open('data.txt', 'r')
content = file.read()
file.close()

print(content)

# Check if file is closed
print(file.closed)  # True`,
          explanation: 'Open file, read it, then close it manually'
        },
        {
          title: 'Using with Statement (Recommended)',
          code: `# Automatically handles closing
with open('data.txt', 'r') as file:
    content = file.read()
    print(content)

# File is automatically closed here
print(file.closed)  # True`,
          explanation: 'with statement automatically closes files'
        },
        {
          title: 'Different File Modes',
          code: `# Read mode (default)
with open('input.txt', 'r') as f:
    data = f.read()

# Write mode (overwrites!)
with open('output.txt', 'w') as f:
    f.write("Hello, World!")

# Append mode (adds to end)
with open('log.txt', 'a') as f:
    f.write("New log entry\\n")

# Exclusive creation (fails if exists)
try:
    with open('new_file.txt', 'x') as f:
        f.write("Brand new file")
except FileExistsError:
    print("File already exists")`,
          explanation: 'Different modes for different operations'
        },
        {
          title: 'Checking if File Exists',
          code: `import os

filename = 'data.txt'

# Check if file exists
if os.path.exists(filename):
    with open(filename, 'r') as file:
        content = file.read()
        print(content)
else:
    print(f"{filename} does not exist")

# Alternative with path module
from pathlib import Path

file_path = Path('data.txt')
if file_path.exists():
    with open(file_path, 'r') as file:
        content = file.read()`,
          explanation: 'Check file existence before opening'
        }
      ],
      concepts: ['open()', 'file modes', 'with statement', 'file.close()', 'context managers', 'file objects']
    },
    starterCode: `# TODO: Use with statement to open a file named 'message.txt' in read mode
# TODO: Read the contents and store in a variable
# TODO: Print the contents
# TODO: Note: For this exercise, assume the file exists

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Uses with statement and open() function'
      }
    ],
    hints: [
      'Use with open("message.txt", "r") as file:',
      'Read contents with content = file.read()',
      'Print with print(content)'
    ],
    challenge: {
      prompt: `Practice opening and closing files:
1. Write code to open a file called "data.txt" in read mode
2. Use the with statement for automatic closing
3. Read and print the entire content
4. The file will close automatically when the with block ends`,
      starterCode: '# Write your solution here\n',
      solution: 'with open("data.txt", "r") as file:\n    content = file.read()\n    print(content)',
      tests: [],
      explanation: 'The with statement automatically closes files when done. Use "r" mode for reading. file.read() gets all content.',
      hints: [
        'Start with: with open("data.txt", "r") as file:',
        'Read all: content = file.read()',
        'Print the content'
      ],
      xpReward: 150,
    },
    xpReward: 100,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 8-2: Reading Files
  {
    id: 'lesson-10-2',
    moduleId: 'module-10',
    courseId: 'beginner',
    title: 'Reading Files',
    content: {
      explanation: `Reading Files in Python 📖

Now that you know how to open files, let's learn how to actually read and process their contents! Python gives you several powerful methods for reading files, each designed for different situations. Choosing the right method can make your code faster, cleaner, and more efficient.

<strong>The four ways to read file contents:</strong>

<strong>Method 1: read() - The "read everything at once" approach</strong>

The \`.read()\` method loads the entire file contents into one big string. It's simple and convenient:

\`\`\`python
with open('story.txt', 'r') as file:
    content = file.read()
    print(content)  # Entire file as one string
\`\`\`

When to use it: Small to medium-sized files (under a few megabytes) where you need all the content at once. Perfect for configuration files, short documents, or when you need to search through the entire content.

⚠️ Warning: Don't use \`.read()\` on huge files! Loading a 1GB file into memory will crash your program or freeze your computer.

<strong>Method 2: readline() - The "one line at a time" approach</strong>

The \`.readline()\` method reads just the next line each time you call it:

\`\`\`python
with open('data.txt', 'r') as file:
    first_line = file.readline()
    second_line = file.readline()
\`\`\`

When to use it: When you need precise control over reading, want to read just the first few lines, or are building your own custom reading logic.

<strong>Method 3: readlines() - The "all lines as a list" approach</strong>

The \`.readlines()\` method reads all lines and puts each one in a list:

\`\`\`python
with open('names.txt', 'r') as file:
    lines = file.readlines()
    # lines = ['Alice\\n', 'Bob\\n', 'Charlie\\n']
\`\`\`

When to use it: When you need to access lines by index, count lines, or use list operations. Each line keeps its newline character (\\n) at the end, which you'll often want to remove.

<strong>Method 4: Iterating directly (Most Pythonic!)</strong>

You can loop directly over a file object - this is the method professional Python developers use most:

\`\`\`python
with open('log.txt', 'r') as file:
    for line in file:
        print(line.strip())
\`\`\`

Why this is best: It's memory efficient (reads one line at a time), clean and readable, and works perfectly with huge files. Python handles all the details automatically!

<strong>Understanding newline characters (\\n):</strong>

When you read lines from a file, each line usually ends with \\n (the newline character). This invisible character marks where one line ends and the next begins. You'll often want to remove it using \`.strip()\`:

\`\`\`python
line = "Hello, World!\\n"
clean = line.strip()  # "Hello, World!" - \\n removed!
\`\`\`

The \`.strip()\` method removes whitespace (spaces, tabs, newlines) from both ends of a string. You can also use:
• \`.lstrip()\` - Remove whitespace from the left (start) only
• \`.rstrip()\` - Remove whitespace from the right (end) only

<strong>Reading specific amounts:</strong>

You can tell \`.read()\` exactly how many characters to read:

\`\`\`python
content = file.read(100)  # Read first 100 characters only
\`\`\`

This is useful for:
• Reading file headers or previews
• Processing large files in chunks
• Building custom file parsers

<strong>File position and seeking:</strong>

Python keeps track of where you are in a file. After you read to the end, the "cursor" is at the end. To read again, you need to "rewind":

\`\`\`python
file.seek(0)  # Move cursor back to the beginning
\`\`\`

Think of it like a tape player - \`.seek(0)\` rewinds to the start!

<strong>Choosing the right method - Quick guide:</strong>

✅ Use <strong>iteration</strong> (\`for line in file\`) as your default - it's efficient and Pythonic
✅ Use <strong>read()</strong> for small files when you need all content as one string
✅ Use <strong>readlines()</strong> when you need to access lines by index or count them
✅ Use <strong>readline()</strong> when building custom reading logic or reading just a few lines

<strong>Common patterns you'll use constantly:</strong>

Process each line:
\`\`\`python
for line in file:
    line = line.strip()  # Remove \\n
    if line:  # Skip empty lines
        process(line)
\`\`\`

Count lines:
\`\`\`python
line_count = sum(1 for line in file)
\`\`\`

Find specific content:
\`\`\`python
for line in file:
    if 'ERROR' in line:
        print(line)
\`\`\`

<strong>Common mistakes to avoid:</strong>

⚠️ Forgetting to strip() newline characters and getting unexpected extra blank lines
⚠️ Using read() on large files and running out of memory
⚠️ Trying to read a file multiple times without seeking back to the start
⚠️ Not handling empty lines properly

Reading files is a fundamental skill you'll use in almost every real-world project. Practice different methods to get comfortable with each one!
`,
      codeExamples: [
        {
          title: 'Reading Entire File',
          code: `# Read all at once
with open('story.txt', 'r') as file:
    content = file.read()
    print(content)
    print(f"Total characters: {len(content)}")

# Read with size limit
with open('large_file.txt', 'r') as file:
    first_100 = file.read(100)
    print(first_100)`,
          explanation: 'read() loads entire file into memory'
        },
        {
          title: 'Reading Line by Line',
          code: `# Using readline()
with open('data.txt', 'r') as file:
    line1 = file.readline()
    line2 = file.readline()
    print("First line:", line1)
    print("Second line:", line2)

# Reading until empty
with open('data.txt', 'r') as file:
    while True:
        line = file.readline()
        if not line:  # Empty string means end of file
            break
        print(line.strip())`,
          explanation: 'readline() reads one line at a time'
        },
        {
          title: 'Reading All Lines as List',
          code: `# Get list of all lines
with open('names.txt', 'r') as file:
    lines = file.readlines()

print(f"Number of lines: {len(lines)}")

# Process each line
for line in lines:
    clean_line = line.strip()
    print(f"Name: {clean_line}")

# List comprehension to clean lines
with open('names.txt', 'r') as file:
    names = [line.strip() for line in file.readlines()]

print(names)`,
          explanation: 'readlines() returns a list of all lines'
        },
        {
          title: 'Iterating Over File (Best Practice)',
          code: `# Most memory-efficient way
with open('log.txt', 'r') as file:
    for line in file:
        line = line.strip()
        if line:  # Skip empty lines
            print(line)

# Count lines
with open('data.txt', 'r') as file:
    line_count = sum(1 for line in file)
    print(f"Total lines: {line_count}")

# Find specific content
with open('users.txt', 'r') as file:
    for line in file:
        if 'admin' in line:
            print(f"Found admin: {line.strip()}")`,
          explanation: 'Iterating is most Pythonic and memory-efficient'
        },
        {
          title: 'Processing File Data',
          code: `# Read numbers from file and calculate average
with open('scores.txt', 'r') as file:
    scores = []
    for line in file:
        score = int(line.strip())
        scores.append(score)

    if scores:
        average = sum(scores) / len(scores)
        print(f"Average score: {average:.2f}")

# Read CSV-like data
with open('data.csv', 'r') as file:
    for line in file:
        name, age, city = line.strip().split(',')
        print(f"{name} is {age} years old from {city}")`,
          explanation: 'Process and parse file contents'
        }
      ],
      concepts: ['read()', 'readline()', 'readlines()', 'file iteration', 'strip()', 'file processing']
    },
    starterCode: `# TODO: Open a file named 'numbers.txt'
# TODO: Read all lines and convert to integers
# TODO: Calculate and print the sum of all numbers
# TODO: For this exercise, assume each line contains one number

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Reads file and processes line-by-line'
      }
    ],
    hints: [
      'Use with open("numbers.txt", "r") as file:',
      'Iterate with for line in file:',
      'Convert each line: int(line.strip())',
      'Use sum() on a list of numbers'
    ],
    challenge: {
      prompt: `Read and process a file line by line:
1. Open "names.txt" for reading
2. Use a for loop to iterate through each line
3. Strip whitespace from each line
4. Print each name in uppercase
5. Count how many names total`,
      starterCode: '# Write your solution here\n',
      solution: 'count = 0\nwith open("names.txt", "r") as file:\n    for line in file:\n        name = line.strip()\n        print(name.upper())\n        count += 1\nprint(f"Total names: {count}")',
      tests: [],
      explanation: 'Iterate files with: for line in file. Always use strip() to remove \\n. Process each line as you read it.',
      hints: [
        'Loop: for line in file:',
        'Clean: name = line.strip()',
        'Count with a counter variable'
      ],
      xpReward: 150,
    },
    xpReward: 100,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 8-3: Writing Files
  {
    id: 'lesson-10-3',
    moduleId: 'module-10',
    courseId: 'beginner',
    title: 'Writing Files',
    content: {
      explanation: `Writing to Files 📝

Writing files is how your programs save data permanently! Whether you're creating save files for games, exporting data, generating reports, or logging events, writing to files is an essential skill. Python makes it straightforward, but there are important details you need to know to avoid losing data!

<strong>The two main writing modes - Understanding the difference is critical:</strong>

<strong>Write Mode ('w') - The "start fresh" mode:</strong>

When you open a file in write mode, Python does something dramatic - it COMPLETELY ERASES any existing file with that name and starts with a blank slate! If the file doesn't exist, Python creates it.

\`\`\`python
with open('output.txt', 'w') as file:
    file.write("This is new content")
# If output.txt existed, its old contents are GONE forever!
\`\`\`

When to use write mode:
• Creating new files from scratch
• Intentionally replacing old data with new data
• Exporting fresh reports or data files
• You're 100% sure you want to overwrite existing content

⚠️ <strong>Critical Warning:</strong> Write mode deletes everything! Always double-check that you actually want to erase the existing file. Many beginners accidentally lose important data by using 'w' when they meant 'a'!

<strong>Append Mode ('a') - The "add to the end" mode:</strong>

Append mode is much safer - it adds new content to the end of the file without erasing what's already there. If the file doesn't exist, Python creates it (just like write mode).

\`\`\`python
with open('log.txt', 'a') as file:
    file.write("New entry\\n")
# Existing content is preserved, new line added at end!
\`\`\`

When to use append mode:
• Adding entries to log files
• Growing lists of data over time
• Any situation where you want to keep existing content
• When you're not sure if the file has important data

<strong>The two writing methods:</strong>

<strong>Method 1: write() - Write a single string</strong>

The \`.write()\` method takes one string and writes it to the file. Important: It does NOT automatically add a newline!

\`\`\`python
file.write("Hello, World!")  # No newline added
file.write("Next line")      # Appears on same line!

# Result in file: "Hello, World!Next line"
\`\`\`

To create separate lines, you MUST add \\n explicitly:

\`\`\`python
file.write("Line 1\\n")
file.write("Line 2\\n")
# Result: Two separate lines!
\`\`\`

The write() method returns the number of characters it wrote, though you usually don't need this information.

<strong>Method 2: writelines() - Write multiple strings at once</strong>

The \`.writelines()\` method takes a list of strings and writes them all. Despite its name, it does NOT add newlines between them!

\`\`\`python
lines = ["First\\n", "Second\\n", "Third\\n"]
file.writelines(lines)
# Each string needs \\n or they'll all run together!
\`\`\`

This is useful when you have a list of pre-formatted strings ready to write.

<strong>The newline character (\\n) - Your responsibility!</strong>

Unlike print(), which automatically adds newlines, file writing methods don't. You must explicitly add \\n wherever you want line breaks:

\`\`\`python
# Without \\n - everything runs together:
file.write("First")
file.write("Second")
# File contains: "FirstSecond"

# With \\n - proper lines:
file.write("First\\n")
file.write("Second\\n")
# File contains:
# First
# Second
\`\`\`

<strong>Best practices for safe file writing:</strong>

✅ <strong>Always use the with statement</strong> - It ensures data gets written even if errors occur
✅ <strong>Double-check your mode</strong> - Use 'a' unless you specifically want to erase the file
✅ <strong>Add \\n explicitly</strong> - Don't forget line breaks!
✅ <strong>Check before overwriting</strong> - Use os.path.exists() to verify important files won't be lost
✅ <strong>Handle errors</strong> - File writing can fail (disk full, no permissions, etc.)

<strong>Common patterns for writing data:</strong>

Write a list of items:
\`\`\`python
items = ['apple', 'banana', 'cherry']
with open('fruits.txt', 'w') as file:
    for item in items:
        file.write(item + '\\n')
\`\`\`

Using join (more elegant):
\`\`\`python
with open('fruits.txt', 'w') as file:
    file.write('\\n'.join(items))
\`\`\`

Append timestamped entries:
\`\`\`python
from datetime import datetime
with open('log.txt', 'a') as file:
    timestamp = datetime.now()
    file.write(f"{timestamp}: User logged in\\n")
\`\`\`

<strong>Checking before overwriting (prevents data loss):</strong>

\`\`\`python
import os

if os.path.exists('important.txt'):
    response = input("File exists. Overwrite? (y/n): ")
    if response.lower() != 'y':
        print("Cancelled - file preserved!")
        exit()

with open('important.txt', 'w') as file:
    file.write("New content")
\`\`\`

<strong>Common mistakes that cause problems:</strong>

⚠️ Using 'w' when you meant 'a' - data loss!
⚠️ Forgetting to add \\n - everything runs together in one line
⚠️ Not using with statement - data might not actually get saved
⚠️ Assuming write() adds newlines automatically (it doesn't!)
⚠️ Writing to files without checking disk space or permissions

<strong>Real-world applications:</strong>

You'll use file writing constantly for:
• Saving game progress and user preferences
• Creating log files to track application behavior
• Exporting data to share with other programs
• Generating reports and documentation
• Backing up important information
• Recording user actions and events

Remember: With great power comes great responsibility! Always be mindful of write mode's destructive nature, and when in doubt, use append mode. Better to add duplicate data than to lose important information!
`,
      codeExamples: [
        {
          title: 'Basic Writing',
          code: `# Write to new file
with open('output.txt', 'w') as file:
    file.write("Hello, World!\\n")
    file.write("This is line 2\\n")
    file.write("This is line 3\\n")

# Write multiple times
with open('message.txt', 'w') as file:
    for i in range(5):
        file.write(f"Line {i + 1}\\n")`,
          explanation: 'write() adds text to file'
        },
        {
          title: 'Appending to Files',
          code: `# Add to existing file
with open('log.txt', 'a') as file:
    file.write("New entry at 10:00 AM\\n")

# Multiple appends
with open('log.txt', 'a') as file:
    entries = [
        "11:00 AM - User logged in\\n",
        "11:30 AM - File uploaded\\n",
        "12:00 PM - User logged out\\n"
    ]
    for entry in entries:
        file.write(entry)

# Alternative with writelines()
with open('log.txt', 'a') as file:
    file.writelines(entries)`,
          explanation: 'Append mode adds without deleting existing content'
        },
        {
          title: 'Writing Lists',
          code: `# Write list items
fruits = ['apple', 'banana', 'cherry', 'date']

with open('fruits.txt', 'w') as file:
    for fruit in fruits:
        file.write(fruit + '\\n')

# Using writelines (remember \\n!)
with open('fruits.txt', 'w') as file:
    lines = [fruit + '\\n' for fruit in fruits]
    file.writelines(lines)

# Using join (most Pythonic)
with open('fruits.txt', 'w') as file:
    file.write('\\n'.join(fruits))`,
          explanation: 'Different ways to write lists to files'
        },
        {
          title: 'Safe File Writing',
          code: `import os

filename = 'important.txt'

# Check if file exists before overwriting
if os.path.exists(filename):
    response = input(f"{filename} exists. Overwrite? (y/n): ")
    if response.lower() != 'y':
        print("Cancelled")
        exit()

with open(filename, 'w') as file:
    file.write("New content")

# Or use append mode to be safe
with open(filename, 'a') as file:
    file.write("Added content\\n")`,
          explanation: 'Check before overwriting important files'
        },
        {
          title: 'Practical Example: Saving User Data',
          code: `# Save user scores
def save_scores(filename, scores):
    """Save scores to file"""
    with open(filename, 'w') as file:
        for name, score in scores.items():
            file.write(f"{name},{score}\\n")

# Save game progress
def save_progress(filename, level, points):
    """Append progress to log"""
    with open(filename, 'a') as file:
        import datetime
        timestamp = datetime.datetime.now()
        file.write(f"{timestamp}|Level:{level}|Points:{points}\\n")

# Usage
scores = {'Alice': 95, 'Bob': 87, 'Charlie': 92}
save_scores('scores.txt', scores)
save_progress('game_log.txt', 5, 1000)`,
          explanation: 'Practical file writing for saving data'
        }
      ],
      concepts: ['write mode', 'append mode', 'write()', 'writelines()', 'newlines', 'file safety']
    },
    starterCode: `# TODO: Create a list of 5 favorite movies
# TODO: Write each movie to a file named 'movies.txt', one per line
# TODO: Make sure each movie is on its own line

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Writes to file with proper newlines'
      }
    ],
    hints: [
      'Create movies = ["Movie 1", "Movie 2", ...]',
      'Open with "w" mode',
      'Add \\n after each movie',
      'Use for loop to write each movie'
    ],
    challenge: {
      prompt: `Write data to a file:
1. Create a list of 3 items: ["Apple", "Banana", "Cherry"]
2. Open "fruits.txt" in write mode ("w")
3. Write each item to the file, one per line
4. Don't forget to add \\n after each item
5. The file will be saved automatically`,
      starterCode: '# Write your solution here\n',
      solution: 'fruits = ["Apple", "Banana", "Cherry"]\nwith open("fruits.txt", "w") as file:\n    for fruit in fruits:\n        file.write(fruit + "\\n")',
      tests: [],
      explanation: 'Use "w" mode to write. Add \\n for new lines. The with statement saves and closes automatically.',
      hints: [
        'Open: with open("fruits.txt", "w") as file:',
        'Write: file.write(fruit + "\\n")',
        'Loop through all fruits'
      ],
      xpReward: 150,
    },
    xpReward: 125,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 8-4: File Paths and Directories
  {
    id: 'lesson-10-4',
    moduleId: 'module-10',
    courseId: 'beginner',
    title: 'File Paths and Directories',
    content: {
      explanation: `Navigating File Paths and Directories 🗺️

File paths are like addresses for files on your computer. Just as you need an address to find a house, Python needs a path to find a file. Understanding paths is crucial because your programs will often need to access files in different locations, create organized folder structures, and work across different operating systems.

<strong>The two types of paths - Absolute vs Relative:</strong>

<strong>Absolute Paths - The "complete address" approach:</strong>

An absolute path is the FULL path from the root of your file system to the file. It's like giving someone the complete address including country, state, city, street, and house number.

Windows absolute path:
\`C:\\Users\\Alice\\Documents\\projects\\data.txt\`

Mac/Linux absolute path:
\`/home/alice/documents/projects/data.txt\`

When to use absolute paths:
• When you know the exact location of a file
• In production applications with fixed file locations
• When accessing system files or user directories
• When you need to be 100% certain about the file location

<strong>Relative Paths - The "directions from here" approach:</strong>

A relative path describes where a file is compared to your current location (your "current working directory"). It's like saying "go two doors down" instead of giving the full address.

Examples:
• \`data.txt\` - File in the current directory
• \`data/input.txt\` - File in the "data" subfolder
• \`../config.txt\` - File in the parent directory
• \`../../backup/old.txt\` - Two directories up, then into backup folder

When to use relative paths:
• In portable applications that run from any location
• When organizing project files in a consistent structure
• For better code portability between computers
• When working with files near your Python script

<strong>Special path symbols you need to know:</strong>

• \`.\` means "current directory" (where you are now)
• \`..\` means "parent directory" (one level up)
• \`/\` is the directory separator (works on Windows, Mac, AND Linux!)

<strong>The os module - Traditional path handling:</strong>

Python's built-in \`os\` module provides functions for working with paths and directories:

\`\`\`python
import os

# Find where you are:
current_dir = os.getcwd()  # Get Current Working Directory

# Join path parts safely (handles / vs \\ automatically):
file_path = os.path.join('data', 'files', 'input.txt')
# Result: 'data/files/input.txt' (or 'data\\files\\input.txt' on Windows)

# Check if something exists:
if os.path.exists('data.txt'):
    print("File found!")

# Check what type it is:
os.path.isfile('data.txt')  # True if it's a file
os.path.isdir('data')       # True if it's a directory

# List everything in a directory:
files = os.listdir('.')  # List current directory contents
\`\`\`

<strong>The pathlib module - Modern Python's better way:</strong>

Since Python 3.4, there's a more elegant approach using \`pathlib\`. It's object-oriented, more intuitive, and works seamlessly across all operating systems:

\`\`\`python
from pathlib import Path

# Create a path object:
file_path = Path('data') / 'input.txt'  # Use / operator to join!

# Check if it exists:
if file_path.exists():
    content = file_path.read_text()  # Read directly!

# Get information about the path:
print(file_path.name)        # 'input.txt'
print(file_path.parent)      # 'data'
print(file_path.suffix)      # '.txt'
print(file_path.stem)        # 'input'

# Write to file directly:
output = Path('output.txt')
output.write_text("Hello!")
\`\`\`

Why pathlib is better:
✅ More readable and Pythonic
✅ Cleaner syntax with the / operator
✅ Built-in methods for common operations
✅ Automatically handles OS differences
✅ Returns Path objects that work everywhere

<strong>Creating directories programmatically:</strong>

Your programs often need to create organized folder structures:

Old way with os:
\`\`\`python
import os

os.mkdir('output')  # Create single directory
os.makedirs('data/processed/results', exist_ok=True)  # Create nested
\`\`\`

Modern way with pathlib:
\`\`\`python
from pathlib import Path

output_dir = Path('output')
output_dir.mkdir(exist_ok=True)  # Create, don't error if exists

nested = Path('data/processed/results')
nested.mkdir(parents=True, exist_ok=True)  # Create all parent dirs
\`\`\`

The \`exist_ok=True\` parameter prevents errors if the directory already exists. The \`parents=True\` parameter creates all parent directories needed.

<strong>Cross-platform compatibility - A critical concern:</strong>

Different operating systems use different path separators:
• Windows: \\\\ (backslash)
• Mac/Linux: / (forward slash)

Good news: In Python strings, you can ALWAYS use / and Python converts it automatically! Or better yet, use pathlib's / operator or os.path.join().

❌ Bad (Windows-only):
\`\`\`python
path = 'C:\\Users\\Alice\\file.txt'  # Breaks on Mac/Linux!
\`\`\`

✅ Good (works everywhere):
\`\`\`python
path = Path('C:/Users/Alice/file.txt')  # Works on all systems!
path = Path.home() / 'file.txt'  # Even better - finds user's home directory
\`\`\`

<strong>Common file path patterns:</strong>

Check before opening:
\`\`\`python
file_path = Path('data.txt')
if file_path.exists():
    with open(file_path) as f:
        content = f.read()
\`\`\`

Create organized directory structure:
\`\`\`python
project_dir = Path('my_project')
(project_dir / 'data').mkdir(parents=True, exist_ok=True)
(project_dir / 'output').mkdir(exist_ok=True)
(project_dir / 'logs').mkdir(exist_ok=True)
\`\`\`

Find all files of a certain type:
\`\`\`python
data_dir = Path('data')
txt_files = list(data_dir.glob('*.txt'))  # All .txt files
all_files = list(data_dir.rglob('*.txt'))  # Recursive search!
\`\`\`

<strong>Common mistakes to avoid:</strong>

⚠️ Using hardcoded absolute paths that only work on your computer
⚠️ Forgetting to check if paths exist before trying to use them
⚠️ Using \`\\\` on Windows in ways that break on other systems
⚠️ Not creating necessary directories before trying to save files
⚠️ Mixing os.path and pathlib (pick one and stick with it!)

<strong>Best practices for production code:</strong>

✅ Use pathlib for all new code (it's the modern standard)
✅ Use relative paths within your project structure
✅ Always check if paths exist before using them
✅ Use \`exist_ok=True\` when creating directories
✅ Build paths programmatically, don't hardcode them
✅ Store configuration paths in variables or config files

Understanding paths is fundamental to building real applications. Whether you're organizing data files, creating logs, or managing user files, these concepts apply everywhere!
`,
      codeExamples: [
        {
          title: 'Working with Paths',
          code: `import os

# Get current directory
current_dir = os.getcwd()
print(f"Current directory: {current_dir}")

# Join paths safely (handles / vs \\ automatically)
file_path = os.path.join('data', 'files', 'input.txt')
print(file_path)

# Check if path exists
if os.path.exists('data.txt'):
    print("File exists!")

# Check if it's a file or directory
print(os.path.isfile('data.txt'))  # True if file
print(os.path.isdir('data'))       # True if directory`,
          explanation: 'os module provides path utilities'
        },
        {
          title: 'Using pathlib (Recommended)',
          code: `from pathlib import Path

# Create path object
file_path = Path('data') / 'input.txt'
print(file_path)

# Check existence
if file_path.exists():
    print("File exists")

# Get parent directory
parent = file_path.parent
print(f"Parent: {parent}")

# Get filename
filename = file_path.name
print(f"Filename: {filename}")

# Read file directly
if file_path.exists():
    content = file_path.read_text()

# Write file directly
output_path = Path('output.txt')
output_path.write_text("Hello, World!")`,
          explanation: 'pathlib is more modern and intuitive'
        },
        {
          title: 'Listing Directory Contents',
          code: `import os

# List all files and directories
items = os.listdir('.')
print("Contents:", items)

# List only files
files = [f for f in os.listdir('.') if os.path.isfile(f)]
print("Files:", files)

# List only directories
dirs = [d for d in os.listdir('.') if os.path.isdir(d)]
print("Directories:", dirs)

# Using pathlib
from pathlib import Path

current = Path('.')
# Get all Python files
py_files = list(current.glob('*.py'))
print("Python files:", py_files)

# Get all files recursively
all_files = list(current.rglob('*.txt'))`,
          explanation: 'List and filter directory contents'
        },
        {
          title: 'Creating Directories',
          code: `import os

# Create single directory
if not os.path.exists('output'):
    os.mkdir('output')

# Create nested directories
os.makedirs('data/processed/results', exist_ok=True)
# exist_ok=True prevents error if directory exists

# Using pathlib
from pathlib import Path

output_dir = Path('output')
output_dir.mkdir(exist_ok=True)

nested_dir = Path('data/processed/results')
nested_dir.mkdir(parents=True, exist_ok=True)
# parents=True creates parent directories`,
          explanation: 'Create directories before writing files'
        },
        {
          title: 'Practical Example: Organized File Saving',
          code: `from pathlib import Path
import datetime

def save_report(data, category):
    """Save report to organized directory structure"""
    # Create directory structure: reports/category/year/month/
    today = datetime.date.today()

    report_dir = Path('reports') / category / str(today.year) / f"{today.month:02d}"
    report_dir.mkdir(parents=True, exist_ok=True)

    # Create filename with timestamp
    filename = f"report_{today.isoformat()}.txt"
    file_path = report_dir / filename

    # Write report
    file_path.write_text(data)
    print(f"Report saved to: {file_path}")

# Usage
save_report("Sales data for January", "sales")
# Creates: reports/sales/2024/01/report_2024-01-15.txt`,
          explanation: 'Organize files in directory structure'
        }
      ],
      concepts: ['absolute paths', 'relative paths', 'os module', 'pathlib', 'directories', 'os.path.join()', 'Path()']
    },
    starterCode: `# TODO: Import pathlib
# TODO: Create a Path object for 'data/output.txt'
# TODO: Check if the file exists
# TODO: If it exists, print "File found", otherwise print "File not found"

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Uses Path from pathlib to work with file paths'
      }
    ],
    hints: [
      'Import with: from pathlib import Path',
      'Create path: file_path = Path("data") / "output.txt"',
      'Check with: if file_path.exists():'
    ],
    challenge: {
      prompt: `Work with file paths:
1. Import Path from pathlib
2. Create a path to "logs/app.log"
3. Check if the file exists using .exists()
4. Print whether the file exists or not
5. Use the / operator to join path parts`,
      starterCode: '# Write your solution here\n',
      solution: 'from pathlib import Path\n\nfile_path = Path("logs") / "app.log"\nif file_path.exists():\n    print("File exists")\nelse:\n    print("File not found")',
      tests: [],
      explanation: 'pathlib makes paths easy! Use Path() and / to join. Use .exists() to check if a file exists.',
      hints: [
        'Import: from pathlib import Path',
        'Join paths: Path("logs") / "app.log"',
        'Check: if file_path.exists():'
      ],
      xpReward: 150,
    },
    xpReward: 125,
    activityType: 'game',
    gameType: 'quiz'
  },

  // Lesson 8-5: Working with Text Files (Project)
  {
    id: 'lesson-10-5',
    moduleId: 'module-10',
    courseId: 'beginner',
    title: 'Working with Text Files - Mini Project',
    content: {
      explanation: `Putting It All Together - Real File Processing! 🎯

Congratulations on making it to the mini project! Now it's time to combine everything you've learned about file I/O into practical, real-world applications. This lesson will show you how professional developers process text files, handle errors gracefully, and build robust file-handling systems.

<strong>Common file processing tasks you'll build:</strong>

<strong>1. Reading and Analyzing Files</strong>

Real programs constantly need to analyze file contents. Whether you're processing log files to find errors, counting words in documents, or extracting statistics from data files, these patterns appear everywhere:

• Count lines, words, and characters (like the Unix \`wc\` command)
• Search for specific content or patterns
• Calculate statistics (averages, totals, frequencies)
• Extract specific information
• Generate summaries and reports

<strong>2. Data Transformation and Cleaning</strong>

Raw data is messy! Your programs often need to clean and transform data:

• Convert between different file formats
• Remove unwanted whitespace and special characters
• Standardize formatting (uppercase/lowercase, date formats, etc.)
• Filter out invalid or incomplete entries
• Extract structured data from unstructured text

<strong>3. File Management Operations</strong>

Sometimes you need to manipulate files themselves:

• Copy files with modifications
• Merge multiple files into one comprehensive file
• Split large files into smaller, manageable pieces
• Create backups before modifying important files
• Organize files into directory structures

<strong>4. Logging and Event Tracking</strong>

Every serious application needs logging:

• Append timestamped entries to log files
• Track user actions and system events
• Record errors and debugging information
• Create audit trails
• Monitor application behavior over time

<strong>Critical skill: Exception handling with files</strong>

File operations can fail in many ways - the file might not exist, you might not have permission to access it, the disk might be full, or the file might be locked by another program. Professional code ALWAYS handles these errors gracefully:

\`\`\`python
try:
    with open('data.txt', 'r') as file:
        content = file.read()
        process_data(content)
except FileNotFoundError:
    print("Error: The file doesn't exist!")
    print("Please check the filename and try again.")
except PermissionError:
    print("Error: You don't have permission to read this file!")
except IOError as e:
    print(f"Error reading file: {e}")
\`\`\`

Why exception handling matters:
• Prevents crashes and provides helpful error messages
• Allows your program to gracefully handle missing or inaccessible files
• Makes your code professional and user-friendly
• Helps debug problems by showing specific error information
• Lets you implement fallback strategies (use default data, create missing files, etc.)

<strong>Essential best practices for production file handling:</strong>

<strong>1. Always use the with statement</strong>
It automatically closes files even if errors occur. This prevents data loss and resource leaks:
\`\`\`python
with open('file.txt', 'r') as file:  # Automatically closed!
    content = file.read()
\`\`\`

<strong>2. Specify encoding explicitly</strong>
Different systems use different text encodings. Always specify UTF-8 for consistent behavior:
\`\`\`python
with open('file.txt', 'r', encoding='utf-8') as file:
    content = file.read()
\`\`\`

This prevents weird character display issues and makes your code work internationally!

<strong>3. Check file existence before operations</strong>
Prevent errors by checking first:
\`\`\`python
from pathlib import Path

file_path = Path('data.txt')
if file_path.exists():
    with open(file_path, 'r') as file:
        content = file.read()
else:
    print("File not found, using defaults")
    content = "default data"
\`\`\`

<strong>4. Use write mode cautiously</strong>
Remember that 'w' mode ERASES files! Double-check before using it:
\`\`\`python
# For critical files, check first:
if file_path.exists():
    backup = file_path.with_suffix('.backup')
    file_path.rename(backup)  # Create backup before overwriting!
\`\`\`

<strong>5. Process large files line by line</strong>
Don't load huge files into memory all at once:
\`\`\`python
# Good - memory efficient:
with open('huge_file.txt', 'r') as file:
    for line in file:  # Processes one line at a time
        process_line(line)

# Bad - might crash on large files:
with open('huge_file.txt', 'r') as file:
    content = file.read()  # Loads entire file into memory!
\`\`\`

<strong>6. Use pathlib for modern, cross-platform code</strong>
It works consistently across Windows, Mac, and Linux:
\`\`\`python
from pathlib import Path

data_dir = Path('data')
data_dir.mkdir(exist_ok=True)
output_file = data_dir / 'results.txt'
output_file.write_text("Results here")
\`\`\`

<strong>7. Add comprehensive error handling</strong>
Files can fail in surprising ways. Handle the common cases:
\`\`\`python
try:
    with open(filename, 'r') as file:
        return file.read()
except FileNotFoundError:
    return None  # Or create default file
except PermissionError:
    print("Access denied!")
    return None
except UnicodeDecodeError:
    print("File encoding error!")
    return None
\`\`\`

<strong>Real-world application examples:</strong>

<strong>Log File Analysis:</strong> Your web server generates gigabytes of logs daily. You need to extract error messages, count requests, and identify security issues. File processing skills let you automate this!

<strong>Data Pipeline:</strong> You receive daily CSV files from partners. Your program reads them, validates the data, transforms it to your format, and loads it into your database.

<strong>Configuration Management:</strong> Your application needs to save user preferences, load settings at startup, and update configuration files without corrupting them.

<strong>Report Generation:</strong> Process sales data from multiple sources, calculate statistics, and generate formatted reports for managers.

<strong>Backup Systems:</strong> Automatically create timestamped backups of important files, verify their integrity, and clean up old backups.

<strong>Content Processing:</strong> Read documents, extract key information, generate summaries, or convert between formats.

<strong>Common patterns you'll use repeatedly:</strong>

Analyze file statistics:
\`\`\`python
def analyze_file(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            lines = file.readlines()
            return {
                'lines': len(lines),
                'words': sum(len(line.split()) for line in lines),
                'chars': sum(len(line) for line in lines)
            }
    except FileNotFoundError:
        return None
\`\`\`

Search for content:
\`\`\`python
def find_in_file(filename, search_term):
    matches = []
    try:
        with open(filename, 'r') as file:
            for line_num, line in enumerate(file, 1):
                if search_term in line:
                    matches.append((line_num, line.strip()))
    except FileNotFoundError:
        return []
    return matches
\`\`\`

Safe file modification:
\`\`\`python
def update_file_safely(filename, new_content):
    backup = filename + '.backup'
    try:
        # Create backup
        with open(filename, 'r') as f:
            old_content = f.read()
        with open(backup, 'w') as f:
            f.write(old_content)

        # Write new content
        with open(filename, 'w') as f:
            f.write(new_content)
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False
\`\`\`

<strong>Common mistakes in file processing:</strong>

⚠️ Not handling encoding issues (use encoding='utf-8')
⚠️ Loading huge files entirely into memory instead of processing line by line
⚠️ Not checking if files exist before trying to read them
⚠️ Forgetting to handle common exceptions (FileNotFoundError, PermissionError)
⚠️ Using write mode without realizing it erases the file
⚠️ Not closing files properly (use \`with\` statement!)
⚠️ Hardcoding file paths instead of using pathlib
⚠️ Not validating or cleaning data read from files

<strong>Building robust file processors:</strong>

Professional file processing combines all these concepts:
1. Use pathlib for cross-platform paths
2. Check file existence before operations
3. Handle all relevant exceptions
4. Process large files efficiently (line by line)
5. Validate data as you read it
6. Add logging for debugging
7. Create backups before modifying important files
8. Use encoding='utf-8' for text files
9. Clean up resources with \`with\` statements
10. Test with edge cases (empty files, missing files, huge files)

You now have all the tools to build professional file processing systems! The key is practice - start with simple tasks like counting words, then gradually tackle more complex projects like log analyzers or data transformers.
`,
      codeExamples: [
        {
          title: 'Text File Statistics',
          code: `def analyze_file(filename):
    """Analyze text file and return statistics"""
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            lines = file.readlines()

            line_count = len(lines)
            word_count = sum(len(line.split()) for line in lines)
            char_count = sum(len(line) for line in lines)

            return {
                'lines': line_count,
                'words': word_count,
                'characters': char_count
            }
    except FileNotFoundError:
        return None

# Usage
stats = analyze_file('document.txt')
if stats:
    print(f"Lines: {stats['lines']}")
    print(f"Words: {stats['words']}")
    print(f"Characters: {stats['characters']}")
else:
    print("File not found")`,
          explanation: 'Calculate file statistics with error handling'
        },
        {
          title: 'Search and Filter',
          code: `def find_in_file(filename, search_term):
    """Find lines containing search term"""
    matches = []

    try:
        with open(filename, 'r') as file:
            for line_num, line in enumerate(file, 1):
                if search_term.lower() in line.lower():
                    matches.append((line_num, line.strip()))
    except FileNotFoundError:
        print(f"File '{filename}' not found")
        return []

    return matches

# Usage
results = find_in_file('log.txt', 'error')
print(f"Found {len(results)} matches:")
for line_num, line in results:
    print(f"Line {line_num}: {line}")`,
          explanation: 'Search file for specific content'
        },
        {
          title: 'File Merging',
          code: `def merge_files(input_files, output_file):
    """Merge multiple files into one"""
    try:
        with open(output_file, 'w') as outfile:
            for filename in input_files:
                try:
                    with open(filename, 'r') as infile:
                        outfile.write(f"\\n--- Content from {filename} ---\\n")
                        outfile.write(infile.read())
                        outfile.write("\\n")
                except FileNotFoundError:
                    print(f"Warning: {filename} not found, skipping")

        print(f"Files merged into {output_file}")
        return True
    except Exception as e:
        print(f"Error merging files: {e}")
        return False

# Usage
files = ['part1.txt', 'part2.txt', 'part3.txt']
merge_files(files, 'complete.txt')`,
          explanation: 'Combine multiple files into one'
        },
        {
          title: 'Data Processing Pipeline',
          code: `def process_data_file(input_file, output_file):
    """Read data, process it, and write results"""
    try:
        # Read input
        with open(input_file, 'r') as infile:
            lines = infile.readlines()

        # Process data
        processed = []
        for line in lines:
            line = line.strip()
            if line and not line.startswith('#'):  # Skip empty and comments
                # Example: convert to uppercase and add line number
                processed.append(line.upper())

        # Write output
        with open(output_file, 'w') as outfile:
            for i, line in enumerate(processed, 1):
                outfile.write(f"{i}. {line}\\n")

        print(f"Processed {len(processed)} lines")
        return True

    except FileNotFoundError:
        print(f"Input file '{input_file}' not found")
        return False
    except Exception as e:
        print(f"Error processing file: {e}")
        return False

# Usage
process_data_file('input.txt', 'output.txt')`,
          explanation: 'Read, transform, and write data'
        },
        {
          title: 'Simple Logging System',
          code: `from datetime import datetime
from pathlib import Path

class SimpleLogger:
    """Simple file-based logger"""

    def __init__(self, log_file):
        self.log_file = Path(log_file)
        # Ensure log directory exists
        self.log_file.parent.mkdir(parents=True, exist_ok=True)

    def log(self, message, level='INFO'):
        """Add log entry"""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        entry = f"[{timestamp}] {level}: {message}\\n"

        with open(self.log_file, 'a') as file:
            file.write(entry)

    def info(self, message):
        """Log info message"""
        self.log(message, 'INFO')

    def error(self, message):
        """Log error message"""
        self.log(message, 'ERROR')

    def read_logs(self):
        """Read all log entries"""
        if self.log_file.exists():
            return self.log_file.read_text()
        return "No logs found"

# Usage
logger = SimpleLogger('logs/app.log')
logger.info('Application started')
logger.error('Something went wrong')

print(logger.read_logs())`,
          explanation: 'Build a simple logging system with files'
        }
      ],
      concepts: ['file processing', 'error handling', 'data transformation', 'logging', 'file merging', 'text analysis']
    },
    starterCode: `# TODO: Write a function count_words(filename) that:
# TODO: 1. Opens and reads a file
# TODO: 2. Counts the total number of words
# TODO: 3. Returns the count
# TODO: 4. Handles FileNotFoundError
# TODO: Test with different files

`,
    validationTests: [
      {
        input: '',
        expectedOutput: '',
        description: 'Creates a function that reads and processes a file'
      }
    ],
    hints: [
      'Define function: def count_words(filename):',
      'Use try/except for FileNotFoundError',
      'Read with: content = file.read()',
      'Split into words: words = content.split()',
      'Return len(words)'
    ],
    challenge: {
      prompt: `Copy and transform file contents:
1. Read all lines from "input.txt"
2. Convert each line to uppercase
3. Write the uppercase lines to "output.txt"
4. Print "Processing complete" when done`,
      starterCode: '# Write your solution here\n',
      solution: 'with open("input.txt", "r") as infile:\n    lines = infile.readlines()\n\nwith open("output.txt", "w") as outfile:\n    for line in lines:\n        outfile.write(line.upper())\n\nprint("Processing complete")',
      tests: [],
      explanation: 'Read all lines first, transform them, then write to a new file. This pattern is common for file processing.',
      hints: [
        'Read all: lines = infile.readlines()',
        'Transform: line.upper()',
        'Write to output file in "w" mode'
      ],
      xpReward: 150,
    },
    xpReward: 150,
    activityType: 'game',
    gameType: 'quiz'
  }
];
