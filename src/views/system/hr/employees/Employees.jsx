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
  Person as PersonIcon,
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
  AttachMoney as AttachMoneyIcon,
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
} from '@mui/icons-material';

const Employees = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for employees
  const employeesData = [
    {
      id: 1,
      name: 'أحمد محمد السعيد',
      employeeId: 'EMP001',
      email: 'ahmed@company.com',
      phone: '+966501234567',
      position: 'مدير تقني',
      department: 'التقنية',
      manager: 'سارة أحمد',
      status: 'active',
      hireDate: '2022-01-15',
      salary: 15000,
      currency: 'SAR',
      address: 'الرياض، المملكة العربية السعودية',
      emergencyContact: 'فاطمة السعيد - +966502345678',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      certifications: ['AWS Certified', 'React Developer'],
      performance: 85,
      attendance: 95,
      notes: 'موظف متميز في التطوير',
      documents: [
        { name: 'عقد العمل', type: 'contract', date: '2022-01-15' },
        { name: 'شهادة جامعية', type: 'certificate', date: '2021-06-01' },
      ],
    },
    {
      id: 2,
      name: 'فاطمة علي حسن',
      employeeId: 'EMP002',
      email: 'fatima@company.com',
      phone: '+966502345678',
      position: 'مديرة تسويق',
      department: 'التسويق',
      manager: 'خالد محمد',
      status: 'active',
      hireDate: '2021-08-20',
      salary: 12000,
      currency: 'SAR',
      address: 'جدة، المملكة العربية السعودية',
      emergencyContact: 'محمد حسن - +966503456789',
      skills: ['Digital Marketing', 'Social Media', 'Content Creation'],
      certifications: ['Google Ads Certified', 'Facebook Marketing'],
      performance: 90,
      attendance: 98,
      notes: 'خبرة ممتازة في التسويق الرقمي',
      documents: [
        { name: 'عقد العمل', type: 'contract', date: '2021-08-20' },
        { name: 'شهادة التسويق', type: 'certificate', date: '2020-12-15' },
      ],
    },
    {
      id: 3,
      name: 'محمد عبدالله سالم',
      employeeId: 'EMP003',
      email: 'mohammed@company.com',
      phone: '+966503456789',
      position: 'محاسب',
      department: 'المحاسبة',
      manager: 'نورا علي',
      status: 'active',
      hireDate: '2023-03-10',
      salary: 8000,
      currency: 'SAR',
      address: 'الدمام، المملكة العربية السعودية',
      emergencyContact: 'عبدالله سالم - +966504567890',
      skills: ['Accounting', 'QuickBooks', 'Excel', 'Financial Analysis'],
      certifications: ['CPA', 'QuickBooks Certified'],
      performance: 75,
      attendance: 92,
      notes: 'موظف جديد يحتاج تدريب إضافي',
      documents: [
        { name: 'عقد العمل', type: 'contract', date: '2023-03-10' },
        { name: 'شهادة محاسبة', type: 'certificate', date: '2022-05-20' },
      ],
    },
    {
      id: 4,
      name: 'سارة أحمد محمد',
      employeeId: 'EMP004',
      email: 'sara@company.com',
      phone: '+966504567890',
      position: 'مديرة مبيعات',
      department: 'المبيعات',
      manager: 'عبدالله حسن',
      status: 'active',
      hireDate: '2020-11-05',
      salary: 18000,
      currency: 'SAR',
      address: 'الرياض، المملكة العربية السعودية',
      emergencyContact: 'أحمد محمد - +966505678901',
      skills: ['Sales Management', 'CRM', 'Negotiation', 'Customer Service'],
      certifications: ['Sales Professional', 'CRM Expert'],
      performance: 95,
      attendance: 97,
      notes: 'أفضل مديرة مبيعات في الفريق',
      documents: [
        { name: 'عقد العمل', type: 'contract', date: '2020-11-05' },
        { name: 'شهادة المبيعات', type: 'certificate', date: '2019-08-10' },
      ],
    },
    {
      id: 5,
      name: 'خالد حسن علي',
      employeeId: 'EMP005',
      email: 'khalid@company.com',
      phone: '+966505678901',
      position: 'مطور',
      department: 'التقنية',
      manager: 'أحمد السعيد',
      status: 'inactive',
      hireDate: '2021-06-15',
      salary: 13000,
      currency: 'SAR',
      address: 'الرياض، المملكة العربية السعودية',
      emergencyContact: 'حسن علي - +966506789012',
      skills: ['Java', 'Spring Boot', 'MySQL', 'Git'],
      certifications: ['Java Developer', 'Spring Certified'],
      performance: 80,
      attendance: 88,
      notes: 'موظف في إجازة مرضية',
      documents: [
        { name: 'عقد العمل', type: 'contract', date: '2021-06-15' },
        { name: 'شهادة Java', type: 'certificate', date: '2020-09-15' },
      ],
    },
    {
      id: 6,
      name: 'نورا محمد أحمد',
      employeeId: 'EMP006',
      email: 'nora@company.com',
      phone: '+966506789012',
      position: 'مديرة موارد بشرية',
      department: 'الموارد البشرية',
      manager: 'فاطمة سالم',
      status: 'active',
      hireDate: '2019-09-01',
      salary: 16000,
      currency: 'SAR',
      address: 'جدة، المملكة العربية السعودية',
      emergencyContact: 'محمد أحمد - +966507890123',
      skills: ['HR Management', 'Recruitment', 'Employee Relations', 'Training'],
      certifications: ['HR Professional', 'Recruitment Expert'],
      performance: 88,
      attendance: 96,
      notes: 'خبرة واسعة في إدارة الموارد البشرية',
      documents: [
        { name: 'عقد العمل', type: 'contract', date: '2019-09-01' },
        { name: 'شهادة موارد بشرية', type: 'certificate', date: '2018-12-20' },
      ],
    },
  ];

  const departments = [
    { value: 'all', label: 'جميع الأقسام' },
    { value: 'التقنية', label: 'التقنية' },
    { value: 'التسويق', label: 'التسويق' },
    { value: 'المحاسبة', label: 'المحاسبة' },
    { value: 'المبيعات', label: 'المبيعات' },
    { value: 'الموارد البشرية', label: 'الموارد البشرية' },
    { value: 'الإدارة', label: 'الإدارة' },
  ];

  const employeeStatuses = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'active', label: 'نشط', color: 'success' },
    { value: 'inactive', label: 'غير نشط', color: 'error' },
    { value: 'on_leave', label: 'في إجازة', color: 'warning' },
    { value: 'terminated', label: 'مفصول', color: 'error' },
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
    notify(`${action} الموظفين`, `${selectedItems.length} موظف`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setOpenViewDialog(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث الموظف', selectedEmployee ? 'تم تحديث الموظف' : 'تم إنشاء الموظف');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف الموظف', 'تم حذف الموظف');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير الموظفين', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = employeesData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || item.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
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
    const statusInfo = employeeStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = employeeStatuses.find((s) => s.value === status);
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

  const totalEmployees = employeesData.length;
  const activeEmployees = employeesData.filter((emp) => emp.status === 'active').length;
  const totalSalary = employeesData.reduce((sum, emp) => sum + emp.salary, 0);
  const averagePerformance =
    employeesData.reduce((sum, emp) => sum + emp.performance, 0) / employeesData.length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إدارة الموظفين
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة شاملة لبيانات الموظفين ومعلوماتهم الشخصية والمهنية.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/hr">
            شؤون الموظفين
          </Link>
          <Typography color="text.primary">إدارة الموظفين</Typography>
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
                  <PersonIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalEmployees}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الموظفين
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
                {activeEmployees}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                الموظفين النشطين
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
                  <AssessmentIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {Math.round(averagePerformance)}%
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                متوسط الأداء
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
                {formatCurrency(totalSalary)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الرواتب
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
                placeholder="البحث في الموظفين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>القسم</InputLabel>
                <Select
                  value={departmentFilter}
                  label="القسم"
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.value} value={dept.value}>
                      {dept.label}
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
                  {employeeStatuses.map((status) => (
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
                  setDepartmentFilter('all');
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
            قائمة الموظفين
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
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
            إضافة موظف جديد
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
            <Alert severity="error">خطأ في تحميل الموظفين. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على موظفين. أضف أول موظف.</Alert>
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
                      الموظف
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'position'}
                      direction={sortBy === 'position' ? sortOrder : 'asc'}
                      onClick={() => handleSort('position')}
                    >
                      المنصب
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'department'}
                      direction={sortBy === 'department' ? sortOrder : 'asc'}
                      onClick={() => handleSort('department')}
                    >
                      القسم
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
                      active={sortBy === 'salary'}
                      direction={sortBy === 'salary' ? sortOrder : 'asc'}
                      onClick={() => handleSort('salary')}
                    >
                      الراتب
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'hireDate'}
                      direction={sortBy === 'hireDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('hireDate')}
                    >
                      تاريخ التعيين
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
                          <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
                            {item.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">{item.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.employeeId}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.position}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.manager}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={item.department} size="small" color="primary" />
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
                          {formatCurrency(item.salary)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          الأداء: {item.performance}%
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{formatDate(item.hireDate)}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.attendance}% حضور
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل الموظف" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف الموظف" arrow>
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
        <DialogTitle>{selectedEmployee ? 'تعديل الموظف' : 'إضافة موظف جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الاسم"
                placeholder="أدخل اسم الموظف"
                defaultValue={selectedEmployee?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الموظف"
                placeholder="أدخل رقم الموظف"
                defaultValue={selectedEmployee?.employeeId || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="أدخل البريد الإلكتروني"
                defaultValue={selectedEmployee?.email || ''}
                type="email"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                placeholder="أدخل رقم الهاتف"
                defaultValue={selectedEmployee?.phone || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المنصب"
                placeholder="أدخل المنصب"
                defaultValue={selectedEmployee?.position || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>القسم</InputLabel>
                <Select label="القسم" defaultValue={selectedEmployee?.department || ''}>
                  {departments
                    .filter((dept) => dept.value !== 'all')
                    .map((dept) => (
                      <MenuItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المدير المباشر"
                placeholder="أدخل اسم المدير المباشر"
                defaultValue={selectedEmployee?.manager || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedEmployee?.status || 'active'}>
                  {employeeStatuses
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
                label="تاريخ التعيين"
                defaultValue={selectedEmployee?.hireDate || ''}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="الراتب"
                placeholder="0.00"
                defaultValue={selectedEmployee?.salary || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="العنوان"
                placeholder="أدخل العنوان"
                defaultValue={selectedEmployee?.address || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="جهة الاتصال في الطوارئ"
                placeholder="أدخل جهة الاتصال في الطوارئ"
                defaultValue={selectedEmployee?.emergencyContact || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="الأداء (%)"
                placeholder="0"
                defaultValue={selectedEmployee?.performance || ''}
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="الحضور (%)"
                placeholder="0"
                defaultValue={selectedEmployee?.attendance || ''}
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الملاحظات"
                placeholder="أدخل أي ملاحظات إضافية"
                defaultValue={selectedEmployee?.notes || ''}
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
        <DialogTitle>حذف الموظف</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا الموظف؟
          </Typography>
          {selectedEmployee && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedEmployee.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedEmployee.position} - {selectedEmployee.department}
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
            تفاصيل الموظف
          </Typography>
          {selectedEmployee && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  {selectedEmployee.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedEmployee.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedEmployee.position}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="رقم الموظف" secondary={selectedEmployee.employeeId} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="البريد الإلكتروني" secondary={selectedEmployee.email} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم الهاتف" secondary={selectedEmployee.phone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المنصب" secondary={selectedEmployee.position} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="القسم" secondary={selectedEmployee.department} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المدير المباشر" secondary={selectedEmployee.manager} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={getStatusLabel(selectedEmployee.status)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الراتب"
                    secondary={formatCurrency(selectedEmployee.salary)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ التعيين"
                    secondary={formatDate(selectedEmployee.hireDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العنوان" secondary={selectedEmployee.address} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="جهة الاتصال في الطوارئ"
                    secondary={selectedEmployee.emergencyContact}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الأداء" secondary={`${selectedEmployee.performance}%`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحضور" secondary={`${selectedEmployee.attendance}%`} />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المهارات
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedEmployee.skills.map((skill, index) => (
                  <Chip key={index} label={skill} size="small" />
                ))}
              </Box>
              <Typography variant="subtitle2" gutterBottom>
                الشهادات
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedEmployee.certifications.map((cert, index) => (
                  <Chip key={index} label={cert} size="small" color="primary" />
                ))}
              </Box>
              <Typography variant="subtitle2" gutterBottom>
                الوثائق
              </Typography>
              <List dense>
                {selectedEmployee.documents.map((doc, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={doc.name}
                      secondary={`${doc.type} - ${formatDate(doc.date)}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الملاحظات
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedEmployee.notes}
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

export default Employees;
