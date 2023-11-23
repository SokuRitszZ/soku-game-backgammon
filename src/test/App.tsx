import { onMount } from 'solid-js';
import { buildGame, NewGenerator } from '@soku-games/core';

import 'virtual:uno.css';

import '../index';
import '../screen';

export const App = () => {
  let divRef: HTMLElement;

  onMount(() => {
    const game = buildGame({
      name: 'backgammon',
      plugins: [
        'backgammon-validator',
        {
          name: 'backgammon-screen',
          extra: {
            el: divRef,
            couldControl: [true, true],
            emit: (stepStr: string) => game?.step(stepStr),
          },
        },
      ],
    });

    game?.prepare(NewGenerator('backgammon').generate());
    game?.start();
  });

  return (
    <div class={'w-screen h-screen flex items-center justify-center'}>
      <div class={'aspect-ratio-video w1200px bg-black flex justify-center items-center'} ref={el => divRef = el} />
    </div>
  );
};