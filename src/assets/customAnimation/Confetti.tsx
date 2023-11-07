import useWindowDimensions from './useWindowDimensions';
import Confetti from 'react-confetti';

export default () => {
  const { width, height } = useWindowDimensions();

  return <Confetti width={width} height={height} />;
};
