// Import react
import { useState } from 'react';

// Import MUI
import { Button, FormControl, IconButton, Stack, TextField } from '@mui/material';

// Import toast
import { toast } from 'react-toastify';

// Import types
import { User } from '../../utils/types';

// Import redux
import { userLogin } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

import CustomButton from '../../components/Button/Button';

// Import style
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/api';

type LoginData = { password: { value: string }, email: { value: string }};

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

const Login = () => {
  //----------------------------------------------------------------//
  //                          HOOKS                                 //
  //----------------------------------------------------------------//
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [signingUp, setSigningUp] = useState(false);
  //----------------------------------------------------------------//
  //                         HANDLERS                               //
  //----------------------------------------------------------------//
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonDisabled(true);
    const target = e.target as HTMLFormElement;
    const formData = target.elements as any as LoginData;
    const password = formData.password.value;
    const email = formData.email.value;

    const resolveAfter3Sec = new Promise( async (resolve, reject) => {
      try {
        const res = await login({email, password}).unwrap();
        setButtonDisabled(false);
        return resolve(res);
      } catch (error: any) {
        setButtonDisabled(false);
        return reject(error);
      }
    });
    resolveAfter3Sec.then((res: any | User | null) => {
        toast.success('Welcome back ' + res.username + '!');
        localStorage.setItem('token', 'dummyToken');
        localStorage.setItem('user', JSON.stringify(res));
        navigate('/app/dashboard');
    }).catch((err) => {
      toast.error(err.data.error);
    })
  };

  //----------------------------------------------------------------//
  //                          RENDER                                //
  //----------------------------------------------------------------//
  return (
    <div className="login_root">
      <div className="login_container">
        <div className="login_row">
          <div className="login_body">
            <div
              className="login_title"
            >
              Welcome back!
            </div>
            <div
              className="login_subtitle"
            >
              Ready to solve some problem with peers?
            </div>
            <div className="login_form_container">
              <form
                onSubmit={(e) => handleLogin(e)}
              >
                <FormControl
                  sx={{ width: '100%', mt: 10, mb: 10 }}
                  variant="standard"
                >
                  <Stack spacing={8}>
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      variant='standard'
                      sx={textInputStyle}
                      required
                      InputLabelProps={{ required: false, style: { fontFamily: 'Poppins' }}}
                      inputProps={{style: { fontFamily: 'Poppins' }}}
                    >
                      <label>Email</label>
                      <input type="text" />
                    </TextField>
                    <TextField
                      id="password"
                      label="Password"
                      type="password"
                      variant='standard'
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
                      Log In
                    </IconButton>
                  </Stack>
                </FormControl>
              </form>
            </div>
            <div>
              Don't have an account? <CustomButton title="Register" event={() => setSigningUp(true)} />
            </div>
          </div>
        </div>
      </div>
      <div className="logo_container">
        <div className="logo_row">
          <img src={'login/login_page_logo.svg'} width={640} height={640} alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default Login;