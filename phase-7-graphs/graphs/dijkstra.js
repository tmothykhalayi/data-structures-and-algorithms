/**
 * Dijkstra's Algorithm
 * Finds shortest path from source to all vertices
 * Works only with non-negative weights
 * Time Complexity: O((V + E) log V) with min heap
 */

class MinHeap {
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
            if (this.heap[parentIndex].distance <= this.heap[index].distance) break;

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
                this.heap[left].distance < this.heap[smallest].distance) {
                smallest = left;
            }

            if (right < this.heap.length && 
                this.heap[right].distance < this.heap[smallest].distance) {
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

function dijkstra(graph, start) {
    const distances = {};
    const previous = {};
    const visited = new Set();
    const pq = new MinHeap();

    // Initialize distances
    for (let vertex of graph.keys()) {
        distances[vertex] = vertex === start ? 0 : Infinity;
        previous[vertex] = null;
    }

    pq.push({ node: start, distance: 0 });

    while (!pq.isEmpty()) {
        const { node: current } = pq.pop();

        if (visited.has(current)) continue;
        visited.add(current);

        const neighbors = graph.get(current) || [];

        for (let { node: neighbor, weight } of neighbors) {
            const newDistance = distances[current] + weight;

            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previous[neighbor] = current;
                pq.push({ node: neighbor, distance: newDistance });
            }
        }
    }

    return { distances, previous };
}

// Get shortest path to a specific vertex
function getPath(previous, target) {
    const path = [];
    let current = target;

    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }

    return path;
}

// Dijkstra with path reconstruction
function dijkstraWithPath(graph, start, end) {
    const { distances, previous } = dijkstra(graph, start);
    const path = getPath(previous, end);

    return {
        distance: distances[end],
        path: distances[end] === Infinity ? [] : path
    };
}

// Example usage
if (require.main === module) {
    console.log("=== Dijkstra's Algorithm Demo ===\n");

    // Create graph using adjacency list
    const graph = new Map();
    graph.set('A', [{ node: 'B', weight: 4 }, { node: 'C', weight: 2 }]);
    graph.set('B', [{ node: 'C', weight: 1 }, { node: 'D', weight: 5 }]);
    graph.set('C', [{ node: 'D', weight: 8 }, { node: 'E', weight: 10 }]);
    graph.set('D', [{ node: 'E', weight: 2 }]);
    graph.set('E', []);

    const start = 'A';
    const { distances, previous } = dijkstra(graph, start);

    console.log(`Shortest distances from ${start}:`);
    for (let [vertex, distance] of Object.entries(distances)) {
        console.log(`  ${vertex}: ${distance === Infinity ? '∞' : distance}`);
    }

    console.log('\nShortest paths:');
    for (let vertex of graph.keys()) {
        const path = getPath(previous, vertex);
        console.log(`  ${start} -> ${vertex}: ${path.join(' -> ')}`);
    }

    // Find specific path
    const endVertex = 'E';
    const result = dijkstraWithPath(graph, start, endVertex);
    console.log(`\nPath from ${start} to ${endVertex}:`);
    console.log(`  Path: ${result.path.join(' -> ')}`);
    console.log(`  Distance: ${result.distance}`);
}

module.exports = { dijkstra, dijkstraWithPath, getPath };
