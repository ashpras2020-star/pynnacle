// Module 10 Assessment: List Comprehensions & Advanced Lists
// Tests: list comprehensions, filtering, nested lists, list methods, enumerate/zip

import type { Assessment } from '@types';

export const module8Assessment: Assessment = {
  id: 'assessment-module-8',
  moduleId: 'module-8',
  courseId: 'beginner',
  title: 'Module 10 Assessment: List Comprehensions & Advanced Lists',
  description: 'Test your knowledge of Python list comprehensions, advanced list operations, and iteration techniques.',
  totalPoints: 100,
  passingScore: 80,
  timeLimit: 25,
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What does this create?\n\nresult = [x * 2 for x in range(5) if x % 2 == 0]\nprint(result)',
      options: [
        '[0, 2, 4, 6, 8]',
        '[0, 4, 8]',
        '[2, 4]',
        '[0, 2, 4]'
      ],
      correctAnswer: 1,
      explanation: 'Filters evens (0,2,4) then doubles them: [0, 4, 8]',
      points: 5,
      concepts: ['list comprehensions', 'filtering', 'transformation']
    },

    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'What is the output?\n\nnums = [1, 2, 3]\nresult = [n if n > 1 else 0 for n in nums]\nprint(result)',
      options: [
        '[1, 2, 3]',
        '[0, 2, 3]',
        '[2, 3]',
        '[0, 1, 1]'
      ],
      correctAnswer: 1,
      explanation: 'Conditional expression: 1→0, 2→2, 3→3',
      points: 5,
      concepts: ['conditional expression', 'if-else', 'transformation']
    },

    {
      id: 'q3',
      type: 'multiple-choice',
      question: 'What does this print?\n\nmatrix = [[1, 2], [3, 4]]\nresult = [num for row in matrix for num in row]\nprint(result)',
      options: [
        '[[1, 2], [3, 4]]',
        '[1, 2, 3, 4]',
        '[[1, 3], [2, 4]]',
        '[4, 3, 2, 1]'
      ],
      correctAnswer: 1,
      explanation: 'Flattens nested list: iterates rows, then numbers in each row',
      points: 5,
      concepts: ['nested comprehensions', 'flattening', 'order']
    },

    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'What is the result?\n\nwords = ["hi", "hello", "hey"]\nlengths = [len(w) for w in words if len(w) > 2]\nprint(lengths)',
      options: [
        '[2, 5, 3]',
        '[5, 3]',
        '[5]',
        '[2, 5]'
      ],
      correctAnswer: 1,
      explanation: 'Filters words longer than 2 chars ("hello", "hey"), gets lengths [5, 3]',
      points: 5,
      concepts: ['filtering', 'len', 'string processing']
    },

    {
      id: 'q5',
      type: 'multiple-choice',
      question: 'What does this output?\n\ndata = [x ** 2 for x in range(4)]\nprint(sum(data))',
      options: [
        '6',
        '9',
        '14',
        '15'
      ],
      correctAnswer: 2,
      explanation: 'Squares: [0, 1, 4, 9], sum = 0+1+4+9 = 14',
      points: 5,
      concepts: ['comprehensions', 'sum', 'squares']
    },

    {
      id: 'q6',
      type: 'multiple-choice',
      question: 'What is printed?\n\nnums = [1, 2, 3]\nresult = [nums.append(4)]\nprint(len(nums))',
      options: [
        '3',
        '4',
        '5',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'append modifies list (adds 4), comprehension creates [None], nums length is 4',
      points: 5,
      concepts: ['side effects', 'append', 'comprehensions']
    },

    {
      id: 'q7',
      type: 'multiple-choice',
      question: 'What happens?\n\noriginal = [1, 2, 3]\ncopied = sorted(original, reverse=True)\nprint(original[0])',
      options: [
        '1',
        '3',
        '2',
        'Error'
      ],
      correctAnswer: 0,
      explanation: 'sorted() returns new list, original unchanged',
      points: 5,
      concepts: ['sorted', 'immutability', 'original preservation']
    },

    {
      id: 'q8',
      type: 'multiple-choice',
      question: 'What is the output?\n\nnums = [3, 1, 4, 1, 5]\nnums.sort()\nresult = nums.pop()\nprint(result)',
      options: [
        '1',
        '3',
        '5',
        'None'
      ],
      correctAnswer: 2,
      explanation: 'Sorts to [1, 1, 3, 4, 5], pop() removes and returns last: 5',
      points: 5,
      concepts: ['sort', 'pop', 'chaining operations']
    },

    {
      id: 'q9',
      type: 'multiple-choice',
      question: 'What does this print?\n\nfor i, val in enumerate(["a", "b", "c"]):\n    if i == 1:\n        print(val)',
      options: [
        'a',
        'b',
        'c',
        '1'
      ],
      correctAnswer: 1,
      explanation: 'enumerate gives (0,"a"), (1,"b"), (2,"c"), prints "b" when i==1',
      points: 5,
      concepts: ['enumerate', 'indexing', 'iteration']
    },

    {
      id: 'q10',
      type: 'multiple-choice',
      question: 'What is the result?\n\nlist1 = [1, 2, 3]\nlist2 = ["a", "b"]\nresult = list(zip(list1, list2))\nprint(len(result))',
      options: [
        '2',
        '3',
        '5',
        '6'
      ],
      correctAnswer: 0,
      explanation: 'zip stops at shortest list: [(1,"a"), (2,"b")], length 2',
      points: 5,
      concepts: ['zip', 'shortest list', 'pairing']
    },

    {
      id: 'q11',
      type: 'multiple-choice',
      question: 'What does this output?\n\nmatrix = [[1, 2, 3], [4, 5, 6]]\nresult = [row[1] for row in matrix]\nprint(result)',
      options: [
        '[1, 4]',
        '[2, 5]',
        '[3, 6]',
        '[1, 2, 3, 4, 5, 6]'
      ],
      correctAnswer: 1,
      explanation: 'Gets second element (index 1) from each row: [2, 5]',
      points: 5,
      concepts: ['nested lists', 'indexing', 'extraction']
    },

    {
      id: 'q12',
      type: 'multiple-choice',
      question: 'What is printed?\n\nwords = ["cat", "dog", "bird"]\nresult = sorted(words, key=len, reverse=True)\nprint(result[0])',
      options: [
        'bird',
        'cat',
        'dog',
        'Error'
      ],
      correctAnswer: 0,
      explanation: 'Sorts by length descending: ["bird"(4), "cat"(3), "dog"(3)], first is "bird"',
      points: 5,
      concepts: ['sorted', 'key parameter', 'reverse']
    },

    {
      id: 'q13',
      type: 'multiple-choice',
      question: 'What happens?\n\nnums = [1, 2, 2, 3, 2]\ncount = nums.count(2)\nindex = nums.index(2)\nprint(count + index)',
      options: [
        '3',
        '4',
        '5',
        '6'
      ],
      correctAnswer: 1,
      explanation: 'count(2) = 3, index(2) = 1 (first occurrence), 3 + 1 = 4',
      points: 5,
      concepts: ['count', 'index', 'list methods']
    },

    {
      id: 'q14',
      type: 'multiple-choice',
      question: 'What is the output?\n\ndata = [x for x in range(10) if x % 2 == 0 if x > 4]\nprint(len(data))',
      options: [
        '2',
        '3',
        '4',
        '5'
      ],
      correctAnswer: 0,
      explanation: 'Multiple ifs act as AND: even AND > 4 gives [6, 8], length is 2',
      points: 5,
      concepts: ['multiple conditions', 'filtering', 'and logic']
    },

    {
      id: 'q15',
      type: 'multiple-choice',
      question: 'What does this print?\n\nkeys = ["a", "b", "c"]\nvalues = [1, 2, 3]\nd = dict(zip(keys, values))\nprint(d["b"])',
      options: [
        '1',
        '2',
        '3',
        'b'
      ],
      correctAnswer: 1,
      explanation: 'zip pairs keys/values, dict creates {"a":1, "b":2, "c":3}, d["b"]=2',
      points: 5,
      concepts: ['zip', 'dict', 'key access']
    },

    {
      id: 'q16',
      type: 'multiple-choice',
      question: 'What is the result?\n\nnums = [5, 2, 8, 1]\nnums.reverse()\nprint(nums[0])',
      options: [
        '1',
        '2',
        '5',
        '8'
      ],
      correctAnswer: 0,
      explanation: 'reverse() reverses in place: [1, 8, 2, 5], first element is 1',
      points: 5,
      concepts: ['reverse', 'in-place', 'ordering']
    },

    {
      id: 'q17',
      type: 'multiple-choice',
      question: 'What does this output?\n\nresult = [[i] * 2 for i in range(3)]\nprint(result)',
      options: [
        '[[0, 0], [1, 1], [2, 2]]',
        '[[0, 1, 2], [0, 1, 2]]',
        '[0, 0, 1, 1, 2, 2]',
        '[[0], [1], [2]]'
      ],
      correctAnswer: 0,
      explanation: 'For each i, creates list [i] and repeats it: [[0, 0], [1, 1], [2, 2]]',
      points: 5,
      concepts: ['comprehensions', 'repetition', 'nested lists']
    },

    {
      id: 'q18',
      type: 'multiple-choice',
      question: 'What is printed?\n\nfor i, (x, y) in enumerate([(1, 2), (3, 4)]):\n    if i == 0:\n        print(x + y)',
      options: [
        '1',
        '2',
        '3',
        '4'
      ],
      correctAnswer: 2,
      explanation: 'enumerate gives (0,(1,2)), unpacks to x=1, y=2, prints 1+2=3',
      points: 5,
      concepts: ['enumerate', 'tuple unpacking', 'multiple assignment']
    },

    {
      id: 'q19',
      type: 'multiple-choice',
      question: 'What happens?\n\nnums = [1, 2, 3]\nresult = nums + [4]\nprint(len(nums))',
      options: [
        '3',
        '4',
        '5',
        'Error'
      ],
      correctAnswer: 0,
      explanation: '+ creates new list without modifying original, nums still length 3',
      points: 5,
      concepts: ['concatenation', 'immutability', 'vs append']
    },

    {
      id: 'q20',
      type: 'multiple-choice',
      question: 'What is the output?\n\ndata = [1, 2, 3, 4, 5]\nfiltered = [x for x in data if x > 2]\ndata.clear()\nprint(len(filtered))',
      options: [
        '0',
        '3',
        '5',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'Comprehension creates independent list [3,4,5], clearing data doesn\'t affect it',
      points: 5,
      concepts: ['comprehensions', 'independence', 'clear']
    },

    // Question 21 - pathlib Path operations
    {
      id: 'q21',
      type: 'multiple-choice' as const,
      question: 'What is the output?\n\nfrom pathlib import Path\n\np = Path("/home/user/docs/report.txt")\nprint(p.stem)',
      options: [
        'report.txt',
        'report',
        '.txt',
        '/home/user/docs'
      ],
      correctAnswer: 1,
      explanation: 'Path.stem returns the filename without the extension: "report".',
      points: 5,
    },

    // Question 22 - Writing lines with writelines
    {
      id: 'q22',
      type: 'multiple-choice' as const,
      question: 'What does the file contain after this code?\n\nlines = ["one", "two", "three"]\nwith open("out.txt", "w") as f:\n    f.writelines(lines)\n\n# File contains:',
      options: [
        'one\\ntwo\\nthree',
        'onetwothree',
        '["one", "two", "three"]',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'writelines() writes each string directly with no separator or newline added. The file contains "onetwothree".',
      points: 5,
    },

    // Question 23 - os.path operations
    {
      id: 'q23',
      type: 'multiple-choice' as const,
      question: 'What is printed?\n\nimport os\n\npath = "/home/user/data/file.csv"\nprint(os.path.basename(path))',
      options: [
        '/home/user/data',
        'file.csv',
        'file',
        '.csv'
      ],
      correctAnswer: 1,
      explanation: 'os.path.basename() returns the final component of the path: "file.csv".',
      points: 5,
    },

    // Question 24 - File mode "x" (exclusive creation)
    {
      id: 'q24',
      type: 'multiple-choice' as const,
      question: 'What happens if "output.txt" already exists?\n\nwith open("output.txt", "x") as f:\n    f.write("data")',
      options: [
        'Overwrites the file',
        'Appends to the file',
        'FileExistsError is raised',
        'Creates output(1).txt instead'
      ],
      correctAnswer: 2,
      explanation: 'Mode "x" is exclusive creation. If the file already exists, it raises FileExistsError instead of overwriting.',
      points: 5,
    },

    // Question 25 - Reading file into list with strip
    {
      id: 'q25',
      type: 'multiple-choice' as const,
      question: 'What does this print?\n\n# File "data.txt" contains: "apple\\nbanana\\ncherry\\n"\n\nwith open("data.txt", "r") as f:\n    items = [line.strip() for line in f]\n\nprint(len(items))',
      options: [
        '2',
        '3',
        '4',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'The file has 3 lines. The trailing newline is part of the last line ("cherry\\n"), not a separate line. Iterating over the file yields 3 lines, and strip() removes the newlines.',
      points: 5,
    },

    // Question 26 - pathlib parent and name
    {
      id: 'q26',
      type: 'multiple-choice' as const,
      question: 'What is the output?\n\nfrom pathlib import Path\n\np = Path("/projects/app/src/main.py")\nprint(p.parent.name)',
      options: [
        'app',
        'src',
        'projects',
        'main.py'
      ],
      correctAnswer: 1,
      explanation: 'p.parent is Path("/projects/app/src"). The .name of that path is "src".',
      points: 5,
    },

    // Question 27 - File encoding
    {
      id: 'q27',
      type: 'multiple-choice' as const,
      question: 'Which is the recommended way to open a text file with non-ASCII characters?',
      options: [
        'open("file.txt", "r")',
        'open("file.txt", "r", encoding="utf-8")',
        'open("file.txt", "rb")',
        'open("file.txt", "r", encoding="ascii")'
      ],
      correctAnswer: 1,
      explanation: 'Explicitly specifying encoding="utf-8" is best practice for text files with non-ASCII characters. It avoids platform-dependent default encodings.',
      points: 5,
    },

    // Question 28 - Binary file mode
    {
      id: 'q28',
      type: 'multiple-choice' as const,
      question: 'What type does f.read() return when a file is opened in binary mode?\n\nwith open("image.png", "rb") as f:\n    data = f.read()\n\nprint(type(data).__name__)',
      options: [
        'str',
        'bytes',
        'list',
        'bytearray'
      ],
      correctAnswer: 1,
      explanation: 'When a file is opened in binary mode ("rb"), read() returns a bytes object, not a string.',
      points: 5,
    },

    // Question 29 - os.path.splitext
    {
      id: 'q29',
      type: 'multiple-choice' as const,
      question: 'What does this print?\n\nimport os\n\nname, ext = os.path.splitext("archive.tar.gz")\nprint(ext)',
      options: [
        '.tar.gz',
        '.gz',
        '.tar',
        'tar.gz'
      ],
      correctAnswer: 1,
      explanation: 'os.path.splitext splits at the last dot. name is "archive.tar" and ext is ".gz".',
      points: 5,
    },

    // Question 30 - Context manager for multiple files
    {
      id: 'q30',
      type: 'multiple-choice' as const,
      question: 'Which approach correctly opens two files simultaneously using context managers?\n\n# Option A:\nwith open("in.txt") as f1, open("out.txt", "w") as f2:\n    f2.write(f1.read())\n\n# Option B:\nf1 = open("in.txt")\nf2 = open("out.txt", "w")\nf2.write(f1.read())',
      options: [
        'Only A is correct',
        'Only B is correct',
        'Both are correct but A is preferred',
        'Neither is correct'
      ],
      correctAnswer: 2,
      explanation: 'Both work, but Option A is preferred because the with statement guarantees both files are properly closed even if an exception occurs. Option B risks leaving files open.',
      points: 5,
    }
  ]
};
