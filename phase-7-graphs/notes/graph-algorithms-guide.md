# Graph Algorithms Comprehensive Guide

## What is a Graph?

A **graph** is a collection of nodes (vertices) connected by edges. Graphs model relationships and networks.

## Graph Representations

### 1. Adjacency Matrix
2D array where `matrix[i][j] = 1` if edge from i to j.

```javascript
// Example: 4 vertices
const graph = [
    [0, 1, 1, 0],  // 0 connected to 1, 2
    [1, 0, 0, 1],  // 1 connected to 0, 3
    [1, 0, 0, 1],  // 2 connected to 0, 3
    [0, 1, 1, 0]   // 3 connected to 1, 2
];
```

**Pros:** O(1) edge lookup
**Cons:** O(V²) space

---

### 2. Adjacency List
Array/map where each vertex stores list of neighbors.

```javascript
const graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3],
    3: [1, 2]
};

// Or using Map
const graph = new Map([
    [0, [1, 2]],
    [1, [0, 3]],
    [2, [0, 3]],
    [3, [1, 2]]
]);
```

**Pros:** O(V + E) space, efficient for sparse graphs
**Cons:** O(degree) edge lookup

---

### 3. Edge List
List of all edges as pairs.

```javascript
const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3]
];
```

---

## Graph Types

| Type | Description | Example |
|------|-------------|---------|
| **Directed** | Edges have direction | Twitter follows |
| **Undirected** | Edges bidirectional | Facebook friends |
| **Weighted** | Edges have costs | Road networks |
| **Cyclic** | Contains cycles | Most graphs |
| **Acyclic** | No cycles | DAG, Trees |
| **Connected** | Path between all vertices | Single network |
| **Disconnected** | Separate components | Multiple networks |

---

## Graph Traversal

### 1. Depth-First Search (DFS)

Explores as far as possible before backtracking.

**Recursive Implementation:**
```javascript
function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    console.log(start);
    
    for (let neighbor of graph[start]) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}
```

**Iterative Implementation (using stack):**
```javascript
function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [start];
    
    while (stack.length > 0) {
        const node = stack.pop();
        
        if (!visited.has(node)) {
            visited.add(node);
            console.log(node);
            
            // Push neighbors in reverse to maintain order
            for (let i = graph[node].length - 1; i >= 0; i--) {
                if (!visited.has(graph[node][i])) {
                    stack.push(graph[node][i]);
                }
            }
        }
    }
}
```

**Time:** O(V + E)
**Space:** O(V)

**Use Cases:**
- Path finding
- Cycle detection
- Topological sorting
- Connected components

---

### 2. Breadth-First Search (BFS)

Explores level by level (nearest nodes first).

```javascript
function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);
    
    while (queue.length > 0) {
        const node = queue.shift();
        console.log(node);
        
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}
```

**Time:** O(V + E)
**Space:** O(V)

**Use Cases:**
- Shortest path in unweighted graph
- Level-order processing
- Web crawling
- GPS navigation

---

## Classic Graph Algorithms

### 1. Find All Paths

```javascript
function findAllPaths(graph, start, end, path = [], paths = []) {
    path.push(start);
    
    if (start === end) {
        paths.push([...path]);
    } else {
        for (let neighbor of graph[start]) {
            if (!path.includes(neighbor)) {
                findAllPaths(graph, neighbor, end, path, paths);
            }
        }
    }
    
    path.pop();
    return paths;
}
```

---

### 2. Detect Cycle (Undirected Graph)

```javascript
function hasCycle(graph) {
    const visited = new Set();
    
    function dfs(node, parent) {
        visited.add(node);
        
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor, node)) return true;
            } else if (neighbor !== parent) {
                return true; // Back edge = cycle
            }
        }
        
        return false;
    }
    
    for (let node in graph) {
        if (!visited.has(node)) {
            if (dfs(node, null)) return true;
        }
    }
    
    return false;
}
```

---

### 3. Detect Cycle (Directed Graph)

```javascript
function hasCycleDirected(graph) {
    const visited = new Set();
    const recStack = new Set();
    
    function dfs(node) {
        visited.add(node);
        recStack.add(node);
        
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor)) return true;
            } else if (recStack.has(neighbor)) {
                return true; // Back edge in recursion stack
            }
        }
        
        recStack.delete(node);
        return false;
    }
    
    for (let node in graph) {
        if (!visited.has(node)) {
            if (dfs(node)) return true;
        }
    }
    
    return false;
}
```

---

### 4. Topological Sort (DAG)

Linear ordering of vertices where u comes before v for every edge u→v.

```javascript
function topologicalSort(graph) {
    const visited = new Set();
    const stack = [];
    
    function dfs(node) {
        visited.add(node);
        
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
        
        stack.push(node); // Add to stack after visiting all neighbors
    }
    
    for (let node in graph) {
        if (!visited.has(node)) {
            dfs(node);
        }
    }
    
    return stack.reverse();
}
```

**Alternative: Kahn's Algorithm (BFS-based)**
```javascript
function topologicalSortKahn(graph) {
    const inDegree = {};
    const result = [];
    
    // Calculate in-degrees
    for (let node in graph) {
        inDegree[node] = inDegree[node] || 0;
        for (let neighbor of graph[node]) {
            inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
        }
    }
    
    // Find all nodes with in-degree 0
    const queue = [];
    for (let node in inDegree) {
        if (inDegree[node] === 0) {
            queue.push(node);
        }
    }
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        for (let neighbor of graph[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return result.length === Object.keys(graph).length ? result : null;
}
```

