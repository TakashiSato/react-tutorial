/* eslint-disable no-console */
/* eslint-disable sort-keys */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-ternary */
/* eslint-disable id-length */
/* eslint-disable import/prefer-default-export */

export const range = (n: number): number[] =>
  n < 0 ? [] : Array.from(Array(n), (_, i) => i);

type WinnerInfo = {
  winner: string | null;
  winSquares?: number[];
};

export const calculateWinner = (squares: (string | null)[]): WinnerInfo => {
  const boardSize = Math.sqrt(squares.length);

  const lines = Array<number[]>().concat(
    range(boardSize).map((row: number) =>
      range(boardSize).map((col: number) => row * boardSize + col),
    ),
    range(boardSize).map((row: number) =>
      range(boardSize).map((col: number) => row + col * boardSize),
    ),
    Array<number[]>(range(boardSize).map((x: number) => x * (boardSize + 1))),
    Array<number[]>(
      range(boardSize).map((x: number) => (x + 1) * (boardSize - 1)),
    ),
  );

  for (const line of lines) {
    if (line.every((x) => squares[x] === 'X')) {
      return {
        winner: 'X',
        winSquares: line,
      };
    } else if (line.every((x) => squares[x] === 'O')) {
      return {
        winner: 'O',
        winSquares: line,
      };
    }
  }

  if (squares.every((s) => s !== null)) {
    return {
      winner: 'Draw',
    };
  }

  return {
    winner: null,
  };
};
