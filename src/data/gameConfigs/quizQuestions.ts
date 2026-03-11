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
  ],
};

// Get questions for a specific lesson
export function getQuizQuestions(lessonId: string): QuizQuestion[] {
  return quizQuestionsByLesson[lessonId] || [];
}
