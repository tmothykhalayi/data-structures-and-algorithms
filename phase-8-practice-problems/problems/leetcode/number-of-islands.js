/**
 * LeetCode 200: Number of Islands
 * Difficulty: Medium
 * Topics: DFS, BFS, Union-Find, Matrix
 * 
 * Problem:
 * Given an m x n 2D binary grid which represents a map of '1's (land)
 * and '0's (water), return the number of islands.
 * 
 * An island is surrounded by water and is formed by connecting adjacent
 * lands horizontally or vertically.
 * 
 * Example:
 * Input: grid = [
 *   ["1","1","0","0","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","1","0","0"],
 *   ["0","0","0","1","1"]
 * ]
 * Output: 3
 */

// Solution 1: DFS - O(m*n) time, O(m*n) space
function numIslandsDFS(grid) {
    if (!grid || grid.length === 0) return 0;

    const m = grid.length;
    const n = grid[0].length;
    let count = 0;

    function dfs(i, j) {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') {
            return;
        }

        grid[i][j] = '0'; // Mark as visited

        // Explore all 4 directions
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }

    return count;
}

// Solution 2: BFS - O(m*n) time, O(min(m,n)) space
function numIslandsBFS(grid) {
    if (!grid || grid.length === 0) return 0;

    const m = grid.length;
    const n = grid[0].length;
    let count = 0;

    function bfs(i, j) {
        const queue = [[i, j]];
        grid[i][j] = '0';

        while (queue.length > 0) {
            const [x, y] = queue.shift();

            const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;

                if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] === '1') {
                    grid[nx][ny] = '0';
                    queue.push([nx, ny]);
                }
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;
                bfs(i, j);
            }
        }
    }

    return count;
}

// Solution 3: Union-Find - O(m*n) time, O(m*n) space
class UnionFind {
    constructor(grid) {
        const m = grid.length;
        const n = grid[0].length;
        this.parent = [];
        this.rank = [];
        this.count = 0;

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === '1') {
                    const id = i * n + j;
                    this.parent[id] = id;
                    this.rank[id] = 0;
                    this.count++;
                }
            }
        }
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
            if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
            this.count--;
        }
    }

    getCount() {
        return this.count;
    }
}

function numIslandsUnionFind(grid) {
    if (!grid || grid.length === 0) return 0;

    const m = grid.length;
    const n = grid[0].length;
    const uf = new UnionFind(grid);

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                const id = i * n + j;

                // Check right neighbor
                if (j + 1 < n && grid[i][j + 1] === '1') {
                    uf.union(id, i * n + j + 1);
                }

                // Check bottom neighbor
                if (i + 1 < m && grid[i + 1][j] === '1') {
                    uf.union(id, (i + 1) * n + j);
                }
            }
        }
    }

    return uf.getCount();
}

// Test cases
if (require.main === module) {
    const testCases = [
        {
            grid: [
                ["1", "1", "0", "0", "0"],
                ["1", "1", "0", "0", "0"],
                ["0", "0", "1", "0", "0"],
                ["0", "0", "0", "1", "1"]
            ],
            expected: 3
        },
        {
            grid: [
                ["1", "1", "1", "1", "0"],
                ["1", "1", "0", "1", "0"],
                ["1", "1", "0", "0", "0"],
                ["0", "0", "0", "0", "0"]
            ],
            expected: 1
        },
        {
            grid: [
                ["1", "0", "1"],
                ["0", "1", "0"],
                ["1", "0", "1"]
            ],
            expected: 5
        }
    ];

    console.log('=== Number of Islands ===\n');

    testCases.forEach(({ grid, expected }, idx) => {
        // Create copies for each method
        const gridDFS = grid.map(row => [...row]);
        const gridBFS = grid.map(row => [...row]);
        const gridUF = grid.map(row => [...row]);

        console.log(`Test Case ${idx + 1}:`);
        console.log('Grid:');
        grid.forEach(row => console.log('  ' + row.join(' ')));

        const resultDFS = numIslandsDFS(gridDFS);
        const resultBFS = numIslandsBFS(gridBFS);
        const resultUF = numIslandsUnionFind(gridUF);

        console.log(`Expected: ${expected}`);
        console.log(`DFS Result: ${resultDFS} ${resultDFS === expected ? '✓' : '✗'}`);
        console.log(`BFS Result: ${resultBFS} ${resultBFS === expected ? '✓' : '✗'}`);
        console.log(`Union-Find: ${resultUF} ${resultUF === expected ? '✓' : '✗'}`);
        console.log();
    });
}

module.exports = {
    numIslandsDFS,
    numIslandsBFS,
    numIslandsUnionFind
};
