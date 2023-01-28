export class LinkedListNode {
  value: any;
  next: LinkedListNode | null;
  constructor(value: any, next = null) {
    this.value = value;
    this.next = next;
  }
}
