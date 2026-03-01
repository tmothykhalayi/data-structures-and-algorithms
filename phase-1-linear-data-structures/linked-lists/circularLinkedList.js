/**
 * Circular Linked List Implementation
 * Last node points back to the first node
 * Can be traversed from any node indefinitely
 */

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Insert at the beginning - O(n)
    insertAtBeginning(data) {
        const newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
            newNode.next = this.head;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            newNode.next = this.head;
            current.next = newNode;
            this.head = newNode;
        }

        this.size++;
    }

    // Insert at the end - O(n)
    insertAtEnd(data) {
        const newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
            newNode.next = this.head;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head;
        }

        this.size++;
    }

    // Insert at specific position - O(n)
    insertAt(data, position) {
        if (position < 0 || position > this.size) {
            throw new Error('Invalid position');
        }

        if (position === 0) {
            this.insertAtBeginning(data);
            return;
        }

        if (position === this.size) {
            this.insertAtEnd(data);
            return;
        }

        const newNode = new Node(data);
        let current = this.head;
        let index = 0;

        while (index < position - 1) {
            current = current.next;
            index++;
        }

        newNode.next = current.next;
        current.next = newNode;
        this.size++;
    }

    // Delete from beginning - O(n)
    deleteFromBeginning() {
        if (!this.head) {
            return null;
        }

        const deletedData = this.head.data;

        if (this.head.next === this.head) {
            this.head = null;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            this.head = this.head.next;
            current.next = this.head;
        }

        this.size--;
        return deletedData;
    }

    // Delete from end - O(n)
    deleteFromEnd() {
        if (!this.head) {
            return null;
        }

        const deletedData = this.head.data;

        if (this.head.next === this.head) {
            this.head = null;
            this.size--;
            return deletedData;
        }

        let current = this.head;
        while (current.next.next !== this.head) {
            current = current.next;
        }

        const data = current.next.data;
        current.next = this.head;
        this.size--;
        return data;
    }

    // Delete specific value - O(n)
    deleteValue(data) {
        if (!this.head) {
            return false;
        }

        // If head node contains the data
        if (this.head.data === data) {
            this.deleteFromBeginning();
            return true;
        }

        let current = this.head;
        let prev = null;

        do {
            prev = current;
            current = current.next;
            if (current.data === data) {
                prev.next = current.next;
                this.size--;
                return true;
            }
        } while (current !== this.head);

        return false;
    }

    // Search for a value - O(n)
    search(data) {
        if (!this.head) {
            return -1;
        }

        let current = this.head;
        let index = 0;

        do {
            if (current.data === data) {
                return index;
            }
            current = current.next;
            index++;
        } while (current !== this.head);

        return -1;
    }

    // Traverse the list - O(n)
    traverse() {
        if (!this.head) {
            return [];
        }

        const result = [];
        let current = this.head;

        do {
            result.push(current.data);
            current = current.next;
        } while (current !== this.head);

        return result;
    }

    // Split circular list into two halves - O(n)
    splitIntoHalves() {
        if (!this.head || this.head.next === this.head) {
            return [this, new CircularLinkedList()];
        }

        let slow = this.head;
        let fast = this.head;

        // Find middle using slow-fast pointer technique
        while (fast.next !== this.head && fast.next.next !== this.head) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // Create second half
        const secondList = new CircularLinkedList();
        secondList.head = slow.next;

        // Find last node of second half
        let current = secondList.head;
        let count = 1;
        while (current.next !== this.head) {
            current = current.next;
            count++;
        }
        current.next = secondList.head;
        secondList.size = count;

        // Complete first half
        slow.next = this.head;
        this.size -= count;

        return [this, secondList];
    }

    // Check if list contains a cycle (always true for circular list)
    isCircular() {
        if (!this.head) {
            return false;
        }

        let current = this.head;
        do {
            current = current.next;
        } while (current && current !== this.head);

        return current === this.head;
    }

    // Get size - O(1)
    getSize() {
        return this.size;
    }

    // Check if empty - O(1)
    isEmpty() {
        return this.size === 0;
    }

    // Clear the list - O(1)
    clear() {
        this.head = null;
        this.size = 0;
    }

    // Display the list
    display() {
        if (!this.head) {
            console.log('List is empty');
            return;
        }

        const elements = this.traverse();
        console.log(elements.join(' -> ') + ' -> (back to ' + this.head.data + ')');
    }
}

// Example usage and testing
if (require.main === module) {
    const cll = new CircularLinkedList();

    console.log('=== Circular Linked List Demo ===\n');

    // Insert operations
    cll.insertAtEnd(10);
    cll.insertAtEnd(20);
    cll.insertAtEnd(30);
    cll.insertAtEnd(40);
    cll.insertAtBeginning(5);
    console.log('After insertions:');
    cll.display();

    // Insert at position
    cll.insertAt(15, 2);
    console.log('\nAfter inserting 15 at position 2:');
    cll.display();

    // Check if circular
    console.log('\nIs circular:', cll.isCircular());

    // Search
    console.log('Search for 30:', cll.search(30));
    console.log('Search for 100:', cll.search(100));

    // Delete operations
    cll.deleteFromBeginning();
    console.log('\nAfter deleting from beginning:');
    cll.display();

    cll.deleteFromEnd();
    console.log('\nAfter deleting from end:');
    cll.display();

    // Delete specific value
    cll.deleteValue(20);
    console.log('\nAfter deleting value 20:');
    cll.display();

    console.log('\nSize:', cll.getSize());

    // Split into halves
    console.log('\n--- Splitting into halves ---');
    const [firstHalf, secondHalf] = cll.splitIntoHalves();
    console.log('First half:');
    firstHalf.display();
    console.log('Second half:');
    secondHalf.display();
}

module.exports = CircularLinkedList;
