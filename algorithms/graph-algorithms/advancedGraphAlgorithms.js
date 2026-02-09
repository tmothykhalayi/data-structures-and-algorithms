/**
 * Advanced Graph Algorithms
 * - Dijkstra's Algorithm (Shortest Path)
 * - Bellman-Ford Algorithm (Shortest Path with negative weights)
 * - Floyd-Warshall Algorithm (All pairs shortest path)
 * - Prim's Algorithm (Minimum Spanning Tree)
 * - Kruskal's Algorithm (Minimum Spanning Tree)
 */

class MinPriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(item, priority) {
    this.heap.push({ item, priority });
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].priority >= this.heap[parentIndex].priority) break;
      
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      
      if (left < this.heap.length && this.heap[left].priority < this.heap[smallest].priority) {
        smallest = left;
      }
      if (right < this.heap.length && this.heap[right].priority < this.heap[smallest].priority) {
        smallest = right;
      }
      
      if (smallest === index) break;
      
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

class GraphAlgorithms {
  /**
   * Dijkstra's Algorithm - Shortest path from source to all vertices
   * Works only with non-negative weights
   * Time: O((V + E) log V) with priority queue
   * Space: O(V)
   */
  static dijkstra(graph, source) {
    const distances = new Map();
    const previous = new Map();
    const pq = new MinPriorityQueue();
    
    // Initialize
    for (let vertex of graph.keys()) {
      distances.set(vertex, vertex === source ? 0 : Infinity);
      previous.set(vertex, null);
    }
    
    pq.enqueue(source, 0);
    
    while (!pq.isEmpty()) {
      const { item: current } = pq.dequeue();
      
      if (!graph.has(current)) continue;
      
      for (let { vertex: neighbor, weight } of graph.get(current)) {
        const newDist = distances.get(current) + weight;
        
        if (newDist < distances.get(neighbor)) {
          distances.set(neighbor, newDist);
          previous.set(neighbor, current);
          pq.enqueue(neighbor, newDist);
        }
      }
    }
    
    return { distances, previous };
  }

  /**
   * Get shortest path from source to target using Dijkstra
   */
  static getShortestPath(graph, source, target) {
    const { distances, previous } = this.dijkstra(graph, source);
    
    if (distances.get(target) === Infinity) {
      return null; // No path exists
    }
    
    const path = [];
    let current = target;
    
    while (current !== null) {
      path.unshift(current);
      current = previous.get(current);
    }
    
    return { path, distance: distances.get(target) };
  }

  /**
   * Bellman-Ford Algorithm - Shortest path with negative weights
   * Can detect negative cycles
   * Time: O(V * E)
   * Space: O(V)
   */
  static bellmanFord(edges, vertices, source) {
    const distances = new Map();
    const previous = new Map();
    
    // Initialize
    for (let vertex of vertices) {
      distances.set(vertex, vertex === source ? 0 : Infinity);
      previous.set(vertex, null);
    }
    
    // Relax edges V-1 times
    for (let i = 0; i < vertices.length - 1; i++) {
      for (let [u, v, weight] of edges) {
        if (distances.get(u) !== Infinity && 
            distances.get(u) + weight < distances.get(v)) {
          distances.set(v, distances.get(u) + weight);
          previous.set(v, u);
        }
      }
    }
    
    // Check for negative cycles
    for (let [u, v, weight] of edges) {
      if (distances.get(u) !== Infinity && 
          distances.get(u) + weight < distances.get(v)) {
        return { hasNegativeCycle: true };
      }
    }
    
    return { distances, previous, hasNegativeCycle: false };
  }

  /**
   * Floyd-Warshall Algorithm - All pairs shortest path
   * Time: O(V³)
   * Space: O(V²)
   */
  static floydWarshall(vertices, edges) {
    const n = vertices.length;
    const dist = Array(n).fill(null).map(() => Array(n).fill(Infinity));
    
    const vertexIndex = new Map();
    vertices.forEach((v, i) => vertexIndex.set(v, i));
    
    // Initialize diagonal to 0
    for (let i = 0; i < n; i++) {
      dist[i][i] = 0;
    }
    
    // Initialize edges
    for (let [u, v, weight] of edges) {
      const i = vertexIndex.get(u);
      const j = vertexIndex.get(v);
      dist[i][j] = weight;
    }
    
    // Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }
    
    return { dist, vertices };
  }

  /**
   * Prim's Algorithm - Minimum Spanning Tree
   * Time: O((V + E) log V) with priority queue
   * Space: O(V)
   */
  static primMST(graph, startVertex) {
    const mst = [];
    const visited = new Set();
    const pq = new MinPriorityQueue();
    let totalWeight = 0;
    
    visited.add(startVertex);
    
    // Add all edges from start vertex
    for (let { vertex, weight } of graph.get(startVertex) || []) {
      pq.enqueue({ from: startVertex, to: vertex }, weight);
    }
    
    while (!pq.isEmpty() && visited.size < graph.size) {
      const { item: edge, priority: weight } = pq.dequeue();
      const { from, to } = edge;
      
      if (visited.has(to)) continue;
      
      visited.add(to);
      mst.push({ from, to, weight });
      totalWeight += weight;
      
      // Add edges from newly visited vertex
      for (let { vertex, weight: w } of graph.get(to) || []) {
        if (!visited.has(vertex)) {
          pq.enqueue({ from: to, to: vertex }, w);
        }
      }
    }
    
    return { mst, totalWeight };
  }

