# Complete Phase Mapping Guide

This document shows exactly how files from the original `algorithms/` and `data-structures/` folders are organized into learning phases.

---

## 📂 Original Folder → Phase Folder Mapping

### 🗂️ From `algorithms/` Folder

#### ✅ algorithms/searching/ → Phase 4
**Destination:** `phase-4-core-algorithms/searching/`
- `bs.js` → Binary Search (JavaScript)
- `bs.py` → Binary Search (Python)
- `bs.cs` → Binary Search (C#)
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
| algorithms/searching/ | 4 files (JS, Python, C#) | Phase 4 | phase-4-core-algorithms/searching/ |
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
