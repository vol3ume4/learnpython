import { Chapter } from '../../types';

export const whileLoopsChapter: Chapter = {
            id: "while-loops",
            title: "While Loops",
            description: "Repeat actions based on conditions with while loops",
            sections: [
                {
                    id: "while-theory",
                    title: "Conditional Repetition",
                    type: "theory",
                    content: `While loops let your program repeat an action until a condition becomes false. Unlike for loops, which repeat a fixed number of times, while loops repeat based on a changing situation. You can think of a while loop like waiting for rain to stop—each minute you check the condition again, and you continue waiting as long as it is still raining.

A while loop has three important parts: the **condition** that decides whether the loop should keep going, the **body** where the repeated work happens, and the **update** where you change the variable that affects the condition. Forgetting the update is one of the most common beginner mistakes because it can cause the loop to run forever.

While loops are useful for countdowns, building totals until a target is reached, or simulating repeated checks. As long as you update the condition each time, while loops give you flexible, condition-based repetition without needing a fixed range of numbers.`
                },
                {
                    id: "while-examples",
                    title: "Solved Examples",
                    type: "examples",
                    examples: [
                        {
                            code: "n = 5\nwhile n > 0:\n    print(n)\n    n = n - 1\nprint(\"Done\")",
                            explanation: "A simple countdown. The loop continues as long as n > 0. Each iteration decreases n by 1."
                        },
                        {
                            code: "total = 0\nwhile total < 10:\n    total = total + 3\n    print(total)",
                            explanation: "The loop keeps adding 3 to total until total reaches 10 or more. This shows accumulation until a condition is met."
                        },
                        {
                            code: "n = 1\nwhile True:\n    print(n)\n    if n == 3:\n        break\n    n = n + 1",
                            explanation: "The loop uses while True to repeat endlessly, but break stops the loop once n reaches 3."
                        }
                    ]
                },
                {
                    id: "while-exercises",
                    title: "Practice Exercises",
                    type: "exercises",
                    exercises: [
                        { id: "while-easy-1", level: "easy", question: "Print numbers from 5 down to 1 using a while loop.", starterCode: "n = 5\nwhile n > 0:\n    # print n\n    # update n\n", hint: "Decrease n each time using n = n - 1.", solution: "n = 5\nwhile n > 0:\n    print(n)\n    n = n - 1", expectedOutput: "5\n4\n3\n2\n1" },
                        { id: "while-easy-2", level: "easy", question: "Print the numbers 1 to 5 using a while loop.", starterCode: "i = 1\nwhile i <= 5:\n    # print i\n    # update i\n", hint: "Increase i each loop.", solution: "i = 1\nwhile i <= 5:\n    print(i)\n    i = i + 1", expectedOutput: "1\n2\n3\n4\n5" },
                        { id: "while-easy-3", level: "easy", question: "Print each character of the string \"Hi\" using a while loop.", starterCode: "s = \"Hi\"\ni = 0\nwhile i < len(s):\n    # print s[i]\n    # update i\n", hint: "Use s[i] and increment i.", solution: "s = \"Hi\"\ni = 0\nwhile i < len(s):\n    print(s[i])\n    i = i + 1", expectedOutput: "H\ni" },
                        { id: "while-easy-4", level: "easy", question: "Use a while loop to print \"Hello\" three times.", starterCode: "count = 0\nwhile count < 3:\n    # print Hello\n    # update count\n", hint: "Increase count using count = count + 1.", solution: "count = 0\nwhile count < 3:\n    print(\"Hello\")\n    count = count + 1", expectedOutput: "Hello\nHello\nHello" },
                        { id: "while-easy-5", level: "easy", question: "Start with x = 2 and keep printing x until it becomes 6 (inclusive).", starterCode: "x = 2\nwhile x <= 6:\n    # print x\n    # update x\n", hint: "Increase x by 1 each time.", solution: "x = 2\nwhile x <= 6:\n    print(x)\n    x = x + 1", expectedOutput: "2\n3\n4\n5\n6" },
                        { id: "while-medium-1", level: "medium", question: "Add numbers starting from 1 until the total reaches at least 20. Print the final total.", starterCode: "total = 0\nn = 1\nwhile total < 20:\n    # add n to total\n    # update n\nprint(total)", hint: "Use total = total + n.", solution: "total = 0\nn = 1\nwhile total < 20:\n    total = total + n\n    n = n + 1\nprint(total)", expectedOutput: "21" },
                        { id: "while-medium-2", level: "medium", question: "Using a while loop, print only the uppercase letters from the string s = \"AbCdeF\".", starterCode: "s = \"AbCdeF\"\ni = 0\nwhile i < len(s):\n    # check if uppercase\n    # update i\n", hint: "Uppercase letters equal their own .upper().", solution: "s = \"AbCdeF\"\ni = 0\nwhile i < len(s):\n    if s[i] == s[i].upper() and s[i].isalpha():\n        print(s[i])\n    i = i + 1", expectedOutput: "A\nC\nF" },
                        { id: "while-medium-3", level: "medium", question: "Print numbers from 1 to 20, but stop early if you reach a number divisible by 7.", starterCode: "n = 1\nwhile n <= 20:\n    # check condition\n    # update n\n", hint: "Use if n % 7 == 0: break.", solution: "n = 1\nwhile n <= 20:\n    if n % 7 == 0:\n        break\n    print(n)\n    n = n + 1", expectedOutput: "1\n2\n3\n4\n5\n6" },
                        { id: "while-medium-4", level: "medium", question: "Count how many characters in msg = \"banana\" are not 'a'.", starterCode: "msg = \"banana\"\ni = 0\ncount = 0\nwhile i < len(msg):\n    # check and update count\n    # update i\nprint(count)", hint: "Use msg[i] != 'a'.", solution: "msg = \"banana\"\ni = 0\ncount = 0\nwhile i < len(msg):\n    if msg[i] != \"a\":\n        count = count + 1\n    i = i + 1\nprint(count)", expectedOutput: "3" },
                        { id: "while-medium-5", level: "medium", question: "Start with x = 10 and subtract 2 each loop. Stop when x becomes less than 0.", starterCode: "x = 10\nwhile x >= 0:\n    # print x\n    # update x\n", hint: "Use x = x - 2.", solution: "x = 10\nwhile x >= 0:\n    print(x)\n    x = x - 2", expectedOutput: "10\n8\n6\n4\n2\n0" },
                        { id: "while-hard-1", level: "hard", question: "Debug this infinite loop so it prints 1 2 3 and stops.\ni = 1\nwhile i <= 3:\n    print(i)\n    # missing update", starterCode: "i = 1\nwhile i <= 3:\n    print(i)\n    # fix update\n", hint: "Increase i.", solution: "i = 1\nwhile i <= 3:\n    print(i)\n    i = i + 1", expectedOutput: "1\n2\n3" },
                        { id: "while-hard-2", level: "hard", question: "Using a while loop, build a string that contains every second character from s = \"ABCDEFGHI\". Print the final string.", starterCode: "s = \"ABCDEFGHI\"\nresult = \"\"\ni = 0\nwhile i < len(s):\n    # add s[i]\n    # update i by 2\nprint(result)", hint: "Increase i by 2.", solution: "s = \"ABCDEFGHI\"\nresult = \"\"\ni = 0\nwhile i < len(s):\n    result = result + s[i]\n    i = i + 2\nprint(result)", expectedOutput: "ACEGI" },
                        { id: "while-hard-3", level: "hard", question: "Using a while loop, print numbers 1 to 10 but skip printing 5 using continue.", starterCode: "n = 1\nwhile n <= 10:\n    # skip 5\n    # update n\n", hint: "Use continue after checking n == 5.", solution: "n = 1\nwhile n <= 10:\n    if n == 5:\n        n = n + 1\n        continue\n    print(n)\n    n = n + 1", expectedOutput: "1\n2\n3\n4\n6\n7\n8\n9\n10" },
                        { id: "while-hard-4", level: "hard", question: "Debug this loop. It should print letters of s = \"Zoo\" but runs forever.\ns = \"Zoo\"\ni = 0\nwhile i < len(s):\n    print(s[i])", starterCode: "s = \"Zoo\"\ni = 0\nwhile i < len(s):\n    print(s[i])\n    # fix update\n", hint: "Increase i inside the loop.", solution: "s = \"Zoo\"\ni = 0\nwhile i < len(s):\n    print(s[i])\n    i = i + 1", expectedOutput: "Z\no\no" },
                        { id: "while-hard-5", level: "hard", question: "Using a while loop and if statements, print numbers from 1 to 20 but:\n- Print \"Even\" for even numbers\n- Print the number itself for odd numbers\nStop early if the number is divisible by 9.", starterCode: "n = 1\nwhile n <= 20:\n    # check stop\n    # check even/odd\n    # update n\n", hint: "Use n % 9 == 0 to break.", solution: "n = 1\nwhile n <= 20:\n    if n % 9 == 0:\n        break\n    if n % 2 == 0:\n        print(\"Even\")\n    else:\n        print(n)\n    n = n + 1", expectedOutput: "1\nEven\n3\nEven\n5\nEven\n7\nEven" }
                    ]
                },
                {
                    id: "while-quiz",
                    title: "Unlock Chapter Quiz",
                    type: "quiz"
                }
            ]
        };
