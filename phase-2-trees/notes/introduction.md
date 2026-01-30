# Phase 2: Trees

## Welcome to Tree Data Structures

Trees are hierarchical, non-linear data structures that represent relationships with a parent-child structure. Understanding trees is crucial for advanced algorithms, database indexing, file systems, and more.

---

## What You'll Learn

### 1. **Binary Trees**
- Tree terminology (root, leaf, height, depth)
- Tree traversals (pre-order, in-order, post-order, level-order)
- Properties and types of binary trees
- Common binary tree patterns

### 2. **Binary Search Trees (BST)**
- BST properties and operations
- Insertion, deletion, searching
- BST validation
- Common BST patterns

### 3. **AVL Trees**
- Self-balancing binary search trees
- Rotations (left, right, left-right, right-left)
- Balance factor
- Time complexity guarantees

### 4. **Advanced Tree Concepts**
- Tree construction from traversals
- Lowest common ancestor
- Path sum problems
- Serialization and deserialization

---

## Why Trees Matter

Trees are fundamental in computer science:

1. **Hierarchical Representation**: File systems, organizational charts, DOM
2. **Efficient Search**: O(log n) operations in balanced trees
3. **Database Indexing**: B-trees and B+ trees power databases
4. **Decision Making**: Decision trees in AI/ML
5. **Compression**: Huffman coding trees
6. **Parsing**: Expression trees, syntax trees

---

## Tree Terminology

```
        1           ← Root
       / \
      2   3         ← Internal nodes
     / \   \
    4   5   6       ← Leaf nodes
```

- **Root**: Top node (1)
- **Parent**: Node with children (1, 2, 3)
- **Child**: Node with a parent (2, 3, 4, 5, 6)
- **Leaf**: Node with no children (4, 5, 6)
- **Height**: Longest path from node to leaf
- **Depth**: Distance from root to node
- **Level**: Depth + 1

---

## Learning Objectives

By the end of this phase, you should be able to:

- ✅ Implement binary trees and BSTs from scratch
- ✅ Perform all tree traversals (DFS and BFS)
- ✅ Solve tree problems using recursion
- ✅ Understand AVL tree rotations
- ✅ Recognize tree patterns in problems
- ✅ Analyze time and space complexity of tree operations

---

## Study Roadmap

### Week 1: Binary Trees Fundamentals
- Day 1-2: Tree structure and basic operations
- Day 3-4: DFS traversals (pre, in, post)
- Day 5-6: BFS (level-order) traversal
- Day 7: Practice problems

### Week 2: Binary Search Trees
- Day 1-2: BST operations (insert, search, delete)
- Day 3-4: BST validation and properties
- Day 5-7: BST problem patterns

### Week 3: Advanced Trees
- Day 1-3: AVL trees and rotations
- Day 4-5: Tree construction problems
- Day 6-7: LCA and path problems

### Week 4: Tree Problem Patterns
- Day 1-7: Practice 15-20 tree problems

---

## Key Comparisons

### Tree vs Linear Structures

| Feature | Array | Linked List | Tree |
|---------|-------|-------------|------|
| Structure | Linear | Linear | Hierarchical |
| Access | O(1) | O(n) | O(log n)* |
| Search | O(n) | O(n) | O(log n)* |
| Insert | O(n) | O(1)** | O(log n)* |
| Memory | Contiguous | Scattered | Scattered |

*For balanced BST; **At known position

### Tree Types Comparison

| Type | Balance | Search | Insert | Delete |
|------|---------|--------|--------|--------|
| Binary Tree | No | O(n) | O(n) | O(n) |
| BST | No | O(n)† | O(n)† | O(n)† |
| AVL Tree | Yes | O(log n) | O(log n) | O(log n) |
| Red-Black Tree | Yes | O(log n) | O(log n) | O(log n) |

†Worst case for unbalanced tree

---

## Common Tree Patterns

### 1. DFS Traversals
- **Pre-order**: Root → Left → Right
- **In-order**: Left → Root → Right
- **Post-order**: Left → Right → Root

### 2. BFS (Level-Order)
- Process tree level by level
- Use queue for implementation

### 3. Recursion
- Most tree problems solved recursively
- Base case: null node
- Recursive case: process left and right

### 4. Path Problems
- Root-to-leaf paths
- Path sum
- Maximum path sum

### 5. Tree Modifications
- Invert/mirror tree
- Flatten tree
- Connect nodes at same level

---

## Resources in This Phase

### Implementation Files:
- **Binary Tree**: [binaryTree.js](../trees/binaryTree.js)
- **AVL Tree**: [AVLTree.js](../trees/AVLTree.js)

### Study Notes:
- [Binary Trees Guide](binary-trees-guide.md) - Complete binary tree reference
- [BST Guide](bst-guide.md) - Binary search tree operations
- [AVL Trees Guide](avl-trees-guide.md) - Self-balancing trees
- [Tree Traversals Guide](tree-traversals-guide.md) - All traversal methods

---

## Interview Tips

### What Interviewers Look For:
1. **Recursion mastery**: Can you think recursively?
2. **Base case handling**: Do you check for null nodes?
3. **Traversal knowledge**: Can you implement all traversals?
4. **Pattern recognition**: Do you see common tree patterns?

### Common Interview Questions:
- Invert binary tree
- Maximum depth of tree
- Validate BST
- Lowest common ancestor
- Serialize/deserialize tree
- Path sum variations
- Tree from traversals

---

## Common Pitfalls to Avoid

### Binary Trees:
- ❌ Not handling null nodes
- ❌ Forgetting base cases in recursion
- ❌ Modifying tree during traversal incorrectly
- ❌ Stack overflow from deep recursion

### BST:
- ❌ Not maintaining BST property during operations
- ❌ Incorrect deletion (forgetting successor/predecessor)
- ❌ Not checking entire subtree in validation
- ❌ Assuming tree is balanced

### AVL Trees:
- ❌ Wrong rotation direction
- ❌ Not updating heights after rotations
- ❌ Incorrect balance factor calculation

---

## Practice Strategy

1. **Master fundamentals**: Understand tree structure deeply
2. **Learn all traversals**: Practice until automatic
3. **Start with recursion**: Most tree problems use it
4. **Draw trees**: Visualize on paper
5. **Solve easy problems**: 5-7 basic tree problems
6. **Solve medium problems**: 10-15 pattern-based problems
7. **Review solutions**: Learn from multiple approaches

---

## Next Steps

After mastering trees:
1. Move to **Phase 3: Hashing & Sets**
2. Apply tree knowledge in **Phase 7: Graphs**
3. Use trees in dynamic programming problems

---

**Remember**: Trees are about recursion and patterns. Master the basics and the rest follows naturally!
