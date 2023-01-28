export class BinarySearchTreeNode<T> {
  data: T;
  left: BinarySearchTreeNode<T> | null;
  right: BinarySearchTreeNode<T> | null;
  parent: BinarySearchTreeNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}
