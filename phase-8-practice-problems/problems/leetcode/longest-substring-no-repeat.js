/**
 * LeetCode 3: Longest Substring Without Repeating Characters
 * Difficulty: Medium
 * Topics: String, Sliding Window, Hash Table
 * 
 * Problem:
 * Given a string s, find the length of the longest substring
 * without repeating characters.
 * 
 * Example:
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with length 3.
 */

// Solution 1: Sliding Window with Set - O(n) time, O(min(m,n)) space
function lengthOfLongestSubstring(s) {
    const seen = new Set();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }

        seen.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

// Solution 2: Sliding Window with Map (Track indices) - O(n) time, O(min(m,n)) space
function lengthOfLongestSubstringOptimized(s) {
    const map = new Map();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        if (map.has(s[right]) && map.get(s[right]) >= left) {
            left = map.get(s[right]) + 1;
        }

        map.set(s[right], right);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

// Solution 3: With actual substring return
function longestSubstringNoRepeat(s) {
    const map = new Map();
    let left = 0;
    let maxLength = 0;
    let start = 0;

    for (let right = 0; right < s.length; right++) {
        if (map.has(s[right]) && map.get(s[right]) >= left) {
            left = map.get(s[right]) + 1;
        }

        map.set(s[right], right);

        if (right - left + 1 > maxLength) {
            maxLength = right - left + 1;
            start = left;
        }
    }

    return {
        length: maxLength,
        substring: s.substring(start, start + maxLength)
    };
}

// Test cases
if (require.main === module) {
    const testCases = [
        { input: 'abcabcbb', expected: 3 },
        { input: 'bbbbb', expected: 1 },
        { input: 'pwwkew', expected: 3 },
        { input: '', expected: 0 },
        { input: 'abcdef', expected: 6 },
        { input: 'dvdf', expected: 3 }
    ];

    console.log('=== Longest Substring Without Repeating Characters ===\n');

    testCases.forEach(({ input, expected }) => {
        const result1 = lengthOfLongestSubstring(input);
        const result2 = longestSubstringNoRepeat(input);

        console.log(`Input: "${input}"`);
        console.log(`Expected: ${expected}`);
        console.log(`Output: ${result1}`);
        console.log(`Substring: "${result2.substring}"`);
        console.log(`Status: ${result1 === expected ? '✓ PASS' : '✗ FAIL'}`);
        console.log();
    });
}

module.exports = {
    lengthOfLongestSubstring,
    lengthOfLongestSubstringOptimized,
    longestSubstringNoRepeat
};
