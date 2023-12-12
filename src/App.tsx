import Game from './components/Game';
import { StateProvider } from './components/StateProvider';

function App() {
  return (
    <StateProvider>
      <Game />
    </StateProvider>
  );
}

export default App;
