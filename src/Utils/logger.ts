import { ToPrint } from "Types/logger";

export const printMatrix = ({ message, matrix, vector }: ToPrint) => {
  if (message) {
    console.log(message);
  }
  if (matrix && matrix.length <= 25) {
    console.table(matrix);
  }
  if (vector) {
    console.log(vector);
  }
};
