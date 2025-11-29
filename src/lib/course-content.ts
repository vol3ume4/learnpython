import { Course } from './types';

export const courseData: Course = {
    id: "python-foundations",
    title: "Python Foundations",
    description: "Master Python basics through 10% theory and 90% practice",
    chapters: [
        {
            id: "variables",
            title: "Variables",
            description: "Learn to store and manipulate data using variables",
            sections: [
                {
                    id: "variables-theory",
                    title: "Understanding Variables",
                    type: "theory",
                    content: `Variables are like small labeled boxes where your program stores information. When you create a variable, you are essentially giving a name to a piece of data so you can use it again later. This makes your code easier to read and lets you perform operations using meaningful labels instead of raw numbers or text.

In Python, variables do not need a special declaration. You simply assign a value to a name, and Python figures out the type automatically. This is called **dynamic typing**. You can also check what type of data a variable holds using the \`type()\` function. Reassigning is just assigning a new value to the same name — the old value is replaced instantly.

You can think of variables as sticky notes you place on different objects. The note (variable name) can be moved to a new object anytime, and Python updates the link automatically. This flexibility is one of the reasons Python is friendly for beginners.`
                },
                {
                    id: "variables-examples",
                    title: "Solved Examples",
                    type: "examples",
                    examples: [
                        {
                            code: "x = 10\nprint(x)",
                            explanation: "A variable named x is created and given the value 10. When printed, Python retrieves the value stored under the name x."
                        },
                        {
                            code: "name = \"Alice\"\nprint(type(name))",
                            explanation: "Here name stores a string. Using type(name) shows the data type so learners can see how Python categorizes values."
                        },
                        {
                            code: "count = 5\ncount = count + 1\nprint(count)",
                            explanation: "The variable count is reassigned to a new value derived from its earlier value. Python updates the stored value automatically."
                        }
                    ]
                },
                {
                    id: "variables-exercises",
                    title: "Practice Exercises",
                    type: "exercises",
                    exercises: [
                        // EASY
                        {
                            id: "var-easy-1",
                            level: "easy",
                            question: "Create a variable called `a` and store the number 7 in it. Then print its value.",
                            starterCode: "a = \nprint()",
                            hint: "Assign 7 to a using the = operator.",
                            solution: "a = 7\nprint(a)",
                            expectedOutput: "7"
                        },
                        {
                            id: "var-easy-2",
                            level: "easy",
                            question: "Create a variable `msg` storing the text \"Hello\" and print it.",
                            starterCode: "msg = \nprint()",
                            hint: "Use quotes for text.",
                            solution: "msg = \"Hello\"\nprint(msg)",
                            expectedOutput: "Hello"
                        },
                        {
                            id: "var-easy-3",
                            level: "easy",
                            question: "Store the number 12 in a variable `n` and print its type.",
                            starterCode: "n = \nprint(type())",
                            hint: "Use type(n) inside print.",
                            solution: "n = 12\nprint(type(n))",
                            expectedOutput: "<class 'int'>"
                        },
                        {
                            id: "var-easy-4",
                            level: "easy",
                            question: "Create a variable `price` with value 49.5 and print it.",
                            starterCode: "price = \nprint()",
                            hint: "Use a decimal number.",
                            solution: "price = 49.5\nprint(price)",
                            expectedOutput: "49.5"
                        },
                        {
                            id: "var-easy-5",
                            level: "easy",
                            question: "Create a variable `flag` storing True and print its value.",
                            starterCode: "flag = \nprint()",
                            hint: "Booleans are True or False with capital letters.",
                            solution: "flag = True\nprint(flag)",
                            expectedOutput: "True"
                        },
                        // MEDIUM
                        {
                            id: "var-medium-1",
                            level: "medium",
                            question: "Create a variable `base` storing 10, another variable `height` storing 4, and print their product.",
                            starterCode: "base = \nheight = \n# print the product",
                            hint: "Use base * height.",
                            solution: "base = 10\nheight = 4\nprint(base * height)",
                            expectedOutput: "40"
                        },
                        {
                            id: "var-medium-2",
                            level: "medium",
                            question: "Create a variable `text` storing \"Python\" and another variable `count` storing 3. Print text repeated count times.",
                            starterCode: "text = \ncount = \n# print repetition",
                            hint: "Use text * count.",
                            solution: "text = \"Python\"\ncount = 3\nprint(text * count)",
                            expectedOutput: "PythonPythonPython"
                        },
                        {
                            id: "var-medium-3",
                            level: "medium",
                            question: "Store 5 in `x`. Reassign x to x + 10 and print it.",
                            starterCode: "x = \n# reassign x\nprint()",
                            hint: "Use x = x + 10.",
                            solution: "x = 5\nx = x + 10\nprint(x)",
                            expectedOutput: "15"
                        },
                        {
                            id: "var-medium-4",
                            level: "medium",
                            question: "Create two variables `firstName` and `lastName` and print them combined with a space.",
                            starterCode: "firstName = \nlastName = \n# print combined",
                            hint: "Use firstName + \" \" + lastName.",
                            solution: "firstName = \"Ada\"\nlastName = \"Lovelace\"\nprint(firstName + \" \" + lastName)",
                            expectedOutput: "Ada Lovelace"
                        },
                        {
                            id: "var-medium-5",
                            level: "medium",
                            question: "Store 8 in `num`. Print its type. Then reassign num to \"eight\" and print its type again.",
                            starterCode: "num = \nprint(type(num))\n# reassign num\nprint(type(num))",
                            hint: "Strings use quotes.",
                            solution: "num = 8\nprint(type(num))\nnum = \"eight\"\nprint(type(num))",
                            expectedOutput: "<class 'int'>\n<class 'str'>"
                        },
                        // HARD
                        {
                            id: "var-hard-1",
                            level: "hard",
                            question: "`x` starts as 3. Reassign x twice: first to x + 5, then to x * 2. Print the final value.",
                            starterCode: "x = 3\n# first reassignment\n# second reassignment\nprint()",
                            hint: "Do the operations step by step.",
                            solution: "x = 3\nx = x + 5\nx = x * 2\nprint(x)",
                            expectedOutput: "16"
                        },
                        {
                            id: "var-hard-2",
                            level: "hard",
                            question: "Create a variable `name` storing some text. Create a variable `length` storing how many characters are in name. Print both.",
                            starterCode: "name = \n# compute length\n# print both",
                            hint: "Use len(name).",
                            solution: "name = \"Learning\"\nlength = len(name)\nprint(name)\nprint(length)",
                            expectedOutput: "Learning\n8"
                        },
                        {
                            id: "var-hard-3",
                            level: "hard",
                            question: "Create a variable `value` storing 12.5. Reassign it to value multiplied by 3, then print its type.",
                            starterCode: "value = \n# reassign\nprint(type())",
                            hint: "Use type(value).",
                            solution: "value = 12.5\nvalue = value * 3\nprint(type(value))",
                            expectedOutput: "<class 'float'>"
                        },
                        {
                            id: "var-hard-4",
                            level: "hard",
                            question: "Given `x = \"5\"` and `y = 2`, convert x to an integer, add it to y, and print the result.",
                            starterCode: "x = \"5\"\ny = 2\n# convert and add\nprint()",
                            hint: "Use int(x).",
                            solution: "x = \"5\"\ny = 2\nresult = int(x) + y\nprint(result)",
                            expectedOutput: "7"
                        },
                        {
                            id: "var-hard-5",
                            level: "hard",
                            question: "Create a variable `score` storing 10. Reassign score to score + 1 three times using the same line of code repeated. Print the final score.",
                            starterCode: "score = 10\n# increase 3 times\nprint()",
                            hint: "Repeat score = score + 1 three times.",
                            solution: "score = 10\nscore = score + 1\nscore = score + 1\nscore = score + 1\nprint(score)",
                            expectedOutput: "13"
                        }
                    ]
                }
            ]
        },
        {
            id: "math-operators",
            title: "Math Operators",
            description: "Perform calculations using Python's arithmetic operators",
            sections: [
                {
                    id: "math-theory",
                    title: "Basic Math Operations",
                    type: "theory",
                    content: `### Basic Math
Python can act like a calculator.
- \`+\` adds numbers
- \`-\` subtracts
- \`*\` multiplies
- \`/\` divides
- \`**\` raises to a power
- \`//\` does integer division (no decimals)
- \`%\` gives the remainder

\`\`\`python
total = 10 + 5  # 15
diff = 10 - 2   # 8
prod = 3 * 4    # 12
quotient = 10 / 3  # 3.333...
power = 2 ** 3  # 8
\`\`\``
                },
                {
                    id: "math-examples",
                    title: "Solved Examples",
                    type: "examples",
                    examples: [
                        {
                            code: "width = 5\nheight = 10\narea = width * height\nprint(area)",
                            explanation: "Calculate the area of a rectangle by multiplying width and height."
                        },
                        {
                            code: "total = 100\npeople = 4\nshare = total / people\nprint(share)",
                            explanation: "Divide a total amount equally among people."
                        }
                    ]
                },
                {
                    id: "math-exercises",
                    title: "Practice Exercises",
                    type: "exercises",
                    exercises: [
                        {
                            id: "math-easy-1",
                            level: "easy",
                            question: "Calculate and print the sum of 15 and 27.",
                            starterCode: "# Calculate sum\nprint()",
                            hint: "Use the + operator.",
                            solution: "result = 15 + 27\nprint(result)",
                            expectedOutput: "42"
                        },
                        {
                            id: "math-easy-2",
                            level: "easy",
                            question: "Calculate 8 squared (8 to the power of 2) and print it.",
                            starterCode: "# Calculate power\nprint()",
                            hint: "Use the ** operator.",
                            solution: "result = 8 ** 2\nprint(result)",
                            expectedOutput: "64"
                        }
                    ]
                }
            ]
        },
        {
            id: "data-types",
            title: "Data Types",
            description: "Understand different types of data and how to convert between them",
            sections: [
                {
                    id: "datatypes-theory",
                    title: "Understanding Data Types",
                    type: "theory",
                    content: `In Python, data types describe the kind of value stored inside a variable. You can think of them as different shapes of containers: one holds whole numbers, another holds decimal numbers, another holds text, and another holds True or False values. Python automatically assigns a data type based on what you store in the variable.

The four essential beginner types are **int**, **float**, **str**, and **bool**. An int represents whole numbers, float represents decimal numbers, str represents text inside quotes, and bool represents logical values. These four types form the backbone of almost every beginner program.

Python also lets you convert values from one type to another using casting functions such as \`int()\`, \`float()\`, and \`str()\`. These functions are like adapters that reshape the data so it fits into another type. This becomes useful when you need to add numbers that arrive as text or display numbers as part of a sentence.`
                },
                {
                    id: "datatypes-examples",
                    title: "Solved Examples",
                    type: "examples",
                    examples: [
                        {
                            code: "age = 21\nprint(type(age))",
                            explanation: "age holds a whole number, so Python assigns it the int data type. type(age) confirms this."
                        },
                        {
                            code: "price = 19.99\nprint(type(price))",
                            explanation: "A number with decimals automatically becomes a float. Printing type(price) shows that classification."
                        },
                        {
                            code: "num_str = \"42\"\nnum_int = int(num_str)\nprint(num_int + 3)",
                            explanation: "A string containing digits can be converted to an int using int(). After casting, it can be used for arithmetic."
                        }
                    ]
                },
                {
                    id: "datatypes-exercises",
                    title: "Practice Exercises",
                    type: "exercises",
                    exercises: [
                        // EASY
                        {
                            id: "dt-easy-1",
                            level: "easy",
                            question: "Create a variable n storing the number 15 and print its type.",
                            starterCode: "n = \nprint(type())",
                            hint: "Use type(n).",
                            solution: "n = 15\nprint(type(n))",
                            expectedOutput: "<class 'int'>"
                        },
                        {
                            id: "dt-easy-2",
                            level: "easy",
                            question: "Create a variable price storing 8.75 and print its type.",
                            starterCode: "price = \nprint(type())",
                            hint: "Decimal values become float.",
                            solution: "price = 8.75\nprint(type(price))",
                            expectedOutput: "<class 'float'>"
                        },
                        {
                            id: "dt-easy-3",
                            level: "easy",
                            question: "Store \"Python\" in a variable lang and print its type.",
                            starterCode: "lang = \nprint(type())",
                            hint: "Use quotes for a string.",
                            solution: "lang = \"Python\"\nprint(type(lang))",
                            expectedOutput: "<class 'str'>"
                        },
                        {
                            id: "dt-easy-4",
                            level: "easy",
                            question: "Create a variable passed storing True and print its type.",
                            starterCode: "passed = \nprint(type())",
                            hint: "Booleans start with capital letters.",
                            solution: "passed = True\nprint(type(passed))",
                            expectedOutput: "<class 'bool'>"
                        },
                        {
                            id: "dt-easy-5",
                            level: "easy",
                            question: "Convert the string \"9\" to an int and print the result.",
                            starterCode: "x = \"9\"\n# convert and print",
                            hint: "Use int(x).",
                            solution: "x = \"9\"\nprint(int(x))",
                            expectedOutput: "9"
                        },
                        // MEDIUM
                        {
                            id: "dt-medium-1",
                            level: "medium",
                            question: "Store 12.6 in value. Convert it to int and print both the original value and converted value.",
                            starterCode: "value = 12.6\n# convert\n# print both",
                            hint: "Use int(value).",
                            solution: "value = 12.6\nconverted = int(value)\nprint(value)\nprint(converted)",
                            expectedOutput: "12.6\n12"
                        },
                        {
                            id: "dt-medium-2",
                            level: "medium",
                            question: "Store 7 in a variable n. Convert it to a string and print n repeated twice.",
                            starterCode: "n = 7\n# convert and repeat",
                            hint: "Use str(n).",
                            solution: "n = 7\nn_str = str(n)\nprint(n_str * 2)",
                            expectedOutput: "77"
                        },
                        {
                            id: "dt-medium-3",
                            level: "medium",
                            question: "Create a string s = \"3.5\". Convert it to float and add 1.5, then print the result.",
                            starterCode: "s = \"3.5\"\n# convert and add\nprint()",
                            hint: "Use float(s).",
                            solution: "s = \"3.5\"\nnum = float(s) + 1.5\nprint(num)",
                            expectedOutput: "5.0"
                        },
                        {
                            id: "dt-medium-4",
                            level: "medium",
                            question: "Store \"True\" as text in t. Convert it into a boolean by checking if t equals \"True\".",
                            starterCode: "t = \"True\"\n# convert and print",
                            hint: "Use t == \"True\".",
                            solution: "t = \"True\"\nb = (t == \"True\")\nprint(b)",
                            expectedOutput: "True"
                        },
                        {
                            id: "dt-medium-5",
                            level: "medium",
                            question: "Store age = \"21\". Convert it to int, add 1, and print the new age.",
                            starterCode: "age = \"21\"\n# convert and add\nprint()",
                            hint: "Use int(age).",
                            solution: "age = \"21\"\nnew_age = int(age) + 1\nprint(new_age)",
                            expectedOutput: "22"
                        },
                        // HARD
                        {
                            id: "dt-hard-1",
                            level: "hard",
                            question: "Given x = \"12\" and y = \"3.5\", convert both appropriately so their sum becomes a float. Print the result.",
                            starterCode: "x = \"12\"\ny = \"3.5\"\n# convert and add\nprint()",
                            hint: "Convert x to int and y to float.",
                            solution: "x = \"12\"\ny = \"3.5\"\nresult = int(x) + float(y)\nprint(result)",
                            expectedOutput: "15.5"
                        },
                        {
                            id: "dt-hard-2",
                            level: "hard",
                            question: "Store text = \"100\". Convert it to int, multiply by 4, then convert the result back to a string and print its type.",
                            starterCode: "text = \"100\"\n# convert and process\nprint(type())",
                            hint: "Use str() after arithmetic.",
                            solution: "text = \"100\"\nnum = int(text) * 4\ns = str(num)\nprint(type(s))",
                            expectedOutput: "<class 'str'>"
                        },
                        {
                            id: "dt-hard-3",
                            level: "hard",
                            question: "Given value = 7.9, convert it to int, then convert the int back to float, and print both values.",
                            starterCode: "value = 7.9\n# int then float\n# print both",
                            hint: "Use int(value) then float().",
                            solution: "value = 7.9\nv_int = int(value)\nv_float = float(v_int)\nprint(v_int)\nprint(v_float)",
                            expectedOutput: "7\n7.0"
                        },
                        {
                            id: "dt-hard-4",
                            level: "hard",
                            question: "Create a variable flagText = \"False\". Convert it into a boolean without using any external libraries. Print the boolean result.",
                            starterCode: "flagText = \"False\"\n# convert to bool\nprint()",
                            hint: "Check if flagText equals \"True\".",
                            solution: "flagText = \"False\"\nflag = (flagText == \"True\")\nprint(flag)",
                            expectedOutput: "False"
                        },
                        {
                            id: "dt-hard-5",
                            level: "hard",
                            question: "Given a = \"5\" and b = 2.0, convert both so that their sum prints as an int.",
                            starterCode: "a = \"5\"\nb = 2.0\n# convert and add\nprint()",
                            hint: "Convert b to int after addition or before.",
                            solution: "a = \"5\"\nb = 2.0\nresult = int(a) + int(b)\nprint(result)",
                            expectedOutput: "7"
                        }
                    ]
                }
            ]
        },
        {
            id: "strings",
            title: "Strings",
            description: "Master string manipulation with indexing, slicing, and methods",
            sections: [
                {
                    id: "strings-theory",
                    title: "Working with Strings",
                    type: "theory",
                    content: `Strings in Python are sequences of characters, much like a line of text inside quotes. You can think of a string as a row of tiny letter-boxes, each holding one character. Because each character has a position, you can look up individual letters using indexing or pull out a portion of the string using slicing.

Strings also come with helpful built-in methods that let you transform text—changing case, trimming spaces, finding positions, or replacing parts of the text. These methods work like tools you apply directly to the string.

Finally, **f-strings** allow you to combine text with variables in a clean and readable way. Instead of manually joining pieces with +, f-strings let you write a template and drop values inside curly braces, making your printed messages clearer and easier to maintain.`
                },
                {
                    id: "strings-examples",
                    title: "Solved Examples",
                    type: "examples",
                    examples: [
                        {
                            code: "text = \"Python\"\nprint(text[0])",
                            explanation: "Indexing lets you access characters by position. text[0] gives the first character."
                        },
                        {
                            code: "msg = \"Hello World\"\nprint(msg[0:5])",
                            explanation: "Slicing pulls out a portion of the string. msg[0:5] returns the first five characters."
                        },
                        {
                            code: "name = \"alice\"\nprint(f\"Hello, {name.upper()}!\")",
                            explanation: "f-strings allow mixing variables and text. The .upper() method converts the name to uppercase."
                        }
                    ]
                },
                {
                    id: "strings-exercises",
                    title: "Practice Exercises",
                    type: "exercises",
                    exercises: [
                        { id: "str-easy-1", level: "easy", question: "Print the first character of the string word = \"Python\".", starterCode: "word = \"Python\"\n# print first character\n", hint: "Use word[0].", solution: "word = \"Python\"\nprint(word[0])", expectedOutput: "P" },
                        { id: "str-easy-2", level: "easy", question: "Print the last character of the string s = \"Hello\".", starterCode: "s = \"Hello\"\n# print last character\n", hint: "Use negative indexing.", solution: "s = \"Hello\"\nprint(s[-1])", expectedOutput: "o" },
                        { id: "str-easy-3", level: "easy", question: "Print the slice \"Pro\" from the string x = \"Programming\".", starterCode: "x = \"Programming\"\n# print slice\n", hint: "Use x[0:3].", solution: "x = \"Programming\"\nprint(x[0:3])", expectedOutput: "Pro" },
                        { id: "str-easy-4", level: "easy", question: "Convert the string name = \"alice\" to uppercase and print it.", starterCode: "name = \"alice\"\n# convert and print\n", hint: "Use name.upper().", solution: "name = \"alice\"\nprint(name.upper())", expectedOutput: "ALICE" },
                        { id: "str-easy-5", level: "easy", question: "Use an f-string to print \"My age is 20\" when age = 20.", starterCode: "age = 20\n# print with f-string\n", hint: "Use f\"My age is {age}\".", solution: "age = 20\nprint(f\"My age is {age}\")", expectedOutput: "My age is 20" },
                        { id: "str-medium-1", level: "medium", question: "Given msg = \"HelloPython\", print the first five characters and the last five characters.", starterCode: "msg = \"HelloPython\"\n# print slices\n", hint: "Use msg[:5] and msg[-5:].", solution: "msg = \"HelloPython\"\nprint(msg[:5])\nprint(msg[-5:])", expectedOutput: "Hello\nPython" },
                        { id: "str-medium-2", level: "medium", question: "Given text = \"data science\", print the string with the first letter capitalized.", starterCode: "text = \"data science\"\n# print capitalized version\n", hint: "Use text.capitalize().", solution: "text = \"data science\"\nprint(text.capitalize())", expectedOutput: "Data science" },
                        { id: "str-medium-3", level: "medium", question: "Extract \"thon\" from word = \"Pythonistas\" using slicing.", starterCode: "word = \"Pythonistas\"\n# print slice\n", hint: "Find where 'thon' starts.", solution: "word = \"Pythonistas\"\nprint(word[2:6])", expectedOutput: "thon" },
                        { id: "str-medium-4", level: "medium", question: "Given first = \"Ada\" and last = \"Lovelace\", print \"Ada Lovelace\" using an f-string.", starterCode: "first = \"Ada\"\nlast = \"Lovelace\"\n# print full name\n", hint: "Use f\"{first} {last}\".", solution: "first = \"Ada\"\nlast = \"Lovelace\"\nprint(f\"{first} {last}\")", expectedOutput: "Ada Lovelace" },
                        { id: "str-medium-5", level: "medium", question: "Given s = \"banana\", print the number of times \"a\" appears.", starterCode: "s = \"banana\"\n# count occurrences\n", hint: "Use s.count(\"a\").", solution: "s = \"banana\"\nprint(s.count(\"a\"))", expectedOutput: "3" },
                        { id: "str-hard-1", level: "hard", question: "Given a string word = \"imagination\", print every second character using slicing.", starterCode: "word = \"imagination\"\n# print every 2nd character\n", hint: "Use word[::2].", solution: "word = \"imagination\"\nprint(word[::2])", expectedOutput: "imgnto" },
                        { id: "str-hard-2", level: "hard", question: "Reverse the string text = \"Python\" using slicing and print it.", starterCode: "text = \"Python\"\n# reverse and print\n", hint: "Use text[::-1].", solution: "text = \"Python\"\nprint(text[::-1])", expectedOutput: "nohtyP" },
                        { id: "str-hard-3", level: "hard", question: "Given sentence = \"  clean me  \", strip the spaces and print the cleaned version.", starterCode: "sentence = \"  clean me  \"\n# strip and print\n", hint: "Use sentence.strip().", solution: "sentence = \"  clean me  \"\nprint(sentence.strip())", expectedOutput: "clean me" },
                        { id: "str-hard-4", level: "hard", question: "Debug this code: It should print Hi NAME where NAME is uppercase.\nname = \"alice\"\nprint(\"Hi \" + name.upper)", starterCode: "name = \"alice\"\n# fix the print statement\n", hint: "Remember to call the method with ().", solution: "name = \"alice\"\nprint(\"Hi \" + name.upper())", expectedOutput: "Hi ALICE" },
                        { id: "str-hard-5", level: "hard", question: "Using an f-string, print \"Total: 45\" where the number comes from a string value qty = \"15\" converted to int and multiplied by 3.", starterCode: "qty = \"15\"\n# convert, compute, print\n", hint: "Use int(qty) * 3.", solution: "qty = \"15\"\nresult = int(qty) * 3\nprint(f\"Total: {result}\")", expectedOutput: "Total: 45" }
                    ]
                }
            ]
        },
        {
            id: "if-statements",
            title: "If Statements",
            description: "Make decisions in your code with conditionals",
            sections: [
                {
                    id: "if-theory",
                    title: "Conditionals and Logic",
                    type: "theory",
                    content: `If statements allow your program to make decisions. You can think of them as simple branching paths: if a condition is true, the program takes one route; otherwise, it follows a different path. Conditions are usually comparisons, such as checking whether a number is greater than another, or whether two values match.

Python evaluates conditions as **True** or **False**. You can chain multiple checks using \`elif\`, and fall back to an \`else\` block when none of the earlier conditions match. This structure lets you express a sequence of decisions in a readable way.

Because conditions can compare numbers, strings, and even check membership using the \`in\` operator, you can combine earlier concepts naturally. Whether you are comparing scores, verifying text input, or checking if a character exists in a string, if statements act as the control center of your logic.`
                },
                {
                    id: "if-examples",
                    title: "Solved Examples",
                    type: "examples",
                    examples: [
                        {
                            code: "x = 10\nif x > 5:\n    print(\"Large number\")",
                            explanation: "The condition x > 5 evaluates to True, so the message is printed."
                        },
                        {
                            code: "name = \"Alice\"\nif \"A\" in name:\n    print(\"Starts with A\")\nelse:\n    print(\"Does not start with A\")",
                            explanation: "The \"in\" operator checks if a character exists inside a string. Since \"A\" is in Alice, the first branch runs."
                        },
                        {
                            code: "score = 75\nif score >= 90:\n    print(\"A grade\")\nelif score >= 60:\n    print(\"Pass\")\nelse:\n    print(\"Fail\")",
                            explanation: "elif allows multiple checks in order, stopping at the first condition that is True."
                        }
                    ]
                },
                {
                    id: "if-exercises",
                    title: "Practice Exercises",
                    type: "exercises",
                    exercises: [
                        { id: "if-easy-1", level: "easy", question: "Check if number n = 8 is greater than 5. If yes, print \"Big\".", starterCode: "n = 8\n# write if condition\n", hint: "Use n > 5.", solution: "n = 8\nif n > 5:\n    print(\"Big\")", expectedOutput: "Big" },
                        { id: "if-easy-2", level: "easy", question: "Given word = \"Python\", check if it contains the letter \"y\" and print \"Found\".", starterCode: "word = \"Python\"\n# use \"y\" in word\n", hint: "Use \"y\" in word.", solution: "word = \"Python\"\nif \"y\" in word:\n    print(\"Found\")", expectedOutput: "Found" },
                        { id: "if-easy-3", level: "easy", question: "Check if x = 3 equals 3. If yes, print \"Match\".", starterCode: "x = 3\n# compare using ==\n", hint: "Use x == 3.", solution: "x = 3\nif x == 3:\n    print(\"Match\")", expectedOutput: "Match" },
                        { id: "if-easy-4", level: "easy", question: "Check if age = 20 is at least 18. Print \"Adult\".", starterCode: "age = 20\n# write condition\n", hint: "Use age >= 18.", solution: "age = 20\nif age >= 18:\n    print(\"Adult\")", expectedOutput: "Adult" },
                        { id: "if-easy-5", level: "easy", question: "Given s = \"apple\", check if it contains \"p\" and print \"Yes\".", starterCode: "s = \"apple\"\n# check membership\n", hint: "Use \"p\" in s.", solution: "s = \"apple\"\nif \"p\" in s:\n    print(\"Yes\")", expectedOutput: "Yes" },
                        { id: "if-medium-1", level: "medium", question: "Given number n = 12, print \"Even\" if it is divisible by 2, else print \"Odd\".", starterCode: "n = 12\n# use % operator\n", hint: "Check n % 2 == 0.", solution: "n = 12\nif n % 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")", expectedOutput: "Even" },
                        { id: "if-medium-2", level: "medium", question: "Given text = \"banana\", print \"Contains a\" if the string has the letter \"a\".", starterCode: "text = \"banana\"\n# check with in\n", hint: "Use \"a\" in text.", solution: "text = \"banana\"\nif \"a\" in text:\n    print(\"Contains a\")", expectedOutput: "Contains a" },
                        { id: "if-medium-3", level: "medium", question: "Given x = 15, print \"High\" if x > 20, \"Medium\" if x >= 10, else \"Low\".", starterCode: "x = 15\n# write if/elif/else\n", hint: "Order conditions from highest to lowest.", solution: "x = 15\nif x > 20:\n    print(\"High\")\nelif x >= 10:\n    print(\"Medium\")\nelse:\n    print(\"Low\")", expectedOutput: "Medium" },
                        { id: "if-medium-4", level: "medium", question: "Check if name = \"Alice\" starts with \"A\". If yes, print \"Starts with A\", else print \"No\".", starterCode: "name = \"Alice\"\n# use indexing or in\n", hint: "Use name[0] == \"A\".", solution: "name = \"Alice\"\nif name[0] == \"A\":\n    print(\"Starts with A\")\nelse:\n    print(\"No\")", expectedOutput: "Starts with A" },
                        { id: "if-medium-5", level: "medium", question: "Given a score = 55, print \"Pass\" if score >= 50 else \"Retry\".", starterCode: "score = 55\n# check score\n", hint: "Use score >= 50.", solution: "score = 55\nif score >= 50:\n    print(\"Pass\")\nelse:\n    print(\"Retry\")", expectedOutput: "Pass" },
                        { id: "if-hard-1", level: "hard", question: "Given msg = \"hello world\", check if it contains \"o\". If yes, print the number of times it appears; otherwise print \"None\".", starterCode: "msg = \"hello world\"\n# check and count\n", hint: "Combine in with msg.count(\"o\").", solution: "msg = \"hello world\"\nif \"o\" in msg:\n    print(msg.count(\"o\"))\nelse:\n    print(\"None\")", expectedOutput: "2" },
                        { id: "if-hard-2", level: "hard", question: "Given x = 7 and y = \"7\", compare them. If x equals int(y), print \"Match\", else \"No\".", starterCode: "x = 7\ny = \"7\"\n# compare by casting\n", hint: "Use int(y).", solution: "x = 7\ny = \"7\"\nif x == int(y):\n    print(\"Match\")\nelse:\n    print(\"No\")", expectedOutput: "Match" },
                        { id: "if-hard-3", level: "hard", question: "Given word = \"Python\", print \"Short\" if its length is less than 6, else print \"Long\".", starterCode: "word = \"Python\"\n# use len(word)\n", hint: "Check len(word) < 6.", solution: "word = \"Python\"\nif len(word) < 6:\n    print(\"Short\")\nelse:\n    print(\"Long\")", expectedOutput: "Long" },
                        { id: "if-hard-4", level: "hard", question: "Debug this code:\nval = 10\nif val = 10:\n    print(\"Ten\")", starterCode: "val = 10\n# fix the condition\n", hint: "Use == for comparison.", solution: "val = 10\nif val == 10:\n    print(\"Ten\")", expectedOutput: "Ten" },
                        { id: "if-hard-5", level: "hard", question: "Using name = \"Charlie\", check if it contains \"C\". If yes, print \"Uppercase C found\". Otherwise, check if it contains \"c\" and print \"Lowercase c found\". If neither is found, print \"None\".", starterCode: "name = \"Charlie\"\n# multiple conditions\n", hint: "Chain checks using if/elif/else.", solution: "name = \"Charlie\"\nif \"C\" in name:\n    print(\"Uppercase C found\")\nelif \"c\" in name:\n    print(\"Lowercase c found\")\nelse:\n    print(\"None\")", expectedOutput: "Uppercase C found" }
                    ]
                }
            ]
        },
        {
            id: "for-loops",
            title: "For Loops",
            description: "Repeat actions automatically with for loops",
            sections: [
                {
                    id: "for-theory",
                    title: "Iteration and Repetition",
                    type: "theory",
                    content: `For loops allow your program to repeat actions automatically, which saves you from writing the same line of code again and again. You can think of a for loop like flipping through pages of a book: you move from one page to the next, doing something on each page. Instead of manually writing a line for each step, the loop handles the repetition for you.

In Python, for loops commonly work with the \`range()\` function. \`range(5)\` means "give me the numbers 0 through 4, one at a time." The loop variable takes each value in order, allowing you to perform an action on every number. You can also use custom ranges like \`range(2, 6)\` to start and end where you want, or \`range(0, 10, 2)\` to skip numbers.

For loops can also move through the characters of a string, one letter at a time. This makes it easy to inspect or build text. Another useful pattern is **accumulation**: starting with a total and adding something inside the loop. This is how you compute sums, counts, or any running total during repetition.`
                },
                {
                    id: "for-examples",
                    title: "Solved Examples",
                    type: "examples",
                    examples: [
                        {
                            code: "for i in range(5):\n    print(i)",
                            explanation: "range(5) produces 0, 1, 2, 3, and 4. The loop prints each number. This shows basic counting with a loop."
                        },
                        {
                            code: "word = \"Python\"\nfor ch in word:\n    print(ch)",
                            explanation: "The loop goes through each character in the string word. Each character is printed one at a time."
                        },
                        {
                            code: "total = 0\nfor n in range(1, 6):\n    total = total + n\nprint(total)",
                            explanation: "This accumulation loop adds numbers from 1 to 5. The final total becomes 15."
                        }
                    ]
                },
                {
                    id: "for-exercises",
                    title: "Practice Exercises",
                    type: "exercises",
                    exercises: [
                        { id: "for-easy-1", level: "easy", question: "Print the numbers 0 to 4 using a for loop.", starterCode: "for i in range(5):\n    # print i\n", hint: "Use print(i) inside the loop.", solution: "for i in range(5):\n    print(i)", expectedOutput: "0\n1\n2\n3\n4" },
                        { id: "for-easy-2", level: "easy", question: "Print the numbers 1 to 5 using range().", starterCode: "for n in range(1, 6):\n    # print n\n", hint: "Start at 1 and end at 6.", solution: "for n in range(1, 6):\n    print(n)", expectedOutput: "1\n2\n3\n4\n5" },
                        { id: "for-easy-3", level: "easy", question: "Print each character in the string word = \"Hi\".", starterCode: "word = \"Hi\"\nfor ch in word:\n    # print character\n", hint: "Use print(ch).", solution: "word = \"Hi\"\nfor ch in word:\n    print(ch)", expectedOutput: "H\ni" },
                        { id: "for-easy-4", level: "easy", question: "Use a for loop to print \"Hello\" three times.", starterCode: "for _ in range(3):\n    # print Hello\n", hint: "Use print(\"Hello\").", solution: "for _ in range(3):\n    print(\"Hello\")", expectedOutput: "Hello\nHello\nHello" },
                        { id: "for-easy-5", level: "easy", question: "Print the numbers 2, 3, and 4 using a loop.", starterCode: "for x in range(2, 5):\n    # print x\n", hint: "Use range(2, 5).", solution: "for x in range(2, 5):\n    print(x)", expectedOutput: "2\n3\n4" },
                        { id: "for-medium-1", level: "medium", question: "Print only the even numbers from 0 to 10.", starterCode: "for i in range(0, 11):\n    # check even\n", hint: "Use i % 2 == 0 inside an if.", solution: "for i in range(0, 11):\n    if i % 2 == 0:\n        print(i)", expectedOutput: "0\n2\n4\n6\n8\n10" },
                        { id: "for-medium-2", level: "medium", question: "Count how many times the letter 'a' appears in the string txt = \"banana\".", starterCode: "txt = \"banana\"\ncount = 0\nfor ch in txt:\n    # update count\nprint(count)", hint: "Increase count when ch == 'a'.", solution: "txt = \"banana\"\ncount = 0\nfor ch in txt:\n    if ch == \"a\":\n        count = count + 1\nprint(count)", expectedOutput: "3" },
                        { id: "for-medium-3", level: "medium", question: "Print all numbers from 5 to 15, but only those bigger than 10.", starterCode: "for n in range(5, 16):\n    # check > 10\n", hint: "Use if n > 10.", solution: "for n in range(5, 16):\n    if n > 10:\n        print(n)", expectedOutput: "11\n12\n13\n14\n15" },
                        { id: "for-medium-4", level: "medium", question: "Compute the sum of all numbers from 1 to 10 using a loop.", starterCode: "total = 0\nfor n in range(1, 11):\n    # add to total\nprint(total)", hint: "Use total = total + n.", solution: "total = 0\nfor n in range(1, 11):\n    total = total + n\nprint(total)", expectedOutput: "55" },
                        { id: "for-medium-5", level: "medium", question: "Given msg = \"Hello\", print only the uppercase characters you find.", starterCode: "msg = \"Hello\"\nfor ch in msg:\n    # check uppercase\n", hint: "Uppercase letters equal their own .upper().", solution: "msg = \"Hello\"\nfor ch in msg:\n    if ch == ch.upper() and ch.isalpha():\n        print(ch)", expectedOutput: "H" },
                        { id: "for-hard-1", level: "hard", question: "Print a 3x3 grid of stars (*) using nested loops.", starterCode: "for i in range(3):\n    for j in range(3):\n        # print star\n    # new line\n", hint: "Print stars on the same line using end=\"\".", solution: "for i in range(3):\n    for j in range(3):\n        print(\"*\", end=\"\")\n    print()", expectedOutput: "***\n***\n***" },
                        { id: "for-hard-2", level: "hard", question: "Build a string of all characters in msg = \"paper\" that are not 'p'. Print the new string.", starterCode: "msg = \"paper\"\nresult = \"\"\nfor ch in msg:\n    # add only if ch != 'p'\nprint(result)", hint: "Use result = result + ch.", solution: "msg = \"paper\"\nresult = \"\"\nfor ch in msg:\n    if ch != \"p\":\n        result = result + ch\nprint(result)", expectedOutput: "aer" },
                        { id: "for-hard-3", level: "hard", question: "Print the pattern:\n1\n12\n123", starterCode: "for i in range(1, 4):\n    # inner loop prints 1 to i\n", hint: "Use a nested loop from 1 to i.", solution: "for i in range(1, 4):\n    for j in range(1, i + 1):\n        print(j, end=\"\")\n    print()", expectedOutput: "1\n12\n123" },
                        { id: "for-hard-4", level: "hard", question: "Count how many uppercase letters are in the string s = \"PyThOn\".", starterCode: "s = \"PyThOn\"\ncount = 0\nfor ch in s:\n    # check uppercase\nprint(count)", hint: "Uppercase letters equal ch.upper() and are alphabetic.", solution: "s = \"PyThOn\"\ncount = 0\nfor ch in s:\n    if ch.isupper():\n        count = count + 1\nprint(count)", expectedOutput: "3" },
                        { id: "for-hard-5", level: "hard", question: "Using nested loops, print the following pattern of letters from the string word = \"ABC\":\nA\nAB\nABC", starterCode: "word = \"ABC\"\nfor i in range(1, len(word)+1):\n    # nested loop prints letters\n", hint: "Use word[j] inside inner loop.", solution: "word = \"ABC\"\nfor i in range(1, len(word) + 1):\n    for j in range(i):\n        print(word[j], end=\"\")\n    print()", expectedOutput: "A\nAB\nABC" }
                    ]
                }
            ]
        }
    ]
};
