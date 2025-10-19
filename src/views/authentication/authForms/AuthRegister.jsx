import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/theme-elements/CustomTextField.jsx';
import CustomFormLabel from '../../../components/theme-elements/CustomFormLabel.jsx';
import { Stack } from '@mui/system';
import AuthSocialButtons from './AuthSocialButtons.jsx';

const AuthRegister = ({ title, subtitle, subtext }) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}
    <AuthSocialButtons title="التسجيل باستخدام" />

    <Box mt={3}>
      <Divider>
        <Typography
          component="span"
          color="textSecondary"
          variant="h6"
          fontWeight="400"
          position="relative"
          px={2}
        >
          أو التسجيل باستخدام
        </Typography>
      </Divider>
    </Box>

    <Box>
      <Stack mb={3}>
        <CustomFormLabel htmlFor="name">الاسم</CustomFormLabel>
        <CustomTextField id="name" variant="outlined" fullWidth />
        <CustomFormLabel htmlFor="email">البريد الإلكتروني</CustomFormLabel>
        <CustomTextField id="email" variant="outlined" fullWidth />
        <CustomFormLabel htmlFor="password">كلمة المرور</CustomFormLabel>
        <CustomTextField id="password" variant="outlined" fullWidth />
      </Stack>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        component={Link}
        to="/auth/login"
      >
        إنشاء حساب
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthRegister;
