import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  Badge,
  Grid,
  Card,
  CardContent,
  Drawer,
  Divider,
  Stack,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  IconEye,
  IconDownload,
  IconClock,
  IconCheck,
  IconAlertCircle,
  IconShoppingCart,
  IconCurrencyDollar,
  IconX,
} from '@tabler/icons-react';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { PriorityChip, DateWithIcon, StatusChip, downloadOrderPdf } from '../common/shared';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'الرئيسية',
  },
  {
    title: 'الطلبات الجديدة',
  },
];

const OrdersNew = () => {
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOpenViewDrawer(true);
  };

  const handleAcceptOrder = (order) => {
    setSnackbar({
      open: true,
      message: `تم قبول الطلب ${order.id}`,
      severity: 'success',
    });
  };

  const handleRejectOrder = (order) => {
    setSnackbar({
      open: true,
      message: `تم رفض الطلب ${order.id}`,
      severity: 'error',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Mock data
  const newOrders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      customerName: 'شركة التقنية المتقدمة',
      products: 15,
      totalAmount: 67500,
      status: 'جديد',
      priority: 'عالية',
      dueDate: '2024-01-20',
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-15',
      customerName: 'متجر الإلكترونيات',
      products: 8,
      totalAmount: 44000,
      status: 'جديد',
      priority: 'متوسطة',
      dueDate: '2024-01-22',
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-14',
      customerName: 'شركة الابتكار الرقمي',
      products: 22,
      totalAmount: 98500,
      status: 'جديد',
      priority: 'عالية',
      dueDate: '2024-01-19',
    },
    {
      id: 'ORD-2024-004',
      date: '2024-01-14',
      customerName: 'مؤسسة النجاح',
      products: 5,
      totalAmount: 22500,
      status: 'قيد المراجعة',
      priority: 'منخفضة',
      dueDate: '2024-01-25',
    },
  ];

  // colors and chips now unified in shared helpers

  // Calculate new order statistics
  const totalNewOrders = newOrders.length;
  const highPriority = newOrders.filter((o) => o.priority === 'عالية').length;
  const totalValue = newOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const underReview = newOrders.filter((o) => o.status === 'قيد المراجعة').length;

  const newOrderStats = [
    {
      title: 'طلبات جديدة',
      value: totalNewOrders,
      icon: IconShoppingCart,
      color: 'primary',
    },
    {
      title: 'أولوية عالية',
      value: highPriority,
      icon: IconAlertCircle,
      color: 'error',
    },
    {
      title: 'قيد المراجعة',
      value: underReview,
      icon: IconClock,
      color: 'warning',
    },
    {
      title: 'القيمة الإجمالية',
      value: `${(totalValue / 1000).toFixed(0)}K ر.س`,
      icon: IconCurrencyDollar,
      color: 'success',
    },
  ];

  return (
    <PageContainer title="الطلبات الجديدة" description="عرض الطلبات الجديدة">
      <Breadcrumb title="الطلبات الجديدة" items={BCrumb} />

      <Box>
        {/* New Orders Statistics */}
        <Grid container spacing={3} mb={3}>
          {newOrderStats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h6" color="textSecondary" gutterBottom>
                        {stat.title}
                      </Typography>
                      <Typography variant="h3" fontWeight={600}>
                        {stat.value}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Orders Table */}
        <DashboardCard
          title="الطلبات الجديدة"
          subtitle="عرض جميع الطلبات الجديدة التي تتطلب مراجعتك"
          sx={(theme) => ({
            borderRadius: 12,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}0F 0%, ${theme.palette.primary.main}08 100%)`,
            border: `1px solid ${theme.palette.primary.main}22`,
          })}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>رقم الطلب</TableCell>
                  <TableCell>التاريخ</TableCell>
                  <TableCell>العميل</TableCell>
                  <TableCell align="center">المنتجات</TableCell>
                  <TableCell align="center">المبلغ (ر.س)</TableCell>
                  <TableCell align="center">الأولوية</TableCell>
                  <TableCell align="center">موعد التسليم</TableCell>
                  <TableCell align="center">الحالة</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newOrders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={700} color="primary">
                        {order.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {order.customerName}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={order.products} size="small" color="primary" />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600} color="success.main">
                        {order.totalAmount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <PriorityChip label={order.priority} />
                    </TableCell>
                    <TableCell align="center">
                      <DateWithIcon date={order.dueDate} />
                    </TableCell>
                    <TableCell align="center">
                      <StatusChip label={order.status} />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="عرض التفاصيل">
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleViewOrder(order)}
                          >
                            <IconEye size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="قبول الطلب">
                          <IconButton
                            color="success"
                            size="small"
                            onClick={() => handleAcceptOrder(order)}
                          >
                            <IconCheck size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="تحميل الفاتورة">
                          <IconButton
                            color="info"
                            size="small"
                            onClick={() => downloadOrderPdf(order.id)}
                          >
                            <IconDownload size={18} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>

        {/* View Order Drawer */}
        <Drawer
          anchor="left"
          open={openViewDrawer}
          onClose={() => setOpenViewDrawer(false)}
          PaperProps={{ sx: { width: { xs: '100%', sm: 500 } } }}
        >
          {selectedOrder && (
            <Box sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={600}>
                  تفاصيل الطلب
                </Typography>
                <IconButton onClick={() => setOpenViewDrawer(false)}>
                  <IconX />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    رقم الطلب
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="primary">
                    {selectedOrder.id}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    العميل
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {selectedOrder.customerName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    تاريخ الطلب
                  </Typography>
                  <Typography variant="body1">{selectedOrder.date}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    عدد المنتجات
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {selectedOrder.products}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    المبلغ الإجمالي
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="success.main">
                    {selectedOrder.totalAmount.toLocaleString()} ر.س
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    الأولوية
                  </Typography>
                  <PriorityChip label={selectedOrder.priority} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    تاريخ التسليم المتوقع
                  </Typography>
                  <Typography variant="body1">{selectedOrder.dueDate}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    الحالة
                  </Typography>
                  <StatusChip label={selectedOrder.status} />
                </Box>
              </Stack>

              <Box mt={4}>
                <Stack spacing={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    startIcon={<IconCheck />}
                    onClick={() => {
                      handleAcceptOrder(selectedOrder);
                      setOpenViewDrawer(false);
                    }}
                  >
                    قبول الطلب
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<IconDownload />}
                    onClick={() => downloadOrderPdf(selectedOrder.id)}
                  >
                    تحميل الفاتورة
                  </Button>
                </Stack>
              </Box>
            </Box>
          )}
        </Drawer>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </PageContainer>
  );
};

export default OrdersNew;
