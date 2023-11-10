import { Player, PlayerValues, WinnerType } from '../logic/tictactoe';
import TryAgain from './TryAgain';

interface GameOverProps {
  winner: string;
  activePlayer?: PlayerValues;
  resetGame: () => void;
}

function GameOver({ winner, activePlayer, resetGame }: GameOverProps) {
  console.log(activePlayer);
  let status = 'Winner is';
  let transformmedWinner;
  if (winner === WinnerType.Draw) {
    status = 'EVEN';
    transformmedWinner = 'NO ONE WINS';
    // переделать ниже
  } else if (winner === WinnerType.Player) {
    if (activePlayer === Player.Cross) {
      transformmedWinner = 'X';
    } else {
      transformmedWinner = '❤️';
    }
  }

  const modalBodyClass =
    winner === 'NONE'
      ? 'modal-body container'
      : 'modal-body container confetti-container confetti';
  return (
    <>
      <div className='modal'>
        <div className='modal-backdrop'></div>
        <div className={modalBodyClass}>
          <div className='text-emphasize bounce-in-left'>{status}</div>
          <div className='text-emphasize bounce-in-right'>
            {transformmedWinner}
          </div>
          <TryAgain origin='fromGameOver' resetGame={resetGame} />
        </div>
      </div>
    </>
  );
}

export default GameOver;
