import Field from './Field';
import GameOver from './GameOver';
import { TicTacToe } from '../logic/tictactoe';
import { GameStateKind } from '../logic/tictactoe';
import Confetti from '../assets/animation/Confetti';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const game = new TicTacToe();

const Game = observer(() => {
  //Declaration of Hooks
  // Store the board's status
  // Display the status of the game: the turn OR the winner

  useEffect(() => game.start(), []);
  let status;
  let field = game.getField;
  let gameState = game.getState;
  const winner = game.getWinner();

  //Handle Click funtion - what happens when User clicks on the button
  function handleClick(index: number) {
    if (game.action(index)) {
      return;
    }
  }

  function handleResetGame() {
    game.start();
  }

  if (gameState.state === GameStateKind.Finished) {
    status = 'GAME OVER';
    return (
      <>
        <Field
          status={status}
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
    status = 'Active player is ' + (gameState.state ? 'X' : '❤️');
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
});

export default Game;
