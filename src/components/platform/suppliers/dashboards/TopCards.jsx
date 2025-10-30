import React from 'react';
import { Box, CardContent, Typography } from '@mui/material';
import { Grid } from '@mui/material';

import icon1 from '../../../../assets/images/svgs/icon-tasks.svg';
import icon2 from '../../../../assets/images/svgs/icon-user-male.svg';
import icon3 from '../../../../assets/images/svgs/icon-account.svg';
import icon4 from '../../../../assets/images/svgs/icon-briefcase.svg';
import icon5 from '../../../../assets/images/svgs/icon-dd-cart.svg';
import icon6 from '../../../../assets/images/svgs/icon-dd-message-box.svg';

const topcards = [
  {
    icon: icon4,
    title: 'إجمالي المنتجات',
    digits: '142',
    bgcolor: 'primary',
  },
  {
    icon: icon5,
    title: 'الطلبات الجديدة',
    digits: '28',
    bgcolor: 'success',
  },
  {
    icon: icon3,
    title: 'الفواتير المعلقة',
    digits: '12',
    bgcolor: 'warning',
  },
  {
    icon: icon2,
    title: 'المرتجعات',
    digits: '5',
    bgcolor: 'error',
  },
  {
    icon: icon6,
    title: 'الإيرادات الشهرية',
    digits: '456K',
    bgcolor: 'info',
  },
  {
    icon: icon1,
    title: 'تذاكر الدعم',
    digits: '8',
    bgcolor: 'secondary',
  },
];

const TopCards = () => {
  return (
    <Grid container spacing={3}>
      {topcards.map((topcard, i) => (
        <Grid size={{ xs: 12, sm: 4, lg: 2 }} key={i}>
          <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
            <CardContent>
              <img src={topcard.icon} alt={topcard.icon} width="50" />
              <Typography
                color={topcard.bgcolor + '.main'}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
