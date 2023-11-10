import { makeObservable, observable, computed, action, flow } from 'mobx';

export type ObjectValues<T> = T[keyof T];

export const GameError = {
  None: 'none',
  NotValidIndex: 'not-valid-index',
  NotValidGameState: 'not-valid-game-state',
  IndexAlreadyFilled: 'index-already-filled',
} as const;

export type GameErrorValues = ObjectValues<typeof GameError>;

export const WinnerType = {
  Player: 'player',
  Draw: 'draw',
  None: 'none',
} as const;

export type WinnerTypeValues = ObjectValues<typeof WinnerType>;

export const Player = {
  Cross: 'cross',
  Circle: 'circle',
} as const;

export type PlayerValues = ObjectValues<typeof Player>;

export const GameStateKind = {
  NotStarted: 'not-started',
  Progress: 'progress',
  Finished: 'finished',
} as const;

export type GameStateKindValues = ObjectValues<typeof GameStateKind>;

interface GameState {
  state: GameStateKindValues;
  activePlayer?: PlayerValues;
  gameOverStatus?: WinnerTypeValues;
}

// type GameState = GameNotStarted | GameInProgress|  GameFinished;

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

export class TicTacToe {
  gameState: GameState = { state: GameStateKind.NotStarted };
  field: (PlayerValues | undefined)[] = Array(9);

  constructor() {
    makeObservable(this, {
      getState: computed,
      getField: computed,
      action: action,
      start: action,
      gameState: observable.ref,
      field: observable.ref,
    });
  }

  get getState(): GameState {
    return this.gameState;
  }

  get getField() {
    return this.field;
  }

  /**
   * Это функция, которая возращается текущий GameStateKind.
   */
  start() {
    // TODO: подумать
    this.gameState = {
      state: GameStateKind.Progress,
      activePlayer: Player.Cross,
    };
    this.field.fill(undefined);
  }

  /**
   * Это функция, которая возращается текущий GameStateKind.
   * @param {number} index - индекс массива для его отражения на игровом поле Field.
   */
  action(index: number): GameErrorValues {
    if (this.gameState.state !== GameStateKind.Progress) {
      return GameError.NotValidGameState;
    }
    if (index > 8 || index < 0) {
      return GameError.NotValidIndex;
    }

    // TODO: Проверить, чтобы не ломалось, если пользователь кликнул два раза на один квадратик
    if (this.field[index] !== undefined) {
      return GameError.IndexAlreadyFilled;
    }

    this.field[index] = this.gameState.activePlayer;
    const winner = this.getWinner();

    switch (winner) {
      case WinnerType.Player: {
        this.gameState = {
          state: GameStateKind.Finished,
          gameOverStatus: WinnerType.Player,
        };
        break;
      }

      case WinnerType.Draw: {
        this.gameState = {
          state: GameStateKind.Finished,
          gameOverStatus: WinnerType.Draw,
        };
        break;
      }

      case WinnerType.None: {
        this.gameState = {
          state: GameStateKind.Progress,
          activePlayer:
            this.gameState.activePlayer === Player.Cross
              ? Player.Circle
              : Player.Cross,
        };
        break;
      }
    }
    return GameError.None;
  }

  getWinner(): WinnerTypeValues {
    for (let index = 0; index < winningCombination.length; index++) {
      const [a, b, c] = winningCombination[index];
      if (
        this.field[a] &&
        this.field[a] === this.field[b] &&
        this.field[a] === this.field[c]
      ) {
        return WinnerType.Player;
      }
    }

    if (this.field.every((item) => item !== undefined)) {
      return WinnerType.Draw;
    }
    return WinnerType.None;
  }
}
