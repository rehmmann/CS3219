import Divider from '@mui/material/Divider';
import RefreshIcon from '@mui/icons-material/Refresh';

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
  title: string | null,
  complexity: string | null,
  description: string | null,
}

const QuestionBox = (props: QuestionBoxProps) => {
  const { title, complexity, description } = props;

  const resetQuestion = () => {
    console.log("hello world");
  }

  return (
    <div style={{height:'95%', width:'30%', backgroundColor:'white',}}>
      <div style={{margin:'3rem', textAlign:'start'}}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <h2 style={{fontWeight:'600'}}>{title}</h2>
          <RefreshIcon style={{fontSize:'1.3rem', cursor:'pointer'}} onClick={resetQuestion}/>
        </div>
        <h6 style={{fontWeight:'600', color:getDifficultyColorCode(complexity)}}>{complexity}</h6>
        <Divider light={true} style={{background:'grey', marginTop:'1rem'}}/>
        <p style={{fontWeight:'500', whiteSpace:'pre-line', marginTop:'3rem'}}>{description}</p>
      </div>
    </div>
  );
};
export default QuestionBox;