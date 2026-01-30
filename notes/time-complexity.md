# Time & Space Complexity

## What is Time Complexity?
Time complexity measures how the running time of an algorithm grows as the input size increases.

We use **Big O notation** to describe the worst-case scenario.

---

## Common Time Complexities

| Notation | Name | Example |
|--------|------|--------|
| O(1) | Constant | Accessing array element |
| O(log n) | Logarithmic | Binary Search |
| O(n) | Linear | Linear Search |
| O(n log n) | Linearithmic | Merge Sort |
| O(n²) | Quadratic | Bubble Sort |
| O(2ⁿ) | Exponential | Recursive Fibonacci |
| O(n!) | Factorial | Traveling Salesman |

---

## Time Complexity of Common Algorithms

### Sorting Algorithms
| Algorithm | Best | Average | Worst |
|--------|------|---------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) |
| Selection Sort | O(n²) | O(n²) | O(n²) |
| Insertion Sort | O(n) | O(n²) | O(n²) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) |

---

## Space Complexity
Space complexity measures the extra memory used by an algorithm.

### Examples:
- Bubble Sort → O(1)
- Merge Sort → O(n)
- Recursive calls → O(depth of recursion)

---

## Tips
- Always mention **worst-case complexity** in interviews
- Recursion usually adds extra space due to the call stack
- Prefer O(n log n) over O(n²) for large inputs
