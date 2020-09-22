// insertion O(1)
// removal O(1) start or O(n) end
// seach O(n)
// access O(n)

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedLink {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return undefined;

    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current;
  }

  shift() {
    if (!this.head) return undefined;

    const currentHead = this.head;
    this.head = currentHead.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }

    return currentHead;
  }

  unshift(val) {
    const newHead = new Node(val);
    if (!this.head) {
      this.head = newHead;
      this.tail = newHead;
    } else {
      newHead.next = this.head;
      this.head = newHead;
    }

    this.length++;
    return this;
  }

  get(position) {
    if (position < 0 || position >= this.length) return undefined;

    let current = this.head;
    let counter = 0;

    while (counter !== position) {
      counter++;
      current = current.next;
    }

    return current;
  }

  set(position, val) {
    const current = this.get(position);
    if (!current || !val) return false;
    current.val = val;

    return true;
  }

  insert(position, val) {
    if (!val || position > this.length || position < 0) return false;
    if (position === 0) return !!this.unshift(val);
    if (position === this.length) return !!this.push(val);

    let prev = this.get(position - 1);
    const newNode = new Node(val);
    const temp = prev.next;
    prev.next = newNode;
    newNode.next = temp;

    this.length++;
    return true;
  }

  remove(position) {
    if (position >= this.length || position < 0) return false;
    if (position === 0) return this.shift();
    if (position === this.length - 1) return this.pop();

    const prev = this.get(position - 1);
    const removed = prev.next;
    prev.next = removed.next;

    this.length--;
    return this.removed;
  }

  reverse() {
    if (!this.head) return undefined;

    let current = this.head;
    let prev;
    let next;

    this.head = this.tail;
    this.tail = current;

    for (let i = 0; i < this.length; i++) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
  }
}

const first = new SinglyLinkedLink();
first.push('1');
first.push('2');
first.push('3');
first.reverse();

console.log(first);
