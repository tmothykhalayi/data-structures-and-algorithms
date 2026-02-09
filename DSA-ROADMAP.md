# Complete Data Structures and Algorithms Roadmap

## Overview
This roadmap provides a comprehensive guide to mastering Data Structures and Algorithms, organized by complexity and dependencies.

---

## 1. Basic Data Structures

### 1.1 Arrays
- **Core Concepts**: Static vs Dynamic arrays, Array operations
- **Key Operations**: Insertion, Deletion, Traversal, Search
- **Time Complexity**: O(1) access, O(n) insertion/deletion
- **Implementation**: ✅ `phase-1-linear-data-structures/arrays/`

### 1.2 Strings
- **Core Concepts**: String manipulation, Pattern matching
- **Key Operations**: Concatenation, Substring, Comparison
- **Common Problems**: Palindromes, Anagrams, String reversal
- **Implementation**: 📝 To be added

### 1.3 Linked Lists
- **Types**: Singly Linked List, Doubly Linked List, Circular Linked List
- **Key Operations**: Insert, Delete, Reverse, Detect cycle
- **Time Complexity**: O(1) insertion at head, O(n) search
- **Implementation**: ✅ `phase-1-linear-data-structures/linked-lists/`

### 1.4 Stacks
- **Core Concepts**: LIFO (Last In First Out)
- **Implementations**: Array-based, Linked List-based
- **Applications**: Expression evaluation, Backtracking, DFS
- **Implementation**: ✅ `phase-1-linear-data-structures/stacks/`

### 1.5 Queues
- **Core Concepts**: FIFO (First In First Out)
- **Types**: Simple Queue, Circular Queue, Priority Queue, Deque
- **Applications**: BFS, Scheduling, Buffer management
- **Implementation**: ✅ `phase-1-linear-data-structures/queues/`

---

## 2. Advanced Data Structures

### 2.1 Trees
#### Binary Trees
- **Properties**: Height, Depth, Level order
- **Traversals**: Inorder, Preorder, Postorder, Level order
- **Implementation**: ✅ `phase-2-trees/trees/binaryTree.js`

#### Binary Search Trees (BST)
- **Properties**: Left < Root < Right
- **Operations**: Search, Insert, Delete, Find min/max
- **Time Complexity**: O(log n) average, O(n) worst case
- **Implementation**: 📝 To be added

#### AVL Trees
- **Properties**: Self-balancing BST, Balance factor
- **Rotations**: Left, Right, Left-Right, Right-Left
- **Time Complexity**: O(log n) guaranteed
- **Implementation**: ✅ `phase-2-trees/trees/AVLTree.js`

#### B-Trees
- **Properties**: Multi-way search trees, Used in databases
- **Operations**: Search, Insert, Split, Merge
- **Applications**: File systems, Database indexing
- **Implementation**: 📝 To be added

### 2.2 Graphs
#### Graph Representation
- **Adjacency Matrix**: 2D array representation
- **Adjacency List**: Array of lists representation
- **Edge List**: List of all edges
- **Implementation**: 📝 To be added

#### Graph Traversal
- **Depth-First Search (DFS)**: Stack-based, Recursive
- **Breadth-First Search (BFS)**: Queue-based
- **Implementation**: 📝 To be added

#### Shortest Path Algorithms
- **Dijkstra's Algorithm**: Non-negative weights, Greedy approach
- **Bellman-Ford Algorithm**: Handles negative weights
- **Floyd-Warshall**: All pairs shortest path
- **Implementation**: 📝 To be added

#### Minimum Spanning Tree
- **Prim's Algorithm**: Greedy, vertex-based
- **Kruskal's Algorithm**: Greedy, edge-based, uses DSU
- **Implementation**: 📝 To be added

### 2.3 Heaps
- **Min Heap**: Parent ≤ Children
- **Max Heap**: Parent ≥ Children
- **Operations**: Insert, Delete, Heapify, Extract min/max
- **Applications**: Priority Queue, Heap Sort
- **Implementation**: 📝 To be added

### 2.4 Hash Tables
- **Core Concepts**: Hash function, Collision resolution
- **Collision Handling**: Chaining, Open addressing
- **Time Complexity**: O(1) average for insert/search/delete
- **Implementation**: ✅ `phase-3-hashing-sets/hash-tables/`

