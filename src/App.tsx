import { useReducer, useContext } from 'react';
import Game from './components/Layout';
import {
  gameReducer,
  newGame,
  GameDispatchContext,
  GameStateContext,
} from './types/game';

export function useGameState() {
  return useContext(GameStateContext);
}

export function useTasksDispatch() {
  return useContext(GameDispatchContext);
}

function App() {
  const [gameState, dispatch] = useReducer(gameReducer, newGame);
  return (
    <GameStateContext.Provider value={gameState}>
      <GameDispatchContext.Provider value={dispatch}>
        <Game />
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

export default App;
