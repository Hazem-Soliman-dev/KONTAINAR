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
  LocalOffer as LocalOfferIcon,
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
} from '@mui/icons-material';

const Promotions = () => {
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
  const [sortBy, setSortBy] = useState('promoId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState(false);

  const promotionsData = [
    {
      id: 1,
      promoId: 'PROMO-001',
      name: 'تخفيض الصيف',
      description: 'عروض خاصة لفصل الصيف على جميع المنتجات',
      type: 'percentage',
      discount: 25,
      status: 'active',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      usageCount: 150,
      maxUsage: 500,
      lastUpdated: '2024-01-15',
      createdDate: '2024-01-01',
      tags: ['Summer', 'Sale'],
      targetAudience: 'all',
      minOrderValue: 100,
      maxDiscount: 1000,
      currency: 'SAR',
    },
    {
      id: 2,
      promoId: 'PROMO-002',
      name: 'الجمعة البيضاء',
      description: 'عروض الجمعة البيضاء على الإلكترونيات',
      type: 'fixed',
      discount: 50,
      status: 'scheduled',
      startDate: '2024-11-29',
      endDate: '2024-11-30',
      usageCount: 0,
      maxUsage: 1000,
      lastUpdated: '2024-01-10',
      createdDate: '2024-01-05',
      tags: ['Black Friday', 'Electronics'],
      targetAudience: 'electronics',
      minOrderValue: 200,
      maxDiscount: 2000,
      currency: 'SAR',
    },
    {
      id: 3,
      promoId: 'PROMO-003',
      name: 'عرض رأس السنة',
      description: 'عروض خاصة للاحتفال برأس السنة',
      type: 'percentage',
      discount: 15,
      status: 'expired',
      startDate: '2024-01-01',
      endDate: '2024-01-07',
      usageCount: 89,
      maxUsage: 200,
      lastUpdated: '2024-01-08',
      createdDate: '2023-12-20',
      tags: ['New Year', 'Holiday'],
      targetAudience: 'all',
      minOrderValue: 50,
      maxDiscount: 500,
      currency: 'SAR',
    },
    {
      id: 4,
      promoId: 'PROMO-004',
      name: 'عرض العملاء الجدد',
      description: 'خصم خاص للعملاء الجدد',
      type: 'percentage',
      discount: 30,
      status: 'active',
      startDate: '2024-01-01',
      endDate: null,
      usageCount: 45,
      maxUsage: 300,
      lastUpdated: '2024-01-12',
      createdDate: '2023-12-15',
      tags: ['New Customer', 'Welcome'],
      targetAudience: 'new_customers',
      minOrderValue: 75,
      maxDiscount: 750,
      currency: 'SAR',
    },
  ];

  const promoStats = [
    {
      title: 'إجمالي العروض',
      value: promotionsData.length.toString(),
      color: 'primary',
      icon: LocalOfferIcon,
      change: '+18%',
      description: 'زيادة في عدد العروض الترويجية',
    },
    {
      title: 'العروض النشطة',
      value: promotionsData.filter((p) => p.status === 'active').length.toString(),
      color: 'success',
      icon: CheckCircleIcon,
      change: '2 نشطة',
      description: 'العروض المطبقة حالياً',
    },
    {
      title: 'المجدولة',
      value: promotionsData.filter((p) => p.status === 'scheduled').length.toString(),
      color: 'warning',
      icon: ScheduleIcon,
      change: '1 مجدولة',
      description: 'العروض المجدولة للمستقبل',
    },
    {
      title: 'إجمالي الاستخدام',
      value: promotionsData.reduce((sum, p) => sum + p.usageCount, 0).toString(),
      color: 'info',
      icon: TrendingUpIcon,
      change: '284 استخدام',
      description: 'عدد مرات استخدام العروض',
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث العروض الترويجية بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(promotionsData.map((p) => p.id));
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

  const handleView = (promo) => {
    setSelectedPromo(promo);
    setViewDrawer(true);
  };

  const handleEdit = (promo) => {
    setSelectedPromo(promo);
    setOpenDialog(true);
  };

  const handleDelete = (promo) => {
    setSnackbar({
      open: true,
      message: `تم حذف العرض الترويجي ${promo.promoId} بنجاح`,
      severity: 'success',
    });
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const filteredData = promotionsData.filter((promo) => {
    const matchesSearch =
      promo.promoId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || promo.status === statusFilter;
    const matchesType = typeFilter === 'all' || promo.type === typeFilter;
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
      case 'scheduled':
        return 'warning';
      case 'expired':
        return 'default';
      case 'paused':
        return 'error';
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
      case 'scheduled':
        return 'مجدول';
      case 'expired':
        return 'منتهي الصلاحية';
      case 'paused':
        return 'متوقف';
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

  const getTargetAudienceText = (audience) => {
    switch (audience) {
      case 'all':
        return 'جميع العملاء';
      case 'new_customers':
        return 'العملاء الجدد';
      case 'electronics':
        return 'مشتري الإلكترونيات';
      default:
        return audience;
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
              إدارة العروض الترويجية
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة وتنظيم العروض الترويجية والخصومات للمنتجات والعملاء
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
              <Typography color="text.primary">العروض الترويجية</Typography>
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
              إضافة عرض ترويجي جديد
            </Button>
          </Stack>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {promoStats.map((stat, index) => {
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
              label="البحث في العروض الترويجية"
              size="small"
              placeholder="البحث بالمعرف أو الاسم أو الوصف..."
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
                <MenuItem value="scheduled">مجدول</MenuItem>
                <MenuItem value="expired">منتهي الصلاحية</MenuItem>
                <MenuItem value="paused">متوقف</MenuItem>
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
                    selectedItems.length > 0 && selectedItems.length < promotionsData.length
                  }
                  checked={
                    promotionsData.length > 0 && selectedItems.length === promotionsData.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'promoId'}
                  direction={sortBy === 'promoId' ? sortOrder : 'asc'}
                  onClick={() => handleSort('promoId')}
                >
                  معرف العرض
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
            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((promo) => (
              <TableRow key={promo.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedItems.includes(promo.id)}
                    onChange={() => handleSelectItem(promo.id)}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {promo.promoId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {promo.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {promo.description}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getTypeText(promo.type)}
                    color={getTypeColor(promo.type)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                    {promo.type === 'percentage'
                      ? `${promo.discount}%`
                      : `${promo.discount} ${promo.currency}`}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(promo.status)}
                    color={getStatusColor(promo.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  <Typography variant="body2">
                    {promo.usageCount} / {promo.maxUsage}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {Math.round((promo.usageCount / promo.maxUsage) * 100)}% مستخدم
                  </Typography>
                </TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  <Typography variant="body2" color="text.secondary">
                    {promo.startDate}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title="عرض التفاصيل" arrow>
                      <IconButton
                        size="small"
                        onClick={() => handleView(promo)}
                        aria-label="عرض العرض"
                      >
                        <VisibilityOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="تعديل العرض" arrow>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(promo)}
                        aria-label="تعديل العرض"
                      >
                        <EditOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="حذف العرض" arrow>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(promo)}
                        aria-label="حذف العرض"
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
        <DialogTitle>
          {selectedPromo ? 'تعديل العرض الترويجي' : 'إضافة عرض ترويجي جديد'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="معرف العرض"
                value={selectedPromo?.promoId || ''}
                size="small"
                disabled
                helperText="يتم إنشاء المعرف تلقائياً"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>النوع</InputLabel>
                <Select value={selectedPromo?.type || 'percentage'} label="النوع">
                  <MenuItem value="percentage">نسبة مئوية</MenuItem>
                  <MenuItem value="fixed">مبلغ ثابت</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="اسم العرض"
                value={selectedPromo?.name || ''}
                size="small"
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="وصف العرض"
                multiline
                rows={3}
                value={selectedPromo?.description || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="قيمة الخصم"
                type="number"
                value={selectedPromo?.discount || ''}
                size="small"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الجمهور المستهدف</InputLabel>
                <Select value={selectedPromo?.targetAudience || 'all'} label="الجمهور المستهدف">
                  <MenuItem value="all">جميع العملاء</MenuItem>
                  <MenuItem value="new_customers">العملاء الجدد</MenuItem>
                  <MenuItem value="electronics">مشتري الإلكترونيات</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="تاريخ البداية"
                type="date"
                value={selectedPromo?.startDate || ''}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="تاريخ النهاية"
                type="date"
                value={selectedPromo?.endDate || ''}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الحد الأدنى لقيمة الطلب"
                type="number"
                value={selectedPromo?.minOrderValue || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الحد الأقصى للخصم"
                type="number"
                value={selectedPromo?.maxDiscount || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الحد الأقصى للاستخدام"
                type="number"
                value={selectedPromo?.maxUsage || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الحالة</InputLabel>
                <Select value={selectedPromo?.status || 'active'} label="الحالة">
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="scheduled">مجدول</MenuItem>
                  <MenuItem value="expired">منتهي الصلاحية</MenuItem>
                  <MenuItem value="paused">متوقف</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="تفعيل التطبيق التلقائي للعرض"
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
                message: 'تم حفظ العرض الترويجي بنجاح',
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
        <DialogTitle>تفاصيل العرض الترويجي</DialogTitle>
        <DialogContent>
          {selectedPromo && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  معرف العرض
                </Typography>
                <Typography variant="body1">{selectedPromo.promoId}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  النوع
                </Typography>
                <Chip
                  label={getTypeText(selectedPromo.type)}
                  color={getTypeColor(selectedPromo.type)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الاسم
                </Typography>
                <Typography variant="body1">{selectedPromo.name}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الوصف
                </Typography>
                <Typography variant="body1">{selectedPromo.description}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  قيمة الخصم
                </Typography>
                <Typography variant="body1" color="success.main" sx={{ fontWeight: 500 }}>
                  {selectedPromo.type === 'percentage'
                    ? `${selectedPromo.discount}%`
                    : `${selectedPromo.discount} ${selectedPromo.currency}`}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الحالة
                </Typography>
                <Chip
                  label={getStatusText(selectedPromo.status)}
                  color={getStatusColor(selectedPromo.status)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الاستخدام
                </Typography>
                <Typography variant="body1">
                  {selectedPromo.usageCount} / {selectedPromo.maxUsage}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {Math.round((selectedPromo.usageCount / selectedPromo.maxUsage) * 100)}% مستخدم
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الجمهور المستهدف
                </Typography>
                <Typography variant="body1">
                  {getTargetAudienceText(selectedPromo.targetAudience)}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  تاريخ البداية
                </Typography>
                <Typography variant="body1">{selectedPromo.startDate}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  تاريخ النهاية
                </Typography>
                <Typography variant="body1">{selectedPromo.endDate || 'غير محدد'}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الحد الأدنى لقيمة الطلب
                </Typography>
                <Typography variant="body1">
                  {selectedPromo.minOrderValue} {selectedPromo.currency}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الحد الأقصى للخصم
                </Typography>
                <Typography variant="body1">
                  {selectedPromo.maxDiscount} {selectedPromo.currency}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  آخر تحديث
                </Typography>
                <Typography variant="body1">{selectedPromo.lastUpdated}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDrawer(false)}>إغلاق</Button>
          <Button variant="contained" onClick={() => handleEdit(selectedPromo)}>
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

export default Promotions;
