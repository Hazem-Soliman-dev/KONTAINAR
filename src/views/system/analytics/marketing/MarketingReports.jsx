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
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Campaign as CampaignIcon,
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
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
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
    title: 'تقارير التسويق',
  },
];

const MarketingReports = () => {
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
  const [sortBy, setSortBy] = useState('campaignDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // بيانات وهمية شاملة ومحسنة لتقارير التسويق
  const marketingData = [
    {
      id: 1,
      campaignDate: '2024-01-15',
      campaignName: 'حملة الهواتف الذكية',
      campaignType: 'إعلانات مدفوعة',
      budget: 50000,
      spent: 45000,
      impressions: 125000,
      clicks: 8500,
      conversions: 425,
      ctr: 6.8,
      cpc: 5.3,
      cpa: 105.9,
      roi: 320,
      status: 'نشط',
      priority: 'عالي',
      channel: 'فيسبوك',
      targetAudience: 'شباب 18-35',
      region: 'الرياض',
      manager: 'أحمد محمد',
      notes: 'أداء ممتاز للحملة',
    },
    {
      id: 2,
      campaignDate: '2024-01-14',
      campaignName: 'حملة الأزياء الشتوية',
      campaignType: 'إعلانات مدفوعة',
      budget: 30000,
      spent: 28000,
      impressions: 95000,
      clicks: 6200,
      conversions: 310,
      ctr: 6.5,
      cpc: 4.5,
      cpa: 90.3,
      roi: 280,
      status: 'نشط',
      priority: 'متوسط',
      channel: 'إنستغرام',
      targetAudience: 'نساء 25-45',
      region: 'جدة',
      manager: 'فاطمة أحمد',
      notes: 'زيادة في التفاعل',
    },
    {
      id: 3,
      campaignDate: '2024-01-13',
      campaignName: 'حملة الأجهزة المنزلية',
      campaignType: 'إعلانات مدفوعة',
      budget: 40000,
      spent: 35000,
      impressions: 110000,
      clicks: 7200,
      conversions: 360,
      ctr: 6.5,
      cpc: 4.9,
      cpa: 97.2,
      roi: 290,
      status: 'نشط',
      priority: 'عالي',
      channel: 'جوجل',
      targetAudience: 'عائلات 30-50',
      region: 'الدمام',
      manager: 'محمد علي',
      notes: 'أداء جيد في التحويل',
    },
    {
      id: 4,
      campaignDate: '2024-01-12',
      campaignName: 'حملة الإلكترونيات',
      campaignType: 'إعلانات مدفوعة',
      budget: 60000,
      spent: 55000,
      impressions: 150000,
      clicks: 12000,
      conversions: 600,
      ctr: 8.0,
      cpc: 4.6,
      cpa: 91.7,
      roi: 350,
      status: 'مكتمل',
      priority: 'عالي',
      channel: 'تويتر',
      targetAudience: 'محترفين 25-40',
      region: 'الرياض',
      manager: 'سارة خالد',
      notes: 'أفضل حملة هذا الشهر',
    },
    {
      id: 5,
      campaignDate: '2024-01-11',
      campaignName: 'حملة الرياضة',
      campaignType: 'إعلانات مدفوعة',
      budget: 25000,
      spent: 22000,
      impressions: 80000,
      clicks: 4800,
      conversions: 240,
      ctr: 6.0,
      cpc: 4.6,
      cpa: 91.7,
      roi: 250,
      status: 'معلق',
      priority: 'منخفض',
      channel: 'سناب شات',
      targetAudience: 'رياضيين 18-30',
      region: 'جدة',
      manager: 'عبدالله سعد',
      notes: 'يحتاج تحسين في الاستهداف',
    },
  ];

  const reportTypes = ['يومي', 'أسبوعي', 'شهري', 'ربعي', 'سنوي'];
  const statusOptions = ['نشط', 'مكتمل', 'معلق', 'معطل', 'قيد المراجعة'];
  const priorityOptions = ['عالي', 'متوسط', 'منخفض'];
  const regionOptions = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'];
  const channelOptions = ['فيسبوك', 'إنستغرام', 'جوجل', 'تويتر', 'سناب شات', 'تيك توك'];
  const campaignTypeOptions = ['إعلانات مدفوعة', 'محتوى عضوي', 'إيميل ماركتنج', 'SMS', 'تأثيرين'];

  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'تحليل أداء الحملات',
      content: 'تحليل وتقييم أداء الحملات التسويقية المختلفة.',
      isExpanded: true,
    },
    {
      id: 2,
      title: 'تحسين الاستهداف',
      content: 'تحسين استهداف الجمهور لزيادة فعالية الحملات.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'تتبع التحويلات',
      content: 'تتبع وتحليل معدلات التحويل والعائد على الاستثمار.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'تحليل المنافسين',
      content: 'تحليل استراتيجيات المنافسين وتحديد الفرص.',
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
    notify('تصدير تقرير التسويق', 'تم تصدير تقرير التسويق بنجاح');
  }, [notify]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      notify('تحديث البيانات', 'تم تحديث بيانات التسويق بنجاح');
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
        setSelectedItems(marketingData.map((item) => item.id));
      } else {
        setSelectedItems([]);
      }
    },
    [marketingData],
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
      notify('حذف تقرير التسويق', `تم حذف تقرير التسويق ${report.campaignName} بنجاح`);
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
    return marketingData.filter((item) => {
      const matchesSearch =
        item.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.channel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.manager.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        reportType === 'all' || item.campaignDate.includes(reportType.toLowerCase());
      return matchesSearch && matchesType;
    });
  }, [marketingData, searchTerm, reportType]);

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

  const totalBudget = useMemo(
    () => marketingData.reduce((sum, item) => sum + item.budget, 0),
    [marketingData],
  );

  const totalSpent = useMemo(
    () => marketingData.reduce((sum, item) => sum + item.spent, 0),
    [marketingData],
  );

  const totalConversions = useMemo(
    () => marketingData.reduce((sum, item) => sum + item.conversions, 0),
    [marketingData],
  );

  const avgROI = useMemo(
    () => marketingData.reduce((sum, item) => sum + item.roi, 0) / marketingData.length,
    [marketingData],
  );

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'نشط':
        return 'success';
      case 'مكتمل':
        return 'info';
      case 'معلق':
        return 'warning';
      case 'معطل':
        return 'error';
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
    <PageContainer
      title="تقارير التسويق"
      description="تحليل أداء الحملات التسويقية ومؤشرات التسويق الرقمي"
    >
      <Breadcrumb title="تقارير التسويق" items={BCrumb} />

      <Box>
        {/* Enhanced Stats Cards */}
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12 }}>
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
                  حملة جديدة
                </Button>
              </Stack>
            </Box>
          </Grid>
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
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  width="180px"
                  height="90px"
                  margin="auto"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    width="60px"
                    height="60px"
                    margin="auto"
                    flexDirection="column"
                    justifyContent="center"
                    mb={2}
                  >
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                      }}
                    >
                      <CampaignIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {marketingData.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      الحملات النشطة
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
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  width="180px"
                  height="90px"
                  margin="auto"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    width="60px"
                    height="60px"
                    margin="auto"
                    flexDirection="column"
                    justifyContent="center"
                    mb={2}
                  >
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        color: theme.palette.success.main,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                      }}
                    >
                      <AttachMoneyIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      ${totalSpent.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      إجمالي الإنفاق
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
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  width="180px"
                  height="90px"
                  margin="auto"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    width="60px"
                    height="60px"
                    margin="auto"
                    flexDirection="column"
                    justifyContent="center"
                    mb={2}
                  >
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                        color: theme.palette.warning.main,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                      }}
                    >
                      <PeopleIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {totalConversions.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      إجمالي التحويلات
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
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  width="180px"
                  height="90px"
                  margin="auto"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    width="60px"
                    height="60px"
                    margin="auto"
                    flexDirection="column"
                    justifyContent="center"
                    mb={2}
                  >
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.secondary.main, 0.1),
                        color: theme.palette.secondary.main,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                      }}
                    >
                      <AnalyticsIcon />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {avgROI.toFixed(0)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      متوسط العائد على الاستثمار
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

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
                label="البحث في الحملات"
                size="small"
                placeholder="البحث بالاسم أو القناة أو المدير..."
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
                تم العثور على {filteredData.length} حملة
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* المحتوى المحسن */}
        <Paper>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              تفاصيل أداء الحملات التسويقية
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
                <Alert severity="error">خطأ في تحميل بيانات التسويق. يرجى المحاولة مرة أخرى.</Alert>
              </Box>
            ) : filteredData.length === 0 ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Alert severity="info">لم يتم العثور على حملات تسويقية للفترة المحددة.</Alert>
              </Box>
            ) : (
              <>
                <TableContainer sx={{ overflowX: 'auto' }}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <TableSortLabel
                            active={sortBy === 'campaignDate'}
                            direction={sortBy === 'campaignDate' ? sortOrder : 'asc'}
                            onClick={() => handleSort('campaignDate')}
                          >
                            تاريخ الحملة
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>اسم الحملة</TableCell>
                        <TableCell>نوع الحملة</TableCell>
                        <TableCell align="right">الميزانية</TableCell>
                        <TableCell align="right">الإنفاق</TableCell>
                        <TableCell align="right">التحويلات</TableCell>
                        <TableCell align="right">CTR</TableCell>
                        <TableCell align="right">CPC</TableCell>
                        <TableCell align="right">ROI</TableCell>
                        <TableCell>القناة</TableCell>
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
                              <Typography variant="body2">{item.campaignDate}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {item.campaignName}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip label={item.campaignType} size="small" variant="outlined" />
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="subtitle2" fontWeight="bold">
                                ${item.budget.toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" color="primary.main">
                                ${item.spent.toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" color="success.main">
                                {item.conversions.toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2">{item.ctr}%</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2">${item.cpc}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'flex-end',
                                }}
                              >
                                {item.roi >= 300 ? (
                                  <TrendingUpIcon color="success" sx={{ mr: 0.5, fontSize: 16 }} />
                                ) : (
                                  <TrendingDownIcon color="error" sx={{ mr: 0.5, fontSize: 16 }} />
                                )}
                                <Typography
                                  variant="body2"
                                  color={item.roi >= 300 ? 'success.main' : 'error.main'}
                                >
                                  {item.roi}%
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip label={item.channel} size="small" variant="outlined" />
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
                  <Typography variant="h6">عمليات تحليل التسويق</Typography>
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
                        <CampaignIcon sx={{ mr: 1, color: 'primary.main' }} />
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
                    <CampaignIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
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

        {/* Dialog إنشاء حملة جديدة */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">إنشاء حملة تسويقية جديدة</Typography>
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
                  label="اسم الحملة"
                  size="small"
                  placeholder="أدخل اسم الحملة..."
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="تاريخ الحملة"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>نوع الحملة</InputLabel>
                  <Select label="نوع الحملة">
                    {campaignTypeOptions.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="الميزانية" type="number" size="small" placeholder="0" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>القناة</InputLabel>
                  <Select label="القناة">
                    {channelOptions.map((channel) => (
                      <MenuItem key={channel} value={channel}>
                        {channel}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="الجمهور المستهدف"
                  size="small"
                  placeholder="وصف الجمهور المستهدف..."
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
                <TextField
                  fullWidth
                  label="المدير المسؤول"
                  size="small"
                  placeholder="اسم المدير المسؤول"
                />
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
                notify('إنشاء حملة جديدة', 'تم إنشاء الحملة بنجاح');
                setOpenDialog(false);
              }}
            >
              حفظ الحملة
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
              <Typography variant="h6">تفاصيل الحملة التسويقية</Typography>
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
                    اسم الحملة
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedReport.campaignName}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    تاريخ الحملة
                  </Typography>
                  <Typography variant="body1">{selectedReport.campaignDate}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    نوع الحملة
                  </Typography>
                  <Chip label={selectedReport.campaignType} size="small" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    الميزانية
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    ${selectedReport.budget.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    الإنفاق
                  </Typography>
                  <Typography variant="body1" color="primary.main">
                    ${selectedReport.spent.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    التحويلات
                  </Typography>
                  <Typography variant="body1" color="success.main">
                    {selectedReport.conversions.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    CTR
                  </Typography>
                  <Typography variant="body1">{selectedReport.ctr}%</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    CPC
                  </Typography>
                  <Typography variant="body1">${selectedReport.cpc}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    ROI
                  </Typography>
                  <Typography
                    variant="body1"
                    color={selectedReport.roi >= 300 ? 'success.main' : 'error.main'}
                  >
                    {selectedReport.roi}%
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    القناة
                  </Typography>
                  <Chip label={selectedReport.channel} size="small" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    الجمهور المستهدف
                  </Typography>
                  <Typography variant="body1">{selectedReport.targetAudience}</Typography>
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

        {/* Dialog تعديل الحملة */}
        <Dialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">تعديل الحملة التسويقية</Typography>
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
                    label="اسم الحملة"
                    value={selectedReport.campaignName}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="تاريخ الحملة"
                    type="date"
                    value={selectedReport.campaignDate}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>نوع الحملة</InputLabel>
                    <Select value={selectedReport.campaignType} label="نوع الحملة">
                      {campaignTypeOptions.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="الميزانية"
                    type="number"
                    value={selectedReport.budget}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="الإنفاق"
                    type="number"
                    value={selectedReport.spent}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="التحويلات"
                    type="number"
                    value={selectedReport.conversions}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>القناة</InputLabel>
                    <Select value={selectedReport.channel} label="القناة">
                      {channelOptions.map((channel) => (
                        <MenuItem key={channel} value={channel}>
                          {channel}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="الجمهور المستهدف"
                    value={selectedReport.targetAudience}
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
                notify('تحديث الحملة', 'تم تحديث الحملة بنجاح');
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

export default MarketingReports;
