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
  TrendingUp as TrendingUpIcon,
  CheckCircleOutline as CheckIcon,
  Download as DownloadIcon,
  Inventory as InventoryIcon,
  Warehouse as WarehouseIcon,
} from '@mui/icons-material';

const Warehouses = () => {
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
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [density, setDensity] = useState('medium');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data for warehouses
  const warehousesData = [
    {
      id: 1,
      name: 'مستودع الرياض الرئيسي',
      code: 'WH001',
      type: 'main',
      status: 'active',
      location: 'الرياض - حي النخيل',
      address: 'شارع الملك فهد، حي النخيل، الرياض 12345',
      city: 'الرياض',
      region: 'منطقة الرياض',
      country: 'المملكة العربية السعودية',
      coordinates: {
        latitude: 24.7136,
        longitude: 46.6753,
      },
      manager: 'أحمد محمد علي',
      managerEmail: 'ahmed@company.com',
      managerPhone: '+966501234567',
      capacity: 10000,
      usedCapacity: 7500,
      availableCapacity: 2500,
      temperature: '20-25°C',
      humidity: '45-55%',
      securityLevel: 'high',
      operatingHours: '24/7',
      services: ['تخزين', 'توزيع', 'تعبئة', 'شحن'],
      equipment: [
        { name: 'رافعات شوكية', count: 5, status: 'active' },
        { name: 'أرفف تخزين', count: 200, status: 'active' },
        { name: 'نظام تبريد', count: 1, status: 'active' },
        { name: 'كاميرات مراقبة', count: 20, status: 'active' },
      ],
      products: [
        { name: 'إلكترونيات', quantity: 2500, value: 500000 },
        { name: 'ملابس', quantity: 3000, value: 300000 },
        { name: 'أثاث', quantity: 500, value: 200000 },
        { name: 'كتب', quantity: 2000, value: 100000 },
      ],
      lastInventory: '2024-01-15',
      nextInventory: '2024-02-15',
      notes: 'المستودع الرئيسي للشركة مع أحدث التقنيات',
      createdBy: 'مدير العمليات',
      createdDate: '2023-01-01',
      lastModified: '2024-01-20',
    },
    {
      id: 2,
      name: 'مستودع جدة التجاري',
      code: 'WH002',
      type: 'regional',
      status: 'active',
      location: 'جدة - حي الروضة',
      address: 'شارع التحلية، حي الروضة، جدة 21432',
      city: 'جدة',
      region: 'منطقة مكة المكرمة',
      country: 'المملكة العربية السعودية',
      coordinates: {
        latitude: 21.4858,
        longitude: 39.1925,
      },
      manager: 'فاطمة أحمد السعيد',
      managerEmail: 'fatima@company.com',
      managerPhone: '+966501234568',
      capacity: 5000,
      usedCapacity: 3200,
      availableCapacity: 1800,
      temperature: '18-22°C',
      humidity: '40-50%',
      securityLevel: 'medium',
      operatingHours: '06:00-22:00',
      services: ['تخزين', 'توزيع'],
      equipment: [
        { name: 'رافعات شوكية', count: 3, status: 'active' },
        { name: 'أرفف تخزين', count: 100, status: 'active' },
        { name: 'نظام تبريد', count: 1, status: 'maintenance' },
        { name: 'كاميرات مراقبة', count: 12, status: 'active' },
      ],
      products: [
        { name: 'ملابس', quantity: 1500, value: 150000 },
        { name: 'أحذية', quantity: 800, value: 120000 },
        { name: 'إكسسوارات', quantity: 1200, value: 80000 },
      ],
      lastInventory: '2024-01-10',
      nextInventory: '2024-02-10',
      notes: 'مستودع متخصص في المنتجات التجارية',
      createdBy: 'مدير العمليات',
      createdDate: '2023-03-15',
      lastModified: '2024-01-18',
    },
    {
      id: 3,
      name: 'مستودع الدمام الصناعي',
      code: 'WH003',
      type: 'industrial',
      status: 'active',
      location: 'الدمام - المنطقة الصناعية الثانية',
      address: 'المنطقة الصناعية الثانية، الدمام 31421',
      city: 'الدمام',
      region: 'المنطقة الشرقية',
      country: 'المملكة العربية السعودية',
      coordinates: {
        latitude: 26.4207,
        longitude: 50.0888,
      },
      manager: 'خالد عبدالله المطيري',
      managerEmail: 'khalid@company.com',
      managerPhone: '+966501234569',
      capacity: 15000,
      usedCapacity: 12000,
      availableCapacity: 3000,
      temperature: '15-20°C',
      humidity: '35-45%',
      securityLevel: 'high',
      operatingHours: '24/7',
      services: ['تخزين', 'توزيع', 'تعبئة', 'شحن', 'تصنيع'],
      equipment: [
        { name: 'رافعات شوكية', count: 8, status: 'active' },
        { name: 'أرفف تخزين', count: 300, status: 'active' },
        { name: 'نظام تبريد', count: 2, status: 'active' },
        { name: 'كاميرات مراقبة', count: 30, status: 'active' },
        { name: 'آلات تصنيع', count: 5, status: 'active' },
      ],
      products: [
        { name: 'مواد خام', quantity: 5000, value: 800000 },
        { name: 'منتجات مصنعة', quantity: 3000, value: 600000 },
        { name: 'معدات', quantity: 500, value: 400000 },
      ],
      lastInventory: '2024-01-12',
      nextInventory: '2024-02-12',
      notes: 'مستودع صناعي متخصص في المواد الخام والمنتجات المصنعة',
      createdBy: 'مدير العمليات',
      createdDate: '2023-02-01',
      lastModified: '2024-01-15',
    },
    {
      id: 4,
      name: 'مستودع الطائف الجبلي',
      code: 'WH004',
      type: 'specialized',
      status: 'active',
      location: 'الطائف - حي الشهداء',
      address: 'شارع الملك عبدالعزيز، حي الشهداء، الطائف 26521',
      city: 'الطائف',
      region: 'منطقة مكة المكرمة',
      country: 'المملكة العربية السعودية',
      coordinates: {
        latitude: 21.2703,
        longitude: 40.4158,
      },
      manager: 'محمد عبدالرحمن الشمري',
      managerEmail: 'mohammed@company.com',
      managerPhone: '+966501234570',
      capacity: 3000,
      usedCapacity: 1800,
      availableCapacity: 1200,
      temperature: '10-15°C',
      humidity: '30-40%',
      securityLevel: 'high',
      operatingHours: '08:00-20:00',
      services: ['تخزين', 'توزيع', 'تعبئة'],
      equipment: [
        { name: 'رافعات شوكية', count: 2, status: 'active' },
        { name: 'أرفف تخزين', count: 50, status: 'active' },
        { name: 'نظام تبريد', count: 1, status: 'active' },
        { name: 'كاميرات مراقبة', count: 8, status: 'active' },
      ],
      products: [
        { name: 'منتجات طبية', quantity: 500, value: 300000 },
        { name: 'أدوية', quantity: 300, value: 200000 },
        { name: 'معدات طبية', quantity: 100, value: 150000 },
      ],
      lastInventory: '2024-01-08',
      nextInventory: '2024-02-08',
      notes: 'مستودع متخصص في المنتجات الطبية والدوائية',
      createdBy: 'مدير العمليات',
      createdDate: '2023-04-01',
      lastModified: '2024-01-12',
    },
    {
      id: 5,
      name: 'مستودع الخبر الساحلي',
      code: 'WH005',
      type: 'logistics',
      status: 'inactive',
      location: 'الخبر - حي الفيصلية',
      address: 'الكورنيش، حي الفيصلية، الخبر 34445',
      city: 'الخبر',
      region: 'المنطقة الشرقية',
      country: 'المملكة العربية السعودية',
      coordinates: {
        latitude: 26.1799,
        longitude: 50.1971,
      },
      manager: 'سارة محمد الحسن',
      managerEmail: 'sara@company.com',
      managerPhone: '+966501234571',
      capacity: 2000,
      usedCapacity: 0,
      availableCapacity: 2000,
      temperature: '20-25°C',
      humidity: '50-60%',
      securityLevel: 'medium',
      operatingHours: '06:00-18:00',
      services: ['تخزين', 'توزيع'],
      equipment: [
        { name: 'رافعات شوكية', count: 1, status: 'maintenance' },
        { name: 'أرفف تخزين', count: 30, status: 'active' },
        { name: 'نظام تبريد', count: 0, status: 'none' },
        { name: 'كاميرات مراقبة', count: 5, status: 'active' },
      ],
      products: [],
      lastInventory: '2023-12-15',
      nextInventory: '2024-02-15',
      notes: 'مستودع لوجستي متوقف مؤقتاً للتطوير',
      createdBy: 'مدير العمليات',
      createdDate: '2023-05-01',
      lastModified: '2023-12-15',
    },
  ];

  const warehouseTypes = [
    { value: 'main', label: 'رئيسي', color: 'primary' },
    { value: 'regional', label: 'إقليمي', color: 'info' },
    { value: 'industrial', label: 'صناعي', color: 'warning' },
    { value: 'specialized', label: 'متخصص', color: 'success' },
    { value: 'logistics', label: 'لوجستي', color: 'default' },
  ];

  const warehouseStatuses = [
    { value: 'active', label: 'نشط', color: 'success' },
    { value: 'inactive', label: 'غير نشط', color: 'error' },
    { value: 'maintenance', label: 'صيانة', color: 'warning' },
    { value: 'construction', label: 'تحت الإنشاء', color: 'info' },
  ];

  const securityLevels = [
    { value: 'low', label: 'منخفض', color: 'success' },
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
    notify(`${action} المستودعات`, `${selectedItems.length} مستودع`);
    setSelectedItems([]);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleView = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setOpenViewDialog(true);
  };

  const handleEdit = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setOpenDialog(true);
  };

  const handleDelete = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setOpenDeleteDialog(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      notify('تحديث المستودع', selectedWarehouse ? 'تم تحديث المستودع' : 'تم إضافة المستودع');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      notify('حذف المستودع', 'تم حذف المستودع');
    }, 1000);
  };

  const handleExport = () => {
    notify('تصدير المستودعات', 'تم تصدير البيانات');
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };

  const filteredData = warehousesData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city.toLowerCase().includes(searchTerm.toLowerCase());
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

  const getTypeColor = (type) => {
    const typeInfo = warehouseTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.color : 'default';
  };

  const getTypeLabel = (type) => {
    const typeInfo = warehouseTypes.find((t) => t.value === type);
    return typeInfo ? typeInfo.label : type;
  };

  const getStatusColor = (status) => {
    const statusInfo = warehouseStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusInfo = warehouseStatuses.find((s) => s.value === status);
    return statusInfo ? statusInfo.label : status;
  };

  const getSecurityColor = (level) => {
    const levelInfo = securityLevels.find((l) => l.value === level);
    return levelInfo ? levelInfo.color : 'default';
  };

  const getSecurityLabel = (level) => {
    const levelInfo = securityLevels.find((l) => l.value === level);
    return levelInfo ? levelInfo.label : level;
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

  const totalWarehouses = warehousesData.length;
  const activeWarehouses = warehousesData.filter(
    (warehouse) => warehouse.status === 'active',
  ).length;
  const totalCapacity = warehousesData.reduce((sum, warehouse) => sum + warehouse.capacity, 0);
  const usedCapacity = warehousesData.reduce((sum, warehouse) => sum + warehouse.usedCapacity, 0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          إدارة المستودعات
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          إدارة وتتبع جميع المستودعات مع مراقبة السعة والمواقع والموظفين.
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/system">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            لوحة التحكم
          </Link>
          <Link color="inherit" href="/system/operations">
            المخازن والمخزون
          </Link>
          <Typography color="text.primary">المستودعات</Typography>
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
                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, justifyContent: 'center' }}>
                  <WarehouseIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {totalWarehouses}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي المستودعات
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
                <Avatar sx={{ bgcolor: 'success.main', width: 48, height: 48, justifyContent: 'center' }}>
                  <CheckIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                {activeWarehouses}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                مستودعات نشطة
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
                <Avatar sx={{ bgcolor: 'warning.main', width: 48, height: 48, justifyContent: 'center' }}>
                  <InventoryIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {totalCapacity.toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                إجمالي السعة
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
                <Avatar sx={{ bgcolor: 'error.main', width: 48, height: 48, justifyContent: 'center' }}>
                  <TrendingUpIcon />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {usedCapacity.toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                السعة المستخدمة
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 1, mb: 3 }}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="البحث في المستودعات..."
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
                  {warehouseStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>نوع المستودع</InputLabel>
                <Select
                  value={typeFilter}
                  label="نوع المستودع"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الأنواع</MenuItem>
                  {warehouseTypes.map((type) => (
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
            قائمة المستودعات
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
            إضافة مستودع
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
            <Alert severity="error">خطأ في تحميل المستودعات. يرجى المحاولة مرة أخرى.</Alert>
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لم يتم العثور على مستودعات. أضف أول مستودع.</Alert>
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
                      اسم المستودع
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'type'}
                      direction={sortBy === 'type' ? sortOrder : 'asc'}
                      onClick={() => handleSort('type')}
                    >
                      نوع المستودع
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
                      active={sortBy === 'location'}
                      direction={sortBy === 'location' ? sortOrder : 'asc'}
                      onClick={() => handleSort('location')}
                    >
                      الموقع
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'capacity'}
                      direction={sortBy === 'capacity' ? sortOrder : 'asc'}
                      onClick={() => handleSort('capacity')}
                    >
                      السعة
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
                            <WarehouseIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {item.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.code}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getTypeLabel(item.type)}
                          size="small"
                          color={getTypeColor(item.type)}
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
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.location}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.city}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {item.usedCapacity.toLocaleString()} / {item.capacity.toLocaleString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {((item.usedCapacity / item.capacity) * 100).toFixed(1)}% مستخدم
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton size="small" onClick={() => handleView(item)}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل المستودع" arrow>
                            <IconButton size="small" onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف المستودع" arrow>
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
        <DialogTitle>{selectedWarehouse ? 'تعديل المستودع' : 'إضافة مستودع جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم المستودع"
                placeholder="أدخل اسم المستودع"
                defaultValue={selectedWarehouse?.name || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="كود المستودع"
                placeholder="WH001"
                defaultValue={selectedWarehouse?.code || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>نوع المستودع</InputLabel>
                <Select label="نوع المستودع" defaultValue={selectedWarehouse?.type || ''}>
                  {warehouseTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة" defaultValue={selectedWarehouse?.status || 'active'}>
                  {warehouseStatuses.map((status) => (
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
                label="المدينة"
                placeholder="الرياض"
                defaultValue={selectedWarehouse?.city || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المنطقة"
                placeholder="منطقة الرياض"
                defaultValue={selectedWarehouse?.region || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="السعة"
                placeholder="10000"
                defaultValue={selectedWarehouse?.capacity || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المدير"
                placeholder="أدخل اسم المدير"
                defaultValue={selectedWarehouse?.manager || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="manager@company.com"
                defaultValue={selectedWarehouse?.managerEmail || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                placeholder="+966501234567"
                defaultValue={selectedWarehouse?.managerPhone || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="درجة الحرارة"
                placeholder="20-25°C"
                defaultValue={selectedWarehouse?.temperature || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الرطوبة"
                placeholder="45-55%"
                defaultValue={selectedWarehouse?.humidity || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>مستوى الأمان</InputLabel>
                <Select
                  label="مستوى الأمان"
                  defaultValue={selectedWarehouse?.securityLevel || 'medium'}
                >
                  {securityLevels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="ساعات العمل"
                placeholder="24/7"
                defaultValue={selectedWarehouse?.operatingHours || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="العنوان"
                placeholder="أدخل العنوان الكامل"
                defaultValue={selectedWarehouse?.address || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="الملاحظات"
                placeholder="أدخل ملاحظات حول المستودع"
                defaultValue={selectedWarehouse?.notes || ''}
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
        <DialogTitle>حذف المستودع</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            هل أنت متأكد من حذف هذا المستودع؟
          </Typography>
          {selectedWarehouse && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2">{selectedWarehouse.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedWarehouse.location} - {selectedWarehouse.code}
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
            تفاصيل المستودع
          </Typography>
          {selectedWarehouse && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                  <WarehouseIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedWarehouse.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedWarehouse.code}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="اسم المستودع" secondary={selectedWarehouse.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="كود المستودع" secondary={selectedWarehouse.code} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="نوع المستودع"
                    secondary={getTypeLabel(selectedWarehouse.type)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الحالة"
                    secondary={getStatusLabel(selectedWarehouse.status)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الموقع" secondary={selectedWarehouse.location} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العنوان" secondary={selectedWarehouse.address} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المدينة" secondary={selectedWarehouse.city} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المنطقة" secondary={selectedWarehouse.region} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="البلد" secondary={selectedWarehouse.country} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المدير" secondary={selectedWarehouse.manager} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="البريد الإلكتروني"
                    secondary={selectedWarehouse.managerEmail}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="رقم الهاتف" secondary={selectedWarehouse.managerPhone} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="السعة الإجمالية"
                    secondary={`${selectedWarehouse.capacity.toLocaleString()} وحدة`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="السعة المستخدمة"
                    secondary={`${selectedWarehouse.usedCapacity.toLocaleString()} وحدة`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="السعة المتاحة"
                    secondary={`${selectedWarehouse.availableCapacity.toLocaleString()} وحدة`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="درجة الحرارة" secondary={selectedWarehouse.temperature} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الرطوبة" secondary={selectedWarehouse.humidity} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="مستوى الأمان"
                    secondary={getSecurityLabel(selectedWarehouse.securityLevel)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="ساعات العمل"
                    secondary={selectedWarehouse.operatingHours}
                  />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الخدمات
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedWarehouse.services.map((service, index) => (
                  <Chip
                    key={index}
                    label={service}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المعدات
              </Typography>
              <List dense>
                {selectedWarehouse.equipment.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item.name}
                      secondary={`${item.count} وحدة - ${
                        item.status === 'active'
                          ? 'نشط'
                          : item.status === 'maintenance'
                          ? 'صيانة'
                          : 'غير متوفر'
                      }`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                المنتجات
              </Typography>
              <List dense>
                {selectedWarehouse.products.map((product, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={product.name}
                      secondary={`${product.quantity} وحدة - ${formatCurrency(product.value)}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الجرد
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>آخر جرد:</strong> {formatDate(selectedWarehouse.lastInventory)}
                </Typography>
                <Typography variant="body2">
                  <strong>الجرد القادم:</strong> {formatDate(selectedWarehouse.nextInventory)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                الملاحظات
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedWarehouse.notes}
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

export default Warehouses;
