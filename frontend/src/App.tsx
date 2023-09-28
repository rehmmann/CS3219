// Import react
import { useRoutes } from 'react-router-dom';

// Import MUI
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Import redux
import { useDispatch, useSelector } from 'react-redux';
import { useLoginQuery } from './redux/api';
import { RootState } from './redux/store';

// Import routes
import routes from './routes';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss'
import { userLogin } from './redux/slices/userSlice';
import { User } from './utils/types';
import { useEffect } from 'react';

const checkToken = (token: string) => {
  return true; // temporary check!
}

const App = () => {
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  useEffect(() => {
    if (token && checkToken(token)) {
      dispatch(userLogin(JSON.parse(localStorage.getItem('user') || "") as User));
    }
  }, [token]);
  const { data: loginData, isFetching } = useLoginQuery();
  const {data: user } = useSelector((state: RootState) => state.user); // temporary
  const routing = useRoutes(routes(user != null));
  // const routing = useRoutes(routes(isValid(loginData.token)));
  if (isFetching) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {routing}
      <ToastContainer
        pauseOnFocusLoss={false}
        transition={Slide}
      />
    </>
  );
}

export default App;