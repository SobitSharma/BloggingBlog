import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


const AlertNotifier = ({message, severity}) => {
  return (
    <div>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity={severity}>
        {message}
      </Alert>
    </div>
  );
};

export default AlertNotifier;
