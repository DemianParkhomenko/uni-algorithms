import { LinkedList } from "../lab5-lists/LinkedList";
import { CircularQueue } from "./CircularQueue";

(() => {
  const queue = new CircularQueue(8, [1, 2, 3, 4]);
  const a = queue.getItemByIndex(0);
  const b = queue.getItemByIndex(1);
  const c = queue.getItemByIndex(2);
  const d = queue.getItemByIndex(2);
  const e = queue.getItemByIndex(3);
  try {
    queue.getItemByIndex(-1);
  } catch (e: any) {
    console.log("It is example of range errors");
    console.log(e);
  }
  queue.push(5, 6, 7, 8);
  console.log("Circular queue after push:", queue.getItems());
  while (!queue.isEmpty()) {
    queue.unshift();
  }
  console.log("Circular queue after unshift:", queue.getItems());
})();

(() => {
  const queue = new LinkedList();
  queue.push(1, 2, 3, 4, 5);
  console.log("Linked list for queue", queue.toArrayOfValues());
  queue.pop(1);
  queue.pop(1);
  queue.push(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
  console.log("Log element by index 2", queue.get(2));
  console.log(
    "Linked list for queue after some operations",
    queue.toArrayOfValues()
  );
})();
