/**
 * Binary Search Tree (BST) Implementation
 * Left subtree < Node < Right subtree
 * Average O(log n) for search, insert, delete
 * Worst case O(n) when tree becomes skewed
 */

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // Insert a value - O(log n) average, O(n) worst
    insert(value) {
        const newNode = new TreeNode(value);

        if (!this.root) {
            this.root = newNode;
            return this;
        }

        let current = this.root;
        while (true) {
            if (value === current.value) return undefined; // Duplicate

            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    // Recursive insert
    insertRecursive(value) {
        this.root = this._insertRecursiveHelper(this.root, value);
        return this;
    }

    _insertRecursiveHelper(node, value) {
        if (!node) return new TreeNode(value);

        if (value < node.value) {
            node.left = this._insertRecursiveHelper(node.left, value);
        } else if (value > node.value) {
            node.right = this._insertRecursiveHelper(node.right, value);
        }

        return node;
    }

    // Search for a value - O(log n) average
    search(value) {
        let current = this.root;

        while (current) {
            if (value === current.value) return true;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }

    // Find node with value
    find(value) {
        let current = this.root;

        while (current) {
            if (value === current.value) return current;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return null;
    }

    // Find minimum value - O(h) where h is height
    findMin(node = this.root) {
        if (!node) return null;

        while (node.left) {
            node = node.left;
        }

        return node.value;
    }

    // Find maximum value - O(h)
    findMax(node = this.root) {
        if (!node) return null;

        while (node.right) {
            node = node.right;
        }

        return node.value;
    }

    // Delete a value - O(log n) average
    delete(value) {
        this.root = this._deleteHelper(this.root, value);
        return this;
    }

    _deleteHelper(node, value) {
        if (!node) return null;

        if (value < node.value) {
            node.left = this._deleteHelper(node.left, value);
        } else if (value > node.value) {
            node.right = this._deleteHelper(node.right, value);
        } else {
            // Node to be deleted found

            // Case 1: No children (leaf node)
            if (!node.left && !node.right) {
                return null;
            }

            // Case 2: One child
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            // Case 3: Two children
            // Find inorder successor (min in right subtree)
            node.value = this.findMin(node.right);
            node.right = this._deleteHelper(node.right, node.value);
        }

        return node;
    }

    // Inorder traversal: Left -> Root -> Right
    inorder(node = this.root, result = []) {
        if (node) {
            this.inorder(node.left, result);
            result.push(node.value);
            this.inorder(node.right, result);
        }
        return result;
    }

    // Preorder traversal: Root -> Left -> Right
    preorder(node = this.root, result = []) {
        if (node) {
            result.push(node.value);
            this.preorder(node.left, result);
            this.preorder(node.right, result);
        }
        return result;
    }

    // Postorder traversal: Left -> Right -> Root
    postorder(node = this.root, result = []) {
        if (node) {
            this.postorder(node.left, result);
            this.postorder(node.right, result);
            result.push(node.value);
        }
        return result;
    }

    // Level order traversal (BFS)
    levelOrder() {
        if (!this.root) return [];

        const result = [];
        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.value);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        return result;
    }

    // Get height of tree - O(n)
    height(node = this.root) {
        if (!node) return -1;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    // Count total nodes - O(n)
    countNodes(node = this.root) {
        if (!node) return 0;
        return 1 + this.countNodes(node.left) + this.countNodes(node.right);
    }

    // Check if tree is balanced - O(n)
    isBalanced(node = this.root) {
        if (!node) return true;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        }

        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    // Validate BST - O(n)
    isValidBST(node = this.root, min = null, max = null) {
        if (!node) return true;

        if ((min !== null && node.value <= min) || 
            (max !== null && node.value >= max)) {
            return false;
        }

        return this.isValidBST(node.left, min, node.value) &&
               this.isValidBST(node.right, node.value, max);
    }

    // Find kth smallest element - O(k)
    kthSmallest(k) {
        const inorderValues = this.inorder();
        return inorderValues[k - 1] || null;
    }

    // Find lowest common ancestor - O(log n) for BST
    lowestCommonAncestor(value1, value2) {
        let node = this.root;

        while (node) {
            if (value1 < node.value && value2 < node.value) {
                node = node.left;
            } else if (value1 > node.value && value2 > node.value) {
                node = node.right;
            } else {
                return node.value;
            }
        }

        return null;
    }

    // Check if tree is empty
    isEmpty() {
        return this.root === null;
    }

    // Clear the tree
    clear() {
        this.root = null;
    }

    // Visual display (simplified)
    display() {
        if (!this.root) {
            console.log('Tree is empty');
            return;
        }

        console.log('Inorder:', this.inorder());
        console.log('Preorder:', this.preorder());
        console.log('Postorder:', this.postorder());
        console.log('Level Order:', this.levelOrder());
    }
}

// Example usage and testing
if (require.main === module) {
    const bst = new BinarySearchTree();

    console.log('=== Binary Search Tree Demo ===\n');

    // Insert values
    const values = [50, 30, 70, 20, 40, 60, 80];
    values.forEach(val => bst.insert(val));

    console.log('After inserting:', values);
    bst.display();

    // Search
    console.log('\nSearch for 40:', bst.search(40));
    console.log('Search for 100:', bst.search(100));

    // Find min and max
    console.log('\nMinimum value:', bst.findMin());
    console.log('Maximum value:', bst.findMax());

    // Tree properties
    console.log('\nHeight:', bst.height());
    console.log('Total nodes:', bst.countNodes());
    console.log('Is balanced:', bst.isBalanced());
    console.log('Is valid BST:', bst.isValidBST());

    // Kth smallest
    console.log('\n2nd smallest element:', bst.kthSmallest(2));
    console.log('5th smallest element:', bst.kthSmallest(5));

    // LCA
    console.log('\nLCA of 20 and 40:', bst.lowestCommonAncestor(20, 40));
    console.log('LCA of 20 and 80:', bst.lowestCommonAncestor(20, 80));

    // Delete
    bst.delete(20);
    console.log('\nAfter deleting 20:');
    console.log('Inorder:', bst.inorder());

    bst.delete(30);
    console.log('\nAfter deleting 30:');
    console.log('Inorder:', bst.inorder());

    bst.delete(50);
    console.log('\nAfter deleting 50 (root):');
    console.log('Inorder:', bst.inorder());
}

module.exports = BinarySearchTree;
