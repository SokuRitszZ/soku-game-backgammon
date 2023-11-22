import { Generator, GeneratorImpl } from '@soku-games/core';

const INIT_0 = [
  [1, 1],
  [2, 1],
  [3, 12],
  [4, 12],
  [5, 12],
  [6, 12],
  [7, 12],
  [8, 17],
  [9, 17],
  [10, 17],
  [11, 19],
  [12, 19],
  [13, 19],
  [14, 19],
  [15, 19],
];

const INIT_1 = [
  [1, 24],
  [2, 24],
  [3, 13],
  [4, 13],
  [5, 13],
  [6, 13],
  [7, 13],
  [8, 8],
  [9, 8],
  [10, 8],
  [11, 6],
  [12, 6],
  [13, 6],
  [14, 6],
  [15, 6],
];

export class BackgammonGenerator extends Generator {
  generate(init0 = INIT_0, init1 = INIT_1, turn?: number, dice?: number[]): string {
    const posLists = [init0, init1];
    const posListStr = posLists.map(
      (posList) => posList.map(
        (pos) => pos.join(','),
      ).join('|'),
    ).join(' ');
    const nDice = dice ?? (() => {
      const dice = Array.from({ length: 2 }, () => Math.random() * 6 + 1 | 0);
      if (dice[0] === dice[1]) dice.push(...dice);
      return dice;
    })();
    const diceStr = nDice?.join(' ');
    const nTurn = turn ?? Math.random() * 2 | 0;
    return [posListStr, diceStr, nTurn].join('\n');
  }
}

GeneratorImpl('backgammon')(BackgammonGenerator);
