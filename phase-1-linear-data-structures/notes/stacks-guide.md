# Stacks - Complete Guide

## What is a Stack?

A stack is a linear data structure that follows the **LIFO (Last In, First Out)** principle. Think of it like a stack of plates - you can only add or remove from the top.

```
Top  →  [5]  ← Most recently added
        [4]
        [3]
        [2]
Bottom→ [1]  ← First element added
```

---

## Stack Operations

| Operation | Description | Time Complexity |
|-----------|-------------|-----------------|
| Push | Add element to top | O(1) |
| Pop | Remove element from top | O(1) |
| Peek/Top | View top element | O(1) |
| isEmpty | Check if stack is empty | O(1) |
| Size | Get number of elements | O(1) |

---

## Implementation

### Array-Based Stack

```javascript
class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }
  
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
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
  
  print() {
    console.log(this.items.toString());
  }
}
```

### Linked List-Based Stack

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.length = 0;
  }
  
  push(data) {
    const newNode = new Node(data);
    newNode.next = this.top;
    this.top = newNode;
    this.length++;
  }
  
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const popped = this.top.data;
    this.top = this.top.next;
    this.length--;
    return popped;
  }
  
  peek() {
    return this.isEmpty() ? null : this.top.data;
  }
  
  isEmpty() {
    return this.top === null;
  }
  
  size() {
    return this.length;
  }
}
```

---

## Common Stack Patterns

### Pattern 1: Parentheses/Brackets Matching

```javascript
// Valid parentheses
function isValid(s) {
  const stack = [];
  const pairs = {
    '(': ')',
    '[': ']',
    '{': '}'
  };
  
  for (let char of s) {
    if (char in pairs) {
      stack.push(char);  // Opening bracket
    } else {
      const last = stack.pop();
      if (pairs[last] !== char) {
        return false;  // Mismatch
      }
    }
  }
  
  return stack.length === 0;
}

// Examples:
// "()" → true
// "()[]{}" → true
// "(]" → false
// "([)]" → false
```

### Pattern 2: Next Greater/Smaller Element

```javascript
// Next greater element
function nextGreaterElement(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = [];  // Indices
  
  for (let i = 0; i < arr.length; i++) {
    while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
      const index = stack.pop();
      result[index] = arr[i];
    }
    stack.push(i);
  }
  
  return result;
}

// Example: [4, 5, 2, 25]
// Output:  [5, 25, 25, -1]

// Next smaller element
function nextSmallerElement(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = [];
  
  for (let i = arr.length - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] >= arr[i]) {
      stack.pop();
    }
    if (stack.length > 0) {
      result[i] = stack[stack.length - 1];
    }
    stack.push(arr[i]);
  }
  
  return result;
}
```

### Pattern 3: Monotonic Stack

```javascript
// Largest rectangle in histogram
function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  heights.push(0);  // Sentinel
  
  for (let i = 0; i < heights.length; i++) {
    while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  
  return maxArea;
}

// Daily temperatures
function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = [];
  
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevDay = stack.pop();
      result[prevDay] = i - prevDay;
    }
    stack.push(i);
  }
  
  return result;
}
```

### Pattern 4: Expression Evaluation

```javascript
// Postfix expression evaluation
function evaluatePostfix(expression) {
  const stack = [];
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.floor(a / b)
  };
  
  for (let token of expression.split(' ')) {
    if (token in operators) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(operators[token](a, b));
    } else {
      stack.push(Number(token));
    }
  }
  
  return stack.pop();
}

// Example: "2 3 1 * + 9 -" → ((2 + (3 * 1)) - 9) = -4

// Infix to postfix
function infixToPostfix(expression) {
  const output = [];
  const stack = [];
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
  const rightAssociative = { '^': true };
  
  for (let token of expression.split(' ')) {
    if (!isNaN(token)) {
      output.push(token);
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        output.push(stack.pop());
      }
      stack.pop();  // Remove '('
    } else {
      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== '(' &&
        (precedence[stack[stack.length - 1]] > precedence[token] ||
         (precedence[stack[stack.length - 1]] === precedence[token] && !rightAssociative[token]))
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  }
  
  while (stack.length > 0) {
    output.push(stack.pop());
  }
  
  return output.join(' ');
}
```

### Pattern 5: Min/Max Stack

```javascript
// Min stack - get minimum in O(1)
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  
  push(val) {
    this.stack.push(val);
    if (this.minStack.length === 0 || val <= this.getMin()) {
      this.minStack.push(val);
    }
  }
  
  pop() {
    if (this.stack.pop() === this.getMin()) {
      this.minStack.pop();
    }
  }
  
  top() {
    return this.stack[this.stack.length - 1];
  }
  
  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

