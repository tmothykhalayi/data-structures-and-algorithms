# Phase 3: Hashing & Sets

## Welcome to Hashing and Sets

Hashing provides constant-time O(1) lookups, making it one of the most powerful techniques in programming. Understanding hash tables and set operations is essential for solving many real-world problems efficiently.

---

## What You'll Learn

### 1. **Hash Tables**
- Hash functions and hashing concepts
- Collision handling (chaining, open addressing)
- Hash table operations: insert, search, delete
- Load factor and resizing
- Time complexity analysis

### 2. **Hash Maps & Hash Sets**
- Using built-in hash structures
- Common hash map patterns
- Frequency counting
- Two-sum pattern and variations

### 3. **Set Operations**
- Union, intersection, difference
- Symmetric difference
- Set-based problem solving
- Bitwise operations for sets

---

## Why Hashing Matters

Hashing is crucial because:

1. **Constant-Time Lookups**: O(1) average case for search/insert/delete
2. **Frequency Counting**: Count occurrences efficiently
3. **Deduplication**: Remove duplicates in O(n) time
4. **Caching**: Store and retrieve data quickly
5. **Database Indexing**: Hash indexes in databases
6. **Real-World Applications**: Dictionaries, caches, symbol tables

---

## Study Roadmap

### Week 1: Hash Tables
- Day 1-2: Hash functions and collision resolution
- Day 3-4: Implementation from scratch
- Day 5-7: Hash table problems

### Week 2: Hash Map Patterns
- Day 1-3: Two-sum and variations
- Day 4-5: Frequency counting patterns
- Day 6-7: Sliding window with hash maps

### Week 3: Set Operations
- Day 1-3: Set operations implementation
- Day 4-5: Set-based problem solving
- Day 6-7: Practice problems

---

## Key Concepts

### Hash Function Properties:
1. **Deterministic**: Same input → Same output
2. **Uniform Distribution**: Minimize collisions
3. **Efficient**: Quick to compute
4. **Minimizes Collisions**: Rare duplicate hashes

### Time Complexity:
- **Average Case**: O(1) for all operations
- **Worst Case**: O(n) when many collisions
- **Space**: O(n) for storing elements

---

## Common Patterns

### 1. Frequency Counting
- Count character/element occurrences
- Find duplicates
- Group anagrams

### 2. Two-Sum Pattern
- Find pairs that sum to target
- Complement lookup

### 3. Sliding Window with Hash Map
- Longest substring problems
- Variable-size windows

### 4. Set Operations
- Find common elements
- Find unique elements
- Symmetric differences

---

## Resources in This Phase

### Implementation Files:
- **Hash Table**: [hashtable.js](../hash-tables/hashtable.js)
- **Set Operations**: 
  - [union.js](../set-operations/union.js)
  - [intersection.js](../set-operations/intersection.js)
  - [setDifference.js](../set-operations/setDifference.js)
  - [symmetricDifference.js](../set-operations/symmetricDifference.js)

### Study Notes:
- [Hash Tables Guide](hash-tables-guide.md) - Complete hashing reference
- [Hash Map Patterns Guide](hashmap-patterns-guide.md) - Common patterns
- [Set Operations Guide](set-operations-guide.md) - Set operations explained

---

## Interview Tips

**Common Questions**:
- Two Sum / Three Sum / Four Sum
- Group Anagrams
- Longest Substring Without Repeating Characters
- Subarray Sum Equals K
- Valid Anagram
- First Unique Character
- Design HashMap

---

## Practice Strategy

1. Implement hash table from scratch
2. Master frequency counting
3. Solve two-sum variations (5-7 problems)
4. Practice set operations (3-5 problems)
5. Solve hash map problems (10-15 problems)

---

**Next**: Move to Phase 4 (Core Algorithms) to apply this knowledge!
