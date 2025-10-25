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
  Fade,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  List,
  ListItem,
  ListItemText,
  Drawer,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  LocalOffer as LocalOfferIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

const UpcomingOffers = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Stats data
  const offersStats = [
    {
      title: 'إجمالي العروض',
      value: '156',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: LocalOfferIcon,
      change: '+12',
    },
    {
      title: 'العروض النشطة',
      value: '89',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: CheckCircleIcon,
      change: '57%',
    },
    {
      title: 'العروض القادمة',
      value: '45',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: ScheduleIcon,
      change: '+8',
    },
    {
      title: 'معدل النجاح',
      value: '94.2%',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: TrendingUpIcon,
      change: '+3.1%',
    },
  ];

  // Mock data for upcoming offers
  const offersData = [
    {
      id: 1,
      title: 'عرض الجمعة البيضاء',
      description: 'خصم يصل إلى 70% على جميع المنتجات الإلكترونية',
      category: 'إلكترونيات',
      status: 'active',
      startDate: '2024-01-25',
      endDate: '2024-01-27',
      discount: 70,
      originalPrice: 1000,
      salePrice: 300,
      currency: 'ريال',
      views: 1250,
      clicks: 89,
      conversions: 23,
      conversionRate: 25.8,
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-20',
      tags: ['خصم', 'إلكترونيات', 'جمعة بيضاء'],
      image: '/images/offer1.jpg',
      isFeatured: true,
      isUrgent: false,
    },
    {
      id: 2,
      title: 'عرض نهاية الموسم',
      description: 'تخفيضات كبيرة على الأزياء والملابس',
      category: 'أزياء',
      status: 'upcoming',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      discount: 50,
      originalPrice: 500,
      salePrice: 250,
      currency: 'ريال',
      views: 0,
      clicks: 0,
      conversions: 0,
      conversionRate: 0,
      createdAt: '2024-01-18',
      lastUpdated: '2024-01-22',
      tags: ['أزياء', 'نهاية الموسم', 'خصم'],
      image: '/images/offer2.jpg',
      isFeatured: false,
      isUrgent: true,
    },
    {
      id: 3,
      title: 'عرض العودة للمدرسة',
      description: 'خصومات على الكتب والقرطاسية',
      category: 'تعليم',
      status: 'draft',
      startDate: '2024-08-15',
      endDate: '2024-09-15',
      discount: 30,
      originalPrice: 200,
      salePrice: 140,
      currency: 'ريال',
      views: 0,
      clicks: 0,
      conversions: 0,
      conversionRate: 0,
      createdAt: '2024-01-20',
      lastUpdated: '2024-01-25',
      tags: ['تعليم', 'كتب', 'قرطاسية'],
      image: '/images/offer3.jpg',
      isFeatured: false,
      isUrgent: false,
    },
  ];

  const categories = [
    'إلكترونيات',
    'أزياء',
    'تعليم',
    'صحة',
    'رياضة',
    'طعام',
    'منزل',
    'سيارات',
    'أخرى',
  ];

  const statuses = [
    { value: 'draft', label: 'مسودة', color: 'default' },
    { value: 'upcoming', label: 'قادم', color: 'info' },
    { value: 'active', label: 'نشط', color: 'success' },
    { value: 'expired', label: 'منتهي', color: 'error' },
    { value: 'paused', label: 'معلق', color: 'warning' },
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
    title: 'العروض القادمة',
    content: '',
    isActive: true,
    language: 'ar',
    lastUpdated: new Date().toISOString().split('T')[0],
    showDiscounts: true,
    showCountdown: true,
    showCategories: true,
    showTags: true,
    allowSharing: true,
    allowNotifications: true,
    autoStart: false,
    autoEnd: false,
    requireApproval: true,
    maxOffers: 50,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات العروض بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleAddOffer = () => {
    setOpenDialog(true);
  };

  const handleDeleteOffer = (id) => {
    setSnackbar({
      open: true,
      message: 'تم حذف العرض بنجاح',
      severity: 'success',
    });
  };

  const handleViewOffer = (offer) => {
    setSelectedOffer(offer);
    setOpenDrawer(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    const statusObj = statuses.find((s) => s.value === status);
    return statusObj ? statusObj.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusObj = statuses.find((s) => s.value === status);
    return statusObj ? statusObj.label : 'غير محدد';
  };

  const formatCurrency = (amount, currency) => {
    return `${amount.toLocaleString()} ${currency}`;
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
              إدارة العروض القادمة
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              إدارة وتخصيص العروض والخصومات القادمة
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
          <Typography color="text.primary">العروض القادمة</Typography>
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
          {offersStats.map((stat, index) => (
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
            <LocalOfferIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              إعدادات العروض
            </Typography>
            <Typography variant="body2" color="text.secondary">
              تخصيص وإدارة العروض والخصومات
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في العروض"
              size="small"
                placeholder="البحث في العروض..."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
                <InputLabel>الحالة</InputLabel>
              <Select value="all" label="الحالة">
                <MenuItem value="all">الكل</MenuItem>
                {statuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الفئة</InputLabel>
              <Select value="all" label="الفئة">
                <MenuItem value="all">الكل</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                    </MenuItem>
                  ))}
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
                onClick={handleAddOffer}
                size="small"
              >
                إضافة عرض
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        {/* Offers Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات العروض
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
                    label="العروض نشطة"
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
                        checked={formData.showCountdown}
                        onChange={(e) =>
                          setFormData({ ...formData, showCountdown: e.target.checked })
                        }
                      />
                    }
                    label="عرض العد التنازلي"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showCategories}
                        onChange={(e) =>
                          setFormData({ ...formData, showCategories: e.target.checked })
                        }
                      />
                    }
                    label="عرض الفئات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showTags}
                        onChange={(e) => setFormData({ ...formData, showTags: e.target.checked })}
                      />
                    }
                    label="عرض العلامات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.allowSharing}
                        onChange={(e) =>
                          setFormData({ ...formData, allowSharing: e.target.checked })
                        }
                      />
                    }
                    label="السماح بالمشاركة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.allowNotifications}
                        onChange={(e) =>
                          setFormData({ ...formData, allowNotifications: e.target.checked })
                        }
                      />
                    }
                    label="السماح بالإشعارات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.autoStart}
                        onChange={(e) => setFormData({ ...formData, autoStart: e.target.checked })}
                      />
                    }
                    label="البدء التلقائي"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.autoEnd}
                        onChange={(e) => setFormData({ ...formData, autoEnd: e.target.checked })}
                      />
                    }
                    label="الانتهاء التلقائي"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.requireApproval}
                        onChange={(e) =>
                          setFormData({ ...formData, requireApproval: e.target.checked })
                        }
                      />
                    }
                    label="طلب الموافقة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الحد الأقصى للعروض"
                    type="number"
                    value={formData.maxOffers}
                    onChange={(e) =>
                      setFormData({ ...formData, maxOffers: parseInt(e.target.value) })
                    }
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Offers Table */}
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
                <Typography variant="h6">قائمة العروض</Typography>
                <Chip label={`${offersData.length} عرض`} color="primary" size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>العرض</TableCell>
                    <TableCell>الفئة</TableCell>
                    <TableCell>الخصم</TableCell>
                    <TableCell>السعر</TableCell>
                    <TableCell>الحالة</TableCell>
                    <TableCell>المشاهدات</TableCell>
                  <TableCell align="right">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {offersData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((offer) => (
                      <TableRow key={offer.id} hover>
                      <TableCell>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {offer.title}
                          </Typography>
                              {offer.isFeatured && (
                                <Chip label="مميز" size="small" color="primary" />
                              )}
                              {offer.isUrgent && <Chip label="عاجل" size="small" color="error" />}
                            </Box>
                          <Typography variant="caption" color="text.secondary">
                              {offer.description}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                          <Chip label={offer.category} size="small" color="primary" />
                      </TableCell>
                      <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: 'error.main' }}>
                            {offer.discount}%
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                            >
                              {formatCurrency(offer.originalPrice, offer.currency)}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500, color: 'success.main' }}
                            >
                              {formatCurrency(offer.salePrice, offer.currency)}
                            </Typography>
                          </Box>
                      </TableCell>
                      <TableCell>
                          <Chip
                            label={getStatusLabel(offer.status)}
                            size="small"
                            color={getStatusColor(offer.status)}
                          />
                      </TableCell>
                      <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {offer.views.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                              <IconButton size="small" onClick={() => handleViewOffer(offer)}>
                                <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                            <Tooltip title="تعديل" arrow>
                              <IconButton size="small">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                            <Tooltip title="حذف" arrow>
                            <IconButton
                              size="small"
                              color="error"
                                onClick={() => handleDeleteOffer(offer.id)}
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
                count={offersData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Offer Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>إضافة عرض جديد</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                label="عنوان العرض"
                placeholder="عرض الجمعة البيضاء"
                helperText="عنوان جذاب للعرض"
                  />
                </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="وصف العرض"
                placeholder="خصم يصل إلى 70% على جميع المنتجات..."
                multiline
                rows={3}
                helperText="وصف تفصيلي للعرض"
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
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة">
                  {statuses.map((status) => (
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
                label="نسبة الخصم (%)"
                type="number"
                placeholder="70"
                inputProps={{ min: 0, max: 100 }}
                  />
                </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="السعر الأصلي" type="number" placeholder="1000" />
                </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="السعر بعد الخصم" type="number" placeholder="300" />
              </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>العملة</InputLabel>
                <Select label="العملة">
                  <MenuItem value="ريال">ريال سعودي</MenuItem>
                  <MenuItem value="دولار">دولار أمريكي</MenuItem>
                  <MenuItem value="يورو">يورو</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                fullWidth
                label="تاريخ البداية"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                label="تاريخ النهاية"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="العلامات"
                placeholder="خصم, إلكترونيات, جمعة بيضاء"
                helperText="افصل العلامات بفاصلة"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel control={<Switch />} label="عرض مميز" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel control={<Switch />} label="عرض عاجل" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            إضافة العرض
          </Button>
        </DialogActions>
      </Dialog>

      {/* Offer Details Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { width: 400 } }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            تفاصيل العرض
          </Typography>
          {selectedOffer && (
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedOffer.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {selectedOffer.description}
                  </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem>
                  <ListItemText primary="الفئة" secondary={selectedOffer.category} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحالة" secondary={getStatusLabel(selectedOffer.status)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="نسبة الخصم" secondary={`${selectedOffer.discount}%`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="السعر الأصلي"
                    secondary={formatCurrency(selectedOffer.originalPrice, selectedOffer.currency)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="السعر بعد الخصم"
                    secondary={formatCurrency(selectedOffer.salePrice, selectedOffer.currency)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="تاريخ البداية" secondary={selectedOffer.startDate} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="تاريخ النهاية" secondary={selectedOffer.endDate} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المشاهدات"
                    secondary={selectedOffer.views.toLocaleString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="النقرات"
                    secondary={selectedOffer.clicks.toLocaleString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="التحويلات"
                    secondary={selectedOffer.conversions.toLocaleString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="معدل التحويل"
                    secondary={`${selectedOffer.conversionRate}%`}
                  />
                </ListItem>
              </List>
                </Box>
              )}
        </Box>
      </Drawer>

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

export default UpcomingOffers;
