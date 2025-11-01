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
  Avatar,
  alpha,
} from '@mui/material';
import {
  IconSearch,
  IconEye,
  IconCheck,
  IconX,
  IconRefresh,
  IconClock,
  IconAlertCircle,
  IconCurrencyDollar,
  IconEdit,
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
    title: 'قائمة المرتجعات',
  },
];

const ReturnsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();

  const handleViewReturn = (returnItem) => {
    setSelectedReturn(returnItem);
    setOpenViewDrawer(true);
  };

  const handleUpdateStatus = (returnItem) => {
    setSelectedReturn(returnItem);
    setNewStatus(returnItem.status);
    setOpenStatusDialog(true);
  };

  const handleSaveStatus = () => {
    setSnackbar({
      open: true,
      message: 'تم تحديث حالة المرتجع بنجاح',
      severity: 'success',
    });
    setOpenStatusDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Mock data
  const returns = [
    {
      id: 'RET-2024-001',
      orderId: 'ORD-2023-145',
      date: '2024-01-12',
      customerName: 'شركة التقنية المتقدمة',
      productName: 'لابتوب ديل إكس بي إس 13',
      quantity: 2,
      reason: 'عيب تصنيع',
      status: 'قيد المراجعة',
      refundAmount: 9000,
    },
    {
      id: 'RET-2024-002',
      orderId: 'ORD-2023-142',
      date: '2024-01-10',
      customerName: 'متجر الإلكترونيات',
      productName: 'هاتف آيفون 15 برو',
      quantity: 1,
      reason: 'لا يعمل بشكل صحيح',
      status: 'مقبول',
      refundAmount: 5500,
    },
    {
      id: 'RET-2024-003',
      orderId: 'ORD-2023-138',
      date: '2024-01-08',
      customerName: 'شركة الابتكار الرقمي',
      productName: 'سماعات سوني WH-1000XM5',
      quantity: 3,
      reason: 'طلب خاطئ',
      status: 'مرفوض',
      refundAmount: 0,
    },
    {
      id: 'RET-2023-156',
      orderId: 'ORD-2023-125',
      date: '2023-12-28',
      customerName: 'مؤسسة النجاح',
      productName: 'كاميرا كانون EOS R5',
      quantity: 1,
      reason: 'تلف أثناء الشحن',
      status: 'مكتمل',
      refundAmount: 12000,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'مكتمل':
        return 'success';
      case 'مقبول':
        return 'info';
      case 'قيد المراجعة':
        return 'warning';
      case 'مرفوض':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredReturns = returns.filter(
    (returnItem) =>
      (statusFilter === 'الكل' || returnItem.status === statusFilter) &&
      (returnItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnItem.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnItem.productName.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  // Calculate returns statistics
  const totalReturns = returns.length;
  const underReview = returns.filter((r) => r.status === 'قيد المراجعة').length;
  const accepted = returns.filter((r) => r.status === 'مقبول' || r.status === 'مكتمل').length;
  const rejected = returns.filter((r) => r.status === 'مرفوض').length;
  const totalRefundAmount = returns.reduce((sum, r) => sum + r.refundAmount, 0);

  const returnStats = [
    {
      title: 'إجمالي المرتجعات',
      value: totalReturns,
      icon: IconRefresh,
      color: 'primary',
    },
    {
      title: 'قيد المراجعة',
      value: underReview,
      icon: IconClock,
      color: 'warning',
    },
    {
      title: 'مرتجعات مقبولة',
      value: accepted,
      icon: IconCheck,
      color: 'success',
    },
    {
      title: 'قيمة الاسترداد',
      value: `${(totalRefundAmount / 1000).toFixed(0)}K ر.س`,
      icon: IconCurrencyDollar,
      color: 'info',
    },
  ];

  return (
    <PageContainer title="قائمة المرتجعات" description="عرض جميع المرتجعات">
      <Breadcrumb title="قائمة المرتجعات" items={BCrumb} />

      <Box>
        {/* Returns Statistics */}
        <Grid container spacing={3} mb={3}>
          {returnStats.map((stat, index) => (
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
                    <Avatar sx={{ bgcolor: alpha(theme.palette[stat.color].main, 0.1), color: theme.palette[stat.color].main, width: 60, height: 60, justifyContent: 'center', mb: 2 }}>
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

        {/* Returns Table */}
        <DashboardCard
          title="قائمة المرتجعات"
          subtitle="عرض جميع طلبات الإرجاع"
          sx={(theme) => ({
            borderRadius: 12,
            background: `linear-gradient(135deg, ${theme.palette.warning.main}0F 0%, ${theme.palette.warning.main}08 100%)`,
            border: `1px solid ${theme.palette.warning.main}22`,
          })}
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
                  <MenuItem value="قيد المراجعة">قيد المراجعة</MenuItem>
                  <MenuItem value="مقبول">مقبول</MenuItem>
                  <MenuItem value="مرفوض">مرفوض</MenuItem>
                  <MenuItem value="مكتمل">مكتمل</MenuItem>
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
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>رقم المرتجع</TableCell>
                  <TableCell>رقم الطلب</TableCell>
                  <TableCell>التاريخ</TableCell>
                  <TableCell>العميل</TableCell>
                  <TableCell>المنتج</TableCell>
                  <TableCell align="center">الكمية</TableCell>
                  <TableCell>السبب</TableCell>
                  <TableCell align="center">المبلغ المسترد</TableCell>
                  <TableCell align="center">الحالة</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReturns.map((returnItem) => (
                  <TableRow key={returnItem.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={700} color="primary">
                        {returnItem.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {returnItem.orderId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{returnItem.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {returnItem.customerName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{returnItem.productName}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={returnItem.quantity} size="small" color="primary" />
                    </TableCell>
                    <TableCell>
                      <Chip label={returnItem.reason} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600} color="success.main">
                        {returnItem.refundAmount > 0
                          ? `${returnItem.refundAmount.toLocaleString()} ر.س`
                          : '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={returnItem.status}
                        size="small"
                        color={getStatusColor(returnItem.status)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="عرض التفاصيل">
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleViewReturn(returnItem)}
                          >
                            <IconEye size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="تحديث الحالة">
                          <IconButton
                            color="secondary"
                            size="small"
                            onClick={() => handleUpdateStatus(returnItem)}
                          >
                            <IconEdit size={18} />
                          </IconButton>
                        </Tooltip>
                        {returnItem.status === 'قيد المراجعة' && (
                          <>
                            <Tooltip title="قبول">
                              <IconButton
                                color="success"
                                size="small"
                                onClick={() => {
                                  setSnackbar({
                                    open: true,
                                    message: `تم قبول المرتجع ${returnItem.id}`,
                                    severity: 'success',
                                  });
                                }}
                              >
                                <IconCheck size={18} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="رفض">
                              <IconButton
                                color="error"
                                size="small"
                                onClick={() => {
                                  setSnackbar({
                                    open: true,
                                    message: `تم رفض المرتجع ${returnItem.id}`,
                                    severity: 'error',
                                  });
                                }}
                              >
                                <IconX size={18} />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>

        {/* View Return Drawer */}
        <Drawer
          anchor="left"
          open={openViewDrawer}
          onClose={() => setOpenViewDrawer(false)}
          PaperProps={{ sx: { width: { xs: '100%', sm: 500 } } }}
        >
          {selectedReturn && (
            <Box sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={600}>
                  تفاصيل المرتجع
                </Typography>
                <IconButton onClick={() => setOpenViewDrawer(false)}>
                  <IconX />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    رقم المرتجع
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="primary">
                    {selectedReturn.id}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    رقم الطلب
                  </Typography>
                  <Typography variant="body1">{selectedReturn.orderId}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    العميل
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {selectedReturn.customerName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    المنتج
                  </Typography>
                  <Typography variant="body1">{selectedReturn.productName}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    التاريخ
                  </Typography>
                  <Typography variant="body1">{selectedReturn.date}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    الكمية
                  </Typography>
                  <Chip label={selectedReturn.quantity} size="small" color="primary" />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    السبب
                  </Typography>
                  <Chip label={selectedReturn.reason} size="small" variant="outlined" />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    مبلغ الاسترداد
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="success.main">
                    {selectedReturn.refundAmount > 0
                      ? `${selectedReturn.refundAmount.toLocaleString()} ر.س`
                      : '-'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    الحالة
                  </Typography>
                  <Chip
                    label={selectedReturn.status}
                    size="small"
                    color={getStatusColor(selectedReturn.status)}
                  />
                </Box>
              </Stack>
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
          <DialogTitle>تحديث حالة المرتجع</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                المرتجع: {selectedReturn?.id}
              </Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>الحالة الجديدة</InputLabel>
                <Select
                  value={newStatus}
                  label="الحالة الجديدة"
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <MenuItem value="قيد المراجعة">قيد المراجعة</MenuItem>
                  <MenuItem value="مقبول">مقبول</MenuItem>
                  <MenuItem value="مكتمل">مكتمل</MenuItem>
                  <MenuItem value="مرفوض">مرفوض</MenuItem>
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

export default ReturnsList;
