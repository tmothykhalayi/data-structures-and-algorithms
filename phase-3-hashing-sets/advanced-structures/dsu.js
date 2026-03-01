/**
 * Disjoint Set Union (DSU) / Union-Find
 * Data structure for tracking disjoint sets
 * Supports union and find operations
 * Uses path compression and union by rank optimizations
 * Time Complexity: Nearly O(1) amortized per operation
 */

class DisjointSetUnion {
    constructor(size) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = Array(size).fill(0);
        this.size = Array(size).fill(1);
        this.numSets = size;
    }

    // Find with path compression - O(α(n)) amortized
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    // Union by rank - O(α(n)) amortized
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return false; // Already in same set

        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
            this.size[rootY] += this.size[rootX];
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
            this.size[rootX] += this.size[rootY];
        } else {
            this.parent[rootY] = rootX;
            this.size[rootX] += this.size[rootY];
            this.rank[rootX]++;
        }

        this.numSets--;
        return true;
    }

    // Check if x and y are in same set - O(α(n))
    connected(x, y) {
        return this.find(x) === this.find(y);
    }

    // Get size of set containing x - O(α(n))
    getSetSize(x) {
        return this.size[this.find(x)];
    }

    // Get number of disjoint sets - O(1)
    getNumSets() {
        return this.numSets;
    }

    // Reset the DSU
    reset() {
        for (let i = 0; i < this.parent.length; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
            this.size[i] = 1;
        }
        this.numSets = this.parent.length;
    }
}

// DSU with named elements (using Map)
class DisjointSetUnionMap {
    constructor() {
        this.parent = new Map();
        this.rank = new Map();
        this.size = new Map();
        this.numSets = 0;
    }

    makeSet(x) {
        if (!this.parent.has(x)) {
            this.parent.set(x, x);
            this.rank.set(x, 0);
            this.size.set(x, 1);
            this.numSets++;
        }
    }

    find(x) {
        if (!this.parent.has(x)) {
            this.makeSet(x);
        }

        if (this.parent.get(x) !== x) {
            this.parent.set(x, this.find(this.parent.get(x)));
        }

        return this.parent.get(x);
    }

    union(x, y) {
        this.makeSet(x);
        this.makeSet(y);

        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return false;

        if (this.rank.get(rootX) < this.rank.get(rootY)) {
            this.parent.set(rootX, rootY);
            this.size.set(rootY, this.size.get(rootY) + this.size.get(rootX));
        } else if (this.rank.get(rootX) > this.rank.get(rootY)) {
            this.parent.set(rootY, rootX);
            this.size.set(rootX, this.size.get(rootX) + this.size.get(rootY));
        } else {
            this.parent.set(rootY, rootX);
            this.size.set(rootX, this.size.get(rootX) + this.size.get(rootY));
            this.rank.set(rootX, this.rank.get(rootX) + 1);
        }

        this.numSets--;
        return true;
    }

    connected(x, y) {
        return this.find(x) === this.find(y);
    }

    getSetSize(x) {
        return this.size.get(this.find(x)) || 0;
    }

    getNumSets() {
        return this.numSets;
    }
}

// Application: Detect cycle in undirected graph
function hasCycle(edges, n) {
    const dsu = new DisjointSetUnion(n);

    for (let [u, v] of edges) {
        if (!dsu.union(u, v)) {
            return true; // Cycle detected
        }
    }

    return false;
}

// Application: Number of connected components
function countComponents(edges, n) {
    const dsu = new DisjointSetUnion(n);

    for (let [u, v] of edges) {
        dsu.union(u, v);
    }

    return dsu.getNumSets();
}

// Example usage
if (require.main === module) {
    console.log('=== Disjoint Set Union Demo ===\n');

    const dsu = new DisjointSetUnion(10);

    console.log('Initial sets:', dsu.getNumSets());

    // Union operations
    dsu.union(0, 1);
    dsu.union(2, 3);
    dsu.union(0, 2);
    console.log('\nAfter unions (0-1, 2-3, 0-2):');
    console.log('  Number of sets:', dsu.getNumSets());
    console.log('  Are 1 and 3 connected?', dsu.connected(1, 3));
    console.log('  Are 1 and 4 connected?', dsu.connected(1, 4));
    console.log('  Size of set containing 0:', dsu.getSetSize(0));

    // More unions
    dsu.union(4, 5);
    dsu.union(5, 6);
    console.log('\nAfter more unions (4-5, 5-6):');
    console.log('  Number of sets:', dsu.getNumSets());

    // DSU with named elements
    console.log('\n=== DSU with Named Elements ===');
    const dsuMap = new DisjointSetUnionMap();

    dsuMap.union('Alice', 'Bob');
    dsuMap.union('Charlie', 'David');
    dsuMap.union('Bob', 'Charlie');

    console.log('Are Alice and David connected?', dsuMap.connected('Alice', 'David'));
    console.log('Number of groups:', dsuMap.getNumSets());
    console.log('Size of Alice\'s group:', dsuMap.getSetSize('Alice'));

    // Application: Cycle detection
    console.log('\n=== Cycle Detection ===');
    const edges1 = [[0, 1], [1, 2], [2, 0]];
    console.log('Graph with edges', JSON.stringify(edges1));
    console.log('  Has cycle?', hasCycle(edges1, 3));

    const edges2 = [[0, 1], [1, 2]];
    console.log('\nGraph with edges', JSON.stringify(edges2));
    console.log('  Has cycle?', hasCycle(edges2, 3));

    // Application: Connected components
    console.log('\n=== Connected Components ===');
    const edges3 = [[0, 1], [1, 2], [3, 4]];
    console.log('Edges:', JSON.stringify(edges3));
    console.log('  Number of components (n=5):', countComponents(edges3, 5));
}

module.exports = { DisjointSetUnion, DisjointSetUnionMap, hasCycle, countComponents };
