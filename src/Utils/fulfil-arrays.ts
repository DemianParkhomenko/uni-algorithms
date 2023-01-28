export const minValueInArray = 0;
export const maxValueInArray = 20;

export const fulfilSquareArray = (length: number): number[][] => {
  const array: number[][] = [];
  for (let i = 0; i < length; i++) {
    array.push([]);
    for (let j = 0; j < length; j++) {
      array[i][j] =
        (Math.random() * (maxValueInArray - minValueInArray) +
          minValueInArray) >>
        0;
    }
  }
  return array;
};

export const fulfilArray = (length: number): number[] => {
  const array: number[] = [];
  for (let i = 0; i < length; i++) {
    array[i] =
      (Math.random() * (maxValueInArray - minValueInArray) + minValueInArray) >>
      0;
  }
  return array;
};
