# Debugging and Testing Strategies

Master the art of finding and fixing bugs in your code.

---

## Debugging Mindset

**Rule #1:** The computer is always right. If there's a bug, it's in your code, not the compiler.

**Rule #2:** Don't guess. Use systematic approaches to find bugs.

**Rule #3:** Fix the cause, not the symptom.

---

## Systematic Debugging Process

### Step 1: Reproduce the Bug
- Can you consistently make it happen?
- What are the exact steps?
- What's the minimal input that causes it?

### Step 2: Isolate the Problem
- Narrow down where the bug is
- Use binary search: comment out half the code
- Check intermediate values

### Step 3: Understand the Bug
- What did you expect to happen?
- What actually happened?
- Why is there a difference?

### Step 4: Fix and Verify
- Fix the root cause
- Test the fix
- Make sure you didn't break anything else

---

## Debugging Techniques

### 1. Print Debugging (Console.log)

The simplest and often most effective technique.

```javascript
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    // Debug prints
    console.log(`left: ${left}, right: ${right}, mid: ${mid}`);
    console.log(`arr[mid]: ${arr[mid]}, target: ${target}`);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}
```

**Tips:**
- Print variable values at critical points
- Print before and after operations
- Use descriptive messages
- Remove or comment out when done

---

### 2. Use a Debugger

Learn to use your IDE's debugger:
- **Breakpoints:** Pause execution at specific lines
- **Step Over:** Execute current line, move to next
- **Step Into:** Enter function calls
- **Step Out:** Exit current function
- **Watch Variables:** Monitor specific values
- **Call Stack:** See function call history

---

### 3. Rubber Duck Debugging

Explain your code line-by-line to a rubber duck (or anyone).

Often, articulating the problem reveals the solution!

---

### 4. Binary Search Debugging

When you have a large codebase:

1. Comment out half the code
2. Does the bug still occur?
   - Yes → Bug is in the remaining half
   - No → Bug is in the commented half
3. Repeat until you find the problematic section

---

### 5. Add Assertions

Verify assumptions in your code:

```javascript
function divide(a, b) {
  console.assert(b !== 0, "Division by zero!");
  return a / b;
}

function binarySearch(arr, target) {
  console.assert(arr.length > 0, "Empty array!");
  console.assert(isSorted(arr), "Array must be sorted!");
  // ... rest of implementation
}
```

---

### 6. Check Edge Cases

Common sources of bugs:

```javascript
// ❌ Doesn't handle edge cases
function getFirst(arr) {
  return arr[0];  // What if arr is empty?
}

// ✅ Handles edge cases
function getFirst(arr) {
  if (!arr || arr.length === 0) {
    return null;
  }
  return arr[0];
}
```

**Common Edge Cases:**
- Empty input ([], "", null, undefined)
- Single element
- Two elements
- Duplicates
- Negative numbers
- Very large numbers
- Special characters

---

## Common Bug Patterns

### Off-by-One Errors

```javascript
// ❌ Missing last element
for (let i = 0; i < arr.length - 1; i++) {
  // Doesn't process arr[arr.length - 1]
}

// ✅ Correct
for (let i = 0; i < arr.length; i++) {
  // Processes all elements
}

// ❌ Index out of bounds
for (let i = 0; i <= arr.length; i++) {
  // i goes from 0 to arr.length (one too far!)
}

// ✅ Correct
for (let i = 0; i < arr.length; i++) {
  // i goes from 0 to arr.length - 1
}
```

---

### Infinite Loops

```javascript
// ❌ Infinite loop
let i = 0;
while (i < 10) {
  console.log(i);
  // Forgot to increment i!
}

// ✅ Correct
let i = 0;
while (i < 10) {
  console.log(i);
  i++;
}
```

**Recursion Infinite Loop:**
```javascript
// ❌ No base case
function countdown(n) {
  console.log(n);
  countdown(n - 1);  // Never stops!
}

// ✅ With base case
function countdown(n) {
  if (n <= 0) return;  // Base case
  console.log(n);
  countdown(n - 1);
}
```

---

### Reference vs Value

```javascript
// Arrays and objects are passed by reference!
function modifyArray(arr) {
  arr.push(4);  // Modifies original array!
}

const myArr = [1, 2, 3];
modifyArray(myArr);
console.log(myArr);  // [1, 2, 3, 4] - original changed!

// To avoid: create a copy
function modifyArray(arr) {
  const copy = [...arr];  // Create copy
  copy.push(4);
  return copy;
}
```

---

### Integer Division

