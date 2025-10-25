import React, { useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
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
  Divider,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Slider,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  VisibilityOutlined,
  EditOutlined,
  DeleteOutline,
  Search as SearchIcon,
  Campaign as CampaignIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
  Analytics as AnalyticsIcon,
  Schedule as ScheduleIcon,
  Percent as PercentIcon,
  AutoAwesome as AutoAwesomeIcon,
  Timer as TimerIcon,
  QrCode as QrCodeIcon,
  ContentCopy as ContentCopyIcon,
  Star as StarIcon,
  Diamond as DiamondIcon,
  EmojiEvents as EmojiEventsIcon,
  Group as GroupIcon,
  Email as EmailIcon,
  Sms as SmsIcon,
  Notifications as NotificationsIcon,
  Share as ShareIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
} from '@mui/icons-material';

const Marketing = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('campaignId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDrawer, setViewDrawer] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState(false);

  const campaignsData = [
    {
      id: 1,
      campaignId: 'CAMP-001',
      name: 'عرض الصيف الكبير',
      description: 'خصم 30% على جميع المنتجات الصيفية',
      type: 'discount',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      budget: 50000,
      spent: 25000,
      targetAudience: 'all',
      channels: ['email', 'sms', 'push'],
      metrics: {
        impressions: 150000,
        clicks: 15000,
        conversions: 1500,
        revenue: 75000,
        roi: 200,
      },
      createdDate: '2023-12-15',
      lastModified: '2024-01-10',
      priority: 'high',
      tags: ['صيف', 'خصم', 'موسمي'],
    },
    {
      id: 2,
      campaignId: 'CAMP-002',
      name: 'برنامج الولاء الجديد',
      description: 'نقاط إضافية لكل عملية شراء',
      type: 'loyalty',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      budget: 30000,
      spent: 12000,
      targetAudience: 'existing_customers',
      channels: ['email', 'app'],
      metrics: {
        impressions: 80000,
        clicks: 8000,
        conversions: 800,
        revenue: 40000,
        roi: 233,
      },
      createdDate: '2024-01-01',
      lastModified: '2024-01-15',
      priority: 'medium',
      tags: ['ولاء', 'نقاط', 'عملاء'],
    },
    {
      id: 3,
      campaignId: 'CAMP-003',
      name: 'إطلاق منتج جديد',
      description: 'حملة تسويقية لإطلاق منتج جديد',
      type: 'product_launch',
      status: 'scheduled',
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      budget: 75000,
      spent: 0,
      targetAudience: 'all',
      channels: ['email', 'sms', 'social'],
      metrics: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
        roi: 0,
      },
      createdDate: '2024-01-20',
      lastModified: '2024-01-20',
      priority: 'high',
      tags: ['إطلاق', 'منتج', 'جديد'],
    },
    {
      id: 4,
      campaignId: 'CAMP-004',
      name: 'عرض نهاية الأسبوع',
      description: 'خصم 20% في عطلة نهاية الأسبوع',
      type: 'promotion',
      status: 'completed',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      budget: 20000,
      spent: 20000,
      targetAudience: 'all',
      channels: ['email', 'sms'],
      metrics: {
        impressions: 100000,
        clicks: 10000,
        conversions: 1000,
        revenue: 50000,
        roi: 250,
      },
      createdDate: '2023-11-15',
      lastModified: '2023-12-31',
      priority: 'low',
      tags: ['نهاية الأسبوع', 'خصم', 'محدود'],
    },
  ];

  const campaignStats = [
    {
      title: 'إجمالي الحملات',
      value: campaignsData.length.toString(),
      color: 'primary',
      icon: CampaignIcon,
      change: '+15%',
      description: 'زيادة في عدد الحملات',
    },
    {
      title: 'الحملات النشطة',
      value: campaignsData.filter((c) => c.status === 'active').length.toString(),
      color: 'success',
      icon: CheckCircleIcon,
      change: '2 نشطة',
      description: 'الحملات قيد التشغيل',
    },
    {
      title: 'إجمالي الميزانية',
      value: campaignsData.reduce((sum, c) => sum + c.budget, 0).toLocaleString(),
      color: 'info',
      icon: AttachMoneyIcon,
      change: '175,000 ريال',
      description: 'الميزانية المخصصة للحملات',
    },
    {
      title: 'متوسط العائد على الاستثمار',
      value: Math.round(
        campaignsData.reduce((sum, c) => sum + c.metrics.roi, 0) / campaignsData.length,
      ).toString(),
      color: 'warning',
      icon: TrendingUpIcon,
      change: '221%',
      description: 'نسبة العائد على الاستثمار',
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({ open: true, message: 'تم تحديث الحملات التسويقية بنجاح', severity: 'success' });
    }, 1000);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(campaignsData.map((c) => c.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleView = (campaign) => {
    setSelectedCampaign(campaign);
    setViewDrawer(true);
  };

  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
    setOpenDialog(true);
  };

  const handleDelete = (campaign) => {
    setSnackbar({
      open: true,
      message: `تم حذف الحملة ${campaign.name} بنجاح`,
      severity: 'success',
    });
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const filteredData = campaignsData.filter((campaign) => {
    const matchesSearch =
      campaign.campaignId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesType = typeFilter === 'all' || campaign.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'scheduled':
        return 'info';
      case 'paused':
        return 'warning';
      case 'completed':
        return 'default';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'discount':
        return 'error';
      case 'loyalty':
        return 'warning';
      case 'product_launch':
        return 'info';
      case 'promotion':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'scheduled':
        return 'مجدول';
      case 'paused':
        return 'متوقف';
      case 'completed':
        return 'مكتمل';
      case 'cancelled':
        return 'ملغي';
      default:
        return status;
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'discount':
        return 'خصم';
      case 'loyalty':
        return 'ولاء';
      case 'product_launch':
        return 'إطلاق منتج';
      case 'promotion':
        return 'ترويج';
      default:
        return type;
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return 'عالي';
      case 'medium':
        return 'متوسط';
      case 'low':
        return 'منخفض';
      default:
        return priority;
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'email':
        return <EmailIcon />;
      case 'sms':
        return <SmsIcon />;
      case 'push':
        return <NotificationsIcon />;
      case 'social':
        return <ShareIcon />;
      case 'app':
        return <CampaignIcon />;
      default:
        return <CampaignIcon />;
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              إدارة الحملات التسويقية
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة وتتبع الحملات التسويقية والإعلانية
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
              <Link color="inherit" href="/main-store/pricing">
                التسعير
              </Link>
              <Typography color="text.primary">الحملات التسويقية</Typography>
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
              إضافة حملة جديدة
            </Button>
          </Stack>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {campaignStats.map((stat, index) => {
            const IconComponent = stat.icon;
            const color = stat.color;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette[color].main,
                      0.08,
                    )} 0%, ${alpha(theme.palette[color].main, 0.04)} 100%)`,
                    border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 25px ${alpha(theme.palette[color].main, 0.15)}`,
                    },
                  }}
                >
                  <CardContent>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: alpha(theme.palette[color].main, 0.1),
                        color: theme.palette[color].main,
                      }}
                    >
                      <IconComponent />
                    </Avatar>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 600, color: theme.palette[color].main, mb: 1 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette[color].main, mb: 1 }}>
                      {stat.change}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', display: 'block' }}
                    >
                      {stat.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Filters Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            البحث والتصفية
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FilterListIcon />}
              onClick={() => setAdvancedFilters(!advancedFilters)}
            >
              {advancedFilters ? 'إخفاء المرشحات المتقدمة' : 'مرشحات متقدمة'}
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
            >
              مسح المرشحات
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="البحث في الحملات"
              size="small"
              placeholder="البحث بالمعرف أو اسم الحملة أو الوصف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الحالة</InputLabel>
              <Select
                label="الحالة"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                <MenuItem value="active">نشط</MenuItem>
                <MenuItem value="scheduled">مجدول</MenuItem>
                <MenuItem value="paused">متوقف</MenuItem>
                <MenuItem value="completed">مكتمل</MenuItem>
                <MenuItem value="cancelled">ملغي</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>النوع</InputLabel>
              <Select
                label="النوع"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="all">جميع الأنواع</MenuItem>
                <MenuItem value="discount">خصم</MenuItem>
                <MenuItem value="loyalty">ولاء</MenuItem>
                <MenuItem value="product_launch">إطلاق منتج</MenuItem>
                <MenuItem value="promotion">ترويج</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {filteredData.length} نتيجة
            </Typography>
          </Grid>
        </Grid>

        {/* Advanced Filters */}
        {advancedFilters && (
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              مرشحات متقدمة
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="تاريخ البداية من"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="تاريخ البداية إلى"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="الحد الأدنى للميزانية"
                  type="number"
                  size="small"
                  placeholder="مثال: 10000"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="الحد الأقصى للميزانية"
                  type="number"
                  size="small"
                  placeholder="مثال: 100000"
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Data Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {loading && <LinearProgress />}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedItems.length > 0 && selectedItems.length < campaignsData.length
                  }
                  checked={
                    campaignsData.length > 0 && selectedItems.length === campaignsData.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'campaignId'}
                  direction={sortBy === 'campaignId' ? sortOrder : 'asc'}
                  onClick={() => handleSort('campaignId')}
                >
                  معرف الحملة
                </TableSortLabel>
              </TableCell>
              <TableCell>اسم الحملة</TableCell>
              <TableCell>النوع</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell>الميزانية</TableCell>
              <TableCell>الأولوية</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                تاريخ البداية
              </TableCell>
              <TableCell align="center">الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((campaign) => (
                <TableRow key={campaign.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(campaign.id)}
                      onChange={() => handleSelectItem(campaign.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {campaign.campaignId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {campaign.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {campaign.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getTypeText(campaign.type)}
                      color={getTypeColor(campaign.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(campaign.status)}
                      color={getStatusColor(campaign.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
                      {campaign.budget.toLocaleString()} ريال
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      أنفق: {campaign.spent.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getPriorityText(campaign.priority)}
                      color={getPriorityColor(campaign.priority)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {campaign.startDate}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="عرض التفاصيل" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleView(campaign)}
                          aria-label="عرض الحملة"
                        >
                          <VisibilityOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="تعديل الحملة" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(campaign)}
                          aria-label="تعديل الحملة"
                        >
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف الحملة" arrow>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(campaign)}
                          aria-label="حذف الحملة"
                        >
                          <DeleteOutline />
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
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCampaign ? 'تعديل الحملة التسويقية' : 'إضافة حملة تسويقية جديدة'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="معرف الحملة"
                value={selectedCampaign?.campaignId || ''}
                size="small"
                disabled
                helperText="يتم إنشاء المعرف تلقائياً"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>النوع</InputLabel>
                <Select value={selectedCampaign?.type || 'discount'} label="النوع">
                  <MenuItem value="discount">خصم</MenuItem>
                  <MenuItem value="loyalty">ولاء</MenuItem>
                  <MenuItem value="product_launch">إطلاق منتج</MenuItem>
                  <MenuItem value="promotion">ترويج</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="اسم الحملة"
                value={selectedCampaign?.name || ''}
                size="small"
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="وصف الحملة"
                multiline
                rows={3}
                value={selectedCampaign?.description || ''}
                size="small"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="تاريخ البداية"
                type="date"
                value={selectedCampaign?.startDate || ''}
                size="small"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="تاريخ النهاية"
                type="date"
                value={selectedCampaign?.endDate || ''}
                size="small"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الميزانية"
                type="number"
                value={selectedCampaign?.budget || ''}
                size="small"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الأولوية</InputLabel>
                <Select value={selectedCampaign?.priority || 'medium'} label="الأولوية">
                  <MenuItem value="high">عالي</MenuItem>
                  <MenuItem value="medium">متوسط</MenuItem>
                  <MenuItem value="low">منخفض</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الجمهور المستهدف</InputLabel>
                <Select value={selectedCampaign?.targetAudience || 'all'} label="الجمهور المستهدف">
                  <MenuItem value="all">جميع العملاء</MenuItem>
                  <MenuItem value="existing_customers">العملاء الحاليين</MenuItem>
                  <MenuItem value="new_customers">العملاء الجدد</MenuItem>
                  <MenuItem value="vip_customers">العملاء المميزين</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الحالة</InputLabel>
                <Select value={selectedCampaign?.status || 'scheduled'} label="الحالة">
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="scheduled">مجدول</MenuItem>
                  <MenuItem value="paused">متوقف</MenuItem>
                  <MenuItem value="completed">مكتمل</MenuItem>
                  <MenuItem value="cancelled">ملغي</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth size="small">
                <InputLabel>قنوات التسويق</InputLabel>
                <Select
                  multiple
                  value={selectedCampaign?.channels || []}
                  label="قنوات التسويق"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="email">البريد الإلكتروني</MenuItem>
                  <MenuItem value="sms">الرسائل النصية</MenuItem>
                  <MenuItem value="push">الإشعارات</MenuItem>
                  <MenuItem value="social">وسائل التواصل</MenuItem>
                  <MenuItem value="app">التطبيق</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="العلامات (Tags)"
                placeholder="أدخل العلامات مفصولة بفاصلة"
                value={selectedCampaign?.tags?.join(', ') || ''}
                size="small"
                helperText="مثال: صيف، خصم، موسمي"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel control={<Switch defaultChecked />} label="تفعيل التتبع التلقائي" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={() => {
              setSnackbar({
                open: true,
                message: 'تم حفظ الحملة التسويقية بنجاح',
                severity: 'success',
              });
              setOpenDialog(false);
            }}
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewDrawer} onClose={() => setViewDrawer(false)} maxWidth="md" fullWidth>
        <DialogTitle>تفاصيل الحملة التسويقية</DialogTitle>
        <DialogContent>
          {selectedCampaign && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  معرف الحملة
                </Typography>
                <Typography variant="body1">{selectedCampaign.campaignId}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  النوع
                </Typography>
                <Chip
                  label={getTypeText(selectedCampaign.type)}
                  color={getTypeColor(selectedCampaign.type)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  اسم الحملة
                </Typography>
                <Typography variant="body1">{selectedCampaign.name}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  وصف الحملة
                </Typography>
                <Typography variant="body1">{selectedCampaign.description}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الحالة
                </Typography>
                <Chip
                  label={getStatusText(selectedCampaign.status)}
                  color={getStatusColor(selectedCampaign.status)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الأولوية
                </Typography>
                <Chip
                  label={getPriorityText(selectedCampaign.priority)}
                  color={getPriorityColor(selectedCampaign.priority)}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  تاريخ البداية
                </Typography>
                <Typography variant="body1">{selectedCampaign.startDate}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  تاريخ النهاية
                </Typography>
                <Typography variant="body1">{selectedCampaign.endDate}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الميزانية
                </Typography>
                <Typography variant="body1" color="primary.main" sx={{ fontWeight: 500 }}>
                  {selectedCampaign.budget.toLocaleString()} ريال
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  المبلغ المنفق
                </Typography>
                <Typography variant="body1" color="success.main" sx={{ fontWeight: 500 }}>
                  {selectedCampaign.spent.toLocaleString()} ريال
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الجمهور المستهدف
                </Typography>
                <Typography variant="body1">{selectedCampaign.targetAudience}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  قنوات التسويق
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  {selectedCampaign.channels.map((channel, index) => (
                    <Chip
                      key={index}
                      label={channel}
                      size="small"
                      color="primary"
                      variant="outlined"
                      icon={getChannelIcon(channel)}
                    />
                  ))}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  العلامات
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  {selectedCampaign.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  إحصائيات الحملة
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  عدد المشاهدات
                </Typography>
                <Typography variant="body1">
                  {selectedCampaign.metrics.impressions.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  عدد النقرات
                </Typography>
                <Typography variant="body1">
                  {selectedCampaign.metrics.clicks.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  عدد التحويلات
                </Typography>
                <Typography variant="body1">
                  {selectedCampaign.metrics.conversions.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الإيرادات
                </Typography>
                <Typography variant="body1" color="success.main" sx={{ fontWeight: 500 }}>
                  {selectedCampaign.metrics.revenue.toLocaleString()} ريال
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  العائد على الاستثمار
                </Typography>
                <Typography variant="body1" color="primary.main" sx={{ fontWeight: 500 }}>
                  {selectedCampaign.metrics.roi}%
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  تاريخ الإنشاء
                </Typography>
                <Typography variant="body1">{selectedCampaign.createdDate}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  آخر تعديل
                </Typography>
                <Typography variant="body1">{selectedCampaign.lastModified}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDrawer(false)}>إغلاق</Button>
          <Button variant="contained" onClick={() => handleEdit(selectedCampaign)}>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Marketing;
