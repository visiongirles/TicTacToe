import useWindowDimensions from '../utils/useWindowDimensions';
import Confetti from 'react-confetti';

//TODO: исправить безымянный экспорт
export default () => {
  const { width, height } = useWindowDimensions();
  console.log('Render Confetti.tsx');
  return <Confetti width={width} height={height} />;
};
