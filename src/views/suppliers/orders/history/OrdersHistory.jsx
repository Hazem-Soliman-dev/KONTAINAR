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
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Grid,
  Card,
  CardContent,
  Drawer,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Tooltip,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  IconSearch,
  IconEye,
  IconDownload,
  IconShoppingCart,
  IconCurrencyDollar,
  IconCheck,
  IconClock,
  IconX,
  IconEdit,
  IconNotes,
} from '@tabler/icons-react';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { StatusChip, downloadOrderPdf } from '../common/shared';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'الرئيسية',
  },
  {
    title: 'سجل الطلبات',
  },
];

const OrdersHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openNotesDialog, setOpenNotesDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOpenViewDrawer(true);
  };

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setOpenStatusDialog(true);
  };

  const handleAddNotes = (order) => {
    setSelectedOrder(order);
    setNotes(order.notes || '');
    setOpenNotesDialog(true);
  };

  const handleSaveStatus = () => {
    setSnackbar({
      open: true,
      message: 'تم تحديث حالة الطلب بنجاح',
      severity: 'success',
    });
    setOpenStatusDialog(false);
  };

  const handleSaveNotes = () => {
    setSnackbar({
      open: true,
      message: 'تم حفظ الملاحظات بنجاح',
      severity: 'success',
    });
    setOpenNotesDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Mock data
  const orders = [
    {
      id: 'ORD-2023-156',
      date: '2024-01-10',
      customerName: 'شركة التقنية المتقدمة',
      products: 25,
      totalAmount: 112500,
      status: 'مكتمل',
      deliveryDate: '2024-01-12',
    },
    {
      id: 'ORD-2023-155',
      date: '2024-01-08',
      customerName: 'متجر الإلكترونيات',
      products: 18,
      totalAmount: 79200,
      status: 'مكتمل',
      deliveryDate: '2024-01-11',
    },
    {
      id: 'ORD-2023-154',
      date: '2024-01-05',
      customerName: 'شركة الابتكار الرقمي',
      products: 12,
      totalAmount: 54000,
      status: 'ملغى',
      deliveryDate: '-',
    },
    {
      id: 'ORD-2023-153',
      date: '2024-01-03',
      customerName: 'مؤسسة النجاح',
      products: 30,
      totalAmount: 135000,
      status: 'قيد التنفيذ',
      deliveryDate: '2024-01-16',
    },
    {
      id: 'ORD-2023-152',
      date: '2024-01-01',
      customerName: 'شركة الأمل',
      products: 8,
      totalAmount: 36000,
      status: 'مكتمل',
      deliveryDate: '2024-01-04',
    },
  ];

  // status colors are unified in shared helpers

  const filteredOrders = orders.filter(
    (order) =>
      (statusFilter === 'الكل' || order.status === statusFilter) &&
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  // Calculate order statistics
  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === 'مكتمل').length;
  const pendingOrders = orders.filter(
    (o) => o.status === 'قيد التنفيذ' || o.status === 'قيد المراجعة',
  ).length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const orderStatsCards = [
    {
      title: 'إجمالي الطلبات',
      value: totalOrders,
      icon: IconShoppingCart,
      color: 'primary',
    },
    {
      title: 'طلبات مكتملة',
      value: completedOrders,
      icon: IconCheck,
      color: 'success',
    },
    {
      title: 'قيد التنفيذ',
      value: pendingOrders,
      icon: IconClock,
      color: 'warning',
    },
    {
      title: 'إجمالي الإيرادات',
      value: `${(totalRevenue / 1000).toFixed(0)}K ر.س`,
      icon: IconCurrencyDollar,
      color: 'info',
    },
  ];

  return (
    <PageContainer title="سجل الطلبات" description="عرض سجل جميع الطلبات">
      <Breadcrumb title="سجل الطلبات" items={BCrumb} />

      <Box>
        {/* Order Statistics */}
        <Grid container spacing={3} mb={3}>
          {orderStatsCards.map((stat, index) => (
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

        {/* Orders History Table */}
        <DashboardCard
          title="سجل الطلبات"
          subtitle="عرض جميع الطلبات السابقة"
          action={
            <Box display="flex" gap={2}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>الحالة</InputLabel>
                <Select
                  value={statusFilter}
                  label="الحالة"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="الكل">الكل</MenuItem>
                  <MenuItem value="مكتمل">مكتمل</MenuItem>
                  <MenuItem value="قيد التنفيذ">قيد التنفيذ</MenuItem>
                  <MenuItem value="ملغى">ملغى</MenuItem>
                </Select>
              </FormControl>
              <TextField
                size="small"
                placeholder="بحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          }
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
                  <TableCell align="center">تاريخ التسليم</TableCell>
                  <TableCell align="center">الحالة</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
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
                      <Typography variant="body2">{order.deliveryDate}</Typography>
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
                        <Tooltip title="تحديث الحالة">
                          <IconButton
                            color="secondary"
                            size="small"
                            onClick={() => handleUpdateStatus(order)}
                          >
                            <IconEdit size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="إضافة ملاحظات">
                          <IconButton
                            color="warning"
                            size="small"
                            onClick={() => handleAddNotes(order)}
                          >
                            <IconNotes size={18} />
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
                    تاريخ التسليم
                  </Typography>
                  <Typography variant="body1">{selectedOrder.deliveryDate}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    الحالة
                  </Typography>
                  <StatusChip label={selectedOrder.status} />
                </Box>
              </Stack>

              <Box mt={4}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<IconDownload />}
                  onClick={() => downloadOrderPdf(selectedOrder.id)}
                >
                  تحميل الفاتورة
                </Button>
              </Box>
            </Box>
          )}
        </Drawer>

        {/* Update Status Dialog */}
        <Dialog
          open={openStatusDialog}
          onClose={() => setOpenStatusDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>تحديث حالة الطلب</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                الطلب: {selectedOrder?.id}
              </Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>الحالة الجديدة</InputLabel>
                <Select
                  value={newStatus}
                  label="الحالة الجديدة"
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <MenuItem value="قيد المراجعة">قيد المراجعة</MenuItem>
                  <MenuItem value="قيد التنفيذ">قيد التنفيذ</MenuItem>
                  <MenuItem value="قيد التوصيل">قيد التوصيل</MenuItem>
                  <MenuItem value="مكتمل">مكتمل</MenuItem>
                  <MenuItem value="ملغى">ملغى</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenStatusDialog(false)}>إلغاء</Button>
            <Button variant="contained" onClick={handleSaveStatus}>
              حفظ
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Notes Dialog */}
        <Dialog
          open={openNotesDialog}
          onClose={() => setOpenNotesDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>إضافة ملاحظات للطلب</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                الطلب: {selectedOrder?.id}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="الملاحظات"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                sx={{ mt: 2 }}
                placeholder="أضف ملاحظاتك هنا..."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenNotesDialog(false)}>إلغاء</Button>
            <Button variant="contained" onClick={handleSaveNotes}>
              حفظ
            </Button>
          </DialogActions>
        </Dialog>

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

export default OrdersHistory;
