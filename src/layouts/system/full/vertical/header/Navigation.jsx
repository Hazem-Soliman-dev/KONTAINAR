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
        المتجر
      </Button>
      <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        to="/"
        component={Link}
      >
        الذهاب للمنصة
      </Button>
    </>
  );
};
export default Navigation;
