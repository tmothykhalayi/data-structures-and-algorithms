/**
 * Counting Sort Algorithm
 * Integer sorting algorithm - counts occurrences of each value
 * Time Complexity: O(n + k) where k is the range of input
 * Space Complexity: O(k)
 * Stable: Yes
 * Works best when range of input is not significantly greater than n
 */

function countingSort(arr) {
    if (arr.length === 0) return arr;

    // Find the range
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;

    // Create count array
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);

    // Store count of each element
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }

    // Change count[i] so that it contains actual position
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array (traverse from right to maintain stability)
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }

    // Copy output array to original array
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }

    return arr;
}

// Simplified version (non-stable but easier to understand)
function countingSortSimple(arr) {
    if (arr.length === 0) return arr;

    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;

    const count = new Array(range).fill(0);

    // Count occurrences
    for (let num of arr) {
        count[num - min]++;
    }

    // Rebuild array
    let index = 0;
    for (let i = 0; i < range; i++) {
        while (count[i] > 0) {
            arr[index++] = i + min;
            count[i]--;
        }
    }

    return arr;
}

// Counting sort for specific range [0, k]
function countingSortRange(arr, k) {
    const count = new Array(k + 1).fill(0);
    const output = new Array(arr.length);

    // Store count
    for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++;
    }

    // Accumulate count
    for (let i = 1; i <= k; i++) {
        count[i] += count[i - 1];
    }

    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    return output;
}

// Get the frequency of each number
function getFrequency(arr) {
    const frequency = {};
    const min = Math.min(...arr);
    const max = Math.max(...arr);

    for (let i = min; i <= max; i++) {
        frequency[i] = 0;
    }

    for (let num of arr) {
        frequency[num]++;
    }

    return frequency;
}

// Example usage
if (require.main === module) {
    console.log('=== Counting Sort Demo ===\n');

    const arr1 = [4, 2, 2, 8, 3, 3, 1];
    console.log('Original array:', arr1);
    countingSort([...arr1]);
    console.log('Sorted array:', countingSort([...arr1]));

    const arr2 = [64, 34, 25, 12, 22, 11, 90];
    console.log('\nOriginal array:', arr2);
    console.log('Sorted array:', countingSortSimple([...arr2]));

    // With negative numbers
    const arr3 = [-5, -10, 0, -3, 8, 5, -1, 10];
    console.log('\nWith negative numbers:', arr3);
    console.log('Sorted array:', countingSort([...arr3]));

    // Frequency count
    const arr4 = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
    console.log('\nFrequency count for:', arr4);
    console.log(getFrequency(arr4));

    console.log('\nTime Complexity: O(n + k) where k is range');
    console.log('Space Complexity: O(k)');
    console.log('Stable: Yes');
    console.log('Best for: Small range of integers');
}

module.exports = {
    countingSort,
    countingSortSimple,
    countingSortRange,
    getFrequency
};
