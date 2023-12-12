export const enum Theme {
  Classic = 'classic',
  Hearts = 'hearts',
}

export const enum Player {
  Cross = 'cross',
  Circle = 'circle',
}

export type Mark = Player | null;

export const enum GameAction {
  ResetGame = 'reset game',
  PlaceMark = 'place mark',
  ChooseTheme = 'choose theme',
}

export interface Game {
  theme: Theme;
  isOver: boolean;
  activePlayer: Player;
  field: Mark[];
  winner: Winner;
}

export const enum Winner {
  Player = 'player',
  Even = 'even',
  None = 'none',
}

const placeMarkAction = (index: number, activePlayer: Player) =>
  ({
    type: GameAction.PlaceMark,
    index,
    activePlayer,
  } as const);

const resetGamekAction = () =>
  ({
    type: GameAction.ResetGame,
  } as const);

export type Action =
  | ReturnType<typeof placeMarkAction>
  | ReturnType<typeof resetGamekAction>;
