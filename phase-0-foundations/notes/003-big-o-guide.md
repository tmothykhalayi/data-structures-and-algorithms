# Big O Notation - Complete Guide

## What is Big O?

Big O notation describes how the runtime or space requirements of an algorithm grow as the input size increases. It focuses on the **worst-case scenario**.

---

## Why Big O Matters

```javascript
// Solution 1: O(n²)
function hasDuplicate1(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// Solution 2: O(n)
function hasDuplicate2(arr) {
  const seen = new Set();
  for (let num of arr) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}

// For n = 1,000: Solution 1 = 1,000,000 operations
//               Solution 2 = 1,000 operations (1000x faster!)
```

---

## Time Complexity Rankings

From fastest to slowest:

| Big O | Name | Example |
|-------|------|---------|
| O(1) | Constant | Access array by index |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Loop through array |
| O(n log n) | Linearithmic | Merge sort, Quick sort |
| O(n²) | Quadratic | Nested loops |
| O(n³) | Cubic | Triple nested loops |
| O(2ⁿ) | Exponential | Recursive fibonacci |
| O(n!) | Factorial | Generating all permutations |

---

## Visual Comparison

For n = 100:
- O(1) = 1 operation
- O(log n) ≈ 7 operations
- O(n) = 100 operations
- O(n log n) ≈ 664 operations
- O(n²) = 10,000 operations
- O(2ⁿ) = 1,267,650,600,228,229,401,496,703,205,376 operations 😱

---

## Common Time Complexities Explained

### O(1) - Constant Time
Operations that take the same time regardless of input size.

```javascript
function getFirst(arr) {
  return arr[0];  // Always one operation
}

function hashLookup(map, key) {
  return map.get(key);  // Hash table lookup
}
```

---

### O(log n) - Logarithmic Time
Halves the problem space in each step.

```javascript
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}
// Searches 1,000,000 items in ~20 steps!
```

---

### O(n) - Linear Time
Operations proportional to input size.

```javascript
function sum(arr) {
  let total = 0;
  for (let num of arr) {  // Visits each element once
    total += num;
  }
  return total;
}

function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
```

---

### O(n log n) - Linearithmic Time
Efficient sorting algorithms.

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));      // O(log n) levels
  const right = mergeSort(arr.slice(mid));        // O(log n) levels
  
  return merge(left, right);  // O(n) work per level
}
```

---

### O(n²) - Quadratic Time
Nested iterations over the same dataset.

```javascript
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {         // n times
    for (let j = 0; j < arr.length - i - 1; j++) { // n times
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function printPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}
```

---

### O(2ⁿ) - Exponential Time
Recursive algorithms that branch multiple times.

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);  // 2 recursive calls
}
// fib(40) = 2,692,537 function calls!
```

---

## Space Complexity

Measures extra memory used by an algorithm.

### O(1) - Constant Space
```javascript
function sum(arr) {
  let total = 0;  // Only one variable
  for (let num of arr) {
    total += num;
  }
  return total;
}
```

### O(n) - Linear Space
```javascript
function double(arr) {
  const result = [];  // New array of size n
  for (let num of arr) {
    result.push(num * 2);
  }
  return result;
}
```

### O(log n) - Logarithmic Space (Recursion)
```javascript
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) 
    return binarySearchRecursive(arr, target, mid + 1, right);
  return binarySearchRecursive(arr, target, left, mid - 1);
}
// Call stack depth = log n
```

---

## Rules for Calculating Big O

### Rule 1: Drop Constants
```javascript
// Both are O(n), not O(2n) or O(n + 10)
function example1(arr) {
  for (let i = 0; i < arr.length; i++) {}      // O(n)
  for (let i = 0; i < arr.length; i++) {}      // O(n)
}  // O(n + n) = O(2n) = O(n)
```

### Rule 2: Drop Non-Dominant Terms
```javascript
// O(n² + n) = O(n²)
function example2(arr) {
  for (let i = 0; i < arr.length; i++) {       // O(n)
    for (let j = 0; j < arr.length; j++) {}    // O(n²)
  }
}  // Keep only the biggest term
```

### Rule 3: Different Inputs = Different Variables
```javascript
// O(a + b), NOT O(n)
function combine(arr1, arr2) {
  for (let x of arr1) {}  // O(a)
  for (let y of arr2) {}  // O(b)
}

// O(a * b), NOT O(n²)
function printPairs(arr1, arr2) {
  for (let x of arr1) {
    for (let y of arr2) {
      console.log(x, y);
    }
  }
}
```

---

## Common Pitfalls

### ❌ Incorrect: Counting all lines
```javascript
function search(arr, target) {
  let found = false;        // Not O(3)!
  for (let x of arr) {      // Focus on this loop
    if (x === target) {
      found = true;
    }
  }
  return found;
}  // This is O(n)
```

### ❌ Incorrect: Assuming nested = O(n²)
```javascript
// This is O(n), not O(n²)
function pyramid(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {  // j depends on i
      console.log('*');
    }
  }
}  // Total: 0 + 1 + 2 + ... + n = n(n+1)/2 = O(n²)
// Actually, this IS O(n²) - but not all nested loops are!
```

### ✅ Correct: This one is O(n)
```javascript
function halvingLoop(n) {
  let i = n;
  while (i > 1) {
    console.log(i);
    i = Math.floor(i / 2);  // Halving = O(log n)
  }
}
```

---

## Practice Problems

Try to determine the time complexity:

```javascript
// 1.
function mystery1(arr) {
  return arr[arr.length - 1];
}

// 2.
function mystery2(arr) {
  for (let i = 0; i < arr.length; i += 2) {
    console.log(arr[i]);
  }
}

// 3.
function mystery3(n) {
  for (let i = 1; i < n; i *= 2) {
    console.log(i);
  }
}

// 4.
function mystery4(arr) {
  arr.sort((a, b) => a - b);
  return arr[0];
}
```

### Answers:
1. O(1) - Direct access
2. O(n) - Still visits n/2 elements, constant dropped
3. O(log n) - Doubling i each time
4. O(n log n) - Sorting dominates

---

## Quick Reference Card

| If you see... | Think... |
|--------------|----------|
| Direct access/assignment | O(1) |
| Single loop | O(n) |
| Nested loops (same input) | O(n²) |
| Nested loops (different inputs) | O(a × b) |
| Halving/Doubling | O(log n) |
| Sort then loop | O(n log n) |
| Recursion with 2 branches | O(2ⁿ) |

---

**Key Takeaway**: Big O helps you compare algorithms and choose the best one for your problem size!
