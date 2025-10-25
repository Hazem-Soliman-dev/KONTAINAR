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
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Work as WorkIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Star as StarIcon,
  Sort as SortIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  GridView as GridViewIcon,
} from '@mui/icons-material';

const Portfolio = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Stats data
  const portfolioStats = [
    {
      title: 'إجمالي المشاريع',
      value: '48',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: WorkIcon,
      change: '+5',
    },
    {
      title: 'المشاريع النشطة',
      value: '42',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: CheckCircleIcon,
      change: '87%',
    },
    {
      title: 'المشاريع المكتملة',
      value: '38',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: TrendingUpIcon,
      change: '+12%',
    },
    {
      title: 'معدل الرضا',
      value: '4.8/5',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: StarIcon,
      change: '+0.3',
    },
  ];

  // Mock data for portfolio items
  const portfolioData = [
    {
      id: 1,
      title: 'موقع تجارة إلكترونية',
      description: 'تطوير موقع تجارة إلكترونية متكامل مع نظام دفع آمن',
      category: 'تطوير المواقع',
      status: 'completed',
      client: 'شركة التقنية المتقدمة',
      startDate: '2024-01-15',
      endDate: '2024-02-20',
      budget: '25,000 ريال',
      rating: 5,
      images: ['/images/project1-1.jpg', '/images/project1-2.jpg'],
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      tags: ['تطوير', 'تجارة إلكترونية', 'دفع آمن'],
    },
    {
      id: 2,
      title: 'تطبيق إدارة المخزون',
      description: 'نظام إدارة مخزون متقدم مع تقارير تفصيلية',
      category: 'تطبيقات سطح المكتب',
      status: 'in_progress',
      client: 'مؤسسة الصناعات الحديثة',
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      budget: '18,000 ريال',
      rating: 4,
      images: ['/images/project2-1.jpg'],
      technologies: ['C#', 'SQL Server', 'WPF'],
      tags: ['إدارة', 'مخزون', 'تقارير'],
    },
    {
      id: 3,
      title: 'منصة تعليمية',
      description: 'منصة تعليمية تفاعلية مع نظام إدارة الطلاب',
      category: 'التعليم الإلكتروني',
      status: 'planning',
      client: 'جامعة التقنية',
      startDate: '2024-03-01',
      endDate: '2024-05-30',
      budget: '35,000 ريال',
      rating: 0,
      images: [],
      technologies: ['Vue.js', 'Laravel', 'MySQL'],
      tags: ['تعليم', 'تفاعلي', 'إدارة'],
    },
  ];

  const categories = [
    'تطوير المواقع',
    'تطبيقات سطح المكتب',
    'التعليم الإلكتروني',
    'تطبيقات الهاتف',
    'أنظمة إدارة',
    'تصميم جرافيكي',
    'تسويق رقمي',
    'استشارات تقنية',
  ];

  const statuses = [
    { value: 'planning', label: 'في التخطيط', color: 'default' },
    { value: 'in_progress', label: 'قيد التنفيذ', color: 'warning' },
    { value: 'completed', label: 'مكتمل', color: 'success' },
    { value: 'on_hold', label: 'معلق', color: 'error' },
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
    title: 'معرض الأعمال',
    content: '',
    isActive: true,
    language: 'ar',
    lastUpdated: new Date().toISOString().split('T')[0],
    showRatings: true,
    showCategories: true,
    showTechnologies: true,
    showBudget: true,
    showTimeline: true,
    allowFiltering: true,
    allowSorting: true,
    itemsPerPage: 12,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'تم تحديث إعدادات المعرض بنجاح',
        severity: 'success',
      });
    }, 1000);
  };

  const handleAddProject = () => {
    setOpenDialog(true);
  };

  const handleDeleteProject = (id) => {
    setSnackbar({
      open: true,
      message: 'تم حذف المشروع بنجاح',
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        sx={{
          color: index < rating ? 'gold' : 'grey.300',
          fontSize: 16,
        }}
      />
    ));
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
              معرض الأعمال
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              إدارة وعرض مشاريعك وأعمالك السابقة
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
              <Typography color="text.primary">معرض الأعمال</Typography>
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
          {portfolioStats.map((stat, index) => (
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
            <PhotoLibraryIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              إعدادات المعرض
            </Typography>
            <Typography variant="body2" color="text.secondary">
              تخصيص وإدارة معرض الأعمال
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="البحث في المشاريع"
              size="small"
              placeholder="البحث في المشاريع..."
            />
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
                onClick={handleAddProject}
                size="small"
              >
                إضافة مشروع
            </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Grid container spacing={3}>
        {/* Portfolio Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إعدادات المعرض
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
                    label="المعرض نشط"
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
                        checked={formData.showTechnologies}
                        onChange={(e) =>
                          setFormData({ ...formData, showTechnologies: e.target.checked })
                        }
                      />
                    }
                    label="عرض التقنيات"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showBudget}
                        onChange={(e) => setFormData({ ...formData, showBudget: e.target.checked })}
                      />
                    }
                    label="عرض الميزانية"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showTimeline}
                        onChange={(e) =>
                          setFormData({ ...formData, showTimeline: e.target.checked })
                        }
                      />
                    }
                    label="عرض الجدول الزمني"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.allowFiltering}
                        onChange={(e) =>
                          setFormData({ ...formData, allowFiltering: e.target.checked })
                        }
                      />
                    }
                    label="السماح بالتصفية"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.allowSorting}
                        onChange={(e) =>
                          setFormData({ ...formData, allowSorting: e.target.checked })
                        }
                      />
                    }
                    label="السماح بالترتيب"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="عدد العناصر في الصفحة"
                    type="number"
                    value={formData.itemsPerPage}
                    onChange={(e) =>
                      setFormData({ ...formData, itemsPerPage: parseInt(e.target.value) })
                    }
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Portfolio Items */}
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
                <Typography variant="h6">قائمة المشاريع</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label={`${portfolioData.length} مشروع`} color="primary" size="small" />
                  <IconButton
                  size="small"
                    onClick={() => setViewMode('grid')}
                    color={viewMode === 'grid' ? 'primary' : 'default'}
                  >
                    <GridViewIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setViewMode('list')}
                    color={viewMode === 'list' ? 'primary' : 'default'}
                  >
                    <ViewListIcon />
                  </IconButton>
              </Box>
          </Box>
              <Divider sx={{ mb: 2 }} />

              {viewMode === 'grid' ? (
                <ImageList cols={2} gap={16}>
                  {portfolioData.map((project) => (
                    <ImageListItem key={project.id}>
                      <img
                        src={project.images[0] || '/placeholder.jpg'}
                        alt={project.title}
                        loading="lazy"
                        style={{ height: 200, objectFit: 'cover' }}
                      />
                      <ImageListItemBar
                        title={project.title}
                        subtitle={
                          <Box>
                            <Typography variant="body2" color="white">
                              {project.description}
            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                              <Chip
                                label={getStatusLabel(project.status)}
                                size="small"
                                color={getStatusColor(project.status)}
                              />
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {renderStars(project.rating)}
          </Box>
                            </Box>
                          </Box>
                        }
                        actionIcon={
                          <Stack direction="row" spacing={1}>
                            <Tooltip title="تعديل" arrow>
                              <IconButton size="small" sx={{ color: 'white' }}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف" arrow>
                              <IconButton
                                size="small"
                                sx={{ color: 'white' }}
                                onClick={() => handleDeleteProject(project.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : (
            <Table>
              <TableHead>
                <TableRow>
                      <TableCell>المشروع</TableCell>
                      <TableCell>الفئة</TableCell>
                      <TableCell>الحالة</TableCell>
                      <TableCell>التقييم</TableCell>
                      <TableCell>الميزانية</TableCell>
                      <TableCell>العميل</TableCell>
                      <TableCell align="right">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                    {portfolioData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((project) => (
                        <TableRow key={project.id} hover>
                      <TableCell>
                          <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {project.title}
                            </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {project.description}
                            </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                            <Chip label={project.category} size="small" color="primary" />
                      </TableCell>
                      <TableCell>
                        <Chip
                              label={getStatusLabel(project.status)}
                          size="small"
                              color={getStatusColor(project.status)}
                        />
                      </TableCell>
                      <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {renderStars(project.rating)}
                            </Box>
                      </TableCell>
                      <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {project.budget}
                          </Typography>
                      </TableCell>
                      <TableCell>
                            <Typography variant="body2">{project.client}</Typography>
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
                                  onClick={() => handleDeleteProject(project.id)}
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
              )}
              {viewMode === 'list' && (
            <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
              component="div"
                  count={portfolioData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Project Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>إضافة مشروع جديد</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                label="عنوان المشروع"
                placeholder="موقع تجارة إلكترونية"
                helperText="اسم المشروع الذي سيظهر في المعرض"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="وصف المشروع"
                placeholder="تطوير موقع تجارة إلكترونية متكامل..."
                multiline
                rows={3}
                helperText="وصف تفصيلي للمشروع"
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
              <TextField fullWidth label="اسم العميل" placeholder="شركة التقنية المتقدمة" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="الميزانية" placeholder="25,000 ريال" />
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
                label="تاريخ الانتهاء"
                type="date"
                InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                label="التقنيات المستخدمة"
                placeholder="React, Node.js, MongoDB"
                helperText="افصل التقنيات بفاصلة"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="العلامات"
                placeholder="تطوير, تجارة إلكترونية, دفع آمن"
                helperText="افصل العلامات بفاصلة"
              />
              </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            إضافة المشروع
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

export default Portfolio;
