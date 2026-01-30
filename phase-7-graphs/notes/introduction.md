# Phase 7: Graphs

## Welcome to Graph Algorithms

Graphs are versatile data structures that model relationships and connections. They're used everywhere: social networks, maps, web pages, dependencies, and more. Understanding graphs is crucial for advanced problem-solving.

---

## What You'll Learn

### 1. **Graph Fundamentals**
- Graph terminology (vertex, edge, path, cycle)
- Graph representations (adjacency matrix, adjacency list)
- Directed vs undirected graphs
- Weighted vs unweighted graphs

### 2. **Graph Traversals**
- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- Topological sort
- Cycle detection

### 3. **Shortest Path Algorithms**
- Dijkstra's algorithm
- Bellman-Ford algorithm
- Floyd-Warshall algorithm
- A* search (if time permits)

### 4. **Advanced Graph Algorithms**
- Minimum Spanning Tree (Kruskal's, Prim's)
- Union-Find (Disjoint Set)
- Strongly Connected Components
- Network flow (if time permits)

---

## Why Graphs Matter

Graphs are everywhere in real-world problems:

1. **Social Networks**: Friend connections, recommendations
2. **Maps & Navigation**: GPS, shortest routes
3. **Web**: Page rank, link analysis
4. **Dependencies**: Build systems, course prerequisites
5. **Networks**: Network routing, telecommunications
6. **AI**: State space search, game trees

---

## Graph Terminology

```
    A -------- B
    |         /|
    |       /  |
    |     /    |
    |   /      |
    | /        |
    C -------- D

Vertices (Nodes): A, B, C, D
Edges: A-B, A-C, B-C, B-D, C-D
Path: A → C → D
Cycle: A → B → C → A
Degree: Number of edges connected to a vertex
```

---

## Study Roadmap

### Week 1: Graph Basics
- Day 1-2: Graph representations
- Day 3-4: BFS implementation
- Day 5-6: DFS implementation
- Day 7: BFS/DFS problems

### Week 2: Graph Traversals
- Day 1-3: Topological sort
- Day 4-5: Cycle detection
- Day 6-7: Connected components

### Week 3: Shortest Paths
- Day 1-3: Dijkstra's algorithm
- Day 4-5: Bellman-Ford
- Day 6-7: Practice problems

### Week 4: Advanced Graphs
- Day 1-3: Minimum spanning tree
- Day 4-5: Union-Find
- Day 6-7: Advanced problems

---

## Graph Representations

### Adjacency Matrix: O(V²) space
```javascript
// For graph: 0-1, 0-2, 1-2
const matrix = [
  [0, 1, 1],  // 0 connects to 1, 2
  [1, 0, 1],  // 1 connects to 0, 2
  [1, 1, 0]   // 2 connects to 0, 1
];
```

### Adjacency List: O(V + E) space (preferred)
```javascript
const graph = {
  0: [1, 2],
  1: [0, 2],
  2: [0, 1]
};
```

---

## Common Graph Patterns

### 1. BFS (Level-by-Level)
- Shortest path in unweighted graphs
- Level-order traversal
- Connected components

### 2. DFS (Explore Deeply)
- Detect cycles
- Topological sort
- Path finding
- Connected components

### 3. Union-Find
- Dynamic connectivity
- Detect cycles in undirected graphs
- Minimum spanning tree (Kruskal's)

### 4. Shortest Path
- Single source (Dijkstra, Bellman-Ford)
- All pairs (Floyd-Warshall)
- Weighted graphs

---

## Algorithm Complexity Comparison

| Algorithm | Time | Space | Use Case |
|-----------|------|-------|----------|
| BFS | O(V + E) | O(V) | Shortest path (unweighted) |
| DFS | O(V + E) | O(V) | Cycle detection, topological sort |
| Dijkstra | O((V + E) log V) | O(V) | Shortest path (non-negative) |
| Bellman-Ford | O(VE) | O(V) | Shortest path (negative edges) |
| Floyd-Warshall | O(V³) | O(V²) | All pairs shortest path |
| Kruskal's MST | O(E log E) | O(V) | Minimum spanning tree |
| Prim's MST | O(E log V) | O(V) | Minimum spanning tree |

---

## Resources in This Phase

### Study Notes (to be created):
- [Graph Fundamentals Guide](graph-fundamentals.md)
- [BFS Guide](bfs-guide.md)
- [DFS Guide](dfs-guide.md)
- [Shortest Path Algorithms](shortest-path-guide.md)
- [MST Algorithms](mst-guide.md)
- [Union-Find Guide](union-find-guide.md)
- [Topological Sort Guide](topological-sort-guide.md)

---

## Interview Tips

**Most Common Graph Problems**:
1. Number of Islands (BFS/DFS)
2. Clone Graph
3. Course Schedule (Topological Sort)
4. Pacific Atlantic Water Flow
5. Network Delay Time (Dijkstra)
6. Accounts Merge (Union-Find)
7. Word Ladder (BFS)
8. Shortest Path in Binary Matrix
9. Minimum Spanning Tree
10. Alien Dictionary

**What Interviewers Look For**:
- Can you choose the right algorithm?
- Can you implement BFS and DFS?
- Do you handle visited nodes correctly?
- Can you represent the graph appropriately?

**Interview Strategy**:
1. Clarify graph structure (directed/undirected, weighted)
2. Choose representation (usually adjacency list)
3. Decide on BFS vs DFS
4. Handle visited tracking
5. Consider edge cases (disconnected, cycles)

---

## Common Mistakes

- ❌ Not tracking visited nodes (infinite loops)
- ❌ Wrong graph representation for the problem
- ❌ Forgetting about disconnected graphs
- ❌ Not considering directed vs undirected
- ❌ Incorrect queue/stack usage in BFS/DFS

---

## Practice Strategy

1. **Master BFS and DFS**: Implement from scratch 5+ times
2. **Learn representations**: Practice converting between formats
3. **Solve by pattern**:
   - BFS problems (10 problems)
   - DFS problems (10 problems)
   - Union-Find (5 problems)
   - Shortest path (5 problems)
   - MST (3 problems)
4. **Draw graphs**: Visualize on paper always
5. **Track visited**: Practice different tracking methods

**Recommended**: 35-40 graph problems total

---

## Difficulty Progression

1. **Easy** (8-10 problems): BFS/DFS basics, connected components
2. **Medium** (20-25 problems): Topological sort, shortest path
3. **Hard** (7-10 problems): Complex traversals, advanced algorithms

---

**Remember**: Graphs combine many concepts (recursion, queues, stacks, sets). Master the basics first!

---

**Next**: Move to Phase 8 (Practice Problems) to apply everything you've learned!
