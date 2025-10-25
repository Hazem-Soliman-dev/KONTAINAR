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
  Search as SeoIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Refresh as RefreshIcon,
  Link as LinkIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

const SeoRedirects = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Stats data
  const seoStats = [
    {
      title: 'إجمالي التوجيهات',
      value: '156',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: LinkIcon,
      change: '+12',
    },
    {
      title: 'التوجيهات النشطة',
      value: '142',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: CheckCircleIcon,
      change: '91%',
    },
    {
      title: 'الزيارات المحولة',
      value: '2,450',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: TrendingUpIcon,
      change: '+18%',
    },
    {
      title: 'معدل النجاح',
      value: '98.5%',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: SpeedIcon,
      change: '+2.1%',
    },
  ];

  // Mock data for redirects
  const redirectsData = [
    {
      id: 1,
      fromUrl: '/old-product-page',
      toUrl: '/products/new-product',
      statusCode: 301,
      isActive: true,
      createdAt: '2024-01-15',
      lastUsed: '2024-01-20',
      hitCount: 45,
      description: 'توجيه صفحة المنتج القديم',
    },
    {
      id: 2,
      fromUrl: '/blog/old-post',
      toUrl: '/blog/new-post',
      statusCode: 302,
      isActive: true,
      createdAt: '2024-01-14',
      lastUsed: '2024-01-19',
      hitCount: 23,
      description: 'توجيه مقال المدونة',
    },
    {
      id: 3,
      fromUrl: '/category/old-category',
      toUrl: '/categories/new-category',
      statusCode: 301,
      isActive: false,
      createdAt: '2024-01-13',
      lastUsed: '2024-01-18',
      hitCount: 12,
      description: 'توجيه فئة المنتجات',
    },
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
    title: 'توجيهات SEO',
    content: '',
    isActive: true,
    language: 'ar',
    lastUpdated: new Date().toISOString().split('T')[0],
    autoRedirect: true,
    preserveQueryParams: true,
    caseSensitive: false,
    trailingSlash: true,
    wildcardRedirects: false,
    bulkRedirects: false,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات التوجيهات بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleAddRedirect = () => {
    setOpenDialog(true);
  };

  const handleDeleteRedirect = (id) => {
    setSnackbar({
      open: true,
      message: 'تم حذف التوجيه بنجاح',
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

  const getStatusCodeColor = (code) => {
    switch (code) {
      case 301:
        return 'success';
      case 302:
        return 'warning';
      case 404:
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusCodeLabel = (code) => {
    switch (code) {
      case 301:
        return 'توجيه دائم';
      case 302:
        return 'توجيه مؤقت';
      case 404:
        return 'غير موجود';
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
              إدارة توجيهات SEO
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              إدارة توجيهات الروابط وتحسين محركات البحث لضمان عدم فقدان الزيارات
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
              <Typography color="text.primary">توجيهات SEO</Typography>
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
          {seoStats.map((stat, index) => (
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
            <SeoIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              إعدادات التوجيهات
            </Typography>
            <Typography variant="body2" color="text.secondary">
              تخصيص وإدارة توجيهات الروابط
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في التوجيهات"
              size="small"
              placeholder="البحث في التوجيهات..."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>الحالة</InputLabel>
              <Select value="all" label="الحالة">
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="active">نشط</MenuItem>
                <MenuItem value="inactive">غير نشط</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>نوع التوجيه</InputLabel>
              <Select value="all" label="نوع التوجيه">
                <MenuItem value="all">الكل</MenuItem>
                <MenuItem value="301">301 - دائم</MenuItem>
                <MenuItem value="302">302 - مؤقت</MenuItem>
                <MenuItem value="404">404 - غير موجود</MenuItem>
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
                onClick={handleAddRedirect}
                size="small"
              >
                إضافة توجيه
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        {/* SEO Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات SEO
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
                    label="التوجيهات نشطة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.autoRedirect}
                        onChange={(e) =>
                          setFormData({ ...formData, autoRedirect: e.target.checked })
                        }
                      />
                    }
                    label="التوجيه التلقائي"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.preserveQueryParams}
                        onChange={(e) =>
                          setFormData({ ...formData, preserveQueryParams: e.target.checked })
                        }
                      />
                    }
                    label="الحفاظ على معاملات الاستعلام"
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
                        checked={formData.trailingSlash}
                        onChange={(e) =>
                          setFormData({ ...formData, trailingSlash: e.target.checked })
                        }
                      />
                    }
                    label="الشرطة المائلة في النهاية"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.wildcardRedirects}
                        onChange={(e) =>
                          setFormData({ ...formData, wildcardRedirects: e.target.checked })
                        }
                      />
                    }
                    label="التوجيهات العامة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.bulkRedirects}
                        onChange={(e) =>
                          setFormData({ ...formData, bulkRedirects: e.target.checked })
                        }
                      />
                    }
                    label="التوجيهات المجمعة"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Redirects Table */}
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
                <Typography variant="h6">قائمة التوجيهات</Typography>
                <Chip label={`${redirectsData.length} توجيه`} color="primary" size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>من URL</TableCell>
                    <TableCell>إلى URL</TableCell>
                    <TableCell>نوع التوجيه</TableCell>
                    <TableCell>الحالة</TableCell>
                    <TableCell>عدد الزيارات</TableCell>
                    <TableCell>آخر استخدام</TableCell>
                    <TableCell align="right">الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {redirectsData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((redirect) => (
                      <TableRow key={redirect.id} hover>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {redirect.fromUrl}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {redirect.toUrl}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusCodeLabel(redirect.statusCode)}
                            size="small"
                            color={getStatusCodeColor(redirect.statusCode)}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={redirect.isActive ? 'نشط' : 'غير نشط'}
                        size="small"
                            color={redirect.isActive ? 'success' : 'default'}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {redirect.hitCount}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{redirect.lastUsed}</Typography>
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
                                onClick={() => handleDeleteRedirect(redirect.id)}
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
                count={redirectsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Redirect Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>إضافة توجيه جديد</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="من URL"
                placeholder="/old-page"
                helperText="الرابط القديم الذي تريد توجيهه"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="إلى URL"
                placeholder="/new-page"
                helperText="الرابط الجديد الذي تريد التوجيه إليه"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>نوع التوجيه</InputLabel>
                <Select label="نوع التوجيه">
                  <MenuItem value={301}>301 - توجيه دائم</MenuItem>
                  <MenuItem value={302}>302 - توجيه مؤقت</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel control={<Switch defaultChecked />} label="نشط" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="الوصف" multiline rows={2} placeholder="وصف للتوجيه..." />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            إضافة التوجيه
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

export default SeoRedirects;
