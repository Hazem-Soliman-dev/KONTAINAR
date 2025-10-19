import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
const Navigation = () => {
  return (
    <>
      <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        to="/main-store"
        component={Link}
      >
        Shop
      </Button>
      <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        to="/"
        component={Link}
      >
        Go To Platform
      </Button>
    </>
  );
};
export default Navigation;
