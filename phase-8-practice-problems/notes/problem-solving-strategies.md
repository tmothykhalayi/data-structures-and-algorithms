# Problem-Solving Strategies Guide

## How to Approach DSA Problems

### Step 1: Understand the Problem
- Read carefully, identify inputs/outputs
- Ask clarifying questions
- Identify constraints (time/space limits, input size)
- Work through examples manually

### Step 2: Plan Your Approach
- Recognize problem patterns
- Consider multiple solutions
- Analyze time/space complexity
- Choose optimal approach

### Step 3: Implement
- Start with brute force if unclear
- Write clean, readable code
- Use meaningful variable names
- Add comments for complex logic

### Step 4: Test
- Test with given examples
- Test edge cases (empty, single element, max size)
- Test invalid inputs
- Trace through execution

### Step 5: Optimize
- Analyze bottlenecks
- Consider different data structures
- Look for redundant calculations
- Optimize space if possible

---

## Common Problem Patterns

### 1. Two Pointers
**When:** Array/string, need to find pairs/subarrays
**Examples:** Two Sum (sorted), Remove Duplicates, Container With Most Water

```javascript
// Template
function twoPointers(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // Process current pointers
        if (condition) {
            // Found solution or update result
        } else if (shouldMoveLeft) {
            left++;
        } else {
            right--;
        }
    }
}
```

---

### 2. Sliding Window
**When:** Contiguous subarray/substring problems
**Examples:** Max Sum Subarray, Longest Substring Without Repeating

```javascript
// Fixed size window
function fixedWindow(arr, k) {
    let sum = 0;
    let maxSum = 0;
    
    // Initial window
    for (let i = 0; i < k; i++) {
        sum += arr[i];
    }
    maxSum = sum;
    
    // Slide window
    for (let i = k; i < arr.length; i++) {
        sum = sum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, sum);
    }
    
    return maxSum;
}

// Variable size window
function variableWindow(arr, target) {
    let left = 0;
    let sum = 0;
    let minLength = Infinity;
    
    for (let right = 0; right < arr.length; right++) {
        sum += arr[right];
        
        while (sum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            sum -= arr[left];
            left++;
        }
    }
    
    return minLength === Infinity ? 0 : minLength;
}
```

---

### 3. Fast & Slow Pointers
**When:** Linked list cycle detection, finding middle
**Examples:** Linked List Cycle, Find Middle Node

```javascript
// Detect cycle
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
```

---

### 4. Merge Intervals
**When:** Overlapping intervals
**Examples:** Merge Intervals, Insert Interval

```javascript
function mergeIntervals(intervals) {
    if (intervals.length === 0) return [];
    
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = result[result.length - 1];
        
        if (current[0] <= last[1]) {
            // Overlapping, merge
            last[1] = Math.max(last[1], current[1]);
        } else {
            result.push(current);
        }
    }
    
    return result;
}
```

---

### 5. Cyclic Sort
**When:** Array contains numbers in range [1, n]
**Examples:** Find Missing Number, Find Duplicate

```javascript
function cyclicSort(nums) {
    let i = 0;
    while (i < nums.length) {
        const correctIndex = nums[i] - 1;
        if (nums[i] !== nums[correctIndex]) {
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        } else {
            i++;
        }
    }
    return nums;
}
```

---

### 6. Top K Elements
**When:** Find K largest/smallest elements
**Examples:*- Top K Frequent, Kth Largest Element

```javascript
// Using heap (priority queue)
function topKFrequent(nums, k) {
    const freq = new Map();
    for (let num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    
    // Min heap approach or sort by frequency
    const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, k).map(entry => entry[0]);
}
```

---

### 7. Binary Search Variations
**When:** Sorted array, search space can be binary searched
**Examples:** Search Insert Position, Find Peak Element

---

### 8. DFS/BFS on Tree
**When:** Tree traversal, path finding
**Examples:** Path Sum, Level Order Traversal

---

### 9. Backtracking
**When:** Generate all possibilities, constraint satisfaction
**Examples:** Subsets, Permutations, N-Queens

---

### 10. Dynamic Programming
**When:** Optimal substructure + overlapping subproblems
**Examples:** Fibonacci, Knapsack, LCS

---

## Problem-Solving Mindset

