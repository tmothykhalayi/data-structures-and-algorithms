# Phase 1: Linear Data Structures

## Welcome to Linear Data Structures

Linear data structures organize data in a sequential manner where elements are arranged one after another. Understanding these fundamental structures is crucial for building more complex data structures and algorithms.

---

## What You'll Learn

### 1. **Arrays**
- Static vs dynamic arrays
- Array operations and time complexity
- Multi-dimensional arrays
- Common array patterns

### 2. **Linked Lists**
- Singly linked lists
- Doubly linked lists
- Circular linked lists
- When to use linked lists vs arrays

### 3. **Stacks**
- LIFO (Last In, First Out) principle
- Stack operations: push, pop, peek
- Applications: function calls, undo/redo, expression evaluation
- Array-based vs linked list-based implementation

### 4. **Queues**
- FIFO (First In, First Out) principle
- Queue operations: enqueue, dequeue, peek
- Circular queues
- Priority queues
- Applications: BFS, task scheduling, buffering

---

## Why Linear Data Structures Matter

Linear data structures are the building blocks of computer science:

1. **Foundation for Advanced Structures**: Understanding these helps with trees, graphs, and hash tables
2. **Interview Essentials**: Most coding interviews test these concepts
3. **Real-World Applications**: Used in operating systems, browsers, and applications
4. **Algorithm Implementation**: Many algorithms rely on stacks and queues

---

## Learning Objectives

By the end of this phase, you should be able to:

- ✅ Choose the right data structure for a problem
- ✅ Implement arrays, linked lists, stacks, and queues from scratch
- ✅ Analyze time and space complexity of operations
- ✅ Recognize when to use each structure
- ✅ Solve problems using these data structures

---

## Study Roadmap

### Week 1: Arrays
- Day 1-2: Array basics and operations
- Day 3-4: Two-pointer techniques
- Day 5-7: Sliding window problems

### Week 2: Linked Lists
- Day 1-3: Singly linked list implementation
- Day 4-5: Fast and slow pointer techniques
- Day 6-7: Linked list problems

### Week 3: Stacks
- Day 1-2: Stack implementation and operations
- Day 3-4: Stack-based problems
- Day 5-7: Advanced stack applications

### Week 4: Queues
- Day 1-2: Queue implementation
- Day 3-4: Priority queue
- Day 5-7: Queue-based algorithms

---

## Key Comparisons

### Array vs Linked List

| Feature | Array | Linked List |
|---------|-------|-------------|
| Access time | O(1) | O(n) |
| Insert at end | O(1)* | O(1) |
| Insert at beginning | O(n) | O(1) |
| Memory | Contiguous | Scattered |
| Size | Fixed (static) | Dynamic |
| Cache performance | Better | Worse |

*Amortized for dynamic arrays

### Stack vs Queue

| Feature | Stack | Queue |
|---------|-------|-------|
| Order | LIFO | FIFO |
| Add operation | Push | Enqueue |
| Remove operation | Pop | Dequeue |
| Common use | Function calls, undo | BFS, scheduling |

---

## Common Patterns

### For Arrays:
- Two pointers (opposite ends)
- Sliding window
- Prefix sum
- Kadane's algorithm

### For Linked Lists:
- Fast and slow pointers
- Reversal
- Merge operations
- Cycle detection

### For Stacks:
- Monotonic stack
- Expression evaluation
- Parenthesis matching
- Next greater element

### For Queues:
- Level-order traversal
- Sliding window maximum
- Task scheduling
- Cache implementation (LRU)

---

## Practice Strategy

1. **Understand the concept**: Read theory and examples
2. **Implement from scratch**: Write your own implementation
3. **Solve easy problems**: 3-5 problems per structure
4. **Solve medium problems**: 5-7 problems per structure
5. **Review and optimize**: Revisit solutions and improve

---

## Common Pitfalls to Avoid

### Arrays:
- ❌ Off-by-one errors in loops
- ❌ Not handling empty arrays
- ❌ Modifying array while iterating
- ❌ Assuming array is always sorted

### Linked Lists:
- ❌ Losing reference to head
- ❌ Not handling null pointers
- ❌ Creating infinite loops
- ❌ Memory leaks (not freeing nodes)

### Stacks:
- ❌ Stack overflow (too many pushes)
- ❌ Stack underflow (pop from empty stack)
- ❌ Not checking if stack is empty

### Queues:
- ❌ Queue overflow
- ❌ Not handling circular queue wrap-around
- ❌ Confusing front and rear pointers

---

## Resources in This Phase

### Implementation Files:
- **Arrays**: Basic operations and patterns
- **Linked Lists**: [singlyLinkedList.js](../linked-lists/singlyLinkedList.js)
- **Stacks**: [arrayStack.js](../stacks/arrayStack.js), [linkedlistStack.js](../stacks/linkedlistStack.js), [postfixCalc.js](../stacks/postfixCalc.js)
- **Queues**: [arrayQueue.js](../queues/arrayQueue.js), [linkedlistQueue.js](../queues/linkedlistQueue.js), [priorityQueue.js](../queues/priorityQueue.js)

### Study Notes:
- [Arrays Guide](arrays-guide.md) - Complete arrays reference
- [Linked Lists Guide](linked-lists-guide.md) - Everything about linked lists
- [Stacks Guide](stacks-guide.md) - Stack operations and applications
- [Queues Guide](queues-guide.md) - Queue variations and uses

---

## Interview Tips

### What Interviewers Look For:
1. **Understanding trade-offs**: Why choose one structure over another?
2. **Edge case handling**: Empty inputs, single elements, null pointers
3. **Complexity analysis**: Can you determine time and space complexity?
4. **Clean code**: Readable, maintainable implementations

### Common Interview Questions:
- Implement a data structure from scratch
- Reverse a linked list
- Valid parentheses (stack)
- Design a queue using stacks
- LRU Cache
- Sliding window maximum

---

## Next Steps

After mastering linear data structures:
1. Move to **Phase 2: Trees** (hierarchical structures)
2. Learn **Phase 3: Hashing** (constant-time lookups)
3. Apply knowledge to **Phase 4: Core Algorithms** (sorting, searching)

---

**Remember**: These structures are fundamental. Take time to truly understand them - everything else builds on this foundation!
