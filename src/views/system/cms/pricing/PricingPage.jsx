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
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  Avatar,
  Stack,
  Zoom,
  LinearProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  AttachMoney as AttachMoneyIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Diamond as DiamondIcon,
  EmojiEvents as EmojiEventsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const PricingPage = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Stats data
  const pricingStats = [
    {
      title: 'إجمالي الخطط',
      value: '8',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: AttachMoneyIcon,
      change: '+2',
    },
    {
      title: 'الخطط النشطة',
      value: '6',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: CheckCircleIcon,
      change: '75%',
    },
    {
      title: 'المشتركين',
      value: '1,250',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: TrendingUpIcon,
      change: '+18%',
    },
    {
      title: 'الإيرادات الشهرية',
      value: '45,000 ريال',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: EmojiEventsIcon,
      change: '+12%',
    },
  ];

  // Mock data for pricing plans
  const pricingData = [
    {
      id: 1,
      name: 'الخطة الأساسية',
      description: 'مناسبة للشركات الصغيرة والمشاريع الناشئة',
      price: 99,
      currency: 'ريال',
      period: 'شهري',
      features: ['حتى 5 منتجات', '1 مستخدم', 'دعم فني أساسي', 'تقارير أساسية', 'تخزين 1 جيجا'],
      limitations: ['لا يوجد دعم متقدم', 'تقارير محدودة'],
      isPopular: false,
      isRecommended: false,
      status: 'active',
      subscribers: 450,
      revenue: 44550,
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-20',
    },
    {
      id: 2,
      name: 'الخطة المتقدمة',
      description: 'مناسبة للشركات المتوسطة والنمو السريع',
      price: 199,
      currency: 'ريال',
      period: 'شهري',
      features: [
        'حتى 50 منتج',
        '5 مستخدمين',
        'دعم فني متقدم',
        'تقارير تفصيلية',
        'تخزين 10 جيجا',
        'تكامل مع أنظمة خارجية',
        'نسخ احتياطي يومي',
      ],
      limitations: ['لا يوجد دعم 24/7'],
      isPopular: true,
      isRecommended: true,
      status: 'active',
      subscribers: 680,
      revenue: 135320,
      createdAt: '2024-01-14',
      lastUpdated: '2024-01-19',
    },
    {
      id: 3,
      name: 'الخطة المؤسسية',
      description: 'مناسبة للشركات الكبيرة والمؤسسات',
      price: 499,
      currency: 'ريال',
      period: 'شهري',
      features: [
        'منتجات غير محدودة',
        'مستخدمين غير محدودين',
        'دعم فني 24/7',
        'تقارير متقدمة',
        'تخزين غير محدود',
        'تكامل متقدم',
        'نسخ احتياطي فوري',
        'أمان متقدم',
        'إدارة متعددة المستويات',
      ],
      limitations: [],
      isPopular: false,
      isRecommended: false,
      status: 'active',
      subscribers: 120,
      revenue: 59880,
      createdAt: '2024-01-13',
      lastUpdated: '2024-01-18',
    },
  ];

  const planTypes = [
    { value: 'basic', label: 'أساسية', icon: PersonIcon, color: 'default' },
    { value: 'advanced', label: 'متقدمة', icon: BusinessIcon, color: 'primary' },
    { value: 'enterprise', label: 'مؤسسية', icon: DiamondIcon, color: 'secondary' },
    { value: 'custom', label: 'مخصصة', icon: SettingsIcon, color: 'info' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbar({ open: true, message: 'تم تحديث البيانات بنجاح', severity: 'success' });
    }, 1000);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const [formData, setFormData] = useState({
    title: 'خطط الأسعار',
    content: '',
    isActive: true,
    language: 'ar',
    lastUpdated: new Date().toISOString().split('T')[0],
    showFeatures: true,
    showLimitations: true,
    showSubscribers: true,
    showRevenue: true,
    allowComparison: true,
    showDiscounts: true,
    currency: 'ريال',
    taxIncluded: true,
    showPopular: true,
    showRecommended: true,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات الأسعار بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleAddPlan = () => {
    setOpenDialog(true);
  };

  const handleDeletePlan = (id) => {
    setSnackbar({
      open: true,
      message: 'تم حذف الخطة بنجاح',
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'draft':
        return 'warning';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'نشطة';
      case 'draft':
        return 'مسودة';
      case 'inactive':
        return 'غير نشطة';
      default:
        return 'غير محدد';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
              إدارة خطط الأسعار
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              إدارة وتخصيص خطط الأسعار والاشتراكات
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Link
                color="inherit"
                href="/main-store"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                المتجر الرئيسي
              </Link>
              <Link color="inherit" href="/main-store/cms">
                إدارة المحتوى
              </Link>
              <Typography color="text.primary">خطط الأسعار</Typography>
            </Breadcrumbs>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={isRefreshing ? null : <RefreshIcon />}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? 'جاري التحديث...' : 'تحديث'}
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={loading}
            >
              حفظ التغييرات
            </Button>
          </Stack>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {pricingStats.map((stat, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
            <Card
              sx={{
                    background: stat.color,
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                >
                  <CardContent>
                    <Box
              sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                          {stat.value}
                </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                          {stat.title}
                </Typography>
                        <Chip
                          label={stat.change}
                          size="small"
              sx={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontWeight: 600,
                          }}
                        />
                </Box>
                      <Avatar
              sx={{
                          width: 56,
                          height: 56,
                          backgroundColor: 'rgba(255,255,255,0.2)',
                        }}
                      >
                        <stat.icon sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
              </Zoom>
          </Grid>
          ))}
        </Grid>
      </Box>

      {/* Loading State */}
      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar sx={{ bgcolor: 'info.main' }}>
            <AttachMoneyIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              إعدادات الأسعار
            </Typography>
            <Typography variant="body2" color="text.secondary">
              تخصيص وإدارة خطط الأسعار
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في الخطط"
              size="small"
              placeholder="البحث في الخطط..."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الحالة</InputLabel>
              <Select value="all" label="الحالة">
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="active">نشطة</MenuItem>
                <MenuItem value="draft">مسودة</MenuItem>
                <MenuItem value="inactive">غير نشطة</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>نوع الخطة</InputLabel>
              <Select value="all" label="نوع الخطة">
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="basic">أساسية</MenuItem>
                <MenuItem value="advanced">متقدمة</MenuItem>
                <MenuItem value="enterprise">مؤسسية</MenuItem>
                <MenuItem value="custom">مخصصة</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button variant="outlined" size="small" fullWidth>
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
                >
                حفظ الإعدادات
                </Button>
                <Button
                  variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddPlan}
                size="small"
                >
                إضافة خطة
                </Button>
              </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        {/* Pricing Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات الأسعار
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="عنوان الصفحة"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    size="small"
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
                    label="الأسعار نشطة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showFeatures}
                        onChange={(e) =>
                          setFormData({ ...formData, showFeatures: e.target.checked })
                        }
                      />
                    }
                    label="عرض المميزات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showLimitations}
                        onChange={(e) =>
                          setFormData({ ...formData, showLimitations: e.target.checked })
                        }
                      />
                    }
                    label="عرض القيود"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showSubscribers}
                        onChange={(e) =>
                          setFormData({ ...formData, showSubscribers: e.target.checked })
                        }
                      />
                    }
                    label="عرض عدد المشتركين"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showRevenue}
                        onChange={(e) =>
                          setFormData({ ...formData, showRevenue: e.target.checked })
                        }
                      />
                    }
                    label="عرض الإيرادات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.allowComparison}
                        onChange={(e) =>
                          setFormData({ ...formData, allowComparison: e.target.checked })
                        }
                      />
                    }
                    label="السماح بالمقارنة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showDiscounts}
                        onChange={(e) =>
                          setFormData({ ...formData, showDiscounts: e.target.checked })
                        }
                      />
                    }
                    label="عرض الخصومات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.taxIncluded}
                        onChange={(e) =>
                          setFormData({ ...formData, taxIncluded: e.target.checked })
                        }
                      />
                    }
                    label="شامل الضريبة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showPopular}
                        onChange={(e) =>
                          setFormData({ ...formData, showPopular: e.target.checked })
                        }
                      />
                    }
                    label="عرض الأكثر شعبية"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showRecommended}
                        onChange={(e) =>
                          setFormData({ ...formData, showRecommended: e.target.checked })
                        }
                      />
                    }
                    label="عرض الموصى بها"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="العملة"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Pricing Plans */}
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
                <Typography variant="h6">قائمة الخطط</Typography>
                <Chip label={`${pricingData.length} خطة`} color="primary" size="small" />
          </Box>
              <Divider sx={{ mb: 2 }} />

            <Table>
              <TableHead>
                <TableRow>
                    <TableCell>اسم الخطة</TableCell>
                    <TableCell>السعر</TableCell>
                    <TableCell>المميزات</TableCell>
                    <TableCell>المشتركين</TableCell>
                    <TableCell>الإيرادات</TableCell>
                    <TableCell>الحالة</TableCell>
                    <TableCell align="right">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {pricingData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((plan) => (
                      <TableRow key={plan.id} hover>
                      <TableCell>
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {plan.name}
                            </Typography>
                              {plan.isPopular && (
                                <Chip label="الأكثر شعبية" size="small" color="primary" />
                              )}
                              {plan.isRecommended && (
                                <Chip label="موصى بها" size="small" color="secondary" />
                            )}
                          </Box>
                            <Typography variant="caption" color="text.secondary">
                              {plan.description}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {plan.price} {plan.currency}
                            </Typography>
                          <Typography variant="caption" color="text.secondary">
                            / {plan.period}
                            </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography variant="body2">{plan.features.length} مميزة</Typography>
                      </TableCell>
                      <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {plan.subscribers.toLocaleString()}
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {plan.revenue.toLocaleString()} {plan.currency}
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Chip
                            label={getStatusLabel(plan.status)}
                            size="small"
                            color={getStatusColor(plan.status)}
                          />
                      </TableCell>
                      <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Tooltip title="تعديل" arrow>
                              <IconButton size="small">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                            <Tooltip title="حذف" arrow>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeletePlan(plan.id)}
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
                count={pricingData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Plan Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>إضافة خطة جديدة</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="اسم الخطة"
                placeholder="الخطة الأساسية"
                helperText="اسم الخطة الذي سيظهر للعملاء"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="وصف الخطة"
                placeholder="مناسبة للشركات الصغيرة..."
                multiline
                rows={2}
                helperText="وصف مختصر للخطة"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="السعر"
                type="number"
                placeholder="99"
                helperText="السعر الشهري"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>العملة</InputLabel>
                <Select label="العملة">
                  <MenuItem value="ريال">ريال سعودي</MenuItem>
                  <MenuItem value="دولار">دولار أمريكي</MenuItem>
                  <MenuItem value="يورو">يورو</MenuItem>
                  <MenuItem value="درهم">درهم إماراتي</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>نوع الخطة</InputLabel>
                <Select label="نوع الخطة">
                  {planTypes.map((type) => (
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
                <Select label="الحالة">
                  <MenuItem value="active">نشطة</MenuItem>
                  <MenuItem value="draft">مسودة</MenuItem>
                  <MenuItem value="inactive">غير نشطة</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel control={<Switch />} label="الأكثر شعبية" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel control={<Switch />} label="موصى بها" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="المميزات"
                placeholder="حتى 5 منتجات, 1 مستخدم, دعم فني أساسي"
                multiline
                rows={3}
                helperText="افصل المميزات بفاصلة"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="القيود"
                placeholder="لا يوجد دعم متقدم, تقارير محدودة"
                multiline
                rows={2}
                helperText="افصل القيود بفاصلة"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            إضافة الخطة
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

export default PricingPage;
