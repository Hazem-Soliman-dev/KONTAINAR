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
  Divider,
  Switch,
  FormControlLabel,
  Checkbox,
  TableSortLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Search as SearchIcon,
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
  Speed as SpeedIcon,
  SearchOff as SearchOffIcon,
} from '@mui/icons-material';

const SearchReports = () => {
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
  const [sortBy, setSortBy] = useState('searchDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // بيانات وهمية شاملة ومحسنة لتقارير البحث
  const searchData = [
    {
      id: 1,
      searchDate: '2024-01-15',
      searchTerm: 'هاتف ذكي',
      searchCount: 1250,
      successfulSearches: 1100,
      noResultsCount: 150,
      avgSearchTime: 1.2,
      topResults: 'iPhone 15 Pro',
      searchCategory: 'إلكترونيات',
      userSegment: 'شباب',
      deviceType: 'موبايل',
      searchSource: 'البحث المباشر',
      conversionRate: 8.5,
      bounceRate: 12.3,
      status: 'نشط',
      priority: 'عالي',
      region: 'الرياض',
      notes: 'أداء ممتاز في البحث',
    },
    {
      id: 2,
      searchDate: '2024-01-14',
      searchTerm: 'لابتوب',
      searchCount: 980,
      successfulSearches: 850,
      noResultsCount: 130,
      avgSearchTime: 1.8,
      topResults: 'MacBook Pro',
      searchCategory: 'إلكترونيات',
      userSegment: 'محترفين',
      deviceType: 'ديسكتوب',
      searchSource: 'البحث المباشر',
      conversionRate: 12.1,
      bounceRate: 8.7,
      status: 'نشط',
      priority: 'متوسط',
      region: 'جدة',
      notes: 'زيادة في عمليات البحث',
    },
    {
      id: 3,
      searchDate: '2024-01-13',
      searchTerm: 'سماعات',
      searchCount: 750,
      successfulSearches: 680,
      noResultsCount: 70,
      avgSearchTime: 0.9,
      topResults: 'AirPods Pro',
      searchCategory: 'إلكترونيات',
      userSegment: 'شباب',
      deviceType: 'موبايل',
      searchSource: 'البحث المباشر',
      conversionRate: 15.2,
      bounceRate: 6.4,
      status: 'نشط',
      priority: 'عالي',
      region: 'الدمام',
      notes: 'أفضل أداء في البحث',
    },
    {
      id: 4,
      searchDate: '2024-01-12',
      searchTerm: 'ساعة ذكية',
      searchCount: 650,
      successfulSearches: 580,
      noResultsCount: 70,
      avgSearchTime: 1.5,
      topResults: 'Apple Watch',
      searchCategory: 'إلكترونيات',
      userSegment: 'رياضيين',
      deviceType: 'موبايل',
      searchSource: 'البحث المباشر',
      conversionRate: 9.8,
      bounceRate: 10.2,
      status: 'نشط',
      priority: 'متوسط',
      region: 'الرياض',
      notes: 'أداء جيد في البحث',
    },
    {
      id: 5,
      searchDate: '2024-01-11',
      searchTerm: 'كاميرا',
      searchCount: 420,
      successfulSearches: 350,
      noResultsCount: 70,
      avgSearchTime: 2.1,
      topResults: 'Canon EOS',
      searchCategory: 'إلكترونيات',
      userSegment: 'مصورين',
      deviceType: 'ديسكتوب',
      searchSource: 'البحث المباشر',
      conversionRate: 6.7,
      bounceRate: 18.5,
      status: 'معلق',
      priority: 'منخفض',
      region: 'جدة',
      notes: 'يحتاج تحسين في النتائج',
    },
  ];

  const reportTypes = ['يومي', 'أسبوعي', 'شهري', 'ربعي', 'سنوي'];
  const statusOptions = ['نشط', 'معلق', 'معطل', 'قيد المراجعة'];
  const priorityOptions = ['عالي', 'متوسط', 'منخفض'];
  const regionOptions = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'];
  const userSegmentOptions = ['شباب', 'محترفين', 'رياضيين', 'مصورين', 'عائلات'];
  const deviceTypeOptions = ['موبايل', 'ديسكتوب', 'تابلت'];
  const searchSourceOptions = ['البحث المباشر', 'الفلترة', 'التوصيات', 'التصفح'];

  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'تحليل كلمات البحث',
      content: 'تحليل وتتبع كلمات البحث الأكثر شيوعاً وأداءها.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'تحسين نتائج البحث',
      content: 'تحسين خوارزميات البحث لتحسين تجربة المستخدم.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'تتبع أداء البحث',
      content: 'تتبع مؤشرات أداء البحث والتحويلات.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'تحليل سلوك المستخدمين',
      content: 'تحليل سلوك المستخدمين في البحث والتنقل.',
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
    notify('تصدير تقرير البحث', 'تم تصدير تقرير البحث بنجاح');
  }, [notify]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      notify('تحديث البيانات', 'تم تحديث بيانات البحث بنجاح');
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
        setSelectedItems(searchData.map((item) => item.id));
      } else {
        setSelectedItems([]);
      }
    },
    [searchData],
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
      notify('حذف تقرير البحث', `تم حذف تقرير البحث ${report.searchTerm} بنجاح`);
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
    return searchData.filter((item) => {
      const matchesSearch =
        item.searchTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.topResults.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.searchCategory.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        reportType === 'all' || item.searchDate.includes(reportType.toLowerCase());
      return matchesSearch && matchesType;
    });
  }, [searchData, searchTerm, reportType]);

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

  const totalSearches = useMemo(
    () => searchData.reduce((sum, item) => sum + item.searchCount, 0),
    [searchData],
  );

  const totalSuccessfulSearches = useMemo(
    () => searchData.reduce((sum, item) => sum + item.successfulSearches, 0),
    [searchData],
  );

  const totalNoResults = useMemo(
    () => searchData.reduce((sum, item) => sum + item.noResultsCount, 0),
    [searchData],
  );

  const avgConversionRate = useMemo(
    () => searchData.reduce((sum, item) => sum + item.conversionRate, 0) / searchData.length,
    [searchData],
  );

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'نشط':
        return 'success';
      case 'معلق':
        return 'warning';
      case 'معطل':
        return 'error';
      case 'قيد المراجعة':
        return 'info';
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
              تقارير البحث
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              تحليل أداء البحث وتحسين تجربة المستخدم
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mt: 1 }}>
              <Link color="inherit" href="/system" sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                لوحة التحكم
              </Link>
              <Link color="inherit" href="/system/analytics">
                التحليلات
              </Link>
              <Typography color="text.primary">تقارير البحث</Typography>
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
                    <SearchIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  {totalSearches.toLocaleString()}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  إجمالي عمليات البحث
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
                    <CheckCircleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                  {totalSuccessfulSearches.toLocaleString()}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  عمليات البحث الناجحة
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
                    <SearchOffIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  {totalNoResults.toLocaleString()}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  عمليات البحث بدون نتائج
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
                    <AnalyticsIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                  {avgConversionRate.toFixed(1)}%
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  متوسط معدل التحويل
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
              label="البحث في تقارير البحث"
              size="small"
              placeholder="البحث بكلمة البحث أو النتيجة أو الفئة..."
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
            تفاصيل أداء البحث
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
              <Alert severity="error">خطأ في تحميل بيانات البحث. يرجى المحاولة مرة أخرى.</Alert>
            </Box>
          ) : filteredData.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Alert severity="info">لم يتم العثور على بيانات بحث للفترة المحددة.</Alert>
            </Box>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selectedItems.length > 0 && selectedItems.length < searchData.length
                        }
                        checked={
                          searchData.length > 0 && selectedItems.length === searchData.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'searchDate'}
                        direction={sortBy === 'searchDate' ? sortOrder : 'asc'}
                        onClick={() => handleSort('searchDate')}
                      >
                        تاريخ البحث
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>كلمة البحث</TableCell>
                    <TableCell align="right">عدد عمليات البحث</TableCell>
                    <TableCell align="right">البحث الناجح</TableCell>
                    <TableCell align="right">بدون نتائج</TableCell>
                    <TableCell align="right">متوسط وقت البحث</TableCell>
                    <TableCell>أفضل نتيجة</TableCell>
                    <TableCell>الفئة</TableCell>
                    <TableCell>المنطقة</TableCell>
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
                          <Typography variant="body2">{item.searchDate}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.searchTerm}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="subtitle2" fontWeight="bold">
                            {item.searchCount.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" color="success.main">
                            {item.successfulSearches.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" color="warning.main">
                            {item.noResultsCount.toLocaleString()}
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
                            <SpeedIcon sx={{ mr: 0.5, fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">{item.avgSearchTime}ث</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{item.topResults}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={item.searchCategory} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Chip label={item.region} size="small" variant="outlined" />
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

      {/* أقسام التحليل */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="h6">عمليات تحليل البحث</Typography>
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
                      <SearchIcon sx={{ mr: 1, color: 'primary.main' }} />
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
                  <SearchIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
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

      {/* Dialog إنشاء تقرير جديد */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">إنشاء تقرير بحث جديد</Typography>
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
                label="كلمة البحث"
                size="small"
                placeholder="أدخل كلمة البحث..."
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="تاريخ البحث"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="عدد عمليات البحث"
                type="number"
                size="small"
                placeholder="0"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البحث الناجح"
                type="number"
                size="small"
                placeholder="0"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الفئة</InputLabel>
                <Select label="الفئة">
                  <MenuItem value="إلكترونيات">إلكترونيات</MenuItem>
                  <MenuItem value="ملابس">ملابس</MenuItem>
                  <MenuItem value="أجهزة منزلية">أجهزة منزلية</MenuItem>
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
              notify('إنشاء تقرير بحث جديد', 'تم إنشاء التقرير بنجاح');
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
            <Typography variant="h6">تفاصيل تقرير البحث</Typography>
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
                  كلمة البحث
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {selectedReport.searchTerm}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  تاريخ البحث
                </Typography>
                <Typography variant="body1">{selectedReport.searchDate}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  عدد عمليات البحث
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {selectedReport.searchCount.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  البحث الناجح
                </Typography>
                <Typography variant="body1" color="success.main">
                  {selectedReport.successfulSearches.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  بدون نتائج
                </Typography>
                <Typography variant="body1" color="warning.main">
                  {selectedReport.noResultsCount.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  متوسط وقت البحث
                </Typography>
                <Typography variant="body1">{selectedReport.avgSearchTime} ثانية</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  أفضل نتيجة
                </Typography>
                <Typography variant="body1">{selectedReport.topResults}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الفئة
                </Typography>
                <Chip label={selectedReport.searchCategory} size="small" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  المنطقة
                </Typography>
                <Chip label={selectedReport.region} size="small" />
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
            <Typography variant="h6">تعديل تقرير البحث</Typography>
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
                  label="كلمة البحث"
                  value={selectedReport.searchTerm}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="تاريخ البحث"
                  type="date"
                  value={selectedReport.searchDate}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="عدد عمليات البحث"
                  type="number"
                  value={selectedReport.searchCount}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="البحث الناجح"
                  type="number"
                  value={selectedReport.successfulSearches}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="بدون نتائج"
                  type="number"
                  value={selectedReport.noResultsCount}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="متوسط وقت البحث"
                  type="number"
                  value={selectedReport.avgSearchTime}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="أفضل نتيجة"
                  value={selectedReport.topResults}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>الفئة</InputLabel>
                  <Select value={selectedReport.searchCategory} label="الفئة">
                    <MenuItem value="إلكترونيات">إلكترونيات</MenuItem>
                    <MenuItem value="ملابس">ملابس</MenuItem>
                    <MenuItem value="أجهزة منزلية">أجهزة منزلية</MenuItem>
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
              notify('تحديث تقرير البحث', 'تم تحديث التقرير بنجاح');
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

export default SearchReports;