### 2.5 Disjoint Set Union (DSU/Union-Find)
- **Core Concepts**: Disjoint sets, Union by rank, Path compression
- **Operations**: Find, Union
- **Applications**: Kruskal's algorithm, Network connectivity
- **Implementation**: 📝 To be added

### 2.6 Trie (Prefix Tree)
- **Core Concepts**: Character-by-character storage
- **Operations**: Insert, Search, Delete, Prefix search
- **Applications**: Autocomplete, Spell checker, IP routing
- **Implementation**: 📝 To be added

### 2.7 Segment Tree
- **Core Concepts**: Binary tree for range queries
- **Operations**: Build, Query, Update
- **Applications**: Range sum/min/max queries
- **Implementation**: 📝 To be added

### 2.8 Fenwick Tree (Binary Indexed Tree)
- **Core Concepts**: Efficient prefix sum calculation
- **Operations**: Update, Prefix sum query
- **Time Complexity**: O(log n) for both operations
- **Implementation**: 📝 To be added

---

## 3. Algorithmic Paradigms

### 3.1 Brute Force
- **Approach**: Try all possible solutions
- **Use Cases**: Small input sizes, Establishing correctness
- **Examples**: Linear search, Generate all permutations

### 3.2 Divide and Conquer
- **Approach**: Break problem into smaller subproblems
- **Examples**: Merge Sort, Quick Sort, Binary Search
- **Pattern**: Divide → Conquer → Combine

### 3.3 Greedy Algorithms
- **Approach**: Make locally optimal choices
- **Examples**: Activity selection, Huffman coding, Coin change
- **Implementation**: ✅ `algorithms/greedy/`

### 3.4 Dynamic Programming
- **Approach**: Store solutions to overlapping subproblems
- **Types**: Top-down (Memoization), Bottom-up (Tabulation)
- **Examples**: Fibonacci, LCS, Knapsack, Matrix chain multiplication
- **Implementation**: 📝 `phase-6-dynamic-programming/`

### 3.5 Backtracking
- **Approach**: Build solution incrementally, backtrack if invalid
- **Examples**: N-Queens, Sudoku solver, Permutations
- **Pattern**: Choose → Explore → Un-choose

### 3.6 Sliding Window Technique
- **Approach**: Maintain a window over array/string
- **Types**: Fixed size window, Variable size window
- **Examples**: Maximum sum subarray, Longest substring

### 3.7 Two Pointer Technique
- **Approach**: Use two pointers to traverse data structure
- **Patterns**: Same direction, Opposite directions
- **Examples**: Two sum, Remove duplicates, Container with most water

### 3.8 Branch and Bound
- **Approach**: Systematic enumeration with pruning
- **Applications**: Optimization problems, 0/1 Knapsack, TSP
- **Pattern**: Explore promising nodes, prune non-promising ones

---

## 4. Searching Algorithms

### 4.1 Linear Search
- **Approach**: Sequential search through elements
- **Time Complexity**: O(n)
- **Use Case**: Unsorted data
- **Implementation**: 📝 To be added

### 4.2 Binary Search
- **Approach**: Divide and conquer on sorted data
- **Time Complexity**: O(log n)
- **Variants**: Iterative, Recursive, Lower bound, Upper bound
- **Implementation**: ✅ `phase-4-core-algorithms/searching/`

### 4.3 Ternary Search
- **Approach**: Divide into three parts
- **Time Complexity**: O(log₃ n)
- **Use Case**: Unimodal functions
- **Implementation**: 📝 To be added

### 4.4 Exponential Search
- **Approach**: Find range then binary search
- **Time Complexity**: O(log n)
- **Use Case**: Unbounded/infinite arrays
- **Implementation**: 📝 To be added

### 4.5 Interpolation Search
- **Approach**: Position-based search for uniformly distributed data
- **Time Complexity**: O(log log n) average
- **Implementation**: 📝 To be added

---

## 5. Sorting Algorithms

### 5.1 Bubble Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Stable**: Yes
- **Implementation**: ✅ `phase-4-core-algorithms/sorting/`

