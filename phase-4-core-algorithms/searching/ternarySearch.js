/**
 * Ternary Search Algorithm
 * Divides array into three parts
 * Time Complexity: O(log₃ n)
 * Space Complexity: O(1) iterative, O(log n) recursive
 * Works only on sorted arrays
 * Use case: Finding maximum/minimum in unimodal functions
 */

// Iterative ternary search
function ternarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid1 = left + Math.floor((right - left) / 3);
        const mid2 = right - Math.floor((right - left) / 3);

        if (arr[mid1] === target) return mid1;
        if (arr[mid2] === target) return mid2;

        if (target < arr[mid1]) {
            right = mid1 - 1;
        } else if (target > arr[mid2]) {
            left = mid2 + 1;
        } else {
            left = mid1 + 1;
            right = mid2 - 1;
        }
    }

    return -1;
}

// Recursive ternary search
function ternarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;

    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);

    if (arr[mid1] === target) return mid1;
    if (arr[mid2] === target) return mid2;

    if (target < arr[mid1]) {
        return ternarySearchRecursive(arr, target, left, mid1 - 1);
    } else if (target > arr[mid2]) {
        return ternarySearchRecursive(arr, target, mid2 + 1, right);
    } else {
        return ternarySearchRecursive(arr, target, mid1 + 1, mid2 - 1);
    }
}

// Find peak element in unimodal array
function findPeak(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (right - left > 2) {
        const mid1 = left + Math.floor((right - left) / 3);
        const mid2 = right - Math.floor((right - left) / 3);

        if (arr[mid1] < arr[mid2]) {
            left = mid1 + 1;
        } else {
            right = mid2 - 1;
        }
    }

    let maxIndex = left;
    for (let i = left + 1; i <= right; i++) {
        if (arr[i] > arr[maxIndex]) {
            maxIndex = i;
        }
    }

    return maxIndex;
}

// Example usage
if (require.main === module) {
    console.log('=== Ternary Search Demo ===\n');

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    console.log('Sorted array:', arr);

    console.log('Search for 5 (iterative):', ternarySearch(arr, 5));
    console.log('Search for 1 (iterative):', ternarySearch(arr, 1));
    console.log('Search for 10 (iterative):', ternarySearch(arr, 10));
    console.log('Search for 11 (iterative):', ternarySearch(arr, 11));

    console.log('\nSearch for 5 (recursive):', ternarySearchRecursive(arr, 5));
    console.log('Search for 8 (recursive):', ternarySearchRecursive(arr, 8));

    // Find peak in unimodal array
    const unimodal = [1, 3, 8, 12, 15, 11, 7, 5];
    console.log('\nUnimodal array:', unimodal);
    const peakIndex = findPeak(unimodal);
    console.log('Peak element index:', peakIndex, '(value:', unimodal[peakIndex] + ')');
}

module.exports = {
    ternarySearch,
    ternarySearchRecursive,
    findPeak
};
