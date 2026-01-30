# Queues - Complete Guide

## What is a Queue?

A queue is a linear data structure that follows the **FIFO (First In, First Out)** principle. Think of it like a line at a store - first person in line gets served first.

```
Front → [1] [2] [3] [4] [5] ← Rear
        ↑               ↑
    Dequeue here    Enqueue here
```

---

## Queue Operations

| Operation | Description | Time Complexity |
|-----------|-------------|-----------------|
| Enqueue | Add element to rear | O(1) |
| Dequeue | Remove element from front | O(1) |
| Peek/Front | View front element | O(1) |
| isEmpty | Check if queue is empty | O(1) |
| Size | Get number of elements | O(1) |

---

## Types of Queues

### 1. Simple Queue (Linear Queue)
Basic FIFO structure.

### 2. Circular Queue
Last position connects back to first position.

### 3. Priority Queue
Elements have priorities; highest priority dequeued first.

### 4. Deque (Double-Ended Queue)
Can add/remove from both ends.

---

## Implementation

### Array-Based Queue

```javascript
class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    this.items.push(element);
  }
  
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();  // O(n) - not ideal
  }
  
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
  
  clear() {
    this.items = [];
  }
}
```

### Optimized Array-Based Queue (Circular)

```javascript
class CircularQueue {
  constructor(capacity) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.front = 0;
    this.rear = -1;
    this.length = 0;
  }
  
  enqueue(element) {
    if (this.isFull()) {
      return false;
    }
    this.rear = (this.rear + 1) % this.capacity;
    this.items[this.rear] = element;
    this.length++;
    return true;
  }
  
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const item = this.items[this.front];
    this.front = (this.front + 1) % this.capacity;
    this.length--;
    return item;
  }
  
  peek() {
    return this.isEmpty() ? null : this.items[this.front];
  }
  
  isEmpty() {
    return this.length === 0;
  }
  
  isFull() {
    return this.length === this.capacity;
  }
  
  size() {
    return this.length;
  }
}
```

### Linked List-Based Queue

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }
  
  enqueue(data) {
    const newNode = new Node(data);
    
    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    
    this.length++;
  }
  
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    
    const dequeued = this.front.data;
    this.front = this.front.next;
    
    if (!this.front) {
      this.rear = null;
    }
    
    this.length--;
    return dequeued;
  }
  
  peek() {
    return this.isEmpty() ? null : this.front.data;
  }
  
  isEmpty() {
    return this.front === null;
  }
  
  size() {
    return this.length;
  }
}
```

---

## Priority Queue

Elements with higher priority are dequeued first.

### Using Array (Simple)

```javascript
class PriorityQueue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element, priority) {
    const queueElement = { element, priority };
    let added = false;
    
    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    
    if (!added) {
      this.items.push(queueElement);
    }
  }
  
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift().element;
  }
  
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0].element;
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}
```

### Using Min Heap (Efficient)

```javascript
class PriorityQueue {
  constructor() {
    this.heap = [];
  }
  
  enqueue(element, priority) {
    this.heap.push({ element, priority });
    this.bubbleUp();
  }
  
  dequeue() {
    if (this.isEmpty()) return null;
    
    const min = this.heap[0];
    const end = this.heap.pop();
    
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown();
    }
    
