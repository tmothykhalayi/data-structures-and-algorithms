# Linked Lists - Complete Guide

## What is a Linked List?

A linked list is a linear data structure where elements (nodes) are not stored in contiguous memory locations. Each node contains:
1. **Data**: The value to store
2. **Next**: A reference (pointer) to the next node

```
[10|•] -> [20|•] -> [30|•] -> [40|•] -> null
 data next  data next  data next  data next
```

---

## Types of Linked Lists

### 1. Singly Linked List
Each node points to the next node.

```
Head -> [1|•] -> [2|•] -> [3|•] -> null
```

### 2. Doubly Linked List
Each node has pointers to both next and previous nodes.

```
null <- [•|1|•] <-> [•|2|•] <-> [•|3|•] -> null
       prev data next
```

### 3. Circular Linked List
Last node points back to the first node.

```
     ┌─────────────────┐
     ↓                 │
    [1|•] -> [2|•] -> [3|•]
```

---

## Linked List vs Array

| Feature | Array | Linked List |
|---------|-------|-------------|
| Memory | Contiguous | Scattered |
| Size | Fixed (static) | Dynamic |
| Access | O(1) | O(n) |
| Insert at beginning | O(n) | O(1) |
| Insert at end | O(1)* | O(1)** |
| Delete from beginning | O(n) | O(1) |
| Memory overhead | Low | High (pointers) |
| Cache performance | Good | Poor |

*Amortized; **With tail pointer

---

## Node Structure

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Doubly linked list node
class DoublyNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}
```

---

## Basic Operations

### 1. Insert at Beginning - O(1)

```javascript
function insertAtBeginning(head, data) {
  const newNode = new Node(data);
  newNode.next = head;
  return newNode;  // New head
}

// Visual:
// Before: Head -> [1] -> [2] -> null
// After:  Head -> [0] -> [1] -> [2] -> null
```

### 2. Insert at End - O(n) without tail, O(1) with tail

```javascript
function insertAtEnd(head, data) {
  const newNode = new Node(data);
  
  if (!head) return newNode;
  
  let current = head;
  while (current.next) {
    current = current.next;
  }
  
  current.next = newNode;
  return head;
}
```

### 3. Insert at Position - O(n)

```javascript
function insertAt(head, data, position) {
  if (position === 0) {
    return insertAtBeginning(head, data);
  }
  
  const newNode = new Node(data);
  let current = head;
  
  for (let i = 0; i < position - 1 && current; i++) {
    current = current.next;
  }
  
  if (!current) return head;  // Position out of bounds
  
  newNode.next = current.next;
  current.next = newNode;
  return head;
}
```

### 4. Delete from Beginning - O(1)

```javascript
function deleteFromBeginning(head) {
  if (!head) return null;
  return head.next;
}
```

### 5. Delete from End - O(n)

```javascript
function deleteFromEnd(head) {
  if (!head || !head.next) return null;
  
  let current = head;
  while (current.next.next) {
    current = current.next;
  }
  
  current.next = null;
  return head;
}
```

### 6. Delete Specific Value - O(n)

```javascript
function deleteValue(head, value) {
  // If head needs to be deleted
  if (head && head.data === value) {
    return head.next;
  }
  
  let current = head;
  while (current && current.next) {
    if (current.next.data === value) {
      current.next = current.next.next;
      return head;
    }
    current = current.next;
  }
  
  return head;
}
```

### 7. Search - O(n)

```javascript
function search(head, value) {
  let current = head;
  let index = 0;
  
  while (current) {
    if (current.data === value) return index;
    current = current.next;
    index++;
  }
  
  return -1;
}
```

---

## Common Patterns

### Pattern 1: Fast and Slow Pointers (Floyd's Cycle Detection)

```javascript
// Detect cycle in linked list
function hasCycle(head) {
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) return true;
  }
  
  return false;
}

// Find middle of linked list
function findMiddle(head) {
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return slow;  // Middle node
}

// Find cycle start
function detectCycleStart(head) {
  let slow = head;
  let fast = head;
  
  // Detect cycle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) {
      // Found cycle, now find start
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;  // Cycle start
    }
  }
  
  return null;  // No cycle
}
```

### Pattern 2: Reversal

```javascript
// Reverse entire linked list
function reverse(head) {
  let prev = null;
  let current = head;
  
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev;  // New head
}

// Reverse in groups of k
function reverseKGroup(head, k) {
  let current = head;
  let count = 0;
  
  // Check if we have k nodes
  while (current && count < k) {
    current = current.next;
    count++;
  }
  
  if (count === k) {
    current = reverseKGroup(current, k);  // Reverse rest
    
    // Reverse first k nodes
    while (count > 0) {
      const next = head.next;
      head.next = current;
      current = head;
      head = next;
      count--;
    }
    
    head = current;
  }
  
  return head;
}

