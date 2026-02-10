# Complete Phase Mapping Guide

This document shows how the repository is organized into learning phases for optimal progression.

---

## 📂 Phase-Based Learning Structure

The repository uses a **single, clean phase-based structure** to organize all content. This eliminates redundancy and provides a clear learning path.

---

## 🎓 Phase Overview

### Phase 0: Foundations
**Location:** `phase-0-foundations/notes/`

Core theoretical knowledge needed before coding:
- `introduction.md` - Welcome and overview
- `big-o-guide.md` - Time and space complexity
- `time-complexity.md` - Big O notation deep dive
- `patterns.md` - Common DSA patterns
- `data-structures-cheatsheet.md` - Quick reference
- `algorithm-design-strategies.md` - Design approaches
- `problem-solving-approach.md` - How to solve problems
- `recursion-basics.md` - Recursion fundamentals
- `debugging-and-testing.md` - Testing strategies
- `code-optimization-techniques.md` - Optimization tips

**Focus:** Understanding complexity, patterns, and problem-solving strategies

---

### Phase 1: Linear Data Structures
**Location:** `phase-1-linear-data-structures/`

**Arrays:** `arrays/` (ready for implementations)
**Linked Lists:** `linked-lists/singlyLinkedList.js`
**Stacks:**
- `stacks/arrayStack.js` - Array-based implementation
- `stacks/linkedlistStack.js` - Linked list-based implementation
- `stacks/postfixCalc.js` - Practical application

**Queues:**
- `queues/arrayQueue.js` - Array-based implementation
- `queues/linkedlistQueue.js` - Linked list-based implementation
- `queues/priorityQueue.js` - Priority queue

**Notes:**
- `notes/introduction.md`
- `notes/arrays-guide.md`
- `notes/linked-lists-guide.md`
- `notes/stacks-guide.md`
- `notes/queues-guide.md`

**Focus:** LIFO, FIFO, sequential access patterns

---

### Phase 2: Trees
**Location:** `phase-2-trees/`

**Implementations:**
- `trees/binaryTree.js` - Basic binary tree
- `trees/AVLTree.js` - Self-balancing AVL tree

**Notes:**
- `notes/introduction.md` - Tree concepts and traversals

**Focus:** Hierarchical structures, recursion, tree traversals

---

### Phase 3: Hashing & Sets
**Location:** `phase-3-hashing-sets/`

**Hash Tables:**
- `hash-tables/hashtable.js` - Hash table implementation

**Set Operations:**
- `set-operations/union.js` - Set union
- `set-operations/intersection.js` - Set intersection
- `set-operations/setDifference.js` - Set difference
- `set-operations/symmetricDifference.js` - Symmetric difference

**Notes:**
- `notes/introduction.md` - Hashing concepts

**Focus:** O(1) lookups, collision handling, set theory

---

### Phase 4: Core Algorithms
**Location:** `phase-4-core-algorithms/`

