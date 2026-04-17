// Module 8 Assessment: File Input/Output
// Tests: opening files, reading, writing, paths, file processing

import type { Assessment } from '@types';

export const module10Assessment: Assessment = {
  id: 'assessment-module-10',
  moduleId: 'module-10',
  courseId: 'beginner',
  title: 'Module 8 Assessment: File Input/Output',
  description: 'Test your knowledge of Python file operations, reading, writing, and path handling.',
  totalPoints: 100,
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What will this code output?\n\nwith open("test.txt", "w") as f:\n    f.write("Hello")\n    f.write("World")\n\n# File contains:',
      options: [
        'Hello\\nWorld',
        'HelloWorld',
        'Hello World',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'write() does not add newlines automatically - strings are concatenated',
      points: 5,
      concepts: ['write', 'newlines', 'concatenation']
    },

    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'What happens after this code?\n\nwith open("data.txt", "r") as f:\n    content = f.read()\nprint(f.closed)',
      options: [
        'True',
        'False',
        'Error',
        'None'
      ],
      correctAnswer: 0,
      explanation: 'with statement automatically closes file after block exits',
      points: 5,
      concepts: ['with statement', 'file closing', 'context manager']
    },

    {
      id: 'q3',
      type: 'multiple-choice',
      question: 'What does this output?\n\nwith open("nums.txt", "w") as f:\n    for i in range(3):\n        f.write(str(i))\n\n# File contains:',
      options: [
        '0\\n1\\n2',
        '012',
        '0 1 2',
        '[0, 1, 2]'
      ],
      correctAnswer: 1,
      explanation: 'No newlines or spaces added - writes "012" as continuous string',
      points: 5,
      concepts: ['write', 'loops', 'type conversion']
    },

    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'What is printed?\n\nwith open("test.txt", "w") as f:\n    result = f.write("Hello")\nprint(result)',
      options: [
        'Hello',
        '5',
        'None',
        'True'
      ],
      correctAnswer: 1,
      explanation: 'write() returns number of characters written',
      points: 5,
      concepts: ['write', 'return value', 'character count']
    },

    {
      id: 'q5',
      type: 'multiple-choice',
      question: 'What will happen?\n\n# File "log.txt" contains: "Line1\\nLine2\\nLine3"\n\nwith open("log.txt", "r") as f:\n    line1 = f.readline()\n    line2 = f.readline()\n\nprint(len(line1))',
      options: [
        '5',
        '6',
        '4',
        '7'
      ],
      correctAnswer: 1,
      explanation: 'readline() includes the newline character: "Line1\\n" = 6 chars',
      points: 5,
      concepts: ['readline', 'newlines', 'len']
    },

    {
      id: 'q6',
      type: 'multiple-choice',
      question: 'What is the output?\n\n# File "data.txt" contains: "apple\\nbanana\\ncherry"\n\nwith open("data.txt", "r") as f:\n    lines = f.readlines()\n\nprint(len(lines))',
      options: [
        '1',
        '2',
        '3',
        '21'
      ],
      correctAnswer: 2,
      explanation: 'readlines() returns list of 3 lines',
      points: 5,
      concepts: ['readlines', 'lists', 'line count']
    },

    {
      id: 'q7',
      type: 'multiple-choice',
      question: 'What happens with this code?\n\nwith open("output.txt", "a") as f:\n    f.write("New")\n\n# If file already contained "Old":',
      options: [
        'File contains: New',
        'File contains: OldNew',
        'File contains: Old\\nNew',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'Append mode adds to end without adding newline',
      points: 5,
      concepts: ['append mode', 'write', 'file modes']
    },

    {
      id: 'q8',
      type: 'multiple-choice',
      question: 'What does this print?\n\n# File "test.txt" contains: "Hello World"\n\nwith open("test.txt", "r") as f:\n    content = f.read(5)\n    more = f.read(3)\n\nprint(more)',
      options: [
        'Hel',
        'Wor',
        ' Wo',
        'llo'
      ],
      correctAnswer: 2,
      explanation: 'First read() gets 5 chars ("Hello"), second gets next 3 (" Wo")',
      points: 5,
      concepts: ['read', 'file position', 'partial reading']
    },

    {
      id: 'q9',
      type: 'multiple-choice',
      question: 'What will happen?\n\nwith open("new.txt", "r") as f:\n    content = f.read()\n\n# If "new.txt" does not exist:',
      options: [
        'Creates empty file',
        'Returns empty string',
        'FileNotFoundError',
        'Returns None'
      ],
      correctAnswer: 2,
      explanation: 'Reading non-existent file raises FileNotFoundError',
      points: 5,
      concepts: ['FileNotFoundError', 'read mode', 'exceptions']
    },

    {
      id: 'q10',
      type: 'multiple-choice',
      question: 'What is the output?\n\n# File "nums.txt" contains: "1\\n2\\n3\\n"\n\nwith open("nums.txt", "r") as f:\n    total = 0\n    for line in f:\n        total += int(line.strip())\n\nprint(total)',
      options: [
        '6',
        '123',
        'Error',
        '0'
      ],
      correctAnswer: 0,
      explanation: 'Iterates through lines, strips newlines, converts to int: 1+2+3=6',
      points: 5,
      concepts: ['file iteration', 'strip', 'int conversion']
    },

    {
      id: 'q11',
      type: 'multiple-choice',
      question: 'What happens after this code?\n\nf = open("test.txt", "w")\nf.write("Data")\n# No close() or with statement\n\n# If program crashes before close():',
      options: [
        'File is saved',
        'File might be empty',
        'File is deleted',
        'No difference'
      ],
      correctAnswer: 1,
      explanation: 'Without close(), data might not be flushed to disk',
      points: 5,
      concepts: ['file closing', 'buffering', 'data loss']
    },

    {
      id: 'q12',
      type: 'multiple-choice',
      question: 'What will this print?\n\ntry:\n    with open("missing.txt", "r") as f:\n        data = f.read()\nexcept FileNotFoundError:\n    data = "default"\n\nprint(data)',
      options: [
        'Error',
        'None',
        'default',
        'missing.txt'
      ],
      correctAnswer: 2,
      explanation: 'Exception is caught and data is set to "default"',
      points: 5,
      concepts: ['exception handling', 'FileNotFoundError', 'default values']
    },

    {
      id: 'q13',
      type: 'multiple-choice',
      question: 'What does this output?\n\nimport os\npath = os.path.join("folder", "file.txt")\nprint(path.count("/") + path.count("\\\\"))',
      options: [
        '0',
        '1',
        '2',
        'Depends on OS'
      ],
      correctAnswer: 3,
      explanation: 'os.path.join uses OS-specific separator (/ or \\)',
      points: 5,
      concepts: ['os.path.join', 'path separators', 'cross-platform']
    },

    {
      id: 'q14',
      type: 'multiple-choice',
      question: 'What happens?\n\nwith open("data.txt", "w") as f:\n    f.write("Line1\\n")\n\nwith open("data.txt", "w") as f:\n    f.write("Line2\\n")\n\n# File contains:',
      options: [
        'Line1\\nLine2',
        'Line2',
        'Line1',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'Second "w" mode overwrites entire file with just "Line2"',
      points: 5,
      concepts: ['write mode', 'overwriting', 'data loss']
    },

    {
      id: 'q15',
      type: 'multiple-choice',
      question: 'What is printed?\n\nfrom pathlib import Path\n\npath = Path("test.txt")\nprint(path.suffix)',
      options: [
        'test',
        '.txt',
        'txt',
        'test.txt'
      ],
      correctAnswer: 1,
      explanation: 'suffix returns file extension including the dot',
      points: 5,
      concepts: ['pathlib', 'Path.suffix', 'file extensions']
    },

    {
      id: 'q16',
      type: 'multiple-choice',
      question: 'What does this output?\n\n# File "data.txt" contains: "   spaces   "\n\nwith open("data.txt", "r") as f:\n    content = f.read()\n\nprint(len(content))',
      options: [
        '6',
        '13',
        '0',
        '3'
      ],
      correctAnswer: 1,
      explanation: 'read() includes all whitespace: "   spaces   " = 13 chars',
      points: 5,
      concepts: ['read', 'whitespace', 'len']
    },

    {
      id: 'q17',
      type: 'multiple-choice',
      question: 'What happens?\n\nwith open("test.txt", "r+") as f:\n    f.write("ABC")\n    f.seek(0)\n    content = f.read()\n\nprint(content)',
      options: [
        'ABC',
        'Original content',
        'Starts with ABC',
        'Error'
      ],
      correctAnswer: 2,
      explanation: 'r+ allows read/write; write overwrites from start, seek(0) rewinds',
      points: 5,
      concepts: ['r+ mode', 'seek', 'file position']
    },

    {
      id: 'q18',
      type: 'multiple-choice',
      question: 'What is the result?\n\nimport os\n\nresult = os.path.exists("nonexistent.txt")\nprint(result)',
      options: [
        'True',
        'False',
        'Error',
        'None'
      ],
      correctAnswer: 1,
      explanation: 'os.path.exists returns False for non-existent paths',
      points: 5,
      concepts: ['os.path.exists', 'file checking', 'boolean']
    },

    {
      id: 'q19',
      type: 'multiple-choice',
      question: 'What does this print?\n\n# File "data.txt" contains 3 lines\n\ncount = 0\nwith open("data.txt", "r") as f:\n    for line in f:\n        count += 1\n\nprint(count)',
      options: [
        '0',
        '1',
        '3',
        'Error'
      ],
      correctAnswer: 2,
      explanation: 'Iterating over file object yields each line, counts to 3',
      points: 5,
      concepts: ['file iteration', 'counting', 'for loop']
    },

    {
      id: 'q20',
      type: 'multiple-choice',
      question: 'What happens with this code?\n\nwith open("out.txt", "w") as f:\n    f.write("Line1\\n")\n    f.write("Line2\\n")\n\nwith open("out.txt", "a") as f:\n    f.write("Line3\\n")\n\n# File contains:',
      options: [
        'Line3',
        'Line1\\nLine2',
        'Line1\\nLine2\\nLine3',
        'Line3\\nLine1\\nLine2'
      ],
      correctAnswer: 2,
      explanation: 'Write mode creates file with 2 lines, append mode adds third line',
      points: 5,
      concepts: ['write mode', 'append mode', 'multiple operations']
    },

    // Question 21 - List comprehension with string method
    {
      id: 'q21',
      type: 'multiple-choice' as const,
      question: 'What is the output?\n\nwords = ["Hello", "WORLD", "Python"]\nresult = [w.lower() for w in words]\nprint(result)',
      options: [
        '["hello", "world", "python"]',
        '["Hello", "WORLD", "Python"]',
        '["HELLO", "WORLD", "PYTHON"]',
        'Error'
      ],
      correctAnswer: 0,
      explanation: 'The comprehension calls .lower() on each string, converting all to lowercase.',
      points: 5,
    },

    // Question 22 - Nested list comprehension creating matrix
    {
      id: 'q22',
      type: 'multiple-choice' as const,
      question: 'What does this create?\n\nmatrix = [[j * i for j in range(1, 4)] for i in range(1, 4)]\nprint(matrix[2])',
      options: [
        '[1, 2, 3]',
        '[2, 4, 6]',
        '[3, 6, 9]',
        '[0, 0, 0]'
      ],
      correctAnswer: 2,
      explanation: 'When i=3 (index 2), the inner list is [3*1, 3*2, 3*3] = [3, 6, 9].',
      points: 5,
    },

    // Question 23 - enumerate with start parameter
    {
      id: 'q23',
      type: 'multiple-choice' as const,
      question: 'What is printed?\n\nitems = ["a", "b", "c"]\nfor idx, val in enumerate(items, start=1):\n    if val == "b":\n        print(idx)',
      options: [
        '0',
        '1',
        '2',
        '3'
      ],
      correctAnswer: 2,
      explanation: 'enumerate with start=1 yields (1,"a"), (2,"b"), (3,"c"). When val is "b", idx is 2.',
      points: 5,
    },

    // Question 24 - zip with unpacking
    {
      id: 'q24',
      type: 'multiple-choice' as const,
      question: 'What does this print?\n\npairs = [(1, "a"), (2, "b"), (3, "c")]\nnums, letters = zip(*pairs)\nprint(list(letters))',
      options: [
        '[1, 2, 3]',
        '["a", "b", "c"]',
        '[(1, "a"), (2, "b"), (3, "c")]',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'zip(*pairs) unzips the pairs. The second element from each tuple goes into letters: ("a", "b", "c").',
      points: 5,
    },

    // Question 25 - sort with key function
    {
      id: 'q25',
      type: 'multiple-choice' as const,
      question: 'What is the output?\n\ndata = [(3, "c"), (1, "a"), (2, "b")]\ndata.sort(key=lambda x: x[0])\nprint(data[-1])',
      options: [
        '(1, "a")',
        '(2, "b")',
        '(3, "c")',
        'Error'
      ],
      correctAnswer: 2,
      explanation: 'Sorting by the first element of each tuple gives [(1,"a"), (2,"b"), (3,"c")]. The last element is (3,"c").',
      points: 5,
    },

    // Question 26 - List comprehension vs filter
    {
      id: 'q26',
      type: 'multiple-choice' as const,
      question: 'What does this print?\n\nnums = range(1, 11)\nevens = [x for x in nums if x % 2 == 0]\nprint(evens[-1] - evens[0])',
      options: [
        '6',
        '8',
        '10',
        '4'
      ],
      correctAnswer: 1,
      explanation: 'evens = [2, 4, 6, 8, 10]. Last minus first: 10 - 2 = 8.',
      points: 5,
    },

    // Question 27 - List slicing with comprehension
    {
      id: 'q27',
      type: 'multiple-choice' as const,
      question: 'What is printed?\n\nnums = [10, 20, 30, 40, 50]\nresult = [nums[i] for i in range(len(nums)) if i % 2 == 0]\nprint(result)',
      options: [
        '[10, 30, 50]',
        '[20, 40]',
        '[10, 20, 30]',
        '[30, 40, 50]'
      ],
      correctAnswer: 0,
      explanation: 'Indices 0, 2, 4 pass the filter (even indices), giving elements [10, 30, 50].',
      points: 5,
    },

    // Question 28 - List extend vs append
    {
      id: 'q28',
      type: 'multiple-choice' as const,
      question: 'What is the output?\n\na = [1, 2]\nb = [3, 4]\na.extend(b)\na.append([5, 6])\nprint(len(a))',
      options: [
        '4',
        '5',
        '6',
        '8'
      ],
      correctAnswer: 1,
      explanation: 'extend adds elements individually: [1,2,3,4]. append adds [5,6] as single element: [1,2,3,4,[5,6]]. Length is 5.',
      points: 5,
    },

    // Question 29 - Dictionary comprehension from zip
    {
      id: 'q29',
      type: 'multiple-choice' as const,
      question: 'What does this print?\n\nnames = ["Alice", "Bob", "Charlie"]\nscores = [85, 92, 78]\ntop = {n: s for n, s in zip(names, scores) if s > 80}\nprint(len(top))',
      options: [
        '1',
        '2',
        '3',
        '0'
      ],
      correctAnswer: 1,
      explanation: 'Only Alice (85) and Bob (92) have scores above 80. Charlie (78) is filtered out. Length is 2.',
      points: 5,
    },

    // Question 30 - Comprehension with nested function calls
    {
      id: 'q30',
      type: 'multiple-choice' as const,
      question: 'What is the output?\n\nsentence = "the quick brown fox"\nresult = [word.capitalize() for word in sentence.split()]\nprint(" ".join(result))',
      options: [
        'the quick brown fox',
        'THE QUICK BROWN FOX',
        'The Quick Brown Fox',
        'The quick brown fox'
      ],
      correctAnswer: 2,
      explanation: 'split() breaks into words, capitalize() uppercases the first letter of each word, join() reassembles with spaces.',
      points: 5,
    }
  ]
};
