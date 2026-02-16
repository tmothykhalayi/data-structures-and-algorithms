# Code Optimization Techniques

Learn how to make your code faster and more efficient.

---

## 1. Choose the Right Data Structure

The data structure you choose can make or break performance.

### ❌ Slow Approach
```javascript
// Using array for lookups: O(n)
function hasDuplicate(arr) {
  const seen = [];
  for (let num of arr) {
    if (seen.includes(num)) return true;  // O(n) lookup
    seen.push(num);
  }
  return false;
}
// Total: O(n²)
```

### ✅ Optimized
```javascript
// Using Set for lookups: O(1)
function hasDuplicate(arr) {
  const seen = new Set();
  for (let num of arr) {
    if (seen.has(num)) return true;  // O(1) lookup
    seen.add(num);
  }
  return false;
}
// Total: O(n)
```

**Data Structure Cheat Sheet:**
- **Fast lookups?** → Hash Map/Set
- **Sorted data?** → Binary Search Tree
- **Min/Max needed?** → Heap/Priority Queue
- **LIFO?** → Stack
- **FIFO?** → Queue
- **Range queries?** → Segment Tree

---

## 2. Avoid Unnecessary Work

### Early Exit
```javascript
// ❌ Checks all elements
function hasEven(arr) {
  let found = false;
  for (let num of arr) {
    if (num % 2 === 0) found = true;
  }
  return found;
}

// ✅ Exits early
function hasEven(arr) {
  for (let num of arr) {
    if (num % 2 === 0) return true;  // Stop immediately
  }
  return false;
}
```

### Break Out of Loops
```javascript
// ❌ Continues even after finding
let found = false;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) found = true;
}

// ✅ Breaks when found
let found = false;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) {
    found = true;
    break;  // Stop searching
  }
}
```

---

## 3. Cache Repeated Computations

### Avoid Recalculation
```javascript
// ❌ Calculates length every iteration
for (let i = 0; i < arr.length; i++) {
  // If arr.length is computed each time: slower
}

// ✅ Cache the length
const len = arr.length;
for (let i = 0; i < len; i++) {
  // Length computed once
}
```

### Memoization
```javascript
// ❌ Exponential time: O(2^n)
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

// ✅ Linear time: O(n)
function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];  // Return cached result
  
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}
```

---

## 4. Use Multiple Passes Instead of Nested Loops

### ❌ O(n²) with nested loops
```javascript
function twoSum(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j];
      }
    }
  }
  return null;
}
```

### ✅ O(n) with hash map
```javascript
function twoSum(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(arr[i], i);
  }
  return null;
}
```

---

## 5. Sort for Efficiency

Sometimes sorting first makes the problem easier.

### Example: Finding Duplicates
```javascript
// ❌ O(n²)
function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// ✅ O(n log n)
function hasDuplicate(arr) {
  arr.sort((a, b) => a - b);  // O(n log n)
  for (let i = 0; i < arr.length - 1; i++) {  // O(n)
    if (arr[i] === arr[i + 1]) return true;
  }
  return false;
}

// ✅✅ Best: O(n) with Set
function hasDuplicate(arr) {
  return arr.length !== new Set(arr).size;
}
```

---

## 6. Space-Time Tradeoffs

Often you can trade space for time (or vice versa).

### ✅ Use More Space for Speed
```javascript
// Slow: O(1) space, O(n²) time
function containsDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// Fast: O(n) space, O(n) time
function containsDuplicate(arr) {
  const seen = new Set();
  for (let num of arr) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}
```

### ✅ Use Less Space When Memory Matters
```javascript
// More space: O(n)
function fib(n) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// Less space: O(1)
function fib(n) {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}
```

---

## 7. Use Built-in Methods Wisely

### Know Your Built-ins
```javascript
// ❌ Manual implementation
function sum(arr) {
  let total = 0;
  for (let num of arr) {
    total += num;
  }
  return total;
}

// ✅ Built-in (usually optimized)
function sum(arr) {
  return arr.reduce((acc, num) => acc + num, 0);
}
```

