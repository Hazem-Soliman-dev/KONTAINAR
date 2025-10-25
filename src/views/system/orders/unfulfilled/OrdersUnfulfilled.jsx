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
  ShoppingCart as ShoppingCartIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  LocalShipping as LocalShippingIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Inventory as InventoryIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

const OrdersUnfulfilled = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('orderNo');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for unfulfilled orders
  const unfulfilledOrdersData = [
    {
      id: 1,
      orderNo: 'ORD-001',
      customer: 'أحمد محمد',
      customerEmail: 'ahmed@example.com',
      customerPhone: '+966501234567',
      totalAmount: 1250.5,
      status: 'pending',
      priority: 'high',
      orderDate: '2024-01-15',
      expectedFulfillment: '2024-01-18',
      items: [
        { name: 'لابتوب ديل', quantity: 1, price: 1200.0, stock: 5 },
        { name: 'ماوس لاسلكي', quantity: 1, price: 50.5, stock: 10 },
      ],
      shippingAddress: 'الرياض، المملكة العربية السعودية',
      notes: 'طلب عاجل - يرجى المعالجة السريعة',
      lastModified: '2024-01-15',
      fulfillmentProgress: 25,
    },
    {
      id: 2,
      orderNo: 'ORD-002',
      customer: 'فاطمة علي',
      customerEmail: 'fatima@example.com',
      customerPhone: '+966502345678',
      totalAmount: 850.75,
      status: 'processing',
      priority: 'medium',
      orderDate: '2024-01-14',
      expectedFulfillment: '2024-01-17',
      items: [
        { name: 'هاتف ذكي', quantity: 1, price: 800.0, stock: 3 },
        { name: 'حافظة هاتف', quantity: 1, price: 50.75, stock: 15 },
      ],
      shippingAddress: 'جدة، المملكة العربية السعودية',
      notes: '',
      lastModified: '2024-01-14',
      fulfillmentProgress: 60,
    },
    {
      id: 3,
      orderNo: 'ORD-003',
      customer: 'محمد عبدالله',
      customerEmail: 'mohammed@example.com',
      customerPhone: '+966503456789',
      totalAmount: 2100.0,
      status: 'ready_to_ship',
      priority: 'low',
      orderDate: '2024-01-13',
      expectedFulfillment: '2024-01-16',
      items: [
        { name: 'تلفزيون ذكي', quantity: 1, price: 2000.0, stock: 2 },
        { name: 'كابل HDMI', quantity: 2, price: 50.0, stock: 20 },
      ],
      shippingAddress: 'الدمام، المملكة العربية السعودية',
      notes: 'توصيل في المساء',
      lastModified: '2024-01-13',
      fulfillmentProgress: 90,
    },
  ];

  // Stats data
  const unfulfilledStats = [
    {
      title: 'إجمالي الطلبات غير المكتملة',
      value: unfulfilledOrdersData.length.toString(),
      color: 'primary',
      icon: ShoppingCartIcon,
      change: '+8%',
    },
    {
      title: 'طلبات معلقة',
      value: unfulfilledOrdersData.filter((o) => o.status === 'pending').length.toString(),
      color: 'warning',
      icon: ScheduleIcon,
      change: '2 معلقة',
    },
    {
      title: 'طلبات عالية الأولوية',
      value: unfulfilledOrdersData.filter((o) => o.priority === 'high').length.toString(),
      color: 'error',
      icon: WarningIcon,
      change: '1 عاجل',
    },
    {
      title: 'متوسط التقدم',
      value:
        Math.round(
          unfulfilledOrdersData.reduce((sum, o) => sum + o.fulfillmentProgress, 0) /
            unfulfilledOrdersData.length,
        ).toString() + '%',
      color: 'info',
      icon: TrendingUpIcon,
      change: '+5%',
    },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم حفظ الطلب بنجاح',
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
      message: `تم حذف الطلب ${order.orderNo} بنجاح`,
      severity: 'success',
    });
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const filteredData = useMemo(() => {
    return unfulfilledOrdersData.filter((item) => {
      const matchesSearch =
        item.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [unfulfilledOrdersData, searchTerm, statusFilter, priorityFilter]);

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
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'ready_to_ship':
        return 'primary';
      case 'on_hold':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'معلق';
      case 'processing':
        return 'قيد المعالجة';
      case 'ready_to_ship':
        return 'جاهز للشحن';
      case 'on_hold':
        return 'معلق مؤقتاً';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return 'عالي';
      case 'medium':
        return 'متوسط';
      case 'low':
        return 'منخفض';
      default:
        return priority;
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
              إدارة الطلبات غير المكتملة
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة شاملة للطلبات التي تحتاج إلى إكمال التنفيذ والمعالجة
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
              <Typography color="text.primary">الطلبات غير المكتملة</Typography>
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
              إضافة طلب جديد
            </Button>
          </Stack>
        </Box>

        {/* Enhanced Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {unfulfilledStats.map((stat, index) => {
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
              placeholder="البحث في الطلبات غير المكتملة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>حالة الطلب</InputLabel>
              <Select
                value={statusFilter}
                label="حالة الطلب"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                <MenuItem value="pending">معلق</MenuItem>
                <MenuItem value="processing">قيد المعالجة</MenuItem>
                <MenuItem value="ready_to_ship">جاهز للشحن</MenuItem>
                <MenuItem value="on_hold">معلق مؤقتاً</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الأولوية</InputLabel>
              <Select
                value={priorityFilter}
                label="الأولوية"
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الأولويات</MenuItem>
                <MenuItem value="high">عالي</MenuItem>
                <MenuItem value="medium">متوسط</MenuItem>
                <MenuItem value="low">منخفض</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setPriorityFilter('all');
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
            قائمة الطلبات غير المكتملة
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button
                size="small"
                onClick={() =>
                  setSnackbar({
                    open: true,
                    message: 'تم معالجة الطلبات المحددة',
                    severity: 'success',
                  })
                }
                sx={{ mr: 1 }}
              >
                معالجة ({selectedItems.length})
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
            إضافة طلب
          </Button>
        </Toolbar>

        {loading ? (
          <Box sx={{ p: 2 }}>
            <LinearProgress />
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لا توجد طلبات غير مكتملة. أضف طلبك الأول.</Alert>
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
                  <TableCell>حالة الطلب</TableCell>
                  <TableCell>الأولوية</TableCell>
                  <TableCell>تقدم التنفيذ</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'orderDate'}
                      direction={sortBy === 'orderDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('orderDate')}
                    >
                      تاريخ الطلب
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
                          label={getStatusLabel(item.status)}
                          size="small"
                          color={getStatusColor(item.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getPriorityLabel(item.priority)}
                          size="small"
                          color={getPriorityColor(item.priority)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 100 }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={item.fulfillmentProgress}
                              sx={{ height: 6, borderRadius: 3 }}
                              color={
                                item.fulfillmentProgress > 80
                                  ? 'success'
                                  : item.fulfillmentProgress > 50
                                  ? 'warning'
                                  : 'error'
                              }
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {item.fulfillmentProgress}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(item.orderDate)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleView(item)}
                              aria-label="عرض تفاصيل الطلب"
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل الطلب" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(item)}
                              aria-label="تعديل الطلب"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف الطلب" arrow>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(item)}
                              aria-label="حذف الطلب"
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
        <DialogTitle>{selectedOrder ? 'تعديل الطلب' : 'إضافة طلب جديد'}</DialogTitle>
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
                <InputLabel>حالة الطلب</InputLabel>
                <Select label="حالة الطلب" defaultValue={selectedOrder?.status || 'pending'}>
                  <MenuItem value="pending">معلق</MenuItem>
                  <MenuItem value="processing">قيد المعالجة</MenuItem>
                  <MenuItem value="ready_to_ship">جاهز للشحن</MenuItem>
                  <MenuItem value="on_hold">معلق مؤقتاً</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الأولوية</InputLabel>
                <Select label="الأولوية" defaultValue={selectedOrder?.priority || 'medium'}>
                  <MenuItem value="high">عالي</MenuItem>
                  <MenuItem value="medium">متوسط</MenuItem>
                  <MenuItem value="low">منخفض</MenuItem>
                </Select>
              </FormControl>
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
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ التنفيذ المتوقع"
                defaultValue={selectedOrder?.expectedFulfillment || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="عنوان الشحن"
                placeholder="أدخل عنوان الشحن"
                defaultValue={selectedOrder?.shippingAddress || ''}
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
        <DialogTitle>تفاصيل الطلب غير المكتمل</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mr: 2 }}>
                  <ShoppingCartIcon />
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
                    حالة الطلب
                  </Typography>
                  <Chip
                    label={getStatusLabel(selectedOrder.status)}
                    size="small"
                    color={getStatusColor(selectedOrder.status)}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    الأولوية
                  </Typography>
                  <Chip
                    label={getPriorityLabel(selectedOrder.priority)}
                    size="small"
                    color={getPriorityColor(selectedOrder.priority)}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تقدم التنفيذ
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={selectedOrder.fulfillmentProgress}
                        sx={{ height: 6, borderRadius: 3 }}
                        color={
                          selectedOrder.fulfillmentProgress > 80
                            ? 'success'
                            : selectedOrder.fulfillmentProgress > 50
                            ? 'warning'
                            : 'error'
                        }
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {selectedOrder.fulfillmentProgress}%
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تاريخ الطلب
                  </Typography>
                  <Typography variant="body1">{formatDate(selectedOrder.orderDate)}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تاريخ التنفيذ المتوقع
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(selectedOrder.expectedFulfillment)}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    عنوان الشحن
                  </Typography>
                  <Typography variant="body1">{selectedOrder.shippingAddress}</Typography>
                </Grid>
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

export default OrdersUnfulfilled;
