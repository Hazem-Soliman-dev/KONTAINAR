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
  AccountBalance as AccountBalanceIcon,
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
} from '@mui/icons-material';

const Budgets = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for budgets
  const budgetsData = [
    {
      id: 1,
      name: 'ميزانية المبيعات 2024',
      department: 'المبيعات',
      period: '2024',
      status: 'active',
      totalBudget: 2000000,
      spentAmount: 1200000,
      remainingAmount: 800000,
      currency: 'SAR',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'ميزانية شاملة لقسم المبيعات للعام 2024',
      categories: [
        { name: 'الرواتب', budget: 800000, spent: 480000 },
        { name: 'التسويق', budget: 400000, spent: 250000 },
        { name: 'السفر', budget: 200000, spent: 150000 },
        { name: 'التدريب', budget: 100000, spent: 80000 },
        { name: 'مصروفات أخرى', budget: 500000, spent: 240000 },
      ],
      createdBy: 'أحمد محمد',
      createdDate: '2023-12-15',
      lastModified: '2024-01-15',
    },
    {
      id: 2,
      name: 'ميزانية التسويق 2024',
      department: 'التسويق',
      period: '2024',
      status: 'active',
      totalBudget: 1500000,
      spentAmount: 900000,
      remainingAmount: 600000,
      currency: 'SAR',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'ميزانية التسويق والإعلان للعام 2024',
      categories: [
        { name: 'الإعلانات الرقمية', budget: 600000, spent: 350000 },
        { name: 'المعارض', budget: 300000, spent: 200000 },
        { name: 'المواد التسويقية', budget: 200000, spent: 150000 },
        { name: 'الاستشارات', budget: 400000, spent: 200000 },
      ],
      createdBy: 'فاطمة علي',
      createdDate: '2023-12-10',
      lastModified: '2024-01-10',
    },
    {
      id: 3,
      name: 'ميزانية التطوير التقني',
      department: 'التقنية',
      period: '2024',
      status: 'draft',
      totalBudget: 3000000,
      spentAmount: 0,
      remainingAmount: 3000000,
      currency: 'SAR',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'ميزانية تطوير الأنظمة والتقنيات',
      categories: [
        { name: 'تطوير البرمجيات', budget: 1500000, spent: 0 },
        { name: 'الأجهزة', budget: 800000, spent: 0 },
        { name: 'الاستشارات التقنية', budget: 400000, spent: 0 },
        { name: 'التدريب التقني', budget: 300000, spent: 0 },
      ],
      createdBy: 'خالد أحمد',
      createdDate: '2024-01-05',
      lastModified: '2024-01-05',
    },
    {
      id: 4,
      name: 'ميزانية الموارد البشرية',
      department: 'الموارد البشرية',
      period: '2024',
      status: 'active',
      totalBudget: 5000000,
      spentAmount: 2500000,
      remainingAmount: 2500000,
      currency: 'SAR',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'ميزانية شاملة للموارد البشرية',
      categories: [
        { name: 'الرواتب والمرتبات', budget: 4000000, spent: 2000000 },
        { name: 'التدريب والتطوير', budget: 500000, spent: 250000 },
        { name: 'المنافع والمكافآت', budget: 300000, spent: 150000 },
        { name: 'الاستشارات', budget: 200000, spent: 100000 },
      ],
      createdBy: 'سارة محمد',
      createdDate: '2023-12-20',
      lastModified: '2024-01-12',
    },
    {
      id: 5,
      name: 'ميزانية العمليات',
      department: 'العمليات',
      period: '2024',
      status: 'completed',
      totalBudget: 1000000,
      spentAmount: 1000000,
      remainingAmount: 0,
      currency: 'SAR',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'ميزانية العمليات اليومية',
      categories: [
        { name: 'المصروفات التشغيلية', budget: 600000, spent: 600000 },
        { name: 'الصيانة', budget: 200000, spent: 200000 },
        { name: 'المرافق', budget: 150000, spent: 150000 },
        { name: 'الخدمات', budget: 50000, spent: 50000 },
      ],
      createdBy: 'محمد حسن',
      createdDate: '2023-12-01',
      lastModified: '2024-01-20',
    },
  ];

  const budgetStatuses = [
    { value: 'draft', label: 'مسودة', color: 'default' },
    { value: 'active', label: 'نشط', color: 'success' },
    { value: 'completed', label: 'مكتمل', color: 'info' },
    { value: 'cancelled', label: 'ملغي', color: 'error' },
  ];

  const departments = [
    'المبيعات',
    'التسويق',
    'التقنية',
    'الموارد البشرية',
    'العمليات',
    'المالية',
    'الإدارة',
  ];

  const periods = ['2024', '2023', '2022'];

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
    notify(`${action} الميزانيات`, `${selectedItems.length} ميزانية`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (budget) => {
    setSelectedBudget(budget);
    setOpenViewDialog(true);
  };

  const handleEdit = (budget) => {
    setSelectedBudget(budget);
    setOpenDialog(true);
  };

  const handleDelete = (budget) => {
    setSelectedBudget(budget);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث الميزانية', selectedBudget ? 'تم تحديث الميزانية' : 'تم إنشاء الميزانية');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف الميزانية', 'تم حذف الميزانية');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير الميزانيات', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = budgetsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesPeriod = periodFilter === 'all' || item.period === periodFilter;
    return matchesSearch && matchesStatus && matchesPeriod;
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
    const statusInfo = budgetStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = budgetStatuses.find((s) => s.value === status);
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

  const totalBudgets = budgetsData.length;
  const activeBudgets = budgetsData.filter((budget) => budget.status === 'active').length;
  const totalBudgetAmount = budgetsData.reduce((sum, budget) => sum + budget.totalBudget, 0);
  const totalSpentAmount = budgetsData.reduce((sum, budget) => sum + budget.spentAmount, 0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إدارة الميزانيات
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          تخطيط ومتابعة الميزانيات المالية لجميع الأقسام مع تحليل الأداء المالي.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/finance">
            الحسابات والمالية
          </Link>
          <Typography color="text.primary">إدارة الميزانيات</Typography>
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
                  <PieChartIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalBudgets}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الميزانيات
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
                {activeBudgets}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                الميزانيات النشطة
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
                {formatCurrency(totalBudgetAmount)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الميزانيات
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
                {formatCurrency(totalSpentAmount)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي المصروفات
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
                placeholder="البحث في الميزانيات..."
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
                  {budgetStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الفترة</InputLabel>
                <Select
                  value={periodFilter}
                  label="الفترة"
                  onChange={(e) => setPeriodFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الفترات</MenuItem>
                  {periods.map((period) => (
                    <MenuItem key={period} value={period}>
                      {period}
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
                  setPeriodFilter('all');
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
            قائمة الميزانيات
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
            إضافة ميزانية
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
            <Alert severity="error">خطأ في تحميل الميزانيات. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على ميزانيات. أضف أول ميزانية.</Alert>
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
                      اسم الميزانية
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
                      active={sortBy === 'totalBudget'}
                      direction={sortBy === 'totalBudget' ? sortOrder : 'asc'}
                      onClick={() => handleSort('totalBudget')}
                    >
                      الميزانية الإجمالية
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'spentAmount'}
                      direction={sortBy === 'spentAmount' ? sortOrder : 'asc'}
                      onClick={() => handleSort('spentAmount')}
                    >
                      المبلغ المنفق
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'remainingAmount'}
                      direction={sortBy === 'remainingAmount' ? sortOrder : 'asc'}
                      onClick={() => handleSort('remainingAmount')}
                    >
                      المتبقي
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
                        <Box>
                          <Typography variant="subtitle2">{item.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.period}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.department}</Typography>
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
                          {formatCurrency(item.totalBudget)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="error.main">
                          {formatCurrency(item.spentAmount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="success.main">
                          {formatCurrency(item.remainingAmount)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل الميزانية" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف الميزانية" arrow>
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
        <DialogTitle>{selectedBudget ? 'تعديل الميزانية' : 'إضافة ميزانية جديدة'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم الميزانية"
                placeholder="أدخل اسم الميزانية"
                defaultValue={selectedBudget?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>القسم</InputLabel>
                <Select label="القسم" defaultValue={selectedBudget?.department || ''}>
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الفترة</InputLabel>
                <Select label="الفترة" defaultValue={selectedBudget?.period || '2024'}>
                  {periods.map((period) => (
                    <MenuItem key={period} value={period}>
                      {period}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedBudget?.status || 'draft'}>
                  {budgetStatuses.map((status) => (
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
                type="number"
                label="الميزانية الإجمالية"
                placeholder="0.00"
                defaultValue={selectedBudget?.totalBudget || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ البداية"
                defaultValue={selectedBudget?.startDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ النهاية"
                defaultValue={selectedBudget?.endDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="الوصف"
                placeholder="أدخل وصف الميزانية"
                defaultValue={selectedBudget?.description || ''}
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
        <DialogTitle>حذف الميزانية</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذه الميزانية؟
          </Typography>
          {selectedBudget && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedBudget.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedBudget.department} - {formatCurrency(selectedBudget.totalBudget)}
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
            تفاصيل الميزانية
          </Typography>
          {selectedBudget && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  <PieChartIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedBudget.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedBudget.department}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="اسم الميزانية" secondary={selectedBudget.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="القسم" secondary={selectedBudget.department} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الفترة" secondary={selectedBudget.period} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={getStatusLabel(selectedBudget.status)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الميزانية الإجمالية"
                    secondary={formatCurrency(selectedBudget.totalBudget)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المبلغ المنفق"
                    secondary={formatCurrency(selectedBudget.spentAmount)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المبلغ المتبقي"
                    secondary={formatCurrency(selectedBudget.remainingAmount)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ البداية"
                    secondary={formatDate(selectedBudget.startDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ النهاية"
                    secondary={formatDate(selectedBudget.endDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المنشئ" secondary={selectedBudget.createdBy} />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الوصف
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedBudget.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                فئات الميزانية
              </Typography>
              <List dense>
                {selectedBudget.categories.map((category, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={category.name}
                      secondary={`${formatCurrency(category.budget)} - ${formatCurrency(
                        category.spent,
                      )}`}
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

export default Budgets;
