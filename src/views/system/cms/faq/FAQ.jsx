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
  Help as HelpIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  Star as StarIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
} from '@mui/icons-material';

const FAQ = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  // Stats data
  const faqStats = [
    {
      title: 'إجمالي الأسئلة',
      value: '245',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: HelpIcon,
      change: '+18',
    },
    {
      title: 'الأسئلة النشطة',
      value: '198',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: CheckCircleIcon,
      change: '81%',
    },
    {
      title: 'الأسئلة المعلقة',
      value: '32',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: WarningIcon,
      change: '13%',
    },
    {
      title: 'معدل الرضا',
      value: '4.7/5',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: StarIcon,
      change: '+0.2',
    },
  ];

  // Mock data for FAQs
  const faqData = [
    {
      id: 1,
      question: 'كيف يمكنني التسجيل في المنصة؟',
      answer:
        'يمكنك التسجيل في المنصة من خلال النقر على زر "تسجيل" في الصفحة الرئيسية، ثم ملء البيانات المطلوبة مثل الاسم والبريد الإلكتروني ورقم الهاتف.',
      category: 'التسجيل',
      status: 'active',
      priority: 'high',
      views: 1250,
      helpful: 89,
      notHelpful: 12,
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-20',
      tags: ['تسجيل', 'حساب', 'بداية'],
      author: 'فريق الدعم',
      isFeatured: true,
    },
    {
      id: 2,
      question: 'كيف يمكنني إضافة منتج جديد؟',
      answer:
        'لإضافة منتج جديد، انتقل إلى قسم "إدارة المنتجات" ثم انقر على "إضافة منتج جديد". املأ جميع البيانات المطلوبة مثل اسم المنتج والوصف والسعر والصور.',
      category: 'المنتجات',
      status: 'active',
      priority: 'medium',
      views: 890,
      helpful: 67,
      notHelpful: 8,
      createdAt: '2024-01-18',
      lastUpdated: '2024-01-22',
      tags: ['منتجات', 'إضافة', 'إدارة'],
      author: 'فريق الدعم',
      isFeatured: false,
    },
    {
      id: 3,
      question: 'كيف يمكنني التواصل مع الدعم الفني؟',
      answer:
        'يمكنك التواصل مع الدعم الفني من خلال البريد الإلكتروني support@example.com أو من خلال نموذج التواصل في الموقع. نحن متاحون 24/7 لمساعدتك.',
      category: 'الدعم',
      status: 'active',
      priority: 'high',
      views: 2100,
      helpful: 156,
      notHelpful: 23,
      createdAt: '2024-01-20',
      lastUpdated: '2024-01-25',
      tags: ['دعم', 'تواصل', 'مساعدة'],
      author: 'فريق الدعم',
      isFeatured: true,
    },
  ];

  const categories = [
    'التسجيل',
    'المنتجات',
    'الدعم',
    'الدفع',
    'الشحن',
    'الحساب',
    'الأمان',
    'التقنية',
    'أخرى',
  ];

  const priorities = [
    { value: 'low', label: 'منخفض', color: 'default' },
    { value: 'medium', label: 'متوسط', color: 'warning' },
    { value: 'high', label: 'عالي', color: 'error' },
    { value: 'urgent', label: 'عاجل', color: 'error' },
  ];

  const statuses = [
    { value: 'draft', label: 'مسودة', color: 'default' },
    { value: 'active', label: 'نشط', color: 'success' },
    { value: 'inactive', label: 'غير نشط', color: 'error' },
    { value: 'pending', label: 'معلق', color: 'warning' },
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
    title: 'الأسئلة الشائعة',
    content: '',
    isActive: true,
    language: 'ar',
    lastUpdated: new Date().toISOString().split('T')[0],
    showCategories: true,
    showTags: true,
    showSearch: true,
    showRatings: true,
    allowComments: true,
    allowSuggestions: true,
    autoApprove: false,
    requireModeration: true,
    maxQuestions: 100,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    setSnackbar({
      open: true,
        message: 'تم تحديث إعدادات الأسئلة الشائعة بنجاح',
      severity: 'success',
    });
    }, 1000);
  };

  const handleAddFAQ = () => {
    setOpenDialog(true);
  };

  const handleDeleteFAQ = (id) => {
    setSnackbar({
      open: true,
      message: 'تم حذف السؤال بنجاح',
      severity: 'success',
    });
  };

  const handleViewFAQ = (faq) => {
    setSelectedFAQ(faq);
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

  const getPriorityColor = (priority) => {
    const priorityObj = priorities.find((p) => p.value === priority);
    return priorityObj ? priorityObj.color : 'default';
  };

  const getPriorityLabel = (priority) => {
    const priorityObj = priorities.find((p) => p.value === priority);
    return priorityObj ? priorityObj.label : 'غير محدد';
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
              إدارة الأسئلة الشائعة
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              إدارة وتخصيص الأسئلة الشائعة والإجابات
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
          <Typography color="text.primary">الأسئلة الشائعة</Typography>
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
          {faqStats.map((stat, index) => (
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
            <HelpIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              إعدادات الأسئلة الشائعة
            </Typography>
            <Typography variant="body2" color="text.secondary">
              تخصيص وإدارة الأسئلة الشائعة
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في الأسئلة"
              size="small"
                placeholder="البحث في الأسئلة..."
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
                onClick={handleAddFAQ}
                size="small"
              >
                إضافة سؤال
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        {/* FAQ Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات الأسئلة الشائعة
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
                    label="الأسئلة نشطة"
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
                        checked={formData.showSearch}
                        onChange={(e) => setFormData({ ...formData, showSearch: e.target.checked })}
                      />
                    }
                    label="عرض البحث"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showRatings}
                        onChange={(e) =>
                          setFormData({ ...formData, showRatings: e.target.checked })
                        }
                      />
                    }
                    label="عرض التقييمات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.allowComments}
                        onChange={(e) =>
                          setFormData({ ...formData, allowComments: e.target.checked })
                        }
                      />
                    }
                    label="السماح بالتعليقات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.allowSuggestions}
                        onChange={(e) =>
                          setFormData({ ...formData, allowSuggestions: e.target.checked })
                        }
                      />
                    }
                    label="السماح بالاقتراحات"
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
                        checked={formData.requireModeration}
                        onChange={(e) =>
                          setFormData({ ...formData, requireModeration: e.target.checked })
                        }
                      />
                    }
                    label="طلب المراجعة"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="الحد الأقصى للأسئلة"
                    type="number"
                    value={formData.maxQuestions}
                    onChange={(e) =>
                      setFormData({ ...formData, maxQuestions: parseInt(e.target.value) })
                    }
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* FAQ Table */}
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
                <Typography variant="h6">قائمة الأسئلة</Typography>
                <Chip label={`${faqData.length} سؤال`} color="primary" size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>السؤال</TableCell>
                    <TableCell>الفئة</TableCell>
                    <TableCell>الأولوية</TableCell>
                    <TableCell>الحالة</TableCell>
                    <TableCell>المشاهدات</TableCell>
                    <TableCell>التقييم</TableCell>
                  <TableCell align="right">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {faqData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((faq) => (
                      <TableRow key={faq.id} hover>
                      <TableCell>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {faq.question}
                          </Typography>
                              {faq.isFeatured && <Chip label="مميز" size="small" color="primary" />}
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              {faq.answer.substring(0, 100)}...
                          </Typography>
                        </Box>
                      </TableCell>
                        <TableCell>
                          <Chip label={faq.category} size="small" color="primary" />
                        </TableCell>
                      <TableCell>
                        <Chip
                            label={getPriorityLabel(faq.priority)}
                          size="small"
                            color={getPriorityColor(faq.priority)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                            label={getStatusLabel(faq.status)}
                          size="small"
                            color={getStatusColor(faq.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {faq.views.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {faq.helpful}
                          </Typography>
                            <ThumbUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              / {faq.notHelpful}
                            </Typography>
                            <ThumbDownIcon sx={{ fontSize: 16, color: 'error.main' }} />
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="عرض التفاصيل" arrow>
                              <IconButton size="small" onClick={() => handleViewFAQ(faq)}>
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
                                onClick={() => handleDeleteFAQ(faq.id)}
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
                count={faqData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add FAQ Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>إضافة سؤال جديد</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                label="السؤال"
                placeholder="كيف يمكنني التسجيل في المنصة؟"
                helperText="اكتب السؤال بوضوح وبساطة"
                  />
                </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="الإجابة"
                placeholder="يمكنك التسجيل في المنصة من خلال..."
                multiline
                rows={4}
                helperText="اكتب إجابة مفصلة وواضحة"
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
                <InputLabel>الأولوية</InputLabel>
                <Select label="الأولوية">
                  {priorities.map((priority) => (
                    <MenuItem key={priority.value} value={priority.value}>
                      {priority.label}
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
              <TextField fullWidth label="المؤلف" placeholder="فريق الدعم" />
            </Grid>
            <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                label="العلامات"
                placeholder="تسجيل, حساب, بداية"
                helperText="افصل العلامات بفاصلة"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel control={<Switch />} label="سؤال مميز" />
                </Grid>
              </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            إضافة السؤال
          </Button>
        </DialogActions>
      </Dialog>

      {/* FAQ Details Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { width: 400 } }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            تفاصيل السؤال
          </Typography>
          {selectedFAQ && (
            <Box>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                {selectedFAQ.question}
                  </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedFAQ.answer}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem>
                  <ListItemText primary="الفئة" secondary={selectedFAQ.category} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="الأولوية"
                    secondary={getPriorityLabel(selectedFAQ.priority)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="الحالة" secondary={getStatusLabel(selectedFAQ.status)} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="المؤلف" secondary={selectedFAQ.author} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="تاريخ الإنشاء" secondary={selectedFAQ.createdAt} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="آخر تحديث" secondary={selectedFAQ.lastUpdated} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="المشاهدات"
                    secondary={selectedFAQ.views.toLocaleString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="مفيد" secondary={selectedFAQ.helpful} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="غير مفيد" secondary={selectedFAQ.notHelpful} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="العلامات" secondary={selectedFAQ.tags.join(', ')} />
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

export default FAQ;
