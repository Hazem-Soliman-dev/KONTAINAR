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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText as MuiListItemText,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  DeleteOutline as DeleteIcon,
  VisibilityOutlined as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  ContentCopy as CopyIcon,
  Refresh as RefreshIcon,
  Restore as RestoreIcon,
  DeleteForever as DeleteForeverIcon,
  Archive as ArchiveIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

const DeletedProducts = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRestoreDialog, setOpenRestoreDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('deletedDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  // Enhanced mock data with deleted products
  const deletedProductsData = [
    {
      id: 1,
      name: 'ايفون 14 برو ماكس 256 جيجابايت',
      sku: 'IPH14PM-256',
      status: 'محذوف',
      deletedDate: '2024-01-15',
      deletedBy: 'مدير',
      reason: 'توقف المنتج',
      priority: 'عالي',
      views: 1250,
      clicks: 89,
      price: 1099.99,
      stock: 0,
      originalStock: 45,
      category: 'الهواتف الذكية',
      brand: 'آبل',
      tags: ['هاتف ذكي', 'آبل', 'متوقف'],
      featured: true,
      position: 1,
      description: 'ايفون الجيل السابق مع نظام الكاميرا المتقدم',
      lastModified: '2024-01-10',
      canRestore: true,
      restoreDate: null,
      deletionType: 'حذف مؤقت',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23 Ultra 512GB',
      sku: 'SGS23U-512',
      status: 'محذوف',
      deletedDate: '2024-01-14',
      deletedBy: 'مصمم',
      reason: 'أداء منخفض',
      priority: 'متوسط',
      views: 890,
      clicks: 67,
      price: 1199.99,
      stock: 0,
      originalStock: 32,
      category: 'الهواتف الذكية',
      brand: 'سامسونج',
      tags: ['هاتف ذكي', 'سامسونج', 'أداء منخفض'],
      featured: false,
      position: 2,
      description: 'سامسونج الرائد مع S Pen ونظام الكاميرا المتقدم',
      lastModified: '2024-01-08',
      canRestore: true,
      restoreDate: null,
      deletionType: 'حذف مؤقت',
    },
    {
      id: 3,
      name: 'ماك بوك برو M2 16" 1TB',
      sku: 'MBP-M2-16-1TB',
      status: 'محذوف',
      deletedDate: '2024-01-13',
      deletedBy: 'مدير',
      reason: 'تم استبدال بـ M3',
      priority: 'عالي',
      views: 650,
      clicks: 23,
      price: 2499.99,
      stock: 0,
      originalStock: 12,
      category: 'اللابتوبات',
      brand: 'آبل',
      tags: ['لابتوب', 'آبل', 'ماك بوك', 'مستبدل'],
      featured: true,
      position: 3,
      description: 'الجيل السابق من MacBook Pro مع معالج M2',
      lastModified: '2024-01-05',
      canRestore: false,
      restoreDate: null,
      deletionType: 'حذف نهائي',
    },
    {
      id: 4,
      name: 'ديل XPS 13 بلس 1 طن',
      sku: 'DXP13P-1TB',
      status: 'محذوف',
      deletedDate: '2024-01-12',
      deletedBy: 'مصمم',
      reason: 'مشاكل الجودة',
      priority: 'متوسط',
      views: 420,
      clicks: 15,
      price: 1599.99,
      stock: 0,
      originalStock: 8,
      category: 'اللابتوبات',
      brand: 'ديل',
      tags: ['لابتوب', 'ديل', 'مشاكل الجودة'],
      featured: false,
      position: 4,
      description: 'لابتوب سماك جدا مع نمط عالي الجودة والأداء',
      lastModified: '2024-01-03',
      canRestore: true,
      restoreDate: null,
      deletionType: 'حذف مؤقت',
    },
    {
      id: 5,
      name: 'سوني WH-1000XM4 سماعات',
      sku: 'SNY-WH1000XM4',
      status: 'محذوف',
      deletedDate: '2024-01-11',
      deletedBy: 'مدير',
      reason: 'تم استبدال بـ XM5',
      priority: 'منخفط',
      views: 320,
      clicks: 12,
      price: 349.99,
      stock: 0,
      originalStock: 25,
      category: 'الصوتيات',
      brand: 'سوني',
      tags: ['سماعات', 'سوني', 'مستبدل'],
      featured: false,
      position: 5,
      description: 'الجيل السابق من سماعات الإلغاء الضوضاء',
      lastModified: '2024-01-01',
      canRestore: true,
      restoreDate: null,
      deletionType: 'حذف مؤقت',
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
      setSelectedItems(deletedProductsData.map((item) => item.id));
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

  const handleRestore = (product) => {
    setSelectedProduct(product);
    setOpenRestoreDialog(true);
  };

  const handlePermanentDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      setSnackbar({ open: true, message: 'تم استعادة المنتج بنجاح', severity: 'success' });
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'deleted':
        return 'error';
      case 'restored':
        return 'success';
      case 'archived':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
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

  const getDeletionTypeColor = (deletionType) => {
    switch (deletionType.toLowerCase()) {
      case 'soft delete':
        return 'warning';
      case 'hard delete':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredData = deletedProductsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <Box sx={{ p: 3 }}>
      {/* Enhanced Header with Stats */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              المنتجات المحذوفة
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة المنتجات المحذوفة، استعادة العناصر، أو حذفها نهائياً
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
              <Typography color="text.primary">المنتجات المحذوفة</Typography>
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
                  theme.palette.error.main,
                  0.08,
                )} 0%, ${alpha(theme.palette.error.main, 0.04)} 100%)`,
                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
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
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        color: theme.palette.error.main,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                      }}
                    >
                      <DeleteIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {deletedProductsData.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      المنتجات المحذوفة
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
                      <RestoreIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {deletedProductsData.filter((item) => item.canRestore).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      يمكن الاستعادة
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
                      <ArchiveIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {
                        deletedProductsData.filter((item) => item.deletionType === 'Soft Delete')
                          .length
                      }
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      محذوف مؤقتاً
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
                      <HistoryIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {deletedProductsData
                        .reduce((sum, item) => sum + item.views, 0)
                        .toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      إجمالي المشاهدات
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
              placeholder="البحث في المنتجات المحذوفة، الرموز، أو الأسباب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>نوع الحذف</InputLabel>
              <Select
                value={statusFilter}
                label="نوع الحذف"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الأنواع</MenuItem>
                <MenuItem value="soft delete">حذف مؤقت</MenuItem>
                <MenuItem value="hard delete">حذف نهائي</MenuItem>
                <MenuItem value="archived">مؤرشف</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>يمكن الاستعادة</InputLabel>
              <Select value="all" label="يمكن الاستعادة" onChange={() => {}}>
                <MenuItem value="all">جميع المنتجات</MenuItem>
                <MenuItem value="yes">يمكن الاستعادة</MenuItem>
                <MenuItem value="no">لا يمكن الاستعادة</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              تم العثور على {sortedData.length} منتج
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Enhanced Content Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
          <Typography variant="h6" sx={{ flex: 1, fontWeight: 600 }}>
            المنتجات المحذوفة
          </Typography>
          {selectedItems.length > 0 && (
            <Fade in={selectedItems.length > 0}>
              <Box sx={{ mr: 2, display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  startIcon={<RestoreIcon />}
                  onClick={() => handleBulkAction('استعادة')}
                >
                  استعادة ({selectedItems.length})
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteForeverIcon />}
                  onClick={() => handleBulkAction('حذف نهائي')}
                >
                  حذف نهائي ({selectedItems.length})
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
            <Button
              variant="contained"
              color="success"
              startIcon={<RestoreIcon />}
              onClick={() => setOpenRestoreDialog(true)}
            >
              استعادة جماعية
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
            <DeleteIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              لم يتم العثور على منتجات محذوفة
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              ستظهر المنتجات المحذوفة هنا للإدارة والاستعادة
            </Typography>
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
                      تفاصيل المنتج
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>معلومات الحذف</TableCell>
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
                      active={sortBy === 'deletedDate'}
                      direction={sortBy === 'deletedDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('deletedDate')}
                    >
                      تاريخ الحذف
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>الأداء</TableCell>
                  <TableCell align="right">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
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
                              SKU: {item.sku} • {item.category}
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Chip
                            label={item.deletionType}
                            size="small"
                            color={getDeletionTypeColor(item.deletionType)}
                            icon={<DeleteIcon />}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {item.reason}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            by {item.deletedBy}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                          {item.price.toFixed(2)} ر.س
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: 'error.main' }}>
                            0 وحدة
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            (كان {item.originalStock})
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.deletedDate}</Typography>
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
                          {item.canRestore && (
                            <Tooltip title="استعادة المنتج" arrow>
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => handleRestore(item)}
                              >
                                <RestoreIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="المزيد من الإجراءات" arrow>
                            <IconButton size="small" onClick={(e) => handleMenuClick(e, item)}>
                              <MoreVertIcon />
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
              sx={{ borderTop: 1, borderColor: 'divider' }}
            />
          </>
        )}
      </Paper>

      {/* Restore Dialog */}
      <Dialog
        open={openRestoreDialog}
        onClose={() => setOpenRestoreDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'success.main' }}>
              <RestoreIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">Restore Product</Typography>
              <Typography variant="body2" color="text.secondary">
                Restore this product to your catalog
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                This will restore the product to your main catalog. All product data, pricing, and
                inventory will be restored.
              </Alert>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Restore Reason"
                placeholder="Why are you restoring this product?"
                multiline
                rows={3}
                helperText="Optional reason for restoring this product"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Restore to Category</InputLabel>
                <Select label="Restore to Category">
                  <MenuItem value="smartphones">Smartphones</MenuItem>
                  <MenuItem value="laptops">Laptops</MenuItem>
                  <MenuItem value="audio">Audio</MenuItem>
                  <MenuItem value="accessories">Accessories</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select label="Status">
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Stack direction="row" spacing={2}>
                <FormControlLabel control={<Switch defaultChecked />} label="Restore Inventory" />
                <FormControlLabel control={<Switch defaultChecked />} label="Restore Pricing" />
                <FormControlLabel control={<Switch defaultChecked />} label="Restore Images" />
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setOpenRestoreDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSave}
            disabled={loading}
            startIcon={loading ? <LinearProgress size={20} /> : <RestoreIcon />}
          >
            {loading ? 'Restoring...' : 'Restore Product'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Permanent Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'error.main' }}>
              <DeleteForeverIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">Permanent Delete</Typography>
              <Typography variant="body2" color="text.secondary">
                This action cannot be undone
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Warning: Permanent Deletion
            </Typography>
            <Typography variant="body2">
              This will permanently delete the product and all associated data. This action cannot
              be undone.
            </Typography>
          </Alert>
          <TextField
            fullWidth
            label="Confirmation"
            placeholder="Type 'DELETE' to confirm"
            helperText="Type DELETE to confirm permanent deletion"
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setOpenDeleteDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleSave}
            disabled={loading}
            startIcon={loading ? <LinearProgress size={20} /> : <DeleteForeverIcon />}
          >
            {loading ? 'Deleting...' : 'Delete Forever'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'info.main' }}>
              <ViewIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">تفاصيل المنتج المحذوف</Typography>
              <Typography variant="body2" color="text.secondary">
                عرض جميع تفاصيل المنتج المحذوف
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Card sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  معلومات المنتج الأساسية
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      اسم المنتج:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      ايفون 14 برو ماكس 256 جيجابايت
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      رمز المنتج:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      IPH14PM-256
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      الفئة:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      الهواتف الذكية
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      الماركة:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      آبل
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  معلومات الحذف
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      تاريخ الحذف:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      2024-01-15
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      تم الحذف بواسطة:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      مدير
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      سبب الحذف:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      توقف المنتج
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      نوع الحذف:
                    </Typography>
                    <Chip label="حذف مؤقت" color="warning" size="small" />
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  معلومات التسعير والمخزون
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      السعر:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                      1099.99 ر.س
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      المخزون الحالي:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: 'error.main' }}>
                      0 وحدة
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      المخزون الأصلي:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      45 وحدة
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      يمكن الاستعادة:
                    </Typography>
                    <Chip label="نعم" color="success" size="small" />
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  إحصائيات الأداء
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      المشاهدات:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      1,250
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      النقرات:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                      89
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      آخر تعديل:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      2024-01-10
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      الأولوية:
                    </Typography>
                    <Chip label="عالي" color="error" size="small" />
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
                  ايفون 14 برو ماكس 256 جيجابايت مع نظام الكاميرا المتقدم
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  العلامات:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {['هاتف ذكي', 'آبل', 'متوقف'].map((tag, index) => (
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
          <Button variant="contained" color="success" startIcon={<RestoreIcon />}>
            استعادة المنتج
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
        {selectedItem?.canRestore && (
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <RestoreIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>استعادة المنتج</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <CopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>نسخ</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>عرض السجل</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>حذف نهائي</ListItemText>
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

export default DeletedProducts;
