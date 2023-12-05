enum Theme {
  Classic = 'classic',
  Hearts = 'hearts',
}

enum Player {
  Cross = 'cross',
  Circle = 'circle',
}

function togglePlayer(activePlayer: Player): Player {
  return activePlayer === Player.Cross ? Player.Circle : Player.Cross;
}

type Mark = Player | null;

interface ResetGameAction {
  type: GameAction.ResetGame;
}

interface PlaceMarkAction {
  type: GameAction.PlaceMark;
  index: number;
  activePlayer: Player;
}

type Action = ResetGameAction | PlaceMarkAction;

enum GameAction {
  ResetGame = 'reset game',
  PlaceMark = 'place mark',
  ChooseTheme = 'choose theme',
}

interface Game {
  theme: Theme;
  isOver: boolean;
  activePlayer: Player;
  field: Mark[];
  winner: Winner;
}

enum Winner {
  Player = 'player',
  Even = 'even',
  None = 'none',
}

export default function gameReducer(state: Game, action: Action): Game {
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

export const newGame: Game = {
  theme: Theme.Hearts,
  isOver: false,
  activePlayer: Player.Cross,
  field: new Array(9).fill(null, 0, 8),
  winner: Winner.None,
};

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
