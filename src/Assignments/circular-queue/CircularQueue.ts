export class CircularQueue<T> {
  private front: number;
  private rear: number;
  private maxLength: number;
  private items: Array<T | null>;

  constructor(numberOfElements: number, elements: Array<T>) {
    this.front = -1;
    this.rear = -1;
    this.maxLength = numberOfElements;
    this.items = Object.seal(new Array(this.maxLength).fill(null));
    if (elements.length) {
      this.push(...elements);
    }
  }

  getFront() {
    return this.front;
  }
  getRear() {
    return this.rear;
  }
  getMaxLength() {
    return this.maxLength;
  }

  getItemArrayClone() {
    return JSON.parse(JSON.stringify(this.items));
  }

  getItems() {
    const arr: Array<T> = [];
    if (this.isEmpty()) {
      return arr;
    }
    let temp = this.front;
    while (true) {
      temp = (temp + 1) % this.maxLength;
      arr.push(this.items[temp] as T);
      if (temp === this.rear) {
        break;
      }
    }
    return arr;
  }

  isFull(): boolean {
    return (
      this.front == this.rear + 1 ||
      (this.front == 0 && this.rear == this.maxLength - 1)
    );
  }

  isEmpty(): boolean {
    return this.front === -1 && this.rear === -1;
  }

  push(...elements: Array<T>) {
    for (const element of elements) {
      if (this.isFull()) {
        throw new RangeError(
          `List is overflowed! Element ${element} is not pushed.`
        );
      }
      if (this.front === -1) {
        this.front = 0;
      }
      this.rear = (this.rear + 1) % this.maxLength;
      this.items[this.rear] = element;
    }
  }

  unshift(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const deletedElement = this.items[this.front];
    this.items[this.front] = null;

    if (this.front === this.rear) {
      this.front = -1;
      this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.maxLength;
    }

    return deletedElement;
  }

  getItemByIndex(index: number) {
    if (index < 0 || index >= this.maxLength) {
      throw new RangeError(`index: ${index} is out of bounds.`);
    }
    return this.items[(this.front + index) % this.maxLength];
  }
}
