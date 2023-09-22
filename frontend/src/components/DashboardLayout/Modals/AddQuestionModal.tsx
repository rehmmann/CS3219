// Import react
import React, { useState } from 'react';

// Import MUI
import { 
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Typography,
  Modal,
  Select,
  MenuItem,
} from '@mui/material';

// Import redux
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion } from '../../../redux/slices/questionSlice';
import { RootState } from '../../../redux/store';

type AddQuestionModalProps = {
    questionModalOpen: boolean,
    setQuestionModalOpen: Function
}

const AddQuestionModal = (props: AddQuestionModalProps) => {
    const { questionModalOpen, setQuestionModalOpen} = props;
    
    //----------------------------------------------------------------//
    //                          HOOKS                                 //
    //----------------------------------------------------------------//
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    const [complexity, setComplexity] = useState('');
    const [complexityError, setComplexityError] = useState(false);
    const [category, setCategory] = useState('');
    const [categoryError, setCategoryError] = useState(false);
    const questions = useSelector((state: RootState) => state.questions);
    
    //----------------------------------------------------------------//
    //                         HANDLERS                               //
    //----------------------------------------------------------------//
    const handleAddQuestionModalClose = () => {
        setQuestionModalOpen(false);
    }
    const handleAddQuestion = (e: React.FormEvent) => {
      e.preventDefault();
      setTitleError(!title);
      setDescriptionError(!description);
      setComplexityError(!complexity);
      setCategoryError(!category);
      if (!title || !description || !complexity || !category) return;
      const date = new Date();
      dispatch(addQuestion({ 
        id: String(questions.data.length + 1),
        title,
        description,
        category,
        complexity,
        createdAt: date.toLocaleDateString('en-gb'),
        updatedAt: date.toLocaleDateString('en-gb'),
        createdBy: "USER1"
      }))
      setTitle('');
      setDescription('');
      setComplexity('');
      setCategory('');
      setQuestionModalOpen(false);
    };

    //----------------------------------------------------------------//
    //                          RENDER                                //
    //----------------------------------------------------------------//
    return (
      <Modal
        open={questionModalOpen}
        onClose={handleAddQuestionModalClose}
      >
        <Box 
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
          }}
          component="form"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{paddingTop: 2, paddingBottom: 2}}>
            Create Question
          </Typography>
          <form onSubmit={handleAddQuestion}>
            <FormControl sx={{ width: '100%'}}>
              <Stack spacing={5} sx={{backgroundColor: 'transparent'}}>
                <TextField 
                  id="title"
                  label="Title"
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                  error={titleError}
                  required
                />
                <TextField
                  id="description"
                  label="Description"
                  sx={{ maxHeight: 300 }}
                  onChange={e => setDescription(e.target.value)}
                  value={description}
                  error={descriptionError}
                  required
                  multiline
                  maxRows={5}
                />
                <FormControl>
                  <InputLabel 
                    id="complexity-label"
                    required
                    error={complexityError}
                  >
                    Complexity
                  </InputLabel>
                  <Select
                    id="complexity"
                    label="Complexity"
                    value={complexity}
                    onChange={e => setComplexity(e.target.value)}
                    error={complexityError}
                    required
                  >
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="hard">Hard</MenuItem>
                  </Select>
                </FormControl>
                <TextField 
                  id="category"
                  label="Category"
                  onChange={e => setCategory(e.target.value)}
                  value={category}
                  error={categoryError}
                  required
                />
              </Stack>
              
            </FormControl>
          </form>
          <Button
            sx={{ marginTop: 2, p: 2, width: '100%', textAlign: 'center', backgroundColor: 'transparent', "&:hover": {
              backgroundColor: "transparent"
            }}}
            disableRipple
            onClick={handleAddQuestion}
          >
            <IconButton 
              sx={{
                color: 'blue',
                backgroundColor: 'transparent',
                "&:hover": {
                  backgroundColor: "transparent",
                  color: 'lightblue'
              }}}
              disableRipple
            >
              Create
            </IconButton>
          </Button>
        </Box>
      </Modal>
  );
}

export default AddQuestionModal;