### 5.2 Selection Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Stable**: No
- **Implementation**: ✅ `phase-4-core-algorithms/sorting/`

### 5.3 Insertion Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Stable**: Yes
- **Implementation**: ✅ `phase-4-core-algorithms/sorting/`

### 5.4 Merge Sort
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)
- **Stable**: Yes
- **Implementation**: ✅ `phase-4-core-algorithms/sorting/`

### 5.5 Quick Sort
- **Time Complexity**: O(n log n) average, O(n²) worst
- **Space Complexity**: O(log n)
- **Stable**: No
- **Implementation**: ✅ `phase-4-core-algorithms/sorting/`

### 5.6 Heap Sort
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(1)
- **Stable**: No
- **Implementation**: 📝 To be added

### 5.7 Counting Sort
- **Time Complexity**: O(n + k), k = range
- **Space Complexity**: O(k)
- **Stable**: Yes
- **Implementation**: 📝 To be added

### 5.8 Radix Sort
- **Time Complexity**: O(d × n), d = digits
- **Space Complexity**: O(n + k)
- **Stable**: Yes
- **Implementation**: 📝 To be added

### 5.9 Bucket Sort
- **Time Complexity**: O(n + k)
- **Space Complexity**: O(n + k)
- **Use Case**: Uniformly distributed data
- **Implementation**: 📝 To be added

---

## 6. Graph Algorithms

### 6.1 Graph Traversal
- **DFS**: Uses stack/recursion, explores depth first
- **BFS**: Uses queue, explores level by level
- **Implementation**: 📝 To be added

### 6.2 Topological Sort
- **Approach**: Linear ordering of vertices (DAG)
- **Methods**: DFS-based, Kahn's algorithm (BFS-based)
- **Applications**: Task scheduling, Build systems
- **Implementation**: 📝 To be added

### 6.3 Strongly Connected Components (SCC)
- **Kosaraju's Algorithm**: Two DFS passes
- **Tarjan's Algorithm**: Single DFS with low-link values
- **Applications**: Social networks, Compiler optimization
- **Implementation**: 📝 To be added

### 6.4 Articulation Points and Bridges
- **Articulation Points**: Vertices whose removal disconnects graph
- **Bridges**: Edges whose removal disconnects graph
- **Algorithm**: Modified DFS with discovery and low times
- **Implementation**: 📝 To be added

### 6.5 Cycle Detection
- **Undirected Graphs**: Using DFS or DSU
- **Directed Graphs**: Using DFS (back edges) or topological sort
- **Implementation**: 📝 To be added

---

## 7. Dynamic Programming

### 7.1 Introduction to DP
- **Core Concepts**: Optimal substructure, Overlapping subproblems
- **Approaches**: Memoization (Top-down), Tabulation (Bottom-up)

### 7.2 Classic DP Problems

#### 7.2.1 Fibonacci Series
- **Pattern**: Basic DP introduction
- **Time**: O(n), Space: O(n) or O(1)
- **Implementation**: 📝 To be added

#### 7.2.2 Longest Common Subsequence (LCS)
- **Pattern**: 2D DP on strings
- **Time**: O(m × n), Space: O(m × n)
- **Implementation**: 📝 To be added

#### 7.2.3 Longest Increasing Subsequence (LIS)
- **Pattern**: 1D DP on arrays
- **Time**: O(n²) or O(n log n)
- **Implementation**: 📝 To be added

#### 7.2.4 Knapsack Problem
- **Types**: 0/1 Knapsack, Unbounded Knapsack
- **Time**: O(n × W), W = capacity
- **Implementation**: 📝 To be added

#### 7.2.5 Matrix Chain Multiplication
- **Pattern**: Interval DP
- **Time**: O(n³), Space: O(n²)
- **Implementation**: 📝 To be added

#### 7.2.6 Edit Distance
- **Operations**: Insert, Delete, Replace
- **Time**: O(m × n)
- **Implementation**: 📝 To be added

### 7.3 DP on Trees
- **Pattern**: Tree DP with DFS
- **Examples**: Tree diameter, Maximum path sum
- **Implementation**: 📝 To be added

