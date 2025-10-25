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
  LinearProgress,
  Skeleton,
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
  CheckCircleOutline as CheckIcon,
  Download as DownloadIcon,
  AttachMoney as AttachMoneyIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';

const Taxes = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTax, setSelectedTax] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for taxes
  const taxesData = [
    {
      id: 1,
      name: 'ضريبة القيمة المضافة',
      type: 'vat',
      rate: 15,
      status: 'active',
      effectiveDate: '2023-01-01',
      description: 'ضريبة القيمة المضافة على السلع والخدمات',
      applicableTo: ['السلع', 'الخدمات', 'الاستيراد'],
      exemptions: ['المنتجات الغذائية الأساسية', 'الخدمات الطبية', 'التعليم'],
      calculationMethod: 'percentage',
      reportingFrequency: 'monthly',
      dueDate: '15',
      lastReported: '2024-01-15',
      totalCollected: 150000,
      totalPaid: 120000,
      outstanding: 30000,
      createdBy: 'أحمد محمد',
      createdDate: '2023-01-01',
      lastModified: '2024-01-15',
    },
    {
      id: 2,
      name: 'ضريبة الدخل',
      type: 'income',
      rate: 20,
      status: 'active',
      effectiveDate: '2023-01-01',
      description: 'ضريبة الدخل على الأرباح',
      applicableTo: ['الأرباح', 'الرواتب', 'الاستثمارات'],
      exemptions: ['الرواتب أقل من 5000 ريال', 'الاستثمارات الحكومية'],
      calculationMethod: 'percentage',
      reportingFrequency: 'quarterly',
      dueDate: '30',
      lastReported: '2024-01-30',
      totalCollected: 250000,
      totalPaid: 200000,
      outstanding: 50000,
      createdBy: 'فاطمة علي',
      createdDate: '2023-01-01',
      lastModified: '2024-01-30',
    },
    {
      id: 3,
      name: 'ضريبة الخدمات',
      type: 'service',
      rate: 5,
      status: 'active',
      effectiveDate: '2023-06-01',
      description: 'ضريبة على الخدمات المقدمة',
      applicableTo: ['الخدمات الاستشارية', 'الخدمات التقنية', 'الخدمات المالية'],
      exemptions: ['الخدمات الحكومية', 'الخدمات التعليمية'],
      calculationMethod: 'percentage',
      reportingFrequency: 'monthly',
      dueDate: '20',
      lastReported: '2024-01-20',
      totalCollected: 75000,
      totalPaid: 60000,
      outstanding: 15000,
      createdBy: 'خالد أحمد',
      createdDate: '2023-06-01',
      lastModified: '2024-01-20',
    },
    {
      id: 4,
      name: 'ضريبة الاستيراد',
      type: 'import',
      rate: 10,
      status: 'active',
      effectiveDate: '2023-01-01',
      description: 'ضريبة على السلع المستوردة',
      applicableTo: ['السلع المستوردة', 'المواد الخام', 'المعدات'],
      exemptions: ['السلع الطبية', 'المواد الغذائية الأساسية'],
      calculationMethod: 'percentage',
      reportingFrequency: 'monthly',
      dueDate: '25',
      lastReported: '2024-01-25',
      totalCollected: 100000,
      totalPaid: 80000,
      outstanding: 20000,
      createdBy: 'سارة محمد',
      createdDate: '2023-01-01',
      lastModified: '2024-01-25',
    },
    {
      id: 5,
      name: 'ضريبة العقارات',
      type: 'property',
      rate: 2.5,
      status: 'draft',
      effectiveDate: '2024-07-01',
      description: 'ضريبة على العقارات المملوكة',
      applicableTo: ['العقارات السكنية', 'العقارات التجارية'],
      exemptions: ['العقارات الحكومية', 'العقارات التعليمية'],
      calculationMethod: 'percentage',
      reportingFrequency: 'annually',
      dueDate: '31',
      lastReported: null,
      totalCollected: 0,
      totalPaid: 0,
      outstanding: 0,
      createdBy: 'محمد حسن',
      createdDate: '2024-01-01',
      lastModified: '2024-01-01',
    },
  ];

  const taxStatuses = [
    { value: 'draft', label: 'مسودة', color: 'default' },
    { value: 'active', label: 'نشط', color: 'success' },
    { value: 'suspended', label: 'معلق', color: 'warning' },
    { value: 'cancelled', label: 'ملغي', color: 'error' },
  ];

  const taxTypes = [
    { value: 'vat', label: 'ضريبة القيمة المضافة' },
    { value: 'income', label: 'ضريبة الدخل' },
    { value: 'service', label: 'ضريبة الخدمات' },
    { value: 'import', label: 'ضريبة الاستيراد' },
    { value: 'property', label: 'ضريبة العقارات' },
    { value: 'other', label: 'أخرى' },
  ];

  const reportingFrequencies = [
    { value: 'monthly', label: 'شهري' },
    { value: 'quarterly', label: 'ربعي' },
    { value: 'annually', label: 'سنوي' },
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
    notify(`${action} الضرائب`, `${selectedItems.length} ضريبة`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (tax) => {
    setSelectedTax(tax);
    setOpenViewDialog(true);
  };

  const handleEdit = (tax) => {
    setSelectedTax(tax);
    setOpenDialog(true);
  };

  const handleDelete = (tax) => {
    setSelectedTax(tax);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث الضريبة', selectedTax ? 'تم تحديث الضريبة' : 'تم إضافة الضريبة');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف الضريبة', 'تم حذف الضريبة');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير الضرائب', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = taxesData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
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

  const getStatusColor = (status) => {
    const statusInfo = taxStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = taxStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
  };

  const getTypeLabel = (type) => {
    const typeInfo = taxTypes.find((t) => t.value === type);
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

  const totalTaxes = taxesData.length;
  const activeTaxes = taxesData.filter((tax) => tax.status === 'active').length;
  const totalCollected = taxesData.reduce((sum, tax) => sum + tax.totalCollected, 0);
  const totalOutstanding = taxesData.reduce((sum, tax) => sum + tax.outstanding, 0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إدارة الضرائب
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة وتتبع جميع أنواع الضرائب مع حساب المبالغ المستحقة والمدفوعة.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/finance">
            الحسابات والمالية
          </Link>
          <Typography color="text.primary">إدارة الضرائب</Typography>
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
                {totalTaxes}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الضرائب
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
                {activeTaxes}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                الضرائب النشطة
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
                {formatCurrency(totalCollected)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي المحصل
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
                  <PaymentIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {formatCurrency(totalOutstanding)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                المبلغ المستحق
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
                placeholder="البحث في الضرائب..."
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
                  {taxStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
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
                >
                  <MenuItem value="all">جميع الأنواع</MenuItem>
                  {taxTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
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
                  setTypeFilter('all');
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
            قائمة الضرائب
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
            إضافة ضريبة
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
            <Alert severity="error">خطأ في تحميل الضرائب. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على ضرائب. أضف أول ضريبة.</Alert>
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
                      اسم الضريبة
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
                      active={sortBy === 'rate'}
                      direction={sortBy === 'rate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('rate')}
                    >
                      المعدل
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
                      active={sortBy === 'totalCollected'}
                      direction={sortBy === 'totalCollected' ? sortOrder : 'asc'}
                      onClick={() => handleSort('totalCollected')}
                    >
                      المحصل
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'outstanding'}
                      direction={sortBy === 'outstanding' ? sortOrder : 'asc'}
                      onClick={() => handleSort('outstanding')}
                    >
                      المستحق
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
                            {getTypeLabel(item.type)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{getTypeLabel(item.type)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {item.rate}%
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
                        <Typography variant="body2" color="success.main">
                          {formatCurrency(item.totalCollected)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="error.main">
                          {formatCurrency(item.outstanding)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل الضريبة" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف الضريبة" arrow>
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
        <DialogTitle>{selectedTax ? 'تعديل الضريبة' : 'إضافة ضريبة جديدة'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم الضريبة"
                placeholder="أدخل اسم الضريبة"
                defaultValue={selectedTax?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>نوع الضريبة</InputLabel>
                <Select label="نوع الضريبة" defaultValue={selectedTax?.type || ''}>
                  {taxTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="معدل الضريبة (%)"
                placeholder="0"
                defaultValue={selectedTax?.rate || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedTax?.status || 'draft'}>
                  {taxStatuses.map((status) => (
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
                label="تاريخ السريان"
                defaultValue={selectedTax?.effectiveDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>تكرار التقرير</InputLabel>
                <Select
                  label="تكرار التقرير"
                  defaultValue={selectedTax?.reportingFrequency || 'monthly'}
                >
                  {reportingFrequencies.map((freq) => (
                    <MenuItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="يوم الاستحقاق"
                placeholder="15"
                defaultValue={selectedTax?.dueDate || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المطبق على"
                placeholder="السلع، الخدمات"
                defaultValue={selectedTax?.applicableTo?.join(', ') || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="الوصف"
                placeholder="أدخل وصف الضريبة"
                defaultValue={selectedTax?.description || ''}
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
        <DialogTitle>حذف الضريبة</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذه الضريبة؟
          </Typography>
          {selectedTax && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedTax.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {getTypeLabel(selectedTax.type)} - {selectedTax.rate}%
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
            تفاصيل الضريبة
          </Typography>
          {selectedTax && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  <ReceiptIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedTax.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getTypeLabel(selectedTax.type)}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="اسم الضريبة" secondary={selectedTax.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="النوع" secondary={getTypeLabel(selectedTax.type)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المعدل" secondary={`${selectedTax.rate}%`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحالة" secondary={getStatusLabel(selectedTax.status)} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ السريان"
                    secondary={formatDate(selectedTax.effectiveDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تكرار التقرير"
                    secondary={selectedTax.reportingFrequency}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="يوم الاستحقاق" secondary={selectedTax.dueDate} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المبلغ المحصل"
                    secondary={formatCurrency(selectedTax.totalCollected)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المبلغ المستحق"
                    secondary={formatCurrency(selectedTax.outstanding)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="آخر تقرير"
                    secondary={
                      selectedTax.lastReported
                        ? formatDate(selectedTax.lastReported)
                        : 'لم يتم التقرير بعد'
                    }
                  />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الوصف
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedTax.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المطبق على
              </Typography>
              <List dense>
                {selectedTax.applicableTo.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الإعفاءات
              </Typography>
              <List dense>
                {selectedTax.exemptions.map((exemption, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={exemption} />
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

export default Taxes;
