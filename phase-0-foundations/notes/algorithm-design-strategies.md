# Algorithm Design Strategies

Learn the fundamental approaches to designing algorithms.

---

## 1. Brute Force

**Concept:** Try all possible solutions and pick the best one.

**When to use:**
- Small input sizes
- No better algorithm is known
- As a starting point to optimize later

**Example: Finding all pairs with target sum**
```javascript
function findPairs(arr, target) {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        pairs.push([arr[i], arr[j]]);
      }
    }
  }
  return pairs;
}
// Time: O(n²), Space: O(1)
```

**Pros:** Simple, guaranteed to find solution
**Cons:** Often inefficient, doesn't scale

---

## 2. Divide and Conquer

**Concept:** Break problem into smaller subproblems, solve independently, combine results.

**Steps:**
1. **Divide:** Break into smaller subproblems
2. **Conquer:** Solve subproblems recursively
3. **Combine:** Merge solutions

**Example: Merge Sort**
```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  // Divide
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  // Combine
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}
// Time: O(n log n), Space: O(n)
```

**Classic Problems:**
- Merge Sort, Quick Sort
- Binary Search
- Maximum Subarray (Kadane's)
- Closest Pair of Points

**Pros:** Often efficient (O(n log n))
**Cons:** May need extra space, overhead of recursion

---

## 3. Greedy Algorithms

**Concept:** Make the locally optimal choice at each step.

**Key Property:** Local optimum leads to global optimum (doesn't always work!)

**Example: Coin Change (Greedy approach)**
```javascript
function coinChange(coins, amount) {
  coins.sort((a, b) => b - a);  // Sort descending
  let count = 0;
  
  for (let coin of coins) {
    while (amount >= coin) {
      amount -= coin;
      count++;
    }
  }
  
  return amount === 0 ? count : -1;
}
// Works for standard coin systems (1, 5, 10, 25)
// But NOT for arbitrary coin systems!
```

**When Greedy Works:**
- Activity Selection
- Huffman Coding
- Minimum Spanning Tree (Kruskal's, Prim's)
- Fractional Knapsack

**When Greedy Fails:**
- 0/1 Knapsack (use DP instead)
- Longest Path
- Some coin systems

**How to verify:** Prove greedy choice property and optimal substructure

---

## 4. Dynamic Programming

**Concept:** Break into subproblems, store results to avoid recomputation.

**Requirements:**
1. **Optimal Substructure:** Optimal solution contains optimal solutions to subproblems
2. **Overlapping Subproblems:** Same subproblems are solved multiple times

**Approaches:**

### Top-Down (Memoization)
```javascript
function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}
// Time: O(n), Space: O(n)
```

### Bottom-Up (Tabulation)
```javascript
function fib(n) {
  if (n <= 1) return n;
  
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
// Time: O(n), Space: O(n)
```

### Space Optimized
```javascript
function fib(n) {
  if (n <= 1) return n;
  
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}
// Time: O(n), Space: O(1)
```

**Classic DP Problems:**
- Fibonacci Numbers
- 0/1 Knapsack
- Longest Common Subsequence
- Longest Increasing Subsequence
- Edit Distance
- Coin Change (exact)
- Matrix Chain Multiplication

---

## 5. Backtracking

**Concept:** Build solutions incrementally, abandon (backtrack) when constraints violated.

**Template:**
```javascript
function backtrack(candidate) {
  if (isValidSolution(candidate)) {
    output(candidate);
    return;
  }
  
  for (let nextCandidate of generateCandidates(candidate)) {
    if (isValid(nextCandidate)) {
      makeMove(nextCandidate);
      backtrack(nextCandidate);
      undoMove(nextCandidate);  // Backtrack
    }
  }
}
```

**Example: Generate All Subsets**
```javascript
function subsets(nums) {
  const result = [];
  
  function backtrack(start, current) {
    result.push([...current]);  // Add current subset
    
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);      // Choose
      backtrack(i + 1, current);  // Explore
      current.pop();              // Un-choose (backtrack)
    }
  }
  
  backtrack(0, []);
  return result;
}
// subsets([1,2,3]) → [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
```

**Classic Problems:**
- N-Queens
- Sudoku Solver
- Permutations
- Combinations
- Word Search
- Palindrome Partitioning

**Optimization:** Prune branches early to avoid unnecessary exploration

---

## 6. Two Pointers

**Concept:** Use two pointers to traverse data structure efficiently.

**Patterns:**

### Pattern A: Opposite Ends
```javascript
function twoSum(arr, target) {
  arr.sort((a, b) => a - b);
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

### Pattern B: Fast and Slow (Floyd's Cycle)
```javascript
function hasCycle(head) {
  let slow = head, fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```

### Pattern C: Same Direction
```javascript
function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  
  let i = 0;  // Slow pointer
  for (let j = 1; j < arr.length; j++) {  // Fast pointer
    if (arr[j] !== arr[i]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}
```

---

## 7. Sliding Window

**Concept:** Maintain a window that slides over data.

**Fixed Size Window:**
```javascript
function maxSumSubarray(arr, k) {
  let maxSum = 0, windowSum = 0;
  
  // Calculate first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;
  
  // Slide window
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];  // Add new, remove old
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}
// Time: O(n), Space: O(1)
```

**Variable Size Window:**
```javascript
function longestSubstringKDistinct(s, k) {
  const charCount = new Map();
  let left = 0, maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);
    
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

---

## 8. Binary Search Variations

**Classic Binary Search:**
```javascript
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}
```

**Find First Occurrence:**
```javascript
function findFirst(arr, target) {
  let left = 0, right = arr.length - 1;
  let result = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      result = mid;
      right = mid - 1;  // Keep searching left
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}
```

**Search in Rotated Array:**
```javascript
function searchRotated(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    
    // Left half is sorted
    if (arr[left] <= arr[mid]) {
      if (target >= arr[left] && target < arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // Right half is sorted
    else {
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

## Strategy Selection Guide

| Problem Type | Strategy | Example |
|-------------|----------|---------|
| Find all solutions | Brute Force / Backtracking | All permutations |
| Optimization with choices | DP or Greedy | Knapsack |
| Sorted data search | Binary Search | Find element |
| Subarray/substring | Sliding Window | Max sum subarray |
| Two elements relationship | Two Pointers | Pair sum |
| Tree/Graph traversal | BFS/DFS | Level order |
| Large problem → smaller | Divide & Conquer | Merge sort |

---

## Questions to Ask When Choosing

1. **Is the data sorted?** → Consider Binary Search
2. **Need all solutions?** → Backtracking
3. **Overlapping subproblems?** → Dynamic Programming
4. **Local choice leads to global?** → Greedy
5. **Contiguous elements?** → Sliding Window
6. **Two elements/pointers?** → Two Pointers
7. **Can split into independent parts?** → Divide and Conquer

---

**Pro Tip:** Many problems combine multiple strategies! For example:
- **DP + Binary Search** (LIS optimization)
- **Backtracking + Pruning** (N-Queens)
- **Divide & Conquer + DP** (Some optimization problems)