// Reverse between positions
function reverseBetween(head, left, right) {
  if (left === right) return head;
  
  const dummy = new Node(0);
  dummy.next = head;
  let prev = dummy;
  
  // Move to position before left
  for (let i = 1; i < left; i++) {
    prev = prev.next;
  }
  
  // Reverse the sublist
  let current = prev.next;
  for (let i = 0; i < right - left; i++) {
    const next = current.next;
    current.next = next.next;
    next.next = prev.next;
    prev.next = next;
  }
  
  return dummy.next;
}
```

### Pattern 3: Merge Operations

```javascript
// Merge two sorted linked lists
function mergeTwoLists(l1, l2) {
  const dummy = new Node(0);
  let current = dummy;
  
  while (l1 && l2) {
    if (l1.data <= l2.data) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  
  current.next = l1 || l2;
  return dummy.next;
}

// Merge k sorted lists
function mergeKLists(lists) {
  if (lists.length === 0) return null;
  if (lists.length === 1) return lists[0];
  
  while (lists.length > 1) {
    const mergedLists = [];
    
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      mergedLists.push(mergeTwoLists(l1, l2));
    }
    
    lists = mergedLists;
  }
  
  return lists[0];
}
```

### Pattern 4: Remove Nodes

```javascript
// Remove nth node from end
function removeNthFromEnd(head, n) {
  const dummy = new Node(0);
  dummy.next = head;
  let fast = dummy;
  let slow = dummy;
  
  // Move fast n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }
  
  // Move both until fast reaches end
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  
  // Remove nth node
  slow.next = slow.next.next;
  return dummy.next;
}

// Remove duplicates from sorted list
function deleteDuplicates(head) {
  let current = head;
  
  while (current && current.next) {
    if (current.data === current.next.data) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  
  return head;
}
```

### Pattern 5: Reorder and Partition

```javascript
// Reorder list: L0 → L1 → ... → Ln-1 → Ln
//            to: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...
function reorderList(head) {
  if (!head || !head.next) return;
  
  // Find middle
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // Reverse second half
  let second = reverse(slow.next);
  slow.next = null;
  
  // Merge two halves
  let first = head;
  while (second) {
    const temp1 = first.next;
    const temp2 = second.next;
    first.next = second;
    second.next = temp1;
    first = temp1;
    second = temp2;
  }
}

// Partition list around value x
function partition(head, x) {
  const beforeDummy = new Node(0);
  const afterDummy = new Node(0);
  let before = beforeDummy;
  let after = afterDummy;
  
  let current = head;
  while (current) {
    if (current.data < x) {
      before.next = current;
      before = before.next;
    } else {
      after.next = current;
      after = after.next;
    }
    current = current.next;
  }
  
  after.next = null;
  before.next = afterDummy.next;
  return beforeDummy.next;
}
```

---

## Advanced Techniques

### Copy List with Random Pointer

```javascript
function copyRandomList(head) {
  if (!head) return null;
  
  const map = new Map();
  let current = head;
  
  // First pass: create all nodes
  while (current) {
    map.set(current, new Node(current.data));
    current = current.next;
  }
  
  // Second pass: connect pointers
  current = head;
  while (current) {
    const copy = map.get(current);
    copy.next = map.get(current.next) || null;
    copy.random = map.get(current.random) || null;
    current = current.next;
  }
  
  return map.get(head);
}
```

### LRU Cache Using Doubly Linked List

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = new DoublyNode(0);
    this.tail = new DoublyNode(0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1;
    
    const node = this.cache.get(key);
    this.removeNode(node);
    this.addToHead(node);
    return node.value;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      this.removeNode(this.cache.get(key));
    }
    
    const node = new DoublyNode(key, value);
    this.cache.set(key, node);
    this.addToHead(node);
    
    if (this.cache.size > this.capacity) {
      const lru = this.tail.prev;
      this.removeNode(lru);
      this.cache.delete(lru.key);
    }
  }
  
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  
  addToHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }
}
```

---

## Common Problems

1. **Reverse Linked List**
2. **Detect Cycle**
3. **Merge Two Sorted Lists**
4. **Remove Nth Node From End**
5. **Find Middle of List**
6. **Palindrome Linked List**
7. **Intersection of Two Lists**
8. **Add Two Numbers**
9. **Flatten Multilevel List**
10. **Copy List with Random Pointer**

---

## Tips & Best Practices

1. **Always check for null**: Before accessing `head`, `head.next`
2. **Use dummy node**: Simplifies edge cases in many problems
3. **Draw it out**: Visualize pointer movements
4. **Keep track of previous**: Often need `prev` pointer
5. **Two pointer technique**: Very common in linked list problems
6. **Consider recursion**: Natural for linked lists
7. **Test edge cases**: Empty list, single node, two nodes

---

## Common Mistakes

- ❌ Losing reference to head
- ❌ Creating infinite loops
- ❌ Not handling null pointers
- ❌ Off-by-one errors in traversal
- ❌ Memory leaks (not freeing nodes in languages without GC)

---

**Practice**: Solve 15-20 linked list problems to master the patterns!
