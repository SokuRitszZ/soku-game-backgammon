import { LifeCycle } from '@soku-games/core';
import { createSignal, For } from 'solid-js';
import { cloneDeep } from 'lodash-es';
import { store } from './game.context.ts';
import { PieceList } from './PieceList';

interface Props {
  i: number;
}

export const Pieces = (props: Props) => {
  const { game } = store();
  
  const [pieces, setPieces] = createSignal<number[][]>([]);
  game?.subscribe(LifeCycle.AFTER_START, () => setPieces(game?.data.pieces[props.i]));
  game?.subscribe(LifeCycle.AFTER_STEP, () => {
    // 这里必须使用 deep clone，因为 solid 会复用错误的数组
    const newArray = cloneDeep(game?.data.pieces[props.i]);
    setPieces(newArray);
  });

  const pieceIdList = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <>
      <PieceList pieces={pieces()} i={props.i}>
        <For each={pieceIdList}>
          {() => <div />}
        </For>
      </PieceList>
    </>
  );
};