import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import QuestionBox from '../../components/Collaboration/QuestionBox';
import Editor from '../../components/Collaboration/Editor';
import ChatBox from '../../components/Collaboration/ChatBox';

// Import style
import './Collaboration.scss';

const dummyRoom = {
  "room": {
    "messages": [
      { 
        userId: '1', 
        message: 'hello there',
        date: 1632965300000
      },
      { 
        userId: '1', 
        message: 'how to do this string question',
        date: 1632965300001
      },
      { 
        userId: '2', 
        message: 'we pretty screwed',
        date: 1632965300002
      },
      { 
        userId: '1', 
        message: 'frfr',
        date: 1632965300003
      },
    ],
    "users": [
        "1",
        "2"
    ],
    "code": {
        "1": {
            "code": "",
            "language": "javascript"
        },
        "2": {
            "code": "",
            "language": "javascript"
        }
    },
    "roomId": "d75a0a5c208c155f8d4eaee429e1a02b",
    "questionId": 0
  }
};


const Collaboration = () => {
  const {data: questions} = useSelector((state: RootState) => state.questions);
  const currentUser = dummyRoom.room.users[0];
  const peerUser = dummyRoom.room.users[1];
  const code = dummyRoom.room.code[currentUser].code;
  const peerCode = dummyRoom.room.code[peerUser].code;
  const language = dummyRoom.room.code[currentUser].language;
  const peerLanguage = dummyRoom.room.code[peerUser].language;
  const question = questions[dummyRoom.room.questionId];
  const conversation = dummyRoom.room.messages;

  

  return (
    <div className="collaboration_container">
      <QuestionBox title={question.title} complexity={question.complexity} description={question.description}/>
      <div className="editor_container">
        <Editor defaultLanguage={language} defaultCode={code} isMainEditor={true}/>
        <Editor defaultLanguage={peerLanguage} defaultCode={peerCode} isMainEditor={false}/>
      </div>
      <ChatBox conversation={conversation} currentUser="1"/>
    </div>
    
  );
};
export default Collaboration;