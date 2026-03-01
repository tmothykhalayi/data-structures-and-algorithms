/**
 * String Operations and Algorithms
 * Common string manipulation techniques and problems
 */

class StringOperations {
    
    // Check if string is palindrome - O(n)
    static isPalindrome(str) {
        str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        let left = 0;
        let right = str.length - 1;
        
        while (left < right) {
            if (str[left] !== str[right]) {
                return false;
            }
            left++;
            right--;
        }
        
        return true;
    }

    // Reverse a string - O(n)
    static reverse(str) {
        return str.split('').reverse().join('');
    }

    // Reverse without built-in methods - O(n)
    static reverseManual(str) {
        let result = '';
        for (let i = str.length - 1; i >= 0; i--) {
            result += str[i];
        }
        return result;
    }

    // Check if two strings are anagrams - O(n)
    static areAnagrams(str1, str2) {
        if (str1.length !== str2.length) {
            return false;
        }

        const charCount = {};

        for (let char of str1) {
            charCount[char] = (charCount[char] || 0) + 1;
        }

        for (let char of str2) {
            if (!charCount[char]) {
                return false;
            }
            charCount[char]--;
        }

        return true;
    }

    // Count character occurrences - O(n)
    static countCharacters(str) {
        const charCount = {};
        
        for (let char of str) {
            charCount[char] = (charCount[char] || 0) + 1;
        }
        
        return charCount;
    }

    // Find first non-repeating character - O(n)
    static firstNonRepeatingChar(str) {
        const charCount = this.countCharacters(str);
        
        for (let char of str) {
            if (charCount[char] === 1) {
                return char;
            }
        }
        
        return null;
    }

    // Remove duplicates - O(n)
    static removeDuplicates(str) {
        const seen = new Set();
        let result = '';
        
        for (let char of str) {
            if (!seen.has(char)) {
                seen.add(char);
                result += char;
            }
        }
        
        return result;
    }

    // Check if string contains only unique characters - O(n)
    static hasUniqueCharacters(str) {
        if (str.length > 128) return false; // ASCII character set
        
        const charSet = new Set();
        
        for (let char of str) {
            if (charSet.has(char)) {
                return false;
            }
            charSet.add(char);
        }
        
        return true;
    }

    // Compress string (e.g., "aaabbcccc" -> "a3b2c4") - O(n)
    static compress(str) {
        if (str.length === 0) return str;
        
        let compressed = '';
        let count = 1;
        
        for (let i = 1; i <= str.length; i++) {
            if (i < str.length && str[i] === str[i - 1]) {
                count++;
            } else {
                compressed += str[i - 1] + count;
                count = 1;
            }
        }
        
        return compressed.length < str.length ? compressed : str;
    }

    // Longest substring without repeating characters - O(n)
    static longestUniqueSubstring(str) {
        let maxLength = 0;
        let start = 0;
        let maxStart = 0;
        const charIndex = {};
        
        for (let end = 0; end < str.length; end++) {
            const char = str[end];
            
            if (charIndex[char] >= start) {
                start = charIndex[char] + 1;
            }
            
            charIndex[char] = end;
            
            if (end - start + 1 > maxLength) {
                maxLength = end - start + 1;
                maxStart = start;
            }
        }
        
        return {
            length: maxLength,
            substring: str.substring(maxStart, maxStart + maxLength)
        };
    }

    // Count words in a string - O(n)
    static countWords(str) {
        return str.trim().split(/\s+/).filter(word => word.length > 0).length;
    }

    // Reverse words in a sentence - O(n)
    static reverseWords(str) {
        return str.trim().split(/\s+/).reverse().join(' ');
    }

    // Check if string is rotation of another - O(n)
    // e.g., "waterbottle" is rotation of "erbottlewat"
    static isRotation(str1, str2) {
        if (str1.length !== str2.length) {
            return false;
        }
        
        return (str1 + str1).includes(str2);
    }

    // Find all permutations of a string - O(n!)
    static permutations(str) {
        if (str.length === 0) return [''];
        if (str.length === 1) return [str];
        
        const result = [];
        
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            const remaining = str.slice(0, i) + str.slice(i + 1);
            const perms = this.permutations(remaining);
            
            for (let perm of perms) {
                result.push(char + perm);
            }
        }
        
