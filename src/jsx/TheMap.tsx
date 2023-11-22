import { For } from 'solid-js';
import { Triangle } from './Triangle';
import { TargetSlot } from './TargetSlot';

export const TheMap = () => {
  return (
    <>
      <For each={Array.from({ length: 6 })}>
        {(_, i) =>
          <Triangle
            dir={'dn'}
            pos={[0, 1 + +(i() > 2) + i() * 2]}
            color={'white'}
            x={(6 - i()) * 2 - 1}
          />
        }
      </For>
      <For each={Array.from({ length: 6 })}>
        {(_, i) =>
          <Triangle
            dir={'dn'}
            pos={[0, +(i() > 2) + i() * 2]}
            color={'red'}
            x={(6 - i()) * 2}
          />
        }
      </For>
      <For each={Array.from({ length: 6 })}>
        {(_, i) =>
          <Triangle
            dir={'up'}
            pos={[6, 1 + +(i() > 2) + i() * 2]}
            color={'red'}
            x={14 + i() * 2}
          />
        }
      </For>
      <For each={Array.from({ length: 6 })}>
        {(_, i) =>
          <Triangle
            dir={'up'}
            pos={[6, +(i() > 2) + i() * 2]}
            color={'white'}
            x={13 + i() * 2}
          />
        }
      </For>
      <TargetSlot i={0} />
      <TargetSlot i={1} />
    </>
  );
};