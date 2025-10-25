import React, { useContext } from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { IconPower } from '@tabler/icons-react';
import { CustomizerContext } from '../../../../../../context/CustomizerContext.jsx';
import img1 from '../../../../../../assets/images/profile/user-1.jpg';

export const Profile = () => {
  const { isSidebarHover, isCollapse } = useContext(CustomizerContext);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? isCollapse == 'mini-sidebar' && !isSidebarHover : '';

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={img1} />

          <Box>
            <Typography variant="h6" color="textPrimary">
              كونتينر
            </Typography>
            <Typography variant="caption" color="textSecondary">
              مسؤول
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="تسجيل الخروج" placement="top">
              <IconButton
                color="primary"
                component={Link}
                to="/auth/login"
                aria-label="تسجيل الخروج"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