        return result;
    }

    // Longest common prefix - O(n * m)
    static longestCommonPrefix(strs) {
        if (strs.length === 0) return '';
        
        let prefix = strs[0];
        
        for (let i = 1; i < strs.length; i++) {
            while (strs[i].indexOf(prefix) !== 0) {
                prefix = prefix.slice(0, -1);
                if (prefix === '') return '';
            }
        }
        
        return prefix;
    }

    // Check if strings are rotations using one substring call - O(n)
    static isSubstring(str1, str2) {
        if (str1.length !== str2.length || str1.length === 0) {
            return false;
        }
        
        const concatenated = str1 + str1;
        return concatenated.includes(str2);
    }

    // Convert to title case - O(n)
    static toTitleCase(str) {
        return str.toLowerCase().split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    // Count vowels and consonants - O(n)
    static countVowelsConsonants(str) {
        const vowels = 'aeiouAEIOU';
        let vowelCount = 0;
        let consonantCount = 0;
        
        for (let char of str) {
            if (char.match(/[a-zA-Z]/)) {
                if (vowels.includes(char)) {
                    vowelCount++;
                } else {
                    consonantCount++;
                }
            }
        }
        
        return { vowels: vowelCount, consonants: consonantCount };
    }

    // Remove all whitespace - O(n)
    static removeWhitespace(str) {
        return str.replace(/\s+/g, '');
    }

    // Check if string is subsequence of another - O(n)
    static isSubsequence(subseq, str) {
        let subIndex = 0;
        
        for (let i = 0; i < str.length && subIndex < subseq.length; i++) {
            if (str[i] === subseq[subIndex]) {
                subIndex++;
            }
        }
        
        return subIndex === subseq.length;
    }
}

// Example usage and testing
if (require.main === module) {
    console.log('=== String Operations Demo ===\n');

    // Palindrome check
    console.log('isPalindrome("racecar"):', StringOperations.isPalindrome('racecar'));
    console.log('isPalindrome("hello"):', StringOperations.isPalindrome('hello'));

    // Reverse string
    console.log('\nReverse "hello":', StringOperations.reverse('hello'));

    // Anagrams
    console.log('\nAre "listen" and "silent" anagrams?', 
                StringOperations.areAnagrams('listen', 'silent'));

    // Character count
    console.log('\nCharacter count in "hello":', 
                StringOperations.countCharacters('hello'));

    // First non-repeating character
    console.log('\nFirst non-repeating in "leetcode":', 
                StringOperations.firstNonRepeatingChar('leetcode'));

    // Remove duplicates
    console.log('\nRemove duplicates from "programming":', 
                StringOperations.removeDuplicates('programming'));

    // Unique characters
    console.log('\nHas unique chars "abcdefg":', 
                StringOperations.hasUniqueCharacters('abcdefg'));

    // Compress string
    console.log('\nCompress "aaabbcccc":', 
                StringOperations.compress('aaabbcccc'));

    // Longest unique substring
    console.log('\nLongest unique substring in "abcabcbb":', 
                StringOperations.longestUniqueSubstring('abcabcbb'));

    // Word operations
    console.log('\nWord count in "Hello world from JavaScript":', 
                StringOperations.countWords('Hello world from JavaScript'));
    console.log('Reverse words:', 
                StringOperations.reverseWords('Hello world from JavaScript'));

    // String rotation
    console.log('\nIs "waterbottle" rotation of "erbottlewat"?', 
                StringOperations.isRotation('waterbottle', 'erbottlewat'));

    // Permutations (small string only!)
    console.log('\nPermutations of "abc":', 
                StringOperations.permutations('abc'));

    // Common prefix
    console.log('\nLongest common prefix:', 
                StringOperations.longestCommonPrefix(['flower', 'flow', 'flight']));

    // Vowels and consonants
    console.log('\nVowels and consonants in "hello world":', 
                StringOperations.countVowelsConsonants('hello world'));

    // Subsequence check
    console.log('\nIs "ace" subsequence of "abcde"?', 
                StringOperations.isSubsequence('ace', 'abcde'));
}

module.exports = StringOperations;
