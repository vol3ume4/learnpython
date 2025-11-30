import { Chapter } from '../../types';

export const listsBasicsChapter: Chapter = {
            id: "lists-basics",
            title: "Lists - Basics",
            description: "Store collections of data with lists",
            sections: [
                {
                    id: "lists-theory",
                    title: "Ordered Collections",
                    type: "theory",
                    content: `Lists are ordered collections of items stored inside square brackets. You can think of a list as a row of labeled boxes, each holding a value. Unlike variables that store just one item, lists can store many values at once—numbers, strings, or a mix of both. They help you group related information in one place, making your programs more organized and expressive.

Each item in a list has a position called an **index**. Python uses zero-based indexing, so the first element is at index 0. You can also use negative indexes, where -1 refers to the last element. You can extract multiple items using **slicing**, which works just like slicing strings. This lets you pull out sublists without needing loops.

The powerful feature of lists is that they are **mutable**—unlike strings, you can change them after creation. You can replace elements, grow lists, or combine them using the \`+\` operator. Basic operations like \`len()\` help you understand the size of the list, and the \`in\` operator lets you check whether a value exists inside it. Lists form the foundation of many real-world Python programs.`
                },
                {
                    id: "lists-examples",
                    title: "Solved Examples",
                    type: "examples",
                    examples: [
                        {
                            code: "nums = [1, 2, 3]\nprint(nums[0])",
                            explanation: "This prints the first element of the list using index 0. Lists follow zero-based indexing."
                        },
                        {
                            code: "words = [\"a\", \"b\", \"c\", \"d\"]\nprint(words[1:3])",
                            explanation: "Slicing extracts positions 1 and 2 to create a new sublist ['b', 'c']."
                        },
                        {
                            code: "colors = [\"red\", \"blue\", \"green\"]\ncolors[1] = \"yellow\"\nprint(colors)",
                            explanation: "Lists are mutable, so the second element is replaced with 'yellow'."
                        }
                    ]
                },
                {
                    id: "lists-exercises",
                    title: "Practice Exercises",
                    type: "exercises",
                    exercises: [
                        { id: "list-easy-1", level: "easy", question: "Create a list nums containing [3, 6, 9] and print it.", starterCode: "nums = [3, 6, 9]\n# print list\n", hint: "Just use print(nums).", solution: "nums = [3, 6, 9]\nprint(nums)", expectedOutput: "[3, 6, 9]" },
                        { id: "list-easy-2", level: "easy", question: "Print the first element of the list vals = [10, 20, 30].", starterCode: "vals = [10, 20, 30]\n# print first item\n", hint: "Use vals[0].", solution: "vals = [10, 20, 30]\nprint(vals[0])", expectedOutput: "10" },
                        { id: "list-easy-3", level: "easy", question: "Print the last element of the list items = [\"a\", \"b\", \"c\"].", starterCode: "items = [\"a\", \"b\", \"c\"]\n# print last item\n", hint: "Use items[-1].", solution: "items = [\"a\", \"b\", \"c\"]\nprint(items[-1])", expectedOutput: "c" },
                        { id: "list-easy-4", level: "easy", question: "Change the second element of data = [5, 7, 9] to 100 and print the result.", starterCode: "data = [5, 7, 9]\n# modify and print\n", hint: "Assign to data[1].", solution: "data = [5, 7, 9]\ndata[1] = 100\nprint(data)", expectedOutput: "[5, 100, 9]" },
                        { id: "list-easy-5", level: "easy", question: "Print the length of the list a = [1, 1, 1, 1].", starterCode: "a = [1, 1, 1, 1]\n# print length\n", hint: "Use len(a).", solution: "a = [1, 1, 1, 1]\nprint(len(a))", expectedOutput: "4" },
                        { id: "list-medium-1", level: "medium", question: "Given nums = [2, 4, 6, 8, 10], print the slice [4, 6, 8].", starterCode: "nums = [2, 4, 6, 8, 10]\n# slice and print\n", hint: "Use nums[1:4].", solution: "nums = [2, 4, 6, 8, 10]\nprint(nums[1:4])", expectedOutput: "[4, 6, 8]" },
                        { id: "list-medium-2", level: "medium", question: "Combine list a = [1, 2] and b = [3, 4] into a new list and print it.", starterCode: "a = [1, 2]\nb = [3, 4]\n# join lists\n", hint: "Use a + b.", solution: "a = [1, 2]\nb = [3, 4]\nprint(a + b)", expectedOutput: "[1, 2, 3, 4]" },
                        { id: "list-medium-3", level: "medium", question: "Check if 7 is in the list nums = [1, 3, 5, 7, 9] and print True or False.", starterCode: "nums = [1, 3, 5, 7, 9]\n# check membership\n", hint: "Use 7 in nums.", solution: "nums = [1, 3, 5, 7, 9]\nprint(7 in nums)", expectedOutput: "True" },
                        { id: "list-medium-4", level: "medium", question: "Replace the last element of data = [\"apple\", \"banana\", \"cherry\"] with \"orange\".", starterCode: "data = [\"apple\", \"banana\", \"cherry\"]\n# replace last\n", hint: "Use data[-1].", solution: "data = [\"apple\", \"banana\", \"cherry\"]\ndata[-1] = \"orange\"\nprint(data)", expectedOutput: "[\"apple\", \"banana\", \"orange\"]" },
                        { id: "list-medium-5", level: "medium", question: "Given nums = [10, 20, 30, 40], print the second and third items using slicing.", starterCode: "nums = [10, 20, 30, 40]\n# slice and print\n", hint: "Use nums[1:3].", solution: "nums = [10, 20, 30, 40]\nprint(nums[1:3])", expectedOutput: "[20, 30]" },
                        { id: "list-hard-1", level: "hard", question: "Swap the first and last elements of nums = [5, 10, 15, 20]. Print the modified list.", starterCode: "nums = [5, 10, 15, 20]\n# swap here\n", hint: "Use a temporary variable or tuple swap.", solution: "nums = [5, 10, 15, 20]\nt = nums[0]\nnums[0] = nums[-1]\nnums[-1] = t\nprint(nums)", expectedOutput: "[20, 10, 15, 5]" },
                        { id: "list-hard-2", level: "hard", question: "Given lst = [4, 9, 2], update the middle element so it becomes the sum of the first and last elements.", starterCode: "lst = [4, 9, 2]\n# modify middle\n", hint: "Use lst[1] = lst[0] + lst[-1].", solution: "lst = [4, 9, 2]\nlst[1] = lst[0] + lst[-1]\nprint(lst)", expectedOutput: "[4, 6, 2]" },
                        { id: "list-hard-3", level: "hard", question: "Debug: This code tries to access an index that does not exist.\nnums = [1, 2, 3]\nprint(nums[5])", starterCode: "nums = [1, 2, 3]\n# fix: print a valid index\n", hint: "The highest valid index is 2.", solution: "nums = [1, 2, 3]\nprint(nums[2])", expectedOutput: "3" },
                        { id: "list-hard-4", level: "hard", question: "Reverse the list data = [\"a\", \"b\", \"c\", \"d\"] using slicing and print it.", starterCode: "data = [\"a\", \"b\", \"c\", \"d\"]\n# reverse using slicing\n", hint: "Use data[::-1].", solution: "data = [\"a\", \"b\", \"c\", \"d\"]\nprint(data[::-1])", expectedOutput: "[\"d\", \"c\", \"b\", \"a\"]" },
                        { id: "list-hard-5", level: "hard", question: "Given nums = [2, 4, 6, 8], replace the first element with the sum of the last two elements.", starterCode: "nums = [2, 4, 6, 8]\n# modify nums[0]\n", hint: "Use nums[-1] and nums[-2].", solution: "nums = [2, 4, 6, 8]\nnums[0] = nums[-1] + nums[-2]\nprint(nums)", expectedOutput: "[14, 4, 6, 8]" }
                    ]
                },
                {
                    id: "lists-basics-quiz",
                    title: "Unlock Chapter Quiz",
                    type: "quiz"
                }
            ]
        };
