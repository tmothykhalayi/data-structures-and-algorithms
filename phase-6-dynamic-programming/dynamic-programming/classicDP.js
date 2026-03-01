/**
 * Classic Dynamic Programming Problems
 * Demonstrates memoization and tabulation approaches
 */

// 1. Fibonacci - Classic DP Introduction
function fibonacciDP(n) {
    if (n <= 1) return n;
    
    const dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

// Space optimized Fibonacci
function fibonacciOptimized(n) {
    if (n <= 1) return n;
    
    let prev2 = 0, prev1 = 1;
    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}

// 2. Climbing Stairs - O(n)
function climbStairs(n) {
    if (n <= 2) return n;
    
    const dp = [0, 1, 2];
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

// 3. Longest Common Subsequence - O(m * n)
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    
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

// 4. Longest Increasing Subsequence - O(n²)
function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;
    
    const dp = Array(nums.length).fill(1);
    let maxLen = 1;
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }
    
    return maxLen;
}

// LIS Optimized with Binary Search - O(n log n)
function lengthOfLISOptimized(nums) {
    const tails = [];
    
    for (let num of nums) {
        let left = 0, right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === tails.length) {
            tails.push(num);
        } else {
            tails[left] = num;
        }
    }
    
    return tails.length;
}

// 5. Edit Distance (Levenshtein Distance) - O(m * n)
function editDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // Delete
                    dp[i][j - 1],     // Insert
                    dp[i - 1][j - 1]  // Replace
                );
            }
        }
    }
    
    return dp[m][n];
}

// 6. Coin Change - Minimum coins - O(n * amount)
function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (i >= coin) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Coin Change - Number of ways - O(n * amount)
function coinChangeWays(coins, amount) {
    const dp = Array(amount + 1).fill(0);
    dp[0] = 1;
    
    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    
    return dp[amount];
}

// 7. House Robber - O(n)
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    const dp = [nums[0], Math.max(nums[0], nums[1])];
    
    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    
    return dp[nums.length - 1];
}

// Space optimized
function robOptimized(nums) {
    if (nums.length === 0) return 0;
    
    let prev2 = 0, prev1 = 0;
    
    for (let num of nums) {
        const current = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// 8. Maximum Subarray (Kadane's Algorithm) - O(n)
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// Example usage
if (require.main === module) {
    console.log('=== Classic DP Problems ===\n');

    console.log('1. Fibonacci(10):', fibonacciDP(10));
    console.log('   Optimized:', fibonacciOptimized(10));

    console.log('\n2. Climbing Stairs (n=5):', climbStairs(5));

    console.log('\n3. LCS("abcde", "ace"):', 
                longestCommonSubsequence('abcde', 'ace'));

    console.log('\n4. LIS [10,9,2,5,3,7,101,18]:', 
                lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
    console.log('   Optimized:', 
                lengthOfLISOptimized([10, 9, 2, 5, 3, 7, 101, 18]));

    console.log('\n5. Edit Distance("horse", "ros"):', 
                editDistance('horse', 'ros'));

    console.log('\n6. Coin Change [1,2,5], amount 11:');
    console.log('   Min coins:', coinChange([1, 2, 5], 11));
    console.log('   Number of ways:', coinChangeWays([1, 2, 5], 11));

    console.log('\n7. House Robber [2,7,9,3,1]:', 
                rob([2, 7, 9, 3, 1]));
    console.log('   Optimized:', robOptimized([2, 7, 9, 3, 1]));

    console.log('\n8. Max Subarray [-2,1,-3,4,-1,2,1,-5,4]:', 
                maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
}

module.exports = {
    fibonacciDP,
    fibonacciOptimized,
    climbStairs,
    longestCommonSubsequence,
    lengthOfLIS,
    lengthOfLISOptimized,
    editDistance,
    coinChange,
    coinChangeWays,
    rob,
    robOptimized,
    maxSubArray
};
