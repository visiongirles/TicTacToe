import Field from './Field';
import GameOver from './GameOver';
// import Confetti from './Confetti';
import { useGameStateContext } from './StateProvider';

export default function Game() {
  const gameState = useGameStateContext();
  // const gameOver = <GameOver />;
  // const confetti = <Confetti />;
  return (
    <>
      <Field />
      {/* {gameState.isOver && <GameOver />} */}
      {/* {gameState.isOver ? <GameOver /> : <></>} */}
      {/* {gameOver && confetti && gameState.isOver} */}
    </>
  );
}
