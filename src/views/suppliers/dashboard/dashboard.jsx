import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/shared/breadcrumb/Breadcrumb';

import AllStatistics from '../../../components/platform/suppliers/dashboards/AllStatistics.jsx';
// Using Supplier specific dashboard components
import TopCards from '../../../components/platform/suppliers/dashboards/TopCards.jsx';
import RevenueUpdates from '../../../components/platform/suppliers/dashboards/RevenueUpdates.jsx';
import YearlyBreakup from '../../../components/platform/suppliers/dashboards/YearlyBreakup.jsx';
import MonthlyEarnings from '../../../components/platform/suppliers/dashboards/MonthlyEarnings.jsx';
import WeeklyStats from '../../../components/platform/suppliers/dashboards/WeeklyStats.jsx';
import SellingProducts from '../../../components/platform/suppliers/dashboards/SellingProducts.jsx';
import TopPerformers from '../../../components/platform/suppliers/dashboards/TopPerformers.jsx';
import Welcome from '../../../layouts/shared/welcome/Welcome.jsx';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'لوحة التحكم',
  },
];

const Modern = () => {
  // TODO: Get supplier name from authentication context
  const supplierName = 'شركة التقنية المتقدمة'; // Replace with actual supplier data

  return (
    <PageContainer title="لوحة تحكم المورد" description="إحصائيات ومعلومات المورد">
      <Breadcrumb title={`مرحباً، ${supplierName}`} items={BCrumb} />

      <Box>
        <Box mb={3}>
          <Typography variant="h4" fontWeight={700} mb={1}>
            إحصائياتك
          </Typography>
          <Typography variant="body1" color="text.secondary">
            نظرة شاملة على أداء منتجاتك وطلباتك
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Top cards */}
          <Grid size={12}>
            <TopCards />
          </Grid>
          {/* Revenue + right column widgets */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <RevenueUpdates />
          </Grid>
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
          {/* Additional analytics */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <WeeklyStats />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <SellingProducts />
          </Grid>
          <Grid size={{ xs: 12, lg: 12 }}>
            <TopPerformers />
          </Grid>
        </Grid>

        {/* Welcome */}
        <Welcome />
      </Box>
    </PageContainer>
  );
};

export default Modern;
