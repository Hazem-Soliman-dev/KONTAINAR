import React from 'react';
import { Box, Grid, Typography, Chip, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';

const InvoiceDetails = () => {
  const { id } = useParams();

  // Mock invoice details
  const invoice = {
    id,
    orderId: 'ORD-2023-156',
    date: '2024-01-10',
    dueDate: '2024-02-10',
    customerName: 'شركة التقنية المتقدمة',
    amount: 112500,
    paid: 112500,
    status: 'مدفوعة',
    paymentMethod: 'تحويل بنكي',
    items: [
      { sku: 'SKU-001', name: 'منتج 1', qty: 5, price: 1000 },
      { sku: 'SKU-002', name: 'منتج 2', qty: 10, price: 2500 },
    ],
  };

  const BCrumb = [
    { to: '/suppliers', title: 'الرئيسية' },
    { to: '/suppliers/invoices/list', title: 'قائمة الفواتير' },
    { title: `تفاصيل الفاتورة ${invoice.id}` },
  ];

  return (
    <PageContainer title={`تفاصيل الفاتورة ${invoice.id}`} description="عرض تفاصيل الفاتورة">
      <Breadcrumb title={`تفاصيل الفاتورة ${invoice.id}`} items={BCrumb} />
      <Box>
        <DashboardCard title={`الفاتورة ${invoice.id}`} subtitle={invoice.customerName}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">
                رقم الطلب
              </Typography>
              <Typography variant="subtitle2">{invoice.orderId}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">
                التاريخ
              </Typography>
              <Typography variant="subtitle2">{invoice.date}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">
                تاريخ الاستحقاق
              </Typography>
              <Typography variant="subtitle2">{invoice.dueDate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">
                الحالة
              </Typography>
              <Box mt={0.5}>
                <Chip size="small" label={invoice.status} color="success" />
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" mb={1}>
            المنتجات
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            {invoice.items.map((item) => (
              <Box key={item.sku} display="flex" justifyContent="space-between">
                <Typography variant="body2">
                  {item.name} ({item.sku}) × {item.qty}
                </Typography>
                <Chip size="small" label={`${(item.qty * item.price).toLocaleString()} ر.س`} />
              </Box>
            ))}
          </Box>
        </DashboardCard>
      </Box>
    </PageContainer>
  );
};

export default InvoiceDetails;
