import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Breadcrumbs,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Avatar,
  Stack,
  LinearProgress,
  Checkbox,
  TableSortLabel,
  Toolbar,
  Divider,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  Add as AddIcon,
  VisibilityOutlined as ViewIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Security as SecurityIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as AttachMoneyIcon,
  Policy as PolicyIcon,
  Gavel as GavelIcon,
  Shield as ShieldIcon,
} from '@mui/icons-material';

const OrdersFraudReview = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskLevelFilter, setRiskLevelFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('orderNo');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for fraud reviews
  const fraudReviewData = [
    {
      id: 1,
      orderNo: 'ORD-001',
      customer: 'أحمد محمد',
      customerEmail: 'ahmed@example.com',
      customerPhone: '+966501234567',
      totalAmount: 1250.5,
      riskLevel: 'high',
      status: 'under_review',
      fraudScore: 85,
      orderDate: '2024-01-15',
      reviewDate: '2024-01-15',
      reviewer: 'محمد العلي',
      reviewNotes: 'طلب مشبوه - عنوان غير صحيح',
      riskFactors: ['عنوان الشحن غير صحيح', 'رقم هاتف غير موجود', 'مبلغ كبير للعميل الجديد'],
      lastModified: '2024-01-15',
      reviewProgress: 60,
    },
    {
      id: 2,
      orderNo: 'ORD-002',
      customer: 'فاطمة علي',
      customerEmail: 'fatima@example.com',
      customerPhone: '+966502345678',
      totalAmount: 850.75,
      riskLevel: 'medium',
      status: 'approved',
      fraudScore: 45,
      orderDate: '2024-01-14',
      reviewDate: '2024-01-14',
      reviewer: 'سارة أحمد',
      reviewNotes: 'تم الموافقة بعد التحقق من البيانات',
      riskFactors: ['عنوان الشحن صحيح', 'رقم هاتف صحيح', 'عميل موثوق'],
      lastModified: '2024-01-14',
      reviewProgress: 100,
    },
    {
      id: 3,
      orderNo: 'ORD-003',
      customer: 'محمد عبدالله',
      customerEmail: 'mohammed@example.com',
      customerPhone: '+966503456789',
      totalAmount: 2100.0,
      riskLevel: 'low',
      status: 'rejected',
      fraudScore: 25,
      orderDate: '2024-01-13',
      reviewDate: '2024-01-13',
      reviewer: 'خالد السعد',
      reviewNotes: 'تم رفض الطلب - بيانات مزورة',
      riskFactors: ['عنوان الشحن مزور', 'رقم هاتف مزور', 'بيانات شخصية غير صحيحة'],
      lastModified: '2024-01-13',
      reviewProgress: 100,
    },
  ];

  // Stats data
  const fraudStats = [
    {
      title: 'إجمالي مراجعات الاحتيال',
      value: fraudReviewData.length.toString(),
      color: 'primary',
      icon: SecurityIcon,
      change: '+15%',
    },
    {
      title: 'قيد المراجعة',
      value: fraudReviewData.filter((f) => f.status === 'under_review').length.toString(),
      color: 'warning',
      icon: ScheduleIcon,
      change: '1 قيد المراجعة',
    },
    {
      title: 'طلبات عالية المخاطر',
      value: fraudReviewData.filter((f) => f.riskLevel === 'high').length.toString(),
      color: 'error',
      icon: WarningIcon,
      change: '1 عالي المخاطر',
    },
    {
      title: 'متوسط درجة الاحتيال',
      value: Math.round(
        fraudReviewData.reduce((sum, f) => sum + f.fraudScore, 0) / fraudReviewData.length,
      ).toString(),
      color: 'info',
      icon: TrendingUpIcon,
      change: '52%',
    },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم حفظ مراجعة الاحتيال بنجاح',
        severity: 'success',
      });
      setOpenDialog(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({ open: true, message: 'تم تحديث البيانات بنجاح', severity: 'success' });
    }, 1000);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(filteredData.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId],
    );
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setViewDrawer(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleDelete = (order) => {
    setSnackbar({
      open: true,
      message: `تم حذف مراجعة الاحتيال ${order.orderNo} بنجاح`,
      severity: 'success',
    });
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const filteredData = useMemo(() => {
    return fraudReviewData.filter((item) => {
      const matchesSearch =
        item.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesRiskLevel = riskLevelFilter === 'all' || item.riskLevel === riskLevelFilter;
      return matchesSearch && matchesStatus && matchesRiskLevel;
    });
  }, [fraudReviewData, searchTerm, statusFilter, riskLevelFilter]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [filteredData, sortBy, sortOrder]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'under_review':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'under_review':
        return 'قيد المراجعة';
      case 'approved':
        return 'موافق عليه';
      case 'rejected':
        return 'مرفوض';
      default:
        return status;
    }
  };

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'default';
    }
  };

  const getRiskLevelLabel = (riskLevel) => {
    switch (riskLevel) {
      case 'low':
        return 'منخفض';
      case 'medium':
        return 'متوسط';
      case 'high':
        return 'عالي';
      default:
        return riskLevel;
    }
  };

  const formatCurrency = (amount) => {
    return `ريال ${amount.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Enhanced Header with Stats */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              إدارة مراجعة الاحتيال
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة شاملة لمراجعة الطلبات المشبوهة وحماية المتجر من الاحتيال
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mt: 1 }}>
              <Link
                color="inherit"
                href="/main-store"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                لوحة التحكم
              </Link>
              <Link color="inherit" href="/main-store/orders">
                الطلبات
              </Link>
              <Typography color="text.primary">مراجعة الاحتيال</Typography>
            </Breadcrumbs>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? 'جاري التحديث...' : 'تحديث'}
            </Button>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
              إضافة مراجعة احتيال
            </Button>
          </Stack>
        </Box>

        {/* Enhanced Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {fraudStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
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
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      <Avatar sx={{ bgcolor: `${stat.color}.main`, width: 48, height: 48, mr: 2 }}>
                        <IconComponent />
                      </Avatar>
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 700, color: `${stat.color}.main`, mb: 1 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: 'text.secondary', mb: 1 }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: `${stat.color}.main`, fontWeight: 600 }}
                    >
                      {stat.change}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Filters & Search */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          البحث والتصفية
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="البحث في مراجعات الاحتيال..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>حالة المراجعة</InputLabel>
              <Select
                value={statusFilter}
                label="حالة المراجعة"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                <MenuItem value="under_review">قيد المراجعة</MenuItem>
                <MenuItem value="approved">موافق عليه</MenuItem>
                <MenuItem value="rejected">مرفوض</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>مستوى المخاطر</InputLabel>
              <Select
                value={riskLevelFilter}
                label="مستوى المخاطر"
                onChange={(e) => setRiskLevelFilter(e.target.value)}
              >
                <MenuItem value="all">جميع المستويات</MenuItem>
                <MenuItem value="low">منخفض</MenuItem>
                <MenuItem value="medium">متوسط</MenuItem>
                <MenuItem value="high">عالي</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setRiskLevelFilter('all');
              }}
              fullWidth
            >
              مسح الفلاتر
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              {filteredData.length} نتيجة
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Paper>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            قائمة مراجعات الاحتيال
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button
                size="small"
                onClick={() =>
                  setSnackbar({
                    open: true,
                    message: 'تم الموافقة على المراجعات المحددة',
                    severity: 'success',
                  })
                }
                sx={{ mr: 1 }}
              >
                موافقة ({selectedItems.length})
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() =>
                  setSnackbar({
                    open: true,
                    message: 'تم رفض المراجعات المحددة',
                    severity: 'success',
                  })
                }
              >
                رفض ({selectedItems.length})
              </Button>
            </Box>
          )}
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
            إضافة مراجعة احتيال
          </Button>
        </Toolbar>

        {loading ? (
          <Box sx={{ p: 2 }}>
            <LinearProgress />
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لا توجد مراجعات احتيال. أضف مراجعة الاحتيال الأولى.</Alert>
          </Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.length === sortedData.length && sortedData.length > 0}
                      indeterminate={
                        selectedItems.length > 0 && selectedItems.length < sortedData.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'orderNo'}
                      direction={sortBy === 'orderNo' ? sortOrder : 'asc'}
                      onClick={() => handleSort('orderNo')}
                    >
                      رقم الطلب
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'customer'}
                      direction={sortBy === 'customer' ? sortOrder : 'asc'}
                      onClick={() => handleSort('customer')}
                    >
                      العميل
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'totalAmount'}
                      direction={sortBy === 'totalAmount' ? sortOrder : 'asc'}
                      onClick={() => handleSort('totalAmount')}
                    >
                      المبلغ الإجمالي
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>مستوى المخاطر</TableCell>
                  <TableCell>حالة المراجعة</TableCell>
                  <TableCell>درجة الاحتيال</TableCell>
                  <TableCell>تقدم المراجعة</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'reviewDate'}
                      direction={sortBy === 'reviewDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('reviewDate')}
                    >
                      تاريخ المراجعة
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontFamily="monospace">
                          {item.orderNo}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                            <PersonIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {item.customer}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.customerEmail}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {formatCurrency(item.totalAmount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getRiskLevelLabel(item.riskLevel)}
                          size="small"
                          color={getRiskLevelColor(item.riskLevel)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(item.status)}
                          size="small"
                          color={getStatusColor(item.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {item.fraudScore}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={item.fraudScore}
                            sx={{ width: 60, height: 4 }}
                            color={
                              item.fraudScore > 70
                                ? 'error'
                                : item.fraudScore > 40
                                ? 'warning'
                                : 'success'
                            }
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 100 }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={item.reviewProgress}
                              sx={{ height: 6, borderRadius: 3 }}
                              color={
                                item.reviewProgress > 80
                                  ? 'success'
                                  : item.reviewProgress > 50
                                  ? 'warning'
                                  : 'error'
                              }
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {item.reviewProgress}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(item.reviewDate)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleView(item)}
                              aria-label="عرض تفاصيل مراجعة الاحتيال"
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل مراجعة الاحتيال" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(item)}
                              aria-label="تعديل مراجعة الاحتيال"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف مراجعة الاحتيال" arrow>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(item)}
                              aria-label="حذف مراجعة الاحتيال"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={sortedData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedOrder ? 'تعديل مراجعة الاحتيال' : 'إضافة مراجعة احتيال جديدة'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الطلب"
                placeholder="أدخل رقم الطلب"
                defaultValue={selectedOrder?.orderNo || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم العميل"
                placeholder="أدخل اسم العميل"
                defaultValue={selectedOrder?.customer || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="أدخل البريد الإلكتروني"
                defaultValue={selectedOrder?.customerEmail || ''}
                type="email"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                placeholder="أدخل رقم الهاتف"
                defaultValue={selectedOrder?.customerPhone || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="المبلغ الإجمالي"
                placeholder="0.00"
                defaultValue={selectedOrder?.totalAmount || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>مستوى المخاطر</InputLabel>
                <Select label="مستوى المخاطر" defaultValue={selectedOrder?.riskLevel || 'medium'}>
                  <MenuItem value="low">منخفض</MenuItem>
                  <MenuItem value="medium">متوسط</MenuItem>
                  <MenuItem value="high">عالي</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>حالة المراجعة</InputLabel>
                <Select
                  label="حالة المراجعة"
                  defaultValue={selectedOrder?.status || 'under_review'}
                >
                  <MenuItem value="under_review">قيد المراجعة</MenuItem>
                  <MenuItem value="approved">موافق عليه</MenuItem>
                  <MenuItem value="rejected">مرفوض</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="درجة الاحتيال"
                placeholder="0-100"
                defaultValue={selectedOrder?.fraudScore || ''}
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المراجع"
                placeholder="أدخل اسم المراجع"
                defaultValue={selectedOrder?.reviewer || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ المراجعة"
                defaultValue={selectedOrder?.reviewDate || new Date().toISOString().split('T')[0]}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الطلب"
                defaultValue={selectedOrder?.orderDate || new Date().toISOString().split('T')[0]}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="ملاحظات المراجعة"
                placeholder="أدخل ملاحظات المراجعة..."
                defaultValue={selectedOrder?.reviewNotes || ''}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            startIcon={<SaveIcon />}
          >
            {loading ? 'جاري الحفظ...' : 'حفظ'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDrawer} onClose={() => setViewDrawer(false)} maxWidth="md" fullWidth>
        <DialogTitle>تفاصيل مراجعة الاحتيال</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mr: 2 }}>
                  <SecurityIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedOrder.orderNo}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    العميل: {selectedOrder.customer}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    المبلغ الإجمالي
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatCurrency(selectedOrder.totalAmount)}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    مستوى المخاطر
                  </Typography>
                  <Chip
                    label={getRiskLevelLabel(selectedOrder.riskLevel)}
                    size="small"
                    color={getRiskLevelColor(selectedOrder.riskLevel)}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    حالة المراجعة
                  </Typography>
                  <Chip
                    label={getStatusLabel(selectedOrder.status)}
                    size="small"
                    color={getStatusColor(selectedOrder.status)}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    درجة الاحتيال
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedOrder.fraudScore}/100
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    المراجع
                  </Typography>
                  <Typography variant="body1">{selectedOrder.reviewer}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تاريخ المراجعة
                  </Typography>
                  <Typography variant="body1">{formatDate(selectedOrder.reviewDate)}</Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    ملاحظات المراجعة
                  </Typography>
                  <Typography variant="body1">{selectedOrder.reviewNotes}</Typography>
                </Grid>
                {selectedOrder.riskFactors && selectedOrder.riskFactors.length > 0 && (
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      عوامل المخاطر
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {selectedOrder.riskFactors.map((factor, index) => (
                        <Chip
                          key={index}
                          label={factor}
                          size="small"
                          color="warning"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDrawer(false)}>إغلاق</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrdersFraudReview;
