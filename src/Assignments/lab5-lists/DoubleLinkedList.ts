import DoubleLinkedListNode from "./DoubleLinkedListNode";

export class DoubleLinkedList {
  head: DoubleLinkedListNode | null;
  tail: DoubleLinkedListNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(...values: any) {
    for (const value of values) {
      const newNode = new DoubleLinkedListNode(value);
      if (this.length === 0) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail!.next = newNode;
        newNode.previous = this.tail;
        this.tail = newNode;
      }
      this.length++;
    }
    return this;
  }

  pop(howManyElementsToPop: number) {
    for (let i = 1; i <= howManyElementsToPop; i++) {
      if (!this.head) return undefined;
      const poppedNode = this.tail;
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.tail = poppedNode!.previous;
        this.tail!.next = null;
        poppedNode!.previous = null;
      }
      this.length--;
    }
  }

  shift() {
    if (this.length === 0) return undefined;
    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      if (oldHead?.next && this.head?.previous) {
        this.head = oldHead.next;
        this.head.previous = null;
        oldHead.next = null;
      }
    }
    DoubleLinkedListNode;
    this.length--;
    return oldHead;
  }

  unshift(...values: any) {
    for (const value of values) {
      const newNode = new DoubleLinkedListNode(value);
      if (this.length === 0) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.head!.previous = newNode;
        newNode.next = this.head;
        this.head = newNode;
      }
      this.length++;
    }
    return this;
  }

  get(index: number) {
    if (index < 0 || index >= this.length) return null;
    let count, current;
    if (index <= this.length / 2) {
      count = 0;
      current = this.head;
      while (count !== index && current) {
        current = current.next;
        count++;
      }
    } else {
      count = this.length - 1;
      current = this.tail;
      while (count !== index && current) {
        current = current.previous;
        count--;
      }
    }
    return current;
  }
  set(index: number, value: any) {
    const foundNode = this.get(index);
    if (foundNode != null) {
      foundNode.value = value;
      return true;
    }
    return false;
  }

  insert(index: number, value: any) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(value);
    if (index === this.length) return !!this.push(value);

    const newNode = new DoubleLinkedListNode(value);
    const beforeNode = this.get(index - 1);
    if (beforeNode && beforeNode.next) {
      const afterNode = beforeNode.next;
      (beforeNode.next = newNode), (newNode.previous = beforeNode);
      (newNode.next = afterNode), (afterNode.previous = newNode);
      this.length++;
      return true;
    }
  }

  removeAt(indexToDelete: number) {
    if (indexToDelete > -1 && indexToDelete < this.length) {
      let current = this.head;
      let previous = null;
      let index = 0;

      if (indexToDelete === 0 && current) {
        this.head = current.next;

        if (this.length === 1) {
          this.tail = null;
        } else {
          this.head!.previous = null;
        }
      } else if (indexToDelete === this.length - 1 && this.tail) {
        current = this.tail;
        this.tail = current?.previous;
        this.tail!.next = null;
      } else {
        while (index++ < indexToDelete && current?.next) {
          previous = current;
          current = current.next;
        }
        if (previous && current?.next?.previous) {
          previous.next = current.next;
          current.next.previous = previous;
        }
      }
      this.length--;
      return current;
    } else {
      return null;
    }
  }

  indexOf(value: any) {
    let current = this.head;
    let index = -1;

    while (current) {
      if (value === current.value) {
        return ++index;
      }

      index++;
      current = current.next;
    }

    return -1;
  }

  delete(value: any) {
    return this.removeAt(this.indexOf(value));
  }

  toArray() {
    const arr = [];
    let current = this.head;

    while (current) {
      arr.push(current.value);
      current = current.next;
    }

    return arr;
  }

  public *generateForwardTraversing() {
    let current = this.head;
    while (current) {
      yield current;
      current = current.next;
    }
  }

  *generateBackWardsTraversing() {
    let current = this.tail;
    while (current) {
      yield current;
      current = current.previous;
    }
  }
}
