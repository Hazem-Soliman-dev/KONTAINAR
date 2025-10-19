import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar } from '@mui/material';
import { IconArrowDownRight } from '@tabler/icons-react';

import DashboardCard from '../../../shared/DashboardCard.jsx';

const Customers = () => {
  // chart color
  const theme = useTheme();
  const secondary = '#9C27B0'; // Purple
  const secondarylight = '#CE93D8'; // Light Purple
  const errorlight = '#FFCDD2'; // Light Red

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Cairo', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 80,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      x: {
        show: false,
      },
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: [30, 25, 35, 20, 30, 40],
    },
  ];

  return (
    <DashboardCard
      footer={
        <>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="area"
            height="80px"
          />
        </>
      }
    >
      <>
        <Typography variant="subtitle2" color="textSecondary">
          Customer statistics
        </Typography>
        <Typography variant="h4">8,942</Typography>
        <Stack direction="row" spacing={1} mt={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 24, height: 24 }}>
            <IconArrowDownRight width={18} color="#9C27B0" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +12.5%
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default Customers;
