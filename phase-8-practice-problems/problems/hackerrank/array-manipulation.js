/**
 * HackerRank: Array Manipulation
 * Difficulty: Hard
 * Topics: Array, Prefix Sum
 * 
 * Problem:
 * Starting with a 1-indexed array of zeros and a list of operations,
 * for each operation add a value to each array element between two indices.
 * Once all operations have been performed, return the maximum value in the array.
 * 
 * Example:
 * n = 10
 * queries = [[1,5,3], [4,8,7], [6,9,1]]
 * 
 * Result: 10 (after all operations, position 7 has max value)
 */

// Solution 1: Brute Force - O(n*q) time, O(n) space
function arrayManipulationBruteForce(n, queries) {
    const arr = Array(n + 1).fill(0);

    for (const [start, end, value] of queries) {
        for (let i = start; i <= end; i++) {
            arr[i] += value;
        }
    }

    return Math.max(...arr);
}

// Solution 2: Prefix Sum (Optimal) - O(n + q) time, O(n) space
function arrayManipulation(n, queries) {
    const arr = Array(n + 2).fill(0);

    // Mark start and end+1 positions
    for (const [start, end, value] of queries) {
        arr[start] += value;
        arr[end + 1] -= value;
    }

    // Calculate prefix sum and track maximum
    let max = 0;
    let current = 0;

    for (let i = 1; i <= n; i++) {
        current += arr[i];
        max = Math.max(max, current);
    }

    return max;
}

// Solution 3: Difference Array with explanation
function arrayManipulationWithSteps(n, queries) {
    const diff = Array(n + 2).fill(0);

    console.log('Initial array:', Array(n).fill(0));
    console.log('\nQuery processing:');

    for (let idx = 0; idx < queries.length; idx++) {
        const [start, end, value] = queries[idx];
        diff[start] += value;
        diff[end + 1] -= value;

        console.log(`Query ${idx + 1}: [${start}, ${end}, ${value}]`);
        console.log(`  diff[${start}] += ${value}, diff[${end + 1}] -= ${value}`);
    }

    console.log('\nDifference array:', diff.slice(1, n + 1));
    console.log('\nPrefix sum calculation:');

    let max = 0;
    let current = 0;
    const finalArray = [];

    for (let i = 1; i <= n; i++) {
        current += diff[i];
        finalArray.push(current);
        max = Math.max(max, current);
    }

    console.log('Final array:', finalArray);
    console.log('Maximum value:', max);

    return max;
}

// Test cases
if (require.main === module) {
    const testCases = [
        {
            n: 10,
            queries: [
                [1, 5, 3],
                [4, 8, 7],
                [6, 9, 1]
            ],
            expected: 10
        },
        {
            n: 5,
            queries: [
                [1, 2, 100],
                [2, 5, 100],
                [3, 4, 100]
            ],
            expected: 200
        },
        {
            n: 4,
            queries: [
                [2, 3, 603],
                [1, 1, 286],
                [4, 4, 882]
            ],
            expected: 882
        }
    ];

    console.log('=== Array Manipulation (HackerRank) ===\n');

    testCases.forEach(({ n, queries, expected }, idx) => {
        console.log(`\nTest Case ${idx + 1}:`);
        console.log(`Array size: ${n}`);
        console.log('Queries:', JSON.stringify(queries));

        if (idx === 0) {
            // Show detailed steps for first test case
            arrayManipulationWithSteps(n, queries);
        } else {
            const result = arrayManipulation(n, queries);
            console.log(`Expected: ${expected}`);
            console.log(`Result: ${result}`);
            console.log(`Status: ${result === expected ? '✓ PASS' : '✗ FAIL'}`);
        }

        console.log('\n' + '='.repeat(50));
    });
}

module.exports = {
    arrayManipulation,
    arrayManipulationBruteForce,
    arrayManipulationWithSteps
};
