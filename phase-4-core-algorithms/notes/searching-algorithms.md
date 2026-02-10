# Searching Algorithms Guide

## Overview

Searching algorithms find the position of a target value within a data structure.

## Linear Search

Sequentially checks each element until match found.

```javascript
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Found at index i
        }
    }
    return -1; // Not found
}
```

**Time Complexity:**
- Best: O(1) - Found at first position
- Average: O(n)
- Worst: O(n) - Found at last or not present

**Space: O(1)**

**When to use:**
- Small datasets
- Unsorted data
- Need to scan all elements

---

## Binary Search 🎯

Efficient search on **sorted arrays** by repeatedly dividing search space in half.

### Iterative Implementation

```javascript
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid; // Found
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Not found
}
```

### Recursive Implementation

```javascript
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) {
        return -1; // Base case: not found
    }
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
        return mid; // Found
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}
```

**Time Complexity:** O(log n)
**Space:** O(1) iterative, O(log n) recursive (call stack)

**Requirements:** Array must be **sorted**

---

## Binary Search Variations

### 1. Find First Occurrence

```javascript
function findFirst(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            right = mid - 1; // Continue searching left
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}
```

### 2. Find Last Occurrence

```javascript
function findLast(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            left = mid + 1; // Continue searching right
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}
```

### 3. Find Insert Position

```javascript
function searchInsert(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left; // Insert position
}
```

### 4. Find Peak Element

```javascript
function findPeakElement(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] > arr[mid + 1]) {
            right = mid; // Peak in left half (including mid)
        } else {
            left = mid + 1; // Peak in right half
        }
    }
    
    return left; // Peak index
}
```

### 5. Search in Rotated Sorted Array

```javascript
function searchRotated(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        
        // Determine which half is sorted
        if (arr[left] <= arr[mid]) {
            // Left half is sorted
            if (target >= arr[left] && target < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (target > arr[mid] && target <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}
```

---

## Binary Search on Answer Space

Sometimes we binary search on the **answer** rather than array indices.

### Example: Square Root

```javascript
function mySqrt(x) {
    if (x < 2) return x;
    
    let left = 2;
    let right = Math.floor(x / 2);
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const squared = mid * mid;
        
        if (squared === x) return mid;
        if (squared > x) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return right; // Floor of square root
}
```

### Example: Minimum in Rotated Array

```javascript
function findMin(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] > arr[right]) {
            left = mid + 1; // Minimum in right half
        } else {
            right = mid; // Minimum in left half (including mid)
        }
    }
    
    return arr[left];
}
```

---

## Exponential Search

For unbounded/infinite arrays, combine binary search with exponential jumps.

```javascript
function exponentialSearch(arr, target) {
    if (arr[0] === target) return 0;
    
    // Find range for binary search
    let i = 1;
    while (i < arr.length && arr[i] <= target) {
        i *= 2;
    }
    
    // Binary search in range [i/2, min(i, arr.length-1)]
    return binarySearch(arr, target, i / 2, Math.min(i, arr.length - 1));
}
```

**Time Complexity:** O(log n)
**Use Case:** Unbounded arrays, don't know size

---

## Jump Search

Jumps ahead by fixed steps, then linear search.

```javascript
function jumpSearch(arr, target) {
    const n = arr.length;
    const jump = Math.floor(Math.sqrt(n));
    let prev = 0;
    
    // Jump to find block
    while (arr[Math.min(jump, n) - 1] < target) {
        prev = jump;
        jump += Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
    
    // Linear search in block
    while (arr[prev] < target) {
        prev++;
        if (prev === Math.min(jump, n)) return -1;
    }
    
    if (arr[prev] === target) return prev;
    return -1;
}
```

**Time Complexity:** O(√n)
**Use Case:** When jump back is costly

---

## Interpolation Search

Improves binary search for uniformly distributed sorted data.

```javascript
function interpolationSearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low === high) {
            return arr[low] === target ? low : -1;
        }
        
        // Interpolation formula
        const pos = low + Math.floor(
            ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        );
        
        if (arr[pos] === target) return pos;
        if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    
    return -1;
}
```

**Time Complexity:**
- Average: O(log log n) - Uniformly distributed
- Worst: O(n) - Non-uniform

---

## Ternary Search

Divides array into three parts (like binary search but 3-way).

```javascript
function ternarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);
    
    if (arr[mid1] === target) return mid1;
    if (arr[mid2] === target) return mid2;
    
    if (target < arr[mid1]) {
        return ternarySearch(arr, target, left, mid1 - 1);
    } else if (target > arr[mid2]) {
        return ternarySearch(arr, target, mid2 + 1, right);
    } else {
        return ternarySearch(arr, target, mid1 + 1, mid2 - 1);
    }
}
```

**Time Complexity:** O(log₃ n) ≈ O(log n)
**Note:** Binary search typically faster in practice

---

## Search Algorithm Comparison

| Algorithm | Time (Avg) | Time (Worst) | Space | Requirements |
|-----------|-----------|--------------|-------|--------------|
| Linear    | O(n)      | O(n)         | O(1)  | None         |
| Binary    | O(log n)  | O(log n)     | O(1)  | Sorted       |
| Jump      | O(√n)     | O(√n)        | O(1)  | Sorted       |
| Interpolation | O(log log n) | O(n)  | O(1)  | Sorted, uniform |
| Exponential | O(log n) | O(log n)    | O(1)  | Sorted, unbounded |
| Ternary   | O(log n)  | O(log n)     | O(log n) | Sorted    |

---

## Common Binary Search Patterns

1. **Find exact match** - Standard binary search
2. **Find first/last occurrence** - Continue searching after finding
3. **Find insert position** - Return left pointer when not found
4. **Find closest element** - Track best match
5. **Search rotated array** - Identify sorted half
6. **Binary search on answer** - Search solution space
7. **2D matrix search** - Treat as 1D sorted array

---

## Practice Problems

1. **Binary Search** (LeetCode 704)
2. **Search Insert Position** (LeetCode 35)
3. **First Bad Version** (LeetCode 278)
4. **Search in Rotated Sorted Array** (LeetCode 33)
5. **Find Peak Element** (LeetCode 162)
6. **Sqrt(x)** (LeetCode 69)
7. **Find Minimum in Rotated Sorted Array** (LeetCode 153)

---

## Key Takeaways

✅ Binary search requires **sorted** data
✅ Always O(log n) - incredibly efficient
✅ Watch for **off-by-one errors** (left <= right vs left < right)
✅ Useful beyond arrays: answer space, decision problems
✅ Master all variations - interviews love binary search
✅ `mid = left + (right - left) / 2` prevents overflow

Binary search is fundamental - practice until it's second nature!
