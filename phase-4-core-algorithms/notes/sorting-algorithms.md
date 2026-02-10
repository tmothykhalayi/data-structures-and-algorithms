# Sorting Algorithms Deep Dive

## Overview

Sorting is one of the most fundamental operations in computer science. Understanding different sorting algorithms helps you choose the right one for your use case.

## Comparison-Based Sorting

### 1. Bubble Sort 🫧

Repeatedly steps through list, compares adjacent elements and swaps if wrong order.

```javascript
function bubbleSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
                swapped = true;
            }
        }
        
        if (!swapped) break; // Array is sorted
    }
    
    return arr;
}
```

**Time Complexity:**
- Best: O(n) - Already sorted
- Average: O(n²)
- Worst: O(n²)

**Space: O(1)** - In-place sorting

**When to use:** Educational purposes, nearly sorted small data

---

### 2. Selection Sort 🎯

Finds minimum element and moves it to beginning.

```javascript
function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Find minimum in unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap minimum with first unsorted element
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return arr;
}
```

**Time Complexity:**
- Best: O(n²)
- Average: O(n²)
- Worst: O(n²)

**Space: O(1)**

**When to use:** Small datasets, memory writes are expensive

---

### 3. Insertion Sort 🃏

Builds sorted array one element at a time.

```javascript
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
    
    return arr;
}
```

**Time Complexity:**
- Best: O(n) - Already sorted
- Average: O(n²)
- Worst: O(n²)

**Space: O(1)**

**When to use:** Small datasets, nearly sorted data, online sorting

---

### 4. Merge Sort 🔀

Divide and conquer algorithm that divides array in half, sorts halves, merges them.

```javascript
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}
```

**Time Complexity:**
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n log n)

**Space: O(n)** - Not in-place

**When to use:** Stable sort needed, linked lists, external sorting

---

### 5. Quick Sort ⚡

Picks pivot, partitions array around pivot, recursively sorts partitions.

```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}
```

**Time Complexity:**
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n²) - Poor pivot selection

**Space: O(log n)** - Recursion stack

**When to use:** General-purpose, in-place sorting, average case matters

---

### 6. Heap Sort 📚

Uses binary heap to sort.

```javascript
function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]]; // Move root to end
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}
```

**Time Complexity:**
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n log n)

**Space: O(1)** - In-place

**When to use:** Guaranteed O(n log n), priority queue, in-place needed

---

## Non-Comparison-Based Sorting

### 7. Counting Sort 🔢

Counts occurrences of each element.

```javascript
function countingSort(arr) {
    if (arr.length === 0) return arr;
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }
    
    // Cumulative count
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    return output;
}
```

**Time Complexity: O(n + k)** where k is range of input
**Space: O(k)**

**When to use:** Small range of integers, need linear time

---

### 8. Radix Sort 📊

Sorts by processing individual digits.

```javascript
function radixSort(arr) {
    const max = Math.max(...arr);
    
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    
    return arr;
}

function countingSortByDigit(arr, exp) {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);
    
    // Count occurrences of digits
    for (let i = 0; i < arr.length; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
    }
    
    // Cumulative count
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    // Copy to original array
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
}
```

**Time Complexity: O(d × (n + k))** where d is number of digits
**Space: O(n + k)**

**When to use:** Large datasets with small digit count

---

## Sorting Algorithm Comparison

| Algorithm | Best | Average | Worst | Space | Stable | In-Place |
|-----------|------|---------|-------|-------|--------|----------|
| Bubble    | O(n) | O(n²)   | O(n²) | O(1)  | Yes    | Yes      |
| Selection | O(n²)| O(n²)   | O(n²) | O(1)  | No     | Yes      |
| Insertion | O(n) | O(n²)   | O(n²) | O(1)  | Yes    | Yes      |
| Merge     | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | No |
| Quick     | O(n log n) | O(n log n) | O(n²) | O(log n) | No | Yes |
| Heap      | O(n log n) | O(n log n) | O(n log n) | O(1) | No | Yes |
| Counting  | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes | No |
| Radix     | O(d(n+k)) | O(d(n+k)) | O(d(n+k)) | O(n+k) | Yes | No |

---

## When to Use Which Algorithm?

| Scenario | Best Choice | Why |
|----------|-------------|-----|
| Small dataset (< 50) | Insertion Sort | Simple, efficient for small n |
| Nearly sorted | Insertion Sort | O(n) best case |
| Need stability | Merge Sort | Guaranteed stable |
| In-place needed | Quick Sort / Heap | O(1) or O(log n) space |
| Worst-case O(n log n) | Merge / Heap | Guaranteed performance |
| Average case priority | Quick Sort | Fastest in practice |
| Integers, small range | Counting Sort | Linear time |
| Large integers | Radix Sort | O(d(n+k)) can beat O(n log n) |

---

## Key Concepts

### Stability
A sort is **stable** if it preserves the relative order of equal elements.

### In-Place
Sorts with O(1) extra space (excluding input array).

### Adaptive
Performance improves on partially sorted input.

---

## Practice Problems

1. **Sort Colors** - Dutch National Flag (3-way partition)
2. **Merge K Sorted Lists** - Use merge sort concept
3. **Largest Number** - Custom comparator sorting
4. **Sort List** - Merge sort on linked list
5. **Top K Frequent Elements** - Counting + sorting

---

## Key Takeaways

✅ No single "best" sorting algorithm - depends on use case
✅ Quick Sort fastest in practice (randomized pivot)
✅ Merge Sort best for stability + guaranteed O(n log n)
✅ Insertion Sort excellent for small/nearly sorted data
✅ Count/Radix for integers, can beat comparison sorts
✅ Python uses Timsort (hybrid of merge + insertion)
✅ JavaScript uses V8's Timsort-inspired algorithm

Master the characteristics - know when to use which!
