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
  Checkbox,
  TableSortLabel,
  ListItemText,
  LinearProgress,
  Skeleton,
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
  Store as StoreIcon,
  CheckCircleOutline as CheckIcon,
  Download as DownloadIcon,
  AttachMoney as AttachMoneyIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

const SubstoresList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for substores
  const substoresData = [
    {
      id: 1,
      name: 'متجر الرياض الرئيسي',
      code: 'STR001',
      type: 'retail',
      status: 'active',
      region: 'الرياض',
      city: 'الرياض',
      address: 'شارع الملك فهد، حي النخيل',
      phone: '+966112345678',
      email: 'riyadh@company.com',
      manager: 'أحمد محمد علي',
      managerPhone: '+966501234567',
      managerEmail: 'ahmed@company.com',
      openingDate: '2022-01-15',
      lastActivity: '2024-01-15',
      totalSales: 2500000,
      monthlyTarget: 300000,
      achievementRate: 83.3,
      totalProducts: 1250,
      activeProducts: 1100,
      totalOrders: 450,
      pendingOrders: 25,
      completedOrders: 400,
      totalCustomers: 1200,
      newCustomers: 150,
      rating: 4.5,
      reviews: 89,
      staff: [
        { name: 'أحمد محمد علي', role: 'مدير المتجر', status: 'active' },
        { name: 'فاطمة أحمد', role: 'مندوب مبيعات', status: 'active' },
        { name: 'خالد عبدالله', role: 'محاسب', status: 'active' },
      ],
      features: ['توصيل مجاني', 'خدمة العملاء 24/7', 'ضمان الجودة'],
      notes: 'متجر رئيسي في قلب الرياض مع خدمة ممتازة',
      createdBy: 'مدير العمليات',
      createdDate: '2022-01-15',
      lastModified: '2024-01-15',
    },
    {
      id: 2,
      name: 'متجر جدة التجاري',
      code: 'STR002',
      type: 'commercial',
      status: 'active',
      region: 'مكة المكرمة',
      city: 'جدة',
      address: 'شارع التحلية، حي الروضة',
      phone: '+966126543210',
      email: 'jeddah@company.com',
      manager: 'سارة أحمد السعيد',
      managerPhone: '+966501234568',
      managerEmail: 'sara@company.com',
      openingDate: '2022-03-01',
      lastActivity: '2024-01-14',
      totalSales: 1800000,
      monthlyTarget: 200000,
      achievementRate: 90,
      totalProducts: 980,
      activeProducts: 920,
      totalOrders: 320,
      pendingOrders: 15,
      completedOrders: 290,
      totalCustomers: 850,
      newCustomers: 120,
      rating: 4.3,
      reviews: 67,
      staff: [
        { name: 'سارة أحمد السعيد', role: 'مدير المتجر', status: 'active' },
        { name: 'محمد عبدالرحمن', role: 'مندوب مبيعات', status: 'active' },
        { name: 'نورا محمد', role: 'محاسب', status: 'active' },
      ],
      features: ['توصيل سريع', 'خدمة العملاء', 'عروض خاصة'],
      notes: 'متجر تجاري في جدة مع تركيز على العملاء التجاريين',
      createdBy: 'مدير العمليات',
      createdDate: '2022-03-01',
      lastModified: '2024-01-14',
    },
    {
      id: 3,
      name: 'متجر الدمام الصناعي',
      code: 'STR003',
      type: 'industrial',
      status: 'active',
      region: 'الشرقية',
      city: 'الدمام',
      address: 'المنطقة الصناعية الثانية',
      phone: '+966133456789',
      email: 'dammam@company.com',
      manager: 'خالد عبدالله المطيري',
      managerPhone: '+966501234569',
      managerEmail: 'khalid@company.com',
      openingDate: '2022-06-15',
      lastActivity: '2024-01-13',
      totalSales: 3200000,
      monthlyTarget: 350000,
      achievementRate: 91.4,
      totalProducts: 2100,
      activeProducts: 1950,
      totalOrders: 680,
      pendingOrders: 35,
      completedOrders: 620,
      totalCustomers: 1500,
      newCustomers: 200,
      rating: 4.7,
      reviews: 125,
      staff: [
        { name: 'خالد عبدالله المطيري', role: 'مدير المتجر', status: 'active' },
        { name: 'عبدالله محمد', role: 'مندوب مبيعات', status: 'active' },
        { name: 'مريم أحمد', role: 'محاسب', status: 'active' },
        { name: 'سعد علي', role: 'فني صيانة', status: 'active' },
      ],
      features: ['خدمة فنية', 'قطع غيار', 'صيانة متخصصة'],
      notes: 'متجر متخصص في المنتجات الصناعية والقطع الفنية',
      createdBy: 'مدير العمليات',
      createdDate: '2022-06-15',
      lastModified: '2024-01-13',
    },
    {
      id: 4,
      name: 'متجر الخبر الساحلي',
      code: 'STR004',
      type: 'retail',
      status: 'maintenance',
      region: 'الشرقية',
      city: 'الخبر',
      address: 'الكورنيش، حي الفيصلية',
      phone: '+966133567890',
      email: 'khobar@company.com',
      manager: 'فاطمة محمد الحسن',
      managerPhone: '+966501234570',
      managerEmail: 'fatima@company.com',
      openingDate: '2022-09-01',
      lastActivity: '2024-01-10',
      totalSales: 1200000,
      monthlyTarget: 150000,
      achievementRate: 80,
      totalProducts: 750,
      activeProducts: 680,
      totalOrders: 280,
      pendingOrders: 20,
      completedOrders: 250,
      totalCustomers: 600,
      newCustomers: 80,
      rating: 4.1,
      reviews: 45,
      staff: [
        { name: 'فاطمة محمد الحسن', role: 'مدير المتجر', status: 'active' },
        { name: 'علي أحمد', role: 'مندوب مبيعات', status: 'active' },
      ],
      features: ['منتجات ساحلية', 'خدمة توصيل', 'عروض موسمية'],
      notes: 'متجر في الخبر متخصص في المنتجات الساحلية والسياحية',
      createdBy: 'مدير العمليات',
      createdDate: '2022-09-01',
      lastModified: '2024-01-10',
    },
    {
      id: 5,
      name: 'متجر الطائف الجبلي',
      code: 'STR005',
      type: 'retail',
      status: 'inactive',
      region: 'مكة المكرمة',
      city: 'الطائف',
      address: 'شارع الملك عبدالعزيز، حي الشهداء',
      phone: '+966127654321',
      email: 'taif@company.com',
      manager: 'محمد عبدالرحمن الشمري',
      managerPhone: '+966501234571',
      managerEmail: 'mohammed@company.com',
      openingDate: '2022-12-01',
      lastActivity: '2023-12-15',
      totalSales: 800000,
      monthlyTarget: 100000,
      achievementRate: 80,
      totalProducts: 500,
      activeProducts: 450,
      totalOrders: 180,
      pendingOrders: 10,
      completedOrders: 160,
      totalCustomers: 350,
      newCustomers: 50,
      rating: 3.8,
      reviews: 28,
      staff: [{ name: 'محمد عبدالرحمن الشمري', role: 'مدير المتجر', status: 'inactive' }],
      features: ['منتجات جبلية', 'عسل طبيعي', 'أعشاب طبية'],
      notes: 'متجر متخصص في المنتجات الجبلية والأعشاب الطبيعية - مغلق مؤقتاً',
      createdBy: 'مدير العمليات',
      createdDate: '2022-12-01',
      lastModified: '2023-12-15',
    },
  ];

  const storeStatuses = [
    { value: 'active', label: 'نشط', color: 'success' },
    { value: 'maintenance', label: 'صيانة', color: 'warning' },
    { value: 'inactive', label: 'غير نشط', color: 'error' },
    { value: 'pending', label: 'في الانتظار', color: 'info' },
  ];

  const storeTypes = [
    { value: 'retail', label: 'تجاري' },
    { value: 'commercial', label: 'تجاري كبير' },
    { value: 'industrial', label: 'صناعي' },
    { value: 'online', label: 'إلكتروني' },
  ];

  const regions = [
    'الرياض',
    'مكة المكرمة',
    'الشرقية',
    'المدينة المنورة',
    'القصيم',
    'عسير',
    'تبوك',
    'حائل',
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
    notify(`${action} المتاجر`, `${selectedItems.length} متجر`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (store) => {
    setSelectedStore(store);
    setOpenViewDialog(true);
  };

  const handleEdit = (store) => {
    setSelectedStore(store);
    setOpenDialog(true);
  };

  const handleDelete = (store) => {
    setSelectedStore(store);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث المتجر', selectedStore ? 'تم تحديث المتجر' : 'تم إضافة المتجر');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف المتجر', 'تم حذف المتجر');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير المتاجر', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = substoresData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesRegion = regionFilter === 'all' || item.region === regionFilter;
    return matchesSearch && matchesStatus && matchesRegion;
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
    const statusInfo = storeStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = storeStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
  };

  const getTypeLabel = (type) => {
    const typeInfo = storeTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.label : type;
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

  const totalStores = substoresData.length;
  const activeStores = substoresData.filter((store) => store.status === 'active').length;
  const totalSales = substoresData.reduce((sum, store) => sum + store.totalSales, 0);
  const averageRating =
    substoresData.reduce((sum, store) => sum + store.rating, 0) / substoresData.length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إدارة المتاجر الفرعية
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة وتتبع جميع المتاجر الفرعية مع مراقبة الأداء والمبيعات.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/substores">
            إدارة المتاجر الفرعية
          </Link>
          <Typography color="text.primary">قائمة المتاجر</Typography>
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
                  <StoreIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalStores}
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
                {activeStores}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                المتاجر النشطة
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
                {formatCurrency(totalSales)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي المبيعات
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
                  <AssessmentIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {averageRating.toFixed(1)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                متوسط التقييم
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
                placeholder="البحث في المتاجر..."
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
                  {storeStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>المنطقة</InputLabel>
                <Select
                  value={regionFilter}
                  label="المنطقة"
                  onChange={(e) => setRegionFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع المناطق</MenuItem>
                  {regions.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region}
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
                  setRegionFilter('all');
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
            قائمة المتاجر الفرعية
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
            إضافة متجر
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
            <Alert severity="error">خطأ في تحميل المتاجر. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على متاجر. أضف أول متجر.</Alert>
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
                      اسم المتجر
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'type'}
                      direction={sortBy === 'type' ? sortOrder : 'asc'}
                      onClick={() => handleSort('type')}
                    >
                      النوع
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
                      active={sortBy === 'city'}
                      direction={sortBy === 'city' ? sortOrder : 'asc'}
                      onClick={() => handleSort('city')}
                    >
                      الموقع
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'totalSales'}
                      direction={sortBy === 'totalSales' ? sortOrder : 'asc'}
                      onClick={() => handleSort('totalSales')}
                    >
                      إجمالي المبيعات
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'achievementRate'}
                      direction={sortBy === 'achievementRate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('achievementRate')}
                    >
                      معدل الإنجاز
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'rating'}
                      direction={sortBy === 'rating' ? sortOrder : 'asc'}
                      onClick={() => handleSort('rating')}
                    >
                      التقييم
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
                            <StoreIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">{item.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.code}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getTypeLabel(item.type)}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(item.status)}
                          size="small"
                          color={getStatusColor(item.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">{item.city}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.region}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {formatCurrency(item.totalSales)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {item.achievementRate}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={item.achievementRate}
                            sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
                            color={
                              item.achievementRate > 90
                                ? 'success'
                                : item.achievementRate > 70
                                ? 'warning'
                                : 'error'
                            }
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {item.rating}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ({item.reviews})
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل المتجر" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف المتجر" arrow>
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
        <DialogTitle>{selectedStore ? 'تعديل المتجر' : 'إضافة متجر جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم المتجر"
                placeholder="أدخل اسم المتجر"
                defaultValue={selectedStore?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="كود المتجر"
                placeholder="STR001"
                defaultValue={selectedStore?.code || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>نوع المتجر</InputLabel>
                <Select label="نوع المتجر" defaultValue={selectedStore?.type || 'retail'}>
                  {storeTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedStore?.status || 'active'}>
                  {storeStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>المنطقة</InputLabel>
                <Select label="المنطقة" defaultValue={selectedStore?.region || ''}>
                  {regions.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المدينة"
                placeholder="أدخل اسم المدينة"
                defaultValue={selectedStore?.city || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="العنوان"
                placeholder="أدخل العنوان الكامل"
                defaultValue={selectedStore?.address || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                placeholder="+966112345678"
                defaultValue={selectedStore?.phone || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="store@company.com"
                defaultValue={selectedStore?.email || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="مدير المتجر"
                placeholder="أدخل اسم المدير"
                defaultValue={selectedStore?.manager || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الافتتاح"
                defaultValue={selectedStore?.openingDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="الملاحظات"
                placeholder="أدخل ملاحظات حول المتجر"
                defaultValue={selectedStore?.notes || ''}
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
        <DialogTitle>حذف المتجر</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا المتجر؟
          </Typography>
          {selectedStore && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedStore.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedStore.city} - {selectedStore.code}
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
            تفاصيل المتجر
          </Typography>
          {selectedStore && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  <StoreIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedStore.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedStore.code}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="اسم المتجر" secondary={selectedStore.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="كود المتجر" secondary={selectedStore.code} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="النوع" secondary={getTypeLabel(selectedStore.type)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحالة" secondary={getStatusLabel(selectedStore.status)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المنطقة" secondary={selectedStore.region} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المدينة" secondary={selectedStore.city} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العنوان" secondary={selectedStore.address} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم الهاتف" secondary={selectedStore.phone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="البريد الإلكتروني" secondary={selectedStore.email} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="مدير المتجر" secondary={selectedStore.manager} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="هاتف المدير" secondary={selectedStore.managerPhone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="بريد المدير" secondary={selectedStore.managerEmail} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ الافتتاح"
                    secondary={formatDate(selectedStore.openingDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="آخر نشاط"
                    secondary={formatDate(selectedStore.lastActivity)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="إجمالي المبيعات"
                    secondary={formatCurrency(selectedStore.totalSales)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الهدف الشهري"
                    secondary={formatCurrency(selectedStore.monthlyTarget)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="معدل الإنجاز"
                    secondary={`${selectedStore.achievementRate}%`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="إجمالي المنتجات"
                    secondary={`${selectedStore.totalProducts} منتج`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المنتجات النشطة"
                    secondary={`${selectedStore.activeProducts} منتج`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="إجمالي الطلبات"
                    secondary={`${selectedStore.totalOrders} طلب`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الطلبات المعلقة"
                    secondary={`${selectedStore.pendingOrders} طلب`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الطلبات المكتملة"
                    secondary={`${selectedStore.completedOrders} طلب`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="إجمالي العملاء"
                    secondary={`${selectedStore.totalCustomers} عميل`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="العملاء الجدد"
                    secondary={`${selectedStore.newCustomers} عميل`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="التقييم"
                    secondary={`${selectedStore.rating} (${selectedStore.reviews} تقييم)`}
                  />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الموظفين
              </Typography>
              <List dense>
                {selectedStore.staff.map((member, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={member.name}
                      secondary={`${member.role} - ${
                        member.status === 'active' ? 'نشط' : 'غير نشط'
                      }`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المميزات
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedStore.features.map((feature, index) => (
                  <Chip
                    key={index}
                    label={feature}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الملاحظات
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedStore.notes}
              </Typography>
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

export default SubstoresList;
