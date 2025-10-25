import React, { useState, useMemo, useCallback } from 'react';
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
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Tooltip,
  Snackbar,
  Alert,
  Avatar,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  IconButton,
  Stack,
  LinearProgress,
  Checkbox,
  TableSortLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  AttachMoney as AttachMoneyIcon,
  ShoppingCart as ShoppingCartIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    title: 'العملاء',
    content: '',
    isActive: true,
    customerStatus: 'active',
    customerDate: new Date().toISOString().split('T')[0],
    customerType: '',
    lastUpdated: new Date().toISOString().split('T')[0],
  });

  // بيانات العملاء الشاملة
  const customersData = [
    {
      id: 1,
      customerId: 'CUST-001',
      name: 'أحمد محمد العلي',
      email: 'ahmed.ali@example.com',
      phone: '+966501234567',
      company: 'شركة التقنية المتقدمة',
      type: 'individual',
      status: 'active',
      totalOrders: 15,
      totalSpent: 12500.0,
      lastOrder: '2024-01-15',
      joinDate: '2023-06-10',
      location: 'الرياض، المملكة العربية السعودية',
      segment: 'VIP',
      loyaltyPoints: 2500,
      notes: 'عميل مميز، يفضل المنتجات التقنية',
      tags: ['VIP', 'تقني', 'مشتريات عالية'],
      avatar: '/api/placeholder/40/40',
      rating: 4.8,
      reviews: 12,
      preferredLanguage: 'العربية',
      timezone: 'Asia/Riyadh',
      creditLimit: 50000,
      paymentTerms: '30 يوم',
      taxId: '1234567890',
      website: 'https://tech-advanced.com',
      socialMedia: {
        twitter: '@ahmed_ali',
        linkedin: 'ahmed-ali-tech',
      },
      addresses: [
        {
          type: 'billing',
          address: 'شارع الملك فهد، حي النخيل، الرياض 12345',
          isDefault: true,
        },
        {
          type: 'shipping',
          address: 'شارع التحلية، حي الروضة، جدة 21432',
          isDefault: false,
        },
      ],
      communication: {
        email: true,
        sms: true,
        phone: false,
        whatsapp: true,
      },
    },
    {
      id: 2,
      customerId: 'CUST-002',
      name: 'فاطمة أحمد السعد',
      email: 'fatima.saad@example.com',
      phone: '+966502345678',
      company: 'مؤسسة السعد التجارية',
      type: 'business',
      status: 'active',
      totalOrders: 8,
      totalSpent: 8750.0,
      lastOrder: '2024-01-12',
      joinDate: '2023-08-15',
      location: 'جدة، المملكة العربية السعودية',
      segment: 'Premium',
      loyaltyPoints: 1750,
      notes: 'عميلة تجارية، تطلب منتجات بكميات كبيرة',
      tags: ['تجاري', 'كميات كبيرة', 'منتجات متنوعة'],
      avatar: '/api/placeholder/40/40',
      rating: 4.6,
      reviews: 8,
      preferredLanguage: 'العربية',
      timezone: 'Asia/Riyadh',
      creditLimit: 75000,
      paymentTerms: '15 يوم',
      taxId: '2345678901',
      website: 'https://saad-trading.com',
      socialMedia: {
        twitter: '@fatima_saad',
        linkedin: 'fatima-saad-trading',
      },
      addresses: [
        {
          type: 'billing',
          address: 'شارع التحلية، حي الروضة، جدة 21432',
          isDefault: true,
        },
      ],
      communication: {
        email: true,
        sms: false,
        phone: true,
        whatsapp: true,
      },
    },
    {
      id: 3,
      customerId: 'CUST-003',
      name: 'محمد عبدالله القحطاني',
      email: 'mohammed.qhtani@example.com',
      phone: '+966503456789',
      company: '',
      type: 'individual',
      status: 'inactive',
      totalOrders: 3,
      totalSpent: 1200.0,
      lastOrder: '2023-11-20',
      joinDate: '2023-09-05',
      location: 'الدمام، المملكة العربية السعودية',
      segment: 'Regular',
      loyaltyPoints: 240,
      notes: 'عميل غير نشط، آخر طلب منذ شهرين',
      tags: ['غير نشط', 'طلبات قليلة'],
      avatar: '/api/placeholder/40/40',
      rating: 4.2,
      reviews: 2,
      preferredLanguage: 'العربية',
      timezone: 'Asia/Riyadh',
      creditLimit: 10000,
      paymentTerms: '30 يوم',
      taxId: '',
      website: '',
      socialMedia: {},
      addresses: [
        {
          type: 'billing',
          address: 'شارع الملك عبدالعزيز، حي الفيصلية، الدمام 31421',
          isDefault: true,
        },
      ],
      communication: {
        email: true,
        sms: true,
        phone: false,
        whatsapp: false,
      },
    },
    {
      id: 4,
      customerId: 'CUST-004',
      name: 'سارة خالد المطيري',
      email: 'sara.mutairi@example.com',
      phone: '+966504567890',
      company: 'مجموعة المطيري للاستثمار',
      type: 'business',
      status: 'active',
      totalOrders: 22,
      totalSpent: 45600.0,
      lastOrder: '2024-01-14',
      joinDate: '2023-03-20',
      location: 'الرياض، المملكة العربية السعودية',
      segment: 'VIP',
      loyaltyPoints: 9120,
      notes: 'عميلة VIP، مشتريات عالية القيمة',
      tags: ['VIP', 'استثمار', 'مشتريات عالية القيمة'],
      avatar: '/api/placeholder/40/40',
      rating: 4.9,
      reviews: 18,
      preferredLanguage: 'العربية',
      timezone: 'Asia/Riyadh',
      creditLimit: 100000,
      paymentTerms: '7 أيام',
      taxId: '3456789012',
      website: 'https://mutairi-investment.com',
      socialMedia: {
        twitter: '@sara_mutairi',
        linkedin: 'sara-mutairi-investment',
      },
      addresses: [
        {
          type: 'billing',
          address: 'شارع العليا، حي العليا، الرياض 12211',
          isDefault: true,
        },
        {
          type: 'shipping',
          address: 'شارع الملك عبدالله، حي النرجس، الرياض 13325',
          isDefault: false,
        },
      ],
      communication: {
        email: true,
        sms: true,
        phone: true,
        whatsapp: true,
      },
    },
    {
      id: 5,
      customerId: 'CUST-005',
      name: 'عبدالرحمن سعد الغامدي',
      email: 'abdulrahman.ghamdi@example.com',
      phone: '+966505678901',
      company: '',
      type: 'individual',
      status: 'active',
      totalOrders: 6,
      totalSpent: 3200.0,
      lastOrder: '2024-01-10',
      joinDate: '2023-12-01',
      location: 'مكة المكرمة، المملكة العربية السعودية',
      segment: 'New',
      loyaltyPoints: 640,
      notes: 'عميل جديد، يظهر اهتمام بالمنتجات التقنية',
      tags: ['جديد', 'تقني', 'مشترٍ نشط'],
      avatar: '/api/placeholder/40/40',
      rating: 4.5,
      reviews: 4,
      preferredLanguage: 'العربية',
      timezone: 'Asia/Riyadh',
      creditLimit: 15000,
      paymentTerms: '30 يوم',
      taxId: '',
      website: '',
      socialMedia: {},
      addresses: [
        {
          type: 'billing',
          address: 'شارع العزيزية، حي العزيزية، مكة المكرمة 24231',
          isDefault: true,
        },
      ],
      communication: {
        email: true,
        sms: true,
        phone: false,
        whatsapp: true,
      },
    },
  ];

  const segments = ['VIP', 'Premium', 'Regular', 'New'];
  const customerTypes = ['individual', 'business'];
  const statuses = ['active', 'inactive', 'suspended', 'blocked'];

  // دوال مساعدة
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'suspended':
        return 'warning';
      case 'blocked':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'inactive':
        return 'غير نشط';
      case 'suspended':
        return 'معلق';
      case 'blocked':
        return 'محظور';
      default:
        return status;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'individual':
        return 'فردي';
      case 'business':
        return 'تجاري';
      default:
        return type;
    }
  };

  // فلترة البيانات
  const filteredData = useMemo(() => {
    return customersData.filter((customer) => {
      const matchesSearch =
        !searchTerm ||
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.customerId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      const matchesType = typeFilter === 'all' || customer.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [customersData, searchTerm, statusFilter, typeFilter]);

  // ترتيب البيانات
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredData, sortBy, sortOrder]);

  // تقسيم البيانات للصفحات
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  // دوال المعالجة
  const handleSave = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم حفظ العميل بنجاح',
        severity: 'success',
      });
      setOpenDialog(false);
    }, 1000);
  }, []);

  const handleView = useCallback((customer) => {
    setSelectedCustomer(customer);
    setViewDrawer(true);
  }, []);

  const handleEdit = useCallback((customer) => {
    setSelectedCustomer(customer);
    setOpenDialog(true);
  }, []);

  const handleDelete = useCallback((customer) => {
    setSelectedCustomer(customer);
    setOpenDeleteDialog(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم حذف العميل بنجاح',
        severity: 'success',
      });
      setOpenDeleteDialog(false);
      setSelectedCustomer(null);
    }, 1000);
  }, []);

  const handleSelectAll = useCallback(
    (event) => {
      if (event.target.checked) {
        setSelectedItems(paginatedData.map((customer) => customer.id));
      } else {
        setSelectedItems([]);
      }
    },
    [paginatedData],
  );

  const handleSelectItem = useCallback((customerId) => {
    setSelectedItems((prev) =>
      prev.includes(customerId) ? prev.filter((id) => id !== customerId) : [...prev, customerId],
    );
  }, []);

  const handleSort = useCallback(
    (property) => {
      const isAsc = sortBy === property && sortOrder === 'asc';
      setSortOrder(isAsc ? 'desc' : 'asc');
      setSortBy(property);
    },
    [sortBy, sortOrder],
  );

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث البيانات بنجاح',
        severity: 'success',
      });
    }, 1000);
  }, []);

  const handleExport = useCallback(() => {
    setSnackbar({
      open: true,
      message: 'تم تصدير البيانات بنجاح',
      severity: 'success',
    });
  }, []);

  return (
    <Box>
      {/* رأس الصفحة */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main" sx={{ fontWeight: 600 }}>
          إدارة العملاء
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة شاملة لعملاء متجرك وبياناتهم وتفاعلاتهم
        </Typography>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mt: 1 }}>
          <Link color="inherit" href="/system" sx={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/crm">
            إدارة العملاء
          </Link>
          <Typography color="text.primary">العملاء</Typography>
        </Breadcrumbs>
      </Box>

      {/* إحصائيات سريعة */}
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
              <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, mx: 'auto', mb: 2 }}>
                <PeopleIcon />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {customersData.length}
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
              <Avatar sx={{ bgcolor: 'success.main', width: 48, height: 48, mx: 'auto', mb: 2 }}>
                <CheckCircleIcon />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                {customersData.filter((c) => c.status === 'active').length}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                العملاء النشطين
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
              <Avatar sx={{ bgcolor: 'warning.main', width: 48, height: 48, mx: 'auto', mb: 2 }}>
                <AttachMoneyIcon />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {customersData.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي المشتريات (ريال)
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
              <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48, mx: 'auto', mb: 2 }}>
                <ShoppingCartIcon />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                {customersData.reduce((sum, c) => sum + c.totalOrders, 0)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي الطلبات
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* فلاتر البحث */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في العملاء"
              size="small"
              placeholder="ابحث بالاسم، البريد الإلكتروني، أو رقم العميل..."
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
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="active">نشط</MenuItem>
                <MenuItem value="inactive">غير نشط</MenuItem>
                <MenuItem value="suspended">معلق</MenuItem>
                <MenuItem value="blocked">محظور</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>نوع العميل</InputLabel>
              <Select
                value={typeFilter}
                label="نوع العميل"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="individual">فردي</MenuItem>
                <MenuItem value="business">تجاري</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
            >
              إعادة تعيين
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
                size="small"
              >
                إضافة عميل
              </Button>
              <Tooltip title="تحديث البيانات">
                <IconButton onClick={handleRefresh} disabled={isRefreshing}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="تصدير البيانات">
                <IconButton onClick={handleExport}>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* جدول العملاء */}
      <Paper>
        <Table>
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
                  العميل
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'customerId'}
                  direction={sortBy === 'customerId' ? sortOrder : 'asc'}
                  onClick={() => handleSort('customerId')}
                >
                  رقم العميل
                </TableSortLabel>
              </TableCell>
              <TableCell>المعلومات</TableCell>
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
                  active={sortBy === 'status'}
                  direction={sortBy === 'status' ? sortOrder : 'asc'}
                  onClick={() => handleSort('status')}
                >
                  الحالة
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'totalSpent'}
                  direction={sortBy === 'totalSpent' ? sortOrder : 'asc'}
                  onClick={() => handleSort('totalSpent')}
                >
                  إجمالي المشتريات
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'totalOrders'}
                  direction={sortBy === 'totalOrders' ? sortOrder : 'asc'}
                  onClick={() => handleSort('totalOrders')}
                >
                  عدد الطلبات
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'lastOrder'}
                  direction={sortBy === 'lastOrder' ? sortOrder : 'asc'}
                  onClick={() => handleSort('lastOrder')}
                >
                  آخر طلب
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => (
                <TableRow key={customer.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(customer.id)}
                      onChange={() => handleSelectItem(customer.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={customer.avatar} sx={{ width: 40, height: 40, mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle2">{customer.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {customer.company || 'عميل فردي'}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {customer.customerId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
                      >
                        <EmailIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        {customer.email}
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <PhoneIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        {customer.phone}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getTypeLabel(customer.type)}
                      size="small"
                      color={customer.type === 'business' ? 'primary' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(customer.status)}
                      size="small"
                      color={getStatusColor(customer.status)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {customer.totalSpent.toLocaleString()} ريال
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{customer.totalOrders}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {customer.lastOrder}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Tooltip title="عرض التفاصيل" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleView(customer)}
                          aria-label="عرض تفاصيل العميل"
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="تعديل العميل" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(customer)}
                          aria-label="تعديل العميل"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف العميل" arrow>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(customer)}
                          aria-label="حذف العميل"
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
          labelRowsPerPage="عدد الصفوف في الصفحة:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} من ${count !== -1 ? count : `أكثر من ${to}`}`
          }
        />
      </Paper>

      {/* نافذة إضافة/تعديل العميل */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedCustomer ? 'تعديل العميل' : 'إضافة عميل جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الاسم الكامل"
                placeholder="أدخل الاسم الكامل"
                defaultValue={selectedCustomer?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                type="email"
                placeholder="example@domain.com"
                defaultValue={selectedCustomer?.email || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                placeholder="+966501234567"
                defaultValue={selectedCustomer?.phone || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الشركة (اختياري)"
                placeholder="اسم الشركة"
                defaultValue={selectedCustomer?.company || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>نوع العميل</InputLabel>
                <Select label="نوع العميل" defaultValue={selectedCustomer?.type || 'individual'}>
                  <MenuItem value="individual">فردي</MenuItem>
                  <MenuItem value="business">تجاري</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedCustomer?.status || 'active'}>
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="inactive">غير نشط</MenuItem>
                  <MenuItem value="suspended">معلق</MenuItem>
                  <MenuItem value="blocked">محظور</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>القطاع</InputLabel>
                <Select label="القطاع" defaultValue={selectedCustomer?.segment || 'Regular'}>
                  {segments.map((segment) => (
                    <MenuItem key={segment} value={segment}>
                      {segment}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الموقع"
                placeholder="المدينة، الدولة"
                defaultValue={selectedCustomer?.location || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="ملاحظات"
                placeholder="ملاحظات إضافية عن العميل..."
                defaultValue={selectedCustomer?.notes || ''}
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

      {/* نافذة تأكيد الحذف */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>حذف العميل</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا العميل؟ هذا الإجراء لا يمكن التراجع عنه.
          </Typography>
          {selectedCustomer && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedCustomer.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedCustomer.email} | {selectedCustomer.customerId}
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

      {/* درج عرض التفاصيل */}
      <Drawer
        anchor="right"
        open={viewDrawer}
        onClose={() => setViewDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { width: 400 } }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            تفاصيل العميل
          </Typography>
          {selectedCustomer && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={selectedCustomer.avatar} sx={{ width: 60, height: 60, mr: 2 }} />
                <Box>
                  <Typography variant="h6">{selectedCustomer.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedCustomer.customerId}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="البريد الإلكتروني" secondary={selectedCustomer.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText primary="رقم الهاتف" secondary={selectedCustomer.phone} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon />
                  </ListItemIcon>
                  <ListItemText primary="الموقع" secondary={selectedCustomer.location} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BusinessIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="الشركة"
                    secondary={selectedCustomer.company || 'غير محدد'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="نوع العميل"
                    secondary={getTypeLabel(selectedCustomer.type)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={getStatusLabel(selectedCustomer.status)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="القطاع" secondary={selectedCustomer.segment} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="إجمالي المشتريات"
                    secondary={`${selectedCustomer.totalSpent.toLocaleString()} ريال`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="عدد الطلبات" secondary={selectedCustomer.totalOrders} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="آخر طلب" secondary={selectedCustomer.lastOrder} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="تاريخ الانضمام" secondary={selectedCustomer.joinDate} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="نقاط الولاء" secondary={selectedCustomer.loyaltyPoints} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="التقييم"
                    secondary={`${selectedCustomer.rating}/5 (${selectedCustomer.reviews} تقييم)`}
                  />
                </ListItem>
              </List>
              {selectedCustomer.notes && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    الملاحظات
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedCustomer.notes}
                  </Typography>
                </>
              )}
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
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

export default Customers;