**Use Cases:**
- Task scheduling
- Course prerequisites
- Build systems

---

### 5. Shortest Path (Unweighted) - BFS

```javascript
function shortestPath(graph, start, end) {
    const queue = [[start, [start]]];
    const visited = new Set([start]);
    
    while (queue.length > 0) {
        const [node, path] = queue.shift();
        
        if (node === end) {
            return path;
        }
        
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, [...path, neighbor]]);
            }
        }
    }
    
    return null; // No path found
}
```

---

### 6. Dijkstra's Algorithm (Shortest Path - Weighted)

```javascript
function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const pq = [[0, start]]; // [distance, node]
    
    // Initialize distances
    for (let node in graph) {
        distances[node] = Infinity;
    }
    distances[start] = 0;
    
    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        const [currentDist, node] = pq.shift();
        
        if (visited.has(node)) continue;
        visited.add(node);
        
        for (let [neighbor, weight] of graph[node]) {
            const distance = currentDist + weight;
            
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                pq.push([distance, neighbor]);
            }
        }
    }
    
    return distances;
}

// Graph format for weighted graph
const weightedGraph = {
    A: [['B', 4], ['C', 2]],
    B: [['A', 4], ['C', 1], ['D', 5]],
    C: [['A', 2], ['B', 1], ['D', 8]],
    D: [['B', 5], ['C', 8]]
};
```

**Time:** O((V + E) log V) with priority queue
**Space:** O(V)

**Note:** Dijkstra doesn't work with negative weights. Use Bellman-Ford instead.

---

### 7. Bellman-Ford Algorithm

Handles negative weights, detects negative cycles.

```javascript
function bellmanFord(graph, edges, start) {
    const distances = {};
    
    // Initialize
    for (let node in graph) {
        distances[node] = Infinity;
    }
    distances[start] = 0;
    
    // Relax edges V-1 times
    const V = Object.keys(graph).length;
    for (let i = 0; i < V - 1; i++) {
        for (let [u, v, weight] of edges) {
            if (distances[u] + weight < distances[v]) {
                distances[v] = distances[u] + weight;
            }
        }
    }
    
    // Check for negative cycles
    for (let [u, v, weight] of edges) {
        if (distances[u] + weight < distances[v]) {
            return null; // Negative cycle detected
        }
    }
    
    return distances;
}
```

**Time:** O(V × E)
**Space:** O(V)

---

### 8. Floyd-Warshall (All Pairs Shortest Path)

```javascript
function floydWarshall(graph) {
    const V = graph.length;
    const dist = Array(V).fill().map((_, i) => [...graph[i]]);
    
    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    
    return dist;
}
```

**Time:** O(V³)
**Space:** O(V²)

---

### 9. Minimum Spanning Tree - Prim's Algorithm

```javascript
function primMST(graph, start) {
    const visited = new Set([start]);
    const mst = [];
    const edges = [];
    
    // Add all edges from start
    for (let [neighbor, weight] of graph[start]) {
        edges.push([weight, start, neighbor]);
    }
    
    while (visited.size < Object.keys(graph).length) {
        edges.sort((a, b) => a[0] - b[0]);
        const [weight, u, v] = edges.shift();
        
        if (visited.has(v)) continue;
        
        visited.add(v);
        mst.push([u, v, weight]);
        
        // Add new edges
        for (let [neighbor, w] of graph[v]) {
            if (!visited.has(neighbor)) {
                edges.push([w, v, neighbor]);
            }
        }
    }
    
    return mst;
}
```

---

### 10. Union-Find (Disjoint Set)

Efficiently track connected components.

```javascript
class UnionFind {
    constructor(size) {
        this.parent = Array(size).fill().map((_, i) => i);
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
    
    connected(x, y) {
        return this.find(x) === this.find(y);
    }
}
```

**Operations:** Nearly O(1) amortized

---

## Graph Algorithm Comparison

| Algorithm | Problem | Time | Space | Notes |
|-----------|---------|------|-------|-------|
| DFS | Traversal | O(V+E) | O(V) | Stack-based |
| BFS | Shortest path (unweighted) | O(V+E) | O(V) | Queue-based |
| Dijkstra | Shortest path (weighted, non-negative) | O((V+E)logV) | O(V) | Greedy |
| Bellman-Ford | Shortest path (with negative weights) | O(V×E) | O(V) | Can detect negative cycles |
| Floyd-Warshall | All pairs shortest path | O(V³) | O(V²) | DP-based |
| Prim's | Minimum spanning tree | O((V+E)logV) | O(V) | Greedy |
| Kruskal's | Minimum spanning tree | O(ElogE) | O(V) | Uses Union-Find |

---

## Practice Problems

**Beginner:**
1. Number of Islands (LeetCode 200)
2. Clone Graph (LeetCode 133)
3. Course Schedule (LeetCode 207)

**Intermediate:**
4. Network Delay Time (LeetCode 743)
5. Cheapest Flights Within K Stops (LeetCode 787)
6. Word Ladder (LeetCode 127)

**Advanced:**
7. Alien Dictionary (LeetCode 269)
8. Critical Connections (LeetCode 1192)
9. Minimum Cost to Connect All Points (LeetCode 1584)

---

## Key Takeaways

✅ Choose adjacency list for sparse graphs, matrix for dense
✅ DFS for path finding, cycles, topological sort
✅ BFS for shortest path in unweighted graphs
✅ Dijkstra for weighted graphs (non-negative)
✅ Union-Find for connected components
✅ Always track visited nodes to avoid cycles
✅ Many graph problems reduce to DFS/BFS with modifications

Master graphs - they model real-world networks!
