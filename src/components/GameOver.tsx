import { Winner, Player, GameAction } from '../types/game';
import { useGameDispatchContext, useGameStateContext } from './StateProvider';
import TryAgain from './TryAgain';
import Confetti from './Confetti';

function GameOver() {
  const gameState = useGameStateContext();
  const dispatch = useGameDispatchContext();
  console.log('Render GameOver.tsx');
  let bannerText = '';
  const activePlayer = gameState.activePlayer;
  let activePlayerText = activePlayer === Player.Cross ? 'X' : '❤️';

  function onReset() {
    dispatch({ type: GameAction.ResetGame });
  }

  const winner = gameState.winnerState;
  switch (winner) {
    case Winner.Even:
      bannerText = 'EVEN';
      activePlayerText = 'NO ONE WINS';
      break;
    case Winner.Player:
      bannerText = `And the winner is`;
      activePlayerText = activePlayerText;
      break;
    case Winner.None:
      break;
  }

  return (
    <>
      <div className='modal'>
        <div className='modal-backdrop'></div>
        <div className='modal-body container'>
          <div className='text-emphasize bounce-in-left'>{bannerText}</div>
          <div className='text-emphasize bounce-in-right'>
            {activePlayerText}
          </div>
          <TryAgain origin='fromGameOver' resetGame={onReset} />
        </div>
      </div>
      {winner !== Winner.Even && <Confetti />}
    </>
  );
}

export default GameOver;
