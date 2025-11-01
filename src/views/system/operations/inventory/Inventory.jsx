import React, { useState, useEffect } from 'react';
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
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  IconButton,
  Checkbox,
  LinearProgress,
  Skeleton,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Inventory as InventoryIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  Cancel as CancelIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as AttachMoneyIcon,
  LocalShipping as LocalShippingIcon,
  Store as StoreIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [warehouseFilter, setWarehouseFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [formData, setFormData] = useState({
    title: 'إدارة المخزون',
    content: '',
    isActive: true,
    inventoryStatus: 'active',
    inventoryDate: new Date().toISOString().split('T')[0],
    inventoryLocation: '',
    lastUpdated: new Date().toISOString().split('T')[0],
    warehouse: '',
    category: '',
    quantity: 0,
    minQuantity: 0,
    maxQuantity: 0,
    cost: 0,
    price: 0,
  });

  // بيانات وهمية شاملة للمخزون
  const inventoryData = [
    {
      id: 1,
      productName: 'سماعات لاسلكية',
      sku: 'SKU-001',
      category: 'إلكترونيات',
      warehouse: 'المستودع الرئيسي',
      quantity: 150,
      minQuantity: 20,
      maxQuantity: 500,
      cost: 45.0,
      price: 89.99,
      status: 'متوفر',
      lastUpdated: '2024-01-15',
      supplier: 'مورد الإلكترونيات',
      location: 'الرف A-1',
      barcode: '1234567890123',
    },
    {
      id: 2,
      productName: 'ساعة ذكية',
      sku: 'SKU-002',
      category: 'إلكترونيات',
      warehouse: 'المستودع الرئيسي',
      quantity: 25,
      minQuantity: 10,
      maxQuantity: 100,
      cost: 120.0,
      price: 249.99,
      status: 'مخزون منخفض',
      lastUpdated: '2024-01-14',
      supplier: 'مورد الإلكترونيات',
      location: 'الرف B-2',
      barcode: '1234567890124',
    },
    {
      id: 3,
      productName: 'ماكينة قهوة',
      sku: 'SKU-003',
      category: 'أجهزة منزلية',
      warehouse: 'مستودع الأجهزة',
      quantity: 0,
      minQuantity: 5,
      maxQuantity: 50,
      cost: 80.0,
      price: 159.99,
      status: 'نفد من المخزون',
      lastUpdated: '2024-01-13',
      supplier: 'مورد الأجهزة المنزلية',
      location: 'الرف C-3',
      barcode: '1234567890125',
    },
    {
      id: 4,
      productName: 'لوحة مفاتيح للألعاب',
      sku: 'SKU-004',
      category: 'إلكترونيات',
      warehouse: 'المستودع الرئيسي',
      quantity: 75,
      minQuantity: 15,
      maxQuantity: 200,
      cost: 35.0,
      price: 79.99,
      status: 'متوفر',
      lastUpdated: '2024-01-12',
      supplier: 'مورد الإلكترونيات',
      location: 'الرف D-4',
      barcode: '1234567890126',
    },
    {
      id: 5,
      productName: 'فأرة لاسلكية',
      sku: 'SKU-005',
      category: 'إلكترونيات',
      warehouse: 'مستودع الإلكترونيات',
      quantity: 200,
      minQuantity: 25,
      maxQuantity: 300,
      cost: 15.0,
      price: 29.99,
      status: 'متوفر',
      lastUpdated: '2024-01-11',
      supplier: 'مورد الإلكترونيات',
      location: 'الرف E-5',
      barcode: '1234567890127',
    },
  ];

  const warehouses = [
    'المستودع الرئيسي',
    'مستودع الأجهزة',
    'مستودع الإلكترونيات',
    'مستودع التخزين البارد',
  ];
  const categories = ['إلكترونيات', 'أجهزة منزلية', 'ملابس', 'كتب', 'ألعاب'];

  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'عملية المخزون',
      content: 'إدارة تتبع وإدارة المخزون مع التحديثات في الوقت الفعلي.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'قواعد المخزون',
      content: 'تكوين قواعد وسياسات المخزون مع التنبيهات التلقائية.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'تتبع المخزون',
      content: 'تتبع مستويات وحركات المخزون مع التقارير التفصيلية.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'تحليلات المخزون',
      content: 'عرض تحليلات وتقارير المخزون مع الرسوم البيانية.',
      isExpanded: false,
    },
  ]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات المخزون بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleAddSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: 'قسم جديد',
      content: '',
      isExpanded: false,
    };
    setSections([...sections, newSection]);
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleSectionChange = (id, field, value) => {
    setSections(
      sections.map((section) => (section.id === id ? { ...section, [field]: value } : section)),
    );
  };

  const handleToggleExpanded = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, isExpanded: !section.isExpanded } : section,
      ),
    );
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({ open: true, message: 'تم تحديث المخزون بنجاح', severity: 'success' });
    }, 1000);
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
    setSnackbar({
      open: true,
      message: `تم ${action} لـ ${selectedItems.length} عنصر`,
      severity: 'success',
    });
    setSelectedItems([]);
  };

  const handleView = (inventory) => {
    setSelectedInventory(inventory);
    setOpenViewDialog(true);
  };

  const handleEdit = (inventory) => {
    setSelectedInventory(inventory);
    setOpenDialog(true);
  };

  const handleDelete = (inventory) => {
    setSelectedInventory(inventory);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteDialog(false);
      setSnackbar({ open: true, message: 'تم حذف العنصر بنجاح', severity: 'success' });
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'متوفر':
        return 'success';
      case 'مخزون منخفض':
        return 'warning';
      case 'نفد من المخزون':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredData = inventoryData.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesWarehouse = warehouseFilter === 'all' || item.warehouse === warehouseFilter;
    return matchesSearch && matchesStatus && matchesWarehouse;
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

  return (
    <Box sx={{ p: 1 }} role="main" aria-label="إدارة المخزون" aria-hidden="false" tabIndex={0}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              إدارة المخزون
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              تتبع وإدارة مخزون المتجر مع التحديثات في الوقت الفعلي والتحليلات المتقدمة
            </Typography>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              sx={{ mt: 1 }}
              aria-label="مسار التنقل"
            >
              <Link
                color="inherit"
                href="/system"
                sx={{ display: 'flex', alignItems: 'center' }}
                aria-label="الذهاب إلى لوحة التحكم"
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                لوحة التحكم
              </Link>
              <Link color="inherit" href="/system/operations" aria-label="الذهاب إلى العمليات">
                العمليات
              </Link>
              <Typography color="text.primary">المخزون</Typography>
            </Breadcrumbs>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={loading}
              aria-label="تحديث البيانات"
              aria-hidden="false"
              tabIndex={0}
            >
              {loading ? 'جاري التحديث...' : 'تحديث'}
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              aria-label="إضافة عنصر جديد"
              aria-hidden="false"
              tabIndex={0}
            >
              إضافة عنصر
            </Button>
          </Stack>
        </Box>

        {/* Enhanced Stats Cards */}
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
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 48,
                      height: 48,
                      justifyContent: 'center',
                    }}
                  >
                    <InventoryIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  {inventoryData.length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  إجمالي المنتجات
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
                  'linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(46, 125, 50, 0.05) 100%)',
                border: '1px solid rgba(46, 125, 50, 0.2)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(46, 125, 50, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'success.main',
                      width: 48,
                      height: 48,
                      justifyContent: 'center',
                    }}
                  >
                    <CheckCircleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                  {inventoryData.filter((item) => item.status === 'متوفر').length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  متوفر في المخزون
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
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'warning.main',
                      width: 48,
                      height: 48,
                      justifyContent: 'center',
                    }}
                  >
                    <WarningIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  {inventoryData.filter((item) => item.status === 'مخزون منخفض').length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  مخزون منخفض
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
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar
                    sx={{ bgcolor: 'error.main', width: 48, height: 48, justifyContent: 'center' }}
                  >
                    <CancelIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                  {inventoryData.filter((item) => item.status === 'نفد من المخزون').length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  نفد من المخزون
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }} aria-hidden="false">
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في المخزون"
              size="small"
              placeholder="البحث في المخزون..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              aria-label="البحث في المخزون"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الحالة</InputLabel>
              <Select
                value={statusFilter}
                label="الحالة"
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="فلتر الحالة"
              >
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="متوفر">متوفر</MenuItem>
                <MenuItem value="مخزون منخفض">مخزون منخفض</MenuItem>
                <MenuItem value="نفد من المخزون">نفد من المخزون</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>المستودع</InputLabel>
              <Select
                value={warehouseFilter}
                label="المستودع"
                onChange={(e) => setWarehouseFilter(e.target.value)}
                aria-label="فلتر المستودع"
              >
                <MenuItem value="all">جميع المستودعات</MenuItem>
                {warehouses.map((warehouse) => (
                  <MenuItem key={warehouse} value={warehouse}>
                    {warehouse}
                  </MenuItem>
                ))}
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
                setWarehouseFilter('all');
              }}
              aria-label="إعادة تعيين الفلاتر"
              aria-hidden="false"
              tabIndex={0}
            >
              إعادة تعيين الفلاتر
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={loading}
                size="small"
                aria-label="حفظ المخزون"
                aria-hidden="false"
                tabIndex={0}
              >
                حفظ المخزون
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
                size="small"
                aria-label="إضافة عنصر"
                aria-hidden="false"
                tabIndex={0}
              >
                إضافة عنصر
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        {/* Inventory Table */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ width: '100%', overflow: 'auto' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="h6">قائمة المخزون</Typography>
                <Chip label={`${filteredData.length} عنصر`} color="primary" size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />

              {loading ? (
                <Box sx={{ p: 2 }}>
                  {[...Array(3)].map((_, index) => (
                    <Skeleton key={index} height={60} sx={{ mb: 1 }} />
                  ))}
                </Box>
              ) : (
                <>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedItems.length === filteredData.length}
                            onChange={handleSelectAll}
                          />
                        </TableCell>
                        <TableCell>المنتج</TableCell>
                        <TableCell>الكمية</TableCell>
                        <TableCell>الحالة</TableCell>
                        <TableCell>المستودع</TableCell>
                        <TableCell>التكلفة</TableCell>
                        <TableCell>السعر</TableCell>
                        <TableCell>الإجراءات</TableCell>
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
                                  {item.productName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {item.sku} - {item.category}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {item.quantity} / {item.maxQuantity}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={item.status}
                                size="small"
                                color={getStatusColor(item.status)}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{item.warehouse}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">${item.cost.toFixed(2)}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">${item.price.toFixed(2)}</Typography>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={1}>
                                <Tooltip title="عرض">
                                  <IconButton size="small" onClick={() => handleView(item)}>
                                    <ViewIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="تعديل">
                                  <IconButton size="small" onClick={() => handleEdit(item)}>
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="حذف">
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
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
        {/* Inventory Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات المخزون
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>حالة المخزون</InputLabel>
                    <Select
                      value={formData.inventoryStatus}
                      label="حالة المخزون"
                      onChange={(e) =>
                        setFormData({ ...formData, inventoryStatus: e.target.value })
                      }
                      aria-label="حالة المخزون"
                    >
                      <MenuItem value="active">نشط</MenuItem>
                      <MenuItem value="low">مخزون منخفض</MenuItem>
                      <MenuItem value="out">نفد من المخزون</MenuItem>
                      <MenuItem value="discontinued">متوقف</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="تاريخ المخزون"
                    type="date"
                    value={formData.inventoryDate}
                    onChange={(e) => setFormData({ ...formData, inventoryDate: e.target.value })}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    aria-label="تاريخ المخزون"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      />
                    }
                    label="المخزون نشط"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="موقع المخزون"
                    value={formData.inventoryLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, inventoryLocation: e.target.value })
                    }
                    size="small"
                    placeholder="موقع المخزون..."
                    aria-label="موقع المخزون"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>المستودع</InputLabel>
                    <Select
                      value={formData.warehouse}
                      label="المستودع"
                      onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                      aria-label="المستودع"
                    >
                      {warehouses.map((warehouse) => (
                        <MenuItem key={warehouse} value={warehouse}>
                          {warehouse}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>الفئة</InputLabel>
                    <Select
                      value={formData.category}
                      label="الفئة"
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      aria-label="الفئة"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedInventory ? 'تعديل عنصر المخزون' : 'إضافة عنصر جديد'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم المنتج"
                value={selectedInventory?.productName || ''}
                placeholder="أدخل اسم المنتج"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رمز المنتج (SKU)"
                value={selectedInventory?.sku || ''}
                placeholder="أدخل رمز المنتج"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الفئة</InputLabel>
                <Select label="الفئة">
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>المستودع</InputLabel>
                <Select label="المستودع">
                  {warehouses.map((warehouse) => (
                    <MenuItem key={warehouse} value={warehouse}>
                      {warehouse}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="الكمية"
                type="number"
                value={selectedInventory?.quantity || 0}
                placeholder="أدخل الكمية"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="الحد الأدنى"
                type="number"
                value={selectedInventory?.minQuantity || 0}
                placeholder="أدخل الحد الأدنى"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="الحد الأقصى"
                type="number"
                value={selectedInventory?.maxQuantity || 0}
                placeholder="أدخل الحد الأقصى"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="التكلفة"
                type="number"
                value={selectedInventory?.cost || 0}
                placeholder="أدخل التكلفة"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="السعر"
                type="number"
                value={selectedInventory?.price || 0}
                placeholder="أدخل السعر"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الباركود"
                value={selectedInventory?.barcode || ''}
                placeholder="أدخل الباركود"
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

      {/* View Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>تفاصيل العنصر</DialogTitle>
        <DialogContent>
          {selectedInventory && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {selectedInventory.productName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  رمز المنتج: {selectedInventory.sku}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  الفئة: {selectedInventory.category}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  الكمية: {selectedInventory.quantity}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  المستودع: {selectedInventory.warehouse}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  التكلفة: ${selectedInventory.cost.toFixed(2)}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  السعر: ${selectedInventory.price.toFixed(2)}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" color="text.secondary">
                  الباركود: {selectedInventory.barcode}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>إغلاق</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          <Typography>
            هل أنت متأكد من حذف العنصر "{selectedInventory?.productName}"؟ هذا الإجراء لا يمكن
            التراجع عنه.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>إلغاء</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Inventory;
