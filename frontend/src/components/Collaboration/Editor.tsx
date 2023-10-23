import { useState } from "react";

import {Editor as MonacoEditor} from "@monaco-editor/react";

import LanguageDropDown from './LanguageDropDown';
import Button from '../../components/Button/Button';
import Box from '@mui/material/Box';

import './Editor.scss';

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

type EditorProps = {
  defaultLanguage: string,
  defaultCode: string,
  isMainEditor: boolean,
}

const Editor = (props: EditorProps) => {
  const { defaultLanguage, defaultCode, isMainEditor } = props;
  const [language, setLanguage] = useState(defaultLanguage);
  const [code, setCode] = useState(defaultCode);

  const handleEditorChange = (value: string) => {
    setCode(value);
  };

  const handleChangeLanguage = (language: languageType) => {
    setLanguage(language.value);
  };

  const handleSubmitCode = () => {
    console.log(code);
  };

  return (
    <>
      {
        isMainEditor && 
        <Box className="editor_toolbar_container">
          <LanguageDropDown onSelectChange={handleChangeLanguage}/>
          <Button title={'Submit'} event={handleSubmitCode} style={buttonStyle}/>
        </Box>
      }
      <MonacoEditor
        height='40vh'
        width={`100%`}
        defaultLanguage={language}
        language={language}
        value={code}
        theme={"light"}
        defaultValue=""
        onChange={handleEditorChange}
      />
    </>
  );
};
export default Editor;