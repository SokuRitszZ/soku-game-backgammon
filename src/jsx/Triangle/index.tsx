import { store } from '../game.context';
import { from, id, setFrom } from '../control.ts';
import style from './index.module.scss';

interface Props {
  dir: 'up' | 'dn';
  pos: [number, number];
  color: string;
  x: number;
}

export const Triangle = (props: Props) => {
  const { cell = 0 } = store();

  const handleClick = () => {
    if (from() !== -1) {
      store().emit?.(`v${id()}${from().toString(36)}${props.x.toString(36)}`);
      setFrom(-1);
    }
  };

  return (
    <div
      class={['cursor-pointer absolute duration-200', style['common'], style[`${props.dir}-triangle`], style[props.color]].join(' ')}
      style={{
        top: `${props.pos[0] * cell}px`,
        left: `${props.pos[1] * cell}px`,
        width: `${cell}px`,
        height: `${cell * 5}px`,
      }}
      onClick={handleClick}
    />
  );
};