### Ask These Questions:
1. What is the expected output?
2. Are there constraints on time/space?
3. Can the input be modified?
4. Are there edge cases to consider?
5. Is there a pattern I recognize?
6. Can I solve simpler version first?

### Red Flags:
- "All possible combinations" → Backtracking or DP
- "Minimum/Maximum" → DP, Greedy, or Binary Search
- "Contiguous subarray" → Sliding Window or Kadane's
- "Cycle detection" → Fast & Slow Pointers
- "Graph connectivity" → DFS/BFS or Union-Find
- "Sorted array" → Binary Search or Two Pointers

---

## Time Complexity Goals by Input Size

| Input Size (n) | Maximum Acceptable Time | Typical Approach |
|----------------|-------------------------|------------------|
| n ≤ 10 | O(n!) | Backtracking, brute force |
| n ≤ 20 | O(2ⁿ) | Backtracking with pruning |
| n ≤ 100 | O(n³) | DP, Floyd-Warshall |
| n ≤ 1,000 | O(n²) | DP, nested loops |
| n ≤ 10,000 | O(n log n) | Sorting, heap, divide & conquer |
| n ≤ 100,000 | O(n) | Hash tables, two pointers |
| n ≤ 1,000,000 | O(n) or O(n log n) | Optimized algorithms |
| n > 1,000,000 | O(log n) or O(1) | Binary search, math formulas |

---

## Interview Tips

### Before Coding:
1. **Clarify** - Ask questions about edge cases
2. **Examples** - Work through 2-3 examples
3. **Approach** - Explain your approach before coding
4. **Complexity** - Mention expected time/space complexity

### While Coding:
1. **Think aloud** - Explain what you're doing
2. **Clean code** - Use clear variable names
3. **Modular** - Break into helper functions
4. **Edge cases** - Handle empty input, single element

### After Coding:
1. **Test** - Walk through with example
2. **Edge cases** - Test boundary conditions
3. **Optimize** - Discuss possible improvements
4. **Trade-offs** - Explain time vs space decisions

---

## Common Mistakes to Avoid

1. ❌ Jumping to code without planning
2. ❌ Not clarifying requirements
3. ❌ Ignoring edge cases
4. ❌ Not testing code
5. ❌ Over-optimizing prematurely
6. ❌ Not communicating during interview
7. ❌ Giving up too quickly
8. ❌ Not asking for hints when stuck

---

## Practice Strategy

### 1. Start with Easy Problems
Build confidence and learn patterns.

### 2. Focus on Patterns
Group problems by pattern (two pointers, sliding window, etc.).

### 3. Time Yourself
Simulate interview conditions (45 minutes per problem).

### 4. Review Solutions
Even if you solve it, read other solutions.

### 5. Repeat
Revisit problems after a week to reinforce.

### 6. Mock Interviews
Practice explaining solutions out loud.

---

## Problem-Solving Checklist

**Before Starting:**
- [ ] Understand problem completely
- [ ] Identify inputs, outputs, constraints
- [ ] Work through examples manually
- [ ] Recognize pattern
- [ ] Plan approach

**While Solving:**
- [ ] Start with brute force if needed
- [ ] Optimize step by step
- [ ] Consider edge cases
- [ ] Write clean, readable code
- [ ] Add comments for complex logic

**After Solving:**
- [ ] Test with given examples
- [ ] Test edge cases
- [ ] Analyze complexity
- [ ] Consider optimizations
- [ ] Review other solutions

---

## Resources for Practice

### By Difficulty:
- **Easy:** Build fundamentals
- **Medium:** Interview preparation
- **Hard:** Advanced concepts

### By Topic:
- Arrays & Strings
- Linked Lists
- Trees & Graphs
- Dynamic Programming
- Sorting & Searching
- Backtracking
- Design

### By Company:
Many platforms tag problems by company.

---

## Key Takeaways

✅ Understand before coding
✅ Recognize patterns to reduce thinking time
✅ Start simple, then optimize
✅ Test thoroughly with edge cases
✅ Communicate clearly in interviews
✅ Practice consistently (daily if possible)
✅ Learn from solutions, even when you solve it
✅ Time complexity matters - choose right algorithm

**Remember:** Problem-solving is a skill that improves with practice!
