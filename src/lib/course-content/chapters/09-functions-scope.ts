import { Chapter } from '../../types';

export const functionsScopeChapter: Chapter = {
            id: "functions-scope",
            title: "Functions - Scope",
            description: "Understand where variables live with local and global scope",
            sections: [
                {
                    id: "scope-theory",
                    title: "Local vs. Global Scope",
                    type: "theory",
                    content: `Scope decides *where* a variable exists in your program. When you create a variable inside a function, it belongs only to that function. This is called **local scope**. You can think of it like a notepad the function carries while it is working: the notes exist only while the function runs, and they disappear as soon as the function finishes.

Variables created outside any function live in the **global scope**. Functions are allowed to read these global values, but any variable assignment inside the function creates a new local variable unless stated otherwise. This difference often surprises beginners, because a variable name used inside a function may refer to a completely different variable than the one outside.

When a local variable has the same name as a global variable, the local one "**shadows**" the global one. This means the function temporarily uses its own version of the variable. Also, parameters behave exactly like local variables—they exist only while the function runs. Understanding scope helps you avoid confusing errors and write cleaner, safer code.`
                },
                {
                    id: "scope-examples",
                    title: "Solved Examples",
                    type: "examples",
                    examples: [
                        {
                            code: "x = 10\n\ndef show():\n    print(x)\n\nshow()",
                            explanation: "The function can read the global variable x because reading does not create a new variable. It prints 10."
                        },
                        {
                            code: "def demo():\n    y = 5\n    print(y)\n\ndemo()\n# print(y)  # This would cause an error",
                            explanation: "y is created inside demo(), so it exists only while the function runs. Trying to print y outside would fail."
                        },
                        {
                            code: "x = 20\n\ndef test():\n    x = 5  # local shadowing\n    print(\"inside\", x)\n\nprint(\"outside\", x)\ntest()",
                            explanation: "Both variables are named x, but they belong to different scopes. Inside the function, the local x shadows the global one."
                        }
                    ]
                },
                {
                    id: "scope-exercises",
                    title: "Practice Exercises",
                    type: "exercises",
                    exercises: [
                        { id: "scope-easy-1", level: "easy", question: "Define a function make_number() that creates a local variable n = 5 and prints it. Then try printing n outside the function to understand scope.", starterCode: "def make_number():\n    n = 5\n    print(\"inside:\", n)\n\nmake_number()\n# print(\"outside:\", n)  # will cause an error\n", hint: "Local variables cannot be accessed outside the function.", solution: "def make_number():\n    n = 5\n    print(\"inside:\", n)\n\nmake_number()\n# print(\"outside:\", n)  # error if uncommented", expectedOutput: "inside: 5" },
                        { id: "scope-easy-2", level: "easy", question: "Define a global variable msg = \"Hello\". Inside a function show_msg(), print msg.", starterCode: "msg = \"Hello\"\n\ndef show_msg():\n    # print msg here\n\nshow_msg()", hint: "Functions can read global variables.", solution: "msg = \"Hello\"\n\ndef show_msg():\n    print(msg)\n\nshow_msg()", expectedOutput: "Hello" },
                        { id: "scope-easy-3", level: "easy", question: "Show that parameters are local by printing the parameter inside the function and trying to print it outside.", starterCode: "def display(value):\n    print(\"inside:\", value)\n\ndisplay(10)\n# print(value)  # error", hint: "Parameters behave like local variables.", solution: "def display(value):\n    print(\"inside:\", value)\n\ndisplay(10)\n# print(value)  # error if uncommented", expectedOutput: "inside: 10" },
                        { id: "scope-easy-4", level: "easy", question: "Create a function show_number() that prints a global variable num = 7.", starterCode: "num = 7\n\ndef show_number():\n    # print num\n\nshow_number()", hint: "Just read num inside the function.", solution: "num = 7\n\ndef show_number():\n    print(num)\n\nshow_number()", expectedOutput: "7" },
                        { id: "scope-easy-5", level: "easy", question: "Inside a function, define a local variable x = 3 and print it. Confirm that x outside the function is unchanged.", starterCode: "x = 10\n\ndef test():\n    x = 3\n    print(\"inside:\", x)\n\nprint(\"outside:\", x)\ntest()", hint: "Local x shadows global x only inside the function.", solution: "x = 10\n\ndef test():\n    x = 3\n    print(\"inside:\", x)\n\nprint(\"outside:\", x)\ntest()", expectedOutput: "outside: 10\ninside: 3" },
                        { id: "scope-medium-1", level: "medium", question: "Demonstrate shadowing: Create global x = 10. Inside the function shadow(), set x = 5 locally and print both inside and outside values.", starterCode: "x = 10\n\ndef shadow():\n    # local x\n    # print inside\n\n# print outside\nshadow()", hint: "Assigning inside creates a local variable.", solution: "x = 10\n\ndef shadow():\n    x = 5\n    print(\"inside:\", x)\n\nprint(\"outside:\", x)\nshadow()", expectedOutput: "outside: 10\ninside: 5" },
                        { id: "scope-medium-2", level: "medium", question: "Create two functions f1() and f2(), each defining a local variable n = 5 inside f1 and n = 10 inside f2. Print n inside each function.", starterCode: "def f1():\n    # local n\n    print()\n\ndef f2():\n    # local n\n    print()\n\nf1()\nf2()", hint: "Local variables in different functions do not interfere.", solution: "def f1():\n    n = 5\n    print(n)\n\ndef f2():\n    n = 10\n    print(n)\n\nf1()\nf2()", expectedOutput: "5\n10" },
                        { id: "scope-medium-3", level: "medium", question: "Write a function test(v) that assigns v = v + 1 inside the function and prints it. After calling test(3), print 3 outside to show the argument didn’t change.", starterCode: "def test(v):\n    # modify and print\n\nprint(\"outside:\", 3)\ntest(3)", hint: "Changing v inside does not change the original argument.", solution: "def test(v):\n    v = v + 1\n    print(\"inside:\", v)\n\nprint(\"outside:\", 3)\ntest(3)", expectedOutput: "outside: 3\ninside: 4" },
                        { id: "scope-medium-4", level: "medium", question: "Inside a function, read a global variable text = \"Hi\" and print each character. Show that the function can read it but not write to it.", starterCode: "text = \"Hi\"\n\ndef demo():\n    # read each character\n\nprint(\"outside:\", text)\ndemo()", hint: "Reading globals is allowed.", solution: "text = \"Hi\"\n\ndef demo():\n    for ch in text:\n        print(ch)\n\nprint(\"outside:\", text)\ndemo()", expectedOutput: "outside: Hi\nH\ni" },
                        { id: "scope-medium-5", level: "medium", question: "Write a function compare() that prints a global variable x and a local x (shadowed).", starterCode: "x = 50\n\ndef compare():\n    # local x\n    # print inside\n\n# print outside\ncompare()", hint: "Assign inside to create a local version.", solution: "x = 50\n\ndef compare():\n    x = 7\n    print(\"inside:\", x)\n\nprint(\"outside:\", x)\ncompare()", expectedOutput: "outside: 50\ninside: 7" },
                        { id: "scope-hard-1", level: "hard", question: "Debug this code: It tries to use a local variable outside the function.\ndef fn():\n    x = 4\n    print(\"inside:\", x)\n\nfn()\nprint(x)", starterCode: "def fn():\n    x = 4\n    print(\"inside:\", x)\n\nfn()\n# fix by removing the invalid print\n", hint: "Local variables cannot be used outside.", solution: "def fn():\n    x = 4\n    print(\"inside:\", x)\n\nfn()", expectedOutput: "inside: 4" },
                        { id: "scope-hard-2", level: "hard", question: "Predict the output of nested calls:\nx = 10\n\ndef outer():\n    x = 5\n    print(\"outer:\", x)\n    inner()\n\ndef inner():\n    print(\"inner:\", x)\n\nouter()", starterCode: "x = 10\n\ndef outer():\n    x = 5\n    print(\"outer:\", x)\n    inner()\n\ndef inner():\n    print(\"inner:\", x)\n\nouter()", hint: "inner() reads the global x.", solution: "x = 10\n\ndef outer():\n    x = 5\n    print(\"outer:\", x)\n    inner()\n\ndef inner():\n    print(\"inner:\", x)\n\nouter()", expectedOutput: "outer: 5\ninner: 10" },
                        { id: "scope-hard-3", level: "hard", question: "Write a function change(v) that modifies v inside the function and returns the new value. Show that the original is unchanged unless you use the returned value.", starterCode: "def change(v):\n    # modify v and return it\n\nx = 3\nprint(\"before:\", x)\nx2 = change(x)\nprint(\"after:\", x)\nprint(\"returned:\", x2)", hint: "Return the modified value.", solution: "def change(v):\n    v = v + 2\n    return v\n\nx = 3\nprint(\"before:\", x)\nx2 = change(x)\nprint(\"after:\", x)\nprint(\"returned:\", x2)", expectedOutput: "before: 3\nafter: 3\nreturned: 5" },
                        { id: "scope-hard-4", level: "hard", question: "Debug this: It expects local and global variables to mix incorrectly.\na = 5\n\ndef test():\n    print(a)\n    a = 3\n    print(a)\n\ntest()", starterCode: "a = 5\n\ndef test():\n    # fix by not assigning inside OR by moving assignment\n    # here, just remove the assignment for clarity\n    print(a)\n\ntest()", hint: "Assigning inside creates a local variable that shadows the global one.", solution: "a = 5\n\ndef test():\n    print(a)\n\ntest()", expectedOutput: "5" },
                        { id: "scope-hard-5", level: "hard", question: "Two functions use the same variable name locally. Show they do not interfere with each other.", starterCode: "def f1():\n    x = 2\n    print(\"f1:\", x)\n\ndef f2():\n    x = 9\n    print(\"f2:\", x)\n\nf1()\nf2()", hint: "Each function has its own local scope.", solution: "def f1():\n    x = 2\n    print(\"f1:\", x)\n\ndef f2():\n    x = 9\n    print(\"f2:\", x)\n\nf1()\nf2()", expectedOutput: "f1: 2\nf2: 9" }
                    ]
                },
                {
                    id: "scope-quiz",
                    title: "Unlock Chapter Quiz",
                    type: "quiz"
                }
            ]
        };
