/**
 * Segment Tree Implementation
 * Efficient for range queries and updates
 * Time: O(log n) for query and update, O(n) for build
 * Space: O(4n) = O(n)
 */

class SegmentTree {
    constructor(arr) {
        this.n = arr.length;
        this.tree = Array(4 * this.n).fill(0);
        if (arr.length > 0) {
            this.build(arr, 0, 0, this.n - 1);
        }
    }

    // Build segment tree - O(n)
    build(arr, node, start, end) {
        if (start === end) {
            this.tree[node] = arr[start];
            return;
        }

        const mid = Math.floor((start + end) / 2);
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;

        this.build(arr, leftChild, start, mid);
        this.build(arr, rightChild, mid + 1, end);

        this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
    }

    // Range sum query - O(log n)
    query(left, right, node = 0, start = 0, end = this.n - 1) {
        // No overlap
        if (right < start || left > end) {
            return 0;
        }

        // Complete overlap
        if (left <= start && end <= right) {
            return this.tree[node];
        }

        // Partial overlap
        const mid = Math.floor((start + end) / 2);
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;

        const leftSum = this.query(left, right, leftChild, start, mid);
        const rightSum = this.query(left, right, rightChild, mid + 1, end);

        return leftSum + rightSum;
    }

    // Update single element - O(log n)
    update(index, value, node = 0, start = 0, end = this.n - 1) {
        if (start === end) {
            this.tree[node] = value;
            return;
        }

        const mid = Math.floor((start + end) / 2);
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;

        if (index <= mid) {
            this.update(index, value, leftChild, start, mid);
        } else {
            this.update(index, value, rightChild, mid + 1, end);
        }

        this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
    }

    // Range update (add diff to range) - O(log n) with lazy propagation
    rangeUpdate(left, right, diff, node = 0, start = 0, end = this.n - 1) {
        if (right < start || left > end) {
            return;
        }

        if (start === end) {
            this.tree[node] += diff;
            return;
        }

        const mid = Math.floor((start + end) / 2);
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;

        this.rangeUpdate(left, right, diff, leftChild, start, mid);
        this.rangeUpdate(left, right, diff, rightChild, mid + 1, end);

        this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
    }
}

// Segment Tree for Range Minimum Query
class SegmentTreeMin {
    constructor(arr) {
        this.n = arr.length;
        this.tree = Array(4 * this.n).fill(Infinity);
        if (arr.length > 0) {
            this.build(arr, 0, 0, this.n - 1);
        }
    }

    build(arr, node, start, end) {
        if (start === end) {
            this.tree[node] = arr[start];
            return;
        }

        const mid = Math.floor((start + end) / 2);
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;

        this.build(arr, leftChild, start, mid);
        this.build(arr, rightChild, mid + 1, end);

        this.tree[node] = Math.min(this.tree[leftChild], this.tree[rightChild]);
    }

    query(left, right, node = 0, start = 0, end = this.n - 1) {
        if (right < start || left > end) {
            return Infinity;
        }

        if (left <= start && end <= right) {
            return this.tree[node];
        }

        const mid = Math.floor((start + end) / 2);
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;

        const leftMin = this.query(left, right, leftChild, start, mid);
        const rightMin = this.query(left, right, rightChild, mid + 1, end);

        return Math.min(leftMin, rightMin);
    }

    update(index, value, node = 0, start = 0, end = this.n - 1) {
        if (start === end) {
            this.tree[node] = value;
            return;
        }

        const mid = Math.floor((start + end) / 2);
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;

        if (index <= mid) {
            this.update(index, value, leftChild, start, mid);
        } else {
            this.update(index, value, rightChild, mid + 1, end);
        }

        this.tree[node] = Math.min(this.tree[leftChild], this.tree[rightChild]);
    }
}

// Segment Tree with Lazy Propagation
class SegmentTreeLazy {
    constructor(arr) {
        this.n = arr.length;
        this.tree = Array(4 * this.n).fill(0);
        this.lazy = Array(4 * this.n).fill(0);
        if (arr.length > 0) {
            this.build(arr, 0, 0, this.n - 1);
        }
    }

