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
  Business as BusinessIcon,
  CheckCircleOutline as CheckIcon,
  Download as DownloadIcon,
  AttachMoney as AttachMoneyIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const Suppliers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for suppliers
  const suppliersData = [
    {
      id: 1,
      name: 'شركة التقنية المتقدمة',
      code: 'SUP001',
      category: 'تقنية',
      status: 'active',
      contactPerson: 'أحمد محمد علي',
      email: 'ahmed@tech-advanced.com',
      phone: '+966112345678',
      address: 'الرياض - حي النخيل - شارع الملك فهد',
      city: 'الرياض',
      country: 'المملكة العربية السعودية',
      website: 'www.tech-advanced.com',
      taxNumber: '123456789',
      commercialRegister: 'CR-2023-001',
      rating: 4.5,
      totalOrders: 150,
      totalValue: 2500000,
      lastOrderDate: '2024-01-15',
      paymentTerms: 30,
      creditLimit: 500000,
      currentBalance: 125000,
      currency: 'SAR',
      bankDetails: {
        bankName: 'البنك الأهلي السعودي',
        accountNumber: '1234567890',
        iban: 'SA1234567890123456789012',
      },
      products: [
        { name: 'أجهزة كمبيوتر', category: 'إلكترونيات' },
        { name: 'طابعات', category: 'معدات مكتبية' },
        { name: 'شبكات', category: 'تقنية' },
      ],
      certifications: ['ISO 9001', 'ISO 14001', 'CE'],
      notes: 'مورد موثوق مع خدمة ممتازة',
      createdBy: 'مدير المشتريات',
      createdDate: '2023-01-15',
      lastModified: '2024-01-15',
    },
    {
      id: 2,
      name: 'مؤسسة الأجهزة المكتبية',
      code: 'SUP002',
      category: 'معدات مكتبية',
      status: 'active',
      contactPerson: 'فاطمة أحمد السعيد',
      email: 'fatima@office-equipment.com',
      phone: '+966126543210',
      address: 'جدة - حي الروضة - شارع التحلية',
      city: 'جدة',
      country: 'المملكة العربية السعودية',
      website: 'www.office-equipment.com',
      taxNumber: '987654321',
      commercialRegister: 'CR-2023-002',
      rating: 4.2,
      totalOrders: 85,
      totalValue: 1200000,
      lastOrderDate: '2024-01-12',
      paymentTerms: 15,
      creditLimit: 300000,
      currentBalance: 75000,
      currency: 'SAR',
      bankDetails: {
        bankName: 'البنك السعودي للاستثمار',
        accountNumber: '0987654321',
        iban: 'SA9876543210987654321098',
      },
      products: [
        { name: 'مكاتب', category: 'أثاث' },
        { name: 'كراسي', category: 'أثاث' },
        { name: 'خزائن', category: 'أثاث' },
      ],
      certifications: ['ISO 9001', 'FSC'],
      notes: 'متخصص في الأثاث المكتبي',
      createdBy: 'مدير المشتريات',
      createdDate: '2023-03-01',
      lastModified: '2024-01-12',
    },
    {
      id: 3,
      name: 'شركة المواد الخام الصناعية',
      code: 'SUP003',
      category: 'مواد خام',
      status: 'active',
      contactPerson: 'خالد عبدالله المطيري',
      email: 'khalid@raw-materials.com',
      phone: '+966133456789',
      address: 'الدمام - المنطقة الصناعية الثانية',
      city: 'الدمام',
      country: 'المملكة العربية السعودية',
      website: 'www.raw-materials.com',
      taxNumber: '456789123',
      commercialRegister: 'CR-2023-003',
      rating: 4.7,
      totalOrders: 200,
      totalValue: 5000000,
      lastOrderDate: '2024-01-18',
      paymentTerms: 45,
      creditLimit: 1000000,
      currentBalance: 250000,
      currency: 'SAR',
      bankDetails: {
        bankName: 'البنك السعودي الفرنسي',
        accountNumber: '4567891230',
        iban: 'SA4567891230456789012345',
      },
      products: [
        { name: 'مواد بلاستيكية', category: 'مواد خام' },
        { name: 'معادن', category: 'مواد خام' },
        { name: 'كيماويات', category: 'مواد خام' },
      ],
      certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001'],
      notes: 'مورد رئيسي للمواد الخام الصناعية',
      createdBy: 'مدير المشتريات',
      createdDate: '2023-02-15',
      lastModified: '2024-01-18',
    },
    {
      id: 4,
      name: 'شركة الخدمات اللوجستية',
      code: 'SUP004',
      category: 'خدمات',
      status: 'inactive',
      contactPerson: 'سارة محمد الحسن',
      email: 'sara@logistics-services.com',
      phone: '+966133567890',
      address: 'الخبر - حي الفيصلية - الكورنيش',
      city: 'الخبر',
      country: 'المملكة العربية السعودية',
      website: 'www.logistics-services.com',
      taxNumber: '789123456',
      commercialRegister: 'CR-2023-004',
      rating: 3.8,
      totalOrders: 45,
      totalValue: 800000,
      lastOrderDate: '2023-12-20',
      paymentTerms: 30,
      creditLimit: 200000,
      currentBalance: 0,
      currency: 'SAR',
      bankDetails: {
        bankName: 'البنك العربي الوطني',
        accountNumber: '7891234560',
        iban: 'SA7891234560789012345678',
      },
      products: [
        { name: 'خدمات النقل', category: 'خدمات' },
        { name: 'خدمات التخزين', category: 'خدمات' },
        { name: 'خدمات التوزيع', category: 'خدمات' },
      ],
      certifications: ['ISO 9001'],
      notes: 'مورد خدمات لوجستية - غير نشط حالياً',
      createdBy: 'مدير المشتريات',
      createdDate: '2023-04-01',
      lastModified: '2023-12-20',
    },
    {
      id: 5,
      name: 'شركة الأثاث الفاخر',
      code: 'SUP005',
      category: 'أثاث',
      status: 'active',
      contactPerson: 'محمد عبدالرحمن الشمري',
      email: 'mohammed@luxury-furniture.com',
      phone: '+966127654321',
      address: 'الطائف - حي الشهداء - شارع الملك عبدالعزيز',
      city: 'الطائف',
      country: 'المملكة العربية السعودية',
      website: 'www.luxury-furniture.com',
      taxNumber: '321654987',
      commercialRegister: 'CR-2023-005',
      rating: 4.9,
      totalOrders: 25,
      totalValue: 1500000,
      lastOrderDate: '2024-01-20',
      paymentTerms: 60,
      creditLimit: 400000,
      currentBalance: 100000,
      currency: 'SAR',
      bankDetails: {
        bankName: 'البنك السعودي الهولندي',
        accountNumber: '3216549870',
        iban: 'SA3216549870321654987032',
      },
      products: [
        { name: 'أثاث فاخر', category: 'أثاث' },
        { name: 'ديكورات', category: 'ديكور' },
        { name: 'إضاءة', category: 'ديكور' },
      ],
      certifications: ['ISO 9001', 'FSC', 'PEFC'],
      notes: 'متخصص في الأثاث الفاخر والمفروشات',
      createdBy: 'مدير المشتريات',
      createdDate: '2023-05-15',
      lastModified: '2024-01-20',
    },
  ];

  const supplierStatuses = [
    { value: 'active', label: 'نشط', color: 'success' },
    { value: 'inactive', label: 'غير نشط', color: 'error' },
    { value: 'pending', label: 'في الانتظار', color: 'warning' },
    { value: 'suspended', label: 'معلق', color: 'default' },
  ];

  const supplierCategories = [
    { value: 'تقنية', label: 'تقنية' },
    { value: 'معدات مكتبية', label: 'معدات مكتبية' },
    { value: 'مواد خام', label: 'مواد خام' },
    { value: 'خدمات', label: 'خدمات' },
    { value: 'أثاث', label: 'أثاث' },
    { value: 'إلكترونيات', label: 'إلكترونيات' },
    { value: 'مواد غذائية', label: 'مواد غذائية' },
    { value: 'أخرى', label: 'أخرى' },
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
    notify(`${action} الموردين`, `${selectedItems.length} مورد`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (supplier) => {
    setSelectedSupplier(supplier);
    setOpenViewDialog(true);
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setOpenDialog(true);
  };

  const handleDelete = (supplier) => {
    setSelectedSupplier(supplier);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث المورد', selectedSupplier ? 'تم تحديث المورد' : 'تم إضافة المورد');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف المورد', 'تم حذف المورد');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير الموردين', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = suppliersData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
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
    const statusInfo = supplierStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = supplierStatuses.find((s) => s.value === status);
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

  const totalSuppliers = suppliersData.length;
  const activeSuppliers = suppliersData.filter((supplier) => supplier.status === 'active').length;
  const totalValue = suppliersData.reduce((sum, supplier) => sum + supplier.totalValue, 0);
  const averageRating =
    suppliersData.reduce((sum, supplier) => sum + supplier.rating, 0) / suppliersData.length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إدارة الموردين
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة وتتبع جميع الموردين مع مراقبة الأداء والعلاقات التجارية.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/procurement">
            المشتريات والموردين
          </Link>
          <Typography color="text.primary">الموردين</Typography>
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
                  <BusinessIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalSuppliers}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الموردين
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
                {activeSuppliers}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                الموردين النشطين
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
                {formatCurrency(totalValue)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي القيمة
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
                  <StarIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {averageRating.toFixed(1)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                متوسط التقييم
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
                placeholder="البحث في الموردين..."
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
                  {supplierStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>التصنيف</InputLabel>
                <Select
                  value={categoryFilter}
                  label="التصنيف"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع التصنيفات</MenuItem>
                  {supplierCategories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
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
                  setCategoryFilter('all');
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
            قائمة الموردين
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
            إضافة مورد
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
            <Alert severity="error">خطأ في تحميل الموردين. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على موردين. أضف أول مورد.</Alert>
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
                      اسم المورد
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'category'}
                      direction={sortBy === 'category' ? sortOrder : 'asc'}
                      onClick={() => handleSort('category')}
                    >
                      التصنيف
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
                      active={sortBy === 'contactPerson'}
                      direction={sortBy === 'contactPerson' ? sortOrder : 'asc'}
                      onClick={() => handleSort('contactPerson')}
                    >
                      جهة الاتصال
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'rating'}
                      direction={sortBy === 'rating' ? sortOrder : 'asc'}
                      onClick={() => handleSort('rating')}
                    >
                      التقييم
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                            <BusinessIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">{item.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.code}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.category}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(item.status)}
                          size="small"
                          color={getStatusColor(item.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">{item.contactPerson}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <StarIcon sx={{ color: 'warning.main', fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {item.rating}
                          </Typography>
                        </Box>
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
                          <Tooltip title="تعديل المورد" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف المورد" arrow>
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
        <DialogTitle>{selectedSupplier ? 'تعديل المورد' : 'إضافة مورد جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم المورد"
                placeholder="أدخل اسم المورد"
                defaultValue={selectedSupplier?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="كود المورد"
                placeholder="SUP001"
                defaultValue={selectedSupplier?.code || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>التصنيف</InputLabel>
                <Select label="التصنيف" defaultValue={selectedSupplier?.category || ''}>
                  {supplierCategories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedSupplier?.status || 'active'}>
                  {supplierStatuses.map((status) => (
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
                label="جهة الاتصال"
                placeholder="أدخل اسم جهة الاتصال"
                defaultValue={selectedSupplier?.contactPerson || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="supplier@company.com"
                defaultValue={selectedSupplier?.email || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                placeholder="+966112345678"
                defaultValue={selectedSupplier?.phone || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الموقع الإلكتروني"
                placeholder="www.company.com"
                defaultValue={selectedSupplier?.website || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الضريبة"
                placeholder="123456789"
                defaultValue={selectedSupplier?.taxNumber || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="السجل التجاري"
                placeholder="CR-2023-001"
                defaultValue={selectedSupplier?.commercialRegister || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="حد الائتمان"
                placeholder="500000"
                defaultValue={selectedSupplier?.creditLimit || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="شروط الدفع (يوم)"
                placeholder="30"
                defaultValue={selectedSupplier?.paymentTerms || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="العنوان"
                placeholder="أدخل العنوان الكامل"
                defaultValue={selectedSupplier?.address || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="الملاحظات"
                placeholder="أدخل ملاحظات حول المورد"
                defaultValue={selectedSupplier?.notes || ''}
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
        <DialogTitle>حذف المورد</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا المورد؟
          </Typography>
          {selectedSupplier && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedSupplier.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedSupplier.contactPerson} - {selectedSupplier.code}
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
            تفاصيل المورد
          </Typography>
          {selectedSupplier && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  <BusinessIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedSupplier.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedSupplier.code}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="اسم المورد" secondary={selectedSupplier.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="كود المورد" secondary={selectedSupplier.code} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="التصنيف" secondary={selectedSupplier.category} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={getStatusLabel(selectedSupplier.status)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="جهة الاتصال" secondary={selectedSupplier.contactPerson} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="البريد الإلكتروني" secondary={selectedSupplier.email} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم الهاتف" secondary={selectedSupplier.phone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الموقع الإلكتروني" secondary={selectedSupplier.website} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم الضريبة" secondary={selectedSupplier.taxNumber} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="السجل التجاري"
                    secondary={selectedSupplier.commercialRegister}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العنوان" secondary={selectedSupplier.address} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المدينة" secondary={selectedSupplier.city} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="البلد" secondary={selectedSupplier.country} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="التقييم" secondary={`${selectedSupplier.rating} نجوم`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="إجمالي الطلبات"
                    secondary={`${selectedSupplier.totalOrders} طلب`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="إجمالي القيمة"
                    secondary={formatCurrency(selectedSupplier.totalValue)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="آخر طلب"
                    secondary={formatDate(selectedSupplier.lastOrderDate)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="شروط الدفع"
                    secondary={`${selectedSupplier.paymentTerms} يوم`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="حد الائتمان"
                    secondary={formatCurrency(selectedSupplier.creditLimit)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الرصيد الحالي"
                    secondary={formatCurrency(selectedSupplier.currentBalance)}
                  />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                تفاصيل البنك
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="اسم البنك"
                    secondary={selectedSupplier.bankDetails.bankName}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="رقم الحساب"
                    secondary={selectedSupplier.bankDetails.accountNumber}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="IBAN" secondary={selectedSupplier.bankDetails.iban} />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المنتجات
              </Typography>
              <List dense>
                {selectedSupplier.products.map((product, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={product.name} secondary={product.category} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الشهادات
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedSupplier.certifications.map((cert, index) => (
                  <Chip key={index} label={cert} size="small" color="primary" variant="outlined" />
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الملاحظات
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedSupplier.notes}
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

export default Suppliers;
