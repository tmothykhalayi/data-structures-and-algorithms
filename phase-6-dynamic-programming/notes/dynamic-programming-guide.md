# Dynamic Programming Master Guide

## What is Dynamic Programming?

**Dynamic Programming (DP)** is an optimization technique that solves complex problems by breaking them down into simpler subproblems and storing their solutions to avoid redundant calculations.

## When to Use DP?

DP applies when a problem has:

### 1. Optimal Substructure
Optimal solution contains optimal solutions to subproblems.

### 2. Overlapping Subproblems
Same subproblems are solved multiple times.

---

## DP Approaches

### Top-Down (Memoization)
- Start with original problem
- Recursively break down
- Cache results

```javascript
function fibMemo(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}
```

**Pros:** Intuitive, only solves needed subproblems
**Cons:** Recursion overhead, potential stack overflow

---

### Bottom-Up (Tabulation)
- Start with smallest subproblems
- Build up to original problem
- Use array/table

```javascript
function fibTab(n) {
    if (n <= 1) return n;
    
    const dp = [0, 1];
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}
```

**Pros:** No recursion, predictable performance
**Cons:** Solves all subproblems (may be unnecessary)

---

## Classic DP Problems

### 1. Fibonacci Sequence

**Problem:** Find nth Fibonacci number

```javascript
// Optimized: O(1) space
function fibOptimized(n) {
    if (n <= 1) return n;
    
    let prev2 = 0, prev1 = 1;
    
    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}
```

**Time:** O(n)
**Space:** O(1)

---

### 2. Climbing Stairs

**Problem:** n steps, can climb 1 or 2 steps. How many ways to reach top?

```javascript
function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev2 = 1, prev1 = 2;
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}
```

**Formula:** Same as Fibonacci!

**Time:** O(n)
**Space:** O(1)

---

### 3. Coin Change

**Problem:** Given coins and amount, find minimum coins needed.

```javascript
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0; // Base case: 0 coins for amount 0
    
    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (i >= coin) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Example: coins = [1,2,5], amount = 11
// Output: 3 (5 + 5 + 1)
```

**Time:** O(amount × coins)
**Space:** O(amount)

---

### 4. 0/1 Knapsack

**Problem:** Items with weights and values, max capacity. Maximize value.

```javascript
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            // Don't take item i-1
            dp[i][w] = dp[i - 1][w];
            
            // Take item i-1 if fits
            if (w >= weights[i - 1]) {
                dp[i][w] = Math.max(
                    dp[i][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                );
            }
        }
    }
    
    return dp[n][capacity];
}
```

**Space Optimized:**
```javascript
function knapsackOptimized(weights, values, capacity) {
    const dp = new Array(capacity + 1).fill(0);
    
    for (let i = 0; i < weights.length; i++) {
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    
    return dp[capacity];
}
```

**Time:** O(n × capacity)
**Space:** O(capacity)

---

### 5. Longest Common Subsequence (LCS)

**Problem:** Find longest subsequence common to both strings.

```javascript
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

// Example: text1 = "abcde", text2 = "ace"
// Output: 3 ("ace")
```

**Time:** O(m × n)
**Space:** O(m × n)

---

### 6. Longest Increasing Subsequence (LIS)

```javascript
function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;
    
    const dp = new Array(nums.length).fill(1);
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}

// Example: [10,9,2,5,3,7,101,18]
// Output: 4 ([2,3,7,101])
```

**Time:** O(n²)
**Advanced:** O(n log n) with binary search

---

### 7. Edit Distance (Levenshtein Distance)

**Problem:** Minimum operations to convert word1 to word2.

```javascript
function minDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // No operation
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,      // Delete
                    dp[i][j - 1] + 1,      // Insert
                    dp[i - 1][j - 1] + 1   // Replace
                );
            }
        }
    }
    
    return dp[m][n];
}

// Example: word1 = "horse", word2 = "ros"
// Output: 3 (replace h→r, remove o, remove e)
```

**Time:** O(m × n)
**Space:** O(m × n)

---

### 8. Maximum Subarray (Kadane's Algorithm)

```javascript
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// Example: [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6 ([4,-1,2,1])
```

**Time:** O(n)
**Space:** O(1)

---

### 9. House Robber

**Problem:** Rob houses, can't rob adjacent. Maximize money.

```javascript
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = 0;
    let prev1 = 0;
    
    for (let num of nums) {
        const current = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}
```

**Time:** O(n)
**Space:** O(1)

---

### 10. Unique Paths in Grid

```javascript
function uniquePaths(m, n) {
    const dp = Array(m).fill().map(() => Array(n).fill(1));
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    
    return dp[m - 1][n - 1];
}
```

**Space Optimized:**
```javascript
function uniquePathsOptimized(m, n) {
    const dp = new Array(n).fill(1);
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] = dp[j] + dp[j - 1];
        }
    }
    
    return dp[n - 1];
}
```

**Time:** O(m × n)
**Space:** O(n)

---

## DP Patterns

### Pattern 1: Linear DP
1D array, each state depends on previous states.
**Examples:** Fibonacci, Climbing Stairs, House Robber

### Pattern 2: 2D Grid DP
2D array, state depends on row/column neighbors.
**Examples:** Unique Paths, LCS, Edit Distance

### Pattern 3: Subset/Knapsack DP
Include or exclude element.
**Examples:** 0/1 Knapsack, Partition Equal Subset Sum

### Pattern 4: Interval DP
Process intervals, combine solutions.
**Examples:** Matrix Chain Multiplication, Burst Balloons

### Pattern 5: String DP
Match/transform strings.
**Examples:** LCS, Edit Distance, Palindrome

---

## DP Optimization Techniques

### 1. Space Optimization
Reduce 2D to 1D if only need previous row/column.

### 2. State Compression
Use bit manipulation for compact state representation.

### 3. Memoization with HashMap
For complex states that can't fit in array.

### 4. Bottom-Up vs Top-Down
Choose based on problem constraints and preferences.

---

## How to Solve DP Problems

### Step 1: Identify if DP applies
- Optimal substructure?
- Overlapping subproblems?

### Step 2: Define state
What information do we need to track?

### Step 3: Write recurrence relation
How does dp[i] relate to previous states?

### Step 4: Identify base cases
What are the simplest subproblems?

### Step 5: Determine order
Bottom-up: what order to fill table?

### Step 6: Optimize space
Can we reduce dimensions?

---

## Practice Problems

**Beginner:**
1. Climbing Stairs (LeetCode 70)
2. House Robber (LeetCode 198)
3. Maximum Subarray (LeetCode 53)

**Intermediate:**
4. Coin Change (LeetCode 322)
5. Longest Increasing Subsequence (LeetCode 300)
6. Unique Paths (LeetCode 62)
7. Longest Common Subsequence (LeetCode 1143)

**Advanced:**
8. Edit Distance (LeetCode 72)
9. Regular Expression Matching (LeetCode 10)
10. Burst Balloons (LeetCode 312)

---

## Key Takeaways

✅ DP = Recursion + Memoization
✅ Identify optimal substructure and overlapping subproblems
✅ Choose top-down or bottom-up based on preference
✅ Always start with recursive solution, then optimize
✅ Space can often be optimized
✅ Draw state transition diagram to visualize
✅ Most interview DP problems are variations of classics

Master DP - it's the most powerful algorithm technique!
