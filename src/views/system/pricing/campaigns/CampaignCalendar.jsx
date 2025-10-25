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
  CalendarToday as CalendarTodayIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
  Analytics as AnalyticsIcon,
  Campaign as CampaignIcon,
  Percent as PercentIcon,
  AttachMoney as AttachMoneyIcon,
  AutoAwesome as AutoAwesomeIcon,
  Timer as TimerIcon,
  Event as EventIcon,
  EventAvailable as EventAvailableIcon,
  EventBusy as EventBusyIcon,
  Today as TodayIcon,
} from '@mui/icons-material';

const CampaignCalendar = () => {
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
  const [calendarView, setCalendarView] = useState(false);

  const campaignsData = [
    {
      id: 1,
      campaignId: 'CAMP-001',
      name: 'حملة الصيف',
      description: 'حملة تسويقية شاملة لفصل الصيف',
      type: 'email',
      status: 'active',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      budget: 50000,
      spent: 25000,
      reach: 5000,
      clicks: 850,
      conversions: 120,
      lastUpdated: '2024-01-15',
      createdDate: '2024-01-01',
      tags: ['Summer', 'Email'],
      targetAudience: 'all',
      priority: 'high',
      currency: 'SAR',
    },
    {
      id: 2,
      campaignId: 'CAMP-002',
      name: 'عرض الجمعة البيضاء',
      description: 'حملة تسويقية لحدث الجمعة البيضاء',
      type: 'sms',
      status: 'scheduled',
      startDate: '2024-11-29',
      endDate: '2024-11-30',
      budget: 30000,
      spent: 0,
      reach: 3000,
      clicks: 0,
      conversions: 0,
      lastUpdated: '2024-01-10',
      createdDate: '2024-01-05',
      tags: ['Black Friday', 'SMS'],
      targetAudience: 'electronics',
      priority: 'medium',
      currency: 'SAR',
    },
    {
      id: 3,
      campaignId: 'CAMP-003',
      name: 'عرض رأس السنة',
      description: 'حملة تسويقية للاحتفال برأس السنة',
      type: 'email',
      status: 'completed',
      startDate: '2024-01-01',
      endDate: '2024-01-07',
      budget: 20000,
      spent: 20000,
      reach: 8000,
      clicks: 1200,
      conversions: 250,
      lastUpdated: '2024-01-08',
      createdDate: '2023-12-20',
      tags: ['New Year', 'Email'],
      targetAudience: 'all',
      priority: 'high',
      currency: 'SAR',
    },
    {
      id: 4,
      campaignId: 'CAMP-004',
      name: 'حملة العملاء الجدد',
      description: 'حملة ترحيبية للعملاء الجدد',
      type: 'push',
      status: 'active',
      startDate: '2024-01-01',
      endDate: null,
      budget: 15000,
      spent: 7500,
      reach: 2000,
      clicks: 300,
      conversions: 45,
      lastUpdated: '2024-01-12',
      createdDate: '2023-12-15',
      tags: ['New Customer', 'Push'],
      targetAudience: 'new_customers',
      priority: 'medium',
      currency: 'SAR',
    },
  ];

  const campaignStats = [
    {
      title: 'إجمالي الحملات',
      value: campaignsData.length.toString(),
      color: 'primary',
      icon: CampaignIcon,
      change: '+18%',
      description: 'زيادة في عدد الحملات التسويقية',
    },
    {
      title: 'الحملات النشطة',
      value: campaignsData.filter((c) => c.status === 'active').length.toString(),
      color: 'success',
      icon: CheckCircleIcon,
      change: '2 نشطة',
      description: 'الحملات المطبقة حالياً',
    },
    {
      title: 'المجدولة',
      value: campaignsData.filter((c) => c.status === 'scheduled').length.toString(),
      color: 'warning',
      icon: ScheduleIcon,
      change: '1 مجدولة',
      description: 'الحملات المجدولة للمستقبل',
    },
    {
      title: 'إجمالي التحويلات',
      value: campaignsData.reduce((sum, c) => sum + c.conversions, 0).toString(),
      color: 'info',
      icon: TrendingUpIcon,
      change: '415 تحويل',
      description: 'عدد التحويلات من جميع الحملات',
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث تقويم الحملات بنجاح',
        severity: 'success',
      });
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
      message: `تم حذف الحملة ${campaign.campaignId} بنجاح`,
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
        return 'warning';
      case 'completed':
        return 'default';
      case 'paused':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'email':
        return 'primary';
      case 'sms':
        return 'info';
      case 'push':
        return 'secondary';
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
      case 'completed':
        return 'مكتمل';
      case 'paused':
        return 'متوقف';
      default:
        return status;
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'email':
        return 'بريد إلكتروني';
      case 'sms':
        return 'رسائل نصية';
      case 'push':
        return 'إشعارات';
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

  const getTargetAudienceText = (audience) => {
    switch (audience) {
      case 'all':
        return 'جميع العملاء';
      case 'new_customers':
        return 'العملاء الجدد';
      case 'electronics':
        return 'مشتري الإلكترونيات';
      default:
        return audience;
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
              تقويم الحملات التسويقية
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              إدارة وتنظيم الحملات التسويقية في تقويم موحد
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
              <Typography color="text.primary">تقويم الحملات</Typography>
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
              startIcon={calendarView ? <TableIcon /> : <CalendarTodayIcon />}
              onClick={() => setCalendarView(!calendarView)}
            >
              {calendarView ? 'عرض الجدول' : 'عرض التقويم'}
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
              placeholder="البحث بالمعرف أو الاسم أو الوصف..."
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
                <MenuItem value="completed">مكتمل</MenuItem>
                <MenuItem value="paused">متوقف</MenuItem>
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
                <MenuItem value="email">بريد إلكتروني</MenuItem>
                <MenuItem value="sms">رسائل نصية</MenuItem>
                <MenuItem value="push">إشعارات</MenuItem>
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
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="تاريخ البداية"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="تاريخ النهاية"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Calendar View */}
      {calendarView ? (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            عرض التقويم
          </Typography>
          <Box sx={{ height: 600, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            {/* Calendar component would go here */}
            <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
              <CalendarTodayIcon sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6">عرض التقويم</Typography>
              <Typography variant="body2">
                سيتم إضافة مكون التقويم هنا لعرض الحملات التسويقية
              </Typography>
            </Box>
          </Box>
        </Paper>
      ) : (
        /* Data Table */
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
                <TableCell>الاسم</TableCell>
                <TableCell>النوع</TableCell>
                <TableCell>الحالة</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>الميزانية</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>الوصول</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>التحويلات</TableCell>
                <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
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
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography variant="body2">
                        {campaign.spent.toLocaleString()} / {campaign.budget.toLocaleString()}{' '}
                        {campaign.currency}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {Math.round((campaign.spent / campaign.budget) * 100)}% مستخدم
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography variant="body2">{campaign.reach.toLocaleString()}</Typography>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography variant="body2" color="success.main">
                        {campaign.conversions}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
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
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedCampaign ? 'تعديل الحملة' : 'إضافة حملة جديدة'}</DialogTitle>
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
                <Select value={selectedCampaign?.type || 'email'} label="النوع">
                  <MenuItem value="email">بريد إلكتروني</MenuItem>
                  <MenuItem value="sms">رسائل نصية</MenuItem>
                  <MenuItem value="push">إشعارات</MenuItem>
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
                  <MenuItem value="new_customers">العملاء الجدد</MenuItem>
                  <MenuItem value="electronics">مشتري الإلكترونيات</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>الحالة</InputLabel>
                <Select value={selectedCampaign?.status || 'active'} label="الحالة">
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="scheduled">مجدول</MenuItem>
                  <MenuItem value="completed">مكتمل</MenuItem>
                  <MenuItem value="paused">متوقف</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="تفعيل التتبع التلقائي للحملة"
              />
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
                message: 'تم حفظ الحملة بنجاح',
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
        <DialogTitle>تفاصيل الحملة</DialogTitle>
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
                  الاسم
                </Typography>
                <Typography variant="body1">{selectedCampaign.name}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الوصف
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
                  الميزانية
                </Typography>
                <Typography variant="body1">
                  {selectedCampaign.spent.toLocaleString()} /{' '}
                  {selectedCampaign.budget.toLocaleString()} {selectedCampaign.currency}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {Math.round((selectedCampaign.spent / selectedCampaign.budget) * 100)}% مستخدم
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الجمهور المستهدف
                </Typography>
                <Typography variant="body1">
                  {getTargetAudienceText(selectedCampaign.targetAudience)}
                </Typography>
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
                <Typography variant="body1">{selectedCampaign.endDate || 'غير محدد'}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  الوصول
                </Typography>
                <Typography variant="body1">{selectedCampaign.reach.toLocaleString()}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  النقرات
                </Typography>
                <Typography variant="body1">{selectedCampaign.clicks.toLocaleString()}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  التحويلات
                </Typography>
                <Typography variant="body1" color="success.main">
                  {selectedCampaign.conversions}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  آخر تحديث
                </Typography>
                <Typography variant="body1">{selectedCampaign.lastUpdated}</Typography>
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

export default CampaignCalendar;
