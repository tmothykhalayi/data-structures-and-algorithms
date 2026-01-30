# Arrays - Complete Guide

## What is an Array?

An array is a collection of elements stored in contiguous memory locations. Each element can be accessed directly using its index.

```javascript
// Array in memory
[10, 20, 30, 40, 50]
 ↓   ↓   ↓   ↓   ↓
[0] [1] [2] [3] [4]  (indices)

Memory: [1000][1004][1008][1012][1016]
```

---

## Types of Arrays

### 1. Static Arrays
Fixed size, allocated at compile time.

```javascript
// In languages like C/Java
int arr[5];  // Fixed size of 5
```

### 2. Dynamic Arrays
Resizable, grows as needed (JavaScript arrays, Python lists, Java ArrayList).

```javascript
const arr = [];
arr.push(1);  // Grows automatically
arr.push(2);
arr.push(3);
```

---

## Time Complexity

| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Access by index | O(1) | Direct memory access |
| Search | O(n) | Must check each element |
| Insert at end | O(1)* | Amortized for dynamic arrays |
| Insert at beginning | O(n) | Shift all elements |
| Insert at middle | O(n) | Shift elements after index |
| Delete at end | O(1) | Just remove last |
| Delete at beginning | O(n) | Shift all elements |
| Delete at middle | O(n) | Shift elements after index |

*Amortized O(1) because occasional resizing takes O(n)

---

## Basic Operations

### 1. Access Elements

```javascript
const arr = [10, 20, 30, 40, 50];

// Access by index: O(1)
console.log(arr[0]);  // 10
console.log(arr[2]);  // 30
console.log(arr[arr.length - 1]);  // 50 (last element)
```

### 2. Insert Elements

```javascript
const arr = [1, 2, 3];

// At end: O(1)
arr.push(4);  // [1, 2, 3, 4]

// At beginning: O(n)
arr.unshift(0);  // [0, 1, 2, 3, 4]

// At specific index: O(n)
arr.splice(2, 0, 1.5);  // [0, 1, 1.5, 2, 3, 4]
```

### 3. Delete Elements

```javascript
const arr = [1, 2, 3, 4, 5];

// From end: O(1)
arr.pop();  // [1, 2, 3, 4]

// From beginning: O(n)
arr.shift();  // [2, 3, 4]

// From specific index: O(n)
arr.splice(1, 1);  // [2, 4]
```

### 4. Search Elements

```javascript
const arr = [10, 20, 30, 40, 50];

// Linear search: O(n)
function search(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// Using built-in
arr.indexOf(30);  // 2
arr.includes(40);  // true
```

---

## Common Array Patterns

### Pattern 1: Two Pointers (Opposite Ends)

Used for sorted arrays or when elements need to be compared from both ends.

```javascript
// Check if array is palindrome
function isPalindrome(arr) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    if (arr[left] !== arr[right]) return false;
    left++;
    right--;
  }
  
  return true;
}

// Two sum in sorted array
function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  
  return null;
}
```

### Pattern 2: Two Pointers (Same Direction)

Used for in-place modifications or when one pointer explores ahead.

```javascript
// Remove duplicates from sorted array
function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  
  let i = 0;  // Slow pointer
  for (let j = 1; j < arr.length; j++) {  // Fast pointer
    if (arr[j] !== arr[i]) {
      i++;
      arr[i] = arr[j];
    }
  }
  
  return i + 1;  // New length
}

// Move zeros to end
function moveZeros(arr) {
  let nonZeroPos = 0;
  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      [arr[nonZeroPos], arr[i]] = [arr[i], arr[nonZeroPos]];
      nonZeroPos++;
    }
  }
}
```

### Pattern 3: Sliding Window (Fixed Size)

Used for subarray problems with fixed window size.

```javascript
// Maximum sum of subarray of size k
function maxSumSubarray(arr, k) {
  if (arr.length < k) return null;
  
  // Calculate first window
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  let maxSum = windowSum;
  
  // Slide window
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];  // Add new, remove old
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}
```

### Pattern 4: Sliding Window (Variable Size)

Used for subarray problems with conditions.

