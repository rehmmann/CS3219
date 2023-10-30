import { Box, Modal, Stack, Typography } from "@mui/material"
import { Editor } from "@monaco-editor/react";

type SubmissionDetailsModalProps = {
  submissionDetailsModalOpen: boolean,
  setSubmissionDetailsModalOpen: Function,
  code: string | undefined,
  language: string | undefined
}
const SubmissionDetailsModal = (props: SubmissionDetailsModalProps) => {
  const { submissionDetailsModalOpen, setSubmissionDetailsModalOpen, code, language} = props;
  const handleSubmissionDetailsModalOpen = () => {
    setSubmissionDetailsModalOpen(false);
}

  return (
      <Modal
        open={submissionDetailsModalOpen}
        onClose={handleSubmissionDetailsModalOpen}
      >
        <Box 
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            fontFamily: 'Poppins',
            borderRadius: 5,
            p: 4
          }}
          component="form"
        >
          <Stack>
            <Typography>
              Code
            </Typography>
            <Editor
              height='40vh'
              width={`100%`}
              options={{readOnly: true}}
              value={code || ""}
              language={language}
            />
          </Stack>
          
        </Box>
      </Modal>
  )
}

export default SubmissionDetailsModal;