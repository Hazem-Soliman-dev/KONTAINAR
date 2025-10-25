import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  Snackbar,
  Alert,
  Skeleton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  LinearProgress,
  Stack,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Divider,
  Switch,
  FormControlLabel,
  Checkbox,
  TableSortLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Assessment as AssessmentIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Analytics as AnalyticsIcon,
  AttachMoney as AttachMoneyIcon,
  Star as StarIcon,
  ThumbUp as ThumbUpIcon,
  ShoppingCart as ShoppingCartIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const CustomerReports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [dateFrom, setDateFrom] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  );
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [reportType, setReportType] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('reportDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // بيانات وهمية شاملة ومحسنة لتقارير العملاء
  const customerData = [
    {
      id: 1,
      reportDate: '2024-01-15',
      customerName: 'أحمد محمد السعيد',
      customerId: 'CUST-001',
      email: 'ahmed.mohamed@email.com',
      phone: '+966501234567',
      totalOrders: 15,
      totalSpent: 12500,
      avgOrderValue: 833.33,
      lastOrderDate: '2024-01-14',
      customerLifetime: 180,
      satisfactionScore: 4.8,
      loyaltyLevel: 'VIP',
      region: 'الرياض',
      ageGroup: '25-35',
      gender: 'ذكر',
      status: 'نشط',
      priority: 'عالي',
      manager: 'سارة أحمد',
      notes: 'عميل ممتاز، يوصى بالاهتمام الخاص',
    },
    {
      id: 2,
      reportDate: '2024-01-14',
      customerName: 'فاطمة علي الخالدي',
      customerId: 'CUST-002',
      email: 'fatima.ali@email.com',
      phone: '+966502345678',
      totalOrders: 8,
      totalSpent: 6800,
      avgOrderValue: 850.0,
      lastOrderDate: '2024-01-12',
      customerLifetime: 120,
      satisfactionScore: 4.5,
      loyaltyLevel: 'مميز',
      region: 'جدة',
      ageGroup: '30-40',
      gender: 'أنثى',
      status: 'نشط',
      priority: 'متوسط',
      manager: 'محمد علي',
      notes: 'عميلة جيدة، تحتاج متابعة',
    },
    {
      id: 3,
      reportDate: '2024-01-13',
      customerName: 'عبدالله سعد القحطاني',
      customerId: 'CUST-003',
      email: 'abdullah.saad@email.com',
      phone: '+966503456789',
      totalOrders: 3,
      totalSpent: 2100,
      avgOrderValue: 700.0,
      lastOrderDate: '2024-01-08',
      customerLifetime: 45,
      satisfactionScore: 3.2,
      loyaltyLevel: 'عادي',
      region: 'الدمام',
      ageGroup: '20-30',
      gender: 'ذكر',
      status: 'خامل',
      priority: 'منخفض',
      manager: 'نورا محمد',
      notes: 'عميل جديد، يحتاج تحفيز',
    },
    {
      id: 4,
      reportDate: '2024-01-12',
      customerName: 'مريم حسن الشمري',
      customerId: 'CUST-004',
      email: 'mariam.hassan@email.com',
      phone: '+966504567890',
      totalOrders: 22,
      totalSpent: 18500,
      avgOrderValue: 840.91,
      lastOrderDate: '2024-01-11',
      customerLifetime: 365,
      satisfactionScore: 4.9,
      loyaltyLevel: 'VIP',
      region: 'الرياض',
      ageGroup: '35-45',
      gender: 'أنثى',
      status: 'نشط',
      priority: 'عالي',
      manager: 'أحمد محمد',
      notes: 'أفضل عميلة، نموذج للعملاء الآخرين',
    },
    {
      id: 5,
      reportDate: '2024-01-11',
      customerName: 'خالد عبدالرحمن المطيري',
      customerId: 'CUST-005',
      email: 'khalid.abdulrahman@email.com',
      phone: '+966505678901',
      totalOrders: 1,
      totalSpent: 450,
      avgOrderValue: 450.0,
      lastOrderDate: '2024-01-05',
      customerLifetime: 15,
      satisfactionScore: 2.8,
      loyaltyLevel: 'جديد',
      region: 'مكة',
      ageGroup: '18-25',
      gender: 'ذكر',
      status: 'معلق',
      priority: 'منخفض',
      manager: 'فاطمة أحمد',
      notes: 'عميل جديد، يحتاج متابعة واهتمام',
    },
  ];

  const reportTypes = ['يومي', 'أسبوعي', 'شهري', 'ربعي', 'سنوي'];
  const statusOptions = ['نشط', 'خامل', 'معلق', 'معطل', 'قيد المراجعة'];
  const priorityOptions = ['عالي', 'متوسط', 'منخفض'];
  const regionOptions = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'];
  const loyaltyLevelOptions = ['جديد', 'عادي', 'مميز', 'VIP', 'ماسي'];
  const ageGroupOptions = ['18-25', '25-35', '35-45', '45-55', '55+'];
  const genderOptions = ['ذكر', 'أنثى'];

  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'تحليل سلوك العملاء',
      content: 'تحليل وتتبع سلوك العملاء وأنماط الشراء.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'تحسين تجربة العملاء',
      content: 'تحسين تجربة العملاء وزيادة الرضا.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'تتبع ولاء العملاء',
      content: 'تتبع وتحليل ولاء العملاء وبرامج المكافآت.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'تحليل شكاوى العملاء',
      content: 'تحليل شكاوى العملاء وتحسين الخدمة.',
      isExpanded: false,
    },
  ]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const notify = useCallback((action, details) => {
    setSnackbar({
      open: true,
      message: `تم تنفيذ: ${action} - ${details}`,
      severity: 'success',
    });
  }, []);

  const handleExport = useCallback(() => {
    notify('تصدير تقرير العملاء', 'تم تصدير تقرير العملاء بنجاح');
  }, [notify]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      notify('تحديث البيانات', 'تم تحديث بيانات العملاء بنجاح');
    }, 1000);
  }, [notify]);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleSelectAll = useCallback(
    (event) => {
      if (event.target.checked) {
        setSelectedItems(customerData.map((item) => item.id));
      } else {
        setSelectedItems([]);
      }
    },
    [customerData],
  );

  const handleSelectItem = useCallback(
    (id) => {
      if (selectedItems.includes(id)) {
        setSelectedItems(selectedItems.filter((item) => item !== id));
      } else {
        setSelectedItems([...selectedItems, id]);
      }
    },
    [selectedItems],
  );

  const handleView = useCallback((report) => {
    setSelectedReport(report);
    setOpenViewDialog(true);
  }, []);

  const handleEdit = useCallback((report) => {
    setSelectedReport(report);
    setOpenEditDialog(true);
  }, []);

  const handleDelete = useCallback(
    (report) => {
      notify('حذف تقرير العميل', `تم حذف تقرير العميل ${report.customerName} بنجاح`);
    },
    [notify],
  );

  const handleSort = useCallback(
    (property) => {
      const isAsc = sortBy === property && sortOrder === 'asc';
      setSortOrder(isAsc ? 'desc' : 'asc');
      setSortBy(property);
    },
    [sortBy, sortOrder],
  );

  const handleAddSection = useCallback(() => {
    const newSection = {
      id: sections.length + 1,
      title: 'قسم جديد',
      content: 'وصف القسم الجديد...',
      isExpanded: false,
    };
    setSections([...sections, newSection]);
  }, [sections]);

  const handleDeleteSection = useCallback(
    (id) => {
      setSections(sections.filter((section) => section.id !== id));
    },
    [sections],
  );

  const handleSectionChange = useCallback(
    (id, field, value) => {
      setSections(
        sections.map((section) => (section.id === id ? { ...section, [field]: value } : section)),
      );
    },
    [sections],
  );

  const handleToggleExpanded = useCallback(
    (id) => {
      setSections(
        sections.map((section) =>
          section.id === id ? { ...section, isExpanded: !section.isExpanded } : section,
        ),
      );
    },
    [sections],
  );

  const filteredData = useMemo(() => {
    return customerData.filter((item) => {
      const matchesSearch =
        item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        reportType === 'all' || item.reportDate.includes(reportType.toLowerCase());
      return matchesSearch && matchesType;
    });
  }, [customerData, searchTerm, reportType]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredData, sortBy, sortOrder]);

  const totalCustomers = useMemo(() => customerData.length, [customerData]);

  const totalRevenue = useMemo(
    () => customerData.reduce((sum, item) => sum + item.totalSpent, 0),
    [customerData],
  );

  const avgSatisfaction = useMemo(
    () => customerData.reduce((sum, item) => sum + item.satisfactionScore, 0) / customerData.length,
    [customerData],
  );

  const vipCustomers = useMemo(
    () => customerData.filter((item) => item.loyaltyLevel === 'VIP').length,
    [customerData],
  );

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'نشط':
        return 'success';
      case 'خامل':
        return 'warning';
      case 'معلق':
        return 'info';
      case 'معطل':
        return 'error';
      case 'قيد المراجعة':
        return 'default';
      default:
        return 'default';
    }
  }, []);

  const getPriorityColor = useCallback((priority) => {
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
  }, []);

  const getLoyaltyColor = useCallback((loyalty) => {
    switch (loyalty) {
      case 'VIP':
        return 'error';
      case 'مميز':
        return 'warning';
      case 'عادي':
        return 'info';
      case 'جديد':
        return 'default';
      default:
        return 'default';
    }
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* رأس الصفحة مع الإحصائيات */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              تقارير العملاء
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              تحليل أداء العملاء ومؤشرات الرضا والولاء
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mt: 1 }}>
              <Link color="inherit" href="/system" sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                لوحة التحكم
              </Link>
              <Link color="inherit" href="/system/analytics">
                التحليلات
              </Link>
              <Typography color="text.primary">تقارير العملاء</Typography>
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
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() =>
                setSnackbar({ open: true, message: 'تم تطبيق المرشحات', severity: 'success' })
              }
            >
              تطبيق المرشحات
            </Button>
            <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExport}>
              تصدير التقرير
            </Button>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
              عميل جديد
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
                    <PeopleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  {totalCustomers}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  إجمالي العملاء
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
                    <AttachMoneyIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                  ${totalRevenue.toLocaleString()}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  إجمالي الإيرادات
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
                    <StarIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  {avgSatisfaction.toFixed(1)}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  متوسط الرضا
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
                    <ThumbUpIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                  {vipCustomers}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  عملاء VIP
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* المرشحات المحسنة */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            المرشحات والبحث المتقدم
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setSearchTerm('');
              setDateFrom(
                new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              );
              setDateTo(new Date().toISOString().split('T')[0]);
              setReportType('all');
            }}
          >
            مسح المرشحات
          </Button>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في العملاء"
              size="small"
              placeholder="البحث بالاسم أو المعرف أو الإيميل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              fullWidth
              type="date"
              label="من تاريخ"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              fullWidth
              type="date"
              label="إلى تاريخ"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>نوع التقرير</InputLabel>
              <Select
                value={reportType}
                label="نوع التقرير"
                onChange={(e) => setReportType(e.target.value)}
              >
                <MenuItem value="all">جميع الأنواع</MenuItem>
                {reportTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="body2" color="text.secondary">
              تم العثور على {filteredData.length} عميل
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* المحتوى المحسن */}
      <Paper>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            تفاصيل العملاء
          </Typography>

          {loading ? (
            <Box sx={{ p: 2 }}>
              <LinearProgress />
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} height={60} sx={{ mb: 1 }} />
              ))}
            </Box>
          ) : error ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Alert severity="error">خطأ في تحميل بيانات العملاء. يرجى المحاولة مرة أخرى.</Alert>
            </Box>
          ) : filteredData.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Alert severity="info">لم يتم العثور على عملاء للفترة المحددة.</Alert>
            </Box>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selectedItems.length > 0 && selectedItems.length < customerData.length
                        }
                        checked={
                          customerData.length > 0 && selectedItems.length === customerData.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'reportDate'}
                        direction={sortBy === 'reportDate' ? sortOrder : 'asc'}
                        onClick={() => handleSort('reportDate')}
                      >
                        تاريخ التقرير
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>اسم العميل</TableCell>
                    <TableCell>معرف العميل</TableCell>
                    <TableCell>الإيميل</TableCell>
                    <TableCell align="right">عدد الطلبات</TableCell>
                    <TableCell align="right">إجمالي الإنفاق</TableCell>
                    <TableCell align="right">متوسط قيمة الطلب</TableCell>
                    <TableCell align="right">معدل الرضا</TableCell>
                    <TableCell>مستوى الولاء</TableCell>
                    <TableCell>المنطقة</TableCell>
                    <TableCell>الحالة</TableCell>
                    <TableCell>الأولوية</TableCell>
                    <TableCell align="center">الإجراءات</TableCell>
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
                          <Typography variant="body2">{item.reportDate}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.customerName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {item.customerId}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{item.email}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="subtitle2" fontWeight="bold">
                            {item.totalOrders}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" color="primary.main">
                            ${item.totalSpent.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">${item.avgOrderValue.toFixed(2)}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <StarIcon sx={{ mr: 0.5, fontSize: 16, color: 'warning.main' }} />
                            <Typography variant="body2" color="warning.main">
                              {item.satisfactionScore}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={item.loyaltyLevel}
                            color={getLoyaltyColor(item.loyaltyLevel)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip label={item.region} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={item.status}
                            color={getStatusColor(item.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={item.priority}
                            color={getPriorityColor(item.priority)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <Tooltip title="عرض التفاصيل" arrow>
                              <IconButton
                                size="small"
                                onClick={() => handleView(item)}
                                aria-label="view report"
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="تعديل التقرير" arrow>
                              <IconButton
                                size="small"
                                onClick={() => handleEdit(item)}
                                aria-label="edit report"
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف التقرير" arrow>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(item)}
                                aria-label="delete report"
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
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Box>
      </Paper>

      {/* أقسام التحليل */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="h6">عمليات تحليل العملاء</Typography>
                <Chip label={`${sections.length} عمليات`} color="primary" size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />

              {sections.map((section) => (
                <Accordion
                  key={section.id}
                  expanded={section.isExpanded}
                  onChange={() => handleToggleExpanded(section.id)}
                  sx={{ mb: 1 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <TextField
                        value={section.title}
                        onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                        size="small"
                        sx={{ flexGrow: 1, mr: 2 }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="حذف العملية">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSection(section.id);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      value={section.content}
                      onChange={(e) => handleSectionChange(section.id, 'content', e.target.value)}
                      placeholder="أدخل تفاصيل العملية..."
                      size="small"
                    />
                  </AccordionDetails>
                </Accordion>
              ))}

              {sections.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <PeopleIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    لا توجد عمليات تحليل بعد
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    أضف أول عملية تحليل للبدء
                  </Typography>
                  <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddSection}>
                    إضافة أول عملية
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات التقرير
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>حالة التقرير</InputLabel>
                    <Select value="نشط" label="حالة التقرير">
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="تاريخ التقرير"
                    type="date"
                    value={new Date().toISOString().split('T')[0]}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel control={<Switch defaultChecked />} label="التقرير نشط" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="نوع التقرير"
                    size="small"
                    placeholder="نوع التقرير..."
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog إضافة عميل جديد */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">إضافة عميل جديد</Typography>
            <IconButton onClick={() => setOpenDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم العميل"
                size="small"
                placeholder="أدخل اسم العميل..."
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="معرف العميل" size="small" placeholder="CUST-XXX" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                type="email"
                size="small"
                placeholder="example@email.com"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="رقم الهاتف" size="small" placeholder="+966501234567" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="عدد الطلبات" type="number" size="small" placeholder="0" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="إجمالي الإنفاق"
                type="number"
                size="small"
                placeholder="0.00"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>مستوى الولاء</InputLabel>
                <Select label="مستوى الولاء">
                  {loyaltyLevelOptions.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>المنطقة</InputLabel>
                <Select label="المنطقة">
                  {regionOptions.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الفئة العمرية</InputLabel>
                <Select label="الفئة العمرية">
                  {ageGroupOptions.map((age) => (
                    <MenuItem key={age} value={age}>
                      {age}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الجنس</InputLabel>
                <Select label="الجنس">
                  {genderOptions.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة">
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الأولوية</InputLabel>
                <Select label="الأولوية">
                  {priorityOptions.map((priority) => (
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
                label="ملاحظات إضافية"
                multiline
                rows={3}
                size="small"
                placeholder="أي ملاحظات أو تفاصيل إضافية..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => {
              notify('إضافة عميل جديد', 'تم إضافة العميل بنجاح');
              setOpenDialog(false);
            }}
          >
            حفظ العميل
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog عرض التفاصيل */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">تفاصيل العميل</Typography>
            <IconButton onClick={() => setOpenViewDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  اسم العميل
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {selectedReport.customerName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  معرف العميل
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                  {selectedReport.customerId}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  البريد الإلكتروني
                </Typography>
                <Typography variant="body1">{selectedReport.email}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  رقم الهاتف
                </Typography>
                <Typography variant="body1">{selectedReport.phone}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  عدد الطلبات
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {selectedReport.totalOrders}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  إجمالي الإنفاق
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  ${selectedReport.totalSpent.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  متوسط قيمة الطلب
                </Typography>
                <Typography variant="body1">${selectedReport.avgOrderValue.toFixed(2)}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  آخر طلب
                </Typography>
                <Typography variant="body1">{selectedReport.lastOrderDate}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  عمر العميل (أيام)
                </Typography>
                <Typography variant="body1">{selectedReport.customerLifetime}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  معدل الرضا
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarIcon sx={{ mr: 0.5, fontSize: 16, color: 'warning.main' }} />
                  <Typography variant="body1" color="warning.main">
                    {selectedReport.satisfactionScore}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  مستوى الولاء
                </Typography>
                <Chip
                  label={selectedReport.loyaltyLevel}
                  color={getLoyaltyColor(selectedReport.loyaltyLevel)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  المنطقة
                </Typography>
                <Chip label={selectedReport.region} size="small" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الفئة العمرية
                </Typography>
                <Typography variant="body1">{selectedReport.ageGroup}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الجنس
                </Typography>
                <Typography variant="body1">{selectedReport.gender}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  المدير المسؤول
                </Typography>
                <Typography variant="body1">{selectedReport.manager}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الحالة
                </Typography>
                <Chip
                  label={selectedReport.status}
                  color={getStatusColor(selectedReport.status)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الأولوية
                </Typography>
                <Chip
                  label={selectedReport.priority}
                  color={getPriorityColor(selectedReport.priority)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الملاحظات
                </Typography>
                <Typography variant="body1">{selectedReport.notes}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>إغلاق</Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => {
              setOpenViewDialog(false);
              setOpenEditDialog(true);
            }}
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog تعديل العميل */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">تعديل بيانات العميل</Typography>
            <IconButton onClick={() => setOpenEditDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="اسم العميل"
                  value={selectedReport.customerName}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="معرف العميل"
                  value={selectedReport.customerId}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="البريد الإلكتروني"
                  type="email"
                  value={selectedReport.email}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="رقم الهاتف" value={selectedReport.phone} size="small" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="عدد الطلبات"
                  type="number"
                  value={selectedReport.totalOrders}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="إجمالي الإنفاق"
                  type="number"
                  value={selectedReport.totalSpent}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="متوسط قيمة الطلب"
                  type="number"
                  value={selectedReport.avgOrderValue}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="معدل الرضا"
                  type="number"
                  value={selectedReport.satisfactionScore}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>مستوى الولاء</InputLabel>
                  <Select value={selectedReport.loyaltyLevel} label="مستوى الولاء">
                    {loyaltyLevelOptions.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>المنطقة</InputLabel>
                  <Select value={selectedReport.region} label="المنطقة">
                    {regionOptions.map((region) => (
                      <MenuItem key={region} value={region}>
                        {region}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>الفئة العمرية</InputLabel>
                  <Select value={selectedReport.ageGroup} label="الفئة العمرية">
                    {ageGroupOptions.map((age) => (
                      <MenuItem key={age} value={age}>
                        {age}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>الجنس</InputLabel>
                  <Select value={selectedReport.gender} label="الجنس">
                    {genderOptions.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="المدير المسؤول"
                  value={selectedReport.manager}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>الحالة</InputLabel>
                  <Select value={selectedReport.status} label="الحالة">
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>الأولوية</InputLabel>
                  <Select value={selectedReport.priority} label="الأولوية">
                    {priorityOptions.map((priority) => (
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
                  label="ملاحظات إضافية"
                  multiline
                  rows={3}
                  value={selectedReport.notes}
                  size="small"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => {
              notify('تحديث بيانات العميل', 'تم تحديث بيانات العميل بنجاح');
              setOpenEditDialog(false);
            }}
          >
            حفظ التغييرات
          </Button>
        </DialogActions>
      </Dialog>

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

export default CustomerReports;
