import React, { useState, useEffect } from 'react';
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
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Tooltip,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Checkbox,
  LinearProgress,
  IconButton,
  Skeleton,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Refresh as RefreshIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  Inventory as InventoryIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const Stocktakes = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [warehouseFilter, setWarehouseFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedStocktake, setSelectedStocktake] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [formData, setFormData] = useState({
    title: 'إدارة الجرد',
    content: '',
    isActive: true,
    stocktakeStatus: 'pending',
    stocktakeDate: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
    warehouse: '',
    priority: 'متوسط',
    description: '',
    estimatedDuration: 0,
  });

  // بيانات وهمية شاملة للجرد
  const stocktakeData = [
    {
      id: 1,
      stocktakeNumber: 'ST-001',
      title: 'جرد الإلكترونيات',
      status: 'مكتمل',
      priority: 'عالي',
      warehouse: 'المستودع الرئيسي',
      items: 150,
      countedItems: 150,
      discrepancies: 0,
      createdBy: 'أحمد محمد',
      createdAt: '2024-01-15',
      completedAt: '2024-01-16',
      description: 'جرد شامل للمنتجات الإلكترونية',
      notes: 'تم الجرد بنجاح',
      itemsList: [
        { name: 'سماعات لاسلكية', expected: 50, counted: 50, variance: 0 },
        { name: 'ساعات ذكية', expected: 30, counted: 30, variance: 0 },
        { name: 'لوحات مفاتيح', expected: 100, counted: 100, variance: 0 },
      ],
    },
    {
      id: 2,
      stocktakeNumber: 'ST-002',
      title: 'جرد الأجهزة المنزلية',
      status: 'قيد التقدم',
      priority: 'متوسط',
      warehouse: 'مستودع الأجهزة',
      items: 80,
      countedItems: 45,
      discrepancies: 2,
      createdBy: 'فاطمة علي',
      createdAt: '2024-01-14',
      completedAt: null,
      description: 'جرد أجهزة منزلية',
      notes: 'الجرد قيد التنفيذ',
      itemsList: [
        { name: 'ماكينات قهوة', expected: 20, counted: 18, variance: -2 },
        { name: 'خلاطات', expected: 30, counted: 27, variance: -3 },
      ],
    },
    {
      id: 3,
      stocktakeNumber: 'ST-003',
      title: 'جرد الملابس',
      status: 'في الانتظار',
      priority: 'منخفض',
      warehouse: 'مستودع الملابس',
      items: 200,
      countedItems: 0,
      discrepancies: 0,
      createdBy: 'محمد عبدالله',
      createdAt: '2024-01-13',
      completedAt: null,
      description: 'جرد ملابس موسمية',
      notes: 'في انتظار البدء',
      itemsList: [
        { name: 'قمصان رجالية', expected: 100, counted: 0, variance: 0 },
        { name: 'فساتين نسائية', expected: 80, counted: 0, variance: 0 },
      ],
    },
    {
      id: 4,
      stocktakeNumber: 'ST-004',
      title: 'جرد الكتب',
      status: 'ملغي',
      priority: 'متوسط',
      warehouse: 'مستودع الكتب',
      items: 50,
      countedItems: 0,
      discrepancies: 0,
      createdBy: 'نورا السعيد',
      createdAt: '2024-01-12',
      completedAt: null,
      description: 'جرد كتب تعليمية',
      notes: 'تم إلغاء الجرد',
      itemsList: [{ name: 'كتب تعليمية', expected: 50, counted: 0, variance: 0 }],
    },
    {
      id: 5,
      stocktakeNumber: 'ST-005',
      title: 'جرد الألعاب',
      status: 'مكتمل',
      priority: 'عالي',
      warehouse: 'مستودع الألعاب',
      items: 120,
      countedItems: 120,
      discrepancies: 1,
      createdBy: 'خالد أحمد',
      createdAt: '2024-01-11',
      completedAt: '2024-01-12',
      description: 'جرد ألعاب أطفال',
      notes: 'تم الجرد بنجاح',
      itemsList: [
        { name: 'ألعاب تعليمية', expected: 40, counted: 41, variance: 1 },
        { name: 'دمى', expected: 60, counted: 60, variance: 0 },
      ],
    },
  ];

  const warehouses = [
    'المستودع الرئيسي',
    'مستودع الأجهزة',
    'مستودع الملابس',
    'مستودع الكتب',
    'مستودع الألعاب',
  ];
  const statuses = ['في الانتظار', 'قيد التقدم', 'مكتمل', 'ملغي'];
  const priorities = ['عالي', 'متوسط', 'منخفض'];

  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'عملية الجرد',
      content: 'إدارة عمليات الجرد والتعداد مع التتبع التفصيلي والتحليلات المتقدمة.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'قواعد الجرد',
      content: 'تكوين قواعد وسياسات الجرد مع التنبيهات التلقائية والموافقات.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'تتبع الجرد',
      content: 'تتبع تقدم وحالة الجرد مع التقارير التفصيلية والتحليلات.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'تحليلات الجرد',
      content: 'عرض أداء وتحليلات الجرد مع الرسوم البيانية والتقارير.',
      isExpanded: false,
    },
  ]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات الجرد بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleAddSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: 'قسم جديد',
      content: '',
      isExpanded: false,
    };
    setSections([...sections, newSection]);
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleSectionChange = (id, field, value) => {
    setSections(
      sections.map((section) => (section.id === id ? { ...section, [field]: value } : section)),
    );
  };

  const handleToggleExpanded = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, isExpanded: !section.isExpanded } : section,
      ),
    );
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث الجرد بنجاح',
        severity: 'success',
      });
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

  const handleBulkAction = (action) => {
    setSnackbar({
      open: true,
      message: `تم ${action} لـ ${selectedItems.length} جرد`,
      severity: 'success',
    });
    setSelectedItems([]);
  };

  const handleView = (stocktake) => {
    setSelectedStocktake(stocktake);
    setOpenViewDialog(true);
  };

  const handleEdit = (stocktake) => {
    setSelectedStocktake(stocktake);
    setOpenDialog(true);
  };

  const handleDelete = (stocktake) => {
    setSelectedStocktake(stocktake);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      setSnackbar({ open: true, message: 'تم حذف الجرد بنجاح', severity: 'success' });
    }, 1000);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'مكتمل':
        return 'success';
      case 'قيد التقدم':
        return 'warning';
      case 'في الانتظار':
        return 'info';
      case 'ملغي':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
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

  const filteredData = stocktakeData.filter((item) => {
    const matchesSearch =
      item.stocktakeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.warehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesWarehouse = warehouseFilter === 'all' || item.warehouse === warehouseFilter;
    return matchesSearch && matchesStatus && matchesWarehouse;
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
    <Box sx={{ p: 3 }} role="main" aria-label="إدارة الجرد" aria-hidden="false" tabIndex={0}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              إدارة الجرد
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              أتمتة عمليات الجرد والتعداد مع التتبع التفصيلي والتحليلات المتقدمة
            </Typography>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              sx={{ mt: 1 }}
              aria-label="مسار التنقل"
            >
              <Link
                color="inherit"
                href="/system"
                sx={{ display: 'flex', alignItems: 'center' }}
                aria-label="الذهاب إلى لوحة التحكم"
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                لوحة التحكم
              </Link>
              <Link color="inherit" href="/system/operations" aria-label="الذهاب إلى العمليات">
                العمليات
              </Link>
              <Typography color="text.primary">الجرد</Typography>
            </Breadcrumbs>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={loading}
              aria-label="تحديث البيانات"
              aria-hidden="false"
              tabIndex={0}
            >
              {loading ? 'جاري التحديث...' : 'تحديث'}
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              aria-label="إضافة جرد جديد"
              aria-hidden="false"
              tabIndex={0}
            >
              إضافة جرد
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
                    <InventoryIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  {stocktakeData.length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  إجمالي عمليات الجرد
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
                  {stocktakeData.filter((item) => item.status === 'مكتمل').length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  مكتمل
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
                    <ScheduleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  {stocktakeData.filter((item) => item.status === 'قيد التقدم').length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  قيد التقدم
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
                    <WarningIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                  {stocktakeData.filter((item) => item.status === 'في الانتظار').length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  في الانتظار
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }} aria-hidden="false">
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في الجرد"
              size="small"
              placeholder="البحث في الجرد..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              aria-label="البحث في الجرد"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الحالة</InputLabel>
              <Select
                value={statusFilter}
                label="الحالة"
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="فلتر الحالة"
              >
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="في الانتظار">في الانتظار</MenuItem>
                <MenuItem value="قيد التقدم">قيد التقدم</MenuItem>
                <MenuItem value="مكتمل">مكتمل</MenuItem>
                <MenuItem value="ملغي">ملغي</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>المستودع</InputLabel>
              <Select
                value={warehouseFilter}
                label="المستودع"
                onChange={(e) => setWarehouseFilter(e.target.value)}
                aria-label="فلتر المستودع"
              >
                <MenuItem value="all">جميع المستودعات</MenuItem>
                {warehouses.map((warehouse) => (
                  <MenuItem key={warehouse} value={warehouse}>
                    {warehouse}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setWarehouseFilter('all');
              }}
              aria-label="إعادة تعيين الفلاتر"
              aria-hidden="false"
              tabIndex={0}
            >
              إعادة تعيين الفلاتر
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={loading}
                size="small"
                aria-label="حفظ الجرد"
                aria-hidden="false"
                tabIndex={0}
              >
                حفظ الجرد
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
                size="small"
                aria-label="إضافة جرد"
                aria-hidden="false"
                tabIndex={0}
              >
                إضافة جرد
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        {/* Stocktake Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات الجرد
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>حالة الجرد</InputLabel>
                    <Select
                      value={formData.stocktakeStatus}
                      label="حالة الجرد"
                      onChange={(e) =>
                        setFormData({ ...formData, stocktakeStatus: e.target.value })
                      }
                      aria-label="حالة الجرد"
                    >
                      <MenuItem value="pending">في الانتظار</MenuItem>
                      <MenuItem value="in-progress">قيد التقدم</MenuItem>
                      <MenuItem value="completed">مكتمل</MenuItem>
                      <MenuItem value="cancelled">ملغي</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="تاريخ الجرد"
                    type="date"
                    value={formData.stocktakeDate}
                    onChange={(e) => setFormData({ ...formData, stocktakeDate: e.target.value })}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    aria-label="تاريخ الجرد"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      />
                    }
                    label="الجرد نشط"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>المستودع</InputLabel>
                    <Select
                      value={formData.warehouse}
                      label="المستودع"
                      onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                      aria-label="المستودع"
                    >
                      {warehouses.map((warehouse) => (
                        <MenuItem key={warehouse} value={warehouse}>
                          {warehouse}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>الأولوية</InputLabel>
                    <Select
                      value={formData.priority}
                      label="الأولوية"
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      aria-label="الأولوية"
                    >
                      {priorities.map((priority) => (
                        <MenuItem key={priority} value={priority}>
                          {priority}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="المدة المتوقعة (ساعة)"
                    type="number"
                    value={formData.estimatedDuration}
                    onChange={(e) =>
                      setFormData({ ...formData, estimatedDuration: parseInt(e.target.value) || 0 })
                    }
                    size="small"
                    placeholder="أدخل المدة المتوقعة"
                    aria-label="المدة المتوقعة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الوصف"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    size="small"
                    multiline
                    rows={3}
                    placeholder="وصف الجرد..."
                    aria-label="الوصف"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Stocktake Table */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ width: '100%', overflow: 'auto' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="h6">قائمة الجرد</Typography>
                <Chip label={`${filteredData.length} جرد`} color="primary" size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />

              {loading ? (
                <Box sx={{ p: 2 }}>
                  {[...Array(3)].map((_, index) => (
                    <Skeleton key={index} height={60} sx={{ mb: 1 }} />
                  ))}
                </Box>
              ) : (
                <>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedItems.length === filteredData.length}
                            onChange={handleSelectAll}
                          />
                        </TableCell>
                        <TableCell>رقم الجرد</TableCell>
                        <TableCell>العنوان</TableCell>
                        <TableCell>المستودع</TableCell>
                        <TableCell>الحالة</TableCell>
                        <TableCell>التقدم</TableCell>
                        <TableCell>الإجراءات</TableCell>
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
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                  {item.stocktakeNumber}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {item.items} عنصر
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ maxWidth: 200 }}>
                                {item.title}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{item.warehouse}</Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={item.status}
                                size="small"
                                color={getStatusColor(item.status)}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ minWidth: 100 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={(item.countedItems / item.items) * 100}
                                  sx={{ mb: 1 }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                  {item.countedItems}/{item.items} (
                                  {Math.round((item.countedItems / item.items) * 100)}%)
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={1}>
                                <Tooltip title="عرض">
                                  <IconButton size="small" onClick={() => handleView(item)}>
                                    <ViewIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="تعديل">
                                  <IconButton size="small" onClick={() => handleEdit(item)}>
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="حذف">
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
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedStocktake ? 'تعديل الجرد' : 'إضافة جرد جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الجرد"
                value={selectedStocktake?.stocktakeNumber || ''}
                placeholder="أدخل رقم الجرد"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="عنوان الجرد"
                value={selectedStocktake?.title || ''}
                placeholder="أدخل عنوان الجرد"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>المستودع</InputLabel>
                <Select label="المستودع">
                  {warehouses.map((warehouse) => (
                    <MenuItem key={warehouse} value={warehouse}>
                      {warehouse}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة">
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الأولوية</InputLabel>
                <Select label="الأولوية">
                  {priorities.map((priority) => (
                    <MenuItem key={priority} value={priority}>
                      {priority}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="عدد العناصر"
                type="number"
                value={selectedStocktake?.items || 0}
                placeholder="أدخل عدد العناصر"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="تاريخ البداية"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="تاريخ النهاية"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الوصف"
                multiline
                rows={3}
                value={selectedStocktake?.description || ''}
                placeholder="أدخل وصف الجرد"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="ملاحظات"
                multiline
                rows={2}
                value={selectedStocktake?.notes || ''}
                placeholder="أدخل ملاحظات إضافية"
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
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>تفاصيل الجرد</DialogTitle>
        <DialogContent>
          {selectedStocktake && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {selectedStocktake.title}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  رقم الجرد: {selectedStocktake.stocktakeNumber}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  المستودع: {selectedStocktake.warehouse}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  الحالة: {selectedStocktake.status}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  الأولوية: {selectedStocktake.priority}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  العناصر: {selectedStocktake.items}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  المعدود: {selectedStocktake.countedItems}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  الاختلافات: {selectedStocktake.discrepancies}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  أنشأه: {selectedStocktake.createdBy}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  تاريخ الإنشاء: {selectedStocktake.createdAt}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  تاريخ الإكمال: {selectedStocktake.completedAt || 'لم يكتمل بعد'}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" color="text.secondary">
                  الوصف: {selectedStocktake.description}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" color="text.secondary">
                  الملاحظات: {selectedStocktake.notes}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>إغلاق</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          <Typography>
            هل أنت متأكد من حذف الجرد "{selectedStocktake?.title}"؟ هذا الإجراء لا يمكن التراجع عنه.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>إلغاء</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Stocktakes;
