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
  Store as StoreIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const BecomeSeller = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Stats data
  const sellerStats = [
    {
      title: 'إجمالي الطلبات',
      value: '1,250',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: StoreIcon,
      change: '+45',
    },
    {
      title: 'الطلبات المعلقة',
      value: '85',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: WarningIcon,
      change: '7%',
    },
    {
      title: 'الطلبات المقبولة',
      value: '1,120',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: CheckCircleIcon,
      change: '89%',
    },
    {
      title: 'معدل القبول',
      value: '94.5%',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: TrendingUpIcon,
      change: '+2.1%',
    },
  ];

  // Mock data for seller applications
  const sellerData = [
    {
      id: 1,
      name: 'أحمد محمد العلي',
      email: 'ahmed.ali@example.com',
      phone: '+966501234567',
      businessName: 'متجر التقنية المتقدمة',
      businessType: 'تجارة إلكترونية',
      status: 'approved',
      applicationDate: '2024-01-15',
      reviewDate: '2024-01-18',
      documents: ['هوية وطنية', 'سجل تجاري', 'رخصة نشاط'],
      experience: '5 سنوات',
      rating: 4.8,
      notes: 'طلب ممتاز مع وثائق كاملة',
    },
    {
      id: 2,
      name: 'فاطمة أحمد السعيد',
      email: 'fatima.saeed@example.com',
      phone: '+966507654321',
      businessName: 'بوتيك الأزياء الأنيقة',
      businessType: 'أزياء وموضة',
      status: 'pending',
      applicationDate: '2024-01-20',
      reviewDate: null,
      documents: ['هوية وطنية', 'سجل تجاري'],
      experience: '3 سنوات',
      rating: 0,
      notes: 'في انتظار المراجعة',
    },
    {
      id: 3,
      name: 'محمد عبدالله القحطاني',
      email: 'mohammed.qhtani@example.com',
      phone: '+966509876543',
      businessName: 'مكتبة المعرفة الرقمية',
      businessType: 'تعليم وثقافة',
      status: 'rejected',
      applicationDate: '2024-01-18',
      reviewDate: '2024-01-22',
      documents: ['هوية وطنية'],
      experience: '2 سنوات',
      rating: 0,
      notes: 'وثائق غير مكتملة',
    },
  ];

  const businessTypes = [
    'تجارة إلكترونية',
    'أزياء وموضة',
    'تعليم وثقافة',
    'صحة وطب',
    'رياضة ولياقة',
    'طعام ومشروبات',
    'تكنولوجيا',
    'خدمات',
    'أخرى',
  ];

  const statuses = [
    { value: 'pending', label: 'معلق', color: 'warning' },
    { value: 'approved', label: 'مقبول', color: 'success' },
    { value: 'rejected', label: 'مرفوض', color: 'error' },
    { value: 'under_review', label: 'قيد المراجعة', color: 'info' },
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
    title: 'انضم كبائع',
    content: '',
    isActive: true,
    language: 'ar',
    lastUpdated: new Date().toISOString().split('T')[0],
    requireDocuments: true,
    requireExperience: true,
    requireBusinessLicense: true,
    requireBankAccount: true,
    requireTaxNumber: true,
    allowMultipleApplications: false,
    autoApprove: false,
    requireInterview: false,
    minExperience: 1,
    maxApplications: 100,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات البائعين بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleAddApplication = () => {
    setOpenDialog(true);
  };

  const handleDeleteApplication = (id) => {
    setSnackbar({
      open: true,
      message: 'تم حذف الطلب بنجاح',
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
    const statusObj = statuses.find((s) => s.value === status);
    return statusObj ? statusObj.color : 'default';
  };

  const getStatusLabel = (status) => {
    const statusObj = statuses.find((s) => s.value === status);
    return statusObj ? statusObj.label : 'غير محدد';
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
              إدارة طلبات البائعين
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              إدارة طلبات الانضمام كبائع في المنصة
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
              <Typography color="text.primary">طلبات البائعين</Typography>
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
          {sellerStats.map((stat, index) => (
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
            <StoreIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              إعدادات البائعين
            </Typography>
            <Typography variant="body2" color="text.secondary">
              تخصيص وإدارة طلبات البائعين
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في الطلبات"
              size="small"
              placeholder="البحث في الطلبات..."
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
              <InputLabel>نوع النشاط</InputLabel>
              <Select value="all" label="نوع النشاط">
                <MenuItem value="all">الكل</MenuItem>
                {businessTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
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
                onClick={handleAddApplication}
                size="small"
              >
                إضافة طلب
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        {/* Seller Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات البائعين
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
                    label="الطلبات نشطة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.requireDocuments}
                        onChange={(e) =>
                          setFormData({ ...formData, requireDocuments: e.target.checked })
                        }
                      />
                    }
                    label="طلب الوثائق"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.requireExperience}
                        onChange={(e) =>
                          setFormData({ ...formData, requireExperience: e.target.checked })
                        }
                      />
                    }
                    label="طلب الخبرة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.requireBusinessLicense}
                        onChange={(e) =>
                          setFormData({ ...formData, requireBusinessLicense: e.target.checked })
                        }
                      />
                    }
                    label="طلب رخصة تجارية"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.requireBankAccount}
                        onChange={(e) =>
                          setFormData({ ...formData, requireBankAccount: e.target.checked })
                        }
                      />
                    }
                    label="طلب حساب بنكي"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.requireTaxNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, requireTaxNumber: e.target.checked })
                        }
                      />
                    }
                    label="طلب الرقم الضريبي"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.allowMultipleApplications}
                        onChange={(e) =>
                          setFormData({ ...formData, allowMultipleApplications: e.target.checked })
                        }
                      />
                    }
                    label="السماح بطلبات متعددة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.autoApprove}
                        onChange={(e) =>
                          setFormData({ ...formData, autoApprove: e.target.checked })
                        }
                      />
                    }
                    label="الموافقة التلقائية"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.requireInterview}
                        onChange={(e) =>
                          setFormData({ ...formData, requireInterview: e.target.checked })
                        }
                      />
                    }
                    label="طلب مقابلة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الحد الأدنى للخبرة (سنوات)"
                    type="number"
                    value={formData.minExperience}
                    onChange={(e) =>
                      setFormData({ ...formData, minExperience: parseInt(e.target.value) })
                    }
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الحد الأقصى للطلبات"
                    type="number"
                    value={formData.maxApplications}
                    onChange={(e) =>
                      setFormData({ ...formData, maxApplications: parseInt(e.target.value) })
                    }
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Applications Table */}
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
                <Typography variant="h6">قائمة الطلبات</Typography>
                <Chip label={`${sellerData.length} طلب`} color="primary" size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>المتقدم</TableCell>
                    <TableCell>اسم النشاط</TableCell>
                    <TableCell>نوع النشاط</TableCell>
                    <TableCell>الحالة</TableCell>
                    <TableCell>الوثائق</TableCell>
                    <TableCell>الخبرة</TableCell>
                    <TableCell align="right">الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sellerData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((application) => (
                      <TableRow key={application.id} hover>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {application.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {application.email}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block">
                              {application.phone}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {application.businessName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={application.businessType} size="small" color="primary" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusLabel(application.status)}
                            size="small"
                            color={getStatusColor(application.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {application.documents.length} وثيقة
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {application.experience}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Tooltip title="عرض التفاصيل" arrow>
                              <IconButton size="small">
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
                                onClick={() => handleDeleteApplication(application.id)}
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
                count={sellerData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Application Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>إضافة طلب جديد</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الاسم الكامل"
                placeholder="أحمد محمد العلي"
                helperText="الاسم الكامل للمتقدم"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="ahmed.ali@example.com"
                type="email"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="رقم الهاتف" placeholder="+966501234567" type="tel" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="اسم النشاط التجاري" placeholder="متجر التقنية المتقدمة" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>نوع النشاط</InputLabel>
                <Select label="نوع النشاط">
                  {businessTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
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
              <TextField fullWidth label="سنوات الخبرة" type="number" placeholder="5" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="التقييم"
                type="number"
                placeholder="4.8"
                inputProps={{ min: 0, max: 5, step: 0.1 }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الملاحظات"
                placeholder="ملاحظات إضافية..."
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            إضافة الطلب
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

export default BecomeSeller;
