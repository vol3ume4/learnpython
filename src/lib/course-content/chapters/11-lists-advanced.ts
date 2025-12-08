import { Chapter } from '../../types';

export const listsAdvancedChapter: Chapter = {
    id: "lists-advanced",
    title: "Lists – Advanced",
    description: "List comprehensions, sorting, and powerful list methods",
    sections: [
        {
            id: "theory",
            title: "Advanced List Techniques",
            type: "theory",
            content: `Now that you understand basic lists, it's time to unlock their full power. Python provides elegant ways to transform, sort, and manipulate lists that will make your code cleaner and more efficient.

## List Comprehensions

List comprehensions let you create new lists by transforming or filtering existing data in a single, readable line:

\`\`\`python
# Traditional way
squares = []
for x in range(5):
    squares.append(x ** 2)

# List comprehension way
squares = [x ** 2 for x in range(5)]
\`\`\`

The syntax is: \`[expression for item in iterable if condition]\`

You can add conditions to filter:
\`\`\`python
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]
\`\`\`

## Sorting Lists

Python offers two ways to sort:

- \`list.sort()\` - sorts the list **in place** (modifies original)
- \`sorted(list)\` - returns a **new sorted list** (keeps original)

\`\`\`python
numbers = [3, 1, 4, 1, 5]
numbers.sort()          # numbers is now [1, 1, 3, 4, 5]

original = [3, 1, 4]
new_list = sorted(original)  # original unchanged, new_list is [1, 3, 4]
\`\`\`

Use \`reverse=True\` for descending order, and \`key=\` for custom sorting:
\`\`\`python
words = ["apple", "pie", "a"]
sorted(words, key=len)  # Sort by length: ["a", "pie", "apple"]
\`\`\`

## Essential List Methods

| Method | What it does |
|--------|-------------|
| \`append(x)\` | Add x to the end |
| \`extend(list)\` | Add all items from another list |
| \`insert(i, x)\` | Insert x at position i |
| \`pop()\` | Remove and return last item |
| \`pop(i)\` | Remove and return item at index i |
| \`remove(x)\` | Remove first occurrence of x |
| \`count(x)\` | Count occurrences of x |
| \`index(x)\` | Find index of first x |
| \`clear()\` | Remove all items |

These methods give you precise control over list contents. Master them and you'll handle any list manipulation task with ease.`
        },
        {
            id: "examples",
            title: "Code Examples",
            type: "examples",
            examples: [
                {
                    code: `# List Comprehension - Squares
squares = [x ** 2 for x in range(1, 6)]
print(squares)`,
                    explanation: "Creates [1, 4, 9, 16, 25] - squares of 1 through 5 in one line."
                },
                {
                    code: `# List Comprehension with Condition
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [n for n in numbers if n % 2 == 0]
print(evens)`,
                    explanation: "Filters to keep only even numbers: [2, 4, 6, 8, 10]"
                },
                {
                    code: `# Sorting in Ascending Order
scores = [85, 92, 78, 95, 88]
scores.sort()
print(scores)`,
                    explanation: "Sorts the list in place: [78, 85, 88, 92, 95]"
                },
                {
                    code: `# Sorting in Descending Order
scores = [85, 92, 78, 95, 88]
sorted_desc = sorted(scores, reverse=True)
print(sorted_desc)`,
                    explanation: "Returns new list sorted high to low: [95, 92, 88, 85, 78]"
                },
                {
                    code: `# Sort by Custom Key (string length)
words = ["python", "is", "awesome"]
by_length = sorted(words, key=len)
print(by_length)`,
                    explanation: "Sorts by word length: ['is', 'python', 'awesome']"
                },
                {
                    code: `# append vs extend
list1 = [1, 2, 3]
list1.append(4)
print("After append:", list1)

list2 = [1, 2, 3]
list2.extend([4, 5, 6])
print("After extend:", list2)`,
                    explanation: "append adds one item; extend adds all items from another list."
                },
                {
                    code: `# insert and pop
tasks = ["email", "meeting", "code"]
tasks.insert(1, "coffee")  # Insert at index 1
print("After insert:", tasks)

removed = tasks.pop()  # Remove last item
print("Popped:", removed)
print("After pop:", tasks)`,
                    explanation: "insert adds at specific position; pop removes and returns the last item."
                },
                {
                    code: `# Flattening a 2D list
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [num for row in matrix for num in row]
print(flat)`,
                    explanation: "Nested comprehension flattens to: [1, 2, 3, 4, 5, 6]"
                }
            ]
        },
        {
            id: "exercises",
            title: "Practice Exercises",
            type: "exercises",
            exercises: [
                // List Comprehensions - Easy
                {
                    id: "lc_e_1",
                    level: "easy",
                    question: "Create a list of squares from 1 to 5 using list comprehension. Print the result.",
                    starterCode: `# Create squares of 1, 2, 3, 4, 5 using list comprehension
squares = # your code here
print(squares)`,
                    hint: "Use [x ** 2 for x in range(1, 6)]",
                    solution: `squares = [x ** 2 for x in range(1, 6)]
print(squares)`,
                    expectedOutput: "[1, 4, 9, 16, 25]"
                },
                {
                    id: "lc_e_2",
                    level: "easy",
                    question: "Given numbers = [1, 2, 3, 4, 5, 6, 7, 8], create a new list with only the even numbers using list comprehension. Print the result.",
                    starterCode: `numbers = [1, 2, 3, 4, 5, 6, 7, 8]
# Create list of even numbers
evens = # your code here
print(evens)`,
                    hint: "Use a condition: [n for n in numbers if n % 2 == 0]",
                    solution: `numbers = [1, 2, 3, 4, 5, 6, 7, 8]
evens = [n for n in numbers if n % 2 == 0]
print(evens)`,
                    expectedOutput: "[2, 4, 6, 8]"
                },
                // List Comprehensions - Medium
                {
                    id: "lc_m_1",
                    level: "medium",
                    question: "Given words = ['hello', 'world', 'python'], create a list of their lengths using list comprehension. Print the result.",
                    starterCode: `words = ['hello', 'world', 'python']
# Create list of lengths
lengths = # your code here
print(lengths)`,
                    hint: "Use len() inside the comprehension: [len(w) for w in words]",
                    solution: `words = ['hello', 'world', 'python']
lengths = [len(w) for w in words]
print(lengths)`,
                    expectedOutput: "[5, 5, 6]"
                },
                {
                    id: "lc_m_2",
                    level: "medium",
                    question: "Given numbers = [10, 20, 30, 40, 50], find the mean and create a list of numbers greater than the mean. Print the result.",
                    starterCode: `numbers = [10, 20, 30, 40, 50]
mean = sum(numbers) / len(numbers)
# Create list of numbers > mean
above_mean = # your code here
print(above_mean)`,
                    hint: "Filter with condition: [n for n in numbers if n > mean]",
                    solution: `numbers = [10, 20, 30, 40, 50]
mean = sum(numbers) / len(numbers)
above_mean = [n for n in numbers if n > mean]
print(above_mean)`,
                    expectedOutput: "[40, 50]"
                },
                // List Comprehensions - Hard
                {
                    id: "lc_h_1",
                    level: "hard",
                    question: "Flatten the 2D list matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] into a 1D list using list comprehension. Print the result.",
                    starterCode: `matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
# Flatten to 1D list
flat = # your code here
print(flat)`,
                    hint: "Use nested comprehension: [item for row in matrix for item in row]",
                    solution: `matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [item for row in matrix for item in row]
print(flat)`,
                    expectedOutput: "[1, 2, 3, 4, 5, 6, 7, 8, 9]"
                },
                // Sorting - Easy
                {
                    id: "sort_e_1",
                    level: "easy",
                    question: "Sort the list numbers = [64, 25, 12, 22, 11] in ascending order and print it.",
                    starterCode: `numbers = [64, 25, 12, 22, 11]
# Sort in ascending order
numbers.sort()
print(numbers)`,
                    hint: "Use numbers.sort() to sort in place",
                    solution: `numbers = [64, 25, 12, 22, 11]
numbers.sort()
print(numbers)`,
                    expectedOutput: "[11, 12, 22, 25, 64]"
                },
                {
                    id: "sort_e_2",
                    level: "easy",
                    question: "Sort the list fruits = ['banana', 'apple', 'cherry'] alphabetically and print it.",
                    starterCode: `fruits = ['banana', 'apple', 'cherry']
# Sort alphabetically
fruits.sort()
print(fruits)`,
                    hint: "Strings sort alphabetically by default with sort()",
                    solution: `fruits = ['banana', 'apple', 'cherry']
fruits.sort()
print(fruits)`,
                    expectedOutput: "['apple', 'banana', 'cherry']"
                },
                // Sorting - Medium
                {
                    id: "sort_m_1",
                    level: "medium",
                    question: "Sort numbers = [5, 2, 9, 1, 7] in descending order using sorted() with reverse parameter. Print the result.",
                    starterCode: `numbers = [5, 2, 9, 1, 7]
# Sort descending using sorted()
result = # your code here
print(result)`,
                    hint: "Use sorted(numbers, reverse=True)",
                    solution: `numbers = [5, 2, 9, 1, 7]
result = sorted(numbers, reverse=True)
print(result)`,
                    expectedOutput: "[9, 7, 5, 2, 1]"
                },
                {
                    id: "sort_m_2",
                    level: "medium",
                    question: "Sort words = ['python', 'is', 'awesome', 'a'] by their length (shortest first). Print the result.",
                    starterCode: `words = ['python', 'is', 'awesome', 'a']
# Sort by length
result = # your code here
print(result)`,
                    hint: "Use sorted(words, key=len)",
                    solution: `words = ['python', 'is', 'awesome', 'a']
result = sorted(words, key=len)
print(result)`,
                    expectedOutput: "['a', 'is', 'python', 'awesome']"
                },
                // Sorting - Hard
                {
                    id: "sort_h_1",
                    level: "hard",
                    question: "Sort people = [('Alice', 30), ('Bob', 25), ('Charlie', 35)] by age (second element). Print the result.",
                    starterCode: `people = [('Alice', 30), ('Bob', 25), ('Charlie', 35)]
# Sort by age (index 1)
result = # your code here
print(result)`,
                    hint: "Use key=lambda x: x[1] to sort by the second element",
                    solution: `people = [('Alice', 30), ('Bob', 25), ('Charlie', 35)]
result = sorted(people, key=lambda x: x[1])
print(result)`,
                    expectedOutput: "[('Bob', 25), ('Alice', 30), ('Charlie', 35)]"
                },
                // List Methods - Easy
                {
                    id: "lm_e_1",
                    level: "easy",
                    question: "Add the number 4 to the end of numbers = [1, 2, 3] using append. Print the result.",
                    starterCode: `numbers = [1, 2, 3]
# Add 4 to the end
numbers.append(4)
print(numbers)`,
                    hint: "Use numbers.append(4)",
                    solution: `numbers = [1, 2, 3]
numbers.append(4)
print(numbers)`,
                    expectedOutput: "[1, 2, 3, 4]"
                },
                {
                    id: "lm_e_2",
                    level: "easy",
                    question: "Remove the first occurrence of 'banana' from fruits = ['apple', 'banana', 'cherry', 'banana']. Print the result.",
                    starterCode: `fruits = ['apple', 'banana', 'cherry', 'banana']
# Remove first 'banana'
fruits.remove('banana')
print(fruits)`,
                    hint: "Use fruits.remove('banana')",
                    solution: `fruits = ['apple', 'banana', 'cherry', 'banana']
fruits.remove('banana')
print(fruits)`,
                    expectedOutput: "['apple', 'cherry', 'banana']"
                },
                // List Methods - Medium
                {
                    id: "lm_m_1",
                    level: "medium",
                    question: "Insert 'NEW' at index 2 in items = ['a', 'b', 'c', 'd']. Print the result.",
                    starterCode: `items = ['a', 'b', 'c', 'd']
# Insert 'NEW' at index 2
items.insert(2, 'NEW')
print(items)`,
                    hint: "Use items.insert(2, 'NEW')",
                    solution: `items = ['a', 'b', 'c', 'd']
items.insert(2, 'NEW')
print(items)`,
                    expectedOutput: "['a', 'b', 'NEW', 'c', 'd']"
                },
                {
                    id: "lm_m_2",
                    level: "medium",
                    question: "Merge list2 = [4, 5, 6] into list1 = [1, 2, 3] using extend. Print list1.",
                    starterCode: `list1 = [1, 2, 3]
list2 = [4, 5, 6]
# Extend list1 with list2
list1.extend(list2)
print(list1)`,
                    hint: "Use list1.extend(list2)",
                    solution: `list1 = [1, 2, 3]
list2 = [4, 5, 6]
list1.extend(list2)
print(list1)`,
                    expectedOutput: "[1, 2, 3, 4, 5, 6]"
                },
                // List Methods - Hard
                {
                    id: "lm_h_1",
                    level: "hard",
                    question: "Pop all elements from stack = [1, 2, 3] one by one and store them in popped = []. Print popped (should be in reverse order).",
                    starterCode: `stack = [1, 2, 3]
popped = []
# Pop all elements into popped list
while stack:
    popped.append(stack.pop())
print(popped)`,
                    hint: "Use a while loop with stack.pop() and append to popped",
                    solution: `stack = [1, 2, 3]
popped = []
while stack:
    popped.append(stack.pop())
print(popped)`,
                    expectedOutput: "[3, 2, 1]"
                }
            ]
        },
        {
            id: "quiz",
            title: "Chapter Quiz",
            type: "quiz"
        }
    ]
};





