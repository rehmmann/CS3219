// Import react
import { useRoutes } from 'react-router-dom';

// Import MUI
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Import redux
import { useLoginQuery } from './redux/api';

// Import routes
import routes from './routes';

import './App.scss'


const App = () => {
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const { data: loginData, isFetching } = useLoginQuery();

  const routing = useRoutes(routes(true));
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
    </>
  );
}

export default App;
