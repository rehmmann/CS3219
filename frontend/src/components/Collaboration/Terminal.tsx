// Import utils
import { codeOutputType } from '../../utils/types';

type TerminalProps = {
  output: codeOutputType | null,
}

const Terminal = (props: TerminalProps) => {
  const { output } = props;

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%', height:'40vh', backgroundColor:'white'}}>
      <div style={{width:'90%', height:'90%', textAlign:'left', overflow:'scroll'}}>
        {output ? 
          <p>{`Output: ${output.status.id == 3 ? output.stdout : output.stderr}`}</p> :
          <p>No output</p>
        }
      </div>
      {output && <p style={{height:'0', width:'90%', textAlign:'right'}}>{`Time taken: ${output.time}s`}</p>}
    </div>
  )
}

export default Terminal;