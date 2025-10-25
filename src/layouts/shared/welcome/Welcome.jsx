import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const Welcome = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  useEffect(() => {
    // Update the document title using the browser API
    const timer = setTimeout(() => {
      handleClick();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          variant="filled"
          sx={{ width: '100%', color: 'white' }}
        >
          <AlertTitle>مرحباً بك في كونتينر</AlertTitle>
          مرحباً بك في نظام إدارة الشركة المتكامل!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Welcome;
