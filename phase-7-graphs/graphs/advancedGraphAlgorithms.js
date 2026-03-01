/**
 * More Graph Algorithms
 * Bellman-Ford, Floyd-Warshall, Topological Sort
 */

// 1. Bellman-Ford Algorithm - Handles negative weights
// Time: O(V * E), Space: O(V)
function bellmanFord(graph, vertices, start) {
    const distances = {};
    const previous = {};

    // Initialize distances
    for (let vertex of vertices) {
        distances[vertex] = vertex === start ? 0 : Infinity;
        previous[vertex] = null;
    }

    // Relax edges V-1 times
    for (let i = 0; i < vertices.length - 1; i++) {
        for (let [vertex, neighbors] of graph.entries()) {
            for (let { node: neighbor, weight } of neighbors) {
                if (distances[vertex] !== Infinity &&
                    distances[vertex] + weight < distances[neighbor]) {
                    distances[neighbor] = distances[vertex] + weight;
                    previous[neighbor] = vertex;
                }
            }
        }
    }

    // Check for negative weight cycles
    for (let [vertex, neighbors] of graph.entries()) {
        for (let { node: neighbor, weight } of neighbors) {
            if (distances[vertex] !== Infinity &&
                distances[vertex] + weight < distances[neighbor]) {
                return { hasNegativeCycle: true, distances: null, previous: null };
            }
        }
    }

    return { hasNegativeCycle: false, distances, previous };
}

// 2. Floyd-Warshall Algorithm - All pairs shortest path
// Time: O(V³), Space: O(V²)
function floydWarshall(adjMatrix) {
    const n = adjMatrix.length;
    const dist = adjMatrix.map(row => [...row]);

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] !== Infinity && dist[k][j] !== Infinity &&
                    dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    // Check for negative cycles
    for (let i = 0; i < n; i++) {
        if (dist[i][i] < 0) {
            return { hasNegativeCycle: true, distances: null };
        }
    }

    return { hasNegativeCycle: false, distances: dist };
}

// 3. Topological Sort (DFS-based) - Time: O(V + E)
function topologicalSort(graph) {
    const visited = new Set();
    const stack = [];

    function dfs(vertex) {
        visited.add(vertex);

        const neighbors = graph.get(vertex) || [];
        for (let { node: neighbor } of neighbors) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }

        stack.push(vertex);
    }

    for (let vertex of graph.keys()) {
        if (!visited.has(vertex)) {
            dfs(vertex);
        }
    }

    return stack.reverse();
}

// 4. Kahn's Algorithm (BFS-based Topological Sort)
function kahn(graph) {
    const inDegree = new Map();
    const result = [];
    const queue = [];

    // Initialize in-degrees
    for (let vertex of graph.keys()) {
        inDegree.set(vertex, 0);
    }

    // Calculate in-degrees
    for (let neighbors of graph.values()) {
        for (let { node: neighbor } of neighbors) {
            inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
        }
    }

    // Add vertices with in-degree 0 to queue
    for (let [vertex, degree] of inDegree.entries()) {
        if (degree === 0) {
            queue.push(vertex);
        }
    }

    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);

        const neighbors = graph.get(vertex) || [];
        for (let { node: neighbor } of neighbors) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // Check if there's a cycle
    if (result.length !== graph.size) {
        return null; // Graph has cycle
    }

    return result;
}

// 5. Detect Cycle in Directed Graph (DFS with colors)
function hasCycleDirected(graph) {
    const WHITE = 0, GRAY = 1, BLACK = 2;
    const color = new Map();

    for (let vertex of graph.keys()) {
        color.set(vertex, WHITE);
    }

    function dfs(vertex) {
        color.set(vertex, GRAY);

        const neighbors = graph.get(vertex) || [];
        for (let { node: neighbor } of neighbors) {
            if (color.get(neighbor) === GRAY) {
                return true; // Back edge found - cycle exists
            }

            if (color.get(neighbor) === WHITE) {
                if (dfs(neighbor)) return true;
            }
        }

        color.set(vertex, BLACK);
        return false;
    }

    for (let vertex of graph.keys()) {
        if (color.get(vertex) === WHITE) {
            if (dfs(vertex)) return true;
        }
    }

    return false;
}

// Example usage
if (require.main === module) {
    console.log('=== Advanced Graph Algorithms ===\n');

    // Bellman-Ford example
    console.log('1. Bellman-Ford Algorithm:');
    const graph1 = new Map();
    graph1.set('A', [{ node: 'B', weight: 4 }, { node: 'C', weight: 2 }]);
    graph1.set('B', [{ node: 'C', weight: -3 }, { node: 'D', weight: 2 }]);
    graph1.set('C', [{ node: 'D', weight: 4 }]);
    graph1.set('D', []);

    const vertices = ['A', 'B', 'C', 'D'];
    const bf = bellmanFord(graph1, vertices, 'A');
    console.log('   Distances from A:', bf.distances);
    console.log('   Has negative cycle:', bf.hasNegativeCycle);

    // Floyd-Warshall example
    console.log('\n2. Floyd-Warshall Algorithm:');
    const INF = Infinity;
    const adjMatrix = [
        [0, 3, INF, 7],
        [8, 0, 2, INF],
        [5, INF, 0, 1],
        [2, INF, INF, 0]
    ];
    const fw = floydWarshall(adjMatrix);
    console.log('   All pairs shortest paths:');
    fw.distances.forEach((row, i) => {
        console.log(`   From ${i}:`, row.map(d => d === INF ? '∞' : d));
    });

    // Topological Sort example
    console.log('\n3. Topological Sort:');
    const dag = new Map();
    dag.set('A', [{ node: 'C' }, { node: 'D' }]);
    dag.set('B', [{ node: 'D' }]);
    dag.set('C', [{ node: 'E' }]);
    dag.set('D', [{ node: 'E' }]);
    dag.set('E', []);

    console.log('   DFS-based:', topologicalSort(dag));
    console.log("   Kahn's algorithm:", kahn(dag));

    // Cycle detection
    console.log('\n4. Cycle Detection:');
    const cyclic = new Map();
    cyclic.set('A', [{ node: 'B' }]);
    cyclic.set('B', [{ node: 'C' }]);
    cyclic.set('C', [{ node: 'A' }]);

    console.log('   Has cycle in cyclic graph:', hasCycleDirected(cyclic));
    console.log('   Has cycle in DAG:', hasCycleDirected(dag));
}

module.exports = {
    bellmanFord,
    floydWarshall,
    topologicalSort,
    kahn,
    hasCycleDirected
};
