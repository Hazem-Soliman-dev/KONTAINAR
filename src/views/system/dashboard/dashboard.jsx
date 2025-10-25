import React from 'react';
import { Box, Grid } from '@mui/material';

import TopCards from '../../../components/platform/system/dashboards/TopCards.jsx';
import RevenueUpdates from '../../../components/platform/system/dashboards/RevenueUpdates.jsx';
import YearlyBreakup from '../../../components/platform/system/dashboards/YearlyBreakup.jsx';
import MonthlyEarnings from '../../../components/platform/system/dashboards/MonthlyEarnings.jsx';
import EmployeeSalary from '../../../components/platform/system/dashboards/EmployeeSalary.jsx';
import Customers from '../../../components/platform/system/dashboards/Customers.jsx';
import Projects from '../../../components/platform/system/dashboards/Projects.jsx';
import Social from '../../../components/platform/system/dashboards/Social.jsx';
import SellingProducts from '../../../components/platform/system/dashboards/SellingProducts.jsx';
import WeeklyStats from '../../../components/platform/system/dashboards/WeeklyStats.jsx';
import TopPerformers from '../../../components/platform/system/dashboards/TopPerformers.jsx';
import Welcome from '../../../layouts/shared/welcome/Welcome.jsx';

const Modern = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        {/* عمود */}
        <Grid size={12}>
          <TopCards />
        </Grid>
        {/* عمود */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <RevenueUpdates />
        </Grid>
        {/* عمود */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Grid spacing={3} container columns={{ xs: 12, sm: 6 }}>
            <Grid size={12}>
              <YearlyBreakup />
            </Grid>
            <Grid size={12}>
              <MonthlyEarnings />
            </Grid>
          </Grid>
        </Grid>
        {/* عمود */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <EmployeeSalary />
        </Grid>
        {/* عمود */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Grid spacing={3} container columns={{ xs: 12, sm: 6 }}>
            <Grid size={{ xs: 12, md: 6, lg: 'grow' }}>
              <Customers />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 'grow' }}>
              <Projects />
            </Grid>
            <Grid size={12}>
              <Social />
            </Grid>
          </Grid>
        </Grid>
        {/* عمود */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <SellingProducts />
        </Grid>
        {/* عمود */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <WeeklyStats />
        </Grid>
        {/* عمود */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <TopPerformers />
        </Grid>
      </Grid>
      {/* عمود */}
      <Welcome />
    </Box>
  );
};

export default Modern;
