# Binary Trees Guide

## What is a Binary Tree?

A **binary tree** is a hierarchical data structure where each node has at most two children, referred to as the left child and right child.

## Key Concepts

### Node Structure
```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
```

### Tree Terminology

- **Root**: The topmost node (no parent)
- **Parent**: Node with children
- **Child**: Node with a parent
- **Leaf**: Node with no children
- **Height**: Longest path from node to leaf
- **Depth**: Distance from root to node
- **Level**: Depth + 1

## Types of Binary Trees

### 1. Full Binary Tree
Every node has either 0 or 2 children (no nodes with 1 child).

### 2. Complete Binary Tree
All levels are filled except possibly the last, which is filled from left to right.

### 3. Perfect Binary Tree
All internal nodes have 2 children and all leaves are at the same level.

### 4. Balanced Binary Tree
Height difference between left and right subtrees is at most 1 for all nodes.

## Tree Traversals

### 1. Depth-First Search (DFS)

#### In-Order (Left → Root → Right)
```javascript
function inOrder(node) {
    if (node === null) return;
    inOrder(node.left);
    console.log(node.value);
    inOrder(node.right);
}
```
**Use Case**: BST gives sorted order

#### Pre-Order (Root → Left → Right)
```javascript
function preOrder(node) {
    if (node === null) return;
    console.log(node.value);
    preOrder(node.left);
    preOrder(node.right);
}
```
**Use Case**: Copy tree, prefix expression

#### Post-Order (Left → Right → Root)
```javascript
function postOrder(node) {
    if (node === null) return;
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.value);
}
```
**Use Case**: Delete tree, postfix expression

### 2. Breadth-First Search (BFS)

#### Level-Order Traversal
```javascript
function levelOrder(root) {
    if (!root) return;
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        console.log(node.value);
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
}
```
**Use Case**: Level-by-level processing, shortest path

## Common Operations

### Insert Node
**Time**: O(log n) average, O(n) worst
**Space**: O(1)

### Search Node
**Time**: O(log n) average, O(n) worst
**Space**: O(1)

### Delete Node
**Time**: O(log n) average, O(n) worst
**Space**: O(1)

### Find Height
**Time**: O(n)
**Space**: O(h) - recursion stack

```javascript
function height(node) {
    if (node === null) return -1;
    return 1 + Math.max(height(node.left), height(node.right));
}
```

## Binary Search Tree (BST)

A binary tree where:
- Left subtree values < parent value
- Right subtree values > parent value
- Both subtrees are also BSTs

### BST Search
```javascript
function search(node, value) {
    if (node === null) return false;
    if (node.value === value) return true;
    
    if (value < node.value) {
        return search(node.left, value);
    } else {
        return search(node.right, value);
    }
}
```

## Time Complexity Summary

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Search    | O(log n)| O(n)       |
| Insert    | O(log n)| O(n)       |
| Delete    | O(log n)| O(n)       |
| Traversal | O(n)    | O(n)       |

## Common Patterns

### Pattern 1: Recursion
Most tree problems use recursion due to tree's recursive structure.

### Pattern 2: Two Pointers
For comparing subtrees or finding paths.

### Pattern 3: Level-by-Level
Use queue for BFS traversal.

### Pattern 4: Post-Order for Aggregation
Calculate subtree properties bottom-up.

## Practice Problems

1. **Maximum Depth** - Find height of tree
2. **Validate BST** - Check if tree is valid BST
3. **Lowest Common Ancestor** - Find common ancestor
4. **Symmetric Tree** - Check if tree is mirror of itself
5. **Path Sum** - Find if root-to-leaf path equals target

## Key Takeaways

✅ Trees are recursive structures - think recursively
✅ Master all traversal methods (in/pre/post/level-order)
✅ BST provides O(log n) operations when balanced
✅ Choose DFS for path problems, BFS for level problems
✅ Height and depth are different concepts

## Next Steps

After mastering binary trees, move on to:
- AVL Trees (self-balancing)
- Red-Black Trees
- B-Trees
- Heaps (complete binary trees)
