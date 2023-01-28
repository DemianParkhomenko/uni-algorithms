import {
  fulfilSquareArray,
  maxValueInArray,
  minValueInArray,
} from "../../Utils";

const taskWithInsertionSort = (arr: number[][]) => {
  let operationIns = 0;
  let temp;

  for (let column = 0; column < arr.length; column++) {
    for (let row = 1; row < arr.length - column; row++) {
      let k = row;
      while (k > 0 && arr[k - 1][column] < arr[k][column]) {
        operationIns++;
        temp = arr[k - 1][column];
        arr[k - 1][column] = arr[k][column];
        arr[k][column] = temp;
        --k;
      }
    }
    ``;
  }
  console.log(
    `Insertion sorting needs: ${operationIns.toLocaleString()} operation`
  );
};

const taskWithCountingSort = (arr: number[][]) => {
  let operationCount = 0;
  for (let column = 0; column < arr.length; column++) {
    const counterNumbers: any = new Array(11);
    for (let row = 0; row < arr.length - column; row++) {
      operationCount++;

      if (counterNumbers[arr[row][column]]) {
        counterNumbers[arr[row][column]] += 1;
      } else {
        counterNumbers[arr[row][column]] = 1;
      }
    }

    let k = arr.length - column - 1;
    for (let i = minValueInArray; i <= maxValueInArray; i++) {
      while (counterNumbers[i] > 0) {
        operationCount++;
        arr[k][column] = i;
        k--;
        counterNumbers[i]--;
      }
    }
  }
  console.log(
    `Counting sorting needs: ${operationCount.toLocaleString()} operation`
  );
};

(() => {
  const initialArray = fulfilSquareArray(25);
  const initialArray2 = JSON.parse(JSON.stringify(initialArray)); //*deep copy of array
  console.log(
    `Initial square array with number of elements: ${(
      initialArray.length ** 2
    ).toLocaleString()}`
  );
  console.table(initialArray);

  console.time("Time for insertion sorting");
  taskWithInsertionSort(initialArray);

  console.timeEnd("Time for insertion sorting");
  console.table(initialArray);

  console.time("Time for counting sorting");
  taskWithCountingSort(initialArray2);

  console.timeEnd("Time for counting sorting");
  console.table(initialArray2);
})();
