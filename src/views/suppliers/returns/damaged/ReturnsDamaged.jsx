import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  alpha,
  useTheme,
  Drawer,
  Divider,
  Stack,
  Tooltip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import {
  IconAlertCircle,
  IconPackageOff,
  IconTruckDelivery,
  IconReplace,
  IconEye,
  IconCheck,
  IconCurrencyDollar,
  IconClock,
  IconX,
  IconEdit,
} from '@tabler/icons-react';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../components/shared/DashboardCard';

const BCrumb = [
  {
    to: '/suppliers',
    title: 'الرئيسية',
  },
  {
    title: 'المنتجات التالفة',
  },
];

const ReturnsDamaged = () => {
  const theme = useTheme();
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [damageReport, setDamageReport] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setOpenViewDrawer(true);
  };

  const handleReportDamage = (product) => {
    setSelectedProduct(product);
    setDamageReport('');
    setOpenReportDialog(true);
  };

  const handleSaveReport = () => {
    setSnackbar({
      open: true,
      message: `تم تحديث تقرير التلف للمنتج ${selectedProduct?.id}`,
      severity: 'success',
    });
    setOpenReportDialog(false);
    setDamageReport('');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Mock data
  const damagedProducts = [
    {
      id: 'DMG-2024-001',
      orderId: 'ORD-2023-145',
      date: '2024-01-12',
      customerName: 'شركة التقنية المتقدمة',
      productName: 'لابتوب ديل إكس بي إس 13',
      sku: 'DL-XPS13-001',
      quantity: 1,
      damageType: 'تلف أثناء الشحن',
      estimatedLoss: 4500,
      status: 'قيد المراجعة',
      action: 'استبدال',
    },
    {
      id: 'DMG-2024-002',
      orderId: 'ORD-2023-138',
      date: '2024-01-10',
      customerName: 'متجر الإلكترونيات',
      productName: 'سماعات سوني WH-1000XM5',
      sku: 'SN-WH1000XM5-001',
      quantity: 2,
      damageType: 'عيب تصنيع',
      estimatedLoss: 2400,
      status: 'تم الاستبدال',
      action: 'استبدال',
    },
    {
      id: 'DMG-2023-156',
      orderId: 'ORD-2023-125',
      date: '2023-12-28',
      customerName: 'مؤسسة النجاح',
      productName: 'كاميرا كانون EOS R5',
      sku: 'CN-EOSR5-001',
      quantity: 1,
      damageType: 'تلف أثناء الشحن',
      estimatedLoss: 12000,
      status: 'تم الاسترداد',
      action: 'استرداد',
    },
    {
      id: 'DMG-2023-155',
      orderId: 'ORD-2023-120',
      date: '2023-12-25',
      customerName: 'شركة الابتكار الرقمي',
      productName: 'هاتف آيفون 15 برو',
      sku: 'AP-IP15P-001',
      quantity: 1,
      damageType: 'لا يعمل بشكل صحيح',
      estimatedLoss: 5500,
      status: 'قيد المراجعة',
      action: 'استبدال',
    },
  ];

  // Calculate damaged products statistics
  const totalDamaged = damagedProducts.length;
  const shippingDamage = damagedProducts.filter((p) => p.damageType === 'تلف أثناء الشحن').length;
  const replaced = damagedProducts.filter((p) => p.status === 'تم الاستبدال').length;
  const underReview = damagedProducts.filter((p) => p.status === 'قيد المراجعة').length;
  const totalLoss = damagedProducts.reduce((sum, p) => sum + p.estimatedLoss, 0);

  const stats = [
    {
      icon: IconPackageOff,
      title: 'منتجات تالفة',
      value: totalDamaged.toString(),
      color: 'error',
    },
    {
      icon: IconClock,
      title: 'قيد المراجعة',
      value: underReview.toString(),
      color: 'warning',
    },
    {
      icon: IconReplace,
      title: 'تم الاستبدال',
      value: replaced.toString(),
      color: 'success',
    },
    {
      icon: IconCurrencyDollar,
      title: 'الخسائر المقدرة',
      value: `${(totalLoss / 1000).toFixed(0)}K ر.س`,
      color: 'info',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'تم الاستبدال':
      case 'تم الاسترداد':
        return 'success';
      case 'قيد المراجعة':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <PageContainer title="المنتجات التالفة" description="عرض المنتجات التالفة">
      <Breadcrumb title="المنتجات التالفة" items={BCrumb} />

      <Box>
        {/* Statistics Cards */}
        <Grid container spacing={3} mb={3}>
          {stats.map((stat, index) => (
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

        {/* Damaged Products Table */}
        <DashboardCard
          title="المنتجات التالفة"
          subtitle="عرض جميع المنتجات التالفة والإجراءات المتخذة"
          sx={(theme) => ({
            borderRadius: 12,
            background: `linear-gradient(135deg, ${theme.palette.error.main}0F 0%, ${theme.palette.error.main}08 100%)`,
            border: `1px solid ${theme.palette.error.main}22`,
          })}
        >
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>رقم البلاغ</TableCell>
                  <TableCell>رقم الطلب</TableCell>
                  <TableCell>التاريخ</TableCell>
                  <TableCell>العميل</TableCell>
                  <TableCell>المنتج</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell align="center">الكمية</TableCell>
                  <TableCell>نوع التلف</TableCell>
                  <TableCell align="center">الخسارة المقدرة</TableCell>
                  <TableCell align="center">الإجراء</TableCell>
                  <TableCell align="center">الحالة</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {damagedProducts.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={700} color="error">
                        {product.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {product.orderId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{product.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {product.customerName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{product.productName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {product.sku}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={product.quantity} size="small" color="primary" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<IconAlertCircle size={16} />}
                        label={product.damageType}
                        size="small"
                        color="error"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" fontWeight={600} color="error.main">
                        {product.estimatedLoss.toLocaleString()} ر.س
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={product.action} size="small" color="info" />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={product.status}
                        size="small"
                        color={getStatusColor(product.status)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="عرض التفاصيل">
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleViewProduct(product)}
                          >
                            <IconEye size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="تقرير التلف">
                          <IconButton
                            color="warning"
                            size="small"
                            onClick={() => handleReportDamage(product)}
                          >
                            <IconEdit size={18} />
                          </IconButton>
                        </Tooltip>
                        {product.status === 'قيد المراجعة' && (
                          <Tooltip title="تأكيد التلف">
                            <IconButton
                              color="success"
                              size="small"
                              onClick={() => {
                                setSnackbar({
                                  open: true,
                                  message: `تم قبول التلف ${product.id}`,
                                  severity: 'success',
                                });
                              }}
                            >
                              <IconCheck size={18} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>

        {/* View Product Drawer */}
        <Drawer
          anchor="left"
          open={openViewDrawer}
          onClose={() => setOpenViewDrawer(false)}
          PaperProps={{ sx: { width: { xs: '100%', sm: 500 } } }}
        >
          {selectedProduct && (
            <Box sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={600}>
                  تفاصيل المنتج التالف
                </Typography>
                <IconButton onClick={() => setOpenViewDrawer(false)}>
                  <IconX />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    رقم التلف
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="error">
                    {selectedProduct.id}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    رقم الطلب
                  </Typography>
                  <Typography variant="body1">{selectedProduct.orderId}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    اسم المنتج
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {selectedProduct.productName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    تاريخ الاكتشاف
                  </Typography>
                  <Typography variant="body1">{selectedProduct.date}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    الكمية التالفة
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="error.main">
                    {selectedProduct.quantity} وحدة
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    قيمة الخسارة
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="error.main">
                    {selectedProduct.estimatedLoss.toLocaleString()} ر.س
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    نوع التلف
                  </Typography>
                  <Chip label={selectedProduct.damageType} size="small" color="error" />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    السبب
                  </Typography>
                  <Typography variant="body1">{selectedProduct.reason}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    الحالة
                  </Typography>
                  <Chip
                    label={selectedProduct.status}
                    size="small"
                    color={getStatusColor(selectedProduct.status)}
                  />
                </Box>
              </Stack>

              <Box mt={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<IconEdit />}
                  onClick={() => {
                    setOpenViewDrawer(false);
                    handleReportDamage(selectedProduct);
                  }}
                >
                  تحديث تقرير التلف
                </Button>
              </Box>
            </Box>
          )}
        </Drawer>

        {/* Report Damage Dialog */}
        <Dialog
          open={openReportDialog}
          onClose={() => setOpenReportDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>تقرير التلف</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                المنتج: {selectedProduct?.id}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="تفاصيل التلف"
                value={damageReport}
                onChange={(e) => setDamageReport(e.target.value)}
                sx={{ mt: 2 }}
                placeholder="اكتب تفاصيل التلف والإجراءات المتخذة..."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenReportDialog(false)}>إلغاء</Button>
            <Button variant="contained" onClick={handleSaveReport} disabled={!damageReport}>
              حفظ التقرير
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

export default ReturnsDamaged;
