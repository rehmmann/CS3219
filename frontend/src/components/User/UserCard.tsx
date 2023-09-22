// Import react
import { useState } from "react";

// Import MUI
import { Box, IconButton, Paper, Stack } from "@mui/material";

// Import redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type UserLogoProps = {
  logoLink?: string
}

type MatchButtonProps = {
  type: 'topic' | 'difficulty',
  title: string,
  value: string,
}

//----------------------------------------------------------------//
//                      LOCAL COMPONENTS                          //
//----------------------------------------------------------------//
const UserLogo = (props: UserLogoProps) => {
  const { logoLink } = props;
  return (
    <Stack
      sx={{
        width: 81,
        height: 81,
        backgroundImage: logoLink ?? '/user/ellipse-bg.svg',
        backgroundColor: '#D9D9D9',
        borderRadius: '50%',
        display: 'flex',
        flexdirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Stack
        sx={{
          width: 81,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
      <img height='64' width='59' src='/user/default-male-user-logo.svg' alt='user' />
      </Stack>
    </Stack>
  );
}

const UserCard = () => {
  //----------------------------------------------------------------//
  //                          HOOKS                                 //
  //----------------------------------------------------------------//
  const {data: user} = useSelector((state: RootState) => state.user);
  const [selectedTopic, setSelectedTopic] = useState<string>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>();

  //----------------------------------------------------------------//
  //                     LOCAL COMPONENTS                           //
  //----------------------------------------------------------------//
  const MatchButton = (props: MatchButtonProps) => {
    const { type, title, value } = props;
    const getBackgroundColor = () => {
      if (value === selectedTopic || value === selectedDifficulty) {
        return '#FFD900';
      } else {
        return 'white';
      }
    }
    return (
      <IconButton
        sx={{
          color: 'black',
          backgroundColor: getBackgroundColor(),
          height: 33,
          width: type === 'topic' ? 85 : 100,
          borderRadius: 14,
          border: '3px solid black',
          "&:hover": {
            color: 'black',
            border: '3px solid black',
          },
          fontFamily: 'Poppins',
          fontWeight: 600,
          fontSize: 13,
        }}
        disableRipple
        onClick={() => {
          if (value === selectedTopic || value === selectedDifficulty) {
            type === 'topic' ? setSelectedTopic('') : setSelectedDifficulty('');
          } else {
            type === 'topic' ? setSelectedTopic(value) : setSelectedDifficulty(value);
          }
        }}
      >
        {title}
      </IconButton>
    )
  }
  //----------------------------------------------------------------//
  //                          RENDER                                //
  //----------------------------------------------------------------//
  return (
    <Paper
      sx={{
        width: '100%',
        height: 'fit-content',
        padding: 5,
        borderRadius: 5
      }}
    >
      <Stack 
        spacing={5}
        sx={{
        }}
      >
      <Stack
        direction={'row'}
        justifyContent={'center'}
        spacing={3}
      >
        <UserLogo />
        <Stack direction={'column'}>
          <Box
            sx={{
              fontWeight: 600,
              fontSize: 17,
              textAlign: 'left'
            }}
          >
            {user?.username}
          </Box>
          <Box
            sx={{
              textAlign: 'left'
            }}
          >
            Level 10
          </Box>
        </Stack>
      </Stack>
      <Stack
        direction={'column'}
        spacing={3}
        sx={{
          borderTop: '1px solid #D9D9D9',
          pt: 3,
        }}
      >
        <h4>Topic</h4>
        <Stack
          direction={'row'}
          justifyContent={'center'}
          spacing={1}
        >
          <MatchButton type='topic' title='Array' value='array' />
          <MatchButton type='topic' title='Graph' value='graph' />
          <MatchButton type='topic' title='Stack' value='stack' />
          <MatchButton type='topic' title='Queue' value='queue' />

        </Stack>
        <h4>Difficulty</h4>
        <Stack
          direction={'row'}
          justifyContent={'center'}
          spacing={2}
        >
          <MatchButton type='difficulty' title='Easy' value='easy' />
          <MatchButton type='difficulty' title='Medium' value='medium' />
          <MatchButton type='difficulty' title='Hard' value='hard' />
        </Stack>
        <Stack
          direction={'row'}
          justifyContent={'center'}
          sx={{
            mt: 3
          }}
        >
          <IconButton
          sx={{
            color: 'black',
            backgroundColor: 'white',
            height: 33,
            width: 85,
            borderRadius: 14,
            border: '3px solid black',
            "&:hover": {
              color: 'black',
              border: '3px solid black',
            },
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: 13,
          }}
          disableRipple
        >
          Match
        </IconButton>
        </Stack>
        
      </Stack>
    </Stack>
    </Paper>
    
  );
}

export default UserCard;