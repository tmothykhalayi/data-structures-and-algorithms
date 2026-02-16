# Balanced Trees Guide


## Why Balanced Trees?

Regular binary search trees can become **unbalanced** and degrade to O(n) operations.
**Balanced trees** maintain O(log n) performance by keeping the tree height small.

## What is a Balanced Tree?

A tree where the height difference between left and right subtrees is minimal (usually ≤ 1).

### Checking if Tree is Balanced

```javascript
function isBalanced(root) {
    function getHeight(node) {
        if (node === null) return 0;
        
        const leftHeight = getHeight(node.left);
        if (leftHeight === -1) return -1; // Left subtree unbalanced
        
        const rightHeight = getHeight(node.right);
        if (rightHeight === -1) return -1; // Right subtree unbalanced
        
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1; // Current node unbalanced
        }
        
        return Math.max(leftHeight, rightHeight) + 1;
    }
    
    return getHeight(root) !== -1;
}
```

**Time Complexity**: O(n)
**Space Complexity**: O(h) - recursion stack

---

## AVL Trees

**AVL Tree** = Self-balancing BST where heights of left and right subtrees differ by at most 1.

### Balance Factor

```
Balance Factor = Height(Left Subtree) - Height(Right Subtree)
```

**Valid values**: -1, 0, 1

### AVL Rotations

When balance factor becomes ±2, perform rotations:

#### 1. Left Rotation (RR Case)
```
    y                    x
   / \                  / \
  x   T3    =>         T1  y
 / \                      / \
T1  T2                   T2  T3
```

```javascript
function leftRotate(y) {
    const x = y.right;
    const T2 = x.left;
    
    // Perform rotation
    x.left = y;
    y.right = T2;
    
    // Update heights
    y.height = Math.max(height(y.left), height(y.right)) + 1;
    x.height = Math.max(height(x.left), height(x.right)) + 1;
    
    return x; // New root
}
```

#### 2. Right Rotation (LL Case)
```
      y                x
     / \              / \
    x   T3    =>     T1  y
   / \                  / \
  T1  T2               T2  T3
```

```javascript
function rightRotate(y) {
    const x = y.left;
    const T2 = x.right;
    
    // Perform rotation
    x.right = y;
    y.left = T2;
    
    // Update heights
    y.height = Math.max(height(y.left), height(y.right)) + 1;
    x.height = Math.max(height(x.left), height(x.right)) + 1;
    
    return x; // New root
}
```

#### 3. Left-Right Rotation (LR Case)
First left rotate on left child, then right rotate on root.

#### 4. Right-Left Rotation (RL Case)
First right rotate on right child, then left rotate on root.

### AVL Insert
```javascript
function avlInsert(node, key) {
    // 1. Normal BST insert
    if (node === null) return new Node(key);
    
    if (key < node.value) {
        node.left = avlInsert(node.left, key);
    } else if (key > node.value) {
        node.right = avlInsert(node.right, key);
    } else {
        return node; // Duplicate keys not allowed
    }
    
    // 2. Update height
    node.height = 1 + Math.max(height(node.left), height(node.right));
    
    // 3. Get balance factor
    const balance = getBalance(node);
    
    // 4. Rebalance if needed
    
    // Left-Left Case
    if (balance > 1 && key < node.left.value) {
        return rightRotate(node);
    }
    
    // Right-Right Case
    if (balance < -1 && key > node.right.value) {
        return leftRotate(node);
    }
    
    // Left-Right Case
    if (balance > 1 && key > node.left.value) {
        node.left = leftRotate(node.left);
        return rightRotate(node);
    }
    
    // Right-Left Case
    if (balance < -1 && key < node.right.value) {
        node.right = rightRotate(node.right);
        return leftRotate(node);
    }
    
    return node;
}

function getBalance(node) {
    if (node === null) return 0;
    return height(node.left) - height(node.right);
}
```

### AVL Complexity

| Operation | Time Complexity |
|-----------|----------------|
| Search    | O(log n)       |
| Insert    | O(log n)       |
| Delete    | O(log n)       |
| Space     | O(n)           |

**Guaranteed O(log n)** - Never degrades to O(n)!

---

## Red-Black Trees

Another self-balancing BST with **looser balancing** than AVL.

### Properties

1. Every node is either RED or BLACK
2. Root is always BLACK
3. All leaves (NIL) are BLACK
4. Red nodes cannot have red children
5. All paths from node to leaves have same number of black nodes

### Advantages over AVL

- **Faster inserts/deletes** (fewer rotations)
- **Slightly slower searches** (less strict balancing)
- Used in C++ STL map, Java TreeMap

---

## Comparison: BST vs AVL vs Red-Black

| Feature | BST | AVL | Red-Black |
|---------|-----|-----|-----------|
| Search | O(n) worst | O(log n) | O(log n) |
| Insert | O(n) worst | O(log n) | O(log n) |
| Delete | O(n) worst | O(log n) | O(log n) |
| Balance | None | Strict | Moderate |
| Rotations | 0 | More | Fewer |
| Use Case | Simple data | Read-heavy | Insert-heavy |

---

## When to Use What?

### Use AVL Tree When:
- ✅ Search-intensive applications
- ✅ Read operations > Write operations
- ✅ Need strict balancing guarantee
- Example: Databases with frequent lookups

### Use Red-Black Tree When:
- ✅ Insert/delete-intensive applications
- ✅ Write operations > Read operations
- ✅ Can tolerate slight imbalance
- Example: Language libraries (STL, TreeMap)

### Use Regular BST When:
- ✅ Small datasets
- ✅ Data inserted in random order
- ✅ Don't need guaranteed performance
- Example: Simple prototypes

---

## Practice Problems

1. **Balance a BST** - Convert unbalanced BST to balanced
2. **AVL Tree Insert** - Implement insertion with rotations
3. **Check if Tree is Balanced** - Calculate balance factors
4. **Minimum Height Trees** - Find roots that minimize height
5. **Validate AVL Tree** - Check if tree satisfies AVL properties

---

## Key Takeaways

✅ Balanced trees maintain O(log n) operations
✅ AVL stricter balancing → better for searches
✅ Red-Black looser balancing → better for inserts/deletes
✅ Balance factor = left height - right height
✅ Four rotation cases: LL, RR, LR, RL
✅ Rotations preserve BST property

Master AVL tree rotations - they appear in many interview questions!
