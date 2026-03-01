/**
 * Grid/Matrix Dynamic Programming Problems
 * Problems involving 2D grids and paths
 */

// 1. Unique Paths - O(m * n)
function uniquePaths(m, n) {
    const dp = Array.from({ length: m }, () => Array(n).fill(1));
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    
    return dp[m - 1][n - 1];
}

// Space optimized
function uniquePathsOptimized(m, n) {
    const dp = Array(n).fill(1);
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }
    
    return dp[n - 1];
}

// 2. Unique Paths with Obstacles - O(m * n)
function uniquePathsWithObstacles(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    if (grid[0][0] === 1 || grid[m - 1][n - 1] === 1) return 0;
    
    const dp = Array.from({ length: m }, () => Array(n).fill(0));
    dp[0][0] = 1;
    
    // Initialize first column
    for (let i = 1; i < m; i++) {
        dp[i][0] = grid[i][0] === 1 ? 0 : dp[i - 1][0];
    }
    
    // Initialize first row
    for (let j = 1; j < n; j++) {
        dp[0][j] = grid[0][j] === 1 ? 0 : dp[0][j - 1];
    }
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (grid[i][j] === 1) {
                dp[i][j] = 0;
            } else {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
    }
    
    return dp[m - 1][n - 1];
}

// 3. Minimum Path Sum - O(m * n)
function minPathSum(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dp = Array.from({ length: m }, () => Array(n).fill(0));
    
    dp[0][0] = grid[0][0];
    
    // Initialize first column
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    
    // Initialize first row
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    
    return dp[m - 1][n - 1];
}

// 4. Maximum Path Sum in Triangle - O(n²)
function minimumTotal(triangle) {
    const n = triangle.length;
    const dp = [...triangle[n - 1]];
    
    for (let i = n - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
        }
    }
    
    return dp[0];
}

// 5. Maximal Square - O(m * n)
function maximalSquare(matrix) {
    if (matrix.length === 0) return 0;
    
    const m = matrix.length;
    const n = matrix[0].length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    let maxSide = 0;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (matrix[i - 1][j - 1] === '1') {
                dp[i][j] = Math.min(
                    dp[i - 1][j],
                    dp[i][j - 1],
                    dp[i - 1][j - 1]
                ) + 1;
                maxSide = Math.max(maxSide, dp[i][j]);
            }
        }
    }
    
    return maxSide * maxSide;
}

// 6. Dungeon Game - O(m * n)
function calculateMinimumHP(dungeon) {
    const m = dungeon.length;
    const n = dungeon[0].length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(Infinity));
    
    dp[m][n - 1] = dp[m - 1][n] = 1;
    
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const minHealth = Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];
            dp[i][j] = minHealth <= 0 ? 1 : minHealth;
        }
    }
    
    return dp[0][0];
}

// 7. Cherry Pickup - O(n³)
function cherryPickup(grid) {
    const n = grid.length;
    const dp = Array.from({ length: n }, () =>
        Array.from({ length: n }, () => Array(n).fill(-Infinity))
    );
    
    dp[0][0][0] = grid[0][0];
    
    for (let x1 = 0; x1 < n; x1++) {
        for (let y1 = 0; y1 < n; y1++) {
            for (let x2 = 0; x2 < n; x2++) {
                const y2 = x1 + y1 - x2;
                
                if (y2 < 0 || y2 >= n || grid[x1][y1] === -1 || grid[x2][y2] === -1) {
                    continue;
                }
                
                let cherries = grid[x1][y1];
                if (x1 !== x2) {
                    cherries += grid[x2][y2];
                }
                
                for (let px1 of [x1 - 1, x1]) {
                    for (let px2 of [x2 - 1, x2]) {
                        if (px1 >= 0 && px2 >= 0) {
                            const py1 = y1 - (x1 - px1);
                            const py2 = y2 - (x2 - px2);
                            
                            if (py1 >= 0 && py2 >= 0) {
                                dp[x1][y1][x2] = Math.max(
                                    dp[x1][y1][x2],
                                    dp[px1][py1][px2] + cherries
                                );
                            }
                        }
                    }
                }
            }
        }
    }
    
    return Math.max(0, dp[n - 1][n - 1][n - 1]);
}

// 8. Longest Palindromic Substring - O(n²)
function longestPalindrome(s) {
    const n = s.length;
    if (n === 0) return '';
    
    const dp = Array.from({ length: n }, () => Array(n).fill(false));
    let start = 0, maxLen = 1;
    
    // All substrings of length 1 are palindromes
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }
    
    // Check for length 2
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            start = i;
            maxLen = 2;
        }
    }
    
    // Check for lengths greater than 2
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            const j = i + len - 1;
            
            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                start = i;
                maxLen = len;
            }
        }
    }
    
    return s.substring(start, start + maxLen);
}

// Example usage
if (require.main === module) {
    console.log('=== Grid/Matrix DP Problems ===\n');

    console.log('1. Unique Paths (3x7 grid):');
    console.log('   Paths:', uniquePaths(3, 7));
    console.log('   Optimized:', uniquePathsOptimized(3, 7));

    const obstacleGrid = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ];
    console.log('\n2. Unique Paths with Obstacles:');
    console.log('   Paths:', uniquePathsWithObstacles(obstacleGrid));

    const grid = [
        [1, 3, 1],
        [1, 5, 1],
        [4, 2, 1]
    ];
    console.log('\n3. Minimum Path Sum:');
    console.log('   Min sum:', minPathSum(grid));

    const triangle = [
        [2],
        [3, 4],
        [6, 5, 7],
        [4, 1, 8, 3]
    ];
    console.log('\n4. Triangle Min Path:');
    console.log('   Min path:', minimumTotal(triangle));

    const matrix = [
        ['1', '0', '1', '0', '0'],
        ['1', '0', '1', '1', '1'],
        ['1', '1', '1', '1', '1'],
        ['1', '0', '0', '1', '0']
    ];
    console.log('\n5. Maximal Square:');
    console.log('   Max area:', maximalSquare(matrix));

    const dungeon = [
        [-2, -3, 3],
        [-5, -10, 1],
        [10, 30, -5]
    ];
    console.log('\n6. Dungeon Game:');
    console.log('   Initial health:', calculateMinimumHP(dungeon));

    console.log('\n7. Longest Palindromic Substring "babad":');
    console.log('   Result:', longestPalindrome('babad'));
}

module.exports = {
    uniquePaths,
    uniquePathsOptimized,
    uniquePathsWithObstacles,
    minPathSum,
    minimumTotal,
    maximalSquare,
    calculateMinimumHP,
    cherryPickup,
    longestPalindrome
};
