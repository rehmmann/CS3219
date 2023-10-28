// Import React
import { useState } from 'react';

// Import MUI
import {
    FormControl,
    IconButton,
    Paper,
    Stack,
    TextField,
} from '@mui/material';

// Import redux
import { useChangePasswordMutation } from '../../redux/api';

// Import toast
import { toast } from 'react-toastify';

import { User } from '../../utils/types';

const textInputStyle = {
    "& label.Mui-focused": {
      color: 'rgba(0, 0, 0, 0.6)'
    },
    "borderBottom": '2px solid black',
    '& .MuiInput-underline:before': { borderBottomColor: 'black' },
    '& .MuiInput-underline:after': { borderBottomColor: 'black' },
      input: {
        '&:-webkit-autofill::first-line': {
          'color': 'green',
          'fontSize': '13px'
        },
        '&:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px #ffff inset',
          '-webkit-text-fill-color': 'black',
          'fontSize': '13px'
        },
      },
  }

const ChangePasswordForm = () => {

  //----------------------------------------------------------------//
  //                          HOOKS                                 //
  //----------------------------------------------------------------//
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [retypePassword, setRetypePassword] = useState('');
  const [changePassword] = useChangePasswordMutation();
  const { id } = JSON.parse(localStorage.getItem('user') || '{}');
  //----------------------------------------------------------------//
  //                         HANDLERS                               //
  //----------------------------------------------------------------//
  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (newPassword !== retypePassword) {
      toast.error('Passwords do not match!');
      setButtonDisabled(false);
      return;
    }
    const changePasswordPromise = new Promise( async (resolve, reject) => {
      try {
        const res = await changePassword({id, passwords: {
          oldPassword,
          newPassword
        }}).unwrap();
        setButtonDisabled(false);
        return resolve(res);
      } catch (error: any) {
        setButtonDisabled(false);
        return reject(error);
      }
    });
    changePasswordPromise.then((res: any | User | null) => {
      toast.success('Password changed successfully!');

    }).catch((err) => {
      toast.error(err.data.error);
    })
  };

  //----------------------------------------------------------------//
  //                          RENDER                                //
  //----------------------------------------------------------------//
  return (
    <Paper
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >

    <Stack
      sx={{
        width: '40%'
      }}
    >


    <form
      onSubmit={(e) => handleChangePassword(e)}
      >
      <FormControl
        sx={{ width: '100%', mt: 10, mb: 10 }}
        variant="standard"
      >
        <Stack spacing={8}>
          <TextField
              id="oldPassword"
              label="Old Password"
              type="password"
              variant='standard'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              sx={textInputStyle}
              required
              InputLabelProps={{ required: false, style: { fontFamily: 'Poppins' }}}
              inputProps={{autoComplete: 'old-password',
              form: {
                autoComplete: 'off',
              },  style: { fontFamily: 'Poppins' }}}
          >
          </TextField>
          <TextField
              id="password"
              label="Password"
              type="password"
              variant='standard'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={textInputStyle}
              SelectProps={{style: {color: 'black'}}}
              required
              inputProps={{
                autoComplete: 'off',
                form: {
                  autoComplete: 'off',
                },
                style: { fontFamily: 'Poppins' }}}
              InputLabelProps={{ required: false, style: { fontFamily: 'Poppins' }}}
          />
           <TextField
              id="retype-password"
              label="Re-type Password"
              type="password"
              variant='standard'
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              sx={textInputStyle}
              SelectProps={{style: {color: 'black'}}}
              required
              inputProps={{style: { fontFamily: 'Poppins' }}}
              InputLabelProps={{ required: false, style: { fontFamily: 'Poppins' }}}
          />
          <IconButton
              sx={{
              color: 'black',
              backgroundColor: '#FFD900',
              height: 53,
              borderRadius: 14,
              border: '3px solid black',
              "&:hover": {
                  color: 'black',
                  border: '3px solid black',
              },
              width: '100%',
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: 13,
              }}
              disabled={buttonDisabled}
              type="submit"
              disableRipple
          >
              Change Password
          </IconButton>
        </Stack>
      </FormControl>
    </form>
    </Stack>
    </Paper>

  );
}

export default ChangePasswordForm;
