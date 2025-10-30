import React from 'react';
import { Box, Grid, Typography, Chip, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { DateWithIcon, PriorityChip, StatusChip } from '../common/shared';

const OrderDetails = () => {
  const { id } = useParams();

  // Mock order details; replace with API data
  const order = {
    id,
    date: '2024-01-15',
    customerName: 'شركة التقنية المتقدمة',
    products: 15,
    totalAmount: 67500,
    status: 'جديد',
    priority: 'عالية',
    dueDate: '2024-01-20',
    items: [
      { sku: 'SKU-001', name: 'منتج 1', qty: 5, price: 1000 },
      { sku: 'SKU-002', name: 'منتج 2', qty: 10, price: 2500 },
    ],
  };

  const BCrumb = [
    { to: '/suppliers', title: 'الرئيسية' },
    { to: '/suppliers/orders/history', title: 'سجل الطلبات' },
    { title: `تفاصيل الطلب ${order.id}` },
  ];

  return (
    <PageContainer title={`تفاصيل الطلب ${order.id}`} description="عرض تفاصيل الطلب">
      <Breadcrumb title={`تفاصيل الطلب ${order.id}`} items={BCrumb} />
      <Box>
        <DashboardCard title={`الطلب ${order.id}`} subtitle={order.customerName}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">التاريخ</Typography>
              <Typography variant="subtitle2">{order.date}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">موعد التسليم</Typography>
              <DateWithIcon date={order.dueDate} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">الأولوية</Typography>
              <Box mt={0.5}><PriorityChip label={order.priority} /></Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">الحالة</Typography>
              <Box mt={0.5}><StatusChip label={order.status} /></Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" mb={1}>المنتجات</Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            {order.items.map((item) => (
              <Box key={item.sku} display="flex" justifyContent="space-between">
                <Typography variant="body2">{item.name} ({item.sku}) × {item.qty}</Typography>
                <Chip size="small" label={`${(item.qty * item.price).toLocaleString()} ر.س`} />
              </Box>
            ))}
          </Box>
        </DashboardCard>
      </Box>
    </PageContainer>
  );
};

export default OrderDetails;


