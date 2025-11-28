
export type Exercise = {
    id: string;
    question: string;
    starterCode: string;
    hint: string;
    solution: string;
    expectedOutput: string; // Simple string matching for this PoC
};

export type Section = {
    id: string;
    title: string;
    type: 'theory' | 'example' | 'exercise';
    content: string; // Markdown supported
    code?: string; // For examples
    exercise?: Exercise;
};

export type Chapter = {
    id: string;
    title: string;
    description: string;
    sections: Section[];
};

export const courseContent: Chapter = {
    id: "variables-math",
    title: "Chapter 1: Variables & Math",
    description: "Learn how to store data and perform basic calculations in Python.",
    sections: [
        {
            id: "intro-vars",
            title: "What is a Variable?",
            type: "theory",
            content: `
### Storing Information
Think of a **variable** as a labeled box where you can store information. 

In Python, you create a variable by giving it a name and using the \`=\` sign to assign a value.

\`\`\`python
score = 10
name = "Alex"
\`\`\`

Here, we stored the number \`10\` in a box labeled \`score\` and the text \`"Alex"\` in a box labeled \`name\`.
      `
        },
        {
            id: "example-vars",
            title: "Example: Using Variables",
            type: "example",
            content: "See how we define variables and print them out.",
            code: `player_name = "Sam"
player_score = 50

print(player_name)
print(player_score)`
        },
        {
            id: "ex-1",
            title: "Exercise: Create Your Own",
            type: "exercise",
            content: "Create a variable named `my_age` and set it to your age (or any number). Then print it.",
            exercise: {
                id: "ex-1-task",
                question: "Define `my_age` and print it.",
                starterCode: "# Create your variable below\n\n# Print it\n",
                hint: "Use the structure: variable_name = value",
                solution: "my_age = 25\nprint(my_age)",
                expectedOutput: "25" // We'll need a smarter validator later, but this works for fixed inputs
            }
        },
        {
            id: "intro-math",
            title: "Math Operators",
            type: "theory",
            content: `
### Basic Math
Python can act like a calculator.
- \`+\` adds numbers
- \`-\` subtracts
- \`*\` multiplies
- \`/\` divides

\`\`\`python
total = 10 + 5  # 15
diff = 10 - 2   # 8
prod = 3 * 4    # 12
\`\`\`
      `
        },
        {
            id: "ex-2",
            title: "Exercise: Calculate the Area",
            type: "exercise",
            content: "Calculate the area of a rectangle with `width = 5` and `height = 10`. Store the result in a variable called `area` and print it.",
            exercise: {
                id: "ex-2-task",
                question: "Calculate and print the area.",
                starterCode: "width = 5\nheight = 10\n\n# Calculate area\n\n# Print area",
                hint: "Area is width multiplied by height. Use the * symbol.",
                solution: "width = 5\nheight = 10\narea = width * height\nprint(area)",
                expectedOutput: "50"
            }
        }
    ]
};
