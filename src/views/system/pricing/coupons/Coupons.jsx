import React, { useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
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
  Divider,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Slider,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  VisibilityOutlined,
  EditOutlined,
  DeleteOutline,
  Search as SearchIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
  Analytics as AnalyticsIcon,
  Campaign as CampaignIcon,
  Percent as PercentIcon,
  AttachMoney as AttachMoneyIcon,
  AutoAwesome as AutoAwesomeIcon,
  Timer as TimerIcon,
  QrCode as QrCodeIcon,
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material';

const Coupons = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('code');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState(false);

  const couponsData = [
    {
      id: 1,
      code: 'وفر20',
      name: 'كوبون خصم 20%',
      description: 'خصم 20% على جميع المنتجات',
      type: 'percentage',
      discount: 20,
      status: 'active',
      usageLimit: 100,
      usageCount: 45,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      lastUpdated: '2024-01-15',
      createdDate: '2023-12-20',
      tags: ['Sale', 'General'],
      minOrderValue: 50,
      maxDiscount: 200,
      currency: 'SAR',
      customerLimit: 1,
      isPublic: true,
    },
    {
      id: 2,
      code: 'FIRST50',
      name: 'كوبون العملاء الجدد',
      description: 'خصم 50 ريال للعملاء الجدد',
      type: 'fixed',
      discount: 50,
      status: 'active',
      usageLimit: 500,
      usageCount: 234,
      startDate: '2024-01-01',
      endDate: null,
      lastUpdated: '2024-01-10',
      createdDate: '2024-01-01',
      tags: ['New Customer', 'Welcome'],
      minOrderValue: 100,
      maxDiscount: 50,
      currency: 'SAR',
      customerLimit: 1,
      isPublic: false,
    },
    {
      id: 3,
      code: 'EXPIRED10',
      name: 'كوبون منتهي الصلاحية',
      description: 'خصم 10% منتهي الصلاحية',
      type: 'percentage',
      discount: 10,
      status: 'expired',
      usageLimit: 200,
      usageCount: 156,
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      lastUpdated: '2023-12-31',
      createdDate: '2022-12-01',
      tags: ['Expired', 'Old'],
      minOrderValue: 25,
      maxDiscount: 100,
      currency: 'SAR',
      customerLimit: 1,
      isPublic: true,
    },
    {
      id: 4,
      code: 'VIP30',
      name: 'كوبون العملاء المميزين',
      description: 'خصم 30% للعملاء المميزين',
      type: 'percentage',
      discount: 30,
      status: 'active',
      usageLimit: 50,
      usageCount: 12,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      lastUpdated: '2024-01-12',
      createdDate: '2023-12-15',
      tags: ['VIP', 'Premium'],
      minOrderValue: 200,
      maxDiscount: 500,
      currency: 'SAR',
      customerLimit: 3,
      isPublic: false,
    },
  ];

  const couponStats = [
    {
      title: 'إجمالي الكوبونات',
      value: couponsData.length.toString(),
      color: 'primary',
      icon: ConfirmationNumberIcon,
      change: '+25%',
      description: 'زيادة في عدد الكوبونات',
    },
    {
      title: 'الكوبونات النشطة',
      value: couponsData.filter((c) => c.status === 'active').length.toString(),
      color: 'success',
      icon: CheckCircleIcon,
      change: '3 نشطة',
      description: 'الكوبونات المتاحة للاستخدام',
    },
    {
      title: 'منتهية الصلاحية قريباً',
      value: '0',
      color: 'warning',
      icon: TimerIcon,
      change: 'لا توجد',
      description: 'الكوبونات التي ستنتهي خلال 7 أيام',
    },
    {
      title: 'إجمالي الاستخدام',
      value: couponsData.reduce((sum, c) => sum + c.usageCount, 0).toString(),
      color: 'info',
      icon: TrendingUpIcon,
      change: '447 استخدام',
      description: 'عدد مرات استخدام الكوبونات',
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({ open: true, message: 'تم تحديث الكوبونات بنجاح', severity: 'success' });
    }, 1000);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(couponsData.map((c) => c.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleView = (coupon) => {
    setSelectedCoupon(coupon);
    setViewDrawer(true);
  };

  const handleEdit = (coupon) => {
    setSelectedCoupon(coupon);
    setOpenDialog(true);
  };

  const handleDelete = (coupon) => {
    setSnackbar({
      open: true,
      message: `تم حذف الكوبون ${coupon.code} بنجاح`,
      severity: 'success',
    });
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setSnackbar({
      open: true,
      message: 'تم نسخ كود الكوبون',
      severity: 'success',
    });
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const filteredData = couponsData.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || coupon.status === statusFilter;
    const matchesType = typeFilter === 'all' || coupon.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'expired':
        return 'default';
      case 'disabled':
        return 'error';
      case 'scheduled':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'percentage':
        return 'info';
      case 'fixed':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'expired':
        return 'منتهي الصلاحية';
      case 'disabled':
        return 'معطل';
      case 'scheduled':
        return 'مجدول';
      default:
        return status;
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'percentage':
        return 'نسبة مئوية';
      case 'fixed':
        return 'مبلغ ثابت';
      default:
        return type;
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              إدارة كوبونات الخصم
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة وتنظيم كوبونات الخصم والعروض الخاصة للعملاء
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
              <Link color="inherit" href="/main-store/pricing">
                التسعير
              </Link>
              <Typography color="text.primary">كوبونات الخصم</Typography>
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
              إضافة كوبون جديد
            </Button>
          </Stack>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {couponStats.map((stat, index) => {
            const IconComponent = stat.icon;
            const color = stat.color;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette[color].main,
                      0.08,
                    )} 0%, ${alpha(theme.palette[color].main, 0.04)} 100%)`,
                    border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 25px ${alpha(theme.palette[color].main, 0.15)}`,
                    },
                  }}
                >
                  <CardContent>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: alpha(theme.palette[color].main, 0.1),
                        color: theme.palette[color].main,
                      }}
                    >
                      <IconComponent />
                    </Avatar>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 600, color: theme.palette[color].main, mb: 1 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette[color].main, mb: 1 }}>
                      {stat.change}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', display: 'block' }}
                    >
                      {stat.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Filters Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            البحث والتصفية
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FilterListIcon />}
              onClick={() => setAdvancedFilters(!advancedFilters)}
            >
              {advancedFilters ? 'إخفاء المرشحات المتقدمة' : 'مرشحات متقدمة'}
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
            >
              مسح المرشحات
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="البحث في الكوبونات"
              size="small"
              placeholder="البحث بالكود أو الاسم أو الوصف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الحالة</InputLabel>
              <Select
                label="الحالة"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                <MenuItem value="active">نشط</MenuItem>
                <MenuItem value="expired">منتهي الصلاحية</MenuItem>
                <MenuItem value="disabled">معطل</MenuItem>
                <MenuItem value="scheduled">مجدول</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>النوع</InputLabel>
              <Select
                label="النوع"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الأنواع</MenuItem>
                <MenuItem value="percentage">نسبة مئوية</MenuItem>
                <MenuItem value="fixed">مبلغ ثابت</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {filteredData.length} نتيجة
            </Typography>
          </Grid>
        </Grid>

        {/* Advanced Filters */}
        {advancedFilters && (
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              مرشحات متقدمة
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="الحد الأدنى للخصم"
                  type="number"
                  size="small"
                  placeholder="مثال: 10"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="الحد الأقصى للخصم"
                  type="number"
                  size="small"
                  placeholder="مثال: 50"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="تاريخ البداية"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="تاريخ النهاية"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Data Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {loading && <LinearProgress />}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedItems.length > 0 && selectedItems.length < couponsData.length
                  }
                  checked={couponsData.length > 0 && selectedItems.length === couponsData.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'code'}
                  direction={sortBy === 'code' ? sortOrder : 'asc'}
                  onClick={() => handleSort('code')}
                >
                  كود الكوبون
                </TableSortLabel>
              </TableCell>
              <TableCell>الاسم</TableCell>
              <TableCell>النوع</TableCell>
              <TableCell>الخصم</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>الاستخدام</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                تاريخ البداية
              </TableCell>
              <TableCell align="center">الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((coupon) => (
                <TableRow key={coupon.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(coupon.id)}
                      onChange={() => handleSelectItem(coupon.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {coupon.code}
                      </Typography>
                      <Tooltip title="نسخ الكود" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleCopyCode(coupon.code)}
                          aria-label="نسخ كود الكوبون"
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {coupon.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {coupon.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getTypeText(coupon.type)}
                      color={getTypeColor(coupon.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                      {coupon.type === 'percentage'
                        ? `${coupon.discount}%`
                        : `${coupon.discount} ${coupon.currency}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(coupon.status)}
                      color={getStatusColor(coupon.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2">
                      {coupon.usageCount} / {coupon.usageLimit}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {Math.round((coupon.usageCount / coupon.usageLimit) * 100)}% مستخدم
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {coupon.startDate}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="عرض التفاصيل" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleView(coupon)}
                          aria-label="عرض الكوبون"
                        >
                          <VisibilityOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="تعديل الكوبون" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(coupon)}
                          aria-label="تعديل الكوبون"
                        >
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف الكوبون" arrow>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(coupon)}
                          aria-label="حذف الكوبون"
                        >
                          <DeleteOutline />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedCoupon ? 'تعديل الكوبون' : 'إضافة كوبون جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="كود الكوبون"
                value={selectedCoupon?.code || ''}
                size="small"
                required
                helperText="يجب أن يكون الكود فريداً"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>النوع</InputLabel>
                <Select value={selectedCoupon?.type || 'percentage'} label="النوع">
                  <MenuItem value="percentage">نسبة مئوية</MenuItem>
                  <MenuItem value="fixed">مبلغ ثابت</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="اسم الكوبون"
                value={selectedCoupon?.name || ''}
                size="small"
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="وصف الكوبون"
                multiline
                rows={3}
                value={selectedCoupon?.description || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="قيمة الخصم"
                type="number"
                value={selectedCoupon?.discount || ''}
                size="small"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الحد الأقصى للاستخدام"
                type="number"
                value={selectedCoupon?.usageLimit || ''}
                size="small"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="تاريخ البداية"
                type="date"
                value={selectedCoupon?.startDate || ''}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="تاريخ النهاية"
                type="date"
                value={selectedCoupon?.endDate || ''}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الحد الأدنى لقيمة الطلب"
                type="number"
                value={selectedCoupon?.minOrderValue || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الحد الأقصى للخصم"
                type="number"
                value={selectedCoupon?.maxDiscount || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="حد الاستخدام لكل عميل"
                type="number"
                value={selectedCoupon?.customerLimit || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الحالة</InputLabel>
                <Select value={selectedCoupon?.status || 'active'} label="الحالة">
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="expired">منتهي الصلاحية</MenuItem>
                  <MenuItem value="disabled">معطل</MenuItem>
                  <MenuItem value="scheduled">مجدول</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={<Switch defaultChecked={selectedCoupon?.isPublic || false} />}
                label="كوبون عام (متاح للجميع)"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={() => {
              setSnackbar({
                open: true,
                message: 'تم حفظ الكوبون بنجاح',
                severity: 'success',
              });
              setOpenDialog(false);
            }}
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewDrawer} onClose={() => setViewDrawer(false)} maxWidth="md" fullWidth>
        <DialogTitle>تفاصيل الكوبون</DialogTitle>
        <DialogContent>
          {selectedCoupon && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  كود الكوبون
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {selectedCoupon.code}
                  </Typography>
                  <Tooltip title="نسخ الكود" arrow>
                    <IconButton
                      size="small"
                      onClick={() => handleCopyCode(selectedCoupon.code)}
                      aria-label="نسخ كود الكوبون"
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  النوع
                </Typography>
                <Chip
                  label={getTypeText(selectedCoupon.type)}
                  color={getTypeColor(selectedCoupon.type)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الاسم
                </Typography>
                <Typography variant="body1">{selectedCoupon.name}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الوصف
                </Typography>
                <Typography variant="body1">{selectedCoupon.description}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  قيمة الخصم
                </Typography>
                <Typography variant="body1" color="success.main" sx={{ fontWeight: 500 }}>
                  {selectedCoupon.type === 'percentage'
                    ? `${selectedCoupon.discount}%`
                    : `${selectedCoupon.discount} ${selectedCoupon.currency}`}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الحالة
                </Typography>
                <Chip
                  label={getStatusText(selectedCoupon.status)}
                  color={getStatusColor(selectedCoupon.status)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الاستخدام
                </Typography>
                <Typography variant="body1">
                  {selectedCoupon.usageCount} / {selectedCoupon.usageLimit}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {Math.round((selectedCoupon.usageCount / selectedCoupon.usageLimit) * 100)}%
                  مستخدم
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  حد الاستخدام لكل عميل
                </Typography>
                <Typography variant="body1">{selectedCoupon.customerLimit} مرة</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  تاريخ البداية
                </Typography>
                <Typography variant="body1">{selectedCoupon.startDate}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  تاريخ النهاية
                </Typography>
                <Typography variant="body1">{selectedCoupon.endDate || 'غير محدد'}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الحد الأدنى لقيمة الطلب
                </Typography>
                <Typography variant="body1">
                  {selectedCoupon.minOrderValue} {selectedCoupon.currency}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الحد الأقصى للخصم
                </Typography>
                <Typography variant="body1">
                  {selectedCoupon.maxDiscount} {selectedCoupon.currency}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  نوع الكوبون
                </Typography>
                <Typography variant="body1">
                  {selectedCoupon.isPublic ? 'عام (متاح للجميع)' : 'خاص (محدود)'}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  آخر تحديث
                </Typography>
                <Typography variant="body1">{selectedCoupon.lastUpdated}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDrawer(false)}>إغلاق</Button>
          <Button variant="contained" onClick={() => handleEdit(selectedCoupon)}>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Coupons;
