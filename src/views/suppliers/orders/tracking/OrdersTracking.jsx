import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Chip,
  Divider,
  Card,
  CardContent,
  Avatar,
  alpha,
} from '@mui/material';
import {
  IconPackage,
  IconTruck,
  IconCheck,
  IconMapPin,
  IconClock,
  IconShoppingCart,
  IconCircleCheck,
} from '@tabler/icons-react';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { DateWithIcon } from '../common/shared';
import { useTheme } from '@mui/material/styles';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'الرئيسية',
  },
  {
    title: 'تتبع الطلبات',
  },
];

const OrdersTracking = () => {
  const theme = useTheme();
  // Mock data
  const trackingOrders = [
    {
      id: 'ORD-2024-005',
      customerName: 'شركة التقنية المتقدمة',
      status: 'قيد التوصيل',
      currentStep: 2,
      estimatedDelivery: '2024-01-18',
      trackingNumber: 'TRK-2024-12345',
      carrier: 'شركة الشحن السريع',
      steps: [
        {
          label: 'تم الاستلام',
          description: 'تم استلام الطلب وجاري المعالجة',
          date: '2024-01-15 10:30',
          completed: true,
        },
        {
          label: 'قيد التجهيز',
          description: 'جاري تجهيز المنتجات للشحن',
          date: '2024-01-16 14:20',
          completed: true,
        },
        {
          label: 'قيد التوصيل',
          description: 'الشحنة في طريقها إلى العميل',
          date: '2024-01-17 09:15',
          completed: true,
        },
        {
          label: 'تم التسليم',
          description: 'سيتم التسليم قريباً',
          date: '-',
          completed: false,
        },
      ],
    },
    {
      id: 'ORD-2024-006',
      customerName: 'متجر الإلكترونيات',
      status: 'قيد التجهيز',
      currentStep: 1,
      estimatedDelivery: '2024-01-20',
      trackingNumber: 'TRK-2024-12346',
      carrier: 'شركة التوصيل السريع',
      steps: [
        {
          label: 'تم الاستلام',
          description: 'تم استلام الطلب وجاري المعالجة',
          date: '2024-01-16 11:00',
          completed: true,
        },
        {
          label: 'قيد التجهيز',
          description: 'جاري تجهيز المنتجات للشحن',
          date: '2024-01-17 10:30',
          completed: true,
        },
        {
          label: 'قيد التوصيل',
          description: 'سيتم الشحن قريباً',
          date: '-',
          completed: false,
        },
        {
          label: 'تم التسليم',
          description: 'في انتظار التوصيل',
          date: '-',
          completed: false,
        },
      ],
    },
  ];

  // Calculate tracking statistics
  const totalTracking = trackingOrders.length;
  const inTransit = trackingOrders.filter((o) => o.status === 'قيد التوصيل').length;
  const inPreparation = trackingOrders.filter((o) => o.status === 'قيد التجهيز').length;
  const delivered = trackingOrders.filter((o) => o.status === 'تم التسليم').length;

  const trackingStats = [
    {
      title: 'طلبات قيد التتبع',
      value: totalTracking,
      icon: IconShoppingCart,
      color: 'primary',
    },
    {
      title: 'قيد التجهيز',
      value: inPreparation,
      icon: IconPackage,
      color: 'warning',
    },
    {
      title: 'قيد التوصيل',
      value: inTransit,
      icon: IconTruck,
      color: 'info',
    },
    {
      title: 'تم التسليم',
      value: delivered,
      icon: IconCircleCheck,
      color: 'success',
    },
  ];

  return (
    <PageContainer title="تتبع الطلبات" description="تتبع حالة الطلبات">
      <Breadcrumb title="تتبع الطلبات" items={BCrumb} />

      <Box>
        {/* Tracking Statistics */}
        <Grid container spacing={3} mb={3}>
          {trackingStats.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  flexDirection: 'row',
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
                  '& .stat-icon': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" width="180px" height="90px" margin="auto" flexDirection="column" justifyContent="center">
                    <Box display="flex" alignItems="center" width="60px" height="60px" margin="auto" flexDirection="column" justifyContent="center" mb={2}>
                      <Avatar sx={{ bgcolor: alpha(theme.palette[stat.color].main, 0.1), color: theme.palette[stat.color].main, width: 60, height: 60, justifyContent: 'center' }}>
                        <stat.icon />
                      </Avatar>
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {stat.title}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tracking Details */}
        <Grid container spacing={3}>
          {trackingOrders.map((order) => (
            <Grid size={{ xs: 12, lg: 6 }} key={order.id}>
              <DashboardCard title={`طلب ${order.id}`} subtitle={order.customerName}>
                <Box>
                  {/* Order Info */}
                  <Box mb={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          رقم التتبع
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {order.trackingNumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          شركة الشحن
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {order.carrier}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          الحالة
                        </Typography>
                        <Chip label={order.status} size="small" color="primary" sx={{ mt: 0.5 }} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          التسليم المتوقع
                        </Typography>
                        <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                          <DateWithIcon date={order.estimatedDelivery} />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Tracking Steps */}
                  <Stepper activeStep={order.currentStep} orientation="vertical">
                    {order.steps.map((step, index) => (
                      <Step key={index}>
                        <StepLabel
                          StepIconProps={{
                            sx: {
                              color: step.completed ? 'success.main' : 'grey.400',
                            },
                          }}
                        >
                          <Typography variant="subtitle2" fontWeight={600}>
                            {step.label}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {step.description}
                          </Typography>
                          {step.date !== '-' && (
                            <Typography variant="caption" color="textSecondary">
                              {step.date}
                            </Typography>
                          )}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </DashboardCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default OrdersTracking;
