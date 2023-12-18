import type { PropsWithChildren } from 'react';
import { Dispatch } from 'react';
import { createContext, useContext, useReducer } from 'react';
import {
  Game,
  Theme,
  Winner,
  Player,
  GameAction,
  Action,
  Mark,
} from '../types/game';

const newGame: Game = {
  theme: Theme.Hearts,
  isOver: false,
  activePlayer: Player.Cross,
  field: new Array(9).fill(null, 0, 9),
  winnerState: Winner.None,
};

// const something: Dispatch<Action>;

export const GameStateContext = createContext(newGame);
export const GameDispatchContext = createContext<Dispatch<Action>>(() => {});
export function StateProvider({ children }: PropsWithChildren) {
  const [gameState, dispatch] = useReducer(gameReducer, newGame);
  console.log('Render StateProvider.tsx');

  return (
    <GameStateContext.Provider value={gameState}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

export function useGameStateContext() {
  return useContext(GameStateContext);
}

export function useGameDispatchContext() {
  return useContext(GameDispatchContext);
}

// export

function togglePlayer(activePlayer: Player): Player {
  return activePlayer === Player.Cross ? Player.Circle : Player.Cross;
}

function gameReducer(state: Game, action: Action): Game {
  switch (action.type) {
    case GameAction.ResetGame: {
      return newGame;
    }

    case GameAction.PlaceMark: {
      let updatedPlayer = action.activePlayer;
      const updatedField = state.field.map((mark, index) => {
        if (index === action.index) {
          if (mark !== null) return mark;
          const updatedMark = action.activePlayer;
          updatedPlayer = togglePlayer(action.activePlayer);
          return updatedMark;
        }
        return mark;
      });

      const [updatedWinner, updatedIsOver] = getWinner(updatedField);

      if (updatedIsOver) {
        updatedPlayer = togglePlayer(updatedPlayer);
      }

      const updatedState: Game = {
        ...state,
        isOver: updatedIsOver,
        activePlayer: updatedPlayer,
        field: updatedField,
        winnerState: updatedWinner,
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

function getWinner(field: Mark[]): [Winner, boolean] {
  for (let index = 0; index < winningCombination.length; index++) {
    const [a, b, c] = winningCombination[index];
    if (field[a] && field[a] === field[b] && field[a] === field[c]) {
      return [Winner.Player, true];
    }
  }

  if (field.every((item) => item !== null)) {
    return [Winner.Even, true];
  }
  return [Winner.None, false];
}
