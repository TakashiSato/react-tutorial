/* eslint-disable no-nested-ternary */
/* eslint-disable sort-keys */
/* eslint-disable sort-imports */
/* eslint-disable no-continue */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-statements */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-ternary */
/* eslint-disable no-magic-numbers */
/* eslint-disable id-length */
import { FC, useState } from 'react';
import { calculateWinner } from 'utils/utils';
import Board from 'components/Board';

type Player = {
  X: 'X';
  O: 'O';
};

type Props = {
  boardSize: number;
};

type Step = {
  squares: (string | null)[];
  highlights: boolean[];
  row: number | null;
  col: number | null;
  turn: string;
};

type State = {
  history: Step[];
  stepNumber: number;
  xIsNext: boolean;
};

// Const useGame = (boardSize: number): []
const Game: FC<Props> = ({ boardSize }) => {
  const [game, setGame] = useState<State>({
    history: [
      {
        squares: Array<string | null>(boardSize * boardSize).fill(null),
        highlights: Array<boolean>(boardSize * boardSize).fill(false),
        row: null,
        col: null,
        turn: 'X',
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  });
  const [sortDecending, setSortDecending] = useState(true);

  const history = game.history.slice(0, game.stepNumber + 1);
  const current = history[game.stepNumber];
  const sqrs = current.squares.slice();
  const { winner, winSquares } = calculateWinner(sqrs);
  const nextPlayer = game.xIsNext ? 'X' : 'O';

  const highlights = current.highlights.slice();
  if (winSquares) {
    winSquares.forEach((n) => {
      highlights[n] = true;
    });
  }

  const handleClick = (num: number) => {
    if (winner || sqrs[num]) {
      return;
    }

    setGame((prevGame) => {
      sqrs[num] = nextPlayer;

      return {
        history: history.concat([
          {
            squares: sqrs,
            highlights,
            row: Math.floor(num / boardSize),
            col: num % boardSize,
            turn: nextPlayer,
          },
        ]),
        stepNumber: history.length,
        xIsNext: !prevGame.xIsNext,
      };
    });
  };

  const toggleHistory = () => {
    setSortDecending((prevSort) => !prevSort);
  };

  const jumpTo = (step: number) =>
    setGame((prevGame) => ({
      ...prevGame,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    }));

  const createHistoryButtons = () => {
    const drawHisotry = sortDecending
      ? game.history
      : [...game.history].reverse();

    return drawHisotry.map((step, move) => {
      const turnNumber = sortDecending ? move : game.history.length - move - 1;
      const desc =
        step.row !== null && step.col !== null
          ? `Go to move #${turnNumber} ${step.turn}: (${step.row}, ${step.col})`
          : 'Go to game start';
      console.log(desc);

      return (
        <li key={turnNumber}>
          <button
            className={game.stepNumber === turnNumber ? 'bold-button' : ''}
            onClick={() => jumpTo(turnNumber)}
          >
            {desc}
          </button>
        </li>
      );
    });
  };

  const createHistoryOrder = () => {
    if (sortDecending) {
      return <ol>{createHistoryButtons()}</ol>;
    }

    return <ol reversed>{createHistoryButtons()}</ol>;
  };

  return (
    <>
      <header className="game-header">
        <h1>Game</h1>
      </header>
      <div className="game">
        <div className="game-board">
          <Board
            boardSize={boardSize}
            squares={sqrs}
            highlights={highlights}
            onClick={handleClick}
          />
        </div>
        <div className="game-info">
          <div>
            {winner
              ? winner === 'Draw'
                ? 'Draw!'
                : `Winner: ${winner}`
              : `Next player: ${nextPlayer}`}
          </div>
          <div>
            <button key="toggle-history" type="button" onClick={toggleHistory}>
              Toggle History Order
            </button>
          </div>
          {createHistoryOrder()}
        </div>
      </div>
    </>
  );
};

export default Game;
