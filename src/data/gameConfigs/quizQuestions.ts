// Quiz Questions for Each Lesson
// Organized by lesson ID with 10-15 questions each

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export const quizQuestionsByLesson: Record<string, QuizQuestion[]> = {
  'lesson-1-1': [
    {
      question: 'Which function displays output in Python?',
      options: ['show()', 'print()', 'display()', 'output()'],
      correctIndex: 1,
      explanation: 'print() is the standard function to display output'
    },
    {
      question: 'What do you put around text in a print statement?',
      options: ['Quotes " "', 'Parentheses ()', 'Brackets []', 'Braces {}'],
      correctIndex: 0,
      explanation: 'Text needs to be in quotes (single or double)'
    },
    {
      question: 'Can you print numbers without quotes?',
      options: ['Only sometimes', 'No', 'Yes', 'Only with brackets'],
      correctIndex: 2,
      explanation: 'Numbers can be printed directly: print(42)'
    },
    {
      question: 'What does print("Hello") do?',
      options: ['Stores Hello in memory', 'Creates a variable', 'Displays Hello on screen', 'Does nothing'],
      correctIndex: 2,
      explanation: 'print() displays the text on the screen'
    },
    {
      question: 'Which is correct?',
      options: ['print "Hi"', 'print("Hi")', 'print(Hi)', 'Print("Hi")'],
      correctIndex: 1,
      explanation: 'Correct syntax: print("Hi") with parentheses and quotes'
    },
    {
      question: 'What happens after a print() statement?',
      options: ['Clears the screen', 'Stops the program', 'Waits for input', 'Creates a new line'],
      correctIndex: 3,
      explanation: 'print() automatically adds a new line after output'
    },
    {
      question: 'Can you use both single and double quotes?',
      options: ['No, only double', 'Yes, both work', 'No, only single', 'It depends'],
      correctIndex: 1,
      explanation: 'Both \'Hi\' and "Hi" work the same way'
    },
    {
      question: 'What does print(123) display?',
      options: ['\"123\"', 'Error', 'Nothing', '123'],
      correctIndex: 3,
      explanation: 'Numbers print without quotes: 123'
    },
    {
      question: 'Which is a valid print statement?',
      options: ['print[Python]', 'print{Python}', 'print(\'Python\')', 'print<Python>'],
      correctIndex: 2,
      explanation: 'Use parentheses () and quotes for text'
    },
    {
      question: 'What\'s the output of: print("A"); print("B")',
      options: ['A then B on new lines', 'AB on same line', 'B then A', 'Error'],
      correctIndex: 0,
      explanation: 'Each print() creates a new line'
    },
    {
      question: 'What does print("3" + "4") display?',
      options: ['7', '34', '"3" + "4"', 'Error'],
      correctIndex: 1,
      explanation: 'Adding two strings concatenates them: "3" + "4" = "34"'
    },
    {
      question: 'What is the output of print("Hello", "World")?',
      options: ['HelloWorld', 'Hello World', 'Hello, World', 'Error'],
      correctIndex: 1,
      explanation: 'Commas in print() add a space between items'
    },
    {
      question: 'Which will cause an error?',
      options: ['print("test")', 'print(100)', 'print(Hello)', 'print()'],
      correctIndex: 2,
      explanation: 'Hello without quotes is treated as an undefined variable, causing an error'
    },
    {
      question: 'What does print() with no arguments do?',
      options: ['Causes an error', 'Prints the word "None"', 'Prints a blank line', 'Does nothing'],
      correctIndex: 2,
      explanation: 'print() with no arguments outputs an empty line'
    },
    {
      question: 'What is the output of print("5 + 3")?',
      options: ['8', '5 + 3', 'Error', '"5 + 3"'],
      correctIndex: 1,
      explanation: 'Text inside quotes is printed literally, not calculated'
    },
    {
      question: 'What is the output of print(5 + 3)?',
      options: ['5 + 3', '"8"', '8', 'Error'],
      correctIndex: 2,
      explanation: 'Without quotes, Python evaluates the expression: 5 + 3 = 8'
    },
    {
      question: 'How many lines of output does print("X\\nY") produce?',
      options: ['1', '2', '3', 'Error'],
      correctIndex: 1,
      explanation: '\\n is a newline character, so X and Y appear on separate lines'
    },
    {
      question: 'What does print("Ha" * 3) display?',
      options: ['Ha 3', 'Ha * 3', 'HaHaHa', 'Error'],
      correctIndex: 2,
      explanation: 'Multiplying a string repeats it: "Ha" * 3 = "HaHaHa"'
    },
    {
      question: 'Which statement prints a tab between words?',
      options: ['print("A  B")', 'print("A\\tB")', 'print("A" tab "B")', 'print("A", tab, "B")'],
      correctIndex: 1,
      explanation: '\\t is the tab character used inside strings'
    },
    {
      question: 'What happens if you forget the closing parenthesis: print("Hi"',
      options: ['It still works', 'Prints Hi without formatting', 'SyntaxError', 'Prints nothing'],
      correctIndex: 2,
      explanation: 'Missing parenthesis causes a SyntaxError in Python'
    },
  ],

  'lesson-1-2': [
    {
      question: 'What is a variable?',
      options: ['A type of loop', 'A function', 'A container for storing data', 'An error'],
      correctIndex: 2,
      explanation: 'Variables store data that can be used later'
    },
    {
      question: 'Which creates a variable?',
      options: ['x == 5', 'x = 5', 'var x = 5', 'int x = 5'],
      correctIndex: 1,
      explanation: 'Use = to assign a value to a variable'
    },
    {
      question: 'What type is "Hello"?',
      options: ['integer', 'float', 'boolean', 'string'],
      correctIndex: 3,
      explanation: 'Text in quotes is a string (str)'
    },
    {
      question: 'What type is 42?',
      options: ['string', 'integer', 'float', 'boolean'],
      correctIndex: 1,
      explanation: 'Whole numbers are integers (int)'
    },
    {
      question: 'What type is 3.14?',
      options: ['integer', 'string', 'float', 'boolean'],
      correctIndex: 2,
      explanation: 'Decimal numbers are floats'
    },
    {
      question: 'What type is True?',
      options: ['string', 'boolean', 'integer', 'float'],
      correctIndex: 1,
      explanation: 'True and False are booleans (bool)'
    },
    {
      question: 'Are age and Age the same variable?',
      options: ['Yes', 'Sometimes', 'No', 'Depends on value'],
      correctIndex: 2,
      explanation: 'Python is case-sensitive'
    },
    {
      question: 'Which is a valid variable name?',
      options: ['2user', 'user-age', 'user age', 'user_age'],
      correctIndex: 3,
      explanation: 'Use letters, numbers, underscores; start with letter'
    },
    {
      question: 'Can you use "print" as a variable name?',
      options: ['Yes, always', 'Only sometimes', 'No, it\'s reserved', 'Yes, but not recommended'],
      correctIndex: 2,
      explanation: 'Don\'t use Python keywords as variable names'
    },
    {
      question: 'What does x = "5" create?',
      options: ['String variable', 'Integer variable', 'Float variable', 'Error'],
      correctIndex: 0,
      explanation: 'Quotes make it a string, not a number'
    },
    {
      question: 'What does type(3.0) return?',
      options: ['<class \'int\'>', '<class \'float\'>', '<class \'str\'>', '<class \'number\'>'],
      correctIndex: 1,
      explanation: '3.0 has a decimal point so it is a float'
    },
    {
      question: 'What happens when you run: x = 10 then x = 20?',
      options: ['Error: variable already exists', 'x holds both values', 'x is now 20', 'x is still 10'],
      correctIndex: 2,
      explanation: 'Reassigning a variable replaces the old value with the new one'
    },
    {
      question: 'Which variable name is invalid?',
      options: ['_score', 'my_var', 'class', 'data1'],
      correctIndex: 2,
      explanation: '"class" is a reserved keyword in Python and cannot be used as a variable name'
    },
    {
      question: 'What is the type of False?',
      options: ['str', 'int', 'bool', 'NoneType'],
      correctIndex: 2,
      explanation: 'False is a boolean value of type bool'
    },
    {
      question: 'What does type("123") return?',
      options: ['<class \'int\'>', '<class \'float\'>', '<class \'str\'>', '<class \'number\'>'],
      correctIndex: 2,
      explanation: 'Anything inside quotes is a string, even if it looks like a number'
    },
    {
      question: 'After a = 5 and b = a, what is b?',
      options: ['undefined', '0', '5', 'Error'],
      correctIndex: 2,
      explanation: 'b gets a copy of the value stored in a, which is 5'
    },
    {
      question: 'Which naming convention is recommended in Python?',
      options: ['camelCase', 'snake_case', 'PascalCase', 'ALLCAPS'],
      correctIndex: 1,
      explanation: 'Python convention uses snake_case for variable names (e.g., my_variable)'
    },
    {
      question: 'What does type(True) return?',
      options: ['<class \'str\'>', '<class \'int\'>', '<class \'bool\'>', '<class \'true\'>'],
      correctIndex: 2,
      explanation: 'True is a boolean, so type() returns <class \'bool\'>'
    },
    {
      question: 'What is the result of: x = 7.0; print(type(x))?',
      options: ['<class \'int\'>', '<class \'float\'>', '<class \'str\'>', '7.0'],
      correctIndex: 1,
      explanation: '7.0 is a float because it has a decimal point'
    },
    {
      question: 'Can a variable change type in Python?',
      options: ['No, types are fixed', 'Only with a special function', 'Yes, Python is dynamically typed', 'Only strings can change'],
      correctIndex: 2,
      explanation: 'Python is dynamically typed: x = 5 then x = "hello" is valid'
    },
  ],

  'lesson-1-3': [
    {
      question: 'Which symbol is used for multiplication in Python?',
      options: ['x', '*', '×', 'mult'],
      correctIndex: 1,
      explanation: 'Python uses * for multiplication: 6 * 7'
    },
    {
      question: 'What does the / operator always return in Python?',
      options: ['An integer', 'A string', 'A float (decimal)', 'It depends'],
      correctIndex: 2,
      explanation: 'Division (/) always returns a float: 15 / 3 = 5.0'
    },
    {
      question: 'How do you write "2 to the power of 3" in Python?',
      options: ['2 ^ 3', 'pow(2, 3)', '2 ^^ 3', '2 ** 3'],
      correctIndex: 3,
      explanation: 'Use ** for exponents: 2 ** 3 = 8'
    },
    {
      question: 'What is the // operator used for?',
      options: ['Comments', 'Integer division', 'Regular division', 'Multiplication'],
      correctIndex: 1,
      explanation: 'Integer division drops decimals: 15 // 4 = 3'
    },
    {
      question: 'What does the % operator do?',
      options: ['Calculates percentage', 'Divides numbers', 'Returns the remainder', 'Multiplies by 100'],
      correctIndex: 2,
      explanation: 'Modulus (%) gives remainder: 17 % 5 = 2'
    },
    {
      question: 'Which is the correct way to add in Python?',
      options: ['x = 5 plus 3', 'x = add(5, 3)', 'x = 5 + 3', 'x = 5 & 3'],
      correctIndex: 2,
      explanation: 'Use + operator: x = 5 + 3'
    },
    {
      question: 'What happens in: result = 10 / 2',
      options: ['result is 5 (int)', 'result is 5.0 (float)', 'Error occurs', 'result is a string'],
      correctIndex: 1,
      explanation: 'Division always returns float, even for whole numbers'
    },
    {
      question: 'In 2 + 3 * 4, which operation happens first?',
      options: ['2 + 3', 'Left to right', 'All together', '3 * 4'],
      correctIndex: 3,
      explanation: 'Python follows order of operations (PEMDAS): multiply before add'
    },
    {
      question: 'How do you force addition before multiplication?',
      options: ['Change operator order', 'Use parentheses: (2 + 3) * 4', 'Use // instead', 'Not possible'],
      correctIndex: 1,
      explanation: 'Parentheses override order: (2 + 3) * 4 = 20'
    },
    {
      question: 'Which calculates 10 minus 3 in Python?',
      options: ['10 subtract 3', 'minus(10, 3)', '10 - 3', '10 -- 3'],
      correctIndex: 2,
      explanation: 'Use - operator for subtraction: 10 - 3 = 7'
    },
    {
      question: 'What is the result of 17 // 5?',
      options: ['3.4', '3', '4', '2'],
      correctIndex: 1,
      explanation: 'Integer division (//) drops the decimal: 17 // 5 = 3'
    },
    {
      question: 'What is the result of 10 % 3?',
      options: ['3', '0', '1', '3.33'],
      correctIndex: 2,
      explanation: '10 divided by 3 is 3 remainder 1, so 10 % 3 = 1'
    },
    {
      question: 'What is 3 ** 0?',
      options: ['0', '3', '1', 'Error'],
      correctIndex: 2,
      explanation: 'Any number raised to the power of 0 equals 1'
    },
    {
      question: 'What is the result of 7 / 2?',
      options: ['3', '3.5', '4', '3.0'],
      correctIndex: 1,
      explanation: 'Regular division always returns a float: 7 / 2 = 3.5'
    },
    {
      question: 'What is the result of (10 + 2) * 3?',
      options: ['16', '36', '32', '42'],
      correctIndex: 1,
      explanation: 'Parentheses first: (10 + 2) = 12, then 12 * 3 = 36'
    },
    {
      question: 'What does -7 % 3 return in Python?',
      options: ['-1', '2', '1', '-2'],
      correctIndex: 1,
      explanation: 'In Python, modulus result takes the sign of the divisor: -7 % 3 = 2'
    },
    {
      question: 'What is 2 ** 4?',
      options: ['8', '6', '16', '24'],
      correctIndex: 2,
      explanation: '2 ** 4 means 2 * 2 * 2 * 2 = 16'
    },
    {
      question: 'What is the result of 5 + 10 // 3?',
      options: ['5', '8', '5.0', '3'],
      correctIndex: 1,
      explanation: '// happens before +: 10 // 3 = 3, then 5 + 3 = 8'
    },
    {
      question: 'What operator would you use to check if a number is even?',
      options: ['/', '//', '%', '**'],
      correctIndex: 2,
      explanation: 'Use % (modulus): if number % 2 == 0, it is even'
    },
    {
      question: 'What is the result of 9 // 2 * 2?',
      options: ['9', '8', '4', '9.0'],
      correctIndex: 1,
      explanation: 'Left to right: 9 // 2 = 4, then 4 * 2 = 8'
    },
  ],

  'lesson-1-4': [
    {
      question: 'How do you write a single-line comment?',
      options: ['// comment', '# comment', '/* comment */', '-- comment'],
      correctIndex: 1,
      explanation: 'Use # for comments in Python'
    },
    {
      question: 'Does Python execute comments?',
      options: ['Yes', 'Sometimes', 'No', 'Only in scripts'],
      correctIndex: 2,
      explanation: 'Python completely ignores comments'
    },
    {
      question: 'Can you add comments after code?',
      options: ['No', 'Only sometimes', 'Not recommended', 'Yes'],
      correctIndex: 3,
      explanation: 'print(5)  # This is valid'
    },
    {
      question: 'How do you write multi-line comments?',
      options: ['### comment ###', '"""comment"""', '/* comment */', '## comment ##'],
      correctIndex: 1,
      explanation: 'Use triple quotes for multi-line comments'
    },
    {
      question: 'What should comments explain?',
      options: ['WHAT the code does', 'WHY you did something', 'Both equally', 'Neither'],
      correctIndex: 1,
      explanation: 'Explain the reasoning, not the obvious'
    },
    {
      question: 'Is "# x = 5" a comment or code?',
      options: ['Code', 'Both', 'Comment', 'Error'],
      correctIndex: 2,
      explanation: '# makes the entire line a comment'
    },
    {
      question: 'Are comments required in Python?',
      options: ['Yes, always', 'Only for functions', 'No, but helpful', 'Only for classes'],
      correctIndex: 2,
      explanation: 'Comments are optional but good practice'
    },
    {
      question: 'What\'s wrong with: # add 2 and 2 \\n x = 2 + 2',
      options: ['Wrong syntax', 'States the obvious', 'Nothing wrong', 'Too long'],
      correctIndex: 1,
      explanation: 'Don\'t comment obvious code'
    },
    {
      question: 'Can comments help you debug?',
      options: ['No', 'Only sometimes', 'Not their purpose', 'Yes'],
      correctIndex: 3,
      explanation: 'Comment out code to test without deleting it'
    },
    {
      question: 'Should you update comments when code changes?',
      options: ['No', 'Yes', 'Optional', 'Not necessary'],
      correctIndex: 1,
      explanation: 'Outdated comments are worse than no comments'
    },
    {
      question: 'What is the output of: # print("Hello")',
      options: ['Hello', 'Nothing, it is a comment', '# print("Hello")', 'Error'],
      correctIndex: 1,
      explanation: 'The # makes the entire line a comment, so nothing is executed or printed'
    },
    {
      question: 'Which is a valid docstring?',
      options: ['# This is a docstring', '// This is a docstring', '"""This is a docstring"""', '/* This is a docstring */'],
      correctIndex: 2,
      explanation: 'Docstrings use triple quotes (""" or \'\'\')'
    },
    {
      question: 'Where should a docstring be placed in a function?',
      options: ['Before the function definition', 'At the end of the function', 'Right after the def line', 'Anywhere in the function'],
      correctIndex: 2,
      explanation: 'Docstrings go immediately after the def line as the first statement'
    },
    {
      question: 'What is the purpose of commenting out code?',
      options: ['To delete it permanently', 'To temporarily disable it for testing', 'To make it run faster', 'To convert it to a string'],
      correctIndex: 1,
      explanation: 'Commenting out code lets you disable it without deleting, useful for debugging'
    },
    {
      question: 'Which comment is better practice?',
      options: ['# x = x + 1, adds 1 to x', '# Increment retry counter after failed attempt', '# This is a line of code', '# Variable operation'],
      correctIndex: 1,
      explanation: 'Good comments explain WHY, not WHAT: the intent behind the code'
    },
    {
      question: 'Can a comment span multiple lines using # on each line?',
      options: ['No, use /* */ instead', 'Yes, each line starts with #', 'Only up to 3 lines', 'No, only triple quotes work'],
      correctIndex: 1,
      explanation: 'You can use # at the start of each line for multi-line comments'
    },
    {
      question: 'What happens if you put # in the middle of a string: print("Cost is #100")?',
      options: ['Everything after # is a comment', 'Error', 'Prints: Cost is #100', 'Prints: Cost is'],
      correctIndex: 2,
      explanation: '# inside a string is treated as a regular character, not a comment'
    },
    {
      question: 'Which is the correct inline comment style?',
      options: ['x = 5 // set x to 5', 'x = 5  # set x to 5', 'x = 5 /* set x to 5 */', 'x = 5 -- set x to 5'],
      correctIndex: 1,
      explanation: 'Inline comments use # with two spaces before it by convention'
    },
    {
      question: 'What is a TODO comment?',
      options: ['A comment that runs later', 'A note marking work to be done', 'A type of docstring', 'A syntax error'],
      correctIndex: 1,
      explanation: '# TODO: comments mark tasks that need to be completed later'
    },
    {
      question: 'Which triple-quote style is valid for docstrings?',
      options: ['Only """', 'Only \'\'\'', 'Both """ and \'\'\'', 'Neither, use #'],
      correctIndex: 2,
      explanation: 'Both triple double quotes and triple single quotes work for docstrings'
    },
  ],

  'lesson-1-5': [
    {
      question: 'Which function gets user input?',
      options: ['get()', 'read()', 'input()', 'scan()'],
      correctIndex: 2,
      explanation: 'input() asks for and receives user input'
    },
    {
      question: 'What type does input() return?',
      options: ['integer', 'string', 'float', 'depends on input'],
      correctIndex: 1,
      explanation: 'input() always returns a string'
    },
    {
      question: 'How do you convert input to a number?',
      options: ['input(int)', 'number(input())', 'int(input())', 'input().int()'],
      correctIndex: 2,
      explanation: 'Wrap input() with int() to convert'
    },
    {
      question: 'What does f"Hi {name}" do?',
      options: ['Multiplies string', 'Creates function', 'Error', 'Inserts variable into string'],
      correctIndex: 3,
      explanation: 'F-strings insert variables using {}'
    },
    {
      question: 'What\'s another way to combine "Hi" and name?',
      options: ['"Hi" * name', '"Hi", name', '"Hi " + name', '"Hi".name'],
      correctIndex: 2,
      explanation: 'Use + to concatenate strings'
    },
    {
      question: 'What happens when input() runs?',
      options: ['Continues immediately', 'Waits for user input', 'Displays error', 'Returns None'],
      correctIndex: 1,
      explanation: 'Program pauses until user presses Enter'
    },
    {
      question: 'Can you add a prompt to input()?',
      options: ['No', 'Only sometimes', 'Yes', 'Not recommended'],
      correctIndex: 2,
      explanation: 'input("Question: ") displays the prompt'
    },
    {
      question: 'What\'s the output of: print(f"{2+2}")',
      options: ['2+2', '{2+2}', 'Error', '4'],
      correctIndex: 3,
      explanation: 'F-strings evaluate expressions in {}'
    },
    {
      question: 'How do you convert "42" to a number?',
      options: ['"42".int()', 'int("42")', 'number("42")', 'to_int("42")'],
      correctIndex: 1,
      explanation: 'int() converts strings to integers'
    },
    {
      question: 'What\'s better: "Hi " + name or f"Hi {name}"?',
      options: ['"Hi " + name', 'Both equal', 'f"Hi {name}"', 'Neither'],
      correctIndex: 2,
      explanation: 'F-strings are cleaner and more flexible'
    },
    {
      question: 'What does float(input()) do?',
      options: ['Gets input as an integer', 'Gets input as a decimal number', 'Causes an error', 'Gets input as a string'],
      correctIndex: 1,
      explanation: 'float() converts the string from input() into a decimal number'
    },
    {
      question: 'What is the output of: name = "Alice"; print(f"Hello, {name}!")?',
      options: ['Hello, {name}!', 'Hello, Alice!', 'f"Hello, Alice!"', 'Error'],
      correctIndex: 1,
      explanation: 'The f-string replaces {name} with the value of the variable: Alice'
    },
    {
      question: 'What happens if the user types "abc" and you run int(input())?',
      options: ['Returns 0', 'Returns "abc"', 'ValueError', 'Returns None'],
      correctIndex: 2,
      explanation: 'int() cannot convert non-numeric text, so it raises a ValueError'
    },
    {
      question: 'What does f"{10 * 3}" evaluate to?',
      options: ['"10 * 3"', '"30"', '30', '{10 * 3}'],
      correctIndex: 2,
      explanation: 'F-strings evaluate the expression inside {}, producing the string "30" which displays as 30'
    },
    {
      question: 'What is the output of: x = 5; print(f"x = {x}")?',
      options: ['x = {x}', 'x = 5', '5 = 5', 'Error'],
      correctIndex: 1,
      explanation: 'The literal "x = " is kept, and {x} is replaced with 5'
    },
    {
      question: 'How do you display a literal curly brace in an f-string?',
      options: ['Use \\{', 'Use {{', 'Not possible', 'Use {brace}'],
      correctIndex: 1,
      explanation: 'Double the braces to display them literally: f"{{" prints {'
    },
    {
      question: 'What is the result of: age = input("Age: "); print(age + 1)?',
      options: ['The age plus 1', 'TypeError', 'The age with 1 appended', 'Nothing'],
      correctIndex: 1,
      explanation: 'input() returns a string; you cannot add a string and an integer without converting first'
    },
    {
      question: 'Which correctly gets a number from the user and doubles it?',
      options: ['x = input() * 2', 'x = int(input()) * 2', 'x = input(int) * 2', 'x = double(input())'],
      correctIndex: 1,
      explanation: 'First convert to int with int(input()), then multiply by 2'
    },
    {
      question: 'What does f"{"Python"}" produce?',
      options: ['Python', 'Error', '{"Python"}', 'f"Python"'],
      correctIndex: 0,
      explanation: 'The expression inside {} is the string "Python", which evaluates to Python'
    },
    {
      question: 'What is the output of: print(f"{5 > 3}")?',
      options: ['5 > 3', 'True', 'False', 'Error'],
      correctIndex: 1,
      explanation: 'F-strings evaluate expressions: 5 > 3 is True, so it prints True'
    },
  ],

  // MODULE 2: Control Flow
  'lesson-5-1': [
    {
      question: 'What does an if statement do?',
      options: ['Repeats code', 'Runs code only if condition is True', 'Creates a function', 'Stops the program'],
      correctIndex: 1,
      explanation: 'if statements execute code conditionally'
    },
    {
      question: 'What is the comparison operator for "equals"?',
      options: ['=', '!=', '==', '==='],
      correctIndex: 2,
      explanation: '== checks equality, = is for assignment'
    },
    {
      question: 'What symbol ends an if statement line?',
      options: [';', '{', 'nothing', ':'],
      correctIndex: 3,
      explanation: 'if statements end with a colon :'
    },
    {
      question: 'How do you check if x is greater than 5?',
      options: ['if x >> 5:', 'if x > 5:', 'if (x > 5)', 'if x > 5 then:'],
      correctIndex: 1,
      explanation: 'Use > operator with colon: if x > 5:'
    },
    {
      question: 'What does indentation mean in Python?',
      options: ['Just for style', 'Shows code belongs to if block', 'Optional spacing', 'Causes errors'],
      correctIndex: 1,
      explanation: 'Indentation defines code blocks in Python'
    },
    {
      question: 'What does != mean?',
      options: ['Not', 'Equal', 'Not equal', 'Assignment'],
      correctIndex: 2,
      explanation: '!= checks if values are different'
    },
    {
      question: 'Can you have multiple conditions?',
      options: ['No, only one', 'Only with functions', 'Yes, with and/or', 'Only in loops'],
      correctIndex: 2,
      explanation: 'Combine conditions with "and" or "or"'
    },
    {
      question: 'What does "and" do between conditions?',
      options: ['Either can be True', 'Neither can be True', 'Creates a list', 'Both must be True'],
      correctIndex: 3,
      explanation: '"and" requires all conditions to be True'
    },
    {
      question: 'What does "or" do between conditions?',
      options: ['Both must be True', 'At least one must be True', 'Neither can be True', 'All must be False'],
      correctIndex: 1,
      explanation: '"or" requires only one condition to be True'
    },
    {
      question: 'What happens if the condition is False?',
      options: ['Error occurs', 'Code runs anyway', 'Code block is skipped', 'Program stops'],
      correctIndex: 2,
      explanation: 'False condition means code block doesn\'t run'
    },
    {
      question: 'What does this print?\nx = 10\nif x > 5:\n    print("big")',
      options: ['nothing', 'big', 'error', '10'],
      correctIndex: 1,
      explanation: '10 > 5 is True, so "big" is printed'
    },
    {
      question: 'Which operator checks if two values are NOT equal?',
      options: ['<>', '!=', '!==', 'not='],
      correctIndex: 1,
      explanation: '!= is the not-equal comparison operator in Python'
    },
    {
      question: 'What is wrong with: if x = 5:',
      options: ['Missing parentheses', 'Uses = instead of ==', 'Missing indentation', 'Nothing is wrong'],
      correctIndex: 1,
      explanation: '= is assignment, == is comparison; conditions need =='
    },
    {
      question: 'What does "not True" evaluate to?',
      options: ['True', 'False', 'None', 'Error'],
      correctIndex: 1,
      explanation: 'The "not" keyword flips True to False and vice versa'
    },
    {
      question: 'What prints?\nage = 15\nif age >= 18:\n    print("adult")\nprint("done")',
      options: ['adult done', 'adult', 'done', 'nothing'],
      correctIndex: 2,
      explanation: '15 >= 18 is False so "adult" is skipped, but "done" is outside the if block'
    },
    {
      question: 'Which is a valid if statement?',
      options: ['if (x > 5) {', 'if x > 5:', 'if x > 5 then', 'IF x > 5:'],
      correctIndex: 1,
      explanation: 'Python uses lowercase if with a colon and no braces'
    },
    {
      question: 'What does this evaluate to?\nx = 3\nx > 1 and x < 10',
      options: ['True', 'False', '3', 'Error'],
      correctIndex: 0,
      explanation: '3 > 1 is True and 3 < 10 is True; True and True gives True'
    },
    {
      question: 'How many spaces is standard Python indentation?',
      options: ['1', '2', '4', '8'],
      correctIndex: 2,
      explanation: 'PEP 8 recommends 4 spaces for indentation'
    },
    {
      question: 'What does <= mean?',
      options: ['Less than', 'Greater than or equal', 'Less than or equal', 'Not equal'],
      correctIndex: 2,
      explanation: '<= checks if the left value is less than or equal to the right'
    },
    {
      question: 'What prints?\nx = 5\nif x > 2 or x > 10:\n    print("yes")',
      options: ['nothing', 'yes', 'error', 'no'],
      correctIndex: 1,
      explanation: '5 > 2 is True; with "or" only one condition needs to be True'
    },
  ],

  'lesson-5-2': [
    {
      question: 'What does else do?',
      options: ['Runs when if is True', 'Always runs', 'Runs when if is False', 'Checks another condition'],
      correctIndex: 2,
      explanation: 'else handles the False case'
    },
    {
      question: 'Can you have if without else?',
      options: ['No', 'Only sometimes', 'Yes', 'Only in loops'],
      correctIndex: 2,
      explanation: 'else is optional, if can stand alone'
    },
    {
      question: 'What does elif mean?',
      options: ['else loop', 'else if', 'end if', 'extra if'],
      correctIndex: 1,
      explanation: 'elif = "else if" for additional conditions'
    },
    {
      question: 'Can you have multiple elif statements?',
      options: ['No, only one', 'Maximum of 3', 'Yes, as many as needed', 'Only with else'],
      correctIndex: 2,
      explanation: 'Use multiple elif for many conditions'
    },
    {
      question: 'What\'s the order: if, elif, else?',
      options: ['Any order', 'else first', 'elif first', 'if first, elif middle, else last'],
      correctIndex: 3,
      explanation: 'Must go: if → elif (optional) → else (optional)'
    },
    {
      question: 'Does elif need a condition?',
      options: ['No', 'Optional', 'Yes', 'Only sometimes'],
      correctIndex: 2,
      explanation: 'elif always needs a condition to check'
    },
    {
      question: 'Can you have else without if?',
      options: ['Yes', 'Only with elif', 'No', 'Only in functions'],
      correctIndex: 2,
      explanation: 'else must follow an if or elif'
    },
    {
      question: 'How many blocks execute in if/elif/else?',
      options: ['All of them', 'Only one', 'None', 'Two maximum'],
      correctIndex: 1,
      explanation: 'Only the first True condition runs'
    },
    {
      question: 'Does else need a colon?',
      options: ['No', 'Optional', 'Only sometimes', 'Yes'],
      correctIndex: 3,
      explanation: 'else: needs a colon like if'
    },
    {
      question: 'What if all conditions are False?',
      options: ['Error occurs', 'else block runs', 'First block runs', 'Nothing runs'],
      correctIndex: 1,
      explanation: 'else catches all False cases'
    },
    {
      question: 'What prints?\nx = 85\nif x >= 90:\n    print("A")\nelif x >= 80:\n    print("B")\nelse:\n    print("C")',
      options: ['A', 'B', 'C', 'A and B'],
      correctIndex: 1,
      explanation: '85 >= 90 is False, but 85 >= 80 is True so "B" prints'
    },
    {
      question: 'What happens if you write elif without a preceding if?',
      options: ['It works fine', 'SyntaxError', 'It acts like if', 'It is ignored'],
      correctIndex: 1,
      explanation: 'elif must come after an if statement or another elif'
    },
    {
      question: 'What prints?\ntemp = 30\nif temp > 35:\n    print("hot")\nelif temp > 25:\n    print("warm")\nelif temp > 15:\n    print("cool")',
      options: ['hot', 'warm', 'cool', 'warm and cool'],
      correctIndex: 1,
      explanation: 'Only the first True branch runs; 30 > 25 is True so "warm" prints'
    },
    {
      question: 'Can you put an if statement inside another if statement?',
      options: ['No, not allowed', 'Only with elif', 'Yes, this is called nesting', 'Only in functions'],
      correctIndex: 2,
      explanation: 'Nested ifs are if statements inside other if blocks'
    },
    {
      question: 'What prints?\nx = 5\nif x > 0:\n    if x > 10:\n        print("big")\n    else:\n        print("small")',
      options: ['big', 'small', 'nothing', 'error'],
      correctIndex: 1,
      explanation: 'x > 0 is True, then x > 10 is False, so inner else runs'
    },
    {
      question: 'How many elif branches can follow a single if?',
      options: ['Only 1', 'Up to 5', 'Up to 10', 'As many as needed'],
      correctIndex: 3,
      explanation: 'There is no limit on the number of elif branches'
    },
    {
      question: 'What prints?\ncolor = "blue"\nif color == "red":\n    print(1)\nelif color == "blue":\n    print(2)\nelse:\n    print(3)',
      options: ['1', '2', '3', '1 and 2'],
      correctIndex: 1,
      explanation: 'color is "blue" which matches the elif condition'
    },
    {
      question: 'Is else required after elif?',
      options: ['Yes, always', 'No, it is optional', 'Only with multiple elif', 'Only if there is one elif'],
      correctIndex: 1,
      explanation: 'else is always optional; you can end with elif'
    },
    {
      question: 'What prints?\nscore = 100\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelif score == 100:\n    print("perfect")',
      options: ['A', 'B', 'perfect', 'A and perfect'],
      correctIndex: 0,
      explanation: 'The first True condition (score >= 90) runs and the rest are skipped'
    },
    {
      question: 'What is the output?\nx = 0\nif x:\n    print("truthy")\nelse:\n    print("falsy")',
      options: ['truthy', 'falsy', 'error', '0'],
      correctIndex: 1,
      explanation: '0 is a falsy value in Python, so the else branch runs'
    },
  ],

  'lesson-5-3': [
    {
      question: 'What does a while loop do?',
      options: ['Runs code once', 'Repeats code while condition is True', 'Checks a condition', 'Creates a function'],
      correctIndex: 1,
      explanation: 'while loops repeat as long as condition is True'
    },
    {
      question: 'When does a while loop stop?',
      options: ['After 10 iterations', 'When you press stop', 'When condition becomes False', 'Never'],
      correctIndex: 2,
      explanation: 'Loop stops when condition is False'
    },
    {
      question: 'What\'s an infinite loop?',
      options: ['Loop that runs once', 'Loop with no code', 'Loop that never stops', 'Loop with error'],
      correctIndex: 2,
      explanation: 'Infinite loops never have a False condition'
    },
    {
      question: 'How do you prevent infinite loops?',
      options: ['Use break always', 'Limit iterations', 'Use sleep()', 'Change the condition eventually'],
      correctIndex: 3,
      explanation: 'Make sure something makes condition False'
    },
    {
      question: 'What does count += 1 do in a loop?',
      options: ['Checks if count is 1', 'Increments count by 1', 'Creates variable', 'Error'],
      correctIndex: 1,
      explanation: '+= adds to the variable: count = count + 1'
    },
    {
      question: 'Does while need a colon?',
      options: ['No', 'Optional', 'Yes', 'Only sometimes'],
      correctIndex: 2,
      explanation: 'while condition: needs a colon'
    },
    {
      question: 'Can you use while True?',
      options: ['No', 'Only with break', 'Yes', 'Causes error'],
      correctIndex: 2,
      explanation: 'while True: creates infinite loop (use break to exit)'
    },
    {
      question: 'What happens if condition starts as False?',
      options: ['Error occurs', 'Runs once', 'Loop never runs', 'Runs forever'],
      correctIndex: 2,
      explanation: 'False condition means code never executes'
    },
    {
      question: 'Can you nest while loops?',
      options: ['No', 'Only 2 deep', 'Yes', 'Only with for'],
      correctIndex: 2,
      explanation: 'You can put loops inside loops'
    },
    {
      question: 'Is indentation required in while loops?',
      options: ['No', 'Optional', 'Only sometimes', 'Yes, for the code block'],
      correctIndex: 3,
      explanation: 'Indentation shows what code repeats'
    },
    {
      question: 'What does this print?\nx = 3\nwhile x > 0:\n    print(x)\n    x -= 1',
      options: ['3 2 1', '3 2 1 0', '2 1 0', '1 2 3'],
      correctIndex: 0,
      explanation: 'x starts at 3, prints then decrements; stops when x becomes 0'
    },
    {
      question: 'What does break do inside a while loop?',
      options: ['Pauses the loop', 'Skips one iteration', 'Exits the loop immediately', 'Restarts the loop'],
      correctIndex: 2,
      explanation: 'break immediately terminates the loop'
    },
    {
      question: 'How many times does this loop run?\ncount = 0\nwhile count < 3:\n    count += 1',
      options: ['0', '2', '3', '4'],
      correctIndex: 2,
      explanation: 'count goes 0->1, 1->2, 2->3; at 3 the condition is False (3 runs)'
    },
    {
      question: 'What causes this to be an infinite loop?\nwhile True:\n    print("hello")',
      options: ['print statement', 'The condition is always True', 'Missing colon', 'Missing variable'],
      correctIndex: 1,
      explanation: 'True never becomes False, so the loop never stops'
    },
    {
      question: 'What is the value of total after this code?\ntotal = 0\ni = 1\nwhile i <= 4:\n    total += i\n    i += 1',
      options: ['4', '10', '6', '15'],
      correctIndex: 1,
      explanation: 'total = 1 + 2 + 3 + 4 = 10'
    },
    {
      question: 'What is a counter variable used for in while loops?',
      options: ['To store the result', 'To track how many times the loop runs', 'To name the loop', 'To pause execution'],
      correctIndex: 1,
      explanation: 'A counter tracks iterations and helps the loop eventually stop'
    },
    {
      question: 'What does x -= 1 do?',
      options: ['Sets x to -1', 'Subtracts 1 from x', 'Checks if x is 1', 'Multiplies x by -1'],
      correctIndex: 1,
      explanation: 'x -= 1 is shorthand for x = x - 1'
    },
    {
      question: 'What prints?\nnum = 1\nwhile num < 5:\n    if num == 3:\n        break\n    print(num)\n    num += 1',
      options: ['1 2 3', '1 2', '1 2 3 4', '3'],
      correctIndex: 1,
      explanation: 'When num reaches 3, break exits the loop before printing'
    },
    {
      question: 'Which of these creates a valid while loop that runs exactly once?',
      options: ['while False:', 'while 0:', 'x = 1\nwhile x > 0:\n    x -= 1', 'while "":'],
      correctIndex: 2,
      explanation: 'x starts at 1 (True), runs once, then x becomes 0 (False)'
    },
    {
      question: 'What is wrong with this code?\nwhile x < 10:\n    print(x)',
      options: ['Missing colon', 'x is never changed so it may loop forever', 'print is wrong', 'Nothing is wrong'],
      correctIndex: 1,
      explanation: 'Without changing x, the condition never becomes False (infinite loop)'
    },
  ],

  'lesson-5-4': [
    {
      question: 'What does a for loop do?',
      options: ['Repeats forever', 'Checks conditions', 'Iterates over a sequence', 'Creates lists'],
      correctIndex: 2,
      explanation: 'for loops go through items in sequence'
    },
    {
      question: 'What does range(5) generate?',
      options: ['1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '0, 1, 2, 3, 4, 5', '1, 2, 3, 4'],
      correctIndex: 1,
      explanation: 'range(5) starts at 0, stops before 5'
    },
    {
      question: 'How do you loop through a list?',
      options: ['for list in item:', 'while item in list:', 'for item in list:', 'loop list:'],
      correctIndex: 2,
      explanation: 'Use "for item in list:" syntax'
    },
    {
      question: 'What does "in" do in a for loop?',
      options: ['Checks membership', 'Creates variable', 'Adds items', 'Specifies what to iterate over'],
      correctIndex: 3,
      explanation: '"in" tells Python what sequence to loop through'
    },
    {
      question: 'Can you loop through a string?',
      options: ['No', 'Only with split()', 'Yes, character by character', 'Only numbers'],
      correctIndex: 2,
      explanation: 'Strings are sequences of characters'
    },
    {
      question: 'What does range(1, 10) give you?',
      options: ['1 through 10', '0 through 9', '1 through 9', '0 through 10'],
      correctIndex: 2,
      explanation: 'range(start, stop) excludes stop value'
    },
    {
      question: 'Can you change the loop variable?',
      options: ['No, it\'s read-only', 'Yes, and it affects loop', 'Yes, but doesn\'t affect loop', 'Causes error'],
      correctIndex: 2,
      explanation: 'Changing it doesn\'t change iteration'
    },
    {
      question: 'What does range(0, 10, 2) do?',
      options: ['0, 2, 4, 6, 8, 10', '2, 4, 6, 8', '0, 1, 2, ..., 10', '0, 2, 4, 6, 8'],
      correctIndex: 3,
      explanation: 'Third argument is step: every 2nd number'
    },
    {
      question: 'Does for loop need a colon?',
      options: ['No', 'Optional', 'Only with range', 'Yes'],
      correctIndex: 3,
      explanation: 'for loops end with colon: for i in range(5):'
    },
    {
      question: 'Which is better for counting: while or for?',
      options: ['while loop', 'Both equal', 'for loop', 'Neither'],
      correctIndex: 2,
      explanation: 'for with range() is cleaner for counting'
    },
    {
      question: 'What does range(2, 8) produce?',
      options: ['2, 3, 4, 5, 6, 7, 8', '2, 3, 4, 5, 6, 7', '3, 4, 5, 6, 7', '2, 4, 6, 8'],
      correctIndex: 1,
      explanation: 'range(2, 8) starts at 2 and stops before 8'
    },
    {
      question: 'What does this print?\nfor letter in "hi":\n    print(letter)',
      options: ['hi', 'h i', 'h\\ni', '"h" then "i" on separate lines'],
      correctIndex: 3,
      explanation: 'The loop iterates character by character, printing each on its own line'
    },
    {
      question: 'What does enumerate() do?',
      options: ['Counts list items', 'Gives index and value together', 'Sorts the list', 'Reverses the list'],
      correctIndex: 1,
      explanation: 'enumerate() returns pairs of (index, value) for each item'
    },
    {
      question: 'What does this print?\nfor i in range(3):\n    for j in range(2):\n        print(i, j)',
      options: ['3 pairs', '5 pairs', '6 pairs', '2 pairs'],
      correctIndex: 2,
      explanation: 'Nested loops: 3 outer iterations x 2 inner iterations = 6 pairs'
    },
    {
      question: 'What does range(5, 0, -1) produce?',
      options: ['5, 4, 3, 2, 1', '5, 4, 3, 2, 1, 0', '0, 1, 2, 3, 4, 5', '4, 3, 2, 1, 0'],
      correctIndex: 0,
      explanation: 'Starts at 5, counts down by 1, stops before 0'
    },
    {
      question: 'How do you iterate over a list with its index?\nfruits = ["a", "b", "c"]',
      options: ['for i in fruits:', 'for i, f in enumerate(fruits):', 'for i in range(fruits):', 'for i, f in fruits:'],
      correctIndex: 1,
      explanation: 'enumerate() provides both the index and the value'
    },
    {
      question: 'What is the loop variable in: for num in [10, 20, 30]:',
      options: ['for', 'in', 'num', 'the list'],
      correctIndex: 2,
      explanation: 'num is the variable that takes each value from the list'
    },
    {
      question: 'How many times does this run?\nfor i in range(0):\n    print(i)',
      options: ['0 times', '1 time', 'Infinite', 'Error'],
      correctIndex: 0,
      explanation: 'range(0) produces an empty sequence, so the loop body never runs'
    },
    {
      question: 'What does this print?\nwords = ["hi", "bye"]\nfor w in words:\n    print(len(w))',
      options: ['hi bye', '2 3', '2 2', '1 2'],
      correctIndex: 1,
      explanation: 'len("hi") is 2 and len("bye") is 3'
    },
    {
      question: 'What does range(1, 10, 3) produce?',
      options: ['1, 3, 6, 9', '1, 4, 7', '1, 4, 7, 10', '3, 6, 9'],
      correctIndex: 1,
      explanation: 'Starts at 1, steps by 3: 1, 4, 7 (10 is excluded)'
    },
  ],

  'lesson-5-5': [
    {
      question: 'What does break do?',
      options: ['Skips current iteration', 'Pauses loop', 'Exits the loop immediately', 'Ends program'],
      correctIndex: 2,
      explanation: 'break stops loop execution entirely'
    },
    {
      question: 'What does continue do?',
      options: ['Exits loop', 'Skips to next iteration', 'Pauses loop', 'Restarts loop'],
      correctIndex: 1,
      explanation: 'continue jumps to next iteration'
    },
    {
      question: 'Can you use break in a for loop?',
      options: ['No', 'Only while loops', 'Yes', 'Causes error'],
      correctIndex: 2,
      explanation: 'break works in both for and while loops'
    },
    {
      question: 'Can you use continue in a while loop?',
      options: ['No', 'Only for loops', 'Causes error', 'Yes'],
      correctIndex: 3,
      explanation: 'continue works in both for and while loops'
    },
    {
      question: 'What happens after break?',
      options: ['Program ends', 'Code after loop runs', 'Loop restarts', 'Error occurs'],
      correctIndex: 1,
      explanation: 'break exits loop, continues after loop'
    },
    {
      question: 'What happens after continue?',
      options: ['Loop exits', 'Code after loop runs', 'Next iteration starts', 'Program pauses'],
      correctIndex: 2,
      explanation: 'continue skips rest of current iteration'
    },
    {
      question: 'Can you break out of nested loops?',
      options: ['All loops', 'Choose which loop', 'Only innermost loop', 'Not allowed'],
      correctIndex: 2,
      explanation: 'break only exits the current loop'
    },
    {
      question: 'When is break useful?',
      options: ['In every loop', 'Never', 'When search finds target', 'Only with while'],
      correctIndex: 2,
      explanation: 'break helps exit early when done'
    },
    {
      question: 'When is continue useful?',
      options: ['Every iteration', 'Skip invalid items', 'Never', 'Only with for'],
      correctIndex: 1,
      explanation: 'continue skips processing certain items'
    },
    {
      question: 'Do you need else with break/continue?',
      options: ['Yes', 'Sometimes', 'No', 'Always'],
      correctIndex: 2,
      explanation: 'break and continue work independently'
    },
    {
      question: 'What does this print?\nfor i in range(5):\n    if i == 2:\n        continue\n    print(i)',
      options: ['0 1 2 3 4', '0 1 3 4', '2', '0 1'],
      correctIndex: 1,
      explanation: 'continue skips the rest of the iteration when i is 2, so 2 is not printed'
    },
    {
      question: 'What does this print?\nfor i in range(5):\n    if i == 3:\n        break\n    print(i)',
      options: ['0 1 2 3', '0 1 2', '3 4', '0 1 2 3 4'],
      correctIndex: 1,
      explanation: 'break exits the loop when i is 3, before printing 3'
    },
    {
      question: 'What does for/else do in Python?',
      options: ['else runs if loop had an error', 'else always runs after the loop', 'else runs only if break was NOT used', 'else runs only if break was used'],
      correctIndex: 2,
      explanation: 'The else block after a for loop runs only if the loop completed without break'
    },
    {
      question: 'What prints?\nfor i in range(3):\n    pass\nelse:\n    print("done")',
      options: ['nothing', 'done', 'error', '0 1 2 done'],
      correctIndex: 1,
      explanation: 'The loop completes without break, so the else block runs'
    },
    {
      question: 'What prints?\nfor i in range(5):\n    if i == 1:\n        break\nelse:\n    print("complete")',
      options: ['complete', 'nothing', '0', '0 complete'],
      correctIndex: 1,
      explanation: 'break was used so the else block does NOT run'
    },
    {
      question: 'Can you use both break and continue in the same loop?',
      options: ['No', 'Only in while loops', 'Only in for loops', 'Yes'],
      correctIndex: 3,
      explanation: 'Both can be used in the same loop for different conditions'
    },
    {
      question: 'What does continue do in a while loop?\nwhile condition:\n    if something:\n        continue\n    other_code()',
      options: ['Exits the loop', 'Jumps back to check the condition', 'Runs other_code()', 'Ends the program'],
      correctIndex: 1,
      explanation: 'continue skips the rest of the body and goes back to the while condition'
    },
    {
      question: 'What prints?\nfor n in [1, 2, 3, 4, 5]:\n    if n % 2 == 0:\n        continue\n    print(n)',
      options: ['1 2 3 4 5', '2 4', '1 3 5', '1 3'],
      correctIndex: 2,
      explanation: 'continue skips even numbers; odd numbers (1, 3, 5) are printed'
    },
    {
      question: 'What happens if break is used outside a loop?',
      options: ['Nothing', 'SyntaxError', 'Program exits', 'It is ignored'],
      correctIndex: 1,
      explanation: 'break can only be used inside a loop; using it outside causes SyntaxError'
    },
    {
      question: 'What does this print?\nfound = False\nfor x in [4, 7, 2, 9]:\n    if x == 7:\n        found = True\n        break\nprint(found)',
      options: ['False', 'True', '7', 'error'],
      correctIndex: 1,
      explanation: 'The loop finds 7, sets found to True, and breaks'
    },
  ],

  // MODULE 3: Collections
  'lesson-6-1': [
    {
      question: 'What is a list in Python?',
      options: ['Single value', 'Type of loop', 'Ordered collection of items', 'Function'],
      correctIndex: 2,
      explanation: 'Lists store multiple values in order'
    },
    {
      question: 'How do you create an empty list?',
      options: ['()', '{}', '[]', 'list()'],
      correctIndex: 2,
      explanation: 'Square brackets [] create a list'
    },
    {
      question: 'Can lists contain different types?',
      options: ['No', 'Only numbers', 'Yes', 'Only strings'],
      correctIndex: 2,
      explanation: 'Lists can mix types: [1, "hi", True]'
    },
    {
      question: 'How do you add an item to a list?',
      options: ['.add(item)', '.append(item)', '.push(item)', '.insert(item)'],
      correctIndex: 1,
      explanation: 'Use .append() to add to end of list'
    },
    {
      question: 'Can you change items in a list?',
      options: ['No, lists are immutable', 'Yes, lists are mutable', 'Only once', 'Only numbers'],
      correctIndex: 1,
      explanation: 'Lists can be modified after creation'
    },
    {
      question: 'What does len(my_list) return?',
      options: ['Last item', 'First item', 'Number of items', 'All items'],
      correctIndex: 2,
      explanation: 'len() returns the count of items'
    },
    {
      question: 'How do you create a list with items?',
      options: ['(1, 2, 3)', '{1, 2, 3}', '[1, 2, 3]', 'list(1, 2, 3)'],
      correctIndex: 2,
      explanation: 'Use brackets with comma-separated values'
    },
    {
      question: 'Can lists contain other lists?',
      options: ['No', 'Only 2 deep', 'Yes', 'Causes error'],
      correctIndex: 2,
      explanation: 'Lists can contain lists (nested lists)'
    },
    {
      question: 'What does .remove(item) do?',
      options: ['Removes all occurrences', 'Removes last item', 'Removes first occurrence', 'Causes error'],
      correctIndex: 2,
      explanation: '.remove() deletes first matching item'
    },
    {
      question: 'Are lists ordered?',
      options: ['No, random order', 'Sometimes', 'Yes, order is preserved', 'Depends on type'],
      correctIndex: 2,
      explanation: 'Lists maintain insertion order'
    },
    {
      question: 'What does .pop() return when called with no arguments?',
      options: ['The first item', 'None', 'The last item', 'The list length'],
      correctIndex: 2,
      explanation: '.pop() removes and returns the last item in the list'
    },
    {
      question: 'What does "in" do with a list?',
      options: ['Adds an item', 'Checks if item exists', 'Removes an item', 'Sorts the list'],
      correctIndex: 1,
      explanation: 'The "in" operator checks membership: 3 in [1, 2, 3] returns True'
    },
    {
      question: 'What is the output of len([10, 20, 30, 40])?',
      options: ['3', '40', '4', '10'],
      correctIndex: 2,
      explanation: 'len() counts the number of items; this list has 4 elements'
    },
    {
      question: 'What does .pop(0) do?',
      options: ['Removes the last item', 'Removes and returns the first item', 'Returns 0', 'Clears the list'],
      correctIndex: 1,
      explanation: '.pop(index) removes and returns the item at that index'
    },
    {
      question: 'What happens when you call .remove() on a value not in the list?',
      options: ['Returns None', 'Does nothing', 'Raises ValueError', 'Removes the last item'],
      correctIndex: 2,
      explanation: '.remove() raises ValueError if the item is not found'
    },
    {
      question: 'Which creates a list from a string "abc"?',
      options: ['list["abc"]', 'list("abc")', '["abc"]', '"abc".list()'],
      correctIndex: 1,
      explanation: 'list("abc") creates ["a", "b", "c"] by iterating the string'
    },
    {
      question: 'What does .append() return?',
      options: ['The new list', 'The appended item', 'None', 'The list length'],
      correctIndex: 2,
      explanation: '.append() modifies the list in place and returns None'
    },
    {
      question: 'How do you check if a list is empty?',
      options: ['if my_list == 0', 'if my_list.empty()', 'if not my_list', 'if my_list is None'],
      correctIndex: 2,
      explanation: 'Empty lists are falsy; "if not my_list" is True when the list is empty'
    },
    {
      question: 'What does .insert(1, "x") do?',
      options: ['Replaces index 1 with "x"', 'Inserts "x" at index 1', 'Adds "x" at end', 'Adds 1 copy of "x"'],
      correctIndex: 1,
      explanation: '.insert(index, item) places the item at the given index, shifting others right'
    },
    {
      question: 'What is the result of [1, 2] + [3, 4]?',
      options: ['[4, 6]', '[[1, 2], [3, 4]]', '[1, 2, 3, 4]', 'Error'],
      correctIndex: 2,
      explanation: 'The + operator concatenates lists into a new combined list'
    },
  ],

  'lesson-6-2': [
    {
      question: 'What index is the first item?',
      options: ['1', '-1', '0', 'first'],
      correctIndex: 2,
      explanation: 'Python uses 0-based indexing'
    },
    {
      question: 'How do you get the last item?',
      options: ['my_list[last]', 'my_list[-1]', 'my_list[end]', 'my_list.last()'],
      correctIndex: 1,
      explanation: 'Negative indices count from end: -1 is last'
    },
    {
      question: 'What is slicing?',
      options: ['Removing items', 'Adding items', 'Getting a portion of list', 'Sorting list'],
      correctIndex: 2,
      explanation: 'Slicing extracts sublists: my_list[1:3]'
    },
    {
      question: 'What does my_list[1:4] return?',
      options: ['Items at index 1, 2, 3, 4', 'Item at index 1', 'Items at index 1, 2, 3', 'Items 1 through 4'],
      correctIndex: 2,
      explanation: 'Slice [start:stop] excludes stop index'
    },
    {
      question: 'What does my_list[:3] mean?',
      options: ['Last 3 items', 'Skip 3 items', 'First 3 items', 'Every 3rd item'],
      correctIndex: 2,
      explanation: 'Omitting start means from beginning'
    },
    {
      question: 'What does my_list[2:] mean?',
      options: ['First 2 items', 'From index 2 to end', 'Last 2 items', 'Skip 2 items'],
      correctIndex: 1,
      explanation: 'Omitting stop means until end'
    },
    {
      question: 'Can you use negative indices in slicing?',
      options: ['No', 'Only for start', 'Yes', 'Only for stop'],
      correctIndex: 2,
      explanation: 'Negative indices work in slices too'
    },
    {
      question: 'What does my_list[::2] do?',
      options: ['First 2 items', 'Last 2 items', 'Every 2nd item', 'Divide by 2'],
      correctIndex: 2,
      explanation: 'Third number is step: [::2] takes every 2nd'
    },
    {
      question: 'What does my_list[::-1] do?',
      options: ['Removes last item', 'Reverses the list', 'Duplicates list', 'Sorts list'],
      correctIndex: 1,
      explanation: 'Step of -1 reverses the list'
    },
    {
      question: 'What happens with invalid index?',
      options: ['Returns None', 'Returns empty list', 'IndexError', 'Wraps around'],
      correctIndex: 2,
      explanation: 'Accessing invalid index raises IndexError'
    },
    {
      question: 'For nums = [10, 20, 30, 40, 50], what is nums[2]?',
      options: ['20', '30', '10', '40'],
      correctIndex: 1,
      explanation: 'Index 2 is the third element (0-based), which is 30'
    },
    {
      question: 'For nums = [10, 20, 30, 40, 50], what is nums[-2]?',
      options: ['20', '50', '40', '30'],
      correctIndex: 2,
      explanation: 'Index -2 is the second-to-last element, which is 40'
    },
    {
      question: 'What does my_list[1:1] return?',
      options: ['The item at index 1', 'An empty list', 'None', 'IndexError'],
      correctIndex: 1,
      explanation: 'When start equals stop, the slice is empty: []'
    },
    {
      question: 'For letters = ["a", "b", "c", "d"], what is letters[0:2]?',
      options: ['["a", "b", "c"]', '["a", "b"]', '["b", "c"]', '["a"]'],
      correctIndex: 1,
      explanation: 'Slice [0:2] includes index 0 and 1 but excludes 2'
    },
    {
      question: 'What does my_list[-3:] return?',
      options: ['First 3 items', 'Last 3 items', 'All except last 3', 'Error'],
      correctIndex: 1,
      explanation: 'Starting at -3 goes from third-to-last to the end'
    },
    {
      question: 'Can you assign a new value to a list index?',
      options: ['No, lists are immutable', 'Yes, e.g. my_list[0] = 99', 'Only the last index', 'Only with .set()'],
      correctIndex: 1,
      explanation: 'Lists are mutable, so you can assign directly by index'
    },
    {
      question: 'What does an out-of-range slice return?',
      options: ['IndexError', 'None', 'An empty list or partial result', 'The whole list'],
      correctIndex: 2,
      explanation: 'Slicing does not raise errors; it returns what is available'
    },
    {
      question: 'For x = [0, 1, 2, 3, 4, 5], what is x[1:5:2]?',
      options: ['[1, 2, 3, 4]', '[1, 3]', '[1, 3, 5]', '[2, 4]'],
      correctIndex: 1,
      explanation: 'Start at 1, stop before 5, step 2 gives indices 1 and 3'
    },
    {
      question: 'What does my_list[:] return?',
      options: ['An empty list', 'The first item', 'A copy of the entire list', 'None'],
      correctIndex: 2,
      explanation: 'Omitting both start and stop creates a shallow copy of the list'
    },
    {
      question: 'For data = [5, 10, 15, 20], what is data[-1:-3:-1]?',
      options: ['[20, 15]', '[15, 10]', '[20, 15, 10]', '[15, 20]'],
      correctIndex: 0,
      explanation: 'Start at -1 (20), step -1, stop before -3 (10), gives [20, 15]'
    },
  ],

  'lesson-6-3': [
    {
      question: 'What is a dictionary?',
      options: ['Ordered list', 'Set of numbers', 'Key-value pairs', 'Type of loop'],
      correctIndex: 2,
      explanation: 'Dictionaries map keys to values'
    },
    {
      question: 'How do you create a dictionary?',
      options: ['[]', '()', '{}', 'dict[]'],
      correctIndex: 2,
      explanation: 'Curly braces {} create dictionaries'
    },
    {
      question: 'How do you access a value?',
      options: ['my_dict[0]', 'my_dict["key"]', 'my_dict.key', 'my_dict(key)'],
      correctIndex: 1,
      explanation: 'Use brackets with key name'
    },
    {
      question: 'Can dictionary keys be numbers?',
      options: ['No', 'Only strings', 'Yes', 'Only integers'],
      correctIndex: 2,
      explanation: 'Keys can be any immutable type'
    },
    {
      question: 'Are dictionaries ordered?',
      options: ['No', 'Sometimes', 'Yes (Python 3.7+)', 'Only if sorted'],
      correctIndex: 2,
      explanation: 'Modern Python preserves insertion order'
    },
    {
      question: 'How do you add a new key-value?',
      options: ['my_dict.add("new", value)', 'my_dict["new"] = value', 'my_dict.push("new")', 'my_dict.insert(value)'],
      correctIndex: 1,
      explanation: 'Assign with bracket notation'
    },
    {
      question: 'What happens if key doesn\'t exist?',
      options: ['Returns None', 'Returns empty string', 'KeyError', 'Creates it'],
      correctIndex: 2,
      explanation: 'Missing key raises KeyError'
    },
    {
      question: 'How do you safely get a value?',
      options: ['["key"]', '.find("key")', '.get("key")', '.has("key")'],
      correctIndex: 2,
      explanation: '.get() returns None instead of error'
    },
    {
      question: 'Can dictionary values be lists?',
      options: ['No', 'Only tuples', 'Yes', 'Only numbers'],
      correctIndex: 2,
      explanation: 'Values can be any type, including lists'
    },
    {
      question: 'How do you get all keys?',
      options: ['.get_keys()', '.all_keys()', '.keys()', '[keys]'],
      correctIndex: 2,
      explanation: '.keys() returns all dictionary keys'
    },
    {
      question: 'What does .values() return?',
      options: ['All keys', 'All key-value pairs', 'All values', 'The dictionary length'],
      correctIndex: 2,
      explanation: '.values() returns a view of all values in the dictionary'
    },
    {
      question: 'What does .items() return?',
      options: ['Just the keys', 'Just the values', 'Key-value pairs as tuples', 'The number of items'],
      correctIndex: 2,
      explanation: '.items() returns pairs like dict_items([("a", 1), ("b", 2)])'
    },
    {
      question: 'How do you delete a key from a dictionary?',
      options: ['del my_dict["key"]', 'my_dict.delete("key")', 'my_dict.remove("key")', 'my_dict -= "key"'],
      correctIndex: 0,
      explanation: 'The del statement removes a key-value pair by key'
    },
    {
      question: 'What does .get("key", 0) return if key is missing?',
      options: ['None', 'KeyError', '0', 'False'],
      correctIndex: 2,
      explanation: '.get() accepts a default value as second argument, returned when key is missing'
    },
    {
      question: 'Can a list be used as a dictionary key?',
      options: ['Yes', 'Only empty lists', 'No, lists are mutable', 'Only with str()'],
      correctIndex: 2,
      explanation: 'Dictionary keys must be immutable; lists are mutable so cannot be keys'
    },
    {
      question: 'What does len() return for {"a": 1, "b": 2, "c": 3}?',
      options: ['6', '3', '2', '9'],
      correctIndex: 1,
      explanation: 'len() counts the number of key-value pairs in the dictionary'
    },
    {
      question: 'How do you update an existing key\'s value?',
      options: ['my_dict.update("key")', 'my_dict["key"] = new_value', 'my_dict.set("key", value)', 'my_dict.replace("key")'],
      correctIndex: 1,
      explanation: 'Assigning to an existing key overwrites the previous value'
    },
    {
      question: 'What does "in" check for with dictionaries?',
      options: ['If a value exists', 'If a key exists', 'Both keys and values', 'The dict length'],
      correctIndex: 1,
      explanation: 'The "in" operator checks for key membership, not values'
    },
    {
      question: 'How do you create an empty dictionary?',
      options: ['dict[]', 'empty()', '{}', '[]'],
      correctIndex: 2,
      explanation: 'Empty curly braces {} create an empty dictionary (not a set)'
    },
    {
      question: 'What does .pop("key") do?',
      options: ['Removes last item', 'Returns and removes value for key', 'Removes all keys', 'Returns True or False'],
      correctIndex: 1,
      explanation: '.pop(key) removes the key and returns its value'
    },
  ],

  'lesson-6-4': [
    {
      question: 'What is a tuple?',
      options: ['Mutable list', 'Immutable ordered sequence', 'Key-value pairs', 'Unordered set'],
      correctIndex: 1,
      explanation: 'Tuples are like lists but can\'t be changed'
    },
    {
      question: 'How do you create a tuple?',
      options: ['[1, 2, 3]', '{1, 2, 3}', '(1, 2, 3)', 'tuple[1, 2, 3]'],
      correctIndex: 2,
      explanation: 'Parentheses () create tuples'
    },
    {
      question: 'Can you change items in a tuple?',
      options: ['Yes', 'Only once', 'No', 'Only numbers'],
      correctIndex: 2,
      explanation: 'Tuples are immutable - can\'t be modified'
    },
    {
      question: 'Can you access tuple items by index?',
      options: ['No', 'Only first item', 'Yes', 'Only last item'],
      correctIndex: 2,
      explanation: 'Use indexing like lists: my_tuple[0]'
    },
    {
      question: 'Why use tuples instead of lists?',
      options: ['More features', 'Easier syntax', 'Safety and performance', 'No difference'],
      correctIndex: 2,
      explanation: 'Immutability prevents accidental changes'
    },
    {
      question: 'Can you slice tuples?',
      options: ['No', 'Only lists', 'Yes', 'Causes error'],
      correctIndex: 2,
      explanation: 'Slicing works same as lists'
    },
    {
      question: 'What is tuple unpacking?',
      options: ['Removing items', 'Assigning tuple items to variables', 'Sorting items', 'Creating tuple'],
      correctIndex: 1,
      explanation: 'x, y = (1, 2) assigns each value'
    },
    {
      question: 'Can tuples contain different types?',
      options: ['No', 'Only numbers', 'Yes', 'Only strings'],
      correctIndex: 2,
      explanation: 'Tuples can mix types like lists'
    },
    {
      question: 'How do you create a single-item tuple?',
      options: ['(item)', '[item]', '(item,)', '{item}'],
      correctIndex: 2,
      explanation: 'Need comma: (5,) otherwise just parentheses'
    },
    {
      question: 'Can tuples be dictionary keys?',
      options: ['No', 'Only lists', 'Yes', 'Only strings'],
      correctIndex: 2,
      explanation: 'Tuples are immutable, so valid as keys'
    },
    {
      question: 'What does (1, 2, 3).count(2) return?',
      options: ['2', '1', '0', 'Error'],
      correctIndex: 1,
      explanation: '.count() returns how many times the value appears; 2 appears once'
    },
    {
      question: 'What does (10, 20, 30).index(20) return?',
      options: ['20', '0', '1', '2'],
      correctIndex: 2,
      explanation: '.index() returns the position of the value; 20 is at index 1'
    },
    {
      question: 'What is the result of (1, 2) + (3, 4)?',
      options: ['(4, 6)', '(1, 2, 3, 4)', '((1, 2), (3, 4))', 'Error'],
      correctIndex: 1,
      explanation: 'The + operator concatenates tuples into a new tuple'
    },
    {
      question: 'What does (5,) * 3 produce?',
      options: ['(15,)', '(5, 5, 5)', '15', 'Error'],
      correctIndex: 1,
      explanation: 'Multiplying a tuple repeats it: (5, 5, 5)'
    },
    {
      question: 'What is tuple packing?',
      options: ['Converting list to tuple', 'Assigning multiple values into a tuple', 'Compressing a tuple', 'Sorting a tuple'],
      correctIndex: 1,
      explanation: 'Packing is when multiple values are assigned as a tuple: t = 1, 2, 3'
    },
    {
      question: 'What happens if you try my_tuple[0] = 99?',
      options: ['It updates the value', 'Returns None', 'TypeError', 'IndexError'],
      correctIndex: 2,
      explanation: 'Tuples are immutable; assignment raises TypeError'
    },
    {
      question: 'How many methods do tuples have?',
      options: ['Many like lists', 'Zero', 'Two: count and index', 'Four'],
      correctIndex: 2,
      explanation: 'Tuples only have .count() and .index() since they are immutable'
    },
    {
      question: 'What does a, *b = (1, 2, 3, 4) assign to b?',
      options: ['2', '(2, 3, 4)', '[2, 3, 4]', 'Error'],
      correctIndex: 2,
      explanation: 'The star operator captures remaining values as a list: [2, 3, 4]'
    },
    {
      question: 'Can tuples be nested inside other tuples?',
      options: ['No', 'Only one level deep', 'Yes', 'Only with lists'],
      correctIndex: 2,
      explanation: 'Tuples can contain other tuples: ((1, 2), (3, 4))'
    },
    {
      question: 'Which is generally faster for iteration?',
      options: ['Lists', 'Tuples', 'Same speed', 'Depends on size'],
      correctIndex: 1,
      explanation: 'Tuples are slightly faster than lists due to immutability optimizations'
    },
  ],

  'lesson-6-5': [
    {
      question: 'What is a set?',
      options: ['Ordered list', 'Key-value pairs', 'Unordered collection of unique items', 'Immutable tuple'],
      correctIndex: 2,
      explanation: 'Sets automatically remove duplicates'
    },
    {
      question: 'How do you create a set?',
      options: ['[1, 2, 3]', '{1, 2, 3}', '(1, 2, 3)', 'set[1, 2, 3]'],
      correctIndex: 1,
      explanation: 'Curly braces {} with items create sets'
    },
    {
      question: 'What happens to duplicates in a set?',
      options: ['Kept all', 'Error occurs', 'Automatically removed', 'First one kept'],
      correctIndex: 2,
      explanation: 'Sets only keep unique values'
    },
    {
      question: 'Are sets ordered?',
      options: ['Yes', 'Sometimes', 'No', 'Only if sorted'],
      correctIndex: 2,
      explanation: 'Sets have no guaranteed order'
    },
    {
      question: 'Can you access items by index?',
      options: ['Yes', 'Only first', 'No', 'Only last'],
      correctIndex: 2,
      explanation: 'No indexing - sets are unordered'
    },
    {
      question: 'How do you add to a set?',
      options: ['.append(item)', '.push(item)', '.add(item)', '.insert(item)'],
      correctIndex: 2,
      explanation: 'Use .add() to add items'
    },
    {
      question: 'How do you remove from a set?',
      options: ['.delete(item)', '.pop(index)', '.remove(item)', '.take(item)'],
      correctIndex: 2,
      explanation: '.remove() deletes specific item'
    },
    {
      question: 'What does set1 | set2 do?',
      options: ['Intersection (common items)', 'Difference', 'Union (all items)', 'Error'],
      correctIndex: 2,
      explanation: '| combines sets (all unique items)'
    },
    {
      question: 'What does set1 & set2 do?',
      options: ['Union (all items)', 'Intersection (common items)', 'Difference', 'Error'],
      correctIndex: 1,
      explanation: '& finds items in both sets'
    },
    {
      question: 'When are sets useful?',
      options: ['Maintaining order', 'Indexing items', 'Removing duplicates', 'Storing pairs'],
      correctIndex: 2,
      explanation: 'Sets excel at uniqueness and membership'
    },
    {
      question: 'What does .discard(item) do if item is not in the set?',
      options: ['Raises KeyError', 'Returns False', 'Does nothing', 'Raises ValueError'],
      correctIndex: 2,
      explanation: '.discard() silently does nothing if the item is missing, unlike .remove()'
    },
    {
      question: 'What happens when you call .remove(item) on a missing item?',
      options: ['Does nothing', 'Returns None', 'Raises KeyError', 'Raises ValueError'],
      correctIndex: 2,
      explanation: '.remove() raises KeyError if the item is not found in the set'
    },
    {
      question: 'What does set1 - set2 compute?',
      options: ['Union', 'Intersection', 'Items in set1 but not set2', 'Items in set2 but not set1'],
      correctIndex: 2,
      explanation: 'The - operator returns the difference: elements in the first set only'
    },
    {
      question: 'How do you create an empty set?',
      options: ['{}', 'set()', '[]', 'empty_set()'],
      correctIndex: 1,
      explanation: 'Use set() for empty sets; {} creates an empty dictionary'
    },
    {
      question: 'What is a frozenset?',
      options: ['A sorted set', 'An immutable set', 'A set of numbers only', 'A set with a maximum size'],
      correctIndex: 1,
      explanation: 'frozenset is an immutable version of set that cannot be modified'
    },
    {
      question: 'What is len({1, 2, 2, 3, 3, 3})?',
      options: ['6', '3', '1', '4'],
      correctIndex: 1,
      explanation: 'Duplicates are removed, leaving {1, 2, 3} with length 3'
    },
    {
      question: 'Can you add a list to a set?',
      options: ['Yes', 'Only empty lists', 'No, lists are unhashable', 'Only with tuple()'],
      correctIndex: 2,
      explanation: 'Set elements must be hashable; lists are mutable and unhashable'
    },
    {
      question: 'What does set1.symmetric_difference(set2) return?',
      options: ['Items in both sets', 'Items in neither set', 'Items in one set but not both', 'An empty set'],
      correctIndex: 2,
      explanation: 'Symmetric difference returns elements that are in either set, but not in their intersection'
    },
    {
      question: 'What does set1.issubset(set2) check?',
      options: ['If sets are equal', 'If set1 contains all of set2', 'If all set1 items are in set2', 'If sets overlap'],
      correctIndex: 2,
      explanation: '.issubset() returns True if every element of set1 is in set2'
    },
    {
      question: 'What is the result of {1, 2, 3}.union({3, 4, 5})?',
      options: ['{3}', '{1, 2, 3, 4, 5}', '{1, 2, 4, 5}', '{1, 2, 3, 3, 4, 5}'],
      correctIndex: 1,
      explanation: 'Union combines all unique elements from both sets'
    },
  ],

  // MODULE 4: Functions
  'lesson-7-1': [
    {
      question: 'What is a function?',
      options: ['Type of variable', 'Loop structure', 'Reusable block of code', 'Conditional statement'],
      correctIndex: 2,
      explanation: 'Functions are named code blocks you can call'
    },
    {
      question: 'How do you define a function?',
      options: ['function name():', 'def name():', 'func name():', 'define name():'],
      correctIndex: 1,
      explanation: 'Use "def" keyword to define functions'
    },
    {
      question: 'Does function definition need a colon?',
      options: ['No', 'Optional', 'Yes', 'Only with parameters'],
      correctIndex: 2,
      explanation: 'Function definitions end with :'
    },
    {
      question: 'How do you call a function?',
      options: ['call name()', 'name', 'name()', 'run name()'],
      correctIndex: 2,
      explanation: 'Use function name with parentheses'
    },
    {
      question: 'What happens when you call a function?',
      options: ['Defines function', 'Executes function code', 'Deletes function', 'Error'],
      correctIndex: 1,
      explanation: 'Calling runs the function\'s code'
    },
    {
      question: 'Can you call a function multiple times?',
      options: ['No', 'Only twice', 'Yes', 'Only in loops'],
      correctIndex: 2,
      explanation: 'Functions can be called as many times as needed'
    },
    {
      question: 'Must function code be indented?',
      options: ['No', 'Optional', 'Yes', 'Only first line'],
      correctIndex: 2,
      explanation: 'Indentation shows what belongs to function'
    },
    {
      question: 'Can functions call other functions?',
      options: ['No', 'Only built-in', 'Yes', 'Only once'],
      correctIndex: 2,
      explanation: 'Functions can call any other function'
    },
    {
      question: 'What\'s a good function name?',
      options: ['Single letter', 'Random word', 'Describes what it does', 'Number'],
      correctIndex: 2,
      explanation: 'Use descriptive names like calculate_total()'
    },
    {
      question: 'Can you define functions inside functions?',
      options: ['No', 'Only 2 deep', 'Yes', 'Causes error'],
      correctIndex: 2,
      explanation: 'Nested functions are allowed in Python'
    },
    {
      question: 'What does the pass statement do in a function body?',
      options: ['Ends the function', 'Skips to next function', 'Acts as a placeholder doing nothing', 'Passes a value to caller'],
      correctIndex: 2,
      explanation: 'pass is a no-op placeholder for empty function bodies'
    },
    {
      question: 'What happens if you try to call a function before defining it?',
      options: ['It works fine', 'NameError occurs', 'Returns None', 'SyntaxError occurs'],
      correctIndex: 1,
      explanation: 'Python must see the def before the function is called'
    },
    {
      question: 'Which is valid Python function syntax?',
      options: ['def 2func():', 'def my_func():', 'def my-func():', 'def my func():'],
      correctIndex: 1,
      explanation: 'Function names follow variable naming rules — letters, digits, underscores, cannot start with digit'
    },
    {
      question: 'What is the output of: def greet(): print("Hi")  followed by greet()?',
      options: ['greet', 'None', 'Hi', 'Error'],
      correctIndex: 2,
      explanation: 'Calling greet() executes print("Hi") which outputs Hi'
    },
    {
      question: 'What is the difference between defining and calling a function?',
      options: ['No difference', 'Defining creates it, calling runs it', 'Calling creates it, defining runs it', 'Both run the code'],
      correctIndex: 1,
      explanation: 'def creates the function; using name() executes it'
    },
    {
      question: 'How many times can you define a function with the same name?',
      options: ['Only once', 'Twice', 'Any number — last definition wins', 'Causes error after first'],
      correctIndex: 2,
      explanation: 'Redefining a function replaces the previous definition'
    },
    {
      question: 'What does def stand for?',
      options: ['default', 'defer', 'define', 'definition'],
      correctIndex: 2,
      explanation: 'def is short for define'
    },
    {
      question: 'Which line is the function body? def say_hello():\\n    print("hello")',
      options: ['def say_hello():', 'print("hello")', 'Both lines', 'Neither line'],
      correctIndex: 1,
      explanation: 'The indented code after the def line is the function body'
    },
    {
      question: 'What happens if the function body is not indented?',
      options: ['It still works', 'IndentationError', 'Function is empty', 'Warning is shown'],
      correctIndex: 1,
      explanation: 'Python requires indentation to mark the function body'
    },
    {
      question: 'Can a function have an empty body without pass?',
      options: ['Yes', 'Only with a comment', 'No, it causes an error', 'Only if it has parameters'],
      correctIndex: 2,
      explanation: 'An empty body causes IndentationError; use pass as a placeholder'
    },
  ],

  'lesson-7-2': [
    {
      question: 'What are parameters?',
      options: ['Outputs from function', 'Inputs to function', 'Local variables', 'Function names'],
      correctIndex: 1,
      explanation: 'Parameters receive values when function is called'
    },
    {
      question: 'How do you add parameters?',
      options: ['def name[param]:', 'def name{param}:', 'def name(param):', 'def name<param>:'],
      correctIndex: 2,
      explanation: 'Put parameters in parentheses'
    },
    {
      question: 'Can you have multiple parameters?',
      options: ['No', 'Maximum 3', 'Yes', 'Only with return'],
      correctIndex: 2,
      explanation: 'Separate multiple parameters with commas'
    },
    {
      question: 'What are arguments?',
      options: ['Same as parameters', 'Function outputs', 'Values passed when calling', 'Return values'],
      correctIndex: 2,
      explanation: 'Arguments are actual values, parameters are names'
    },
    {
      question: 'Must arguments match parameter count?',
      options: ['No', 'Optional', 'Yes (usually)', 'Only sometimes'],
      correctIndex: 2,
      explanation: 'Need same number unless using defaults/*args'
    },
    {
      question: 'What are default parameters?',
      options: ['Required parameters', 'First parameter', 'Parameters with preset values', 'Last parameter'],
      correctIndex: 2,
      explanation: 'Defaults: def greet(name="World"):'
    },
    {
      question: 'Can you skip default parameters?',
      options: ['No', 'Only first', 'Yes', 'Only last'],
      correctIndex: 2,
      explanation: 'Default values used if argument not provided'
    },
    {
      question: 'What are keyword arguments?',
      options: ['Required arguments', 'Default values', 'name=value when calling', 'Return values'],
      correctIndex: 2,
      explanation: 'Call with names: greet(name="Alice")'
    },
    {
      question: 'Do parameter order matter?',
      options: ['No', 'Sometimes', 'Yes, unless using keyword args', 'Only for defaults'],
      correctIndex: 2,
      explanation: 'Positional args must match order'
    },
    {
      question: 'Can parameters have any type?',
      options: ['No', 'Only numbers', 'Yes', 'Only strings'],
      correctIndex: 2,
      explanation: 'Parameters can accept any type'
    },
    {
      question: 'What does *args allow in a function definition?',
      options: ['Exactly one argument', 'No arguments', 'Any number of positional arguments', 'Only keyword arguments'],
      correctIndex: 2,
      explanation: '*args collects extra positional arguments into a tuple'
    },
    {
      question: 'What does **kwargs allow in a function definition?',
      options: ['Multiple return values', 'Any number of keyword arguments', 'Only positional arguments', 'Default values'],
      correctIndex: 1,
      explanation: '**kwargs collects extra keyword arguments into a dictionary'
    },
    {
      question: 'What is the output of: def f(a, b=10): print(a + b) then f(5)?',
      options: ['Error', '5', '15', '10'],
      correctIndex: 2,
      explanation: 'a=5, b uses default 10, so 5+10=15'
    },
    {
      question: 'Can you put a positional parameter after a default parameter?',
      options: ['Yes', 'Only at the end', 'No, it causes SyntaxError', 'Only with *args'],
      correctIndex: 2,
      explanation: 'Non-default parameters cannot follow default parameters'
    },
    {
      question: 'What happens if you call f(1, 2, 3) but f only accepts 2 parameters?',
      options: ['Extra argument ignored', 'TypeError', 'Third stored in list', 'Returns None'],
      correctIndex: 1,
      explanation: 'Too many arguments raises TypeError unless *args is used'
    },
    {
      question: 'In f(x, y), what is f(y=2, x=1) an example of?',
      options: ['Positional arguments', 'Default arguments', 'Keyword arguments', 'Variable arguments'],
      correctIndex: 2,
      explanation: 'Passing arguments by name allows any order'
    },
    {
      question: 'What type does *args collect its values into?',
      options: ['List', 'Dictionary', 'Tuple', 'Set'],
      correctIndex: 2,
      explanation: '*args stores extra positional arguments as a tuple'
    },
    {
      question: 'What type does **kwargs collect its values into?',
      options: ['Tuple', 'List', 'Set', 'Dictionary'],
      correctIndex: 3,
      explanation: '**kwargs stores extra keyword arguments as a dictionary'
    },
    {
      question: 'What is the output of: def f(a, b, c=0): return a + b + c then f(1, 2)?',
      options: ['Error', '3', '0', 'None'],
      correctIndex: 1,
      explanation: 'a=1, b=2, c defaults to 0, so 1+2+0=3'
    },
    {
      question: 'Can you mix positional and keyword arguments in a function call?',
      options: ['No', 'Yes, but positional must come first', 'Yes, in any order', 'Only with defaults'],
      correctIndex: 1,
      explanation: 'Positional arguments must appear before keyword arguments'
    },
  ],

  'lesson-7-3': [
    {
      question: 'What does return do?',
      options: ['Prints value', 'Sends value back to caller', 'Stores value', 'Deletes value'],
      correctIndex: 1,
      explanation: 'return gives result back to caller'
    },
    {
      question: 'What happens after return?',
      options: ['Function continues', 'Function exits', 'Error occurs', 'Loop starts'],
      correctIndex: 1,
      explanation: 'return immediately exits function'
    },
    {
      question: 'Can functions return multiple values?',
      options: ['No', 'Only lists', 'Yes, as tuple', 'Only 2 max'],
      correctIndex: 2,
      explanation: 'return x, y returns tuple'
    },
    {
      question: 'What if function has no return?',
      options: ['Error occurs', 'Returns 0', 'Returns None', 'Returns empty string'],
      correctIndex: 2,
      explanation: 'Functions without return give None'
    },
    {
      question: 'Can you use multiple returns?',
      options: ['No', 'Only 2', 'Yes, in different paths', 'Causes error'],
      correctIndex: 2,
      explanation: 'Different branches can have different returns'
    },
    {
      question: 'Is return the same as print?',
      options: ['Yes', 'Sometimes', 'No', 'Similar'],
      correctIndex: 2,
      explanation: 'return sends value back, print displays it'
    },
    {
      question: 'Can you return without a value?',
      options: ['No', 'Only with None', 'Yes', 'Causes error'],
      correctIndex: 2,
      explanation: 'Bare "return" exits and returns None'
    },
    {
      question: 'How do you use returned value?',
      options: ['get function()', 'function().result', 'result = function()', 'return function()'],
      correctIndex: 2,
      explanation: 'Assign to variable or use directly'
    },
    {
      question: 'Can you return different types?',
      options: ['No', 'Only same type', 'Yes', 'Causes error'],
      correctIndex: 2,
      explanation: 'Different paths can return different types'
    },
    {
      question: 'What\'s a return type?',
      options: ['Type of parameter', 'Function category', 'Type of value returned', 'Error type'],
      correctIndex: 2,
      explanation: 'What type the function gives back'
    },
    {
      question: 'What does this return? def f(): return 1, 2, 3',
      options: ['A list [1, 2, 3]', 'Only 1', 'A tuple (1, 2, 3)', 'Error'],
      correctIndex: 2,
      explanation: 'Comma-separated return values are packed into a tuple'
    },
    {
      question: 'What is the value of x? def f(): print("hi")  then x = f()',
      options: ['\"hi\"', '0', 'None', 'Error'],
      correctIndex: 2,
      explanation: 'f() has no return statement so it returns None'
    },
    {
      question: 'Can you use a returned value directly in an expression like f() + 5?',
      options: ['No, must store first', 'Yes, if it returns a number', 'Only with print', 'Only with strings'],
      correctIndex: 1,
      explanation: 'Return values can be used directly in expressions'
    },
    {
      question: 'What happens to code after a return statement inside a function?',
      options: ['It runs normally', 'It is skipped/never executes', 'It runs on next call', 'It causes an error'],
      correctIndex: 1,
      explanation: 'return exits the function immediately; code after it is unreachable'
    },
    {
      question: 'How do you unpack multiple return values? def f(): return 1, 2',
      options: ['x = f()', '[x, y] = f()', 'x, y = f()', 'Both B and C work'],
      correctIndex: 3,
      explanation: 'Both list unpacking and tuple unpacking work for multiple return values'
    },
    {
      question: 'What does this print? def f(x): if x > 0: return "pos"  then print(f(-1))',
      options: ['\"pos\"', '\"neg\"', 'None', 'Error'],
      correctIndex: 2,
      explanation: 'When x <= 0 no return is hit, so the function returns None'
    },
    {
      question: 'What is the difference between return and print inside a function?',
      options: ['No difference', 'return displays, print sends back', 'return sends value to caller, print displays to screen', 'print is faster'],
      correctIndex: 2,
      explanation: 'return passes a value back; print outputs text to the console'
    },
    {
      question: 'Can a function return a list?',
      options: ['No', 'Only tuples', 'Yes', 'Only with *args'],
      correctIndex: 2,
      explanation: 'Functions can return any data type including lists'
    },
    {
      question: 'What does return False do in a function?',
      options: ['Ends the program', 'Raises an error', 'Exits function and sends False to caller', 'Prints False'],
      correctIndex: 2,
      explanation: 'return False exits the function and the caller receives the boolean False'
    },
    {
      question: 'What value does bool(f()) give if def f(): return 0?',
      options: ['True', 'False', 'None', 'Error'],
      correctIndex: 1,
      explanation: 'f() returns 0 which is falsy, so bool(0) is False'
    },
  ],

  'lesson-7-4': [
    {
      question: 'What is scope?',
      options: ['Variable type', 'Where variables are accessible', 'Function name', 'Parameter count'],
      correctIndex: 1,
      explanation: 'Scope determines variable visibility'
    },
    {
      question: 'What is a local variable?',
      options: ['Variable outside function', 'Global variable', 'Variable inside function', 'Parameter'],
      correctIndex: 2,
      explanation: 'Local variables exist only in function'
    },
    {
      question: 'What is a global variable?',
      options: ['Variable inside function', 'Variable outside functions', 'Parameter', 'Return value'],
      correctIndex: 1,
      explanation: 'Global variables accessible everywhere'
    },
    {
      question: 'Can functions access global variables?',
      options: ['No', 'Only with global keyword', 'Yes, read them', 'Only parameters'],
      correctIndex: 2,
      explanation: 'Functions can read global variables'
    },
    {
      question: 'Can functions modify global variables?',
      options: ['Yes, always', 'No, never', 'Need "global" keyword', 'Only numbers'],
      correctIndex: 2,
      explanation: 'Use global x to modify global variable'
    },
    {
      question: 'What happens to local variables after function?',
      options: ['They persist', 'They\'re deleted', 'They become global', 'Error occurs'],
      correctIndex: 1,
      explanation: 'Local variables die when function ends'
    },
    {
      question: 'Are parameters local or global?',
      options: ['Global', 'Local', 'Both', 'Neither'],
      correctIndex: 1,
      explanation: 'Parameters are local to function'
    },
    {
      question: 'Can different functions have same variable name?',
      options: ['No', 'Only if different types', 'Yes, they\'re separate', 'Causes conflict'],
      correctIndex: 2,
      explanation: 'Each function has its own scope'
    },
    {
      question: 'What if local and global have same name?',
      options: ['Global takes priority', 'Error occurs', 'Local takes priority', 'Both used'],
      correctIndex: 2,
      explanation: 'Local variable shadows global'
    },
    {
      question: 'Is using global variables recommended?',
      options: ['Yes, always use', 'Doesn\'t matter', 'No, avoid when possible', 'Only for constants'],
      correctIndex: 2,
      explanation: 'Prefer parameters and returns'
    },
    {
      question: 'What does LEGB stand for in Python scope resolution?',
      options: ['Local, Enclosed, Global, Built-in', 'Local, External, Global, Base', 'Loop, Enclosed, Global, Built-in', 'Local, Enclosed, General, Built-in'],
      correctIndex: 0,
      explanation: 'Python searches Local, Enclosing, Global, then Built-in scopes in order'
    },
    {
      question: 'What does the nonlocal keyword do?',
      options: ['Creates a global variable', 'Deletes a variable', 'Modifies a variable in an enclosing function scope', 'Makes variable read-only'],
      correctIndex: 2,
      explanation: 'nonlocal lets an inner function modify a variable from its enclosing function'
    },
    {
      question: 'What is variable shadowing?',
      options: ['Deleting a variable', 'A local variable hiding a global with the same name', 'Copying a variable', 'Renaming a variable'],
      correctIndex: 1,
      explanation: 'A local variable with the same name as a global hides (shadows) the global'
    },
    {
      question: 'What does this print? x = 5\\ndef f(): x = 10; print(x)\\nf()\\nprint(x)',
      options: ['10 then 10', '5 then 5', '10 then 5', 'Error'],
      correctIndex: 2,
      explanation: 'Inside f, x is local (10). Outside, x is still global (5)'
    },
    {
      question: 'When is the global keyword needed inside a function?',
      options: ['To read a global variable', 'To create a local variable', 'To assign to a global variable', 'To delete a variable'],
      correctIndex: 2,
      explanation: 'global is needed only when you want to reassign a global variable inside a function'
    },
    {
      question: 'What scope does a variable defined in a for loop belong to?',
      options: ['Loop scope only', 'The enclosing function or global scope', 'Block scope', 'Temporary scope'],
      correctIndex: 1,
      explanation: 'Python has no block scope; loop variables belong to the enclosing scope'
    },
    {
      question: 'Can a nested function read variables from its enclosing function?',
      options: ['No', 'Only with global keyword', 'Yes', 'Only parameters'],
      correctIndex: 2,
      explanation: 'Inner functions can read enclosing (nonlocal) variables through the LEGB rule'
    },
    {
      question: 'What error occurs if you read a variable before assigning it locally in the same function?',
      options: ['NameError', 'UnboundLocalError', 'TypeError', 'SyntaxError'],
      correctIndex: 1,
      explanation: 'If a function assigns to a name, Python treats it as local for the whole function, causing UnboundLocalError if read before assignment'
    },
    {
      question: 'Which built-in names can be accidentally shadowed?',
      options: ['None of them', 'Only print', 'Any built-in like list, str, len', 'Only keywords'],
      correctIndex: 2,
      explanation: 'Assigning to names like list or len shadows the built-in, which is a common mistake'
    },
    {
      question: 'What is the enclosing scope in LEGB?',
      options: ['The module-level scope', 'The scope of an outer function containing a nested function', 'The built-in scope', 'The class scope'],
      correctIndex: 1,
      explanation: 'Enclosing scope refers to the local scope of any enclosing (outer) function'
    },
  ],

  'lesson-7-5': [
    {
      question: 'Which is a built-in function?',
      options: ['length()', 'size()', 'len()', 'count()'],
      correctIndex: 2,
      explanation: 'len() is built into Python'
    },
    {
      question: 'What does type() do?',
      options: ['Converts type', 'Checks if valid', 'Returns data type', 'Creates type'],
      correctIndex: 2,
      explanation: 'type(x) tells you what type x is'
    },
    {
      question: 'What does int() do?',
      options: ['Checks if integer', 'Converts to integer', 'Creates variable', 'Rounds number'],
      correctIndex: 1,
      explanation: 'int("5") converts string to integer'
    },
    {
      question: 'What does str() do?',
      options: ['Checks if string', 'Creates string', 'Converts to string', 'Splits string'],
      correctIndex: 2,
      explanation: 'str(5) converts number to string'
    },
    {
      question: 'What does max() do?',
      options: ['Returns smallest value', 'Returns average', 'Returns largest value', 'Returns sum'],
      correctIndex: 2,
      explanation: 'max(1, 5, 3) returns 5'
    },
    {
      question: 'What does min() do?',
      options: ['Returns largest value', 'Returns smallest value', 'Returns average', 'Returns sum'],
      correctIndex: 1,
      explanation: 'min(1, 5, 3) returns 1'
    },
    {
      question: 'What does sum() do?',
      options: ['Returns largest', 'Adds numbers in sequence', 'Returns smallest', 'Returns average'],
      correctIndex: 1,
      explanation: 'sum([1, 2, 3]) returns 6'
    },
    {
      question: 'What does round() do?',
      options: ['Rounds up', 'Rounds to nearest integer', 'Rounds down', 'Removes decimals'],
      correctIndex: 1,
      explanation: 'round(3.7) returns 4'
    },
    {
      question: 'What does abs() do?',
      options: ['Returns rounded value', 'Returns absolute value', 'Returns negative', 'Returns positive'],
      correctIndex: 1,
      explanation: 'abs(-5) returns 5'
    },
    {
      question: 'What does sorted() do?',
      options: ['Sorts in place', 'Reverses list', 'Returns sorted list', 'Removes duplicates'],
      correctIndex: 2,
      explanation: 'sorted([3, 1, 2]) returns [1, 2, 3]'
    },
    {
      question: 'What does enumerate() return?',
      options: ['Only values', 'Only indices', 'Pairs of (index, value)', 'A count of items'],
      correctIndex: 2,
      explanation: 'enumerate(["a","b"]) yields (0,"a"), (1,"b")'
    },
    {
      question: 'What does zip() do?',
      options: ['Compresses a file', 'Combines iterables element-wise into tuples', 'Sorts two lists', 'Merges dictionaries'],
      correctIndex: 1,
      explanation: 'zip([1,2], ["a","b"]) yields (1,"a"), (2,"b")'
    },
    {
      question: 'What does isinstance(5, int) return?',
      options: ['5', '"int"', 'True', 'False'],
      correctIndex: 2,
      explanation: 'isinstance checks if an object is of a given type; 5 is an int'
    },
    {
      question: 'What does range(3) produce?',
      options: ['[1, 2, 3]', '[0, 1, 2]', '[0, 1, 2, 3]', '[3]'],
      correctIndex: 1,
      explanation: 'range(3) generates 0, 1, 2 — it starts at 0 and stops before 3'
    },
    {
      question: 'What does len("hello") return?',
      options: ['4', '5', '6', 'Error'],
      correctIndex: 1,
      explanation: '"hello" has 5 characters so len returns 5'
    },
    {
      question: 'What does sum([1, 2, 3], 10) return?',
      options: ['6', '10', '16', 'Error'],
      correctIndex: 2,
      explanation: 'sum adds the iterable elements (6) to the start value (10), giving 16'
    },
    {
      question: 'What does abs(-3.7) return?',
      options: ['-3.7', '3', '3.7', '4'],
      correctIndex: 2,
      explanation: 'abs returns the absolute value, removing the negative sign'
    },
    {
      question: 'What does sorted("cab") return?',
      options: ['"abc"', "['a', 'b', 'c']", "['c', 'a', 'b']", 'Error'],
      correctIndex: 1,
      explanation: 'sorted on a string returns a sorted list of characters'
    },
    {
      question: 'What does type([]) return?',
      options: ["<class 'tuple'>", "<class 'dict'>", "<class 'list'>", "<class 'set'>"],
      correctIndex: 2,
      explanation: '[] is an empty list, so type returns list'
    },
    {
      question: 'What does range(2, 8, 2) produce?',
      options: ['[2, 4, 6, 8]', '[2, 4, 6]', '[2, 3, 4, 5, 6, 7]', '[8, 6, 4, 2]'],
      correctIndex: 1,
      explanation: 'range(2, 8, 2) starts at 2, stops before 8, stepping by 2: 2, 4, 6'
    },
  ],

  // MODULE 5: String Manipulation
  'lesson-3-1': [
    {
      question: 'What does .upper() do?',
      options: ['Converts to lowercase', 'Converts to uppercase', 'Capitalizes first letter', 'Removes spaces'],
      correctIndex: 1,
      explanation: '"hello".upper() returns "HELLO"'
    },
    {
      question: 'What does .lower() do?',
      options: ['Converts to uppercase', 'Capitalizes first letter', 'Converts to lowercase', 'Removes spaces'],
      correctIndex: 2,
      explanation: '"HELLO".lower() returns "hello"'
    },
    {
      question: 'Do string methods change the original?',
      options: ['Yes, modify in place', 'No, return new string', 'Sometimes', 'Depends on method'],
      correctIndex: 1,
      explanation: 'Strings are immutable - methods return new strings'
    },
    {
      question: 'What does .strip() do?',
      options: ['Removes all spaces', 'Converts to lowercase', 'Removes whitespace from ends', 'Removes letters'],
      correctIndex: 2,
      explanation: '"  hi  ".strip() returns "hi"'
    },
    {
      question: 'What does .replace(old, new) do?',
      options: ['Replaces first occurrence', 'Removes old text', 'Replaces all occurrences', 'Error'],
      correctIndex: 2,
      explanation: '"hi hi".replace("hi", "bye") = "bye bye"'
    },
    {
      question: 'What does .capitalize() do?',
      options: ['All uppercase', 'First letter uppercase, rest lower', 'Each word capitalized', 'All lowercase'],
      correctIndex: 1,
      explanation: '"hello WORLD".capitalize() = "Hello world"'
    },
    {
      question: 'What does .title() do?',
      options: ['Capitalizes first letter', 'All uppercase', 'Capitalizes each word', 'All lowercase'],
      correctIndex: 2,
      explanation: '"hello world".title() = "Hello World"'
    },
    {
      question: 'Are strings immutable?',
      options: ['No', 'Sometimes', 'Yes', 'Depends on type'],
      correctIndex: 2,
      explanation: 'Strings cannot be changed after creation'
    },
    {
      question: 'Can you chain string methods?',
      options: ['No', 'Only 2', 'Yes', 'Causes error'],
      correctIndex: 2,
      explanation: 'text.strip().upper() works fine'
    },
    {
      question: 'What does "hello".startswith("h") return?',
      options: ['False', 'Error', 'True', '1'],
      correctIndex: 2,
      explanation: '.startswith() checks beginning of string'
    },
    {
      question: 'What does "hello world".find("world") return?',
      options: ['True', '6', '5', '-1'],
      correctIndex: 1,
      explanation: '.find() returns the index where the substring starts; "world" starts at index 6'
    },
    {
      question: 'What does "banana".count("a") return?',
      options: ['1', '2', '3', '0'],
      correctIndex: 2,
      explanation: '"banana" contains the letter "a" three times'
    },
    {
      question: 'What does "  hello  ".lstrip() return?',
      options: ['"hello"', '"hello  "', '"  hello"', '"hello  "'],
      correctIndex: 1,
      explanation: '.lstrip() only removes whitespace from the left side'
    },
    {
      question: 'What does "hello".endswith("xyz") return?',
      options: ['True', '-1', 'Error', 'False'],
      correctIndex: 3,
      explanation: '"hello" does not end with "xyz", so .endswith() returns False'
    },
    {
      question: 'What does "hello".replace("l", "r") return?',
      options: ['"herlo"', '"herro"', '"hello"', 'Error'],
      correctIndex: 1,
      explanation: '.replace() replaces ALL occurrences by default, so both "l"s become "r"s'
    },
    {
      question: 'What does "HELLO".swapcase() return?',
      options: ['"hello"', '"HELLO"', '"Hello"', 'Error'],
      correctIndex: 0,
      explanation: '.swapcase() converts uppercase to lowercase and vice versa'
    },
    {
      question: 'What does "cat".find("dog") return?',
      options: ['0', 'False', 'None', '-1'],
      correctIndex: 3,
      explanation: '.find() returns -1 when the substring is not found'
    },
    {
      question: 'What does "hello world".replace("world", "python") return?',
      options: ['"hello python"', '"hello world"', 'Error', '"python python"'],
      correctIndex: 0,
      explanation: '.replace() substitutes "world" with "python"'
    },
    {
      question: 'What does "Python".startswith("py") return?',
      options: ['True', 'False', 'Error', '"Py"'],
      correctIndex: 1,
      explanation: '.startswith() is case-sensitive; "Python" starts with "Py", not "py"'
    },
    {
      question: 'What does "  hi  ".rstrip() return?',
      options: ['"hi"', '"hi  "', '"  hi"', '" hi "'],
      correctIndex: 2,
      explanation: '.rstrip() only removes whitespace from the right side'
    },
  ],

  'lesson-3-2': [
    {
      question: 'How do you concatenate strings?',
      options: ['Use *', 'Use &', 'Use +', 'Use concat()'],
      correctIndex: 2,
      explanation: '"Hi" + " there" = "Hi there"'
    },
    {
      question: 'What does "ha" * 3 do?',
      options: ['Multiplies by 3', 'Repeats string 3 times', 'Error', 'Returns length'],
      correctIndex: 1,
      explanation: '"ha" * 3 = "hahaha"'
    },
    {
      question: 'What does .join() do?',
      options: ['Splits string', 'Joins list items into string', 'Concatenates two strings', 'Removes spaces'],
      correctIndex: 1,
      explanation: '" ".join(["hi", "bye"]) = "hi bye"'
    },
    {
      question: 'What does .split() do?',
      options: ['Joins list', 'Removes spaces', 'Splits string into list', 'Concatenates'],
      correctIndex: 2,
      explanation: '"a b c".split() = ["a", "b", "c"]'
    },
    {
      question: 'What separator does .split() use by default?',
      options: ['Comma', 'Period', 'Whitespace', 'None'],
      correctIndex: 2,
      explanation: 'Splits on spaces/tabs/newlines'
    },
    {
      question: 'Can you use += with strings?',
      options: ['No', 'Only numbers', 'Yes', 'Causes error'],
      correctIndex: 2,
      explanation: 's += "more" appends to string'
    },
    {
      question: 'What does ",".join(["a", "b"]) return?',
      options: ['["a", "b"]', '"a b"', '"a,b"', 'Error'],
      correctIndex: 2,
      explanation: 'Joins with comma separator'
    },
    {
      question: 'Can you split on custom delimiter?',
      options: ['No', 'Only comma', 'Yes', 'Only space'],
      correctIndex: 2,
      explanation: '"a,b".split(",") splits on comma'
    },
    {
      question: 'What type does .split() return?',
      options: ['string', 'list', 'tuple', 'set'],
      correctIndex: 1,
      explanation: 'Always returns a list of strings'
    },
    {
      question: 'Is + or .join() better for many strings?',
      options: ['+ is faster', 'Same speed', '.join() is faster', 'Depends'],
      correctIndex: 2,
      explanation: '.join() more efficient for multiple strings'
    },
    {
      question: 'What does "abc" + "def" return?',
      options: ['"abc def"', '"abcdef"', 'Error', '"abc+def"'],
      correctIndex: 1,
      explanation: 'The + operator joins strings directly with no space between them'
    },
    {
      question: 'What does "-".join(["a", "b", "c"]) return?',
      options: ['"abc"', '"a-b-c"', '["-a", "-b", "-c"]', 'Error'],
      correctIndex: 1,
      explanation: '.join() inserts the separator string between each list item'
    },
    {
      question: 'What does "hello world".split("o") return?',
      options: ['["hell", " w", "rld"]', '["hello", "world"]', '["hell", "world"]', 'Error'],
      correctIndex: 0,
      explanation: 'Splitting on "o" breaks the string at every "o" character'
    },
    {
      question: 'What happens when you do "hi" * 0?',
      options: ['Error', '"hi"', '""', 'None'],
      correctIndex: 2,
      explanation: 'Multiplying a string by 0 produces an empty string'
    },
    {
      question: 'What does "".join(["h", "e", "l", "l", "o"]) return?',
      options: ['["h", "e", "l", "l", "o"]', '"h e l l o"', '"hello"', 'Error'],
      correctIndex: 2,
      explanation: 'Using an empty string as separator joins characters with nothing between them'
    },
    {
      question: 'What does "a,b,c".split(",") return?',
      options: ['"a b c"', '["a", "b", "c"]', '("a", "b", "c")', '["a,", "b,", "c"]'],
      correctIndex: 1,
      explanation: 'Splitting on "," breaks the string at each comma into a list'
    },
    {
      question: 'Can you concatenate a string and an integer with +?',
      options: ['Yes', 'Only in Python 2', 'No, causes TypeError', 'It converts automatically'],
      correctIndex: 2,
      explanation: 'You must convert the integer to a string first using str()'
    },
    {
      question: 'What does "one two three".split(maxsplit=1) return?',
      options: ['["one", "two", "three"]', '["one", "two three"]', '["one two", "three"]', 'Error'],
      correctIndex: 1,
      explanation: 'maxsplit=1 splits only at the first whitespace, leaving the rest intact'
    },
    {
      question: 'What does " ".join([]) return?',
      options: ['Error', 'None', '" "', '""'],
      correctIndex: 3,
      explanation: 'Joining an empty list returns an empty string regardless of separator'
    },
    {
      question: 'What is the result of "Go" + "!" * 3?',
      options: ['"Go!Go!Go!"', '"Go!!!"', '"GoGoGo!"', 'Error'],
      correctIndex: 1,
      explanation: '* has higher precedence than +, so "!" * 3 = "!!!", then "Go" + "!!!" = "Go!!!"'
    },
  ],

  'lesson-3-3': [
    {
      question: 'How do you create an f-string?',
      options: ['"text {var}"', 's"text {var}"', 'f"text {var}"', 'format("text {var}")'],
      correctIndex: 2,
      explanation: 'Put f before opening quote'
    },
    {
      question: 'What goes inside {} in f-strings?',
      options: ['Only variables', 'Only strings', 'Variables or expressions', 'Nothing'],
      correctIndex: 2,
      explanation: 'Can use variables, math, function calls, etc.'
    },
    {
      question: 'Can you do math in f-strings?',
      options: ['No', 'Only addition', 'Yes', 'Only variables'],
      correctIndex: 2,
      explanation: 'f"{2 + 2}" evaluates to "4"'
    },
    {
      question: 'Can you call functions in f-strings?',
      options: ['No', 'Only built-in', 'Yes', 'Causes error'],
      correctIndex: 2,
      explanation: 'f"{name.upper()}" works fine'
    },
    {
      question: 'Are f-strings better than + concatenation?',
      options: ['No, same thing', 'Depends', 'Yes, more readable', 'No, slower'],
      correctIndex: 2,
      explanation: 'F-strings are cleaner and more powerful'
    },
    {
      question: 'Can f-strings span multiple lines?',
      options: ['No', 'Only with \\n', 'Yes', 'Causes error'],
      correctIndex: 2,
      explanation: 'Use triple quotes for multiline f-strings'
    },
    {
      question: 'What\'s the output of f"{5*2}"?',
      options: ['"5*2"', '"{5*2}"', '"10"', 'Error'],
      correctIndex: 2,
      explanation: 'F-strings evaluate expressions'
    },
    {
      question: 'Can you format numbers in f-strings?',
      options: ['No', 'Only integers', 'Yes', 'Only floats'],
      correctIndex: 2,
      explanation: 'f"{price:.2f}" formats decimals'
    },
    {
      question: 'Are f-strings available in all Python versions?',
      options: ['Yes, all versions', 'Only Python 2', 'No, Python 3.6+', 'Only Python 4'],
      correctIndex: 2,
      explanation: 'F-strings added in Python 3.6'
    },
    {
      question: 'Can you nest {} in f-strings?',
      options: ['No', 'Causes error', 'Yes, for formatting', 'Only once'],
      correctIndex: 2,
      explanation: 'Can nest for advanced formatting'
    },
    {
      question: 'If name = "Alice", what does f"Hi {name}!" produce?',
      options: ['"Hi name!"', '"Hi {Alice}!"', '"Hi Alice!"', 'Error'],
      correctIndex: 2,
      explanation: 'The variable inside {} is replaced with its value'
    },
    {
      question: 'What does f"{len(\'hello\')}" return?',
      options: ['"len(hello)"', '"5"', 'Error', '"hello"'],
      correctIndex: 1,
      explanation: 'Function calls inside {} are evaluated; len("hello") is 5'
    },
    {
      question: 'How do you include a literal curly brace in an f-string?',
      options: ['Use \\{', 'Use {{', 'Use {{}', 'Not possible'],
      correctIndex: 1,
      explanation: 'Double the braces: f"{{" produces a literal "{"'
    },
    {
      question: 'If x = 3 and y = 4, what does f"{x + y}" return?',
      options: ['"x + y"', '"34"', '"7"', 'Error'],
      correctIndex: 2,
      explanation: 'Arithmetic expressions inside {} are evaluated'
    },
    {
      question: 'What does f"{"hello".upper()}" return?',
      options: ['"hello"', '"HELLO"', 'Error', '"{hello.upper()}"'],
      correctIndex: 1,
      explanation: 'Method calls on strings work inside f-string expressions'
    },
    {
      question: 'What prefix creates an f-string?',
      options: ['s', 'str', 'f', 'fmt'],
      correctIndex: 2,
      explanation: 'The letter f before the opening quote creates an f-string'
    },
    {
      question: 'If items = ["a", "b"], what does f"{items[0]}" return?',
      options: ['"items[0]"', '"a"', 'Error', '"["a"]"'],
      correctIndex: 1,
      explanation: 'You can use indexing expressions inside f-string braces'
    },
    {
      question: 'Can you use conditional expressions in f-strings?',
      options: ['No', 'Only if/else', 'Yes, ternary expressions', 'Causes error'],
      correctIndex: 2,
      explanation: 'f"{"even" if x % 2 == 0 else "odd"}" works'
    },
    {
      question: 'What does f"{3.14159:.2f}" produce?',
      options: ['"3.14159"', '"3.14"', '"3.15"', '"3.1"'],
      correctIndex: 1,
      explanation: ':.2f formats the float to 2 decimal places, rounding as needed'
    },
    {
      question: 'If d = {"key": "val"}, what does f"{d[\'key\']}" return?',
      options: ['Error', '"d[key]"', '"val"', '"key"'],
      correctIndex: 2,
      explanation: 'Dictionary access works inside f-string expressions'
    },
  ],

  'lesson-3-4': [
    {
      question: 'What does f"{x:>10}" do?',
      options: ['Left-align in 10 spaces', 'Right-align in 10 spaces', 'Multiply by 10', 'Error'],
      correctIndex: 1,
      explanation: '> means right-align in specified width'
    },
    {
      question: 'What does f"{x:<10}" do?',
      options: ['Right-align in 10 spaces', 'Divide by 10', 'Left-align in 10 spaces', 'Error'],
      correctIndex: 2,
      explanation: '< means left-align in specified width'
    },
    {
      question: 'What does f"{x:^10}" do?',
      options: ['Left-align', 'Right-align', 'Center in 10 spaces', 'Error'],
      correctIndex: 2,
      explanation: '^ means center in specified width'
    },
    {
      question: 'What does f"{price:.2f}" do?',
      options: ['2 total digits', '2 zeros', '2 decimal places', 'Divide by 2'],
      correctIndex: 2,
      explanation: '.2f formats float with 2 decimals'
    },
    {
      question: 'What does f"{num:,}" do?',
      options: ['Divides by 1000', 'Rounds number', 'Adds thousands separator', 'Error'],
      correctIndex: 2,
      explanation: 'Adds commas: 1000 → 1,000'
    },
    {
      question: 'What does f"{x:.1%}" do?',
      options: ['Divides by 100', 'Formats as percentage', 'Multiplies by 100', 'Error'],
      correctIndex: 1,
      explanation: '0.5 becomes "50.0%"'
    },
    {
      question: 'What does f"{num:03}" do?',
      options: ['Divides by 3', 'Multiplies by 3', 'Pads with zeros to width 3', 'Error'],
      correctIndex: 2,
      explanation: '7 becomes "007"'
    },
    {
      question: 'What does f"{num:b}" do?',
      options: ['Formats as bold', 'Formats as bytes', 'Formats as binary', 'Error'],
      correctIndex: 2,
      explanation: '255 becomes "11111111"'
    },
    {
      question: 'What does f"{num:x}" do?',
      options: ['Multiplies', 'Formats as hexadecimal', 'Formats as string', 'Error'],
      correctIndex: 1,
      explanation: '255 becomes "ff"'
    },
    {
      question: 'Can you combine format options?',
      options: ['No', 'Only 2', 'Yes', 'Causes error'],
      correctIndex: 2,
      explanation: 'f"{price:>10,.2f}" combines alignment and decimals'
    },
    {
      question: 'What does f"{num:d}" do?',
      options: ['Formats as decimal integer', 'Formats as double', 'Deletes the number', 'Formats as date'],
      correctIndex: 0,
      explanation: ':d formats a number as a base-10 integer'
    },
    {
      question: 'What does f"{num:o}" do?',
      options: ['Formats as octal', 'Formats as ordinal', 'Rounds to zero', 'Error'],
      correctIndex: 0,
      explanation: ':o converts an integer to its octal (base-8) representation'
    },
    {
      question: 'What is the output of f"{0.85:.0%}"?',
      options: ['"85"', '"85%"', '"0.85%"', '"85.0%"'],
      correctIndex: 1,
      explanation: ':.0% multiplies by 100 and shows 0 decimal places with a % sign'
    },
    {
      question: 'What does f"{num:+d}" do?',
      options: ['Adds 1 to num', 'Shows sign for both positive and negative', 'Only shows minus sign', 'Error'],
      correctIndex: 1,
      explanation: 'The + sign specifier forces display of the sign for both positive and negative numbers'
    },
    {
      question: 'What does f"{5:0>4}" produce?',
      options: ['"0005"', '"5000"', '"0050"', 'Error'],
      correctIndex: 0,
      explanation: '0 is the fill character, > is right-align, 4 is the width, so 5 is right-aligned and padded with zeros'
    },
    {
      question: 'What is the output of f"{42:08b}"?',
      options: ['"00101010"', '"42"', '"00042"', '"101010"'],
      correctIndex: 0,
      explanation: ':08b formats 42 as binary padded with zeros to 8 characters wide'
    },
    {
      question: 'What does f"{text:*^20}" do?',
      options: ['Multiplies text by 20', 'Centers text in 20 chars padded with *', 'Repeats * 20 times', 'Error'],
      correctIndex: 1,
      explanation: '* is the fill character, ^ centers the text, and 20 is the total width'
    },
    {
      question: 'What does f"{num: d}" (with a space before d) do?',
      options: ['Adds a space after the number', 'Adds a leading space for positive numbers', 'Error', 'Same as :d'],
      correctIndex: 1,
      explanation: 'A space before d reserves a space for the sign of positive numbers, keeping alignment with negatives'
    },
    {
      question: 'What is the output of f"{255:#x}"?',
      options: ['"ff"', '"0xff"', '"#ff"', '"255x"'],
      correctIndex: 1,
      explanation: 'The # flag adds the 0x prefix for hexadecimal formatting'
    },
    {
      question: 'What does f"{3.14159:.4f}" produce?',
      options: ['"3.14"', '"3.1416"', '"3.1415"', '"3.14159"'],
      correctIndex: 1,
      explanation: ':.4f rounds to 4 decimal places, so 3.14159 becomes "3.1416"'
    },
  ],

  'lesson-3-5': [
    {
      question: 'What does .isalpha() check?',
      options: ['All are numbers', 'All are alphanumeric', 'All characters are letters', 'String is empty'],
      correctIndex: 2,
      explanation: '"abc".isalpha() is True, "abc1" is False'
    },
    {
      question: 'What does .isdigit() check?',
      options: ['All are letters', 'All are alphanumeric', 'All characters are digits', 'Has any digit'],
      correctIndex: 2,
      explanation: '"123".isdigit() is True, "12a" is False'
    },
    {
      question: 'What does .isalnum() check?',
      options: ['Only letters', 'Only digits', 'Letters or digits only', 'Any characters'],
      correctIndex: 2,
      explanation: '"abc123".isalnum() is True, "abc 123" is False'
    },
    {
      question: 'What does "x" in "xyz" return?',
      options: ['False', '0', 'True', 'Error'],
      correctIndex: 2,
      explanation: 'in checks if substring exists'
    },
    {
      question: 'What does .find("sub") return?',
      options: ['True or False', 'The substring', 'Index where found, or -1', 'Count of occurrences'],
      correctIndex: 2,
      explanation: '"hello".find("ll") returns 2'
    },
    {
      question: 'What does .count("sub") do?',
      options: ['Returns index', 'Returns True/False', 'Counts occurrences', 'Removes substring'],
      correctIndex: 2,
      explanation: '"hello".count("l") returns 2'
    },
    {
      question: 'How do you get first character?',
      options: ['text.first()', 'text[-1]', 'text[0]', 'text.start()'],
      correctIndex: 2,
      explanation: 'Use index 0 for first character'
    },
    {
      question: 'How do you get last character?',
      options: ['text[0]', 'text.last()', 'text[-1]', 'text.end()'],
      correctIndex: 2,
      explanation: 'Use index -1 for last character'
    },
    {
      question: 'What does text[::-1] do?',
      options: ['Removes last char', 'Duplicates string', 'Reverses string', 'Error'],
      correctIndex: 2,
      explanation: 'Slice with step -1 reverses'
    },
    {
      question: 'How do you check if string is lowercase?',
      options: ['.isLower()', '.lowercase()', '.islower()', '.lower() == text'],
      correctIndex: 2,
      explanation: '"hello".islower() returns True'
    },
    {
      question: 'What does .isupper() check?',
      options: ['First character is uppercase', 'All cased characters are uppercase', 'String has any uppercase letter', 'String is not lowercase'],
      correctIndex: 1,
      explanation: '"HELLO".isupper() is True, "Hello" is False because not all cased chars are uppercase'
    },
    {
      question: 'What does .istitle() check?',
      options: ['String is a title tag', 'First char is upper', 'Each word starts with uppercase and rest are lowercase', 'String is all caps'],
      correctIndex: 2,
      explanation: '"Hello World".istitle() is True, "Hello world" is False'
    },
    {
      question: 'What does .isspace() check?',
      options: ['String contains a space', 'String starts with space', 'All characters are whitespace', 'String is empty'],
      correctIndex: 2,
      explanation: '"   ".isspace() is True, " a ".isspace() is False'
    },
    {
      question: 'What does .isdecimal() check?',
      options: ['String contains a decimal point', 'All characters are decimal digits', 'String is a float', 'String has numbers'],
      correctIndex: 1,
      explanation: '"123".isdecimal() is True; it is stricter than isdigit() and does not accept superscripts'
    },
    {
      question: 'What happens when .index("sub") cannot find the substring?',
      options: ['Returns -1', 'Returns None', 'Raises a ValueError', 'Returns False'],
      correctIndex: 2,
      explanation: 'Unlike .find() which returns -1, .index() raises a ValueError when the substring is not found'
    },
    {
      question: 'What does "abc" not in "abcdef" return?',
      options: ['True', 'False', 'Error', 'None'],
      correctIndex: 1,
      explanation: '"abc" IS in "abcdef", so not in returns False'
    },
    {
      question: 'What does "".isalpha() return?',
      options: ['True', 'False', 'None', 'Error'],
      correctIndex: 1,
      explanation: 'All string testing methods (isalpha, isdigit, etc.) return False on an empty string'
    },
    {
      question: 'What does "Hello 123".isalnum() return?',
      options: ['True', 'False', 'Error', 'None'],
      correctIndex: 1,
      explanation: 'The space character is not alphanumeric, so isalnum() returns False'
    },
    {
      question: 'What does "hello".find("ll", 3) return?',
      options: ['2', '-1', '3', 'Error'],
      correctIndex: 1,
      explanation: '.find() accepts a start parameter; searching from index 3, "ll" is not found so it returns -1'
    },
    {
      question: 'What does "ABC123".isdigit() return?',
      options: ['True', 'False', 'Error', 'None'],
      correctIndex: 1,
      explanation: 'isdigit() returns False because "ABC123" contains letters, not only digits'
    },
  ],

  // ============================================
  // MODULE 6: Working with Numbers & Math
  // ============================================

  'lesson-2-1': [
    {
      question: 'What does ** operator do?',
      options: ['Multiply twice', 'Exponentiation', 'Division', 'Modulus'],
      correctIndex: 1,
      explanation: '2 ** 3 equals 8 (2 to the power of 3)'
    },
    {
      question: 'What is 10 // 3?',
      options: ['3.33', '4', '3', '10'],
      correctIndex: 2,
      explanation: '// performs integer division, discarding remainder'
    },
    {
      question: 'What does % operator return?',
      options: ['Quotient', 'Percentage', 'Remainder', 'Decimal'],
      correctIndex: 2,
      explanation: '10 % 3 returns 1 (the remainder)'
    },
    {
      question: 'What does pow(2, 3) equal?',
      options: ['6', '9', '5', '8'],
      correctIndex: 3,
      explanation: 'pow(2, 3) calculates 2³ = 8'
    },
    {
      question: 'What does abs(-5) return?',
      options: ['-5', '0', '5', 'Error'],
      correctIndex: 2,
      explanation: 'abs() returns absolute value (distance from zero)'
    },
    {
      question: 'How to square a number x?',
      options: ['x * x', 'x ** 2', 'pow(x, 2)', 'All of the above'],
      correctIndex: 3,
      explanation: 'All three methods calculate x squared'
    },
    {
      question: 'What is 7 % 2?',
      options: ['2', '3', '1', '3.5'],
      correctIndex: 2,
      explanation: '7 divided by 2 leaves remainder of 1'
    },
    {
      question: 'What does // do with negative numbers?',
      options: ['Floors toward zero', 'Floors toward negative infinity', 'Rounds up', 'Error'],
      correctIndex: 1,
      explanation: '-7 // 2 equals -4 (floors toward negative infinity)'
    },
    {
      question: 'What does pow(2, 3, 5) return?',
      options: ['8', '13', '3', '2'],
      correctIndex: 2,
      explanation: 'pow(x, y, z) returns (x**y) % z, so (8 % 5) = 3'
    },
    {
      question: 'How check if number is even?',
      options: ['n % 2 == 0', 'n / 2 == 0', 'n // 2', 'even(n)'],
      correctIndex: 0,
      explanation: 'Even numbers have remainder 0 when divided by 2'
    },
    {
      question: 'What is 2 ** 0?',
      options: ['0', '2', '1', 'Error'],
      correctIndex: 2,
      explanation: 'Any number raised to the power of 0 equals 1'
    },
    {
      question: 'What is 15 % 4?',
      options: ['3', '4', '2', '3.75'],
      correctIndex: 0,
      explanation: '15 divided by 4 is 3 remainder 3, so 15 % 4 = 3'
    },
    {
      question: 'What is 17 // 5?',
      options: ['3.4', '4', '3', '2'],
      correctIndex: 2,
      explanation: '17 // 5 performs integer division: 17 / 5 = 3.4, floored to 3'
    },
    {
      question: 'What does abs(0) return?',
      options: ['Error', '0', '1', 'None'],
      correctIndex: 1,
      explanation: 'The absolute value of 0 is 0'
    },
    {
      question: 'What is 3 ** 3?',
      options: ['9', '6', '27', '12'],
      correctIndex: 2,
      explanation: '3 ** 3 means 3 * 3 * 3 = 27'
    },
    {
      question: 'What is 20 % 5?',
      options: ['4', '5', '1', '0'],
      correctIndex: 3,
      explanation: '20 is evenly divisible by 5, so the remainder is 0'
    },
    {
      question: 'What is -9 // 2?',
      options: ['-4', '-5', '-4.5', '4'],
      correctIndex: 1,
      explanation: 'Integer division floors toward negative infinity: -9 / 2 = -4.5, floored to -5'
    },
    {
      question: 'What does pow(5, 0) return?',
      options: ['0', '5', '1', 'Error'],
      correctIndex: 2,
      explanation: 'Any number raised to the power 0 equals 1'
    },
    {
      question: 'What is abs(-3.7)?',
      options: ['-3.7', '3', '4', '3.7'],
      correctIndex: 3,
      explanation: 'abs() returns the absolute value, so abs(-3.7) = 3.7'
    },
    {
      question: 'What is 100 // 7?',
      options: ['14', '15', '14.28', '13'],
      correctIndex: 0,
      explanation: '100 / 7 = 14.28..., integer division floors to 14'
    },
  ],

  'lesson-2-2': [
    {
      question: 'What module contains sqrt()?',
      options: ['numbers', 'math', 'calc', 'sqrt'],
      correctIndex: 1,
      explanation: 'Import math module for square root function'
    },
    {
      question: 'What does math.ceil(4.2) return?',
      options: ['4', '4.2', '5', '4.5'],
      correctIndex: 2,
      explanation: 'ceil rounds UP to nearest integer'
    },
    {
      question: 'What does math.floor(4.8) return?',
      options: ['4', '5', '4.8', '5.0'],
      correctIndex: 0,
      explanation: 'floor rounds DOWN to nearest integer'
    },
    {
      question: 'What is math.pi approximately?',
      options: ['3.0', '3.14159', '3.5', '22/7'],
      correctIndex: 1,
      explanation: 'math.pi is approximately 3.14159...'
    },
    {
      question: 'What does math.sqrt(16) equal?',
      options: ['8', '256', '2', '4'],
      correctIndex: 3,
      explanation: 'Square root of 16 is 4'
    },
    {
      question: 'How import sqrt directly?',
      options: ['from math get sqrt', 'import sqrt', 'from math import sqrt', 'sqrt from math'],
      correctIndex: 2,
      explanation: 'Use: from math import sqrt'
    },
    {
      question: 'What does math.ceil(-2.5) return?',
      options: ['-3', '-2', '-2.5', '3'],
      correctIndex: 1,
      explanation: 'ceil(-2.5) rounds UP to -2 (toward positive infinity)'
    },
    {
      question: 'What does math.floor(-2.5) return?',
      options: ['-2', '-3', '-2.5', '2'],
      correctIndex: 1,
      explanation: 'floor(-2.5) rounds DOWN to -3 (toward negative infinity)'
    },
    {
      question: 'What is math.e approximately?',
      options: ['2.5', '3.14', '2.718', '1.618'],
      correctIndex: 2,
      explanation: 'math.e is Euler\'s number, approximately 2.718'
    },
    {
      question: 'What does math.pow(2, 3) return?',
      options: ['6', '8', '8.0', '9'],
      correctIndex: 2,
      explanation: 'math.pow returns float: 8.0'
    },
    {
      question: 'What does math.factorial(5) return?',
      options: ['25', '120', '15', '5'],
      correctIndex: 1,
      explanation: 'math.factorial(5) = 5 * 4 * 3 * 2 * 1 = 120'
    },
    {
      question: 'What does math.sqrt(0) return?',
      options: ['Error', 'None', '0.0', '1'],
      correctIndex: 2,
      explanation: 'The square root of 0 is 0.0'
    },
    {
      question: 'What does math.ceil(7.0) return?',
      options: ['7', '8', '7.0', '6'],
      correctIndex: 0,
      explanation: 'ceil of a whole number returns that number as an integer: 7'
    },
    {
      question: 'What does math.floor(3.999) return?',
      options: ['4', '3', '3.999', '3.9'],
      correctIndex: 1,
      explanation: 'floor rounds down to the nearest integer, so 3.999 becomes 3'
    },
    {
      question: 'How do you import the entire math module?',
      options: ['from math import all', 'import math', 'include math', 'require math'],
      correctIndex: 1,
      explanation: 'Use "import math" to import the entire module'
    },
    {
      question: 'What does math.sqrt(144) return?',
      options: ['14.4', '72', '12.0', '11.0'],
      correctIndex: 2,
      explanation: 'The square root of 144 is 12.0'
    },
    {
      question: 'What is math.factorial(0)?',
      options: ['0', '1', 'Error', 'None'],
      correctIndex: 1,
      explanation: 'By definition, 0! (zero factorial) equals 1'
    },
    {
      question: 'What does math.ceil(-1.1) return?',
      options: ['-2', '-1', '0', '-1.1'],
      correctIndex: 1,
      explanation: 'ceil rounds toward positive infinity, so -1.1 becomes -1'
    },
    {
      question: 'What does math.floor(0.5) return?',
      options: ['1', '0.5', '0', '-1'],
      correctIndex: 2,
      explanation: 'floor rounds down, so 0.5 becomes 0'
    },
    {
      question: 'What is the return type of math.sqrt(25)?',
      options: ['int', 'float', 'str', 'complex'],
      correctIndex: 1,
      explanation: 'math.sqrt always returns a float, so sqrt(25) returns 5.0'
    },
  ],

  'lesson-2-3': [
    {
      question: 'What module provides random numbers?',
      options: ['math', 'rand', 'random', 'number'],
      correctIndex: 2,
      explanation: 'Import random module for random operations'
    },
    {
      question: 'What does random.randint(1, 10) return?',
      options: ['Float between 1 and 10', 'Integer 1 to 9', 'Integer 1 to 10', 'Random decimal'],
      correctIndex: 2,
      explanation: 'randint(a, b) includes both endpoints'
    },
    {
      question: 'What does random.random() return?',
      options: ['Integer 0 to 10', 'Float 0.0 to 1.0', 'Any random number', 'True or False'],
      correctIndex: 1,
      explanation: 'random() returns float between 0.0 and 1.0'
    },
    {
      question: 'What does random.choice([1,2,3]) do?',
      options: ['Returns all items', 'Returns first item', 'Returns random item', 'Returns last item'],
      correctIndex: 2,
      explanation: 'choice picks one random element from sequence'
    },
    {
      question: 'Does random.randint(5, 5) work?',
      options: ['Returns 5', 'Returns error', 'Returns 0', 'Returns None'],
      correctIndex: 0,
      explanation: 'Valid range with same start and end returns that number'
    },
    {
      question: 'What does random.shuffle() do?',
      options: ['Returns shuffled copy', 'Shuffles in place', 'Sorts list', 'Reverses list'],
      correctIndex: 1,
      explanation: 'shuffle modifies list in place, returns None'
    },
    {
      question: 'Range of random.randint(1, 6)?',
      options: ['1 to 5', '1 to 6', '0 to 6', '0 to 5'],
      correctIndex: 1,
      explanation: 'Simulates dice roll: 1, 2, 3, 4, 5, or 6'
    },
    {
      question: 'How get random float 0 to 10?',
      options: ['random.random() * 10', 'random.randint(0, 10)', 'random(10)', 'random.float(10)'],
      correctIndex: 0,
      explanation: 'Multiply random() by 10 to scale range'
    },
    {
      question: 'What does random.choice("ABC") return?',
      options: ['List', 'Tuple', 'One character', 'Error'],
      correctIndex: 2,
      explanation: 'choice works on strings, returns random character'
    },
    {
      question: 'Is random.random() inclusive of 1.0?',
      options: ['Yes', 'Sometimes', 'Only if seeded', 'No'],
      correctIndex: 3,
      explanation: 'Returns [0.0, 1.0) - includes 0.0, excludes 1.0'
    },
    {
      question: 'What does random.uniform(1, 5) return?',
      options: ['Integer 1 to 5', 'Float 1.0 to 5.0', 'Always 3.0', 'Float 0.0 to 5.0'],
      correctIndex: 1,
      explanation: 'random.uniform(a, b) returns a random float between a and b inclusive'
    },
    {
      question: 'What does random.sample([1,2,3,4,5], 3) return?',
      options: ['3 random items as a list', 'One random item', 'The original list', 'Error'],
      correctIndex: 0,
      explanation: 'random.sample returns a list of k unique elements chosen from the sequence'
    },
    {
      question: 'What does random.shuffle() return?',
      options: ['Shuffled list', 'None', 'True', 'Original list'],
      correctIndex: 1,
      explanation: 'shuffle modifies the list in place and returns None'
    },
    {
      question: 'What happens with random.choice([])?',
      options: ['Returns None', 'Returns 0', 'IndexError', 'Returns empty list'],
      correctIndex: 2,
      explanation: 'random.choice raises IndexError when given an empty sequence'
    },
    {
      question: 'How do you simulate a coin flip?',
      options: ['random.flip()', 'random.choice(["H", "T"])', 'random.coin()', 'random.bool()'],
      correctIndex: 1,
      explanation: 'Use random.choice with a list of two options to simulate a coin flip'
    },
    {
      question: 'What is the range of random.randint(0, 1)?',
      options: ['Only 0', 'Only 1', '0 or 1', '0.0 to 1.0'],
      correctIndex: 2,
      explanation: 'randint(0, 1) returns either 0 or 1 (both endpoints included)'
    },
    {
      question: 'Can random.sample pick duplicates from a list?',
      options: ['Yes always', 'Only if k > len', 'No, picks unique elements', 'Only with replace=True'],
      correctIndex: 2,
      explanation: 'random.sample picks without replacement, so all selected elements are unique'
    },
    {
      question: 'How generate random float between 5 and 10?',
      options: ['random.random(5, 10)', 'random.uniform(5, 10)', 'random.float(5, 10)', 'random.randint(5.0, 10.0)'],
      correctIndex: 1,
      explanation: 'random.uniform(5, 10) returns a random float between 5 and 10'
    },
    {
      question: 'What does random.sample("hello", 2) return?',
      options: ['Error', 'A string of 2 chars', 'A list of 2 characters', 'A tuple'],
      correctIndex: 2,
      explanation: 'random.sample works on strings and returns a list of sampled characters'
    },
    {
      question: 'Does random.shuffle work on strings?',
      options: ['Yes', 'Only with list()', 'No, strings are immutable', 'Yes, returns new string'],
      correctIndex: 2,
      explanation: 'Strings are immutable so shuffle cannot modify them in place; it raises a TypeError'
    },
  ],

  'lesson-2-4': [
    {
      question: 'What does int("42") return?',
      options: ['"42"', '42', '42.0', 'Error'],
      correctIndex: 1,
      explanation: 'Converts string "42" to integer 42'
    },
    {
      question: 'What does float("3.14") return?',
      options: ['3', '3.14', '"3.14"', 'Error'],
      correctIndex: 1,
      explanation: 'Converts string to floating-point number'
    },
    {
      question: 'What does str(100) return?',
      options: ['100', '"100"', '100.0', 'Error'],
      correctIndex: 1,
      explanation: 'Converts integer to string "100"'
    },
    {
      question: 'What happens with int("hello")?',
      options: ['Returns 0', 'Returns None', 'ValueError', 'Returns "hello"'],
      correctIndex: 2,
      explanation: 'Cannot convert non-numeric string to int'
    },
    {
      question: 'What does int(3.9) return?',
      options: ['4', '3.9', '3', 'Error'],
      correctIndex: 2,
      explanation: 'int() truncates (doesn\'t round) decimal'
    },
    {
      question: 'What does float(5) return?',
      options: ['5', '"5"', '5.0', 'Error'],
      correctIndex: 2,
      explanation: 'Converts integer to float'
    },
    {
      question: 'How check type of variable x?',
      options: ['x.type()', 'typeof(x)', 'type(x)', 'x.getType()'],
      correctIndex: 2,
      explanation: 'Use type(x) to get variable type'
    },
    {
      question: 'What does isinstance(5, int) return?',
      options: ['5', 'int', 'True', 'False'],
      correctIndex: 2,
      explanation: 'Checks if value is instance of type'
    },
    {
      question: 'Can you do int("3.5")?',
      options: ['Yes, returns 3', 'Yes, returns 4', 'Yes, returns 3.5', 'No, ValueError'],
      correctIndex: 3,
      explanation: 'int() cannot convert string with decimal point'
    },
    {
      question: 'What does str(3.14) return?',
      options: ['3', '3.14', '"3.14"', 'Error'],
      correctIndex: 2,
      explanation: 'Converts float to string "3.14"'
    },
    {
      question: 'What does bool(0) return?',
      options: ['True', 'False', '0', 'Error'],
      correctIndex: 1,
      explanation: 'Zero is falsy in Python, so bool(0) returns False'
    },
    {
      question: 'What does bool("") return?',
      options: ['True', 'False', '""', 'Error'],
      correctIndex: 1,
      explanation: 'An empty string is falsy, so bool("") returns False'
    },
    {
      question: 'What does int(True) return?',
      options: ['True', '0', '1', 'Error'],
      correctIndex: 2,
      explanation: 'True is treated as 1 when converted to an integer'
    },
    {
      question: 'What does list("cat") return?',
      options: ['["cat"]', '["c", "a", "t"]', 'Error', '"cat"'],
      correctIndex: 1,
      explanation: 'list() splits a string into individual characters'
    },
    {
      question: 'What does float("inf") return?',
      options: ['Error', '0', 'inf', 'None'],
      correctIndex: 2,
      explanation: 'Python can convert the string "inf" to positive infinity float'
    },
    {
      question: 'What does bool([]) return?',
      options: ['True', 'False', '[]', 'Error'],
      correctIndex: 1,
      explanation: 'An empty list is falsy, so bool([]) returns False'
    },
    {
      question: 'What does int(False) return?',
      options: ['False', '1', '0', 'Error'],
      correctIndex: 2,
      explanation: 'False is treated as 0 when converted to an integer'
    },
    {
      question: 'What does type(3.0) return?',
      options: ['<class \'int\'>', '<class \'float\'>', '<class \'str\'>', '<class \'number\'>'],
      correctIndex: 1,
      explanation: '3.0 is a float, so type(3.0) returns <class \'float\'>'
    },
    {
      question: 'What does str(True) return?',
      options: ['1', '"1"', '"True"', 'Error'],
      correctIndex: 2,
      explanation: 'str(True) converts the boolean to the string "True"'
    },
    {
      question: 'What does bool(1) return?',
      options: ['1', 'True', 'False', 'Error'],
      correctIndex: 1,
      explanation: 'Any non-zero number is truthy, so bool(1) returns True'
    },
  ],

  'lesson-2-5': [
    {
      question: 'How format number with 2 decimals?',
      options: ['f"{x:.2f}"', 'f"{x:2}"', 'f"{x:.2}"', 'f"{x:f2}"'],
      correctIndex: 0,
      explanation: ':.2f formats float with 2 decimal places'
    },
    {
      question: 'What does f"{1000:,}" display?',
      options: ['1000', '1,000', '1.000', 'Error'],
      correctIndex: 1,
      explanation: 'Comma separator for thousands'
    },
    {
      question: 'What does f"{0.5:.0%}" show?',
      options: ['0.5', '5%', '50', '50%'],
      correctIndex: 3,
      explanation: 'Converts to percentage with 0 decimals'
    },
    {
      question: 'How right-align in 5 spaces?',
      options: ['f"{x:>5}"', 'f"{x:<5}"', 'f"{x:5>}"', 'f"{x:^5}"'],
      correctIndex: 0,
      explanation: '> means right-align in specified width'
    },
    {
      question: 'What does f"{42:05}" display?',
      options: ['42', '00042', '42000', '42.00'],
      correctIndex: 1,
      explanation: 'Pads with zeros to width of 5'
    },
    {
      question: 'How center text in 10 spaces?',
      options: ['f"{x:<10}"', 'f"{x:^10}"', 'f"{x:>10}"', 'f"{x:*10}"'],
      correctIndex: 1,
      explanation: '^ means center-align'
    },
    {
      question: 'What does f"{3.14159:.2f}" show?',
      options: ['3.14', '3.14159', '3.1', '3.2'],
      correctIndex: 0,
      explanation: 'Rounds to 2 decimal places'
    },
    {
      question: 'How display as percentage?',
      options: ['f"{x}%"', 'f"{x:%}"', 'f"{x:.0%}"', 'f"%{x}"'],
      correctIndex: 2,
      explanation: ':.0% multiplies by 100 and adds % sign'
    },
    {
      question: 'What does f"{1234567:,}" display?',
      options: ['1234567', '1,234,567', '1.234.567', '1 234 567'],
      correctIndex: 1,
      explanation: 'Adds comma thousands separators'
    },
    {
      question: 'How left-align in 10 spaces?',
      options: ['f"{x:>10}"', 'f"{x:10<}"', 'f"{x:<10}"', 'f"{x:^10}"'],
      correctIndex: 2,
      explanation: '< means left-align in specified width'
    },
    {
      question: 'What does f"{255:x}" display?',
      options: ['255', 'ff', '0xff', 'FF'],
      correctIndex: 1,
      explanation: ':x formats an integer as a lowercase hexadecimal string'
    },
    {
      question: 'What does f"{10:b}" display?',
      options: ['10', '1010', '0b1010', 'binary'],
      correctIndex: 1,
      explanation: ':b formats an integer as a binary string'
    },
    {
      question: 'What does f"{42:d}" display?',
      options: ['"42"', '42', '42.0', 'Error'],
      correctIndex: 1,
      explanation: ':d formats a value as a decimal integer'
    },
    {
      question: 'What does f"{3.14159:.4f}" show?',
      options: ['3.14', '3.1416', '3.1415', '3.14159'],
      correctIndex: 1,
      explanation: ':.4f rounds to 4 decimal places: 3.1416'
    },
    {
      question: 'What does f"{0.123:.1%}" show?',
      options: ['0.1%', '12.3%', '1.2%', '123%'],
      correctIndex: 1,
      explanation: ':.1% multiplies by 100 and formats with 1 decimal: 12.3%'
    },
    {
      question: 'What does f"{"hi":*^10}" display?',
      options: ['****hi****', '**hi**', '  hi      ', 'hi********'],
      correctIndex: 0,
      explanation: '*^10 centers "hi" in 10 chars, padding with * on both sides'
    },
    {
      question: 'What does f"{7:03d}" display?',
      options: ['7', '007', '070', '700'],
      correctIndex: 1,
      explanation: ':03d pads the integer with leading zeros to width 3'
    },
    {
      question: 'What does f"{1000000:,.2f}" display?',
      options: ['1000000.00', '1,000,000.00', '1.000.000,00', '1,000,000'],
      correctIndex: 1,
      explanation: ':,.2f adds comma separators and 2 decimal places'
    },
    {
      question: 'What does f"{"test":>10}" display?',
      options: ['test      ', '      test', '   test   ', 'test'],
      correctIndex: 1,
      explanation: ':>10 right-aligns "test" in a field of width 10'
    },
    {
      question: 'What does f"{8:04b}" display?',
      options: ['1000', '0100', '0008', '00001000'],
      correctIndex: 0,
      explanation: ':04b formats 8 as binary (1000) padded to 4 characters'
    },
  ],

  // ============================================
  // MODULE 7: Boolean Logic & Comparisons
  // ============================================

  'lesson-4-1': [
    {
      question: 'What are the two boolean values?',
      options: ['yes/no', '1/0', 'True/False', 'on/off'],
      correctIndex: 2,
      explanation: 'Python uses True and False (capitalized)'
    },
    {
      question: 'What does == check?',
      options: ['Assignment', 'Equality', 'Not equal', 'Identity'],
      correctIndex: 1,
      explanation: '== checks if two values are equal'
    },
    {
      question: 'What does != mean?',
      options: ['Equal to', 'Not equal to', 'Greater than', 'Less than'],
      correctIndex: 1,
      explanation: '!= checks if values are not equal'
    },
    {
      question: 'What does 5 > 3 return?',
      options: ['5', '3', 'True', 'False'],
      correctIndex: 2,
      explanation: '5 is greater than 3, so returns True'
    },
    {
      question: 'What does 10 <= 10 return?',
      options: ['10', 'False', 'True', 'Error'],
      correctIndex: 2,
      explanation: '<= means less than or equal to'
    },
    {
      question: 'Is "apple" < "banana"?',
      options: ['False', 'True', 'Error', 'None'],
      correctIndex: 1,
      explanation: 'Strings compare alphabetically'
    },
    {
      question: 'What type is True?',
      options: ['str', 'int', 'bool', 'float'],
      correctIndex: 2,
      explanation: 'True and False are boolean type'
    },
    {
      question: 'What does 5 >= 5 return?',
      options: ['False', 'True', '5', 'Error'],
      correctIndex: 1,
      explanation: '>= includes equality: 5 equals 5'
    },
    {
      question: 'Does "Hello" == "hello"?',
      options: ['True', 'False', 'Sometimes', 'Error'],
      correctIndex: 1,
      explanation: 'String comparison is case-sensitive'
    },
    {
      question: 'What does 3 < 3 return?',
      options: ['True', '3', 'False', 'None'],
      correctIndex: 2,
      explanation: '3 is not less than 3'
    },
    {
      question: 'What does 10 == 10.0 return?',
      options: ['False', 'True', 'Error', 'None'],
      correctIndex: 1,
      explanation: 'Python considers int 10 and float 10.0 equal in value'
    },
    {
      question: 'What does "abc" > "abd" return?',
      options: ['True', 'False', 'Error', 'None'],
      correctIndex: 1,
      explanation: 'Strings are compared character by character; "c" < "d" so "abc" < "abd"'
    },
    {
      question: 'What does 7 != 7 return?',
      options: ['True', '7', 'False', 'Error'],
      correctIndex: 2,
      explanation: '7 equals 7, so != returns False'
    },
    {
      question: 'What does True == 1 return?',
      options: ['False', 'True', 'Error', 'None'],
      correctIndex: 1,
      explanation: 'In Python, True is treated as 1 in numeric comparisons'
    },
    {
      question: 'What does 0 < -1 return?',
      options: ['True', 'False', '0', 'Error'],
      correctIndex: 1,
      explanation: '0 is greater than -1, so 0 < -1 is False'
    },
    {
      question: 'What does "Z" < "a" return?',
      options: ['False', 'True', 'Error', 'Depends'],
      correctIndex: 1,
      explanation: 'Uppercase letters have lower ASCII values than lowercase, so "Z" < "a" is True'
    },
    {
      question: 'Which operator means "less than or equal to"?',
      options: ['<', '>=', '<=', '!='],
      correctIndex: 2,
      explanation: '<= checks if the left value is less than or equal to the right'
    },
    {
      question: 'What does False == 0 return?',
      options: ['True', 'False', 'Error', 'None'],
      correctIndex: 0,
      explanation: 'In Python, False is treated as 0 in numeric comparisons'
    },
    {
      question: 'What does len("hi") == 2 return?',
      options: ['False', '"hi"', 'True', 'Error'],
      correctIndex: 2,
      explanation: 'len("hi") is 2, and 2 == 2 is True'
    },
    {
      question: 'Can you compare a string and an integer with ==?',
      options: ['Yes, returns True if same', 'Yes, always returns False', 'No, raises an error', 'Only with int()'],
      correctIndex: 1,
      explanation: 'Comparing different types with == returns False without error (e.g., "5" == 5 is False)'
    },
  ],

  'lesson-4-2': [
    {
      question: 'What does True and False return?',
      options: ['True', 'False', 'None', 'Error'],
      correctIndex: 1,
      explanation: 'and returns True only if both are True'
    },
    {
      question: 'What does True or False return?',
      options: ['True', 'False', 'None', 'Error'],
      correctIndex: 0,
      explanation: 'or returns True if at least one is True'
    },
    {
      question: 'What does not True return?',
      options: ['True', 'False', 'None', 'Error'],
      correctIndex: 1,
      explanation: 'not reverses the boolean value'
    },
    {
      question: 'What does False or False return?',
      options: ['True', 'False', 'None', 'Error'],
      correctIndex: 1,
      explanation: 'or needs at least one True'
    },
    {
      question: 'What does True and True return?',
      options: ['False', 'None', 'True', 'Error'],
      correctIndex: 2,
      explanation: 'and returns True when both are True'
    },
    {
      question: 'What does not False return?',
      options: ['False', 'True', 'None', 'Error'],
      correctIndex: 1,
      explanation: 'not False flips to True'
    },
    {
      question: 'What operator evaluates first?',
      options: ['and', 'or', 'not', 'They\'re equal'],
      correctIndex: 2,
      explanation: 'not has highest precedence'
    },
    {
      question: 'What does (5 > 3) and (2 < 1) return?',
      options: ['True', 'False', '5', 'Error'],
      correctIndex: 1,
      explanation: 'First is True, second is False, and returns False'
    },
    {
      question: 'What does (5 > 3) or (2 < 1) return?',
      options: ['False', 'True', '5', 'Error'],
      correctIndex: 1,
      explanation: 'First is True, so or returns True'
    },
    {
      question: 'What does not (5 > 3) return?',
      options: ['True', 'False', '5', 'Error'],
      correctIndex: 1,
      explanation: '5 > 3 is True, not True is False'
    },
    {
      question: 'What does False and False return?',
      options: ['True', 'False', 'None', 'Error'],
      correctIndex: 1,
      explanation: 'and returns True only if both operands are True'
    },
    {
      question: 'What does 0 or "hello" return?',
      options: ['0', 'True', '"hello"', 'False'],
      correctIndex: 2,
      explanation: 'or returns the first truthy value; 0 is falsy, so it returns "hello"'
    },
    {
      question: 'What does "" and "world" return?',
      options: ['"world"', '""', 'True', 'False'],
      correctIndex: 1,
      explanation: 'and short-circuits: "" is falsy, so it returns "" without evaluating "world"'
    },
    {
      question: 'What is the precedence order of logical operators?',
      options: ['and, or, not', 'or, and, not', 'not, and, or', 'not, or, and'],
      correctIndex: 2,
      explanation: 'Precedence from highest to lowest: not, and, or'
    },
    {
      question: 'What does True or True and False return?',
      options: ['False', 'True', 'None', 'Error'],
      correctIndex: 1,
      explanation: 'and binds tighter: True and False is False, then True or False is True'
    },
    {
      question: 'What does not not True return?',
      options: ['True', 'False', 'None', 'Error'],
      correctIndex: 0,
      explanation: 'not True is False, not False is True (double negation)'
    },
    {
      question: 'What does 5 and 0 return?',
      options: ['5', '0', 'True', 'False'],
      correctIndex: 1,
      explanation: 'and returns the first falsy value; 5 is truthy so it evaluates 0 and returns it'
    },
    {
      question: 'What does None or 42 return?',
      options: ['None', '42', 'True', 'False'],
      correctIndex: 1,
      explanation: 'or returns the first truthy value; None is falsy, so it returns 42'
    },
    {
      question: 'What does not 0 return?',
      options: ['0', '1', 'True', 'False'],
      correctIndex: 2,
      explanation: '0 is falsy, so not 0 returns True'
    },
    {
      question: 'What does (True or False) and (False or False) return?',
      options: ['True', 'False', 'None', 'Error'],
      correctIndex: 1,
      explanation: 'True or False is True; False or False is False; True and False is False'
    },
  ],

  'lesson-4-3': [
    {
      question: 'Is empty string "" truthy or falsy?',
      options: ['Truthy', 'Falsy', 'Neither', 'Error'],
      correctIndex: 1,
      explanation: 'Empty strings are falsy'
    },
    {
      question: 'Is 0 truthy or falsy?',
      options: ['Truthy', 'Falsy', 'Neither', 'Depends'],
      correctIndex: 1,
      explanation: 'Zero is falsy in Python'
    },
    {
      question: 'Is [1, 2, 3] truthy or falsy?',
      options: ['Falsy', 'Neither', 'Truthy', 'Depends'],
      correctIndex: 2,
      explanation: 'Non-empty lists are truthy'
    },
    {
      question: 'What does bool(0) return?',
      options: ['True', '0', 'False', 'None'],
      correctIndex: 2,
      explanation: 'Zero converts to False'
    },
    {
      question: 'What does bool("text") return?',
      options: ['False', 'True', '"text"', 'Error'],
      correctIndex: 1,
      explanation: 'Non-empty strings are truthy'
    },
    {
      question: 'Is None truthy or falsy?',
      options: ['Truthy', 'Falsy', 'Neither', 'Depends'],
      correctIndex: 1,
      explanation: 'None is falsy'
    },
    {
      question: 'Is [] (empty list) truthy or falsy?',
      options: ['Truthy', 'Falsy', 'Neither', 'Error'],
      correctIndex: 1,
      explanation: 'Empty collections are falsy'
    },
    {
      question: 'What does bool(42) return?',
      options: ['False', '42', 'True', 'None'],
      correctIndex: 2,
      explanation: 'Non-zero numbers are truthy'
    },
    {
      question: 'What does bool({}) return?',
      options: ['True', 'False', '{}', 'Error'],
      correctIndex: 1,
      explanation: 'Empty dictionaries are falsy'
    },
    {
      question: 'If x = "", what does "if x:" do?',
      options: ['Runs block', 'Skips block', 'Error', 'Depends'],
      correctIndex: 1,
      explanation: 'Empty string is falsy, so block is skipped'
    },
    {
      question: 'What does bool(None) return?',
      options: ['True', 'None', 'False', 'Error'],
      correctIndex: 2,
      explanation: 'None is falsy, so bool(None) returns False'
    },
    {
      question: 'Is bool(0.0) truthy or falsy?',
      options: ['Truthy', 'Falsy', 'Error', 'Depends'],
      correctIndex: 1,
      explanation: '0.0 is a zero value, which is falsy just like integer 0'
    },
    {
      question: 'What does bool(" ") return (string with a space)?',
      options: ['False', 'True', 'Error', 'None'],
      correctIndex: 1,
      explanation: 'A string with a space is non-empty, so it is truthy'
    },
    {
      question: 'What does bool([0]) return?',
      options: ['False', 'True', '0', 'Error'],
      correctIndex: 1,
      explanation: 'A list containing an element (even 0) is non-empty, so it is truthy'
    },
    {
      question: 'How many falsy values does Python have?',
      options: ['2', '4', '6 or more', 'Only False'],
      correctIndex: 2,
      explanation: 'Falsy values include False, None, 0, 0.0, "", [], {}, set(), and more'
    },
    {
      question: 'Is bool(-1) truthy or falsy?',
      options: ['Falsy', 'Truthy', 'Error', 'None'],
      correctIndex: 1,
      explanation: 'Any non-zero number is truthy, including negative numbers'
    },
    {
      question: 'What does bool(False) return?',
      options: ['True', 'False', 'None', 'Error'],
      correctIndex: 1,
      explanation: 'False is already a falsy boolean value'
    },
    {
      question: 'Is an empty tuple () truthy or falsy?',
      options: ['Truthy', 'Falsy', 'Error', 'Depends'],
      correctIndex: 1,
      explanation: 'Empty collections including tuples are falsy'
    },
    {
      question: 'What does bool({"key": "value"}) return?',
      options: ['False', 'True', 'Error', 'None'],
      correctIndex: 1,
      explanation: 'A non-empty dictionary is truthy'
    },
    {
      question: 'If x = 0, what does "value = x or 10" assign?',
      options: ['0', '10', 'True', 'Error'],
      correctIndex: 1,
      explanation: '0 is falsy, so or evaluates the second operand and returns 10'
    },
  ],

  'lesson-4-4': [
    {
      question: 'What does 5 < x < 10 check?',
      options: ['x between 5 and 10 (exclusive)', 'x less than 5 or 10', 'x equals 5 or 10', 'Error'],
      correctIndex: 0,
      explanation: 'Chained comparison checks range'
    },
    {
      question: 'What does "a" in "cat" return?',
      options: ['1', 'True', 'False', 'Index'],
      correctIndex: 1,
      explanation: 'in checks membership, returns boolean'
    },
    {
      question: 'What does 5 in [1, 2, 3] return?',
      options: ['5', 'True', 'False', 'None'],
      correctIndex: 2,
      explanation: '5 is not in the list'
    },
    {
      question: 'What does "x" not in "xyz" return?',
      options: ['True', 'False', '"x"', 'Error'],
      correctIndex: 1,
      explanation: '"x" is in "xyz", so not in returns False'
    },
    {
      question: 'When to use is instead of ==?',
      options: ['For numbers', 'For strings', 'For None', 'Never'],
      correctIndex: 2,
      explanation: 'Use is None to check for None'
    },
    {
      question: 'What does x is None check?',
      options: ['Value equality', 'Type', 'Identity', 'Existence'],
      correctIndex: 2,
      explanation: 'is checks if same object (identity)'
    },
    {
      question: 'Does 0 < x < 10 include 0 and 10?',
      options: ['Yes both', 'No neither', 'Only 0', 'Only 10'],
      correctIndex: 1,
      explanation: 'Uses < (less than), excludes endpoints'
    },
    {
      question: 'What does 1 <= x <= 5 mean?',
      options: ['x is 1 or 5', 'x between 1 and 5 inclusive', 'x between 1 and 5 exclusive', 'Error'],
      correctIndex: 1,
      explanation: '<= includes the endpoints'
    },
    {
      question: 'What does "name" in user check?',
      options: ['If "name" is value', 'If "name" is key', 'If user exists', 'Error'],
      correctIndex: 1,
      explanation: 'in checks dictionary keys by default'
    },
    {
      question: 'Does x and y return boolean?',
      options: ['Always True/False', 'Returns x or y value', 'Returns None', 'Error'],
      correctIndex: 1,
      explanation: 'and returns first falsy value or last value'
    },
    {
      question: 'What does 3 in [1, 2, 3, 4] return?',
      options: ['3', 'True', 'False', '2'],
      correctIndex: 1,
      explanation: '3 is in the list, so in returns True'
    },
    {
      question: 'What does 1 < 5 < 10 return?',
      options: ['False', 'True', 'Error', '5'],
      correctIndex: 1,
      explanation: '1 < 5 is True and 5 < 10 is True, so the chained comparison returns True'
    },
    {
      question: 'What does "key" in {"key": 1, "val": 2} return?',
      options: ['1', 'False', 'True', 'Error'],
      correctIndex: 2,
      explanation: 'in checks dictionary keys; "key" is a key in the dict'
    },
    {
      question: 'What does x is not None check?',
      options: ['x does not equal None', 'x is a different object than None', 'x is truthy', 'x has a value'],
      correctIndex: 1,
      explanation: 'is not checks that x is not the same object as None (identity check)'
    },
    {
      question: 'What does 10 < 5 < 20 return?',
      options: ['True', 'False', 'Error', '5'],
      correctIndex: 1,
      explanation: '10 < 5 is False, so the entire chained comparison is False'
    },
    {
      question: 'What does "hello" not in ["hi", "hey"] return?',
      options: ['False', 'True', '"hello"', 'Error'],
      correctIndex: 1,
      explanation: '"hello" is not in the list, so not in returns True'
    },
    {
      question: 'What does 1 <= 1 <= 1 return?',
      options: ['False', 'True', '1', 'Error'],
      correctIndex: 1,
      explanation: '1 <= 1 is True and 1 <= 1 is True, so the chain returns True'
    },
    {
      question: 'What is the difference between == and is?',
      options: ['No difference', '== checks value, is checks identity', '== checks identity, is checks value', '== is faster'],
      correctIndex: 1,
      explanation: '== compares values for equality; is checks if two references point to the same object'
    },
    {
      question: 'What does "at" in "cat" return?',
      options: ['True', 'False', '1', 'Error'],
      correctIndex: 0,
      explanation: '"at" is a substring of "cat", so in returns True'
    },
    {
      question: 'What does 0 == 0 < 1 return?',
      options: ['True', 'False', 'Error', '0'],
      correctIndex: 0,
      explanation: 'This is a chained comparison: 0 == 0 and 0 < 1, both True, so result is True'
    },
  ],

  'lesson-4-5': [
    {
      question: 'What should boolean function names start with?',
      options: ['check_', 'get_', 'is_', 'do_'],
      correctIndex: 2,
      explanation: 'Use is_, has_, can_ for boolean functions'
    },
    {
      question: 'Is "if x == True:" considered good practice?',
      options: ['Yes', 'No', 'Sometimes', 'Best practice'],
      correctIndex: 1,
      explanation: 'Use "if x:" instead of "if x == True:"'
    },
    {
      question: 'How return boolean from function?',
      options: ['if condition: return True else: return False', 'return condition', 'Both work but 2nd is better', 'Neither'],
      correctIndex: 2,
      explanation: 'Return boolean expression directly'
    },
    {
      question: 'What does is_even(n) typically return?',
      options: ['Number', 'True or False', 'String', 'None'],
      correctIndex: 1,
      explanation: 'Boolean functions return True or False'
    },
    {
      question: 'Is "if not is_invalid:" good practice?',
      options: ['Yes, clear', 'No, double negative', 'Depends', 'Always wrong'],
      correctIndex: 1,
      explanation: 'Avoid double negatives, use is_valid instead'
    },
    {
      question: 'How simplify: if age >= 18: return True else: return False?',
      options: ['Cannot simplify', 'if age >= 18', 'return age >= 18', 'return True if age >= 18'],
      correctIndex: 2,
      explanation: 'Return the boolean expression directly'
    },
    {
      question: 'What\'s better: flag or is_active?',
      options: ['flag', 'is_active', 'Same', 'Neither'],
      correctIndex: 1,
      explanation: 'is_active is more descriptive'
    },
    {
      question: 'Does isinstance(5, int) return boolean?',
      options: ['No, returns type', 'No, returns int', 'Yes', 'Sometimes'],
      correctIndex: 2,
      explanation: 'isinstance returns True or False'
    },
    {
      question: 'What makes a predicate function?',
      options: ['Takes parameters', 'Returns boolean', 'Has if statement', 'Uses print'],
      correctIndex: 1,
      explanation: 'Predicate functions return True/False'
    },
    {
      question: 'Is "if is_valid == False:" good?',
      options: ['Yes', 'No, use "if not is_valid:"', 'Same thing', 'Always best'],
      correctIndex: 1,
      explanation: 'Use "if not is_valid:" instead'
    },
    {
      question: 'What does all([True, True, False]) return?',
      options: ['True', 'False', '[True, True, False]', 'Error'],
      correctIndex: 1,
      explanation: 'all() returns True only if every element is truthy; False makes it return False'
    },
    {
      question: 'What does any([False, False, True]) return?',
      options: ['False', 'True', '[True]', 'Error'],
      correctIndex: 1,
      explanation: 'any() returns True if at least one element is truthy'
    },
    {
      question: 'What is the Pythonic way to check if x is None?',
      options: ['if x == None:', 'if x is None:', 'if not x:', 'if x == False:'],
      correctIndex: 1,
      explanation: 'Use "is None" for identity comparison with None, not =='
    },
    {
      question: 'Which naming prefix indicates a boolean variable?',
      options: ['get_', 'set_', 'has_', 'do_'],
      correctIndex: 2,
      explanation: 'Prefixes like is_, has_, can_ signal boolean values'
    },
    {
      question: 'What does any([]) return?',
      options: ['True', 'False', 'None', 'Error'],
      correctIndex: 1,
      explanation: 'any() on an empty iterable returns False (no truthy elements)'
    },
    {
      question: 'What does all([]) return?',
      options: ['False', 'True', 'None', 'Error'],
      correctIndex: 1,
      explanation: 'all() on an empty iterable returns True (vacuous truth)'
    },
    {
      question: 'How to simplify: if len(my_list) > 0:?',
      options: ['if len(my_list):', 'if my_list:', 'if my_list > 0:', 'Cannot simplify'],
      correctIndex: 1,
      explanation: 'Non-empty lists are truthy, so "if my_list:" is Pythonic'
    },
    {
      question: 'Which is the Pythonic check for an empty string?',
      options: ['if s == "":', 'if len(s) == 0:', 'if not s:', 'if s is None:'],
      correctIndex: 2,
      explanation: '"if not s:" is Pythonic since empty strings are falsy'
    },
    {
      question: 'What does any(x > 0 for x in [-1, -2, 3]) return?',
      options: ['False', 'True', '3', 'Error'],
      correctIndex: 1,
      explanation: 'any() with a generator returns True because 3 > 0 is True'
    },
    {
      question: 'Is "can_edit" a good boolean variable name?',
      options: ['No, too vague', 'Yes, uses a boolean prefix', 'No, should be "edit_flag"', 'Only for functions'],
      correctIndex: 1,
      explanation: 'can_ is a clear boolean prefix indicating capability'
    },
  ],

  // ============================================
  // MODULE 8: File Input/Output
  // ============================================

  'lesson-10-1': [
    {
      question: 'What function opens files?',
      options: ['file()', 'open()', 'read()', 'load()'],
      correctIndex: 1,
      explanation: 'Use open() to open files'
    },
    {
      question: 'What does "r" mode mean?',
      options: ['Write', 'Read', 'Append', 'Execute'],
      correctIndex: 1,
      explanation: '"r" opens file for reading'
    },
    {
      question: 'What does "w" mode do?',
      options: ['Reads file', 'Appends to file', 'Overwrites file', 'Copies file'],
      correctIndex: 2,
      explanation: '"w" creates new or overwrites existing file'
    },
    {
      question: 'What statement auto-closes files?',
      options: ['try', 'with', 'for', 'if'],
      correctIndex: 1,
      explanation: 'with statement automatically closes files'
    },
    {
      question: 'How check if file is closed?',
      options: ['file.closed', 'file.is_closed()', 'closed(file)', 'file.status()'],
      correctIndex: 0,
      explanation: 'file.closed attribute is True when closed'
    },
    {
      question: 'What does "a" mode do?',
      options: ['Reads file', 'Overwrites file', 'Appends to end', 'Deletes file'],
      correctIndex: 2,
      explanation: '"a" appends to end of file'
    },
    {
      question: 'What does "x" mode do?',
      options: ['Reads', 'Overwrites', 'Creates if doesn\'t exist, fails if exists', 'Appends'],
      correctIndex: 2,
      explanation: '"x" for exclusive creation'
    },
    {
      question: 'Why close files?',
      options: ['Not necessary', 'Frees resources', 'For decoration', 'Only on Windows'],
      correctIndex: 1,
      explanation: 'Closing frees system resources'
    },
    {
      question: 'What does file.close() do?',
      options: ['Deletes file', 'Saves file', 'Closes file handle', 'Reads file'],
      correctIndex: 2,
      explanation: 'Closes the file handle/connection'
    },
    {
      question: 'Is with statement preferred?',
      options: ['No', 'Only sometimes', 'Yes', 'Deprecated'],
      correctIndex: 2,
      explanation: 'with automatically handles closing'
    },
    {
      question: 'What does "rb" mode do?',
      options: ['Read backwards', 'Read binary', 'Read buffered', 'Read backup'],
      correctIndex: 1,
      explanation: '"rb" opens a file in binary read mode for non-text files'
    },
    {
      question: 'What is the default mode for open()?',
      options: ['"w"', '"a"', '"r"', '"x"'],
      correctIndex: 2,
      explanation: 'If no mode is specified, open() defaults to "r" (read)'
    },
    {
      question: 'What error occurs opening a non-existent file in "r" mode?',
      options: ['ValueError', 'IOError', 'FileNotFoundError', 'TypeError'],
      correctIndex: 2,
      explanation: 'FileNotFoundError is raised when opening a missing file for reading'
    },
    {
      question: 'What does open() return?',
      options: ['A string', 'A file object', 'A list', 'A boolean'],
      correctIndex: 1,
      explanation: 'open() returns a file object used to read or write'
    },
    {
      question: 'Which mode opens for writing in binary?',
      options: ['"bw"', '"wb"', '"write-binary"', '"b"'],
      correctIndex: 1,
      explanation: '"wb" opens a file for writing in binary mode'
    },
    {
      question: 'What happens if "x" mode is used on an existing file?',
      options: ['Overwrites it', 'Appends to it', 'Raises FileExistsError', 'Ignores it'],
      correctIndex: 2,
      explanation: '"x" mode raises FileExistsError if the file already exists'
    },
    {
      question: 'How do you open a file for both reading and writing?',
      options: ['"rw"', '"r+"', '"read_write"', '"rw+"'],
      correctIndex: 1,
      explanation: '"r+" mode opens a file for both reading and writing'
    },
    {
      question: 'What is a benefit of using the with statement for files?',
      options: ['Faster reading', 'File is closed even if an exception occurs', 'Enables binary mode', 'Locks the file'],
      correctIndex: 1,
      explanation: 'The with statement guarantees the file is closed, even if an error occurs'
    },
    {
      question: 'Which argument of open() sets the character encoding?',
      options: ['mode', 'encoding', 'charset', 'format'],
      correctIndex: 1,
      explanation: 'The encoding parameter (e.g., encoding="utf-8") sets the character encoding'
    },
    {
      question: 'What does "a+" mode allow?',
      options: ['Read only', 'Write only', 'Append and read', 'Create only'],
      correctIndex: 2,
      explanation: '"a+" opens a file for both appending and reading'
    },
  ],

  'lesson-10-2': [
    {
      question: 'What does file.read() return?',
      options: ['List of lines', 'First line', 'Entire file as string', 'Nothing'],
      correctIndex: 2,
      explanation: 'read() returns entire file content'
    },
    {
      question: 'What does file.readline() return?',
      options: ['All lines', 'One line', 'Nothing', 'List'],
      correctIndex: 1,
      explanation: 'readline() reads one line at a time'
    },
    {
      question: 'What does file.readlines() return?',
      options: ['String', 'List of lines', 'One line', 'Nothing'],
      correctIndex: 1,
      explanation: 'readlines() returns list of all lines'
    },
    {
      question: 'How iterate over file lines?',
      options: ['for line in file:', 'for line in file.lines():', 'file.iterate():', 'while file:'],
      correctIndex: 0,
      explanation: 'for line in file: iterates lines'
    },
    {
      question: 'Do lines from file include \\n?',
      options: ['No', 'Yes', 'Sometimes', 'Depends on mode'],
      correctIndex: 1,
      explanation: 'Lines include newline character'
    },
    {
      question: 'How remove \\n from lines?',
      options: ['line.remove()', 'line.strip()', 'line.clean()', 'line[:-1]'],
      correctIndex: 1,
      explanation: 'strip() removes whitespace including \\n'
    },
    {
      question: 'What does file.read(10) do?',
      options: ['Reads 10 lines', 'Reads 10 characters', 'Skips 10 bytes', 'Error'],
      correctIndex: 1,
      explanation: 'read(n) reads n characters'
    },
    {
      question: 'Is iterating over file memory efficient?',
      options: ['No', 'Only for small files', 'Yes', 'Depends on mode'],
      correctIndex: 2,
      explanation: 'Iterating reads one line at a time'
    },
    {
      question: 'Can you read() after reaching end?',
      options: ['Yes', 'Returns empty string', 'Error', 'Reads again'],
      correctIndex: 1,
      explanation: 'Returns empty string, need seek(0) to rewind'
    },
    {
      question: 'What\'s most Pythonic way to read?',
      options: ['file.read()', 'file.readlines()', 'for line in file:', 'while True:'],
      correctIndex: 2,
      explanation: 'Iterating over file is most Pythonic'
    },
    {
      question: 'What does file.seek(0) do?',
      options: ['Closes the file', 'Moves cursor to beginning', 'Reads first byte', 'Deletes content'],
      correctIndex: 1,
      explanation: 'seek(0) moves the file cursor back to the start of the file'
    },
    {
      question: 'What does file.tell() return?',
      options: ['File size', 'Current cursor position', 'Number of lines', 'File name'],
      correctIndex: 1,
      explanation: 'tell() returns the current position of the file cursor'
    },
    {
      question: 'What happens when readline() reaches end of file?',
      options: ['Raises an error', 'Returns None', 'Returns empty string', 'Restarts from beginning'],
      correctIndex: 2,
      explanation: 'readline() returns an empty string when there are no more lines'
    },
    {
      question: 'Which method reads all lines into a list?',
      options: ['read()', 'readline()', 'readlines()', 'list()'],
      correctIndex: 2,
      explanation: 'readlines() reads all lines and returns them as a list'
    },
    {
      question: 'What does read().splitlines() return?',
      options: ['A string', 'A list of lines without newlines', 'A list of words', 'A dictionary'],
      correctIndex: 1,
      explanation: 'splitlines() splits text into lines and removes newline characters'
    },
    {
      question: 'Why is readlines() less memory efficient for large files?',
      options: ['It is slower', 'It loads the entire file into memory', 'It creates duplicates', 'It locks the file'],
      correctIndex: 1,
      explanation: 'readlines() loads all lines into a list in memory at once'
    },
    {
      question: 'What does file.read().count("word") do?',
      options: ['Counts lines', 'Counts occurrences of "word"', 'Returns file size', 'Raises an error'],
      correctIndex: 1,
      explanation: 'count() on a string counts how many times a substring appears'
    },
    {
      question: 'What does rstrip() do when reading lines?',
      options: ['Removes left whitespace', 'Removes right whitespace and newlines', 'Removes all spaces', 'Adds newlines'],
      correctIndex: 1,
      explanation: 'rstrip() removes trailing whitespace including newline characters'
    },
    {
      question: 'Can you use seek() on a file opened in text mode?',
      options: ['No, only binary', 'Yes, but only seek(0)', 'Yes, any position', 'Only with "r+" mode'],
      correctIndex: 2,
      explanation: 'seek() works in text mode, though non-zero offsets should use values from tell()'
    },
    {
      question: 'What does enumerate() add when iterating over file lines?',
      options: ['File size', 'Line numbers', 'Timestamps', 'Line lengths'],
      correctIndex: 1,
      explanation: 'enumerate() provides an index counter alongside each line'
    },
  ],

  'lesson-10-3': [
    {
      question: 'What method writes to file?',
      options: ['file.write()', 'file.save()', 'file.put()', 'file.append()'],
      correctIndex: 0,
      explanation: 'Use write() to write to file'
    },
    {
      question: 'Does write() add \\n automatically?',
      options: ['Yes', 'No', 'Sometimes', 'In append mode only'],
      correctIndex: 1,
      explanation: 'Must add \\n manually for new lines'
    },
    {
      question: 'What does write() return?',
      options: ['Nothing', 'Number of characters written', 'True/False', 'The string'],
      correctIndex: 1,
      explanation: 'Returns number of characters written'
    },
    {
      question: 'Does "w" mode create file if missing?',
      options: ['No, error', 'Yes', 'Only in Windows', 'Only with permission'],
      correctIndex: 1,
      explanation: '"w" creates file if it doesn\'t exist'
    },
    {
      question: 'What happens with "w" on existing file?',
      options: ['Appends', 'Error', 'Overwrites', 'Creates copy'],
      correctIndex: 2,
      explanation: '"w" mode overwrites existing file'
    },
    {
      question: 'What does writelines() do?',
      options: ['Writes one line', 'Writes list of strings', 'Adds line numbers', 'Writes paragraphs'],
      correctIndex: 1,
      explanation: 'writelines() writes list of strings'
    },
    {
      question: 'Does writelines() add \\n?',
      options: ['Yes', 'No', 'Sometimes', 'Between items only'],
      correctIndex: 1,
      explanation: 'Must include \\n in strings manually'
    },
    {
      question: 'Is "a" mode safer than "w"?',
      options: ['No', 'Same', 'Yes', 'Depends'],
      correctIndex: 2,
      explanation: '"a" doesn\'t overwrite existing content'
    },
    {
      question: 'Can you write numbers directly?',
      options: ['Yes', 'No, convert to string first', 'Only integers', 'Only floats'],
      correctIndex: 1,
      explanation: 'Must convert numbers to strings'
    },
    {
      question: 'What\'s safer before overwriting?',
      options: ['Just overwrite', 'Check if file exists', 'Doesn\'t matter', 'Use append mode'],
      correctIndex: 1,
      explanation: 'Check existence to avoid losing data'
    },
    {
      question: 'How can you use print() to write to a file?',
      options: ['print(text, file=f)', 'print(text, to=f)', 'print(text, output=f)', 'print(text, dest=f)'],
      correctIndex: 0,
      explanation: 'The file parameter of print() redirects output to a file object'
    },
    {
      question: 'What advantage does print(file=f) have over write()?',
      options: ['It is faster', 'It automatically adds a newline', 'It converts to binary', 'It locks the file'],
      correctIndex: 1,
      explanation: 'print() adds a newline by default, unlike write()'
    },
    {
      question: 'What does file.truncate() do?',
      options: ['Deletes the file', 'Resizes file to current position', 'Clears the buffer', 'Closes the file'],
      correctIndex: 1,
      explanation: 'truncate() resizes the file to the current cursor position'
    },
    {
      question: 'What must strings in writelines() include for separate lines?',
      options: ['Commas', 'Newline characters', 'Semicolons', 'Nothing special'],
      correctIndex: 1,
      explanation: 'writelines() does not add separators, so strings must include \\n'
    },
    {
      question: 'What does file.flush() do?',
      options: ['Deletes file content', 'Writes buffered data to disk', 'Closes the file', 'Resets the cursor'],
      correctIndex: 1,
      explanation: 'flush() forces buffered data to be written to the file immediately'
    },
    {
      question: 'Can write() accept a list as an argument?',
      options: ['Yes', 'No, only strings', 'Only lists of numbers', 'Only tuples'],
      correctIndex: 1,
      explanation: 'write() only accepts strings; use writelines() for lists or convert first'
    },
    {
      question: 'What mode should you use to add data without erasing existing content?',
      options: ['"w"', '"r"', '"a"', '"x"'],
      correctIndex: 2,
      explanation: '"a" (append) mode adds data to the end without erasing existing content'
    },
    {
      question: 'How do you write formatted data like f-strings to a file?',
      options: ['file.format()', 'file.write(f"text {var}")', 'file.fwrite()', 'format(file)'],
      correctIndex: 1,
      explanation: 'Pass an f-string directly to write() for formatted output'
    },
    {
      question: 'What does "w" mode do to a file\'s existing content?',
      options: ['Keeps it intact', 'Appends after it', 'Erases it completely', 'Backs it up first'],
      correctIndex: 2,
      explanation: '"w" mode truncates the file, erasing all existing content before writing'
    },
    {
      question: 'What happens if you call write() on a file opened in "r" mode?',
      options: ['Writes normally', 'Raises io.UnsupportedOperation', 'Silently fails', 'Appends instead'],
      correctIndex: 1,
      explanation: 'Writing to a read-only file raises an UnsupportedOperation error'
    },
  ],

  'lesson-10-4': [
    {
      question: 'What module works with paths?',
      options: ['path', 'os', 'file', 'sys'],
      correctIndex: 1,
      explanation: 'os module has path functions'
    },
    {
      question: 'How get current directory?',
      options: ['os.getcwd()', 'os.current()', 'os.dir()', 'os.pwd()'],
      correctIndex: 0,
      explanation: 'os.getcwd() returns current working directory'
    },
    {
      question: 'How check if file exists?',
      options: ['os.exists()', 'os.path.exists()', 'file.exists()', 'exists()'],
      correctIndex: 1,
      explanation: 'Use os.path.exists(filename)'
    },
    {
      question: 'How join path parts safely?',
      options: ['path + "/" + file', 'os.path.join()', 'path.join()', 'combine()'],
      correctIndex: 1,
      explanation: 'os.path.join() handles separators'
    },
    {
      question: 'What\'s modern path module?',
      options: ['os', 'path', 'pathlib', 'file'],
      correctIndex: 2,
      explanation: 'pathlib is modern object-oriented approach'
    },
    {
      question: 'How create Path object?',
      options: ['path()', 'Path()', 'new Path()', 'makePath()'],
      correctIndex: 1,
      explanation: 'Path("filename") from pathlib'
    },
    {
      question: 'How check if path is file?',
      options: ['os.path.isfile()', 'os.is_file()', 'file.check()', 'os.filetype()'],
      correctIndex: 0,
      explanation: 'Use os.path.isfile(path)'
    },
    {
      question: 'How check if path is directory?',
      options: ['os.path.isdir()', 'os.is_directory()', 'path.type()', 'os.checkdir()'],
      correctIndex: 0,
      explanation: 'Use os.path.isdir(path)'
    },
    {
      question: 'What does ".." mean in paths?',
      options: ['Current directory', 'Parent directory', 'Root directory', 'Error'],
      correctIndex: 1,
      explanation: '.. navigates to parent directory'
    },
    {
      question: 'What does "." mean in paths?',
      options: ['Parent directory', 'Current directory', 'Root directory', 'File extension'],
      correctIndex: 1,
      explanation: '. represents current directory'
    },
    {
      question: 'What does Path.stem return?',
      options: ['File extension', 'File name without extension', 'Parent directory', 'Full path'],
      correctIndex: 1,
      explanation: 'Path.stem returns the file name without its extension (e.g., "data" from "data.csv")'
    },
    {
      question: 'What does Path.suffix return?',
      options: ['File name', 'File extension including dot', 'Directory name', 'Drive letter'],
      correctIndex: 1,
      explanation: 'Path.suffix returns the file extension including the dot (e.g., ".csv")'
    },
    {
      question: 'What does Path.parent return?',
      options: ['The root directory', 'The parent directory as a Path', 'The file name', 'The home directory'],
      correctIndex: 1,
      explanation: 'Path.parent returns the directory containing the file as a Path object'
    },
    {
      question: 'What does Path.name return?',
      options: ['Directory name only', 'Full path', 'File name with extension', 'File name without extension'],
      correctIndex: 2,
      explanation: 'Path.name returns the final component of the path (file name with extension)'
    },
    {
      question: 'How do you create a directory with pathlib?',
      options: ['Path.create()', 'Path.mkdir()', 'Path.makedir()', 'Path.new_dir()'],
      correctIndex: 1,
      explanation: 'Path.mkdir() creates a new directory at the specified path'
    },
    {
      question: 'What does Path.mkdir(parents=True) do?',
      options: ['Creates only the leaf directory', 'Creates all missing parent directories', 'Raises an error', 'Deletes parent directories'],
      correctIndex: 1,
      explanation: 'parents=True creates any missing intermediate directories in the path'
    },
    {
      question: 'How do you combine paths with pathlib?',
      options: ['Path.join()', 'Path + Path', 'Path / "subdir"', 'Path.combine()'],
      correctIndex: 2,
      explanation: 'The / operator joins Path objects and strings together'
    },
    {
      question: 'What does os.path.basename() return?',
      options: ['Directory name', 'File name from path', 'File extension', 'Drive letter'],
      correctIndex: 1,
      explanation: 'os.path.basename() returns the final component (file name) of a path'
    },
    {
      question: 'What does os.path.dirname() return?',
      options: ['File name', 'Directory portion of path', 'Current directory', 'Home directory'],
      correctIndex: 1,
      explanation: 'os.path.dirname() returns the directory part of a path'
    },
    {
      question: 'What does Path.exists() return?',
      options: ['The file content', 'A Path object', 'True or False', 'The file size'],
      correctIndex: 2,
      explanation: 'Path.exists() returns True if the path points to an existing file or directory'
    },
  ],

  'lesson-10-5': [
    {
      question: 'What does len(file.readlines()) give?',
      options: ['File size', 'Number of lines', 'Number of words', 'Number of characters'],
      correctIndex: 1,
      explanation: 'readlines() returns list of lines'
    },
    {
      question: 'How count words in file?',
      options: ['len(content)', 'len(content.split())', 'content.words()', 'count(content)'],
      correctIndex: 1,
      explanation: 'Split content and count list length'
    },
    {
      question: 'What exception for missing file?',
      options: ['FileError', 'FileNotFoundError', 'MissingFileError', 'IOError'],
      correctIndex: 1,
      explanation: 'FileNotFoundError when file doesn\'t exist'
    },
    {
      question: 'How handle file not found?',
      options: ['try/except FileNotFoundError', 'if file.exists()', 'Just open it', 'Check first'],
      correctIndex: 0,
      explanation: 'Use try/except to catch FileNotFoundError'
    },
    {
      question: 'Should you process large files line by line?',
      options: ['No', 'Only sometimes', 'Yes', 'Use read() instead'],
      correctIndex: 2,
      explanation: 'Line by line is memory efficient for large files'
    },
    {
      question: 'What encoding is safest for text files?',
      options: ['ascii', 'utf-8', 'latin-1', 'Default'],
      correctIndex: 1,
      explanation: 'utf-8 handles international characters'
    },
    {
      question: 'How specify encoding when opening?',
      options: ['open(f, encoding="utf-8")', 'open(f, "utf-8")', 'open(f).encode()', 'set_encoding()'],
      correctIndex: 0,
      explanation: 'Pass encoding parameter to open()'
    },
    {
      question: 'Can you read and write same file?',
      options: ['Yes, easily', 'Yes, with "r+"', 'No', 'Only in append mode'],
      correctIndex: 1,
      explanation: 'Use "r+" mode for both read and write'
    },
    {
      question: 'What\'s best for log files?',
      options: ['Read mode', 'Write mode', 'Append mode', 'Execute mode'],
      correctIndex: 2,
      explanation: 'Append mode adds to end without overwriting'
    },
    {
      question: 'How merge multiple files?',
      options: ['Can\'t do it', 'Read each, write to output', 'Use merge()', 'Use combine()'],
      correctIndex: 1,
      explanation: 'Read each file and write contents to new file'
    },
    {
      question: 'What does the errors parameter in open() control?',
      options: ['File permissions', 'How encoding errors are handled', 'Error logging', 'Exception types'],
      correctIndex: 1,
      explanation: 'The errors parameter (e.g., errors="ignore") controls how encoding errors are handled'
    },
    {
      question: 'What is PermissionError raised for?',
      options: ['Wrong encoding', 'File not found', 'Insufficient file access permissions', 'Invalid mode'],
      correctIndex: 2,
      explanation: 'PermissionError occurs when you lack read or write permissions for a file'
    },
    {
      question: 'Why should you specify encoding="utf-8" explicitly?',
      options: ['It is faster', 'Default encoding varies by platform', 'It enables binary mode', 'It compresses the file'],
      correctIndex: 1,
      explanation: 'The default encoding differs across operating systems, so explicit utf-8 ensures consistency'
    },
    {
      question: 'What is a context manager in Python?',
      options: ['A debugger', 'An object that manages setup and teardown via with', 'A type of loop', 'A package manager'],
      correctIndex: 1,
      explanation: 'Context managers handle resource setup and cleanup using the with statement'
    },
    {
      question: 'How do you read a large file without loading it all into memory?',
      options: ['Use read()', 'Use readlines()', 'Iterate line by line with a for loop', 'Use load()'],
      correctIndex: 2,
      explanation: 'Iterating with for line in file: reads one line at a time, saving memory'
    },
    {
      question: 'What does the finally block ensure when working with files?',
      options: ['File is created', 'Cleanup code always runs', 'Errors are suppressed', 'File is backed up'],
      correctIndex: 1,
      explanation: 'finally always executes, making it useful for cleanup like closing files'
    },
    {
      question: 'What is a UnicodeDecodeError?',
      options: ['File not found', 'Wrong file mode', 'Cannot decode bytes with the specified encoding', 'Permission denied'],
      correctIndex: 2,
      explanation: 'UnicodeDecodeError occurs when file bytes cannot be decoded with the given encoding'
    },
    {
      question: 'What is the advantage of processing files in chunks?',
      options: ['Simpler code', 'Handles files larger than available memory', 'Faster for small files', 'Enables concurrent access'],
      correctIndex: 1,
      explanation: 'Reading in chunks allows processing files that are too large to fit in memory'
    },
    {
      question: 'Can you nest multiple with statements for files?',
      options: ['No', 'Yes, or use comma-separated syntax', 'Only two files', 'Only in Python 3.10+'],
      correctIndex: 1,
      explanation: 'You can nest with blocks or use with open(a) as f1, open(b) as f2:'
    },
    {
      question: 'What is a best practice when writing temporary files?',
      options: ['Use "w" mode directly', 'Use the tempfile module', 'Write to the root directory', 'Skip error handling'],
      correctIndex: 1,
      explanation: 'The tempfile module creates secure temporary files that are cleaned up automatically'
    },
  ],

  // ============================================
  // MODULE 9: Error Handling Basics
  // ============================================

  'lesson-9-1': [
    {
      question: 'What are syntax errors?',
      options: ['Runtime errors', 'Grammar mistakes', 'Logic errors', 'Type errors'],
      correctIndex: 1,
      explanation: 'Syntax errors break Python\'s grammar rules'
    },
    {
      question: 'What\'s a ValueError?',
      options: ['Wrong type', 'Invalid value', 'Missing variable', 'Division error'],
      correctIndex: 1,
      explanation: 'ValueError when value is wrong for operation'
    },
    {
      question: 'What causes TypeError?',
      options: ['Wrong value', 'Wrong type', 'Missing file', 'Division by zero'],
      correctIndex: 1,
      explanation: 'TypeError when operation invalid for type'
    },
    {
      question: 'What\'s an IndexError?',
      options: ['String error', 'List index out of range', 'Dictionary error', 'Math error'],
      correctIndex: 1,
      explanation: 'IndexError when accessing invalid list index'
    },
    {
      question: 'What\'s a KeyError?',
      options: ['List error', 'String error', 'Dictionary key doesn\'t exist', 'Type error'],
      correctIndex: 2,
      explanation: 'KeyError when dictionary key not found'
    },
    {
      question: 'What causes ZeroDivisionError?',
      options: ['Dividing zero', 'Dividing by zero', 'Multiplying by zero', 'Subtracting zero'],
      correctIndex: 1,
      explanation: 'ZeroDivisionError when dividing by zero'
    },
    {
      question: 'What\'s a NameError?',
      options: ['Wrong variable name', 'Variable not defined', 'String error', 'Import error'],
      correctIndex: 1,
      explanation: 'NameError when using undefined variable'
    },
    {
      question: 'What does traceback show?',
      options: ['Variable values', 'Sequence of calls leading to error', 'Solution', 'File contents'],
      correctIndex: 1,
      explanation: 'Traceback shows call stack leading to error'
    },
    {
      question: 'Can you convert "hello" to int?',
      options: ['Yes', 'No, ValueError', 'Yes, returns 0', 'Yes, returns None'],
      correctIndex: 1,
      explanation: 'int("hello") raises ValueError'
    },
    {
      question: 'Are logic errors caught by Python?',
      options: ['Yes, always', 'Yes, sometimes', 'No', 'Only in debug mode'],
      correctIndex: 2,
      explanation: 'Logic errors produce wrong results without error messages'
    },
    {
      question: 'What does a traceback display first?',
      options: ['The error type', 'The most recent call', 'The oldest call in the stack', 'The variable values'],
      correctIndex: 2,
      explanation: 'Tracebacks show the call stack starting from the oldest call at the top to the most recent at the bottom'
    },
    {
      question: 'Which error occurs when you misspell a variable name?',
      options: ['SyntaxError', 'TypeError', 'NameError', 'ValueError'],
      correctIndex: 2,
      explanation: 'NameError occurs when Python encounters a name that has not been defined'
    },
    {
      question: 'What does int("3.14") raise?',
      options: ['TypeError', 'SyntaxError', 'No error', 'ValueError'],
      correctIndex: 3,
      explanation: 'int() cannot convert a string with a decimal point directly, raising a ValueError'
    },
    {
      question: 'Which line of a traceback shows the actual error type and message?',
      options: ['The first line', 'The middle line', 'The last line', 'Every line'],
      correctIndex: 2,
      explanation: 'The last line of a traceback shows the exception type and its message'
    },
    {
      question: 'What error does "5" + 5 produce?',
      options: ['ValueError', 'SyntaxError', 'TypeError', 'NameError'],
      correctIndex: 2,
      explanation: 'You cannot add a string and an integer, so Python raises a TypeError'
    },
    {
      question: 'What happens when you access index 10 of a 3-element list?',
      options: ['Returns None', 'Returns 0', 'IndexError', 'KeyError'],
      correctIndex: 2,
      explanation: 'Accessing an index beyond the list length raises an IndexError'
    },
    {
      question: 'Which error is raised by a missing colon after an if statement?',
      options: ['NameError', 'SyntaxError', 'IndentationError', 'TypeError'],
      correctIndex: 1,
      explanation: 'A missing colon is a grammar violation that raises a SyntaxError'
    },
    {
      question: 'What is the difference between SyntaxError and other errors?',
      options: ['SyntaxError is caught before the program runs', 'SyntaxError only happens in loops', 'SyntaxError can be caught with try/except', 'There is no difference'],
      correctIndex: 0,
      explanation: 'SyntaxError is detected during parsing, before any code executes'
    },
    {
      question: 'What does 10 % 0 raise?',
      options: ['ValueError', 'TypeError', 'Returns 0', 'ZeroDivisionError'],
      correctIndex: 3,
      explanation: 'The modulo operator with zero also raises ZeroDivisionError, just like division'
    },
    {
      question: 'Which error occurs when you call len(42)?',
      options: ['ValueError', 'TypeError', 'NameError', 'AttributeError'],
      correctIndex: 1,
      explanation: 'Integers do not have a length, so passing one to len() raises a TypeError'
    },
  ],

  'lesson-9-2': [
    {
      question: 'What does try block contain?',
      options: ['Error handling', 'Code that might error', 'Cleanup code', 'Variable definitions'],
      correctIndex: 1,
      explanation: 'try contains code that might raise exception'
    },
    {
      question: 'What does except block contain?',
      options: ['Risky code', 'Error handling', 'Normal code', 'Variable definitions'],
      correctIndex: 1,
      explanation: 'except runs when error occurs'
    },
    {
      question: 'Does program crash in try/except?',
      options: ['Yes, always', 'No, except handles it', 'Only for syntax errors', 'Depends on error'],
      correctIndex: 1,
      explanation: 'except prevents crash by handling error'
    },
    {
      question: 'When does except block run?',
      options: ['Always', 'Only when error in try', 'Before try', 'Never'],
      correctIndex: 1,
      explanation: 'except only runs if exception occurs'
    },
    {
      question: 'Can you have multiple except blocks?',
      options: ['No', 'Yes', 'Only two', 'Only for syntax errors'],
      correctIndex: 1,
      explanation: 'Multiple except blocks for different errors'
    },
    {
      question: 'Does try/except fix the error?',
      options: ['Yes', 'No, just handles it', 'Sometimes', 'Only for TypeError'],
      correctIndex: 1,
      explanation: 'try/except handles error, doesn\'t fix the issue'
    },
    {
      question: 'Is bare except: good practice?',
      options: ['Yes, catches everything', 'No, too broad', 'Best practice', 'Only for files'],
      correctIndex: 1,
      explanation: 'Catch specific exceptions instead'
    },
    {
      question: 'Can try/except be in loop?',
      options: ['No', 'Yes', 'Only while loops', 'Only for loops'],
      correctIndex: 1,
      explanation: 'Useful for input validation loops'
    },
    {
      question: 'Should all code be in try?',
      options: ['Yes', 'No, only risky code', 'Depends', 'Best practice'],
      correctIndex: 1,
      explanation: 'Keep try blocks small and focused'
    },
    {
      question: 'What happens after except block?',
      options: ['Program ends', 'Program crashes', 'Program continues', 'Returns to try'],
      correctIndex: 2,
      explanation: 'Program continues after except'
    },
    {
      question: 'If an error occurs on the second line of a try block, does the third line run?',
      options: ['Yes, all lines run', 'No, execution jumps to except', 'Only if the error is minor', 'It depends on the error type'],
      correctIndex: 1,
      explanation: 'When an error occurs in a try block, the remaining lines are skipped and execution jumps to the except block'
    },
    {
      question: 'What is the correct syntax for try/except?',
      options: ['try { } except { }', 'try: ... except: ...', 'try() except()', 'try[] except[]'],
      correctIndex: 1,
      explanation: 'Python uses colons and indentation: try: followed by except:'
    },
    {
      question: 'What does a bare except: catch?',
      options: ['Only ValueError', 'Only TypeError', 'All exceptions', 'No exceptions'],
      correctIndex: 2,
      explanation: 'A bare except: with no exception type catches all exceptions, which is generally discouraged'
    },
    {
      question: 'Can try/except handle errors from user input?',
      options: ['No, only code errors', 'Yes, it is a common use case', 'Only with special imports', 'Only in Python 3'],
      correctIndex: 1,
      explanation: 'try/except is commonly used to handle invalid user input gracefully'
    },
    {
      question: 'What happens if no error occurs in the try block?',
      options: ['except still runs', 'Program crashes', 'except is skipped', 'Program ends'],
      correctIndex: 2,
      explanation: 'If no exception is raised in the try block, the except block is skipped entirely'
    },
    {
      question: 'Can you nest try/except inside another try/except?',
      options: ['No, that causes a SyntaxError', 'Yes, nesting is allowed', 'Only one level deep', 'Only in functions'],
      correctIndex: 1,
      explanation: 'try/except blocks can be nested inside each other when needed'
    },
    {
      question: 'Why is bare except: considered bad practice?',
      options: ['It is slower', 'It hides bugs by catching unexpected errors', 'It does not actually work', 'Python will remove it in future versions'],
      correctIndex: 1,
      explanation: 'Bare except catches all errors including ones you did not anticipate, making bugs harder to find'
    },
    {
      question: 'What is a common pattern for validating user input with try/except?',
      options: ['Put try/except after the input', 'Use try/except inside a while loop', 'Use try without except', 'Use if/else instead'],
      correctIndex: 1,
      explanation: 'A while loop with try/except keeps asking until the user provides valid input'
    },
    {
      question: 'Does try/except catch SyntaxError during normal execution?',
      options: ['Yes, always', 'No, SyntaxError is caught before runtime', 'Only with bare except', 'Only in the main file'],
      correctIndex: 1,
      explanation: 'SyntaxError occurs during parsing before the code runs, so try/except cannot catch it in the same file'
    },
    {
      question: 'What is the purpose of error handling in programs?',
      options: ['To make code run faster', 'To prevent the program from crashing unexpectedly', 'To remove all bugs', 'To avoid writing tests'],
      correctIndex: 1,
      explanation: 'Error handling allows programs to respond gracefully to problems instead of crashing'
    },
  ],

  'lesson-9-3': [
    {
      question: 'Should you catch all exceptions?',
      options: ['Yes', 'No, be specific', 'Sometimes', 'Always best'],
      correctIndex: 1,
      explanation: 'Catch specific exceptions for better error handling'
    },
    {
      question: 'How catch specific exception?',
      options: ['except:', 'except ValueError:', 'except all:', 'except error:'],
      correctIndex: 1,
      explanation: 'except ExceptionType: catches specific error'
    },
    {
      question: 'Can you catch multiple types in one except?',
      options: ['No', 'Yes, with tuple', 'Yes, with list', 'Only two types'],
      correctIndex: 1,
      explanation: 'except (ValueError, TypeError): catches both'
    },
    {
      question: 'How get error message?',
      options: ['error.message', 'except ValueError as e:', 'error.get()', 'except e:'],
      correctIndex: 1,
      explanation: 'Use as keyword to get exception object'
    },
    {
      question: 'What does as keyword do?',
      options: ['Assigns type', 'Assigns exception to variable', 'Compares', 'Converts'],
      correctIndex: 1,
      explanation: 'as assigns exception object to variable'
    },
    {
      question: 'Should specific excepts come first?',
      options: ['No', 'Yes', 'Doesn\'t matter', 'Last is better'],
      correctIndex: 1,
      explanation: 'Specific before general exceptions'
    },
    {
      question: 'Can except block raise exceptions?',
      options: ['No', 'Yes', 'Only ValueError', 'Only TypeError'],
      correctIndex: 1,
      explanation: 'Can raise exceptions in except block'
    },
    {
      question: 'What\'s better than bare except:?',
      options: ['except Exception:', 'except all:', 'No alternative', 'except error:'],
      correctIndex: 0,
      explanation: 'except Exception: is more specific'
    },
    {
      question: 'Do you need except for try?',
      options: ['No', 'Yes', 'Only with finally', 'Only with else'],
      correctIndex: 1,
      explanation: 'try must have except, finally, or both'
    },
    {
      question: 'Can you have multiple specific excepts?',
      options: ['No', 'Yes', 'Only two', 'Only for file errors'],
      correctIndex: 1,
      explanation: 'Can have many except blocks'
    },
    {
      question: 'What is the syntax for catching two exception types in one except block?',
      options: ['except ValueError, TypeError:', 'except (ValueError, TypeError):', 'except [ValueError, TypeError]:', 'except ValueError & TypeError:'],
      correctIndex: 1,
      explanation: 'Use a tuple in parentheses: except (ValueError, TypeError):'
    },
    {
      question: 'What does "raise" do inside an except block?',
      options: ['Creates a new variable', 'Re-raises the current exception', 'Ends the program', 'Prints the error'],
      correctIndex: 1,
      explanation: 'raise with no argument re-raises the exception that was caught, allowing it to propagate'
    },
    {
      question: 'What does except Exception as e give you access to?',
      options: ['The line number only', 'The error message and exception object', 'The source code', 'The variable values'],
      correctIndex: 1,
      explanation: 'The as keyword binds the exception object to the variable e, giving access to the error message'
    },
    {
      question: 'Why should specific exceptions come before general ones?',
      options: ['It is faster', 'Python requires it alphabetically', 'A general except would catch the error first', 'It does not matter'],
      correctIndex: 2,
      explanation: 'Python checks except blocks in order, so a general one first would catch everything before specific ones get a chance'
    },
    {
      question: 'What does except Exception: catch that except: does not?',
      options: ['It catches more errors', 'They catch the same things', 'except Exception: skips SystemExit and KeyboardInterrupt', 'except Exception: only catches ValueError'],
      correctIndex: 2,
      explanation: 'except Exception: does not catch SystemExit or KeyboardInterrupt, making it safer than bare except:'
    },
    {
      question: 'How can you print the error message from a caught exception?',
      options: ['print(error)', 'print(except)', 'except ValueError as e: print(e)', 'print(ValueError)'],
      correctIndex: 2,
      explanation: 'Catch the exception with as e, then print(e) to display the error message'
    },
    {
      question: 'What happens if an exception is not caught by any except block?',
      options: ['It is silently ignored', 'The program crashes with a traceback', 'Python retries the code', 'The else block runs'],
      correctIndex: 1,
      explanation: 'An unhandled exception causes the program to crash and display a traceback'
    },
    {
      question: 'Can you raise a new exception inside an except block?',
      options: ['No, that causes a SyntaxError', 'Yes, using raise ExceptionType()', 'Only the same exception type', 'Only with finally'],
      correctIndex: 1,
      explanation: 'You can raise any exception inside an except block, including a different type than was caught'
    },
    {
      question: 'Which is the correct order for multiple except blocks?',
      options: ['General to specific', 'Specific to general', 'Alphabetical order', 'Order does not matter'],
      correctIndex: 1,
      explanation: 'Place specific exceptions first so they are matched before more general ones'
    },
    {
      question: 'What does str(e) do when e is an exception object?',
      options: ['Converts it to an integer', 'Returns the error message as a string', 'Deletes the exception', 'Re-raises the exception'],
      correctIndex: 1,
      explanation: 'str(e) converts the exception object to its string message, which is the same as what print(e) displays'
    },
  ],

  'lesson-9-4': [
    {
      question: 'When does else block run?',
      options: ['Always', 'When error occurs', 'When no error occurs', 'Never'],
      correctIndex: 2,
      explanation: 'else runs only if no exception'
    },
    {
      question: 'When does finally block run?',
      options: ['Only on error', 'Only on success', 'Always', 'Never'],
      correctIndex: 2,
      explanation: 'finally always runs'
    },
    {
      question: 'What goes in finally block?',
      options: ['Error handling', 'Normal code', 'Cleanup code', 'Variable definitions'],
      correctIndex: 2,
      explanation: 'finally for cleanup (close files, etc.)'
    },
    {
      question: 'Does finally run if error occurs?',
      options: ['No', 'Yes', 'Sometimes', 'Only with else'],
      correctIndex: 1,
      explanation: 'finally runs even when error occurs'
    },
    {
      question: 'Does finally run if no error?',
      options: ['No', 'Yes', 'Sometimes', 'Only with except'],
      correctIndex: 1,
      explanation: 'finally always runs'
    },
    {
      question: 'Order: try, except, else, finally?',
      options: ['Any order', 'Yes, this order', 'finally first', 'else before except'],
      correctIndex: 1,
      explanation: 'Must be in this specific order'
    },
    {
      question: 'Is else required?',
      options: ['Yes', 'No', 'Only with finally', 'Only with except'],
      correctIndex: 1,
      explanation: 'else is optional'
    },
    {
      question: 'Is finally required?',
      options: ['Yes', 'No', 'Only with else', 'Only with except'],
      correctIndex: 1,
      explanation: 'finally is optional'
    },
    {
      question: 'What\'s use of else block?',
      options: ['Handle errors', 'Code that only runs on success', 'Cleanup', 'Logging'],
      correctIndex: 1,
      explanation: 'else runs code only when no exception'
    },
    {
      question: 'Does finally replace file closing?',
      options: ['Yes', 'No, use with statement', 'Sometimes', 'Best practice'],
      correctIndex: 1,
      explanation: 'with statement is better for files'
    },
    {
      question: 'If an exception occurs in try, does else still run?',
      options: ['Yes, always', 'No, else only runs when there is no exception', 'Only for certain errors', 'Only if finally is present'],
      correctIndex: 1,
      explanation: 'The else block is skipped when an exception occurs; it only runs on success'
    },
    {
      question: 'Does finally run even if there is a return statement in try?',
      options: ['No, return exits immediately', 'Yes, finally runs before the return completes', 'Only in Python 3', 'Only if except is present'],
      correctIndex: 1,
      explanation: 'finally always executes, even if a return statement is encountered in the try or except block'
    },
    {
      question: 'What is a common use for the else block in try/except?',
      options: ['Closing files', 'Running code that should only execute if try succeeded', 'Handling errors', 'Defining variables'],
      correctIndex: 1,
      explanation: 'else is ideal for code that depends on the try block succeeding, like processing data that was successfully loaded'
    },
    {
      question: 'Can you have try/finally without an except block?',
      options: ['No, except is always required', 'Yes, try/finally is valid', 'Only with else', 'Only in Python 2'],
      correctIndex: 1,
      explanation: 'try/finally without except is valid and ensures cleanup runs while still letting the exception propagate'
    },
    {
      question: 'What is the correct order of all four blocks?',
      options: ['try, else, except, finally', 'try, finally, except, else', 'try, except, else, finally', 'except, try, else, finally'],
      correctIndex: 2,
      explanation: 'The correct order is: try, then except, then else, then finally'
    },
    {
      question: 'If both except and finally are present, which runs first when an error occurs?',
      options: ['finally', 'except', 'They run simultaneously', 'Neither runs'],
      correctIndex: 1,
      explanation: 'When an error occurs, except runs first to handle it, then finally runs for cleanup'
    },
    {
      question: 'What happens if an exception occurs inside the except block?',
      options: ['It is silently ignored', 'finally still runs before the new exception propagates', 'The program freezes', 'Python retries the try block'],
      correctIndex: 1,
      explanation: 'Even if an exception occurs in the except block, finally will still execute before the exception propagates'
    },
    {
      question: 'Why put code in else instead of at the end of try?',
      options: ['It runs faster in else', 'Else code is protected from accidental exception catching', 'There is no difference', 'Else supports more operations'],
      correctIndex: 1,
      explanation: 'Code in else will not have its exceptions caught by the except block, preventing accidental masking of bugs'
    },
    {
      question: 'Which block would you use to close a database connection?',
      options: ['try', 'except', 'else', 'finally'],
      correctIndex: 3,
      explanation: 'finally is ideal for cleanup tasks like closing connections because it always runs regardless of errors'
    },
    {
      question: 'Can you use else without except?',
      options: ['Yes, try/else is valid', 'No, else requires except to be present', 'Only with finally', 'Only in Python 3.10+'],
      correctIndex: 1,
      explanation: 'The else clause requires at least one except clause to be present in the try statement'
    },
  ],

  'lesson-9-5': [
    {
      question: 'What\'s first debugging step?',
      options: ['Rewrite code', 'Read error message', 'Ask for help', 'Delete code'],
      correctIndex: 1,
      explanation: 'Always read the error message first'
    },
    {
      question: 'What\'s print debugging?',
      options: ['Printing code', 'Adding print() to see values', 'Printing errors', 'Documentation'],
      correctIndex: 1,
      explanation: 'Adding print statements to track values'
    },
    {
      question: 'What\'s rubber duck debugging?',
      options: ['Using debugger tool', 'Explaining code to someone/something', 'Print debugging', 'Reading docs'],
      correctIndex: 1,
      explanation: 'Explaining code line-by-line reveals issues'
    },
    {
      question: 'Should you fix bugs immediately?',
      options: ['Always', 'After understanding problem', 'Never', 'Just rewrite'],
      correctIndex: 1,
      explanation: 'Understand before fixing'
    },
    {
      question: 'Are descriptive names helpful?',
      options: ['No', 'Yes, for debugging', 'Doesn\'t matter', 'Only for large code'],
      correctIndex: 1,
      explanation: 'Good names make debugging easier'
    },
    {
      question: 'Should you test as you code?',
      options: ['No', 'Yes', 'Only at end', 'Never'],
      correctIndex: 1,
      explanation: 'Test each function as you write'
    },
    {
      question: 'When should errors crash program?',
      options: ['Never', 'In development', 'Always', 'In production'],
      correctIndex: 1,
      explanation: 'Let bugs crash in development to see full traceback'
    },
    {
      question: 'What errors should you catch?',
      options: ['All errors', 'Expected user errors', 'None', 'Only ValueError'],
      correctIndex: 1,
      explanation: 'Catch expected errors (user input, files, etc.)'
    },
    {
      question: 'Should you validate input?',
      options: ['No', 'Yes, early', 'Only sometimes', 'At the end'],
      correctIndex: 1,
      explanation: 'Validate input early to fail fast'
    },
    {
      question: 'What\'s defensive programming?',
      options: ['Hiding errors', 'Checking assumptions', 'Avoiding errors', 'Removing try/except'],
      correctIndex: 1,
      explanation: 'Defensive programming checks assumptions and validates'
    },
    {
      question: 'What does assert do in Python?',
      options: ['Prints a message', 'Tests a condition and raises AssertionError if false', 'Catches exceptions', 'Defines a variable'],
      correctIndex: 1,
      explanation: 'assert checks a condition and raises AssertionError if it evaluates to False'
    },
    {
      question: 'Where should you add print statements when debugging?',
      options: ['At the very end of the program', 'Before and after the suspected problem area', 'Only at the start', 'In every single line'],
      correctIndex: 1,
      explanation: 'Place print statements around the area where you suspect the bug to narrow down the issue'
    },
    {
      question: 'What is the benefit of rubber duck debugging?',
      options: ['The duck fixes the code', 'Explaining forces you to think through each step', 'It runs the code faster', 'It catches syntax errors'],
      correctIndex: 1,
      explanation: 'The act of explaining your code step by step often reveals logical errors you missed'
    },
    {
      question: 'What does input validation mean?',
      options: ['Checking that user input meets expected criteria before using it', 'Asking the user to try again', 'Removing all input', 'Converting input to strings'],
      correctIndex: 0,
      explanation: 'Input validation checks that data is in the correct format and range before processing it'
    },
    {
      question: 'What should you do before changing code to fix a bug?',
      options: ['Delete the function', 'Reproduce the bug consistently', 'Rewrite the entire file', 'Add more features'],
      correctIndex: 1,
      explanation: 'Reproducing the bug ensures you understand when it occurs and can verify your fix works'
    },
    {
      question: 'Which is an example of defensive programming?',
      options: ['Checking if a list is empty before accessing its first element', 'Wrapping all code in try/except', 'Ignoring error messages', 'Using short variable names'],
      correctIndex: 0,
      explanation: 'Checking preconditions like list length before accessing elements prevents IndexError'
    },
    {
      question: 'What is a good use of assert statements?',
      options: ['Handling user input errors', 'Verifying assumptions during development', 'Replacing try/except', 'Printing output'],
      correctIndex: 1,
      explanation: 'assert is used during development to verify that conditions you expect to be true actually are'
    },
    {
      question: 'Why should you remove or comment out debugging print statements?',
      options: ['They cause errors', 'They clutter the output and slow the program', 'Python requires it', 'They change variable values'],
      correctIndex: 1,
      explanation: 'Leftover debug prints clutter output and can confuse users; remove them when done debugging'
    },
    {
      question: 'What is the "divide and conquer" debugging strategy?',
      options: ['Splitting code into two files', 'Commenting out half the code to isolate the bug', 'Using two monitors', 'Having two people debug'],
      correctIndex: 1,
      explanation: 'By commenting out sections of code, you can narrow down which part contains the bug'
    },
    {
      question: 'When should you use assert vs try/except?',
      options: ['assert for user errors, try/except for developer errors', 'assert for developer assumptions, try/except for expected runtime errors', 'They are interchangeable', 'assert is always better'],
      correctIndex: 1,
      explanation: 'assert checks developer assumptions during development, while try/except handles expected errors in production'
    },
  ],

  // ============================================
  // MODULE 10: List Comprehensions & Advanced Lists
  // ============================================

  'lesson-8-1': [
    {
      question: 'What\'s a list comprehension?',
      options: ['A type of list', 'Concise way to create lists', 'List method', 'Loop type'],
      correctIndex: 1,
      explanation: 'Compact syntax for creating lists'
    },
    {
      question: 'What\'s syntax: [x for x in range(5)]?',
      options: ['Error', 'Creates [0,1,2,3,4]', 'Creates [1,2,3,4,5]', 'Infinite loop'],
      correctIndex: 1,
      explanation: 'Creates list from range(5)'
    },
    {
      question: 'Is [x*2 for x in [1,2,3]] valid?',
      options: ['No', 'Yes, creates [2,4,6]', 'Yes, creates [1,2,3]', 'Syntax error'],
      correctIndex: 1,
      explanation: 'Multiplies each element by 2'
    },
    {
      question: 'Are list comprehensions faster?',
      options: ['No', 'Yes', 'Same speed', 'Depends'],
      correctIndex: 1,
      explanation: 'Python optimizes list comprehensions'
    },
    {
      question: 'When NOT use list comprehension?',
      options: ['Never', 'Complex logic', 'Always use them', 'For loops better'],
      correctIndex: 1,
      explanation: 'Use regular loops for complex logic'
    },
    {
      question: 'What does [n**2 for n in range(4)] create?',
      options: ['[1,2,3,4]', '[0,1,4,9]', '[0,1,2,3]', 'Error'],
      correctIndex: 1,
      explanation: 'Squares: 0²=0, 1²=1, 2²=4, 3²=9'
    },
    {
      question: 'Can you call functions in comprehension?',
      options: ['No', 'Yes', 'Only built-in', 'Only custom'],
      correctIndex: 1,
      explanation: '[name.upper() for name in names] calls method'
    },
    {
      question: 'What does [str(x) for x in [1,2,3]] create?',
      options: ['[1,2,3]', '["1","2","3"]', '[\'1\',\'2\',\'3\']', 'Error'],
      correctIndex: 1,
      explanation: 'Converts numbers to strings'
    },
    {
      question: 'Is list comprehension Pythonic?',
      options: ['No', 'Yes', 'Deprecated', 'Only for experts'],
      correctIndex: 1,
      explanation: 'Preferred Python style for simple transformations'
    },
    {
      question: 'Can you iterate over strings?',
      options: ['No', 'Yes', 'Only with list()', 'Only with split()'],
      correctIndex: 1,
      explanation: '[char for char in "abc"] creates [\'a\',\'b\',\'c\']'
    },
    {
      question: 'What does [x + 1 for x in [10, 20, 30]] produce?',
      options: ['[10, 20, 30]', '[11, 21, 31]', '[1, 2, 3]', 'Error'],
      correctIndex: 1,
      explanation: 'Each element has 1 added to it: 10+1=11, 20+1=21, 30+1=31'
    },
    {
      question: 'What does [len(w) for w in ["hi", "bye", "ok"]] create?',
      options: ['["hi", "bye", "ok"]', '[2, 3, 2]', '[3, 3, 3]', 'Error'],
      correctIndex: 1,
      explanation: 'len() returns the length of each string: 2, 3, 2'
    },
    {
      question: 'Which is equivalent to: result = []; for x in range(3): result.append(x)?',
      options: ['[x for x in range(3)]', '[range(3)]', '[append(x) for x in range(3)]', 'list(3)'],
      correctIndex: 0,
      explanation: 'List comprehension [x for x in range(3)] replaces the append loop pattern'
    },
    {
      question: 'What does [word.lower() for word in ["HELLO", "WORLD"]] produce?',
      options: ['["HELLO", "WORLD"]', '["hello", "world"]', '["Hello", "World"]', 'Error'],
      correctIndex: 1,
      explanation: '.lower() converts each string to lowercase'
    },
    {
      question: 'What does [i * i for i in range(1, 5)] create?',
      options: ['[1, 2, 3, 4]', '[1, 4, 9, 16]', '[0, 1, 4, 9]', '[2, 4, 6, 8]'],
      correctIndex: 1,
      explanation: 'range(1,5) gives 1,2,3,4 and each is squared: 1,4,9,16'
    },
    {
      question: 'Can you use a list comprehension with a dictionary?',
      options: ['No, only lists', 'Yes, you can iterate over dict keys', 'Only with dict()', 'Only in Python 3.10+'],
      correctIndex: 1,
      explanation: '[k for k in my_dict] iterates over the dictionary keys'
    },
    {
      question: 'What does [x / 2 for x in [10, 20, 30]] produce?',
      options: ['[5, 10, 15]', '[5.0, 10.0, 15.0]', '[20, 40, 60]', 'Error'],
      correctIndex: 1,
      explanation: 'Division in Python 3 returns floats: 10/2=5.0, 20/2=10.0, 30/2=15.0'
    },
    {
      question: 'What does [bool(x) for x in [0, 1, "", "hi"]] create?',
      options: ['[0, 1, 0, 1]', '[False, True, False, True]', '[True, True, True, True]', 'Error'],
      correctIndex: 1,
      explanation: '0 and empty string are falsy, 1 and "hi" are truthy'
    },
    {
      question: 'What does [s[0] for s in ["apple", "banana", "cherry"]] create?',
      options: ['["apple", "banana", "cherry"]', '["a", "b", "c"]', '["e", "a", "y"]', 'Error'],
      correctIndex: 1,
      explanation: 's[0] gets the first character of each string'
    },
    {
      question: 'What does list comprehension [x for x in []] produce?',
      options: ['None', '[]', 'Error', '[None]'],
      correctIndex: 1,
      explanation: 'Iterating over an empty list produces an empty list'
    },
  ],

  'lesson-8-2': [
    {
      question: 'How filter with list comprehension?',
      options: ['[x for x in list where x > 5]', '[x for x in list if x > 5]', '[x if x > 5 for x in list]', '[x: x > 5 for x in list]'],
      correctIndex: 1,
      explanation: 'Use if at end for filtering'
    },
    {
      question: 'What does [x for x in range(10) if x % 2 == 0] create?',
      options: ['Odd numbers', 'Even numbers', 'All numbers', 'Error'],
      correctIndex: 1,
      explanation: 'Filters for even numbers: [0,2,4,6,8]'
    },
    {
      question: 'Where does filtering if go?',
      options: ['Beginning', 'End', 'Middle', 'Anywhere'],
      correctIndex: 1,
      explanation: 'Filtering if goes at end after for'
    },
    {
      question: 'What\'s conditional expression syntax?',
      options: ['[x if condition for x in list]', '[x for x in list if condition]', '[expr if condition else expr2 for x in list]', '[if condition: x for x in list]'],
      correctIndex: 2,
      explanation: 'if-else goes before for for conditional expression'
    },
    {
      question: 'What does ["even" if x%2==0 else "odd" for x in range(3)] create?',
      options: ['[\'even\',\'odd\']', '[\'even\',\'odd\',\'even\']', '[0,1,2]', 'Error'],
      correctIndex: 1,
      explanation: 'Labels each number: 0=even, 1=odd, 2=even'
    },
    {
      question: 'Can you use and/or in comprehension?',
      options: ['No', 'Yes', 'Only and', 'Only or'],
      correctIndex: 1,
      explanation: '[x for x in range(100) if x%2==0 and x%3==0]'
    },
    {
      question: 'Does if filter or transform?',
      options: ['Filters (excludes items)', 'Transforms', 'Both', 'Neither'],
      correctIndex: 0,
      explanation: 'if at end filters out items'
    },
    {
      question: 'Does if-else filter or transform?',
      options: ['Filters', 'Transforms conditionally', 'Both', 'Neither'],
      correctIndex: 1,
      explanation: 'if-else at start transforms based on condition'
    },
    {
      question: 'What does [x for x in [1,2,3,4,5] if x > 2] create?',
      options: ['[1,2]', '[3,4,5]', '[1,2,3,4,5]', 'Error'],
      correctIndex: 1,
      explanation: 'Filters for values greater than 2'
    },
    {
      question: 'Can if-else be at end?',
      options: ['Yes', 'No, syntax error', 'Sometimes', 'Only with for'],
      correctIndex: 1,
      explanation: 'if-else must be at start (conditional expression)'
    },
    {
      question: 'What does [x for x in "hello" if x not in "aeiou"] create?',
      options: ['["hello"]', '["h", "l", "l"]', '["e", "o"]', '["h", "e", "l", "l", "o"]'],
      correctIndex: 1,
      explanation: 'Filters out vowels, keeping only consonants: h, l, l'
    },
    {
      question: 'What does [x for x in [1, None, 3, None, 5] if x is not None] create?',
      options: ['[1, 3, 5]', '[None, None]', '[1, None, 3, None, 5]', 'Error'],
      correctIndex: 0,
      explanation: 'Filters out None values, keeping 1, 3, and 5'
    },
    {
      question: 'What does [x for x in range(20) if x % 3 == 0 and x % 5 == 0] create?',
      options: ['[0, 15]', '[0, 3, 5, 6, 9, 10, 12, 15, 18]', '[3, 5, 15]', '[0, 5, 10, 15]'],
      correctIndex: 0,
      explanation: 'Only 0 and 15 are divisible by both 3 and 5 in range(20)'
    },
    {
      question: 'What does ["pass" if score >= 60 else "fail" for score in [80, 45, 60]] create?',
      options: ['["pass", "fail", "fail"]', '["pass", "fail", "pass"]', '[80, 45, 60]', 'Error'],
      correctIndex: 1,
      explanation: '80>=60 is pass, 45<60 is fail, 60>=60 is pass'
    },
    {
      question: 'What does [word for word in ["cat", "elephant", "dog"] if len(word) <= 3] create?',
      options: ['["cat", "dog"]', '["elephant"]', '["cat", "elephant", "dog"]', 'Error'],
      correctIndex: 0,
      explanation: 'Filters for words with 3 or fewer characters'
    },
    {
      question: 'What does [x for x in [True, False, True, False] if x] create?',
      options: ['[True, False, True, False]', '[True, True]', '[False, False]', '[]'],
      correctIndex: 1,
      explanation: 'if x keeps only truthy values, so only True items remain'
    },
    {
      question: 'What does [x**2 for x in range(-3, 4) if x > 0] create?',
      options: ['[1, 4, 9]', '[9, 4, 1, 0, 1, 4, 9]', '[0, 1, 4, 9]', '[-3, -2, -1]'],
      correctIndex: 0,
      explanation: 'Filters for positive numbers (1,2,3) then squares them: 1,4,9'
    },
    {
      question: 'Can you have multiple if conditions in a list comprehension?',
      options: ['No, only one if', 'Yes, using multiple if clauses', 'Only with elif', 'Only with nested comprehensions'],
      correctIndex: 1,
      explanation: '[x for x in items if cond1 if cond2] is valid and acts like "and"'
    },
    {
      question: 'What does [abs(x) if x < 0 else x for x in [-1, 2, -3, 4]] create?',
      options: ['[-1, 2, -3, 4]', '[1, 2, 3, 4]', '[-1, -3]', 'Error'],
      correctIndex: 1,
      explanation: 'Negative numbers get abs() applied, positives stay the same'
    },
    {
      question: 'What does [n for n in [1, 2, 3, 4, 5] if n % 2 != 0] create?',
      options: ['[2, 4]', '[1, 3, 5]', '[1, 2, 3, 4, 5]', '[]'],
      correctIndex: 1,
      explanation: 'Filters for odd numbers where remainder is not 0 when divided by 2'
    },
  ],

  'lesson-8-3': [
    {
      question: 'What\'s a nested list?',
      options: ['List inside list', 'List of lists', 'Both', '2D array'],
      correctIndex: 2,
      explanation: 'List containing other lists as elements'
    },
    {
      question: 'How access element in nested list?',
      options: ['list[i]', 'list[i][j]', 'list[i,j]', 'list[[i,j]]'],
      correctIndex: 1,
      explanation: 'Use double indexing: [row][column]'
    },
    {
      question: 'What does [[1,2],[3,4]][0] return?',
      options: ['1', '[1,2]', '[[1,2]]', 'Error'],
      correctIndex: 1,
      explanation: 'Returns first inner list'
    },
    {
      question: 'What does [[1,2],[3,4]][1][0] return?',
      options: ['1', '2', '3', '4'],
      correctIndex: 2,
      explanation: 'Second list [3,4], first element is 3'
    },
    {
      question: 'How create 2x2 matrix of zeros?',
      options: ['[[0]*2]*2', '[[0 for _ in range(2)]]*2', '[[0 for _ in range(2)] for _ in range(2)]', '[0,0,0,0]'],
      correctIndex: 2,
      explanation: 'Need nested comprehension to avoid reference issues'
    },
    {
      question: 'How flatten [[1,2],[3,4]]?',
      options: ['flat()', '[item for sublist in nested for item in sublist]', '[item for item in nested]', 'nested.flatten()'],
      correctIndex: 1,
      explanation: 'Nested comprehension to flatten'
    },
    {
      question: 'Which loops come first in nested comprehension?',
      options: ['Inner', 'Outer', 'Either', 'Both together'],
      correctIndex: 1,
      explanation: 'Outer loop comes last in syntax'
    },
    {
      question: 'Can nested lists have different lengths?',
      options: ['No', 'Yes', 'Only with append', 'Only 2D'],
      correctIndex: 1,
      explanation: 'Jagged arrays are allowed: [[1,2],[3,4,5]]'
    },
    {
      question: 'How iterate nested list?',
      options: ['for item in nested:', 'for row in nested: for item in row:', 'nested.each()', 'Cannot iterate'],
      correctIndex: 1,
      explanation: 'Need nested for loops'
    },
    {
      question: 'Are nested lists mutable?',
      options: ['No', 'Yes', 'Only inner', 'Only outer'],
      correctIndex: 1,
      explanation: 'Can modify elements at any level'
    },
    {
      question: 'What does len([[1,2],[3,4],[5,6]]) return?',
      options: ['6', '3', '2', 'Error'],
      correctIndex: 1,
      explanation: 'len() counts the outer elements, which are 3 inner lists'
    },
    {
      question: 'What does [[1,2],[3,4]][0][1] return?',
      options: ['1', '2', '3', '4'],
      correctIndex: 1,
      explanation: 'First list is [1,2], second element (index 1) is 2'
    },
    {
      question: 'Why is [[0]*3]*3 problematic for a matrix?',
      options: ['It creates errors', 'All rows reference the same list', 'It creates too many zeros', 'It only works in Python 2'],
      correctIndex: 1,
      explanation: 'Multiplying a list creates references, so changing one row changes all rows'
    },
    {
      question: 'How do you get the number of columns in a regular 2D list?',
      options: ['len(matrix)', 'len(matrix[0])', 'matrix.columns()', 'matrix.width()'],
      correctIndex: 1,
      explanation: 'len(matrix[0]) gives the length of the first row, which is the number of columns'
    },
    {
      question: 'What does [[i+j for j in range(2)] for i in range(2)] create?',
      options: ['[[0,1],[1,2]]', '[[0,0],[1,1]]', '[[0,1],[2,3]]', '[[1,2],[3,4]]'],
      correctIndex: 0,
      explanation: 'i=0: [0+0,0+1]=[0,1]; i=1: [1+0,1+1]=[1,2]'
    },
    {
      question: 'How do you append a new row to a 2D list?',
      options: ['matrix.add([1,2])', 'matrix.append([1,2])', 'matrix += [1,2]', 'matrix.insert([1,2])'],
      correctIndex: 1,
      explanation: '.append() adds a new inner list as a new row'
    },
    {
      question: 'What does [row[-1] for row in [[1,2,3],[4,5,6],[7,8,9]]] create?',
      options: ['[1, 4, 7]', '[3, 6, 9]', '[7, 8, 9]', '[1, 2, 3]'],
      correctIndex: 1,
      explanation: 'row[-1] gets the last element of each row: 3, 6, 9'
    },
    {
      question: 'What does sum([len(row) for row in [[1],[2,3],[4,5,6]]]) return?',
      options: ['3', '6', '9', 'Error'],
      correctIndex: 1,
      explanation: 'Row lengths are 1, 2, 3. Sum is 1+2+3=6, the total number of elements'
    },
    {
      question: 'How do you access the element in row 2, column 3 of a matrix?',
      options: ['matrix[2][3]', 'matrix[3][2]', 'matrix(2,3)', 'matrix[2,3]'],
      correctIndex: 0,
      explanation: 'Use matrix[row][col] with zero-based indexing: matrix[2][3]'
    },
    {
      question: 'What does [item for sublist in [[1],[2,3]] for item in sublist] create?',
      options: ['[[1],[2,3]]', '[1, 2, 3]', '[[1, 2, 3]]', 'Error'],
      correctIndex: 1,
      explanation: 'This flattens the nested list into a single list [1, 2, 3]'
    },
  ],

  'lesson-8-4': [
    {
      question: 'What does .sort() return?',
      options: ['Sorted list', 'None', 'Original list', 'Error'],
      correctIndex: 1,
      explanation: 'sort() modifies in place, returns None'
    },
    {
      question: 'What does sorted() return?',
      options: ['None', 'New sorted list', 'Modifies original', 'Error'],
      correctIndex: 1,
      explanation: 'sorted() returns new list, keeps original'
    },
    {
      question: 'How sort descending?',
      options: ['sort(desc)', 'sort(reverse=True)', 'sort(-1)', 'sort(down)'],
      correctIndex: 1,
      explanation: 'Use reverse=True parameter'
    },
    {
      question: 'What does .reverse() do?',
      options: ['Returns reversed', 'Reverses in place', 'Sorts reversed', 'Error'],
      correctIndex: 1,
      explanation: 'Reverses list in place'
    },
    {
      question: 'How sort by length?',
      options: ['sort(length)', 'sort(key=len)', 'sort(by=len)', 'sort(len)'],
      correctIndex: 1,
      explanation: 'Use key=len parameter'
    },
    {
      question: 'What does .count(x) return?',
      options: ['Index of x', 'Boolean', 'Number of times x appears', 'List length'],
      correctIndex: 2,
      explanation: 'Returns count of occurrences'
    },
    {
      question: 'What does .index(x) return?',
      options: ['Count of x', 'True/False', 'First index of x', 'All indices'],
      correctIndex: 2,
      explanation: 'Returns index of first occurrence'
    },
    {
      question: 'How copy a list?',
      options: ['list2 = list1', 'list2 = list1.copy()', 'list2 = copy(list1)', 'list2 = list1.clone()'],
      correctIndex: 1,
      explanation: 'Use .copy() method for shallow copy'
    },
    {
      question: 'What does list1 + list2 do?',
      options: ['Adds values', 'Concatenates lists', 'Error', 'Multiplies'],
      correctIndex: 1,
      explanation: 'Combines lists into new list'
    },
    {
      question: 'What does [1,2] * 3 create?',
      options: ['[3,6]', '[1,2,1,2,1,2]', '[1,2,3]', 'Error'],
      correctIndex: 1,
      explanation: 'Repeats list 3 times'
    },
    {
      question: 'What is the difference between .sort() and sorted()?',
      options: ['No difference', '.sort() modifies in place, sorted() returns new list', 'sorted() is faster', '.sort() only works on numbers'],
      correctIndex: 1,
      explanation: '.sort() changes the original list; sorted() creates and returns a new sorted list'
    },
    {
      question: 'What does sorted("python") return?',
      options: ['["python"]', '["h", "n", "o", "p", "t", "y"]', '"hnopty"', 'Error'],
      correctIndex: 1,
      explanation: 'sorted() on a string returns a list of characters in alphabetical order'
    },
    {
      question: 'What does [3, 1, 2].sort() return when assigned to a variable?',
      options: ['[1, 2, 3]', 'None', '[3, 1, 2]', 'Error'],
      correctIndex: 1,
      explanation: '.sort() returns None because it modifies the list in place'
    },
    {
      question: 'What does sorted(["banana", "apple", "cherry"], key=len) return?',
      options: ['["apple", "banana", "cherry"]', '["apple", "cherry", "banana"]', '["cherry", "banana", "apple"]', '["banana", "apple", "cherry"]'],
      correctIndex: 0,
      explanation: 'Sorts by string length: apple(5), banana(6), cherry(6) — stable sort preserves original order for equal lengths'
    },
    {
      question: 'What does [1, 2, 3, 2, 1].count(2) return?',
      options: ['1', '2', '3', '5'],
      correctIndex: 1,
      explanation: 'The value 2 appears twice in the list'
    },
    {
      question: 'What happens when you call .index() on a value not in the list?',
      options: ['Returns -1', 'Returns None', 'Raises ValueError', 'Returns the last index'],
      correctIndex: 2,
      explanation: '.index() raises a ValueError if the element is not found'
    },
    {
      question: 'What does sorted([5, 3, 8, 1], reverse=True) return?',
      options: ['[1, 3, 5, 8]', '[8, 5, 3, 1]', '[5, 3, 8, 1]', 'Error'],
      correctIndex: 1,
      explanation: 'reverse=True sorts in descending order: 8, 5, 3, 1'
    },
    {
      question: 'What does a = [1, 2, 3]; b = a; b.sort(reverse=True) do to a?',
      options: ['a stays [1, 2, 3]', 'a becomes [3, 2, 1]', 'a becomes None', 'Error'],
      correctIndex: 1,
      explanation: 'b = a creates a reference, not a copy, so sorting b also changes a'
    },
    {
      question: 'What does a = [1, 2, 3]; b = a.copy(); b.append(4) do to a?',
      options: ['a becomes [1, 2, 3, 4]', 'a stays [1, 2, 3]', 'a becomes [4, 1, 2, 3]', 'Error'],
      correctIndex: 1,
      explanation: '.copy() creates a new list, so modifying b does not affect a'
    },
    {
      question: 'What does [10, 20, 30].index(20) return?',
      options: ['20', '1', '2', '0'],
      correctIndex: 1,
      explanation: '.index() returns the position of the value; 20 is at index 1'
    },
  ],

  'lesson-8-5': [
    {
      question: 'What does enumerate() return?',
      options: ['List', 'Index only', '(index, value) pairs', 'Value only'],
      correctIndex: 2,
      explanation: 'enumerate adds counter to iterable'
    },
    {
      question: 'What does zip() do?',
      options: ['Compresses', 'Combines iterables', 'Sorts', 'Filters'],
      correctIndex: 1,
      explanation: 'Pairs elements from multiple iterables'
    },
    {
      question: 'How use enumerate starting at 1?',
      options: ['enumerate(list, 1)', 'enumerate(list, start=1)', 'enumerate(list, from=1)', 'Cannot start at 1'],
      correctIndex: 1,
      explanation: 'Use start parameter'
    },
    {
      question: 'What does zip([1,2], ["a","b"]) create?',
      options: ['[1,2,"a","b"]', '[(1,"a"), (2,"b")]', '{1:"a", 2:"b"}', 'Error'],
      correctIndex: 1,
      explanation: 'Creates tuples of paired elements'
    },
    {
      question: 'What if zip lists different lengths?',
      options: ['Error', 'Stops at shortest', 'Pads with None', 'Repeats shorter'],
      correctIndex: 1,
      explanation: 'zip stops at shortest iterable'
    },
    {
      question: 'How unzip pairs?',
      options: ['unzip(pairs)', 'zip(*pairs)', 'pairs.unzip()', 'Cannot unzip'],
      correctIndex: 1,
      explanation: 'Use zip with * operator'
    },
    {
      question: 'Is enumerate(list) Pythonic?',
      options: ['No', 'Yes', 'Use range(len())', 'Deprecated'],
      correctIndex: 1,
      explanation: 'More Pythonic than range(len())'
    },
    {
      question: 'Can you zip three lists?',
      options: ['No', 'Yes', 'Only two', 'Only with library'],
      correctIndex: 1,
      explanation: 'zip works with any number of iterables'
    },
    {
      question: 'How create dict from two lists?',
      options: ['dict(list1, list2)', 'dict(zip(keys, values))', 'dict(keys, values)', 'zip(keys, values).dict()'],
      correctIndex: 1,
      explanation: 'zip then convert to dict'
    },
    {
      question: 'What type does enumerate return?',
      options: ['list', 'tuple', 'enumerate object', 'generator'],
      correctIndex: 2,
      explanation: 'Returns enumerate object (iterator)'
    },
    {
      question: 'What does list(enumerate(["a", "b", "c"])) produce?',
      options: ['["a", "b", "c"]', '[(0, "a"), (1, "b"), (2, "c")]', '[("a", 0), ("b", 1), ("c", 2)]', '{"a": 0, "b": 1, "c": 2}'],
      correctIndex: 1,
      explanation: 'enumerate pairs each element with its index as (index, value) tuples'
    },
    {
      question: 'What does list(zip("abc", [1, 2, 3])) produce?',
      options: ['["a1", "b2", "c3"]', '[("a", 1), ("b", 2), ("c", 3)]', '[["a", 1], ["b", 2], ["c", 3]]', 'Error'],
      correctIndex: 1,
      explanation: 'zip pairs elements from both iterables into tuples'
    },
    {
      question: 'What does dict(zip(["x", "y"], [10, 20])) create?',
      options: ['[("x", 10), ("y", 20)]', '{"x": 10, "y": 20}', '{10: "x", 20: "y"}', 'Error'],
      correctIndex: 1,
      explanation: 'zip creates pairs, dict() converts them to key-value pairs'
    },
    {
      question: 'What does enumerate("hi", start=5) produce when converted to list?',
      options: ['[(5, "hi")]', '[(5, "h"), (6, "i")]', '[(0, "h"), (1, "i")]', 'Error'],
      correctIndex: 1,
      explanation: 'Enumerates characters starting from index 5: (5, "h"), (6, "i")'
    },
    {
      question: 'What does list(zip([1, 2, 3], [4, 5])) produce?',
      options: ['[(1, 4), (2, 5), (3, None)]', '[(1, 4), (2, 5)]', 'Error', '[(1, 4), (2, 5), (3,)]'],
      correctIndex: 1,
      explanation: 'zip stops at the shortest iterable, so (3,) is excluded'
    },
    {
      question: 'How do you unpack enumerate in a for loop?',
      options: ['for i, val in enumerate(items):', 'for (i, val) = enumerate(items):', 'for i = enumerate(items):', 'for val, i in enumerate(items):'],
      correctIndex: 0,
      explanation: 'Use for i, val in enumerate(items) to unpack index and value'
    },
    {
      question: 'What does [i for i, v in enumerate(["a", "b", "a"]) if v == "a"] create?',
      options: ['["a", "a"]', '[0, 2]', '[0, 1, 2]', 'Error'],
      correctIndex: 1,
      explanation: 'Finds indices where value is "a": positions 0 and 2'
    },
    {
      question: 'What does list(zip(*[(1, "a"), (2, "b"), (3, "c")])) produce?',
      options: ['[(1, "a"), (2, "b"), (3, "c")]', '[(1, 2, 3), ("a", "b", "c")]', '[[1, 2, 3], ["a", "b", "c"]]', 'Error'],
      correctIndex: 1,
      explanation: 'The * operator unpacks, and zip transposes the pairs into two tuples'
    },
    {
      question: 'What does {i: v for i, v in enumerate(["x", "y", "z"])} create?',
      options: ['["x", "y", "z"]', '{0: "x", 1: "y", 2: "z"}', '{"x": 0, "y": 1, "z": 2}', 'Error'],
      correctIndex: 1,
      explanation: 'Dict comprehension with enumerate creates index-to-value mapping'
    },
    {
      question: 'What does list(zip(range(3), range(3, 6), range(6, 9))) produce?',
      options: ['[(0, 3, 6), (1, 4, 7), (2, 5, 8)]', '[(0, 1, 2), (3, 4, 5), (6, 7, 8)]', '[0, 1, 2, 3, 4, 5, 6, 7, 8]', 'Error'],
      correctIndex: 0,
      explanation: 'zip with three iterables creates 3-element tuples from corresponding positions'
    },
  ],
};

// Get questions for a specific lesson
export function getQuizQuestions(lessonId: string): QuizQuestion[] {
  return quizQuestionsByLesson[lessonId] || [];
}