  /**
   * Kruskal's Algorithm - Minimum Spanning Tree using DSU
   * Time: O(E log E) for sorting
   * Space: O(V)
   */
  static kruskalMST(vertices, edges) {
    // Sort edges by weight
    const sortedEdges = [...edges].sort((a, b) => a[2] - b[2]);
    
    // DSU implementation
    const parent = new Map();
    const rank = new Map();
    
    const find = (x) => {
      if (!parent.has(x)) parent.set(x, x);
      if (parent.get(x) !== x) {
        parent.set(x, find(parent.get(x)));
      }
      return parent.get(x);
    };
    
    const union = (x, y) => {
      const rootX = find(x);
      const rootY = find(y);
      
      if (rootX === rootY) return false;
      
      const rankX = rank.get(rootX) || 0;
      const rankY = rank.get(rootY) || 0;
      
      if (rankX < rankY) {
        parent.set(rootX, rootY);
      } else if (rankX > rankY) {
        parent.set(rootY, rootX);
      } else {
        parent.set(rootY, rootX);
        rank.set(rootX, rankX + 1);
      }
      
      return true;
    };
    
    const mst = [];
    let totalWeight = 0;
    
    for (let [u, v, weight] of sortedEdges) {
      if (union(u, v)) {
        mst.push({ from: u, to: v, weight });
        totalWeight += weight;
        
        if (mst.length === vertices.length - 1) break;
      }
    }
    
    return { mst, totalWeight };
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GraphAlgorithms;
}

// Example usage and testing
if (require.main === module) {
  console.log('=== Dijkstra\'s Algorithm ===\n');
  
  const graph = new Map([
    ['A', [{ vertex: 'B', weight: 4 }, { vertex: 'C', weight: 2 }]],
    ['B', [{ vertex: 'A', weight: 4 }, { vertex: 'C', weight: 1 }, { vertex: 'D', weight: 5 }]],
    ['C', [{ vertex: 'A', weight: 2 }, { vertex: 'B', weight: 1 }, { vertex: 'D', weight: 8 }, { vertex: 'E', weight: 10 }]],
    ['D', [{ vertex: 'B', weight: 5 }, { vertex: 'C', weight: 8 }, { vertex: 'E', weight: 2 }]],
    ['E', [{ vertex: 'C', weight: 10 }, { vertex: 'D', weight: 2 }]]
  ]);
  
  const { distances: dijkstraDist } = GraphAlgorithms.dijkstra(graph, 'A');
  console.log('Shortest distances from A:');
  for (let [vertex, dist] of dijkstraDist) {
    console.log(`  ${vertex}: ${dist}`);
  }
  
  const pathResult = GraphAlgorithms.getShortestPath(graph, 'A', 'E');
  console.log(`\nShortest path from A to E: ${pathResult.path.join(' -> ')}`);
  console.log(`Distance: ${pathResult.distance}`);
  
  console.log('\n\n=== Bellman-Ford Algorithm ===\n');
  
  const vertices = ['A', 'B', 'C', 'D', 'E'];
  const edges = [
    ['A', 'B', 4],
    ['A', 'C', 2],
    ['B', 'C', 1],
    ['B', 'D', 5],
    ['C', 'D', 8],
    ['C', 'E', 10],
    ['D', 'E', 2]
  ];
  
  const bellmanResult = GraphAlgorithms.bellmanFord(edges, vertices, 'A');
  
  if (bellmanResult.hasNegativeCycle) {
    console.log('Graph contains negative cycle!');
  } else {
    console.log('Shortest distances from A:');
    for (let [vertex, dist] of bellmanResult.distances) {
      console.log(`  ${vertex}: ${dist}`);
    }
  }
  
  console.log('\n\n=== Floyd-Warshall Algorithm ===\n');
  
  const floydResult = GraphAlgorithms.floydWarshall(vertices, edges);
  console.log('All pairs shortest distances:');
  console.log('     ', floydResult.vertices.join('    '));
  floydResult.dist.forEach((row, i) => {
    const formattedRow = row.map(d => 
      d === Infinity ? '∞' : d.toString().padStart(4)
    ).join(' ');
    console.log(`${floydResult.vertices[i]}:   ${formattedRow}`);
  });
  
  console.log('\n\n=== Prim\'s MST ===\n');
  
  const { mst: primMST, totalWeight: primWeight } = GraphAlgorithms.primMST(graph, 'A');
  console.log('Minimum Spanning Tree (Prim):');
  primMST.forEach(edge => {
    console.log(`  ${edge.from} - ${edge.to} : ${edge.weight}`);
  });
  console.log(`Total weight: ${primWeight}`);
  
  console.log('\n\n=== Kruskal\'s MST ===\n');
  
  const { mst: kruskalMST, totalWeight: kruskalWeight } = GraphAlgorithms.kruskalMST(vertices, edges);
  console.log('Minimum Spanning Tree (Kruskal):');
  kruskalMST.forEach(edge => {
    console.log(`  ${edge.from} - ${edge.to} : ${edge.weight}`);
  });
  console.log(`Total weight: ${kruskalWeight}`);
  
  console.log('\n\n=== Negative Weight Example (Bellman-Ford) ===\n');
  
  const negativeEdges = [
    ['A', 'B', 4],
    ['A', 'C', 2],
    ['B', 'C', -3],
    ['C', 'D', 2],
    ['D', 'B', 1]
  ];
  
  const negVertices = ['A', 'B', 'C', 'D'];
  const negResult = GraphAlgorithms.bellmanFord(negativeEdges, negVertices, 'A');
  
  if (negResult.hasNegativeCycle) {
    console.log('Graph contains negative cycle!');
  } else {
    console.log('Shortest distances from A (with negative weights):');
    for (let [vertex, dist] of negResult.distances) {
      console.log(`  ${vertex}: ${dist}`);
    }
  }
}
