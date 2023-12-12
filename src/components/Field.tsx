import { GameAction } from '../types/game';
import Mark from './Mark';
import { useGameDispatchContext, useGameStateContext } from './StateProvider';
import TryAgain from './TryAgain';

function Field() {
  const rows = [0, 1, 2];
  const columns = [0, 1, 2];
  const squares = useGameStateContext().field;
  const dispatch = useGameDispatchContext();
  const activePlayer = useGameStateContext().activePlayer;
  // function handleClick()

  //TODO: ты можешь упростить жизнь вызывающему диспатч, не передавая его сырым,
  // а сразу функцию onMark, тогда в компоненте тебе будет достаточно вызвать только ее

  const cells = rows.map((row) => (
    <div className='row' key={row}>
      <>
        {columns.map((col) => (
          <div className='col' key={col}>
            <Mark
              content={squares[row * columns.length + col]}
              // onMarkClick={() => handleClick(row * columns.length + col)}
              onMarkClick={() =>
                dispatch({
                  type: GameAction.PlaceMark,
                  index: row * columns.length + col,
                  activePlayer: activePlayer,
                })
              }
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
        <TryAgain origin='fromField' resetGame={resetGame} />
      </div>
    </>
  );
}

export default Field;
