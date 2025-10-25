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
  Build as BuildIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Refresh as RefreshIcon,
  Speed as SpeedIcon,
  Assignment as FormIcon,
  ContentCopy as ContentCopyIcon,
  Preview as PreviewIcon,
  TextFields as TextFieldsIcon,
  CheckBox as CheckBoxIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
  SelectAll as SelectAllIcon,
  DateRange as DateRangeIcon,
  AttachFile as AttachFileIcon,
  Image as ImageIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Star as StarIcon,
  Person as PersonIcon,
  Poll as PollIcon,
  Support as SupportIcon,
  ShoppingCart as ShoppingCartIcon,
  Tune as TuneIcon,
} from '@mui/icons-material';

const FormsBuilder = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Stats data
  const formsStats = [
    {
      title: 'إجمالي النماذج',
      value: '24',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: FormIcon,
      change: '+3',
    },
    {
      title: 'النماذج النشطة',
      value: '18',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: CheckCircleIcon,
      change: '75%',
    },
    {
      title: 'الإجابات المستلمة',
      value: '1,250',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: TrendingUpIcon,
      change: '+25%',
    },
    {
      title: 'معدل الإكمال',
      value: '92.5%',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: SpeedIcon,
      change: '+5.2%',
    },
  ];

  // Mock data for forms
  const formsData = [
    {
      id: 1,
      name: 'نموذج الاتصال',
      description: 'نموذج للتواصل مع العملاء',
      type: 'contact',
      status: 'active',
      submissions: 45,
      createdAt: '2024-01-15',
      lastSubmission: '2024-01-20',
      fields: 5,
    },
    {
      id: 2,
      name: 'نموذج التسجيل',
      description: 'نموذج تسجيل المستخدمين الجدد',
      type: 'registration',
      status: 'active',
      submissions: 23,
      createdAt: '2024-01-14',
      lastSubmission: '2024-01-19',
      fields: 8,
    },
    {
      id: 3,
      name: 'نموذج الاستطلاع',
      description: 'استطلاع رضا العملاء',
      type: 'survey',
      status: 'draft',
      submissions: 0,
      createdAt: '2024-01-13',
      lastSubmission: null,
      fields: 12,
    },
  ];

  const formTypes = [
    { value: 'contact', label: 'نموذج الاتصال', icon: EmailIcon },
    { value: 'registration', label: 'نموذج التسجيل', icon: PersonIcon },
    { value: 'survey', label: 'استطلاع', icon: PollIcon },
    { value: 'feedback', label: 'تقييم', icon: StarIcon },
    { value: 'order', label: 'طلب', icon: ShoppingCartIcon },
    { value: 'support', label: 'دعم فني', icon: SupportIcon },
  ];

  const fieldTypes = [
    { value: 'text', label: 'نص', icon: TextFieldsIcon },
    { value: 'email', label: 'بريد إلكتروني', icon: EmailIcon },
    { value: 'phone', label: 'هاتف', icon: PhoneIcon },
    { value: 'textarea', label: 'نص طويل', icon: TextFieldsIcon },
    { value: 'select', label: 'قائمة منسدلة', icon: SelectAllIcon },
    { value: 'radio', label: 'خيار واحد', icon: RadioButtonCheckedIcon },
    { value: 'checkbox', label: 'خيارات متعددة', icon: CheckBoxIcon },
    { value: 'date', label: 'تاريخ', icon: DateRangeIcon },
    { value: 'file', label: 'ملف', icon: AttachFileIcon },
    { value: 'image', label: 'صورة', icon: ImageIcon },
    { value: 'rating', label: 'تقييم', icon: StarIcon },
    { value: 'slider', label: 'شريط تمرير', icon: TuneIcon },
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
    title: 'منشئ النماذج',
    content: '',
    isActive: true,
    language: 'ar',
    lastUpdated: new Date().toISOString().split('T')[0],
    autoSave: true,
    validation: true,
    notifications: true,
    analytics: true,
    responsive: true,
    accessibility: true,
    multiStep: false,
    conditionalLogic: false,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات النماذج بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleAddForm = () => {
    setOpenDialog(true);
  };

  const handleDeleteForm = (id) => {
    setSnackbar({
      open: true,
      message: 'تم حذف النموذج بنجاح',
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
        return 'نشط';
      case 'draft':
        return 'مسودة';
      case 'inactive':
        return 'غير نشط';
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
              منشئ النماذج
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              إنشاء وإدارة النماذج التفاعلية بسهولة
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
              <Typography color="text.primary">منشئ النماذج</Typography>
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
          {formsStats.map((stat, index) => (
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
            <BuildIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              إعدادات النماذج
            </Typography>
            <Typography variant="body2" color="text.secondary">
              تخصيص وإدارة النماذج
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في النماذج"
              size="small"
              placeholder="البحث في النماذج..."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الحالة</InputLabel>
              <Select value="all" label="الحالة">
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="active">نشط</MenuItem>
                <MenuItem value="draft">مسودة</MenuItem>
                <MenuItem value="inactive">غير نشط</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>نوع النموذج</InputLabel>
              <Select value="all" label="نوع النموذج">
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="contact">اتصال</MenuItem>
                <MenuItem value="registration">تسجيل</MenuItem>
                <MenuItem value="survey">استطلاع</MenuItem>
                <MenuItem value="feedback">تقييم</MenuItem>
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
                onClick={handleAddForm}
                size="small"
              >
                إنشاء نموذج
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        {/* Form Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات النماذج
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
                    label="النماذج نشطة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.autoSave}
                        onChange={(e) => setFormData({ ...formData, autoSave: e.target.checked })}
                      />
                    }
                    label="الحفظ التلقائي"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.validation}
                        onChange={(e) => setFormData({ ...formData, validation: e.target.checked })}
                      />
                    }
                    label="التحقق من البيانات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.notifications}
                        onChange={(e) =>
                          setFormData({ ...formData, notifications: e.target.checked })
                        }
                      />
                    }
                    label="الإشعارات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.analytics}
                        onChange={(e) => setFormData({ ...formData, analytics: e.target.checked })}
                      />
                    }
                    label="التحليلات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.responsive}
                        onChange={(e) => setFormData({ ...formData, responsive: e.target.checked })}
                      />
                    }
                    label="التصميم المتجاوب"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.accessibility}
                        onChange={(e) =>
                          setFormData({ ...formData, accessibility: e.target.checked })
                        }
                      />
                    }
                    label="إمكانية الوصول"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.multiStep}
                        onChange={(e) => setFormData({ ...formData, multiStep: e.target.checked })}
                      />
                    }
                    label="النماذج متعددة الخطوات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.conditionalLogic}
                        onChange={(e) =>
                          setFormData({ ...formData, conditionalLogic: e.target.checked })
                        }
                      />
                    }
                    label="المنطق الشرطي"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Field Types */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                أنواع الحقول
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={1}>
                {fieldTypes.map((field, index) => (
                  <Grid key={index} size={{ xs: 6, sm: 4 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<field.icon />}
                      fullWidth
                      sx={{ mb: 1 }}
                    >
                      {field.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Forms Table */}
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
                <Typography variant="h6">قائمة النماذج</Typography>
                <Chip label={`${formsData.length} نموذج`} color="primary" size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>اسم النموذج</TableCell>
                    <TableCell>الوصف</TableCell>
                    <TableCell>النوع</TableCell>
                    <TableCell>الحالة</TableCell>
                    <TableCell>الإجابات</TableCell>
                    <TableCell>الحقول</TableCell>
                    <TableCell align="right">الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formsData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((form) => (
                      <TableRow key={form.id} hover>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {form.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {form.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={form.type} size="small" color="primary" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusLabel(form.status)}
                        size="small"
                            color={getStatusColor(form.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {form.submissions}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {form.fields}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Tooltip title="معاينة" arrow>
                              <IconButton size="small">
                                <PreviewIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="تعديل" arrow>
                              <IconButton size="small">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="نسخ" arrow>
                              <IconButton size="small">
                                <ContentCopyIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف" arrow>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteForm(form.id)}
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
                count={formsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Form Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>إنشاء نموذج جديد</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="اسم النموذج"
                placeholder="نموذج الاتصال"
                helperText="اسم النموذج الذي سيظهر في القائمة"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="وصف النموذج"
                placeholder="نموذج للتواصل مع العملاء"
                multiline
                rows={2}
                helperText="وصف مختصر للنموذج"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>نوع النموذج</InputLabel>
                <Select label="نوع النموذج">
                  <MenuItem value="contact">نموذج الاتصال</MenuItem>
                  <MenuItem value="registration">نموذج التسجيل</MenuItem>
                  <MenuItem value="survey">استطلاع</MenuItem>
                  <MenuItem value="feedback">تقييم</MenuItem>
                  <MenuItem value="order">طلب</MenuItem>
                  <MenuItem value="support">دعم فني</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة">
                  <MenuItem value="draft">مسودة</MenuItem>
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="inactive">غير نشط</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="تفعيل النموذج فور الإنشاء"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            إنشاء النموذج
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

export default FormsBuilder;
