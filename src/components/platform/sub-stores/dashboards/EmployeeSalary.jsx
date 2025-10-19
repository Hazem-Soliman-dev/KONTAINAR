import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';

import DashboardWidgetCard from '../../../shared/DashboardWidgetCard.jsx';

const EmployeeSalary = () => {
  // chart color
  const theme = useTheme();
  const primary = '#2196F3'; // Blue
  const primarylight = '#BBDEFB'; // Light Blue

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Cairo', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 280,
    },
    colors: [primarylight, primarylight, primary, primarylight, primarylight, primarylight],
    plotOptions: {
      bar: {
        borderRadius: 4,
        startingShape: 'flat',
        endingShape: 'flat',
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories: [['Apr'], ['May'], ['June'], ['July'], ['Aug'], ['Sept']],
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      data: [20, 15, 30, 25, 10, 15],
    },
  ];

  return (
    <DashboardWidgetCard
      title="Store Performance Analysis"
      subtitle="Every month"
      dataLabel1="Total Revenue"
      dataItem1="$2,847,500"
      dataLabel2="Platform Fees"
      dataItem2="$284,750"
    >
      <>
        <Box>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="bar"
            height="280px"
          />
        </Box>
      </>
    </DashboardWidgetCard>
  );
};

export default EmployeeSalary;
