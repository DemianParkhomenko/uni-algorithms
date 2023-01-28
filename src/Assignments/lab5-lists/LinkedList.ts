import { LinkedListNode } from "./LinkedListNode";
import { removedIndex } from "Types";
export class LinkedList {
  private head: LinkedListNode | null;
  private tail: LinkedListNode | null;
  private length: number = 0;

  constructor(...elements: any) {
    this.head = null;
    this.tail = null;
    if (elements.length) {
      this.push(...elements);
    }
  }

  getLength() {
    return this.length;
  }

  getHead() {
    return this.head;
  }

  setHead(node: LinkedListNode) {
    this.head = node;
  }

  getTail() {
    return this.tail;
  }

  clean() {
    this.head = null;
    this.length = 0;
  }

  push(...values: any): LinkedList {
    for (const value of values) {
      const newNode = new LinkedListNode(value);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      }
      if (!this.tail) {
        throw new Error("No tail for push in linkedList");
      }

      this.length++;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    return this;
  }

  pop(howManyElementsToPop: number): LinkedListNode[] {
    const deletedNodes: LinkedListNode[] = [];

    for (let i = 1; i <= howManyElementsToPop; i++) {
      if (!this.tail) {
        return deletedNodes;
      }
      if (this.head === this.tail || !this.head?.next) {
        this.head = null;
        deletedNodes.push(this.tail);
        this.tail = null;
      }

      let currentNode = this.head;
      while (currentNode?.next) {
        if (!currentNode.next.next) {
          currentNode.next = null;
        } else {
          currentNode = currentNode.next;
        }
      }

      this.tail = currentNode;
    }

    return deletedNodes;
  }

  shift(howManyElementsToShift: any): LinkedListNode | null {
    for (let i = 1; i <= howManyElementsToShift; i++) {
      if (!this.head) {
        return null;
      }
      const currentHead = this.head;
      this.head = currentHead.next;
      this.length--;
    }
    return this.head;
  }

  unshift(...values: any): LinkedList {
    for (const value of values) {
      const newNode = new LinkedListNode(value);
      if (this.length === 0) {
        this.head = newNode;
        this.tail = this.head;
      }
      newNode.next = this.head;
      this.head = newNode;
      this.length++;
    }
    return this;
  }

  get(index: number): LinkedListNode | null {
    if (index < 0 || index >= this.length) {
      console.log("Index for LinkedList.get is out of range.");
      return null;
    }

    let i = 0;
    let currentNode = this.head;
    while (i !== index && currentNode?.next) {
      currentNode = currentNode.next;
      i++;
    }
    return currentNode;
  }

  set(index: number, value: any): boolean {
    const foundNode = this.get(index);
    if (foundNode) {
      foundNode.value = value;
      return true;
    }
    return false;
  }

  insert(index: number, value: any) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.push(value);
    if (index === 0) return !!this.unshift(value);

    const newNode = new LinkedListNode(value);
    const previousNode = this.get(index - 1);
    if (previousNode?.next) {
      const tempNext = previousNode.next;
      previousNode.next = newNode;
      newNode.next = tempNext;
      this.length++;
      return true;
    }
    return false;
  }

  remove(indexesRemove: number[]): Array<removedIndex> {
    const removedNodes: Array<removedIndex> = [];
    for (const index of indexesRemove) {
      if (index < 0 || index >= this.length) {
        removedNodes.push({ index, result: null });
      }
      if (index === 0) {
        removedNodes.push({ index, result: this.shift(1) });
      }
      if (index === this.length - 1) {
        removedNodes.push({ index, result: this.pop(index) });
      }
      const previousNode = this.get(index - 1);
      if (previousNode?.next) {
        const removed = previousNode.next;
        if (removed) {
          previousNode.next = removed.next;
          this.length--;
        }
      }
    }
    return removedNodes;
  }

  toArrayOfNodes(): LinkedListNode[] {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  toArrayOfValues(): any[] {
    const values = [];
    let currentNode = this.head;
    while (currentNode) {
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return values;
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}
