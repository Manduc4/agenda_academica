export const numberToArray = (value: number) => {
  const array: number[] = [];
  for (let i = 0; i <= value; i++) {
    array.push(i);
  }
  return array;
};
