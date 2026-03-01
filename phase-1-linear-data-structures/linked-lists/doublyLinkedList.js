/**
 * Doubly Linked List Implementation
 * Each node has references to both next and previous nodes
 * Allows bidirectional traversal
 */

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Insert at the beginning - O(1)
    insertAtBeginning(data) {
        const newNode = new Node(data);
        
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        
        this.size++;
    }

    // Insert at the end - O(1)
    insertAtEnd(data) {
        const newNode = new Node(data);
        
        if (!this.tail) {
            this.head = this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
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
        newNode.prev = current;
        current.next.prev = newNode;
        current.next = newNode;

        this.size++;
    }

    // Delete from beginning - O(1)
    deleteFromBeginning() {
        if (!this.head) {
            return null;
        }

        const deletedData = this.head.data;

        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }

        this.size--;
        return deletedData;
    }

    // Delete from end - O(1)
    deleteFromEnd() {
        if (!this.tail) {
            return null;
        }

        const deletedData = this.tail.data;

        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }

        this.size--;
        return deletedData;
    }

    // Delete specific value - O(n)
    deleteValue(data) {
        if (!this.head) {
            return false;
        }

        if (this.head.data === data) {
            this.deleteFromBeginning();
            return true;
        }

        let current = this.head;
        while (current && current.data !== data) {
            current = current.next;
        }

        if (!current) {
            return false;
        }

        if (current === this.tail) {
            this.deleteFromEnd();
        } else {
            current.prev.next = current.next;
            current.next.prev = current.prev;
            this.size--;
        }

        return true;
    }

    // Search for a value - O(n)
    search(data) {
        let current = this.head;
        let index = 0;

        while (current) {
            if (current.data === data) {
                return index;
            }
            current = current.next;
            index++;
        }

        return -1;
    }

    // Reverse the list - O(n)
    reverse() {
        if (!this.head || !this.head.next) {
            return;
        }

        let current = this.head;
        let temp = null;

        this.tail = this.head;

        while (current) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }

        if (temp) {
            this.head = temp.prev;
        }
    }

    // Traverse forward - O(n)
    traverseForward() {
        const result = [];
        let current = this.head;

        while (current) {
            result.push(current.data);
            current = current.next;
        }

        return result;
    }

    // Traverse backward - O(n)
    traverseBackward() {
        const result = [];
        let current = this.tail;

        while (current) {
            result.push(current.data);
            current = current.prev;
        }

        return result;
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
        this.tail = null;
        this.size = 0;
    }

    // Display the list
    display() {
        const elements = this.traverseForward();
        console.log('null <-> ' + elements.join(' <-> ') + ' <-> null');
    }
}

// Example usage and testing
if (require.main === module) {
    const dll = new DoublyLinkedList();

    console.log('=== Doubly Linked List Demo ===\n');

    // Insert operations
    dll.insertAtEnd(10);
    dll.insertAtEnd(20);
    dll.insertAtEnd(30);
    dll.insertAtBeginning(5);
    console.log('After insertions:');
    dll.display();
    console.log('Forward:', dll.traverseForward());
    console.log('Backward:', dll.traverseBackward());

    // Insert at position
    dll.insertAt(15, 2);
    console.log('\nAfter inserting 15 at position 2:');
    dll.display();

    // Delete operations
    dll.deleteFromBeginning();
    console.log('\nAfter deleting from beginning:');
    dll.display();

    dll.deleteFromEnd();
    console.log('\nAfter deleting from end:');
    dll.display();

    // Search
    console.log('\nSearch for 20:', dll.search(20));
    console.log('Search for 100:', dll.search(100));

    // Reverse
    dll.reverse();
    console.log('\nAfter reversing:');
    dll.display();

    // Delete specific value
    dll.deleteValue(15);
    console.log('\nAfter deleting value 15:');
    dll.display();

    console.log('\nSize:', dll.getSize());
    console.log('Is empty:', dll.isEmpty());
}

module.exports = DoublyLinkedList;
