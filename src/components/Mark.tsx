import cross from '../assets/images/cross.svg';
import heart from '../assets/images/heart.svg';
// import { Player, PlayerValues } from '../logic/tictactoe';

interface MarkProps {
  content: undefined;
  onMarkClick: () => void;
}
function Mark() {
  return <></>;
}
// function Mark({ content, onMarkClick }: MarkProps) {
//   const buttonStyle = 'btn';
//   let buttonContent;
//   let imageSource;
//   if (content === Player.Cross) {
//     imageSource = cross;
//     buttonContent = <img src={imageSource} alt={content} />;
//   } else if (content === Player.Circle) {
//     imageSource = heart;
//     buttonContent = (
//       <img
//         src={imageSource}
//         alt={content}
//         style={{ fill: 'red', scale: '1.4' }}
//       />
//     );
//   } else {
//     buttonContent = '';
//   }

//   return (
//     <button className={buttonStyle} onClick={onMarkClick}>
//       {buttonContent}
//     </button>
//   );
// }

// export default Mark;
