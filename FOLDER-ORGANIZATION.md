# Folder Organization Guide

This document explains how the repository is organized by learning phases.

## 📂 Phase-Based Structure

### ✅ Phase 0: Foundations
**Location:** `phase-0-foundations/`
- `notes/time-complexity.md` - Big O notation and complexity analysis
- `notes/patterns.md` - Common DSA patterns
- `notes/data-structures-cheatsheet.md` - Quick reference guide
- `notes/introduction.md` - Introduction to DSA
- `notes/big-o-guide.md` - Comprehensive guide to Big O
- `notes/algorithm-design-strategies.md` - Design strategies
- `notes/problem-solving-approach.md` - Problem-solving techniques
- `notes/recursion-basics.md` - Recursion fundamentals
- `notes/debugging-and-testing.md` - Debugging tips
- `notes/code-optimization-techniques.md` - Optimization guide

---

### ✅ Phase 1: Linear Data Structures
**Location:** `phase-1-linear-data-structures/`
- `arrays/` - Array implementations (ready for content)
- `linked-lists/singlyLinkedList.js` - Singly linked list
- `stacks/arrayStack.js` - Stack using array
- `stacks/linkedlistStack.js` - Stack using linked list
- `stacks/postfixCalc.js` - Postfix calculator
- `queues/arrayQueue.js` - Queue using array
- `queues/linkedlistQueue.js` - Queue using linked list
- `queues/priorityQueue.js` - Priority queue
- `notes/introduction.md` - Phase introduction
- `notes/arrays-guide.md` - Arrays guide
- `notes/linked-lists-guide.md` - Linked lists guide
- `notes/stacks-guide.md` - Stacks guide
- `notes/queues-guide.md` - Queues guide

---

### ✅ Phase 2: Trees
**Location:** `phase-2-trees/`
- `trees/binaryTree.js` - Binary tree implementation
- `trees/AVLTree.js` - Self-balancing AVL tree
- `notes/introduction.md` - Phase introduction

---

### ✅ Phase 3: Hashing & Sets
**Location:** `phase-3-hashing-sets/`
- `hash-tables/hashtable.js` - Hash table implementation
- `set-operations/union.js` - Set union
- `set-operations/intersection.js` - Set intersection
- `set-operations/setDifference.js` - Set difference
- `set-operations/symmetricDifference.js` - Symmetric difference
- `notes/introduction.md` - Phase introduction

---

### ✅ Phase 4: Core Algorithms
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
- `notes/introduction.md` - Phase introduction

---

### 🔜 Phase 5: Recursion & Patterns
**Location:** `phase-5-recursion-patterns/`
- `recursion/` - Ready for recursion implementations
- `notes/introduction.md` - Phase introduction

---

### 🔜 Phase 6: Dynamic Programming
**Location:** `phase-6-dynamic-programming/`
- `dynamic-programming/` - Ready for DP implementations
- `notes/` - Ready for DP notes

---

### 🔜 Phase 7: Graphs
**Location:** `phase-7-graphs/`
- `graphs/` - Ready for graph implementations
- `notes/` - Ready for graph notes

---

### ✅ Phase 8: Practice & Problem Solving
**Location:** `phase-8-practice-problems/`
- `problems/` - Practice problems directory
- `notes/` - Practice notes

**Additional Problems:**
Root-level `problems/` folder also contains:
- `leetcode/` - LeetCode solutions
- `hackerrank/` - HackerRank solutions
- `custom-problems/` - Custom challenges

---

## 🎯 Single-Source Structure

The repository uses a **clean phase-based structure** to eliminate redundancy:

✅ **One location per topic** - Each implementation exists in exactly one place
✅ **Sequential learning path** - Follow phases 0 through 8 in order
✅ **Easy maintenance** - Update files in one location only
✅ **Clear progression** - Builds complexity gradually

---

## 📚 Recommended Learning Path

1. **Start with Phase 0** - Understand fundamentals and Big O
2. **Progress through Phases 1-4** - Master core data structures and algorithms
3. **Advance to Phases 5-7** - Learn advanced topics
4. **Practice in Phase 8** - Apply knowledge to real problems

---

## 📝 Adding New Content

When adding new implementations:

1. Identify the appropriate phase for the topic
2. Add files to that phase's folder
3. Update the phase's `notes/introduction.md` if needed
4. Keep implementations organized by topic within each phase

Example:
```bash
# Add a new graph algorithm to Phase 7
phase-7-graphs/graphs/dijkstra.js
```