```javascript
// ❌ Unexpected float result
const mid = (left + right) / 2;  // Could be 4.5

// ✅ Integer division
const mid = Math.floor((left + right) / 2);  // Always integer
```

---

### Comparison Issues

```javascript
// ❌ Comparing objects/arrays
[1, 2, 3] === [1, 2, 3]  // false! (different references)

// ✅ Compare contents
JSON.stringify([1, 2, 3]) === JSON.stringify([1, 2, 3])  // true

// ❌ Type coercion
"5" == 5  // true (types converted)

// ✅ Strict equality
"5" === 5  // false (different types)
```

---

## Testing Strategies

### 1. Test Small Inputs First

```javascript
function sum(arr) {
  let total = 0;
  for (let num of arr) {
    total += num;
  }
  return total;
}

// Test progression:
console.log(sum([]));           // Edge: empty → 0
console.log(sum([5]));          // Edge: single → 5
console.log(sum([1, 2]));       // Simple → 3
console.log(sum([1, 2, 3, 4])); // Normal → 10
console.log(sum([-1, 1]));      // Edge: negatives → 0
```

---

### 2. Test Edge Cases

**For Arrays/Strings:**
- Empty: `[]`, `""`
- Single element: `[1]`, `"a"`
- Two elements: `[1, 2]`, `"ab"`
- All same: `[1, 1, 1]`
- Sorted: `[1, 2, 3]`
- Reverse sorted: `[3, 2, 1]`
- Duplicates: `[1, 2, 2, 3]`

**For Numbers:**
- Zero: `0`
- Negative: `-5`
- Large: `1000000`
- Decimal: `3.14`

**For Linked Lists:**
- Empty list
- Single node
- Two nodes
- Cycle (if applicable)

---

### 3. Write Test Cases

```javascript
function testBinarySearch() {
  // Test 1: Element exists
  console.assert(binarySearch([1, 2, 3, 4, 5], 3) === 2, "Test 1 failed");
  
  // Test 2: Element doesn't exist
  console.assert(binarySearch([1, 2, 3, 4, 5], 6) === -1, "Test 2 failed");
  
  // Test 3: Empty array
  console.assert(binarySearch([], 1) === -1, "Test 3 failed");
  
  // Test 4: Single element (found)
  console.assert(binarySearch([1], 1) === 0, "Test 4 failed");
  
  // Test 5: Single element (not found)
  console.assert(binarySearch([1], 2) === -1, "Test 5 failed");
  
  // Test 6: First element
  console.assert(binarySearch([1, 2, 3], 1) === 0, "Test 6 failed");
  
  // Test 7: Last element
  console.assert(binarySearch([1, 2, 3], 3) === 2, "Test 7 failed");
  
  console.log("All tests passed!");
}

testBinarySearch();
```

---

### 4. Use Visualization

Draw out what's happening:

```
Array: [1, 2, 3, 4, 5], target: 3

Step 1: left=0, right=4, mid=2
        [1, 2, 3, 4, 5]
         ^     ^     ^
         L     M     R
        arr[mid]=3 === target ✓

Step 2: Found at index 2
```

---

## Debugging Checklist

When your code doesn't work:

- [ ] Did I handle empty input?
- [ ] Did I check array bounds?
- [ ] Are my loop conditions correct?
- [ ] Did I initialize variables properly?
- [ ] Am I modifying the right variable?
- [ ] Are there off-by-one errors?
- [ ] Did I use `=` instead of `==`?
- [ ] Did I use `==` instead of `===`?
- [ ] Is the function returning the right value?
- [ ] Are there edge cases I missed?
- [ ] Did I test with small inputs?
- [ ] Did I trace through the code manually?

---

## Common Interview Debugging Scenarios

### "My code works for some inputs but not others"
→ Test edge cases systematically

### "I'm getting an infinite loop"
→ Check loop conditions and variable updates

### "I'm getting 'undefined' or 'null'"
→ Check if variables are initialized properly

### "My recursive function isn't working"
→ Verify base case and recursive case

### "I'm getting wrong output"
→ Print intermediate values to trace execution

---

## Pro Tips

1. **Start simple:** Test with the smallest possible input
2. **Be systematic:** Don't randomly change things
3. **One change at a time:** Change one thing, test, repeat
4. **Read the error message:** It usually tells you what's wrong
5. **Take breaks:** Fresh eyes catch bugs faster
6. **Ask for help:** Explaining the problem often reveals the solution

---

**Remember:** Debugging is a skill that improves with practice. Every bug you fix makes you a better programmer!
