import React from 'react';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/theme-elements/CustomTextField.jsx';
import CustomFormLabel from '../../../components/theme-elements/CustomFormLabel.jsx';

const AuthForgotPassword = () => (
  <>
    <Stack mt={4} spacing={2}>
      <CustomFormLabel htmlFor="reset-email">البريد الإلكتروني</CustomFormLabel>
      <CustomTextField id="reset-email" variant="outlined" fullWidth />

      <Button color="primary" variant="contained" size="large" fullWidth component={Link} to="/">
        إرسال رابط إعادة تعيين كلمة المرور
      </Button>
      <Button color="primary" size="large" fullWidth component={Link} to="/auth/login">
        العودة لتسجيل الدخول
      </Button>
    </Stack>
  </>
);

export default AuthForgotPassword;
