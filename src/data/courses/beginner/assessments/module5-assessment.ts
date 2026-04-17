// Module 5 Assessment: String Manipulation
// Tests: string methods, concatenation, f-strings, formatting, text processing

import type { Assessment } from '@types';

export const module3Assessment: Assessment = {
  id: 'assessment-module-3',
  moduleId: 'module-3',
  courseId: 'beginner',
  title: 'Module 5 Assessment: String Manipulation',
  description: 'Test your knowledge of Python string operations, formatting, and text processing.',
  totalPoints: 100,
  passingScore: 80,
  timeLimit: 25,
  questions: [
    // Question 1 - String method output
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What does this print?\n\ntext = "hello world"\nprint(text.upper())',
      options: [
        'hello world',
        'HELLO WORLD',
        'Hello World',
        'Hello world'
      ],
      correctAnswer: 1,
      explanation: '.upper() converts all characters to uppercase',
      points: 5,
      concepts: ['string methods', 'upper', 'output']
    },

    // Question 2 - String immutability
    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'What happens?\n\nword = "hello"\nword.upper()\nprint(word)',
      options: [
        'HELLO',
        'hello',
        'Hello',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'Strings are immutable - .upper() returns new string but doesn\'t change original',
      points: 5,
      concepts: ['immutability', 'string methods', 'common mistakes']
    },

    // Question 3 - String replace output
    {
      id: 'q3',
      type: 'multiple-choice',
      question: 'What prints?\n\ntext = "I like cats and cats"\nresult = text.replace("cats", "dogs")\nprint(result)',
      options: [
        'I like cats and cats',
        'I like dogs and cats',
        'I like dogs and dogs',
        'I like cats and dogs'
      ],
      correctAnswer: 2,
      explanation: '.replace() replaces ALL occurrences by default',
      points: 5,
      concepts: ['replace', 'string methods', 'all occurrences']
    },

    // Question 4 - Strip behavior
    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'What is the output?\n\ndata = "  hello  "\nprint(len(data.strip()))',
      options: [
        '10',
        '9',
        '5',
        '7'
      ],
      correctAnswer: 2,
      explanation: 'strip() removes spaces from both ends, leaving "hello" (5 chars)',
      points: 5,
      concepts: ['strip', 'len', 'whitespace']
    },

    // Question 5 - Split with delimiter
    {
      id: 'q5',
      type: 'multiple-choice',
      question: 'What does this return?\n\ncsv = "apple,banana,cherry"\nfruits = csv.split(",")\nprint(len(fruits))',
      options: [
        '1',
        '2',
        '3',
        '19'
      ],
      correctAnswer: 2,
      explanation: 'Splits on comma creating 3 items: ["apple", "banana", "cherry"]',
      points: 5,
      concepts: ['split', 'delimiter', 'lists']
    },

    // Question 6 - Join method output
    {
      id: 'q6',
      type: 'multiple-choice',
      question: 'What prints?\n\nwords = ["Python", "is", "fun"]\nsentence = " ".join(words)\nprint(sentence)',
      options: [
        'Python is fun',
        'Pythonisfun',
        '["Python", "is", "fun"]',
        'Python-is-fun'
      ],
      correctAnswer: 0,
      explanation: 'Joins list items with space separator',
      points: 5,
      concepts: ['join', 'lists to strings', 'separator']
    },

    // Question 7 - String concatenation vs repetition
    {
      id: 'q7',
      type: 'multiple-choice',
      question: 'What is the result?\n\nresult = "ab" * 3 + "c"\nprint(result)',
      options: [
        'ab3c',
        'ababab',
        'abababc',
        'abc3'
      ],
      correctAnswer: 2,
      explanation: '"ab" * 3 = "ababab", then + "c" = "abababc"',
      points: 5,
      concepts: ['repetition', 'concatenation', 'operators']
    },

    // Question 8 - String indexing
    {
      id: 'q8',
      type: 'multiple-choice',
      question: 'What prints?\n\nword = "Python"\nprint(word[0] + word[-1])',
      options: [
        'Pn',
        'Py',
        'Po',
        'yn'
      ],
      correctAnswer: 0,
      explanation: 'word[0] = "P", word[-1] = "n", concatenated = "Pn"',
      points: 5,
      concepts: ['indexing', 'negative indices', 'concatenation']
    },

    // Question 9 - String slicing output
    {
      id: 'q9',
      type: 'multiple-choice',
      question: 'What does this print?\n\ntext = "Programming"\nprint(text[3:7])',
      options: [
        'gram',
        'prog',
        'ogra',
        'Programming'
      ],
      correctAnswer: 0,
      explanation: 'Slice [3:7] gets characters at indices 3,4,5,6: "gram"',
      points: 5,
      concepts: ['slicing', 'indices', 'substrings']
    },

    // Question 10 - F-string with expression
    {
      id: 'q10',
      type: 'multiple-choice',
      question: 'What prints?\n\nx = 10\ny = 5\nprint(f"Result: {x + y}")',
      options: [
        'Result: x + y',
        'Result: 105',
        'Result: 15',
        'Error'
      ],
      correctAnswer: 2,
      explanation: 'Expression inside {} is evaluated: 10 + 5 = 15',
      points: 5,
      concepts: ['f-strings', 'expressions', 'evaluation']
    },

    // Question 11 - F-string formatting
    {
      id: 'q11',
      type: 'multiple-choice',
      question: 'What is the output?\n\nprice = 19.567\nprint(f"${price:.2f}")',
      options: [
        '$19.567',
        '$19.56',
        '$19.57',
        '$20'
      ],
      correctAnswer: 2,
      explanation: ':.2f rounds to 2 decimals: 19.567 rounds to 19.57',
      points: 5,
      concepts: ['f-strings', 'formatting', 'decimal places']
    },

    // Question 12 - String in operator
    {
      id: 'q12',
      type: 'multiple-choice',
      question: 'What prints?\n\ntext = "Hello World"\nprint("world" in text)',
      options: [
        'True',
        'False',
        '6',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'Case-sensitive: "world" != "World"',
      points: 5,
      concepts: ['in operator', 'case sensitivity', 'boolean']
    },

    // Question 13 - String find method
    {
      id: 'q13',
      type: 'multiple-choice',
      question: 'What does this print?\n\nsentence = "hello hello"\nprint(sentence.find("hello"))',
      options: [
        '-1',
        '0',
        '6',
        '2'
      ],
      correctAnswer: 1,
      explanation: '.find() returns index of FIRST occurrence',
      points: 5,
      concepts: ['find', 'first occurrence', 'index']
    },

    // Question 14 - String count method
    {
      id: 'q14',
      type: 'multiple-choice',
      question: 'What prints?\n\ntext = "banana"\nprint(text.count("a"))',
      options: [
        '1',
        '2',
        '3',
        '6'
      ],
      correctAnswer: 2,
      explanation: 'Counts all occurrences of "a": b[a]n[a]n[a] = 3',
      points: 5,
      concepts: ['count', 'frequency', 'occurrences']
    },

    // Question 15 - String startswith
    {
      id: 'q15',
      type: 'multiple-choice',
      question: 'What is the result?\n\nfilename = "report.pdf"\nprint(filename.endswith(".pdf"))',
      options: [
        'True',
        'False',
        'pdf',
        'Error'
      ],
      correctAnswer: 0,
      explanation: '.endswith() checks if string ends with specified suffix',
      points: 5,
      concepts: ['endswith', 'string checking', 'boolean']
    },

    // Question 16 - String title case
    {
      id: 'q16',
      type: 'multiple-choice',
      question: 'What prints?\n\ntext = "hello WORLD"\nprint(text.title())',
      options: [
        'hello WORLD',
        'Hello World',
        'HELLO WORLD',
        'Hello world'
      ],
      correctAnswer: 1,
      explanation: '.title() capitalizes first letter of each word',
      points: 5,
      concepts: ['title', 'case conversion', 'formatting']
    },

    // Question 17 - String isdigit method
    {
      id: 'q17',
      type: 'multiple-choice',
      question: 'What prints?\n\nvalue1 = "123".isdigit()\nvalue2 = "12.3".isdigit()\nprint(value1, value2)',
      options: [
        'True True',
        'True False',
        'False True',
        'False False'
      ],
      correctAnswer: 1,
      explanation: '.isdigit() returns True only for all digits (no decimal point)',
      points: 5,
      concepts: ['isdigit', 'validation', 'boolean']
    },

    // Question 18 - String multiplication edge case
    {
      id: 'q18',
      type: 'multiple-choice',
      question: 'What happens?\n\nresult = "x" * 0\nprint(len(result))',
      options: [
        '0',
        '1',
        'Error',
        'None'
      ],
      correctAnswer: 0,
      explanation: 'String * 0 creates empty string with length 0',
      points: 5,
      concepts: ['repetition', 'edge cases', 'empty string']
    },

    // Question 19 - String slicing with step
    {
      id: 'q19',
      type: 'multiple-choice',
      question: 'What prints?\n\nword = "Python"\nprint(word[::2])',
      options: [
        'Pto',
        'Pth',
        'Pyn',
        'yhn'
      ],
      correctAnswer: 0,
      explanation: 'Every 2nd character: P(0) t(2) o(4) = "Pto"',
      points: 5,
      concepts: ['slicing', 'step', 'pattern']
    },

    // Question 20 - Multiple string methods chained
    {
      id: 'q20',
      type: 'multiple-choice',
      question: 'What is the final result?\n\ntext = "  HELLO  "\nresult = text.strip().lower().replace("l", "w")\nprint(result)',
      options: [
        '  hello  ',
        'hewwo',
        'HEWWO',
        'hello'
      ],
      correctAnswer: 1,
      explanation: 'Chains: strip()→"HELLO", lower()→"hello", replace()→"hewwo"',
      points: 5,
      concepts: ['method chaining', 'string methods', 'order of operations']
    },

    // Question 21 - String reversal with slicing
    {
      id: 'q21',
      type: 'multiple-choice',
      question: 'What prints?\n\nword = "racecar"\nprint(word[::-1] == word)',
      options: [
        'True',
        'False',
        'racecar',
        'Error'
      ],
      correctAnswer: 0,
      explanation: 'word[::-1] reverses the string to "racecar", which equals the original. This is a palindrome check.',
      points: 5,
      concepts: ['slicing', 'reverse', 'palindrome']
    },

    // Question 22 - Multi-line string behavior
    {
      id: 'q22',
      type: 'multiple-choice',
      question: 'What is the value of len(text.splitlines())?\n\ntext = """Line 1\nLine 2\nLine 3"""',
      options: [
        '1',
        '2',
        '3',
        '6'
      ],
      correctAnswer: 2,
      explanation: 'The triple-quoted string contains 3 lines separated by newlines. splitlines() returns a list of those 3 lines.',
      points: 5,
      concepts: ['multi-line strings', 'splitlines', 'triple quotes']
    },

    // Question 23 - String formatting with padding
    {
      id: 'q23',
      type: 'multiple-choice',
      question: 'What prints?\n\nname = "Hi"\nprint(f"{name:>10}")',
      options: [
        'Hi        ',
        '        Hi',
        'Hi10',
        'Error'
      ],
      correctAnswer: 1,
      explanation: ':>10 right-aligns the string within a 10-character wide field, padding with spaces on the left.',
      points: 5,
      concepts: ['f-strings', 'alignment', 'padding']
    },

    // Question 24 - Escape characters
    {
      id: 'q24',
      type: 'multiple-choice',
      question: 'What is len(text)?\n\ntext = "Hello\\tWorld\\n"',
      options: [
        '13',
        '12',
        '11',
        '15'
      ],
      correctAnswer: 1,
      explanation: '\\t is one character (tab) and \\n is one character (newline). So: H-e-l-l-o-\\t-W-o-r-l-d-\\n = 12 characters.',
      points: 5,
      concepts: ['escape characters', 'len', 'tab and newline']
    },

    // Question 25 - String zfill method
    {
      id: 'q25',
      type: 'multiple-choice',
      question: 'What prints?\n\nnum = "42"\nprint(num.zfill(5))',
      options: [
        '42000',
        '00042',
        '42   ',
        '   42'
      ],
      correctAnswer: 1,
      explanation: 'zfill() pads the string on the left with zeros to reach the specified width of 5 characters.',
      points: 5,
      concepts: ['zfill', 'padding', 'string methods']
    },

    // Question 26 - String comparison
    {
      id: 'q26',
      type: 'multiple-choice',
      question: 'What prints?\n\nprint("apple" < "banana")',
      options: [
        'True',
        'False',
        'Error',
        'None'
      ],
      correctAnswer: 0,
      explanation: 'Strings are compared lexicographically (alphabetical order). "apple" comes before "banana", so the comparison is True.',
      points: 5,
      concepts: ['string comparison', 'lexicographic order', 'operators']
    },

    // Question 27 - String ljust and rjust
    {
      id: 'q27',
      type: 'multiple-choice',
      question: 'What prints?\n\nword = "cat"\nresult = word.center(7, "-")\nprint(result)',
      options: [
        '---cat-',
        '--cat--',
        '-cat---',
        'cat----'
      ],
      correctAnswer: 1,
      explanation: 'center(7, "-") centers "cat" in a 7-character string padded with dashes: "--cat--".',
      points: 5,
      concepts: ['center', 'padding', 'alignment']
    },

    // Question 28 - String partition method
    {
      id: 'q28',
      type: 'multiple-choice',
      question: 'What prints?\n\ntext = "hello=world"\na, sep, b = text.partition("=")\nprint(b)',
      options: [
        'hello',
        '=',
        'world',
        'hello=world'
      ],
      correctAnswer: 2,
      explanation: 'partition() splits at the first occurrence of the separator, returning (before, separator, after). b gets "world".',
      points: 5,
      concepts: ['partition', 'splitting', 'unpacking']
    },

    // Question 29 - String replace with count
    {
      id: 'q29',
      type: 'multiple-choice',
      question: 'What prints?\n\ntext = "aaa bbb aaa bbb aaa"\nresult = text.replace("aaa", "xxx", 2)\nprint(result)',
      options: [
        'xxx bbb xxx bbb xxx',
        'xxx bbb xxx bbb aaa',
        'aaa bbb aaa bbb xxx',
        'xxx bbb aaa bbb aaa'
      ],
      correctAnswer: 1,
      explanation: 'The third argument to replace() limits replacements to the first 2 occurrences. Only the first two "aaa" are replaced.',
      points: 5,
      concepts: ['replace', 'count parameter', 'partial replacement']
    },

    // Question 30 - F-string with method call
    {
      id: 'q30',
      type: 'multiple-choice',
      question: 'What prints?\n\nnames = ["alice", "bob", "charlie"]\nresult = ", ".join(name.capitalize() for name in names)\nprint(result)',
      options: [
        'alice, bob, charlie',
        'ALICE, BOB, CHARLIE',
        'Alice, Bob, Charlie',
        'Error'
      ],
      correctAnswer: 2,
      explanation: 'The generator expression capitalizes each name, and join() combines them with ", ". capitalize() uppercases the first letter only.',
      points: 5,
      concepts: ['join', 'capitalize', 'generator expressions']
    }
  ]
};
