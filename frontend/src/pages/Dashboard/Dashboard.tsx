import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';

import { addQuestion } from '../../redux/slices/questionSlice';
import { 
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Paper,
  Toolbar,
  Typography,
  Modal,
  Select,
  MenuItem,
} from '@mui/material';

import { RootState } from '../../redux/store';
import { Question } from '../../utils/types';
import AddIcon from '@mui/icons-material/Add';

interface Column {
  id: 'title' | 'category' | 'complexity' | 'createdAt' | 'updatedAt' | 'createdBy';
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'title', label: 'Title', minWidth: 120 },
  { id: 'category', label: 'Category', minWidth: 120, align: 'center', },
  { id: 'complexity', label: 'Complexity', minWidth: 120, align: 'right', },
  { id: 'createdAt', label: 'Created', minWidth: 170, align: 'right', },
  { id: 'updatedAt', label: 'Updated', minWidth: 170, align: 'right', }, 
  { id: 'createdBy', label: 'Created By', minWidth: 150, align: 'right', }, 
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.questions);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [questionDetailsOpen, setQuestionDetailsOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [complexity, setComplexity] = useState('');
  const [complexityError, setComplexityError] = useState(false);
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);

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

  const handleClickQuestion = (e: React.FormEvent, question: Question) => {
    e.preventDefault();
    setQuestionDetailsOpen(true);
    setTitle(question.title);
    setDescription(question.description);
  }
  const handleQuestionDetailsClose = () => {
    setTitle('');
    setDescription('');
    setQuestionDetailsOpen(false);
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const handleAddQuestionModalClose = () => {
    setQuestionModalOpen(false);
  }

  return (
    <div className="dashboard_container">
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
              onChange={e => setTitle(e.target.value)}
              value={title}
              error={titleError}
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
              onChange={e => setDescription(e.target.value)}
              value={description}
              error={descriptionError}
              multiline
              maxRows={5}
            />
          </Stack>  
        </Box>
      </Modal>
      <div className="dashboard_body">
      <Toolbar disableGutters className='dashboard_header__toolbar' sx={{justifyContent: "right"}}>
        
        <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={() => setQuestionModalOpen(true)}  sx={{ p: 0 }}>
            <AddIcon />
          </IconButton>
          
        </Box>
      </Toolbar>
      <Paper sx={{ width: '100%', minHeight: 500, overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((question) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={question.id}>
                      {columns.map((column) => {
                        const value = question[column.id];
                        if (column.id === 'title') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                onClick={e => handleClickQuestion(e, question)}
                              >
                                {value}
                              </Button>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
                        
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={questions.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </div>
    </div>
  );
}
export default Dashboard;
