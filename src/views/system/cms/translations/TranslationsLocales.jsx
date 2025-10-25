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
  Skeleton,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
  ListItemIcon,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Language as LanguageIcon,
  Translate as TranslateIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  Public as PublicIcon,
  Search as SearchIcon,
  Analytics as AnalyticsIcon,
  Speed as SpeedIcon,
  Flag as FlagIcon,
  Keyboard as KeyboardIcon,
  Schedule as ScheduleIcon,
  CloudUpload as CloudUploadIcon,
  Download as DownloadIcon,
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material';

const TranslationsLocales = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Stats data
  const translationStats = [
    {
      title: 'إجمالي اللغات',
      value: '12',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: LanguageIcon,
      change: '+2',
    },
    {
      title: 'الترجمات المكتملة',
      value: '8,450',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: CheckCircleIcon,
      change: '94%',
    },
    {
      title: 'الترجمات المعلقة',
      value: '520',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: WarningIcon,
      change: '6%',
    },
    {
      title: 'معدل الترجمة',
      value: '98.5%',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: SpeedIcon,
      change: '+2.1%',
    },
  ];

  // Mock data for translations
  const translationsData = [
    {
      id: 1,
      key: 'welcome_message',
      arabic: 'مرحباً بك في متجرنا',
      english: 'Welcome to our store',
      french: 'Bienvenue dans notre magasin',
      spanish: 'Bienvenido a nuestra tienda',
      status: 'completed',
      lastUpdated: '2024-01-20',
      translator: 'أحمد محمد',
    },
    {
      id: 2,
      key: 'product_description',
      arabic: 'وصف المنتج',
      english: 'Product description',
      french: 'Description du produit',
      spanish: 'Descripción del producto',
      status: 'pending',
      lastUpdated: '2024-01-19',
      translator: 'فاطمة علي',
    },
    {
      id: 3,
      key: 'add_to_cart',
      arabic: 'أضف إلى السلة',
      english: 'Add to cart',
      french: 'Ajouter au panier',
      spanish: 'Añadir al carrito',
      status: 'completed',
      lastUpdated: '2024-01-18',
      translator: 'محمد أحمد',
    },
  ];

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦', isRTL: true },
    { code: 'en', name: 'English', flag: '🇺🇸', isRTL: false },
    { code: 'fr', name: 'Français', flag: '🇫🇷', isRTL: false },
    { code: 'es', name: 'Español', flag: '🇪🇸', isRTL: false },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', isRTL: false },
    { code: 'it', name: 'Italiano', flag: '🇮🇹', isRTL: false },
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
    title: 'إدارة الترجمات',
    content: '',
    isActive: true,
    language: 'ar',
    lastUpdated: new Date().toISOString().split('T')[0],
    autoTranslate: true,
    preserveFormatting: true,
    caseSensitive: false,
    pluralization: true,
    contextAware: true,
    qualityCheck: true,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات الترجمات بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleAddTranslation = () => {
    setOpenDialog(true);
  };

  const handleDeleteTranslation = (id) => {
    setSnackbar({
      open: true,
      message: 'تم حذف الترجمة بنجاح',
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
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'مكتملة';
      case 'pending':
        return 'معلقة';
      case 'error':
        return 'خطأ';
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
              إدارة الترجمات واللغات
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              إدارة الترجمات واللغات المدعومة في النظام
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
              <Typography color="text.primary">الترجمات واللغات</Typography>
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
          {translationStats.map((stat, index) => (
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
            <TranslateIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              إعدادات الترجمات
            </Typography>
            <Typography variant="body2" color="text.secondary">
              تخصيص وإدارة الترجمات واللغات
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في الترجمات"
              size="small"
              placeholder="البحث في الترجمات..."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الحالة</InputLabel>
              <Select value="all" label="الحالة">
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="completed">مكتملة</MenuItem>
                <MenuItem value="pending">معلقة</MenuItem>
                <MenuItem value="error">خطأ</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>اللغة</InputLabel>
              <Select value="all" label="اللغة">
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="ar">العربية</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="es">Español</MenuItem>
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
                onClick={handleAddTranslation}
                size="small"
              >
                إضافة ترجمة
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        {/* Translation Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات الترجمة
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
                    label="الترجمات نشطة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.autoTranslate}
                        onChange={(e) =>
                          setFormData({ ...formData, autoTranslate: e.target.checked })
                        }
                      />
                    }
                    label="الترجمة التلقائية"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.preserveFormatting}
                        onChange={(e) =>
                          setFormData({ ...formData, preserveFormatting: e.target.checked })
                        }
                      />
                    }
                    label="الحفاظ على التنسيق"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.caseSensitive}
                        onChange={(e) =>
                          setFormData({ ...formData, caseSensitive: e.target.checked })
                        }
                      />
                    }
                    label="حساسية الأحرف"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.pluralization}
                        onChange={(e) =>
                          setFormData({ ...formData, pluralization: e.target.checked })
                        }
                      />
                    }
                    label="الجمع والمفرد"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.contextAware}
                        onChange={(e) =>
                          setFormData({ ...formData, contextAware: e.target.checked })
                        }
                      />
                    }
                    label="الترجمة السياقية"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.qualityCheck}
                        onChange={(e) =>
                          setFormData({ ...formData, qualityCheck: e.target.checked })
                        }
                      />
                    }
                    label="فحص الجودة"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Supported Languages */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                اللغات المدعومة
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {languages.map((lang, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                        {lang.flag}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={lang.name}
                      secondary={`${lang.code.toUpperCase()} ${lang.isRTL ? '(RTL)' : '(LTR)'}`}
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        label={lang.isRTL ? 'RTL' : 'LTR'}
                        size="small"
                        color={lang.isRTL ? 'primary' : 'default'}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Translations Table */}
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
                <Typography variant="h6">قائمة الترجمات</Typography>
                <Chip label={`${translationsData.length} ترجمة`} color="primary" size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>المفتاح</TableCell>
                    <TableCell>العربية</TableCell>
                    <TableCell>English</TableCell>
                    <TableCell>Français</TableCell>
                    <TableCell>الحالة</TableCell>
                    <TableCell>آخر تحديث</TableCell>
                    <TableCell align="right">الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {translationsData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((translation) => (
                      <TableRow key={translation.id} hover>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {translation.key}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{translation.arabic}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{translation.english}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{translation.french}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusLabel(translation.status)}
                        size="small"
                            color={getStatusColor(translation.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{translation.lastUpdated}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
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
                                onClick={() => handleDeleteTranslation(translation.id)}
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
                count={translationsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Translation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>إضافة ترجمة جديدة</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="مفتاح الترجمة"
                placeholder="welcome_message"
                helperText="المفتاح المستخدم في الكود"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الترجمة العربية"
                placeholder="مرحباً بك"
                multiline
                rows={2}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الترجمة الإنجليزية"
                placeholder="Welcome"
                multiline
                rows={2}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الترجمة الفرنسية"
                placeholder="Bienvenue"
                multiline
                rows={2}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="الترجمة الإسبانية"
                placeholder="Bienvenido"
                multiline
                rows={2}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select label="الحالة">
                  <MenuItem value="completed">مكتملة</MenuItem>
                  <MenuItem value="pending">معلقة</MenuItem>
                  <MenuItem value="error">خطأ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="المترجم" placeholder="اسم المترجم" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            إضافة الترجمة
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

export default TranslationsLocales;
