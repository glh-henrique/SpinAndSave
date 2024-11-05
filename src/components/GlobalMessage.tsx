import React from 'react';
import { useMessage } from '../context/MessageContext';
import { Alert, Snackbar } from '@mui/material';


const GlobalMessage: React.FC = () => {
  const { message } = useMessage();

  if (!message) return null;

  return (
    <>
      <Snackbar open={!!message} autoHideDuration={6000}>
        <Alert
          severity={message.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GlobalMessage;