    build(arr, node, start, end) {
        if (start === end) {
            this.tree[node] = arr[start];
            return;
        }

        const mid = Math.floor((start + end) / 2);
        this.build(arr, 2 * node + 1, start, mid);
        this.build(arr, 2 * node + 2, mid + 1, end);
        this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }

    updateRange(left, right, value, node = 0, start = 0, end = this.n - 1) {
        // Apply pending updates
        if (this.lazy[node] !== 0) {
            this.tree[node] += (end - start + 1) * this.lazy[node];

            if (start !== end) {
                this.lazy[2 * node + 1] += this.lazy[node];
                this.lazy[2 * node + 2] += this.lazy[node];
            }

            this.lazy[node] = 0;
        }

        // No overlap
        if (start > right || end < left) {
            return;
        }

        // Complete overlap
        if (start >= left && end <= right) {
            this.tree[node] += (end - start + 1) * value;

            if (start !== end) {
                this.lazy[2 * node + 1] += value;
                this.lazy[2 * node + 2] += value;
            }

            return;
        }

        // Partial overlap
        const mid = Math.floor((start + end) / 2);
        this.updateRange(left, right, value, 2 * node + 1, start, mid);
        this.updateRange(left, right, value, 2 * node + 2, mid + 1, end);
        this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }

    query(left, right, node = 0, start = 0, end = this.n - 1) {
        if (start > right || end < left) {
            return 0;
        }

        // Apply pending updates
        if (this.lazy[node] !== 0) {
            this.tree[node] += (end - start + 1) * this.lazy[node];

            if (start !== end) {
                this.lazy[2 * node + 1] += this.lazy[node];
                this.lazy[2 * node + 2] += this.lazy[node];
            }

            this.lazy[node] = 0;
        }

        if (start >= left && end <= right) {
            return this.tree[node];
        }

        const mid = Math.floor((start + end) / 2);
        return this.query(left, right, 2 * node + 1, start, mid) +
               this.query(left, right, 2 * node + 2, mid + 1, end);
    }
}

// Example usage
if (require.main === module) {
    console.log('=== Segment Tree Demo ===\n');

    const arr = [1, 3, 5, 7, 9, 11];
    console.log('Array:', arr);

    const segTree = new SegmentTree(arr);
    
    console.log('\nRange sum queries:');
    console.log('  Sum [1, 3]:', segTree.query(1, 3)); // 3 + 5 + 7 = 15
    console.log('  Sum [0, 5]:', segTree.query(0, 5)); // 1 + 3 + 5 + 7 + 9 + 11 = 36

    console.log('\nUpdate index 2 to 10:');
    segTree.update(2, 10);
    console.log('  Sum [1, 3]:', segTree.query(1, 3)); // 3 + 10 + 7 = 20

    console.log('\n=== Range Minimum Query ===');
    const arr2 = [2, 5, 1, 4, 9, 3];
    const segTreeMin = new SegmentTreeMin(arr2);

    console.log('Array:', arr2);
    console.log('  Min [1, 4]:', segTreeMin.query(1, 4)); // min(5, 1, 4, 9) = 1
    console.log('  Min [0, 2]:', segTreeMin.query(0, 2)); // min(2, 5, 1) = 1

    console.log('\n=== Lazy Propagation ===');
    const arr3 = [1, 2, 3, 4, 5];
    const segTreeLazy = new SegmentTreeLazy(arr3);

    console.log('Array:', arr3);
    console.log('  Sum [0, 4]:', segTreeLazy.query(0, 4)); // 15

    console.log('\nAdd 3 to range [1, 3]:');
    segTreeLazy.updateRange(1, 3, 3);
    console.log('  Sum [0, 4]:', segTreeLazy.query(0, 4)); // 24
    console.log('  Sum [1, 3]:', segTreeLazy.query(1, 3)); // 18
}

module.exports = { SegmentTree, SegmentTreeMin, SegmentTreeLazy };
