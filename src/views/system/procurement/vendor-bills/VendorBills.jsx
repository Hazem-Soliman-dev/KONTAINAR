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
  ListItemText,
  Drawer,
  List,
  ListItem,
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
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  ViewColumn as ViewColumnIcon,
  DensityMedium as DensityMediumIcon,
  DensitySmall as DensitySmallIcon,
  DensityLarge as DensityLargeIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  AttachMoney as AttachMoneyIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  LocalShipping as LocalShippingIcon,
  Payment as PaymentIcon,
  CreditCard as CreditCardIcon,
} from '@mui/icons-material';

const VendorBills = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for vendor bills
  const vendorBillsData = [
    {
      id: 1,
      billNumber: 'VB-2024-001',
      date: '2024-01-15',
      dueDate: '2024-02-15',
      supplier: 'شركة التقنية المتقدمة',
      supplierContact: 'أحمد السعيد',
      supplierEmail: 'ahmed@tech.com',
      supplierPhone: '+966501234567',
      status: 'pending',
      totalAmount: 25000,
      paidAmount: 0,
      remainingAmount: 25000,
      currency: 'SAR',
      description: 'فاتورة أجهزة كمبيوتر',
      purchaseOrderNumber: 'PO-2024-001',
      items: [
        {
          id: 1,
          productName: 'جهاز كمبيوتر محمول',
          quantity: 5,
          unitPrice: 3000,
          totalPrice: 15000,
          description: 'جهاز كمبيوتر محمول عالي المواصفات',
        },
        {
          id: 2,
          productName: 'شاشة عرض',
          quantity: 5,
          unitPrice: 2000,
          totalPrice: 10000,
          description: 'شاشة عرض 24 بوصة',
        },
      ],
      paymentTerms: '30 يوم',
      notes: 'يرجى التأكد من جودة المنتجات',
      attachments: ['invoice_001.pdf', 'receipt_001.pdf'],
    },
    {
      id: 2,
      billNumber: 'VB-2024-002',
      date: '2024-01-14',
      dueDate: '2024-01-29',
      supplier: 'مؤسسة الأثاث الحديث',
      supplierContact: 'سارة أحمد',
      supplierEmail: 'sara@furniture.com',
      supplierPhone: '+966502345678',
      status: 'paid',
      totalAmount: 15000,
      paidAmount: 15000,
      remainingAmount: 0,
      currency: 'SAR',
      description: 'فاتورة أثاث مكتبي',
      purchaseOrderNumber: 'PO-2024-002',
      items: [
        {
          id: 3,
          productName: 'طاولة مكتب',
          quantity: 3,
          unitPrice: 3000,
          totalPrice: 9000,
          description: 'طاولة مكتب خشبية',
        },
        {
          id: 4,
          productName: 'كرسي مكتب',
          quantity: 3,
          unitPrice: 2000,
          totalPrice: 6000,
          description: 'كرسي مكتب مريح',
        },
      ],
      paymentTerms: '15 يوم',
      notes: 'تم الدفع بالكامل',
      attachments: ['invoice_002.pdf'],
      paymentDate: '2024-01-20',
      paymentMethod: 'تحويل بنكي',
    },
    {
      id: 3,
      billNumber: 'VB-2024-003',
      date: '2024-01-13',
      dueDate: '2024-02-27',
      supplier: 'شركة المواد الخام',
      supplierContact: 'خالد محمد',
      supplierEmail: 'khalid@materials.com',
      supplierPhone: '+966503456789',
      status: 'partial',
      totalAmount: 8000,
      paidAmount: 4000,
      remainingAmount: 4000,
      currency: 'SAR',
      description: 'فاتورة مواد خام',
      purchaseOrderNumber: 'PO-2024-003',
      items: [
        {
          id: 5,
          productName: 'خامات بلاستيكية',
          quantity: 100,
          unitPrice: 50,
          totalPrice: 5000,
          description: 'خامات بلاستيكية عالية الجودة',
        },
        {
          id: 6,
          productName: 'مواد كيميائية',
          quantity: 50,
          unitPrice: 60,
          totalPrice: 3000,
          description: 'مواد كيميائية للتصنيع',
        },
      ],
      paymentTerms: '45 يوم',
      notes: 'دفعة جزئية',
      attachments: ['invoice_003.pdf'],
      paymentDate: '2024-01-18',
      paymentMethod: 'شيك',
    },
    {
      id: 4,
      billNumber: 'VB-2024-004',
      date: '2024-01-12',
      dueDate: '2024-02-12',
      supplier: 'شركة الخدمات التقنية',
      supplierContact: 'نورا سالم',
      supplierEmail: 'nora@techservices.com',
      supplierPhone: '+966504567890',
      status: 'overdue',
      totalAmount: 12000,
      paidAmount: 0,
      remainingAmount: 12000,
      currency: 'SAR',
      description: 'فاتورة خدمات تقنية',
      purchaseOrderNumber: 'PO-2024-004',
      items: [
        {
          id: 7,
          productName: 'خدمة صيانة',
          quantity: 1,
          unitPrice: 5000,
          totalPrice: 5000,
          description: 'خدمة صيانة سنوية',
        },
        {
          id: 8,
          productName: 'دعم تقني',
          quantity: 1,
          unitPrice: 7000,
          totalPrice: 7000,
          description: 'دعم تقني لمدة سنة',
        },
      ],
      paymentTerms: '30 يوم',
      notes: 'فاتورة متأخرة',
      attachments: ['invoice_004.pdf'],
    },
    {
      id: 5,
      billNumber: 'VB-2024-005',
      date: '2024-01-11',
      dueDate: '2024-03-12',
      supplier: 'شركة المعدات الصناعية',
      supplierContact: 'عبدالله حسن',
      supplierEmail: 'abdullah@industrial.com',
      supplierPhone: '+966505678901',
      status: 'cancelled',
      totalAmount: 30000,
      paidAmount: 0,
      remainingAmount: 30000,
      currency: 'SAR',
      description: 'فاتورة معدات صناعية',
      purchaseOrderNumber: 'PO-2024-005',
      items: [
        {
          id: 9,
          productName: 'معدات تصنيع',
          quantity: 2,
          unitPrice: 15000,
          totalPrice: 30000,
          description: 'معدات تصنيع متطورة',
        },
      ],
      paymentTerms: '60 يوم',
      notes: 'تم الإلغاء بسبب تغيير المواصفات',
      attachments: [],
    },
  ];

  const billStatuses = [
    { value: 'pending', label: 'في الانتظار', color: 'warning' },
    { value: 'partial', label: 'دفع جزئي', color: 'info' },
    { value: 'paid', label: 'مدفوعة', color: 'success' },
    { value: 'overdue', label: 'متأخرة', color: 'error' },
    { value: 'cancelled', label: 'ملغية', color: 'default' },
  ];

  const suppliers = [
    'شركة التقنية المتقدمة',
    'مؤسسة الأثاث الحديث',
    'شركة المواد الخام',
    'شركة الخدمات التقنية',
    'شركة المعدات الصناعية',
  ];

  const paymentMethods = ['نقدي', 'تحويل بنكي', 'شيك', 'بطاقة ائتمان', 'تحويل إلكتروني'];

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
    notify(`${action} الفواتير`, `${selectedItems.length} فاتورة`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (bill) => {
    setSelectedBill(bill);
    setOpenViewDialog(true);
  };

  const handleEdit = (bill) => {
    setSelectedBill(bill);
    setOpenDialog(true);
  };

  const handleDelete = (bill) => {
    setSelectedBill(bill);
    setOpenDeleteDialog(true);
  };

  const handlePayment = (bill) => {
    setSelectedBill(bill);
    setOpenPaymentDialog(true);
  };

  const handleApprove = (bill) => {
    notify('موافقة على الفاتورة', `تمت الموافقة على الفاتورة ${bill.billNumber}`);
  };

  const handleReject = (bill) => {
    notify('رفض الفاتورة', `تم رفض الفاتورة ${bill.billNumber}`);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث الفاتورة', selectedBill ? 'تم تحديث الفاتورة' : 'تم إنشاء الفاتورة');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف الفاتورة', 'تم حذف الفاتورة');
    }, 1000);
  };

  const handlePaymentSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenPaymentDialog(false);
      notify('تسجيل الدفع', 'تم تسجيل الدفع');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير فواتير الموردين', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = vendorBillsData.filter((item) => {
    const matchesSearch =
      item.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplierContact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSupplier = supplierFilter === 'all' || item.supplier === supplierFilter;
    return matchesSearch && matchesStatus && matchesSupplier;
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
    const statusInfo = billStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = billStatuses.find((s) => s.value === status);
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

  const totalBills = vendorBillsData.length;
  const pendingBills = vendorBillsData.filter((bill) => bill.status === 'pending').length;
  const paidBills = vendorBillsData.filter((bill) => bill.status === 'paid').length;
  const totalAmount = vendorBillsData.reduce((sum, bill) => sum + bill.totalAmount, 0);
  const totalPaid = vendorBillsData.reduce((sum, bill) => sum + bill.paidAmount, 0);
  const totalRemaining = vendorBillsData.reduce((sum, bill) => sum + bill.remainingAmount, 0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          فواتير الموردين
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة فواتير الموردين مع تتبع المدفوعات والمبالغ المستحقة.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/procurement">
            المشتريات والموردين
          </Link>
          <Typography color="text.primary">فواتير الموردين</Typography>
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
                {totalBills}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الفواتير
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
                {paidBills}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                الفواتير المدفوعة
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
                  <PendingIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {pendingBills}
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
                {formatCurrency(totalRemaining)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                المبالغ المستحقة
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
                placeholder="البحث في الفواتير..."
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
                  {billStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>المورد</InputLabel>
                <Select
                  value={supplierFilter}
                  label="المورد"
                  onChange={(e) => setSupplierFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الموردين</MenuItem>
                  {suppliers.map((supplier) => (
                    <MenuItem key={supplier} value={supplier}>
                      {supplier}
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
                  setSupplierFilter('all');
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
            قائمة فواتير الموردين
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
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
            إضافة فاتورة جديدة
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
            <Alert severity="error">خطأ في تحميل الفواتير. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على فواتير. أضف أول فاتورة.</Alert>
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
                      active={sortBy === 'billNumber'}
                      direction={sortBy === 'billNumber' ? sortOrder : 'asc'}
                      onClick={() => handleSort('billNumber')}
                    >
                      رقم الفاتورة
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
                      active={sortBy === 'supplier'}
                      direction={sortBy === 'supplier' ? sortOrder : 'asc'}
                      onClick={() => handleSort('supplier')}
                    >
                      المورد
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
                          {item.billNumber}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.purchaseOrderNumber}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{formatDate(item.date)}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          الاستحقاق: {formatDate(item.dueDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                            <BusinessIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="body2">{item.supplier}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.supplierContact}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{item.description}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.paymentTerms}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {formatCurrency(item.totalAmount)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            مدفوع: {formatCurrency(item.paidAmount)}
                          </Typography>
                          <Typography variant="caption" color="error.main">
                            متبقي: {formatCurrency(item.remainingAmount)}
                          </Typography>
                        </Box>
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
                          <Tooltip title="تعديل الفاتورة" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          {item.status === 'pending' && (
                            <>
                              <Tooltip title="موافقة" arrow>
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleApprove(item)}
                                >
                                  <CheckCircleIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="رفض" arrow>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleReject(item)}
                                >
                                  <CancelIcon />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          {item.status !== 'paid' && item.status !== 'cancelled' && (
                            <Tooltip title="تسجيل دفع" arrow>
                              <IconButton
                                size="small"
                                color="info"
                                onClick={() => handlePayment(item)}
                              >
                                <PaymentIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="حذف الفاتورة" arrow>
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{selectedBill ? 'تعديل الفاتورة' : 'إضافة فاتورة جديدة'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الفاتورة"
                placeholder="مثال: VB-2024-001"
                defaultValue={selectedBill?.billNumber || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="التاريخ"
                defaultValue={selectedBill?.date || ''}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الاستحقاق"
                defaultValue={selectedBill?.dueDate || ''}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم أمر الشراء"
                placeholder="مثال: PO-2024-001"
                defaultValue={selectedBill?.purchaseOrderNumber || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم المورد"
                placeholder="أدخل اسم المورد"
                defaultValue={selectedBill?.supplier || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="جهة الاتصال"
                placeholder="أدخل اسم جهة الاتصال"
                defaultValue={selectedBill?.supplierContact || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="أدخل البريد الإلكتروني"
                defaultValue={selectedBill?.supplierEmail || ''}
                type="email"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                placeholder="أدخل رقم الهاتف"
                defaultValue={selectedBill?.supplierPhone || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="شروط الدفع"
                placeholder="مثال: 30 يوم"
                defaultValue={selectedBill?.paymentTerms || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedBill?.status || 'pending'}>
                  {billStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الوصف"
                placeholder="أدخل وصف الفاتورة"
                defaultValue={selectedBill?.description || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="ملاحظات"
                placeholder="أدخل أي ملاحظات إضافية"
                defaultValue={selectedBill?.notes || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                عناصر الفاتورة
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
                  {selectedBill?.items?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField fullWidth size="small" defaultValue={item.productName} />
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
                        <TextField fullWidth size="small" defaultValue={item.description} />
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

      {/* Payment Dialog */}
      <Dialog
        open={openPaymentDialog}
        onClose={() => setOpenPaymentDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>تسجيل دفع</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="رقم الفاتورة"
                value={selectedBill?.billNumber || ''}
                disabled
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth type="number" label="مبلغ الدفع" placeholder="0.00" required />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الدفع"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>طريقة الدفع</InputLabel>
                <Select label="طريقة الدفع">
                  {paymentMethods.map((method) => (
                    <MenuItem key={method} value={method}>
                      {method}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="رقم المرجع" placeholder="مثال: REF-001" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="ملاحظات الدفع"
                placeholder="أدخل أي ملاحظات حول الدفع"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={handlePaymentSave}
            disabled={loading}
            startIcon={<SaveIcon />}
          >
            {loading ? 'جاري الحفظ...' : 'حفظ'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>حذف الفاتورة</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذه الفاتورة؟
          </Typography>
          {selectedBill && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedBill.billNumber}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedBill.description} - {formatDate(selectedBill.date)}
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
            تفاصيل الفاتورة
          </Typography>
          {selectedBill && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  <ReceiptIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedBill.billNumber}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(selectedBill.date)}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="رقم الفاتورة" secondary={selectedBill.billNumber} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="التاريخ" secondary={formatDate(selectedBill.date)} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="تاريخ الاستحقاق"
                    secondary={formatDate(selectedBill.dueDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المورد" secondary={selectedBill.supplier} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="جهة الاتصال" secondary={selectedBill.supplierContact} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="البريد الإلكتروني"
                    secondary={selectedBill.supplierEmail}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم الهاتف" secondary={selectedBill.supplierPhone} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="رقم أمر الشراء"
                    secondary={selectedBill.purchaseOrderNumber}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحالة" secondary={getStatusLabel(selectedBill.status)} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المبلغ الإجمالي"
                    secondary={formatCurrency(selectedBill.totalAmount)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المبلغ المدفوع"
                    secondary={formatCurrency(selectedBill.paidAmount)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المبلغ المتبقي"
                    secondary={formatCurrency(selectedBill.remainingAmount)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="شروط الدفع" secondary={selectedBill.paymentTerms} />
                </ListItem>
                {selectedBill.paymentDate && (
                  <ListItem>
                    <ListItemText
                      primary="تاريخ الدفع"
                      secondary={formatDate(selectedBill.paymentDate)}
                    />
                  </ListItem>
                )}
                {selectedBill.paymentMethod && (
                  <ListItem>
                    <ListItemText primary="طريقة الدفع" secondary={selectedBill.paymentMethod} />
                  </ListItem>
                )}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الوصف
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedBill.description}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                الملاحظات
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedBill.notes}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                عناصر الفاتورة
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
                  {selectedBill.items.map((item) => (
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
              {selectedBill.attachments && selectedBill.attachments.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    المرفقات
                  </Typography>
                  <List dense>
                    {selectedBill.attachments.map((attachment, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={attachment} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
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

export default VendorBills;
