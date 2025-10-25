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
  Drawer,
  List,
  ListItem,
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
  LocalShipping as LocalShippingIcon,
  Download as DownloadIcon,
  AttachMoney as AttachMoneyIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
} from '@mui/icons-material';

const GoodsReceipts = () => {
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
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('receiptDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for goods receipts
  const goodsReceiptsData = [
    {
      id: 1,
      receiptNumber: 'GR-2024-001',
      purchaseOrderNumber: 'PO-2024-001',
      supplier: 'شركة التقنية المتقدمة',
      supplierCode: 'SUP001',
      receiptDate: '2024-01-15',
      expectedDate: '2024-01-15',
      status: 'completed',
      totalItems: 25,
      receivedItems: 25,
      pendingItems: 0,
      totalValue: 150000,
      currency: 'SAR',
      warehouse: 'مستودع الرياض الرئيسي',
      warehouseCode: 'WH001',
      receivedBy: 'أحمد محمد علي',
      receivedByEmail: 'ahmed@company.com',
      receivedByPhone: '+966501234567',
      notes: 'تم استلام جميع البضائع بحالة جيدة',
      items: [
        {
          id: 1,
          productName: 'جهاز كمبيوتر محمول HP',
          productCode: 'LAP-001',
          quantity: 10,
          receivedQuantity: 10,
          unitPrice: 5000,
          totalPrice: 50000,
          condition: 'جيد',
          serialNumbers: ['SN001', 'SN002', 'SN003'],
        },
        {
          id: 2,
          productName: 'طابعة ليزر HP',
          productCode: 'PRT-001',
          quantity: 5,
          receivedQuantity: 5,
          unitPrice: 2000,
          totalPrice: 10000,
          condition: 'جيد',
          serialNumbers: ['SN004', 'SN005'],
        },
        {
          id: 3,
          productName: 'شاشة LED 24 بوصة',
          productCode: 'MON-001',
          quantity: 10,
          receivedQuantity: 10,
          unitPrice: 1000,
          totalPrice: 10000,
          condition: 'جيد',
          serialNumbers: ['SN006', 'SN007', 'SN008'],
        },
      ],
      documents: [
        { name: 'فاتورة الشراء', type: 'pdf', size: '1.2 MB', uploadedDate: '2024-01-15' },
        { name: 'شهادة الضمان', type: 'pdf', size: '0.8 MB', uploadedDate: '2024-01-15' },
        { name: 'دليل المستخدم', type: 'pdf', size: '2.1 MB', uploadedDate: '2024-01-15' },
      ],
      qualityCheck: {
        status: 'passed',
        checkedBy: 'محمد أحمد',
        checkedDate: '2024-01-15',
        notes: 'جميع المنتجات مطابقة للمواصفات',
      },
      createdBy: 'مدير المستودع',
      createdDate: '2024-01-15',
      lastModified: '2024-01-15',
    },
    {
      id: 2,
      receiptNumber: 'GR-2024-002',
      purchaseOrderNumber: 'PO-2024-002',
      supplier: 'مؤسسة الأجهزة المكتبية',
      supplierCode: 'SUP002',
      receiptDate: '2024-01-12',
      expectedDate: '2024-01-10',
      status: 'partial',
      totalItems: 15,
      receivedItems: 12,
      pendingItems: 3,
      totalValue: 75000,
      currency: 'SAR',
      warehouse: 'مستودع جدة التجاري',
      warehouseCode: 'WH002',
      receivedBy: 'فاطمة أحمد السعيد',
      receivedByEmail: 'fatima@company.com',
      receivedByPhone: '+966501234568',
      notes: 'تم استلام 12 من أصل 15 منتج - 3 منتجات متأخرة',
      items: [
        {
          id: 1,
          productName: 'مكتب خشبي',
          productCode: 'DESK-001',
          quantity: 5,
          receivedQuantity: 5,
          unitPrice: 3000,
          totalPrice: 15000,
          condition: 'جيد',
          serialNumbers: ['SN009', 'SN010'],
        },
        {
          id: 2,
          productName: 'كرسي مكتب',
          productCode: 'CHAIR-001',
          quantity: 10,
          receivedQuantity: 7,
          unitPrice: 500,
          totalPrice: 3500,
          condition: 'جيد',
          serialNumbers: ['SN011', 'SN012'],
        },
        {
          id: 3,
          productName: 'خزانة ملفات',
          productCode: 'CAB-001',
          quantity: 3,
          receivedQuantity: 0,
          unitPrice: 2000,
          totalPrice: 0,
          condition: 'غير مستلم',
          serialNumbers: [],
        },
      ],
      documents: [
        { name: 'فاتورة الشراء', type: 'pdf', size: '1.5 MB', uploadedDate: '2024-01-12' },
        { name: 'شهادة المنشأ', type: 'pdf', size: '0.9 MB', uploadedDate: '2024-01-12' },
      ],
      qualityCheck: {
        status: 'pending',
        checkedBy: null,
        checkedDate: null,
        notes: 'في انتظار المراجعة',
      },
      createdBy: 'مدير المستودع',
      createdDate: '2024-01-12',
      lastModified: '2024-01-12',
    },
    {
      id: 3,
      receiptNumber: 'GR-2024-003',
      purchaseOrderNumber: 'PO-2024-003',
      supplier: 'شركة المواد الخام الصناعية',
      supplierCode: 'SUP003',
      receiptDate: '2024-01-18',
      expectedDate: '2024-01-20',
      status: 'pending',
      totalItems: 50,
      receivedItems: 0,
      pendingItems: 50,
      totalValue: 200000,
      currency: 'SAR',
      warehouse: 'مستودع الدمام الصناعي',
      warehouseCode: 'WH003',
      receivedBy: 'خالد عبدالله المطيري',
      receivedByEmail: 'khalid@company.com',
      receivedByPhone: '+966501234569',
      notes: 'في انتظار وصول البضائع',
      items: [
        {
          id: 1,
          productName: 'مواد بلاستيكية',
          productCode: 'PLASTIC-001',
          quantity: 20,
          receivedQuantity: 0,
          unitPrice: 5000,
          totalPrice: 0,
          condition: 'غير مستلم',
          serialNumbers: [],
        },
        {
          id: 2,
          productName: 'معادن',
          productCode: 'METAL-001',
          quantity: 30,
          receivedQuantity: 0,
          unitPrice: 3000,
          totalPrice: 0,
          condition: 'غير مستلم',
          serialNumbers: [],
        },
      ],
      documents: [
        { name: 'فاتورة الشراء', type: 'pdf', size: '2.1 MB', uploadedDate: '2024-01-18' },
      ],
      qualityCheck: {
        status: 'pending',
        checkedBy: null,
        checkedDate: null,
        notes: 'في انتظار الاستلام',
      },
      createdBy: 'مدير المستودع',
      createdDate: '2024-01-18',
      lastModified: '2024-01-18',
    },
    {
      id: 4,
      receiptNumber: 'GR-2024-004',
      purchaseOrderNumber: 'PO-2024-004',
      supplier: 'شركة الأثاث الفاخر',
      supplierCode: 'SUP005',
      receiptDate: '2024-01-20',
      expectedDate: '2024-01-22',
      status: 'completed',
      totalItems: 8,
      receivedItems: 8,
      pendingItems: 0,
      totalValue: 120000,
      currency: 'SAR',
      warehouse: 'مستودع الطائف الجبلي',
      warehouseCode: 'WH004',
      receivedBy: 'محمد عبدالرحمن الشمري',
      receivedByEmail: 'mohammed@company.com',
      receivedByPhone: '+966501234570',
      notes: 'تم استلام جميع البضائع بحالة ممتازة',
      items: [
        {
          id: 1,
          productName: 'مكتب فاخر',
          productCode: 'LUX-DESK-001',
          quantity: 2,
          receivedQuantity: 2,
          unitPrice: 25000,
          totalPrice: 50000,
          condition: 'ممتاز',
          serialNumbers: ['SN013', 'SN014'],
        },
        {
          id: 2,
          productName: 'كرسي فاخر',
          productCode: 'LUX-CHAIR-001',
          quantity: 6,
          receivedQuantity: 6,
          unitPrice: 5000,
          totalPrice: 30000,
          condition: 'ممتاز',
          serialNumbers: ['SN015', 'SN016', 'SN017'],
        },
      ],
      documents: [
        { name: 'فاتورة الشراء', type: 'pdf', size: '1.8 MB', uploadedDate: '2024-01-20' },
        { name: 'شهادة الجودة', type: 'pdf', size: '1.2 MB', uploadedDate: '2024-01-20' },
        { name: 'دليل الصيانة', type: 'pdf', size: '3.1 MB', uploadedDate: '2024-01-20' },
      ],
      qualityCheck: {
        status: 'passed',
        checkedBy: 'سارة محمد',
        checkedDate: '2024-01-20',
        notes: 'جميع المنتجات مطابقة للمواصفات العالية',
      },
      createdBy: 'مدير المستودع',
      createdDate: '2024-01-20',
      lastModified: '2024-01-20',
    },
    {
      id: 5,
      receiptNumber: 'GR-2024-005',
      purchaseOrderNumber: 'PO-2024-005',
      supplier: 'شركة الخدمات اللوجستية',
      supplierCode: 'SUP004',
      receiptDate: '2024-01-10',
      expectedDate: '2024-01-08',
      status: 'rejected',
      totalItems: 12,
      receivedItems: 0,
      pendingItems: 12,
      totalValue: 45000,
      currency: 'SAR',
      warehouse: 'مستودع الخبر الساحلي',
      warehouseCode: 'WH005',
      receivedBy: 'فاطمة محمد الحسن',
      receivedByEmail: 'fatima@company.com',
      receivedByPhone: '+966501234571',
      notes: 'تم رفض الاستلام بسبب عدم مطابقة المواصفات',
      items: [
        {
          id: 1,
          productName: 'خدمات النقل',
          productCode: 'TRANS-001',
          quantity: 12,
          receivedQuantity: 0,
          unitPrice: 3750,
          totalPrice: 0,
          condition: 'مرفوض',
          serialNumbers: [],
        },
      ],
      documents: [
        { name: 'فاتورة الشراء', type: 'pdf', size: '1.1 MB', uploadedDate: '2024-01-10' },
        { name: 'تقرير الرفض', type: 'pdf', size: '0.7 MB', uploadedDate: '2024-01-10' },
      ],
      qualityCheck: {
        status: 'failed',
        checkedBy: 'أحمد علي',
        checkedDate: '2024-01-10',
        notes: 'الخدمات لا تطابق المواصفات المطلوبة',
      },
      createdBy: 'مدير المستودع',
      createdDate: '2024-01-10',
      lastModified: '2024-01-10',
    },
  ];

  const receiptStatuses = [
    { value: 'pending', label: 'في الانتظار', color: 'warning' },
    { value: 'partial', label: 'جزئي', color: 'info' },
    { value: 'completed', label: 'مكتمل', color: 'success' },
    { value: 'rejected', label: 'مرفوض', color: 'error' },
    { value: 'cancelled', label: 'ملغي', color: 'default' },
  ];

  const suppliers = [
    'شركة التقنية المتقدمة',
    'مؤسسة الأجهزة المكتبية',
    'شركة المواد الخام الصناعية',
    'شركة الخدمات اللوجستية',
    'شركة الأثاث الفاخر',
  ];

  const warehouses = [
    'مستودع الرياض الرئيسي',
    'مستودع جدة التجاري',
    'مستودع الدمام الصناعي',
    'مستودع الطائف الجبلي',
    'مستودع الخبر الساحلي',
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
    notify(`${action} الاستلامات`, `${selectedItems.length} استلام`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (receipt) => {
    setSelectedReceipt(receipt);
    setOpenViewDialog(true);
  };

  const handleEdit = (receipt) => {
    setSelectedReceipt(receipt);
    setOpenDialog(true);
  };

  const handleDelete = (receipt) => {
    setSelectedReceipt(receipt);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify(
        'تحديث الاستلام',
        selectedReceipt ? 'تم تحديث الاستلام' : 'تم إضافة الاستلام',
      );
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف الاستلام', 'تم حذف الاستلام');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير الاستلامات', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = goodsReceiptsData.filter((item) => {
    const matchesSearch =
      item.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.purchaseOrderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.warehouse.toLowerCase().includes(searchTerm.toLowerCase());
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
    const statusInfo = receiptStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = receiptStatuses.find((s) => s.value === status);
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

  const totalReceipts = goodsReceiptsData.length;
  const completedReceipts = goodsReceiptsData.filter((receipt) => receipt.status === 'completed').length;
  const pendingReceipts = goodsReceiptsData.filter((receipt) => receipt.status === 'pending').length;
  const totalValue = goodsReceiptsData.reduce((sum, receipt) => sum + receipt.totalValue, 0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          استلام البضائع
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة وتتبع استلام البضائع من الموردين مع مراقبة الجودة والحالة.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/procurement">
            المشتريات والموردين
          </Link>
          <Typography color="text.primary">استلام البضائع</Typography>
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
                  <LocalShippingIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalReceipts}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الاستلامات
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
                {completedReceipts}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                مكتملة
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
                {pendingReceipts}
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
                {formatCurrency(totalValue)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي القيمة
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
                placeholder="البحث في الاستلامات..."
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
                  {receiptStatuses.map((status) => (
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
            قائمة استلام البضائع
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button size="small" onClick={() => handleBulkAction('تأكيد')} sx={{ mr: 1 }}>
                تأكيد ({selectedItems.length})
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
            إضافة استلام
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
            <Alert severity="error">خطأ في تحميل الاستلامات. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على استلامات. أضف أول استلام.</Alert>
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
                      active={sortBy === 'receiptNumber'}
                      direction={sortBy === 'receiptNumber' ? sortOrder : 'asc'}
                      onClick={() => handleSort('receiptNumber')}
                    >
                      رقم الاستلام
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
                      active={sortBy === 'status'}
                      direction={sortBy === 'status' ? sortOrder : 'asc'}
                      onClick={() => handleSort('status')}
                    >
                      الحالة
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'receiptDate'}
                      direction={sortBy === 'receiptDate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('receiptDate')}
                    >
                      تاريخ الاستلام
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'warehouse'}
                      direction={sortBy === 'warehouse' ? sortOrder : 'asc'}
                      onClick={() => handleSort('warehouse')}
                    >
                      المستودع
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'totalValue'}
                      direction={sortBy === 'totalValue' ? sortOrder : 'asc'}
                      onClick={() => handleSort('totalValue')}
                    >
                      إجمالي القيمة
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
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {item.receiptNumber}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.purchaseOrderNumber}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">{item.supplier}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.supplierCode}
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
                      <TableCell>
                        <Typography variant="body2">{formatDate(item.receiptDate)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.warehouse}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {formatCurrency(item.totalValue)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل الاستلام" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف الاستلام" arrow>
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
        <DialogTitle>{selectedReceipt ? 'تعديل الاستلام' : 'إضافة استلام جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الاستلام"
                placeholder="GR-2024-001"
                defaultValue={selectedReceipt?.receiptNumber || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم أمر الشراء"
                placeholder="PO-2024-001"
                defaultValue={selectedReceipt?.purchaseOrderNumber || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>المورد</InputLabel>
                <Select label="المورد" defaultValue={selectedReceipt?.supplier || ''}>
                  {suppliers.map((supplier) => (
                    <MenuItem key={supplier} value={supplier}>
                      {supplier}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>المستودع</InputLabel>
                <Select label="المستودع" defaultValue={selectedReceipt?.warehouse || ''}>
                  {warehouses.map((warehouse) => (
                    <MenuItem key={warehouse} value={warehouse}>
                      {warehouse}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الاستلام"
                defaultValue={selectedReceipt?.receiptDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="التاريخ المتوقع"
                defaultValue={selectedReceipt?.expectedDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedReceipt?.status || 'pending'}>
                  {receiptStatuses.map((status) => (
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
                label="إجمالي القيمة"
                placeholder="150000"
                defaultValue={selectedReceipt?.totalValue || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المستلم بواسطة"
                placeholder="أدخل اسم المستلم"
                defaultValue={selectedReceipt?.receivedBy || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="receiver@company.com"
                defaultValue={selectedReceipt?.receivedByEmail || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                placeholder="+966501234567"
                defaultValue={selectedReceipt?.receivedByPhone || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="الملاحظات"
                placeholder="أدخل ملاحظات حول الاستلام"
                defaultValue={selectedReceipt?.notes || ''}
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
        <DialogTitle>حذف الاستلام</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا الاستلام؟
          </Typography>
          {selectedReceipt && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedReceipt.receiptNumber}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedReceipt.supplier} - {formatDate(selectedReceipt.receiptDate)}
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
            تفاصيل الاستلام
          </Typography>
          {selectedReceipt && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  <LocalShippingIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedReceipt.receiptNumber}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedReceipt.purchaseOrderNumber}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="رقم الاستلام" secondary={selectedReceipt.receiptNumber} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم أمر الشراء" secondary={selectedReceipt.purchaseOrderNumber} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المورد" secondary={selectedReceipt.supplier} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="كود المورد" secondary={selectedReceipt.supplierCode} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحالة" secondary={getStatusLabel(selectedReceipt.status)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="تاريخ الاستلام" secondary={formatDate(selectedReceipt.receiptDate)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="التاريخ المتوقع" secondary={formatDate(selectedReceipt.expectedDate)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المستودع" secondary={selectedReceipt.warehouse} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="كود المستودع" secondary={selectedReceipt.warehouseCode} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المستلم بواسطة" secondary={selectedReceipt.receivedBy} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="البريد الإلكتروني" secondary={selectedReceipt.receivedByEmail} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم الهاتف" secondary={selectedReceipt.receivedByPhone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="إجمالي العناصر" secondary={`${selectedReceipt.totalItems} عنصر`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العناصر المستلمة" secondary={`${selectedReceipt.receivedItems} عنصر`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العناصر المعلقة" secondary={`${selectedReceipt.pendingItems} عنصر`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="إجمالي القيمة" secondary={formatCurrency(selectedReceipt.totalValue)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العملة" secondary={selectedReceipt.currency} />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                العناصر
              </Typography>
              <List dense>
                {selectedReceipt.items.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item.productName}
                      secondary={`${item.receivedQuantity}/${item.quantity} - ${formatCurrency(item.totalPrice)}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المستندات
              </Typography>
              <List dense>
                {selectedReceipt.documents.map((doc, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={doc.name}
                      secondary={`${doc.type.toUpperCase()} - ${doc.size} - ${formatDate(doc.uploadedDate)}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                فحص الجودة
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>الحالة:</strong> {selectedReceipt.qualityCheck.status === 'passed' ? 'نجح' : selectedReceipt.qualityCheck.status === 'failed' ? 'فشل' : 'في الانتظار'}
                </Typography>
                {selectedReceipt.qualityCheck.checkedBy && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>فحص بواسطة:</strong> {selectedReceipt.qualityCheck.checkedBy}
                  </Typography>
                )}
                {selectedReceipt.qualityCheck.checkedDate && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>تاريخ الفحص:</strong> {formatDate(selectedReceipt.qualityCheck.checkedDate)}
                  </Typography>
                )}
                <Typography variant="body2">
                  <strong>الملاحظات:</strong> {selectedReceipt.qualityCheck.notes}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الملاحظات
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedReceipt.notes}
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

export default GoodsReceipts;
