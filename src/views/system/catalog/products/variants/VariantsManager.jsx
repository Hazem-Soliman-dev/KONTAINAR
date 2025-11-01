import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Breadcrumbs,
  Link,
  Toolbar,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
  Stack,
  Checkbox,
  TableSortLabel,
  LinearProgress,
  Avatar,
  Badge,
  Fade,
  Zoom,
  Menu,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Autocomplete,
  Tabs,
  Tab,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Add as AddIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  VisibilityOutlined as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Save as SaveIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  MoreVert as MoreVertIcon,
  DragIndicator as DragIcon,
  Visibility as VisibilityIcon,
  Schedule as ScheduleIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  ContentCopy as CopyIcon,
  Share as ShareIcon,
  Inventory as InventoryIcon,
  ColorLens as ColorLensIcon,
  Straighten as SizeIcon,
  Memory as MemoryIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  AttachMoney as PriceIcon,
  ShoppingCart as CartIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const VariantsManager = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [openViewDialog, setOpenViewDialog] = useState(false);

  // Enhanced mock data with product variants
  const variantsData = [
    {
      id: 1,
      name: 'iPhone 15 Pro - أسود فضائي - 128 جيجابايت',
      productName: 'iPhone 15 Pro',
      sku: 'IPH15P-SB-128',
      status: 'نشط',
      lastModified: '2024-01-15',
      author: 'مدير',
      priority: 'عالي',
      views: 1250,
      clicks: 89,
      price: 999.99,
      stock: 45,
      attributes: {
        color: 'أسود فضائي',
        storage: '128 جيجابايت',
        size: '6.1 بوصة',
      },
      images: 3,
      featured: true,
      position: 1,
      description: 'أحدث iPhone مع نظام كاميرا متقدم',
      tags: ['هاتف ذكي', 'أبل', 'مميز'],
    },
    {
      id: 2,
      name: 'iPhone 15 Pro - تيتانيوم طبيعي - 256 جيجابايت',
      productName: 'iPhone 15 Pro',
      sku: 'IPH15P-NT-256',
      status: 'نشط',
      lastModified: '2024-01-14',
      author: 'مدير',
      priority: 'عالي',
      views: 890,
      clicks: 67,
      price: 1099.99,
      stock: 32,
      attributes: {
        color: 'تيتانيوم طبيعي',
        storage: '256 جيجابايت',
        size: '6.1 بوصة',
      },
      images: 3,
      featured: true,
      position: 2,
      description: 'أحدث iPhone مع نظام كاميرا متقدم',
      tags: ['هاتف ذكي', 'أبل', 'مميز'],
    },
    {
      id: 3,
      name: 'Samsung Galaxy S24 - أسود شبح - 128 جيجابايت',
      productName: 'Samsung Galaxy S24',
      sku: 'SGS24-PB-128',
      status: 'مسودة',
      lastModified: '2024-01-13',
      author: 'محرر',
      priority: 'متوسط',
      views: 0,
      clicks: 0,
      price: 799.99,
      stock: 0,
      attributes: {
        color: 'أسود شبح',
        storage: '128 جيجابايت',
        size: '6.2 بوصة',
      },
      images: 2,
      featured: false,
      position: 3,
      description: 'هاتف Samsung الرائد مع ميزات الذكاء الاصطناعي',
      tags: ['هاتف ذكي', 'سامسونج', 'أندرويد'],
    },
    {
      id: 4,
      name: 'MacBook Air M3 - منتصف الليل - 8 جيجابايت/256 جيجابايت',
      productName: 'MacBook Air M3',
      sku: 'MBA-M3-MD-8-256',
      status: 'نشط',
      lastModified: '2024-01-12',
      author: 'مدير',
      priority: 'عالي',
      views: 650,
      clicks: 23,
      price: 1199.99,
      stock: 12,
      attributes: {
        color: 'منتصف الليل',
        memory: '8 جيجابايت',
        storage: '256 جيجابايت',
        size: '13 بوصة',
      },
      images: 4,
      featured: true,
      position: 4,
      description: 'لابتوب فائق النحافة مع معالج M3',
      tags: ['لابتوب', 'أبل', 'ماك بوك'],
    },
    {
      id: 5,
      name: 'MacBook Air M3 - ضوء النجوم - 16 جيجابايت/512 جيجابايت',
      productName: 'MacBook Air M3',
      sku: 'MBA-M3-SL-16-512',
      status: 'مجدول',
      lastModified: '2024-01-11',
      author: 'محرر',
      priority: 'متوسط',
      views: 0,
      clicks: 0,
      price: 1499.99,
      stock: 0,
      attributes: {
        color: 'ضوء النجوم',
        memory: '16 جيجابايت',
        storage: '512 جيجابايت',
        size: '13 بوصة',
      },
      images: 4,
      featured: false,
      position: 5,
      description: 'لابتوب فائق النحافة مع معالج M3',
      tags: ['لابتوب', 'أبل', 'ماك بوك'],
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(variantsData.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId],
    );
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    setLoading(false);
    setSnackbar({ open: true, message: 'تم تحديث البيانات بنجاح', severity: 'success' });
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for items:`, selectedItems);
    setSnackbar({
      open: true,
      message: `تم ${action} لـ ${selectedItems.length} عنصر`,
      severity: 'success',
    });
    setSelectedItems([]);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      setSnackbar({ open: true, message: 'تم تحديث المتغير بنجاح', severity: 'success' });
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'نشط':
        return 'success';
      case 'draft':
      case 'مسودة':
        return 'warning';
      case 'scheduled':
      case 'مجدول':
        return 'info';
      case 'archived':
      case 'مؤرشف':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
      case 'عالي':
        return 'error';
      case 'medium':
      case 'متوسط':
        return 'warning';
      case 'low':
      case 'منخفض':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { color: 'error', text: 'نفد من المخزون', icon: <WarningIcon /> };
    if (stock < 10) return { color: 'warning', text: 'مخزون منخفض', icon: <WarningIcon /> };
    return { color: 'success', text: 'متوفر', icon: <CheckCircleIcon /> };
  };

  const filteredData = variantsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(item.attributes).some((attr) =>
        attr.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesStatus =
      statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const sortedData = [...filteredData].sort((a, b) => {
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

  const renderAttributes = (attributes) => {
    return Object.entries(attributes).map(([key, value]) => (
      <Chip
        key={key}
        label={`${key}: ${value}`}
        size="small"
        variant="outlined"
        sx={{ mr: 0.5, mb: 0.5 }}
      />
    ));
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
              مدير متغيرات المنتجات
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة متغيرات المنتجات، الخصائص، التسعير، والمخزون لجميع المنتجات
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
              <Link color="inherit" href="/main-store/catalog">
                الكتالوج
              </Link>
              <Link color="inherit" href="/main-store/catalog/products">
                المنتجات
              </Link>
              <Typography color="text.primary">مدير المتغيرات</Typography>
            </Breadcrumbs>
          </Box>
        </Box>

        {/* Enhanced Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                flexDirection: 'row',
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.main,
                  0.08,
                )} 0%, ${alpha(theme.palette.primary.main, 0.04)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                transition: 'all .3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  width="180px"
                  height="90px"
                  margin="auto"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    width="60px"
                    height="60px"
                    margin="auto"
                    flexDirection="column"
                    justifyContent="center"
                    mb={2}
                  >
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                      }}
                    >
                      <InventoryIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {variantsData.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      إجمالي المتغيرات
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                flexDirection: 'row',
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.success.main,
                  0.08,
                )} 0%, ${alpha(theme.palette.success.main, 0.04)} 100%)`,
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                transition: 'all .3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  width="180px"
                  height="90px"
                  margin="auto"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    width="60px"
                    height="60px"
                    margin="auto"
                    flexDirection="column"
                    justifyContent="center"
                    mb={2}
                  >
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        color: theme.palette.success.main,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                      }}
                    >
                      <CheckCircleIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {variantsData.filter((item) => item.status === 'Active').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      المتغيرات النشطة
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                flexDirection: 'row',
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.warning.main,
                  0.08,
                )} 0%, ${alpha(theme.palette.warning.main, 0.04)} 100%)`,
                border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                transition: 'all .3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  width="180px"
                  height="90px"
                  margin="auto"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    width="60px"
                    height="60px"
                    margin="auto"
                    flexDirection="column"
                    justifyContent="center"
                    mb={2}
                  >
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                        color: theme.palette.warning.main,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                      }}
                    >
                      <WarningIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {variantsData.filter((item) => item.stock < 10).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      مخزون منخفض
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                flexDirection: 'row',
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.secondary.main,
                  0.08,
                )} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 100%)`,
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                transition: 'all .3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  width="180px"
                  height="90px"
                  margin="auto"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    width="60px"
                    height="60px"
                    margin="auto"
                    flexDirection="column"
                    justifyContent="center"
                    mb={2}
                  >
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.secondary.main, 0.1),
                        color: theme.palette.secondary.main,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                      }}
                    >
                      <PriceIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {variantsData.reduce((sum, item) => sum + item.price, 0).toLocaleString()} ر.س
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      القيمة الإجمالية
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Enhanced Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            الفلاتر والبحث
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FilterIcon />}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
            >
              مسح الفلاتر
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="البحث في المتغيرات، الرموز، أو الخصائص..."
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
                value={statusFilter}
                label="الحالة"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                <MenuItem value="active">نشط</MenuItem>
                <MenuItem value="draft">مسودة</MenuItem>
                <MenuItem value="scheduled">مجدول</MenuItem>
                <MenuItem value="archived">مؤرشف</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>حالة المخزون</InputLabel>
              <Select value="all" label="حالة المخزون" onChange={() => {}}>
                <MenuItem value="all">جميع المخزون</MenuItem>
                <MenuItem value="in-stock">متوفر</MenuItem>
                <MenuItem value="low-stock">مخزون منخفض</MenuItem>
                <MenuItem value="out-of-stock">نفد من المخزون</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              تم العثور على {sortedData.length} متغير
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Enhanced Content Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
          <Typography variant="h6" sx={{ flex: 1, fontWeight: 600 }}>
            متغيرات المنتجات
          </Typography>
          {selectedItems.length > 0 && (
            <Fade in={selectedItems.length > 0}>
              <Box sx={{ mr: 2, display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<PublicIcon />}
                  onClick={() => handleBulkAction('تفعيل')}
                >
                  تفعيل ({selectedItems.length})
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleBulkAction('حذف')}
                >
                  حذف ({selectedItems.length})
                </Button>
              </Box>
            </Fade>
          )}
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
              إضافة متغير
            </Button>
          </Stack>
        </Toolbar>

        {loading ? (
          <Box sx={{ p: 3 }}>
            <LinearProgress sx={{ mb: 2 }} />
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} height={80} sx={{ mb: 2, borderRadius: 1 }} />
            ))}
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <InventoryIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              لم يتم العثور على متغيرات منتجات
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              قم بإنشاء أول متغير منتج للبدء
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
              إضافة أول متغير
            </Button>
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
                      active={sortBy === 'name'}
                      direction={sortBy === 'name' ? sortOrder : 'asc'}
                      onClick={() => handleSort('name')}
                    >
                      تفاصيل المتغير
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>الخصائص</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'price'}
                      direction={sortBy === 'price' ? sortOrder : 'asc'}
                      onClick={() => handleSort('price')}
                    >
                      السعر
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>المخزون</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'status'}
                      direction={sortBy === 'status' ? sortOrder : 'asc'}
                      onClick={() => handleSort('status')}
                    >
                      الحالة
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>الأداء</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'lastModified'}
                      direction={sortBy === 'lastModified' ? sortOrder : 'asc'}
                      onClick={() => handleSort('lastModified')}
                    >
                      آخر تعديل
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    const stockStatus = getStockStatus(item.stock);
                    return (
                      <TableRow
                        key={item.id}
                        hover
                        sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" noWrap>
                                {item.productName} • SKU: {item.sku}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                                {item.tags.slice(0, 2).map((tag, index) => (
                                  <Chip key={index} label={tag} size="small" variant="outlined" />
                                ))}
                                {item.tags.length > 2 && (
                                  <Chip
                                    label={`+${item.tags.length - 2}`}
                                    size="small"
                                    variant="outlined"
                                  />
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {renderAttributes(item.attributes)}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                            {item.price.toFixed(2)} ر.س
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={stockStatus.text}
                              size="small"
                              color={stockStatus.color}
                              icon={stockStatus.icon}
                            />
                            <Typography variant="body2" color="text.secondary">
                              ({item.stock})
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={item.status}
                            size="small"
                            color={getStatusColor(item.status)}
                            icon={
                              item.status === 'Active' ? (
                                <PublicIcon />
                              ) : item.status === 'Draft' ? (
                                <LockIcon />
                              ) : item.status === 'Scheduled' ? (
                                <ScheduleIcon />
                              ) : (
                                <VisibilityIcon />
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Typography
                              variant="body2"
                              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                            >
                              <VisibilityIcon fontSize="small" />
                              {item.views.toLocaleString()}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                            >
                              <TrendingUpIcon fontSize="small" />
                              {item.clicks}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{item.lastModified}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                            <Tooltip title="عرض التفاصيل" arrow>
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => setOpenViewDialog(true)}
                              >
                                <ViewIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="تعديل المتغير" arrow>
                              <IconButton size="small" color="primary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="المزيد من الإجراءات" arrow>
                              <IconButton size="small" onClick={(e) => handleMenuClick(e, item)}>
                                <MoreVertIcon />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
              sx={{ borderTop: 1, borderColor: 'divider' }}
            />
          </>
        )}
      </Paper>

      {/* Enhanced Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <AddIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">إضافة متغير منتج</Typography>
              <Typography variant="body2" color="text.secondary">
                إنشاء متغير جديد لمنتج موجود
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
            <Tab label="المعلومات الأساسية" />
            <Tab label="الخصائص" />
            <Tab label="التسعير" />
            <Tab label="المخزون" />
          </Tabs>

          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="اسم المتغير"
                  placeholder="مثال: iPhone 15 Pro - Space Black - 128GB"
                  helperText="سيتم عرض هذا للعملاء"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>المنتج الأساسي</InputLabel>
                  <Select label="المنتج الأساسي">
                    <MenuItem value="iphone15">iPhone 15 Pro</MenuItem>
                    <MenuItem value="samsung-s24">Samsung Galaxy S24</MenuItem>
                    <MenuItem value="macbook-air">MacBook Air M3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="الرمز"
                  placeholder="مثال: IPH15P-SB-128"
                  helperText="معرف فريد لهذا المتغير"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="الوصف"
                  placeholder="وصف هذا المتغير..."
                  helperText="وصف اختياري لهذا المتغير المحدد"
                />
              </Grid>
            </Grid>
          )}

          {tabValue === 1 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>اللون</InputLabel>
                  <Select label="اللون">
                    <MenuItem value="space-black">أسود فضائي</MenuItem>
                    <MenuItem value="natural-titanium">تيتانيوم طبيعي</MenuItem>
                    <MenuItem value="white">أبيض</MenuItem>
                    <MenuItem value="blue">أزرق</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>التخزين</InputLabel>
                  <Select label="التخزين">
                    <MenuItem value="128gb">128 جيجابايت</MenuItem>
                    <MenuItem value="256gb">256 جيجابايت</MenuItem>
                    <MenuItem value="512gb">512 جيجابايت</MenuItem>
                    <MenuItem value="1tb">1 تيرابايت</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>الذاكرة</InputLabel>
                  <Select label="الذاكرة">
                    <MenuItem value="8gb">8 جيجابايت</MenuItem>
                    <MenuItem value="16gb">16 جيجابايت</MenuItem>
                    <MenuItem value="32gb">32 جيجابايت</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>الحجم</InputLabel>
                  <Select label="الحجم">
                    <MenuItem value="13-inch">13 بوصة</MenuItem>
                    <MenuItem value="15-inch">15 بوصة</MenuItem>
                    <MenuItem value="6.1-inch">6.1 بوصة</MenuItem>
                    <MenuItem value="6.2-inch">6.2 بوصة</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {tabValue === 2 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="السعر"
                  placeholder="999.99"
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>ر.س</Typography>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="سعر المقارنة"
                  placeholder="1199.99"
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>ر.س</Typography>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="سعر التكلفة"
                  placeholder="600.00"
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>ر.س</Typography>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>فئة الضريبة</InputLabel>
                  <Select label="فئة الضريبة">
                    <MenuItem value="standard">ضريبة عادية</MenuItem>
                    <MenuItem value="reduced">ضريبة مخفضة</MenuItem>
                    <MenuItem value="exempt">معفى من الضريبة</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {tabValue === 3 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth type="number" label="كمية المخزون" placeholder="100" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth type="number" label="حد المخزون المنخفض" placeholder="10" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>تتبع المخزون</InputLabel>
                  <Select label="تتبع المخزون">
                    <MenuItem value="yes">نعم</MenuItem>
                    <MenuItem value="no">لا</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>السماح بالطلبات المؤجلة</InputLabel>
                  <Select label="السماح بالطلبات المؤجلة">
                    <MenuItem value="no">لا</MenuItem>
                    <MenuItem value="yes">نعم</MenuItem>
                    <MenuItem value="notify">إشعار فقط</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            إلغاء
          </Button>
          <Button variant="outlined" startIcon={<SaveIcon />} onClick={() => handleSave()}>
            حفظ كمسودة
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            startIcon={loading ? <LinearProgress size={20} /> : <PublicIcon />}
          >
            {loading ? 'جاري الحفظ...' : 'حفظ وتفعيل'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'info.main' }}>
              <ViewIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">تفاصيل المتغير</Typography>
              <Typography variant="body2" color="text.secondary">
                عرض جميع تفاصيل المتغير المحدد
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Card sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  المعلومات الأساسية
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      اسم المتغير:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      iPhone 15 Pro - أسود فضائي - 128 جيجابايت
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      المنتج الأساسي:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      iPhone 15 Pro
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      الرمز (SKU):
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      IPH15P-SB-128
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      الحالة:
                    </Typography>
                    <Chip label="نشط" color="success" size="small" />
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  الخصائص
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      اللون:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      أسود فضائي
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      التخزين:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      128 جيجابايت
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      الحجم:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      6.1 بوصة
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      الذاكرة:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      8 جيجابايت
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  التسعير والمخزون
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      السعر:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                      999.99 ر.س
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      سعر المقارنة:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      1199.99 ر.س
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      المخزون:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip label="متوفر" color="success" size="small" />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        (45)
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  الأداء والإحصائيات
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      المشاهدات:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      1,250
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      النقرات:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      89
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      آخر تعديل:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      2024-01-15
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      المؤلف:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      مدير
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  الوصف والعلامات
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  الوصف:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  أحدث iPhone مع نظام كاميرا متقدم
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  العلامات:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {['هاتف ذكي', 'أبل', 'مميز'].map((tag, index) => (
                    <Chip key={index} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setOpenViewDialog(false)} variant="outlined">
            إغلاق
          </Button>
          <Button variant="contained" startIcon={<EditIcon />}>
            تعديل المتغير
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            setOpenViewDialog(true);
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>عرض التفاصيل</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>تعديل المتغير</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <CopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>نسخ</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>مشاركة</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>حذف</ListItemText>
        </MenuItem>
      </Menu>

      {/* Enhanced Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VariantsManager;
