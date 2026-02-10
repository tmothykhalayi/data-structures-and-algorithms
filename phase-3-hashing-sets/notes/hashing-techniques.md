# Hashing Techniques and Applications

## What is Hashing?

**Hashing** is the process of transforming data of arbitrary size into a fixed-size value (hash code) using a hash function.

## Hash Function Properties

### Good Hash Function Characteristics

1. **Deterministic** - Same input always produces same output
2. **Uniform Distribution** - Evenly distributes keys across table
3. **Efficient** - Fast to compute
4. **Avalanche Effect** - Small input change → large output change

```javascript
// Example: djb2 Hash Function
function djb2Hash(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i); // hash * 33 + c
    }
    return hash >>> 0; // Convert to unsigned 32-bit integer
}
```

---

## Common Hashing Algorithms

### 1. Simple Hash (Additive)
```javascript
function simpleHash(key, tableSize) {
    let sum = 0;
    for (let char of key) {
        sum += char.charCodeAt(0);
    }
    return sum % tableSize;
}
```
**Problem**: Many collisions (anagrams hash to same value)

### 2. Multiplicative Hash
```javascript
function multiplicativeHash(key, tableSize) {
    let hash = 0;
    const MULTIPLIER = 31; // Prime number
    
    for (let i = 0; i < key.length; i++) {
        hash = (hash * MULTIPLIER + key.charCodeAt(i)) % tableSize;
    }
    
    return hash;
}
```
**Better**: Reduces collisions, used by Java String.hashCode()

### 3. Polynomial Rolling Hash
```javascript
function polynomialHash(key, base = 31, mod = 1e9 + 9) {
    let hash = 0;
    let power = 1;
    
    for (let i = 0; i < key.length; i++) {
        hash = (hash + key.charCodeAt(i) * power) % mod;
        power = (power * base) % mod;
    }
    
    return hash;
}
```
**Use Case**: String matching, substring search

### 4. FNV-1a Hash (Fast, Non-Cryptographic)
```javascript
function fnv1aHash(str) {
    let hash = 2166136261; // FNV offset basis
    
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + 
                (hash << 8) + (hash << 24);
    }
    
    return hash >>> 0;
}
```

---

## Rolling Hash (Rabin-Karp Algorithm)

Efficiently update hash when sliding window over string.

```javascript
class RollingHash {
    constructor(base = 256, mod = 101) {
        this.base = base;
        this.mod = mod;
    }
    
    // Calculate initial hash
    initialHash(str, length) {
        let hash = 0;
        for (let i = 0; i < length; i++) {
            hash = (hash * this.base + str.charCodeAt(i)) % this.mod;
        }
        return hash;
    }
    
    // Roll hash: remove first char, add new char
    rollHash(hash, oldChar, newChar, highestPower) {
        // Remove old character
        hash = (hash - oldChar.charCodeAt(0) * highestPower) % this.mod;
        if (hash < 0) hash += this.mod;
        
        // Shift and add new character
        hash = (hash * this.base + newChar.charCodeAt(0)) % this.mod;
        
        return hash;
    }
    
    // Pre-calculate base^(length-1) % mod
    calculatePower(length) {
        let power = 1;
        for (let i = 0; i < length - 1; i++) {
            power = (power * this.base) % this.mod;
        }
        return power;
    }
}

// Usage: Pattern matching
function findPattern(text, pattern) {
    const rh = new RollingHash();
    const m = pattern.length;
    const n = text.length;
    
    const patternHash = rh.initialHash(pattern, m);
    let textHash = rh.initialHash(text, m);
    const power = rh.calculatePower(m);
    
    const matches = [];
    
    for (let i = 0; i <= n - m; i++) {
        if (textHash === patternHash) {
            // Verify actual match (hash collision check)
            if (text.substring(i, i + m) === pattern) {
                matches.push(i);
            }
        }
        
        if (i < n - m) {
            textHash = rh.rollHash(textHash, text[i], text[i + m], power);
        }
    }
    
    return matches;
}
```

**Time Complexity**: O(n + m) average, O(nm) worst
**Use Case**: Plagiarism detection, DNA sequence matching

---

## Hashing Applications

### 1. Frequency Counting

```javascript
function countFrequency(arr) {
    const freq = new Map();
    
    for (const item of arr) {
        freq.set(item, (freq.get(item) || 0) + 1);
    }
    
    return freq;
}
```

### 2. Anagram Detection

```javascript
function groupAnagrams(words) {
    const groups = new Map();
    
    for (const word of words) {
        const sorted = word.split('').sort().join('');
        
        if (!groups.has(sorted)) {
            groups.set(sorted, []);
        }
        groups.get(sorted).push(word);
    }
    
    return Array.from(groups.values());
}
```

### 3. Caching (Memoization)

```javascript
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key); // O(1) lookup
        }
        
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// Usage
const fibonacci = memoize(function(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});
```

### 4. Two Sum Pattern

```javascript
function twoSum(nums, target) {
    const seen = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        
        seen.set(nums[i], i);
    }
    
    return null;
}
```

### 5. Bloom Filter (Probabilistic)

Space-efficient set membership test (may have false positives).

```javascript
class BloomFilter {
    constructor(size = 100) {
        this.size = size;
        this.bits = new Array(size).fill(0);
    }
    
    hash1(key) {
        let hash = 0;
        for (let char of key) {
            hash = (hash * 31 + char.charCodeAt(0)) % this.size;
        }
        return hash;
    }
    
    hash2(key) {
        let hash = 0;
        for (let char of key) {
            hash = (hash * 37 + char.charCodeAt(0)) % this.size;
        }
        return hash;
    }
    
    add(key) {
        this.bits[this.hash1(key)] = 1;
        this.bits[this.hash2(key)] = 1;
    }
    
    contains(key) {
        return this.bits[this.hash1(key)] === 1 && 
               this.bits[this.hash2(key)] === 1;
    }
}
```

---

## Choosing Table Size

### Prime Numbers
Always choose **prime numbers** for table size to minimize collisions.

```javascript
function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    
    return true;
}

function nextPrime(n) {
    while (!isPrime(n)) {
        n++;
    }
    return n;
}
```

**Good prime sizes**: 53, 97, 193, 389, 769, 1543, 3079, 6151, 12289, 24593

---

## Hash vs Other Data Structures

| Operation | Hash Table | Array | BST | Linked List |
|-----------|-----------|-------|-----|-------------|
| Search    | O(1) avg  | O(n)  | O(log n) | O(n)   |
| Insert    | O(1) avg  | O(n)  | O(log n) | O(1)   |
| Delete    | O(1) avg  | O(n)  | O(log n) | O(n)   |
| Sorted?   | No        | Can be| Yes      | No     |
| Memory    | More      | Less  | More     | More   |

---

## Practice Problems

1. **Valid Anagram** - Compare character frequencies
2. **First Unique Character** - Hash for frequency, find first with count 1
3. **Ransom Note** - Can construct from magazine letters
4. **Isomorphic Strings** - Map characters between strings
5. **Longest Consecutive Sequence** - Hash to check neighbors

---

## Key Takeaways

✅ Hashing converts keys to array indices in O(1)
✅ Good hash functions distribute keys uniformly
✅ Use prime numbers for table sizes
✅ Rolling hash efficient for substring matching
✅ Hash tables excel at lookups, counting, caching
✅ Trade memory for speed

Hashing is fundamental - master these techniques!
