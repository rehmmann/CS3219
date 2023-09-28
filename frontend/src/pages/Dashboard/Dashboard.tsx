// Import react
import React, { useState } from 'react';

// Import MUI
import { 
  Stack,
} from '@mui/material';

// Import types
import { Question } from '../../utils/types';

// Import components
import AddQuestionModal from '../../components/DashboardLayout/Modals/AddQuestionModal';
import QuestionDetailsModal from '../../components/DashboardLayout/Modals/QuestionDetailsModal';
import QuestionsTable from '../../components/DashboardLayout/QuestionsTable';
import UserCard from '../../components/User/UserCard';

// Import style
import './Dashboard.scss';

const Dashboard = () => {
  //----------------------------------------------------------------//
  //                          HOOKS                                 //
  //----------------------------------------------------------------//
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [questionDetailsOpen, setQuestionDetailsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  //----------------------------------------------------------------//
  //                         HANDLERS                               //
  //----------------------------------------------------------------//
  const handleClickQuestion = (e: React.FormEvent, question: Question) => {
    e.preventDefault();
    setQuestionDetailsOpen(true);
    setTitle(question.title);
    setDescription(question.description);
  }
  const questionsDetailsCloseHandler = () => {
    setTitle('');
    setDescription('');
    setQuestionDetailsOpen(false);
  }

  //----------------------------------------------------------------//
  //                          RENDER                                //
  //----------------------------------------------------------------//
  return (
    <div>
      <AddQuestionModal
        questionModalOpen={questionModalOpen}
        setQuestionModalOpen={setQuestionModalOpen}
      />
      <QuestionDetailsModal
        questionDetailsOpen={questionDetailsOpen}
        questionsDetailsCloseHandler={questionsDetailsCloseHandler}
        title={title}
        description={description}
      />
      <Stack
        direction={'row'}
        justifyContent={'center'}
        sx={{
          paddingTop: 5,
          width: '100%',
          height: '60%',
        }}
      >
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          spacing={5}
          sx={{
            width: '85%',
          }}
        >
          <UserCard />
          <Stack
            direction={'column'}
            width={'70%'}
            spacing={3}
          >
            <QuestionsTable
              setQuestionModalOpen={setQuestionModalOpen}
              handleClickQuestion={handleClickQuestion}
            />
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
export default Dashboard;