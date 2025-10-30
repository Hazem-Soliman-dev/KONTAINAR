import React from 'react';
import { Box, Grid, Typography, Card, CardContent, Avatar, alpha, useTheme, Divider } from '@mui/material';
import {
  IconPackage,
  IconCategory,
  IconTrendingUp,
  IconShoppingCart,
  IconClock,
  IconAlertCircle,
  IconCheck,
  IconX,
  IconTruck,
  IconFileInvoice,
  IconCash,
  IconWallet,
  IconCreditCard,
  IconRefresh,
  IconPackageOff,
  IconTruckDelivery,
  IconReplace,
  IconMessageCircle,
  IconFileDescription,
  IconCalendar,
  IconCircleCheck,
  IconStar,
} from '@tabler/icons-react';

const AllStatistics = () => {
  const theme = useTheme();

  // Supplier Dashboard Statistics
  // TODO: Replace with actual supplier data from API/Context
  
  // Products Statistics
  const productsStats = [
    {
      icon: IconPackage,
      title: 'إجمالي المنتجات',
      value: '142',
      color: 'primary',
      category: 'المنتجات',
    },
    {
      icon: IconCategory,
      title: 'التصنيفات',
      value: '12',
      color: 'success',
      category: 'المنتجات',
    },
    {
      icon: IconTrendingUp,
      title: 'المبيعات الشهرية',
      value: '342',
      color: 'warning',
      category: 'المنتجات',
    },
    {
      icon: IconStar,
      title: 'متوسط التقييم',
      value: '4.7',
      color: 'info',
      category: 'المنتجات',
    },
  ];

  // Orders Statistics
  const ordersStats = [
    {
      icon: IconShoppingCart,
      title: 'طلبات جديدة',
      value: '28',
      color: 'primary',
      category: 'الطلبات',
    },
    {
      icon: IconClock,
      title: 'قيد المراجعة',
      value: '12',
      color: 'warning',
      category: 'الطلبات',
    },
    {
      icon: IconCheck,
      title: 'طلبات مكتملة',
      value: '1,089',
      color: 'success',
      category: 'الطلبات',
    },
    {
      icon: IconAlertCircle,
      title: 'عاجل',
      value: '5',
      color: 'error',
      category: 'الطلبات',
    },
  ];

  // Tracking Statistics
  const trackingStats = [
    {
      icon: IconPackage,
      title: 'قيد التجهيز',
      value: '15',
      color: 'warning',
      category: 'التتبع',
    },
    {
      icon: IconTruck,
      title: 'قيد التوصيل',
      value: '23',
      color: 'info',
      category: 'التتبع',
    },
    {
      icon: IconCheck,
      title: 'تم التسليم',
      value: '142',
      color: 'success',
      category: 'التتبع',
    },
    {
      icon: IconClock,
      title: 'متأخر',
      value: '3',
      color: 'error',
      category: 'التتبع',
    },
  ];

  // Invoices Statistics
  const invoicesStats = [
    {
      icon: IconFileInvoice,
      title: 'إجمالي الفواتير',
      value: '342',
      color: 'primary',
      category: 'الفواتير',
    },
    {
      icon: IconCash,
      title: 'مدفوعة',
      value: '289',
      color: 'success',
      category: 'الفواتير',
    },
    {
      icon: IconClock,
      title: 'معلقة',
      value: '42',
      color: 'warning',
      category: 'الفواتير',
    },
    {
      icon: IconAlertCircle,
      title: 'متأخرة',
      value: '11',
      color: 'error',
      category: 'الفواتير',
    },
  ];

  // Payments Statistics
  const paymentsStats = [
    {
      icon: IconCash,
      title: 'إجمالي المدفوعات',
      value: '2.8M',
      color: 'primary',
      category: 'المدفوعات',
    },
    {
      icon: IconTrendingUp,
      title: 'معدل النمو',
      value: '+23%',
      color: 'success',
      category: 'المدفوعات',
    },
    {
      icon: IconWallet,
      title: 'الرصيد المتاح',
      value: '456K',
      color: 'warning',
      category: 'المدفوعات',
    },
    {
      icon: IconCreditCard,
      title: 'مدفوعات معلقة',
      value: '125K',
      color: 'error',
      category: 'المدفوعات',
    },
  ];

  // Returns Statistics
  const returnsStats = [
    {
      icon: IconRefresh,
      title: 'إجمالي المرتجعات',
      value: '45',
      color: 'primary',
      category: 'المرتجعات',
    },
    {
      icon: IconClock,
      title: 'قيد المراجعة',
      value: '12',
      color: 'warning',
      category: 'المرتجعات',
    },
    {
      icon: IconCheck,
      title: 'مقبولة',
      value: '28',
      color: 'success',
      category: 'المرتجعات',
    },
    {
      icon: IconPackageOff,
      title: 'منتجات تالفة',
      value: '23',
      color: 'error',
      category: 'المرتجعات',
    },
  ];

  // Support Statistics
  const supportStats = [
    {
      icon: IconMessageCircle,
      title: 'تذاكر مفتوحة',
      value: '5',
      color: 'primary',
      category: 'الدعم',
    },
    {
      icon: IconClock,
      title: 'قيد المعالجة',
      value: '3',
      color: 'warning',
      category: 'الدعم',
    },
    {
      icon: IconCheck,
      title: 'تم الحل',
      value: '47',
      color: 'success',
      category: 'الدعم',
    },
    {
      icon: IconAlertCircle,
      title: 'عاجل',
      value: '2',
      color: 'error',
      category: 'الدعم',
    },
  ];

  // Contract Statistics
  const contractStats = [
    {
      icon: IconFileDescription,
      title: 'رقم العقد',
      value: 'CON-2023-00145',
      color: 'primary',
      category: 'العقد',
    },
    {
      icon: IconCalendar,
      title: 'مدة العقد',
      value: '3 سنوات',
      color: 'success',
      category: 'العقد',
    },
    {
      icon: IconCheck,
      title: 'الحالة',
      value: 'نشط',
      color: 'info',
      category: 'العقد',
    },
    {
      icon: IconCircleCheck,
      title: 'التجديد',
      value: 'تلقائي',
      color: 'warning',
      category: 'العقد',
    },
  ];

  const allSections = [
    { title: 'المنتجات', stats: productsStats },
    { title: 'الطلبات والتتبع', stats: [...ordersStats, ...trackingStats] },
    { title: 'الفواتير والمدفوعات', stats: [...invoicesStats, ...paymentsStats] },
    { title: 'المرتجعات', stats: returnsStats },
    { title: 'الدعم والعقد', stats: [...supportStats, ...contractStats] },
  ];

  return (
    <Box>
      {allSections.map((section, sectionIndex) => (
        <Box key={sectionIndex} mb={4}>
          <Typography variant="h5" fontWeight={700} mb={2} color="primary">
            {section.title}
          </Typography>
          <Grid container spacing={3}>
            {section.stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette[stat.color].main,
                      0.08,
                    )} 0%, ${alpha(theme.palette[stat.color].main, 0.04)} 100%)`,
                    border: `1px solid ${alpha(theme.palette[stat.color].main, 0.2)}`,
                    transition: 'all .3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette[stat.color].main, 0.1),
                        color: theme.palette[stat.color].main,
                        width: 56,
                        height: 56,
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <stat.icon />
                    </Avatar>
                    <Typography variant="h4" fontWeight={700} mb={1}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {sectionIndex < allSections.length - 1 && <Divider sx={{ mt: 4 }} />}
        </Box>
      ))}
    </Box>
  );
};

export default AllStatistics;

