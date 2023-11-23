import { createSignal, For } from 'solid-js';
import { LifeCycle, CustomEvent } from '@soku-games/core';
import { store } from '../game.context.ts';

'i-mdi-die-1 i-mdi-die-2 i-mdi-die-3 i-mdi-die-4 i-mdi-die-5 i-mdi-die-6';

export const Dice = () => {
  const { game, cell = 0 } = store();
  const [dice, setDice] = createSignal<number[]>([]);
  const [turn, setTurn] = createSignal<number>(-1);

  game?.subscribe(
    [LifeCycle.AFTER_START, LifeCycle.AFTER_STEP, CustomEvent.CHANGE_SNAPSHOT],
    () => setDice([...game?.data.dice ?? []]) && setTurn(game?.data.turn),
  );

  return (
    <>
      <For each={dice()}>
        {(die, i) => 
          <div
            class={`i-mdi-die-${die}`}
            style={{
              position: 'absolute',
              top: `${5 * cell}px`,
              left: `${(1 + i()) * cell}px`,
              width: `${cell}px`,
              height: `${cell}px`,
              'background-color': turn() ? '#800' : '#ddd',
            }}
          />
        }
      </For>
    </>
  );
};