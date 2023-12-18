import Field from './Field';
import GameOver from './GameOver';
import { useGameStateContext } from './StateProvider';

export default function Game() {
  const gameState = useGameStateContext();
  console.log('Render Game.tsx');
  return (
    <>
      <Field />
      {gameState.isOver ? <GameOver /> : <></>}
    </>
  );
}
