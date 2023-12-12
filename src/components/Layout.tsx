import Field from './Field';
import GameOver from './GameOver';
import Confetti from '../assets/animation/Confetti';
import { StateProvider, useGameState } from './StateProvider';

export default function Game() {
  const gameState = useGameState();
  return (
    <StateProvider>
      <Field />
      <GameOver /> && {gameState.isOver}
    </StateProvider>
  );

  if (gameState.state === GameStateKind.Finished) {
    return (
      <>
        <Field />
        <GameOver />
        <Confetti />
      </>
    );
  }

  return (
    <>
      <Field />
    </>
  );
}
