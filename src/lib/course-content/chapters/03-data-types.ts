import { Chapter } from '../../types';

export const dataTypesChapter: Chapter = {
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
        },
        {
            id: "datatypes-quiz",
            title: "Unlock Chapter Quiz",
            type: "quiz"
        }
    ]
};
