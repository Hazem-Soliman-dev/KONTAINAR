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
  Receipt as ReceiptIcon,
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
  AccountBalance as AccountBalanceIcon,
  AttachMoney as AttachMoneyIcon,
  Assessment as AssessmentIcon,
  PostAdd as PostAddIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

const JournalEntries = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  // Mock data for journal entries
  const journalEntriesData = [
    {
      id: 1,
      entryNumber: 'JE-2024-001',
      date: '2024-01-15',
      reference: 'INV-001',
      description: 'تسجيل مبيعات اليوم',
      totalDebit: 5000,
      totalCredit: 5000,
      status: 'posted',
      createdBy: 'أحمد محمد',
      approvedBy: 'محمد علي',
      entries: [
        {
          id: 1,
          accountCode: '4100',
          accountName: 'إيرادات المبيعات',
          debit: 0,
          credit: 5000,
          description: 'مبيعات منتجات',
        },
        {
          id: 2,
          accountCode: '1110',
          accountName: 'النقدية',
          debit: 5000,
          credit: 0,
          description: 'استلام نقدي',
        },
      ],
    },
    {
      id: 2,
      entryNumber: 'JE-2024-002',
      date: '2024-01-15',
      reference: 'EXP-001',
      description: 'تسجيل مصروفات الإيجار',
      totalDebit: 2000,
      totalCredit: 2000,
      status: 'draft',
      createdBy: 'سارة أحمد',
      approvedBy: null,
      entries: [
        {
          id: 3,
          accountCode: '5200',
          accountName: 'المصروفات الإدارية',
          debit: 2000,
          credit: 0,
          description: 'إيجار المكتب',
        },
        {
          id: 4,
          accountCode: '1110',
          accountName: 'النقدية',
          debit: 0,
          credit: 2000,
          description: 'دفع نقدي',
        },
      ],
    },
    {
      id: 3,
      entryNumber: 'JE-2024-003',
      date: '2024-01-14',
      reference: 'PUR-001',
      description: 'تسجيل مشتريات مخزون',
      totalDebit: 3000,
      totalCredit: 3000,
      status: 'posted',
      createdBy: 'خالد حسن',
      approvedBy: 'محمد علي',
      entries: [
        {
          id: 5,
          accountCode: '1120',
          accountName: 'المخزون',
          debit: 3000,
          credit: 0,
          description: 'شراء بضائع',
        },
        {
          id: 6,
          accountCode: '2110',
          accountName: 'الذمم الدائنة',
          debit: 0,
          credit: 3000,
          description: 'دين على المورد',
        },
      ],
    },
    {
      id: 4,
      entryNumber: 'JE-2024-004',
      date: '2024-01-14',
      reference: 'ADJ-001',
      description: 'تسوية مخزون',
      totalDebit: 500,
      totalCredit: 500,
      status: 'pending',
      createdBy: 'فاطمة علي',
      approvedBy: null,
      entries: [
        {
          id: 7,
          accountCode: '5200',
          accountName: 'المصروفات الإدارية',
          debit: 500,
          credit: 0,
          description: 'تسوية مخزون',
        },
        {
          id: 8,
          accountCode: '1120',
          accountName: 'المخزون',
          debit: 0,
          credit: 500,
          description: 'تخفيض مخزون',
        },
      ],
    },
    {
      id: 5,
      entryNumber: 'JE-2024-005',
      date: '2024-01-13',
      reference: 'DEP-001',
      description: 'إهلاك المعدات',
      totalDebit: 1000,
      totalCredit: 1000,
      status: 'posted',
      createdBy: 'عبدالله سالم',
      approvedBy: 'محمد علي',
      entries: [
        {
          id: 9,
          accountCode: '5200',
          accountName: 'المصروفات الإدارية',
          debit: 1000,
          credit: 0,
          description: 'إهلاك المعدات',
        },
        {
          id: 10,
          accountCode: '1220',
          accountName: 'المعدات',
          debit: 0,
          credit: 1000,
          description: 'تراكم الإهلاك',
        },
      ],
    },
  ];

  const entryStatuses = [
    { value: 'draft', label: 'مسودة', color: 'default' },
    { value: 'pending', label: 'في الانتظار', color: 'warning' },
    { value: 'posted', label: 'مرحل', color: 'success' },
    { value: 'rejected', label: 'مرفوض', color: 'error' },
  ];

  const dateRanges = [
    { value: 'all', label: 'جميع التواريخ' },
    { value: 'today', label: 'اليوم' },
    { value: 'week', label: 'هذا الأسبوع' },
    { value: 'month', label: 'هذا الشهر' },
    { value: 'quarter', label: 'هذا الربع' },
    { value: 'year', label: 'هذا العام' },
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
    notify(`${action} القيود`, `${selectedItems.length} قيد`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (entry) => {
    setSelectedEntry(entry);
    setOpenViewDialog(true);
  };

  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    setOpenDialog(true);
  };

  const handleDelete = (entry) => {
    setSelectedEntry(entry);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث القيد', selectedEntry ? 'تم تحديث القيد' : 'تم إنشاء القيد');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف القيد', 'تم حذف القيد');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير القيود اليومية', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const handlePost = (entry) => {
    notify('ترحيل القيد', `تم ترحيل القيد ${entry.entryNumber}`);
  };

  const handleApprove = (entry) => {
    notify('موافقة على القيد', `تمت الموافقة على القيد ${entry.entryNumber}`);
  };

  const handleReject = (entry) => {
    notify('رفض القيد', `تم رفض القيد ${entry.entryNumber}`);
  };

  const filteredData = journalEntriesData.filter((item) => {
    const matchesSearch =
      item.entryNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesDate = dateFilter === 'all' || true; // Simplified for demo
    return matchesSearch && matchesStatus && matchesDate;
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
    const statusInfo = entryStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = entryStatuses.find((s) => s.value === status);
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

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          القيود اليومية
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة القيود اليومية المحاسبية مع نظام القيد المزدوج.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/finance">
            الحسابات والمالية
          </Link>
          <Typography color="text.primary">القيود اليومية</Typography>
        </Breadcrumbs>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              p: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
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
                {journalEntriesData.length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي القيود
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              p: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
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
                {journalEntriesData.filter((entry) => entry.status === 'posted').length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                القيود المرحلة
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              p: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%)',
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
                  <TrendingUpIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {journalEntriesData.filter((entry) => entry.status === 'pending').length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                في الانتظار
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              p: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)',
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
                  <TrendingDownIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {journalEntriesData.filter((entry) => entry.status === 'draft').length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                المسودات
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
                placeholder="البحث في القيود..."
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
                <Select value={statusFilter} label="الحالة" onChange={(e) => setStatusFilter(e.target.value)}>
                  <MenuItem value="all">جميع الحالات</MenuItem>
                  {entryStatuses.map((status) => (
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
                <Select value={dateFilter} label="الفترة" onChange={(e) => setDateFilter(e.target.value)}>
                  {dateRanges.map((range) => (
                    <MenuItem key={range.value} value={range.value}>
                      {range.label}
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
                  setDateFilter('all');
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
            قائمة القيود اليومية
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button size="small" onClick={() => handleBulkAction('ترحيل')} sx={{ mr: 1 }}>
                ترحيل ({selectedItems.length})
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
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            إضافة قيد جديد
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
            <Alert severity="error">خطأ في تحميل القيود. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على قيود. أضف أول قيد.</Alert>
          </Box>
        ) : (
          <>
            <Table {...getDensityProps()}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.length === sortedData.length && sortedData.length > 0}
                      indeterminate={selectedItems.length > 0 && selectedItems.length < sortedData.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'entryNumber'}
                      direction={sortBy === 'entryNumber' ? sortOrder : 'asc'}
                      onClick={() => handleSort('entryNumber')}
                    >
                      رقم القيد
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'date'}
                      direction={sortBy === 'date' ? sortOrder : 'asc'}
                      onClick={() => handleSort('date')}
                    >
                      التاريخ
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'description'}
                      direction={sortBy === 'description' ? sortOrder : 'asc'}
                      onClick={() => handleSort('description')}
                    >
                      الوصف
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'totalDebit'}
                      direction={sortBy === 'totalDebit' ? sortOrder : 'asc'}
                      onClick={() => handleSort('totalDebit')}
                    >
                      إجمالي المدين
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'totalCredit'}
                      direction={sortBy === 'totalCredit' ? sortOrder : 'asc'}
                      onClick={() => handleSort('totalCredit')}
                    >
                      إجمالي الدائن
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
                        <Typography variant="subtitle2" fontFamily="monospace">
                          {item.entryNumber}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.reference}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{formatDate(item.date)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{item.description}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          بواسطة: {item.createdBy}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold" color="error.main">
                          {formatCurrency(item.totalDebit)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold" color="success.main">
                          {formatCurrency(item.totalCredit)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(item.status)}
                          size="small"
                          color={getStatusColor(item.status)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل القيد" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          {item.status === 'draft' && (
                            <Tooltip title="ترحيل القيد" arrow>
                              <IconButton size="small" color="success" onClick={() => handlePost(item)}>
                                <PostAddIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {item.status === 'pending' && (
                            <>
                              <Tooltip title="موافقة" arrow>
                                <IconButton size="small" color="success" onClick={() => handleApprove(item)}>
                                  <CheckCircleIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="رفض" arrow>
                                <IconButton size="small" color="error" onClick={() => handleReject(item)}>
                                  <CancelIcon />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          <Tooltip title="حذف القيد" arrow>
                            <IconButton size="small" color="error" onClick={() => handleDelete(item)}>
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{selectedEntry ? 'تعديل القيد' : 'إضافة قيد جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم القيد"
                placeholder="مثال: JE-2024-001"
                defaultValue={selectedEntry?.entryNumber || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="التاريخ"
                defaultValue={selectedEntry?.date || ''}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المرجع"
                placeholder="مثال: INV-001"
                defaultValue={selectedEntry?.reference || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الوصف"
                placeholder="أدخل وصف القيد"
                defaultValue={selectedEntry?.description || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                تفاصيل القيد
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>الحساب</TableCell>
                    <TableCell>الوصف</TableCell>
                    <TableCell>مدين</TableCell>
                    <TableCell>دائن</TableCell>
                    <TableCell>الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedEntry?.entries?.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <FormControl fullWidth size="small">
                          <Select defaultValue={entry.accountCode}>
                            <MenuItem value="1110">1110 - النقدية</MenuItem>
                            <MenuItem value="1120">1120 - المخزون</MenuItem>
                            <MenuItem value="4100">4100 - إيرادات المبيعات</MenuItem>
                            <MenuItem value="5200">5200 - المصروفات الإدارية</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          defaultValue={entry.description}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          defaultValue={entry.debit}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          defaultValue={entry.credit}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )) || (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Button startIcon={<AddIcon />} size="small">
                          إضافة بند
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
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
        <DialogTitle>حذف القيد</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا القيد؟
          </Typography>
          {selectedEntry && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedEntry.entryNumber}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedEntry.description} - {formatDate(selectedEntry.date)}
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
            تفاصيل القيد
          </Typography>
          {selectedEntry && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  <ReceiptIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedEntry.entryNumber}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(selectedEntry.date)}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="رقم القيد" secondary={selectedEntry.entryNumber} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="التاريخ" secondary={formatDate(selectedEntry.date)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المرجع" secondary={selectedEntry.reference} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الوصف" secondary={selectedEntry.description} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="إجمالي المدين" secondary={formatCurrency(selectedEntry.totalDebit)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="إجمالي الدائن" secondary={formatCurrency(selectedEntry.totalCredit)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحالة" secondary={getStatusLabel(selectedEntry.status)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="أنشأ بواسطة" secondary={selectedEntry.createdBy} />
                </ListItem>
                {selectedEntry.approvedBy && (
                  <ListItem>
                    <ListItemText primary="وافق عليه" secondary={selectedEntry.approvedBy} />
                  </ListItem>
                )}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                تفاصيل القيد
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>الحساب</TableCell>
                    <TableCell>الوصف</TableCell>
                    <TableCell>مدين</TableCell>
                    <TableCell>دائن</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedEntry.entries.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body2" fontFamily="monospace">
                          {entry.accountCode}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {entry.accountName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{entry.description}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="error.main">
                          {entry.debit > 0 ? formatCurrency(entry.debit) : '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="success.main">
                          {entry.credit > 0 ? formatCurrency(entry.credit) : '-'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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

export default JournalEntries;
