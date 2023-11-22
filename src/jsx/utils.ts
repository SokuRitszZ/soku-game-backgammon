export const baseTop = (i: number) => i ? 10 : 0;

export const minus = (i: number) => i ? -1 : 1;

const OFFSET_NUMBER = [0, 5, 9, 12, 14, 15, 16];

export const offsetTop = (i: number, y: number) => {
  const findIndex = OFFSET_NUMBER.findLastIndex(x => y >= x);
  const offset = findIndex * .5 + (y - OFFSET_NUMBER[findIndex]);
  return minus(i) * offset;
};

export const offsetEndTop = (i: number, y: number) => {
  const offset = (y - 2 * (1 - i)) / 3;
  return minus(1 - i) * offset;
};