```javascript
// Longest substring with at most k distinct characters
function longestSubstringKDistinct(s, k) {
  const charCount = new Map();
  let left = 0;
  let maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    // Expand window
    charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);
    
    // Shrink window if needed
    while (charCount.size > k) {
      charCount.set(s[left], charCount.get(s[left]) - 1);
      if (charCount.get(s[left]) === 0) {
        charCount.delete(s[left]);
      }
      left++;
    }
    
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}
```

### Pattern 5: Prefix Sum

Used for range sum queries.

```javascript
// Build prefix sum array
function buildPrefixSum(arr) {
  const prefix = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    prefix[i] = prefix[i - 1] + arr[i];
  }
  return prefix;
}

// Range sum query [left, right]: O(1)
function rangeSum(prefix, left, right) {
  if (left === 0) return prefix[right];
  return prefix[right] - prefix[left - 1];
}

// Subarray sum equals k
function subarraySum(arr, k) {
  const sumCount = new Map([[0, 1]]);
  let sum = 0;
  let count = 0;
  
  for (let num of arr) {
    sum += num;
    if (sumCount.has(sum - k)) {
      count += sumCount.get(sum - k);
    }
    sumCount.set(sum, (sumCount.get(sum) || 0) + 1);
  }
  
  return count;
}
```

### Pattern 6: Kadane's Algorithm

Used for maximum subarray sum.

```javascript
function maxSubarraySum(arr) {
  let maxSoFar = arr[0];
  let maxEndingHere = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  
  return maxSoFar;
}

// Example: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// Output: 6 (subarray [4, -1, 2, 1])
```

---

## Advanced Techniques

### 1. Dutch National Flag (3-way Partitioning)

```javascript
// Sort array of 0s, 1s, and 2s
function sortColors(arr) {
  let low = 0, mid = 0, high = arr.length - 1;
  
  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++;
      mid++;
    } else if (arr[mid] === 1) {
      mid++;
    } else {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
    }
  }
}
```

### 2. Boyer-Moore Voting Algorithm

```javascript
// Find majority element (appears > n/2 times)
function majorityElement(arr) {
  let candidate = null;
  let count = 0;
  
  for (let num of arr) {
    if (count === 0) {
      candidate = num;
    }
    count += (num === candidate) ? 1 : -1;
  }
  
  return candidate;
}
```

### 3. Array Rotation

```javascript
// Rotate array right by k positions
function rotate(arr, k) {
  k = k % arr.length;
  reverse(arr, 0, arr.length - 1);
  reverse(arr, 0, k - 1);
  reverse(arr, k, arr.length - 1);
}

function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}
```

---

## Multi-Dimensional Arrays

### 2D Arrays (Matrix)

```javascript
// Create 2D array
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Access element: matrix[row][col]
console.log(matrix[1][2]);  // 6

// Traverse matrix
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    console.log(matrix[i][j]);
  }
}

// Spiral traversal
function spiralOrder(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  
  while (top <= bottom && left <= right) {
    // Right
    for (let j = left; j <= right; j++) {
      result.push(matrix[top][j]);
    }
    top++;
    
    // Down
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;
    
    // Left
    if (top <= bottom) {
      for (let j = right; j >= left; j--) {
        result.push(matrix[bottom][j]);
      }
      bottom--;
    }
    
    // Up
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }
  
  return result;
}
```

---

## Common Problems

1. **Two Sum**: Find two numbers that add to target
2. **Best Time to Buy and Sell Stock**: Max profit from one transaction
3. **Container With Most Water**: Two pointers to find max area
4. **Product of Array Except Self**: Without division
5. **Maximum Subarray**: Kadane's algorithm
6. **Merge Intervals**: Sort and merge overlapping intervals
7. **Rotate Array**: In-place rotation
8. **Find Missing Number**: XOR or sum technique
9. **Move Zeros**: Two pointers
10. **3Sum**: Find three numbers that add to target

---

## Tips & Tricks

1. **Check for empty array first**
2. **Use two pointers for sorted arrays**
3. **Consider sorting first** (often simplifies the problem)
4. **Use hash map for O(1) lookups**
5. **Watch for overflow** (when summing large numbers)
6. **Modulo for wrap-around** (circular arrays)
7. **Swap without temp**: `[a, b] = [b, a]`
8. **In-place when possible** (saves space)

---

**Practice**: Solve at least 10-15 array problems before moving on!
