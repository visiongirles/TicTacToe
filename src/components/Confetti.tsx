import useWindowDimensions from '../utils/useWindowDimensions';
import Confetti from 'react-confetti';

//TODO: исправить безымянный экспорт
export default () => {
  const { width, height } = useWindowDimensions();

  return <Confetti width={width} height={height} />;
};
