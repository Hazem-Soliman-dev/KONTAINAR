import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';

import { Grid } from '@mui/material';

import DashboardCard from '../../../shared/DashboardCard.jsx';

const YearlyBreakup = () => {
  // chart color
  const theme = useTheme();
  const primary = '#4CAF50'; // Green
  const primarylight = '#81C784'; // Light Green
  const successlight = '#C8E6C9'; // Very Light Green

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Cairo', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart = [38, 40, 25];

  return (
    <DashboardCard title="تقسيم أداء متجري">
      <Grid container spacing={3}>
        {/* column */}
        <Grid size={7}>
          <Typography variant="h3" fontWeight="700">
            $2,847,500
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              <IconArrowUpLeft width={20} color="#4CAF50" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              +18.2%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              this year
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: '#4CAF50', svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                2025
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: '#81C784', svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                2024
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid size={5}>
          <Box>
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="donut"
              height="130px"
            />
          </Box>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
