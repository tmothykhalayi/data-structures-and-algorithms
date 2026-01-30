# Phase 6: Dynamic Programming

## Welcome to Dynamic Programming

Dynamic Programming (DP) is one of the most powerful algorithmic techniques for solving optimization problems. It's challenging but mastering it will significantly boost your problem-solving abilities.

---

## What You'll Learn

### 1. **DP Fundamentals**
- What makes a problem suitable for DP
- Optimal substructure property
- Overlapping subproblems
- Memoization vs Tabulation

### 2. **1D DP**
- Fibonacci sequence
- Climbing stairs
- House robber
- Decode ways
- Maximum subarray

### 3. **2D DP**
- 0/1 Knapsack
- Longest common subsequence
- Edit distance
- Unique paths
- Minimum path sum

### 4. **Advanced DP**
- Knapsack variations
- String DP problems
- Matrix DP problems
- DP on trees
- DP with state machines

---

## Why Dynamic Programming Matters

DP is essential because:

1. **Optimization**: Transform O(2^n) to O(n²) or O(n)
2. **Interview Critical**: 25-30% of interview problems use DP
3. **Real-World Applications**: Resource allocation, scheduling, bioinformatics
4. **Problem-Solving Growth**: Develops deep analytical thinking
5. **FAANG Favorite**: Heavily tested in top company interviews

---

## DP Recognition

A problem is likely DP if it asks for:
- ✅ Maximum/minimum value
- ✅ Count of ways to do something
- ✅ Yes/No decision (can you reach?)
- ✅ Longest/shortest subsequence/path

And has:
- ✅ Overlapping subproblems
- ✅ Optimal substructure

---

## Study Roadmap

### Week 1: DP Foundations
- Day 1-2: Understand DP concepts
- Day 3-4: Memoization (top-down)
- Day 5-6: Tabulation (bottom-up)
- Day 7: Practice basics

### Week 2: 1D DP
- Day 1-7: Master 10-15 1D DP problems

### Week 3-4: 2D DP
- Day 1-14: Master 15-20 2D DP problems

### Week 5: Advanced DP
- Day 1-7: Complex DP patterns

---

## Common DP Patterns

### 1. Linear DP (1D)
- Fibonacci numbers
- Climbing stairs
- House robber
- Decode ways

### 2. Knapsack Pattern
- 0/1 Knapsack
- Subset sum
- Partition equal subset
- Target sum

### 3. LCS Pattern
- Longest common subsequence
- Longest common substring
- Edit distance
- Shortest common supersequence

### 4. Palindrome Pattern
- Longest palindromic substring
- Palindromic substrings
- Longest palindromic subsequence

### 5. Grid/Matrix Pattern
- Unique paths
- Minimum path sum
- Triangle
- Dungeon game

---

## DP Approach Template

### Step 1: Identify if it's DP
- Can it be broken into subproblems?
- Do subproblems overlap?
- Is there optimal substructure?

### Step 2: Define State
- What parameters change?
- What do we need to track?

### Step 3: Write Recurrence Relation
- How do states relate?
- What's the base case?

### Step 4: Implement
- Top-down (memoization) OR
- Bottom-up (tabulation)

### Step 5: Optimize
- Reduce space complexity
- Identify patterns for optimization

---

## Time Complexity Analysis

### DP vs Other Approaches:
| Problem | Brute Force | DP | Improvement |
|---------|-------------|-----|-------------|
| Fibonacci | O(2^n) | O(n) | Exponential → Linear |
| 0/1 Knapsack | O(2^n) | O(nW) | Exponential → Pseudo-poly |
| LCS | O(2^(m+n)) | O(mn) | Exponential → Polynomial |

---

## Resources in This Phase

### Study Notes (to be created):
- [DP Fundamentals Guide](dp-fundamentals-guide.md)
- [1D DP Problems Guide](1d-dp-guide.md)
- [2D DP Problems Guide](2d-dp-guide.md)
- [Knapsack Patterns](knapsack-patterns.md)
- [LCS Patterns](lcs-patterns.md)
- [DP Optimization Techniques](dp-optimization.md)

**Also Review**: 
- [Phase 0: Recursion Basics](../../phase-0-foundations/notes/recursion-basics.md)
- [Phase 5: Advanced Recursion](../../phase-5-recursion-patterns/notes/advanced-recursion-guide.md)

---

## Interview Tips

**Most Common DP Problems**:
1. Climbing Stairs
2. House Robber (I, II, III)
3. Coin Change (I, II)
4. 0/1 Knapsack
5. Longest Increasing Subsequence
6. Longest Common Subsequence
7. Edit Distance
8. Unique Paths
9. Maximum Subarray (Kadane's)
10. Word Break

**What Interviewers Look For**:
- Can you identify DP problems?
- Can you define states correctly?
- Can you write recurrence relations?
- Can you optimize space?

**Interview Strategy**:
1. Start with brute force/recursion
2. Identify overlapping subproblems
3. Add memoization
4. Convert to tabulation if asked
5. Optimize space if possible

---

## Common Mistakes

- ❌ Not identifying overlapping subproblems
- ❌ Wrong state definition
- ❌ Incorrect base cases
- ❌ Off-by-one errors in loops
- ❌ Not considering all transitions

---

## Practice Strategy

1. **Start simple**: Master Fibonacci, climbing stairs
2. **Learn patterns**: Focus on one pattern at a time
3. **Solve systematically**: 
   - Understand problem deeply
   - Write brute force first
   - Add memoization
   - Convert to tabulation
   - Optimize space
4. **Practice daily**: DP requires consistent practice
5. **Review solutions**: Learn multiple approaches

**Recommended**: Solve 40-50 DP problems to gain proficiency

---

## Difficulty Progression

1. **Easy** (10 problems): Fibonacci, climbing stairs, min cost climbing
2. **Medium** (25 problems): House robber, coin change, unique paths
3. **Hard** (15 problems): Edit distance, wildcard matching, burst balloons

---

**Remember**: DP is hard initially but becomes intuitive with practice. Don't give up!

---

**Next**: Move to Phase 7 (Graphs) to apply DP in graph problems!