// Max stack
class MaxStack {
  constructor() {
    this.stack = [];
    this.maxStack = [];
  }
  
  push(val) {
    this.stack.push(val);
    if (this.maxStack.length === 0 || val >= this.getMax()) {
      this.maxStack.push(val);
    }
  }
  
  pop() {
    if (this.stack.pop() === this.getMax()) {
      this.maxStack.pop();
    }
  }
  
  getMax() {
    return this.maxStack[this.maxStack.length - 1];
  }
}
```

### Pattern 6: Backtracking with Stack

```javascript
// Decode string
function decodeString(s) {
  const stack = [];
  
  for (let char of s) {
    if (char !== ']') {
      stack.push(char);
    } else {
      // Get the string to repeat
      let str = '';
      while (stack[stack.length - 1] !== '[') {
        str = stack.pop() + str;
      }
      stack.pop();  // Remove '['
      
      // Get the number
      let num = '';
      while (stack.length > 0 && !isNaN(stack[stack.length - 1])) {
        num = stack.pop() + num;
      }
      
      // Repeat and push back
      stack.push(str.repeat(Number(num)));
    }
  }
  
  return stack.join('');
}

// Example: "3[a2[c]]" → "accaccacc"

// Basic calculator
function calculate(s) {
  const stack = [];
  let num = 0;
  let sign = 1;
  let result = 0;
  
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    
    if (!isNaN(char) && char !== ' ') {
      num = num * 10 + Number(char);
    } else if (char === '+') {
      result += sign * num;
      sign = 1;
      num = 0;
    } else if (char === '-') {
      result += sign * num;
      sign = -1;
      num = 0;
    } else if (char === '(') {
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (char === ')') {
      result += sign * num;
      num = 0;
      result *= stack.pop();  // Sign before parenthesis
      result += stack.pop();   // Result before parenthesis
    }
  }
  
  return result + sign * num;
}
```

---

## Real-World Applications

1. **Function Call Stack**: Managing function calls in programs
2. **Undo/Redo**: Text editors, Photoshop
3. **Browser History**: Back/Forward buttons
4. **Expression Evaluation**: Calculators, compilers
5. **Syntax Parsing**: Checking balanced brackets in code
6. **Backtracking**: Maze solving, N-Queens
7. **DFS**: Depth-first search in graphs/trees
8. **Memory Management**: Stack memory allocation

---

## Common Problems

1. **Valid Parentheses**
2. **Min Stack**
3. **Evaluate Reverse Polish Notation**
4. **Daily Temperatures**
5. **Next Greater Element**
6. **Largest Rectangle in Histogram**
7. **Trapping Rain Water**
8. **Basic Calculator**
9. **Decode String**
10. **Remove K Digits**

---

## Stack vs Queue vs Array

| Operation | Stack | Queue | Array |
|-----------|-------|-------|-------|
| Add | Push (top) O(1) | Enqueue (rear) O(1) | Insert O(n) |
| Remove | Pop (top) O(1) | Dequeue (front) O(1) | Delete O(n) |
| Access | Top only O(1) | Front only O(1) | Any index O(1) |
| Order | LIFO | FIFO | Index-based |

---

## Tips & Tricks

1. **Use for LIFO operations**: Natural fit for last-in-first-out scenarios
2. **Monotonic stack**: Keep stack in increasing/decreasing order
3. **Pair with recursion**: Stack simulates recursion
4. **Sentinel values**: Add dummy elements to simplify edge cases
5. **Two stacks**: Can simulate queue, min/max operations
6. **Check empty**: Always check before pop/peek

---

## Common Mistakes

- ❌ Not checking if stack is empty before pop/peek
- ❌ Forgetting to handle edge cases (empty, single element)
- ❌ Stack overflow (infinite recursion or too many pushes)
- ❌ Modifying stack incorrectly in loops

---

**Practice**: Master stack patterns with 10-15 problems!
