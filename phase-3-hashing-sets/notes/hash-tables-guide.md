# Hash Tables Deep Dive

## What is a Hash Table?

A **hash table** (hash map) is a data structure that maps keys to values using a **hash function**. It provides O(1) average-case lookups, inserts, and deletes.

## Core Components

### 1. Hash Function
Converts a key into an array index.

```javascript
function hashFunction(key, tableSize) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash + key.charCodeAt(i) * 31) % tableSize;
    }
    return hash;
}
```

**Properties of Good Hash Functions:**
- ✅ Deterministic (same input → same output)
- ✅ Uniform distribution (minimizes collisions)
- ✅ Fast to compute
- ✅ Minimizes clustering

### 2. Hash Table Array
Underlying storage structure (usually an array).

### 3. Collision Resolution Strategy
Handles when two keys hash to the same index.

---

## Collision Resolution Techniques

### 1. Separate Chaining (Closed Addressing)

Each array slot contains a **linked list** of entries.

```javascript
class HashTable {
    constructor(size = 53) {
        this.table = new Array(size);
    }
    
    hash(key) {
        let total = 0;
        const PRIME = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            total = (total * PRIME + key.charCodeAt(i)) % this.table.length;
        }
        return total;
    }
    
    set(key, value) {
        const index = this.hash(key);
        
        if (!this.table[index]) {
            this.table[index] = [];
        }
        
        // Check if key exists
        for (let i = 0; i < this.table[index].length; i++) {
            if (this.table[index][i][0] === key) {
                this.table[index][i][1] = value; // Update
                return;
            }
        }
        
        // Add new key-value pair
        this.table[index].push([key, value]);
    }
    
    get(key) {
        const index = this.hash(key);
        const bucket = this.table[index];
        
        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    return bucket[i][1];
                }
            }
        }
        
        return undefined;
    }
    
    delete(key) {
        const index = this.hash(key);
        const bucket = this.table[index];
        
        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    bucket.splice(i, 1);
                    return true;
                }
            }
        }
        
        return false;
    }
}
```

**Pros:**
- Simple implementation
- No clustering
- Can store more items than table size

**Cons:**
- Extra space for linked lists
- Cache performance (pointer chasing)

---

### 2. Open Addressing (Closed Hashing)

All entries stored in the array itself.

#### a) Linear Probing
```
index = (hash(key) + i) % tableSize
```
Check next slot sequentially until empty slot found.

```javascript
class LinearProbingHashTable {
    constructor(size = 53) {
        this.keys = new Array(size);
        this.values = new Array(size);
        this.size = size;
        this.count = 0;
    }
    
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * 31) % this.size;
        }
        return hash;
    }
    
    set(key, value) {
        if (this.count / this.size > 0.7) {
            this.resize(); // Load factor > 0.7, resize
        }
        
        let index = this.hash(key);
        
        while (this.keys[index] !== undefined && this.keys[index] !== key) {
            index = (index + 1) % this.size; // Linear probing
        }
        
        if (this.keys[index] === undefined) {
            this.count++;
        }
        
        this.keys[index] = key;
        this.values[index] = value;
    }
    
    get(key) {
        let index = this.hash(key);
        
        while (this.keys[index] !== undefined) {
            if (this.keys[index] === key) {
                return this.values[index];
            }
            index = (index + 1) % this.size;
        }
        
        return undefined;
    }
}
```

**Pros:**
- Better cache performance
- No extra space for pointers

**Cons:**
- Primary clustering
- Requires load factor management

#### b) Quadratic Probing
```
index = (hash(key) + i²) % tableSize
```

Reduces primary clustering.

#### c) Double Hashing
```
index = (hash1(key) + i * hash2(key)) % tableSize
```

Uses two hash functions, best collision avoidance.

---

## Load Factor

```
Load Factor = Number of Elements / Table Size
```

**Typical thresholds:**
- Separate Chaining: Resize at α > 1.0
- Open Addressing: Resize at α > 0.7

### Resizing (Rehashing)

```javascript
resize() {
    const oldKeys = this.keys;
    const oldValues = this.values;
    
    this.size = this.size * 2;
    this.keys = new Array(this.size);
    this.values = new Array(this.size);
    this.count = 0;
    
    for (let i = 0; i < oldKeys.length; i++) {
        if (oldKeys[i] !== undefined) {
            this.set(oldKeys[i], oldValues[i]);
        }
    }
}
```

**Time Complexity**: O(n) but amortized O(1)

---

## Time Complexity Analysis

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Search    | O(1)    | O(n)       |
| Insert    | O(1)    | O(n)       |
| Delete    | O(1)    | O(n)       |
| Space     | O(n)    | O(n)       |

**Worst case** occurs with many collisions (bad hash function or high load factor).

---

## Hash Function Strategies

### 1. Division Method
```javascript
hash = key % tableSize
```
Simple but choose prime tableSize.

### 2. Multiplication Method
```javascript
hash = floor(tableSize * ((key * A) % 1))
```
Where A ≈ 0.6180339887 (golden ratio).

### 3. Universal Hashing
Randomly select hash function from family to avoid adversarial inputs.

### 4. Cryptographic Hashing
SHA-256, MD5 (secure but slower).

---

## Common Hash Table Applications

1. **Caching** - Store computed results
2. **Database Indexing** - Fast lookups
3. **Symbol Tables** - Compilers/interpreters
4. **Counting Frequencies** - Character/word counts
5. **Deduplication** - Remove duplicates
6. **Two Sum Problem** - Store complements
7. **Anagram Detection** - Character frequency maps

---

## Practice Problems

1. **Two Sum** - Find pairs that sum to target
2. **Group Anagrams** - Group words with same letters
3. **Longest Substring Without Repeating** - Use hash to track seen chars
4. **Valid Sudoku** - Hash to check duplicates
5. **Design HashMap** - Implement from scratch

---

## Key Takeaways

✅ Hash tables provide O(1) average operations
✅ Good hash function minimizes collisions
✅ Separate chaining vs open addressing trade-offs
✅ Monitor load factor and resize when needed
✅ Python dict, JavaScript Object/Map use hash tables
✅ Perfect for lookups, caching, and frequency counting

Master hash tables - they're one of the most practical data structures!
