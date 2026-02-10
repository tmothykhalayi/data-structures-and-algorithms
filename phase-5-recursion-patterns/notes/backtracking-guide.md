# Backtracking Master Guide

## What is Backtracking?

**Backtracking** is an algorithmic technique for solving problems recursively by trying to build a solution incrementally. If a partial solution fails, we **backtrack** (undo the last step) and try another path.

## Backtracking Template

```javascript
function backtrack(state, choices) {
    // Base case: found valid solution
    if (isComplete(state)) {
        saveResult(state);
        return;
    }
    
    // Try all possible choices
    for (let choice of choices) {
        // Prune: skip invalid choices
        if (!isValid(state, choice)) continue;
        
        // Make choice
        makeChoice(state, choice);
        
        // Recurse with new state
        backtrack(newState, newChoices);
        
        // Unmake choice (backtrack)
        undoChoice(state, choice);
    }
}
```

---

## Classic Backtracking Problems

### 1. Generate All Subsets

```javascript
function subsets(nums) {
    const result = [];
    
    function backtrack(start, current) {
        // Every state is a valid subset
        result.push([...current]);
        
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);        // Choose
            backtrack(i + 1, current);     // Explore
            current.pop();                 // Unchoose
        }
    }
    
    backtrack(0, []);
    return result;
}

// Example: [1,2,3]
// Output: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
```

**Time:** O(2ⁿ × n) - 2ⁿ subsets, each takes O(n) to copy
**Space:** O(n) - recursion depth

---

### 2. Generate All Permutations

```javascript
function permute(nums) {
    const result = [];
    
    function backtrack(current) {
        // Base case: permutation complete
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

// Example: [1,2,3]
// Output: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
```

**Better approach with swap:**
```javascript
function permuteOptimized(nums) {
    const result = [];
    
    function backtrack(start) {
        if (start === nums.length) {
            result.push([...nums]);
            return;
        }
        
        for (let i = start; i < nums.length; i++) {
            [nums[start], nums[i]] = [nums[i], nums[start]]; // Swap
            backtrack(start + 1);
            [nums[start], nums[i]] = [nums[i], nums[start]]; // Swap back
        }
    }
    
    backtrack(0);
    return result;
}
```

**Time:** O(n! × n)
**Space:** O(n)

---

### 3. Combination Sum

Find all unique combinations that sum to target.

```javascript
function combinationSum(candidates, target) {
    const result = [];
    
    function backtrack(start, current, sum) {
        // Base cases
        if (sum === target) {
            result.push([...current]);
            return;
        }
        if (sum > target) return; // Prune
        
        for (let i = start; i < candidates.length; i++) {
            current.push(candidates[i]);
            backtrack(i, current, sum + candidates[i]); // Can reuse same number
            current.pop();
        }
    }
    
    backtrack(0, [], 0);
    return result;
}

// Example: candidates = [2,3,6,7], target = 7
// Output: [[2,2,3], [7]]
```

---

### 4. Generate Parentheses

```javascript
function generateParenthesis(n) {
    const result = [];
    
    function backtrack(current, open, close) {
        // Base case: used all parentheses
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        // Add opening parenthesis if we can
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        
        // Add closing parenthesis if valid
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
}

// Example: n = 3
// Output: ["((()))", "(()())", "(())()", "()(())", "()()()"]
```

**Time:** O(4ⁿ / √n) - Catalan number

---

### 5. N-Queens Problem

```javascript
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    
    function isValid(row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        
        // Check diagonal (top-left)
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        
        // Check diagonal (top-right)
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        
        return true;
    }
    
    function backtrack(row) {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (!isValid(row, col)) continue;
            
            board[row][col] = 'Q';        // Place queen
            backtrack(row + 1);            // Next row
            board[row][col] = '.';         // Remove queen
        }
    }
    
    backtrack(0);
    return result;
}
```

**Time:** O(n!)
**Space:** O(n²)

---

### 6. Sudoku Solver

