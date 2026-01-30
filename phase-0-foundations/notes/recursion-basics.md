# Recursion Basics

## What is Recursion?

Recursion is when a function calls itself to solve a smaller instance of the same problem.

**The key idea**: Break a big problem into smaller versions of the same problem.

---

## Anatomy of a Recursive Function

Every recursive function needs:

### 1. Base Case
The stopping condition that prevents infinite recursion.

### 2. Recursive Case
The part where the function calls itself with a smaller/simpler input.

### 3. Progress Toward Base Case
Each recursive call must get closer to the base case.

```javascript
function countdown(n) {
  // Base case: when to stop
  if (n <= 0) {
    console.log("Done!");
    return;
  }
  
  // Recursive case: do work and call again
  console.log(n);
  countdown(n - 1);  // Progress: n gets smaller
}

countdown(3);
// Output: 3, 2, 1, Done!
```

---

## How Recursion Works: The Call Stack

```javascript
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

factorial(3);
```

**Call Stack Visualization:**
```
factorial(3)
  ↓ needs factorial(2)
  factorial(2)
    ↓ needs factorial(1)
    factorial(1)
      ↓ needs factorial(0)
      factorial(0) → returns 1
      ↑
    factorial(1) → returns 1 * 1 = 1
    ↑
  factorial(2) → returns 2 * 1 = 2
  ↑
factorial(3) → returns 3 * 2 = 6
```

---

## Common Recursive Patterns

### Pattern 1: Linear Recursion
Each call makes one recursive call.

```javascript
// Sum of array
function sum(arr, index = 0) {
  if (index >= arr.length) return 0;
  return arr[index] + sum(arr, index + 1);
}

sum([1, 2, 3, 4]) // → 10
```

### Pattern 2: Binary Recursion
Each call makes two recursive calls.

```javascript
// Fibonacci
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

fib(5) // → 5 (0, 1, 1, 2, 3, 5)
```

### Pattern 3: Tail Recursion
The recursive call is the last operation.

```javascript
// Tail recursive factorial
function factorialTail(n, accumulator = 1) {
  if (n === 0) return accumulator;
  return factorialTail(n - 1, n * accumulator);
}

factorialTail(5) // → 120
```

---

## Recursion vs Iteration

### When to Use Recursion:
✅ Problem has a natural recursive structure (trees, graphs)
✅ Code is clearer and more readable
✅ Divide and conquer algorithms
✅ Backtracking problems

### When to Use Iteration:
✅ Simple loops are sufficient
✅ Need better performance
✅ Memory is constrained
✅ Avoiding stack overflow risk

**Example: Same problem, both approaches**

```javascript
// Iterative
function sumIterative(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

// Recursive
function sumRecursive(n) {
  if (n === 0) return 0;
  return n + sumRecursive(n - 1);
}

// Both return 15 for n=5
```

---

## Classic Recursion Problems

### 1. Factorial
```javascript
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120
```

### 2. Power
```javascript
function power(base, exponent) {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
}
// power(2, 3) = 2 * 2 * 2 = 8
```

### 3. Reverse String
```javascript
function reverse(str) {
  if (str.length <= 1) return str;
  return reverse(str.slice(1)) + str[0];
}
// reverse("hello") = "olleh"
```

### 4. Palindrome Check
```javascript
function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}
// isPalindrome("racecar") = true
```

### 5. Array Sum
```javascript
function arraySum(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + arraySum(arr.slice(1));
}
// arraySum([1, 2, 3, 4]) = 10
```

---

## Common Pitfalls

### ❌ Pitfall 1: No Base Case
```javascript
function infinite(n) {
  return infinite(n - 1);  // Stack overflow!
}
```

### ❌ Pitfall 2: Wrong Base Case
```javascript
function wrongBase(n) {
  if (n === 5) return 0;  // What if n never equals 5?
  return n + wrongBase(n - 1);
}
wrongBase(10);  // Works
wrongBase(3);   // Stack overflow!
```

### ❌ Pitfall 3: No Progress Toward Base
```javascript
function noProgress(n) {
  if (n === 0) return 0;
  return n + noProgress(n);  // n never changes!
}
```

### ✅ Correct Pattern
```javascript
function correct(n) {
  // Clear base case
  if (n <= 0) return 0;
  
  // Recursive case with progress
  return n + correct(n - 1);  // n gets smaller
}
```

---

## Optimizing Recursion

### Problem: Inefficient Fibonacci
```javascript
// O(2^n) - Very slow!
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
// fib(40) takes seconds!
```

### Solution 1: Memoization (Top-Down)
```javascript
// O(n) - Much faster!
function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}
// fib(40) is instant!
```

### Solution 2: Iteration (Bottom-Up)
```javascript
// O(n) time, O(1) space
function fibIterative(n) {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}
```

---

## Debugging Recursive Functions

### Technique 1: Add Print Statements
```javascript
function factorial(n, depth = 0) {
  const indent = '  '.repeat(depth);
  console.log(`${indent}factorial(${n})`);
  
  if (n === 0) {
    console.log(`${indent}→ returning 1`);
    return 1;
  }
  
  const result = n * factorial(n - 1, depth + 1);
  console.log(`${indent}→ returning ${result}`);
  return result;
}
```

### Technique 2: Trace Small Inputs
Always test with small values first:
- factorial(0)
- factorial(1)
- factorial(2)

---

## Practice Problems

Try these yourself:

1. **Sum of digits**: `sumDigits(1234) → 10`
2. **Count elements**: `count([1, 2, 3, 4]) → 4`
3. **Flatten array**: `flatten([1, [2, [3, 4]]]) → [1, 2, 3, 4]`
4. **Range**: `range(1, 5) → [1, 2, 3, 4, 5]`
5. **Binary search** (recursive version)

---

## Recursion Checklist

Before writing a recursive function:

- [ ] Can I identify the base case?
- [ ] Can I break the problem into a smaller version?
- [ ] Does each recursive call get closer to the base case?
- [ ] Is the solution clearer than iteration?
- [ ] Am I comfortable with the space complexity?

---

## Key Takeaways

1. **Every recursive function needs a base case**
2. **Recursion uses the call stack** (has space cost)
3. **Some problems are naturally recursive** (trees, graphs)
4. **Memoization can optimize recursive solutions**
5. **Practice makes recursion intuitive**

---

**Remember**: Recursion is a tool in your toolbox. Use it when it makes the solution clearer!
