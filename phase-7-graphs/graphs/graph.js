/**
 * Graph Implementation
 * Supports both directed and undirected graphs
 * Adjacency List representation
 */

class Graph {
    constructor(isDirected = false) {
        this.adjacencyList = new Map();
        this.isDirected = isDirected;
    }

    // Add vertex
    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    // Add edge
    addEdge(v1, v2, weight = 1) {
        this.addVertex(v1);
        this.addVertex(v2);

        this.adjacencyList.get(v1).push({ node: v2, weight });

        if (!this.isDirected) {
            this.adjacencyList.get(v2).push({ node: v1, weight });
        }
    }

    // Remove edge
    removeEdge(v1, v2) {
        if (this.adjacencyList.has(v1)) {
            this.adjacencyList.set(
                v1,
                this.adjacencyList.get(v1).filter(v => v.node !== v2)
            );
        }

        if (!this.isDirected && this.adjacencyList.has(v2)) {
            this.adjacencyList.set(
                v2,
                this.adjacencyList.get(v2).filter(v => v.node !== v1)
            );
        }
    }

    // Remove vertex
    removeVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) return;

        // Remove all edges to this vertex
        for (let v of this.adjacencyList.keys()) {
            this.removeEdge(v, vertex);
        }

        this.adjacencyList.delete(vertex);
    }

    // Get neighbors
    getNeighbors(vertex) {
        return this.adjacencyList.get(vertex) || [];
    }

    // Check if edge exists
    hasEdge(v1, v2) {
        if (!this.adjacencyList.has(v1)) return false;
        return this.adjacencyList.get(v1).some(v => v.node === v2);
    }

    // Get all vertices
    getVertices() {
        return Array.from(this.adjacencyList.keys());
    }

    // Get vertex count
    getVertexCount() {
        return this.adjacencyList.size;
    }

    // Get edge count
    getEdgeCount() {
        let count = 0;
        for (let neighbors of this.adjacencyList.values()) {
            count += neighbors.length;
        }
        return this.isDirected ? count : count / 2;
    }

    // Display graph
    display() {
        for (let [vertex, neighbors] of this.adjacencyList) {
            const edges = neighbors.map(n => 
                `${n.node}(${n.weight})`
            ).join(', ');
            console.log(`${vertex} -> ${edges}`);
        }
    }

    // DFS - Depth First Search
    dfs(startVertex, callback) {
        const visited = new Set();
        const result = [];

        const dfsHelper = (vertex) => {
            visited.add(vertex);
            result.push(vertex);
            if (callback) callback(vertex);

            const neighbors = this.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.node)) {
                    dfsHelper(neighbor.node);
                }
            }
        };

        if (this.adjacencyList.has(startVertex)) {
            dfsHelper(startVertex);
        }

        return result;
    }

    // BFS - Breadth First Search
    bfs(startVertex, callback) {
        const visited = new Set();
        const queue = [startVertex];
        const result = [];

        visited.add(startVertex);

        while (queue.length > 0) {
            const vertex = queue.shift();
            result.push(vertex);
            if (callback) callback(vertex);

            const neighbors = this.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.node)) {
                    visited.add(neighbor.node);
                    queue.push(neighbor.node);
                }
            }
        }

        return result;
    }

    // Check if path exists between two vertices
    hasPath(start, end) {
        if (!this.adjacencyList.has(start)) return false;

        const visited = new Set();
        const queue = [start];
        visited.add(start);

        while (queue.length > 0) {
            const vertex = queue.shift();

            if (vertex === end) return true;

            const neighbors = this.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.node)) {
                    visited.add(neighbor.node);
                    queue.push(neighbor.node);
                }
            }
        }

        return false;
    }

    // Find shortest path (unweighted)
    shortestPath(start, end) {
        if (!this.adjacencyList.has(start)) return null;

        const visited = new Set();
        const queue = [[start]];
        visited.add(start);

        while (queue.length > 0) {
            const path = queue.shift();
            const vertex = path[path.length - 1];

            if (vertex === end) return path;

            const neighbors = this.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.node)) {
                    visited.add(neighbor.node);
                    queue.push([...path, neighbor.node]);
                }
            }
        }

        return null;
    }

    // Detect cycle in undirected graph
    hasCycleUndirected() {
        const visited = new Set();

        const dfs = (vertex, parent) => {
            visited.add(vertex);

            const neighbors = this.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.node)) {
                    if (dfs(neighbor.node, vertex)) return true;
                } else if (neighbor.node !== parent) {
                    return true;
                }
            }

            return false;
        };

        for (let vertex of this.adjacencyList.keys()) {
            if (!visited.has(vertex)) {
                if (dfs(vertex, null)) return true;
            }
        }

        return false;
    }

    // Detect cycle in directed graph
    hasCycleDirected() {
        const visited = new Set();
        const recStack = new Set();

        const dfs = (vertex) => {
            visited.add(vertex);
            recStack.add(vertex);

            const neighbors = this.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.node)) {
                    if (dfs(neighbor.node)) return true;
                } else if (recStack.has(neighbor.node)) {
                    return true;
                }
            }

            recStack.delete(vertex);
            return false;
        };

        for (let vertex of this.adjacencyList.keys()) {
            if (!visited.has(vertex)) {
                if (dfs(vertex)) return true;
            }
        }

        return false;
    }

    // Check if graph is connected
    isConnected() {
        if (this.adjacencyList.size === 0) return true;

        const startVertex = this.adjacencyList.keys().next().value;
        const visited = new Set();

        const dfs = (vertex) => {
            visited.add(vertex);
            const neighbors = this.getNeighbors(vertex);
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.node)) {
                    dfs(neighbor.node);
                }
            }
        };

        dfs(startVertex);

        return visited.size === this.adjacencyList.size;
    }
}

// Example usage
if (require.main === module) {
    console.log('=== Graph Implementation Demo ===\n');

    // Undirected graph
    const graph = new Graph();
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'D');
    graph.addEdge('D', 'E');

    console.log('Undirected Graph:');
    graph.display();

    console.log('\nDFS from A:', graph.dfs('A'));
    console.log('BFS from A:', graph.bfs('A'));

    console.log('\nShortest path A to E:', graph.shortestPath('A', 'E'));
    console.log('Has path A to E:', graph.hasPath('A', 'E'));
    console.log('Has cycle:', graph.hasCycleUndirected());
    console.log('Is connected:', graph.isConnected());

    // Directed graph
    console.log('\n=== Directed Graph ===');
    const dirGraph = new Graph(true);
    dirGraph.addEdge('A', 'B');
    dirGraph.addEdge('B', 'C');
    dirGraph.addEdge('C', 'A');
    dirGraph.addEdge('C', 'D');

    console.log('\nDirected Graph:');
    dirGraph.display();

    console.log('\nDFS from A:', dirGraph.dfs('A'));
    console.log('Has cycle:', dirGraph.hasCycleDirected());
}

module.exports = Graph;
