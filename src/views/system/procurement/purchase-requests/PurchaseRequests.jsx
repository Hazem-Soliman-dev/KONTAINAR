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
  ShoppingCart as ShoppingCartIcon,
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
  Person as PersonIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';

const PurchaseRequests = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for purchase requests
  const purchaseRequestsData = [
    {
      id: 1,
      requestNumber: 'PR-2024-001',
      date: '2024-01-15',
      requestedBy: 'أحمد محمد',
      department: 'المشتريات',
      priority: 'high',
      status: 'pending',
      totalAmount: 15000,
      currency: 'SAR',
      description: 'طلب شراء معدات مكتبية',
      justification: 'تحسين بيئة العمل وزيادة الإنتاجية',
      requestedDeliveryDate: '2024-01-25',
      approvedBy: null,
      approvedDate: null,
      items: [
        {
          id: 1,
          productName: 'طاولة مكتب',
          quantity: 5,
          unitPrice: 2000,
          totalPrice: 10000,
          description: 'طاولة مكتب خشبية عالية الجودة',
        },
        {
          id: 2,
          productName: 'كرسي مكتب',
          quantity: 5,
          unitPrice: 1000,
          totalPrice: 5000,
          description: 'كرسي مكتب مريح',
        },
      ],
    },
    {
      id: 2,
      requestNumber: 'PR-2024-002',
      date: '2024-01-14',
      requestedBy: 'سارة أحمد',
      department: 'التقنية',
      priority: 'medium',
      status: 'approved',
      totalAmount: 25000,
      currency: 'SAR',
      description: 'طلب شراء أجهزة كمبيوتر',
      justification: 'تحديث الأجهزة لتحسين الأداء',
      requestedDeliveryDate: '2024-02-01',
      approvedBy: 'محمد علي',
      approvedDate: '2024-01-16',
      items: [
        {
          id: 3,
          productName: 'جهاز كمبيوتر محمول',
          quantity: 3,
          unitPrice: 5000,
          totalPrice: 15000,
          description: 'جهاز كمبيوتر محمول عالي المواصفات',
        },
        {
          id: 4,
          productName: 'شاشة عرض',
          quantity: 3,
          unitPrice: 2000,
          totalPrice: 6000,
          description: 'شاشة عرض 24 بوصة',
        },
        {
          id: 5,
          productName: 'طابعة ليزر',
          quantity: 1,
          unitPrice: 4000,
          totalPrice: 4000,
          description: 'طابعة ليزر ملونة',
        },
      ],
    },
    {
      id: 3,
      requestNumber: 'PR-2024-003',
      date: '2024-01-13',
      requestedBy: 'خالد حسن',
      department: 'المخازن',
      priority: 'low',
      status: 'rejected',
      totalAmount: 8000,
      currency: 'SAR',
      description: 'طلب شراء مواد تنظيف',
      justification: 'توفير مواد التنظيف للمخازن',
      requestedDeliveryDate: '2024-01-20',
      approvedBy: 'فاطمة علي',
      approvedDate: '2024-01-14',
      items: [
        {
          id: 6,
          productName: 'منظف أرضيات',
          quantity: 10,
          unitPrice: 50,
          totalPrice: 500,
          description: 'منظف أرضيات عالي الجودة',
        },
        {
          id: 7,
          productName: 'مناديل ورقية',
          quantity: 20,
          unitPrice: 25,
          totalPrice: 500,
          description: 'مناديل ورقية للاستخدام العام',
        },
        {
          id: 8,
          productName: 'مطهرات',
          quantity: 15,
          unitPrice: 30,
          totalPrice: 450,
          description: 'مطهرات للأسطح',
        },
      ],
    },
    {
      id: 4,
      requestNumber: 'PR-2024-004',
      date: '2024-01-12',
      requestedBy: 'عبدالله سالم',
      department: 'الصيانة',
      priority: 'high',
      status: 'in_progress',
      totalAmount: 12000,
      currency: 'SAR',
      description: 'طلب شراء قطع غيار',
      justification: 'صيانة دورية للمعدات',
      requestedDeliveryDate: '2024-01-18',
      approvedBy: 'محمد علي',
      approvedDate: '2024-01-13',
      items: [
        {
          id: 9,
          productName: 'فلتر هواء',
          quantity: 5,
          unitPrice: 800,
          totalPrice: 4000,
          description: 'فلتر هواء للمكيفات',
        },
        {
          id: 10,
          productName: 'محرك كهربائي',
          quantity: 2,
          unitPrice: 4000,
          totalPrice: 8000,
          description: 'محرك كهربائي 1.5 حصان',
        },
      ],
    },
    {
      id: 5,
      requestNumber: 'PR-2024-005',
      date: '2024-01-11',
      requestedBy: 'نورا محمد',
      department: 'التسويق',
      priority: 'medium',
      status: 'completed',
      totalAmount: 5000,
      currency: 'SAR',
      description: 'طلب شراء مواد تسويقية',
      justification: 'حملة تسويقية جديدة',
      requestedDeliveryDate: '2024-01-15',
      approvedBy: 'أحمد محمد',
      approvedDate: '2024-01-12',
      items: [
        {
          id: 11,
          productName: 'مطبوعات دعائية',
          quantity: 1000,
          unitPrice: 2,
          totalPrice: 2000,
          description: 'بروشورات دعائية',
        },
        {
          id: 12,
          productName: 'لافتات',
          quantity: 10,
          unitPrice: 300,
          totalPrice: 3000,
          description: 'لافتات إعلانية',
        },
      ],
    },
  ];

  const requestStatuses = [
    { value: 'pending', label: 'في الانتظار', color: 'warning' },
    { value: 'approved', label: 'موافق عليه', color: 'success' },
    { value: 'rejected', label: 'مرفوض', color: 'error' },
    { value: 'in_progress', label: 'قيد التنفيذ', color: 'info' },
    { value: 'completed', label: 'مكتمل', color: 'success' },
  ];

  const priorityLevels = [
    { value: 'low', label: 'منخفض', color: 'default' },
    { value: 'medium', label: 'متوسط', color: 'warning' },
    { value: 'high', label: 'عالي', color: 'error' },
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
    notify(`${action} الطلبات`, `${selectedItems.length} طلب`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (request) => {
    setSelectedRequest(request);
    setOpenViewDialog(true);
  };

  const handleEdit = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleDelete = (request) => {
    setSelectedRequest(request);
    setOpenDeleteDialog(true);
  };

  const handleApprove = (request) => {
    notify('موافقة على الطلب', `تمت الموافقة على الطلب ${request.requestNumber}`);
  };

  const handleReject = (request) => {
    notify('رفض الطلب', `تم رفض الطلب ${request.requestNumber}`);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث الطلب', selectedRequest ? 'تم تحديث الطلب' : 'تم إنشاء الطلب');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف الطلب', 'تم حذف الطلب');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير طلبات الشراء', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = purchaseRequestsData.filter((item) => {
    const matchesSearch =
      item.requestNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
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
    const statusInfo = requestStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = requestStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
  };

  const getPriorityColor = (priority) => {
    const priorityInfo = priorityLevels.find((p) => p.value === priority);
    return priorityInfo ? priorityInfo.color : 'default';
  };

  const getPriorityLabel = (priority) => {
    const priorityInfo = priorityLevels.find((p) => p.value === priority);
    return priorityInfo ? priorityInfo.label : priority;
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

  const totalRequests = purchaseRequestsData.length;
  const pendingRequests = purchaseRequestsData.filter((req) => req.status === 'pending').length;
  const approvedRequests = purchaseRequestsData.filter((req) => req.status === 'approved').length;
  const totalAmount = purchaseRequestsData.reduce((sum, req) => sum + req.totalAmount, 0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          طلبات الشراء
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة طلبات الشراء مع نظام الموافقة والتنفيذ.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/procurement">
            المشتريات والموردين
          </Link>
          <Typography color="text.primary">طلبات الشراء</Typography>
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
                  <ShoppingCartIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalRequests}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الطلبات
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
                {approvedRequests}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                الطلبات الموافق عليها
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
                  <PendingIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {pendingRequests}
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
                  <AttachMoneyIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {formatCurrency(totalAmount)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي المبالغ
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
                placeholder="البحث في الطلبات..."
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
                  {requestStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الأولوية</InputLabel>
                <Select value={priorityFilter} label="الأولوية" onChange={(e) => setPriorityFilter(e.target.value)}>
                  <MenuItem value="all">جميع الأولويات</MenuItem>
                  {priorityLevels.map((priority) => (
                    <MenuItem key={priority.value} value={priority.value}>
                      {priority.label}
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
                  setPriorityFilter('all');
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
            قائمة طلبات الشراء
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button size="small" onClick={() => handleBulkAction('موافقة')} sx={{ mr: 1 }}>
                موافقة ({selectedItems.length})
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
            إضافة طلب جديد
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
            <Alert severity="error">خطأ في تحميل الطلبات. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على طلبات. أضف أول طلب.</Alert>
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
                      active={sortBy === 'requestNumber'}
                      direction={sortBy === 'requestNumber' ? sortOrder : 'asc'}
                      onClick={() => handleSort('requestNumber')}
                    >
                      رقم الطلب
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
                      active={sortBy === 'requestedBy'}
                      direction={sortBy === 'requestedBy' ? sortOrder : 'asc'}
                      onClick={() => handleSort('requestedBy')}
                    >
                      طالب الشراء
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'priority'}
                      direction={sortBy === 'priority' ? sortOrder : 'asc'}
                      onClick={() => handleSort('priority')}
                    >
                      الأولوية
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'totalAmount'}
                      direction={sortBy === 'totalAmount' ? sortOrder : 'asc'}
                      onClick={() => handleSort('totalAmount')}
                    >
                      المبلغ
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
                          {item.requestNumber}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.department}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{formatDate(item.date)}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          التسليم: {formatDate(item.requestedDeliveryDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{item.description}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.justification}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                            <PersonIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="body2">{item.requestedBy}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.department}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getPriorityLabel(item.priority)}
                          size="small"
                          color={getPriorityColor(item.priority)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {formatCurrency(item.totalAmount)}
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
                          <Tooltip title="تعديل الطلب" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
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
                          <Tooltip title="حذف الطلب" arrow>
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
        <DialogTitle>{selectedRequest ? 'تعديل الطلب' : 'إضافة طلب جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الطلب"
                placeholder="مثال: PR-2024-001"
                defaultValue={selectedRequest?.requestNumber || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="التاريخ"
                defaultValue={selectedRequest?.date || ''}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="طالب الشراء"
                placeholder="أدخل اسم طالب الشراء"
                defaultValue={selectedRequest?.requestedBy || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="القسم"
                placeholder="أدخل اسم القسم"
                defaultValue={selectedRequest?.department || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الأولوية</InputLabel>
                <Select label="الأولوية" defaultValue={selectedRequest?.priority || 'medium'}>
                  {priorityLevels.map((priority) => (
                    <MenuItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ التسليم المطلوب"
                defaultValue={selectedRequest?.requestedDeliveryDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الوصف"
                placeholder="أدخل وصف الطلب"
                defaultValue={selectedRequest?.description || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="المبرر"
                placeholder="أدخل مبرر الطلب"
                defaultValue={selectedRequest?.justification || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                عناصر الطلب
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>اسم المنتج</TableCell>
                    <TableCell>الكمية</TableCell>
                    <TableCell>سعر الوحدة</TableCell>
                    <TableCell>المجموع</TableCell>
                    <TableCell>الوصف</TableCell>
                    <TableCell>الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedRequest?.items?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          defaultValue={item.productName}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          defaultValue={item.quantity}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          defaultValue={item.unitPrice}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          defaultValue={item.totalPrice}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          defaultValue={item.description}
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
                      <TableCell colSpan={6} align="center">
                        <Button startIcon={<AddIcon />} size="small">
                          إضافة عنصر
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
        <DialogTitle>حذف الطلب</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا الطلب؟
          </Typography>
          {selectedRequest && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedRequest.requestNumber}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedRequest.description} - {formatDate(selectedRequest.date)}
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
            تفاصيل الطلب
          </Typography>
          {selectedRequest && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  <ShoppingCartIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedRequest.requestNumber}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(selectedRequest.date)}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="رقم الطلب" secondary={selectedRequest.requestNumber} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="التاريخ" secondary={formatDate(selectedRequest.date)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="طالب الشراء" secondary={selectedRequest.requestedBy} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="القسم" secondary={selectedRequest.department} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الأولوية" secondary={getPriorityLabel(selectedRequest.priority)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحالة" secondary={getStatusLabel(selectedRequest.status)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المبلغ الإجمالي" secondary={formatCurrency(selectedRequest.totalAmount)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="تاريخ التسليم المطلوب" secondary={formatDate(selectedRequest.requestedDeliveryDate)} />
                </ListItem>
                {selectedRequest.approvedBy && (
                  <ListItem>
                    <ListItemText primary="وافق عليه" secondary={selectedRequest.approvedBy} />
                  </ListItem>
                )}
                {selectedRequest.approvedDate && (
                  <ListItem>
                    <ListItemText primary="تاريخ الموافقة" secondary={formatDate(selectedRequest.approvedDate)} />
                  </ListItem>
                )}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الوصف
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedRequest.description}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                المبرر
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedRequest.justification}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                عناصر الطلب
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>المنتج</TableCell>
                    <TableCell>الكمية</TableCell>
                    <TableCell>السعر</TableCell>
                    <TableCell>المجموع</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedRequest.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Typography variant="body2">{item.productName}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.quantity}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{formatCurrency(item.unitPrice)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          {formatCurrency(item.totalPrice)}
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

export default PurchaseRequests;
