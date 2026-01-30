# Problem-Solving Approach

A systematic approach to solving DSA problems.

---

## The 5-Step Framework

### Step 1: Understand the Problem
**Questions to ask:**
- What are the inputs and outputs?
- What are the constraints?
- Are there edge cases?
- Can I restate the problem in my own words?

**Example:**
```
Problem: Find two numbers in an array that sum to a target.
- Input: array of numbers, target number
- Output: indices of the two numbers
- Constraints: Each input has exactly one solution
- Edge cases: Empty array, negative numbers
```

---

### Step 2: Explore Examples
Work through 2-3 examples by hand:
- Simple case
- Complex case
- Edge case

**Example:**
```
arr = [2, 7, 11, 15], target = 9
→ [0, 1] (because 2 + 7 = 9)

arr = [3, 2, 4], target = 6
→ [1, 2] (because 2 + 4 = 6)

arr = [3, 3], target = 6
→ [0, 1] (same number, different indices)
```

---

### Step 3: Break It Down
Write pseudocode or outline your approach:

```javascript
// Approach 1: Brute Force
// For each element:
//   For each other element:
//     Check if they sum to target
//     If yes, return indices

// Approach 2: Hash Map
// Create a map to store seen numbers
// For each element:
//   Calculate complement (target - current)
//   If complement exists in map, return indices
//   Otherwise, store current in map
```

---

### Step 4: Solve or Simplify
- Start with a brute force solution if needed
- Solve a simpler version first
- Then optimize

**Optimization techniques:**
- Can I eliminate unnecessary work?
- Can I use a better data structure?
- Can I trade space for time?
- Can I use a known pattern?

---

### Step 5: Analyze and Refine
**After solving:**
- What's the time complexity?
- What's the space complexity?
- Can it be improved?
- Are there edge cases I missed?
- Is the code readable?

---

## Common Problem-Solving Patterns

### Pattern Recognition Checklist

**Array/String problems:**
- [ ] Can I use two pointers?
- [ ] Is there a sliding window opportunity?
- [ ] Would sorting help?
- [ ] Can I use a hash map for O(1) lookups?

**Optimization problems:**
- [ ] Can I use dynamic programming?
- [ ] Is there a greedy approach?
- [ ] Can I use recursion with memoization?

**Search problems:**
- [ ] Is the data sorted? (Binary search)
- [ ] Can I use BFS or DFS?
- [ ] Would a hash set help?

**Interval problems:**
- [ ] Sort by start/end time
- [ ] Merge overlapping intervals
- [ ] Use a priority queue

---

## Debugging Strategies

When stuck:
1. **Print intermediate values**: See what's actually happening
2. **Test with simple input**: Use [1, 2, 3] instead of [99, -42, 1337]
3. **Walk through line by line**: Trace execution manually
4. **Check edge cases**: Empty input, single element, duplicates
5. **Rubber duck**: Explain your approach out loud

---

## Time Management (for interviews)

- **5 min**: Understand problem, ask clarifying questions
- **10 min**: Discuss approach, write pseudocode
- **20 min**: Code the solution
- **5 min**: Test and debug

**Don't:**
- Jump straight to coding
- Stay silent while thinking
- Give up on the first approach

**Do:**
- Think out loud
- Ask for hints if stuck
- Discuss trade-offs

---

## Practice Strategy

1. **Start easy**: Build confidence with simple problems
2. **Focus on patterns**: Group similar problems together
3. **Review solutions**: Learn from others' approaches
4. **Time yourself**: Practice under pressure
5. **Redo problems**: Revisit after a few days

---

## Example: Solving a Problem End-to-End

**Problem**: Reverse a string

**Step 1 - Understand:**
- Input: "hello"
- Output: "olleh"
- Constraints: Must handle empty strings

**Step 2 - Examples:**
- "hello" → "olleh"
- "a" → "a"
- "" → ""

**Step 3 - Approach:**
```
Option 1: Use built-in reverse (if allowed)
Option 2: Two pointers from both ends
Option 3: Recursion
```

**Step 4 - Implement:**
```javascript
function reverse(str) {
  let left = 0;
  let right = str.length - 1;
  let arr = str.split('');
  
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  
  return arr.join('');
}
```

**Step 5 - Analyze:**
- Time: O(n)
- Space: O(n) for the array
- Could use recursion but it's less efficient
- Edge cases handled: empty string, single char

---

**Remember**: The process is more important than the solution!
