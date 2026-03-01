/**
 * LeetCode 1: Two Sum
 * Difficulty: Easy
 * Topics: Array, Hash Table
 * 
 * Problem:
 * Given an array of integers nums and an integer target,
 * return indices of the two numbers such that they add up to target.
 * 
 * Example:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Explanation: nums[0] + nums[1] = 2 + 7 = 9
 */

// Solution 1: Brute Force - O(n²) time, O(1) space
function twoSumBruteForce(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

// Solution 2: Hash Map (Optimal) - O(n) time, O(n) space
function twoSum(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (map.has(complement)) {
            return [map.get(complement), i];
        }

        map.set(nums[i], i);
    }

    return [];
}

// Solution 3: Two Pointers (for sorted array) - O(n) time, O(n) space for indices
function twoSumSorted(nums, target) {
    const indexed = nums.map((num, idx) => ({ num, idx }));
    indexed.sort((a, b) => a.num - b.num);

    let left = 0;
    let right = indexed.length - 1;

    while (left < right) {
        const sum = indexed[left].num + indexed[right].num;

        if (sum === target) {
            return [indexed[left].idx, indexed[right].idx].sort((a, b) => a - b);
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return [];
}

// Test cases
if (require.main === module) {
    const testCases = [
        { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
        { nums: [3, 2, 4], target: 6, expected: [1, 2] },
        { nums: [3, 3], target: 6, expected: [0, 1] },
        { nums: [1, 5, 3, 7, 9], target: 12, expected: [2, 4] }
    ];

    console.log('=== Two Sum Problem ===\n');

    testCases.forEach(({ nums, target, expected }, idx) => {
        console.log(`Test Case ${idx + 1}:`);
        console.log(`Input: nums = [${nums}], target = ${target}`);
        console.log(`Expected: [${expected}]`);
        console.log(`Output (Hash Map): [${twoSum(nums, target)}]`);
        console.log(`Output (Two Pointers): [${twoSumSorted(nums, target)}]`);
        console.log();
    });
}

module.exports = { twoSum, twoSumBruteForce, twoSumSorted };
