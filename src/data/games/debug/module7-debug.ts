import type { DebugGame } from '../../../types/game';

export const module4DebugGame: DebugGame = {
  id: 'debug-module4',
  moduleId: 'module-4',
  title: 'Debug Detective: Boolean Logic',
  description: 'Find and fix bugs in comparisons, logical operators, and truthiness.',
  baseXP: 100,
  bonusXP: 50,
  challenges: [
    {
      id: 'module4-debug-1',
      title: 'Assignment vs Comparison',
      code: `# Check if eligible to vote
age = 18
if age = 18:
    print("You can vote!")
else:
    print("Too young to vote")`,
      bugLines: [3],
      bugDescriptions: [
        'Using assignment operator = instead of comparison operator =='
      ],
      fixes: [
        'Change to comparison: if age == 18:'
      ],
      correctCode: `# Check if eligible to vote
age = 18
if age == 18:
    print("You can vote!")
else:
    print("Too young to vote")`,
      explanation: 'In conditions, use == to compare values, not = which assigns values. This is one of the most common bugs in programming!',
      hints: [
        'Are we comparing or assigning?',
        'How many equals signs for comparison?',
        'What does a single = do?'
      ],
      difficulty: 'easy',
      concepts: ['boolean', 'comparison', 'operators', 'equality']
    },
    {
      id: 'module4-debug-2',
      title: 'Logical Operator Mistake',
      code: `# Check if number is in range 1-10
number = 5
if number >= 1 and <= 10:
    print("In range")
else:
    print("Out of range")`,
      bugLines: [3],
      bugDescriptions: [
        'Incomplete comparison - need to repeat the variable: number >= 1 and number <= 10'
      ],
      fixes: [
        'Complete both comparisons: if number >= 1 and number <= 10:'
      ],
      correctCode: `# Check if number is in range 1-10
number = 5
if number >= 1 and number <= 10:
    print("In range")
else:
    print("Out of range")`,
      explanation: 'Each comparison needs a complete expression. You cannot chain comparisons like "number >= 1 and <= 10". You must write "number >= 1 and number <= 10" or use "1 <= number <= 10".',
      hints: [
        'What is <= 10 comparing?',
        'Does the second comparison have a variable?',
        'Both sides of "and" need complete comparisons'
      ],
      difficulty: 'easy',
      concepts: ['boolean', 'logical operators', 'comparison', 'and']
    },
    {
      id: 'module4-debug-3',
      title: 'Not Operator Confusion',
      code: `# Check if NOT a weekend
day = "Monday"
is_weekend = day == "Saturday" or day == "Sunday"
if not is_weekend == True:
    print("It's a weekday")
else:
    print("It's the weekend")`,
      bugLines: [4],
      bugDescriptions: [
        'Redundant comparison - should be "if not is_weekend:" because is_weekend is already a boolean'
      ],
      fixes: [
        'Simplify to: if not is_weekend: (no need to compare to True)'
      ],
      correctCode: `# Check if NOT a weekend
day = "Monday"
is_weekend = day == "Saturday" or day == "Sunday"
if not is_weekend:
    print("It's a weekday")
else:
    print("It's the weekend")`,
      explanation: 'When a variable is already a boolean, don\'t compare it to True or False. Use "if variable:" or "if not variable:". Comparing to True is redundant and considered bad style.',
      hints: [
        'What type is is_weekend?',
        'Do you need to compare a boolean to True?',
        'Can you simplify the condition?'
      ],
      difficulty: 'medium',
      concepts: ['boolean', 'not', 'logical operators', 'style']
    },
    {
      id: 'module4-debug-4',
      title: 'Truthiness Trap',
      code: `# Check if list is empty
my_list = []
if my_list == False:
    print("List is empty")
else:
    print("List has items")`,
      bugLines: [3],
      bugDescriptions: [
        'Empty list is falsy but not equal to False - should use "if not my_list:" to check emptiness'
      ],
      fixes: [
        'Use truthiness: if not my_list: or explicitly check length: if len(my_list) == 0:'
      ],
      correctCode: `# Check if list is empty
my_list = []
if not my_list:
    print("List is empty")
else:
    print("List has items")`,
      explanation: 'Empty containers (lists, strings, dicts) are falsy but not equal to False. Use truthiness: "if not container:" instead of comparing to False. This is more Pythonic and works correctly.',
      hints: [
        'Is an empty list equal to False?',
        'What does "falsy" mean vs "equal to False"?',
        'How do you check if a container is empty in Python?'
      ],
      difficulty: 'medium',
      concepts: ['boolean', 'truthiness', 'falsy', 'comparison']
    },
    {
      id: 'module4-debug-5',
      title: 'De Morgan\'s Law Error',
      code: `# Check if neither condition is true
x = 5
y = 10
# Want: NOT (x > 10 OR y > 20)
if not x > 10 or not y > 20:
    print("Neither condition is true")
else:
    print("At least one condition is true")`,
      bugLines: [5],
      bugDescriptions: [
        'Incorrect logic - should be "not (x > 10 or y > 20)" or equivalently "not x > 10 and not y > 20" (De Morgan\'s Law)'
      ],
      fixes: [
        'Use parentheses: if not (x > 10 or y > 20): or apply De Morgan\'s: if x <= 10 and y <= 20:'
      ],
      correctCode: `# Check if neither condition is true
x = 5
y = 10
# Want: NOT (x > 10 OR y > 20)
if not (x > 10 or y > 20):
    print("Neither condition is true")
else:
    print("At least one condition is true")`,
      explanation: 'De Morgan\'s Laws: not (A or B) = (not A) and (not B), and not (A and B) = (not A) or (not B). Without parentheses, "not x > 10 or not y > 20" means something different than intended.',
      hints: [
        'What does "not x > 10 or not y > 20" actually check?',
        'Where should the parentheses go?',
        'Remember De Morgan\'s Laws: not (A or B) = ?'
      ],
      difficulty: 'hard',
      concepts: ['boolean', 'logic', 'de morgan', 'not', 'or', 'and', 'precedence']
    }
  ]
};
