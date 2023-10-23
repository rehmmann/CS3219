import React, { useState, useEffect } from "react";

import { getAuth } from 'firebase/auth';

import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";

import io from "socket.io-client";

import QuestionBox from '../../components/Collaboration/QuestionBox';
import Editor from '../../components/Collaboration/Editor';
import LanguageDropDown from '../../components/Collaboration/LanguageDropDown';
import ChatBox from '../../components/Collaboration/ChatBox';
import Button from '../../components/Button/Button';
import Box from '@mui/material/Box';
import axios from 'axios';

// Import style
import './Collaboration.scss';

const buttonStyle = {
  fontSize: "0.8rem", 
  fontWeight: '500', 
  color:'white', 
  border: "none", 
  borderRadius: "5px", 
  backgroundColor:'#83DA58', height:'100%'
};

type languageType = {
  id: number,
  name: string,
  label: string,
  value: string,
};

const conversation = [
  { 
    userId: '1', 
    message: 'hello there',
    date: 1632965300000
  },
  { 
    userId: '1', 
    message: 'how to do this string question',
    date: 1632965300001
  },
  { 
    userId: '2', 
    message: 'we pretty screwed',
    date: 1632965300002
  },
  { 
    userId: '1', 
    message: 'frfr',
    date: 1632965300003
  },
]

// const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzZDA3YmJjM2Q3NWM2OTQyNzUxMGY2MTc0ZWIyZjE2NTQ3ZDRhN2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGVlci1wcmVwLTM5OTEwNSIsImF1ZCI6InBlZXItcHJlcC0zOTkxMDUiLCJhdXRoX3RpbWUiOjE2OTc5OTk4MTIsInVzZXJfaWQiOiJ6SmhGYVRaclJuV0laYVViM01uTXo1U1doaTIzIiwic3ViIjoiekpoRmFUWnJSbldJWmFVYjNNbk16NVNXaGkyMyIsImlhdCI6MTY5ODAwMzQxMiwiZXhwIjoxNjk4MDA3MDEyLCJlbWFpbCI6ImV2YW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImV2YW5AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.dYfJIhDJu7gPaoEv_I2Rofx3syb47_REhDaatgKCEto1DrB-svw85XtdsyCZ-mO7IIw2V-YZOA78JmbgudysaNY824dwy8aa7Y8filngEEFkaJlbWg9pH0O2jQ_GuP-J3oyHW7WM3s2dKfcvLJDFmxIqiZm991V7dZxA9tLplWKIS9ricWpWP8OLgbWjMdBvi_uREmFVWPL03BfiXmWimY2I_zVEcbtcKAP3jlFR9pWDXOOmgWY-cKKBuMlr2hESCMXGGaDuhtc0GW60Nsd2KVs-XpAQRJmNuo0ghMUF-azn4XHndNaYa6ut9bC7q-m-WuLbF45VHwN9c6quEX1I-A";
// const userID = "zJhFaTZrRnWIZaUb3MnMz5SWhi23";

const Collaboration = () => {
  const {data: questions} = useSelector((state: RootState) => state.questions);
  // const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [question, setQuestion] = useState(questions[0]);
  const [obj, setObj] = useState(null);
  // const {data: user} = useSelector((state: RootState) => state.user);
  // const [value, setValue] = useState(code || "");
  // console.log(socket);

  // useEffect(() => {
  //   const auth = getAuth();
  //   // let socket = null;
  //   auth.currentUser?.getIdTokenResult().then((idTokenResult) => {
  //     console.log(idTokenResult.token)
  //     console.log(idTokenResult.claims.user_id)
  //   })
  //   const URL = `http://34.84.247.67`;

  //   const socket = io(URL, {
  //     autoConnect: false,
  //     query: {
  //       token: token,
  //       userId: userID,
  //     }, 
  //   });
  //   socket.connect();
    
  //   // socket.emit("join_room", {room_id: "1", user_id: "1"});
  //   // socket.on("receive_message", (data) => {
  //   //   console.log(data)
  //   // });

  //   return () => {
  //     // socket.off('foo', onFooEvent);
  //     socket.disconnect();
  //   };
  // }, []);
  
  // useEffect(() => {
  //   // console.log(localStorage.getItem('firebaseLocalStorageDb'))
  //   auth.currentUser?.getIdTokenResult().then((idTokenResult) => {
  //     console.log(idTokenResult.claims.user_id)
  //     axios.post(`http://34.84.247.67?token=${idTokenResult.token}`, {params: {token:idTokenResult.token, userId: idTokenResult.claims.user_id}}).then((res) => setObj(res.data));
  //   })
  // }, []);

  const handleChangeLanguage = (language: languageType) => {
    setLanguage(language.value);
  };

  const handleSubmitCode = () => {
    console.log("submit");
  };

  return (
    <div className="collaboration_container">
      <QuestionBox title={question.title} complexity={question.complexity} description={question.description}/>
      <div className="editor_container">
        <Box className="editor_toolbar_container">
          <LanguageDropDown onSelectChange={handleChangeLanguage}/>
          <Button title={'Submit'} event={handleSubmitCode} style={buttonStyle}/>
        </Box>
        <Editor language={language}/>
        <Editor language={language}/>
      </div>
      <ChatBox conversation={conversation} currentUser="1"/>
    </div>
    
  );
};
export default Collaboration;