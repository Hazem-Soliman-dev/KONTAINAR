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
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
  Analytics as AnalyticsIcon,
  PriceCheck as PriceCheckIcon,
  LocalOffer as LocalOfferIcon,
  Group as GroupIcon,
  AutoAwesome as AutoAwesomeIcon,
} from '@mui/icons-material';

const PricingLists = () => {
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
  const [sortBy, setSortBy] = useState('listId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState(false);

  const pricingData = [
    {
      id: 1,
      listId: 'PL-001',
      name: 'التسعير القياسي',
      description: 'قائمة الأسعار الأساسية لجميع المنتجات',
      type: 'standard',
      productsCount: 150,
      status: 'active',
      startDate: '2024-01-01',
      endDate: null,
      lastUpdated: '2024-01-15',
      createdDate: '2023-12-01',
      tags: ['Standard', 'Default'],
      avgPrice: 250.0,
      totalValue: 37500.0,
      currency: 'SAR',
    },
    {
      id: 2,
      listId: 'PL-002',
      name: 'عروض الصيف',
      description: 'عروض خاصة لفصل الصيف',
      type: 'promotional',
      productsCount: 50,
      status: 'scheduled',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      lastUpdated: '2024-01-10',
      createdDate: '2024-01-01',
      tags: ['Summer', 'Promo'],
      avgPrice: 180.0,
      totalValue: 9000.0,
      currency: 'SAR',
    },
    {
      id: 3,
      listId: 'PL-003',
      name: 'عملاء VIP',
      description: 'أسعار خاصة للعملاء المميزين',
      type: 'customer-group',
      productsCount: 200,
      status: 'active',
      startDate: '2024-01-01',
      endDate: null,
      lastUpdated: '2024-01-12',
      createdDate: '2023-11-15',
      tags: ['VIP', 'Premium'],
      avgPrice: 200.0,
      totalValue: 40000.0,
      currency: 'SAR',
    },
    {
      id: 4,
      listId: 'PL-004',
      name: 'عروض الجمعة البيضاء',
      description: 'عروض خاصة لحدث الجمعة البيضاء',
      type: 'promotional',
      productsCount: 75,
      status: 'scheduled',
      startDate: '2024-11-29',
      endDate: '2024-11-30',
      lastUpdated: '2024-01-08',
      createdDate: '2024-01-05',
      tags: ['Black Friday', 'Sale'],
      avgPrice: 120.0,
      totalValue: 9000.0,
      currency: 'SAR',
    },
  ];

  const pricingStats = [
    {
      title: 'إجمالي القوائم',
      value: pricingData.length.toString(),
      color: 'primary',
      icon: PriceCheckIcon,
      change: '+12%',
      description: 'زيادة في عدد قوائم الأسعار',
    },
    {
      title: 'القوائم النشطة',
      value: pricingData.filter((p) => p.status === 'active').length.toString(),
      color: 'success',
      icon: CheckCircleIcon,
      change: '2 نشطة',
      description: 'قوائم الأسعار المطبقة حالياً',
    },
    {
      title: 'المجدولة',
      value: pricingData.filter((p) => p.status === 'scheduled').length.toString(),
      color: 'warning',
      icon: ScheduleIcon,
      change: '2 مجدولة',
      description: 'قوائم الأسعار المجدولة للمستقبل',
    },
    {
      title: 'إجمالي المنتجات',
      value: pricingData.reduce((sum, p) => sum + p.productsCount, 0).toString(),
      color: 'info',
      icon: TrendingUpIcon,
      change: '475 منتج',
      description: 'عدد المنتجات في جميع القوائم',
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث قوائم الأسعار بنجاح',
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
      setSelectedItems(pricingData.map((p) => p.id));
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

  const handleView = (pricing) => {
    setSelectedPricing(pricing);
    setViewDrawer(true);
  };

  const handleEdit = (pricing) => {
    setSelectedPricing(pricing);
    setOpenDialog(true);
  };

  const handleDelete = (pricing) => {
    setSnackbar({
      open: true,
      message: `تم حذف قائمة الأسعار ${pricing.listId} بنجاح`,
      severity: 'success',
    });
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const filteredData = pricingData.filter((pricing) => {
    const matchesSearch =
      pricing.listId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pricing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pricing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pricing.status === statusFilter;
    const matchesType = typeFilter === 'all' || pricing.type === typeFilter;
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
      case 'inactive':
        return 'default';
      case 'expired':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'standard':
        return 'primary';
      case 'promotional':
        return 'warning';
      case 'customer-group':
        return 'info';
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
      case 'inactive':
        return 'غير نشط';
      case 'expired':
        return 'منتهي الصلاحية';
      default:
        return status;
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'standard':
        return 'قياسي';
      case 'promotional':
        return 'ترويجي';
      case 'customer-group':
        return 'مجموعة عملاء';
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
              إدارة قوائم الأسعار
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة وتنظيم قوائم الأسعار المختلفة للمنتجات والعملاء
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
              <Typography color="text.primary">قوائم الأسعار</Typography>
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
              إضافة قائمة أسعار جديدة
            </Button>
          </Stack>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {pricingStats.map((stat, index) => {
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
              label="البحث في قوائم الأسعار"
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
                <MenuItem value="inactive">غير نشط</MenuItem>
                <MenuItem value="expired">منتهي الصلاحية</MenuItem>
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
                <MenuItem value="standard">قياسي</MenuItem>
                <MenuItem value="promotional">ترويجي</MenuItem>
                <MenuItem value="customer-group">مجموعة عملاء</MenuItem>
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
                  label="الحد الأدنى للمنتجات"
                  type="number"
                  size="small"
                  placeholder="مثال: 10"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="الحد الأقصى للمنتجات"
                  type="number"
                  size="small"
                  placeholder="مثال: 500"
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
                    selectedItems.length > 0 && selectedItems.length < pricingData.length
                  }
                  checked={pricingData.length > 0 && selectedItems.length === pricingData.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'listId'}
                  direction={sortBy === 'listId' ? sortOrder : 'asc'}
                  onClick={() => handleSort('listId')}
                >
                  معرف القائمة
                </TableSortLabel>
              </TableCell>
              <TableCell>الاسم</TableCell>
              <TableCell>النوع</TableCell>
              <TableCell>عدد المنتجات</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                تاريخ البداية
              </TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                تاريخ النهاية
              </TableCell>
              <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>متوسط السعر</TableCell>
              <TableCell align="center">الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pricing) => (
                <TableRow key={pricing.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(pricing.id)}
                      onChange={() => handleSelectItem(pricing.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {pricing.listId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {pricing.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {pricing.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getTypeText(pricing.type)}
                      color={getTypeColor(pricing.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {pricing.productsCount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(pricing.status)}
                      color={getStatusColor(pricing.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {pricing.startDate}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {pricing.endDate || 'غير محدد'}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                    <Typography variant="body2" color="success.main">
                      {pricing.avgPrice.toLocaleString()} {pricing.currency}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="عرض التفاصيل" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleView(pricing)}
                          aria-label="عرض القائمة"
                        >
                          <VisibilityOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="تعديل القائمة" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(pricing)}
                          aria-label="تعديل القائمة"
                        >
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف القائمة" arrow>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(pricing)}
                          aria-label="حذف القائمة"
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
          {selectedPricing ? 'تعديل قائمة الأسعار' : 'إضافة قائمة أسعار جديدة'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="معرف القائمة"
                value={selectedPricing?.listId || ''}
                size="small"
                disabled
                helperText="يتم إنشاء المعرف تلقائياً"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>النوع</InputLabel>
                <Select value={selectedPricing?.type || 'standard'} label="النوع">
                  <MenuItem value="standard">قياسي</MenuItem>
                  <MenuItem value="promotional">ترويجي</MenuItem>
                  <MenuItem value="customer-group">مجموعة عملاء</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="اسم القائمة"
                value={selectedPricing?.name || ''}
                size="small"
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="وصف القائمة"
                multiline
                rows={3}
                value={selectedPricing?.description || ''}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="تاريخ البداية"
                type="date"
                value={selectedPricing?.startDate || ''}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="تاريخ النهاية"
                type="date"
                value={selectedPricing?.endDate || ''}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الحالة</InputLabel>
                <Select value={selectedPricing?.status || 'active'} label="الحالة">
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="scheduled">مجدول</MenuItem>
                  <MenuItem value="inactive">غير نشط</MenuItem>
                  <MenuItem value="expired">منتهي الصلاحية</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>العملة</InputLabel>
                <Select value={selectedPricing?.currency || 'SAR'} label="العملة">
                  <MenuItem value="SAR">ريال سعودي</MenuItem>
                  <MenuItem value="USD">دولار أمريكي</MenuItem>
                  <MenuItem value="EUR">يورو</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="تفعيل التحديث التلقائي للأسعار"
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
                message: 'تم حفظ قائمة الأسعار بنجاح',
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
        <DialogTitle>تفاصيل قائمة الأسعار</DialogTitle>
        <DialogContent>
          {selectedPricing && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  معرف القائمة
                </Typography>
                <Typography variant="body1">{selectedPricing.listId}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  النوع
                </Typography>
                <Chip
                  label={getTypeText(selectedPricing.type)}
                  color={getTypeColor(selectedPricing.type)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الاسم
                </Typography>
                <Typography variant="body1">{selectedPricing.name}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الوصف
                </Typography>
                <Typography variant="body1">{selectedPricing.description}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  عدد المنتجات
                </Typography>
                <Typography variant="body1">
                  {selectedPricing.productsCount.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الحالة
                </Typography>
                <Chip
                  label={getStatusText(selectedPricing.status)}
                  color={getStatusColor(selectedPricing.status)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  العملة
                </Typography>
                <Typography variant="body1">{selectedPricing.currency}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  تاريخ البداية
                </Typography>
                <Typography variant="body1">{selectedPricing.startDate}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  تاريخ النهاية
                </Typography>
                <Typography variant="body1">{selectedPricing.endDate || 'غير محدد'}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  متوسط السعر
                </Typography>
                <Typography variant="body1" color="success.main">
                  {selectedPricing.avgPrice.toLocaleString()} {selectedPricing.currency}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  القيمة الإجمالية
                </Typography>
                <Typography variant="body1" color="primary.main">
                  {selectedPricing.totalValue.toLocaleString()} {selectedPricing.currency}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  آخر تحديث
                </Typography>
                <Typography variant="body1">{selectedPricing.lastUpdated}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDrawer(false)}>إغلاق</Button>
          <Button variant="contained" onClick={() => handleEdit(selectedPricing)}>
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

export default PricingLists;
