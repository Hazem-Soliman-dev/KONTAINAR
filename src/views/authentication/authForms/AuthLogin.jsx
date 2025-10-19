import React from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';

import CustomCheckbox from '../../../components/theme-elements/CustomCheckbox.jsx';
import CustomTextField from '../../../components/theme-elements/CustomTextField.jsx';
import CustomFormLabel from '../../../components/theme-elements/CustomFormLabel.jsx';

import AuthSocialButtons from './AuthSocialButtons.jsx';

const AuthLogin = ({ title, subtitle, subtext }) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <AuthSocialButtons title="تسجيل الدخول باستخدام" />
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
          أو تسجيل الدخول باستخدام
        </Typography>
      </Divider>
    </Box>

    <Stack>
      <Box>
        <CustomFormLabel htmlFor="username">اسم المستخدم</CustomFormLabel>
        <CustomTextField id="username" variant="outlined" fullWidth />
      </Box>
      <Box>
        <CustomFormLabel htmlFor="password">كلمة المرور</CustomFormLabel>
        <CustomTextField id="password" type="password" variant="outlined" fullWidth />
      </Box>
      <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
        <FormGroup>
          <FormControlLabel
            control={<CustomCheckbox defaultChecked />}
            label="تذكر هذا الجهاز"
          />
        </FormGroup>
        <Typography
          component={Link}
          to="/auth/forgot-password"
          fontWeight="500"
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
          }}
        >
          نسيت كلمة المرور؟
        </Typography>
      </Stack>
    </Stack>
    <Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        component={Link}
        to="/"
        type="submit"
      >
        تسجيل الدخول
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthLogin;
