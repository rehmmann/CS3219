import {Editor as MonacoEditor, OnChange} from "@monaco-editor/react";

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
  isMainEditor: boolean,
  handleEditorChange: OnChange,
  handleChangeLanguage: OnChange,
  code: string,
  language: string,
}

const Editor = (props: EditorProps) => {
  const { 
    isMainEditor,
    code,
    language,
    handleEditorChange,
    handleChangeLanguage
  } = props;

  const handleSubmitCode = () => {
    console.log("SAD", code);
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
        options={{readOnly: !isMainEditor}}
        defaultValue=""
        onChange={handleEditorChange}
      />
    </>
  );
};
export default Editor;