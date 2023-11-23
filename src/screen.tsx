import { GamePluginImpl, GamePlugin } from '@soku-games/core';
import { render } from 'solid-js/web';

import { App } from './jsx';
import { BackgammonGame } from './game';

// FIXME vite could not use decorator
export class BackgammonScreen extends GamePlugin {
  bindGame(game: BackgammonGame, extra?: {
    el: HTMLElement,
    couldControl: boolean[],
    emit: (stepStr: string) => void
  }): void {
    const el = extra?.el;
    if (el) {
      const ratio = {
        width: el.clientWidth,
        height: el.clientHeight,
      };
      render(() => <App couldControl={extra?.couldControl ?? []} emit={extra?.emit} game={game} ratio={ratio} />, el);
    }
  }
}

GamePluginImpl('backgammon-screen')(BackgammonScreen);
