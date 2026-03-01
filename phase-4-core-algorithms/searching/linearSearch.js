/**
 * Linear Search Algorithm
 * Searches for element sequentially in array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Works on both sorted and unsorted arrays
 */

function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}

// Find all occurrences
function linearSearchAll(arr, target) {
    const indices = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            indices.push(i);
        }
    }
    return indices;
}

// Linear search with custom comparator
function linearSearchCustom(arr, target, comparator) {
    for (let i = 0; i < arr.length; i++) {
        if (comparator(arr[i], target)) {
            return i;
        }
    }
    return -1;
}

// Find last occurrence
function linearSearchLast(arr, target) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

// Example usage
if (require.main === module) {
    console.log('=== Linear Search Demo ===\n');

    const arr = [64, 34, 25, 12, 22, 11, 90, 22];

    console.log('Array:', arr);
    console.log('Search for 22:', linearSearch(arr, 22));
    console.log('Search for 100:', linearSearch(arr, 100));
    console.log('Find all 22:', linearSearchAll(arr, 22));
    console.log('Find last 22:', linearSearchLast(arr, 22));

    // Custom comparator (find first even number)
    const firstEven = linearSearchCustom(arr, null, (num) => num % 2 === 0);
    console.log('First even number index:', firstEven);
}

module.exports = {
    linearSearch,
    linearSearchAll,
    linearSearchCustom,
    linearSearchLast
};
