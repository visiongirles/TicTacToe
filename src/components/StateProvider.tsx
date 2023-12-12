import type { PropsWithChildren } from 'react';
import { createContext, useContext, useReducer } from 'react';
import {
  Game,
  Theme,
  Player,
  Winner,
  GameAction,
  Action,
  Mark,
} from '../types/game';

const newGame: Game = {
  theme: Theme.Hearts,
  isOver: false,
  activePlayer: Player.Cross,
  field: new Array(9).fill(null, 0, 8),
  winner: Winner.None,
};

export const GameStateContext = createContext(newGame);
export const GameDispatchContext = createContext({});

export function StateProvider({ children }: PropsWithChildren) {
  const [gameState, dispatch] = useReducer(gameReducer, newGame);

  return (
    <GameStateContext.Provider value={gameState}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  return useContext(GameStateContext);
}

export function useDispatch() {
  return useContext(GameDispatchContext);
}

function togglePlayer(activePlayer: Player): Player {
  return activePlayer === Player.Cross ? Player.Circle : Player.Cross;
}

function gameReducer(state: Game, action: Action): Game {
  switch (action.type) {
    case GameAction.ResetGame: {
      return newGame;
    }

    case GameAction.PlaceMark: {
      const updatedField = state.field.map((mark, index) => {
        if (index === action.index) {
          const updatedMark = action.activePlayer;
          return updatedMark;
        }
        return mark;
      });

      const updatedState: Game = {
        ...state,
        activePlayer: togglePlayer(action.activePlayer),
        field: updatedField,
        winner: calculateWinner(updatedField),
      };
      return updatedState;
    }
    default:
      return state;
    //   throw new Error(`No handler found for "${action}"`);
  }
}

const winningCombination = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

function calculateWinner(field: Mark[]): Winner {
  for (let index = 0; index < winningCombination.length; index++) {
    const [a, b, c] = winningCombination[index];
    if (field[a] && field[a] === field[b] && field[a] === field[c]) {
      return Winner.Player;
    }
  }

  if (field.every((item) => item !== null)) {
    return Winner.Even;
  }
  return Winner.None;
}
