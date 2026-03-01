/**
 * Radix Sort Algorithm
 * Non-comparative sorting algorithm
 * Sorts by processing individual digits
 * Time Complexity: O(d × (n + k)) where d is number of digits, k is range of digits
 * Space Complexity: O(n + k)
 * Stable: Yes
 */

// Get maximum value in array
function getMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// Counting sort for radix sort (sort by digit at exp)
function countingSortByDigit(arr, exp) {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);

    // Store count of occurrences
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
    }

    // Change count[i] so it contains actual position
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build output array
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    // Copy output to arr
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

// Main radix sort function (LSD - Least Significant Digit)
function radixSort(arr) {
    if (arr.length === 0) return arr;

    // Find the maximum number to know number of digits
    const max = getMax(arr);

    // Do counting sort for every digit
    // exp is 10^i where i is current digit number
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }

    return arr;
}

// Radix sort for strings (MSD - Most Significant Digit)
function radixSortStrings(arr) {
    if (arr.length === 0) return arr;

    const maxLength = Math.max(...arr.map(s => s.length));
    
    // Pad strings to same length
    const paddedArr = arr.map(s => s.padEnd(maxLength, '\0'));
    
    // Sort using MSD radix sort
    radixSortMSD(paddedArr, 0, paddedArr.length - 1, 0, maxLength);
    
    // Remove padding
    return paddedArr.map(s => s.replace(/\0+$/, ''));
}

// MSD Radix Sort helper
function radixSortMSD(arr, low, high, digit, maxLength) {
    if (low >= high || digit >= maxLength) return;

    const buckets = Array.from({ length: 256 }, () => []);

    // Distribute strings into buckets
    for (let i = low; i <= high; i++) {
        const charCode = arr[i].charCodeAt(digit) || 0;
        buckets[charCode].push(arr[i]);
    }

    // Copy back and recursively sort each bucket
    let index = low;
    for (let bucket of buckets) {
        const start = index;
        for (let str of bucket) {
            arr[index++] = str;
        }
        if (bucket.length > 1) {
            radixSortMSD(arr, start, index - 1, digit + 1, maxLength);
        }
    }
}

// Radix sort for negative numbers
function radixSortWithNegatives(arr) {
    if (arr.length === 0) return arr;

    // Separate positive and negative numbers
    const negative = arr.filter(x => x < 0).map(x => -x);
    const positive = arr.filter(x => x >= 0);

    // Sort both arrays
    if (negative.length > 0) radixSort(negative);
    if (positive.length > 0) radixSort(positive);

    // Combine: reversed negatives + positives
    return negative.reverse().map(x => -x).concat(positive);
}

// Example usage
if (require.main === module) {
    console.log('=== Radix Sort Demo ===\n');

    const arr1 = [170, 45, 75, 90, 802, 24, 2, 66];
    console.log('Original array:', arr1);
    radixSort([...arr1]);
    console.log('Sorted array:', radixSort([...arr1]));

    const arr2 = [121, 432, 564, 23, 1, 45, 788];
    console.log('\nOriginal array:', arr2);
    console.log('Sorted array:', radixSort([...arr2]));

    // With negative numbers
    const arr3 = [170, -45, 75, -90, 802, -24, 2, 66];
    console.log('\nWith negative numbers:', arr3);
    console.log('Sorted array:', radixSortWithNegatives([...arr3]));

    // String radix sort
    const strings = ['dog', 'cat', 'apple', 'banana', 'zebra', 'ant'];
    console.log('\nOriginal strings:', strings);
    console.log('Sorted strings:', radixSortStrings([...strings]));

    // Performance test
    const largeArr = Array.from({ length: 10000 }, () => 
        Math.floor(Math.random() * 100000)
    );
    console.log('\n=== Performance Test ===');
    console.log('Sorting 10,000 elements...');
    console.time('Radix Sort');
    radixSort([...largeArr]);
    console.timeEnd('Radix Sort');

    console.log('\nTime Complexity: O(d × (n + k))');
    console.log('Space Complexity: O(n + k)');
    console.log('Stable: Yes');
    console.log('Best for: Integer arrays with limited digit count');
}

module.exports = {
    radixSort,
    radixSortStrings,
    radixSortWithNegatives
};
