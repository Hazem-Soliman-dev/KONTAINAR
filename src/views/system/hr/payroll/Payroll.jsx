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
  ListItemButton,
  ListItemSecondaryAction,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
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
  AttachMoney as AttachMoneyIcon,
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
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Assessment as AssessmentIcon,
  PostAdd as PostAddIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Schedule as ScheduleIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  CalendarToday as CalendarTodayIcon,
  Badge as BadgeIcon,
  Group as GroupIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Receipt as ReceiptIcon,
  Print as PrintIcon,
  Send as SendIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const Payroll = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [monthFilter, setMonthFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRunDialog, setOpenRunDialog] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('month');
  const [sortOrder, setSortOrder] = useState('desc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for payroll
  const payrollData = [
    {
      id: 1,
      month: '2024-01',
      monthName: 'يناير 2024',
      status: 'completed',
      totalEmployees: 6,
      totalGrossSalary: 87000,
      totalDeductions: 8700,
      totalNetSalary: 78300,
      currency: 'SAR',
      createdDate: '2024-01-31',
      paidDate: '2024-02-05',
      createdBy: 'نورا علي',
      notes: 'كشف راتب شهر يناير',
      employees: [
        {
          id: 1,
          name: 'أحمد محمد السعيد',
          employeeId: 'EMP001',
          position: 'مدير تقني',
          department: 'التقنية',
          baseSalary: 15000,
          allowances: 2000,
          deductions: 1500,
          netSalary: 15500,
          status: 'paid',
        },
        {
          id: 2,
          name: 'فاطمة علي حسن',
          employeeId: 'EMP002',
          position: 'مديرة تسويق',
          department: 'التسويق',
          baseSalary: 12000,
          allowances: 1500,
          deductions: 1200,
          netSalary: 12300,
          status: 'paid',
        },
        {
          id: 3,
          name: 'محمد عبدالله سالم',
          employeeId: 'EMP003',
          position: 'محاسب',
          department: 'المحاسبة',
          baseSalary: 8000,
          allowances: 1000,
          deductions: 800,
          netSalary: 8200,
          status: 'paid',
        },
        {
          id: 4,
          name: 'سارة أحمد محمد',
          employeeId: 'EMP004',
          position: 'مديرة مبيعات',
          department: 'المبيعات',
          baseSalary: 18000,
          allowances: 3000,
          deductions: 1800,
          netSalary: 19200,
          status: 'paid',
        },
        {
          id: 5,
          name: 'خالد حسن علي',
          employeeId: 'EMP005',
          position: 'مطور',
          department: 'التقنية',
          baseSalary: 13000,
          allowances: 1500,
          deductions: 1300,
          netSalary: 13200,
          status: 'paid',
        },
        {
          id: 6,
          name: 'نورا محمد أحمد',
          employeeId: 'EMP006',
          position: 'مديرة موارد بشرية',
          department: 'الموارد البشرية',
          baseSalary: 16000,
          allowances: 2000,
          deductions: 1600,
          netSalary: 16400,
          status: 'paid',
        },
      ],
    },
    {
      id: 2,
      month: '2024-02',
      monthName: 'فبراير 2024',
      status: 'completed',
      totalEmployees: 6,
      totalGrossSalary: 87000,
      totalDeductions: 8700,
      totalNetSalary: 78300,
      currency: 'SAR',
      createdDate: '2024-02-29',
      paidDate: '2024-03-05',
      createdBy: 'نورا علي',
      notes: 'كشف راتب شهر فبراير',
      employees: [
        {
          id: 1,
          name: 'أحمد محمد السعيد',
          employeeId: 'EMP001',
          position: 'مدير تقني',
          department: 'التقنية',
          baseSalary: 15000,
          allowances: 2000,
          deductions: 1500,
          netSalary: 15500,
          status: 'paid',
        },
        {
          id: 2,
          name: 'فاطمة علي حسن',
          employeeId: 'EMP002',
          position: 'مديرة تسويق',
          department: 'التسويق',
          baseSalary: 12000,
          allowances: 1500,
          deductions: 1200,
          netSalary: 12300,
          status: 'paid',
        },
        {
          id: 3,
          name: 'محمد عبدالله سالم',
          employeeId: 'EMP003',
          position: 'محاسب',
          department: 'المحاسبة',
          baseSalary: 8000,
          allowances: 1000,
          deductions: 800,
          netSalary: 8200,
          status: 'paid',
        },
        {
          id: 4,
          name: 'سارة أحمد محمد',
          employeeId: 'EMP004',
          position: 'مديرة مبيعات',
          department: 'المبيعات',
          baseSalary: 18000,
          allowances: 3000,
          deductions: 1800,
          netSalary: 19200,
          status: 'paid',
        },
        {
          id: 5,
          name: 'خالد حسن علي',
          employeeId: 'EMP005',
          position: 'مطور',
          department: 'التقنية',
          baseSalary: 13000,
          allowances: 1500,
          deductions: 1300,
          netSalary: 13200,
          status: 'paid',
        },
        {
          id: 6,
          name: 'نورا محمد أحمد',
          employeeId: 'EMP006',
          position: 'مديرة موارد بشرية',
          department: 'الموارد البشرية',
          baseSalary: 16000,
          allowances: 2000,
          deductions: 1600,
          netSalary: 16400,
          status: 'paid',
        },
      ],
    },
    {
      id: 3,
      month: '2024-03',
      monthName: 'مارس 2024',
      status: 'pending',
      totalEmployees: 6,
      totalGrossSalary: 87000,
      totalDeductions: 8700,
      totalNetSalary: 78300,
      currency: 'SAR',
      createdDate: '2024-03-31',
      paidDate: null,
      createdBy: 'نورا علي',
      notes: 'كشف راتب شهر مارس - في انتظار الموافقة',
      employees: [
        {
          id: 1,
          name: 'أحمد محمد السعيد',
          employeeId: 'EMP001',
          position: 'مدير تقني',
          department: 'التقنية',
          baseSalary: 15000,
          allowances: 2000,
          deductions: 1500,
          netSalary: 15500,
          status: 'pending',
        },
        {
          id: 2,
          name: 'فاطمة علي حسن',
          employeeId: 'EMP002',
          position: 'مديرة تسويق',
          department: 'التسويق',
          baseSalary: 12000,
          allowances: 1500,
          deductions: 1200,
          netSalary: 12300,
          status: 'pending',
        },
        {
          id: 3,
          name: 'محمد عبدالله سالم',
          employeeId: 'EMP003',
          position: 'محاسب',
          department: 'المحاسبة',
          baseSalary: 8000,
          allowances: 1000,
          deductions: 800,
          netSalary: 8200,
          status: 'pending',
        },
        {
          id: 4,
          name: 'سارة أحمد محمد',
          employeeId: 'EMP004',
          position: 'مديرة مبيعات',
          department: 'المبيعات',
          baseSalary: 18000,
          allowances: 3000,
          deductions: 1800,
          netSalary: 19200,
          status: 'pending',
        },
        {
          id: 5,
          name: 'خالد حسن علي',
          employeeId: 'EMP005',
          position: 'مطور',
          department: 'التقنية',
          baseSalary: 13000,
          allowances: 1500,
          deductions: 1300,
          netSalary: 13200,
          status: 'pending',
        },
        {
          id: 6,
          name: 'نورا محمد أحمد',
          employeeId: 'EMP006',
          position: 'مديرة موارد بشرية',
          department: 'الموارد البشرية',
          baseSalary: 16000,
          allowances: 2000,
          deductions: 1600,
          netSalary: 16400,
          status: 'pending',
        },
      ],
    },
  ];

  const months = [
    { value: 'all', label: 'جميع الأشهر' },
    { value: '2024-01', label: 'يناير 2024' },
    { value: '2024-02', label: 'فبراير 2024' },
    { value: '2024-03', label: 'مارس 2024' },
    { value: '2024-04', label: 'أبريل 2024' },
    { value: '2024-05', label: 'مايو 2024' },
    { value: '2024-06', label: 'يونيو 2024' },
  ];

  const payrollStatuses = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'pending', label: 'في الانتظار', color: 'warning' },
    { value: 'approved', label: 'موافق عليه', color: 'info' },
    { value: 'completed', label: 'مكتمل', color: 'success' },
    { value: 'cancelled', label: 'ملغي', color: 'error' },
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
    notify(`${action} كشوف الرواتب`, `${selectedItems.length} كشف`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (payroll) => {
    setSelectedPayroll(payroll);
    setOpenViewDialog(true);
  };

  const handleEdit = (payroll) => {
    setSelectedPayroll(payroll);
    setOpenDialog(true);
  };

  const handleDelete = (payroll) => {
    setSelectedPayroll(payroll);
    setOpenDeleteDialog(true);
  };

  const handleRunPayroll = () => {
    setOpenRunDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث كشف الراتب', selectedPayroll ? 'تم تحديث كشف الراتب' : 'تم إنشاء كشف الراتب');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف كشف الراتب', 'تم حذف كشف الراتب');
    }, 1000);
  };

  const handleRunPayrollConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenRunDialog(false);
      notify('تشغيل كشف الراتب', 'تم تشغيل كشف الراتب الجديد');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير كشوف الرواتب', 'تم تصدير البيانات');
  };

  const handlePrint = (payroll) => {
    notify('طباعة كشف الراتب', `تم طباعة كشف ${payroll.monthName}`);
  };

  const handleSend = (payroll) => {
    notify('إرسال كشف الراتب', `تم إرسال كشف ${payroll.monthName}`);
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = payrollData.filter((item) => {
    const matchesSearch =
      item.monthName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = monthFilter === 'all' || item.month === monthFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesMonth && matchesStatus;
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
    const statusInfo = payrollStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = payrollStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
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

  const totalPayrolls = payrollData.length;
  const completedPayrolls = payrollData.filter((payroll) => payroll.status === 'completed').length;
  const totalGrossSalary = payrollData.reduce((sum, payroll) => sum + payroll.totalGrossSalary, 0);
  const totalNetSalary = payrollData.reduce((sum, payroll) => sum + payroll.totalNetSalary, 0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          المرتبات والأجور
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة كشوف الرواتب الشهرية مع تفاصيل الرواتب والبدلات والخصومات.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/hr">
            شؤون الموظفين
          </Link>
          <Typography color="text.primary">المرتبات والأجور</Typography>
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
                  <ReceiptIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalPayrolls}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي كشوف الرواتب
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
                  <CheckCircleIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                {completedPayrolls}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                كشوف مكتملة
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
                {formatCurrency(totalGrossSalary)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الرواتب الإجمالية
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
                  <AttachMoneyIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {formatCurrency(totalNetSalary)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الرواتب الصافية
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
                placeholder="البحث في كشوف الرواتب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الشهر</InputLabel>
                <Select
                  value={monthFilter}
                  label="الشهر"
                  onChange={(e) => setMonthFilter(e.target.value)}
                >
                  {months.map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                      {month.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الحالة</InputLabel>
                <Select
                  value={statusFilter}
                  label="الحالة"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {payrollStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
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
                  setMonthFilter('all');
                  setStatusFilter('all');
                }}
                fullWidth
              >
                إعادة تعيين
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
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
            كشوف الرواتب
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button size="small" onClick={() => handleBulkAction('تصدير')} sx={{ mr: 1 }}>
                تصدير ({selectedItems.length})
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
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleRunPayroll}>
            تشغيل كشف راتب جديد
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
            <Alert severity="error">خطأ في تحميل كشوف الرواتب. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على كشوف رواتب. أضف أول كشف راتب.</Alert>
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
                      active={sortBy === 'monthName'}
                      direction={sortBy === 'monthName' ? sortOrder : 'asc'}
                      onClick={() => handleSort('monthName')}
                    >
                      الشهر
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
                      active={sortBy === 'totalEmployees'}
                      direction={sortBy === 'totalEmployees' ? sortOrder : 'asc'}
                      onClick={() => handleSort('totalEmployees')}
                    >
                      عدد الموظفين
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'totalGrossSalary'}
                      direction={sortBy === 'totalGrossSalary' ? sortOrder : 'asc'}
                      onClick={() => handleSort('totalGrossSalary')}
                    >
                      إجمالي الرواتب
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'totalNetSalary'}
                      direction={sortBy === 'totalNetSalary' ? sortOrder : 'asc'}
                      onClick={() => handleSort('totalNetSalary')}
                    >
                      صافي الرواتب
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'createdDate'}
                      direction={sortBy === 'createdDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('createdDate')}
                    >
                      تاريخ الإنشاء
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
                        <Typography variant="subtitle2">{item.monthName}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.createdBy}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(item.status)}
                          size="small"
                          color={getStatusColor(item.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.totalEmployees}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {formatCurrency(item.totalGrossSalary)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          خصومات: {formatCurrency(item.totalDeductions)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold" color="success.main">
                          {formatCurrency(item.totalNetSalary)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{formatDate(item.createdDate)}</Typography>
                        {item.paidDate && (
                          <Typography variant="caption" color="text.secondary">
                            دفع: {formatDate(item.paidDate)}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل كشف الراتب" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="طباعة كشف الراتب" arrow>
                            <IconButton size="small" color="info" onClick={() => handlePrint(item)}>
                              <PrintIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="إرسال كشف الراتب" arrow>
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleSend(item)}
                            >
                              <SendIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف كشف الراتب" arrow>
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

      {/* Run Payroll Dialog */}
      <Dialog open={openRunDialog} onClose={() => setOpenRunDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>تشغيل كشف راتب جديد</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الشهر</InputLabel>
                <Select label="الشهر" defaultValue="">
                  <MenuItem value="2024-04">أبريل 2024</MenuItem>
                  <MenuItem value="2024-05">مايو 2024</MenuItem>
                  <MenuItem value="2024-06">يونيو 2024</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الدفع"
                defaultValue=""
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="ملاحظات"
                placeholder="أدخل أي ملاحظات إضافية"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRunDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={handleRunPayrollConfirm}
            disabled={loading}
            startIcon={<SaveIcon />}
          >
            {loading ? 'جاري التشغيل...' : 'تشغيل كشف الراتب'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedPayroll ? 'تعديل كشف الراتب' : 'إضافة كشف راتب جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الشهر</InputLabel>
                <Select label="الشهر" defaultValue={selectedPayroll?.month || ''}>
                  {months
                    .filter((month) => month.value !== 'all')
                    .map((month) => (
                      <MenuItem key={month.value} value={month.value}>
                        {month.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedPayroll?.status || 'pending'}>
                  {payrollStatuses
                    .filter((status) => status.value !== 'all')
                    .map((status) => (
                      <MenuItem key={status.value} value={status.value}>
                        {status.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الإنشاء"
                defaultValue={selectedPayroll?.createdDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الدفع"
                defaultValue={selectedPayroll?.paidDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="أنشأ بواسطة"
                placeholder="أدخل اسم منشئ كشف الراتب"
                defaultValue={selectedPayroll?.createdBy || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="عدد الموظفين"
                placeholder="0"
                defaultValue={selectedPayroll?.totalEmployees || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="إجمالي الرواتب الإجمالية"
                placeholder="0.00"
                defaultValue={selectedPayroll?.totalGrossSalary || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="إجمالي الخصومات"
                placeholder="0.00"
                defaultValue={selectedPayroll?.totalDeductions || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="إجمالي الرواتب الصافية"
                placeholder="0.00"
                defaultValue={selectedPayroll?.totalNetSalary || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="ملاحظات"
                placeholder="أدخل أي ملاحظات إضافية"
                defaultValue={selectedPayroll?.notes || ''}
                multiline
                rows={3}
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
        <DialogTitle>حذف كشف الراتب</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا كشف الراتب؟
          </Typography>
          {selectedPayroll && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedPayroll.monthName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(selectedPayroll.totalNetSalary)} - {selectedPayroll.totalEmployees}{' '}
                موظف
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
        sx={{ '& .MuiDrawer-paper': { width: 600 } }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            تفاصيل كشف الراتب
          </Typography>
          {selectedPayroll && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  <ReceiptIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedPayroll.monthName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedPayroll.createdBy}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="الشهر" secondary={selectedPayroll.monthName} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={getStatusLabel(selectedPayroll.status)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="عدد الموظفين" secondary={selectedPayroll.totalEmployees} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="إجمالي الرواتب الإجمالية"
                    secondary={formatCurrency(selectedPayroll.totalGrossSalary)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="إجمالي الخصومات"
                    secondary={formatCurrency(selectedPayroll.totalDeductions)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="إجمالي الرواتب الصافية"
                    secondary={formatCurrency(selectedPayroll.totalNetSalary)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ الإنشاء"
                    secondary={formatDate(selectedPayroll.createdDate)}
                  />
                </ListItem>
                {selectedPayroll.paidDate && (
                  <ListItem>
                    <ListItemText
                      primary="تاريخ الدفع"
                      secondary={formatDate(selectedPayroll.paidDate)}
                    />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemText primary="أنشأ بواسطة" secondary={selectedPayroll.createdBy} />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                تفاصيل الموظفين
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>الموظف</TableCell>
                    <TableCell>الراتب الأساسي</TableCell>
                    <TableCell>البدلات</TableCell>
                    <TableCell>الخصومات</TableCell>
                    <TableCell>صافي الراتب</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedPayroll.employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">{employee.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {employee.position} - {employee.department}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{formatCurrency(employee.baseSalary)}</TableCell>
                      <TableCell>{formatCurrency(employee.allowances)}</TableCell>
                      <TableCell>{formatCurrency(employee.deductions)}</TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {formatCurrency(employee.netSalary)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الملاحظات
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedPayroll.notes}
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

export default Payroll;
