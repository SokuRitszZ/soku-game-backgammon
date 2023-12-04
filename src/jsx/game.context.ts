import { createSignal } from 'solid-js';
import { BackgammonGame } from '../core/game.ts';

interface Store {
  emit?: (stepStr: string) => void;
  game: BackgammonGame;
  couldControl: boolean[];
  cell: number;
}

const [store, setStore] = createSignal<Partial<Store>>({});

export { store, setStore };
