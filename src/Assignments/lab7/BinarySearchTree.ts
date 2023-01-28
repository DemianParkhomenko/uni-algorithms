import { BinarySearchTreeNode } from "./BinarySearchTreeNode";

export class BinarySearchTree<T> {
  private root: BinarySearchTreeNode<T> | null;
  public numberEndsWithThree = 0;

  constructor(root?: T | null, valuesToPut?: Array<T>) {
    if (root) {
      this.root = new BinarySearchTreeNode(root);
    } else {
      this.root = null;
    }
    if (valuesToPut) {
      for (const value of valuesToPut) {
        this.put(value);
      }
    }
  }

  public find(x: T): BinarySearchTreeNode<T> | null {
    let current = this.root;
    while (current != null) {
      if (x < current.data) {
        if (current.left == null) {
          return current;
        }
        current = current.left;
      } else if (x > current.data) {
        if (current.right == null) {
          return current;
        }
        current = current.right;
      } else {
        return current;
      }
    }
    return null;
  }

  public put(value: T): void {
    const newNode = new BinarySearchTreeNode(value);
    if (this.root == null) {
      this.root = newNode;
    } else {
      const parent = this.find(value);
      if (parent) {
        if (value < parent.data) {
          parent.left = newNode;
          parent.left.parent = parent;
          return;
        } else {
          parent.right = newNode;
          parent.right.parent = parent;
          return;
        }
      }
    }
  }

  public inOrder(localRoot: BinarySearchTreeNode<T> | null = this.root): void {
    if (localRoot != null) {
      this.inOrder(localRoot.left);
      process.stdout.write(localRoot.data + " ");
      this.inOrder(localRoot.right);
    }
  }

  public task1(localRoot: BinarySearchTreeNode<T> | null = this.root) {
    if (localRoot != null) {
      this.task1(localRoot.left);
      if (typeof localRoot.data === "number") {
        if (localRoot.data.toString().at(-1) === "3") {
          this.numberEndsWithThree++;
        }
      }
      this.task1(localRoot.right);
    }
  }

  public task2(localRoot: BinarySearchTreeNode<T> | null = this.root) {
    let leftParity = 0;
    let rightParity = 0;

    const checkNode = (
      localRoot: BinarySearchTreeNode<T> | null,
      side?: string
    ) => {
      if (localRoot != null) {
        checkNode(localRoot.left, "l");
        if (typeof localRoot.data === "number" && localRoot.data % 2 === 0) {
          if (side === "l") {
            leftParity++;
          } else if (side === "r") {
            rightParity++;
          }
        }
        checkNode(localRoot.right, "r");
      }
    };

    checkNode(localRoot);
    if (localRoot != null) {
      if (leftParity === rightParity) {
        console.log(
          `Node with data ${
            this.find(localRoot.data)?.data
          } has equal number of parity elements on each branch`
        );
      }
      this.task2(localRoot.left);
      this.task2(localRoot.right);
    }
  }
}
/*
        7
      /   \
     5    20 
     /\   / \
    3  6 17  31
        /     \
      10       32
               */
const lab7 = () => {
  const tree = new BinarySearchTree(7, [20, 5, 17, 10, 3, 31, 32, 6]);
  console.log("Elements in the tree:");
  tree.inOrder();
  console.log("\nTask1. Number of elements end with three:");
  tree.task1();
  console.log(tree.numberEndsWithThree);
  console.log("Task2");
  tree.task2();
};

lab7();
