/**
 * Trie (Prefix Tree) Implementation
 * Efficient for string operations
 * Used in autocomplete, spell checking, IP routing
 * Time: O(L) for insert/search where L is string length
 */

class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.count = 0; // Number of words with this prefix
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Insert a word - O(L)
    insert(word) {
        let node = this.root;

        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
            node.count++;
        }

        node.isEndOfWord = true;
    }

    // Search for exact word - O(L)
    search(word) {
        let node = this.root;

        for (let char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }

        return node.isEndOfWord;
    }

    // Check if prefix exists - O(L)
    startsWith(prefix) {
        let node = this.root;

        for (let char of prefix) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }

        return true;
    }

    // Get all words with given prefix - O(L + K)
    wordsWithPrefix(prefix) {
        const results = [];
        let node = this.root;

        // Navigate to prefix
        for (let char of prefix) {
            if (!node.children[char]) {
                return results;
            }
            node = node.children[char];
        }

        // DFS to find all words
        const dfs = (node, currentWord) => {
            if (node.isEndOfWord) {
                results.push(currentWord);
            }

            for (let [char, childNode] of Object.entries(node.children)) {
                dfs(childNode, currentWord + char);
            }
        };

        dfs(node, prefix);
        return results;
    }

    // Count words with given prefix - O(L)
    countWordsWithPrefix(prefix) {
        let node = this.root;

        for (let char of prefix) {
            if (!node.children[char]) {
                return 0;
            }
            node = node.children[char];
        }

        return node.count;
    }

    // Delete a word - O(L)
    delete(word) {
        const deleteHelper = (node, word, index) => {
            if (index === word.length) {
                if (!node.isEndOfWord) {
                    return false;
                }

                node.isEndOfWord = false;
                return Object.keys(node.children).length === 0;
            }

            const char = word[index];
            const childNode = node.children[char];

            if (!childNode) {
                return false;
            }

            const shouldDeleteChild = deleteHelper(childNode, word, index + 1);

            if (shouldDeleteChild) {
                delete node.children[char];
                childNode.count--;
                return Object.keys(node.children).length === 0 && !node.isEndOfWord;
            }

            return false;
        };

        deleteHelper(this.root, word, 0);
    }

    // Get all words in trie - O(N)
    getAllWords() {
        const results = [];

        const dfs = (node, currentWord) => {
            if (node.isEndOfWord) {
                results.push(currentWord);
            }

            for (let [char, childNode] of Object.entries(node.children)) {
                dfs(childNode, currentWord + char);
            }
        };

        dfs(this.root, '');
        return results;
    }

    // Longest common prefix - O(N * L)
    longestCommonPrefix() {
        let prefix = '';
        let node = this.root;

        while (Object.keys(node.children).length === 1 && !node.isEndOfWord) {
            const char = Object.keys(node.children)[0];
            prefix += char;
            node = node.children[char];
        }

        return prefix;
    }
}

// Autocomplete system
class Autocomplete {
    constructor() {
        this.trie = new Trie();
    }

    addWord(word) {
        this.trie.insert(word.toLowerCase());
    }

    getSuggestions(prefix, limit = 10) {
        const words = this.trie.wordsWithPrefix(prefix.toLowerCase());
        return words.slice(0, limit);
    }
}

// Spell checker with Trie
class SpellChecker {
    constructor() {
        this.trie = new Trie();
    }

    addWord(word) {
        this.trie.insert(word.toLowerCase());
    }

    isCorrect(word) {
        return this.trie.search(word.toLowerCase());
    }

    suggest(word, maxDistance = 2) {
        const suggestions = [];
        const allWords = this.trie.getAllWords();

        for (let dictWord of allWords) {
            const distance = this.levenshteinDistance(word.toLowerCase(), dictWord);
            if (distance <= maxDistance) {
                suggestions.push({ word: dictWord, distance });
            }
        }

        return suggestions.sort((a, b) => a.distance - b.distance);
    }

    levenshteinDistance(s1, s2) {
        const dp = Array.from({ length: s1.length + 1 }, () => 
            Array(s2.length + 1).fill(0)
        );

        for (let i = 0; i <= s1.length; i++) dp[i][0] = i;
        for (let j = 0; j <= s2.length; j++) dp[0][j] = j;

        for (let i = 1; i <= s1.length; i++) {
            for (let j = 1; j <= s2.length; j++) {
                if (s1[i - 1] === s2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                        dp[i - 1][j],
                        dp[i][j - 1],
                        dp[i - 1][j - 1]
                    );
                }
            }
        }

        return dp[s1.length][s2.length];
    }
}

// Example usage
if (require.main === module) {
    console.log('=== Trie Demo ===\n');

    const trie = new Trie();

    // Insert words
    const words = ['apple', 'app', 'apricot', 'application', 'apply', 'banana'];
    words.forEach(word => trie.insert(word));

    console.log('Inserted words:', words);

    // Search
    console.log('\nSearch "app":', trie.search('app'));
    console.log('Search "appl":', trie.search('appl'));

    // Prefix check
    console.log('\nStarts with "app":', trie.startsWith('app'));
    console.log('Starts with "ban":', trie.startsWith('ban'));

    // Words with prefix
    console.log('\nWords with prefix "app":', trie.wordsWithPrefix('app'));
    console.log('Count of words with prefix "app":', trie.countWordsWithPrefix('app'));

    // All words
    console.log('\nAll words:', trie.getAllWords());

    // Delete
    trie.delete('app');
    console.log('\nAfter deleting "app":', trie.search('app'));
    console.log('But "apple" still exists:', trie.search('apple'));

    // Autocomplete
    console.log('\n=== Autocomplete Demo ===');
    const autocomplete = new Autocomplete();
    ['apple', 'application', 'apply', 'appreciate', 'april'].forEach(w => 
        autocomplete.addWord(w)
    );
    console.log('Suggestions for "app":', autocomplete.getSuggestions('app'));

    // Spell checker
    console.log('\n=== Spell Checker Demo ===');
    const spellChecker = new SpellChecker();
    ['hello', 'world', 'programming', 'algorithm'].forEach(w => 
        spellChecker.addWord(w)
    );

    console.log('Is "hello" correct?', spellChecker.isCorrect('hello'));
    console.log('Is "helo" correct?', spellChecker.isCorrect('helo'));
    console.log('Suggestions for "helo":', spellChecker.suggest('helo', 2));
}

module.exports = { Trie, TrieNode, Autocomplete, SpellChecker };
