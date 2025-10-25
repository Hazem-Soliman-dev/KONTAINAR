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
  AssignmentReturn as AssignmentReturnIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as AttachMoneyIcon,
  LocalShipping as LocalShippingIcon,
  Receipt as ReceiptIcon,
  Support as SupportIcon,
} from '@mui/icons-material';

const ReturnsRMA = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [reasonFilter, setReasonFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('returnId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for returns/RMA
  const returnsData = [
    {
      id: 1,
      returnId: 'RET-001',
      orderNo: 'ORD-001',
      customer: 'أحمد محمد',
      customerEmail: 'ahmed@example.com',
      customerPhone: '+966501234567',
      totalAmount: 1250.5,
      status: 'pending',
      reason: 'defective_product',
      returnDate: '2024-01-15',
      expectedRefund: '2024-01-20',
      items: [
        { name: 'لابتوب ديل', quantity: 1, price: 1200.0, reason: 'عطل في الشاشة' },
        { name: 'ماوس لاسلكي', quantity: 1, price: 50.5, reason: 'لا يعمل' },
      ],
      returnReason: 'منتج معطل - شاشة لا تعمل',
      returnNotes: 'العميل يطلب استبدال المنتج',
      lastModified: '2024-01-15',
      returnProgress: 30,
    },
    {
      id: 2,
      returnId: 'RET-002',
      orderNo: 'ORD-002',
      customer: 'فاطمة علي',
      customerEmail: 'fatima@example.com',
      customerPhone: '+966502345678',
      totalAmount: 850.75,
      status: 'approved',
      reason: 'wrong_item',
      returnDate: '2024-01-14',
      expectedRefund: '2024-01-19',
      items: [
        { name: 'هاتف ذكي', quantity: 1, price: 800.0, reason: 'طلب خطأ' },
        { name: 'حافظة هاتف', quantity: 1, price: 50.75, reason: 'لا تناسب الهاتف' },
      ],
      returnReason: 'طلب خطأ - المنتج غير مناسب',
      returnNotes: 'تم الموافقة على الإرجاع',
      lastModified: '2024-01-14',
      returnProgress: 70,
    },
    {
      id: 3,
      returnId: 'RET-003',
      orderNo: 'ORD-003',
      customer: 'محمد عبدالله',
      customerEmail: 'mohammed@example.com',
      customerPhone: '+966503456789',
      totalAmount: 2100.0,
      status: 'completed',
      reason: 'not_satisfied',
      returnDate: '2024-01-13',
      expectedRefund: '2024-01-18',
      items: [
        { name: 'تلفزيون ذكي', quantity: 1, price: 2000.0, reason: 'غير راضي عن الجودة' },
        { name: 'كابل HDMI', quantity: 2, price: 50.0, reason: 'غير مطلوب' },
      ],
      returnReason: 'غير راضي عن المنتج',
      returnNotes: 'تم استرداد المبلغ بنجاح',
      lastModified: '2024-01-18',
      returnProgress: 100,
    },
  ];

  // Stats data
  const returnsStats = [
    {
      title: 'إجمالي طلبات الإرجاع',
      value: returnsData.length.toString(),
      color: 'primary',
      icon: AssignmentReturnIcon,
      change: '+12%',
    },
    {
      title: 'طلبات معلقة',
      value: returnsData.filter((r) => r.status === 'pending').length.toString(),
      color: 'warning',
      icon: ScheduleIcon,
      change: '1 معلقة',
    },
    {
      title: 'طلبات موافق عليها',
      value: returnsData.filter((r) => r.status === 'approved').length.toString(),
      color: 'info',
      icon: CheckCircleIcon,
      change: '1 موافق عليها',
    },
    {
      title: 'طلبات مكتملة',
      value: returnsData.filter((r) => r.status === 'completed').length.toString(),
      color: 'success',
      icon: CheckCircleIcon,
      change: '100%',
    },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم حفظ طلب الإرجاع بنجاح',
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

  const handleView = (returnItem) => {
    setSelectedReturn(returnItem);
    setViewDrawer(true);
  };

  const handleEdit = (returnItem) => {
    setSelectedReturn(returnItem);
    setOpenDialog(true);
  };

  const handleDelete = (returnItem) => {
    setSnackbar({
      open: true,
      message: `تم حذف طلب الإرجاع ${returnItem.returnId} بنجاح`,
      severity: 'success',
    });
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const filteredData = useMemo(() => {
    return returnsData.filter((item) => {
      const matchesSearch =
        item.returnId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesReason = reasonFilter === 'all' || item.reason === reasonFilter;
      return matchesSearch && matchesStatus && matchesReason;
    });
  }, [returnsData, searchTerm, statusFilter, reasonFilter]);

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
      case 'approved':
        return 'info';
      case 'completed':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'معلق';
      case 'approved':
        return 'موافق عليه';
      case 'completed':
        return 'مكتمل';
      case 'rejected':
        return 'مرفوض';
      default:
        return status;
    }
  };

  const getReasonColor = (reason) => {
    switch (reason) {
      case 'defective_product':
        return 'error';
      case 'wrong_item':
        return 'warning';
      case 'not_satisfied':
        return 'info';
      case 'damaged_shipping':
        return 'error';
      default:
        return 'default';
    }
  };

  const getReasonLabel = (reason) => {
    switch (reason) {
      case 'defective_product':
        return 'منتج معطل';
      case 'wrong_item':
        return 'طلب خطأ';
      case 'not_satisfied':
        return 'غير راضي';
      case 'damaged_shipping':
        return 'تلف في الشحن';
      default:
        return reason;
    }
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
              إدارة الإرجاع والاستبدال
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة شاملة لطلبات الإرجاع والاستبدال مع تتبع الحالات والمعالجة
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
              <Typography color="text.primary">الإرجاع والاستبدال</Typography>
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
              إضافة طلب إرجاع
            </Button>
          </Stack>
        </Box>

        {/* Enhanced Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {returnsStats.map((stat, index) => {
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
              placeholder="البحث في طلبات الإرجاع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>حالة الإرجاع</InputLabel>
              <Select
                value={statusFilter}
                label="حالة الإرجاع"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                <MenuItem value="pending">معلق</MenuItem>
                <MenuItem value="approved">موافق عليه</MenuItem>
                <MenuItem value="completed">مكتمل</MenuItem>
                <MenuItem value="rejected">مرفوض</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>سبب الإرجاع</InputLabel>
              <Select
                value={reasonFilter}
                label="سبب الإرجاع"
                onChange={(e) => setReasonFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الأسباب</MenuItem>
                <MenuItem value="defective_product">منتج معطل</MenuItem>
                <MenuItem value="wrong_item">طلب خطأ</MenuItem>
                <MenuItem value="not_satisfied">غير راضي</MenuItem>
                <MenuItem value="damaged_shipping">تلف في الشحن</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setReasonFilter('all');
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
            قائمة طلبات الإرجاع
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button
                size="small"
                onClick={() =>
                  setSnackbar({
                    open: true,
                    message: 'تم معالجة طلبات الإرجاع المحددة',
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
                    message: 'تم حذف طلبات الإرجاع المحددة',
                    severity: 'success',
                  })
                }
              >
                حذف ({selectedItems.length})
              </Button>
            </Box>
          )}
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
            إضافة طلب إرجاع
          </Button>
        </Toolbar>

        {loading ? (
          <Box sx={{ p: 2 }}>
            <LinearProgress />
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لا توجد طلبات إرجاع. أضف طلب الإرجاع الأول.</Alert>
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
                      active={sortBy === 'returnId'}
                      direction={sortBy === 'returnId' ? sortOrder : 'asc'}
                      onClick={() => handleSort('returnId')}
                    >
                      رقم الإرجاع
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>رقم الطلب</TableCell>
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
                  <TableCell>حالة الإرجاع</TableCell>
                  <TableCell>سبب الإرجاع</TableCell>
                  <TableCell>تقدم الإرجاع</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'returnDate'}
                      direction={sortBy === 'returnDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('returnDate')}
                    >
                      تاريخ الإرجاع
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
                          {item.returnId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontFamily="monospace">
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
                          label={getReasonLabel(item.reason)}
                          size="small"
                          color={getReasonColor(item.reason)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 100 }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={item.returnProgress}
                              sx={{ height: 6, borderRadius: 3 }}
                              color={
                                item.returnProgress > 80
                                  ? 'success'
                                  : item.returnProgress > 50
                                  ? 'warning'
                                  : 'error'
                              }
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {item.returnProgress}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(item.returnDate)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleView(item)}
                              aria-label="عرض تفاصيل طلب الإرجاع"
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل طلب الإرجاع" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(item)}
                              aria-label="تعديل طلب الإرجاع"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف طلب الإرجاع" arrow>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(item)}
                              aria-label="حذف طلب الإرجاع"
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
        <DialogTitle>{selectedReturn ? 'تعديل طلب الإرجاع' : 'إضافة طلب إرجاع جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الإرجاع"
                placeholder="أدخل رقم الإرجاع"
                defaultValue={selectedReturn?.returnId || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الطلب"
                placeholder="أدخل رقم الطلب"
                defaultValue={selectedReturn?.orderNo || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم العميل"
                placeholder="أدخل اسم العميل"
                defaultValue={selectedReturn?.customer || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="أدخل البريد الإلكتروني"
                defaultValue={selectedReturn?.customerEmail || ''}
                type="email"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="المبلغ الإجمالي"
                placeholder="0.00"
                defaultValue={selectedReturn?.totalAmount || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>حالة الإرجاع</InputLabel>
                <Select label="حالة الإرجاع" defaultValue={selectedReturn?.status || 'pending'}>
                  <MenuItem value="pending">معلق</MenuItem>
                  <MenuItem value="approved">موافق عليه</MenuItem>
                  <MenuItem value="completed">مكتمل</MenuItem>
                  <MenuItem value="rejected">مرفوض</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>سبب الإرجاع</InputLabel>
                <Select
                  label="سبب الإرجاع"
                  defaultValue={selectedReturn?.reason || 'defective_product'}
                >
                  <MenuItem value="defective_product">منتج معطل</MenuItem>
                  <MenuItem value="wrong_item">طلب خطأ</MenuItem>
                  <MenuItem value="not_satisfied">غير راضي</MenuItem>
                  <MenuItem value="damaged_shipping">تلف في الشحن</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الإرجاع"
                defaultValue={selectedReturn?.returnDate || new Date().toISOString().split('T')[0]}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الاسترداد المتوقع"
                defaultValue={selectedReturn?.expectedRefund || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="سبب الإرجاع"
                placeholder="أدخل سبب الإرجاع..."
                defaultValue={selectedReturn?.returnReason || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="ملاحظات"
                placeholder="أدخل ملاحظات إضافية..."
                defaultValue={selectedReturn?.returnNotes || ''}
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
        <DialogTitle>تفاصيل طلب الإرجاع</DialogTitle>
        <DialogContent>
          {selectedReturn && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mr: 2 }}>
                  <AssignmentReturnIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedReturn.returnId}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    العميل: {selectedReturn.customer}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    رقم الطلب
                  </Typography>
                  <Typography variant="body1" fontFamily="monospace">
                    {selectedReturn.orderNo}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    المبلغ الإجمالي
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatCurrency(selectedReturn.totalAmount)}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    حالة الإرجاع
                  </Typography>
                  <Chip
                    label={getStatusLabel(selectedReturn.status)}
                    size="small"
                    color={getStatusColor(selectedReturn.status)}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    سبب الإرجاع
                  </Typography>
                  <Chip
                    label={getReasonLabel(selectedReturn.reason)}
                    size="small"
                    color={getReasonColor(selectedReturn.reason)}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تاريخ الإرجاع
                  </Typography>
                  <Typography variant="body1">{formatDate(selectedReturn.returnDate)}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تاريخ الاسترداد المتوقع
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(selectedReturn.expectedRefund)}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    سبب الإرجاع
                  </Typography>
                  <Typography variant="body1">{selectedReturn.returnReason}</Typography>
                </Grid>
                {selectedReturn.returnNotes && (
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      ملاحظات
                    </Typography>
                    <Typography variant="body1">{selectedReturn.returnNotes}</Typography>
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

export default ReturnsRMA;
