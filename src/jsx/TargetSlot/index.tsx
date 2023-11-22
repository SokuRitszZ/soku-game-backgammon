import { store } from '../game.context.ts';
import { from, id, setFrom } from '../control.ts';

interface Props {
  i: number;
}

export const TargetSlot = (props: Props) => {
  const { cell = 0 } = store();
  const handleClick = () => {
    if (from() !== -1) {
      store().emit?.(`v${id()}${from().toString(36)}${(25 - props.i * 25).toString(36)}`);
      setFrom(-1);
    }
  };

  return (
    <div
      class={'absolute cursor-pointer hover:black_shadow shadow-inset shadow-xl'}
      style={{
        width: `${cell}px`,
        height: `${cell * 5}px`,
        'background-color': props.i ? '#800' : '#ddd',
        top: `${(props.i ? 0 : 6) * cell}px`,
        left: `${13 * cell}px`,
      }}
      onClick={handleClick}
    />
  );
};