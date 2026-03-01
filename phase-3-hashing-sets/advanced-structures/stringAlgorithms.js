/**
 * Advanced String Algorithms
 * KMP, Rabin-Karp, Z-Algorithm, Manacher's Algorithm
 */

// 1. KMP (Knuth-Morris-Pratt) Pattern Matching - O(n + m)
function kmpSearch(text, pattern) {
    if (pattern.length === 0) return [];

    // Build LPS (Longest Prefix Suffix) array
    const lps = buildLPS(pattern);
    const matches = [];

    let i = 0; // Index for text
    let j = 0; // Index for pattern

    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++;
            j++;
        }

        if (j === pattern.length) {
            matches.push(i - j);
            j = lps[j - 1];
        } else if (i < text.length && text[i] !== pattern[j]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return matches;
}

function buildLPS(pattern) {
    const lps = Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;

    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

// 2. Rabin-Karp Algorithm - O(n + m) average
function rabinKarp(text, pattern) {
    const d = 256; // Number of characters in input alphabet
    const q = 101; // A prime number
    const m = pattern.length;
    const n = text.length;
    const matches = [];

    let p = 0; // Hash value for pattern
    let t = 0; // Hash value for text window
    let h = 1;

    // Calculate h = d^(m-1) % q
    for (let i = 0; i < m - 1; i++) {
        h = (h * d) % q;
    }

    // Calculate initial hash values
    for (let i = 0; i < m; i++) {
        p = (d * p + pattern.charCodeAt(i)) % q;
        t = (d * t + text.charCodeAt(i)) % q;
    }

    // Slide pattern over text
    for (let i = 0; i <= n - m; i++) {
        // Check if hash matches
        if (p === t) {
            // Verify character by character
            let match = true;
            for (let j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }

            if (match) {
                matches.push(i);
            }
        }

        // Calculate hash for next window
        if (i < n - m) {
            t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;

            if (t < 0) {
                t = t + q;
            }
        }
    }

    return matches;
}

// 3. Z-Algorithm - O(n)
function zAlgorithm(s) {
    const n = s.length;
    const z = Array(n).fill(0);
    let l = 0, r = 0;

    for (let i = 1; i < n; i++) {
        if (i > r) {
            l = r = i;
            while (r < n && s[r - l] === s[r]) {
                r++;
            }
            z[i] = r - l;
            r--;
        } else {
            const k = i - l;

            if (z[k] < r - i + 1) {
                z[i] = z[k];
            } else {
                l = i;
                while (r < n && s[r - l] === s[r]) {
                    r++;
                }
                z[i] = r - l;
                r--;
            }
        }
    }

    return z;
}

// Pattern matching using Z-algorithm
function zPatternMatch(text, pattern) {
    const concat = pattern + '$' + text;
    const z = zAlgorithm(concat);
    const matches = [];

    for (let i = 0; i < z.length; i++) {
        if (z[i] === pattern.length) {
            matches.push(i - pattern.length - 1);
        }
    }

    return matches;
}

// 4. Manacher's Algorithm - Longest Palindromic Substring - O(n)
function manacher(s) {
    // Transform string to handle even length palindromes
    let t = '#';
    for (let char of s) {
        t += char + '#';
    }

    const n = t.length;
    const p = Array(n).fill(0);
    let center = 0, right = 0;

    for (let i = 0; i < n; i++) {
        const mirror = 2 * center - i;

        if (i < right) {
            p[i] = Math.min(right - i, p[mirror]);
        }

        // Expand around center i
        while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 &&
               t[i + p[i] + 1] === t[i - p[i] - 1]) {
            p[i]++;
        }

        // Update center and right boundary
        if (i + p[i] > right) {
            center = i;
            right = i + p[i];
        }
    }

    // Find longest palindrome
    let maxLen = 0;
    let centerIndex = 0;

    for (let i = 0; i < n; i++) {
        if (p[i] > maxLen) {
            maxLen = p[i];
            centerIndex = i;
        }
    }

    const start = Math.floor((centerIndex - maxLen) / 2);
    return s.substring(start, start + maxLen);
}

// 5. Aho-Corasick Algorithm (Multiple Pattern Matching)
class AhoCorasick {
    constructor() {
        this.root = { children: {}, fail: null, output: [] };
    }

    buildTrie(patterns) {
        // Build trie
        for (let pattern of patterns) {
            let node = this.root;

            for (let char of pattern) {
                if (!node.children[char]) {
                    node.children[char] = { children: {}, fail: null, output: [] };
                }
                node = node.children[char];
            }

            node.output.push(pattern);
        }

        // Build failure links (BFS)
        const queue = [];
        this.root.fail = this.root;

        for (let child of Object.values(this.root.children)) {
            child.fail = this.root;
            queue.push(child);
        }

        while (queue.length > 0) {
            const current = queue.shift();

            for (let [char, child] of Object.entries(current.children)) {
                queue.push(child);

                let fail = current.fail;
                while (fail !== this.root && !fail.children[char]) {
                    fail = fail.fail;
                }

                child.fail = fail.children[char] || this.root;
                child.output = child.output.concat(child.fail.output);
            }
        }
    }

    search(text) {
        const matches = [];
        let node = this.root;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            while (node !== this.root && !node.children[char]) {
                node = node.fail;
            }

            node = node.children[char] || this.root;

            for (let pattern of node.output) {
                matches.push({
                    pattern,
                    position: i - pattern.length + 1
                });
            }
        }

        return matches;
    }
}

// 6. Suffix Array Construction - O(n log² n)
function buildSuffixArray(s) {
    const n = s.length;
    const suffixes = [];

    for (let i = 0; i < n; i++) {
        suffixes.push({ index: i, suffix: s.substring(i) });
    }

    suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));

    return suffixes.map(s => s.index);
}

// Example usage
if (require.main === module) {
    console.log('=== String Algorithms Demo ===\n');

    const text = 'ABABDABACDABABCABAB';
    const pattern = 'ABABCABAB';

    console.log('Text:', text);
    console.log('Pattern:', pattern);

    console.log('\n1. KMP Search:');
    console.log('   Matches at:', kmpSearch(text, pattern));

    console.log('\n2. Rabin-Karp:');
    console.log('   Matches at:', rabinKarp(text, pattern));

    console.log('\n3. Z-Algorithm:');
    console.log('   Matches at:', zPatternMatch(text, pattern));

    console.log('\n4. Longest Palindrome in "babad":');
    console.log('   Result:', manacher('babad'));
    console.log('   In "cbbd":', manacher('cbbd'));

    console.log('\n5. Aho-Corasick (Multiple Patterns):');
    const ac = new AhoCorasick();
    const patterns = ['he', 'she', 'his', 'hers'];
    ac.buildTrie(patterns);
    const text2 = 'ahishers';
    console.log(`   Text: "${text2}"`);
    console.log('   Patterns:', patterns);
    console.log('   Matches:', ac.search(text2));

    console.log('\n6. Suffix Array for "banana":');
    console.log('   Result:', buildSuffixArray('banana'));
}

module.exports = {
    kmpSearch,
    buildLPS,
    rabinKarp,
    zAlgorithm,
    zPatternMatch,
    manacher,
    AhoCorasick,
    buildSuffixArray
};
