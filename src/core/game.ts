import { Game, GameImpl } from '@soku-games/core';
import { Snapshot, StepResult } from './types.ts';

@GameImpl('backgammon')
export class BackgammonGame extends Game {
  toString(): string {
    return `${this.data.pieces.map(x => `${x[0].length} ${x[1].length}`).join(' ')}`;
  }

  allowed = true;

  isAllowed(): boolean {
    return this.allowed;
  }

  data: Snapshot = {
    dice: [],
    pieces: Array.from(
      { length: 2 },
      () => Array.from(
        { length: 26 },
        () => <number[]>[],
      ),
    ),
    turn: -1,
  };

  __end(reason: string): void {
    console.log(`BackgammonGame over!: ${reason}`);
  }

  __prepare(strData: string): void {
    'i,x|i,x|... j,y|j,y|...\nd1 d2 d3 d4\nturn';
    const [posStr, diceStr, turn] = strData.split('\n');

    // turn
    this.data.turn = +turn;

    // posLists
    const posLists = posStr.split(' ').map(
      (str: string) => str.split('|').map(
        (str: string) => str.split(',').map(Number),
      ),
    );
    posLists.forEach(
      (posList, i) => posList.forEach(
        ([j, x]) => {
          this.data.pieces[i][x].push(j);
        },
      ),
    );

    // dices
    this.data.dice = diceStr.split(' ').map(Number);
  }

  __start(): void {
    console.log('Backgammon Game Start!');
  }

  __step(stepStr: string): void | StepResult {
    if (/^v[0-1][0-9a-p][0-9a-p]$/.test(stepStr)) {
      const [i, f, t] = stepStr.split('').slice(1).map(x => parseInt(x, 36));

      if (!this.data.pieces[i][f].length!) return ;
      this.data.pieces[i][t].push(this.data.pieces[i][f].pop()!);
      const j = 1 - i;
      const home = j * 25;
      if (this.data.pieces[j][t].length === 1)
        this.data.pieces[j][home].push(this.data.pieces[j][t].pop()!);

      // consume dice
      let index = this.data.dice.findIndex(x => x === Math.abs(f - t));
      if (!~index)
        index = this.data.dice.findIndex(x => x === Math.max(...this.data.dice));
      this.data.dice.splice(index, 1);
    }
    else if (/^dp([1-6]{2}|[1-6]{4})$/.test(stepStr)) {
      // change dice & pass
      this.data.dice = stepStr.split('').slice(2).map(Number);
      this.data.turn ^= 1;
    }
    else if (/^d([1-6]{2}|[1-6]{4})$/.test(stepStr)) {
      // change dice
      this.data.dice = stepStr.split('').slice(1).map(Number);
    }

    return stepStr;
  }

  __isStepValidFormat(stepStr: string): string {
    return /^v[0-1][0-9a-p][0-9a-p]$/.test(stepStr) ? '' : 'it\'s not moving';
  }
}
