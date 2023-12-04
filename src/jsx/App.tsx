import { BackgammonGame } from '../core/game.ts';
import { setStore } from './game.context';

import 'virtual:uno.css';
import { TheMap } from './TheMap.tsx';
import { Pieces } from './Pieces.tsx';
import { Dice } from './Dice';

interface Props {
  game: BackgammonGame;
  ratio: {
    width: number;
    height: number;
  };
  emit?: (stepStr: string) => void;
  couldControl: boolean[];
}

export const App = ({ game, ratio, emit, couldControl }: Props) => {
  const cell = Math.min(
    ratio.width / 14 | 0,
    ratio.height / 11 | 0,
  );
  setStore({
    game,
    emit,
    cell,
    couldControl,
  });

  return (
    <div
      class={'text-white relative bg-#e8ac77'}
      style={{
        width: `${cell * 14}px`,
        height: `${cell * 11}px`,
      }}
    >
      <Pieces i={0} />
      <Pieces i={1} />
      <TheMap />
      <Dice />
    </div>
  );
};