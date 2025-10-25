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
  Avatar,
  LinearProgress,
  Checkbox,
  TableSortLabel,
  Menu,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Drawer,
  List,
  ListItem,
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
  Business as BusinessIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  CheckCircleOutline as CheckIcon,
  BlockOutlined as CloseIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  ViewColumn as ViewColumnIcon,
  DensityMedium as DensityMediumIcon,
  DensitySmall as DensitySmallIcon,
  DensityLarge as DensityLargeIcon,
  AttachMoney as AttachMoneyIcon,
  Assessment as AssessmentIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Timeline as TimelineIcon,
  Computer as ComputerIcon,
  Chair as ChairIcon,
  Build as BuildIcon,
  DirectionsCar as CarIcon,
  Home as HomeIcon2,
  Print as PrintIcon,
} from '@mui/icons-material';

const FixedAssets = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for fixed assets
  const assetsData = [
    {
      id: 1,
      name: 'خادم HP ProLiant DL380',
      category: 'أجهزة كمبيوتر',
      status: 'active',
      purchaseDate: '2023-01-15',
      purchasePrice: 25000,
      currentValue: 18000,
      depreciationRate: 20,
      usefulLife: 5,
      location: 'غرفة الخوادم - الطابق الثاني',
      serialNumber: 'HP-2023-001',
      supplier: 'شركة التقنية المتقدمة',
      warrantyExpiry: '2026-01-15',
      description: 'خادم عالي الأداء لمعالجة البيانات',
      maintenanceHistory: [
        { date: '2023-06-15', type: 'صيانة دورية', cost: 500, notes: 'تنظيف وفحص شامل' },
        { date: '2023-12-10', type: 'إصلاح', cost: 1200, notes: 'استبدال مروحة التبريد' },
      ],
      assignedTo: 'قسم تقنية المعلومات',
      createdBy: 'أحمد محمد',
      createdDate: '2023-01-15',
      lastModified: '2024-01-15',
    },
    {
      id: 2,
      name: 'طابعة ليزر HP LaserJet Pro',
      category: 'طابعات',
      status: 'active',
      purchaseDate: '2023-03-20',
      purchasePrice: 3500,
      currentValue: 2100,
      depreciationRate: 25,
      usefulLife: 4,
      location: 'مكتب الإدارة',
      serialNumber: 'HP-PRINT-002',
      supplier: 'مؤسسة الأجهزة المكتبية',
      warrantyExpiry: '2025-03-20',
      description: 'طابعة ليزر عالية الجودة للاستخدام المكتبي',
      maintenanceHistory: [
        { date: '2023-09-20', type: 'صيانة دورية', cost: 200, notes: 'تنظيف الرؤوس' },
      ],
      assignedTo: 'مكتب الإدارة',
      createdBy: 'فاطمة علي',
      createdDate: '2023-03-20',
      lastModified: '2023-09-20',
    },
    {
      id: 3,
      name: 'سيارة تويوتا كامري 2023',
      category: 'مركبات',
      status: 'active',
      purchaseDate: '2023-05-10',
      purchasePrice: 120000,
      currentValue: 90000,
      depreciationRate: 15,
      usefulLife: 7,
      location: 'موقف السيارات',
      serialNumber: 'TOY-2023-003',
      supplier: 'وكالة تويوتا',
      warrantyExpiry: '2026-05-10',
      description: 'سيارة إدارية للاستخدام الرسمي',
      maintenanceHistory: [
        { date: '2023-11-10', type: 'صيانة دورية', cost: 800, notes: 'تغيير الزيت والفلاتر' },
        { date: '2024-01-05', type: 'إصلاح', cost: 1500, notes: 'إصلاح نظام التبريد' },
      ],
      assignedTo: 'قسم المبيعات',
      createdBy: 'خالد أحمد',
      createdDate: '2023-05-10',
      lastModified: '2024-01-05',
    },
    {
      id: 4,
      name: 'مكتب خشبي إيطالي',
      category: 'أثاث',
      status: 'active',
      purchaseDate: '2023-02-28',
      purchasePrice: 8000,
      currentValue: 6000,
      depreciationRate: 10,
      usefulLife: 10,
      location: 'مكتب المدير العام',
      serialNumber: 'FURN-2023-004',
      supplier: 'شركة الأثاث الفاخر',
      warrantyExpiry: '2025-02-28',
      description: 'مكتب خشبي فاخر للمدير العام',
      maintenanceHistory: [],
      assignedTo: 'المدير العام',
      createdBy: 'سارة محمد',
      createdDate: '2023-02-28',
      lastModified: '2023-02-28',
    },
    {
      id: 5,
      name: 'مكيف هواء مركزي',
      category: 'أجهزة تكييف',
      status: 'maintenance',
      purchaseDate: '2022-08-15',
      purchasePrice: 15000,
      currentValue: 8000,
      depreciationRate: 20,
      usefulLife: 5,
      location: 'المبنى الرئيسي',
      serialNumber: 'AC-2022-005',
      supplier: 'شركة التكييف المتقدمة',
      warrantyExpiry: '2024-08-15',
      description: 'نظام تكييف مركزي للمبنى الرئيسي',
      maintenanceHistory: [
        { date: '2023-07-15', type: 'صيانة دورية', cost: 600, notes: 'تنظيف الفلاتر' },
        { date: '2023-12-20', type: 'إصلاح', cost: 2000, notes: 'إصلاح ضاغط الهواء' },
      ],
      assignedTo: 'قسم الصيانة',
      createdBy: 'محمد حسن',
      createdDate: '2022-08-15',
      lastModified: '2023-12-20',
    },
  ];

  const assetStatuses = [
    { value: 'active', label: 'نشط', color: 'success' },
    { value: 'maintenance', label: 'صيانة', color: 'warning' },
    { value: 'disposed', label: 'مستغنى عنه', color: 'error' },
    { value: 'lost', label: 'مفقود', color: 'default' },
  ];

  const assetCategories = [
    'أجهزة كمبيوتر',
    'طابعات',
    'مركبات',
    'أثاث',
    'أجهزة تكييف',
    'معدات إنتاج',
    'أدوات',
    'أخرى',
  ];

  const locations = [
    'المبنى الرئيسي',
    'الطابق الأول',
    'الطابق الثاني',
    'الطابق الثالث',
    'مكتب الإدارة',
    'قسم المبيعات',
    'قسم المحاسبة',
    'قسم تقنية المعلومات',
    'قسم الموارد البشرية',
    'غرفة الخوادم',
    'موقف السيارات',
    'المستودع',
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const notify = (action, details) => {
    setSnackbar({
      open: true,
      message: `تم تنفيذ: ${action} - ${details}`,
      severity: 'success',
    });
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

  const handleBulkAction = (action) => {
    notify(`${action} الأصول`, `${selectedItems.length} أصل`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (asset) => {
    setSelectedAsset(asset);
    setOpenViewDialog(true);
  };

  const handleEdit = (asset) => {
    setSelectedAsset(asset);
    setOpenDialog(true);
  };

  const handleDelete = (asset) => {
    setSelectedAsset(asset);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث الأصل', selectedAsset ? 'تم تحديث الأصل' : 'تم إضافة الأصل');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف الأصل', 'تم حذف الأصل');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير الأصول', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = assetsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
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

  const getStatusColor = (status) => {
    const statusInfo = assetStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = assetStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'أجهزة كمبيوتر':
        return <ComputerIcon />;
      case 'طابعات':
        return <PrintIcon />;
      case 'مركبات':
        return <CarIcon />;
      case 'أثاث':
        return <ChairIcon />;
      case 'أجهزة تكييف':
        return <BuildIcon />;
      default:
        return <BusinessIcon />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  const getDensityProps = () => {
    switch (density) {
      case 'compact':
        return { size: 'small' };
      case 'comfortable':
        return { size: 'medium' };
      default:
        return { size: 'small' };
    }
  };

  const totalAssets = assetsData.length;
  const activeAssets = assetsData.filter((asset) => asset.status === 'active').length;
  const totalValue = assetsData.reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalPurchaseValue = assetsData.reduce((sum, asset) => sum + asset.purchasePrice, 0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إدارة الأصول الثابتة
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          تتبع وإدارة جميع الأصول الثابتة للشركة مع حساب الاستهلاك والصيانة.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/finance">
            الحسابات والمالية
          </Link>
          <Typography color="text.primary">الأصول الثابتة</Typography>
        </Breadcrumbs>
      </Box>

      {/* Stats Cards */}
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, mr: 2 }}>
                  <BusinessIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalAssets}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الأصول
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
                'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
              border: '1px solid rgba(76, 175, 80, 0.2)',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', width: 48, height: 48, mr: 2 }}>
                  <CheckIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                {activeAssets}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                الأصول النشطة
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', width: 48, height: 48, mr: 2 }}>
                  <AttachMoneyIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {formatCurrency(totalValue)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                القيمة الحالية
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
                'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)',
              border: '1px solid rgba(244, 67, 54, 0.2)',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(244, 67, 54, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'error.main', width: 48, height: 48, mr: 2 }}>
                  <BarChartIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {formatCurrency(totalPurchaseValue)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                قيمة الشراء
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="البحث في الأصول..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الحالة</InputLabel>
                <Select
                  value={statusFilter}
                  label="الحالة"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الحالات</MenuItem>
                  {assetStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الفئة</InputLabel>
                <Select
                  value={categoryFilter}
                  label="الفئة"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الفئات</MenuItem>
                  {assetCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
                fullWidth
              >
                إعادة تعيين
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                تم العثور على {filteredData.length}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Paper>

      {/* Content */}
      <Paper>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            قائمة الأصول الثابتة
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button size="small" onClick={() => handleBulkAction('تفعيل')} sx={{ mr: 1 }}>
                تفعيل ({selectedItems.length})
              </Button>
              <Button size="small" color="error" onClick={() => handleBulkAction('حذف')}>
                حذف ({selectedItems.length})
              </Button>
            </Box>
          )}
          <Tooltip title="تصدير CSV">
            <IconButton onClick={handleExport} sx={{ mr: 1 }}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
            إضافة أصل
          </Button>
        </Toolbar>

        {loading ? (
          <Box sx={{ p: 2 }}>
            <LinearProgress />
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} height={60} sx={{ mb: 1 }} />
            ))}
          </Box>
        ) : error ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="error">خطأ في تحميل الأصول. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على أصول. أضف أول أصل.</Alert>
          </Box>
        ) : (
          <>
            <Table {...getDensityProps()}>
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
                      اسم الأصل
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'category'}
                      direction={sortBy === 'category' ? sortOrder : 'asc'}
                      onClick={() => handleSort('category')}
                    >
                      الفئة
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'status'}
                      direction={sortBy === 'status' ? sortOrder : 'asc'}
                      onClick={() => handleSort('status')}
                    >
                      الحالة
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'purchasePrice'}
                      direction={sortBy === 'purchasePrice' ? sortOrder : 'asc'}
                      onClick={() => handleSort('purchasePrice')}
                    >
                      سعر الشراء
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'currentValue'}
                      direction={sortBy === 'currentValue' ? sortOrder : 'asc'}
                      onClick={() => handleSort('currentValue')}
                    >
                      القيمة الحالية
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'location'}
                      direction={sortBy === 'location' ? sortOrder : 'asc'}
                      onClick={() => handleSort('location')}
                    >
                      الموقع
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                            {getCategoryIcon(item.category)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">{item.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.serialNumber}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.category}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(item.status)}
                          size="small"
                          color={getStatusColor(item.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {formatCurrency(item.purchasePrice)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="success.main">
                          {formatCurrency(item.currentValue)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.location}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل الأصل" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف الأصل" arrow>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(item)}
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
        <DialogTitle>{selectedAsset ? 'تعديل الأصل' : 'إضافة أصل جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم الأصل"
                placeholder="أدخل اسم الأصل"
                defaultValue={selectedAsset?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الفئة</InputLabel>
                <Select label="الفئة" defaultValue={selectedAsset?.category || ''}>
                  {assetCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم التسلسل"
                placeholder="أدخل رقم التسلسل"
                defaultValue={selectedAsset?.serialNumber || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الموقع</InputLabel>
                <Select label="الموقع" defaultValue={selectedAsset?.location || ''}>
                  {locations.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="سعر الشراء"
                placeholder="0.00"
                defaultValue={selectedAsset?.purchasePrice || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الشراء"
                defaultValue={selectedAsset?.purchaseDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="معدل الاستهلاك (%)"
                placeholder="0"
                defaultValue={selectedAsset?.depreciationRate || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="العمر الإنتاجي (سنوات)"
                placeholder="0"
                defaultValue={selectedAsset?.usefulLife || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المورد"
                placeholder="أدخل اسم المورد"
                defaultValue={selectedAsset?.supplier || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="انتهاء الضمان"
                defaultValue={selectedAsset?.warrantyExpiry || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="الوصف"
                placeholder="أدخل وصف الأصل"
                defaultValue={selectedAsset?.description || ''}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>حذف الأصل</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا الأصل؟
          </Typography>
          {selectedAsset && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedAsset.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedAsset.category} - {formatCurrency(selectedAsset.purchasePrice)}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
            disabled={loading}
          >
            {loading ? 'جاري الحذف...' : 'حذف'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Drawer */}
      <Drawer
        anchor="right"
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        sx={{ '& .MuiDrawer-paper': { width: 500 } }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            تفاصيل الأصل
          </Typography>
          {selectedAsset && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  {getCategoryIcon(selectedAsset.category)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedAsset.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedAsset.category}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="اسم الأصل" secondary={selectedAsset.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الفئة" secondary={selectedAsset.category} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحالة" secondary={getStatusLabel(selectedAsset.status)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم التسلسل" secondary={selectedAsset.serialNumber} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الموقع" secondary={selectedAsset.location} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="سعر الشراء"
                    secondary={formatCurrency(selectedAsset.purchasePrice)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="القيمة الحالية"
                    secondary={formatCurrency(selectedAsset.currentValue)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="معدل الاستهلاك"
                    secondary={`${selectedAsset.depreciationRate}%`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="العمر الإنتاجي"
                    secondary={`${selectedAsset.usefulLife} سنوات`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ الشراء"
                    secondary={formatDate(selectedAsset.purchaseDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المورد" secondary={selectedAsset.supplier} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="انتهاء الضمان"
                    secondary={formatDate(selectedAsset.warrantyExpiry)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المسؤول" secondary={selectedAsset.assignedTo} />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الوصف
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedAsset.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                سجل الصيانة
              </Typography>
              <List dense>
                {selectedAsset.maintenanceHistory.map((maintenance, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${maintenance.type} - ${formatDate(maintenance.date)}`}
                      secondary={`${formatCurrency(maintenance.cost)} - ${maintenance.notes}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </Drawer>

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

export default FixedAssets;
