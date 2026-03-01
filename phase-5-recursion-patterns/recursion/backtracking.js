/**
 * Backtracking Algorithms
 * Pattern: Choose -> Explore -> Un-choose
 * Used for constraint satisfaction problems
 */

// 1. Generate all permutations - O(n!)
function permutations(arr) {
    const result = [];
    
    function backtrack(current, remaining) {
        if (remaining.length === 0) {
            result.push([...current]);
            return;
        }
        
        for (let i = 0; i < remaining.length; i++) {
            current.push(remaining[i]);
            const newRemaining = [...remaining.slice(0, i), ...remaining.slice(i + 1)];
            backtrack(current, newRemaining);
            current.pop();
        }
    }
    
    backtrack([], arr);
    return result;
}

// 2. Generate all subsets (power set) - O(2^n)
function subsets(arr) {
    const result = [];
    
    function backtrack(start, current) {
        result.push([...current]);
        
        for (let i = start; i < arr.length; i++) {
            current.push(arr[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }
    
    backtrack(0, []);
    return result;
}

// 3. Combination Sum - O(2^n)
function combinationSum(candidates, target) {
    const result = [];
    
    function backtrack(start, current, sum) {
        if (sum === target) {
            result.push([...current]);
            return;
        }
        if (sum > target) return;
        
        for (let i = start; i < candidates.length; i++) {
            current.push(candidates[i]);
            backtrack(i, current, sum + candidates[i]);
            current.pop();
        }
    }
    
    backtrack(0, [], 0);
    return result;
}

// 4. N-Queens Problem - O(n!)
function solveNQueens(n) {
    const result = [];
    const board = Array.from({ length: n }, () => Array(n).fill('.'));
    
    function isValid(row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        
        // Check diagonal (top-left to bottom-right)
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        
        // Check diagonal (top-right to bottom-left)
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
            if (isValid(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';
            }
        }
    }
    
    backtrack(0);
    return result;
}

// 5. Sudoku Solver - O(9^m) where m is number of empty cells
function solveSudoku(board) {
    function isValid(board, row, col, num) {
        // Check row
        for (let x = 0; x < 9; x++) {
            if (board[row][x] == num) return false;
        }
        
        // Check column
        for (let x = 0; x < 9; x++) {
            if (board[x][col] == num) return false;
        }
        
        // Check 3x3 box
        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i + startRow][j + startCol] == num) return false;
            }
        }
        
        return true;
    }
    
    function solve() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] == '.') {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num.toString())) {
                            board[row][col] = num.toString();
                            
                            if (solve()) return true;
                            
                            board[row][col] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    solve();
    return board;
}

// 6. Letter combinations of phone number - O(4^n)
function letterCombinations(digits) {
    if (!digits) return [];
    
    const phone = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    const result = [];
    
    function backtrack(index, current) {
        if (index === digits.length) {
            result.push(current);
            return;
        }
        
        const letters = phone[digits[index]];
        for (let letter of letters) {
            backtrack(index + 1, current + letter);
        }
    }
    
    backtrack(0, '');
    return result;
}

// 7. Generate valid parentheses - O(2^n)
function generateParentheses(n) {
    const result = [];
    
    function backtrack(current, open, close) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
}

// 8. Word search in grid - O(m * n * 4^L)
function wordSearch(board, word) {
    const rows = board.length;
    const cols = board[0].length;
    
    function backtrack(row, col, index) {
        if (index === word.length) return true;
        
        if (row < 0 || row >= rows || col < 0 || col >= cols ||
            board[row][col] !== word[index]) {
            return false;
        }
        
        const temp = board[row][col];
        board[row][col] = '#'; // Mark as visited
        
        const found = backtrack(row + 1, col, index + 1) ||
                     backtrack(row - 1, col, index + 1) ||
                     backtrack(row, col + 1, index + 1) ||
                     backtrack(row, col - 1, index + 1);
        
        board[row][col] = temp; // Unmark
        return found;
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }
    
    return false;
}

// 9. Rat in a maze - O(2^(n^2))
function ratInMaze(maze) {
    const n = maze.length;
    const solution = Array.from({ length: n }, () => Array(n).fill(0));
    const paths = [];
    
    function isSafe(x, y) {
        return x >= 0 && x < n && y >= 0 && y < n && maze[x][y] === 1;
    }
    
    function solve(x, y, path) {
        if (x === n - 1 && y === n - 1 && maze[x][y] === 1) {
            solution[x][y] = 1;
            paths.push(path);
            solution[x][y] = 0;
            return;
        }
        
        if (isSafe(x, y)) {
            solution[x][y] = 1;
            
            // Move down
            solve(x + 1, y, path + 'D');
            // Move right
            solve(x, y + 1, path + 'R');
            // Move up
            solve(x - 1, y, path + 'U');
            // Move left
            solve(x, y - 1, path + 'L');
            
            solution[x][y] = 0; // Backtrack
        }
    }
    
    solve(0, 0, '');
    return paths;
}

// Example usage
if (require.main === module) {
    console.log('=== Backtracking Examples ===\n');

    console.log('1. Permutations of [1,2,3]:');
    console.log(permutations([1, 2, 3]));

    console.log('\n2. Subsets of [1,2,3]:');
    console.log(subsets([1, 2, 3]));

    console.log('\n3. Combination sum [2,3,5], target 8:');
    console.log(combinationSum([2, 3, 5], 8));

    console.log('\n4. N-Queens (n=4):');
    solveNQueens(4).forEach(solution => {
        solution.forEach(row => console.log(row));
        console.log('');
    });

    console.log('5. Letter combinations "23":');
    console.log(letterCombinations('23'));

    console.log('\n6. Generate Parentheses (n=3):');
    console.log(generateParentheses(3));

    const board = [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
    ];
    console.log('\n7. Word search for "ABCCED":');
    console.log(wordSearch(board, 'ABCCED'));

    const maze = [
        [1, 0, 0, 0],
        [1, 1, 0, 1],
        [0, 1, 0, 0],
        [1, 1, 1, 1]
    ];
    console.log('\n8. Rat in maze paths:');
    console.log(ratInMaze(maze));
}

module.exports = {
    permutations,
    subsets,
    combinationSum,
    solveNQueens,
    solveSudoku,
    letterCombinations,
    generateParentheses,
    wordSearch,
    ratInMaze
};
