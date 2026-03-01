/**
 * Min Heap and Max Heap Implementation
 * Complete binary tree where parent has property relative to children
 * Min Heap: parent <= children
 * Max Heap: parent >= children
 * Operations: O(log n) for insert/delete, O(1) for peek
 */

class MinHeap {
    constructor() {
        this.heap = [];
    }

    // Get parent index
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    // Get left child index
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    // Get right child index
    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    // Swap two elements
    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    // Insert element - O(log n)
    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    // Heapify up (bubble up)
    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.heap[parentIndex] <= this.heap[index]) {
                break;
            }
            this.swap(parentIndex, index);
            index = parentIndex;
        }
    }

    // Extract minimum - O(log n)
    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }

    // Heapify down (bubble down)
    heapifyDown(index) {
        while (true) {
            let smallest = index;
            const leftIndex = this.getLeftChildIndex(index);
            const rightIndex = this.getRightChildIndex(index);

            if (leftIndex < this.heap.length && 
                this.heap[leftIndex] < this.heap[smallest]) {
                smallest = leftIndex;
            }

            if (rightIndex < this.heap.length && 
                this.heap[rightIndex] < this.heap[smallest]) {
                smallest = rightIndex;
            }

            if (smallest === index) break;

            this.swap(index, smallest);
            index = smallest;
        }
    }

    // Peek at minimum - O(1)
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    // Get size - O(1)
    size() {
        return this.heap.length;
    }

    // Check if empty - O(1)
    isEmpty() {
        return this.heap.length === 0;
    }

    // Build heap from array - O(n)
    buildHeap(array) {
        this.heap = [...array];
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }

    // Heap sort - O(n log n)
    heapSort() {
        const sorted = [];
        const originalHeap = [...this.heap];

        while (!this.isEmpty()) {
            sorted.push(this.extractMin());
        }

        this.heap = originalHeap;
        return sorted;
    }

    // Display heap
    display() {
        console.log('Heap:', this.heap);
    }
}

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    // Insert element - O(log n)
    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.heap[parentIndex] >= this.heap[index]) {
                break;
            }
            this.swap(parentIndex, index);
            index = parentIndex;
        }
    }

    // Extract maximum - O(log n)
    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return max;
    }

    heapifyDown(index) {
        while (true) {
            let largest = index;
            const leftIndex = this.getLeftChildIndex(index);
            const rightIndex = this.getRightChildIndex(index);

            if (leftIndex < this.heap.length && 
                this.heap[leftIndex] > this.heap[largest]) {
                largest = leftIndex;
            }

            if (rightIndex < this.heap.length && 
                this.heap[rightIndex] > this.heap[largest]) {
                largest = rightIndex;
            }

            if (largest === index) break;

            this.swap(index, largest);
            index = largest;
        }
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    buildHeap(array) {
        this.heap = [...array];
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }

    heapSort() {
        const sorted = [];
        const originalHeap = [...this.heap];

        while (!this.isEmpty()) {
            sorted.push(this.extractMax());
        }

        this.heap = originalHeap;
        return sorted;
    }

    display() {
        console.log('Heap:', this.heap);
    }
}

// Example usage and testing
if (require.main === module) {
    console.log('=== Min Heap Demo ===\n');
    
    const minHeap = new MinHeap();
    
    // Insert elements
    [50, 30, 20, 15, 10, 8, 16].forEach(val => minHeap.insert(val));
    console.log('After insertions:');
    minHeap.display();
    
    console.log('Minimum element:', minHeap.peek());
    
    // Extract min
    console.log('\nExtracted min:', minHeap.extractMin());
    minHeap.display();
    
    // Build heap from array
    const arr1 = [9, 5, 6, 2, 3];
    minHeap.buildHeap(arr1);
    console.log('\nBuilt heap from', arr1);
    minHeap.display();
    
    // Heap sort
    console.log('Heap sort result:', minHeap.heapSort());
    
    console.log('\n=== Max Heap Demo ===\n');
    
    const maxHeap = new MaxHeap();
    
    // Insert elements
    [10, 20, 15, 30, 40].forEach(val => maxHeap.insert(val));
    console.log('After insertions:');
    maxHeap.display();
    
    console.log('Maximum element:', maxHeap.peek());
    
    // Extract max
    console.log('\nExtracted max:', maxHeap.extractMax());
    maxHeap.display();
    
    // Build heap from array
    const arr2 = [3, 9, 2, 1, 4, 5];
    maxHeap.buildHeap(arr2);
    console.log('\nBuilt heap from', arr2);
    maxHeap.display();
    
    // Heap sort (descending)
    console.log('Heap sort result:', maxHeap.heapSort());
}

module.exports = { MinHeap, MaxHeap };
