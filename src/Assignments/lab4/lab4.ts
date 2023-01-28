import { countingSortMatrix } from "../../../sorting";
import {
  fulfilSquareArray,
  maxValueInArray,
  minValueInArray,
  printMatrix,
} from "../../Utils";

const linearSearchWithSentinel = (matrix: number[][], target: number) => {
  let iterations = 0;
  const rows = matrix.length;
  const columns = matrix[rows - 1].length;
  const last = matrix[rows - 1][columns - 1];

  matrix[rows - 1][columns - 1] = target;

  let i = 0;
  while (matrix[Math.trunc(i / rows)][i % columns] != target) {
    i++;
    iterations++;
  }

  matrix[rows - 1][columns - 1] = last;

  console.log(`linearSearchWithSentinel needs: ${iterations} iterations`);
  const isFound = i < rows * columns - 1 || target === matrix.at(-1)?.at(-1);
  return isFound ? { row: Math.trunc(i / rows), column: i % columns } : null;
};

const binarySearchMatrix = (matrix: number[][], target: number) => {
  let iterations = 0;
  const rows = matrix.length;
  const columns = matrix[rows - 1].length;
  let left = 0;
  let right = rows * columns - 1;
  let mid;

  while (left != right) {
    mid = Math.ceil((left + right) / 2);
    if (matrix[Math.trunc(mid / rows)][mid % columns] > target) {
      right = mid - 1;
    } else {
      left = mid;
    }
    iterations++;
  }
  console.log(`\nbinarySearchMatrix needs: ${iterations} iterations`);

  if (matrix[Math.trunc(left / rows)][left % columns] === target) {
    return { row: Math.trunc(left / rows), column: left % columns };
  }

  return null;
};

const binarySearchMatrix2 = (matrix: number[][], target: number) => {
  const vector = [].concat(...(matrix as [][]));
  let left = 0;
  let right = vector.length - 1;
  let mid;
  let iterations = 0;

  while (left <= right) {
    iterations++;
    mid = Math.round((right - left) / 2 + left);
    if (vector[mid] === target) {
      console.log(`\nbinarySearchMatrix2 needs: ${iterations} iterations`);
      return {
        row: Math.trunc(mid / matrix.length),
        column: mid % matrix[matrix.length - 1].length,
      };
    }
    if (vector[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return null;
};

(() => {
  const searchedNumber = 235;
  const sizeForArray = 25;
  const initialArr = fulfilSquareArray(sizeForArray);
  console.log(`Array with ${(sizeForArray ** 2).toLocaleString()} items`);

  initialArr[Math.trunc(Math.random() * sizeForArray)][
    Math.trunc(Math.random() * sizeForArray)
  ] = searchedNumber;

  printMatrix({ matrix: initialArr, message: "Initial array" });

  console.time("linearSearchWithSentinel");
  const result = linearSearchWithSentinel(initialArr, searchedNumber);
  console.timeEnd("linearSearchWithSentinel");
  console.log({ result, searchedNumber });

  countingSortMatrix(
    initialArr,
    Math.abs(maxValueInArray) + Math.abs(minValueInArray)
  ); //* import from previous lab
  printMatrix({ matrix: initialArr, message: "Sorted initial array" });

  console.time("binarySearchMatrix");
  const result2 = binarySearchMatrix(initialArr, searchedNumber);
  console.timeEnd("binarySearchMatrix");
  console.log({ result2, searchedNumber });

  console.time("binarySearchMatrix2");
  const result3 = binarySearchMatrix2(initialArr, searchedNumber);
  console.timeEnd("binarySearchMatrix2");
  console.log({ result3, searchedNumber });
})();
