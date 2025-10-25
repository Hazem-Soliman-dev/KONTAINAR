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
  Fade,
  Menu,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
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
  CheckCircle as CheckCircleIcon,
  Publish as PublishIcon,
  Store as StoreIcon,
  Sync as SyncIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const ProductPublishing = () => {
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
  const [expandedStore, setExpandedStore] = useState(null);

  // Enhanced mock data with product publishing
  const publishingData = [
    {
      id: 1,
      name: 'ايفون 15 برو 128 جيجابايت',
      sku: 'IPH15P-128',
      status: 'منشور',
      lastModified: '2024-01-15',
      author: 'مدير',
      priority: 'عالي',
      views: 1250,
      clicks: 89,
      price: 999.99,
      stock: 45,
      stores: [
        {
          name: 'المتجر الرئيسي',
          status: 'منشور',
          lastSync: '2024-01-15 10:30',
          syncStatus: 'نجاح',
        },
        {
          name: 'متجر الإلكترونيات',
          status: 'منشور',
          lastSync: '2024-01-15 10:32',
          syncStatus: 'نجاح',
        },
        {
          name: 'متجر الموبايل',
          status: 'مسودة',
          lastSync: '2024-01-14 15:20',
          syncStatus: 'قيد الانتظار',
        },
        {
          name: 'المتجر المميز',
          status: 'منشور',
          lastSync: '2024-01-15 10:35',
          syncStatus: 'نجاح',
        },
      ],
      featured: true,
      position: 1,
      description: 'أحدث ايفون مع نظام كاميرا متقدم',
      tags: ['هاتف ذكي', 'آبل', 'مميز'],
      totalStores: 4,
      publishedStores: 3,
      pendingStores: 1,
    },
    {
      id: 2,
      name: 'ماكبوك إير M3 13 بوصة',
      sku: 'MBA-M3-13',
      status: 'مسودة',
      lastModified: '2024-01-14',
      author: 'مصمم',
      priority: 'عالي',
      views: 890,
      clicks: 67,
      price: 1199.99,
      stock: 12,
      stores: [
        {
          name: 'المتجر الرئيسي',
          status: 'مسودة',
          lastSync: '2024-01-14 14:20',
          syncStatus: 'قيد الانتظار',
        },
        {
          name: 'متجر الإلكترونيات',
          status: 'مسودة',
          lastSync: '2024-01-14 14:22',
          syncStatus: 'قيد الانتظار',
        },
        {
          name: 'متجر اللابتوب',
          status: 'مسودة',
          lastSync: '2024-01-14 14:25',
          syncStatus: 'قيد الانتظار',
        },
      ],
      featured: false,
      position: 2,
      description: 'لابتوب رفيع جداً مع معالج M3',
      tags: ['لابتوب', 'آبل', 'ماكبوك'],
      totalStores: 3,
      publishedStores: 0,
      pendingStores: 3,
    },
    {
      id: 3,
      name: 'سامسونج جالاكسي S24 256 جيجابايت',
      sku: 'SGS24-256',
      status: 'منشور',
      lastModified: '2024-01-13',
      author: 'مدير',
      priority: 'متوسط',
      views: 650,
      clicks: 23,
      price: 899.99,
      stock: 25,
      stores: [
        {
          name: 'المتجر الرئيسي',
          status: 'منشور',
          lastSync: '2024-01-13 09:15',
          syncStatus: 'نجاح',
        },
        {
          name: 'متجر الإلكترونيات',
          status: 'منشور',
          lastSync: '2024-01-13 09:18',
          syncStatus: 'نجاح',
        },
        {
          name: 'متجر الموبايل',
          status: 'منشور',
          lastSync: '2024-01-13 09:20',
          syncStatus: 'نجاح',
        },
        {
          name: 'متجر أندرويد',
          status: 'منشور',
          lastSync: '2024-01-13 09:22',
          syncStatus: 'نجاح',
        },
      ],
      featured: true,
      position: 3,
      description: 'هاتف سامسونج الرائد مع ميزات الذكاء الاصطناعي',
      tags: ['هاتف ذكي', 'سامسونج', 'أندرويد'],
      totalStores: 4,
      publishedStores: 4,
      pendingStores: 0,
    },
    {
      id: 4,
      name: 'ديل XPS 15 لابتوب',
      sku: 'DXP15-512',
      status: 'مجدول',
      lastModified: '2024-01-12',
      author: 'مصمم',
      priority: 'متوسط',
      views: 0,
      clicks: 0,
      price: 1499.99,
      stock: 8,
      stores: [
        {
          name: 'المتجر الرئيسي',
          status: 'مجدول',
          lastSync: '2024-01-12 16:30',
          syncStatus: 'مجدول',
        },
        {
          name: 'متجر الإلكترونيات',
          status: 'مجدول',
          lastSync: '2024-01-12 16:32',
          syncStatus: 'مجدول',
        },
        {
          name: 'متجر اللابتوب',
          status: 'مجدول',
          lastSync: '2024-01-12 16:35',
          syncStatus: 'مجدول',
        },
      ],
      featured: false,
      position: 4,
      description: 'لابتوب عالي الأداء للمحترفين',
      tags: ['لابتوب', 'ديل', 'احترافي'],
      totalStores: 3,
      publishedStores: 0,
      pendingStores: 0,
      scheduledStores: 3,
    },
    {
      id: 5,
      name: 'سوني WH-1000XM5 سماعات',
      sku: 'SNY-WH1000XM5',
      status: 'منشور',
      lastModified: '2024-01-11',
      author: 'مدير',
      priority: 'منخفض',
      views: 420,
      clicks: 15,
      price: 399.99,
      stock: 30,
      stores: [
        {
          name: 'المتجر الرئيسي',
          status: 'منشور',
          lastSync: '2024-01-11 11:45',
          syncStatus: 'نجاح',
        },
        {
          name: 'متجر الإلكترونيات',
          status: 'منشور',
          lastSync: '2024-01-11 11:47',
          syncStatus: 'نجاح',
        },
        {
          name: 'متجر الصوتيات',
          status: 'منشور',
          lastSync: '2024-01-11 11:50',
          syncStatus: 'نجاح',
        },
      ],
      featured: false,
      position: 5,
      description: 'سماعات مميزة لإلغاء الضوضاء',
      tags: ['سماعات', 'سوني', 'صوتيات'],
      totalStores: 3,
      publishedStores: 3,
      pendingStores: 0,
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
      setSelectedItems(publishingData.map((item) => item.id));
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
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات النشر بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleStoreExpand = (storeId) => {
    setExpandedStore(expandedStore === storeId ? null : storeId);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'منشور':
        return 'success';
      case 'مسودة':
        return 'warning';
      case 'مجدول':
        return 'info';
      case 'محذوف':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'عالي':
        return 'error';
      case 'متوسط':
        return 'warning';
      case 'منخفض':
        return 'success';
      default:
        return 'default';
    }
  };

  const getSyncStatusColor = (syncStatus) => {
    switch (syncStatus.toLowerCase()) {
      case 'نجاح':
        return 'success';
      case 'قيد الانتظار':
        return 'warning';
      case 'خطأ':
        return 'error';
      case 'مجدول':
        return 'info';
      default:
        return 'default';
    }
  };

  const getSyncStatusIcon = (syncStatus) => {
    switch (syncStatus.toLowerCase()) {
      case 'نجاح':
        return <CheckIcon />;
      case 'قيد الانتظار':
        return <ScheduleIcon />;
      case 'خطأ':
        return <ErrorIcon />;
      case 'مجدول':
        return <InfoIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const filteredData = publishingData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
              مدير نشر المنتجات
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة نشر المنتجات عبر جميع المتاجر الفرعية وقنوات التوزيع
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
              <Typography color="text.primary">النشر</Typography>
            </Breadcrumbs>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<SyncIcon />}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? 'جاري المزامنة...' : 'مزامنة الكل'}
            </Button>
            <Button
              variant="contained"
              startIcon={<PublishIcon />}
              onClick={() => setOpenDialog(true)}
            >
              نشر المنتجات
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
                    <PublishIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  {publishingData.length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  إجمالي المنتجات
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
                  {publishingData.filter((item) => item.status === 'منشور').length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  منشور
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
                    <StoreIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  {publishingData.reduce((sum, item) => sum + item.totalStores, 0)}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  إجمالي المتاجر
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
                    <SyncIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                  {publishingData.reduce((sum, item) => sum + item.publishedStores, 0)}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  المتاجر المنشورة
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
              placeholder="البحث في المنتجات، الرموز، أو المتاجر..."
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
                <MenuItem value="published">منشور</MenuItem>
                <MenuItem value="draft">مسودة</MenuItem>
                <MenuItem value="scheduled">مجدول</MenuItem>
                <MenuItem value="archived">مؤرشف</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>حالة المتجر</InputLabel>
              <Select value="all" label="حالة المتجر" onChange={() => {}}>
                <MenuItem value="all">جميع المتاجر</MenuItem>
                <MenuItem value="published">منشور</MenuItem>
                <MenuItem value="pending">معلق</MenuItem>
                <MenuItem value="error">خطأ في المزامنة</MenuItem>
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
            حالة نشر المنتجات
          </Typography>
          {selectedItems.length > 0 && (
            <Fade in={selectedItems.length > 0}>
              <Box sx={{ mr: 2, display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<PublishIcon />}
                  onClick={() => handleBulkAction('نشر')}
                >
                  نشر ({selectedItems.length})
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<SyncIcon />}
                  onClick={() => handleBulkAction('مزامنة')}
                >
                  مزامنة ({selectedItems.length})
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
            <PublishIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              لم يتم العثور على منتجات للنشر
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              اختر المنتجات للنشر عبر متاجرك الفرعية
            </Typography>
            <Button
              variant="contained"
              startIcon={<PublishIcon />}
              onClick={() => setOpenDialog(true)}
            >
              نشر المنتجات
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
                      تفاصيل المنتج
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>حالة المتجر</TableCell>
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
                          <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.light' }}>
                            <InventoryIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                              SKU: {item.sku}
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
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={`${item.publishedStores}/${item.totalStores} Published`}
                              size="small"
                              color="success"
                              icon={<CheckCircleIcon />}
                            />
                          </Box>
                          {item.pendingStores > 0 && (
                            <Chip
                              label={`${item.pendingStores} Pending`}
                              size="small"
                              color="warning"
                              icon={<ScheduleIcon />}
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                          {item.price.toFixed(2)} ر.س
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {item.stock} وحدة
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.status}
                          size="small"
                          color={getStatusColor(item.status)}
                          icon={
                            item.status === 'Published' ? (
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
                          <Tooltip title="تعديل النشر" arrow>
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

      {/* Enhanced Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <PublishIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">Publish Products to Stores</Typography>
              <Typography variant="body2" color="text.secondary">
                Select products and configure publishing settings
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
            <Tab label="Select Products" />
            <Tab label="Store Settings" />
            <Tab label="Publishing Options" />
            <Tab label="Schedule" />
          </Tabs>

          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Available Products
                </Typography>
                <Paper sx={{ p: 2, border: '1px solid #e0e0e0' }}>
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <InventoryIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Select Products to Publish
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Choose products from your catalog to publish across stores
                    </Typography>
                    <Button variant="outlined" startIcon={<AddIcon />}>
                      Browse Products
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}

          {tabValue === 1 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Store Selection
                </Typography>
                <List>
                  {[
                    'Main Store',
                    'Electronics Store',
                    'Mobile Store',
                    'Premium Store',
                    'Laptop Store',
                  ].map((store, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light' }}>
                          <StoreIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <MuiListItemText
                        primary={store}
                        secondary="Active • Last sync: 2 hours ago"
                      />
                      <ListItemSecondaryAction>
                        <Switch defaultChecked={index < 3} />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          )}

          {tabValue === 2 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Publishing Mode</InputLabel>
                  <Select label="Publishing Mode">
                    <MenuItem value="immediate">Publish Immediately</MenuItem>
                    <MenuItem value="scheduled">Schedule Publishing</MenuItem>
                    <MenuItem value="draft">Save as Draft</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Price Strategy</InputLabel>
                  <Select label="Price Strategy">
                    <MenuItem value="same">Same Price</MenuItem>
                    <MenuItem value="markup">Apply Markup</MenuItem>
                    <MenuItem value="custom">Custom Pricing</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Stack direction="row" spacing={2}>
                  <FormControlLabel control={<Switch />} label="Sync Inventory" />
                  <FormControlLabel control={<Switch />} label="Sync Pricing" />
                  <FormControlLabel control={<Switch />} label="Sync Descriptions" />
                  <FormControlLabel control={<Switch />} label="Sync Images" />
                </Stack>
              </Grid>
            </Grid>
          )}

          {tabValue === 3 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="datetime-local"
                  label="Publish Date & Time"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Timezone</InputLabel>
                  <Select label="Timezone">
                    <MenuItem value="utc">UTC</MenuItem>
                    <MenuItem value="est">Eastern Time</MenuItem>
                    <MenuItem value="pst">Pacific Time</MenuItem>
                    <MenuItem value="gmt">GMT</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={<Switch />}
                  label="Send notification when publishing is complete"
                />
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
            startIcon={loading ? <LinearProgress size={20} /> : <PublishIcon />}
          >
            {loading ? 'Publishing...' : 'Publish Now'}
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
              <Typography variant="h6">تفاصيل النشر</Typography>
              <Typography variant="body2" color="text.secondary">
                عرض جميع تفاصيل نشر المنتج عبر المتاجر
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
                      ايفون 15 برو 128 جيجابايت
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      رمز المنتج:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      IPH15P-128
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      الحالة:
                    </Typography>
                    <Chip label="منشور" color="success" size="small" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      السعر:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      999.99 ر.س
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  حالة النشر عبر المتاجر
                </Typography>
                <List>
                  {[
                    {
                      name: 'المتجر الرئيسي',
                      status: 'منشور',
                      lastSync: '2024-01-15 10:30',
                      syncStatus: 'success',
                    },
                    {
                      name: 'متجر الإلكترونيات',
                      status: 'منشور',
                      lastSync: '2024-01-15 10:32',
                      syncStatus: 'success',
                    },
                    {
                      name: 'متجر الموبايل',
                      status: 'مسودة',
                      lastSync: '2024-01-14 15:20',
                      syncStatus: 'pending',
                    },
                    {
                      name: 'المتجر المميز',
                      status: 'منشور',
                      lastSync: '2024-01-15 10:35',
                      syncStatus: 'success',
                    },
                  ].map((store, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32 }}>
                          <StoreIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <MuiListItemText
                        primary={store.name}
                        secondary={`${store.status} • آخر مزامنة: ${store.lastSync}`}
                      />
                      <ListItemSecondaryAction>
                        <Chip
                          label={store.status}
                          size="small"
                          color={
                            store.syncStatus === 'نجاح'
                              ? 'success'
                              : store.syncStatus === 'قيد الانتظار'
                              ? 'warning'
                              : 'error'
                          }
                          icon={
                            store.syncStatus === 'نجاح' ? (
                              <CheckIcon />
                            ) : store.syncStatus === 'قيد الانتظار' ? (
                              <ScheduleIcon />
                            ) : (
                              <ErrorIcon />
                            )
                          }
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
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
                      المخزون:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'info.main' }}>
                      45 وحدة
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
                  ملخص النشر
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        p: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                        3
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        متاجر منشورة
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        p: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                        1
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        متاجر معلقة
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        p: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                        4
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        إجمالي المتاجر
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setOpenViewDialog(false)} variant="outlined">
            إغلاق
          </Button>
          <Button variant="contained" startIcon={<EditIcon />}>
            تعديل النشر
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
          <ListItemText>تعديل النشر</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <SyncIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>مزامنة الآن</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <CopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>نسخ</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>إزالة من النشر</ListItemText>
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

export default ProductPublishing;
