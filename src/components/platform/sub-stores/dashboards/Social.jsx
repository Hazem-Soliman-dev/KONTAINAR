import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography, Avatar, Box, AvatarGroup } from '@mui/material';
import { IconMessage2 } from '@tabler/icons-react';

import DashboardCard from '../../../shared/DashboardCard.jsx';
import ProfileImg from '../../../../assets/images/profile/user-1.jpg';
import User1Img from '../../../../assets/images/profile/user-2.jpg';
import User2Img from '../../../../assets/images/profile/user-3.jpg';
import User3Img from '../../../../assets/images/profile/user-4.jpg';
import User4Img from '../../../../assets/images/profile/user-5.jpg';

const Social = () => {
  return (
    <DashboardCard>
      <>
        <Stack direction="row" spacing={2}>
          <Avatar
            src={ProfileImg}
            alt={ProfileImg}
            sx={{ borderRadius: '8px', width: 70, height: 70 }}
          />
          <Box>
            <Typography variant="h5">Top Performing Sub Stores this month!</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              22 March, 2025
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" mt={5}>
          <AvatarGroup max={4}>
            <Avatar alt="Electronics Hub" src={User1Img} />
            <Avatar alt="Fashion Store" src={User2Img} />
            <Avatar alt="Home & Garden" src={User3Img} />
            <Avatar alt="Sports Zone" src={User4Img} />
          </AvatarGroup>
          <Link to="/">
            <Box
              width="40px"
              height="40px"
              bgcolor="primary.light"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                color="primary.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <IconMessage2 width={22} />
              </Typography>
            </Box>
          </Link>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default Social;
