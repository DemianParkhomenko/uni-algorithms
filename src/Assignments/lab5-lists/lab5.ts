import { DoubleLinkedList } from "./DoubleLinkedList";
import { LinkedList } from "./LinkedList";

const task1 = () => {
  const numberToDelete = 5;
  console.log({ numberToDelete });

  const linkedList = new LinkedList();
  linkedList.push(1, 2, 3, 4, 5, 6, 7);
  const head = linkedList.getHead();
  const tail = linkedList.getTail();
  console.log("Task1. Initial list:", linkedList.toArrayOfNodes());

  if (head?.value === numberToDelete) {
    linkedList.shift(1);
  } else if (tail?.value === numberToDelete) {
    linkedList.pop(1);
  } else {
    let previousNode = head;
    while (previousNode?.next) {
      if (
        previousNode.next.value === numberToDelete &&
        previousNode.next.next
      ) {
        [previousNode.value, previousNode.next.next.value] = [
          previousNode.next.next.value,
          previousNode.value,
        ];
        previousNode.next = previousNode.next.next;
        break;
      }
      previousNode = previousNode.next;
    }
  }
  console.log("Result:", linkedList.toArrayOfNodes());
};

const task2 = () => {
  const numberToDelete = 5;
  console.log({ numberToDelete });

  const doubleLinkedList = new DoubleLinkedList();
  doubleLinkedList.push(1, 2, 3, 4, 5, 6, 7);
  console.log("Task2 initial list:", doubleLinkedList.toArray());

  doubleLinkedList.delete(numberToDelete);

  let arithmeticalMean = 0;
  for (const node of doubleLinkedList.generateForwardTraversing()) {
    arithmeticalMean += node.value;
  }
  arithmeticalMean /= doubleLinkedList.length;
  
  console.log(
    "Result:",
    doubleLinkedList.toArray(),
    "Arithmetical mean:",
    arithmeticalMean
  );
};

task1();
task2();
