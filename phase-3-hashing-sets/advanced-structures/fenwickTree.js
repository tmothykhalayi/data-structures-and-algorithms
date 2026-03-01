/**
 * Fenwick Tree (Binary Indexed Tree)
 * Efficient for prefix sum queries and point updates
 * Time: O(log n) for both query and update
 * Space: O(n)
 * Simpler than Segment Tree but less versatile
 */

class FenwickTree {
    constructor(size) {
        this.size = size;
        this.tree = Array(size + 1).fill(0);
    }

    // Update value at index - O(log n)
    update(index, delta) {
        index++; // Convert to 1-indexed

        while (index <= this.size) {
            this.tree[index] += delta;
            index += index & -index; // Add last set bit
        }
    }

    // Get prefix sum [0, index] - O(log n)
    query(index) {
        index++; // Convert to 1-indexed
        let sum = 0;

        while (index > 0) {
            sum += this.tree[index];
            index -= index & -index; // Remove last set bit
        }

        return sum;
    }

    // Get range sum [left, right] - O(log n)
    rangeQuery(left, right) {
        if (left > 0) {
            return this.query(right) - this.query(left - 1);
        }
        return this.query(right);
    }

    // Build from array - O(n log n)
    buildFromArray(arr) {
        this.tree = Array(this.size + 1).fill(0);
        for (let i = 0; i < arr.length; i++) {
            this.update(i, arr[i]);
        }
    }

    // Point update (set value) - O(log n)
    set(index, value) {
        const currentValue = this.query(index) - (index > 0 ? this.query(index - 1) : 0);
        const delta = value - currentValue;
        this.update(index, delta);
    }

    // Get value at index - O(log n)
    get(index) {
        return this.query(index) - (index > 0 ? this.query(index - 1) : 0);
    }
}

// 2D Fenwick Tree for 2D range sum queries
class FenwickTree2D {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.tree = Array.from({ length: rows + 1 }, () => 
            Array(cols + 1).fill(0)
        );
    }

    // Update value at (row, col) - O(log m * log n)
    update(row, col, delta) {
        row++; col++; // Convert to 1-indexed

        for (let i = row; i <= this.rows; i += i & -i) {
            for (let j = col; j <= this.cols; j += j & -j) {
                this.tree[i][j] += delta;
            }
        }
    }

    // Query sum from (0,0) to (row, col) - O(log m * log n)
    query(row, col) {
        row++; col++;
        let sum = 0;

        for (let i = row; i > 0; i -= i & -i) {
            for (let j = col; j > 0; j -= j & -j) {
                sum += this.tree[i][j];
            }
        }

        return sum;
    }

    // Range sum query - O(log m * log n)
    rangeQuery(row1, col1, row2, col2) {
        return this.query(row2, col2) 
             - (row1 > 0 ? this.query(row1 - 1, col2) : 0)
             - (col1 > 0 ? this.query(row2, col1 - 1) : 0)
             + (row1 > 0 && col1 > 0 ? this.query(row1 - 1, col1 - 1) : 0);
    }
}

// Fenwick Tree for frequency count
class FenwickTreeFrequency {
    constructor(maxValue) {
        this.fenwick = new FenwickTree(maxValue);
    }

    // Add occurrence of value - O(log n)
    add(value) {
        this.fenwick.update(value, 1);
    }

    // Remove occurrence of value - O(log n)
    remove(value) {
        this.fenwick.update(value, -1);
    }

    // Count elements <= value - O(log n)
    countLessEqual(value) {
        return this.fenwick.query(value);
    }

    // Count elements in range [left, right] - O(log n)
    countInRange(left, right) {
        return this.fenwick.rangeQuery(left, right);
    }

    // Find kth smallest element (binary search) - O(log² n)
    kthSmallest(k) {
        let left = 0, right = this.fenwick.size - 1;
        let result = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const count = this.fenwick.query(mid);

            if (count >= k) {
                result = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return result;
    }
}

// Application: Count inversions in array
function countInversions(arr) {
    const maxVal = Math.max(...arr);
    const fenwick = new FenwickTree(maxVal);
    let inversions = 0;

    for (let i = arr.length - 1; i >= 0; i--) {
        inversions += fenwick.query(arr[i] - 1);
        fenwick.update(arr[i], 1);
    }

    return inversions;
}

// Example usage
if (require.main === module) {
    console.log('=== Fenwick Tree Demo ===\n');

    const arr = [3, 2, -1, 6, 5, 4, -3, 3, 7, 2, 3];
    console.log('Array:', arr);

    const fenwick = new FenwickTree(arr.length);
    fenwick.buildFromArray(arr);

    console.log('\nPrefix sum queries:');
    console.log('  Sum [0, 3]:', fenwick.query(3));
    console.log('  Sum [0, 5]:', fenwick.query(5));

    console.log('\nRange queries:');
    console.log('  Sum [2, 5]:', fenwick.rangeQuery(2, 5));
    console.log('  Sum [4, 8]:', fenwick.rangeQuery(4, 8));

    console.log('\nUpdate index 2 (add 10):');
    fenwick.update(2, 10);
    console.log('  Sum [0, 3]:', fenwick.query(3));
    console.log('  Sum [2, 5]:', fenwick.rangeQuery(2, 5));

    console.log('\n=== 2D Fenwick Tree ===');
    const fenwick2D = new FenwickTree2D(4, 4);
    
    // Build simple 4x4 matrix
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            fenwick2D.update(i, j, i + j + 1);
        }
    }

    console.log('Range sum (0,0) to (2,2):', fenwick2D.rangeQuery(0, 0, 2, 2));
    console.log('Range sum (1,1) to (3,3):', fenwick2D.rangeQuery(1, 1, 3, 3));

    console.log('\n=== Frequency Count ===');
    const freqTree = new FenwickTreeFrequency(100);
    
    const numbers = [5, 2, 8, 2, 9, 1, 5, 3];
    numbers.forEach(num => freqTree.add(num));

    console.log('Numbers:', numbers);
    console.log('Count <= 5:', freqTree.countLessEqual(5));
    console.log('Count in [2, 8]:', freqTree.countInRange(2, 8));
    console.log('3rd smallest:', freqTree.kthSmallest(3));

    console.log('\n=== Count Inversions ===');
    const arr2 = [8, 4, 2, 1];
    console.log('Array:', arr2);
    console.log('Number of inversions:', countInversions(arr2));

    const arr3 = [3, 1, 2];
    console.log('\nArray:', arr3);
    console.log('Number of inversions:', countInversions(arr3));
}

module.exports = { 
    FenwickTree, 
    FenwickTree2D, 
    FenwickTreeFrequency,
    countInversions 
};
