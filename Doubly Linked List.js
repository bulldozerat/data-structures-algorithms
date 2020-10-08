class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const newNode = new Node(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return null;
    const oldTail = this.tail;

    if (this.length === 1) {
      this.tail = null;
      this.head = null;
    } else {
      this.tail = oldTail.prev;
      this.tail.next = null;
      oldTail.prev = null;
    }

    this.length--;
    return oldTail;
  }

  shift() {
    if (!this.head) return null;
    const oldHead = this.head;

    if (this.length === 1) {
      this.tail = null;
      this.head = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }

    this.length--;
    return oldHead;
  }

  unshift(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      const prevHead = this.head;
      prevHead.prev = newNode;
      newNode.next = prevHead;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  get(position) {
    if (position < 0 || position > this.length - 1) return null;
    if (position === 0) return this.head;
    if (position === this.length - 1) return this.tail;

    const isStartLoop = position < this.length / 2;
    let current;

    if (isStartLoop) {
      let counter = 0;
      current = this.head;

      while (counter !== position) {
        counter++;
        current = current.next;
      }
    } else {
      let counter = this.length - 1;
      current = this.tail;

      while (counter !== position) {
        counter--;
        current = current.prev;
      }
    }

    return current;
  }

  set(position, val) {
    let current = this.get(position);
    if (!current) return false;

    current.val = val;

    return true;
  }

  insert(position, val) {
    if (position < 0 || position > this.length) return null;
    if (position === 0) return !!this.unshift(val);
    if (position === this.length) return !!this.push(val);

    const newNode = new Node(val);
    const beforeNode = this.get(position - 1);
    const afterNode = beforeNode.next;

    beforeNode.next = newNode;
    newNode.prev = beforeNode;
    newNode.next = afterNode;
    afterNode.prev = newNode;

    this.length++;
    return this;
  }

  remove(position) {
    if (position < 0 || position >= this.length) return undefined;
    if (position === 0) return this.shift();
    if (position === this.length - 1) return this.pop();

    const removedNode = this.get(position);
    const beforeNode = removedNode.prev;
    const afterNode = removedNode.next;

    beforeNode.next = afterNode;
    afterNode.prev = beforeNode;
    removedNode.next = null;
    removedNode.prev = null;

    this.length--;
    return removedNode;
  }
}

const list = new DoublyLinkedList();
list.push('1');
list.push('2');
list.push('3');
list.push('4');
list.push('5');
list.remove(2);
console.log(list);
