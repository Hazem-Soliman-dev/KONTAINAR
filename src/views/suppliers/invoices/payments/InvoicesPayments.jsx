import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  Avatar,
  alpha,
} from '@mui/material';
import {
  IconCheck,
  IconCurrencyDollar,
  IconCreditCard,
  IconClock,
  IconReceipt,
} from '@tabler/icons-react';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { useTheme } from '@mui/material/styles';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'الرئيسية',
  },
  {
    title: 'المدفوعات',
  },
];

const InvoicesPayments = () => {
  const theme = useTheme();
  // Mock data
  const payments = [
    {
      id: 'PAY-2024-001',
      invoiceId: 'INV-2024-001',
      date: '2024-01-12',
      customerName: 'شركة التقنية المتقدمة',
      amount: 112500,
      method: 'تحويل بنكي',
      status: 'مكتمل',
      reference: 'TRF-2024-12345',
    },
    {
      id: 'PAY-2024-002',
      invoiceId: 'INV-2024-003',
      date: '2024-01-05',
      customerName: 'شركة الأمل',
      amount: 36000,
      method: 'بطاقة ائتمان',
      status: 'مكتمل',
      reference: 'CC-2024-67890',
    },
    {
      id: 'PAY-2023-158',
      invoiceId: 'INV-2023-158',
      date: '2023-12-30',
      customerName: 'مؤسسة النجاح',
      amount: 67500,
      method: 'تحويل بنكي',
      status: 'مكتمل',
      reference: 'TRF-2023-54321',
    },
    {
      id: 'PAY-2023-157',
      invoiceId: 'INV-2023-145',
      date: '2023-12-28',
      customerName: 'شركة الابتكار الرقمي',
      amount: 54000,
      method: 'شيك',
      status: 'قيد المعالجة',
      reference: 'CHK-2023-11111',
    },
  ];

  const paymentMethods = [
    { method: 'تحويل بنكي', count: 142, percentage: 45, color: 'primary' },
    { method: 'بطاقة ائتمان', count: 89, percentage: 28, color: 'success' },
    { method: 'نقداً', count: 56, percentage: 18, color: 'warning' },
    { method: 'شيك', count: 28, percentage: 9, color: 'error' },
  ];

  // Calculate payment statistics
  const totalPayments = payments.length;
  const completedPayments = payments.filter((p) => p.status === 'مكتمل').length;
  const pendingPayments = payments.filter((p) => p.status === 'قيد المعالجة').length;
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  const paymentStats = [
    {
      title: 'إجمالي المدفوعات',
      value: totalPayments,
      icon: IconReceipt,
      color: 'primary',
    },
    {
      title: 'مدفوعات مكتملة',
      value: completedPayments,
      icon: IconCheck,
      color: 'success',
    },
    {
      title: 'قيد المعالجة',
      value: pendingPayments,
      icon: IconClock,
      color: 'warning',
    },
    {
      title: 'المبلغ الإجمالي',
      value: `${(totalAmount / 1000).toFixed(0)}K ر.س`,
      icon: IconCurrencyDollar,
      color: 'info',
    },
  ];

  return (
    <PageContainer title="المدفوعات" description="عرض جميع المدفوعات">
      <Breadcrumb title="المدفوعات" items={BCrumb} />

      <Box>
        {/* Payment Statistics */}
        <Grid container spacing={3} mb={3}>
          {paymentStats.map((stat, index) => (
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
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Avatar sx={{ bgcolor: alpha(theme.palette[stat.color].main, 0.1), color: theme.palette[stat.color].main, width: 56, height: 56, mx: 'auto', mb: 2 }}>
                      <stat.icon />
                    </Avatar>
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

        <Grid container spacing={3}>
          {/* Payment Methods */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <DashboardCard title="طرق الدفع" subtitle="توزيع المدفوعات حسب الطريقة">
              <Box>
                {paymentMethods.map((method, index) => (
                  <Box key={index} mb={3}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {method.method}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {method.count} مدفوعة
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={method.percentage}
                      color={method.color}
                      sx={{ height: 8, borderRadius: 5 }}
                    />
                    <Typography variant="caption" color="textSecondary" mt={0.5}>
                      {method.percentage}% من إجمالي المدفوعات
                    </Typography>
                  </Box>
                ))}
              </Box>
            </DashboardCard>
          </Grid>

          {/* Recent Payments */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <DashboardCard title="المدفوعات الأخيرة" subtitle="آخر المدفوعات المستلمة">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>رقم الدفعة</TableCell>
                      <TableCell>رقم الفاتورة</TableCell>
                      <TableCell>التاريخ</TableCell>
                      <TableCell>العميل</TableCell>
                      <TableCell align="center">المبلغ (ر.س)</TableCell>
                      <TableCell align="center">الطريقة</TableCell>
                      <TableCell align="center">الحالة</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id} hover>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={700} color="primary">
                            {payment.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="textSecondary">
                            {payment.invoiceId}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{payment.date}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {payment.customerName}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="subtitle2" fontWeight={600} color="success.main">
                            {payment.amount.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip label={payment.method} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            icon={payment.status === 'مكتمل' ? <IconCheck size={16} /> : undefined}
                            label={payment.status}
                            size="small"
                            color={payment.status === 'مكتمل' ? 'success' : 'warning'}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default InvoicesPayments;