    return min.element;
  }
  
  bubbleUp() {
    let index = this.heap.length - 1;
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].priority >= this.heap[parentIndex].priority) break;
      
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }
  
  sinkDown() {
    let index = 0;
    const length = this.heap.length;
    
    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;
      
      if (leftChild < length && this.heap[leftChild].priority < this.heap[smallest].priority) {
        smallest = leftChild;
      }
      
      if (rightChild < length && this.heap[rightChild].priority < this.heap[smallest].priority) {
        smallest = rightChild;
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
```

---

## Deque (Double-Ended Queue)

Can add/remove from both ends.

```javascript
class Deque {
  constructor() {
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }
  
  addFront(element) {
    this.front--;
    this.items[this.front] = element;
  }
  
  addRear(element) {
    this.items[this.rear] = element;
    this.rear++;
  }
  
  removeFront() {
    if (this.isEmpty()) return null;
    
    const item = this.items[this.front];
    delete this.items[this.front];
    this.front++;
    return item;
  }
  
  removeRear() {
    if (this.isEmpty()) return null;
    
    this.rear--;
    const item = this.items[this.rear];
    delete this.items[this.rear];
    return item;
  }
  
  peekFront() {
    return this.isEmpty() ? null : this.items[this.front];
  }
  
  peekRear() {
    return this.isEmpty() ? null : this.items[this.rear - 1];
  }
  
  isEmpty() {
    return this.rear - this.front === 0;
  }
  
  size() {
    return this.rear - this.front;
  }
}
```

---

## Common Queue Patterns

### Pattern 1: Level-Order Traversal (BFS)

```javascript
// Tree level-order traversal
function levelOrder(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(level);
  }
  
  return result;
}

// Graph BFS
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  
  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node);  // Process node
    
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```

### Pattern 2: Sliding Window with Queue

```javascript
// Sliding window maximum
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = [];  // Stores indices
  
  for (let i = 0; i < nums.length; i++) {
    // Remove indices outside window
    while (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }
    
    // Remove smaller elements
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    
    deque.push(i);
    
    // Add to result after first window
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  
  return result;
}
```

### Pattern 3: Queue Using Stacks

```javascript
class QueueUsingStacks {
  constructor() {
    this.stack1 = [];  // For enqueue
    this.stack2 = [];  // For dequeue
  }
  
  enqueue(element) {
    this.stack1.push(element);
  }
  
  dequeue() {
    if (this.stack2.length === 0) {
      // Transfer from stack1 to stack2
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    
    return this.stack2.pop();
  }
  
  peek() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    
    return this.stack2[this.stack2.length - 1];
  }
  
  isEmpty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}
```

### Pattern 4: Recent Counter

```javascript
class RecentCounter {
  constructor() {
    this.queue = [];
  }
  
  ping(t) {
    this.queue.push(t);
    
    // Remove requests older than 3000ms
    while (this.queue[0] < t - 3000) {
      this.queue.shift();
    }
    
    return this.queue.length;
  }
}
```

---

## Real-World Applications

1. **Task Scheduling**: OS process scheduling, print queue
2. **BFS Traversal**: Finding shortest path, level-order traversal
3. **Request Handling**: Server request queues, message queues
4. **Buffering**: IO buffers, streaming data
5. **Cache**: LRU cache using queue
6. **Call Center**: Customer service queues
7. **Traffic Systems**: Traffic light management
8. **Resource Management**: Thread pools, connection pools

---

## Common Problems

1. **Implement Queue using Stacks**
2. **Design Circular Queue**
3. **Sliding Window Maximum**
4. **Number of Recent Calls**
5. **Task Scheduler**
6. **Rotting Oranges** (BFS)
7. **Walls and Gates** (BFS)
8. **Design Hit Counter**
9. **Moving Average from Data Stream**
10. **Binary Tree Level Order Traversal**

---

## Queue Variations Comparison

| Type | Add | Remove | Use Case |
|------|-----|--------|----------|
| Simple Queue | Rear O(1) | Front O(1) | FIFO tasks |
| Circular Queue | Rear O(1) | Front O(1) | Fixed buffer |
| Priority Queue | O(log n) | O(log n) | Scheduling |
| Deque | Both ends O(1) | Both ends O(1) | Sliding window |

---

## Tips & Tricks

1. **Use for FIFO operations**: Natural fit for first-in-first-out scenarios
2. **Circular queue**: Efficient use of fixed-size arrays
3. **Deque for sliding window**: Flexible window operations
4. **BFS with queue**: Level-by-level traversal
5. **Priority queue for scheduling**: Task prioritization
6. **Check empty**: Always verify before dequeue

---

## Common Mistakes

- ❌ Not handling empty queue on dequeue
- ❌ Forgetting to update front/rear pointers
- ❌ Not implementing circular properly (overflow issues)
- ❌ Using shift() on arrays (O(n) operation)
- ❌ Confusing queue with stack (FIFO vs LIFO)

---

**Practice**: Master queue operations and BFS with 10-15 problems!
