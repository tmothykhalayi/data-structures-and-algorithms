/**
 * Exponential Search Algorithm
 * Find range by repeated doubling, then binary search
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Works only on sorted arrays
 * Particularly useful for unbounded/infinite arrays
 */

// Binary search helper function
function binarySearch(arr, target, left, right) {
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) return mid;
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// Exponential search
function exponentialSearch(arr, target) {
    if (arr.length === 0) return -1;
    if (arr[0] === target) return 0;

    // Find range for binary search by repeated doubling
    let bound = 1;
    while (bound < arr.length && arr[bound] < target) {
        bound *= 2;
    }

    // Apply binary search in the found range
    return binarySearch(
        arr,
        target,
        bound / 2,
        Math.min(bound, arr.length - 1)
    );
}

// Exponential search for unbounded array (simulator)
function exponentialSearchUnbounded(arr, target) {
    if (arr[0] === target) return 0;

    let i = 1;
    // Find range where element might exist
    while (i < arr.length && arr[i] <= target) {
        if (arr[i] === target) return i;
        i *= 2;
    }

    // Binary search in the found range
    return binarySearch(
        arr,
        target,
        i / 2,
        Math.min(i, arr.length - 1)
    );
}

// Find position to insert element
function findInsertPosition(arr, target) {
    if (arr.length === 0) return 0;
    if (target <= arr[0]) return 0;

    let bound = 1;
    while (bound < arr.length && arr[bound] < target) {
        bound *= 2;
    }

    let left = bound / 2;
    let right = Math.min(bound, arr.length - 1);

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) return mid;
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left;
}

// Example usage
if (require.main === module) {
    console.log('=== Exponential Search Demo ===\n');

    const arr = [2, 3, 4, 10, 40, 50, 60, 70, 80, 90, 100];
    console.log('Sorted array:', arr);

    console.log('Search for 10:', exponentialSearch(arr, 10));
    console.log('Search for 90:', exponentialSearch(arr, 90));
    console.log('Search for 2:', exponentialSearch(arr, 2));
    console.log('Search for 100:', exponentialSearch(arr, 100));
    console.log('Search for 45:', exponentialSearch(arr, 45));

    // Large array demonstration
    const largeArr = Array.from({ length: 1000 }, (_, i) => i * 2);
    console.log('\nLarge array (0, 2, 4, ..., 1998)');
    console.log('Search for 500:', exponentialSearch(largeArr, 500));
    console.log('Search for 1000:', exponentialSearch(largeArr, 1000));

    // Find insert position
    console.log('\nFind insert position for 45:', findInsertPosition(arr, 45));
    console.log('Find insert position for 85:', findInsertPosition(arr, 85));
}

module.exports = {
    exponentialSearch,
    exponentialSearchUnbounded,
    findInsertPosition
};
