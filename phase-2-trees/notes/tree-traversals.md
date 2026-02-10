# Tree Traversal Techniques

## Overview

Tree traversal is the process of visiting each node in a tree data structure exactly once in a systematic way.

## Depth-First Search (DFS)

DFS explores as far as possible along each branch before backtracking.

### 1. In-Order Traversal (Left → Root → Right)

```javascript
function inOrderRecursive(node, result = []) {
    if (node === null) return result;
    
    inOrderRecursive(node.left, result);
    result.push(node.value);
    inOrderRecursive(node.right, result);
    
    return result;
}
```

**Iterative Version:**
```javascript
function inOrderIterative(root) {
    const result = [];
    const stack = [];
    let current = root;
    
    while (current !== null || stack.length > 0) {
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop();
        result.push(current.value);
        current = current.right;
    }
    
    return result;
}
```

**Use Cases:**
- Get sorted sequence from BST
- Evaluate expression trees
- Binary search tree operations

**Output for tree [1,2,3,4,5]:**
`4, 2, 5, 1, 3` (sorted order for BST)

---

### 2. Pre-Order Traversal (Root → Left → Right)

```javascript
function preOrderRecursive(node, result = []) {
    if (node === null) return result;
    
    result.push(node.value);
    preOrderRecursive(node.left, result);
    preOrderRecursive(node.right, result);
    
    return result;
}
```

**Iterative Version:**
```javascript
function preOrderIterative(root) {
    if (!root) return [];
    
    const result = [];
    const stack = [root];
    
    while (stack.length > 0) {
        const node = stack.pop();
        result.push(node.value);
        
        // Push right first so left is processed first
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    
    return result;
}
```

**Use Cases:**
- Copy/clone tree
- Prefix expression evaluation
- Serialize tree
- DFS on tree

**Output for tree [1,2,3,4,5]:**
`1, 2, 4, 5, 3`

---

### 3. Post-Order Traversal (Left → Right → Root)

```javascript
function postOrderRecursive(node, result = []) {
    if (node === null) return result;
    
    postOrderRecursive(node.left, result);
    postOrderRecursive(node.right, result);
    result.push(node.value);
    
    return result;
}
```

**Iterative Version:**
```javascript
function postOrderIterative(root) {
    if (!root) return [];
    
    const result = [];
    const stack = [root];
    const output = [];
    
    while (stack.length > 0) {
        const node = stack.pop();
        output.push(node.value);
        
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }
    
    return output.reverse(); // Reverse to get post-order
}
```

**Use Cases:**
- Delete tree (delete children before parent)
- Postfix expression evaluation
- Calculate directory sizes
- Dependency resolution

**Output for tree [1,2,3,4,5]:**
`4, 5, 2, 3, 1`

---

## Breadth-First Search (BFS)

BFS explores all nodes at the current depth before moving to the next level.

### Level-Order Traversal

```javascript
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node.value);
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    
    return result;
}
```

**Level-by-Level (2D array):**
```javascript
function levelOrderByLevel(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.value);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}
```

**Use Cases:**
- Find shortest path in tree
- Level-by-level operations
- Serialize/deserialize tree
- Print tree by levels

**Output for tree [1,2,3,4,5]:**
`1, 2, 3, 4, 5` (level by level)

---

## Comparison Table

| Traversal  | Order          | Stack/Queue | Use Case                    | Time | Space |
|------------|----------------|-------------|-----------------------------|------|-------|
| In-Order   | L → Root → R   | Stack (DFS) | Sorted BST, Expression Eval | O(n) | O(h)  |
| Pre-Order  | Root → L → R   | Stack (DFS) | Copy Tree, Serialize        | O(n) | O(h)  |
| Post-Order | L → R → Root   | Stack (DFS) | Delete Tree, Directory Size | O(n) | O(h)  |
| Level-Order| Level by Level | Queue (BFS) | Shortest Path, Level Ops    | O(n) | O(w)  |

*h = height, w = max width*

---

## Advanced Traversal Patterns

### 1. Zigzag Level Order
Alternate left-to-right and right-to-left by level.

```javascript
function zigzagLevelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    let leftToRight = true;
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            if (leftToRight) {
                currentLevel.push(node.value);
            } else {
                currentLevel.unshift(node.value);
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
        leftToRight = !leftToRight;
    }
    
    return result;
}
```

### 2. Vertical Order Traversal
Group nodes by vertical columns.

### 3. Boundary Traversal
Visit left boundary → leaves → right boundary (reverse).

### 4. Diagonal Traversal
Visit nodes along diagonals.

---

## Choosing the Right Traversal

| Problem Type | Best Traversal |
|-------------|----------------|
| Sort BST elements | In-Order |
| Copy/clone tree | Pre-Order |
| Delete tree | Post-Order |
| Level-by-level processing | Level-Order |
| Find path | DFS (any) |
| Find depth | BFS |
| Serialize tree | Pre-Order or Level-Order |

---

## Practice Problems

1. **Binary Tree Level Order Traversal** (LeetCode 102)
2. **Binary Tree Zigzag Level Order** (LeetCode 103)
3. **Binary Tree Vertical Order Traversal** (LeetCode 314)
4. **Binary Tree Right Side View** (LeetCode 199)
5. **Flatten Binary Tree to Linked List** (LeetCode 114)

---

## Key Takeaways

✅ **DFS** uses stack (or recursion), explores depth first
✅ **BFS** uses queue, explores level by level
✅ **In-order** gives sorted output for BST
✅ **Pre-order** good for copying/serializing
✅ **Post-order** good for deletion/cleanup
✅ **Level-order** good for shortest paths and level operations

Master all traversal types - they're fundamental to tree problem-solving!
