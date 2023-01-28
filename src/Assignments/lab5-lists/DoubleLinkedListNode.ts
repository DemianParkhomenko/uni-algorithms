export default class DoubleLinkedListNode {
  value: any;
  next: DoubleLinkedListNode | null;
  previous: DoubleLinkedListNode | null;

  constructor(value: any, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}
