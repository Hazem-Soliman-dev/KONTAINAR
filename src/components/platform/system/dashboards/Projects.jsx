import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';

import DashboardCard from '../../../shared/DashboardCard.jsx';

const Projects = () => {
  // chart color
  const theme = useTheme();
  const primary = '#E91E63'; // Pink
  const successlight = '#F8BBD9'; // Light Pink

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Cairo', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 80,
      resize: true,
      barColor: '#fff',
      sparkline: {
        enabled: true,
      },
    },
    colors: [primary],
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        startingShape: 'flat',
        endingShape: 'flat',
        columnWidth: '60%',
        barHeight: '20%',
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2.5,
      colors: ['rgba(0,0,0,0.01)'],
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    axisBorder: {
      show: false,
    },
    fill: {
      opacity: 1,
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
      data: [4, 10, 9, 7, 9, 10, 11, 8, 10],
    },
  ];

  return (
    <DashboardCard>
      <>
        <Typography variant="subtitle2" color="textSecondary">
          إحصائيات المنتجات
        </Typography>
        <Typography variant="h4">2,847</Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: successlight, width: 24, height: 24 }}>
            <IconArrowUpLeft width={18} color="#E91E63" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +23.1%
          </Typography>
        </Stack>
        <Box>
          <Chart options={optionscolumnchart} series={seriescolumnchart} type="bar" height="80px" />
        </Box>
      </>
    </DashboardCard>
  );
};

export default Projects;