```javascript
function solveSudoku(board) {
    function isValid(row, col, num) {
        // Check row
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) return false;
        }
        
        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) return false;
        }
        
        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[boxRow + i][boxCol + j] === num) return false;
            }
        }
        
        return true;
    }
    
    function backtrack() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] !== '.') continue;
                
                for (let num = 1; num <= 9; num++) {
                    const char = String(num);
                    
                    if (isValid(row, col, char)) {
                        board[row][col] = char;     // Choose
                        
                        if (backtrack()) return true; // Found solution
                        
                        board[row][col] = '.';      // Backtrack
                    }
                }
                
                return false; // No valid number for this cell
            }
        }
        
        return true; // All cells filled
    }
    
    backtrack();
}
```

---

### 7. Word Search in Grid

```javascript
function exist(board, word) {
    const rows = board.length;
    const cols = board[0].length;
    
    function backtrack(row, col, index) {
        // Found complete word
        if (index === word.length) return true;
        
        // Out of bounds or wrong character
        if (row < 0 || row >= rows || col < 0 || col >= cols ||
            board[row][col] !== word[index]) {
            return false;
        }
        
        const temp = board[row][col];
        board[row][col] = '#'; // Mark as visited
        
        // Explore all 4 directions
        const found = backtrack(row + 1, col, index + 1) ||
                      backtrack(row - 1, col, index + 1) ||
                      backtrack(row, col + 1, index + 1) ||
                      backtrack(row, col - 1, index + 1);
        
        board[row][col] = temp; // Restore cell
        
        return found;
    }
    
    // Try starting from each cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }
    
    return false;
}
```

---

## Backtracking Optimization Techniques

### 1. Pruning
Skip branches that can't lead to valid solutions.

```javascript
// In combination sum, stop if sum exceeds target
if (sum > target) return; // Prune
```

### 2. Early Termination
Return immediately when solution found (if only need one).

```javascript
if (backtrack()) return true; // Stop at first solution
```

### 3. Sorting for Pruning
Sort candidates to enable early stopping.

```javascript
candidates.sort((a, b) => a - b);
// Now can break when sum + candidates[i] > target
```

### 4. Use Sets for Duplicates
Avoid duplicate combinations/permutations.

```javascript
const seen = new Set();
for (let i = start; i < nums.length; i++) {
    if (seen.has(nums[i])) continue;
    seen.add(nums[i]);
    // ... backtrack
}
```

---

## Backtracking vs Other Techniques

| Technique | Use When | Example |
|-----------|----------|---------|
| Backtracking | Generate all solutions, constraint satisfaction | Permutations, Sudoku |
| Greedy | Local optimum = global optimum | Interval scheduling |
| DP | Overlapping subproblems, optimal substructure | Fibonacci, knapsack |
| Divide & Conquer | Independent subproblems | Merge sort, binary search |

---

## Common Backtracking Patterns

1. **Combination/Subset** - Build incrementally, avoid duplicates
2. **Permutation** - Use all elements, order matters
3. **Grid/Matrix** - Explore 4/8 directions, mark visited
4. **Constraint Satisfaction** - Check validity at each step
5. **Partition** - Split into groups with constraints

---

## Practice Problems

1. **Subsets** (LeetCode 78) - Generate all subsets
2. **Subsets II** (LeetCode 90) - With duplicates
3. **Permutations** (LeetCode 46) - All permutations
4. **Permutations II** (LeetCode 47) - With duplicates
5. **Combination Sum** (LeetCode 39) - Sum to target
6. **Generate Parentheses** (LeetCode 22) - Valid parentheses
7. **Letter Combinations** (LeetCode 17) - Phone number
8. **Palindrome Partitioning** (LeetCode 131) - Partition string
9. **N-Queens** (LeetCode 51) - Chess queens
10. **Sudoku Solver** (LeetCode 37) - Solve sudoku

---

## Key Takeaways

✅ Backtracking explores all possibilities systematically
✅ Choose → Explore → Unchoose pattern
✅ Prune invalid paths early for efficiency
✅ Use for constraint satisfaction problems
✅ Time complexity often exponential (O(2ⁿ), O(n!))
✅ Mark/unmark state when backtracking
✅ Different from DP: doesn't reuse subproblem solutions

Master backtracking - essential for combinatorial problems!
