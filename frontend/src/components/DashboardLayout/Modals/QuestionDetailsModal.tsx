import { 
  Box,
  FormControl,
  InputLabel,
  Select,
  Stack,
  TextField,
  MenuItem,
  Modal,
  OutlinedInput,
  Button
} from '@mui/material';
import { QuestionComplexity, QuestionCategories } from '../../../utils/types';
import { SelectChangeEvent } from '@mui/material/Select';
import { RootState } from '../../../redux/store';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQuestion, updateQuestion } from '../../../redux/slices/questionSlice';
import { toast } from 'react-toastify';
type QuestionDetailsModalProps = {
    questionDetailsOpen: boolean,
    title: string,
    description: string,
    complexity: QuestionComplexity,
    category: string[],
    setTitle: Function,
    setDescription: Function,
    setComplexity: Function,
    setCategory: Function,
    id: string,
    questionsDetailsCloseHandler: Function,
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const QuestionDetailsModal = (props: QuestionDetailsModalProps) => {
    const {
        questionDetailsOpen,
        questionsDetailsCloseHandler,
        title,
        description,
        complexity,
        category,
        id,
        setTitle,
        setDescription,
        setCategory,
        setComplexity
    } = props;
    const dispatch = useDispatch();
    const questions = useSelector((state: RootState) => state.questions);
    const questionTitleExists = (t: string) => {
      return questions.data.some((question) => question.title.toLowerCase() == t.toLowerCase() && question.id != id);
    }
    
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false)
    const [complexityError, setComplexityError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const handleQuestionDetailsClose = () => {
      setCategoryError(false);
      setTitleError(false);
      setDescriptionError(false);
      setComplexityError(false);
      questionsDetailsCloseHandler();
    }
    const handleDeleteQuestion = () => {
      dispatch(deleteQuestion(id))
      toast.success(`${title} deleted!`)
      questionsDetailsCloseHandler()
    }
    const handleUpdateQuestion = () => {
      setTitleError(!title);
      setDescriptionError(!description);
      setComplexityError(!complexity);
      setCategoryError(!category.length);
      if (!title || !description || !complexity || !category) return;
      if (questionTitleExists(title)) {
        setTitleError(true);
        toast.error('Question already exists!');
        return;
      }
      dispatch(updateQuestion({
        id,
        title,
        description,
        complexity,
        category,
      }))
      toast.success(`${title} updated!`)
      questionsDetailsCloseHandler();
    }
    const handleCategoryChange = (event: SelectChangeEvent<typeof category>) => {
      const {
        target: { value },
      } = event;
      setCategory(
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    return ( 
      <Modal
        open={questionDetailsOpen}
        onClose={handleQuestionDetailsClose}
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
            borderRadius: 5,
            p: 4
          }}
          component="form"
        >
          <Stack  spacing={5}>
            <TextField 
              id="title"
              label="Title"
              value={title}
              error={titleError}
              onChange={e => setTitle(e.target.value)}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
            />
            <TextField
              id="description"
              label="Description"
              error={descriptionError}
              onChange={e => setDescription(e.target.value)}
              sx={{ 
                maxHeight: 600,
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
              value={description}
              multiline
              maxRows={25}
            />
            <FormControl>
              <InputLabel
                id="complexity-label"
                required
              >
                Complexity
              </InputLabel>
              <Select
                error={complexityError}
                id="complexity"
                label="Complexity"
                value={complexity}
                onChange={e => setComplexity(e.target.value)}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                  },
                }}
                required
              >
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel
                  id="category-label"
                  required
                >
                  Category
              </InputLabel>
              <Select
                error={categoryError}
                labelId="Category"
                id="category"
                multiple
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                  },
                }}
                value={category}
                input={<OutlinedInput label="Category" />}
                MenuProps={MenuProps}
                onChange={handleCategoryChange}
              >
                {QuestionCategories.map((category) => (
                    <MenuItem
                      key={category}
                      value={category}
                    >
                      {category}
                    </MenuItem>
                  ))}
              </Select>
              <Stack
                direction={"row"}
                padding={2}
                spacing={2}
              >
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                  onClick={handleDeleteQuestion}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                  onClick={handleUpdateQuestion}
                >
                  Save
                </Button>
              </Stack>
              
            </FormControl>
          </Stack>  
        </Box>
      </Modal>
    );
};

export default QuestionDetailsModal;