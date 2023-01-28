import { MinimalResult } from "Types";
import { fulfilSquareArray, promptNumber } from "Utils";

const findMin = (array: number[][]): MinimalResult => {
  let min = Number.MAX_VALUE;
  let row = -1;
  let column = -1;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] < min) {
        min = array[i][j];
        row = i;
        column = j;
      }
    }
  }
  return { value: min, row, column };
};

const changeRowAndColumn = (
  matrix: number[][],
  { row, column }: MinimalResult
) => {
  let countColumns = 0;
  let countRows = 0;
  while (countRows < matrix.length && countColumns < matrix[countRows].length) {
    if (countColumns === column) {
      countColumns++;
    }
    if (countRows === row) {
      countRows++;
    }
    [matrix[row][countColumns], matrix[countRows][column]] = [
      matrix[countRows][column],
      matrix[row][countColumns],
    ];
    countRows++, countColumns++;
  }
};

//* the main idea to work with one half of the array and sum of indexes
const changeElementsTask2 = (matrix: number[][]) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length / 2; j++) {
      if (i + j > i + i || i + j > matrix.length - 1) {
        [matrix[i][j], matrix[i][matrix.length - j - 1]] = [
          matrix[i][matrix.length - j - 1],
          matrix[i][j],
        ];
      }
    }
  }
};

const tableOnlySmallArray = (array: number[][]) => {
  if (array.length <= 10) {
    console.table(array);
  }
};

(async () => {
  const { size1 } = await promptNumber({
    name: "size1",
    message: "Enter size of matrix. Task 1:",
  });
  const array = fulfilSquareArray(size1);
  tableOnlySmallArray(array);
  console.log("TASK 1");

  const min = findMin(array);
  console.log("Minimal value in array: ", min);

  changeRowAndColumn(array, min);
  console.log("Change row with column");
  tableOnlySmallArray(array);
  console.log("TASK 2");
  changeElementsTask2(array);
  console.log("Changing elements(./task2.png)");
  tableOnlySmallArray(array);
})();
