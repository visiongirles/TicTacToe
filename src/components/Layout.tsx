import { useState } from 'react';
import Field from './Field';
import GameOver from './GameOver';
import { TicTacToe } from '../logic/tictactoe';
import { GameStateKind } from '../logic/tictactoe';
import Confetti from '../assets/animation/Confetti';
import { observer } from 'mobx-react-lite';

const Game = observer (({ game }) =>
  //Declaration of Hooks
  // Store the board's status

// const Game = observer(({ game }) => <span>Seconds passed: {timer.secondsPassed}</span>);

  // const [game, setGame] = useState(new TicTacToe());

  // Display the status of the game: the turn OR the winner
  let status;
  let field = game.fie
  let gameState = game.getState();
  const winner = game.getWinner();


  //Handle Click funtion - what happens when User clicks on the button
  function handleClick(index: number) {
    if (game.action(index)) {
      console.log(game);

      setGame(game);
      console.log(game);
      return;
    }
  }

  function handleResetGame() {
    game.start();
    console.log(game);
    setGame(game);
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
        <GameOver winner={winner} resetGame={handleResetGame} />
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
})

export default Game;
