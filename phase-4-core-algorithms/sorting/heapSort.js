/**
 * Heap Sort Algorithm
 * Uses heap data structure (max heap for ascending sort)
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(1) - sorts in place
 * Not stable
 */

function heapSort(arr) {
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];

        // Heapify reduced heap
        heapify(arr, i, 0);
    }

    return arr;
}

// Heapify a subtree rooted at index i
function heapify(arr, n, i) {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

// Descending order heap sort
function heapSortDescending(arr) {
    const n = arr.length;

    // Build min heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyMin(arr, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapifyMin(arr, i, 0);
    }

    return arr;
}

function heapifyMin(arr, n, i) {
    let smallest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] < arr[smallest]) {
        smallest = left;
    }

    if (right < n && arr[right] < arr[smallest]) {
        smallest = right;
    }

    if (smallest !== i) {
        [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
        heapifyMin(arr, n, smallest);
    }
}

// Example usage
if (require.main === module) {
    console.log('=== Heap Sort Demo ===\n');

    const arr1 = [12, 11, 13, 5, 6, 7];
    console.log('Original array:', arr1);
    heapSort(arr1);
    console.log('Sorted array (ascending):', arr1);

    const arr2 = [64, 34, 25, 12, 22, 11, 90];
    console.log('\nOriginal array:', arr2);
    heapSortDescending(arr2);
    console.log('Sorted array (descending):', arr2);

    // Performance test
    const largeArr = Array.from({ length: 10000 }, () => 
        Math.floor(Math.random() * 10000)
    );
    console.log('\n=== Performance Test ===');
    console.log('Sorting 10,000 elements...');
    console.time('Heap Sort');
    heapSort([...largeArr]);
    console.timeEnd('Heap Sort');

    console.log('\nTime Complexity: O(n log n) in all cases');
    console.log('Space Complexity: O(1)');
    console.log('Stable: No');
}

module.exports = { heapSort, heapSortDescending };
