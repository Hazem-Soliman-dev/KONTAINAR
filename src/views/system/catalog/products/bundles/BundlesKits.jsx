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
  ListItemSecondaryAction,
} from '@mui/material';
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
  ShoppingCart as CartIcon,
  AttachMoney as PriceIcon,
  Analytics as AnalyticsIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
  GroupWork as BundleIcon,
  LocalOffer as OfferIcon,
  Percent as PercentIcon,
  AddShoppingCart as AddCartIcon,
  RemoveShoppingCart as RemoveCartIcon,
  Settings as SettingsIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

const BundlesKits = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  // Enhanced mock data with product bundles
  const bundlesData = [
    {
      id: 1,
      name: 'ايفون 15 برو كامل',
      type: 'حزمة',
      status: 'نشط',
      lastModified: '2024-01-15',
      author: 'مدير',
      priority: 'عالي',
      views: 1250,
      clicks: 89,
      price: 1299.99,
      originalPrice: 1499.99,
      savings: 200.0,
      stock: 45,
      items: [
        { name: 'ايفون 15 برو 128 جيجابايت', price: 999.99, quantity: 1 },
        { name: 'ايربودس برو 2nd Gen', price: 249.99, quantity: 1 },
        { name: 'ماج سيف كهربائي', price: 39.99, quantity: 1 },
        { name: 'كلير كايس', price: 49.99, quantity: 1 },
      ],
      featured: true,
      position: 1,
      description: 'ايفون 15 برو كامل مع الملحقات',
      tags: ['حزمة', 'ايفون', 'ملحقات'],
      discount: 13.3,
    },
    {
      id: 2,
      name: 'ماكبوك برو وركستاتيون كيت',
      type: 'مجموعة',
      status: 'نشط',
      lastModified: '2024-01-14',
      author: 'مدير',
      priority: 'عالي',
      views: 890,
      clicks: 67,
      price: 2499.99,
      originalPrice: 2899.99,
      savings: 400.0,
      stock: 12,
      items: [
        { name: 'ماكبوك برو M3 14 بوصة', price: 1999.99, quantity: 1 },
        { name: 'ماج سيف ماوس', price: 79.99, quantity: 1 },
        { name: 'ماج سيف لوحية', price: 99.99, quantity: 1 },
        { name: 'USB-C هاب', price: 89.99, quantity: 1 },
        { name: 'لابتوب استاند', price: 129.99, quantity: 1 },
      ],
      featured: true,
      position: 2,
      description: 'ماكبوك برو وركستاتيون كامل مع الملحقات',
      tags: ['مجموعة', 'ماكبوك', 'وركستاتيون'],
      discount: 13.8,
    },
    {
      id: 3,
      name: 'حزمة العب المجموعة',
      type: 'حزمة',
      status: 'مسودة',
      lastModified: '2024-01-13',
      author: 'مصمم',
      priority: 'متوسط',
      views: 0,
      clicks: 0,
      price: 899.99,
      originalPrice: 1099.99,
      savings: 200.0,
      stock: 0,
      items: [
        { name: 'لابتوب العاب', price: 799.99, quantity: 1 },
        { name: 'ماوس العاب', price: 79.99, quantity: 1 },
        { name: 'لوحية العاب', price: 99.99, quantity: 1 },
        { name: 'ماوس العاب', price: 119.99, quantity: 1 },
      ],
      featured: false,
      position: 3,
      description: 'حزمة العب المجموعة كامل مع الملحقات',
      tags: ['حزمة', 'العاب', 'مجموعة'],
      discount: 18.2,
    },
    {
      id: 4,
      name: 'العناصر الأساسية لتثبيت المكتب المنزلي',
      type: 'مجموعة',
      status: 'نشط',
      lastModified: '2024-01-12',
      author: 'مدير',
      priority: 'متوسط',
      views: 650,
      clicks: 23,
      price: 399.99,
      originalPrice: 499.99,
      savings: 100.0,
      stock: 25,
      items: [
        { name: 'شاشة 24 بوصة', price: 199.99, quantity: 1 },
        { name: 'ماوس بلوتوث', price: 29.99, quantity: 1 },
        { name: 'لوحية بلوتوث', price: 49.99, quantity: 1 },
        { name: 'لمبة مكتب', price: 39.99, quantity: 1 },
        { name: 'كابلات الإدارة', price: 19.99, quantity: 1 },
      ],
      featured: false,
      position: 4,
      description: 'العناصر الأساسية لتثبيت المكتب المنزلي',
      tags: ['مجموعة', 'مكتب', 'أساسية'],
      discount: 20.0,
    },
    {
      id: 5,
      name: 'حزمة التصوير المبتدئ',
      type: 'حزمة',
      status: 'مجدول',
      lastModified: '2024-01-11',
      author: 'مصمم',
      priority: 'متوسط',
      views: 0,
      clicks: 0,
      price: 599.99,
      originalPrice: 799.99,
      savings: 200.0,
      stock: 0,
      items: [
        { name: 'دي سي ال آي كاميرا', price: 399.99, quantity: 1 },
        { name: 'كاميرا باقة', price: 49.99, quantity: 1 },
        { name: 'كارت ذاكرة 64 جيجابايت', price: 29.99, quantity: 2 },
        { name: 'ميزان ثقل', price: 79.99, quantity: 1 },
        { name: 'مجموعة مسح العدسات', price: 19.99, quantity: 1 },
      ],
      featured: false,
      position: 5,
      description: 'حزمة التصوير المبتدئ كامل مع الملحقات',
      tags: ['حزمة', 'تصوير', 'مبتدئ'],
      discount: 25.0,
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
      setSelectedItems(bundlesData.map((item) => item.id));
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
      setSnackbar({ open: true, message: 'تم تحديث الحزمة بنجاح', severity: 'success' });
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'draft':
        return 'warning';
      case 'scheduled':
        return 'info';
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

  const getStockStatus = (stock) => {
    if (stock === 0) return { color: 'error', text: 'Out of Stock', icon: <WarningIcon /> };
    if (stock < 10) return { color: 'warning', text: 'Low Stock', icon: <WarningIcon /> };
    return { color: 'success', text: 'In Stock', icon: <CheckCircleIcon /> };
  };

  const filteredData = bundlesData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
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
              مدير الحزم والمجموعات
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إنشاء وإدارة حزم المنتجات والمجموعات والعروض الخاصة لزيادة المبيعات
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
              <Typography color="text.primary">الحزم والمجموعات</Typography>
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
              إنشاء حزمة
            </Button>
          </Stack>
        </Box>

        {/* Enhanced Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                background:
                  'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(25, 118, 210, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, mr: 2 }}>
                    <BundleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  {bundlesData.length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  إجمالي الحزم
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                background:
                  'linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(46, 125, 50, 0.05) 100%)',
                border: '1px solid rgba(46, 125, 50, 0.2)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(46, 125, 50, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar sx={{ bgcolor: 'success.main', width: 48, height: 48, mr: 2 }}>
                    <CheckCircleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                  {bundlesData.filter((item) => item.status === 'Active').length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  الحزم النشطة
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                background:
                  'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%)',
                border: '1px solid rgba(255, 152, 0, 0.2)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(255, 152, 0, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar sx={{ bgcolor: 'warning.main', width: 48, height: 48, mr: 2 }}>
                    <PercentIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  {Math.round(
                    bundlesData.reduce((sum, item) => sum + item.discount, 0) / bundlesData.length,
                  )}
                  %
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  متوسط الخصم
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                background:
                  'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(156, 39, 176, 0.05) 100%)',
                border: '1px solid rgba(156, 39, 176, 0.2)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(156, 39, 176, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48, mr: 2 }}>
                    <PriceIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                  {bundlesData.reduce((sum, item) => sum + item.savings, 0).toLocaleString()} ر.س
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  إجمالي التوفير
                </Typography>
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
              placeholder="البحث في الحزم والمجموعات أو المنتجات..."
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
              <InputLabel>النوع</InputLabel>
              <Select value="all" label="النوع" onChange={() => {}}>
                <MenuItem value="all">جميع الأنواع</MenuItem>
                <MenuItem value="bundle">حزمة</MenuItem>
                <MenuItem value="kit">مجموعة</MenuItem>
                <MenuItem value="offer">عرض خاص</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              تم العثور على {sortedData.length} حزمة
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Enhanced Content Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
          <Typography variant="h6" sx={{ flex: 1, fontWeight: 600 }}>
            حزم ومجموعات المنتجات
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
            <BundleIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              لم يتم العثور على حزم أو مجموعات
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              قم بإنشاء أول حزمة لزيادة المبيعات وقيمة العملاء
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
              إنشاء أول حزمة
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
                      تفاصيل الحزمة
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>العناصر</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'price'}
                      direction={sortBy === 'price' ? sortOrder : 'asc'}
                      onClick={() => handleSort('price')}
                    >
                      التسعير
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>التوفير</TableCell>
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
                            <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.light' }}>
                              <BundleIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" noWrap>
                                {item.type} • {item.items.length} items
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
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.items.length} items
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.items
                              .slice(0, 2)
                              .map((item, index) => item.name)
                              .join(', ')}
                            {item.items.length > 2 && ` +${item.items.length - 2} more`}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 600, color: 'success.main' }}
                            >
                              {item.price.toFixed(2)} ر.س
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                            >
                              {item.originalPrice.toFixed(2)} ر.س
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Chip
                              label={`${item.discount}% OFF`}
                              size="small"
                              color="success"
                              icon={<PercentIcon />}
                            />
                            <Typography
                              variant="body2"
                              color="success.main"
                              sx={{ fontWeight: 500 }}
                            >
                              وفر {item.savings.toFixed(2)} ر.س
                            </Typography>
                          </Box>
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
                            <Tooltip title="تعديل الحزمة" arrow>
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
              <Typography variant="h6">Create Product Bundle</Typography>
              <Typography variant="body2" color="text.secondary">
                Create a new bundle or kit to increase sales and customer value
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
            <Tab label="Basic Info" />
            <Tab label="Products" />
            <Tab label="Pricing" />
            <Tab label="Settings" />
          </Tabs>

          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Bundle Name"
                  placeholder="e.g., iPhone 15 Pro Complete Bundle"
                  helperText="This will be displayed to customers"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Bundle Type</InputLabel>
                  <Select label="Bundle Type">
                    <MenuItem value="bundle">Bundle</MenuItem>
                    <MenuItem value="kit">Kit</MenuItem>
                    <MenuItem value="offer">Special Offer</MenuItem>
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
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  placeholder="Describe this bundle..."
                  helperText="This helps customers understand the value of this bundle"
                />
              </Grid>
            </Grid>
          )}

          {tabValue === 1 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Bundle Products
                </Typography>
                <Paper sx={{ p: 2, border: '1px dashed #ccc' }}>
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <AddCartIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Add Products to Bundle
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Search and select products to include in this bundle
                    </Typography>
                    <Button variant="outlined" startIcon={<AddIcon />}>
                      Add Products
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}

          {tabValue === 2 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Bundle Price"
                  placeholder="1299.99"
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Original Price"
                  placeholder="1499.99"
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Discount Percentage"
                  placeholder="13.3"
                  InputProps={{
                    endAdornment: <Typography sx={{ ml: 1 }}>%</Typography>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Savings Amount"
                  placeholder="200.00"
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  }}
                />
              </Grid>
            </Grid>
          )}

          {tabValue === 3 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth type="number" label="Stock Quantity" placeholder="100" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth type="number" label="Low Stock Threshold" placeholder="10" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Stack direction="row" spacing={2}>
                  <FormControlLabel control={<Switch />} label="Featured Bundle" />
                  <FormControlLabel control={<Switch />} label="Show on Homepage" />
                  <FormControlLabel control={<Switch />} label="Allow Individual Purchase" />
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button variant="outlined" startIcon={<SaveIcon />} onClick={() => handleSave()}>
            Save Draft
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            startIcon={loading ? <LinearProgress size={20} /> : <PublicIcon />}
          >
            {loading ? 'Saving...' : 'Save & Activate'}
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
              <Typography variant="h6">تفاصيل الحزمة</Typography>
              <Typography variant="body2" color="text.secondary">
                عرض جميع تفاصيل الحزمة المحددة
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
                      اسم الحزمة:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      iPhone 15 Pro Complete Bundle
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      نوع الحزمة:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Bundle
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      الحالة:
                    </Typography>
                    <Chip label="نشط" color="success" size="small" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      عدد العناصر:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      4 عناصر
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  التسعير والتوفير
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      سعر الحزمة:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                      1299.99 ر.س
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      السعر الأصلي:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                    >
                      1499.99 ر.س
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      نسبة الخصم:
                    </Typography>
                    <Chip label="13.3% OFF" color="success" size="small" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      المبلغ الموفّر:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: 'success.main' }}>
                      200.00 ر.س
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  عناصر الحزمة
                </Typography>
                <List>
                  {[
                    { name: 'iPhone 15 Pro 128GB', price: '999.99 ر.س', quantity: 1 },
                    { name: 'AirPods Pro 2nd Gen', price: '249.99 ر.س', quantity: 1 },
                    { name: 'MagSafe Charger', price: '39.99 ر.س', quantity: 1 },
                    { name: 'Clear Case', price: '49.99 ر.س', quantity: 1 },
                  ].map((item, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32 }}>
                          <InventoryIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <MuiListItemText
                        primary={item.name}
                        secondary={`${item.price} × ${item.quantity}`}
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {item.price}
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  المخزون والأداء
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 3 }}>
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
                  Complete iPhone 15 Pro setup with accessories
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  العلامات:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {['bundle', 'iphone', 'accessories'].map((tag, index) => (
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
            تعديل الحزمة
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
          <ListItemText>تعديل الحزمة</ListItemText>
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

export default BundlesKits;
