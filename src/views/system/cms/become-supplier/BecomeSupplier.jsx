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
  LocalShipping as LocalShippingIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const BecomeSupplier = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Stats data
  const supplierStats = [
    {
      title: 'إجمالي الطلبات',
      value: '890',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: LocalShippingIcon,
      change: '+32',
    },
    {
      title: 'الطلبات المعلقة',
      value: '45',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: WarningIcon,
      change: '5%',
    },
    {
      title: 'الطلبات المقبولة',
      value: '780',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: CheckCircleIcon,
      change: '87%',
    },
    {
      title: 'معدل القبول',
      value: '96.2%',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: TrendingUpIcon,
      change: '+1.8%',
    },
  ];

  // Mock data for supplier applications
  const supplierData = [
    {
      id: 1,
      name: 'شركة التوريد المتقدمة',
      contactPerson: 'سعد عبدالله المطيري',
      email: 'saad.mutairi@example.com',
      phone: '+966501234567',
      businessType: 'تجهيزات طبية',
      status: 'approved',
      applicationDate: '2024-01-15',
      reviewDate: '2024-01-18',
      documents: ['سجل تجاري', 'رخصة نشاط', 'شهادة ISO', 'تأمين'],
      experience: '8 سنوات',
      rating: 4.9,
      notes: 'مورد موثوق مع سجل ممتاز',
      location: 'الرياض',
      capacity: '1000 وحدة/شهر',
    },
    {
      id: 2,
      name: 'مؤسسة المواد الغذائية',
      contactPerson: 'نورا أحمد الزهراني',
      email: 'nora.zahrani@example.com',
      phone: '+966507654321',
      businessType: 'مواد غذائية',
      status: 'pending',
      applicationDate: '2024-01-20',
      reviewDate: null,
      documents: ['سجل تجاري', 'رخصة نشاط'],
      experience: '5 سنوات',
      rating: 0,
      notes: 'في انتظار المراجعة',
      location: 'جدة',
      capacity: '500 وحدة/شهر',
    },
    {
      id: 3,
      name: 'شركة الأجهزة الإلكترونية',
      contactPerson: 'خالد محمد القحطاني',
      email: 'khalid.qhtani@example.com',
      phone: '+966509876543',
      businessType: 'إلكترونيات',
      status: 'rejected',
      applicationDate: '2024-01-18',
      reviewDate: '2024-01-22',
      documents: ['سجل تجاري'],
      experience: '3 سنوات',
      rating: 0,
      notes: 'وثائق غير مكتملة',
      location: 'الدمام',
      capacity: '200 وحدة/شهر',
    },
  ];

  const businessTypes = [
    'تجهيزات طبية',
    'مواد غذائية',
    'إلكترونيات',
    'أزياء وملابس',
    'أدوات منزلية',
    'كتب وقرطاسية',
    'ألعاب وأطفال',
    'رياضة ولياقة',
    'جمال وعناية',
    'سيارات وقطع غيار',
    'بناء ومقاولات',
    'زراعة وحدائق',
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
    title: 'انضم كمورد',
    content: '',
    isActive: true,
    language: 'ar',
    lastUpdated: new Date().toISOString().split('T')[0],
    requireDocuments: true,
    requireExperience: true,
    requireBusinessLicense: true,
    requireBankAccount: true,
    requireTaxNumber: true,
    requireInsurance: true,
    requireQualityCertificates: true,
    allowMultipleApplications: false,
    autoApprove: false,
    requireInterview: false,
    requireSiteVisit: false,
    minExperience: 2,
    maxApplications: 50,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات الموردين بنجاح',
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
              إدارة طلبات الموردين
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              إدارة طلبات الانضمام كمورد في المنصة
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
              <Typography color="text.primary">طلبات الموردين</Typography>
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
          {supplierStats.map((stat, index) => (
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
            <LocalShippingIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              إعدادات الموردين
            </Typography>
            <Typography variant="body2" color="text.secondary">
              تخصيص وإدارة طلبات الموردين
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
        {/* Supplier Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات الموردين
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
                        checked={formData.requireInsurance}
                        onChange={(e) =>
                          setFormData({ ...formData, requireInsurance: e.target.checked })
                        }
                      />
                    }
                    label="طلب التأمين"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.requireQualityCertificates}
                        onChange={(e) =>
                          setFormData({ ...formData, requireQualityCertificates: e.target.checked })
                        }
                      />
                    }
                    label="طلب شهادات الجودة"
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
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.requireSiteVisit}
                        onChange={(e) =>
                          setFormData({ ...formData, requireSiteVisit: e.target.checked })
                        }
                      />
                    }
                    label="طلب زيارة موقع"
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
                <Chip label={`${supplierData.length} طلب`} color="primary" size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>اسم الشركة</TableCell>
                    <TableCell>الشخص المسؤول</TableCell>
                    <TableCell>نوع النشاط</TableCell>
                    <TableCell>الموقع</TableCell>
                    <TableCell>السعة</TableCell>
                    <TableCell>الحالة</TableCell>
                    <TableCell align="right">الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {supplierData
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
                            {application.contactPerson}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={application.businessType} size="small" color="primary" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{application.location}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {application.capacity}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusLabel(application.status)}
                            size="small"
                            color={getStatusColor(application.status)}
                          />
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
                count={supplierData.length}
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
                label="اسم الشركة"
                placeholder="شركة التوريد المتقدمة"
                helperText="الاسم الرسمي للشركة"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الشخص المسؤول"
                placeholder="سعد عبدالله المطيري"
                helperText="اسم الشخص المسؤول عن التواصل"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                placeholder="saad.mutairi@example.com"
                type="email"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="رقم الهاتف" placeholder="+966501234567" type="tel" />
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
              <TextField fullWidth label="الموقع" placeholder="الرياض" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="السعة الإنتاجية"
                placeholder="1000 وحدة/شهر"
                helperText="القدرة الإنتاجية الشهرية"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="سنوات الخبرة" type="number" placeholder="8" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="التقييم"
                type="number"
                placeholder="4.9"
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

export default BecomeSupplier;
