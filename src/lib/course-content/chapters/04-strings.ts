import { Chapter } from '../../types';

export const stringsChapter: Chapter = {
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
        },
        {
            id: "strings-quiz",
            title: "Unlock Chapter Quiz",
            type: "quiz"
        }
    ]
};
