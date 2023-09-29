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
} from '@mui/material';
import { QuestionComplexity } from '../../../utils/types';
type QuestionDetailsModalProps = {
    questionDetailsOpen: boolean,
    title: string,
    description: string,
    complexity: QuestionComplexity,
    category: string[],
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
    } = props;
    const handleQuestionDetailsClose = () => {
        questionsDetailsCloseHandler();
    }
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
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
              disabled
            />
            <TextField
              disabled
              id="description"
              label="Description"
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
                id="complexity"
                label="Complexity"
                value={complexity}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                  },
                }}
                required
                disabled
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
                labelId="Category"
                id="category"
                multiple
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                  },
                }}
                value={category}
                input={<OutlinedInput label="Category" />}
                MenuProps={MenuProps}
              >
                {category.map((c) => (
                  <MenuItem
                    key={c}
                    value={c}
                  >
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>  
        </Box>
      </Modal>
    );
};

export default QuestionDetailsModal;