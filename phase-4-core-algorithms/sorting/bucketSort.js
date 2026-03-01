/**
 * Bucket Sort Algorithm
 * Distributes elements into buckets, sorts buckets, then concatenates
 * Time Complexity: O(n + k) average, O(n²) worst case
 * Space Complexity: O(n + k)
 * Stable: Yes (if underlying sort is stable)
 * Works best on uniformly distributed data
 */

// Main bucket sort function (for floating point numbers [0, 1))
function bucketSort(arr, bucketSize = 5) {
    if (arr.length === 0) return arr;

    // Find minimum and maximum values
    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }

    // Initialize buckets
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = Array.from({ length: bucketCount }, () => []);

    // Distribute elements into buckets
    for (let i = 0; i < arr.length; i++) {
        const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
        buckets[bucketIndex].push(arr[i]);
    }

    // Sort individual buckets and concatenate
    arr.length = 0;
    for (let i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i]); // Can use any sorting algorithm
        for (let j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);
        }
    }

    return arr;
}

// Insertion sort for bucket sorting
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

// Bucket sort for integers with specified range
function bucketSortIntegers(arr, min, max) {
    if (arr.length === 0) return arr;

    const bucketSize = Math.ceil((max - min + 1) / arr.length);
    const bucketCount = Math.ceil((max - min + 1) / bucketSize);
    const buckets = Array.from({ length: bucketCount }, () => []);

    // Distribute elements
    for (let num of arr) {
        const bucketIndex = Math.floor((num - min) / bucketSize);
        buckets[bucketIndex].push(num);
    }

    // Sort and concatenate
    arr.length = 0;
    for (let bucket of buckets) {
        insertionSort(bucket);
        arr.push(...bucket);
    }

    return arr;
}

// Bucket sort for floating point numbers in [0, 1)
function bucketSortFloat(arr) {
    if (arr.length === 0) return arr;

    const n = arr.length;
    const buckets = Array.from({ length: n }, () => []);

    // Put array elements in different buckets
    for (let i = 0; i < n; i++) {
        const bucketIndex = Math.floor(n * arr[i]);
        buckets[bucketIndex].push(arr[i]);
    }

    // Sort individual buckets
    for (let i = 0; i < n; i++) {
        insertionSort(buckets[i]);
    }

    // Concatenate all buckets
    let index = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            arr[index++] = buckets[i][j];
        }
    }

    return arr;
}

// Bucket sort with custom bucket count
function bucketSortCustom(arr, bucketCount) {
    if (arr.length === 0 || bucketCount <= 0) return arr;

    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const bucketSize = (max - min) / bucketCount;
    const buckets = Array.from({ length: bucketCount }, () => []);

    // Distribute elements
    for (let num of arr) {
        let bucketIndex = Math.floor((num - min) / bucketSize);
        if (bucketIndex >= bucketCount) bucketIndex = bucketCount - 1;
        buckets[bucketIndex].push(num);
    }

    // Sort and merge
    arr.length = 0;
    for (let bucket of buckets) {
        insertionSort(bucket);
        arr.push(...bucket);
    }

    return arr;
}

// Example usage
if (require.main === module) {
    console.log('=== Bucket Sort Demo ===\n');

    const arr1 = [29, 25, 3, 49, 9, 37, 21, 43];
    console.log('Original array:', arr1);
    console.log('Sorted array:', bucketSort([...arr1], 10));

    const arr2 = [0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434];
    console.log('\nFloating point array [0, 1):', arr2);
    console.log('Sorted array:', bucketSortFloat([...arr2]));

    const arr3 = [54, 46, 83, 66, 95, 92, 43];
    console.log('\nInteger array:', arr3);
    console.log('Sorted with 5 buckets:', bucketSortCustom([...arr3], 5));

    // Uniformly distributed data
    const uniformArr = Array.from({ length: 20 }, () => 
        Math.floor(Math.random() * 100)
    );
    console.log('\nUniformly distributed data:', uniformArr);
    console.log('Sorted array:', bucketSort([...uniformArr], 10));

    // Performance comparison
    const largeArr = Array.from({ length: 10000 }, () => 
        Math.random() * 1000
    );
    console.log('\n=== Performance Test ===');
    console.log('Sorting 10,000 uniformly distributed elements...');
    console.time('Bucket Sort');
    bucketSort([...largeArr], 100);
    console.timeEnd('Bucket Sort');

    console.log('\nTime Complexity: O(n + k) average, O(n²) worst');
    console.log('Space Complexity: O(n + k)');
    console.log('Stable: Yes');
    console.log('Best for: Uniformly distributed data');
}

module.exports = {
    bucketSort,
    bucketSortIntegers,
    bucketSortFloat,
    bucketSortCustom
};
