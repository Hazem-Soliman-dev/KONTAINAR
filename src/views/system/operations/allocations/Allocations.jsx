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
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Store as StoreIcon,
  Assessment as AssessmentIcon,
  Person as PersonIcon,
  DateRange as DateRangeIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';

const Allocations = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedAllocation, setSelectedAllocation] = useState(null);
  const [formData, setFormData] = useState({
    title: 'إدارة التخصيصات',
    content: '',
    isActive: true,
    allocationStatus: 'pending',
    allocationDate: new Date().toISOString().split('T')[0],
    allocationType: '',
    lastUpdated: new Date().toISOString().split('T')[0],
    assignedTo: '',
    department: '',
    priority: 'متوسط',
    description: '',
  });

  // بيانات وهمية شاملة للتخصيصات
  const allocationsData = [
    {
      id: 1,
      allocationNumber: 'ALL-001',
      title: 'تخصيص موارد تطوير',
      type: 'مشروع',
      status: 'مكتمل',
      priority: 'عالي',
      assignedTo: 'أحمد محمد',
      department: 'تطوير البرمجيات',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      budget: 50000.0,
      usedBudget: 45000.0,
      progress: 90,
      description: 'تخصيص موارد لتطوير نظام إدارة المخزون',
      notes: 'تم التخصيص بنجاح',
      resources: [
        { name: 'مطور أول', hours: 40, cost: 2000.0 },
        { name: 'مصمم واجهات', hours: 30, cost: 1500.0 },
      ],
    },
    {
      id: 2,
      allocationNumber: 'ALL-002',
      title: 'تخصيص موارد تسويق',
      type: 'حملة',
      status: 'قيد التقدم',
      priority: 'متوسط',
      assignedTo: 'فاطمة علي',
      department: 'التسويق',
      startDate: '2024-01-14',
      endDate: '2024-01-25',
      budget: 25000.0,
      usedBudget: 15000.0,
      progress: 60,
      description: 'تخصيص موارد لحملة تسويقية جديدة',
      notes: 'التخصيص قيد التنفيذ',
      resources: [
        { name: 'مدير تسويق', hours: 20, cost: 1000.0 },
        { name: 'مصمم جرافيك', hours: 25, cost: 1250.0 },
      ],
    },
    {
      id: 3,
      allocationNumber: 'ALL-003',
      title: 'تخصيص موارد مبيعات',
      type: 'فريق',
      status: 'في الانتظار',
      priority: 'منخفض',
      assignedTo: 'محمد عبدالله',
      department: 'المبيعات',
      startDate: '2024-01-13',
      endDate: '2024-01-30',
      budget: 30000.0,
      usedBudget: 0.0,
      progress: 0,
      description: 'تخصيص موارد لفريق المبيعات الجديد',
      notes: 'في انتظار الموافقة',
      resources: [
        { name: 'مدير مبيعات', hours: 0, cost: 0.0 },
        { name: 'مندوب مبيعات', hours: 0, cost: 0.0 },
      ],
    },
    {
      id: 4,
      allocationNumber: 'ALL-004',
      title: 'تخصيص موارد تدريب',
      type: 'برنامج',
      status: 'ملغي',
      priority: 'متوسط',
      assignedTo: 'نورا السعيد',
      department: 'الموارد البشرية',
      startDate: '2024-01-12',
      endDate: '2024-01-18',
      budget: 15000.0,
      usedBudget: 5000.0,
      progress: 33,
      description: 'تخصيص موارد لبرنامج تدريبي',
      notes: 'تم إلغاء التخصيص',
      resources: [{ name: 'مدرب', hours: 10, cost: 500.0 }],
    },
    {
      id: 5,
      allocationNumber: 'ALL-005',
      title: 'تخصيص موارد صيانة',
      type: 'صيانة',
      status: 'مكتمل',
      priority: 'عالي',
      assignedTo: 'خالد أحمد',
      department: 'الصيانة',
      startDate: '2024-01-11',
      endDate: '2024-01-15',
      budget: 10000.0,
      usedBudget: 9500.0,
      progress: 100,
      description: 'تخصيص موارد لصيانة المعدات',
      notes: 'تم التخصيص بنجاح',
      resources: [
        { name: 'فني صيانة', hours: 40, cost: 800.0 },
        { name: 'قطع غيار', hours: 0, cost: 8700.0 },
      ],
    },
  ];

  const departments = [
    'تطوير البرمجيات',
    'التسويق',
    'المبيعات',
    'الموارد البشرية',
    'الصيانة',
    'المحاسبة',
  ];
  const types = ['مشروع', 'حملة', 'فريق', 'برنامج', 'صيانة', 'تدريب'];
  const statuses = ['في الانتظار', 'قيد التقدم', 'مكتمل', 'ملغي'];
  const priorities = ['عالي', 'متوسط', 'منخفض'];

  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'عملية التخصيص',
      content: 'إدارة تخصيصات وتعيينات المخزون مع سير العمل المؤتمت والتتبع التفصيلي.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'قواعد التخصيص',
      content: 'تكوين قواعد وسياسات التخصيص مع التنبيهات التلقائية والموافقات.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'تتبع التخصيص',
      content: 'تتبع تقدم وحالة التخصيص مع التقارير التفصيلية والتحليلات.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'تحليلات التخصيص',
      content: 'عرض أداء وتحليلات التخصيص مع الرسوم البيانية والتقارير.',
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
        message: 'تم تحديث إعدادات التخصيص بنجاح',
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
        message: 'تم تحديث التخصيصات بنجاح',
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
      message: `تم ${action} لـ ${selectedItems.length} تخصيص`,
      severity: 'success',
    });
    setSelectedItems([]);
  };

  const handleView = (allocation) => {
    setSelectedAllocation(allocation);
    setOpenViewDialog(true);
  };

  const handleEdit = (allocation) => {
    setSelectedAllocation(allocation);
    setOpenDialog(true);
  };

  const handleDelete = (allocation) => {
    setSelectedAllocation(allocation);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      setSnackbar({ open: true, message: 'تم حذف التخصيص بنجاح', severity: 'success' });
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

  const filteredData = allocationsData.filter((item) => {
    const matchesSearch =
      item.allocationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType =
      typeFilter === 'all' || item.type.toLowerCase() === typeFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesType;
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
    <Box sx={{ p: 1 }} role="main" aria-label="إدارة التخصيصات" aria-hidden="false" tabIndex={0}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              إدارة التخصيصات
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة تخصيصات وتعيينات المخزون مع سير العمل المؤتمت والتحليلات المتقدمة
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
              <Typography color="text.primary">التخصيصات</Typography>
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
              aria-label="إضافة تخصيص جديد"
              aria-hidden="false"
              tabIndex={0}
            >
              إضافة تخصيص
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
                    <AssignmentIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  {allocationsData.length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  إجمالي التخصيصات
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
                  {allocationsData.filter((item) => item.status === 'مكتمل').length}
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
                    <ScheduleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  {allocationsData.filter((item) => item.status === 'قيد التقدم').length}
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
                    <PeopleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                  {allocationsData.filter((item) => item.status === 'في الانتظار').length}
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
              label="البحث في التخصيصات"
              size="small"
              placeholder="البحث في التخصيصات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              aria-label="البحث في التخصيصات"
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
              <InputLabel>النوع</InputLabel>
              <Select
                value={typeFilter}
                label="النوع"
                onChange={(e) => setTypeFilter(e.target.value)}
                aria-label="فلتر النوع"
              >
                <MenuItem value="all">جميع الأنواع</MenuItem>
                {types.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
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
                setTypeFilter('all');
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
                aria-label="حفظ التخصيص"
                aria-hidden="false"
                tabIndex={0}
              >
                حفظ التخصيص
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
                size="small"
                aria-label="إضافة تخصيص"
                aria-hidden="false"
                tabIndex={0}
              >
                إضافة تخصيص
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        

        {/* Allocation Table */}
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
                <Typography variant="h6">قائمة التخصيصات</Typography>
                <Chip label={`${filteredData.length} تخصيص`} color="primary" size="small" />
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
                        <TableCell>رقم التخصيص</TableCell>
                        <TableCell>العنوان</TableCell>
                        <TableCell>النوع</TableCell>
                        <TableCell>الحالة</TableCell>
                        <TableCell>المخصص إليه</TableCell>
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
                                  {item.allocationNumber}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {item.department}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ maxWidth: 200 }}>
                                {item.title}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={item.type}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={item.status}
                                size="small"
                                color={getStatusColor(item.status)}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}>
                                  {item.assignedTo.charAt(0)}
                                </Avatar>
                                <Typography variant="body2">{item.assignedTo}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ width: '100%', mr: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={item.progress}
                                    sx={{ height: 6, borderRadius: 3 }}
                                  />
                                </Box>
                                <Typography variant="body2" sx={{ minWidth: 35 }}>
                                  {item.progress}%
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

        {/* Allocation Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات التخصيص
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>حالة التخصيص</InputLabel>
                    <Select
                      value={formData.allocationStatus}
                      label="حالة التخصيص"
                      onChange={(e) =>
                        setFormData({ ...formData, allocationStatus: e.target.value })
                      }
                      aria-label="حالة التخصيص"
                    >
                      <MenuItem value="pending">في الانتظار</MenuItem>
                      <MenuItem value="allocated">مخصص</MenuItem>
                      <MenuItem value="completed">مكتمل</MenuItem>
                      <MenuItem value="cancelled">ملغي</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="تاريخ التخصيص"
                    type="date"
                    value={formData.allocationDate}
                    onChange={(e) => setFormData({ ...formData, allocationDate: e.target.value })}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    aria-label="تاريخ التخصيص"
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
                    label="التخصيص نشط"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>نوع التخصيص</InputLabel>
                    <Select
                      value={formData.allocationType}
                      label="نوع التخصيص"
                      onChange={(e) => setFormData({ ...formData, allocationType: e.target.value })}
                      aria-label="نوع التخصيص"
                    >
                      {types.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>المخصص إليه</InputLabel>
                    <Select
                      value={formData.assignedTo}
                      label="المخصص إليه"
                      onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                      aria-label="المخصص إليه"
                    >
                      <MenuItem value="أحمد محمد">أحمد محمد</MenuItem>
                      <MenuItem value="فاطمة علي">فاطمة علي</MenuItem>
                      <MenuItem value="محمد عبدالله">محمد عبدالله</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>القسم</InputLabel>
                    <Select
                      value={formData.department}
                      label="القسم"
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      aria-label="القسم"
                    >
                      {departments.map((department) => (
                        <MenuItem key={department} value={department}>
                          {department}
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
                    label="الوصف"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    size="small"
                    multiline
                    rows={3}
                    placeholder="وصف التخصيص..."
                    aria-label="الوصف"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedAllocation ? 'تعديل التخصيص' : 'إضافة تخصيص جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم التخصيص"
                value={selectedAllocation?.allocationNumber || ''}
                placeholder="أدخل رقم التخصيص"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="عنوان التخصيص"
                value={selectedAllocation?.title || ''}
                placeholder="أدخل عنوان التخصيص"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>النوع</InputLabel>
                <Select label="النوع">
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
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
                <InputLabel>المخصص إليه</InputLabel>
                <Select label="المخصص إليه">
                  <MenuItem value="أحمد محمد">أحمد محمد</MenuItem>
                  <MenuItem value="فاطمة علي">فاطمة علي</MenuItem>
                  <MenuItem value="محمد عبدالله">محمد عبدالله</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>القسم</InputLabel>
                <Select label="القسم">
                  {departments.map((department) => (
                    <MenuItem key={department} value={department}>
                      {department}
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
                label="الميزانية"
                type="number"
                value={selectedAllocation?.budget || 0}
                placeholder="أدخل الميزانية"
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
                value={selectedAllocation?.description || ''}
                placeholder="أدخل وصف التخصيص"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="ملاحظات"
                multiline
                rows={2}
                value={selectedAllocation?.notes || ''}
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
        <DialogTitle>تفاصيل التخصيص</DialogTitle>
        <DialogContent>
          {selectedAllocation && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {selectedAllocation.title}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  رقم التخصيص: {selectedAllocation.allocationNumber}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  النوع: {selectedAllocation.type}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  الحالة: {selectedAllocation.status}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  الأولوية: {selectedAllocation.priority}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  المخصص إليه: {selectedAllocation.assignedTo}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  القسم: {selectedAllocation.department}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  الميزانية: ${selectedAllocation.budget.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  المستخدم: ${selectedAllocation.usedBudget.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  التقدم: {selectedAllocation.progress}%
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  تاريخ البداية: {selectedAllocation.startDate}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  تاريخ النهاية: {selectedAllocation.endDate}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" color="text.secondary">
                  الوصف: {selectedAllocation.description}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" color="text.secondary">
                  الملاحظات: {selectedAllocation.notes}
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
            هل أنت متأكد من حذف التخصيص "{selectedAllocation?.title}"؟ هذا الإجراء لا يمكن التراجع
            عنه.
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

export default Allocations;
