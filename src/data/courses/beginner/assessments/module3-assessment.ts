// Module 3 Assessment: Collections
// Tests: lists, dictionaries, tuples, sets, indexing, slicing

import type { Assessment } from '@types';

export const module6Assessment: Assessment = {
  id: 'assessment-module-6',
  moduleId: 'module-6',
  courseId: 'beginner',
  title: 'Module 3 Assessment: Collections',
  description: 'Test your knowledge of Python data structures including lists, dictionaries, tuples, and sets.',
  totalPoints: 100,
  passingScore: 80,
  timeLimit: 25,
  questions: [
    // Question 1 - List indexing output
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What will this print?\n\nfruits = ["apple", "banana", "cherry"]\nprint(fruits[1])',
      options: [
        'apple',
        'banana',
        'cherry',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'Index 1 is the second item (0-based indexing)',
      points: 5,
      concepts: ['lists', 'indexing', 'output']
    },

    // Question 2 - Negative indexing
    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'What does this print?\n\nnumbers = [10, 20, 30, 40]\nprint(numbers[-2])',
      options: [
        '10',
        '20',
        '30',
        '40'
      ],
      correctAnswer: 2,
      explanation: 'Negative index -2 means second from the end',
      points: 5,
      concepts: ['negative indexing', 'lists', 'output']
    },

    // Question 3 - List slicing result
    {
      id: 'q3',
      type: 'multiple-choice',
      question: 'What is the output?\n\nletters = ["a", "b", "c", "d", "e"]\nprint(letters[1:4])',
      options: [
        '["a", "b", "c"]',
        '["b", "c", "d"]',
        '["b", "c", "d", "e"]',
        '["a", "b", "c", "d"]'
      ],
      correctAnswer: 1,
      explanation: 'Slice [1:4] includes indices 1, 2, 3 (stops before 4)',
      points: 5,
      concepts: ['slicing', 'lists', 'ranges']
    },

    // Question 4 - List mutation
    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'What is in the list after this code?\n\ndata = [1, 2, 3]\ndata.append(4)\ndata[0] = 10',
      options: [
        '[1, 2, 3, 4]',
        '[10, 2, 3, 4]',
        '[10, 2, 3]',
        '[1, 2, 3, 4, 10]'
      ],
      correctAnswer: 1,
      explanation: 'Appends 4, then changes first element to 10',
      points: 5,
      concepts: ['list mutation', 'append', 'assignment']
    },

    // Question 5 - List methods combination
    {
      id: 'q5',
      type: 'multiple-choice',
      question: 'What is the final list?\n\nnums = [5, 2, 8]\nnums.append(1)\nnums.sort()',
      options: [
        '[5, 2, 8, 1]',
        '[1, 2, 5, 8]',
        '[8, 5, 2, 1]',
        '[2, 5, 8, 1]'
      ],
      correctAnswer: 1,
      explanation: 'Appends 1, then sorts in ascending order',
      points: 5,
      concepts: ['append', 'sort', 'list methods']
    },

    // Question 6 - Dictionary key access
    {
      id: 'q6',
      type: 'multiple-choice',
      question: 'What prints?\n\nperson = {"name": "Bob", "age": 30}\nprint(person["age"])',
      options: [
        'name',
        'Bob',
        '30',
        'age'
      ],
      correctAnswer: 2,
      explanation: 'Accesses value associated with key "age"',
      points: 5,
      concepts: ['dictionaries', 'key access', 'output']
    },

    // Question 7 - Dictionary modification
    {
      id: 'q7',
      type: 'multiple-choice',
      question: 'What is in the dictionary after this?\n\ncar = {"color": "red"}\ncar["model"] = "Tesla"\ncar["color"] = "blue"',
      options: [
        '{"color": "red"}',
        '{"color": "red", "model": "Tesla"}',
        '{"color": "blue", "model": "Tesla"}',
        '{"model": "Tesla"}'
      ],
      correctAnswer: 2,
      explanation: 'Adds "model" key and updates "color" to "blue"',
      points: 5,
      concepts: ['dictionary mutation', 'key assignment', 'update']
    },

    // Question 8 - Dictionary get method
    {
      id: 'q8',
      type: 'multiple-choice',
      question: 'What does this print?\n\nscores = {"Alice": 95, "Bob": 87}\nprint(scores.get("Charlie", 0))',
      options: [
        '95',
        '87',
        '0',
        'None'
      ],
      correctAnswer: 2,
      explanation: '.get() returns default value (0) when key doesn\'t exist',
      points: 5,
      concepts: ['get method', 'default values', 'dictionaries']
    },

    // Question 9 - Tuple immutability
    {
      id: 'q9',
      type: 'multiple-choice',
      question: 'What happens with this code?\n\ncoords = (10, 20)\ncoords[0] = 15',
      options: [
        'coords becomes (15, 20)',
        'Prints 15',
        'TypeError occurs',
        'Nothing happens'
      ],
      correctAnswer: 2,
      explanation: 'Tuples are immutable - cannot change items',
      points: 5,
      concepts: ['tuples', 'immutability', 'errors']
    },

    // Question 10 - Set uniqueness
    {
      id: 'q10',
      type: 'multiple-choice',
      question: 'What is in the set?\n\nnumbers = {1, 2, 3, 2, 1, 4}',
      options: [
        '{1, 2, 3, 2, 1, 4}',
        '{1, 2, 3, 4}',
        '{4, 3, 2, 1}',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'Sets automatically remove duplicates (order may vary)',
      points: 5,
      concepts: ['sets', 'uniqueness', 'duplicates']
    },

    // Question 11 - List extend vs append
    {
      id: 'q11',
      type: 'multiple-choice',
      question: 'What is the result?\n\nlist1 = [1, 2]\nlist1.extend([3, 4])',
      options: [
        '[1, 2, [3, 4]]',
        '[1, 2, 3, 4]',
        '[[1, 2], [3, 4]]',
        'Error'
      ],
      correctAnswer: 1,
      explanation: '.extend() adds each element individually, not as a nested list',
      points: 5,
      concepts: ['extend', 'append', 'difference']
    },

    // Question 12 - List append vs extend
    {
      id: 'q12',
      type: 'multiple-choice',
      question: 'What is the result?\n\nlist1 = [1, 2]\nlist1.append([3, 4])',
      options: [
        '[1, 2, [3, 4]]',
        '[1, 2, 3, 4]',
        '[[1, 2], [3, 4]]',
        'Error'
      ],
      correctAnswer: 0,
      explanation: '.append() adds the entire list as a single element',
      points: 5,
      concepts: ['append', 'extend', 'nested lists']
    },

    // Question 13 - List remove vs pop
    {
      id: 'q13',
      type: 'multiple-choice',
      question: 'What does pop() return?\n\nitems = ["x", "y", "z"]\nresult = items.pop()',
      options: [
        '"x"',
        '"y"',
        '"z"',
        'None'
      ],
      correctAnswer: 2,
      explanation: '.pop() removes and returns the last item',
      points: 5,
      concepts: ['pop', 'return values', 'list methods']
    },

    // Question 14 - Dictionary keys method
    {
      id: 'q14',
      type: 'multiple-choice',
      question: 'What does this output?\n\ndata = {"a": 1, "b": 2}\nprint("b" in data)',
      options: [
        'True',
        'False',
        '2',
        'Error'
      ],
      correctAnswer: 0,
      explanation: '"in" checks if key exists in dictionary',
      points: 5,
      concepts: ['in operator', 'dictionaries', 'membership']
    },

    // Question 15 - Slice with step
    {
      id: 'q15',
      type: 'multiple-choice',
      question: 'What is the output?\n\nnums = [0, 1, 2, 3, 4, 5, 6]\nprint(nums[::2])',
      options: [
        '[0, 1, 2, 3]',
        '[0, 2, 4, 6]',
        '[1, 3, 5]',
        '[0, 1, 2]'
      ],
      correctAnswer: 1,
      explanation: 'Step of 2 takes every second element starting from 0',
      points: 5,
      concepts: ['slicing', 'step', 'lists']
    },

    // Question 16 - List count method
    {
      id: 'q16',
      type: 'multiple-choice',
      question: 'What prints?\n\nletters = ["a", "b", "a", "c", "a"]\nprint(letters.count("a"))',
      options: [
        '1',
        '2',
        '3',
        '5'
      ],
      correctAnswer: 2,
      explanation: 'count() returns number of occurrences of "a"',
      points: 5,
      concepts: ['count method', 'lists', 'frequency']
    },

    // Question 17 - Dictionary update
    {
      id: 'q17',
      type: 'multiple-choice',
      question: 'What is the result?\n\ndict1 = {"x": 1}\ndict2 = {"y": 2, "x": 3}\ndict1.update(dict2)',
      options: [
        '{"x": 1}',
        '{"x": 1, "y": 2}',
        '{"x": 3, "y": 2}',
        '{"y": 2}'
      ],
      correctAnswer: 2,
      explanation: '.update() adds new keys and overwrites existing ones',
      points: 5,
      concepts: ['update method', 'dictionaries', 'merging']
    },

    // Question 18 - List index method error
    {
      id: 'q18',
      type: 'multiple-choice',
      question: 'What happens?\n\ncolors = ["red", "blue", "green"]\nprint(colors.index("yellow"))',
      options: [
        'Prints -1',
        'Prints None',
        'ValueError occurs',
        'Returns 3'
      ],
      correctAnswer: 2,
      explanation: '.index() raises ValueError when item not found',
      points: 5,
      concepts: ['index method', 'errors', 'ValueError']
    },

    // Question 19 - Nested list access
    {
      id: 'q19',
      type: 'multiple-choice',
      question: 'What prints?\n\nmatrix = [[1, 2], [3, 4], [5, 6]]\nprint(matrix[2][0])',
      options: [
        '1',
        '3',
        '5',
        '6'
      ],
      correctAnswer: 2,
      explanation: 'matrix[2] gets third list [5, 6], then [0] gets first element 5',
      points: 5,
      concepts: ['nested lists', 'indexing', '2D lists']
    },

    // Question 20 - List modification during iteration
    {
      id: 'q20',
      type: 'multiple-choice',
      question: 'What is in the list after?\n\nnumbers = [1, 2, 3]\nfor num in numbers:\n    if num == 2:\n        numbers.remove(num)\nprint(len(numbers))',
      options: [
        '1',
        '2',
        '3',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'Removes 2, leaving [1, 3] with length 2',
      points: 5,
      concepts: ['list modification', 'iteration', 'remove']
    },

    {
      id: 'q21',
      type: 'multiple-choice' as const,
      question: 'What is the output of: print("hello world".title())',
      options: [
        'HELLO WORLD',
        'hello world',
        'Hello World',
        'Hello world'
      ],
      correctAnswer: 2,
      explanation: 'The .title() method capitalizes the first letter of each word.',
      points: 5,
    },

    {
      id: 'q22',
      type: 'multiple-choice' as const,
      question: 'What does "Python".replace("thon", "rate") return?',
      options: [
        '"Pyrate"',
        '"Pythonrate"',
        '"rate"',
        '"Pyratethon"'
      ],
      correctAnswer: 0,
      explanation: '.replace() finds "thon" in "Python" and replaces it with "rate", giving "Pyrate".',
      points: 5,
    },

    {
      id: 'q23',
      type: 'multiple-choice' as const,
      question: 'What is the result of: "-".join(["2025", "03", "12"])',
      options: [
        '"2025-03-12"',
        '"-2025-03-12-"',
        '"2025", "03", "12"',
        '"20250312"'
      ],
      correctAnswer: 0,
      explanation: '.join() inserts the separator string between each element of the list, producing "2025-03-12".',
      points: 5,
    },

    {
      id: 'q24',
      type: 'multiple-choice' as const,
      question: 'What does "  hello  ".strip() return?',
      options: [
        '"  hello  "',
        '"hello  "',
        '"  hello"',
        '"hello"'
      ],
      correctAnswer: 3,
      explanation: '.strip() removes whitespace from both the beginning and end of the string.',
      points: 5,
    },

    {
      id: 'q25',
      type: 'multiple-choice' as const,
      question: 'What is the output of: print("banana".count("an"))',
      options: [
        '1',
        '2',
        '3',
        '0'
      ],
      correctAnswer: 1,
      explanation: '.count() finds non-overlapping occurrences of "an" in "banana": positions 1 and 3, so 2 times.',
      points: 5,
    },

    {
      id: 'q26',
      type: 'multiple-choice' as const,
      question: 'What does "hello,world,python".split(",") return?',
      options: [
        '"hello world python"',
        '["hello", "world", "python"]',
        '("hello", "world", "python")',
        '["hello,world,python"]'
      ],
      correctAnswer: 1,
      explanation: '.split(",") splits the string at each comma and returns a list of the parts.',
      points: 5,
    },

    {
      id: 'q27',
      type: 'multiple-choice' as const,
      question: 'What is the result of: "abc123".isalpha()',
      options: [
        'True',
        'False',
        '"abc"',
        'Error'
      ],
      correctAnswer: 1,
      explanation: '.isalpha() returns False because the string contains digits. It only returns True if ALL characters are alphabetic.',
      points: 5,
    },

    {
      id: 'q28',
      type: 'multiple-choice' as const,
      question: 'What does this f-string produce? x = 42; print(f"{x:>10}")',
      options: [
        '"42        "',
        '"        42"',
        '"    42    "',
        '"42"'
      ],
      correctAnswer: 1,
      explanation: 'The :>10 format spec right-aligns the value in a field 10 characters wide, padding with spaces on the left.',
      points: 5,
    },

    {
      id: 'q29',
      type: 'multiple-choice' as const,
      question: 'What is the output of: print("Python"[1:4] + "Python"[0])',
      options: [
        '"ythP"',
        '"ythoP"',
        '"PythP"',
        '"ythonP"'
      ],
      correctAnswer: 0,
      explanation: '"Python"[1:4] gives "yth" and "Python"[0] gives "P", concatenated to "ythP".',
      points: 5,
    },

    {
      id: 'q30',
      type: 'multiple-choice' as const,
      question: 'What does "Hello World".swapcase() return?',
      options: [
        '"HELLO WORLD"',
        '"hello world"',
        '"hELLO wORLD"',
        '"Hello world"'
      ],
      correctAnswer: 2,
      explanation: '.swapcase() converts uppercase letters to lowercase and lowercase letters to uppercase.',
      points: 5,
    }
  ]
};
