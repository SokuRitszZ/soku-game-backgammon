import { Accessor, children, createEffect, JSX, ParentProps } from 'solid-js';
import { store } from '../game.context.ts';
import { baseTop, offsetEndTop, offsetTop } from '../utils.ts';
import { from, id, setFrom, setId } from '../control.ts';

interface Props extends ParentProps {
  pieces: number[][];
  i: number;
}

export const PieceList = (props: Props) => {
  const c = children(() => props.children) as unknown as Accessor<HTMLDivElement[]>;

  const isInHome = (x: number) => props.i * 25 === x;
  const isInEnd = (x: number) => (1 - props.i) * 25 === x;
  const isTop = (stack: number[], y: number) => stack.length === y + 1;
  const couldControl = (stack: number[], x: number, y: number) => isTop(stack, y) && !isInEnd(x) && store()?.couldControl?.[props.i];

  createEffect(() => {
    props.pieces.forEach((pieceStack, x) => {
      pieceStack.forEach((i, y) => {
        const piece = c()[i - 1]!;
        piece.className = [
          'absolute box-border shadow-lg overflow-hidden duration-200',
          'border-2 border-black border-dashed',
          props.i ? 'bg-#800' : 'bg-#ddd',
          couldControl(pieceStack, x, y) ? 'cursor-pointer hover:black_shadow' : 'pointer-events-none',
          from() === x && props.i === id() && isTop(pieceStack, y) ? 'scale-120 border-blue border-1 border-solid' : '',
          !isInEnd(x) ? 'rounded-999' : '',
        ].join(' ');

        Object.assign(piece.style, {
          ...isInEnd(x) ? inEndStyle() : normalStyle(),
          ...isInEnd(x)
            ? inEndPos(props.i, y)
            : isInHome(x)
              ? inHomePos(props.i, y)
              : normalPos(x, y),
          'z-index': y + 10,
        });

        const handleClick = () => {
          setId(props.i);
          if (x === from())
            setFrom(-1);
          else
            setFrom(x);
        };
        
        piece.onclick = handleClick;
      });
    });
  });

  return c();
};

const inEndStyle = (): JSX.CSSProperties => {
  const { cell = 0 } = store();

  return {
    width: `${cell}px`,
    height: `${cell / 3}px`,
  };
};

const normalStyle = (): JSX.CSSProperties => {
  const { cell = 0 } = store();

  return {
    width: `${cell}px`,
    height: `${cell}px`,
  };
};

const inHomePos = (i: number, y: number): JSX.CSSProperties => {
  const { cell = 0 } = store();

  return {
    top: `${(baseTop(i) + offsetTop(i, y)) * cell}px`,
    left: `${6 * cell}px`,
  };
};

const inEndPos = (i: number, y: number): JSX.CSSProperties => {
  const { cell = 0 } = store();

  return {
    top: `${(baseTop(1 - i) + offsetEndTop(i, y)) * cell}px`,
    left: `${13 * cell}px`,
  };
};

const normalPos = (x: number, y: number): JSX.CSSProperties => {
  const { cell = 0 } = store();

  const top = (baseTop(+(x > 12)) + offsetTop(+(x > 12), y)) * cell;
  const left = (Math.abs(x - 12.5 | 0) + +(x <= 6 || x >= 19)) * cell;

  return {
    top: `${top}px`,
    left: `${left}px`,
  };
};