**Searching:**
- `searching/bs.js` - Binary search (JavaScript)
- `searching/bs.py` - Binary search (Python)
- `searching/bs.cs` - Binary search (C#)
- `searching/README.md` - Documentation

**Sorting:**
- `sorting/bubblesort.js` - Bubble sort
- `sorting/insertionsort.js` - Insertion sort
- `sorting/mergesort.js` - Merge sort
- `sorting/qs.js` - Quick sort
- `sorting/ss.js` - Selection sort
- `sorting/README.md` - Documentation

**Notes:**
- `notes/introduction.md` - Algorithm fundamentals

**Focus:** Search efficiency, sorting strategies, divide-and-conquer

---

### Phase 5: Recursion Patterns
**Location:** `phase-5-recursion-patterns/`

**Structure:**
- `recursion/` - Ready for recursion implementations
- `notes/introduction.md` - Recursion patterns

**Focus:** Recursive thinking, base cases, backtracking

---

### Phase 6: Dynamic Programming
**Location:** `phase-6-dynamic-programming/`

**Structure:**
- `dynamic-programming/` - Ready for DP implementations
- `notes/` - Ready for DP theory

**Focus:** Memoization, tabulation, optimal substructure

---

### Phase 7: Graphs
**Location:** `phase-7-graphs/`

**Structure:**
- `graphs/` - Ready for graph implementations
- `notes/` - Ready for graph theory

**Focus:** Graph traversals (BFS/DFS), shortest paths, minimum spanning trees

---

### Phase 8: Practice & Problem Solving
**Location:** `phase-8-practice-problems/`

**Structure:**
- `problems/` - Practice problems directory
- `notes/` - Problem-solving notes

**Additional Problems Location:**
Root-level `problems/` folder contains:
- `leetcode/` - LeetCode solutions
- `hackerrank/` - HackerRank solutions
- `custom-problems/` - Custom challenges

**Focus:** Applying all learned concepts to real problems

---

## 📊 Content Summary

| Phase | Topic | Files | Status |
|-------|-------|-------|--------|
| Phase 0 | Foundations | 10 theory files | ✅ Complete |
| Phase 1 | Linear DS | 7 implementations | ✅ Complete |
| Phase 2 | Trees | 2 implementations | ✅ Complete |
| Phase 3 | Hashing & Sets | 5 implementations | ✅ Complete |
| Phase 4 | Core Algorithms | 10 implementations | ✅ Complete |
| Phase 5 | Recursion | 0 implementations | 🔜 Ready |
| Phase 6 | Dynamic Programming | 0 implementations | 🔜 Ready |
| Phase 7 | Graphs | 0 implementations | 🔜 Ready |
| Phase 8 | Practice | 3 folders | ✅ Complete |

**Total Implementations: 34 files**

---

## 🎯 Recommended Learning Path

### 1. Start with Phase 0
Read all theory files to understand:
- How to analyze time/space complexity
- Common patterns and when to use them
- Problem-solving strategies

### 2. Progress Through Phases 1-4
Master the fundamentals:
- Implement and understand each data structure
- Practice with each algorithm
- Complete exercises for each topic

### 3. Advance to Phases 5-7
Tackle complex topics:
- Build strong recursion skills
- Master dynamic programming
- Understand graph algorithms

### 4. Practice in Phase 8
Apply everything:
- Solve problems from multiple platforms
- Focus on problem patterns
- Time yourself to build speed

---

## 📝 Adding New Content

When adding new implementations:

### 1. Identify the Right Phase
- Arrays, Linked Lists, Stacks, Queues → Phase 1
- Trees, BST, AVL, Heap → Phase 2
- Hash Tables, Sets → Phase 3
- Searching, Sorting → Phase 4
- Recursion, Backtracking → Phase 5
- DP, Memoization → Phase 6
- Graphs, BFS, DFS, Dijkstra → Phase 7
- LeetCode, practice → Phase 8

### 2. Add to the Appropriate Folder
```bash
# Example: Adding graph implementation
phase-7-graphs/graphs/dijkstra.js

# Example: Adding recursion problem
phase-5-recursion-patterns/recursion/factorial.js
```

### 3. Update Documentation
- Add entry to phase's `notes/introduction.md`
- Update this mapping guide if needed

---

## ✅ Structure Benefits

✅ **Single Source of Truth** - Each file exists in exactly one location
✅ **Clear Learning Path** - Follow phases sequentially
✅ **Easy Maintenance** - Update files in one place only
✅ **Gradual Complexity** - Each phase builds on previous knowledge
✅ **Organized by Pedagogy** - Structure optimized for learning

---

## 🚀 Quick Start

```bash
# Clone and navigate
cd data-structures-and-algorithms

# Start learning from Phase 0
cd phase-0-foundations/notes
# Read all .md files

# Move to Phase 1
cd ../../phase-1-linear-data-structures
# Study and implement linear structures

# Continue through all phases...
```

---

## 📂 Original Folder → Phase Folder Mapping

### 🗂️ From `algorithms/` Folder

#### ✅ algorithms/searching/ → Phase 4
**Destination:** `phase-4-core-algorithms/searching/`
- `bs.js` → Binary Search (JavaScript)
- `bs.py` → Binary Search (Python)
- `bs.cs` → Binary Search (C Sharp)
- `README.md` → Documentation

**Why Phase 4?** Core searching algorithms are fundamental skills needed before advanced topics.

---

#### ✅ algorithms/sorting/ → Phase 4
**Destination:** `phase-4-core-algorithms/sorting/`
- `bubblesort.js` → Bubble Sort
- `insertionsort.js` → Insertion Sort
- `mergesort.js` → Merge Sort
- `qs.js` → Quick Sort
- `ss.js` → Selection Sort
- `README.md` → Documentation

**Why Phase 4?** Core sorting algorithms are essential for understanding algorithm efficiency.

---

#### ✅ algorithms/greedy/ → Phase 3
**Destination:** `phase-3-hashing-sets/set-operations/`
- `union.js` → Set Union
- `intersection.js` → Set Intersection
- `setDifference.js` → Set Difference
- `symmetricDifference.js` → Symmetric Difference

**Why Phase 3?** These greedy algorithms work on sets, which relate to hashing concepts.

---

#### 🔜 algorithms/recursion/ → Phase 5
**Destination:** `phase-5-recursion-patterns/recursion/`
- Currently empty (ready for content)

**Why Phase 5?** Recursion is needed before tackling dynamic programming.

---

#### 🔜 algorithms/dynamic-programming/ → Phase 6
**Destination:** `phase-6-dynamic-programming/dynamic-programming/`
- Currently empty (ready for content)

**Why Phase 6?** DP builds on recursion and memoization concepts.

---

### 🗂️ From `data-structures/` Folder

#### ✅ data-structures/arrays/ → Phase 1
**Destination:** `phase-1-linear-data-structures/arrays/`
- Currently empty (ready for array implementations)

**Why Phase 1?** Arrays are the most fundamental data structure.

---

#### ✅ data-structures/linked-lists/ → Phase 1
**Destination:** `phase-1-linear-data-structures/linked-lists/`
- `singlyLinkedList.js` → Singly Linked List

**Why Phase 1?** Linked lists introduce pointer concepts and dynamic memory.

---

#### ✅ data-structures/stacks/ → Phase 1
**Destination:** `phase-1-linear-data-structures/stacks/`
- `arrayStack.js` → Stack using Array
- `linkedlistStack.js` → Stack using Linked List
- `postfixCalc.js` → Postfix Calculator

**Why Phase 1?** Stacks are linear structures with LIFO behavior.

---

#### ✅ data-structures/queues/ → Phase 1
**Destination:** `phase-1-linear-data-structures/queues/`
- `arrayQueue.js` → Queue using Array
- `linkedlistQueue.js` → Queue using Linked List
- `priorityQueue.js` → Priority Queue

**Why Phase 1?** Queues are linear structures with FIFO behavior.

---

#### ✅ data-structures/trees/ → Phase 2
**Destination:** `phase-2-trees/trees/`
- `binaryTree.js` → Binary Tree
- `AVLTree.js` → AVL Tree (self-balancing)

**Why Phase 2?** Trees introduce non-linear, hierarchical data structures.

---

#### ✅ data-structures/hash-tables/ → Phase 3
**Destination:** `phase-3-hashing-sets/hash-tables/`
- `hashtable.js` → Hash Table implementation

**Why Phase 3?** Hash tables are the foundation for fast lookups and set operations.

---

#### 🔜 data-structures/graphs/ → Phase 7
**Destination:** `phase-7-graphs/graphs/`
- Currently empty (ready for graph implementations)

**Why Phase 7?** Graphs are advanced structures requiring knowledge of trees and traversals.

---

### 🗂️ From `notes/` Folder

#### ✅ notes/ → Phase 0
**Destination:** `phase-0-foundations/notes/`
- `time-complexity.md` → Big O Notation Guide
- `patterns.md` → Common DSA Patterns
- `data-structures-cheatsheet.md` → Quick Reference

**Why Phase 0?** Understanding complexity and patterns is foundational.

---

### 🗂️ From `problems/` Folder

#### ✅ problems/ → Phase 8
**Destination:** `phase-8-practice-problems/problems/`
- `leetcode/` → LeetCode solutions
- `hackerrank/` → HackerRank solutions
- `custom-problems/` → Custom challenges

**Why Phase 8?** Practice comes after learning all the concepts.

---

## 📊 Summary Table

| Original Folder | Files | Phase | Destination |
|----------------|-------|-------|-------------|
| algorithms/searching/ | 4 files (JS, Python, C Sharp) | Phase 4 | phase-4-core-algorithms/searching/ |
| algorithms/sorting/ | 6 files | Phase 4 | phase-4-core-algorithms/sorting/ |
| algorithms/greedy/ | 4 files | Phase 3 | phase-3-hashing-sets/set-operations/ |
| algorithms/recursion/ | 0 files | Phase 5 | phase-5-recursion-patterns/recursion/ |
| algorithms/dynamic-programming/ | 0 files | Phase 6 | phase-6-dynamic-programming/dynamic-programming/ |
| data-structures/arrays/ | 0 files | Phase 1 | phase-1-linear-data-structures/arrays/ |
| data-structures/linked-lists/ | 1 file | Phase 1 | phase-1-linear-data-structures/linked-lists/ |
| data-structures/stacks/ | 3 files | Phase 1 | phase-1-linear-data-structures/stacks/ |
| data-structures/queues/ | 3 files | Phase 1 | phase-1-linear-data-structures/queues/ |
| data-structures/trees/ | 2 files | Phase 2 | phase-2-trees/trees/ |
| data-structures/hash-tables/ | 1 file | Phase 3 | phase-3-hashing-sets/hash-tables/ |
| data-structures/graphs/ | 0 files | Phase 7 | phase-7-graphs/graphs/ |
| notes/ | 3 files | Phase 0 | phase-0-foundations/notes/ |
| problems/ | 3 folders | Phase 8 | phase-8-practice-problems/problems/ |

---

## ✅ Status by Phase

- **Phase 0**: ✅ Complete (3 files)
- **Phase 1**: ✅ Complete (7 files)
- **Phase 2**: ✅ Complete (2 files)
- **Phase 3**: ✅ Complete (5 files)
- **Phase 4**: ✅ Complete (10 files)
- **Phase 5**: 🔜 Ready for recursion content
- **Phase 6**: 🔜 Ready for dynamic programming content
- **Phase 7**: 🔜 Ready for graph content
- **Phase 8**: ✅ Complete (3 problem folders)

**Total Files Organized: 27 implementation files + 3 documentation files = 30 files**

---

## 🎯 How to Use This Mapping

### When Learning:
Follow the phases sequentially:
```bash
cd phase-0-foundations/notes     # Start here
cd ../phase-1-linear-data-structures
cd ../phase-2-trees
# ... and so on
```

### When Adding New Content:
1. Add to the original folder first
2. Copy to the appropriate phase folder
3. Keep both structures in sync

### Example - Adding a new recursion file:
```bash
# 1. Create in original location
algorithms/recursion/factorial.js

# 2. Copy to phase folder
phase-5-recursion-patterns/recursion/factorial.js
```

---

## 📁 Both Structures Are Valid!

You can use either:
- **Original structure** (`algorithms/`, `data-structures/`) - Traditional organization
- **Phase structure** (`phase-0-foundations/`, etc.) - Learning path organization

Both contain the same files! Choose based on your needs.
