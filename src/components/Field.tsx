import { GameAction, Player } from '../types/game';
import Mark from './Mark';
import { useGameDispatchContext, useGameStateContext } from './StateProvider';
import TryAgain from './TryAgain';

function Field() {
  const gameStateContext = useGameStateContext();
  const dispatch = useGameDispatchContext();
  const squares = gameStateContext.field;
  const activePlayer = gameStateContext.activePlayer;
  console.log('Render Field.tsx');

  const rows = [0, 1, 2];
  const columns = [0, 1, 2];
  const status =
    'Active player is ' + (activePlayer === Player.Cross ? 'X' : '❤️');

  function onMark(row: number, col: number) {
    dispatch({
      type: GameAction.PlaceMark,
      index: row * columns.length + col,
      activePlayer: activePlayer,
    });
  }

  const cells = rows.map((row) => (
    <div className='row' key={row}>
      <>
        {columns.map((col) => (
          <div className='col' key={col}>
            <Mark
              content={squares[row * columns.length + col]}
              onMarkClick={() => onMark(row, col)}
            />
          </div>
        ))}
      </>
    </div>
  ));

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='h1'>{status}</div>
        </div>
        <>{cells}</>
        <TryAgain
          origin='fromField'
          resetGame={() =>
            dispatch({
              type: GameAction.ResetGame,
            })
          }
        />
      </div>
    </>
  );
}

export default Field;
