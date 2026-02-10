# Recursion Patterns and Techniques

## What is Recursion?

**Recursion** is when a function calls itself to solve smaller instances of the same problem.

## Anatomy of Recursion

Every recursive function has:

### 1. Base Case
Condition that stops recursion (prevents infinite loop).

### 2. Recursive Case
Function calls itself with modified input moving toward base case.

### 3. Progress Toward Base Case
Each recursive call must move closer to the base case.

```javascript
function factorial(n) {
    // Base case
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // Recursive case: progress toward base case
    return n * factorial(n - 1);
}
```

---

## Common Recursion Patterns

### Pattern 1: Linear Recursion

Single recursive call per function execution.

```javascript
// Sum of array
function arraySum(arr, index = 0) {
    if (index === arr.length) return 0; // Base case
    return arr[index] + arraySum(arr, index + 1); // Recursive case
}

// Reverse string
function reverseString(str) {
    if (str === "") return ""; // Base case
    return reverseString(str.slice(1)) + str[0]; // Recursive case
}
```

---

### Pattern 2: Binary Recursion

Two recursive calls per function execution.

```javascript
// Fibonacci
function fibonacci(n) {
    if (n <= 1) return n; // Base case
    return fibonacci(n - 1) + fibonacci(n - 2); // Two recursive calls
}

// Tree traversal
function inorder(node) {
    if (node === null) return;
    inorder(node.left);    // First recursive call
    console.log(node.val);
    inorder(node.right);   // Second recursive call
}
```

---

### Pattern 3: Multiple Recursion

More than two recursive calls.

```javascript
// N-Queens problem
function solveNQueens(n) {
    const result = [];
    
    function backtrack(row, board) {
        if (row === n) {
            result.push([...board]); // Found solution
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isValid(board, row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1, board); // Recursive call
                board[row][col] = '.'; // Backtrack
            }
        }
    }
    
    backtrack(0, Array(n).fill().map(() => Array(n).fill('.')));
    return result;
}
```

---

### Pattern 4: Tail Recursion

Recursive call is the last operation (can be optimized by compiler).

```javascript
// Tail recursive factorial
function factorialTail(n, accumulator = 1) {
    if (n === 0) return accumulator;
    return factorialTail(n - 1, n * accumulator); // Tail call
}

// Tail recursive sum
function sumTail(arr, index = 0, accumulator = 0) {
    if (index === arr.length) return accumulator;
    return sumTail(arr, index + 1, accumulator + arr[index]);
}
```

**Benefit**: Can be optimized to O(1) space (Tail Call Optimization)

---

### Pattern 5: Divide and Conquer

Break problem into smaller subproblems, solve recursively, combine results.

```javascript
// Merge Sort
function mergeSort(arr) {
    if (arr.length <= 1) return arr; // Base case
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));    // Divide
    const right = mergeSort(arr.slice(mid));       // Divide
    
    return merge(left, right); // Conquer
}

// Quick Sort
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[arr.length - 1];
    const left = arr.filter(x => x < pivot);   // Divide
    const right = arr.filter(x => x > pivot);  // Divide
    
    return [...quickSort(left), pivot, ...quickSort(right)]; // Conquer
}
```

---

### Pattern 6: Backtracking

Build solution incrementally, abandon paths that don't work.

```javascript
// Generate all subsets
function subsets(nums) {
    const result = [];
    
    function backtrack(start, current) {
        result.push([...current]); // Add current subset
        
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);      // Choose
            backtrack(i + 1, current);   // Explore
            current.pop();               // Unchoose (backtrack)
        }
    }
    
    backtrack(0, []);
    return result;
}

// Generate all permutations
function permute(nums) {
    const result = [];
    
    function backtrack(current) {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }
        
        for (let num of nums) {
            if (current.includes(num)) continue; // Skip used numbers
            current.push(num);         // Choose
            backtrack(current);         // Explore
            current.pop();              // Unchoose
        }
    }
    
    backtrack([]);
    return result;
}
```

**Template:**
```javascript
function backtrack(state) {
    if (isGoal(state)) {
        saveResult(state);
        return;
    }
    
    for (let choice of getChoices(state)) {
        makeChoice(choice);      // Choose
        backtrack(newState);      // Explore
        undoChoice(choice);       // Unchoose (backtrack)
    }
}
```

---

### Pattern 7: Memoization (Top-Down DP)

Cache results to avoid redundant calculations.

