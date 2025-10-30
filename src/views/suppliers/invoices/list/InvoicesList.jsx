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
} from '@mui/material';
import {
  IconSearch,
  IconEye,
  IconDownload,
  IconFileInvoice,
  IconCheck,
  IconClock,
  IconCurrencyDollar,
  IconX,
  IconEdit,
} from '@tabler/icons-react';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { downloadInvoicePdf } from '../common/shared';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'الرئيسية',
  },
  {
    title: 'قائمة الفواتير',
  },
];

const InvoicesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setOpenViewDrawer(true);
  };

  const handleUpdateStatus = (invoice) => {
    setSelectedInvoice(invoice);
    setNewStatus(invoice.status);
    setOpenStatusDialog(true);
  };

  const handleSaveStatus = () => {
    setSnackbar({
      open: true,
      message: 'تم تحديث حالة الفاتورة بنجاح',
      severity: 'success',
    });
    setOpenStatusDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Mock data
  const invoices = [
    {
      id: 'INV-2024-001',
      orderId: 'ORD-2023-156',
      date: '2024-01-10',
      dueDate: '2024-02-10',
      customerName: 'شركة التقنية المتقدمة',
      amount: 112500,
      paid: 112500,
      status: 'مدفوعة',
      paymentMethod: 'تحويل بنكي',
    },
    {
      id: 'INV-2024-002',
      orderId: 'ORD-2023-155',
      date: '2024-01-08',
      dueDate: '2024-02-08',
      customerName: 'متجر الإلكترونيات',
      amount: 79200,
      paid: 0,
      status: 'معلقة',
      paymentMethod: '-',
    },
    {
      id: 'INV-2024-003',
      orderId: 'ORD-2023-152',
      date: '2024-01-01',
      dueDate: '2024-02-01',
      customerName: 'شركة الأمل',
      amount: 36000,
      paid: 36000,
      status: 'مدفوعة',
      paymentMethod: 'بطاقة ائتمان',
    },
    {
      id: 'INV-2023-158',
      orderId: 'ORD-2023-142',
      date: '2023-12-28',
      dueDate: '2024-01-28',
      customerName: 'مؤسسة النجاح',
      amount: 135000,
      paid: 67500,
      status: 'مدفوعة جزئياً',
      paymentMethod: 'تحويل بنكي',
    },
    {
      id: 'INV-2023-157',
      orderId: 'ORD-2023-140',
      date: '2023-12-25',
      dueDate: '2024-01-15',
      customerName: 'شركة الابتكار',
      amount: 98500,
      paid: 0,
      status: 'متأخرة',
      paymentMethod: '-',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'مدفوعة':
        return 'success';
      case 'معلقة':
        return 'warning';
      case 'متأخرة':
        return 'error';
      case 'مدفوعة جزئياً':
        return 'info';
      default:
        return 'default';
    }
  };

  const filteredInvoices = invoices.filter(
    (invoice) =>
      (statusFilter === 'الكل' || invoice.status === statusFilter) &&
      (invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  // Calculate invoice statistics
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter((i) => i.status === 'مدفوعة').length;
  const pendingInvoices = invoices.filter((i) => i.status === 'معلقة').length;
  const totalAmount = invoices.reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = invoices.reduce((sum, i) => sum + i.paid, 0);

  const invoiceStats = [
    {
      title: 'إجمالي الفواتير',
      value: totalInvoices,
      icon: IconFileInvoice,
      color: 'primary',
    },
    {
      title: 'فواتير مدفوعة',
      value: paidInvoices,
      icon: IconCheck,
      color: 'success',
    },
    {
      title: 'فواتير معلقة',
      value: pendingInvoices,
      icon: IconClock,
      color: 'warning',
    },
    {
      title: 'المبلغ المدفوع',
      value: `${(totalPaid / 1000).toFixed(0)}K ر.س`,
      icon: IconCurrencyDollar,
      color: 'info',
    },
  ];

  return (
    <PageContainer title="قائمة الفواتير" description="عرض جميع الفواتير">
      <Breadcrumb title="قائمة الفواتير" items={BCrumb} />

      <Box>
        {/* Invoice Statistics */}
        <Grid container spacing={3} mb={3}>
          {invoiceStats.map((stat, index) => (
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

        {/* Invoices Table */}
        <DashboardCard
          title="قائمة الفواتير"
          subtitle="عرض جميع الفواتير"
          sx={(theme) => ({
            borderRadius: 12,
            background: `linear-gradient(135deg, ${theme.palette.info.main}0F 0%, ${theme.palette.info.main}08 100%)`,
            border: `1px solid ${theme.palette.info.main}22`,
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
                  <MenuItem value="مدفوعة">مدفوعة</MenuItem>
                  <MenuItem value="معلقة">معلقة</MenuItem>
                  <MenuItem value="متأخرة">متأخرة</MenuItem>
                  <MenuItem value="مدفوعة جزئياً">مدفوعة جزئياً</MenuItem>
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
                  <TableCell>رقم الفاتورة</TableCell>
                  <TableCell>رقم الطلب</TableCell>
                  <TableCell>التاريخ</TableCell>
                  <TableCell>تاريخ الاستحقاق</TableCell>
                  <TableCell>العميل</TableCell>
                  <TableCell align="center">المبلغ (ر.س)</TableCell>
                  <TableCell align="center">المدفوع (ر.س)</TableCell>
                  <TableCell align="center">الحالة</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={700} color="primary">
                        {invoice.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {invoice.orderId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{invoice.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{invoice.dueDate}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {invoice.customerName}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600}>
                        {invoice.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600} color="success.main">
                        {invoice.paid.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={invoice.status}
                        size="small"
                        color={getStatusColor(invoice.status)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="عرض التفاصيل">
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleViewInvoice(invoice)}
                          >
                            <IconEye size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="تحديث الحالة">
                          <IconButton
                            color="secondary"
                            size="small"
                            onClick={() => handleUpdateStatus(invoice)}
                          >
                            <IconEdit size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="تحميل الفاتورة">
                          <IconButton
                            color="info"
                            size="small"
                            onClick={() => downloadInvoicePdf(invoice.id)}
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

        {/* View Invoice Drawer */}
        <Drawer
          anchor="left"
          open={openViewDrawer}
          onClose={() => setOpenViewDrawer(false)}
          PaperProps={{ sx: { width: { xs: '100%', sm: 500 } } }}
        >
          {selectedInvoice && (
            <Box sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={600}>
                  تفاصيل الفاتورة
                </Typography>
                <IconButton onClick={() => setOpenViewDrawer(false)}>
                  <IconX />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    رقم الفاتورة
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="primary">
                    {selectedInvoice.id}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    رقم الطلب
                  </Typography>
                  <Typography variant="body1">{selectedInvoice.orderId}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    العميل
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {selectedInvoice.customerName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    تاريخ الفاتورة
                  </Typography>
                  <Typography variant="body1">{selectedInvoice.date}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    تاريخ الاستحقاق
                  </Typography>
                  <Typography variant="body1">{selectedInvoice.dueDate}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    المبلغ الإجمالي
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {selectedInvoice.amount.toLocaleString()} ر.س
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    المبلغ المدفوع
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="success.main">
                    {selectedInvoice.paid.toLocaleString()} ر.س
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    طريقة الدفع
                  </Typography>
                  <Typography variant="body1">{selectedInvoice.paymentMethod}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    الحالة
                  </Typography>
                  <Chip
                    label={selectedInvoice.status}
                    size="small"
                    color={getStatusColor(selectedInvoice.status)}
                  />
                </Box>
              </Stack>

              <Box mt={4}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<IconDownload />}
                  onClick={() => downloadInvoicePdf(selectedInvoice.id)}
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
          <DialogTitle>تحديث حالة الفاتورة</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                الفاتورة: {selectedInvoice?.id}
              </Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>الحالة الجديدة</InputLabel>
                <Select
                  value={newStatus}
                  label="الحالة الجديدة"
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <MenuItem value="معلقة">معلقة</MenuItem>
                  <MenuItem value="مدفوعة">مدفوعة</MenuItem>
                  <MenuItem value="مدفوعة جزئياً">مدفوعة جزئياً</MenuItem>
                  <MenuItem value="متأخرة">متأخرة</MenuItem>
                  <MenuItem value="ملغاة">ملغاة</MenuItem>
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

export default InvoicesList;
