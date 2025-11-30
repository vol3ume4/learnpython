import { Chapter } from '../../types';

export const mathOperatorsChapter: Chapter = {
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
                { id: "math-easy-1", level: "easy", question: "Calculate and print the sum of 15 and 27.", starterCode: "# Calculate sum\nprint()", hint: "Use the + operator.", solution: "result = 15 + 27\nprint(result)", expectedOutput: "42" },
                { id: "math-easy-2", level: "easy", question: "Calculate 8 squared (8 to the power of 2) and print it.", starterCode: "# Calculate power\nprint()", hint: "Use the ** operator.", solution: "result = 8 ** 2\nprint(result)", expectedOutput: "64" },
                { id: "math-easy-3", level: "easy", question: "Print the result of 100 minus 37.", starterCode: "# Subtract\nprint()", hint: "Use the - operator.", solution: "result = 100 - 37\nprint(result)", expectedOutput: "63" },
                { id: "math-easy-4", level: "easy", question: "Multiply 6 by 7 and print the result.", starterCode: "# Multiply\nprint()", hint: "Use the * operator.", solution: "result = 6 * 7\nprint(result)", expectedOutput: "42" },
                { id: "math-easy-5", level: "easy", question: "Divide 20 by 4 and print the result.", starterCode: "# Divide\nprint()", hint: "Use the / operator.", solution: "result = 20 / 4\nprint(result)", expectedOutput: "5.0" },
                { id: "math-medium-1", level: "medium", question: "Calculate the area of a rectangle with width 12 and height 8. Print the result.", starterCode: "width = 12\nheight = 8\n# Calculate area\nprint()", hint: "Area = width * height.", solution: "width = 12\nheight = 8\narea = width * height\nprint(area)", expectedOutput: "96" },
                { id: "math-medium-2", level: "medium", question: "Calculate 2 to the power of 5 and print it.", starterCode: "# Calculate power\nprint()", hint: "Use the ** operator.", solution: "result = 2 ** 5\nprint(result)", expectedOutput: "32" },
                { id: "math-medium-3", level: "medium", question: "Find the remainder when 17 is divided by 5.", starterCode: "# Find remainder\nprint()", hint: "Use the % operator.", solution: "result = 17 % 5\nprint(result)", expectedOutput: "2" },
                { id: "math-medium-4", level: "medium", question: "Perform integer division of 25 by 4 and print the result.", starterCode: "# Integer division\nprint()", hint: "Use the // operator.", solution: "result = 25 // 4\nprint(result)", expectedOutput: "6" },
                { id: "math-medium-5", level: "medium", question: "Calculate (10 + 5) * 3 and print the result.", starterCode: "# Calculate\nprint()", hint: "Use parentheses for order of operations.", solution: "result = (10 + 5) * 3\nprint(result)", expectedOutput: "45" },
                { id: "math-hard-1", level: "hard", question: "Calculate the average of three numbers: 10, 20, and 30. Print the result.", starterCode: "a = 10\nb = 20\nc = 30\n# Calculate average\nprint()", hint: "Average = sum / count.", solution: "a = 10\nb = 20\nc = 30\navg = (a + b + c) / 3\nprint(avg)", expectedOutput: "20.0" },
                { id: "math-hard-2", level: "hard", question: "Calculate the perimeter of a square with side length 7.", starterCode: "side = 7\n# Calculate perimeter\nprint()", hint: "Perimeter = 4 * side.", solution: "side = 7\nperimeter = 4 * side\nprint(perimeter)", expectedOutput: "28" },
                { id: "math-hard-3", level: "hard", question: "Convert temperature from Celsius to Fahrenheit using the formula: F = C * 9/5 + 32. Use C = 25.", starterCode: "celsius = 25\n# Convert to Fahrenheit\nprint()", hint: "F = C * 9/5 + 32.", solution: "celsius = 25\nfahrenheit = celsius * 9/5 + 32\nprint(fahrenheit)", expectedOutput: "77.0" },
                { id: "math-hard-4", level: "hard", question: "Calculate compound interest: principal=1000, rate=5%, time=2 years. Formula: amount = principal * (1 + rate/100) ** time. Print the amount.", starterCode: "principal = 1000\nrate = 5\ntime = 2\n# Calculate amount\nprint()", hint: "Use the ** operator for exponentiation.", solution: "principal = 1000\nrate = 5\ntime = 2\namount = principal * (1 + rate/100) ** time\nprint(amount)", expectedOutput: "1102.5" },
                { id: "math-hard-5", level: "hard", question: "Find how many times 7 goes into 50 (integer division) and what's left over (remainder). Print both on separate lines.", starterCode: "# Calculate quotient and remainder\nprint()\nprint()", hint: "Use // for quotient and % for remainder.", solution: "quotient = 50 // 7\nremainder = 50 % 7\nprint(quotient)\nprint(remainder)", expectedOutput: "7\n1" }
            ]
        },
        {
            id: "math-quiz",
            title: "Unlock Chapter Quiz",
            type: "quiz"
        }
    ]
};
