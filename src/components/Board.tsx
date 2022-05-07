/* eslint-disable sort-imports */
/* eslint-disable max-statements */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-ternary */
/* eslint-disable no-magic-numbers */
/* eslint-disable id-length */
import { FC } from 'react';
import { range } from 'utils/utils';
import Square from 'components/Square';

type Props = {
  boardSize: number;
  squares: (string | null)[];
  highlights: boolean[];
  onClick: (num: number) => void;
};

const Board: FC<Props> = ({ boardSize, squares, highlights, onClick }) => {
  const renderSquare = (num: number) => (
    <Square
      value={squares[num]}
      highlight={highlights[num]}
      onClick={() => onClick(num)}
    />
  );

  return (
    <div>
      {range(boardSize).map((row: number) => (
        <div className="board-row" key={`row-${row}`}>
          {range(boardSize).map((col: number) =>
            renderSquare(row * boardSize + col),
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
