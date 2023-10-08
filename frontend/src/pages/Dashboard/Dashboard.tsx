// Import react
import React, { useEffect, useState } from 'react';

// Import MUI
import { 
  Stack,
} from '@mui/material';

// Import types
import { Question, QuestionComplexity } from '../../utils/types';

// Import components
import AddQuestionModal from '../../components/DashboardLayout/Modals/AddQuestionModal';
import QuestionDetailsModal from '../../components/DashboardLayout/Modals/QuestionDetailsModal';
import QuestionsTable from '../../components/DashboardLayout/QuestionsTable';
import UserCard from '../../components/User/UserCard';

// Import utils
import { map } from 'lodash';

// Import style
import './Dashboard.scss';
import { useGetQuestionsQuery } from '../../redux/api';

const Dashboard = () => {
 
  //----------------------------------------------------------------//
  //                          HOOKS                                 //
  //----------------------------------------------------------------//
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [questionDetailsOpen, setQuestionDetailsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string[]>([]);
  const [complexity, setComplexity] = useState<QuestionComplexity>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  
  const { data: questionData }  = useGetQuestionsQuery();
  const [nextQuestionId, setNextQuestionId] = useState(0);
  useEffect(() => {
    if (questionData?.questions) {
      let nextQuestionIdTemp = 0;
      const questionsList = map(questionData.questions, q => {
        nextQuestionIdTemp = Math.max(q.questionId + 1, nextQuestionIdTemp);
        return {
          id: q.questionId,
          title: q.questionTitle,
          category: q.questionCategories,
          complexity: q.questionComplexity,
          description: q.questionDescription,
        }
      });
      setNextQuestionId(nextQuestionIdTemp);
      setQuestions(questionsList);
    }
  }, [questionData]);
  
  //----------------------------------------------------------------//
  //                         HANDLERS                               //
  //----------------------------------------------------------------//
  const handleClickQuestion = (e: React.FormEvent, question: Question) => {
    e.preventDefault();
    setQuestionDetailsOpen(true);
    setTitle(question.title);
    setDescription(question.description);
    setCategory(question.category);
    setComplexity(question.complexity);
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
        questions={questions}
        nextQuestionId={nextQuestionId}
      />
      <QuestionDetailsModal
        questionDetailsOpen={questionDetailsOpen}
        questionsDetailsCloseHandler={questionsDetailsCloseHandler}
        title={title}
        description={description}
        category={category}
        complexity={complexity}
      />
      <Stack
        direction={'row'}
        justifyContent={'center'}
        sx={{
          paddingTop: 5,
          width: '100%',
          height: '80%',
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
         <Stack
            direction={'column'}
            width={'fit-content'}
            spacing={3}
          >
              <UserCard />
            </Stack>
          <Stack
            direction={'column'}
            width={'70%'}
            spacing={3}
          >
            <QuestionsTable
              setQuestionModalOpen={setQuestionModalOpen}
              handleClickQuestion={handleClickQuestion}
              questions={questions}
            />
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
export default Dashboard;
