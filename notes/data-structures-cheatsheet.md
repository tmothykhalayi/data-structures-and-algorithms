# Data Structures Cheat Sheet

## Arrays
**Description:** Fixed-size, contiguous memory structure

**Time Complexity:**
- Access: O(1)
- Search: O(n)
- Insert/Delete at end: O(1)
- Insert/Delete at beginning/middle: O(n)

**Space Complexity:** O(n)

**Use Cases:**
- When you need fast random access
- When size is known beforehand
- Implementing other data structures

---

## Linked Lists
**Description:** Dynamic size, nodes connected via pointers

**Time Complexity:**
- Access: O(n)
- Search: O(n)
- Insert/Delete at known position: O(1)
- Insert/Delete (need to search): O(n)

**Space Complexity:** O(n) - extra memory for pointers

**Use Cases:**
- When size is unknown or changes frequently
- Implementing stacks, queues
- When insertion/deletion is frequent

**Types:**
- Singly Linked List
- Doubly Linked List
- Circular Linked List

---

## Stacks
**Description:** LIFO (Last In, First Out) structure

**Time Complexity:**
- Push: O(1)
- Pop: O(1)
- Peek: O(1)

**Space Complexity:** O(n)

**Use Cases:**
- Function call stack
- Undo mechanisms
- Expression evaluation (postfix, infix)
- Backtracking algorithms

**Implementation:** Array or Linked List

---

## Queues
**Description:** FIFO (First In, First Out) structure

**Time Complexity:**
- Enqueue: O(1)
- Dequeue: O(1)
- Peek: O(1)

**Space Complexity:** O(n)

**Use Cases:**
- BFS traversal
- Task scheduling
- Print queue
- Buffering

**Types:**
- Simple Queue
- Circular Queue
- Priority Queue
- Double-ended Queue (Deque)

---

## Hash Tables
**Description:** Key-value pairs with fast lookups using hash function

**Time Complexity:**
- Insert: O(1) average, O(n) worst
- Search: O(1) average, O(n) worst
- Delete: O(1) average, O(n) worst

**Space Complexity:** O(n)

**Use Cases:**
- Fast lookups
- Caching
- Removing duplicates
- Frequency counting

**Collision Handling:**
- Chaining (linked lists)
- Open addressing (linear probing, quadratic probing)

---

## Binary Trees
**Description:** Hierarchical structure where each node has at most two children

**Time Complexity (BST - balanced):**
- Search: O(log n)
- Insert: O(log n)
- Delete: O(log n)

**Time Complexity (BST - worst case/skewed):**
- Search: O(n)
- Insert: O(n)
- Delete: O(n)

**Space Complexity:** O(n)

**Traversals:**
- Pre-order (Root, Left, Right)
- In-order (Left, Root, Right)
- Post-order (Left, Right, Root)
- Level-order (BFS)

**Use Cases:**
- Hierarchical data
- Expression trees
- File systems

---

## AVL Trees
**Description:** Self-balancing Binary Search Tree

**Time Complexity:**
- Search: O(log n) - guaranteed
- Insert: O(log n) - guaranteed
- Delete: O(log n) - guaranteed

**Space Complexity:** O(n)

**Use Cases:**
- When guaranteed O(log n) operations are needed
- Databases with frequent lookups
- Auto-complete features

**Balance Factor:** Height(left subtree) - Height(right subtree) ∈ {-1, 0, 1}

---

## Graphs
**Description:** Collection of vertices (nodes) connected by edges

**Representations:**
- Adjacency Matrix: O(V²) space
- Adjacency List: O(V + E) space

**Traversals:**
- DFS (Depth-First Search): O(V + E)
- BFS (Breadth-First Search): O(V + E)

**Use Cases:**
- Social networks
- Maps and navigation
- Recommendation systems
- Network routing

**Types:**
- Directed/Undirected
- Weighted/Unweighted
- Cyclic/Acyclic

---

## Priority Queue
**Description:** Queue where elements have priorities (typically implemented with heap)

**Time Complexity (Binary Heap):**
- Insert: O(log n)
- Delete Max/Min: O(log n)
- Peek: O(1)

**Space Complexity:** O(n)

**Use Cases:**
- Dijkstra's algorithm
- Huffman coding
- Task scheduling
- Event simulation

---

## Quick Reference Table

| Data Structure | Access | Search | Insert | Delete | Space |
|----------------|--------|--------|--------|--------|-------|
| Array | O(1) | O(n) | O(n) | O(n) | O(n) |
| Linked List | O(n) | O(n) | O(1)* | O(1)* | O(n) |
| Stack | - | - | O(1) | O(1) | O(n) |
| Queue | - | - | O(1) | O(1) | O(n) |
| Hash Table | - | O(1)† | O(1)† | O(1)† | O(n) |
| BST (balanced) | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| AVL Tree | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |

*At known position  
†Average case

