# Folder Organization Guide

This document explains how the repository is organized by learning phases.

## 📂 Phase-Based Structure

### ✅ Phase 0: Foundations
**Location:** `phase-0-foundations/`
- `notes/time-complexity.md` - Big O notation and complexity analysis
- `notes/patterns.md` - Common DSA patterns
- `notes/data-structures-cheatsheet.md` - Quick reference guide

**Original:** Also available in `notes/`

---

### ✅ Phase 1: Linear Data Structures
**Location:** `phase-1-linear-data-structures/`
- `arrays/` - Array implementations (empty, ready for content)
- `linked-lists/singlyLinkedList.js` - Singly linked list
- `stacks/arrayStack.js` - Stack using array
- `stacks/linkedlistStack.js` - Stack using linked list
- `stacks/postfixCalc.js` - Postfix calculator
- `queues/arrayQueue.js` - Queue using array
- `queues/linkedlistQueue.js` - Queue using linked list
- `queues/priorityQueue.js` - Priority queue

**Original:** Also available in `data-structures/`

---

### ✅ Phase 2: Trees
**Location:** `phase-2-trees/`
- `trees/binaryTree.js` - Binary tree implementation
- `trees/AVLTree.js` - Self-balancing AVL tree

**Original:** Also available in `data-structures/trees/`

---

### ✅ Phase 3: Hashing & Sets
**Location:** `phase-3-hashing-sets/`
- `hash-tables/hashtable.js` - Hash table implementation
- `set-operations/union.js` - Set union
- `set-operations/intersection.js` - Set intersection
- `set-operations/setDifference.js` - Set difference
- `set-operations/symmetricDifference.js` - Symmetric difference

**Original:** Hash tables in `data-structures/hash-tables/`, Sets in `algorithms/greedy/`

---

### ✅ Phase 4: Core Algorithms
**Location:** `phase-4-core-algorithms/`

**Searching:**
- `searching/bs.js` - Binary search (JavaScript)
- `searching/bs.py` - Binary search (Python)
- `searching/bs.r` - Binary search (R)
- `searching/README.md`

**Sorting:**
- `sorting/bubblesort.js` - Bubble sort
- `sorting/insertionsort.js` - Insertion sort
- `sorting/mergesort.js` - Merge sort
- `sorting/qs.js` - Quick sort
- `sorting/ss.js` - Selection sort
- `sorting/README.md`

**Original:** Also available in `algorithms/searching/` and `algorithms/sorting/`

---

### 🔜 Phase 5: Recursion & Patterns
**Location:** `phase-5-recursion-patterns/`
- `recursion/` - Ready for recursion implementations

**Original:** `algorithms/recursion/` (currently empty)

---

### 🔜 Phase 6: Dynamic Programming
**Location:** `phase-6-dynamic-programming/`
- `dynamic-programming/` - Ready for DP implementations

**Original:** `algorithms/dynamic-programming/` (currently empty)

---

### 🔜 Phase 7: Graphs
**Location:** `phase-7-graphs/`
- `graphs/` - Ready for graph implementations

**Original:** `data-structures/graphs/` (currently empty)

---

### ✅ Phase 8: Practice & Problem Solving
**Location:** `phase-8-practice-problems/`
- `problems/leetcode/` - LeetCode solutions
- `problems/hackerrank/` - HackerRank solutions
- `problems/custom-problems/` - Custom challenges

**Original:** Also available in `problems/`

---

## 🔄 Dual Structure

The repository maintains **both** organizational structures:

1. **Phase-based** (`phase-0-foundations/`, `phase-1-linear-data-structures/`, etc.)
   - For sequential learning
   - Matches the roadmap in README
   - Best for beginners

2. **Traditional** (`data-structures/`, `algorithms/`, `problems/`, `notes/`)
   - For quick reference
   - Familiar structure
   - Backward compatibility

**Both contain the same files** - use whichever structure works best for your learning style!

---

## 🎯 Recommended Usage

**For Learning:**
→ Follow the phase folders sequentially (Phase 0 → Phase 8)

**For Reference:**
→ Use the traditional folders to quickly find specific topics

**For Practice:**
→ Use Phase 8 or the `problems/` folder

---

## 📝 Adding New Content

When adding new implementations:

1. Add to the **traditional folder** first
2. Copy to the appropriate **phase folder**
3. Update both structures to keep them in sync

Example:
```bash
# Add to traditional structure
data-structures/graphs/graph.js

# Copy to phase structure
phase-7-graphs/graphs/graph.js
```
