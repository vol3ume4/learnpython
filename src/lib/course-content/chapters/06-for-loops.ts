import { Chapter } from '../../types';

export const forLoopsChapter: Chapter = {
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
                },
                {
                    id: "for-quiz",
                    title: "Unlock Chapter Quiz",
                    type: "quiz"
                }
            ]
        };
