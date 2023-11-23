import { GamePluginImpl, GamePlugin, LifeCycle } from '@soku-games/core';
import { clamp, parseInt } from 'lodash-es';
import { BackgammonGame } from './game';

@GamePluginImpl('backgammon-validator')
export class BackgammonValidator extends GamePlugin {
  bindGame(game: BackgammonGame): void {
    game.checkStep((stepStr) => {
      // 合法的 turn
      const [, id] = stepStr.split('').map(x => parseInt(x, 36));
      return id !== game.data.turn ? 'it\'s not the valid turn.' : '';
    });

    game.checkStep((stepStr) => {
      // 合法的移动：家里还有人没出来，就不能移动其他地方的棋子
      const [, i, f] = stepStr.split('').map(x => parseInt(x, 36));
      const home = i * 25;
      const invalid = game.data.pieces[i][home].length > 0 && f !== home;

      return invalid ? 'there\'s some pieces in home.' : '';
    });

    game.checkStep((stepStr) => {
      // 合法的移动：不能把棋子移到目标位置上有 > 1 个对手的位置（非终点）
      const [, i, , t] = stepStr.split('').map(x => parseInt(x, 36));
      const j = 1 - i;
      const target = j * 25;
      const invalid = t !== target && game.data.pieces[j][t].length > 1;
      return invalid ? 'there\'s 2 more enemies.' : '';
    });

    game.checkStep((stepStr) => {
      // 合法的移动：不能移动到点数不正确的地方（非终点）
      const [, i, f, t] = stepStr.split('').map(x => parseInt(x, 36));
      const target = (1 - i) * 25;
      const dist = t - f;
      const invalid = t !== target && !game.data.dice.find(d => d === dist * minus(i));
      return invalid ? 'there\'s not a die supported.' : '';
    });

    game.checkStep((stepStr) => {
      // 合法的移动：移动到终点时本区之外不能再有棋子
      const [, i,, t] = stepStr.split('').map(x => parseInt(x, 36));
      const j = 1 - i;
      const target = j * 25;
      const out = Array.from({ length: 26 }, (_, i) => i).filter(x => i ? x > 6 : x < 18);
      const invalid = t === target && out.find(stackI => game.data.pieces[i][stackI].length > 0);
      return invalid ? 'there\'s another way exists piece.' : '';
    });

    game.checkStep((stepStr) => {
      // 合法的移动：移动到终点时如果有恰好的点数必须优先移动，否则是最外层的棋子而且最大的点数可以大于等于
      const [, i, f, t] = stepStr.split('').map(x=> parseInt(x, 36));
      const j = 1 - i;
      const target = j * 25;
      const pieces = game.data.pieces[i];
      const dice = game.data.dice;
      const isOutside = (i ? pieces.findLastIndex(stack => stack.length > 0) : pieces.findIndex(stack => stack.length > 0)) === f;
      const dist = (t - f) * minus(i);
      // 必须要恰好，如果没有恰好，就要找有没有其他恰好，如果真的没有了，就才再去找最外层
      const invalid = dice.find(x => x === dist)
        ? false
        : game.data.dice.find(x => {
          const come = target - minus(i) * x;
          return pieces[come].length && f !== come;
        })
          ? true
          : isOutside
            ? Math.max(...dice) < dist
            : true;

      return invalid ? 'there\'s not a die supported.' : '';
    });

    let isGameOver = false;

    game.subscribe(LifeCycle.AFTER_STEP, (stepStr: string) => {
      // 检查游戏是否结束
      if (stepStr[0] !== 'v') return ;

      const [, i] = stepStr.split('').map(Number);
      const isOver = Array.from({ length: 25 }, (_, index) => i + index).every(stackI => game.data.pieces[stackI].length === 0);
      if (!isOver)
        return ;
      isGameOver = true;
      game.end(`${i} win`);
    });

    game.subscribe(LifeCycle.AFTER_STEP, () => {
      // 检查是否轮到下一个人
      if (isGameOver) return ;
      const dice = game.data.dice;
      if (dice.length > 0) return ;
      const newDice = generateDice();
      setTimeout(() => {
        game.forceStep(`dp${newDice.join('')}`);
      });
    });

    const invalid = (stepStr: string) => game['stepCheckChain'].find((fn: (str: string) => string) => !!fn(stepStr));

    game.subscribe(LifeCycle.AFTER_STEP, () => {
      // 是否需要跳过
      if (isGameOver) return ;
      const dice = game.data.dice;
      if (dice.length === 0) return ;

      const turn = game.data.turn;
      const piece = game.data.pieces[turn];
      const shouldPass = dice.every(
        d => {
          const someoneCouldGo = piece.find((stack, x) => {
            if (!stack.length) return false;
            const f = x;
            const t = clamp(f + minus(turn) * d, 0, 25);
            const stepStr = 'v' + [turn, f, t].map(x => x.toString(36)).join('');
            return !invalid(stepStr);
          });
          return !someoneCouldGo;
        },
      );
      if (!shouldPass) return ;
      setTimeout(() => {
        game.forceStep(`dp${generateDice().join('')}`);
      });
    });
  }
}

const minus = (i: number) => i === 0 ? 1 : -1;

const generateDice = () => {
  const dice = Array.from({ length: 2 }, () => Math.random() * 6 + 1 | 0);
  if (dice[0] === dice[1]) dice.push(...dice);

  return dice;
};


