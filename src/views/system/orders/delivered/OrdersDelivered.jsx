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
  Rating,
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
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as AttachMoneyIcon,
  LocalShipping as LocalShippingIcon,
  ThumbUp as ThumbUpIcon,
  Feedback as FeedbackIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const OrdersDelivered = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('orderNo');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for delivered orders
  const deliveredOrdersData = [
    {
      id: 1,
      orderNo: 'ORD-001',
      customer: 'أحمد محمد',
      customerEmail: 'ahmed@example.com',
      customerPhone: '+966501234567',
      totalAmount: 1250.5,
      status: 'delivered',
      orderDate: '2024-01-15',
      deliveredDate: '2024-01-20',
      deliveryTime: '14:30',
      deliveryMethod: 'توصيل منزلي',
      carrier: 'DHL Express',
      trackingNumber: 'DHL123456789',
      items: [
        { name: 'لابتوب ديل', quantity: 1, price: 1200.0 },
        { name: 'ماوس لاسلكي', quantity: 1, price: 50.5 },
      ],
      shippingAddress: 'الرياض، المملكة العربية السعودية',
      deliveryAddress: 'الرياض، المملكة العربية السعودية',
      deliveryPerson: 'محمد العلي',
      customerRating: 5,
      deliveryRating: 4,
      feedback: 'تسليم ممتاز، المنتج في حالة جيدة جداً',
      notes: 'تم التسليم بنجاح',
      lastModified: '2024-01-20',
      deliveryDuration: '5 أيام',
    },
    {
      id: 2,
      orderNo: 'ORD-002',
      customer: 'فاطمة علي',
      customerEmail: 'fatima@example.com',
      customerPhone: '+966502345678',
      totalAmount: 850.75,
      status: 'delivered',
      orderDate: '2024-01-14',
      deliveredDate: '2024-01-19',
      deliveryTime: '10:15',
      deliveryMethod: 'توصيل مكتبي',
      carrier: 'Aramex',
      trackingNumber: 'ARX987654321',
      items: [
        { name: 'هاتف ذكي', quantity: 1, price: 800.0 },
        { name: 'حافظة هاتف', quantity: 1, price: 50.75 },
      ],
      shippingAddress: 'جدة، المملكة العربية السعودية',
      deliveryAddress: 'جدة، المملكة العربية السعودية',
      deliveryPerson: 'سارة أحمد',
      customerRating: 4,
      deliveryRating: 5,
      feedback: 'تسليم سريع وممتاز',
      notes: '',
      lastModified: '2024-01-19',
      deliveryDuration: '5 أيام',
    },
    {
      id: 3,
      orderNo: 'ORD-003',
      customer: 'محمد عبدالله',
      customerEmail: 'mohammed@example.com',
      customerPhone: '+966503456789',
      totalAmount: 2100.0,
      status: 'delivered',
      orderDate: '2024-01-13',
      deliveredDate: '2024-01-18',
      deliveryTime: '16:45',
      deliveryMethod: 'توصيل منزلي',
      carrier: 'SMSA Express',
      trackingNumber: 'SMS456789123',
      items: [
        { name: 'تلفزيون ذكي', quantity: 1, price: 2000.0 },
        { name: 'كابل HDMI', quantity: 2, price: 50.0 },
      ],
      shippingAddress: 'الدمام، المملكة العربية السعودية',
      deliveryAddress: 'الدمام، المملكة العربية السعودية',
      deliveryPerson: 'خالد السعد',
      customerRating: 5,
      deliveryRating: 5,
      feedback: 'تسليم ممتاز، المنتج يعمل بشكل رائع',
      notes: 'تم التسليم في المساء كما طلب العميل',
      lastModified: '2024-01-18',
      deliveryDuration: '5 أيام',
    },
  ];

  // Stats data
  const deliveredStats = [
    {
      title: 'إجمالي الطلبات المسلمة',
      value: deliveredOrdersData.length.toString(),
      color: 'primary',
      icon: CheckCircleIcon,
      change: '+22%',
    },
    {
      title: 'متوسط التقييم',
      value: (
        deliveredOrdersData.reduce((sum, o) => sum + o.customerRating, 0) /
        deliveredOrdersData.length
      ).toFixed(1),
      color: 'success',
      icon: StarIcon,
      change: '4.7/5',
    },
    {
      title: 'طلبات التوصيل المنزلي',
      value: deliveredOrdersData
        .filter((o) => o.deliveryMethod === 'توصيل منزلي')
        .length.toString(),
      color: 'info',
      icon: LocalShippingIcon,
      change: '67%',
    },
    {
      title: 'متوسط مدة التسليم',
      value: deliveredOrdersData[0]?.deliveryDuration || '5 أيام',
      color: 'warning',
      icon: ScheduleIcon,
      change: 'ممتاز',
    },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم حفظ طلب التسليم بنجاح',
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
      message: `تم حذف طلب التسليم ${order.orderNo} بنجاح`,
      severity: 'success',
    });
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const filteredData = useMemo(() => {
    return deliveredOrdersData.filter((item) => {
      const matchesSearch =
        item.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesRating =
        ratingFilter === 'all' ||
        (ratingFilter === 'high' && item.customerRating >= 4) ||
        (ratingFilter === 'medium' && item.customerRating >= 3 && item.customerRating < 4) ||
        (ratingFilter === 'low' && item.customerRating < 3);
      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [deliveredOrdersData, searchTerm, statusFilter, ratingFilter]);

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
      case 'delivered':
        return 'success';
      case 'returned':
        return 'error';
      case 'refunded':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'delivered':
        return 'تم التسليم';
      case 'returned':
        return 'مرتجع';
      case 'refunded':
        return 'مسترد';
      default:
        return status;
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'success';
    if (rating >= 3) return 'warning';
    return 'error';
  };

  const formatCurrency = (amount) => {
    return `ريال ${amount.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('ar-SA');
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
              إدارة الطلبات المسلمة
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة شاملة للطلبات المسلمة مع تقييمات العملاء وملاحظات التسليم
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
              <Typography color="text.primary">الطلبات المسلمة</Typography>
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
              إضافة طلب تسليم
            </Button>
          </Stack>
        </Box>

        {/* Enhanced Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {deliveredStats.map((stat, index) => {
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
              placeholder="البحث في الطلبات المسلمة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>حالة التسليم</InputLabel>
              <Select
                value={statusFilter}
                label="حالة التسليم"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                <MenuItem value="delivered">تم التسليم</MenuItem>
                <MenuItem value="returned">مرتجع</MenuItem>
                <MenuItem value="refunded">مسترد</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>التقييم</InputLabel>
              <Select
                value={ratingFilter}
                label="التقييم"
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <MenuItem value="all">جميع التقييمات</MenuItem>
                <MenuItem value="high">عالي (4-5)</MenuItem>
                <MenuItem value="medium">متوسط (3-4)</MenuItem>
                <MenuItem value="low">منخفض (أقل من 3)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setRatingFilter('all');
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
            قائمة الطلبات المسلمة
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button
                size="small"
                onClick={() =>
                  setSnackbar({
                    open: true,
                    message: 'تم تحديث الطلبات المحددة',
                    severity: 'success',
                  })
                }
                sx={{ mr: 1 }}
              >
                تحديث ({selectedItems.length})
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() =>
                  setSnackbar({
                    open: true,
                    message: 'تم حذف الطلبات المحددة',
                    severity: 'success',
                  })
                }
              >
                حذف ({selectedItems.length})
              </Button>
            </Box>
          )}
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
            إضافة طلب تسليم
          </Button>
        </Toolbar>

        {loading ? (
          <Box sx={{ p: 2 }}>
            <LinearProgress />
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لا توجد طلبات مسلمة. أضف طلب التسليم الأول.</Alert>
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
                  <TableCell>حالة التسليم</TableCell>
                  <TableCell>تاريخ التسليم</TableCell>
                  <TableCell>تقييم العميل</TableCell>
                  <TableCell>طريقة التسليم</TableCell>
                  <TableCell>الشخص المسؤول</TableCell>
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
                          label={getStatusLabel(item.status)}
                          size="small"
                          color={getStatusColor(item.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(item.deliveredDate)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.deliveryTime}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating
                            value={item.customerRating}
                            readOnly
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {item.customerRating}/5
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {item.deliveryMethod}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {item.deliveryPerson}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleView(item)}
                              aria-label="عرض تفاصيل طلب التسليم"
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل طلب التسليم" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(item)}
                              aria-label="تعديل طلب التسليم"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف طلب التسليم" arrow>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(item)}
                              aria-label="حذف طلب التسليم"
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
        <DialogTitle>{selectedOrder ? 'تعديل طلب التسليم' : 'إضافة طلب تسليم جديد'}</DialogTitle>
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
                <InputLabel>حالة التسليم</InputLabel>
                <Select label="حالة التسليم" defaultValue={selectedOrder?.status || 'delivered'}>
                  <MenuItem value="delivered">تم التسليم</MenuItem>
                  <MenuItem value="returned">مرتجع</MenuItem>
                  <MenuItem value="refunded">مسترد</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ التسليم"
                defaultValue={
                  selectedOrder?.deliveredDate || new Date().toISOString().split('T')[0]
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="time"
                label="وقت التسليم"
                defaultValue={selectedOrder?.deliveryTime || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>طريقة التسليم</InputLabel>
                <Select
                  label="طريقة التسليم"
                  defaultValue={selectedOrder?.deliveryMethod || 'توصيل منزلي'}
                >
                  <MenuItem value="توصيل منزلي">توصيل منزلي</MenuItem>
                  <MenuItem value="توصيل مكتبي">توصيل مكتبي</MenuItem>
                  <MenuItem value="استلام من المتجر">استلام من المتجر</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الشخص المسؤول"
                placeholder="أدخل اسم الشخص المسؤول"
                defaultValue={selectedOrder?.deliveryPerson || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="عنوان التسليم"
                placeholder="أدخل عنوان التسليم"
                defaultValue={selectedOrder?.deliveryAddress || ''}
                multiline
                rows={2}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="ملاحظات"
                placeholder="أدخل ملاحظات إضافية..."
                defaultValue={selectedOrder?.notes || ''}
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
        <DialogTitle>تفاصيل طلب التسليم</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mr: 2 }}>
                  <CheckCircleIcon />
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
                    حالة التسليم
                  </Typography>
                  <Chip
                    label={getStatusLabel(selectedOrder.status)}
                    size="small"
                    color={getStatusColor(selectedOrder.status)}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تاريخ التسليم
                  </Typography>
                  <Typography variant="body1">{formatDate(selectedOrder.deliveredDate)}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    وقت التسليم
                  </Typography>
                  <Typography variant="body1">{selectedOrder.deliveryTime}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    طريقة التسليم
                  </Typography>
                  <Typography variant="body1">{selectedOrder.deliveryMethod}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    الشخص المسؤول
                  </Typography>
                  <Typography variant="body1">{selectedOrder.deliveryPerson}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تقييم العميل
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating
                      value={selectedOrder.customerRating}
                      readOnly
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {selectedOrder.customerRating}/5
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تقييم التسليم
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating
                      value={selectedOrder.deliveryRating}
                      readOnly
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {selectedOrder.deliveryRating}/5
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    عنوان التسليم
                  </Typography>
                  <Typography variant="body1">{selectedOrder.deliveryAddress}</Typography>
                </Grid>
                {selectedOrder.feedback && (
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      تعليقات العميل
                    </Typography>
                    <Typography variant="body1">{selectedOrder.feedback}</Typography>
                  </Grid>
                )}
                {selectedOrder.notes && (
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      ملاحظات
                    </Typography>
                    <Typography variant="body1">{selectedOrder.notes}</Typography>
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

export default OrdersDelivered;
