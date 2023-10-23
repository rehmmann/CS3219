import { useState } from "react";

import {Editor as MonacoEditor} from "@monaco-editor/react";

type EditorProps = {
  language: string,
}

const Editor = (props: EditorProps) => {
  const { language } = props;
  const [value, setValue] = useState("");

  const handleEditorChange = (value: string) => {
    setValue(value);
  };

  return (
    <MonacoEditor
      height='40vh'
      width={`100%`}
      defaultLanguage={language}
      language={language}
      value={value}
      theme={"light"}
      defaultValue=""
      onChange={handleEditorChange}
    />
  );
};
export default Editor;