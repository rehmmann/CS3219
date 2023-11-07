import {Editor as MonacoEditor, OnChange} from "@monaco-editor/react";

import LanguageDropDown from './LanguageDropDown';
import Button from '../../components/Button/Button';
import Box from '@mui/material/Box';

import './Editor.scss';
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useGetSubmissionQuery, useUpdateSubmissionMutation } from "../../redux/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const buttonStyle = {
  fontSize: "0.8rem", 
  fontWeight: '500', 
  color:'white', 
  border: "none", 
  borderRadius: "5px", 
  height:'100%',
  width: '76px',
};
const submitButtonStyle = {
  ...buttonStyle,
  backgroundColor:'#83DA58'
}
const saveButtonStyle = {
  ...buttonStyle,
  backgroundColor:'#32a0a8'
};
const restoreButtonStyle = {
  ...buttonStyle,

  backgroundColor:'#ad8713',
};
const languageOptions: any = {
  "javascript": 63,
  "python": 71,
  "c": 50,
  "cpp": 54,
}
type EditorProps = {
  isMainEditor: boolean,
  handleEditorChange: OnChange,
  handleChangeLanguage: OnChange,
  code: string,
  language: string,
  initialCode: string | undefined,
  setInitialCode: Function | undefined,
  setCode: Function | undefined,
}

const Editor = (props: EditorProps) => {
  const { 
    isMainEditor,
    code,
    language,
    handleEditorChange,
    handleChangeLanguage,
    initialCode,
    setInitialCode,
    setCode,
  } = props;
  const { questionId } = useParams();
  const [updateSubmission] = useUpdateSubmissionMutation();
  const [savedCode, setSavedCode] = useState<string | null>(null);
  const { data: submissionData }  = useGetSubmissionQuery(
    {
      languageId: languageOptions[language],
      questionId: parseInt(questionId!),
      uid: getAuth().currentUser!.uid!
    }
  );
  useEffect(() => {
    const typeCastedSubmissionData = submissionData as any;
    if (typeCastedSubmissionData) {
      setSavedCode(typeCastedSubmissionData.code);
    }
  }, [submissionData])

  const handleSubmitCode = () => {
    console.log("SAD", code);
  };

  const handleSaveCode = () => {
    const updateSubmissionPromise = new Promise( async (resolve, reject) => {
      try {
        const res = await updateSubmission( {
          code,
          languageId: languageOptions[language],
          questionId: parseInt(questionId!),
          uid: getAuth().currentUser!.uid!
        }).unwrap();
        return resolve(res);
      } catch (error: any) {
        return reject(error);
      }
    });
    updateSubmissionPromise.then((res: any | null) => {
      console.log(res);
      toast.success('Code saved successfully!');
    }).catch((err) => {
      toast.error(err.data.error);
    })
  }

  const handleRestoreCode = () => {
    if (setInitialCode && setCode && savedCode) {
      setInitialCode(savedCode);
      setCode(savedCode);
      toast.success('Code restored successfully!');
    } else {
      toast.error('No saved code found');
    }
  }

  return (
    <>
      {
        isMainEditor && 
        <Box className="editor_toolbar_container">
          <LanguageDropDown onSelectChange={handleChangeLanguage}/>
          <Button title={'Restore'} event={handleRestoreCode} style={restoreButtonStyle}/>
          <Button title={'Save'} event={handleSaveCode} style={saveButtonStyle}/>
          <Button title={'Submit'} event={handleSubmitCode} style={submitButtonStyle}/>
        </Box>
      }
      <MonacoEditor
        height='40vh'
        width={`100%`}
        defaultLanguage={language}
        language={language}
        value={isMainEditor ? initialCode : code}
        theme={"light"}
        options={{readOnly: !isMainEditor}}
        onChange={handleEditorChange}
      />
    </>
  );
};
export default Editor;