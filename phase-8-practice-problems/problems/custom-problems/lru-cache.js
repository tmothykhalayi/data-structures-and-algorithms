/**
 * Custom Problem: LRU Cache Implementation
 * Difficulty: Medium
 * Topics: Hash Map, Doubly Linked List, Design
 * 
 * Problem:
 * Design a Least Recently Used (LRU) cache data structure that supports:
 * - get(key): Get the value of the key if it exists, otherwise return -1
 * - put(key, value): Update or insert the value if the key exists.
 *   When capacity is reached, evict the least recently used item.
 * 
 * Both operations should run in O(1) average time complexity.
 */

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();

        // Dummy head and tail for easier manipulation
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // Add node right after head (most recently used)
    _addNode(node) {
        node.prev = this.head;
        node.next = this.head.next;

        this.head.next.prev = node;
        this.head.next = node;
    }

    // Remove node from list
    _removeNode(node) {
        const prev = node.prev;
        const next = node.next;

        prev.next = next;
        next.prev = prev;
    }

    // Move node to head (mark as recently used)
    _moveToHead(node) {
        this._removeNode(node);
        this._addNode(node);
    }

    // Remove node from tail (least recently used)
    _popTail() {
        const node = this.tail.prev;
        this._removeNode(node);
        return node;
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }

        const node = this.cache.get(key);
        this._moveToHead(node);
        return node.value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            // Update existing key
            const node = this.cache.get(key);
            node.value = value;
            this._moveToHead(node);
        } else {
            // Add new key
            const newNode = new Node(key, value);
            this.cache.set(key, newNode);
            this._addNode(newNode);

            if (this.cache.size > this.capacity) {
                // Evict least recently used
                const tail = this._popTail();
                this.cache.delete(tail.key);
            }
        }
    }

    // Helper method to display cache state
    display() {
        const items = [];
        let current = this.head.next;

        while (current !== this.tail) {
            items.push(`${current.key}:${current.value}`);
            current = current.next;
        }

        return `[${items.join(' -> ')}] (MRU -> LRU)`;
    }
}

// Alternative implementation using Map (maintains insertion order)
class LRUCacheSimple {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }

        // Move to end (most recent)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        // Remove if exists
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        // Add to end
        this.cache.set(key, value);

        // Evict oldest if over capacity
        if (this.cache.size > this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }

    display() {
        const items = Array.from(this.cache.entries())
            .map(([k, v]) => `${k}:${v}`);
        return `[${items.join(' -> ')}]`;
    }
}

// Test cases
if (require.main === module) {
    console.log('=== LRU Cache Implementation ===\n');

    console.log('Test Case 1: Basic Operations');
    const cache = new LRUCache(2);

    console.log('put(1, 1)');
    cache.put(1, 1);
    console.log('Cache:', cache.display());

    console.log('\nput(2, 2)');
    cache.put(2, 2);
    console.log('Cache:', cache.display());

    console.log('\nget(1):', cache.get(1));
    console.log('Cache:', cache.display());

    console.log('\nput(3, 3) - evicts key 2');
    cache.put(3, 3);
    console.log('Cache:', cache.display());

    console.log('\nget(2):', cache.get(2)); // returns -1
    console.log('Cache:', cache.display());

    console.log('\nput(4, 4) - evicts key 1');
    cache.put(4, 4);
    console.log('Cache:', cache.display());

    console.log('\nget(1):', cache.get(1)); // returns -1
    console.log('get(3):', cache.get(3)); // returns 3
    console.log('get(4):', cache.get(4)); // returns 4
    console.log('Cache:', cache.display());

    console.log('\n' + '='.repeat(50));
    console.log('\nTest Case 2: Simple Implementation');
    const cache2 = new LRUCacheSimple(3);

    const operations = [
        ['put', 1, 10],
        ['put', 2, 20],
        ['put', 3, 30],
        ['get', 1],
        ['put', 4, 40],
        ['get', 2],
        ['get', 3],
        ['get', 4]
    ];

    operations.forEach(([op, ...args]) => {
        if (op === 'put') {
            console.log(`${op}(${args[0]}, ${args[1]})`);
            cache2.put(args[0], args[1]);
        } else {
            const result = cache2.get(args[0]);
            console.log(`${op}(${args[0]}): ${result}`);
        }
        console.log('Cache:', cache2.display());
        console.log();
    });
}

module.exports = { LRUCache, LRUCacheSimple };