### But Watch Out!
```javascript
// ❌ Creates new array on each iteration: O(n²)
let result = [];
for (let i = 0; i < 1000; i++) {
  result = result.concat([i]);  // Creates new array each time
}

// ✅ Modifies in place: O(n)
let result = [];
for (let i = 0; i < 1000; i++) {
  result.push(i);  // Modifies existing array
}
```

---

## 8. Minimize String Operations

Strings are immutable in many languages!

### ❌ Slow String Concatenation
```javascript
// Creates new string on each iteration: O(n²)
let result = '';
for (let i = 0; i < arr.length; i++) {
  result += arr[i];  // New string created each time
}
```

### ✅ Use Array and Join
```javascript
// O(n)
const parts = [];
for (let i = 0; i < arr.length; i++) {
  parts.push(arr[i]);
}
const result = parts.join('');
```

---

## 9. Optimize Loops

### Reduce Loop Operations
```javascript
// ❌ Multiple operations per iteration
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    evens.push(arr[i]);
  }
  if (arr[i] % 2 !== 0) {
    odds.push(arr[i]);
  }
}

// ✅ Single condition
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    evens.push(arr[i]);
  } else {
    odds.push(arr[i]);
  }
}
```

### Combine Loops When Possible
```javascript
// ❌ Two passes
for (let num of arr) {
  sum += num;
}
for (let num of arr) {
  squareSum += num * num;
}

// ✅ One pass
for (let num of arr) {
  sum += num;
  squareSum += num * num;
}
```

---

## 10. Avoid Redundant Checks

### ❌ Checking Same Condition Multiple Times
```javascript
function process(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null && arr[i] > 0) {
      // do something
    }
    if (arr[i] !== null && arr[i] < 100) {
      // do something else
    }
  }
}
```

### ✅ Check Once
```javascript
function process(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null) {
      if (arr[i] > 0) {
        // do something
      }
      if (arr[i] < 100) {
        // do something else
      }
    }
  }
}
```

---

## 11. Use Two Pointers for Sorted Arrays

### ❌ Brute Force
```javascript
// O(n²)
function twoSumSorted(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j];
      }
    }
  }
  return null;
}
```

### ✅ Two Pointers
```javascript
// O(n)
function twoSumSorted(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}
```

---

## 12. Sliding Window for Subarrays

### ❌ Recalculate Every Window
```javascript
// O(n * k)
function maxSumSubarray(arr, k) {
  let maxSum = -Infinity;
  
  for (let i = 0; i <= arr.length - k; i++) {
    let sum = 0;
    for (let j = i; j < i + k; j++) {  // Recalculate each time
      sum += arr[j];
    }
    maxSum = Math.max(maxSum, sum);
  }
  
  return maxSum;
}
```

### ✅ Sliding Window
```javascript
// O(n)
function maxSumSubarray(arr, k) {
  let windowSum = 0;
  
  // First window
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

---

## Optimization Checklist

Before submitting your solution:

- [ ] Can I use a better data structure?
- [ ] Am I doing unnecessary work?
- [ ] Can I cache repeated computations?
- [ ] Am I creating unnecessary objects/arrays?
- [ ] Can I exit early?
- [ ] Is there a mathematical formula?
- [ ] Can sorting help?
- [ ] Can I use two pointers?
- [ ] Is there a sliding window opportunity?
- [ ] Am I using the most efficient algorithm?

---

## Common Optimization Patterns

| Original | Optimized | Technique |
|----------|-----------|-----------|
| O(n²) nested loops | O(n) hash map | Trade space for time |
| O(n) per query | O(1) per query | Preprocessing |
| O(n²) substring | O(n) sliding window | Avoid recalculation |
| O(n²) two sum | O(n) hash map | Hash for lookup |
| O(2^n) recursion | O(n) memoization | Cache results |
| O(n log n) repeatedly | O(n log n) once | Sort once |

---

**Remember:** Premature optimization is the root of all evil. Make it work first, then make it fast!
