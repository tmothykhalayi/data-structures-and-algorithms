/**
 * HackerRank: Sherlock and the Valid String
 * Difficulty: Medium
 * Topics: String, Hash Map
 * 
 * Problem:
 * Sherlock considers a string to be valid if all characters of the string
 * appear the same number of times. It is also valid if he can remove just 1
 * character at 1 index in the string, and the remaining characters will occur
 * the same number of times.
 * 
 * Return "YES" if valid, "NO" otherwise.
 * 
 * Example:
 * "abc" -> "YES" (all appear 1 time)
 * "abcc" -> "YES" (remove one 'c', all appear 1 time)
 * "abccc" -> "NO" (can't make valid by removing 1 char)
 */

function isValid(s) {
    // Count frequency of each character
    const charFreq = {};
    for (const char of s) {
        charFreq[char] = (charFreq[char] || 0) + 1;
    }

    // Count frequency of frequencies
    const freqCount = {};
    for (const freq of Object.values(charFreq)) {
        freqCount[freq] = (freqCount[freq] || 0) + 1;
    }

    const frequencies = Object.keys(freqCount).map(Number).sort((a, b) => a - b);

    // Case 1: All characters have same frequency
    if (frequencies.length === 1) {
        const freq = frequencies[0];
        // Valid if freq is 1 (all chars appear once)
        // or we have only one character type
        return freq === 1 || freqCount[freq] === 1 ? "YES" : "YES";
    }

    // Case 2: Two different frequencies
    if (frequencies.length === 2) {
        const [freq1, freq2] = frequencies;
        const count1 = freqCount[freq1];
        const count2 = freqCount[freq2];

        // Check if we can remove one character to make valid
        // Option 1: Higher frequency appears once and is exactly 1 more
        if (count2 === 1 && freq2 - freq1 === 1) {
            return "YES";
        }

        // Option 2: Lower frequency appears once and is 1
        if (count1 === 1 && freq1 === 1) {
            return "YES";
        }

        // Option 3: Higher frequency is 1 more and appears once
        if (count1 === 1 && freq1 - freq2 === 1) {
            return "YES";
        }

        // Option 4: Lower frequency appears once and higher appears for all others
        if (count2 === 1 && freq2 === 1) {
            return "YES";
        }

        // Option 5: One frequency has count 1 and that frequency is (length - 1) / count
        if (count1 === 1 && freq1 * count1 === 1) {
            return "YES";
        }

        if (count2 === 1 && freq2 * count2 === 1) {
            return "YES";
        }
    }

    return "NO";
}

// More intuitive solution
function isValidIntuitive(s) {
    const charFreq = {};
    for (const char of s) {
        charFreq[char] = (charFreq[char] || 0) + 1;
    }

    const freqs = Object.values(charFreq);
    const freqCount = {};

    for (const freq of freqs) {
        freqCount[freq] = (freqCount[freq] || 0) + 1;
    }

    const uniqueFreqs = Object.keys(freqCount).map(Number);

    // All same frequency
    if (uniqueFreqs.length === 1) {
        return uniqueFreqs[0] === 1 || freqCount[uniqueFreqs[0]] === 1 ? "YES" : "YES";
    }

    // Two different frequencies
    if (uniqueFreqs.length === 2) {
        const [f1, f2] = uniqueFreqs.sort((a, b) => a - b);
        const c1 = freqCount[f1];
        const c2 = freqCount[f2];

        // Remove one occurrence of a character with higher frequency
        if (c2 === 1 && (f2 - f1 === 1 || f2 === 1)) {
            return "YES";
        }

        // Remove one character that appears only once
        if (c1 === 1 && (f1 === 1 || f1 - f2 === 1)) {
            return "YES";
        }
    }

    return "NO";
}

// Test cases
if (require.main === module) {
    const testCases = [
        { input: "abc", expected: "YES", reason: "All chars appear once" },
        { input: "abcc", expected: "YES", reason: "Remove one 'c'" },
        { input: "abccc", expected: "NO", reason: "Can't make valid" },
        { input: "aabbcd", expected: "NO", reason: "Can't make valid" },
        { input: "aabbccddeefghi", expected: "NO", reason: "Too many differences" },
        { input: "abcdefghhgfedecba", expected: "YES", reason: "All same frequency" },
        { input: "a", expected: "YES", reason: "Single character" },
        { input: "aaa", expected: "YES", reason: "All same" }
    ];

    console.log('=== Sherlock and the Valid String (HackerRank) ===\n');

    testCases.forEach(({ input, expected, reason }) => {
        const result = isValid(input);

        console.log(`Input: "${input}"`);
        console.log(`Expected: ${expected} (${reason})`);
        console.log(`Result: ${result}`);
        console.log(`Status: ${result === expected ? '✓ PASS' : '✗ FAIL'}`);
        console.log();
    });
}

module.exports = { isValid, isValidIntuitive };
