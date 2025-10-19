import React from 'react';
import { Link } from 'react-router';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import PageContainer from '../../../components/container/PageContainer.jsx';
import img1 from '../../../assets/images/backgrounds/login-bg.svg';
import Logo from '../../../layouts/shared/logo/Logo.jsx';

import AuthRegister from '../authForms/AuthRegister.jsx';

const Register = () => (
  <PageContainer title="إنشاء حساب" description="صفحة إنشاء حساب جديد">
    <Grid container spacing={0} justifyContent="center" sx={{ overflowX: 'hidden' }}>
      <Grid
        size={{ xs: 12, sm: 12, lg: 7, xl: 8 }}
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Box position="relative">
          <Box px={3}>
            <Logo />
          </Box>
          <Box
            alignItems="center"
            justifyContent="center"
            height={'calc(100vh - 75px)'}
            sx={{
              display: {
                xs: 'none',
                lg: 'flex',
              },
            }}
          >
            <img
              src={img1}
              alt="bg"
              style={{
                width: '100%',
                maxWidth: '500px',
              }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        size={{ xs: 12, sm: 12, lg: 5, xl: 4 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box p={4}>
          <AuthRegister
            title="مرحباً بك في كونتينر"
            subtext={
              <Typography variant="subtitle1" color="textSecondary" mb={1}>
                لوحة التحكم الإدارية
              </Typography>
            }
            subtitle={
              <Stack direction="row" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  لديك حساب بالفعل؟
                </Typography>
                <Typography
                  component={Link}
                  to="/auth/login"
                  fontWeight="500"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  تسجيل الدخول
                </Typography>
              </Stack>
            }
          />
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
);

export default Register;
