// Import react
import { useState } from 'react';

// Import redux
import { useDispatch } from "react-redux";
import { initMatch } from '../../redux/slices/matchSlice';

// Import components
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';

// Import MUI
import { Box } from '@mui/material';

// Import style
import './Matchmake.scss';

const Matchmake = () => {
  const dispatch = useDispatch();

  return (
    <Box className="matchmake_background">
      <Box className="matchmake_container">
        <h1 style={{fontWeight:'bold'}}>Please wait while <br/> we find you a match</h1>
        <Loading />
        <Button title={'Cancel'} event={() => dispatch(initMatch(false))} style={{fontSize:18, width:110}}/>
      </Box>
    </Box>
    
  );
}

export default Matchmake;