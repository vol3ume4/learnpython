import { Chapter } from '../../types';

export const ifStatementsChapter: Chapter = {
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
                },
                {
                    id: "if-quiz",
                    title: "Unlock Chapter Quiz",
                    type: "quiz"
                }
            ]
        };
