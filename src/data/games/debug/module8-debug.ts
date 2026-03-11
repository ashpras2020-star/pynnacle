import type { DebugGame } from '../../../types/game';

export const module10DebugGame: DebugGame = {
  id: 'debug-module10',
  moduleId: 'module-10',
  title: 'Debug Detective: File I/O',
  description: 'Find and fix bugs in file opening, reading, writing, and path handling.',
  baseXP: 100,
  bonusXP: 50,
  challenges: [
    {
      id: 'module10-debug-1',
      title: 'File Not Closed',
      code: `# Read file contents
file = open("data.txt", "r")
contents = file.read()
print(contents)`,
      bugLines: [4],
      bugDescriptions: [
        'File is opened but never closed - should use file.close() or with statement'
      ],
      fixes: [
        'Add file.close() at the end, or better: use "with open(...) as file:" which auto-closes'
      ],
      correctCode: `# Read file contents
with open("data.txt", "r") as file:
    contents = file.read()
    print(contents)`,
      explanation: 'Always close files after opening them to free system resources. Best practice: use the "with" statement which automatically closes the file, even if an error occurs.',
      hints: [
        'What happens to the file after reading?',
        'How do you release file resources?',
        'Is there a better way to handle files automatically?'
      ],
      difficulty: 'easy',
      concepts: ['files', 'open', 'close', 'with']
    },
    {
      id: 'module10-debug-2',
      title: 'Wrong File Mode',
      code: `# Add line to existing file
with open("log.txt", "w") as file:
    file.write("New log entry\\n")`,
      bugLines: [2],
      bugDescriptions: [
        'Using "w" mode which overwrites the file - should use "a" (append) mode to add to existing file'
      ],
      fixes: [
        'Change mode to append: with open("log.txt", "a") as file:'
      ],
      correctCode: `# Add line to existing file
with open("log.txt", "a") as file:
    file.write("New log entry\\n")`,
      explanation: 'File modes: "r" = read, "w" = write (overwrites), "a" = append (adds to end), "r+" = read and write. Use "a" when you want to add to an existing file without losing its contents.',
      hints: [
        'What does "w" mode do to existing content?',
        'Which mode adds to a file without erasing it?',
        'The comment says "add line" not "replace file"'
      ],
      difficulty: 'easy',
      concepts: ['files', 'modes', 'write', 'append']
    },
    {
      id: 'module10-debug-3',
      title: 'Reading After Write',
      code: `# Write then read from file
with open("temp.txt", "w") as file:
    file.write("Hello, World!")
    file.seek(0)
    content = file.read()
    print(content)`,
      bugLines: [5],
      bugDescriptions: [
        'Cannot read from a file opened in write-only mode ("w")'
      ],
      fixes: [
        'Use "w+" mode for reading and writing, or close and reopen with "r" mode'
      ],
      correctCode: `# Write then read from file
with open("temp.txt", "w+") as file:
    file.write("Hello, World!")
    file.seek(0)
    content = file.read()
    print(content)`,
      explanation: 'File mode "w" is write-only. To both write and read, use "w+" (write and read) or "r+" (read and write). The + indicates both operations are allowed.',
      hints: [
        'Can you read from a write-only file?',
        'What mode allows both reading and writing?',
        'The "w" mode only allows...'
      ],
      difficulty: 'medium',
      concepts: ['files', 'modes', 'read', 'write', 'seek']
    },
    {
      id: 'module10-debug-4',
      title: 'Path Separator Issue',
      code: `# Read file from subfolder (cross-platform)
import os
folder = "data"
filename = "input.txt"
filepath = folder + "/" + filename
with open(filepath, "r") as file:
    content = file.read()
    print(content)`,
      bugLines: [5],
      bugDescriptions: [
        'Hardcoded "/" separator not portable - should use os.path.join() for cross-platform compatibility'
      ],
      fixes: [
        'Use os.path.join(): filepath = os.path.join(folder, filename)'
      ],
      correctCode: `# Read file from subfolder (cross-platform)
import os
folder = "data"
filename = "input.txt"
filepath = os.path.join(folder, filename)
with open(filepath, "r") as file:
    content = file.read()
    print(content)`,
      explanation: 'Different operating systems use different path separators (/ on Unix/Mac, \\ on Windows). Use os.path.join() to create paths that work on all platforms.',
      hints: [
        'Will this path work on Windows?',
        'Is "/" the separator on all operating systems?',
        'What function creates cross-platform paths?'
      ],
      difficulty: 'medium',
      concepts: ['files', 'paths', 'os', 'portability']
    },
    {
      id: 'module10-debug-5',
      title: 'Binary vs Text Mode',
      code: `# Copy an image file
with open("source.png", "r") as source:
    data = source.read()

with open("destination.png", "w") as dest:
    dest.write(data)`,
      bugLines: [2, 5],
      bugDescriptions: [
        'Binary files (images) must be opened in binary mode "rb" and "wb", not text mode',
        'Text mode will corrupt binary data'
      ],
      fixes: [
        'Use binary mode: open("source.png", "rb") and open("destination.png", "wb")'
      ],
      correctCode: `# Copy an image file
with open("source.png", "rb") as source:
    data = source.read()

with open("destination.png", "wb") as dest:
    dest.write(data)`,
      explanation: 'Binary files (images, videos, executables) must be opened in binary mode by adding "b" to the mode: "rb" (read binary) or "wb" (write binary). Text mode can corrupt binary data through encoding conversion.',
      hints: [
        'Is a PNG file text or binary?',
        'What mode is needed for non-text files?',
        'How do you tell Python to handle binary data?'
      ],
      difficulty: 'hard',
      concepts: ['files', 'binary', 'modes', 'encoding']
    }
  ]
};
