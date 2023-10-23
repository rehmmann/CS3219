import Divider from '@mui/material/Divider';
import { useContext } from 'react';
import { SocketContext } from '../../contexts';
import { Button } from '@mui/base';
import { Socket } from 'socket.io-client';
const getDifficultyColorCode = (difficulty: string | null) => {
  switch (difficulty) {
    case "Easy":
      return "#83DA58";
    case "Medium":
      return "#FFB800";
    case "Hard":
      return "#FF0000";
    default:
      return "#83DA58";
  }
}

type QuestionBoxProps = {
  title: string,
  complexity: string | null,
  description: string,
}

const QuestionBox = (props: QuestionBoxProps) => {
  const { title, complexity, description } = props;
  const soc = useContext<Socket | null>(SocketContext);
  const handleClick = () => {
    soc?.emit('join-room', {
      "otherUserId": "user2",
      "questionId": 3
    })
  }
  return (
    <div style={{height:'95%', width:'30%', backgroundColor:'white',}}>
      <Button
        onClick={handleClick}
      >
        PRESS ME
      </Button>
      <div style={{margin:'3rem', textAlign:'start'}}>
        <h2 style={{fontWeight:'600'}}>{title}</h2>
        <h6 style={{fontWeight:'600', color:getDifficultyColorCode(complexity)}}>{complexity}</h6>
        <Divider light={true} style={{background:'grey', marginTop:'1rem'}}/>
        <p style={{fontWeight:'500', whiteSpace:'pre-line', marginTop:'3rem'}}>{description}</p>
      </div>
    </div>
  );
};
export default QuestionBox;