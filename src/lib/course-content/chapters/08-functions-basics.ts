import { Chapter } from '../../types';

export const functionsBasicsChapter: Chapter = {
            id: "functions-basics",
            title: "Functions - Basics",
            description: "Create reusable code with functions",
            sections: [
                {
                    id: "functions-theory",
                    title: "Defining and Using Functions",
                    type: "theory",
                    content: `Functions are reusable blocks of code that let you give a name to a task and run it whenever you want. Instead of repeating the same lines again and again, you wrap them inside a function and call it by name. This makes programs cleaner, shorter, and easier to understand—almost like saving a shortcut for a repeated action.

To define a function in Python, you start with the \`def\` keyword, write a function name, add parentheses, and end the line with a colon. The code inside the function must be indented. A function runs only when it is called using its name followed by parentheses. You can give a function inputs called **parameters**, and when you call it you provide matching values called **arguments**.

A function can also send back a result using the \`return\` keyword. Returning is different from printing: \`print\` shows something on the screen, while \`return\` sends a value back to the caller so it can be stored or used in calculations. Some functions do not return anything and simply perform actions like printing, in which case Python automatically returns \`None\`.`
                },
                {
                    id: "functions-examples",
                    title: "Solved Examples",
                    type: "examples",
                    examples: [
                        {
                            code: "def greet():\n    print(\"Hello\")\ngreet()",
                            explanation: "This function has no parameters and no return value. Calling greet() runs the indented code inside it."
                        },
                        {
                            code: "def square(x):\n    return x * x\nresult = square(4)\nprint(result)",
                            explanation: "square takes one input, computes x * x, and returns the result. The returned value is stored in result."
                        },
                        {
                            code: "def add(a, b):\n    return a + b\nx = add(3, 7)\nprint(x)",
                            explanation: "This function uses two parameters. Calling add(3, 7) returns their sum."
                        }
                    ]
                },
                {
                    id: "functions-exercises",
                    title: "Practice Exercises",
                    type: "exercises",
                    exercises: [
                        { id: "func-easy-1", level: "easy", question: "Define a function greet() that prints \"Hello\" and call it once.", starterCode: "def greet():\n    # print Hello\n\n# call the function\n", hint: "Use print inside the function.", solution: "def greet():\n    print(\"Hello\")\n\ngreet()", expectedOutput: "Hello" },
                        { id: "func-easy-2", level: "easy", question: "Create a function welcome() that prints \"Welcome!\". Call it three times.", starterCode: "def welcome():\n    # print Welcome!\n\n# call three times\n", hint: "Just repeat welcome().", solution: "def welcome():\n    print(\"Welcome!\")\n\nwelcome()\nwelcome()\nwelcome()", expectedOutput: "Welcome!\nWelcome!\nWelcome!" },
                        { id: "func-easy-3", level: "easy", question: "Write a function show_number(n) that prints the value of n.", starterCode: "def show_number(n):\n    # print n\n\nshow_number(5)", hint: "Use print(n).", solution: "def show_number(n):\n    print(n)\n\nshow_number(5)", expectedOutput: "5" },
                        { id: "func-easy-4", level: "easy", question: "Define a function double(x) that returns x*2. Call it with 4 and print the returned value.", starterCode: "def double(x):\n    # return something\n\nresult = double(4)\nprint(result)", hint: "Use return x * 2.", solution: "def double(x):\n    return x * 2\n\nresult = double(4)\nprint(result)", expectedOutput: "8" },
                        { id: "func-easy-5", level: "easy", question: "Write a function say(name) that prints \"Hi\" followed by the name.", starterCode: "def say(name):\n    # print greeting\n\nsay(\"Alice\")", hint: "Use an f-string.", solution: "def say(name):\n    print(f\"Hi {name}\")\n\nsay(\"Alice\")", expectedOutput: "Hi Alice" },
                        { id: "func-medium-1", level: "medium", question: "Create a function add(a, b) that returns their sum. Call add(6, 4) and print the result.", starterCode: "def add(a, b):\n    # return something\n\nresult = add(6, 4)\nprint(result)", hint: "Return a + b.", solution: "def add(a, b):\n    return a + b\n\nresult = add(6, 4)\nprint(result)", expectedOutput: "10" },
                        { id: "func-medium-2", level: "medium", question: "Define a function shout(text) that returns the uppercase version of text. Call shout(\"hello\").", starterCode: "def shout(text):\n    # return uppercase\n\nprint(shout(\"hello\"))", hint: "Use text.upper().", solution: "def shout(text):\n    return text.upper()\n\nprint(shout(\"hello\"))", expectedOutput: "HELLO" },
                        { id: "func-medium-3", level: "medium", question: "Create two functions: multiply(a, b) that returns a*b, and demo() that calls multiply(3, 5) and prints the result.", starterCode: "def multiply(a, b):\n    # return product\n\ndef demo():\n    # call multiply and print\n\n# call demo\n", hint: "Call multiply inside demo().", solution: "def multiply(a, b):\n    return a * b\n\ndef demo():\n    print(multiply(3, 5))\n\ndemo()", expectedOutput: "15" },
                        { id: "func-medium-4", level: "medium", question: "Write a function classify(n) that returns \"Even\" if n%2==0 else \"Odd\".", starterCode: "def classify(n):\n    # return Even or Odd\n\nprint(classify(7))", hint: "Use an if inside the function.", solution: "def classify(n):\n    if n % 2 == 0:\n        return \"Even\"\n    else:\n        return \"Odd\"\n\nprint(classify(7))", expectedOutput: "Odd" },
                        { id: "func-medium-5", level: "medium", question: "Write a function repeat(text, n) that returns text repeated n times. Use the return value in a print statement.", starterCode: "def repeat(text, n):\n    # return repetition\n\nprint(repeat(\"Hi\", 3))", hint: "Use text * n.", solution: "def repeat(text, n):\n    return text * n\n\nprint(repeat(\"Hi\", 3))", expectedOutput: "HiHiHi" },
                        { id: "func-hard-1", level: "hard", question: "Define a function describe(n) that returns \"positive\", \"zero\", or \"negative\" based on n.", starterCode: "def describe(n):\n    # check conditions\n\nprint(describe(-3))", hint: "Use if/elif/else.", solution: "def describe(n):\n    if n > 0:\n        return \"positive\"\n    elif n == 0:\n        return \"zero\"\n    else:\n        return \"negative\"\n\nprint(describe(-3))", expectedOutput: "negative" },
                        { id: "func-hard-2", level: "hard", question: "Write a function count_upper(s) that loops through s and returns how many uppercase letters it contains.", starterCode: "def count_upper(s):\n    # loop through s\n    # count uppercase\n\nprint(count_upper(\"PyThOn\"))", hint: "Use .isupper() method.", solution: "def count_upper(s):\n    count = 0\n    for ch in s:\n        if ch.isupper():\n            count = count + 1\n    return count\n\nprint(count_upper(\"PyThOn\"))", expectedOutput: "3" },
                        { id: "func-hard-3", level: "hard", question: "Create a function factorial(n) that computes n! using a loop and returns the result.", starterCode: "def factorial(n):\n    # build product in a loop\n\nprint(factorial(5))", hint: "Start with result = 1 and multiply through a loop.", solution: "def factorial(n):\n    result = 1\n    i = 1\n    while i <= n:\n        result = result * i\n        i = i + 1\n    return result\n\nprint(factorial(5))", expectedOutput: "120" },
                        { id: "func-hard-4", level: "hard", question: "Debug this code: It should return the square of x but always prints None.\ndef square(x):\n    print(x*x)\n\nprint(square(5))", starterCode: "def square(x):\n    # fix to return value\n\nprint(square(5))", hint: "Printing is not returning.", solution: "def square(x):\n    return x * x\n\nprint(square(5))", expectedOutput: "25" },
                        { id: "func-hard-5", level: "hard", question: "Write two functions: is_vowel(ch) that returns True if ch is a vowel, and count_vowels(s) that uses is_vowel to count vowels in s.", starterCode: "def is_vowel(ch):\n    # return True for vowels\n\ndef count_vowels(s):\n    # loop and count\n\nprint(count_vowels(\"apple\"))", hint: "Call is_vowel inside count_vowels.", solution: "def is_vowel(ch):\n    return ch in \"aeiouAEIOU\"\n\ndef count_vowels(s):\n    count = 0\n    for ch in s:\n        if is_vowel(ch):\n            count = count + 1\n    return count\n\nprint(count_vowels(\"apple\"))", expectedOutput: "2" }
                    ]
                },
                {
                    id: "functions-basics-quiz",
                    title: "Unlock Chapter Quiz",
                    type: "quiz"
                }
            ]
        };
