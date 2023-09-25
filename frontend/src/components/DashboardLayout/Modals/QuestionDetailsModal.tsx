import { 
  Box,
  Stack,
  TextField,
  Modal,
} from '@mui/material';
type QuestionDetailsModalProps = {
    questionDetailsOpen: boolean,
    title: string,
    description: string,
    questionsDetailsCloseHandler: Function,
}
const QuestionDetailsModal = (props: QuestionDetailsModalProps) => {
    const {
        questionDetailsOpen,
        questionsDetailsCloseHandler,
        title,
        description
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
                maxHeight: 300,
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
              value={description}
              multiline
              maxRows={5}
            />
          </Stack>  
        </Box>
      </Modal>
    );
};

export default QuestionDetailsModal;