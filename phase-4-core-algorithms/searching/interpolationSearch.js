/**
 * Interpolation Search Algorithm
 * Improved variant of binary search for uniformly distributed sorted data
 * Uses position formula instead of middle element
 * Time Complexity: O(log log n) average, O(n) worst
 * Space Complexity: O(1)
 * Works best on uniformly distributed sorted arrays
 */

// Iterative interpolation search
function interpolationSearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
        // If array has only one element
        if (low === high) {
            if (arr[low] === target) return low;
            return -1;
        }

        // Probing position with keeping uniform distribution in mind
        const pos = low + Math.floor(
            ((target - arr[low]) / (arr[high] - arr[low])) * (high - low)
        );

        // Target found
        if (arr[pos] === target) {
            return pos;
        }

        // Target is in upper part
        if (arr[pos] < target) {
            low = pos + 1;
        }
        // Target is in lower part
        else {
            high = pos - 1;
        }
    }

    return -1;
}

// Recursive interpolation search
function interpolationSearchRecursive(arr, target, low = 0, high = arr.length - 1) {
    if (low > high || target < arr[low] || target > arr[high]) {
        return -1;
    }

    if (low === high) {
        return arr[low] === target ? low : -1;
    }

    const pos = low + Math.floor(
        ((target - arr[low]) / (arr[high] - arr[low])) * (high - low)
    );

    if (arr[pos] === target) {
        return pos;
    }

    if (arr[pos] < target) {
        return interpolationSearchRecursive(arr, target, pos + 1, high);
    }

    return interpolationSearchRecursive(arr, target, low, pos - 1);
}

// Find closest element to target
function findClosest(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    let closest = arr[0];
    let minDiff = Math.abs(target - arr[0]);

    while (low <= high) {
        if (target < arr[low] || target > arr[high]) {
            break;
        }

        const pos = low + Math.floor(
            ((target - arr[low]) / (arr[high] - arr[low])) * (high - low)
        );

        const diff = Math.abs(target - arr[pos]);
        if (diff < minDiff) {
            minDiff = diff;
            closest = arr[pos];
        }

        if (arr[pos] === target) {
            return arr[pos];
        } else if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }

    return closest;
}

// Find all elements in range [low, high]
function findInRange(arr, low, high) {
    const result = [];
    const startIdx = interpolationSearch(arr, low);
    
    if (startIdx === -1) {
        // Find first element >= low
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] >= low) {
                for (let j = i; j < arr.length && arr[j] <= high; j++) {
                    result.push(arr[j]);
                }
                break;
            }
        }
    } else {
        // Found low, collect all elements up to high
        for (let i = startIdx; i < arr.length && arr[i] <= high; i++) {
            result.push(arr[i]);
        }
    }

    return result;
}

// Example usage
if (require.main === module) {
    console.log('=== Interpolation Search Demo ===\n');

    // Uniformly distributed array
    const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    console.log('Uniformly distributed array:', arr);

    console.log('Search for 50 (iterative):', interpolationSearch(arr, 50));
    console.log('Search for 10 (iterative):', interpolationSearch(arr, 10));
    console.log('Search for 100 (iterative):', interpolationSearch(arr, 100));
    console.log('Search for 45 (iterative):', interpolationSearch(arr, 45));

    console.log('\nSearch for 70 (recursive):', interpolationSearchRecursive(arr, 70));
    console.log('Search for 25 (recursive):', interpolationSearchRecursive(arr, 25));

    // Find closest
    console.log('\nFind closest to 45:', findClosest(arr, 45));
    console.log('Find closest to 75:', findClosest(arr, 75));
    console.log('Find closest to 5:', findClosest(arr, 5));

    // Find range
    console.log('\nElements in range [30, 70]:', findInRange(arr, 30, 70));
    console.log('Elements in range [25, 55]:', findInRange(arr, 25, 55));

    // Performance comparison on large uniform array
    console.log('\n=== Performance on Large Array ===');
    const largeArr = Array.from({ length: 10000 }, (_, i) => i * 10);
    
    console.time('Interpolation Search');
    interpolationSearch(largeArr, 50000);
    console.timeEnd('Interpolation Search');

    // Note: Works best on uniformly distributed data
    console.log('\nNote: Interpolation search is most efficient on');
    console.log('uniformly distributed sorted arrays.');
}

module.exports = {
    interpolationSearch,
    interpolationSearchRecursive,
    findClosest,
    findInRange
};
