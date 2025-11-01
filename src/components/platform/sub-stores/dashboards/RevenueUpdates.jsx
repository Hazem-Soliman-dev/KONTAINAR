import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { MenuItem, Stack, Typography, Button, Avatar, Box } from '@mui/material';
import { IconGridDots } from '@tabler/icons-react';
import DashboardCard from '../../../shared/DashboardCard.jsx';
import CustomSelect from '../../../../components/theme-elements/CustomSelect.jsx';
import { useNavigate } from 'react-router';

const RevenueUpdates = () => {
  const navigate = useNavigate();
  const [month, setMonth] = React.useState('1');

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const handleViewFullReport = () => {
    navigate('/sub-stores/analytics/sales');
  };

  // chart color
  const theme = useTheme();
  const primary = '#4CAF50'; // Green
  const secondary = '#FF9800'; // Orange

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Cairo', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 370,
      stacked: true,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '20%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
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
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      min: -5,
      max: 5,
      tickAmount: 4,
    },
    xaxis: {
      categories: ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08'],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
    {
      name: 'Store Revenue',
      data: [2.1, 3.2, 2.8, 4.1, 2.3, 1.8],
    },
    {
      name: 'Platform Fees',
      data: [-1.2, -0.8, -1.5, -1.1, -0.6, -0.9],
    },
  ];

  return (
    <DashboardCard
      title="تحديثات مبيعاتي"
      subtitle="Overview of My Store Performance"
      action={
        <CustomSelect
          labelId="month-dd"
          id="month-dd"
          value={month}
          size="small"
          onChange={handleChange}
        >
          <MenuItem value={1}>مارس 2025</MenuItem>
          <MenuItem value={2}>فبراير 2025</MenuItem>
          <MenuItem value={3}>يناير 2025</MenuItem>
        </CustomSelect>
      }
    >
      <Grid container spacing={3}>
        {/* column */}
        <Grid size={{ xs: 12, sm: 8 }}>
          <Box className="rounded-bars">
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="bar"
              height="370px"
            />
          </Box>
        </Grid>
        {/* column */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Stack spacing={3} mt={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                width={40}
                height={40}
                bgcolor="#C8E6C9"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography color="#4CAF50" variant="h6" display="flex">
                  <IconGridDots width={21} />
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" fontWeight="700">
                  $2,847,500
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  إيرادات المتجر الكلية
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Stack spacing={3} my={5}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: '#4CAF50',
                  marginTop: '10px !important',
                  svg: { display: 'none' },
                }}
              ></Avatar>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  إيرادات المتجر
                </Typography>
                <Typography variant="h5">$2,120,000</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar
                sx={{
                  width: 9,
                  mt: 1,
                  height: 9,
                  bgcolor: '#FF9800',
                  marginTop: '10px !important',
                  svg: { display: 'none' },
                }}
              ></Avatar>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  رسوم المنصة
                </Typography>
                <Typography variant="h5">$727,500</Typography>
              </Box>
            </Stack>
          </Stack>
          <Button 
            color="primary" 
            variant="contained" 
            fullWidth
            onClick={handleViewFullReport}
          >
            عرض التقرير الكامل
          </Button>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default RevenueUpdates;
