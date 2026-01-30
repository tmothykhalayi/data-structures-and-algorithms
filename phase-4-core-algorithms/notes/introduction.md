# Phase 4: Core Algorithms

## Welcome to Core Algorithms

Master the fundamental algorithms that form the foundation of computer science: sorting and searching. These algorithms are essential for technical interviews and real-world applications.

---

## What You'll Learn

### 1. **Searching Algorithms**
- Linear Search - O(n)
- Binary Search - O(log n)
- Binary search variations
- Search in rotated arrays
- Search in 2D matrices

### 2. **Sorting Algorithms**
- Bubble Sort - O(n²)
- Selection Sort - O(n²)
- Insertion Sort - O(n²)
- Merge Sort - O(n log n)
- Quick Sort - O(n log n) average
- Comparison of sorting algorithms

---

## Why Core Algorithms Matter

Understanding these algorithms is crucial because:

1. **Interview Fundamentals**: Most asked in coding interviews
2. **Problem Solving**: Many problems reduce to sorting/searching
3. **Performance**: Know when to use which algorithm
4. **Algorithm Design**: Learn divide-and-conquer, recursion patterns
5. **Real-World Use**: Databases, search engines, data processing

---

## Study Roadmap

### Week 1: Searching
- Day 1-2: Linear and binary search basics
- Day 3-4: Binary search variations
- Day 5-7: Advanced search problems

### Week 2-3: Sorting
- Day 1-2: Simple sorts (bubble, selection, insertion)
- Day 3-4: Merge sort (divide and conquer)
- Day 5-6: Quick sort (partitioning)
- Day 7-10: Sorting problems and applications

---

## Algorithm Complexity Comparison

### Searching:
| Algorithm | Time | Space | Notes |
|-----------|------|-------|-------|
| Linear Search | O(n) | O(1) | Unsorted data |
| Binary Search | O(log n) | O(1) | Sorted data required |

### Sorting:
| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | No |

---

## Common Patterns

### Binary Search Patterns:
1. Find exact value
2. Find first/last occurrence
3. Find insertion position
4. Search in rotated array
5. Peak finding
6. Square root

### Sorting Use Cases:
1. Sort then search
2. Merge intervals
3. Meeting rooms
4. Sorting by custom criteria
5. K largest/smallest elements

---

## Resources in This Phase

### Implementation Files:
- **Searching**:
  - [bs.js](../searching/bs.js)
  - [bs.py](../searching/bs.py)
  - [bs.cs](../searching/bs.cs)
  - [README.md](../searching/README.md)
  
- **Sorting**:
  - [bubblesort.js](../sorting/bubblesort.js)
  - [insertionsort.js](../sorting/insertionsort.js)
  - [mergesort.js](../sorting/mergesort.js)
  - [qs.js](../sorting/qs.js) (Quick Sort)
  - [ss.js](../sorting/ss.js) (Selection Sort)
  - [README.md](../sorting/README.md)

### Study Notes:
- [Searching Guide](searching-guide.md) - All search algorithms
- [Sorting Guide](sorting-guide.md) - All sorting algorithms
- [Binary Search Patterns](binary-search-patterns.md) - Advanced patterns

---

## Interview Tips

**Most Common**:
- Binary search (and all variations)
- Merge sort
- Quick sort
- Search in rotated sorted array
- Kth largest element
- Merge intervals

**What Interviewers Look For**:
- Can you implement from scratch?
- Do you know time/space complexity?
- Can you choose the right algorithm?
- Can you handle edge cases?

---

## Practice Strategy

1. Implement each algorithm from scratch
2. Understand time/space complexity
3. Solve binary search variations (10-15 problems)
4. Practice sorting problems (10-15 problems)
5. Compare and contrast algorithms

---

**Next**: Move to Phase 5 (Recursion Patterns) to dive deeper into recursive algorithms!
