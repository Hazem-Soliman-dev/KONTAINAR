import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box } from '@mui/material';
import DashboardCard from '../../../shared/DashboardCard.jsx';
import { IconGridDots } from '@tabler/icons-react';

const WeeklyStats = () => {
    
  // chart color
  const theme = useTheme();
  const primary = '#4CAF50'; // Green
  const primarylight = '#C8E6C9'; // Light Green
  const error = '#F44336'; // Red
  const errorlight = '#FFCDD2'; // Light Red
  const secondary = '#FF9800'; // Orange
  const secondarylight = '#FFE0B2'; // Light Orange

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Cairo', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 130,
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
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0,
        stops: [20, 180],
      },
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
      name: 'Weekly Stats',
      color: primary,
      data: [5, 15, 5, 10, 5],
    },
  ];

  const stats = [
    {
      title: 'Top Store',
      subtitle: 'Electronics Hub',
      percent: '68',
      color: primary,
      lightcolor: primarylight,
      icon: <IconGridDots width={18} />,
    },
    {
      title: 'Best Category',
      subtitle: 'Electronics',
      percent: '45',
      color: secondary,
      lightcolor: secondarylight,
      icon: <IconGridDots width={18} />,
    },
    {
      title: 'Most Orders',
      subtitle: 'Fashion',
      percent: '14',
      color: error,
      lightcolor: errorlight,
      icon: <IconGridDots width={18} />,
    },
  ];

  return (
    <DashboardCard title="إحصائياتي الأسبوعية" subtitle="متوسط أداء التوريد">
      <>
        <Stack mt={4}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="area"
            height="130px"
          />
        </Stack>
        <Stack spacing={3} mt={3}>
          {stats.map((stat, i) => (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              key={i}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: stat.lightcolor, color: stat.color, width: 40, height: 40 }}
                >
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" mb="4px">
                    {stat.title}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {stat.subtitle}
                  </Typography>
                </Box>
              </Stack>
              <Avatar
                sx={{
                  bgcolor: stat.lightcolor,
                  color: stat.color,
                  width: 42,
                  height: 24,
                  borderRadius: '4px',
                }}
              >
                <Typography variant="subtitle2" fontWeight="600">
                  +{stat.percent}
                </Typography>
              </Avatar>
            </Stack>
          ))}
        </Stack>
      </>
    </DashboardCard>
  );
};

export default WeeklyStats;
