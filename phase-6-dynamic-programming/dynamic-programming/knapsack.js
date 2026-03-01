/**
 * Knapsack Problem Variations
 * Classic optimization problems in DP
 */

// 1. 0/1 Knapsack - O(n * W)
function knapsack01(weights, values, capacity) {
    const n = weights.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][capacity];
}

// 0/1 Knapsack with items tracking
function knapsack01WithItems(weights, values, capacity) {
    const n = weights.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
    
    // Fill DP table
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    // Backtrack to find items
    const items = [];
    let w = capacity;
    for (let i = n; i > 0 && w > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            items.push(i - 1);
            w -= weights[i - 1];
        }
    }
    
    return {
        maxValue: dp[n][capacity],
        items: items.reverse()
    };
}

// Space optimized 0/1 Knapsack - O(W)
function knapsack01Optimized(weights, values, capacity) {
    const dp = Array(capacity + 1).fill(0);
    
    for (let i = 0; i < weights.length; i++) {
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    
    return dp[capacity];
}

// 2. Unbounded Knapsack - O(n * W)
function knapsackUnbounded(weights, values, capacity) {
    const dp = Array(capacity + 1).fill(0);
    
    for (let w = 0; w <= capacity; w++) {
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] <= w) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
    }
    
    return dp[capacity];
}

// 3. Subset Sum Problem - O(n * sum)
function subsetSum(nums, target) {
    const dp = Array(target + 1).fill(false);
    dp[0] = true;
    
    for (let num of nums) {
        for (let i = target; i >= num; i--) {
            dp[i] = dp[i] || dp[i - num];
        }
    }
    
    return dp[target];
}

// Count subsets with given sum
function countSubsetSum(nums, target) {
    const dp = Array(target + 1).fill(0);
    dp[0] = 1;
    
    for (let num of nums) {
        for (let i = target; i >= num; i--) {
            dp[i] += dp[i - num];
        }
    }
    
    return dp[target];
}

// 4. Partition Equal Subset Sum - O(n * sum)
function canPartition(nums) {
    const sum = nums.reduce((a, b) => a + b, 0);
    
    if (sum % 2 !== 0) return false;
    
    const target = sum / 2;
    return subsetSum(nums, target);
}

// 5. Minimum Subset Sum Difference - O(n * sum)
function minSubsetSumDiff(nums) {
    const sum = nums.reduce((a, b) => a + b, 0);
    const n = nums.length;
    
    const dp = Array.from({ length: n + 1 }, () => Array(sum + 1).fill(false));
    
    for (let i = 0; i <= n; i++) {
        dp[i][0] = true;
    }
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= sum; j++) {
            dp[i][j] = dp[i - 1][j];
            if (nums[i - 1] <= j) {
                dp[i][j] = dp[i][j] || dp[i - 1][j - nums[i - 1]];
            }
        }
    }
    
    // Find the largest j such that dp[n][j] is true
    let minDiff = Infinity;
    for (let j = 0; j <= Math.floor(sum / 2); j++) {
        if (dp[n][j]) {
            minDiff = Math.min(minDiff, sum - 2 * j);
        }
    }
    
    return minDiff;
}

// 6. Target Sum - O(n * sum)
function findTargetSumWays(nums, target) {
    const sum = nums.reduce((a, b) => a + b, 0);
    
    if (Math.abs(target) > sum || (sum + target) % 2 !== 0) {
        return 0;
    }
    
    const subsetSum = (sum + target) / 2;
    return countSubsetSum(nums, subsetSum);
}

// 7. Rod Cutting Problem - O(n²)
function rodCutting(prices, n) {
    const dp = Array(n + 1).fill(0);
    
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            dp[i] = Math.max(dp[i], prices[j] + dp[i - j - 1]);
        }
    }
    
    return dp[n];
}

// Example usage
if (require.main === module) {
    console.log('=== Knapsack Problems ===\n');

    const weights = [2, 3, 4, 5];
    const values = [3, 4, 5, 6];
    const capacity = 8;

    console.log('1. 0/1 Knapsack:');
    console.log('   Weights:', weights);
    console.log('   Values:', values);
    console.log('   Capacity:', capacity);
    console.log('   Max value:', knapsack01(weights, values, capacity));
    console.log('   With items:', knapsack01WithItems(weights, values, capacity));
    console.log('   Optimized:', knapsack01Optimized(weights, values, capacity));

    console.log('\n2. Unbounded Knapsack:');
    console.log('   Max value:', knapsackUnbounded(weights, values, capacity));

    console.log('\n3. Subset Sum [3,34,4,12,5,2], target 9:');
    console.log('   Possible?', subsetSum([3, 34, 4, 12, 5, 2], 9));
    console.log('   Count:', countSubsetSum([3, 34, 4, 12, 5, 2], 9));

    console.log('\n4. Partition Equal Subset [1,5,11,5]:');
    console.log('   Can partition?', canPartition([1, 5, 11, 5]));

    console.log('\n5. Min Subset Sum Diff [1,6,11,5]:');
    console.log('   Min difference:', minSubsetSumDiff([1, 6, 11, 5]));

    console.log('\n6. Target Sum [1,1,1,1,1], target 3:');
    console.log('   Number of ways:', findTargetSumWays([1, 1, 1, 1, 1], 3));

    console.log('\n7. Rod Cutting [1,5,8,9,10,17,17,20]:');
    console.log('   Max value for length 8:', rodCutting([1, 5, 8, 9, 10, 17, 17, 20], 8));
}

module.exports = {
    knapsack01,
    knapsack01WithItems,
    knapsack01Optimized,
    knapsackUnbounded,
    subsetSum,
    countSubsetSum,
    canPartition,
    minSubsetSumDiff,
    findTargetSumWays,
    rodCutting
};
