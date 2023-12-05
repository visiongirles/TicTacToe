import Field from '../components/Field';

export type ObjectType<T> = T[keyof T];

export const Theme = {
  Classic: 'classic',
  Hearts: 'hearts',
} as const;

export type ThemeType = ObjectType<typeof Theme>;

export const Player = {
  Cross: 'cross',
  Circle: 'circle',
} as const;

export type PlayerType = ObjectType<typeof Player>;

export const Mark = {
  Player: Player,
  Empty: 'empty',
} as const;

export type MarkType = ObjectType<typeof Mark>;

export const Winner = {
  Player: Player,
  Even: 'even',
} as const;

// const player: PlayerType = Player.Circle;

export type WinnerType = ObjectType<typeof Winner>;

export const GameAction = {
  ResetGame: 'reset-game',
  PlaceMark: 'place-mark',
  ChooseTheme: 'choose-theme',
} as const;

export type GameActionType = ObjectType<typeof GameAction>;

interface Game {
  theme: ThemeType;
  isOver: boolean;
  isActivePlayer: PlayerType;
  field: MarkType[];
  winner?: WinnerType;
  winningCombination: number[][];
}

// TODO: from ArticSpaceCat - "Можно еще типизировать будет default, так чтобы былап ошибка, если не обработал тип в union"

type Action = { type: GameActionType };
type ResetGameAction = Action;
type PlaceMarkAction = { activePlayer: PlayerType; index: number } & Action;
type ChooseThemeAction = Action;

export type GameActions = ResetGameAction | PlaceMarkAction | ChooseThemeAction;

//
export default function gameReducer(state: Game, action: GameActions): Game {
  switch (action.type) {
    case GameAction.ResetGame: {
      return newGame;
    }

    case GameAction.PlaceMark: {
      if ('activePlayer' in action) {
        const updatedState: Game = {
          ...state,
          isActivePlayer:
            action.activePlayer === Player.Circle
              ? Player.Cross
              : Player.Circle,
          field: [action.index],
        };
      }
    }
    default:
      throw new Error(`No handler found for "${action.type}"`);
  }
}

export const newGame: Game = {
  theme: Theme.Hearts,
  isOver: false,
  isActivePlayer: Player.Cross,
  field: new Array(9).fill(Mark.Empty, 0, 8),
  winningCombination: [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ],
};
