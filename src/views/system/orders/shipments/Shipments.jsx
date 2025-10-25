import React, { useState, useMemo } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Avatar,
  Stack,
  LinearProgress,
  Checkbox,
  TableSortLabel,
  Toolbar,
  Divider,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  Add as AddIcon,
  VisibilityOutlined as ViewIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  LocalShipping as LocalShippingIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as AttachMoneyIcon,
  LocationOn as LocationIcon,
  TrackChanges as TrackChangesIcon,
  Warehouse as WarehouseIcon,
  FlightTakeoff as FlightTakeoffIcon,
} from '@mui/icons-material';

const Shipments = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [carrierFilter, setCarrierFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('shipmentId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for shipments
  const shipmentsData = [
    {
      id: 1,
      shipmentId: 'SHP-001',
      orderNo: 'ORD-001',
      customer: 'أحمد محمد',
      customerEmail: 'ahmed@example.com',
      customerPhone: '+966501234567',
      totalAmount: 1250.5,
      status: 'in_transit',
      carrier: 'DHL Express',
      trackingNumber: 'DHL123456789',
      shippingMethod: 'Express',
      origin: 'الرياض، المملكة العربية السعودية',
      destination: 'جدة، المملكة العربية السعودية',
      shippedDate: '2024-01-15',
      estimatedDelivery: '2024-01-18',
      actualDelivery: null,
      weight: '2.5 كيلو',
      dimensions: '30x20x15 سم',
      shippingCost: 45.0,
      insuranceValue: 1250.5,
      lastUpdate: '2024-01-17',
      notes: 'شحن عاجل - يرجى التتبع المستمر',
      lastModified: '2024-01-15',
      deliveryProgress: 60,
    },
    {
      id: 2,
      shipmentId: 'SHP-002',
      orderNo: 'ORD-002',
      customer: 'فاطمة علي',
      customerEmail: 'fatima@example.com',
      customerPhone: '+966502345678',
      totalAmount: 850.75,
      status: 'delivered',
      carrier: 'Aramex',
      trackingNumber: 'ARX987654321',
      shippingMethod: 'Standard',
      origin: 'الدمام، المملكة العربية السعودية',
      destination: 'الرياض، المملكة العربية السعودية',
      shippedDate: '2024-01-14',
      estimatedDelivery: '2024-01-17',
      actualDelivery: '2024-01-16',
      weight: '1.8 كيلو',
      dimensions: '25x15x10 سم',
      shippingCost: 25.0,
      insuranceValue: 850.75,
      lastUpdate: '2024-01-16',
      notes: 'تم التسليم بنجاح',
      lastModified: '2024-01-16',
      deliveryProgress: 100,
    },
    {
      id: 3,
      shipmentId: 'SHP-003',
      orderNo: 'ORD-003',
      customer: 'محمد عبدالله',
      customerEmail: 'mohammed@example.com',
      customerPhone: '+966503456789',
      totalAmount: 2100.0,
      status: 'pending',
      carrier: 'SMSA Express',
      trackingNumber: 'SMS456789123',
      shippingMethod: 'Express',
      origin: 'جدة، المملكة العربية السعودية',
      destination: 'الدمام، المملكة العربية السعودية',
      shippedDate: null,
      estimatedDelivery: '2024-01-20',
      actualDelivery: null,
      weight: '5.2 كيلو',
      dimensions: '40x30x20 سم',
      shippingCost: 75.0,
      insuranceValue: 2100.0,
      lastUpdate: '2024-01-13',
      notes: 'في انتظار الشحن',
      lastModified: '2024-01-13',
      deliveryProgress: 0,
    },
  ];

  // Stats data
  const shipmentStats = [
    {
      title: 'إجمالي الشحنات',
      value: shipmentsData.length.toString(),
      color: 'primary',
      icon: LocalShippingIcon,
      change: '+15%',
    },
    {
      title: 'في الطريق',
      value: shipmentsData.filter((s) => s.status === 'in_transit').length.toString(),
      color: 'warning',
      icon: ScheduleIcon,
      change: '1 في الطريق',
    },
    {
      title: 'تم التسليم',
      value: shipmentsData.filter((s) => s.status === 'delivered').length.toString(),
      color: 'success',
      icon: CheckCircleIcon,
      change: '85%',
    },
    {
      title: 'معلقة',
      value: shipmentsData.filter((s) => s.status === 'pending').length.toString(),
      color: 'info',
      icon: WarehouseIcon,
      change: '1 معلقة',
    },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم حفظ الشحنة بنجاح',
        severity: 'success',
      });
      setOpenDialog(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({ open: true, message: 'تم تحديث البيانات بنجاح', severity: 'success' });
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

  const handleView = (shipment) => {
    setSelectedShipment(shipment);
    setViewDrawer(true);
  };

  const handleEdit = (shipment) => {
    setSelectedShipment(shipment);
    setOpenDialog(true);
  };

  const handleDelete = (shipment) => {
    setSnackbar({
      open: true,
      message: `تم حذف الشحنة ${shipment.shipmentId} بنجاح`,
      severity: 'success',
    });
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const filteredData = useMemo(() => {
    return shipmentsData.filter((item) => {
      const matchesSearch =
        item.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCarrier = carrierFilter === 'all' || item.carrier === carrierFilter;
      return matchesSearch && matchesStatus && matchesCarrier;
    });
  }, [shipmentsData, searchTerm, statusFilter, carrierFilter]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
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
  }, [filteredData, sortBy, sortOrder]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'in_transit':
        return 'warning';
      case 'pending':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'delivered':
        return 'تم التسليم';
      case 'in_transit':
        return 'في الطريق';
      case 'pending':
        return 'معلقة';
      case 'cancelled':
        return 'ملغية';
      default:
        return status;
    }
  };

  const getCarrierIcon = (carrier) => {
    switch (carrier) {
      case 'DHL Express':
        return <FlightTakeoffIcon />;
      case 'Aramex':
        return <LocalShippingIcon />;
      case 'SMSA Express':
        return <TrackChangesIcon />;
      default:
        return <LocalShippingIcon />;
    }
  };

  const formatCurrency = (amount) => {
    return `ريال ${amount.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('ar-SA');
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Enhanced Header with Stats */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              إدارة الشحنات
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة شاملة لجميع الشحنات مع إمكانيات التتبع المتقدمة
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mt: 1 }}>
              <Link
                color="inherit"
                href="/main-store"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                لوحة التحكم
              </Link>
              <Link color="inherit" href="/main-store/orders">
                الطلبات
              </Link>
              <Typography color="text.primary">الشحنات</Typography>
            </Breadcrumbs>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? 'جاري التحديث...' : 'تحديث'}
            </Button>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
              إضافة شحنة
            </Button>
          </Stack>
        </Box>

        {/* Enhanced Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {shipmentStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette[stat.color].main,
                      0.08,
                    )} 0%, ${alpha(theme.palette[stat.color].main, 0.04)} 100%)`,
                    border: `1px solid ${alpha(theme.palette[stat.color].main, 0.2)}`,
                    transition: 'all .3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      <Avatar sx={{ bgcolor: `${stat.color}.main`, width: 48, height: 48, mr: 2 }}>
                        <IconComponent />
                      </Avatar>
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 700, color: `${stat.color}.main`, mb: 1 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: 'text.secondary', mb: 1 }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: `${stat.color}.main`, fontWeight: 600 }}
                    >
                      {stat.change}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Filters & Search */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          البحث والتصفية
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="البحث في الشحنات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>حالة الشحنة</InputLabel>
              <Select
                value={statusFilter}
                label="حالة الشحنة"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                <MenuItem value="pending">معلقة</MenuItem>
                <MenuItem value="in_transit">في الطريق</MenuItem>
                <MenuItem value="delivered">تم التسليم</MenuItem>
                <MenuItem value="cancelled">ملغية</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>شركة الشحن</InputLabel>
              <Select
                value={carrierFilter}
                label="شركة الشحن"
                onChange={(e) => setCarrierFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الشركات</MenuItem>
                <MenuItem value="DHL Express">DHL Express</MenuItem>
                <MenuItem value="Aramex">Aramex</MenuItem>
                <MenuItem value="SMSA Express">SMSA Express</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setCarrierFilter('all');
              }}
              fullWidth
            >
              مسح الفلاتر
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              {filteredData.length} نتيجة
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Paper>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            قائمة الشحنات
          </Typography>
          {selectedItems.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <Button
                size="small"
                onClick={() =>
                  setSnackbar({
                    open: true,
                    message: 'تم تحديث الشحنات المحددة',
                    severity: 'success',
                  })
                }
                sx={{ mr: 1 }}
              >
                تحديث ({selectedItems.length})
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() =>
                  setSnackbar({
                    open: true,
                    message: 'تم حذف الشحنات المحددة',
                    severity: 'success',
                  })
                }
              >
                حذف ({selectedItems.length})
              </Button>
            </Box>
          )}
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
            إضافة شحنة
          </Button>
        </Toolbar>

        {loading ? (
          <Box sx={{ p: 2 }}>
            <LinearProgress />
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">لا توجد شحنات. أضف الشحنة الأولى.</Alert>
          </Box>
        ) : (
          <>
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
                      active={sortBy === 'shipmentId'}
                      direction={sortBy === 'shipmentId' ? sortOrder : 'asc'}
                      onClick={() => handleSort('shipmentId')}
                    >
                      رقم الشحنة
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>رقم الطلب</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'customer'}
                      direction={sortBy === 'customer' ? sortOrder : 'asc'}
                      onClick={() => handleSort('customer')}
                    >
                      العميل
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>شركة الشحن</TableCell>
                  <TableCell>رقم التتبع</TableCell>
                  <TableCell>حالة الشحنة</TableCell>
                  <TableCell>المنشأ</TableCell>
                  <TableCell>الوجهة</TableCell>
                  <TableCell>تقدم التسليم</TableCell>
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
                          {item.shipmentId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontFamily="monospace">
                          {item.orderNo}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                            <PersonIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {item.customer}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.customerEmail}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getCarrierIcon(item.carrier)}
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {item.carrier}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontFamily="monospace" color="primary">
                          {item.trackingNumber}
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {item.origin}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {item.destination}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 100 }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={item.deliveryProgress}
                              sx={{ height: 6, borderRadius: 3 }}
                              color={
                                item.deliveryProgress > 80
                                  ? 'success'
                                  : item.deliveryProgress > 50
                                  ? 'warning'
                                  : 'error'
                              }
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {item.deliveryProgress}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleView(item)}
                              aria-label="عرض تفاصيل الشحنة"
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="تعديل الشحنة" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(item)}
                              aria-label="تعديل الشحنة"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف الشحنة" arrow>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(item)}
                              aria-label="حذف الشحنة"
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
        <DialogTitle>{selectedShipment ? 'تعديل الشحنة' : 'إضافة شحنة جديدة'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الشحنة"
                placeholder="أدخل رقم الشحنة"
                defaultValue={selectedShipment?.shipmentId || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم الطلب"
                placeholder="أدخل رقم الطلب"
                defaultValue={selectedShipment?.orderNo || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="اسم العميل"
                placeholder="أدخل اسم العميل"
                defaultValue={selectedShipment?.customer || ''}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="أدخل البريد الإلكتروني"
                defaultValue={selectedShipment?.customerEmail || ''}
                type="email"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>شركة الشحن</InputLabel>
                <Select
                  label="شركة الشحن"
                  defaultValue={selectedShipment?.carrier || 'DHL Express'}
                >
                  <MenuItem value="DHL Express">DHL Express</MenuItem>
                  <MenuItem value="Aramex">Aramex</MenuItem>
                  <MenuItem value="SMSA Express">SMSA Express</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="رقم التتبع"
                placeholder="أدخل رقم التتبع"
                defaultValue={selectedShipment?.trackingNumber || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>حالة الشحنة</InputLabel>
                <Select label="حالة الشحنة" defaultValue={selectedShipment?.status || 'pending'}>
                  <MenuItem value="pending">معلقة</MenuItem>
                  <MenuItem value="in_transit">في الطريق</MenuItem>
                  <MenuItem value="delivered">تم التسليم</MenuItem>
                  <MenuItem value="cancelled">ملغية</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="طريقة الشحن"
                placeholder="أدخل طريقة الشحن"
                defaultValue={selectedShipment?.shippingMethod || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="المنشأ"
                placeholder="أدخل المنشأ"
                defaultValue={selectedShipment?.origin || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الوجهة"
                placeholder="أدخل الوجهة"
                defaultValue={selectedShipment?.destination || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ الشحن"
                defaultValue={
                  selectedShipment?.shippedDate || new Date().toISOString().split('T')[0]
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="تاريخ التسليم المتوقع"
                defaultValue={selectedShipment?.estimatedDelivery || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الوزن"
                placeholder="أدخل الوزن"
                defaultValue={selectedShipment?.weight || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الأبعاد"
                placeholder="أدخل الأبعاد"
                defaultValue={selectedShipment?.dimensions || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="تكلفة الشحن"
                placeholder="0.00"
                defaultValue={selectedShipment?.shippingCost || ''}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="قيمة التأمين"
                placeholder="0.00"
                defaultValue={selectedShipment?.insuranceValue || ''}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="ملاحظات"
                placeholder="أدخل ملاحظات إضافية..."
                defaultValue={selectedShipment?.notes || ''}
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
      <Dialog open={viewDrawer} onClose={() => setViewDrawer(false)} maxWidth="md" fullWidth>
        <DialogTitle>تفاصيل الشحنة</DialogTitle>
        <DialogContent>
          {selectedShipment && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mr: 2 }}>
                  <LocalShippingIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedShipment.shipmentId}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    العميل: {selectedShipment.customer}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    رقم الطلب
                  </Typography>
                  <Typography variant="body1" fontFamily="monospace">
                    {selectedShipment.orderNo}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    حالة الشحنة
                  </Typography>
                  <Chip
                    label={getStatusLabel(selectedShipment.status)}
                    size="small"
                    color={getStatusColor(selectedShipment.status)}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    شركة الشحن
                  </Typography>
                  <Typography variant="body1">{selectedShipment.carrier}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    رقم التتبع
                  </Typography>
                  <Typography variant="body1" fontFamily="monospace" color="primary">
                    {selectedShipment.trackingNumber}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    المنشأ
                  </Typography>
                  <Typography variant="body1">{selectedShipment.origin}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    الوجهة
                  </Typography>
                  <Typography variant="body1">{selectedShipment.destination}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تاريخ الشحن
                  </Typography>
                  <Typography variant="body1">
                    {selectedShipment.shippedDate
                      ? formatDate(selectedShipment.shippedDate)
                      : 'لم يتم الشحن بعد'}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تاريخ التسليم المتوقع
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(selectedShipment.estimatedDelivery)}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    الوزن
                  </Typography>
                  <Typography variant="body1">{selectedShipment.weight}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    الأبعاد
                  </Typography>
                  <Typography variant="body1">{selectedShipment.dimensions}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تكلفة الشحن
                  </Typography>
                  <Typography variant="body1">
                    {formatCurrency(selectedShipment.shippingCost)}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    قيمة التأمين
                  </Typography>
                  <Typography variant="body1">
                    {formatCurrency(selectedShipment.insuranceValue)}
                  </Typography>
                </Grid>
                {selectedShipment.notes && (
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      ملاحظات
                    </Typography>
                    <Typography variant="body1">{selectedShipment.notes}</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDrawer(false)}>إغلاق</Button>
        </DialogActions>
      </Dialog>

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

export default Shipments;
