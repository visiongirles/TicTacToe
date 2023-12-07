import Field from './Field';
import GameOver from './GameOver';
import Confetti from '../assets/animation/Confetti';
import { useReducer } from 'react';
import gameReducer from '../logic/game';
import { newGame } from '../logic/game';

export default function Game() {
  // Declaration of Hooks
  const [state, dispatch] = useReducer(gameReducer, newGame);

  let field = game.getField;
  let gameState = game.getState;
  const winner = game.getWinner();

  if (gameState.state === GameStateKind.Finished) {
    return (
      <>
        <Field
          squares={field}
          handleClick={handleClick}
          resetGame={handleResetGame}
        />
        <GameOver
          winner={winner}
          activePlayer={game.gameState.activePlayer}
          resetGame={handleResetGame}
        />
        <Confetti />
      </>
    );
  } else {
    // TODO: переделать ниже
    status = 'Active player is ' + (gameState.activePlayer ? 'X' : '❤️');
  }

  return (
    <>
      <Field
        status={status}
        squares={field}
        handleClick={handleClick}
        resetGame={handleResetGame}
      />
    </>
  );
}
