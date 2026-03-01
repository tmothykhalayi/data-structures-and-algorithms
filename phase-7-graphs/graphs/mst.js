/**
 * Minimum Spanning Tree Algorithms
 * Prim's and Kruskal's algorithms
 */

// Disjoint Set Union (Union-Find) for Kruskal's
class DSU {
    constructor(size) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = Array(size).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return false;

        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }

        return true;
    }
}

// Prim's Algorithm - O((V + E) log V)
function prim(graph, start) {
    const mst = [];
    const visited = new Set();
    const minHeap = [];
    let totalWeight = 0;

    // Helper to add edges to heap
    function addEdges(vertex) {
        visited.add(vertex);
        const neighbors = graph.get(vertex) || [];

        for (let { node: neighbor, weight } of neighbors) {
            if (!visited.has(neighbor)) {
                minHeap.push({ from: vertex, to: neighbor, weight });
            }
        }

        minHeap.sort((a, b) => a.weight - b.weight);
    }

    addEdges(start);

    while (minHeap.length > 0 && visited.size < graph.size) {
        const edge = minHeap.shift();

        if (visited.has(edge.to)) continue;

        mst.push(edge);
        totalWeight += edge.weight;
        addEdges(edge.to);
    }

    return { mst, totalWeight };
}

// Kruskal's Algorithm - O(E log E)
function kruskal(vertices, edges) {
    // Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight);

    // Create vertex to index mapping
    const vertexIndex = new Map();
    vertices.forEach((v, i) => vertexIndex.set(v, i));

    const dsu = new DSU(vertices.length);
    const mst = [];
    let totalWeight = 0;

    for (let edge of edges) {
        const u = vertexIndex.get(edge.from);
        const v = vertexIndex.get(edge.to);

        if (dsu.union(u, v)) {
            mst.push(edge);
            totalWeight += edge.weight;

            if (mst.length === vertices.length - 1) {
                break; // MST complete
            }
        }
    }

    return { mst, totalWeight };
}

// Prim's with Priority Queue (more efficient)
class MinHeapPQ {
    constructor() {
        this.heap = [];
    }

    push(item) {
        this.heap.push(item);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].weight <= this.heap[index].weight) break;

            [this.heap[parentIndex], this.heap[index]] = 
                [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown(index) {
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < this.heap.length && 
                this.heap[left].weight < this.heap[smallest].weight) {
                smallest = left;
            }

            if (right < this.heap.length && 
                this.heap[right].weight < this.heap[smallest].weight) {
                smallest = right;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = 
                [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

function primOptimized(graph, start) {
    const mst = [];
    const visited = new Set();
    const pq = new MinHeapPQ();
    let totalWeight = 0;

    function addEdges(vertex) {
        visited.add(vertex);
        const neighbors = graph.get(vertex) || [];

        for (let { node: neighbor, weight } of neighbors) {
            if (!visited.has(neighbor)) {
                pq.push({ from: vertex, to: neighbor, weight });
            }
        }
    }

    addEdges(start);

    while (!pq.isEmpty() && visited.size < graph.size) {
        const edge = pq.pop();

        if (visited.has(edge.to)) continue;

        mst.push(edge);
        totalWeight += edge.weight;
        addEdges(edge.to);
    }

    return { mst, totalWeight };
}

// Example usage
if (require.main === module) {
    console.log('=== Minimum Spanning Tree Algorithms ===\n');

    // Create graph
    const graph = new Map();
    graph.set('A', [
        { node: 'B', weight: 4 },
        { node: 'H', weight: 8 }
    ]);
    graph.set('B', [
        { node: 'A', weight: 4 },
        { node: 'C', weight: 8 },
        { node: 'H', weight: 11 }
    ]);
    graph.set('C', [
        { node: 'B', weight: 8 },
        { node: 'D', weight: 7 },
        { node: 'F', weight: 4 },
        { node: 'I', weight: 2 }
    ]);
    graph.set('D', [
        { node: 'C', weight: 7 },
        { node: 'E', weight: 9 },
        { node: 'F', weight: 14 }
    ]);
    graph.set('E', [
        { node: 'D', weight: 9 },
        { node: 'F', weight: 10 }
    ]);
    graph.set('F', [
        { node: 'C', weight: 4 },
        { node: 'D', weight: 14 },
        { node: 'E', weight: 10 },
        { node: 'G', weight: 2 }
    ]);
    graph.set('G', [
        { node: 'F', weight: 2 },
        { node: 'H', weight: 1 },
        { node: 'I', weight: 6 }
    ]);
    graph.set('H', [
        { node: 'A', weight: 8 },
        { node: 'B', weight: 11 },
        { node: 'G', weight: 1 },
        { node: 'I', weight: 7 }
    ]);
    graph.set('I', [
        { node: 'C', weight: 2 },
        { node: 'G', weight: 6 },
        { node: 'H', weight: 7 }
    ]);

    // Prim's Algorithm
    console.log("1. Prim's Algorithm:");
    const primResult = prim(graph, 'A');
    console.log('   MST edges:');
    primResult.mst.forEach(edge => {
        console.log(`     ${edge.from} - ${edge.to} (weight: ${edge.weight})`);
    });
    console.log('   Total weight:', primResult.totalWeight);

    // Kruskal's Algorithm
    console.log("\n2. Kruskal's Algorithm:");
    const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const edges = [];

    // Extract all edges
    for (let [from, neighbors] of graph.entries()) {
        for (let { node: to, weight } of neighbors) {
            if (from < to) { // Avoid duplicates in undirected graph
                edges.push({ from, to, weight });
            }
        }
    }

    const kruskalResult = kruskal(vertices, edges);
    console.log('   MST edges:');
    kruskalResult.mst.forEach(edge => {
        console.log(`     ${edge.from} - ${edge.to} (weight: ${edge.weight})`);
    });
    console.log('   Total weight:', kruskalResult.totalWeight);

    // Optimized Prim's
    console.log("\n3. Prim's Algorithm (Optimized):");
    const primOptResult = primOptimized(graph, 'A');
    console.log('   Total weight:', primOptResult.totalWeight);
}

module.exports = {
    prim,
    primOptimized,
    kruskal,
    DSU
};
