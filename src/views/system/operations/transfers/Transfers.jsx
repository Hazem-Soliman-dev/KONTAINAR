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
  IconButton,
  Checkbox,
  LinearProgress,
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
  SwapHoriz as SwapHorizIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  LocalShipping as LocalShippingIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Store as StoreIcon,
  Assessment as AssessmentIcon,
  Person as PersonIcon,
  DateRange as DateRangeIcon,
} from '@mui/icons-material';

const Transfers = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [warehouseFilter, setWarehouseFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [formData, setFormData] = useState({
    title: 'إدارة التحويلات',
    content: '',
    isActive: true,
    transferStatus: 'pending',
    transferDate: new Date().toISOString().split('T')[0],
    transferFrom: '',
    transferTo: '',
    lastUpdated: new Date().toISOString().split('T')[0],
    reason: '',
    priority: 'متوسط',
    items: [],
  });

  // بيانات وهمية شاملة للتحويلات
  const transfersData = [
    {
      id: 1,
      transferNumber: 'TRF-001',
      fromWarehouse: 'المستودع الرئيسي',
      toWarehouse: 'مستودع الأجهزة',
      status: 'مكتمل',
      priority: 'عالي',
      items: 5,
      totalValue: 1250.0,
      createdBy: 'أحمد محمد',
      createdAt: '2024-01-15',
      completedAt: '2024-01-15',
      reason: 'إعادة توزيع المخزون',
      notes: 'تحويل مكتمل بنجاح',
      itemsList: [
        { name: 'سماعات لاسلكية', qty: 10, value: 450.0 },
        { name: 'ساعة ذكية', qty: 5, value: 800.0 },
      ],
    },
    {
      id: 2,
      transferNumber: 'TRF-002',
      fromWarehouse: 'مستودع الإلكترونيات',
      toWarehouse: 'المستودع الرئيسي',
      status: 'قيد التقدم',
      priority: 'متوسط',
      items: 3,
      totalValue: 750.0,
      createdBy: 'فاطمة علي',
      createdAt: '2024-01-14',
      completedAt: null,
      reason: 'طلب العميل',
      notes: 'تحويل قيد التنفيذ',
      itemsList: [
        { name: 'لوحة مفاتيح', qty: 15, value: 450.0 },
        { name: 'فأرة لاسلكية', qty: 20, value: 300.0 },
      ],
    },
    {
      id: 3,
      transferNumber: 'TRF-003',
      fromWarehouse: 'المستودع الرئيسي',
      toWarehouse: 'مستودع التخزين البارد',
      status: 'في الانتظار',
      priority: 'منخفض',
      items: 2,
      totalValue: 300.0,
      createdBy: 'محمد عبدالله',
      createdAt: '2024-01-13',
      completedAt: null,
      reason: 'تخزين مؤقت',
      notes: 'في انتظار الموافقة',
      itemsList: [{ name: 'ماكينة قهوة', qty: 2, value: 300.0 }],
    },
    {
      id: 4,
      transferNumber: 'TRF-004',
      fromWarehouse: 'مستودع الأجهزة',
      toWarehouse: 'مستودع الإلكترونيات',
      status: 'ملغي',
      priority: 'متوسط',
      items: 1,
      totalValue: 150.0,
      createdBy: 'نورا السعيد',
      createdAt: '2024-01-12',
      completedAt: null,
      reason: 'طلب ملغي',
      notes: 'تم إلغاء التحويل',
      itemsList: [{ name: 'جهاز تحكم', qty: 1, value: 150.0 }],
    },
    {
      id: 5,
      transferNumber: 'TRF-005',
      fromWarehouse: 'المستودع الرئيسي',
      toWarehouse: 'مستودع الإلكترونيات',
      status: 'مكتمل',
      priority: 'عالي',
      items: 8,
      totalValue: 2000.0,
      createdBy: 'خالد أحمد',
      createdAt: '2024-01-11',
      completedAt: '2024-01-11',
      reason: 'إعادة توزيع',
      notes: 'تحويل مكتمل',
      itemsList: [
        { name: 'سماعات لاسلكية', qty: 20, value: 900.0 },
        { name: 'ساعة ذكية', qty: 10, value: 1100.0 },
      ],
    },
  ];

  const warehouses = [
    'المستودع الرئيسي',
    'مستودع الأجهزة',
    'مستودع الإلكترونيات',
    'مستودع التخزين البارد',
  ];
  const priorities = ['عالي', 'متوسط', 'منخفض'];
  const statuses = ['في الانتظار', 'قيد التقدم', 'مكتمل', 'ملغي'];

  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'عملية التحويل',
      content: 'إدارة تحويلات المخزون بين المستودعات والمواقع مع التتبع التفصيلي.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'قواعد التحويل',
      content: 'تكوين قواعد التحويل وسير عمل الموافقة مع التنبيهات التلقائية.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'تتبع التحويل',
      content: 'تتبع تقدم وحالة التحويل مع التقارير التفصيلية.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'تحليلات التحويل',
      content: 'عرض أداء وتحليلات التحويل مع الرسوم البيانية.',
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
        message: 'تم تحديث إعدادات التحويل بنجاح',
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
      setSnackbar({ open: true, message: 'تم تحديث التحويلات بنجاح', severity: 'success' });
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
      message: `تم ${action} لـ ${selectedItems.length} تحويل`,
      severity: 'success',
    });
    setSelectedItems([]);
  };

  const handleView = (transfer) => {
    setSelectedTransfer(transfer);
    setOpenViewDialog(true);
  };

  const handleEdit = (transfer) => {
    setSelectedTransfer(transfer);
    setOpenDialog(true);
  };

  const handleDelete = (transfer) => {
    setSelectedTransfer(transfer);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      setSnackbar({ open: true, message: 'تم حذف التحويل بنجاح', severity: 'success' });
    }, 1000);
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

  const filteredData = transfersData.filter((item) => {
    const matchesSearch =
      item.transferNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fromWarehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.toWarehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesWarehouse =
      warehouseFilter === 'all' ||
      item.fromWarehouse === warehouseFilter ||
      item.toWarehouse === warehouseFilter;
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
    <Box sx={{ p: 1 }} role="main" aria-label="إدارة التحويلات" aria-hidden="false" tabIndex={0}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              إدارة التحويلات
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة تحويلات المخزون بين المستودعات والمواقع مع التتبع التفصيلي والتحليلات المتقدمة
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
              <Typography color="text.primary">التحويلات</Typography>
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
              aria-label="إضافة تحويل جديد"
              aria-hidden="false"
              tabIndex={0}
            >
              إضافة تحويل
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
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, justifyContent: 'center' }}>
                    <SwapHorizIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  {transfersData.length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  إجمالي التحويلات
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
                  <Avatar sx={{ bgcolor: 'success.main', width: 48, height: 48, justifyContent: 'center' }}>
                    <CheckCircleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                  {transfersData.filter((item) => item.status === 'مكتمل').length}
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
                  <Avatar sx={{ bgcolor: 'warning.main', width: 48, height: 48, justifyContent: 'center' }}>
                    <LocalShippingIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  {transfersData.filter((item) => item.status === 'قيد التقدم').length}
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
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48, justifyContent: 'center' }}>
                    <ScheduleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                  {transfersData.filter((item) => item.status === 'في الانتظار').length}
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
              label="البحث في التحويلات"
              size="small"
              placeholder="البحث في التحويلات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              aria-label="البحث في التحويلات"
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
                aria-label="حفظ التحويل"
                aria-hidden="false"
                tabIndex={0}
              >
                حفظ التحويل
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
                size="small"
                aria-label="إضافة تحويل"
                aria-hidden="false"
                tabIndex={0}
              >
                إضافة تحويل
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        {/* Transfer Table */}
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
                <Typography variant="h6">قائمة التحويلات</Typography>
                <Chip label={`${filteredData.length} تحويل`} color="primary" size="small" />
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
                        <TableCell>رقم التحويل</TableCell>
                        <TableCell>من</TableCell>
                        <TableCell>إلى</TableCell>
                        <TableCell>الحالة</TableCell>
                        <TableCell>الأولوية</TableCell>
                        <TableCell>القيمة</TableCell>
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
                                  {item.transferNumber}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {item.items} عنصر
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{item.fromWarehouse}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{item.toWarehouse}</Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={item.status}
                                size="small"
                                color={getStatusColor(item.status)}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={item.priority}
                                size="small"
                                color={getPriorityColor(item.priority)}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">${item.totalValue.toFixed(2)}</Typography>
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
        
        {/* Transfer Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات التحويل
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>حالة التحويل</InputLabel>
                    <Select
                      value={formData.transferStatus}
                      label="حالة التحويل"
                      onChange={(e) => setFormData({ ...formData, transferStatus: e.target.value })}
                      aria-label="حالة التحويل"
                    >
                      <MenuItem value="pending">في الانتظار</MenuItem>
                      <MenuItem value="approved">موافق عليه</MenuItem>
                      <MenuItem value="completed">مكتمل</MenuItem>
                      <MenuItem value="cancelled">ملغي</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="تاريخ التحويل"
                    type="date"
                    value={formData.transferDate}
                    onChange={(e) => setFormData({ ...formData, transferDate: e.target.value })}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    aria-label="تاريخ التحويل"
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
                    label="التحويل نشط"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>التحويل من</InputLabel>
                    <Select
                      value={formData.transferFrom}
                      label="التحويل من"
                      onChange={(e) => setFormData({ ...formData, transferFrom: e.target.value })}
                      aria-label="التحويل من"
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
                    <InputLabel>التحويل إلى</InputLabel>
                    <Select
                      value={formData.transferTo}
                      label="التحويل إلى"
                      onChange={(e) => setFormData({ ...formData, transferTo: e.target.value })}
                      aria-label="التحويل إلى"
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
                    label="سبب التحويل"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    size="small"
                    placeholder="سبب التحويل..."
                    aria-label="سبب التحويل"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedTransfer ? 'تعديل التحويل' : 'إضافة تحويل جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم التحويل"
                value={selectedTransfer?.transferNumber || ''}
                placeholder="أدخل رقم التحويل"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>التحويل من</InputLabel>
                <Select label="التحويل من">
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
                <InputLabel>التحويل إلى</InputLabel>
                <Select label="التحويل إلى">
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
                label="تاريخ التحويل"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="سبب التحويل"
                value={selectedTransfer?.reason || ''}
                placeholder="أدخل سبب التحويل"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="ملاحظات"
                multiline
                rows={3}
                value={selectedTransfer?.notes || ''}
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
        <DialogTitle>تفاصيل التحويل</DialogTitle>
        <DialogContent>
          {selectedTransfer && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {selectedTransfer.transferNumber}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  من: {selectedTransfer.fromWarehouse}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  إلى: {selectedTransfer.toWarehouse}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  الحالة: {selectedTransfer.status}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  الأولوية: {selectedTransfer.priority}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  العناصر: {selectedTransfer.items}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  القيمة: ${selectedTransfer.totalValue.toFixed(2)}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  أنشأه: {selectedTransfer.createdBy}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  التاريخ: {selectedTransfer.createdAt}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" color="text.secondary">
                  السبب: {selectedTransfer.reason}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" color="text.secondary">
                  الملاحظات: {selectedTransfer.notes}
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
            هل أنت متأكد من حذف التحويل "{selectedTransfer?.transferNumber}"؟ هذا الإجراء لا يمكن
            التراجع عنه.
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

export default Transfers;
