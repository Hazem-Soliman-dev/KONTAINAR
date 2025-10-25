import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  Snackbar,
  Alert,
  Skeleton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  LinearProgress,
  Stack,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Checkbox,
  TableSortLabel,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as AttachMoneyIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const SalesReports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [dateFrom, setDateFrom] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  );
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [reportType, setReportType] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('period');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // بيانات وهمية شاملة ومحسنة لتقارير المبيعات
  const salesData = [
    {
      id: 1,
      period: '2024-01-15',
      revenue: 12500.0,
      orders: 45,
      customers: 38,
      avgOrderValue: 277.78,
      growth: 12.5,
      topProduct: 'سماعات لاسلكية',
      topCategory: 'إلكترونيات',
      status: 'مكتمل',
      priority: 'عالي',
      region: 'الرياض',
      salesRep: 'أحمد محمد',
      notes: 'أداء ممتاز هذا الشهر',
    },
    {
      id: 2,
      period: '2024-01-14',
      revenue: 11200.0,
      orders: 38,
      customers: 32,
      avgOrderValue: 294.74,
      growth: 8.3,
      topProduct: 'ساعة ذكية',
      topCategory: 'إلكترونيات',
      status: 'مكتمل',
      priority: 'متوسط',
      region: 'جدة',
      salesRep: 'فاطمة أحمد',
      notes: 'زيادة في الطلبات',
    },
    {
      id: 3,
      period: '2024-01-13',
      revenue: 9800.0,
      orders: 42,
      customers: 35,
      avgOrderValue: 233.33,
      growth: -5.2,
      topProduct: 'ماكينة قهوة',
      topCategory: 'أجهزة منزلية',
      status: 'قيد المراجعة',
      priority: 'منخفض',
      region: 'الدمام',
      salesRep: 'محمد علي',
      notes: 'انخفاض في المبيعات',
    },
    {
      id: 4,
      period: '2024-01-12',
      revenue: 15600.0,
      orders: 52,
      customers: 41,
      avgOrderValue: 300.0,
      growth: 15.8,
      topProduct: 'هاتف ذكي',
      topCategory: 'إلكترونيات',
      status: 'مكتمل',
      priority: 'عالي',
      region: 'الرياض',
      salesRep: 'سارة خالد',
      notes: 'أفضل يوم في المبيعات',
    },
    {
      id: 5,
      period: '2024-01-11',
      revenue: 8900.0,
      orders: 28,
      customers: 24,
      avgOrderValue: 317.86,
      growth: -2.1,
      topProduct: 'حاسوب محمول',
      topCategory: 'إلكترونيات',
      status: 'معلق',
      priority: 'متوسط',
      region: 'جدة',
      salesRep: 'عبدالله سعد',
      notes: 'تحتاج مراجعة',
    },
  ];

  const reportTypes = ['يومي', 'أسبوعي', 'شهري', 'ربعي', 'سنوي'];
  const statusOptions = ['مكتمل', 'قيد المراجعة', 'معلق', 'مرفوض'];
  const priorityOptions = ['عالي', 'متوسط', 'منخفض'];
  const regionOptions = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const notify = useCallback((action, details) => {
    setSnackbar({
      open: true,
      message: `تم تنفيذ: ${action} - ${details}`,
      severity: 'success',
    });
  }, []);

  const handleExport = useCallback(() => {
    notify('تصدير تقرير المبيعات', 'تم تصدير تقرير المبيعات بنجاح');
  }, [notify]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      notify('تحديث البيانات', 'تم تحديث البيانات بنجاح');
    }, 1000);
  }, [notify]);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleSelectAll = useCallback(
    (event) => {
      if (event.target.checked) {
        setSelectedItems(salesData.map((item) => item.id));
      } else {
        setSelectedItems([]);
      }
    },
    [salesData],
  );

  const handleSelectItem = useCallback(
    (id) => {
      if (selectedItems.includes(id)) {
        setSelectedItems(selectedItems.filter((item) => item !== id));
      } else {
        setSelectedItems([...selectedItems, id]);
      }
    },
    [selectedItems],
  );

  const handleView = useCallback((report) => {
    setSelectedReport(report);
    setOpenViewDialog(true);
  }, []);

  const handleEdit = useCallback((report) => {
    setSelectedReport(report);
    setOpenEditDialog(true);
  }, []);

  const handleDelete = useCallback(
    (report) => {
      notify('حذف التقرير', `تم حذف تقرير ${report.period} بنجاح`);
    },
    [notify],
  );

  const handleSort = useCallback(
    (property) => {
      const isAsc = sortBy === property && sortOrder === 'asc';
      setSortOrder(isAsc ? 'desc' : 'asc');
      setSortBy(property);
    },
    [sortBy, sortOrder],
  );

  const filteredData = useMemo(() => {
    return salesData.filter((item) => {
      const matchesSearch =
        item.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.topProduct.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.salesRep.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = reportType === 'all' || item.period.includes(reportType.toLowerCase());
      return matchesSearch && matchesType;
    });
  }, [salesData, searchTerm, reportType]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredData, sortBy, sortOrder]);

  const totalRevenue = useMemo(
    () => salesData.reduce((sum, item) => sum + item.revenue, 0),
    [salesData],
  );

  const totalOrders = useMemo(
    () => salesData.reduce((sum, item) => sum + item.orders, 0),
    [salesData],
  );

  const totalCustomers = useMemo(
    () => salesData.reduce((sum, item) => sum + item.customers, 0),
    [salesData],
  );

  const avgGrowth = useMemo(
    () => salesData.reduce((sum, item) => sum + item.growth, 0) / salesData.length,
    [salesData],
  );

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'مكتمل':
        return 'success';
      case 'قيد المراجعة':
        return 'warning';
      case 'معلق':
        return 'info';
      case 'مرفوض':
        return 'error';
      default:
        return 'default';
    }
  }, []);

  const getPriorityColor = useCallback((priority) => {
    switch (priority) {
      case 'عالي':
        return 'error';
      case 'متوسط':
        return 'warning';
      case 'منخفض':
        return 'success';
      default:
        return 'default';
    }
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* رأس الصفحة مع الإحصائيات */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              تقارير المبيعات
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              تحليل أداء المبيعات والمؤشرات المالية الشاملة
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mt: 1 }}>
              <Link color="inherit" href="/system" sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                لوحة التحكم
              </Link>
              <Link color="inherit" href="/system/analytics">
                التحليلات
              </Link>
              <Typography color="text.primary">تقارير المبيعات</Typography>
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
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() =>
                setSnackbar({ open: true, message: 'تم تطبيق المرشحات', severity: 'success' })
              }
            >
              تطبيق المرشحات
            </Button>
            <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExport}>
              تصدير التقرير
            </Button>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
              تقرير جديد
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
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, mr: 2 }}>
                    <AttachMoneyIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  ${totalRevenue.toLocaleString()}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  إجمالي الإيرادات
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
                  <Avatar sx={{ bgcolor: 'success.main', width: 48, height: 48, mr: 2 }}>
                    <ShoppingCartIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                  {totalOrders}
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
                  <Avatar sx={{ bgcolor: 'warning.main', width: 48, height: 48, mr: 2 }}>
                    <PeopleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  {totalCustomers}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  العملاء النشطون
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
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48, mr: 2 }}>
                    {avgGrowth >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                  {avgGrowth.toFixed(1)}%
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  متوسط النمو
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* المرشحات المحسنة */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            المرشحات والبحث المتقدم
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setSearchTerm('');
              setDateFrom(
                new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              );
              setDateTo(new Date().toISOString().split('T')[0]);
              setReportType('all');
            }}
          >
            مسح المرشحات
          </Button>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في التقارير"
              size="small"
              placeholder="البحث بالفترة أو المنتج أو المندوب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              fullWidth
              type="date"
              label="من تاريخ"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              fullWidth
              type="date"
              label="إلى تاريخ"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>نوع التقرير</InputLabel>
              <Select
                value={reportType}
                label="نوع التقرير"
                onChange={(e) => setReportType(e.target.value)}
              >
                <MenuItem value="all">جميع الأنواع</MenuItem>
                {reportTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="body2" color="text.secondary">
              تم العثور على {filteredData.length} تقرير
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* المحتوى المحسن */}
      <Paper>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            تفاصيل أداء المبيعات
          </Typography>

          {loading ? (
            <Box sx={{ p: 2 }}>
              <LinearProgress />
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} height={60} sx={{ mb: 1 }} />
              ))}
            </Box>
          ) : error ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Alert severity="error">خطأ في تحميل بيانات المبيعات. يرجى المحاولة مرة أخرى.</Alert>
            </Box>
          ) : filteredData.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Alert severity="info">لم يتم العثور على بيانات مبيعات للفترة المحددة.</Alert>
            </Box>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selectedItems.length > 0 && selectedItems.length < salesData.length
                        }
                        checked={salesData.length > 0 && selectedItems.length === salesData.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'period'}
                        direction={sortBy === 'period' ? sortOrder : 'asc'}
                        onClick={() => handleSort('period')}
                      >
                        الفترة
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={sortBy === 'revenue'}
                        direction={sortBy === 'revenue' ? sortOrder : 'asc'}
                        onClick={() => handleSort('revenue')}
                      >
                        الإيرادات
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">الطلبات</TableCell>
                    <TableCell align="right">العملاء</TableCell>
                    <TableCell align="right">متوسط قيمة الطلب</TableCell>
                    <TableCell align="right">النمو</TableCell>
                    <TableCell>أفضل منتج</TableCell>
                    <TableCell>المنطقة</TableCell>
                    <TableCell>المندوب</TableCell>
                    <TableCell>الحالة</TableCell>
                    <TableCell>الأولوية</TableCell>
                    <TableCell align="center">الإجراءات</TableCell>
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
                          <Typography variant="body2">{item.period}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="subtitle2" fontWeight="bold">
                            ${item.revenue.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">{item.orders}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">{item.customers}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">${item.avgOrderValue.toFixed(2)}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                            }}
                          >
                            {item.growth >= 0 ? (
                              <TrendingUpIcon color="success" sx={{ mr: 0.5, fontSize: 16 }} />
                            ) : (
                              <TrendingDownIcon color="error" sx={{ mr: 0.5, fontSize: 16 }} />
                            )}
                            <Typography
                              variant="body2"
                              color={item.growth >= 0 ? 'success.main' : 'error.main'}
                            >
                              {item.growth}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{item.topProduct}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={item.region} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{item.salesRep}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={item.status}
                            color={getStatusColor(item.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={item.priority}
                            color={getPriorityColor(item.priority)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <Tooltip title="عرض التفاصيل" arrow>
                              <IconButton
                                size="small"
                                onClick={() => handleView(item)}
                                aria-label="view report"
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="تعديل التقرير" arrow>
                              <IconButton
                                size="small"
                                onClick={() => handleEdit(item)}
                                aria-label="edit report"
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف التقرير" arrow>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(item)}
                                aria-label="delete report"
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
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Box>
      </Paper>

      {/* Dialog إنشاء تقرير جديد */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">إنشاء تقرير مبيعات جديد</Typography>
            <IconButton onClick={() => setOpenDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الفترة"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الإيرادات المتوقعة"
                type="number"
                size="small"
                placeholder="0.00"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="عدد الطلبات المتوقع"
                type="number"
                size="small"
                placeholder="0"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="عدد العملاء المتوقع"
                type="number"
                size="small"
                placeholder="0"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>المنطقة</InputLabel>
                <Select label="المنطقة">
                  {regionOptions.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="المندوب المسؤول" size="small" placeholder="اسم المندوب" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الأولوية</InputLabel>
                <Select label="الأولوية">
                  {priorityOptions.map((priority) => (
                    <MenuItem key={priority} value={priority}>
                      {priority}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة">
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="ملاحظات إضافية"
                multiline
                rows={3}
                size="small"
                placeholder="أي ملاحظات أو تفاصيل إضافية..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => {
              notify('إنشاء تقرير جديد', 'تم إنشاء التقرير بنجاح');
              setOpenDialog(false);
            }}
          >
            حفظ التقرير
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog عرض التفاصيل */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">تفاصيل تقرير المبيعات</Typography>
            <IconButton onClick={() => setOpenViewDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الفترة
                </Typography>
                <Typography variant="body1">{selectedReport.period}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الإيرادات
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  ${selectedReport.revenue.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  عدد الطلبات
                </Typography>
                <Typography variant="body1">{selectedReport.orders}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  عدد العملاء
                </Typography>
                <Typography variant="body1">{selectedReport.customers}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  متوسط قيمة الطلب
                </Typography>
                <Typography variant="body1">${selectedReport.avgOrderValue.toFixed(2)}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  معدل النمو
                </Typography>
                <Typography
                  variant="body1"
                  color={selectedReport.growth >= 0 ? 'success.main' : 'error.main'}
                >
                  {selectedReport.growth}%
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  أفضل منتج
                </Typography>
                <Typography variant="body1">{selectedReport.topProduct}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  المنطقة
                </Typography>
                <Chip label={selectedReport.region} size="small" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  المندوب المسؤول
                </Typography>
                <Typography variant="body1">{selectedReport.salesRep}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الحالة
                </Typography>
                <Chip
                  label={selectedReport.status}
                  color={getStatusColor(selectedReport.status)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الأولوية
                </Typography>
                <Chip
                  label={selectedReport.priority}
                  color={getPriorityColor(selectedReport.priority)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الملاحظات
                </Typography>
                <Typography variant="body1">{selectedReport.notes}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>إغلاق</Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => {
              setOpenViewDialog(false);
              setOpenEditDialog(true);
            }}
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog تعديل التقرير */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">تعديل تقرير المبيعات</Typography>
            <IconButton onClick={() => setOpenEditDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="الفترة" value={selectedReport.period} size="small" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="الإيرادات"
                  type="number"
                  value={selectedReport.revenue}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="عدد الطلبات"
                  type="number"
                  value={selectedReport.orders}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="عدد العملاء"
                  type="number"
                  value={selectedReport.customers}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="متوسط قيمة الطلب"
                  type="number"
                  value={selectedReport.avgOrderValue}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="معدل النمو"
                  type="number"
                  value={selectedReport.growth}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="أفضل منتج"
                  value={selectedReport.topProduct}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>المنطقة</InputLabel>
                  <Select value={selectedReport.region} label="المنطقة">
                    {regionOptions.map((region) => (
                      <MenuItem key={region} value={region}>
                        {region}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="المندوب المسؤول"
                  value={selectedReport.salesRep}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>الحالة</InputLabel>
                  <Select value={selectedReport.status} label="الحالة">
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>الأولوية</InputLabel>
                  <Select value={selectedReport.priority} label="الأولوية">
                    {priorityOptions.map((priority) => (
                      <MenuItem key={priority} value={priority}>
                        {priority}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="ملاحظات إضافية"
                  multiline
                  rows={3}
                  value={selectedReport.notes}
                  size="small"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => {
              notify('تحديث التقرير', 'تم تحديث التقرير بنجاح');
              setOpenEditDialog(false);
            }}
          >
            حفظ التغييرات
          </Button>
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

export default SalesReports;
