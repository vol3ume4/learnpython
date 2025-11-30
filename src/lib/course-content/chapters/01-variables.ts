import { Chapter } from '../../types';

export const variablesChapter: Chapter = {
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
        },
        {
            id: "variables-quiz",
            title: "Unlock Chapter Quiz",
            type: "quiz"
        }
    ]
};
