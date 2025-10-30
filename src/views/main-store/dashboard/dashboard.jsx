import React from 'react';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';

// Using Main Store specific dashboard components
import TopCards from '../../../components/platform/main-store/dashboards/TopCards.jsx';
import RevenueUpdates from '../../../components/platform/main-store/dashboards/RevenueUpdates.jsx';
import YearlyBreakup from '../../../components/platform/main-store/dashboards/YearlyBreakup.jsx';
import MonthlyEarnings from '../../../components/platform/main-store/dashboards/MonthlyEarnings.jsx';
import EmployeeSalary from '../../../components/platform/main-store/dashboards/EmployeeSalary.jsx';
import Customers from '../../../components/platform/main-store/dashboards/Customers.jsx';
import Projects from '../../../components/platform/main-store/dashboards/Projects.jsx';
import Social from '../../../components/platform/main-store/dashboards/Social.jsx';
import SellingProducts from '../../../components/platform/main-store/dashboards/SellingProducts.jsx';
import WeeklyStats from '../../../components/platform/main-store/dashboards/WeeklyStats.jsx';
import TopPerformers from '../../../components/platform/main-store/dashboards/TopPerformers.jsx';
import Welcome from '../../../layouts/shared/welcome/Welcome.jsx';

const Modern = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        {/* column */}
        <Grid size={12}>
          <TopCards />
        </Grid>
        {/* column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <RevenueUpdates />
        </Grid>
        {/* column */}
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
        {/* column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <EmployeeSalary />
        </Grid>
        {/* column */}
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
        {/* column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <SellingProducts />
        </Grid>
        {/* column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <WeeklyStats />
        </Grid>
        {/* column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <TopPerformers />
        </Grid>
      </Grid>
      {/* column */}
      <Welcome />
    </Box>
  );
};

export default Modern;
