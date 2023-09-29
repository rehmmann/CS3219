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
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';

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
  const [signingUp, setSigningUp] = useState(false);
  //----------------------------------------------------------------//
  //                         HANDLERS                               //
  //----------------------------------------------------------------//
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
              {signingUp ? <SignUpForm setSigningUp={setSigningUp}/> : <LogInForm/>}
            </div>
            <div>
              {signingUp ?
                <div>
                  Already have an account? <CustomButton title="Log In" event={() => setSigningUp(false)} />
                </div> :
                <div>
                  Don't have an account? <CustomButton title="Register" event={() => setSigningUp(true)} />
                </div>
              }
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