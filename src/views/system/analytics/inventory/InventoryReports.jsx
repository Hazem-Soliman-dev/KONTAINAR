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
  TableContainer,
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
  Divider,
  Switch,
  FormControlLabel,
  Checkbox,
  TableSortLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Inventory as InventoryIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Assessment as AssessmentIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Analytics as AnalyticsIcon,
  Store as StoreIcon,
  LocalShipping as LocalShippingIcon,
  Category as CategoryIcon,
  AttachMoney as AttachMoneyIcon,
  Inventory2 as Inventory2Icon,
} from '@mui/icons-material';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/system',
    title: 'الرئيسية',
  },
  {
    to: '/system/analytics',
    title: 'التحليلات',
  },
  {
    title: 'تقارير المخزون',
  },
];

const InventoryReports = () => {
  const theme = useTheme();
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
  const [sortBy, setSortBy] = useState('reportDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // بيانات وهمية شاملة ومحسنة لتقارير المخزون
  const inventoryData = [
    {
      id: 1,
      reportDate: '2024-01-15',
      productName: 'هاتف iPhone 15 Pro',
      category: 'إلكترونيات',
      sku: 'IPH15P-256-BLK',
      currentStock: 45,
      minStock: 10,
      maxStock: 100,
      unitCost: 3500,
      totalValue: 157500,
      lastRestock: '2024-01-10',
      lastSale: '2024-01-14',
      turnoverRate: 2.3,
      status: 'متوفر',
      priority: 'عالي',
      supplier: 'شركة آبل',
      location: 'المستودع الرئيسي',
      region: 'الرياض',
      manager: 'أحمد محمد',
      notes: 'مخزون جيد، يحتاج متابعة',
    },
    {
      id: 2,
      reportDate: '2024-01-14',
      productName: 'لابتوب MacBook Pro',
      category: 'إلكترونيات',
      sku: 'MBP14-512-SLV',
      currentStock: 12,
      minStock: 5,
      maxStock: 50,
      unitCost: 8500,
      totalValue: 102000,
      lastRestock: '2024-01-08',
      lastSale: '2024-01-13',
      turnoverRate: 1.8,
      status: 'متوفر',
      priority: 'عالي',
      supplier: 'شركة آبل',
      location: 'المستودع الرئيسي',
      region: 'الرياض',
      manager: 'فاطمة أحمد',
      notes: 'مخزون منخفض، يحتاج إعادة تموين',
    },
    {
      id: 3,
      reportDate: '2024-01-13',
      productName: 'سماعات AirPods Pro',
      category: 'إلكترونيات',
      sku: 'APP2-WHT',
      currentStock: 3,
      minStock: 15,
      maxStock: 80,
      unitCost: 1200,
      totalValue: 3600,
      lastRestock: '2024-01-05',
      lastSale: '2024-01-12',
      turnoverRate: 4.2,
      status: 'مخزون منخفض',
      priority: 'عالي',
      supplier: 'شركة آبل',
      location: 'المستودع الفرعي',
      region: 'جدة',
      manager: 'محمد علي',
      notes: 'مخزون حرج، يحتاج إعادة تموين فورية',
    },
    {
      id: 4,
      reportDate: '2024-01-12',
      productName: 'ساعة Apple Watch',
      category: 'إلكترونيات',
      sku: 'AW9-45-GLD',
      currentStock: 25,
      minStock: 8,
      maxStock: 60,
      unitCost: 2200,
      totalValue: 55000,
      lastRestock: '2024-01-09',
      lastSale: '2024-01-11',
      turnoverRate: 3.1,
      status: 'متوفر',
      priority: 'متوسط',
      supplier: 'شركة آبل',
      location: 'المستودع الرئيسي',
      region: 'الدمام',
      manager: 'سارة خالد',
      notes: 'مخزون جيد، أداء ممتاز',
    },
    {
      id: 5,
      reportDate: '2024-01-11',
      productName: 'كاميرا Canon EOS R5',
      category: 'إلكترونيات',
      sku: 'CER5-BLK',
      currentStock: 0,
      minStock: 3,
      maxStock: 20,
      unitCost: 15000,
      totalValue: 0,
      lastRestock: '2024-01-03',
      lastSale: '2024-01-10',
      turnoverRate: 5.8,
      status: 'نفد المخزون',
      priority: 'عالي',
      supplier: 'شركة كانون',
      location: 'المستودع الرئيسي',
      region: 'الرياض',
      manager: 'عبدالله سعد',
      notes: 'نفد المخزون، يحتاج إعادة تموين عاجلة',
    },
  ];

  const reportTypes = ['يومي', 'أسبوعي', 'شهري', 'ربعي', 'سنوي'];
  const statusOptions = ['متوفر', 'مخزون منخفض', 'نفد المخزون', 'معلق', 'قيد المراجعة'];
  const priorityOptions = ['عالي', 'متوسط', 'منخفض'];
  const regionOptions = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'];
  const categoryOptions = ['إلكترونيات', 'ملابس', 'أجهزة منزلية', 'كتب', 'ألعاب'];
  const locationOptions = ['المستودع الرئيسي', 'المستودع الفرعي', 'المتجر', 'المخزن المؤقت'];

  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'تحليل حركة المخزون',
      content: 'تحليل وتتبع حركة المخزون والعمليات اليومية.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'تحسين إدارة المخزون',
      content: 'تحسين عمليات إدارة المخزون وتقليل التكاليف.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'تتبع معدل الدوران',
      content: 'تتبع وتحليل معدل دوران المخزون.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'تحليل الموردين',
      content: 'تحليل أداء الموردين وموثوقية التوريد.',
      isExpanded: false,
    },
  ]);

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
    notify('تصدير تقرير المخزون', 'تم تصدير تقرير المخزون بنجاح');
  }, [notify]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      notify('تحديث البيانات', 'تم تحديث بيانات المخزون بنجاح');
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
        setSelectedItems(inventoryData.map((item) => item.id));
      } else {
        setSelectedItems([]);
      }
    },
    [inventoryData],
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
      notify('حذف تقرير المخزون', `تم حذف تقرير المخزون ${report.productName} بنجاح`);
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

  const handleAddSection = useCallback(() => {
    const newSection = {
      id: sections.length + 1,
      title: 'قسم جديد',
      content: 'وصف القسم الجديد...',
      isExpanded: false,
    };
    setSections([...sections, newSection]);
  }, [sections]);

  const handleDeleteSection = useCallback(
    (id) => {
      setSections(sections.filter((section) => section.id !== id));
    },
    [sections],
  );

  const handleSectionChange = useCallback(
    (id, field, value) => {
      setSections(
        sections.map((section) => (section.id === id ? { ...section, [field]: value } : section)),
      );
    },
    [sections],
  );

  const handleToggleExpanded = useCallback(
    (id) => {
      setSections(
        sections.map((section) =>
          section.id === id ? { ...section, isExpanded: !section.isExpanded } : section,
        ),
      );
    },
    [sections],
  );

  const filteredData = useMemo(() => {
    return inventoryData.filter((item) => {
      const matchesSearch =
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        reportType === 'all' || item.reportDate.includes(reportType.toLowerCase());
      return matchesSearch && matchesType;
    });
  }, [inventoryData, searchTerm, reportType]);

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

  const totalProducts = useMemo(() => inventoryData.length, [inventoryData]);

  const totalStockValue = useMemo(
    () => inventoryData.reduce((sum, item) => sum + item.totalValue, 0),
    [inventoryData],
  );

  const lowStockItems = useMemo(
    () => inventoryData.filter((item) => item.currentStock <= item.minStock).length,
    [inventoryData],
  );

  const avgTurnoverRate = useMemo(
    () => inventoryData.reduce((sum, item) => sum + item.turnoverRate, 0) / inventoryData.length,
    [inventoryData],
  );

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'متوفر':
        return 'success';
      case 'مخزون منخفض':
        return 'warning';
      case 'نفد المخزون':
        return 'error';
      case 'معلق':
        return 'info';
      case 'قيد المراجعة':
        return 'default';
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
    <PageContainer title="تقارير المخزون" description="تحليل وإدارة المخزون ومؤشرات الأداء">
      <Breadcrumb title="تقارير المخزون" items={BCrumb} />

      <Box>
        {/* Enhanced Stats Cards */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              mb: 3,
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                disabled={isRefreshing}
                fullWidth={false}
              >
                {isRefreshing ? 'جاري التحديث...' : 'تحديث'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() =>
                  setSnackbar({ open: true, message: 'تم تطبيق المرشحات', severity: 'success' })
                }
                fullWidth={false}
              >
                تطبيق المرشحات
              </Button>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleExport}
                fullWidth={false}
              >
                تصدير التقرير
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
                fullWidth={false}
              >
                منتج جديد
              </Button>
            </Stack>
          </Box>

          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  flexDirection: 'row',
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette.primary.main,
                    0.08,
                  )} 0%, ${alpha(theme.palette.primary.main, 0.04)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  transition: 'all .3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 8,
                  },
                  '& .stat-icon': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" width="180px" height="90px" margin="auto" flexDirection="column" justifyContent="center">
                    <Box display="flex" alignItems="center" width="60px" height="60px" margin="auto" flexDirection="column" justifyContent="center" mb={2}>
                      <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: 60, height: 60, justifyContent: 'center' }}>
                        <InventoryIcon />
                      </Avatar>
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                        {totalProducts}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        إجمالي المنتجات
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  flexDirection: 'row',
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette.success.main,
                    0.08,
                  )} 0%, ${alpha(theme.palette.success.main, 0.04)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                  transition: 'all .3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 8,
                  },
                  '& .stat-icon': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" width="180px" height="90px" margin="auto" flexDirection="column" justifyContent="center">
                    <Box display="flex" alignItems="center" width="60px" height="60px" margin="auto" flexDirection="column" justifyContent="center" mb={2}>
                      <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main, width: 60, height: 60, justifyContent: 'center' }}>
                        <CheckCircleIcon />
                      </Avatar>
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                        {totalProducts - lowStockItems}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        المنتجات المتوفرة
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  flexDirection: 'row',
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette.warning.main,
                    0.08,
                  )} 0%, ${alpha(theme.palette.warning.main, 0.04)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                  transition: 'all .3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 8,
                  },
                  '& .stat-icon': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" width="180px" height="90px" margin="auto" flexDirection="column" justifyContent="center">
                    <Box display="flex" alignItems="center" width="60px" height="60px" margin="auto" flexDirection="column" justifyContent="center" mb={2}>
                      <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), color: theme.palette.warning.main, width: 60, height: 60, justifyContent: 'center' }}>
                        <WarningIcon />
                      </Avatar>
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                        {lowStockItems}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        مخزون منخفض
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  flexDirection: 'row',
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette.secondary.main,
                    0.08,
                  )} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                  transition: 'all .3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 8,
                  },
                  '& .stat-icon': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" width="180px" height="90px" margin="auto" flexDirection="column" justifyContent="center">
                    <Box display="flex" alignItems="center" width="60px" height="60px" margin="auto" flexDirection="column" justifyContent="center" mb={2}>
                      <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main, width: 60, height: 60, justifyContent: 'center' }}>
                        <AttachMoneyIcon />
                      </Avatar>
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                        ${totalStockValue.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        إجمالي قيمة المخزون
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* المرشحات المحسنة */}
        <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              mb: 2,
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              المرشحات والبحث المتقدم
            </Typography>
            <Button
              variant="outlined"
              size="small"
              fullWidth={false}
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
                label="البحث في المخزون"
                size="small"
                placeholder="البحث بالاسم أو الكود أو المورد..."
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
                تم العثور على {filteredData.length} منتج
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* المحتوى المحسن */}
        <Paper>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              تفاصيل المخزون
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
                <Alert severity="error">خطأ في تحميل بيانات المخزون. يرجى المحاولة مرة أخرى.</Alert>
              </Box>
            ) : filteredData.length === 0 ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Alert severity="info">لم يتم العثور على منتجات للفترة المحددة.</Alert>
              </Box>
            ) : (
              <>
                <TableContainer sx={{ overflowX: 'auto' }}>
                  <Table sx={{ width: '100%' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <TableSortLabel
                            active={sortBy === 'reportDate'}
                            direction={sortBy === 'reportDate' ? sortOrder : 'asc'}
                            onClick={() => handleSort('reportDate')}
                          >
                            تاريخ التقرير
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>اسم المنتج</TableCell>
                        <TableCell>الفئة</TableCell>
                        <TableCell>SKU</TableCell>
                        <TableCell align="right">المخزون الحالي</TableCell>
                        <TableCell align="right">الحد الأدنى</TableCell>
                        <TableCell align="right">الحد الأقصى</TableCell>
                        <TableCell align="right">التكلفة</TableCell>
                        <TableCell align="right">القيمة الإجمالية</TableCell>
                        <TableCell align="right">معدل الدوران</TableCell>
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
                            <TableCell>
                              <Typography variant="body2">{item.reportDate}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {item.productName}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip label={item.category} size="small" variant="outlined" />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                {item.sku}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                color={
                                  item.currentStock <= item.minStock
                                    ? 'error.main'
                                    : item.currentStock <= item.minStock * 1.5
                                    ? 'warning.main'
                                    : 'success.main'
                                }
                              >
                                {item.currentStock}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2">{item.minStock}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2">{item.maxStock}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2">
                                ${item.unitCost.toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                color="primary.main"
                              >
                                ${item.totalValue.toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'flex-end',
                                }}
                              >
                                {item.turnoverRate >= 3 ? (
                                  <TrendingUpIcon color="success" sx={{ mr: 0.5, fontSize: 16 }} />
                                ) : (
                                  <TrendingDownIcon color="error" sx={{ mr: 0.5, fontSize: 16 }} />
                                )}
                                <Typography
                                  variant="body2"
                                  color={item.turnoverRate >= 3 ? 'success.main' : 'error.main'}
                                >
                                  {item.turnoverRate}
                                </Typography>
                              </Box>
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
                </TableContainer>
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

        {/* أقسام التحليل */}
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mt: 3 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                    mb: 2,
                    gap: { xs: 1, sm: 0 },
                  }}
                >
                  <Typography variant="h6">عمليات تحليل المخزون</Typography>
                  <Chip label={`${sections.length} عمليات`} color="primary" size="small" />
                </Box>
                <Divider sx={{ mb: 2 }} />

                {sections.map((section) => (
                  <Accordion
                    key={section.id}
                    expanded={section.isExpanded}
                    onChange={() => handleToggleExpanded(section.id)}
                    sx={{ mb: 1 }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <InventoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <TextField
                          value={section.title}
                          onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                          size="small"
                          sx={{ flexGrow: 1, mr: 2 }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="حذف العملية">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSection(section.id);
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={section.content}
                        onChange={(e) => handleSectionChange(section.id, 'content', e.target.value)}
                        placeholder="أدخل تفاصيل العملية..."
                        size="small"
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}

                {sections.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <InventoryIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      لا توجد عمليات تحليل بعد
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      أضف أول عملية تحليل للبدء
                    </Typography>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddSection}>
                      إضافة أول عملية
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  إعدادات التقرير
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel>حالة التقرير</InputLabel>
                      <Select value="نشط" label="حالة التقرير">
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
                      label="تاريخ التقرير"
                      type="date"
                      value={new Date().toISOString().split('T')[0]}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlLabel control={<Switch defaultChecked />} label="التقرير نشط" />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="نوع التقرير"
                      size="small"
                      placeholder="نوع التقرير..."
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Dialog إضافة منتج جديد */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">إضافة منتج جديد للمخزون</Typography>
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
                  label="اسم المنتج"
                  size="small"
                  placeholder="أدخل اسم المنتج..."
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="تاريخ التقرير"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>الفئة</InputLabel>
                  <Select label="الفئة">
                    {categoryOptions.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="كود المنتج (SKU)"
                  size="small"
                  placeholder="أدخل كود المنتج..."
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="المخزون الحالي"
                  type="number"
                  size="small"
                  placeholder="0"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="الحد الأدنى"
                  type="number"
                  size="small"
                  placeholder="0"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="الحد الأقصى"
                  type="number"
                  size="small"
                  placeholder="0"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="التكلفة الوحدة"
                  type="number"
                  size="small"
                  placeholder="0.00"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="المورد" size="small" placeholder="اسم المورد..." />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>الموقع</InputLabel>
                  <Select label="الموقع">
                    {locationOptions.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                <TextField
                  fullWidth
                  label="المدير المسؤول"
                  size="small"
                  placeholder="اسم المدير المسؤول"
                />
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
                notify('إضافة منتج جديد', 'تم إضافة المنتج بنجاح');
                setOpenDialog(false);
              }}
            >
              حفظ المنتج
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
              <Typography variant="h6">تفاصيل المنتج في المخزون</Typography>
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
                    اسم المنتج
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedReport.productName}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تاريخ التقرير
                  </Typography>
                  <Typography variant="body1">{selectedReport.reportDate}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    الفئة
                  </Typography>
                  <Chip label={selectedReport.category} size="small" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    كود المنتج
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                    {selectedReport.sku}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    المخزون الحالي
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600 }}
                    color={
                      selectedReport.currentStock <= selectedReport.minStock
                        ? 'error.main'
                        : selectedReport.currentStock <= selectedReport.minStock * 1.5
                        ? 'warning.main'
                        : 'success.main'
                    }
                  >
                    {selectedReport.currentStock}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    الحد الأدنى
                  </Typography>
                  <Typography variant="body1">{selectedReport.minStock}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    الحد الأقصى
                  </Typography>
                  <Typography variant="body1">{selectedReport.maxStock}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    التكلفة الوحدة
                  </Typography>
                  <Typography variant="body1">
                    ${selectedReport.unitCost.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    القيمة الإجمالية
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    ${selectedReport.totalValue.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    معدل الدوران
                  </Typography>
                  <Typography variant="body1">{selectedReport.turnoverRate}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    آخر إعادة تموين
                  </Typography>
                  <Typography variant="body1">{selectedReport.lastRestock}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    آخر بيع
                  </Typography>
                  <Typography variant="body1">{selectedReport.lastSale}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    المورد
                  </Typography>
                  <Typography variant="body1">{selectedReport.supplier}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    الموقع
                  </Typography>
                  <Typography variant="body1">{selectedReport.location}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    المنطقة
                  </Typography>
                  <Chip label={selectedReport.region} size="small" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    المدير المسؤول
                  </Typography>
                  <Typography variant="body1">{selectedReport.manager}</Typography>
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

        {/* Dialog تعديل المنتج */}
        <Dialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">تعديل المنتج في المخزون</Typography>
              <IconButton onClick={() => setOpenEditDialog(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            {selectedReport && (
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="اسم المنتج"
                    value={selectedReport.productName}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="تاريخ التقرير"
                    type="date"
                    value={selectedReport.reportDate}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>الفئة</InputLabel>
                    <Select value={selectedReport.category} label="الفئة">
                      {categoryOptions.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="كود المنتج (SKU)"
                    value={selectedReport.sku}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="المخزون الحالي"
                    type="number"
                    value={selectedReport.currentStock}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="الحد الأدنى"
                    type="number"
                    value={selectedReport.minStock}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="الحد الأقصى"
                    type="number"
                    value={selectedReport.maxStock}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="التكلفة الوحدة"
                    type="number"
                    value={selectedReport.unitCost}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="المورد"
                    value={selectedReport.supplier}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>الموقع</InputLabel>
                    <Select value={selectedReport.location} label="الموقع">
                      {locationOptions.map((location) => (
                        <MenuItem key={location} value={location}>
                          {location}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                    label="المدير المسؤول"
                    value={selectedReport.manager}
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
                notify('تحديث المنتج', 'تم تحديث المنتج بنجاح');
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
    </PageContainer>
  );
};

export default InventoryReports;