### 7.4 DP on Grids
- **Pattern**: Path counting, Minimum path sum
- **Examples**: Unique paths, Dungeon game
- **Implementation**: 📝 To be added

---

## 8. Mathematical and Bit Manipulation Algorithms

### 8.1 Number Theory

#### Prime Numbers
- **Sieve of Eratosthenes**: Generate primes up to n
- **Time Complexity**: O(n log log n)
- **Implementation**: 📝 To be added

#### GCD and LCM
- **Euclidean Algorithm**: Find GCD
- **Formula**: LCM(a,b) = (a × b) / GCD(a,b)
- **Implementation**: 📝 To be added

#### Modular Arithmetic
- **Operations**: Modular addition, multiplication, exponentiation
- **Fast Exponentiation**: O(log n)
- **Implementation**: 📝 To be added

### 8.2 Bit Manipulation

#### Basic Operations
- **AND, OR, XOR, NOT**: Bitwise operators
- **Shifts**: Left shift (×2), Right shift (÷2)

#### Common Tricks
- **Check if power of 2**: n & (n-1) == 0
- **Toggle bit**: x ^= (1 << i)
- **Count set bits**: Brian Kernighan's algorithm
- **Implementation**: 📝 To be added

---

## 9. Advanced Topics

### 9.1 String Algorithms

#### KMP Algorithm
- **Purpose**: Pattern matching
- **Time Complexity**: O(n + m)
- **Preprocessing**: Build LPS array
- **Implementation**: 📝 To be added

#### Rabin-Karp Algorithm
- **Purpose**: Pattern matching using hashing
- **Time Complexity**: O(n + m) average
- **Implementation**: 📝 To be added

#### Z-Algorithm
- **Purpose**: Pattern matching
- **Time Complexity**: O(n + m)
- **Implementation**: 📝 To be added

### 9.2 Trie-based Algorithms

#### Auto-completion
- **Approach**: Store words in trie, traverse prefix
- **Implementation**: 📝 To be added

#### Spell Checker
- **Approach**: Trie + Edit distance
- **Implementation**: 📝 To be added

### 9.3 Suffix Trees and Arrays
- **Suffix Array**: Sorted array of all suffixes
- **Applications**: Pattern matching, LCP
- **Implementation**: 📝 To be added

### 9.4 Computational Geometry
- **Topics**: Convex hull, Line intersection, Closest pair
- **Algorithms**: Graham scan, Sweep line
- **Implementation**: 📝 To be added

### 9.5 Advanced Number Theory
- **Topics**: Euler's totient, Möbius function
- **Applications**: Cryptography, Combinatorics
- **Implementation**: 📝 To be added

---

## Study Path Recommendations

### Beginner (Weeks 1-4)
1. Arrays and Strings
2. Linked Lists
3. Stacks and Queues
4. Basic Recursion
5. Bubble, Insertion, Selection Sort
6. Linear and Binary Search

### Intermediate (Weeks 5-12)
1. Trees (Binary Trees, BST)
2. Hash Tables
3. Heaps
4. Merge Sort, Quick Sort
5. Basic DP (Fibonacci, LCS, Knapsack)
6. Graph Traversal (DFS, BFS)

### Advanced (Weeks 13-24)
1. AVL Trees, B-Trees
2. Advanced Graph Algorithms
3. Tries, Segment Trees
4. Advanced DP patterns
5. String Algorithms
6. Computational Geometry

---

## Resources and Practice

### Online Judges
- LeetCode (Pattern-based problems)
- HackerRank (Structured learning path)
- Codeforces (Competitive programming)
- CodeChef (Monthly contests)

### Key Problem Sets
- **Arrays**: Two Sum, Max Subarray, Rotate Array
- **Linked Lists**: Reverse List, Detect Cycle, Merge Lists
- **Trees**: Inorder Traversal, Validate BST, LCA
- **Graphs**: Clone Graph, Course Schedule, Number of Islands
- **DP**: Climbing Stairs, Coin Change, House Robber

---

## Progress Tracking

- ✅ **Implemented**: Fully coded and tested
- 📝 **To be added**: Planned for implementation
- 🚧 **In progress**: Currently being developed

---

*Last Updated: February 9, 2026*
