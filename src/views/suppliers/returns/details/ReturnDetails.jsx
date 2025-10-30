import React from 'react';
import { Box, Grid, Typography, Chip, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';

const ReturnDetails = () => {
  const { id } = useParams();

  // Mock return details
  const returnItem = {
    id,
    orderId: 'ORD-2023-145',
    date: '2024-01-12',
    customerName: 'شركة التقنية المتقدمة',
    productName: 'لابتوب ديل إكس بي إس 13',
    quantity: 2,
    reason: 'عيب تصنيع',
    status: 'قيد المراجعة',
    refundAmount: 9000,
    notes: 'تم استلام المنتجين مع تصوير العيب.'
  };

  const BCrumb = [
    { to: '/suppliers', title: 'الرئيسية' },
    { to: '/suppliers/returns/list', title: 'قائمة المرتجعات' },
    { title: `تفاصيل المرتجع ${returnItem.id}` },
  ];

  return (
    <PageContainer title={`تفاصيل المرتجع ${returnItem.id}`} description="عرض تفاصيل المرتجع">
      <Breadcrumb title={`تفاصيل المرتجع ${returnItem.id}`} items={BCrumb} />
      <Box>
        <DashboardCard title={`المرتجع ${returnItem.id}`} subtitle={returnItem.customerName}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">رقم الطلب</Typography>
              <Typography variant="subtitle2">{returnItem.orderId}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">التاريخ</Typography>
              <Typography variant="subtitle2">{returnItem.date}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">المنتج</Typography>
              <Typography variant="subtitle2">{returnItem.productName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">الكمية</Typography>
              <Box mt={0.5}><Chip size="small" label={returnItem.quantity} color="primary" /></Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">الحالة</Typography>
              <Box mt={0.5}><Chip size="small" label={returnItem.status} color="warning" /></Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">المبلغ المسترد</Typography>
              <Typography variant="subtitle2">{returnItem.refundAmount ? `${returnItem.refundAmount.toLocaleString()} ر.س` : '-'}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" mb={1}>ملاحظات</Typography>
          <Typography variant="body2">{returnItem.notes}</Typography>
        </DashboardCard>
      </Box>
    </PageContainer>
  );
};

export default ReturnDetails;