```javascript
// Fibonacci with memoization
function fibMemo(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n]; // Check cache
    
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo); // Store result
    return memo[n];
}

// Climbing stairs with memoization
function climbStairs(n, memo = {}) {
    if (n <= 2) return n;
    if (memo[n]) return memo[n];
    
    memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
    return memo[n];
}
```

**Time:** O(n) instead of O(2ⁿ)

---

## Recursion vs Iteration

| Aspect | Recursion | Iteration |
|--------|-----------|-----------|
| Code | Often cleaner | More verbose |
| Memory | O(depth) - stack | O(1) typically |
| Performance | Overhead from calls | Faster |
| Tree/Graph | Natural fit | Requires explicit stack |
| Debugging | Harder (call stack) | Easier |

---

## Common Recursive Problems

### 1. Power Function
```javascript
function power(base, exp) {
    if (exp === 0) return 1;
    if (exp === 1) return base;
    
    const half = power(base, Math.floor(exp / 2));
    return exp % 2 === 0 ? half * half : half * half * base;
}
```
**Time:** O(log n)

### 2. GCD (Greatest Common Divisor)
```javascript
function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}
```
**Euclidean Algorithm**

### 3. Flatten Nested Array
```javascript
function flatten(arr) {
    const result = [];
    
    for (let item of arr) {
        if (Array.isArray(item)) {
            result.push(...flatten(item)); // Recursive call
        } else {
            result.push(item);
        }
    }
    
    return result;
}
```

### 4. Count Paths in Grid
```javascript
function countPaths(m, n) {
    if (m === 1 || n === 1) return 1; // Base case
    return countPaths(m - 1, n) + countPaths(m, n - 1);
}
```

### 5. Tower of Hanoi
```javascript
function towerOfHanoi(n, from, to, aux) {
    if (n === 1) {
        console.log(`Move disk 1 from ${from} to ${to}`);
        return;
    }
    
    towerOfHanoi(n - 1, from, aux, to);
    console.log(`Move disk ${n} from ${from} to ${to}`);
    towerOfHanoi(n - 1, aux, to, from);
}
```
**Moves:** 2ⁿ - 1

---

## Recursion Tree Analysis

Visualize recursive calls to understand time/space complexity.

**Example: Fibonacci**
```
                    fib(5)
                 /          \
            fib(4)            fib(3)
          /       \          /      \
      fib(3)     fib(2)   fib(2)   fib(1)
     /     \     /    \   /    \
  fib(2) fib(1) ...   ... ...  ...
```

**Height:** n
**Nodes:** O(2ⁿ) - exponential
**With Memo:** O(n) - each subproblem solved once

---

## Avoiding Stack Overflow

### 1. Use Iteration When Possible
```javascript
// Iterative factorial
function factorialIter(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

### 2. Tail Call Optimization
JavaScript engines may optimize tail recursion.

### 3. Increase Stack Size
Adjust runtime settings (language/environment dependent).

### 4. Use Memoization
Reduce recursive depth.

---

## Debugging Recursive Functions

### 1. Add Print Statements
```javascript
function factorial(n, depth = 0) {
    console.log('  '.repeat(depth) + `factorial(${n})`);
    
    if (n === 0 || n === 1) {
        console.log('  '.repeat(depth) + `return 1`);
        return 1;
    }
    
    const result = n * factorial(n - 1, depth + 1);
    console.log('  '.repeat(depth) + `return ${result}`);
    return result;
}
```

### 2. Trace Call Stack
Use debugger to step through calls.

### 3. Test Base Cases First
Ensure they work correctly.

---

## Practice Problems

1. **Generate Parentheses** - Backtracking
2. **Letter Combinations of Phone** - Backtracking
3. **Subsets / Subsets II** - Backtracking
4. **Permutations / Permutations II** - Backtracking
5. **Combination Sum** - Backtracking
6. **Word Search** - Backtracking + DFS
7. **Palindrome Partitioning** - Backtracking
8. **Sudoku Solver** - Backtracking
9. **N-Queens** - Backtracking
10. **Tree Traversals** - Recursion on trees

---

## Key Takeaways

✅ Recursion simplifies problems by breaking them into smaller pieces
✅ Always define clear base case(s)
✅ Ensure progress toward base case
✅ Backtracking = recursion + constraint satisfaction
✅ Memoization can dramatically improve performance
✅ Recursion natural for trees, graphs, divide-and-conquer
✅ Watch stack depth to avoid overflow

Master recursion - it's essential for advanced algorithms!
